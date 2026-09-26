#!/usr/bin/env node
// prettier-stdio.mjs — 常駐的 prettier 格式化服務，給 Python 儀器問「commit 會把這份檔改成什麼」。
//
// 協定：stdin 一行一個 JSON `{"filepath": "...", "text": "..."}`，
//       stdout 一行一個 JSON `{"ok": true, "out": "...", "ignored": false}` 或 `{"ok": false, "error": "..."}`。
// 用同一個 node 行程處理整批檔案：每篇文章各起一次 `npx prettier` 要半秒，
// 全庫一萬多份就是一個半小時；常駐之後每份只剩幾毫秒。
//
// 設定跟 lint-staged 那一步相同（`prettier --write --ignore-unknown`）：
// resolveConfig 讀 repo 的 .prettierrc，getFileInfo 讀 .prettierignore。
// 誕生：2026-09-27 twmd-self-evolve-weekly，REFLEXES #100 未落地的那一半——
// 驗收要量「會被寫進 git 的那一份」，而會改寫檔案的元件就是這把格式化器。
import * as prettier from 'prettier';
import readline from 'node:readline';
import path from 'node:path';

const root = process.cwd();
const ignorePath = path.join(root, '.prettierignore');
const rl = readline.createInterface({ input: process.stdin, terminal: false });

rl.on('line', async (line) => {
  rl.pause();
  let reply;
  try {
    const { filepath, text } = JSON.parse(line);
    const abs = path.resolve(root, filepath);
    const info = await prettier.getFileInfo(abs, { ignorePath });
    if (info.ignored || !info.inferredParser) {
      reply = { ok: true, ignored: true, out: text };
    } else {
      const options = (await prettier.resolveConfig(abs)) || {};
      const out = await prettier.format(text, { ...options, filepath: abs });
      reply = { ok: true, ignored: false, out };
    }
  } catch (err) {
    reply = { ok: false, error: String(err && err.message ? err.message : err).slice(0, 400) };
  }
  process.stdout.write(JSON.stringify(reply) + '\n');
  rl.resume();
});
