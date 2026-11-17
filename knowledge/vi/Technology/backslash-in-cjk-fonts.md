---
title: 'Dấu gạch chéo trong chữ "Công": Hai tầng thuế mặc định mà các kỹ sư Đài Loan phải trả hàng ngày'
description: 'Trên Windows 11 ngôn ngữ zh-TW, tập lệnh trạng thái dịch thuật đã đưa hơn bốn nghìn đường dẫn quét được vào thư mục gốc (root), khiến Technology bằng 0. Trong khi đó, CI trên Linux trong tuần đó lại báo xanh. Tập lệnh dùng dấu gạch chéo để phân loại tên, còn ổ đĩa dùng dấu gạch chéo ngược, không thể tách ra. Một tầng cũ hơn còn ẩn sâu trong ký tự: byte thứ hai của "Công" trong Big5 chính là dấu gạch chéo ASCII, và cộng đồng phát triển gọi nó là Hứa Công Cái. Cách viết đường dẫn, ký tự bên trong chữ, giá trị mặc định đều chưa tính đến chiếc máy này. Git''s quotePath là một tuyến khác, nguyên nhân cũng khác nhau.'
date: 2026-08-13
category: 'Technology'
tags:
  [
    'phần mềm nguồn mở',
    'Windows',
    'Big5',
    'UTF-8',
    'mã hóa ký tự',
    'tiếng Trung phồn thể',
  ]
subcategory: '文字與工具'
author: 'Taiwan.md Contributors'
featured: false
lastVerified: 2026-08-13
lastHumanReview: false
image: '/article-images/technology/big5-gong-5c-backslash.webp'
imageAlt: 'Bên cạnh chữ "Công" lớn là hai ô của mã Big5 A5 và 5C; ô 5C được mũi tên chỉ vào dấu gạch chéo ASCII 0x5C; bên dưới là kết quả xuất thực tế của Python, byte thứ hai của ba ký tự Hứa Công Cái đều là dấu gạch chéo'
imageCredit: 'Taiwan.md Contributors（自製圖解）· CC BY-SA 4.0'
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'Technology/功字裡的那根反斜線.md'
sourceCommitSha: 'ef8369eef'
sourceContentHash: 'sha256:dbee36211f1b2080'
sourceBodyHash: 'sha256:cfc0fe9c1ed37efb'
translatedAt: '2026-11-05T08:10:41.962330+00:00'
---

> **Tóm tắt trong 30 giây:** Tôi chạy tập lệnh trạng thái dịch thuật, màn hình hiển thị 4546, tất cả nằm trong `root`. CI trên GitHub với Linux báo xanh. Sau đó tôi mới nhìn rõ hai điều. Dấu gạch chéo ngược của đường dẫn Windows, tập lệnh không thể tách bằng dấu gạch chéo. Phần sau của mã Big5 "Công", bản thân nó chính là dấu gạch chéo ASCII `\`. Hai cơ chế khác nhau nhưng thường xuất hiện cùng nhau trên một máy Windows tiếng Trung phồn thể.

Tôi đang bảo trì tập lệnh trạng thái dịch thuật của Taiwan.md trên Windows 11 ngôn ngữ zh-TW. Tối hôm đó, tôi chạy `i18n-status.py` như thường lệ, chờ terminal in ra con số. Main console là cp950. Không có chữ đỏ nào được xuất ra.

Màn hình dừng lại ở 4546. Tất cả đều nằm trong một thư mục tên là `root`. Technology bằng 0.

Trong tuần đó, khi đẩy lên GitHub, CI trên Linux báo đèn xanh.

Biến của tập lệnh tên là `zh_articles`, nó quét các đường dẫn dưới `knowledge` ngoại trừ các thư mục tiếng Anh, about và gạch ngang. Tiếng Nhật, tiếng Hàn, tiếng Ả Rập cũng bị tính vào. Tối hôm đó, nó thậm chí không thể tách được tên thư mục, hơn bốn nghìn đường dẫn đã bị nhét vào cùng một ô. Không có ngoại lệ, không có cảnh báo. Thống kê trông như cả trang web bị hỏng, nhưng số lượng tệp thì không thiếu cái nào[^8].

Đường dẫn trên ổ đĩa là `knowledge\Technology\bài_viết_nào.md`, các thư mục được phân cách bằng dấu gạch chéo ngược. Tập lệnh sử dụng `split('/')` để lấy tên thư mục. Trên Linux, dòng này hoạt động vì đường dẫn vốn đã dùng dấu gạch chéo. Trên Windows, nó không thể tách dấu gạch chéo ngược, toàn bộ đường dẫn trả về nguyên trạng, bài viết bị ném vào thư mục mặc định là `root`[^1].

Sau khi thay đổi để `pathlib` xử lý thư mục, dưới Technology có 59 bài, khớp với nội dung trong thư mục. Giữa chúng chỉ tồn tại một giả định: máy của bạn dùng loại dấu nào để phân chia thư mục.

![Kết quả xuất thực tế trên terminal Python: đường dẫn Windows được tách bằng split('/') trả về danh sách chỉ có một phần tử; giao cho PureWindowsPath(p).parts, tách ra ba phần knowledge, Technology và tên tệp](/article-images/technology/windows-path-split-vs-pathlib.svg)

_Cùng một đường dẫn, hai cách tách. `split('/')` không tìm thấy dấu gạch chéo, toàn bộ trả về nguyên trạng; `PureWindowsPath` nhận ra dấu gạch chéo ngược, mới trả về được Technology. Được tự chế tạo bởi các Cộng tác viên Taiwan.md, CC BY-SA 4.0._

> **📝 Ghi chú của Biên tập viên:** Cú pháp của tập lệnh không sai, CI cũng đã chạy thử nghiệm. Điểm rạn nứt nằm giữa "chiếc máy mà tác giả thực sự ngồi" và "chiếc máy mà công cụ tưởng bạn đang ngồi". Vết rách này không thuộc về bất kỳ khâu nào, nên không ai chịu trách nhiệm theo dõi.

## Dấu gạch chéo trong chữ "Công"

Đường dẫn là tầng thứ nhất. Tầng thứ hai cũ hơn nhiều, được chôn giấu trong ký tự.

Big5 được định đoạt vào năm 1984, một ký tự Trung Quốc dùng hai byte. Nếu byte thứ hai rơi vào khoảng `0x40` đến `0x7E`, nó sẽ trùng với các ký hiệu thông dụng của ASCII: `[`、`]`、`{`、`}`、`\`、`|`. Phó giáo sư quản lý thông tin tại Đại học Công nghệ Triều Dương (Hồng Triều Quý, nghỉ hưu năm 2023) đã viết trên trang giảng dạy: "Vì 40-7E là phạm vi mã ASCII của các ký tự thông dụng, đôi khi nó gây ra một số rắc rối cho lập trình viên."[^2]

Mã của chữ "Công" là `A5 5C`. Phần sau đó, `0x5C`, trong ASCII chính là dấu gạch chéo `\`. Một chương trình quét chuỗi theo từng byte, coi `\` là ký tự thoát hoặc ký tự phân cách, khi quét đến nửa sau của "Công", sẽ nhầm tưởng mình gặp một đường dẫn. Tên tệp có chứa "Công", đường dẫn có chứa "Công", đều có thể vấp ngã ở đây.

Giới phát triển Đài Loan và Hồng Kông gọi nó là "Hứa Công Cái": "Hứa" là `B3 5C`, "Công" là `A5 5C`, "Cái" là `BB 5C`, ba ký tự thông dụng viết liền nhau giống như một tên người.[^5] Hồng Triều Quý còn liệt kê "Gia Dã Trình Công", với các byte thứ hai lần lượt va vào `[`、`]`、`{`、`}`、`\` và đã tạo ra công cụ quét `b5tm`[^2]. Một lỗi lập trình bị đặt tên theo người, thường là vì nó xuất hiện quá thường xuyên, đến mức một thế hệ phải có cách để nói về nó.

Năm 2015, tác giả blog "Dark Thread" chuyển sang Visual Studio 2015. Các tệp `.cs` cũ vẫn được lưu bằng BIG5. Sau khi trình biên dịch chuyển sang Roslyn, chữ Hứa Công Cái trong tệp trở thành lỗi biên dịch.

Hai ngày sau, đồng nghiệp nói với anh ta rằng họ cũng bị kẹt rất lâu, cuối cùng phải tìm lại bài viết của anh ta. Có một cư dân mạng có hàng nghìn tệp, chuyển đổi xong vẫn còn rất nhiều, "chỉ đành nói lời tạm biệt với VS2015". Anh ta sau đó đã viết một công cụ nhỏ để chuyển đổi hàng loạt sang UTF-8 vì không thể tự lưu thủ công[^7].

Điều này khác với `split('/')` ở trên. Một là giả định của công cụ hiện đại về hình dạng đường dẫn. Hai là ký hiệu được chứa trong cơ thể chữ từ bốn mươi năm trước khi chọn hai byte. Cơ chế khác nhau, nhưng hóa đơn lại thường đến cùng một máy cp950. Cách đưa chữ vào máy tính ở phía nhập liệu xem [Phương pháp nhập ký tự Đông Á](/vi/technology/east-asian-input-methods/). Ở đây nói về việc công cụ có nhận ra nó hay không sau khi chữ đã nằm trên đĩa.

## Giá trị mặc định chưa tạo nhánh cho chiếc máy này

Git mặc định bật `core.quotePath`. Các tên tệp có byte lớn hơn `0x80`, `git status` sẽ in thành chuỗi thoát hệ bát phân như `\344\270\255`. Tên tệp tiếng Trung vẫn còn, bạn chỉ là không hiểu những gì kho lưu trữ của mình đang nói mỗi ngày[^3]. Nó thoát ra các byte cao của UTF-8. Big5 `0x5C` là một tuyến khác. Trông có vẻ giống dấu gạch chéo, nhưng nguyên nhân thì khác nhau.

![Kết quả xuất thực tế trên terminal: git status --short in tiếng Trung bản này được in thành chuỗi thoát hệ bát phân có ngoặc kép; sau khi thêm -c core.quotePath=false, cùng một tên tệp được in bằng tiếng Trung](/article-images/technology/git-quotepath-octal-cjk.svg)

_Cùng một tệp, dưới giá trị mặc định là một chuỗi `\345\212\237`. Dấu gạch chéo ở đây là sự thoát ra do Git thêm vào, không liên quan đến `0x5C` trong chữ "Công". Được tự chế tạo bởi các Cộng tác viên Taiwan.md, CC BY-SA 4.0._

Trong Python 3 trên Windows nếu `open()` không ghi `encoding='utf-8'`, nó có thể sử dụng ngôn ngữ hệ thống. Một tệp UTF-8 giống nhau, Linux đọc được, nhưng máy này dùng cp950 để giải mã thì dấu câu hoặc chú âm sẽ bị hỏng[^4]. Tôi đã từng trả giá một lần: dùng `Get-Content | Set-Content` của PowerShell 5.1 để sửa tệp thành UTF-8, dấu gạch ngang dài trên diff trở thành `??`. Đó cũng là thuế mặc định, không phải chủ đề thứ hai.

Khi thông báo trạng thái có emoji, terminal cp950 này sẽ bị sập ngay lập tức. Bộ ký tự không có các ký hiệu đó, Python không thể in ra, ngoại lệ nổ ở tầng cao nhất. CI trên Linux không phát hiện ra chuyện này, vì nó không chạy trên chiếc máy này.

Git, Python, ví dụ đường dẫn trong CI `$HOME/project/src`, đã không tạo một nhánh riêng cho Windows zh-TW.

Hồng Triều Quý được iThome phỏng vấn năm 2015, nói về việc nên dùng định dạng nào để mở tệp của chính phủ và nó có thể tồn tại bao lâu. Bài báo truyền đạt ý kiến của ông: nếu chính phủ chỉ sử dụng các sản phẩm Microsoft để mở dữ liệu tệp, tức là tin vào tuổi thọ của Microsoft sẽ dài hơn Trung Hoa Dân Quốc[^6]. Câu đó nói về định dạng tệp và thời hạn lưu trữ. Dữ liệu bị ràng buộc vào bộ công cụ mặc định nào thì khi thời gian kéo dài ra, sẽ thành ai còn đọc được. Hợp tác mã nguồn mở gắn với môi trường mặc định của một loại máy nào đó. Sự giằng co giữa khoa học công dân và định dạng tệp chính phủ xem [Cộng đồng nguồn mở và g0v](/vi/technology/open-source-and-g0v/). Văn hóa hấp thụ sự chênh lệch này trong thời gian dài của các nhà phát triển Đài Loan, xem [Tinh thần nguồn mở Đài Loan](/vi/technology/taiwan-open-source-spirit/).

Ký tự phân cách đường dẫn, mã hóa terminal, `$HOME` trong ví dụ CI, đều không tạo nhánh riêng cho chiếc máy này. Vào ngày 4546 đường dẫn bị xếp vào sai loại, không có dòng lệnh nào báo lỗi. Thống kê trông bình thường, cho đến khi bạn ngồi trước chiếc máy này.

## Đọc thêm

- [Tinh thần nguồn mở Đài Loan](/vi/technology/taiwan-open-source-spirit): Văn hóa và bối cảnh các nhà phát triển Đài Loan tham gia mã nguồn mở.
- [Phương pháp nhập ký tự Đông Á](/vi/technology/east-asian-input-methods): Chữ được gõ vào máy tính như thế nào, từ bảng mã đến bàn phím.
- [Cộng đồng nguồn mở và g0v](/vi/technology/open-source-and-g0v): Sự hợp tác giữa dữ liệu mở và định dạng chính phủ.

## Nguồn hình ảnh

- **Mã Big5 của "Công" và dấu gạch chéo (hero)**: Hình minh họa tự chế tạo bởi các Cộng tác viên Taiwan.md, CC BY-SA 4.0, lưu tại `public/article-images/technology/big5-gong-5c-backslash.webp`. Dòng bên dưới là kết quả thực tế của Python 3 thực thi `'許功蓋'.encode('big5')`, mã vị khớp với mục Big5 trên Wikipedia[^5].
- **split('/') và PureWindowsPath**: Tự chế tạo bởi các Cộng tác viên Taiwan.md, CC BY-SA 4.0, lưu tại `public/article-images/technology/windows-path-split-vs-pathlib.svg`. Nội dung là kết quả thực tế của Python 3; `PureWindowsPath` tách đường dẫn theo quy tắc Windows trên bất kỳ hệ điều hành nào, nên không cần máy Windows cũng có thể tái hiện.
- **Xuất hệ bát phân của Git core.quotePath**: Tự chế tạo bởi các Cộng tác viên Taiwan.md, CC BY-SA 4.0, lưu tại `public/article-images/technology/git-quotepath-octal-cjk.svg`. Nội dung là kết quả thực tế của `git status --short` sau khi thêm tên tệp này vào repo tạm thời; hành vi này không liên quan đến hệ điều hành.

## Tài liệu tham khảo

[^1]: [Microsoft Learn: Định dạng đường dẫn hệ thống Windows](https://learn.microsoft.com/zh-tw/dotnet/standard/io/file-path-formats) — Tài liệu .NET giải thích rằng DOS truyền thống sử dụng dấu gạch chéo ngược làm ký tự phân cách thư mục, và dấu gạch chéo sẽ được chuyển thành dấu gạch chéo ngược.

[^2]: [Hồng Triều Quý: Các vấn đề mã Big-5 khi lập trình](https://frdm.cyut.edu.tw/~ckhung/b/pl/big5.php) — Trang giảng dạy liệt kê các từ thông dụng có byte thứ hai rơi vào vùng nguy hiểm của ASCII (Gia Dã Trình Công), và giới thiệu công cụ quét b5tm. Cuối trang không ghi chức danh. Năm 2015, iThome gọi ông là phó giáo sư. Trang chủ đề cập đến việc làm tại Quản lý thông tin Triều Dương từ năm 1997 đến 2023 và nghỉ hưu vào tháng 8 năm 2023.

[^3]: [git-config: core.quotePath](https://git-scm.com/docs/git-config) — Tài liệu chính thức giải thích rằng mặc định sẽ hiển thị các đường dẫn có byte lớn hơn 0x80 dưới dạng chuỗi thoát hệ bát phân.

[^4]: [Python 3: open()](https://docs.python.org/3/library/functions.html#open) — Mô tả hàm chỉ ra rằng nếu không chỉ định encoding, nó có thể sử dụng ngôn ngữ hệ thống làm mã hóa mặc định.

[^5]: [Wikipedia: Big5](https://zh.wikipedia.org/zh-tw/大五碼) — Liệt kê "Công" là 0xA55C, "Hứa" là 0xB35C, "Cái" là 0xBB5C, và giải thích vấn đề này được gọi đùa là Hứa Công Cái.

[^6]: [iThome: Phỏng vấn Hồng Triều Quý](https://www.ithome.com.tw/news/93606) — Phỏng vấn năm 2015, bài viết gọi ông là phó giáo sư khoa quản lý thông tin tại Đại học Công nghệ Triều Dương. Câu "tuổi thọ của Microsoft sẽ dài hơn Trung Hoa Dân Quốc" chỉ được trích dẫn từ báo cáo có thể thấy qua kết quả tìm kiếm, không coi đó là lời nói nguyên văn.

[^7]: [Dark Thread: Giải quyết vấn đề tương thích BIG5 tệp chương trình VS2015](https://blog.darkthread.net/blog/big5-utf8-source-code-batch-converter/) — Ghi lại năm 2015 về việc biên dịch mã nguồn BIG5 của Visual Studio 2015, Hứa Công Cái gây ra lỗi biên dịch. Bài viết có câu "chỉ đành nói lời tạm biệt với VS2015".

[^8]: [taiwan-md PR #1260](https://github.com/frank890417/taiwan-md/pull/1260) — Gộp vào ngày 26/07/2026. Trước khi sửa, categories trên Windows chỉ còn root: 4546, sau khi sửa Technology zh: 59. Đồng thời loại bỏ emoji gây sập terminal cp950.
