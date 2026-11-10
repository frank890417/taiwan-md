import q,re
for ym in [f"{y}12" for y in range(105,115)]+["11508"]:
    r=q.run('tqemployees01',ym,ym,f"/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7/data/industry/raw/nstc_wsts_D1_employees_{ym}.html")
    t=q.text(r)
    p=re.search(r'資料期間：[^|]*',t).group(0)
    rows=re.findall(r'(新竹科學園區|中部科學園區|南部科學園區|總　　計)\|(?:[\d,]+\|){6}([\d,]+)\|',t)
    print(ym,p,rows)
