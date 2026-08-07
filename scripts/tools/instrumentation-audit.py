#!/usr/bin/env python3
"""
instrumentation-audit.py — GA4 event-param ↔ custom-dimension 漂移偵測器（免疫 Layer 1）

防的 bug class：「instrumentation code 送什麼 param」跟「GA4 註冊了哪些 custom dim」是兩個
分離的真相，由兩個不同流程維護（改 code vs 點 GA4 Admin / 跑 register script），漂移是靜默的。
2026-05-29 D+2 watch 一次抓到三個 instance：
  - pct: dim 註冊了但 code 送 depth_pct（名字對不上 → attribution 全 not-set）
  - link_url: code 送了但從沒註冊（→ query 端瞎掉）
  - failed_path: page_404 送了但從沒註冊（→ fetch-ga4 query 一直 try/except 吞掉）

把 code 當 SSOT（跟「knowledge/ 才是 SSOT」同一條原則往 instrumentation 層延伸），三方對齊：
  (1) code 實際 fire 的 param  — 解析 tracker 原始碼
  (2) register script 宣告的 SSOT — register-ga4-custom-dimensions.py 的 *_DIMENSIONS list
  (3) GA4 live 註冊的 dim       — Admin API list（需 creds）

兩種 mode：
  --static  純靜態（不需 creds，CI 可跑）：code params ↔ SSOT
  --live    需 creds：SSOT ↔ GA4 Admin live dims
  （無 flag）有 creds 跑兩者，無 creds 只跑 static

exit code：有 ERROR → 1（CI gate），只有 WARN → 0。

用法:
    python3 scripts/tools/instrumentation-audit.py [--static | --live] [--json]
"""
import argparse
import importlib.util
import os
import re
import sys
from pathlib import Path

# Windows cp950 console 強制 UTF-8（不影響 Linux/macOS）
if sys.stdout.encoding and sys.stdout.encoding.lower() not in ("utf-8", "utf8"):
    sys.stdout.reconfigure(encoding="utf-8")
    sys.stderr.reconfigure(encoding="utf-8")

# Re-exec in venv if present (so --live 的 google import 能用)。CI 沒 venv → 留在 system
# python 跑 --static（純 stdlib）。必須在 google import 前，且只在直接執行時。
VENV_DIR = Path.home() / ".config" / "taiwan-md" / "venv"
if VENV_DIR.exists() and sys.prefix != str(VENV_DIR):
    _venv_py = VENV_DIR / "bin" / "python3"
    if _venv_py.exists() and __name__ == "__main__":
        os.execv(str(_venv_py), [str(_venv_py), __file__, *sys.argv[1:]])

REPO = Path(__file__).resolve().parents[2]
REGISTER_SCRIPT = REPO / "scripts" / "tools" / "register-ga4-custom-dimensions.py"

# tracker 原始檔 — 任何 _fire() / gtag('event', ...) 埋點的檔案都要列在這
TRACKER_FILES = [
    REPO / "src" / "components" / "EventTracker.astro",
    REPO / "src" / "layouts" / "Layout.astro",
    REPO / "src" / "pages" / "404.astro",
    REPO / "src" / "templates" / "soundscape.template.astro",
]

# 故意不註冊成 custom dimension 的 param（例：純 debug、或 GA 內建已涵蓋）。
# 空 = 所有 fire 的 param 都該有 dim。加進來的每一項都要附理由。
IGNORE_PARAMS = set()


# ── 1. 解析 code：抽出每個 event 實際 fire 的 param keys ────────────────────
def _balanced_object(text, start):
    """從 text[start] 的 '{' 開始，回傳到 matching '}' 的 substring（含兩端 brace）。"""
    depth = 0
    for i in range(start, len(text)):
        c = text[i]
        if c == "{":
            depth += 1
        elif c == "}":
            depth -= 1
            if depth == 0:
                return text[start : i + 1]
    return text[start:]


def _top_level_keys(obj_str):
    """抽出 object literal depth-1 的 key 名（避開 nested object + ternary 的 colon）。"""
    keys = []
    depth = 0
    expect_key = False  # 剛遇到 depth-1 的 { 或 , → 下一個 token 可能是 key
    i = 0
    while i < len(obj_str):
        c = obj_str[i]
        if c in "{[(":
            depth += 1
            if c == "{" and depth == 1:
                expect_key = True
            i += 1
            continue
        if c in "}])":
            depth -= 1
            i += 1
            continue
        if depth == 1 and c == ",":
            expect_key = True
            i += 1
            continue
        if depth == 1 and expect_key:
            m = re.match(r"\s*(\w+)\s*:", obj_str[i:])
            if m:
                keys.append(m.group(1))
                i += m.end()
                expect_key = False
                continue
            if obj_str[i].isspace():
                i += 1
                continue
            expect_key = False
        i += 1
    return keys


def parse_fired_events(files):
    """回傳 {event_name: set(params)}，掃所有 _fire(...) 與 gtag('event', ...) 呼叫。"""
    events = {}
    # 兩種呼叫起點：_fire(  /  gtag('event',  /  gtag("event",
    call_re = re.compile(r"(_fire\s*\(|gtag\s*\(\s*['\"]event['\"]\s*,)")
    str_re = re.compile(r"""['"]([A-Za-z0-9_]+)['"]""")
    # wrapper-injected params：`params.X = ...`（如 EventTracker._fire 把 page_type
    # 注進每一個 event）— call-site object literal 看不到，但每個 event 都帶。
    inject_re = re.compile(r"params\.(\w+)\s*=(?!=)")
    injected = set()
    for f in files:
        if not f.exists():
            print(f"⚠️  tracker not found: {f}", file=sys.stderr)
            continue
        text = f.read_text(encoding="utf-8")
        injected.update(inject_re.findall(text))
        for m in call_re.finditer(text):
            call_start = m.start()
            brace = text.find("{", m.end())
            if brace == -1:
                continue
            # event 名 = call 起點到 object brace 之間的 string literal（去掉 'event'）
            head = text[m.end() : brace]
            names = [s for s in str_re.findall(head) if s != "event"]
            if not names:
                continue
            obj = _balanced_object(text, brace)
            keys = set(_top_level_keys(obj))
            for name in names:
                events.setdefault(name, set()).update(keys)
    # apply wrapper-injected params to every fired event
    for name in events:
        events[name].update(injected)
    return events


# ── 2. 載入 register script 宣告的 SSOT ────────────────────────────────────
def load_ssot():
    spec = importlib.util.spec_from_file_location("register_dims", REGISTER_SCRIPT)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)  # 安全：google import 在 main() 內、re-exec guard 看 __main__
    declared = {p for (p, _n, _d) in mod.DIMENSIONS}
    deprecated = set(getattr(mod, "DEPRECATED_DIMENSIONS", []))
    return declared, deprecated


# ── 3. GA4 live dims（需 creds）─────────────────────────────────────────────
def load_live_dims():
    from google.analytics.admin_v1beta import AnalyticsAdminServiceClient
    from google.oauth2 import service_account

    cred_dir = Path.home() / ".config" / "taiwan-md" / "credentials"
    pid = None
    for line in (cred_dir / ".env").read_text(encoding="utf-8").splitlines():
        if line.startswith("GA4_PROPERTY_ID="):
            pid = line.split("=", 1)[1].strip().strip("\"'")
    creds = service_account.Credentials.from_service_account_file(
        str(cred_dir / "google-service-account.json"),
        scopes=["https://www.googleapis.com/auth/analytics.edit"],
    )
    client = AnalyticsAdminServiceClient(credentials=creds)
    return {cd.parameter_name for cd in client.list_custom_dimensions(parent=f"properties/{pid}")}


def creds_available():
    cred_dir = Path.home() / ".config" / "taiwan-md" / "credentials"
    return (cred_dir / "google-service-account.json").exists() and (cred_dir / ".env").exists()


# ── 4. 對齊邏輯 ─────────────────────────────────────────────────────────────
def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--static", action="store_true", help="只跑 code↔SSOT（不需 creds，CI 用）")
    ap.add_argument("--live", action="store_true", help="只跑 SSOT↔GA4 live（需 creds）")
    ap.add_argument("--json", action="store_true", help="輸出 JSON")
    args = ap.parse_args()

    run_static = args.static or not args.live
    run_live = args.live or (not args.static and creds_available())

    events = parse_fired_events(TRACKER_FILES)
    fired = set().union(*events.values()) if events else set()
    declared, deprecated = load_ssot()

    errors, warns, info = [], [], []
    info.append(f"events fired: {len(events)} / distinct params: {len(fired)} / SSOT declared: {len(declared)}")

    if run_static:
        # code 送了但 SSOT 沒宣告（且不在 ignore/deprecated）→ query 端會瞎（link_url / failed_path class）
        fired_undeclared = fired - declared - IGNORE_PARAMS - deprecated
        for p in sorted(fired_undeclared):
            evs = sorted(e for e, ps in events.items() if p in ps)
            errors.append(f"[code↔SSOT] param `{p}` 被 fire（{', '.join(evs)}）但 register script SSOT 沒宣告 → 加進對應 *_DIMENSIONS")
        # SSOT 宣告了但沒任何 event fire（且非 deprecated）→ 可能死 dim（pct class）
        declared_unfired = declared - fired - deprecated
        for p in sorted(declared_unfired):
            warns.append(f"[code↔SSOT] dim `{p}` 在 SSOT 但沒任何 event fire → 可能已死，考慮加進 DEPRECATED_DIMENSIONS")

    if run_live:
        try:
            live = load_live_dims()
            info.append(f"GA4 live dims: {len(live)}")
            # SSOT 宣告了但 GA4 沒註冊 → 跑 register script
            declared_not_live = declared - live
            for p in sorted(declared_not_live):
                errors.append(f"[SSOT↔GA4] `{p}` 在 SSOT 但 GA4 沒註冊 → 跑 register-ga4-custom-dimensions.py")
            # GA4 註冊了但 SSOT 沒宣告（非 deprecated）→ 手動註冊沒 codify（5/27 class）
            live_undeclared = live - declared - deprecated
            for p in sorted(live_undeclared):
                warns.append(f"[SSOT↔GA4] GA4 有 `{p}` 但 SSOT 沒宣告 → 手動註冊未 codify，加進 *_DIMENSIONS")
            # deprecated 還活在 GA4 → 該 archive
            still_live_dep = (deprecated & live)
            for p in sorted(still_live_dep):
                warns.append(f"[SSOT↔GA4] deprecated `{p}` 還在 GA4 live → 跑 register script archive")
        except Exception as e:  # noqa: BLE001
            warns.append(f"[SSOT↔GA4] live check skipped: {type(e).__name__}: {e}")

    if args.json:
        import json
        print(json.dumps({"errors": errors, "warns": warns, "info": info,
                          "events": {k: sorted(v) for k, v in events.items()}},
                         ensure_ascii=False, indent=2))
    else:
        print("🔬 instrumentation-audit — GA4 event-param ↔ custom-dim 對齊")
        for line in info:
            print(f"   ℹ️  {line}")
        print(f"   mode: static={'on' if run_static else 'off'} live={'on' if run_live else 'off'}")
        for w in warns:
            print(f"   ⚠️  {w}")
        for e in errors:
            print(f"   ❌ {e}")
        if not errors and not warns:
            print("   ✅ code ↔ SSOT ↔ GA4 三方對齊，無漂移")
        elif not errors:
            print(f"   ✅ 無 ERROR（{len(warns)} warn — 非阻斷）")

    sys.exit(1 if errors else 0)


if __name__ == "__main__":
    main()
