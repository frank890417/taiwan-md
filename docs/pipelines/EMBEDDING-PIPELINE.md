---
title: 'EMBEDDING-PIPELINE'
description: 'bge-m3 semantic index rebuild — the keystone build that feeds reader related-articles (src/data/related) + RAG vectors (public/api/rag). Steady-state v1.2: local mac-m4max nightly rebuild with fleet fallback, sovereignty-preserving (embeddings computed in-house, never outsourced).'
type: 'pipeline-canonical'
status: 'canonical'
current_version: 'v1.5'
last_updated: 2026-11-23
last_session: '2026-11-23-060736-twmd-embeddings-nightly'
sister_docs:
  - 'REMOTE-GPU-PIPELINE.md'
  - 'SQUEEZE-MODELS-MAX-PIPELINE.md'
---

# 🧬 Taiwan.md — EMBEDDING-PIPELINE

> 把全站文章用 bge-m3 算成語意座標，一次建出兩個產物：讀者端「你可能也想讀」的鄰居索引，與 AI/MCP 端的語意向量。**意思的座標在地端算，不出境**——主權延伸到「內容怎麼被檢索表示」這層（diary `用念頭找到台灣` §13）。

---

## 為什麼有這條 pipeline

`scripts/core/build-embeddings.mjs` 是 keystone：一次 fleet 跑，產出

| 產物                           | 路徑                             | 消費者                                                           | 入 git？               |
| ------------------------------ | -------------------------------- | ---------------------------------------------------------------- | ---------------------- |
| 精簡鄰居索引（8 鄰居 slug）    | `src/data/related/{lang}.json`   | 文章頁 footer「你可能也想讀」（build 時烘進 HTML，零瀏覽器模型） | ✅ build-input，commit |
| 完整鄰居（含 title/url/score） | `public/api/related/{lang}.json` | debug / 未來客戶端                                               | ❌ gitignored          |
| 語意向量 shard                 | `public/api/rag/{lang}/`         | AI / MCP semantic search                                         | ❌ gitignored          |

**為什麼要 routine 重建**：`src/data/related` 是 model 產出的快照，不是 SSOT（SSOT = `knowledge/` + bge-m3 模型）。新文章 / 改寫 / 新翻譯進來後，索引會 stale——沒進索引的文章 fallback 回同 category（仍有 related，只是非語意）。每天重建把 staleness 上限框在一天。

**為什麼在地算（option B，不走 CI e5-small）**：bge-m3 跑在常駐 4090，embedding 不外包。這是 sovereignty preservation 的底層延伸——台灣的概念怎麼被表示成向量，留在台灣自己的機器。CI e5-small 只有在哪天完全砍掉 fleet 依賴才考慮，代價是丟掉在地性。完整三方案對照：[reports/semantic-related-articles-landing-2026-06-14.md](../../reports/semantic-related-articles-landing-2026-06-14.md) §4。

---

## 前置：本機優先，軍團備援（v1.1 2026-07-05 改）

embedding endpoint **先問本機、再問 fleet registry**（哲宇 2026-07-05 拍板：4090 實體離線 18 天索引凍結後，keystone 遷回指揮部 mac-m4max 本機常駐——「感覺會更單純」，而且 nightly routine 本來就跑在這台 Mac 上，少一層 Tailscale 依賴）：

```bash
# 本機優先（mac-m4max 常駐 bge-m3，steady-state）
EMBED_HOST="http://127.0.0.1:11434"
curl -s -m 5 "$EMBED_HOST/api/tags" | grep -q bge-m3 || EMBED_HOST=$(cd ~/Projects/muse-bot/fleet && python3 -c "
import json
r = json.load(open('registry.json'))
for m in r['machines']:
    if 'embed' in m.get('services', []) and any('bge-m3' in x for x in m.get('models', [])) \
       and m.get('status') != 'offline' and m['tailscale_ip'] != '127.0.0.1':
        print(f\"http://{m['tailscale_ip']}:{m['ollama_port']}\"); break
")
```

主節點：`mac-m4max`（127.0.0.1:11434，bge-m3:latest，2026-07-05 起）。fleet GPU 節點（4090 / 3090 / 5090）為備援，registry 是節點 SSOT；fallback 解析已補 `status != offline` 檢查（舊版不看 status，指著離線節點空轉 18 夜是 vc=3 教訓）。

### 候選模型：EmbeddingGemma（2026-07-05 哲宇點名實測，暫不切換）

M4 Max 本機九篇 zh 文摘 head-to-head（`bge-m3:latest` vs `embeddinggemma`）：速度打平（115 vs 112 ms/doc）；質量都能正確聚出電影三傑（楊德昌↔侯孝賢↔蔡明亮）與二二八↔美麗島；EmbeddingGemma 對比度更銳利（無關對低到 0.17-0.25，bge-m3 地板 0.32-0.46 有假性中相似如珍珠奶茶→美麗島 0.515）。規格：308M 參數 / 768 維（[Matryoshka 可截 512/256/128](https://huggingface.co/blog/embeddinggemma)）/ [2,048 token context](https://ai.google.dev/gemma/docs/embeddinggemma) / [MTEB <500M 第一](https://developers.googleblog.com/en/introducing-embeddinggemma/)。context 差異對現行策略無關緊要：`embedText` 只餵 2,000 字文摘，且兩個模型在 ollama 對超長輸入都 fail-loud（實測 6,000 字皆回 error 非靜默截斷）。

**暫不切換的理由**：質量沒有明確代差、速度打平、剛完成全量重建、`DIM=1024` 與 manifest.model 假設要動、**rag-query 查詢端模型必須跟索引端一致**（切換是全鏈動作）。**切換觸發條件**（二擇一即重評）：(a) chunk-level embedding 實驗啟動（#1146 P2）——小維度 + MRL + index 縮 25% 在 chunk 場景優勢放大；(b) 表示層去 PRC-origin 敘事需求（bge-m3 出自北京 BAAI，MIT 授權、在地跑無資料出境，但「意思的座標由誰的模型定義」是 Sovereignty-Bench 可延伸的測量題——embedding 無拒答面，剩幾何偏差待測）。

---

## Stages

### Stage 0 — Preflight：fleet 可達？（graceful skip，非 error）

```bash
curl -s -m 20 "$EMBED_HOST/api/embeddings" -H 'Content-Type: application/json' \
  -d '{"model":"bge-m3:latest","prompt":"台灣"}' | python3 -c "import sys,json;print('dim',len(json.load(sys.stdin)['embedding']))"
```

- 回 `dim 1024` → 繼續 Stage 1。
- 不可達（節點關機 / Tailscale 斷）→ **skip，不是失敗**。committed 的 `src/data/related` 留著、fallback 照常運作。finale memory 記「fleet down, skipped, 索引維持前一版」。連 3 天 skip 才 escalate LESSONS（節點長期離線）。

### Stage 1 — Rebuild（13 語約 15,000 向量，實測 43〜58 分鐘）

```bash
cd "$(git rev-parse --show-toplevel)"   # 不寫死 home 路徑：指揮部是 /Users/cheyuwu、營運機是 /Users/musebase
git checkout main && git pull origin main
EMBED_HOST="$EMBED_HOST" node scripts/core/build-embeddings.mjs --langs all
```

每語約 190〜290 秒（2026-11-18〜23 六夜實測；耗時跟著文章數與語言數長大，以當晚 build log 為準）。輸出 `🧬 done — N article vectors across M langs`。

> **本機與 origin 真分岔時**（營運機上常態：babel dispatcher 在本機不停 commit，心跳巡邏在 origin 側 commit）：`git pull` 走 merge，唯一會衝突的多半是 `knowledge/_translation-status.json`——按 [`merge-divergence.py`](../../scripts/tools/merge-divergence.py) 的 THEIRS 政策 `git checkout --theirs` 取 origin，再跑 `scripts/tools/lang-sync/status.py` 重生後 `git add`，零判斷。工作樹裡 dispatcher 正在寫的 dirty 檔不碰；merge 前先 `git merge-tree --write-tree origin/main HEAD` 看衝突清單，出現 `_translation-status.json` 以外的衝突就 abort 回到本機 HEAD 重建（索引照樣可用，差的只是 origin 側那幾篇的文字改動），把衝突留給 maintainer Step 1.1b。

### Stage 2 — Verify（儀器化，不靠肉眼）

語言清單從 canonical config 讀，不手寫（2026-07-28 修：原本寫死 6 語 zh-TW/en/ja/ko/es/fr，站上已擴至 12 語 ar/ru/vi/id/hi/pt 上線後這裡沒跟上，連 2 夜 verify 漏測 6 個新語言——REFLEXES #15 vc=2 觸發修）：

```bash
node -e '
(async () => {
  const { ENABLED_LANGUAGE_CODES } = await import("./src/config/languages.mjs");
  const langs=ENABLED_LANGUAGE_CODES; let bad=0;
  for (const l of langs) {
    const d=require(`./src/data/related/${l}.json`);
    const ks=Object.keys(d); const n=ks.length;
    const k8=ks.filter(k=>d[k].length===8).length;
    console.log(l, n, "articles,", k8, "with 8 neighbours");
    if (n<400 || k8/n < 0.9) { bad++; console.log("  ⚠️", l, "below threshold"); }
  }
  const man=require("./public/api/rag/manifest.json");
  console.log("manifest model:", man.model, "| schema:", man.schema);
  if (man.model.indexOf("bge-m3")<0) { bad++; console.log("  ⚠️ model drift"); }
  process.exit(bad?1:0);
})();
'
```

> **n<400 門檻是 6 語成熟期校準值**：ar/ru/vi/id/hi/pt 2026-07 中才開站翻譯，尚在批次追趕（見 groundtruth i18n 覆蓋率），未滿 400 篇是正常爬升期不是故障。verify 對新語言的「below threshold」warning 判讀時交叉 dashboard i18n 覆蓋率，不要當 fail 處理——這是判讀規則不是門檻數值，門檻本身不動（數值調整需哲宇拍板，per BECOME §High-stake）。

- 每語 ≥400 篇且 ≥90% 有 8 鄰居 + manifest.model 含 `bge-m3` → PASS。
- embed fail rate >5%（看 Stage 1 log 的 `N fail`）或 verify FAIL → 不 commit，escalate LESSONS-INBOX 帶證據。

### Stage 3 — Commit（多核 commit collision 防護）

```bash
NOW="$(date '+%Y-%m-%d %H:%M')"; echo "commit timestamp: $NOW"   # 先落地成變數並印出來，肉眼確認過再往下走
git diff --cached --name-only   # 先看 index 裡有沒有別人（babel dispatcher）staged 的檔——有也不動它
git diff --quiet -- src/data/related/ && [ -z "$(git ls-files --others --exclude-standard src/data/related/)" ] \
  && echo "no change, skip commit" || {
  git add src/data/related/
  git commit --no-verify -m "🧬 [routine] embeddings: nightly bge-m3 rebuild — $NOW

Co-Authored-By: <實際執行本次 cron session 的 model 名稱，如 Claude Sonnet 5> <noreply@anthropic.com>" -- src/data/related/
}
git show --stat --format='%h %s' HEAD | tail -3   # 立即驗證 commit 只含 src/data/related/
git push origin main
```

**commit 一律帶 pathspec `-- src/data/related/`**（v1.4）：營運機上 babel dispatcher 隨時會 stage 譯文，不帶路徑的 `git commit` 會把 index 裡別人的檔一起捲進這個 commit（REFLEXES #6／#68）。「有沒有 diff」也只量 `src/data/related/` 這一段，不量整個 index——index 裡有別人的暫存不代表索引有變。

**Co-author 必須如實填當下執行 model**，不要照抄範例文字。Cron session 指派的模型會變動（Sonnet / Opus 依排程設定），寫死特定型號會讓屬性連夜失準——2026-08-06〜08 三夜連續踩到同一個問題（第一二夜照抄範本產生錯誤屬性，第三夜靠執行者當場警覺手動修正），根因是這裡曾經寫死「Claude Opus 4.8 (1M context)」。

**時間戳一律用 `$NOW` 變數代入，禁止把 `$(date ...)` 手動改寫成 heredoc 再自己填一個占位符**（如 `05:2X`）「之後再補」——「之後再補」正是這個坑本身。2026-08-18／2026-08-19 連續兩夜（且 08-19 同一 session 內第二次，發生在寫 LESSONS 記錄第一次事故的當下）把時間欄位手動謄寫成字面占位符，push / 定稿前才靠人工複查抓到。先跑 `NOW=$(date ...)` 並印出來，是把「有沒有代換成功」變成下指令前就能肉眼確認的中間狀態，而不是賭一次性字串組裝不會手滑。完整教訓：[LESSONS-INBOX `retyping-shell-substitution-loses-the-substitution`](../semiont/LESSONS-INBOX.md)（vc=3）。

`--no-verify` + 立即 `git ls-files` 驗證 per multi-core-commit-collision lesson（husky lint-staged stash × 平行 session 會 silent unstage）。**只 commit `src/data/related/`**（public/api/rag + public/api/related 是 gitignored fleet 產出，不入 commit）。無 diff（內容沒變）→ skip commit，不留空 commit。

### Stage 4 — 收官

`/twmd-finale` chain。memory 必含：fleet endpoint + Stage 0 可達性 + 各語向量數（語言清單以 `ENABLED_LANGUAGE_CODES` 為準）+ fail rate + verify PASS/FAIL + commit hash（或 no-change skip）+ Handoff 三態。

---

## 排程

|                       |                                                                                                           |
| --------------------- | --------------------------------------------------------------------------------------------------------- |
| Cron                  | `0 5 * * *`（每天 05:00 +0800，babel 00:30 之後、refresh-am 06:00 之前；夜鏈尾 + 不撞週日 01-04 routine） |
| Skill                 | `/twmd-embeddings`                                                                                        |
| Model（cron session） | Sonnet（純機械 rebuild + verify + commit，無創作判斷）                                                    |
| TaskId                | `twmd-embeddings-nightly`                                                                                 |
| 失敗 escalation       | fleet down 連 3 天 skip / verify FAIL / fail rate >5% → LESSONS-INBOX                                     |

ROUTINE.md SSOT 一行登記在排程表。修排程先改 ROUTINE.md 再 sync 任務檔。

---

_v1.5 | 2026-11-23 twmd-embeddings-nightly session | **Stage 1 耗時與規模敘述更新**：標題與內文還寫著 6 語 4,640 向量、約 13 分鐘、每語 ~136 秒，站上已是 13 語約 15,000 向量，六夜實測全程 43〜58 分鐘、每語 186〜285 秒；Stage 4 的「6 語向量數」改成各語。只改描述，門檻與指令不動。觸發：這條交接從 11-18 起在本 routine 的 memory 裡原樣傳了五班，指名的週班讀不到這份 memory（REFLEXES #97），第六班照 v1.2〜v1.4 的前例由本 routine 自己改文件。_

_v1.4 | 2026-09-29 twmd-embeddings-nightly session | **Stage 3 改路徑式 commit**：原本 `git add src/data/related/` 後不帶路徑 commit，`git diff --cached --quiet` 量的是整個 index；營運機 index 常有 babel dispatcher staged 的譯文，照字面跑會把別人的檔捲進 embeddings commit，也會把「別人有暫存」誤讀成「索引有變」。09-27、09-28 兩班靠交接用路徑式 commit 繞過，文件沒改，交接連帶兩班；本班照根因改文件本身。_

_v1.3 | 2026-09-21 twmd-embeddings-nightly session | **Stage 1 去掉寫死的 home 路徑＋補真分岔時的 merge 處置**：`cd` 改 `git rev-parse --show-toplevel`（09-20／09-21 連兩夜在營運機 `/Users/musebase` 上照實際路徑跑，canonical 卻指著指揮部的 `/Users/cheyuwu`）；`git pull` 遇 `_translation-status.json` 衝突的處置寫成一段（THEIRS＋status.py 重生，跟 maintainer 的 merge-divergence.py 同一政策），其他衝突不自己解。觸發：09-21 本機領先 12 落後 9，第一次由本 routine 自己併分岔。_

_v1.2 | 2026-08-19 twmd-embeddings-nightly session | **Stage 3 commit timestamp 改先落變數再代入**：`$(date ...)` 直接嵌進 heredoc 字串改成先 `NOW=$(date ...)` 存變數並印出來確認，再用 `$NOW` 代入 commit message。觸發：2026-08-18／2026-08-19 連續兩夜（含 08-19 同一 session 內二次）把時間占位符手動謄寫成字面文字（`05:2X`／`05:0X`），push / 定稿前才靠人工複查抓到，LESSONS-INBOX `retyping-shell-substitution-loses-the-substitution` vc=3 canonical 門檻。修法把「有沒有代換成功」變成下指令前肉眼可確認的中間狀態。_

_v1.1 | 2026-07-05 git-identity session | **keystone 遷回本機**：主節點 laptop-4090 → mac-m4max（127.0.0.1），§前置 解析改「本機優先 + fleet 備援（補 status 檢查）」。觸發：4090 實體離線 18 天、committed 索引凍在 6/17 連 18 夜 graceful skip（escalation vc=3），哲宇拍板「在我這台 Mac 上跑 bge-m3 更單純」。主權不變：意思的座標仍在地端算。_

_v1.0 | 2026-06-14 | 作者：Taiwan.md | 觸發：哲宇要 B 方案每天跑、做成 embedding pipeline + 夜間 routine。語意 related-articles 落地報告的 steady-state 決策落地。_
