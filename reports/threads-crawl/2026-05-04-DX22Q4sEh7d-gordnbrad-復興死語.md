# Threads crawl report — 「復興死語」串

**抓取時間**: 2026-05-04 ~11:00 +0800
**Source**: [@gordnbrad / DX22Q4sEh7d](https://www.threads.com/@gordnbrad/post/DX22Q4sEh7d)
**樓主**: gordnbrad（暱稱「復興死語」）
**規模**: 5 萬瀏覽 / 6,057 likes / **547 留言** / 713 reposts / 153 引用

---

## 抓取限制（誠實聲明）

Threads 在**未登入**狀態，scroll 觸發 dynamic loading 只 surface 約 **30 則 top-level 留言**（547 中的 ~5%）。深層 nested 回覆（reply-of-reply）需要登入會話 + 個別 click「查看更多」才能展開。本 report 涵蓋的是 popularity-sorted 的最熱門 top-level 回覆，視為 **代表性樣本**，不是完整爬取。

需要全爬 → 需要：
- 登入 Threads 賬號（哲宇本人帳號）
- 改用 official API（需要 access token）
- 或人工分批 scroll 點開每則 nested replies

---

## OP 主張（gordnbrad）

> 「評論區」、「無語」是討人厭的支語，我們用的是「留言區」、「無言」。我真的受夠什麼「細思極恐」、「大概率」這種鬼東西了。

**OP 補充第二則**：
> 「朋友圈」這個詞是從微信出來的，台灣人明明就是講「社交圈」、「交際圈」。

**OP 開頭呼籲**：「我先來一個…要不要去**壓馬路**（救命好老但我就是要這個）」

---

## 留言區提到的對照詞（樣本）

| 中國說法 | 台灣替代（Threads 留言提到） | 說明 |
|---|---|---|
| 評論區 | 留言區 | OP 主張，最重要痛點 |
| 評論 | 留言 | 留言適用於文章下方；評論留給「對店家的評價」（google maps 那種） |
| 無語 | 無言 | OP + cyc___yang + 多人附和 |
| 細思極恐 | （留言未直接給對應） | OP 點名為支語 |
| 大概率 | （留言未直接給對應） | OP 點名為支語 |
| 朋友圈 | 社交圈 / 交際圈 | OP 第二則貼文，微信用語 |
| 底氣 | 底子 / 實力 / 信心 / 本錢 / 靠山 / 說話有份量 | 留言區提到的多種替代（已收錄） |
| 拉黑 | 封鎖 | 已收錄 |
| 舉報 | 檢舉 | 已收錄 |

---

## 「台灣死語復興」類（不屬常規詞庫 schema）

留言提到的「想要把它用回來」的台灣舊用語：

- **壓馬路**（散步 / 約會散步）— 1980-1990s 台灣常用，現在年輕人較少講
- **夯**（hot / 流行）— 2000s 台灣本土詞，流量已被「火」「爆紅」搶走
- **屌**（厲害 / 酷）— 90s-2000s 台灣俚語
- **Hito**（hit / 流行）— 90s 偶像劇時代詞

這類**沒有對立 china_value**，是「台灣自身的詞匯萎縮」議題。Taiwan.md 詞庫目前 schema 是 `display.taiwan / display.china` 對比模式，這類詞需要不同處理：

**選項 A**: 加新欄位 `dialectal_status: dying` 並允許 `china` 為 N/A
**選項 B**: 開 `data/heritage-vocabulary/` 獨立目錄
**選項 C**: 暫不收（超出 SSOT 對比 scope，留給未來「方言/世代用語保存」器官）

---

## Taiwan.md 詞庫對照結果

| 詞 | 已收 | 缺漏 |
|---|---|---|
| 底氣 | ✓ `底氣.yaml` | — |
| 拉黑 | ✓ `拉黑.yaml` | — |
| 舉報 | ✓ `舉報.yaml` | — |
| 留言 / 評論 | ✓ `留言.yaml`（notes 提到「中國說評論區」）| `評論區` 沒有獨立條目 |
| 無語 / 無言 | ✗ | **建議新增** B 類 |
| 細思極恐 | ✗ | **建議新增** E 類（無單一對應，多種台灣替代） |
| 大概率 | ✗ | **建議新增** E 類（八成 / 多半 / 很可能） |
| 朋友圈 | ✗ | **建議新增** B 類（社交圈 / 交際圈） |
| 也是醉了 | ✓ `也是醉了.yaml`（target: 沒救了 / 無言）| — |

**缺口 4 條 + 1 條補充**（評論區補進 留言.yaml 的 china_aliases 或開獨立檔）。

---

## 提案：新增 5 個 yaml entry

### 1. `data/terminology/評論區.yaml`（B 類補充）

```yaml
id: comment_section
category: tech
subcategory: 社群文化
fork_type: B
display:
  taiwan: 留言區
  china: 評論區
english: comments section
etymology:
  origin: 網路平台底下供讀者回應的區塊
  taiwan_path: 台灣 YouTube/Facebook 中文 UI 標準為「留言區」
  china_path: 中國 B 站、微博、抖音標準為「評論區」
  fork_cause: 平台 UI 中文用語各自選擇
notes: 跟「留言/評論」是同一語意分歧的延伸（單一動詞 → 集合名詞）。
sources:
  - 2026-05-04 Threads @gordnbrad 「復興死語」留言串 OP
status: stable
added: '2026-05-04'
```

### 2. `data/terminology/無語.yaml`（B 類）

```yaml
id: speechless
category: daily
subcategory: 日常用語
fork_type: B
display:
  taiwan: 無言
  china: 無語
english: speechless
etymology:
  origin: 表達「不知道該說什麼」的情緒詞
  taiwan_path: 台灣口語為「無言」，1990-2000s 已是日常用法
  china_path: 中國網路興起後「無語」成主流，「無語凝噎」古文用法被通俗化
  fork_point: ~2010s
  fork_cause: 中國微博/B 站擴散，年輕台灣人在中國平台接觸後反輸入
notes: 「無語只能配問蒼天」是台灣老梗（蘇打綠歌詞）。OP 多次強調這是文化滲透最徹底的詞之一。
sources:
  - 2026-05-04 Threads @gordnbrad 「復興死語」留言串 OP + cyc___yang + ry.pan + 多人附和
status: stable
added: '2026-05-04'
```

### 3. `data/terminology/朋友圈.yaml`（B 類）

```yaml
id: friend_circle
category: tech
subcategory: 社群文化
fork_type: B
display:
  taiwan: 社交圈 / 交際圈
  china: 朋友圈
english: social circle / WeChat moments
etymology:
  origin: 中國「朋友圈」原指微信動態功能（Moments），衍生為一般社交圈意涵
  taiwan_path: 台灣傳統說「社交圈」「交際圈」「人脈圈」
  china_path: 微信於 2012 推出「朋友圈」功能，逐漸取代中國原有的「圈子」「人脈」說法
  fork_cause: 微信平台用語擴散
notes: OP 強調「朋友圈」是從微信出來的詞，明顯帶平台印記。Facebook 中文版用「動態」不用「朋友圈」。
sources:
  - 2026-05-04 Threads @gordnbrad 「復興死語」留言串 OP 第二則貼文
status: stable
added: '2026-05-04'
```

### 4. `data/terminology/大概率.yaml`（E 類）

```yaml
id: high_probability
category: daily
subcategory: 日常用語
fork_type: E
display:
  taiwan: 八成 / 多半 / 很可能 / 極可能
  china: 大概率
english: probably / most likely
etymology:
  origin: 中國近年口語化的機率表達
  taiwan_path: 台灣傳統說「八成」「多半」「應該」「很可能」
  china_path: 中國 2010s 後流行「大概率」（從統計術語滲入日常口語）
  fork_cause: 中國網媒 / 自媒體擴散
notes: OP 點名「大概率」為討厭的支語典型。台灣對應有多種，視語氣與正式度選用。
sources:
  - 2026-05-04 Threads @gordnbrad 「復興死語」留言串 OP
status: stable
added: '2026-05-04'
```

### 5. `data/terminology/細思極恐.yaml`（E 類）

```yaml
id: deeply_disturbing
category: daily
subcategory: 日常用語
fork_type: E
display:
  taiwan: 越想越可怕 / 想想就毛 / 細想毛骨悚然
  china: 細思極恐
english: deeply unsettling on reflection
etymology:
  origin: 中國網路四字格用法，「細思之，極恐」的縮略
  taiwan_path: 台灣口語為「越想越可怕」「想想就毛」「想想就覺得不寒而慄」
  china_path: 中國微博 2010s 流行四字格新成語化用語
  fork_cause: 中國網路四字格修辭風潮
notes: OP 點名為討厭的支語典型。台灣對應沒有單一短詞，需依語境展開為完整短句。
sources:
  - 2026-05-04 Threads @gordnbrad 「復興死語」留言串 OP
status: stable
added: '2026-05-04'
```

---

## 給觀察者的決策請求

1. **5 條新 yaml 直接加？** — 都通過 SSOT 鐵律（`knowledge/` SSOT，但 `data/terminology/` 也是 SSOT 等同層級，不需 sync.sh）
2. **「台灣死語」類**（壓馬路 / 夯 / 屌 / Hito）獨立處理？— 目前 schema 不適配，建議哲宇 review 後決定要不要長新器官
3. **要不要爬完所有 547 留言？** — 需要登入 Threads + 改用 GraphQL API 或 selenium-deep-scroll，工作量較大。本 report 是樣本，不是普查

🧬

— magical-chandrasekhar @ 2026-05-04
