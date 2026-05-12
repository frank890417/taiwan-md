# Contributors Maintenance

> Contributor display layer 的維護紀律。對齊 #1047 / PR #1052 + Patch D verify script。

## TL;DR

Contributor display 由**兩個 standard layer** 合作：

| 檔案 | Layer | 職責 |
|------|-------|------|
| `.mailmap` | Git tooling | 把同人多 commit identity 變體（譬如 `Wu Che Yu` / `Che-Yu Wu` / `frank890417`）統一到 canonical name |
| `.all-contributorsrc` | all-contributors standard | Canonical name → `login` + display + contributions metadata lookup |

`src/utils/contributors.ts` 的 `resolveContributor()` 把兩個 layer 組合：
1. 用 `%aN/%aE` (mailmap-aware) 讀 author identity
2. 用 `contributorKey()` normalize 後在 `.all-contributorsrc` 查 profile
3. 拿 `profile.login` 當 URL slug、`profile.name` 或 mailmap canonical 當 display

任一 layer 漏掉 → silent break（URL 用 fallback authorName，可能含空格/特殊字元）。

## 新 contributor onboarding

**標準流程**（適用 95% case）：

```
某人開 PR → merge → 用 all-contributors bot 補 entry：
  @all-contributors please add @<github-login> for <contribution-type>

  contribution-type: code / content / doc / translation / bug / review / 
                     design / ideas / projectManagement / infra / security / tool
```

bot 會自動 update `.all-contributorsrc` + README contributor 牆。

**特殊 case**（contributor 有 multiple commit identity 變體）：

如果同一人用多個 `git config user.name/email` commit（譬如改過 GitHub display name、多裝置不同 config），除了 `.all-contributorsrc` entry 外還要補 `.mailmap`：

```
# .mailmap 格式
<canonical-name> <canonical-email> <commit-name> <commit-email>

# 範例：把 "Wu Che Yu" / "frank890417" 統一到 "Che-Yu Wu"
Che-Yu Wu <cheyu.wu@monoame.com> <frank890417@gmail.com>
Che-Yu Wu <cheyu.wu@monoame.com> Wu Che Yu <frank890417@gmail.com>
```

## Verify script 怎麼用

`scripts/tools/verify-contributors.mjs` 自動接進 `npm run prebuild`。

它跑 `git log --use-mailmap` 拿所有 canonical authors → 對照 `.all-contributorsrc` 用 contributorKey lookup → 列出 missing/URL-unsafe case，**只 warn 不 fail build**。

### Warning 怎麼處理

跑 `npm run prebuild:verify-contributors` 看當前狀態。譬如：

```
⚠️  verify-contributors: found missing/unsafe contributor entries
   Missing .all-contributorsrc entries (3):
     "Foo Bar" <foo@example.com>
     ...
```

兩種處理：

1. **常規**：用 `@all-contributors please add @<login>` 讓 bot 補 entry
2. **edge case（contributor 有 display name 變體沒 normalize）**：
   - 補 `.mailmap` alias 把 raw commit author name 統一到 canonical
   - 譬如 `Foo Bar` raw → 統一到 `.all-contributorsrc` 既有 entry 的 name

## 自定義 display name

`contributors.ts` 邏輯支援 **display ≠ login**：

| 想要 | 怎麼做 |
|------|--------|
| Display = login（譬如 `Zaious` / `Zaious`）| `.all-contributorsrc` `name: "Zaious"` |
| Display ≠ login（譬如 `Zaious (@ChronicleCore)` / `Zaious`）| `.all-contributorsrc` `name: "Zaious (@ChronicleCore)"`，`login: "Zaious"` |

哲宇 Che-Yu Wu / login frank890417 就是後者範例。

## DNA refs

- DNA #43 derived 資料儀器化進生命週期觸發點 — verify script 接 prebuild
- DNA #52 Immune fail-loud — warn 不沈默
- Issue #1047 §4 紀律 — 修 contributor bug 不動 `knowledge/*.md`

## 相關 commits

- PR #1052 (commit `758a23dc4`) — `%aN/%aE` mailmap-aware + `.mailmap` Zaious alias
- 本 PR — verify script + prebuild 整合 + 本 doc
