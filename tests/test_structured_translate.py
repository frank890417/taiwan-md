import importlib.util
import re
from pathlib import Path


MODULE_PATH = (
    Path(__file__).resolve().parents[1]
    / "scripts"
    / "tools"
    / "lang-sync"
    / "structured-translate.py"
)
SPEC = importlib.util.spec_from_file_location("structured_translate", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def test_bisect_uses_paragraph_boundary_and_preserves_content():
    source = "第一段很短。\n\n第二段比較長，應該靠近中點。\n\n第三段收尾。"

    parts = MODULE._bisect_at_paragraph_boundary(source)

    assert len(parts) == 2
    assert "\n\n".join(parts) == source
    assert all(part.strip() for part in parts)


def test_bisect_refuses_single_paragraph():
    assert MODULE._bisect_at_paragraph_boundary("只有一段，不能從句中硬切。") == []


def test_extract_footnote_preserves_second_source_as_armored_desc():
    body = (
        "[^4]: [來源一](https://one.example/a) + "
        "[來源二](https://two.example/b) — 兩個來源共同支持。"
    )

    defs = MODULE.extract_footnote_defs(body)

    assert defs[0]["title"] == "來源一"
    assert defs[0]["url"] == "https://one.example/a"
    assert defs[0]["desc"] == "[來源二](@@LINK0@@) — 兩個來源共同支持。"
    assert defs[0]["_link_restore"] == [("@@LINK0@@", "https://two.example/b")]


def test_extract_footnote_recovers_nested_empty_link_source():
    body = (
        "[^2]: [Threads. 火燒島。取自 "
        "[](https://threads.example/post/1)) — 詳見原始連結。"
    )

    defs = MODULE.extract_footnote_defs(body)

    assert defs[0]["title"] == "Threads. 火燒島。取自"
    assert defs[0]["url"] == "https://threads.example/post/1"
    assert defs[0]["desc"] == "詳見原始連結。"


def test_normalize_footnote_batch_accepts_exact_id_mapping():
    batch = [{"n": "7"}, {"n": "9"}]
    data = {
        "9": {"title": "Nine", "desc": "D9"},
        "7": {"title": "Seven", "desc": "D7"},
    }

    assert MODULE.normalize_footnote_batch(data, batch) == [
        {"n": "7", "title": "Seven", "desc": "D7"},
        {"n": "9", "title": "Nine", "desc": "D9"},
    ]


def test_normalize_footnote_batch_rejects_missing_or_conflicting_ids():
    batch = [{"n": "7"}, {"n": "9"}]
    missing = {"7": {"title": "Seven", "desc": "D7"}}
    conflicting = {
        "7": {"n": "8", "title": "Seven", "desc": "D7"},
        "9": {"title": "Nine", "desc": "D9"},
    }

    assert MODULE.normalize_footnote_batch(missing, batch) is missing
    assert MODULE.normalize_footnote_batch(conflicting, batch) is conflicting


def test_normalize_footnote_batch_keeps_single_list_wrapper_support():
    batch = [{"n": "1"}]
    wrapped = {"translations": [{"n": "1", "title": "T", "desc": "D"}]}

    assert MODULE.normalize_footnote_batch(wrapped, batch) == wrapped["translations"]


def test_normalize_footnote_batch_accepts_single_exact_mapping_wrapper():
    batch = [{"n": "7"}, {"n": "9"}]
    wrapped = {
        "footnotes": {
            "9": {"title": "Nine", "desc": "D9"},
            "7": {"n": "7", "title": "Seven", "desc": "D7"},
        }
    }

    assert MODULE.normalize_footnote_batch(wrapped, batch) == [
        {"n": "7", "title": "Seven", "desc": "D7"},
        {"n": "9", "title": "Nine", "desc": "D9"},
    ]


def test_normalize_footnote_batch_rejects_inexact_mapping_wrapper():
    batch = [{"n": "7"}, {"n": "9"}]
    missing = {"footnotes": {"7": {"title": "Seven", "desc": "D7"}}}
    multi_wrapper = {
        "footnotes": {
            "7": {"title": "Seven", "desc": "D7"},
            "9": {"title": "Nine", "desc": "D9"},
        },
        "status": {},
    }

    assert MODULE.normalize_footnote_batch(missing, batch) is missing
    assert MODULE.normalize_footnote_batch(multi_wrapper, batch) is multi_wrapper


def test_footnote_batch_shape_rejects_single_record_salvaged_from_truncation():
    assert not MODULE.is_footnote_batch_response(
        {"n": "15", "title": "Only the tail survived", "desc": "Incomplete batch"}
    )
    assert MODULE.is_footnote_batch_response(
        {"footnotes": [{"n": "1", "title": "T", "desc": "D"}]}
    )
    assert MODULE.is_footnote_batch_response(
        {"1": {"title": "T", "desc": "D"}}
    )


def test_call_json_retries_when_parsed_json_has_wrong_shape():
    class Backend:
        def __init__(self):
            self.responses = [
                '{"n":"15","title":"tail","desc":"truncated"}',
                '[{"n":"1","title":"complete","desc":"batch"}]',
            ]

        def translate(self, *_args, **_kwargs):
            return self.responses.pop(0)

    metrics = {}
    result = MODULE.call_json(
        Backend(),
        "system",
        "user",
        max_tokens=100,
        timeout=1,
        max_attempts=2,
        metrics=metrics,
        label="phase-N-test",
        accept_data=MODULE.is_footnote_batch_response,
    )

    assert result == [{"n": "1", "title": "complete", "desc": "batch"}]
    assert [call["ok"] for call in metrics["calls"]] == [False, True]
    assert "JSON shape fail" in metrics["calls"][0]["error"]


def test_translate_footnotes_bisects_after_repeated_shape_failure():
    class Backend:
        def __init__(self):
            self.responses = [
                '{"n":"2","title":"tail","desc":"truncated"}',
                '{"n":"2","title":"tail","desc":"truncated again"}',
                '[{"n":"1","title":"One","desc":"D1"}]',
                '[{"n":"2","title":"Two","desc":"D2"}]',
            ]

        def translate(self, *_args, **_kwargs):
            return self.responses.pop(0)

    defs = [
        {"n": "1", "title": "一", "desc": "甲", "_link_restore": []},
        {"n": "2", "title": "二", "desc": "乙", "_link_restore": []},
    ]
    metrics = {}

    assert MODULE.translate_footnotes(defs, "hi", Backend(), metrics) == {
        "1": {"title": "One", "desc": "D1"},
        "2": {"title": "Two", "desc": "D2"},
    }
    assert [call["label"] for call in metrics["calls"]] == [
        "phase-N-batch0",
        "phase-N-batch0",
        "phase-N-batch0-split0",
        "phase-N-batch0-split1",
    ]


def test_validate_footnotes_rejects_markdown_in_translated_title():
    defs = [{"n": "1"}]
    translated = {"1": {"title": "[Source](broken)", "desc": "Description"}}

    assert MODULE.validate_footnotes(defs, translated) == [
        "footnote 1: title contains markdown/newline"
    ]


def test_translate_frontmatter_copies_subcategory_verbatim_from_zh():
    """subcategory 是分類頁的分群鍵（buildSubcategoryGroups 完全比對），譯文必須
    原樣保留 zh 值；2026-09-20 前 Phase F 會查 i18n 表或送模型翻，全庫 1,795 篇
    因此掉進「其他」組（OBSERVER-QUEUE #51）。"""
    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            import json
            payload = json.loads(user)
            assert "subcategory" not in payload, "subcategory 不該再進 prompt"
            out = {k: f"vi:{v}" if isinstance(v, str) else [f"vi:{t}" for t in v]
                   for k, v in payload.items()}
            return json.dumps(out, ensure_ascii=False)

    zh_fm = {
        "title": "周蕙", "description": "歌手", "subcategory": "歌手",
        "category": "Music", "tags": ["a", "b"], "date": "2026-01-01",
    }
    block = MODULE.translate_frontmatter(zh_fm, "", "Music/周蕙.md", "vi", Backend(), {})
    assert "subcategory: '歌手'" in block
    assert "title: 'vi:周蕙'" in block


def test_extract_prose_footnote_keeps_whole_text_and_armors_links():
    """散文型腳註（出處前綴＋連結、句中連結、方括號時間碼）2026-09-21 前掉進裸
    URL 分支：title 切成 `報時光：[標題](`、URL 後的 desc 整段丟掉，組回是巢狀壞
    連結，再被 validate_footnotes 擋下——一夜 36 次 Phase N 全在此陣亡。"""
    body = (
        "[^1]: 報時光：[被周杰倫買走](https://time.udn.com/a) — 報導 TPA 奪冠。\n"
        "[^9]: 吳哲宇，演講逐字稿 [1:00:07]（未公開素材）。同場另見"
        "[活動官方頁](https://events.example/x)，講題為主權實作。\n"
        "[^3]: 散見於台灣飲食文化研究及地方誌。"
    )

    defs = MODULE.extract_footnote_defs(body)

    assert defs[0]["prose"] and defs[0]["title"] == "" and defs[0]["url"] == ""
    assert defs[0]["desc"] == "報時光：[被周杰倫買走](@@LINK0@@) — 報導 TPA 奪冠。"
    assert defs[0]["_link_restore"] == [("@@LINK0@@", "https://time.udn.com/a")]
    assert defs[1]["prose"]
    assert "[1:00:07]" in defs[1]["desc"] and "@@LINK0@@" in defs[1]["desc"]
    # 純文字、無方括號、無 URL：也是散文（第一個上線 run 撞到模型把長 title 搬進 desc）
    assert defs[2]["prose"] and defs[2]["desc"].startswith("散見於") and defs[2]["title"] == ""


def test_prose_footnote_with_mid_sentence_autolink_keeps_text_after_url():
    """〈台灣新冠疫情與疫苗〉[^85]（2026-09-26）：散文註句中夾 autolink。舊的裸 URL
    分支把前文當 title、`\\S+` 把後面的中文吃進 URL、網址後的說明整段丟掉；模型把
    長 title 挪進 desc 後驗證器報 title empty，十一語每個模型都卡死在這一條。"""
    body = (
        "[^85]: 原始連結目前已失效，故正文寫「接近四十八億則」。中研院觀察筆記"
        "（<https://ai.iias.sinica.edu.tw/sms-contact-tracing-1/>）交叉確認上線日期，"
        "但未載累計總量。"
    )

    d = MODULE.extract_footnote_defs(body)[0]

    assert d["prose"] and d["title"] == "" and d["url"] == ""
    assert "<@@LINK0@@>" in d["desc"] and d["desc"].endswith("但未載累計總量。")
    assert d["_link_restore"] == [("@@LINK0@@", "https://ai.iias.sinica.edu.tw/sms-contact-tracing-1/")]
    translated = {"85": {"title": "", "desc": d["desc"].replace("但未載累計總量", "but no total")}}
    assert MODULE.validate_footnotes([d], translated) == []


def test_bare_citation_url_at_end_still_parses_as_title_and_url():
    """回歸保護：「標題 網址」且網址是最後一樣東西，仍走原本的 title+url 路徑。"""
    body = "[^4]: 行政院新聞稿 https://www.ey.gov.tw/Page/9277F759E41CCD91/abc。"

    d = MODULE.extract_footnote_defs(body)[0]

    assert not d["prose"]
    assert d["title"] == "行政院新聞稿"
    assert d["url"] == "https://www.ey.gov.tw/Page/9277F759E41CCD91/abc"


def test_prose_footnote_roundtrip_validates_and_assembles_verbatim_shape():
    body = "[^1]: 報時光：[被周杰倫買走](https://time.udn.com/a) — 報導 TPA 奪冠。"
    defs = MODULE.extract_footnote_defs(body)
    translated = {
        "1": {
            "title": "",
            "desc": "Time UDN: [Bought by Jay Chou](https://time.udn.com/a) — on TPA's win.",
        }
    }

    assert MODULE.validate_footnotes(defs, translated) == []
    assert MODULE.assemble_footnote_defs(defs, translated) == (
        "[^1]: Time UDN: [Bought by Jay Chou](https://time.udn.com/a) — on TPA's win."
    )
    assert MODULE.validate_footnotes(defs, {"1": {"title": "", "desc": " "}}) == [
        "footnote 1: prose footnote translated to empty"
    ]


def test_prose_footnote_ignores_model_supplied_title():
    """模型看到空 title 有時會自己補一個；組回去會多出原文沒有的字。"""
    body = "[^2]: 見[維基百科：BBS 在台灣](https://zh.wikipedia.org/wiki/BBS)。"
    defs = MODULE.extract_footnote_defs(body)
    import json

    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            payload = json.loads(user)
            return json.dumps([
                {"n": p["n"], "title": "Invented Title", "desc": "See [Wikipedia: BBS in Taiwan](@@LINK0@@)."}
                for p in payload
            ], ensure_ascii=False)

    out = MODULE.translate_footnotes(defs, "en", Backend(), {"calls": []})

    assert out["2"]["title"] == ""
    assert out["2"]["desc"] == "See [Wikipedia: BBS in Taiwan](https://zh.wikipedia.org/wiki/BBS)."


def test_translate_frontmatter_translates_image_alt_instead_of_copying_zh():
    """verify-translation.py 第 13 檢查把 imageAlt 跟 title/description 同列
    「不得留原文」，但 2026-09-21 前本引擎把它當 passthrough 機械複製——zh 有
    imageAlt 的 48 篇在 structured 路徑永遠過不了閘（一夜 36 次）。"""
    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            import json
            payload = json.loads(user)
            assert payload["imageAlt"] == "桐花祭開幕", "imageAlt 必須進 prompt"
            out = {k: f"vi:{v}" if isinstance(v, str) else [f"vi:{t}" for t in v]
                   for k, v in payload.items()}
            return json.dumps(out, ensure_ascii=False)

    zh_fm = {
        "title": "苗栗縣", "description": "客家", "category": "Geography",
        "image": "/img/miaoli.jpg", "imageAlt": "桐花祭開幕", "imageCredit": "CC",
        "tags": ["a"], "date": "2026-01-01",
    }
    block = MODULE.translate_frontmatter(zh_fm, "", "Geography/苗栗縣.md", "vi", Backend(), {})
    assert "imageAlt: 'vi:桐花祭開幕'" in block
    assert "image: /img/miaoli.jpg" in block or "image: '/img/miaoli.jpg'" in block
    assert "imageCredit: CC" in block or "imageCredit: 'CC'" in block


def test_translate_footnotes_batches_by_char_budget_not_only_count():
    """散文型腳註整條進 desc 後一批 15 條可達 3,500 字，本機模型 Phase N 撞 240 秒
    逾時（2026-09-21 外送專法 de）。字元預算讓長引註多拆幾批、短引註批次不變。"""
    import json
    seen = []

    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            payload = json.loads(user)
            seen.append(len(payload))
            return json.dumps([{"n": p["n"], "title": p["title"], "desc": p["desc"]} for p in payload])

    long_defs = [{"n": str(i), "title": "", "desc": "字" * 700, "url": "", "_link_restore": [], "prose": True}
                 for i in range(1, 7)]
    MODULE.translate_footnotes(long_defs, "de", Backend(), {"calls": []})
    assert seen == [2, 2, 2]          # 每批 ≤2000 字 → 兩條一批

    seen.clear()
    short_defs = [{"n": str(i), "title": "短", "desc": "", "url": "https://x/" + str(i), "_link_restore": []}
                  for i in range(1, 21)]
    MODULE.translate_footnotes(short_defs, "de", Backend(), {"calls": []})
    assert seen == [15, 5]            # 短引註仍照 15 條一批


def test_chunk_ratio_ceiling_follows_language_band(tmp_path):
    """2026-09-22：chunk 比值上限從寫死 4.0 改按 ratio-bands.json 該語言 healthy_max 放大。
    fr 合格譯文 chunk 級 p95 已是 4.60，舊上限每篇十塊擋一塊，structured 在羅曼語 12% 通過率的病根。"""
    lo, hi = MODULE.chunk_ratio_band("fr")
    assert lo == MODULE.CHUNK_RATIO_FLOOR
    assert hi > MODULE.CHUNK_RATIO_LEGACY_CEILING  # fr healthy_max 4.0 × 1.3
    # ja/ko 整篇 band 遠低於 4.0，上限不收緊（本次只修假陽性，不新開拒收面）
    assert MODULE.chunk_ratio_band("ja")[1] == MODULE.CHUNK_RATIO_LEGACY_CEILING
    # 未校準語言退回舊值
    assert MODULE.chunk_ratio_band("xx") == (MODULE.CHUNK_RATIO_FLOOR, MODULE.CHUNK_RATIO_LEGACY_CEILING)

    zh = "## 標題\n\n" + "這是一段中文內容。" * 40
    out_fr = "## Titre\n\n" + "Ceci est un paragraphe de contenu en français. " * 33
    ratio = len(out_fr) / len(zh)
    assert 4.0 < ratio < hi, ratio  # 落在舊上限與新上限之間的合法 chunk
    issues = MODULE._validate_chunk(zh, out_fr, set(), "fr", tmp_path)
    assert not any(i.startswith("ratio out of band") for i in issues), issues
    # 明顯胡言亂語（20 倍）仍擋
    issues = MODULE._validate_chunk(zh, out_fr * 5, set(), "fr", tmp_path)
    assert any(i.startswith("ratio out of band") for i in issues), issues


def test_render_scalar_keeps_nested_mapping_and_null_as_yaml_types():
    """2026-09-22：dict 曾 fallthrough 成 str(dict) 單引號字串（上站 1,140 份譯文的 rationale
    變成 Python repr 一整行）、None 曾變字串 'None'（beyblade 三語）。跟 07-26 的 list 案是同一個
    型別走樣家族。"""
    import yaml

    d = {"why_this_hook": "從一條光切入", "nested": {"a": 1, "b": "it's"}, "n": None, "l": ["x", "y"]}
    out = "rationale:" + MODULE.render_scalar(d)
    assert yaml.safe_load(out) == {"rationale": d}
    assert "{'" not in out  # 不是 repr
    assert MODULE.render_scalar(None) == "null"


def test_render_scalar_multiline_string_becomes_block_scalar():
    """zh 用 `|` 寫的多行 whats_excluded 清單，單引號會摺掉換行；改 block scalar 後 parse 回來逐字相等。"""
    import yaml

    d = {"whats_excluded": "- 甲\n- 乙\n", "note": "x\ny"}
    out = "rationale:" + MODULE.render_scalar(d) + "\n"
    assert yaml.safe_load(out) == {"rationale": d}
    assert "|" in out


def test_resolve_wikilinks_links_when_translation_exists_else_plain_text():
    """2026-09-22：structured 引擎此前不處理 [[X]]，模型把括號內翻掉、括號留著，wikilink-target 硬閘擋整篇。"""
    import sys
    from pathlib import Path as _P

    sys.path.insert(0, str(_P(MODULE_PATH).parent))
    import cross_link_localizer as x

    text = "見 [[偏遠地區學校教育發展條例全解|條例]] 與 [[這頁不存在於任何分類]]。"
    out, linked, plain = x.resolve_wikilinks(text, "de")
    assert "[[" not in out
    assert "[條例](/de/society/remote-area-schools-education-act/)" in out
    assert "這頁不存在於任何分類" in out and linked == 1 and plain == 1
    # 不在翻譯語言清單 → 原樣
    assert x.resolve_wikilinks(text, "zz") == (text, 0, 0)


def test_render_scalar_list_of_mappings_becomes_block_sequence():
    """2026-09-22 回歸：dict 改渲染 block mapping 後，sporeLinks（list of mapping）被塞進 flow list，
    台海危機七語全撞「while parsing a flow sequence」。含 dict／list／多行元素的 list 改渲染 block sequence。"""
    import yaml

    spore = [{"id": 13, "platform": "threads", "date": "2026-04-08", "url": "https://x/y"}]
    out = "sporeLinks:" + MODULE.render_scalar(spore) + "\n"
    assert yaml.safe_load(out) == {"sporeLinks": spore}
    assert "[" not in out.split("\n")[0]
    # 純標量 list 仍是 inline flow list（relatedDiary 慣例不變）
    assert MODULE.render_scalar(["a", "b"]) == "['a', 'b']"
    nested = {"x": [{"a": 1, "b": {"c": 2}}, {"a": 3}], "z": [[1, 2], [3]]}
    o = "r:" + MODULE.render_scalar(nested) + "\n"
    assert yaml.safe_load(o) == {"r": nested}


def test_armored_whole_engine_translates_image_alt_and_keeps_spore_links_block():
    """整篇引擎（裝甲路徑）：zh 有 imageAlt 時 prompt 帶 ALT 行、輸出要 ===ALT===；沒交就判失敗讓 cascade 換模型。
    sporeLinks 這種 list of mapping 組回 block sequence，YAML 可 parse。"""
    import importlib.util as _ilu
    import re as _re
    import sys
    import yaml

    tpath = MODULE_PATH.parent / "translate.py"
    sys.path.insert(0, str(MODULE_PATH.parent))
    spec = _ilu.spec_from_file_location("translate_whole", tpath)
    tr = _ilu.module_from_spec(spec)
    spec.loader.exec_module(tr)
    zh = (
        "---\ntitle: 'T0'\ndescription: 'D0'\ntags: ['甲']\nimageAlt: '花蓮山景'\n"
        "sporeLinks:\n  - id: 13\n    platform: 'threads'\n---\n\n# T0\n\n正文一段。\n"
    )
    system, user, ctx = tr.armor_pre({"frontmatter_placeholder": {"translatedFrom": "X/Y.md"}}, zh, "ko")
    assert "ALT: 花蓮山景" in user
    body = _re.search(r"```markdown\n(.*?)\n```", user, _re.S).group(1)
    ok_out = "===TITLE===\nT\n===DESC===\nD\n===TAGS===\na\n===ALT===\n화련 산\n===BODY===\n" + body
    res, err = tr.armor_post(ok_out, ctx, {"frontmatter_placeholder": {"translatedFrom": "X/Y.md"}})
    assert err is None
    fm = yaml.safe_load(res.split("\n---")[0][4:])
    assert fm["imageAlt"] == "화련 산"
    assert fm["sporeLinks"] == [{"id": 13, "platform": "threads"}]
    no_alt = "===TITLE===\nT\n===DESC===\nD\n===TAGS===\na\n===BODY===\n" + body
    assert tr.armor_post(no_alt, ctx, {"frontmatter_placeholder": {}})[1].startswith("armor: zh has imageAlt")


def test_body_chunk_urls_are_armored_and_restored():
    """Phase B 的 URL 裝甲（2026-09-23）：模型收到的是 @@LINKn@@ 佔位符，原始
    網址從頭到尾沒進 prompt——「inline link URL mismatch」是 run 98122 近 20 小時
    失敗第一大宗（31 次），而 Phase N 走同一條裝甲從沒出過這類事。"""
    seen_prompts = []

    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            seen_prompts.append(user)
            # 逐句譯掉中文、佔位符原樣抄回（模型該有的行為）
            out = re.sub(r"[一-鿿，。]+", "translated prose ", user)
            return out

    zh_chunk = (
        "## 段落\n\n這是[台灣的頁面](/society/%E5%8F%B0%E7%81%A3)與"
        "[參考來源](https://example.org/a_(b))的說明文字，長度要夠過比值下限。" * 3
    )
    outs, reports = MODULE.translate_body_chunks([zh_chunk], "en", Backend(), {}, {})

    assert "@@LINK0@@" in seen_prompts[0]
    assert "/society/%E5%8F%B0%E7%81%A3" not in seen_prompts[0], "原始 URL 不該進 prompt"
    assert "/society/%E5%8F%B0%E7%81%A3" in outs[0]
    assert "https://example.org/a_(b)" in outs[0]
    assert reports[0]["status"] == "OK"


def test_localized_digits_inside_link_token_still_restore():
    """ar/hi 的模型會把 @@LINK1@@ 的 ASCII 數字換成該語言數字（١ / १）。數字系統
    換寫是可逆的機械對應，所以還原時正規化回 ASCII 再對；認不出來的形狀一律原樣
    留著讓下游 URL multiset 閘門擋，不按位置硬猜（猜錯＝把讀者送到別人的頁面）。"""
    items = [("@@LINK0@@", "https://a.example/x"), ("@@LINK1@@", "https://b.example/y")]

    restored = MODULE._restore_protected_links(
        "[نص](@@LINK٠@@) و [نص](@@LINK१@@)", items)

    assert restored == "[نص](https://a.example/x) و [نص](https://b.example/y)"

    # 形狀壞到認不出索引 → 原樣留著（由閘門擋），不猜
    assert "@@LINKX@@" in MODULE._restore_protected_links("[t](@@LINKX@@)", items)


def test_frontmatter_accepts_single_element_list_wrapper():
    """模型把單一物件包成一元陣列回來（run 98122 全程 21 次 phase-F shape fail）。
    Phase N 早就接受鏡像形狀（物件內恰好一個 list），Phase F 補上同一條。"""
    import json

    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            payload = json.loads(user)
            return json.dumps([{k: f"en:{v}" if isinstance(v, str)
                                else [f"en:{t}" for t in v]
                                for k, v in payload.items()}], ensure_ascii=False)

    block = MODULE.translate_frontmatter(
        {"title": "苗栗縣", "description": "客家", "tags": ["a", "b"]},
        "", "Geography/苗栗縣.md", "en", Backend(), {})

    assert "title: 'en:苗栗縣'" in block
    assert MODULE._unwrap_singleton_payload([{"a": 1}]) == {"a": 1}
    assert MODULE._unwrap_singleton_payload([{"a": 1}, {"b": 2}]) == [{"a": 1}, {"b": 2}]


def test_json_retry_tells_the_model_what_went_wrong():
    """重試不要原樣重播同一個 prompt（2026-09-23）：新加的原文摘錄證實「no balanced
    JSON」不是空回應——模型拿整批腳註當文件寫了一篇中文 markdown 回來。同一個 prompt
    再送一次，模型沒有理由改變行為。"""
    systems = []

    class Backend:
        name = "stub"

        def __init__(self):
            self.calls = 0

        def translate(self, system, _user, **_kwargs):
            systems.append(system)
            self.calls += 1
            return "# 這是一篇 markdown，不是 JSON" if self.calls == 1 else '{"ok": 1}'

    data = MODULE.call_json(Backend(), "SYS", "USER", max_tokens=100, timeout=10,
                            max_attempts=2, metrics={}, label="phase-X",
                            accept_data=lambda d: isinstance(d, dict))

    assert data == {"ok": 1}
    assert "previous answer was rejected" not in systems[0]
    assert "previous answer was rejected" in systems[1]
    assert "raw_len=" in systems[1], "要把上一輪的實際長度與開頭帶給模型"


def test_single_item_batch_accepts_bare_object_with_matching_id():
    batch = [{"n": "7", "title": "標題", "desc": "說明"}]
    record = {"n": "7", "title": "Title", "desc": "Desc"}
    assert MODULE.is_footnote_batch_response(record, batch)
    assert MODULE.normalize_footnote_batch(record, batch) == [record]


def test_bare_object_still_rejected_for_multi_item_or_wrong_id():
    record = {"n": "7", "title": "Title", "desc": "Desc"}
    two = [{"n": "7", "title": "a", "desc": "b"}, {"n": "8", "title": "c", "desc": "d"}]
    wrong = [{"n": "9", "title": "a", "desc": "b"}]
    assert not MODULE.is_footnote_batch_response(record, two)
    assert not MODULE.is_footnote_batch_response(record, wrong)
    assert not MODULE.is_footnote_batch_response(record)
    assert MODULE.normalize_footnote_batch(record, two) is record


def test_extract_json_loose_prefers_outer_object_over_inner_array():
    text = '{"title": "T", "description": "D", "tags": ["a", "b"]}\n\nNote: done.'
    assert MODULE._extract_json_loose(text) == {
        "title": "T", "description": "D", "tags": ["a", "b"],
    }


def test_extract_json_loose_still_takes_last_answer_after_reasoning():
    text = 'Thinking {"draft": 1} ... final:\n[{"n": "1", "title": "T", "desc": "D"}]'
    assert MODULE._extract_json_loose(text) == [{"n": "1", "title": "T", "desc": "D"}]
    truncated = '[{"n": "1", "title": "A", "desc": "a"}, {"n": "2", "title": "B", "desc": "b"}, {"n": "3"'
    assert MODULE._extract_json_loose(truncated) == {"n": "2", "title": "B", "desc": "b"}


def test_repair_unescaped_quotes_german_low9_and_ascii_inner_quotes():
    """2026-09-26：譯文裡沒跳脫的引號打斷 JSON——德文 `„…"`（收引號寫成 ASCII）與
    把「」譯成 ASCII `"…"`。舊路徑只撈得到最後一個物件（shape fail: dict keys=…）。"""
    import json

    german = '[{"n": "1", "title": "Taipei Times „More than NT$1.12 billion"", "desc": "x"}]'
    fixed = json.loads(MODULE._repair_unescaped_quotes(german))
    assert fixed == [{"n": "1", "title": "Taipei Times „More than NT$1.12 billion“", "desc": "x"}]

    english = '[{"n": "2", "title": "The so-called "guardian" system", "desc": "He said "no""}]'
    fixed = json.loads(MODULE._repair_unescaped_quotes(english))
    assert fixed[0]["title"] == 'The so-called "guardian" system'
    assert fixed[0]["desc"] == 'He said "no"'


def test_repair_unescaped_quotes_leaves_valid_json_byte_identical():
    valid = '[{"n": "1", "title": "A \\"quoted\\" word", "desc": "„ok“ — fine"}, {"n": "2", "title": "", "desc": "x"}]'
    assert MODULE._repair_unescaped_quotes(valid) == valid


def test_call_json_recovers_array_broken_by_inner_quote():
    class Backend:
        name = "stub"

        def translate(self, _system, _user, **_kwargs):
            return '```json\n[{"n": "1", "title": "Zeitung „Zitat"", "desc": "d"}, {"n": "2", "title": "t", "desc": "d"}]\n```'

    metrics = {"calls": []}
    data = MODULE.call_json(Backend(), "sys", "user", max_tokens=100, timeout=10, max_attempts=1,
                            metrics=metrics, label="t", accept_data=lambda d: isinstance(d, list))
    assert [x["n"] for x in data] == ["1", "2"]
    assert data[0]["title"] == "Zeitung „Zitat“"
    assert metrics["calls"][0].get("quote_repair") is True


def test_footnote_title_brackets_normalized_before_validation():
    """2026-09-26：Phase N 驗證失敗 131/154 次是 title contains markdown/newline——模型把
    全形【隨筆】譯成 ASCII `[Essay]`。標點層機械轉成圓括號，不讓整篇因此不寫檔。"""
    import json

    body = "[^3]: [Chris Wang：【隨筆】英文名字（Medium, 2017）](https://chris916.medium.com/x) — 個人部落格隨筆。"
    defs = MODULE.extract_footnote_defs(body)

    class Backend:
        name = "stub"

        def translate(self, _system, user, **_kwargs):
            payload = json.loads(user)
            return json.dumps([{"n": p["n"], "title": "Chris Wang: [Essay] English\nnames (Medium, 2017)",
                                "desc": "Personal blog essay."} for p in payload])

    out = MODULE.translate_footnotes(defs, "de", Backend(), {"calls": []})

    assert out["3"]["title"] == "Chris Wang: (Essay) English names (Medium, 2017)"
    assert MODULE.validate_footnotes(defs, out) == []


def test_footnote_title_with_embedded_link_is_left_for_validator():
    assert MODULE._normalize_footnote_title("[Foo](https://x.y)") == "[Foo](https://x.y)"


def test_crossref_token_mapped_back_by_number():
    # 模型把「（見 [^88]）」寫成 @@LINK88@@，原文 desc 有 [^88]
    zh = "與解編前夕中央社報導的「一萬九千多人死亡」（見 [^88]）相比"
    out = "compared with the CNA report of 19,000 deaths (see @@LINK88@@)"
    assert MODULE._restore_crossref_tokens(out, zh) == "compared with the CNA report of 19,000 deaths (see [^88])"


def test_single_renumbered_crossref_token_maps_to_the_only_ref():
    zh = "正文採「已出貨」，因 [^74] 的食藥署查核證實"
    out = "o texto adota \"já enviadas\", porque @@LINK0@@ verificação da FDA"
    assert "[^74]" in MODULE._restore_crossref_tokens(out, zh)


def test_ambiguous_crossref_tokens_are_left_for_the_gate():
    zh = "見 [^3] 與 [^9]"
    out = "see @@LINK0@@ and @@LINK1@@"
    assert MODULE._restore_crossref_tokens(out, zh) == out


def test_frontmatter_provenance_uses_status_py_hashes():
    # 2026-09-26：舊版對整份 zh 檔（含 frontmatter）取雜湊、又不寫 sourceBodyHash，
    # 跟 status.py 的語意不同——zh 只動參考資料區時，這支的產出一律判 stale。
    import collections
    import json

    import yaml

    zh_path = "Music/蘇打綠.md"
    zh_content = (Path(__file__).resolve().parents[1] / "knowledge" / zh_path).read_text(encoding="utf-8")
    zh_fm = yaml.safe_load(zh_content.split("---", 2)[1])

    class FakeBackend:
        def translate(self, system, user, max_tokens=None, timeout=None):
            payload = json.loads(user)
            return json.dumps({k: ([f"tag {i}" for i in range(len(v))] if isinstance(v, list)
                                   else f"translated {k}") for k, v in payload.items()})

    block = MODULE.translate_frontmatter(zh_fm, zh_content, zh_path, "en", FakeBackend(),
                                         collections.defaultdict(int))
    assert f"sourceContentHash: '{MODULE._status.body_hash(zh_content)}'" in block
    assert f"sourceBodyHash: '{MODULE._status.body_hash_pure(zh_content)}'" in block
