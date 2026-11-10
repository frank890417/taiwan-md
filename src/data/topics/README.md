# 專題登記檔

每個專題在這個資料夾放一份 `<topic>.json`（`housing.json`、`health.json`、`industry.json`、`income.json`、`names.json`）。`/topics/` 專題總覽、`/tools/` 工具總覽、專題內導覽（`TopicNav`）、專題互連（`TopicCrossLinks`）都讀這裡，由 `src/utils/topics/registry.ts` 載入。

這個資料夾沒有任何 json 的時候，兩個總覽頁會標 `noindex` 並顯示「陸續上線」。所以這裡只放真的上線的專題，範例只寫在下面的程式碼區塊，不要存成檔案。

## 欄位

| 欄位              | 型別       | 說明                                                                                           |
| ----------------- | ---------- | ---------------------------------------------------------------------------------------------- |
| `id`              | 字串       | `housing`、`health`、`industry`、`income`、`names` 其中一個，跟檔名一樣                        |
| `path`            | 字串       | 專題主頁的中文版路徑，前後都有斜線，例 `/housing/`                                             |
| `title`           | `{zh, en}` | 專題名稱。可以多寫 `ja`、`ko` 等語言代碼，有寫就優先用；沒寫時 ja、ko 讀 `zh`，其他語言讀 `en` |
| `description`     | `{zh, en}` | 一兩句說明，會出現在總覽卡片上                                                                 |
| `emoji`           | 字串       | 一個表情符號，可留空字串                                                                       |
| `updated`         | 字串       | `YYYY-MM-DD`，資料或內容最後更新日                                                             |
| `subpages`        | 陣列       | 子頁，每筆 `{path, title}`。`title` 可以是字串或 `{zh, en}`                                    |
| `tools`           | 陣列       | 工具，每筆欄位見下表                                                                           |
| `relatedArticles` | 字串陣列   | 被串進專題的既有文章，寫中文版路徑                                                             |
| `relatedTopics`   | 字串陣列   | 相關的其他專題 `id`                                                                            |

`tools` 每一筆：

| 欄位          | 型別       | 說明                                                         |
| ------------- | ---------- | ------------------------------------------------------------ |
| `slug`        | 字串       | 英文小寫連字號，取使用者會搜的詞，例 `mortgage-calculator`   |
| `path`        | 字串       | 單獨頁的中文版路徑，例 `/housing/mortgage-calculator/`       |
| `embedPath`   | 字串       | 內嵌板的中文版路徑，例 `/embed/housing/mortgage-calculator/` |
| `title`       | `{zh, en}` | 工具名稱                                                     |
| `description` | `{zh, en}` | 一句話說這個工具算什麼                                       |
| `keywords`    | 字串陣列   | 搜尋關鍵詞，會寫進 `WebApplication` 結構化資料               |

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
      "title": { "zh": "房價", "en": "Home prices" }
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
  "relatedTopics": ["income"]
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
  <ToolFrame title="試算" variant="page" lang={lang} embedHref={tool.embedPath}>
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

範例裡寫死的中文只是示意，實際文案放 `src/i18n/<topic>.ts`。
