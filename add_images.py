#!/usr/bin/env python3
# -*- coding: utf-8 -*-

import os
import re

# 圖片映射表
image_map = {
    "牛肉麵": ("photo-1569718212165-3a8278d5f624", "一碗熱騰騰的亞洲牛肉麵", "Photo by Harry Dona on Unsplash"),
    "珍珠奶茶": ("photo-1556679343-c7306c1976bc", "一杯珍珠奶茶，展現台灣經典手搖飲文化", "Photo by Jennifer Chen on Unsplash"),
    "夜市文化": ("photo-1555939594-58d7cb561ad1", "台灣夜市的熱鬧美食場景", "Photo by Peter Hershey on Unsplash"),
    "台灣小吃": ("photo-1504674900247-0877df9cc836", "各種台灣街頭小吃", "Photo by Mae Mu on Unsplash"),
    "台灣滷肉飯": ("photo-1603133872878-684f208fb84b", "美味的台式滷肉飯", "Photo by Farhad Ibrahimzade on Unsplash"),
    "茶文化": ("photo-1544787219-7f47ccb76574", "傳統中式茶道文化", "Photo by Gui on Unsplash"),
    "台灣眷村菜": ("photo-1567529692333-de9fd6772897", "家常中式菜餚", "Photo by Petr Sevcovic on Unsplash"),
    "客家飲食文化": ("photo-1563245372-f21724e3856d", "客家風味菜餚", "Photo by Kevin Becker on Unsplash"),
    "台灣原住民飲食文化": ("photo-1540189549336-e6e99c3679fe", "原住民傳統食材與料理", "Photo by Caroline Attwood on Unsplash"),
    "台灣夜市小吃圖鑑": ("photo-1555939594-58d7cb561ad1", "夜市小吃攤位與美食", "Photo by Peter Hershey on Unsplash"),
    "台灣早餐文化": ("photo-1525351484163-7529414344d8", "台式早餐組合", "Photo by Brooke Lark on Unsplash"),
    "台灣冰品文化": ("photo-1501443762994-82bd5dace89a", "台式刨冰與甜品", "Photo by Rajesh Kavasseri on Unsplash"),
    "台灣水果王國": ("photo-1490474418585-ba9bad8fd0ea", "豐富的熱帶水果", "Photo by Tanaphong Toochinda on Unsplash"),
    "台灣手搖飲文化": ("photo-1556679343-c7306c1976bc", "台灣手搖飲料店文化", "Photo by Jennifer Chen on Unsplash"),
    "台灣咖啡產業": ("photo-1447933601403-56dc2df5f64b", "精品咖啡拉花藝術", "Photo by Nathan Dumlao on Unsplash"),
    "台灣辦桌文化": ("photo-1414235077428-338989a2e8c0", "傳統台式辦桌宴席", "Photo by Nacho Domínguez Argenta on Unsplash"),
    "台灣素食文化": ("photo-1512621776951-a57141f2eefd", "精緻素食蔬菜料理", "Photo by Anna Pelzer on Unsplash"),
    "台灣發酵食品與醃製文化": ("photo-1583224994076-dd23b1204e7b", "傳統醃製發酵食品", "Photo by Fernanda Martinez on Unsplash"),
    "台灣米食文化": ("photo-1516684732162-798a0062be99", "台灣米食與白飯", "Photo by Pille-Riin Priske on Unsplash"),
    "台灣麵食文化": ("photo-1569718212165-3a8278d5f624", "手工製作的麵條", "Photo by Harry Dona on Unsplash"),
    "台灣海鮮文化": ("photo-1535141192574-5d4897c12f4f", "新鮮海鮮市場", "Photo by Eiliv-Sonas Aceron on Unsplash"),
    "台灣鹹酥雞": ("photo-1562967914-608f82629710", "酥炸台式鹹酥雞", "Photo by KAL VISUALS on Unsplash"),
    "台灣豆漿與早餐店": ("photo-1495474472287-4d71bcdd2085", "傳統豆漿早餐組合", "Photo by Nanna Kreutzmann on Unsplash"),
    "台灣醬料與調味": ("photo-1472476443507-c7a5948772fc", "各式台式醬料與調味", "Photo by NordWood Themes on Unsplash"),
    "台灣麵包與烘焙": ("photo-1509440159596-0249088772ff", "台式烘焙麵包店", "Photo by Ponyo Sakana on Unsplash"),
    "台灣手路菜": ("photo-1547592180-85f173990554", "精緻台菜手路料理", "Photo by Annie Spratt on Unsplash"),
    "台灣米其林與精緻餐飲": ("photo-1414235077428-338989a2e8c0", "米其林等級精緻餐飲", "Photo by Nacho Domínguez Argenta on Unsplash"),
    "台灣地方小吃地圖": ("photo-1565299585323-38d6b0865b47", "各地方特色小吃", "Photo by Tanaphong Toochinda on Unsplash"),
    "台灣新住民美食融合": ("photo-1569058242567-93de6f36f8e6", "東南亞風味融合料理", "Photo by Vino Li on Unsplash")
}

def add_image_to_frontmatter(file_path, filename):
    if filename not in image_map:
        print(f"警告: 找不到 {filename} 的圖片映射")
        return False
    
    photo_id, alt_text, credit = image_map[filename]
    image_url = f"https://images.unsplash.com/{photo_id}?w=800&h=600&fit=crop&q=80"
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # 檢查是否已經有image欄位
    if 'image:' in content:
        print(f"  - {filename} 已有圖片，跳過")
        return False
    
    # 找到frontmatter的結束位置
    pattern = r'(---\n.*?\n)---'
    match = re.search(pattern, content, re.DOTALL)
    
    if not match:
        print(f"  - {filename} 找不到frontmatter")
        return False
    
    # 在frontmatter結束前插入圖片資訊
    frontmatter = match.group(1)
    new_frontmatter = frontmatter + f'image: "{image_url}"\n'
    new_frontmatter += f'imageAlt: "{alt_text}"\n'
    new_frontmatter += f'imageCredit: "{credit}"\n'
    
    # 替換內容
    new_content = content.replace(match.group(0), new_frontmatter + '---')
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"  - {filename} 已添加圖片: {photo_id}")
    return True

def main():
    food_dir = "knowledge/Food"
    updated_count = 0
    
    for filename in os.listdir(food_dir):
        if not filename.endswith('.md'):
            continue
        if filename.startswith('_'):  # 跳過 _Food Hub.md
            continue
            
        file_path = os.path.join(food_dir, filename)
        article_name = filename[:-3]  # 移除 .md 後綴
        
        print(f"正在處理: {article_name}")
        if add_image_to_frontmatter(file_path, article_name):
            updated_count += 1
    
    print(f"\n完成！共更新了 {updated_count} 篇文章的圖片")

if __name__ == "__main__":
    main()