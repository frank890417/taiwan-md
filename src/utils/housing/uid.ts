/** 伺服端產生的唯一字尾，讓同一頁的多個工具實例 label 的 for 與 input 的 id 不重複。 */
let counter = 0;
export function nextUid(prefix: string): string {
  counter = (counter + 1) % 1_000_000;
  return `${prefix}${counter}`;
}
