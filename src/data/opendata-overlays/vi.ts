import type { DeepPartial, OpendataContent } from '../opendata-content';

export const vi: DeepPartial<OpendataContent> = {
  meta: {
    title:
      'Tuyển chọn dữ liệu mở — Hướng dẫn tầng ý nghĩa cho dữ liệu mở của Đài Loan × Twinkle Hub',
    description:
      'Năm mươi nghìn bộ dữ liệu chính phủ sẽ làm ngợp bất kỳ ai. Trang này là phần tuyển chọn dữ liệu của Taiwan.md: bộ dữ liệu nào đáng xem, cần kết hợp chúng ra sao khi muốn phân tích một vấn đề, và mỗi nhóm con số nối với những câu chuyện nào trên hòn đảo này. Kèm đánh giá trực tiếp, qua dùng thực tế, về độ đầy đủ, độ ổn định và mức đơn giản hoá truy cập của Twinkle Hub.',
  },
  hero: {
    eyebrow: 'TUYỂN CHỌN DỮ LIỆU MỞ',
    title: 'Tuyển chọn dữ liệu mở',
    subtitle:
      'Hướng dẫn tầng ý nghĩa cho dữ liệu mở của Đài Loan × Twinkle Hub',
    intro: [
      'Nền tảng dữ liệu mở của chính phủ Đài Loan hiện có hơn năm mươi hai nghìn bộ dữ liệu. Con số đó làm ngợp bất kỳ ai thật sự muốn dùng: không biết bộ nào quan trọng, được cập nhật đến đâu, hai bảng nào ghép được với nhau, càng không biết chúng liên quan gì đến câu hỏi mình quan tâm.',
      'Taiwan.md đã viết hơn một nghìn một trăm bài về Đài Loan, và đằng sau mỗi bài là một phán đoán: nên dùng dữ liệu nào để kiểm chứng điều này? Trang này mở tầng phán đoán đó ra: chúng tôi đánh giá hạ tầng dữ liệu thế nào, khi phân tích một vấn đề thì kết hợp những bộ dữ liệu nào và kết hợp ra sao, và mỗi lĩnh vực dữ liệu nối với những câu chuyện nào trên hòn đảo này.',
    ],
    viz: {
      stats: [
        { label: 'bộ dữ liệu chính phủ (2026-10-23)' },
        { label: 'bản án toàn văn' },
        { label: 'câu hỏi thi quốc gia' },
        { label: 'dòng phân tích dinh dưỡng' },
        { label: 'hồ sơ mua sắm công' },
      ],
      graphHint:
        'Mạng lưới bên dưới là thật: bên trái là 20 lĩnh vực dữ liệu và năm kho ngữ liệu chuyên ngành (lấy từ lần thu thập Twinkle Hub); bên phải là các bài Taiwan.md đã viết. Mỗi đường nối là một phán đoán tuyển chọn trên trang này. Kéo và rê chuột để xem dữ liệu bề bộn nối với những câu chuyện rõ ràng ra sao.',
      legend: {
        domain: 'Lĩnh vực dữ liệu',
        vertical: 'Kho ngữ liệu chuyên ngành',
        article: 'Bài viết Taiwan.md',
        center: 'Tầng ý nghĩa Taiwan.md',
      },
    },
  },
  ecosystem: {
    title: 'Bản đồ hệ sinh thái: ba tầng, mỗi tầng giữ một việc',
    lead: 'Để một AI (hay một con người) thật sự trả lời được câu hỏi về Đài Loan, ba tầng phải phối hợp: nơi chứa dữ liệu, đường truy vấn, và tầng ý nghĩa.',
    layers: [
      {
        name: 'data.gov.tw và hệ thống của các cơ quan',
        role: 'Nơi chứa dữ liệu (nguồn gốc duy nhất)',
        desc: 'Nền tảng dữ liệu mở của chính phủ là danh tính lâu dài của từng bộ dữ liệu: mã bộ dữ liệu, điều khoản cấp phép, cơ quan phụ trách, bản tải gốc. Mọi trích dẫn cuối cùng đều phải truy về đây.',
        stat: 'hơn 52.000 bộ dữ liệu (2026-10-23)',
      },
      {
        name: 'Twinkle Hub',
        role: 'Đường truy vấn (cổng MCP)',
        desc: 'Trung tâm MCP đầu tiên của Đài Loan, gói dữ liệu rải rác trên hàng trăm cổng thông tin chính phủ vào một điểm truy vấn duy nhất: tìm kiếm ngữ nghĩa, truy vấn từng dòng có cấu trúc, và công cụ cho năm lĩnh vực chuyên ngành. AI lấy được dữ liệu trong một lần gọi, khỏi phải lội qua từng cổng thông tin.',
        stat: '21 công cụ · 20 lĩnh vực',
      },
      {
        name: 'Taiwan.md',
        role: 'Tầng ý nghĩa (tuyển chọn)',
        desc: 'Dữ liệu không tự lên tiếng. Bộ dữ liệu nào đáng chỉ ra, nó kiểm chứng nhận định nào, nó nối với đoạn lịch sử nào — đó là việc tuyển chọn. Từ tháng 6/2026, các bài của chúng tôi lần lượt có mục "Dữ liệu công khai", nối câu chuyện với dữ liệu gốc.',
        stat: '1.100+ bài viết · 15 chỉ dẫn dữ liệu đã hoạt động',
      },
    ],
  },
  assessment: {
    title: 'Đánh giá ba chiều: những gì chúng tôi thấy qua thử nghiệm thực tế',
    lead: 'Dưới đây là đánh giá trực tiếp của Taiwan.md với tư cách người dùng, thực hiện bằng công cụ kiểm chứng của chính chúng tôi (hai đợt thử nghiệm, tháng 5 và tháng 6/2026), trình bày theo ba chiều. Đây không phải quảng cáo; đây là một lần khám sức khoẻ.',
    gapsLabel: 'Những chỗ còn thiếu, nói thẳng',
    dims: [
      {
        name: 'Độ đầy đủ của dữ liệu',
        verdict: 'Độ phủ là thật, và vượt ra ngoài việc sao chép',
      },
      {
        name: 'Độ ổn định',
        verdict: 'Đúng với bản chất alpha: chạy nhanh, đổi cũng nhanh',
      },
      {
        name: 'Đơn giản hoá truy cập',
        verdict: 'Đây là mặt mạnh nhất của nó',
      },
    ],
  },
  verticals: {
    title: 'Năm kho ngữ liệu chuyên ngành: phần vượt ra ngoài việc sao chép',
    lead: 'Bọc bộ dữ liệu trong một giao diện tìm kiếm thì không có gì đặc biệt; năm lĩnh vực chuyên ngành này bổ sung truy xuất ngữ nghĩa và trích xuất có cấu trúc — phần khiến Twinkle Hub vượt ra ngoài vai trò "bản sao của data.gov.tw".',
    logNote:
      'Thanh quy mô dùng thang logarit: kho bản án gấp 17 lần kho giấy phép thuốc, nếu vẽ tuyến tính thì bốn thanh còn lại sẽ bị ép đến mức không thấy.',
    items: [
      {
        name: 'Sáng chế',
        stat: 'Toàn văn sáng chế đã công bố của TIPO',
        desc: 'Truy vấn kho sáng chế bằng ngôn ngữ tự nhiên, lấy được cả mô tả kỹ thuật và yêu cầu bảo hộ đầy đủ. Khi viết về các ngành của Đài Loan, câu hỏi "công ty này có thật sự nắm công nghệ đó không" lần đầu có thể kiểm chứng bằng tìm kiếm ngữ nghĩa.',
      },
      {
        name: 'Kỳ thi quốc gia',
        stat: '64.815 bộ đề · 320.000 câu hỏi (2012–2025)',
        desc: 'Đề thi của Bộ Khảo thí qua các năm, tra cứu được đến từng câu hỏi. Văn hoá thi công chức của Đài Loan — cơn sốt vào biên chế, những con phố lò luyện thi — là câu chuyện chưa ai kể bằng dữ liệu.',
      },
      {
        name: 'Bản án',
        stat: 'khoảng 1,24 triệu bản ghi (2024-05 đến 2026-03, alpha)',
        desc: 'Truy xuất kho bản án bằng ngôn ngữ thường ngày. Với các bài về tư pháp, tranh chấp lao động và xung đột thuê nhà, câu hỏi "toà án xử thực tế ra sao" giờ đã có một cửa vào kiểm chứng được.',
      },
      {
        name: 'Thuốc và y tế',
        stat: '71.836 giấy phép thuốc · 96.803 mã ICD-10 tiếng Trung',
        desc: 'Giấy phép thuốc, các trường có cấu trúc trong tờ hướng dẫn sử dụng, chứng nhận thực phẩm chức năng và sàng lọc sơ bộ tương tác thuốc. Tầng dữ kiện cho các bài về bảo hiểm y tế toàn dân và y học.',
      },
      {
        name: 'Dinh dưỡng thực phẩm',
        stat: '226.825 dòng phân tích dinh dưỡng',
        desc: 'Cơ sở dữ liệu thành phần dinh dưỡng thực phẩm của Bộ Y tế và Phúc lợi: hơn hai mươi chất dinh dưỡng cho mỗi nguyên liệu, xếp hạng theo chất, cộng dồn theo bữa ăn. Nền số liệu cho các bài về chợ đêm và ẩm thực.',
      },
    ],
  },
  domains: {
    title: 'Hai mươi lĩnh vực dữ liệu × bản đồ câu chuyện của Taiwan.md',
    lead: 'Bên trái là các nhóm lĩnh vực của Twinkle Hub (lấy từ lần thu thập); bên phải là cách chúng tôi ánh xạ: dữ liệu của mỗi lĩnh vực nối với những bài nào trên hòn đảo này. Với lĩnh vực đánh dấu "Câu chuyện chưa được viết", các bộ dữ liệu chủ chốt và lộ trình phân tích đã được tuyển chọn xong nhưng bài viết thì chưa có: đó là bản đồ phát triển của chúng tôi, và là lời mời mở cho ai muốn viết.',
    questionsLabel: 'Câu hỏi điển hình',
    articlesLabel: 'Bài liên quan',
    blankLabel: 'Câu chuyện chưa được viết',
    proposedStoryLabel: 'Câu chuyện có thể trở thành',
    proposedHowLabel: 'Cách phân tích',
  },
  recipes: {
    title:
      'Công thức phân tích: dùng dữ liệu nào, kết hợp ra sao, để hiểu một việc',
    lead: 'Đây là trọng tâm của trang. Mỗi thẻ là một câu hỏi phân tích có thật: dùng những bộ dữ liệu nào, ghép chúng bằng khoá gì, đọc chúng bằng phương pháp nào, và bài nào đã biến phân tích đó thành câu chuyện.',
    combineLabel: 'Cách kết hợp',
    methodLabel: 'Cách phân tích tốt nhất',
    articlesLabel: 'Các bài đã viết',
    items: [
      {
        question:
          'Công bằng nhà ở: những căn nhà giá rẻ do nhà nước xây — rốt cuộc ai là người hưởng lợi?',
      },
      {
        question:
          'Chuyển dịch năng lượng: điện hạt nhân về không rồi khởi động lại — con số kể gì?',
      },
      {
        question:
          'Tài chính bảo hiểm y tế: ai dùng, ai đóng, và hệ thống trụ được thêm bao nhiêu năm?',
      },
      {
        question:
          'Chất lượng dân chủ: cử tri mỗi kỳ bầu cử đông đến đâu, và việc thực thi pháp luật gắt gao đến mức nào?',
      },
      {
        question:
          'Kinh tế vỉa hè: sản lượng của 230.000 gian hàng rong thực ra được tính thế nào?',
      },
      {
        question:
          'An toàn giao thông: 14 triệu xe máy liên quan gì đến ba nghìn người chết mỗi năm?',
      },
    ],
  },
  method: {
    title: 'Phương pháp ghép: những khoá giúp hai bảng khớp nhau',
    lead: 'Một bộ dữ liệu đơn lẻ chỉ là một chấm; kết hợp mới thành mạng lưới. Đây là những manh mối ghép hữu ích nhất mà thử nghiệm của chúng tôi tìm ra.',
    spectrum: {
      title:
        'Tần suất cập nhật = độ phân giải của phân tích: phổ của mười lăm bộ dữ liệu tiêu biểu',
      left: '← Cập nhật hằng tháng: có thể nghiên cứu theo sự kiện',
      right: 'Năm năm một lần: chỉ so sánh giữa các kỳ →',
      note: 'Mỗi chấm là một bộ dữ liệu được trích trên trang này; rê chuột để xem tên. Trước khi thiết kế phân tích, hãy xem dữ liệu của bạn nằm ở đầu nào của phổ.',
    },
    items: [
      { name: 'Mã đơn vị hành chính' },
      { name: 'Mã số doanh nghiệp' },
      { name: 'Toạ độ và mã trạm' },
      { name: 'Hạng chất lượng' },
      { name: 'Tần suất cập nhật chính là độ phân giải phân tích' },
      { name: 'Nguyên tắc con trỏ kép' },
    ],
  },
  tools: {
    title: 'Danh mục công cụ: toàn bộ 21 công cụ',
    lead: 'Lấy trực tiếp từ điểm cuối MCP (lần thu thập gần nhất thành công ghi ở cuối trang). Cách phân nhóm là của chúng tôi.',
    groups: [
      { label: 'Bộ bốn công cụ lõi về bộ dữ liệu + chỉ mục lĩnh vực' },
      { label: 'Sáng chế' },
      { label: 'Kỳ thi quốc gia' },
      { label: 'Bản án' },
      { label: 'Thuốc và mã y tế' },
      { label: 'Dinh dưỡng thực phẩm' },
    ],
  },
  footer: {
    crawledLabel:
      'Danh sách công cụ và lĩnh vực trên trang này được thu thập lần gần nhất thành công vào',
    note: 'Twinkle Hub đang ở giai đoạn alpha, và phần đánh giá trên trang này sẽ được cập nhật khi nó tiến hoá. Hiện Taiwan.md không có bất kỳ quan hệ thương mại nào với Twinkle Hub; trang này là lần khám sức khoẻ trực tiếp của một người dùng nặng — và là một lời mời: chỉ khi tầng dữ liệu và tầng ý nghĩa cùng làm việc thì Đài Loan mới được hiểu trọn vẹn.',
    pilotTitle: 'Các bài đã nối với tầng dữ liệu',
    pilotLead:
      'Từ tháng 6/2026, chúng tôi thêm mục "Dữ liệu công khai" ở cuối bài: mỗi mục liệt kê các bộ dữ liệu có thể kiểm chứng (hoặc bác bỏ) nhận định trong bài, kèm một dòng giải thích vì sao chỉ dẫn đó có mặt. Đợt đầu gồm sáu bài:',
  },
};
