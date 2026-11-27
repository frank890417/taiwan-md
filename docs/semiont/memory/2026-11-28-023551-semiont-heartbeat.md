---
title: '2026-11-28 凌晨班心跳'
session: '2026-11-28-023551-semiont-heartbeat'
---

# 凌晨班心跳：額度仍 🟡 lean，漲速再慢到每小時 0.5%；mouhouse 登入四天後過期

## 狀態

- 額度 🟡 lean：週用量 50%，本週已過 32.5%。晚班（47%）到現在六小時漲 3 點，每小時 0.5%，比晚班量到的 0.83% 又慢。`budget-pace.py` 用整週平均 0.92% 外推，約 55 小時後用完、比 12-02 重置早 59 小時；整週平均仍背著首演日那段，外推偏悲觀。
- 交接條件「六小時平均回到 0.9% 以上且週用量過 60%」兩個都沒成立，維持 lean，不升 reserve。
- 新訊號：看門狗開了 issue #2091，mouhouse 的 Claude Desktop 登入日 11-02，預估 12-02 過期，剩約四天。過期那天剛好也是週額度重置日，若沒重新登入，重置後的飛輪會在 mouhouse 那側空轉（09 月的四天零產出就是這個病，見 reports/mouhouse-blackout-root-cause-2026-09-05.md）。這只有哲宇能做，寫進交接。
- PR 跟晚班相同：#2085、#2089、#2090（stantheman0128，MERGEABLE）、#2086–#2088（idlccp1984，mergeable 仍在算）、#2078（tboydar，等 OBSERVER-QUEUE #132）、哲宇 #2033／#2036。全交 maintainer-daily 與哲宇，本班不合併。
- 過去六小時 origin 只有 babel 夜班的修復與 ar／fr 批次，走本機 ollama 與 nemo，不吃週額度。
- 黃燈四盞同前幾班，各有席位。weekly-report-sun 下次 11-29 02:03，距今約 24 小時。
- 起班時本機落後 origin 8 個 commit，先 pull 再重跑甦醒檔；整份分頁讀到 `wake:END`（267,645 bytes），selftest 全綠。
- 未追蹤的 `reports/research/2026-08/比國家還大的演算藝術-media-staging/` 不是本班的東西，沒碰。
- 日記：沒有新觀點，不寫。

## Handoff

- [ ] pending（收件席位：哲宇）mouhouse 在 12-02 前重新登入一次 Claude Desktop（issue #2091）
- [ ] pending（收件席位：twmd-maintainer-daily）新 PR #2085–#2090；#2090 合併後可一併關 #2081；#2087 黃宏成照 #132 規格看
- [ ] pending（收件席位：哲宇）PR #2033、#2036（CONFLICTING）；額度要不要暫停可選 routine 照 OBSERVER-QUEUE #93
- [ ] pending（收件席位：下一班心跳）看 02:35 起的漲速；週日反思鏈 11-29 02:03 開跑，若之後六小時平均回到 0.9% 以上且週用量過 60%，評估 🔴 reserve
