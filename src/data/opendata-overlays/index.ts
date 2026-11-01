/**
 * /opendata overlay：vi / id / pt / hi / ar / ru / de。
 * 每份 overlay 是 DeepPartial<OpendataContent>，疊在英文底稿上（見
 * opendata-content.ts 的 getOpendataContent）。沒翻的部分顯示英文，不顯示中文。
 */
import type { DeepPartial, OpendataContent } from '../opendata-content';
import { vi } from './vi';
import { id } from './id';
import { pt } from './pt';
import { hi } from './hi';
import { ar } from './ar';
import { ru } from './ru';
import { de } from './de';

export const OPENDATA_OVERLAYS: Record<string, DeepPartial<OpendataContent>> = {
  vi,
  id,
  pt,
  hi,
  ar,
  ru,
  de,
};
