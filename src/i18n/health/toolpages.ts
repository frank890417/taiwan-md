/**
 * /health 三個工具單獨頁的文案（標題、描述、怎麼讀、計算方式、常見問題）。
 * 會變的數字一律寫成 {佔位}，由模板從 src/data/health/*.json 帶入（見 health-tool.template.astro 的 vars）。
 * 常見問題的字會原樣進 FAQPage 結構化資料，所以每題回答自己要讀得懂，不依賴上下文。
 */
export interface ToolPageCopy {
  /** <title>（不含站名） */
  title: string;
  description: string;
  h1: string;
  eyebrow: string;
  lead: string;
  readH: string;
  read: string[];
  formulaH: string;
  formula: string[];
  faqH: string;
  faq: { q: string; a: string }[];
}

export const toolPages: Record<string, { zh: ToolPageCopy; en: ToolPageCopy }> =
  {
    'long-term-care-subsidy': {
      zh: {
        title: '長照補助試算 {year}：額度與自付額一次算',
        description:
          '選長照需要等級、身分別與縣市，算出照顧及專業服務、交通接送、喘息、輔具四項的給付額度與自付上限。第 2 級每月 {q2} 元到第 8 級 {q8} 元，規則截至 {asOf}。',
        h1: '長照補助額度與自付額試算（{year}）',
        eyebrow: '醫療與長照 · 工具',
        lead: '長照 2.0 以來的給付分成四包：照顧及專業服務、交通接送、輔具與居家無障礙、喘息服務。每一包有額度上限，額度內依身分別自付 0% 到 30%。選三個條件，就能看到一個月最多可以用多少、自己最多要付多少。',
        readH: '結果怎麼讀',
        read: [
          '「額度」是政府給付加上你自付的合計上限，額度本身不會因為家庭經濟狀況打折，差別只在自付比率。',
          '「自付上限」是額度全部用完時要付的錢。實際上照顧計畫不一定會把額度排滿，自付額只會比這裡少。',
          '四包額度不能互相流用：照顧服務的額度不能拿去買輔具，交通接送的額度也不能拿去請居服員。',
          '住在住宿式機構（護理之家、養護機構）的人不用這套額度，改領住宿式機構使用者補助：{year} 年起每月最高 {resMonthly} 元、每年最高 {resYearly} 元。',
        ],
        formulaH: '計算方式與假設',
        formula: [
          '額度：依《長期照顧服務申請及給付辦法》附表二。照顧及專業服務依第 2 到第 8 級分七個金額；交通接送依居住地分四區；輔具與居家無障礙第一組每 3 年 {assist} 元；喘息服務第 2 到 6 級每年 {resp1} 元、第 7 到 8 級每年 {resp2} 元。',
          '自付額＝額度 × 部分負擔比率（附表五），小數點以下無條件捨去。照顧及專業服務與喘息：第一類 0%、第二類 5%、第三類 16%。輔具：0%、10%、30%。交通接送依分區：第二類 7% 到 10%、第三類 21% 到 30%。',
          '聘有外籍家庭看護工：照顧及專業服務額度以 30% 計（辦法第 10 條），並限用於居家照顧服務以外的項目。',
          '沒有算進來的：超過額度的自費、各縣市自訂的加碼補助、輔具第二組（{assist2Since} 起每 3 年 {assist2} 元，與第一組擇一）、單項輔具的價格上限。',
        ],
        faqH: '常見問題',
        faq: [
          {
            q: '長照需要等級是誰決定的？',
            a: '由各縣市長期照顧管理中心的照管專員到家裡（或醫院）評估，依照顧管理評估量表由系統判定第 1 到第 8 級。第 1 級不給付，第 2 級以上才有額度。申請方式是撥長照專線 1966，或直接聯絡當地照管中心。',
          },
          {
            q: '中低收入戶的長照自付額是多少？',
            a: '列冊的低收入戶與中低收入戶都屬於長照第一類，四項給付的自付比率都是 0%，額度內由政府全額負擔。自付 5% 到 10% 的第二類，指的是符合中低收入老人生活津貼第二款或身心障礙者生活補助資格的人。',
          },
          {
            q: '請了外籍看護還能申請長照嗎？',
            a: '可以。經評估第 2 級以上，照顧及專業服務給付額度的 30%，限用在居家照顧服務以外的項目，例如專業服務、日間照顧、家庭托顧、到宅沐浴車。交通接送、輔具與居家無障礙改善照常可以申請，外籍看護休假時可以申請喘息服務。',
          },
          {
            q: '這個月額度沒用完會怎樣？',
            a: '照顧及專業服務與交通接送按月給付，以六個月為一期，沒用完的額度可以保留在核定當月起六個月內使用，期滿歸零。輔具每三年給付一次，喘息服務每年給付一次。',
          },
          {
            q: '住在養護機構可以用這些額度嗎？',
            a: '不行。全日住宿式機構與團體家屋的住民不適用這套額度，改申請住宿式機構使用者補助：長照需要等級第 4 級以上或持中度以上身心障礙證明者，{year} 年起每月最高 {resMonthly} 元、每年最高 {resYearly} 元，不排富，以實際支付的住宿費用為上限。',
          },
        ],
      },
      en: {
        title: 'Taiwan Long-Term Care Subsidy Calculator {year}',
        description:
          'Pick a care level, copayment category and county to see allowances and copay ceilings for care services, transport, respite and assistive devices in Taiwan. Rules as of {asOf}.',
        h1: 'Long-term care allowance and copay calculator ({year})',
        eyebrow: 'Health and long-term care · Tool',
        lead: "Taiwan's long-term care benefits come in four packages: care and professional services, transport, assistive devices with home accessibility, and respite care. Each has a ceiling, and within it you pay 0% to 30% depending on your category. Three choices show how much can be used each month and the most you would pay.",
        readH: 'How to read the result',
        read: [
          'The allowance is the ceiling for government payment plus your copay. It is not reduced by household income; only the copay rate differs.',
          'The copay ceiling assumes the allowance is fully used. Care plans often use less, so the real copay is lower.',
          'The four packages cannot be swapped: care hours cannot buy devices, and transport money cannot pay a home care worker.',
          'Residents of nursing homes and other residential facilities use a separate subsidy: from {year}, up to NT${resMonthly} a month and NT${resYearly} a year.',
        ],
        formulaH: 'Method and assumptions',
        formula: [
          'Allowances follow Schedule 2 of the Regulations on Application and Benefits for Long-Term Care Services: seven amounts for Levels 2 to 8, four transport zones, NT${assist} every three years for assistive devices (Group 1), and respite of NT${resp1} a year for Levels 2 to 6 or NT${resp2} for Levels 7 to 8.',
          'Copay = allowance × copayment rate (Schedule 5), rounded down. Care services and respite: 0%, 5%, 16% for Categories 1, 2, 3. Devices: 0%, 10%, 30%. Transport by zone: 7% to 10% for Category 2, 21% to 30% for Category 3.',
          'With a migrant live-in caregiver, care services are paid at 30% of the allowance (Article 10) and limited to items other than home care.',
          'Not included: spending beyond the allowance, county top-ups, the Group 2 device allowance (NT${assist2} every three years from {assist2Since}, instead of Group 1), and per-item price caps.',
        ],
        faqH: 'Frequently asked questions',
        faq: [
          {
            q: 'Who decides the care needs level?',
            a: 'A care manager from the county long-term care management center visits the home or hospital and completes a standard assessment; the system assigns Level 1 to 8. Level 1 receives no benefits. To apply, call the 1966 hotline or the local center.',
          },
          {
            q: 'What do lower-middle-income households pay?',
            a: 'Registered low-income and lower-middle-income households are both Category 1 and pay 0% within the allowance. Category 2, with 5% to 10% copays, covers people who qualify for the second tier of the elderly living allowance or the disability living subsidy.',
          },
          {
            q: 'Can a family with a migrant caregiver still apply?',
            a: 'Yes. At Level 2 or above, care and professional services are paid at 30% of the allowance for items other than home care, such as professional services, day care or bathing vans. Transport and assistive devices are available as usual, and respite care can be used when the caregiver is on leave.',
          },
          {
            q: 'What happens to unused allowance?',
            a: 'Care services and transport are monthly. Unused amounts carry over for six months from the month the plan was approved and then expire. Devices are granted once every three years and respite once a year.',
          },
          {
            q: 'Do these allowances apply in a nursing home?',
            a: 'No. Residents of full-time residential facilities apply for the residential user subsidy instead: Level 4 or above, or a moderate or more severe disability certificate, qualifies for up to NT${resMonthly} a month and NT${resYearly} a year from {year}, with no means test, capped at fees actually paid.',
          },
        ],
      },
    },
    'long-term-care-eligibility': {
      zh: {
        title: '長照資格自查 {year}：誰可以申請長照？',
        description:
          '回答年齡與四個狀況，對照現行條文判斷是否屬於長照給付對象：65 歲以上、55 歲以上原住民、領有身心障礙證明、失智症不限年齡。規則截至 {asOf}，實際以照管中心評估為準。',
        h1: '長照資格自查：我或家人可以申請嗎？（{year}）',
        eyebrow: '醫療與長照 · 工具',
        lead: '能不能用長照，看兩件事：有沒有因為身心失能而需要別人協助，以及是不是條文列的四種身分之一。{year} 年 1 月 1 日起，失智症不再限 50 歲以上，急性後期照護個案也納入。',
        readH: '結果怎麼讀',
        read: [
          '這裡判斷的是「身分條件」。真正的資格要等照管專員評估，長照需要等級達第 2 級以上才會核定給付額度。',
          '不符合也不代表沒有資源：社區照顧關懷據點、巷弄長照站、文化健康站提供共餐、健康促進與預防延緩失能的活動，不需要失能等級。',
        ],
        formulaH: '判斷依據',
        formula: [
          '《長期照顧服務申請及給付辦法》第 2 條：因身心失能，且符合下列之一：65 歲以上（具原住民身分者 55 歲以上）、領有身心障礙證明、失智症、評估期間符合健保急性後期整合照護計畫的收案對象。',
          '第 7 條：長照需要等級分第 1 到第 8 級，第 1 級為身體或心智未失能者，不納入給付範圍。',
          '長照 2.0 時期曾列入的「日常生活需協助的獨居老人或衰弱老人」不在現行條文的身分內；這類長輩可以使用的是社區據點的預防延緩失能服務。',
        ],
        faqH: '常見問題',
        faq: [
          {
            q: '未滿 65 歲可以申請長照嗎？',
            a: '可以，只要符合其他身分之一並且失能：55 歲以上具原住民身分、領有身心障礙證明（不限年齡）、經診斷失智症（{year} 年 1 月 1 日起不限年齡），或住院期間屬於急性後期整合照護計畫的個案。',
          },
          {
            q: '怎麼申請長照？',
            a: '四個入口都可以：撥長照專線 1966、聯絡當地長期照顧管理中心、住院時找醫院的出院準備服務小組、或在縣市政府網站線上申請。之後照管專員會到府評估，核定等級與額度，再由個案管理員一起擬照顧計畫。',
          },
          {
            q: '評估沒過怎麼辦？',
            a: '評估結果未達第 2 級就沒有給付額度，但可以使用社區照顧關懷據點、巷弄長照站等服務。身體狀況改變時可以重新申請評估。',
          },
        ],
      },
      en: {
        title: 'Who Qualifies for Long-Term Care in Taiwan? ({year})',
        description:
          'Answer five questions to check eligibility under current rules: 65 and over, indigenous 55 and over, disability certificate holders, or dementia at any age. Rules as of {asOf}.',
        h1: 'Long-term care eligibility check ({year})',
        eyebrow: 'Health and long-term care · Tool',
        lead: 'Eligibility rests on two things: a disability that requires help with daily living, and one of the listed groups. Since 1 January {year}, dementia is covered at any age and post-acute care cases are included.',
        readH: 'How to read the result',
        read: [
          'This checks the group conditions only. Benefits are granted after a care manager assesses the person at Level 2 or above.',
          'Not qualifying does not mean no help: community care stations offer meals and preventive programs without a care level.',
        ],
        formulaH: 'Basis',
        formula: [
          'Article 2 of the Regulations: a physical or mental disability, plus one of: aged 65 or over (55 for indigenous people), a disability certificate, dementia, or enrollment in the NHI post-acute care program during assessment.',
          'Article 7: care needs run from Level 1 to 8; Level 1 means no disability and is not covered.',
          'Frail or solitary elders who needed help were listed under the earlier 2.0 plan but are not a group in the current article; they are served by preventive programs at community stations.',
        ],
        faqH: 'Frequently asked questions',
        faq: [
          {
            q: 'Can someone under 65 apply?',
            a: 'Yes, with a disability and one of the other groups: indigenous and 55 or over, a disability certificate at any age, diagnosed dementia at any age since 1 January {year}, or a post-acute care case in hospital.',
          },
          {
            q: 'How do I apply?',
            a: 'Call the 1966 hotline, contact the county long-term care management center, ask the hospital discharge planning team, or apply online through the county government. A care manager then assesses the person at home and sets the level and allowance.',
          },
          {
            q: 'What if the assessment falls short?',
            a: 'Below Level 2 there is no allowance, but community care stations remain available. A new assessment can be requested when the condition changes.',
          },
        ],
      },
    },
    'nhi-premium-calculator': {
      zh: {
        title: '健保費試算 {year}：月薪、眷屬與補充保費',
        description:
          '輸入月薪、投保身分與眷屬人數，算出每月健保費自付額、雇主與政府負擔，另附補充保費試算。費率 {rate}%、補充保費 {supp}%，投保金額 {gmin} 到 {gmax} 元共 {gn} 級，{year} 年適用。',
        h1: '健保費試算：月薪、眷屬與補充保費（{year}）',
        eyebrow: '醫療與長照 · 工具',
        lead: '{year} 年一般保險費率是 {rate}%，補充保險費率 {supp}%。受僱者自己付三成、雇主六成、政府一成；月薪 {exSalary} 元、沒有眷屬的上班族，每月自付 {exSelf} 元。',
        readH: '結果怎麼讀',
        read: [
          '「月投保金額」不等於月薪：健保用一張 {gn} 級的分級表，取不低於月薪的最近一級來算。',
          '眷屬跟著你投保時，每多一口就多付一份你的自付額，最多算 {maxDeps} 口。',
          '雇主與政府負擔是照「1＋平均眷口數 {avg}」算的，不管你實際有幾口眷屬，所以三方加總不等於投保金額乘費率。',
        ],
        formulaH: '計算方式與假設',
        formula: [
          '自付保險費＝投保金額 × {rate}% × 負擔比率，四捨五入到元，再乘（本人＋眷屬人數）。這是健保署公告的算法，我們用 {year} 年受僱者負擔金額表全部 {gn} 級逐一核對過。',
          '負擔比率：受僱者 30%（雇主 60%、政府 10%）；公務人員 30%（機關 70%）；私校教職員 30%（學校 35%、政府 35%）；雇主與自營業主 100%；職業工會會員 60%（政府 40%）；農漁會會員 30%（政府 70%）；地區人口 60%（政府 40%）。',
          '地區人口不看收入，以平均保險費 {regAvg} 元計，每人每月自付 {regSelf} 元。',
          '補充保費＝計費金額 × {supp}%。股利、利息、租金、執行業務收入單次達 {suppTh} 元才扣；兼職薪資單次達基本工資 {minWage} 元才扣；獎金只算全年累計超過當月投保金額 {bonusM} 倍的部分；單次計費上限 1,000 萬元。',
          '沒有算進來的：低收入戶等由政府全額補助的身分、各縣市對長者或特定族群的保費補助、投保單位應負擔的補充保費。',
        ],
        faqH: '常見問題',
        faq: [
          {
            q: '{year} 年健保費率是多少？',
            a: '一般保險費率 {rate}%，自 2021 年 1 月 1 日起沿用至今；補充保險費率 {supp}%。{year} 年變動的是投保金額分級表：配合基本工資調整，第一級從 {year} 年 1 月 1 日起是 {gmin} 元。',
          },
          {
            q: '眷屬的健保費怎麼算？',
            a: '眷屬的保費跟被保險人一樣，每一口付一份自付額，由被保險人繳納。超過 {maxDeps} 口以 {maxDeps} 口計。例如受僱者月投保金額 {exSalary} 元，本人 {exSelf} 元，加 2 口眷屬就是 {exSelf} 元的 3 倍。',
          },
          {
            q: '沒有工作要怎麼保健保？',
            a: '可以依附有工作的配偶或直系血親當眷屬；都沒有的話，到戶籍地的鄉鎮市區公所以「地區人口」身分投保，每人每月自付 {regSelf} 元。',
          },
          {
            q: '領股利會被扣多少補充保費？',
            a: '單次給付達 {suppTh} 元的股利，由發放公司按 {supp}% 就源扣取；未達 {suppTh} 元不扣，單次超過 1,000 萬元的部分也不計。例如單次領 5 萬元股利，扣 {exDiv} 元。',
          },
          {
            q: '補充保費會不會改成年度結算？',
            a: '還沒有。衛福部在 2025 年 11 月 6 日表示補充保費改革方案仍在研議、暫停有爭議的規劃；《全民健康保險法》最近一次修正是 2023 年 6 月 28 日，現行條文仍是單次給付就源扣取。',
          },
        ],
      },
      en: {
        title: 'Taiwan NHI Premium Calculator {year}',
        description:
          'Enter salary, enrollment category and dependents to estimate monthly National Health Insurance premiums in Taiwan, plus the supplementary premium. Rate {rate}%, supplementary {supp}%, for {year}.',
        h1: 'NHI premium calculator: salary, dependents and supplementary premium ({year})',
        eyebrow: 'Health and long-term care · Tool',
        lead: 'In {year} the general premium rate is {rate}% and the supplementary rate {supp}%. Employees pay 30%, employers 60% and the government 10%; an employee earning NT${exSalary} with no dependents pays NT${exSelf} a month.',
        readH: 'How to read the result',
        read: [
          'The insured amount is not your salary: NHI uses a {gn}-grade table and takes the nearest grade not below your pay.',
          'Each dependent enrolled with you costs one more share of your own premium, up to {maxDeps}.',
          'Employer and government shares are computed on 1 + the average of {avg} dependents regardless of your household, so the three parts do not sum to insured amount × rate.',
        ],
        formulaH: 'Method and assumptions',
        formula: [
          'Your premium = insured amount × {rate}% × your share, rounded to the dollar, then multiplied by (you + dependents). This is the published method; we checked it against all {gn} grades of the {year} employee table.',
          'Shares: employees 30% (employer 60%, government 10%); civil servants 30% (agency 70%); private school staff 30% (school 35%, government 35%); employers and the self-employed 100%; union members 60% (government 40%); farmers and fishermen 30% (government 70%); regional enrollees 60% (government 40%).',
          'Regional enrollees pay on the average premium of NT${regAvg}: NT${regSelf} per person per month.',
          'Supplementary premium = chargeable amount × {supp}%. Dividends, interest, rent and professional income are charged on single payments of NT${suppTh} or more; part-time wages from the minimum wage of NT${minWage}; bonuses only above {bonusM} times the insured amount for the year; capped at NT$10 million per payment.',
          'Not included: fully subsidised groups such as low-income households, county premium subsidies, and the supplementary premium owed by employers.',
        ],
        faqH: 'Frequently asked questions',
        faq: [
          {
            q: 'What is the NHI premium rate in {year}?',
            a: 'The general rate is {rate}%, unchanged since 1 January 2021, and the supplementary rate is {supp}%. What changed for {year} is the grading table: with the minimum wage rise, the first grade is NT${gmin} from 1 January {year}.',
          },
          {
            q: 'How are dependents charged?',
            a: 'Each dependent pays the same share as the insured person, collected from the insured, up to {maxDeps} dependents. An employee insured at NT${exSalary} pays NT${exSelf}; with two dependents the total is three times that.',
          },
          {
            q: 'How do I enroll without a job?',
            a: 'You can enroll as a dependent of a working spouse or direct relative. Otherwise enroll at your district office as regional population, at NT${regSelf} per person per month.',
          },
          {
            q: 'How much is withheld from dividends?',
            a: 'A single dividend payment of NT${suppTh} or more is charged {supp}% at source; smaller payments are not charged, and the part above NT$10 million is excluded. A NT$50,000 dividend has NT${exDiv} withheld.',
          },
          {
            q: 'Will the supplementary premium move to annual settlement?',
            a: 'Not yet. On 6 November 2025 the Ministry of Health and Welfare said the reform was still under study and that contested parts were paused. The National Health Insurance Act was last amended on 28 June 2023 and still charges at source per payment.',
          },
        ],
      },
    },
  };
