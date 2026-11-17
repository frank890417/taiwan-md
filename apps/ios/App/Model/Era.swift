import SwiftUI

/// 時間軸資料：App 內建一份網站 src/data/timeline-eras.json（tools/sync-web-assets.sh 同步）。
/// 文字欄內嵌 6 語；其他語言退回英文。
struct Era: Decodable, Identifiable {
    /// 文字欄：大多是 6 語字典，少數只有一個字串（年份、年代標籤）
    struct Localized: Decodable {
        let values: [String: String]
        init(from decoder: Decoder) throws {
            let c = try decoder.singleValueContainer()
            if let s = try? c.decode(String.self) { values = ["en": s] } else { values = try c.decode([String: String].self) }
        }
        subscript(_ k: String) -> String? { values[k] }
        func pick(_ lang: ContentLanguage) -> String {
            values[lang.timelineCode] ?? values["en"] ?? values["zh-TW"] ?? values.values.first ?? ""
        }
    }

    struct Event: Decodable, Identifiable {
        /// 年份多半是 "1684"，史前事件是多語字串（「約 3 萬年前」）
        let year: Localized
        let title: Localized
        let desc: Localized?
        let link: String?
        var id: String { (year["en"] ?? "") + (title["en"] ?? "") }

    }

    struct Figure: Decodable, Identifiable {
        let ref: String
        let name: Localized
        var id: String { ref }
    }

    let id: String
    let color: String
    let yearsLabel: Localized
    let title: Localized
    let subtitle: Localized
    let intro: Localized
    let events: [Event]
    let anchors: [String]?
    let articles: [String]?
    let figures: [Figure]?

    var tint: Color {
        let hex = UInt32(color.trimmingCharacters(in: CharacterSet(charactersIn: "#")), radix: 16) ?? 0x007864
        return Color(hex: hex)
    }

    static let all: [Era] = {
        struct File: Decodable { let eras: [Era] }
        guard let url = Bundle.main.url(forResource: "timeline-eras", withExtension: "json"),
              let data = try? Data(contentsOf: url),
              let f = try? JSONDecoder().decode(File.self, from: data) else { return [] }
        return f.eras
    }()
}
