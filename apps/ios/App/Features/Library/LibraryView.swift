import SwiftUI

struct LibraryView: View {
    @Environment(AppModel.self) private var model
    @State private var section: Section = .bookmarks

    enum Section: String, CaseIterable, Identifiable {
        case bookmarks, reading, history
        var id: String { rawValue }
        var name: String {
            switch self {
            case .bookmarks: L.t("收藏", "Saved", "保存済み")
            case .reading: L.t("讀到一半", "In progress", "読みかけ")
            case .history: L.t("最近讀過", "History", "履歴")
            }
        }
    }

    var body: some View {
        let lib = model.library
        let items: [Library.Saved] = switch section {
        case .bookmarks: lib.bookmarks
        case .reading: lib.inProgress
        case .history: lib.history
        }
        List {
            Picker("", selection: $section) {
                ForEach(Section.allCases) { Text($0.name).tag($0) }
            }
            .pickerStyle(.segmented)
            .listRowSeparator(.hidden)

            if items.isEmpty {
                emptyState.listRowSeparator(.hidden)
            }
            ForEach(items) { s in
                Button { open(s) } label: {
                    if let m = resolve(s) {
                        HStack {
                            ArticleRow(meta: m)
                            if section == .reading {
                                Spacer()
                                ProgressRing(value: lib.progress(s.ref)).frame(width: 26, height: 26)
                            }
                        }
                    } else {
                        Text(s.title).foregroundStyle(.secondary)
                    }
                }
                .buttonStyle(.plain)
                .swipeActions {
                    if section == .bookmarks {
                        Button(role: .destructive) { lib.removeBookmark(s) } label: {
                            Label(L.t("移除", "Remove", "削除"), systemImage: "trash")
                        }
                    }
                }
            }
            if section == .history && !items.isEmpty {
                Button(L.t("清除紀錄", "Clear history", "履歴を消去"), role: .destructive) { lib.clearHistory() }
            }
        }
        .listStyle(.plain)
        .navigationTitle(L.t("收藏", "Library", "ライブラリ"))
    }

    /// 收藏時的語言可能已經刪掉了，就用目前語言的同一篇
    private func resolve(_ s: Library.Saved) -> ArticleMeta? {
        model.packs.meta(s.ref) ?? model.packs.meta(ArticleRef(lang: model.readableLang, key: s.ref.key))
    }

    private func open(_ s: Library.Saved) {
        if let m = resolve(s) { model.open(m.ref) }
    }

    private var emptyState: some View {
        let (icon, text): (String, String) = switch section {
        case .bookmarks: ("bookmark", L.t("在文章右上角按書籤，就會收在這裡。", "Tap the bookmark in an article to save it here.", "記事の右上のブックマークで保存できます。"))
        case .reading: ("book", L.t("讀到一半的文章會出現在這裡。", "Articles you started will show up here.", "読みかけの記事がここに表示されます。"))
        case .history: ("clock", L.t("還沒有讀過的文章。", "No reading history yet.", "まだ履歴はありません。"))
        }
        return ContentUnavailableView(section.name, systemImage: icon, description: Text(text))
            .frame(maxWidth: .infinity)
            .padding(.top, 40)
    }
}

struct ProgressRing: View {
    let value: Double
    var body: some View {
        ZStack {
            Circle().stroke(Color.secondary.opacity(0.2), lineWidth: 3)
            Circle().trim(from: 0, to: value).stroke(Color.brand, style: StrokeStyle(lineWidth: 3, lineCap: .round))
                .rotationEffect(.degrees(-90))
        }
        .accessibilityLabel(Text("\(Int(value * 100))%"))
    }
}
