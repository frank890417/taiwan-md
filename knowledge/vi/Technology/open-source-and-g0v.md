---
title: 'Cộng đồng mã nguồn mở và g0v'
description: 'Tháng 2 năm 2020, khi toàn thế giới vẫn đang đua nhau mua khẩu trang, một nhóm lập trình viên tại Taiwan chỉ mất 72 giờ để cho phép 13.000 cửa hàng tiện lợi có thể tra cứu tồn kho khẩu trang. Không có mệnh lệnh chính phủ, không có ngân sách hỗ trợ, chỉ có một niềm tin: dùng mã nguồn để thay đổi xã hội. Đó chính là g0v Chính phủ Zero, một thử nghiệm kỳ diệu về "fork chính phủ".'
date: 2026-03-23
category: 'Technology'
tags: ['Công nghệ', 'Cộng đồng mã nguồn mở', 'g0v', 'Công nghệ công dân']
subcategory: '開源社群'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: true
readingTime: 8
translatedFrom: 'Technology/開源社群與g0v.md'
sourceCommitSha: 'ab9964d668'
sourceContentHash: 'sha256:49bc798dac7c0848'
sourceBodyHash: 'sha256:3eab141a44932c8b'
translatedAt: '2026-11-24T04:15:44.363445+00:00'
---

# Cộng đồng mã nguồn mở và g0v

> **Tóm tắt 30 giây:** Năm 2012, vì chính phủ tốn nhiều tiền quay một đoạn quảng cáo không có nội dung thực, một nhóm kỹ sư quyết định «fork chính phủ» — thay đổi gov.tw thành g0v.tw, thiết kế lại mô hình mà chính phủ nên có. 8 năm sau, khi đại dịch COVID-19 bùng phát, nhóm lập trình viên «nghiệp dư» này chỉ dùng 72 giờ xây dựng bản đồ khẩu trang, cho phép toàn thể người Đài Loan tra cứu tức thì tồn kho khẩu trang tại 13.000 nhà thuốc. Đây không phải thành tích của chính phủ, mà là chiến thắng của công dân.

Đêm một ngày tháng 10 năm 2012, Cao Gia Lương ngồi trước máy tính xem quảng cáo «Kế hoạch thúc đẩy động năng kinh tế» của chính phủ, càng xem càng bực mình. Chính phủ đã chi hơn 40 triệu NT$ để sản xuất video tuyên truyền, nhưng nội dung rỗng tuếch đến mức khiến người ta hoài nghi: có lẽ vứt tiền xuống rãnh thoát nước còn có ích hơn?

Đêm đó, ông đã đưa ra một quyết định thay đổi Đài Loan: **nếu chính phủ làm không tốt, chúng ta tự làm.**

Ông thay chữ «o» trong tên miền gov.tw thành «0», biến thành g0v.tw[^1]. Trò chơi chữ đơn giản này tượng trưng cho một khái niệm hoàn toàn mới: **fork the government** (fork chính phủ). Giống như phần mềm mã nguồn mở, nếu phiên bản gốc có vấn đề, hãy fork một nhánh, tự viết lại một phiên bản tốt hơn.

## Fork chính phủ: Một cuộc thử nghiệm công dân trong kỷ nguyên số

g0v không nhằm lật đổ chính phủ, mà muốn «song song» chính phủ — dùng cách hợp tác mã nguồn mở, tái tưởng tượng dịch vụ công nên trông như thế nào.

**Tháng 12 năm 2012**, lần thứ không g0v hackathon được tổ chức tại Viện Nghiên cứu Trung ương (Academia Sinica), có hơn 40 người tham gia. Dự án đầu tiên chính là giải cứu «Sách ngân sách trung ương chính phủ» của chính phủ khỏi «địa ngục PDF», biến thành trang web trực quan hóa tương tác.

Ban đầu sách ngân sách của chính phủ là một tệp PDF hơn 500 trang, dày đặc con số và bảng biểu, người thường căn bản không hiểu được. Tình nguyện viên g0v tái cấu trúc những dữ liệu này, làm thành biểu đồ tương tác — **chỉ cần bấm một cái là thấy chính phủ dùng tiền thuế của bạn ở đâu.**

> **📝 Ghi chú người bảo tàng**
> Việc dự án đầu tiên của g0v chọn trực quan hóa ngân sách chính phủ không phải ngẫu nhiên. Ngân sách là cốt lõi của chính trị dân chủ — chính phủ dùng tiền của người làm gì, người dân có quyền biết. Nhưng sách ngân sách truyền thống căn bản就是 để bạn không hiểu. g0v dùng công nghệ phá giải cái «ý định không minh bạch» này.

Cuộc thử nghiệm nhỏ bé này đã chứng minh một điều: **Chính phủ không làm, không có nghĩa là làm không được. Chỉ là chưa ai đi làm thôi.**

## Phong trào 318: Trình diễn sức mạnh của Công nghệ công dân

Tối ngày 18 tháng 3 năm 2014, sinh viên chiếm lĩnh Viện Lập pháp. Sáng hôm sau, các tình nguyện viên g0v đã xuất hiện tại hiện trường, không phải để phản đối, mà để «thiết lập cơ sở hạ tầng».

**Không ai tổ chức, không ai chỉ huy.** Các tham gia cộng đồng g0v tự phát thực hiện những việc sau:

- **Phát trực tiếp tức thì**: Thiết lập hệ thống phát trực tiếp đa góc quay, cho phép toàn thế giới thấy được tình hình trong hội trường
- **Tổng hợp thông tin**: Thiết lập thư mục hackfoldr[^2], thu thập, tổng hợp, xác thực tức thì các thông tin trên mạng
- **Hợp tác đám đông**: Thiết lập hệ thống soạn thảo cộng tác, cho phép người dân không có mặt tại hiện trường cũng tham gia thu thập dữ liệu và tra cứu sự thật
- **Liên kết đối ngoại**: Cung cấp dịch thuật tức thì đa ngôn ngữ, giúp truyền thông quốc tế nắm được yêu cầu biểu tình ngay lập tức

**24 ngày chiếm lĩnh, phát trực tiếp chất lượng cao suốt quá trình, không bị gián đoạn.** Đây là một thành tựu kỹ thuật không thể tưởng tượng vào năm 2014. Lúc đó Facebook Live chưa ra mắt, YouTube Livestream cũng chưa phổ biến, nhưng tình nguyện viên g0v dùng công cụ mã nguồn mở tự xây dựng một hệ thống phát trực tiếp ổn định hơn cả truyền thông chuyên nghiệp.

Quan trọng hơn, họ đã chứng minh sức mạnh của «minh bạch». Nhờ có phát trực tiếp thời gian thực, mọi người đều thấy được chuyện gì xảy ra trong hội trường, khiến việc chính quyền muốn bóp méo sự thật trở nên không thể. Mô hình «dùng công nghệ giám sát chính phủ» này sau đó được quốc tế coi là một khuôn mẫu khả thi, Hàn Quốc, Thái Lan, Nhật Bản, Đức đều nảy mọc các cộng đồng công nghệ công dân có tính chất tương tự[^3].

## Bản đồ khẩu trang: Kỳ tích 72 giờ

Đầu tháng 2 năm 2020, dịch COVID-19 bùng phát tại Đài Loan. Chính phủ công bố chính sách thực danh khẩu trang, mỗi người mỗi tuần có thể mua 2 chiếc khẩu trang. Vấn đề là: phải đi đâu mua? Nhà thuốc nào còn hàng?

**Ngày 6 tháng 2**, Ủy viên chính sách số Đường Phong (bà chính là thành viên sáng lập g0v) tuyên bố: Chính phủ sẽ công khai dữ liệu tồn kho khẩu trang của 13.000 nhà thuốc hợp đồng trên toàn Đài Loan, cập nhật mỗi 30 phút[^4].

**Ngày 8 tháng 2**, bản đồ khẩu trang đầu tiên ra mắt.
**Ngày 9 tháng 2**, hơn 100 phiên bản khác nhau của bản đồ khẩu trang xuất hiện.

Đây không phải là dự án thầu ngoài cho công ty công nghệ của chính phủ, mà là kết quả của việc các lập trình viên toàn Đài Loan «tự nguyện làm thêm giờ». **Mọi người đều muốn đóng góp một phần sức lực cho phòng dịch, và việc lập trình viên có thể làm chính là viết mã.**

Các phiên bản phổ biến nhất bao gồm:

- **Bản đồ khẩu trang Đài Loan** do Howard Wu thực hiện: Giao diện bản đồ đơn giản, dễ hiểu
- **Còn khẩu trang không** do bạn kiang thực hiện: Tích hợp đánh giá nhà thuốc và thông tin kinh doanh
- **Mua khẩu trang ở đâu** do Finjon Kiang thực hiện: Hỗ trợ tính năng truy vấn bằng giọng nói

Trong vòng 72 giờ, Đài Loan đã có hệ thống truy vấn tồn kho khẩu trang hoàn thiện nhất toàn cầu[^5]. **Khi người dân các nước khác vẫn còn phải xếp hàng cướp mua, người Đài Loan đã có thể tra cứu trên điện thoại xem nhà thuốc gần nhất còn lại bao nhiêu khẩu trang.**

> **⚠️ Góc nhìn tranh议**
> Có người chỉ trích chính phủ «đẩy trách nhiệm cho tình nguyện viên», để dân gian miễn phí giúp chính phủ làm hệ thống. Nhưng phản hồi của cộng đồng g0v rất trực diện: Chúng tôi không bị chính phủ lợi dụng, chúng tôi chủ động chọn dùng chuyên môn của mình để hồi báo xã hội. Hơn nữa, bản đồ khẩu trang mã nguồn mở còn dễ dùng hơn, sáng tạo hơn, và phù hợp hơn với nhu cầu người dùng so với hệ thống do chính phủ tự làm.

## Ma thuật của hợp tác mã nguồn mở

Mô hình vận hành của g0v rất đơn giản: **không có sếp, không có nhân viên, không có ngân sách, không có văn phòng.** Chỉ có một nhóm người sẵn sàng dùng công nghệ giải quyết các vấn đề xã hội, và một văn hóa hợp tác mã nguồn mở.

### Văn hóa Hackathon

Mỗi hai tháng tổ chức một lần "đại tiệc" (hackathon quy mô lớn), người tham gia đề xuất, tổ đội, thực hiện tại chỗ. Quy trình như sau:

1. **Đề xuất trong ba phút**: Bất kỳ ai cũng có thể lên sân khấu đưa ra ý tưởng
2. **Tự do tổ đội**: Người quan tâm có thể tham gia dự án
3. **Thực hiện tại chỗ**: Bắt đầu làm ngay trong ngày
4. **Báo cáo thành quả**: Chia sẻ tiến độ hôm đó vào buổi chiều

**Không ai bị từ chối, không có ý tưởng nào bị bác bỏ.** Yêu cầu duy nhất là: dự án phải mã nguồn mở, để người khác có thể tiếp tục cải tiến.

### Công cụ hợp tác

- **Kênh Slack**: Thảo luận hàng ngày và chia sẻ thông tin
- **GitHub**: Quản lý mã nguồn và kiểm soát phiên bản[^6]
- **HackMD**: Tài liệu cộng tác và biên bản họp
- **Trello**: Quản lý dự án và theo dõi tiến độ

### Ba tinh thần cốt lõi

1. **Mã nguồn mở**: Mã nguồn, dữ liệu, tài liệu của tất cả dự án đều được công khai
2. **Phi tập trung**: Không có tầng lớp lãnh đạo, bất kỳ ai cũng có thể khởi xướng dự án
3. **Thực thi là trên hết**: "Nói dễ làm khó, hãy cho tôi xem mã nguồn"

> **💡 Bạn có biết không**
> Cộng đồng g0v có một truyền thống: mỗi hackathon đều chuẩn bị tem "con sóc nhỏ". Nếu bạn tham gia lần đầu, sẽ nhận được một tem con sóc nhỏ. Thiết kế này ngụ ý: ngay cả khi bạn là người mới, cũng được chào đón đóng góp một chút sức lực, giống như sóc thu thập hạt sồi, mỗi đóng góp nhỏ bé đều quan trọng.

## Các dự án quan trọng và tác động xã hội

8 năm qua, cộng đồng g0v đã tạo ra hàng trăm dự án, trong đó nhiều dự án tác động trực tiếp đến chính sách chính phủ và vận hành xã hội.

### Minh bạch hóa hoạt động Lập pháp viện

**Hồ sơ nghị sự Lập pháp viện** trước đây chỉ có bản văn bản, người dân phổ thông rất khó hiểu được các ủy viên lập pháp (lập ủy) tại Lập pháp viện thực sự làm gì. Các tình nguyện viên g0v đã xây dựng nền tảng "Minh bạch hóa nghị sự Lập pháp viện", cung cấp:

- **Trực tiếp thời gian thực**: Trực tiếp hiện trường các cuộc họp Lập pháp viện
- **Hồ sơ phát ngôn**: Thống kê và tìm kiếm nội dung phát ngôn của từng lập ủy
- **Hồ sơ biểu quyết**: Kết quả biểu quyết các dự luật quan trọng
- **Theo dõi đề xuất**: Toàn bộ quá trình từ khi đề xuất đến đọc lần ba của dự luật

Kết quả là: **Các lập ủy bắt đầu quan tâm đến "dữ liệu" của mình.** Tỷ lệ xuất席, số lần chất vấn, số lượng đề xuất, những con số mà trước đây không ai quan tâm, bây giờ đều có trang web giúp thống kê sẵn sàng. Các đại biểu dân ý phát hiện mọi cử động của mình đều bị giám sát, hành vi bắt đầu thay đổi.

### vTaiwan: Thử nghiệm dân chủ số

Năm 2014, g0v hợp tác với chính phủ tung ra nền tảng vTaiwan[^7], cho phép người dân tham gia quá trình hoạch định chính sách. Ví dụ nổi tiếng nhất là tranh chấp Uber:

**Năm 2015**, Uber hoạt động tại Đài Loan gây ra cuộc phản đối của ngành taxi. Cách xử lý truyền thống là chính phủ quyết định đơn phương, nhưng vTaiwan cung cấp con đường thứ ba: cho phép tất cả các bên liên quan đối thoại trên nền tảng trực tuyến, tìm ra giải pháp thắng - thắng.

Sau nhiều tháng thảo luận trực tuyến và các hội thảo trực tiếp, cuối cùng hình thành chính sách "Taxi đa dạng", vừa bảo vệ quyền lợi tài xế taxi truyền thống, cũng cho phép các mô hình dịch vụ đổi mới tồn tại.

**Đây là lần đầu tiên Đài Loan dùng "dân chủ số" để giải quyết tranh chấp chính sách.**

### Động lực thúc đẩy chính phủ mở

Các sáng kiến của g0v tác động trực tiếp đến chính sách chính phủ:

- **Năm 2012**: Dự án trực quan hóa ngân sách chính phủ thúc đẩy chính phủ công khai dữ liệu ngân sách
- **Năm 2013**: Dự án minh bạch hóa Lập pháp viện thúc đẩy trực tiếp nghị sự Lập pháp viện
- **Năm 2014**: Sau Học vận Hoa Dướng, chính phủ cam kết thúc đẩy sửa đổi "Luật công khai thông tin chính phủ"
- **Năm 2015**: Nền tảng vTaiwan trở thành kênh tham gia chính sách chính thức của chính phủ
- **Năm 2016**: Đường Phong (Audrey Tang) nhậm chức Chánh ủy số, mang kinh nghiệm g0v vào chính phủ

## Tác động quốc tế và các liên kết

Kinh nghiệm của g0v không chỉ ảnh hưởng đến Đài Loan, mà còn truyền cảm hứng cho phong trào công nghệ công dân trên toàn thế giới.

### Mạng lưới Code for All

g0v là thành viên sáng lập của mạng lưới quốc tế **Code for All**[^8], hợp tác chặt chẽ với Code for Japan của Nhật Bản, Code for Korea của Hàn Quốc, Code for America của Mỹ và các tổ chức khác.

**Năm 2019**, g0v summit được tổ chức tại Đài Bắc, thu hút các cộng đồng công nghệ công dân từ hơn 30 quốc gia tụ tập tại Đài Bắc để chia sẻ kinh nghiệm và công nghệ.

### Hợp tác quốc tế trong thời kỳ đại dịch

Trong thời kỳ đại dịch năm 2020, kinh nghiệm bản đồ khẩu trang của g0v được các quốc gia khác học tập:

- **Ý**: Bản đồ khẩu trang phiên bản Roma
- **Đức**: Bản đồ khẩu trang phiên bản Berlin
- **Mỹ**: Bản đồ PPE (trang thiết bị bảo hộ cá nhân)
- **Hàn Quốc**: 마스크맵 (bản đồ khẩu trang)

Các tình nguyện viên g0v cũng chủ động hỗ trợ các quốc gia khác xây dựng các hệ thống tương tự, chia sẻ kinh nghiệm công nghệ phòng dịch của Đài Loan với toàn thế giới.

## Thách thức và tương lai

g0v với tư cách là một "tổ chức không có sếp", đối mặt với những thách thức mà mọi cộng đồng mã nguồn mở đều gặp phải.

### Tính bền vững của dự án

Nhiều dự án của g0v là sản phẩm của "hứng thú nhất thời", thiếu hụt việc bảo trì lâu dài. Bản đồ khẩu trang rất hoạt động sôi nổi trong mùa dịch, nhưng sau khi dịch kết thúc thì dần không còn ai bảo trì. **Làm thế nào để các dự án tốt tiếp tục vận hành, là thách thức lớn nhất của g0v.**

### Sự kiệt sức của người tham gia

Việc tham gia tình nguyện với cường độ cao liên tục 8 năm khiến một số người đóng góp sớm bắt đầu kiệt sức. Làm thế nào thu hút lực lượng mới gia nhập, làm thế nào để sự tham gia bền vững hơn, là vấn đề cộng đồng cần đối mặt.

### Quan hệ với chính phủ

Quan hệ giữa g0v và chính phủ rất phức tạp, vi diệu: vừa hợp tác vừa giám sát. Khi chính phủ chủ động hưởng ứng mã nguồn mở và dân chủ số, vai trò "đối lập" của g0v trở nên mờ nhạt. Làm thế nào giữ vững độc lập và tinh thần phê phán trong hợp tác, là thách thức liên tục.

### Tin giả và chiến tranh thông tin

Trong thời đại chiến tranh thông tin, nguyên tắc cởi mở và minh bạch cũng có thể bị lạm dụng. Làm thế nào vừa giữ sự cởi mở, vừa tránh trở thành kênh truyền播 tin giả, là thách thức mới.

## Một cuộc thử nghiệm vẫn đang tiếp diễn

Năm 2012, khi Cao Gia Lương thay đổi gov.tw thành g0v.tw, ông chỉ muốn bày tỏ sự không hài lòng đối với chính phủ. 12 năm sau, g0v đã trở thành một phần của nền dân chủ Đài Loan, đồng thời là một lực lượng quan trọng của phong trào công nghệ công dân trên toàn thế giới.

Cuộc thử nghiệm này đã chứng minh được vài điều:

1. **Công nghệ có thể là công cụ tham gia của công dân**, không chỉ là thủ段獲利 thương mại
2. **Mở và minh bạch quan trọng hơn hiệu suất chính phủ**, vì sự minh bạch mang lại hiệu suất
3. **Cơn giận nhỏ bé có thể thay đổi thế giới**, miễn là bạn sẵn sàng hành động
4. **Fork chính phủ không phải là lật đổ chính phủ**, mà là chứng minh tồn tại khả năng tốt hơn

Trong kỷ nguyên dân chủ lùi lại này, g0v nhắc nhở chúng ta: **Công dân không phải là người sử dụng của chính phủ, mà là người cùng sáng tạo.** Những việc chính phủ làm kém, chúng ta có thể tự làm. Những việc chính phủ làm tốt, chúng ta có thể giúp làm tốt hơn.

Đây không phải là một cuộc cách mạng đã kết thúc, mà là một cuộc thử nghiệm liên tục. Mỗi cuộc hackathon, mỗi dự án mới, mỗi dòng mã, đều đang trả lời cùng một câu hỏi: Trong kỷ nguyên số, dân chủ có thể trông như thế nào?

Câu trả lời vẫn đang được viết, và mỗi người sẵn sàng đóng góp, đều là tác giả của câu trả lời đó.

## Tài liệu tham khảo

## Chủ đề liên quan

- [Quỹ Văn hóa Mở](/vi/technology/open-culture-foundation): Tổ chức phi lợi nhuận đứng sau g0v — đơn vị báo cáo tài chính, mở hóa đơn, gánh vác hành chính cho cộng đồng, và câu chuyện từ hậu trường trở thành "chó canh" quyền con người số
- [Ngành bán dẫn](/vi/technology/taiwan-semiconductor-industry): Nền tảng thực lực công nghệ của Đài Loan
- [Mini Taiwan Pulse](/vi/technology/mini-taiwan-pulse-civic-tech): Triển khai mã nguồn mở cá nhân năm 2026 về công nghệ công dân — dùng dữ liệu mở TDX + Three.js vẽ Đài Loan thành quỹ đạo ánh sáng 3D

[^1]: [Trang web chính thức của g0v Chính phủ Zero Hour](https://g0v.tw/) — Cổng thông tin cộng đồng g0v, giới thiệu các hoạt động hackathon và mô hình vận hành của các dự án

[^2]: [Thư mục cộng tác hackfoldr của g0v](https://beta.hackfoldr.org/) — Nền tảng cộng tác tài liệu và dữ liệu viết chung được cộng đồng g0v sử dụng lâu dài

[^3]: [Hướng dẫn giành lại dân chủ: Sách tay dự án và cộng đồng Công nghệ công dân (Quỹ Friedrich Naumann, 2025-06-09)](https://www.freiheit.org/fr/node/49973) — Quỹ Friedrich Naumann của Đức giới thiệu sách tay Công nghệ công dân do cộng đồng g0v tham gia biên soạn, khẳng định g0v là một trong những lực lượng quan trọng nhất của dân chủ số tại Taiwan và có thể trở thành mô hình cho thế giới; sách tay ghi chép các trường hợp của Hàn Quốc, Thái Lan, Nhật Bản, Đức

[^4]: [Làm thế nào đổi mới số có thể chống lại đại dịch và củng cố dân chủ (Đường Phong, TED2020)](https://www.ted.com/talks/audrey_tang_how_digital_innovation_can_fight_pandemics_and_strengthen_democracy) — Đường Phong tại TED nói về cách Taiwan đầu năm 2020 nhờ công cụ số tránh được phong tỏa, trong đó có bản đồ khẩu trang

[^5]: [Phỏng vấn nhà phát triển bản đồ khẩu trang](https://www.ithome.com.tw/news/136038) — iThome phỏng vấn nhà phát triển bản đồ khẩu trang, ghi lại hành trình các nhà phát triển tham gia dự án phòng dịch

[^6]: [Tổ chức GitHub của g0v](https://github.com/g0v) — Kho mã nguồn và bản ghi cộng tác của các dự án mã nguồn mở của cộng đồng g0v

[^7]: [Nền tảng dân chủ số vTaiwan](https://vtaiwan.tw/) — Nền tảng thảo luận chính sách trực tuyến và tổng hợp sự đồng thuận của g0v hợp tác với chính phủ

[^8]: [Mạng lưới quốc tế Code for All](https://codeforall.org/) — Trang web chính thức của mạng lưới quốc tế Code for All kết nối các tổ chức công nghệ công dân toàn cầu
