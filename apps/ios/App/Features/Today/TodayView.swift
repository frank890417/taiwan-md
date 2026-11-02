import SwiftUI

struct TodayView: View {
    @Environment(AppModel.self) private var model

    private var lang: ContentLanguage { model.readableLang }
    private var all: [ArticleMeta] { model.packs.allMeta(lang) }

    private var latest: [ArticleMeta] {
        all.filter { $0.category != .About }
            .sorted { ($0.created ?? "", $0.key) > ($1.created ?? "", $1.key) }
            .prefix(20).map { $0 }
    }

    private var featured: [ArticleMeta] {
        let f = all.filter { $0.featured && $0.category != .About }
        // 精選每天輪一批：用日期把順序轉一圈
        guard !f.isEmpty else { return [] }
        let day = Calendar.current.ordinality(of: .day, in: .era, for: Date()) ?? 0
        let start = (day * 7) % f.count
        return Array((f[start...] + f[..<start]).prefix(10))
    }

    var body: some View {
        ScrollView {
            LazyVStack(alignment: .leading, spacing: 14) {
                header
                if let pick = model.dailyPick() {
                    Button { model.open(pick.ref) } label: {
                        ArticleCard(meta: pick, eyebrow: L.t("今日一篇", "Today's read", "今日の一篇"), height: 300)
                    }
                    .buttonStyle(.plain)
                    .padding(.horizontal)
                }

                if !featured.isEmpty {
                    SectionHeader(title: L.t("精選", "Featured", "注目"))
                    ScrollView(.horizontal, showsIndicators: false) {
                        LazyHStack(spacing: 12) {
                            ForEach(featured) { m in
                                Button { model.open(m.ref) } label: {
                                    ArticleCard(meta: m, height: 200).frame(width: 270)
                                }
                                .buttonStyle(.plain)
                            }
                        }
                        .padding(.horizontal)
                    }
                }

                SectionHeader(title: L.t("分類", "Categories", "カテゴリ"))
                ScrollView(.horizontal, showsIndicators: false) {
                    HStack(spacing: 8) {
                        ForEach(ArticleCategory.browseOrder.filter { $0 != .About }) { c in
                            Button { model.push(.category(c)) } label: {
                                Label(c.name, systemImage: c.symbol)
                                    .font(.subheadline.weight(.medium))
                                    .padding(.horizontal, 12).padding(.vertical, 8)
                                    .background(c.tint.opacity(0.12), in: Capsule())
                                    .foregroundStyle(c.tint)
                            }
                        }
                    }
                    .padding(.horizontal)
                }

                SectionHeader(title: L.t("最新文章", "Latest", "新着"))
                VStack(spacing: 0) {
                    ForEach(latest) { m in
                        Button { model.open(m.ref) } label: {
                            ArticleRow(meta: m).frame(maxWidth: .infinity, alignment: .leading)
                                .padding(.horizontal).padding(.vertical, 8)
                                .contentShape(Rectangle())
                        }
                        .buttonStyle(.plain)
                        Divider().padding(.leading)
                    }
                }
                footer
            }
            .padding(.bottom, 24)
        }
        .navigationTitle(L.t("今日", "Today", "今日"))
        .toolbarTitleDisplayMode(.inlineLarge)
        .overlay {
            if all.isEmpty { MissingPackView(lang: model.contentLang) }
        }
    }

    private var header: some View {
        VStack(alignment: .leading, spacing: 2) {
            Text(Date().formatted(.dateTime.month(.wide).day().weekday(.wide).locale(L.locale)))
                .font(.subheadline.weight(.semibold))
                .foregroundStyle(.secondary)
            if lang != model.contentLang {
                Label(L.t("\(model.contentLang.nativeName) 內容包下載中，先顯示\(lang.nativeName)",
                          "\(model.contentLang.nativeName) pack not downloaded yet — showing \(lang.nativeName)",
                          "\(model.contentLang.nativeName) は未ダウンロードのため\(lang.nativeName)で表示"),
                      systemImage: "arrow.down.circle")
                    .font(.footnote).foregroundStyle(.orange)
            }
        }
        .padding(.horizontal)
    }

    private var footer: some View {
        Text(L.t("\(L.articles(all.count))，全部離線可讀。內容以 CC BY-SA 4.0 授權，由 Taiwan.md 貢獻者共同撰寫。",
                 "\(L.articles(all.count)), all readable offline. Content by Taiwan.md contributors under CC BY-SA 4.0.",
                 "\(L.articles(all.count))、すべてオフラインで読めます。コンテンツは Taiwan.md 貢献者による CC BY-SA 4.0。"))
            .font(.caption).foregroundStyle(.secondary)
            .padding(.horizontal).padding(.top, 12)
    }
}
