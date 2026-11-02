import SwiftUI

struct SearchView: View {
    @Environment(AppModel.self) private var model
    @State private var query = ""
    @State private var quick: [SearchEngine.Hit] = []
    @State private var full: [SearchEngine.Hit]?
    @State private var searching = false
    @State private var elapsed: Double?

    var body: some View {
        let lang = model.readableLang
        List {
            if query.isEmpty {
                suggestions(lang)
            } else if let full {
                Section {
                    ForEach(full) { hit in row(hit) }
                } header: {
                    Text(L.t("全文 \(full.count) 筆", "\(full.count) full-text results", "全文 \(full.count) 件"))
                        + Text(elapsed.map { String(format: " · %.0f ms", $0 * 1000) } ?? "")
                }
                if full.isEmpty { empty }
            } else {
                if !quick.isEmpty {
                    Section(L.t("標題與摘要", "Titles & summaries", "タイトルと概要")) {
                        ForEach(quick.prefix(30)) { hit in row(hit) }
                    }
                }
                Section {
                    Button {
                        runFull()
                    } label: {
                        Label(L.t("搜尋全文「\(query)」", "Search full text for “\(query)”", "全文検索「\(query)」"), systemImage: "text.magnifyingglass")
                    }
                }
            }
        }
        .overlay { if searching { ProgressView() } }
        .navigationTitle(L.t("搜尋", "Search", "検索"))
        .searchable(text: $query, placement: .navigationBarDrawer(displayMode: .always),
                    prompt: L.t("搜尋 \(L.articles(model.packs.allMeta(lang).count))", "Search \(L.articles(model.packs.allMeta(lang).count))", "\(L.articles(model.packs.allMeta(lang).count))を検索"))
        .onSubmit(of: .search) { runFull() }
        .onChange(of: query) { _, q in
            full = nil
            let engine = SearchEngine(store: model.packs)
            quick = q.isEmpty ? [] : engine.search(q, lang: lang, scope: .titles, limit: 40)
        }
    }

    private func runFull() {
        guard !query.isEmpty else { return }
        let q = query, lang = model.readableLang, store = model.packs
        searching = true
        Task.detached(priority: .userInitiated) {
            let t0 = Date()
            let hits = SearchEngine(store: store).search(q, lang: lang, scope: .fullText)
            let dt = Date().timeIntervalSince(t0)
            await MainActor.run {
                if q == query { full = hits; elapsed = dt }
                searching = false
            }
        }
    }

    private func row(_ hit: SearchEngine.Hit) -> some View {
        Button { model.open(hit.meta.ref) } label: { ArticleRow(meta: hit.meta, snippet: hit.snippet) }
            .buttonStyle(.plain)
    }

    private var empty: some View {
        Text(L.t("沒有找到。換個詞試試，或到設定切換內容語言。", "Nothing found. Try another word, or switch content language in Settings.", "見つかりませんでした。別の言葉を試すか、設定でコンテンツ言語を切り替えてください。"))
            .font(.subheadline).foregroundStyle(.secondary)
    }

    @ViewBuilder
    private func suggestions(_ lang: ContentLanguage) -> some View {
        let tags = topTags(lang)
        if !tags.isEmpty {
            Section(L.t("常見主題", "Popular topics", "よくあるテーマ")) {
                FlowTags(tags: tags) { query = $0; runFull() }
            }
        }
        if !model.library.history.isEmpty {
            Section(L.t("最近讀過", "Recently read", "最近読んだ記事")) {
                ForEach(model.library.history.prefix(5)) { s in
                    if let m = model.packs.meta(s.ref) ?? model.packs.meta(ArticleRef(lang: lang, key: s.ref.key)) {
                        Button { model.open(m.ref) } label: { ArticleRow(meta: m, showCategory: true) }.buttonStyle(.plain)
                    }
                }
            }
        }
    }

    private func topTags(_ lang: ContentLanguage) -> [String] {
        var counts: [String: Int] = [:]
        for m in model.packs.allMeta(lang) { for t in m.tags { counts[t, default: 0] += 1 } }
        return counts.filter { $0.value >= 8 && $0.key.count <= 12 }.sorted { $0.value > $1.value }.prefix(24).map(\.key)
    }
}

/// 標籤雲：自動換行的膠囊按鈕
struct FlowTags: View {
    let tags: [String]
    let onTap: (String) -> Void

    var body: some View {
        FlowLayout(spacing: 8) {
            ForEach(tags, id: \.self) { t in
                Button { onTap(t) } label: {
                    Text(t).font(.subheadline)
                        .padding(.horizontal, 10).padding(.vertical, 6)
                        .background(Color.brand.opacity(0.10), in: Capsule())
                        .foregroundStyle(Color.brand)
                }
                .buttonStyle(.plain)
            }
        }
        .padding(.vertical, 4)
    }
}

struct FlowLayout: Layout {
    var spacing: CGFloat = 8

    func sizeThatFits(proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) -> CGSize {
        let width = proposal.width ?? 320
        var x: CGFloat = 0, y: CGFloat = 0, rowH: CGFloat = 0
        for v in subviews {
            let s = v.sizeThatFits(.unspecified)
            if x + s.width > width, x > 0 { x = 0; y += rowH + spacing; rowH = 0 }
            x += s.width + spacing
            rowH = max(rowH, s.height)
        }
        return CGSize(width: width, height: y + rowH)
    }

    func placeSubviews(in bounds: CGRect, proposal: ProposedViewSize, subviews: Subviews, cache: inout ()) {
        var x = bounds.minX, y = bounds.minY, rowH: CGFloat = 0
        for v in subviews {
            let s = v.sizeThatFits(.unspecified)
            if x + s.width > bounds.maxX, x > bounds.minX { x = bounds.minX; y += rowH + spacing; rowH = 0 }
            v.place(at: CGPoint(x: x, y: y), proposal: ProposedViewSize(s))
            x += s.width + spacing
            rowH = max(rowH, s.height)
        }
    }
}
