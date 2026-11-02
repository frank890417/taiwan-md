import SwiftUI

/// 時間軸資料：App 內建一份網站 src/data/timeline-eras.json（tools/sync-web-assets.sh 同步）。
/// 文字欄內嵌 6 語；其他語言退回英文。
struct Era: Decodable, Identifiable {
    typealias Localized = [String: String]

    struct Event: Decodable, Identifiable {
        let year: String
        let title: Localized
        let desc: Localized?
        let link: String?
        var id: String { year + (title["en"] ?? "") }
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

extension Dictionary where Key == String, Value == String {
    func pick(_ lang: ContentLanguage) -> String {
        self[lang.timelineCode] ?? self["en"] ?? self["zh-TW"] ?? values.first ?? ""
    }
}
