import q,re,sys
for y in list(range(106,115))+[115]:
    e=f"{y}06" if y==115 else f"{y}12"
    r=q.run('tqindustry04',f"{y}01",e,f"/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7/data/industry/raw/nstc_wsts_C4_revenue_{y}.html")
    t=q.text(r)
    m=re.search(r'資料期間：[^|]*\|?',t); 
    rows=re.findall(r'(新竹科學園區|中部科學園區|南部科學園區|總　　計)\|(?:[\d,.]+\|){7}([\d,.]+)\|',t)
    print(y,m.group(0) if m else None,rows)
