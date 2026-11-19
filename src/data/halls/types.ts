/**
 * 四展廳策展散文的資料格式。每個語言一份檔：`prose/{語言代碼}.ts`。
 *
 * 一份檔 default export 一個長度 4 的陣列，依序是展廳壹到肆。
 */
export interface HallParagraph {
  /**
   * 這一段講的分類（網址用的小寫代碼，如 geography）。主題藥丸連到這個分類，
   * 段落底下的精選文章也是這個分類的。翻譯時不要改。
   */
  category: string;
  /**
   * 一整段文字。用 [[…]] 標出主題藥丸，一段剛好一個。
   * 藥丸前後要不要空格照字串裡寫的來：「…之一。 [[🗺️ 這裡的地理]] 不是…」
   * 前後各有一格；英文的 `[[📜 Taiwan's history]]'s most…` 後面沒有。
   * 藥丸開頭的表情符號會被站上的圖示系統換成同一套線條圖示，保留它。
   */
  text: string;
}

export interface HallProse {
  /** 展廳編號的寫法：中文「壹」、英文「I」 */
  numeral: string;
  /** 展廳名：「這座島長什麼樣」 */
  title: string;
  paragraphs: HallParagraph[];
}
