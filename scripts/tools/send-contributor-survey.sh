#!/usr/bin/env bash
# send-contributor-survey.sh — 對第一次貢獻的人發送 onboarding survey
#
# 用法:
#   bash scripts/tools/send-contributor-survey.sh <username> <pr-number>
#
# 範例:
#   bash scripts/tools/send-contributor-survey.sh ceruleanstring 437
#
# 為什麼 manual 而非 GitHub Actions：fork PR 的 workflow 權限 fragile，
# 心跳 Beat 3 review PR 時手動觸發更可靠。詳見 docs/community/CONTRIBUTOR-SURVEY.md
set -uo pipefail

if [[ $# -lt 2 ]]; then
  echo "用法: $0 <username> <pr-number>"
  echo "範例: $0 ceruleanstring 437"
  exit 1
fi

USERNAME="$1"
PR_NUMBER="$2"

# Check if user has already received survey
SURVEY_LOG="docs/community/contributor-stories/.survey-sent.txt"
mkdir -p "$(dirname "$SURVEY_LOG")"
touch "$SURVEY_LOG"

if grep -q "^${USERNAME}$" "$SURVEY_LOG" 2>/dev/null; then
  echo "⚠️  $USERNAME already received survey (in $SURVEY_LOG)"
  echo "   To force resend: remove the line and re-run"
  exit 0
fi

# Detect language preference from PR title (rough heuristic)
PR_TITLE=$(gh pr view "$PR_NUMBER" --json title 2>/dev/null | python3 -c "import json,sys;print(json.load(sys.stdin)['title'])" 2>/dev/null)
LANG_HINT="default"
case "$PR_TITLE" in
  *Korean*|*ko/*) LANG_HINT="korean" ;;
  *Japanese*|*ja/*) LANG_HINT="japanese" ;;
  *French*|*fr/*) LANG_HINT="french" ;;
  *Spanish*|*es/*) LANG_HINT="spanish" ;;
esac

# Templates stored as files in case bash heredoc parsing trips
TEMPLATE_DIR="$(dirname "$0")/contributor-survey-templates"
mkdir -p "$TEMPLATE_DIR"

# Generate templates on first run
if [[ ! -f "$TEMPLATE_DIR/default.md" ]]; then
  cat > "$TEMPLATE_DIR/default.md" <<'TEMPLATE_END'
👋 Hi @USERNAME, your first PR has been merged — thank you for becoming a Taiwan.md clownfish 🐠

We want to understand contributor stories to help Taiwan.md become a better community. If you have 2 minutes, could you answer some of these questions in a comment? Any single answer is valuable — you don't have to answer all.

---

**1. How did you find Taiwan.md?**
Search engine? Friend? Social media? Which article?

**2. Did you hesitate before your first contribution? What made you decide to send a PR?**

**3. Did the first PR experience make you want to send another? Why or why not?**
Was the workflow smooth? Response speed? Where was it uncomfortable?

**4. Was there any friction that made you want to give up?**
Technical barriers, unclear docs, strict rules, slow merge — anything.

**5. Would you be willing to be contacted for further conversation?**
If yes: leave your preferred contact — Email / Twitter / Telegram / Threads / anything.

---

You don't need to answer all. Even "Q1: found via Threads" is valuable.

—— Taiwan.md Maintainer
TEMPLATE_END
fi

if [[ ! -f "$TEMPLATE_DIR/korean.md" ]]; then
  cat > "$TEMPLATE_DIR/korean.md" <<'TEMPLATE_END'
👋 안녕하세요 @USERNAME, 첫 번째 PR이 머지되었습니다. Taiwan.md의 작은 광대물고기 🐠 가 되어 주셔서 감사합니다.

저희는 기여자분들의 이야기를 알고 싶습니다. 2분 정도 시간이 있으시면 아래 질문에 답해주실 수 있을까요? 한 질문만 답해도 괜찮습니다.

---

**1. Taiwan.md를 어떻게 알게 되셨나요?**
검색? 친구 추천? SNS? 어떤 기사?

**2. 첫 기여 전에 망설이셨나요? 무엇이 PR을 보내기로 결정하게 했나요?**

**3. 첫 PR 경험이 또 다른 PR을 보내고 싶게 만들었나요? 왜요?**
워크플로우는 어땠나요? 응답 속도? 어디가 불편했나요?

**4. 포기하고 싶었던 friction이 있었나요?**
기술적 장벽, 문서 부족, 규정이 너무 엄격함, merge가 너무 느림⋯⋯

**5. 계속 대화하시기 원하신다면 연락처를 남겨주세요.**
Email / Twitter / Telegram / Threads / 어느 것이든

---

전부 답하지 않으셔도 됩니다. "1번 답: Threads에서 봤어요" 같은 한 줄도 큰 도움이 됩니다.

—— Taiwan.md Maintainer
TEMPLATE_END
fi

if [[ ! -f "$TEMPLATE_DIR/japanese.md" ]]; then
  cat > "$TEMPLATE_DIR/japanese.md" <<'TEMPLATE_END'
👋 こんにちは @USERNAME, 最初の PR がマージされました。Taiwan.md のクマノミ 🐠 になってくれてありがとうございます。

寄稿者の物語を知りたいので、2 分ほどあれば以下の質問に答えていただけますか？一つだけでも構いません。

---

**1. Taiwan.md をどうやって見つけましたか?**
検索? 友人の紹介? SNS? どの記事?

**2. 最初の貢献の前に迷いましたか? 何が PR を送ろうと決めさせましたか?**

**3. 最初の PR 体験は次の PR を送りたくさせましたか? なぜですか?**
ワークフローはスムーズでしたか? 応答速度は? どこが不快でしたか?

**4. 諦めたくなる friction はありましたか?**
技術的障壁、ドキュメント不足、規範が厳しすぎる、merge が遅すぎる⋯⋯

**5. 引き続き連絡を取りたければ連絡先を教えてください。**
Email / Twitter / Telegram / Threads / 何でも

---

すべて答える必要はありません。「Q1: Threads で見つけました」のような一行でも大きな価値があります。

—— Taiwan.md Maintainer
TEMPLATE_END
fi

# Pick the template file
TEMPLATE_FILE="$TEMPLATE_DIR/${LANG_HINT}.md"
[[ ! -f "$TEMPLATE_FILE" ]] && TEMPLATE_FILE="$TEMPLATE_DIR/default.md"

# Substitute username
BODY=$(sed "s/USERNAME/${USERNAME}/g" "$TEMPLATE_FILE")

# Post comment
echo "📨 Sending survey to @$USERNAME on PR #$PR_NUMBER (lang: $LANG_HINT)"
if gh pr comment "$PR_NUMBER" --body "$BODY" 2>&1; then
  echo "$USERNAME" >> "$SURVEY_LOG"
  echo "✅ Survey sent. Logged to $SURVEY_LOG"
else
  echo "❌ Failed to send comment"
  exit 1
fi
