---
title: 'Ngành công nghiệp bán dẫn: Cuộc cách mạng vật liệu 50 năm từ chuyển giao công nghệ RCA đến GaN và đóng gói lượng tử'
description: 'Đài Loan thống trị các công nghệ tiên tiến toàn cầu thông qua mô hình gia công, nhưng GaN trong đầu nạp nhanh, CoWoS dưới chip AI, và bộ làm lạnh tách biệt trên qubit lượng tử chỉ là khởi đầu của trận chiến khoa học vật liệu 50 năm tiếp theo.'
date: 2026-03-17
category: 'Technology'
tags:
  [
    'bán dẫn',
    'TSMC',
    'Đài Tích Điện',
    'GaN',
    '3D packaging',
    'CoWoS',
    'lượng tử',
    'công nghệ tiên tiến',
    'tính tự lực',
    'khoa học vật liệu',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-19
lastHumanReview: true
difficulty: 'intermediate'
readingTime: 22
image: '/article-images/technology/silicon-vs-gan-charger-2025.webp'
imageCredit: '4300streetcar'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg'
sporeLinks:
  - id: 87
    platform: 'threads'
    date: '2026-05-25'
    url: 'https://www.threads.com/@taiwandotmd/post/DYvqEURgXm-'
  - id: 88
    platform: 'x'
    date: '2026-05-25'
    url: 'https://x.com/taiwandotmd/status/2058735515021783190'
translatedFrom: 'Technology/半導體產業.md'
sourceCommitSha: '1ec0df23'
sourceContentHash: 'sha256:8647f4437b5dfe36'
sourceBodyHash: 'sha256:d7402441fbb7f358'
translatedAt: '2026-08-09T10:41:15+08:00'
---

# Ngành công nghiệp bán dẫn: Cuộc cách mạng vật liệu 50 năm từ chuyển giao công nghệ RCA đến GaN và đóng gói lượng tử

![Hai đầu nạp USB-C 30W có cùng công suất xếp cạnh nhau để so sánh, bên trái làm từ vật liệu silicon có kích thước rõ ràng lớn hơn, bên phải làm từ GaN nhỏ gọn hơn gần một nửa, phản ánh cách khoa học vật liệu nén mật độ năng lượng vào lòng bàn tay](/article-images/technology/silicon-vs-gan-charger-2025.webp)
_So sánh kích thước đầu nạp USB-C 30W cùng công suất: Si vs GaN. Photo: 4300streetcar, 2025-12-25. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg)._

> **Tóm tắt 30 giây:** Đài Tích Điện (TSMC) bắt đầu sản xuất hàng loạt công nghệ 2 nanomet tại Fab 22 Cao Hùng từ quý 4 năm 2025, dẫn trước toàn cầu 2-3 thế hệ[^2]. Nhưng câu chuyện không chỉ xảy ra ở nơi transistor được tạo nhỏ hơn: đầu nạp nhanh trong cặp bạn của bạn chứa GaN, Môi Địa Tinh sản xuất miếng silicon carbide (SiC) 8 inch ở Trung Lạc, tất cả GPU Blackwell của NVIDIA đều dựa vào công nghệ đóng gói CoWoS của Đài Tích Điện gửi tới trung tâm dữ liệu. Từ năm 1973 khi viện nghiên cứu công nghiệp chi 4,5 triệu đô la mua công nghệ từ RCA[^5], đến năm 2026 khi viện khoa học trung ương hoàn thành chip qubit siêu dẫn 20 qubit kết nối internet[^6], Đài Loan đã trải qua một con sông dài của khoa học vật liệu từ vật lý khe năng lượng đến lắng đọng lớp nguyên tử đến qubit lượng tử tôpô. Núi thần bảo vệ dựa vào 50 năm kinh nghiệm gia công, nhưng vị trí gia công trong kỷ nguyên lượng tử, Đài Loan chưa chiếm lĩnh.

Vào một chiều năm 1985, ủy viên chính vụ Lý Quốc Đế tìm thấy Trương Trung Mưu, người vừa quay lại làm giám đốc viện nghiên cứu công nghiệp, tại Viện Hành pháp. Lý Quốc Đế nói thẳng: "Chúng tôi muốn thành lập một công ty sản xuất mạch tích hợp siêu lớn, bạn hãy chủ trì điều này."

Trương Trung Mưu ngỡ ngàng. Anh tưởng mình chỉ tới làm giám đốc viện, nhưng hai tuần sau, anh được kéo tới thành lập một công ty với mô hình kinh doanh chưa từng có ai thử.

Cuộc hội thoại này thay đổi thế giới. Nhưng nhìn lại 40 năm sau, "thế giới" lớn hơn nhiều so với những gì cuộc hội thoại chiều hôm đó tưởng tượng. Nó bao gồm một đầu nạp 65 watt nhỏ bằng hai khớp tay cạnh điện thoại của bạn, bao gồm mỗi GPU Blackwell mà NVIDIA ăn ở trung tâm dữ liệu, và cũng bao gồm qubit lượng tử trong phòng thí nghiệm viện khoa học trung ương cần được hạ xuống gần độ không tuyệt đối mới thức dậy.

## 1987 năm đó: Một sự cược về gia công

![Bên ngoài nhà máy Fab 5 của TSMC tại Công viên Khoa học Tân Trúc, với các tòa nhà công nghiệp nhiều tầng kết nối với Phố Phục Hưng, là nhà máy đại diện của giai đoạn mở rộng của TSMC những năm 1990](/article-images/technology/tsmc-fab5-hsinchu-2010.webp)
_Nhà máy Fab 5 của TSMC tại Công viên Khoa học Tân Trúc, năm 2010. Photo: Peellden. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG)._

Câu chuyện phải bắt đầu từ sớm hơn. Năm 1973, viện nghiên cứu công nghiệp chi 4,5 triệu đô la để mua công nghệ mạch tích hợp từ công ty RCA của Mỹ, cử 19 kỹ sư sang Mỹ đào tạo[^5]. Không ai lúc bấy giờ hình dung rằng khoản "học phí" này sẽ trở thành viên đá tảng đầu tiên của vương quốc bán dẫn Đài Loan. Năm 1980, viện nghiên cứu công nghiệp chuyển giao công nghệ thành lập công ty Liên Hoa Điện Tử, Đài Loan có được công ty bán dẫn đầu tiên. Nhưng Lý Quốc Đế không thỏa mãn: Liên Hoa quá nhỏ, công nghệ không theo kịp tiêu chuẩn quốc tế, Đài Loan cần một bước đột phá lớn hơn.

Ngày 21 tháng 2 năm 1987, Trương Trung Mưu thành lập công ty Đài Tích Điện tại Công viên Khoa học Tân Trúc, khởi tạo một mô hình kinh doanh chưa từng có tiền lệ: **gia công thuần túy**.

Ý tưởng này nghe lại rất điên. Tất cả công ty bán dẫn trên thế giới đều tích hợp theo chiều dọc, từ thiết kế đến sản xuất, làm sao có thể chỉ sản xuất mà không thiết kế? Khách hàng có dám giao cho bạn những bản vẽ thiết kế bí mật nhất của họ không?

Logic của Trương Trung Mưu rất đơn giản: ngành bán dẫn ngày càng phức tạp, thiết kế và sản xuất là hai lĩnh vực kỹ thuật hoàn toàn khác nhau. Thay vì làm tất cả mà không làm tốt cái gì, tốt hơn là tập trung làm tốt một việc, biến sản xuất chip thành điều tốt nhất trên thế giới.

Cơ cấu cổ phần ban đầu của Đài Tích Điện rất tối ưu: chính phủ đầu tư 48,3%, tư nhân đầu tư 24,2%, công ty Philips của Hà Lan nắm giữ 27,6%[^1]. Sự tham gia của Philips là chìa khóa. Lúc đó ngành bán dẫn bị Mỹ và Nhật Bản độc quyền, châu Âu cần nhà cung cấp thay thế. Philips không chỉ đầu tư, mà còn giao các đơn hàng chip của riêng mình cho Đài Tích Điện, trở thành khách hàng quan trọng đầu tiên.

Mô hình gia công kích hoạt sự phân công lao động lớn trong ngành bán dẫn: công ty thiết kế IC chuyên tâm thiết kế chip (Qualcomm, NVIDIA, MediaTek), nhà máy gia công chuyên tâm sản xuất (Đài Tích Điện, Liên Hoa Điện Tử, Công ty Thành lập tương lai), nhà máy đóng gói và kiểm tra chịu trách nhiệm quá trình sau (Nhật Nguyệt Quang, Silicon Brand). Trước đây, chỉ những ông lớn như Intel, IBM mới có khả năng chi trả cho khoản đầu tư thiên văn cho nhà máy wafer, bây giờ bất kỳ công ty khởi nghiệp nào có ý tưởng tốt cũng có thể thiết kế chip, rồi giao cho Đài Tích Điện sản xuất.

Cốt lõi của mô hình gia công là sự tin tưởng. Khách hàng phải tin tưởng rằng Đài Tích Điện sẽ không ăn cắp thiết kế của họ, sẽ không làm lộ bí mật kinh doanh, sẽ không cạnh tranh với họ. Đài Tích Điện xây dựng một bộ "quy tắc tin tưởng" với bốn nguyên tắc: trung lập công nghệ (không bao giờ tự thiết kế chip), bình đẳng khách hàng (tất cả khách hàng nhận cùng công nghệ và dịch vụ), hiệp định bảo mật mức cao nhất, phân phối năng lực công bằng. Bộ quy tắc này được thực hiện gần 40 năm mà không bao giờ vi phạm.

> 📝 **Ghi chú từ người đóng gói nội dung**: Năm 1987 ở Đài Loan, 19 kỹ sư RCA của viện nghiên cứu công nghiệp mới vừa bước sang 40 tuổi. Họ học công nghệ silicon của người Mỹ từ những năm 1960, không ai lúc bấy giờ tưởng rằng 30 năm sau họ sẽ trở thành bên được giao các công nghệ đóng gói tốt nhất trên thế giới. Và quyết định của Đài Tích Điện không tự thiết kế chip - một loại "tự thiệt thòi", lại trở thành thứ khiến Hoàng Nhân Huân, Tim Cook, Tổng giám đốc AMD không thể rời bỏ. Điểm tuyệt vời của mô hình gia công không nằm ở những gì nó làm, mà ở **cái nó chọn không làm**. Nếu lần theo nguồn gốc xa hơn, năm 1947 Bell Lab phát minh transistor, năm 1958 Texas Instruments và Fairchild mỗi công ty tạo ra mạch tích hợp, năm 1949 chính phủ Quốc Dân Đảng di cư sang Đài Loan mang theo một nhóm quan chức kỹ thuật có nền tảng kỹ thuật (những xương sống sau của viện nghiên cứu công nghiệp) — khoản 4,5 triệu đô la từ RCA là baton tiếp sức, không phải điểm xuất phát.

## Lâm Bản Kiên và ASML: Cuộc cược giữa hai cậu bé dưới nước

Gia công không phải chuyện của riêng Đài Tích Điện. Độc giả [@malathrone_21k_running](https://www.threads.com/@malathrone_21k_running) bổ sung trong phần bình luận dòng lịch sử chính này: huyết thống Philips cùng gốc của Đài Tích Điện còn có ASML — công ty máy tế bào mở rộng hơn được tách ra từ Philips Hà Lan năm 1984, ngày hôm nay là nhà cung cấp máy EUV (tia cực tím cực) toàn cầu duy nhất. Hai công ty đều là những cậu bé không được giới ngành công nghiệp để ý 30 năm trước[^asml-philips].

Chìa khóa của câu chuyện là một kỹ sư Đài Loan tên là Lâm Bản Kiên (Burn J. Lin). Từ năm 1992, anh làm công nghệ tế bào mở rộng tại Trung tâm Nghiên cứu Watson của IBM, năm 2000 anh quay lại Đài Loan gia nhập Đài Tích Điện làm giám đốc R&D[^lin-bio]. Cuộc tranh luận về con đường tiếp theo của máy tế bào mở rộng thời đó là tia cực tím sâu 157 nanomet, Nikon và Intel cược vào điều này, nhưng 157nm liên tục gặp vấn đề: thấu kính fluorit rõ kết tinh đôi, màng mỏng hấp thụ quá mạnh ở bước sóng này, tích hợp quy trình khó khăn[^157nm-fail].

Năm 2002, Lâm Bản Kiên đưa ra một ý tưởng điên rồ tại hội nghị quang học SPIE: "Giữ nguồn sáng 193 nanomet, nhưng bơm nước vào giữa thấu kính và wafer." Chiết suất của nước là 1,44, ánh sáng 193 nanomet trong nước tương đương độ phân giải khoảng 134 nanomet — tốt hơn cả 157nm, lại không cần đổi nguồn sáng, không cần đổi thấu kính[^immersion-litho].

Nikon không tin, tiếp tục cược vào 157nm. ASML sẵn sàng cược — nó cũng chỉ là một cậu bé, giống Đài Tích Điện đang tìm cách lấy lại bằng được thông qua một kỹ thuật tốt. Năm 2003, ASML bắt đầu phát triển máy tế bào mở rộng 193nm (193i), năm 2007 sản xuất hàng loạt đầu tiên, từ công nghệ 65 nanomet một đường hỗ trợ **sáu thế hệ** cho đến ngày hôm nay đối với con người thế chân EUV[^immersion-litho][^cw-lin-interview].

"Nikon vì sợ nóng không dám làm immersion, ASML và chúng tôi chỉ phải tự làm", dòng công nghệ này đẩy Nikon xuống khỏi ngai vàng nhà sản xuất máy tế bào mở rộng[^cw-lin-interview]. Ba mươi năm trước hai cậu bé mỗi người cược một cái, ngày hôm nay một cái là nhà cung cấp máy EUV toàn cầu duy nhất, cái kia là nhà máy gia công 2 nanomet duy nhất trên toàn thế giới. Hai hạt giống mà Philips Hà Lan gieo rắc cách đây ba mươi năm, được sát cạnh nhau ở thế kỷ 21.

## 50 năm phổ vật liệu: từ silicon đến GaN đến siêu dẫn tôpô

Để hiểu chiến trường bán dẫn năm 2025, trước hết phải hiểu một đường vật lý không bao giờ được giải thích rõ ràng.

Silicon (Si) là điểm bắt đầu của đường này. "Khe năng lượng" (band gap) của nó là 1,1 electron-volt (eV), đây là năng lượng tối thiểu mà một electron phải chi để nhảy từ vùng dẫn điện sang vùng hóa trị. Khe năng lượng nhỏ, chip dễ làm, nhưng có hai trần: điện áp cao sẽ sụp đổ, tần số cao sẽ phát nóng. PanSci nói rõ giới hạn này: "Tần số hoạt động cực hạn của bán dẫn sử dụng silicon chỉ dưới 100k, nếu vượt quá 100k, hiệu suất chuyển đổi sẽ giảm mạnh, hơn nữa còn lãng phí năng lượng lớn."[^7]

Gallium nitride (GaN) có khe năng lượng 3,4 eV, gấp 3 lần silicon. Giới hạn điện áp sụp đổ gấp 10 lần silicon. Tần số hoạt động có thể kéo lên 1000K, cao hơn silicon một cấp bậc toàn bộ[^7]. Con số vật lý này dịch sang cuộc sống hàng ngày: cùng một công suất, cuộn dây cảm ứng của biến áp GaN có thể nhỏ hơn nhiều, yêu cầu tản nhiệt cũng thấp hơn nhiều, bởi vậy đầu nạp 65 watt nhỏ xíu được sinh ra.

Silicon carbide (SiC) đi một con đường khác. Nó cũng là vùng cấm rộng (khe năng lượng 3,26 eV), nhưng chịu nhiệt độ và áp suất cao hơn. PanSci chỉ rõ chiến trường của nó: "Carbide silicon thì sở hữu độ ổn định tốt ở nhiệt độ và áp suất cao, đặc biệt là trong nhu cầu nạp nhanh xe điện trong tương lai, nhu cầu nạp 1000 volt trở lên sẽ khiến bán dẫn silicon chỉ có thể chịu 600 volt không thể xoay sở, dự kiến sẽ tiếp nhận các thành phần chính trên xe điện."[^7]

> 💡 **Bạn có biết không**: "Khe năng lượng" của bán dẫn quyết định nó chịu được điện áp cao bao nhiêu, chạy nhanh bao nhiêu, phát nóng bao nhiêu. Silicon 1,1 eV là nền tảng của 50 năm điện tử tiêu dùng; GaN 3,4 eV hỗ trợ nạp nhanh điện thoại 240 watt; SiC 3,26 eV đi vào bộ biến đổi 800 volt của xe điện; trạm tiếp theo có thể là kim cương 5,5 eV. Toàn bộ phổ vật liệu là một bậc thang "mật độ năng lượng leo lên", mỗi bậc Đài Loan leo, phải thương lượng lần với giới hạn vật lý của khoa học vật liệu.

Trạm tiếp theo chưa được đặt tên: có thể là kim cương (C, khe năng lượng 5,5 eV), gallium oxide (Ga₂O₃, 4,8 eV), hoặc đi vào cơ chế vật lý hoàn toàn khác, ví dụ siêu dẫn tôpô (topological superconductor), đây là con đường mà Microsoft công bố vào tháng 2 năm 2025 với bộ xử lý lượng tử Majorana 1[^15]. Vật lý thay đổi, toàn bộ chuỗi cung ứng sẽ được viết lại.

## GaN bên trong đầu nạp nhanh của bạn

Thu chân cảnh về túi của bạn.

Sạc của Nokia 3310 có công suất 4,56 watt, năm 2025 đầu nạp nhanh 240 watt. Chênh lệch 52 lần. PanSci đã tổng hợp dòng thời gian này: "Bây giờ đầu nạp GaN được yêu thích nhất có công suất lên đến 65 watt, chênh lệch 13 lần, tính toán lý tưởng thời gian nạp cũng sẽ ngắn xuống một phần mười ba."[^7] Còn dữ dội hơn là thương hiệu Trung Quốc realme năm 2023 đầu năm ra mắt siêu nạp nhanh GT Neo5 240 watt, đưa con số này lên hơn 50 lần.

Đường cong tăng trưởng này trong vật lý dựa trên chuyển sang GaN, nhưng độ dày dây đồng và kích thước pin lại đều giảm. Để nâng cao công suất lại giảm kích thước, cách trực tiếp nhất là nâng tần số hoạt động, nhưng "tần số hoạt động cực hạn của bán dẫn sử dụng silicon chỉ dưới 100k"[^7], đây chính là "giới hạn silicon" mà PanSci nói đến. GaN nâng tần số hoạt động lên 1 MHz trở lên, biến áp và cuộn dây cảm ứng đồng loạt nhỏ lại, toàn bộ đầu nạp có thể nhồi vào túi áo.

Vấn đề là: chính khi thị trường nạp nhanh Đài Loan sắp bùng nổ, Đài Tích Điện công bố một việc, **năm 2027 tháng 7 thoát khỏi gia công GaN**[^8].

Quyết định này phía sau là hai áp lực. Một là nhà máy GaN Trung Quốc (Hoa Sơn vi, Sĩ Lan vi, Thuận Năng, v.v.) mở rộng năng lực lớn, ép giá gia công xuống mức Đài Tích Điện không muốn nhận. Hai là lợi nhuận từ chip AI quá ngon, Đài Tích Điện muốn sửa lại nhà máy GaN thành dây chuyền đóng gói tiên tiến (CoWoS). Chuyển giao kỹ thuật cho Thế giới Tiên tiến (VIS) và GlobalFoundries, gánh nặng gia công GaN Đài Loan giao cho Ổn Cảm (3163) và Hùng Kiệp Khoa học (8086), những hãng đã bắt đầu cược từ mười năm trước[^8].

> ⚠️ **Quan điểm gây tranh cãi**: Đài Tích Điện thoát khỏi gia công GaN, bên ngoài có hai cách hiểu. Một phe cho rằng đây là "giữ năng lực cho AI" lựa chọn hợp lý, lợi nhuận trên mỗi miếng wafer 3 nanomet cao hơn 20 lần so với GaN 6 inch, phân phối năng lực tất nhiên phải giảm về cái được lợi nhuận cao. Phe kia nghi ngờ: Đài Loan buông GaN tương đương trao phần vật liệu cơ sở thế hệ tiếp theo của điện tử tiêu dùng (điện thoại / máy tính xách tay / sạc) cho nhà máy Trung Quốc, "thặng dư" của "thặng dư silicon" không phải chỉ còn lại phía AI? Khác biệt giữa hai phe nằm ở chỗ: bạn cho rằng giá trị của Núi thần bảo vệ là "công nghệ tiên tiến không thể thay thế", hay "toàn bộ tính tự lực của chuỗi cung ứng".

Cho dù công ty nào, từ Đài Tích Điện, công ty wafer lớn Môi Địa Tinh, các công ty bán dẫn lớn quốc tế ngoài nước, đều đã lên tàu này[^7]. Nhưng lên loại ghế nào, là hai chuyện.

## Miếng wafer SiC 8 inch của Môi Địa Tinh

Nếu GaN là câu chuyện nạp nhanh điện thoại, thì SiC là câu chuyện xe điện.

Nhà máy lõi của dòng SiC Đài Loan là Môi Địa Tinh (GlobalWafers), không phải Đài Tích Điện. Năm 2024, Môi Địa Tinh kéo năng lực SiC 6 inch lên khoảng 20.000 miếng mỗi tháng, tự phát triển lò kéo dài từ 3 cái lên 20 cái, tỷ lệ tốt trên 50%[^9]. Năm 2025 wafer SiC 8 inch sản xuất hàng loạt, đây là lần đầu tiên Đài Loan.

CEO của Môi Địa Tinh Từ Tú Lan luôn nói thẳng: "Trung Mỹ Tính thành lập 'tập đoàn IDM ảo', hướng vào nhu cầu SiC 5 năm tới! Chúng tôi đuổi theo rất nhanh."[^9] Chiến lược là buộc công ty mẹ Trung Mỹ Tính trong tương lai kéo dài (Môi Địa Tinh kéo dài), lớp epitaxy (Bạn Thành), module (Hồng Dương Bán dẫn) thành một chuỗi.

Nhưng SiC không phải câu chuyện đi lên theo một đường thẳng. Nửa sau năm 2025, nhà máy SiC Trung Quốc (Tam An Quang Điện, Thiên Khoa Hợp Đạt, v.v.) mở rộng năng lực điên cuồng, cung cấp toàn cầu bị dư thừa, tỷ lệ sử dụng năng lực SiC 6 inch và 8 inch của Môi Địa Tinh một thời gian dưới 50%[^10]. Điều này so với kịch bản năm 2023 bài báo PanSci lạc quan dự đoán "nhu cầu xe điện tiếp nhận", còn có một thung lũng.

Tín hiệu phục hồi lại đến từ NVIDIA. Có tin đồn NVIDIA nền tảng GPU Rubin thế hệ tiếp theo sẽ sử dụng SiC ở lớp giữa, kết hợp với kiến trúc trung tâm dữ liệu áp suất một chiều cao 800 volt, năm 2027 sản xuất hàng loạt toàn diện[^10]. Nếu tin đồn này đúng sự thật, năng lực SiC 8 inch của Môi Địa Tinh sẽ chuyển từ xe điện sang trung tâm dữ liệu AI, câu chuyện toàn bộ sẽ được thắp sáng lại.

> 📝 **Ghi chú từ người đóng gói nội dung**: GaN và SiC thường bị gọi chung là "bán dẫn loại thứ ba", nhưng ý nghĩa ngành công nghiệp này ở Đài Loan không chỉ là nhãn "vật liệu thế hệ tiếp theo" — nó đại diện cho lần đầu tiên Đài Loan **vòng qua Đài Tích Điện** mà vẫn có chuỗi cung ứng hoàn chỉnh trong lĩnh vực. Kéo dài Môi Địa Tinh, sản xuất Hàn Lôi, đóng gói Ổn Cảm, thiết kế Hùng Kiệp Khoa học: ngoài Núi thần bảo vệ, vẫn còn một "đỉnh loại thứ ba" yên tĩnh nhưng độc lập đang phát triển.

## Hoàng Nhân Huân và sự ràng buộc của CoWoS+

Quay trở lại chiến trường AI.

GPU H100 của NVIDIA sử dụng công nghệ 4 nanomet của Đài Tích Điện, cộng với đóng gói CoWoS-S để tích hợp bộ nhớ băng thông cao HBM3. Blackwell B200 nâng cấp lên CoWoS-L, tích hợp hai GPU Blackwell cộng một CPU Grace, tốc độ huấn luyện AI nhanh hơn H100 4 lần[^11]. Thế hệ tiếp theo Rubin dự tính năm 2026 ra mắt.

Cốt lõi của mỗi thế hệ GPU là "công nghệ tiên tiến + đóng gói tiên tiến" cái động cơ kép này. Công nghệ tạo transistor nhỏ hơn, đóng gói tạo các chip khác nhau (die) xếp gần nhau hơn. PanSci dùng so sánh Đài 9 và hầm tuyết Tuyết Sơn nói về việc này: "Đóng gói truyền thống cần phải đi qua Đài 9 cong 18 vòng, trong khi đóng gói tiên tiến lái thẳng, dùng đục hầm Tuyết Sơn để kết nối hai địa điểm, khiến dữ liệu đi lại trở nên thuận tiện và nhanh chóng hơn."[^12]

CoWoS (Chip-on-Wafer-on-Substrate) được cốt lõi là "Silicon Thủ" (through-silicon via, TSV): xếp các chip khác nhau cùng nhau, dùng những ống dẫn siêu nhỏ nằm ngang đi qua nền silicon, khiến hai mạch điện ban đầu tách biệt trở nên liên kết lên không gian ba chiều. PanSci mô tả thẳng thắn: "Xếp chồng ba chiều có thể đặt chip C trên chip A, dùng công nghệ Silicon Thủ đi xuyên qua nền silicon được mỏng lại, dùng dây dẫn mật độ siêu cao kết nối hai mạch điện, khoảng cách của hai cái từ đó từ chân trời biến thành cách tay."[^12]

Con số năng lực gây chấn động hơn. Năng lực hàng tháng CoWoS của Đài Tích Điện khoảng 35.000 miếng cuối năm 2024, năm 2025 cuối năm mục tiêu tăng lên 75.000 miếng, năm 2028 muốn tiến tới 150.000 miếng, tỷ lệ tăng trưởng hằng năm gần 80%[^13]. NVIDIA trực tiếp ký hợp đồng độc quyền năng lực CoWoS của Đài Tích Điện cho tới năm 2027, mà **tất cả chip bất kể sản xuất ở nhà máy Đài Tích Điện nào (bao gồm Ari Zona), cuối cùng đều phải gửi lại Đài Loan để đóng gói CoWoS**[^13].

Đây là sự độc quyền kép của Hoàng Nhân Huân và Đài Tích Điện. NVIDIA ở đầu thiết kế, Đài Tích Điện ở đầu sản xuất và đóng gói, hai công ty cùng nhau kìm chặt nút thắt chính của trung tâm dữ liệu AI.

Ngày 2 tháng 6 năm 2024, Hoàng Nhân Huân tại Nhà thi đấu Đài Đại diễn thuyết chính Computex, công khai thuyết minh sự ràng buộc này cho toàn thế giới nghe — tấm chiếu của đường dẫn Blackwell và Rubin, nhưng phía sau mỗi tấm chiếu đều là dây chuyền CoWoS của Đài Tích Điện.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/pKXDVsWZmUU" title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2024" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Kênh chính thức NVIDIA: Bài phát biểu chính thức của Hoàng Nhân Huân ngày 2 tháng 6 năm 2024 tại Nhà thi đấu Đài Đại Computex "The Era of AI". Toàn bộ buổi tham dự hai tiếng, anh dần mở ra GPU Blackwell, NVLink, Spectrum-X — nhưng hiện trường vật chất của mỗi tấm chiếu đều ở Bảo Sơn Tân Trúc. "Không có Đài Tích Điện, không có NVIDIA" câu nói này anh không nói ra, nhưng mỗi đồ thị năng lực đều đang nói._

Giá vật lý của đóng gói 3D cũng không nhỏ. PanSci chỉ ra bài toán: "Đóng gói tiên tiến đòi hỏi độ bằng phẳng của chip trần và yêu cầu sự căn chỉnh chip rất cao, nếu không cẩn thận khi xếp chồng sẽ có chỗ không kết nối dẫn, sẽ gây thất thoát tỷ lệ tốt. Hơn nữa, mạch tích hợp khi tính toán sẽ tạo ra thất thoát năng lượng gây tăng nhiệt độ, đóng gói tiên tiến rút gần khoảng cách giữa chip trần, truyền nhiệt sẽ ảnh hưởng lẫn nhau, ai cũng xộc chân đến nhau, gây tản nhiệt khó khăn hơn."[^12]

Giai đoạn tiếp theo là SoIC (System on Integrated Chips) và SoW-X (System on Wafer). SoIC là "ba chiều thật", wafer xếp chồng trực tiếp wafer, không có xu (bumping-free). SoW-X dự tính sản xuất hàng loạt năm 2027, kích thước quạt mặt nạ gấp 9,5 lần CoWoS hiện tại, tích hợp 16 chip tính toán lớn trở lên, khả năng tính toán cao hơn CoWoS hiện tại 40 lần[^13]. Chip AI càng phát triển càng lớn, dây chuyền đóng gói Đài Tích Điện lại giống một cái cái nhà máy nhỏ.

## ALD: Nguyên tử hàng lớp hàng lớp phát triển

![Trong tủ bảo tàng những miếng mẫu silicon wafer những kích cỡ khác nhau sắp thành hàng, cái lớn nhất đường kính khoảng 12 inch, bóng phản chiếu kiếng hiển thị sáng bóng khai quật của sản xuất bán dẫn lõi](/article-images/technology/silicon-wafers-museum-2017.webp)
_Mẫu hiển thị silicon wafer, năm 2017. Photo: ArticCynda. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg)._

3 nanomet, 2 nanomet, 1,6 nanomet. Phía sau những con số này có một công nghệ sản xuất yên tĩnh nhưng quan trọng: lắng đọng lớp nguyên tử (Atomic Layer Deposition, ALD).

ALD được phát minh bởi người Phần Lan, nhưng trở thành bước kỹ thuật hạt nhân không thể vòng qua của mỗi miếng wafer công nghệ tiên tiến ở Đài Loan.

Câu chuyện phải bắt đầu từ Phần Lan. Năm 1974, nhà khoa học vật liệu Tuomo Suntola tại công ty Phần Lan Instrumentarium Oy bắt đầu phát triển ALD. Năm 1977 công nghệ hình thành, đầu tiên lộ diện trong triển lãm công nghiệp[^14]. Lúc bấy giờ công nghệ này chỉ làm cho màn hình phát sáng điện, chính Suntola cũng không lường được 30 năm sau nó sẽ trở thành mạch máu của công nghệ nanomet. Năm 1999, anh bán công nghệ ALD cho công ty thiết bị bán dẫn ASM của Hà Lan. Hôm nay ASM sở hữu hơn 55% thị phần thị trường ALD[^14].

PanSci mô tả nguyên tắc ALD rất sạch sẽ: "Lắng đọng lớp nguyên tử là công nghệ lắng đọng hóa học khí cải tiến, nó chia quá trình lắng đọng thành hai bước. Trước tiên, phun vào tiền chất đầu tiên, phản ứng với bề mặt đế... khi bề mặt bão hòa, phun vào tiền chất thứ hai, phản ứng với tiền chất đã dính, hình thành vật liệu mục tiêu, hoàn thành quá trình màng mỏng."[^14] Hai tiền chất lần lượt phun vào từng lần, mỗi lần chỉ phát triển một lớp màng mỏng dày một nguyên tử.

Tại sao việc này quan trọng? Vì cực gatetrơn (gate) của công nghệ 2 nanomet chỉ còn dày vài nguyên tử, lớp cách điện cực gatetrơn phải đạt độ bằng phẳng mức nguyên tử, kiểm soát độ dày cấp độ nguyên tử. Lắng đọng hóa học khí truyền thống (CVD) không làm được, lắng đọng vật lý khí (PVD) không làm được, chỉ có ALD có thể "hàng lớp hàng lớp phát triển". Mỗi nhà máy công nghệ tiên tiến Đài Tích Điện đều trang bị máy ALD của ASM, chuỗi được tạo thành từ thiết bị Hà Lan, công nghệ Phần Lan, quy trình Đài Loan này, là nền tảng vật lý để 2 nanomet có thể sản xuất hàng loạt.

> 💡 **Bạn có biết không**: Kích thước đặc trưng nhỏ nhất của công nghệ 2 nanomet khoảng 20 nguyên tử silicon xếp liền nhau chiều rộng. Nếu phóng to nguyên tử silicon thành quả bóng bàn, transistor 2 nanomet khoảng chiều dài của cái bàn bóng bàn. Công việc của ALD là trên cái bàn này "quả bóng bàn từng quả" để lát kín vật liệu cách điện.

ASM không niêm yết ở Đài Loan, nhưng hầu hết tất cả khách hàng lớn nhất của máy ALD 12 inch của nó đều ở Đài Loan. **Chuỗi cung ứng này ẩn mình nhưng không thể thay thế**, Đài Tích Điện 2 nanomet một khi không sản xuất hàng loạt trơn tru, trên thế giới không có nhà máy ALD thứ hai nào có thể lấp vị trí thay thế.

## 2nm rồi đến lượng tử

Câu chuyện phía sau độ angstrom (angstrom, 1 nanomet = 10 angstrom), Đài Tích Điện vẫn chưa viết xong.

Quý 4 năm 2025, Đài Tích Điện tại Fab 22 Cao Hùng bắt đầu sản xuất 2 nanomet hàng loạt, Bảo Sơn Tân Trúc Fab 20 sẽ theo sau[^2]. Lần đầu tiên 2 nanomet sử dụng kiến trúc transistor nanosheet GAA (Gate-All-Around), bỏ FinFET được sử dụng từ 22 nanomet trở lại 3 nanomet[^16]. 2 nanomet tương đương 20 nguyên tử silicon chiều rộng, đã gần chạm vào biên giới lý thuyết vật lý. Khách hàng đầu tiên bao gồm chip loạt A của Apple và chip AI của NVIDIA, năng lực công nghệ 2 nanomet sẽ mở rộng từng quý[^3].

Trạm kế tiếp là 1,6 nanomet (A16), dự tính quý 4 năm 2026 sản xuất hàng loạt, lần đầu tiên đưa vào "mạng cung cấp năng lượng mặt sau" (Backside Power Delivery Network), Đài Tích Điện đặt tên riêng của mình là Super Power Rail[^16]. Cùng tiêu thụ năng lượng so với N2P nhanh hơn 10%, cùng hiệu suất tiết kiệm 15-20% điện.

Nhưng 1,6 nanomet rồi sao? Nút công nghệ xuống càng đi càng đắt. Công nghệ 28 nanomet chi phí R&D khoảng 1 tỷ đô la Mỹ, 7 nanomet nhảy tới 3 tỷ, 3 nanomet bay lên 10 tỷ, 2 nanomet ước tính hơn 20 tỷ[^4]. Đường cong chỉ mũ định luật Moore đưa chi phí R&D phần cuối thành con số thiên văn học, đây cũng là cái PanSci nói "độ phức tạp phát triển công nghệ tiên tiến và chi phí đầu tư gia tăng theo kiểu chỉ mũ, lại đầu tư hầu như luôn không tương xứng với lợi nhuận"[^12].

Vì vậy ngành bán dẫn thay đổi chiến lược: mở rộng ngang biến thành xếp chồng dọc (đóng gói 3D), silicon thay bằng vật liệu mới (GaN/SiC), cuối cùng có thể chuyển sang vật lý tính toán hoàn toàn khác, ví dụ tính toán lượng tử.

Dòng thời gian của viện khoa học trung ương diễn ra như thế này. Tháng 10 năm 2023, hoàn thành phát triển máy tính lượng tử siêu dẫn 5 qubit. Ngày 29 tháng 1 năm 2024 tổng thống Thái Anh Văn thăm viếng, máy tính lượng tử chính thức kết nối internet[^6]. PanSci viết vào: "Tháng 1 năm 2024, máy tính lượng tử tự phát triển đầu tiên của Đài Loan chính thức được sinh ra tại viện khoa học trung ương, mặc dù chỉ có 5 qubit lượng tử, nhưng vì Đài Loan chiếm một vị trí tại sân chơi cạnh tranh máy tính lượng tử toàn cầu mở màn."[^17]

Tháng 12 năm 2025, chip qubit siêu dẫn 20 qubit hoàn thành. Tháng 1 năm 2026 công bố kết nối sử dụng[^6]. Thời gian gắn kết (coherence time T1) từ kỷ nguyên 5 qubit 15-30 microsecond, nhảy sang 20 qubit 530 microsecond. Thời gian gắn kết là thời gian qubit lượng tử có thể duy trì trạng thái (叠加 - superposed state), càng dài càng tỏ "nhiễu ít, có thể làm tính toán phức tạp hơn".

Đội quân lượng tử quốc gia đa bộ chính thức biên chế tháng 3 năm 2022, ngân sách 5 năm 8 tỷ new Taiwan đô la, 17 đội nghiên cứu[^18]. Bộ kinh tế lại tháng 4 năm 2026 thành lập "Phòng thúc đẩy công nghệ ngành lượng tử", dùng cầu nối R&D học viện với giới ngành công nghiệp.

Công ty gì viện nghiên cứu công nghiệp làm đặc biệt thú vị: dùng công nghệ 28 nanomet Đài Tích Điện làm "chip kiểm soát qubit lượng tử". Hãng tin tức trung ương tháng 3 năm 2024 trích dẫn lời của viện nghiên cứu công nghiệp: "Dùng khả năng thiết kế IC vi sóng ưu đãi của Đài Loan và công nghệ 28 nanomet Đài Tích Điện, tạo ra chip kiểm soát nhiệt độ thấp (4K, tức -269°C) và module... sẽ thay đổi những dụng cụ kiểm soát nhỏ lại, nhồi vào tủ lạnh tách biệt độ thấp, để quy mô thể tích toàn bộ thiết bị giảm 40%, đơn giản hóa những sợi dây, sở hữu lợi thế thương mại hoá... Module này tiêu thụ năng lượng tương đối so với dữ liệu công bố của những công ty lớn quốc tế giảm 50% trở lên."[^19]

> 📝 **Ghi chú từ người đóng gói nội dung**: Chiến lược lượng tử Đài Loan không nằm ở chỗ tự mình tạo qubit lượng tử (đó là vùng của IBM, Google, viện khoa học trung ương), mà là đưa mạch kiểm soát siêu nhỏ gắn vào tủ lạnh tách biệt độ thấp. Từ 5 qubit đến 20 qubit, chip kiểm soát của viện nghiên cứu công nghiệp từ 1 qubit hỗ trợ, 2 qubit, 8 qubit, dự tính 2026-2027 làm tới 20 qubit. **Trạm gia công Núi thần bảo vệ thế hệ tiếp theo muốn làm gia công thời kỷ nguyên lượng tử, chứ không phải tự mình tranh cạp bá chủ lượng tử**. Nhưng vị trí gia công này, bây giờ chưa có ai gõ lên "giao cho Đài Loan" cái móng tay đó.

## Ba con đường lượng tử: siêu dẫn, bẫy ion, tôpô

Máy tính lượng tử không phải chỉ có một con đường.

**Qubit lượng tử siêu dẫn** (superconducting qubits) là con đường IBM, Google, viện khoa học trung ương đi. Ưu điểm là quy trình tương thích với fab bán dẫn hiện tại (đây là nơi Đài Loan có trò chơi), tốc độ kiểm soát nhanh. Nhược điểm là cần tủ lạnh tách biệt gần độ không tuyệt đối (15 mK, khoảng -273°C), nhiễu cao. Google năm 2019 dùng 53 qubit "cây tùng" (Sycamore) tuyên bố đạt vượt trội lượng tử, 200 giây hoàn thành tác vụ máy tính siêu cấp truyền thống cần tính 1 vạn năm[^20].

**Qubit lượng tử bẫy ion** (trapped ion qubits) đi con đường kiểm soát một nguyên tử riêng lẻ bằng tia laser. PanSci đã tổng hợp sự khác biệt của con đường này: "Công nghệ bẫy ion dùng tia laser kiểm soát từng nguyên tử riêng để thực hiện tính toán, công nghệ này sở hữu độ chính xác rất cao và tính ổn định, nhưng cũng phải đối mặt với vấn đề độ phức tạp công nghệ và chi phí."[^17] Nhà sản xuất đại diện là IonQ và Quantinuum. Ưu điểm là độ chính xác cao, tính ổn định tốt, không cần nhiệt độ siêu thấp. Nhược điểm là tốc độ kiểm soát chậm, khó mở rộng sang nhiều qubit.

**Qubit lượng tử tôpô** (topological qubits) là thế hệ tiếp theo mà Microsoft cược vào. Tháng 2 năm 2025, Microsoft công bố bộ xử lý lượng tử tôpô Majorana 1, tuyên bố có thể mở rộng đến một triệu qubit lượng tử[^15]. Trên lý thuyết, qubit lượng tử tôpô có khả năng chống nhiễu cực mạnh, nhưng con đường này chưa trưởng thành nhất, sự tồn tại của hạt Majorana trong vật lý vẫn đang được xác minh.

Ba con đường này mỗi cái mang rủi ro. Chiến lược Đài Loan là "**bảo đảm bất kể con đường nào thắng, Đài Loan đều có nút chuỗi cung ứng**", chứ không cược một con đường duy nhất sẽ thắng. Con đường siêu dẫn dựa vào chip kiểm soát 28 nanomet Đài Tích Điện. Con đường bẫy ion cần quang học chính xác cao và ngành công nghệ quang điện Đài Loan tương thích; con đường tôpô nếu thành công, vẫn cần độ tinh khiết cực cao của màng mỏng, lại quay trở lại địa bàn ALD.

## Nhà máy nước ngoài: mở rộng hay xuất khẩu

Toàn cầu hoá của Đài Tích Điện bắt đầu gia tốc từ thập niên 2020.

**Nhà máy Ari Zona Fab 21 Mỹ**: Giai đoạn một công nghệ 4 nanomet sản xuất 2025 nửa đầu năm; giai đoạn hai 3 nanomet / 2 nanomet 2027 nửa sau năm; giai đoạn ba 2 nanomet / A16 dự tính 2030 trước. Tổng chi phí bỏ ra khoảng 165 tỷ đô la Mỹ[^21]. Nhưng có một "nhưng" quan trọng: tất cả đóng gói CoWoS chip AI vẫn chỉ ở Đài Loan, wafer được sản xuất ở nhà máy Ari Zona sẽ được gửi lại Đài Loan hoàn thành đóng gói[^13].

**Nhà máy Kumamoto Nhật Bản Fab 1**: Công nghệ 22-28 nanomet, sản xuất năm 2024, hợp tác với Sony, Toyota. Fab 2 quy hoạch ban đầu (12-16 nanomet) tiến độ không chắc chắn, một số tài nguyên được phân bổ lại sang Ari Zona.

**ESMC Dresden Đức** (Đài Tích Điện nắm giữ 40%): Chip ô tô 28 / 22 / 16 / 12 nanomet, nửa sau 2025 dịch chuyển thiết bị, sản xuất 2027, năng lực hàng tháng khoảng 40.000 miếng[^22].

Những nhà máy nước ngoài này có một "nguyên tắc N-2 chung" — **luôn luôn thụt lùi Đài Loan bản địa hai thế hệ**. Khi Đài Loan bản địa thực hiện 2 nanomet, nước ngoài tiên tiến nhất chỉ tới 4 nanomet; Đài Loan đẩy 1,6 nanomet, nước ngoài mới bước tới 3 nanomet. Dòng kỳ này viết trên lý luận công nghệ địa chính trị, không phải viết trong điều khoản hợp đồng.

> ⚠️ **Quan điểm gây tranh cãi**: Nhà máy nước ngoài là mở rộng thặng dư silicon hay làm lơi đi? Những người ủng hộ nói: công nghệ ở Đài Loan, năng lực mở rộng nước ngoài, tương đương thay đổi thặng dư silicon từ "một cái đảo" thành "một chuỗi", quá trình khử rủi ro triệt để hơn. Những người phản đối nói: mỗi lần gửi ra một nhà máy nước ngoài, gửi ra một lô kỹ sư được đào tạo, một bộ SOP sản xuất hàng loạt, một mối quan hệ khách hàng. 30 năm sau khi Ari Zona hoặc Kumamoto tích lũy tới biên giới N-2, "hai thế hệ tiên tiến nhất" có thể sẽ được nén chậm lại. Nguyên tắc N-2 bây giờ là lời hứa của Đài Tích Điện, không phải quy luật vật lý.

Song song với nhà máy nước ngoài, còn có "di cư tài năng thiết kế". Thiết kế chip AI cần không chỉ Đài Loan, Silicon Valley, Tel Aviv, New Delhi đều có trung tâm thiết kế riêng. Hệ sinh thái gia công của Đài Tích Điện đang từ từ thay đổi từ "kỹ sư toàn đảo" thành "kỹ sư toàn cầu + sản xuất toàn đảo" kiểu lai tạp.

## Giá cả môi trường: Mặt khác của Núi thần bảo vệ

Núi thần bảo vệ có trọng lượng.

Tài nguyên nước là cái trực quan nhất. Đài Tích Điện ba công viên khoa học lớn mỗi ngày tiêu thụ nước vượt 208.000 tấn, những nhóm bảo vệ môi trường ước tính năm 2025 sau nhà máy mới phát hành, lượng tiêu thụ nước có thể gia tăng 4 lần lên 770.000 tấn / ngày[^23]. Phản ứng của Đài Tích Điện là: mỗi giọt nước sử dụng trung bình 3,5 lần, tỷ lệ tái sử dụng đạt 87%, nhà máy mới mục tiêu 90%; năm 2024 lượng tiết kiệm nước mới 5,54 triệu mét khối.

Điện là chuyện thứ hai. Một nhà máy 3 nanomet toàn năm tiêu thụ điện khoảng 2,1 tỷ độ, tương đương lượng điện năm 2 vạn hộ gia đình trên toàn Đài Loan một năm. Tiêu thụ điện của 2 nanomet và 1,6 nanomet sẽ tiếp tục đi lên. Đài Tích Điện cam kết năm 2050 đạt RE100 (100% năng lượng tái tạo), nhưng cung cấp năng lượng xanh Đài Loan không theo kịp tốc độ mở rộng bán dẫn, dòng thời gian này liên tục bị áp suất thử nghiệm.

Giờ làm việc là chuyện thứ ba. Giờ làm việc của kỹ sư công viên khoa học Tân Trúc, giá nhà, tỷ lệ sinh, là chủ đề của một bài báo khác. Nhưng giống khoa học vật liệu cũng là vấn đề vật lý: thời gian và năng lượng con người cũng có "khe năng lượng", vượt quá ngưỡng sẽ sụp đổ.

Sự tồn tại của Núi thần bảo vệ, dựa trên ngoài công nghệ Đài Tích Điện, chính sách chính phủ, cơ duyên địa chính trị, còn bao gồm 17 vạn kỹ sư công viên khoa học, những nhà máy chuỗi cung ứng toàn bộ, cũng như mỗi cư dân Đài Loan sử dụng điện, sử dụng nước chung chịu chi phí này.

## Toàn bộ hệ sinh thái: Đài Loan không chỉ là Đài Tích Điện

Sức cạnh tranh của ngành bán dẫn Đài Loan có nguồn gốc từ toàn bộ tập hợp chứ không phải Đài Tích Điện một mình. Thiết kế IC đầu đó có MediaTek (top 3 toàn cầu), Liên Tính, Nhật Ý, Kỳ Cảnh; gia công wafer ngoài Đài Tích Điện, vẫn còn Liên Hoa Điện Tử, Thế giới Tiên tiến, Lực Tích Điện; đóng gói kiểm tra được Nhật Nguyệt Quang (top 1 toàn cầu), Silica Pin, Kinh Nguyên Điện chịu trách nhiệm giai đoạn sau. Bán dẫn loại thứ ba dựa vào Môi Địa Tinh (kéo dài SiC), Hàn Lôi, Ổn Cảm (GaN), Hùng Kiệp Khoa học đỡ lên; bộ nhớ do Nam Á Khoa học, Hoa Bàng Điện chịu trách nhiệm; thiết bị vật liệu đầu là công ty ẩn danh như Gia Đăng Tinh Mật, Tâm Vân, Sung Việt này những công ty bù lên.

Một chiếc chip từ thiết kế đến hoàn thành, có thể ở Đài Loan đi một vòng tròn rồi xong, không phải vượt biên vận chuyển. "Lợi thế chuỗi ngắn" này được toàn thế giới thấy ở giai đoạn COVID, từ đó viết vào từng bức giấy phòng cung ứng của công ty công nghệ lớn.

Công viên khoa học Tân Trúc thành lập 1980, tích lũy 40 năm cộng trở lên 500 cộng công ty, 17 vạn nhân viên. Kỹ sư có thể ở Đài Tích Điện ở 5 năm, nhảy sang MediaTek thiết kế chip, lại chuyển sang Nhật Nguyệt Quang chịu trách nhiệm đóng gói — sự lưu thông tài năng xuyên công ty này, để toàn bộ mức kỹ thuật ngành công nghiệp có hiệu năng phát tán.

Đối thủ cạnh tranh thì sao? Samsung Hàn Quốc chiến lược tích hợp dọc 2022-2026 chi 230 tỷ đô la Mỹ, nhưng công nghệ tiên tiến tỷ lệ tốt vẫn thụt lùi Đài Tích Điện[^4]. Intel tại 10 nanomet kẹt lâu năm, 2021 đề xuất IDM 2.0 muốn kết hợp kinh doanh thiết kế và gia công, nhưng tới 2025 gia công sự kiện vẫn không kiếm được khách hàng lớn — cái phi lý nhất là chip cao cấp chính Intel tự, lại do Đài Tích Điện gia công.

## Vị trí lượng tử vẫn còn trống

Sạc Nokia 3310 công suất 4,56 watt, năm 2025 đầu nạp nhanh 240 watt. Chênh lệch 52 lần. Đường này silicon đi 30 năm, GaN dùng 5 năm bù hoàn.

Phòng thí nghiệm lượng tử viện khoa học trung ương, chip qubit siêu dẫn cần vận hành ở 15 millikelvin (khoảng -273°C). Kỹ sư của công ty viện nghiên cứu công nghiệp dùng công nghệ 28 nanomet Đài Tích Điện làm chip kiểm soát, nén "kích thước dụng cụ kiểm soát" độ thấp này từ một tòa nhà xuống thành một cái hộp nhỏ. Khả năng bán dẫn Đài Loan, đang một chút một chút dịch chuyển biên giới của máy tính lượng tử.

Nhưng biên giới này ở đâu, không ai nói được rõ ràng. Thời gian gắn kết qubit lượng tử từ 15 microsecond sang 530 microsecond, đây chỉ mới bắt đầu. 50 năm trước kỹ sư 19 người RCA gửi đi có thể cũng không biết đó năm 1973 của mình sẽ kết tinh thành năm 2025 của 2 nanomet.

Núi thần bảo vệ dựa 50 năm kinh nghiệm gia công thống trị hiện tại. 50 năm tiếp theo, vị trí gia công kỷ nguyên lượng tử, Đài Loan chưa chiếm lĩnh.

> ✦ Blackwell của Hoàng Nhân Huân ở trên đầu bạn trong mây suy luận, wafer SiC của Môi Địa Tinh ở bên trong cút sạc điện trạm ô tô cửa bạn phát nóng, lớp ALD đầu tiên mà Suntola năm 1974 ở Phần Lan làm ra bây giờ ở trong chip điện thoại của bạn nhốt cực gatetrơn cách điện — bán dẫn từ không từng chỉ là loại gì, mà là toàn bộ phổ vật liệu trên các bậc cao năng lượng vật lý đi lên 50 năm, không chỉ thuộc một gia đình Đài Tích Điện. Bậc tiếp theo ở đâu, vật lý sẽ nói cho chúng ta, nhưng muốn hay không muốn leo, là lựa chọn của Đài Loan.

---

**Mở rộng đọc**:

- [Công ty Đài Loan: Đài Tích Điện](/vi/economy/tsmc) — Quản lý công ty, cấu trúc tài chính, quy mô chi phí bỏ ra của Núi thần bảo vệ
- [Công ty Đài Loan: MediaTek](/vi/economy/mediatek) — Lãnh đạo thiết kế IC toàn cầu top 3 chiếm vị trí thế nào trong chip điện thoại, tính toán AI cạnh
- [Công ty Đài Loan: Nhật Nguyệt Quang Bán dẫn](/vi/economy/taiwan-enterprise-ase-semiconductor) — Ngành công nghiệp đóng gói kiểm tra top 1 toàn cầu, hệ sinh thái giai đoạn sau ngoài CoWoS
- [Người tạo núi: Sự cược của thế kỷ](/vi/art/mountain-makers-tsmc-documentary) — Phim tài liệu Tiêu Cúc Trinh 2025, phỏng vấn 80+ tiền bối bán dẫn trong 5 năm, 2026 đi vào ba cái mỏ CHIPS Act Arizona / Wisconsin / Michigan
- [Võ Đại Hữu](/vi/people/tai-yu-wu) — Thập niên 1980s Đài Loan tranh đua bán dẫn cùng lúc, làm viện trưởng viện khoa học trung ương kiên quyết tầm quan trọng của khoa học căn bản, nền tảng cho hệ thống R&D Đài Loan
- [Hoàng Sùng Nhân](/vi/people/frank-huang-psmc) — Nhà sáng lập Lực Tích Điện (力晶) / Lực Tích Điện (力積電), Đài Loan DRAM dòng con đường trên phép cấp công nghệ của người khác xây nhà máy riêng: thị phần từ 23,2% rơi xuống 6,3%, phần của ngành công nghiệp ít nhất được nói
- [Ngành công nghiệp robot Đài Loan](/vi/technology/taiwan-robotics-industry) — Đảo bán dẫn thế giới top 1, sao lại bộ học trong kỷ nguyên robot? Từ việc khai mạc NCAIR nhìn rõ khoảng cách ngành công nghiệp
- [Cổ phiếu Đài Loan và thị trường vốn](/vi/economy/taiwan-stock-market) — Cạn dậu thân Đài Loan 2026 toàn cầu top 6 cơ thể, toàn bộ chuỗi cung ứng hệ sinh thái thế nào hiện rõ trong thị trường vốn
- [Chuỗi cung ứng Wolfram Đài Loan](/vi/technology/taiwan-tungsten-supply-chain) — Khinh khí hóa Wolfram 6 độ điền contact trenches và character 3D NAND, Đài Loan không có khoáng sản Wolfram lại dựa tái chế luyện đứng trên dòng chảy vật liệu giữa này
- [Trường Nhân tạo thông minh Đài Loan](/vi/technology/taiwan-ai-academy) — AIA 8 năm đào tạo vạn kỹ sư AI thế nào quay lại ICT chuỗi bán dẫn sẵn có, bù yếu điểm phần mềm Đài Loan
- [Computex: ba cái triển lãm máy tính quốc tế thu lại hai cái, cái còn lại dài ở Đài Bắc](/vi/technology/computex) — CoWoS và công nghệ tiên tiến Đài Tích Điện, mỗi năm tháng năm cuối thì ở triển lãm máy tính 45 tuổi Đài Bắc này bắt tay với những ông lớn AI toàn cầu
- [Công viên khoa học Đài Loan](/vi/technology/science-park-development) — Công viên Tân Trúc, Nam Khoa, Trung Khoa ba công viên, vật lý chứa đựng tập hợp bán dẫn, cũng là tâm địa lý của thặng dư silicon

## Nguồn ảnh

Bài viết sử dụng 3 ảnh được cấp phép CC / PD, lưu trữ trong `public/article-images/technology/` để tránh tải trực tiếp máy chủ ngồn:

- [Silicon vs GaN 30W USB-C chargers](https://commons.wikimedia.org/wiki/File:Silicon_vs_GaN_30W_USB-C_chargers.jpg) — Photo: 4300streetcar, 2025-12-25, CC BY 4.0, Wikimedia Commons file Silicon_vs_GaN_30W_USB-C_chargers.jpg
- [TSMC Fab 5 Hsinchu](https://commons.wikimedia.org/wiki/File:TSMC_Fab5.JPG) — Photo: Peellden, 2010-09-05, CC BY-SA 3.0, Wikimedia Commons file TSMC_Fab5.JPG
- [Silicon wafers museum display](https://commons.wikimedia.org/wiki/File:Silicon_wafers.jpg) — Photo: ArticCynda, 2017-10-23, CC0 public domain, Wikimedia Commons file Silicon_wafers.jpg

## Tài liệu tham khảo

[^1]: [Semiwiki — How Philips Saved TSMC](https://semiwiki.com/semiconductor-history/307560-how-philips-saved-tsmc/) — Tỉ lệ cổ phiếu của Philips theo Semiwiki xem xét nên là 27,6%; là cổ đông chính yếu quan trọng về công nghệ và khách hàng cho Đài Tích Điện lúc thành lập

[^2]: [Focus Taiwan 2025/12/30 — TSMC 2nm production](https://focustaiwan.tw/business/202512300012) — Đài Tích Điện sản xuất 2 nanomet bắt đầu từ Fab 22 Cao Hùng là nhà máy chính, Bảo Sơn Tân Trúc Fab 20 theo sau

[^3]: [Số hóa Thời đại — Đài Tích Điện 2 nanomet chính thức sản xuất](https://www.bnext.com.tw/article/89663/tsmc-2nm-volume-production) — Đài Tích Điện năm 2025 quý 4 bắt đầu sản xuất 2 nanomet; con số năng lực hàng tháng cụ thể là ước tính ngành ngoài, không phải công bố chính thức

[^4]: [Bản tin công nghệ — Tỷ lệ sử dụng công nghệ 3 nanomet Đài Tích Điện đạt 100%](https://technews.tw/2025/05/26/tsmcs-2nm-process-is-expected-to-reach-full-capacity-in-four-seasons/) — Công nghệ tiên tiến Đài Tích Điện ngành ước tính tỷ lệ tốt tốt hơn đối thủ cạnh tranh; con số tỷ lệ tốt cụ thể là ước tính bên thứ ba, không phải tiết lộ chính thức

[^5]: [Tạp chí Thiên hạ — Lý Quốc Đế và Đài Tích Điện sinh ra](https://www.cw.com.tw/article/5095492) — Năm 1987 Trương Trung Mưu thành lập Đài Tích Điện, xác lập "gia công thuần túy" kiểu thức, nền tảng cho sự phân công ngành bán dẫn toàn cầu; nền tảng năm 1973 RCA chuyển giao 4,5 triệu đô la

[^6]: [Viện Khoa học Trung ương — Công bố chip qubit siêu dẫn 20 qubit](https://www.sinica.edu.tw/News_Content/56/2375) — Viện khoa học trung ương tháng 12 năm 2025 hoàn thành chip qubit siêu dẫn 20 qubit, ngày 29 tháng 1 năm 2026 kết nối; thời gian gắn kết T1 đạt 530 microsecond

[^7]: [Khoa học quần chúng (PanSci) — GaN: dùng 1/3 thời gian, nhận cùng lượng năng lượng điện](https://pansci.asia/archives/362660) — Tác giả: Ban biên tập PanSci. Khe năng lượng GaN 3,4 eV, điện áp sụp đổ gấp 10, tần số hoạt động 1 MHz vs silicon 100 kHz; SiC ứng dụng nạp nhanh ô tô 1000 volt. Bạn hợp tác cung cấp nội dung theo MOU 2026-05-05

[^8]: [TrendForce — TSMC exits GaN foundry by July 2027](https://www.trendforce.com/news/2025/08/22/news-tsmc-reportedly-exits-gan-foundry-business-by-2027/) — Đài Tích Điện tháng 7 năm 2027 thoát khỏi gia công GaN, chuyển giao công nghệ cho Thế giới Tiên tiến (VIS) và GlobalFoundries; Ổn Cảm (3163) xuất hàng hàng tháng khoảng 500 miếng 6 inch GaN

[^9]: [Trái cây Trực tiếp — Môi Địa Tinh SiC 8 inch wafer 2025 sản xuất](https://www.fugle.tw/news/article/1234567) — Môi Địa Tinh SiC 6 inch năng lực hàng tháng cuối năm 2024 đạt 20.000 miếng, lò kéo dài tự phát triển 3 → 20 cái, tỷ lệ tốt > 50%; chiến lược "tập đoàn IDM ảo" của Từ Tú Lan

[^10]: [Bản tin công nghệ — Chuỗi cung ứng SiC chịu áp lực](https://technews.tw/2025/11/sic-market-oversupply) — Năm 2025 giữa nhà máy SiC Trung Quốc mở rộng dẫn Môi Địa Tinh SiC 6 / 8 inch tỷ lệ sử dụng năng lực dưới 50%; GPU Rubin của NVIDIA có tin đồn sử dụng lớp giữa SiC + kiến trúc trung tâm dữ liệu áp suất một chiều 800V sản xuất 2027

[^11]: [SemiAnalysis — NVIDIA Blackwell CoWoS-L Analysis](https://www.semianalysis.com/p/nvidia-blackwell-b200-cowos-l) — NVIDIA Blackwell B200 dùng CoWoS-L tích hợp 2 GPU Blackwell + 1 CPU Grace; tốc độ huấn luyện AI nhanh hơn H100 4 lần; NVIDIA độc quyền năng lực CoWoS Đài Tích Điện tới 2027

[^12]: [Khoa học quần chúng (PanSci) — Xếp chồng ba chiều: cách đóng gói tiên tiến khiến chip đi vào hầm tuyết](https://pansci.asia/archives/367588) — Tác giả: Ban biên tập PanSci. Nguyên tắc CoWoS / SoIC / TSV silicon thủ; ẩn dụ Đài 9 vs hầm Tuyết Sơn; khó khăn tỷ lệ tốt và tản nhiệt đóng gói 3D. Bạn hợp tác cung cấp nội dung per MOU 2026-05-05

[^13]: [Digitimes — TSMC CoWoS năng lực mở rộng kế hoạch](https://www.digitimes.com.tw/iot/article.asp?cat=158&id=0000696823_X1D7L8XB6JNL2Y8XLPZJK) — Năng lực hàng tháng CoWoS Đài Tích Điện cuối 2024 35.000 miếng, cuối 2025 75.000 miếng, 2028 mục tiêu 150.000 miếng; NVIDIA độc quyền năng lực tới 2027; wafer Ari Zona gửi lại Đài Loan đóng gói

[^14]: [Khoa học quần chúng (PanSci) — ALD lắng đọng lớp nguyên tử: cuộc cách mạng 50 năm của phim mỏng](https://pansci.asia/archives/377669) — Tác giả: Ban biên tập PanSci. ALD năm 1974 Suntola tại Instrumentarium Oy Phần Lan phát triển, 1977 công nghệ thành hình, 1999 bán cho ASM; ASM 55% thị phần; nguyên tắc tiền chất kép hóa học khí. Bạn hợp tác cung cấp nội dung per MOU 2026-05-05

[^15]: [Bản tin công nghệ — Microsoft Majorana 1 bộ xử lý lượng tử tôpô công bố](https://technews.tw/2025/02/20/microsoft-majorana-1-topological-qubit/) — Microsoft tháng 2 năm 2025 công bố bộ xử lý lượng tử tôpô toàn cầu đầu tiên Majorana 1, tuyên bố có thể mở rộng sang một triệu qubit lượng tử

[^16]: [Trang web TSMC — Công bố công nghệ A16 (1.6nm)](https://www.tsmc.com/english/dedicatedFoundry/technology/logic/l_2nm) — Lần đầu tiên 2 nanomet dùng GAA nanosheet transistor (bỏ FinFET); A16 lần đầu đưa vào mạng cung cấp năng lượng mặt sau (Super Power Rail), sản xuất 2026 quý 4, cùng tiêu thụ năng lượng so với N2P nhanh hơn 10%, cùng hiệu suất tiết kiệm 15-20%

[^17]: [Khoa học quần chúng (PanSci) — Công nghệ lượng tử Đài Loan: từ 5 qubit sang kỷ nguyên sản xuất](https://pansci.asia/archives/377923) — Tác giả: Ban biên tập PanSci. Viện khoa học trung ương tháng 1 năm 2024 5 qubit máy tính lượng tử sinh ra; siêu dẫn vs bẫy ion vs tôpô ba con đường; Google cây tùng 53 qubit 200 giây giải 10000 năm bài toán. Bạn hợp tác cung cấp nội dung per MOU 2026-05-05

[^18]: [iThome — Đội quân lượng tử quốc gia 5 năm 8 tỷ ngân sách](https://www.ithome.com.tw/news/151234) — Tháng 3 năm 2022 đội quân lượng tử quốc gia đa bộ biên chế, 5 năm 8 tỷ new Taiwan đô la, 17 đội nghiên cứu; tháng 4 năm 2026 bộ kinh tế thành lập phòng thúc đẩy công nghệ ngành lượng tử

[^19]: [Hãng tin tức trung ương 2024/03/06 — Chip kiểm soát lượng tử viện nghiên cứu công nghiệp](https://www.cna.com.tw/news/ait/202403060123.aspx) — Viện nghiên cứu công nghiệp dùng công nghệ 28 nanomet Đài Tích Điện tạo chip kiểm soát lượng tử 4K (-269°C), kích thước giảm 40%, tiêu thụ năng lượng so với công ty lớn quốc tế công bố giảm 50% trở lên; lộ trình phát triển 2024 một qubit → 2026-2027 20 qubit

[^20]: [TechNews — Google Sycamore lượng tử vượt trội](https://technews.tw/2019/10/24/google-sycamore-quantum-supremacy/) — Năm 2019 Google cây tùng 53 qubit máy tính lượng tử đạt vượt trội lượng tử, 200 giây hoàn thành tác vụ máy tính siêu cấp truyền thống cần tính 10000 năm

[^21]: [SemiAnalysis — TSMC Arizona Fab 21 kế hoạch đầu tư](https://www.semianalysis.com/p/tsmc-arizona-1650b-capex) — Đài Tích Điện Ari Zona Fab 21 ba giai đoạn đầu tư 165 tỷ đô la Mỹ; giai đoạn 1 (4nm) 2025 sản xuất, giai đoạn 2 (3nm/2nm) 2027, giai đoạn 3 (2nm/A16) 2030 trước; nguyên tắc N-2 nước ngoài luôn thụt lùi Đài Loan bản địa hai thế hệ

[^22]: [Digitimes — ESMC Dresden 2027 sản xuất](https://www.digitimes.com.tw/news/esmc-dresden-2027) — Đài Tích Điện ESMC nắm giữ 40%; nhà máy chip ô tô Dresden Đức 28 / 22 / 16 / 12 nanomet nửa sau 2025 dịch chuyển thiết bị, 2027 sản xuất, năng lực hàng tháng khoảng 40.000 miếng

[^23]: [Tạp chí Thiên hạ — Tiêu thụ tài nguyên nước Đài Tích Điện](https://www.cw.com.tw/article/5128456) — Đài Tích Điện ba công viên khoa học lớn ngày tiêu thụ nước hơn 208.000 tấn; nhóm bảo vệ môi trường ước tính 2025 sau nhà máy mới phát hành tiêu thụ nước tăng lên 770.000 tấn / ngày; Đài Tích Điện phản ứng mỗi giọt nước sử dụng 3,5 lần, tỷ lệ tái sử dụng 87% (nhà máy mới 90%), 2024 lượng tiết kiệm nước mới 5,54 triệu mét khối

[^asml-philips]: [Wikipedia — ASML Holding](https://en.wikipedia.org/wiki/ASML_Holding) — ASML ngày 1 tháng 4 năm 1984 tách ra từ Philips Hà Lan và ASM International (ASMI) hợp tác 50/50 thành ASM Lithography; sau niêm yết cổ phiếu 1995 ASMI thoái, hôm nay ASML là nhà cung cấp máy EUV toàn cầu duy nhất

[^lin-bio]: [Wikipedia — Burn-Jeng Lin](https://en.wikipedia.org/wiki/Burn-Jeng_Lin) — Lâm Bản Kiên sinh 1942 ở Việt Nam, từ thập niên 1970 ở Trung tâm Nghiên cứu Watson IBM làm công nghệ tế bào mở rộng, 2000 quay lại Đài Loan gia nhập Đài Tích Điện làm giám đốc R&D; 2008 nhận SPIE Frits Zernike Award; được xem là "cha đẻ của tế bào mở rộng ngập nước"

[^157nm-fail]: [Electronics Weekly — Immersion litho sidelines 157nm](https://www.electronicsweekly.com/news/research-news/process-rd/immersion-litho-sidelines-157nm-2005-05/) — Dòng 157nm bị lỗi vì thấu kính fluorit (CaF₂) khe đôi, màng mỏng hấp thụ mạnh ở 157nm, tích hợp quy trình khó khăn, 2002-2003 sau bị 193nm ngập nước thay thế; Intel + Nikon cược rơi

[^immersion-litho]: [Wikipedia — Immersion lithography](https://en.wikipedia.org/wiki/Immersion_lithography) — Lâm Bản Kiên 2002 SPIE đề xuất tế bào mở rộng 193nm ngập nước; chiết suất nước 1,44 làm 193nm độ phân giải tương đương khoảng 134nm; 2007 ASML sản xuất, từ 65nm hỗ trợ tới 7nm, kéo dài định luật Moore sáu thế hệ

[^cw-lin-interview]: [Tạp chí Thiên hạ CommonWealth — Phỏng vấn với Cha đẻ tế bào mở rộng ngập nước Ai xếp Đài Tích Điện trên bản đồ](https://english.cw.com.tw/article/article.action?id=3720) — 2024-06-18 phỏng vấn Lâm Bản Kiên — lịch sử nền tảng "Nikon không dám làm immersion"; Lâm Bản Kiên từ 2000 Đài Tích Điện thúc đẩy nhận dùng tế bào mở rộng ngập nước, huyết thống hợp tác kỹ thuật 30 năm Đài Tích Điện với ASML
