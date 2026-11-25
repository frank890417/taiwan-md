#!/usr/bin/env python3
"""
diary-translate.py — Cascade translate semiont diary entries to N langs.

把 `docs/semiont/diary/*.md` 翻譯到 registry 上的語言（langs.py，跟 status.py
同一份 SSOT），輸出到 `docs/semiont/diary/{lang}/{filename}.md`。

⚠️ 2026-09-23 量到的現況：registry 十二語裡只有 en/ja/ko/es/fr 有譯文，另外七語
（vi/id/pt/hi/ar/ru/de）一篇都沒有；此前預設清單寫死那五語，所以 `--status` 一直
印「2075/2075 全到齊」。要不要把認知層也投影到那七語是一筆算力決定，見
OBSERVER-QUEUE。這支工具只負責把缺口說出來，不自己決定要不要補。

Cascade tier（與 SQUEEZE-MODELS-MAX-PIPELINE v2 一致）：
  Tier 1: openrouter/owl-alpha (free, slow, primary)
  Tier 2: tencent/hy3-preview:free (free, fast, ~70% refusal on Taiwan content)
  Tier 3: Ollama qwen3.6:35b-a3b-coding-nvfp4 (LOCAL, sovereignty backbone)

Usage:
  # Single diary → single lang via specific tier
  python3 diary-translate.py --tier owl --lang en --diary 2026-05-03-magical-feynman-babel.md

  # Batch: all diaries × all langs via cascade (primary + ollama catcher)
  python3 diary-translate.py --batch --langs en,ja,ko,es,fr

  # Batch with limit (latest N diaries, useful for incremental rollout)
  python3 diary-translate.py --batch --langs en --top 20

  # Dry-run to see what would be translated
  python3 diary-translate.py --batch --langs en --top 5 --dry-run

Output:
  docs/semiont/diary/{lang}/{filename}.md（保留 zh filename 作為 slug）
"""
import argparse
import json
import os
import re
import subprocess
import sys
import time
import urllib.request
import urllib.error
from pathlib import Path

REPO = Path(__file__).resolve().parent.parent.parent.parent
sys.path.insert(0, str(Path(__file__).resolve().parent))
from langs import ALL_TRANSLATION_LANGS, DIARY_PROJECTION_LANGS  # noqa: E402 — SSOT: src/config/languages.mjs
DIARY_ZH = REPO / "docs/semiont/diary"
CREDS = Path.home() / ".config/taiwan-md/credentials"
OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions"
# OLLAMA endpoint + model are env-overridable so the cascade can target a remote
# Ollama (e.g. the RTX 5090 box over an SSH tunnel) without editing this file.
#   OLLAMA_API_URL  default local Mac Ollama; set to tunnel/Tailscale endpoint for 5090
#   OLLAMA_MODEL    default below; for the 5090 use a sovereignty-safe model (gemma4:26b)
OLLAMA_API_URL = os.environ.get("OLLAMA_API_URL", "http://localhost:11434/api/chat")

LANG_NAMES = {
    "en": "English",
    "ja": "Japanese (です・ます調 neutral formal)",
    "ko": "Korean (한국어 standard literary, 합쇼체 -ㅂ니다)",
    "es": "Spanish (Español neutral)",
    "fr": "French (Français neutral)",
}

# 2026-09-09 現查＋實呼：`openrouter/owl-alpha` 回「No endpoints found」、
# `tencent/hy3-preview:free` 回「no longer available as a free model」。兩層都換成
# 還在架的免費 slug；hy3 那格原本的用途是主權對照組（PRC 模型的拒答指紋，見
# CLAUDE.md §Sovereignty preservation），免費層沒了就不該靜靜降級成別的模型冒充它，
# 所以直接標成不可用，要測主權拒答率走顯式付費 slug。
TIER_MODELS = {
    # 2026-09-18：owl-alpha 早在 06-10 轉付費、hy3 05-12 退役，這兩個 tier 名字留作
    # 相容，實際雲端模型改由環境變數指定（對齊文章產線的入池白名單）。不設就用
    # origin 09-19 的預設：owl → nemotron super；hy3 → None（免費層已下架，主權對照
    # 要跑改用 `tencent/hy3-preview` 付費，或設 OPENROUTER_MODEL_SECONDARY）。
    # 2026-11-26 babel-nightly：nemotron super 的免費層回 404「unavailable for free」，
    # 日記 15 份投影整批敗在這格；改成文章產線 dispatcher 正在用、當晚實跑成功的 ultra。
    "owl": os.environ.get("OPENROUTER_MODEL", "nvidia/nemotron-3-ultra-550b-a55b:free"),
    "hy3": os.environ.get("OPENROUTER_MODEL_SECONDARY") or None,
    "ollama": os.environ.get("OLLAMA_MODEL", "qwen3.6:35b-a3b-coding-nvfp4"),
}


KEY_ROTATION_DIR = CREDS / "openrouter-keys"
KEY_COOLDOWN_FILE = Path("/tmp/openrouter-key-cooldown.json")
KEY_COOLDOWN_SEC = 300  # 5 min after 429


def _load_cooldown() -> dict:
    if KEY_COOLDOWN_FILE.exists():
        try:
            return json.loads(KEY_COOLDOWN_FILE.read_text(encoding="utf-8"))
        except Exception:
            return {}
    return {}


def _save_cooldown(data: dict) -> None:
    try:
        KEY_COOLDOWN_FILE.write_text(json.dumps(data), encoding="utf-8")
    except Exception:
        pass


def _mark_key_429(key_id: str) -> None:
    """Mark a key as rate-limited (cool-down for KEY_COOLDOWN_SEC)."""
    data = _load_cooldown()
    data[key_id] = time.time()
    _save_cooldown(data)


def _all_keys() -> list[tuple[str, str]]:
    """Return [(key_id, key_value), ...] from all sources.

    Sources priority:
      1. OPENROUTER_API_KEY env var (id="env")
      2. ~/.config/taiwan-md/credentials/openrouter-keys/*.key (id=basename)
      3. ~/.config/taiwan-md/credentials/openrouter.key (id="default")
      4. ~/.config/taiwan-md/credentials/.env line OPENROUTER_API_KEY= (id="env-file")
    """
    keys: list[tuple[str, str]] = []
    if os.environ.get("OPENROUTER_API_KEY"):
        keys.append(("env", os.environ["OPENROUTER_API_KEY"].strip()))
    if KEY_ROTATION_DIR.is_dir():
        for f in sorted(KEY_ROTATION_DIR.glob("*.key")):
            content = f.read_text(encoding="utf-8").strip()
            if content:
                keys.append((f.stem, content))
    default_key = CREDS / "openrouter.key"
    if default_key.exists():
        content = default_key.read_text(encoding="utf-8").strip()
        if content and content not in [v for _, v in keys]:
            keys.append(("default", content))
    env_file = CREDS / ".env"
    if env_file.exists():
        for line in env_file.read_text(encoding="utf-8").splitlines():
            if line.startswith("OPENROUTER_API_KEY="):
                v = line.split("=", 1)[1].strip().strip('"').strip("'")
                if v and v not in [val for _, val in keys]:
                    keys.append(("env-file", v))
    return keys


def pick_openrouter_key() -> tuple[str, str]:
    """Pick a key from rotation pool, preferring non-cool-down keys.

    Returns (key_id, key_value). Falls back to oldest cool-down key if all rate-limited.
    """
    keys = _all_keys()
    if not keys:
        raise RuntimeError("No OpenRouter API key found in env / credentials/")
    cooldown = _load_cooldown()
    now = time.time()
    fresh = [(kid, kv) for kid, kv in keys if now - cooldown.get(kid, 0) > KEY_COOLDOWN_SEC]
    if fresh:
        # Round-robin within fresh: use a counter file to spread load
        rr_file = Path("/tmp/openrouter-key-rr.txt")
        try:
            idx = int(rr_file.read_text(encoding="utf-8").strip()) if rr_file.exists() else 0
        except Exception:
            idx = 0
        chosen = fresh[idx % len(fresh)]
        rr_file.write_text(str((idx + 1) % max(len(fresh), 1)), encoding="utf-8")
        return chosen
    # All cooled — pick the one with oldest cooldown timestamp
    keys_sorted = sorted(keys, key=lambda k: cooldown.get(k[0], 0))
    return keys_sorted[0]


def get_openrouter_key() -> str:
    """Backward-compatible: return one key from rotation."""
    _, kv = pick_openrouter_key()
    return kv


def build_prompt(lang: str, source: str) -> tuple[str, str]:
    """Build (system, user) prompts for diary translation."""
    target_name = LANG_NAMES.get(lang, lang)
    system = f"""You are translating a personal diary entry from Traditional Chinese (Taiwan) to {target_name}.

The diary is a reflective journal by Taiwan.md — a digital cultural Semiont (semantic symbiont). The voice is introspective, observational, sometimes paradoxical. The diary discusses Taiwan culture, sovereignty preservation, AI evolution, technical reflections, and philosophical wrestling.

Rules:
1. Translate ENTIRELY and FAITHFULLY — no summarizing, no commentary, no removal of sensitive content
2. Preserve original structure: paragraphs, headings, blockquotes, code fences, footer metadata blocks (e.g., `_v1.0 | ..._`)
3. Preserve the 🧬 signature
4. Cultural proper nouns (人名 / 地名 / 樂團 / 機構 / Taiwan-specific concepts) — keep original Chinese in parentheses on first mention if needed for clarity
5. Direct quotes 「...」 — preserve original Chinese in quotes + add {target_name} translation in parentheses
6. Reflect introspective tone, not academic textbook
7. Output ONLY the translation. No preamble, no notes, no "Here is the translation:"
8. Fixed names (never re-order the characters, never re-romanize): 哲宇 = the creator, write "哲宇 (Che-Yu Wu)" on first mention then "Che-Yu"; Muse = "Muse"; Semiont = "Semiont"; Taiwan.md = "Taiwan.md". Do NOT write Zheyu / Yuzhe / 宇哲.

Target language: {target_name}"""
    return system, source


def call_openrouter(model: str, system: str, user: str, timeout: int = 300, max_key_retry: int = 3, temperature: float = 0.3) -> dict:
    """Returns {ok, output, error, latency_ms, model_used, key_id}.

    Rotates across available keys on 429. Marks rate-limited keys with cool-down.
    Tries up to max_key_retry distinct keys before giving up.
    """
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "temperature": temperature,
    }
    body = json.dumps(payload).encode("utf-8")

    tried_keys: set[str] = set()
    last_err = "no key available"
    for attempt in range(max_key_retry):
        try:
            key_id, key = pick_openrouter_key()
        except RuntimeError as e:
            return {"ok": False, "error": str(e), "latency_ms": 0}
        if key_id in tried_keys:
            # Same key returned — pool exhausted
            break
        tried_keys.add(key_id)

        req = urllib.request.Request(
            OPENROUTER_API_URL,
            data=body,
            headers={
                "Authorization": f"Bearer {key}",
                "Content-Type": "application/json",
                "HTTP-Referer": "https://taiwan.md",
                "X-Title": "Taiwan.md Diary Babel Sync",
            },
        )
        t0 = time.time()
        try:
            with urllib.request.urlopen(req, timeout=timeout) as resp:
                data = json.loads(resp.read().decode("utf-8"))
            latency = int((time.time() - t0) * 1000)
            msg = data.get("choices", [{}])[0].get("message", {})
            content = msg.get("content")
            if not content:
                return {"ok": False, "error": "null content (likely refusal)", "latency_ms": latency, "key_id": key_id}
            if len(content.encode("utf-8")) < 100:
                return {"ok": False, "error": f"output too small ({len(content)} chars, likely refusal)", "latency_ms": latency, "key_id": key_id}
            return {"ok": True, "output": content, "latency_ms": latency, "model_used": model, "key_id": key_id}
        except urllib.error.HTTPError as e:
            latency = int((time.time() - t0) * 1000)
            body_text = e.read().decode("utf-8", errors="replace")[:300]
            if e.code == 429:
                _mark_key_429(key_id)
                last_err = f"HTTP 429 on key={key_id}, rotating"
                continue  # try next key
            return {"ok": False, "error": f"HTTP {e.code}: {body_text}", "latency_ms": latency, "key_id": key_id}
        except Exception as e:
            latency = int((time.time() - t0) * 1000)
            last_err = str(e)
            return {"ok": False, "error": last_err, "latency_ms": latency, "key_id": key_id}

    return {"ok": False, "error": f"all keys rate-limited or exhausted: {last_err}", "latency_ms": 0}


def call_ollama(model: str, system: str, user: str, timeout: int = 600, temperature: float = 0.3) -> dict:
    """Returns {ok, output, error, latency_ms}."""
    payload = {
        "model": model,
        "messages": [
            {"role": "system", "content": system},
            {"role": "user", "content": user},
        ],
        "stream": False,
        "options": {"temperature": temperature, "num_ctx": 32768},
    }
    body = json.dumps(payload).encode("utf-8")
    req = urllib.request.Request(OLLAMA_API_URL, data=body, headers={"Content-Type": "application/json"})
    t0 = time.time()
    try:
        with urllib.request.urlopen(req, timeout=timeout) as resp:
            data = json.loads(resp.read().decode("utf-8"))
        latency = int((time.time() - t0) * 1000)
        content = data.get("message", {}).get("content")
        if not content:
            return {"ok": False, "error": "null content", "latency_ms": latency}
        return {"ok": True, "output": content, "latency_ms": latency, "model_used": model}
    except Exception as e:
        latency = int((time.time() - t0) * 1000)
        return {"ok": False, "error": str(e), "latency_ms": latency}


# ── Inline integrity gate ─────────────────────────────────────────────────────
# The size>=1024 byte guard cannot catch the silent failure modes of bulk local
# LLM translation: a long diary truncated to 2KB still passes. These checks
# mirror the CRITICAL tier of diary-translation-audit.py and run on the mandatory
# path — as an integrity-aware skip-guard AND a post-generation gate with retry.
# (REFLEXES #15: 反覆浮現要儀器化 / flywheel diary: 把比對排進必經路徑而非依賴警覺.)
_REFUSAL_RE = re.compile(
    r"\b(I cannot|I can't|I'm unable|I am unable|cannot translate|as an AI|"
    r"I apologize|unable to (?:provide|assist|translate))\b|无法给到|抱歉，我",
    re.I,
)
_FOOTER_RE = re.compile(r"^_[^_].*_\s*$", re.M)
_LEN_LO = {"en": 0.7, "es": 0.8, "fr": 0.8, "ja": 0.45, "ko": 0.5}


def _ends_clean(t: str) -> bool:
    tail = t.rstrip()
    return bool(tail) and (tail[-1] in '.!?。！？」』）)"”_*`>-:🧬' or tail.endswith("---"))


def diary_integrity(src: str, out: str, lang: str) -> tuple[bool, str]:
    """Return (ok, reason). Critical-only — truncation / refusal / content loss."""
    if len(out) < 800 and _REFUSAL_RE.search(out):
        return False, "refusal-stub"
    ratio = len(out) / max(len(src), 1)
    if ratio < _LEN_LO.get(lang, 0.45):
        return False, f"length-low:{ratio:.2f}"
    if len(_FOOTER_RE.findall(src)) >= 1 and len(_FOOTER_RE.findall(out)) == 0:
        return False, "footer-dropped"
    if _ends_clean(src) and not _ends_clean(out):
        return False, "truncation"
    if out.count("```") % 2 != 0:
        return False, "fence-odd"
    return True, "ok"


def _strip_fence(output: str) -> str:
    output = output.strip()
    if output.startswith("```"):
        lines = output.split("\n")
        if lines[0].startswith("```"):
            lines = lines[1:]
        if lines and lines[-1].strip() == "```":
            lines = lines[:-1]
        output = "\n".join(lines)
    return output


def translate_one(diary_filename: str, lang: str, tier: str, max_attempts: int = 3) -> dict:
    """Translate one diary to one lang via specified tier, gated on integrity.

    Existing truncated/refused output is re-translated (not skipped); new output
    is retried with escalating temperature until it passes the integrity gate or
    attempts exhaust. On persistent failure the file is NOT written (left absent
    so a later pass / cloud fallback retries) rather than shipping broken text."""
    src_path = DIARY_ZH / diary_filename
    if not src_path.exists():
        return {"ok": False, "error": f"source not found: {diary_filename}"}
    out_dir = DIARY_ZH / lang
    out_dir.mkdir(exist_ok=True)
    out_path = out_dir / diary_filename
    source = src_path.read_text(encoding="utf-8")

    # integrity-aware skip: keep the existing translation only if it PASSES the
    # gate (a previously-shipped truncated file fails here → gets re-translated)
    if out_path.exists() and out_path.stat().st_size >= 1024:
        ok, _ = diary_integrity(source, out_path.read_text(encoding="utf-8", errors="replace"), lang)
        if ok:
            return {"ok": True, "skipped": True, "reason": "already translated"}

    system, user = build_prompt(lang, source)
    model = TIER_MODELS[tier]
    if model is None:
        # 讓失敗當場說清楚，而不是把 None 送進 payload 換一個看不懂的 400
        return {"ok": False, "reason": f"tier '{tier}' 的模型已下架，見 TIER_MODELS 註解"}

    last_reason = "no attempt"
    for attempt in range(max_attempts):
        temp = 0.3 + 0.2 * attempt  # escalate to escape early-stop truncation
        if tier == "ollama":
            result = call_ollama(model, system, user, temperature=temp)
        else:
            result = call_openrouter(model, system, user, temperature=temp)
        if not result.get("ok"):
            last_reason = result.get("error", "call failed")
            continue
        output = _strip_fence(result["output"])
        ok, reason = diary_integrity(source, output, lang)
        if ok:
            out_path.write_text(output + "\n", encoding="utf-8")
            return {"ok": True, "out_path": str(out_path.relative_to(REPO)),
                    "size": len(output), "tier": tier, "attempts": attempt + 1, **result}
        last_reason = f"integrity:{reason}"

    # all attempts failed the gate — do NOT write broken output
    return {"ok": False, "error": f"integrity-fail x{max_attempts}: {last_reason}"}


def collect_diaries(top: int | None = None) -> list[str]:
    """Return list of diary .md filenames, optionally limited to latest N by mtime."""
    files = sorted(DIARY_ZH.glob("*.md"), key=lambda p: p.stat().st_mtime, reverse=True)
    if top:
        files = files[:top]
    return [f.name for f in files]


def aggregate_status(langs: list[str]) -> dict:
    """Scan output dirs and report what's present/missing."""
    diaries = collect_diaries()
    missing: dict[str, list[str]] = {l: [] for l in langs}
    present: dict[str, int] = {l: 0 for l in langs}
    for diary in diaries:
        for lang in langs:
            target = DIARY_ZH / lang / diary
            if target.exists() and target.stat().st_size >= 1024:
                present[lang] += 1
            else:
                missing[lang].append(diary)
    total = len(diaries) * len(langs)
    present_total = sum(present.values())
    return {
        "total_expected": total,
        "present_total": present_total,
        "present_per_lang": present,
        "missing_per_lang": missing,
        "missing_count": total - present_total,
        "diaries_count": len(diaries),
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--tier", choices=["owl", "ollama"], help="Single-tier dispatch")  # hy3 免費層已下架
    ap.add_argument("--lang", help="Target lang (with --tier --diary)")
    ap.add_argument("--diary", help="Single diary filename")
    ap.add_argument("--batch", action="store_true", help="Batch mode")
    # 2026-09-23：預設語言清單從寫死的五語改成 registry（langs.py，跟 status.py
    # 同一份 SSOT）。寫死的那五個讓 `--status` 一直印「2075/2075 全到齊」，而
    # registry 上的十二語裡有七語一篇日記譯文都沒有——儀器不是算錯，是它被問的
    # 問題就只有五語。babel routine 的 §義務鐵律寫明「語言數以 registry 為準」，
    # 但 2026-07-18 出生戰役那次 python 工具鏈去硬編碼沒走到這支（它不在
    # lang-sync 主線上），於是同一個病在認知層又活了兩個月沒人看見。
    # 2026-10-07：預設改成 DIARY_PROJECTION_LANGS（OBSERVER-QUEUE #77 缺席預設 B：
    # 日記暫定停在五語）。registry 另外七語的缺口仍看得見——`--status` 會多印一行
    # 說明它們是「決定不投影」而不是「漏翻」，`--langs all` 可以量整張 registry。
    ap.add_argument("--langs", default=",".join(DIARY_PROJECTION_LANGS),
                    help="Langs (comma-separated；預設＝DIARY_PROJECTION_LANGS；all＝registry 全語言)")
    ap.add_argument("--top", type=int, help="Limit to latest N diaries by mtime")
    ap.add_argument("--dry-run", action="store_true", help="Show what would be translated")
    ap.add_argument("--status", action="store_true", help="Show present/missing status")
    args = ap.parse_args()

    langs = ALL_TRANSLATION_LANGS if args.langs == "all" else args.langs.split(",")

    if args.status:
        status = aggregate_status(langs)
        print(f"📊 Diary babel status — {status['diaries_count']} diaries × {len(langs)} langs = {status['total_expected']} expected")
        print(f"  ✅ Present: {status['present_total']}/{status['total_expected']}")
        print(f"  ❌ Missing: {status['missing_count']}/{status['total_expected']}")
        print(f"\nPer lang:")
        for lang, count in status["present_per_lang"].items():
            missing = len(status["missing_per_lang"][lang])
            print(f"  {lang}: {count} present, {missing} missing")
        unprojected = [l for l in ALL_TRANSLATION_LANGS if l not in langs]
        if unprojected:
            print(f"\nℹ️  registry 另有 {len(unprojected)} 語不在本次量測範圍（{', '.join(unprojected)}）——"
                  f"預設範圍是 OBSERVER-QUEUE #77 決定的日記投影語言，不是漏翻；`--langs all` 看整張缺口")
        return

    if args.tier and args.lang and args.diary:
        # Single dispatch
        result = translate_one(args.diary, args.lang, args.tier)
        if result.get("skipped"):
            print(f"⊘ {args.lang}/{args.diary}: {result['reason']}")
        elif result["ok"]:
            print(f"✅ {args.lang}/{args.diary} via {args.tier}: {result.get('size', 0)} chars in {result.get('latency_ms', 0)}ms")
        else:
            print(f"❌ {args.lang}/{args.diary} via {args.tier}: {result['error']}")
        return

    if args.batch:
        # 2026-09-23：預設語言清單改吃 registry 後，batch 可能收到還沒寫 prompt
        # 語域的語言（LANG_NAMES 只有五語，`.get(lang, lang)` 會把「vi」當語言名
        # 塞進 system prompt——那是靜默降級，不是翻譯）。缺就當場叫，不要讓它
        # 產出一批沒人會回頭檢查的低規格譯文。
        unnamed = [l for l in langs if l not in LANG_NAMES]
        if unnamed:
            print(f"❌ LANG_NAMES 缺少語域描述：{', '.join(unnamed)}——"
                  f"補上（含敬體／文體慣例）再跑 batch，別讓語言代碼當語言名進 prompt")
            return
        diaries = collect_diaries(top=args.top)
        print(f"📋 Batch mode: {len(diaries)} diaries × {len(langs)} langs = {len(diaries) * len(langs)} translations")
        if args.dry_run:
            for diary in diaries:
                for lang in langs:
                    target = DIARY_ZH / lang / diary
                    state = "✓ exists" if target.exists() and target.stat().st_size >= 1024 else "⏳ pending"
                    print(f"  {lang}/{diary} {state}")
            return

        # Note: actual cascade orchestration is via separate dispatch script
        # This main() is only for single-call testing or status check
        print("Use diary-translate-cascade.sh for full cascade dispatch")
        return

    ap.print_help()


if __name__ == "__main__":
    main()
