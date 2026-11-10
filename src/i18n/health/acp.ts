/**
 * /health/advance-care-planning/ 文案：安寧緩和醫療與預立醫療決定的流程指南。
 * 條文內容以全國法規資料庫《安寧緩和醫療條例》《病人自主權利法》現行條文為準（2026-11-10 讀取）；
 * 數字用 {佔位} 從 src/data/health/topic.json 的 acp 帶入。[[key]] 是腳註。
 */
export const acp = {
  zh: {
    title: '預立醫療決定怎麼簽？安寧與病主法流程 2026',
    description:
      '預立醫療決定四步驟：諮商、簽署、見證或公證、註記健保卡。說明安寧緩和意願書與預立醫療決定的差別、五種臨床條件、健保給付諮商費的對象。依現行條文，截至 {asOf}。',
    eyebrow: '醫療與長照 · 流程指南',
    h1: '預立醫療決定怎麼簽：安寧緩和與病人自主的流程（2026）',
    lead: '台灣有兩份可以事先簽好的文件，都會註記在健保卡上。一份是安寧緩和醫療意願書，管末期時要不要急救；一份是預立醫療決定，範圍更大，要先做過諮商才能簽。截至 {statAsOf}，註記安寧緩和意願的有 {hospice} 萬人次，簽預立醫療決定的超過 {ad} 萬人次。[[acpStats]]',
    cmpH: '兩份文件差在哪裡',
    cmp: [
      ['', '安寧緩和醫療意願書', '預立醫療決定'],
      [
        '法律',
        '《安寧緩和醫療條例》，2000 年 6 月 7 日公布施行',
        '《病人自主權利法》，2016 年 1 月 6 日公布，2019 年 1 月 6 日施行',
      ],
      [
        '適用情況',
        '末期病人：經兩位相關專科醫師診斷，不可治癒且近期內死亡已不可避免',
        '五種臨床條件之一（見下），由兩位相關專科醫師確診，並經緩和醫療團隊至少兩次照會確認',
      ],
      [
        '可以決定什麼',
        '要不要接受安寧緩和醫療、心肺復甦術與維生醫療',
        '接受或拒絕維持生命治療、人工營養及流體餵養',
      ],
      [
        '誰可以簽',
        '成年且具行為能力的人可以預立；末期病人可以立意願書',
        '具完全行為能力的人',
      ],
      [
        '簽之前',
        '不需要諮商；兩位具完全行為能力者在場見證',
        '必須先在醫療機構做預立醫療照護諮商，機構在決定書上核章',
      ],
      [
        '怎麼生效',
        '掃描存檔後註記在健保卡，效力與意願書正本相同',
        '公證或兩人見證，掃描存檔並註記健保卡',
      ],
      ['可以反悔嗎', '可以，隨時以書面撤回', '可以，隨時以書面撤回或變更'],
    ],
    cmpSrc:
      '依據：《安寧緩和醫療條例》第 3 到 7 條[[hospiceLaw]]；《病人自主權利法》第 8、9、12、14 條[[pra]]',
    condH: '預立醫療決定適用的五種臨床條件',
    cond: [
      '末期病人',
      '處於不可逆轉的昏迷狀況',
      '永久植物人狀態',
      '極重度失智',
      '其他經中央主管機關公告的疾病狀況：痛苦難以忍受、疾病無法治癒，且依當時醫療水準沒有其他合適解決方法',
    ],
    condNote:
      '符合條件且有預立醫療決定時，醫療機構或醫師「得」依決定終止、撤除或不施行；機構或醫師依專業或意願無法執行時，可以不施行，但要告知病人或關係人（第 14 條）。',
    stepsH: '預立醫療決定的四個步驟',
    steps: [
      [
        '預約預立醫療照護諮商',
        '找有提供諮商的醫療機構（全國 {sites} 家）。意願人本人、至少一位二親等內親屬、醫療委任代理人（有指定的話）要一起參加。[[acpNhi]][[pra]]',
      ],
      [
        '簽署預立醫療決定',
        '諮商後填寫決定書，寫明在五種臨床條件下，對維持生命治療、人工營養及流體餵養要接受還是拒絕。醫療機構在決定書上核章證明。',
      ],
      [
        '公證，或兩人見證',
        '經公證人公證，或由兩位以上具完全行為能力的人在場見證。',
      ],
      [
        '掃描存檔，註記健保卡',
        '醫療機構把決定書掃描存進衛福部資料庫，再註記到健保卡。三個要件都完成（核章、見證或公證、註記）才算成立。',
      ],
    ],
    costH: '費用與健保給付',
    cost: [
      '健保從 {acpSince} 起給付「預立醫療照護諮商費」，每人終生一次，完成簽署由健保支付 {points} 點。[[acpNhi]]',
      '給付對象：符合安寧療護收案條件者、輕度失智症、病主法第 14 條第 1 項第 5 款公告的病名、居家醫療照護整合計畫收案對象；{acpExpand} 起再加入 65 歲以上重大傷病病人，以及家醫計畫或地區醫院全人照護計畫裡 65 歲以上多重慢性病病人，場所也從住院擴大到門診。衛福部估約 {reach}受惠。[[acpNhi]]',
      '不在給付對象內的人要自費，各醫療機構的自費價格我們沒有找到官方彙整，請直接問預約的機構。',
    ],
    faqH: '常見問題',
    faq: [
      {
        q: '預立醫療決定跟安樂死一樣嗎？',
        a: '不一樣。預立醫療決定是在五種臨床條件下，拒絕或接受維持生命治療與人工營養及流體餵養；醫療機構終止或撤除這些治療時，依法要提供緩和醫療與其他適當處置。它不包含由醫師給藥結束生命。',
      },
      {
        q: '簽了之後可以改嗎？',
        a: '可以。《病人自主權利法》第 8 條規定，意願人可以隨時以書面撤回或變更預立醫療決定。安寧緩和醫療意願書同樣可以隨時以書面撤回。',
      },
      {
        q: '一定要先諮商嗎？可以自己在家寫嗎？',
        a: '預立醫療決定一定要經過醫療機構的預立醫療照護諮商並核章，再加上公證或兩人見證、註記健保卡，三項齊全才成立。安寧緩和醫療意願書不需要諮商，有兩位見證人即可簽署。',
      },
      {
        q: '家人不同意怎麼辦？',
        a: '諮商時至少要有一位二親等內親屬參加，目的是讓家人事先了解意願。決定成立後，醫療機構依的是意願人的預立醫療決定。意願人指定的醫療委任代理人，在意願人昏迷或無法表達時，依決定內容代為表達醫療意願。',
      },
      {
        q: '簽了醫院就一定會照做嗎？',
        a: '法條的用字是「得」依預立醫療決定執行。醫療機構或醫師依專業或意願無法執行時可以不施行，但應告知病人或關係人。',
      },
    ],
    disclaimerH: '這一頁不是醫療或法律建議',
    disclaimer:
      '內容整理自現行法條與衛福部公告，幫你在諮商前先有概念。個別病況是否符合臨床條件、文件怎麼填，要由醫療機構的諮商團隊與醫師判斷。',
    srcH: '資料來源與截止日期',
  },
  en: {
    title: 'Advance Decisions and Hospice in Taiwan: How to Sign (2026)',
    description:
      'Four steps to an advance decision in Taiwan: consultation, signing, witnesses or notary, and the note on your NHI card. How it differs from a hospice directive, the five clinical conditions, and who gets the consultation paid by NHI. As of {asOf}.',
    eyebrow: 'Health and long-term care · Guide',
    h1: 'How to sign an advance decision: hospice and patient autonomy in Taiwan (2026)',
    lead: 'Taiwan has two documents that can be signed ahead of time, both recorded on the NHI card. The hospice directive covers resuscitation at the terminal stage; the advance decision is broader and requires a consultation first. As of {statAsOf}, {hospice} hospice wishes and more than {ad} advance decisions had been recorded.[[acpStats]]',
    cmpH: 'How the two documents differ',
    cmp: [
      ['', 'Hospice palliative care directive', 'Advance decision'],
      [
        'Law',
        'Hospice Palliative Care Act, in force since 7 June 2000',
        'Patient Right to Autonomy Act, promulgated 6 January 2016, in force 6 January 2019',
      ],
      [
        'Applies when',
        'Terminal illness: two specialists find it incurable with death unavoidable in the near term',
        'One of five clinical conditions (below), confirmed by two specialists and at least two consultations with a palliative team',
      ],
      [
        'What it decides',
        'Hospice care, cardiopulmonary resuscitation and life-sustaining treatment',
        'Accepting or refusing life-sustaining treatment and artificial nutrition and hydration',
      ],
      [
        'Who can sign',
        'Adults with legal capacity may sign in advance; terminal patients may sign a directive',
        'Persons with full legal capacity',
      ],
      [
        'Before signing',
        'No consultation; two witnesses with full legal capacity',
        'An advance care planning consultation at a medical institution, which stamps the decision',
      ],
      [
        'Taking effect',
        'Scanned, filed and noted on the NHI card, with the same force as the original',
        'Notarised or witnessed by two people, scanned, filed and noted on the NHI card',
      ],
      [
        'Changing your mind',
        'Withdraw in writing at any time',
        'Withdraw or amend in writing at any time',
      ],
    ],
    cmpSrc:
      'Basis: Hospice Palliative Care Act, Articles 3 to 7[[hospiceLaw]]; Patient Right to Autonomy Act, Articles 8, 9, 12 and 14[[pra]]',
    condH: 'The five clinical conditions for an advance decision',
    cond: [
      'Terminal illness',
      'Irreversible coma',
      'Permanent vegetative state',
      'Severe dementia',
      'Other conditions announced by the central authority: unbearable suffering from an incurable disease with no other suitable option at the current standard of care',
    ],
    condNote:
      'When a condition is met and a decision exists, the institution or physician "may" withhold or withdraw accordingly; if they cannot carry it out for professional or personal reasons they may decline but must inform the patient or those concerned (Article 14).',
    stepsH: 'Four steps to an advance decision',
    steps: [
      [
        'Book an advance care planning consultation',
        'Find an institution offering it ({sites} nationwide). The person signing, at least one relative within the second degree, and the health care agent (if appointed) attend together.[[acpNhi]][[pra]]',
      ],
      [
        'Sign the advance decision',
        'After the consultation, state for each of the five conditions whether to accept or refuse life-sustaining treatment and artificial nutrition and hydration. The institution stamps the document.',
      ],
      [
        'Notary, or two witnesses',
        'Have it notarised, or witnessed by two or more people with full legal capacity.',
      ],
      [
        'Scan, file and note on the NHI card',
        'The institution scans the document into the ministry database and records it on the NHI card. All three requirements (stamp, witnesses or notary, card note) must be met.',
      ],
    ],
    costH: 'Cost and NHI coverage',
    cost: [
      'Since {acpSince} the NHI pays an advance care planning consultation fee once in a lifetime, {points} points when the decision is signed.[[acpNhi]]',
      'Covered: patients meeting hospice enrollment criteria, mild dementia, conditions announced under Article 14(1)(5), and home medical care program enrollees; from {acpExpand} also catastrophic illness patients aged 65 and over and those 65 and over with multiple chronic conditions in the family doctor or community hospital programs, in outpatient as well as inpatient settings. The ministry estimates {reach} benefit.[[acpNhi]]',
      'Others pay out of pocket. We found no official summary of self-pay prices; ask the institution when booking.',
    ],
    faqH: 'Frequently asked questions',
    faq: [
      {
        q: 'Is an advance decision the same as euthanasia?',
        a: 'No. It lets a person refuse or accept life-sustaining treatment and artificial nutrition and hydration under five clinical conditions; when treatment is withheld or withdrawn the institution must provide palliative care. It does not include a physician administering drugs to end life.',
      },
      {
        q: 'Can I change it later?',
        a: 'Yes. Article 8 of the Patient Right to Autonomy Act allows withdrawal or amendment in writing at any time. A hospice directive can likewise be withdrawn in writing.',
      },
      {
        q: 'Is the consultation mandatory?',
        a: 'For an advance decision, yes: consultation and stamp, plus notary or two witnesses, plus the NHI card note. A hospice directive needs no consultation, only two witnesses.',
      },
      {
        q: 'What if my family disagrees?',
        a: 'At least one relative within the second degree must join the consultation so the family understands the wishes. Once valid, institutions follow the person’s decision; an appointed health care agent speaks for the person, in line with the decision, when they cannot.',
      },
      {
        q: 'Will the hospital always follow it?',
        a: 'The statute says institutions "may" act on the decision. If they cannot carry it out for professional or personal reasons they may decline but must inform the patient or those concerned.',
      },
    ],
    disclaimerH: 'This page is not medical or legal advice',
    disclaimer:
      'It summarises current statutes and ministry announcements to prepare you for a consultation. Whether a condition is met and how to complete the documents is for the consultation team and physicians to judge.',
    srcH: 'Sources and cut-off dates',
  },
} as const;
