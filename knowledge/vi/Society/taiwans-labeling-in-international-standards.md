---
title: 'Vấn đề ký hiệu của Đài Loan trong các tiêu chuẩn quốc tế'
description: 'Từ mã ISO đến phần mềm mã nguồn mở — tên gọi của Đài Loan được viết, tranh luận và sửa chữa như thế nào trong cơ sở hạ tầng số toàn cầu'
date: 2026-03-18
category: 'Society'
tags:
  [
    'ISO 3166',
    'Tiêu chuẩn quốc tế',
    'Phần mềm mã nguồn mở',
    'g0v',
    'Chủ quyền số',
    'Ký hiệu Đài Loan',
  ]
subcategory: 'Quan hệ quốc tế'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-03-19
lastHumanReview: false
translatedFrom: 'Society/台灣在國際標準中的標示問題.md'
sourceCommitSha: '18157ab5d'
sourceContentHash: 'sha256:5aa5d3ad7e4d012f'
translatedAt: '2026-09-10T02:39:58.042430+00:00'
---

# Vấn đề ký hiệu của Đài Loan trong các tiêu chuẩn quốc tế

> **Tóm tắt 30 giây:** Trong cơ sở hạ tầng số toàn cầu, Đài Loan thường được ký hiệu là 「Taiwan, Province of China」. Ký hiệu này xuất phát từ bối cảnh chính trị quốc tế sau Nghị quyết số 2758 của Đại hội đồng Liên hợp quốc năm 1971, ảnh hưởng đến các tiêu chuẩn quốc tế như ISO 3166, và lan rộng đến phần mềm mã nguồn mở và dịch vụ mạng toàn cầu. Cộng đồng mã nguồn mở liên tục đẩy mạnh việc ký hiệu trung lập hơn thông qua các bug report và pull request.

Trong cơ sở hạ tầng số toàn cầu, cách ký hiệu Đài Loan phản ánh sự phân歧 chính trị quốc tế kéo dài nửa thế kỷ. Từ ISO 3166 đến giao diện chọn máy chủ phản chiếu của Ubuntu, đằng sau một chi tiết kỹ thuật là những tranh chấp chưa kết thúc về việc xác định danh tính của Đài Loan trong thể hệ quốc tế.

## Bối cảnh lịch sử: Từ Nghị quyết 2758 của LHQ đến ISO 3166

Năm 1971, Nghị quyết số 2758 của Đại hội đồng Liên hợp quốc được thông qua, quyết định «ghế ngồi của Trung Quốc tại Liên hợp quốc» do Cộng hòa Nhân dân Trung Hoa đại diện, Trung Hoa Dân Quốc (Đài Loan) do đó mất đi ghế ngồi tại Liên hợp quốc. Quyết nghị này ban đầu chỉ liên quan đến ghế đại diện tại Liên hợp quốc, nhưng sau đó được trích dẫn rộng rãi làm cơ sở để Đài Loan bị loại trừ hoặc được ký hiệu theo cách cụ thể trong các tổ chức quốc tế và cơ quan thiết lập tiêu chuẩn đa dạng.[^1]

Năm 1974, tên mục của Đài Loan trong tiêu chuẩn quốc tế ISO 3166 được thay đổi từ «Taiwan» thành «Taiwan, Province of China», chính thức xác lập cách ký hiệu được duy trì đến nay. ISO 3166-1 đồng thời cấp cho Đài Loan mã hai chữ cái `TW`, nhưng tranh chấp về tên chính thức từ đó vẫn chưa được giải quyết.

Lập trường của ISO là tuân theo cơ sở dữ liệu địa danh của Văn phòng Thống kê Liên hợp quốc (UNSD), cơ sở này lại lấy nguyên tắc từ bối cảnh chính trị sau Nghị quyết 2758 của LHQ. Điều này hình thành một hệ thống phụ thuộc lẫn nhau: tiêu chuẩn quốc tế trích dẫn dữ liệu Liên hợp quốc, phần mềm mã nguồn mở trích dẫn tiêu chuẩn quốc tế, cuối cùng «Taiwan, Province of China» xuất hiện trong menu thả xuống của các nhà phát triển trên toàn cầu.[^2]

## Hành động chỉnh sửa của cộng đồng phần mềm mã nguồn mở

Bug #1138121 của Ubuntu (được báo cáo năm 2013) là một trong những trường hợp được trích dẫn nhiều nhất. Khi người dùng Đài Loan chọn trang gương (mirror) nguồn phần mềm, thấy dòng «Taiwan, Province of China» xuất hiện trên giao diện, nhiều người cảm thấy băn khoăn. Người báo cáo đề xuất áp dụng trường _common name_ trong ISO 3166, tức là đơn giản là «Taiwan», thay vì tên chính thức đầy đủ.

Vấn đề tương tự lặp lại trong các dự án mã nguồn mở khác. Issue #43 của ISO-3166-Countries-with-Regional-Codes, PR 138672 của FreeBSD, Issue #1938892 của Drupal đều ghi nhận sự phản đối của cộng đồng đối với cách biểu diễn này. Giải pháp thường được áp dụng là chuyển sang dùng dữ liệu CLDR (Unicode Common Locale Data Repository), nơi cách biểu diễn đối với Đài Loan mang tính trung lập hơn.[^3]

Hành động chỉnh sửa của cộng đồng mã nguồn mở phản ánh giao điểm giữa kỹ thuật và chính trị: các nhà phát triển thường mong muốn dùng biểu diễn trung lập hơn, nhưng bị ràng buộc bởi cân nhắc «tuân thủ tiêu chuẩn quốc tế», việc sửa đổi thường kéo dài qua nhiều vòng thảo luận của cộng đồng, một số người bảo trì cũng chọn cách tránh né vấn đề này. Thành viên g0v chewei đã lâu dài tổng hợp các trường hợp liên quan, ghi lại độ rộng của vấn đề biểu diễn Đài Loan trong hệ sinh thái phần mềm toàn cầu.

## Mở rộng hơn về tác động của việc đặt tên

Trong các trường hợp chính thức của các tổ chức quốc tế, vấn đề đặt tên cho Đài Loan có phạm vi rộng hơn. Tại Đại hội Y tế Thế giới (WHA), Đài Loan từng được mời tham dự với tư cách quan sát viên dưới danh tính "Chinese Taipei" (Đài Bắc Trung Hoa), thời gian từ 2009 đến 2016 (tổng cộng 8屆); kể từ 2017, Trung Quốc phản đối Đài Loan tiếp tục tham dự, thư mời do đó bị ngắt quãng, Đài Loan không còn nhận được thư mời chính thức nào nữa.[^6] Tại Tổ chức Hàng không Dân dụng Quốc tế (ICAO), Đài Loan cũng không thể tham gia ra quyết định với tư cách thành viên chính thức, lâu dài phải phụ thuộc vào các kênh phi chính thức để lấy thông tin tiêu chuẩn kỹ thuật hàng không, hình thành khoảng trống tiềm ẩn trong luân chuyển thông tin an toàn hàng không. Tại Thế vận hội Olympic, Đài Loan từ năm 1981 tham dự dưới danh nghĩa "Chinese Taipei" (Đài Bắc Trung Hoa) — tên gọi này xuất phát từ Hiệp định Lausanne năm 1981 giữa Ủy ban Olympic Quốc tế (IOC) và Hội Olympic Trung Hoa. Giải pháp thỏa hiệp này cũng được nhiều tổ chức quốc tế phi chính phủ tiếp tục áp dụng, và mở rộng ra các diễn đàn như APEC.

Vấn đề đặt tên có sự mở rộng mới trong kỷ nguyên số. Ngoài ISO 3166, mã ngân hàng SWIFT, mã sân bay ICAO, cơ sở dữ liệu địa lý của các chính phủ quốc gia, đều có cách ký hiệu khác nhau cho Đài Loan, thiếu tiêu chuẩn thống nhất. Từ năm 2023, một số doanh nghiệp công nghệ quốc tế (như Apple, Google Maps) sau khi nhận phản hồi từ người dùng, lần lượt điều chỉnh tên hiển thị của Đài Loan, nhưng ký hiệu chính thức của ISO 3166-1 bản thân không thay đổi, cho thấy sự tách biệt giữa việc triển khai của doanh nghiệp và tiêu chuẩn quốc tế vẫn đang mở rộng.

## Thay đổi bìa hộ chiếu năm 2020

**Ngày 2 tháng 9 năm 2020**, Bộ Ngoại giao Trung Hoa Dân Quốc công bố thiết kế hộ chiếu mới: chữ "REPUBLIC OF CHINA" trên bìa ban đầu được thu nhỏ rõ rệt (vẫn giữ quốc huy), trong khi chữ "TAIWAN" được phóng to lớn để song hành với "REPUBLIC OF CHINA". Thay đổi này đáp ứng các sự kiện trong đại dịch COVID-19 khi du khách Đài Loan ở nhiều quốc gia bị nhầm là công dân Trung Quốc và bị từ chối nhập cảnh, đây là lần đầu tiên chính phủ Đài Loan dùng thiết kế hộ chiếu để giải quyết vấn đề cụ thể là "nhầm lẫn ký hiệu chủ quyền". Hộ chiếu mới được phát hành từ **tháng 1 năm 2021**.[^4]

## Tranh议 "Đài Bắc Trung Hoa" tại Olympic Paris 2024

Trong kỳ **Olympic Paris tháng 7-8 năm 2024**, Đài Loan tham dự dưới danh nghĩa "Chinese Taipei", nhưng dư luận Trung Quốc trên nhiều nền tảng mạng xã hội dịch tên gọi này thành "Trung Quốc Đài Bắc" (中國台北), có sự chênh lệch rõ rệt so với bản dịch Trung văn do Hội Olympic quy định là "Chinese Taipei = Đài Bắc Trung Hoa". Các sự kiện như vận động viên Đài Loan bị khán giả Trung Quốc cướp cờ, đoàn cổ động người Đài Loan tại nước ngoài bị đoàn trưởng Trung Quốc quấy rối trong kỳ Olympic, đã khiến xã hội Đài Loan tái suy ngẫm về Hiệp định Lausanne năm 1981.[^5]

## Các ví dụ áp lực từ doanh nghiệp đa quốc gia

Áp lực mở rộng từ "Nguyên tắc một Trung Quốc" của Trung Quốc trong nửa sau thập niên 2010 đã lan rộng ra lĩnh vực doanh nghiệp đa quốc gia. **Hàng không Trung Hoa (China Airlines)** lâu năm dùng tên "China Airlines" trên đường bay quốc tế gây ra tranh cãi nội bộ về nhận diện dân tộc Đài Loan (nghị quyết "Hàng không Trung Hoa đổi tên" năm 2018). Các doanh nghiệp như **Delta Air Lines**, **Khách sạn Marriott**, **United Airlines**, **Zara**, **Starbucks**, **Marriott** từng bị Cơ quan Hàng không dân dụng Trung Quốc hoặc Văn phòng Thông tin mạng Trung Quốc施压 vì trang web liệt kê "Đài Loan" là quốc gia, bị buộc phải sửa thành "Trung Quốc Đài Loan" hoặc "Khu vực Đài Loan của Trung Quốc". Những ví dụ này cho thấy "hiệu lực chính trị của tiêu chuẩn ISO" đã từ lĩnh vực kỹ thuật mở rộng thành công cụ施压 địa chính trị.

## Góc nhìn: Lập trường Trung Quốc

Từ góc nhìn chính thức của Cộng hòa Nhân dân Trung Hoa, "Nguyên tắc một Trung Quốc" là cơ sở chính trị của quan hệ hai bờ, chủ trương Cộng hòa Nhân dân Trung Hoa là chính phủ hợp pháp duy nhất của 中國, Đài Loan là một tỉnh của Cộng hòa Nhân dân Trung Hoa (cấp hành chính là "Tỉnh Đài Loan"). Lập trường này ảnh hưởng trực tiếp đến việc ISO 3166 từ năm 1974 ký hiệu Đài Loan là "Taiwan, Province of China". Để hiểu vấn đề Đài Loan trong tiêu chuẩn quốc tế, phải đồng thời thấy lập trường phản đối của chính phủ Trung Hoa Dân Quốc, chủ trương của Cộng hòa Nhân dân Trung Hoa, và phổ nhận diện đa nguyên của xã hội Đài Loan — ba phía này không nhất quán, cũng không thể đơn giản hóa.

## Tháp Babel của chủ quyền: sovereignty preservation

Vấn đề ký hiệu Đài Loan trong tiêu chuẩn quốc tế, về bản chất là vấn đề của **hạ tầng giữ gìn chủ quyền (sovereignty preservation infrastructure)**. Để tiếng nói first-person (người thứ nhất) của Đài Loan tồn tại trong mọi ngôn ngữ, mọi hệ thống, mọi cơ sở dữ liệu, chính là cách duy trì để Đài Loan với tư cách thực thể chính trị độc lập tiếp tục được nhìn thấy trong kỷ nguyên thông tin. Mỗi báo cáo lỗi (bug report), mỗi yêu cầu kéo (pull request), mỗi lần cập nhật thiết kế hộ chiếu, đều là một viên gạch của công trình cơ sở hạ tầng này.

## Tài liệu tham khảo

## Đọc thêm

- [Cộng đồng g0v — Tổng hợp vấn đề ký hiệu Đài Loan](https://g0v.hackmd.io/5YRoMhveTt-aXwH60T2NZg) — cơ sở dữ liệu các trường hợp ký hiệu Đài Loan trong phần mềm mã nguồn mở do chewei tổng hợp
- [Nền tảng tra cứu trực tuyến ISO 3166](https://www.iso.org/obp/ui/#iso:code:3166:TW) — tra cứu ký hiệu hiện hành của Đài Loan trong ISO 3166-1

[^1]: [Nghị quyết số 2758 của Đại hội đồng Liên hợp quốc (1971)](https://undocs.org/zh/A/RES/2758(XXVI) — — Văn bản đầy đủ nghị quyết xác định ghế đại diện Trung Quốc tại Liên hợp quốc do Cộng hòa Nhân dân Trung Hoa nắm giữ.

[^2]: [ISO 3166 Maintenance Agency — Online Browsing Platform](https://www.iso.org/obp/ui/#iso:code:3166:TW) — Mục Taiwan trong ISO 3166-1, bao gồm mã TW và tên chính thức.

[^3]: [Ubuntu Launchpad — Bug #1138121](https://bugs.launchpad.net/ubuntu/+source/software-properties/+bug/1138121) — Báo cáo gốc về vấn đề hiển thị Taiwan trên giao diện nguồn phần mềm Ubuntu, năm 2013.

[^4]: [Bộ Ngoại giao Cộng hòa Trung Hoa — Thông báo hộ chiếu mới](https://www.mofa.gov.tw/) — Ngày 2 tháng 9 năm 2020 công bố thiết kế hộ chiếu mới, chữ TAIWAN được phóng to, phát hành từ tháng 1 năm 2021.

[^5]: [Ủy ban Olympic Quốc tế — Hiệp định Hội Olympic Trung Hoa Đài Bắc](https://www.olympic.org/) — Hiệp định Lausanne năm 1981 xác lập tên gọi «Chinese Taipei»; tranh cãi bùng nổ khi Trung Quốc sử dụng «Trung Quốc Đài Bắc» — bản dịch sai — trong Olympic Paris 2024.

[^6]: [Bộ Y tế Phúc lợi Cộng hòa Trung Hoa — Thông tin tham gia WHO của Taiwan](https://www.mohw.gov.tw/) — Từ 2009 đến 2016 Taiwan tham dự WHA với tư cách quan sát viên, từ 2017 không còn được mời; bối cảnh bị loại khỏi ICAO xem thêm thông báo liên quan của Bộ Ngoại giao.
