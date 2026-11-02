import Foundation

/// 把內容包的文章 HTML 包成一頁完整文件：頁首、首圖、正文、頁尾授權。
/// CSS 與 JS 都內嵌（WKWebView 以 https://taiwan.md/ 當 baseURL，讀不到 App 本體的 file://）。
enum ReaderDocument {
    private static func resource(_ name: String, _ ext: String) -> String {
        guard let url = Bundle.main.url(forResource: name, withExtension: ext),
              let s = try? String(contentsOf: url, encoding: .utf8) else { return "" }
        return s
    }

    private static let css: String = resource("tokens", "css") + "\n" + resource("article-modules", "css") + "\n" + resource("reader", "css")
    private static let js: String = resource("reader", "js")

    static func esc(_ s: String) -> String {
        s.replacingOccurrences(of: "&", with: "&amp;").replacingOccurrences(of: "<", with: "&lt;")
            .replacingOccurrences(of: ">", with: "&gt;").replacingOccurrences(of: "\"", with: "&quot;")
    }

    static func build(meta m: ArticleMeta, body: String) -> String {
        let dir = m.lang.isRTL ? "rtl" : "ltr"
        let cat = m.subcategory.map { "\(m.category.name) · \($0)" } ?? m.category.name
        let updated = m.updated.map { L.t("更新於 ", "Updated ", "更新 ") + L.shortDate($0) } ?? ""
        var hero = ""
        if let img = m.imageURL, !m.heroInBody {
            let credit = [m.imageCredit, m.imageLicense].compactMap { $0 }.joined(separator: " · ")
            hero = """
            <figure class="app-hero"><img src="\(esc(img.absoluteString))" alt="\(esc(m.imageAlt ?? ""))">\
            \(credit.isEmpty ? "" : "<figcaption>\(esc(credit))</figcaption>")</figure>
            """
        }
        let foot = L.t(
            "本文由 Taiwan.md 貢獻者撰寫，以 <a data-external href=\"https://creativecommons.org/licenses/by-sa/4.0/\">CC BY-SA 4.0</a> 授權。App 只改變排版，沒有改動內容。",
            "Written by Taiwan.md contributors, licensed under <a data-external href=\"https://creativecommons.org/licenses/by-sa/4.0/\">CC BY-SA 4.0</a>. The app changes only the layout, not the content.",
            "本記事は Taiwan.md 貢献者による <a data-external href=\"https://creativecommons.org/licenses/by-sa/4.0/\">CC BY-SA 4.0</a> のコンテンツです。アプリはレイアウトのみを変更しています。")
        return """
        <!doctype html>
        <html lang="\(m.lang.code)" dir="\(dir)" data-theme="light">
        <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
        <style>\(css)</style>
        </head>
        <body>
        <main class="app-article">
          <header class="app-head">
            <div class="app-cat" style="--cat:\(m.category.hexString)"><bdi>\(esc(cat))</bdi></div>
            <h1>\(esc(m.title))</h1>
            \(m.description.isEmpty ? "" : "<p class=\"app-desc\">\(esc(m.description))</p>")
            <div class="app-meta"><bdi>\(esc(L.minutes(m.readingTime)))\(updated.isEmpty ? "" : " · " + esc(updated))</bdi></div>
          </header>
          \(hero)
          <article class="article-body">\(body)</article>
          <footer class="app-foot">
            <p>\(foot)</p>
            <p><a data-external href="\(esc(m.webURL.absoluteString))">\(esc(L.t("原文網址", "Original page", "元のページ")))</a>
             · <a data-external href="\(esc(m.sourceURL.absoluteString))">GitHub</a>
             · <a data-external href="https://github.com/frank890417/taiwan-md/issues/new">\(esc(L.t("回報勘誤", "Report a correction", "誤りを報告")))</a></p>
          </footer>
        </main>
        <div id="fn-pop" role="dialog" aria-modal="true" hidden><div class="fn-card"><button class="fn-close" aria-label="close">×</button><div class="fn-body"></div></div></div>
        <script>\(js)</script>
        </body>
        </html>
        """
    }

    /// 正文 h2 → 目錄
    static func headings(_ html: String) -> [(id: String, title: String)] {
        guard let re = try? NSRegularExpression(pattern: "<h2 id=\"([^\"]+)\"[^>]*>(.*?)</h2>", options: [.dotMatchesLineSeparators]) else { return [] }
        let ns = html as NSString
        return re.matches(in: html, range: NSRange(location: 0, length: ns.length)).compactMap { m in
            let id = ns.substring(with: m.range(at: 1))
            let raw = ns.substring(with: m.range(at: 2))
            let title = raw.replacingOccurrences(of: "<[^>]+>", with: "", options: .regularExpression)
                .replacingOccurrences(of: "&amp;", with: "&").trimmingCharacters(in: .whitespaces)
            return title.isEmpty ? nil : (id, title)
        }
    }
}

extension ArticleCategory {
    var hexString: String {
        switch self {
        case .History: "#9A5B00"
        case .Geography: "#2F7A3E"
        case .Culture: "#B0125F"
        case .Food: "#C2410C"
        case .Art: "#7C3AED"
        case .Music: "#DB2777"
        case .Technology: "#0369A1"
        case .Nature: "#15803D"
        case .People: "#007864"
        case .Politics: "#1D4ED8"
        case .Society: "#0F766E"
        case .Economy: "#A16207"
        case .Lifestyle: "#BE185D"
        case .About: "#435258"
        }
    }
}
