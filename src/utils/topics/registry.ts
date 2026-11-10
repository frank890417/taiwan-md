/**
 * registry.ts — 讀 src/data/topics/*.json（每個專題一份登記檔）。
 *
 * 用法：
 *   import { getTopics, getTopic, getAllTools } from '../utils/topics/registry';
 *
 * 資料夾裡一份 json 都沒有時，import.meta.glob 回傳空物件，三個函式回傳
 * 空陣列／undefined，總覽頁照實顯示「還沒有專題」。
 * 型別與純函式住 registry-core.ts（測試直接載入那一份）。
 */
import {
  buildTopics,
  flattenTools,
  type Topic,
  type ToolWithTopic,
} from './registry-core';

export * from './registry-core';

const modules = import.meta.glob('../../data/topics/*.json', { eager: true });
const topics: Topic[] = buildTopics(modules);
const tools: ToolWithTopic[] = flattenTools(topics);

/** 所有專題，照固定順序（housing、health、industry、income、names，其餘字母序）。 */
export function getTopics(): Topic[] {
  return topics;
}

export function getTopic(id: string): Topic | undefined {
  return topics.find((t) => t.id === id);
}

/** 所有專題的所有工具，每一筆帶著它的 topic。 */
export function getAllTools(): ToolWithTopic[] {
  return tools;
}
