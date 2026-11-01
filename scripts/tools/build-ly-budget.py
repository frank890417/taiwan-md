#!/usr/bin/env python3
"""build-ly-budget.py — 把 data/budget/extracted/*.json（一手抓取）＋ data/budget/curated.json（人工策展）
合成 src/data/ly-budget.json（/budget 頁的 build-input SSOT，單位億元）。

用法：python3 scripts/tools/build-ly-budget.py [--check]
--check 只驗算不寫檔。

守則：
- 單位統一億元（千元 ÷ 100,000），一位小數。
- basis 三態 proposed | legal | final 保留在每個 block，不混維度（REFLEXES #38）。
- 機關名 → id 的對照住 curated.json agencies[].keys；對不到的名字 fail-loud。
- 每年機關合計 vs 總額差 > 0.5% 就 fail。
"""
from __future__ import annotations

import argparse
import json
import sys
from datetime import date
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
EXTRACTED = ROOT / "data" / "budget" / "extracted"
CURATED = ROOT / "data" / "budget" / "curated.json"
OUT = ROOT / "src" / "data" / "ly-budget.json"

YI = 100_000.0  # 千元 → 億元


def yi(v):
    if v is None:
        return None
    return round(float(v) / YI, 1)


def load(p: Path):
    with p.open(encoding="utf-8") as f:
        return json.load(f)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    args = ap.parse_args()

    agency_src = load(EXTRACTED / "agency-by-year.json")
    totals_src = load(EXTRACTED / "totals-and-functions.json")
    cur = load(CURATED)

    if not agency_src.get("unit", "").startswith("千元"):
        print("❌ agency-by-year.json 單位不是千元", file=sys.stderr)
        return 2
    if not totals_src.get("unit", "").startswith("千元"):
        print("❌ totals-and-functions.json 單位不是千元", file=sys.stderr)
        return 2

    fys = sorted(set(agency_src["years"]) | set(totals_src["years"]), key=int)
    errors: list[str] = []

    # ── eras lookup
    def era_of(ce: int) -> str | None:
        for e in cur["eras"]:
            if e["from"] <= ce <= e["to"]:
                return e["id"]
        return None

    # ── years（總量）
    years = []
    for fy in fys:
        t = totals_src["years"].get(fy, {})
        ce = int(fy) + 1911
        prop = (t.get("proposed") or {}).get("expenditure")
        legal = (t.get("legal") or {}).get("expenditure")
        cut = (t.get("legal") or {}).get("cut_by_ly")
        final = (t.get("final_account") or {}).get("expenditure")
        rate = (t.get("final_account") or {}).get("execution_rate_pct")
        rev_legal = (t.get("legal") or {}).get("revenue")
        rev_prop = (t.get("proposed") or {}).get("revenue")
        gdp = (t.get("gdp_ratio_pct") or {}).get("value")
        debt = (t.get("debt_outstanding_1yr_plus") or {}).get("amount")
        debt_pct = (t.get("debt_outstanding_1yr_plus") or {}).get("ratio_pct_of_3yr_avg_gdp")
        cut_abs = abs(cut) if cut is not None else (None if (prop is None or legal is None) else prop - legal)
        cut_pct = None
        if cut_abs is not None and prop:
            cut_pct = round(cut_abs / prop * 100, 2)
        supp = (t.get("legal") or {}).get("supplementary")
        supp_pending = t.get("supplementary")
        years.append(
            {
                "fy": int(fy),
                "ce": ce,
                "era": era_of(ce),
                "proposed": yi(prop),
                "legal": yi(legal),
                "cut": yi(cut_abs),
                "cutPct": cut_pct,
                "final": yi(final),
                "execRate": rate,
                # 追加預算已三讀者：執行率的分母 = 法定 + 追加（114 年度 819.4 億）
                **({"legalWithSupp": yi(legal + supp), "supp": yi(supp)} if (supp and legal) else {}),
                # 追加預算案尚在立法院者（115 年度 6,076 億）：只記錄，不併入任何 basis
                **({"suppPending": {"expenditure": yi(supp_pending["expenditure"]), "revenue": yi(supp_pending["revenue"]), "status": supp_pending["status"], "source": supp_pending["source"]}} if supp_pending else {}),
                "revenueLegal": yi(rev_legal),
                "revenueProposed": yi(rev_prop),
                "gdpPct": gdp,
                "debt": yi(debt),
                "debtPct": (round(debt_pct, 1) if isinstance(debt_pct, (int, float)) else None),
                "functionsBasis": (t.get("functions") or {}).get("basis"),
                "agencyBasis": (agency_src["years"].get(fy) or {}).get("basis"),
                "sources": {
                    "proposed": (t.get("proposed") or {}).get("source"),
                    "legal": (t.get("legal") or {}).get("source"),
                    "final": (t.get("final_account") or {}).get("source"),
                    "agencies": (agency_src["years"].get(fy) or {}).get("source"),
                },
            }
        )

    # ── functions（政事別）
    fn_meta = cur["functions"]
    functions_by_year: dict[str, dict[str, float | None]] = {}
    for fy in fys:
        f = (totals_src["years"].get(fy) or {}).get("functions") or {}
        row = {}
        tot = 0.0
        for m in fn_meta:
            v = f.get(m["key"])
            row[m["id"]] = yi(v)
            if isinstance(v, (int, float)):
                tot += v
        functions_by_year[fy] = row
        # 對賬：政事別合計 vs 該 basis 的總額
        basis = f.get("basis")
        ref = None
        t = totals_src["years"].get(fy, {})
        if basis == "final":
            ref = (t.get("final_account") or {}).get("expenditure")
        elif basis == "legal":
            ref = (t.get("legal") or {}).get("expenditure")
        elif basis == "proposed":
            ref = (t.get("proposed") or {}).get("expenditure")
        if ref and tot:
            diff = abs(tot - ref) / ref
            if diff > 0.005:
                errors.append(f"fy{fy} 政事別合計 {tot} vs {basis} 總額 {ref} 差 {diff:.2%}")

    # ── agencies（機關別）
    ag_meta = cur["agencies"]
    key2id: dict[str, str] = {}
    for m in ag_meta:
        for k in m["keys"]:
            key2id[k] = m["id"]
    agencies_by_year: dict[str, dict[str, float]] = {}
    for fy in fys:
        y = agency_src["years"].get(fy)
        if not y:
            continue
        row: dict[str, float] = {}
        tot = 0.0
        for name, v in y["agencies"].items():
            if not isinstance(v, (int, float)):
                continue
            tot += v
            aid = key2id.get(name)
            if aid is None:
                errors.append(f"fy{fy} 機關名未對照：{name}")
                continue
            row[aid] = round(row.get(aid, 0.0) + v / YI, 1)
        agencies_by_year[fy] = row
        # 對賬：機關合計 vs 該年總額（legal 或 proposed）
        basis = y.get("basis")
        t = totals_src["years"].get(fy, {})
        ref = (t.get(basis) or {}).get("expenditure") if basis in ("legal", "proposed") else None
        if ref:
            diff = abs(tot - ref) / ref
            if diff > 0.005:
                errors.append(f"fy{fy} 機關別合計 {tot} vs {basis} 總額 {ref} 差 {diff:.2%}")

    if errors:
        print("❌ 對賬失敗：")
        for e in errors:
            print("   -", e)
        return 1

    out = {
        "meta": {
            "unit": "億元（新臺幣）",
            "generated": date.today().isoformat(),
            "fiscalYears": [int(f) for f in fys],
            "notes": [
                "歲出總額：行政院原列（proposed）／立法院法定（legal）／決算（final）三個 basis 分開存放，圖表標示以 basis 為準。",
                "政事別九類：105-113 年度為決算審定數、114 年度為法定預算數、115 年度為預算案數（主計總處 115 年度總說明參考表 6 同一張時間序列表）；116 年度為 116 年度預算案（主計總處 116 年度預算書，2026-10-22 更新）。116 年度預算書把 115 年度重新分類（見 fy116.restated115），所以 115→116 的政事別增減有一部分是重分類，不是錢真的移動。",
                "機關別：主計總處《中央政府總預算》歲出機關別預算總表「主管別」彙總列；105-114 為法定預算數，115、116 為行政院提案數（115 年度三讀後法定表截至 2026-10-23 仍未上架）。",
                "115 年度歲出法定數 29,869.7 億（原列 30,349.7 億、減列 480 億）；歲入法定數＝預算案 28,622.5 億 + 審議調整 6,020 億，依主計總處 2026-09-03 追加預算新聞稿勾稽。",
                "114 年度決算：審計部審定歲出 29,332.1 億（2026-07-24），執行率分母＝法定 29,249.7 億 + 追加 819.4 億。116 年度預算案尚未三讀，legal／final 為 null。",
                "執行率＝決算數 ÷ 法定預算數（自算）；有追加預算的年度（114）分母含追加預算。",
                "GDP 占比＝中央政府歲出總額 ÷ 當年名目 GDP；債務比＝1 年以上非自償債務 ÷ 前 3 年度 GDP 平均，兩者分母不同。",
            ]
            + list(totals_src.get("notes", []))[:0],
            "sources": cur["sources"],
        },
        "years": years,
        "eras": cur["eras"],
        "functions": [{"id": m["id"], "zh": m["zh"], "en": m["en"]} for m in fn_meta],
        "functionsByYear": functions_by_year,
        "agencies": [
            {k: v for k, v in m.items() if k != "keys"} for m in ag_meta
        ],
        "agenciesByYear": agencies_by_year,
        "defenseNato2026": cur["defense_nato_2026"],
        "defenseNato2027": cur["defense_nato_2027"],
        "fy116": cur["fy116"],
        "specialBudgets": cur["special_budgets"],
        "cuts": cur["cuts"],
        "culture": cur["culture"],
        "events": cur["events"],
        "days": cur["days"],
        "voices": cur["voices"],
    }

    if args.check:
        print("✅ 對賬通過（--check，不寫檔）")
        return 0
    OUT.parent.mkdir(parents=True, exist_ok=True)
    with OUT.open("w", encoding="utf-8") as f:
        json.dump(out, f, ensure_ascii=False, indent=1)
        f.write("\n")
    print(f"✅ 寫入 {OUT.relative_to(ROOT)}（{OUT.stat().st_size // 1024} KB，{len(fys)} 個年度）")
    return 0


if __name__ == "__main__":
    sys.exit(main())
