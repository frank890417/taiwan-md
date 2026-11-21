# 巴別塔同步進度日誌

> 每次更新增補一段（producer: `progress-snapshot.py`，資料源同目錄 `progress-*.jsonl`）。fresh=最新 / stale=可讀待刷新 / missing=無頁面。


## 2026-11-06T00:45:14+08:00（zh 總數 1162）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1088 | 70 | 4 | 99.7% | — | — |
| ja | 1092 | 66 | 4 | 99.7% | — | — |
| ko | 1093 | 65 | 4 | 99.7% | — | — |
| es | 1086 | 70 | 6 | 99.5% | — | — |
| fr | 1091 | 67 | 4 | 99.7% | — | — |
| vi | 1079 | 77 | 6 | 99.5% | — | — |
| id | 1085 | 72 | 5 | 99.6% | — | — |
| pt | 1088 | 70 | 4 | 99.7% | — | — |
| hi | 1081 | 77 | 4 | 99.7% | — | — |
| ar | 1091 | 67 | 4 | 99.7% | — | — |
| ru | 1099 | 59 | 4 | 99.7% | — | — |
| de | 1072 | 86 | 4 | 99.7% | — | — |

總缺口（stale+missing）：**899**

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 5 | — | — | ?×5 |
| worker:haiku1 | 0 | 1 | — | — | no output written by tra×1 |
| worker:haiku2 | 0 | 2 | — | — | no output written by tra×1；?×1 |
| worker:haiku3 | 0 | 1 | — | — | no output written by tra×1 |
| worker:macm4max | 1124 | 184 | — | 118.5 | no output written by tra×108；patch candidate rejected×23 |
| worker:nemo | 1302 | 142 | — | 95.5 | no output written by tra×50；patch candidate rejected×32 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-07T00:45:49+08:00（zh 總數 1162）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1114 | 44 | 4 | 99.7% | +26 | · |
| ja | 1118 | 40 | 4 | 99.7% | +26 | · |
| ko | 1119 | 39 | 4 | 99.7% | +26 | · |
| es | 1110 | 46 | 6 | 99.5% | +24 | · |
| fr | 1120 | 38 | 4 | 99.7% | +29 | · |
| vi | 1103 | 53 | 6 | 99.5% | +24 | · |
| id | 1107 | 50 | 5 | 99.6% | +22 | · |
| pt | 1112 | 46 | 4 | 99.7% | +24 | · |
| hi | 1106 | 52 | 4 | 99.7% | +25 | · |
| ar | 1116 | 42 | 4 | 99.7% | +25 | · |
| ru | 1125 | 33 | 4 | 99.7% | +26 | · |
| de | 1092 | 66 | 4 | 99.7% | +20 | · |

總缺口（stale+missing）：**602**（▼297 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 5 | · | — | ?×5 |
| worker:haiku1 | 0 | 1 | · | — | no output written by tra×1 |
| worker:haiku2 | 0 | 2 | · | — | no output written by tra×1；?×1 |
| worker:haiku3 | 0 | 1 | · | — | no output written by tra×1 |
| worker:macm4max | 1138 | 234 | +14 | 117.1 | no output written by tra×146；patch candidate rejected×33 |
| worker:nemo | 1593 | 182 | +291 | 109.3 | no output written by tra×62；patch candidate rejected×42 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-19T00:47:09+08:00（zh 總數 1191）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 722 | 463 | 6 | 99.5% | -392 | +2 |
| ja | 722 | 462 | 7 | 99.4% | -396 | +3 |
| ko | 728 | 456 | 7 | 99.4% | -391 | +3 |
| es | 729 | 456 | 6 | 99.5% | -381 | · |
| fr | 729 | 454 | 8 | 99.3% | -391 | +4 |
| vi | 716 | 464 | 11 | 99.1% | -387 | +5 |
| id | 717 | 466 | 8 | 99.3% | -390 | +3 |
| pt | 729 | 456 | 6 | 99.5% | -383 | +2 |
| hi | 708 | 469 | 14 | 98.8% | -398 | +10 |
| ar | 718 | 463 | 10 | 99.2% | -398 | +6 |
| ru | 735 | 450 | 6 | 99.5% | -390 | +2 |
| de | 704 | 479 | 8 | 99.3% | -388 | +4 |

總缺口（stale+missing）：**5635**（▲5033 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:haiku1 | 0 | 5 | · | — | no output written by tra×4；?×1 |
| worker:haiku2 | 0 | 4 | · | — | no output written by tra×4 |
| worker:haiku3 | 0 | 4 | · | — | no output written by tra×4 |
| worker:macm4max | 815 | 31 | -323 | 73.7 | no output written by tra×12；verify=1 [URL count]×4 |
| worker:nemo | 383 | 34 | -1210 | 119.8 | no output written by tra×11；magnitude[1]×6 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-19T01:26:55+08:00（zh 總數 1191）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1103 | 82 | 6 | 99.5% | +381 | · |
| ja | 1105 | 79 | 7 | 99.4% | +383 | · |
| ko | 1110 | 74 | 7 | 99.4% | +382 | · |
| es | 1105 | 80 | 6 | 99.5% | +376 | · |
| fr | 1111 | 72 | 8 | 99.3% | +382 | · |
| vi | 1086 | 94 | 11 | 99.1% | +370 | · |
| id | 1096 | 87 | 8 | 99.3% | +379 | · |
| pt | 1105 | 80 | 6 | 99.5% | +376 | · |
| hi | 1081 | 96 | 14 | 98.8% | +373 | · |
| ar | 1095 | 86 | 10 | 99.2% | +377 | · |
| ru | 1113 | 72 | 6 | 99.5% | +378 | · |
| de | 1080 | 103 | 8 | 99.3% | +376 | · |

總缺口（stale+missing）：**1102**（▼4533 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:haiku1 | 0 | 5 | · | — | no output written by tra×4；?×1 |
| worker:haiku2 | 0 | 4 | · | — | no output written by tra×4 |
| worker:haiku3 | 0 | 4 | · | — | no output written by tra×4 |
| worker:macm4max | 878 | 31 | +63 | 69.6 | no output written by tra×12；verify=1 [URL count]×4 |
| worker:nemo | 386 | 34 | +3 | 124.6 | no output written by tra×11；magnitude[1]×6 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-20T00:44:14+08:00（zh 總數 1191）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1165 | 21 | 5 | 99.6% | +62 | -1 |
| ja | 1172 | 13 | 6 | 99.5% | +67 | -1 |
| ko | 1173 | 12 | 6 | 99.5% | +63 | -1 |
| es | 1166 | 20 | 5 | 99.6% | +61 | -1 |
| fr | 1173 | 12 | 6 | 99.5% | +62 | -2 |
| vi | 1142 | 39 | 10 | 99.2% | +56 | -1 |
| id | 1157 | 28 | 6 | 99.5% | +61 | -2 |
| pt | 1170 | 16 | 5 | 99.6% | +65 | -1 |
| hi | 1136 | 42 | 13 | 98.9% | +55 | -1 |
| ar | 1155 | 27 | 9 | 99.2% | +60 | -1 |
| ru | 1180 | 5 | 6 | 99.5% | +67 | · |
| de | 1141 | 43 | 7 | 99.4% | +61 | -1 |

總缺口（stale+missing）：**362**（▼740 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 5 | — | — | ?×5 |
| worker:haiku1 | 0 | 5 | · | — | no output written by tra×4；?×1 |
| worker:haiku2 | 0 | 4 | · | — | no output written by tra×4 |
| worker:haiku3 | 0 | 4 | · | — | no output written by tra×4 |
| worker:macm4max | 1322 | 80 | +444 | 91.8 | no output written by tra×27；verify=1 [URL count]×13 |
| worker:nemo | 721 | 102 | +335 | 121.7 | no output written by tra×31；magnitude[1]×15 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-20T00:49:41+08:00（zh 總數 1191）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1167 | 19 | 5 | 99.6% | +2 | · |
| ja | 1174 | 11 | 6 | 99.5% | +2 | · |
| ko | 1174 | 11 | 6 | 99.5% | +1 | · |
| es | 1167 | 19 | 5 | 99.6% | +1 | · |
| fr | 1174 | 11 | 6 | 99.5% | +1 | · |
| vi | 1146 | 35 | 10 | 99.2% | +4 | · |
| id | 1158 | 27 | 6 | 99.5% | +1 | · |
| pt | 1171 | 15 | 5 | 99.6% | +1 | · |
| hi | 1137 | 41 | 13 | 98.9% | +1 | · |
| ar | 1157 | 25 | 9 | 99.2% | +2 | · |
| ru | 1181 | 4 | 6 | 99.5% | +1 | · |
| de | 1144 | 40 | 7 | 99.4% | +3 | · |

總缺口（stale+missing）：**342**（▼20 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 5 | · | — | ?×5 |
| worker:haiku1 | 0 | 5 | · | — | no output written by tra×4；?×1 |
| worker:haiku2 | 0 | 4 | · | — | no output written by tra×4 |
| worker:haiku3 | 0 | 4 | · | — | no output written by tra×4 |
| worker:macm4max | 1324 | 80 | +2 | 92.3 | no output written by tra×27；verify=1 [URL count]×13 |
| worker:nemo | 721 | 102 | · | 121.7 | no output written by tra×31；magnitude[1]×15 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-21T00:44:07+08:00（zh 總數 1192）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1186 | 6 | 0 | 100.0% | +19 | -5 |
| ja | 1185 | 7 | 0 | 100.0% | +11 | -6 |
| ko | 1183 | 9 | 0 | 100.0% | +9 | -6 |
| es | 1180 | 12 | 0 | 100.0% | +13 | -5 |
| fr | 1181 | 9 | 2 | 99.8% | +7 | -4 |
| vi | 1171 | 18 | 3 | 99.7% | +25 | -7 |
| id | 1181 | 11 | 0 | 100.0% | +23 | -6 |
| pt | 1186 | 6 | 0 | 100.0% | +15 | -5 |
| hi | 1165 | 22 | 5 | 99.6% | +28 | -8 |
| ar | 1181 | 9 | 2 | 99.8% | +24 | -7 |
| ru | 1188 | 4 | 0 | 100.0% | +7 | -6 |
| de | 1161 | 31 | 0 | 100.0% | +17 | -7 |

總缺口（stale+missing）：**156**（▼186 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 11 | · | — | ?×11 |
| worker:haiku1 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:haiku2 | 0 | 5 | · | — | no output written by tra×5 |
| worker:haiku3 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:macm4max | 1485 | 164 | +161 | 104.5 | no output written by tra×54；verify=1 [tags ASCII]×18 |
| worker:nemo | 805 | 171 | +84 | 135.9 | no output written by tra×52；magnitude[1]×23 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-21T00:53:13+08:00（zh 總數 1192）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1187 | 5 | 0 | 100.0% | +1 | · |
| ja | 1185 | 7 | 0 | 100.0% | · | · |
| ko | 1183 | 9 | 0 | 100.0% | · | · |
| es | 1181 | 11 | 0 | 100.0% | +1 | · |
| fr | 1181 | 9 | 2 | 99.8% | · | · |
| vi | 1171 | 18 | 3 | 99.7% | · | · |
| id | 1181 | 11 | 0 | 100.0% | · | · |
| pt | 1187 | 5 | 0 | 100.0% | +1 | · |
| hi | 1165 | 22 | 5 | 99.6% | · | · |
| ar | 1181 | 9 | 2 | 99.8% | · | · |
| ru | 1188 | 4 | 0 | 100.0% | · | · |
| de | 1161 | 31 | 0 | 100.0% | · | · |

總缺口（stale+missing）：**153**（▼3 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 11 | · | — | ?×11 |
| worker:haiku1 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:haiku2 | 0 | 5 | · | — | no output written by tra×5 |
| worker:haiku3 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:macm4max | 1485 | 164 | · | 104.5 | no output written by tra×54；verify=1 [tags ASCII]×18 |
| worker:nemo | 805 | 173 | · | 135.9 | no output written by tra×52；magnitude[1]×24 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-21T00:55:01+08:00（zh 總數 1192）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1187 | 5 | 0 | 100.0% | · | · |
| ja | 1185 | 7 | 0 | 100.0% | · | · |
| ko | 1183 | 9 | 0 | 100.0% | · | · |
| es | 1181 | 11 | 0 | 100.0% | · | · |
| fr | 1181 | 9 | 2 | 99.8% | · | · |
| vi | 1171 | 18 | 3 | 99.7% | · | · |
| id | 1181 | 11 | 0 | 100.0% | · | · |
| pt | 1187 | 5 | 0 | 100.0% | · | · |
| hi | 1165 | 22 | 5 | 99.6% | · | · |
| ar | 1181 | 9 | 2 | 99.8% | · | · |
| ru | 1188 | 4 | 0 | 100.0% | · | · |
| de | 1161 | 31 | 0 | 100.0% | · | · |

總缺口（stale+missing）：**153**（＝0 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 11 | · | — | ?×11 |
| worker:haiku1 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:haiku2 | 0 | 5 | · | — | no output written by tra×5 |
| worker:haiku3 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:macm4max | 1485 | 164 | · | 104.5 | no output written by tra×54；verify=1 [tags ASCII]×18 |
| worker:nemo | 805 | 173 | · | 135.9 | no output written by tra×52；magnitude[1]×24 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-22T00:43:49+08:00（zh 總數 1193）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1189 | 4 | 0 | 100.0% | +2 | · |
| ja | 1187 | 6 | 0 | 100.0% | +2 | · |
| ko | 1185 | 8 | 0 | 100.0% | +2 | · |
| es | 1185 | 8 | 0 | 100.0% | +4 | · |
| fr | 1184 | 9 | 0 | 100.0% | +3 | -2 |
| vi | 1179 | 13 | 1 | 99.9% | +8 | -2 |
| id | 1185 | 8 | 0 | 100.0% | +4 | · |
| pt | 1188 | 5 | 0 | 100.0% | +1 | · |
| hi | 1177 | 14 | 2 | 99.8% | +12 | -3 |
| ar | 1186 | 6 | 1 | 99.9% | +5 | -1 |
| ru | 1190 | 3 | 0 | 100.0% | +2 | · |
| de | 1162 | 31 | 0 | 100.0% | +1 | · |

總缺口（stale+missing）：**119**（▼34 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 20 | · | — | ?×20 |
| worker:haiku1 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:haiku2 | 0 | 5 | · | — | no output written by tra×5 |
| worker:haiku3 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:macm4max | 1514 | 230 | +29 | 108.3 | no output written by tra×80；verify=1 [tags ASCII]×27 |
| worker:nemo | 831 | 244 | +26 | 147.5 | no output written by tra×79；magnitude[1]×34 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）

## 2026-11-22T01:10:46+08:00（zh 總數 1193）

| 語言 | fresh | stale | missing | 覆蓋率 | Δfresh | Δmissing |
| --- | ---: | ---: | ---: | ---: | ---: | ---: |
| en | 1189 | 4 | 0 | 100.0% | · | · |
| ja | 1187 | 6 | 0 | 100.0% | · | · |
| ko | 1185 | 8 | 0 | 100.0% | · | · |
| es | 1185 | 8 | 0 | 100.0% | · | · |
| fr | 1184 | 9 | 0 | 100.0% | · | · |
| vi | 1179 | 13 | 1 | 99.9% | · | · |
| id | 1185 | 8 | 0 | 100.0% | · | · |
| pt | 1188 | 5 | 0 | 100.0% | · | · |
| hi | 1177 | 14 | 2 | 99.8% | · | · |
| ar | 1186 | 6 | 1 | 99.9% | · | · |
| ru | 1190 | 3 | 0 | 100.0% | · | · |
| de | 1162 | 31 | 0 | 100.0% | · | · |

總缺口（stale+missing）：**119**（＝0 vs 上一筆）

**節點／worker**（ok/fail 為累計；Δ為對上一筆）

| 節點 | ok | fail | Δok | 平均秒 | 主要 fail |
| --- | ---: | ---: | ---: | ---: | --- |
| worker:? | 0 | 20 | · | — | ?×20 |
| worker:haiku1 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:haiku2 | 0 | 5 | · | — | no output written by tra×5 |
| worker:haiku3 | 0 | 6 | · | — | no output written by tra×5；?×1 |
| worker:macm4max | 1514 | 230 | · | 108.3 | no output written by tra×80；verify=1 [tags ASCII]×27 |
| worker:nemo | 831 | 245 | · | 147.5 | no output written by tra×79；magnitude[1]×34 |

endpoint 探活：local 🟢、laptop-4090 🔴、laptop-5090 🔴、desktop-3090 🔴、mac-m4max 🟢

（babel-pulse 常駐儀器自動快照）
