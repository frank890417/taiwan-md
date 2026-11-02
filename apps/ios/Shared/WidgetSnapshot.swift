import Foundation

/// App 與 Widget 共用的「今日一篇」快照。App 啟動或內容包更新時寫，Widget 只讀不開資料庫。
struct WidgetSnapshot: Codable {
    struct Pick: Codable, Hashable {
        let day: String          // yyyy-MM-dd（台北時間）
        let lang: String
        let key: String
        let category: String
        let categoryName: String
        let title: String
        let summary: String
    }
    var generatedAt: Date
    var picks: [Pick]

    static let appGroup = "group.md.taiwan.app"
    static let fileName = "widget-snapshot.json"

    static var url: URL? {
        FileManager.default.containerURL(forSecurityApplicationGroupIdentifier: appGroup)?
            .appendingPathComponent(fileName)
    }

    static func load() -> WidgetSnapshot? {
        guard let url, let data = try? Data(contentsOf: url) else { return nil }
        let dec = JSONDecoder()
        dec.dateDecodingStrategy = .iso8601
        return try? dec.decode(WidgetSnapshot.self, from: data)
    }

    func save() {
        guard let url = Self.url else { return }
        let enc = JSONEncoder()
        enc.dateEncodingStrategy = .iso8601
        if let data = try? enc.encode(self) { try? data.write(to: url, options: .atomic) }
    }

    func pick(for date: Date) -> Pick? {
        let day = Self.dayString(date)
        return picks.first { $0.day == day } ?? picks.last
    }

    static func dayString(_ date: Date) -> String {
        var cal = Calendar(identifier: .gregorian)
        cal.timeZone = TimeZone(identifier: "Asia/Taipei") ?? .current
        let c = cal.dateComponents([.year, .month, .day], from: date)
        return String(format: "%04d-%02d-%02d", c.year ?? 0, c.month ?? 0, c.day ?? 0)
    }

    /// 文章深連結：taiwanmd://article/{lang}/{key}
    static func articleURL(lang: String, key: String) -> URL {
        var c = URLComponents()
        c.scheme = "taiwanmd"
        c.host = "article"
        c.path = "/\(lang)/\(key)"
        return c.url ?? URL(string: "taiwanmd://tab/today")!
    }
}
