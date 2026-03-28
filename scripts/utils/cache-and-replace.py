#!/usr/bin/env python3
"""Download Wikimedia images locally and replace URLs in source files."""
import os, re, hashlib, glob, urllib.request, time

IMG_DIR = "public/images/wiki"
os.makedirs(IMG_DIR, exist_ok=True)

# Step 1: Find all Wikimedia URLs in project
all_urls = set()
source_files = []
for pattern in ['knowledge/**/*.md', 'src/**/*.md', 'src/**/*.astro']:
    source_files.extend(glob.glob(pattern, recursive=True))

URL_RE = re.compile(r'https://upload\.wikimedia\.org/[^\s"\')\]]+')
for fp in source_files:
    with open(fp, 'r', encoding='utf-8') as f:
        urls = URL_RE.findall(f.read())
        all_urls.update(urls)

print(f"🖼️  找到 {len(all_urls)} 個 Wikimedia URL")

# Step 2: Download missing images
url_to_local = {}
downloaded = 0
cached = 0

for url in sorted(all_urls):
    h = hashlib.md5(url.encode()).hexdigest()[:12]
    ext_m = re.search(r'\.(jpg|jpeg|png|svg|gif)', url, re.IGNORECASE)
    ext = ext_m.group().lower() if ext_m else '.jpg'
    local_file = f"{IMG_DIR}/{h}{ext}"
    local_path = f"/images/wiki/{h}{ext}"
    
    if os.path.isfile(local_file) and os.path.getsize(local_file) > 100:
        url_to_local[url] = local_path
        cached += 1
        continue
    
    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'TaiwanMD/1.0 (https://taiwan.md; educational project)'
        })
        with urllib.request.urlopen(req, timeout=15) as resp:
            data = resp.read()
            if len(data) > 100:
                with open(local_file, 'wb') as f:
                    f.write(data)
                url_to_local[url] = local_path
                downloaded += 1
                print(f"  ⬇️  {h}{ext} ({len(data)} bytes)")
            else:
                print(f"  ❌ Too small: {url[:60]}")
    except Exception as e:
        print(f"  ❌ {str(e)[:50]}: {url[:60]}")
    
    time.sleep(0.3)

print(f"\n📊 下載: {downloaded} 新 + {cached} 已快取 = {len(url_to_local)} 總計")

# Step 3: Replace URLs in source files
files_changed = 0
urls_replaced = 0

for fp in source_files:
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    count = 0
    for url, local in url_to_local.items():
        if url in new_content:
            new_content = new_content.replace(url, local)
            count += 1
    
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        files_changed += 1
        urls_replaced += count
        print(f"  ✅ {fp} ({count} URLs)")

print(f"\n🔄 替換: {urls_replaced} URLs in {files_changed} files")

# Step 4: Summary
total_files = len([f for f in os.listdir(IMG_DIR) if not f.endswith('.txt')])
print(f"📂 快取目錄: {IMG_DIR} ({total_files} files)")
print("🎉 完成！圖片永遠不會死掉了")
