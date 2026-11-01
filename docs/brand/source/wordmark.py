#!/usr/bin/env python3
"""Taiwan.md 標準字外框產生器（識別系統 v2.2）。

v2.2（2026-10-23）改成單一家族：v2.0 的 Source Serif 4「Taiwan」接 IBM Plex Mono「.md」，
兩個家族黏在一個九個字母的字上，等寬字的點又大又圓，近看像兩個標誌拼起來。

字（全部 OFL，授權檔在 docs/brand/fonts/）：
  Taiwan.md        Newsreader，光學尺寸 72、字重 500（Production Type 為 Google 做的新聞閱讀字，
                   展示尺寸筆畫對比清楚；.md 只換顏色，不換字）
  開源台灣知識庫     Noto Sans TC 500（＝思源黑體 TC，教育部標準字形），字距 0.14 em
排字用 HarfBuzz，字體自己的字偶表（T–a、w–a 這類）照樣生效；整字再收 TRACK。
字檔太大的（變體字、思源黑體）不進 repo：第一次跑會下載到 .cache/，
子集化成 fonts/ 裡的小檔（只含這幾個字），之後重跑只讀小檔。
執行：uv run --with fonttools --with uharfbuzz python3 docs/brand/source/wordmark.py
輸出：docs/brand/source/wordmark.json（路徑＋度量；產生器只讀它，不讀字檔）
"""
import json, pathlib, urllib.request
import uharfbuzz as hb
from fontTools.ttLib import TTFont
from fontTools.varLib.instancer import instantiateVariableFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.transformPen import TransformPen
from fontTools.pens.boundsPen import BoundsPen
from fontTools.misc.transform import Transform
from fontTools import subset

HERE = pathlib.Path(__file__).parent
FONTS = HERE.parent / 'fonts'
CACHE = HERE / '.cache'
WORD = 'Taiwan.md'
ZH = '開源台灣知識庫'
# 單位：字級的千分之一
SPEC = {'track': -18, 'zh-size': 0.25, 'zh-track': 140, 'zh-gap': 0.40}

SOURCES = {
    'newsreader': ('Newsreader-var.ttf', 'https://raw.githubusercontent.com/google/fonts/main/ofl/newsreader/Newsreader%5Bopsz,wght%5D.ttf'),
    'notosanstc': ('NotoSansTC-var.ttf', 'https://raw.githubusercontent.com/google/fonts/main/ofl/notosanstc/NotoSansTC%5Bwght%5D.ttf'),
}


def static(key, axes, text, out):
    p = FONTS / out
    if not p.exists():
        CACHE.mkdir(exist_ok=True)
        name, url = SOURCES[key]
        src = CACHE / name
        if not src.exists():
            urllib.request.urlretrieve(url, src)
        f = TTFont(str(src))
        instantiateVariableFont(f, axes, inplace=True)
        opts = subset.Options()
        opts.layout_features = ['kern', 'liga', 'calt']
        opts.name_IDs = ['*']
        s = subset.Subsetter(opts)
        s.populate(text=text)
        s.subset(f)
        f.save(str(p))
    return p


def shape(path, text, fs, x0=0.0, y0=0.0, track=0.0):
    """HarfBuzz 排字，回傳每個字的 (svg path, 墨邊左, 墨邊右, 前進後 x)。"""
    blob = hb.Blob.from_file_path(str(path))
    face = hb.Face(blob)
    font = hb.Font(face)
    buf = hb.Buffer()
    buf.add_str(text)
    buf.guess_segment_properties()
    hb.shape(font, buf, {'kern': True, 'liga': True})
    tt = TTFont(str(path))
    gs = tt.getGlyphSet()
    order = tt.getGlyphOrder()
    scale = fs / face.upem
    x = x0
    out = []
    for info, pos in zip(buf.glyph_infos, buf.glyph_positions):
        g = order[info.codepoint]
        pen = SVGPathPen(gs)
        gx = x + pos.x_offset * scale
        gs[g].draw(TransformPen(pen, Transform(scale, 0, 0, -scale, gx, y0 - pos.y_offset * scale)))
        bp = BoundsPen(gs)
        gs[g].draw(bp)
        b = bp.bounds or (0, 0, 0, 0)
        out.append((pen.getCommands(), gx + b[0] * scale, gx + b[2] * scale, info.cluster))
        x += pos.x_advance * scale + track
    return out, x, tt


def main():
    FS = 1000.0
    serif = static('newsreader', {'wght': 500, 'opsz': 72}, WORD + 'T', 'Newsreader-Display-Medium-wordmark.ttf')
    sans = static('notosanstc', {'wght': 500}, ZH, 'NotoSansTC-Medium-wordmark-subset.ttf')
    glyphs, _, tt = shape(serif, WORD, FS, track=SPEC['track'])
    su = FS / tt['head'].unitsPerEm
    capH = tt['OS/2'].sCapHeight * su
    xH = tt['OS/2'].sxHeight * su
    md_from = WORD.index('.')
    paths = [{'d': d, 'role': 'md' if c >= md_from else 'taiwan'} for d, _, _, c in glyphs]
    ink_left = glyphs[0][1]
    width = max(r for _, _, r, _ in glyphs)
    zs = SPEC['zh-size'] * FS
    zy = SPEC['zh-gap'] * FS + zs * 0.88
    ztrack = SPEC['zh-track'] / 1000 * zs
    probe, _, _ = shape(sans, ZH, zs, 0, zy, track=ztrack)
    shift = ink_left - probe[0][1]  # 中文副標左緣對齊 T 的墨邊
    zg, _, _ = shape(sans, ZH, zs, shift, zy, track=ztrack)
    zpaths = [d for d, _, _, _ in zg]
    zwidth = zg[-1][2]
    out = {
        'unit': '字級 1000', 'capHeight': capH, 'xHeight': xH,
        'ascender': tt['OS/2'].sTypoAscender * su, 'descender': tt['OS/2'].sTypoDescender * su,
        'width': width, 'inkLeft': ink_left,
        'paths': paths,
        'zh': {'text': ZH, 'paths': zpaths, 'shiftX': shift, 'baseline': zy, 'width': zwidth},
        'kern': SPEC,
        'fonts': {'taiwan': 'Newsreader Display Medium，opsz 72（OFL）', 'md': '同上，只換顏色', 'zh': 'Noto Sans TC 500／思源黑體 TC（OFL）'},
    }
    (HERE / 'wordmark.json').write_text(json.dumps(out, ensure_ascii=False))
    print('capH', round(capH), 'xH', round(xH), 'width', round(width), 'zh width', round(zwidth), 'shift', round(shift))


if __name__ == '__main__':
    main()
