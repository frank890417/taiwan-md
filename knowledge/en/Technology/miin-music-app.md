---
title: 'Miin: How the Slogan "Information Should Be Free" Built PTT and Brought Him to Court'
description: 'In 1995, he set up PTT in a dorm room with the slogan "Information Should Be Free"; in 2017, he returned to Taiwan to build an AI system that identifies coordinated accounts engaged in cognitive warfare; and he was sued for aggregating news to combat disinformation—this same belief is both his weapon and the cause of his lawsuit, and Taiwan happens to be standing at the forefront of a problem the world has yet to solve.'
date: 2026-04-01
category: 'Technology'
tags:
  [
    'AI',
    'Disinformation',
    'Cognitive Warfare',
    'Digital Resilience',
    'Ethan Tu',
    'Copyright',
  ]
subcategory: '數位治理與公民科技'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-06-15
lastHumanReview: false
image: '/article-images/technology/miin-homepage-2026.webp'
imageCredit: '迷音 Miin 官方網站（miin.cc）首頁截圖'
sporeLinks:
  [
    "{'id': 142, 'platform': 'threads', 'date': '2026-06-16', 'url': 'https://www.threads.com/@taiwandotmd/post/DZnPRd1k-F4'}",
    "{'id': 143, 'platform': 'x', 'date': '2026-06-16', 'url': 'https://x.com/taiwandotmd/status/2066559522156748815'}",
  ]
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/迷音Miin.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:e317c3018b82f2b6'
sourceBodyHash: 'sha256:bbf79206e74e0a59'
translatedAt: '2026-07-31T12:09:09+08:00'
---

> **30-Second Overview:** In June 2026, a group of pro-Taiwan netizens called on Threads to switch to "Miin," with posts garnering over 3,000 likes. Miin is an open-source platform led by [PTT founder Ethan Tu](/en/people/ethan-tu/), emphasizing "free speech" and using AI to detect coordinated accounts engaged in [cognitive warfare](/en/society/cognitive-warfare-against-taiwan/). The method is counter-intuitive: it doesn't check the truth of news, but rather looks for accounts that usually stay silent but fire simultaneously the moment a press conference begins. However, in late 2025, NextApple sued Miin, alleging that Miin used over 250 of their news articles without authorization. A person who built PTT and opposes platform censorship returned to Taiwan to create a tool that catches "who is manipulating," yet was sued for aggregating others' news to fight disinformation. The same belief, "Information Should Be Free," is his conviction for thirty years, Miin's current selling point, and the cause of his lawsuit.

In the afternoon of June 2026, a post calling on people to "leave Meta and switch to Miin" garnered 3,200 likes within twelve hours. [^1]The call came from a group of pro-Taiwan netizens. Some of their Facebook accounts had been reported and restricted in succession, prompting them to look for a platform made by Taiwanese themselves. "The Gen-Y's second digital migration, let's go, let's go to miin," someone wrote, connecting the journey from Facebook to Threads, and then to Miin, into a single path of Taiwanese constantly creating new spaces for themselves. [^1]

They may not know that this scene happened once in Taiwan thirty years ago. The person behind Miin, in 1995, also relied on the slogan "Information Should Be Free" to build a place in a National Taiwan University (NTU) dorm where Taiwanese could argue, fall in love, and connect. That place was called PTT. From that computer in the dorm to Miin today, the same belief has run through it all: information should flow freely. This sentence led him to build PTT, made him oppose platform censorship, led him to use AI to catch accounts coordinating the narrative from behind, and also led him to aggregate others' news to fight disinformation. The same sentence is his weapon and the cause of the lawsuit, and this is precisely the most fascinating and difficult part of Miin's story.

## After That 486, He Circled the Globe

[Ethan Tu](/en/people/ethan-tu/) was born in Kaohsiung in 1976. In September 1995, he was still a sophomore in the Department of Computer Science and Information Engineering at NTU. In a male dormitory, he used a self-assembled 486 computer, running Linux and open-source software, to set up a BBS with the codename "ptt." That was the later PTT, and he was the founding system administrator. [^2]The English Wikipedia still records this: PTT was "founded on 9 September 1995 by Yi-Chin Tu (Ethan Tu)," at which time he was a sophomore in the NTU Department of Computer Science. [^2]

After setting up the site, his path once drifted far from cybersecurity and public opinion. In 2003, he went to the United States to conduct gene sequence research at the National Institutes of Health (NIH). In 2006, he joined Microsoft, and in 2012, he became a Development Manager (Principal Development Manager) in Microsoft's AI department, participating in the development of the voice assistant Cortana. A clarification to avoid misunderstanding: he was a key developer in this product team, but the outside world sometimes wrote him as the "global head" of Cortana; that was actually another person, Mike Calcagno. [^3]

Looking at this resume, you will find he was never a pure engineer. Gene sequencing is about finding meaningful patterns in massive data; voice assistants are about teaching machines to understand human intent. Both are about "reading signals in noise." In March 2017, he returned to Taiwan with this capability and founded the [Taiwan AI Labs](/en/technology/taiwan-ai-labs/) (Taiwan AI Labs), publicly branding it as Asia's first non-profit AI research institution. [^4]The old problem of signal and noise, this time, he wanted to use against the increasingly thick fog on social media platforms.

```tw-timeline
From PTT to Miin: Ethan Tu's Thirty Years, Circling the Globe Back to the Same Sentence
1995 | 486 in the Dorm | NTU CSIE Sophomore, built PTT with a self-assembled computer, served as founding sysadmin
2006 | Flew to Microsoft | Later joined the AI department, participated in Cortana development
2017 | Returned to Taiwan for Non-Profit AI | Founded Taiwan AI Labs
2022 | "1 in 4 Accounts" | Pelosi Visit to Taiwan, used behavioral detection to count cognitive warfare accounts
2025 | Sued in Court | Miin scraped over 250 news articles from NextApple, referred for prosecution under Copyright Law
2026 | Let's go, let's go to miin | Pro-Taiwan netizens treat Miin as a safe haven to escape Meta
Source: Compiled from Wikipedia, Taiwan AI Labs, and NextApple News
```

## Not Checking News Truth, Only Who Fires in the Same Second

Miin did not grow out of thin air; it stitched together two earlier projects from the lab: "Reporter Fast Copy" from 2017, which used AI to automatically transcribe popular PTT articles into news drafts; and "Islander Satellite," in collaboration with NTU CSIE Professor Chen Yun-nong. [^5]After the two merged, Miin placed reports from over twenty domestic electronic media outlets, along with Facebook and PTT coverage of the same event, side by side, allowing you to see what the same event looks like under the pens of different stances, and marking which accounts might be coordinated.

What is truly special is the underlying judgment about disinformation. Most people intuitively think that fighting disinformation means checking whether every post is true or false. Ethan Tu's view is exactly the opposite. He spoke firmly in a talk at the Taiwan FactCheck Center: "Using AI to judge the truthfulness of news content is a very dangerous thing. Therefore, the research method of 'Taiwan AI Labs' analyzes from the perspective of behavioral dissemination and the pattern of message spread, rather than relying on AI to detect content truth." [^6]

In other words, the algorithm does not read what a post says or whether it is true or false; it reads how the post is pushed, who retweets it in relay, and at what time point. Coordinated accounts have some very peculiar habits: usually quiet and not very active, but in critical moments, they synchronously emit the same nature, attacking, or misleading messages. "As long as the amplifier sends a message, others retweet it." [^7]During the COVID period, there was an example he repeatedly mentioned: the most intense period of attacks on WHO Director-General Tedros Adhanom Ghebreyesus on PTT fell around 2 p.m., exactly when the pandemic press conference began. The active hours of these coordinated accounts were 9 a.m. to 5 p.m., as if someone treated steering public opinion as a nine-to-five job. [^7]

Technically, this system clusters suspicious accounts based on "synchronized behavior" and "active time." Taking the lab's analysis of the Israel-Hamas war as an example, 71,774 suspicious accounts were organized into 9,737 distinct coordinated groups. [^8]The point was never what one account said, but which batch of accounts always moved and stayed quiet together. Looking at each in isolation, they look like ordinary netizens; only when stacked together does the unnaturally neat rhythm emerge.

```tw-versus
Traditional Fact-Checking: Ask Content | Miin: Ask Behavior
Judge whether each post is true or false | Don't ask about truth, look at how accounts move
When fact-checking comes out, disinformation has often already spread | Catch "usually quiet, synchronously firing in critical moments" coordinated accounts
Dilemma: Who has the qualification to determine truth? | Dilemma: How synchronized is coordinated? The threshold is still set by humans
Source: Ethan Tu interview, Taiwan FactCheck Center
```

> **📝 Curator's Note:** The design of "catching behavior, not content" is worth pausing to look at, because it cleverly sidesteps the sharpest accusations of content censorship. If you delete a post, you must first claim you know it is false, and "who has the qualification to determine truth" is precisely the most difficult thing to reach consensus on in freedom of speech. Ethan Tu changed the object of judgment from "is this sentence correct" to "are these accounts' actions abnormal," effectively turning a value judgment into a statistical judgment. The cleverness is in this step; the honesty required to make up for it is also in this step: it does not eliminate the question of "who decides," but simply moves it from "determining content truth" to "determining what kind of synchronization constitutes manipulation." The threshold is set where, and how synchronized counts as coordinated, is still set by humans. This time, however, the one defining it is an algorithm that has not yet been made public.

## How Solid Are Numbers Like "1 in 4 Accounts"?

Miin is worth taking seriously because it connects to a real international frontline. Taiwan is a major disaster area for overseas information manipulation, which is a consensus in academia rather than marketing jargon: a 2022 paper in Oxford University's _Journal of Global Security Studies_ defined cognitive warfare as "controlling others' mental states and behaviors by manipulating environmental stimuli" and explicitly listed Taiwan as a frontline case. [^9]

The most widely circulated set of numbers from Ethan Tu was counted on this frontline. He said in an interview that after the outbreak of the Russia-Ukraine war, "1 in 10 accounts" on Twitter involved cognitive manipulation. In August 2022, during Pelosi's visit to Taiwan, this proportion was even higher, "1 in 4 accounts" was related to cognitive manipulation. [^10]This "one quarter" is very visual and easy to retell, but when reading it, remember its nature: it appeared in a January 2023 media interview, as Ethan Tu's oral observation, not a publicly peer-reviewed technical report. How the denominator was calculated, where the threshold was set, and how the sample was taken, are all invisible to the outside world. [^10]

The lab also produced a few sets of relatively hard primary data. In the 2024 European Parliament elections, they claimed to have detected 20,041 behaviorally anomalous coordinated accounts, accounting for about 12.58% of the volume of related discussions. [^11]In the same year's Taiwan presidential election, they calculated over 30,000 coordinated account groups, of which two dominant Facebook groups controlled 45.71% of the manipulation volume. [^12]These numbers with decimals look more precise than "1 in 4," but to allow external researchers to replicate and verify the methodology behind them, there is currently no publicly peer-reviewed channel. Academia has also long warned about this type of "coordinated inauthentic behavior" detection; common criticisms are that the judgment criteria "lack objectivity," and healthy disagreements may be wrongly judged as manipulation. [^13]The threat is real, and academia takes this frontline seriously. But laying out the scale and letting detection withstand external testing is precisely the path it still has to walk to grow from "an observation of one lab" into "a public tool everyone trusts."

```tw-stat
1 in 4 | Twitter accounts involved in cognitive manipulation during Pelosi's visit | Oral observation in interview, methodology not public
12.58% | Volume share of coordinated accounts in 2024 European Parliament elections | Lab primary report
45.71% | Manipulation volume of two major Facebook coordinated groups in 2024 Taiwan election | Lab primary report
Source: Taiwan AI Labs, CNA
```

## He Fears Platform Control of Opinion, Yet Built a Ruler to Judge "Manipulation"

Ethan Tu opposes PTT doing content censorship; he stated this position clearly. In a 2024 interview with US public radio (NPR), he said that once content censorship is done too strongly, the system's operators can reverse-control the opinion of the entire society. Taiwan is a democratic society; this matter should be decided by the people themselves. [^14]Placing this sentence together with what he does in the lab, an honest tension emerges: a person so vigilant about "system operators controlling public opinion" has himself built a system that uses undisclosed algorithms to judge who is "manipulating."

This tension does not need others to point it out for him; he has collided with it truthfully all along. In 2022, he publicly supported the highly controversial Digital Intermediary Service Act, which gave the government more power to intervene in online content. PTT users "voted him down" (thumped him), and the draft was ultimately returned by the National Communications Commission (NCC) for reconsideration due to the massive backlash. [^15]A person who said on NPR that "the people should decide" went to support a bill criticized for expanding government censorship power. These two things placed together are uncomfortable. But it also honestly explains one thing: even the most vigilant person about censorship, once standing in the position of defending against disinformation, will be pulled along by the same dilemma.

A closer incident occurred in February 2023. He announced that "208 PTT accounts were coordinating" to hype egg prices. Netizens immediately challenged him to "speak with evidence." He chose to retort with sarcasm but never publicly disclosed how those 208 accounts were determined to be coordinated. [^16]When the judgment algorithm is opaque, the named people can only choose between "believing him" and "voting him down," which is precisely the situation he least wanted PTT to reach in those early days. (A clarification: the hat of "CCP collaborator" netizens put on him was not his original words and should not be taken as a conclusion by any side.)

## To Fight Disinformation, He Fished Up Others' News

If the opacity of the algorithm still stays in the realm of debate, this incident in late 2025 went directly into the investigation procedure. In December 2025, NextApple (NextApple News) alleged that the Miin website and app, launched by "Taiwan Intelligence Holdings Co., Ltd.," "illegally stole over 250 news report contents from NextApple without authorization, reproducing and publishing them擅自" for member reading and discussion. [^17]NextApple's parent company, Longcheng Creative, filed a complaint under Article 91, Paragraph 1 of the Copyright Law. After Ethan Tu and Taiwan Intelligence Holdings's current person in charge, Liao Qun, appeared to explain, they were referred for prosecution under the Copyright Law, with the suspected crime carrying a maximum penalty of 3 years in prison plus a fine. [^17]

Both sides' statements must be put on the table. Ethan Tu and Liao Qun admitted that Miin indeed scrapes news from various media but denied profiting from it. [^17]The report used the word "re-steal," and also mentioned that it was not just NextApple; other media had also sued Ethan Tu and others. Here is a difference worth pointing out neutrally: Miin's external positioning has always been "non-profit, open-source," but the subject standing in the defendant's seat is a for-profit "Taiwan Intelligence Holdings Co., Ltd." The ideal of non-profit and the legal entity of for-profit sit side by side in this very case.

This is not the first time Ethan Tu has entered the gray area of law because of "aggregating others' content." The aforementioned "Reporter Fast Copy" in 2017 also used AI to reprint popular PTT articles as news and was sued by an entertainment company for damaging credit. However, that was another legal dispute; in February 2023, the Taipei District Procuratorate issued a non-prosecution decision due to insufficient evidence. That is a non-prosecution, far from a conviction; the two cannot be confused. [^18]It must also be made clear: the copyright case is still in the investigation and judicial procedure as of the writing of this article, with no final judgment. This article does not conclude on the guilt or innocence of any party.

> **📝 Curator's Note:** Placing this lawsuit back into the belief that runs through the text, you will see it is actually the same impulse colliding with its own two sides. "Information Should Be Free" goes in one direction: "others' news should not be locked behind paywalls and should be aggregated for public comparison"; going in the other direction, it becomes "I reproduced your 250 reports without authorization." The same belief, between "public interest in fighting disinformation" and "infringing on others' property rights," there is no natural boundary. It depends on whether you stand on the side of the data fisher or the one being fished. The whistleblower and the infringer may be two names for the same action in this case, and who names it now is in the hands of the prosecutor and the judge. This is the Taiwan version of the global great war between AI and creators (The New York Times suing OpenAI).

## Noah's Ark, or a Forum That Doesn't Work Well

Back to the migration wave in June 2026. Placing it in the complete context, you will see something more interesting. The caller explained this line completely: about three years ago, the green camp and pro-Taiwan forces wanted to open another community outside of Facebook. One pulled the other to Threads; now Threads has "become the world's number one large family group for Taiwanese." And now, it is Miin's turn to be pushed to the forefront, a "non-profit news and community aggregation platform made by Taiwanese themselves." [^1]From Facebook to Threads to Miin, it is described as the same migration chain, and this is precisely the script played out time and again in the [history of Taiwan's online community migration](/en/technology/taiwan-online-community-migration/).

But in the same wave of heat, the voice that should be heard most is actually the one pouring cold water, and the most accurate criticism precisely pierces Miin's bloodline. Some pointed out that Miin "cannot be pushed out" because it is "forum-style" rather than "feed-style": like PTT and Dcard, each post only shows the title; you must click in to see the content, unlike Facebook, X, or Threads where you can swipe through five posts on one screen. It cannot even like comments or reply under comments; it feels clunky. [^1]Listing Miin alongside PTT inadvertently says one thing: this is indeed something made by the same person, even that forum-style "hard to spread" is inherited.

This is the honest full picture of this migration: the patriotic push is real, the 3,200 likes are real, and the resistance of product experience is also real. So it is currently a wave of discussion, a wave of promotion trend, not yet a completed migration. It now looks more like a safe haven lit up by passion but has not yet finished making itself smooth and easy to use.

> **📝 Curator's Note:** Here is a subtle irony. A platform specializing in detecting "coordinated manipulation" relied this time on a wave of coordinated patriotic promotion: the same group posting synchronously, retweeting each other, and moving together at critical moments. Of course, promoting for one's own people and overseas manipulation are worlds apart in motivation and legitimacy; this comparison does not equate the two; it only reminds us that the signal of "coordination" itself is neutral. What label is attached always depends on who is judging and for what purpose.

## The Same Sentence: Belief, Selling Point, and Defendant Reason

Open the miin.cc official website, and the top line is: "Enjoy daily, speak freely!" [^19]This is Miin's definition of itself in 2026. It has long exceeded the scope of a 2024 news aggregation tool: the official says it lets you "talk about news, share stories, and record daily life unimpeded," uses AI to help you "create a creative experience exclusively for you," and takes you to "see through different stances, coordinated manipulation, and factuality of events." [^19]News side-by-side, coordination detection, community posting, AI creation, voice radio, all squeezed into the same app. And that "speak freely" is truly asking you to make your voice heard.

The four words "speak freely" stitch the whole thing into a closed loop.

It is Ethan Tu's unchanged belief for thirty years. The PTT on that 486 in the dorm in 1995, and Miin in the phone in 2026, are the same impulse landing twice after thirty years: the platform should not decide for you what you can say. It is also Miin's sharpest selling point now. When pro-Taiwan netizens' Facebook accounts are reported in succession, and Meta no longer makes people completely at ease, the promise of "a platform made by Taiwanese, where you can speak safely," just caught that group of people who want to leave a space for themselves. It is simultaneously the reason Miin is sued in court: the same "information should be free" led it to fish over 250 news articles from NextApple into its database, and thus was referred for prosecution under the Copyright Law. The case is still running, no judgment yet.

So next time you swipe past that "let's go, let's go to miin," you can remember: you are not just seeing another digital migration. You are watching a thought complete half its life, growing from a sophomore's ideal of letting information flow freely, into an algorithm that catches disinformation, into a lawsuit without judgment, and into a place a group of people wants to guard for themselves. Where that line between information freedom and copyright should be drawn, and how defending against disinformation does not become new censorship, is a lesson the whole world is still learning. Taiwan happens to be standing in a very front position; someone is truly doing it, and truly arguing seriously for it. Next time someone holds up "for public interest" to fish away something, it is worth our asking together where that line is drawn, whether it is laid out for everyone to see. And the right to lay it out for testing is always in our hands.

## Further Reading

- [Ethan Tu](/en/people/ethan-tu) — Built PTT with a 486 computer, led Cortana at Microsoft, returned to Taiwan for non-profit AI for thirty years
- [Taiwan AI Labs](/en/technology/taiwan-ai-labs) — The non-profit AI institution behind Miin, from TAIDE to cognitive warfare prevention
- [Cognitive Warfare](/en/society/cognitive-warfare-against-taiwan) — Why Taiwan is written by academia as the frontline of this information war
- [History of Taiwan's Online Community Migration](/en/technology/taiwan-online-community-migration) — From BBS, Wretch, to Threads, the story of Taiwanese moving house time and again

## Image Sources

- Cover: Miin Miin official website ([miin.cc](https://miin.cc/)) homepage screenshot, captured in June 2026, used to introduce the editorial purpose of the platform.

## References

[^1]: [Open discussions about miin Miin on Threads](https://www.threads.com/search?q=miin) — Captured on June 15, 2026; includes calls to leave Meta and switch to Miin (approx. 3,200 likes), "The Gen-Y's second digital migration, let's go, let's go to miin," the Facebook→Threads→Miin migration chain narrative, and usability criticisms like "forum-style vs. feed-style" and "unable to like/reply to comments." The cited like count is an approximate value at the time of capture and is still changing.

[^2]: [Ethan Tu — Wikipedia](https://zh.wikipedia.org/zh-tw/杜奕瑾) — Born in Kaohsiung in 1976; in September 1995, as a sophomore in the NTU Department of Computer Science and Information Engineering, he set up PTT in a dormitory with a 486 computer, Linux, and open-source software, codename "ptt," serving as the founding system administrator. The English verbatim text can be seen in [PTT Bulletin Board System — Wikipedia](https://en.wikipedia.org/wiki/PTT_Bulletin_Board_System): "The main site was founded on 9 September 1995 by Yi-Chin Tu (Ethan Tu)... then a sophomore in the Department of Computer Science and Information Engineering at National Taiwan University."

[^3]: [Ethan Tu — Wikipedia](https://zh.wikipedia.org/zh-tw/杜奕瑾) — Went to the US in 2003 to conduct gene sequence research at NIH; joined Microsoft in 2006; in 2012 joined Microsoft's AI department as a Development Manager (Principal Development Manager), participating in Cortana development. Note: The global head of Cortana is another person, Mike Calcagno; Ethan Tu is not this position, do not confuse in writing.

[^4]: [PTT Founder Ethan Tu Returns to Taiwan to Establish AI Lab — Digital Times](https://www.bnext.com.tw/article/44267/founder-of-ptt-ethan-tu-back-to-taiwan-to-establish-an-ai-lab) — Ethan Tu returned to Taiwan in March 2017 to found Taiwan AI Labs, branding it as Asia's first non-profit AI research institution, promoting it in the form of the non-profit "Taiwan AI Development Foundation" (2017).

[^5]: [Miin — Wikipedia](https://zh.wikipedia.org/zh-tw/迷音) — "Miin integrates two previous research projects of Taiwan AI Labs, 'Reporter Fast Copy' and 'Islander Satellite,' led by PTT founder Ethan Tu, and in collaboration with Professor Chen Yun-nong of the Department of Computer Science and Information Engineering, National Taiwan University."

[^6]: [Disinformation and Cognitive Warfare: Ethan Tu on AI and Media Literacy — Taiwan FactCheck Center](https://education.tfc-taiwan.org.tw/education_resources/7861) — Ethan Tu verbatim: "Using AI to judge the truthfulness of news content is a very dangerous thing. Therefore, the research method of 'Taiwan AI Labs' analyzes from the perspective of behavioral dissemination and the pattern of message spread, rather than relying on AI to detect content truth." (2022)

[^7]: [Coordinated Accounts 9-to-5, Attacks Concentrated in Pandemic Press Conference Period — LTN Financial News](https://ec.ltn.com.tw/article/breakingnews/3989765) — "The most intense period of PTT attacks was around 2 p.m.... the start time of the pandemic press conference" "The active time of users with 'coordinated behavior' is 9 a.m. to 5 p.m"; coordinated accounts "as long as the amplifier sends a message, others retweet it" (2022).

[^8]: [Analysis of Cognitive Warfare and Information Manipulation in the Israel-Hamas War — Taiwan AI Labs](https://ailabs.tw/uncategorized/analysis-of-cognitive-warfare-and-information-manipulation-in-the-israel-hamas-war-2023/) — "71,774 dubious user accounts... organized into 9,737 distinct coordinated groups"; the system clusters accounts based on synchronized behavior and active time (2023).

[^9]: [How China's Cognitive Warfare Works — Hung & Hung, Journal of Global Security Studies (Published by Oxford University)](https://academic.oup.com/jogss/article/7/4/ogac016/6647447) — Cognitive warfare defined as "controlling others' mental states and behaviors by manipulating environmental stimuli," using Taiwan as a frontline case (2022).

[^10]: [1 in 4 Accounts Involved in Cognitive Manipulation During Pelosi's Visit to Taiwan — CNA](https://www.cna.com.tw/news/ait/202301200012.aspx) — "Taiwan AI Labs observed that after the outbreak of the Russia-Ukraine war last year, 1 in 10 accounts on Twitter发表了 related comments involved cognitive manipulation; in August last year, during the visit of then-US House Speaker Nancy Pelosi to Taiwan, 1 in 4 accounts was related to cognitive manipulation." This is a January 2023 interview report, not a peer-reviewed technical report; the denominator, judgment threshold, and sample scope are not public (2023).

[^11]: [Taiwan AI Labs Founder Ethan Tu at NATO Summit — Taiwan AI Labs](https://ailabs.tw/news-room/taiwan-ai-labs-founder-ethan-tu-at-nato-summit/) — Detected 20,041 behaviorally anomalous coordinated accounts in the 2024 European Parliament elections, accounting for 12.58% of the volume of related discussions; primary data, methodology not publicly peer-reviewed (2024).

[^12]: [2024 Taiwan Presidential Election Information Manipulation AI Observation Report — Taiwan AI Labs](https://ailabs.tw/uncategorized/2024-taiwan-presidential-election-information-manipulation-ai-observation-report/) — Over 30,000 coordinated account groups in the 2024 Taiwan presidential election, two dominant Facebook groups (#61009/#61019) controlled 45.71% of the manipulation volume; primary data, methodology not publicly peer-reviewed (2024).

[^13]: [On the Reliability of Coordinated Inauthentic Behavior Detection — arXiv](https://arxiv.org/pdf/2105.07454) — "Healthy disagreements may be wrongly flagged as manipulative... creating a chilling effect on free expression"; see also [arXiv:2408.01257](https://arxiv.org/html/2408.01257v1): "the criteria to establish the legitimacy of user behaviors lack objectivity" (2021/2024).

[^14]: [Taiwan deals with lots of misinformation, and it's harder to track down — NPR / KLCC](https://www.klcc.org/npr-world-news/2024-01-11/taiwan-deals-with-lots-of-misinformation-and-its-harder-to-track-down) — Ethan Tu: Once content censorship is too strong, "the system operator can control the opinion of the society," Taiwan is a democratic society "The people should decide" (2024, English interview, translated here).

[^15]: [Ethan Tu Supports Digital Intermediary Service Act, Voted Down by PTT Users — New Talk](https://newtalk.tw/news/view/2022-08-20/804618) — Ethan Tu publicly supporting the Digital Intermediary Service Act triggered strong backlash from PTT users (2022); the draft was returned by NCC due to backlash, see [NCC sends digital intermediary bill back to square one — Taipei Times](https://www.taipeitimes.com/News/taiwan/archives/2022/09/08/2003784968) (2022).

[^16]: [Caught 208 PTT Coordinated Accounts, Netizens Demand Evidence, Ethan Tu Retorts — Liberty Times Net](https://news.ltn.com.tw/news/life/breakingnews/4220960) — Egg price coordination case; netizens "speaking requires evidence," Ethan Tu retorted with sarcasm, did not publicly disclose the methodology for determining coordination; "CCP collaborator" is a hat put on him by netizens, not Ethan's original words (2023).

[^17]: [Miin Miin Suspected of Illegally Stealing Over 250 News Articles from NextApple — NextApple News](https://news.nextapple.com/life/20251219/6FFCB8F55781BC5D3F473E9FA0E9FC0D) — "The 'Miin Miin' website and APP launched by Taiwan Intelligence Holdings Co., Ltd. illegally stole over 250 news report contents from NextApple without authorization, reproducing and publishing them擅自 to provide for its members to read and discuss"; Longcheng Creative filed a complaint under Article 91, Paragraph 1 of the Copyright Law, Ethan Tu and Liao Qun were referred for prosecution, with a maximum penalty of 3 years in prison plus a fine; the two admitted scraping but denied profit, other media also filed lawsuits, see [Yahoo News Repost](https://tw.news.yahoo.com/ai爬蟲再盜-壹蘋-ptt-創世神-杜奕瑾遭法辦-140400731.html). Case status (as of June 2026, multi-source cross-check): Referred for investigation, no new developments found, still under investigation, no prosecution, non-prosecution, or judgment (2025).

[^18]: ["Reporter Fast Copy" AI Reposting of Popular PTT Articles Sued for Damaging Credit, Non-Prosecution — ETtoday](https://www.ettoday.net/news/20230202/2432146.htm) — "Reporter Fast Copy" used AI to turn popular PTT articles into news, sued by an entertainment company for damaging credit, Taipei District Procuratorate issued a non-prosecution decision in February 2023 due to "insufficient evidence"; this is a different legal dispute from the copyright case, and it is a non-prosecution, not a conviction (2023).

[^19]: [Miin Miin Official Website](https://miin.cc/) — Slogan "Enjoy daily, speak freely!"; official description "In Miin, you can talk about news, share stories, and record daily life unimpeded... let AI and generative technology create a creative experience exclusively for you... Miin takes you to see through different stances, coordinated manipulation, and factuality of events, bringing you the most comprehensive and safe information platform" (© 2026 Miin team). Lithuania Oxylabs cooperation memorandum (building Infodemic platform) primary immediate report can be seen in [Radio Taiwan International](https://www.rti.org.tw/news/view/id/2177403), which is August 2023, Oxylabs one; subsequent think tank reports are described as 2024, two companies, this article anchors the 2023 primary fact.
