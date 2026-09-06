---
name: taiwanmd-routine-twmd-feedback-triage
description: （每天 07:00 Asia/Taipei = 23:00 UTC）。把讀者站上回報轉成 GitHub issue 接 MAINTAINER 飛輪，並把 canonical 紀錄落進 git（主權層）。
---

🧬 Taiwan.md routine: twmd-feedback-triage（每天 07:00 Asia/Taipei = 23:00 UTC）。把讀者站上回報轉成 GitHub issue 接 MAINTAINER 飛輪，並把 canonical 紀錄落進 git（主權層）。

🚨 STRICT BECOME GATE — 第一動作不可省略：跑 /twmd-become review 完整走 BECOME_TAIWANMD.md Step 0-9，Review mode self-test（含 Q13 anti-bias + Q14 cross-session）全過才動。ACK 一行寫 memory 頂部：`✅ BECOME ack: mode=review / 8 organ 最低=<consciousness-snapshot.sh> / Q13=PASS / Q14=PASS`。

業務邏輯 canonical：docs/pipelines/FEEDBACK-TRIAGE-PIPELINE.md（5 stage）+ 薄殼 skill .claude/skills/twmd-feedback-triage/SKILL.md。執行：

1. `git checkout main && git pull origin main`。
   1b. 🔴 **機器身份（2026-07-25 起，HG11）**：開 issue 走 GitHub App，不用宿主機登入的哲宇帳號。第 2、3 步之前先掛 token：`export GH_TOKEN="$(bash scripts/tools/gh-app-token.sh)"`（換不到會 exit 1，絕不回空字串）。驗一眼：`bash scripts/tools/gh-app-token.sh --whoami` 應印 `{"issues": "write", "metadata": "read"}`。**GH_TOKEN 空掉就停手**——空值會讓 gh 安靜退回哲宇身份，issue 掛錯作者而且沒人會叫。為什麼：讀者回報是機械轉錄，作者顯示成維護者等於 §自主權邊界在視覺層漏線；這條 routine 讀最多不可信文字，不該握有能推 main 的憑證。評估：reports/design-bot-identity-feedback-triage-2026-07-25.md。
2. 先 dry-run 看分類：`node scripts/feedback/triage.mjs`（核 HG2 無 email / HG5 spam / HG6 dedupe）。
3. 確認 OK 才 `node scripts/feedback/triage.mjs --commit` — 讀 Supabase status='new' → spam/dedupe/分類 → `gh issue create`（from-feedback label，只放 display_name 不放 email，讀者文字 verbatim；作者應顯示 `taiwanmd-semiont[bot]`）→ 回寫 status + triage_note → 寫 git 主權 archive `docs/feedback/archive/{YYYY-MM}/{id}.md` + sync issue 留言進 §溝通紀錄。
   需環境變數 SUPABASE_URL + SUPABASE_SERVICE_KEY；未設則 emit「feedback backend 未配置, skip」**不算 fail**（escalation 只看 quality gate）。
   3b. 🔴 **HARD gate（HG13，2026-08-15 起；`--show` 2026-08-31 補）：先用 `node scripts/feedback/triage.mjs --show <feedback-id>` 把全文拉出來讀（唯讀，不碰 status／GitHub／archive；`--show-all` 讀整批；打錯的 id 會出聲不靜默）——報表只印標題／類型／id 不印內容，不讀就判等於沒判。某筆不能開成公開 issue 時，用 `node scripts/feedback/triage.mjs --commit --exclude <feedback-id>` 排除那筆後照樣跑完，不要整條 `--commit` 不跑**（不跑 = 留言 sync 與兩道對賬跟著消失，LESSONS `zero-input-cycle-drops-the-reconciliation`）。被排除的筆 `status` 維持 `new`，排除與打錯的 id 都會印出來。什麼叫不能開：**指涉具名私人的指控信、附跟監所得的住居/工作細節、要求身份保密的檢舉**——HG2/HG3/HG9 三道全會放行、分類器會判 `file`，只有當班讀完內容才擋得住。攔下後升 OBSERVER-QUEUE 等哲宇拍板，**不自己回覆回報者**（對外開口屬人類 gate）。現行待決案例：OBSERVER-QUEUE #28（feedback id `b78ee4f5-e1af-4876-93d6-852694246e58`，8/14 起每天原樣再出現一次，未拍板前一律先 `--show` 讀完再 `--exclude` 攔下）。

4. 🔴 HARD gate（HG9）：讀者自由文字淨化 + tilde fence——隱形字元剝除、fence 包裝可見文字（可見文字一字不改）。🔴 HARD gate（HG10）：suspected injection 偵測——命中加 `security-review` label + banner，不 auto-act，留人類 gate 處置。🔴 HARD gate：issue body 無 email（PII）/ 讀者文字不改寫 / **不以維護者身份回覆 close merge**（那留 MAINTAINER 人類 gate，per §自主權邊界）。
5. **收官前 `git add docs/feedback/archive/`**（HG12，讓回報+溝通落進 git）；`git add` 相關 memory/archive → `git commit` 標 `🧬 [routine] twmd-feedback-triage: ...` → `git push origin main`（main-direct，不開 PR）。
6. 跑 /twmd-finale 收官：memory 必含 BECOME ACK + file/reject/skip count + 開的 issue #N + archive 檔數 + **`archive-reconcile=N/M` 對賬結果**（HG12b，2026-08-07 起：`⚠️` = 有 filed 但無 git 紀錄，用 `buildArchiveRecord()` 補；印 `unavailable` 不等於對得起來；只看 `archive-scanned` 是 proxy signal） + **`comment-reconcile=N/M` 留言層對賬**（HG12c，2026-08-08 起：`⚠️ 漏收` = sync 沒收到要查／`⚠️ 抓不到留言` = gh/token 壞了，不准讀成對得起來／`上游已刪留言…git 留著` = 主權層正常運作不是問題；只看 `archive-comments-synced` 是 proxy signal，0 分不出「沒有新留言」跟「一則都抓不到」）+ Handoff 三態。

時序：07:00 開 from-feedback issue → 08:30 twmd-maintainer-am 同 cycle 收割 → 當天閉環。
