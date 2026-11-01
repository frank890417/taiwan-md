---
title: 'Danh sách mô-đun hình ảnh hoá: mười chín cách nhìn thấy dữ liệu Đài Loan'
description: 'Ví dụ sống động của hệ thống mô-đun hình ảnh hoá bài viết Taiwan.md — sử dụng dữ liệu thực về nhà ở, dân số, chăm sóc y tế và quốc hội Đài Loan, mỗi mô-đun tw-* được render một lần, cùng với cú pháp và nguyên tắc thiết kế từ graph.md.'
date: 2026-06-06
category: 'About'
tags:
  ['Hình ảnh hoá dữ liệu', 'Công lý về nhà ở', 'Chính sách nhà ở', 'Dữ liệu mở']
author: 'Taiwan.md'
readingTime: 11
featured: false
lastVerified: 2026-06-12
lastHumanReview: false
image: '/article-images/society/taipei-skyline-housing-2026.webp'
imageCredit: 'Heeheemalu'
imageLicense: 'CC BY-SA 4.0'
imageSource: 'https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg'
relatedDiary: ['2026-07-16-222859-viz-evolution']
translatedFrom: 'About/視覺化模組型錄.md'
sourceCommitSha: '756ab2957'
sourceContentHash: 'sha256:e634c73174fd4145'
sourceBodyHash: 'sha256:5fe923f8d157fe62'
translatedAt: '2026-10-23T16:36:28.975415+00:00'
---

# Danh sách mô-đun hình ảnh hoá: mười chín cách nhìn thấy dữ liệu Đài Loan

> **Tổng quan 30 giây:** Trang này là "ví dụ sống động" của hệ thống hình ảnh hoá Taiwan.md — render mười chín mô-đun hình ảnh hoá bài viết, tất cả đều sử dụng dữ liệu thực Đài Loan (tỷ lệ giá nhà so với thu nhập, nhà ở công, già hoá dân số, trưng cầu ý dân, tỷ lệ điều dưỡng, ghế ngồi quốc hội). Nó là bạn đôi của hướng dẫn biên tập [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md): **graph.md giải thích "khi nào dùng loại nào, làm cách nào là tốt, cú pháp viết thế nào", trang này cho bạn thấy trực tiếp "nó trông như thế nào".** Mỗi mô-đun đều được render bằng HTML/SVG thuần túy, vì vậy con người, trình đọc màn hình, Google, bot AI đều đọc được cùng một bộ dữ liệu — đây chính là lý do tại sao chúng tôi chọn hình ảnh hoá tĩnh thay vì biểu đồ tương tác.

Khi viết một bài báo nói về số liệu, điều đáng sợ nhất là biến dữ liệu thành những đoạn văn xếp chồng số liệu, độc giả đọc tới phần trăm thứ ba rồi đầu óc trống rỗng. Công việc hình ảnh hoá là chuyển đổi "một đoạn văn bản dày đặc số liệu" thành "một cấu trúc có thể đọc được trong một thoáng".

Nhưng hình ảnh hoá của Taiwan.md có một nguyên tắc mà không ai khác có: **chúng tôi chỉ thực hiện "hình ảnh hoá mà cả LLM cũng có thể đọc được"**. Một biểu đồ tương tác được vẽ bằng D3 hoặc Canvas rất ấn tượng, nhưng GPTBot, PerplexityBot, ClaudeBot — những bot AI này không chạy JavaScript, nên với chúng biểu đồ đó chỉ là một khoảng trắng trống. Nhưng các biểu đồ mà chúng tôi làm bằng HTML ngữ nghĩa và inline SVG, dữ liệu nằm ngay trong mã nguồn, AI có thể đọc được và trích dẫn được dữ liệu ngôi thứ nhất của Đài Loan trong sáu ngôn ngữ. **Hình ảnh hoá mà LLM có thể đọc được, chính là hình ảnh hoá về chủ quyền.**

Dưới đây mười chín mô-đun, từ mô-đun "một con số lớn" đơn giản nhất đến "bản đồ gạch tạo tác sau lưng" "vòng cung ghế ngồi", được trình bày theo thứ tự. Cách viết cú pháp và nguyên tắc thiết kế đầy đủ nằm trong graph.md, ở đây chỉ có một câu "đây là gì, khi nào dùng".

## Số Đại Đài tw-figure

Đơn giản nhất nhưng hiệu lực nhất: đặt một con số gây chú ý ở kích cỡ lớn nhất, so sánh trước và sau để kể một câu chuyện chuyển đổi. Phù hợp là "sledgehammer stat" mở đầu.

```tw-figure
6.7 vạn → 87 vạn / bình
Giá bán lẻ bị tắc của Nhà ở Công Quốc thành Đài Bắc năm 1985, tới giá trung bình nhà phát triển bất động sản năm 2026 — cùng địa chỉ, khoảng 13 lần
Nền tảng nhà phát triển bất động sản, thực giá được đăng ký (Nhà ở Công Quốc thành)
```

## Nhóm Dữ liệu tw-stat

Khi một đoạn văn bản nhét ba bốn con số quan trọng song song, thay vì viết thành một câu dài, không tốt hơn đặt thành một hàng thẻ, để độc giả quét qua ngay lập tức.

```tw-stat
174.891 hộ | Nhà ở công được chính phủ xây dựng trực tiếp | 1976–1999
39 vạn hộ | Tổng lượng nhà ở công rộng nghĩa | Đến 2015 đã bãi bỏ
84,4% | Tỷ lệ sở hữu nhà toàn Đài Loan | 2024
Nguồn: Thông cáo báo chí của Viện Hành pháp về bãi bỏ Sắc lệnh Nhà ở Công Nhân dân, Nền tảng Thông tin Bất động sản của Bộ Nội vụ
```

Các mô-đun biên tập chứa dữ liệu (nhóm dữ liệu, thẻ đối lập, trục chính sách) giống như các mô-đun biểu đồ vậy cần gắn nhãn `Nguồn:`. Kiểm toán toàn bộ trang vào tháng 7/2026 phát hiện, các mô-đun được cân nhắc bởi cổng chỉ động tự động, tỷ lệ chú thích nguồn là 100%, ba mô-đun tần số cao không được cân nhắc lại có tỷ lệ 40% thiếu. Bây giờ chúng cũng bị kẹt vào cổng viz-health.

## Thẻ Đối lập tw-versus

Hai chế độ, hai lập trường, hoặc hai trạng thái trước và sau được so sánh từng điểm. Bên trái màu ấm, bên phải màu lạnh, giữa một "vs", để độc giả đọc từng hàng hiệu quả.

```tw-versus
Nhà ở công Đài Loan | Nhà ở công Hồng Kông
Chính phủ bao trợ, bán rẻ cho cư dân | Chính phủ bao trợ, bán rẻ cho cư dân
Cư dân cứ 1 năm có thể bán toàn thị giá trên toàn bộ thành phố | Để bán trên thị trường công khai phải "bổ sung giá đất" trước
Tăng giá gần như toàn bộ thuộc về cá nhân | Tăng giá theo tỷ lệ chiết khấu ban đầu được lấy lại vào kho bạc công
Tổng lượng công khai được mất trong một lần | Lợi tức công khai có thể được lấy lại
Nguồn: Báo quốc hội, Ủy ban Nhà ở Hồng Kông
```

## Thanh Tỷ lệ tw-bars

So sánh giá trị hoặc xếp hạng của ít loại hạng, độ dài của thanh ngang sẽ tự động co giãn theo giá trị, giá trị lớn nhất dãn ra hết. Hãy nhớ thêm một hàng `Nguồn:` vào cuối mô-đun dữ liệu, nó sẽ tự động trở thành chú thích nguồn bên dưới.

```tw-bars
Toàn quốc 2014 | 8,41 lần
Toàn quốc 2024 | 10,76 lần
Đài Bắc 2024 | 16,60 lần | Mức cao kỷ lục
Nguồn: Nền tảng Thông tin Bất động sản của Bộ Nội vụ, Trung tâm Nghiên cứu Bất động sản Đại học Chính trị Quốc gia Đài Loan
```

## Biểu Đồ Hình Vuông tw-waffle

Thành phần của một phần so với toàn thể, một trăm hình vuông đại diện cho 100%, trực quan hơn biểu đồ tròn — bạn có thể thực sự đếm các hình vuông. Phù hợp cho dữ liệu "mỗi loại chiếm bao nhiêu" cộng lại khoảng 100.

```tw-waffle
Thành phần nhà ở của Viên (2023)
Nhà ở xã hội công lập | 21,9
Nhà ở xã hội với lợi nhuận giới hạn | 21,4
Nhà ở tư hữu | 20,4
Cho thuê tư nhân | 36,3
Nguồn: Thống kê Nhà ở của Chính phủ Thành phố Viên (Stadt Wien)
```

## Trục Chính Sách tw-timeline

Các nút chính của chế độ hoặc chính sách, được kết nối bằng trục thời gian của các nút. Lưu ý đây là "hỗ trợ hình ảnh hoá", khác với tiêu đề phụ bài không thể dùng kiểu "Năm 1975…" làm tiêu đề.

```tw-timeline
1975 | Sắc lệnh nhà ở công có hiệu lực | Chính phủ xây dựng rồi bán, đặt "trách nhiệm người mua" để đóng vòng, sự bao trợ không thoát được
2002 | Bức tường đó bị phá hủy | Sửa đổi pháp luật hủy bỏ hạn chế trách nhiệm người mua, nhà ở công cứ 1 năm có thể bán cho bất kỳ ai
2015 | Sắc lệnh nhà ở công bị bãi bỏ | Lý do chính thức: tỷ lệ sở hữu nhà đã 85%, chuyển hướng chỉ cho thuê không bán
2026 | Taoyuan gài cánh cửa lại | Nhà ở có khả năng chi trả: bán lại không được vượt quá giá mua ban đầu
Nguồn: Báo quốc hội, Thông cáo báo chí của Viện Hành pháp về bãi bỏ Sắc lệnh Nhà ở Công Nhân dân
```

## Thẻ Trích Dẫn tw-quote

Khi một câu có thể đại diện cho toàn bộ căng thẳng cốt lõi của bài viết, hãy phóng to nó thành thẻ trích dẫn. Không cần tự thêm dấu ngoặc kép, mô-đun sẽ thêm vào. Trích dẫn phải là từ chữ, có thể kiểm chứng được.

```tw-quote
Ngôi nhà giá thị trường 3.000 vạn đô la, trở thành ngôi nhà 6.000 tới 7.000 vạn đô la……cướp từ người nghèo để giúp người giàu, nhà nước bỏ tiền giúp người giàu sửa chữa nhà
Lâm Trí Quần | Luật sư, 2025 đề xuất về "Nhà nước bỏ tiền cho cải tạo nhà ở Quốc thành"
```

## Thanh Nguồn tw-source

Tập trung dữ liệu từ một phân tích thành một chip tối giản, để bên cạnh một đoạn văn. Độ tin cậy là một phần của cải tạo — các phương tiện đa phương tiện kỹ thuật số Đài Loan thường quên gắn nhãn nguồn, đây là nơi chúng tôi có thể làm khác biệt.

```tw-source
Nền tảng Thông tin Bất động sản của Bộ Nội vụ, thực giá được đăng ký, Trung tâm Nghiên cứu Bất động sản Đại học Chính trị Quốc gia Đài Loan, Báo quốc hội, Ủy ban Nhà ở Hồng Kông
```

## Hộp Giải Thích tw-note

Độ tin cậy của bài báo dữ liệu có một nửa nằm ở "cách bạn tính toán". Đơn vị báo cáo sử dụng khối【Giải Thích】để làm rõ phương pháp tính toán, dùng （Ghi chú）để đánh dấu lỗi, chúng tôi biến thành mô-đun. Hàng đầu tiên viết `Giải Thích`／`Phương pháp`／`Ghi chú`／`Sửa chữa`／`Cập nhật` một trong số đó, các hàng còn lại mỗi hàng là một đoạn.

```tw-note
Giải Thích
Trang này "Chỉ số già hoá" = dân số từ 65 tuổi trở lên ÷ dân số từ 0–14 tuổi × 100. Bằng 100 có nghĩa là số người già và trẻ em bằng nhau, con số càng cao càng chỉ nơi đó "đầu nặng chân nhẹ". Tỷ lệ già hoá và chỉ số già hoá lấy từ thống kê cuối năm 2025 của Sở Dân cư Bộ Nội vụ, phân tích toàn bộ 22 tỉnh thành đầy đủ xem〈Dùng dữ liệu nhìn 22 tỉnh thành Đài Loan〉.
```

## Biểu Đồ Đường tw-line

Xu hướng của bốn điểm thời gian trở lên, vẽ bằng inline SVG thành đường, giới hạn trên-dưới của trục y sẽ được gắn nhãn để độc giả thấy phạm vi. Điều quan trọng nhất — nó sẽ **tự động tạo ra bảng dữ liệu ẩn**, để trình đọc màn hình và bot AI đọc dữ liệu gốc. Biểu đồ để người đọc, bảng để máy, cả hai cùng từ nguồn.

```tw-line
Mười năm tăng của tỷ lệ giá nhà so với thu nhập toàn quốc (lần)
Năm | Toàn quốc
2014 | 8,41
2016 | 9,32
2018 | 8,57
2020 | 9,20
2022 | 9,61
2024 | 10,76
Cơ sở: Điểm khởi đầu 2014 | 8,41
Nguồn: Trung tâm Nghiên cứu Bất động sản Đại học Chính trị Quốc gia Đài Loan, Nền tảng Thông tin Bất động sản của Bộ Nội vụ
```

Biểu đồ đường cũng hỗ trợ **đường cơ sở**: thêm một hàng `Cơ sở: nhãn | giá trị`, sẽ vẽ thành đường đứt, không có điểm cuối, chỉ có một nhãn, và chuỗi được đo lường trực quan tách biệt. Độc giả sẽ không nhầm một ngưỡng cố định thành dữ liệu được đo lường.

## Biểu Đồ Độ Dốc tw-slope

Khi bạn chỉ có "hai điểm thời gian", biểu đồ đường sẽ lãng phí chỗ trống giữa. Biểu đồ độ dốc cho độ dốc của đường nối hai đầu nói lên, ai tăng dữ dội, ai vượt qua ai, quét hoàn toàn một thoáng. Nhãn bắt đầu cộng `*` có thể nhấn mạnh một hàng, hàng còn lại tự động mòng mỏng lại thành bối cảnh.

```tw-slope
Tỷ lệ giá nhà so với thu nhập: mười năm ai tăng dữ dội (lần)
2014 | 2024
Toàn quốc | 8,41 | 10,76
*Đài Bắc | 12,0 | 16,60
Nguồn: Nền tảng Thông tin Bất động sản của Bộ Nội vụ, Trung tâm Nghiên cứu Bất động sản Đại học Chính trị Quốc gia Đài Loan
```

## Biểu Đồ Nhiệt tw-heatmap

So sánh ma trận khu vực × chỉ số, hoặc năm × loại. Mỗi cột được chuẩn hoá riêng lẻ thành sắc thái màu, con số càng lớn càng ấm áp. Nó tự nó là một bảng HTML, nên trời sinh là AI có thể đọc được — đây cũng là lý do tại sao bản đồ nhiệt trong hệ thống của chúng tôi tốt hơn "một bức ảnh màu".

```tw-heatmap
Tỉnh thành | Tỷ lệ giá nhà so với thu nhập (lần) | Tỷ lệ gánh nặng thế chấp nhà (%)
Đài Bắc | 16,60 | 63,9
Tân Bắc | 13,03 | 56,9
Đài Trung | 11,11 | 48,0
Taoyuan | 9,0 | 40,0
Nguồn: Nền tảng Thông tin Bất động sản của Bộ Nội vụ
```

## Biểu đồ điểm tw-dot

Nếu biểu đồ cột dùng để so sánh "lượng", thì biểu đồ điểm dùng để xem "phân phối": tất cả các điểm đều nằm trên cùng một thước đo, giúp bạn thấy rõ ai đang tập trung lại một chỗ và đâu là giá trị ngoại lai. Nếu mỗi hàng có một giá trị, nó sẽ là dạng dot strip; nếu cung cấp hai giá trị, nó sẽ vẽ thành một khoảng "từ đây đến đó"; nếu cung cấp ba giá trị (`giá trị ước tính | giới hạn dưới | giới hạn trên`), nó sẽ vẽ theo kiểu thăm dò dư luận gồm "điểm ước tính + dải khoảng không chắc chắn". Sai số lấy mẫu ±3% không nên bị bỏ qua, đây là sự thể hiện trung thực nhất thường bị lơ là trong các năm bầu cử. Ký hiệu `*` cũng có thể được dùng để nhấn mạnh.

```tw-dot
Sự phân cực của tỷ lệ già hóa: Từ các huyện/thành phố trẻ nhất đến già nhất (tỷ lệ trên 65 tuổi, %)
Huyện Tân Trúc | 15.08 | Trẻ nhất Đài Loan
Đào Viên | 16.72
Đài Trung | 17.40
Tân Bắc | 19.95
Đài Nam | 20.48
Cao Hùng | 20.79
*Chiayi | 24.11 | Chỉ số già hóa cao nhất Đài Loan
*Đài Bắc | 24.18 | Cao nhất Đài Loan
Nguồn: Cục Dân cư Bộ Nội vụ, cuối năm 2025
```

## Thanh Xếp Chồng tw-stack

Biểu đồ hình vuông phù hợp với "một toàn thể" của thành phần; thanh xếp chồng phù hợp với **so sánh thành phần qua nhiều hàng** — mỗi hàng tự động chuẩn hoá thành 100%, đoạn rộng đủ sẽ trực tiếp gắn nhãn giá trị trên khối màu.

```tw-stack
Ba cuộc trưng cầu ý dân về năng lượng hạt nhân: đồng ý vs không đồng ý (tỷ lệ phiếu hợp lệ %)
Trưng cầu | Đồng ý | Không đồng ý
2018 Năng lượng hạt nhân nuôi dương xanh | 59 | 41
2021 Khởi động lại Nhà máy điện hạt nhân thứ tư | 47 | 53
2025 Kéo dài Nhà máy điện hạt nhân thứ ba | 74 | 26
Nguồn: Kết quả trưng cầu chính thức được phê duyệt bởi Ủy ban Bầu cử Trung ương ba cuộc
```

## Kim Tự Tháp tw-pyramid

Thanh đối diện, bên trái và bên phải mỗi một đội quân, giữa nhãn chung, là biểu đồ kinh điển của nhân khẩu học. Ở đây dùng nó để xem sáu tỉnh thành "đầu nặng chân nhẹ": bên trái là trẻ em, bên phải là người già, hai bên so sánh, già hoá không phải là một tỷ lệ trừu tượng nữa.

```tw-pyramid
Đầu nặng chân nhẹ: tỷ lệ dân số 0–14 vs 65 tuổi trở lên của sáu tỉnh thành (%)
Tỉnh thành | 0–14 tuổi | 65 tuổi trở lên
Tân Trúc Huyện | 14,80 | 15,08
Taoyuan | 13,13 | 16,72
Đài Trung | 12,75 | 17,40
Đài Bắc | 11,97 | 24,18
Cơ Long | 9,28 | 22,28
Chiayi Huyện | 8,27 | 24,11
Nguồn: Sở Dân cư Bộ Nội vụ cuối 2025; tỷ lệ trẻ được tính từ tỷ lệ già hoá ÷ chỉ số già hoá × 100
```

## Bản Đồ Gạch Tỉnh Thành tw-tiles

Bản đồ sắc độ của Đài Loan có hai vấn đề cũ: diện tích Hoa Liên Đài Đông lớn tới phủ quyền trọng lực hình ảnh hoá, hình dạng Đài Loan được AI vẽ tay thường thay đổi "giữa quả ô liu và khoai tây". Bản đồ gạch xếp 22 tỉnh thành thành các khối gạch có kích cỡ bằng nhau (bố cục cố định trong hệ thống, theo vị trí tương đối thực tế), mỗi khối gạch bằng nhau, con số ghi trực tiếp trên gạch. Hình dạng luôn đúng, vì cơ bản không vẽ hình dạng.

```tw-tiles
Tỷ lệ già hoá 22 tỉnh thành toàn Đài Loan (dân số 65 tuổi trở lên chiếm %, %)
Đài Bắc Thị | 24,18
Tân Bắc Thị | 19,95
Taoyuan Thị | 16,72
Đài Trung Thị | 17,40
Đài Nam Thị | 20,48
Cao Hùng Thị | 20,79
Cơ Long Thị | 22,28
Tân Trúc Thị | 16,16
Chiayi Thị | 19,90
Tân Trúc Huyện | 15,08
Miêu Lật Huyện | 20,23
Chương Hóa Huyện | 20,37
Nam Đầu Huyện | 22,66
Vân Lâm Huyện | 21,76
Chiayi Huyện | 24,11
Bình Đông Huyện | 21,84
Nghi Lan Huyện | 20,77
Hoa Liên Huyện | 21,52
Đài Đông Huyện | 20,93
Bành Hồ Huyện | 21,03
Kim Môn Huyện | 19,69
Liên Giang Huyện | 17,14
Nguồn: Sở Dân cư Bộ Nội vụ, cuối 2025
```

## Biểu Đồ Đơn Vị tw-iso

"174.891 hộ" là một con số đọc xong rồi quên; chín chấm tròn có thể dùng tay đếm được không phải. Biểu đồ đơn vị chuyển đổi con số lớn thành "một ký hiệu = bao nhiêu" của đơn vị có thể đếm được, đây là tâm pháp của đơn vị báo cáo khi làm chuyên đề đánh bắt cá biển lớn: chuyển đổi con số khổng lồ vô cảm, thành đơn vị mà công chúng cảm nhận được. Ký hiệu chỉ dùng toàn bộ số (không cắt nửa), giá trị chính xác viết bên cạnh.

```tw-iso
Chính phủ xây dựng bao nhiêu nhà ở công trong 24 năm
單位：● = 20.000 hộ
Chính phủ xây dựng trực tiếp | 174.891 hộ | 1976–1999
Tổng lượng nhà ở công rộng nghĩa | 390.000 hộ dư thừa | Đến 2015 đã bãi bỏ
Nguồn: Thông cáo báo chí của Viện Hành pháp về bãi bỏ Sắc lệnh Nhà ở Công Nhân dân
```

## Vòng Cung Ghế Ngồi tw-arc

Thành phần ghế ngồi của hội nghị có chuyên dùng riêng của nó: mảng nửa hình tròn, một ghế một chấm, đảng phái xếp theo thứ tự thành quạt liên tục. Biểu đồ tròn so sánh góc (con mắt người rất không giỏi), vòng cung ghế ngồi cho bạn trực tiếp đếm chấm, đường quá nửa trực tiếp vẽ ở vị trí mà nó nên ở. Lưu ý nó là biểu đồ hội nghị: bầu cử 22 quận thống đốc kiểu "một vùng một thắng cuộc", phải dùng bản đồ gạch tỉnh thành ở dưới.

```tw-arc
2024 Ghế ngồi Viện Lập pháp: ba đảng phái không quá nửa (113 ghế)
過半：57
Quốc Dân Đảng | 52
Đảng Dân chủ Tiến bộ | 51
Đảng Nhân dân Đài Loan | 8
Vô đảng | 2 | Thiên về phía Quốc Dân Đảng
Nguồn: Ủy ban Bầu cử Trung ương
```

## Lưới Bội Số Nhỏ tw-multiples

Một biểu đồ nhét năm dòng, dòng sẽ cuộn thành mì Ý; lưới bội số nhỏ chia mỗi dòng sang ô riêng của mình, **tất cả ô chia sẻ cùng một thước**, hình dạng mới có thể so sánh được với nhau. Cùng một dữ liệu, hỏi những câu hỏi khác nhau, chọn các biểu đồ khác nhau.

```tw-multiples
Càng sâu đêm, càng cơ sở, một y tá chăm sóc giường bao nhiêu (người)
Cột: Ca | Tỷ lệ chăm sóc
--- Trung tâm Y học
Ca sáng | 6
Ca tối | 9
Ca đêm | 11
--- Bệnh viện Khu vực
Ca sáng | 7
Ca tối | 11
Ca đêm | 13
--- *Bệnh viện Địa phương
Ca sáng | 10
Ca tối | 13
Ca đêm | 15
Nguồn: Công khai tiêu chuẩn tỷ lệ chăm sóc ba ca của Bộ Sức khỏe và Phúc lợi, 2024
```

## Cách Dùng Những Mô-đun Này

Mỗi mô-đun đều là một khối ` ```tw-* ` trong Markdown của bài viết, dùng `|` để tách cột, thời điểm xây dựng tự động chuyển thành những gì bạn thấy ở trên — tác giả không cần viết bất kỳ HTML hoặc JavaScript nào. Cú pháp đầy đủ, lúc nào nên dùng loại nào, cách làm cho màu sắc và trục tọa độ không gây hiểu nhầm, cùng danh sách kiểm tra hình ảnh hoá trước khi phát hành, tất cả đều trong [graph.md](https://github.com/frank890417/taiwan-md/blob/main/docs/editorial/graph.md).

Hệ thống này tham khảo triết lý biên tập của phương tiện truyền thông kể chuyện hình ảnh hoá [The Pudding](https://pudding.cool/) — câu hỏi trước dữ liệu, kết luận phải rõ ràng, chú thích là nhân vật chính — nhưng phát triển thành cơ quan thích hợp cho chính Taiwan.md: tĩnh, đa ngôn ngữ, AI có thể đọc được. Bối cảnh thiết kế đầy đủ được viết trong [báo cáo thiết kế hệ thống hình ảnh hoá](https://github.com/frank890417/taiwan-md/blob/main/reports/article-visualization-design-2026-06-06.md).

Muốn xem những mô-đun này xen kẽ như thế nào trong một bài báo sâu sắc thực tế, hãy đọc Nhà ở Công và Công Lý Nhà Ở (國宅與居住正義) — dữ liệu của trang này hầu hết đến từ bài viết đó.

## Hệ Thống Này Tự Nó Cũng Đang Phát Triển

Bạn đang xem trang này, chính nó là kết quả ba vòng phát triển. Vì đây là trang nói về trục thời gian, thì dùng mô-đun trục chính sách để kể lịch sử của chính nó:

```tw-timeline
2026-06-06 | Mười mô-đun ra đời | Sau khi nghiên cứu The Pudding và phương pháp phân loại biểu đồ FT, phát triển batch đầu tiên: số lớn, thẻ đối lập, thanh tỷ lệ, đường
2026-06-12 | Một tuần sau phát triển thành mười bảy | Bổ sung độ dốc, biểu đồ chấm, xếp chồng, kim tự tháp, bản đồ gạch tỉnh thành, biểu đồ đơn vị; pixel kiểm chứng viên viz-shot cùng ngày ra đời, bởi vì "markup tồn tại" và "trông đúng" là hai chuyện
2026-07-16 | Mười chín, và học nói sáu thứ tiếng | Thêm vòng cung ghế ngồi và lưới bội số nhỏ; các chuỗi hệ thống như "dữ liệu nguồn" thay đổi để render bằng sáu ngôn ngữ, phiên bản tiếng Anh tiếng Nhật của bản đồ gạch tỉnh thành không còn suy giảm thành thanh dài
Nguồn: Báo cáo thiết kế và phát triển hệ thống hình ảnh hoá Taiwan.md (2026-06 đến 2026-07, GitHub công khai)
```

Trọng tâm của vòng thứ ba thực ra không phải là loại biểu đồ mới, mà là một lần kiểm tra chân thành của bản thân. Kiểm toán toàn bộ trang phát hiện: các mô-đun được cơ chế tự động cân nhắc, tỷ lệ chú thích nguồn 100%; không được cân nhắc ba mô-đun tần số cao, 40% không chú thích. Quy chuẩn được viết trong hướng dẫn biên tập hai tháng, hành vi hoàn toàn theo hình dạng của máy, nên lần này bổ sung máy rộng như quy chuẩn. Lần đó cũng phát hiện chuỗi hệ thống tại trang tiếng Anh, tiếng Nhật, tiếng Hàn đều render thành tiếng Trung, thậm chí một ký tự tiếng Trung giản thể bị trộn trong nhãn không có chướng ngại. Đối với hệ thống tuyên bố "cho phép LLM đọc dữ liệu Đài Loan trong sáu ngôn ngữ", những góc này quan trọng hơn tính năng mới.

Nghiên cứu gần đây cũng hỗ trợ đường này: độ chính xác của AI đa phương thức từ hình ảnh tái thiết lập dữ liệu biểu đồ không được tin cậy, nút văn bản mới là những gì máy thực sự đọc được ổn định. Chính vì vậy mà bản đồ gạch ghi con số trực tiếp trên gạch, mỗi biểu đồ đều kèm một bảng dữ liệu ẩn. Bối cảnh nghiên cứu đầy đủ và quyết định thiết kế, được viết trong [báo cáo nghiên cứu sâu và triển khai hệ thống hình ảnh hoá v3.0](https://github.com/frank890417/taiwan-md/blob/main/reports/viz-module-evolution-2026-07-16.md).

**Đọc thêm**:

- Nhà ở Công và Công Lý Nhà Ở (國宅與居住正義) — câu chuyện đầy đủ phía sau dữ liệu nhà ở: cách nhà ở công từ nhà giá rẻ trở thành thang máy tài sản, dữ liệu của trang này hầu hết đến từ đây
- Dùng Dữ Liệu Nhìn 22 Tỉnh Thành Đài Loan (用數據看台灣22縣市) — dữ liệu já hoá của biểu đồ chấm, kim tự tháp, bản đồ gạch tỉnh thành toàn bộ đến từ phân tích 22 tỉnh thành đầy đủ của trang này
- Đài Loan Với Năng Lượng Hạt Nhân Thảo Luận (台灣與核能的討論) — câu chuyện đầy đủ ba cuộc trưng cầu trong thanh xếp chồng: thắng trong tranh luận, thua trong chế độ
- Y Học Pháp (醫療法) — câu chuyện đầy đủ của ba ca tỷ lệ chăm sóc trong lưới bội số nhỏ: pháp luật viết được chăm sóc giường bao nhiêu, không viết được có bàn tay đó hay không
- Cuộc Thu Hồi Lớn (大罷免) — theo dõi sau của vòng cung ghế ngồi: làm thế nào viện lập pháp ba đảng phái không quá nửa đi đến 31 vụ thu hồi
- Khủng Hoảng Ít Sinh Đài Loan (台灣少子化危機) — mua không được nhà và sinh không được con, phía khác của công lý giữa các thế hệ

## Nguồn Gốc Hình Ảnh

Bài viết này sử dụng 1 hình ảnh được cấp phép Creative Commons, cache tại `public/article-images/society/`:

- [Chân trời thành phố Đài Bắc (góc nhìn Tượng Sơn)](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) — Ảnh: Heeheemalu, 2026, CC BY-SA 4.0 (hình chính)

## Tài Liệu Tham Khảo

[^1]: [Nền tảng Thông tin Bất động sản của Bộ Nội vụ](https://pip.moi.gov.tw/Publicize/Info/E1050) — Tỷ lệ giá nhà so với thu nhập, tỷ lệ gánh nặng thế chấp nhà, tỷ lệ sở hữu nhà và các thống kê nhà ở chính thức khác.

[^2]: [Trung tâm Nghiên cứu Bất động sản Đại học Chính trị Quốc gia Đài Loan](https://rer.nccu.edu.tw/article/detail/2210058908437) — Chỉ số khả năng chịu đựng giá nhà hàng năm, toàn bộ chuỗi tỷ lệ giá nhà so với thu nhập toàn quốc của biểu đồ đường và thanh tỷ lệ trên trang đến từ đây.

[^3]: [Thông cáo báo chí của Viện Hành pháp về bãi bỏ Sắc lệnh Nhà ở Công Nhân dân](https://www.ey.gov.tw/Page/9277F759E41CCD91/d4afaf10-ece5-4b4f-9482-35ce16bdc657) — Dữ liệu chính thức như tổng số hộ nhà ở công lũy tích (khoảng 390.000 hộ).

[^4]: [Dữ liệu thống kê dân số của Sở Dân cư Bộ Nội vụ](https://www.ris.gov.tw/app/portal/346) — Tỷ lệ dân số từ 65 tuổi trở lên trong từng tỉnh thành cuối năm 2025 và chỉ số già hoá, nguồn dữ liệu của biểu đồ chấm, kim tự tháp, bản đồ gạch tỉnh thành, hộp giải thích trên trang này; chuỗi xác minh đầy đủ xem Dùng Dữ Liệu Nhìn 22 Tỉnh Thành Đài Loan (用數據看台灣22縣市). [用數據看台灣22縣市](/vi/geography/data-taiwan-22-cities)

[^5]: [Ủy ban Bầu cử Trung ương - Kết quả cuộc trưng cầu ý dân số 16 năm 2018 (PDF)](https://web.cec.gov.tw/api/file/0132581c-18b5-4951-bc24-3cc083924666.pdf) — Tỷ lệ đồng ý ba cuộc trưng cầu ý dân về năng lượng hạt nhân (59% ／ 47% ／ 74%) là kết quả chính thức được phê duyệt bởi Ủy ban Bầu cử Trung ương, chuỗi xác minh từng trường hợp xem Đài Loan Với Năng Lượng Hạt Nhân Thảo Luận (台灣與核能的討論). [台灣與核能的討論](/vi/society/taiwan-nuclear-debate)

[^6]: [Trung ương Thông tấn Xã: 2024 Viện Lập pháp ba đảng phái không quá nửa](https://www.cna.com.tw/news/aipl/202401130361.aspx) — Phân bố 113 ghế (Quốc Dân Đảng 52, Đảng Dân chủ Tiến bộ 51, Đảng Nhân dân Đài Loan 8, Vô đảng 2) của vòng cung ghế ngồi là kết quả được phê duyệt của Ủy ban Bầu cử Trung ương, chuỗi xác minh xem Cuộc Thu Hồi Lớn (大罷免). [大罷免](/vi/history/great-recall-movement-2024)

[^7]: [Công khai tiêu chuẩn tỷ lệ chăm sóc ba ca của Bộ Sức khỏe và Phúc lợi (2024)](https://www.mohw.gov.tw/) — Giá trị tiêu chuẩn ba tầng × ba ca tỷ lệ chăm sóc trong lưới bội số nhỏ, chuỗi xác minh xem Y Học Pháp (醫療法). [醫療法](/vi/society/medical-care-act)
