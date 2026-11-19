/**
 * 四展廳的策展散文：越南文 版。
 *
 * 2026-11-19 從中文版（zh-TW.ts，經哲宇同意改版後的定稿）直譯，沒有經過英文轉譯。
 * 之後中文版改數字或說法，這份要跟著重翻。
 *
 * 格式見 ../types.ts：每段一個字串， [[…]] 標出主題藥丸（連到 category 那個分類）。
 */
import type { HallProse } from '../types';

const halls: HallProse[] = [
  {
    numeral: 'I',
    title: 'Hòn đảo này trông như thế nào',
    paragraphs: [
      {
        category: 'geography',
        text: `Đài Loan chỉ rộng khoảng 36,000 km², vậy mà từ mực nước biển đã vươn lên tới 3,952 mét. Đỉnh cao nhất là Ngọc Sơn (Yushan): người Bunun gọi là Tongku Saveq, người Tsou gọi là Patungkuonʉ, nghĩa là "ngọn núi phát sáng". Mỗi năm, mảng Biển Philippines ép vào mảng Âu-Á khoảng 8 cm, nâng lên trên mảnh đất này hơn hai trăm ngọn núi cao trên 3,000 mét. [[🗺️ Địa lý Đài Loan]] vẫn đang cao thêm. Chí tuyến Bắc đi qua Chiayi; trong cùng một ngày, bạn có thể lái xe từ bãi biển nhiệt đới Kenting lên núi Hehuan để thấy sương giá và tuyết.`,
      },
      {
        category: 'nature',
        text: `Danh mục loài ở Đài Loan đã ghi nhận hơn 60,000 loài. Cá hồi sakura (櫻花鉤吻鮭) năm 1995 chỉ còn hơn 200 cá thể; sau khi dỡ đập và phục hồi, những năm gần đây số lượng giữ ở mức trên 15,000 con. Gấu đen Đài Loan, theo ước tính đầu năm 2026 của Cơ quan Lâm nghiệp và Bảo tồn Thiên nhiên (Lâm Bảo Thự), vào khoảng 1,200 con. [[🌿 Thiên nhiên Đài Loan]] xếp chồng các vành đai thực vật, từ rạn san hô dưới đáy biển, qua vùng nhiệt đới, lên tới cận hàn đới. Ở đầu nguồn sông Đại An còn đứng một cây Đài Loan sam (Taiwania) cao 84.1 mét; chính vì mọc nơi con người không với tới, nó đã thoát khỏi đợt khai thác gỗ quy mô lớn.`,
      },
      {
        category: 'lifestyle',
        text: `Đài Loan có hơn 14,000 cửa hàng tiện lợi, trung bình khoảng 1,700 người dùng chung một cửa hàng. Đóng tiền điện nước, nhận bưu kiện, mua vé tàu cao tốc, photo luận văn tốt nghiệp, tất cả đều xong ở cùng một quầy. [[🏠 Đời sống người Đài Loan]] cũng bám theo những giờ giấc cố định: chiều tối, đầu ngõ vang lên bản "Für Elise", cả con phố xách rác đã phân loại ra cửa. Bước vào hẻm nhỏ, bà cụ vẫn hỏi bạn câu "Ăn cơm chưa?".`,
      },
    ],
  },
  {
    numeral: 'II',
    title: 'Hòn đảo này hình thành ra sao',
    paragraphs: [
      {
        category: 'history',
        text: `Năm 1624, người Hà Lan khởi công xây thành Zeelandia ở Đại Viên (Đài Nam). Bốn thế kỷ sau đó, Hà Lan, Tây Ban Nha, Minh Trịnh, nhà Thanh, Nhật Bản và Trung Hoa Dân Quốc lần lượt đến rồi đi, mỗi lần lại mang theo ngôn ngữ và luật lệ mới. [[📜 Lịch sử Đài Loan]] cũng có thể đọc bằng một chủ ngữ khác. Năm 1990, Tào Vĩnh Hòa (Tsao Yung-ho) đề xướng "Đài Loan đảo sử", chuyển ánh nhìn từ các chính quyền đến rồi đi sang những con người vẫn luôn sống ở đây. Năm 1996, 10.88 triệu người bước vào phòng bỏ phiếu, lần đầu tiên trực tiếp bầu tổng thống của mình, vào năm thứ chín sau khi lệnh thiết quân luật được dỡ bỏ.`,
      },
      {
        category: 'culture',
        text: `Đài Loan có 17 dân tộc bản địa được pháp luật công nhận; dân tộc mới nhất là người Siraya, được công nhận năm 2026. Người Mân Nam mang đến Mã Tổ, người Hakka mang đến thần Nghĩa Dân, người ngoại tỉnh mang đến món màn thầu Sơn Đông trong các làng quân nhân (眷村), còn những cư dân mới và lao động di cư từ Đông Nam Á mang đến lễ Eid al-Fitr, kết thúc tháng Ramadan. [[🎭 Văn hóa Đài Loan]] chồng lên nhau từng lớp mà chẳng ai bị hòa tan. Lễ rước Mã Tổ Đại Giáp kéo dài chín ngày tám đêm, số người đi theo từ vài trăm nghìn đến hơn một triệu lượt; lễ chiến tế của người Tsou cũng được tổ chức vào mùa xuân ở Alishan.`,
      },
      {
        category: 'society',
        text: `Ngày 17 tháng 5 năm 2019, Lập pháp viện, căn cứ Giải thích số 748 của Hội đồng Đại pháp quan, thông qua luật riêng về hôn nhân đồng giới sau ba lần đọc, và Đài Loan trở thành quốc gia đầu tiên ở châu Á hợp pháp hóa hôn nhân đồng giới. Tháng 11 năm trước đó, cuộc trưng cầu dân ý vừa có 7.66 triệu người bỏ phiếu đồng ý để hôn nhân trong Dân luật chỉ giới hạn giữa một nam và một nữ. Một tuần sau, ngày 24 tháng 5, cả nước có 526 cặp đến cơ quan hộ chính (戶政事務所) đăng ký, cặp đầu tiên ở quận Annan, Đài Nam. [[⚖️ Xã hội Đài Loan]] đi tới giữa những giằng co như vậy: cãi nhau xong, vẫn cùng nhau xếp hàng mua bữa sáng.`,
      },
    ],
  },
  {
    numeral: 'III',
    title: 'Con người trên đảo đang làm gì',
    paragraphs: [
      {
        category: 'people',
        text: `Nghiêm Trường Thọ tốt nghiệp trung học, năm 23 tuổi vào American Express làm chân chạy việc, năm 28 tuổi đã làm tổng giám đốc khu vực Đài Loan. Lâm Thư Hào (Jeremy Lin) bị hai đội cắt hợp đồng trong 15 ngày, tháng 2 năm 2012 vào sân từ ghế dự bị, và bảy trận sau đó trung bình ghi 24.4 điểm. Trần Thụ Cúc năm 13 tuổi nhận sạp rau của mẹ, rồi quyên từng khoản tiền bán rau cho trường học, trại trẻ mồ côi và bệnh viện. [[👥 Nhân vật Đài Loan]] thường xuất phát từ một vị trí tưởng như chẳng có hồi tiếp theo; mỗi bước ngoặt khi ấy đều có thể đã không xảy ra.`,
      },
      {
        category: 'art',
        text: `Trong rạp chiếu bóng ở Đài Loan năm 1930, người trên màn ảnh không nói, còn người đứng cạnh màn ảnh thì nói. Những người thuyết minh phim câm (biện sĩ) Đài Loan dùng tiếng Đài lồng tiếng ứng khẩu cho phim câm, kể cả cốt truyện lẫn thời cuộc; cũng có người như Lô Bính Đinh, kể ở Chiayi, kể đến đâu chen bình luận chính trị đến đó, bị cảnh sát chặn lại ngay tại chỗ. [[🎨 Nghệ thuật Đài Loan]] cứ quay lại cùng một câu hỏi: dùng ngôn ngữ của ai, nói về chính mình ở đâu. Sau chiến tranh, Trần Thiên Vũ buộc phải gác lại tiếng Nhật, đến năm 1958 mới đăng bài thơ tiếng Trung đầu tiên dưới bút danh Hoàn Phu, và năm 1964 cùng bạn bè sáng lập Lạp thi xã (笠詩社). Năm 2008, phòng tập ở Bali của Vân Môn Vũ Tập (Cloud Gate) bị cháy; năm sau Vân Môn ký hợp đồng mảnh đất mới ở Đạm Thủy, và năm 2015 mái nhà mới hoàn thành ở đó.`,
      },
      {
        category: 'music',
        text: `Năm 1933, bài "Vọng xuân phong" của Đặng Vũ Hiền ra đời, dùng tiếng Đài hát nỗi lòng của một cô gái. Năm 1943, Kurosawa Takatomo thu âm bài Pasibutbut của người Bunun ở bộ lạc Kanding, Đài Đông; đến năm 1952, bản thu được gửi tới Hội đồng Âm nhạc Dân gian Quốc tế (IFMC), giới học thuật phương Tây mới chú ý đến nó. [[🎵 Âm thanh Đài Loan]] đi từ cổ ca bộ lạc, 898 bài hát bị cấm thời thiết quân luật, dân ca học đường, cho đến nhạc pop tiếng Hoa và giải Golden Melody (金曲獎). Sangpuy (桑布伊) hát tiếng Puyuma, A-bao (阿爆) hát tiếng Paiwan, Lý Trúc Tâm (李竺芯) hát tiếng Đài, lần lượt giành giải Album của năm không phân biệt ngôn ngữ.`,
      },
    ],
  },
  {
    numeral: 'IV',
    title: 'Hòn đảo này đi về đâu',
    paragraphs: [
      {
        category: 'technology',
        text: `Khoảng chín phần mười chip tiên tiến của thế giới được sản xuất ở Đài Loan. Mùa đông năm 1979, những thửa ruộng ở Kim Sơn Diện (Tân Trúc) bị máy ủi lật lên, và năm sau Khu Khoa học Tân Trúc ra đời. [[💻 Hòn đảo công nghệ]] khởi đầu từ thửa ruộng ấy; hơn bốn mươi năm sau, năm 2025, doanh thu cộng gộp của các khu khoa học Tân Trúc, miền Nam và miền Trung đạt 5.80 nghìn tỷ Đài tệ, và rất nhiều con chip trong điện thoại, laptop, ô tô xuất xứ từ đây. Cái giá phải trả là riêng TSMC đã dùng khoảng một phần mười lượng điện của cả Đài Loan, và con số còn đang tăng.`,
      },
      {
        category: 'economy',
        text: `Năm 1960, GDP bình quân đầu người của Đài Loan chỉ hơn 150 USD, thấp hơn cả Cộng hòa Dân chủ Congo; năm 2021 lần đầu vượt 30,000 USD. Trong khoảng đó không có dầu mỏ, cũng không có vùng hậu phương rộng lớn của một cường quốc. [[📈 Kinh tế Đài Loan]] trong sáu mươi năm ấy dựa vào hết doanh nghiệp vừa và nhỏ này đến doanh nghiệp khác. Gánh cả chặng đường này phần lớn là những ông chủ, công nhân nữ và thợ máy mà tên tuổi chẳng bao giờ lên bản tin.`,
      },
      {
        category: 'food',
        text: `Trong một tô mì bò có nền hầm đỏ kiểu Tứ Xuyên, vị ngọt của nước tương Đài Loan, và cả nỗi nhớ quê của những cựu binh năm 1949. Hai quán trà ở Đài Trung và Đài Nam đến nay vẫn mỗi nơi nói mình là bên đầu tiên cho trân châu vào trà sữa, và giờ đây năm châu lục đều có người nhai những viên trân châu dai giòn ấy. [[🍜 Hương vị Đài Loan]] có món bánh hàu chiên của người Mân Nam, lòng heo xào gừng của người Hakka, rượu kê của các dân tộc bản địa, nước mắm của những cư dân mới. Một chiếc bàn xếp ở chợ đêm có chỗ cho những người sống ở đây từ xưa hơn, và cũng có chỗ cho những người lần lượt cập bờ suốt bốn trăm năm.`,
      },
    ],
  },
];

export default halls;
