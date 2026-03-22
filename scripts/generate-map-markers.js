#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🗺️ Taiwan.md Map Marker Generation Script');

// 讀取 geocode 對照表
const geocodeData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/data/taiwan-geocode.json'), 'utf8'));
const { cities, landmarks } = geocodeData;

// 解析 frontmatter
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return {};
  
  const fm = {};
  match[1].split('\n').forEach(line => {
    const [key, ...rest] = line.split(':');
    if (key && rest.length) {
      fm[key.trim()] = rest.join(':').trim().replace(/^["']|["']$/g, '');
    }
  });
  return fm;
}

// 從路徑推導分類
function getCategoryFromPath(filePath) {
  const pathParts = filePath.split('/');
  const categoryIndex = pathParts.findIndex(part => part === 'knowledge');
  
  if (categoryIndex !== -1 && categoryIndex + 1 < pathParts.length) {
    const category = pathParts[categoryIndex + 1];
    // 轉成小寫英文
    const categoryMap = {
      'Food': 'food',
      'History': 'history',
      'Nature': 'nature',
      'Culture': 'culture',
      'Technology': 'technology',
      'Economy': 'economy',
      'Lifestyle': 'lifestyle',
      'Art': 'art',
      'Music': 'music',
      'Geography': 'geography',
      'Society': 'society',
      'People': 'people'
    };
    return categoryMap[category] || category.toLowerCase();
  }
  
  // 如果在根目錄，從檔名推測
  const filename = path.basename(filePath, '.md');
  if (filename.includes('夜市') || filename.includes('美食') || filename.includes('小吃')) return 'food';
  if (filename.includes('歷史') || filename.includes('古蹟')) return 'history';
  if (filename.includes('自然') || filename.includes('國家公園')) return 'nature';
  if (filename.includes('文化') || filename.includes('廟宇')) return 'culture';
  if (filename.includes('科技') || filename.includes('產業')) return 'technology';
  if (filename.includes('經濟')) return 'economy';
  if (filename.includes('生活')) return 'lifestyle';
  if (filename.includes('藝術')) return 'art';
  if (filename.includes('音樂')) return 'music';
  if (filename.includes('地理')) return 'geography';
  
  return 'culture'; // 預設
}

// 生成 URL slug
function generateSlug(category, title) {
  // 簡化版 slug 生成，直接用分類
  const categorySlugMap = {
    'food': 'food',
    'history': 'history', 
    'nature': 'nature',
    'culture': 'culture',
    'technology': 'technology',
    'economy': 'economy',
    'lifestyle': 'lifestyle',
    'art': 'art',
    'music': 'music',
    'geography': 'geography',
    'society': 'society',
    'people': 'people'
  };
  
  const categorySlug = categorySlugMap[category] || category;
  
  // 根據標題內容推導更具體的slug
  if (title.includes('夜市') && category === 'food') return '/food/夜市文化';
  if (title.includes('溫泉') && category === 'lifestyle') return '/lifestyle/溫泉文化';
  if (title.includes('國家公園') && category === 'nature') return '/nature/國家公園';
  if (title.includes('科學園區') && category === 'technology') return '/technology/半導體產業';
  if (title.includes('港') && category === 'economy') return '/economy/經濟奇蹟';
  if (title.includes('廟') && category === 'culture') return '/culture/廟宇文化與民間信仰';
  if (title.includes('原住民') && category === 'culture') return '/culture/原住民族文化';
  if (title.includes('客家') && category === 'culture') return '/culture/族群（閩南客家原住民外省新住民）';
  if (title.includes('博物館') || title.includes('美術館') && category === 'art') return '/art/當代藝術';
  if (title.includes('音樂') && category === 'music') return '/music/流行音樂與金曲獎';
  if (title.includes('茶') && category === 'food') return '/food/台灣茶文化';
  
  // 預設路徑
  return `/${categorySlug}/${encodeURIComponent(title)}`;
}

// 地點匹配和評分
function matchLocations(title, content) {
  const matches = [];
  const titleLower = title.toLowerCase();
  const contentLower = content.toLowerCase();
  
  // 優先匹配地標（精確位置）
  for (const [landmarkName, landmarkData] of Object.entries(landmarks)) {
    let score = 0;
    
    // 標題匹配 (最高分)
    if (title.includes(landmarkName)) score += 100;
    if (titleLower.includes(landmarkName.toLowerCase())) score += 80;
    
    // 內容匹配
    const contentMatches = (content.match(new RegExp(landmarkName, 'g')) || []).length;
    score += contentMatches * 20;
    
    if (score > 0) {
      matches.push({
        name: landmarkName,
        type: 'landmark',
        score: score,
        ...landmarkData
      });
    }
  }
  
  // 縣市匹配（較低優先級）
  for (const [cityName, cityData] of Object.entries(cities)) {
    let score = 0;
    
    // 標題匹配
    if (title.includes(cityName)) score += 50;
    if (titleLower.includes(cityName.toLowerCase())) score += 40;
    
    // 內容匹配
    const contentMatches = (content.match(new RegExp(cityName, 'g')) || []).length;
    score += contentMatches * 10;
    
    // 特殊地名變體
    const variants = {
      '台北': ['臺北', 'taipei'],
      '台中': ['臺中', 'taichung'],
      '台南': ['臺南', 'tainan'],
      '台東': ['臺東', 'taitung']
    };
    
    if (variants[cityName]) {
      for (const variant of variants[cityName]) {
        if (contentLower.includes(variant.toLowerCase())) {
          score += 15;
        }
      }
    }
    
    if (score > 0) {
      matches.push({
        name: cityName,
        type: 'city',
        score: score,
        city: cityName,
        ...cityData
      });
    }
  }
  
  // 按分數排序，取前3個
  matches.sort((a, b) => b.score - a.score);
  return matches.slice(0, 3);
}

// 加入jitter避免重疊
function addJitter(lat, lng, existingMarkers, city) {
  const sameLocationMarkers = existingMarkers.filter(m => 
    m.city === city && Math.abs(m.lat - lat) < 0.02 && Math.abs(m.lng - lng) < 0.02
  );
  
  if (sameLocationMarkers.length === 0) {
    return { lat, lng };
  }
  
  // ±0.008 度隨機偏移 (約800公尺)
  const jitterRange = 0.008;
  const jitterLat = lat + (Math.random() - 0.5) * jitterRange * 2;
  const jitterLng = lng + (Math.random() - 0.5) * jitterRange * 2;
  
  return { lat: jitterLat, lng: jitterLng };
}

// 主函數
function generateMarkers() {
  console.log('📂 掃描 knowledge/ 目錄...');
  
  // 遞迴讀取所有 .md 檔案
  function getAllMarkdownFiles(dir) {
    const files = [];
    
    function walkDirectory(currentDir) {
      const entries = fs.readdirSync(currentDir);
      
      for (const entry of entries) {
        const fullPath = path.join(currentDir, entry);
        const stat = fs.statSync(fullPath);
        
        if (stat.isDirectory()) {
          // 排除特殊目錄
          if (!entry.startsWith('_') && entry !== 'en' && entry !== 'about') {
            walkDirectory(fullPath);
          }
        } else if (stat.isFile() && entry.endsWith('.md') && !entry.startsWith('_')) {
          files.push(fullPath);
        }
      }
    }
    
    walkDirectory(dir);
    return files;
  }
  
  const knowledgeDir = path.join(__dirname, '../knowledge');
  const markdownFiles = getAllMarkdownFiles(knowledgeDir);
  
  console.log(`📄 找到 ${markdownFiles.length} 個 markdown 檔案`);
  
  const markers = [];
  const processedCities = new Set(); // 避免同一篇文章在同城市重複marker
  
  for (const filePath of markdownFiles) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      const frontmatter = parseFrontmatter(content);
      
      const title = frontmatter.title || path.basename(filePath, '.md');
      const description = frontmatter.description || frontmatter.desc || '探索台灣的文化與故事';
      const category = getCategoryFromPath(filePath);
      
      // 檢查是否有明確的 geo 欄位
      let locations = [];
      
      if (frontmatter.geo) {
        // 解析 geo 欄位（假設格式如 "台北,25.033,121.565" 或只是 "台北"）
        const geoData = frontmatter.geo.split(',');
        if (geoData.length >= 3) {
          locations.push({
            name: geoData[0].trim(),
            type: 'manual',
            lat: parseFloat(geoData[1]),
            lng: parseFloat(geoData[2]),
            city: geoData[0].trim(),
            score: 1000 // 最高優先級
          });
        } else if (geoData.length === 1) {
          const cityName = geoData[0].trim();
          if (cities[cityName]) {
            locations.push({
              name: cityName,
              type: 'manual',
              city: cityName,
              score: 1000,
              ...cities[cityName]
            });
          }
        }
      }
      
      // 如果沒有明確geo，自動匹配
      if (locations.length === 0) {
        locations = matchLocations(title, content);
      }
      
      // 如果仍然沒有匹配到任何地點，使用台北作為預設
      if (locations.length === 0) {
        locations.push({
          name: '台北',
          type: 'fallback',
          city: '台北',
          score: 1,
          ...cities['台北']
        });
      }
      
      // 為每個匹配的地點生成marker
      const articleCities = new Set();
      
      for (const location of locations) {
        // 避免同一篇文章在同城市重複
        if (articleCities.has(location.city)) continue;
        articleCities.add(location.city);
        
        const { lat: jitterLat, lng: jitterLng } = addJitter(
          location.lat, 
          location.lng, 
          markers, 
          location.city
        );
        
        // 確保region有值，如果沒有從cities查找
        let region = location.region;
        if (!region && location.city && cities[location.city]) {
          region = cities[location.city].region;
        }
        
        const marker = {
          title: title,
          lat: Number(jitterLat.toFixed(6)),
          lng: Number(jitterLng.toFixed(6)),
          category: category,
          region: region,
          link: generateSlug(category, title),
          desc: description,
          city: location.city
        };
        
        markers.push(marker);
        
        // 只取第一個最高分的地點（避免一篇文章太多marker）
        break;
      }
      
    } catch (error) {
      console.error(`❌ 處理檔案失敗: ${filePath}`, error.message);
    }
  }
  
  console.log(`✅ 生成 ${markers.length} 個 markers`);
  
  // 統計分布
  const regionStats = {};
  const categoryStats = {};
  
  markers.forEach(marker => {
    regionStats[marker.region] = (regionStats[marker.region] || 0) + 1;
    categoryStats[marker.category] = (categoryStats[marker.category] || 0) + 1;
  });
  
  console.log('\n📊 區域分布:');
  Object.entries(regionStats).forEach(([region, count]) => {
    console.log(`  ${region}: ${count} markers`);
  });
  
  console.log('\n📈 分類分布:');
  Object.entries(categoryStats).forEach(([category, count]) => {
    console.log(`  ${category}: ${count} markers`);
  });
  
  // 保存到檔案
  const outputPath = path.join(__dirname, '../src/data/map-markers.json');
  fs.writeFileSync(outputPath, JSON.stringify(markers, null, 2));
  
  console.log(`\n💾 已保存到: ${outputPath}`);
  console.log(`🎯 總計: ${markers.length} markers (目標: 150+)`);
  
  return markers;
}

// 執行
generateMarkers();