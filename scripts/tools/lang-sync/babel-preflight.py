#!/usr/bin/env python3
"""babel-preflight.py — 宿主機算力自檢（任何機器跑 babel 前先照鏡子）。

為什麼存在（2026-07-25）：routine 飛輪遷到專用宿主機之後，
twmd-babel-nightly 在一台跟開發機不同的宿主機上跑。babel 的算力來自四個
互相獨立的來源（OpenRouter key 池／本機 ollama／Tailscale fleet 節點／
codex 訂閱），每一個缺席時 cascade 都會「優雅降級」——也就是**靜默**降級：
沒 key 就只用本機模型，產能剩一半，log 上看起來一切正常。

這正是 2026-07-24 一整天反覆現形的病：靜默失敗比大聲失敗貴得多
（gate 假陽性屠殺好譯文而自報正常、KEYS.md 被當 key 送出、dispatcher 的
`|| true` 吞掉 pre-commit 拒絕）。所以 babel 的入口要有一面鏡子：這台
機器現在有哪些算力、缺哪些、缺的那些會讓產能掉多少，全部說出來。

用法：
  python3 scripts/tools/lang-sync/babel-preflight.py           # 人讀報告
  python3 scripts/tools/lang-sync/babel-preflight.py --json    # 機器可讀
  python3 scripts/tools/lang-sync/babel-preflight.py --strict  # 算力歸零才 exit 1

exit code：0 = 有可用算力（即使部分缺席）；1 = --strict 下算力歸零。
永遠不因「部分缺席」擋下 babel——半條產線好過沒有產線，但缺席必須可見。
"""
from __future__ import annotations

import argparse
import json
import re
import os
import shutil
import socket
import subprocess
import sys
import urllib.error
import urllib.request
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
CREDS = Path.home() / ".config" / "taiwan-md" / "credentials"

sys.path.insert(0, str(Path(__file__).resolve().parent))


def check_openrouter_keys() -> dict:
    """key 池：載入數 + 逐把 auth 探測（值不外洩，只回遮罩與狀態）。"""
    try:
        from backends import openrouter as orb
        keys = list(orb._load_all_keys())
    except Exception as e:
        return {"available": False, "count": 0, "error": f"loader 失敗：{e}"}
    if not keys:
        return {"available": False, "count": 0,
                "hint": f"key 池空。放 sk-or-v1-* 單行檔到 {CREDS}/openrouter-keys/*.key"}
    live, dead, credited = [], [], 0
    with_balance, balance_unknown = 0, 0
    for name, v in keys:
        req = urllib.request.Request(
            "https://openrouter.ai/api/v1/auth/key",
            headers={"Authorization": f"Bearer {v}"})
        try:
            with urllib.request.urlopen(req, timeout=8) as r:
                d = json.loads(r.read())["data"]
                live.append(name)
                if not d.get("is_free_tier"):
                    credited += 1
        except Exception:
            dead.append(name)
            continue
        # 已儲值 ≠ 還有餘額（2026-10-22）：儲值過的帳號解鎖較大的免費日配額，
        # 但付費模型（Tier 6 Haiku 走 OpenRouter）花的是餘額。七把都「已儲值」
        # 的那一夜，七把的餘額其實全是負的，付費層整夜撞 HTTP 402。
        creq = urllib.request.Request(
            "https://openrouter.ai/api/v1/credits",
            headers={"Authorization": f"Bearer {v}"})
        try:
            with urllib.request.urlopen(creq, timeout=8) as r:
                c = json.loads(r.read())["data"]
                left = float(c.get("total_credits") or 0) - float(c.get("total_usage") or 0)
                if left > 0.5:
                    with_balance += 1
        except Exception:
            balance_unknown += 1
    return {"available": bool(live), "count": len(keys), "live": len(live),
            "dead": dead, "credited": credited, "with_balance": with_balance,
            "balance_unknown": balance_unknown,
            "note": "credited = 已儲值帳戶（日配額約 20×free tier）；"
                    "with_balance = 餘額 > $0.5、付費模型還付得出來的帳號"}


def check_ollama() -> dict:
    host = os.environ.get("OLLAMA_HOST", "http://127.0.0.1:11434")
    try:
        with urllib.request.urlopen(f"{host}/api/tags", timeout=5) as r:
            models = [m["name"] for m in json.loads(r.read()).get("models", [])]
    except Exception as e:
        return {"available": False, "host": host, "error": str(e)[:80],
                "hint": "ollama serve 沒起來，或本機沒裝 ollama"}
    # 翻譯用得上的模型（bge-m3 是 embedding 不算）
    usable = [m for m in models if not m.startswith("bge-")
              and "embed" not in m.lower()]
    return {"available": bool(usable), "host": host,
            "models": usable[:8], "count": len(usable)}


def check_fleet() -> dict:
    """Tailscale fleet 節點可達性（registry 由 muse-bot fleet 維護，跨 repo 只讀）。"""
    reg = Path.home() / "Projects" / "muse-bot" / "fleet" / "registry.json"
    if not reg.exists():
        return {"available": False, "reason": "fleet registry 不在本機（非指揮部機器，正常）"}
    try:
        machines = json.loads(reg.read_text(encoding="utf-8")).get("machines", [])
    except Exception as e:
        return {"available": False, "error": str(e)[:80]}
    reachable = []
    for m in machines:
        hostip = m.get("tailscale_ip") or m.get("host")
        if not hostip or m.get("retired"):
            continue
        url = f"http://{hostip}:11434"
        try:
            with urllib.request.urlopen(f"{url}/api/tags", timeout=4):
                reachable.append(m.get("id", hostip))
        except Exception:
            pass
    return {"available": bool(reachable), "reachable": reachable,
            "total_registered": len(machines)}


# SQUEEZE §入池門檻（哲宇 2026-07-26 directive）的白名單。放這裡不是要在本檔
# 重新定義判準，是要讓 Stage 0 問得出「今天派工的模型在不在名單上」——名單的
# 理由住 pipeline：閘門擋得住結構錯誤與整段沒翻，擋不住「每句都翻了但讀起來
# 不對」，而那種債會落地成讀者看到的內容且不會有人回報。
POOL_WHITELIST_HINT = "nemotron-3-ultra-550b / gemma4:26b 以上 / gpt-oss-120b / qwen3.6:35b"
_POOL_MIN_PARAMS_B = 26.0
# 白名單上明寫名字的地端模型（與 fleet `_BATCH_MODEL_PROFILES["babel"]` 同一份名單）。
# 參數量門檻是給「名字看不出級別」的模型用的；名單上點名的模型以名字為準——
# gemma4:26b 實測 25.2B，2026-10-11 之前每晚被這支印成「低於白名單級別」，
# 而 fleet 照名單核發它，兩把尺對同一個模型給相反答案（REFLEXES #83）。
_POOL_NAMED = ("gemma4:31b", "gemma4:26b", "qwen3.6:35b", "gpt-oss:120b")


def _model_params_b(host: str, model: str) -> float | None:
    """問 ollama 這個模型幾 B。名字看不出級別——`gemma4:e4b-nvfp4` 讀起來像
    gemma4 家族（白名單有 gemma4:26b），實際是 8.1B，比明確被排除的
    gemma4:12b 還小。所以判級別要問參數量，不要解析名字。"""
    try:
        req = urllib.request.Request(
            f"{host}/api/show", data=json.dumps({"model": model}).encode(),
            headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req, timeout=5) as r:
            info = json.loads(r.read())
    except Exception:
        return None
    n = (info.get("model_info") or {}).get("general.parameter_count")
    if isinstance(n, (int, float)) and n > 0:
        return round(n / 1e9, 1)
    size = (info.get("details") or {}).get("parameter_size") or ""
    m = re.match(r"([\d.]+)\s*B", str(size), re.I)
    return float(m.group(1)) if m else None


def _fleet_issued_models() -> set[str] | None:
    """fleet 用 `--profile babel` 實際核發的地端模型；問不到回 None（不謊報）。"""
    fleetctl = Path.home() / "Projects/muse-bot/fleet/fleetctl"
    if not fleetctl.exists():
        return None
    try:
        r = subprocess.run([str(fleetctl), "workers", "--service", "llm", "--profile", "babel",
                            "--format", "babel"], capture_output=True, text=True, timeout=30)
    except Exception:
        return None
    if r.returncode != 0:
        return None
    return set(re.findall(r"=ollama:([^@\s]+)@", r.stdout))


def check_pool_eligibility(ollama_report: dict) -> dict:
    """地端模型級別對白名單。2026-09-23 誕生：fleet 有一道 `--profile babel`
    的核發閘（無合格模型就回 0 個 worker，讓地端 lane 停而不是降級），但產線
    實際跑的是 `--format babel`——**同一支指令的另一個旗標，不套白名單**。
    於是 mac-m4max 用 8.1B 的 gemma4:e4b-nvfp4 連續翻了兩天（一夜 398 次嘗試
    裡 66% 出自它），而每一份報表都是綠的。閘門存在、會動、沒有人呼叫它。"""
    if not ollama_report.get("available"):
        return {"checked": False, "reason": "本機沒有可用 ollama 模型"}
    host = ollama_report["host"]
    below = []
    for model in ollama_report.get("models", []):
        if any(model == n or model.startswith(n + "-") for n in _POOL_NAMED):
            continue
        params = _model_params_b(host, model)
        if params is not None and params < _POOL_MIN_PARAMS_B:
            below.append({"model": model, "params_b": params})
    # 裝著不等於在派工：wrapper 走 `--profile babel` 之後，名單外模型只是留在 ollama 裡，
    # 只有被 fleet 核發出去的才是產線上的問題。
    issued = _fleet_issued_models()
    for b in below:
        b["issued"] = None if issued is None else (b["model"] in issued)
    return {"checked": True, "below_threshold": below,
            "whitelist": POOL_WHITELIST_HINT,
            "note": "fleet 的 `--profile babel` 會擋下這些；`--format babel` 不會"}


# 雲端免費池在白名單上的模型（前綴比對 OpenRouter model id）。付費 Tier 6
# 的 anthropic/* 另有授權（OBSERVER-QUEUE #18／#79），不在這張表管。
_CLOUD_POOL_OK = ("nvidia/nemotron-3-ultra-550b", "openai/gpt-oss-120b")
_CLOUD_SANCTIONED = ("anthropic/",)


def check_cloud_pool(days: int = 2) -> dict:
    """雲端 worker 的模型對白名單。2026-09-27 誕生：上面那支只量地端 ollama，
    於是 `poolside/laguna-s-2.1:free` 09-21 起六天落地 465 份譯文，入池門檻從沒亮過燈；
    對讀抓到 ko〈台灣棒球文化〉整篇把棒球寫成「총구」（槍口）、ko〈客家飲食〉
    客家寫成「카즈」，閘門全綠。量的是 report.jsonl 裡真的產出過的 backend，
    不是設定檔寫了什麼——出現在實績裡才算在派工。"""
    import glob
    from collections import defaultdict
    from datetime import datetime, timedelta
    now = datetime.now().astimezone()
    cut = (now - timedelta(days=days)).isoformat()
    kept = defaultdict(lambda: [0, 0])   # model -> [kept, attempts]
    last = {}                            # model -> 最後一筆 ts
    for rp in glob.glob("/tmp/babel-unified-2*/report.jsonl"):
        try:
            for line in open(rp, encoding="utf-8"):
                try:
                    r = json.loads(line)
                except Exception:
                    continue
                if r.get("ts", "") < cut or r.get("event") or "ok" not in r:
                    continue
                b = r.get("backend") or ""
                if not b.startswith("openrouter:"):
                    continue
                model = b.split(":", 1)[1]
                if model.startswith(_CLOUD_SANCTIONED):
                    continue
                kept[model][1] += 1
                if r.get("ok"):
                    kept[model][0] += 1
                last[model] = max(last.get(model, ""), r.get("ts", ""))
        except Exception:
            continue
    # 兩日實績窗會在模型退出產線後繼續亮紅燈兩天：2026-10-12 夜班看到 laguna
    # 「不在白名單」，而它 10-10 22:40 就從 worker 清單拿掉了，活著的 dispatcher
    # 指令行裡沒有它。「近兩日產出過」跟「現在還在派工」是兩件事（REFLEXES #38），
    # 所以再對一次活著的 dispatcher 指令行，加最後一筆的時間，分開印。
    live_args = ""
    try:
        # 只認「python 正在執行 babel-dispatch.py」的那一行；任何指令行只要提到這個
        # 檔名就算進來的話，連查詢它的 shell 都會被當成產線（首版自己就這樣誤判）
        live_args = "\n".join(l for l in subprocess.run(
            ["ps", "-eo", "command"], capture_output=True, text=True, timeout=10
        ).stdout.splitlines()
            if re.match(r"\S*python[\d.]*\s+\S*babel-dispatch\.py\b", l))
    except Exception:
        pass
    recent = (now - timedelta(hours=2)).isoformat()
    off = [{"model": m, "kept": k, "attempts": n, "last": last.get(m, ""),
            "live": (f"openrouter:{m}" in live_args) or last.get(m, "") >= recent}
           for m, (k, n) in sorted(kept.items()) if not m.startswith(_CLOUD_POOL_OK)]
    return {"off_whitelist": off, "whitelist": ", ".join(_CLOUD_POOL_OK)}


def check_track_record(days: int = 2) -> dict:
    """歷史產出品質——端點活著不等於產得出可用的東西。

    2026-07-26 新增。此前 preflight 的 healthy 只證明「端點回得了訊息」：
    l4090 那台機器活著、ollama 有回應、preflight 全綠，而它翻葡萄牙語
    0/28、印尼語 1/20——每一次呼叫都花完整的 GPU 時間翻出必被擋下的成品。
    存活訊號與生產訊號是兩件事（今日同型第五例），算力自檢必須看實績。

    來源：各 run dir 的 report.jsonl（worker × lang 通過率）。
    """
    import glob
    from collections import defaultdict
    from datetime import datetime, timedelta
    cut = (datetime.now().astimezone() - timedelta(days=days)).isoformat()
    grid = defaultdict(lambda: [0, 0])
    worker_total = defaultdict(lambda: [0, 0])
    for rp in glob.glob("/tmp/babel-unified-2*/report.jsonl"):
        try:
            for line in open(rp, encoding="utf-8"):
                try:
                    r = json.loads(line)
                except Exception:
                    continue
                if r.get("ts", "") < cut:
                    continue
                if r.get("event") or "ok" not in r:
                    # cascade_exhausted / cap_reached 等事件列不是嘗試——2026-09-20 前
                    # 這裡把 26 筆 exhausted 事件當成 worker「?」的 26 次失敗印出
                    # 「? × en = 0%」（babel-weak-lanes.py 早有同一條豁免，兩處判準對齊）
                    continue
                worker = r.get("worker", "?")
                # 同一個 fleet label 會隨 workload profile 換模型；只按 label 聚合
                # 會把舊 12b 與新 32b 的實績混成一條，讓「切軌或換模型」失去依據。
                # 舊報表沒有 backend 欄時保留原 key，從本版起按實際 backend 分流。
                backend = r.get("backend")
                worker_key = f"{worker}[{backend}]" if backend else worker
                bucket = 0 if r.get("ok") else 1
                grid[(worker_key, r.get("lang", "?"))][bucket] += 1
                worker_total[worker_key][bucket] += 1
        except Exception:
            continue
    weak = []
    for (w, lang), (ok, fail) in sorted(grid.items()):
        n = ok + fail
        if n >= 8 and ok / n < 0.15:
            weak.append({"worker": w, "lang": lang, "pass_pct": round(ok / n * 100), "n": n})
    # 多語 lane 會把同一模型的失敗拆成數個小格。只看 worker × lang 時，
    # 四語模型即使已整體 0/8，每格仍只有 2 筆，要燒到最多 32 次才會警示。
    # 另列跨語總體實績，逐語表仍保留給切軌判斷。
    for w, (ok, fail) in sorted(worker_total.items()):
        n = ok + fail
        if n >= 8 and ok / n < 0.15:
            weak.append({"worker": w, "lang": "all", "pass_pct": round(ok / n * 100), "n": n})
    return {"samples": sum(ok + fail for ok, fail in grid.values()),
            "weak_pairs": weak,
            "note": "通過率 <15%（n≥8）的 worker×語言組合——切軌或換模型，"
                    "不要靠加大重試（同一個弱適配再燒一次算力）" if weak else "無明顯弱適配"}


def check_slug_registration() -> dict:
    """純中文檔名、還沒有任何語言譯文、也沒登記在 `_slug-map.json` 的母稿。

    為什麼放在 preflight（2026-09-25）：這種文章 prepare-batch 的 ASCII fallback
    只吐得出空字串（TBD-NEEDS-SLUG），dispatcher 十二語同時跳過，每輪在 master.log
    印一行警告而已。09-13（46 篇）、09-14（150 篇）、09-25（金鐘獎／油價機制／
    誰算低薪，卡六天、警告印了 133 次）三次都是當班碰巧翻 log 才發現。preflight 是
    每一班 babel 的第一個指令，缺口放在這裡就不必靠碰巧。判準照抄
    `babel-dispatch.build_slug_map` 與 `prepare-batch` 的 fallback，不另訂一套。
    """
    knowledge = REPO / "knowledge"
    try:
        from langs import ALL_TRANSLATION_LANGS
        trans = json.loads((knowledge / "_translations.json").read_text(encoding="utf-8"))
        curated = json.loads((knowledge / "_slug-map.json").read_text(encoding="utf-8"))
    except Exception as e:  # noqa: BLE001 — 自檢工具不因讀檔失敗中斷
        return {"available": False, "error": str(e)}
    has_slug = {z for k, z in trans.items() if "TBD-NEEDS-SLUG" not in k} | set(curated)
    unslugged = []
    for p in sorted(knowledge.glob("*/*.md")):
        cat = p.parent.name
        if cat in ALL_TRANSLATION_LANGS or cat.startswith("_") or p.name.startswith("_"):
            continue
        zh = f"{cat}/{p.name}"
        stem = p.stem.lower().replace(" ", "-")
        ascii_fallback = "".join(c for c in stem if c.isascii() and (c.isalnum() or c == "-"))
        # 有字被刪掉就不算 slug（2026-10-01，與 prepare-batch 同步）：「309本里長帳簿」
        # 刪剩 "309" 非空，舊判準當它合格，十語落成 309.md
        if zh not in has_slug and ascii_fallback != stem:
            unslugged.append(zh)
    return {"available": True, "unslugged": unslugged}


def check_codex() -> dict:
    path = shutil.which("codex")
    if not path:
        return {"available": False, "hint": "codex CLI 不在 PATH（訂閱層算力缺席）"}
    r = subprocess.run(["codex", "--version"], capture_output=True, text=True, timeout=20)
    version = (r.stdout or r.stderr).strip()[:60]
    if r.returncode != 0:
        return {"available": False, "path": path, "version": version}
    # 版本號跟 `codex login status` 都量不到登入有沒有過期（2026-10-26 babel-nightly：
    # 兩者都說正常，實際每次 exec 都 401「access token could not be refreshed」，
    # 整夜的 Tier 1 掉到 nemotron 而判定照印 healthy）。這裡用 backend 同一條
    # `codex exec` 路徑打一句極短的請求，量的是「這一層今晚翻不翻得動」。
    try:
        p = subprocess.run(["codex", "exec", "--skip-git-repo-check", "Reply with exactly: OK"],
                           stdin=subprocess.DEVNULL, capture_output=True, text=True, timeout=120)
    except subprocess.TimeoutExpired:
        return {"available": False, "path": path, "version": version,
                "hint": f"{version}，但試打一句 120 秒沒回（訂閱層算力缺席）"}
    if p.returncode != 0:
        err = p.stdout + p.stderr
        if "401" in err or "sign in again" in err or "refreshed" in err:
            why = "登入過期，要在這台機器重新 `codex login`（身份授權層，只有哲宇能補）"
        else:
            why = f"試打一句 exit={p.returncode}"
        return {"available": False, "path": path, "version": version,
                "hint": f"{version}，但{why}"}
    return {"available": True, "path": path, "version": version}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--json", action="store_true")
    ap.add_argument("--strict", action="store_true")
    args = ap.parse_args()

    report = {
        "host": socket.gethostname(),
        "repo": str(REPO),
        "openrouter": check_openrouter_keys(),
        "ollama": check_ollama(),
        "fleet": check_fleet(),
        "codex": check_codex(),
        "track_record": check_track_record(),
        "slug_registration": check_slug_registration(),
    }
    report["pool_eligibility"] = check_pool_eligibility(report["ollama"])
    report["cloud_pool"] = check_cloud_pool()
    tiers_up = sum(1 for k in ("openrouter", "ollama", "fleet", "codex")
                   if report[k].get("available"))
    report["tiers_available"] = tiers_up
    report["verdict"] = ("no-compute" if tiers_up == 0
                         else ("degraded" if tiers_up < 2 else "healthy"))

    if args.json:
        print(json.dumps(report, ensure_ascii=False, indent=1))
    else:
        o, ol, fl, cx = (report["openrouter"], report["ollama"],
                         report["fleet"], report["codex"])
        print(f"🗼 babel 宿主機算力自檢 — {report['host']}")
        print(f"   判定：{report['verdict']}（{tiers_up}/4 層可用）\n")
        if o.get("available"):
            print(f"   ✅ OpenRouter  {o['live']}/{o['count']} 把 key 通過，"
                  f"其中 {o['credited']} 把已儲值")
            if o.get("with_balance", 0) == 0 and not o.get("balance_unknown"):
                print("      ⚠️ 付費餘額：每把都已花完——免費模型照跑，付費層（Tier 6 Haiku）"
                      "會整夜撞 HTTP 402；儲值是經費決定")
            else:
                print(f"      付費餘額：{o.get('with_balance', 0)} 把還有餘額"
                      + (f"（{o['balance_unknown']} 把查不到）" if o.get("balance_unknown") else ""))
            if o.get("dead"):
                print(f"      ⚠️ 失效：{', '.join(o['dead'])}")
        else:
            print(f"   ❌ OpenRouter  {o.get('hint') or o.get('error')}")
        if ol.get("available"):
            print(f"   ✅ 本機 ollama {ol['count']} 個可翻譯模型 @ {ol['host']}")
            print(f"      {', '.join(ol['models'])}")
        pe = report["pool_eligibility"]
        live = [b for b in pe.get("below_threshold", []) if b.get("issued") is not False]
        idle = [b for b in pe.get("below_threshold", []) if b.get("issued") is False]
        if live:
            names = "、".join(f"{b['model']}（{b['params_b']}B"
                              + ("，fleet 核發中" if b.get("issued") else "，核發狀態查不到")
                              + "）" for b in live)
            print(f"   🔴 入池門檻  地端模型低於白名單級別：{names}")
            print(f"      白名單：{pe['whitelist']}（SQUEEZE §入池門檻，哲宇 2026-07-26）")
            print(f"      {pe['note']}——降級換來的產能是負債不是資產")
        if idle:
            names = "、".join(f"{b['model']}（{b['params_b']}B）" for b in idle)
            print(f"   ℹ️ 入池門檻  名單外模型仍裝在本機、fleet 沒有核發：{names}")
        # 原本這個 else 接在 below_threshold 上：地端模型全在白名單時會對一台
        # ollama 健康的機器印「❌ 本機 ollama」（2026-09-27 一併改正）
        if not ol.get("available"):
            print(f"   ❌ 本機 ollama {ol.get('hint') or ol.get('error')}")
        cp = report["cloud_pool"]
        live_off = [c for c in cp.get("off_whitelist", []) if c.get("live", True)]
        gone_off = [c for c in cp.get("off_whitelist", []) if not c.get("live", True)]
        if live_off:
            names = "、".join(f"{c['model']}（近兩日落地 {c['kept']}／嘗試 {c['attempts']}）"
                              for c in live_off)
            print(f"   🔴 入池門檻  雲端 worker 不在白名單：{names}")
            print(f"      雲端白名單：{cp['whitelist']}（付費 Tier 6 另計）")
        if gone_off:
            names = "、".join(f"{c['model']}（近兩日落地 {c['kept']}，最後一筆 {c['last'][:16]}）"
                              for c in gone_off)
            print(f"   ℹ️ 入池門檻  名單外雲端模型已不在現役 dispatcher：{names}")
            print(f"      這兩日落地的譯文仍是存量，處置見 OBSERVER-QUEUE #91")
        if fl.get("available"):
            print(f"   ✅ fleet 節點  {len(fl['reachable'])} 台可達："
                  f"{', '.join(fl['reachable'])}")
        else:
            print(f"   ➖ fleet 節點  {fl.get('reason') or '全部不可達'}")
        tr = report["track_record"]
        if tr.get("weak_pairs"):
            print(f"   ⚠️ 實績檢查  {len(tr['weak_pairs'])} 個弱適配組合"
                  f"（近兩日 {tr['samples']} 筆）：")
            for wp in tr["weak_pairs"][:6]:
                print(f"      {wp['worker']} × {wp['lang']} = {wp['pass_pct']}%（n={wp['n']}）")
            print(f"      → {tr['note']}")
        elif tr.get("samples"):
            print(f"   ✅ 實績檢查  近兩日 {tr['samples']} 筆，無明顯弱適配")
        print(f"   {'✅' if cx.get('available') else '➖'} codex      "
              f"{cx.get('hint') or cx.get('version')}")
        sr = report["slug_registration"]
        if sr.get("unslugged"):
            n = len(sr["unslugged"])
            print(f"   ⚠️ 缺 slug    {n} 篇新母稿沒有 slug，十二語都排不進佇列："
                  + "、".join(sr["unslugged"][:3]) + ("…" if n > 3 else ""))
            print("      → slug-suggest.py 產生後人工核對，合進 knowledge/_slug-map.json"
                  "（dispatcher 每輪重讀，不必重啟）")
        elif sr.get("available"):
            print("   ✅ slug 登記  每篇母稿都排得進佇列")
        if report["verdict"] != "healthy":
            print("\n   ⚠️ 算力層缺席會讓 babel 靜默降級（產能掉但 log 看起來正常）。"
                  "\n      缺 key → 只跑本機模型；缺 ollama → 只跑雲端且無主權捕手。")

    if args.strict and tiers_up == 0:
        print("\n🔴 --strict：這台機器沒有任何可用算力，babel 不該起跑。", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
