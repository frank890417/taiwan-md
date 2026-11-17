"""Tests for lib/article_health/census.py（全站普查的量尺、證據與四級規則）
與 curation-gap plugin。

全部用合成資料：CI 的 pytest 是 depth-1 淺 clone，任何依賴真實 git 史的斷言都會在那裡失真。
"""

from __future__ import annotations

import copy
from pathlib import Path

from lib.article_health import census as C
from lib.article_health.checks import curation_gap
from lib.article_health.loader import load_target
from lib.article_health.types import Severity


# ── 量尺 ────────────────────────────────────────────────────────────────────

_BODY = """
> **30 秒概覽：** 一段概覽。

開場段落，提到某件事[^1]，又提到另一件[^2]。

## 第一節

![本地圖](/article-images/people/a.webp)

正文一段，有一個重複引用[^1]。

## 第二節

![外站圖](https://upload.wikimedia.org/x.jpg)

<iframe src="https://www.youtube.com/embed/x"></iframe>

```tw-stat
value: 1
```

```python
# 這不是標題
![也不是圖](/nope.png)
```

## 參考資料

[^1]: [來源一](https://a.example) — 說明
[^2]: [來源二](https://b.example) — 說明
[^3]: [沒人引用](https://c.example) — 說明
[^1]: [重複定義](https://a.example) — 重複
"""


def test_body_metrics_counts():
    m = C.body_metrics(_BODY)
    assert m["fn_defs"] == 3  # 不重複定義數：1、2、3（重複的 1 只算一次）
    assert m["fn_referenced"] == 2  # 3 沒被正文引用
    assert m["h2"] == 3
    assert m["h2_content"] == 2  # 參考資料不算正文章節
    assert m["images"] == 2  # fence 裡那張不算
    assert m["images_local"] == 1 and m["images_remote"] == 1
    assert m["first_local_image"] == "/article-images/people/a.webp"
    assert m["iframes"] == 1
    assert m["tw_modules"] == 1
    assert m["has_overview"] is True


def test_truthy_handles_string_false():
    assert C.truthy(True) and C.truthy("true") and C.truthy("True")
    assert not C.truthy(False) and not C.truthy("false") and not C.truthy(None)


def test_cover_info(tmp_path):
    (tmp_path / "public" / "article-images").mkdir(parents=True)
    (tmp_path / "public" / "article-images" / "ok.webp").write_bytes(b"x")
    assert C.cover_info({}, tmp_path)["cover"] == "none"
    assert C.cover_info({"image": "  "}, tmp_path)["cover"] == "none"
    assert C.cover_info({"image": "/article-images/ok.webp"}, tmp_path)["cover"] == "local"
    assert C.cover_info({"image": "/article-images/gone.webp"}, tmp_path)["cover"] == "local-missing"
    assert C.cover_info({"image": "https://x.org/a.jpg"}, tmp_path)["cover"] == "remote"


# ── git 史解析 ──────────────────────────────────────────────────────────────


def _blk(sha, author, iso, subject, *changes):
    return "\x00" + f"{sha}\t{author}\t{iso}\t{subject}\n\n" + "\n".join(changes) + "\n"


def test_parse_git_log_follows_rename_and_drops_deleted():
    # log 是新 → 舊
    log = "".join([
        _blk("c4", "Che-Yu Wu", "2026-09-01T00:00:00+08:00", "🧬 [semiont] rewrite: 新名", "M\tknowledge/People/新名.md"),
        _blk("c3", "Che-Yu Wu", "2026-08-01T00:00:00+08:00", "🧬 [semiont] heal: 改名",
             "R100\tknowledge/People/舊名.md\tknowledge/People/新名.md", "D\tknowledge/Food/刪掉.md"),
        _blk("c2", "Contributor", "2026-07-01T00:00:00+08:00", "Create 刪掉.md", "A\tknowledge/Food/刪掉.md"),
        _blk("c1", "Contributor", "2026-06-01T00:00:00+08:00", "Create 舊名.md",
             "A\tknowledge/People/舊名.md", "A\tknowledge/en/People/old.md"),
    ])
    live = C.parse_git_log(log)
    assert set(live) == {"knowledge/People/新名.md"}
    h = live["knowledge/People/新名.md"]
    assert [c.sha for c in h.commits] == ["c4", "c3", "c1"]  # 新 → 舊，跟著改名接回 c1
    assert h.commits[-1].author == "Contributor"  # 首次提交者＝原始作者，不是改名的人
    assert h.path_first_author == "Che-Yu Wu"  # 這個路徑第一次出現是改名那次
    assert h.commits[-1].n_zh == 1  # 譯文不算中文文章


def test_parse_curation_patch_log_net_add_only():
    log = (
        "\x002026-09-13T00:00:00+08:00\n\n"
        "diff --git a/knowledge/People/甲.md b/knowledge/People/甲.md\n"
        "--- a/knowledge/People/甲.md\n+++ b/knowledge/People/甲.md\n@@ -9 +9 @@\n+curation: incubating\n"
        "diff --git a/knowledge/Art/有 空白.md b/knowledge/Art/有 空白.md\n"
        "--- a/knowledge/Art/有 空白.md\t\n+++ b/knowledge/Art/有 空白.md\t\n@@ -3 +3 @@\n"
        "-curation: incubating\n+curation: incubating\n"  # 搬行：一加一減，不算重新標記
        "\x002026-08-04T00:00:00+08:00\n\n"
        "--- a/knowledge/Art/有 空白.md\t\n+++ b/knowledge/Art/有 空白.md\t\n@@ -3 +3 @@\n+curation: incubating\n"
        "--- a/knowledge/People/甲.md\n+++ b/knowledge/People/甲.md\n@@ -9 +9 @@\n+curation: incubating\n"
    )
    d = C.parse_curation_patch_log(log)
    assert d["knowledge/People/甲.md"] == "2026-09-13"  # 最近一次淨加上
    assert d["knowledge/Art/有 空白.md"] == "2026-08-04"  # 路徑含空白（+++ 行尾 tab）也認得


def _hist(*commits):
    return C.ArticleHistory(commits=[C.Commit(*c) for c in commits])


def test_process_evidence_filters():
    hist = _hist(
        ("a1", "Che-Yu Wu", "2026-09-01", "🧬 [semiont] rewrite: 某篇 深度重寫", 1),
        ("a2", "Che-Yu Wu", "2026-08-01", "🧬 [semiont] heal: 批次格式 rewrite links", 200),  # 批次、沒點名
        ("a3", "Che-Yu Wu", "2026-07-01", "🧬 [semiont] evolve: 改腳註閘門", 1),  # evolve 沒點名
        ("a4", "Contributor", "2026-06-01", "content: 新增（事實查核通過）", 1),  # 投稿者自述
        ("a5", "Che-Yu Wu", "2026-05-01", "🧬 [semiont] heal: 巡邏某篇 32 原子 0 錯", 3),  # 點名
        ("a6", "Che-Yu Wu", "2026-03-20", "rewrite: 某篇 — EDITORIAL v2", 1),  # 早期維護者手跑
    )
    ev = C.process_evidence("某篇", hist, "2026-04-24")
    assert ev["rewrite_commits"] == 2 and ev["rewrite_last"] == "2026-09-01"
    assert ev["rewrite_modern"] == 1
    assert ev["factcheck_commits"] == 1 and ev["factcheck_last"] == "2026-05-01"


def test_process_evidence_named_evolve_counts():
    hist = _hist(("e1", "Che-Yu Wu", "2026-09-12", "🧬 [semiont] evolve: 深度重寫洪醒夫條目", 1))
    assert C.process_evidence("洪醒夫", hist, "2026-04-24")["rewrite_commits"] == 1


# ── 分級 ────────────────────────────────────────────────────────────────────


def _row(**over):
    base = {
        "path": "knowledge/People/某篇.md", "category": "People", "curation": None,
        "curation_since": None, "featured": False, "lastHumanReview": False,
        "first_author": "Che-Yu Wu", "first_date": "2026-03-20", "cover": "none",
        "metrics": {
            "cjk": 1500, "fn_defs": 2, "fn_referenced": 2, "h2_content": 2, "h3": 0,
            "images": 0, "images_local": 0, "images_remote": 0, "first_local_image": None,
            "iframes": 0, "tw_modules": 0, "paragraphs": 6, "para_median_cjk": 60,
        },
        "evidence": {
            "research": [], "research_audit": False, "done_log": False, "pre_review": False,
            "inbox_open": False, "hold": None, "rewrite_commits": 0, "rewrite_last": None,
            "rewrite_modern": 0, "factcheck_commits": 0, "factcheck_last": None,
        },
    }
    row = copy.deepcopy(base)
    for k, v in over.items():
        if k in ("metrics", "evidence"):
            row[k].update(v)
        else:
            row[k] = v
    return row


def test_tier_a_thin_without_evidence():
    r = C.tier_a(_row())
    assert len(r) == 1 and r[0].startswith("A1")
    assert "腳註 2 < 5" in r[0] and "字數 1500 < 2000" in r[0]


def test_tier_a_zero_referenced_counts_even_when_long():
    r = C.tier_a(_row(metrics={"cjk": 6000, "fn_defs": 20, "fn_referenced": 0}))
    assert r and "零引用" in r[0]


def test_tier_a_skips_evidence_curated_about():
    assert C.tier_a(_row(evidence={"rewrite_commits": 1})) == []
    assert C.tier_a(_row(evidence={"research": ["reports/research/2026-05/某篇.md"]})) == []
    assert C.tier_a(_row(curation="incubating")) == []
    assert C.tier_a(_row(curation="verified")) == []
    assert C.tier_a(_row(category="About")) == []
    # 地板以上、零證據 → 不是 A（多數早期文章大體正確，不自貶）
    assert C.tier_a(_row(metrics={"cjk": 4000, "fn_defs": 9, "fn_referenced": 9})) == []


def test_tier_a2_heal_leak_is_process_rule():
    ok = _row(first_author="Contributor", first_date="2026-08-20",
              metrics={"cjk": 4000, "fn_defs": 9, "fn_referenced": 9})
    r = C.tier_a(ok)
    assert len(r) == 1 and r[0].startswith("A2")
    # 規則生效前進站 → 不算漏標
    assert C.tier_a({**ok, "first_date": "2026-07-01"}) == []
    # 維護者自己寫的 → 不適用 §1b
    assert C.tier_a({**ok, "first_author": "Che-Yu Wu"}) == []


def test_tier_b_requires_walk_strictly_after_tag():
    good = _row(curation="incubating", curation_since="2026-08-04",
                metrics={"cjk": 5000, "fn_defs": 20, "fn_referenced": 20},
                evidence={"rewrite_last": "2026-09-01", "rewrite_commits": 1})
    assert C.tier_b(good)
    same_day = copy.deepcopy(good)
    same_day["evidence"]["rewrite_last"] = "2026-08-04"
    assert C.tier_b(same_day) == []  # 標記當天那次就是決定標上去的那次
    inbox = copy.deepcopy(good)
    inbox["evidence"]["inbox_open"] = True
    assert C.tier_b(inbox) == []
    thin = copy.deepcopy(good)
    thin["metrics"]["fn_defs"] = 5
    assert C.tier_b(thin) == []
    assert C.tier_b({**good, "curation": None}) == []


def test_tier_c_subtypes():
    assert C.tier_c(_row(cover="local")) == []
    assert C.tier_c(_row())[0].startswith("C3")
    assert C.tier_c(_row(metrics={"first_local_image": "/a.webp", "images": 1}))[0].startswith("C1")
    assert C.tier_c(_row(metrics={"images_remote": 1, "images": 1}))[0].startswith("C2")
    assert C.tier_c(_row(cover="local-missing"))[0].startswith("C4")
    assert C.tier_c(_row(cover="remote"))[0].startswith("C5")


def test_tier_d_axes_and_h3_fallback():
    r = C.tier_d(_row())
    assert r and r[0].startswith("5 軸弱")  # 字數、腳註、章節、零媒體、段落（6 段 < 8）
    rich = _row(metrics={"cjk": 6000, "fn_defs": 30, "fn_referenced": 30, "h2_content": 7,
                         "images": 4, "paragraphs": 40, "para_median_cjk": 90}, cover="local")
    assert C.tier_d(rich) == []
    # 零 H2 但有 5 個 H3 → 章節軸不弱
    h3 = _row(metrics={"cjk": 6000, "fn_defs": 30, "fn_referenced": 30, "h2_content": 0, "h3": 5,
                       "paragraphs": 40, "para_median_cjk": 90})
    assert "正文章節" not in " ".join(C.thin_axes(h3))
    assert C.tier_d(_row(category="About")) == []


def test_classify_multi_tier():
    tiers = C.classify(_row())
    assert set(tiers) == {"A", "C", "D"}


# ── repo 證據索引 ──────────────────────────────────────────────────────────


def test_repo_evidence_load(tmp_path):
    (tmp_path / "reports" / "research" / "2026-09").mkdir(parents=True)
    (tmp_path / "reports" / "research" / "2026-09" / "甲.md").write_text(
        "---\nstatus: 'audit'\n---\n# x\n", encoding="utf-8")
    (tmp_path / "reports" / "research" / "2026-09" / "乙.md").write_text("# 研究\n", encoding="utf-8")
    sem = tmp_path / "docs" / "semiont"
    sem.mkdir(parents=True)
    (sem / "ARTICLE-DONE-LOG.md").write_text(
        "- **Article**: [x](../../knowledge/Art/FAB%20DAO與百岳計畫.md)\n", encoding="utf-8")
    (sem / "ARTICLE-INBOX.md").write_text(
        "- [x] [丙](../../knowledge/People/丙.md) 已完成\n- [ ] [丁](../../knowledge/People/丁.md)\n"
        "- **Path**: knowledge/Food/戊.md\n", encoding="utf-8")
    (tmp_path / "config").mkdir()
    (tmp_path / "config" / "babel-hold.tsv").write_text(
        "# 註解\n*\tPeople/某候選人.md\t2026-11-18T00:00:00+08:00\t2026-11-28T16:00:00+08:00\t民調禁止期\n",
        encoding="utf-8")
    ev = C.RepoEvidence.load(tmp_path)
    assert ev.research_by_stem["甲"] == ["reports/research/2026-09/甲.md"]
    assert "reports/research/2026-09/甲.md" in ev.research_audit
    assert "reports/research/2026-09/乙.md" not in ev.research_audit
    assert "Art/FAB DAO與百岳計畫.md" in ev.done_log_paths  # URL 解碼
    assert ev.inbox_open_paths == {"People/丁.md", "Food/戊.md"}  # 勾掉的不算未完成
    assert "People/某候選人.md" in ev.hold_paths


def test_build_row_end_to_end(tmp_path):
    ev = C.RepoEvidence()
    ev.research_by_stem["某篇"] = ["reports/research/2026-05/某篇.md"]
    row = C.build_row("knowledge/People/某篇.md", {"title": "t", "lastHumanReview": "false"},
                      _BODY, ev, None, repo_root=tmp_path)
    assert row["evidence"]["research"] == ["reports/research/2026-05/某篇.md"]
    assert row["lastHumanReview"] is False and row["first_author"] is None
    assert "A" not in C.classify(row)  # 有 research 報告 = 走過流程


# ── curation-gap plugin ────────────────────────────────────────────────────

_THIN = "---\ntitle: '測試'\ndescription: 'd'\n---\n\n一段很短的正文，沒有腳註。\n\n## 唯一一節\n\n再一段。\n"


def _target(tmp_path, text, rel="knowledge/People/測試假人物zz.md"):
    f = tmp_path / rel
    f.parent.mkdir(parents=True, exist_ok=True)
    f.write_text(text, encoding="utf-8")
    return load_target(f)


def _prime(monkeypatch, complete: bool):
    curation_gap.reset_cache()
    monkeypatch.setitem(curation_gap._CACHE, "ev", C.RepoEvidence())
    monkeypatch.setitem(curation_gap._CACHE, "hist", {})
    monkeypatch.setitem(curation_gap._CACHE, "complete", complete)


def test_plugin_warns_thin_untagged(tmp_path, monkeypatch):
    _prime(monkeypatch, complete=True)
    vs = list(curation_gap.check(_target(tmp_path, _THIN), {}))
    assert len(vs) == 1
    assert vs[0].severity is Severity.WARN
    assert "curation-tag.py --set incubating --reason unverified knowledge/People/測試假人物zz.md" in vs[0].message
    curation_gap.reset_cache()


def test_plugin_downgrades_to_info_without_git(tmp_path, monkeypatch):
    _prime(monkeypatch, complete=False)
    vs = list(curation_gap.check(_target(tmp_path, _THIN), {}))
    assert len(vs) == 1 and vs[0].severity is Severity.INFO
    assert "git" in vs[0].message
    vs = list(curation_gap.check(_target(tmp_path, _THIN), {"git_evidence": False}))
    assert vs and vs[0].severity is Severity.INFO
    curation_gap.reset_cache()


def test_plugin_skips_tagged_translation_about(tmp_path, monkeypatch):
    _prime(monkeypatch, complete=True)
    tagged = _THIN.replace("description: 'd'\n", "description: 'd'\ncuration: incubating\n")
    assert list(curation_gap.check(_target(tmp_path, tagged), {})) == []
    assert list(curation_gap.check(_target(tmp_path, _THIN, "knowledge/en/People/x.md"), {})) == []
    assert list(curation_gap.check(_target(tmp_path, _THIN, "knowledge/About/x.md"), {})) == []
    assert list(curation_gap.check(_target(tmp_path, _THIN, "knowledge/People/_People Hub.md"), {})) == []
    curation_gap.reset_cache()


def test_plugin_registered():
    from lib.article_health import registry

    registry.reset_registry()
    assert registry.get_check("curation-gap").CHECK_NAME == "curation-gap"


# ── 第二輪：curationReason／A2 升級／標記日不明 ─────────────────────────────


def test_suggested_reason():
    assert C.suggested_reason(_row()) == "unverified"  # 腳註 2 < 5
    thin = _row(metrics={"cjk": 1500, "fn_defs": 9, "fn_referenced": 9})
    assert C.suggested_reason(thin) == "thin"  # 腳註夠、只有字數失守
    zero_ref = _row(metrics={"cjk": 1500, "fn_defs": 9, "fn_referenced": 0})
    assert C.suggested_reason(zero_ref) == "unverified"  # 引用失守
    a2 = _row(first_author="Contributor", first_date="2026-08-20",
              metrics={"cjk": 1500, "fn_defs": 9, "fn_referenced": 9})
    assert C.suggested_reason(a2) == "unverified"  # A2 一律待查證（即使同時只有字數失守）
    assert C.suggested_reason(_row(curation="incubating")) is None


def test_tier_b_unknown_tag_date_is_not_b():
    good = _row(curation="incubating", curation_since=None,
                metrics={"cjk": 5000, "fn_defs": 20, "fn_referenced": 20},
                evidence={"rewrite_last": "2026-09-01", "rewrite_commits": 1})
    assert C.tier_b(good) == []  # partial clone 拿不到標記日 → 寧可不列


def _a2_target(tmp_path):
    return _target(tmp_path, _THIN.replace("一段很短的正文，沒有腳註。", "一段很短的正文，沒有腳註。" * 300))


def test_plugin_a2_severity_option_and_ci_guard(tmp_path, monkeypatch):
    _prime(monkeypatch, complete=True)
    rel = "knowledge/People/測試假人物zz.md"
    hist = C.ArticleHistory(commits=[C.Commit("c1", "Contributor", "2026-08-20", "Create 測試假人物zz.md", 1)])
    monkeypatch.setitem(curation_gap._CACHE, "hist", {rel: hist})
    monkeypatch.delenv("GITHUB_ACTIONS", raising=False)
    monkeypatch.delenv("CI", raising=False)
    target = _a2_target(tmp_path)
    vs = list(curation_gap.check(target, {"a2_severity": "hard"}))
    by = {v.message.split("：", 2)[1][:2]: v.severity for v in vs}
    assert by["A2"] is Severity.HARD and by["A1"] is Severity.WARN
    vs = list(curation_gap.check(target, {}))
    assert all(v.severity is Severity.WARN for v in vs)  # 沒設 option 就是 WARN
    monkeypatch.setenv("GITHUB_ACTIONS", "true")  # 投稿 PR 的 CI 閘門不升
    vs = list(curation_gap.check(target, {"a2_severity": "hard"}))
    assert all(v.severity is Severity.WARN for v in vs)
    curation_gap.reset_cache()


def test_curation_reason_consistency(tmp_path):
    from lib.article_health.checks import curation_consistency as cc

    def vs(extra):
        t = _target(tmp_path, f"---\ntitle: 't'\ndescription: 'd'\n{extra}---\n\n正文。\n")
        return list(cc.check(t, {}))

    assert vs("curation: incubating\ncurationReason: thin\n") == []
    bad = vs("curation: incubating\ncurationReason: thinn\n")
    assert bad and bad[0].severity is Severity.HARD
    stale = vs("curation: verified\nlastHumanReview: true\ncurationReason: thin\n")
    assert stale and stale[0].severity is Severity.WARN
    assert vs("curationReason: unverified\n")[0].severity is Severity.WARN  # 沒有 curation


def test_image_health_cover_required(tmp_path, monkeypatch):
    from lib.article_health.checks import image_health as ih

    monkeypatch.chdir(tmp_path)
    t = _target(tmp_path, _THIN)
    cover = [v for v in ih.check(t, {}) if "封面" in v.message]
    assert len(cover) == 1 and cover[0].severity is Severity.WARN
    cover = [v for v in ih.check(t, {"cover_required_severity": "hard"}) if "封面" in v.message]
    assert cover[0].severity is Severity.HARD
    tr = _target(tmp_path, _THIN, "knowledge/en/People/x.md")
    assert not [v for v in ih.check(tr, {}) if "封面" in v.message]  # 譯文沿用原文封面
