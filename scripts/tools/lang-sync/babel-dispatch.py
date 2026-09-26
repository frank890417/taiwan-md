#!/usr/bin/env python3
"""
babel-dispatch.py — Unified worker-pool translation batch dispatcher.

Replaces three hand-rolled bash dispatchers (dispatch-node-v3.sh /
run-p1-v3.sh / their predecessors) with one Python worker pool where each
worker is a *pinned backend endpoint* — an OpenRouter free model, a
local/remote Ollama node, or codex — driven through translate.py's cascade
orchestrator (`--cascade <spec>` with `--no-preflight`, single backend per
worker so there's no fallback ambiguity about which model actually did the
work).

Ported straight from the two legacy scripts (2026-07-24, still running
alongside this dispatcher — see --order below):
  - verify_group  (hard gate: verify-translation.py + cjk-leak-check.py +
    article-health.py --profile=pre-commit)
  - git_lock_commit (loud commit failure + article-health quarantine
    recovery + single retry, using the SAME lock dir the legacy dispatchers
    use: /tmp/taiwan-md-git.lock — mutual exclusion across all engines)

2026-07-24 orchestrator amendment (founder.md 教訓 "寧可 stale 也不要
missing" — legacy dispatchers' plain `unlink()` on gate-fail turned readable
P1/stale pages into 404s, measured en missing climbing 28→34 in one day):
a gate-fail (or a vanished/never-written output) on a path that exists in
git HEAD restores the HEAD version instead of deleting it — the article
just stays stale and gets retried next round. Only a path with NO HEAD
version (a genuine P0 attempt) gets truly unlinked. See
restore_head_or_quarantine(). This dispatcher does NOT duplicate
scripts/tools/lang-sync/salvage-quarantined.py (which does after-the-fact
git-log archaeology on today's deletions) — it just prevents new
degradations at the point of failure.

Usage:
  python3 scripts/tools/lang-sync/babel-dispatch.py \\
    --langs vi,id,pt,hi \\
    --worker "nemo=openrouter:nvidia/nemotron-3-ultra-550b-a55b:free" \\
    --worker "gemma31=openrouter:google/gemma-4-31b-it:free" \\
    $(~/Projects/muse-bot/fleet/fleetctl workers --service llm --format babel) \\
    --order reverse --rounds 50 --commit-every 10

Smoke test:
  python3 scripts/tools/lang-sync/babel-dispatch.py --langs vi \\
    --worker "nemo=openrouter:nvidia/nemotron-3-ultra-550b-a55b:free" \\
    --order reverse --max-articles 2 --commit-every 2

Design doc: reports/ (this file was scaffolded per an orchestrator brief,
2026-07-24 — see git log for the commit that introduced it).
"""
from __future__ import annotations

import argparse
import json
import os
import re
import subprocess
import sys
import threading
import time
from collections import defaultdict, deque
from concurrent.futures import ThreadPoolExecutor
from dataclasses import dataclass, field
from datetime import datetime, timedelta, timezone
from itertools import zip_longest
from pathlib import Path
from typing import Optional

REPO = Path(__file__).resolve().parent.parent.parent.parent
KNOWLEDGE = REPO / "knowledge"
STATUS_JSON = KNOWLEDGE / "_translation-status.json"
TRANSLATIONS_JSON = KNOWLEDGE / "_translations.json"
GIT_LOCK = Path("/tmp/taiwan-md-git.lock")
# 難篇記憶：跨 run 累計的失敗次數，決定佇列優先序。選址演化三步（2026-07-27
# 哲宇定案）：/tmp（重開機歸零，通過率 50%→18% 的事故）→ ~/.cache（跨重開機
# 但只有本機看得到）→ **repo 內版控**。關鍵認知：難篇是「文章×語言」的屬性
# 不是機器的屬性——mouhouse、其他節點、任何人跑翻譯撞的都是同一批硬骨頭，
# 這份記憶透過 git 在所有產地之間流動。schema {"lang:zh_path": 失敗次數}，
# 數值為 advisory（混合了不同模型的嘗試）；跨機衝突用逐鍵取 max 合併。
FAIL_MEMO = REPO / "reports" / "babel" / "fail-memo.json"
# 失敗「原因」側錄（2026-07-31）。fail-memo 只記次數，而次數混了兩種根因：
# 閘門誤判（可修，修完該重試）與本質太難（重試無用）——4,059 筆分層顯示
# 重試失敗過的文章吃掉 70% worker 時間換 14% 產出，但照次數一刀切會讓剛修好
# 的閘門等不到它救的那批文章回來（分析：reports/babel-retry-economics-2026-07-31.md）。
# 這份側錄不改任何行為、不參與排序，只是把「敗在哪一關」記下來，讓閘門修復
# 後能精準只重置受該閘門影響的那批。**刻意獨立成檔而非改 fail-memo schema**：
# 舊碼在跑的產線會把 dict 當 int 比大小而炸，側錄檔舊碼從不讀，零風險。
FAIL_REASONS = REPO / "reports" / "babel" / "fail-reasons.json"
MAX_FAIL_RETRIES = 3   # 同一篇本 run 失敗幾次後讓出輪次（退避，非永久放棄——下個 run 重來）  # SAME path the legacy bash dispatchers use

# ────────────────── Tier 6/7 restricted delegation (OBSERVER-QUEUE #18) ──────────────────
# 哲宇 2026-09-05 拍板原話「tier 6 用 haiku, 7 用 gemini」。Tier 6（Anthropic Haiku
# API backend）與 Tier 7（Gemini 付費 API，最後手段）都是 per-token 付費，資格限制
# 為「只服務 status.py 標 missing 的 P0，或 audit-quality.py 同一把尺判定
# CRITICAL(<0.5) 的截斷檔」——不能對一般 stale 開放（07-25 哲宇因算力爆炸關過
# rewrite 的前車之鑑，見 SQUEEZE-MODELS-MAX-PIPELINE.md §義務鐵律）。每夜上限用
# 環境變數而非寫死常數，方便哲宇日後不進 code 就能調整；預設值本身仍是常數，
# 集中在這裡方便下次校準時一眼找到（不是 ROUTINE.md §不提預算鐵律管的「時間
# 預算」，是「資格配額」，兩者不是同一件事）。
BABEL_TIER6_NIGHTLY_CAP = int(os.environ.get("BABEL_TIER6_NIGHTLY_CAP", "10"))
BABEL_TIER7_NIGHTLY_CAP = int(os.environ.get("BABEL_TIER7_NIGHTLY_CAP", "3"))
CRITICAL_TRUNCATION_RATIO = 0.5   # 同 scripts/tools/lang-sync/audit-quality.py SUSPICIOUS_THRESHOLD，同一把尺不重造

# 「cascade 對某檔全 tier 失敗」的側錄檔（跨夜持久化、git 版控 —— /tmp 重開機
# 歸零會讓「連續兩夜同檔耗盡」這個判準永遠觸發不了）。schema
# {"lang:zh_path": "YYYY-MM-DD"}（最近一次判定耗盡的日期）。
CASCADE_EXHAUSTED_LOG = REPO / "reports" / "babel" / "cascade-exhausted.json"
# fail_counts（跨 run 持久化、多產線共用同一份記憶）累計到這個數字，視為
# 「現役 worker/tier 大概都咬過一次」的代理訊號——這不是逐一驗證「每個 tier
# 都真的試過」的精確判準（babel-dispatch 是 worker pool 而非單一 cascade 內
# 逐層 fallback，精確追蹤需要記錄「這篇被哪些 backend 試過」，成本高於本次
# 任務範圍）。門檻本身是常數，之後若發現太早/太晚觸發，改這一行即可。
CASCADE_EXHAUSTED_FAIL_COUNT = 8
OBSERVER_QUEUE_MD = REPO / "docs" / "semiont" / "OBSERVER-QUEUE.md"

sys.path.insert(0, str(Path(__file__).resolve().parent))
from langs import ALL_TRANSLATION_LANGS, ENABLED_TRANSLATION_LANGS  # noqa: E402
import status as status_lib  # noqa: E402 — reuse body_hash()/body_hash_pure() (same algo status.py uses)

# bump-source-sha.py's filename has a hyphen (not import-able as a plain module) —
# load it via spec so we can call its bump_one() directly instead of duplicating
# the frontmatter-upsert logic here (2026-07-27, semantic-noop-bump path below).
# sys.modules registration BEFORE exec_module is required, not cosmetic — any
# @dataclass in the loaded file looks up sys.modules[cls.__module__] during class
# creation, and a None there raises AttributeError (hit this exact crash loading
# babel-dispatch.py itself the same way during validation).
import importlib.util as _importlib_util  # noqa: E402
_bump_spec = _importlib_util.spec_from_file_location(
    "bump_source_sha", str(Path(__file__).resolve().parent / "bump-source-sha.py")
)
bump_source_sha = _importlib_util.module_from_spec(_bump_spec)
sys.modules["bump_source_sha"] = bump_source_sha
_bump_spec.loader.exec_module(bump_source_sha)

NOOP_CHECKER = REPO / "scripts" / "tools" / "lang-sync" / "semantic-noop-check.py"


# ────────────────────────── logging ──────────────────────────

class Logger:
    """tee-style: every line goes to stdout AND run_dir/master.log."""

    def __init__(self, path: Path):
        self.lock = threading.Lock()
        self.fp = open(path, "a", encoding="utf-8")

    def __call__(self, msg: object = "") -> None:
        text = str(msg)
        with self.lock:
            print(text)
            self.fp.write(text if text.endswith("\n") else text + "\n")
            self.fp.flush()


class JsonlWriter:
    def __init__(self, path: Path):
        self.lock = threading.Lock()
        self.path = path
        self.fp = open(path, "a", encoding="utf-8")

    def write(self, obj: dict) -> None:
        with self.lock:
            self.fp.write(json.dumps(obj, ensure_ascii=False) + "\n")
            self.fp.flush()


def create_run_dir(
    base: Path = Path("/tmp"),
    *,
    now: Optional[datetime] = None,
    pid: Optional[int] = None,
) -> Path:
    """Create one private run directory per dispatcher process.

    restart-vortex.sh launches the fleet/cloud/vi lanes within the same minute.
    The old minute-only name made all three processes append to the same logs
    and report, overwrite one slug map, and reuse task directories. Thread
    locks above are process-local, so they cannot make those writes safe.
    Seconds + PID separate normal launches; the suffix loop also makes tests
    and an improbable same-process retry collision-safe.
    """
    stamp = (now or datetime.now()).strftime("%Y%m%d-%H%M%S")
    process_id = os.getpid() if pid is None else pid
    stem = f"babel-unified-{stamp}-{process_id}"
    candidate = base / stem
    suffix = 1
    while True:
        try:
            candidate.mkdir(parents=True, exist_ok=False)
            return candidate
        except FileExistsError:
            candidate = base / f"{stem}-{suffix}"
            suffix += 1


# ────────────────────────── workers ──────────────────────────

@dataclass
class Worker:
    label: str
    cascade_spec: str            # verbatim --cascade value for translate.py
    host: Optional[str] = None   # OLLAMA_HOST override (only set for ollama+@host)
    model: Optional[str] = None  # OLLAMA_MODEL override (only set for ollama+@host)
    consecutive_failures: int = 0
    frozen_until: Optional[float] = None  # time.monotonic() deadline
    tier: str = "normal"         # "normal" | "tier6" | "tier7" — restricted delegation (OBSERVER-QUEUE #18)
    skip_langs: frozenset = frozenset()  # 這個 worker 不接的語言（--worker-skip-langs；弱適配切軌，2026-09-19）


def parse_worker_arg(raw: str, tier: str = "normal") -> Worker:
    """label=backendspec[@host]

    backendspec is passed to translate.py --cascade verbatim (the @host
    suffix is always stripped first). If @host is present AND backendspec
    starts with `ollama`, OLLAMA_HOST/OLLAMA_MODEL env vars are set for that
    worker's subprocesses instead, and the cascade spec collapses to the
    bare `ollama` token (translate.py's build_cascade() falls back to
    os.environ["OLLAMA_MODEL"] in that case).

    `tier` ("tier6" / "tier7") marks a restricted-delegation worker
    (OBSERVER-QUEUE #18) — TaskQueue.claim() only hands it tasks matching
    the eligibility set computed in compute_restricted_eligible(), and
    worker_loop() enforces the nightly cap. Passed straight through from
    --worker-tier6/--worker-tier7 in main(); --worker always gets "normal".
    """
    if "=" not in raw:
        raise SystemExit(f"--worker must be 'label=backendspec[@host]', got: {raw!r}")
    label, _, rest = raw.partition("=")
    spec, sep, host_raw = rest.partition("@")
    label = label.strip()
    spec = spec.strip()
    host_raw = host_raw.strip() if sep else ""
    if not label or not spec:
        raise SystemExit(f"--worker must be 'label=backendspec[@host]', got: {raw!r}")

    host = model = None
    cascade_spec = spec
    if host_raw and spec.startswith("ollama"):
        _, _, model_part = spec.partition(":")
        model = model_part or None
        host = host_raw
        cascade_spec = "ollama"

    return Worker(label=label, cascade_spec=cascade_spec, host=host, model=model, tier=tier)


def worker_env(worker: Worker) -> dict:
    """Per-subprocess env (never mutates os.environ — workers run concurrently
    and may point at different Ollama hosts)."""
    env = os.environ.copy()
    if worker.host:
        env["OLLAMA_HOST"] = worker.host
        if worker.model:
            env["OLLAMA_MODEL"] = worker.model
    return env


# ────────────────────────── git lock + commit (ported from dispatch-node-v3.sh) ──────────────────────────

def git_lock_commit(lang: str, worker_labels: set, files: list, log: Logger) -> bool:
    """mkdir-lock /tmp/taiwan-md-git.lock (120x1s retry, shared with the
    legacy bash dispatchers) → git add <the exact files THIS dispatcher
    verified ok> + the two derived JSONs → commit. Commit failure is LOUD
    (printed, not swallowed) + article-health quarantine recovery + single
    retry — ported from dispatch-node-v3.sh git_lock_commit(), with two
    amendments discovered during the 2026-07-24 smoke test:

    1. `git add knowledge/{lang}/` (the legacy directory-wide pattern) swept
       in the CONCURRENTLY-RUNNING legacy fleet dispatcher's not-yet-committed
       files (it targets the same knowledge/vi/ tree). When the pre-commit
       hook then rejected the batch, the recovery block deleted two files
       that belonged to that OTHER process, not this one — real data loss
       for a process this dispatcher has no authority over. Scoping `git add`
       to exactly the paths this run itself verified eliminates that cross-
       engine blast radius entirely.
    2. The recovery block's raw `unlink()` on a staged-but-failing file hits
       the same founder.md problem the per-article HEAD-restore amendment
       exists for: `.lintstagedrc` runs `prettier --write` on staged files
       BEFORE `article-health.py --staged` checks them, so a translation
       that passed the pre-staging single-file gate can still fail here post-
       reformat. Recovery now goes through restore_head_or_quarantine() too.
    """
    n_files = len(files)
    tries = 0
    while True:
        try:
            GIT_LOCK.mkdir()
            break
        except FileExistsError:
            tries += 1
            if tries > 120:
                log(f"🔴 git lock timeout, skipping commit this round ({lang})")
                return False
            time.sleep(1)

    try:
        subprocess.run(
            ["git", "add", *files,
             "knowledge/_translation-status.json", "knowledge/_translations.json"],
            cwd=REPO, capture_output=True, text=True,
        )
        if subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=REPO).returncode == 0:
            return True  # nothing staged, nothing to do

        workers_str = "+".join(sorted(worker_labels)) if worker_labels else "unknown"
        msg = f"🧬 [semiont] babel: {lang} 批次 {n_files} 篇（unified dispatcher, worker={workers_str}）"
        commit = subprocess.run(["git", "commit", "-m", msg], cwd=REPO, capture_output=True, text=True)
        if commit.returncode == 0:
            log(f"✅ committed {lang} ({n_files} files, worker={workers_str})")
            return True

        log(f"🔴 COMMIT FAILED for {lang} — pre-commit rejected staged batch, attempting recovery")
        log((commit.stdout + commit.stderr)[-4000:])

        staged = subprocess.run(
            ["git", "diff", "--cached", "--name-only"], cwd=REPO, capture_output=True, text=True
        ).stdout.splitlines()
        staged_md = [f for f in staged if f.startswith("knowledge/") and f.endswith(".md")]
        bad = []
        for f in staged_md:
            r = subprocess.run(
                ["python3", "scripts/tools/article-health.py", f, "--profile=pre-commit", "--quiet"],
                cwd=REPO, capture_output=True, text=True,
            )
            if "passed=False" in r.stdout:
                bad.append(f)
        log(f"recovery: {len(bad)}/{len(staged_md)} staged files fail article-health, quarantining")
        for f in bad:
            subprocess.run(["git", "restore", "--staged", f], cwd=REPO, capture_output=True, text=True)
            disposition = restore_head_or_quarantine(f, log)
            log(f"  {disposition}: {f}")

        if subprocess.run(["git", "diff", "--cached", "--quiet"], cwd=REPO).returncode != 0:
            msg2 = (f"🧬 [semiont] babel: {lang} 批次 {n_files} 篇"
                    f"（unified dispatcher, worker={workers_str}，post-quarantine retry）")
            commit2 = subprocess.run(["git", "commit", "-m", msg2], cwd=REPO, capture_output=True, text=True)
            if commit2.returncode == 0:
                log("✅ recovery commit succeeded")
            else:
                log("🔴 recovery commit STILL failed — needs manual intervention, leaving staged")
                log((commit2.stdout + commit2.stderr)[-4000:])
        return True
    finally:
        try:
            GIT_LOCK.rmdir()
        except OSError:
            pass


# ────────────────────────── verify trio + HEAD-restore (ported + amended) ──────────────────────────

def verify_one(zh_path: str, trans_path: str, log: Logger) -> tuple[bool, Optional[str]]:
    """The hard gate: target-language-check.py + verify-translation.py +
    cjk-leak-check.py + article-health.py --profile=pre-commit. Ported from
    dispatch-node-v3.sh verify_group() (per-article body), minus the unlink
    side effect — the caller decides disposition via restore_head_or_quarantine().

    Why target-language-check runs first (2026-09-09): a delegated agent wrote an
    English translation into knowledge/de/ and every gate here passed it —
    structure 55/55, verify 17 pass, leak 0, health hard=0. Each of these measures
    a *form* (counts match, no Chinese left over, URLs identical, frontmatter
    complete), and an English article satisfies all of them as well as a German
    one does. A full-library scan then found 65 more of the same across ja/ko/es/fr.
    Nothing downstream of here would ever have caught them; the reader would.
    It runs first because it is the cheapest and the most fundamental: if the file
    is not in the target language, the other three checks are answering questions
    about the wrong document."""
    r0 = subprocess.run(
        ["python3", "scripts/tools/lang-sync/target-language-check.py", trans_path],
        cwd=REPO, capture_output=True, text=True,
    )
    if r0.returncode != 0:
        detected = re.search(r"看起來是 (\w+)", r0.stdout)
        drift = re.search(r"漂入\[(\w+)\]", r0.stdout)
        if drift:
            # 2026-09-18：整篇是目標語言、尾段漂成韓文（hi/ar/ru 1,100+ 篇存量的病）。
            # 跟 wrong-language 分開記，report.jsonl 才分得出「翻錯語言」與「翻到一半換語言」。
            # 2026-09-26 起也量西里爾／天城文／阿拉伯文，方括號裡是漂去的那個文字的代碼。
            reason = f"foreign-script[{drift.group(1)}]"
        else:
            reason = f"wrong-language[{detected.group(1) if detected else '?'}]"
        log(f"❌ GATE FAIL {trans_path} ({reason})")
        return False, reason
    r1 = subprocess.run(
        ["python3", "scripts/tools/lang-sync/verify-translation.py", zh_path, trans_path, "--json"],
        cwd=REPO, capture_output=True, text=True,
    )
    try:
        out1 = json.loads(r1.stdout)
    except Exception:
        out1 = {"fails": -1}
    r2 = subprocess.run(
        ["python3", "scripts/tools/lang-sync/cjk-leak-check.py", trans_path],
        cwd=REPO, capture_output=True, text=True,
    )
    leak_fail = r2.returncode != 0
    r3 = subprocess.run(
        ["python3", "scripts/tools/article-health.py", trans_path, "--profile=pre-commit", "--quiet"],
        cwd=REPO, capture_output=True, text=True,
    )
    health_fail = "passed=False" in r3.stdout
    # 幣別閘門（2026-09-26 維護班通報）：currency-identity-check 原本只接在委派層，
    # OBSERVER-QUEUE #59 寫的「增量已擋」只對委派層成立。實測本 dispatcher 36 小時
    # 產出 444 篇裡 133 篇帶裸 yuan／rupiah——ar〈斗笠〉十處「150 يوان」過了上面
    # 全部閘門，讀者讀到的是人民幣。exit 1 = 有裸幣別；其他非零是工具自己壞了，不擋。
    r4 = subprocess.run(
        ["python3", "scripts/tools/lang-sync/currency-identity-check.py", trans_path],
        cwd=REPO, capture_output=True, text=True,
    )
    currency_fail = r4.returncode == 1
    ok = (out1.get("fails", 1) == 0 and not leak_fail and not health_fail
          and not currency_fail)
    if ok:
        return True, None
    # 失敗原因要帶「是哪幾項」不只「有幾項」——2026-07-27 診斷 verify 類失敗時
    # 發現 `verify=4` 只記數量，log 與 report.jsonl 都查不出敗在哪個檢查，
    # 等於失敗不可診斷（本檔 §儀器化：工具存在不等於問題被檢查）。
    if health_fail:
        # health 分支也要帶項目名。同日修 verify 分支時只改了一半，隔一小時
        # 追 health 失敗就撞上同樣的死路（檔案已 HEAD-restore、log 只寫
        # 「health」，無從得知敗在哪個檢查）——同型病要 grep 全部分支，
        # 這是本檔 §儀器化的第五次驗證。
        # article-health.py renders hard failures with 🔴. Keep ❌ accepted for
        # compatibility with older output captured in long-running workers.
        hnames = re.findall(
            r"(?:🔴|❌)\s+([a-z0-9][a-z0-9 _-]{2,40}?)\s+hard=[1-9]",
            r3.stdout,
        )
        reason = "health" + (f" [{', '.join(hnames[:4])}]" if hnames else "")
    elif leak_fail:
        reason = "leak"
    elif currency_fail and out1.get("fails", 1) == 0:
        # 只在 verify 本身過關時記成幣別失敗，既有的 verify 家族統計不被改標
        n = re.search(r"(\d+) 處裸幣別", r4.stdout)
        reason = f"currency[{n.group(1) if n else '?'}]"
    else:
        failed_names = [c.get("name", "?") for c in (out1.get("checks") or [])
                        if c.get("level") == "FAIL"]
        reason = f"verify={out1.get('fails')}"
        if failed_names:
            reason += f" [{', '.join(failed_names[:4])}]"
    log(f"❌ GATE FAIL {trans_path} ({reason})")
    return False, reason


def restore_head_or_quarantine(path_str: str, log: Logger) -> str:
    """2026-07-24 orchestrator amendment (founder.md 「寧可 stale 也不要
    missing」). Called whenever a translated file is in a bad state after a
    worker's attempt (gate-fail on a produced file, OR the file vanished /
    was never written — e.g. translate.py's own too-small-output unlink,
    which can destroy a just-overwritten stale HEAD version before our
    external verify even runs).

    - If `path_str` exists in git HEAD: restore that exact version. The
      working tree then byte-matches HEAD, so the later `git add` stages
      nothing for this path — the article silently stays stale and is
      retried next round.
    - Only if HEAD has no such path (a genuine P0 attempt that never had a
      committed translation) does this actually unlink → true quarantine,
      article returns to the missing list.

    **2026-09-09 amendment — 「HEAD 沒有 = 本來就 missing」不再成立。** 那個推論
    在產線是唯一寫入者時是對的。委派層（Haiku/Sonnet sub-agent）開始往同一批路徑
    寫之後就不對了：它的產出經過九道閘、是好東西，只是還沒 commit。產線重譯同一篇
    失敗時，看到「HEAD 沒有這個路徑」就把它當自己的殘骸 unlink——而且不留 log，
    因為 restored 那行只在有 HEAD 版本時才印。實際損失：第一波驗過的
    `id/Food/taiwan-bread-and-baking.md`（cloud log 1841 行只有一句 GATE FAIL）。
    REFLEXES #91 兩個代謝不同步的新變體——不是「造了沒登記」，是「登記慢一步就被
    另一個代謝當垃圾清掉」。

    修法：unlink 之前先看這個路徑是不是 git 未追蹤的既有檔案。是的話搬進
    `.babel-quarantine/` 而不是刪掉——真正的 P0 殘骸搬走跟刪掉對產線是一樣的
    （佇列都會把它算成 missing 重派），但對「別人剛寫好的東西」差別是能不能救回來。

    Returns "restored" | "unlinked" | "quarantined".
    """
    p = REPO / path_str
    check = subprocess.run(
        ["git", "cat-file", "-e", f"HEAD:{path_str}"], cwd=REPO, capture_output=True
    )
    if check.returncode == 0:
        show = subprocess.run(
            ["git", "show", f"HEAD:{path_str}"], cwd=REPO, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        if show.returncode == 0:
            p.parent.mkdir(parents=True, exist_ok=True)
            p.write_bytes(show.stdout)
            log(f"♻️  restored {path_str} to HEAD version (寧可 stale 也不要 missing)")
            return "restored"
        log(f"⚠️  {path_str}: in HEAD but `git show` failed — unlinking as fallback")
    # HEAD 沒有這個路徑。刪之前先分辨兩種情況：本輪剛寫壞的殘骸（該刪），
    # 跟別人（委派層）已經寫好但還沒 commit 的成品（不該刪，搬走留底）。
    if p.exists():
        untracked = subprocess.run(
            ["git", "ls-files", "--error-unmatch", path_str],
            cwd=REPO, capture_output=True,
        ).returncode != 0
        if untracked:
            qdir = REPO / ".babel-quarantine" / Path(path_str).parent
            qdir.mkdir(parents=True, exist_ok=True)
            dest = qdir / (Path(path_str).name + f".{int(time.time())}")
            try:
                p.replace(dest)
                log(f"🧊 quarantined {path_str} → {dest.relative_to(REPO)}"
                    f"（未追蹤檔案，可能是委派層產出，不直接刪）")
                return "quarantined"
            except OSError as e:
                log(f"⚠️  {path_str}: 搬進隔離區失敗（{e}），改為 unlink")
    p.unlink(missing_ok=True)
    return "unlinked"


# ────────────────────────── semantic-noop bump (2026-07-27) ──────────────────────────
# reports/semantic-noop-stale-2026-07-27.md: ~66% of `stale` tasks turn out to be zh
# diffs that are punctuation/whitespace-only (半形逗號→全形、句中分號改句號 etc) —
# zero semantic impact on any translation, since every target language keeps its own
# punctuation conventions regardless of how zh punctuates. Those don't need a model
# call at all: just bump the translation's provenance hashes to the new zh commit.
# semantic-noop-check.py does the (conservative, single-responsibility) judging;
# bump_source_sha.bump_one() does the actual frontmatter write (genuine reuse via the
# importlib load above, not a re-implementation). A model-free hit here still passes
# through the SAME verify-translation.py hard gate as a real translation — if it
# fails (e.g. an unrelated pre-existing passthrough-field drift, observed once during
# validation on pt/Art/li-poetry-society.md), the write is reverted and the task falls
# through to the normal patch/full-translate path below, unchanged.

def zh_current_provenance(zh_path: str) -> tuple[str, str, str]:
    """(sha8, contentHash, bodyHash) for the CURRENT zh source, computed exactly the
    way status.py does (imported, not reimplemented) so the bumped frontmatter matches
    what the next status.py refresh computes — the article reads 'fresh', not stale
    again on the next round."""
    full = KNOWLEDGE / zh_path
    content = full.read_text(encoding="utf-8")
    sha_out = subprocess.run(
        ["git", "log", "-1", "--format=%H", "--", f"knowledge/{zh_path}"],
        cwd=REPO, capture_output=True, text=True,
    ).stdout.strip()
    sha8 = sha_out[:8] if sha_out else ""
    return sha8, status_lib.body_hash(content), status_lib.body_hash_pure(content)


def try_semantic_noop_bump(zh_path: str, trans_path: str, log: Logger) -> bool:
    """Returns True iff the stale task at (zh_path, trans_path) was resolved by a
    zero-cost provenance bump (no model call). False means "proceed with the normal
    patch/full-translate path" — the caller does not need to know why (checker said
    no / bump was a no-change race / post-bump verify gate rejected it)."""
    r = subprocess.run(
        ["python3", str(NOOP_CHECKER), zh_path, trans_path, "--json"],
        cwd=REPO, capture_output=True, text=True,
    )
    try:
        verdict = json.loads(r.stdout) if r.stdout.strip() else {}
    except json.JSONDecodeError:
        verdict = {}
    if not verdict.get("noop"):
        return False

    target = REPO / trans_path
    if not target.exists():
        return False
    original_bytes = target.read_bytes()

    sha8, content_hash, body_hash_v = zh_current_provenance(zh_path)
    if not sha8:
        log(f"⚠️  semantic-noop-bump: 無法取得 {zh_path} 目前 commit sha，放棄，走正常翻譯路徑")
        return False

    changed = bump_source_sha.bump_one(target, sha8, content_hash, body_hash_v, apply=True)
    if not changed:
        return False  # already at latest sha (race with another engine) — not a failure, just nothing to do

    ok, reason = verify_one(zh_path, trans_path, log)
    if not ok:
        target.write_bytes(original_bytes)
        log(f"↩️  semantic-noop-bump 還原 {trans_path}（verify 沒過：{reason}）— 走正常翻譯路徑")
        return False

    log(f"✨ semantic-noop-bump {trans_path} → {sha8}（zh diff 只有標點/空白：{verdict.get('reason')}，未呼叫任何模型）")
    return True


# ────────────────────────── round-state ──────────────────────────

class RunState:
    def __init__(self):
        self.lock = threading.Lock()
        self.total_ok: int = 0                            # run 累計成功數（空轉偵測用）
        self.pending_ok: dict = defaultdict(int)          # lang -> count since last commit
        self.pending_since: dict = {}                     # lang -> monotonic time of first pending item
        self.pending_workers: dict = defaultdict(set)     # lang -> {worker labels} since last commit
        self.pending_files: dict = defaultdict(list)      # lang -> [trans_path] since last commit — the
                                                            # ONLY paths git_lock_commit is allowed to add
                                                            # (never a directory wildcard — see git_lock_commit
                                                            # docstring, 2026-07-24 cross-engine incident)
        self.last_worker: dict = {}                       # "lang:zh" -> worker label (soft retry-avoid)
        self.quarantine_log: dict = defaultdict(set)       # lang -> {zh_path} — audit trail
        self.fail_counts: dict = defaultdict(int)          # "lang:zh" -> 累計失敗次數（跨 run 持久化）。
        # 難篇記憶跨 run 保留——不然每次重啟都先拿同一批撞牆文章開刀，
        # 而它們正是最不可能成功的（2026-07-26 優先序佇列改造）。
        try:
            if FAIL_MEMO.exists():
                self.fail_counts.update(json.loads(FAIL_MEMO.read_text(encoding="utf-8")))
        except Exception:
            pass
                                                            # 2026-07-25：原本 quarantine_log 刻意「不排除
                                                            # 未來輪次」讓文章下一輪重試，但沒有退避——同一篇
                                                            # 失敗後立刻被重撈、再失敗、再重撈，撞上 10 分鐘
                                                            # mtime dedupe 就變純空轉。實測 classic track 200
                                                            # 輪只處理 50 篇，約 190 輪空轉。重試仍是對的
                                                            # （多數 gate fail 是模型當次品質問題，換一輪常會過），
                                                            # 但同一篇連 MAX_RETRIES 次失敗就本 run 停手，
                                                            # 把輪次讓給還沒試過的文章。
        self.in_flight: set = set()                        # "lang:zh" currently dispatched (claim protocol)
        # Tier 6/7 restricted delegation (OBSERVER-QUEUE #18，2026-09-05 拍板)：
        self.restricted_eligible: set = set()               # {(lang, zh_path)} recomputed every round
        self.tier_success_count: dict = defaultdict(int)    # "tier6"/"tier7" -> 本 run 成功篇數（夜間額度帳）
        self.tier_cap_reached_logged: set = set()           # 哪些 tier 已經記過一次 cap_reached（防洗版）
        self.tier6_cap: int = BABEL_TIER6_NIGHTLY_CAP       # 由 main() 依 --tier6-nightly-cap 覆寫
        self.tier7_cap: int = BABEL_TIER7_NIGHTLY_CAP       # 由 main() 依 --tier7-nightly-cap 覆寫
        self.exhausted_this_run: list = []                  # ["lang:zh", ...] 本 run 觸發 cascade_exhausted 的清單
        # 輪中補貨（2026-09-21）：本輪已排進佇列的 (lang:zh)，補貨時不重排；補貨序號與鎖
        self.round_seen: set = set()
        self.topup_lock = threading.Lock()
        self.topup_seq: int = 0


class TaskQueue:
    """Shared round queue. Tasks are (lang, group_path, zh_path). claim()
    applies a soft last-worker-avoidance preference (2026-07-24 amendment
    spec: quarantined articles "retried next round, preferably by a
    different worker")."""

    def __init__(self, tasks: list):
        self._dq = deque(tasks)
        self._lock = threading.Lock()

    def claim(self, worker_label: str, last_worker: dict, task_filter=None):
        """task_filter(lang, zh_path) -> bool, optional (Tier 6/7 restricted
        workers pass one built in worker_loop()). Unlike the last-worker
        preference below (soft — a worker CAN still get that task if nothing
        else is left), task_filter is a HARD gate: a task failing it goes
        into `deferred` and is restored to the queue for other workers
        before this call returns, but this worker never claims it — even
        when it is the only task left. (An earlier version reused the same
        "give it to someone else, but fall through if nothing else remains"
        pattern as last_worker for task_filter too; that silently handed a
        tier6/7 worker an ineligible task whenever the queue drained to
        exactly one remaining item near the end of a round.)"""
        with self._lock:
            n = len(self._dq)
            deferred = []
            for _ in range(n):
                task = self._dq.popleft()
                lang, _gpath, zh_path = task
                if task_filter is not None and not task_filter(lang, zh_path):
                    deferred.append(task)
                    continue
                if last_worker.get(f"{lang}:{zh_path}") == worker_label and self._dq:
                    self._dq.append(task)  # try to give it to someone else first
                    continue
                self._dq.extend(deferred)
                return task
            self._dq.extend(deferred)
            return None

    def __len__(self):
        with self._lock:
            return len(self._dq)

    def extend(self, tasks: list) -> None:
        """輪中補貨（2026-09-21 top-up，見 topup_queue()）。"""
        with self._lock:
            self._dq.extend(tasks)


# ────────────────────────── status / worklist ──────────────────────────

def refresh_status(log: Logger) -> dict:
    r = subprocess.run(
        ["python3", "scripts/tools/lang-sync/status.py"], cwd=REPO, capture_output=True, text=True
    )
    log(r.stdout.strip())
    if r.returncode != 0:
        log(f"⚠️  status.py refresh exit={r.returncode}\n{r.stderr[-1000:]}")
    return json.loads(STATUS_JSON.read_text(encoding="utf-8"))


def default_langs(status_data: dict) -> list:
    result = []
    for lang in ENABLED_TRANSLATION_LANGS:
        s = status_data["_meta"]["summary"].get(lang, {})
        if s.get("missing", 0) > 0 or s.get("stale", 0) > 0 or s.get("metadata_stale", 0) > 0:
            result.append(lang)
    return result


def compute_restricted_eligible(status_data: dict, langs: list) -> set:
    """Tier 6/7 資格集合（OBSERVER-QUEUE #18，2026-09-05 拍板）：只有

    1. **P0 missing** — status.py 標 `missing`（無任何既有譯文）
    2. **CRITICAL(<0.5) 截斷檔** — 既有譯文存在（`stale`／`metadata-stale`），
       但全檔 bytes 比例 < CRITICAL_TRUNCATION_RATIO（跟
       `scripts/tools/lang-sync/audit-quality.py` 的 SUSPICIOUS_THRESHOLD
       同一把尺，不重造第二把——那把尺量的是「這篇讀起來像被攔腰砍斷」，
       跟一般 stale 的「內容過期需要更新」是完全不同的嚴重度）

    才准進付費 Tier 6/7 的隊列。**不包含一般 stale／metadata-stale**——那
    是免費 cascade（Tier 1-5）該吃的量，付費 tier 對它們開放會直接撞
    07-25 哲宇因算力爆炸關過 rewrite 的前車之鑑。

    回傳 {(lang, zh_path), ...}。I/O 只有 os.stat()（檔案大小），不讀取
    整篇內容——這是本輪每個語言都要跑一次的計算，成本必須跟檔案數量線性
    而非跟檔案大小線性。
    """
    eligible = set()
    by_article = status_data.get("byArticle", {})
    for zh, info in by_article.items():
        zh_full = KNOWLEDGE / zh
        for lang in langs:
            t = info.get("translations", {}).get(lang, {})
            st = t.get("status")
            if st == "missing":
                eligible.add((lang, zh))
                continue
            if st in ("stale", "metadata-stale") and t.get("path"):
                try:
                    trans_size = (KNOWLEDGE / t["path"]).stat().st_size
                    zh_size = zh_full.stat().st_size
                except OSError:
                    continue
                if zh_size > 0 and (trans_size / zh_size) < CRITICAL_TRUNCATION_RATIO:
                    eligible.add((lang, zh))
    return eligible


def record_cascade_exhaustion(state: "RunState", lang: str, zh_path: str, fail_count: int,
                               report: JsonlWriter, log: Logger) -> None:
    """義務鐵律第 4 條（2026-09-05 哲宇拍板，OBSERVER-QUEUE #18(c)）：cascade
    對某檔全 tier 失敗時 escalate，不 silent carry。

    `fail_count` 達 CASCADE_EXHAUSTED_FAIL_COUNT 是「現役 worker/tier 大概
    都咬過一次」的代理訊號（見該常數旁的完整說明），不是逐一驗證每個 tier
    都真的試過的精確判準。

    效果：(1) report.jsonl 記一筆 `cascade_exhausted` 事件，讓收官 memory
    可以直接 grep 出這夜耗盡的檔案清單（也累進 state.exhausted_this_run 供
    本 run 結尾的 log 摘要用）(2) 側錄跨夜持久檔
    `reports/babel/cascade-exhausted.json`——如果同一個 key 上一次被記錄的
    日期不是今天、且距今 ≤3 天（大約是「上一次跑」而非巧合撞到舊紀錄），
    判定為連續兩夜同檔耗盡，append 一列進 OBSERVER-QUEUE.md §待決。

    任何一步失敗都只 log warning，不重丟例外——escalation 本身絕不能弄垮
    正在跑的 dispatcher（哲宇的翻譯批次比這個側錄機制重要得多）。
    """
    key = f"{lang}:{zh_path}"
    now = datetime.now().astimezone()
    today = now.date().isoformat()
    report.write({
        "ts": now.isoformat(timespec="seconds"),
        "event": "cascade_exhausted", "lang": lang, "zh": zh_path, "fail_count": fail_count,
    })
    log(f"🚨 cascade_exhausted: {key}（累計失敗 {fail_count} 次，視為現役 tier 全滅——義務鐵律第 4 條 escalate）")
    with state.lock:
        state.exhausted_this_run.append(key)
    try:
        store = {}
        if CASCADE_EXHAUSTED_LOG.exists():
            store = json.loads(CASCADE_EXHAUSTED_LOG.read_text(encoding="utf-8"))
        prev = store.get(key)
        store[key] = today
        CASCADE_EXHAUSTED_LOG.parent.mkdir(parents=True, exist_ok=True)
        CASCADE_EXHAUSTED_LOG.write_text(json.dumps(store, ensure_ascii=False, indent=1), encoding="utf-8")
        if prev and prev != today:
            gap_days = (now.date() - datetime.fromisoformat(prev).date()).days
            if 0 < gap_days <= 3:
                append_observer_queue_row(lang, zh_path, fail_count, prev, log)
    except Exception as e:
        log(f"⚠️  cascade_exhausted 側錄失敗（不影響翻譯本身）：{e}")


def append_observer_queue_row(lang: str, zh_path: str, fail_count: int, first_seen: str, log: Logger) -> None:
    """連續兩夜同檔 cascade exhausted → 在 OBSERVER-QUEUE.md §待決 表尾新增一列
    （格式照該檔 `# | 進佇列日 | 決策 | 預設選項 | 不決策的代價 | default-action`
    六欄規則）。

    防禦式寫法：找不到預期的表格錨點就整段放棄記 warning，絕不用「大概對」
    的正規表達式硬改這份 canonical 認知檔（它是哲宇 standing decision 的唯一
    出口，寫壞比不寫更糟）。同一 (lang, zh_path) 已經有未結案的列時不重複
    append（用 zh_path 字串比對，保守但不會漏檢——寧可漏掉一次新 escalate
    也不要洗版同一篇）。
    """
    try:
        text = OBSERVER_QUEUE_MD.read_text(encoding="utf-8")
    except Exception as e:
        log(f"⚠️  無法讀 OBSERVER-QUEUE.md，略過 escalate：{e}")
        return
    if zh_path in text and "cascade 連續兩夜耗盡" in text:
        log(f"ℹ️  {lang}:{zh_path} 已在 OBSERVER-QUEUE 待決，不重複 append")
        return
    lines = text.splitlines(keepends=True)
    try:
        pending_idx = next(i for i, l in enumerate(lines) if l.strip() == "## 待決")
        decided_idx = next(i for i, l in enumerate(lines) if l.strip() == "## 已決")
    except StopIteration:
        log("⚠️  OBSERVER-QUEUE.md 找不到 ## 待決／## 已決 錨點，略過 escalate")
        return
    last_row_idx = None
    for i in range(decided_idx - 1, pending_idx, -1):
        if lines[i].startswith("| "):
            last_row_idx = i
            break
    if last_row_idx is None:
        log("⚠️  OBSERVER-QUEUE.md §待決找不到既有表格列，略過 escalate")
        return
    # 編號來源必須精準鎖在「這是 OBSERVER-QUEUE 自己的列號」，不能用寬鬆的
    # `#\d+` 全文掃描——本檔決策文字裡大量引用 GitHub issue/PR（`#1642`／
    # `#1599` 這種），混進來會讓編號暴衝到四位數。§待決表的列號是行首
    # `| N |`；§已決表沒有獨立列號欄，但慣例是「日期欄後緊接 `#N`」
    # （如 `| 2026-09-05 | #21 marketplace 搬遷 |`），只鎖行首這個位置。
    used_nums = [int(m) for m in re.findall(r"^\|\s*(\d+)\s*\|", text, re.MULTILINE)]
    used_nums += [int(m) for m in re.findall(
        r"^\|\s*\d{4}-\d{2}-\d{2}\s*\|\s*\**#(\d+)", text, re.MULTILINE)]
    next_num = (max(used_nums) + 1) if used_nums else 1
    today = datetime.now().astimezone().date().isoformat()
    decision = (f"**babel cascade 連續兩夜耗盡：`{lang}:{zh_path}`**（累計失敗 {fail_count} 次，"
                f"上次耗盡 {first_seen}）：P0 missing 或 CRITICAL(<0.5) 截斷檔，付費 Tier 6/7 加上"
                f"免費 Tier 1-5 連續兩夜都翻不出能過三重 gate 的版本。可能是這篇本身難度異常"
                f"（結構複雜／腳註密集／content policy 邊界）或閘門對它有系統性誤判，需要人眼看一次。")
    default = "人工看一次這篇——若是閘門誤判，修判準後重置 fail_counts；若是真的難，考慮手動 Sonnet 委派（SQUEEZE §第五層）或維持沉底"
    cost = "持續佔用夜間算力重複嘗試同一篇注定失敗的任務，擠掉其他文章的輪次"
    row = (f"| {next_num}  | {today} | {decision} | {default} | {cost} | "
           f"🔒 等真人（累計三夜以上未解需要真人判斷是閘門問題還是文章問題） |\n")
    lines.insert(last_row_idx + 1, row)
    try:
        OBSERVER_QUEUE_MD.write_text("".join(lines), encoding="utf-8")
        log(f"📮 escalate 進 OBSERVER-QUEUE.md §待決 #{next_num}：{lang}:{zh_path}")
    except Exception as e:
        log(f"⚠️  寫入 OBSERVER-QUEUE.md 失敗：{e}")


FRESH_WINDOW_DAYS = 5   # 見 build_worklist：新文章的最高優先窗口


EXCLUDE_REFRESH_MIN = int(os.environ.get("BABEL_EXCLUDE_REFRESH_MIN", "90"))  # 去重清單多久算舊


def refresh_exclusions_if_stale(path: Path | None, log: "Logger") -> None:
    """去重清單超過 EXCLUDE_REFRESH_MIN 分鐘就重算（git fetch + babel-origin-exclude.py）。

    2026-09-19：wrapper 只在起跑時算一次，但一個 run 跑數天，origin 那側每天多翻
    一百多篇，清單越跑越舊，本機又開始翻 origin 已經翻好的檔——09-18 handoff 第二條。
    重算失敗只 log，沿用舊檔（load_exclusions 每輪都重讀，所以新檔一落地下一輪就生效）。
    """
    if path is None:
        return
    try:
        age_min = (time.time() - path.stat().st_mtime) / 60 if path.exists() else float("inf")
    except OSError:
        age_min = float("inf")
    if age_min < EXCLUDE_REFRESH_MIN:
        return
    log(f"  exclude-file 已 {age_min:.0f} 分鐘沒更新（門檻 {EXCLUDE_REFRESH_MIN}）— 重算 origin 去重清單")
    subprocess.run(["git", "fetch", "-q", "origin", "main"], cwd=REPO, capture_output=True, text=True)
    r = subprocess.run([sys.executable, "scripts/tools/lang-sync/babel-origin-exclude.py"],
                       cwd=REPO, capture_output=True, text=True)
    if r.returncode != 0:
        log(f"  ⚠️ babel-origin-exclude.py exit={r.returncode}，沿用舊清單\n{r.stderr[-600:]}")
    else:
        log("  " + (r.stderr.strip().splitlines() or ["去重清單已重算"])[-1])


def load_exclusions(path: Path | None, log: "Logger") -> set:
    """讀 `--exclude-file`（TSV：`<lang>\t<zh_path>` 或 `*\t<zh_path>`）。

    2026-09-18 誕生：main 分岔期間兩台機器各跑 babel 翻同一批 stale／missing，
    knowledge/ 衝突面九天長到 758 檔。清單由 `babel-origin-exclude.py` 從
    origin/main 算出（origin 已有較新譯文的 (lang, zh)，以及 origin 改過的 zh
    原稿），每輪重讀所以可以在 run 中途重新產生。讀不到檔＝空集合＋log 一行，
    不讓排除清單的缺席靜默變成「全翻」。
    """
    if path is None:
        return set()
    try:
        rows = set()
        for line in path.read_text(encoding="utf-8").splitlines():
            if not line.strip() or line.startswith("#"):
                continue
            lang, _, zh = line.partition("\t")
            if lang and zh:
                rows.add((lang.strip(), zh.strip()))
        return rows
    except OSError as e:
        log(f"  ⚠️ exclude-file unreadable ({e}) — treating as empty; dedupe against origin is OFF this round")
        return set()


class ExclusionCache:
    """去重清單的即時視圖，給 claim 時的 hard gate 用（2026-09-20）。

    09-19 把「每 90 分鐘重算」接進 dispatcher，但接在**輪次開頭**——而一輪是
    10 × worker 數 × 語言數（12 語 × 5 worker = 560 篇），實跑 12.6 小時還在
    Round 1，重算一次都沒發生。清單只在 build_worklist 用一次，輪中另一台機器
    推上來的譯文完全看不見。修法把「讀清單」跟「用清單」都搬到 claim 時：
    本類按 mtime 快取（檔案沒變不重讀），refresher 執行緒負責讓檔案變。
    """

    def __init__(self, path: Optional[Path], log: "Logger"):
        self.path = path
        self.log = log
        self._mtime: Optional[float] = None
        self._set: set = set()
        self._lock = threading.Lock()

    def current(self) -> set:
        if self.path is None:
            return set()
        try:
            mtime = self.path.stat().st_mtime
        except OSError:
            mtime = None
        with self._lock:
            if mtime != self._mtime:
                self._set = load_exclusions(self.path, self.log)
                self._mtime = mtime
                self.log(f"  exclude-file 重新載入：{len(self._set)} (lang, zh) pairs（claim 時即時生效）")
            return self._set

    def excluded(self, lang: str, zh_path: str) -> bool:
        cur = self.current()
        return (lang, zh_path) in cur or ("*", zh_path) in cur


def start_exclusion_refresher(path: Optional[Path], log: "Logger",
                              stop: threading.Event, poll_s: float = 60.0) -> Optional[threading.Thread]:
    """背景執行緒：每 poll_s 看一次去重清單的檔齡，過期就重算（原本只在輪次
    開頭做，長輪次下等於永不重算）。daemon，主執行緒收工它就跟著走。回傳
    thread 方便三重巡檢的第五問對執行緒數（現在是 worker 數 + 主 + 本執行緒）。"""
    if path is None:
        return None

    def _loop() -> None:
        while not stop.wait(poll_s):
            try:
                refresh_exclusions_if_stale(path, log)
            except Exception as e:  # noqa: BLE001
                log(f"  ⚠️ exclusion refresher 例外（沿用舊清單）：{e}")

    t = threading.Thread(target=_loop, name="exclusion-refresher", daemon=True)
    t.start()
    return t


def build_worklist(status_data: dict, lang: str, priority: str, order: str,
                    fail_counts: dict | None = None, max_zh_bytes: int | None = None,
                    log: Logger | None = None, exclude: set | None = None) -> list:
    """四層優先序佇列。

    `max_zh_bytes` 把超過篇幅的文章排除在這條軌之外（不是丟掉——由委派層接）。
    2026-09-09 實測：雲端軌四個 worker 52 分鐘只嘗試 1 篇、0 通過，每一篇都耗在
    40-90KB 的深度長文上直到腳註階段逾時（ja/新北市 501 秒、兩次 OpenRouter
    240 秒逾時，整篇作廢還原）。排序原則「由新到舊」是對的，副作用是站上最新的
    文章往往也最大，於是產線一開機就撞整個佇列裡最硬的那批。
    見 [SQUEEZE §第五層分派表](../../../docs/pipelines/SQUEEZE-MODELS-MAX-PIPELINE.md)。

    排序鍵由外到內：
      ① 失敗次數（撞牆多的沉底，不排除——2026-07-26 哲宇 directive
         「失敗的往後排，往下繼續嘗試新的，逐步過濾出不容易處理的文章」）
      ② **新鮮窗**：zh 最後編輯在 FRESH_WINDOW_DAYS 內的文章整批插隊到最前，
         凌駕 P0/P1（2026-07-27 哲宇 directive「最近 5 天內的最新文章排最高
         優先序，日期近的更前面」）。剛寫好或剛大修的文章是讀者當下會看的，
         也是站上編輯標準最新的一批，晚一天翻就少一天的多語觸及。
      ③ P0/P1（缺頁先於過期）
      ④ zh 編輯時間新到舊

    新鮮窗內部同樣依 ①③④ 排（失敗沉底照舊生效，避免新文章裡的硬骨頭
    霸佔隊首），但 `--order reverse` 對它無效——新鮮窗的定義就是由新到舊。
    """
    by_article = status_data["byArticle"]
    fail_counts = fail_counts or {}
    fresh_cut = datetime.now().astimezone() - timedelta(days=FRESH_WINDOW_DAYS)

    def _mtime(raw: str):
        # lastModified 帶時區偏移（…+08:00），字串比較會被不同 offset 騙，
        # 一律解析成 aware datetime 再比。
        try:
            return datetime.fromisoformat(raw)
        except Exception:
            return datetime.min.replace(tzinfo=timezone.utc)

    fresh, p0, p1, oversized = [], [], [], []
    exclude = exclude or set()
    for zh, info in by_article.items():
        t = info.get("translations", {}).get(lang, {})
        st = t.get("status")
        if st not in ("missing", "stale", "metadata-stale"):
            continue
        if (lang, zh) in exclude or ("*", zh) in exclude:
            continue  # origin/main 那側已做掉——不重複翻，衝突面不從本機增長
        if max_zh_bytes:
            try:
                if (REPO / "knowledge" / zh).stat().st_size > max_zh_bytes:
                    oversized.append(zh)
                    continue
            except OSError:
                pass
        raw = info["zh"]["lastModified"]
        nfail = fail_counts.get(f"{lang}:{zh}", 0)
        tier = 0 if st == "missing" else 1          # P0 先於 P1
        entry = (zh, raw, nfail, tier)
        if _mtime(raw) >= fresh_cut:
            fresh.append(entry)
        elif st == "missing":
            p0.append(entry)
        else:
            p1.append(entry)

    # 先按 zh 最後編輯時間排（新的優先，對齊 prepare-batch --top）
    for bucket in (fresh, p0, p1):
        bucket.sort(key=lambda x: _mtime(x[1]), reverse=True)
    if order == "reverse":
        p0 = list(reversed(p0))          # 新鮮窗永遠新到舊，不受 reverse 影響
        p1 = list(reversed(p1))
    # 新鮮窗內：失敗沉底 → 純日期新到舊。**刻意不分 P0/P1**——哲宇的話是
    # 「日期近的在更前面」，窗內若再按缺頁/過期分層，昨天的缺頁會插到今天的
    # 過期前面，違反本意。窗外才輪到 P0/P1 分層。
    fresh.sort(key=lambda x: x[2])
    # 其餘：失敗沉底
    p0.sort(key=lambda x: x[2])
    p1.sort(key=lambda x: x[2])

    if oversized and log:
        # 靜默跳過會讓這批永遠隱形（2026-09-09 的 TBD-NEEDS-SLUG 就是這樣藏了
        # 212 篇），所以每輪明講一次數量與前三篇，並指出它們該由誰接。
        log(f"⏭️  {len(oversized)} 篇超過 {max_zh_bytes // 1000}KB，本軌跳過交委派層："
            + "、".join(oversized[:3]) + ("…" if len(oversized) > 3 else ""))

    # 累計失敗到 cascade_exhausted 門檻的，整條佇列最尾（跨桶沉底，不排除）。
    # 2026-09-20：失敗沉底原本只在桶內排序——新鮮窗裡若只剩一篇難篇，它就是隊首，
    # 每次 dispatcher 重啟五個 worker 裡四個先去啃 91 腳註的〈台灣新冠疫情與疫苗〉
    # 二十幾分鐘（09-19 memory 記了兩晚）。canonical 說的「沉底」是整條佇列的底。
    def _split_exhausted(bucket: list) -> tuple[list, list]:
        keep = [e for e in bucket if e[2] < CASCADE_EXHAUSTED_FAIL_COUNT]
        tail = [e for e in bucket if e[2] >= CASCADE_EXHAUSTED_FAIL_COUNT]
        return keep, tail
    fresh, ex_f = _split_exhausted(fresh)
    p0, ex_0 = _split_exhausted(p0)
    p1, ex_1 = _split_exhausted(p1)
    exhausted = ex_f + ex_0 + ex_1
    if exhausted and log:
        log(f"⤵️  {lang}: {len(exhausted)} 篇累計失敗 ≥{CASCADE_EXHAUSTED_FAIL_COUNT} 次，排到本語言佇列最尾（不排除）："
            + "、".join(z for z, _, _, _ in exhausted[:3]) + ("…" if len(exhausted) > 3 else ""))
    ex_paths = [z for z, _, _, _ in exhausted]

    fresh_p0 = [z for z, _, _, tier in fresh if tier == 0]
    fresh_p1 = [z for z, _, _, tier in fresh if tier == 1]
    p0_paths = fresh_p0 + [z for z, _, _, _ in p0]
    p1_paths = fresh_p1 + [z for z, _, _, _ in p1]
    if priority == "all":
        # 新鮮窗整批（含 stale）優先於一般 P0；耗盡篇壓陣
        return ([z for z, _, _, _ in fresh]
                + [z for z, _, _, _ in p0] + [z for z, _, _, _ in p1] + ex_paths)
    if priority == "p0":
        return p0_paths + [z for z, _, _, t in exhausted if t == 0]
    if priority == "p1":
        return p1_paths + [z for z, _, _, t in exhausted if t == 1]
    return p0_paths + p1_paths + ex_paths  # all: P0 first, then P1, 耗盡篇壓陣


def build_slug_map(run_dir: Path) -> Path:
    """From knowledge/_translations.json: for every zh_path with a translation
    in ANY language, slug = that file's basename without .md. Shared across all
    target langs (site convention: slug is the same file basename regardless of
    target language).

    Why any-language and not en-only (2026-07-27): the en-only read starved
    every zh article whose filename is pure Chinese and whose en translation
    doesn't exist yet — no en entry meant no slug, no slug meant the ASCII
    fallback produced TBD-NEEDS-SLUG, and collect_and_filter_groups then
    skipped it forever. 27 articles were in that state, 23 of which already
    had a perfectly good canonical slug sitting in ja/es/fr (唐鳳 →
    audrey-tang, 閃靈 → chthonic). The docstring already claimed the slug is
    language-independent; the code just wasn't reading it that way. en still
    wins when present, so existing canonical slugs never shift.

    TBD-NEEDS-SLUG entries are refused outright: knowledge/_translations.json
    can itself carry them (the orphan rescue committed 8 such files), and
    feeding one back in would propagate the placeholder to every other
    language for that article.

    knowledge/_slug-map.json then fills whatever is still empty — the articles
    with no translation in any language yet, where there is nothing to reverse
    it out of. It is deliberately lowest precedence: a curated entry can never
    move a slug that is already live."""
    trans = json.loads(TRANSLATIONS_JSON.read_text(encoding="utf-8"))
    slug_map = {}
    for key, zh_val in trans.items():
        stem = Path(key).stem
        if "TBD-NEEDS-SLUG" in stem:
            continue
        # en wins; any other language only fills a gap it would otherwise leave.
        if key.startswith("en/") or zh_val not in slug_map:
            slug_map[zh_val] = stem
    curated_path = REPO / "knowledge/_slug-map.json"
    if curated_path.exists():
        curated = json.loads(curated_path.read_text(encoding="utf-8"))
        for zh_val, stem in curated.items():
            if zh_val.startswith("_") or not isinstance(stem, str):
                continue  # _readme block
            slug_map.setdefault(zh_val, stem)
    out = run_dir / "slug-map.json"
    out.write_text(json.dumps(slug_map, ensure_ascii=False, indent=1) + "\n", encoding="utf-8")
    return out


def run_prepare_batch(lang: str, zh_paths: list, slug_map_path: Path, round_dir: Path, log: Logger) -> None:
    round_dir.mkdir(parents=True, exist_ok=True)
    worklist_file = round_dir / "worklist.txt"
    worklist_file.write_text("\n".join(zh_paths) + "\n", encoding="utf-8")
    cmd = [
        "python3", "scripts/tools/lang-sync/prepare-batch.py",
        "--lang", lang, "--input", str(worklist_file),
        "--groups", str(len(zh_paths)),          # one group == one article: gives us per-article
        "--slug-map", str(slug_map_path),         # dispatch/timing/report granularity for free
        "--outdir", str(round_dir),
    ]
    r = subprocess.run(cmd, cwd=REPO, capture_output=True, text=True)
    log(f"prepare-batch {lang}: exit={r.returncode}")
    log(r.stdout[-1500:])
    if r.returncode not in (0, 2):  # 2 = "some slugs fell back to ASCII placeholder", non-fatal
        log(f"⚠️  prepare-batch {lang} unexpected exit {r.returncode}\n{r.stderr[-1000:]}")


def collect_and_filter_groups(round_dir: Path, lang: str, seen_missing_slug: set, log: Logger) -> list:
    """Post-process prepare-batch.py's output: drop groups whose slug
    resolution failed (TBD-NEEDS-SLUG, logged once per zh_path for the whole
    run), plus cross-engine dedupe with concurrent dispatchers writing the
    same knowledge/{lang}/ tree.

    Dedupe rule is STATUS-AWARE (2026-07-24 v2 — v1 skipped on bare file
    existence, which is wrong for stale work: a stale article's target file
    exists BY DEFINITION, so the classic-langs run skipped its entire P1
    worklist, queueing 14 of ~600). Now:
      - status "missing": file exists >1KB → another engine just created it;
        skip, next round's status refresh reconciles.
      - stale flavors: file existing is the norm; skip only when its mtime is
        within the last 10 min (a concurrent engine just rewrote it)."""
    good = []
    now = time.time()
    for gf in sorted(round_dir.glob("_group-*.json")):
        try:
            data = json.loads(gf.read_text(encoding="utf-8"))
        except json.JSONDecodeError as e:
            # 2026-07-26：prepare-batch 偶爾產出被截斷或多寫一份的 group 檔
            #（"Extra data: line 26"），整條產線就在這裡整個崩掉——一個壞掉的
            # 任務檔不該讓上百篇的佇列一起停擺。跳過該檔繼續，並留訊息可追。
            log(f"⚠️  group 檔解析失敗，跳過：{gf.name}（{e}）")
            continue
        arts = data.get("articles", [])
        if not arts:
            continue
        art = arts[0]
        zh_path, en_path = art["zh_path"], art["en_path"]
        status = art.get("status", "missing")
        if "TBD-NEEDS-SLUG" in en_path:
            key = f"{lang}:{zh_path}"
            if key not in seen_missing_slug:
                seen_missing_slug.add(key)
                log(f"⚠️  skip {zh_path} ({lang}): slug resolution failed (TBD-NEEDS-SLUG) — needs --slug-map entry")
            continue
        target = REPO / en_path
        if target.exists() and target.stat().st_size > 1024:
            if status == "missing":
                log(f"⏭️  skip {zh_path} ({lang}): {en_path} already exists (cross-engine dedupe, was missing)")
                continue
            if now - target.stat().st_mtime < 600:
                log(f"⏭️  skip {zh_path} ({lang}): {en_path} rewritten <10min ago (cross-engine dedupe)")
                continue
        good.append((lang, gf, zh_path))
    return good


def interleave_by_lang(per_lang_tasks: dict) -> list:
    """Round-robin across langs so no lang starves a slow one."""
    tasks = []
    iters = [iter(v) for v in per_lang_tasks.values()]
    for row in zip_longest(*iters, fillvalue=None):
        for item in row:
            if item is not None:
                tasks.append(item)
    return tasks


# ────────────────────────── dispatch ──────────────────────────

def do_commit(lang: str, state: RunState, no_commit: bool, log: Logger) -> None:
    with state.lock:
        n = state.pending_ok[lang]
        workers = set(state.pending_workers[lang])
        files = list(state.pending_files[lang])
        state.pending_ok[lang] = 0
        state.pending_workers[lang] = set()
        state.pending_files[lang] = []
        state.pending_since.pop(lang, None)
    if n == 0:
        return
    if no_commit:
        log(f"⏭️  --no-commit: would commit {lang} batch of {n} (workers={sorted(workers)}) files={files}")
        return
    # Refresh derived JSONs FIRST, then take the lock and commit (matches
    # legacy invariant: status/translations caches never lag behind the
    # commit that introduces the files they describe).
    try:
        FAIL_MEMO.write_text(json.dumps(dict(state.fail_counts), ensure_ascii=False),
                             encoding="utf-8")
    except Exception:
        pass
    files.append(str(FAIL_MEMO.relative_to(REPO)))   # 難篇記憶隨批次入版控
    subprocess.run(["python3", "scripts/tools/sync-translations-json.py"], cwd=REPO, capture_output=True, text=True)
    subprocess.run(["python3", "scripts/tools/lang-sync/status.py"], cwd=REPO, capture_output=True, text=True)
    git_lock_commit(lang, workers, files, log)


PATCH_REJECT_ESCALATE = 5


def patch_reject_count(lang: str, zh_path: str) -> int:
    """讀 fail-reasons.json，回傳這篇 patch engine 被 verify trio 拒絕過幾次。

    v1.53 診斷（ja/金瓜石連續 13 次同型失敗）：patch-translate.py exit=1 時
    v1.11 刻意不 fallback 全文（避免同一輪對同一篇燒兩次算力），但沒有累計
    次數的升級機制，難篇會永遠卡在同一個章節重試迴圈，13 次都選中同一句。
    這裡只讀既有的 fail-reasons.json 側錄（2026-07-31 已上線），不新增狀態。
    """
    try:
        if not FAIL_REASONS.exists():
            return 0
        store = json.loads(FAIL_REASONS.read_text(encoding="utf-8"))
        return store.get(f"{lang}:{zh_path}", {}).get(
            "patch candidate rejected by verify trio (exit=1)", 0)
    except Exception:
        return 0


def structured_fallback_policy(cascade_spec: str, primary_output: str) -> tuple[bool, str | None]:
    """用同 run 的實績決定零產物後是否值得換 structured engine。

    structured 是「換翻譯結構」，不是「換 backend」。因此同一 backend 已明確
    容量故障時重跑沒有資訊增益；而 2026-07-29 本 run 的 desktop Ollama 0/29、
    Laguna 0/14（約 20 worker-hours）證明這兩類 backend 的 structured fallback
    已是確定性長尾。Nemotron 仍有 5/38 救回，保留該路徑。這裡只縮救援 eligibility，
    不改 primary translate、verify trio 或下一輪重試。
    """
    terminal_markers = (
        "all OpenRouter keys rate-limit",
        "all OpenRouter keys rate-limited or failed",
        "Provider returned error",
        "Available: []",
    )
    if any(marker in primary_output for marker in terminal_markers):
        return False, "backend-capacity"
    backend = cascade_spec.split("@", 1)[0]
    if not backend.startswith("openrouter:nvidia/nemotron-3-ultra-550b-a55b"):
        return False, "backend-adaptation"
    return True, None


def process_task(worker: Worker, lang: str, group_path: Path, zh_path: str,
                  state: RunState, report: JsonlWriter, freezes: JsonlWriter,
                  no_commit: bool, commit_every: int, log: Logger,
                  engine: str = "whole", no_patch: bool = False,
                  no_noop_bump: bool = False) -> None:
    data = json.loads(group_path.read_text(encoding="utf-8"))
    art = data["articles"][0]
    trans_path = art["en_path"]
    status = art.get("status", "missing")

    t0 = time.monotonic()
    # 報表欄位必須在所有 engine / output / gate 分支都有值。v1.7 首版誤把
    # 初始化放進 try_semantic_noop_bump()，導致「模型有落檔但 QA fail」時
    # 寫報表觸發 UnboundLocalError，整個 dispatcher（而非單篇）被殺掉。
    structured_fallback = False
    structured_fallback_exit = None
    structured_fallback_skip_reason = None
    target = REPO / trans_path
    # 「路徑存在」不能代表本次 backend 有落檔：stale 任務天生就有舊譯文。
    # 先留執行前 bytes，後面只把新增或真正改動過的 target 算成本次產物。
    # 2026-07-29 4090 endpoint 瞬斷時 translate.py calls=0 / exit=1，舊邏輯
    # 卻拿原本的 stale 檔跑 gate，40 次連線失敗被誤記成 verify=4。
    target_before = target.read_bytes() if target.exists() else None

    def target_changed() -> bool:
        if not target.exists():
            return False
        if target_before is None:
            return target.stat().st_size > 0
        return target.read_bytes() != target_before

    # 語意無關 stale 零成本 bump（2026-07-27，見上方 try_semantic_noop_bump 註解 +
    # reports/semantic-noop-stale-2026-07-27.md）：在章節級 diff-patch 之前先問一句
    # 「zh diff 是不是只有標點/空白」——命中就直接 bump provenance hash，完全不叫
    # 任何模型，不占用 worker 名額也不算 worker 失敗/成功次數（沒有 worker 真的做事）。
    if status == "stale" and not no_noop_bump and try_semantic_noop_bump(zh_path, trans_path, log):
        elapsed = time.monotonic() - t0
        report.write({
            "ts": datetime.now().astimezone().isoformat(timespec="seconds"),
            "lang": lang, "zh": zh_path, "trans": trans_path,
            "worker": worker.label, "ok": True, "seconds": round(elapsed, 1),
            "backend": f"ollama:{worker.model}" if worker.model else worker.cascade_spec,
            "fail_reason": None, "disposition": "kept", "via": "semantic-noop-bump",
        })
        # Bookkeeping mirrors the tail of this function's normal success path
        # (kept as an explicit early-return rather than a shared helper — this
        # file runs in 4 concurrently-active pipelines right now and the tail
        # block is load-bearing/tested; duplicating ~12 lines is cheaper than
        # risking a refactor regression in code already in flight).
        with state.lock:
            state.last_worker[f"{lang}:{zh_path}"] = worker.label
            state.in_flight.discard(f"{lang}:{zh_path}")
            state.total_ok += 1
            state.pending_ok[lang] += 1
            state.pending_workers[lang].add(worker.label)
            state.pending_files[lang].append(trans_path)
            state.pending_since.setdefault(lang, time.monotonic())
            age = time.monotonic() - state.pending_since.get(lang, time.monotonic())
            reached = state.pending_ok[lang] >= commit_every or age >= 5400
        if reached:
            do_commit(lang, state, no_commit, log)
        return

    # --lang MUST be explicit: translate.py's --group mode defaults to
    # `lang = args.lang or group_path.parent.name`, and our run-dir layout is
    # tasks/{lang}/round{N}/_group-*.json — parent.name is "round01", not the
    # lang. Without this, LANG_NAMES.get(lang, lang) silently falls through to
    # the literal string "round01" as the target-language name in the
    # translation prompt (caught in the first smoke-test run — 2/2 verify
    # failures, both explained by this bug once inspected).
    def _backend_spec() -> str:
        b = worker.cascade_spec
        if b.split("@")[0] == "ollama":
            m = worker_env(worker).get("OLLAMA_MODEL", "")
            return f"ollama:{m}" if m else "ollama"
        return b

    # 章節級 diff-patch（2026-07-27）：stale 任務先試只重翻被 zh diff 碰過的 H2
    # 章節，未碰章節原樣保留舊譯文——實測全站 stale 改動比例中位 2.8%，整篇重翻
    # 是為 3% 的改動燒 100% 算力。patch-translate.py exit 2 = 章節數不對齊／改動
    # 過大／sha 不可解析等不適合 patch 的情況，fallback 回下面既有的全文路徑；
    # exit 1 = 有試但驗證沒過（patch-translate.py 自己已跑過三重驗證，沒寫檔），
    # 直接沿用既有 gate-fail 處理，不重試 fallback 全文（避免同一輪對同一篇燒
    # 兩次算力）——除非這篇已經被拒絕過 PATCH_REJECT_ESCALATE 次（見下方
    # patch_reject_count），代表反覆卡在同一個章節重試迴圈，這時跳過 patch
    # 直接走整篇重翻（v1.53 診斷：ja/金瓜石連續 13 次同型 patch-reject 死鎖）。
    proc: subprocess.CompletedProcess | None = None
    engine_label = engine
    if status == "stale" and not no_patch:
        reject_count = patch_reject_count(lang, zh_path)
        if reject_count >= PATCH_REJECT_ESCALATE:
            log(f"⏫ patch-reject 累計 {reject_count} 次（≥{PATCH_REJECT_ESCALATE}）— "
                f"跳過 patch engine，強制整篇重翻 ({lang}:{zh_path})")
        else:
            pcmd = ["python3", "-u", "scripts/tools/lang-sync/patch-translate.py",
                    zh_path, "--lang", lang, "--backend", _backend_spec(), "--out", trans_path]
            pproc = subprocess.run(pcmd, cwd=REPO, env=worker_env(worker), capture_output=True, text=True)
            if pproc.returncode == 2:
                log(f"⏩ patch-translate not applicable ({lang}:{zh_path}, exit=2) — "
                    f"fallback to full retranslate\n{(pproc.stdout + pproc.stderr)[-800:]}")
            else:
                proc = pproc
                engine_label = "patch"

    # Heavy-footnote structured-first（2026-08-06，OBSERVER-QUEUE #5 default-action 執行）：
    # 整篇式對重腳註檔有已量測的天花板（~23fn，reports/babel-health-2026-07-18.md §G），
    # ≥30fn 的 zh 檔（實測 148 篇）走整篇路徑幾乎必死，先燒一次 worker 再等 fallback
    # 是純浪費。structured 引擎 Phase N 按 ≤15 條分批、腳註構造上守恆（pilot 6/6 全綠、
    # 仍走同一組 verify trio），對 heavy 檔直接當 primary。只影響整篇重翻路徑：stale
    # 的 patch 引擎照舊先試（局部重翻對 heavy 檔更省）。BABEL_STRUCTURED_FN_THRESHOLD
    # 環境變數可調閾值（<=0 停用；預設 30）。
    if proc is None and engine == "whole":
        try:
            _fn_threshold = int(os.environ.get("BABEL_STRUCTURED_FN_THRESHOLD", "30"))
        except ValueError:
            _fn_threshold = 30
        if _fn_threshold > 0:
            try:
                _zh_fn_count = len(set(re.findall(
                    r"^\[\^([^\]]+)\]:",
                    (KNOWLEDGE / zh_path).read_text(encoding="utf-8"), re.M)))
            except OSError:
                _zh_fn_count = 0
            if _zh_fn_count >= _fn_threshold:
                engine = "structured"
                engine_label = "structured-heavy"
                log(f"⏫ heavy-footnote {_zh_fn_count}fn ≥ {_fn_threshold} → "
                    f"structured-first ({lang}:{zh_path})")

    if proc is None:
        if engine == "structured":
            # 分段式引擎吃單篇介面（zh_path 相對 knowledge/、backend 單一 spec）。
            # ollama worker 的 cascade_spec 是裸 "ollama"（模型在 env OLLAMA_MODEL），
            # structured 端要組回 ollama:<model>；openrouter spec 原樣可用。
            cmd = ["python3", "-u", "scripts/tools/lang-sync/structured-translate.py",
                   zh_path, "--lang", lang, "--backend", _backend_spec(),
                   "--out", trans_path, "--skip-validators"]
            # --skip-validators：dispatcher 的 verify trio 是唯一裁判；引擎內建
            # 驗證再跑一次是同一把尺跑兩遍，純浪費。
        else:
            cmd = ["python3", "-u", "scripts/tools/lang-sync/translate.py",
                   "--group", str(group_path), "--lang", lang,
                   "--cascade", worker.cascade_spec, "--no-preflight"]
        proc = subprocess.run(cmd, cwd=REPO, env=worker_env(worker), capture_output=True, text=True)
    elapsed = time.monotonic() - t0

    log(f"--- worker={worker.label} lang={lang} zh={zh_path} engine={engine_label} "
        f"exit={proc.returncode} ({elapsed:.0f}s) ---")
    tail = (proc.stdout + ("\n" + proc.stderr if proc.returncode != 0 else ""))
    log(tail[-3000:])

    # 第一條路徑完全沒落檔時，改用「工具持有 Markdown 結構、模型只翻文字」
    # 的 structured engine 救一次。2026-07-28 近一小時 40 個失敗中有 10 個
    # 是 no-output；它們混合 patch abort、截斷、腳註流失等成因，繼續重試
    # 同一全文路徑只會複製失敗。structured pilot 6/6 全綠，且最後仍走下方
    # 同一組 verify trio，所以這是換路徑，不是放寬品質門檻。
    #
    # 只在「沒有任何產物」時啟用；已有輸出但 gate fail 的條件式 fallback
    # 留待這一小步有實績後再擴，避免一次改兩個變因。
    # `translate.py` 已完成 backend discovery 且明確印出 Available: [] 時，
    # 換 structured 引擎仍會打同一個不可達 endpoint。2026-07-29 實跑 18 次
    # 都在首段 10 秒 fail 後再白等約 150 秒，成功 0；這不是「換翻譯路徑」
    # 能救的輸出失敗，而是沒有算力可呼叫。保留 no-output/freeze 訊號，等
    # dispatcher 下一輪再試；不要用同一 worker 立即重複一個已知不可能的呼叫。
    primary_output = proc.stdout + ("\n" + proc.stderr if proc.stderr else "")
    backend_unavailable = "Available: []" in primary_output
    fallback_allowed, fallback_skip_reason = structured_fallback_policy(
        worker.cascade_spec, primary_output
    )
    if (not target_changed() and engine != "structured"
            and engine_label != "patch" and fallback_allowed):
        structured_fallback = True
        scmd = [
            "python3", "-u", "scripts/tools/lang-sync/structured-translate.py",
            zh_path, "--lang", lang, "--backend", _backend_spec(),
            "--out", trans_path, "--skip-validators",
        ]
        log(f"   🔁 no-output → structured fallback ({lang}:{zh_path}, worker={worker.label})")
        sproc = subprocess.run(
            scmd, cwd=REPO, env=worker_env(worker), capture_output=True, text=True,
        )
        structured_fallback_exit = sproc.returncode
        elapsed = time.monotonic() - t0
        log(f"--- structured fallback worker={worker.label} lang={lang} zh={zh_path} "
            f"exit={sproc.returncode} ({elapsed:.0f}s total) ---")
        log((sproc.stdout + ("\n" + sproc.stderr if sproc.returncode != 0 else ""))[-3000:])
        proc = sproc
        engine_label = f"{engine_label}→structured"
    elif (not target_changed() and engine != "structured" and engine_label != "patch"
          and fallback_skip_reason):
        structured_fallback_skip_reason = fallback_skip_reason
        log(f"   ⏭️  no-output structured fallback skipped "
            f"({fallback_skip_reason}; backend={worker.cascade_spec})")

    # AFTER fallback, BEFORE any restore — worker-health signal.
    produced_by_backend = target_changed()

    # patch-translate exit=1 means it attempted the changed chapters but its
    # own verify trio rejected the assembled candidate, then restored the
    # pre-patch file. That restored stale file is not backend output. The old
    # dispatcher nevertheless sent it through the outer gate, so a historical
    # leak/health issue on the stale HEAD version overwrote the real failure
    # attribution (this run's apparent 21 "leaks" included several such patch
    # rejects). Record the patch failure directly; exit=2 remains the explicit
    # "not applicable, try whole article" branch above.
    patch_rejected = engine_label == "patch" and proc.returncode == 1

    if patch_rejected:
        disposition = restore_head_or_quarantine(trans_path, log)
        ok = False
        fail_reason = "patch candidate rejected by verify trio (exit=1)"
    elif not produced_by_backend:
        disposition = restore_head_or_quarantine(trans_path, log)
        if backend_unavailable:
            fail_reason = f"no backend available to translate.py (exit={proc.returncode})"
        else:
            fail_reason = f"no output written by translate.py (exit={proc.returncode})"
        ok = False
    else:
        # Normalize with prettier BEFORE the verify trio, so the gates measure
        # the same bytes the commit-time hook will see: .lintstagedrc runs
        # `prettier --write` on staged files BEFORE `article-health --staged`,
        # so un-normalized output can pass the single-file gate and still fail
        # at commit (2026-07-24 smoke test: 0 issues pre-stage → 11
        # footnote-format violations post-prettier on the same file).
        # 2026-09-19：launchd 環境的 PATH 沒有 node，`npx` 直接 FileNotFoundError，
        # 而這個例外在 ThreadPoolExecutor 裡不會印出來——worker 執行緒靜默死亡，
        # 譯文落了地卻永遠沒有 report 列（兩篇 exit=0 的成品就這樣消失）。改成
        # 先找 repo 內的 node_modules/.bin/prettier，找不到再退 npx，兩者都沒有
        # 就 log 一行照樣往下驗（gate 會看到未正規化的位元組，寧可 verify fail
        # 也不要執行緒死掉）。
        prettier_bin = REPO / "node_modules" / ".bin" / "prettier"
        prettier_cmd = ([str(prettier_bin)] if prettier_bin.exists() else ["npx", "prettier"]) + ["--write", trans_path]
        try:
            subprocess.run(prettier_cmd, cwd=REPO, capture_output=True, text=True)
        except FileNotFoundError as e:
            log(f"   ⚠️ prettier 不可用（{e}）— 跳過正規化直接驗，commit hook 會再跑一次")
        # passthrough 欄位機械 heal（2026-07-25）：模型常漏抄 image/imageCredit/
        # featured/readingTime 這類「本來就不該翻譯、逐字照抄即可」的欄位，
        # verify 把它算 hard fail 於是整篇好譯文被退掉重翻。實測本輪 verify=1
        # 占 21 次 fail，抽查全是這類；跨三語同篇同時中鏢＝模型共同行為非個案。
        # 判斷力該用在「翻得好不好」，不是「URL 有沒有被複製過去」（§14）。
        hr = subprocess.run(
            ["python3", "scripts/tools/lang-sync/heal-passthrough-fields.py",
             zh_path, trans_path],
            cwd=REPO, capture_output=True, text=True)
        if hr.returncode != 0 or "缺檔" in hr.stdout or hr.stderr.strip():
            # 2026-07-25：首版只看 stdout，heal 因路徑解析 bug 每次失敗卻
            # 一聲不吭，整輪 0 次生效（今天修了一整天的靜默吞錯，我自己
            # 在接線時又寫了一個）。失敗一律出聲。
            log(f"   🔴 passthrough heal 失敗 rc={hr.returncode}: "
                f"{(hr.stdout + hr.stderr).strip()[:200]}")
        elif hr.stdout.strip():
            log(f"   🔧 passthrough heal: {hr.stdout.strip()[:150]}")

        # 內部連結 category 大小寫是純機械格式，不應耗掉整篇翻譯。2026-07-28
        # 隔離樣本覆盤：近一小時 17/17 個 link-target health fail 都是模型把
        # `/people/`、`/history/` 等輸出成 `/People/`、`/History/`；既有
        # article-health fixer 能保守修 casing／decode／高信心 fuzzy，但先前
        # dispatcher 只把它當裁判、沒把已存在的修復接進熱路徑。
        lr = subprocess.run(
            ["python3", "scripts/tools/article-health.py", trans_path,
             "--profile=pre-commit", "--check=link-target", "--fix", "--quiet"],
            cwd=REPO, capture_output=True, text=True,
        )
        if lr.returncode != 0:
            log(f"   🔴 link-target heal 失敗 rc={lr.returncode}: "
                f"{(lr.stdout + lr.stderr).strip()[-300:]}")
        elif lr.stdout.strip():
            log(f"   🔧 link-target heal: {lr.stdout.strip()[-200:]}")

        # Prettier 對斜體 caption 內 percent-encoded Commons 檔名有一個
        # 可重現的破壞：URL 中的 `_NN` 會和 caption 結尾 `_` 配對，改寫成
        # `*NN` 後連結 404。2026-07-30 葡／阿同篇各中一次；checker 已能抓，
        # 但只當裁判仍會浪費完整譯文。safe fixer 還原 URL、caption 留純文字，
        # 並把完全相同的連結移到下一個非斜體段落，URL multiset 不變。
        mr = subprocess.run(
            ["python3", "scripts/tools/article-health.py", trans_path,
             "--profile=pre-commit", "--check=link-url-mangle", "--fix", "--quiet"],
            cwd=REPO, capture_output=True, text=True,
        )
        if mr.returncode != 0:
            log(f"   🔴 link-url-mangle heal 失敗 rc={mr.returncode}: "
                f"{(mr.stdout + mr.stderr).strip()[-300:]}")
        elif mr.stdout.strip():
            log(f"   🔧 link-url-mangle heal: {mr.stdout.strip()[-200:]}")

        # 腳註格式也有一小塊能安全機械修復。2026-07-28 隔離樣本覆盤：
        # 最新 8 個 footnote-format fail 中，safe-only fixer 完整救回 1 個，
        # 另 2 個只修掉安全子集、仍由 hard gate 擋下；其餘 5 個完全不動。
        # fixer 刻意不碰 APA／多連結等可能遺失資訊的格式，所以接進熱路徑
        # 不會放寬 gate，只省掉「純缺 description」這類確定性重翻。
        fr = subprocess.run(
            ["python3", "scripts/tools/article-health.py", trans_path,
             "--profile=pre-commit", "--check=footnote-format", "--fix", "--quiet"],
            cwd=REPO, capture_output=True, text=True,
        )
        if fr.returncode != 0:
            log(f"   🔴 footnote-format heal 失敗 rc={fr.returncode}: "
                f"{(fr.stdout + fr.stderr).strip()[-300:]}")
        elif fr.stdout.strip():
            log(f"   🔧 footnote-format heal: {fr.stdout.strip()[-200:]}")

        ok, fail_reason = verify_one(zh_path, trans_path, log)
        if not ok:
            # 隔離前存證（2026-07-24）：失敗 blob 直接 unlink/restore 就沒有
            # 屍體可驗，反覆 fail 的 pattern 只能用猜的。留一份在 run dir
            # 供 post-mortem（gate 假陽性家族診斷全靠這個）。
            try:
                qdir = report.path.parent / "quarantine"
                qdir.mkdir(exist_ok=True)
                (qdir / f"{lang}--{Path(trans_path).stem}.md").write_text(
                    target.read_text(encoding="utf-8"), encoding="utf-8")
            except Exception:
                pass
        disposition = "kept" if ok else restore_head_or_quarantine(trans_path, log)

    report.write({
        "ts": datetime.now().astimezone().isoformat(timespec="seconds"),
        "lang": lang, "zh": zh_path, "trans": trans_path,
        "worker": worker.label, "ok": ok, "seconds": round(elapsed, 1),
        "backend": f"ollama:{worker.model}" if worker.model else worker.cascade_spec,
        "fail_reason": fail_reason, "disposition": disposition,
        "engine": engine_label,
        "structured_fallback": structured_fallback,
        "structured_fallback_exit": structured_fallback_exit,
        "structured_fallback_skip_reason": structured_fallback_skip_reason,
    })

    # 2026-09-22：後端容量失敗（上游 429／provider error／key 池全空／本機斷網）說的是
    # 後端此刻沒容量，不是這篇文章難；卻跟閘門拒收一樣記進難篇帳 fail_counts，累滿 8 次
    # 沉到隊尾、再進 cascade-exhausted 清單（#38 (d) 混維度：容量 vs 難度）。02:26 起
    # laguna 上游限流 20 分鐘，統一企業／許倬雲／高速公路三篇各白背一筆。這類失敗照常
    # 寫 report 列、照常算 worker 健康帳（另一段的 hard_fail 邏輯），只是不算文章的帳。
    CAPACITY_FAIL_MARKERS = (
        "all OpenRouter keys rate-limit",
        "all OpenRouter keys rate-limited or failed",
        "Provider returned error",
        "Available: []",
        "nodename nor servname",
        "Temporary failure in name resolution",
        "Name or service not known",
        "Network is unreachable",
        "No route to host",
    )
    capacity_fail = (not ok) and any(m in primary_output for m in CAPACITY_FAIL_MARKERS)
    if capacity_fail:
        log(f"⏸ 後端容量失敗（{worker.label}）— 不計 {lang}:{zh_path} 的難篇帳")

    just_exhausted = False
    with state.lock:
        state.last_worker[f"{lang}:{zh_path}"] = worker.label
        if not ok and not capacity_fail:
            state.quarantine_log[lang].add(zh_path)
            state.fail_counts[f"{lang}:{zh_path}"] += 1
            # cascade exhausted escalation（義務鐵律第 4 條，OBSERVER-QUEUE #18(c)，
            # 哲宇 2026-09-05 拍板）：edge-trigger 在累計失敗次數「剛好跨過」門檻的
            # 那一次記一筆，不是每次失敗都記（否則同一篇會洗版 report.jsonl）。
            # 真正的 escalate 工作（檔案 I/O／可能改 OBSERVER-QUEUE.md）留到鎖外做，
            # 見本函式尾端——lock 只保護記憶體狀態，不該扛著它做 I/O。
            just_exhausted = state.fail_counts[f"{lang}:{zh_path}"] == CASCADE_EXHAUSTED_FAIL_COUNT
            # 每次失敗即時 flush 難篇記憶（2026-07-31）：原本只在 commit-every-50
            # 落盤，低通過率時整個 run 一次都沒存；產線重啟後記憶歸零，兩篇
            # 隊首難篇（外送專法／苯駢芘）在同一天被三次重啟各重撞一輪。
            # 磁碟寫入走 max-merge（別條產線可能剛寫過），檔案小、失敗頻率低，
            # 每次 flush 的成本遠低於一次 500-1700s 的重複撞牆。
            try:
                merged = dict(state.fail_counts)
                if FAIL_MEMO.exists():
                    for k, v in json.loads(FAIL_MEMO.read_text(encoding="utf-8")).items():
                        if v > merged.get(k, 0):
                            merged[k] = v
                FAIL_MEMO.write_text(json.dumps(merged, ensure_ascii=False),
                                     encoding="utf-8")
            except Exception:
                pass
            # 原因側錄：{key: {reason_bucket: 次數}}。bucket 取 fail_reason 的
            # 閘門名（方括號前那段），保留原始細目在值裡不夠用時可回 report.jsonl。
            try:
                reason = (fail_reason or "unknown").strip()
                bucket = reason.split("[")[0].strip() or "unknown"
                if "[" in reason:
                    bucket = f"{bucket} [{reason.split('[', 1)[1].split(']')[0]}]"
                store = {}
                if FAIL_REASONS.exists():
                    store = json.loads(FAIL_REASONS.read_text(encoding="utf-8"))
                per = store.setdefault(f"{lang}:{zh_path}", {})
                per[bucket] = per.get(bucket, 0) + 1
                FAIL_REASONS.write_text(json.dumps(store, ensure_ascii=False, indent=0),
                                        encoding="utf-8")
            except Exception:
                pass
        state.in_flight.discard(f"{lang}:{zh_path}")

    if just_exhausted:
        record_cascade_exhaustion(state, lang, zh_path, CASCADE_EXHAUSTED_FAIL_COUNT, report, log)

    # Worker health: 3 consecutive hard failures (exit!=0 AND the backend
    # never even produced a file) → freeze 30min. A gate-fail on output the
    # backend DID produce is a quality issue, not a worker-availability
    # issue, so it does not count here.
    #
    # 環境不可用不算 worker 健康帳（2026-07-31）：本機斷網／睡眠時每個 worker
    # 都會連撞三次 DNS 失敗而被凍 30 分，四個 worker 全凍後 dispatcher 進入
    # 5 分鐘 sleep 迴圈；網路一秒後回來也沒人知道，實測空轉 1.5 小時。
    # 這是 REFLEXES #38「混維度」——「模型產不出東西」跟「這台沒網路」兩種
    # 完全不同的根因共用同一個計數器，於是對後者用了前者的處置。
    # 環境類失敗改為：不累計、不凍結，短暫等待讓下一輪自然重試（網路回來
    # 就立刻恢復產能）。判準取最保守的一組字樣，避免把模型層失敗誤放行。
    ENV_FAIL_MARKERS = (
        "nodename nor servname",     # macOS DNS 解析失敗（睡眠／斷網）
        "Temporary failure in name resolution",
        "Name or service not known",
        "Network is unreachable",
        "No route to host",
    )
    env_unavailable = any(m in primary_output for m in ENV_FAIL_MARKERS)
    hard_fail = proc.returncode != 0 and not produced_by_backend and not env_unavailable
    if env_unavailable:
        log(f"🌐 環境不可用（非 worker 問題）— {worker.label} 不計入凍結帳，等網路回來自然重試")
    if hard_fail:
        worker.consecutive_failures += 1
        if worker.consecutive_failures >= 3:
            worker.frozen_until = time.monotonic() + 30 * 60
            worker.consecutive_failures = 0
            freezes.write({
                "ts": datetime.now().astimezone().isoformat(timespec="seconds"),
                "worker": worker.label, "reason": "3 consecutive hard failures (no output produced)",
                "frozen_for_s": 1800,
            })
            log(f"🥶 FREEZE worker={worker.label} for 30min — 3 consecutive hard failures")
    else:
        worker.consecutive_failures = 0

    if ok:
        with state.lock:
            state.total_ok += 1
            state.pending_ok[lang] += 1
            state.pending_workers[lang].add(worker.label)
            state.pending_files[lang].append(trans_path)
            state.pending_since.setdefault(lang, time.monotonic())
            if worker.tier in ("tier6", "tier7"):
                state.tier_success_count[worker.tier] += 1
            # 門檻或年齡任一到就 commit——年齡檢查原本只在輪次結束跑，但一輪
            # 可能長達數小時，譯文在工作區懸空（2026-07-25 21:32 實測 30+ 篇
            # 未 commit 懸空 2 小時）。懸空檔案會被並行 session 的 merge 防護
            # 誤掃，風險大於多一個零頭 commit。
            age = time.monotonic() - state.pending_since.get(lang, time.monotonic())
            reached = state.pending_ok[lang] >= commit_every or age >= 5400
        if reached:
            do_commit(lang, state, no_commit, log)


def wait_if_frozen(worker: Worker, workers: list, log: Logger) -> None:
    while True:
        now = time.monotonic()
        if not worker.frozen_until or now >= worker.frozen_until:
            return
        if all(w.frozen_until and w.frozen_until > now for w in workers):
            log("🥶 all workers frozen — sleeping 5min (work still queued)")
            time.sleep(300)
        else:
            time.sleep(10)


def make_restricted_task_filter(worker: Worker, state: RunState, report: JsonlWriter, log: Logger):
    """Tier 6/7 eligibility + nightly-cap gate (OBSERVER-QUEUE #18，2026-09-05
    拍板). Returns a `(lang, zh_path) -> bool` closure for TaskQueue.claim(),
    or None for a "normal" worker (no restriction).

    Eligibility set (`state.restricted_eligible`) is recomputed once per
    round by compute_restricted_eligible() — P0 missing OR CRITICAL(<0.5)
    truncated only, never plain stale (07-25 哲宇因算力爆炸關過 rewrite 的
    前車之鑑：付費 tier 絕不能對一般 stale 開放).

    Tier 7 additionally requires the task to have already failed at least
    once THIS run (`state.fail_counts` proxy for "Tier 6 也失敗過") — a
    worker pool has no single-call cascade to fall through, so "已經試過
    便宜的路" is approximated by "已經在 fail_counts 記過至少一次"，而不是
    嚴格保證 Tier 6 specifically already touched it.
    """
    if worker.tier not in ("tier6", "tier7"):
        return None

    def _eligible(lang: str, zh_path: str) -> bool:
        key = (lang, zh_path)
        with state.lock:
            if key not in state.restricted_eligible:
                return False
            cap = state.tier6_cap if worker.tier == "tier6" else state.tier7_cap
            if state.tier_success_count[worker.tier] >= cap:
                if worker.tier not in state.tier_cap_reached_logged:
                    state.tier_cap_reached_logged.add(worker.tier)
                    report.write({
                        "ts": datetime.now().astimezone().isoformat(timespec="seconds"),
                        "event": f"{worker.tier}_cap_reached", "tier": worker.tier, "cap": cap,
                    })
                    log(f"🧯 {worker.tier} 每夜上限 {cap} 已達 — 本輪起跳過剩餘 {worker.tier} 候選，留到下一夜")
                return False
            if worker.tier == "tier7" and state.fail_counts.get(f"{lang}:{zh_path}", 0) < 1:
                return False  # 最後手段——只在這篇本 run 已經失敗過至少一次才碰
        return True

    return _eligible


def make_task_filter(worker: Worker, state: RunState, report: JsonlWriter, log: Logger,
                     excl_cache: Optional["ExclusionCache"] = None):
    """Compose the hard gates a worker can carry: Tier 6/7 eligibility
    (make_restricted_task_filter), the per-worker language skip list
    (`--worker-skip-langs`, 2026-09-19), and the live origin dedupe list
    (`ExclusionCache`, 2026-09-20 — same gate for every worker, so a pair
    that origin has since translated is dropped by whoever claims it, mid-round).
    Absent gates return None (unrestricted); present ones → AND.

    為什麼有 skip list：SQUEEZE §模型×語言適配寫「弱適配開專軌繞過，不要加大
    重試」，但統一調度器沒有軌可切——preflight 連夜報 gemma4:e4b × ar 6%／× pt
    5%、laguna-s × hi 12% 這類組合，每一次嘗試都是完整 GPU 時間加一次閘門，
    09-18 一夜約 80 次嘗試換 8 篇。skip list 讓那些 worker 把輪次讓給它擅長
    的語言；starvation guard 在 main() 做（某語言不能被所有 worker 同時跳過）。
    """
    tier_filter = make_restricted_task_filter(worker, state, report, log)
    skip = worker.skip_langs
    live_excl = excl_cache if (excl_cache is not None and excl_cache.path is not None) else None
    if not skip and live_excl is None:
        return tier_filter

    def _ok(lang: str, zh_path: str) -> bool:
        if skip and lang in skip:
            return False
        if live_excl is not None and live_excl.excluded(lang, zh_path):
            return False
        return tier_filter(lang, zh_path) if tier_filter is not None else True

    return _ok


TOPUP_PER_LANG = 10   # 每次補貨每語言最多排進幾篇（小批：讓剛完成的檔下輪 status 重算後再進場）


def topup_queue(worker: Worker, queue: TaskQueue, state: RunState, langs: list, args,
                run_dir: Path, round_num: int, slug_map_path: Path, seen_missing_slug: set,
                log: Logger, exclusions: set | None = None) -> bool:
    """輪中補貨：worker 在本輪佇列裡再也 claim 不到東西時，替它從 backlog 撈一批
    它接得了的語言，直接 extend 進同一個佇列。回 True = 補到了，worker 續跑；
    False = 這個 worker 能接的語言在全庫 backlog 裡都沒東西了，照舊退出等輪次結束。

    為什麼需要（2026-09-21 run 33830 實撞）：一輪 = 每語言 10×worker 篇，十二語 564 篇；
    三個地端 gemma worker 切軌跳過 pt/ru，22:30 把其他十語的份額吃完後 worker_loop
    直接 return，剩下 32 篇 pt/ru 由兩個雲端 worker 以每篇 10–35 分鐘慢慢磨，
    三張 GPU 空等 3–5 小時等輪次結束才能拿到下一輪的貨；而這個尾巴每一輪都會出現，
    因為切軌讓「誰能接哪種語言」不再對稱。三重巡檢看不到它：進程活著、log 在動、
    report 也有新列（雲端 worker 的）。
    補貨不重排本輪已排過的 (lang, zh)（state.round_seen），也不碰 in_flight；
    Tier 6/7 restricted worker 不補貨（它們的資格集合每輪重算，補貨會繞過那道帳）。"""
    if worker.tier != "normal":
        return False
    eligible_langs = [l for l in langs if l not in worker.skip_langs]
    if not eligible_langs:
        return False
    with state.topup_lock:
        try:
            status_data = refresh_status(log)
        except Exception as e:  # noqa: BLE001
            log(f"⚠️  top-up status refresh 失敗（worker={worker.label}）：{e}")
            return False
        with state.lock:
            seen = set(state.round_seen) | set(state.in_flight)
            fail_counts = dict(state.fail_counts)
        per_lang: dict = {}
        state.topup_seq += 1
        seq = state.topup_seq
        for lang in eligible_langs:
            try:
                worklist_full = build_worklist(status_data, lang, args.priority, args.order,
                                               max_zh_bytes=args.max_zh_bytes, log=None,
                                               fail_counts=fail_counts, exclude=exclusions)
            except Exception as e:  # noqa: BLE001
                log(f"⚠️  top-up build_worklist {lang} 失敗：{e}")
                continue
            fresh = [zh for zh in worklist_full if f"{lang}:{zh}" not in seen][:TOPUP_PER_LANG]
            if not fresh:
                continue
            round_dir = run_dir / "tasks" / lang / f"round{round_num:02d}-topup{seq:02d}"
            run_prepare_batch(lang, fresh, slug_map_path, round_dir, log)
            groups = collect_and_filter_groups(round_dir, lang, seen_missing_slug, log)
            if groups:
                per_lang[lang] = groups
        if not per_lang:
            log(f"💤 worker={worker.label} 本輪已無可接任務，backlog 裡它能接的語言"
                f"（{','.join(eligible_langs)}）也沒有新貨——退出等輪次結束")
            return False
        tasks = interleave_by_lang(per_lang)
        with state.lock:
            state.round_seen.update(f"{l}:{z}" for l, _g, z in tasks)
        queue.extend(tasks)
        log(f"🔄 top-up #{seq}（worker={worker.label} 空手）：補進 {len(tasks)} 篇 "
            f"({', '.join(f'{l}={len(v)}' for l, v in per_lang.items())})")
        return True


def worker_loop(worker: Worker, workers: list, queue: TaskQueue, state: RunState,
                 report: JsonlWriter, freezes: JsonlWriter, no_commit: bool,
                 commit_every: int, log: Logger,
                 engine: str = "whole", no_patch: bool = False,
                 no_noop_bump: bool = False, excl_cache: Optional["ExclusionCache"] = None,
                 topup=None) -> None:
    task_filter = make_task_filter(worker, state, report, log, excl_cache)
    while True:
        wait_if_frozen(worker, workers, log)
        with state.lock:
            last_worker_snapshot = dict(state.last_worker)
        task = queue.claim(worker.label, last_worker_snapshot, task_filter)
        if task is None:
            # 2026-09-21：空手不直接退出，先向 backlog 補貨（見 topup_queue）。
            if topup is not None:
                try:
                    if topup(worker, queue):
                        continue
                except Exception as e:  # noqa: BLE001
                    # 補貨壞掉不能讓 worker 執行緒靜默消失（#38 (f)）：記一行、照舊退出本輪。
                    log(f"⚠️  top-up 例外（worker={worker.label}，退出本輪）：{e}")
            return
        lang, group_path, zh_path = task
        with state.lock:
            state.in_flight.add(f"{lang}:{zh_path}")
        try:
            process_task(worker, lang, group_path, zh_path, state, report, freezes, no_commit, commit_every, log,
                         engine=engine, no_patch=no_patch, no_noop_bump=no_noop_bump)
        except Exception as e:  # noqa: BLE001
            # 2026-09-19：ThreadPoolExecutor 把 worker 的例外收進 future，直到主執行緒
            # 呼叫 result() 才會冒出來——中間這條執行緒就消失了，log 沒有、report 沒有、
            # stderr 也沒有；剩下的 worker 照跑，看起來像產線只是慢。實撞：launchd 下
            # PATH 沒 node，成功翻完的兩篇在 prettier 那一步 FileNotFoundError，兩個
            # 地端 worker 就此靜默退場。這裡把例外變成一筆 fail 記錄，worker 繼續活。
            import traceback
            tb = traceback.format_exc()
            log(f"💥 worker={worker.label} lang={lang} zh={zh_path} dispatcher 例外（執行緒續活）：{e}\n{tb[-1200:]}")
            try:
                report.write({
                    "ts": datetime.now().astimezone().isoformat(timespec="seconds"),
                    "lang": lang, "zh": zh_path, "worker": worker.label, "ok": False,
                    "backend": worker.cascade_spec, "engine": engine,
                    "fail_reason": f"dispatcher exception: {type(e).__name__}: {str(e)[:160]}",
                    "disposition": "exception",
                })
            except Exception:
                pass
            with state.lock:
                state.in_flight.discard(f"{lang}:{zh_path}")
        flush_stale_pending(state, no_commit, log)


PENDING_FLUSH_AGE_S = 5400   # 零頭放超過 90 分鐘就 commit（同 process_task 內的年齡門檻與輪末 flush）


def flush_stale_pending(state: RunState, no_commit: bool, log: Logger,
                        max_age_s: float = PENDING_FLUSH_AGE_S) -> list:
    """任一 worker 做完一篇後，掃**所有**語言的零頭，放超過 max_age_s 的就 commit。

    2026-09-20：既有的年齡檢查只在「同一語言下一次成功」時算，輪末 flush 又只在
    輪次結束跑。ar 的 7 篇 15:19 起懸在工作樹，nemo 切軌後 ar 八小時零成功，
    沒有人替它算年齡——被 launchd 重啟或並行 session 的 merge 掃到就是 09-18
    那種打撈工。回傳本次 flush 的語言清單（方便測試）。
    """
    now = time.monotonic()
    with state.lock:
        due = [lang for lang, since in state.pending_since.items()
               if since is not None and now - since >= max_age_s and state.pending_ok.get(lang, 0) > 0]
    for lang in due:
        log(f"  零頭 {lang} 懸空超過 {max_age_s/60:.0f} 分鐘（{state.pending_ok.get(lang, 0)} 篇）— 跨語言年齡 flush")
        do_commit(lang, state, no_commit, log)
    return due


# ────────────────────────── main ──────────────────────────

def main() -> None:
    ap = argparse.ArgumentParser(
        description="Unified worker-pool translation batch dispatcher (replaces the hand-rolled "
                     "bash dispatchers dispatch-node-v3.sh / run-p1-v3.sh).",
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""example:
  python3 scripts/tools/lang-sync/babel-dispatch.py \\
    --langs vi,id,pt,hi \\
    --worker "nemo=openrouter:nvidia/nemotron-3-ultra-550b-a55b:free" \\
    --worker "gemma31=openrouter:google/gemma-4-31b-it:free" \\
    --worker "laguna=openrouter:poolside/laguna-xs-2.1:free" \\
    $(~/Projects/muse-bot/fleet/fleetctl workers --service llm --format babel) \\
    --order reverse --rounds 50 --commit-every 10
""",
    )
    ap.add_argument("--langs", default=None,
                     help="comma-separated target langs (default: ENABLED_TRANSLATION_LANGS "
                          "with any missing/stale)")
    ap.add_argument("--worker", action="append", dest="workers", default=[],
                     metavar="label=backendspec[@host]",
                     help="repeatable. backendspec passed to translate.py --cascade verbatim "
                          "(stripped of @host first). @host + ollama backend → OLLAMA_HOST/"
                          "OLLAMA_MODEL env for that worker's subprocesses.")
    ap.add_argument("--worker-tier6", action="append", dest="worker_tier6", default=[],
                     metavar="label=backendspec[@host]",
                     help="Tier 6 restricted worker (OBSERVER-QUEUE #18，2026-09-05 拍板) — "
                          "e.g. 'haiku=anthropic:claude-haiku-4-5-20251001'. Only claims tasks "
                          "in compute_restricted_eligible() (P0 missing OR CRITICAL(<0.5) "
                          "truncated); capped at --tier6-nightly-cap successes per run.")
    ap.add_argument("--worker-tier7", action="append", dest="worker_tier7", default=[],
                     metavar="label=backendspec[@host]",
                     help="Tier 7 restricted worker, last resort — e.g. "
                          "'gemini7=gemini-paid:gemini-2.5-pro'. Same eligibility as Tier 6, "
                          "plus requires the task to have failed at least once this run "
                          "(proxy for 'Tier 6 also failed'); capped at --tier7-nightly-cap.")
    ap.add_argument("--worker-skip-langs", action="append", dest="worker_skip_langs", default=[],
                     metavar="label=lang,lang",
                     help="repeatable. That worker never claims tasks in these langs (hard gate "
                          "via TaskQueue.claim task_filter). Use for weak worker×lang pairs "
                          "reported by babel-preflight.py (<15%% pass, n>=8) — 切軌，不是加大重試. "
                          "A lang skipped by EVERY normal worker is un-skipped with a warning "
                          "(never starve a language).")
    ap.add_argument("--tier6-nightly-cap", type=int, default=BABEL_TIER6_NIGHTLY_CAP,
                     help=f"max Tier 6 successes per run (default {BABEL_TIER6_NIGHTLY_CAP}, "
                          "env BABEL_TIER6_NIGHTLY_CAP)")
    ap.add_argument("--tier7-nightly-cap", type=int, default=BABEL_TIER7_NIGHTLY_CAP,
                     help=f"max Tier 7 successes per run (default {BABEL_TIER7_NIGHTLY_CAP}, "
                          "env BABEL_TIER7_NIGHTLY_CAP)")
    ap.add_argument("--order", choices=["reverse", "forward"], default="reverse",
                     help="reverse (default) = process each priority's worklist from the tail "
                          "(anti-collision vs legacy dispatchers, which eat from the head)")
    ap.add_argument("--rounds", type=int, default=50)
    # default 50：2026-07-25 哲宇 directive「commit 50 篇 50 篇做好了，不然
    # 感覺有點洗版 commit history」——多產線 × 每 10 篇一 commit 曾把 git log
    # 刷成整頁 babel 批次。
    ap.add_argument("--commit-every", type=int, default=50,
                     help="commit after this many verified-ok files per lang (also flushed at "
                          "end of each round)")
    ap.add_argument("--max-zh-bytes", type=int, default=None,
                    help="跳過原稿大於這個位元組數的文章（交給委派層）。"
                         "免費雲端模型對 40KB 以上的深度長文會在腳註階段逾時，"
                         "留在佇列裡是負產能——見 SQUEEZE §第五層分派表")
    ap.add_argument("--max-articles", type=int, default=None, help="global cap across the whole run (smoke tests)")
    ap.add_argument("--no-commit", action="store_true", help="skip git commit (smoke tests)")
    ap.add_argument("--engine", choices=["whole", "structured"], default="whole",
                    help="翻譯引擎：whole=整篇式 translate.py（預設）；structured=分段式 "
                         "structured-translate.py（模型只翻文字、結構由工具持有——"
                         "passthrough/腳註編號/YAML 三類 fail 構造上不會發生；"
                         "pilot 6/6 全綠 2026-07-25，見 reports/structured-translation-pilot）")
    ap.add_argument("--priority", choices=["p0", "p1", "all"], default="all",
                     help="p0=missing only, p1=stale+metadata-stale only, all=P0 first then P1 (default)")
    ap.add_argument("--no-patch", action="store_true",
                     help="disable the chapter-level diff-patch engine (patch-translate.py) for "
                          "stale tasks — always fall back to full retranslation (2026-07-27)")
    ap.add_argument("--exclude-file", type=Path, default=None,
                    help="TSV of `<lang>\\t<zh_path>` / `*\\t<zh_path>` pairs to skip every round "
                         "(generate with babel-origin-exclude.py; 2026-09-18 main-fork dedupe against origin/main)")
    ap.add_argument("--no-noop-bump", action="store_true",
                     help="disable the zero-cost semantic-noop bump for stale tasks whose zh diff "
                          "is punctuation/whitespace-only — always go through patch/full-translate "
                          "instead (2026-07-27, see reports/semantic-noop-stale-2026-07-27.md)")
    args = ap.parse_args()

    if not args.workers and not args.worker_tier6 and not args.worker_tier7:
        ap.error("at least one --worker (or --worker-tier6/--worker-tier7) is required")
    workers = ([parse_worker_arg(w) for w in args.workers]
               + [parse_worker_arg(w, tier="tier6") for w in args.worker_tier6]
               + [parse_worker_arg(w, tier="tier7") for w in args.worker_tier7])
    labels = [w.label for w in workers]
    if len(labels) != len(set(labels)):
        ap.error(f"--worker labels must be unique, got: {labels}")

    # --worker-skip-langs：弱適配切軌（2026-09-19）。先驗 label 與 lang 都存在，
    # 再做 starvation guard：某語言若被全部 normal worker 跳過，等於整個語言停擺
    # 且沒有人會叫——把那個語言的 skip 全部撤回並警告，寧可低通過率也不要零產出。
    skip_map: dict = {}
    for raw in args.worker_skip_langs:
        if "=" not in raw:
            ap.error(f"--worker-skip-langs must be 'label=lang,lang', got: {raw!r}")
        lbl, _, ls = raw.partition("=")
        lbl = lbl.strip()
        if lbl not in labels:
            ap.error(f"--worker-skip-langs: unknown worker label {lbl!r} (have {labels})")
        for l in (x.strip() for x in ls.split(",") if x.strip()):
            if l not in ALL_TRANSLATION_LANGS:
                ap.error(f"--worker-skip-langs: unknown lang {l!r} for worker {lbl!r}")
            skip_map.setdefault(lbl, set()).add(l)
    if skip_map:
        normal_labels = {w.label for w in workers if w.tier == "normal"}
        starved = [l for l in ALL_TRANSLATION_LANGS
                   if normal_labels and all(l in skip_map.get(lbl, set()) for lbl in normal_labels)]
        for l in starved:
            for lbl in normal_labels:
                skip_map[lbl].discard(l)
            print(f"⚠️ --worker-skip-langs: lang {l!r} would be skipped by every normal worker — "
                  f"skip lifted for {l!r} (never starve a language)", file=sys.stderr)
        for w in workers:
            if skip_map.get(w.label):
                w.skip_langs = frozenset(skip_map[w.label])

    if args.langs:
        langs_requested = [x.strip() for x in args.langs.split(",") if x.strip()]
        for l in langs_requested:
            if l not in ALL_TRANSLATION_LANGS:
                ap.error(f"unknown lang {l!r} — not in langs.py ALL_TRANSLATION_LANGS {ALL_TRANSLATION_LANGS}")
    else:
        langs_requested = None  # resolved after first status refresh

    run_dir = create_run_dir()
    print(run_dir)  # run dir path — first thing printed, per spec

    log = Logger(run_dir / "master.log")
    report = JsonlWriter(run_dir / "report.jsonl")
    freezes = JsonlWriter(run_dir / "freezes.jsonl")

    log(f"START babel-dispatch.py {datetime.now().astimezone().isoformat(timespec='seconds')}")
    log(f"  run_dir={run_dir}")
    log(f"  workers={[(w.label, w.cascade_spec, w.host, w.tier) for w in workers]}")
    log(f"  order={args.order} rounds={args.rounds} commit_every={args.commit_every} "
        f"priority={args.priority} max_articles={args.max_articles} no_commit={args.no_commit} "
        f"engine={args.engine} no_patch={args.no_patch} no_noop_bump={args.no_noop_bump} "
        f"exclude_file={args.exclude_file}")
    for w in workers:
        if w.skip_langs:
            log(f"  worker {w.label}: skip_langs={','.join(sorted(w.skip_langs))}（弱適配切軌）")
    # 去重清單即時視圖＋背景重算（2026-09-20）：輪次開頭那一次重算在 12 小時的
    # 長輪次裡從沒輪到；改成 refresher 每分鐘看檔齡、worker 在 claim 時讀最新清單。
    excl_cache = ExclusionCache(args.exclude_file, log)
    excl_stop = threading.Event()
    excl_thread = start_exclusion_refresher(args.exclude_file, log, excl_stop)
    if excl_thread is not None:
        log(f"  exclusion refresher 執行緒已啟動（每 60s 看檔齡，門檻 {EXCLUDE_REFRESH_MIN} 分鐘）")
    if any(w.tier != "normal" for w in workers):
        log(f"  tier6_nightly_cap={args.tier6_nightly_cap} tier7_nightly_cap={args.tier7_nightly_cap} "
            "(OBSERVER-QUEUE #18，2026-09-05 拍板)")

    state = RunState()
    state.tier6_cap = args.tier6_nightly_cap
    state.tier7_cap = args.tier7_nightly_cap
    seen_missing_slug: set = set()
    total_enqueued = 0

    barren_rounds = 0            # 連續零產出輪數（空轉偵測，見下方 break）
    for round_num in range(1, args.rounds + 1):
        log(f"\n===== ROUND {round_num} {datetime.now().astimezone().isoformat(timespec='seconds')} =====")
        ok_before_round = state.total_ok
        status_data = refresh_status(log)

        langs = langs_requested or default_langs(status_data)
        if not langs:
            log("No target langs (nothing missing/stale anywhere) — done.")
            break

        if any(w.tier != "normal" for w in workers):
            # Tier 6/7 資格集合每輪重算——上一輪救回的文章這輪要立刻從資格集合
            # 消失，付費 worker 不會浪費配額去重驗已經過關的檔案。
            with state.lock:
                state.restricted_eligible = compute_restricted_eligible(status_data, langs)
            log(f"  restricted_eligible (Tier 6/7)：{len(state.restricted_eligible)} 篇合格")

        slug_map_path = build_slug_map(run_dir)

        remaining_budget = None
        if args.max_articles is not None:
            remaining_budget = args.max_articles - total_enqueued
            if remaining_budget <= 0:
                log(f"max-articles budget ({args.max_articles}) exhausted — stopping.")
                break

        # 跨產線失敗記憶合併（2026-07-26 二修）：多條產線的語言互相重疊，
        # 各自的 fail_counts 只有自己的帳——實測同一篇 70 分鐘被不同產線合計
        # 撞 8 次。每輪開始從磁碟 max-merge 別條產線寫的記憶，撞牆的文章在
        # 所有產線一起沉底。首版只在 commit 時存檔，而 commit 要累積 50 篇，
        # 低通過率時整個 run 一次都沒存——記憶檔從未誕生。
        try:
            if FAIL_MEMO.exists():
                for k, v in json.loads(FAIL_MEMO.read_text(encoding="utf-8")).items():
                    if v > state.fail_counts.get(k, 0):
                        state.fail_counts[k] = v
        except Exception:
            pass

        refresh_exclusions_if_stale(args.exclude_file, log)
        exclusions = load_exclusions(args.exclude_file, log)
        if args.exclude_file is not None:
            log(f"  exclude-file: {len(exclusions)} (lang, zh) pairs skipped this round")

        per_lang_tasks: dict = {}
        for lang in langs:
            # 失敗次數決定優先序（2026-07-26 改，此前是硬性 exclude）：撞牆多次
            # 的沉到隊尾，沒試過的先跑，算力優先花在有機會成功的文章上。
            # fail_counts 跨 run 持久化，所以重啟不會又從同一批難篇開始撞。
            worklist_full = build_worklist(status_data, lang, args.priority, args.order,
                                           max_zh_bytes=args.max_zh_bytes, log=log,
                                            fail_counts=state.fail_counts, exclude=exclusions)
            cap = 10 * len(workers)
            if remaining_budget is not None:
                cap = min(cap, remaining_budget - sum(len(v) for v in per_lang_tasks.values()))
            worklist = worklist_full[: max(cap, 0)]
            if any(w.tier != "normal" for w in workers) and state.restricted_eligible:
                # Tier 6/7 資格集合（P0 missing／CRITICAL 截斷）可能被一般 stale
                # backlog 擠出 per-round cap 之外——cap 只顧整體吞吐量，不知道
                # 「這篇是付費 tier 唯一能碰的稀缺資格」。額外撈出這個語言合格
                # 但沒被 cap 收進來的項目，上限用 tier6+tier7 夜間配額之和
                # （配額本來就 ≤13，不會讓佇列無界增長）。
                already = set(worklist)
                extra_budget = state.tier6_cap + state.tier7_cap
                extra = [zh for zh in worklist_full[len(worklist):]
                         if zh not in already and (lang, zh) in state.restricted_eligible][:extra_budget]
                worklist = worklist + extra
            if not worklist:
                continue
            round_dir = run_dir / "tasks" / lang / f"round{round_num:02d}"
            run_prepare_batch(lang, worklist, slug_map_path, round_dir, log)
            groups = collect_and_filter_groups(round_dir, lang, seen_missing_slug, log)
            if groups:
                per_lang_tasks[lang] = groups

        if not per_lang_tasks:
            log("All target langs have empty worklists this round — done.")
            break

        tasks = interleave_by_lang(per_lang_tasks)
        total_enqueued += len(tasks)
        log(f"Round {round_num}: {len(tasks)} article(s) queued across {len(per_lang_tasks)} lang(s) "
            f"({', '.join(f'{l}={len(v)}' for l, v in per_lang_tasks.items())})")

        queue = TaskQueue(tasks)
        with state.lock:
            state.round_seen = {f"{l}:{z}" for l, _g, z in tasks}
            state.topup_seq = 0
        _rn, _langs, _excl = round_num, list(langs), exclusions

        def _topup(w, q):
            return topup_queue(w, q, state, _langs, args, run_dir, _rn, slug_map_path,
                               seen_missing_slug, log, exclusions=_excl)

        with ThreadPoolExecutor(max_workers=len(workers)) as pool:
            futures = [
                pool.submit(worker_loop, w, workers, queue, state, report, freezes,
                            args.no_commit, args.commit_every, log,
                            engine=args.engine, no_patch=args.no_patch, no_noop_bump=args.no_noop_bump,
                            excl_cache=excl_cache, topup=_topup)
                for w in workers
            ]
            for f in futures:
                f.result()

        # 2026-07-25 哲宇 callout「中間為啥還是 commit 的那麼散」：原本每輪結束
        # 無條件 flush 零頭（1-8 篇的 commit 一輪一串），--commit-every 50 形同
        # 只對單輪內的大批有效。改成跨輪累積：只有零頭放超過 90 分鐘才時間性
        # flush（防 run 中途死掉時未 commit 的工作懸空太久），其餘累到門檻才出手。
        FLUSH_AGE_S = 5400
        now = time.monotonic()
        for lang in list(per_lang_tasks.keys()):
            since = state.pending_since.get(lang)
            if since is not None and now - since >= FLUSH_AGE_S:
                do_commit(lang, state, args.no_commit, log)

        # 失敗記憶每輪落盤（read-merge-write，原子替換；並行產線互相看得見）
        try:
            merged = dict(state.fail_counts)
            if FAIL_MEMO.exists():
                for k, v in json.loads(FAIL_MEMO.read_text(encoding="utf-8")).items():
                    if v > merged.get(k, 0):
                        merged[k] = v
            tmpf = FAIL_MEMO.with_suffix(".tmp")
            tmpf.write_text(json.dumps(merged, ensure_ascii=False), encoding="utf-8")
            tmpf.replace(FAIL_MEMO)
        except Exception:
            pass

        # 空轉偵測（2026-07-26）：worker 的 endpoint 掛掉時（遠端機器離線、
        # ollama 服務停），既有的 freeze 機制會把它凍結，但**單 worker 產線的
        # 唯一 worker 被凍結後，round loop 照樣一輪一輪跑 prepare-batch**——
        # process 活著、log 在動、實際零產出。實撞：l4090 專軌在遠端機器離線後
        # 空轉到第 127 輪才被發現，ps 看起來完全正常。
        # 連續三輪零產出就結束 run，讓外部監護（渦流檢查或 routine）重新起跑。
        if state.total_ok == ok_before_round:
            barren_rounds += 1
            if barren_rounds >= 3:
                log(f"🛑 連續 {barren_rounds} 輪零產出 — 判定空轉（worker endpoint 可能全掛），"
                    f"結束 run 讓外部重新起跑")
                break
        else:
            barren_rounds = 0

        if args.max_articles is not None and total_enqueued >= args.max_articles:
            log(f"max-articles budget ({args.max_articles}) reached after round {round_num} — stopping.")
            break
    else:
        log(f"Reached --rounds limit ({args.rounds}) without exhausting the worklist.")

    # run 結束：把所有語言的零頭一次收乾淨（唯一的無條件 flush 點）
    for lang in list(state.pending_ok.keys()):
        do_commit(lang, state, args.no_commit, log)

    log("\n===== FINAL STATUS =====")
    final = refresh_status(log)
    for lang in (langs_requested or default_langs(final)) or ENABLED_TRANSLATION_LANGS:
        s = final["_meta"]["summary"].get(lang)
        if s:
            log(f"  {lang}: fresh={s['fresh']} stale={s['stale']} missing={s['missing']} "
                f"metadata_stale={s.get('metadata_stale', 0)}")
    log(f"quarantine_log this run: {dict((k, sorted(v)) for k, v in state.quarantine_log.items())}")
    # 難篇清單：累計失敗次數分層，這本身是產物不是噪音——沉底的那批可以拿去
    # 換模型專攻或人工看（2026-07-26 優先序佇列改造）
    tiers = {}
    for k, n in state.fail_counts.items():
        tiers.setdefault(min(n, 5), []).append(k)
    if tiers:
        log("難篇分層（累計失敗次數 → 佇列優先序，多的沉底但不放棄）：")
        for n in sorted(tiers, reverse=True):
            items = sorted(tiers[n])
            log(f"  {n}× 失敗：{len(items)} 篇" +
                (f" — {items[:5]}{' …' if len(items) > 5 else ''}" if n >= 3 else ""))
        log(f"  記憶已存 {FAIL_MEMO}（下個 run 續用，不會又從難篇開始撞）")
    if any(w.tier != "normal" for w in workers):
        log(f"Tier 6/7 本 run 成功篇數：{dict(state.tier_success_count)}"
            f"（cap tier6={state.tier6_cap} tier7={state.tier7_cap}）")
    # 義務鐵律第 4 條（OBSERVER-QUEUE #18(c)）：cascade exhausted 清單必須在
    # 收官摘要裡明列，babel 收官 memory 直接抄這段，不 silent carry。
    if state.exhausted_this_run:
        uniq = sorted(set(state.exhausted_this_run))
        log(f"🚨 cascade_exhausted 本輪 {len(uniq)} 篇（babel 收官 memory 必列，"
            f"連續兩夜同檔已自動 escalate 進 OBSERVER-QUEUE.md §待決）：")
        for k in uniq:
            log(f"  - {k}")
    log("DONE")


if __name__ == "__main__":
    main()
