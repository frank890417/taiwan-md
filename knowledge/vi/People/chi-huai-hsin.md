---
title: 'Chi Huai-hsin: Người Đài Loan dạy AI "suy nghĩ từng bước một", đưa tâm lý học nhận thức vào máy'
description: 'Chi Huai-hsin là phó tổng giám đốc nghiên cứu tại Google DeepMind, đồng tác giả bài báo Chain of Thought (Chuỗi suy luận) giúp AI "suy luận từng bước một". Người lớn lên ở Đạm Thủy này đã biến khái niệm từ tâm lý học nhận thức—lý thuyết schema của Piaget—thành phương pháp dạy máy lập luận. Bước đột phá thay đổi AI này chỉ tốn khoảng năm nghìn đô la, vì đó không bao giờ là vấn đề có thể giải quyết bằng sức mạnh tính toán.'
date: 2026-06-27
category: 'People'
tags:
  [
    'nhân vật',
    'Chi Huai-hsin',
    'Ed Chi',
    'AI',
    'Google DeepMind',
    'Chain of Thought',
    'tâm lý học nhận thức',
    'Đạm Thủy',
  ]
subcategory: '科技與企業'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-27
lastHumanReview: false
researchReport: 'reports/research/2026-06/紀懷新.md'
image: '/article-images/people/ed-chi-deepmind-talk-2026.webp'
sporeLinks:
  - id: 152
    platform: 'threads'
    date: '2026-06-27'
    url: 'https://www.threads.com/@taiwandotmd/post/DaFb5aCE6FV'
  - id: 153
    platform: 'x'
    date: '2026-06-27'
    url: 'https://x.com/taiwandotmd/status/2070809073143144717'
relatedDiary: ['2026-06-27-180207-manual']
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'People/紀懷新.md'
sourceCommitSha: 'b1a5fea0'
sourceContentHash: 'sha256:11f4b1d06ffc2776'
sourceBodyHash: 'sha256:a42a37a855f0ab8b'
translatedAt: '2026-10-15T01:13:07.805005+00:00'
---

Khi cả thế giới dùng hàng tỷ đô la tiền sức mạnh tính toán để đuổi theo AI thì có một bài báo đã thay đổi cách máy lập luận, chỉ tốn khoảng năm nghìn đô la.

Bài báo đó tên là "Chuỗi suy luận" (Chain of Thought). Nó làm một điều nghe có vẻ đơn giản tới không giống một bước đột phá: trong những ví dụ cho AI xem, hãy viết thêm vài dòng "quá trình giải quyết", dẫn dắt nó suy nghĩ từng bước trước rồi mới đưa ra câu trả lời, giống như để một học sinh viết draft trước thay vì viết luôn kết luận. Trong chín đồng tác giả, có một người sinh tại Đạm Thủy—người Đài Loan, tên là Chi Huai-hsin.

Sau này anh giải thích năm nghìn đô la đó như thế nào: "Vấn đề đó không phải là vấn đề có thể giải quyết bằng sức mạnh tính toán, mà nó là một kiểu tư duy khác."[^1]

> **Tóm tắt 30 giây:** Chi Huai-hsin (Ed H. Chi) là phó tổng giám đốc nghiên cứu tại Google DeepMind, cũng là đồng tác giả bài báo giúp AI học cách "suy luận từng bước một". Mỗi lần bạn bảo ChatGPT hoặc Gemini "hãy suy nghĩ từng bước", nó trả lời tốt hơn—cái ý tưởng giúp máy tính suy luận từng bước ấy có một sợi chỉ kéo từ Đài Loan. Anh khoảng 15 tuổi đã theo mẹ học tiến sĩ sang Mỹ, khi giúp mẹ viết luận văn tâm lý học giáo dục, đã học được một khái niệm tâm lý về "con người học như thế nào". Ba mươi năm sau, anh đem khái niệm này vào máy. Đài Loan biết làm chip—người tài năng, nhưng hầu như không ai biết đến người định hình "AI suy nghĩ như thế nào".

## Luận văn tiến sĩ của mẹ

Câu chuyện không bắt đầu từ Google mà từ một cái bàn làm việc.

Chi Huai-hsin lớn lên ở Đạm Thủy. "Tôi là người sinh ra và lớn lên tại Đài Loan, sinh ra ở Đạm Thủy, rồi khi tôi khoảng 15 tuổi thì theo cha mẹ sang Mỹ học, vì mẹ tôi lúc đó đi học tiến sĩ."[^2] Câu này chứa một bức tranh không quá thông thường: hầu hết những đứa trẻ Đài Loan ra nước ngoài khi đó là "du học sinh nhỏ" một mình, còn anh là cả gia đình di chuyển về phía Tây vì mẹ muốn học tiến sĩ. Một gia đình Đài Loan vì công việc học tập của mẹ mà di cư sang Mỹ, vào thời đó không phải là chuyện hiếm gặp nhưng cũng không phổ biến.

![Hoàng hôn tại bến gỗ dầu xe Đạm Thủy, nơi Chi Huai-hsin sinh ra và lớn lên](/article-images/people/tamsui-sunset-boardwalk-2024.webp)

_Đạm Thủy, nơi Chi Huai-hsin sinh ra và lớn lên. Ba mươi năm sau, những gì anh mang theo từ đây sẽ thành phương pháp dạy máy suy nghĩ._

Mẹ anh học tiến sĩ tâm lý học giáo dục. Suốt những năm trung học và đại học, anh giúp mẹ viết luận văn. Một cậu bé còn đang học, giúp mẹ sắp xếp một luận văn học thuật khám phá "con người học như thế nào", chính lúc đó anh lần đầu tiên gặp lý thuyết schema của nhà tâm lý học Thụy Sĩ Piaget.

Lý thuyết schema nói rằng: trong bộ não con người có những bộ cấu trúc kiến thức được tổ chức, gọi là "schema", chúng ta dùng chúng để hiểu thế giới. Khi học thứ gì đó mới, hoặc là chúng ta cố nhét thông tin mới vào schema cũ (gọi là đồng hoá), hoặc là schema cũ không chứa được, bị buộc phải sửa hay tạo cái mới (gọi là thích ứng). Nghe có vẻ trừu tượng, nhưng nó trả lời một câu hỏi rất cơ bản: một người, làm cách nào từ "không biết" mà chuyển sang "biết"?

Khái niệm trên cái bàn năm xưa, ba mươi năm sau sẽ thành phương pháp dạy máy lập luận. Nhưng trước hết, anh phải đi một quãng đường dài, và đó là con đường ít người đi.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/51woDEK5NME" title="VK Thời gian Đọc Công nghệ EP122 ft. Chi Huai-hsin" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Chi Huai-hsin trong VK Thời gian Đọc Công nghệ EP122 tự tường thuật nguồn gốc Chuỗi suy luận, từ việc giúp mẹ viết luận văn tiến sĩ tâm lý học giáo dục, học được lý thuyết schema của Piaget, cho đến cách biến nó thành phương pháp dạy AI lập luận. Cuộc phỏng vấn này là nguồn gốc linh hồn của bài viết._

## Từ Đạm Thủy tới Minnesota, theo một lá đơn nhập học tiến sĩ

Tới Minnesota, anh hoàn thành bằng cấp năm chiếu dưới cùng một trường: Đại học Minnesota, kéo dài năm năm rưỡi, ba bằng cấp.[^3] Từ khi nhập học anh đã nhận được vinh dự cao nhất (Summa Cum Laude), luận văn tiến sĩ làm về visualize thông tin, đề tài là "A Framework for Information Visualization Spreadsheets", người hướng dẫn John T. Riedl là người tiên phong của hệ thống gợi ý.

![Khuôn viên Đại học Minnesota, nơi Chi Huai-hsin hoàn thành ba bằng cấp: cạc sĩ, thạc sĩ, tiến sĩ](/article-images/people/umn-the-knoll-minneapolis.webp)

_Mười lăm tuổi theo mẹ tới Minnesota, anh sau đó năm năm rưỡi hoàn thành ba bằng cấp tại Đại học Minnesota. Người hướng dẫn John T. Riedl là người tiên phong trong nghiên cứu hệ thống gợi ý: sợi chỉ này sau này sẽ nối lại với những gì anh làm tại Google._

Nhưng có gì đáng nhớ hơn những bằng cấp là cách anh định vị chính mình.

Anh từng nói một câu rất chân thật trong cuộc phỏng vấn: "Nếu nói bằng tiếng Anh thì tôi là một 'chủ nghĩa đa năng' (generalist)……kiểu 'nắm một chút tất cả nhưng không giỏi gì cả'. Nhưng khi tôi nhận ra toán học của tôi không giỏi hơn những người khác, tôi cảm thấy có lẽ tôi có thể làm một số nghiên cứu giống như cầu nối (bridging)—một cầu nối giữa lĩnh vực này và lĩnh vực khác."[^4]

Đây là lựa chọn có giá đắt trong hội thị trấn học thuật. Anh tự thừa nhận, khi bạn làm nghiên cứu cầu nối, "bạn không phải là người thật sự ở lĩnh vực A, và bạn cũng không phải là nhà nghiên cứu thực sự ở lĩnh vực B". Một người chỉ hiểu một bên, thế giới sẽ cho anh ta một vị trí rõ ràng; một người đứng giữa, thường cả hai bên đều không tiếp nhận. Nhưng anh đã cá cược vào khoảng không này. Sự kiện sau này chứng minh rằng, những bước chân quan trọng nhất của AI đều xảy ra ở những vùng có như vậy.

> **✦** "Có lẽ tôi có thể làm một số nghiên cứu giống như cầu nối, một cầu nối giữa lĩnh vực này và lĩnh vực khác."

## Tại Palo Alto, anh học cách đưa tâm lý học thành chương trình máy tính

Năm 1997, anh vào thực tập tại một nơi huyền thoại: Trung tâm Nghiên cứu Xerox Palo Alto (Xerox PARC).

Cái tên này có thể lạ với bạn đọc Đài Loan, nhưng bạn mỗi ngày đều dùng những thứ nó phát minh. Chuột, giao diện người dùng đồ hoạ, máy in laser, mạng Ethernet—nhiều công nghệ đã đặt nền tảng cho thời đại máy tính cá nhân có nguồn gốc từ trung tâm nghiên cứu của công ty máy photocopy này, đặt ở cạnh Đại học Stanford. Ngày xưa Jobs vào xem bộ giao diện đồ hoạ kia, học cách làm rồi áp dụng vào Macintosh sau này. Lúc Chi Huai-hsin tới, đó là khoảng thời kỳ vàng thứ hai của nó.

![Máy tính Alto của Xerox PARC (1973), người sáng lập máy tính cá nhân và giao diện đồ hoạ](/article-images/people/xerox-alto-1973.webp)

_Alto mà Xerox PARC phát triển năm 1973, là người tiên phong của máy tính cá nhân và giao diện đồ hoạ. Chi Huai-hsin sau đó tại đây, đã học cách đưa tâm lý học nhận thức thành một chương trình máy tính có thể chạy được._

Chìa khóa không phải ở những gì anh làm mà ở những ai mà anh gặp được. "Cấp trên của tôi lúc đó là Stuart Card, anh ấy là học trò của Allen Newell."[^5] Dây chuyền sư phạm này hướng lên, sẽ kết nối với một người từng đoạt giải Nobel kinh tế: Herbert Simon.

Simon đã nêu ra khái niệm "lý trí có giới hạn" (bounded rationality): khi con người đưa ra quyết định, chịu tác động của nhận thức, thông tin, thời gian, nên cơ bản không thể "hoàn toàn lý trí". Anh ta cũng đặt tên cho một loại quyết định gọi là "đủ tốt" (satisficing): con người không tìm kiếm lời giải tốt nhất, chỉ tìm một lời giải chấp nhận được. Simon và Newell cùng nhau so sánh bộ não con người như một cái máy xử lý thông tin, cho rằng "giải quyết vấn đề" là tìm kiếm từng bước đáp án trong một không gian vấn đề. Card đã mang cách tiếp cận này vào Palo Alto, Chi Huai-hsin lại nhận lấy từ Card.

> 📝 **Ghi chú của cộng tác viên**
> Câu chuyện AI phổ thông được kể như thế này: máy trở nên thông minh hơn vì chip chạy nhanh hơn, dữ liệu nhiều hơn, mô hình lớn hơn. Tường thuật này mượt mà, nhưng nó bỏ mất một sợi chỉ khác. Simon từ những năm 1950s đã hỏi "bộ não con người quyết định như thế nào dưới giới hạn"; Card năm 1974 đưa tâm lý học vào nghiên cứu máy tính tại Palo Alto; Chi Huai-hsin thập niên 1990 tiếp đón, đưa lý thuyết foraging thành mô hình con người tìm thông tin trên mạng. Nửa thế kỷ, có một nhóm người luôn đặt câu hỏi cùng nhau: con người suy nghĩ như thế nào vậy? Khi dòng chính bận việc làm máy tính toán nhanh hơn, họ bận làm máy suy nghĩ giống con người hơn. Chuỗi suy luận chính là quả trái từ sợi chỉ ấy.

## Không phải thêm dữ liệu, mà là giống con người hơn

Năm 2011, ông rời Palo Alto đến Google. Lý do rất thực tế: 「Chỉ làm nghiên cứu không được, còn phải làm những thứ ứng dụng.」 Mô hình của Xerox PARC loại 「nghiên cứu cơ bản rất sâu nhưng không chuyển thành sản phẩm được」, ông đã thấy rõ ràng.

Tại Google, ông trước làm phân tích dữ liệu mạng, năm 2015 đến 2017 dẫn dắt nhóm xây dựng lại hệ thống đề xuất mạng nơ-ron của YouTube, năm 2017 trở thành nhà khoa học trưởng của Google Brain, dẫn dắt nhóm 70 người, năm 2021 thăng làm nhà khoa học傑出 (Distinguished Scientist), dẫn dắt đến 120 người, sau này trở thành Phó tổng giám đốc nghiên cứu của DeepMind[^6]. Phía sau chuỗi danh hiệu đó, thực ra là cùng một gen phương pháp luận đang mở rộng: Tìm kiếm thông tin (Information foraging) là mô hình của 「con người tìm thứ gì」, hệ thống đề xuất là mô hình của 「con người muốn xem gì」, đến chuỗi suy luận (Chain-of-thought), biến thành mô hình của 「con người suy luận như thế nào」. Từ nhận thức con người, một đường đẩy về phía máy móc.

Điểm ngoặt của chuỗi suy luận, xảy ra từ sự không hài lòng của ông đối với học máy (machine learning) chủ lưu lúc bấy giờ. 「Tại sao phải dùng nhiều dữ liệu đến vậy, máy mới thực sự học được?」 Ông bắt đầu nghĩ, 「Có thể dùng phương pháp tâm lý học nhận thức để dạy máy học không?」[^7]

Vậy ông quay lại khái niệm đó. 「Ý tưởng này thực ra xuất phát từ…… một ý tưởng của thập niên 1960, 1970, gọi là lý thuyết đồ thức (schema). Ý nghĩa cơ bản là nói, nếu một người có thể dùng một mẫu (template) để giải một vấn đề, thì cũng có lẽ chúng ta có thể dùng phương pháp này để dạy máy học. Vì vậy chuỗi suy luận thực ra là bắt đầu từ ý tưởng này.」 Người phỏng vấn truy vấn có phải là đồ thức của Piaget, ông trả lời: 「Đúng, chính là ý tưởng đồ thức của Piaget. Cái đó thực ra là tôi khi học trung học, đại học, vì giúp mẹ viết luận án tiến sĩ về tâm lý học giáo dục mà học đến, nên sau này những thứ này từ từ nối lại với nhau.」[^8]

Hạt giống trên bàn viết, đã nảy mầm.

![Hình 1 của bài báo Chuỗi suy luận: bên trái gợi ý (prompt) chuẩn trả lời sai, bên phải gợi ý chuỗi suy luận trước viết ra các bước suy luận (đánh dấu nền xanh) rồi đưa ra đáp án đúng](/article-images/people/chain-of-thought-figure1.webp)

_Bài báo Chuỗi suy luận nổi tiếng nhất: bên trái dùng cách hỏi thông thường, mô hình tính sai; bên phải chỉ cần trong ví dụ thêm viết một đoạn quá trình suy luận (đoạn nền xanh), mô hình trả lời đúng. Khác biệt không nằm ở sức mạnh tính toán, mà ở có hay không 「viết ra suy nghĩ từng bước một」. Hình từ Wei et al., 2022._

Mà nó gần như không tốn kém gì. 「Bạn biết chúng tôi dùng tổng cộng bao nhiêu sức mạnh tính toán không? Chừng 5.000 USD sức mạnh tính toán thôi. Vì vấn đề đó không phải là dùng sức mạnh tính toán có thể giải quyết được, mà là một chế độ tư duy khác. Khi chúng tôi làm nghiên cứu đó lúc đầu, cơ bản là không có kinh phí, là chúng tôi tự nghĩ ra từ hư không.」[^1]

```tw-versus
Lộ trình AI chủ lưu | Con đường chuỗi suy luận
Mô hình lớn hơn, tham số nhiều hơn | Không cần huấn luyện lại mô hình
Cho ăn thêm dữ liệu | Thêm vài dòng quá trình giải trong ví dụ
Hàng trăm triệu USD quân 備算力 | Khoảng năm nghìn USD
Theo đuổi quy mô bằng bạo lực | Mượn tâm lý học nhận thức về cách con người học
Nguồn: Phỏng vấn VK EP122 của Chi Huai-hsin (bài báo chuỗi suy luận ~5.000 USD sức mạnh tính toán, dạy máy bằng phương pháp tâm lý học nhận thức) và báo cáo kinh nghiệm nghiên cứu của ông[^1][^6][^7]
```

Đây chính là điều bài viết này muốn nói nhất: Chìa khóa để AI học会 suy luận, không phải là thêm sức mạnh tính toán, mà là giống con người hơn: mà份 「giống con người hơn」 ấy, mọc ra từ một luận án tiến sĩ tâm lý học giáo dục mà một đứa trẻ Đàn Thủy giúp mẹ viết.

## Anh nói với cấp dưới: đừng dùng cách đó, hãy thử schema

Phải là trung thực.

Bài báo chuỗi suy luận có chín tác giả, Chi Huai-hsin xếp thứ bảy. Tác giả thứ nhất là Jason Wei, người thực hiện chính; vị cuối cùng—theo thối quen học thuật, người chỉ đạo cấp cao—là Denny Zhou, người sáng lập đội nghiên cứu lập luận của Google Brain. Gọi bài báo này là "Chi Huai-hsin phát minh ra", không chính xác; Denny Zhou mới là người chỉ đạo hướng nghiên cứu, và Denny Zhou, là một nhân viên nghiên cứu trong đội của Chi Huai-hsin, người trực tiếp dưới sự chỉ đạo của anh.

Vậy vai trò thực sự của anh là gì? Hãy nghe anh tự nói: "Denny Zhou là một nhân viên nghiên cứu trong đội của tôi, sau khi anh ấy gia nhập đội, chạy tới nói với tôi là muốn làm nghiên cứu lập luận…… Anh ấy ban đầu dùng phương pháp neural symbolic truyền thống, tôi liền nói với anh ấy tôi cảm thấy neural symbolic như không có hiệu lực lắm, có phải anh cân nhắc dùng cách khác không? Rồi chúng ta từ từ bàn luận, phát hiện có lẽ có thể dùng khái niệm schema để làm."[^9]

Đoạn nói này phác hoạ ra đóng góp thực sự của anh. Anh không phải người thực hiện chính bài báo, nhưng anh là người ở ngã tư quan trọng nói "đừng đi con đường đó": anh từ chối hướng neural symbolic—lúc bấy giờ có vẻ như là hạng tự nhiên—và đẩy cuộc bàn luận hướng tới schema. Quan trọng hơn, anh có thể nghĩ tới schema, là vì anh mang theo ba mươi năm quan điểm khoa học nhận thức vào đội. Nói cách khác, anh là người giúp Denny Zhou "có thể nghĩ tới schema" được.

> 📝 **Ghi chú của cộng tác viên**
> "Người tài năng Đài Loan" lỗi thường thấy nhất, là nén một đóng góp phức tạp thành một câu "anh phát minh ra X". Nhưng sự thực thường thú vị hơn. Cái không thể thay thế thực sự của Chi Huai-hsin, là một vòng hai mươi năm: anh từ từ đưa tâm lý học nhận thức vào máy, từ foraging thông tin, tới hệ thống gợi ý, rồi tới chuỗi suy luận. Bài báo sẽ có chín tác giả, xếp hạng, tranh giành công lao; nhưng "hai mươi năm liên tục mang vấn đề con người suy nghĩ như thế nào vào hiện trường kỹ thuật" việc này, chỉ có anh trong cả đội làm được. Để thấy được giá trị của anh, phải mở rộng ra thành khoảng thời gian hai mươi năm, chứ không dừng lại ở một danh sách tác giả.

Anh tự nó dùng một khuôn khổ sâu hơn để giải thích phần tiếp theo của chuỗi suy luận. Khi AI không chỉ giải toán theo schema mà còn "phản tư" đường suy nghĩ của mình, quay lại sửa chữa, anh nói: "Cái này trong nhận thức học của Piaget, hay nói chung là trong khoa học học tập, sẽ gọi nó là đồng hoá và thích ứng…… máy học thực sự này dường như đã thực sự bắt đầu rồi."[^10] Giải toán theo schema là đồng hoá, quay lại viết lại schema là thích ứng: anh đem nguyên bộ khái niệm học được khi giúp mẹ viết luận văn, xách vào mô tả máy học.

Anh cũng kết nối chuỗi suy luận tới khuôn khổ của một nhà tâm lý học khác: "Chuỗi suy luận cộng với tinh chỉnh, cộng với dự đoán từ tiếp theo, dường như là sự khởi đầu của máy lập luận, cái gọi là System 2 thinking—chính là Kahneman nói."[^11] System 1 là trực giác, nhanh, không tốn sức (thấy một cái microphone là biết đó là microphone); System 2 là suy nghĩ tốn sức, hợp lý, cần một bước một bước (bị hỏi "định nghĩa AGI là gì" thì cái bộ não này hoạt động). Theo anh, deep learning trước đó đã làm System 1 rất sâu, còn chuỗi suy luận, là máy bắt đầu làm System 2.

## Máy lập luận, và tiêu chuẩn của bà

Vậy AI khi nào thì mới tính là thực sự "đã đến"? Câu trả lời của Chi Huai-hsin không ở chỉ số kỹ thuật nào, mà ở bà.

"Hôm nào bà của bạn mắng máy nhà cộng nói 'bà dạy bạn một lần rồi, sao bạn vẫn không biết', bạn sẽ biết AGI đã tới……tiêu chuẩn của chúng ta mọc từ bà."[^12]

Câu này nhọn hơn nó nghe có vẻ. Hôm nay máy lau nhà thường bị cột vào dây, đụng vào bàn ghế, chúng ta sẽ than nó ngốc, nhưng sẽ không thực sự tức mình: vì trong lòng chúng ta cảm thấy "máy thì bản dĩ thua tôi, dạy nhiều lần là bình thường". Nhưng khi có hôm, bà sẽ mắng máy như mắng một người không học được, thì cái đó đại diện là bà đã trong lòng coi nó như một đối tượng "dạy một lần là phải biết". AGI tới lúc đó, hơn là nói một con số chỉ số vượt qua một đường, thì giống như là kỳ vọng con người bỏng nước thay đổi.

Cái này cũng kết nối về cách anh nhìn nhân tạo trí thông dụng. Anh cho rằng để AGI thành hình cần hai cái: một là AI không thể chỉ sống trong thế giới ảo, phải có thể nhập vào môi trường sống thực của con người; hai là "bà dạy bạn một lần, bạn chuyên sau đó sẽ biết"——có thể nắm bắt nguyên tắc và áp dụng rộng, tự khám phá, không phải người dạy liên tục. Anh hiện đang dẫn dắt Project Astra, làm việc đầu tiên: một trợ lý đa năng có thể cảm nhận bối cảnh bạn ở.

Anh từng kể một cảnh tượng cá nhân. Khoảng một năm trước, anh mang Project Astra vẫn còn bí mật ra Barcelona để họp, ở một quán bar trên sân thượng khách sạn, anh lấy điện thoại quét trên đường chân trời thành phố, hỏi nó "tôi ở đâu". Nó trả lời "có vẻ bạn ở Barcelona". Anh hỏi tiếp đó là quận nào, nó kể tên đúng quận. Anh lại hỏi xung quanh có không có quán ăn tốt, "nếu có sao Michelin thì càng tốt", nó cũng trả lời. "Tôi nói 'có thể giúp tôi đặt chỗ không?', nó nói 'hiện giờ chưa được, nhưng có lẽ tương lai sẽ được'." Lúc đó anh nhận ra, loại trợ lý riêng thực sự ngồi bên cạnh bạn, hiểu tình cảnh của bạn, trong đời còn lại sẽ làm được.[^13]

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/3rQ4jPvvY0c" title="Sidechat E350 ft. Chi Huai-hsin" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Chi Huai-hsin trên Sidechat E350 nói về kính thông minh, tiêu chuẩn "bà" của AGI và cơ hội của Đài Loan. Trong cuộc phỏng vấn anh lôi ra một cái kính nguyên mẫu trang bị Project Astra, nói cây này "có lẽ" là cây đầu tiên tại Đài Loan._

Tại chỗ phỏng vấn, anh từ túi lôi ra một chiếc kính thông minh trang bị Project Astra, nói cây này "có lẽ" là cây đầu tiên tại Đài Loan. Anh nói tới Đài Loan có cơ hội ở chỗ nào. Phần cứng là một mảnh: "Đài Loan ở bán dẫn, đặc biệt là bộ phận sản xuất, vị trí rất khó xê dịch được." Nhưng anh quay chuyên đề, "Nếu Đài Loan có thể tích hợp phần cứng với phần mềm tốt, tận dụng khả năng của mô hình ngôn ngữ lớn, quả thực là một cơ hội rất lớn."[^14]

## Đài Loan nhận biết chip, không nhận biết chiếc não này

Nói đến đây, không thể tránh khỏi một vấn đề: Anh ấy có tính là người Đài Loan không?

Sự thật cho thấy: anh ấy khoảng 15 tuổi đã rời khỏi Đài Loan, trung học, đại học, nghiên cứu sinh toàn bộ ở Mỹ, cả sự nghiệp nghề nghiệp đều tại Thung lũng Silic. Anh ấy là _Taiwanese American_ (người Mỹ gốc Đài Loan), một người sinh ra ở Đài Loan, lớn lên và thành tài ở Mỹ. Nếu ai nói mũ "Ánh sáng Đài Loan" này đang tiêu thụ một người đã từ lâu di cư, thì sự hoài nghi này không phải là vô cớ.

Nhưng bên kia cân bằng cũng có những thứ thực tế. Anh ấy nhận phỏng vấn bằng tiếng Trung, chủ động nói mình "sinh ra ở Đàn Thủy, là con đất Đài Loan thuần túy", không chút tránh né. Anh ấy liên tục quay về Đài Loan diễn giảng — Sư phạm, Trung Hứng, Dương Minh Giao Thông đều lưu lại bóng dáng của anh ấy. Anh ấy có những quan sát cụ thể về khủng hoảng chăm sóc dài hạn của Đài Loan, vị thế bán dẫn, hệ sinh thái khởi nghiệp AI, thậm chí điểm tên rằng Đài Loan đã có khoảng 15.000 người dùng công cụ dự đoán cấu trúc protein của DeepMind.

Điều tốt nhất thể hiện vị trí "cả trong lẫn ngoài" của anh ấy là một đoạn nói với các nhà nghiên cứu Đài Loan: "Phần nghiên cứu này, thực tế tôi quay về Đài Loan nhiều năm nay, mỗi lần đều nói, nhưng chưa thấy các nhà nghiên cứu Đài Loan… làm về phía này nhiều. Không cần nhiều chip cũng có thể làm được nghiên cứu."[^15]

Trong câu nói này có hai danh tính đang kéo co. Anh ấy dùng từ "quay về Đài Loan" nói chuyện, là người tự nhận thuộc về đây; nhưng "mỗi lần đều nói mà không ai làm" lại mang một cảm giác khoảng cách của người ngoài — như một người xa nhà lâu năm, quay về thấy góc nào đó trong nhà luôn không ai dọn dẹp, lo lắng, nhưng lại bất lực. Anh ấy có tính là "Ánh sáng Đài Loan" hay không, bài viết này không thay bạn kết luận. Sự thật đều đặt ở đây, bạn tự phán đoán.

> 📊 **Anh ấy trong con số**

```tw-stat
Khoảng 5.000 USD | Sức tính toán dùng cho bài báo Chuỗi suy luận | Đối chiếu với trang bị hàng trăm triệu USD của ngành
Khoảng 114.000 lần | Tổng trích dẫn Google Scholar | Trong đó 82% sau năm 2021
13% → 83% | Độ chính xác của OpenAI o1 trên bài thi Olympic Toán | o1 rõ ràng được xây dựng trên nền Chuỗi suy luận
Nguồn: Phỏng vấn VK EP122 của Kỷ Hoài Tân, thống kê trích dẫn Google Scholar, OpenAI o1 System Card (arXiv 2412.16720)
```

_Nguồn: Phỏng vấn VK EP122 của Kỷ Hoài Tân, Google Scholar, OpenAI o1 System Card (arXiv 2412.16720)_

## Hiện quá trình lập luận, là minh bạch hơn hay nói hợp lý hơn

Chuỗi suy luận giúp AI "hiện ra" quá trình suy nghĩ. Trên mặt, cái này làm máy minh bạch hơn——bạn có thể thấy nó suy nghĩ thế nào. Nhưng ẩn chứa ở đây một mối lo một người trung thực nên nêu đôi bên.

> ⚠️ **Quan điểm tranh cãi**
> Chuỗi suy luận giúp AI "hiện" "quá trình suy", trông có vẻ đáng tin hơn, xứng đáng tin cậy hơn. Nhưng học thuật đã nêu ra nghi ngại: mạng suy hiển ra, không nhất định phản ánh đúng quá trình nó quyết định bên trong (cái này trong nghiên cứu gọi là vấn đề "trung thực" của chuỗi suy luận). Nói cách khác, có thể nó sớm suy ra đáp án rồi, quay lại bổ sung một bộ lý do xinh đẹp cho bạn thấy——nói hợp lý hơn, chẳng phải là thành thực hơn. Cùng lúc đó, tháng 3 năm 2026, một ban bồi thẩm ở Los Angeles Mỹ trong một vụ social media gây thành nghiện cho trẻ em, xác định platform YouTube có trách nhiệm, Google bị xét đoán chịu khoảng 30% trách nhiệm. Chi Huai-hsin chính là nhờ hệ thống gợi ý YouTube và những thành tích khác mà được nhận làm thành viên Hiệp hội Máy tính Mỹ (ACM), nhưng hầu như không bao giờ công khai nói về tổn thương mà thuật toán có thể gây. Một người có thể giúp máy "lập luận hơn", đối với "sau khi máy nói hợp lý hơn, liệu hỏi trách sẽ khó hơn không" việc này, hiện tại là im lặng. Chỉ ra điểm này, không có ý chỉ trích ai; chỉ là muốn nói, khi chúng ta tự hào vì một người Đài Loan đứng ngoài cùng của AI, cũng nên để những câu hỏi này vào tầm nhìn.

Mâu thuẫn này không có câu trả lời sạch sẽ, nhưng nó cũng không nên có. Một công nghệ giúp AI giống con người hơn, sẽ cùng lúc phóng to những điểm tốt và khó chịu nhất của con người——con người lập luận, con người cũng soạn lý do cho những quyết định. Trông rõ hai mặt, mới là cách đối xử nghiêm túc với điều này.

## Rồi sao nữa

Chi Huai-hsin quan sát thấy một chu kỳ tám năm: 1991 internet, 1999 Google sinh ra, 2007 iPhone, 2015 deep learning trưởng thành, 2023 Gemini và ChatGPT. Theo nhịp độ này, điểm quanh co tiếp theo rơi vào khoảng 2031. Anh nói, tới lúc đó, "sẽ không ai ngạc nhiên bởi vì bạn dùng mô hình ngôn ngữ lớn làm việc"——giống hôm nay không ai ngạc nhiên bởi vì bạn dùng điện thoại.

Anh hiện đang cá cược vào hướng: giúp AI đi ra khỏi màn hình, vào thế giới thật: Project Astra cảm nhận bối cảnh bạn, robot làm việc nhà. Anh nói nhiều nhất có xúc động, là chăm sóc dài hạn của Đài Loan. "Sẽ có một số robot mà người ta đủ khả năng nuôi được, có thể giúp việc nhà? ——giặt quần áo, nấu cơm, lật người bệnh, cho thuốc đúng giờ." Khi một xã hội thiếu nhân lực, nhân sự chăm sóc thiếu, bệnh viện không đủ giường, những thứ nghe có vẻ science fiction, thực ra là mong ước rất thực tế.

<div class="video-embed" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;">
  <iframe src="https://www.youtube.com/embed/nXVvvRhiGjI" title="Google Project Astra" style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
</div>

_Google phát hành video tầm nhìn Project Astra, đây là hướng Chi Huai-hsin hiện phụ trách: một trợ lý đa năng có thể ở chung một không gian với bạn, hiểu tình cảnh của bạn._

Quay lại cái bàn đó.

Một đứa bé Đạm Thủy, khoảng 15 tuổi theo mẹ tới Minnesota, khi giúp mẹ viết luận văn tiến sĩ tâm lý học giáo dục, học được "con người học như thế nào". Ba mươi năm sau, anh biến khái niệm về con người này thành phương pháp dạy máy suy nghĩ. Khi có ngày, bà của bạn nói với robot nhà "bà dạy bạn một lần, sao bạn vẫn không biết"——máy robot kia sẽ lập luận từng bước, sẽ phản tư, sẽ nắm bắt nguyên tắc và áp dụng rộng, phía sau buộc một sợi chỉ dài. Sợi chỉ này một đầu là phòng thí nghiệm Silicon Valley, đầu kia, là Đạm Thủy.

## Nguồn hình ảnh

- Ảnh chi Huai-hsin (hero): [GQ Taiwan 《GQ Phỏng vấn》Chi Huai-hsin](https://www.gq.com.tw/article/gq%E5%B0%88%E8%A8%AA-%E7%B4%80%E6%87%B7%E6%96%B0-ed-chi-2026) — fair use editorial commentary
- [Junyu-K / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:20241130_淡水油車口木棧道的夕景.jpg) — CC BY-SA 4.0 (Chiều tối tại bến gỗ dầu xe Đạm Thủy)
- [SavagePanda845 (Elliot F) / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:UMN-TheKnoll.jpg) — CC BY-SA 4.0 (Khuôn viên Đại học Minnesota)
- [The wub / Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Xerox_Alto_I,_1973,_Computer_History_Museum.jpg) — CC BY-SA 4.0 (Máy tính Xerox Alto)
- Bài báo Chuỗi suy luận Figure 1: [Wei et al. 2022, arXiv:2201.11903](https://arxiv.org/abs/2201.11903) — fair use academic

## Đọc thêm

- Hoàng Nhân Huân (黃仁勳) — Người tài Đài Loan giúp AI chạy nhanh hơn, phía phần cứng
- Trương Trung Mưu (張忠謀) — Người sáng lập bán dẫn Đài Loan, cái núi "vị trí rất khó xê dịch" trong lời Chi Huai-hsin
- Công nghiệp AI nhân tạo (AI人工智慧產業) — Vị thế của Đài Loan trong chuỗi cung ứng AI toàn cầu
- Phát triển AI Đài Loan và chiến lược tương lai (台灣人工智慧發展與未來策略) — Bức tranh tổng thể AI Đài Loan
- AI hàng ngày Đài Loan (台灣AI日常) — AI đã đi vào đời sống Đài Loan như thế nào

## Tài liệu tham khảo

[^1]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Cuộc phỏng vấn kênh chính thức VK, Chi Huai-hsin tham gia. Khoảng 52 phút anh nói rõ bài báo Chuỗi suy luận chỉ dùng khoảng năm nghìn đô la Mỹ sức mạnh tính toán, là bằng chứng có sức thuyết phục nhất của "chống quân vũ khí sức mạnh tính toán".

[^2]: [Sidechat E350 (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — Cuộc phỏng vấn podcast công nghệ chính thức INSIDE, lúc mở đầu chương trình Chi Huai-hsin tự giới thiệu, nói rõ sinh ở Đạm Thủy, khoảng 15 tuổi theo mẹ sang Mỹ.

[^3]: [Tiểu sử Ed H. Chi cá nhân](https://www.edchi.net/resume) — Trang web chính thức Chi Huai-hsin ghi tiểu sử, ghi lại bằng cạc sĩ Khoa học Máy tính Đại học Minnesota (1992–1994), thạc sĩ Khoa học Máy tính (1994–1996), Tiến sĩ Máy tính Khoa học Thông tin (1996–1999), tốt nghiệp với vinh dự cao nhất, người hướng dẫn John T. Riedl.

[^4]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Khoảng 56 phút, Chi Huai-hsin tự thuật hành trình lòng vì toán học thua bạn mà sang làm nghiên cứu "cầu nối", là khoá để hiểu phong cách nghiên cứu của anh.

[^5]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Khoảng 5 phút, Chi Huai-hsin giải thích sư phạm tại Trung tâm Nghiên cứu Palo Alto, cấp trên Stuart Card là học trò Allen Newell. Chuyên danh đã được hiệu chỉnh dựa trên nguồn học thuật ([Trang Wikipedia Stuart Card](https://en.wikipedia.org/wiki/Stuart_Card)).

[^6]: [Ed H. Chi | Google Research](https://research.google/people/edchi/) — Trang cá nhân chính thức Google Research, ghi lại quãng đường sự nghiệp của anh tại Google và lĩnh vực nghiên cứu; chi tiết sự nghiệp xem thêm tiểu sử cá nhân [edchi.net/resume](https://www.edchi.net/resume).

[^7]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Khoảng 9 phút, Chi Huai-hsin giải thích không hài lòng với "tại sao phải dùng rất nhiều dữ liệu máy mới học được", là điểm khởi phát của Chuỗi suy luận.

[^8]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Khoảng 9 tới 10 phút, tự thuật lõi nhất về nguồn gốc Chuỗi suy luận: lý thuyết schema, Piaget, và kết nối cá nhân với viết luận văn tiến sĩ tâm lý học giáo dục cho mẹ. Đoạn linh hồn của bài.

[^9]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Khoảng 57 phút, Chi Huai-hsin tự thuật từ chối phương pháp neural symbolic của Denny Zhou, quay sang schema, là bằng cứ đầu để xét đoán vai trò công lao của anh. Tác giả bài báo và thứ tự xem [arXiv 2201.11903](https://arxiv.org/abs/2201.11903).

[^10]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Khoảng 15 phút, Chi Huai-hsin dùng khuôn khổ đồng hoá và thích ứng của Piaget mô tả tiến hóa từ Chuỗi suy luận tới suy luận phản tư, thể hiện cách anh đem trực tiếp ngôn ngữ tâm lý học giáo dục vào AI.

[^11]: [VK Thời gian Đọc Công nghệ EP122: Tiến hóa AI, nguyên mẫu AGI, nhiều tâm lý học (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=51woDEK5NME) — Khoảng 17 phút, Chi Huai-hsin kết nối Chuỗi suy luận tới khuôn khổ System 1/System 2 của Kahneman trong cuốn《Suy nghĩ nhanh và chậm》. Cuốn sách 《Thinking, Fast and Slow》của Kahneman xuất bản 2011.

[^12]: [Sidechat E350 (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — Lúc mở đầu và khoảng 60 phút, Chi Huai-hsin nêu "tiêu chuẩn bà" của AGI: khi bà sẽ mắng robot như mắng con người "dạy một lần sao vẫn không biết", AGI đã tới.

[^13]: [Sidechat E350 (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — Khoảng 30 phút, Chi Huai-hsin kể chuyện mang Project Astra bí mật tới Barcelona, ở quán bar trên sân thượng, quét bầu trời thành phố, nó xác định rõ vị trí thành phố và quận tương ứng của cảnh tự thân.

[^14]: [Sidechat E350 (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — Khoảng 40 phút, Chi Huai-hsin bình luận vị thế bán dẫn sản xuất Đài Loan "rất khó xê dịch", và tích hợp phần mềm phần cứng cho Đài Loan là "cơ hội rất lớn".

[^15]: [Sidechat E350 (ft. Chi Huai-hsin)](https://www.youtube.com/watch?v=3rQ4jPvvY0c) — Khoảng 52 phút, Chi Huai-hsin gọi nghiên cứu tới nhà nghiên cứu Đài Loan: lĩnh vực này "không cần rất nhiều chip" cũng làm được, nhưng quay lại bao nhiêu năm mỗi lần nói vẫn chưa thấy nhà nghiên cứu Đài Loan đầu tư. Đoạn này càng thể hiện rõ căng thẳng outsider-insider trong danh tính của anh.
