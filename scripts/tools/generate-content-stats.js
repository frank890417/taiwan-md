import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const knowledgeDir = path.join(__dirname, '..', 'knowledge');

// 分類統計
const categories = {};
function scan(dir, cat = '') {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      if (!f.startsWith('_') && f !== 'en' && f !== 'about') scan(full, f);
    } else if (f.endsWith('.md') && !f.startsWith('_')) {
      const c = cat || 'root';
      categories[c] = (categories[c] || 0) + 1;
    }
  }
}
scan(knowledgeDir);

// 每日新增（從 git log）
let dailyGrowth = [];
try {
  const log = execSync(
    'git log --format="%ai" --diff-filter=A -- "knowledge/*.md" "knowledge/**/*.md" | cut -d" " -f1 | sort | uniq -c | sort -k2',
    { cwd: path.join(__dirname, '..'), encoding: 'utf-8' },
  );
  dailyGrowth = log
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => {
      const [count, date] = line.trim().split(/\s+/);
      return { date, count: parseInt(count) };
    });
} catch (e) {
  console.error('Git log failed:', e.message);
}

const stats = {
  categories,
  dailyGrowth,
  updated: new Date().toISOString().slice(0, 10),
};
const out = path.join(__dirname, '..', 'src', 'data', 'content-stats.json');
fs.writeFileSync(out, JSON.stringify(stats, null, 2));
console.log('✅ content-stats.json generated');
