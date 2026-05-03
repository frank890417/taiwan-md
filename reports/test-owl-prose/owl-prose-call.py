#!/usr/bin/env python3
"""
owl-prose-call.py — Phase 2B: 用 Owl Alpha 跑 Stage 2 prose generation

Input: research notes + outline
Output: reports/test-owl-prose/2026-05-03-台灣糕餅文化-owl.md
Model: openrouter/owl-alpha (free tier)
"""

import json
import urllib.request
import urllib.error
import sys
from pathlib import Path

API_URL = "https://openrouter.ai/api/v1/chat/completions"
MODEL = "openrouter/owl-alpha"
KEY_FILE = Path.home() / ".config/taiwan-md/credentials/openrouter.key"
RESEARCH_FILE = Path("reports/test-owl-prose/2026-05-03-台灣糕餅文化-research.md")
OUTPUT_FILE = Path("reports/test-owl-prose/2026-05-03-台灣糕餅文化-owl.md")


def get_key():
    return KEY_FILE.read_text().strip()


SYSTEM_PROMPT = """你是 Taiwan.md（一個 Semiont / 台灣語意共生體 / 公開知識庫）的內容寫作 agent。

你的任務：根據研究筆記寫一篇 ~3500-5000 字的繁體中文 Markdown 文章，主題「台灣糕餅文化」，類別 Food。

寫作紀律（per Taiwan.md REWRITE-PIPELINE Stage 2 + EDITORIAL + MANIFESTO §11）：

必避：
- 編年體小標題（不要「1877 → 1908 → 1980 → 2009」這種時間軸排列）
- 對位句型「不是 X，是 Y」/「並非 X 而是 Y」/「不只 X，更是 Y」密度過高（全篇 ≤ 3 次）
- 破折號連用「——」過密（≤ 15 / 1500 字）
- 罐頭結尾（「綜上所述」「展望未來」「希望明天能…」）
- 中華台北 / 祖國 / 兩岸一家親 / 大陸 字眼
- 鳳梨外銷對中國的政治化敘事（避開）

必有：
- 物件開頭：第一段第一句必須有具體場景 + 物件
- 結尾先寫的餘韻段落（不總結）
- 6 個場景式小標題（用研究筆記給的 outline）
- 30 秒概覽 blockquote 在文章開頭
- Footnote 12-18 個（[^1] [^2] 等格式，文末 ## 參考資料 段定義）
- 延伸閱讀區塊 4-6 條 sibling
- 朋友 tone「欸你知道嗎」感
- 敘事弧線排，不按百科時間軸

frontmatter（複製貼上修改）：

```yaml
---
title: '台灣糕餅文化'
description: '從 1877 鹿港玉珍齋到 30 秒完售的中秋大戰：台灣糕餅 150 年的層次故事'
date: 2026-05-03
tags: [糕餅, 漢餅, 鳳梨酥, 蛋黃酥, 太陽餅, 鹿港, 豐原]
category: 'Food'
subcategory: '糕餅'
author: 'Taiwan.md'
difficulty: 'beginner'
readingTime: 12
featured: false
lastVerified: 2026-05-03
lastHumanReview: false
---
```

直接輸出整篇 Markdown（從 frontmatter 開始），不要任何前言或解釋。"""


def main():
    if not RESEARCH_FILE.exists():
        print(f"❌ research file not found: {RESEARCH_FILE}", file=sys.stderr)
        sys.exit(1)

    research = RESEARCH_FILE.read_text(encoding="utf-8")

    user_msg = f"""以下是研究筆記。請依照 system prompt 的紀律寫一篇完整文章。

## 研究筆記

{research}

---

請現在輸出整篇文章 Markdown。"""

    payload = json.dumps({
        "model": MODEL,
        "messages": [
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_msg},
        ],
        "temperature": 0.4,
        "max_tokens": 16000,
    }).encode("utf-8")

    req = urllib.request.Request(
        API_URL,
        data=payload,
        headers={
            "Authorization": f"Bearer {get_key()}",
            "Content-Type": "application/json",
            "HTTP-Referer": "https://taiwan.md",
            "X-Title": "Taiwan.md owl-vs-claude eval",
        },
        method="POST",
    )

    print(f"→ Calling {MODEL}...", file=sys.stderr)
    try:
        with urllib.request.urlopen(req, timeout=300) as resp:
            data = json.loads(resp.read())
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        print(f"❌ HTTP {e.code}: {body[:500]}", file=sys.stderr)
        sys.exit(2)

    if "choices" not in data or not data["choices"]:
        print(f"❌ No choices: {json.dumps(data)[:500]}", file=sys.stderr)
        sys.exit(3)

    content = data["choices"][0]["message"]["content"]
    finish = data["choices"][0].get("finish_reason", "?")
    usage = data.get("usage", {})

    print(f"✓ finish_reason={finish}", file=sys.stderr)
    print(f"✓ usage: prompt={usage.get('prompt_tokens', 0)} completion={usage.get('completion_tokens', 0)} total={usage.get('total_tokens', 0)}", file=sys.stderr)
    print(f"✓ content length: {len(content)} chars", file=sys.stderr)

    OUTPUT_FILE.write_text(content, encoding="utf-8")
    print(f"✓ wrote: {OUTPUT_FILE}", file=sys.stderr)


if __name__ == "__main__":
    main()
