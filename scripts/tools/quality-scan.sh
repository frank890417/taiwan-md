#!/usr/bin/env bash
# quality-scan.sh v3.3 — 偵測疑似 AI 空洞模板的文章 + 引用健康度整合報告
# 用法: bash tools/quality-scan.sh [--fix] [--json] [--diff] [--sort] [--worst N]
#
# v3.0 新增:
#   - 塑膠句式偵測（EDITORIAL v3 五品種）
#   - 結構品質偵測（教科書開場 + 總之結尾 + 萬用 H2）
#   - 差分模式（--diff：與上次結果比較，只報變化）
#   - 排序模式（--sort：按分數高→低輸出）
#   - LIST-DUMP：後半段清單堆砌偵測
#   - THIN：段落內容稀薄偵測
#   - QUALITY-DECAY：前後半品質衰退偵測
#
# 評分標準 (每項 0-N 分，越高越可疑):
#   1. bullet 密度：「- **」行數 / 總行數 > 30%
#   2. 缺乏年份：具體四位數年份出現次數 < 3
#   3. 缺乏來源：無任何 http 連結
#   4. 空洞修飾詞密度
#   5. 重複結構：連續 3+ 個相同格式的 bullet 區塊
#   6. 段落文字少：非標題非bullet的散文行 < 10
#   7. lastHumanReview: false
#   8. 🆕 塑膠句式密度（EDITORIAL v3 五品種 + 變種，≥1 即計分）
#  8b. 🆕 破折號「——」濫用（AI 中文超級特徵，>4 即計分）
#   9. 🆕 教科書開場（「台灣的X是...」「X是台灣...」）
#  10. 🆕 總之/展望結尾
#  11. 🆕 萬用 H2 模板（歷史/現況/未來展望）
#  12. 🆕 LIST-DUMP：後半段清單堆砌（>40% bullet 且 > 前段 2 倍）
#  13. 🆕 THIN：稀薄段落（H2 區塊內散文行 < 3）
#  14. 🆕 QUALITY-DECAY：前後半品質衰退（後段散文比例 < 前段 70%）
#  15. 🆕 CHINA-TERM：中國用語偵測（視頻/質量/軟件/博主/算法等 30+ 詞）
#  16. 🆕 CITATION-DESERT：引用荒漠偵測（正式腳註 [^N]: 為零且字數 > 500）

set -uo pipefail
cd "$(dirname "$0")/../.."

RED='\033[0;31m'
YEL='\033[0;33m'
GRN='\033[0;32m'
DIM='\033[0;90m'
CYN='\033[0;36m'
RST='\033[0m'

BASELINE_FILE="scripts/tools/.quality-baseline.json"

JSON_MODE=false
FIX_MODE=false
DIFF_MODE=false
SORT_MODE=false
WORST_N=0
for arg in "$@"; do
  [[ "$arg" == "--json" ]] && JSON_MODE=true
  [[ "$arg" == "--fix" ]] && FIX_MODE=true
  [[ "$arg" == "--diff" ]] && DIFF_MODE=true
  [[ "$arg" == "--sort" ]] && SORT_MODE=true
done
# Parse --worst N (two-arg flag)
args=("$@")
for ((i=0; i<${#args[@]}; i++)); do
  if [[ "${args[$i]}" == "--worst" ]] && [[ $((i+1)) -lt ${#args[@]} ]]; then
    WORST_N="${args[$((i+1))]}"
    SORT_MODE=true  # --worst implies --sort
  fi
done

SINGLE_FILE=""
for arg in "$@"; do
  # If arg is a .md file path, treat as single-file mode
  if [[ "$arg" == *.md ]] && [[ -f "$arg" ]]; then
    SINGLE_FILE="$arg"
  fi
done

TOTAL=0
SUSPECT=0
declare -a FLAGGED_FILES=()
declare -a SCORES=()
declare -a REASONS=()

# ── Citation health tracking (造橋鋪路: 每次掃描自動報告引用健康度) ──
CITE_TOTAL=0
CITE_HAS_FN=0
CITE_HAS_URL=0
CITE_NAKED=0
CITE_GRADE_A=0
CITE_GRADE_B=0
CITE_GRADE_C=0
CITE_GRADE_D=0
CITE_GRADE_F=0

scan_file() {
  local f="$1"
  local score=0
  local reasons=""
  local lines
  lines=$(wc -l < "$f")
  lines=${lines//[[:space:]]/}
  
  # Skip very short files (stubs)
  [[ $lines -lt 20 ]] && return

  # Skip files without frontmatter (not public Astro routes — e.g. _Home.md Obsidian vault hub)
  # Frontmatter detection: first line must be `---`
  local first_line
  first_line=$(head -1 "$f")
  [[ "$first_line" != "---" ]] && return

  # ── Hub page detection (v3.3) ──
  # Hub pages (_XXX Hub.md) are category index pages with natural list structure.
  # Reduce structural penalties (LIST-DUMP, THIN, QUALITY-DECAY) for these pages.
  local is_hub=false
  local basename_f
  basename_f=$(basename "$f")
  [[ "$basename_f" == _*Hub* ]] && is_hub=true

  # ── 1. Bullet 密度 ──
  local bullet_lines
  bullet_lines=$(grep -c '^- \*\*' "$f" 2>/dev/null || echo "0")
  bullet_lines=${bullet_lines//[[:space:]]/}
  local bullet_ratio=0
  if [[ $lines -gt 0 ]]; then
    bullet_ratio=$((bullet_lines * 100 / lines))
  fi
  if [[ $bullet_ratio -gt 30 ]]; then
    score=$((score + 3))
    reasons="${reasons}bullet密度${bullet_ratio}% "
  elif [[ $bullet_ratio -gt 20 ]]; then
    score=$((score + 1))
    reasons="${reasons}bullet密度${bullet_ratio}% "
  fi

  # ── 2. 缺乏具體年份 ──
  local year_count
  year_count=$(grep -oE '\b(1[6-9][0-9]{2}|20[0-2][0-9])\b' "$f" | grep -v 'date:' | wc -l | tr -d '[:space:]')
  if [[ $year_count -lt 2 ]]; then
    score=$((score + 3))
    reasons="${reasons}年份僅${year_count}個 "
  elif [[ $year_count -lt 5 ]]; then
    score=$((score + 1))
    reasons="${reasons}年份${year_count}個 "
  fi

  # ── 3. 缺乏引用來源 ──
  local url_count
  url_count=$(grep -c 'http' "$f" 2>/dev/null || echo "0")
  url_count=${url_count//[[:space:]]/}
  if [[ $url_count -eq 0 ]]; then
    score=$((score + 3))
    reasons="${reasons}無URL來源 "
  elif [[ $url_count -lt 3 ]]; then
    score=$((score + 1))
    reasons="${reasons}僅${url_count}個URL "
  fi

  # ── 4. 空洞修飾詞 ──
  local hollow_count
  hollow_count=$(grep -oE '重要的|顯著的|豐富的|完整的|多元的|積極|蓬勃發展|逐步|逐漸|不斷|持續|日益|進一步|全面|深入|大力|有效|顯著|穩步' "$f" | wc -l | tr -d '[:space:]')
  if [[ $hollow_count -gt 15 ]]; then
    score=$((score + 3))
    reasons="${reasons}空洞詞${hollow_count}個 "
  elif [[ $hollow_count -gt 8 ]]; then
    score=$((score + 2))
    reasons="${reasons}空洞詞${hollow_count}個 "
  elif [[ $hollow_count -gt 4 ]]; then
    score=$((score + 1))
    reasons="${reasons}空洞詞${hollow_count}個 "
  fi

  # ── 5. 散文段落太少 ──
  local prose_lines
  prose_lines=$(grep -cvE '^(#|-|\*|\||>|$|---|\s*$|title:|description:|date:|tags:|category:|author:|featured:|last)' "$f" 2>/dev/null || echo "0")
  prose_lines=$(echo "$prose_lines" | tr -d '[:space:]')
  if [[ $prose_lines -lt 5 ]]; then
    score=$((score + 3))
    reasons="${reasons}散文僅${prose_lines}行 "
  elif [[ $prose_lines -lt 15 ]]; then
    score=$((score + 1))
    reasons="${reasons}散文${prose_lines}行 "
  fi

  # ── 6. lastHumanReview: false ──
  if grep -q 'lastHumanReview: false' "$f" 2>/dev/null; then
    score=$((score + 1))
    reasons="${reasons}未人工審核 "
  fi

  # ── 7. 重複 bullet 區塊 ──
  local max_consecutive=0
  local current=0
  while IFS= read -r line; do
    if [[ "$line" =~ ^-\ \*\* ]]; then
      current=$((current + 1))
      [[ $current -gt $max_consecutive ]] && max_consecutive=$current
    else
      current=0
    fi
  done < "$f"
  if [[ $max_consecutive -ge 6 ]]; then
    score=$((score + 2))
    reasons="${reasons}連續bullet${max_consecutive}行 "
  elif [[ $max_consecutive -ge 4 ]]; then
    score=$((score + 1))
    reasons="${reasons}連續bullet${max_consecutive}行 "
  fi

  # ── 8. 🆕 塑膠句式偵測（EDITORIAL v3 五品種 + 變種）──
  local plastic_count
  plastic_count=$(grep -cE '不僅.{0,8}更是|不只.{0,8}也是|不是.{0,8}而是|展現了.{0,8}的精神|展現.{0,8}的決心|體現了.{0,8}的精神|從.{2,15}到.{2,15}，從.{2,15}到|扮演著.{0,10}角色|發揮著.{0,10}作用|見證了.{0,10}的歷程|彰顯了|承載著.{0,10}的|不僅僅是.{0,10}更是|既是.{0,8}也是.{0,8}更是|成為.{0,8}的重要.{0,6}|為.{0,10}注入.{0,8}活力|為.{0,10}奠定.{0,8}基礎|在.{0,10}上扮演.{0,8}角色|為.{0,10}提供了.{0,8}動力|開啟了.{0,8}的新篇章|翻開.{0,8}的新頁|書寫.{0,8}的篇章|譜寫.{0,8}的華章|綻放.{0,8}的光芒|閃耀.{0,8}的光輝' "$f" 2>/dev/null || echo "0")
  plastic_count=${plastic_count//[[:space:]]/}
  if [[ $plastic_count -gt 8 ]]; then
    score=$((score + 4))
    reasons="${reasons}塑膠句${plastic_count}個 "
  elif [[ $plastic_count -gt 4 ]]; then
    score=$((score + 3))
    reasons="${reasons}塑膠句${plastic_count}個 "
  elif [[ $plastic_count -gt 2 ]]; then
    score=$((score + 2))
    reasons="${reasons}塑膠句${plastic_count}個 "
  elif [[ $plastic_count -ge 1 ]]; then
    score=$((score + 1))
    reasons="${reasons}塑膠句${plastic_count}個 "
  fi

  # ── 8b. 🆕 破折號「——」濫用偵測 ──
  local dash_count
  dash_count=$(grep -o '——' "$f" | wc -l | tr -d '[:space:]')
  if [[ $dash_count -gt 15 ]]; then
    score=$((score + 3))
    reasons="${reasons}破折號${dash_count}個 "
  elif [[ $dash_count -gt 8 ]]; then
    score=$((score + 2))
    reasons="${reasons}破折號${dash_count}個 "
  elif [[ $dash_count -gt 4 ]]; then
    score=$((score + 1))
    reasons="${reasons}破折號${dash_count}個 "
  fi

  # ── 9. 🆕 教科書開場偵測 ──
  # 取 frontmatter 結束後的前 3 行非空行
  local in_frontmatter=true
  local check_lines=0
  local textbook_opening=false
  while IFS= read -r line; do
    if [[ "$in_frontmatter" == true ]]; then
      # 第二個 --- 結束 frontmatter
      if [[ "$line" == "---" ]] && [[ $check_lines -eq 0 ]]; then
        check_lines=-1  # saw first ---
      elif [[ "$line" == "---" ]] && [[ $check_lines -eq -1 ]]; then
        in_frontmatter=false
        check_lines=0
      fi
      continue
    fi
    # Skip empty lines and headings
    [[ -z "$line" || "$line" =~ ^# ]] && continue
    check_lines=$((check_lines + 1))
    if [[ $check_lines -le 2 ]]; then
      # 教科書開場模式：「台灣的X是Y」「X是台灣Y」「作為Z，台灣」
      if echo "$line" | grep -qE '^台灣的.{2,20}是|^.{2,10}是台灣.{2,20}|^作為.{2,15}，台灣|^在.{2,10}(方面|領域)，台灣|^台灣.{2,6}(擁有|具有|位於|以其)'; then
        textbook_opening=true
      fi
    fi
    [[ $check_lines -ge 3 ]] && break
  done < "$f"
  if [[ "$textbook_opening" == true ]]; then
    score=$((score + 2))
    reasons="${reasons}教科書開場 "
  fi

  # ── 10. 🆕 總之/展望結尾偵測 ──
  # 取最後 5 行非空行
  local tail_text
  tail_text=$(tail -20 "$f" | grep -v '^$' | grep -v '^#' | grep -v '^\-' | grep -v '^http' | tail -5)
  if echo "$tail_text" | grep -qE '總之|綜上所述|展望未來|總結來說|總的來說|未來展望|隨著.{2,20}的(發展|推進|深化)|將繼續|值得期待'; then
    score=$((score + 2))
    reasons="${reasons}套路結尾 "
  fi

  # ── 11. 🆕 萬用 H2 模板偵測 ──
  local template_h2=0
  local h2_list
  h2_list=$(grep '^## ' "$f" | sed 's/^## //')
  while IFS= read -r h2; do
    [[ -z "$h2" ]] && continue
    if echo "$h2" | grep -qE '^(歷史(背景|沿革|發展)?|發展歷程|歷史脈絡|現況(與|及)?|現狀|當前|未來(展望|發展|趨勢)|結語|總結|挑戰與展望|挑戰與機遇|影響與意義|特色(與|及)?|重要性|國際(比較|影響|地位))$'; then
      template_h2=$((template_h2 + 1))
    fi
  done <<< "$h2_list"
  if [[ $template_h2 -ge 4 ]]; then
    score=$((score + 3))
    reasons="${reasons}萬用H2×${template_h2} "
  elif [[ $template_h2 -ge 3 ]]; then
    score=$((score + 2))
    reasons="${reasons}萬用H2×${template_h2} "
  elif [[ $template_h2 -ge 2 ]]; then
    score=$((score + 1))
    reasons="${reasons}萬用H2×${template_h2} "
  fi

  # ── 12. LIST-DUMP（後半段清單堆砌）──
  local split_line=$(( lines * 6 / 10 ))
  local front_bullet=0
  local back_bullet=0
  local front_total=0
  local back_total=0
  local line_num=0
  while IFS= read -r line; do
    line_num=$((line_num + 1))
    [[ -z "$line" ]] && continue
    if [[ $line_num -le $split_line ]]; then
      front_total=$((front_total + 1))
      [[ "$line" =~ ^-\  || "$line" =~ ^\*\  || "$line" =~ ^[0-9]+\. ]] && front_bullet=$((front_bullet + 1))
    else
      back_total=$((back_total + 1))
      [[ "$line" =~ ^-\  || "$line" =~ ^\*\  || "$line" =~ ^[0-9]+\. ]] && back_bullet=$((back_bullet + 1))
    fi
  done < "$f"
  local front_ratio=0
  local back_ratio=0
  [[ $front_total -gt 0 ]] && front_ratio=$((front_bullet * 100 / front_total))
  [[ $back_total -gt 0 ]] && back_ratio=$((back_bullet * 100 / back_total))
  if [[ "$is_hub" == true ]]; then
    # Hub pages naturally have article index lists in back half — cap at +1
    if [[ $back_ratio -gt 60 ]] && [[ $front_total -gt 0 ]] && [[ $back_ratio -gt $((front_ratio * 3)) ]]; then
      score=$((score + 1))
      reasons="${reasons}後段清單堆砌${back_ratio}%(Hub減免) "
    fi
  elif [[ $back_ratio -gt 40 ]] && [[ $front_total -gt 0 ]] && [[ $back_ratio -gt $((front_ratio * 2)) ]]; then
    score=$((score + 3))
    reasons="${reasons}後段清單堆砌${back_ratio}% "
  elif [[ $back_ratio -gt 30 ]]; then
    score=$((score + 2))
    reasons="${reasons}後段清單堆砌${back_ratio}% "
  fi

  # ── 13. THIN（段落內容稀薄）──
  local thin_count=0
  local current_h2=""
  local prose_in_block=0
  local in_block=false
  while IFS= read -r line; do
    if [[ "$line" =~ ^##\  ]]; then
      # Evaluate previous block
      if [[ "$in_block" == true ]] && [[ $prose_in_block -lt 3 ]]; then
        thin_count=$((thin_count + 1))
      fi
      current_h2="$line"
      in_block=true
      prose_in_block=0
    elif [[ "$in_block" == true ]]; then
      # Count prose lines (not bullet/table/empty/heading)
      if [[ -n "$line" ]] && ! [[ "$line" =~ ^(#|-|\*|\||>) ]] && ! [[ "$line" =~ ^[0-9]+\. ]]; then
        prose_in_block=$((prose_in_block + 1))
      fi
    fi
  done < "$f"
  # Check last block
  if [[ "$in_block" == true ]] && [[ $prose_in_block -lt 3 ]]; then
    thin_count=$((thin_count + 1))
  fi
  if [[ "$is_hub" == true ]]; then
    # Hub pages may have short intro blocks for sub-topics — cap at +1
    if [[ $thin_count -ge 4 ]]; then
      score=$((score + 1))
      reasons="${reasons}稀薄段落×${thin_count}(Hub減免) "
    fi
  elif [[ $thin_count -ge 2 ]]; then
    score=$((score + 2))
    reasons="${reasons}稀薄段落×${thin_count} "
  elif [[ $thin_count -ge 1 ]]; then
    score=$((score + 1))
    reasons="${reasons}稀薄段落×${thin_count} "
  fi

  # ── 14. QUALITY-DECAY（前後半品質衰退）──
  local front_prose=0
  local back_prose=0
  local front_all=0
  local back_all=0
  line_num=0
  while IFS= read -r line; do
    line_num=$((line_num + 1))
    if [[ $line_num -le $split_line ]]; then
      front_all=$((front_all + 1))
      if [[ -n "$line" ]] && ! [[ "$line" =~ ^(#|-|\*|\||>) ]] && ! [[ "$line" =~ ^[0-9]+\. ]]; then
        front_prose=$((front_prose + 1))
      fi
    else
      back_all=$((back_all + 1))
      if [[ -n "$line" ]] && ! [[ "$line" =~ ^(#|-|\*|\||>) ]] && ! [[ "$line" =~ ^[0-9]+\. ]]; then
        back_prose=$((back_prose + 1))
      fi
    fi
  done < "$f"
  local front_prose_ratio=0
  local back_prose_ratio=0
  [[ $front_all -gt 0 ]] && front_prose_ratio=$((front_prose * 100 / front_all))
  [[ $back_all -gt 0 ]] && back_prose_ratio=$((back_prose * 100 / back_all))
  if [[ $front_prose_ratio -gt 0 ]]; then
    local decay_threshold_50=$(( front_prose_ratio / 2 ))
    local decay_threshold_70=$(( front_prose_ratio * 7 / 10 ))
    if [[ "$is_hub" == true ]]; then
      # Hub pages expect narrative intro → article index; only flag extreme decay
      if [[ $back_prose_ratio -lt $(( front_prose_ratio / 4 )) ]]; then
        score=$((score + 1))
        reasons="${reasons}品質衰退前${front_prose_ratio}%後${back_prose_ratio}%(Hub減免) "
      fi
    elif [[ $back_prose_ratio -lt $decay_threshold_50 ]]; then
      score=$((score + 3))
      reasons="${reasons}品質衰退前${front_prose_ratio}%後${back_prose_ratio}% "
    elif [[ $back_prose_ratio -lt $decay_threshold_70 ]]; then
      score=$((score + 1))
      reasons="${reasons}品質衰退前${front_prose_ratio}%後${back_prose_ratio}% "
    fi
  fi

  # ── 15. CHINA-TERM（中國用語偵測）──
  # 從 data/terminology/ YAML 萃取 A 類必換詞 + 硬編碼常見詞
  local china_terms=(
    "視頻" "質量" "軟件" "硬件" "博主" "博客" "點贊" "互聯網"
    "內存" "人工智能" "操作系統" "數據庫" "信息化" "服務器" "算法"
    "屏幕" "打印機" "網絡" "盒飯" "出租車" "鼠標" "硬盤" "寬帶"
    "U盤" "優盤" "移動端" "公交車" "地鐵站" "煤氣" "高清" "下載量"
  )
  local china_hits=0
  local china_found=""
  for cterm in "${china_terms[@]}"; do
    local count
    count=$(grep -c "$cterm" "$f" 2>/dev/null) || count=0
    if [[ $count -gt 0 ]]; then
      # 扣除已知台灣用語包含中國用語子字串的誤判
      # 例：「算法」會誤判台灣正確用語「演算法」
      local false_pos
      false_pos=0
      case "$cterm" in
        "算法") false_pos=$(grep -c "演算法" "$f" 2>/dev/null) || false_pos=0 ;;
        "高清") false_pos=$(grep -c "高清愿" "$f" 2>/dev/null) || false_pos=0 ;;
      esac
      count=$((count - false_pos))
      if [[ $count -gt 0 ]]; then
        china_hits=$((china_hits + count))
        china_found="${china_found}${cterm}(${count}) "
      fi
    fi
  done
  if [[ $china_hits -ge 5 ]]; then
    score=$((score + 3))
    reasons="${reasons}中國用語×${china_hits}[${china_found}] "
  elif [[ $china_hits -ge 3 ]]; then
    score=$((score + 2))
    reasons="${reasons}中國用語×${china_hits}[${china_found}] "
  elif [[ $china_hits -ge 1 ]]; then
    score=$((score + 1))
    reasons="${reasons}中國用語×${china_hits}[${china_found}] "
  fi

  # ── 16. CITATION-DESERT（引用荒漠：無正式腳註）──
  local fn_def_count
  fn_def_count=$(grep -cE '^\[\^[0-9a-zA-Z_-]+\]:' "$f" 2>/dev/null || echo "0")
  fn_def_count=${fn_def_count//[[:space:]]/}
  # Always compute content_words (needed for citation health grading below)
  local content_words
  content_words=$(awk 'BEGIN{fm=0} /^---$/{fm++; next} fm>=2{print}' "$f" | wc -w | tr -d '[:space:]')
  if [[ $fn_def_count -eq 0 ]]; then
    if [[ $content_words -gt 500 ]]; then
      if [[ $url_count -eq 0 ]]; then
        score=$((score + 4))
        reasons="${reasons}引用荒漠(零腳註零URL) "
      else
        score=$((score + 2))
        reasons="${reasons}引用荒漠(零腳註) "
      fi
    elif [[ $content_words -gt 200 ]]; then
      score=$((score + 1))
      reasons="${reasons}無腳註 "
    fi
  fi

  TOTAL=$((TOTAL + 1))

  # ── Citation health grading (integrated from footnote-scan logic) ──
  CITE_TOTAL=$((CITE_TOTAL + 1))
  local cite_grade=""
  if [[ $fn_def_count -ge 3 ]]; then
    local cite_density=999999
    [[ $fn_def_count -gt 0 ]] && cite_density=$((content_words / fn_def_count))
    if [[ $cite_density -le 300 ]]; then
      cite_grade="A"; CITE_GRADE_A=$((CITE_GRADE_A + 1))
    else
      cite_grade="B"; CITE_GRADE_B=$((CITE_GRADE_B + 1))
    fi
    CITE_HAS_FN=$((CITE_HAS_FN + 1))
  elif [[ $fn_def_count -ge 1 ]]; then
    cite_grade="B"; CITE_GRADE_B=$((CITE_GRADE_B + 1))
    CITE_HAS_FN=$((CITE_HAS_FN + 1))
  elif [[ $url_count -ge 3 ]]; then
    cite_grade="C"; CITE_GRADE_C=$((CITE_GRADE_C + 1))
    CITE_HAS_URL=$((CITE_HAS_URL + 1))
  elif [[ $url_count -ge 1 ]]; then
    cite_grade="D"; CITE_GRADE_D=$((CITE_GRADE_D + 1))
    CITE_HAS_URL=$((CITE_HAS_URL + 1))
  else
    cite_grade="F"; CITE_GRADE_F=$((CITE_GRADE_F + 1))
    CITE_NAKED=$((CITE_NAKED + 1))
  fi

  # 分級: 0-3 OK, 4-7 ⚠️ 可疑, 8+ 🔴 高度可疑
  if [[ $score -ge 4 ]]; then
    SUSPECT=$((SUSPECT + 1))
    local rel="${f#src/content/zh-TW/}"
    FLAGGED_FILES+=("$rel")
    SCORES+=("$score")
    REASONS+=("$reasons")
  fi
}

echo ""
if [[ "$JSON_MODE" == false ]]; then
  if [[ -n "$SINGLE_FILE" ]]; then
    echo "🔍 quality-scan v3.3 — 掃描單一檔案: $SINGLE_FILE"
  else
    echo "🔍 quality-scan v3.3 — 掃描 src/content/zh-TW/"
  fi
  echo "   評分: 0-3 ✅ OK | 4-7 ⚠️ 可疑 | 8+ 🔴 高度可疑"
  echo "   維度: 原11項 + LIST-DUMP + THIN + QUALITY-DECAY + CHINA-TERM + CITATION-DESERT"
  echo ""
fi

# Scan: single file or all zh-TW articles
if [[ -n "$SINGLE_FILE" ]]; then
  scan_file "$SINGLE_FILE"
else
  while IFS= read -r -d '' file; do
    scan_file "$file"
  done < <(find src/content/zh-TW -name '*.md' -print0 | sort -z)
fi

# ── Sort by score (descending) if requested ──
sorted_indices=()
if [[ "$SORT_MODE" == true ]] && [[ ${#SCORES[@]} -gt 0 ]]; then
  # Build index array sorted by score descending
  sorted_indices=()
  while IFS= read -r idx; do
    sorted_indices+=("$idx")
  done < <(
    for i in "${!SCORES[@]}"; do
      echo "$i ${SCORES[$i]}"
    done | sort -k2 -nr | awk '{print $1}'
  )
elif [[ ${#SCORES[@]} -gt 0 ]]; then
  for i in "${!SCORES[@]}"; do
    sorted_indices+=("$i")
  done
fi

# ── Apply --worst N limit (truncate sorted_indices) ──
if [[ "$WORST_N" -gt 0 ]] && [[ ${#sorted_indices[@]} -gt "$WORST_N" ]]; then
  sorted_indices=("${sorted_indices[@]:0:$WORST_N}")
fi

# ── Diff mode: load baseline into temp file for lookup ──
BASELINE_TMP=""
if [[ "$DIFF_MODE" == true ]] && [[ -f "$BASELINE_FILE" ]]; then
  BASELINE_TMP=$(mktemp)
  grep '"file"' "$BASELINE_FILE" 2>/dev/null | \
    sed 's/.*"file": *"//;s/".*"score": *//;s/[^0-9].*//' | \
    paste - - > "$BASELINE_TMP" 2>/dev/null || true
  # Actually parse properly
  rm -f "$BASELINE_TMP"
  BASELINE_TMP=$(mktemp)
  python3 -c "
import json, sys
try:
  data = json.load(open('$BASELINE_FILE'))
  for f in data.get('files', []):
    print(f['file'] + '\t' + str(f['score']))
except: pass
" > "$BASELINE_TMP" 2>/dev/null || true
fi

baseline_lookup() {
  local file="$1"
  if [[ -n "$BASELINE_TMP" && -f "$BASELINE_TMP" ]]; then
    grep "^${file}	" "$BASELINE_TMP" 2>/dev/null | cut -f2 | head -1
  fi
}

# ── Output ──
if [[ "$JSON_MODE" == false ]]; then
  new_count=0
  improved_count=0
  worsened_count=0
  
  for idx in ${sorted_indices[@]+"${sorted_indices[@]}"}; do
    rel="${FLAGGED_FILES[$idx]}"
    sc="${SCORES[$idx]}"
    rs="${REASONS[$idx]}"
    
    # Diff annotation
    diff_tag=""
    if [[ "$DIFF_MODE" == true ]]; then
      old_score=$(baseline_lookup "$rel")
      if [[ -n "$old_score" ]]; then
        if [[ $sc -gt $old_score ]]; then
          diff_tag=" ${RED}↑${old_score}→${sc}${RST}"
          worsened_count=$((worsened_count + 1))
        elif [[ $sc -lt $old_score ]]; then
          diff_tag=" ${GRN}↓${old_score}→${sc}${RST}"
          improved_count=$((improved_count + 1))
        fi
      else
        diff_tag=" ${CYN}🆕${RST}"
        new_count=$((new_count + 1))
      fi
    fi

    if [[ $sc -ge 8 ]]; then
      echo -e "${RED}🔴 [$sc] $rel${diff_tag}${RST}"
      echo -e "   ${DIM}${rs}${RST}"
    elif [[ $sc -ge 4 ]]; then
      echo -e "${YEL}⚠️  [$sc] $rel${diff_tag}${RST}"
      echo -e "   ${DIM}${rs}${RST}"
    fi
  done

  echo ""
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  echo -e "📊 掃描完成: ${TOTAL} 篇文章"
  if [[ $SUSPECT -gt 0 ]]; then
    red_count=0
    yellow_count=0
    for sc in ${SCORES[@]+"${SCORES[@]}"}; do
      [[ $sc -ge 8 ]] && red_count=$((red_count + 1))
      [[ $sc -ge 4 && $sc -lt 8 ]] && yellow_count=$((yellow_count + 1))
    done
    echo -e "   ${RED}🔴 高度可疑: ${red_count} 篇${RST}"
    echo -e "   ${YEL}⚠️  可疑: ${yellow_count} 篇${RST}"
    echo -e "   ${GRN}✅ 通過: $((TOTAL - SUSPECT)) 篇${RST}"
  else
    echo -e "${GRN}✅ 全部通過${RST}"
  fi
  
  if [[ "$DIFF_MODE" == true ]]; then
    # Count fixed (was in baseline, not in current)
    fixed_count=0
    if [[ -n "$BASELINE_TMP" && -f "$BASELINE_TMP" ]]; then
      while IFS=$'\t' read -r bfile bscore; do
        [[ -z "$bfile" ]] && continue
        found=false
        for ffile in "${FLAGGED_FILES[@]}"; do
          [[ "$ffile" == "$bfile" ]] && found=true && break
        done
        [[ "$found" == false ]] && fixed_count=$((fixed_count + 1))
      done < "$BASELINE_TMP"
    fi
    
    echo ""
    echo -e "📈 差分（vs 上次 baseline）:"
    echo -e "   ${CYN}🆕 新增: ${new_count}${RST}"
    echo -e "   ${RED}↑ 惡化: ${worsened_count}${RST}"
    echo -e "   ${GRN}↓ 改善: ${improved_count}${RST}"
    echo -e "   ${GRN}✅ 已修復: ${fixed_count}${RST}"
  fi
  echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

  # ── Citation health summary (造橋鋪路: 每次掃描自動報告引用健康度) ──
  if [[ -z "$SINGLE_FILE" ]] && [[ $CITE_TOTAL -gt 0 ]]; then
    fn_pct=$((CITE_HAS_FN * 100 / CITE_TOTAL))
    naked_pct=$((CITE_NAKED * 100 / CITE_TOTAL))
    echo ""
    echo "📋 引用健康度（整合自 footnote-scan 邏輯）"
    echo -e "   掃描: ${CITE_TOTAL} 篇"
    echo -e "   ${GRN}有腳註: ${CITE_HAS_FN} (${fn_pct}%)${RST}  ${YEL}僅URL: ${CITE_HAS_URL}${RST}  ${RED}裸奔: ${CITE_NAKED} (${naked_pct}%)${RST}"
    echo -e "   等級: ${GRN}A:${CITE_GRADE_A}${RST} ${GRN}B:${CITE_GRADE_B}${RST} ${YEL}C:${CITE_GRADE_C}${RST} ${YEL}D:${CITE_GRADE_D}${RST} ${RED}F:${CITE_GRADE_F}${RST}"
    if [[ $fn_pct -lt 10 ]]; then
      echo -e "   ${RED}⚠️  腳註覆蓋率 ${fn_pct}% — 引用荒漠${RST}"
    elif [[ $fn_pct -lt 30 ]]; then
      echo -e "   ${YEL}🟡 腳註覆蓋率 ${fn_pct}% — 需要改善${RST}"
    else
      echo -e "   ${GRN}✅ 腳註覆蓋率 ${fn_pct}%${RST}"
    fi
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
  fi
fi

# ── JSON output ──
if [[ "$JSON_MODE" == true ]]; then
  echo "{"
  echo "  \"version\": \"3.2\","
  echo "  \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\","
  echo "  \"total\": $TOTAL,"
  echo "  \"flagged\": $SUSPECT,"
  echo "  \"red\": $(printf '%s\n' ${SCORES[@]+"${SCORES[@]}"} | awk '$1>=8' | wc -l | tr -d '[:space:]'),"
  echo "  \"yellow\": $(printf '%s\n' ${SCORES[@]+"${SCORES[@]}"} | awk '$1>=4 && $1<8' | wc -l | tr -d '[:space:]'),"
  echo "  \"citation_health\": {"
  echo "    \"total\": $CITE_TOTAL,"
  echo "    \"has_footnotes\": $CITE_HAS_FN,"
  echo "    \"has_urls_only\": $CITE_HAS_URL,"
  echo "    \"naked\": $CITE_NAKED,"
  echo "    \"footnote_rate_pct\": $(( CITE_TOTAL > 0 ? CITE_HAS_FN * 100 / CITE_TOTAL : 0 )),"
  echo "    \"grades\": {\"A\": $CITE_GRADE_A, \"B\": $CITE_GRADE_B, \"C\": $CITE_GRADE_C, \"D\": $CITE_GRADE_D, \"F\": $CITE_GRADE_F}"
  echo "  },"
  echo "  \"files\": ["
  first=true
  for idx in ${sorted_indices[@]+"${sorted_indices[@]}"}; do
    [[ "$first" == true ]] && first=false || echo ","
    printf '    {"file": "%s", "score": %s, "reasons": "%s"}' \
      "${FLAGGED_FILES[$idx]}" "${SCORES[$idx]}" "$(echo "${REASONS[$idx]}" | sed 's/ *$//')"
  done
  echo ""
  echo "  ]"
  echo "}"
fi

# ── Save baseline (always, for diff mode next time) ──
{
  echo "{"
  echo "  \"version\": \"3.2\","
  echo "  \"timestamp\": \"$(date -u +%Y-%m-%dT%H:%M:%SZ)\","
  echo "  \"total\": $TOTAL,"
  echo "  \"flagged\": $SUSPECT,"
  echo "  \"files\": ["
  first=true
  for idx in ${sorted_indices[@]+"${sorted_indices[@]}"}; do
    [[ "$first" == true ]] && first=false || echo ","
    printf '    {"file": "%s", "score": %s}' "${FLAGGED_FILES[$idx]}" "${SCORES[$idx]}"
  done
  echo ""
  echo "  ]"
  echo "}"
} > "$BASELINE_FILE"

# ── Fix mode ──
if [[ "$FIX_MODE" == true ]] && [[ $SUSPECT -gt 0 ]]; then
  echo ""
  echo "📝 標記 lastHumanReview: false → 需要重寫"
  for f in "${FLAGGED_FILES[@]}"; do
    full="src/content/zh-TW/$f"
    if grep -q 'lastHumanReview: true' "$full" 2>/dev/null; then
      sed -i '' 's/lastHumanReview: true/lastHumanReview: false/' "$full"
      echo "   ✏️  $f → lastHumanReview: false"
    fi
  done
fi
