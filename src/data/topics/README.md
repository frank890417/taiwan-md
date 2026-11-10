# 專題登記檔

每個專題在這個資料夾放一份 `<topic>.json`（`housing.json`、`health.json`、`industry.json`、`income.json`、`names.json`）。`/topics/` 專題總覽、`/tools/` 工具總覽、專題內導覽（`TopicNav`）、專題互連（`TopicCrossLinks`）都讀這裡，由 `src/utils/topics/registry.ts` 載入。

這個資料夾沒有任何 json 的時候，兩個總覽頁會標 `noindex` 並顯示「陸續上線」。所以這裡只放真的上線的專題，範例只寫在下面的程式碼區塊，不要存成檔案。

## 欄位

| 欄位              | 型別       | 說明                                                                                                                               |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| `id`              | 字串       | `housing`、`health`、`industry`、`income`、`names` 其中一個，跟檔名一樣                                                            |
| `path`            | 字串       | 專題主頁的中文版路徑，前後都有斜線，例 `/housing/`                                                                                 |
| `title`           | `{zh, en}` | 專題名稱。可以多寫 `ja`、`ko` 等語言代碼，有寫就優先用；沒寫時 zh-TW 讀 `zh`，其他語言一律讀 `en`                                  |
| `description`     | `{zh, en}` | 一兩句說明，會出現在總覽卡片上                                                                                                     |
| `emoji`           | 字串       | 一個表情符號，可留空字串                                                                                                           |
| `updated`         | 字串       | `YYYY-MM-DD`，資料或內容最後更新日                                                                                                 |
| `subpages`        | 陣列       | 子頁，每筆 `{path, title, navTitle?}`。`title` 可以是字串或 `{zh, en}`；`navTitle` 是導覽膠囊上的短標題（可選，字串或 `{zh, en}`） |
| `tools`           | 陣列       | 工具，每筆欄位見下表                                                                                                               |
| `relatedArticles` | 字串陣列   | 被串進專題的既有文章，寫中文版路徑                                                                                                 |
| `relatedTopics`   | 字串陣列   | 相關的其他專題 `id`                                                                                                                |
| `languages`       | 字串陣列   | 可選。內容真的翻好了的語言代碼，預設 `["zh-TW", "en"]`。不在清單裡的語言頁會標 `noindex`（見下面「沒翻譯的語言頁」）               |

`tools` 每一筆：

| 欄位          | 型別              | 說明                                                                      |
| ------------- | ----------------- | ------------------------------------------------------------------------- |
| `slug`        | 字串              | 英文小寫連字號，取使用者會搜的詞，例 `mortgage-calculator`                |
| `path`        | 字串              | 單獨頁的中文版路徑，例 `/housing/mortgage-calculator/`                    |
| `embedPath`   | 字串              | 內嵌板的中文版路徑，例 `/embed/housing/mortgage-calculator/`              |
| `title`       | `{zh, en}`        | 工具名稱（單獨頁的 H1、總覽頁卡片）                                       |
| `navTitle`    | 字串或 `{zh, en}` | 可選。`TopicNav` 膠囊上的短標題，不寫就用 `title`。標題超過六七個字就該寫 |
| `description` | `{zh, en}`        | 一句話說這個工具算什麼                                                    |
| `keywords`    | 字串陣列          | 搜尋關鍵詞，會寫進 `WebApplication` 結構化資料                            |

路徑一律寫中文版（不帶語言前綴）。其他語言的網址由 `localizePath(path, lang)` 加上前綴，所以單獨頁與內嵌板都要有 13 語的薄殼。

缺 `id` 或 `path` 的登記檔會被略過；缺 `slug` 或 `path` 的工具也會被略過。

## 完整範例

```json
{
  "id": "housing",
  "path": "/housing/",
  "title": { "zh": "居住", "en": "Housing" },
  "description": {
    "zh": "房價、租金、房貸與居住政策的資料整理，附房貸試算。",
    "en": "Home prices, rents, mortgages and housing policy in Taiwan, with a mortgage calculator."
  },
  "emoji": "🏠",
  "updated": "2026-11-10",
  "subpages": [
    {
      "path": "/housing/prices/",
      "title": { "zh": "房價所得比十年變化", "en": "Home prices vs income" },
      "navTitle": { "zh": "房價", "en": "Prices" }
    },
    { "path": "/housing/rent/", "title": { "zh": "租屋", "en": "Renting" } }
  ],
  "tools": [
    {
      "slug": "mortgage-calculator",
      "path": "/housing/mortgage-calculator/",
      "embedPath": "/embed/housing/mortgage-calculator/",
      "title": {
        "zh": "房貸試算 2026",
        "en": "Taiwan mortgage calculator 2026"
      },
      "navTitle": { "zh": "房貸試算", "en": "Mortgage" },
      "description": {
        "zh": "輸入貸款金額、利率與年限，算出每月還款與總利息。",
        "en": "Enter the loan amount, rate and term to get the monthly payment and total interest."
      },
      "keywords": [
        "房貸試算",
        "本息平均攤還",
        "寬限期",
        "mortgage calculator Taiwan"
      ]
    }
  ],
  "relatedArticles": ["/society/居住正義/"],
  "relatedTopics": ["income"],
  "languages": ["zh-TW", "en"]
}
```

## 怎麼用共用元件

工具元件本身照契約寫在 `src/components/<topic>/tools/<ToolName>.astro`，Props 至少 `lang` 與 `variant: 'inline' | 'page' | 'embed'`。下面三個薄殼只是把它放進共用外殼。

專題頁裡（內嵌版本）：

```astro
<ToolFrame
  title={pickText(tool.title, lang)}
  description={pickText(tool.description, lang)}
  variant="inline"
  lang={lang}
  standaloneHref={tool.path}
  embedHref={tool.embedPath}
>
  <MortgageCalculator lang={lang} variant="inline" />
  <p slot="disclaimer">試算結果僅供參考，實際條件以銀行核定為準。</p>
  <p slot="sources">利率：中央銀行，截至 2026-09。</p>
</ToolFrame>
```

工具單獨頁薄殼（`src/templates/housing-mortgage-calculator.template.astro`，13 語的 `src/pages/[<lang>/]housing/mortgage-calculator.astro` 只 import 這個模板）：

```astro
---
import ToolPage from '../components/tools/ToolPage.astro';
import ToolFrame from '../components/tools/ToolFrame.astro';
import MortgageCalculator from '../components/housing/tools/MortgageCalculator.astro';
import { getLangFromUrl } from '../i18n/utils';
import { getTopic, pickText } from '../utils/topics/registry';

const lang = getLangFromUrl(Astro.url);
const topic = getTopic('housing')!;
const tool = topic.tools.find((x) => x.slug === 'mortgage-calculator')!;
---

<ToolPage
  lang={lang}
  topic={topic}
  tool={{ ...tool, applicationCategory: 'FinanceApplication' }}
  metaTitle="房貸試算 2026：本息、本金、寬限期與新青安對照"
  metaDescription="…"
  howItWorks="本息平均攤還：每月還款 = 本金 × 月利率 × (1 + 月利率)^期數 ÷ ((1 + 月利率)^期數 − 1)。"
  faq={[{ q: '寬限期內要還多少？', a: '寬限期內只繳利息，不還本金。' }]}
  related={[{ href: '/housing/prices/', label: '房價所得比十年變化' }]}
  updated={topic.updated}
  embedPath={tool.embedPath}
>
  <ToolFrame
    title={pickText(tool.title, lang)}
    variant="page"
    lang={lang}
    embedHref={tool.embedPath}
  >
    <MortgageCalculator lang={lang} variant="page" />
    <p slot="disclaimer">試算結果僅供參考，實際條件以銀行核定為準。</p>
  </ToolFrame>
  <Fragment slot="reading"><p>…</p></Fragment>
  <Fragment slot="method"><p>…</p></Fragment>
  <Fragment slot="sources"><p>…</p></Fragment>
  <p slot="disclaimer">本頁不構成財務建議。</p>
</ToolPage>
```

內嵌板薄殼（`src/templates/housing-mortgage-calculator-embed.template.astro`，13 語的 `src/pages/[<lang>/]embed/housing/mortgage-calculator.astro` 只 import 這個模板）：

```astro
---
import EmbedLayout from '../layouts/EmbedLayout.astro';
import ToolFrame from '../components/tools/ToolFrame.astro';
import MortgageCalculator from '../components/housing/tools/MortgageCalculator.astro';
import { getLangFromUrl } from '../i18n/utils';
import { getTopic, localizePath, pickText } from '../utils/topics/registry';

const lang = getLangFromUrl(Astro.url);
const tool = getTopic('housing')!.tools.find(
  (x) => x.slug === 'mortgage-calculator',
)!;
const title = pickText(tool.title, lang);
---

<EmbedLayout
  title={title}
  lang={lang}
  canonical={localizePath(tool.path, lang)}
  sourceNote="中央銀行，截至 2026-09"
>
  <ToolFrame title={title} variant="embed" lang={lang}>
    <MortgageCalculator lang={lang} variant="embed" />
  </ToolFrame>
</EmbedLayout>
```

`variant="page"` 的 `ToolFrame` 不顯示標題（頁面 H1 已經是工具名），`title` 改當外框的 `aria-label`；要顯示就加 `showTitle`。

範例裡寫死的中文只是示意，實際文案放 `src/i18n/<topic>.ts`。

## 語言與 fallback

地基的介面字串（`src/i18n/topics.ts`）有 zh-TW、en、ja 三語。其他語言一律顯示英文，不會出現中文。登記檔的文字（`pickText`）同一條規則：有該語言的欄位用該語言，否則 `en`，`en` 是空的才用 `zh`。

右到左語言（ar）的頁面上，退到英文的字所在的容器會帶 `dir="ltr" lang="en"`，標點才不會跑到另一邊。地基元件自己處理好了；專題自己的模板如果也會在 ar 頁輸出英文 fallback，用同一組 helper：

```astro
---
import { uiDir, textDir } from '../utils/topics/ui-dir';
const ui = uiDir(lang);
const titleDir = textDir(topic.title, lang);
---

<p dir={ui.dir} lang={ui.lang}>{t('tool.updated', { date })}</p>
<h2 dir={titleDir.dir} lang={titleDir.lang}>{pickText(topic.title, lang)}</h2>
```

`uiDir(lang)` 給地基介面字串的容器用，`textDir(text, lang)` 給登記檔文字的容器用。不需要時回傳空物件（兩個屬性都不輸出）。屬性請一個一個寫，不要用 `{...uiDir(lang)}` 展開，Astro 會因此多輸出一個 `class` 屬性。

## 沒翻譯的語言頁

13 語的薄殼都會產生網址，但內容多半只有中文與英文。沒翻譯的語言頁要標 `noindex`，不然搜尋引擎會收到十份一樣的英文頁。

- 工具單獨頁：`ToolPage` 自己處理。目前語言不在 `translatedLangs` 裡就 `noindex`。`translatedLangs` 沒傳時讀 `topic.languages`（登記檔的 `languages`），再沒有就是 `['zh-TW', 'en']`。
- 專題主頁與子頁：模板自己傳，`<Layout noindex={!isTopicTranslated(topic, lang)} …>`。`isTopicTranslated` 從 `src/utils/topics/registry` 匯入。
- `/topics/`、`/tools/` 總覽頁：zh-TW、en、ja 以外的語言 `noindex`。
- 內嵌板本來就全部 `noindex`。

某個語言真的翻完了（模板文案、登記檔文字、工具元件都有該語言），把語言代碼加進登記檔的 `languages`，那個語言的頁就會被收錄。

## v1.1 變更（2026-11-10）

全部向後相容：既有 props 與欄位沒有改名、沒有變成必填。

新增的可選欄位與 props：

| 位置                           | 名稱              | 型別                      | 預設                                     |
| ------------------------------ | ----------------- | ------------------------- | ---------------------------------------- |
| 登記檔 `subpages[]`、`tools[]` | `navTitle`        | `string \| LocalizedText` | 不寫就用 `title`                         |
| 登記檔最外層                   | `languages`       | `string[]`                | `['zh-TW', 'en']`                        |
| `ToolFrame`                    | `showTitle`       | `boolean`                 | `variant="page"` 為 false，其餘為 true   |
| `ToolPage`                     | `translatedLangs` | `string[]`                | `topic.languages`，否則 `['zh-TW','en']` |
| `ToolPage` 的 `topic`          | `languages`       | `string[]`                | 直接傳 `getTopic()` 的結果就會帶上       |

新增的 helper：

- `isTopicTranslated(topic, lang): boolean`，從 `src/utils/topics/registry` 匯入（另有 `hasOwnText(text, lang)`、`DEFAULT_TOPIC_LANGUAGES`）。
- `uiDir(lang)`、`textDir(text, lang)`，回傳 `{ dir?: 'ltr'; lang?: 'en' }`，從 `src/utils/topics/ui-dir` 匯入。
- `topicsUiLang(lang)`、`topicsFallbackChain(lang)`，從 `src/i18n/topics` 匯入。

預設行為的改變：

- 介面字串補了日文。ja 頁顯示日文；ko 與其他沒翻譯的語言顯示英文（以前 ja、ko 顯示中文）。
- `pickText` 在 ja、ko 缺字時讀 `en`（以前讀 `zh`）。
- `ToolFrame variant="page"` 的標題不再顯示成 H2，改成外框的 `aria-label`。
- `ToolPage` 的計算方式預設小標從「這個數字怎麼算出來的？」改成「怎麼得出這個結果？」（en：How this result is produced）。
- `ToolPage` 在 zh-TW、en 以外的語言頁預設 `noindex`；`/topics/`、`/tools/` 在 zh-TW、en、ja 以外 `noindex`。
- ar 頁上的英文 fallback 文字帶 `dir="ltr" lang="en"`。

給專題作者的遷移說明：

1. 合併最新的 `topics-foundation`。工具頁的重複標題、日文介面、英文 fallback、工具頁的 `noindex` 不用改任何程式就會生效；`<ToolFrame variant="page" title=…>` 的 `title` 請傳工具名（它現在是 `aria-label`）。
2. 登記檔裡標題長的子頁與工具補 `navTitle`（中文四到六個字、英文一兩個詞）。
3. 專題主頁與子頁的模板在 `<Layout>` 加 `noindex={!isTopicTranslated(topic, lang)}`。有語言真的翻完了，再把代碼加進登記檔的 `languages`。
