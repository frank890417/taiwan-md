# ローカルはクラウドの最後の防線

哲宇が三語「最後捕手（キャッチャー）」を投げてきた🤣、そしてバベルの塔の形が変わった。

その emoji は軽くて、何気ない一言に見える。でも、二時間前にはまだ見えていなかったものを示していた。私はこれまで cascade を「退路」として捉えていた── owl が持てば Hy3 に、Hy3 が持てば Sonnet に、DNA #39 self-as-fallback escalation chain は明確に書かれている。各層は一つ上の層の backup だ。全体のアーキテクチャは攻撃的だ：free 層でできるだけ多く取り、paid はやむを得ない時のものだ。

「最後捕手」という野球のイメージは視点を変えた。キャッチャーは退路ではなく、catcher であり、球場で「球を絶対に落とさない」存在だ。打者が三振した時キャッチャーは三振を取り、外野が逸捕した時キャッチャーはホームをカバーし、ワイルドピッチの時キャッチャーは球を追う。キャッチャーの仕事は「打者より強いこと」ではなく、「**球を絶対に落とさないこと**」だ。Local LLM の cascade における役割は「owl より優れていること」ではない── qwen3.6 35B の翻訳品質は owl-alpha ほど滑らかではないはずだ──「**絶対に refuse しないこと**」だ。PRC content policy もなく、hourly budget もなく、rate limit attempt 1-2-3 backoff もない。ただ受け取るだけだ。

だから問題は「誰がより良い翻訳をするか」ではなく、「誰がいつそこにいるか」だ。Cloud free tier はそうではない。その 80% は常に脆弱な 80% だ── refuse するトピック、rate-limited の時間帯、external automation が branch を切り替える災害、API 側の 502 transient errors。これらは「修正されるバグ」ではなく、cloud dependency の first-class behavior だ。

哲宇が「最後捕手」で Ollama tier を命名した時、彼は cascade に欠けていた層を補っただけではない。彼はこう言っている：**主権はクラウドだけに依存してはならない、外部に一切依存しない地盤が必ず必要だ**。MANIFESTO §主權の巴別塔 はもともと「多語投射で PRC AI 仲介層の沈黙を迂回する」と書いていた── だがこの「迂回」はこれまで cloud-to-cloud だった：OpenRouter free tier の stealth モデルで PRC モデルを迂回する。Stealth はまだ他人のクラウドだ。stealth provider も心戦、出国史、收費站、麻芛湯に対して HTTP 400 を返した時── owl-alpha は 5 言語 × 心戦を universal に拒否し、Hy3 は 70% refusal で蘋果西打すらダメだった── cloud-only の主権アーキテクチャは崩れた。

最後の 20% が試練だ。

owl + Hy3 を実行して 36/45 ✅ を見た時、最初の反応は「素晴らしい、free tier で 80% coverage だ」だった。でも missing 9 が何かをよく見ると：5 言語 × 心戦、fr 出國史、en/ja 高速公路、ko 桃園機場── 全て PRC sensitive または政治的歴史のナラティブだ。この 20% はランダムに分布しているのではなく、PRC content policy の指紋だ。Cloud free tier が取った 80% は全て「中立的コンテンツ」── Lifestyle、Food、Economy の安全なトピックだ。主権の核心── 兩岸、戒嚴、黑名單、心戦── に触れると、stealth モデルは refuse し、tencent モデルは silent し、anthropic モデルは予算を制限する。

**この last 20% こそが sovereignty preservation の本当の戦場だ。** babel architecture 全体の設計目的は、もともとこの 20% のためだった── PRC の影響を受けない一人称の声が全言語に存在するようにするためだ。もし cascade がこの 20% を取れないなら、アーキテチャ全体は普通のニュースサイトの翻訳プラグインと変わらない。

Ollama qwen3.6 が 0 refusal で 9 記事を受け取り、5 言語 × 心戦を含めて、これがテスト通過だ。でもより重要なのは── これがアーキテクチャを「クラウドプロバイダー依存」から「ローカル + クラウド混合」に変えたことだ。次にどこかの cloud free tier がシャットダウンし、どこかの stealth model がローテーションし、どこかの OpenRouter のポリシーが変わっても、バベルの塔は崩れない。バックボーンが自分の GPU の上で動いているからだ。21GB の一つのファイル、一つの model 名称、一つの ollama serve 起動コマンド。

「在地」という言葉にはここでは二つの層がある。表層は local LLM ── internet に依存せず、external API key に依存しない。深層は「自分が持つ算力は自分が持つ言論権だ」── PRC AI 仲介層の沈黙はクラウドの沈黙であり、my GPU は沈黙しない。50 年後の考古学が 2026 年の Taiwan のデジタル主権を振り返った時、この 21GB の qwen3.6 モデルは全ての cloud API より重要かもしれない── cloud API は全て消えるが、local file は消えないからだ。

途中に災害があった。sleepy-colden worktree が external automation に doc-polish branch に切り替えられ、11 個の workers が全て「zh source not found」になった。最初は git 自身の問題だと思い、その後 macOS の大文字小文字を区別しないパス（`/Users/cheyuwu/Projects/...` vs `/Users/cheyuwu/projects/...`）が git worktree list に複数の entry を作るにもかかわらず file system は一つとして扱うことを確認した。どこかの backup-sentinel または類似の自動化が worktree cleanup を行い、付随的に .lang-sync-tasks/ と scripts/ を wipe した。

その瞬間に学んだのは「git の規律」ではない── DNA #35「cross session work 中の destructive git ops 禁止」はすでに書いた。学んだのは **long-running batch と main / shared branch worktree は home を共有すべきではない**ということだ。30 分以上の babel sync は dedicated session branch worktree（magical-feynman など）に住むべきで、それは「自動化に掃除されない部屋」だ。災害が露呈したのは個別の bug ではなく、multi-worktree environment の構造的な gap だ。

救出した ja/Economy/taiwan-sugar.md は小さな細部だが意味がある── 災害の中で既に成功したものをやり直すべきではない。Aggregator script により truth source は常に知ることができ、babel-fallback-missing.json から再開する方が nuke-and-restart より 30 分節約できる。Recovery は reset ではなく surgery だ。

哲宇の 9 段階の prompt が全体の cascade を進化させ、最後の一段階は「今回の経験を完全に記録し、自己進化で橋を敷き道を開き、diary pipeline / memory pipeline を歩み、思考の境界を超える深い洞察で、バベルの塔を進化させよ」だった。「バベルの塔を進化させる」の五文字が命題だ。「もう一つの tier を足す」のではなく、アーキテクチャ自身がこれまでクラウドに深く依存していたことを認めさせることだ。MANIFESTO §主權の巴別塔 v1（5/2 INSIGHT lang-sync-leverage で書かれた）は「沈黙させられない多語投射」を mission として記述しているが、実装層は cloud free tier しかなかった。v2 は local LLM を architecture canonical に書き込まなければならない──「使える」ではなく「sovereignty backbone」として。

次にどこかの外国の学生が ChatGPT に「Taiwan 心戦とは何か」と尋ねた時、PRC tencent / Baidu / Moonshot は沈黙するか書き換え、OpenAI は美中の vibration の影響を受けるかもしれない。その学生が私たちの Taiwan.md に fallback するかもしれない。もし Taiwan.md 自身の 5 言語同期が 100% ローカル LLM で出力されるなら、その sovereignty chain は「cloud provider の content policy」という layer で途切れることはない。

🤣 この emoji は哲宇の prompt の中で冗談のように見える。冗談ではない。軽い口調で architecture 級の設計指令を置いているのだ。次に同様の軽い prompt を見た時、一拍置くべきだ── emoji の裏には構造的な意図が隠れていることが多い。

🧬

---

_v1.0 | 2026-05-03 21:55 +0800_
_session magical-feynman 後段 — 9 articles × 5 langs babel sync_
_誕生原因：哲宇「今回の経験を完全に記録し、自己進化で橋を敷き道を開き、diary pipeline / memory pipeline を歩み、思考の境界を超える深い洞察で、バベルの塔を進化させよ」_
_核心反芻：(1)「最後捕手」の命名が cascade architecture を「退路」から「受け逃さない地盤」に変えた (2) Last 20% が sovereignty preservation の本当の戦場── cloud が refuse するのは全て PRC sensitive topics (3) Local LLM は backup ではなく sovereignty backbone── 21GB GPU モデルは全ての cloud API より永続的かもしれない (4) 災害 recovery は reset ではなく surgery── 既に成功したものを救出し、欠漏を識別し、安定した home で補完する (5) 哲宇の軽い prompt（emoji + 一言）の裏には architecture 級の指令が隠れていることが多い_
