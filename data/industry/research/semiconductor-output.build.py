import json, re
R='/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7/data/industry/raw/'
ACC='2026-11-10'
def txt(f): return open(R+f,encoding='utf8',errors='ignore').read()
def grab(f, start, n=700):
    t=txt(f)
    pat=r'[\s\x00-\x1f]*'.join(re.escape(c) for c in re.sub(r'\s+','',start))
    m=re.search(pat,t)
    assert m,(f,start)
    seg=t[m.start():m.start()+n*2]
    seg=re.sub(r'[\x00-\x08\x0b-\x1f]',' ',seg)
    seg=re.sub(r'\s+',' ',seg).strip()
    return seg[:n]

# ---- TSIA sources
S={}
def tsia(key,title,url,period,f,start,n=700,archive=None,pub='台灣半導體產業協會(TSIA)；數據：工研院產科國際所'):
    d={'url':url,'title':title,'publisher':pub,'period':period,'accessed':ACC,'quote':grab(f,start,n),'raw_file':'data/industry/raw/'+f}
    if archive: d['archive_url']=archive
    S[key]=d
tsia('tsia_2026Q2','【TSIA新聞稿115.08.14】台灣半導體產業協會(TSIA) 2026Q2台灣IC營運結果出爐','https://www.tsia.org.tw/api/DownloadPage?pageID=915','發布日 2026-08-14；資料 2022–2026(e)','tsia-pressrelease-2026Q2-20261110.txt','2022 ~ 2026(e)年台灣IC產業產值',900)
tsia('tsia_2026Q1','【TSIA新聞稿115.05.14】台灣半導體產業協會(TSIA) 2026Q1台灣IC營運結果出爐','https://www.tsia.org.tw/api/DownloadPage?pageID=892','發布日 2026-05-14','tsia-pressrelease-2026Q1-20261110.txt','2022 ~ 2026(e)年台灣IC產業產值',900)
tsia('tsia_2025FY','【TSIA新聞稿115.02.12】台灣半導體產業協會(TSIA) 2025Q4及全年台灣IC營運成果出爐','https://www.tsia.org.tw/api/DownloadPage?pageID=833','發布日 2026-02-12；資料 2022–2026(e)','tsia-pressrelease-2025Q4-FY-20261110.txt','2022 ~ 2026(e)年台灣IC產業產值',900)
tsia('tsia_2025FY_text','同上（內文段落）','https://www.tsia.org.tw/api/DownloadPage?pageID=833','發布日 2026-02-12','tsia-pressrelease-2025Q4-FY-20261110.txt','工研院產科國際所預估2025年台灣IC產業產值達',420)
tsia('tsia_2021FY','TSIA Q4 2021 and Year 2021 Statistics on Taiwan IC Industry','https://www.tsia.org.tw/api/DownloadPage?pageID=407','發布日 2022-02-17；資料 2018–2022(e)','tsia-dl-407-20261110.txt','2018-2022 Taiwan IC Revenue',900,pub='TSIA；ISTI-ITRI')
tsia('tsia_2020FY','TSIA Q4 2020 and Year 2020 Statistics on Taiwan IC Industry','https://www.tsia.org.tw/api/DownloadPage?pageID=294','發布日 2021-02-22；資料 2017–2021(e)','tsia-dl-294-20261110.txt','2017-2021 Taiwan IC Revenue',900,pub='TSIA；ISTI-ITRI')
tsia('tsia_2019FY','TSIA 2019Q4 & 2019 Statistics','https://www.tsia.org.tw/api/DownloadPage?pageID=170','發布日 2020-02；資料 2016–2020(e)','tsia-dl-170-20261110.txt','2016-2020 Taiwan IC Revenue',900,pub='TSIA；ISTI-ITRI')
tsia('tsia_2016FY','TSIA Q4 2016 and Year 2016 Statistics on Taiwan IC Industry','https://www.tsia.org.tw/Uploads/TSIA%202016%20Q4%20&%202016%20Statistics.doc','發布日 2017-02-20；資料 2011–2017(e)','tsia-wayback-2016Q4-stat.txt','2011-2017 Taiwan IC Revenue',900,archive='https://web.archive.org/web/20170710090341id_/http://www.tsia.org.tw/Uploads/TSIA%202016%20Q4%20&%202016%20Statistics.doc',pub='TSIA；IEK-ITRI')
tsia('tsia_2014FY','TSIA Q4 2014 and Year 2014 Statistics on Taiwan IC Industry','https://www.tsia.org.tw/Uploads/TSIA%202014%20Q4%20&%202014%20Statistics.doc','發布日 2015-02-05；資料 2010–2014','tsia-wayback-2014Q4-stat.txt','Industry Revenue1,769.3',700,archive='https://web.archive.org/web/20170710101659id_/http://www.tsia.org.tw/Uploads/TSIA%202014%20Q4%20&%202014%20Statistics.doc',pub='TSIA；IEK-ITRI')
tsia('tsia_2011FY','TSIA 2011 Q4 Statistics','http://tsia.org.tw/Uploads/TSIA%202011%20Q4%20Statistics-Engv2.doc','發布日 2012-03；2010 初版數字','tsia-wayback-2011Q4-stat.txt','Industry Revenue1,753.7',500,archive='https://web.archive.org/web/20130820115306id_/http://tsia.org.tw/Uploads/TSIA%202011%20Q4%20Statistics-Engv2.doc',pub='TSIA；IEK-ITRI')

# ---- annual table: (year, total, design, mfg, foundry, mem, pack, test, yoy, unit, source)  (NT$B for <=2021, 億 for >=2022)
B=[ # NT$ billion as printed
(2010,1769.3,454.8,899.7,583.0,316.7,287.0,127.8,38.3,'tsia_2014FY'),
(2011,1562.7,385.6,786.7,572.9,213.8,269.6,120.8,-11.7,'tsia_2014FY'),
(2012,1634.2,411.5,829.2,648.3,180.9,272.0,121.5,4.6,'tsia_2014FY'),
(2013,1888.6,481.1,996.5,759.2,237.3,284.4,126.6,15.6,'tsia_2014FY'),
(2014,2203.3,576.3,1173.1,914.0,259.1,316.0,137.9,16.7,'tsia_2014FY'),
(2015,2264.0,592.7,1230.0,1009.3,220.7,309.9,131.4,2.8,'tsia_2016FY'),
(2016,2449.3,653.1,1332.4,1148.7,183.7,323.8,140.0,8.2,'tsia_2019FY'),
(2017,2462.3,617.1,1368.2,1206.1,162.1,333.0,144.0,0.5,'tsia_2020FY'),
(2018,2619.9,641.3,1485.6,1285.1,200.5,344.5,148.5,6.4,'tsia_2020FY'),
(2019,2665.6,692.8,1472.1,1312.5,159.6,346.3,154.4,1.7,'tsia_2020FY'),
(2020,3222.2,852.9,1820.3,1629.7,190.6,377.5,171.5,20.9,'tsia_2020FY'),
(2021,4082.0,1214.7,2228.9,1941.0,287.9,435.4,203.0,26.7,'tsia_2021FY'),
]
A=[ # 億元 as printed
(2022,48370,12320,29203,26847,2356,4660,2187,18.5,'tsia_2025FY'),
(2023,43428,10965,26626,24925,1701,3931,1906,-10.2,'tsia_2025FY'),
(2024,53151,12721,34195,32438,1757,4233,2002,22.4,'tsia_2025FY'),
(2025,65225,14245,43869,41693,2176,4825,2286,22.7,'tsia_2026Q2'),
]
years=[]; checks=[]
for y,t,d,m,f,mem,p,te,yoy,src in B:
    r=lambda x:round(x*10)
    row=dict(year=y,total=r(t),design=r(d),manufacturing=r(m),foundry=r(f),memory_and_other=r(mem),packaging=r(p),testing=r(te),yoy_pct=yoy,is_estimate=False,source=src,
             note='原表單位 NT$ billion（十億），×10 換算成億元，無四捨五入（原表一位小數）')
    years.append(row)
for y,t,d,m,f,mem,p,te,yoy,src in A:
    years.append(dict(year=y,total=t,design=d,manufacturing=m,foundry=f,memory_and_other=mem,packaging=p,testing=te,yoy_pct=yoy,is_estimate=False,source=src,note='原表單位億新臺幣'))
for r in years:
    s=r['design']+r['manufacturing']+r['packaging']+r['testing']; s2=r['foundry']+r['memory_and_other']
    checks.append((r['year'],r['total']-s,r['manufacturing']-s2))
years[-1]['note']+='；2026-02 新聞稿中全年欄位標 2025 (e)，2026-05、2026-08 新聞稿表中同數字不再標 (e)，數字始終為 65,225。'
for r in years[:5]:
    r['label_note']='原表「記憶體與其他製造」此期間標示為 Brand Name（自有品牌，主要為記憶體）'
out={'meta':{'task':'semiconductor-output','accessed':ACC,'unit':'新臺幣億元（除另註）'}}
est=[
 dict(year=2026,is_estimate=True,vintage='2026-08-14（TSIA 2026Q2 新聞稿）',total=91904,design=18211,manufacturing=64683,foundry=57746,memory_and_other=6937,packaging=6152,testing=2858,yoy_pct=40.9,source='tsia_2026Q2'),
 dict(year=2026,is_estimate=True,vintage='2026-05-14（TSIA 2026Q1 新聞稿）',total=84450,design=17046,manufacturing=59024,foundry=54412,memory_and_other=4612,packaging=5703,testing=2677,yoy_pct=29.5,source='tsia_2026Q1'),
 dict(year=2026,is_estimate=True,vintage='2026-02-12（TSIA 2025Q4 新聞稿，IEK 預估）',total=77150,design=15214,manufacturing=54339,foundry=51317,memory_and_other=3022,packaging=5163,testing=2434,yoy_pct=18.3,source='tsia_2025FY'),
]
q26=[dict(quarter='2026Q1',total=19261,design=3896,manufacturing=13349,foundry=12284,memory_and_other=1065,packaging=1374,testing=642,yoy_pct=29.4,is_estimate=False,source='tsia_2026Q2'),
     dict(quarter='2026Q2',total=22313,design=4565,manufacturing=15511,foundry=13808,memory_and_other=1703,packaging=1526,testing=711,yoy_pct=39.5,is_estimate=False,source='tsia_2026Q2'),
     dict(quarter='2026Q3(e)',total=24649,design=4850,manufacturing=17450,foundry=15396,memory_and_other=2054,packaging=1605,testing=744,yoy_pct=47.6,is_estimate=True,source='tsia_2026Q2'),
     dict(quarter='2026Q4(e)',total=25681,design=4900,manufacturing=18373,foundry=16258,memory_and_other=2115,packaging=1647,testing=761,yoy_pct=45.5,is_estimate=True,source='tsia_2026Q2')]
out['icOutput']={'unit':'新臺幣億元','years':years,'estimate_2026':est,'quarters_2026':q26,
 'sum_check_total_minus_components_and_mfg_minus_foundry_plus_memory':checks,
 'definition':'IC產業產值=IC設計業+IC製造業+IC封裝業+IC測試業；IC製造業=晶圓代工+記憶體與其他製造；以總部設立在台灣的公司為基準（TSIA 原表說明）。','sources_ref':'見 sources'}
json.dump({'checks':checks},open('/dev/stderr','w')) if False else None
out['sources']=S
print([c for c in checks if c[1] or c[2]])

# =================== TSMC ===================
SC='/private/tmp/claude-501/-Users-cheyuwu-Projects-taiwan-md--claude-worktrees-industry-topic-e7e4f7/002d18a7-b1b8-4542-ab56-fc1aa9e5bdfa/scratchpad/txt/'
def grab2(path,start,n=500):
    t=open(path,encoding='utf8',errors='ignore').read()
    pat=r'[\s\x00-\x1f|]*'.join(re.escape(c) for c in re.sub(r'\s+','',start))
    m=re.search(pat,t); assert m,(path,start)
    return re.sub(r'\s+',' ',t[m.start():m.start()+n*2].replace('|',' ')).strip()[:n]
def src(key,url,title,pub,period,quote,raw=None,archive=None,extra=None):
    d={'url':url,'title':title,'publisher':pub,'period':period,'accessed':ACC,'quote':quote}
    if raw:d['raw_file']='data/industry/raw/'+raw
    if archive:d['archive_url']=archive
    if extra:d['note']=extra
    S[key]=d
SEC='https://www.sec.gov/Archives/edgar/data/1046179/'
fy_acc={'FY2015':'000119312516536225/d138743d20f.htm','FY2016':'000119312517122097/d366455d20f.htm','FY2017':'000119312518121866/d459142d20f.htm','FY2018':'000119312519108390/d665387d20f.htm','FY2019':'000119312520107579/d831201d20f.htm','FY2020':'000119312521118512/d94821d20f.htm','FY2021':'000119312522104891/d204786d20f.htm','FY2022':'000119312523107214/d428519d20f.htm','FY2023':'000119312524099840/d592628d20f.htm','FY2024':'000119312525083423/d896993d20f.htm','FY2025':'000162828026025362/tsm-20251231.htm'}
fy_filed={'FY2015':'2016-04-11','FY2016':'2017-04-13','FY2017':'2018-04-19','FY2018':'2019-04-17','FY2019':'2020-04-15','FY2020':'2021-04-16','FY2021':'2022-04-14','FY2022':'2023-04-20','FY2023':'2024-04-18','FY2024':'2025-04-17','FY2025':'2026-04-16'}
for fy in fy_acc:
    # capex quote
    q=grab2(SC+f'sec-tsmc-20F-{fy}.txt','Our capital expenditures in 20',420)
    src(f'tsmc_20F_{fy}_capex',SEC+fy_acc[fy],f'TSMC Form 20-F {fy} (Item 4/5 capital expenditures)','台灣積體電路製造股份有限公司（TSMC），向美國 SEC 提交',f'{fy}，提交日 {fy_filed[fy]}',q,raw=f'sec-tsmc-20F-{fy}.htm')
for fy in ['FY2016','FY2019','FY2022','FY2025','FY2015']:
    pass
emp_src={}
for fy in ['FY2015','FY2016','FY2019','FY2022','FY2025']:
    q=grab2(SC+f'sec-tsmc-20F-{fy}.txt','number of our full-time employees serving in the capacities indicated',650)
    src(f'tsmc_20F_{fy}_employees',SEC+fy_acc[fy],f'TSMC Form 20-F {fy} (Item 6 employees table)','TSMC',f'{fy}，提交日 {fy_filed[fy]}',q,raw=f'sec-tsmc-20F-{fy}.htm')
src('tsmc_xbrl_revenue','https://data.sec.gov/api/xbrl/companyconcept/CIK0001046179/ifrs-full/Revenue.json','SEC EDGAR XBRL companyconcept：TSMC ifrs-full:Revenue（取自 20-F 申報）','美國 SEC EDGAR（資料由 TSMC 20-F XBRL 提供）','FY2015–FY2024（20-F）',
    'TWD 2015-01-01..2015-12-31 843497400000; 2016 947938300000; 2017 977447200000; 2018 1031473600000; 2019 1069985400000; 2020 1339254800000; 2021 1587415000000; 2022 2263891300000; 2023 2161735800000; 2024 2894307700000（單位：元新臺幣；取自 raw JSON 的 val 欄位）',raw='sec-tsmc-xbrl-Revenue-20261110.json')
AR25='data/industry/raw/tsmc-AR2025-C-raw.txt'
ARC='/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7/data/industry/raw/tsmc-AR2025-C-raw.txt'
ar25_url='https://investor.tsmc.com/sites/ir/annual-report/2025/2025%20TSMC%20Annual%20Report.C.pdf'
ar25_arch='https://web.archive.org/web/20260820035808id_/https://investor.tsmc.com/sites/ir/annual-report/2025/2025%20TSMC%20Annual%20Report.C.pdf'
def ar25(key,quote,title='台積公司 114年度（2025）年報',extra=None):
    src(key,ar25_url,title,'台灣積體電路製造股份有限公司（TSMC）','民國114年度（2025）',quote,raw='tsmc-AR2025-C-wayback20260820.pdf',archive=ar25_arch,extra=extra or '官方網站對自動化下載回 Cloudflare 403；檔案取自 Internet Archive 對同一官方 URL 的存檔（2026-08-20），pdftotext 轉文字，逐字節錄')
ar25('tsmc_AR2025_revenue',grab2(ARC,'民國114年 民國113年 增減金額 營業收入淨額 3,809,054,272 2,894,307,699',200)+'（單位：新台幣仟元；節錄自 年報 6.1 財務狀況比較表）')
ar25('tsmc_AR2025_platform','依據產品平台來區分，高效能運算占58%、智慧型手機占29%、物聯網占5%、車用電子占5%。此外，消費性電子產品占1%，其他產品則為剩餘的2%。')
ar25('tsmc_AR2025_adv','7奈米及以下先進製程技術對台積公司晶圓銷售貢獻 民國109年 41% 民國110年 50% 民國111年 53% 民國112年 58% 民國113年 69% 民國114年 74%；「先進製程技術（7奈米及以下先進製程）的銷售金額占整體晶圓銷售金額的74%，高於民國一百一十三年的69%。」')
ar25('tsmc_AR2025_emp','截至民國一百一十四年底，台積公司之全球員工總數為9萬557人，其中包括9,582位主管人員、4萬4,690位專業人員、1萬1,368位助理人員以及2萬4,917位技術人員。')
ar25('tsmc_AR2025_overseas','我們在亞利桑那州的第一座晶圓廠已經在民國一百一十三年第四季順利以優異的良率成功進入量產；我們正加速第二座晶圓廠的生產計劃，預計於民國一百一十六年下半年進入量產；第三座晶圓廠則已經於民國一百一十四年開始動工興建。…在日本，我們在熊本的第一座特殊製程技術晶圓廠已於民國一百一十三年底以非常好的良率開始量產，目前於熊本興建中的第二座晶圓廠正規劃將採用3奈米製程技術生產…在歐洲，我們在德國德勒斯登…（節錄自董事長／總裁致股東報告書，版面為多欄，句子依閱讀順序拼接）')
src('tsmc_20F_FY2025_adv','%s%s'%(SEC,fy_acc['FY2025']),'TSMC Form 20-F FY2025（Item 4 technology share）','TSMC','FY2025，提交日 2026-04-16',grab2(SC+'sec-tsmc-20F-FY2025.txt','In 2025 , the 3-nanometer, 5-nanometer and 7-nanometer revenues',420),raw='sec-tsmc-20F-FY2025.htm')
src('tsmc_20F_FY2025_rev','%s%s'%(SEC,fy_acc['FY2025']),'TSMC Form 20-F FY2025（net revenue）','TSMC','FY2025',grab2(SC+'sec-tsmc-20F-FY2025.txt','NT$ 3,809,054 million (US$ 121,423 million)',200),raw='sec-tsmc-20F-FY2025.htm')
src('tsmc_20F_FY2018_adv','%s%s'%(SEC,fy_acc['FY2018']),'TSMC Form 20-F FY2018（technology share）','TSMC','FY2018，提交日 2019-04-17',grab2(SC+'sec-tsmc-20F-FY2018.txt','In 2018, the 7-nanometer revenue reached 9% of total wafer revenue',420),raw='sec-tsmc-20F-FY2018.htm')
src('tsmc_20F_FY2019_adv','%s%s'%(SEC,fy_acc['FY2019']),'TSMC Form 20-F FY2019（technology share）','TSMC','FY2019，提交日 2020-04-15',grab2(SC+'sec-tsmc-20F-FY2019.txt','In 2019, the 7-nanometer revenue reached 27% of total wafer revenue',420),raw='sec-tsmc-20F-FY2019.htm')
src('tsmc_20F_FY2016_adv','%s%s'%(SEC,fy_acc['FY2016']),'TSMC Form 20-F FY2016（technology share）','TSMC','FY2016，提交日 2017-04-13',grab2(SC+'sec-tsmc-20F-FY2016.txt','In 2016, the combined 16/20-nanometer revenue represented 29%',420),raw='sec-tsmc-20F-FY2016.htm')
src('tsmc_20F_FY2018_28nm','%s%s'%(SEC,fy_acc['FY2018']),'TSMC Form 20-F FY2018（28nm and below）','TSMC','FY2018',grab2(SC+'sec-tsmc-20F-FY2018.txt','Advanced technologies (28-nanometer and below) accounted for 63%',200),raw='sec-tsmc-20F-FY2018.htm')
src('tsmc_AR2020_16nm','https://investor.tsmc.com/sites/ir/annual-report/2020/2020Annual%20Report_C_%20.pdf','台積公司 109年度（2020）年報','TSMC','民國109年度（2020）','先進製程技術（16奈米及以下先進製程）的銷售金額佔整體晶圓銷售金額的58%，高於民國一百零八年的50%。',raw='tsmc-AR2020-C-wayback20220121.pdf',archive='https://web.archive.org/web/20220121050442id_/https://investor.tsmc.com/sites/ir/annual-report/2020/2020Annual%20Report_C_%20.pdf',extra='同上：官方站 403，檔案取自 Internet Archive 存檔')
# overseas press releases (fetched with WebFetch; fragments verbatim)
src('pr_arizona','https://pr.tsmc.com/english/news/3210','TSMC Intends to Expand Its Investment in the United States to US$165 Billion to Power the Future of AI','TSMC 新聞中心','Mar. 4, 2025（頁面標示 2025/03/04）','"total investment in the U.S. is expected to reach US$165 billion"；"ongoing $65 billion investment in its advanced semiconductor manufacturing operations in Phoenix, Arizona"；"plans for three new fabrication plants, two advanced packaging facilities and a major R&D team center"（引文為 WebFetch 回傳之原文片段）',extra='pr.tsmc.com 對 curl 回 Cloudflare 403，內容以 WebFetch 取得')
src('pr_jasm','https://pr.tsmc.com/english/news/3105','JASM Set to Expand in Kumamoto Japan','TSMC 新聞中心','Issued on: 2024/02/06','"the overall investment in JASM will exceed US$20 billion"；"TSMC, SSS, DENSO and Toyota will hold equity stakes of approximately 86.5%, 6.0%, 5.5%, and 2.0% in JASM, respectively."；"build a second fab, which is scheduled to begin operation by the end of the 2027 calendar year."（WebFetch 回傳之原文片段）')
src('pr_esmc','https://pr.tsmc.com/english/news/3049','TSMC, Bosch, Infineon, and NXP Establish Joint Venture to Bring Advanced Semiconductor Manufacturing to Europe','TSMC 新聞中心','Issued on: 2023/08/08','"Total investments are expected to exceed 10 billion euros consisting of equity injection, debt borrowing"；"The planned joint venture will be 70% owned by TSMC, with Bosch, Infineon, and NXP each holding 10% equity stake"；"production targeted to begin by the end of 2027."；"monthly production capacity of 40,000 300mm (12-inch) wafers"（WebFetch 回傳之原文片段）')
src('tsmc_20F_FY2025_subs','%s%s'%(SEC,fy_acc['FY2025']),'TSMC Form 20-F FY2025（Item 4 Our Subsidiaries and Affiliates）','TSMC','FY2025，截至 2026-02-28 持股',grab2(SC+'sec-tsmc-20F-FY2025.txt','TSMC Arizona. In November 2020, we established TSMC Arizona',900)+' … '+grab2(SC+'sec-tsmc-20F-FY2025.txt','As of February 28, 2026 , we owned approximat ely 72.6%',60)+' … '+grab2(SC+'sec-tsmc-20F-FY2025.txt','As of February 28, 2026 , we owned 70. 0 % of the equity interest in ESMC',90),raw='sec-tsmc-20F-FY2025.htm')

src('tsmc_20F_FY2025_re','%s%s'%(SEC,fy_acc['FY2025']),'TSMC Form 20-F FY2025（Item 4 renewable energy）','TSMC','FY2025，提交日 2026-04-16',grab2(SC+'sec-tsmc-20F-FY2025.txt','purchased renewable energy certificates and carbon credits globally in a total of 5,780 GWh',380),raw='sec-tsmc-20F-FY2025.htm')
rev=[(2015,843497.4),(2016,947938.3),(2017,977447.2),(2018,1031473.6),(2019,1069985.4),(2020,1339254.8),(2021,1587415.0),(2022,2263891.3),(2023,2161735.8),(2024,2894307.7)]
capexN={2015:257517,2016:328045,2017:330588,2018:315582,2019:460422,2020:507239,2021:839196,2022:1082672,2023:949817,2024:956007,2025:1272411}
capexU={2015:8123,2016:10186,2017:10859,2018:10463,2019:14903,2020:17235,2021:30039,2022:36289,2023:30448,2024:29755,2025:40895}
capexSrcFY={y:('FY%d'%y) for y in capexN}
emp={2015:45272,2016:46968,2017:48602,2018:48752,2019:51297,2020:56831,2021:65152,2022:73090,2023:76478,2024:83825,2025:90557}
empSrc={2015:'FY2015',2016:'FY2016',2017:'FY2019',2018:'FY2019',2019:'FY2019',2020:'FY2022',2021:'FY2022',2022:'FY2022',2023:'FY2025',2024:'FY2025',2025:'FY2025'}
adv={2018:(9,'tsmc_20F_FY2018_adv'),2019:(27,'tsmc_20F_FY2019_adv'),2020:(41,'tsmc_AR2025_adv'),2021:(50,'tsmc_AR2025_adv'),2022:(53,'tsmc_AR2025_adv'),2023:(58,'tsmc_AR2025_adv'),2024:(69,'tsmc_AR2025_adv'),2025:(74,'tsmc_AR2025_adv')}
tyears=[]
for y in range(2015,2026):
    r={'year':y}
    if y<=2024:
        v=dict(rev)[y]; r['revenue_ntd_million']=v; r['revenue_ntd_100m']=round(v/100,3); r['revenue_source']='tsmc_xbrl_revenue'
    else:
        r['revenue_ntd_million']=3809054.272; r['revenue_ntd_100m']=38090.54272; r['revenue_source']='tsmc_AR2025_revenue'; r['revenue_note']='年報合併營業收入淨額 3,809,054,272 仟元；20-F 表列 NT$3,809,054 million'
    r['capex_ntd_million']=capexN[y]; r['capex_usd_million']=capexU[y]; r['capex_source']='tsmc_20F_%s_capex'%capexSrcFY[y]
    r['capex_note']='美元數字為 20-F 以當年加權平均匯率換算（該年 20-F 之 Item 5 句子）；非各季法說會逐季加總'
    if y in adv: r['advanced_7nm_and_below_pct_of_wafer_revenue']=adv[y][0]; r['advanced_source']=adv[y][1]
    else: r['advanced_7nm_and_below_pct_of_wafer_revenue']=None; r['advanced_null_reason']='20-F 與年報自 2018 年起才有「7奈米」營收占比；2015–2017 年報告中使用的是 16/20 奈米或 28 奈米以下口徑（見 advanced_other_definitions），不併入 7 奈米以下序列'
    r['employees_year_end']=emp[y]; r['employees_source']='tsmc_20F_%s_employees'%empSrc[y]
    tyears.append(r)
out['tsmc']={'years':tyears,
 'advanced_other_definitions':{
   '28nm_and_below_pct':{'2015':48,'2016':55,'2017':58,'2018':63,'source':['tsmc_20F_FY2016_adv','tsmc_20F_FY2018_28nm'],'note':'20-F FY2018 把 2016 修為 54%（FY2016 20-F 原寫 55%），兩版數字並存'},
   '16nm_and_below_pct':{'2017':32,'2018':41,'2019':50,'2020':58,'source':['tsmc_20F_FY2019_adv','tsmc_AR2020_16nm']}},
 'platform_share_2025':{'year':2025,'basis':'年報：營業收入淨額依產品平台區分','HPC':58,'smartphone':29,'IoT':5,'automotive':5,'DCE':1,'others':2,'source':'tsmc_AR2025_platform','older_years':None,'older_years_reason':'本次只取最新年度（任務指定）；歷年平台別占比未逐年蒐集'},
 'employees_note':'來源為 20-F Item 6 全職員工年底人數（TSMC 及子公司合併口徑，2025 年與年報「全球員工總數 9萬557人」一致）；2015–2024 年報口徑未另逐年核對，2025 年兩源一致',
 'employees_2025_annual_report':{'value':90557,'source':'tsmc_AR2025_emp'},
 'overseas_fabs':[
  {'site':'美國亞利桑那州（TSMC Arizona，鳳凰城）','announced_investment':'累計規劃 US$165 billion（2025-03-04 宣布，在既有 US$65 billion 上再加 US$100 billion；含 3 座新晶圓廠、2 座先進封裝廠、1 個研發中心）','source_investment':'pr_arizona','status':'第一座晶圓廠 2024 年底量產；第二座預計 2027 下半年量產；第三座 2025 年動工；2026 年再購一塊土地','source_status':['tsmc_AR2025_overseas','tsmc_20F_FY2025_subs'],'government_support':'美國商務部 CHIPS Act 直接補助最高 US$6.6 billion、貸款最高 US$5 billion（2024-11 簽約，20-F 原文）','note':'US$165B 是宣布的「計畫總額」，非已支出；2025 年全公司資本支出為 US$40.9B 全球合計'},
  {'site':'日本熊本（JASM，Fab 23）','announced_investment':'兩座晶圓廠合計總投資超過 US$20 billion（2024-02-06 公告）','source_investment':'pr_jasm','status':'第一廠 2024-12 量產；第二廠 2025-10 動工；年報稱第二廠規劃改採 3 奈米（與 2024 年公告的 6/7 奈米不同，以年報為最新）','source_status':['tsmc_AR2025_overseas','tsmc_20F_FY2025_subs'],'equity':'公告時 TSMC 86.5%／Sony 6.0%／DENSO 5.5%／Toyota 2.0%；20-F 載截至 2026-02-28 TSMC 持股約 72.6%（兩者口徑不同，後者為近期持股）','note':'2024 公告中第二廠製程為 6/7 奈米；年報 2025 稱 3 奈米'},
  {'site':'德國德勒斯登（ESMC，Fab 24）','announced_investment':'總投資預計超過 10 billion euros（2023-08-08 公告；含股權投入、借款及歐盟與德國政府支持）','source_investment':'pr_esmc','status':'2024 年動工；公告目標 2027 年底量產、月產能 40,000 片 12 吋；年報：製造 28/22 奈米平面 CMOS 及 16/12 奈米 FinFET','source_status':['tsmc_AR2025_overseas','tsmc_20F_FY2025_subs'],'equity':'TSMC 70%，Bosch／Infineon／NXP 各 10%（20-F 載截至 2026-02-28 為 70.0%）'}],
 'overseas_fabs_note':'投資金額均為各公司公開宣布的規劃數字，非實際已投入金額；任務要求的三地皆有官方來源。未列入：南京、上海、華盛頓州 Camas 既有廠'}

# =================== global share ===================
def tf(key,url,title,period,quote,extra=None):
    src(key,url,title,'TrendForce（集邦科技）新聞中心',period,quote,extra=extra or '以 WebFetch 取得頁面，引文為回傳之原文片段')
tf('tf_2023_12','https://www.trendforce.com/presscenter/news/20231214-11959.html','China and US Bolster Semiconductor Independence as Taiwan’s Foundry Capacity Share Projected to Decline to 41% by 2027, Says TrendForce','14 December 2023','"Taiwan holds approximately 46% of global semiconductor foundry capacity."；"the semiconductor production capacities of Taiwan and South Korea are projected to decrease to 41% and 10%."；"In advanced manufacturing processes (including 16/14nm and more advanced technologies)," Taiwan "leads with a 68% global capacity share in 2023."；"Taiwan holds nearly 80% when it comes to EUV generation processes (such as 7nm and beyond)."；副標："Taiwan to concentrate 60% of advanced manufacturing processes by 2027, retaining a hold on key technologies."')
tf('tf_2024_05','https://www.trendforce.com/news/2024/05/14/insights-trendforce-foundry-capacity-market-share-of-advanced-process-to-decline-in-taiwan-korea-until-2027-while-us-on-the-rise/','[Insights] Trendforce: Foundry Capacity Market Share of Advanced Process to Decline in Taiwan, Korea until 2027, While US on the Rise','2024-05-14','"Taiwan is expected to lead the global semiconductor foundry capacity in advanced manufacturing processes with a 66% market share"；"the semiconductor production capacities of advanced nodes in Taiwan and Korea are projected to decrease to 55% and 8%"；"Taiwan is expected to hold approximately 44% of global market share as of 2024"；"the overall semiconductor production capacities of Taiwan and South Korea are projected to decrease to 40% and 10%"；另轉引 SIA/BCG（經朝鮮日報）："Taiwan and Korea held 69% and 31% shares of the production of the most advanced semiconductors below 10 nanometers"；"their market share on the advanced nodes may fall to 47% and 9% in 2032"',extra='此頁為 TrendForce [Insights] 新聞稿；SIA/BCG 數字是二手轉引，未取得 SIA/BCG 原報告')
tf('tf_2022_04','https://www.trendforce.com/presscenter/news/20220425-11204.html','Localization of Chip Manufacturing Rising. Taiwan to Control 48% of Global Foundry Capacity in 2022, Says TrendForce','25 April 2022','"In 2022, Taiwan will account for approximately 48% of global 12-inch equivalent wafer foundry production capacity."；"the market share of advanced processes below 16nm (inclusive) will be as high as 61%."；"TrendForce estimates that the market share held by Taiwan\'s local foundry capacity will drop slightly to 44% in 2025"；"advanced manufacturing processes to approximately 58%."')
tf('tf_2026_03','https://www.trendforce.com/presscenter/news/20260312-12965.html','AI Demand Drives 4Q25 Global Top 10 Foundries Revenue Up 2.6% QoQ; Samsung Gains Share and Tower Moves Up in Rankings, Says TrendForce','12 March 2026','"which allowed TSMC to maintain its leading position with a 70.4% market share."；"pushed the combined revenue of the world’s top ten foundries up 2.6% QoQ to nearly US$46.3 billion in 4Q25."；"The leading ten foundries achieved around $169.5 billion in revenue in 2025, a 26.3% YoY increase"')
tf('tf_2026_06','https://www.trendforce.com/presscenter/news/20260612-13095.html','Strong AI Demand and Early Consumer Electronics Inventory Build Drive Top 10 Foundries to 3.7% QoQ Revenue Growth in 1Q26, Says TrendForce','12 June 2026','"Market share expanded further to 72%, even during what is typically a weaker quarter."')
out['globalShare']={
 'taiwan_capacity_share':[
  {'metric':'台灣占全球晶圓代工產能（整體）','year':2022,'value_pct':48,'basis':'12 吋約當產能（TrendForce 2022 稿）','forecast_for_2025_pct':44,'source':'tf_2022_04','published':'2022-04-25'},
  {'metric':'台灣占全球晶圓代工產能（整體）','year':2023,'value_pct':46,'forecast_2027_pct':41,'source':'tf_2023_12','published':'2023-12-14'},
  {'metric':'台灣占全球晶圓代工產能（整體）','year':2024,'value_pct':44,'forecast_2027_pct':40,'source':'tf_2024_05','published':'2024-05-14','note':'TrendForce 2023-12 稿預估 2027 為 41%，2024-05 稿改為 40%；兩個預估並列'}],
 'taiwan_advanced_process_share':[
  {'metric':'台灣占全球先進製程產能（TrendForce 定義：16/14nm 及更先進）','year':2022,'value_pct':61,'source':'tf_2022_04','published':'2022-04-25','forecast_for_2025_pct':58,'ambiguity':'原句 "the market share of advanced processes below 16nm (inclusive) will be as high as 61%" 位於 2022 年台灣產能脈絡，主語推定為台灣，原稿未明寫；請對照原頁確認'},
  {'metric':'同上','year':2023,'value_pct':68,'forecast_2027_pct':60,'source':'tf_2023_12','published':'2023-12-14'},
  {'metric':'同上','year':2024,'value_pct':66,'forecast_2027_pct':55,'source':'tf_2024_05','published':'2024-05-14'},
  {'metric':'台灣占 EUV 世代製程（7nm 及更先進）產能','year':2023,'value_pct':80,'qualifier':'nearly 80%','source':'tf_2023_12','published':'2023-12-14'}],
 'taiwan_below_10nm_production_share':[
  {'metric':'台灣占 10nm 以下最先進晶片生產','year':2022,'value_pct':69,'qualifier':'原句為 Taiwan 與 Korea 分占 69% 與 31%','forecast_2032_pct':47,'source':'tf_2024_05','note':'二手：TrendForce 轉引 SIA/BCG（經朝鮮日報）；未取得 SIA/BCG 原報告。此口徑（<10nm、生產量）與上方 16/14nm 產能口徑不同，不可混用'}],
 'company_revenue_share_not_taiwan':[
  {'metric':'台積電占全球前十大晶圓代工營收','period':'2025Q4','value_pct':70.4,'source':'tf_2026_03','published':'2026-03-12','note':'這是單一公司（台積電）營收占比，不是「台灣」整體；台灣其他代工廠（聯電、世界先進、力積電）未在新聞稿原文取得合計數'},
  {'metric':'同上','period':'2026Q1','value_pct':72,'source':'tf_2026_06','published':'2026-06-12','note':'同上'}],
 'taiwan_foundry_revenue_share':None,'taiwan_foundry_revenue_share_reason':'TrendForce 公開新聞稿只給單一公司占比；「台灣整體」營收占比需完整前十名表加總，表在付費報告，未取得。',
 'semi_or_sia_bcg_original':None,'semi_or_sia_bcg_original_reason':'未找到 SEMI 對「台灣占先進製程產能」的公開句子；SIA/BCG 原報告未取得，只有 TrendForce 轉引的一句。',
 'not_adopted_clues':['Sourceready（付費報告網站摘要）稱引 MIC 資料：2025 年台灣占全球 7nm 以下先進製程產能 63%——非官方、未驗證，不採用','ICAEW 產業簡介稱台灣占最先進製造產能 92%——口徑與出處未驗證，不採用'],
 'note':'各來源口徑不同（總產能／先進製程產能／EUV 世代／<10nm 產量；預估 vs 實績），數字並列，不挑單一值。'}

# =================== energy / water ===================
srsrc='https://esg.tsmc.com/file/public/2025-TSMC-Sustainability-Report-e.pdf'
srarch='https://web.archive.org/web/20260820040506id_/https://esg.tsmc.com/file/public/2025-TSMC-Sustainability-Report-e.pdf'
def sr(key,quote,title='TSMC 2025 Sustainability Report',url=srsrc,arch=srarch,raw='tsmc-SR2025-E-wayback20260820.pdf',period='2025 年度（報告 2026 年發布，存檔日 2026-08-20）',extra='官方站 403；檔案取自 Internet Archive 對同一官方 URL 的存檔，pdftotext -layout 轉文字（多欄版面，引句已依閱讀順序拼接）'):
    src(key,url,title,'台灣積體電路製造股份有限公司（TSMC）',period,quote,raw=raw,archive=arch,extra=extra)
sr('sr2025_energy',"In 2025, TSMC’s total energy consumption reached 30,990 GWh, with purchased electricity constituting approximately 92.8%, natural gas 7.1%, and diesel 0.1%.")
sr('sr2025_re',"In 2025, renewable energy accounted for 20.1% of the Company’s total global electricity consumption, while usage at Taiwan fabs increased to 2,940 GWh, representing 11.4% of total electricity consumption in Taiwan operations.")
sr('sr2025_chart','能源消費堆疊圖（單位 100 GWh；圖例 Non-renewable energy／Renewable energy／Natural gases／Diesel oil）2023/2024/2025 欄位數字：0.01/0.2/0.2；15.4/19.0/22.0；25.9/36.1/57.8；206.3/219.4/229.9；再生能源占比 9.2%、10.4%、11.2%、14.1%、20.1%（2021–2025）。')
sr('sr2024_chart','能源消費堆疊圖（單位 100 GWh）2021/2022 欄位數字：0.3/0.3；10.9/13.1；16.7/21.9；164.1/188.9；2024 年文字："In 2024, TSMC’s total energy consumption was 27,456 GWh, with purchased electricity, natural gases, and diesel accounting for approximately 93.0%, 6.9%, and 0.1%, respectively."',title='TSMC 2024 Sustainability Report',url='https://esg.tsmc.com/file/public/2024-TSMC-Sustainability-Report-e.pdf',arch='https://web.archive.org/web/20251020034129id_/https://esg.tsmc.com/file/public/2024-TSMC-Sustainability-Report-e.pdf',raw='tsmc-SR2024-E-wayback20251020.pdf',period='2024 年度（存檔日 2025-10-20）')
sr('sr2025_water','Tap Water Consumption 圖（million m3）：Taiwan fabs 2021–2025 = 76.1、96.8、92.5、94.6、108.9；subsidiaries 2021–2025 = 6.7、7.8、8.5、14.6、18.2；Water consumption per wafer-layer（L/12-inch equivalent wafer mask layer）2021–2025 = 119.9、137.3、176.4、161.0、153.3；"cumulative consumption reaching 23.53 million cubic meters in 2025 (including 22.73 million cubic meters of reclaimed water intake and 0.80 million cubic meters of water exchange), achieving a ... substitution rate of 18% at Taiwan fabs."（圖表由 pdftotext 抽取，列順序依標籤與總和交叉驗證；2025/2024 單位用水量 153.3/161.0 另見年報）')
ar25('tsmc_AR2025_water','年度 總用水量（百萬立方公尺）（註一）單位產品用水量（公升／十二吋晶圓當量-光罩數）114年 151 153.3；113年 129 161.0。註一：包含台積公司台灣廠區與子公司自來水與再生水使用量總和。…「截至一百一十四年底已取用2,353萬立方公尺再生水，使台灣廠區的替代率達18%。」')
sr('sr2024_reclaimed','"Tainan fabs cumulatively consumed 19.65 million m3"；"achieving a reclaimed water replacement rate of 17%"（節錄，2024 年）',title='TSMC 2024 Sustainability Report',url='https://esg.tsmc.com/file/public/2024-TSMC-Sustainability-Report-e.pdf',arch='https://web.archive.org/web/20251020034129id_/https://esg.tsmc.com/file/public/2024-TSMC-Sustainability-Report-e.pdf',raw='tsmc-SR2024-E-wayback20251020.pdf',period='2024 年度')
src('moeaea_2025_power','https://www.moeaea.gov.tw/ECW/populace/content/Content.aspx?menu_id=14436','能源消費概況（民國114年）','經濟部能源署','民國114年（2025）；頁面內容更新 115-07-01','「以電力消費來看，民國114年總量為2,830億度，按部門別分，由大至小排列，依序為工業部門為1,573億度、占比為55.6%，」（WebFetch 回傳之原文）',extra='取自政府官方統計頁面，以 WebFetch 取得')
ed={2021:(0.3,10.9,16.7,164.1,9.2),2022:(0.3,13.1,21.9,188.9,10.4),2023:(0.01,15.4,25.9,206.3,11.2),2024:(0.2,19.0,36.1,219.4,14.1),2025:(0.2,22.0,57.8,229.9,20.1)}
tap={2021:(76.1,6.7),2022:(96.8,7.8),2023:(92.5,8.5),2024:(94.6,14.6),2025:(108.9,18.2)}
ey=[]
for y,(di,ng,re_,nr,rp) in ed.items():
    ey.append({'year':y,'unit':'100 GWh（= 億度）','nonrenewable_electricity':nr,'renewable_electricity':re_,'natural_gas':ng,'diesel':di,'renewable_share_of_electricity_pct':rp,
      'electricity_total_derived':round(nr+re_,1),'derivation':'electricity_total_derived = nonrenewable + renewable（自圖表抽出數字相加，非報告明列的總量）',
      'source':'sr2025_chart' if y>=2023 else 'sr2024_chart','chart_caveat':'圖表由 pdftotext 抽取，系列對應依 (a) 2025/2024 文字總量 30,990/27,456 GWh 與四項總和相符、(b) 再生比 9.2/10.4/11.2/14.1/20.1% 與各年 renewable/(renewable+nonrenewable) 相符 交叉確認'})
ey[3]['reported_total_energy_GWh']=27456; ey[3]['reported_total_source']='sr2024_chart'
ey[4]['reported_total_energy_GWh']=30990; ey[4]['reported_total_source']='sr2025_energy'
wy=[]
for y,(tw,sub) in tap.items():
    wy.append({'year':y,'tap_water_taiwan_fabs_million_m3':tw,'tap_water_subsidiaries_million_m3':sub,'source':'sr2025_water','scope_note':'子公司含 TSMC (China)、TSMC (Nanjing)、TSMC Washington、TSMC Arizona、JASM、VisEra（報告圖註）'})
wy[3].update({'total_water_million_m3_annual_report':129,'unit_water_L_per_wafer_layer':161.0,'reclaimed_taiwan_cumulative_million_m3':19.65,'reclaimed_substitution_rate_pct':17,'source_total':'tsmc_AR2025_water','source_reclaimed':'sr2024_reclaimed'})
wy[4].update({'total_water_million_m3_annual_report':151,'unit_water_L_per_wafer_layer':153.3,'reclaimed_taiwan_million_m3':23.53,'reclaimed_substitution_rate_pct':18,'source_total':'tsmc_AR2025_water','source_reclaimed':'sr2025_water'})
out['energyWater']={
 'electricity_by_year':ey,
 'electricity_2020':None,'electricity_2020_reason':'2020 年數值只在 2024 年永續報告書的圖表中，圖表欄位無法可靠對應（抽出的數字序列與圖例無法交叉驗證），不填。',
 'total_energy_reported_GWh':{'2024':27456,'2025':30990},
 'renewable_2025':{'global_GWh':5780,'global_share_pct':20.1,'taiwan_fabs_GWh':2940,'taiwan_fabs_share_pct':11.4,'source':['sr2025_re','tsmc_20F_FY2025_re'],'note':'20-F FY2025 同稱 5,780 GWh（含再生電力、憑證與碳權，定義見報告腳註）'},
 'share_of_taiwan_total_electricity':{'official_statement':None,'reason':'TSMC 報告書、台電、經濟部能源署均未直接公布「台積電占台灣總用電比重」。僅可用官方分子分母推算，且分子（台灣廠區用電）也非報告明列。',
   'taiwan_total_electricity_2025_100M_kWh':2830,'taiwan_total_source':'moeaea_2025_power',
   'derived_estimate':{'tsmc_taiwan_fabs_electricity_GWh_derived':'2,940 GWh ÷ 11.4% ≈ 25,789 GWh（報告的 11.4% 與 2,940 GWh 反推；有四捨五入誤差，約±1%）','share_of_taiwan_total_derived_pct':'≈ 9.1%（25,789 GWh ÷ 283,000 GWh）','warning':'派生值，不是官方數字；若用全球用電 28,770 GWh（renewable+nonrenewable 相加）去除以台灣用電會得 10.2%，但分子含海外廠，口徑不對。媒體（自由時報等）有「約 10%」說法，屬二手，未採用。'}},
 'water_by_year':wy,
 'water_2020_2023':None,'water_2020_2023_reason':'總用水量（含再生水）與再生水量僅在年報／報告書最近兩年表取得（2024、2025）；2021–2023 只有自來水分廠區圖表數據（見 water_by_year）；2020 年未取得。',
 'reclaimed_note':'「2025 年 23.53 百萬立方公尺」在報告書原文為 "cumulative consumption reaching ... in 2025"，年報中文為「截至114年底已取用…」。累積起算點與是否為單年量，報告書未在該句交代，引用時請保留原文；替代率 18% 為台灣廠區。'}
out['notes']=[
 '【TSIA 口徑】以總部設立在台灣的公司為基準（海外廠區產值計入台灣公司，外商在台廠不計）；IC產業產值＝設計＋製造＋封裝＋測試；製造＝晶圓代工＋記憶體與其他製造。匯率以新聞稿所用（2025/2026 版 31.2）。',
 '【版本】TSIA 每年二月新聞稿會修正前一年的預估。本檔每個年度取「最新一份載明該年數字的發布」：2010–2014 取 2015-02 稿（2010 年在 2012-03 稿為 17,537 億、2013-03 稿起為 17,693 億，取後者）；2015 取 2017-02 稿（與 2019-02 稿相同）；2016 取 2020-02 稿；2017–2020 取 2021-02 稿；2021 取 2022-02 稿；2022–2025 取 2026-02／2026-08 稿。所有重疊年度在不同版本間的數字一致（除上述 2010 年）。',
 '【記憶體欄位名稱與斷點】2010–2016 原表欄位為 "Brand Name"（自有品牌，主要為記憶體），2017 起為「記憶體與其他製造」；TSIA 註明 2018 年起華亞科（美光子公司）不再計入台灣記憶體產值。2017 年（含）以前與 2018 年（含）以後的記憶體／IC產業總產值是否同口徑，文件未逐年說明，跨 2017/2018 年比較時請加註。',
 '【年增率】yoy_pct 為新聞稿／統計表原載，非本檔重算。2010 年的 38.3% 以 2009 年（舊口徑）為基準。',
 '【2025 年】2026-02 新聞稿全年欄位標 (e)，2026-05、2026-08 稿表中沿用同數字且不再標 (e)。2026 年為預估，TSIA／IEK 三次預估：77,150（2026-02）→84,450（2026-05）→91,904（2026-08，年增 40.9%）。',
 '【台積電】營收為合併營收；2015–2024 取自 SEC 20-F 之 XBRL（元），2025 取自年報（仟元）。資本支出美元為 20-F 內以加權平均匯率換算的數字（例 2025：NT$1,272,411 million＝US$40,895 million，匯率 31.11），與法說會口徑的四捨五入值（US$40.9B）一致。員工數為 20-F 全職員工年底人數。',
 '【7 奈米以下占比】為占「晶圓銷售金額」比重（不含其他營收）。2018 年與 2019 年的 9%、27% 只有 7nm 一節點；2020 年起 7nm＋5nm（＋3nm）合計。年報 2025 把 2020 年寫為 41%（7nm 33% ＋ 5nm 8%），與 20-F FY2020 之 "7-nanometer 33%、5-nanometer 8%" 相符。',
 '【取得途徑】tsmc.com 與 esg.tsmc.com 對自動化下載回 Cloudflare 驗證頁（403），未嘗試繞過；PDF 改取 Internet Archive 對同一官方網址的存檔，並在 archive_url 標示。TSIA 舊稿（2010–2014）同為 Internet Archive 存檔的 tsia.org.tw 原檔，2015 以後多數可直接由 tsia.org.tw/api/DownloadPage?pageID=N 下載。',
 '【未做】未逐年核對 2015–2024 年報口徑員工數與 20-F 是否完全一致（僅核對 2025）；未取得 TSMC 歷年平台別占比（任務只要最新）；2020 年用電與 2020–2023 年再生水量未取得（見各欄 reason）。']
json.dump(out,open('/Users/cheyuwu/Projects/taiwan-md/.claude/worktrees/industry-topic-e7e4f7/data/industry/research/semiconductor-output.json','w'),ensure_ascii=False,indent=1)
print('ok',len(S))
