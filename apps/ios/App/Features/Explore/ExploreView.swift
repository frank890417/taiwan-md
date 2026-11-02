import SwiftUI

struct ExploreView: View {
    @Environment(AppModel.self) private var model
    private let columns = [GridItem(.flexible(), spacing: 12), GridItem(.flexible(), spacing: 12)]

    var body: some View {
        let all = model.packs.allMeta(model.readableLang)
        let counts = Dictionary(grouping: all, by: \.category).mapValues(\.count)
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Button { model.push(.timeline) } label: { timelineCard }
                    .buttonStyle(.plain)
                    .padding(.horizontal)

                SectionHeader(title: L.t("十四個分類", "Fourteen categories", "14 のカテゴリ"), trailing: L.articles(all.count))
                LazyVGrid(columns: columns, spacing: 12) {
                    ForEach(ArticleCategory.browseOrder) { c in
                        Button { model.push(.category(c)) } label: {
                            CategoryTile(category: c, count: counts[c] ?? 0)
                        }
                        .buttonStyle(.plain)
                    }
                }
                .padding(.horizontal)
            }
            .padding(.vertical)
        }
        .navigationTitle(L.t("探索", "Explore", "探索"))
    }

    private var timelineCard: some View {
        let eras = Era.all
        return VStack(alignment: .leading, spacing: 10) {
            HStack {
                Label(L.t("時間軸", "Timeline", "年表"), systemImage: "clock.arrow.circlepath")
                    .font(.headline)
                Spacer()
                Image(systemName: "chevron.right").foregroundStyle(.tertiary)
            }
            Text(L.t("從三萬年前的南島原鄉到今天，八個時代。", "Eight eras, from Austronesian origins 30,000 years ago to today.", "3 万年前のオーストロネシアの源郷から現在まで、8 つの時代。"))
                .font(.subheadline).foregroundStyle(.secondary)
            HStack(spacing: 3) {
                ForEach(eras) { e in
                    RoundedRectangle(cornerRadius: 3).fill(e.tint).frame(height: 8)
                }
            }
        }
        .padding(16)
        .background(.background.secondary, in: RoundedRectangle(cornerRadius: 18, style: .continuous))
    }
}

struct CategoryTile: View {
    let category: ArticleCategory
    let count: Int

    var body: some View {
        VStack(alignment: .leading, spacing: 10) {
            Image(systemName: category.symbol)
                .font(.title2)
                .foregroundStyle(category.tint)
            Spacer(minLength: 0)
            Text(category.name).font(.headline).foregroundStyle(.primary)
            Text(L.articles(count)).font(.caption).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, minHeight: 104, alignment: .leading)
        .padding(14)
        .background(category.tint.opacity(0.10), in: RoundedRectangle(cornerRadius: 16, style: .continuous))
        .accessibilityElement(children: .combine)
    }
}

struct CategoryView: View {
    @Environment(AppModel.self) private var model
    let category: ArticleCategory
    @State private var sort: Sort = .newest

    enum Sort: String, CaseIterable, Identifiable {
        case newest, title, length
        var id: String { rawValue }
        var name: String {
            switch self {
            case .newest: L.t("最新", "Newest", "新しい順")
            case .title: L.t("標題", "Title", "タイトル")
            case .length: L.t("篇幅", "Length", "長さ")
            }
        }
    }

    var body: some View {
        let items = model.packs.allMeta(model.readableLang).filter { $0.category == category }
        let sorted: [ArticleMeta] = switch sort {
        case .newest: items.sorted { ($0.created ?? "", $0.key) > ($1.created ?? "", $1.key) }
        case .title: items.sorted { $0.title.localizedStandardCompare($1.title) == .orderedAscending }
        case .length: items.sorted { $0.chars > $1.chars }
        }
        let groups = Dictionary(grouping: sorted) { $0.subcategory ?? "" }
        let subs = groups.keys.sorted { (groups[$0]?.count ?? 0) > (groups[$1]?.count ?? 0) }

        List {
            if sort == .newest || subs.count <= 1 {
                ForEach(sorted) { m in row(m) }
            } else {
                ForEach(subs, id: \.self) { s in
                    Section(s.isEmpty ? L.t("其他", "Other", "その他") : s) {
                        ForEach(groups[s] ?? []) { m in row(m) }
                    }
                }
            }
        }
        .listStyle(.plain)
        .navigationTitle(category.name)
        .toolbar {
            Menu {
                Picker(L.t("排序", "Sort", "並べ替え"), selection: $sort) {
                    ForEach(Sort.allCases) { Text($0.name).tag($0) }
                }
            } label: { Image(systemName: "arrow.up.arrow.down") }
        }
    }

    private func row(_ m: ArticleMeta) -> some View {
        Button { model.open(m.ref) } label: { ArticleRow(meta: m, showCategory: sort != .newest ? false : m.subcategory != nil) }
            .buttonStyle(.plain)
    }
}
