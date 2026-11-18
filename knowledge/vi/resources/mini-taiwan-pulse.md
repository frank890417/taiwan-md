---
title: 'Mini Taiwan Pulse — Trực quan hóa 3D giao thông Đài Loan thời gian thực'
description: 'Sử dụng dữ liệu mở để cảm nhận nhịp đập của Đài Loan — quỹ đạo ánh sáng của các chuyến bay vẽ qua bầu trời, tàu thuyền lướt qua mặt biển, tàu hỏa phóng trên đường ray, 23 lớp dữ liệu trình bày thời gian thực hơi thở của đảo quốc này.'
date: 2026-03-22
category: 'resources'
tags:
  [
    'tài nguyên',
    'dữ liệu mở',
    'trực quan hóa',
    'giao thông',
    '3D',
    'thời gian thực',
    'Taiwan.md',
  ]
subcategory: '公民科技'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-22
lastHumanReview: false
curation: 'incubating'
curationReason: 'unverified'
translatedFrom: 'resources/mini-taiwan-pulse.md'
sourceCommitSha: 'be13f045'
sourceContentHash: 'sha256:409b7d5c9d0f3bbd'
sourceBodyHash: 'sha256:215016d553b05404'
translatedAt: '2026-09-17T04:53:11.230562+00:00'
---

# Mini Taiwan Pulse — Trực quan hóa 3D giao thông Đài Loan thời gian thực 🌐

> 📖 **Bài viết chuyên sâu**: Tài nguyên này đã được nâng cấp thành bài nghiên cứu chuyên sâu về công nghệ công dân, xem bản đầy đủ tại [Mini Taiwan Pulse: Một nhà phân tích dữ liệu như thế nào vẽ nhịp đập giao thông Đài Loan thành đường sáng 3D hơi thở](/vi/technology/mini-taiwan-pulse-civic-tech) (2026-04-19). Trang này được giữ lại làm mục chỉ mục trong danh sách tài nguyên.

> **Tóm tắt 30 giây:** Một dự án mã nguồn mở biến động thái thời gian thực của giao thông vận tải Đài Loan thành các cầu sáng 3D và quỹ đạo sáng. Chuyến bay vẽ đường cong trên bầu trời, tàu thuyền để lại vết đuôi trên mặt biển, tàu hỏa lao trên ray đường sắt — 23 lớp có thể bật/tắt, để bạn «nhìn thấy» nhịp đập của Đài Loan.

## Tại sao đáng để quan tâm

Đa số người nhìn bản đồ Đài Loan, thấy được chỉ là đường viền tĩnh tại. Mini Taiwan Pulse cho bạn thấy một hòn đảo **đang hít thở**.

Dự án này có tham vọng không nhỏ: gom toàn bộ dữ liệu mở rải rác tại các cơ quan chính phủ — chuyến bay, AIS tàu thuyền, lịch trình tàu hỏa Đài Loan và cao tốc, tuyến metro, thống kê dân số, quan trắc khí tượng — vào một bản đồ 3D duy nhất. Không phải đơn thuần là các dấu chấm đánh dấu, mà dùng ngôn ngữ hình ảnh như cầu sáng, quỹ đạo sáng, đuôi sao chổi để biến dữ liệu thành phong cảnh chuyển động.

> **📝 Ghi chú của người biên soạn**
> Cơ sở hạ tầng dữ liệu mở của Đài Loan đứng đầu châu Á (Chỉ số Dữ liệu Mở Toàn cầu [Global Open Data Index](https://index.okfn.org/) nhiều lần lọt vào top 10), nhưng giữa «dữ liệu mở» và «dữ liệu được nhìn thấy» tồn tại một khe hở khổng lồ. Mini Taiwan Pulse đang lấp đầy khoảng trống này.

## Ba lớp nhịp đập

### Bầu trời — Quỹ đạo bay ✈️

Bao phủ 14 sân bay trên toàn Đài Loan, hơn 1.500 chuyến bay theo thời gian thực. Mỗi chiếc máy bay là một quả cầu phát sáng, phía sau kéo theo quỹ đạo sáng hình sao chổi với hiệu ứng gradient. Hệ số phóng to độ cao có thể điều chỉnh (1x–5x), khiến sự khác biệt giữa các tuyến bay thấp và tuyến bay cao hiện lên một cách rõ ràng.

Nguồn dữ liệu: API FlightRadar24.

### Đại dương — Theo dõi tàu thuyền 🚢

Vị trí tàu thuyền trên các vùng biển quanh Đài Loan, được đánh dấu bằng những quả cầu sáng màu xanh ngọc. Mỗi con tàu để lại quỹ đạo kéo dài 30 phút. Hệ thống tự động lọc bỏ các nhảy vọt GPS bất thường và MMSI vô hiệu, đảm bảo mọi điểm sáng bạn thấy đều là tàu thật.

Nguồn dữ liệu: Dữ liệu vị trí tàu AIS (Hệ thống nhận diện tự động).

### Đại địa — Sáu hệ thống quỹ đạo 🚄

Đây có lẽ là phần ấn tượng nhất. Sáu hệ thống quỹ đạo vận hành đồng bộ:

| Hệ thống                       | Quy mô                                                      |
| ------------------------------ | ----------------------------------------------------------- |
| Đường sắt Đài Loan (TRA)       | 265 tuyến đường, 333 đoàn tàu, phân loại 6 màu theo loại xe |
| Cao tốc sắt (THSR)             | Tuyến chính Bắc–Nam + tuyến nhánh                           |
| Đàm vận nhanh Đài Bắc (TRTC)   | 8 tuyến đường                                               |
| Đàm vận nhanh Cao Hùng (KRTC)  | Tuyến Đỏ + Tuyến Cam                                        |
| Đường sắt nhẹ Cao Hùng (KLRT)  | Đường sắt nhẹ vòng                                          |
| Đàm vận nhanh Đài Trung (TMRT) | Tuyến Xanh + Tuyến Lam                                      |

Xử lý Đường sắt Đài Loan đặc biệt phức tạp — khớp quỹ đạo OD, tuyến tam giác Chương Hoá loại phân nhánh này, đều có công cụ chuyên biệt xử lý.

Nguồn dữ liệu: Lịch trình công khai + dữ liệu quỹ đạo [OpenStreetMap](https://www.openstreetmap.org/).

## Không chỉ là giao thông

Ngoài các phương tiện đang di chuyển, dự án còn chồng nhiều lớp bản đồ tĩnh và phân tích:

- **Cơ sở hạ tầng**: ranh giới 14 sân bay, 535 cột sáng ga trạm (độ cao = số lần đậu), chùm sáng xoay 3D của 36 hải đăng
- **Mạng lưới đường**: Quốc lộ (đỏ), Tỉnh lộ (cam), Đường xe đạp (xanh lá), độ rộng tự thích ứng khi zoom
- **Phân tích dân số**: Bản đồ nhiệt dân số lưới lục giác H3, hỗ trợ chuyển đổi luồng người ban ngày/ban đêm, 9 chỉ số dân số
- **Khí tượng**: Dữ liệu thời gian thực từ trạm quan trắc + mặt cong 3D sóng nhiệt độ (độ phân giải lưới 0.03°)
- **Tin tức**: RSS CNA Trung ương Thông tấn xã + mã hóa địa lý Gemini API, đánh dấu sự kiện tin tức lên bản đồ
- **Kẹt xe quốc lộ**: Mã hóa màu theo mức độ kẹt xe thời gian thực

Tổng cộng **23 lớp bản đồ có thể bật/tắt độc lập**, mười phân loại.

## Điểm nổi bật về kỹ thuật

- **TypeScript + Mapbox GL + Three.js**: Bản đồ 2D dùng Mapbox render gốc, các yếu tố 3D (cầu sáng, quỹ đạo sáng, cột sáng, mặt nhiệt độ) dùng Three.js đè lên
- **Xét về hiệu năng**: Tàu thuyền dùng InstancedMesh render theo lô, loại bỏ đối tượng ngoài khung nhìn (viewport culling) để tránh render những vật thể không thấy
- **Khoa học màu sắc**: Lớp dân số dùng các thang màu cảm giác đều Plasma / Viridis / Inferno, chuẩn hoá log1p + gamma xử lý phân bố đuôi nặng, thân thiện với người mù màu
- **Giấy phép MIT**: Hoàn toàn mã nguồn mở, chào đón fork và đóng góp

> **📝 Ghi chú của người biên soạn**
> Việc dùng additive blending (pha trộn cộng gộp) cho việc đè quỹ đạo sáng là một lựa chọn khôn ngoan — khu vực nhiều tuyến hàng hải chồng chéo lên nhau tự nhiên sáng hơn, về mặt trực quan cho thấy mức độ bận rộn của các đường hàng hải mà không cần biểu đồ thống kê thêm.

## Hệ sinh thái dữ liệu mở

Dự án này kết nối các nguồn dữ liệu, bản thân chúng chính là một danh sách dẫn dắt dữ liệu mở của Đài Loan:

| Dữ liệu                          | Nguồn                                                          |
| -------------------------------- | -------------------------------------------------------------- |
| Vị trí thời gian thực chuyến bay | FlightRadar24 API                                              |
| AIS tàu thuyền                   | Hệ thống nhận dạng tự động tàu thuyền quốc tế                  |
| Lịch trình đường sắt             | Bảng giờ công khai + OSM                                       |
| Xe buýt/xe khách/xe đạp          | [TDX Dữ liệu vận tải công cộng](https://tdx.transportdata.tw/) |
| Thống kê dân số                  | [SEGIS Thông tin địa lý thống kê](https://segis.moi.gov.tw/)   |
| Quan trắc khí tượng              | [Cục Khí tượng Trung ương](https://www.cwa.gov.tw/)            |
| Điện gió ngoài khơi              | Cục Năng lượng Bộ Kinh tế                                      |
| Sự kiện tin tức                  | RSS Trung ương Thông tấn xã CNA                                |
| Biên giới sân bay/cảng/ga        | [OSM Overpass API](https://overpass-turbo.eu/)                 |

⚠️ **Đáng chú ý:** [Dịch vụ lưu thông dữ liệu vận tải TDX của Đài Loan](https://tdx.transportdata.tw/) là một trong số ít nền tảng chính phủ thống nhất chuẩn hóa dữ liệu vận tải công cộng toàn quốc, bao gồm xe buýt, xe khách, đường sắt, xe đạp, v.v., tài liệu API đầy đủ và miễn phí sử dụng. Điều này không phổ biến trên phạm vi toàn cầu.

## Liên kết

- **GitHub**：[ianlkl11234s/mini-taiwan-pulse](https://github.com/ianlkl11234s/mini-taiwan-pulse)
- **Giấy phép**：MIT License
- **Ngôn ngữ**：TypeScript
- **Nguồn liên quan**：[TDX Nền tảng dữ liệu giao thông](https://tdx.transportdata.tw/) · [Nền tảng dữ liệu mở chính phủ](https://data.gov.tw/) · [SEGIS Thống kê địa lý](https://segis.moi.gov.tw/)

---

_Xác thực cuối cùng：2026-03-22_
