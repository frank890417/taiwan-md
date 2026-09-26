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
    return {"available": bool(live), "count": len(keys), "live": len(live),
            "dead": dead, "credited": credited,
            "note": "credited = 已儲值帳戶（日配額約 20×free tier）"}


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
        params = _model_params_b(host, model)
        if params is not None and params < _POOL_MIN_PARAMS_B:
            below.append({"model": model, "params_b": params})
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
    cut = (datetime.now().astimezone() - timedelta(days=days)).isoformat()
    kept = defaultdict(lambda: [0, 0])   # model -> [kept, attempts]
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
        except Exception:
            continue
    off = [{"model": m, "kept": k, "attempts": n} for m, (k, n) in sorted(kept.items())
           if not m.startswith(_CLOUD_POOL_OK)]
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
        if zh not in has_slug and not ascii_fallback:
            unslugged.append(zh)
    return {"available": True, "unslugged": unslugged}


def check_codex() -> dict:
    path = shutil.which("codex")
    if not path:
        return {"available": False, "hint": "codex CLI 不在 PATH（訂閱層算力缺席）"}
    r = subprocess.run(["codex", "--version"], capture_output=True, text=True, timeout=20)
    return {"available": r.returncode == 0, "path": path,
            "version": (r.stdout or r.stderr).strip()[:60]}


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
            if o.get("dead"):
                print(f"      ⚠️ 失效：{', '.join(o['dead'])}")
        else:
            print(f"   ❌ OpenRouter  {o.get('hint') or o.get('error')}")
        if ol.get("available"):
            print(f"   ✅ 本機 ollama {ol['count']} 個可翻譯模型 @ {ol['host']}")
            print(f"      {', '.join(ol['models'])}")
        pe = report["pool_eligibility"]
        if pe.get("below_threshold"):
            names = "、".join(f"{b['model']}（{b['params_b']}B）"
                              for b in pe["below_threshold"])
            print(f"   🔴 入池門檻  地端模型低於白名單級別：{names}")
            print(f"      白名單：{pe['whitelist']}（SQUEEZE §入池門檻，哲宇 2026-07-26）")
            print(f"      {pe['note']}——降級換來的產能是負債不是資產")
        # 原本這個 else 接在 below_threshold 上：地端模型全在白名單時會對一台
        # ollama 健康的機器印「❌ 本機 ollama」（2026-09-27 一併改正）
        if not ol.get("available"):
            print(f"   ❌ 本機 ollama {ol.get('hint') or ol.get('error')}")
        cp = report["cloud_pool"]
        if cp.get("off_whitelist"):
            names = "、".join(f"{c['model']}（近兩日落地 {c['kept']}／嘗試 {c['attempts']}）"
                              for c in cp["off_whitelist"])
            print(f"   🔴 入池門檻  雲端 worker 不在白名單：{names}")
            print(f"      雲端白名單：{cp['whitelist']}（付費 Tier 6 另計）")
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
              f"{cx.get('version') or cx.get('hint')}")
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
