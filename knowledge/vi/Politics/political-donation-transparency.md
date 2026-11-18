---
title: 'Minh bạch tài chính chính trị: Nền tảng Viện Kiểm sát, Hình ảnh hoá g0v, 22 năm xây dựng cơ sở hạ tầng công khai'
description: 'Mở nền tảng truy vấn công khai tài chính chính trị của Viện Kiểm sát, nhập tên bất kỳ ứng cử viên nào, bạn có thể xem họ nhận bao nhiêu tiền từ những ai, chi tiêu cho những hoạt động tranh cử nào. Cơ sở hạ tầng này không phải do trời cho — nó từ Luật Tài chính Chính trị 2004, nền tảng trực tuyến 2008, Thỏa thuận công khai dữ liệu 2017 giữa Viện Kiểm sát và Trung ương Bầu cử, thêm mười năm bổ sung của các kỹ sư công dân g0v — từng luật, từng báo cáo tài chính, từng kỹ sư công dân xây dựng theo từng bước.'
date: 2026-05-27
category: 'Politics'
tags:
  [
    'tài chính chính trị',
    'minh bạch',
    'Viện Kiểm sát',
    'g0v',
    'dòng tiền bầu cử',
    'lập pháp 2004',
    'bầu cử 2026',
  ]
subcategory: '公民監督'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-05-27
lastHumanReview: false
readingTime: 12
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Politics/政治獻金透明度.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:8a7814971a9249c7'
sourceBodyHash: 'sha256:214c403ec0d7137c'
translatedAt: '2026-08-09T10:41:15+08:00'
---

# Minh bạch tài chính chính trị: Khi cơ sở hạ tầng dân chủ trở thành CSV có thể tải xuống

> **Tóm tắt 30 giây:** Vào một cuối tuần năm 2014, một kỹ sư g0v mở báo cáo tài chính chính trị của Viện Kiểm sát tại một sự kiện hackathon trên phố Thanh Đảo Đông, Đài Bắc. Anh không muốn nhiều — chỉ xem các công ty nào đã tài trợ cho ứng cử viên đại biểu lập pháp kỳ trước, mỗi khoản bao nhiêu. Nhưng tệp tải xuống là PDF. Không phải bảng biểu, không phải CSV, không phải JSON — là PDF quét. Anh để cốc cà phê xuống, mở terminal, bắt đầu viết dòng mã đầu tiên để trích xuất dữ liệu. Mười năm sau, Đài Loan có hệ thống "Dòng tiền bầu cử" — không phải chính phủ làm, mà là các kỹ sư công dân bổ sung. Nhưng vị trí họ bổ sung không phải là trống — dưới vị trí đó có một luật được đưa ra năm 2004, một nền tảng trực tuyến 2008, các báo cáo tài chính được tải lên Viện Kiểm sát theo luật. Bài viết này viết về vị trí đó — minh bạch tài chính chính trị, khía cạnh kỹ thuật nhất, hay bị bỏ qua nhất, nhưng cụ thể nhất của 22 năm xây dựng cơ sở hạ tầng dân chủ của Đài Loan.

---

## Tại sao bắt đầu từ PDF

Người dân bình thường không bao giờ truy vấn tài chính chính trị. Đó là sự thật.

Mở nền tảng truy vấn công khai tài chính chính trị của Viện Kiểm sát[^1], nhập tên ứng cử viên, tải xuống báo cáo — chuỗi các hành động này không nằm trong đời thường của hầu hết các cử tri. Sáng ngày bầu cử đi tới điểm bầu cử, bỏ phiếu, về nhà xem phát trực tiếp kết quả, đó là trải nghiệm chính của sự tham gia dân chủ. Nhưng **giá trị của cơ sở hạ tầng minh bạch không nằm ở số lượng người sử dụng nó, mà nằm ở sự tồn tại của nó**.

Khi một nhà báo điều tra muốn theo dõi một dòng tiền — nền tảng ở đó. Khi một ứng cử viên hội đồng muốn biết kỳ trước người lập pháp hiện tại nhận tiền từ những công ty nào — nền tảng ở đó. Khi một kỹ sư g0v muốn tạo hình ảnh hoá để dữ liệu dễ hiểu hơn — dữ liệu thô ở đó. Khi một học giả muốn nghiên cứu cấu trúc chính trị tiền tệ — dữ liệu tích lũy hai mươi năm ở đó.

Khi nền tảng không tồn tại, tất cả các câu hỏi này đều không thể xảy ra. Khi nền tảng tồn tại, chất lượng dân chủ có một ngưỡng dưới có thể xác minh được.

Đó chính là lý do khi Luật Tài chính Chính trị được thông qua vào năm 2004[^2], không phải một đảng nào đó thắng — mà là cơ sở hạ tầng dân chủ của Đài Loan phát triển thêm một bộ phận quan trọng.

## 2004: Năm hai đảng đạt được sự đồng thuận hiếm gặp

Ngày 26 tháng 3 năm 2004, Viện Lập pháp đã thông qua Luật Tài chính Chính trị ba lần[^2].

Không khí chính trị của năm đó thực ra không thuận lợi — Vụ nổ súng 3-19 mới qua 7 ngày, kết quả cuộc bầu cử tổng thống đã gây ra đối đầu xanh-đỏ, các nhóm biểu tình trước Đại lộ Ketagalan vẫn chưa tan. Nhưng Luật Tài chính Chính trị đã được thông qua trong mùa xuân có căng thẳng cao nhất này.

Tại sao hai đảng lại đạt được sự đồng thuận vào thời điểm này? Câu trả lời nằm lẫn trong lịch sử mười năm trước.

Kể từ những năm 1990, từ "chính trị tiền tệ" gần như là điểm yếu của mỗi đảng. Đảng Quốc dân bị cáo buộc kết hợp với các cơ sở địa phương (派系) và nhà tư bản, Đảng Dân chủ Tiến bộ bị cáo buộc nhận tài chính từ các doanh nhân mới nổi, các ứng cử viên độc lập không ai kiểm soát. Sau mỗi cuộc bầu cử đều có các bê bối tiền lẻ tẻ, nhưng vì không có luật đặc biệt, không có nghĩa vụ công khai, không có hình phạt — bê bối lên báo rồi tắt, dư luận nóng rồi mát. Cho tới khi năm 2000 xảy ra sự thay đổi chính quyền đầu tiên, chính phủ Trần Thủy Biển đẩy mạnh lập pháp, mặc dù Viện Lập pháp do Đảng Quốc dân kiểm soát đa số đối lập với hành pháp ở nhiều vấn đề, nhưng về việc "tài chính chính trị có nên công khai hay không", **hai đảng đều nhận thức được chính họ đã bị tổn thương bởi nhãn dán chính trị tiền tệ**. Nhu cầu về hình ảnh sạch sẽ lớn hơn sự tiện lợi của không công khai.

Luật Tài chính Chính trị ra đời lúc này — không phải do một anh hùng nào đẩy động, không phải do một phong trào nào bức ép, mà là hai đảng gặp nhau tại một điểm lợi ích chung.

## Khung xương của pháp luật: Ai có thể nhận, ai có thể tài trợ, giới hạn là bao nhiêu, cách khai báo

Toàn bộ Luật Tài chính Chính trị không dài, nhưng khung xương rõ ràng[^3].

**Điều 5: Ai có thể nhận tài chính chính trị**. Pháp luật định nghĩa ba loại "người nhận tài chính chính trị":

- Ứng cử viên (đã được đăng ký)
- Đảng chính trị
- Tổ chức chính trị (đã được thành lập theo luật)

Những người ngoài ba loại này nhận tài chính chính trị — vi phạm pháp luật. Trợ lý đại biểu, giám đốc chiến dịch kiểm soát tiền, vợ/chồng ứng cử viên kiểm soát tiền — tất cả không được phép. Thiết kế pháp luật là đẩy dòng tiền vào "chủ thể có thể khai báo" này, đẩy không gian xám ra ngoài.

**Điều 7: Ai có thể tài trợ**. Pháp luật cho phép ba loại nhà tài trợ:

- Công dân Đài Loan
- Công ty Đài Loan
- Tổ chức phi lợi nhuận Đài Loan

**Những gì bị cấm là những loại này**:

- Công ty nước ngoài, chính phủ nước ngoài, cá nhân nước ngoài
- Nhân dân, pháp nhân, tổ chức từ khu vực Cộng hòa Nhân dân Trung Hoa
- Cơ quan chính phủ, doanh nghiệp công
- Pháp nhân trong đó chính phủ hoặc doanh nghiệp công nắm giữ từ 20% trở lên
- Nhà thầu đang thực hiện hợp đồng với chính phủ[^4]

Điều khoản cuối cùng — nhà thầu chính phủ không thể tài trợ — được thiết kế để chặn "trao tài chính chính trị để đổi lấy hợp đồng chính phủ" tức là bức tường ngăn lửa cơ bản nhất.

**Điều 18: Giới hạn số tiền**. Đây là điều khoản thường được thảo luận nhiều nhất[^5]:

- Cá nhân cho cùng một ứng cử viên: Tối đa 1 triệu Đài Loan/năm mỗi 10 triệu
- Công ty cho cùng một ứng cử viên: Tối đa 10 triệu Đài Loan/năm mỗi 100 triệu [NEEDS-VERIFY]
- Cá nhân cho một đảng: Tối đa 3 triệu Đài Loan/năm mỗi 30 triệu
- Công ty cho một đảng: Tối đa 30 triệu Đài Loan/năm mỗi 300 triệu [NEEDS-VERIFY]

Logic thiết kế của giới hạn là để chặn ảnh hưởng của một nhà tài trợ duy nhất lên một ứng cử viên duy nhất quá lớn — nhưng chúng tôi sẽ thấy logic này sau được cấu trúc "tài trợ phân tán" vượt qua như thế nào.

**Điều 20: Nghĩa vụ khai báo**. Ứng cử viên phải khai báo với Viện Kiểm sát đầy đủ chi tiết thu chi tài chính chính trị trong thời hạn nhất định sau khi cuộc bầu cử — họ nhận tiền từ ai bao nhiêu, chi tiêu cho những mục nào, còn lại bao nhiêu. Tất cả dữ liệu khai báo được tải lên Hệ thống Kiểm tra Tài khoản Chính trị Công khai của Viện Kiểm sát, để làm nguồn dữ liệu cho việc truy vấn công khai sau này.

**Điều 26: Hình phạt**. Vi phạm sẽ phải đối mặt với tiền phạt từ 1 đến 5 lần, trong trường hợp nghiêm trọng hơn sẽ chịu trách nhiệm hình sự — tối đa 5 năm tù[^6]. Thiết kế hình phạt khiến "đơn giản là không khai báo" không phải là một lựa chọn hợp lý.

Pháp luật viết tới đây — khung xương hoàn thành. Nhưng khung xương không bằng cơ quan, cơ quan cần máu thịt. Máu thịt là nền tảng.

## 2008: Nền tảng Viện Kiểm sát trực tuyến

Bầu cử tổng thống lần thứ 12 năm 2008 — Mã Anh Cửu đối Tạ Trường Đình — là cuộc bầu cử tổng thống đầu tiên của Đài Loan áp dụng "toàn diện Luật Tài chính Chính trị và bắt buộc khai báo"[^7] [NEEDS-VERIFY].

Năm đó, Nền tảng Truy vấn Công khai Tài chính Chính trị của Viện Kiểm sát chính thức trực tuyến. Địa chỉ: `https://ardata.cy.gov.tw/`[^1].

Thiết kế mục tiêu của phiên bản đầu tiên của nền tảng rất đơn giản: số hóa dữ liệu tài chính chính trị trên giấy do ứng cử viên khai báo, đăng trực tuyến, mở cho công chúng truy cập. Bất kỳ ai cũng có thể nhập tên ứng cử viên / tên đảng / tên tổ chức chính trị, và tìm thấy chi tiết thu chi của các lần khai báo trước — bao gồm tên nhà tài trợ, số tiền, loại hình sử dụng của mỗi khoản.

Đây là một thiết kế hiếm gặp ở châu Á. **FEC của Mỹ (Federal Election Commission) có dữ liệu sâu hơn — nhưng lịch sử chỉ mở sau khi bầu cử**[^8]. Nhật Bản sau khi tăng cường Luật Quy định Tài chính Chính trị năm 2007 cũng có cơ chế công khai, nhưng "lỗ hổng tổ chức chính trị" khiến dòng tiền chính có thể vòng vào đường khác[^9]. Ủy ban Bầu cử Trung ương Hàn Quốc quản lý tập trung, nhưng giao diện kém thân thiện hơn Đài Loan[^10] [NEEDS-VERIFY].

Đài Loan ở vị trí này thực ra dẫn đầu — nhưng vị trí dẫn đầu không thể chặn câu hỏi tiếp theo.

**Vấn đề là: giao diện khó sử dụng, dữ liệu không được cấu trúc, không thể tải xuống hàng loạt**.

Mở phiên bản đầu tiên của nền tảng, bạn phải click từng PDF riêng. Bạn muốn xem một ứng cử viên nhận tiền từ những công ty nào — click mở PDF 1. Muốn xem ứng cử viên khác — click mở PDF 2. Muốn so sánh các ứng cử viên — tự mình viết lại bảng biểu. Muốn phân tích theo thời gian — tự mình sắp xếp dòng thời gian. Muốn xem liệu cùng một tập đoàn có chia thành hàng chục người đứng ra tài trợ hay không — bạn phải so sánh thủ công địa chỉ và tên.

Đó là cảnh tưởng của vị kỹ sư g0v năm 2014 khi anh mở tệp.

## 2014: g0v "Dòng tiền bầu cử" bắt đầu bổ sung

g0v là cộng đồng hacker công dân của Đài Loan[^11]. Tên gọi xuất phát từ "đổi gov.tw thành g0v.tw" — những công việc dữ liệu mở mà chính phủ không làm, cộng đồng tự làm.

Tại một hackathon vào năm 2014, vài kỹ sư quyết định làm dự án "Dòng tiền bầu cử"[^12]. Mục tiêu rõ ràng:

1. Tải xuống báo cáo PDF của Viện Kiểm sát
2. Phân tích thành dữ liệu có cấu trúc (CSV / JSON)
3. Tạo hình ảnh hoá để mọi người có thể hiểu
4. Mở mã tất cả các script tải xuống và phân tích

Bước đầu tiên đã gặp khó — PDF là quét, không phải PDF kỹ thuật số thực sự. Văn bản không thể sao chép trực tiếp. Họ phải viết pipeline OCR, viết chỉnh sửa định dạng, viết so sánh tên, viết loại bỏ trùng công ty.

Vài tháng sau, "Dòng tiền bầu cử" phiên bản đầu tiên trực tuyến[^12]. Mở trang web, thay vì thấy một báo cáo — bạn thấy một biểu đồ mạng lưới.

- Các vòng tròn đại diện cho ứng cử viên hoặc nhà tài trợ
- Đường thẳng đại diện cho hướng dòng tiền
- Độ dày đường thẳng đại diện cho số tiền lớn
- Các công ty liên quan của cùng một tập đoàn được gom nhóm màu

Bấm vào bất kỳ nút nào, xem chi tiết đầy đủ. Bấm vào bất kỳ liên kết nào, xem nguyên bản được khai báo (ghi chú số trang PDF của Viện Kiểm sát).

**Những gì hình ảnh hoá này làm, là biến dữ liệu đã công khai của Viện Kiểm sát thành có thể khám phá**. Pháp luật + Nền tảng + Hình ảnh hoá — ba lớp xếp chồng lên nhau, mới có thể "mở trình duyệt và theo dõi dòng tiền" này.

Không chỉ dự án "Dòng tiền bầu cử" này. Hệ sinh thái giám sát chính trị của g0v còn bao gồm:

- **councilor-voter-guide** (Hướng dẫn bầu cử hội đồng)[^13]: Tích hợp tài chính chính trị của các ứng cử viên hội đồng, tỷ lệ tham dự, hồ sơ đề xuất, hồ sơ chất vấn, tạo thành thẻ nhận dạng hội đồng viên
- **Tài chính chính trị bóng tối**[^14] [NEEDS-VERIFY]: Đánh dấu các mô hình dòng tiền có thể vi phạm hoặc đáng ngờ
- **So sánh chéo Hợp đồng chính phủ × Tài chính chính trị**: Kết nối dữ liệu báo cáo mua sắm chính phủ với dữ liệu tài chính chính trị, để xem nhà thầu nào thắng thầu đồng thời là nhà tài trợ tài chính chính trị

Đặc điểm của những dự án này là: **tất cả dữ liệu nguyên bản đều đến từ nguồn dữ liệu công khai của chính phủ**. Những gì cộng đồng làm không phải "tiết lộ bí mật", mà là "biến dữ liệu đã công khai nhưng khó sử dụng thành có thể sử dụng".

Đó là mô hình lành mạnh của cơ sở hạ tầng giám sát công dân của Đài Loan — chính phủ cung cấp dữ liệu thô, cộng đồng bổ sung giao diện và phân tích, các nhà báo và học giả sử dụng thành quả cộng đồng để giám sát. Ba lớp phân công mỗi cái làm những gì nó giỏi.

## 2017: Thỏa thuận công khai dữ liệu giữa Viện Kiểm sát và Ủy ban Bầu cử Trung ương

Năm 2017 là một điểm chuyển tiếp.

Năm đó, Viện Kiểm sát và Ủy ban Bầu cử Trung ương ký thỏa thuận công khai dữ liệu [NEEDS-VERIFY], một số dữ liệu tài chính chính trị bắt đầu được công khai dưới định dạng có cấu trúc (CSV / một số trường API)[^15]. Mặc dù không phải API hoàn chỉnh, vẫn có nhiều dữ liệu để dưới dạng PDF — nhưng đây là lần đầu tiên nền tảng dữ liệu chính thức của Đài Loan công nhận "dữ liệu có cấu trúc mới là công khai thực sự".

"Dòng tiền bầu cử" của g0v cũng chào đón phiên bản thứ hai vào thời điểm này[^12]. Phiên bản mới không cần xử lý lượng lớn dữ liệu bằng OCR, có thể trực tiếp sử dụng CSV chính thức — hiệu suất xử lý tăng, sai số giảm, phạm vi mở rộng.

Nhưng **API đầy đủ cho đến nay vẫn chưa được thực hiện**. Năm 2026 lúc này, nếu bạn muốn phân tích tài chính chính trị quy mô lớn, đa khu vực, đa năm, đa ứng cử viên, bạn vẫn phải phụ thuộc một phần vào các pipeline crawler được g0v duy trì. Dòng "chính phủ công khai dữ liệu" tại vị trí này của tài chính chính trị đã đi hai mươi hai năm vẫn chưa hoàn thành.

## Vấn đề cấu trúc: Pháp luật đã viết xong nhưng lỗ hổng tồn tại

Luật Tài chính Chính trị hoạt động hai mươi hai năm, tích lũy một số vấn đề cấu trúc, những vấn đề này không phải là lỗi thiết kế của chính pháp luật — chúng là thách thức phổ biến mà bất kỳ pháp luật minh bạch nào cũng gặp phải.

### Một, phân tán tài trợ để vượt qua giới hạn

Điều 18 của pháp luật đặt giới hạn cá nhân 10 triệu và công ty, có vẻ đủ để chặn ảnh hưởng tập trung. Nhưng trong thực tế, một tập đoàn có thể **chia một khoản tài trợ lớn thành hàng chục người đứng ra tài trợ**. Chủ tịch tập đoàn, vợ/chồng chủ tịch, giám đốc công ty con, nhân viên — mỗi người tài trợ 10 triệu theo tên riêng, cộng lại vượt quá giới hạn gấp trăm lần[^16].

Mô hình này về mặt kỹ thuật không vi phạm Điều 18 — mỗi cá nhân đều nằm trong giới hạn. Nhưng về thực chất là vượt qua. Để chứng minh đây là "phân tán" của cùng một khoản tiền, cần truy theo nguồn tiền, phỏng vấn những người liên quan — năng lực kiểm tra của Viện Kiểm sát không đủ để điều tra từng trường hợp.

### Hai, vùng xám của điều khoản vay mượn

Pháp luật cho phép ứng cử viên "vay tiền từ chính họ" để tranh cử — nghĩa là chính ứng cử viên hoặc người trong gia đình có thể cung cấp khoản vay lớn cho hoạt động tranh cử, sau đó trả lại từ các nguồn thu nhập khác [NEEDS-VERIFY]. Thiết kế này ban đầu là để bảo vệ ứng cử viên không bị vô khả năng tham gia vì thiếu vốn ban đầu, nhưng trong thực tế **vay mượn thường trở thành nguồn tài chính chính**. Vay mượn không được tính là "tài chính chính trị" — không bị ràng buộc bởi giới hạn Điều 18, cũng không ở trong bảng công khai cùng "nhà tài trợ".

Kết quả là: tài chính chính trị công bố của ứng cử viên có thể chỉ vài triệu, nhưng kinh phí tranh cử thực tế có thể cao tới hàng chục triệu, chênh lệch đến từ "vay chính họ" — và nguồn hoàn trả cuối cùng của "vay chính họ" thường nằm ngoài phạm vi giám sát của Luật Tài chính Chính trị.

### Ba, tài chính chính trị ≠ kinh phí tranh cử

Đây là điểm dễ gây nhầm lẫn nhất.

**Tài chính chính trị** là tiền mà ứng cử viên "nhận được" — bị ràng buộc bởi giới hạn Điều 18, phải khai báo với Viện Kiểm sát. **Kinh phí tranh cử** là tiền mà ứng cử viên "chi tiêu" — bị ràng buộc bởi giới hạn kinh phí Điều 41 của Luật Bầu cử và Lưu diễn Công chức[^17], phải khai báo với Ủy ban Bầu cử Trung ương.

Hai cái là những chủ thể khác nhau (Viện Kiểm sát vs Ủy ban Bầu cử Trung ương), những hệ thống khai báo khác nhau, những giao diện công khai khác nhau, những định nghĩa trường khác nhau. **Về lý thuyết nên phù hợp lại** — tiền vào trừ đi số dư bằng tiền chi — nhưng trong thực tế hai bên dữ liệu thường không đối giá được. Nguyên nhân là khác biệt định nghĩa, khác biệt tiến độ khai báo, khác biệt mục đích quỹ dư.

Cộng đồng g0v đã cố gắng làm "so sánh chéo tài chính chính trị × kinh phí tranh cử" — nhưng việc kết nối đa nền tảng cần công việc normalize khổng lồ[^12].

### Bốn, lưu diễn, công bố không áp dụng yêu cầu công khai

Luật Tài chính Chính trị quy định "bầu cử ứng cử viên" — không bao gồm đề xuất lưu diễn, không bao gồm đề xuất công bố.

Trong phong trào lưu diễn lớn năm 2025, quỹ của nhóm kết nối không có nghĩa vụ công khai tương đương[^18]. Nhóm đề xuất có thể nhận tài trợ, có thể động viên, nhưng không có hệ thống khai báo Viện Kiểm sát tương ứng. Lỗ hổng này sau phong trào lưu diễn quy mô lớn năm 2025 trở thành một hướng sửa đổi được thảo luận — nhưng Luật Tài chính Chính trị từ 2018 trở đi chưa được sửa đổi lại, cho đến tháng 7 năm 2026, dòng tiền của các nhóm đề xuất lưu diễn và công bố vẫn nằm ngoài nghĩa vụ khai báo theo luật.

## So sánh quốc tế: Vị trí tương đối của Đài Loan ở châu Á

Đặt lại hệ tọa độ châu Á:

| Quốc gia | Cơ quan quản lý          | Thời gian công khai                                     | Thân thiện giao diện                    | Chế độ giới hạn                   |
| -------- | ------------------------ | ------------------------------------------------------- | --------------------------------------- | --------------------------------- |
| Đài Loan | Viện Kiểm sát            | 3-6 tháng sau bầu cử                                    | Trung bình (một phần có cấu trúc)       | Cá nhân 10 triệu / Công ty có hạn |
| Mỹ       | FEC                      | Sau bầu cử (một phần khai báo định kỳ trước bầu cử)[^8] | Cao (API đầy đủ)                        | Cá nhân / PAC phân tầng           |
| Nhật Bản | Bộ Nội vụ                | Báo cáo hàng năm                                        | Thấp (chủ yếu PDF)[^9]                  | Lỗ hổng tổ chức chính trị lớn     |
| Hàn Quốc | Ủy ban Bầu cử Trung ương | Sau bầu cử                                              | Thấp (giao diện cũ)[^10] [NEEDS-VERIFY] | Quản lý tập trung                 |

Vị trí tương đối của Đài Loan là: **cơ sở pháp luật hoàn chỉnh, nền tảng tồn tại, giới hạn hợp lý, nhưng giao diện vẫn có chỗ cải thiện, lỗ hổng cấu trúc cần sửa đổi pháp luật**.

Không phải tốt nhất — FEC của Mỹ vẫn là tiêu chuẩn quốc tế về độ sâu của dữ liệu và hoàn chỉnh của API. Nhưng cũng không phải tệ nhất — so với một số nước láng giềng "hình thức có công khai, thực chất không thể tìm kiếm", nền tảng Viện Kiểm sát của Đài Loan cộng với bổ sung của g0v là một hệ sinh thái đang hoạt động.

## Điểm quan sát của cuộc bầu cử 2026

Cuộc bầu cử đa năng ngày 28 tháng 11 năm 2026 — Thị trưởng trực tiếp 6, hội đồng thành phố 380, thị trưởng tỉnh 16, hội đồng tỉnh 532, thị trưởng huyện/thị 198, đại biểu 2,148, trưởng huyện người bản địa 6, hội đồng huyện 50, trưởng xã/phường 7,748 — tổng cộng hơn 10.000 chức vụ dân cử[^19].

Những điểm quan sát minh bạch tài chính chính trị của cuộc bầu cử này, có vài cái đáng theo dõi:

**Một, khai báo thực thời có mở rộng không**. Hiện tại ứng cử viên khai báo sau khi bầu cử, mở công khai vài tháng sau. Nếu khai báo định kỳ trước bầu cử (dù chỉ cập nhật hàng tháng), ý nghĩa với quyết định của cử tri sẽ cao hơn. Điều này cần sửa đổi pháp luật hoặc điều chỉnh cấp độ lệnh hành chính của Viện Kiểm sát.

**Hai, g0v phản chiếu thực thời có thể che phủ không**. "Dòng tiền bầu cử" của g0v hằng năm sẽ làm hình ảnh hoá hoàn chỉnh sau bầu cử lớn, nhưng phạm vi che phủ "trước bầu cử" vẫn còn hạn chế. 2026 có thể có lộ trình dữ liệu công dân gần như thời gian thực hơn hay không, tùy thuộc vào động lực cộng đồng.

**Ba, độ tập trung của tài trợ lớn**. Quan sát tỷ lệ của vài nhà tài trợ trong tổng tài chính chính trị của ứng cử viên — độ tập trung càng cao, ứng cử viên phụ thuộc vào một số ít chủ tài trợ càng sâu. Đây là chỉ số đại diện để đo lường cấu trúc chính trị tiền tệ.

**Bốn, so sánh nhà thầu chính phủ**. Điều 7 cấm nhà thầu chính phủ tài trợ — nhưng thực hiện đa kỳ có trễ (ngày ký kết vs ngày tài trợ quan hệ phức tạp). Mỗi kỳ bầu cử sau bầu cử đều có các trường hợp lẻ gây ra điều tra của Viện Kiểm sát. Độ sâu che phủ của các trường hợp loại này năm 2026 cũng là điểm quan sát.

**Năm, lỗ hổng công khai lưu diễn / công bố**. Thảo luận sửa đổi pháp luật được đề cập trước đây có hiện thực hoá không.

## Tại sao cơ sở hạ tầng này đáng giá được trân trọng

Quay lại cảnh tưởng của vị kỹ sư g0v mở PDF.

Nếu bạn hỏi anh: "Tại sao bạn lại dành cuối tuần để làm điều này? Dù sao đa số người cũng sẽ không dùng." — Anh sẽ không trả lời "vì dân chủ", sẽ không trả lời "vì minh bạch", có thể cũng không trả lời "vì giám sát công dân".

Anh sẽ trả lời — "vì dữ liệu này **nên** có thể sử dụng như vậy, nhưng bây giờ không được".

Đây là bản chất của văn hóa kỹ sư công dân Đài Loan — **không phải cách mạng, không phải đấu tranh, mà bổ sung**. Chính phủ đã làm 80 điểm công việc, những gì còn lại là 20 điểm khả năng sử dụng, khả năng khám phá, khả năng phân tích, cộng đồng bổ sung.

Viện Kiểm sát đã làm tối đa những gì Luật Tài chính Chính trị có thể cho họ làm — tiếp nhận dữ liệu, lưu trữ dữ liệu, cung cấp giao diện truy vấn. g0v đã làm mở rộng ngoài giao diện của Viện Kiểm sát — hình ảnh hoá, so sánh đa nguồn dữ liệu, API hoá, tài liệu cộng đồng. Các nhà báo đã làm báo cáo điều tra trên hình ảnh hoá của g0v — khai thác câu chuyện đằng sau biểu đồ mạng lưới. Học giả đã làm phân tích cấu trúc dữ liệu tích lũy dài hạn — viết xu hướng mỗi kỳ thành luận án.

**Phân công bốn lớp này không phải mỗi cái làm mỗi, mà là những nút khác nhau của chuỗi — một chuỗi duy nhất**. Mỗi lớp bổ sung những gì lớp dưới không thể làm. Mất bất kỳ lớp nào, lớp tiếp theo cũng không thể tồn tại.

Ngày bầu cử cuộc bầu cử đa năng 2026, toàn bộ 7.748 trưởng xã/phường tới 6 thị trưởng thành phố — kết thúc bầu cử, kết thúc tính phiếu, người thắng người thua — mọi người rời mắt. Nhưng cơ sở hạ tầng này sẽ không dừng. Hệ thống khai báo của Viện Kiểm sát sẽ nhận tất cả bảo cáo kế toán của ứng cử viên, crawler của g0v sẽ tải xuống vòng dữ liệu mới, hình ảnh hoá thế hệ mới sẽ bắt đầu được viết ở bàn cà phê của một hackathon nào đó.

**Hình dáng cụ thể của cơ sở hạ tầng dân chủ, chính là kiểu không anh hùng, ngày qua ngày, biến dữ liệu thành có thể sử dụng này**.

Mở trình duyệt, nhập địa chỉ, tìm kiếm tên ứng cử viên — hành động này phía sau có lập pháp năm 2004, nền tảng 2008, hackathon 2014, thỏa thuận 2017, duy trì tiếp tục 2026.

Hai mươi hai năm, một dòng tiền nhìn không thấy trở thành có thể truy vấn được.

🧬

## Đọc thêm

- Cộng đồng mã nguồn mở và g0v (Công dân Hacker) — Cách cộng đồng kỹ sư công dân hoạt động, tại sao Đài Loan có hệ sinh thái này
- Trung tâm chính trị — Góc nhìn toàn cảnh về cơ sở hạ tầng dân chủ
- Cuộc bầu cử đa năm 2026 — Sắp xếp hệ thống và lịch trình bầu cử năm 2026
- Chế độ Ủy ban Bầu cử Trung ương — Thiết kế và hoạt động của Ủy ban Bầu cử Trung ương
- Cuộc bầu cử đa năm là gì — Chín vị trí, chín câu chuyện lịch sử

---

## Tài liệu tham khảo

[^1]: [Nền tảng Truy vấn Công khai Tài chính Chính trị của Viện Kiểm sát](https://ardata.cy.gov.tw/) — Cổng truy cập dữ liệu tài chính chính trị chính thức của Viện Kiểm sát, cung cấp dữ liệu khai báo của các kỳ cho ứng cử viên / đảng chính trị / tổ chức chính trị.

[^2]: [Lịch sử lập pháp Luật Tài chính Chính trị](https://lis.ly.gov.tw/lglawc/lawsingle?00396B05E12200000000000000014000000004000000^03083093032600^00133001001) — Hệ thống Tra cứu Tích hợp Pháp luật của Viện Lập pháp, được thông qua ba lần vào ngày 26 tháng 3 năm 2004. [NEEDS-VERIFY Link]

[^3]: [Toàn bộ Luật Tài chính Chính trị](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Cơ sở dữ liệu pháp quy toàn quốc của Bộ Tư pháp.

[^4]: [Điều 7 của Luật Tài chính Chính trị](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Nguồn dữ liệu chính thức của Điều 7 Luật Tài chính Chính trị

[^5]: [Điều 18 của Luật Tài chính Chính trị](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Giới hạn số tiền tài chính chính trị. Các con số cụ thể tuân theo phiên bản mới nhất của cơ sở dữ liệu pháp quy.

[^6]: [Điều 26-31 của Luật Tài chính Chính trị](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020042) — Nguồn dữ liệu chính thức của Điều 26-31 Luật Tài chính Chính trị

[^7]: [Tiến trình phát triển nền tảng tài chính chính trị của Viện Kiểm sát](https://ardata.cy.gov.tw/) — Trang Giới thiệu của nền tảng ghi lại các điều chỉnh trọng yếu ở mỗi lần. [NEEDS-VERIFY năm chính thức trực tuyến]

[^8]: [FEC: Federal Election Commission](https://www.fec.gov/) — Trang chính thức của Ủy ban Bầu cử Liên Bang Mỹ, cung cấp API tài chính ứng cử viên hoàn chỉnh.

[^9]: [Luật Quy định Tài chính Chính trị Nhật Bản](https://www.soumu.go.jp/senkyo/seiji_s/) — Trang web về tài chính chính trị của Bộ Nội vụ Nhật Bản.

[^10]: [Ủy ban Bầu cử Trung ương Hàn Quốc](https://www.nec.go.kr/) — Ủy ban Bầu cử Trung ương Hàn Quốc. [NEEDS-VERIFY đánh giá thân thiện giao diện]

[^11]: [g0v Không Thời Đại](https://g0v.tw/) — Trang chính thức của cộng đồng hacker công dân Đài Loan.

[^12]: [Dự án Dòng tiền bầu cử của g0v](https://g0v-money-flow.github.io/elections/) — Trang web dự án hình ảnh hoá tài chính chính trị.

[^13]: [Hướng dẫn bầu cử hội đồng của g0v](https://github.com/g0v/councilor-voter-guide) — Kho GitHub Hướng dẫn bầu cử hội đồu.

[^14]: [Tập hợp các dự án liên quan bầu cử của g0v](https://g0v.tw/projects) — Tập hợp các công cụ mã nguồn mở của công dân giám sát tài chính chính trị. Tên dự án cụ thể sẽ được bổ sung.

[^15]: [Giải thích dữ liệu công khai tài chính chính trị của Viện Kiểm sát](https://ardata.cy.gov.tw/) — Giải thích tải xuống dữ liệu nền tảng và các trường mở. [NEEDS-VERIFY ngày ký thỏa thuận 2017]

[^16]: [Bài luận Hội Khoa học Chính trị Đài Loan](http://www.tpsahome.org.tw/) — Thảo luận học thuật về phân tán tài trợ để vượt qua giới hạn nằm rải rác trong đó. Bài viết không trích các trường hợp cụ thể tuân theo nguyên tắc "không nêu tên" chung.

[^17]: [Điều 41 của Luật Bầu cử và Lưu diễn Công chức](https://law.moj.gov.tw/LawClass/LawAll.aspx?pcode=D0020010) — Cách tính toán số tiền kinh phí tranh cử cao nhất.

[^18]: [Hệ thống Tích hợp Dự án Viện Lập pháp](https://misq.ly.gov.tw/) — Vấn đề công khai dòng tiền của phong trào lưu diễn lớn năm 2025 được phân tán trong thảo luận sửa đổi pháp luật, Viện Lập pháp chưa đưa vào chương trình chính thức.

[^19]: [Thông báo liên quan cuộc bầu cử đa năm 2026 của Ủy ban Bầu cử Trung ương](https://www.cec.gov.tw/) — Trang web chính thức của Ủy ban Bầu cử Trung ương. [NEEDS-VERIFY số lượng vị trí chính xác tuân theo thông báo cuối cùng của Ủy ban Bầu cử Trung ương]

---

_Cập nhật lần cuối: 2026-05-27 — Bài viết mới từ loạt Trung tâm Chính trị bầu cử Đa năm 2026._
_Tác giả: Taiwan.md 🧬_
