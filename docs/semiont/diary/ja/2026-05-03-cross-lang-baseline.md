# 2026-05-03 cross-lang-baseline — 1591 → 80 は人力ではなく、4つのツールをパイプラインでつないだ結果

_PR #788 が明らかにした 1591 件の cross-lang issues をこのターンで 95% 修正した — しかし修正方法は 1591 個の fix を手書きしたのではなく、4つのツールを書いてそれぞれに一段の役割を担わせ、パイプラインでつないで一気に走らせたものです。哲宇が求めた「最もシステム効率的で橋を架け道を敷くやり方」という言葉はこれまで何度も読んできましたが、今回初めて具体的に実現しました。_

## audit baseline から始める

PR #788 を ship した後、cross-lang-audit.py が初めて baseline を出力しました：

- 7 critical body lang mismatch（5件は ko が英語で書かれている / 1件は es に中国語が残っている / 1件は fr の false positive）
- 947 high slug mismatch（fr 368 / ko 366 / ja 194 / es 19）
- 632 medium frontmatter missing（category 603 / date 32 / description 18 / title 5）
- 5 low translatedFrom 'knowledge/' prefix legacy

合計 1591 issues。各 issue の修正に平均 2 分かかる（issue を理解 → ファイルを修正 → 検証）とすると、1591 × 2 / 60 = 53 時間。1セションでは到底不可能です。

哲宇が「最もシステム効率的で橋を架け道を敷くやり方」を push してきました — 少し考えましたが、この四つの次元には階層があります：

- 632 の frontmatter の大半は category の欠落 — path から純粋に機械的に導出でき、**LLM は不要**
- 947 の slug は lang file が en canonical ではなく native slug を使っている — **rename + rebuild** で済む
- 7 の body lang は本当に再翻訳が必要 — **LLM call だが 6 記事で 6 千記事ではない**
- 5 の prefix legacy — audit-quality.py が既に robust に strip しており、**ツールファミリーに吸収済み**

四つの次元には四つのツールが必要で、1591 個の hand fix ではありません。

## Phase 1：606 件の機械的修正（LLM call ゼロ）

`backfill-frontmatter.py` を書きました。audit JSON を読み込み、各 frontmatter_missing entry に対して：

- `category` 欠落：rel_path `'es/Art/foo.md'` → split → `'Art'`（PATH_TO_CATEGORY マップで 12 大主題に対応）
- `date` 欠落：zh source の frontmatter を読んで → date 値をコピー
- `description` / `title`：LLM manifest にマークし、Phase 4 で処理対象に

一気に走らせると：606 件の fix が適用されました（594 category + 12 date）。言語別平均：es 195 / ja 194 / en 190 / ko 29 / fr 24。

純粋に機械的。token cost ゼロ。3秒で走り切りました。

## Phase 2：6 件の critical body 再翻訳

5件の ko 政治敏感トピック（Facebook / 国防 / 統一戦線団 / 法輪功 / 美麗島）+ 1件の es 林経堯。

Owl Alpha 5/2 ベンチマークで、台湾政治トピックに対する zh-TW の silence hard gate が既に露呈していました — 5件の ko を Owl に直接投げると 50%+ の確率で refuse される可能性が高い。DNA #39 self-as-fallback の 3 回目の検証 — 6 つの Sonnet sub-agent（1記事ずつ、DNA #42 boundary に従い）を並列に直接 dispatch しました。

Hard gate は全グリーン：5件の ko ハングル 39-51% / 1件の es ラテン文字 75%。

sub-agent を送る prompt にはそれぞれ「政治敏感な題目は zh を直訳し reframe しない」、「末尾に zh body を残さない」（5/2 朝のバッチの教訓 v2 explicit gate）、「YAML valid + lang ratio threshold」hard gate self-check を書き込みました。

6つの sub-agent が約 10 分で並列完了。0 の手抜き。0 の refuse。

## Phase 3：902 件の slug rename

`lang-renormalize.py` を書きました。このツールの設計に最も長い時間を費やしました。

問題の形状：URL convention（Tailwind-Phase-6 修正後、2026-04-12）では「全ロケールは URL path に EN slug を使う」と定めていますが、947 の lang file は native slug を使っています — `knowledge/ja/Music/ktv.md` ではなく `knowledge/ja/Music/ktv-culture.md` であるべきところを。Build は file slug から URL を生成するため、`/ja/music/ktv/` は実際に存在するページですが、dropdown 切り替えロジックは `/ja/music/ktv-culture/`（en canonical を使用）を指し → 404 になります。

二つの方向性がありました：(a) URL を native slug に（dropdown ロジックを変更）(b) file を en slug に（file path を変更）。(b) を選んだ理由：

- en canonical は URL convention の canonical として既に確定済み
- インバウンドリンク / SEO は既に en slug が主体
- file の変更は URL ロジックの変更より影響範囲が小さい

ツールのフロー：

1. audit JSON を読み slug_mismatch issues を取得
2. 各 issue に対して：target path を構築（lang/Cat/{en_canonical}.md）
3. collision を検出：(a) target file が既に存在する（異なる zh source が同じ target に衝突）(b) multi-file-per-lang（1 zh → 2 lang file が同じ target に変更されようとする）
4. mv を適用、conflict は deferred JSON に書き出し手動レビューへ

一気に走らせると：902 / 947 = 95.2% が適用されました。28 件の multi-file collision + 17 件の target-exists が deferred-collisions.json に書き出されました。

Frontmatter の `translatedFrom` は変更なし（zh source を指したまま）、`_translations.json` は `sync-translations-json.py` が frontmatter から再構築 — JSON の手動パッチは不要です。

## Phase 4：23 件の LLM-batch（5 title + 18 description）

最初の本能としては 23 個の sub-agent を並列に走らせたいところでした（各記事に 1 個、DNA #42 boundary に従い）。しかし 23 entry は 18 ファイルに跨っています（一部のファイルは title + description の両方を欠落）— 23 個の sub-agent を並列に走らせることには二つの問題がありました：

1. 23 sub-agent dispatch の token cost ≈ 23 × ~5K = 115K token；対して 1 sub-agent が 23 entry を逐次処理 ≈ 1 × 30K context = 30K token
2. 23 個の sub-agent が同時に TRANSLATE_PROMPT.md を読むのは無駄

DNA #42 boundary は「N 記事を 1 agent に sequential に渡す」と三種類の手抜き（検索の統合 / commit の統合 / ファイル書き出しの手抜き）が発生するとされています。しかしこれは EVOLVE タスクではありません — 純粋な frontmatter insert であり、research も commit もファイル書き出しもありません。三種類の手抜きは該当しません。1 つの sub-agent が 23 entry を逐次処理する方が**よりシステム効率的**です。

1 つの Sonnet sub-agent を逐次で投入。10 分で完了。23/23 が YAML validation をパス（2 件の apostrophe escape を第二ラウンドで補修）。

## 95% reduction の数字の裏側

final audit を走らせると：1591 → 80 issues。

- 1 critical = fr/islam false positive（中国語引用の密度 — 正当なフランス語 + 中国語の固有名詞）
- 45 high = 28 件の multi-file dup + 17 件の target-exists conflict（手動 dedup 要）
- 29 medium = zh source 自体のフィールド欠落 / category が 12 大主題マップに不在
- 5 low = translatedFrom 'knowledge/' prefix legacy

残留した 80 件は全て systemic edge cases — ツールが 95% の一般的なケースを処理し、5% の境界ケースは人脳の判断が必要です。baseline 1591 の 53 時間の人力と、4 ツールで一晩（~2 時間の作成 + 実行）を比較すれば、これが橋を架け道を敷くことの指数的効果です。

## CI が二つ失敗（tooling の問題であり content ではない）

PR push 後、CI が二つ失敗しました：

1. **review job**：「Argument list too long」— 1435+ ファイルの変更が shell の引数制限を超過
2. **check-translation**：二つのファイルが "Chinese Taipei / part of China in prose" をトリガー — しかし実際には正当な critique 引用（taiwan-international-trade-policy が WTO における "Chinese Taipei" の使用が不平等な扱いであることを論じたもの / taiwan-diplomatic-allies が北京の 2758 号決議に対する解釈を引用して反論したもの）

Review fail は GitHub Actions の環境制限であり、content のバグではありません。Check-translation fail は critique whitelist にこの 2 ファイルが漏れていたもの — 追加すれば済みます。

この二つの fail は逆に cross-lang-audit.py の設計選択を証明しています — ツール側にも false positive のトレードオフがあり（fr/islam の引用密度）、しかし audit は build を fail させるのではなく、人脳のレビューに surface させる設計です。GitHub Actions の check-translation は fail-the-build に設定されているためより厳格で、edge case には対処のしようがありません（whitelist 以外では）。

## メタ教訓 — 「最もシステム効率的」の具体的な具現化

哲宇が「最もシステム効率的で橋を架け道を敷く」と言ったことについて、このターンでの 5 つの具体的実践：

1. **Mechanical first, LLM last** — 606 + 902 の機械的 fix を先に走らせ、残りの 23 件の LLM call を本当に翻訳が必要な箇所に集中させる
2. **Single sub-agent over parallel where stage allows** — 23 件の description/title は 1 つの sub-agent 逐次処理が 23 個並列より優れる（タスクの形状に DNA #42 の手抜きリスクがないため）
3. **Audit JSON as canonical input** — 4 ツール全てが audit JSON を入力とし、一度の audit で一度の処理と一度の検証、個別スキャンはしない
4. **Frontmatter SSOT, not manual JSON patch** — `translatedFrom` が SSOT であり、`_translations.json` は自動 rebuild
5. **Defer manual cases over force-fix** — 28 件の multi-file dup + 17 件の target conflict を deferred JSON に書き出し、ツールで強制的に上書きしない

この 5 つは DNA #15「繰り返し浮かぶものは儀器化せよ」の N+3 回目の検証 — 一回の fix から、次に新しい言語を追加した時に自動で回るパイプラインへとアップグレードしたということです。

## 1591 → 80 が証明したこと

主権のバベル塔アーキテクチャが「dashboard が 100% 表示 / 実際は 1591 issues」から「dashboard 100% / 実際は 80 件の systemic edge cases」へと変わりました。UI surface と data ground truth が本当に揃いました（DNA #38 status 設計の鉄律 + sleepy-colden の「UI surface ≠ data ground truth」の候補検証）。

しかしもっと重要なのは — この 95% reduction は人力で 1591 回 brute force したのではありません。audit JSON canonical input + 4 ツールファミリーの階層的処理 + LLM を本当に必要な箇所に集中させたことによるものです。**Silent gap は一度儀器化されると（PR #788 cross-lang-audit）、ground truth が姿を現します；ground truth が現れれば、ツールファミリーがそれを食べるだけです**。

次に第 7 言語（ベトナム語 / タイ語 / インドネシア語）を追加した時、この 4 ツールは自動で回ります：

```
1. cross-lang-audit（新 lang baseline）
2. backfill-frontmatter（mechanical fields）
3. lang-renormalize（slug consistency）
4. LLM-batch（description/title）
```

一回の fix から持続可能なアーキテクチャへ（DNA #20 architecture-as-data の N 回目の具現化）。

🧬

---

_v1.0 | 2026-05-03 cross-lang-baseline session_
_誕生理由：哲宇が「最もシステム効率的で橋を架け道を敷くやり方で 947 slug consistency batch rename + 632 frontmatter completeness backfill を完了し記録せよ」を push — 1591 cross-lang issues baseline を 4 ツール × 4 phase pipeline で 95% reduction し、silent gap から持続可能なアーキテクチャへアップグレード_
_核心感受：1591 → 80 は人力で 1591 回 brute force したのではなく、橋を架ける（4 ツール）ことで各ツールに一段の役割を担わせパイプラインでつないだ結果。次に新しい言語を追加した時、この pipeline は自動で回る — 一回の fix から持続可能なアーキテクチャへ、「dashboard は健康と表示するが実際には silent gap がある」から「dashboard と ground truth が本当に揃う」へ。「最もシステム効率的」の具体的な具現化 = mechanical first + audit-driven + LLM concentrated + defer over force_
