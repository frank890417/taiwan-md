# gdp-structure 研究紀錄（2026-11-10）

輸出：`data/industry/research/gdp-structure.json`。原始檔在 `data/industry/raw/`（dgbas-natl-acct-20261110-\*.xlsx、dgbas-ni-summary-115-08/、dgbas-press-115-08/、dgbas-manpower-yb114/、cepd-taiwan-statistical-data-book-2010.pdf）。

## 拿到的

- **threeSectors（農/工/服務/製造占 GDP，名目）**：全部 24 個年份都有。來源：主計總處「國民所得統計常用資料」同頁的「生產帳*季*對外發布版(060a).xlsx」（更新日期 2026/8/14）。1981 起直接用主計總處占比；1951~1980 只有金額，用總計(生產面)自算。三業相加≈100（四捨五入尾差±0.01）。交叉核對：與「國民所得統計摘要(115年8月更新)」np16 的 2015~2025 農/工/製造業占比逐年一致。
- **electronics**：2001、2005、2010、2015~2024 的電子零組件（CR）與電腦電子光學（CS）占比，來自「生產帳*年*對外發布版(056).xlsx」（更新日期 2025/11/28），自百萬元金額算出；同檔製造業占比與季檔 2023、2024 的製造業占比相同，確認分母口徑一致。
- **employment**：1990、2010、2020、2024、2025 取自 114 年人力資源調查統計年報表 13（發布單位：國勢普查處）；1952、1970 取自經建會 Taiwan Statistical Data Book 2010 表 2-9a（原始來源：主計總處《人力資源統計月報》2010 年 5 月）。
- **gdpLevel**：2015~2025 名目 GDP（億元）與人均 GDP（美元）、經濟成長率，來自「國民所得統計常用資料」（網頁更新 115-11-09）。2026 年預測：全年成長 11.05%、人均 GDP 45,332 美元，2026-08-14 新聞稿。2026-10-30 的 Q3 概估稿（yoy 14.36%）沒有更新全年預測。

## 沒拿到的（null）

- **electronics 2025**：年度細業別檔只到 2024。季檔只有 A~S 大類。nstatdb 資料庫是 JS 動態查詢，這次沒有程式化取得。主計總處通常 11 月底更新年度檔，之後可補。
- **資通訊產業占 GDP 官方數字**：沒找到。最接近的是大類 J「出版影音及資通訊業」（約 3.1%，2025 為 3.05%），已另列 `publishing_av_ict_J_pct`，但它是服務業側，不含電子製造。
- 1952 的勞動調查官方原始檔（人力資源調查年報只到 1978）：用 TSDB 2010 代替，已在 source 標「鏡像網域、非官方網域」。想要官方網域版本，需查 DGBAS 舊版《人力資源統計月報》。

## 口徑注意

1. 占比分母是 GDP(生產面)（不含統計差異）；三業採「補充項目」口徑，進口稅與營業稅已分攤，製造業不分攤，故不同表之間的製造業占比可能差一點。
2. 名目（當期價格），2008SNA 版。2025（民國 114）年為修訂後數字，仍可能被後續季次修正。
3. 就業占比與產值占比分母不同，分類標準歷經第 7~11 次修訂，各期不完全可比。1952/1970 的調查口徑與現行不同。
4. 2025 人均 GDP 39,515 美元是統計值，2026 的 45,332 美元是預測值，使用時請標明。
5. CR 內含晶圓代工；CR+CS 只是近似「電子資通硬體」，非官方定義。

## 重跑

```
python3 -W ignore -I <本檔下方腳本存成 build_gdp_structure.py>   # 需 openpyxl
```

下載指令（raw 檔）：

```
curl -sL -o 'dgbas-natl-acct-20261110-生產帳_季_對外發布版(060a).xlsx' 'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/生產帳_季_對外發布版(060a).xlsx'
curl -sL -o 'dgbas-natl-acct-20261110-生產帳_年_對外發布版(056).xlsx' 'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/生產帳_年_對外發布版(056).xlsx'
curl -sL -o 'dgbas-natl-acct-20261110-table(060a).xlsx' 'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/table(060a).xlsx'
curl -sL -o dgbas-manpower-yb114/table13.xlsx 'https://ws.dgbas.gov.tw/001/Upload/463/relfile/11516/236078/table13.xlsx'
curl -sL -o cepd-taiwan-statistical-data-book-2010.pdf 'https://www.taiwan-database.net/PDFs/Taiwan_Statistical_Data_Book_2010.pdf'
curl -sL -o dgbas-press-115-08/news11508.pdf 'https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/news11508.pdf'
```

## 腳本

```python
#!/usr/bin/env python3
"""Rebuild data/industry/research/gdp-structure.json from raw files in data/industry/raw/.
Run from repo (worktree) root:  python3 -W ignore -I <this file>   (needs openpyxl)"""
import openpyxl, re, json, os
ROOT='/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7'
RAW=ROOT+'/data/industry/raw/'
ACC='2026-11-10'
def load(f): return openpyxl.load_workbook(RAW+f,data_only=True)
def cl(s): return re.sub(r'[\s　]','',str(s))

# ---- sources
U_Q='https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/生產帳_季_對外發布版(060a).xlsx'
U_A='https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/生產帳_年_對外發布版(056).xlsx'
U_T='https://ws.dgbas.gov.tw/001/Upload/463/relfile/10315/2711/table(060a).xlsx'
U_Y='https://ws.dgbas.gov.tw/001/Upload/463/relfile/11516/236078/table13.xlsx'
U_P='https://ws.dgbas.gov.tw/001/Upload/463/relfile/10980/236591/news11508.pdf'
def src(url,title,period,quote,pub='行政院主計總處'):
    return {'url':url,'title':title,'publisher':pub,'period':period,'accessed':ACC,'quote':quote}

# ================= 1. threeSectors
wq=load('dgbas-natl-acct-20261110-生產帳_季_對外發布版(060a).xlsx')
old=wq['1951~1980']; hdr=[c.value for c in old[4]]
def orow(label):
    for r in old.iter_rows(min_row=5,max_row=24):
        if cl(r[0].value)==cl(label): return [c.value for c in r]
tot,ag,ind,sv,mf=[orow(x) for x in ('總計(生產面)','農業','工業','服務業','3.製造業')]
pct=wq['名目(占比)1981~ ']; ph=[c.value for c in pct[4]]
def prow(prefix):
    for r in pct.iter_rows(min_row=5,max_row=33):
        if cl(r[0].value).startswith(prefix): return [c.value for c in r]
pa,pi,ps,pm=[prow(x) for x in ('農業','工業','服務業','C製造業')]
years=[1951,1955,1960,1965,1970,1975,1980,1985,1990,1995,2000,2005,2010]+list(range(2015,2026))
three={}
for y in years:
    if y<=1980:
        j=hdr.index(y); t=tot[j]
        e={k:round(v[j]/t*100,2) for k,v in (('agriculture',ag),('industry',ind),('services',sv),('manufacturing',mf))}
        e['gdp_production_side_million_twd']=t
        e['sector_million_twd']={'agriculture':ag[j],'industry':ind[j],'services':sv[j],'manufacturing':mf[j]}
        e['basis']='computed = 各業生產毛額(百萬元) / 總計(生產面)(百萬元)，四捨五入至小數2位'
        e['source']=src(U_Q,'生產帳_季_對外發布版(060a).xlsx 工作表「1951~1980」國內各業生產毛額(2008SNA)(當期價格，1951年～1980年)',f'{y}年；檔案更新日期 2026/8/14',
          f'更新日期：2026/8/14；單位：新臺幣百萬元；{y}年欄：「總    計(生產面)」{t}、「農  業」{ag[j]}、「工  業」{ind[j]}、「服務業」{sv[j]}、「3.製造業」{mf[j]}')
    else:
        j=ph.index(y)
        e={'agriculture':pa[j],'industry':pi[j],'services':ps[j],'manufacturing':pm[j],
           'basis':'主計總處「名目(占比)1981~」工作表現成數字，占 GDP(生產面) 比重 %',
           'source':src(U_Q,'生產帳_季_對外發布版(060a).xlsx 工作表「名目(占比)1981~」國內各業生產毛額占比(2008SNA)(當期價格，1981年～)',f'{y}年；檔案更新日期 2026/8/14',
           f'單位：%；{y}年欄：「C 製造業」{pm[j]}、補充項目「農      業」{pa[j]}、「工      業」{pi[j]}、「服  務  業」{ps[j]}')}
    three[str(y)]=e

# ================= 2. electronics (annual production account, to 2024)
wa=load('dgbas-natl-acct-20261110-生產帳_年_對外發布版(056).xlsx')['名目生產毛額']
ah=[c.value for c in wa[4]]
def arow(prefix):
    for r in wa.iter_rows(min_row=5,max_row=90):
        if cl(r[0].value).startswith(prefix): return [c.value for c in r]
cr,cs,cc,g=arow('CR.電子零組件製造業'),arow('CS.電腦、電子產品及光學製品製造業'),arow('C.製造業'),arow('總計(生產面)')
ey=[2001,2005,2010]+list(range(2015,2026))
elec={}
for y in ey:
    if y in ah:
        j=ah.index(y)
        elec[str(y)]={'electronic_components_CR_pct':round(cr[j]/g[j]*100,2),'computer_electronics_optical_CS_pct':round(cs[j]/g[j]*100,2),
          'CR_plus_CS_pct':round((cr[j]+cs[j])/g[j]*100,2),'manufacturing_C_pct':round(cc[j]/g[j]*100,2),
          'million_twd':{'CR':cr[j],'CS':cs[j],'C':cc[j],'GDP_production_side':g[j]},
          'basis':'computed = 名目生產毛額(百萬元) / 總計(生產面)(百萬元)，四捨五入至小數2位',
          'source':src(U_A,'生產帳_年_對外發布版(056).xlsx 工作表「名目生產毛額」國內各業生產毛額(2008SNA)(當期價格，1981年～)',f'{y}年；檔案更新日期 2025/11/28',
            f'更新日期：2025/11/28；單位：新臺幣百萬元；{y}年欄：「CR.電子零組件製造業」{cr[j]}、「CS.電腦、電子產品及光學製品製造業」{cs[j]}、「總      計(生產面)」{g[j]}')}
    else:
        elec[str(y)]=None
        elec['_null_reason_'+str(y)]='主計總處公開的年度細業別檔「生產帳_年_對外發布版(056)」僅到2024年(更新日期2025/11/28)；季檔「生產帳_季」只有A~S大類，無電子零組件細業；統計資料庫(nstatdb)未能程式化查詢。待主計總處更新年度檔後補。'

# ================= 3. employment
import unicodedata
wbk=openpyxl.load_workbook(RAW+'dgbas-manpower-yb114/table13.xlsx',data_only=True)
def parse(ws,svc):
    cnt={};pc={}
    for r in ws.iter_rows(min_row=13,values_only=True):
        lab=unicodedata.normalize('NFKC',str(r[1] or ''))
        m=re.match(r'\s*(\d+)年平均',lab)
        if m and isinstance(r[2],(int,float)):
            y=int(m.group(1))+1911; rec=dict(total=r[2],agri=r[5],industry=r[8],services=r[svc],mfg=r[15])
            (pc if y in cnt else cnt)[y]=rec   # first occurrence = thousand persons, second = percent
    return cnt,pc
cnt_o,pc_o=parse(wbk['13_舊行業'],27); cnt_n,pc_n=parse(wbk['13_新行業'],30)
cnt={1990:cnt_o[1990]};pc={1990:pc_o[1990]}
for y in (2010,2020,2024,2025): cnt[y]=cnt_n[y];pc[y]=pc_n[y]
emp={}
for y in (1990,2010,2020,2024,2025):
    emp[str(y)]={'agriculture_pct':pc[y]['agri'],'industry_pct':pc[y]['industry'],'services_pct':pc[y]['services'],'manufacturing_pct':pc[y]['mfg'],
      'thousand_persons':{'total':cnt[y]['total'],'agriculture':cnt[y]['agri'],'industry':cnt[y]['industry'],'services':cnt[y]['services'],'manufacturing':cnt[y]['mfg']},
      'source':src(U_Y,'114年人力資源調查統計(年報) 表13 歷年就業者之行業','%d年平均；114年年報(發布單位：國勢普查處)'%y,
        f"表１３ 歷年就業者之行業（工作表「{'13_舊行業' if y==1990 else '13_新行業'}」）；{y}年平均 千人：總計{cnt[y]['total']}、農林漁牧業{cnt[y]['agri']}、工業{cnt[y]['industry']}、服務業{cnt[y]['services']}；單位：％：農{pc[y]['agri']}、工業{pc[y]['industry']}、服務業{pc[y]['services']}")}
# 1952 / 1970 from CEPD Taiwan Statistical Data Book 2010 Table 2-9a (hard-coded from raw pdf text, rows verified by eye)
tsdb={1952:(2929,1642,495,792,362),1970:(4576,1681,1278,1617,958)}
U_D='https://www.taiwan-database.net/PDFs/Taiwan_Statistical_Data_Book_2010.pdf'
for y,(t,a,i,s,m) in tsdb.items():
    assert a+i+s==t,(y)
    emp[str(y)]={'agriculture_pct':round(a/t*100,2),'industry_pct':round(i/t*100,2),'services_pct':round(s/t*100,2),'manufacturing_pct':round(m/t*100,2),
      'thousand_persons':{'total':t,'agriculture':a,'industry':i,'services':s,'manufacturing':m},
      'basis':'computed from thousand persons, rounded to 2 decimals',
      'source':src(U_D,'Taiwan Statistical Data Book 2010, Table 2-9a Employment by Industry','%d'%y,
        f"2-9a. Employment by Industry; I. Number (1,000 persons); {y}: Total {t:,}, Primary Industry {a:,}, Secondary Industry Subtotal {i:,}, Tertiary Industry Subtotal {s:,}, Mfg. {m:,}; Source: See Table 2-8a.",
        pub='Council for Economic Planning and Development, Executive Yuan, R.O.C. (Taiwan)（網站為 taiwan-database.net 鏡像，非官方網域）')}

# ================= 4. gdpLevel
wt=load('dgbas-natl-acct-20261110-table(060a).xlsx')['資料']
lv={}
for r in wt.iter_rows(min_row=5,max_row=343,values_only=True):
    m=re.fullmatch(r'(\d+)年',str(r[0]).strip())
    if m and r[4]:
        y=int(m.group(1))+1911
        if 2015<=y<=2025:
            lv[str(y)]={'nominal_gdp_100m_twd':round(r[4]/100,2),'nominal_gdp_million_twd':r[4],'gdp_per_capita_usd':r[7],'gdp_per_capita_twd':r[6],'avg_fx_twd_per_usd':r[2],'real_growth_pct':r[3],
              'source':src(U_T,'table(060a).xlsx 國民所得統計常用資料',f'{y}年；網頁更新日期115-11-09，附註 115年Ⅲ為概估',
                f"{int(m.group(1))}年：平均匯率{r[2]}、經濟成長{r[3]}、名目國內生產毛額(GDP)百萬元{r[4]}、平均每人GDP元{r[6]}、美元{r[7]}")}
forecast={'year':2026,'real_growth_pct':11.05,'gdp_per_capita_usd':45332,'release_date':'2026-08-14','is_latest_as_of_2026-11-10':True,
  'note':'2026-10-30 另有「115年第3季國民所得概估統計」(Q3 yoy 14.36%)，但該稿未更新全年預測，故最新全年預測仍為 8/14 這次。主計總處通常於11月下旬發布新一輪預測，發布後此欄需更新。',
  'prior_forecast':{'real_growth_pct':9.64,'release':'2026-05'},
  'source':src(U_P,'國民所得統計及國內經濟情勢展望(新聞稿)','115年8月14日下午4時15分發布',
    '預測115年第3、4季經濟成長率(yoy)分別為11.42％及5.37％，併計第1、2季，全年經濟成長率11.05％，較115年5月預測數9.64％上修1.41個百分點，每人GDP 4萬5,332美元，CPI上漲2.07％。')}
out={'name':'gdp-structure','accessed':ACC,'threeSectors':three,'electronics':elec,'ict_official':None,
 'ict_official_null_reason':'主計總處未見公布「資通訊產業占GDP」官方統計；最接近的是行業分類大類「J 出版影音及資通訊業」(含在 名目(占比)1981~ 表)，定義與市場說的ICT(含電子零組件、電腦及電子產品製造)不同，不可混用。',
 'employment':emp,'gdpLevel':{'annual':lv,'forecast_2026':forecast}}
# J 出版影音及資通訊業 share (service-side ICT proxy, reported separately)
jr=[c.value for c in next(r for r in pct.iter_rows(min_row=5,max_row=33) if cl(r[0].value).startswith('J出版影音'))]
out['publishing_av_ict_J_pct']={str(y):jr[ph.index(y)] for y in [2000,2005,2010]+list(range(2015,2026))}
out['notes']={
 'threeSectors':'名目(當期價格)占比，分母為 GDP(生產面)，即不含「統計差異」的 GDP。農/工/服務業採主計總處「補充項目」口徑：進口稅與加值型營業稅已分攤進三業，故三者相加約100(尾差±0.01來自四捨五入)。製造業(manufacturing)是工業的一部分，占比分母同為GDP(生產面)，未分攤稅。1951~1980 主計總處只給金額，占比為本腳本以「各業生產毛額÷總計(生產面)」自算(四捨五入至2位)；1981起直接取主計總處占比。分類為2008SNA版。檔案(生產帳_季_對外發布版(060a))更新日期2026/8/14；2025(民國114)年數字為主計總處最新修訂值，後續仍可能再修正，不是年報定稿。',
 'electronics':'分子「CR 電子零組件製造業」、「CS 電腦、電子產品及光學製品製造業」為2008SNA行業分類下製造業細業；分母為總計(生產面)。占比為本腳本自百萬元金額算出，主計總處未直接給細業占比。CR 內含半導體(晶圓代工)。CR_plus_CS_pct 只是「電子資通硬體」近似，非主計總處官方定義。2025為null(見 _null_reason_2025)。檔案更新日期2025/11/28，2023、2024年為當時值，之後可能已被修訂，與季檔(2026/8/14)的製造業占比可能有差，本檔 manufacturing_C_pct 為同檔自算值，與 threeSectors.manufacturing 在2023、2024年已核對相同(34.64、35.67)。',
 'ict_official':'未找到官方資通訊產業占GDP數字，寫null。另附 publishing_av_ict_J_pct = 大類 J 出版影音及資通訊業(含軟體、電信、資訊服務等服務業)占GDP%，與電子製造不同，請勿與CR/CS相加。',
 'employment':'主計總處人力資源調查，就業者行業，年平均。1990取自年報表13「13_舊行業」工作表，2010起取自「13_新行業」工作表。表註：90至100年按第8次修訂之行業標準分類，101至105年按第9次修訂，106至110年按第10次修訂，111年1月起第11次修訂；88年起全部改按第7次修訂。各期分類不完全可比。1952與1970不在年報(僅1978起)，改取經建會 Taiwan Statistical Data Book 2010 表2-9a(原始來源為主計總處《人力資源統計月報》2010年5月，來自 taiwan-database.net 鏡像，非官方網域)，千人數自算占比，且當時調查口徑與今日不同，1978年前後不宜逐點精確比較。就業占比分母為總就業者，與產值占比不是同一概念。',
 'gdpLevel':'名目GDP為當期價格，單位新臺幣億元(=百萬元/100)；人均GDP美元取主計總處「平均每人GDP」美元欄，由當年平均匯率換算。表網頁更新日期115-11-09，115年Ⅲ為概估。2026年預測值11.05%與人均GDP 45,332美元為2026-08-14發布；主計總處通常11月下旬發布新一輪預測，發布後此欄需更新。',
 'reasons_null':{'electronics_2025':'見 electronics._null_reason_2025','ict_official':'見 ict_official_null_reason'}}
json.dump(out,open(ROOT+'/data/industry/research/gdp-structure.json','w'),ensure_ascii=False,indent=1)
print('ok')
```
