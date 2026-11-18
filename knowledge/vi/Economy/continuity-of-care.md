---
title: 'Tính liên tục chăm sóc: Chỉ số 0,405 và đỉnh cao bất ngờ trong ba năm đại dịch'
description: 'Năm 2024, chỉ số liên tục chăm sóc ngoại trú trung bình trên mỗi người (COCI) là 0,405, gần với mức 0,400 của năm 2019; trong giai đoạn đại dịch từ năm 2020 đến 2022, chỉ số từng tăng lên 0,436, sau đó giảm lại khi các biện pháp phòng dịch được nới lỏng. Chỉ số này từ 0 đến 1 đo lường việc bệnh nhân có khám chữa bệnh cố định tại một số ít cơ sở y tế hay không, được tính theo phương pháp của Bice và Boxerman, loại trừ những người khám chữa bệnh 3 lần hoặc ít hơn và 100 lần trở lên trong năm. Bài viết này sử dụng các chỉ tiêu giám sát của Bảo hiểm Y tế để giải thích cách tính toán, lý do đại dịch làm tăng chỉ số này, mối liên hệ giữa tính liên tục với cấp cứu, nhập viện, và cách chính sách sử dụng chế độ bác sĩ gia đình để nâng cao chỉ số này.'
date: 2026-11-14
category: 'Economy'
tags:
  [
    'Tính liên tục chăm sóc',
    'COCI',
    'Bảo hiểm y tế',
    'Y tế phân cấp',
    'Bác sĩ gia đình',
    'Chất lượng y tế',
  ]
subcategory: '金融與科技'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-11-14
lastHumanReview: false
readingTime: 9
curation: 'incubating'
rationale:
  why_this_hook: '從「疫情期間連續性反而變高」這個反直覺結果切入，因為它說明這個指標量的不只是醫療品質，也量了就醫行為被外力壓縮時的樣子。'
  whats_excluded: '不評論個別院所的病人流動、不預測家庭醫師計畫的成效、不比較各縣市差異（報告僅提供全國平均）。'
  where_it_hedges: '數字取健保會《113 年全民健康保險監理指標監測結果報告》指標 2.3，為全國平均每人門診照護連續性；疫情期間上升的原因是報告與健保署說明的推測，文中標明為「推測」；連續性與結果的關聯為報告引用的國內外研究，非本地因果實驗。'
  whos_pushing_back: '認為低連續性是病人自由選擇、不該被政策矯正的讀者；以及主張連續性指數無法反映照護品質的臨床工作者。'
translatedFrom: 'Economy/照護連續性.md'
sourceCommitSha: '63e932f2c'
sourceContentHash: 'sha256:554905a69c05f127'
sourceBodyHash: 'sha256:a32f0d8a38888ee6'
translatedAt: '2026-11-18T01:24:10.400795+00:00'
---

Năm 113, chỉ số liên tục chăm sóc khám ngoại trú y học tây (COCI) trung bình toàn quốc trên mỗi người đạt 0,405, dữ liệu không bao gồm nha khoa và y học cổ truyền.[^1]

Con số này gần bằng mức 0,400 của năm 108, tức mức độ trước đại dịch.[^1]

## Không điểm bốn không năm

Chỉ số liên tục chăm sóc dao động từ 0 đến 1: 1 nghĩa là bệnh nhân khám bệnh hoàn toàn tại một cơ sở y tế, càng gần 0 nghĩa là càng phân tán.[^1]

Con số 0,405 cho thấy, trung bình thì việc khám ngoại trú của bệnh nhân phân tán ở nhiều cơ sở y tế.

## Đường cong năm năm

Xếp năm năm ra, hình dáng rất rõ ràng.

Năm 109: 0,422; năm 110: 0,436; năm 111: 0,424; năm 112: 0,403; năm 113: 0,405. [^1]

```tw-line
Độ liên tục chăm sóc ngoại trú trung bình mỗi người (COCI)
Năm 109 | 0,422 | Giai đoạn đầu dịch bệnh
Năm 110 | 0,436 | Dịch bệnh bước vào lây lan cộng đồng, đỉnh cao năm năm
Năm 111 | 0,424 | —
Năm 112 | 0,403 | Giảm cấp phòng dịch
Năm 113 | 0,405 | Tiếp cận mức năm 108 là 0,400
Nguồn: Hội Bảo hiểm Y tế《Báo cáo kết quả giám sát chỉ tiêu Bảo hiểm Y tế Toàn dân năm 113》chỉ tiêu 2.3
```

Đỉnh cao xuất hiện ở năm 110, tức năm dịch bệnh bước vào giai đoạn lây lan cộng đồng vào giữa tháng 5; điểm thấp nhất là năm 112, năm giảm cấp phòng dịch. [^1]

## Cách tính toán

Chỉ số này áp dụng định nghĩa của Bice và Boxerman phát triển năm 1977: trước tiên tính phân bố số lần khám chữa bệnh của mỗi bệnh nhân tại các cơ sở y tế, sau đó quy đổi thành giá trị từ 0 đến 1, cuối cùng lấy trung bình toàn quốc. [^1]

Trước khi tính toán sẽ loại bỏ hai loại giá trị cực đoan: số lần khám sau khi quy hoạch hộ gia đình 3 lần trở xuống, và 100 lần trở lên, để tránh giá trị cực đoan làm lệch chỉ số. [^1]

Điểm trọng tâm của thiết kế này là "bệnh nhân" chứ không phải "cơ sở": nó hỏi không phải một bệnh viện khám bao nhiêu người, mà là mỗi bệnh nhân phân tán khám chữa bệnh vào bao nhiêu cơ sở.

## Tại sao dịch bệnh làm tăng chỉ số này

Năm 110 tăng lên 0,436, Cục Bảo hiểm Y tế giải thích là do giai đoạn dịch bệnh hành vi khám chữa bệnh của người dân thay đổi theo chính sách phòng dịch, sau khi dịch bệnh bước vào lây lan cộng đồng giữa tháng 5 năm 110, Trung tâm chỉ huy yêu cầu bệnh viện giảm tải. [^1]

Nghiên cứu phân tích của Hội Bảo hiểm Y tế suy đoán, có thể do người dân để giảm nguy cơ lây nhiễm, tự chủ động hoãn khám hoặc chọn khám cố định tại một cơ sở đơn lẻ. Đây là giải thích suy đoán, không phải kết quả thực nghiệm. [^1]

Nói cách khác, đỉnh cao năm 110 đó, báo cáo suy đoán là do người dân tự chọn khám cố định tại một cơ sở, không nhất thiết đại diện cho chăm sóc y tế được cải thiện.

## Quay trở lại sau khi hạ cấp

Sau khi giảm cấp phòng dịch ngày 1 tháng 5 năm 112, thống kê cho thấy dữ liệu cả năm 113 đã tiếp cận mức trước dịch bệnh (năm 108). [^1]

Đánh giá của báo cáo về xu hướng năm năm này là "không có biến hóa rõ rệt", chỉ có giai đoạn dịch bệnh hơi cao, sau khi bình thường hóa lại quay về gần mức trước dịch bệnh.

## Tính liên tục và kết quả

Tại sao phải quan tâm chỉ số này? Báo cáo trích dẫn nghiên cứu trong và ngoài nước chỉ ra: chăm sóc chất lượng và có tính liên tục sẽ mang lại kết quả chăm sóc tốt hơn, độ hài lòng của bệnh nhân cao hơn và chi phí y tế thấp hơn; nghiên cứu trong nước thêm cho thấy, nhóm có tính liên tục cao số lần cấp cứu và nhập viện thấp rõ rệt, xác suất "nhập viện có thể tránh được" cũng thấp hơn. [^1]

Đây là nghiên cứu tương quan, không phải thực nghiệm nhân quả. Nhưng chúng cung cấp một định hướng: khi bệnh nhân được bác sĩ cố định hoặc cùng một nhóm chăm sóc, tiền sử bệnh và dùng thuốc dễ nắm bắt hơn, việc kiểm tra trùng lặp và tác dụng tương tác thuốc cũng dễ phát hiện hơn.

## Cách áp dụng chính sách

Cơ quan Bảo hiểm Y tế (BHYT) đề xuất chiến lược cải thiện là đưa tính liên tục vào việc thúc đẩy y tế phân cấp và chế độ bác sĩ gia đình: tiếp tục thúc đẩy y tế phân cấp, nâng cao năng lực dịch vụ cơ sở, mở rộng kế hoạch chăm sóc toàn diện của bác sĩ gia đình, thực hiện chuyển viện hai chiều và chăm sóc chung bệnh mãn tính giữa nhóm y tế cộng đồng và bệnh viện hợp tác, đồng thời tuyên truyền người dân tìm bác sĩ gia đình trước, khi cần thiết mới do bác sĩ gia đình chuyển viện. Hội đồng Bảo hiểm Y tế phân tích thì khuyến nghị tiếp tục giám sát chỉ tiêu này, và tìm hiểu sâu hơn về kiểu bệnh và mô hình khám chữa bệnh của những người có tính liên tục kém.[^1]

Nói cách khác, ý nghĩa chính sách của con số 0,405 không phải là yêu cầu bệnh nhân không được đổi bệnh viện, mà là làm cho việc «cố định tìm một người quen thuộc với tiền sử bệnh của bạn» trở thành một lựa chọn dễ dàng.

Việc tích hợp thể chế đang tiến triển theo hướng này. Cùng một báo cáo tại các chỉ tiêu tiểu đường (2.2, 3.2) ghi rõ Cơ quan BHYT quy hoạch từ năm 115 (2026), tích hợp tiểu đường, bệnh thận mạn tính giai đoạn đầu, tiểu đường kèm bệnh thận mạn tính của phương án luận chất cơ sở y khoa Tây y với kế hoạch bác sĩ gia đình, các trường hợp trùng lặp thu nhận được thống nhất chăm sóc bởi kế hoạch gia y, mục đích là để cùng một bệnh nhân không phải bị hai hệ thống theo dõi riêng biệt thu nhận.[^1]

Khi đọc con số này còn có hai lưu ý. Thứ nhất, đó là trung bình toàn quốc, không phản ánh sự khác biệt giữa các bệnh nhân: có người cố định khám ở một bác sĩ, cũng có người một năm chạy năm cơ sở y tế, trung bình lại đều là 0,4. Thứ hai, nó chỉ tính các ca khám ngoại trú y khoa Tây y, nên không thể trực tiếp suy luận «chăm sóc tổng thể có liên tục hay không».[^1]

Xem từ đường cong năm năm, điểm khó của việc này cũng rất rõ ràng: tính liên tục có thể bị lực lượng bên ngoài đẩy cao (dịch bệnh), cũng tự động giảm xuống sau khi bình thường hóa. Muốn cho nó ổn định tăng lên, không phải nhờ một lần tuyên truyền, mà là để cơ sở thực sự đón nhận được bệnh nhân.

**Mở rộng đọc**:

- [Tuổi thọ trung bình Đài Loan](/society/台灣平均餘命) — Cao tuổi và đa bệnh mãn tính, làm cho tính liên tục quan trọng hơn
- [Ổn tắc cấp cứu](/vi/lifestyle/emergency-room-crowding) — Khi tính liên tục thiếu hụt, cấp cứu là người cuối cùng tiếp nhận
- [Y tế Đài Loan và Bảo hiểm Y tế Toàn dân](/vi/lifestyle/taiwan-healthcare-and-national-health-insurance) — Tổng mức và chế độ thanh toán ở thượng du

## Tài liệu tham khảo

[^1]: [Báo cáo kết quả giám sát chỉ tiêu Bảo hiểm Y tế Toàn dân năm 113 (Hội Bảo hiểm Y tế Toàn dân Bộ Y tế Phúc lợi, tháng 11 năm 114)](https://www.mohw.gov.tw/dl-98589-4782a345-f250-4d14-8b78-c550439eb29e.html) — Chỉ tiêu 2.3 ghi rõ tính liên tục chăm sóc ngoại trú trung bình mỗi người năm 109–113 (0,422; 0,436; 0,424; 0,403; 0,405) so với 0,400 năm 108, định nghĩa của Bice và Boxerman năm 1977, phương pháp tính toán loại trừ giá trị cực đoan dưới 3 lần và trên 100 lần, giải thích về việc tăng lên trong thời kỳ dịch bệnh và giảm xuống sau khi hạ cấp ngày 1 tháng 5 năm 112, cũng như trích dẫn nghiên cứu về mối liên quan giữa tính liên tục với cấp cứu, nhập viện, chi phí y tế, và chiến lược cải thiện của Cục Bảo hiểm Y tế cùng các đề xuất phân tích của Hội Bảo hiểm Y tế. Kế hoạch tích hợp Chương trình Bác sĩ gia đình từ năm 115 trở đi được ghi tại chỉ tiêu 2.2/3.2.
