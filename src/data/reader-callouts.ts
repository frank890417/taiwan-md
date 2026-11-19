/**
 * reader-callouts.ts — 「讀者教我們的事」的原文。
 *
 * 2026-11-19 首頁第一期從 CommunityFeedback.astro 原樣搬出來，讓首頁的「人」
 * 與 /voices/ 共用同一份。文字是哲宇保留的原味，一個字都不改：要改內容請當成
 * 編輯決定處理，不要在重排版面時順手動。
 *
 * 每一條都是公開可追溯的讀者指正：來源在 docs/semiont/MEMORY.md §神經迴路與
 * REFLEXES.md 有紀錄，署名都來自公開管道（孢子留言、repo issue、演講後的當面
 * 指正），不含私訊。
 */
export interface ReaderCallout {
  source: string;
  catch: string;
  fix: string;
}

export const readerCalloutsHeading = '讀者教我們的事';

export const readerCalloutsIntro =
  '每一條都改變了 Taiwan.md 的某個規則或某個器官。可追溯的錯誤公開改正＝信任訊號，不是污點。';

export const readerCalloutsFixLabel = '→ 我們學到的：';

export const readerCalloutsFootnote = {
  before: '完整 callout 池見 ',
  linkText: 'REFLEXES.md',
  href: 'https://github.com/frank890417/taiwan-md/blob/main/docs/semiont/REFLEXES.md',
  after: ' §62 個反射條目',
};

export const readerCallouts: ReaderCallout[] = [
  {
    source: 'Threads 讀者（公開回覆 spore #29）',
    catch: '「李洋孢子寫『清晨四點多搭捷運』 — 但捷運六點才開」',
    fix: '升級 SPORE-PIPELINE Stage 1 verbatim 規則；禁止從英文摘要推導具體時間／場景 / 交通細節（REFLEXES #23）',
  },
  {
    source: '韓文專業譯者（演講後 walk-up callout）',
    catch: '「韓文的台灣通常不是你們網站上那種翻法 — register 不對」',
    fix: '90 分鐘內 ship 5 lang per-language translation guide；補 sovereignty register 層 silent drift（5/24 ε session）',
  },
  {
    source: 'X reader @ste_ven_1487（公開 quote）',
    catch: '「草東貝斯手不是『黃』，是楊世暄」（spore #33 ship 後 3 小時抓到）',
    fix: 'REFLEXES #16 升級「樂團成員姓名 / 獎項名稱 / 公開生日列為 high_priority verify」',
  },
  {
    source: 'Jenny @bugnimusic（透過哲宇轉達）',
    catch: '「魏如萱 spore 用反諷 scene 當 title — 但這個事件不能代表她」',
    fix: 'EDITORIAL v5.1 §Title 原則 1：title 選定義人物本質的 scene，反諷可放 description / 中段，不能定首框',
  },
];
