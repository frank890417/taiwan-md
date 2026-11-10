# 重跑: python3 _timeline_taiex_scan.py        (主要區間)
#       python3 _timeline_taiex_scan.py gap    (2001-01~2023-05 補掃，確認期間內最高點)
# 資料源: TWSE 發行量加權股價指數歷史資料 https://www.twse.com.tw/rwd/zh/TAIEX/MI_5MINS_HIST?date=YYYYMM01&response=json
# 只掃相關區間(1999-2000 / 2023-06~2024-08 / 2025-01~2026-11)以免被 WAF 擋; TWSE 此 API 1999 年以前無資料。
import json,subprocess,csv,time
base="/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7/data/industry/raw/"
import sys
if len(sys.argv)>1 and sys.argv[1]=="gap":
    months=[(y,m) for y in range(2001,2024) for m in range(1,13) if (y,m)<=(2023,5)]
    OUT="twse_taiex_daily_gap2001_2023_20261110.csv"
else:
    OUT="twse_taiex_daily_selected_20261110.csv"
    months=[(y,m) for y in (1999,2000) for m in range(1,13)]
if OUT.startswith("twse_taiex_daily_selected"):
    months+=[(2023,m) for m in range(6,13)]+[(2024,m) for m in range(1,9)]
    months+=[(2025,m) for m in range(1,13)]+[(2026,m) for m in range(1,12)]
rows=[]
for y,m in months:
    d=f"{y}{m:02d}01"
    for k in range(4):
        r=subprocess.run(["curl","-sL","-m","25","-A","Mozilla/5.0",f"https://www.twse.com.tw/rwd/zh/TAIEX/MI_5MINS_HIST?date={d}&response=json"],capture_output=True)
        try:
            j=json.loads(r.stdout.decode()); break
        except Exception: time.sleep(4); j={}
    else: print("FAILED",d)
    for x in j.get("data",[]): rows.append([x[0]]+[v.replace(",","") for v in x[1:]])
    time.sleep(0.8)
with open(base+OUT,"w",newline="") as f:
    w=csv.writer(f);w.writerow(["roc_date","open","high","low","close"]);w.writerows(rows)
def iso(s):
    a,b,c=s.split("/");return f"{int(a)+1911}-{b}-{c}"
for th in (10000,20000,30000,40000):
    fc=next((iso(r[0]) for r in rows if float(r[4])>=th),None)
    fh=next((iso(r[0]) for r in rows if float(r[2])>=th),None)
    print(th,"first_close>=",fc,"first_high>=",fh)
print(len(rows),rows[0],rows[-1])
