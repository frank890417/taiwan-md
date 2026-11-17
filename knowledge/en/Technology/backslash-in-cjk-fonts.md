---
title: 'The Backslash in "Gong": Two Layers of Default Tax Paid by Taiwanese Engineers Daily'
description: 'On Windows 11 using zh-TW locale, the translation status script dumped over four thousand paths into `root`, making Technology zero, while Linux CI was green that week. The script uses forward slashes for directory names and backslashes for disks, failing to separate them. An older layer is embedded in the characters: the second byte of Big5''s "gong" is the ASCII backslash, which developers jokingly call *Xu Gong Gai*. How paths are written and what symbols live inside characters—none of this was accounted for by default on this machine. Git''s `quotePath` is another line with a different cause.'
date: 2026-08-13
category: 'Technology'
tags:
  [
    'open-source',
    'Windows',
    'Big5',
    'UTF-8',
    'character encoding',
    'Traditional Chinese',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: 'The large character "gong" shows its Big5 codes A5 and 5C, where the 5C slot points to the ASCII backslash (0x5C); below is Python''s actual output showing that the second byte of *Xu Gong Gai* are all backslashes.'
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369eef'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-11-06T15:53:30.443405+00:00'
---

> **30-Second Overview:** I ran the translation status script, and the screen showed 4546 paths, all in `root`. The Linux CI on GitHub was green. Only later did I see two things. Windows path backslashes couldn't be separated by the script using forward slashes. The latter half of "gong"'s Big5 code is itself the ASCII `\`. These two mechanisms are different but often appear together on a Traditional Chinese Windows machine.

I was maintaining the translation status script for Taiwan.md on Windows 11 with the zh-TW locale. That evening, I ran `i18n-status.py` as usual, waiting for the terminal to print numbers. The main console was cp950. There were no red characters in the output.

The screen stopped at 4546. All of them were in a category called `root`. Technology was 0.

Later that week, after pushing to GitHub, the CI on Linux was green.

The script variable was named `zh_articles`, scanning paths under `knowledge` excluding English, about, and underscore directories; Japanese, Korean, and Arabic files were also counted. That evening, it couldn't even separate the category names, stuffing over four thousand paths into a single slot. No exceptions, no warnings. The statistics looked like the entire site was broken, with not a single file missing.[^8]

The disk path was `knowledge\Technology\some_article.md`, using backslashes to separate directories. The script used `split('/')` to get the category name. This line worked on Linux because the paths were originally forward-slash separated. On Windows, it couldn't split the backslash, and the entire path returned as is; the article was dumped into the default `root`.[^1]

After changing to let `pathlib` handle directories, there were 59 articles under Technology, matching the contents of the folder. The only assumption in between was: what kind of line your machine uses to separate folders.

![Actual Python terminal output: A single Windows path split by '/' returns a list with only one element; when passed to PureWindowsPath(p).parts, it splits into three segments: knowledge, Technology, and filename](/article-images/technology/windows-path-split-vs-pathlib.svg)

_Two ways to split the same path. `split('/')` finds no slash and returns the whole thing as is; `PureWindowsPath` recognizes the backslash and manages to return Technology._ Taiwan.md Contributors, CC BY-SA 4.0.

> **📝 Curator's Note:** The script syntax was not wrong, and CI did run tests. The fracture lies between "the machine the author actually sits at" and "the machine the tool assumes you are sitting at." This seam belongs to no process, so no one is responsible for monitoring it.

## The Line Inside "Gong"

The path was the first layer. The second layer is much older, embedded in the characters.

Big5 was finalized in 1984; a Chinese character uses two bytes. If the second byte falls between `0x40` and `0x7E`, it overlaps with common ASCII symbols: `[` , `]` , `{` , `}` , `\` , `|`. Associate Professor Hong Chao-chi (who retired from the Department of Information Management at Chaoyang University of Technology in August 2023) wrote on his teaching page: "Because 40-7E is the ASCII code range for general common characters, it sometimes causes some trouble for programmers."[^2]

The code for "gong" is `A5 5C`. The latter part, `0x5C`, is the backslash `\` in ASCII. A program that scans a string byte-by-byte and treats `\` as an escape or separator will see the latter half of "gong" and think it encountered a path. If a filename contains "gong," or if the path contains "gong," they can both stumble here.

The developer communities in Taiwan and Hong Kong call this _Xu Gong Gai_: "Xu" is `B3 5C`, "gong" is `A5 5C`, and "gai" is `BB 5C`; three common characters written consecutively resemble a person's name.[^5] Hong Chao-chi also listed "Ja Ye Cheng Zhen Gong," where the second bytes collide with `[` , `]` , `{` , `}` , `\`, and created a scanning tool called `b5tm`.[^2] A bug was named after a person, usually because it occurred frequently enough that a generation had to point at it.

In 2015, the author of the blog "Dark Thread" switched to Visual Studio 2015. The old `.cs` files were still saved in BIG5. After the compiler switched to Roslyn, _Xu Gong Gai_ in the files caused compilation errors.

Two days later, a colleague told him that they had also been stuck for a long time and eventually traced it back to his article. A netizen with thousands of files said, "I just had to say goodbye to VS2015." He then wrote a small tool to batch convert to UTF-8 because he couldn't manually save them all.[^7]

This is not the same as `split('/')` mentioned earlier. One is about what modern tools assume a path looks like. The other is about symbols living inside characters after double-byte encoding was chosen forty years ago. The mechanisms are different, but the bill often comes on the same cp950 machine. How input is sent to the computer from the input side can be seen in [East Asian Input Methods](/en/technology/east-asian-input-methods/). Here, we discuss what happens after the character is already on disk and whether the toolchain still recognizes it.

## Default Values Did Not Fork a Branch for This Machine

Git defaults `core.quotePath`. Filenames with bytes greater than `0x80` are printed by `git status` as octal escapes like `\344\270\255`. The Chinese filename is still there; you just don't understand what your repository is saying every day.[^3] It escapes the high-order bytes of UTF-8. Big5's `0x5C` is another line. They look like backslashes, but their causes are different.

![Actual terminal output: git status --short prints the Chinese filename in quoted octal escape sequences; with -c core.quotePath=false added, the same filename is printed in Chinese](/article-images/technology/git-quotepath-octal-cjk.svg)

_The same file has a sequence of `\345\212\237` under its default value. The backslash here is an escape added by Git and has nothing to do with the `0x5C` inside the "gong" character._ Taiwan.md Contributors, CC BY-SA 4.0.

If Python 3 on Windows uses `open()` without specifying `encoding='utf-8'`, it might inherit the system locale. A UTF-8 file read by Linux might be corrupted when decoded with cp950 on this machine; punctuation or bopomofo characters break.[^4] I experienced this once: using PowerShell 5.1's `Get-Content | Set-Content` to convert a UTF-8 file, where long hyphens turned into `??` in diffs. That was also a default tax, not the second topic.

When status messages include emojis, this cp950 console crashes directly. The character set does not contain those symbols; Python cannot print them, and the exception explodes at the highest level. Linux CI cannot detect this because it is not running on this machine.

Git, Python, and the example path `$HOME/project/src` in CI did not create a separate branch for zh-TW Windows.

In 2015, Hong Chao-chi was interviewed by iThome about what format government files should be opened in and how long they remain viable. The report paraphrased his meaning: if the government only uses Microsoft products to open files, it is equivalent to believing that Microsoft's lifespan will be longer than the Republic of China's.[^6] That sentence was about file formats and preservation lifespan. When data is tied to a certain default toolset, over time, it becomes a matter of who can still read it. Open-source collaboration is bound by the default environment of a certain machine. The tug-of-war between citizen technology and government file formats is seen in [Open Source Community and g0v](/en/technology/open-source-and-g0v/). The culture of absorbing this gap for a long time by Taiwanese developers is seen in [Taiwan Open Source Spirit](/en/technology/taiwan-open-source-spirit/).

The path separator, the terminal encoding, and `$HOME` in CI examples did not create a side branch for this machine. On the day 4546 paths were categorized as errors, no line of code reported an error. The statistics looked normal until you sat in front of this machine.

## Further Reading

- [Taiwan Open Source Spirit](/en/technology/taiwan-open-source-spirit): The culture and context of Taiwanese developers participating in open source.
- [East Asian Input Methods](/en/technology/east-asian-input-methods): How characters are typed into a computer, from character codes to the keyboard.
- [Open Source Community and g0v](/en/technology/open-source-and-g0v): Collaboration between open data and government formats.

## Image Sources

- **Big5 Code of "Gong" and Backslash (hero)**: Diagram created by Taiwan.md Contributors, CC BY-SA 4.0, stored at `public/article-images/technology/big5-gong-5c-backslash.webp`. The line below is the actual output of Python 3 executing `'許功蓋'.encode('big5')`, consistent with the Wikipedia Big5 entry.[^5]
- **split('/') vs PureWindowsPath**: Created by Taiwan.md Contributors, CC BY-SA 4.0, stored at `public/article-images/technology/windows-path-split-vs-pathlib.svg`. The content is the actual result of Python 3 execution; `PureWindowsPath` splits paths according to Windows rules on any operating system, so it can be reproduced without a Windows machine.
- **Git core.quotePath Octal Output**: Created by Taiwan.md Contributors, CC BY-SA 4.0, stored at `public/article-images/technology/git-quotepath-octal-cjk.svg`. The content is the actual output of `git status --short` after adding this article's filename to a temporary repo; this behavior is independent of the operating system.

## References

[^1]: [Microsoft Learn: File Path Format on Windows Systems](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — .NET documentation states that traditional DOS paths use backslashes as directory separators, and forward slashes are converted to backslashes.

[^2]: [Hong Chao-chi: Big5 Code Issues in Programming](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — The teaching page lists common characters whose second bytes fall into the ASCII danger zone (Ja Ye Cheng Zhen Gong) and introduces the scanning tool b5tm. No title was listed at the end of the page. He was a vice-professor at iThome in 2015. His personal homepage states he worked at Chaoyang Information Management from 1997 to 2023 and retired in August 2023.

[^3]: [git-config: core.quotePath](https://git-scm.com/docs/git-config) — Official documentation states that paths with bytes greater than 0x80 are displayed as octal escape sequences.

[^4]: [Python 3: open()](https://docs.python.org/3/library/functions.html#open) — The function description notes that if encoding is not specified, the system locale may be used as the default encoding.

[^5]: [Wikipedia: Big5](https://zh.wikipedia.org/zh-tw/大五碼) — Lists "gong" as 0xA55C, "xu" as 0xB35C, and "gai" as 0xBB5C, and explains that this issue is jokingly called _Xu Gong Gai_.

[^6]: [iThome: Interview with Hong Chao-chi](https://www.ithome.com.tw/news/93606) — A 2015 interview, where he was referred to as a vice-professor in the Department of Information Management at Chaoyang University of Technology. The original page often returned 403, so the "Microsoft lifespan" quote is only paraphrased from search results and not taken as a verbatim quote.

[^7]: [Dark Thread: Shielded Machine - Solving VS2015 BIG5 Compatibility Issues](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — A 2015 record of compilation errors caused by _Xu Gong Gai_ when compiling BIG5 source code in Visual Studio 2015. The article contains the phrase "just had to say goodbye to VS2015."

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — Merged on 2026-07-26. Before fixing, Windows categories only showed root: 4546; after fixing, Technology zh: 59. The emoji that caused the cp950 console to crash was also removed.
