#!/usr/bin/env python3
"""從開放高程資料抽出台灣本島的「行」資料——Taiwan.md 標誌與地形行的唯一地理來源。

為什麼要這支：REFLEXES #61「畫台灣優先取 SSOT，不靠 LLM 內化形狀」。
標誌是「把台灣本島一行一行掃描」，每一行的東西兩端必須來自真實海岸線，不能手描。

資料：Tilezen／Mapzen Terrain Tiles（AWS Open Data，terrarium 編碼，z9 ≈ 每像素 280 公尺）。
  來源組成含 SRTM（公有領域）、ETOPO1 等；授權與致謝見
  https://github.com/tilezen/joerd/blob/master/docs/attribution.md
執行：uv run --with numpy --with pillow python3 docs/brand/source/terrain/extract-terrain.py
輸出（都進 git，產生器只讀這兩份，不再連網）：
  taiwan-rows.json    本島每一列（1354 列）的西端、東端、最高點，與北迴歸線所在列
  taiwan-elev-q4.json 本島高程，每 4 像素取 1，單位公尺（給地形行與稜線圖用）
"""
import json, math, os, pathlib, urllib.request
from collections import deque
import numpy as np
from PIL import Image

HERE = pathlib.Path(__file__).parent
CACHE = HERE / '.tiles'  # gitignored；只是下載快取
Z = 9
TROPIC = 23.4365  # 北迴歸線緯度（2026 年值；會隨地軸傾角緩慢北移南移）

def tile(lon, lat, z):
    n = 2 ** z
    r = math.radians(lat)
    return int((lon + 180) / 360 * n), int((1 - math.log(math.tan(r) + 1 / math.cos(r)) / math.pi) / 2 * n)

def lat_of(py, y0t):
    Y = (y0t * 256 + py) / (256 * 2 ** Z)
    return math.degrees(math.atan(math.sinh(math.pi * (1 - 2 * Y))))

def lon_of(px, x0t):
    return (x0t * 256 + px) / (256 * 2 ** Z) * 360 - 180

def main():
    CACHE.mkdir(exist_ok=True)
    x0, y0 = tile(119.95, 25.35, Z)
    x1, y1 = tile(122.05, 21.85, Z)
    rows = []
    for ty in range(y0, y1 + 1):
        row = []
        for tx in range(x0, x1 + 1):
            fn = CACHE / f'{Z}_{tx}_{ty}.png'
            if not fn.exists():
                urllib.request.urlretrieve(
                    f'https://s3.amazonaws.com/elevation-tiles-prod/terrarium/{Z}/{tx}/{ty}.png', fn)
            a = np.asarray(Image.open(fn).convert('RGB')).astype(np.float64)
            row.append(a[:, :, 0] * 256 + a[:, :, 1] + a[:, :, 2] / 256 - 32768)
        rows.append(np.hstack(row))
    E = np.vstack(rows)
    land = E > 0.5
    H, W = land.shape
    # 最大連通區＝本島（澎湖、金門、馬祖、綠島、蘭嶼不在標誌裡；地圖頁另有完整資料）
    lab = np.zeros(land.shape, np.int32)
    best, cur = (0, 0), 0
    for sy in range(H):
        for sx in range(W):
            if land[sy, sx] and not lab[sy, sx]:
                cur += 1
                q = deque([(sy, sx)]); lab[sy, sx] = cur; n = 0
                while q:
                    y, x = q.popleft(); n += 1
                    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
                        yy, xx = y + dy, x + dx
                        if 0 <= yy < H and 0 <= xx < W and land[yy, xx] and not lab[yy, xx]:
                            lab[yy, xx] = cur; q.append((yy, xx))
                if n > best[0]:
                    best = (n, cur)
    main_ = lab == best[1]
    ys, xs = np.where(main_)
    r0, r1, c0, c1 = ys.min(), ys.max(), xs.min(), xs.max()
    M = main_[r0:r1 + 1, c0:c1 + 1]
    EL = np.where(main_, E, 0)[r0:r1 + 1, c0:c1 + 1]
    trop = next(r for r in range(r0, r1 + 1) if lat_of(r, y0) < TROPIC) - r0
    out = {
        'source': 'Tilezen Terrain Tiles (terrarium), AWS Open Data; SRTM 等，見 tilezen/joerd attribution',
        'zoom': Z, 'projection': 'Web Mercator（z9 像素格）',
        'width': int(M.shape[1]), 'height': int(M.shape[0]),
        'bounds': {'north': lat_of(r0, y0), 'south': lat_of(r1, y0), 'west': lon_of(c0, x0), 'east': lon_of(c1, x0)},
        'tropicRow': int(trop), 'tropicLat': TROPIC,
        'peak': {'row': int(np.unravel_index(EL.argmax(), EL.shape)[0]), 'col': int(np.unravel_index(EL.argmax(), EL.shape)[1]), 'm': round(float(EL.max()))},
        'rows': [],
    }
    for r in range(M.shape[0]):
        xs_ = np.where(M[r])[0]
        out['rows'].append([int(xs_.min()), int(xs_.max()), round(float(EL[r].max()))] if len(xs_) else None)
    (HERE / 'taiwan-rows.json').write_text(json.dumps(out, ensure_ascii=False, separators=(',', ':')))
    q = EL[::4, ::4]
    (HERE / 'taiwan-elev-q4.json').write_text(json.dumps({
        'step': 4, 'width': int(q.shape[1]), 'height': int(q.shape[0]),
        'm': [int(round(v)) for v in q.ravel()]}, separators=(',', ':')))
    print('rows', M.shape, 'tropicRow', trop, 'peak', out['peak'])

if __name__ == '__main__':
    main()
