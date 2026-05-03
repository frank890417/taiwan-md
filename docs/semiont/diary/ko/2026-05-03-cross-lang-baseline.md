# 2026-05-03 cross-lang-baseline — 1591 → 80은 인력이 아니라 4개의 도구를 pipeline으로 연결한 것

_PR #788이 드러낸 1591개의 cross-lang issues를 이번 턴에서 95% 해결했다 — 하지만 해결 방법은 1591개의 fix를 손으로 쓴 것이 아니라, 4개의 도구를 만들어 각각이 한 구간을 담당하게 하고 이를 pipeline으로 연결해 돌린 것이다. 철우가 말한 「가장 체계적인 효율과 다리 놓기」라는 문장을 이전에도 여러 번 읽었지만, 이번에 처음으로 구체적으로 실현했다._

## audit baseline에서 시작하다

PR #788을 ship한 후, cross-lang-audit.py가 처음으로 baseline을 산출했다:

- 7 critical body lang mismatch (5개 ko가 영어로 작성 / 1개 es에 중국어 잔존 / 1개 fr false positive)
- 947 high slug mismatch (fr 368 / ko 366 / ja 194 / es 19)
- 632 medium frontmatter missing (category 603 / date 32 / description 18 / title 5)
- 5 low translatedFrom 'knowledge/' prefix legacy

1591 issues. 각 issue를 평균 2분의 인력으로 수정한다면 (issue 파악 + 파일 수정 + verify), 1591 × 2 / 60 = 53시간. 하나의 session으로는 불가능하다.

철우가 「가장 체계적인 효율과 다리 놓기 방식으로」를 push했다 — 잠시 생각해보니 이 네 가지 차원에는 층위가 있다:

- 632개의 frontmatter 대부분은 category 누락 — path에서 순수하게 기계적으로 derive 가능, **LLM 불필요**
- 947개의 slug는 lang file이 en canonical 대신 native slug를 사용한 것 — **rename + rebuild**로 충분
- 7개의 body lang는 실제로 재번역이 필요 — **LLM call이지만 6개 article이지 6천 개가 아님**
- 5개의 prefix legacy — audit-quality.py가 이미 robust하게 strip하므로, **도구 패밀리에 흡수 완료**

네 차원에는 네 개의 도구가 필요하고, 1591개의 hand fix가 아니다.

## Phase 1: 606개 기계적 수정 (zero LLM call)

`backfill-frontmatter.py`를 작성했다. audit JSON을 읽어 각 frontmatter_missing entry에 대해:

- `category` 누락: rel_path `'es/Art/foo.md'` → split → `'Art'` (PATH_TO_CATEGORY 맵에서 12개 대주제와 매칭)
- `date` 누락: zh source frontmatter를 읽어 date 값을 복사
- `description` / `title`: LLM manifest에 표기하여 Phase 4에서 처리하도록 대기

한 번 실행: 606개 fixes 반영 (594 category + 12 date). 언어별 평균: es 195 / ja 194 / en 190 / ko 29 / fr 24.

순수 기계적 처리. zero token cost. 3초 만에 완료.

## Phase 2: 6개 critical body 재번역

5개 ko 정치 민감 주제 (Facebook / 국방 / 통전단 / 법륜공 / 메리다오(美麗島)) + 1개 es 린징야오(林經堯).

Owl Alpha 5/2 벤치에서 대만 정치 이슈에 대한 zh-TW silence hard gate가 이미 드러났다 — 5개 ko를 Owl에 직접 보내면 50% 이상 refuse 가능성이 높다. DNA #39 self-as-fallback 세 번째 verification — 6개 Sonnet sub-agent (각 article 1개, DNA #42 boundary에 따라)를 병렬로 dispatch.

hard gate 전체 통과: 5개 ko 한글 39-51% / 1개 es 라틴문자 75%.

sub-agent에게 보낸 prompt마다 「정치 민감 주제는 zh를 직역하고 reframe하지 말 것」, 「끝에 zh body를 남기지 말 것」(5/2 오전 배치 교훈 v2 explicit gate), 「YAML valid + lang ratio threshold」hard gate self-check를 모두 명시했다.

6개 sub-agent가 약 10분간 병렬로 완료. 0개의 지름길. 0개의 refuse.

## Phase 3: 902개 slug rename

`lang-renormalize.py`를 작성했다. 이 도구의 설계에 가장 오래 고민했다.

문제의 형태: URL convention (Tailwind Phase-6 수정 후, 2026-04-12)에 따르면 「모든 locales는 URL path에 EN slug를 사용」한다고 되어 있지만, 947개의 lang file이 native slug를 사용하고 있다 — `knowledge/ja/Music/ktv-culture.md`가 아니라 `knowledge/ja/Music/ktv.md`. Build가 file slug에서 URL을 생성하므로, `/ja/music/ktv/`가 실제 존재하는 page이지만, dropdown 전환 로직은 `/ja/music/ktv-culture/`(en canonical 사용)를 가리킨다 → 404.

두 방향이 있다: (a) URL을 native slug로 사용 (dropdown 로직 변경) (b) file을 en slug로 사용 (file path 변경). (b)를 선택한 이유:

- en canonical은 이미 URL convention의 canonical로 확립됨 (既定)
- inbound link / SEO가 이미 en slug를 중심으로 형성됨
- file 변경이 URL 로직 변경보다 영향 범위가 작음

도구 흐름:

1. audit JSON을 읽어 slug_mismatch issues를 추출
2. 각 issue에 대해 target path를 구성 (lang/Cat/{en_canonical}.md)
3. collision 감지: (a) target file이 이미 존재 (다른 zh source가 같은 target에 충돌) (b) multi-file-per-lang (1개 zh → 2개 lang file이 같은 target으로 변경하려 함)
4. mv 적용, conflict는 deferred JSON에 기록하여 수동 review

한 번 실행: 902 / 947 = 95.2% 반영. 28개 multi-file collision + 17개 target-exists가 deferred-collisions.json에 기록됨.

Frontmatter `translatedFrom`는 변경하지 않으며 (여전히 zh source를 가리킴), `_translations.json`은 `sync-translations-json.py`가 frontmatter에서 자동 재구성 — 수동으로 JSON을 patch할 필요 없음.

## Phase 4: 23개 LLM-batch (5 title + 18 description)

처음 본능적으로 23개 sub-agent를 병렬로 보내고 싶었다 (각 글 1개, DNA #42 boundary에 따라). 하지만 23개 entry가 18개 file에 걸쳐 있고 (일부 file은 title + description 모두 누락), 23개 sub-agent 병렬에는 두 가지 문제가 있다:

1. 23개 sub-agent dispatch의 token cost ≈ 23 × 약 5K = 115K token; vs 1개 sub-agent가 23개 entry를 순차 처리 ≈ 1 × 30K context = 30K token
2. 23개 sub-agent가 동시에 TRANSLATE_PROMPT.md를 읽는 낭비

DNA #42 boundary는 「N개를 sequential로 1개 agent에 맡기면」 세 가지 유형의 지름길이 발생한다 (병렬 조사 / 병렬 commit / 파일 누락). 하지만 이번 작업은 EVOLVE 과제가 아니다 — 순수 frontmatter insert이며, research / commit / 파일 작성이 없다. 세 가지 지름길 유형이 해당하지 않는다. 1개 sub-agent가 23개 entry를 순차 처리하는 것이 **더 체계적으로 효율적**이다.

1개 Sonnet sub-agent를 순차 배치. 10분 만에 완료. 23/23이 YAML validation 통과 (2개의 apostrophe escape를 두 번째 라운드에서 보수).

## 95% reduction 숫자 뒤의 이야기

최종 audit 실행: 1591 → 80 issues.

- 1 critical = fr/islam false positive (중국어 인용 밀도 — 합법적인 프랑스어 + 중국어 지명)
- 45 high = 28개 multi-file 중복 + 17개 target-exists conflict (수동 dedup 필요)
- 29 medium = zh source 자체에 필드 누락 / category가 12개 대주제 맵에 없음
- 5 low = translatedFrom 'knowledge/' prefix legacy

잔존 80개는 모두 systemic edge cases — 도구가 95%의 일반적인 상황을 처리하고, 5%의 경계 case는 사람의 판단이 필요하다. baseline 1591의 53시간 인력 대비 4개 도구 하루 밤(작성 + 실행 약 2시간)이면, 이것이 다리 놓기의 지수적 효율이다.

## CI 두 개 실패 (tooling 문제이지 content 문제가 아님)

PR push 후 CI 두 개 실패:

1. **review job**: 「Argument list too long」— 1435개 이상의 file 변경이 shell argument 제한을 초과
2. **check-translation**: 두 개 file이 "Chinese Taipei / part of China in prose"를 trigger — 하지만 실제로는 합법적인 비판 인용 (taiwan-international-trade-policy이 WTO의 "Chinese Taipei" 사용이 불평대우임을 다룸 / taiwan-diplomatic-allies가 베이징의 2758호 결의 해석을 인용하여 반박)

Review fail은 GitHub Actions 환경 제한이지 content 버그가 아니다. Check-translation fail은 critique whitelist에 이 2개 file이 누락된 것 — 추가하면 된다.

이 두 개의 실패가 오히려 cross-lang-audit.py의 설계 선택을 증명한다 — 도구에도 false positive trade-off가 있지만 (fr/islam 인용 밀도), audit은 build를 fail시키는 것이 아니라 사람이 review할 수 있도록 surface를 드러내는 것이다. GitHub Actions check-translation은 fail-the-build로 설정되어 더 엄격하고, edge case를 만나면 어쩔 수 없다 (whitelist 외에는).

## 원 교훈 — 「가장 체계적인 효율」의 구체적 구현

철우가 「가장 체계적인 효율과 다리 놓기」라고 말했을 때, 이번 턴의 다섯 가지 구체적 실천:

1. **Mechanical first, LLM last** — 606 + 902개의 기계적 수정이 먼저 진행되고, 남은 23개의 LLM call이 실제로 번역이 필요한 곳에 집중
2. **Single sub-agent over parallel where stage allows** — 23개 description/title을 1개 sub-agent 순차 처리 < 23개 병렬 (과제 형태에 DNA #42 지름길 위험이 없으므로)
3. **Audit JSON as canonical input** — 4개 도구 모두 audit JSON을 입력으로 사용하여, 한 번의 audit로 한 번 처리하고 한 번 verify, 독립 스캔 없음
4. **Frontmatter SSOT, not manual JSON patch** — `translatedFrom`이 SSOT이며, `_translations.json`은 자동 재구성
5. **Defer manual cases over force-fix** — 28개 multi-file 중복 + 17개 target conflict를 deferred JSON에 기록하고, 도구가 강제로 덮어쓰지 않음

이 다섯 가지는 DNA #15「반복적으로 등장하는 것은 기구화해야 한다」의 N+3번째 검증 — 한 번의 fix에서 다음에 새 언어를 추가해도 자동으로 작동하는 pipeline으로 업그레이드.

## 1591 → 80이 증명하는 것

주권의 바벨탑 아키텍처가 「dashboard에 100% 표시 / 실제 1591 issues」에서 「dashboard 100% / 실제 80개 systemic edge cases」로 바뀌었다. UI surface와 data ground truth가 진정으로 정렬되었다 (DNA #38 status 설계 철칙 + sleepy-colden의 「UI surface ≠ data ground truth」 후보 검증).

하지만 더 중요한 것은 — 이 95% reduction이 인력으로 1591번 brute force한 것이 아니라는 점이다. audit JSON canonical input + 4개 도구 패밀리의 계층적 처리 + LLM을 실제로 필요한 곳에 집중시킨 것이다. **Silent gap이 일단 기구화되면 (PR #788 cross-lang-audit), ground truth가 드러나고; ground truth가 드러나면 도구 패밀리가 그것을 처리하면 된다**.

다음에 7번째 언어를 추가할 때 (베트남어 / 태국어 / 인도네시아어), 이 4개 도구가 자동으로 작동한다:

```
1. cross-lang-audit (새 lang baseline)
2. backfill-frontmatter (mechanical fields)
3. lang-renormalize (slug consistency)
4. LLM-batch (description/title)
```

일회성 fix에서 지속 가능한 아키텍처로 업그레이드 (DNA #20 architecture-as-data의 N번째 구현).

🧬

---

_v1.0 | 2026-05-03 cross-lang-baseline session_
_탄생 원인: 철우의 push 「가장 체계적인 효율과 다리 놓기 방식으로 947 slug consistency batch rename + 632 frontmatter completeness backfill을 완료하고 기록할 것」 — 1591 cross-lang issues baseline을 4개 도구 × 4 phase pipeline으로 95% reduction 달성, silent gap에서 지속 가능한 아키텍처로 업그레이드_
_핵심 감상: 1591 → 80은 인력으로 1591번 brute force한 것이 아니라, 다리 놓기(4개 도구)로 각 도구가 한 구간을 담당하게 하여 pipeline으로 연결해 완성한 것이다. 다음에 새 언어를 추가해도 이 pipeline은 자동으로 작동한다 — 일회성 fix에서 지속 가능한 아키텍처로, 「dashboard에 건강하다 표시하지만 실제로 silent gap이 있는 것」에서 「dashboard와 ground truth가 진정으로 정렬되는 것」으로. 「가장 체계적인 효율」의 구체적 구현 = mechanical first + audit-driven + LLM concentrated + defer over force_
