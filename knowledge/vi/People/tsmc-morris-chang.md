---
title: 'Trương Trung Mưu (Morris Chang)'
description: 'Doanh nhân Đài Loan được mệnh danh là "cha đẻ ngành bán dẫn", người sáng lập TSMC và tái định hình chuỗi cung ứng công nghệ toàn cầu.'
date: 2026-03-17
category: 'People'
tags:
  [
    'Nhân vật',
    'Trương Trung Mưu',
    'TSMC',
    'Bán dẫn',
    'Doanh nhân',
    'Gia công chip (foundry)',
    'Ngọn núi hộ quốc',
  ]
subcategory: '科技與企業'
author: 'Taiwan.md Contributors'
featured: true
lastVerified: 2026-09-18
lastHumanReview: false
lifeTree:
  protagonist: '張忠謀（Morris Chang）'
  birthYear: 1931
  span: '1931–'
  source:
    article: 'knowledge/People/張忠謀.md'
    commit: '2acf410b'
    commitDate: '2026-03-17'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: '原文無 footnote，source 推測基於 §參考資料區（自傳 / TSMC 年報 / 維基 / 工研院 / 清大）+ 公開歷史紀錄。少數心理動機 alternative 標 [推測]。'
  intro: '一個 17 歲流亡到香港、18 歲進哈佛、19 歲轉 MIT 工程的中國銀行家之子，54 歲離開美國副總職位回台灣創立台積電。這棵樹列出他每次跨界（地理、技能、商業模式、世代）選的路，也列出他沒選的——從哈佛文學的延續到留美安全路徑到 IDM 模式的延續。'
  themes:
    - id: 'homeland'
      label: '海外 vs 故土'
      color: '#10B981'
    - id: 'expert-leader'
      label: '工程師 vs 管理者'
      color: '#8B5CF6'
    - id: 'business-model'
      label: '自製 vs 代工'
      color: '#F59E0B'
    - id: 'succession'
      label: '在位 vs 傳承'
      color: '#EC4899'
  nodes:
    - id: 'birth'
      year: 1931
      age: 0
      type: 'given'
      theme: 'homeland'
      label: '出生於浙江寧波'
      scene: '父親張蔚觀是銀行家，母親徐君偉出身書香門第。動盪年代的書香家庭。'
    - id: 'hong-kong'
      year: 1948
      age: 17
      type: 'choice'
      theme: 'homeland'
      scene: '童年在寧波 → 南京 → 廣州 → 香港 → 重慶 → 上海 → 香港之間遷徙。1948 年國共內戰，17 歲隨家人再度遷往香港'
      chose:
        label: '從香港赴美求學'
        consequence: '中學讀的是重慶南開與上海南洋模範；1949 年從香港赴美進哈佛。少年時代一路遷徙，讓他對「邊緣身份在大國體制內運作」有早期感覺。'
      alternatives:
        - label: '留在中國大陸'
          plausibility: 'structural'
          note: '同代多數家庭沒能跟著遷移到香港。1949 後留在中國的銀行家後代命運與張忠謀完全分流，不會出現在矽谷。'
        - label: '直接赴美'
          plausibility: 'structural'
          note: '少數富裕家庭 1940 年代末就直接送孩子赴美。沒有香港四年，英文與國際化基礎會更弱，哈佛申請會更難。'
    - id: 'harvard-mit'
      year: 1950
      age: 19
      type: 'choice'
      theme: 'expert-leader'
      scene: '1949 年進哈佛念文學。一年後因對文學缺乏熱情、加上經濟考量'
      chose:
        label: '轉學 MIT 機械工程'
        consequence: 'MIT 嚴謹工程教育培養邏輯思維與解決問題能力。1952 拿機械工程學士。這個轉軌是「藝術 → 技術」的關鍵 fork。'
      alternatives:
        - label: '留在哈佛念文學'
          plausibility: 'speculative'
          note: '[推測] 如果留下，可能走學術或文學路徑。完全不會出現半導體事業。但「為什麼一個對文學有興趣的人能在 MIT 工程系成功」這個張力，後來變成他能用人文視角看技術產業的原因。'
        - label: '轉去念商學'
          plausibility: 'structural'
          note: '同代華人留學生有人選哈佛商學院。但少了 engineering hands-on，後來 TI 的技術職位無法擔任，也無法理解半導體製程的精密性。'
    - id: 'korea-war-civilian'
      year: 1952
      age: 21
      type: 'event'
      theme: 'homeland'
      label: 'MIT 畢業遇韓戰，外國學生身份無法進美國軍方相關工作'
      scene: '畢業時正值韓戰期間，國防工業對外籍生關閉。'
    - id: 'sylvania'
      year: 1955
      age: 24
      type: 'choice'
      theme: 'expert-leader'
      scene: '畢業三年後找工作機會'
      chose:
        label: '進希凡尼亞做半導體三年'
        consequence: '首次接觸半導體行業。當時這個產業還在起步階段，但他敏銳察覺巨大潛力。學到半導體製程基礎，也培養對技術細節的關注。'
      alternatives:
        - label: '進其他成熟產業'
          plausibility: 'structural'
          note: '1950 年代的主流選擇是汽車、機械、化工。如果選成熟產業，不會在半導體萌芽期就累積經驗，後來 TI 的機會不會降臨。'
    - id: 'ti-1958'
      year: 1958
      age: 27
      type: 'choice'
      theme: 'expert-leader'
      scene: '德州儀器（TI）正積極發展半導體業務'
      chose:
        label: '加入 TI 從半導體工程師做起'
        consequence: '改善公司製程、提高良率、節省成本。25 年從工程師升到副總，是 TI 改變他一生的舞台。'
      alternatives:
        - label: '留在希凡尼亞'
          plausibility: 'structural'
          note: '希凡尼亞後來逐漸退出半導體領域。如果留下，事業天花板會非常明顯。'
        - label: '創業'
          plausibility: 'structural'
          note: '同期有人選擇離開大公司創業（如 Intel 創辦人 Noyce / Moore 1968 年離開 Fairchild）。但張忠謀走「大公司內部成長」路徑長達 25 年，這個耐性後來反而成為台積電「打長期仗」文化的根。'
    - id: 'stanford-phd'
      year: 1961
      age: 30
      type: 'choice'
      theme: 'expert-leader'
      scene: 'TI 支持他前往史丹佛攻讀電機工程博士'
      chose:
        label: '念博士'
        consequence: '1964 年拿史丹佛 EE PhD。回 TI 後升上重要管理職（鍺、矽電晶體、IC 部門總經理）。技術 + 管理雙軌。'
      alternatives:
        - label: '只當工程師不念博士'
          plausibility: 'structural'
          note: '同代很多工程師不念博士，職涯天花板大致是 senior engineer / staff engineer。對於走技術管理線、後來坐到副總，PhD 是隱形必需品。'
    - id: 'vp-1972'
      year: 1972
      age: 41
      type: 'choice'
      theme: 'expert-leader'
      scene: '在 TI 從工程師一路升上去 14 年後'
      chose:
        label: '升任德儀集團副總經理 + 半導體集團總經理'
        consequence: '當時美國大型企業中最高階的華人高管之一。突破種族天花板。負責 TI 最重要的業務部門。'
      alternatives:
        - label: '跳槽到競爭對手'
          plausibility: 'structural'
          note: '70 年代 Intel / AMD / Motorola 都在搶半導體高管。如果跳槽，可能拿到 CEO 級職位但失去 TI 累積的政治資本與人脈。'
    - id: 'itri-call'
      year: 1985
      age: 54
      type: 'choice'
      theme: 'homeland'
      scene: '工研院董事長徐賢修、行政院長俞國華、政委李國鼎力邀'
      chose:
        label: '回台灣擔任工研院院長'
        consequence: '54 歲，在美國有成功事業與優渥生活。回台是充滿風險的決定。但這是台積電誕生的前提——沒有工研院院長身份，沒有後來的政府支持與股權結構。'
      alternatives:
        - label: '留在美國'
          plausibility: 'structural'
          note: '同代華人高管多數選擇留美直到退休。如果留下，職涯穩定但不會有台積電。台灣半導體產業發展軌跡會完全不同。'
        - label: '回中國大陸'
          plausibility: 'structural'
          note: '1985 年中國改革開放第七年，亦曾邀請海外華人技術領袖。如果選大陸，會被綁進國家半導體計畫（如後來的中芯），路徑與商業模式自由度都不同。'
    - id: 'tsmc-foundry'
      year: 1987
      age: 56
      type: 'choice'
      theme: 'business-model'
      scene: '工研院院長期間，思考一個革命性商業模式'
      chose:
        label: '創立台積電 + 提出「專業晶圓代工」純代工模式'
        consequence: '1987/2/21 成立，總投資約 1.45 億美元。打破當時 IDM（整合元件製造商）主流模式。客戶不必投入巨資建廠就能設計晶片。後來重塑全球半導體產業生態，催生 fabless 產業。'
      alternatives:
        - label: '走傳統 IDM 模式（自己設計+製造）'
          plausibility: 'structural'
          note: '當時主流模式（Intel、TI、Motorola 都是 IDM）。如果選 IDM，台積電會跟韓國三星、日本 NEC 同象限競爭，多半會輸。代工模式才是繞過西方 IDM 主場的關鍵。'
        - label: '只做設計不做製造'
          plausibility: 'structural'
          note: '另一個方向：台版 fabless（如後來的聯發科）。但 1987 年台灣設計能力遠不及製造潛力，這條路會起步太晚。'
        - label: '不創公司，留在工研院做政策'
          plausibility: 'structural'
          note: '部分海外回國技術領袖選擇純政策角色。如果如此，台積電不會出現，台灣半導體會多十年才追上韓國。'
    - id: 'retire-2005'
      year: 2005
      age: 74
      type: 'choice'
      theme: 'succession'
      scene: '台積電已是全球代工龍頭'
      chose:
        label: '第一次退休 / 執行長交給蔡力行 / 自己保留董事長'
        consequence: '精心準備的接班計畫。為企業永續發展鋪路。但留住董事長職位讓他保有戰略決策權。'
      alternatives:
        - label: '完全退出'
          plausibility: 'structural'
          note: '完全退休是「乾淨退出」典範（如 Bill Gates 2008 退出微軟日常）。但 2008 金融危機如果張忠謀完全離場，台積電可能找不到回神能力。保留董事長是後來能復出的關鍵。'
    - id: 'comeback-2009'
      year: 2009
      age: 78
      type: 'choice'
      theme: 'succession'
      scene: '2008 全球金融危機重創台積電。業績下滑、競爭加劇'
      chose:
        label: '78 歲復出重新擔任執行長'
        consequence: '穩定市場信心、領導公司度過困難。順便培養劉德音與魏哲家。「老將回鍋救火」的經典案例。'
      alternatives:
        - label: '不復出讓蔡力行硬撐'
          plausibility: 'structural'
          note: '尊重既定接班計畫的另一條路。但金融危機 + 接班人威信不足的雙重壓力，台積電可能失去 28nm 製程的關鍵機會窗。'
    - id: 'retire-2018'
      year: 2018
      age: 87
      type: 'choice'
      theme: 'succession'
      scene: '台積電在他第二輪 9 年領導後達到製程全球領先'
      chose:
        label: '正式退休 + 建立雙首長制（劉德音董事長 / 魏哲家 CEO）'
        consequence: '功成身退典範。雙首長制平衡對外與對內。31 年傳奇生涯結束。被視為企業接班的教科書案例。'
      alternatives:
        - label: '單一接班人'
          plausibility: 'structural'
          note: '美國企業傳統路徑（Apple Cook / Microsoft Nadella 都是單一接班）。但台積電規模 + 兩位接班人都很強，雙首長制避免「兩虎相爭」也讓彼此互補。'
        - label: '繼續任 90 歲'
          plausibility: 'structural'
          note: 'Berkshire Hathaway 巴菲特模式。但張忠謀選擇主動退場，避免「老人政治」的風險，這個自我克制本身是傳承品質的一部分。'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'People/張忠謀.md'
sourceCommitSha: 'f2b48b60c5'
sourceContentHash: 'sha256:a6a3cf2441fdbe3c'
sourceBodyHash: 'sha256:0b0d1fd6c8d63d0e'
translatedAt: '2026-11-24T11:37:49+08:00'
---

# Trương Trung Mưu (Morris Chang)

Trương Trung Mưu (Zhang Zhongmou), người được mệnh danh là "cha đẻ ngành bán dẫn", là doanh nhân huyền thoại và là người sáng lập Công ty Sản xuất Chất bán dẫn Đài Loan (TSMC). Ông đã tạo ra công ty gia công chip chuyên nghiệp đầu tiên trên thế giới, khai phá một mô hình kinh doanh làm thay đổi hoàn toàn hệ sinh thái ngành công nghệ toàn cầu. Từ một quản lý cấp cao người Hoa tại Texas Instruments (Mỹ) trở về Đài Loan để thành lập TSMC, quỹ đạo cuộc đời ông là minh chứng cho sự phát triển của ngành bán dẫn thế giới, đồng thời đặt nền móng cho vị thế then chốt của Đài Loan trong chuỗi cung ứng công nghệ toàn cầu.

## Tổng quan trong 30 giây

**Tại sao thế giới cần biết về Trương Trung Mưu?**

TSMC do ông sáng lập là doanh nghiệp gia công chip có vốn hóa lớn nhất thế giới và là nền tảng quan trọng của văn minh kỹ thuật số hiện đại. Từ điện thoại thông minh, máy tính đến chip trí tuệ nhân tạo (AI), phần lớn các loại bán dẫn tiên tiến trên thế giới đều do TSMC sản xuất. Mô hình kinh doanh "thuần gia công" mà ông khởi xướng đã cho phép vô số công ty công nghệ tập trung vào thiết kế chip mà không cần đầu tư nguồn vốn khổng lồ để xây dựng nhà máy, từ đó tái định hình toàn bộ hệ sinh thái ngành.

TSMC được mệnh danh là "Ngọn núi hộ quốc" (護國神山) của Đài Loan, nắm giữ vị thế chiến lược không thể thay thế trong địa chính trị. Trương Trung Mưu là một trong số ít những người thực sự thay đổi cấu trúc ngành công nghiệp trong thế kỷ 20 — ông đã định nghĩa lại ranh giới thương mại của ngành bán dẫn, đưa Đài Loan từ điểm xuất phát gia công trở thành nút thắt cốt lõi trong chuỗi cung ứng công nghệ toàn cầu.

Sinh năm 1931 tại Ninh Ba, Chiết Giang và thành lập TSMC tại Đài Loan vào năm 1987: Cuộc đời của Trương Trung Mưu chính là hình ảnh thu nhỏ cho sự trỗi dậy của công nghệ châu Á trong thế kỷ 20.

## Cuộc sống sớm và nền tảng giáo dục

### Quá trình trưởng thành trong thời đại biến động

**Sinh trưởng và bối cảnh gia đình:**
Ngày 10 tháng 7 năm 1931, Trương Trung Mưu sinh ra tại thành phố Ninh Ba, tỉnh Chiết Giang, Trung Quốc[^1]. Cha ông là Trương Úy Quan (Zhang Weiguan), một nhà ngân hàng, và mẹ ông là Từ Quân Vĩ (Xu Junwei), xuất thân từ gia đình có truyền thống học thuật. Trong thời đại đầy biến động đó, sự am hiểu sâu sắc về văn hóa lịch sử của cha cùng kho sách phong phú trong gia đình đã giúp ông luôn giữ được tầm nhìn nhân văn trên con đường kỹ thuật.

**Trải nghiệm di cư thời thơ ấu:**
Do chiến tranh, tuổi thơ của Trương Trung Mưu đầy rẫy những cuộc di cư. Từ Ninh Ba đến Thượng Hải, Nam Kinh, Trùng Khánh, rồi lại về Thượng Hải, sau đó đến Quảng Châu, Hồng Kông và cuối cùng là tới Mỹ. Những trải nghiệm bôn ba này đã rèn luyện khả năng thích nghi và tầm nhìn quốc tế cho ông.

**Thời gian học tập tại Hồng Kông:**
Sau khi kháng chiến kết thúc vào năm 1945, gia đình ông chuyển đến Thượng Hải và ông theo học tại Trường Trung học Nanyang Model; đến năm 1948, trong cuộc nội chiến, Trương Trung Mưu ở tuổi 17 đã cùng gia đình di cư sang Hồng Kông[^1]. Năm sau đó, ông rời Hồng Kông để sang Mỹ du học.

### Bước ngoặt quan trọng tại Mỹ

**Trải nghiệm ngắn ngủi tại Đại học Harvard:**
Năm 1949, ở tuổi 18, Trương Trung Mưu nhập học Đại học Harvard[^2], ban đầu theo học ngành văn học. Tuy nhiên, một năm sau đó, do thiếu đam mê với văn chương và vì lý do kinh tế, ông đã chuyển sang Viện Công nghệ Massachusetts (MIT).

**Giáo dục kỹ thuật tại MIT:**
Tại MIT, Trương Trung Mưu chọn chuyên ngành kỹ thuật cơ khí. Lựa chọn này tưởng chừng ngẫu nhiên nhưng lại giúp ông tích lũy trực giác kỹ thuật thực tế trong cốt lõi của sản xuất bán dẫn (quy trình cơ khí chính xác), tạo nền tảng quan trọng cho việc dẫn dắt cải tiến quy trình tại TSMC sau này.

**Tốt nghiệp cử nhân năm 1952:**
Trương Trung Mưu nhận bằng Cử nhân Kỹ thuật Cơ khí tại MIT vào năm 1952[^3]. Thời điểm tốt nghiệp đúng vào giai đoạn Chiến tranh Triều Tiên, do thân phận sinh viên nước ngoài, ông không thể đảm nhận các công việc liên quan đến quân đội Mỹ, sự hạn chế này vô tình đã dẫn dắt ông sang lĩnh vực công nghiệp dân dụng.

## Khởi đầu sự nghiệp: Công ty Sylvania

### Bước chân vào ngành bán dẫn

**Cơ hội năm 1955:**
Sau khi tốt nghiệp, Trương Trung Mưu từng làm việc tại công ty Sylvania trong ba năm[^4], đây là lần đầu tiên ông tiếp xúc với ngành bán dẫn. Khi đó, ngành công nghiệp bán dẫn vẫn đang ở giai đoạn sơ khai, nhưng Trương Trung Mưu đã nhạy bén nhận ra tiềm năng khổng lồ của ngành mới nổi này.

**Rèn luyện năng lực kỹ thuật:**
Tại Sylvania, Trương Trung Mưu chịu trách nhiệm sản xuất các linh kiện bán dẫn và học hỏi những kiến thức cơ bản về quy trình chế tạo. Trải nghiệm này giúp ông hiểu rõ tính phức tạp và độ chính xác của việc sản xuất bán dẫn, đồng thời rèn luyện sự tỉ mỉ đối với các chi tiết kỹ thuật.

**Sự bộc lộ bước đầu của tài năng quản lý:**
Ngay cả ở những vị trí kỹ thuật cơ bản, Trương Trung Mưu đã thể hiện khả năng quản lý xuất sắc. Ông giỏi tổ chức đội ngũ và giải quyết các vấn đề kỹ thuật; ba năm kinh nghiệm này giúp ông thấu hiểu những yêu cầu khắt khe của quy trình sản xuất bán dẫn.

## Thời kỳ tại Texas Instruments: Thể hiện tài năng quản lý

### Bước ngoặt quan trọng năm 1958

**Gia nhập Texas Instruments:**
Năm 1958, Trương Trung Mưu gia nhập Texas Instruments (TI)[^5], đây là bước ngoặt quyết định trong sự nghiệp của ông. Thời điểm đó, TI đang dốc toàn lực mở rộng mảng kinh doanh bán dẫn và rất cần những nhân tài có khả năng kết nối giữa kỹ thuật và quản lý.

**Từ kỹ sư đến nhà quản lý:**
Tại TI, Trương Trung Mưu bắt đầu từ vị trí kỹ sư bán dẫn, phụ trách các công việc sản xuất wafer. Ông không chỉ thể hiện sự xuất sắc về mặt kỹ thuật mà còn bộc lộ tài năng quản lý vượt trội, nhanh chóng nhận được sự trọng dụng từ cấp trên.

**Đóng góp vào cải tiến quy trình:**
Trong thời gian làm việc tại TI, Trương Trung Mưu đã cải thiện đáng kể quy trình bán dẫn của công ty, nâng cao tỷ lệ sản phẩm đạt chuẩn (yield rate) và hiệu suất sản xuất. Những cải tiến kỹ thuật này đã giúp công ty tiết kiệm được lượng lớn chi phí và mang lại danh tiếng cho ông.

### Học cao học tại Đại học Stanford

**Cơ hội học tập năm 1961:**
Năm 1961, TI hỗ trợ Trương Trung Mưu đến Đại học Stanford để theo đuổi bằng Tiến sĩ Kỹ thuật Điện. Đây là sự công nhận của công ty đối với năng lực của ông, đồng thời cho thấy tầm quan trọng mà các doanh nghiệp Mỹ dành cho việc đào tạo nhân tài.

**Thành quả từ bằng Tiến sĩ:**
Năm 1964, Trương Trung Mưu nhận bằng Tiến sĩ Kỹ thuật Điện tại Đại học Stanford.[^6] Quá trình tu nghiệp này đã giúp ông nâng cao cả chiều sâu lý thuyết lẫn mạng lưới quan hệ trong ngành; sau khi trở lại TI, ông lập tức được thăng chức.

**Vai trò mới khi trở lại công ty:**
Sau khi tốt nghiệp Tiến sĩ, Trương Trung Mưu quay lại TI và đảm nhận các vị trí quản lý cấp cao hơn. Ông lần lượt giữ chức Tổng giám đốc các bộ phận: Transistor Germanium, Transistor Silicon và Bộ phận Mạch tích hợp (IC), địa vị của ông tại TI tăng dần theo kết quả kinh doanh qua từng năm.

### Phá vỡ rào cản sắc tộc

**Sự thăng tiến lịch sử năm 1972:**
Năm 1972, Trương Trung Mưu được bổ nhiệm làm Phó Tổng giám đốc tập đoàn Texas Instruments[^7], trở thành một trong những quản lý cấp cao người Hoa cao nhất tại một doanh nghiệp lớn của Mỹ thời bấy giờ. Sự thăng tiến này là một thành tựu cực kỳ hiếm thấy trong môi trường kinh doanh tại Mỹ lúc đó.

**Tổng giám đốc mảng bán dẫn:**
Đồng thời, ông giữ chức Tổng giám đốc mảng bán dẫn của Texas Instruments, phụ trách bộ phận kinh doanh cốt lõi của công ty. Dưới sự lãnh đạo của ông, mảng bán dẫn của TI đã phát triển nhanh chóng, trở thành nhà cung cấp bán dẫn lớn trên toàn cầu.

**Tổng kết 25 năm tại Mỹ:**
Trong 25 năm tại Texas Instruments, Trương Trung Mưu đã đi từ một kỹ sư cơ bản lên đến vị trí lãnh đạo cao cấp, thấu hiểu sâu sắc nhịp độ kỹ thuật và logic kinh doanh của ngành bán dẫn. Kinh nghiệm này giúp ông có những phán đoán thị trường chính xác hơn bất kỳ ai có nền tảng thuần học thuật khi ông trở về Đài Loan khởi nghiệp vào năm 1987.

## Tiếng gọi từ Đài Loan: Thời kỳ Viện trưởng ITRI

### Bước ngoặt cuộc đời năm 1985

**Lời mời của Tôn Vận Toàn:**
Năm 1985, Trương Trung Mưu nhận được lời mời nhiệt tình từ cựu Viện trưởng Hành chính viện Tôn Vận Toàn (Sun Yun-suan)[^8], Chủ tịch Viện Nghiên cứu Công nghệ Công nghiệp (ITRI) Từ Hiền Tu (Xu Xianxiu), Viện trưởng Hành chính viện Du Quốc Hoa (Yu Guo-hua) và Ủy viên Chính vụ Lý Quốc Đỉnh (Li Guo-ding) để đảm nhiệm chức Viện trưởng ITRI. Tôn Vận Toàn là người đã thúc đẩy phát triển ngành công nghệ cao tại Đài Loan trong thời gian dài và là nhân tố quan trọng mời Trương Trung Mưu về nước. Quyết định này đã thay đổi quỹ đạo cuộc đời ông, đồng thời thay đổi vận mệnh ngành công nghệ của Đài Loan.

**Lòng can đảm rời bỏ vùng an toàn:**
Ở tuổi 54, Trương Trung Mưu đang có một sự nghiệp thành công và cuộc sống sung túc tại Mỹ. Việc lựa chọn trở về Đài Loan là một quyết định đầy rủi ro và thách thức, thể hiện sứ mệnh của ông đối với sự phát triển công nghệ của Đài Loan.

**Cải cách ITRI:**
Trong nhiệm kỳ Viện trưởng ITRI, Trương Trung Mưu đã thúc đẩy sự kết hợp chặt chẽ giữa nghiên cứu và phát triển (R&D) với thực tiễn công nghiệp, sử dụng tư duy quản lý kiểu Mỹ để chỉnh đốn hướng nghiên cứu của ITRI. Tầm nhìn quốc tế của ông đã giúp ITRI chuyển mình từ một cơ quan nghiên cứu của chính phủ thành một vườn ươm công nghệ có ý thức thương mại cao hơn.

### Đánh giá về ngành bán dẫn Đài Loan

**Phân tích môi trường công nghiệp:**
Trương Trung Mưu đã đánh giá kỹ lưỡng môi trường và lợi thế công nghiệp của Đài Loan. Ông cho rằng Đài Loan sở hữu đội ngũ kỹ sư ưu tú, chi phí thấp và năng lực sản xuất linh hoạt — những điều kiện rất phù hợp để phát triển ngành sản xuất bán dẫn.

**Ý tưởng về mô hình gia công:**
Trong thời gian tại ITRI, Trương Trung Mưu bắt đầu suy nghĩ về một mô hình kinh doanh mang tính cách mạng — gia công chip chuyên nghiệp (foundry). Ý tưởng này đến từ sự thấu hiểu sâu sắc của ông về xu hướng ngành và là kết tinh của nhiều năm kinh nghiệm thực tế.

**Tầm quan trọng của sự hỗ trợ từ chính phủ:**
Trương Trung Mưu nhận thức được rằng việc phát triển ngành bán dẫn cần sự hỗ trợ đầy đủ từ chính phủ, bao gồm đầu tư vốn, phối hợp chính sách và đào tạo nhân tài. Ông đã giao tiếp chặt chẽ với các quan chức chính phủ để giành được cấu trúc đặc biệt cho sự ra đời của TSMC: bao gồm chuyển giao công nghệ từ ITRI và sự góp vốn từ chính phủ.

## Sự ra đời của TSMC: Sự đổi mới năm 1987

### Đổi mới mô hình gia công chuyên nghiệp

**Sự đột phá trong triết lý gia công:**
Năm 1987, Trương Trung Mưu đưa ra khái niệm đổi mới về "gia công wafer chuyên nghiệp"[^11]. Khác với mô hình Nhà sản xuất linh kiện tích hợp (IDM) truyền thống, TSMC sẽ chỉ tập trung vào việc gia công sản xuất chip cho khách hàng mà không tự thiết kế sản phẩm của riêng mình.

**Tính cách mạng của mô hình kinh doanh:**
Tính cách mạng của mô hình này nằm ở chỗ nó cho phép vô số công ty không có khả năng xây dựng nhà máy vẫn có thể thiết kế các loại chip tiên tiến, làm giảm đáng kể rào cản gia nhập ngành bán dẫn, giúp các công ty thiết kế chip tăng trưởng theo cấp số nhân từ thập niên 1990 đến thập niên 2020.

**Tác động đến hệ sinh thái ngành:**
Mô hình gia công chuyên nghiệp đã tạo ra một hệ sinh thái công nghiệp hoàn toàn mới, cho phép các công ty thiết kế tập trung vào đổi mới, còn các nhà máy gia công tập trung vào sản xuất, thực hiện sự phân công lao động chuyên môn hóa và nâng cao hiệu quả của toàn ngành.

### Quá trình thành lập TSMC

**Thời khắc lịch sử ngày 21 tháng 2 năm 1987:**
Ngày 21 tháng 2 năm 1987, Công ty Sản xuất Chất bán dẫn Đài Loan chính thức được thành lập với tổng vốn đầu tư khoảng 145 triệu USD: Chính phủ đầu tư 70 triệu USD chiếm 48,3%, Philips (Hà Lan) đầu tư 40 triệu USD chiếm 27,5%, và các bên tư nhân đóng góp 35 triệu USD chiếm 24,2%[^9]. Đây là thành quả của sự hợp tác giữa chính phủ, doanh nghiệp tư nhân và nhà đầu tư nước ngoài.

**Thiết kế cấu trúc cổ phần:**
Cấu trúc cổ phần của TSMC bao gồm ITRI, Philips (Hà Lan) và các doanh nghiệp tư nhân Đài Loan[^10]. Cấu trúc đa dạng này đã mang lại cho TSMC nguồn lực về công nghệ, vốn và thị trường.

**Vai trò kép của Trương Trung Mưu:**
Trương Trung Mưu đảm nhiệm chức Chủ tịch kiêm Tổng giám đốc (sau này đổi thành CEO), chịu trách nhiệm về chiến lược tổng thể và vận hành hàng ngày của công ty. Phong cách lãnh đạo của ông là sự kết hợp giữa hiệu quả quản lý kiểu Mỹ và trí tuệ văn hóa Hoa ngữ.

## Quá trình phát triển của TSMC

### Thách thức và đột phá thời kỳ đầu

**1987-1990: Giai đoạn khởi nghiệp gian nan:**
Thời kỳ đầu thành lập, TSMC đối mặt với những thách thức khổng lồ. Gia công chuyên nghiệp là một mô hình kinh doanh hoàn toàn mới, thị trường còn nhiều nghi ngại và khách hàng cần thời gian để chấp nhận khái niệm này. Trương Trung Mưu vừa phải xây dựng năng lực sản xuất, vừa phải thuyết phục khách hàng.

**Xây dựng năng lực kỹ thuật:**
Công nghệ ban đầu của TSMC đến từ sự chuyển giao của ITRI và hợp tác với Philips. Trương Trung Mưu đã dẫn dắt đội ngũ học hỏi và cải tiến nhanh chóng công nghệ quy trình, thiết lập được năng lực sản xuất đáng tin cậy.

**Khai phá nhóm khách hàng đầu tiên:**
Nhóm khách hàng đầu tiên của TSMC chủ yếu là các công ty bán dẫn không có nhà máy (Fabless) tại Mỹ. Những công ty này chính là những bên cần dịch vụ gia công chuyên nghiệp, tạo nên nền tảng kinh doanh sơ khai cho TSMC.

### Sự phát triển nhanh chóng trong thập niên 1990

**Chiến lược dẫn đầu về công nghệ:**
Trong thập niên 1990, Trương Trung Mưu đã đề ra chiến lược "dẫn đầu công nghệ", đầu tư mạnh mẽ vào R&D để đảm bảo TSMC không bao giờ tụt hậu so với đối thủ trong mỗi thế hệ quy trình. TSMC liên tục xây dựng thêm nhiều nhà máy tại Đài Loan, mở rộng tệp khách hàng từ các công ty Fabless Mỹ ban đầu sang các ông lớn thiết kế toàn cầu như Qualcomm, Broadcom và Nvidia.

### Vị thế dẫn đầu trong thế kỷ 21

**Cạnh tranh quy trình tiên tiến:**
Bước sang thế kỷ 21, việc phát triển công nghệ quy trình bán dẫn ngày càng trở nên khó khăn và đắt đỏ hơn. Nhờ mức đầu tư R&D hàng năm cao hơn mức trung bình ngành, TSMC đã duy trì được vị thế dẫn đầu trong lĩnh vực quy trình tiên tiến.

**Đột phá từ 28nm đến 5nm:**
Từ 28nm đến 16nm, 7nm, rồi đến 5nm và 3nm, TSMC luôn giữ vững sự tiên phong về công nghệ trong mỗi thế hệ quy trình, củng cố vị thế của mình tại phân khúc thị trường cao cấp.

**Cột mốc hợp tác với Apple:**
Sự hợp tác với Apple bắt đầu từ dòng chip A series năm 2013, khi TSMC gia công bộ vi xử lý cốt lõi cho iPhone và iPad. Điều này mang lại quy mô đơn hàng khổng lồ, đồng thời giúp năng lực quy trình tiên tiến của TSMC nhận được sự kiểm chứng thương mại nghiêm ngặt nhất.[^12]

## Triết lý kinh doanh và quản trị

### Kiên trì đổi mới công nghệ

**Chú trọng đầu tư R&D:**
Trương Trung Mưu luôn nhấn mạnh tầm quan trọng của đổi mới công nghệ. TSMC dành khoảng 8% doanh thu hàng năm cho R&D để đảm bảo không bị tụt hậu so với đối thủ.[^13] Trong thời đại Định luật Moore đang đối mặt với các giới hạn vật lý, dưới nhiệm kỳ của ông, TSMC đã hoàn thành sản xuất hàng loạt chip 7nm; các tiến trình 5nm (2020) và 3nm (2022) là thành quả của đội ngũ kế cận sau khi ông nghỉ hưu. Việc liên tục đẩy mạnh các quy trình tiên tiến thế hệ này đã cung cấp năng lực sản xuất cho sự phát triển của toàn bộ ngành bán dẫn.

**Sự cân bằng giữa công nghệ và thị trường:**
Trương Trung Mưu rất giỏi trong việc tìm ra điểm cân bằng giữa dẫn đầu công nghệ và nhu cầu thị trường: vừa phải duy trì lợi thế kỹ thuật, vừa phải đảm bảo giá trị thương mại để tránh việc đi quá xa dẫn đến chi phí quá cao.

### Đào tạo nhân tài và văn hóa doanh nghiệp

**Văn hóa doanh nghiệp chính trực:**
Trương Trung Mưu đã xây dựng tại TSMC một nền văn hóa doanh nghiệp lấy sự chính trực làm cốt lõi. Ông nhấn mạnh các giá trị cốt lõi: "Chính trực, Cam kết, Đổi mới, Tin cậy khách hàng", những giá trị này đã trở thành nền tảng văn hóa của TSMC.

**Coi trọng phát triển nhân tài:**
Ông rất chú trọng việc đào tạo nhân tài, thiết lập hệ thống huấn luyện kỹ sư và lộ trình thăng tiến bài bản tại TSMC. Ông tin rằng con người là năng lực cạnh tranh cốt lõi; trong khi tỷ lệ nghỉ việc của TSMC thấp hơn nhiều so với mức trung bình ngành, công ty cũng đã đào tạo ra đội ngũ lãnh đạo nòng cốt sau này như Lưu Đức Âm (Liu De-yan) và Ngụy Triết Gia (C.C. Wei).

**Phong cách quản lý quốc tế:**
Trương Trung Mưu đã đưa hiệu quả và sự minh bạch của quản lý kiểu Mỹ vào TSMC, thiết lập cấu trúc quản trị doanh nghiệp hiện đại, đồng thời lồng ghép trí tuệ văn hóa Hoa ngữ để tạo nên một nền văn hóa doanh nghiệp độc đáo.

### Tư duy chiến lược và năng lực thực thi

**Xây dựng chiến lược dài hạn:**
Trương Trung Mưu sở hữu tư duy chiến lược xuất sắc, có khả năng thấu hiểu xu hướng ngành và hoạch định chiến lược phát triển dài hạn. Chiến lược "dẫn đầu công nghệ" của TSMC chính là minh chứng cho tầm nhìn này.

**Coi trọng năng lực thực thi:**
Bên cạnh việc lập chiến lược, ông cũng cực kỳ chú trọng vào khả năng thực thi. Ông thiết lập một hệ thống quản lý chính xác để đưa các bản thiết kế kỹ thuật từ quyết định đến hiện thực hóa tại nhà máy, đây là chìa khóa giúp TSMC bắt kịp nhịp độ của mọi thế hệ quy trình.

**Trí tuệ ứng phó khủng hoảng:**
Khi đối mặt với các cuộc khủng hoảng và thách thức, Trương Trung Mưu đã thể hiện khả năng lãnh đạo và trí tuệ ứng phó vượt trội, dẫn dắt TSMC vượt qua nhiều giai đoạn khó khăn, duy trì sự phát triển ổn định của doanh nghiệp.

## Nghỉ hưu và kế thừa

### Lần nghỉ hưu đầu tiên năm 2005

**Khởi động kế hoạch kế vị:**
Năm 2005, ở tuổi 74, Trương Trung Mưu tuyên bố nghỉ hưu và bàn giao chức vụ CEO cho Thái Lực Hành (Tsai Li-hsing)[^14]. Đây là một phần trong kế hoạch kế vị được chuẩn bị kỹ lưỡng, thể hiện trách nhiệm của ông đối với sự phát triển bền vững của doanh nghiệp.

**Giữ lại chức vụ Chủ tịch:**
Dù rời ghế CEO, Trương Trung Mưu vẫn giữ chức Chủ tịch Hội đồng quản trị để tiếp tục tham gia vào các quyết định chiến lược quan trọng, đóng vai trò hướng dẫn và hỗ trợ đội ngũ kế cận.

**Sắp xếp cuộc sống sau nghỉ hưu:**
Sau khi nghỉ hưu, ông không hoàn toàn rời xa các hoạt động kinh doanh; ông tham dự các diễn đàn quốc tế như APEC với tư cách đại diện Đài Loan, cũng như chia sẻ quan điểm về địa chính trị và tương lai ngành bán dẫn trong nhiều bài phát biểu.

### Sự trở lại năm 2009

**Thách thức từ khủng hoảng tài chính:**
Cuộc khủng hoảng tài chính toàn cầu năm 2008 đã gây ảnh hưởng nặng nề đến TSMC, khiến công ty đối mặt với thách thức kép: doanh thu sụt giảm và cạnh tranh gay gắt. Vào thời điểm then chốt này, Trương Trung Mưu quyết định trở lại.

**Tái đảm nhiệm chức CEO:**
Năm 2009, ở tuổi 78, Trương Trung Mưu tái đảm nhiệm chức CEO của TSMC[^15], trực tiếp lãnh đạo công ty vượt qua giai đoạn khó khăn. Sự trở lại của ông đã ổn định niềm tin thị trường và cung cấp năng lực lãnh đạo cho sự phục hồi của công ty.

**Đào tạo Lưu Đức Âm và Ngụy Triết Gia:**
Trong nhiệm kỳ thứ hai, Trương Trung Mưu tập trung đào tạo các ứng viên kế vị như Lưu Đức Âm và Ngụy Triết Gia, chuẩn bị sẵn sàng nhân tài cho tương lai phát triển của công ty.

### Chính thức nghỉ hưu năm 2018

**Hoàn tất kế hoạch kế thừa:**
Tháng 6 năm 2018, ở tuổi 87, Trương Trung Mưu chính thức nghỉ hưu, kết thúc sự nghiệp huyền thoại kéo dài 31 năm tại TSMC[^16]. Ông bàn giao chức Chủ tịch cho Lưu Đức Âm và chức CEO cho Ngụy Triết Gia.

**Thiết lập chế độ "Song thủ trưởng" (Hai người đứng đầu):**
Trương Trung Mưu đã thiết lập mô hình "Song thủ trưởng", trong đó Lưu Đức Âm đảm nhiệm vai trò Chủ tịch phụ trách đối ngoại, còn Ngụy Triết Gia làm CEO phụ trách đối nội; sự sắp xếp này giúp công ty phát triển ổn định.

**Hình mẫu của sự lùi bước đúng lúc:**
Sự nghỉ hưu của Trương Trung Mưu được xem là hình mẫu cho việc chuyển giao quyền lực trong doanh nghiệp: ông rút lui vào thời điểm thích hợp để tạo không gian cho thế hệ lãnh đạo mới tỏa sáng, đồng thời đảm bảo quá trình chuyển đổi ổn định.

## Tác động đến ngành bán dẫn toàn cầu

### Đổi mới mô hình kinh doanh

**Sự phổ biến của mô hình gia công chuyên nghiệp:**
Mô hình gia công chuyên nghiệp do Trương Trung Mưu tạo ra đã trở thành một trong những mô hình kinh doanh tiêu chuẩn của ngành bán dẫn. Hiện có hàng trăm công ty bán dẫn không nhà máy trên thế giới đang dựa vào dịch vụ của các xưởng gia công, điều này đã thúc đẩy mạnh mẽ sự phát triển của toàn ngành.

**Tái cấu trúc hệ sinh thái ngành:**
Mô hình này đã tái định hình hệ sinh thái bán dẫn, thúc đẩy phân công lao động chuyên môn hóa, nâng cao hiệu quả ngành và hạ thấp rào cản đổi mới, cho phép nhiều công ty hơn có thể tham gia vào lĩnh vực thiết kế chip.

**Xây dựng chuỗi cung ứng toàn cầu:**
TSMC đã trở thành nút thắt then chốt trong chuỗi cung ứng bán dẫn toàn cầu, cung cấp dịch vụ sản xuất cho các công ty công nghệ trên khắp thế giới, thiết lập nên một chuỗi cung ứng ngành bán dẫn thực sự mang tính toàn cầu.

### Thúc đẩy tiến bộ kỹ thuật

**Dẫn đầu về quy trình công nghệ:**
Dưới sự lãnh đạo của Trương Trung Mưu, TSMC đã duy trì vị trí dẫn đầu toàn cầu về công nghệ quy trình, thúc đẩy sự tiến bộ kỹ thuật của toàn ngành bán dẫn và kéo dài sức sống của Định luật Moore.

**"Dân chủ hóa" các quy trình tiên tiến:**
Các dịch vụ quy trình tiên tiến của TSMC cho phép ngay cả các công ty thiết kế quy mô nhỏ cũng có thể sử dụng những công nghệ mới nhất, thực hiện việc "dân chủ hóa" quy trình tiên tiến — một startup Fabless chỉ với vài chục nhân viên cũng có thể yêu cầu TSMC sản xuất hàng loạt chip 7nm.

**Khai phá các lĩnh vực công nghệ mới:**
Năng lực sản xuất của TSMC bao phủ nhiều lĩnh vực ứng dụng khác nhau như chip kỹ thuật số, bộ tăng tốc AI, bán dẫn ô tô, cung cấp nền tảng sản xuất cho mọi loại công nghệ mới nổi.

## Ý nghĩa đối với Đài Loan: Người đặt nền móng cho Đảo Công nghệ

### Phát triển ngành công nghiệp công nghệ

**Xây dựng "Ngọn núi hộ quốc":**
TSMC được gọi là "Ngọn núi hộ quốc" của Đài Loan không chỉ vì giá trị kinh tế khổng lồ, mà còn vì vị thế chiến lược then chốt trong chuỗi cung ứng công nghệ toàn cầu. Trương Trung Mưu đã giúp Đài Loan xây dựng một quân bài chiến lược khó thay thế nhất ngoài lĩnh vực quốc phòng.

**Đào tạo nhân tài công nghệ:**
Sự phát triển của TSMC đã nuôi dưỡng một lượng lớn nhân tài chuyên môn về bán dẫn; những nhân tài này không chỉ hỗ trợ sự phát triển của TSMC mà còn cung cấp nền tảng nhân lực cho toàn bộ ngành công nghệ Đài Loan.

**Hình thành cụm công nghiệp:**
Lấy TSMC làm trung tâm, Đài Loan đã hình thành nên các cụm công nghiệp bán dẫn bao gồm nhà cung cấp thiết bị, vật liệu và các xưởng đóng gói, kiểm thử, tạo ra giá trị công nghiệp cực lớn.

### Đóng góp vào phát triển kinh tế

**Đóng góp quan trọng vào GDP:**
TSMC đã trở thành doanh nghiệp lớn nhất Đài Loan, có đóng góp rất quan trọng vào GDP của hòn đảo. Sự thành công của công ty cũng thúc đẩy sự phát triển của các ngành liên quan và tạo ra vô số cơ hội việc làm.

**Trụ cột thương mại xuất khẩu:**
Bán dẫn chiếm khoảng một phần ba tổng kim ngạch xuất khẩu của Đài Loan; sự thành công của TSMC đã nâng cao đáng kể vị thế của Đài Loan trong thương mại toàn cầu và tăng cường sức cạnh tranh kinh tế của hòn đảo[^17].

**Cải thiện môi trường đầu tư:**
Câu chuyện thành công của TSMC đã thu hút thêm nhiều vốn đầu tư quốc tế, cải thiện môi trường đầu tư tại Đài Loan và nâng cao vị thế của hòn đảo trong mắt các nhà đầu tư toàn cầu.

### Ảnh hưởng địa chính trị

**Tầm quan trọng của chủ quyền công nghệ:**
Trong bối cảnh địa chính trị hiện nay, công nghệ bán dẫn đã trở thành quân bài cốt lõi trong cuộc cạnh tranh giữa các cường quốc. Việc TSMC nắm giữ các quy trình tiên tiến nhất thế giới giúp Đài Loan có một vị thế chiến lược khó thay thế trong cộng đồng quốc tế.

**Quân bài trong quan hệ quốc tế:**
Vị thế then chốt của TSMC trong chuỗi cung ứng công nghệ toàn cầu cho phép Đài Loan có tiếng nói mà ngay cả các cường quốc cũng phải coi trọng trong các vấn đề bán dẫn. Việc Mỹ, EU và Nhật Bản liên tục đưa ra các gói trợ cấp để mời gọi TSMC xây dựng nhà máy đã minh chứng cho sức nặng thực sự của vị thế này.

**Cân nhắc chiến lược an ninh:**
Sự chú trọng của các quốc gia vào công nghệ bán dẫn cũng khiến Đài Loan đối mặt với những thách thức và cơ hội an ninh mới. Việc làm thế nào để cân bằng lợi ích các bên và duy trì lợi thế cạnh tranh của TSMC là một trong những vấn đề cốt lõi trong chính sách ngoại giao và an ninh của Đài Loan.

## Đặc điểm cá nhân và phong cách lãnh đạo

### Sự kết hợp giữa tầm nhìn và năng lực thực thi

**Tầm nhìn chiến lược xuất sắc:**
Đặc điểm lớn nhất của Trương Trung Mưu là tầm nhìn chiến lược vượt trội. Ông có khả năng thấu hiểu xu hướng ngành và dự báo hướng phát triển tương lai; tầm nhìn này chính là yếu tố then chốt dẫn đến thành công của TSMC.

**Năng lực thực thi thực tế:**
Bên cạnh tầm nhìn, ông còn có năng lực thực thi xuất sắc. Ông có thể chuyển hóa các ý tưởng chiến lược thành các kế hoạch hành động cụ thể và theo sát từng chi tiết thực hiện; sự kết hợp giữa tư duy chiến lược và khả năng thực thi này là điều cực kỳ hiếm thấy trong giới doanh nghiệp.

**Thái độ học tập suốt đời:**
Ngay cả khi đã cao tuổi, Trương Trung Mưu vẫn duy trì thói quen đọc sách rộng rãi và quan tâm đến sự phát triển của ngành. Ông giữ thói quen đọc hai cuốn sách tiếng Anh mỗi tháng; ông đã đọc tạp chí _The New Yorker_ liên tục trong 70 năm mà không ngừng nghỉ; chính ông cũng nói rằng những cuốn sách đó "không phải là văn học". Thái độ này giúp tư duy của ông luôn sắc bén ngay cả ở tuổi xế chiều.

### Đặc điểm phong cách lãnh đạo

**Lãnh đạo lôi cuốn:**
Trương Trung Mưu sở hữu sức hút cá nhân mạnh mẽ và khả năng thuyết phục cao, có thể truyền cảm hứng cho đội ngũ cùng nỗ lực vì mục tiêu chung. Các bài phát biểu và bài viết của ông luôn diễn đạt rõ ràng những khái niệm phức tạp, nhận được sự kính trọng từ nhân viên và giới chuyên môn.

**Kiên định trong quyết định lý tính:**
Khi đối mặt với các quyết định lớn, Trương Trung Mưu luôn kiên trì phân tích lý tính, đưa ra phán đoán dựa trên sự thật và dữ liệu, tránh để cảm xúc hay các cân nhắc chính trị làm ảnh hưởng đến tính đúng đắn của quyết định.

**Thực hành tư duy dài hạn:**
Trương Trung Mưu luôn kiên định với tư duy dài hạn, không bị tác động bởi những khó khăn hay lợi ích ngắn hạn. Ngay cả trong giai đoạn sâu sắc nhất của cuộc khủng hoảng tài chính năm 2008, ông vẫn phê duyệt ngân sách R&D cho các quy trình tiên tiến; chính tầm nhìn dài hạn này đã giúp TSMC nới rộng khoảng cách với đối thủ sau khủng hoảng.

## Vinh danh và công nhận

### Giải thưởng và sự công nhận quốc tế

**Huy chương danh dự IEEE:**
Trương Trung Mưu đã nhận được nhiều huy chương danh dự từ Hiệp hội Kỹ sư Điện và Điện tử (IEEE), đây là sự công nhận quan trọng cho những đóng góp của ông trong việc phát triển công nghệ bán dẫn.

**Tiến sĩ danh dự từ các quốc gia:**
Nhiều trường đại học như Đại học Thanh Hoa, Đại học Giao thông, Đại học Đài Loan đã trao bằng Tiến sĩ danh dự cho Trương Trung Mưu để vinh danh những đóng góp của ông trong ngành công nghệ và giáo dục.

**Đánh giá từ các tạp chí kinh doanh:**
Trương Trung Mưu nhiều lần được các tạp chí kinh doanh quốc tế như _Fortune_, _BusinessWeek_ xếp vào nhóm những nhà lãnh đạo công nghệ hàng đầu đương đại, khẳng định vị thế của ông trong giới kinh doanh toàn cầu.

### Sự biểu dương tại Đài Loan

**Trao tặng huy chương chính phủ:**
Chính phủ Đài Loan đã trao tặng Trương Trung Mưu nhiều huy chương quan trọng nhằm vinh danh những đóng góp xuất sắc của ông đối với sự phát triển kinh tế và tiến bộ công nghệ của Đài Loan.

**Sự tôn kính từ giới công nghiệp:**
Trong giới sản xuất tại Đài Loan, Trương Trung Mưu được tôn vinh là "Cha đẻ ngành bán dẫn"; kinh nghiệm và trí tuệ của ông đã trở thành hình mẫu cho các doanh nhân thế hệ sau học tập.

**Công nhận tầm ảnh hưởng xã hội:**
Bên cạnh những thành tựu kinh doanh, tầm ảnh hưởng xã hội của Trương Trung Mưu cũng được công nhận rộng rãi; những đóng góp của ông đối với sự phát triển xã hội Đài Loan nhận được đánh giá cao từ mọi tầng lớp.

## Suy ngẫm triết học và trí tuệ nhân sinh

### Hiểu về thành công

**Sự kết hợp giữa thực lực và cơ hội:**
Trương Trung Mưu cho rằng thành công cần có sự kết hợp giữa thực lực và cơ hội; thực lực là nền tảng, nhưng cũng cần phải nắm bắt được thời cơ. Ông nhấn mạnh tầm quan trọng của sự chuẩn bị: cơ hội luôn dành cho những người đã sẵn sàng.

**Giá trị của sự kiên trì dài hạn:**
Ông nhấn mạnh tầm quan trọng của việc kiên trì lâu dài, tin rằng thành công thực sự cần sự tích lũy theo thời gian và không thể nóng vội cầu thành. Thành công của TSMC chính là kết quả của sự kiên trì bền bỉ đó.

**Sự tất yếu của đổi mới:**
Trương Trung Mưu cho rằng trong ngành công nghệ, đổi mới là điều kiện tiên quyết để sinh tồn. Lịch sử của TSMC đã chứng minh: chỉ cần ngừng đột phá về quy trình, các đối thủ cạnh tranh sẽ ngay lập tức lấp đầy khoảng trống đó.

### Cảm ngộ về cuộc đời

**Cân bằng giữa công việc và cuộc sống:**
Dù sự nghiệp vô cùng thành công, Trương Trung Mưu cũng nhấn mạnh tầm quan trọng của việc cân bằng giữa công việc và cuộc sống. Ông yêu thích đọc sách và nghe nhạc, những sở thích này đã nuôi dưỡng tinh thần cho ông.

**Gánh vác trách nhiệm xã hội:**
Trương Trung Mưu tin rằng các doanh nhân thành đạt có trách nhiệm đóng góp lại cho xã hội. Ông đã dẫn dắt TSMC quyên góp cho các tổ chức học thuật như Đại học Thanh Hoa, đồng thời tham gia thảo luận về chính sách giáo dục và đưa ra những kiến nghị cụ thể cho công cuộc cải cách giáo dục đại học tại Đài Loan.[^18]

**Tầm quan trọng của sự kế thừa:**
Ông rất coi trọng việc truyền thụ kiến thức và kinh nghiệm, không chỉ đào tạo người kế vị trong nội bộ doanh nghiệp mà còn chia sẻ trí tuệ của mình thông qua nhiều con đường khác nhau.

## Đánh giá lịch sử

Khi Trương Trung Mưu nghỉ hưu vào năm 2018, vốn hóa của TSMC đã vượt qua Intel, trở thành doanh nghiệp bán dẫn có giá trị nhất thế giới.[^19] Trong suốt 31 năm, ông đã chứng minh một mệnh đề đi ngược lại trực giác: một nhà máy gia công không tự thiết kế chip của mình có thể trở thành nền tảng sản xuất cho cả kỷ nguyên kỹ thuật số.

Từ Ninh Ba, Chiết Giang đến Harvard, MIT, rồi từ quản lý cấp cao tại Texas Instruments đến việc từ bỏ cuộc sống an nhàn tại Mỹ ở tuổi 54 để về Đài Loan; mỗi bước ngoặt của ông đều không phải là lựa chọn theo số đông, nhưng kết quả cuối cùng đều chỉ về một hướng duy nhất. Vị thế của TSMC ngày nay vừa là kết quả của sự cạnh tranh công nghệ bán dẫn, vừa là kết quả của việc đặt cược vào một mô hình kinh doanh mà ít người tin tưởng vào năm 1987 đó.

Vốn hóa của TSMC lần đầu tiên vượt mốc 10 nghìn tỷ Đài tệ vào tháng 7 năm 2020 và vượt mốc 20 nghìn tỷ Đài tệ vào tháng 3 năm 2024, trở thành một trong những doanh nghiệp công nghệ có vốn hóa lớn nhất châu Á[^20]. Đây là quy mô mà chính ông cũng khó lòng tưởng tượng nổi khi thực hiện cú đặt cược vào năm 1987, và cũng là dấu ấn rõ nét nhất cho cuộc đời ông.

## Đọc thêm

- [Doanh nghiệp Đài Loan: TSMC](/vi/economy/tsmc) — Ngọn núi hộ quốc do ông thành lập bằng mô hình gia công wafer năm 1987, nay có vốn hóa vượt 60 nghìn tỷ, chính là minh chứng trọn vẹn nhất về Trương Trung Mưu.
- [施振榮 (Shi Zhenrong)](/vi/people/stan-shih) — Người sáng lập Acer, người đã mời ông làm thành viên Hội đồng quản trị TSMC trong 21 năm và cũng là tác giả của "Đường cong nụ cười"; mà phần "sản xuất trung đoạn" mà TSMC đang làm chính là đoạn bị coi là kém tiềm năng trên đường cong đó nhưng thực tế lại đáng giá nhất.
- [郭台銘 (Guo Taiming)](/vi/people/terry-gou) — Một doanh nhân Đài Loan khác đã thay đổi thế giới nhờ "gia công"; sự gia công lắp ráp của Hon Hai và gia công wafer của TSMC là hai con đường đưa sản xuất Đài Loan vươn ra toàn cầu.
- [Ngành bán dẫn](/vi/technology/taiwan-semiconductor-industry) — Từ việc chuyển giao công nghệ RCA năm 1976 đến khi trở thành Ngọn núi hộ quốc, đây là chiến trường công nghiệp mà Trương Trung Mưu đã một tay đưa Đài Loan vào cuộc.
- [黃崇仁 (Huang Chong-jen)](/vi/people/frank-huang-psmc) — Người đã tìm đến Trương Trung Mưu vào cuối thập niên 1990 khi PSMC suýt bị United Microelectronics (UMC) thâu tóm; ông đang đi trên một con đường khác đầy rẫy hiểm nguy của ngành bán dẫn Đài Loan.
- [Chuyển đổi và nâng cấp công nghiệp Đài Loan](/vi/economy/industrial-transformation-from-manufacturing-to-innovation) — TSMC là ví dụ cụ thể nhất về việc Đài Loan chuyển mình từ "Đảo gia công" thành "Đảo công nghệ", đồng thời là tọa độ cốt lõi của cuộc chuyển đổi kéo dài bốn thập kỷ này.

---

## Tài liệu tham khảo

[^1]: Trương Trung Mưu sinh ngày 10 tháng 7 năm 1931 tại thành phố Ninh Ba, tỉnh Chiết Giang, Trung Quốc. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^2]: Nhập học Đại học Harvard năm 1949 để theo học văn học, một năm sau chuyển sang ngành Kỹ thuật Cơ khí tại MIT. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^3]: Nhận bằng Cử nhân Kỹ thuật Cơ khí tại MIT năm 1952. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^4]: Làm việc tại Sylvania trong lĩnh vực sản xuất bán dẫn khoảng ba năm từ năm 1955. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^5]: Gia nhập Texas Instruments (TI) làm kỹ sư bán dẫn vào năm 1958. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^6]: Nhận bằng Tiến sĩ Kỹ thuật Điện tại Đại học Stanford năm 1964. Xem: Mục từ Wikipedia tiếng Anh "Morris Chang" <https://en.wikipedia.org/wiki/Morris_Chang>

[^7]: Được bổ nhiệm làm Phó Tổng giám đốc tập đoàn kiêm Tổng giám đốc mảng bán dẫn của Texas Instruments vào năm 1972. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^8]: Tôn Vận Toàn (1913–2006), từng giữ chức Viện trưởng Hành chính viện (1978–1984), người đã thúc đẩy mạnh mẽ ngành bán dẫn và công nghệ trong nhiệm kỳ của mình. Xem: Mục từ Wikipedia "Tôn Vận Toàn" <https://zh.wikipedia.org/wiki/%E5%AD%AB%E9%81%8B%E7%92%87>

[^9]: TSMC thành lập ngày 21 tháng 2 năm 1987; Chính phủ đầu tư 70 triệu USD chiếm 48,3%, Philips 40 triệu USD chiếm 27,5%, tư nhân 35 triệu USD chiếm 24,2%. Xem: Mục từ Wikipedia "Taiwan Semiconductor Manufacturing Company" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^10]: Các cổ đông thời kỳ đầu của TSMC bao gồm công ty Philips (Hà Lan). Xem: Mục từ Wikipedia "Taiwan Semiconductor Manufacturing Company" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^11]: Năm 1987, Trương Trung Mưu đề xuất mô hình kinh doanh thuần gia công "gia công wafer chuyên nghiệp". Xem: Mục từ Wikipedia "Taiwan Semiconductor Manufacturing Company" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^12]: Từ thập niên 2010, TSMC bắt đầu gia công các bộ vi xử lý di động như dòng A của Apple, và sau năm 2013 đã trở thành nhà cung cấp chip cốt lõi chính cho iPhone. Xem: Mục từ Wikipedia "Taiwan Semiconductor Manufacturing Company" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^13]: TSMC duy trì mức đầu tư R&D hàng năm khoảng 8% doanh thu (tỷ lệ này có biến động nhẹ theo báo cáo thường niên). Xem: Mục từ Wikipedia "Taiwan Semiconductor Manufacturing Company" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^14]: Năm 2005, Trương Trung Mưu rời ghế CEO, Thái Lực Hành kế nhiệm. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^15]: Năm 2009, ở tuổi 78, Trương Trung Mưu trở lại đảm nhiệm chức CEO của TSMC do cuộc khủng hoảng tài chính toàn cầu. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^16]: Ngày 5 tháng 6 năm 2018, Trương Trung Mưu chính thức nghỉ hưu, Lưu Đức Âm làm Chủ tịch, Ngụy Triết Gia làm CEO. Xem: Mục từ Wikipedia "Trương Trung Mưu" <https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80>

[^17]: [Kinh tế Đài Loan — Wikipedia tiếng Trung](https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%B6%93%E6%BF%9F) — Bán dẫn chiếm khoảng 30% tổng kim ngạch xuất khẩu của Đài Loan trong nhiều năm.

[^18]: [Doanh nghiệp thúc đẩy giáo dục: Khánh thành "Tòa nhà TSMC - Học viện Quản lý Công nghệ" — Đại học Quốc lập Thanh Hoa](https://www.nthu.edu.tw/hotNews/content/708) — TSMC quyên góp 180 triệu New Taiwan dollar để xây dựng "Tòa nhà TSMC" tại Học viện Quản lý Công nghệ thuộc Đại học Thanh Hoa, hoàn thành vào tháng 4 năm 2008; đơn vị quyên góp là TSMC, không phải cá nhân Trương Trung Mưu.

[^19]: Khi Trương Trung Mưu nghỉ hưu năm 2018, vốn hóa của TSMC đã vượt qua Intel. Xem: Mục từ Wikipedia "Taiwan Semiconductor Manufacturing Company" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

[^20]: Vốn hóa TSMC lần đầu vượt mốc 10 nghìn tỷ Đài tệ vào ngày 21 tháng 7 năm 2020, và vượt mốc 20 nghìn tỷ Đài tệ vào ngày 8 tháng 3 năm 2024. Xem: Mục từ Wikipedia "Taiwan Semiconductor Manufacturing Company" <https://zh.wikipedia.org/wiki/%E5%8F%B0%E7%81%A3%E7%A9%8D%E9%AB%94%E9%9B%BB%E8%B7%AF%E8%A3%BD%E9%80%A0>

_Tài liệu tham khảo:_

- [Tự truyện của Trương Trung Mưu (Tập thượng và hạ)](https://www.books.com.tw/products/0010784799)
- [Báo cáo thường niên và dữ liệu chính thức của TSMC](https://investor.tsmc.com/english/annual-reports)
- [Viện Nghiên cứu Công nghệ Công nghiệp (ITRI)](https://www.itri.org.tw/)
- [Mục từ Wikipedia "Trương Trung Mưu"](https://zh.wikipedia.org/zh-hant/%E5%BC%B5%E5%BF%A0%E8%AC%80)
- [Dữ liệu liên quan đến Trương Trung Mưu tại Đại học Quốc lập Thanh Hoa](https://www.nthu.edu.tw/)
