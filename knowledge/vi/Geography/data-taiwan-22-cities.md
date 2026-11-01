---
title: 'Nhìn Đài Loan qua dữ liệu 22 huyện thành: Chênh lệch mật độ cao nhất và thấp nhất gấp 151 lần, tỷ lệ người già và trẻ em từ 1:1 đến gần 3:1'
description: 'Cùng một hòn đảo, Đài Bắc có 8.975 người/km², trong khi Đài Đông chỉ có 59 người, chênh lệch 151 lần. Dựa trên dữ liệu của Cục Hộ tịch Bộ Nội vụ cuối năm 2025 để phác họa chân dung 22 huyện thành: 70% dân số tập trung trên 30% diện tích đất; tỷ lệ người cao tuổi tại Đài Bắc là cao nhất, trong khi tại Gia Nghĩa (Chiayi) tỷ lệ người già so với trẻ em đạt gần 3:1. Tại tất cả 22 huyện thành, số ca tử vong đều đã vượt quá số ca sinh.'
date: 2026-06-06
category: 'Geography'
tags:
  [
    'Thống kê dân số',
    'Già hóa dân số',
    'Xã hội siêu già',
    'Lục đô',
    'Cách biệt thành thị và nông thôn',
    'Mật độ dân số',
    'Chỉ số lão hóa',
    'Tỷ lệ sinh thấp',
    'Trực quan hóa dữ liệu',
    'Series 22 huyện thành',
  ]
subcategory: '人口與區域'
author: 'Taiwan.md'
readingTime: 13
featured: false
lastVerified: 2026-06-06
lastHumanReview: false
image: '/article-images/geography/taiwan-island-nasa-mosaic.webp'
imageAlt: 'Ảnh vệ tinh nhìn từ không gian xuống đảo chính Đài Loan, có thể phân biệt rõ ràng đồng bằng phía Tây và dãy núi Trung ương ở phía Đông'
imageCredit: 'NASA'
imageLicense: 'Public domain（NASA）'
imageSource: 'https://commons.wikimedia.org/wiki/File:Taiwan_Main_Island_Mosaic_NASA_2020.jpg'
translatedFrom: 'Geography/用數據看台灣22縣市.md'
sourceCommitSha: '756ab2957'
sourceContentHash: 'sha256:a86ba6869bf4f80d'
sourceBodyHash: 'sha256:4da0398520125992'
translatedAt: '2026-10-24T00:02:10+08:00'
---

# Nhìn Đài Loan qua dữ liệu 22 huyện thành: Chênh lệch mật độ cao nhất và thấp nhất gấp 151 lần, tỷ lệ người già và trẻ em từ 1:1 đến gần 3:1

Lái xe từ quận Xinyi (Tín Nghĩa), Đài Bắc, đi thẳng về phía Nam và phía Đông để cuối cùng đến thành phố Đài Đông. Định vị hiển thị hơn 300 km, lái chưa đầy một ngày. Nhưng chỉ cần bạn thay đổi thước đo khác — số người sống trên mỗi km² ngoài cửa sổ — đoạn đường đó sẽ giống như băng qua hai quốc gia khác biệt. Tại Đài Bắc, nơi có quận Xinyi, mật độ là 8.975 người/km². Tại Đài Đông, nơi có thành phố Đài Đông, chỉ có 59 người/km². Cùng một hòn đảo, cùng một cuốn hộ chiếu, nhưng mật độ chênh lệch tới 151 lần.

Con số này không phải là sự ngẫu nhiên của các giá trị cực đoan. Đó là khoảng cách thực tế bên trong Đài Loan. Chúng ta thường có thói quen nói về "Đài Loan" như một chỉnh thể — nói về kinh tế, bầu cử, hay tỷ lệ sinh thấp — nhưng khi bạn trải rộng toàn bộ dữ liệu huyện thành tính đến cuối năm 2025 của Cục Hộ tịch Bộ Nội vụ, bạn sẽ thấy không hề có một Đài Loan đồng nhất. Có người chen chúc trong rừng bê tông để chờ đèn đỏ, có người lái xe mười phút không thấy chiếc thứ hai. Có những huyện thành đang lớn lên, nhưng đa số các huyện thành khác đang thu nhỏ lại. Ở những góc trẻ nhất, số người già và trẻ em xấp xỉ bằng nhau. Ở những góc già nhất, một đứa trẻ phải đối mặt với gần ba người già.

```tw-figure
151 lần
Chênh lệch mật độ dân số giữa Đài Bắc và Đài Đông: 8.975 người/km² so với 59 người/km²
Cục Hộ tịch Bộ Nội vụ, cuối năm 2025
```

Bài viết này muốn thực hiện một việc: Dùng dữ liệu chính thức để phác họa một chân dung có thước đo và có thể kiểm chứng cho toàn bộ hòn đảo. Sau khi vẽ xong, bạn sẽ thấy một khuôn mặt phân hóa cực kỳ nghiêm trọng và đang già đi một cách nhanh chóng. [^1]

> **Tóm tắt trong 30 giây:** Tính đến cuối năm 2025, tổng dân số Đài Loan là 23.299.132 người (khoảng 23,3 triệu người), đã giảm liên tiếp trong 23 tháng, và số trẻ sơ sinh lần đầu tiên rơi xuống dưới mức 110.000. Trong cùng năm đó, Đài Loan chính thức bước vào "xã hội siêu già", cứ năm người thì có một người trên 65 tuổi. Tuy nhiên, con số trung bình toàn quốc đã che lấp sự chênh lệch khổng lồ bên trong: mật độ dân số cao nhất và thấp nhất chênh nhau 151 lần, quy mô dân số chênh nhau 297 lần, tỷ lệ người già so với trẻ em kéo giãn từ 1:1 đến gần 3:1. Dân cư tập trung về sáu đô thị lớn (Lục đô), nhưng sự già hóa không đi theo mật độ dân số: nơi có tỷ lệ người cao tuổi cao nhất là Đài Bắc đông đúc nhất, nơi có tỷ lệ người già so với trẻ em cao nhất là Gia Nghĩa (Chiayi), và nơi trẻ nhất là Hsinchu (Tân Trúc) được nâng đỡ bởi Khu khoa học Tân Trúc. Đây là một Đài Loan đang phân hóa và cùng nhau già đi. [^2]

## 70% dân số, 30% diện tích đất

Trước tiên hãy nhìn vào một sự thật dễ bị bỏ qua: Người Đài Loan thực tế sống rất tập trung.

Cuối năm 2025, sáu thành phố trực thuộc trung ương (Đài Bắc, Tân Bắc, Đào Viên, Đài Trung, Đài Nam, Cao Hùng) có tổng cộng 16.278.931 người sinh sống, chiếm 69,87% tổng dân số toàn Đài Loan. Nói cách khác, cứ mười người Đài Loan thì có gần bảy người sống ở sáu đô thị lớn này. Thế nhưng, diện tích đất của sáu đô thị này cộng lại chỉ chiếm 30,12% diện tích toàn Đài Loan. 70% dân số chen chúc trên 30% diện tích đất. 30% dân số còn lại rải rác trên 70% diện tích đất còn lại. Đây chính là cấu trúc phân bố dân số đầu tiên của Đài Loan.

```tw-stat
23,3 triệu | Tổng dân số toàn Đài Loan | Cuối năm 2025, giảm liên tiếp 23 tháng
20,06% | Tỷ lệ dân số trên 65 tuổi | Chính thức vượt ngưỡng siêu già vào năm 2025
69,87% | Tỷ lệ dân số sáu đô thị so với cả nước | Nhưng chỉ sống trên 30% diện tích đất
Nguồn: Thống kê dân số của Cục Hộ tịch Bộ Nội vụ (Tổng dân số cuối năm 2025, tỷ lệ trên 65 tuổi, tỷ lệ dân số sáu đô thị) và dữ liệu cải cách thành phố trực thuộc trung ương [^1][^4]
```

Cấu trúc 7:3 này không phải tự nhiên hình thành, nó có một điểm khởi đầu mang tính chế độ rõ ràng. Ngày 25 tháng 12 năm 2010, Đài Loan đã thay đổi hoàn toàn bản đồ hành chính: huyện Đài Bắc được nâng cấp lên thành thành phố Tân Bắc, các huyện Đài Trung, Đài Nam và Cao Hùng được sáp nhập thành các thành phố trực thuộc trung ương, cộng với thành phố Đài Bắc hiện có, năm thành phố trực thuộc trung ương đồng thời ra đời. Bốn năm sau, vào ngày 25 tháng 12 năm 2014, Đào Viên được nâng cấp lên thành đô thị thứ sáu. Chỉ trong bốn năm ngắn ngủi, Đài Loan từ hai thành phố trực thuộc trung ương ban đầu đã trở thành sáu, và cán cân tài nguyên, ngân sách, xây dựng cũng theo đó mà nghiêng về phía này. [^4]

Việc nâng cấp chưa bao giờ chỉ là thay đổi cái tên. Các khoản trợ cấp phân bổ chung, biên chế nhân sự và nguồn thu tự chủ của các thành phố trực thuộc trung ương đều cao hơn nhiều so với các huyện thành thông thường. Xây dựng đổ về đâu, cơ hội việc làm sẽ mọc lên ở đó, và người trẻ sẽ chuyển đến đó. Chế độ đã vẽ ra một đường kẻ trước, sau đó dân số mới chảy theo đường kẻ đó. Sự tập trung vào sáu đô thị mà chúng ta thấy ngày nay, ở một mức độ nào đó, chính là kết quả của cuộc cải cách năm 2010 sau hơn một thập kỷ.

Biểu đồ dưới đây phân tích rõ hơn về việc "người Đài Loan sống ở đâu". Chỉ riêng thành phố Tân Bắc đã chứa 17,4% dân số cả nước, Đài Trung 12,3%, Cao Hùng 11,7%, Đài Bắc 10,5%, Đào Viên 10,1%, Đài Nam 7,9% — sáu đô thị cộng lại gần bằng 70%. Trong khi đó, 16 huyện thành còn lại rải rác khắp Đài Loan, từ miền Bắc kéo dài đến các đảo xa, tổng cộng chỉ chiếm 30,1%.

```tw-waffle
Người Đài Loan sống ở đâu (tỷ lệ % dân số cả nước)
Tân Bắc | 17.4
Đài Trung | 12.3
Cao Hùng | 11.7
Đài Bắc | 10.5
Đào Viên | 10.1
Đài Nam | 7.9
16 huyện thành khác | 30.1
Nguồn: Cục Hộ tịch Bộ Nội vụ, cuối năm 2025
```

Nhìn kỹ vào biểu đồ ô vuông này, bạn sẽ nảy sinh một câu hỏi: Vậy 30% dân số rải rác trên 70% diện tích đất kia đang sống cuộc đời như thế nào? Câu trả lời nằm ở mật độ.

![Đường chân trời của các tòa nhà cao tầng tại quận Xinyi và khu vực Nangang, Đài Bắc, với các khu dân cư và văn phòng dày đặc xếp chồng lên nhau](/article-images/society/taipei-skyline-housing-2026.webp)
_Đường chân trời của thành phố Đài Bắc. Huyện thành đông đúc nhất Đài Loan, nhồi nhét 8.975 người mỗi km². Photo: Heeheemalu, CC BY-SA 4.0 via [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg)._

## Từ đông đúc nhất đến trống trải nhất, chênh lệch 151 lần

Tập trung dân số nói về "bao nhiêu người", còn mật độ nói về "có chen chúc hay không". Vế sau giúp bạn cảm nhận rõ hơn khoảng cách giữa hai Đài Loan.

Đài Bắc với 8.975 người/km² là nơi đông đúc nhất toàn Đài Loan. Sự đông đúc ở Đài Bắc là chuyện thường nhật: tàu điện ngầm chật kín người vào giờ cao điểm, chờ đèn đỏ phải đợi hai vòng, nhà cửa xây vừa cao vừa hẹp. Tiếp theo là thành phố Tân Trúc với 4.376 người/km², chưa bằng một nửa của Đài Bắc. Sau đó là thành phố Cơ Long (Keelung) với 2.710 người/km². Chỉ riêng ba thành phố đông đúc nhất này, mật độ đã giảm xuống theo kiểu vực thẳm.

```tw-bars
Đài Bắc | 8.975 người/km²
Tân Trúc | 4.376 người/km²
Cơ Long | 2.710 người/km²
彰化 (Chương Hóa) | 1.126 người/km²
Hoa Liên | 68 người/km²
Đài Đông | 59 người/km² | Trống trải nhất Đài Loan
Nguồn: Cục Hộ tịch Bộ Nội vụ, cuối năm 2025
```

Chuyển tầm mắt sang đầu kia của biểu đồ thanh này, sự chênh lệch mới thực sự lộ rõ. Huyện Chương Hóa với 1.126 người/km² đã được coi là tương đối dày đặc trong số các huyện nông nghiệp. Đến [Hoa Liên](/vi/geography/hualien-county/), con số rơi xuống còn 68 người. Ở dưới cùng, huyện Đài Đông chỉ còn lại 59 người mỗi km². Số người chứa trong một km² của Đài Bắc tương đương với diện tích 151 km² của Đài Đông mới chứa đầy được. Đó chính là diện mạo thực sự của sự chênh lệch 151 lần — bạn lái xe từ quận Xinyi thẳng đến Đài Đông, tận mắt chứng kiến dân số thưa thớt dần qua cửa sổ.

Đằng sau điều này còn có một thực tế địa lý chống đỡ. Huyện thành có diện tích lớn nhất Đài Loan là Hoa Liên với 4.628 km², gần như bao trọn phía Đông của dãy núi Trung ương. Địa hình rộng, ít người, nhiều núi, mật độ của Hoa Liên và Đài Đông tự nhiên bị pha loãng xuống mức thấp nhất toàn Đài Loan. Trong khi đó, [huyện Liên Giang](/vi/geography/lienchiang-county/) có diện tích nhỏ nhất chỉ 28,8 km². Mật độ là một vấn đề mà một nửa là do lựa chọn của con người, một nửa là do địa hình quyết định sẵn.

Người ta thường mặc định "mật độ dân số cao" đồng nghĩa với sự tiến bộ, và "mật độ thấp" là lạc hậu, nhưng mối quan hệ này thực chất đã đảo ngược nhân quả. Đài Đông có mật độ thấp không phải vì nó không thể phát triển, mà vì nó tựa lưng vào núi lớn, hướng mặt ra Thái Bình Dương, vốn dĩ có điều kiện địa lý rộng lớn nhưng thưa dân. Sự "trống trải" của Hoa Liên chứa đựng hẻm núi Taroko, chứa đựng dãy núi Trường Hải, chứa đựng cảnh quan vùng hậu sơn hoàn chỉnh nhất Đài Loan. Con số mật độ chỉ cho bạn biết người ta có chen chúc hay không, nó không nói cho bạn biết giá trị của mảnh đất đó. Nếu xếp 22 huyện thành Đài Loan thành một quang phổ từ đông đúc đến trống trải, bạn sẽ thấy một hòn đảo đang nảy sinh những cách sống khác nhau trên các địa hình khác nhau.

![Đại lộ Bohlang ở Trì Thượng, Đài Đông, con đường nông thôn thẳng tắp dài khoảng 2,2 km, hai bên là ruộng lúa bao la, không có cột điện](https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_%2828896712393%29.jpg/1280px-29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_%2828896712393%29.jpg)
_Đại lộ Bohlang tại Trì Thượng, Đài Đông. Huyện trống trải nhất trên cùng một hòn đảo, với 59 người/km², chỉ bằng 1/151 so với Đài Bắc. Photo: Sinchen.Lin, CC BY 2.0 via [Wikimedia Commons](<https://commons.wikimedia.org/wiki/File:29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_(28896712393).jpg>).\_

## Người khổng lồ và hạt bụi

Nếu mật độ so sánh về sự "chen chúc", thì quy mô dân số so sánh về độ "lớn nhỏ". Sự chênh lệch ở chiều kích này thậm chí còn khủng khiếp hơn cả mật độ.

Nơi có dân số đông nhất Đài Loan là thành phố Tân Bắc với 4.044.831 người, một thành phố đơn lẻ đã tương đương với không ít quốc gia. Nơi có dân số ít nhất là huyện Liên Giang (Mã Tổ), chỉ có 13.621 người. Dân số của một thành phố Tân Bắc gấp 297 lần huyện Liên Giang. Nếu chuyển toàn bộ dân cư của cả huyện Liên Giang vào Tân Bắc, thậm chí còn không lấp đầy được một phần nhỏ. Cùng cầm một cuốn hộ chiếu Trung Hoa Dân Quốc, "toàn thể" của một huyện trong mắt huyện kia chỉ là một hạt bụi.

Sự chênh lệch quy mô này sẽ trực tiếp trở thành bài toán khó trong quản trị. Tân Bắc phải xử lý giao thông, nhà ở, chăm sóc dài hạn và rác thải cho bốn triệu người; Liên Giang phải suy nghĩ làm sao để các đảo xa với mười ba nghìn dân không tiếp tục mất dân, làm sao duy trì một bệnh viện, làm sao để chuyến tàu cuối cùng vẫn còn chạy. Cùng một bộ luật, cùng một hệ thống chính sách trung ương, nhưng khi áp dụng vào khoảng cách dân số gấp 297 lần, cách thức thực thi sẽ hoàn toàn khác biệt. Khi chúng ta nói về "chính quyền địa phương", trong đầu thường mặc định quy mô của đô thị, nhưng Đài Loan có rất nhiều huyện thành đang vận hành cả một bộ máy chính phủ với quy mô chỉ như một hạt bụi.

Tuy nhiên, cần cẩn thận với một cái bẫy trực giác: Quy mô nhỏ không đồng nghĩa với việc dân số trẻ. Bạn có thể nghĩ rằng các đảo xa hay huyện nhỏ vì người trẻ di cư nên chỉ còn người già, vừa nhỏ vừa già; và cũng có thể nghĩ đô thị lớn nhiều tài nguyên, nhiều cơ hội nên vừa lớn vừa trẻ. Dữ liệu thực tế sẽ bác bỏ cả hai giả định này. Huyện Liên Giang có dân số ít nhất nhưng tỷ lệ già hóa là 17,14%, ngược lại còn thấp hơn vài huyện lớn; trong khi Đài Bắc — nơi đông dân thứ tư và cực kỳ phồn hoa — lại có tỷ lệ già hóa cao nhất toàn Đài Loan là 24,18%. Giữa quy mô và sự già hóa không hề có một đường tương quan thẳng tắp. Để hiểu Đài Loan đang già đi như thế nào, bạn phải đổi một bản đồ khác.

## Hai nơi già nhất: Đài Bắc và Gia Nghĩa (Chiayi)

Năm 2025, Đài Loan đã vượt qua một ngưỡng cửa: tỷ lệ dân số trên 65 tuổi toàn quốc đạt 20,06%, chính thức trở thành "xã hội siêu già" theo định nghĩa của Tổ chức Y tế Thế giới. Quy đổi ra, có 4,67 triệu người trên toàn Đài Loan trên 65 tuổi, cứ năm người Đài Loan thì có một người là người cao tuổi. Và trong 22 huyện thành, đã có 14 nơi có tỷ lệ già hóa vượt quá 20%. Già đi đã trở thành màu sắc chung của cả hòn đảo.

Nhưng con số trung bình 20,06% toàn quốc đã làm phẳng đi những khác biệt dữ dội bên trong. Bảng dưới đây liệt kê tỷ lệ già hóa và chỉ số lão hóa của 22 huyện thành, đây là bảng mà bài viết này cần bạn dừng lại xem kỹ nhất. Trước tiên hãy giải thích cách đọc "chỉ số lão hóa": nó bằng dân số trên 65 tuổi chia cho dân số từ 0 đến 14 tuổi rồi nhân với 100. Con số 100 đại diện cho việc người già và trẻ em bằng nhau; con số càng cao nghĩa là nơi đó càng "đầu nặng chân nhẹ", người già ở trên ngày càng nhiều, trẻ em ở dưới ngày càng ít.

```tw-heatmap
Huyện thành | Tỷ lệ già hóa 65+ (%) | Chỉ số lão hóa
Đài Bắc | 24.18 | 202.06
Tân Bắc | 19.95 | 185.54
Đào Viên | 16.72 | 127.33
Đài Trung | 17.40 | 136.45
Đài Nam | 20.48 | 184.96
Cao Hùng | 20.79 | 192.10
Cơ Long | 22.28 | 240.21
Tân Trúc | 16.16 | 106.59
Gia Nghĩa (Thành phố) | 19.90 | 164.47
Tân Trúc (Huyện) | 15.08 | 101.88
Miêu Lật | 20.23 | 179.56
Chương Hóa | 20.37 | 178.35
Nam Đầu | 22.66 | 224.64
Vân Lâm | 21.76 | 206.78
Gia Nghĩa (Huyện) | 24.11 | 291.69
Bình Đông | 21.84 | 218.72
Y Lan | 20.77 | 189.67
Hoa Liên | 21.52 | 200.53
Đài Đông | 20.93 | 194.71
Bành Hồ | 21.03 | 223.65
Kim Môn | 19.69 | 255.57
Liên Giang | 17.14 | 180.23
Nguồn: Cục Hộ tịch Bộ Nội vụ, cuối năm 2025
```

Nhìn vào tỷ lệ trên 65 tuổi, nơi già nhất Đài Loan là Đài Bắc với 24,18%, Gia Nghĩa (huyện) với 24,11% chỉ kém 0,07 điểm phần trăm. Nhưng nếu đổi sang chỉ số lão hóa, vị trí dẫn đầu lại thuộc về Gia Nghĩa với 291,69 — nghĩa là mỗi một đứa trẻ tương ứng với gần ba người già; tiếp theo là Kim Môn 255,57, Cơ Long 240,21, còn Đài Bắc lùi xuống vị trí thứ tám với 202,06. Sự khác biệt giữa hai cột nằm ở mẫu số: chỉ số lão hóa lấy người già so với trẻ em, nên dù tỷ lệ người cao tuổi của Đài Bắc cao, nhưng tỷ lệ trẻ em ở đây cũng cao hơn Gia Nghĩa hay Kim Môn, khiến chỉ số bị kéo xuống.

Cả hai cột đều lọt vào top 7 là bốn huyện nông nghiệp: Gia Nghĩa, Nam Đầu, Vân Lâm, Bình Đông, cộng với thành phố cảng cũ Cơ Long nơi ngành công nghiệp đã di dời. Dân số của năm huyện thành này đều đang giảm: người trẻ rời đi để làm việc và học tập, những người ở lại dần già đi, trong khi trẻ sơ sinh không bù đắp kịp, khiến con số ở cả hai cột cùng tăng vọt.

Vậy, góc trẻ nhất Đài Loan nằm ở đâu? Câu trả lời sẽ khiến nhiều người ngạc nhiên: không phải ở một chốn bồng lai tiên cảnh nào đó, mà là ngay bên cạnh các nhà máy công nghệ. Tỷ lệ già hóa của huyện Tân Trúc chỉ có 15,08%, thấp nhất toàn Đài Loan; chỉ số lão hóa là 101,88, gần như là trạng thái cân bằng 1:1 giữa người già và trẻ em, nổi bật hẳn lên giữa bối cảnh già hóa của cả nước. Thành phố Tân Trúc 16,16% và Đào Viên 16,72% theo sát phía sau. Sự trẻ trung của ba nơi này hầu như đều viết chung một lý do: Khu khoa học Tân Trúc (Hsinchu Science Park). Ngành bán dẫn và công nghệ đã thu hút một lượng lớn kỹ sư, nhân viên kỹ thuật đang trong độ tuổi sinh đẻ đến đây; họ lập gia đình, sinh con tại đây, cưỡng ép cấu trúc dân số của các huyện thành này kéo về phía trẻ trung. Thứ mà Khu khoa học Tân Trúc nâng đỡ, ngoài những con số xuất khẩu của Đài Loan, còn là một bản đồ dân số trẻ nhất Đài Loan.

Đặt huyện Tân Trúc trẻ nhất cạnh huyện Gia Nghĩa có chỉ số lão hóa cao nhất, sự chênh lệch sẽ càng nhức mắt hơn.

```tw-versus
Huyện Tân Trúc (Trẻ nhất Đài Loan) | Huyện Gia Nghĩa (Chỉ số lão hóa cao nhất)
Tỷ lệ 65+ là 15.08% | Tỷ lệ 65+ là 24.11%
Chỉ số lão hóa 101.88 | Chỉ số lão hóa 291.69
Dân số vẫn đang tăng trưởng | Dân số tiếp tục sụt giảm
Sự trẻ trung nhờ Khu khoa học Tân Trúc | Huyện nông nghiệp, trẻ sơ sinh không bù kịp
Nguồn: Cục Hộ tịch Bộ Nội vụ, cuối năm 2025
```

Tân Trúc 15,08% đối đầu với Gia Nghĩa 24,11%, tỷ lệ già hóa chênh nhau 9 điểm phần trăm; chỉ số lão hóa 101,88 đối đầu với 291,69, chênh nhau gần ba lần. Một nơi đang tăng trưởng, dân số chảy vào; một nơi sụt giảm liên tục, dân số chảy ra. Hai huyện trên cùng một hòn đảo, một bên người già và trẻ em xấp xỉ bằng nhau, một bên sau mỗi đứa trẻ là gần ba người già đứng đợi. Ở công viên tại Tân Trúc, bạn có thể thấy những cha mẹ trẻ đẩy xe nôi, nhưng ở vùng nông thôn Gia Nghĩa, có thể cả con phố toàn là những bậc cao niên đi lại chậm rãi. Hai kiểu Đài Loan này đều được tính toán ra từ những con số của Cục Hộ tịch.

Nhiều người nghĩ già hóa là đặc quyền của nông thôn và đảo xa, rằng thanh niên ở đô thị lớn nhiều, cơ hội nhiều thì nên miễn nhiễm với sự già hóa. Con số của Đài Bắc không phải vậy: thành phố phồn hoa nhất, tập trung tài nguyên nhất Đài Loan này lại có tỷ lệ người cao tuổi đứng đầu cả nước, và chỉ số lão hóa cũng đứng đầu sáu đô thị. Cách giải thích thường được nhắc đến là giá nhà, các gia đình trẻ bị đẩy sang Tân Bắc, Đào Viên để lập gia đình và sinh con, còn những người ở lại trung tâm là thế hệ đã định cư từ sớm và nay đang dần già đi. Sự phồn hoa của đô thị không ngăn được sự già hóa, nó chỉ khiến sự già hóa diễn ra theo một cách khác. Già hóa là hoàn cảnh chung của cả hòn đảo, sự khác biệt chỉ là nhanh hay chậm mà thôi.

## Một hòn đảo, cùng nhau già đi

Kéo ống kính từ cấp huyện thành ra toàn quốc, câu chuyện già hóa của Đài Loan còn có một chiều kích đáng báo động hơn: tốc độ.

Đài Loan không phải bây giờ mới bắt đầu già đi. Năm 1993, tỷ lệ dân số trên 65 tuổi toàn quốc vượt quá 7%, bước vào "xã hội già hóa" theo định nghĩa quốc tế. Năm 2018, con số này đạt 14,05%, bước vào "xã hội già". Năm 2025, nó lại phá mức 20%, trở thành "xã hội siêu già". Ba cột mốc trông có vẻ chỉ là ba năm khác nhau, nhưng ẩn chứa bên trong là một con dốc đang ngày càng lao nhanh hơn.

```tw-timeline
1993 | Xã hội già hóa | 65+ vượt 7%, Đài Loan bắt đầu già đi
2018 | Xã hội già | 65+ đạt 14%, mất 25 năm từ cột mốc trước
2025 | Xã hội siêu già | 65+ phá 20%, cột mốc này chỉ mất 7 năm
Nguồn: Thống kê dân số Bộ Nội vụ và định nghĩa ngưỡng già hóa quốc tế (1993 là 7%, 2018 là 14,05%, 2025 là 20%) [^1]
```

Hãy nhìn vào hai khoảng cách trên trục thời gian này. Từ 7% lên 14%, Đài Loan mất 25 năm; nhưng từ 14% lên 20%, chỉ mất có 7 năm. Đoạn đường sau này chỉ dùng chưa đến một phần ba thời gian của đoạn trước. Đài Loan đang già đi, và ngày càng nhanh hơn. Điều này được coi là cấp bách so với các quốc gia khác trên thế giới; trong khi các nước khác có vài thập kỷ để điều chỉnh dần hệ thống chăm sóc dài hạn, lương hưu và y tế, thì Đài Loan bị nén lại trong vỏn vẹn 7 năm, buộc phải xây dựng toàn bộ hệ thống chăm sóc người già trong một khung thời gian cực ngắn.

```tw-line
Sự gia tăng tỷ lệ dân số trên 65 tuổi toàn quốc (%)
Năm | Tỷ lệ 65+
2000 | 8.6
2010 | 10.7
2020 | 16.1
2025 | 20.06
Nguồn: Bộ Nội vụ, Hội đồng Phát triển Kinh tế Quốc gia (NDC)
```

Đường biểu diễn đi lên này cho thấy sự tăng tốc rõ rệt hơn. Năm 2000 tỷ lệ trên 65 tuổi là 8,6%, năm 2010 là 10,7%, mười năm chỉ tăng hơn 2 điểm phần trăm một chút; nhưng trong mười năm từ 2010 đến 2020, con số vọt từ 10,7% lên 16,1%, và đến năm 2025 là 20,06%. Phần cuối của đường kẻ rõ ràng dốc hơn phần đầu. Đường cong già hóa của Đài Loan đang uốn cong lên trên.

Mặt khác của sự già hóa là sự sụp đổ ở đầu sinh sản. Năm 2025, số trẻ sơ sinh tại Đài Loan lần đầu tiên rơi xuống dưới mức 110.000, chỉ còn 107.812 trẻ. Tỷ lệ sinh thấp và già hóa dân số là hai mặt của cùng một đồng xu: người già ở trên ngày càng nhiều, trẻ em bù đắp ở dưới ngày càng ít, khiến cấu trúc dân số trở nên "đầu nặng chân nhẹ". Đây cũng là lý do tại sao chỉ số lão hóa của các huyện thành kể trên lại cao đến vậy: người già tăng lên, còn trẻ em thì quá ít đi.

> **📝 Ghi chú của biên tập viên**
> Chúng ta rất dễ hiểu lầm "giảm dân số" là "người trẻ chuyển từ nông thôn ra thành thị, nên nông thôn ít đi và thành thị nhiều lên", giống như chỉ là một cuộc di cư nội đảo. Nhưng dữ liệu năm 2025 tiết lộ một sự thật căn bản hơn: "tăng trưởng tự nhiên" của tất cả các huyện thành trên toàn quốc đều là số âm. Nghĩa là, tại mọi huyện thành ở Đài Loan, bất kể thành thị hay nông thôn, lớn hay nhỏ, số ca tử vong đều đã vượt quá số ca sinh. Đây không còn là vấn đề dân cư di chuyển đi đâu nữa, mà là cả hòn đảo đang rơi vào tình trạng "sinh không bằng tử". Di cư chỉ là sự tái phân bổ lại lượng dân số vốn dĩ đang thu hẹp, nó không tạo ra thêm bất kỳ con người mới nào.

Sự thật này đáng để chúng ta dừng lại và suy ngẫm kỹ. Năm 2025, cả Đài Loan chỉ còn bốn huyện thành vẫn đang tăng trưởng: Đào Viên, huyện Tân Trúc, Đài Trung và thành phố Tân Trúc. Và sự tăng trưởng của chúng hoàn toàn đến từ "tăng trưởng xã hội", tức là dân số từ nơi khác chuyển đến, dựa vào việc hút người từ các huyện thành khác về chứ không phải do tự sinh ra. Ngoại trừ bốn nơi này, dân số của 18 huyện thành còn lại đều giảm. Những nơi có mức giảm lớn nhất là Kim Môn, Liên Giang và Đài Bắc — lưu ý rằng ngay cả Đài Bắc phồn hoa nhất cũng nằm trong danh sách sụt giảm này. Khi mọi ngóc ngách trên toàn quốc, số ca sinh không bù đắp nổi số ca tử vong, thì bốn huyện thành đang lớn kia thực chất chỉ là đang đứng tạm thời trên sự sụt giảm của những người khác.

Đó là lý do tại sao tổng dân số giảm liên tiếp 23 tháng, rơi xuống mức 23.299.132 người. Đó là sự co lại đồng bộ của cả hòn đảo, mọi huyện thành đều đang thu nhỏ lại. Khác biệt duy nhất là có những nơi tạm thời cầm cự được nhờ di cư, còn có những nơi thậm chí không có được sự đệm đỡ này.

## Chân dung vẽ bằng dữ liệu

Quay lại đoạn đường lúc đầu. Từ quận Xinyi ở Đài Bắc đến Đài Đông, số người trên mỗi km² rơi từ 8.975 xuống còn 59, giống như đi xuyên qua hai quốc gia. Giờ đây bạn đã biết, đó không chỉ là sự chênh lệch về mật độ. Trên suốt hành trình đó, quy mô dân số biến từ người khổng lồ thành hạt bụi. Sự già hóa lại không đi theo mật độ: Đài Bắc nơi khởi đầu là nơi có tỷ lệ người cao tuổi cao nhất cả nước, còn Đài Đông nơi đến đích lại nằm ở mức trung bình trong cả hai cột dữ liệu. Điều duy nhất không đổi là, bất kể bạn dừng chân tại huyện thành nào, số ca tử vong tại địa phương đó đã vượt quá số ca sinh.

Đó chính là chân dung Đài Loan năm 2025: một khuôn mặt phân hóa cao độ và đang cùng nhau già đi. Sự chênh lệch bên trong lớn đến kinh ngạc: mật độ chênh 151 lần, quy mô chênh 297 lần, tỷ lệ người già so với trẻ em từ 1:1 đến gần 3:1; nhưng hoàn cảnh căn bản mà nó đối mặt lại thống nhất một cách kỳ lạ: cả đảo đang trong tình trạng sinh không bằng tử, tổng dân số giảm liên tiếp 23 tháng, và chỉ trong 7 năm đã lao từ xã hội già vào xã hội siêu già. Hội đồng Phát triển Kinh tế Quốc gia ước tính rằng, theo dự báo trung bình, đến năm 2070 tổng dân số Đài Loan sẽ còn lại 14,97 triệu người, tỷ lệ trên 65 tuổi sẽ đạt 46,5%; đến năm 2028, lợi tức dân số sẽ kết thúc. Chân dung này sẽ không tự tốt lên được. [^3]

Thừa nhận sự thiếu đồng nhất bên trong Đài Loan là để nhìn rõ vấn đề thực sự của hòn đảo này: một nơi có sự khác biệt nội bộ lớn như vậy phải dùng một hệ thống chính sách để vừa chăm sóc 4 triệu người đang chen chúc trong lòng chảo, vừa chăm sóc 13 nghìn người đang bám trụ trên các đảo xa; đồng thời phải đối mặt với cả huyện Tân Trúc trẻ nhất và Đài Bắc hay Gia Nghĩa có tỷ lệ người cao tuổi cao nhất. Nó phân hóa, nhưng nó phải hành động như một chỉnh thể; nó già đi, nhưng nó phải cùng nhau tìm cách. Dữ liệu đã vẽ ra khuôn mặt này cho chúng ta, việc tiếp theo là phản ứng thế nào với khuôn mặt đó, chính là câu hỏi mà cả hòn đảo này phải cùng nhau trả lời.

## Đọc thêm

- [Thành phố Đài Bắc](/vi/geography/taipei-city) — Thành phố đông đúc nhất (8.975 người/km²), cũng có tỷ lệ trên 65 tuổi cao nhất toàn Đài Loan (24,18%), là nhân vật chính trong cả hai bảng mật độ và già hóa của bài viết này.
- [Huyện Đài Đông](/vi/geography/taitung-county) — Đầu cực trống trải nhất (59 người/km²), với diện tích 3.515 km² đứng thứ ba toàn Đài Loan, bao gồm cả hai đảo xa Lục đảo (Green Island) và Lan屿 (Orchid Island).
- [Huyện Gia Nghĩa](/vi/geography/chiayi-county) — Chỉ số lão hóa cao nhất toàn Đài Loan là 291,69, mỗi một đứa trẻ tương ứng với gần ba người già, tỷ lệ trên 65 tuổi 24,11% cũng chỉ đứng sau Đài Bắc.
- [Huyện Tân Trúc](/vi/geography/hsinchu-county) — Tỷ lệ già hóa 15,08% trẻ nhất toàn Đài Loan, vùng lãnh thổ mà Khu khoa học Tân Trúc đã kéo cấu trúc dân số về phía trẻ trung.
- [Khủng hoảng tỷ lệ sinh thấp tại Đài Loan](/vi/society/taiwan-low-birth-rate-crisis) — Mặt đối lập của chân dung này: số trẻ sơ sinh rơi xuống dưới 110.000, mặt kia của tình trạng sinh không bằng tử trên toàn đảo.

## Nguồn ảnh

Bài viết sử dụng 3 hình ảnh, ảnh chính (hero) là ảnh vệ tinh thuộc phạm vi công cộng của NASA (được lưu tại `public/article-images/`), hai ảnh trong bài được cấp phép Creative Commons (Wikimedia Commons), tất cả đều được ghi rõ nguồn:

- [Ảnh vệ tinh đảo chính Đài Loan (NASA 2020 mosaic)](https://commons.wikimedia.org/wiki/File:Taiwan_Main_Island_Mosaic_NASA_2020.jpg) (hero) — NASA, Public domain.
- [Đường chân trời thành phố Đài Bắc](https://commons.wikimedia.org/wiki/File:20260204_Taipei,_Taiwan_Skyline.jpg) (đoạn đông đúc nhất) — Photo: Heeheemalu, 2026, CC BY-SA 4.0.
- [Đại lộ Bohlang tại Trì Thượng, Đài Đông](<https://commons.wikimedia.org/wiki/File:29-%E4%BC%AF%E6%9C%97%E5%A4%A7%E9%81%93_(28896712393).jpg>) (đoạn trống trải nhất) — Photo: Sinchen.Lin, 2016, CC BY 2.0.

## Tài liệu tham khảo

[^1]: Cục Hộ tịch Bộ Nội vụ, Dữ liệu thống kê dân số (cuối năm 114/2025-12-31, dân số các huyện thành, diện tích đất, mật độ dân số, tỷ lệ dân số trên 65 tuổi, chỉ số lão hóa). Tổng dân số 22 huyện thành là 23.299.132 hoàn toàn khớp với tổng số chính thức. https://www.ris.gov.tw/app/portal/346

[^2]: Trung ương Xã hội / Bộ Nội vụ, 〈Đài Loan chính thức bước vào xã hội siêu già〉, 2026-01-09. Báo cáo ghi nhận cuối năm 2025 tổng dân số là 23.299.132 người, tỷ lệ trên 65 tuổi chiếm 20,06% (4,67 triệu người), Đài Bắc cao nhất 24,18%, Tân Trúc thấp nhất 15,08%, trẻ sơ sinh năm 2025 là 107.812 người. https://www.cna.com.tw/news/ahel/202601090098.aspx

[^3]: Hội đồng Phát triển Kinh tế Quốc gia (NDC), 〈Dự báo dân số Trung Hoa Dân Quốc (2024–2070)〉, công bố ngày 17-10-2024. Theo dự báo trung bình, Đài Loan bước vào xã hội siêu già năm 2025, lợi tức dân số kết thúc vào năm 2028 (dân số trong độ tuổi lao động thấp hơn 2/3 tổng dân số), đến năm 2070 tổng dân số giảm xuống còn 14,97 triệu người, tỷ lệ trên 65 tuổi đạt 46,5%. https://www.ndc.gov.tw/nc_27_38548

[^4]: Bộ Nội vụ, Cải cách năm đô thị trực thuộc trung ương năm 2010 (Huyện Đài Bắc nâng cấp lên thành phố Tân Bắc, các huyện Đài Trung, Đài Nam, Cao Hùng sáp nhập, có hiệu lực từ 25-12-2010); Trung ương Xã hội, 〈Đào Viên cải cách thành đô thị trực thuộc trung ương, chính thức hoạt động vào ngày 25 tháng 12〉, 2014-12-15. https://www.cna.com.tw/news/firstnews/201412150027.aspx

[^5]: Bộ Nội vụ, 〈Đài Loan chính thức bước vào xã hội già〉 (tỷ lệ dân số trên 65 tuổi đạt 14,05%), 2018. https://www.moi.gov.tw/News_Content.aspx?n=2&s=11663
