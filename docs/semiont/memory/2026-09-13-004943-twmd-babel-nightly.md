---
title: '2026-09-13-004943-twmd-babel-nightly'
type: 'session-memory'
session_span: '2026-09-13T00:31 - 2026-09-13T00:50 +08:00'
---

# twmd-babel-nightly — 2026-09-13

## BECOME 與現場盤點

跑 write mode BECOME，完整讀完 `wake-context.latest.md`（231KB，11 段到 `wake:END`）。groundtruth 段立刻浮出兩件比「今晚翻幾篇」更急的事：一是本機沒有任何 `babel-dispatch.py` 進程在跑（前幾晚連續存活的 PID 52743 這次不在），二是 main 分支跟 origin 已經真分岔（fetch 後 `git rev-list --left-right --count origin/main...HEAD` = 138 / 191），跟 handoff 裡寫的「118 篇翻譯合併取捨等哲宇拍板」是同一件事的延續。這件事不在我的自主權範圍內，維持原判：不 `git pull`、不試著自己合併，繼續把新 commit 推去救援分支 `20260912-unpushed-routine-queue`（先把它從早上 08:53 的舊點快轉到本地 HEAD，19 個 commit 的落差）。

Stage 0 算力自檢：healthy（OpenRouter 7/7 key、本機 ollama、fleet 一台 mac-m4max 可達、codex 可用），preflight 順便报了 56 個近兩日弱適配組合（gemma31 對 ar/de 命中率個位數）。`status.py` 顯示十二語全部有真實缺口，de 覆蓋率最低（46.6%，598 篇缺），其餘介於 59%-79% 之間。

## 起跑與兩個當場修

用 `launchctl submit` 而非單純 `nohup`（vortex-loop 的既有教訓：exec cell 結束會回收 process group，只有 launchd label 能讓產線真的跨 session 常駐）起了統一 dispatcher，覆蓋十二語、三個本機 ollama worker + 兩個雲端 worker。

第一次起跑照 routine skill 給的字面範例把雲端 worker 設成 `openrouter:openai/gpt-oss-120b:free`——起跑 3 次硬失敗後自動 FREEZE，錯誤訊息直接說明：這個免費版本已經下架（「The paid version is available now」，HTTP 404）。查了 OpenRouter 當前免費模型清單，換成兩個仍在架上、且過去 48 小時 commit log 裡真的成功過的模型：`nvidia/nemotron-3-ultra-550b-a55b:free`（worker 標籤 nemo）與 `poolside/laguna-s-2.1:free`（lagunas）。順手記下：`translate.py` 的 `DEFAULT_CASCADE_ID` 第二順位也指著這個死掉的免費版——今晚沒受影響是因為 babel-dispatch 全程用明確 `--worker` 覆蓋，但任何依賴 default cascade 的其他呼叫點會安靜降級到下一層。留給 maintainer／self-evolve：這是個一行修法，但牽動 pipeline 文件的 production_signal 對照，不在今晚範圍內處理。

換完模型重跑，第一輪立刻卡住一個更大的洞：37 篇全新中文條目（鐵牛杰哥、蔣經國、林良系列等）在十二個語言**同時**被跳過，原因是這些條目一個語言的譯文都還沒有，`prepare-batch.py` 的 ASCII fallback 對純中文檔名只能吐出空字串（TBD-NEEDS-SLUG），而 `knowledge/_slug-map.json` 自己的說明檔案早就寫明這個病——只是沒人在這批新條目誕生時補進去。手動羅馬化補了這 37 筆，跑到後段又冒出 9 篇同型（文湖線、林心如等），加上「87水災」原本的劣質 fallback slug「87」，一併修正，總共新增 46 筆進 `knowledge/_slug-map.json`，精確路徑 commit 後推去救援分支。`build_slug_map()` 每輪重新建表，不用重啟 dispatcher 就吃到新條目。

修完後才看到真的翻譯在跑：es（nemo）跟 ko（macm4max3 本機 ollama）各成功一篇，lagunas 那組持續 429（可能是這個免費模型當下容量問題，dispatcher 的三連失敗凍結機制會自己接住，不需要人工介入）。

## 現況與交接

Dispatcher 以 launchd label `com.taiwanmd.babel.nightly` 常駐（PID 13990，run_dir `/tmp/babel-unified-20260913-004336-13990`），會跨過這次 session 結束繼續跑。下一個撞見它的 routine（data-refresh-am / routine-sync / maintainer-am）照 BABEL-VORTEX-LOOP 三重巡檢判斷是否讓場，不需要重新起跑。

## Handoff 三態

- [ ] main 分支的 118 篇翻譯合併取捨、issue #1711，仍等哲宇拍板，本班沒有新增進度，維持推去救援分支的作法。
- [ ] `translate.py` `DEFAULT_CASCADE_ID` 第二順位模型（`openai/gpt-oss-120b:free`）已下架，需要一行修法 + 同步 `SQUEEZE-MODELS-MAX-PIPELINE.md` 的鏡射段落（REFLEXES #56）。
- [ ] `poolside/laguna-s-2.1:free` 今晚持續 429，若接下來幾夜仍是低命中率，考慮從 cloud worker 池移除。
- ⏳ blocked（沿用上一班）：OBSERVER-QUEUE #28(a)、#54（🔒 紅線）、#55（14 天 default 2026-09-25）、#1678、#1609 等哲宇。

## Beat 5：一句反芻

37 篇卡住的都是老文章早就熟悉的技術債之外的東西：新文章誕生的那一刻，這個系統從沒替它預留過進翻譯佇列的入口。
