/**
 * latestUI — i18n strings for the 時序主軸 (time-axis) feature: the /latest page,
 * the article-page "站上最新" rail, the /explore latest strip, and the nav/footer
 * "最新文章" entries. Spread into ui.ts per language like the other namespaces.
 *
 * Born 2026-06-09 (渤浚 reader feedback: hard to find the site's newest articles).
 * Design: reports/latest-articles-discoverability-design-2026-06-09.md.
 *
 * `curation.*` keys（查證狀態）也住這裡：卡片 pill、/latest 階段篩選、文章頁說明條與 🔎 徽章。
 * 2026-11-04 全站普查 §五.5：說明條依 frontmatter `curationReason` 分兩種——unverified（待查證）
 * ／thin（待擴寫）；缺欄位的舊文用 unverified。兩種都拿掉了舊文案的「社群貢獻」（判定看流程
 * 不看人，A 級補標的約四成是 Taiwan.md 自己早期寫的）。zh-TW／en 是報告 §五.5 的草案，其他 11 語
 * 照既有 curation.stage.* 字串的用詞補譯，待母語者校（reports/article-health-census-2026-11-04.md §十）。
 */
export const latestUI = {
  en: {
    'nav.latest': 'Latest',
    'latest.meta.title': 'Latest articles',
    'latest.meta.description':
      'Recently written by the AI and contributors, newest first.',
    'latest.eyebrow': 'LATEST',
    'latest.title': 'Latest articles',
    'latest.subtitle':
      'Recently written by the AI and contributors, newest first.',
    'latest.filterAll': 'All',
    'latest.empty': 'Nothing here yet.',
    'latest.changelogCta': "The AI's full update activity → Changelog",
    'latest.railHeading': 'Latest on the site',
    'latest.railViewAll': 'See all latest',
    'latest.exploreSub': 'Recently published',
    'latest.exploreSeeAll': 'See all →',
    'latest.minRead': 'min',
    'latest.dayCount': 'articles',
    'latest.today': 'Today',
    'curation.stage.incubating': 'Evolving',
    'curation.stage.verified': 'In-depth curation',
    'curation.stage.standard': 'Standard article',
    'curation.stage.incubating.unverified': 'Evolving · Awaiting fact-check',
    'curation.stage.incubating.thin': 'Evolving · Awaiting expansion',
    'curation.notice.unverified.before':
      "This article hasn't finished Taiwan.md's line-by-line fact-check yet. It reads fine overall, but quotes, dates and figures may not all have been verified. Spot something off? ",
    'curation.notice.thin.before':
      'This article is still a sketch, waiting in line for an in-depth rewrite. Know more, or have sources or photos to share? ',
    'curation.notice.cta': 'Tell us',
    'curation.notice.after': '.',
    'curation.badge.verified':
      "Fact-checked in depth · This article went through Taiwan.md's in-depth research and item-by-item fact-checking",
    'latest.stageFilterLabel': 'Stage',
    'latest.stageAll': 'All stages',
  },
  ja: {
    'nav.latest': '最新の記事',
    'latest.meta.title': '最新の記事',
    'latest.meta.description': 'AIと貢献者が最近書き上げた記事を、更新順に。',
    'latest.eyebrow': '最新',
    'latest.title': '最新の記事',
    'latest.subtitle': 'AIと貢献者が最近書き上げた記事を、更新順に。',
    'latest.filterAll': 'すべて',
    'latest.empty': 'まだ記事がありません。',
    'latest.changelogCta': 'AIの全更新履歴（翻訳・修正・進化）→ 変更履歴',
    'latest.railHeading': 'サイトの最新',
    'latest.railViewAll': 'すべての最新記事',
    'latest.exploreSub': 'AIと貢献者の最新作',
    'latest.exploreSeeAll': 'すべて見る →',
    'latest.minRead': '分',
    'latest.dayCount': '本',
    'latest.today': '今日',
    'curation.stage.incubating': '進化中',
    'curation.stage.verified': '深度キュレーション',
    'curation.stage.standard': '正式記事',
    'curation.stage.incubating.unverified': '進化中・ファクトチェック待ち',
    'curation.stage.incubating.thin': '進化中・加筆待ち',
    'curation.notice.unverified.before':
      'この記事は、Taiwan.md の一項目ずつのファクトチェックがまだ終わっていません。おおむね読める内容ですが、引用・年・数字がすべて確認済みとは限りません。気になる箇所があれば、',
    'curation.notice.thin.before':
      'この記事はまだ骨組みの段階で、本格的な書き直しの順番を待っています。詳しく知っている方、資料や写真をお持ちの方は、',
    'curation.notice.cta': 'お知らせください',
    'curation.notice.after': '。',
    'curation.badge.verified':
      '詳細ファクトチェック済み・この記事は Taiwan.md の詳細リサーチと項目ごとのファクトチェックを経ています',
    'latest.stageFilterLabel': 'ステージ',
    'latest.stageAll': 'すべてのステージ',
  },
  ko: {
    'nav.latest': '최신 글',
    'latest.meta.title': '최신 글',
    'latest.meta.description': 'AI와 기여자가 최근 작성한 글을 최신순으로.',
    'latest.eyebrow': '최신',
    'latest.title': '최신 글',
    'latest.subtitle': 'AI와 기여자가 최근 작성한 글을 최신순으로.',
    'latest.filterAll': '전체',
    'latest.empty': '아직 글이 없습니다.',
    'latest.changelogCta': 'AI의 전체 업데이트 활동 → 변경 기록',
    'latest.railHeading': '사이트 최신',
    'latest.railViewAll': '모든 최신 글',
    'latest.exploreSub': 'AI와 기여자의 최신작',
    'latest.exploreSeeAll': '전체 보기 →',
    'latest.minRead': '분',
    'latest.dayCount': '편',
    'latest.today': '오늘',
    'curation.stage.incubating': '진화 중',
    'curation.stage.verified': '심층 큐레이션',
    'curation.stage.standard': '정식 기사',
    'curation.stage.incubating.unverified': '진화 중 · 사실 확인 대기',
    'curation.stage.incubating.thin': '진화 중 · 보강 대기',
    'curation.notice.unverified.before':
      '이 글은 아직 Taiwan.md의 항목별 사실 확인을 마치지 않았습니다. 전반적으로 읽을 만하지만 인용, 연도, 숫자가 모두 확인된 것은 아닐 수 있습니다. 의심스러운 부분이 있다면 ',
    'curation.notice.thin.before':
      '이 글은 아직 뼈대만 갖춘 상태로, 심층 개정을 기다리고 있습니다. 더 알고 계시거나 자료·사진이 있다면 ',
    'curation.notice.cta': '알려 주세요',
    'curation.notice.after': '.',
    'curation.badge.verified':
      '심층 사실 확인 완료 · 이 글은 Taiwan.md의 심층 조사와 항목별 사실 확인을 거쳤습니다',
    'latest.stageFilterLabel': '단계',
    'latest.stageAll': '모든 단계',
  },
  es: {
    'nav.latest': 'Recientes',
    'latest.meta.title': 'Artículos recientes',
    'latest.meta.description':
      'Escritos recientemente por la IA y los colaboradores, del más nuevo al más antiguo.',
    'latest.eyebrow': 'RECIENTE',
    'latest.title': 'Artículos recientes',
    'latest.subtitle':
      'Escritos recientemente por la IA y los colaboradores, del más nuevo al más antiguo.',
    'latest.filterAll': 'Todo',
    'latest.empty': 'Nada por aquí todavía.',
    'latest.changelogCta':
      'Toda la actividad de actualización de la IA → Registro de cambios',
    'latest.railHeading': 'Lo más reciente',
    'latest.railViewAll': 'Ver todo lo reciente',
    'latest.exploreSub': 'Publicados recientemente',
    'latest.exploreSeeAll': 'Ver todo →',
    'latest.minRead': 'min',
    'latest.dayCount': 'artículos',
    'latest.today': 'Hoy',
    'curation.stage.incubating': 'En evolución',
    'curation.stage.verified': 'Curaduría exhaustiva',
    'curation.stage.standard': 'Artículo estándar',
    'curation.stage.incubating.unverified':
      'En evolución · Pendiente de verificación',
    'curation.stage.incubating.thin': 'En evolución · Pendiente de ampliación',
    'curation.notice.unverified.before':
      'Este artículo aún no ha completado la verificación punto por punto de Taiwan.md. Se puede leer en general, pero es posible que no se hayan comprobado todas las citas, fechas y cifras. Si ves algo dudoso, ',
    'curation.notice.thin.before':
      'Este artículo todavía es un esbozo y espera turno para una reescritura a fondo. Si sabes más o tienes fuentes o fotos, ',
    'curation.notice.cta': 'avísanos',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'Verificado a fondo · Este artículo pasó por la investigación en profundidad y la verificación punto por punto de Taiwan.md',
    'latest.stageFilterLabel': 'Etapa',
    'latest.stageAll': 'Todas las etapas',
  },
  fr: {
    'nav.latest': 'Récents',
    'latest.meta.title': 'Derniers articles',
    'latest.meta.description':
      'Récemment écrits par l’IA et les contributeurs, du plus récent au plus ancien.',
    'latest.eyebrow': 'RÉCENT',
    'latest.title': 'Derniers articles',
    'latest.subtitle':
      'Récemment écrits par l’IA et les contributeurs, du plus récent au plus ancien.',
    'latest.filterAll': 'Tout',
    'latest.empty': 'Rien pour le moment.',
    'latest.changelogCta':
      'Toute l’activité de mise à jour de l’IA → Journal des modifications',
    'latest.railHeading': 'Les plus récents',
    'latest.railViewAll': 'Voir tous les récents',
    'latest.exploreSub': 'Publiés récemment',
    'latest.exploreSeeAll': 'Voir tout →',
    'latest.minRead': 'min',
    'latest.dayCount': 'articles',
    'latest.today': 'Aujourd’hui',
    'curation.stage.incubating': 'En évolution',
    'curation.stage.verified': 'Curation approfondie',
    'curation.stage.standard': 'Article standard',
    'curation.stage.incubating.unverified':
      'En évolution · Vérification en attente',
    'curation.stage.incubating.thin': 'En évolution · Développement en attente',
    'curation.notice.unverified.before':
      "Cet article n'a pas encore terminé la vérification point par point de Taiwan.md. Il se lit globalement bien, mais les citations, dates et chiffres n'ont peut-être pas tous été vérifiés. Vous repérez quelque chose de douteux ? ",
    'curation.notice.thin.before':
      "Cet article n'est encore qu'une ébauche, en attente d'une réécriture approfondie. Vous en savez plus, ou vous avez des sources ou des photos ? ",
    'curation.notice.cta': 'Dites-le-nous',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'Vérifié en profondeur · Cet article a suivi la recherche approfondie et la vérification point par point de Taiwan.md',
    'latest.stageFilterLabel': 'Étape',
    'latest.stageAll': 'Toutes les étapes',
  },
  vi: {
    'nav.latest': 'Bài viết mới nhất',
    'latest.meta.title': 'Bài viết mới nhất',
    'latest.meta.description':
      'Các bài viết mới hoàn thành của AI và cộng tác viên, được sắp xếp theo thời gian hoàn thành.',
    'latest.eyebrow': 'Khám phá theo trình tự thời gian',
    'latest.title': 'Bài viết mới nhất',
    'latest.subtitle':
      'Các bài viết mới hoàn thành của AI và cộng tác viên, được sắp xếp theo thời gian hoàn thành.',
    'latest.filterAll': 'Tất cả',
    'latest.empty': 'Hiện chưa có dữ liệu.',
    'latest.changelogCta':
      'Muốn xem toàn bộ hoạt động cập nhật của AI (biên dịch, sửa lỗi, cải tiến)? → Nhật ký cập nhật',
    'latest.railHeading': 'Mới nhất trên trang',
    'latest.railViewAll': 'Xem tất cả bài viết mới nhất',
    'latest.exploreSub': 'Các bài viết mới hoàn thành của AI và cộng tác viên',
    'latest.exploreSeeAll': 'Xem tất cả →',
    'latest.minRead': 'phút',
    'latest.dayCount': 'bài',
    'latest.today': 'Hôm nay',
    'curation.stage.incubating': 'Đang hoàn thiện',
    'curation.stage.verified': 'Đã thẩm định chuyên sâu',
    'curation.stage.standard': 'Bài viết chính thức',
    'curation.stage.incubating.unverified': 'Đang hoàn thiện · Chờ kiểm chứng',
    'curation.stage.incubating.thin': 'Đang hoàn thiện · Chờ bổ sung',
    'curation.notice.unverified.before':
      'Bài viết này chưa hoàn tất quy trình kiểm chứng từng chi tiết của Taiwan.md. Nhìn chung có thể đọc được, nhưng các trích dẫn, năm tháng và số liệu có thể chưa được đối chiếu hết. Nếu thấy chỗ nào đáng ngờ, hãy ',
    'curation.notice.thin.before':
      'Bài viết này mới chỉ có khung sườn, đang chờ đến lượt được viết lại chuyên sâu. Nếu bạn biết thêm hoặc có tư liệu, hình ảnh, hãy ',
    'curation.notice.cta': 'báo cho chúng tôi',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'Đã kiểm chứng chuyên sâu · Bài viết này đã qua quy trình nghiên cứu chuyên sâu và kiểm chứng từng chi tiết của Taiwan.md',
    'latest.stageFilterLabel': 'Giai đoạn',
    'latest.stageAll': 'Tất cả giai đoạn',
  },
  id: {
    'nav.latest': 'Artikel terbaru',
    'latest.meta.title': 'Artikel terbaru',
    'latest.meta.description':
      'Artikel terbaru dari AI dan kontributor, diurutkan berdasarkan waktu penyelesaian.',
    'latest.eyebrow': 'Jelajahi kronologi',
    'latest.title': 'Artikel terbaru',
    'latest.subtitle':
      'Artikel terbaru dari AI dan kontributor, diurutkan berdasarkan waktu penyelesaian.',
    'latest.filterAll': 'Semua',
    'latest.empty': 'Belum ada data saat ini.',
    'latest.changelogCta':
      'Ingin melihat seluruh aktivitas pembaruan AI (penerjemahan, perbaikan, evolusi)? → Log pembaruan',
    'latest.railHeading': 'Terbaru di situs',
    'latest.railViewAll': 'Lihat semua artikel terbaru',
    'latest.exploreSub': 'Artikel terbaru dari AI dan kontributor',
    'latest.exploreSeeAll': 'Lihat semua →',
    'latest.minRead': 'menit',
    'latest.dayCount': 'artikel',
    'latest.today': 'Hari ini',
    'curation.stage.incubating': 'Berkembang',
    'curation.stage.verified': 'Kurasi mendalam',
    'curation.stage.standard': 'Artikel resmi',
    'curation.stage.incubating.unverified':
      'Berkembang · Menunggu pemeriksaan fakta',
    'curation.stage.incubating.thin': 'Berkembang · Menunggu pengembangan',
    'curation.notice.unverified.before':
      'Artikel ini belum menyelesaikan pemeriksaan fakta butir demi butir di Taiwan.md. Secara umum bisa dibaca, tetapi kutipan, tahun, dan angka mungkin belum semuanya dicek. Menemukan yang meragukan? ',
    'curation.notice.thin.before':
      'Artikel ini masih berupa kerangka dan sedang mengantre untuk ditulis ulang secara mendalam. Tahu lebih banyak, atau punya sumber atau foto? ',
    'curation.notice.cta': 'Beri tahu kami',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'Diperiksa mendalam · Artikel ini telah melalui riset mendalam dan pemeriksaan fakta butir demi butir di Taiwan.md',
    'latest.stageFilterLabel': 'Tahap',
    'latest.stageAll': 'Semua tahap',
  },
  pt: {
    'nav.latest': 'Artigos mais recentes',
    'latest.meta.title': 'Artigos mais recentes',
    'latest.meta.description':
      'Conteúdos recém-produzidos pela IA e pelos colaboradores, ordenados pela data de conclusão.',
    'latest.eyebrow': 'Exploração cronológica',
    'latest.title': 'Artigos mais recentes',
    'latest.subtitle':
      'Conteúdos recém-produzidos pela IA e pelos colaboradores, ordenados pela data de conclusão.',
    'latest.filterAll': 'Todos',
    'latest.empty': 'Ainda não há dados.',
    'latest.changelogCta':
      'Quer ver todas as atividades de atualização da IA (traduções, correções e evolução)? → Registro de alterações',
    'latest.railHeading': 'Mais recentes no site',
    'latest.railViewAll': 'Ver todos os artigos mais recentes',
    'latest.exploreSub':
      'Conteúdos recém-produzidos pela IA e pelos colaboradores',
    'latest.exploreSeeAll': 'Ver tudo →',
    'latest.minRead': 'min',
    'latest.dayCount': 'artigos',
    'latest.today': 'Hoje',
    'curation.stage.incubating': 'Em evolução',
    'curation.stage.verified': 'Curadoria aprofundada',
    'curation.stage.standard': 'Artigo padrão',
    'curation.stage.incubating.unverified':
      'Em evolução · Aguardando verificação',
    'curation.stage.incubating.thin': 'Em evolução · Aguardando ampliação',
    'curation.notice.unverified.before':
      'Este artigo ainda não concluiu a verificação item por item do Taiwan.md. A leitura é boa no geral, mas citações, datas e números talvez não tenham sido todos conferidos. Viu algo duvidoso? ',
    'curation.notice.thin.before':
      'Este artigo ainda é um esboço e aguarda sua vez para uma reescrita aprofundada. Sabe mais, ou tem fontes ou fotos? ',
    'curation.notice.cta': 'Conte para nós',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'Verificado a fundo · Este artigo passou pela pesquisa aprofundada e pela verificação item por item do Taiwan.md',
    'latest.stageFilterLabel': 'Estágio',
    'latest.stageAll': 'Todos os estágios',
  },
  hi: {
    'nav.latest': 'नवीनतम लेख',
    'latest.meta.title': 'नवीनतम लेख',
    'latest.meta.description':
      'AI और योगदानकर्ताओं द्वारा हाल में तैयार किए गए लेख, पूर्ण होने के समय के क्रम में।',
    'latest.eyebrow': 'कालक्रमिक अन्वेषण',
    'latest.title': 'नवीनतम लेख',
    'latest.subtitle':
      'AI और योगदानकर्ताओं द्वारा हाल में तैयार किए गए लेख, पूर्ण होने के समय के क्रम में।',
    'latest.filterAll': 'सभी',
    'latest.empty': 'फ़िलहाल कोई डेटा उपलब्ध नहीं है।',
    'latest.changelogCta':
      'AI की सभी अपडेट गतिविधियाँ (अनुवाद, सुधार, उन्नयन) देखना चाहते हैं? → बदलाव लॉग',
    'latest.railHeading': 'साइट पर नवीनतम',
    'latest.railViewAll': 'सभी नवीनतम लेख देखें',
    'latest.exploreSub': 'AI और योगदानकर्ताओं द्वारा हाल में तैयार किए गए',
    'latest.exploreSeeAll': 'सभी देखें →',
    'latest.minRead': 'मिनट',
    'latest.dayCount': 'लेख',
    'latest.today': 'आज',
    'curation.stage.incubating': 'विकासशील',
    'curation.stage.verified': 'गहन क्यूरेशन',
    'curation.stage.standard': 'मानक लेख',
    'curation.stage.incubating.unverified': 'विकासशील · तथ्य-जाँच बाकी',
    'curation.stage.incubating.thin': 'विकासशील · विस्तार बाकी',
    'curation.notice.unverified.before':
      'इस लेख की Taiwan.md द्वारा बिंदुवार तथ्य-जाँच अभी पूरी नहीं हुई है। यह कुल मिलाकर पढ़ने लायक है, लेकिन उद्धरण, वर्ष और आँकड़े शायद सभी जाँचे नहीं गए हैं। कुछ संदिग्ध दिखे तो ',
    'curation.notice.thin.before':
      'यह लेख अभी केवल ढाँचा है और गहन पुनर्लेखन की कतार में है। अगर आप और जानते हैं या आपके पास स्रोत या तस्वीरें हैं, तो ',
    'curation.notice.cta': 'हमें बताएँ',
    'curation.notice.after': '।',
    'curation.badge.verified':
      'गहन तथ्य-जाँच पूरी · यह लेख Taiwan.md के गहन शोध और बिंदुवार तथ्य-जाँच से गुज़रा है',
    'latest.stageFilterLabel': 'चरण',
    'latest.stageAll': 'सभी चरण',
  },
  ar: {
    'nav.latest': 'أحدث المقالات',
    'latest.meta.title': 'أحدث المقالات',
    'latest.meta.description':
      'أحدث ما كتبه الذكاء الاصطناعي والمساهمون، مرتبة حسب وقت الانتهاء.',
    'latest.eyebrow': 'استكشاف زمني',
    'latest.title': 'أحدث المقالات',
    'latest.subtitle':
      'أحدث ما كتبه الذكاء الاصطناعي والمساهمون، مرتبة حسب وقت الانتهاء.',
    'latest.filterAll': 'الكل',
    'latest.empty': 'لا توجد بيانات حاليًا.',
    'latest.changelogCta':
      'تريد الاطلاع على سجل التحديثات الكامل للذكاء الاصطناعي (الترجمة، الإصلاح، التطور)؟ → سجل التحديثات',
    'latest.railHeading': 'تصفح الأحدث',
    'latest.railViewAll': 'عرض جميع أحدث المقالات',
    'latest.exploreSub': 'أحدث ما كتبه الذكاء الاصطناعي والمساهمون',
    'latest.exploreSeeAll': 'عرض الكل →',
    'latest.minRead': 'دقيقة',
    'latest.dayCount': 'مقال',
    'latest.today': 'اليوم',
    'curation.stage.incubating': 'قيد التطور',
    'curation.stage.verified': 'تحرير معمّق',
    'curation.stage.standard': 'مقال قياسي',
    'curation.stage.incubating.unverified': 'قيد التطور · بانتظار التحقق',
    'curation.stage.incubating.thin': 'قيد التطور · بانتظار التوسيع',
    'curation.notice.unverified.before':
      'لم يُكمل هذا المقال بعدُ التحقق من الحقائق بندًا بندًا في Taiwan.md. يمكن قراءته عمومًا، لكن الاقتباسات والتواريخ والأرقام ربما لم تُراجَع كلها بعد. إن لاحظت شيئًا مريبًا، ',
    'curation.notice.thin.before':
      'هذا المقال ما زال هيكلًا أوليًا، وينتظر دوره لإعادة كتابة معمّقة. إن كنت تعرف المزيد أو لديك مصادر أو صور، ',
    'curation.notice.cta': 'أخبرنا',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'تم التحقق المعمّق · خضع هذا المقال للبحث المعمّق والتحقق من الحقائق بندًا بندًا في Taiwan.md',
    'latest.stageFilterLabel': 'المرحلة',
    'latest.stageAll': 'جميع المراحل',
  },
  ru: {
    'nav.latest': 'Последние материалы',
    'latest.meta.title': 'Последние материалы',
    'latest.meta.description':
      'Недавно написанные материалы от ИИ и авторов, отсортированные по времени завершения.',
    'latest.eyebrow': 'Хронологическое исследование',
    'latest.title': 'Последние материалы',
    'latest.subtitle':
      'Недавно написанные материалы от ИИ и авторов, отсортированные по времени завершения.',
    'latest.filterAll': 'Все',
    'latest.empty': 'Данных пока нет.',
    'latest.changelogCta':
      'Хотите увидеть полную активность обновлений ИИ (переводы, исправления, эволюцию)? → Журнал изменений',
    'latest.railHeading': 'Свежие на платформе',
    'latest.railViewAll': 'Посмотреть все последние материалы',
    'latest.exploreSub': 'Недавно написанные материалы от ИИ и авторов',
    'latest.exploreSeeAll': 'Посмотреть все →',
    'latest.minRead': 'мин.',
    'latest.dayCount': 'статей',
    'latest.today': 'Сегодня',
    'curation.stage.incubating': 'В процессе',
    'curation.stage.verified': 'Углублённая проверка',
    'curation.stage.standard': 'Стандартная статья',
    'curation.stage.incubating.unverified': 'В процессе · Ждёт проверки фактов',
    'curation.stage.incubating.thin': 'В процессе · Ждёт дополнения',
    'curation.notice.unverified.before':
      'Эта статья ещё не прошла построчную проверку фактов Taiwan.md. В целом её можно читать, но цитаты, даты и цифры, возможно, проверены не все. Заметили что-то сомнительное? ',
    'curation.notice.thin.before':
      'Пока это лишь набросок статьи, который ждёт своей очереди на глубокую переработку. Знаете больше или у вас есть источники и фотографии? ',
    'curation.notice.cta': 'Сообщите нам',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'Глубоко проверено · Статья прошла углублённое исследование и построчную проверку фактов Taiwan.md',
    'latest.stageFilterLabel': 'Этап',
    'latest.stageAll': 'Все этапы',
  },
  de: {
    'nav.latest': 'Neueste Artikel',
    'latest.meta.title': 'Neueste Artikel',
    'latest.meta.description':
      'Die neuesten Beiträge von KI und Mitwirkenden, nach Fertigstellungszeit sortiert.',
    'latest.eyebrow': 'Chronologische Erkundung',
    'latest.title': 'Neueste Artikel',
    'latest.subtitle':
      'Die neuesten Beiträge von KI und Mitwirkenden, nach Fertigstellungszeit sortiert.',
    'latest.filterAll': 'Alle',
    'latest.empty': 'Derzeit sind noch keine Daten verfügbar.',
    'latest.changelogCta':
      'Alle Aktualisierungen der KI ansehen (Übersetzungen, Korrekturen, Weiterentwicklungen)? → Änderungsprotokoll',
    'latest.railHeading': 'Neu auf der Website',
    'latest.railViewAll': 'Alle neuesten Artikel ansehen',
    'latest.exploreSub': 'Die neuesten Beiträge von KI und Mitwirkenden',
    'latest.exploreSeeAll': 'Alle ansehen →',
    'latest.minRead': 'Min.',
    'latest.dayCount': 'Artikel',
    'latest.today': 'Heute',
    'curation.stage.incubating': 'In Entwicklung',
    'curation.stage.verified': 'Vertieft kuratiert',
    'curation.stage.standard': 'Regulärer Artikel',
    'curation.stage.incubating.unverified':
      'In Entwicklung · Faktencheck ausstehend',
    'curation.stage.incubating.thin': 'In Entwicklung · Ausbau ausstehend',
    'curation.notice.unverified.before':
      'Dieser Artikel hat den Punkt-für-Punkt-Faktencheck von Taiwan.md noch nicht abgeschlossen. Er ist insgesamt gut lesbar, aber Zitate, Jahreszahlen und Zahlen sind womöglich noch nicht alle geprüft. Ist Ihnen etwas zweifelhaft? ',
    'curation.notice.thin.before':
      'Dieser Artikel ist bisher nur ein Gerüst und wartet auf eine gründliche Überarbeitung. Sie wissen mehr oder haben Quellen oder Fotos? ',
    'curation.notice.cta': 'Sagen Sie es uns',
    'curation.notice.after': '.',
    'curation.badge.verified':
      'Gründlich geprüft · Dieser Artikel hat die Tiefenrecherche und den Punkt-für-Punkt-Faktencheck von Taiwan.md durchlaufen',
    'latest.stageFilterLabel': 'Phase',
    'latest.stageAll': 'Alle Phasen',
  },
  'zh-TW': {
    'nav.latest': '最新文章',
    'latest.meta.title': '最新文章',
    'latest.meta.description': 'AI 與貢獻者最近寫好的，依完成時間排序。',
    'latest.eyebrow': '時序探索',
    'latest.title': '最新文章',
    'latest.subtitle': 'AI 與貢獻者最近寫好的，依完成時間排序。',
    'latest.filterAll': '全部',
    'latest.empty': '目前還沒有資料。',
    'latest.changelogCta':
      '想看 AI 完整的更新活動（翻譯、修補、進化）？→ 更新日誌',
    'latest.railHeading': '站上最新',
    'latest.railViewAll': '看全部最新文章',
    'latest.exploreSub': 'AI 與貢獻者最近寫好的',
    'latest.exploreSeeAll': '看全部 →',
    'latest.minRead': '分鐘',
    'latest.dayCount': '篇',
    'latest.today': '今天',
    'curation.stage.incubating': '進化中',
    'curation.stage.verified': '深度策展',
    'curation.stage.standard': '正式文章',
    'curation.stage.incubating.unverified': '進化中 · 待查證',
    'curation.stage.incubating.thin': '進化中 · 待擴寫',
    'curation.notice.unverified.before':
      '這篇還沒走完 Taiwan.md 的逐條事實查證。內容大致可讀，但引語、年份、數字可能還沒逐一核對。讀到可疑的地方，',
    'curation.notice.thin.before':
      '這篇目前只寫到骨架，還在排隊等深度改寫。你知道更多、手上有資料或照片，',
    'curation.notice.cta': '告訴我們',
    'curation.notice.after': '。',
    'curation.badge.verified':
      '已深度查證 · 這篇走過 Taiwan.md 的深度研究與逐項事實查證流程',
    'latest.stageFilterLabel': '階段',
    'latest.stageAll': '全部階段',
  },
};
