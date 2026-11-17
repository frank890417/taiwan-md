import Foundation
import Observation

/// 收藏、最近讀過、閱讀進度。只存在本機（Application Support/library.json），不上傳任何地方。
@Observable
final class Library {
    struct Saved: Codable, Hashable, Identifiable {
        let ref: ArticleRef
        var title: String
        var category: String
        var date: Date
        var id: String { ref.id }
    }

    private struct Store: Codable {
        var bookmarks: [Saved] = []
        var history: [Saved] = []
        var progress: [String: Double] = [:]   // "lang|key" → 0...1
    }

    private var store = Store()
    var bookmarks: [Saved] { store.bookmarks }
    var history: [Saved] { store.history }

    private let url: URL = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        .appendingPathComponent("library.json")

    init() {
        if let data = try? Data(contentsOf: url), let s = try? JSONDecoder.iso.decode(Store.self, from: data) { store = s }
    }

    private func save() {
        if let data = try? JSONEncoder.iso.encode(store) { try? data.write(to: url, options: .atomic) }
    }

    /// 收藏以跨語 key 判斷：英文版收藏過，切到中文也算已收藏
    func isBookmarked(_ key: String) -> Bool { store.bookmarks.contains { $0.ref.key == key } }

    func toggleBookmark(_ m: ArticleMeta) {
        if isBookmarked(m.key) {
            store.bookmarks.removeAll { $0.ref.key == m.key }
        } else {
            store.bookmarks.insert(Saved(ref: m.ref, title: m.title, category: m.category.rawValue, date: Date()), at: 0)
        }
        save()
    }

    func removeBookmark(_ s: Saved) {
        store.bookmarks.removeAll { $0.id == s.id }
        save()
    }

    func recordVisit(_ m: ArticleMeta) {
        store.history.removeAll { $0.ref.key == m.key }
        store.history.insert(Saved(ref: m.ref, title: m.title, category: m.category.rawValue, date: Date()), at: 0)
        if store.history.count > 200 { store.history.removeLast(store.history.count - 200) }
        save()
    }

    func clearHistory() {
        store.history.removeAll()
        save()
    }

    func progress(_ ref: ArticleRef) -> Double { store.progress[ref.id] ?? 0 }

    func setProgress(_ ref: ArticleRef, _ value: Double) {
        let v = min(1, max(0, value))
        // 讀到最後 3% 視為讀完，進度歸零讓下次從頭開
        store.progress[ref.id] = v > 0.97 ? nil : v
        save()
    }

    /// 讀到一半（5%–97%）的文章，依最近讀過排序
    var inProgress: [Saved] {
        store.history.filter { (store.progress[$0.ref.id] ?? 0) > 0.05 }
    }
}
