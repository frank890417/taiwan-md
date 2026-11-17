import SwiftUI

/// 14 個分類，資料夾名與網站 src/utils/rawArticle.ts CATEGORY_TO_FOLDER 一致。
enum ArticleCategory: String, CaseIterable, Identifiable {
    case History, Geography, Culture, Food, Art, Music, Technology, Nature, People, Politics, Society, Economy, Lifestyle, About

    var id: String { rawValue }
    var slug: String { rawValue.lowercased() }

    var name: String {
        switch self {
        case .History: L.t("歷史", "History", "歴史")
        case .Geography: L.t("地理", "Geography", "地理")
        case .Culture: L.t("文化", "Culture", "文化")
        case .Food: L.t("美食", "Food", "食")
        case .Art: L.t("藝術", "Art", "アート")
        case .Music: L.t("音樂", "Music", "音楽")
        case .Technology: L.t("科技", "Technology", "テクノロジー")
        case .Nature: L.t("自然", "Nature", "自然")
        case .People: L.t("人物", "People", "人物")
        case .Politics: L.t("政治", "Politics", "政治")
        case .Society: L.t("社會", "Society", "社会")
        case .Economy: L.t("經濟", "Economy", "経済")
        case .Lifestyle: L.t("生活", "Lifestyle", "暮らし")
        case .About: L.t("關於", "About", "について")
        }
    }

    var symbol: String {
        switch self {
        case .History: "building.columns"
        case .Geography: "mountain.2"
        case .Culture: "theatermasks"
        case .Food: "fork.knife"
        case .Art: "paintpalette"
        case .Music: "music.note"
        case .Technology: "cpu"
        case .Nature: "leaf"
        case .People: "person.2"
        case .Politics: "checkmark.seal"
        case .Society: "person.3.sequence"
        case .Economy: "chart.line.uptrend.xyaxis"
        case .Lifestyle: "cup.and.saucer"
        case .About: "info.circle"
        }
    }

    /// 分類色：沿用網站識別系統的墨綠為主，各分類用同一明度的不同色相
    var tint: Color {
        switch self {
        case .History: Color(hex: 0x9A5B00)
        case .Geography: Color(hex: 0x2F7A3E)
        case .Culture: Color(hex: 0xB0125F)
        case .Food: Color(hex: 0xC2410C)
        case .Art: Color(hex: 0x7C3AED)
        case .Music: Color(hex: 0xDB2777)
        case .Technology: Color(hex: 0x0369A1)
        case .Nature: Color(hex: 0x15803D)
        case .People: Color(hex: 0x007864)
        case .Politics: Color(hex: 0x1D4ED8)
        case .Society: Color(hex: 0x0F766E)
        case .Economy: Color(hex: 0xA16207)
        case .Lifestyle: Color(hex: 0xBE185D)
        case .About: Color(hex: 0x435258)
        }
    }

    /// 分類總覽排序（About 放最後）
    static let browseOrder: [ArticleCategory] = allCases
}

extension Color {
    init(hex: UInt32, opacity: Double = 1) {
        self.init(.sRGB,
                  red: Double((hex >> 16) & 0xFF) / 255,
                  green: Double((hex >> 8) & 0xFF) / 255,
                  blue: Double(hex & 0xFF) / 255,
                  opacity: opacity)
    }

    /// 識別系統 v2 品牌色（public/brand/taiwanmd-tokens.json）
    static let brand = Color("AccentColor")
}
