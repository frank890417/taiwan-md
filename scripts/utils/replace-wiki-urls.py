#!/usr/bin/env python3
"""Replace Wikimedia URLs with local cached paths."""
import os, re, hashlib, glob

IMG_DIR = "public/images/wiki"
PATTERNS = ["knowledge/**/*.md", "src/pages/**/*.astro", "src/components/**/*.astro"]
URL_RE = re.compile(r'https://upload\.wikimedia\.org/[^\s"\')\]]*')

replaced_total = 0
files_changed = 0

for pattern in PATTERNS:
    for filepath in glob.glob(pattern, recursive=True):
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()
        
        urls = URL_RE.findall(content)
        if not urls:
            continue
        
        new_content = content
        file_replaced = 0
        
        for url in set(urls):
            clean_url = url.rstrip("')")
            h = hashlib.md5(clean_url.encode()).hexdigest()[:12]
            
            ext_match = re.search(r'\.(jpg|jpeg|png|svg|gif)', clean_url, re.IGNORECASE)
            ext = ext_match.group().lower() if ext_match else '.jpg'
            
            local_file = f"{IMG_DIR}/{h}{ext}"
            local_path = f"/images/wiki/{h}{ext}"
            
            if os.path.isfile(local_file) and os.path.getsize(local_file) > 0:
                new_content = new_content.replace(url, local_path)
                if url != clean_url:
                    new_content = new_content.replace(clean_url, local_path)
                file_replaced += 1
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            files_changed += 1
            replaced_total += file_replaced
            print(f"  ✅ {filepath} ({file_replaced} URLs)")

print(f"\n📊 {replaced_total} URLs replaced in {files_changed} files")
