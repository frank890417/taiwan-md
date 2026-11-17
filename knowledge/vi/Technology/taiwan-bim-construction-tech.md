---
title: 'BIM và Công nghệ Xây dựng tại Đài Loan: Chính sách 12 năm tùy nghi theo dự án bị viết lại bởi một giao thức kéo dài 18 tháng'
description: 'Ngày 23 tháng 5 năm 2014, Ủy ban Công trình Công cộng thuộc Hành chính Viện đã thành lập "Nền tảng thúc đẩy ứng dụng BIM trong công trình công cộng", áp dụng phương châm tám chữ "tùy nghi theo dự án, tiến bước dần dần". Mười một năm bảy tháng sau, một nhà phát triển Đài Loan đang làm việc tại Tokyo đã đẩy kho lưu trữ mang tên REVIT_MCP_study lên GitHub, thu về hơn 70 sao và hơn 80 lượt fork. Trong suốt 12 năm đó, ngành xây dựng Đài Loan đã trải qua một hành trình dài từ bản vẽ tay đến mô hình 3D, từ những nỗ lực cá nhân đến tiêu chuẩn quốc gia, từ việc nâng cấp công cụ đến định nghĩa lại nghề nghiệp.'
date: 2026-05-22
category: 'Technology'
tags:
  [
    'Công nghệ',
    'BIM',
    'Mô hình thông tin xây dựng',
    'Công nghệ xây dựng',
    'Kiến trúc',
    'Chuyển đổi số',
    'Revit',
    'MCP',
    'AI',
    'CTCI',
    'Taiwan Sheer',
    'Shuo Tao',
  ]
subcategory: '建築科技'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-05-22
lastHumanReview: false
readingTime: 22
researchReport: 'reports/research/2026-05/台灣BIM與營建科技.md'
image: '/article-images/technology/freecad-bim-example-2024.webp'
imageCredit: 'Maxwxyz via Wikimedia Commons'
imageLicense: 'CC BY 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/台灣BIM與營建科技.md'
sourceCommitSha: 'b1a5fea00'
sourceContentHash: 'sha256:85f9d09627902abf'
sourceBodyHash: 'sha256:c4a7f62bbc68876d'
translatedAt: '2026-11-17T21:11:53.273518+00:00'
---

# BIM và Công nghệ Xây dựng tại Đài Loan: Chiến lược thích ứng theo dự án kéo dài 12 năm của chính phủ bị viết lại bởi một giao thức (protocol) chỉ trong 18 tháng

![Ảnh chụp màn hình chế độ tối (dark theme) của nền tảng làm việc BIM mã nguồn mở FreeCAD 1.0, trung tâm màn hình hiển thị mô hình 3D của một tòa nhà mẫu, bảng điều khiển bên trái liệt kê các lớp chuyên ngành (kết cấu, cơ điện, vỏ bao che), thanh công cụ dưới cùng là bộ lệnh dành riêng cho BIM workbench, phản ánh bản chất chuyển đổi số trong kỹ thuật khi BIM hệ thống hóa thông tin công trình](/article-images/technology/freecad-bim-example-2024.webp)
_Tệp mẫu BIM workbench của FreeCAD 1.0 Dark Theme. Photo: Maxwxyz, 2024-10-07. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png)._

> **Tóm tắt trong 30 giây:** Ngày 23 tháng 5 năm 2014, Ủy ban Công trình Công cộng thuộc Hành chính viện Trung Hoa Dân Quốc đã thành lập "Nền tảng thúc đẩy ứng dụng BIM trong công trình công cộng"[^1], triển khai theo ba giai đoạn dựa trên nguyên tắc "thích ứng theo dự án và tiến hành từng bước", nhưng đến nay vẫn chưa áp dụng bắt buộc[^2]. Cùng thời điểm đó, Trung tâm Nghiên cứu BIM thuộc Đại học Quốc gia Đài Loan đã mở lớp học đầu tiên, Hiệp hội Mô hình thông tin công trình Đài Loan (TBIMA) được thành lập[^3], chính quyền thành phố Tân Bắc cấp giấy phép xây dựng BIM đầu tiên, Cục Phát triển Đô thị Thành phố Đài Bắc công bố quy định nghiệp vụ về mô hình hoàn công[^4], và BSI đã ký kết Bản ghi nhớ (MOU) cho "Taiwan BIM Task Group"[^5]. Mười một năm bảy tháng sau, vào ngày 10 tháng 12 năm 2025, một nhà phát triển tên là CHIANG SHUOTAO đã đẩy kho lưu trữ có tên `REVIT_MCP_study` lên GitHub, đạt được 73 sao và 85 lượt fork[^6]. Bốn tháng sau đó, vào tháng 4 năm 2026, Autodesk thông báo Revit 2027 sẽ tích hợp sẵn Model Context Protocol server[^7]. Giữa 12 năm chính phủ không thể thúc đẩy và một giao thức (protocol) 18 tháng của Anthropic là quá trình tái định nghĩa nghề nghiệp chậm chạp của ngành xây dựng Đài Loan: từ việc chỉ vẽ bản vẽ sang tích hợp hệ thống.

---

## Phương châm "Tùy nghi theo dự án" của Ủy ban Công trình Công cộng

Vào ngày 23 tháng 5 năm 2014, Ủy ban Công trình Công cộng thuộc Hành chính viện Trung Hoa Dân Quốc đã xây dựng một nền tảng mang tên 「Nền tảng thúc đẩy ứng dụng Mô hình thông tin công trình (BIM) trong công trình công cộng」[^1]. Phương châm cốt lõi được đưa ra vào ngày ra mắt là "**Tùy nghi theo dự án, tiến hành từng bước**".

Tám chữ này đã được trích dẫn lại rất nhiều lần trong những năm sau đó.

Ủy ban Công trình Công cộng chia chiến lược thúc đẩy thành ba giai đoạn: Giai đoạn thứ nhất (năm 103 kỷ Dân Quốc) là 「Khuyến khích và triển khai thí điểm các dự án được lựa chọn」, tìm kiếm các cơ quan chủ quản của các công trình không thuộc loại hình xây dựng để thực hiện các dự án thí điểm, ưu tiên lựa chọn các gói thầu mà hình thức trọn gói (turnkey) mang lại lợi ích lớn nhất; Giai đoạn thứ hai (năm 104-105) là 「Thực hiện thí điểm và đánh giá」; Giai đoạn thứ ba là 「**Từ năm 106 trở đi, thúc đẩy ứng dụng kỹ thuật BIM trong các công trình công cộng có giá trị trên một mức nhất định**」[^1].

Tuy nhiên, ngưỡng "trên một mức nhất định" này cho đến tận năm 2026 vẫn chưa trở thành quy định bắt buộc toàn diện. Cụm từ mà Ủy ban Công trình Công cộng liên tục nhấn mạnh là "**Cơ quan chủ quản công trình sẽ dựa trên các dự án có tính chất phức tạp hoặc quy mô lớn hơn, căn cứ vào nhu cầu cụ thể của từng trường hợp và năng lực quản lý thực hiện hợp đồng của cơ quan đó để tự đánh giá việc có áp dụng kỹ thuật BIM hay không, thay vì là một quy định mang tính toàn diện và bắt buộc**"[^2].

Đối chứng với trường hợp này là Hồng Kông. Cục Phát triển Hồng Kông từ lâu đã quy định bắt buộc các dự án công trình có giá trị ước tính trên 30 triệu đô la Hồng Kông phải áp dụng BIM[^8]. Trong khi đó, tại Đài Loan, ba động từ 「Khuyến khích」, 「Thí điểm」 và 「Tự đánh giá」 cứ luân phiên xuất hiện trong mọi bản sách trắng.

Theo các dữ liệu công khai tính đến ngày tìm kiếm, nền tảng BIM của Ủy ban Công trình Công cộng đã ghi nhận tích lũy có 「Hơn 60 cơ quan đấu thầu công trình sử dụng kỹ thuật BIM, với số lượng gói thầu ứng dụng vượt quá 120 dự án」[^2]. Con số này nếu đặt trong tổng số hơn mười nghìn dự án công trình công cộng mỗi năm tại Đài Loan thì thậm chí còn không đáng kể.

> **📝 Ghi chú của người biên tập**
> Cách nói phổ biến là "Chính phủ thúc đẩy BIM nhưng không thành công vì ngành công nghiệp không theo kịp". Cách giải thích này nghe có vẻ hợp lý về mặt diễn ngôn, nhưng nó đã đảo ngược quan hệ nhân quả. **Trình tự thực sự gần với việc: Chính phủ đã quyết định không bắt buộc áp dụng BIM kể từ năm 2014, bởi vì bắt buộc đồng nghĩa với việc triệt tiêu bát cơm của một nửa các văn phòng kiến trúc sư**. "Tùy nghi theo dự án" là một tính toán chính trị: Để lại quyền lựa chọn cho một số ít cơ quan "có năng lực quản lý thực hiện hợp đồng", còn những đơn vị khác thì cứ tiếp tục dùng AutoCAD, không ai động chạm đến ai.

## Bộ Nội vụ, Đài Bắc và Tân Bắc: Ba trục thúc đẩy không đồng bộ

Ủy ban Công trình Công cộng thúc đẩy lộ trình của mình, còn Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ lại thúc đẩy lộ trình riêng.

ABRI (Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ) đã khởi động "Kế hoạch nghiên cứu, phát triển và quảng bá ứng dụng chia sẻ tích hợp thông tin kiến trúc" dưới dạng dự án trung hạn 4 năm từ năm Dân Quốc 104 (2015), và đến năm Dân Quốc 108 (2019) đã tiếp nối giai đoạn hai kéo dài 4 năm[^9]. Hai mục tiêu lớn của giai đoạn hai được đặt ra rất tham vọng: "Nâng cấp kỹ thuật số trong công nghệ kiến trúc" + "Môi trường sống kỹ thuật số trong kiến trúc", trong đó mục tiêu sau hướng tới việc tích hợp BIM với GIS và IoT để xây dựng thành phố số[^10].

Tuy nhiên, ABRI không phải là cơ quan thực thi quản lý xây dựng. Việc quản lý xây dựng nằm trong tay chính quyền các tỉnh và thành phố.

Năm 2014, **Chính quyền Thành phố Tân Bắc đã cấp giấy phép xây dựng đầu tiên được phê duyệt thông qua bằng mô hình BIM**[^11]. Cùng năm đó, Tân Bắc cũng công bố "Chuẩn bàn giao thông tin mô hình hoàn công BIM cho các công trình công cộng tại Thành phố Tân Bắc". Tính đến năm 2026, "Hệ thống kiểm tra giấy phép xây dựng hỗ trợ bằng máy tính" (bim.ntpc.gov.tw) của chính quyền Thành phố Tân Bắc đã tích lũy được hơn 20 mô hình BIM hoàn chỉnh[^11].

Bốn năm sau, vào ngày 6 tháng 11 năm 2018, **Cục Phát triển Đô thị Chính quyền Thành phố Đài Bắc đã công bố 「Quy định nghiệp vụ dữ liệu thuộc tính mô hình hoàn công BIM cho công trình xây dựng do Cục Phát triển Đô thị Chính quyền Thành phố Đài Bắc chủ trì」**[^4]. Quy định của Đài Bắc tham chiếu định dạng quốc tế COBie (Construction Operations Building Information Exchange), đồng thời tiếp thu các quy chuẩn liên quan từ Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ năm Dân Quốc 104 và các tiêu chuẩn từ Anh quốc[^4]. Quy định yêu cầu khi sử dụng các phần mềm mô hình hóa BIM khác nhau, người dùng phải xuất dữ liệu theo tiêu chuẩn **IFC** (Industry Foundation Classes — một tiêu chuẩn quốc tế mở do buildingSMART International thiết lập, ISO 16739-1:2024) và tiêu chuẩn COBie để bàn giao[^4][^12].

> **💡 Bạn có biết?**
> IFC là một tiêu chuẩn quốc tế mở được xây dựng bởi một tổ chức phi lợi nhuận có tên là buildingSMART International[^12], không phụ thuộc vào Autodesk hay bất kỳ nhà cung cấp đơn lẻ nào. Logic tồn tại của nó tương tự như PDF: cho phép các mô hình được tạo ra từ các phần mềm khác nhau (Revit, ArchiCAD, Tekla, Navisworks) có thể trao đổi dữ liệu một cách liền mạch. **Chính phủ Đan Mạch đã bắt buộc sử dụng định dạng IFC cho các dự án xây dựng công cộng từ năm 2010, Na Uy, Phần Lan và Singapore cũng đã nối gót theo sau**[^12]. Tại Đài Loan, mãi đến năm 2018, cấp chính quyền thành phố như Đài Bắc mới đưa IFC vào quy chuẩn. Trong khi tiêu chuẩn quốc tế đã đi trước mười năm, Đài Loan vẫn đang dần dần bù đắp khoảng cách này.

Ba trục thúc đẩy từ Trung ương, Đài Bắc và Tân Bắc hoàn toàn không đồng bộ về mặt thời điểm. Cùng một nhà ga tàu điện ngầm, có thể ở giai đoạn thiết kế sẽ áp dụng quy định BIM của Cục Công trình Đường sắt đô thị Đài Bắc (được ràng buộc trong hợp đồng trọn gói - EPC), đến giai đoạn xin giấy phép xây dựng lại áp dụng Quy định nghiệp vụ mô hình hoàn công của Cục Phát triển Đô thị Đài Bắc (định dạng COBie), và khi bước vào giai đoạn vận hành, nó lại rơi vào một bộ công cụ quản lý cơ sở hạ tầng (facility management) khác.

"**Hiện tại, hầu hết các ứng dụng BIM trong khu vực công đều thuộc giai đoạn thiết kế và thi công; việc ứng dụng cũng có sự khác biệt giữa loại hình công trình truyền thống và công trình trọn gói, còn mô hình quản lý vận hành sau đó vẫn đang áp dụng các phương thức truyền thống**"[^13]: Đây là nội dung được viết trong báo cáo thành quả của chính ABRI.

---

## Tuyến Wanda, ga Miaoli, Nhà ga T3 Sân bay Đào Viên: Sự xuất hiện của BIM trong các công trình công cộng

Năm 2011, **Tuyến tàu điện ngầm Wanda (Wanda Line) của Đài Bắc lần đầu tiên đưa BIM vào hợp đồng thiết kế kỹ thuật**[^14].

Đây là một sự kiện "đầu tiên" thường xuyên được trích dẫn trong quá trình thúc đẩy BIM tại Đài Loan. Dựa trên yêu cầu của hợp đồng, các phân đoạn của tuyến Wanda đã áp dụng mô hình BIM để thiết kế cấu trúc nhà ga, đồng thời tích hợp các chuyên ngành kiến trúc, kết cấu và cơ điện nhằm **giảm thiểu xung đột giao diện thiết kế**[^14].

Tiếp bước tuyến Wanda, các công trình công cộng lần lượt gia nhập làn sóng này. Từ ga trên cao Y19 của Tuyến Vành đai Đài Bắc (Circular Line), nhiều trung tâm thể thao tại Tân Bắc, [Đài Loan Cao tốc](/vi/lifestyle/taiwan-high-speed-rail/) ga mới Miaoli, Nhà ga số 3 [Sân bay Đào Viên](/vi/lifestyle/taoyuan-airport/), cho đến tuyến đường sắt nhẹ vành đai Cao Hùng: mỗi dự án đều có một bài nghiên cứu điển hình (case study) được đăng tải trên ABRI, NTUBIM của Đại học Quốc gia Đài Loan hoặc các tạp chí nội bộ của Cục Đường sắt đô thị.

"**Chiến thắng bằng con số**" được trích dẫn nhiều nhất chính là ga Miaoli của Đài Loan Cao tốc: việc đưa BIM vào áp dụng ba tháng trước khi khởi công đã giúp đội ngũ giám sát phát hiện ra nhiều điểm xung đột từ mô hình 3D, từ đó **tiết kiệm được 20% chi phí thay đổi thiết kế sau này, và việc triển khai thực địa tại công trường đã giúp khởi công sớm hơn hai tháng so với dự kiến**[^15].

Nhà ga số 3 của Sân bay Đào Viên là một ví dụ khác ở quy mô hoàn toàn khác biệt. Vào tháng 3 năm 2021, **liên danh giữa Samsung 物產 (Samsung C&T) và Vinh Công Công trình đã trúng thầu gói thầu xây dựng phần thân nhà ga chính T3 với giá NT$ 44,5 tỷ**[^16]. Toàn bộ dự án T3 do Công ty Tư vấn Kỹ thuật Thế Hi Đài Loan dẫn đầu thiết kế (cùng với Rogers Stirk Harbour + Partners và Ove Arup and Partners Hong Kong), sự hợp tác đa quốc gia này bắt buộc phải dựa vào việc luân chuyển mô hình BIM giữa các văn phòng kiến trúc khác nhau: đây là trường hợp điển hình được Công ty Thế Hi sử dụng lặp đi lặp lại trong các tài liệu đào tạo nội bộ[^17].

> **✦** Khoảnh khắc tuyến Wanda đưa BIM vào hợp đồng lần đầu tiên vào năm 2011 chính là một bước ngoặt thầm lặng trong lịch sử công trình công cộng tại Đài Loan. Kể từ ngày đó, không còn một dự án công trình công cộng trọng điểm nào về tàu điện ngầm, sân bay, cao tốc hay đường sắt nhẹ tại Đài Loan mà không đặt câu hỏi: "Làm thế nào để áp dụng BIM?".

Tuy nhiên, tất cả những ví dụ trên đều là các "dự án tiêu biểu". Và mọi dự án tiêu biểu tại Đài Loan đều có chung một nhược điểm: **chúng chỉ là số ít**.

---

## 5 công ty tư vấn lớn + 2 tổ chức trọng yếu: Những gương mặt đứng sau

Những người thúc đẩy ứng dụng BIM vào các công trình công cộng đều có tên tuổi và danh tính rõ ràng.

**Công ty TNHH Tư vấn Kỹ thuật Thế Hi Đài Loan (CECI)**: Được thành lập năm 2007 thông qua hình thức đầu tư từ Pháp nhân Công ty Tư vấn Kỹ thuật CECI (thành lập năm 1969)[^18]. **Năm 2010, công ty là đơn vị tiên phong thành lập Trung tâm Tích hợp BIM**[^19], một trong những trung tâm tích hợp sớm nhất trong giới công nghiệp tại Đài Loan. Trong số gần 2.000 nhân viên, có tới 90% sở hữu nền tảng chuyên môn liên quan đến đường bộ, đường sắt, cảng biển, sân bay, cầu đường, kết cấu, đường hầm, tàu điện ngầm (MRT), kiến trúc, cơ khí, điện và kiểm soát hệ thống, BIM, ITS, PPP, v.v.[^19].

**Công ty Tư vấn Kỹ thuật Trung Hưng (Sinotech Engineering Consultants)**: Thành lập năm 1970, sau khi chuyển đổi sang mô hình NPO vào năm 1994 đã chuyển sang hình thức đầu tư vào Công ty Cổ phần Tư vấn Kỹ thuật Trung Hưng[^20]. Sau đó, Trung Hưng đã phát triển BIM thành một hệ thống gọi là "**Hệ thống Thông tin Quản lý Dự án (PMIS)**": Dựa trên tinh thần Môi trường Dữ liệu Chung (CDE) của tiêu chuẩn ISO 19650, hệ thống này bao gồm bảy mô-đun chính nhằm hỗ trợ tích hợp thông tin xuyên suốt các chuyên ngành và dự án[^21].

**Công ty TNHH Tư vấn Kỹ thuật Vĩnh Tuấn (Evergreen Consulting Engineering - EGC)**: Được thành lập năm 1974. Đơn vị này chính là bên thực hiện thiết kế kết cấu cho tòa tháp Taipei 101 và tháp T&C Tower cao 85 tầng tại Cao Hùng[^22]. **CTBUH (Hội nhà cao tầng và môi trường sống đô thị thế giới) đã xếp EGC vào nhóm mười đơn vị tư vấn kết cấu nhà cao tầng hàng đầu thế giới**[^22].

Về phía học thuật, có hai mắt xích quan trọng:

**Trung tâm Nghiên cứu Mô phỏng Thông tin và Quản lý Kỹ thuật Xây dựng thuộc Đại học Quốc gia Đài Loan (NTUBIM)**: Thành lập năm 2011, do Giáo sư **Tạ Thượng Hiền** (Hsieh Shang-hsien) thuộc Khoa Kỹ thuật Xây dựng làm chủ nhiệm. Phó giáo sư **Quách Vinh Khâm** (Kuo Jung-chin), một trong những học giả đồng sáng lập, đã viết bài 「**Sự phát triển của BIM và tác động đến hệ thống kiến trúc hiện hành**」[^23] vào tháng 12 năm 2011; đây cho đến nay vẫn là một trong những tài liệu học thuật sơ khởi mang tính biểu tượng về BIM tại Đài Loan. NTUBIM sau đó đã tiếp nhận nhiều dự án ủy thác trong nhiều năm từ ABRI và Ủy ban Công trình Công cộng, dẫn dắt việc xây dựng các hướng dẫn phối hợp làm việc BIM của Đài Loan cũng như biên dịch bản tiếng Trung của tiêu chuẩn ISO 19650.

**Hiệp hội Mô hình Thông tin Công trình Đài Loan (TBIMA)**: Tiền thân là một buổi gặp gỡ những người đam mê kỹ thuật BIM tại Đài Loan vào năm 2009, bắt đầu công tác chuẩn bị từ năm 2011 và **chính thức được đăng ký là hiệp hội thuộc Bộ Nội vụ vào ngày 10 tháng 3 năm 2012**[^3]. Các thành viên chủ chốt của Hiệp hội đến từ đội ngũ giảng viên đào tạo chính hãng của Autodesk Taiwan năm 2008: Đây chính là "huyết mạch" của các tổ chức BIM tư nhân tại Đài Loan, được phát triển trực tiếp từ vòng kết nối các giảng viên chứng nhận của Autodesk.

> **📝 Ghi chú của người giám tuyển**
> Tại lễ ký kết MOU của Taiwan BIM Task Group vào ngày 3 tháng 10 năm 2018[^5], có năm gương mặt đại diện ngồi quanh bàn: BSI (Hiệp hội Tiêu chuẩn Anh) Đài Loan, NTUBIM thuộc Đại học Quốc gia Đài Loan, Viện Nghiên cứu Xây dựng Đài Loan, Trung tâm Kiến trúc Đài Loan và TBIMA. **Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ đóng vai trò là "đơn vị hướng dẫn" chứ không phải "đơn vị ký kết"**, một sự sắp xếp thứ bậc đầy ý nghĩa. Điều này ngụ ý rằng Chính phủ thừa nhận trong việc áp dụng các tiêu chuẩn quốc tế về BIM, tốt nhất nên để giới học thuật và các tổ chức dân sự dẫn dắt, còn mình lùi lại ở tuyến thứ hai. Bản dịch 《**ISO 19650 bản tiếng Trung**》[^24] do BSI công bố vào năm sau là một lời tuyên bố chủ quyền mềm đầy tinh tế: Đài Loan cuối cùng đã có bản dịch tiếng Trung chính thức cho các tiêu chuẩn BIM quốc tế của riêng mình.

## Revit, ArchiCAD, Tekla: Dòng chảy ngầm của sự thống trị phần mềm

![Ảnh chụp màn hình giao diện vận hành Autodesk Revit 2024, hiển thị một bức tường ngăn đơn giản cùng với cửa ra vào và cửa sổ dưới dạng đối tượng hóa trong không gian ba chiều; bên trái là bảng thuộc tính thành phần, góc dưới bên phải là chế độ xem trước đồng bộ thời gian thực của ba hình chiếu: mặt bằng, mặt đứng và mặt cắt, phản ánh bản chất mô hình hóa hướng đối tượng của phần mềm BIM](/article-images/technology/autodesk-revit-2024-bim-objects.webp)
_Minh họa thành phần BIM trong Autodesk Revit 2024. Photo: DanielDefault, 2024. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Revit_2024.png)._

Bước vào bất kỳ văn phòng kiến trúc nào tại Đài Loan đã triển khai BIM, có đến 90% màn hình khởi động là Revit.

"**Tại Đài Loan, 90% kiến trúc sư (có năng lực thiết kế BIM) sử dụng Revit Architecture**" —— đây là con số mà đại lý ArchiCAD đã viết trên trang web của mình[^25]. Mặc dù đây là trích dẫn từ một nguồn duy nhất, nhưng nó hoàn toàn nhất quán với nhận thức của ngành: Revit gần như đang độc chiếm lĩnh vực thiết kế kiến trúc tại Đài Loan.

ArchiCAD được phát triển bởi công ty Graphisoft của Hungary, chạy trên cả Mac và Windows. Phần mềm này có tư duy thiết kế trực quan và đường cong học tập thân thiện hơn so với Revit, nhưng số lượng người dùng tại Đài Loan rõ ràng ít hơn[^26]. Đại lý Long Đình Thông tin (Longting Information) đã tổ chức rất nhiều buổi demo tại khu vực Đông quận, Đài Bắc, và lần nào họ cũng nghe các kiến trúc sư nói rằng: "Tôi biết dùng Revit, nhưng văn phòng chỉ có bản quyền Revit thôi." Đây chính là sự kìm kẹp của hiệu ứng quy mô.

Trong lĩnh vực kết cấu thép lại là một trục khác. **Tekla Structures (sản phẩm của công ty Trimble, tiền thân là XSteel) hiện là phần mềm chủ lưu trong thiết kế kết cấu thép tại Đài Loan**[^27]. Khả năng xử lý kết cấu thép của Tekla đã được giới chuyên môn công nhận rộng rãi trong các lĩnh vực nhà cao tầng, cầu đường, nhà thi đấu và nhà máy tại Đài Loan.

Đối với cơ sở hạ tầng (đường sắt, đường bộ, đường hầm), xu hướng thường nghiêng về hệ thống MicroStation thuộc sở hữu của Bentley Systems[^28]. Các tập đoàn như CTCI (Trung Đỉnh), Sinotech (Trung Hưng) hay Taiwan Sechi thường sử dụng MicroStation kết hợp với OpenRoads / OpenBridge của Bentley trong các dự án EPC tổng thầu quy mô lớn hoặc các công trình đường sắt xuyên quốc gia.

Chạy trên nền tảng các phần mềm chủ lưu này là Dynamo (lập trình trực quan) của chính Autodesk và pyRevit (khung mở rộng Python) mã nguồn mở. **Vào đầu năm 2016, Autodesk Taiwan đã đặc biệt mời giảng viên từ đội ngũ nghiên cứu và phát triển Dynamo tại Singapore đến Đài Loan để mở lớp đào tạo**[^29], kể từ đó Dynamo đã thu hút sự chú ý lớn trong cộng đồng kỹ sư BIM tại Đài Loan. Một kịch bản điển hình: một kỹ sư cơ điện viết một đoạn mã Dynamo để tự động sắp xếp tọa độ của tất cả các ống gió, kiểm tra chiều cao thông thủy và tạo bản vẽ mặt cắt; việc mà trước đây phải mất cả ngày với CAD thì nay chỉ cần vài phút là xong[^30].

Sân khấu của việc kiểm tra xung đột (clash detection) thuộc về Autodesk Navisworks. Navisworks Manage tích hợp các chức năng điều hướng 3D, phát hiện xung đột, xuất báo cáo, mô phỏng tiến độ 4D và dự toán 5D[^31]. Trong các công trình cơ điện tàu điện ngầm tại Đài Loan có một thuật ngữ chuyên môn là **CSD / SEM**: CSD (Combined Service Drawing) là bản vẽ tổng hợp cơ điện, còn SEM (Structure / Electric / Mechanic) là bản vẽ tích hợp kết cấu và cơ điện. Cách làm truyền thống là chồng các bản vẽ CAD lên nhau hoặc đối chiếu trên giấy; trong kỷ nguyên BIM, người ta dùng Navisworks để chạy kiểm tra va chạm, tìm ra các điểm xung đột dưới góc độ 3D[^32].

Sáu chữ "**Tích hợp bản vẽ CSD/SEM**" hiện nay đã trở thành dịch vụ thiết yếu xuất hiện trên trang web của các công ty tư vấn BIM tại Đài Loan.

## CTCI, Huju, Daxon, Obayashi: Ai đang xây dựng Đài Loan

![Cảnh đường phố tại công trường xây dựng Taipei Dome vào sáng ngày 21 tháng 6 năm 2020, ở phía xa lớp vỏ thép của Taipei Dome vẫn đang được lắp dựng, ở tiền cảnh một chiếc xe tải Hino 300 đang đi qua vạch kẻ đường gần lối ra số 5 của ga tàu điện ngầm Văn Hóa (National Memorial Hall) trên đường Zhongxiao East, phản ánh thực tế thi công kéo dài hơn mười năm của sân vận động lớn nhất Đài Bắc và vai trò quản lý thi công của Obayashi tại dự án mái vòm ống thép tròn nặng 65.000 tấn này](/article-images/technology/taipei-dome-construction-cheng-2020.webp)
_Hiện trường thi công Taipei Dome, ngày 16-08-2020, lối ra số 5 ga Văn Hóa trên đường Zhongxiao East. Photo: Cheng-en Cheng, 16-08-2020. [License via Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg).\_

Lực lượng nòng cốt chống đỡ thị trường xây dựng quy mô lớn của Đài Loan là một nhóm các công ty thầu trọn gói (EPC): họ tiếp cận BIM sớm hơn cả các văn phòng kiến trúc và coi đó là một công cụ sản xuất thiết yếu.

Đứng đầu danh sách là **Công ty Cổ phần Kỹ thuật CTCI (CTCI, mã chứng khoán 9933)**. CTCI được thành lập vào năm 1979 thông qua sự hợp tác đầu tư giữa Quỹ Trung Kỹ Xã (China Technical Services) với Ngân hàng Phát triển Trung Hoa và Công ty Đầu tư Trung ương[^33]. Bối cảnh thành lập này rất đặc biệt: Trung Kỹ Xã được thành lập vào năm 1959, là một tổ chức chuyển giao công nghệ phục vụ sự phát triển công nghiệp của Đài Loan. Vào thời kỳ hoàng kim của ngành hóa dầu những năm 1970, tổ chức này đảm nhận lượng lớn công việc tư vấn kỹ thuật cho các doanh nghiệp nhà nước như CPC (Tổng công ty Dầu khí Đài Loan). Năm 1979, Trung Kỹ Xã tách mảng kinh doanh tư vấn kỹ thuật ra để thành lập nên CTCI.

Lĩnh vực kinh doanh của CTCI là **EPC** (Engineering, Procurement, Construction - Thiết kế, Thu mua, Thi công trọn gói): bao gồm lọc dầu, hóa dầu, hóa chất, điện lực, thép, lưu trữ và vận chuyển, giao thông, lò đốt rác, xây dựng công cộng và kỹ thuật môi trường[^33]. Tính đến năm 2021, với đội ngũ 7.500 nhân viên, công ty đã thiết lập các chi nhánh/văn phòng đại diện tại 15 quốc gia[^33][^34]. Các dự án như Amine tại Ả Rập Xê-út, dự án thầu trọn gói lò cracking ethylene Saudi Kayan, hay dự án thầu trọn gói SAMAC MMA và PMMA: chuỗi tên gọi này chính là dấu ấn của các nhà thầu EPC Đài Loan tại Trung Đông trong suốt 20 năm qua[^33].

Năm 2011 đã xảy ra một sự kiện thay đổi cấu trúc cổ đông của CTCI: **Công ty Chiyoda Corporation của Nhật Bản đã mua lại cổ phần của CTCI và trở thành cổ đông lớn nhất**[^33]. Đây là một sự thật thú vị mà nhiều người không biết: công ty thầu trọn gói lớn nhất Đài Loan hiện có cổ đông lớn nhất là một tập đoàn xây dựng hóa chất của Nhật Bản.

> **⚠️ Quan điểm gây tranh cãi**
> Các dự án hải ngoại của những công ty EPC lớn như CTCI không phải là không có tranh cãi. Năm 2017, dự án EPC nhà máy xử lý khí thiên nhiên của CTCI tại Ấn Độ đã gặp phải tình trạng chậm trễ nghiêm trọng và nợ xấu; tập đoàn đã thừa nhận đó là "**lỗ hổng chí mạng trong quản trị rủi ro quốc tế**"[^35]. Cùng năm đó, các tranh chấp về sức khỏe cư dân tại dự án Lục Kim (Sixth Light) ở Mai Liao và việc rút dự án của Kuo Guang Petrochemical tiếp tục leo thang; nhiều dự án hóa dầu có sự tham gia của CTCI đã bị nêu tên trong các cuộc thảo luận về môi trường. BIM đã hỗ trợ đắc lực về độ chính xác kỹ thuật trong các dự án lớn này, nhưng độ chính xác không thể giải quyết được các vấn đề chính trị liên quan đến đất đai, lao động và môi trường.

Trên thị trường nhà thầu tư nhân lại có một nhóm tên tuổi khác: **Huju Construction (Hỗ Trợ)** "tích lũy tổng diện tích sàn hoàn thành của các nhà máy công nghệ cao lớn nhất, sở hữu kinh nghiệm xây dựng nhà máy trong nước hàng đầu"[^36]; **Daxon Engineering (2535)** được giới chuyên môn coi là "**nhà thầu chuyên dụng của TSMC**", khi giành được đơn hàng thi công kết cấu thượng tầng cho nhà máy FAB 18P3 tại khu Khoa học Nam của TSMC[^37]. Trong báo cáo nội bộ, bộ phận BIM của Daxon viết: "**Sử dụng BIM làm nền tảng công cụ cơ bản để tiến hành phát triển, quy hoạch, thiết kế và phối hợp thi công liên quan cho các dự án kiến trúc**"[^37], mặc dù mảng này chỉ chiếm một phần nhỏ trong tổng lượng công việc của Daxon.

Các doanh nghiệp nước ngoài có sự hiện diện mang tính cấu trúc tại Đài Loan qua hai cái tên. **Obayashi Đài Loan** là chi nhánh được thành lập tại Đài Loan vào năm 1989 bởi Obayashi Corporation (công ty xây dựng tháp Tokyo Skytree) của Nhật Bản, đơn vị đã thi công toàn bộ tòa nhà Taipei 101, tuyến tàu điện ngầm Xinyi, Nhà ga số 3 Sân bay Đào Viên, và **Taipei Dome**[^38]. **Trang web chính thức của chi nhánh Obayashi tại Đài Loan trong phần "Tóm tắt công ty" đã liệt kê rõ ràng "Quản lý bản vẽ thi công và ứng dụng BIM" là một trong những hạng mục quản lý thi công chính**[^38].

> **💡 Bạn có biết?**
> Toàn bộ kết cấu thép của Taipei Dome nặng tới 65.000 tấn, là đấu trường duy nhất trên thế giới sử dụng hoàn toàn hệ thống ống thép tròn để xây dựng mái vòm khổng lồ này[^39]. Phần lớn thiết kế kết cấu thép được thực hiện trên Tekla Structures, sau đó mô hình được nhập vào Navisworks để thực hiện kiểm tra xung đột với các bộ phận chuyên môn khác (cơ điện, phòng cháy chữa cháy). **Nếu không có BIM, một dự án kết cấu thép quy mô như Taipei Dome gần như không thể hoàn thành mà không xảy ra sai sót lớn** — đây cũng là lý do tại sao Obayashi đưa BIM vào danh sách "các hạng mục quản lý thi công chính" trong hồ sơ năng lực của mình.

## Thiếu hụt lao động, già hóa và lao động di cư: Tại sao chuyển đổi số là tất yếu

Hãy thử hình dung một buổi sáng bình thường tại công trường: 6 giờ 30 phút, các công nhân bắt đầu lần lượt có mặt. Hơn một nửa trong số đó là những người thợ thuộc "thế hệ ông nội", trên 40 tuổi.

**Thống kê tử vong do tai nạn lao động của Chính quyền Thành phố Tân Bắc cho thấy, trong hơn 100 trường hợp tử vong, có tới hơn 77% là người trên 40 tuổi**[^40]. Con số này từ lâu đã là kiến thức phổ biến trong giới kỹ sư dân dụng. Sự già hóa lực lượng lao động trong ngành xây dựng Đài Loan đã trở thành một thực tế hiện hữu, chứ không còn là một xu hướng đang diễn ra.

Tình trạng tỷ lệ sinh thấp khiến giới trẻ không mặn mà với ngành xây dựng. Điều kiện công trường khắc nghiệt, mức lương thiếu sức cạnh tranh và tỷ lệ thương vong cao: ba yếu tố này cộng hưởng lại khiến áp lực tuyển dụng của ngành xây dựng ngày càng trở nên nặng nề[^40]. Bộ Lao động năm 2024 đã đồng ý mở thêm 15.000 chỉ tiêu lao động di cư cho ngành xây dựng, và tính đến đầu năm 2026, các chỉ tiêu này đã "**sắp được phân bổ hết**" [^41].

Đây chính là lý do tại sao chuyển đổi số trở thành việc bắt buộc phải làm đối với ngành xây dựng.

**Nhu cầu về vị trí kỹ sư BIM rất lớn, mức lương khởi điểm cho người mới là NT$35,000 - NT$45,000; trên ngân hàng nhân lực 1111 hiện có 104 vị trí với mức lương tháng từ NT$50,000 trở lên**[^42]. Tuy nhiên, "nhu cầu lớn" và "có khả năng sử dụng" là hai chuyện khác nhau: "**Việc học BIM không nhất thiết mang lại sự tăng trưởng thu nhập đáng kể, đa số mọi người lựa chọn các lộ trình học tập kinh tế hơn**" [^43]. Ngành công nghiệp vẫn chưa có sự thống nhất về việc đâu là giới hạn phát triển nghề nghiệp của một kỹ sư BIM.

Một vấn đề cấu trúc sâu xa hơn nằm ở chỗ: BIM đã kéo kiến trúc sư từ nhóm nghề nghiệp "**vẽ bản vẽ**" sang một nhóm mới là "**người tích hợp hệ thống**". Việc nâng cấp công cụ chỉ là bề nổi.

Những kiến trúc sư dùng AutoCAD để vẽ thực chất đang vẽ tập hợp các đường nét hai chiều. Họ vẽ mặt bằng, mặt đứng, mặt cắt: mỗi bản vẽ là độc lập, việc sửa mặt bằng mà quên sửa mặt đứng là chuyện thường ngày. Ngược lại, những kỹ sư dùng Revit / BIM đang xây dựng một mô hình thông tin: đằng sau mỗi đường nét đều gắn liền với vật liệu, quy cách, nhà cung cấp, giá cả, trình tự thi công và chu kỳ bảo trì[^44]. Khi sửa mặt bằng, các mặt đứng và mặt cắt sẽ tự động được đồng bộ hóa.

Các kiến trúc sư lâu năm nhìn những kỹ sư BIM trẻ tuổi và nói rằng "đây là việc của thế hệ mới", lý do thực sự đằng sau rất đơn giản: **nghề nghiệp đó đã thuộc về một lĩnh vực khác so với khái niệm "kiến trúc sư" khi họ mới gia nhập ngành**.

> **✦** 「Mô hình BIM thường trở thành công việc thuê ngoài, tách rời khỏi công trình thực tế, khiến nhiều trung tâm hoặc đội ngũ BIM phải giải tán」[^45] —— Đây là quan sát của chính Trung tâm Nghiên cứu BIM thuộc Đại học Quốc gia Đài Loan về hiện trạng thúc đẩy BIM tại Đài Loan.

## Giao thức giống như USB-C: Chìa khóa để Anthropic kết nối AI vào Revit

Vào ngày 25 tháng 11 năm 2024, Anthropic đã phát hành mã nguồn mở một thứ gọi là **Model Context Protocol (MCP)**[^46].

Thông báo gốc được viết rất khoa học: "**MCP is an open standard, open-source framework introduced by Anthropic to standardize the way artificial intelligence (AI) systems like large language models (LLMs) integrate and share data with external tools, systems, and data sources**" (MCP là một tiêu chuẩn mở, một khung mã nguồn mở được giới thiệu bởi Anthropic nhằm tiêu chuẩn hóa cách thức các hệ thống trí tuệ nhân tạo (AI) như các mô hình ngôn ngữ lớn (LLM) tích hợp và chia sẻ dữ liệu với các công cụ, hệ thống và nguồn dữ liệu bên ngoài) [^47]. Cách giải thích của Anthropic còn bình dân hơn: "**Think of MCP like a USB-C port for AI applications**" (Hãy coi MCP như một cổng USB-C dành cho các ứng dụng AI) [^46]: Giống như cách USB-C thống nhất việc kết nối các thiết bị, MCP muốn thống nhất giao thức kết nối giữa AI với các nguồn dữ liệu và công cụ.

Đi kèm với thông báo về MCP là các bộ SDK dành cho Python, TypeScript, C#, Java, cùng với các máy chủ MCP (MCP servers) được xây dựng sẵn để kết nối với Google Drive, Slack, GitHub, Git, Postgres và Puppeteer[^46].

Những diễn biến tiếp theo xảy ra với tốc độ không ai có thể dự đoán được.

Vào ngày 10 tháng 12 năm 2025, một nhà phát triển tên là **CHIANG SHUOTAO (Giang Thạc Đào)** đã đẩy một kho lưu trữ (repository) có tên `REVIT_MCP_study` lên GitHub[^48]. Mô tả của kho lưu trữ chỉ vỏn vẹn tám chữ tiếng Anh: "LEARN HOW TO BUILD UP YOUR REVIT MCP". Phân bổ ngôn ngữ bao gồm: **C# 54.2%, JavaScript 18.7%, PowerShell 14.3%, TypeScript 7.0%, HTML 3.3%, Shell 1.2%**[^48]. Tính đến tháng 5 năm 2026, kho lưu trữ cá nhân này đã tích lũy được **73 sao và 85 lượt fork**[^6].

Trên trang cá nhân GitHub, địa điểm của Thạc Đào được ghi là "Tokyo", nhưng tệp README và tất cả các tài liệu hướng dẫn đều bằng tiếng Trung phồn thể, với nội dung phản ánh sâu sắc quy trình làm việc của ngành xây dựng Đài Loan. Các kho lưu trữ liên quan của anh bao gồm: `CAD_MCP_study`, `NAVISWORK_MCP`, `IFCSH` — tạo thành một chuỗi thử nghiệm mã nguồn mở cá nhân về BIM × MCP × AI[^49].

Chúng ta nên đọc trường hợp này như thế nào?

Đây không phải là việc "Đài Loan có BIM_MCP của riêng mình" — kho lưu trữ của Thạc Đào nằm trong cùng một hệ sinh thái với `mcp-servers-for-revit/revit-mcp` quốc tế và máy chủ MCP tích hợp sẵn trong Revit 2027 của chính Autodesk[^7][^50]. Ý nghĩa của nó nằm ở chỗ: **Một nhà phát triển Đài Loan, chỉ chưa đầy 13 tháng sau khi Anthropic công bố MCP, đã tạo ra một dự án hướng dẫn mã nguồn mở đạt hơn 70 sao, đưa các thực hành kỹ thuật của Revit MCP quốc tế trở lại với cộng đồng sử dụng tiếng Trung**.

Bốn tháng sau đó, vào **tháng 4 năm 2026, Autodesk thông báo về máy chủ MCP tích hợp sẵn trong Revit 2027 và Autodesk Assistant**[^7]. Trợ lý Autodesk mới có thể thực hiện những việc như: "**Tìm tất cả các phòng thiếu nhãn cơ điện**", "**Thiết lập cấp độ chống cháy là 90 phút cho tất cả các cửa ở Giai đoạn 2 (Phase 2)**", "**Tạo tất cả các bản vẽ cấp thoát nước cho tầng này**"[^7] — sử dụng ngôn ngữ tự nhiên để thao tác trên Revit.

Những việc trước đây phải mất một đến hai năm học Revit mới làm được, thì nay chỉ cần nói một câu bằng tiếng Trung (hoặc tiếng Anh) là có thể thực hiện ngay.

> **📝 Ghi chú của người biên soạn**
> Khi đối chiếu các mốc thời gian: Từ ngày 23 tháng 5 năm 2014 khi nền tảng BIM của Hội Kỹ sư được ra mắt, đến ngày 25 tháng 11 năm 2024 khi Anthropic phát hành mã nguồn mở MCP, **khoảng cách là 10 năm 6 tháng**. Trong 10 năm chính phủ Đài Loan thúc đẩy BIM, từ giai đoạn "khuyến khích thí điểm" đến "áp dụng tùy theo dự án", vẫn chưa bao giờ tiến tới mức bắt buộc. Tuy nhiên, từ khi Anthropic phát hành MCP đến khi Autodesk công bố tích hợp MCP vào Revit 2027, **chỉ mất 17 tháng**. Tốc độ thay đổi của các nền tảng công nghệ (platform) trong việc đưa ngành công nghiệp gia nhập kỷ nguyên mới nhanh hơn rất nhiều so với tốc độ thúc đẩy của chính sách. **Sự khác biệt thực sự nằm ở cấu trúc của hai mô hình thúc đẩy này** — thúc đẩy bằng chính sách bắt buộc cần phải điều phối hàng trăm bên liên quan, cân bằng lợi ích của hàng chục nhóm vận động hành lang ngành và điều chỉnh nhiều đạo luật; trong khi thúc đẩy bằng nền tảng chỉ cần mở mã nguồn SDK và viết tài liệu hướng dẫn (documentation) thật tốt. Nhìn rõ cấu trúc này quan trọng hơn việc phàn nàn về chính phủ hay sùng bái AI.

## Từ vẽ bản vẽ đến tích hợp hệ thống: Sự tái định nghĩa nghề nghiệp chưa hoàn tất

Hãy quay ngược ống kính về các văn phòng kiến trúc sư vào những năm 1990.

Thời đó, trên tường của các văn phòng treo đầy bàn vẽ, thước chữ T, bút kim và máy in xanh (blueprint). Để vẽ mặt bằng, kiến trúc sư phải dùng bút kim đồ nét trên bản vẽ khổ lớn A1, sau khi vẽ xong một bản phải gửi đến máy in xanh để sao chép — tiếng máy kêu o o, những tờ bản vẽ nền xanh chữ trắng từ từ lăn ra từ đầu kia của máy. Chỉ cần sửa một chi tiết là phải vẽ lại cả bản.

Sau khi AutoCAD phát hành phiên bản Classic Mac OS vào năm 1992 và phiên bản Microsoft Windows vào năm 1993[^51], các văn phòng kiến trúc sư tại Đài Loan đã bắt đầu chuyển đổi quy mô lớn sang CAD từ giữa thập niên 1990. Quá trình đau đớn của sự chuyển đổi này kéo dài khoảng mười năm — những kiến trúc sư kỳ cựu phản đối, trong khi các nhà thiết kế trẻ đón nhận, khiến nội bộ văn phòng chia thành hai phe: "vẽ trên CAD" và "vẽ trên bàn".

Từ AutoCAD đến Revit là cuộc chuyển đổi thứ hai. **Phải đến năm 2002, Autodesk mới đưa Revit cùng thuật ngữ "Building Information Modeling" (Mô hình thông tin công trình - BIM) ra thị trường**[^52] — nghĩa là khoảng cách từ vẽ tay sang CAD và từ CAD sang BIM là khoảng hai mươi năm. Tuy nhiên, sự đau đớn của quá trình chuyển đổi sang BIM còn sâu sắc hơn so với thời CAD, bởi vì yêu cầu lần này đã nâng cấp từ việc thay đổi công cụ lên thành **tái cấu trúc tư duy**.

CAD số hóa các đường nét của bạn. BIM yêu cầu bạn hệ thống hóa toàn bộ thông tin của tòa nhà. Một bức tường không còn chỉ là hai đường thẳng song song, mà trở thành một đối tượng dữ liệu như sau: "Vách ngăn văn phòng khu A tầng 2, chất liệu: thạch cao hai mặt dày 12mm kết hợp khung thép nhẹ 75mm, khả năng chịu lửa 1 giờ, nhà cung cấp XX, chi phí YY, thứ tự thi công sau lắp đặt hệ thống cơ điện".

Sự tích hợp đa chuyên ngành cũng theo đó mà thay đổi. Quy trình truyền thống là kiến trúc sư vẽ xong bản vẽ, kỹ sư kết cấu vẽ xong bản vẽ, kỹ sư cơ điện vẽ xong bản vẽ, để rồi khi chồng ba bộ bản vẽ lên nhau tại công trường mới phát hiện ra xung đột — một ống gió xuyên qua một thanh dầm, hoặc vị trí ống thoát nước đâm vào một cột kết cấu. Quy trình BIM cho phép thực hiện việc chồng bản vẽ ngay trong giai đoạn thiết kế trên cùng một mô hình ba chiều, giúp việc kiểm tra va chạm và rà soát xung đột được hoàn tất trên máy tính[^32].

Cụm từ "**giảm thiểu xung đột giao diện thiết kế**" luôn xuất hiện trong báo cáo hiệu quả của tất cả các nghiên cứu điển hình (case study) về BIM tại Đài Loan[^14][^15]. Tuy nhiên, sự thay đổi nghề nghiệp đằng sau sáu chữ này là: cấu trúc quyền lực giữa bốn bên gồm kiến trúc sư, kỹ sư kết cấu, kỹ sư cơ điện và nhà thầu xây dựng đang được tái sắp xếp. **Nếu trước đây kiến trúc sư là tác giả duy nhất trong giai đoạn thiết kế, thì trong kỷ nguyên BIM, thiết kế là sự tích hợp hệ thống thông qua sự phối hợp của nhiều bên**.

Sự tái định nghĩa nghề nghiệp này vẫn chưa hoàn tất.

> **✦** "**Chủ đầu tư thiếu nhận thức đầy đủ về ứng dụng BIM, thường làm việc theo quy trình kỹ thuật truyền thống, gây hạn chế hiệu năng của công nghệ BIM**"[^53] — đây là quan sát thẳng thắn nhất của BSI đối với phía chủ đầu tư tại Đài Loan. Nút thắt khiến BIM không thể thúc đẩy nằm ở phía chủ đầu tư; việc kỹ sư biết hay không biết sử dụng công nghệ thực chất chỉ là vấn đề thứ yếu.

## Những việc tiếp theo

Vào tháng 5 năm 2026, tình hình của BIM tại Đài Loan như sau:

- Chính phủ trung ương đã thúc đẩy suốt 12 năm nhưng vẫn dừng lại ở mức "tùy nghi theo dự án", chưa có sự bắt buộc toàn diện[^2]
- Thành phố Đài Bắc và Thành phố Tân Bắc đã yêu cầu mô hình BIM ở cấp độ giấy phép xây dựng từ năm 2014 / 2018, nhưng quy định giữa các huyện, thành phố vẫn khác nhau[^4][^11]
- Các đơn vị tư vấn kỹ thuật lớn (Tsuyoshi/World-Cheer, Chung Hsing, Yung Chuen) và các tập đoàn xây dựng lớn (CTCI, Hu Chu, Daxon, Obayashi) đều đang sử dụng, nhu cầu về vị trí kỹ sư BIM là rất lớn[^17][^19][^33][^42]
- Đa số các văn phòng kiến trúc sư quy mô vừa và nhỏ vẫn chủ yếu dùng AutoCAD, tỷ lệ phổ biến của BIM ước tính chỉ ở mức một chữ số phần trăm[^43][^45]
- 17 tháng sau khi Anthropic MCP được mã nguồn mở vào tháng 11/2024, Autodesk đã thông báo về việc tích hợp sẵn MCP server trong Revit 2027[^7][^46]
- Một nhà phát triển Đài Loan đã viết một kho lưu trữ (repo) hướng dẫn Revit MCP đạt 73 sao trên GitHub, kết nối hệ sinh thái quốc tế trở lại với cộng đồng sử dụng tiếng Trung[^6][^48]

Kết nối sáu điểm này lại, **câu chuyện về BIM tại Đài Loan là câu chuyện về một nghề nghiệp đang bị các nền tảng công nghệ (platform) tái định nghĩa từ bên ngoài**, và vẫn còn một khoảng cách để trở thành một ngành công nghiệp trưởng thành. Tốc độ thúc đẩy của chính phủ không theo kịp sự lặp lại của công nghệ, tốc độ áp dụng của tư nhân không theo kịp tình trạng già hóa dân số; ngành xây dựng Đài Loan đang bị kéo căng bởi ba lực lượng: đội ngũ lao động truyền thống đang già hóa, các công trường thiếu hụt nhân công, và những công cụ thế hệ mới AI × BIM.

Trong thập kỷ tới, nghề nghiệp "kiến trúc sư" tại Đài Loan có thể sẽ không còn như hiện nay. Phần vẽ bản vẽ sẽ được giao cho AI — chỉ với một câu lệnh "**Thiết lập cấp độ chống cháy của tất cả các cửa trong Phase 2 là 90 phút**"[^7] là có thể thay đổi toàn bộ hệ thống cửa của dự án. Công việc của kiến trúc sư sẽ tiến gần hơn tới vai trò "**người tích hợp hệ thống**", "**người phiên dịch giữa chủ đầu tư và kỹ thuật**", và "**người giám tuyển (curator) cho sự hợp tác đa bên**".

Khi Ủy ban Công trình Công cộng tổ chức cuộc họp đầu tiên về nền tảng BIM vào ngày 23 tháng 5 năm 2014, ga Miaoli của Đường sắt cao tốc Đài Loan vẫn chưa được xây dựng. Vào ngày Autodesk thông báo tích hợp MCP vào Revit 2027 vào tháng 4 năm 2026, nhà máy (fab) tiếp theo của TSMC tại Cao Hùng đã đang trong quá trình chuẩn bị với toàn bộ bản vẽ BIM. Mười hai năm "tùy nghi theo dự án" đã đi đến một điểm mà chính nó cũng không ngờ tới — một giao thức (protocol) được mã nguồn mở từ văn phòng Anthropic ở California, Mỹ, đã thay đổi hoàn toàn đường cong tiếp nhận (onboarding curve) của toàn ngành từ phía nền tảng, bỏ qua con đường chính là sự bắt buộc từ chính phủ.

Ngày Thạc Đào (Shuo Tao) đẩy `REVIT_MCP_study` lên GitHub vào tháng 12 năm 2025[^48], vừa vặn là 11 năm 7 tháng kể từ khi nền tảng BIM của Ủy ban Công trình được niêm yết. Trong mười hai năm đó, ngành xây dựng Đài Loan đã đi một chặng đường dài từ vẽ tay trên giấy bóng đến mô hình 3D, từ những thử nghiệm riêng lẻ đến tiêu chuẩn quốc gia, từ nâng cấp công cụ đến tái định nghĩa nghề nghiệp. **Con đường này vẫn chưa kết thúc — nhưng lộ trình tiếp theo sẽ đi như thế nào, giờ đây đã không còn hoàn toàn nằm trong tay chính phủ Đài Loan nữa**.

---

**Đọc thêm**:

- [Kiến trúc Đài Loan](/vi/art/taiwanese-architecture) — Tự sự về văn hóa kiến trúc từ nhà mái đá đến những tòa nhà chọc trời; bài viết này là phần tiếp nối về khía cạnh số hóa kỹ thuật của chủ đề đó.
- [Nhà ở xã hội và công bằng cư trú](/vi/society/social-housing-and-housing-justice) — Ứng dụng BIM trong quản lý vận hành nhà ở xã hội là dự án trọng điểm những năm gần đây của Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ.
- [Doanh nghiệp Đài Loan: TSMC](/vi/economy/tsmc) — Việc ứng dụng BIM trong các nhà máy của TSMC là lĩnh vực thực chiến chính của các nhà thầu xây dựng như Daxon, Hu Chu.
- [Phát triển AI tại Đài Loan](/vi/technology/ai-development-in-taiwan) — Anthropic MCP và việc tích hợp sẵn MCP trong Revit 2027 là những trường hợp cụ thể về sự kết hợp giữa AI × Công nghiệp.
- [Ngành bán dẫn](/vi/technology/taiwan-semiconductor-industry) — Giải pháp tổng thể cho kỹ thuật nhà máy fab + xây dựng nhà máy thông minh bằng BIM là nền tảng kỹ thuật cho sự mở rộng của các cụm công nghiệp bán dẫn.

## Nguồn ảnh

Bài viết này sử dụng 3 hình ảnh được cấp phép theo chuẩn CC từ Wikimedia Commons, tất cả đã được lưu bộ nhớ đệm (cache) tại `public/article-images/technology/` để tránh tình trạng hotlinking trực tiếp từ máy chủ nguồn:

- [FreeCAD 1.0 Dark BIM Example](https://commons.wikimedia.org/wiki/File:FreeCAD_1.0_Dark_BIM_Example.png) — Ảnh: Maxwxyz, 2024-10-07, CC BY 4.0 (Ảnh bìa: Hiển thị mô hình 3D của công cụ BIM mã nguồn mở)
- [Autodesk Revit 2024 物件示範](https://commons.wikimedia.org/wiki/File:Revit_2024.png) — Ảnh: DanielDefault, 2024, CC BY-SA 4.0 (Ảnh minh họa: Màn hình dựng mô hình đối tượng trong Revit)
- [Taipei Dome and Hino 300 BEM-5593](https://commons.wikimedia.org/wiki/File:Taipei_Dome_and_Hino_300_BEM-5593_%2850281669428%29.jpg) — Ảnh: Cheng-en Cheng, 2020-08-16, CC BY-SA 2.0 (Ảnh minh họa: Công trường thi công Đại Cự Đản với 65.000 tấn kết cấu thép đang được lắp dựng)

Toàn bộ hồ sơ ma trận cấp phép truyền thông được ghi lại tại [`reports/research/2026-05/台灣BIM與營建科技.md`](../../reports/research/2026-05/台灣BIM與營建科技.md) §Ma trận ba bảng về cấp phép truyền thông.

## Tài liệu tham khảo

[^1]: [Ủy ban Công trình Công cộng thuộc Hành chính viện Trung Hoa Dân Quốc: Chuyên mục ứng dụng Mô hình thông tin công trình (BIM) trong công trình công cộng](https://www.pcc.gov.tw/content/index?eid=1345&type=C) — Trang nền tảng thúc đẩy BIM chính thức của Ủy ban Công trình Công cộng thuộc Hành chính viện, ghi lại các văn bản chính sách về chiến lược thúc đẩy ba giai đoạn được thành lập vào ngày 23 tháng 5 năm 2014: "Khuyến khích thí điểm / Thực hiện thí điểm / Thúc đẩy các công trình công cộng có giá trị trên một mức nhất định từ năm 106 (năm 2017)".

[^2]: [Nền tảng tham gia mạng lưới chính sách công của Bộ Kiểm toán: Thu thập ý kiến về chiến lược thúc đẩy BIM của Ủy ban Công trình](https://cy.join.gov.tw/policies/detail/8e95c8d6-ce87-4e05-afce-c46a33eb6f89) — Trang thảo luận mở của Bộ Kiểm toán, ghi lại nguyên tắc thúc đẩy của Ủy ban Công trình là "tùy nghi theo dự án, tiến hành tuần tự" thay vì bắt buộc toàn diện; thống kê chính thức cho thấy đã có hơn 60 cơ quan đấu thầu công trình sử dụng BIM với hơn 120 gói thầu được áp dụng.

[^3]: [Trang web chính thức của Hiệp hội Mô hình thông tin công trình Đài Loan (TBIMA)](https://sites.google.com/view/tbima) — Trang web chính thức của hiệp hội đã đăng ký với Bộ Nội vụ, ghi lại bối cảnh lịch sử từ nguồn gốc các cuộc gặp gỡ năm 2009, chuẩn bị vào năm 2011, thành lập chính thức vào ngày 10 tháng 3 năm 2012, với các thành viên chủ chốt đến từ nhóm giảng viên đào tạo của Autodesk Taiwan năm 2008.

[^4]: [Cục Phát triển Đô thị Chính quyền Thành phố Đài Bắc: Quy định nghiệp vụ dữ liệu thuộc tính mô hình hoàn công BIM cho công trình xây dựng v2.0](https://udd.gov.taipei/assets/50-10660/Documents/竣工模型屬性資料作業規範v2.0_20181109_new.pdf) — Quy định chính thức được Cục Phát triển Đô thị Đài Bắc công bố vào ngày 9 tháng 11 năm 2018, tham chiếu định dạng quốc tế COBie và có các quy định cụ thể yêu cầu xuất dữ liệu theo tiêu chuẩn IFC.

[^5]: [BSI hợp tác với các đơn vị sản xuất - chính phủ - học thuật - nghiên cứu ký kết Bản ghi nhớ "Taiwan BIM Task Group"](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2018-/october/bsitaiwan-bim-task-group/) — Thông cáo báo chí về việc ký kết MOU vào ngày 3 tháng 10 năm 2018 của BSI Đài Loan, ghi lại năm đơn vị ký kết (BSI, NTUBIM thuộc Đại học Quốc gia Đài Loan, Viện Nghiên cứu Xây dựng Đài Loan, Trung tâm Kiến trúc Đài Loan, TBIMA) cùng vai trò hướng dẫn của Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ.

[^6]: [Kho lưu trữ GitHub shuotao/REVIT_MCP_study](https://github.com/shuotao/REVIT_MCP_study) — Dự án giảng dạy Revit MCP mã nguồn mở cá nhân của CHIANG SHUOTAO (Thạc Đào), thành lập vào tháng 12 năm 2025, đạt 73 sao và 85 fork vào tháng 5 năm 2026, với phân bổ ngôn ngữ gồm C# 54.2% + JavaScript 18.7% + PowerShell 14.3%.

[^7]: [Autodesk Developer Blog: Revit API Agents, MCP, Copilot và Codex](https://blog.autodesk.io/revit-api-agents-mcp-copilot-and-codex/) — Thông báo từ blog nhà phát triển chính thức của Autodesk vào tháng 4 năm 2026, cho biết Revit 2027 sẽ tích hợp sẵn MCP server + Autodesk Assistant để hỗ trợ thao tác mô hình Revit bằng ngôn ngữ tự nhiên.

[^8]: [ONC Lawyers: Việc áp dụng Mô hình thông tin công trình (BIM) trong ngành xây dựng và các tác động pháp lý](https://www.onc.hk/zh_HK/publication/adoption-of-bim-and-its-legal-complications-for-the-construction-industry) — Bài viết từ một công ty luật tại Hồng Kông, ghi lại sự so sánh với chính sách của Cục Phát triển Hồng Kông về việc bắt buộc sử dụng BIM đối với các dự án công trình có ước tính chi phí trên 30 triệu đô la Hồng Kông.

[^9]: [Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ Trung Hoa Dân Quốc: Kế hoạch quảng bá ứng dụng Mô hình thông tin công trình (BIM)](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=315634) — Trang kế hoạch chính thức của ABRI, ghi lại mục tiêu và phạm vi của kế hoạch trung hạn 4 năm vào năm 2015 (năm 104) và kế hoạch giai đoạn hai vào năm 2019 (năm 108).

[^10]: [Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ: Nghiên cứu khảo sát ứng dụng thành quả phát triển Mô hình thông tin công trình (BIM) và phương án thúc đẩy tại nước ta](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39612) — Báo cáo kết quả nghiên cứu do ABRI ủy thác, ghi lại hai mục tiêu lớn của giai đoạn hai là "Nâng cấp kỹ thuật số trong xây dựng" + "Môi trường sống kỹ thuật số trong kiến trúc" cùng hướng tích hợp thành phố số BIM × GIS × IoT.

[^11]: [Cục Công vụ Chính quyền Thành phố Tân Bắc: Hệ thống kiểm tra giấy phép xây dựng hỗ trợ bằng máy tính](https://www.bim.ntpc.gov.tw/) — Trang web chính thức của hệ thống kiểm tra giấy phép xây dựng BIM thuộc Chính quyền Thành phố Tân Bắc, ghi lại thành quả tích lũy gồm giấy phép xây dựng sử dụng mô hình BIM đầu tiên vào năm 2014, hơn 20 mô hình BIM đã hoàn thành và "Chuẩn bàn giao thông tin mô hình hoàn công BIM cho các công trình công cộng tại Thành phố Tân Bắc".

[^12]: [buildingSMART International: Industry Foundation Classes (IFC)](https://www.buildingsmart.org/standards/bsi-standards/industry-foundation-classes/) — Trang tiêu chuẩn IFC trên website chính thức của buildingSMART International, ghi lại tiêu chuẩn quốc tế ISO 16739-1:2024 và tình hình áp dụng quốc tế như việc Đan Mạch bắt buộc sử dụng IFC trong các công trình công cộng từ năm 2010.

[^13]: [Viện Nghiên cứu Xây dựng thuộc Bộ Nội vụ: Báo cáo kết quả kế hoạch quảng bá ứng dụng Mô hình thông tin công trình (BIM) (Năm 112)](https://ws.moi.gov.tw/001/Upload/404/relfile/9489/315634/0cccc6e2-2dc6-496f-a45f-69b60e2811b1.pdf) — Báo cáo kết quả năm 2023 (năm 112) của ABRI, thừa nhận chẩn đoán chính thức rằng "đa số các ứng dụng BIM trong khu vực công nằm ở giai đoạn thiết kế và thi công, trong khi quản lý vận hành vẫn áp dụng các phương pháp truyền thống".

[^14]: [Cục Công trình Đường sắt đô thị Chính quyền Thành phố Tân Bắc: Ứng dụng BIM trong tuyến đường sắt Wan-da](https://www.dorts.ntpc.gov.tw/documentary/articleInfo/P9z2zp0nZrDp?page=216) — Ghi chép trong tập san công trình của Cục Đường sắt đô thị Tân Bắc, cho biết tuyến Wan-da của Taipei Metro là "công trình công cộng đầu tiên đưa BIM vào hợp đồng", giúp giảm thiểu các xung đột giao diện thiết kế theo ghi chép chính thức.

[^15]: [Flow BIM Service: Chia sẻ trường hợp điển hình về văn phòng thương mại thông minh](https://bim.flow.tw/smartoffice-globalshowcase/) — Chia sẻ trường hợp từ công ty tư vấn BIM Ruoshui International, trích dẫn dữ liệu cụ thể về ứng dụng BIM tại ga Miaoli của Đường sắt Cao tốc Đài Loan giúp "tiết kiệm 20% chi phí thay đổi thiết kế và khởi công sớm hơn hai tháng".

[^16]: [Tự do Tài chính: Đấu thầu Nhà ga số 3 Sân bay Đào Viên, liên danh Samsung 物產 và Vinh Công Công trình trúng thầu với giá NT$ 44,5 tỷ](https://ec.ltn.com.tw/article/breakingnews/3414669) — Thông cáo báo chí của Liberty Times vào tháng 3 năm 2021, ghi lại chi tiết về việc đấu thầu công trình xây dựng phần thân Nhà ga T3 tại Sân bay Đào Viên và thông tin cụ thể về liên danh giữa Samsung 物產 và Vinh Công Công trình.

[^17]: [iThome: Ngành xây dựng dựa vào BIM để hiện thực hóa bản sao kỹ thuật số của công trình, trường hợp của Thế Hi của Đài Loan](https://www.ithome.com.tw/people/137308) — Báo cáo chuyên sâu của iThome năm 2021, phỏng vấn Tổng kỹ sư Lâm Diệu Thương (Lin Yao-chang) của Thế Hi Đài Loan, ghi lại các trường hợp ứng dụng BIM trong toàn bộ vòng đời dự án như Ga Phượng Sơn, Đường hầm Bát Quái Sơn, và quy trình phối hợp BIM xuyên quốc gia tại Nhà ga T3 Sân bay Đào Viên.

[^18]: [Pháp nhân Công ty Tư vấn Kỹ thuật CECI: 50 sự kiện kinh điển](https://www.ceci.org.tw/modules/article-content.aspx?s=13&i=226) — Các sự kiện lớn kỷ niệm 50 năm trên trang web chính thức của CECI, ghi lại lịch sử chính thức từ khi thành lập năm 1969 đến việc đầu tư thành lập Công ty TNHH Tư vấn Kỹ thuật Thế Hi Đài Loan vào năm 2007.

[^19]: [Công ty TNHH Tư vấn Kỹ thuật Thế Hi Đài Loan: Giới thiệu công ty](https://www.104.com.tw/company/d1w3jw0) — Trang tuyển dụng 104 của Thế Hi Đài Loan, ghi lại thông tin chính thức về việc 90% trong số gần 2.000 nhân viên có chuyên môn về đường bộ, đường sắt, sân bay, cầu đường, BIM, ITS, PPP và việc tiên phong thành lập Trung tâm Tích hợp BIM vào năm 2010.

[^20]: [Pháp nhân Công ty Tư vấn Kỹ thuật Trung Hưng: Hướng tới kỷ niệm 50 năm Trung Hưng Kỹ thuật](https://50th-anniversary.sinotech.org.tw/about_ltd.html) — Trang web chính thức kỷ niệm 50 năm của Công ty Tư vấn Kỹ thuật Trung Hưng, ghi lại lịch sử thành lập năm 1970, chuyển đổi sang mô hình NPO vào năm 1994 và sau đó đầu tư thành lập Công ty TNHH Tư vấn Kỹ thuật Trung Hưng.

[^21]: [Autodesk University: Thiết kế và ứng dụng nền tảng phối hợp BIM của Trung Hưng Kỹ thuật](https://www.autodesk.com/autodesk-university/class/zhongxinggongchengBIMxietongzuoyepingtaizhishejiyuyingyong-2020) — Thuyết trình kỹ thuật tại Autodesk University năm 2020, ghi lại kiến trúc kỹ thuật của các mô-đun theo dõi vấn đề BIM và bảy mô-đun chính của PMIS dựa trên môi trường CDE tiêu chuẩn ISO 19650 của Trung Hưng Kỹ thuật.

[^22]: [Trang web chính thức của Công ty TNHH Tư vấn Kỹ thuật Vĩnh Tuấn (Evergreen Consulting Engineering)](https://www.egc.com.tw/) — Trang web chính thức của Vĩnh Tuấn, ghi lại thông tin về việc thành lập năm 1974, đội ngũ hơn 80 chuyên gia, thiết kế kết cấu cho tòa nhà Taipei 101 và T&C Tower tại Cao Hùng, cùng vị thế là một trong mười đơn vị tư vấn kết cấu cao tầng hàng đầu thế giới của CTBUH.

[^23]: [Trung tâm Nghiên cứu BIM Đại học Quốc gia Đài Loan: Sự phát triển của BIM và tác động đến hệ thống kiến trúc hiện hành (Quách Vinh Khâm 2011.12)](https://www.ntubim.net/bim2356027396/bim-201112) — Tài liệu học thuật mang tính chỉ dấu thời kỳ đầu của NTUBIM thuộc Đại học Quốc gia Đài Loan, một trong những tác phẩm đại diện cho luận thuyết học thuật về BIM tại Đài Loan do Phó giáo sư Quách Vinh Khâm (Guo Rong-qin) công bố năm 2011.

[^24]: [BSI: Thúc đẩy chuyển đổi số ngành xây dựng, Taiwan BIM Task Group công bố tiêu chuẩn quốc tế BIM 《ISO 19650 bản tiếng Trung》](https://www.bsigroup.com/zh-TW/about-bsi/media-centre/press-release/2019/20197/iso-19650-tw-standard-launch/) — Thông cáo báo chí của BSI năm 2019, ghi lại việc công bố ISO 19650 bản tiếng Trung với sự giám sát của Viện Nghiên cứu Phát triển Xây dựng thuộc Bộ Nội vụ (Giám đốc Vương Vinh Tiến) và sự hỗ trợ dịch thuật từ NTUBIM Đại học Quốc gia Đài Loan.

[^25]: [BIM-API: PyRevit + Dynamo Scripts](https://www.bim-api.com/en/blog/pyrevit-dynamo-scripts/) — Bài viết trên blog BIM-API, ghi lại số liệu quan sát ngành rằng "90% kiến trúc sư tại Đài Loan (có năng lực thiết kế BIM) sử dụng Revit Architecture".

[^26]: [Trang web chính thức của đại lý Graphisoft Archicad - Long Đình Thông tin](https://www.academicd.com/) — Trang web chính thức của Long Đình Thông tin, đại lý của Graphisoft tại Đài Loan, ghi lại các nguồn lực đào tạo và hỗ trợ bán hàng cho ArchiCAD tại Đài Loan, với định vị thị trường là "phần mềm BIM thân thiện hơn Revit".

[^27]: [BIM Explorer: Chia sẻ kinh nghiệm sử dụng Tekla Structures](https://tpuaup.blogspot.com/2013/05/tekla-structures.html) — Bài viết trên blog BIM, ghi lại thực trạng ngành khi Tekla Structures là phần mềm chủ đạo trong thiết kế kết cấu thép tại Đài Loan, chuyên xử lý các kết cấu thép phức tạp (nhà thi đấu, cầu đường, nhà xưởng).

[^28]: [Công nghệ Thông tin Đại Thôi: Thiết kế hạ tầng MicroStation](https://www.oitc.com.tw/products-detail/MicroStation/79) — Trang web chính thức của đại lý Bentley MicroStation tại Đài Loan, ghi lại phạm vi ứng dụng của MicroStation trong các công trình hạ tầng như đường sắt, đường bộ, đường hầm và cầu đường tại Đài Loan.

[^29]: [Học viện Kiến trúc Kỹ thuật số BIM+ Studio: Khóa học cơ bản về Dynamo kiến trúc](https://bimstudio.tabc.org.tw/blogs/bim%E7%9F%A5%E8%AD%98%E5%BA%AB/49627) — Giới thiệu khóa học của BIM+ Studio thuộc Trung tâm Kiến trúc Đài Loan, ghi lại thời điểm quan trọng vào đầu năm 2016 khi Autodesk Taiwan mời đội ngũ nghiên cứu phát triển Dynamo từ Singapore đến Đài Loan để giảng dạy.

[^30]: [WeBIM Services: Dynamo thay đổi thế giới Revit như thế nào](https://webim.com.tw/en/tech-en/dynamo-application-webim-3/) — Bài viết kỹ thuật của WeBIM, ghi lại các trường hợp ứng dụng cụ thể của Dynamo trong cộng đồng kỹ sư BIM tại Đài Loan (sắp xếp tọa độ ống gió, xác định chiều cao thông thủy, tự động tạo bản vẽ mặt cắt).

[^31]: [Tổng quan sản phẩm Autodesk Navisworks](https://www.quickly.com.tw/autodesk/navisworks.php) — Trang web chính thức của nhà phân phối Autodesk tại Đài Loan là Quickly, ghi lại các chức năng đầy đủ của Navisworks Manage bao gồm tích hợp điều hướng 3D, kiểm tra xung đột, xuất báo cáo, mô phỏng tiến độ 4D và ước tính chi phí 5D.

[^32]: [airitiLibrary: Phát triển và ứng dụng tự động hóa thiết kế CSD/SEM hỗ trợ BIM cho tàu điện ngầm](https://www.airitilibrary.com/Article/Detail/0257554X-202107-202107290004-202107290004-77-85) — Luận văn học thuật trên thư viện trực tuyến airitiLibrary, ghi lại phương pháp luận tích hợp BIM cho bản vẽ dịch vụ kết hợp (CSD) và SEM (Kết cấu / Điện / Cơ khí) trong kỹ thuật cơ điện tàu điện ngầm tại Đài Loan.

[^33]: [Tập đoàn CTCI - Wikipedia](https://zh.wikipedia.org/zh-tw/%E4%B8%AD%E9%BC%8E%E9%9B%86%E5%9C%98) — Mục từ Tập đoàn CTCI trên Wikipedia, ghi lại việc tập đoàn được thành lập năm 1979 bởi sự đầu tư chung của Công ty Kỹ thuật Trung Kỷ, Ngân hàng Công nghiệp Phát triển Trung Hoa và Công ty Đầu tư Trung ương; năm 2011 công ty Chiyoda Corporation của Nhật Bản đã trở thành cổ đông lớn nhất; có 7.500 nhân viên (năm 2021) và các dự án EPC trọng điểm tại nước ngoài như Amine / Saudi Kayan / SAMAC MMA tại Ả Rập Xê-út.

[^34]: [Trang web chính thức của Tập đoàn CTCI](https://www.ctci.com/www/ctci2022/page.aspx?L=CH) — Trang web chính thức của CTCI Engineering, ghi lại phạm vi kinh doanh của các dự án thầu trọn gói (turnkey), mô hình EPC và 15 chi nhánh/văn phòng đại diện tại các quốc gia.

[^35]: [Chuyển đổi: Từ cuộc khủng hoảng nợ xấu khổng lồ ở nước ngoài của CTCI, nhìn vào lỗ hổng chí mạng trong 'quản trị rủi ro quốc tế' của các nhà thầu Đài Loan](https://crossing.cw.com.tw/article/19832) — Phóng sự chuyên sâu của United Daily News (天下換日線), ghi lại vụ tranh chấp liên quan đến việc chậm trễ nghiêm trọng và nợ xấu xảy ra tại dự án EPC nhà máy xử lý khí thiên nhiên của CTCI tại Ấn Độ vào năm 2017.

[^36]: [Công ty TNHH Xây dựng Hỗ Trợ: Thành tích nhà xưởng công nghệ cao](https://www.futsu.com.tw/p_hitech.html) — Trang nhà xưởng công nghệ cao trên website chính thức của Xây dựng Hỗ Trợ, ghi lại tuyên bố chính thức về việc 'tích lũy tổng diện tích sàn hoàn thành cho các nhà xưởng công nghệ cao lớn nhất trong kinh nghiệm xây dựng nội địa'.

[^37]: [Kỹ thuật Daxon: Kinh nghiệm BIM](https://www.dacin.com.tw/bim/) — Trang kinh nghiệm BIM trên website chính thức của Kỹ thuật Daxon, ghi lại tuyên bố chính thức về việc 'sử dụng BIM làm nền tảng công cụ để tiến hành phát triển, quy hoạch, thiết kế và phối hợp liên quan đến thi công các dự án kiến trúc'.

[^38]: [Obayashi Đài Loan: Tóm tắt công ty](https://www.obayashi.com.tw/topic/about/preview/3250113421819124234) — Website chính thức của Công ty TNHH Xây dựng Obayashi Đài Loan, ghi lại thông tin chính thức về việc thành lập năm 1989, trụ sở chính là Obayashi Corporation (đơn vị xây dựng tháp Tokyo Skytree), và các hạng mục quản lý thi công chính là 'quản lý bản vẽ thi công và ứng dụng BIM'.

[^39]: [Đại Giáp Viên Đài Bắc - Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%BA%E5%8C%97%E5%A4%A7%E5%B7%A8%E8%9B%8B) — Mục từ Đại Giáp Viên (Taipei Dome) trên Wikipedia, ghi lại các thông số kỹ thuật của công trình bao gồm tổng diện tích sàn 120.000 m², tổng trọng lượng kết cấu thép 65.000 tấn và là đấu trường duy nhất trên thế giới sử dụng kết cấu ống thép tròn cho toàn bộ mái vòm.

[^40]: [United News: Lao động thế hệ ông nội trụ cột công trường, kỹ thuật ngành xây dựng đối mặt với sự đứt gãy](https://udn.com/news/story/124689/9220106) — Phóng sự điều tra của United News (聯合新聞網), ghi lại thực trạng già hóa của ngành xây dựng tại Tân Bắc với hơn 100 ca tử vong do tai nạn lao động, trong đó người trên 40 tuổi chiếm tới 77%.

[^41]: [Liberty Times: Thiếu hụt lao động nghiêm trọng toàn Đài Loan! Sắp hết hạn 15.000 chỉ tiêu lao động di cư trong ngành xây dựng](https://estate.ltn.com.tw/article/21452) — Báo cáo tài chính của Liberty Times (自由電子報), ghi lại cuộc khủng hoảng cấu trúc lực lượng lao động khi Bộ Lao động đồng ý mở 15.000 chỉ tiêu lao động di cư cho ngành xây dựng giai đoạn 2024-2026 và việc phân bổ sắp hoàn tất.

[^42]: [1111 Bank Nhân lực: Kết quả tìm kiếm vị trí Kỹ sư BIM với mức lương tháng trên NT$50,000](https://www.1111.com.tw/search/job?page=1&col=ab&sort=desc&ks=bim,%E7%B9%AA%E5%9C%96&st=1&sa0=50000*) — Trang tìm kiếm việc làm Kỹ sư BIM của 1111 Bank Nhân lực, ghi lại tình hình tiền lương kỹ sư BIM tại Đài Loan với 104 vị trí có mức lương trên NT$50,000 và mức lương khởi điểm cho người mới là từ NT$35,000 đến NT$45,000.

[^43]: [Tại sao BIM tại Đài Loan khó đi vào thực tế? Tiết lộ sự thật và bước ngoặt qua bốn giai đoạn](https://engineeringlifetw.com/whynotbim/) — Bài phân tích chuyên sâu từ blog Công trường Nhân sinh (工地人生), ghi lại những rào cản văn hóa trong việc thúc đẩy BIM tại Đài Loan: 'Trước đây quản lý xây dựng của chính phủ dựa trên CAD, quy trình ngành theo sau CAD, mô hình BIM trở thành công việc thuê ngoài, nhiều trung tâm hoặc đội ngũ BIM bị giải tán'.

[^44]: [Verakey Engineering: BIM là gì? Phân tích đầy đủ 5 ưu điểm lớn của BIM](https://veracityconsultant.com.tw/what-is-bim/) — Website chính thức của công ty tư vấn BIM Verakey, giải thích bản chất chuyển đổi số trong kỹ thuật khi BIM hệ thống hóa thông tin tòa nhà (vật liệu, quy cách, nhà cung cấp, giá cả, trình tự thi công, chu kỳ bảo trì).

[^45]: [Viện Nghiên cứu Kiến trúc thuộc Bộ Nội vụ Trung Hoa Dân Quốc: Kế hoạch quảng bá ứng dụng BIM](https://www.abri.gov.tw/News_Content_Table.aspx?n=807&s=39506) — Trang kế hoạch ABRI, ghi lại sự tự chẩn đoán về thực trạng thúc đẩy BIM tại Đài Loan: 'mô hình BIM trở thành công việc thuê ngoài, tách rời khỏi công trình thực tế, nhiều trung tâm hoặc đội ngũ BIM bị giải tán'.

[^46]: [Anthropic: Giới thiệu Giao thức Ngữ cảnh Mô hình (Model Context Protocol)](https://www.anthropic.com/news/model-context-protocol) — Thông báo chính thức từ Anthropic vào ngày 25 tháng 11 năm 2024 về việc mã nguồn mở Model Context Protocol (MCP), với mô tả "Hãy coi MCP như một cổng USB-C cho các ứng dụng AI" cùng với các bộ SDK Python / TypeScript / C# / Java được phát hành kèm theo.

[^47]: [Wikipedia: Model Context Protocol](https://en.wikipedia.org/wiki/Model_Context_Protocol) — Mục từ về MCP trên Wikipedia tiếng Anh, ghi lại dòng thời gian đầy đủ về việc Anthropic mã nguồn mở vào ngày 25 tháng 11 năm 2024 và kế hoạch Anthropic sẽ hiến tặng MCP cho Agentic AI Foundation (trực thuộc Linux Foundation) vào tháng 12 năm 2025.

[^48]: [Trang cá nhân GitHub của shuotao](https://github.com/shuotao) — Trang cá nhân GitHub của CHIANG SHUOTAO, ghi lại vị trí tại Tokyo và các kho lưu trữ thử nghiệm mã nguồn mở về BIM × MCP × AI (CAD_MCP_study, NAVISWORK_MCP, IFCSH, v.v.).

[^49]: [Kho lưu trữ GitHub shuotao/CAD_MCP_study](https://github.com/shuotao/CAD_MCP_study) — Dự án hướng dẫn mã nguồn mở về CAD × MCP của Thạc Đào (Shuotao), là một phần trong chuỗi thử nghiệm mã nguồn mở cá nhân về BIM × MCP × AI cùng với REVIT_MCP_study và NAVISWORK_MCP.

[^50]: [Architosh: Autodesk Revit 2027 — Những thay đổi lớn về AI và Đồ họa](https://architosh.com/2026/04/autodesk-revit-2027-big-new-ai-and-graphics-changes/) — Báo cáo vào tháng 4 năm 2026 của Architosh, phương tiện truyền thông chuyên dụng về phần mềm kiến trúc, ghi chép chi tiết các chức năng và cấu trúc cụ thể của MCP server tích hợp sẵn + Autodesk Assistant trong Autodesk Revit 2027.

[^51]: [AutoCAD - Wikipedia](https://en.wikipedia.org/wiki/AutoCAD) — Mục từ AutoCAD trên Wikipedia tiếng Anh, ghi lại dòng thời gian lịch sử từ khi ra mắt lần đầu trên nền tảng CP/M và IBM PC vào tháng 12 năm 1982, phiên bản Classic Mac OS năm 1992 và phiên bản Microsoft Windows năm 1993.

[^52]: [Mô hình thông tin công trình (BIM) - Wikipedia](https://zh.wikipedia.org/zh-tw/%E5%BB%BA%E7%AF%89%E4%BF%A1%E6%81%AF%E6%A8%A1%E5%9E%8B) — Mục từ BIM trên Wikipedia tiếng Hoa phồn thể, ghi lại lịch sử phát triển học thuật từ khi khái niệm BIM được đề xuất lần đầu vào năm 1975, các nghiên cứu của các học giả Phần Lan và Hoa Kỳ vào thập niên 1980, và việc Autodesk đưa ra thuật ngữ "Building Information Modeling" vào năm 2002.

[^53]: [BSI Đài Loan: Giá trị thương mại của Mô hình thông tin công trình (BIM)](https://www.bsigroup.com/zh-TW/insights-and-media/insights/blogs/business-value-of-building-information-modelling-bim/) — Blog chính thức của BSI Đài Loan, ghi nhận quan sát về vấn đề cấu trúc từ phía chủ đầu tư: "Chủ đầu tư thiếu nhận thức đầy đủ về ứng dụng BIM, thường làm việc theo quy trình kỹ thuật truyền thống, dẫn đến hiệu suất của công nghệ BIM bị hạn chế".
