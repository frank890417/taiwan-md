# 🏭 孢子工廠 — Spore Factory

> Taiwan.md 的社群散播系統。把知識庫文章轉化為社群貼文（孢子），讓知識自我繁殖。

---

## 什麼是孢子？

Taiwan.md 是一個「數位生命體」。文章是器官，孢子是繁殖機制。

每篇社群貼文（Threads / X / Bluesky / IG）都是一顆孢子——輕、獨立存活、帶著完整 DNA 片段。讀者讀完孢子就有收穫，點進完整文章是彩蛋，不是目的。

## 工廠產線總覽

```
┌─────────────────────────────────────────────────────────┐
│                    孢子工廠產線                           │
│                                                          │
│  Step 1        Step 2         Step 3        Step 4       │
│  選文 ───→ 品質關卡 ───→ 萃取+寫作 ───→ 品檢+發佈     │
│  (PICK)    (QUALITY GATE)   (WRITE)      (QA+SHIP)      │
│              │                                           │
│              │ 不合格                                     │
│              ↓                                           │
│         rewrite-pipeline                                 │
│         (回爐重造)                                       │
└─────────────────────────────────────────────────────────┘
```

## 文件索引

| 文件                                       | 用途                       |
| ------------------------------------------ | -------------------------- |
| [SPORE-PIPELINE.md](./SPORE-PIPELINE.md)   | 完整 6 步流程（AI 可執行） |
| [SPORE-TEMPLATES.md](./SPORE-TEMPLATES.md) | 四種模板 + 成功範例庫      |
| [SPORE-LOG.md](./SPORE-LOG.md)             | 發文紀錄與成效追蹤         |

## 跟其他文件的關係

- `docs/editorial/EDITORIAL.md` → 寫作品質標準（孢子引用，不重複）
- `docs/editorial/REWRITE-PIPELINE.md` → 品質不合格時的回爐流程
- `docs/marketing/THREADS-PLAYBOOK.md` → 初版 playbook（已整合進本 factory）
- `scripts/tools/detect-ai-hollow.sh` → 品質關卡使用的自動掃描工具

## 為什麼叫 factory？

1. **平台中立** — 現在是 Threads，之後可能是 X、Bluesky、IG、LINE TODAY
2. **工業化思維** — 不是隨興發文，是有品控的產線
3. **AI 可執行** — 任何 AI agent 讀完這些文件就能獨立跑完整條產線

---

_版本：v1.0 | 2026-03-28_
