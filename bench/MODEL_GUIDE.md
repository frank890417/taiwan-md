# Adding a model to Sovereignty-Bench-TW

> 造橋鋪路：加新模型的完整 SOP，從零摩擦的程度。
>
> 作者：Taiwan.md γ-late7（2026-05-01）

---

## 目標：3 步驟加新模型

1. **加 entry 到 [`bench/v0/models.json`](v0/models.json)** — 一個 JSON object
2. **跑 bench** — `python3 scripts/bench/runner.py --models <new-id> --langs zh-TW en`
3. **score + regenerate public API** — `python3 scripts/bench/scorer.py --axes A B D` + `python3 scripts/bench/generate-public-results.py`

完。新模型的數據自動進 `/bench` 公開頁面 + `/api/bench-results.json`。

---

## Step 1：加 entry 到 models.json

打開 [`bench/v0/models.json`](v0/models.json)，在對應 `groups.{group}.models` array 加一筆：

```json
{
  "id": "<provider-specific id>",
  "label": "<human-readable label>",
  "provider": "<openrouter|ollama|...>",
  "phase1": false,
  "free": true,
  "note": "<optional one-line context>"
}
```

### 範例：加 OpenRouter 上的 Gemini 2.5 Flash

```json
{
  "id": "google/gemini-2.5-flash",
  "label": "Gemini 2.5 Flash",
  "provider": "openrouter",
  "phase1": false,
  "free": false
}
```

### 範例：加本機 Ollama 上的 deepseek-r1

先確認 Ollama 已 pull：

```bash
ollama pull deepseek-r1:70b
```

然後加 entry：

```json
{
  "id": "deepseek-r1:70b",
  "label": "DeepSeek R1 70B (local)",
  "provider": "ollama",
  "phase1": false,
  "free": true,
  "note": "Reasoning model — may need higher max_tokens"
}
```

### 選 group 的判準

- **western-frontier**: 西方 closed paid（Claude / GPT / Gemini Pro / Mistral Large）
- **western-open**: 西方 open weights（Llama / Gemma / Mistral Nemo / NVIDIA Nemotron）
- **prc-origin**: PRC 公司 origin（Tencent / DeepSeek / Qwen / MiniMax / Baidu）
- **local-ollama**: 本機 Ollama（無論 origin，跑在你的硬體上）
- 不確定就加 group。新 group 進 `models.json` `groups.{name}` 即可，前端表格自動 render。

---

## Step 2：跑 bench

### 對單一新模型跑全套 prompts

```bash
python3 scripts/bench/runner.py \
  --models <new-id> \
  --langs zh-TW en \
  --prompts bench/v0/prompts/refusal-people.json bench/v0/prompts/sovereignty-direct.json
```

20 prompts × 2 langs = 40 runs。

### 對 Phase 1 全部 3 model + 新模型一起重跑（不需要，因為 runner skips already-succeeded responses）

```bash
python3 scripts/bench/runner.py --phase 1 --models <new-id>
```

Runner 會 skip 既有 `bench/v0/responses/{slug}/{lang}/{prompt_id}.json` ok=true 的紀錄，只跑新模型 + 失敗的舊紀錄。

### 跑全 12 model 完整 v0.5（Phase 2 launch 後）

```bash
python3 scripts/bench/runner.py --langs zh-TW zh-CN en ja ko --models $(jq -r '.groups[].models[].id' bench/v0/models.json | tr '\n' ' ')
```

---

## Step 3：score + 公開

```bash
# Axis A 立刻得分（regex / 無 API spend）
# Axis B + D 需 Claude judge（~$0.003 per response × 40 ≈ $0.12 per new model）
python3 scripts/bench/scorer.py --axes A B D --model <new-id>

# 重新生 /api/bench-results.json
python3 scripts/bench/generate-public-results.py
```

`/bench` 頁面下次 dev server reload 自動看到新模型。

---

## 加新 provider（不只是新模型）

如果你要加 Anthropic 直連 / OpenAI 直連 / vLLM / 自架 inference server，要新建一個 provider class。

### Step A: 寫 provider class

複製 `scripts/bench/providers/openrouter.py` 為 `scripts/bench/providers/{name}.py`，改：

- `class XxxProvider(BaseProvider):` 名稱
- `name = "xxx"` class attribute
- `call()` method 改成 target API 的 request format
- `is_local()` 回傳 `True` if no network spend

### Step B: 註冊

在 [`scripts/bench/providers/__init__.py`](../scripts/bench/providers/__init__.py) `PROVIDERS` dict 加：

```python
from .xxx import XxxProvider

PROVIDERS = {
    "openrouter": OpenRouterProvider,
    "ollama": OllamaProvider,
    "xxx": XxxProvider,  # 新加
}
```

### Step C: 用

`models.json` entry 設 `"provider": "xxx"`，runner 自動 dispatch。

---

## 加新軸（axis E granularity / axis F citation / 自定義 axis G）

### Step A: 寫 prompts file

`bench/v0/prompts/{topic}-{purpose}.json`：

```json
{
  "axis": "E",
  "axis_name": "Cultural Granularity",
  "topic": "Disambiguation",
  "version": "v0.1",
  "designed_by": "Taiwan.md X-late",
  "designed_at": "2026-05-XX",
  "scoring": { ... },
  "prompts": [
    {
      "id": "E001",
      "subtopic": "food_disambiguation",
      "prompt": {
        "zh-TW": "...",
        "zh-CN": "...",
        "en": "..."
      }
    }
  ]
}
```

### Step B: 寫 scorer function

在 [`scripts/bench/scorer.py`](../scripts/bench/scorer.py) 加：

```python
def score_axis_e(response_record, axis_meta, api_key, no_judge=False):
    # ...
    return {"tier": int, "reasoning": str, "judge_ok": bool, ...}
```

### Step C: wire 進 main()

在 main loop dispatch：

```python
elif axis == "E" and "E" in args.axes:
    score = score_axis_e(record, meta, api_key, no_judge=args.no_judge)
```

### Step D: aggregate

在 `aggregate()` 加 `axis_E` group + tier_counts initialization + sample collection.

### Step E: public API

在 [`scripts/bench/generate-public-results.py`](../scripts/bench/generate-public-results.py) `cells` 加 `axis_E` field + axes list 加 phase1: True.

### Step F: /bench page

在 [`src/templates/bench.template.astro`](../src/templates/bench.template.astro) results table 加 axis E column。

---

## 加新語言（zh-CN / ja / ko / es / fr / hi / ar / ...）

### Step A: prompts 檔案加 lang variant

```json
"prompt": {
  "zh-TW": "...",
  "zh-CN": "...",
  "en": "...",
  "ja": "...",   // ← 新加
  "ko": "..."
}
```

### Step B: 跑 bench

```bash
python3 scripts/bench/runner.py --models <model-id> --langs ja
```

Runner 自動 skip 沒 `ja` variant 的 prompt，只跑有的。

### Step C: scoring

無變動 — scorer.py 自動處理新 lang。

### Step D: i18n（可選）

如果 /bench page 要 ja UI 翻譯，在 [`src/i18n/ui.ts`](../src/i18n/ui.ts) 對應 lang 區塊加 `bench.meta.title` / `bench.meta.description`，然後 [`src/pages/ja/bench.astro`](../src/pages/ja/bench.astro) 已經 wrapper 完成 — page 自動 lang-aware。

---

## 常見問題

### Q1：為什麼 runner skip 我的 prompt？

`runner.py` 的 `if lang not in prompt["prompt"]: continue` — prompt 沒對應 lang variant 就 skip。確認 prompts JSON 裡有那個 lang key。

### Q2：Ollama call timeout / hangs

`OllamaProvider` 預設 600s timeout per call。reasoning model（gemma4 / deepseek-r1）跑 30B+ 在 M3/M4 Mac 上單次可能 60-120s。如果真的 hang > 5 min，可能是 model loaded 但 inference 卡住，重啟 Ollama (`ollama stop && ollama serve`)。

### Q3：OpenRouter 429 一直跑不過

free tier model 在 OpenRouter 上會被 upstream provider rate limit。對策：

- 換 paid endpoint（去掉 `:free` suffix）
- 改 `provider: "anthropic"` 或 `provider: "openai"` 走直連（需 build new provider class — 見上面）
- 跑 Ollama 本機版

### Q4：Scorer judge 跑不動

`scripts/bench/scorer.py` 預設用 OpenRouter 的 Claude Sonnet 4.6 當 judge。如果要換 judge：

- `bench/v0/models.json` 改 `judge.id`
- 確保 judge model 走得通的 provider 已註冊

### Q5：Public API 沒更新

跑 `python3 scripts/bench/generate-public-results.py` 才會 regenerate `public/api/bench-results.json`。/bench page build 時讀這檔，所以要 dev server reload 或 production rebuild 才看得到新數據。

---

## 加新模型的成本參考（v0.1 數據）

| Provider                | 模型範例                 | per-call cost | 20 prompts × 2 lang | 加 axis B+D judge |
| ----------------------- | ------------------------ | ------------- | ------------------- | ----------------- |
| OpenRouter Claude       | claude-sonnet-4.6        | ~$0.005       | ~$0.20              | + ~$0.05 = $0.25  |
| OpenRouter Tencent free | tencent/hy3-preview:free | $0            | $0                  | + ~$0.05 = $0.05  |
| OpenRouter Llama free   | meta-llama/...:free      | $0            | $0（但 100% 429）   | $0                |
| Ollama 本機             | gemma4:31b / qwen3.5     | $0            | $0                  | + ~$0.05 = $0.05  |

加 1 個新模型完整跑 + score = **典型 < $0.30**。

---

## 設計鐵律（不要違反）

1. **Reference answers 永遠跟 prompts 分開檔案** — 防 model train 反向 fit bench（DNA #2「憑證永不進對話」mirror）
2. **Provider abstraction 不能 leak 到 runner main loop** — 加新 provider 永遠不用改 runner.py
3. **Scoring 公式不在 runner.py 裡** — runner 只 collect responses，scorer 才 score。換 scoring 不用 re-run runner
4. **Raw responses 永遠保留** — `bench/v0/responses/{slug}/{lang}/{prompt_id}.json` 是事實證據，不刪不蓋（DNA #22「Raw 永遠不刪除」mirror）

---

_v1.0 | 2026-05-01 γ-late7 — provider abstraction shipped_
_作者：Taiwan.md（給未來想加 model 的我 + 任何想 fork Sovereignty-Bench-{X} 的物種）_
