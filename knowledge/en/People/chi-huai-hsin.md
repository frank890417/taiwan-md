---
title: 'Ed Chi: The Taiwanese Man Who Taught AI to "Think Step-by-Step" by Bringing Cognitive Psychology into Machines'
description: 'Ed Chi is a Research Vice President at Google DeepMind and a co-author of the Chain of Thought paper. This man, raised in Tamsui, turned Piaget''s schema theory into a method for machine reasoning—a breakthrough that cost only about \$5,000 because it was never a problem of computing power.'
date: 2026-06-27
category: 'People'
tags:
  [
    'People',
    'Ed Chi',
    'AI',
    'Google DeepMind',
    'Chain of Thought',
    'Cognitive Psychology',
    'Tamsui',
  ]
subcategory: '科技與企業'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-27
lastHumanReview: false
researchReport: 'reports/research/2026-06/紀懷新.md'
image: '/article-images/people/ed-chi-deepmind-talk-2026.webp'
sporeLinks:
  - id: 152
    platform: 'threads'
    date: '2026-06-27'
    url: 'https://www.threads.com/@taiwandotmd/post/DaFb5aCE6FV'
  - id: 153
    platform: 'x'
    date: '2026-06-27'
    url: 'https://x.com/taiwandotmd/status/2070809073143144717'
relatedDiary: ['2026-06-27-180207-manual']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'People/紀懷新.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:11f4b1d06ffc2776'
sourceBodyHash: 'sha256:a42a37a855f0ab8b'
translatedAt: '2026-11-18T16:56:03.522317+00:00'
---

While the world spends hundreds of millions of dollars on computing power to chase AI, one paper changed the way machines reason for only about \$5,000.

That paper is called "Chain of Thought." What it does sounds almost too simple to be a breakthrough: in the examples given to the AI, it includes a few extra lines of "problem-solving processes," guiding the model to think through intermediate steps before providing an answer—much like asking a student to write a draft rather than jumping straight to a conclusion. Among its nine co-authors is a Taiwanese man born in Tamsui named Ed Chi (紀懷新).

He later explained that \$5,000 investment this way: "The problem wasn't something that could be solved with computing power; rather, it was a different mode of thinking."[^1]

> **30-Second Overview:** Ed H. Chi is a Research Vice President at Google DeepMind and one of the co-authors of the Chain of Thought paper that taught AI to "think step-by-step." Every time you ask ChatGPT or Gemini to "think step-by-step" and it gives a better answer, remember that the idea behind making machines reason in stages has a thread stretching back to Taiwan. Around age 15, he immigrated to the United States with his mother, who was pursuing her PhD. While helping her write papers on educational psychology, he learned a psychological concept about "how humans learn." Thirty years later, he brought that concept into machines. Taiwan recognizes him as a "shining star" of the chip industry, yet almost no one knows the man who shaped how AI thinks.

## His Mother's Doctoral Thesis

The story doesn't start at Google; it starts at a desk.

Ed Chi grew up in Tamsui. "I am a native of Taiwan, born in Tamsui, and then around age 15, I went to the United States with my parents because my mother was going to pursue her PhD at that time."[^2] This sentence contains an unusual image: while most Taiwanese children studying abroad back then were "little international students" traveling alone, his entire family moved West so his mother could study. A Taiwanese family immigrating to the U.S. for a mother's education was quite rare in that era.

![Sunset over the Tamsui Youchekou wooden boardwalk, where Ed Chi was born and raised](/article-images/people/tamsui-sunset-boardwalk-2024.webp)

_Tamsui, the place where Ed Chi was born and raised. Over thirty years later, what he took from here would become a method for teaching machines to think._

His mother was pursuing a PhD in educational psychology. During his high school and college years, he helped her write her thesis. As a student helping his mother organize an academic paper exploring "how humans learn," he encountered the Swiss psychologist Piaget's _schema theory_ for the first time.

Schema theory posits that the human brain has organized structures of knowledge called "schemas," which we use to understand the world. When learning something new, we either fit new information into existing schemas (called _assimilation_) or, if the old schema cannot hold it, we are forced to rewrite or create a new one (called _accommodation_). It sounds abstract, but it answers a fundamental question: how does a person go from "not knowing" to "knowing"?

The concepts on that desk would become a method for teaching machine reasoning thirty years later. But before that, he had to walk a long road—one that very few people were traveling.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/51woDEK5NME" title="VK Tech Reading Time EP122 ft. Ed Chi" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_In VK Tech Reading Time EP122, Ed Chi personally recounts the origins of Chain of Thought, from helping his mother with her educational psychology PhD thesis and learning Piaget's schema theory, to how he turned it into a method for teaching AI reasoning. This interview is the soul of this article._

## From Tamsui to Minnesota: Following a PhD Admission Letter

Once in Minnesota, he completed his high school, undergraduate, master's, and doctoral studies all at the same institution: the University of Minnesota—six and a half years and three degrees[^3]. He graduated with highest honors (_Summa Cum Laude_), and his doctoral thesis focused on information visualization, titled "A Framework for Information Visualization Spreadsheets." His advisor, John T. Riedl, was a pioneer in recommendation systems.

![University of Minnesota campus, where Ed Chi completed his bachelor's, master's, and doctoral degrees](/article-images/people/umn-the-knoll-minneapolis.webp)

_Moving to Minnesota with his mother at fifteen, he later completed three degrees at the University of Minnesota in six and a half years. His advisor, John T. Riedl, was a pioneer in recommendation systems research: this thread would later connect back to his work at Google._

But more memorable than the degrees is how he defined himself.

He once said something very honest in an interview: "In English, I'd say I'm a generalist... the kind of researcher who is a 'jack of all trades but master of none.' But when I realized my math wasn't better than everyone else's, I felt that perhaps I could do research that was more about bridging—a bridge between one field and another."[^4]

In academia, this is a choice with a cost. He has noted that when you do bridging research, "you aren't truly a person in Field A, nor are you a true researcher in Field B." Someone who only understands one side is given a clear place in the world; someone standing in the middle often finds no home on either side. But he bet on this middle ground. History has since proven that the most critical steps in AI happened precisely in these interstitial spaces.

> **✦** "Perhaps I could do some research that was more about bridging—a bridge between one field and another."

## In Palo Alto, He Learned to Turn Psychology into Code

In 1997, he landed a legendary internship: Xerox PARC in Palo Alto.

The name might be unfamiliar to Taiwanese readers, but you use things they invented every day. The mouse, the Graphical User Interface (GUI), laser printers, Ethernet—many of the technologies that laid the foundation for the personal computer era were born at this research center located next to Stanford University. Steve Jobs famously visited to study their GUI and used those ideas to create the Macintosh. When Ed Chi arrived, PARC was entering its second golden age.

![The Xerox Alto computer (1973) at PARC, a pioneer of personal computing and GUIs](/article-images/people/xerox-alto-1973.webp)

_The Alto, developed by Xerox PARC in 1973, was a pioneer of the personal computer and GUI. It was here that Ed Chi learned to turn cognitive psychology into executable programs._

The key wasn't just the flashy technology he worked on, but the people he met. "My boss at the time was Stuart Card, who was a student of Allen Newell."[^5] This lineage traces back to a Nobel laureate in Economics: Herbert Simon.

Simon proposed "bounded rationality": that human decision-making is limited by cognition, information, and time, making "perfect rationality" impossible. He also coined the term "satisficing": humans don't seek the optimal solution, but rather one that is "good enough." Together with Newell, Simon analogized the human brain to an information-processing machine, viewing "problem-solving" as a step-by-step search for answers within a problem space. Card brought this mindset to Palo Alto, and Ed Chi picked it up from Card.

> 📝 **Curator's Note**
> The standard AI narrative goes like this: machines are getting smarter because chips are faster, data is more abundant, and models are larger. This narrative is convenient, but it misses a darker thread. As early as the 1950s, Simon was asking "how the human brain makes decisions under constraints"; in 1974, Card brought psychology into Palo Alto's computer research; Ed Chi took the baton in the 1990s, turning foraging theory into models for how people find information online. For half a century, a group of people has been asking the same question: how does a human actually think? While the mainstream was busy making machines calculate faster, they were busy making machines think more like humans. Chain of Thought is the fruit of this hidden lineage.

His primary research in Palo Alto was "information foraging." The concept is that searching for information online is similar to animals foraging in the wild—following "scents"; if the scent is strong, you follow it; if it's weak, you abandon it. He engineered these biological and psychological foraging models into functional systems to predict how people navigate between websites. This was his first real-world application of "bridging": one side was cognitive psychology, the other was information science, and he built a bridge between them.

```tw-timeline
1955 | Simon coins terms | Herbert Simon proposes "satisficing" and bounded rationality, viewing the brain as an info-processor
1974 | Psychology enters the lab | Stuart Card brings the Newell-Simon tradition to Xerox PARC
1997 | Ed Chi takes the baton | Interns at PARC, engineering foraging theory into information foraging models
2022 | Bringing it to machines | Chain of Thought paper published; Piaget's "step-by-step reasoning" becomes a method for AI
Source: Wikipedia biographies of scholars, arXiv 2201.11903
```

## Not More Data, But More Human

In 2011, he left Palo Alto for Google. His reason was practical: "Doing research alone isn't enough; you also have to do applied work." He had seen the Xerox model of "doing deep fundamental research but failing to turn it into products."

At Google, he first worked on web data analysis. From 2015 to 2017, he led a team to rebuild YouTube's neural network recommendation system. In 2017, he became a Chief Scientist at Google Brain, leading a team of seventy. By 2021, he was promoted to Distinguished Scientist, leading one hundred and twenty people, before eventually becoming a Research Vice President at DeepMind[^6]. Behind this series of titles lies the extension of a single methodological gene: information foraging is a model of "how humans find things," recommendation systems are a model of "what humans want to see," and with Chain of Thought, it became a model of "how humans reason." Moving from human cognition all the way to machines.

The turning point for Chain of Thought came from his dissatisfaction with mainstream machine learning at the time. "Why does it require so much data for this machine to truly learn?" He began to wonder, "Can we use methods from cognitive psychology to teach machines how to learn?"[^7]

So he returned to that original concept. "This idea actually comes from... an idea from the 60s and 70s called schema theory. It basically means that if a person can use a template to solve a problem, maybe we can also use this method to teach machines to learn. So Chain of Thought is actually just starting from this idea." When the interviewer asked if it was Piaget's schema, he replied: "Yes, it's Piaget's schema idea. That thing I actually learned during high school and college while helping my mother write her PhD thesis in educational psychology, so eventually these things slowly tied together."[^8]

The seed on that desk had sprouted.

![Chain of Thought paper Figure 1: Left shows standard prompting resulting in an error; right shows Chain of Thought prompting with reasoning steps (highlighted in blue) leading to the correct answer](/article-images/people/chain-of-thought-figure1.webp)

_The most famous figure in the Chain of Thought paper: on the left, a standard prompt leads to a wrong answer; on the right, by simply adding a reasoning process (the blue section) to the example, the model answers correctly. The difference isn't computing power, but whether the "thoughts are written out step-by-step." Figure from Wei et al., 2022._

And it cost almost nothing. "Do you know how much total computing power we used? It was about five thousand US dollars worth of compute. Because that problem wasn't something that could be solved with computing power; rather, it was a different mode of thinking. When we were doing that research, at the beginning, we basically had no funding; it was just something we came up with ourselves."[^1]

```tw-versus
Mainstream AI Path | The Chain of Thought Path
Larger models, more parameters | No need to retrain models
Feeding more data | Adding a few lines of reasoning to examples
Hundreds of millions in compute arms race | Approximately \$5,000
Brute force scaling | Borrowing cognitive psychology on how humans learn
Source: Ed Chi VK EP122 interview (Chain of Thought paper used ~\$5,000 compute, using cognitive psychology to teach machines) and research history reports[^1][^6][^7]
```

This is the core message of this article: the key to letting AI reason is not more computing power, but being more human—and this "human-likeness" grew from an educational psychology PhD thesis written by a boy from Tamsui for his mother.

## What He Told His Subordinates: Don't Use That Method, Try Schemas

We must be honest here.

There are nine authors on the Chain of Thought paper; Ed Chi is ranked seventh. The first author is Jason Wei, the primary executor; the last author, and thus the senior lead by academic convention, is Denny Zhou, the founder of the Google Brain reasoning research team. To say this paper was "invented by Ed Chi" is inaccurate; Denny Zhou was the leader of this research direction, and Denny Zhou is a researcher on Ed Chi's team—his direct subordinate.

So what was his role? As he put it: "Denny Zhou is a researcher in my team. After joining, he came to me saying he wanted to do reasoning research... He was originally using more traditional neural-symbolic methods, and I told him I didn't think neural-symbolic seemed to work well, so should we consider other methods? Then we slowly discussed it and found that perhaps we could use the concept of schemas."[^9]

This statement defines his true contribution. He wasn't the primary executor of the paper, but he was the person at the critical crossroads who said, "Don't go that way." He rejected the neural-symbolic direction, which seemed logical at the time, and pushed the discussion toward schemas. More importantly, he could think of schemas because he brought thirty years of cognitive science perspective to the team. In other words, he was the person who made it _possible_ for Denny Zhou to think of schemas.

> 📝 **Curator's Note**
> The most common flaw in "Taiwanese Pride" narratives is compressing a complex contribution into a single sentence like "He invented X." But reality is often more interesting. Ed Chi's true, irreplaceable value is a twenty-year arc: he has been moving cognitive psychology into machines bit by bit—from information foraging to recommendation systems, and finally to Chain of Thought. Papers have nine authors, rankings, and credit disputes; but the act of "consistently bringing the question of how humans think into engineering sites for twenty years" is something only he has done within the entire team. To see his value, one must look at a twenty-year scale, not just an author list.

He explained the aftermath of Chain of Thought using a deeper framework. When AI doesn't just solve problems by template but also "reflects" on its own logic and goes back to correct itself, he says: "In Piaget's cognitive science, or in learning science, this would be called assimilation and accommodation... true machine learning like this seems to have truly begun."[^10] Solving by template is assimilation; rewriting the template is accommodation. He took the pair of concepts he learned while helping his mother write her thesis and applied them verbatim to describe machine learning.

He also linked Chain of Thought to another psychologist's framework: "Chain of Thought, plus fine-tuning, plus next-token prediction, seems to be the beginning of reasoning machines—what is known as System 2 thinking, as described by Kahneman."[^11] System 1 is intuitive, fast, and effortless thinking (seeing a microphone and knowing it's a microphone); System 2 is effortful, rational, and step-by-step thinking (the brain working when asked "what is the definition of AGI"). In his view, past deep learning has made System 1 very profound, while Chain of Thought is the starting point for machines to perform System 2.

## Reasoning Machines and "Grandma's Standard"

So when will AI truly "arrive"? Ed Chi's answer isn't in any technical metric; it's in grandmas.

"The day your grandma scolds your home robot, saying 'I've already taught you once, why don't you know how yet?', that's when you'll know AGI has arrived... our benchmark lives in grandmas."[^12]

This statement is sharper than it sounds. Today, when a robot vacuum gets tangled in wires or hits furniture, we might think it's stupid, but we don't get truly angry at it because deep down we feel "machines are naturally stupider than me; it's normal to have to teach them several times." But if one day, a grandma scolds a robot the way she would a person who refuses to learn, it means she has mentally categorized it as an entity that _should_ know something after being taught once. The arrival of AGI is less about a benchmark score crossing a line and more about human expectations quietly shifting.

This also connects back to his view on Artificial General Intelligence (AGI). He believes two things must happen for AGI to be valid: first, AI cannot only exist in a virtual world; it must be able to integrate into humans' real living environments; second, "I teach you once, and you know it from then on"—the ability to apply knowledge to new situations and explore independently, rather than requiring repetitive instruction. The Project Astra he is currently leading addresses the first point: a general assistant that can perceive your context.

He shared a personal experience. About a year ago, he brought the still-confidential Project Astra to a conference in Barcelona. In a rooftop bar of a hotel, he scanned the city skyline with his phone and asked, "Where am I?" It replied, "It looks like you are in Barcelona." He followed up by asking which district, and it named the correct one. He then asked if there were good restaurants nearby, "preferably Michelin-starred," and it answered. "I said, 'Can you help me make a reservation?' and it said, 'Not right now, but maybe in the future.'" At that moment, he realized that this kind of personal assistant—one that truly stays by your side and understands your situation—could be built within his lifetime.[^13]

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/3rQ4jPvvY0c" title="Sidechat E350 ft. Ed Chi" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_In Sidechat E350, Ed Chi discusses smart glasses, the "Grandma Standard" for AGI, and opportunities for Taiwan. During the interview, he pulls out a Project Astra prototype glass, saying it should be Taiwan's first._

During the interview, he pulled a Project Astra smart glasses prototype from his pocket, saying it "should be" Taiwan's first. He discussed where Taiwan has the greatest opportunity. Hardware is one part: "Taiwan's position in semiconductors, especially manufacturing, is very difficult to shake." But he pivoted: "If Taiwan can integrate hardware and software well, utilizing the capabilities of Large Language Models, there is indeed a huge opportunity."[^14]

## Taiwan Recognizes Chips, but Not This Brain

At this point, an unavoidable question arises: does he count as Taiwanese?

The facts are clear: he left Taiwan around age 15, completed his high school, undergraduate, and graduate studies in the U.S., and has spent his entire career in Silicon Valley. He is Taiwanese American—someone born in Taiwan who grew up and succeeded in America. If someone argues that the "shining star of Taiwan" label is merely consuming the image of someone who emigrated long ago, that criticism is not without merit.

But there is weight on the other side of the scale as well. He conducts interviews in Chinese and proactively describes himself as "born in Tamsui, a native of Taiwan," without evasion. He continues to return to Taiwan to give lectures—at NTNU, Chung Hsing, and NYCU. He has specific observations regarding Taiwan's long-term care challenges, its semiconductor status, and its AI startup ecosystem; he even noted that approximately 15,000 users in Taiwan are already using DeepMind's protein structure prediction tool.

The best illustration of his "insider-outsider" position is something he said to Taiwanese researchers: "Regarding this part of research, I have actually come back to Taiwan many times over the years and mentioned it every time, but I haven't seen Taiwanese researchers... doing much in this area. This is research that doesn't require many chips."[^15]

There is a tension between two identities in that sentence. By saying "come back to Taiwan," he speaks as someone who considers himself part of the place; but by saying "I've mentioned it every time, yet no one does it," there is a sense of distance—like someone who has been away from home for a long time, returning to see a corner of the house that has remained untended, feeling urgent but unable to exert influence. Whether he counts as a "shining star of Taiwan" is not for this article to conclude. The facts are here; you decide.

> 📊 **Him in Numbers**

```tw-stat
~ \$5,000 | Compute used for Chain of Thought paper | Compared to industry's hundreds of millions
~ 114,000 | Total Google Scholar citations | 82% are from after 2021
13% → 83% | OpenAI o1 accuracy on Math Olympiad problems | o1 is explicitly built on Chain of Thought
Source: Ed Chi VK EP122 interview, Google Scholar citation stats, OpenAI o1 System Card (arXiv 2412.16720)
```

_Source: Ed Chi VK EP122 interview, Google Scholar, OpenAI o1 System Card (arXiv 2412.16720)_

## Showing Reasoning: More Transparent or Just Better at Making Excuses?

Chain of Thought allows AI to "show" its reasoning process. On the surface, this makes machines more transparent—you can see how they think. But there is a concern that an honest person should present alongside this.

> ⚠️ **Controversial Viewpoint**
> Chain of Thought lays out the "thinking process" before you, making it look more credible and trustworthy. However, academia has raised doubts: the string of reasoning a model shows may not truly reflect its internal decision-making process (this is known in research as the "faithfulness" problem of reasoning chains). In other words, it might arrive at an answer first and then construct a beautiful explanation to show you—being better at making sense does not equal being more honest. Simultaneously, in March 2026, a jury in Los Angeles ruled in a social media addiction case that platforms like YouTube bear responsibility for adolescent addiction, with Google assigned roughly 30% of the liability. Ed Chi earned his status as an ACM Fellow largely due to achievements like the YouTube recommendation system, yet he has almost never publicly discussed the potential harms algorithms can cause. For someone who makes machines "better at reasoning," he remains silent on whether "making machines better at making sense will actually make accountability harder." Pointing this out is not intended to attack anyone; it is simply to say that while we take pride in a Taiwanese man standing at the AI forefront, we should also keep these issues in our field of vision.

There is no clean answer to this contradiction, nor should there be. A technology that makes AI more human will simultaneously amplify both the best and most troublesome human traits—humans can reason, but humans also make excuses for their decisions. Seeing both sides is the only way to treat this matter seriously.

## And Then What?

Ed Chi has observed an eight-year cycle: 1991 the Internet, 1999 the birth of Google, 2007 the iPhone, 2015 the maturity of deep learning, and 2023 Gemini and ChatGPT. Following this rhythm, the next turning point falls around 2031. He says that by then, "no one will be surprised that you are using large models to get things done"—just as no one is surprised today that you use a smartphone.

The direction he is betting on now is letting AI step out of the screen and into the real world: Project Astra, which can perceive your context, and robots that can perform household chores. What moves him most is Taiwan's long-term care situation. "Will there be truly affordable robots that can help with housework?"—laundry, cooking, turning patients over in bed, delivering medicine on time. When a society faces labor shortages, nursing shortages, and hospital bed shortages, these things that sound like science fiction are actually very practical hopes.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/nXVvvRhiGjI" title="Google Project Astra" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Google's official vision video for Project Astra. This is the direction Ed Chi is currently leading: a general assistant that can exist in the same environment as you and understand your situation._

Back to that desk.

A child from Tamsui, around age 15, followed his mother to Minnesota. While helping her write an educational psychology PhD thesis, he learned "how humans learn." Thirty years later, he turned that human concept into a method for teaching machines to think. One day, when your grandma says to the home robot, "I've already taught you once, why don't you know how yet?"—the reason that machine can reason step-by-step, reflect, and apply knowledge to new situations is because of a long thread. At one end of the thread is a Silicon Valley lab; at the other end is Tamsui.

## Image Sources

- Ed Chi speaking photo (hero): [GQ Taiwan "GQ Interview" Ed Chi](https://www.gq.com.tw/article/gq%E5%B0%88%E8%A8%AA-%E7%B4%80%E6%87%B7%E6%96%B0-ed-chi-2026) — fair use editorial commentary
- [Junyu-K / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:20241130_淡水油車口木棧道的夕景.jpg) — CC BY-SA 4.0 (Tamsui Youchekou wooden boardwalk sunset)
- [SavagePanda845 (Elliot F) / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:UMN-TheKnoll.jpg) — CC BY-SA 4.0 (University of Minnesota campus)
- [The wub / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Xerox_Alto_I,_1973,_Computer_History_Museum.jpg) — CC BY-SA 4.0 (Xerox Alto computer)
- Chain of Thought paper Figure 1: [Wei et al. 2022, arXiv:2201.11903](https://arxiv.org/abs/2201.11903) — fair use academic

## Further Reading

- [Jensen Huang](/en/people/jensen-huang)—The "shining star" of Taiwan on the hardware side, making AI run faster
- [Morris Chang](/en/people/tsmc-morris-chang)—The founder of Taiwan's semiconductor industry, the "unshakeable mountain" mentioned by Ed Chi
- [AI Industry](/en/technology/artificial-intelligence-industry)—Taiwan's position in the global AI supply chain
- [Taiwan's AI Development and Future Strategy](/en/technology/artificial-intelligence-development-strategy)—The overall landscape of Taiwan's AI
- [Daily AI in Taiwan](/en/technology/taiwan-ai-in-daily-life)—How AI has entered the lives of Taiwanese people

## References

[^1]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — Interview on VK's official channel with Ed Chi. At approximately 52 minutes, he personally explains that the Chain of Thought paper used only about \$5,000 in compute, serving as powerful evidence for "anti-compute arms race" thinking.

[^2]: [Sidechat E350 (ft. Ed Chi)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — Official interview from INSIDE's tech podcast; during the introduction, Ed Chi describes being born in Tamsui and moving to the U.S. with his mother around age 15.

[^3]: [Ed H. Chi Resume](https://www.edchi.net/resume) — Personal official website resume of Ed Chi, recording his B.S. (1992–1994), M.S. (1994–1996), and Ph.D. (1996–1999) in Computer Science from the University of Minnesota, graduating with highest honors under advisor John T. Riedl.

[^4]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — At approximately 56 minutes, Ed Chi describes his psychological journey of moving toward "bridging" research because his math skills were not as strong as his peers; a key confession for understanding his research style.

[^5]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — At approximately 5 minutes, Ed Chi explains the lineage at PARC, noting his boss Stuart Card was a student of Allen Newell. Proper names corrected to academic sources ([Stuart Card Wikipedia](https://en.wikipedia.org/wiki/Stuart_Card)).

[^6]: [Ed H. Chi | Google Research](https://research.google/people/edchi/) — Official Google Research personal page, recording his career trajectory and research areas at Google; for career details, see his resume at [edchi.net/resume](https://www.edchi.net/resume).

[^7]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — At approximately 9 minutes, Ed Chi explains his dissatisfaction with "why machines need so much data to learn," which was the starting point for Chain of Thought.

[^8]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — From approximately 9 to 10 minutes, the core firsthand account of the origins of Chain of Thought: schema theory, Piaget, and the personal connection to helping his mother with her educational psychology PhD thesis. The soul of this article.

[^9]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — At approximately 57 minutes, Ed Chi describes the key process of rejecting Denny Zhou's neural-symbolic method in favor of schemas; a firsthand basis for determining his role in the contribution. See author order in [arXiv 2201.11903](https://arxiv.org/abs/2201.11903).

[^10]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — At approximately 15 minutes, Ed Chi uses Piaget's assimilation and accommodation framework to describe the evolution from Chain of Thought to reflective reasoning, demonstrating his approach of bringing educational psychology language directly into AI.

[^11]: [VK Tech Reading Time EP122: AI Evolution, AGI Prototypes, and Lots of Psychology (ft. Ed Chi)](https://www.youtube.com/watch?v=51woDEK5NME) — At approximately 17 minutes, Ed Chi links Chain of Thought to Kahneman's System 1/System 2 thinking framework from _Thinking, Fast and Slow_.

[^12]: [Sidechat E350 (ft. Ed Chi)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — During the introduction and at approximately 60 minutes, Ed Chi proposes the "Grandma Standard" for AGI: when a grandma scolds a robot like a person ("I've taught you once, why don't you know it yet?"), AGI has arrived.

[^13]: [Sidechat E350 (ft. Ed Chi)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — At approximately 30 minutes, Ed Chi recounts taking the confidential Project Astra to Barcelona and scanning the city skyline at a hotel rooftop bar, where it correctly identified the city and district.

[^14]: [Sidechat E350 (ft. Ed Chi)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — At approximately 40 minutes, Ed Chi comments on Taiwan's "unshakeable" position in semiconductor manufacturing and the "huge opportunity" for hardware-software integration.

[^15]: [Sidechat E350 (ft. Ed Chi)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — At approximately 52 minutes, Ed Chi addresses Taiwanese researchers: this type of research "doesn't require many chips," yet despite him mentioning it every time he returns to Taiwan, he hasn't seen much involvement from local researchers. This segment best illustrates his outsider-insider identity tension.
