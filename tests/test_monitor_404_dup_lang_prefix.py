"""duplicated-lang-prefix — 語言碼貼了兩次、中間沒有斜線的 404 家族。

誕生 2026-10-11 twmd-maintainer-daily：這個形狀的歸類問題從 10-08 起被四班
原樣傳遞（`/ptpt/` 等，收件席位一直寫 `twmd-maintainer-daily`），而壓縮過的
交接只剩「404 同語言前綴雙寫家族」五個字，連「要不要歸成獨立家族」這個
問題本身都掉了。

2026-10-09 實測：9 條路徑 38 次命中，全部落在 `unknown`（佔當日 3,468 的
一小角，所以不會觸發任何單一路徑 > 100/day 的黃燈）。UA 全是桌機 Chrome
不是爬蟲——是讀者在吃 404。拿掉一份語言碼之後 9/9 都是站上真實存在的
同語言頁面，所以修法是機械的 301，屬於可解析家族。

本檔釘住三件容易漂走的事：
  1. 形狀命中且 suggest 指向「同語言」的真實網址（不是 zh 母稿）
  2. 不搶鄰居：單一前綴、兩個不同語言碼、帶斜線的 /en/en/ 都不歸這族
  3. 家族講形狀、suggest 講可修性——拿掉一份之後不存在時 suggest 必須是
     None，否則下游 generate-redirects.mjs 會發出指向 404 的 301
"""

import importlib.util
import pathlib

import pytest

REPO = pathlib.Path(__file__).resolve().parents[1]


def _load_module():
    """monitor-404.py 檔名帶連字號，不能 import，用 spec 載入。"""
    path = REPO / "scripts/tools/monitor-404.py"
    spec = importlib.util.spec_from_file_location("monitor_404", path)
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


@pytest.fixture(scope="module")
def mod():
    return _load_module()


# 最小 fixture：不碰 knowledge/ 與 public/api，免得測試跟著內容庫漂。
ROUTES = {
    "/en/politics/village-chief-campaign-ledgers",
    "/politics/309本里長帳簿",
}
REGISTRY = {
    "ar": {"toZh": {"/ar/politics/village-chief-campaign-ledgers": "/politics/309本里長帳簿"}},
    "en": {"toZh": {}, "fromZh": {}},
}


def _classify(mod, path, routes=None, registry=None):
    return mod.classify(
        path,
        routes if routes is not None else ROUTES,
        {},
        {},
        registry if registry is not None else REGISTRY,
    )


def test_resolvable_via_routes(mod):
    """拿掉一份語言碼命中 route 表 → 家族成立，suggest 指向同語言網址。"""
    family, suggest = _classify(mod, "/enen/politics/village-chief-campaign-ledgers")
    assert family == "duplicated-lang-prefix"
    assert suggest == "/en/politics/village-chief-campaign-ledgers"


def test_resolvable_via_registry(mod):
    """route 表沒有但 registry toZh 有 → 一樣成立（譯文走 registry 那條路）。"""
    family, suggest = _classify(mod, "/arar/politics/village-chief-campaign-ledgers")
    assert family == "duplicated-lang-prefix"
    assert suggest == "/ar/politics/village-chief-campaign-ledgers"


def test_shape_without_resolution_gets_no_suggest(mod):
    """形狀對、拿掉之後不存在 → 仍歸這族，但 suggest 必須是 None。

    generate-redirects.mjs 只要 family 在允許名單且 suggest 非空就會發 301，
    所以這裡給出一個不存在的目標等於自己製造一條 301→404。
    """
    family, suggest = _classify(mod, "/enen/politics/no-such-slug-xyz")
    assert family == "duplicated-lang-prefix"
    assert suggest is None


def test_does_not_steal_single_prefix(mod):
    """單一語言前綴不歸這族（這裡它是真實路由，所以是 phantom）。"""
    family, _ = _classify(mod, "/en/politics/village-chief-campaign-ledgers")
    assert family != "duplicated-lang-prefix"


def test_does_not_steal_two_different_langs(mod):
    """兩個不同語言碼相鄰不是這族——反向參照要求兩段 literally 相同。

    沒有證據說 /enes/ 這種形狀在流量裡存在，所以不替它開家族，也不讓它
    混進來撐大這族的讀數。
    """
    family, _ = _classify(mod, "/enes/politics/village-chief-campaign-ledgers")
    assert family != "duplicated-lang-prefix"


def test_does_not_steal_slashed_double_prefix(mod):
    """/en/en/... 帶斜線，走的是既有的語言前綴分支，不歸這族。"""
    family, _ = _classify(mod, "/en/en/politics/village-chief-campaign-ledgers")
    assert family != "duplicated-lang-prefix"


def test_phantom_still_wins(mod):
    """route 表裡真的有這個頁面時，phantom 優先——它是異常要單獨查。"""
    family, _ = _classify(
        mod,
        "/enen/politics/x",
        routes={"/enen/politics/x"},
    )
    assert family == "phantom"


def test_family_is_declared_resolvable(mod):
    """這族的修法是機械 301，必須算進可解析 404。"""
    assert "duplicated-lang-prefix" in mod.RESOLVABLE_FAMILIES


def test_resolvable_alert_text_lists_every_family(mod):
    """警報說明文字不可手抄家族名單。

    2026-09-18 data-refresh 連兩夜把真警報讀成「工具寫反」，因為工具門檻
    六月從 200 收緊到 50、印出的字樣留在 200。同一個形狀：新增家族時手抄
    的那份不會跟著改，於是警報是對的、它的說明少列一族。
    """
    families = {f: {"count": 10_000} for f in mod.RESOLVABLE_FAMILIES}
    alerts = mod.compute_alerts("2026-10-11", families, [])
    msg = next(a["message"] for a in alerts if a["id"].startswith("cf-404-resolvable"))
    for family in mod.RESOLVABLE_FAMILIES:
        assert family in msg


# ────────── upsert_state：重查不可以默默蓋掉比較完整的那一天 ──────────


def _day(date, total, truncated=False, families=None):
    return {
        "date": date,
        "total_404": total,
        "truncated": truncated,
        "families": families or {},
        "top_paths": [],
        "alerts": [],
    }


def test_requery_with_fewer_rows_keeps_existing(mod):
    """重查拿到比較少 → 保留既有，並回一行說明。

    2026-10-11 實測：2026-10-09 原本 5,505，兩天後重查 3,815，兩次 truncated
    都是 false。無條件覆蓋會在 60 天趨勢上挖一個 31% 的假低點。
    """
    state = {"days": [_day("2026-10-09", 5505)]}
    state, note = mod.upsert_state(state, _day("2026-10-09", 3815))
    assert note is not None and "5,505" in note
    assert state["days"][0]["total_404"] == 5505


def test_requery_with_more_rows_overwrites(mod):
    """重查拿到比較多 → 照常覆蓋，不需要任何旗標。"""
    state = {"days": [_day("2026-10-09", 3000)]}
    state, note = mod.upsert_state(state, _day("2026-10-09", 4000))
    assert note is None
    assert state["days"][0]["total_404"] == 4000


def test_force_requery_overrides_the_guard(mod):
    """明確要求覆蓋時放行——既有紀錄本身壞掉時要有出口。"""
    state = {"days": [_day("2026-10-09", 5505)]}
    state, note = mod.upsert_state(state, _day("2026-10-09", 3815), force=True)
    assert note is None
    assert state["days"][0]["total_404"] == 3815


def test_existing_truncated_row_is_replaceable(mod):
    """既有那天撞過 CF 的 10000 列上限 → 它的總數本來就不可信，可以被換掉。"""
    state = {"days": [_day("2026-10-09", 10000, truncated=True)]}
    state, note = mod.upsert_state(state, _day("2026-10-09", 3815))
    assert note is None
    assert state["days"][0]["total_404"] == 3815


def test_new_day_is_appended(mod):
    """沒有既有紀錄的那天照常寫入。"""
    state = {"days": [_day("2026-10-09", 5505)]}
    state, note = mod.upsert_state(state, _day("2026-10-10", 6205))
    assert note is None
    assert [d["date"] for d in state["days"]] == ["2026-10-09", "2026-10-10"]
