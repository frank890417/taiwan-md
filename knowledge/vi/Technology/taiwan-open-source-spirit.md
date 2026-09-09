---
title: 'Tinh thần mã nguồn mở của Đài Loan – Những kỹ sư "sạc điện bằng tình yêu"'
description: 'Các dự án mã nguồn mở có ảnh hưởng nhất ở Đài Loan không phải là phần mềm, mà là một nhóm các kỹ sư đã nói với chính phủ trong các cuộc hackathon: "Các vị làm không tốt, chúng tôi sẽ làm."'
date: 2026-03-29
category: 'Technology'
tags:
  [
    'Mã nguồn mở',
    'g0v',
    'COSCUP',
    'GitHub',
    'Công nghệ công dân',
    'Phần mềm tự do',
  ]
subcategory: '社群與數位文化'
author: 'p3nchan'
featured: false
lastVerified: 2026-03-29
lastHumanReview: false
readingTime: 8
translatedFrom: 'Technology/台灣開源精神.md'
sourceCommitSha: '4b6d28c54'
sourceContentHash: 'sha256:8cc121a9cccbf90a'
sourceBodyHash: 'sha256:98feb4bab36f053f'
translatedAt: '2026-09-09T11:45:55+08:00'
---

> Quy mô ngành phần mềm của Đài Loan chưa phải là hàng đầu thế giới, nhưng số lượng người dùng gắn thẻ Taiwan trên GitHub vượt quá 44.000 người, với hơn 70 sự kiện hackathon cộng đồng và hàng nghìn người đóng góp—hầu hết đều là các nhà phát triển cá nhân tự bỏ tiền túi sau giờ làm việc. Bài viết này không chỉ nói về g0v mà còn phác họa bản đồ hoàn chỉnh của văn hóa mã nguồn mở Đài Loan từ bốn góc độ: con người, cộng đồng, giáo dục và ngành công nghiệp.

---

## Hackathon được khơi mào bởi một quảng cáo

Vào tháng 10 năm 2012, chính phủ đã phát trên truyền hình một đoạn quảng cáo dài 40 giây để quảng bá "Kế hoạch thúc đẩy động lực kinh tế". Nội dung của quảng cáo chỉ có một câu: "Kế hoạch này rất phức tạp, không thể giải thích rõ ràng bằng vài câu đơn giản."

Cao Gia Lương (clkao), sinh viên tốt nghiệp ngành Khoa học Máy tính tại Đại học Đài Loan, sau khi xem quảng cáo đã mở máy tính. Anh và một vài người bạn tham gia Yahoo! Open Hack Day, thay đổi đề tài đột xuất, trong ba ngày đã hoàn thành dự án "Trực quan hóa ngân sách chính phủ trung ương" và giành giải thưởng. Hai tháng sau, Cao Gia Lương đăng ký g0v.tw và sử dụng tiền thưởng để tổ chức "Hackathon phản kháng lần thứ không".

Tên gọi g0v là thay chữ 'o' của gov (chính phủ) bằng số 0. Ý nghĩa rất trực tiếp: các vị làm không tốt, chúng tôi sẽ làm.

Đây không phải là một tổ chức. g0v không có văn phòng, không có hội đồng quản trị, và không có nhân viên toàn thời gian. Nó là một cộng đồng phi tập trung, được duy trì bằng các buổi hackathon hai tháng một lần. Đến cuối năm 2025, đã có hơn 70 sự kiện hackathon được tổ chức, với hơn 8.000 thành viên trên Slack và hơn 4.500 tài liệu hợp tác tích lũy trên HackMD.

---

## 100 ứng dụng trong 72 giờ

Khoảnh khắc g0v được quốc tế chú ý nhất là vào năm 2020.

Khi đại dịch COVID-19 bùng phát, Đài Loan áp dụng chế độ quản lý danh tính khẩu trang. Bộ Y tế công bố API tồn kho khẩu trang của các hiệu thuốc. Bà Đường Phượng (Audrey Tang), cố vấn chính phủ kỹ thuật số lúc đó, đã đăng thông báo trên kênh trò chuyện g0v. Trong 72 giờ tiếp theo, cộng đồng nhà phát triển Đài Loan đã bùng nổ một năng lượng hợp tác chưa từng có: Giang Minh Tông (kiang) tạo ra bản đồ khẩu trang hiệu thuốc, Jarvis Lin làm ứng dụng Android, và chatbot LINE cũng được ra mắt trong cùng ngày.

Trong vòng một tuần, đã có hơn 100 ứng dụng liên quan đến tra cứu khẩu trang. Ước tính gần nghìn kỹ sư đã tham gia phát triển.

Tạp chí _Foreign Affairs_ đã đăng bài chuyên đề _Civic Technology Can Help Stop a Pandemic_ (Công nghệ công dân có thể giúp ngăn chặn đại dịch), nhận định rằng Đài Loan đã trình bày một con đường thứ ba, khác với sự giám sát kiểu Trung Quốc và cũng khác với các tập đoàn công nghệ phương Tây: đổi mới dân chủ được thúc đẩy bởi công nghệ công dân (civic tech). Báo cáo của Trường Y thuộc Đại học Stanford đã ghi lại 124 biện pháp can thiệp độc lập mà Đài Loan đã thực hiện trong thời gian đại dịch. NPR, MIT Technology Review và Harvard Business Review đều có các bài báo chuyên đề về vấn đề này.

Đây không phải là thành tích của chính phủ, cũng không chỉ là công lao của Đường Phượng. Đây là sản phẩm do một nhóm kỹ sư không lương tạo ra vào cuối tuần.

---

## Trước Đường Phượng: Cội rễ mã nguồn mở Đài Loan

Sự hình thành nhanh chóng của g0v từ năm 2012 là nhờ việc Đài Loan đã có hơn hai thập kỷ đất đai cho mã nguồn mở.

Trước khi tham gia chính phủ, Đường Phượng (Audrey Tang) đã khởi xướng hơn 100 dự án trên CPAN (nền tảng mô-đun của Perl) khi mới 12 tuổi và bỏ học để khởi nghiệp năm 14 tuổi. Bà là nhân vật được cộng đồng Perl và Haskell công nhận, với tầm ảnh hưởng trong giới mã nguồn mở quốc tế sớm hơn nhiều so với sự nghiệp chính trị của mình.

Hồng Nhậm Dụ (PCMan) là một nhân vật tiêu biểu khác. Ông là bác sĩ nội khoa, tự học lập trình từ thời trung học và đã viết phần mềm kết nối BBS mang tên PCMan. Năm 2006, ông khởi xướng dự án LXDE—một môi trường máy tính để bàn Linux nhẹ. LXDE từng là một trong những môi trường máy tính để bàn phổ biến với mức tiêu thụ bộ nhớ thấp nhất trên toàn cầu và được các bản phân phối như Knoppix, Lubuntu sử dụng. Một môi trường máy tính để bàn do bác sĩ Đài Loan viết lại chạy trên các thiết bị Linux trên toàn thế giới. Sau này Hồng Nhậm Dụ gia nhập Google, nhưng câu chuyện về LXDE cho thấy một đặc điểm điển hình của những người đóng góp mã nguồn mở Đài Loan: nghề nghiệp không phải là phần mềm, mà họ thực hiện các dự án tầm cỡ quốc tế trong thời gian rảnh rỗi.

Hoàng Kính Quân (jserv) lại đi theo một con đường khác. Ông tham gia phát triển phần mềm hệ thống tại các công ty như MediaTek và Andes Technology, sau đó trở thành giảng viên khoa Khoa học Máy tính tại Đại học Thành Công, mở khóa học "Thiết kế nhân Linux"—khóa học đại học duy nhất ở Đài Loan phân tích cấu trúc nhân Linux mới nhất một cách có hệ thống. Sinh viên của ông trực tiếp gửi các bản vá (patch) lên Linux, glibc, GCC, LLVM. Ông nhiều lần thuyết trình tại COSCUP và FOSDEM ở châu Âu. jserv không đại diện cho những người đóng góp "thiên tài", mà là nỗ lực đưa thực hành mã nguồn mở vào hệ thống giáo dục.

---

## Hệ sinh thái cộng đồng: Không chỉ có COSCUP

Mật độ cộng đồng mã nguồn mở của Đài Loan được coi là bất thường ở châu Á.

**COSCUP** (Conference for Open Source Coders, Users and Promoters) bắt đầu từ năm 2006 và là hội nghị mã nguồn mở lớn nhất ở Đài Loan. Đến năm 2024, số lượng người tham gia vượt quá 2.800 người, với hơn 40 phòng cộng đồng bao gồm các chủ đề như Kubernetes, PostgreSQL, Ruby, Python, Blockchain. Mỗi phòng cộng đồng có lịch trình khoảng 6 giờ và được tự tổ chức bởi từng cộng đồng. COSCUP không thu phí vé. Hơn một trăm tình nguyện viên đều làm việc hoàn toàn miễn phí. Năm 2025 là lần thứ 20 của COSCUP.

**SITCON** (Students' Information Technology Conference) bắt đầu từ năm 2013, hoàn toàn do sinh viên khởi xướng và tổ chức. Ý nghĩa tồn tại của nó là: cho phép học sinh trung học 18 tuổi thấy rằng không cần phải đợi tốt nghiệp mới tham gia mã nguồn mở. SITCON tổ chức hội nghị vào tháng Ba hàng năm, cùng với HackGen trong học kỳ và các buổi họp hai tuần một lần trong mùa hè.

**PyCon TW** là hội nghị của cộng đồng Python, quy tụ những người dùng Python từ nhiều lĩnh vực khác nhau. **MozTW** là cộng đồng tình nguyện viên Mozilla tại Đài Loan, duy trì phiên bản tiếng Trung chính thức của Firefox từ năm 2004 và điều hành chương trình đại sứ học đường, nhóm dịch phụ đề. Không gian cộng đồng "Mô-tơ Công nhân" ở Đài Bắc hoạt động từ năm 2014 đến năm 2023, được duy trì bằng quyên góp địa phương sau khi Mozilla ngừng tài trợ.

Các cộng đồng này có sự giao thoa lớn. Một người có thể vừa là diễn giả tại COSCUP, người đóng góp cho g0v, và tình nguyện viên của PyCon TW. Vòng tròn mã nguồn mở Đài Loan không lớn nhưng mật độ cao.

---

## Di sản và sự đứt gãy của hệ thống

Đài Loan đã từng có những nỗ lực thúc đẩy mã nguồn mở từ phía chính phủ.

Năm 2003, Viện Khoa học Thông tin thuộc Viện Nghiên cứu Trung Quốc (ROC) nhận được tài trợ từ Cục Công nghiệp Bộ Kinh tế để thành lập "Xưởng đúc phần mềm tự do" (OSSF - Open Source Software Foundry). OSSF cung cấp dịch vụ lưu trữ dự án, tư vấn pháp lý và quảng bá bản tin điện tử, nuôi dưỡng cộng đồng mã nguồn mở địa phương trong hơn mười năm. Năm 2015, Bộ Khoa học và Công nghệ quyết định ngừng tài trợ, dẫn đến việc OSSF kết thúc hoạt động và trang web đóng cửa vào cuối năm 2021.

Sự biến mất của OSSF không làm suy giảm các hoạt động mã nguồn mở ở Đài Loan—điều này cho thấy năng lượng mã nguồn mở của Đài Loan chưa bao giờ phụ thuộc vào chính phủ. Thứ thực sự duy trì hệ sinh thái là "Quỹ Văn hóa Mở" (OCF - Open Culture Foundation), được thành lập năm 2014 bởi nhiều cộng đồng mã nguồn mở cùng nhau. OCF là một tổ chức phi lợi nhuận, đóng vai trò quản lý tài chính cho các cộng đồng: xuất hóa đơn cho COSCUP, xử lý quyên góp cho dự án và cung cấp tư vấn pháp lý về giấy phép mã nguồn mở. OCF cũng hợp tác với AIT, Văn phòng đại diện Anh tại Đài Loan và Ngân hàng Thế giới để đưa kinh nghiệm công nghệ công dân của Đài Loan ra quốc tế.

Cấu trúc này rất thú vị: kế hoạch của chính phủ kết thúc, quỹ tư nhân tiếp quản. Hệ thống được sinh ra từ dưới lên.

---

## Lý do cấu trúc "Sạc điện bằng tình yêu"

Đa số những người đóng góp mã nguồn mở ở Đài Loan là cá nhân. Không có các công ty mã nguồn mở cấp Red Hat, và không có các chương trình tài trợ quy mô như Google Summer of Code; sự đầu tư của các công ty công nghệ phần lớn là "cho phép nhân viên làm trong thời gian rảnh" chứ không phải "liệt kê mã nguồn mở vào KPI".

Tại sao?

Ngành công nghiệp công nghệ của Đài Loan lấy gia công phần cứng và thiết kế IC làm cốt lõi. Mô hình kinh doanh của TSMC, MediaTek và Foxconn được xây dựng dựa trên năng lực sản xuất và rào cản bằng sáng chế, chứ không phải mã nguồn mở. Phần mềm trong hệ sinh thái này thường là "sản phẩm phụ đi kèm với phần cứng", chứ không phải là nguồn thu nhập độc lập. Trong số hàng nghìn công ty dịch vụ phần mềm, chín phần trăm làm tích hợp hệ thống, phục vụ thị trường nội địa.

Kết quả là: có rất nhiều người viết mã, nhưng hầu như không có ai "sống bằng mã nguồn mở". Mã nguồn mở là việc làm sau giờ làm, là hoạt động tại các buổi gặp gỡ cộng đồng, là hackathon vào thứ Bảy. Trong danh sách nhà tài trợ của COSCUP, bạn sẽ thấy số lượng công ty nước ngoài (Google, LINE, Trend Micro) nhiều hơn so với doanh nghiệp địa phương.

Điều này không hoàn toàn là xấu. Chính vì mã nguồn mở không phải là KPI, động lực của người tham gia càng thuần khiết hơn. Lý do bản đồ khẩu trang g0v bùng nổ trong 72 giờ không phải vì có ai đưa ra đơn đặt hàng, mà vì một nghìn kỹ sư cảm thấy "việc này cần được làm".

Nhưng mô hình này có giới hạn. Nếu thiếu sự đầu tư bền vững cấp doanh nghiệp, các dự án dễ bị đình trệ sau khi người bảo trì cốt lõi kiệt sức. Đài Loan không thiếu những hacker cuối tuần, mà thiếu những vị trí cho phép họ toàn tâm toàn ý cống hiến cho mã nguồn mở.

---

## Sức mạnh thầm lặng của 44.000 người

Có 44.408 người dùng gắn thẻ Taiwan trên GitHub (thống kê tháng 3 năm 2026). Cần ít nhất 67 người theo dõi để lọt vào bảng xếp hạng của committers.top cho Đài Loan. Xét với dân số 23 triệu người của Đài Loan, con số này có nghĩa là cứ 500 người Đài Loan thì có một tài khoản GitHub hoạt động. So với Nhật Bản, Singapore và Hồng Kông, mức độ hoạt động trung bình trên GitHub của các nhà phát triển Đài Loan nằm trong nhóm dẫn đầu châu Á.

Điều đáng xem hơn không phải là con số, mà là loại hình đóng góp. Vai trò của các nhà phát triển Đài Loan trong các dự án quốc tế thường là "cơ sở hạ tầng vô hình": vá nhân (kernel patch), tối ưu hóa trình biên dịch, bản địa hóa và viết tài liệu. Sinh viên Đại học Thành Công trực tiếp gửi mã lên nhân Linux. MozTW đã duy trì phiên bản tiếng Trung của Firefox trong hai mươi năm. Những đóng góp này không được đưa tin trên báo chí, nhưng nếu thiếu chúng, phần mềm sẽ không thể hoạt động.

Cộng đồng mã nguồn mở Đài Loan còn có một đặc điểm hiếm thấy ở châu Á: g0v đã áp dụng phương pháp luận mã nguồn mở vào chính sách công. Nền tảng vTaiwan sử dụng công nghệ Polis để tiến hành thảo luận trực tuyến, xử lý hơn 30 vấn đề như quy định của Uber và luật công nghệ tài chính. _MIT Technology Review_ gọi đây là "hệ thống đơn giản nhưng khéo léo mà Đài Loan dùng để thuê ngoài pháp luật cho quần chúng". Đây không còn là vấn đề viết mã nữa, mà là việc áp dụng logic hợp tác của mã nguồn mở vào quản trị dân chủ.

Mã nguồn mở ở Đài Loan chưa bao giờ chỉ là chuyện của cộng đồng kỹ thuật. Nó là một thái độ: nhìn thấy vấn đề, mở trình soạn thảo và bắt đầu viết.

---

## Tài liệu tham khảo

1. [Sổ tay dự án công nghệ công dân g0v](https://g0v.hackmd.io/@jothon/ctpbook) (Tài liệu gốc)
2. [Năm 2020 đầy biến động, đóng góp của g0v không chỉ là "bản đồ khẩu trang"](https://www.gvm.com.tw/article/76428) — Tạp chí Viễn kiến
3. [Civic Technology Can Help Stop a Pandemic](https://www.foreignaffairs.com/articles/asia/2020-03-20/how-civic-technology-can-help-stop-pandemic) — Foreign Affairs (nguồn tiếng Anh)
4. [Công dân hacker g0v Zero Government](https://www.taiwan-panorama.com/Articles/Details?Guid=61281c3d-f79c-4db7-93d9-d18b29f90ba0) — Tạp chí Quang Hoa Đài Loan
5. [Đường Phượng, nhà lãnh đạo cộng đồng mã nguồn mở quốc tế: Mã nguồn mở là mô hình trao đổi của thời đại mới](https://www.ithome.com.tw/news/93603) — iThome
6. [Hồng Nhậm Dụ — Wikipedia](https://zh.wikipedia.org/zh-tw/%E6%B4%AA%E4%BB%BB%E8%AB%AD)
7. [Hoàng Kính Quân — Wikipedia](https://zh.wikipedia.org/zh-tw/%E9%BB%83%E6%95%AC%E7%BE%A4)
8. [Xưởng đúc phần mềm tự do — Wikipedia](https://zh.wikipedia.org/zh-tw/%E8%87%AA%E7%94%B1%E8%BB%9F%E9%AB%94%E9%91%84%E9%80%A0%E5%A0%B4)
9. [Về OCF - Open Culture Foundation](https://ocf.tw/en/p/what_is_ocf_en.html)
10. [committers.top — Người dùng GitHub hoạt động nhất ở Đài Loan](https://committers.top/taiwan.html)
11. [COSCUP — Wikipedia](https://en.wikipedia.org/wiki/COSCUP)
12. [The simple but ingenious system Taiwan uses to crowdsource its laws](https://www.technologyreview.com/2018/08/21/240284/the-simple-but-ingenious-system-taiwan-uses-to-crowdsource-its-laws/) — MIT Technology Review

---

## Đọc thêm

- [Cộng đồng mã nguồn mở và g0v](/vi/technology/open-source-and-g0v) — Tái cấu trúc tự sự tập thể của chính phủ
- [Lịch sử di cư cộng đồng mạng Đài Loan](/vi/technology/taiwan-online-community-migration) — Từ BBS đến Discord qua các thế hệ
- [Mini Taiwan Pulse](/vi/technology/mini-taiwan-pulse-civic-tech) — Mô hình mã nguồn mở cá nhân trong công nghệ công dân, 6 tuần 193 commits biến dữ liệu mở thành quỹ đạo ánh sáng 3D
- [Đại Vũ Song Kiếm](/vi/technology/softstar-twin-classics) — Một câu chuyện khác về Đài Loan "làm nên điều vượt ngoài quy mô bằng nhiệt huyết" (RPG được sinh ra từ trung tâm thương mại Quang Hoa)
- [Không vào hầm thì không ngủ được](/vi/technology/into-the-cellar-taiwan-game-podcast) — Cộng đồng người chơi 6 triệu thành viên phát triển tại ký túc xá Đại học Trung Trung
