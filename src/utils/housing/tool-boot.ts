/**
 * tool-boot.ts — 瀏覽器端啟動：找到頁面上的工具根節點，接上互動
 *
 * 只在元件的 <script> 內被呼叫。情境資料（青安條件、官方對照值）在此 import，
 * 與伺服端先算預設案例時用的是同一份 JSON。
 */
import qingan from '../../data/housing/qingan.json';
import fixtures from '../../data/housing/calc-fixtures.json';
import { initTool } from './tool-ui.ts';
import {
  PARAM_PREFIX,
  affordabilityDefaults,
  affordabilityView,
  eligibilityDefaults,
  eligibilityView,
  mortgageDefaults,
  mortgageView,
  rentBuyDefaults,
  rentBuyView,
} from './tool-models.ts';
import type {
  AffordabilityFixtures,
  Ctx,
  QinganData,
  ToolView,
  Values,
} from './tool-models.ts';

export type ToolName = 'mortgage' | 'afford' | 'elig' | 'rentbuy';

const TOOLS: Record<
  ToolName,
  {
    prefix: string;
    defaults: (ctx: Ctx) => Values;
    view: (v: Values, ctx: Ctx) => ToolView;
  }
> = {
  mortgage: {
    prefix: PARAM_PREFIX.mortgage,
    defaults: mortgageDefaults,
    view: mortgageView,
  },
  afford: {
    prefix: PARAM_PREFIX.afford,
    defaults: affordabilityDefaults,
    view: affordabilityView,
  },
  elig: {
    prefix: PARAM_PREFIX.elig,
    defaults: () => eligibilityDefaults(),
    view: eligibilityView,
  },
  rentbuy: {
    prefix: PARAM_PREFIX.rentbuy,
    defaults: rentBuyDefaults,
    view: rentBuyView,
  },
};

function currentMonth(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

export function bootTool(name: ToolName): void {
  const spec = TOOLS[name];
  document
    .querySelectorAll<HTMLElement>(`[data-hs-tool="${name}"]`)
    .forEach((root) => {
      if (root.dataset.hsReady) return;
      let labels: Record<string, string> = {};
      try {
        labels = JSON.parse(
          root.querySelector('[data-hs-labels]')?.textContent ?? '{}',
        );
      } catch {
        /* 沒有文案字典時退回鍵名，不讓整個工具掛掉 */
      }
      const ctx: Ctx = {
        lang: root.dataset.hsLang ?? 'zh-TW',
        labels,
        qingan: qingan as unknown as QinganData,
        fixtures: fixtures as unknown as AffordabilityFixtures,
        toolsPath: root.dataset.hsToolsPath ?? '',
        today: currentMonth(),
      };
      initTool(root, {
        prefix: spec.prefix,
        defaults: spec.defaults(ctx),
        compute: (v) => spec.view(v, ctx),
        sync: root.dataset.hsSync === '1',
      });
    });
}
