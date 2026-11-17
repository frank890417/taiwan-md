---
title: 'NVIDIA tại Đài Loan: Công ty đắt giá nhất thế giới nhưng không tự sản xuất một con chip nào'
description: 'Tại Computex tháng 5 năm 2025, Jensen Huang trong chiếc áo khoác da đã khiến màn hình phía sau rực sáng logo của 55 nhà cung cấp Đài Loan — một công ty Mỹ đã công khai gọi tên toàn bộ ngành công nghiệp của hòn đảo này như chính cơ thể mình. Từ lá thư gửi Trương Trung Mưu năm 1996, đến việc vốn hóa thị trường vượt ngưỡng 5 nghìn tỷ USD và chính quyền thành phố Đài Bắc chi 4,434 tỷ Đài tệ để dọn dẹp mặt bằng cho hãng, NVIDIA đã đặt toàn bộ sự tồn tại của mình tại Đài Loan. Nhờ đó, Đài Loan nắm giữ công tắc không thể tắt của cả thế giới, nhưng biên lợi nhuận gộp chỉ đạt 5%, nguồn điện nước bị vắt kiệt và rủi ro chiến tranh lại đè nặng lên hòn đảo: Không thể tách rời không đồng nghĩa với việc Đài Loan có quyền quyết định.'
date: 2026-06-22
category: 'Technology'
tags:
  [
    'NVIDIA',
    'Huy Đạt',
    'Jensen Huang',
    'AI',
    'Bán dẫn',
    'TSMC',
    'Chuỗi cung ứng',
    'Lá chắn Silicon',
    'Trí tuệ nhân tạo',
    'Computex',
  ]
subcategory: '半導體與硬體'
author: 'Taiwan.md'
featured: true
lastVerified: 2026-06-22
lastHumanReview: false
researchReport: 'reports/research/2026-06/NVIDIA在台灣.md'
relatedDiary: ['2026-06-22-143854-nvidia-taiwan']
image: '/article-images/technology/computex-jensen-huang-2016.webp'
translatedFrom: 'Technology/NVIDIA在台灣.md'
sourceCommitSha: '1ec0df23b'
sourceContentHash: 'sha256:533b8db87f48f6de'
sourceBodyHash: 'sha256:8a6bcaa4a83cff70'
translatedAt: '2026-11-02T04:12:48.672585+00:00'
---

# NVIDIA tại Đài Loan: Công ty đắt giá nhất thế giới, nhưng không tự sản xuất một con chip nào

> **Tóm tắt trong 30 giây:** NVIDIA là công ty giá trị nhất hành tinh, với vốn hóa thị trường vượt mốc 5 nghìn tỷ USD vào ngày 29 tháng 10 năm 2025[^1]. Tuy nhiên, họ không sở hữu lấy một nhà máy đúc chip (wafer fab) nào; mọi con chip AI đều được sản xuất bởi TSMC, và mọi máy chủ AI đều được lắp ráp bởi Foxconn, Quanta hay Wistron — Đài Loan đảm nhận tới 90% thị phần gia công máy chủ AI toàn cầu[^2]. Sự phụ thuộc này sâu sắc đến mức NVIDIA đã trở thành khách hàng lớn nhất của TSMC (chiếm 19% doanh thu)[^3], và kiến trúc chip của họ thậm chí còn bị chi phối ngược lại bởi tỷ lệ thành phẩm đóng gói tại Đài Loan[^4]. Vấn đề nằm ở chỗ, nắm giữ huyết mạch của người khác và việc được chia phần lợi ích là hai chuyện hoàn toàn khác nhau: Trong khi biên lợi nhuận gộp của NVIDIA là 75%, thì các nhà sản xuất thiết kế gốc (ODM) Đài Loan chỉ nhận được từ 5% đến 8%[^5]. Bài viết này sẽ nói về cách mà mối quan hệ bất bình đẳng này đã hình thành nên thực trạng ngày nay.

![Jensen Huang đang phát biểu trên sân khấu Computex Taipei, mặc chiếc áo tối màu đặc trưng, phía sau là màn hình chiếu lớn, bên dưới khán đài chật kín người nghe](/article-images/technology/computex-jensen-huang-2016.webp)
_Jensen Huang phát biểu tại Computex Taipei năm 2016. Từ năm 2023, hầu như năm nào ông cũng quay trở lại triển lãm này để công bố các dòng chip AI mới nhất của NVIDIA, với bên dưới là toàn bộ chuỗi cung ứng Đài Loan — những người trực tiếp chế tạo ra các con chip đó. Ảnh: NVIDIA Taiwan, 2016._

Ngày 19 tháng 5 năm 2025, tại Nhà triển lãm Nangang, Đài Bắc. Jensen Huang trong chiếc áo khoác da thương hiệu của mình bước lên sân khấu chính của Computex. Phía sau ông, một bức tường logo khổng lồ rực sáng: Advantech, Accton, Delta Electronics, Gigabyte, Quanta, Wistron, Wiwynn, Foxconn, MediaTek, TSMC, UMC... từng cái một hiện ra, cuối cùng dừng lại ở biểu tượng của 55 công ty Đài Loan[^6]. Tính cả video cảm ơn tại hội trường, tổng cộng có tới 122 doanh nghiệp Đài Loan đã được xướng tên[^6].

Đó là lần đầu tiên người dân Đài Loan "nhìn thấy" toàn bộ ngành công nghiệp của mình được một công ty Mỹ điểm danh chỉ trong một lần.

Niềm tự hào là thật, nhưng bức tường đó vẫn tồn tại một vấn đề chưa được nói ra: Mỗi logo trên bức tường đều đang làm việc cho công ty Mỹ này, còn quyền lực thực sự lại nằm trong tay kẻ tạo ra bức tường, chứ không phải nằm trên bức tường.

<div
  class="video-embed"
  style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;margin:1.5rem 0;border-radius:8px;"
>
  <iframe
    src="https://www.youtube.com/embed/TLzna9__DnI"
    title="NVIDIA CEO Jensen Huang Keynote at COMPUTEX 2025（Video chính thức đầy đủ）"
    style="position:absolute;top:0;left:0;width:100%;height:100%;border:0;"
    loading="lazy"
    allowfullscreen
  ></iframe>
</div>

_Bản đầy đủ bài diễn thuyết chính tại COMPUTEX của Jensen Huang ngày 19 tháng 5 năm 2025 (kênh chính thức của NVIDIA). Chính tại buổi diễn thuyết này, bức tường logo của 55 nhà sản xuất Đài Loan đã được trình chiếu, đồng thời NVIDIA cũng tuyên bố sẽ đặt trụ sở hải ngoại tại Đài Bắc._

## Một công ty không sản xuất bất cứ thứ gì, lại trở thành công ty đắt giá nhất hành tinh

NVIDIA là minh chứng cho việc đưa mô hình "không nhà máy" (fabless) lên đến mức cực hạn. Công ty này thiết kế chip, nhưng không xây nhà máy, không mua máy quang khắc, cũng không sản xuất bất kỳ tấm wafer nào. Một đế chế có vốn hóa thị trường 5 nghìn tỷ USD nhưng lại không sở hữu lấy một nhà máy đúc chip (fab) nào đứng tên mình.

NVIDIA đã thuê ngoài toàn bộ quy trình sản xuất cho một hòn đảo ở phía bên kia Thái Bình Dương.

![Ảnh chụp hiển vi die của chip NVIDIA Ampere GA102, hiển thị cấu trúc mạch điện dày đặc](/article-images/technology/nvidia-ampere-ga102-die.webp)
_Ảnh hiển vi die của chip NVIDIA Ampere GA102, được sản xuất bởi quy trình 8nm của TSMC. NVIDIA thiết kế ra nó, nhưng mỗi đường mạch dày đặc trên đó đều được khắc ra từ các nhà máy tại Đài Loan. Photo: Fritzchens Fritz, CC0._

Những dòng chip mang lại lợi nhuận cao nhất (H200, Blackwell và sắp tới là Rubin) đều phụ thuộc hoàn toàn vào quy trình 3nm và 4nm của TSMC[^7]. Trong báo cáo thường niên gửi Ủy ban Chứng khoán và Giao dịch Hoa Kỳ (SEC), NVIDIA đã thừa nhận sự tập trung này bằng văn bản rõ ràng: chuỗi cung ứng của công ty chủ yếu tập trung tại khu vực Châu Á - Thái Bình Dương, sử dụng các nhà máy đúc chip như TSMC để sản xuất các tấm wafer bán dẫn[^8]. Đoạn văn này nằm trong tài liệu pháp lý mà công ty gửi cho SEC. Nói cách khác, chính NVIDIA đã tự liệt kê Đài Loan là nguồn rủi ro địa chính trị lớn nhất của mình.

Sản xuất xong chip vẫn là chưa đủ. Để một GPU trở thành thiết bị có khả năng tính toán, nó phải trải qua quy trình đóng gói tiên tiến trước khi được lắp đặt vào máy chủ. Công nghệ đóng gói CoWoS của TSMC hiện đang là nút thắt cổ chai của toàn cầu, và chỉ riêng NVIDIA đã chiếm khoảng 60% công suất CoWoS (theo ước tính của truyền thông Đài Loan con số này còn cao hơn, lên tới 70%)[^9]. Sau khi đóng gói, các chip này được chuyển cho các nhà sản xuất Đài Loan để lắp ráp: hệ thống tủ rack GB200 NVL72 do Ingrasys của Foxconn thực hiện, với Yushan Securities ước tính thị phần của đơn vị này trong mảng lắp ráp giá đỡ (rack) AI chiếm hơn 40%[^10]; Quanta sản xuất máy chủ đám mây, chiếm hơn một nửa thị phần trong top 50 trung tâm dữ liệu lớn nhất thế giới[^11]; và nhà máy AI mới của Wistron tại Trúc Bắc đã được lấp đầy hoàn toàn bởi các đơn hàng từ NVIDIA[^12].

```tw-stat
75.0% | Biên lợi nhuận gộp cả năm FY2025 của NVIDIA | Báo cáo thường niên SEC
19% | Tỷ trọng doanh thu của NVIDIA trong tổng doanh thu TSMC năm 2025 | Đã vượt qua Apple để trở thành khách hàng lớn nhất
~90% | Đài Loan chiếm thị phần gia công máy chủ AI toàn cầu | Nếu tính cả các nhà cung cấp thương hiệu Mỹ thì là 100%
~60% | Tỷ trọng của NVIDIA trong công suất đóng gói CoWoS của TSMC | Truyền thông Đài Loan ước tính đạt 70%
Nguồn: Báo cáo SEC 10-K của NVIDIA, TrendForce, MIC (Institute for Information Industry), Bộ Kinh tế
```

Đài Loan chiếm tới 90% thị phần gia công máy chủ AI toàn cầu; nếu tính cả các nhà cung cấp cho thương hiệu Mỹ, con số này là 100%[^2]. Điều này có nghĩa là, hầu như mọi cỗ máy vật lý thực hiện tính toán AI trên hành tinh này đều đã đi qua bàn tay của người Đài Loan.

Khi chồng xếp những con số này lên nhau, mâu thuẫn cốt lõi sẽ lộ diện: **Công ty giá trị nhất thế giới lại không sản xuất bất cứ thứ gì, bởi vì toàn bộ "thân xác" của nó đang được ký gửi tại Đài Loan**. Đài Loan chính là chiếc công tắc mà NVIDIA không thể tắt đi.

Tuy nhiên, việc nắm giữ huyết mạch của một người và việc được chia phần lợi nhuận từ người đó là hai chuyện hoàn toàn khác nhau. Bức tường tiếp theo sẽ ẩn sau mặt lưng của 55 logo kia.

## Phía sau bức tường logo là đáy của đường cong nụ cười

Trong ngành sản xuất có một khái niệm "đường cong nụ cười" (smile curve) đã quá quen thuộc: hai đầu cao, ở giữa thấp. Hai đầu nắm giữ thương hiệu, thiết kế và công nghệ sẽ có lợi nhuận dồi dào, trong khi phân đoạn chịu trách nhiệm "lắp ráp và sản xuất" ở giữa lại có biên lợi nhuận mỏng nhất. Vị thế của các doanh nghiệp Đài Loan hiện nay chính là nằm ở phân đoạn giữa đó.

Biên lợi nhuận gộp cả năm tài chính (FY2025) của NVIDIA là 75,0%, đây là con số mà công ty đã báo cáo với SEC[^5]. Trong cùng khoảng thời gian đó, biên lợi nhuận gộp của các doanh nghiệp Đài Loan chuyên lắp ráp máy chủ cho họ như sau: Foxconn 6,18%, Quanta 4,78% (mức thấp nhất trong gần 15 quý), Wistron 5,21%, và Wiwynn 7,2%[^13]. Lợi nhuận gộp của NVIDIA cao gấp khoảng 12 lần Foxconn và 16 lần Quarta.

```tw-bars
Ai đang nắm giữ lợi nhuận: Biên lợi nhuận gộp của chuỗi cung ứng AI (%)
*NVIDIA | 75.0 | Thiết kế, thương hiệu, hệ sinh thái CUDA
Delta Electronics | 37.0 | Nguồn điện, tản nhiệt (phân đoạn công nghệ)
Unimicron | 21.3 | Đế chip ABF (phân đoạn công nghệ)
Wiwynn | 7.2 | Lắp ráp máy chủ
Foxconn | 6.18 | Lắp ráp hệ thống tủ rack
Wistron | 5.21 | Lắp ráp máy chủ
Quanta | 4.78 | Lắp ráp máy chủ đám mây
Nguồn: NVIDIA SEC 10-K, báo cáo kết quả kinh doanh của các công ty (quý FY2025–FY2026)
```

Bức đồ thị này ẩn chứa một sự thật trái với trực giác: Vẫn là các doanh nghiệp Đài Loan, nhưng càng gần với việc "lắp ráp" thuần túy thì biên lợi nhuận càng mỏng; ngược lại, càng gần với "công nghệ" thì biên lợi nhuận lại càng cao. Delta Electronics làm về nguồn điện và tản nhiệt đạt 37%, trong khi Unimicron làm về đế chip ABF ước tính đạt 21,3%[^14]. Sự khác biệt không nằm ở việc "có phải công ty Đài Loan hay không", mà nằm ở chỗ "bạn đang đứng ở phân đoạn nào của đường cong". Ở phân đoạn lắp ráp, ai làm cũng đều mỏng như nhau.

> 📝 **Ghi chú của biên tập viên**: Morgan Stanley vào tháng 5 năm 2026 đã tính toán một con số còn khắc nghiệt hơn — giá trị gia tăng từ việc lắp ráp ở cấp độ hệ thống máy chủ của các nhà sản xuất ODM đã giảm từ 2,7% ở thế hệ tủ rack GB300 trước đó xuống còn 1,9% ở thế hệ VR200 tiếp theo[^15]. Điều này có nghĩa là mỗi khi NVIDIA tung ra một loại chip mới mạnh mẽ hơn, các doanh nghiệp Đài Loan phải bỏ ra vốn lớn hơn nhưng tỷ suất lợi nhuận lại thấp hơn. Chuỗi cung ứng này càng tiến về phía trước, phân đoạn đáy của đường cong càng bị ép chặt hơn. Logo trên tường trông rất vẻ vang, nhưng lợi nhuận gộp ở đáy đường cong lại rất mỏng manh; hai điều này có thể cùng tồn tại song song.

Sự tự hào và cái giá phải trả đang giằng xé trên cùng một chuỗi cung ứng. Nhờ sự bùng nổ của AI, thị trường chứng khoán Đài Loan đã giúp tốc độ tăng trưởng kinh tế Đài Loan năm 2025 đạt khoảng 7,37%, mức nhanh nhất trong 15 năm qua và đứng trong nhóm dẫn đầu toàn cầu[^16]. Tuy nhiên, học giả nghiên cứu kinh tế Đài Loan Giang Mân Hoa (Jiang Min-hua) đã chỉ ra một con số lạnh lùng: đa số người dân Đài Loan không cảm nhận được lợi ích từ nền kinh tế thịnh vượng này[^16]. 10% nhóm thu nhập cao nhất chiếm tới 48% tổng thu nhập của toàn Đài Loan, trong khi 50% nhóm dưới cùng chỉ nhận được 12%[^16]. Tính ra, thu nhập bình quân của nhóm 10% dẫn đầu gấp 20 lần so với nhóm 50% cuối cùng.

Một bài viết trên tờ The Reporter vào tháng 6 năm 2026 đã mô tả sự phân hóa hình chữ K này một cách cụ thể hơn: "Số lượng lao động trực tiếp trong chuỗi tăng trưởng chính gồm AI, bán dẫn và linh kiện điện tử chiếm chưa đến 10% tổng số lao động"[^17]. Một người làm việc trong ngành dịch vụ ăn uống với tổng lương hàng tháng là 38.484 Đài đô la (NT$), chỉ bằng 34,6% so với người làm trong ngành sản xuất linh kiện điện tử[^17]. Lợi nhuận từ AI là có thật, nhưng nó tập trung vào tay các nhà tư bản và một số ít kỹ sư, còn đa số mọi người chỉ đứng ngoài sóng cuộn để quan sát.

Đây chính là tầng nghĩa đầu tiên của câu nói "không thể tách rời, nhưng không có nghĩa là có quyền quyết định": Đài Loan nắm giữ công tắc, nhưng phần được chia lại chỉ là 5% đó.

## Đài Loan từng nâng đỡ, cũng từng suýt làm sụp đổ NVIDIA

Để hiểu được mối quan hệ bất đối xứng này bắt đầu từ đâu, phải quay ngược về cuối thập niên 1990, thời điểm NVIDIA vẫn đang chạy đua với cái chết.

NVIDIA được thành lập vào năm 1993 và đã nhiều lần đứng bên bờ vực phá sản trong những năm đầu. Khi tung ra chip đồ họa RIVA 128 vào tháng 8 năm 1997, tài khoản của công ty "chỉ còn đủ trả lương cho một tháng" [^18]. Trong suốt thời gian đó, Jensen Huang (Hoàng Nhân Huân) luôn bắt đầu mỗi buổi họp công ty hàng tháng bằng cùng một câu châm ngôn tiếng Anh: Công ty chúng ta chỉ còn cách bờ vực phá sản đúng 30 ngày [^18]. Câu nói này sau đó đã trở thành đức tin nội bộ của NVIDIA, nhưng nó chưa bao giờ được nói bằng tiếng Trung.

Thứ thực sự kéo NVIDIA ra khỏi cuộc khủng hoảng năm đó là khoản tiền 5 triệu USD từ SEGA, chứ không phải Đài Loan [^19]. Điểm này cần phải làm rõ ngay từ đầu, bởi vì cách nói "Đài Loan đã cứu NVIDIA" thường được lãng mạn hóa quá mức.

Vai trò của Đài Loan lại là một câu chuyện khác: mạch máu của sản xuất. Khoảng năm 1996, Jensen Huang khi đó 32 tuổi đã viết một lá thư gửi cho người sáng lập TSMC là Morris Chang (Trương Trung Mưu), hỏi liệu TSMC có thể gia công sản xuất chip cho NVIDIA hay không [^20]. Sau này, vào năm 2025, bà Mi Yu-chieh (Mễ Ngọc Kiệt) của TSMC hồi tưởng rằng, sự "hợp tác sâu sắc bắt đầu từ khoảnh khắc then chốt là năm 1997", chính là khi "ông Morris Chang đã đích thân liên lạc với người sáng lập NVIDIA Jensen Huang để đáp ứng yêu cầu về dịch vụ gia công của NVIDIA" [^21]. Năm 1998, hai bên chính thức ký kết hợp đồng, đưa TSMC trở thành nhà máy đúc chip (foundry) chính của NVIDIA [^20]. Mô hình phân công "thiết kế tại Thung lũng Silicon, sản xuất dựa vào TSMC" kể từ đó đã gắn chặt thực thể vật chất của NVIDIA vào hòn đảo này.

> 💡 **Bạn có biết**: Có một phiên bản được lưu truyền rằng khi Jensen Huang nhận được điện thoại từ Morris Chang, ông đã phấn khích hét lên với những người xung quanh rằng hãy im lặng đi vì chính Morris Chang đang gọi tới [^22]. Hình ảnh này là lời kể gián tiếp, giọng điệu chưa chắc đã chính xác tuyệt đối, nhưng nó đã nắm bắt được một sự thật: Một công ty nhỏ sắp phá sản năm đó đã coi cuộc điện thoại từ TSMC như một sợi dây cứu sinh.

Chỉ có điều, sợi dây này cũng suýt chút nữa trở thành thòng lọng: Năm 1998, một lỗi trong quy trình hóa học của TSMC đã khiến một lô lớn chip của NVIDIA bị hỏng, suýt chút nữa lại kéo sụp công ty này một lần nữa [^23]. Vì vậy, cách nói trung thực hơn là: Đài Loan không phải là "vị cứu tinh khỏi phá sản" của NVIDIA, mà Đài Loan là "mạch máu sản xuất" của nó — và mạch máu này gắn kết hai chiều, Đài Loan đã từng nâng đỡ nó, nhưng cũng từng suýt làm nó sụp đổ. Sự cộng sinh chưa bao giờ là một ơn huệ một chiều.

Câu chuyện tiếp theo thì mọi người đã quen thuộc hơn. Năm 2006, NVIDIA tung ra CUDA, lúc đó hầu như tất cả mọi người đều cho rằng đây là một quyết định điên rồ. Năm 2012, nghiên cứu sinh Alex Krizhevsky đã sử dụng hai card đồ họa NVIDIA GTX 580 trong phòng ngủ tại nhà cha mẹ mình để huấn luyện AlexNet, giúp giảm tỷ lệ lỗi nhận diện hình ảnh của ImageNet từ 26% xuống còn 15,3% [^24]. Khoảnh khắc này đã chứng minh rằng GPU chính là động cơ của học sâu (deep learning). Năm 2022, ChatGPT đã kích nổ cơn khát năng lực tính toán trên toàn thế giới, và giá trị vốn hóa của NVIDIA kể từ đó đã lao vút lên như một tên lửa.

```tw-timeline
1993 | NVIDIA thành lập tại Thung lũng Silicon | Jensen Huang cùng hai người khác làm chip đồ họa
1996 | Jensen Huang viết thư cho Morris Chang | Xin TSMC gia công, 1998 chính thức ký hợp đồng, gắn kết sản xuất với Đài Loan
2006 | Ra mắt CUDA | Biến GPU thành nền tảng tính toán đa năng, lúc đó bị coi là quyết định điên rồ
2012 | AlexNet huấn luyện bằng hai card GTX 580 | Chứng minh GPU = động cơ học sâu
2022 | ChatGPT ra đời | Nhu cầu tính toán toàn cầu bùng nổ, vốn hóa NVIDIA cất cánh
2025 | Vốn hóa vượt 5 nghìn tỷ USD | Công ty đầu tiên trong lịch sử, cùng năm tuyên bố lập trụ sở hải ngoại tại Đài Loan
Nguồn: 《The Nvidia Way》, Acquired podcast, Wikipedia, CNBC
```

Từ một công ty nhỏ chỉ còn cách ngày phá sản 30 ngày đến công ty 5 nghìn tỷ USD đầu tiên trong lịch sử — mỗi một con chip trong hành trình đó đều được chế tạo tại Đài Loan.

![Jensen Huang cầm GPU RTX Blackwell trong bài diễn thuyết chủ đề tại CES 2025](/article-images/technology/jensen-huang-ces-2025-blackwell.webp)
_Jensen Huang giơ cao thế hệ GPU Blackwell mới tại CES 2025. Từ một nhà sáng lập mỗi tháng họp đều phải nói "chúng ta chỉ còn cách phá sản 30 ngày", đến việc cầm trên tay con chip mà cả thế giới đang tranh giành — và nó vẫn phải được chế tạo tại Đài Loan mới có thể hoàn thành. Photo: Pronoia, CC0._

## Sự "không thể thay thế" có thời hạn hay không?

Điều này dẫn đến một vấn đề cần phải đối mặt một cách trung thực: Sự "không thể thay thế" này của Đài Loan là vĩnh viễn, hay nó có một ranh giới về thời gian?

Xét trong ngắn hạn, ranh giới này cứng đến mức gần như không có kẽ hở: Trong những năm từ 2025 đến 2027, các dòng GPU AI tiên tiến nhất của NVIDIA, từ khâu sản xuất đến đóng gói cuối cùng, đều phụ thuộc 100% vào dây chuyền CoWoS-L của TSMC tại Đài Loan[^25]. TSMC nắm giữ khoảng 90% đến 92% quy trình sản xuất tiên tiến dưới 5nm trên toàn thế giới, và năng lực đóng gói tiên tiến của họ lớn hơn tổng năng lực của tất cả các đối thủ cộng lại[^26]. Nghiên cứu của Giáo sư Chou Yuntsai (Đại học Khoa học Kỹ thuật Quốc gia Đài Loan) đã chỉ ra rất rõ ràng: Trong ngắn hạn, việc phân tán hoạt động gia công của TSMC là điều không khả thi, bởi để xây dựng một nhà máy đúc chip tiên tiến mới sẽ phải mất từ ba đến bốn năm và tiêu tốn hơn 10 tỷ USD[^27].

Bằng chứng kỹ thuật mạnh mẽ nhất không nằm trong bất kỳ báo cáo nào, mà nằm ngay trong thiết kế sản phẩm của chính NVIDIA. Thế hệ Rubin Ultra tiếp theo vốn được hoạch định sử dụng đóng gói "bốn chip" (four-die), nhưng TrendForce vào tháng 4 năm 2026 đã chỉ ra rằng việc sử dụng bốn chip sẽ khiến diện tích đóng gói phình to gấp 7,5 đến 8 lần giới hạn của mặt nạ quang học (reticle limit), "gây ảnh hưởng nghiêm trọng đến tỷ lệ thành phẩm và chi phí", do đó thiết kế "hiện đang chuyển hướng sang cấu trúc hai chip" (dual-die)[^4]. Câu nói này cần được đọc kỹ: Chính giới hạn vật lý về tỷ lệ thành phẩm đóng gói tại Đài Loan đã ngược lại quyết định hình dáng chip của NVIDIA phải như thế nào. Ngay cả công ty thiết kế chip mạnh nhất thế giới cũng phải xoay quanh tỷ lệ thành phẩm của Đài Loan để sửa đổi thiết kế; đây đã là một điểm nghẽn ở cấp độ vật lý, cứng nhắc đến mức không có không gian để thương lượng.

Tuy nhiên, "ranh giới cứng trong ngắn hạn" không đồng nghĩa với "mãi mãi". Đài Loan đã từng có những bài học xương máu trong quá khứ.

Năm 2002, Đài Loan thúc đẩy chính sách công nghiệp "Hai ngôi sao hai nghìn tỷ", trong đó ngành màn hình và DRAM (bộ nhớ) cũng từng được coi là huyết mạch bảo vệ quốc gia không thể thay thế. Kết quả là gì? Do thiếu hụt công nghệ cốt lõi, mức đầu tư cho nghiên cứu và phát triển (R&D) chỉ đạt 6%, thấp hơn nhiều so với mức 10% đến 21% của Hàn Quốc, Nhật Bản, Mỹ và châu Âu, khiến hai ngành này dần bị Hàn Quốc và Trung Quốc thâu tóm. Một bài hồi tưởng sau này của tờ United Daily News đã viết rất đau lòng: "Các nhà máy màn hình và các nhà máy bộ nhớ bán dẫn từng lừng lẫy một thời, vài năm sau do thị trường quốc tế cung vượt quá cầu, dẫn đến thua lỗ nặng nề cho các doanh nghiệp, bị cư dân mạng chế giễu là 'Mao San Dao Si' (Mao Tam Đạo Sĩ - cách chơi chữ của cụm từ Mao San Dao Si, ám chỉ biên lợi nhuận gộp chỉ đạt 3-4%), khiến 'ngành công nghiệp hai nghìn tỷ' trở thành 'ngành công nghiệp đau thương hai nghìn tỷ'."[^28]

> ⚠️ **Điểm khác biệt lần này so với màn hình và DRAM là gì**: Ngành màn hình và DRAM năm đó bị thâu tóm vì Đài Loan không nắm giữ được công nghệ cốt lõi, khiến bất kỳ ai cũng có thể theo kịp. Hào nước ngăn cách của AI lần này trông có vẻ sâu hơn nhiều — TSMC thực sự nắm giữ IP quy trình sản xuất, tỷ lệ thành phẩm đóng gói CoWoS và tính gắn kết của toàn bộ hệ sinh thái không phải là thứ có thể sao chép chỉ bằng việc đổ tiền trong ba đến năm năm. Tuy nhiên, đây không phải là lý do để Đài Loan có thể kê cao gối ngủ ngon. SMIC đã tuyên bố sản xuất hàng loạt quy trình 5nm, mặc dù tỷ lệ thành phẩm chỉ bằng một phần ba TSMC và chi phí đắt hơn 50%, chậm khoảng năm năm[^29]. Nhưng năm năm trong ngành công nghệ không phải là vĩnh viễn. Việc coi "sự phụ thuộc sâu sắc" là "sự an toàn vĩnh viễn" chính là sai lầm mà những người vào năm 2002 đã mắc phải.

Sau năm 2028, những vết nứt bắt đầu xuất hiện. Vào tháng 12 năm 2025, NVIDIA rót khoảng 5 tỷ USD để mua cổ phần của Intel, mục đích thực sự là "đảm bảo quyền ưu tiên tiếp cận năng lực đóng gói tiên tiến của Intel tại Hoa Kỳ", dự kiến sẽ sử dụng cho kiến trúc Feynman vào năm 2028[^30]. Nhà máy đóng gói AP1 của TSMC tại Arizona dự kiến sẽ sản xuất hàng loạt vào năm 2028[^31]. Công nghệ PiFO do Powertech (Lực Thành) của Đài Loan phát triển nhằm đối trọng với CoWoS-L, có chi phí sản xuất thấp hơn khoảng 30%, và đã có "nhiều nhà sản xuất chip AI của Hoa Kỳ" đang tranh nhau tìm đến hợp tác[^32]. Đây đều là những sự lung lay thực tế, chỉ là hiện tại chúng vẫn chưa tiến vào chuỗi cung ứng chủ lực cho các dòng GPU tiên tiến nhất của NVIDIA.

Có một con số thể hiện rõ nhất sự tinh vi của tình hình hiện tại: TrendForce dự báo khoảng cách cung - cầu của CoWoS sẽ thu hẹp từ mức khoảng 20% hiện nay xuống còn khoảng 10% vào cuối năm 2026[^33]. Tuy nhiên, cách thức thu hẹp khoảng cách này là do chính TSMC tự mở rộng sản xuất, chứ không phải do các nhà cung cấp thay thế nhảy vào lấp đầy[^33]. Nói cách khác, tính đến thời điểm hiện tại, nút thắt này vẫn chỉ có mình Đài Loan mới có thể giải quyết.

Sự "không thể thay thế" là một thực tế kỹ thuật, nhưng nó có một ranh giới cứng nằm ở khoảng năm 2028. Những quân bài của Đài Loan đều có hạn sử dụng.

## 44,34 tỷ: Một thành phố dọn đường cho một công ty nghìn tỷ chiếm lĩnh mảnh đất

Nếu nói biên lợi nhuận gộp là cán cân quyền lực trừu tượng, thì sự việc xảy ra tại Khu Công nghệ Bắc Sĩ Kho (Beishi Science Park) ở quận Bắc Đầu, Đài Bắc vào nửa cuối năm 2025 chính là lát cắt sắc bén nhất của cán cân đó.

Mọi chuyện phải bắt đầu từ năm 2021: Khi đó, chính quyền thành phố Đài Bắc đã đấu giá quyền sử dụng đất có thời hạn 50 năm cho hai lô đất T17 và T18 tại Bắc Sĩ Kho (tổng diện tích 3,89 ha), và Shin Kong Life (Tân Quang Nhân Thọ) là đơn vị duy nhất tham gia đấu thầu với mức giá 4,4 tỷ NT$[^34]. Trong ba năm sau đó, mảnh đất này bị bỏ trống, cỏ dại mọc um tùm.

Tháng 5 năm 2025, tại Computex, Jensen Huang đã tuyên bố NVIDIA đang có ý định đặt trụ sở chính ở nước ngoài mang tên "Constellation" tại Bắc Sĩ Kho[^35]. Tuy nhiên, vấn đề nảy sinh: quyền sử dụng đất vẫn nằm trong tay Shin Kong Life, mà quyền sử dụng đất công không thể chuyển nhượng trực tiếp. Ba bên gồm NVIDIA, Shin Kong Life và chính quyền thành phố Đài Bắc đã rơi vào bế tắc về mảnh đất này suốt năm tháng[^36].

Giải pháp cuối cùng là chính quyền thành phố Đài Bắc phải bỏ tiền để mời Shin Kong Life rút lui. Ngày 12 tháng 11 năm 2025, Hội đồng thành phố Đài Bắc đã thông qua không có ý kiến phản đối khoản tiền bồi thường chấm dứt hợp đồng trị giá 4,434 tỷ NT$, do chính quyền thành phố chi trả cho Shin Kong Life để thu hồi đất[^37]. Con số cụ thể là: 4.434.064.085 Đài tệ[^37].

```tw-figure
NT$4,434,064,085
Khoản tiền bồi thường chấm dứt hợp đồng mà chính quyền thành phố Đài Bắc trả cho Shin Kong Life nhằm thu hồi mảnh đất tại Bắc Sĩ Kho để bàn giao cho NVIDIA (đã được Hội đồng thông qua ngày 12/11/2025)
Hội đồng thành phố Đài Bắc, CNA, Eslite News
```

Tờ hóa đơn chấm dứt hợp đồng do Shin Kong Life gửi đến đã gây chấn động tại Hội đồng. Khi nhận được bản hóa đơn đó, nghị sĩ đảng Quốc dân Du Thục Huệ (You Shu-hui) đã viết: "Khi nhìn thấy trong 8 trang hóa đơn của Shin Kong Life, ngay cả các chi phí như nhổ cỏ, bảo trì môi trường, điều chỉnh logo, phí đại lý... đều yêu cầu chính quyền thành phố Đài Bắc phải hoàn trả, tôi chỉ muốn cười khổ. Bảo trì môi trường chẳng phải là việc mà người thuê đất vốn dĩ phải làm sao? Ngay cả chi phí điều chỉnh logo sau khi sáp nhập giữa Taishin và Shin Kong cũng bắt thành phố Đài Bắc trả? Thật là ngất ngây... Haizz, ba tiếng thở dài bất lực."[^38] Tuy nhiên, cuối cùng bà vẫn bỏ phiếu tán thành và bổ sung một câu nói đại diện cho bầu không khí tại hiện trường: "Hóa đơn của Shin Kong Life thật khó hiểu, nhưng phải đặt đại cục lên trên hết"[^38].

Ngày hôm đó, tại Hội đồng đã xuất hiện một cảnh tượng hiếm thấy: các đảng Xanh, Lam và Bạch hiếm khi đạt được sự hòa hợp, thậm chí nhóm nghị sĩ Đảng Dân tiến còn hô vang "Ủng hộ NVIDIA, nhanh chóng ký kết hợp đồng"[^39]. Chỉ vì một mảnh đất và một công ty nước ngoài mà các đảng phái vốn thường xuyên đối đầu đã đồng thanh nhất trí.

> 📝 **Ghi chú của biên tập viên**: Đáng để dừng lại và quan sát cấu trúc quyền lực này. Để một công ty trị giá hàng nghìn tỷ USD có thể đặt chân đến, chính quyền thành phố và Hội đồng của một đô thị đã phải huy động ngân sách công, vượt qua ranh giới đảng phái và mọi khó khăn để dọn sạch mảnh đất đang bị người thuê trước chiếm giữ cho họ. NVIDIA không trực tiếp bỏ ra 4,434 tỷ NT$ này; số tiền này do những người đóng thuế tại Đài Bắc chi trả trước (trong đó bao gồm cả chi phí tự thân và các khoản thuế đã nộp của Shin Kong Life tổng cộng là 1,441 tỷ NT$, sau đó mới được tính gộp vào chi phí mà NVIDIA phải gánh chịu)[^40]. "Không thể thiếu, nhưng không có nghĩa là có quyền quyết định" đã trở thành một hình thái cụ thể nhất tại đây: Khi bạn quá cần một người ở lại, bạn sẽ phải trả thay họ cả những hóa đơn mà lẽ ra bạn không nên trả.

## Trụ sở chính là bảng hiệu, hay là gốc rễ đã cắm sâu

NVIDIA đã mang lại điều gì cho Đài Loan? Cần phải xem xét vấn đề này dưới hai khía cạnh khác nhau để tránh đánh giá sai lầm.

Khía cạnh thứ nhất là "bảng hiệu": Trụ sở Constellation mô phỏng theo hình dáng "phi thuyền" của trụ sở tại Hoa Kỳ, có sức chứa khoảng 4.000 người, dự kiến khởi công vào năm 2026 và chỉ đi vào hoạt động từ năm 2030 — tính đến thời điểm hiện tại, dự án này vẫn chưa được khởi công[^41]. Nếu chỉ nhìn vào khía cạnh này, việc nghi ngờ "liệu trụ sở chính có phải chỉ là một chiêu trò PR hay không" là điều hoàn toàn có cơ sở.

Khía cạnh thứ hai là "những gốc rễ đã cắm sâu từ lâu". NVIDIA không phải mới đến Đài Loan vào năm 2025. Công ty đã có văn phòng tại Neihu (Nội Hồ), Đài Bắc từ trước, với số lượng nhân viên hiện tại khoảng 1.800 người (đây là con số ước tính của truyền thông, không phải số liệu chính thức)[^42]. Vào năm 2021, công ty đã được Bộ Kinh tế phê duyệt "Dự án Trung tâm Nghiên cứu và Phát triển Đổi mới AI", với tổng vốn đầu tư 24,3 tỷ NT$, trong đó Chính phủ hỗ trợ 6,7 tỷ NT$, và dự kiến sẽ tuyển dụng thêm đội ngũ nghiên cứu phát triển gồm 1.000 người từ năm 2022 đến năm 2027[^43]. Vào tháng 11 năm 2025, công ty đã thành lập "Công ty Cổ phần NVIDIA Đài Loan Kinh điển" (Taiwan NVIDIA Classic Co., Ltd.), với vốn điều lệ tăng từ 1 tỷ lên 3,3 tỷ NT$ — đây là một pháp nhân độc lập, có thể tự chủ nộp thuế và nắm giữ tài sản[^44].

Vì vậy, sự thật về việc "đặt trụ sở chính" nằm ở giữa hai thái cực này: Việc cắm rễ nghiên cứu và phát triển thực chất là có thật, các công ty con có tư cách nộp thuế cũng đã được thành lập; nhưng tòa nhà trụ sở Constellation gây chú ý nhất hiện vẫn chỉ dừng lại trên bản thiết kế. Không thể chỉ nói một nửa sự thật của cả hai vấn đề này.

## Hòn đảo bị rút cạn bởi chuỗi cung ứng này

Đằng sau hào quang và những con số doanh thu, vẫn còn một hóa đơn khác mà mọi người dân sống trên hòn đảo này đều phải chi trả: điện, nước, không khí và cả những ngôi nhà không thể mua nổi.

![Ngoại quan nhà máy TSMC tại Đài Trung, mặt tiền tòa nhà màu xám có treo logo TSMC](/article-images/technology/tsmc-taichung-factory.webp)
_Nhà máy TSMC tại Đài Trung. "Thân xác" của mỗi thế hệ GPU từ NVIDIA đều được hình thành trong những nhà máy như thế này, và lượng điện nước mà các nhà máy này tiêu thụ chính là một hóa đơn khác mà hòn đảo đang phải gánh chịu. Photo: Briáxis F. Mendes, CC BY-SA 4.0._

Trước hết hãy nhìn vào điện năng. Năm 2023, TSMC đã tiêu thụ 24,775 tỷ kWh điện, chiếm 8,96% tổng lượng điện tiêu thụ của toàn Đài Loan[^45]. S&P Global dự báo đến năm 2030, lượng điện tiêu thụ của TSMC có thể đạt tới 23,7% toàn Đài Loan[^45]. Điều này có nghĩa là vào thời điểm đó, cứ bốn số điện tiêu thụ trên khắp Đài Loan thì có gần một số điện được công ty này sử dụng.

```tw-line
Tỷ lệ tiêu thụ điện của TSMC so với toàn Đài Loan: Một công ty rút đi gần 1/4 lượng điện của cả hòn đảo (%)
Năm | Tỷ lệ (%)
2023 | 8,96
2030 | 23,7
Nguồn: S&P Global, Báo cáo CSR của TSMC
```

Lượng phát thải carbon cũng sẽ tăng theo: Báo cáo "Bóng tối sau vinh quang chip" (Shadows after the Chip Glory) công bố vào tháng 4 năm 2025 của Greenpeace đã tính toán rằng lượng điện tiêu thụ cho sản xuất chip AI toàn cầu đã tăng vọt từ 218 GWh lên 984 GWh, với mức tăng hàng năm hơn 3,5 lần; riêng tại Đài Loan, lượng điện tiêu thụ đã tăng vọt lên 375,8 GWh, "chiếm tới 38% tổng lượng toàn cầu"[^46]. Do TSMC phụ thuộc nặng nề vào nhiên liệu hóa thạch, lượng phát thải carbon từ việc sản xuất chip AI của hãng này lên tới 185.700 tấn CO2 tương đương, khiến Greenpeace trực tiếp chỉ trích hãng đã "trở thành 'nhà vô địch phát thải carbon' trong sản xuất chip AI"[^46].

Còn về phía NVIDIA thì sao? Greenpeace xếp hạng công ty này ở mức F. Báo cáo viết rằng lượng phát thải trong chuỗi cung ứng của NVIDIA "đã gần như tăng gấp đôi trong ba năm qua, từ 3,51 triệu tấn vào năm 2022 vọt lên 6,91 triệu tấn vào năm 2024", và những gì họ đang làm "chỉ là chuyển giao lượng phát thải carbon và ô nhiễm từ chuỗi cung ứng sang các khu vực khác trên thế giới"[^46]. Nói cách khác, định giá và hào quang thuộc về NVIDIA, nhưng khí thải và ô nhiễm lại để lại trên bầu trời Đài Loan.

Vấn đề nước cũng tương tự: TSMC tiêu thụ hơn 200.000 tấn nước mỗi ngày; lượng nước 81.000 tấn do bốn nhà máy tái chế nước tại Đài Nam cung cấp mỗi ngày "gần như dành trọn cho TSMC"[^47]. Cái giá phải trả đổ lên các cánh đồng: Các vùng nông nghiệp ở Gia Nam đã hai lần phải ngừng tưới tiêu vào năm 2021 và 2023 để nhường nước cho ngành bán dẫn[^48]. Việc sản xuất một tấm wafer 12 inch cần tới 8.327 lít nước[^49], và trên hòn đảo này, đã từng có những người nông dân phải bỏ ruộng vì để dành nước cho việc làm chip.

Tiếp đến là nhà ở. Sau khi NVIDIA tuyên bố sẽ đặt trụ sở chính tại khu Bắc Sĩ Kho (Beishi Science Park), giá nhà ở khu vực đó đã bắt đầu biến động. Cục Phát triển Kinh tế Thành phố Đài Bắc ước tính dân số làm việc thường trú tại Bắc Sĩ Kho trong tương lai có thể đạt 60.000 người, nhưng theo thống kê của 591, lượng nhà ở có thể bán chỉ khoảng 1.476 căn (đất ở chỉ chiếm 13,8% toàn khu vực)[^50]. 60.000 người tranh giành 1.476 căn hộ, mức giá sẽ đi về đâu là điều có thể dự đoán được: Đã có báo cáo cho biết các giao dịch dự án mới tại khu vực lõi Bắc Sĩ Kho đã vượt mức 1,5 triệu Đài đô mỗi ping (khoảng 33 m²)[^51].

Cần phải phân biệt rõ hai việc này để tránh tính toán sai lệch sự lo âu. Theo dữ liệu đăng ký giá thực tế, giao dịch cao nhất của các tòa nhà chung cư tại quận Thạch Lâm vào năm 2025 là 570.400 Đài đô mỗi mét vuông, tương đương khoảng 1,88 triệu Đài đô mỗi ping (tại số 39 đường Cơ Hà, tổng giá trị 447 triệu Đài đô)[^52]. Tuy nhiên, những mức giá trên trời này thuộc về các biệt thự cao cấp ở Thiên Mẫu và khu vực trung tâm Thạch Lâm, là một câu chuyện khác với bản thân khu Bắc Sĩ Kho; còn con số dự án mới tại Bắc Sĩ Kho vượt 1,5 triệu Đài đô mỗi ping là một nhóm số liệu khác trong các báo cáo truyền thông. Hai con số này không nên bị đánh đồng. Nhưng dù là con số nào, chúng đều chỉ về cùng một cảm giác: Sự tăng trưởng đang diễn ra ngay trên con phố của tôi, nhưng tôi lại không thể mua nổi.

> ⚠️ **"Công ty còn chưa khởi công, dựa vào đâu mà giá lại tăng"**: Sự phản kháng của cư dân địa phương là rất thực tế. Có những nhà kinh doanh nói riêng rằng, do tiện ích sinh hoạt trong khu công nghiệp kém, "nhiều nhân viên không sẵn lòng chuyển đến đây... thậm chí sau khi chuyển đến, một phần ba nhân viên đã nghỉ việc vì lý do giao thông bất tiện"[^53]. Những ý kiến ẩn danh trên diễn đàn PTT còn thẳng thắn hơn: Trước đây người ta đã dùng quá nhiều chủ đề về TSMC rồi, giờ chẳng qua là đổi sang chủ đề NVIDIA mà thôi[^54]. Một trụ sở chính còn chưa khởi công đã đẩy giá nhà của người dân địa phương lên cao — đây chính là phiên bản gần gũi nhất với sự phân hóa hình chữ K ngay tại bàn ăn. Hy vọng vào sự trung thực: Việc AI giúp Đài Loan được thế giới chú ý là thật, nhưng việc điện nước bị rút cạn và những ngôi nhà không thể mua nổi cũng là sự thật, cả hai đều phải được ghi nhận.

## Không chỉ có Đài Loan là không thể tách rời

Khi nhìn rộng ra, chúng ta sẽ thấy một sự thật lớn lao hơn: trong mối quan hệ giữa NVIDIA và Đài Loan, sự "không thể tách rời" mang tính hai chiều, thậm chí là đa chiều. Ngay cả bên kia eo biển cũng đang bị kẹt trong cấu trúc này.

![Triển lãm Computex tại Nhà triển lãm Nangang, Đài Bắc, hai bên lối đi rộng lớn là các gian hàng của các nhà cung cấp thông tin và đám đông tập trung](/article-images/technology/computex-nangang-floor-2015.webp)
_Khu vực triển lãm Computex tại Nhà triển lãm Nangang, Đài Bắc. Mỗi tháng Sáu, các nhà mua hàng trên toàn thế giới đổ về hội trường này để tìm kiếm những sản phẩm từ chuỗi cung ứng của Đài Loan — và những thứ không thể thiếu ở đây chưa bao giờ chỉ có mình Đài Loan. Photo: NVIDIA Taiwan, CC BY 2.0._

Đây chính là khái niệm "Lá chắn Silicon" (Silicon Shield): Đài Loan nắm giữ những con chip mà cả thế giới đều cần, và chính tính chất không thể thay thế này đã trở thành một lớp bảo vệ. Tuy nhiên, Lá chắn Silicon luôn có hai mặt. Nó vừa là bùa hộ mệnh, vừa là kho thuốc súng buộc chặt lấy hòn đảo này. Giới học thuật gọi hai mặt này là "Lá chắn Silicon" (Silicon Shield) và "Bẫy Silicon" (Silicon Trap): cùng một mức độ tập trung quyền lực đó, có thể răn đe sự xâm lược, nhưng cũng có thể ngược lại trở thành động cơ cho sự xâm lược hoặc tạo ra điểm yếu chí tử (single point of failure)[^55].

Một cuộc tranh luận gay gắt hơn đã nổ ra vào năm 2021 từ một bài viết của Học viện Chiến tranh Lục quân Hoa Kỳ, đề xuất chiến lược cực đoan mang tên "vườn không nhà trống/phá hủy tổ" (scorched earth/nest destruction): nếu Trung Quốc tấn công Đài Loan, họ sẵn sàng tự hủy hoại ngành công nghiệp bán dẫn để đối phương không thể thu lợi gì. Nhưng những ý kiến phản đối cũng mạnh mẽ không kém: ngay cả khi việc này răn đe thành công Trung Quốc trong ngắn hạn, thì sự tự tổn thương về kinh tế này có lẽ cũng chỉ là trì hoãn cuộc xâm lược cho đến ngày Trung Quốc có thể tự sản xuất được bán dẫn; hơn nữa, bản thân người dân Đài Loan khó có thể cho rằng việc tự hủy hoại ngành công nghiệp như vậy là vì lợi ích của chính họ[^56]. Đây không phải là câu hỏi mà Đài Loan nên đưa ra phán quyết, nhưng nó luôn hiện hữu phía sau mọi cuộc thảo luận về việc "liệu Đài Loan có quân bài nào trong tay hay không".

Thậm chí, Lá chắn Silicon đang bị chính TSMC làm loãng đi. Để phân tán rủi ro địa chính trị, TSMC đã rót 165 tỷ USD vào việc mở rộng nhà máy tại Hoa Kỳ[^57]. Tiêu đề của tạp chí MIT Technology Review vào tháng 8 năm 2025 là "Lá chắn Silicon của Đài Loan có thể đang yếu dần"[^58]. Mối lo ngại nằm ở chỗ: việc dịch chuyển năng lực sản xuất ra nước ngoài sẽ làm loãng các quân bài chiến lược của Đài Loan tại bản địa, khiến các quốc gia như Hoa Kỳ cảm thấy Đài Loan không còn đáng để bảo vệ đến thế nữa[^58]. Tuy nhiên, Bonnie Glaser từ Quỹ Marshall (Đức) cũng nhắc nhở rằng hệ sinh thái này không dễ dàng di dời: hệ sinh thái mà Đài Loan tạo ra là độc nhất vô nhị, là kết quả của sự kết hợp giữa kho nhân tài, văn hóa và luật pháp Đài Loan, không thể dễ dàng sao chép ở bất kỳ nơi nào khác[^59]. Paul Triolo, một nhà nghiên cứu về công nghệ Trung Quốc, còn nói thẳng hơn — khi nói đến sản xuất tiên tiến nhất, Arizona vẫn còn kém xa mức đó, và sẽ mãi mãi không đạt tới được[^60].

Và điều minh chứng rõ nhất cho sự phụ thuộc bất đối xứng này chính là một khoảnh khắc chính trị.

Vào ngày 29 tháng 5 năm 2024, Jensen Huang (Hoàng Nhân Huân) đã công khai nói một câu tại Đài Loan: "Taiwan is one of the most important countries in the world." (Đài Loan là một trong những quốc gia quan trọng nhất thế giới)[^61]. Vài ngày sau đó, vào ngày 2 tháng 6, trong bài phát biểu tại Đại học Quốc gia Đài Loan, ông mô tả "Đài Loan là người hùng vô danh, nhưng lại là trụ cột của thế giới"[^62].

```tw-quote
Đài Loan là người hùng vô danh, nhưng lại là trụ cột của thế giới
Jensen Huang | CEO NVIDIA, bài phát biểu tại Computex, Đại học Quốc gia Đài Loan, 2024
```

Mười tám ngày sau, người phát ngôn Văn phòng Công tác Đài Loan và Hồng Kông của Trung Quốc, Trần Bân Hoa (Chen Bin-hua), đã đáp trả: "Đối với những phát ngôn cực kỳ sai lầm này, người dân và cư dân mạng đại lục đã bày tỏ sự bất mãn mạnh mẽ. Đài Loan chưa bao giờ là một quốc gia... hy vọng ông ta nên học lại bài vở cho kỹ."[^63]

Nhưng có một điều đáng suy ngẫm khác: Thông tấn xã Trung ương (CNA) lúc đó đã nhận thấy rằng, mặc dù các phương tiện truyền thông tài chính của Trung Quốc đưa tin rất nhiều về chuyến thăm Đài Loan của Jensen Huang, nhưng "không hề thấy nhắc đến việc ông tuyên bố 'Đài Loan là một quốc gia quan trọng', dường như đã bỏ qua vấn đề nhạy cảm vốn được coi là 'trọng điểm trong các trọng điểm' thường ngày"[^64]. Nói cách khác, chính quyền thì lên tiếng phản đối gay gắt, nhưng truyền thông tài chính lại chọn cách im lặng.

> 📝 **Ghi chú của biên tập viên**: Sự im lặng này đã tiết lộ vị thế thực sự của quyền lực. Trung Quốc cần chip của NVIDIA, vì vậy ngay cả khi Jensen Huang nói những lời mà Bắc Kinh không thể chấp nhận nhất, truyền thông đại lục vẫn chọn cách không đưa tin, không phóng đại, vì sợ làm tổn hại đến mối quan hệ với "giáo chủ AI" này. Có một câu nói lưu truyền rất rộng rãi — Trung Quốc cần NVIDIA, nhưng NVIDIA không cần Trung Quốc[^65]. Trong mối quan hệ này, ngay cả thị trường khổng lồ bên kia eo biển cũng đang bị kẹt cổ bởi chuỗi cung ứng của một công ty Hoa Kỳ ở một mức độ nào đó. Đây chính là vị thế kỳ lạ của hòn đảo Đài Loan: toàn thế giới, bao gồm cả bên muốn thay đổi vị thế của nó nhất, đều không thể tách rời những con chip được làm ra tại đây. Chỉ có điều, "thế giới không thể thiếu bạn" và "vì thế mà bạn an toàn, bạn có quyền quyết định" vẫn là hai chuyện hoàn toàn khác nhau. Tác giả không đưa ra kết luận chính trị thay cho Đài Loan, nhưng bản thân sự giằng co này xứng đáng để mỗi độc giả tự mình cân nhắc.

## Không thể tách rời, không đồng nghĩa với việc có quyền quyết định

Quay trở lại với bức tường logo của 55 công ty đó.

Mỗi cái tên trên bức tường đều là thật: họ chính là thực thể vật chất của cuộc cách mạng AI toàn cầu; nếu không có họ, một NVIDIA trị giá 5 nghìn tỷ USD cũng không thể giao ra nổi dù chỉ một con chip. Sự không thể thay thế này là một sự thật kỹ thuật, không phải là phép tu từ. Đài Loan hoàn toàn có lý do để tự hào về điều đó.

Tuy nhiên, nhìn lại cả hành trình này, hào quang, định giá và quyền quyết định lại nằm trong tay những người tạo ra bức tường đó; còn biên lợi nhuận gộp 5%, nguồn điện nước bị vắt kiệt, giá nhà bị đẩy lên cao đến mức không thể mua nổi, và rủi ro chiến tranh đang đè nặng lên hòn đảo này, lại thuộc về những cái tên trên bức tường. Đài Loan đang nắm giữ chiếc công tắc mà cả thế giới không thể tắt đi, nhưng điều đó không đồng nghĩa với việc có quyền quyết định. Hơn nữa, quân bài này còn có một "hạn sử dụng" được ghi vào khoảng năm 2028.

Không phải Đài Loan không hành động: Lại Thanh Đức (Lai Ching-te) đã đề xuất vào năm 2025 về việc đưa Đài Loan trở thành "trung tâm tính toán top 5 toàn cầu" và phát triển "AI chủ quyền" [^66]; Foxconn đang xây dựng một siêu máy tính quốc gia tại Cao Hùng sử dụng 10.000 chip Blackwell [^67]; "Mười đại công trình mới về AI" của Hành chính viện dự kiến đầu tư hơn 100 tỷ NT$, với mục tiêu đạt giá trị sản lượng 15 nghìn tỷ NT$ [^68]. Đây là tham vọng chuyển mình từ việc "gia công cho người khác" sang "tính toán cho chính mình": leo lên một bậc từ đáy của đường cong nụ cười.

Chỉ có điều con đường này còn rất xa: mô hình ngôn ngữ riêng của Đài Loan là TAIDE mới chỉ được ví như "học sinh trung học", trong khi các ông lớn quốc tế đã đạt trình độ "nghiên cứu sinh" [^69]. Chính phủ Hàn Quốc mua đứt một lúc 260.000 GPU, trong khi phía Đài Loan vẫn còn đang giằng co về một mảnh đất hay một khoản tiền bồi thường chấm dứt hợp đồng [^70]. Từ việc nhận được một cuộc điện thoại của Trương Trung Mưu (Morris Chang) cho đến việc tiếp nhận năng lực tính toán của cả thế giới, Đài Loan đã mất gần 30 năm để đứng được lên bức tường đó. Nhưng đứng trên bức tường và cầm lấy cây bút viết lên đó lại là hai chuyện hoàn toàn khác nhau.

Bức tường đó sẽ còn tiếp tục tỏa sáng: tại kỳ Computex tới, phía sau lưng Jensen Huang sẽ xuất hiện thêm nhiều logo hơn nữa. Năm 2026, ông tiết lộ rằng chi tiêu hàng năm của NVIDIA tại Đài Loan đã đạt khoảng 150 tỷ USD, trong khi 5 năm trước chỉ từ 10 đến 15 tỷ USD [^71]. Câu hỏi "Đài Loan có quan trọng không" vốn đã có câu trả lời từ lâu. Điều Đài Loan cần trả lời là một câu hỏi khó hơn: Khi cả thế giới không thể tách rời những gì bạn làm, làm thế nào để sự "không thể tách rời" đó dần trở thành quyền "quyết định".

Những cái tên trên tường ngày càng nhiều lên. Liệu người cầm bút có đổi thành chính mình hay không — cây bút này, Đài Loan mới chỉ vừa bắt đầu chạm tới.

---

**Đọc thêm**:

- [Jensen Huang: Từ cậu thiếu niên quét dọn đến "giáo chủ áo da" của đế chế 5 nghìn tỷ USD](/vi/people/jensen-huang) — Tiểu sử cá nhân của nhà sáng lập NVIDIA, bài viết này chỉ điểm qua, câu chuyện về quê hương Đài Nam và quá trình trưởng thành của ông nằm ở đây.
- [Ngành công nghiệp bán dẫn](/vi/technology/taiwan-semiconductor-industry) — Tại sao Đài Loan có thể trở thành trung tâm sản xuất chip toàn cầu, bối cảnh đầy đủ hơn về chuỗi cung ứng được thảo luận trong bài này.
- [Doanh nghiệp Đài Loan: TSMC](/vi/economy/tsmc) — "Ngọn núi bảo vệ quốc gia" chuyên sản xuất mọi con chip cho NVIDIA, và mặt trái khi nó bị vắt kiệt nguồn lực.
- [Trương Trung Mưu: Người nhận bức thư đó, và đế chế đúc chip mà ông đã tạo dựng](/vi/people/tsmc-morris-chang) — Người nhận được bức thư của Jensen Huang vào năm 1996, nhà sáng lập TSMC.
- [Computex: Triển lãm máy tính tại Đài Bắc, làm thế nào trở thành lễ khai mạc của AI toàn cầu](/vi/technology/computex) — Sân khấu nơi bức tường logo tỏa sáng, sân nhà thường niên của ngành công nghệ Đài Loan.
- [Ngành công nghiệp trí tuệ nhân tạo AI](/vi/technology/artificial-intelligence-industry) — Từ sản xuất chip NVIDIA đến xây dựng hệ sinh thái AI, vị thế của Đài Loan trong làn sóng AI.
- [Phát triển AI tại Đài Loan và chiến lược tương lai](/vi/technology/artificial-intelligence-development-strategy) — AI chủ quyền, TAIDE và tham vọng quốc gia của Đài Loan trong việc leo lên từ gia công.
- [Kể chuyện công nghệ Đài Loan: Chip 100 điểm, micro 60 điểm](/vi/technology/taiwan-tech-storytelling) — Hai cách nói về cùng một con chip: Giá trị thặng dư từ câu chuyện mà NVIDIA kiếm được, ngành công nghệ Đài Loan phải học hỏi như thế nào.
- [Doanh nghiệp Đài Loan: Foxconn](/vi/economy/foxconn-precision-industry) — Gã khổng lồ gia công lắp ráp 40% tủ rack AI toàn cầu, bàn tay lớn nhất nằm ở đáy đường cong nụ cười.

## Nguồn ảnh

- [Jensen Huang tại Computex Đài Bắc](https://commons.wikimedia.org/wiki/File:Jensen_Huang_at_Computex_Taipei_20160531c.jpg) — Ảnh: NVIDIA Đài Loan, 2016, CC BY 2.0 (ảnh chính, Jensen Huang phát biểu trên sân khấu Computex)
- [Chip die GPU NVIDIA Ampere GA102](<https://commons.wikimedia.org/wiki/File:Nvidia@8nm@Ampere@GA102@GeForce_RTX_3090@S_TW_2032A1_SNNB9W.000_GA102-300-A1_DSC06025-DSC06107_(50740715646).jpg>) — Ảnh: Fritzchens Fritz, CC0 (ảnh hiển vi chip die)
- [Jensen Huang cầm RTX Blackwell tại CES 2025](<https://commons.wikimedia.org/wiki/File:Jensen_Huang_-_RTX_Blackwell_-_Nvidia_Keynote_-_CES_2025_Las_Vegas_(3).jpg>) — Ảnh: Pronoia, CC0
- [Nhà máy TSMC tại Đài Trung](https://commons.wikimedia.org/wiki/File:TSMC_logo_on_Taichung_factory_building.jpg) — Ảnh: Briáxis F. Mendes (Mạnh Tất Tư), CC BY-SA 4.0
- [Computex Đài Bắc tại Trung tâm Triển lãm Nangang Đài Bắc](https://commons.wikimedia.org/wiki/File:Computex_Taipei_at_Taipei_Nangang_Exhibition_Center_20150602.jpg) — Ảnh: NVIDIA Đài Loan, 2015, CC BY 2.0
- Video: [Bài phát biểu chính của CEO NVIDIA Jensen Huang tại COMPUTEX 2025](https://www.youtube.com/watch?v=TLzna9__DnI) — Kênh YouTube chính thức của NVIDIA

## Tài liệu tham khảo

[^1]: [NVIDIA trở thành công ty đầu tiên đạt vốn hóa thị trường 5 nghìn tỷ USD](https://www.cnbc.com/2025/10/29/nvidia-5-trillion-market-cap.html) — CNBC đưa tin vào ngày 29 tháng 10 năm 2025, NVIDIA đã trở thành công ty đầu tiên trong lịch sử vượt mốc vốn hóa thị trường 5 nghìn tỷ USD, nhờ vào nhu cầu về năng lực tính toán AI.

[^2]: [Đài Loan chiếm 90% thị trường máy chủ AI toàn cầu](https://technews.tw/) — Theo dữ liệu từ Bộ Kinh tế và MIC (Trung tâm Nghiên cứu Công nghiệp), xuất xưởng ngành công nghiệp máy chủ của Đài Loan vốn chiếm hơn 80% toàn cầu, trong khi sản xuất và lắp ráp máy chủ AI hiện đã chiếm tới 90% thế giới; nếu tính cả các nhà cung cấp thương hiệu Mỹ thì con số này đạt 100%. Động lực thúc đẩy là do yêu cầu từ phía khách hàng Mỹ về việc sản xuất ngoài khu vực Trung Quốc.

[^3]: [TrendForce: NVIDIA trở thành khách hàng lớn nhất của TSMC](https://www.trendforce.com/) — Dữ liệu từ TrendForce ngày 1 tháng 6 năm 2026 cho thấy, đóng góp doanh thu của "Khách hàng A" (NVIDIA) cho TSMC đã tăng từ 12% năm 2024 lên 19% vào năm 2025, vượt qua Apple (từ 22% xuống 17%) để trở thành khách hàng lớn nhất. Nguồn trực tiếp: Báo cáo thường niên năm 2025 của TSMC (investor.tsmc.com).

[^4]: [TrendForce: Rubin Ultra chuyển sang cấu trúc chip đôi (dual-die)](https://www.trendforce.com/news/) — Phân tích từ TrendForce ngày 1 tháng 4 năm 2026 cho biết, việc đóng gói bốn chip sẽ khiến diện tích mở rộng gấp 7,5–8 lần giới hạn của mặt nạ quang học, "gây ảnh hưởng nghiêm trọng đến tỷ lệ thành phẩm và chi phí", do đó thiết kế đã chuyển hướng sang cấu trúc chip đôi. AI sẽ chiếm 36% công suất sản xuất tiến trình 3nm vào năm 2026, so với mức chỉ 5% vào năm 2025. Giới hạn vật lý của tỷ lệ thành phẩm đóng gói quyết định trực tiếp đến kiến trúc chip.

[^5]: [NVIDIA FY2025 10-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Báo cáo thường niên năm tài chính 2025 do NVIDIA nộp lên Ủy ban Chứng khoán và Giao dịch Hoa Kỳ (SEC), biên lợi nhuận gộp GAAP cả năm đạt 75,0% (so với 72,7% của năm tài chính 2024).

[^6]: [Tổng hợp bài phát biểu của Jensen Huang tại Computex 2025: Bức tường logo của 55 nhà sản xuất Đài Loan](https://money.udn.com/money/story/5612/8750451) — Gói tổng hợp từ Economic Daily News, liệt kê chi tiết tên 55 công ty Đài Loan được nhắc đến trên phông nền sân khấu Computex 2025 (bao gồm Advantech, Mirets, Delta Electronics... TSMC, UMC, Unimicron, Wistron, Wiwynn, Chung Tai), đồng thời báo cáo thêm rằng tổng cộng có 122 công ty nếu tính cả phông nền và video cảm ơn.

[^7]: [Sự phụ thuộc của NVIDIA vào tiến trình 3nm và 4nm của TSMC](https://www.ainvest.com/news/) — Phân tích ngành cho thấy các dòng chip mang lại lợi nhuận cao nhất của NVIDIA như H200, Blackwell và Rubin đều phụ thuộc hoàn toàn vào tiến trình 3nm và 4nm của TSMC, tạo thành nút thắt cổ chai trong cả sản xuất và đóng gói.

[^8]: [Tiết lộ về sự tập trung chuỗi cung ứng trong NVIDIA FY2025 10-K (SEC)](https://www.sec.gov/Archives/edgar/data/0001045810/000104581025000023/nvda-20250126.htm) — Nguyên văn báo cáo thường niên của NVIDIA: "Chuỗi cung ứng của chúng tôi chủ yếu tập trung tại khu vực Châu Á - Thái Bình Dương. Chúng tôi sử dụng các xưởng đúc, chẳng hạn như Taiwan Semiconductor Manufacturing Company Limited, hay TSMC... để sản xuất các tấm wafer bán dẫn của mình." Mục Các yếu tố rủi ro liệt kê sự tập trung về địa lý của nhà cung cấp, gia công wafer và đóng gói/kiểm thử là một rủi ro địa chính trị.

[^9]: [Công suất CoWoS của TSMC và tỷ trọng của NVIDIA](https://www.financialcontent.com/article/tokenring-2025-12-26-tsmc-boosts-cowos-capacity) — Theo dữ liệu từ FinancialContent và SiliconAnalysts, NVIDIA chiếm khoảng 60% công suất CoWoS của TSMC (SiliconAnalysts ước tính khoảng 595.000 tấm wafer), trong khi truyền thông Đài Loan cho rằng con số này đạt 70% vào năm 2025; ba khách hàng lớn nhất (NVIDIA, Broadcom, AMD) chiếm tổng cộng hơn 85%.

[^10]: [Foxconn chiếm hơn 40% thị phần lắp ráp tủ rack AI](https://vocus.cc/) — Eurasia Research ước tính Foxconn (Ingrasys) chịu trách nhiệm cho các mô-đun GPU, bo mạch chuyển mạch (Switch board), bo mạch tính toán (Compute board) và hệ thống tủ rack của GB200 NVL72, chiếm hơn 40% thị phần. Nhà máy tại Nam Ninh là nhà máy kiểu mẫu (lighthouse factory) về máy chủ AI đầu tiên trên thế giới được Diễn đàn Kinh tế Thế giới chứng nhận (tháng 12 năm 2023).

[^11]: [Quanta chiếm hơn một nửa thị phần trong top 50 trung tâm dữ liệu lớn nhất](https://www.artificialintelligence-news.com/news/ai-servers-transform-taiwan-manufacturing-giants/) — Báo cáo từ AI News cho biết Quanta (QCT) chịu trách nhiệm tích hợp L10 và L11, chiếm hơn 50% thị phần trong top 50 trung tâm dữ liệu đám mây lớn nhất thế giới, là nhà lắp ráp máy chủ lớn thứ hai toàn cầu.

[^12]: [Nhà máy AI mới của Wistron tại Trúc Bắc được lấp đầy bởi đơn hàng từ NVIDIA](https://vocus.cc/) — Báo cáo ngành cho biết Wistron chịu trách nhiệm cho HGX/DGX, và nhà máy mới thuộc khu công nghiệp AI tại Trúc Bắc của hãng "đã được lấp đầy hoàn toàn bởi các đơn hàng mạnh mẽ từ NVIDIA".

[^13]: [Dữ liệu từ các buổi họp báo về biên lợi nhuận máy chủ AI của các doanh nghiệp Đài Loan](https://www.cnyes.com/) — Dữ liệu từ các buổi họp báo quý năm tài chính 2025–2026 của các công ty: Foxconn có biên lợi nhuận gộp Q1 FY2026 là 6,18% (doanh thu máy chủ AI chiếm hơn 50% doanh thu mạng đám mây); Quanta đạt 4,78% (giảm 1,54 điểm phần trăm, mức thấp nhất trong gần 15 quý); Wistron đạt 5,21%; Wiwynn đạt 7,2% (so với 9,4% cùng kỳ năm ngoái).

[^14]: [Biên lợi nhuận của các nhà cung cấp Đài Loan trong chuỗi cung ứng cấp thứ hai (Eurasia Research)](https://vocus.cc/) — Các công ty Đài Loan càng gần về phía kỹ thuật thì biên lợi nhuận càng cao: Delta Electronics (nguồn điện/tản nhiệt) chiếm hơn 60% thị phần nguồn máy chủ AI, biên lợi nhuận gộp Q1 FY2026 đạt 37%; Unimicron (bảng mạch phụ trợ ABF) chiếm hơn 70% thị phần bảng mạch AI ASIC, là nhà cung cấp duy nhất hiện nay cho tấm nền NVIDIA CoWoP, với biên lợi nhuận ước tính đạt 21,3%.

[^15]: [Morgan Stanley: Biên lợi nhuận gộp gia tăng của lắp ráp ODM sụt giảm](https://newtalk.tw/) — Newtalk dẫn báo cáo ngày 22 tháng 5 năm 2026 của Morgan Stanley cho biết, biên lợi nhuận gộp gia tăng từ việc lắp ráp hệ thống nguyên chiếc của ODM đã giảm từ 2,7% đối với GB300 xuống còn khoảng 1,9% đối với VR200; trong khi giá trị gia tăng trên mỗi tủ máy của ODM đã tăng từ khoảng 108.000 USD đối với GB300 lên 149.600 USD đối với VR200. Ghi chú: Đây là biên lợi nhuận gộp gia tăng từ lắp ráp hệ thống nguyên chiếc, khác với biên lợi nhuận gộp của toàn công ty (5–7%).

[^16]: [Taiwan Insight: Nền kinh tế Đài Loan thịnh vượng nhưng đa số người dân không cảm nhận được lợi ích](https://taiwaninsight.org/) — Giang Mân Hoa (Min-Hua Chiang) từ Đại học Nottingham viết bài ngày 12 tháng 1 năm 2026: "hầu hết mọi người ở Đài Loan đều không cảm nhận được lợi ích từ nền kinh tế đang thịnh vượng." "10% nhóm thu nhập cao nhất tại Đài Loan nhận được 48% tổng thu nhập, trong khi 50% nhóm thấp nhất chỉ nhận được 12%." Tốc độ tăng trưởng kinh tế ước tính năm 2025 là 7,37%, đứng trong nhóm dẫn đầu thế giới.

[^17]: [The Reporter: Sự phân hóa hình chữ K dưới hào quang của AI](https://www.twreporter.org/) — Bài viết của Vương Dĩnh Đạt trên The Reporter ngày 11 tháng 6 năm 2026: "Số lượng lao động trực tiếp trong các chuỗi tăng trưởng chính như AI, bán dẫn và chuỗi cung ứng điện tử chiếm chưa đến 10% tổng số lao động." "Tổng lương hàng tháng của mỗi người trong ngành dịch vụ ăn uống là 38.484 Đài tệ, nếu so với ngành sản xuất linh kiện điện tử thì chỉ bằng 34,6%." Tỷ trọng doanh thu của các ngành liên quan đến điện tử trong tổng doanh thu ngành chế tạo đã tăng từ 58,0% lên 64,7%.

[^18]: [《The Nvidia Way》: Chỉ còn cách bờ vực phá sản ba mươi ngày](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Tác phẩm năm 2024 của Tae Kim và podcast Acquired/Sequoia đề cập đến phương châm nội bộ của NVIDIA: "Công ty chúng ta chỉ còn cách việc ngừng hoạt động trong ba mươi ngày" (câu mở đầu trong các cuộc họp công ty hàng tháng). Vào tháng 8 năm 1997 khi RIVA 128 xuất xưởng, công ty chỉ còn đủ chi trả lương cho khoảng một tháng. Đây là phương châm bằng tiếng Anh, không có bản dịch sát nghĩa tiếng Trung.

[^19]: [5 triệu USD từ SEGA đã cứu NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired và các tài liệu lịch sử thời kỳ đầu của NVIDIA chỉ ra rằng, chính khoản tiền 5 triệu USD từ SEGA vào cuối những năm 1990 mới là thứ thực sự đưa NVIDIA thoát khỏi khủng hoảng tài chính chứ không phải Đài Loan; nhằm làm rõ cách nói lãng mạn hóa rằng "Đài Loan đã cứu NVIDIA".

[^20]: [Hoàng Nhân Huân viết thư cho Trương Trung Mưu xin gia công](https://www.ettoday.net/) — ETtoday dẫn lời cho biết, vào khoảng năm 1996, Hoàng Nhân Huân (Jensen Huang) đã viết thư cho người sáng lập TSMC là Trương Trung Mưu (Morris Chang) để hỏi liệu "TSMC có thể gia công sản xuất con chip đầu tiên cho NVIDIA hay không". Năm 1998, hai bên chính thức ký kết hợp đồng hợp tác, đưa TSMC trở thành nhà máy đúc chip hàng đầu.

[^21]: [Mễ Ngọc Kiệt của TSMC: Sự hợp tác sâu sắc bắt đầu từ năm 1997](https://technews.tw/) — TechNews đưa tin ngày 19 tháng 5 năm 2025, Mễ Ngọc Kiệt (Mi Yu-chieh) của TSMC hồi tưởng: "Sự hợp tác sâu sắc đã bắt đầu vào một thời điểm then chốt, đó là năm 1997. Người sáng lập TSMC Trương Trung Mưu đã đích thân liên lạc với người sáng lập NVIDIA Hoàng Nhân Huân để đáp ứng yêu cầu về dịch vụ gia công của NVIDIA."

[^22]: [Cảnh tượng Hoàng Nhân Huân nhận điện thoại từ Trương Trung Mưu (lời kể gián tiếp)](https://www.businessweekly.com.tw/) — Trích dẫn từ bản truyện tranh trong sách của Business Weekly kể lại rằng khi Hoàng Nhân Huân nhận được điện thoại từ Trương Trung Mưu, ông đã hét lên với những người xung quanh: "Mọi người! Nhỏ tiếng thôi! Trương Trung Mưu đang gọi đấy!". Đây là lời kể gián tiếp, sắc thái biểu cảm có thể không hoàn toàn chính xác.

[^23]: [Lỗi quy trình sản xuất của TSMC năm 1998 suýt chút nữa đã hủy hoại NVIDIA](https://www.acquired.fm/episodes/nvidia-the-gpu-company-1993-2006) — Podcast Acquired và các tài liệu lịch sử thời kỳ đầu của NVIDIA cho biết, vào năm 1998, một lỗi trong quy trình hóa học của TSMC đã khiến một lượng lớn chip của NVIDIA bị hỏng, suýt chút nữa lại kéo sụp công ty — minh chứng cho khung quan hệ cộng sinh hai chiều: "Đài Loan là huyết mạch sản xuất chứ không phải cứu tinh khỏi phá sản".

[^24]: [AlexNet được huấn luyện bằng hai card đồ họa GTX 580](https://en.wikipedia.org/wiki/AlexNet) — Theo Wikipedia và Tom's Hardware, vào năm 2012, Alex Krizhevsky đã sử dụng hai card đồ họa NVIDIA GTX 580 trong phòng ngủ tại nhà cha mẹ để huấn luyện AlexNet, giúp giảm tỷ lệ lỗi nhận dạng hình ảnh trên ImageNet từ 26% xuống còn 15,3%, dẫn trước đối thủ thứ hai 10,8 điểm phần trăm, chứng minh GPU là động cơ cho học sâu (deep learning). CUDA được ra mắt vào năm 2006.

[^25]: [Blackwell/Rubin phụ thuộc 100% vào công nghệ CoWoS-L tại Đài Loan](https://finance.biggo.com/news/) — Phân tích ngành (dẫn từ Financial Times) cho thấy, từ năm 2025–2027, các GPU AI tiên tiến nhất của NVIDIA từ khâu sản xuất đến đóng gói cuối cùng đều phụ thuộc 100% vào dây chuyền CoWoS-L của TSMC tại Đài Loan.

[^26]: [TSMC nắm giữ khoảng 90–92% quy trình sản xuất tiên tiến toàn cầu](https://www.csis.org/analysis/countering-chinas-challenge-american-ai-leadership) — Phân tích từ CSIS cho biết, TSMC sản xuất khoảng 92% số bán dẫn tiên tiến nhất thế giới (dưới 5nm), năng lực đóng gói tiên tiến vượt qua tổng tất cả các đối thủ cộng lại; gần 90% khách hàng phụ thuộc vào Đài Loan bao gồm Apple, Amazon, Google, NVIDIA và Qualcomm.

[^27]: [Chou Yuntsai (Đại học Khoa học Kỹ thuật Quốc gia Đài Loan): Không thể đa dạng hóa việc gia công của TSMC trong ngắn hạn](https://www.sciencedirect.com/) — Nghiên cứu năm 2025 của Chou Yuntsai (Yuntsai Chou, Đại học Khoa học Kỹ thuật Quốc gia Đài Loan) trên ScienceDirect: 「Chuỗi cung ứng của Đài Loan sẽ đặc biệt dễ bị tổn thương trước các lệnh phong tỏa được khởi xướng trước năm 2027」 「Việc đa dạng hóa các nhà máy đúc chip của TSMC là không khả thi trong ngắn hạn. Việc xây dựng một nhà máy tiên tiến mới mất từ 3–4 năm và tiêu tốn hơn 10 tỷ USD.」 Mục tiêu sản xuất hàng loạt quy trình 2nm tại Arizona của TSMC là vào năm 2030.

[^28]: [United Daily News: 'Hai ngôi sao hai nghìn tỷ' trở thành 'ngành công nghiệp đau thương hai nghìn tỷ'](https://udn.com/) — United Daily News nhìn lại chính sách 'Hai ngôi sao hai nghìn tỷ': 「Các nhà máy tấm nền và các nhà máy bộ nhớ bán dẫn từng lẫy lừng một thời, vài năm sau do thị trường quốc tế cung vượt quá cầu đã dẫn đến thua lỗ nặng nề cho các doanh nghiệp, bị cư dân mạng chế giễu là 'Mao Sơn Đạo Sĩ' (Mao San Dao Si - chơi chữ từ mức lợi nhuận gộp chỉ 3-4%), khiến 'ngành công nghiệp hai ngôi sao hai nghìn tỷ' trở thành 'ngành công nghiệp đau thương hai nghìn tỷ'.」 Ngành tấm nền và DRAM bị rỗng hóa do đầu tư nghiên cứu phát triển chỉ đạt 6% (thấp hơn nhiều so với mức 10–21% của Hàn Quốc, Nhật Bản, Mỹ và châu Âu).

[^29]: [Tỷ lệ thành phẩm 5nm của SMIC chỉ bằng một phần ba TSMC](https://technews.tw/2025/03/28/) — TechNews đưa tin ngày 28 tháng 3 năm 2025: 「Với cùng quy trình sản xuất, giá tấm wafer 5nm của SMIC cao hơn TSMC 50%, tỷ lệ thành phẩm thậm chí còn thấp hơn vì chỉ sử dụng thiết bị DUV, chỉ đạt 33% so với TSMC」; công ty đã tuyên bố sản xuất hàng loạt vào tháng 12 năm 2025, chậm khoảng 5 năm.

[^30]: [NVIDIA rót 5 tỷ USD cổ phần vào Intel nhằm tranh giành năng lực đóng gói](https://www.intel.com/) — Tháng 12 năm 2025, NVIDIA đã nắm giữ khoảng 5% cổ phần của Intel, mục đích thực sự là để 「đảm bảo quyền ưu tiên tiếp cận năng lực đóng gói tiên tiến của Intel tại Hoa Kỳ」, nhằm đánh giá cho kiến trúc Feynman sử dụng vào năm 2028, đáp ứng nút thắt CoWoS của TSMC. Đây là biện pháp phòng ngừa dài hạn, không phải sự thay thế trong ngắn hạn.

[^31]: [Nhà máy đóng gói AP1 của TSMC tại Arizona dự kiến sản xuất hàng loạt vào năm 2028](https://www.tomshardware.com/) — Báo cáo ngành cho biết các nhà máy đóng gói AP1/AP2 của TSMC tại Arizona sẽ khởi công vào đầu năm 2026, và AP1 dự kiến sản xuất hàng loạt vào năm 2028; hiện tại 100% chip (bao gồm cả chip sản xuất tại Phoenix, Arizona) vẫn phải vận chuyển về Đài Loan để đóng gói. Nhà máy Amkor tại Arizona dự kiến sản xuất hàng loạt vào đầu năm 2028.

[^32]: [Công nghệ đóng gói PiFO của Powertech đối trọng với CoWoS-L](https://www.trendforce.com/news/) — TrendForce ngày 10 tháng 11 năm 2025: 「Công nghệ đóng gói tiên tiến PiFO — được lấy CoWoS-L của TSMC làm chuẩn đối chiếu — đã nổi lên như một lựa chọn thay thế hàng đầu trong ngành」, với đế kính có khả năng tản nhiệt tốt hơn và chi phí sản xuất thấp hơn khoảng 30%, nhiều nhà sản xuất chip AI của Hoa Kỳ đang tranh nhau tìm kiếm sự hỗ trợ, các đơn đặt hàng đã lấp đầy đến năm 2027. Tuy nhiên, đối tượng tiếp nhận là 「các nhà sản xuất chip AI khác của Hoa Kỳ」, không phải là GPU chủ lực rõ ràng của NVIDIA.

[^33]: [TrendForce: Khoảng cách thiếu hụt CoWoS thu hẹp nhờ chính sự mở rộng sản xuất của TSMC](https://www.trendforce.com/news/) — TrendForce ngày 15 tháng 6 năm 2026: 「khoảng cách cung-cầu CoWoS dự kiến sẽ thu hẹp đáng kể từ mức khoảng 20% hiện nay xuống còn khoảng 10% vào cuối năm 2026」, năng lực sản xuất hàng tháng có thể đạt mức kỷ lục từ 120.000 đến 140.000 tấm vào năm 2026; phương thức thu hẹp khoảng cách là do chính TSMC mở rộng sản xuất, chứ không phải nhờ các nhà cung cấp thay thế lấp đầy vị trí.

[^34]: [Shin Kong Life thắng thầu quyền sử dụng đất T17/T18 tại Khu Công nghệ Bắc Sĩ Kho năm 2021](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA đưa tin, vào năm 2021 chính quyền thành phố Đài Bắc đã đấu giá quyền sử dụng đất 50 năm cho các lô T17 và T18 tại Bắc Sĩ Kho (tổng cộng 3,89 ha) mà không yêu cầu bản kế hoạch đầu tư; Shin Kong Life là đơn vị duy nhất đấu thầu thành công với mức giá 2,8 tỷ NT$ cho lô T17 và 1,6 tỷ NT$ cho lô T18 (tổng cộng 4,4 tỷ NT$), sau đó để trống trong ba năm.

[^35]: [Jensen Huang tuyên bố trụ sở chính Constellation sẽ đặt tại Bắc Sĩ Kho tại Computex 2025](https://focustaiwan.tw/business/202505190009) — Focus Taiwan đưa tin, Jensen Huang đã tuyên bố tại Computex vào tháng 5 năm 2025 rằng trụ sở nước ngoài của NVIDIA mang tên 「Constellation」 dự kiến sẽ đặt tại Khu Công nghệ Bắc Đầu - Sĩ Lâm, với mức đầu tư hơn NT$40 tỷ, khởi công vào năm 2026, đi vào hoạt động vào năm 2030 và cung cấp hơn 10.000 việc làm.

[^36]: [NVIDIA, Shin Kong Life và chính quyền thành phố Đài Bắc bế tắc trong năm tháng](https://news.pts.org.tw/article/777650) — PTS đưa tin, do quyền sử dụng đất T17/T18 tại Bắc Sĩ Kho đang nằm trong tay Shin Kong Life và quyền sử dụng đất công không thể chuyển nhượng trực tiếp, ba bên đã rơi vào tình trạng bế tắc về việc thu hồi đất trong khoảng năm tháng.

[^37]: [Hội đồng thành phố Đài Bắc thông qua khoản tiền bồi thường chấm dứt hợp đồng 4,434 tỷ NT$](https://www.cna.com.tw/news/afe/202510035002.aspx) — CNA đưa tin, ngày 12 tháng 11 năm 2025, Hội đồng thành phố Đài Bắc đã thông qua không có ý kiến phản đối khoản tiền bồi thường chấm dứt hợp đồng trị giá 4.434.064.085 Đài tệ (NT$4,434,064,085) để chính quyền thành phố chi trả cho Shin Kong Life nhằm thu hồi đất, và xóa bỏ quyền sử dụng đất vào ngày 28 tháng 12.

[^38]: [You Shu-hui chỉ trích hóa đơn chấm dứt hợp đồng của Shin Kong Life](https://www.nextapple.com/) — E-News (đã đối chiếu qua WebFetch), Nghị viên Đảng Dân Quốc You Shu-hui đã nói nguyên văn: 「Khi nhìn thấy trong bản hóa đơn 8 trang của Shin Kong Life, ngay cả các chi phí như cắt cỏ, bảo trì môi trường, điều chỉnh Logo, phí đại lý... đều yêu cầu chính quyền thành phố Đài Bắc phải hoàn trả, tôi chỉ biết cười khổ... Ngay cả chi phí điều chỉnh Logo sau khi sáp nhập giữa Taishin và Shin Kong Life cũng bắt thành phố Đài Bắc phải trả? Thật là quá sức tưởng tượng... Ôi, ba tiếng thở dài bất lực.」 Sau đó: 「Bản hóa đơn mà Shin Kong Life đưa ra thật không thể hiểu nổi, nhưng vì đại cục nên đành chấp nhận」.

[^39]: [Luật pháp bình dân: Các đảng phái tại Hội đồng thông qua dự án chấm dứt hợp đồng một cách hòa hợp](https://plainlaw.me/) — Phong trào Luật pháp bình dân, "Ngày 12 tháng 11, Hội đồng Thành phố Đài Bắc đã thẩm định và thông qua phương án bồi thường chấm dứt hợp đồng trị giá NT$4.434 tỷ; trong quá trình này các đảng phái đã phối hợp hòa hợp, nhóm Dân tiến thậm chí còn hô vang 'Ủng hộ NVIDIA, nhanh chóng ký kết'"; Chủ tịch Hội đồng Đới Tích Khâm "không có ý kiến phản đối và ghi nhận", tại hiện trường vang lên tiếng vỗ tay.

[^40]: [Phân tích cấu thành khoản tiền bồi thường chấm dứt hợp đồng 4,434 tỷ](https://www.nextapple.com/) — Chuyên trang tin tức壹蘋 (Yipin) cùng các kế toán viên được Thành phố Đài Bắc thuê ngoài đã tính toán: Shinju vốn đã thanh toán khoảng 3,3 tỷ (do không khởi công trong 3 năm), hóa đơn đề xuất chấm dứt hợp đồng là 4,7 tỷ (bao gồm phí cắt cỏ, phí điều chỉnh Logo, phí hàng rào); kế toán viên đã khấu trừ 40 triệu để chốt con số 4,434 tỷ. Trong đó, tổng cộng 1,441 tỷ bao gồm chi phí tự thân của Shinju và các khoản thuế đã nộp sẽ do NVIDIA gánh chịu toàn bộ.

[^41]: [Ủy ban Quy hoạch Đô thị thông qua thiết kế trụ sở chính mô phỏng hình dáng tàu Starship Constellation](https://www.cna.com.tw/news/) — Trung Xã Xã (CNA) ngày 26 tháng 1 năm 2026, việc hợp nhất T17 (2,29 ha) và T18 (1,6 ha), tỷ lệ xây dựng tăng từ 50% lên 70%, hệ số sử dụng đất 300%, chiều cao 119,5 mét, mô phỏng hình dáng tàu 'Starship' của trụ sở Hoa Kỳ, tỷ lệ phủ xanh 80%, sức chứa khoảng 4.000 người, dự kiến khởi công vào cuối năm 2026 và đưa vào sử dụng năm 2030.

[^42]: [Số lượng nhân viên hiện tại của NVIDIA tại Đài Loan khoảng 1.800 người](https://www.digitimes.com/news/a20250519PD231/) — Các phương tiện truyền thông như Digitimes ước tính, văn phòng NVIDIA tại Neihu, Đài Bắc (số 8 đường Cơ Hồ) hiện có khoảng 1.800 nhân viên và thiết lập ba công ty con; đây là con số ước tính của truyền thông, không phải số liệu chính thức.

[^43]: [Kế hoạch Trung tâm Nghiên cứu và Phát triển Đổi mới AI của NVIDIA](https://focustaiwan.tw/business/202505190009) — Focus Taiwan và Bộ Kinh tế cho biết, NVIDIA đã được phê duyệt "Kế hoạch Trung tâm Nghiên cứu và Phát triển Đổi mới AI" vào năm 2021, với tổng vốn đầu tư 24,3 tỷ NT$, trợ cấp chính phủ 6,7 tỷ NT$, dự kiến tuyển dụng thêm đội ngũ nghiên cứu phát triển 1.000 người trong giai đoạn 2022–2027.

[^44]: [Thành lập Công ty Cổ phần NVIDIA Classic Đài Loan](https://www.cna.com.tw/news/afe/202510035002.aspx) — Trung Xã Xã (CNA), NVIDIA đã thành lập "Công ty Cổ phần NVIDIA Classic Đài Loan" vào tháng 11 năm 2025, vốn điều lệ tăng từ 1 tỷ lên 3,3 tỷ NT$, là pháp nhân độc lập, có quyền tự chủ trong việc nộp thuế và nắm giữ tài sản.

[^45]: [S&P: Lượng điện tiêu thụ của TSMC vào năm 2030 có thể đạt 23,7% toàn Đài Loan](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — The Initium và Standard & Poor's (S&P) cho biết, lượng điện tiêu thụ của TSMC năm 2023 là 24,775 tỷ kWh, chiếm 8,96% toàn Đài Loan (chiếm 16,2% trong lĩnh vực công nghiệp); năm 2024 lượng điện tiêu thụ là 27,456 tỷ kWh nhưng năng lượng tái tạo chỉ đạt 14,1%; S&P dự báo đến năm 2030 lượng điện tiêu thụ có thể đạt mức 23,7% toàn Đài Loan.

[^46]: [Greenpeace: "Bóng tối sau vinh quang của chip bán dẫn"](https://www.greenpeace.org/taiwan/press/44037/) — Báo cáo ngày 10 tháng 4 năm 2025 của Greenpeace (có thể tra cứu nguyên văn): Lượng điện tiêu thụ sản xuất chip AI toàn cầu tăng từ 218 GWh lên 984 GWh (tăng hơn 3,5 lần mỗi năm), lượng điện tiêu thụ tại Đài Loan tăng vọt lên 375,8 GWh "chiếm tới 38% tổng lượng toàn cầu"; lượng phát thải carbon từ chip AI của TSMC đạt 185.700 tấn, trở thành "nhà vô địch về phát thải carbon"; NVIDIA bị đánh giá hạng F, lượng phát thải trong chuỗi cung ứng tăng từ 3,51 triệu tấn lên 6,91 triệu tấn trong ba năm, "chỉ là đang chuyển giao lượng phát thải carbon và ô nhiễm của chuỗi cung ứng sang các khu vực khác trên thế giới".

[^47]: [Nước tái chế tại Tainan gần như dành toàn bộ cho TSMC](https://theinitium.com/20250912-international-tsmc-energy-explainer/) — The Initium cho biết, lượng nước tiêu thụ hàng ngày của TSMC vượt quá 200.000 tấn (Khu khoa học Tân Trúc 56.000 tấn, Khu khoa học Trung Đài 53.000 tấn, Khu khoa học Nam Đài 99.000 tấn); bốn nhà máy nước tái chế tại Tainan cung cấp 81.000 tấn mỗi ngày "gần như dành toàn bộ cho TSMC".

[^48]: [Ruộng nông nghiệp Gia Nam hai lần ngừng tưới vào năm 2021 và 2023 để nhường nước cho ngành bán dẫn](https://theinitium.com/) — Các báo cáo từ The Initium và các nguồn khác cho biết, ruộng nông nghiệp tại khu vực Gia Nam đã hai lần phải ngừng tưới vào năm 2021 và 2023 để điều tiết nước tưới cho ngành công nghiệp bán dẫn sử dụng.

[^49]: [Một tấm wafer 12 inch cần 8.327 lít nước](https://www.greenpeace.org/taiwan/) — Theo Greenpeace và dữ liệu ngành, việc sản xuất một tấm wafer 12 inch cần khoảng 8.327 lít nước.

[^50]: [60.000 dân cư tại khu Bắc Sĩ Khoa tranh giành 1.476 căn hộ](https://house.udn.com/house/story/123590/8769929) — Bất động sản của Kinh tế Nhật báo ước tính dân số làm việc thường trú tại Bắc Sĩ Khoa có thể lên tới 60.000 người, trong khi thống kê từ 591 cho thấy số lượng nhà ở có thể bán chỉ khoảng 1.476 căn, đất ở chỉ chiếm 13,8% toàn khu vực.

[^51]: [Dự án mới tại vị trí lõi Bắc Sĩ Khoa vượt mức 1,5 triệu NT$ mỗi ping](https://www.ctee.com.tw/news/20260603701575-430601) — Báo cáo tháng 6 năm 2026 của Công Thương Thời báo cho biết, giá giao dịch các dự án mới tại khu vực lõi Bắc Sĩ Khoa đã vượt mức 1,5 triệu NT$ mỗi ping, "60.000 người tranh giành 1.500 căn hộ", người dân địa phương lo ngại tình trạng tắc đường như ở Neihu và nghi vấn "công ty còn chưa khởi công thì dựa vào đâu mà tăng giá".

[^52]: [Đăng ký giá thực tế: Giá giao dịch nhà ở cao nhất tại quận Thạch Lâm là 1,88 triệu NT$ mỗi ping](https://lvr.land.moi.gov.tw/) — Dịch vụ tra cứu giá giao dịch bất động sản của Bộ Nội vụ cho biết, vào năm 2025, căn hộ chung cư cao nhất tại quận Thạch Lâm có giá giao dịch là 570.400 NT$/m² (khoảng 1,88 triệu NT$/ping, số 39 đường Cơ Hồ, tổng giá 447 triệu NT$), với nhiều giao dịch vượt quá 1,5 triệu NT$/ping. Lưu ý: Đây là các biệt thự cao cấp tại khu vực Thiên Mẫu và trung tâm Thạch Lâm, không phải bản thân khu Bắc Sĩ Khoa.

[^53]: [Doanh nghiệp: Tiện ích đời sống trong khu công nghiệp kém, một phần ba nhân viên nghỉ việc](https://house.udn.com/house/story/123590/8769929) — Mục bất động sản của Liên hợp báo dẫn lời doanh nghiệp (ẩn danh): "Do tiện ích đời sống kém, nhiều nhân viên không muốn chuyển đến khu công nghiệp... thậm chí sau khi chuyển đến, một phần ba nhân viên đã nghỉ việc vì lý do giao thông không thuận tiện"; Cục trưởng Cục Giao thông Tạ Minh Hồng cho biết đang đánh giá việc bổ sung thêm 3 tuyến vận hành tại Bắc Sĩ Khoa.

[^54]: [Dư luận ẩn danh trên PTT: Thay đổi chủ đề sang Nvidia](https://www.ptt.cc/) — Thảo luận ẩn danh trên PTT (không thể truy cứu cá nhân, được coi là dư luận ẩn danh): "Trước đây dùng hiệu ứng TSMC đã chán rồi, giờ chuyển sang chủ đề Nvidia thôi" "Một đống kỹ sư ở Neihu đều sống tại các huyện lân cận, liệu khi Nvidia đến khu Bắc Sĩ Khoa thì mọi người sẽ dọn vào đó sao? Logic không hợp lý lắm."

[^55]: [Tranh luận về Lá chắn Silicon và Bẫy Silicon](https://www.researchgate.net/) — Nghiên cứu năm 2025 trên ResearchGate mang tên "Silicon Shield or Silicon Trap?", thảo luận về tính hai mặt của sự tập trung chip tại Đài Loan: vừa là rào cản bảo vệ (Lá chắn Silicon), vừa là động cơ bị xâm lược hoặc điểm yếu chí tử (Bẫy Silicon).

[^56]: [Phản biện chiến lược "Tổ ấm tan vỡ" / "Vườn không nhà trống"](https://thenewslens.com/) — The News Lens và luận thuyết cũng như phản biện về "Broken Nest" từ Parameters của Học viện Chiến tranh Lục quân Hoa Kỳ (McKinney & Harris, 2021): "Việc tự gây tổn hại kinh tế, ngay cả khi ngăn chặn thành công Trung Quốc trong ngắn hạn, có thể chỉ trì hoãn sự xâm lược của Trung Quốc cho đến khi họ đạt được các mục tiêu sản xuất bán dẫn nội địa" "khó có khả năng công chúng Đài Loan coi hành động phá hoại như vậy là vì lợi ích của chính quốc gia mình".

[^57]: [TSMC đầu tư 165 tỷ USD mở rộng nhà máy tại Mỹ](https://www.foreignaffairs.com/) — TSMC thông báo tổng vốn đầu tư 165 tỷ USD (65 tỷ cộng với 100 tỷ USD) để mở rộng nhà máy tại bang Arizona, Hoa Kỳ, nhằm phân tán rủi ro địa chính trị.

[^58]: [MIT Technology Review: Lá chắn Silicon của Đài Loan có thể đang suy yếu](https://www.technologyreview.com/) — Bài viết "Taiwan's silicon shield could be weakening" trên MIT Technology Review ngày 15 tháng 8 năm 2025: "Hiện nay, một số chuyên gia về Đài Loan và người dân trên đảo đang lo ngại rằng 'lá chắn silicon' này, nếu nó từng tồn tại, đang dần rạn nứt." Lo ngại việc chuyển dịch năng lượng sản xuất ra nước ngoài sẽ làm loãng lợi thế của Đài Loan.

[^59]: [Bonnie Glaser: Hệ sinh thái của Đài Loan rất khó sao chép](https://www.technologyreview.com/) — MIT Technology Review trích dẫn lời Bonnie Glaser từ Quỹ Marshall Đức: "Hệ sinh thái mà họ tạo ra thực sự độc nhất. Đó là kết quả của chuỗi cung ứng nhân tài, văn hóa và luật pháp tại Đài Loan; bạn không thể dễ dàng sao chép nó ở bất kỳ đâu."

[^60]: [Paul Triolo: Arizona sẽ không bao giờ đạt đến trình độ đó](https://www.technologyreview.com/) — MIT Technology Review trích dẫn chuyên gia chính sách công nghệ Paul Triolo đánh giá về nhà máy TSMC tại Arizona: "Arizona chưa đạt đến mức đó, và sẽ không bao giờ."

[^61]: [Jensen Huang: Đài Loan là một trong những quốc gia quan trọng nhất thế giới](https://www.cna.com.tw/) — Báo cáo đa nguồn từ Trung ương Xã (CNA), Jensen Huang đã phát biểu công khai tại Đài Loan vào ngày 29 tháng 5 năm 2024: "Taiwan is one of the most important countries in the world." (nguyên văn tiếng Anh).

[^62]: [Diễn văn tại Đại học Quốc gia Đài Loan trong Computex 2024: Đài Loan là người hùng thầm lặng, trụ cột của thế giới](https://www.tbotaiwan.com/) — Toàn văn bài diễn văn của Jensen Huang tại Computex 2024 tại Đại học Quốc gia Đài Loan, đoạn kết video được chép lại nguyên văn: "Đài Loan là những người hùng thầm lặng, nhưng lại là trụ cột của thế giới." "Cảm ơn bạn, Đài Loan!" "Đài Loan là nơi tập trung các đối tác vô cùng quý giá của chúng tôi, mọi thứ của NVIDIA đều bắt đầu từ đây."

[^63]: [Phát ngôn viên Văn phòng Công tác Đài Loan, Trung Quốc phản hồi về phát ngôn của Jensen Huang](https://zh.wikinews.org/) — Tin tức Wiki, người phát ngôn Văn phòng Công tác Đài Loan của Trung Quốc - Trần Bân Hoa (18 ngày sau sự việc): "Đối với loại ngôn luận cực kỳ sai lầm này, người dân và cư dân mạng đại lục đã liên tục bày tỏ sự bất mãn mạnh mẽ. Đài Loan chưa bao giờ là một quốc gia... hy vọng ông ta nên học lại cho kỹ."

[^64]: [CNA: Truyền thông đại lục làm ngơ việc Jensen Huang nói "Đài Loan là quốc gia quan trọng"](https://www.cna.com.tw/) — Trung ương Xã (CNA) ngày 3 tháng 6 năm 2024: "Các phương tiện truyền thông kinh tế tại đây đã đưa nhiều tin liên quan, nhưng không thấy đề cập đến việc Jensen Huang phát biểu 'Đài Loan là một quốc gia quan trọng', dường như đã bỏ lỡ vấn đề nhạy cảm vốn luôn được coi là 'trọng điểm của trọng điểm'."

[^65]: [Chuyên gia: Trung Quốc cần Nvidia, nhưng Nvidia không cần Trung Quốc](https://www.voacantonese.com/a/china-s-media-turned-a-blind-eye-to-jensen-huang-s-statement-20240607/7646642.html) — Voice of America (tiếng Quảng Đông) trích dẫn bình luận của chuyên gia, phân tích rằng việc truyền thông kinh tế Trung Quốc làm ngơ trước phát ngôn "Đài Loan là quốc gia quan trọng" của Jensen Huang phản ánh mối quan hệ bất đối xứng: "Trung Quốc cần Nvidia, nhưng Nvidia không cần Trung Quốc".

[^66]: [Lai Ching-te: Top 5 trung tâm tính toán toàn cầu và AI chủ quyền](https://www.bnext.com.tw/article/79391/sovereign-ai) — Digital Age, ông Lại Thanh Đức (Lai Ching-te) vào tháng 10 năm 2025 đã đề ra mục tiêu đưa Đài Loan trở thành "một trong năm trung tâm tính toán hàng đầu thế giới" và phát triển "AI chủ quyền".

[^67]: [Foxconn xây dựng siêu máy tính quốc gia với 10.000 chip Blackwell](https://blogs.nvidia.com.tw/blog/foxconn-ai-factory-tsmc-taiwan-nvidia/) — Blog NVIDIA Đài Loan, Foxconn (Big Innovation Company) đang xây dựng một siêu máy tính quốc gia tại Cao Hùng sử dụng 10.000 chip Blackwell, đạt hơn 90 exaflops, hợp tác với TSMC và NSTC để tạo ra nhà máy AI đầu tiên của Đài Loan.

[^68]: [Mười dự án xây dựng mới về AI của Hành chính Viện](https://iknow.stpi.niar.org.tw/post/Read.aspx?PostID=21832) — STPI iKnow, kế hoạch "Mười dự án xây dựng mới về AI" của Hành chính Viện dự kiến sẽ đầu tư hơn NT$100 tỷ trước năm 2040, hướng tới mục tiêu giá trị sản lượng 15 nghìn tỷ Đài tệ.

[^69]: [TAIDE giống như học sinh trung học, các ông lớn quốc tế đã ở trình độ nghiên cứu sinh](https://www.cw.com.tw/article/5137534) — Tạp chí CommonWealth: Mô hình ngôn ngữ bản địa của Đài Loan là TAIDE được mô tả là "giống như học sinh trung học, trong khi các tập đoàn quốc tế đã đạt đến trình độ nghiên cứu sinh", ngân sách cả năm của dự án TAIDE thậm chí không bằng chi phí huấn luyện một lần của các mô hình quốc tế; TAIDE bắt đầu với 9 máy (72 chip) H100.

[^70]: [Chính phủ Hàn Quốc thu mua 260.000 GPU](https://www.cw.com.tw/) — Tạp chí CommonWealth và báo cáo ngành: Chính phủ Hàn Quốc trực tiếp thu mua 260.000 GPU, tạo nên sự tương phản với thái độ tương đối do dự trong các quyết định chính sách của Đài Loan.

[^71]: [Jensen Huang tại Computex 2026: Chi tiêu hàng năm tại Đài Loan khoảng 150 tỷ USD](https://cryptobriefing.com/nvidia-150b-taiwan-silicon-shield-ai/) — Cryptobriefing và Reuters: Jensen Huang đã tiết lộ tại Computex 2026 rằng NVIDIA chi tiêu khoảng 150 tỷ USD mỗi năm tại Đài Loan (so với chỉ 10-15 tỷ USD của năm năm trước), các đối tác chuỗi cung ứng Vera Rubin đã tăng gấp đôi, bao gồm 150 công ty Đài Loan; TSMC sản xuất khoảng 90% các tiến trình tiên tiến nhất toàn cầu.
