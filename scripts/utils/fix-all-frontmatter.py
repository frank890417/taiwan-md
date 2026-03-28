import os
import re
import glob

def extract_title_from_content(content):
    """從內容中提取標題"""
    lines = content.split('\n')
    for line in lines:
        line = line.strip()
        if line.startswith('# '):
            return line[2:].strip()
    return "未命名文章"

def extract_description_from_content(content):
    """從內容中提取描述（第一個引用塊）"""
    lines = content.split('\n')
    in_quote = False
    description_lines = []
    
    for line in lines:
        line = line.strip()
        if line.startswith('> **30 秒概覽：**') or line.startswith('> **30秒概覽：**'):
            # 提取這行的描述部分
            desc = line.replace('> **30 秒概覽：**', '').replace('> **30秒概覽：**', '').strip()
            return desc
        elif line.startswith('> ') and not in_quote:
            in_quote = True
            description_lines.append(line[2:])
        elif line.startswith('> ') and in_quote:
            description_lines.append(line[2:])
        elif in_quote and not line.startswith('>'):
            break
    
    if description_lines:
        return ' '.join(description_lines)
    
    # 如果沒找到，返回前幾行非標題內容
    lines = content.split('\n')
    desc_lines = []
    for line in lines:
        line = line.strip()
        if line and not line.startswith('#') and not line.startswith('---') and not line.startswith('>'):
            desc_lines.append(line)
            if len(' '.join(desc_lines)) > 100:
                break
    
    desc = ' '.join(desc_lines)[:150]
    return desc if desc else "台灣相關知識文章"

def fix_frontmatter(filepath):
    """修復單個檔案的 frontmatter"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 檢查是否已有正確的 frontmatter
    if re.search(r'^title:', content, re.MULTILINE):
        return False  # 已經正確，不需修復
    
    # 提取內容
    if content.startswith('---'):
        parts = content.split('---', 2)
        if len(parts) >= 3:
            old_frontmatter = parts[1]
            body = parts[2]
        else:
            old_frontmatter = ""
            body = content
    else:
        old_frontmatter = ""
        body = content
    
    # 提取資訊
    title = extract_title_from_content(body)
    description = extract_description_from_content(body)
    
    # 從舊 frontmatter 提取 tags
    tags = ["台灣"]
    if old_frontmatter:
        tag_match = re.search(r'tags:\s*\[(.*?)\]', old_frontmatter)
        if tag_match:
            old_tags = [tag.strip().strip('"\'') for tag in tag_match.group(1).split(',')]
            tags.extend(old_tags)
    
    # 去重並格式化
    unique_tags = []
    for tag in tags:
        if tag not in unique_tags:
            unique_tags.append(tag)
    
    tags_str = ', '.join([f'"{tag}"' for tag in unique_tags[:5]])  # 限制5個標籤
    
    # 新的 frontmatter
    new_frontmatter = f'''---
title: "{title}"
description: "{description[:200]}..."
date: 2026-03-17T00:00:00Z
tags: [{tags_str}]
author: "taiwan.md 社群"
difficulty: "beginner"
readingTime: 8
featured: false
---'''
    
    # 寫入檔案
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_frontmatter + '\n' + body.lstrip('\n'))
    
    return True

# 處理所有 markdown 檔案
fixed_count = 0
for pattern in ['src/content/zh-TW/*/*.md', 'src/content/en/*/*.md']:
    for filepath in glob.glob(pattern):
        if not filepath.endswith('_Home.md') and 'Hub.md' not in filepath:
            if fix_frontmatter(filepath):
                print(f"修復: {filepath}")
                fixed_count += 1

print(f"✅ 修復了 {fixed_count} 個檔案的 frontmatter")
