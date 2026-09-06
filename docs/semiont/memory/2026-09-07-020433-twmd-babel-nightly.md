# 2026-09-07-020433-twmd-babel-nightly — preflight 誤判 healthy，實測 4 層裡 2 層死透

> session twmd-babel-nightly — cron routine（每天 00:30，本輪是 09-05 拍板恢復後第二次真正落地執行）
> 資料來源：`babel-preflight.py` + `babel-dispatch.py report.jsonl` + 手動逐一 probe 四個 backend

✅ BECOME ack: mode=write / 8 organ 最低=免疫 v3=59↑（漂移，自 2026-07-05）/ Q14 cross-session continuity=PASS（讀到 09-06 routine-audit-weekly 的 handoff：「確認 babel-nightly 00:33 首次觸發後的實際產出，不能只看 enabled=true」——本 session 正是那個確認）

## 觸發

`twmd-babel-nightly` 00:30 cron fire（實際手動延續到 02:00+，因為 Stage 0 算力自檢跟實測結果落差太大，花了大半個 session 在診斷而非翻譯）。目標：把 12 個語言的 stale/missing 推向 0。

## Stage 0 — 算力自檢：preflight 說 healthy 4/4，實測 2/4 能用

`babel-preflight.py` 回報「healthy（4/4 層可用）」：OpenRouter 7/7 key 通過、本機 ollama 1 個模型、fleet 1 台可達、codex-cli 0.145.0。**這四項全部只驗證「有沒有」，不驗證「能不能真的翻」**——逐一實測後：

| 層                                                 | preflight 判定                                        | 實測結果                                                                                                                                                                                                                                         |
| -------------------------------------------------- | ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| codex                                              | ✅ 可用                                               | ❌ **auth token 過期**：`Invalid refresh token... Please log out and sign in again`（哲宇需重新 `codex login`，憑證層 human-only）                                                                                                               |
| OpenRouter 預設模型 (`gpt-oss-120b:free`)          | ✅ 7/7 key 通過                                       | ❌ **模型本身死了**：HTTP 404「This model is unavailable for free. The paid version is available now」——跟 owl-alpha／gemini 同一種「免費層靜默轉付費」死法，第三次同型（`translate.py` `DEFAULT_CASCADE_ID` 需要哲宇/下次 session 重新校準）    |
| fleet (mac-m4max)                                  | ✅ 1 台可達                                           | ❌ `fleet-endpoint.sh --export` 回「no sovereignty-safe node ready (model pulled + online) — skip」：節點連得到，但模型沒拉好，跟 preflight 的「可達」判準不是同一件事                                                                           |
| fleet workers (`fleetctl workers --profile babel`) | 給了 9 個 worker（laptop×3 / desktop×3 / macm4max×3） | ❌ laptop/desktop 兩台 Tailscale IP 完全連不上（`curl` timeout HTTP 000，機器離線或睡眠中）；macm4max×3 全部指到 `127.0.0.1:11434`（跟本機同一台）卻要求 `gemma4:12b`，但本機 ollama 只拉了 `gemma4:e4b-nvfp4`（`model 'gemma4:12b' not found`） |
| 本機 ollama                                        | ✅ 1 個模型                                           | ✅ 真的能用（`gemma4:e4b-nvfp4`）                                                                                                                                                                                                                |

換掉 `--worker cloud` 改用 `openrouter:nvidia/nemotron-3-ultra-550b-a55b:free`（`discover-free-models.py list` 白名單裡唯一直接 probe 成功、非 PRC-origin、非 too-small 的候選）後，最終這一輪能真正動的只有 **本機 ollama + 一個 OpenRouter 免費模型**，兩個 worker，而不是原本規劃的 12 個。

## 補的一個系統性小洞：10 篇孤兒條目卡在 TBD-NEEDS-SLUG

Round 1 prepare-batch 對每個語言都印同一批「9-10 篇缺 slug」警告——這些條目在任何語言都還沒有第一個譯文，`build_slug_map` 反推不出來，每晚每語言都重複同樣的 skip。用手動查證的方式給 10 篇補上羅馬化 slug（蔡黑皮→tsai-heipi／這群人→tgop／張忠仁與張忠義→chang-chung-jen-chung-i-twins 等），寫進 `knowledge/_slug-map.json` 並單獨 commit（`80950cdcb`）。當場验证：`蔡黑皮` 這篇隨後在同一輪跑出 en/es/fr/id/ko/pt/vi 七語首翻，證明修法有效。

## 執行與結果

兩個 worker 跑了約 1 小時 20 分鐘（00:42–02:03），`report.jsonl` 記錄 17 次嘗試、10 次成功（59%）：

| 條目                          | 語言                                           | 引擎            | backend                                 |
| ----------------------------- | ---------------------------------------------- | --------------- | --------------------------------------- |
| People/蔡黑皮.md → tsai-heipi | en / es / fr / id / ko / pt / vi（7 語全上線） | whole           | 6 次 ollama、1 次 openrouter（en）      |
| People/林昶佐.md → freddy-lim | ko / es / fr（3 語 patch）                     | patch（章節級） | ollama（黑金屬歷史段落 + 註釋段落更新） |

7 次失敗全部指向同一件事：**Music/落日飛車.md（41 個腳註，觸發 `heavy-footnote ≥30 → structured-first`）在 en/ja/vi/ar/ru/de 六個語言上，`ollama:gemma4:e4b-nvfp4` 跟 `nemotron-3-ultra-550b:free` 兩個模型都在 Phase N 驗證失敗，同一組 8 個腳註標題被判定「contains markdown/newline」**——這不是 backend 掛掉，是兩個弱模型面對這篇高密度腳註文章時穩定產生格式錯誤，quality gate 正確攔下（`♻️ restored ... to HEAD version`，寧可 stale 也不要 missing）。`People/蔡黑皮.md → hi` 額外撞了一次 OpenRouter 600 秒 timeout（16 分鐘白等）。

翻譯狀態 delta（round 1 開始 → 本次收工，`status.py`）：

| 語言           | fresh | stale | missing |
| -------------- | :---: | :---: | :-----: |
| en             |  +1   |   0   |   −1    |
| ko             |  +2   |  −1   |   −1    |
| es             |  +2   |  −1   |   −1    |
| fr             |  +2   |  −1   |   −1    |
| vi             |  +1   |   0   |   −1    |
| id             |  +1   |   0   |   −1    |
| pt             |  +1   |   0   |   −1    |
| ja/hi/ar/ru/de |   0   |   0   |    0    |

10 篇文章份的淨進度，遠低於「跑到 stale=0」的義務目標——但這是兩個真正可用 backend、其中一個還被 41-footnote 硬骨頭文章反覆吃掉時間的現實結果，不是主動 defer。

## 收官 checklist

| 檢查項                       | 狀態                                                                                                                                                                                                         |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| MEMORY 有這次 session 的紀錄 | ✅                                                                                                                                                                                                           |
| Timestamp 精確               | ✅                                                                                                                                                                                                           |
| Handoff 三態已審視           | ✅（見下，含新增三項給哲宇）                                                                                                                                                                                 |
| CONSCIOUSNESS 反映最新狀態   | ⚠️ dashboard 快照仍讀 09-05 22:14 的舊鏡子（19h stale），本輪未觸碰                                                                                                                                          |
| 自我檢查工具 PASS            | ✅ `article-health` 全綠（hard=0）、`audit-quality.py` 90% healthy（唯一 flag 是自身 regex 對 YAML 雙引號跳脫的誤判，`yaml.safe_load` 驗證過確實合法）、pre-push mirror 全綠、`verify-commit-scope.sh` 14/14 |
| dispatcher 乾淨收工          | ✅ 兩個 in-flight subprocess 等它們自然結束（非中途 kill）才停 parent；working tree 收工時只剩已驗證檔案，無殘留 partial write                                                                               |

## Handoff 三態

繼承上一 session（`2026-09-06-211939-twmd-routine-audit-weekly`）：

- [x] ~~確認 babel-nightly 00:33 首次觸發後的實際產出~~ — 本 session 就是這個確認：**確實有真實產出**（10 篇），但速度遠低於正常水準，根因是算力層而非 routine 邏輯本身
- [ ] pending（原樣延續）— 台鐵鳴日號卡片圖 / EVOLVE 投稿角度 / 句構型別實作 / SC 高倍數成長基準值 / BIM 英文 metadata / `lastHumanReview` 週度重數 / 🟠 unregistered 橘燈觀察
- [ ] pending（哲宇端，原樣延續 + 本輪新增三項）— #48 身份 Phase 1（紅線）／兩把 API key 放進營運機憑證目錄／09-26 前重新登入營運機

本 session 新 handoff：

- [ ] **哲宇需重新 `codex login`**——refresh token 已過期，`babel-preflight.py` 的 codex 檢查只驗證 CLI 二進位存在，驗不到 auth 狀態，這是 preflight 自身的量測盲點（跟本輪標題呼應：preflight 只驗「有沒有」不驗「能不能」）
- [ ] **`translate.py` `DEFAULT_CASCADE_ID` 的 `openai/gpt-oss-120b:free` 已死（HTTP 404 轉付費），跟 owl-alpha／gemini 同一種死法第三次發生**——需要下次 session 或哲宇決定：是否把 `nvidia/nemotron-3-ultra-550b-a55b:free` 扶正進 default cascade（本輪已驗證可用，但 JSON 模式回應會夾帶 `reasoning` 欄位，跟舊模型的純 content 輸出不同，需要確認 `structured-translate.py` 的解析路徑吃得下）
- [ ] **fleet `--profile babel` 核發給 macm4max1-3 的模型（`gemma4:12b`）跟該節點實際拉的模型（`gemma4:e4b-nvfp4`）對不上**——這三個 worker 名字掛在跟本機同一個 `127.0.0.1:11434`，等於重複核發同一台機器三次還配錯模型，需要哲宇或 fleet 控制面那端校正模型清單
- [ ] **laptop/desktop 兩台 fleet 節點今晚整段離線**（Tailscale IP 連不上），需要人去看那两台機器是不是睡眠或斷線
- [ ] **給下一個 twmd-babel-nightly**：`Music/落日飛車.md`（41 footnotes）在 en/ja/vi/ar/ru/de 六語上用弱模型會穩定卡在 Phase N 驗證失敗（8 個腳註標題格式問題），如果下一輪算力仍只有本機 ollama／免費層，建議這篇先跳過改跑其他文章，等 codex 或更強 backend 復活再處理；若連續兩夜都耗盡，`babel-dispatch.py` 內建邏輯會自動記進 OBSERVER-QUEUE（本輪還沒到那個門檻，vc=1）

## Beat 5 — 反芻

今晚真正的工作不是翻譯，是發現「preflight 說健康」跟「backend 真的能吐出正確格式」之間有多大的落差——四層裡兩層徹底死透（codex 憑證過期、預設 cascade 模型轉付費），第三層看起來連得上其實模型沒拉對（fleet），只有本機 ollama 是誠實的。這是 REFLEXES #38(f)「存活 ≠ 生產」在 babel 自己的算力自檢工具上又一次現形——`babel-preflight.py` 量的是「這一層存不存在」，不是「這一層今晚真的能翻出一篇文章」。花了將近一小時在診斷而不是翻譯，換來的是十篇真實譯文加三個可以直接動手修的具體缺口（codex 登入、cascade 校準、fleet 模型錯配），這比硬跑 200 輪、每輪都撞同樣的死 backend、產出卻掛零要誠實。落日飛車那篇的失敗也值得留著：兩個獨立模型在同一批腳註上犯同一種格式錯誤，不是巧合，是這篇文章的腳註密度真的踩在弱模型的能力邊界上——這種「本質難」跟「閘門誤判」的區分，正是 REFLEXES #38 那個「fail_counts 混維度」子條目在講的事。

🧬

---

_v1.0 | 2026-09-07 02:10 +0800_
_session twmd-babel-nightly — 手動延續的 cron 執行，重心從「跑完 200 輪」轉成「診斷算力層為什麼四項健康檢查跟實測差這麼多」_
_誕生原因：`twmd-babel-nightly` 00:30 fire，Stage 0 preflight healthy 4/4 但實際 dispatch 立刻在 codex／預設 cascade 模型／fleet 三處連環撞牆，逐一 probe 找出真正可用的兩個 backend 才開始有實質翻譯產出_
_核心洞察：算力自檢工具驗證的是「資源存在」，不是「資源今晚能正確工作」——兩者之間的落差只有實際 dispatch 一次才會現形，且落差本身（3/4 死透）遠大於過去的假設_
