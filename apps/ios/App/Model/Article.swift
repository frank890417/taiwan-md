import Foundation

/// 內容包 articles 表的一列（不含正文）。
struct ArticleMeta: Identifiable, Hashable {
    let lang: ContentLanguage
    let key: String          // 跨語共用鍵：'History/二二八事件'
    let path: String         // 網址路徑：'/en/history/228-incident'
    let category: ArticleCategory
    let subcategory: String?
    let title: String
    let description: String
    let tags: [String]
    let date: String?
    let created: String?
    let updated: String?
    let readingTime: Int
    let featured: Bool
    let image: String?
    let imageAlt: String?
    let imageCredit: String?
    let imageLicense: String?
    let heroInBody: Bool
    let chars: Int

    var id: String { "\(lang.code)|\(key)" }
    var ref: ArticleRef { ArticleRef(lang: lang, key: key) }

    var webURL: URL { URL(string: "https://taiwan.md" + Self.encodePath(path) + "/")! }

    var imageURL: URL? {
        guard let image, !image.isEmpty else { return nil }
        if image.hasPrefix("http") { return URL(string: image) }
        return URL(string: "https://taiwan.md" + Self.encodePath(image))
    }

    /// 原始 markdown 在 GitHub 的位置
    var sourceURL: URL {
        let folder = lang == .zhTW ? "knowledge" : "knowledge/\(lang.code)"
        let slug = path.split(separator: "/").last.map(String.init) ?? ""
        return URL(string: "https://github.com/frank890417/taiwan-md/blob/main/\(folder)/\(category.rawValue)/" + Self.encodeComponent(slug) + ".md")!
    }

    static func encodePath(_ p: String) -> String {
        p.split(separator: "/", omittingEmptySubsequences: false).map { encodeComponent(String($0)) }.joined(separator: "/")
    }

    static func encodeComponent(_ s: String) -> String {
        s.addingPercentEncoding(withAllowedCharacters: .urlPathAllowed.subtracting(CharacterSet(charactersIn: "/"))) ?? s
    }
}

/// 收藏、進度、導覽都用這個鍵：語言＋跨語 key。
struct ArticleRef: Hashable, Codable, Identifiable {
    let lang: ContentLanguage
    let key: String
    var id: String { "\(lang.code)|\(key)" }
}
