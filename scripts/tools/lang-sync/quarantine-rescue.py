#!/usr/bin/env python3
"""quarantine-rescue.py — 修好一把尺之後，把被它誤擋進隔離區的譯文撈回來重驗。

為什麼要這支（2026-09-26）：同一天做了兩次同一件事。日文標籤閘門的 60% 門檻修好後，
隔離區裡 13 篇 ja 缺稿 9 篇其實早就譯好了；腳註交叉引用的還原規則修好後，付費 Haiku
譯完卻被退件的 8 篇（含 106KB〈台灣新冠疫情與疫苗〉五語）也還在隔離區。重跑一次就是
再花一次錢、再排一次隊，而譯文本身沒有問題。渦流 v1.60 定下規則：修掉一個誤判家族的
當輪，就按 fail_reason 撈該家族的隔離樣本重驗。這支把那套手工步驟串起來。

判準刻意保守：
  · 只收「缺稿」（目標檔不存在）——覆蓋一篇已上線的譯文要人決定，這支不做
  · 樣本的 sourceCommitSha 必須還是 zh 原文目前的版本，舊版原文的譯文收回來也是 stale
  · 用 babel-dispatch 自己的 verify_one 重驗（同一把尺），不過就刪掉複本，不留半成品
  · 呼叫端先把這批 (lang, zh) 寫進 babel-exclude-claims.tsv，避免 dispatcher 同時動同一篇

用法：
  python3 quarantine-rescue.py --run-dir /tmp/babel-unified-XXXX --reason 'tags not identical'
  python3 quarantine-rescue.py --run-dir ... --reason 'armor placeholder' --repair crossref --apply
輸出：乾跑列出候選；--apply 時把通過的檔案路徑印在最後，一行一個，給呼叫端 git add。
"""
from __future__ import annotations

import argparse
import importlib.util
import json
import re
import shutil
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).resolve().parents[3]
LANG_SYNC = Path(__file__).resolve().parent
QUARANTINE = REPO / ".babel-quarantine" / "knowledge"
SHA_RE = re.compile(r"^sourceCommitSha:\s*['\"]?([0-9a-f]+)", re.M)
FN_DEF_RE = re.compile(r"(?m)^\[\^([^\]]+)\]:.*$")


def _load(name: str, filename: str):
    spec = importlib.util.spec_from_file_location(name, LANG_SYNC / filename)
    mod = importlib.util.module_from_spec(spec)
    sys.modules[name] = mod  # babel-dispatch 的 dataclass 需要模組先登記才載得進來
    assert spec and spec.loader
    spec.loader.exec_module(mod)
    return mod


def latest_sample(lang: str, slug: str) -> Path | None:
    """隔離檔名是 `<slug>.md.<unix ts>`；同一篇多次失敗時取最新的。"""
    base = QUARANTINE / lang
    if not base.exists():
        return None
    hits = sorted(base.rglob(f"{slug}.*"), key=lambda p: p.stat().st_mtime)
    return hits[-1] if hits else None


def zh_head(zh_rel: str) -> str:
    return subprocess.run(["git", "-C", str(REPO), "log", "-1", "--format=%h", "--", f"knowledge/{zh_rel}"],
                          capture_output=True, text=True).stdout.strip()


def sha_matches(sample_text: str, head: str) -> bool:
    m = SHA_RE.search(sample_text)
    return bool(m and head) and (m.group(1).startswith(head[:7]) or head.startswith(m.group(1)[:7]))


def repair_crossref(text: str, zh_text: str, st) -> str:
    """腳註裡被改寫成 @@LINKn@@ 的交叉引用：逐條用同一號 zh 腳註當來源對回去，
    跟 structured-translate Phase N 的還原是同一個函式。"""
    zdefs = {m.group(1): m.group(0) for m in FN_DEF_RE.finditer(zh_text)}
    out = []
    for line in text.split("\n"):
        if "@@" in line:
            m = re.match(r"^\[\^([^\]]+)\]:", line)
            line = st._restore_crossref_tokens(line, zdefs.get(m.group(1), "") if m else zh_text)
        out.append(line)
    return "\n".join(out)


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--run-dir", required=True, help="dispatcher run dir（含 report.jsonl）")
    ap.add_argument("--reason", required=True, help="fail_reason 的 regex，選出要重驗的家族")
    ap.add_argument("--repair", choices=["none", "crossref"], default="none")
    ap.add_argument("--apply", action="store_true")
    a = ap.parse_args()

    rows = [json.loads(l) for l in (Path(a.run_dir) / "report.jsonl").read_text(encoding="utf-8").splitlines() if l.strip()]
    pat = re.compile(a.reason)
    picked: dict[tuple[str, str], str] = {}
    for r in rows:
        if r.get("ok") or not pat.search(str(r.get("fail_reason", ""))) or not r.get("trans"):
            continue
        picked[(r["lang"], r["zh"])] = r["trans"] if r["trans"].startswith("knowledge/") else f"knowledge/{r['trans']}"

    bd = _load("bd", "babel-dispatch.py") if a.apply else None
    st = _load("st", "structured-translate.py") if a.repair == "crossref" else None
    rescued, notes = [], []
    for (lang, zh), trans in sorted(picked.items()):
        target = REPO / trans
        if target.exists():
            notes.append(f"skip  {lang} {zh}：目標檔已存在（只收缺稿）")
            continue
        sample = latest_sample(lang, target.name)
        if not sample:
            notes.append(f"skip  {lang} {zh}：隔離區沒有樣本")
            continue
        text = sample.read_text(encoding="utf-8")
        if not sha_matches(text, zh_head(zh)):
            notes.append(f"skip  {lang} {zh}：樣本是舊版原文的譯文")
            continue
        if st is not None:
            text = repair_crossref(text, (REPO / "knowledge" / zh).read_text(encoding="utf-8"), st)
        if not a.apply:
            notes.append(f"cand  {lang} {zh} ← {sample.name}")
            continue
        target.parent.mkdir(parents=True, exist_ok=True)
        target.write_text(text, encoding="utf-8")
        ok, reason = bd.verify_one(f"knowledge/{zh}", str(target.relative_to(REPO)), lambda m: None)
        if ok:
            rescued.append(str(target.relative_to(REPO)))
            notes.append(f"PASS  {lang} {zh}")
        else:
            target.unlink()
            notes.append(f"FAIL  {lang} {zh}：{reason}")
    for n in notes:
        print(n)
    print(f"\n{len(picked)} 對符合 --reason；{'救回 ' + str(len(rescued)) + ' 篇' if a.apply else '乾跑，加 --apply 才寫檔'}")
    if rescued:
        print("\n".join(rescued))
    return 0


if __name__ == "__main__":
    sys.exit(main())
