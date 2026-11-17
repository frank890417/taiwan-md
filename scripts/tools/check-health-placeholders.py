#!/usr/bin/env python3
"""check-health-placeholders.py — /health 各頁渲染後不該留下沒代入的 {佔位} 或 [[腳註key]]。

誕生：2026-11-10 英雄區一句文案用 t() 而不是 p()，頁面上直接印出「{fundYear} 年有 {ltcPaid} 萬人」，
先前的檢查是改文案之前跑的所以沒抓到，看手機截圖才發現。要先開 dev server（預設埠 4331，可用第一個參數換）。
"""
import re
import subprocess
import sys

PORT = sys.argv[1] if len(sys.argv) > 1 else "4331"
bad=0
for u in ['/health/','/en/health/','/health/long-term-care-subsidy/','/health/long-term-care-eligibility/','/health/nhi-premium-calculator/','/health/advance-care-planning/','/en/health/advance-care-planning/','/en/health/nhi-premium-calculator/','/en/health/long-term-care-subsidy/','/embed/health/nhi-premium-calculator/']:
    t=subprocess.run(['curl','-s','--max-time','240','http://localhost:' + PORT + u],capture_output=True,text=True).stdout
    body=re.sub(r'<script.*?</script>|<style.*?</style>','',t,flags=re.S)
    txt=re.sub(r'<[^>]+>',' ',body)
    m=re.findall(r'.{0,16}(?:\{[a-zA-Z][a-zA-Z0-9]*\}|\[\[[\w.]+\]\]).{0,10}',txt)
    print(u,len(t),'unresolved:',m[:3]); bad+=len(m)
sys.exit(1 if bad else 0)
