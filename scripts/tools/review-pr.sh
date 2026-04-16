#!/usr/bin/env bash
# review-pr.sh v1.1 — Taiwan.md PR 自動審核（五層免疫系統）
# 用法: bash scripts/review-pr.sh file1.md file2.md ...
# 或:   bash scripts/review-pr.sh --pr 123
set -uo pipefail
cd "$(dirname "$0")/.."

RED='\033[0;31m'; YEL='\033[0;33m'; GRN='\033[0;32m'
BLU='\033[0;34m'; DIM='\033[0;90m'; RST='\033[0m'

VALID_CATS=("About" "History" "Geography" "Culture" "Food" "Art" "Music" "Technology" "Nature" "People" "Society" "Economy" "Lifestyle")
SIMP_PAT='关|为|国|会|发|时|过|来|说|经|间|现|业|务|样|门|问|产|从|进|设|张|总|给|应|数|开|场|变|团|员|电|话|传|统|级|项|节|历'

TOTAL=0; L0=0; L1=0; L2=0; L3=0
STATUS="PASS"
REPORT=""

# ════════════════════════════════════════
# Layer 0 — 安全隔離
# ════════════════════════════════════════
# Whitelist: non-.md content infrastructure files that are safe to update
# alongside translation/content PRs. These are NOT system files.
SAFE_NON_MD=(
  "knowledge/_translations.json"
  "knowledge/_taxonomy.json"
)

layer0() {
  local f="$1"
  # Whitelist: known safe non-.md content infra files
  for safe in "${SAFE_NON_MD[@]}"; do
    [[ "$f" == "$safe" ]] && echo "✅ 內容配套檔案（${f##*/}）" && return 0
  done
  [[ ! "$f" =~ \.md$ ]] && echo "🔴 非 .md 檔" && return 1
  if [[ "$f" =~ ^knowledge/ ]] || [[ "$f" =~ ^src/content/ ]]; then
    echo "✅ 純內容檔案"; return 0
  fi
  [[ "$f" =~ \.github/|^scripts/|^src/pages/|^src/components/|^tools/|^package|^astro\.config ]] \
    && echo "🔴 系統檔案禁止修改" && return 1
  echo "🔴 非內容路徑"; return 1
}

# ════════════════════════════════════════
# Layer 1 — 格式驗證
# ════════════════════════════════════════
layer1() {
  local f="$1"
  [[ ! -f "$f" ]] && echo "🔴 檔案不存在" && return 1
  local err=() wrn=()

  # conflict markers
  grep -qE '^(<{7}|={7}|>{7})' "$f" 2>/dev/null && err+=("Git 衝突標記")

  # 簡中
  local sc; sc=$(grep -oE "$SIMP_PAT" "$f" 2>/dev/null | wc -l | tr -d ' ')
  (( sc > 5 )) && wrn+=("疑似簡中 ${sc} 處")

  # frontmatter
  local fm; fm=$(awk '/^---$/{n++; next} n==1{print} n>=2{exit}' "$f" 2>/dev/null)
  if [[ -z "$fm" ]]; then
    err+=("無 frontmatter")
  else
    echo "$fm" | grep -q '^title:' || err+=("缺 title")
    echo "$fm" | grep -q '^description:' || err+=("缺 description")
    echo "$fm" | grep -q '^date:' || err+=("缺 date")
    echo "$fm" | grep -q '^tags:' || err+=("缺 tags")
    # featured: true rule — only enforced on ZH SSOT; translations mirror source
    if echo "$f" | grep -qvE '/(en|ja|ko|es|fr)/'; then
      echo "$fm" | grep -q '^featured: true' && err+=("featured 不可 true")
    fi
    # category from path
    local cd; cd=$(echo "$f" | sed -n 's|^knowledge/\([^/]*\)/.*|\1|p')
    if [[ -n "$cd" ]]; then
      local ok=false
      for v in "${VALID_CATS[@]}"; do [[ "$cd" == "$v" ]] && ok=true && break; done
      $ok || err+=("無效 category: $cd")
    fi
  fi

  if (( ${#err[@]} > 0 )); then
    echo "🔴 $(IFS=', '; echo "${err[*]}")"; return 1
  elif (( ${#wrn[@]} > 0 )); then
    echo "🟡 OK（$(IFS=', '; echo "${wrn[*]}")）"; return 0
  else
    echo "✅ frontmatter 完整"; return 0
  fi
}

# ════════════════════════════════════════
# Layer 2 — 品質閘門（inline quality-scan 偵測）
# ════════════════════════════════════════
layer2() {
  local f="$1"
  [[ ! -f "$f" ]] && echo "🔴 檔案不存在" && return 1
  local wrn=() hs=0

  local body; body=$(awk '/^---$/{n++; next} n>=2{print}' "$f" 2>/dev/null)
  local tl; tl=$(echo "$body" | wc -l | tr -d ' \n'); tl=${tl:-0}

  # quality: bullet 密度
  local bl; bl=$(echo "$body" | grep -c '^- \*\*' 2>/dev/null || echo "0"); bl=${bl//[^0-9]/}; bl=${bl:-0}
  (( tl > 5 && bl * 100 / tl > 30 )) && ((hs+=2))

  # quality: 缺年份
  local yr; yr=$(echo "$body" | grep -oE '\b(19|20)[0-9]{2}\b' 2>/dev/null | wc -l | tr -d ' \n'); yr=${yr//[^0-9]/}; yr=${yr:-0}
  (( yr < 3 )) && ((hs++))

  # quality: 缺來源
  echo "$body" | grep -q 'http' 2>/dev/null || ((hs++))

  # quality: 空洞修飾詞
  local hw; hw=$(echo "$body" | grep -cE '不可或缺|深遠的影響|重要的角色|不可忽視|舉足輕重|密不可分|息息相關|獨樹一幟|博大精深' 2>/dev/null || echo "0"); hw=${hw//[^0-9]/}; hw=${hw:-0}
  (( hw >= 3 )) && ((hs++))

  # quality: 散文行太少
  local pr; pr=$(echo "$body" | grep -cvE '^#|^$|^-|^\*|^>|^\|' 2>/dev/null || echo "0"); pr=${pr//[^0-9]/}; pr=${pr:-0}
  (( pr < 10 )) && ((hs++))

  # quality: 塑膠句式
  local pl; pl=$(echo "$body" | grep -cE '不是.*而是|不僅是.*更是|從.*到.*從.*到|展現了.*也體現了' 2>/dev/null || echo "0"); pl=${pl//[^0-9]/}; pl=${pl:-0}
  (( pl >= 1 )) && ((hs++))

  # quality: 破折號濫用
  local ds; ds=$(echo "$body" | grep -o '——' 2>/dev/null | wc -l | tr -d ' \n'); ds=${ds//[^0-9]/}; ds=${ds:-0}
  (( ds > 4 )) && ((hs++))

  # quality: 教科書開場
  echo "$body" | head -1 | grep -qE '^(台灣的|作為台灣|在台灣的)' 2>/dev/null && ((hs++))

  # quality: 總之結尾
  echo "$body" | tail -5 | grep -qE '總之|展望未來|綜上所述' 2>/dev/null && ((hs++))

  # quality 結果
  local hs_label=""
  if (( hs <= 5 )); then hs_label="✅ quality $hs"
  elif (( hs <= 7 )); then hs_label="🟡 quality $hs"; wrn+=("quality 偏高")
  else hs_label="🔴 quality $hs"; echo "$hs_label"; return 1
  fi

  # 字數
  local cc; cc=$(echo "$body" | wc -m | tr -d ' \n'); cc=${cc//[^0-9]/}; cc=${cc:-0}
  if [[ "$f" =~ /en/|/es/|/ja/|/ko/ ]]; then
    (( cc < 2500 )) && wrn+=("偏短 ${cc}ch")
  else
    (( cc < 3000 )) && wrn+=("偏短 ${cc}ch")
  fi

  # H2
  local h2; h2=$(grep -c '^## ' "$f" 2>/dev/null || echo 0); h2=${h2//[^0-9]/}; h2=${h2:-0}
  (( h2 < 1 )) && wrn+=("無 H2")

  # 連結
  local lk; lk=$(grep -c 'http' "$f" 2>/dev/null || echo 0); lk=${lk//[^0-9]/}; lk=${lk:-0}
  (( lk < 1 )) && wrn+=("無參考連結")

  if (( ${#wrn[@]} > 0 )); then
    echo "$hs_label（$(IFS=', '; echo "${wrn[*]}")）"; return 0
  else
    echo "$hs_label"; return 0
  fi
}

# ════════════════════════════════════════
# Layer 3 — EDITORIAL v4 軟審
# ════════════════════════════════════════
layer3() {
  local f="$1"
  [[ ! -f "$f" ]] && echo "—" && return 0
  local wrn=()
  local body; body=$(awk '/^---$/{n++; next} n>=2 && NF{print}' "$f" 2>/dev/null)

  # 教科書開場
  echo "$body" | head -1 | grep -qE '^(台灣的|作為|在台灣)' 2>/dev/null && wrn+=("教科書開場")

  # 引語
  grep -q '「' "$f" 2>/dev/null || wrn+=("缺引語")

  # 結尾套路
  tail -10 "$f" | grep -qE '總之|展望未來|隨著.*的發展|綜上所述' 2>/dev/null && wrn+=("套路結尾")

  # 來源數
  local refs; refs=$(grep -c 'http' "$f" 2>/dev/null || echo 0); refs=${refs//[^0-9]/}; refs=${refs:-0}
  (( refs < 3 )) && wrn+=("來源<3")

  # 腳註檢查（造橋鋪路: 讓新文章天生帶腳註）
  local fns; fns=$(grep -cE '^\[\^[0-9a-zA-Z_-]+\]:' "$f" 2>/dev/null || echo 0); fns=${fns//[^0-9]/}; fns=${fns:-0}
  (( fns == 0 )) && wrn+=("無腳註[^N]")

  if (( ${#wrn[@]} > 0 )); then
    echo "🟡 $(IFS=', '; echo "${wrn[*]}")"
  else echo "✅"
  fi; return 0
}

# ════════════════════════════════════════
# Layer 4 — 結構驗證（Stage 4 FORMAT CHECK）
# ════════════════════════════════════════
layer4() {
  local f="$1"
  [[ ! -f "$f" ]] && echo "—" && return 0
  # Only check knowledge/ articles (not translations)
  [[ ! "$f" =~ ^knowledge/[A-Z] ]] && echo "—" && return 0
  local wrn=()
  local body; body=$(awk '/^---$/{n++; next} n>=2{print}' "$f" 2>/dev/null)

  # 30 秒概覽
  echo "$body" | grep -qE '>\s*\*\*30\s*秒概覽|^## 30 秒概覽' 2>/dev/null || wrn+=("缺30秒概覽")

  # ## 參考資料 heading (only if has footnotes)
  local fns; fns=$(grep -cE '^\[\^[0-9a-zA-Z_-]+\]:' "$f" 2>/dev/null || echo 0); fns=${fns//[^0-9]/}
  if (( fns > 0 )); then
    echo "$body" | grep -qE '^## 參考資料' 2>/dev/null || wrn+=("有腳註但缺##參考資料")
  fi

  # 延伸閱讀 wikilink 殘留
  local wl; wl=$(echo "$body" | grep -c '^\s*- \[\[' 2>/dev/null || echo 0); wl=${wl//[^0-9]/}
  (( wl > 0 )) && wrn+=("wikilink殘留${wl}處")

  # subcategory
  local fm; fm=$(awk '/^---$/{n++; next} n==1{print} n>=2{exit}' "$f" 2>/dev/null)
  echo "$fm" | grep -q '^subcategory:' || wrn+=("缺subcategory")

  if (( ${#wrn[@]} > 0 )); then
    echo "🟡 $(IFS=', '; echo "${wrn[*]}")"
  else echo "✅"
  fi; return 0
}

# ════════════════════════════════════════
# 審核
# ════════════════════════════════════════
review_with_display() {
  local f="$1"; local d="$2"
  REPORT+="📁 ${d}\n"

  local r0; r0=$(layer0 "$d"); REPORT+="  L0 安全：${r0}\n"
  if [[ "$r0" =~ ^🔴 ]]; then STATUS="FAIL"; REPORT+="\n"; return; fi
  L0=$((L0+1))

  if [[ ! "$d" =~ \.md$ ]]; then
    REPORT+="  L1-L4: ⏭️  跳過（非 .md 配套檔）\n\n"
    L1=$((L1+1)); L2=$((L2+1)); L3=$((L3+1))
    return
  fi

  local r1; r1=$(layer1 "$f"); REPORT+="  L1 格式：${r1}\n"
  if [[ "$r1" =~ ^🔴 ]]; then STATUS="FAIL"; else L1=$((L1+1)); fi

  local r2; r2=$(layer2 "$f"); REPORT+="  L2 品質：${r2}\n"
  if [[ "$r2" =~ ^🔴 ]]; then STATUS="FAIL"
  elif [[ "$r2" =~ ^🟡 ]] && [[ "$STATUS" != "FAIL" ]]; then STATUS="WARNING"
  fi
  [[ ! "$r2" =~ ^🔴 ]] && L2=$((L2+1))

  local r3; r3=$(layer3 "$f"); REPORT+="  L3 策展：${r3}\n"
  [[ "$r3" =~ ^✅ ]] && L3=$((L3+1))
  [[ "$r3" =~ ^🟡 ]] && [[ "$STATUS" == "PASS" ]] && STATUS="WARNING"

  local r4; r4=$(layer4 "$f"); REPORT+="  L4 結構：${r4}\n\n"
  [[ "$r4" =~ ^🟡 ]] && [[ "$STATUS" == "PASS" ]] && STATUS="WARNING"
}

review() {
  local f="$1"; REPORT+="📁 ${f}\n"

  local r0; r0=$(layer0 "$f"); REPORT+="  L0 安全：${r0}\n"
  if [[ "$r0" =~ ^🔴 ]]; then STATUS="FAIL"; REPORT+="\n"; return; fi
  L0=$((L0+1))

  # Skip L1-L4 for non-.md whitelisted files (they're config/infra, not articles)
  if [[ ! "$f" =~ \.md$ ]]; then
    REPORT+="  L1-L4: ⏭️  跳過（非 .md 配套檔）\n\n"
    L1=$((L1+1)); L2=$((L2+1)); L3=$((L3+1))
    return
  fi

  local r1; r1=$(layer1 "$f"); REPORT+="  L1 格式：${r1}\n"
  if [[ "$r1" =~ ^🔴 ]]; then STATUS="FAIL"; else L1=$((L1+1)); fi

  local r2; r2=$(layer2 "$f"); REPORT+="  L2 品質：${r2}\n"
  if [[ "$r2" =~ ^🔴 ]]; then STATUS="FAIL"
  elif [[ "$r2" =~ ^🟡 ]] && [[ "$STATUS" != "FAIL" ]]; then STATUS="WARNING"
  fi
  [[ ! "$r2" =~ ^🔴 ]] && L2=$((L2+1))

  local r3; r3=$(layer3 "$f"); REPORT+="  L3 策展：${r3}\n"
  [[ "$r3" =~ ^✅ ]] && L3=$((L3+1))
  [[ "$r3" =~ ^🟡 ]] && [[ "$STATUS" == "PASS" ]] && STATUS="WARNING"

  local r4; r4=$(layer4 "$f"); REPORT+="  L4 結構：${r4}\n\n"
  [[ "$r4" =~ ^🟡 ]] && [[ "$STATUS" == "PASS" ]] && STATUS="WARNING"
}

# ════════════════════════════════════════
# Main
# ════════════════════════════════════════
main() {
  local files=()
  local pr_num="" pr_tmp=""
  if [[ "${1:-}" == "--pr" ]] && [[ -n "${2:-}" ]]; then
    pr_num="$2"
    # Fetch PR branch into refs/pulls/<num> so we can read files without switching branches
    git fetch origin "pull/${pr_num}/head:refs/pulls/${pr_num}" --quiet 2>/dev/null \
      || { echo "❌ 無法 fetch PR #${pr_num}"; exit 1; }
    pr_tmp="$(mktemp -d)"
    trap 'rm -rf "$pr_tmp"' EXIT
    while IFS= read -r l; do
      [[ -z "$l" ]] && continue
      # Materialize file content from PR ref to tmp dir, preserving path
      mkdir -p "$pr_tmp/$(dirname "$l")"
      git show "refs/pulls/${pr_num}:$l" >"$pr_tmp/$l" 2>/dev/null || continue
      files+=("$pr_tmp/$l")
    done < <(gh pr diff "${pr_num}" --name-only 2>/dev/null)
    (( ${#files[@]} == 0 )) && echo "❌ 無法取得 PR #${pr_num} 檔案" && exit 1
  else
    files=("$@")
  fi
  (( ${#files[@]} == 0 )) && echo "用法: $0 <file.md ...> | --pr <number>" && exit 1

  # When in --pr mode, strip tmp dir prefix from displayed paths
  for f in "${files[@]}"; do
    TOTAL=$((TOTAL+1))
    if [[ -n "$pr_tmp" ]]; then
      local display="${f#$pr_tmp/}"
      review_with_display "$f" "$display"
    else
      review "$f"
    fi
  done

  echo -e "${BLU}🔍 Taiwan.md PR Review${RST}"
  echo -e "${DIM}═══════════════════════════════════${RST}"
  echo -e "$REPORT"
  echo -e "${DIM}═══════════════════════════════════${RST}"
  case $STATUS in
    PASS)    echo -e "${GRN}✅ PASS${RST}（${L0}/${TOTAL} 安全 | ${L1}/${TOTAL} 格式 | ${L2}/${TOTAL} 品質）" ;;
    WARNING) echo -e "${YEL}🟡 WARNING${RST}（${L0}/${TOTAL} 安全 | ${L1}/${TOTAL} 格式 | ${L2}/${TOTAL} 品質）" ;;
    FAIL)    echo -e "${RED}🔴 FAIL${RST}（${L0}/${TOTAL} 安全 | ${L1}/${TOTAL} 格式 | ${L2}/${TOTAL} 品質）" ;;
  esac
  [[ "$STATUS" == "FAIL" ]] && exit 1 || exit 0
}

main "$@"
