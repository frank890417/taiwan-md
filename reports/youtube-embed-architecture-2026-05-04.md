# YouTube / 影片嵌入：技術架構與未來流程提案

> **誕生 session**：charming-mclaren (2026-05-04)
> **觸發**：寫 [knowledge/Nature/黃魚鴞.md](../knowledge/Nature/黃魚鴞.md) 時，觀察者要求「找適合的 YouTube 影片可以嵌入進去」+「規劃文章嵌入的整個技術架構跟未來流程」
> **關係**：對應 [REWRITE-PIPELINE Stage 4.5 媒體插入](../docs/pipelines/REWRITE-PIPELINE.md#stage-45-media-insertionv220-新增) 的擴充建議；非 canonical SOP，只是 design 提案文件。

---

## 一、現況盤點

### 既有 markdown pattern（無 native embed）

```bash
# Music/ 文章內既有 pattern：純 inline link，讀者自己跳走
$ grep "youtube.com/watch" knowledge/Music/張懸與安溥.md
[〈寶貝〉](https://www.youtube.com/watch?v=TsriGIW30po)
[〈艷火〉](https://www.youtube.com/watch?v=lqPhqGu3VCM)
[〈玫瑰色的你〉](https://www.youtube.com/watch?v=cstTwePsmGg)
```

- 1,800+ knowledge/ 檔案中 zero `<iframe>` 嵌入
- `src/components/` 沒有 `YouTubeEmbed.astro`
- `astro.config.mjs` rehype/remark plugins 中沒有 youtube 處理
- Astro 6 markdown 預設**允許** raw HTML（remark-rehype `allowDangerousHtml`）

### 現有 inline link 的優劣

| 優點                                              | 缺點                                                                |
| ------------------------------------------------- | ------------------------------------------------------------------- |
| 純 markdown SSOT、無外部依賴                      | 讀者必須跳離站才能看影片（流量流失）                                |
| 可被任何 markdown renderer 正確處理（fork 友好）  | 影片預覽不在文章內（無 thumbnail、無封面）                          |
| 既有約定俗成（音樂人歌曲全部走這 pattern）        | YouTube 連結混在 footnote 裡時不顯眼，讀者可能錯過                  |
| 跟外連結不衝突 → 適合「邊讀邊聽」音樂類文章       | 對紀錄片、教學影片、新聞報導等「重點影片」呈現力不足                |

---

## 二、本次（黃魚鴞）採取的 quick-win 方案：raw HTML iframe wrapper

```html
<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/VIDEO_ID"
    title="..."
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowfullscreen></iframe>
</div>
```

caption 用 markdown italic：`_caption 文字 — Photo / Source: ..._`

### 設計考量

| 屬性                           | 決策原因                                                                              |
| ------------------------------ | ------------------------------------------------------------------------------------- |
| `padding-bottom:56.25%`        | 16:9 aspect-ratio 跨瀏覽器 fallback（pre-`aspect-ratio` CSS）                         |
| `loading="lazy"`               | 不阻塞 first paint，scroll 到才載 iframe                                              |
| `border-radius:8px`            | 跟 Taiwan.md 既有 stat-block / pull-quote 視覺一致                                    |
| inline style 而非 class        | knowledge/ markdown 不應依賴特定 CSS class（fork 友好）；現階段沒有 global stylesheet |
| `youtube.com/embed/VIDEO_ID`   | 標準 embed URL（不是 watch URL）                                                      |
| `youtube-nocookie.com` 未使用  | 待評估隱私強化（Trade-off：thumbnail / 留言可能受影響，本次先保留標準）               |

### 限制

- **每篇手動寫 raw HTML** — 作者必須背 7 行 CSS
- **跨 fork 不一致** — Japan.md fork 後可能寫成不同樣式
- **無 thumbnail fallback** — 沒網路時 iframe 全空
- **無 SEO metadata** — `<iframe>` 不傳遞 video `<meta>` 給搜尋引擎

---

## 三、未來方案三選一

### 方案 A：raw HTML（現況延伸，零工程成本）

繼續用 §二的 wrapper、寫進 [REWRITE-PIPELINE Stage 4.5](../docs/pipelines/REWRITE-PIPELINE.md) 作為標準片段、加入 snippet generator 工具。

**Pro**：零 build 變更、跟 fork 友好（任何 markdown renderer 都可處理 raw HTML）
**Con**：每篇手動 paste 7 行樣板、樣式漂移風險

### 方案 B：Astro `<YouTubeEmbed />` component（中等工程成本，推薦的 v2）

寫一支 [src/components/YouTubeEmbed.astro](../src/components/YouTubeEmbed.astro)：

```astro
---
interface Props {
  id: string;
  title: string;
  caption?: string;
  privacy?: boolean;  // youtube-nocookie.com if true
}
const { id, title, caption, privacy = false } = Astro.props;
const domain = privacy ? 'youtube-nocookie.com' : 'youtube.com';
---
<figure class="video-embed">
  <div class="aspect-ratio-16-9">
    <iframe
      src={`https://www.${domain}/embed/${id}`}
      title={title}
      loading="lazy"
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowfullscreen
    />
  </div>
  {caption && <figcaption>{caption}</figcaption>}
</figure>

<style>
.video-embed { margin: 1.5rem 0; }
.aspect-ratio-16-9 { position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 8px; }
.aspect-ratio-16-9 iframe { position: absolute; top: 0; left: 0; width: 100%; height: 100%; border: 0; }
figcaption { font-size: 0.875rem; color: var(--text-muted); margin-top: 0.5rem; font-style: italic; }
</style>
```

問題：knowledge/ 是純 .md 不是 .mdx，**Astro component 不能直接寫進 markdown**。

兩個解法：
1. **knowledge/ 升 .mdx** — 但破壞 1,800+ 既有檔案的 SSOT 純度
2. **配合方案 C rehype plugin 把特定 markdown pattern 轉成 component**

### 方案 C：rehype 自動偵測 plugin（最高工程成本，最乾淨的 UX）

寫一個 [plugins/rehype-youtube.mjs](../plugins/rehype-youtube.mjs):

```javascript
import { visit } from 'unist-util-visit';

const YT_REGEX = /^https?:\/\/(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;

export default function rehypeYouTube() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      // 只處理「整段就只有一個 youtube 連結」的 paragraph
      if (node.tagName !== 'p') return;
      if (node.children.length !== 1) return;
      const link = node.children[0];
      if (link.type !== 'element' || link.tagName !== 'a') return;
      const url = link.properties?.href;
      const match = url?.match(YT_REGEX);
      if (!match) return;

      // 替換為 iframe wrapper
      const videoId = match[1];
      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['video-embed'] },
        children: [{
          type: 'element',
          tagName: 'iframe',
          properties: {
            src: `https://www.youtube.com/embed/${videoId}`,
            loading: 'lazy',
            allow: 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share',
            allowfullscreen: true,
          },
        }],
      };
    });
  };
}
```

knowledge/ markdown 寫法簡單：

```markdown
讀者讀到這段，可以打開以下直播：

https://www.youtube.com/watch?v=nXmf5J0eMFI

_雪霸國家公園 2026 年 4 月 29 日起推出的「武陵黃魚鴞育雛」24 小時直播。_
```

**規則**：

- 整段 `<p>` 只有一個 YouTube link → 自動轉 iframe
- inline link 在句中（如 `[〈寶貝〉](youtube...)`）→ 不轉，仍是純 link
- 不破壞既有 Music/ 文章（既有 pattern 都在句中、不會自動 embed）

**Pro**：作者只需貼 URL + caption；fork 友好（rehype plugin 是 Astro config 層、不破壞 markdown SSOT 純度）；既有 inline link 不影響
**Con**：build chain 多一個 plugin、需要 e2e 測試確認 既有 1,800 檔案無 regression
**估計工程量**：~3-4 hr 寫 plugin + 測試 + ship

### 方案 D：markdown directive（社群慣例，最 portable）

透過 `remark-directive` plugin 支援 `:youtube{id="DMy6fltLv68" title="..."}` 語法。

**Pro**：明確表意、不依賴具體 URL pattern
**Con**：學新語法、跨 markdown renderer 不通用（GitHub markdown 不渲染 directive）

---

## 四、推薦路線（造橋鋪路順序）

### Phase 1（立即，0 工程成本）

**現在**：黃魚鴞文章已用方案 A raw HTML wrapper 嵌入兩支影片並 ship。

### Phase 2（短期，~1 hr）

把方案 A 的 wrapper snippet 寫進 REWRITE-PIPELINE Stage 4.5 新增 §4.5g「YouTube／影片嵌入」section：
- 提供 cope-paste 樣板
- 列「何時用 inline link vs iframe embed」判準
- 列 `youtube.com` vs `youtube-nocookie.com` 隱私 trade-off

### Phase 3（中期，~3-4 hr）

實作方案 C rehype plugin。Touch points：
- `plugins/rehype-youtube.mjs` 新增
- `astro.config.mjs` rehypePlugins 註冊
- 測試：既有 1,800+ 檔案 inline YouTube link 不被誤轉
- 測試：黃魚鴞.md 的 raw HTML wrapper 仍正確 render（向下相容）
- 測試：寫一篇純 URL 段落自動轉 iframe
- 寫進 REWRITE-PIPELINE Stage 4.5g 變成預設 SOP

### Phase 4（長期，6+ hr）

考慮：
- privacy enhanced mode (`youtube-nocookie.com`) 預設化
- thumbnail fallback（從 YouTube `i.ytimg.com/vi/{id}/maxresdefault.jpg` 抓）
- 「點擊播放」式 click-to-load（避免 YouTube cookie 在 first paint 載入）
- 跨平台（Vimeo / Bilibili / 公視+）統一 wrapper

---

## 五、判準：何時 inline link、何時 iframe embed

```
│
├─ 影片是「閱讀路徑」必經（紀錄片片段、新聞報導、24h 直播） → iframe embed（讀者邊讀邊看）
├─ 影片是「sources」（音樂歌曲、引用片段） → inline link（讀者選擇性聽）
├─ 影片在 footnote 裡（補充驗證） → URL only，不 inline embed
└─ 影片是「單則社群孢子素材」 → spore image 自動產，不在 article embed
```

對應 [SPORE-PIPELINE](../docs/factory/SPORE-PIPELINE.md) / [REWRITE Stage 4.5](../docs/pipelines/REWRITE-PIPELINE.md):

- **REWRITE Stage 4.5g**（待寫）：article-level embed
- **SPORE Step X**：spore-level 配圖（不嵌入 video，只 reference URL）

---

## 六、本次黃魚鴞文章影片定位

| URL                                                | 定位                                               | 文章內位置             |
| -------------------------------------------------- | -------------------------------------------------- | ---------------------- |
| https://www.youtube.com/watch?v=nXmf5J0eMFI         | 雪霸國家公園 2026-04-29 起 24h 育雛直播           | §1,800 公尺的烏心石（核心場景嵌入） |
| https://www.youtube.com/watch?v=DMy6fltLv68         | 公視晚間新聞 2026-05-03 報導                       | §夢幻鳥的輪廓（媒體傳播角度）       |

每支影片都用方案 A raw HTML wrapper + caption 嵌入。

---

## 七、未來流程 hooks

### REWRITE-PIPELINE 修補建議（Phase 2 寫進）

新增 **Stage 1.7c YouTube manifest 強化**：
- 任何 article 提到「影片／影像／紀錄片／訪談／直播」→ Stage 1 research agent 必蒐集 YouTube 官方 URL
- 區分「inline link」vs「iframe embed」用途（per §五判準）
- 寫進 research 檔末尾 §媒體授權矩陣

新增 **Stage 4.5g YouTube／影片嵌入 SOP**：
- 提供 wrapper template（方案 A 現況 / 方案 C 未來）
- 強制 caption 含「source 頻道 + 發佈日期」
- 強制 `loading="lazy"` + `title=` accessibility
- 跟 §4.5d alt text / caption 規範統一

### DNA / 認知層 hooks

- **DNA #N 候選**：「video embed = 內容是否直接讀路徑必經 vs 補充」判準（待 verify ≥ 3 次升級）
- 可能成為 EDITORIAL §九富文本語法指南的新項（callout / pull quote / timeline 之外的「video」）

---

## 八、誕生事件

2026-05-04 charming-mclaren session 寫黃魚鴞文章時，研究 agent 找到雪霸 24h 直播 URL [^research-pointer]；觀察者後續指令要求嵌入兩支具體影片 + 規劃整個技術架構。原本 Taiwan.md 1,800+ 檔案中**零** iframe，本次首次系統化處理 YouTube embed → 寫成本 design doc 留給未來 session 接續。

[^research-pointer]: [reports/research/2026-05/黃魚鴞.md](research/2026-05/黃魚鴞.md) §inline 外連 manifest

_status: design proposal | not yet canonical_
_owner: 待哲宇 review 後決定走 Phase 2 or 直接跳 Phase 3_
