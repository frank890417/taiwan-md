import Foundation

/// 介面文字：繁中、英文、日文三語，就地寫在呼叫處（`L.t("今日", "Today", "今日")`）。
/// 介面語言跟系統（含 iOS 設定裡的「App 語言」）；內容語言另外在設定頁選。
enum L {
    enum UI { case zh, en, ja }

    static let ui: UI = {
        let first = Bundle.main.preferredLocalizations.first?.lowercased() ?? "zh-hant"
        if first.hasPrefix("ja") { return .ja }
        if first.hasPrefix("en") { return .en }
        return .zh
    }()

    static func t(_ zh: String, _ en: String, _ ja: String) -> String {
        switch ui {
        case .zh: zh
        case .en: en
        case .ja: ja
        }
    }

    static var locale: Locale {
        switch ui {
        case .zh: Locale(identifier: "zh-Hant-TW")
        case .en: Locale(identifier: "en")
        case .ja: Locale(identifier: "ja")
        }
    }

    static func minutes(_ n: Int) -> String {
        t("\(n) 分鐘", "\(n) min", "\(n) 分")
    }

    static func articles(_ n: Int) -> String {
        let s = n.formatted(.number.locale(locale))
        return t("\(s) 篇", n == 1 ? "1 article" : "\(s) articles", "\(s) 本")
    }

    static func shortDate(_ iso: String?) -> String {
        guard let iso, iso.count >= 10 else { return "" }
        let f = DateFormatter()
        f.locale = Locale(identifier: "en_US_POSIX")
        f.dateFormat = "yyyy-MM-dd"
        guard let d = f.date(from: String(iso.prefix(10))) else { return iso }
        return d.formatted(.dateTime.year().month(.abbreviated).day().locale(locale))
    }
}
