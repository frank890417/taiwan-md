#!/bin/bash

# 批量為Food類別文章添加Unsplash圖片

declare -A image_map=(
  ["夜市文化"]="photo-1555939594-58d7cb561ad1|夜市美食攤位的熱鬧場景|Photo by Peter Hershey on Unsplash"
  ["台灣小吃"]="photo-1504674900247-0877df9cc836|各種台灣街頭小吃|Photo by Mae Mu on Unsplash"
  ["台灣滷肉飯"]="photo-1603133872878-684f208fb84b|美味的台式滷肉飯|Photo by Farhad Ibrahimzade on Unsplash"
  ["茶文化"]="photo-1544787219-7f47ccb76574|傳統茶道文化|Photo by Gui on Unsplash"
  ["台灣眷村菜"]="photo-1567529692333-de9fd6772897|家常中式菜餚|Photo by Petr Sevcovic on Unsplash"
  ["客家飲食文化"]="photo-1563245372-f21724e3856d|客家風味菜餚|Photo by Kevin Becker on Unsplash"
  ["台灣原住民飲食文化"]="photo-1540189549336-e6e99c3679fe|原住民傳統食材|Photo by Caroline Attwood on Unsplash"
  ["台灣夜市小吃圖鑑"]="photo-1555939594-58d7cb561ad1|夜市小吃攤位|Photo by Peter Hershey on Unsplash"
  ["台灣早餐文化"]="photo-1525351484163-7529414344d8|台式早餐組合|Photo by Brooke Lark on Unsplash"
  ["台灣冰品文化"]="photo-1501443762994-82bd5dace89a|台式刨冰甜品|Photo by Rajesh Kavasseri on Unsplash"
  ["台灣水果王國"]="photo-1490474418585-ba9bad8fd0ea|熱帶水果拼盤|Photo by Tanaphong Toochinda on Unsplash"
  ["台灣手搖飲文化"]="photo-1556679343-c7306c1976bc|手搖飲料店|Photo by Jennifer Chen on Unsplash"
  ["台灣咖啡產業"]="photo-1447933601403-56dc2df5f64b|精品咖啡拉花|Photo by Nathan Dumlao on Unsplash"
  ["台灣辦桌文化"]="photo-1414235077428-338989a2e8c0|傳統辦桌宴席|Photo by Nacho Domínguez Argenta on Unsplash"
  ["台灣素食文化"]="photo-1512621776951-a57141f2eefd|素食蔬菜料理|Photo by Anna Pelzer on Unsplash"
  ["台灣發酵食品與醃製文化"]="photo-1583224994076-dd23b1204e7b|醃製發酵食品|Photo by Fernanda Martinez on Unsplash"
  ["台灣米食文化"]="photo-1516684732162-798a0062be99|白米飯碗|Photo by Pille-Riin Priske on Unsplash"
  ["台灣麵食文化"]="photo-1569718212165-3a8278d5f624|手工麵條|Photo by Harry Dona on Unsplash"
  ["台灣海鮮文化"]="photo-1535141192574-5d4897c12f4f|新鮮海鮮市場|Photo by Eiliv-Sonas Aceron on Unsplash"
  ["台灣鹹酥雞"]="photo-1562967914-608f82629710|酥炸雞肉小食|Photo by KAL VISUALS on Unsplash"
  ["台灣豆漿與早餐店"]="photo-1495474472287-4d71bcdd2085|豆漿早餐組合|Photo by Nanna Kreutzmann on Unsplash"
  ["台灣醬料與調味"]="photo-1472476443507-c7a5948772fc|各式醬料調味|Photo by NordWood Themes on Unsplash"
  ["台灣麵包與烘焙"]="photo-1509440159596-0249088772ff|烘焙麵包店|Photo by Ponyo Sakana on Unsplash"
  ["台灣手路菜"]="photo-1547592180-85f173990554|精緻台菜料理|Photo by Annie Spratt on Unsplash"
  ["台灣米其林與精緻餐飲"]="photo-1414235077428-338989a2e8c0|高級餐廳料理|Photo by Nacho Domínguez Argenta on Unsplash"
  ["台灣地方小吃地圖"]="photo-1565299585323-38d6b0865b47|地方特色小吃|Photo by Tanaphong Toochinda on Unsplash"
  ["台灣新住民美食融合"]="photo-1569058242567-93de6f36f8e6|東南亞風味料理|Photo by Vino Li on Unsplash"
)

# 處理每個檔案
for file in knowledge/Food/*.md; do
  filename=$(basename "$file" .md)
  
  # 跳過 _Food Hub.md
  if [[ "$filename" == "_Food Hub" ]]; then
    continue
  fi
  
  # 檢查是否在映射表中
  if [[ -n "${image_map[$filename]}" ]]; then
    IFS='|' read -r photo_id alt_text credit <<< "${image_map[$filename]}"
    image_url="https://images.unsplash.com/${photo_id}?w=800&h=600&fit=crop&q=80"
    
    echo "正在更新: $filename"
    
    # 檢查文件是否已經有image欄位
    if grep -q "^image:" "$file"; then
      echo "  - 已有圖片，跳過"
    else
      # 在frontmatter的最後一行前插入圖片資訊
      sed -i '' '/^---$/i\
image: "'"$image_url"'"\
imageAlt: "'"$alt_text"'"\
imageCredit: "'"$credit"'"' "$file"
      echo "  - 已添加圖片: $photo_id"
    fi
  else
    echo "警告: 找不到 $filename 的圖片映射"
  fi
done

echo "完成所有文章的圖片更新！"