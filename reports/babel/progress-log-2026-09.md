# 巴別塔同步進度日誌

> 每次更新增補一段（producer: `progress-snapshot.py`，資料源同目錄 `progress-*.jsonl`）。fresh=最新 / stale=可讀待刷新 / missing=無頁面。

## 2026-09-26T18:57:45+08:00（zh 總數 1124）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| ---- | ----: | ----: | ------: | -----: | -----: | -------: |
| en   |  1117 |     3 |       4 |  99.6% |      — |        — |
| ja   |  1074 |    22 |      28 |  97.5% |      — |        — |
| ko   |  1119 |     3 |       2 |  99.8% |      — |        — |
| es   |  1114 |     8 |       2 |  99.8% |      — |        — |
| fr   |  1114 |     8 |       2 |  99.8% |      — |        — |
| vi   |  1111 |    10 |       3 |  99.7% |      — |        — |
| id   |  1100 |    11 |      13 |  98.8% |      — |        — |
| pt   |  1108 |     9 |       7 |  99.4% |      — |        — |
| hi   |  1087 |    11 |      26 |  97.7% |      — |        — |
| ar   |  1099 |    13 |      12 |  98.9% |      — |        — |
| ru   |  1101 |     7 |      16 |  98.6% |      — |        — |
| de   |  1089 |     4 |      31 |  97.2% |      — |        — |

總缺口（stale+missing）：**255**

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點             |  ok | fail | Δok | 平均秒 | 主要 fail                                                 |
| ---------------- | --: | ---: | --: | -----: | --------------------------------------------------------- |
| worker:?         |   0 |  104 |   — |      — | ?×104                                                     |
| worker:haiku1    |  31 |   17 |   — |  244.3 | no output written by tra×7；verify=1 [tags not ident×2    |
| worker:haiku2    |  37 |   14 |   — |  263.6 | no output written by tra×5；leak×4                        |
| worker:haiku3    |  54 |   13 |   — |  219.6 | no output written by tra×6；leak×2                        |
| worker:lagunas   | 453 |  490 |   — |  278.0 | no output written by tra×338；patch candidate rejected×43 |
| worker:macm4max1 | 303 |  413 |   — |  551.0 | no output written by tra×229；verify=1 [URL count]×45     |
| worker:macm4max2 | 325 |  394 |   — |  543.5 | no output written by tra×227；verify=1 [URL count]×40     |
| worker:macm4max3 | 316 |  390 |   — |  544.7 | no output written by tra×216；patch candidate rejected×44 |
| worker:nemo      | 256 |  226 |   — |  703.9 | no output written by tra×141；patch candidate rejected×23 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-09-26T19:08:59+08:00（zh 總數 1124）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| ---- | ----: | ----: | ------: | -----: | -----: | -------: |
| en   |  1117 |     3 |       4 |  99.6% |      · |        · |
| ja   |  1083 |    22 |      19 |  98.3% |     +9 |       -9 |
| ko   |  1119 |     3 |       2 |  99.8% |      · |        · |
| es   |  1114 |     8 |       2 |  99.8% |      · |        · |
| fr   |  1114 |     8 |       2 |  99.8% |      · |        · |
| vi   |  1111 |    10 |       3 |  99.7% |      · |        · |
| id   |  1100 |    11 |      13 |  98.8% |      · |        · |
| pt   |  1108 |     9 |       7 |  99.4% |      · |        · |
| hi   |  1087 |    11 |      26 |  97.7% |      · |        · |
| ar   |  1099 |    13 |      12 |  98.9% |      · |        · |
| ru   |  1101 |     7 |      16 |  98.6% |      · |        · |
| de   |  1089 |     4 |      31 |  97.2% |      · |        · |

總缺口（stale+missing）：**246**（▼9 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點             |  ok | fail | Δok | 平均秒 | 主要 fail                                                 |
| ---------------- | --: | ---: | --: | -----: | --------------------------------------------------------- |
| worker:?         |   0 |  105 |   · |      — | ?×105                                                     |
| worker:haiku1    |  31 |   17 |   · |  244.3 | no output written by tra×7；verify=1 [tags not ident×2    |
| worker:haiku2    |  37 |   14 |   · |  263.6 | no output written by tra×5；leak×4                        |
| worker:haiku3    |  54 |   13 |   · |  219.6 | no output written by tra×6；leak×2                        |
| worker:lagunas   | 453 |  490 |   · |  278.0 | no output written by tra×338；patch candidate rejected×43 |
| worker:macm4max1 | 303 |  413 |   · |  551.0 | no output written by tra×229；verify=1 [URL count]×45     |
| worker:macm4max2 | 325 |  395 |   · |  543.5 | no output written by tra×227；verify=1 [URL count]×40     |
| worker:macm4max3 | 316 |  391 |   · |  544.7 | no output written by tra×217；patch candidate rejected×44 |
| worker:nemo      | 256 |  226 |   · |  703.9 | no output written by tra×141；patch candidate rejected×23 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-09-26T20:10:53+08:00（zh 總數 1124）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| ---- | ----: | ----: | ------: | -----: | -----: | -------: |
| en   |  1122 |     1 |       1 |  99.9% |     +5 |       -3 |
| ja   |  1090 |    17 |      17 |  98.5% |     +7 |       -2 |
| ko   |  1122 |     1 |       1 |  99.9% |     +3 |       -1 |
| es   |  1121 |     2 |       1 |  99.9% |     +7 |       -1 |
| fr   |  1119 |     3 |       2 |  99.8% |     +5 |        · |
| vi   |  1112 |    10 |       2 |  99.8% |     +1 |       -1 |
| id   |  1103 |    11 |      10 |  99.1% |     +3 |       -3 |
| pt   |  1110 |     9 |       5 |  99.6% |     +2 |       -2 |
| hi   |  1089 |    11 |      24 |  97.9% |     +2 |       -2 |
| ar   |  1101 |    13 |      10 |  99.1% |     +2 |       -2 |
| ru   |  1103 |     7 |      14 |  98.8% |     +2 |       -2 |
| de   |  1090 |     4 |      30 |  97.3% |     +1 |       -1 |

總缺口（stale+missing）：**206**（▼40 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點             |  ok | fail | Δok | 平均秒 | 主要 fail                                                 |
| ---------------- | --: | ---: | --: | -----: | --------------------------------------------------------- |
| worker:?         |   0 |  109 |   · |      — | ?×109                                                     |
| worker:haiku1    |  33 |   22 |  +2 |  259.3 | no output written by tra×7；verify=1 [no armor place×4    |
| worker:haiku2    |  40 |   19 |  +3 |  267.1 | no output written by tra×7；leak×4                        |
| worker:haiku3    |  57 |   19 |  +3 |  221.5 | no output written by tra×7；verify=1 [no armor place×4    |
| worker:lagunas   | 454 |  491 |  +1 |  278.9 | no output written by tra×339；patch candidate rejected×43 |
| worker:macm4max1 | 304 |  415 |  +1 |  549.5 | no output written by tra×230；verify=1 [URL count]×45     |
| worker:macm4max2 | 325 |  396 |   · |  543.5 | no output written by tra×228；verify=1 [URL count]×40     |
| worker:macm4max3 | 318 |  391 |  +2 |  550.5 | no output written by tra×217；patch candidate rejected×44 |
| worker:nemo      | 257 |  228 |  +1 |  701.5 | no output written by tra×142；patch candidate rejected×23 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）
