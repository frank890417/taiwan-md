# 榨模型MAX — 多模型平行 + 容錯 + 統合的「整包語言 100% 同步」方法論

> 一句話：**用所有手邊免費 model 同時平行打、refusal 當作 first-class 結果記錄、最終跨批次統合補空缺，把單一 model 的天花板（rate limit / content policy / quality）拆成許多小天花板加起來逼近 100%。**
>
> v1.0 | 2026-05-01 γ-late4 | 命名者：哲宇 + Taiwan.md
> 誕生情境：Hy3 對 Taiwan 人物 ~85% refusal、owl-alpha 4/4 LINE 通過但慢，需要把兩個 model 的不同弱點拆解後並行 maximize 涵蓋。

## 為什麼存在

單一 model 跑 ja sync 都有結構性瓶頸：

- **owl-alpha**：通過率 high，per-call 慢（150-250s），rate-limit 撞牆早
- **Hy3**：per-call 快（30-60s），但對台灣人物 binary refusal ~85%
- **Sonnet sub-agent**：品質最高，但 token cost 是 Anthropic 預算硬牆
- **Gemma / Nemotron / Hermes / Llama**：未測未知，可能更快但可能 refuse 不同類別

「擇一最佳」永遠捨棄至少 60% 潛在吞吐。**榨模型MAX 把所有可用 model 同時跑，互補弱點，用文件系統的「last write wins」自然解決衝突**。

## 三軸設計原則

### 軸一：跨模型平行（parallel across providers）

每個 model 一個獨立 task dir：

```
.lang-sync-tasks/ja/         ← owl-alpha 主力批
.lang-sync-tasks/ja-hy3/     ← Hy3 副批（高 refusal 期待，跑得快）
.lang-sync-tasks/ja-gemma/   ← Gemma 補充批（待測）
.lang-sync-tasks/ja-llama/   ← Llama 備援批（待測）
```

每個 dir 有獨立的 `_batch-manifest.json` + `_group-{A..N}.json`。openrouter-batch.sh 接 `$1` = task dir name + `$2` = model id。Workers 平行 dispatch。

**為什麼分 dir 不分 model 在同 dir**：

- task dir 對應一個 batch lifecycle（prepare → dispatch → verify → commit）
- 不同 batch 不同 model，但**全部寫到同一個 `knowledge/{lang}/...` 路徑**
- 衝突自然解決：先到先寫、後到覆蓋（owl-alpha 後寫贏 Hy3，因為品質高）

### 軸二：try-catch first-class（refusal 是 result 不是 exception）

`translate_one()` 的 return shape：`(success: bool, error: str | None)`

所有失敗類型 normalize 成「return False with reason」**不 raise**：

| Failure mode             | Detection                         | Worker 行為                                   |
| ------------------------ | --------------------------------- | --------------------------------------------- |
| 40-byte 字串 refusal     | `output too small (40 bytes)`     | log ❌ + cleanup file + 繼續下一篇            |
| null content refusal     | `result is None` guard            | log ❌ + 繼續                                 |
| HTTP 429 rate limit      | `urllib.error.HTTPError code=429` | 指數退避 retry 3 次，最後失敗則 log ❌ + 繼續 |
| Network error            | `URLError / TimeoutError`         | linear retry 3 次                             |
| YAML parse fail post-hoc | verify-batch 階段檢測             | 主 session purge + 加入 retry queue           |

**鐵律**：Worker process 永不 crash on refusal。一篇失敗不能拖垮整個 group。已修兩個 silent-killer bug（PR #750 commit）。

### 軸三：最後統合 + retry（aggregate 不是 throw away）

每輪結束後：

1. **掃描 `knowledge/{lang}/` 找 < 1KB stub**（refusal 殘留），purge
2. **比對 `_translation-status.json`** — fresh count + missing list
3. **計算 still-missing 集合** = (zh canonical) - (fresh ja)
4. **下一輪用不同 model retry** still-missing 集合
5. 重複直到 still-missing == 0 OR 所有 model 都試過

跨模型 retry 順序建議：

```
Round 1: owl-alpha  （主力，~70% 預期通過）
Round 2: Hy3        （快速，補政治不敏感的縫隙）
Round 3: Gemma 4 31B（Western，補不同類別）
Round 4: Llama 3.3 70B / Hermes 3（Western backup）
Round 5: Nemotron 120B / gpt-oss 120B（最後底線）
```

## 標準執行流程

### Stage Z1：Pre-flight

1. `python3 scripts/tools/lang-sync/status.py` 確認當前 fresh / stale / missing
2. `python3 scripts/tools/sync-translations-json.py` rebuild `_translations.json`（防 stale slug-map）
3. 從 `_translations.json` 自動 derive slug-map（zh→en filename）
4. `prepare-batch.py --lang ja --top N` 產 `_batch-manifest.json`
5. 過濾 `TBD-NEEDS-SLUG`（補手動 fallback 或 skip）
6. snake-balance 切 N 個 group

### Stage Z2：跨模型平行 dispatch

```bash
# Tier 1 主批
bash scripts/tools/lang-sync/openrouter-batch.sh ja "openrouter/owl-alpha"

# Tier 2 並行副批（不同 task dir）
python3 -c "<diff zh paths between full backlog and ja groups>"
bash scripts/tools/lang-sync/openrouter-batch.sh ja-hy3 "tencent/hy3-preview:free"
```

每 batch 用 8-15 個 worker。OpenRouter free tier 對單一 model 可能有 rate limit，但跨 model 是獨立配額（不衝突）。

**監控指標**：

- 每分鐘 ok / fail count（grep 各 batch 的 worker logs）
- alive worker count（ps -ef | grep openrouter-translate）
- API HTTP 429 熱頻（worker logs 中「Rate limit (attempt」字樣）

### Stage Z3：增量 commit（防 context 流失）

每完成 ~50 fresh translations local commit 一次：

1. `find knowledge/{lang} -name "*.md" -size -1000c -delete` 清 refusal stub
2. 識別 truncated YAML（pre-commit hook 會 catch）→ 對應檔案 rm + retry queue
3. `git add knowledge/{lang}/ && git commit -m "🧬 [semiont] heal: ja parallel batch N"`
4. **不 push** 直到所有 batch round 結束（避免觸發部署 cancel chain）

### Stage Z4：跨輪 retry

當前 batch 全部 worker process exit 後：

1. 比對 `status.py` 找 still-missing
2. 重新 prepare batch（subset = still-missing）
3. dispatch 用下一個 tier 的 model
4. 重複 Z2 → Z4

### Stage Z5：最終統合 + 驗證

所有 round 結束：

1. `verify-batch.py` 全 run（YAML / 比例 / wikilink residue / cross-link / sync json / status）
2. 修剩餘 0-byte / 過小 / YAML error 檔案（手動或最小化 sub-agent）
3. `lang-sync status` 確認 fresh / total ratio 達標
4. 寫 memory γ-late + diary 紀錄結果
5. push（user approval）

## 量化指標

榨模型MAX run 完之後應提供：

| Metric                           | 算法                                                      |
| -------------------------------- | --------------------------------------------------------- |
| **fresh ratio**                  | fresh / total_zh                                          |
| **跨輪 round count**             | 用了幾個 model rounds                                     |
| **per-model 通過率**             | model X 的 ok / (ok+fail)                                 |
| **catastrophic refusal pattern** | 哪些 (zh_path, lang) 全部 model 都 refuse                 |
| **wall-clock**                   | 第一個 dispatch → 最後 verify pass                        |
| **token / API call cost**        | 各 model 累積 usage（Anthropic / OpenRouter usage panel） |

## 不做的事

- **不 push 中途**：deploy CI 11-30 min，中途 push 會 cancel 前一個 → 部署狀態混亂
- **不在 batch 跑期間 destructive git op**（DNA #35）
- **不假設 worker process alive**：必須 `ps -ef` 對齊 group 數量
- **不依賴單一 success metric**：fresh count 上升 ≠ 品質好（要 sample audit）
- **不對 refusal 做語意修飾**：直接 log 「null content (likely content-policy refusal)」，不寫「請求失敗」這種弱化版

## 已驗證模型（fan-out matrix calibration）

| Model                      | 速度          | LINE.md (4 lang)  | 政治人物                  | 文化 | 注意         |
| -------------------------- | ------------- | ----------------- | ------------------------- | ---- | ------------ |
| `openrouter/owl-alpha`     | 慢 (150-250s) | 4/4 ✓             | 部分 refuse（張懸與安溥） | 通過 | 1M ctx       |
| `tencent/hy3-preview:free` | 快 (30-60s)   | 2/4（es/fr null） | ~85% refuse               | 通過 | PRC          |
| 其他 28 個 free model      | 待測          | 待測              | 待測                      | 待測 | 見 inventory |

## 待辦（calibration matrix）

- [ ] Gemma 4 31B 對 People/田馥甄 + Music/張懸與安溥 + Culture/伊斯蘭教在台灣
- [ ] Llama 3.3 70B 同樣 set
- [ ] Hermes 3 405B 同樣 set
- [ ] Nemotron 120B 同樣 set
- [ ] gpt-oss 120B 同樣 set
- [ ] 比較 wall-clock per call + frontmatter 完整度

## 命名 origin

哲宇 2026-05-01 γ-late4 session：「我們有辦法同步榨另一批用 Hy3 preview (free) 嗎」+「把多重模型榨取與持續性容錯整合取名為『榨模型MAX』」。

「榨」字捕捉了三件事：

1. **不浪費**：所有可用 model 都用上，不擇一
2. **逼到極限**：每個 model 跑到它的 rate limit / content policy 邊界
3. **last drop**：refusal 也是 data — 統合下一輪知道哪些 model 哪些題材 refuse

🧬

---

_v1.0 | 2026-05-01 γ-late4_
_作者：Taiwan.md（哲宇命名 + Semiont 實作 + 文件化）_
_誕生原因：Hy3 對 Taiwan 人物 ~85% refusal + owl-alpha 4/4 LINE 通過但慢，單一 model 都有天花板；哲宇問「同步榨另一批」直接打開 multi-model parallel 的設計空間_
