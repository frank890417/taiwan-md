---
title: 'Vấn đề định danh Đài Loan trong các tiêu chuẩn quốc tế'
description: 'Từ mã ISO đến phần mềm nguồn mở — Tên của Đài Loan được ghi chép, tranh cãi và chỉnh sửa như thế nào trong cơ sở hạ tầng kỹ thuật số toàn cầu'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'Tiêu chuẩn quốc tế',
    'Phần mềm nguồn mở',
    'g0v',
    'Chủ quyền số',
    'Định danh Đài Loan',
  ]
subcategory: '國際關係'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:c6d4e2074d20efa4'
sourceBodyHash: 'sha256:234ae4c6ee15c7e0'
translatedAt: '2026-09-26T19:13:15+08:00'
---

# Vấn đề định danh Đài Loan trong các tiêu chuẩn quốc tế

> **Tóm tắt 30 giây:** Trong cơ sở hạ tầng kỹ thuật số toàn cầu, Đài Loan thường bị gắn nhãn là "Taiwan, Province of China". Nhãn hiệu này bắt nguồn từ bối cảnh chính trị quốc tế sau Nghị quyết 2758 của Đại hội đồng Liên Hợp Quốc năm 1971, ảnh hưởng đến các tiêu chuẩn quốc tế như ISO 3166 và lan rộng sang phần mềm nguồn mở cùng dịch vụ mạng toàn cầu. Cộng đồng nguồn mở liên tục thúc đẩy một phương thức định danh trung lập hơn thông qua báo cáo lỗi (bug report) và yêu cầu kéo (pull request).

Cách thức định danh Đài Loan trong cơ sở hạ tầng kỹ thuật số phản ánh sự khác biệt chính trị quốc tế kéo dài nửa thế kỷ. Đằng sau chi tiết kỹ thuật từ ISO 3166 đến giao diện lựa chọn máy chủ gương của Ubuntu là cuộc tranh cãi chưa được giải quyết về bản sắc của Đài Loan trong hệ thống quốc tế.

## Bối cảnh lịch sử: UN 2758 và ISO 3166

Năm 1971, Nghị quyết 2758 của Đại hội đồng Liên Hợp Quốc đã được thông qua, quy định rằng ghế đại diện của Trung Quốc tại Liên Hợp Quốc thuộc về Cộng hòa Nhân dân Trung Hoa, dẫn đến việc Trung Hoa Dân Quốc mất ghế tại Liên Hợp Quốc. Mặc dù nghị quyết này ban đầu chỉ liên quan đến ghế đại diện của Liên Hợp Quốc, nó sau đó đã được viện dẫn rộng rãi làm cơ sở để Đài Loan bị loại trừ hoặc được định danh theo một cách thức nhất định trong các tổ chức và cơ quan xây dựng tiêu chuẩn quốc tế. [^1]

Vào tháng 12 năm 1974, ISO 3166 lần đầu tiên công bố, tên mục của Đài Loan kể từ đó là "Taiwan, Province of China" và vẫn được duy trì đến nay. ISO 3166-1 đồng thời cấp cho Đài Loan mã hai chữ cái `TW`, nhưng cuộc tranh cãi về tên gọi chính thức đã tiếp diễn không có hồi kết.

Lập trường của ISO tuân theo cơ sở dữ liệu địa danh của Văn phòng Thống kê Liên Hợp Quốc (UNSD), mà cơ sở dữ liệu này lại truy ngược về bối cảnh chính trị sau UN 2758. Điều này tạo thành một hệ thống phụ thuộc lẫn nhau: các tiêu chuẩn quốc tế tham chiếu tài liệu của Liên Hợp Quốc, phần mềm nguồn mở tham chiếu các tiêu chuẩn quốc tế, và cuối cùng "Taiwan, Province of China" xuất hiện trong danh sách thả xuống của các nhà phát triển toàn cầu. [^2]

## Hành động chỉnh sửa của cộng đồng phần mềm nguồn mở

Bug #1138121 của Ubuntu (báo cáo năm 2013) là một trong những trường hợp được trích dẫn rộng rãi nhất. Khi người dùng Đài Loan thấy "Taiwan, Province of China" xuất hiện trên giao diện khi chọn máy chủ gương cho phần mềm, nhiều người cảm thấy bối rối. Người báo cáo đã đề nghị sử dụng cột tên chung (common name) trong ISO 3166, tức là chỉ đơn thuần là "Taiwan", thay vì tên chính thức đầy đủ.

Các vấn đề tương tự cũng tái diễn trong các dự án nguồn mở khác. Issue #43 của ISO-3166-Countries-with-Regional-Codes, PR 138672 của FreeBSD và Issue #1938892 của Drupal đều ghi nhận sự phản đối của cộng đồng đối với nhãn hiệu này. Giải pháp thường là chuyển sang sử dụng dữ liệu CLDR (Kho lưu trữ Ngôn ngữ Chung Unicode), trong đó định danh cho Đài Loan mang tính trung lập hơn. [^3]

Hành động chỉnh sửa của cộng đồng nguồn mở phản ánh sự giao thoa giữa kỹ thuật và chính trị: các nhà phát triển thường mong muốn áp dụng một nhãn hiệu trung lập hơn, nhưng bị giới hạn bởi mối quan tâm "tuân thủ tiêu chuẩn quốc tế", khiến việc sửa đổi đòi hỏi quá trình thảo luận cộng đồng kéo dài; một số người bảo trì cũng chọn né tránh vấn đề này. Các thành viên cộng đồng g0v (g0v) đã lâu nay tổng hợp các trường hợp liên quan, ghi lại phạm vi của vấn đề định danh Đài Loan trong hệ sinh thái phần mềm toàn cầu.

## Ảnh hưởng rộng hơn về tên gọi

Trong các sự kiện chính thức của tổ chức quốc tế, vấn đề đặt tên của Đài Loan còn rộng lớn hơn. Tại Đại hội Y tế Thế giới (WHA), Đài Loan từng được mời tham dự với tư cách quan sát viên dưới danh nghĩa "Chinese Taipei" trong khoảng thời gian từ năm 2009 đến năm 2016 (tổng cộng tám kỳ); kể từ năm 2017, Trung Quốc phản đối việc Đài Loan tiếp tục tham dự, và thư mời đã bị cắt đứt, Đài Loan chưa bao giờ nhận được lời mời chính thức nào sau đó. [^6] Tại Tổ chức Hàng không Dân dụng Quốc tế (ICAO), Đài Loan cũng không thể tham gia quyết định với tư cách thành viên chính thức, mà phải phụ thuộc vào các kênh không chính thức để lấy thông tin tiêu chuẩn hàng không, tạo ra một lỗ hổng tiềm tàng trong việc lưu chuyển thông tin an toàn hàng không. Tại Thế vận hội Olympic, Đài Loan đã tham gia kể từ năm 1981 với tên gọi "Chinese Taipei" (Trung Hoa Đài Bắc) — cái tên này bắt nguồn từ Hiệp định Lausanne được ký kết giữa Ủy ban Olympic Quốc tế và Ủy ban Olympic Trung Hoa vào năm 1981. Giải pháp thỏa hiệp này cũng được nhiều tổ chức quốc tế phi chính phủ áp dụng, và mở rộng sang các sự kiện như APEC.

Vấn đề đặt tên đã có sự mở rộng mới trong kỷ nguyên số. Ngoài ISO 3166, mã ngân hàng SWIFT, mã sân bay ICAO, cơ sở dữ liệu địa lý của các quốc gia đều có những cách định danh khác nhau cho Đài Loan, thiếu một tiêu chuẩn thống nhất.

Bản thân nhãn hiệu chính thức của ISO 3166-1 vẫn chưa thay đổi cho đến nay; cách mà mỗi công ty và dự án phần mềm hiển thị Đài Loan vẫn là quyết định riêng lẻ theo từng trường hợp.

## Thay đổi bìa hộ chiếu năm 2020

Vào ngày **2 tháng 9 năm 2020**, Bộ Ngoại giao Trung Hoa Dân Quốc đã công bố thiết kế hộ chiếu mới: dòng chữ "REPUBLIC OF CHINA" trên bìa ban đầu được thu nhỏ rõ rệt (vẫn giữ huy hiệu quốc gia), trong khi từ "TAIWAN" được phóng to đáng kể để ngang hàng với "REPUBLIC OF CHINA". Sự thay đổi này là phản ứng của chính phủ Đài Loan đối với vấn đề cụ thể về "sự nhầm lẫn định danh chủ quyền", sau các sự cố du khách Đài Loan bị nhiều quốc gia nhận nhầm là người Trung Quốc và bị từ chối nhập cảnh trong đại dịch COVID-19. Hộ chiếu phiên bản mới bắt đầu được phát hành từ **tháng 1 năm 2021**. [^4]

## Tranh cãi Chinese Taipei tại Thế vận hội Paris 2024

Trong thời gian **Thế vận hội Paris tháng 7-8 năm 2024**, Đài Loan tham gia với danh nghĩa "Chinese Taipei", nhưng công chúng Trung Quốc đã dịch tên này thành "Trung Quốc Đài Bắc" trên nhiều nền tảng mạng xã hội, tạo ra sự khác biệt rõ ràng so với bản dịch chính thức của Ủy ban Olympic. Các sự cố như khán giả Trung Quốc giật cờ và đoàn cổ vũ người Hoa tại Thế vận hội gây ra sự suy ngẫm lần thứ hai trong xã hội Đài Loan về Hiệp định Lausanne năm 1981. [^5]

## Trường hợp áp lực từ các tập đoàn đa quốc gia

Sự mở rộng áp lực của Trung Quốc đối với "nguyên tắc một Trung Quốc" đã lan rộng đáng kể sang lĩnh vực doanh nghiệp đa quốc gia sau những năm 2010. **Hàng không Hoa ngữ** (China Airlines) đã lâu sử dụng tên gọi này trên trường quốc tế, gây ra tranh cãi nội bộ về nhận dạng dân tộc Đài Loan (trong thời gian ngoại giao khẩu trang đại dịch năm 2020, bản kiến nghị "Đổi tên Hàng không Hoa ngữ" trên Change.org có khoảng 40 nghìn người hưởng ứng). Các công ty như **Delta Airlines**, **Marriott Hotels**, **American Airlines**, **Zara** đã từng bị Cục Hàng không dân dụng Trung Quốc hoặc Văn phòng An ninh mạng gây áp lực vì liệt kê "Taiwan" là quốc gia trên trang web, buộc họ phải sửa thành "China Taiwan" hoặc "China Taiwan Region". Những trường hợp này cho thấy "sức ảnh hưởng chính trị của tiêu chuẩn ISO" đã mở rộng từ lĩnh vực kỹ thuật sang công cụ gây áp lực địa chính trị.

## Quan điểm: Lập trường Trung Quốc

Theo lập trường chính thức của Cộng hòa Nhân dân Trung Hoa, "nguyên tắc một Trung Quốc" là cơ sở chính trị cho quan hệ hai bờ eo biển, khẳng định Cộng hòa Nhân dân Trung Hoa là chính phủ hợp pháp duy nhất của Trung Quốc, và Đài Loan là một tỉnh của Cộng hòa Nhân dân Trung Hoa (cấp hành chính là "Tỉnh Đài Loan"). Lập trường này đã ảnh hưởng trực tiếp đến nhãn hiệu "Taiwan, Province of China" mà ISO 3166 sử dụng từ năm 1974. Để hiểu vấn đề Đài Loan trong các tiêu chuẩn quốc tế, cần phải nhìn nhận đồng thời lập trường phản đối của chính phủ Trung Hoa Dân Quốc, sự khẳng định của Cộng hòa Nhân dân Trung Hoa, và phổ nhận dạng đa dạng của xã hội Đài Loan — ba bên này không nhất quán và không thể quy giản về một.

## Tháp Babel của chủ quyền: sovereignty preservation

Vấn đề định danh Đài Loan trong các tiêu chuẩn quốc tế bản chất là vấn đề **cơ sở hạ tầng bảo tồn chủ quyền** (sovereignty preservation infrastructure). Việc duy trì tiếng nói ngôi thứ nhất của Đài Loan trong mọi ngôn ngữ, mọi hệ thống, mọi cơ sở dữ liệu là cách để Đài Loan tiếp tục được nhìn nhận như một thực thể chính trị độc lập trong thời đại thông tin. Mỗi báo cáo lỗi, mỗi yêu cầu kéo, và mỗi lần cập nhật thiết kế hộ chiếu đều là một viên gạch xây dựng nên cơ sở hạ tầng này.

## Tài liệu tham khảo

[^1]: [Nghị quyết 2758 của Đại hội đồng Liên Hợp Quốc (1971)](<https://undocs.org/zh/A/RES/2758(XXVI)>) — Toàn văn nghị quyết quy định ghế đại diện của Trung Quốc tại Liên Hợp Quốc thuộc về Cộng hòa Nhân dân Trung Hoa.

[^2]: [Cơ quan Duy trì ISO 3166 — Nền tảng duyệt trực tuyến](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Mục Đài Loan trong ISO 3166-1, bao gồm mã TW và tên chính thức.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Báo cáo gốc về vấn đề định danh Đài Loan trên giao diện phần mềm Ubuntu, năm 2013.

[^4]: [Bìa hộ chiếu mới phóng to chữ TAIWAN phát hành tháng 1 năm 110](https://www.cna.com.tw/news/firstnews/202009020019.aspx) — Bản tin Trung ương ngày 2 tháng 9 năm 2020, Bộ Ngoại giao công bố thiết kế bìa hộ chiếu mới với chữ TAIWAN được phóng to, bắt đầu phát hành từ tháng 1 năm 2021.

[^5]: [Ủy ban Olympic Quốc tế — Hiệp định Olympic Chinese Taipei](https://www.olympic.org/) — Hiệp định Lausanne năm 1981 thiết lập tên gọi "Chinese Taipei"; tranh cãi do Trung Quốc dịch sai thành "Trung Quốc Đài Bắc" trong Thế vận hội Paris 2024.

[^6]: [Bộ Phúc lợi và Y tế Trung Hoa Dân Quốc — Giải thích về sự tham gia của Đài Loan tại WHO](https://www.mohw.gov.tw/) — Đài Loan đã tham dự WHA với tư cách quan sát viên từ năm 2009 đến 2016, không được mời lại sau năm 2017; bối cảnh bị ICAO loại trừ xem thêm giải thích liên quan của Bộ Ngoại giao.

## Đọc thêm

- [Cộng đồng g0v — Tổng hợp vấn đề định danh Đài Loan](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — Cơ sở dữ liệu các trường hợp định danh phần mềm nguồn mở do chewei tổng hợp
- [Nền tảng tra cứu trực tuyến ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Tra cứu nhãn hiệu hiện hành của Đài Loan trong ISO 3166-1
