---
title: 'Chu Kiệt Luân'
description: 'Một chàng trai nhút nhát chơi piano trên chương trình tuyển chọn, album đầu tay đã viết lại lịch sử nhạc pop tiếng Hoa; anh ấy nhờ phong cách sáng tác độc đáo khiến làng nhạc tin rằng sáng tác có thể mang lại thu nhập, dùng nhiều album chứng minh nhạc tiếng Hoa có thể giữ nguyên đặc sắc phương Đông đồng thời chinh phục sân khấu thế giới, từ một người trẻ sáng tác bài viết liên tục bị từ chối, nay đã trở thành một nhà cách mạng âm nhạc thực sự lật đổ làng nhạc.'
date: 2026-03-23
category: 'People'
tags:
  [
    'Nhân vật',
    'Chu Kiệt Luân',
    'Nhạc pop tiếng Hoa',
    'Ca sĩ',
    'Sáng tác',
    'R&B',
    'Phong cách Trung Hoa',
  ]
subcategory: '音樂與表演'
author: 'Taiwan.md'
featured: false
lastVerified: 2026-03-23
lastHumanReview: false
lifeTree:
  protagonist: '周杰倫'
  birthYear: 1979
  span: '1979–2024'
  source:
    article: 'knowledge/People/周杰倫.md'
    commit: '6409f519'
    commitDate: '2026-03-23'
    extractedBy: 'Taiwan.md (Semiont) β-r5'
    extractedAt: '2026-04-26 13:30 +0800'
    note: '原文 references = 維基 / Time / IFPI / 鏡週刊 / 華視 / Block Tempo / Dcard 等。Counterfactual 主要對照同代華語流行（孫燕姿、王力宏、陶喆、吳青峰）的路徑。'
  intro: '一個 1997 年在《超級新人王》上彈鋼琴的害羞 18 歲男孩，三年後改寫華語流行音樂歷史。從作品屢遭退稿到全球銷量冠軍。每個 turning（被退稿、自創公司、跨界導演、政治模糊）都有他沒走的路。'
  themes:
    - id: 'original-mainstream'
      label: '原創 vs 主流公式'
      color: '#8B5CF6'
    - id: 'artist-boss'
      label: '藝人 vs 老闆'
      color: '#EC4899'
    - id: 'cross-medium'
      label: '單一媒介 vs 跨界'
      color: '#10B981'
    - id: 'cross-strait'
      label: '兩岸表態 vs 模糊'
      color: '#F59E0B'
  nodes:
    - id: 'birth'
      year: 1979
      age: 0
      type: 'given'
      theme: 'original-mainstream'
      label: '1979 年生於臺北縣林口鄉'
      scene: '1979 年 1 月 18 日出生於臺北縣林口鄉（今新北市林口區）。'
    - id: 'super-newcomer'
      year: 1997
      month: 8
      age: 18
      type: 'choice'
      theme: 'original-mainstream'
      scene: 'TVBS-G《超級新人王》舞台。為高中同學伴奏的鋼琴手'
      chose:
        label: '上節目當伴奏'
        consequence: '主持人吳宗憲欣賞他的樂譜、認為他有潛力，之後在阿爾發音樂旗下多位歌手的歌曲中採用他的創作。'
      alternatives:
        - label: '不上節目'
          plausibility: 'structural'
          note: '同代會彈鋼琴的高中生很多沒被注意到，最後走音樂老師或考音樂系。如果他不上 1997 那場節目，吳宗憲不會看見他，後面 25 年華語樂壇歷史完全不同。'
        - label: '上節目想當主角自己唱'
          plausibility: 'structural'
          note: '常規選秀路徑：主動爭取唱主歌位置。如果走，會被當「另一個唱抒情歌的男生」評估，可能淘汰，不會以伴奏鋼琴手的身份建立品味。'
    - id: 'three-years-rejected'
      year: 1999
      age: 21
      type: 'choice'
      theme: 'original-mainstream'
      scene: '部分作品因風格特殊被退稿，例如劉德華的《眼淚知道》、張惠妹的《忍者》'
      chose:
        label: '繼續寫不放棄 + 等到江蕙收下《落雨聲》'
        consequence: '第一首被採用的歌。為《Jay》專輯鋪路。三年退稿期養成「我的東西不是給別人改的，我自己唱」的決心。'
      alternatives:
        - label: '退稿後改寫成市場喜歡的版本'
          plausibility: 'structural'
          note: '常規路徑：年輕創作者會根據退稿 feedback 不斷修改。如果走，可能更早有歌被採用但失去獨特風格，後來《Jay》不會發生。'
        - label: '放棄音樂'
          plausibility: 'structural'
          note: '三年退稿足以讓多數人轉行。如果走，會去做別的工作，可能成為一個小有才華的素人音樂人。'
    - id: 'jay-album-2000'
      year: 2000
      month: 11
      age: 21
      type: 'choice'
      theme: 'original-mainstream'
      scene: '阿爾發音樂決定讓他自己出專輯'
      chose:
        label: '《Jay》全自製 + 融合 Rap/R&B/搖滾/古典/二胡 Hip-Hop'
        consequence: '改變唱片工業生態：證明音樂人可以做自己、創新可以賺錢。「華語樂壇相信公式」變「相信冒險」。'
      alternatives:
        - label: '走標準偶像歌手路'
          plausibility: 'structural'
          note: '常規 21 歲新人路徑：抒情主打 + 包裝偶像。如果走，可能短期更賺但失去「華語樂壇分水嶺」的歷史地位。'
    - id: 'china-style'
      year: 2003
      age: 24
      type: 'choice'
      theme: 'original-mainstream'
      scene: '《葉惠美》專輯時思考下一個音樂方向'
      chose:
        label: '《東風破》+ 方文山詞 → 開創「中國風流行音樂」'
        consequence: '把古箏、琵琶、二胡用現代錄音技術 + R&B 節奏。後來《菊花台》《青花瓷》《蘭亭序》成系列。Time Asia 同年封面「The New King of Asian Pop」。'
      alternatives:
        - label: '繼續走 R&B/嘻哈路線'
          plausibility: 'structural'
          note: '同代陶喆走純 R&B 路徑。如果走，會跟陶喆同象限競爭，少了「中國風」這個獨特標誌。'
        - label: '純抒情路線'
          plausibility: 'structural'
          note: '更安全選擇（如 1990s 王力宏前期）。如果走，市場接受度更高但失去文化辨識度。'
    - id: 'jvr-music'
      year: 2007
      age: 28
      type: 'choice'
      theme: 'artist-boss'
      scene: '與阿爾發音樂合約期滿'
      chose:
        label: '成立杰威爾音樂自己當老闆'
        consequence: '從藝人變老闆。完全創作自由。後來專輯品質更穩、商業成績更好。2022 《最偉大的作品》IFPI 全球銷量冠軍 720 萬張（華語首例）。'
      alternatives:
        - label: '續簽阿爾發 / 跳到 Sony 或環球'
          plausibility: 'structural'
          note: '常規路徑：頂級藝人多選擇大廠合約。如果走，能獲得國際發行渠道但失去製作節奏的自主控制。'
    - id: 'secret-direct'
      year: 2007
      age: 28
      type: 'choice'
      theme: 'cross-medium'
      scene: '同年除了開公司還有導演機會'
      chose:
        label: '導演《不能說的秘密》'
        consequence: '從歌手變導演。2011 《青蜂俠》進好萊塢。2016 《中國好聲音》當導師。打開「華語音樂人可以做什麼」的範圍。'
      alternatives:
        - label: '專心做音樂不跨界'
          plausibility: 'structural'
          note: '同代多數歌手選擇單一身份深耕。如果走，可能音樂作品更多但失去文化偶像跨領域影響力。'
        - label: '只演不導'
          plausibility: 'structural'
          note: '部分歌手以演員身份試水（如張學友）。如果走，會失去「導演 + 編劇」這層創作主導權，《不能說的秘密》的音樂與敘事整合性會打折。'
    - id: 'cross-strait-2008'
      year: 2008
      age: 29
      type: 'choice'
      theme: 'cross-strait'
      scene: '北京奧運期間'
      chose:
        label: '說「期待奧運在自己的國家舉辦」+ 公開「我是中國人，也是台灣人」雙重表態'
        consequence: '在兩岸都保持商業成功。引發台灣綠營批評，但中國市場保留。「模糊的表態」成為他的長期策略，後來 2020 中國官媒引用他的話為其他藝人辯護。'
      alternatives:
        - label: '明確表態台灣立場'
          plausibility: 'structural'
          note: '同代部分藝人選邊（如張惠妹《站在高崗上》事件）。如果走，會失去中國市場但保住台灣輿論支持。'
        - label: '完全沉默'
          plausibility: 'structural'
          note: '另一部分藝人選擇不談政治。如果走，能避開兩邊質疑但失去「中國人 + 台灣人」雙重身份的彈性。'
    - id: 'nft-phanta'
      year: 2022
      age: 43
      type: 'choice'
      theme: 'artist-boss'
      scene: 'Instagram 換上 Phanta Bear NFT 頭像，引發市場炒作。一天交易額 2.8 億台幣'
      chose:
        label: '杰威爾急澄清「未參與商業策劃、未收益」'
        consequence: '突顯名人效應在加密貨幣市場的爭議性。同年合作好友蔣先威 PHANTACi 品牌的關係處理。但「明星 NFT 風波」這個 pattern 已成型。'
      alternatives:
        - label: '直接公開合作不澄清'
          plausibility: 'structural'
          note: '走完整 NFT 商業合作路徑。如果走，會分享 2.8 億的部分收益但會被綁進加密貨幣監管風險。'
        - label: '從一開始拒絕掛 NFT 頭像'
          plausibility: 'structural'
          note: '保守路徑：不沾。如果走，避開風波但失去與好友的合作關係。'
    - id: 'world-tour'
      year: 2024
      age: 45
      type: 'choice'
      theme: 'cross-medium'
      scene: '「嘉年華世界巡迴演唱會」自 2019 開始'
      chose:
        label: '持續全球巡演 75+ 場 + 馬來西亞武吉加里爾單場 6 萬人'
        consequence: '足跡英國、法國、澳洲、泰國、日本。YouTube MV 總觀看 51 億，《告白氣球》單一影片 2 億。新生代音樂人「我是聽周杰倫長大的」跨世代影響力確立。'
      alternatives:
        - label: '半退休 / 減少演出'
          plausibility: 'structural'
          note: '同代部分歌手 40 歲後減少巡演（如劉德華）。如果走，能保留體力與家庭時間但失去全球巡迴的文化資本。'
        - label: '只在華語區巡演'
          plausibility: 'structural'
          note: '常規華語天王路徑。如果走，能省成本但失去「亞洲流行天王」的國際品牌定位。'
translatedFrom: 'People/周杰倫.md'
sourceCommitSha: '266b6b9f1'
sourceContentHash: 'sha256:86256c6f2ae0a88a'
sourceBodyHash: 'sha256:67921cd65544f76e'
translatedAt: '2026-10-23T06:48:44.357991+00:00'
---

# Châu Kiệt Luân

> **Tóm tắt 30 giây:** Năm 1997, một chàng trai 18 tuổi nhút nhát ngồi chơi piano trên sân khấu 《Siêu tân nhân vương》, ba năm sau album đầu tay của anh đã viết lại lịch sử nhạc pop tiếng Hoa. Châu Kiệt Luân không chỉ là ca sĩ, anh là người khiến cả làng nhạc bắt đầu tin rằng "sáng tác gốc cũng có thể bán được tiền". Từ năm 2000 đến nay, anh đã dùng 16 album chứng minh nhạc tiếng Hoa có thể giữ được đặc trưng phương Đông mà vẫn chinh phục được sân khấu thế giới.

Trước khi ra mắt, không ít bài hát do Châu Kiệt Luân sáng tác bị từ chối. Lữ Đức Hoa không nhận bài 《眼淚知道》 của anh, Trương Huy Mị cũng không nhận 《忍者》, lý do là phong cách quá đặc biệt.

Năm 1999, Giang Huệ trình diễn bài 《落雨聲》 do anh và Phương Văn Sơn cùng sáng tác, đây là bài hát đầu tiên của anh được bán ra.

## Từ vai phụ trong chương trình tuyển chọn đến người cách mạng âm nhạc

Tháng 8 năm 1997, trên sân khấu TVBS-G《超級新人王》, Chu Kiệt Luân không phải là nhân vật chính. Anh ấy là người chơi piano đệm cho bạn cùng lớp trung học. Người dẫn chương trình Ngô Tông Hiến ngưỡng mộ bản nhạc của anh, cho rằng anh có tiềm năng, sau đó đã áp dụng các sáng tác của anh vào bài hát của nhiều ca sĩ dưới trướng hãng âm nhạc Alfa Music.

Một số tác phẩm của anh bị từ chối vì phong cách quá đặc biệt, trong đó có 《眼淚知道》 của Lưu Đức Hoa và 《忍者》 của Trương Huy Mị. Năm 1999, Giang Huệ trình diễn bài 《落雨聲》 do anh và Phương Văn Sơn cùng sáng tác, đây là bài hát đầu tiên của anh được bán ra.

## Năm 2000: Cuộc cách mạng âm nhạc của một album

Ngày 7 tháng 11 năm 2000, album đầu tay 《Jay》 của Chu Kiết Luân (Jay Chou) chính thức phát hành. Bài mở đầu 《可愛女人》 dùng Rap phối hợp nhịp R&B, 《完美主義》 hòa quyện rock và piano cổ điển, còn 《娘子》 thì trực tiếp đưa nhị cầm vào thế giới Hip-Hop.

> **💡 Bạn có biết không**  
> 《Jay》 đã làm một việc chưa từng có: chứng minh âm nhạc tiếng Hoa có thể dung hợp mọi thể loại, và vẫn bán rất tốt. Chu Kiết Luân bước từ người sáng tác hậu trường ra sân khấu biểu diễn.

Quan trọng hơn, anh đã thay đổi toàn bộ hệ sinh thái ngành công nghiệp âm nhạc. Trước 《Jay》, công thức thành công của làng nhạc tiếng Hoa rất đơn giản: tìm người biết hát, cho vài bài ballad, đóng gói thành idol. Chu Kiết Luân đã chứng minh một con đường khác: nhạc sĩ có thể làm chính mình, đổi mới cũng có thể kiếm tiền.

## Người sáng tạo dòng nhạc pop phong cách Trung Hoa

Năm 2003, 《東風破》 là một cột mốc khác của làng nhạc tiếng Hoa. Lời của Phương Văn Sơn (Vincent Fang) 「一盞離愁，孤單佇立在窗口」 kết hợp với 編曲 phong cách Trung Hoa của Chu Kiệt Luân (Jay Chou) đã tạo ra một thể loại âm nhạc hoàn toàn mới: nhạc pop phong cách Trung Hoa (中國風流行音樂).

Đây không phải là sự phục hưng văn hóa, mà là sự đổi mới văn hóa. Chu Kiệt Luân đưa các nhạc cụ truyền thống như tranh cổ (古箏), tỳ bà (琵琶), nhị hú (二胡) vào khung hiện đại nhờ công nghệ thu âm, phối hợp cùng nhịp điệu R&B. 《菊花台》, 《青花瓷》, 《蘭亭序》 — mỗi ca khúc đều là giáo khoa điển hình về sự dung hòa hoàn hảo giữa âm nhạc Đông - Tây.

Truyền thông quốc tế bắt đầu chú ý đến hiện tượng này. Năm 2003, phiên bản Á Châu của tạp chí _Time_ đặt Chu Kiệt Luân lên trang bìa với tiêu đề "The New King of Asian Pop". Điều này không chỉ là sự săn đón của truyền thông — Chu Kiệt Luân thực sự đang làm một việc chưa ai làm được: cho các yếu tố Trung Hoa cổ điển tìm thấy chỗ đứng trên bản đồ âm nhạc pop toàn cầu.

## Người giữ kỷ lục Giải thưởng Kim Khúc

| Năm  | Giải thưởng                                                                                           | Tác phẩm                        |
| ---- | ----------------------------------------------------------------------------------------------------- | ------------------------------- |
| 2001 | Giải Album Pop xuất sắc nhất                                                                          | 《Jay》                         |
| 2002 | Giải Album Pop xuất sắc nhất, Giải Nhà sản xuất Album xuất sắc nhất, Giải Nhà soạn nhạc xuất sắc nhất | 《Fantasy》                     |
| 2004 | Giải Album Pop xuất sắc nhất                                                                          | 《Diệp Huệ Mỹ》                 |
| 2008 | Giải Bài hát năm, Giải Nhà soạn nhạc xuất sắc nhất                                                    | 《Thanh Hoa Tú》                |
| 2009 | Giải Bài hát năm, Giải Ca sĩ nam Quốc ngữ xuất sắc nhất, Giải MV xuất sắc nhất                        | 《Đào Hương》, 《Ma Thuật Gia》 |
| 2011 | Giải Album Quốc ngữ xuất sắc nhất, Giải Ca sĩ nam Quốc ngữ xuất sắc nhất                              | 《Khoa Thời Đại》               |

Châu Kiệt Luân là một trong những nghệ sĩ giành giải thưởng nhiều nhất trong lịch sử Giải thưởng Kim Khúc Đài Loan, tích lũy 15 giải Kim Khúc, trong đó "Giải Album năm" (sau đổi thành "Giải Album Hoa ngữ xuất sắc nhất") được đề cử 10 lần, giành giải 4 lần, tạo nên kỷ lục đề cử và giành giải nhiều nhất.

## Từ nghệ sĩ đến sếp: Sự ra đời của JVR Music

Năm 2007 là một bước ngoặt khác trong sự nghiệp của Châu Kiệt Luân — ông thành lập JVR Music, từ nghệ sĩ biến thành sếp. Quyết định này mang lại cho ông sự tự do sáng tạo hoàn toàn, cũng để làng nhạc Hoa ngữ thấy một khả năng khác: nhạc sĩ không nhất thiết phải bị các hãng đĩa kiểm soát mãi mãi.

Con số sẽ nói lên sự thật: Sau khi JVR thành lập, chất lượng album của Châu Kiệt Luân ổn định hơn, thành tích thương mại tốt hơn. Album 《最偉大的作品》 năm 2022 trở thành album đứng đầu bảng xếp hạng doanh số toàn cầu được IFPI công nhận, đây là lần đầu tiên album Hoa ngữ đạt vị trí này, với doanh số toàn cầu 7,2 triệu bản.

## Đột phá không chỉ ở âm nhạc

Hoài bão của Châu Kiệt Luân không chỉ dừng lại ở âm nhạc. Bộ 《Bí mật không thể nói》 năm 2007 khiến ông trở thành đạo diễn, 《Ong xanh》 năm 2011 đưa ông đến Hollywood, 《Giọng hát Trung Quốc》 năm 2016 chứng minh ông cũng có thể làm huấn luyện viên.

Nhưng đột phá lớn nhất có lẽ là sự thay đổi của ông đối với toàn bộ hệ sinh thái ngành. Ông không chỉ sáng tạo âm nhạc, còn định nghĩa lại những gì nhạc sĩ Hoa ngữ có thể làm, có thể trở thành gì. Từ phòng thu đến màn ảnh rộng, từ Đài Bắc ra thế giới, Châu Kiệt Luân đã mở ra vô số khả năng.

## Khẳng định ảnh hưởng toàn cầu

Ảnh hưởng của Châu Kiệt Luân đã lâu vượt ra khỏi khu vực Hoa ngữ. Chuyến lưu diễn thế giới "Gala" từ năm 2019 đã tổ chức hơn 75 buổi trên toàn cầu, dấu chân đến Anh, Pháp, Úc, Thái Lan, Nhật Bản. Tháng 10/2024 tại Sân vận động Quốc gia Bukit Jalil Malaysia, khán giả một buổi vượt quá 60.000 người, phá kỷ lục cá nhân về số lượng khán giả một buổi biểu diễn.

Tổng lượt xem MV của ông trên YouTube vượt quá 5,1 tỷ, riêng 《Bóng bay tỏ tình》 đã có hơn 200 triệu lượt xem. Các nhạc sĩ thế hệ mới đều nói "Tôi lớn lên cùng âm nhạc của Châu Kiệt Luân", chứng minh ảnh hưởng của ông đã vượt qua các thế hệ.

## Những tranh cãi và chất vấn không thể tránh khỏi

### Vùng mờ quan điểm chính trị

Quan điểm chính trị của Châu Kiệt Luân luôn là đề tài nhạy cảm trong các cuộc thảo luận hai bên Bờ Đài. Ông từng công khai tuyên bố "Tôi là người Trung Hoa", đồng thời cũng nói "Tôi sinh ra lớn lên ở Đài Loan, tôi cũng là người Đài Loan". Trong kỳ Olympic Bắc Kinh 2008, ông từng nói mong đợi Olympic được tổ chức tại "quốc gia của chính mình", gây ra sự chỉ trích từ phe xanh Đài Loan.

Cách diễn đạt mờ nhạt này giúp ông duy trì thành công thương mại ở cả hai bên bờ, nhưng cũng thường bị chất vấn là cân nhắc thương mại trọng hơn quan điểm chính trị. Năm 2020, truyền thông chính thống Trung Quốc từng trích dẫn lời ông để biện hộ cho các nghệ sĩ khác, một lần nữa kéo ông vào tranh cãi chính trị.

### Vụ bão NFT Phanta Bear

Đầu năm 2022, Châu Kiệt Luân bị cuốn vào tranh cãi NFT. Ông đổi ảnh đại diện Instagram thành NFT Phanta Bear, kích hoạt 투 cơ thị trường, dự án NFT này đạt khối lượng giao dịch 280 triệu NT$ chỉ trong một ngày. Nhưng sau đó JVR Music vội vàng làm rõ, Châu Kiệt Luân "không tham gia bất kỳ kế hoạch hay vận hành thương mại nào của hành vi này, cũng không thu được bất kỳ lợi ích nào".

> **⚠️ Góc nhìn tranh cãi**  
> Công ty quản lý giải thích NFT không phải là "liên danh" của Châu Kiệt Luân, mà là sản phẩm hợp tác cấp phép thương hiệu PHANTACi của bạn thân Tưởng Tiên Uy. Nhưng vụ bão này làm nổi bật tính chất tranh cãi của hiệu ứng người nổi tiếng trên thị trường tiền mã hóa.

### Mây mù nghi ngờ viết thay

Lâu nay, trong đội ngũ sáng tác của Châu Kiệt Luân có nhiều người công lao đằng sau, bao gồm nhà viết lời Hoàng Tuấn Lang. Hoàng Tuấn Lang từng than phiền trên mạng xã hội về áp lực quá trình sáng tác, gây ra nghi ngờ từ dư luận về việc tác phẩm của Châu Kiệt Luân có hoàn toàn nguyên tạo hay không. Mặc dù hợp tác nhóm sáng tác trong ngành công nghiệp âm nhạc là điều bình thường, nhưng đối với Châu Kiệt Luân vốn nhấn mạnh tính nguyên tạo, những chất vấn này vẫn tiếp tục tồn tại.

## Sự thay đổi vĩnh viễn của làng nhạc tiếng Hoa

Đóng góp lớn nhất của Jay Chou không phải là số lượng đĩa bán ra, mà là thay đổi trí tưởng tượng của cả một ngành công nghiệp. Trước anh, làng nhạc tiếng Hoa tin vào sự «an toàn» — bắt chước những công thức đã thành công. Sau anh, làng nhạc bắt đầu tin vào sự «mạo hiểm» — sáng tạo và thử nghiệm cũng có thể thành công.

Làng nhạc tiếng Hoa ngày nay tràn đầy những giọng nói đa dạng: Rap, điện tử, dân ca, nhạc thực nghiệm — nguồn gốc của hệ sinh thái này đều có thể truy nguyên về album 《Jay》 năm 2000. Jay Chou dùng một album nói với tất cả mọi người: ranh giới của âm nhạc tiếng Hoa có thể rộng vô tận.

Từ người đệm piano nhút nhát năm 1997, đến Vua nhạc pop tiếng Hoa năm 2026, hành trình của Jay Chou không chỉ là câu chuyện thành công cá nhân, mà là lịch sử tiến hóa của cả âm nhạc pop tiếng Hoa. Anh đã chứng minh một điều: người đổi mới thực sự không phải là người theo đuổi xu hướng, mà là người tạo ra xu hướng.

---

**Đọc thêm**:

- [Tzuyu](/vi/people/tzuyu) — Tên tuổi nghệ sĩ Đài Loan có lượng theo dõi IG thứ hai, chỉ sau Jay Chou
- [Nhạc phổ biến Đài Loan](/vi/music/golden-melodies-legacy-taiwan-pop-music) — Toàn bộ hệ sinh thái ngành công nghiệp và bước ngoặt thế hệ mà Jay Chou thuộc về
- [Stefanie Sun](/vi/people/stefanie-sun/) — Cùng nhập cố Giải thưởng Golden Melody lần thứ 12 hạng Mới xuất sắc nhất, thua chỉ 1 phiếu, định hình hai đường chạy song song của âm nhạc thập niên 2000
- [Gia Vĩnh Tiếp](/vi/people/chia-yung-chieh) — Một đường đi khác của Đài Loan chuyển đổi danh tính nghệ sĩ thành ảnh hưởng liên ngành (giải trí→thương hiệu váy cưới→động viên công chúng→quản trị cổ phần công), đối chiếu với con đường ngành văn hóa sáng tạo của Jay Chou

## Tài liệu tham khảo

- [Danh sách giải thưởng và đề cử của Châu Kiệt Luân - Wikipedia](https://zh.wikipedia.org/zh-tw/%E5%91%A8%E6%9D%B0%E5%80%AB%E8%8E%B7%E5%A5%96%E4%B8%8E%E6%8F%90%E5%90%8D%E5%88%97%E8%A1%A8)
- [Time Magazine Asia Edition - Ngày 3 tháng 3 năm 2003](https://content.time.com/time/magazine/asia/0,9263,501030303,00.html)
- [IFPI 2022 Bảng xếp hạng bán album toàn cầu quán quân: Châu Kiệt Luân "Tác phẩm vĩ đại nhất"](https://tbotaiwan.com/ifpi-global-album-sales-chart-2022-jay-chou-greatest-works-of-art/)
- [Châu Kiệt Luân NFT "Phanta Bear" kiếm 2,8 tỷ trong tích tắc Công ty vội vã cắt đứt quan hệ: "Không hề nhận tiền" - Kính Tuần Báo](https://www.mirrormedia.mg/story/20220104ent036/)
- [Đưa ra lời Châu Kiệt Luân từng nói "Tôi là người Trung Quốc" Truyền thông chính quyền Trung Quốc viết bài ủng hộ Âu Dương Na Na - Đài Tin tức Hoa Thị](https://news.cts.com.tw/cts/politics/202009/202009292015341.html)
- [Chuyến lưu diễn thế giới Carnival - Wikipedia](https://zh.wikipedia.org/zh-hant/%E5%98%89%E5%B9%B4%E8%8F%AF%E4%B8%96%E7%95%8C%E5%B7%A1%E8%BF%B4%E6%BC%94%E5%94%B1%E6%9C%83)
- [Greatest Works of Art - Wikipedia](https://en.wikipedia.org/wiki/Greatest_Works_of_Art)
- [Kênh YouTube chính thức của Jay Chou](https://www.youtube.com/channel/UC8CU5nVhCQIdAGrFFp4loOQ)
- [Trang web chính thức của JVR Music](https://www.jvrmusic.com/)
- ["NFT Gấu Châu Kiệt Luân" đồn có thể mua vé hòa nhạc! PhantaBear tăng vọt 120% nhưng gây thất vọng và phẫn nộ](https://www.blocktempo.com/rumor-has-it-you-can-snag-jay-chou-concert-tickets-phantabear-soars-by-120/)
- [Châu Kiệt Luân ngắt lời fan "nghi ngờ ủng hộ độc lập Đài Loan" tại hòa nhạc - Dcard](https://www.dcard.tw/f/entertainer/p/230941846)
