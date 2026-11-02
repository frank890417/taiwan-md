import Foundation

/// 13 個內容語言，代碼與網站 src/config/languages.ts 一致。
enum ContentLanguage: String, CaseIterable, Identifiable, Codable {
    case zhTW = "zh-TW", en, ja, ko, es, fr, vi, id, pt, hi, ar, ru, de

    var id: String { rawValue }
    var code: String { rawValue }

    /// 以該語言自己的寫法顯示
    var nativeName: String {
        switch self {
        case .zhTW: "繁體中文"
        case .en: "English"
        case .ja: "日本語"
        case .ko: "한국어"
        case .es: "Español"
        case .fr: "Français"
        case .vi: "Tiếng Việt"
        case .id: "Bahasa Indonesia"
        case .pt: "Português"
        case .hi: "हिन्दी"
        case .ar: "العربية"
        case .ru: "Русский"
        case .de: "Deutsch"
        }
    }

    var isRTL: Bool { self == .ar }

    /// App 本體內建的三包（其他語言在設定頁下載）
    static let bundled: [ContentLanguage] = [.zhTW, .en, .ja]
    var isBundled: Bool { Self.bundled.contains(self) }

    /// 時間軸資料內嵌的語言；其他語言退回英文
    var timelineCode: String {
        switch self {
        case .zhTW, .en, .ja, .ko, .es, .fr: rawValue
        default: "en"
        }
    }

    /// 網址前綴：中文沒有前綴
    var pathPrefix: String { self == .zhTW ? "" : "/\(rawValue)" }

    /// 依系統偏好語言挑內容語言，對不到就用繁體中文
    static func preferred(_ preferredLanguages: [String] = Locale.preferredLanguages) -> ContentLanguage {
        for tag in preferredLanguages {
            let lower = tag.lowercased()
            if lower.hasPrefix("zh") { return .zhTW }
            let base = String(lower.prefix { $0 != "-" && $0 != "_" })
            if let hit = ContentLanguage.allCases.first(where: { $0.rawValue == base }) { return hit }
            if base == "in" { return .id }
        }
        return .zhTW
    }
}
