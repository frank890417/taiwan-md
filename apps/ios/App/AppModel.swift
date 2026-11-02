import SwiftUI
import Observation
import WidgetKit

enum AppTab: String, Hashable, CaseIterable { case today, explore, search, library, settings }

enum Appearance: String, CaseIterable, Identifiable {
    case system, light, dark
    var id: String { rawValue }
    var name: String {
        switch self {
        case .system: L.t("跟隨系統", "System", "システム")
        case .light: L.t("淺色", "Light", "ライト")
        case .dark: L.t("深色", "Dark", "ダーク")
        }
    }
    var scheme: ColorScheme? { self == .light ? .light : self == .dark ? .dark : nil }
}

/// 頁面導覽的目的地
enum Route: Hashable {
    case article(ArticleRef)
    case category(ArticleCategory)
    case timeline
    case era(String)
}

/// 全 App 共用狀態：設定、內容包、收藏、導覽。
@Observable
final class AppModel {
    let packs = PackStore()
    let library = Library()
    @ObservationIgnored lazy var updater = PackUpdater(store: packs)

    var tab: AppTab = .today
    var paths: [AppTab: [Route]] = [:]
    var ready = false

    var contentLang: ContentLanguage {
        didSet { UserDefaults.standard.set(contentLang.rawValue, forKey: "contentLang") }
    }
    var fontScale: Double {
        didSet { UserDefaults.standard.set(fontScale, forKey: "fontScale") }
    }
    var appearance: Appearance {
        didSet { UserDefaults.standard.set(appearance.rawValue, forKey: "appearance") }
    }
    var wifiOnly: Bool {
        didSet { UserDefaults.standard.set(wifiOnly, forKey: "wifiOnly") }
    }

    init() {
        let d = UserDefaults.standard
        contentLang = d.string(forKey: "contentLang").flatMap(ContentLanguage.init(rawValue:)) ?? ContentLanguage.preferred()
        fontScale = d.object(forKey: "fontScale") as? Double ?? 1.0
        appearance = d.string(forKey: "appearance").flatMap(Appearance.init(rawValue:)) ?? .system
        wifiOnly = d.object(forKey: "wifiOnly") as? Bool ?? true

        // 截圖與自動化測試用的啟動參數
        if let l = d.string(forKey: "TWLang"), let lang = ContentLanguage(rawValue: l) { contentLang = lang }
        if let t = d.string(forKey: "TWTab"), let tab = AppTab(rawValue: t) { self.tab = tab }
    }

    /// 首次啟動：確保目前內容語言可讀；不在內建三包的語言先解壓中文墊著
    @MainActor
    func bootstrap() async {
        if !(await packs.ensure(contentLang)) {
            _ = await packs.ensure(.zhTW)
        }
        ready = true
        if let k = UserDefaults.standard.string(forKey: "TWArticle") { open(ArticleRef(lang: readableLang, key: k)) }
        // 截圖用：-TWOpen timeline | era:<id> | category:<資料夾名>
        if let o = UserDefaults.standard.string(forKey: "TWOpen") {
            if o == "timeline" { push(.timeline) }
            else if o.hasPrefix("era:") { push(.timeline); push(.era(String(o.dropFirst(4)))) }
            else if o.hasPrefix("category:"), let c = ArticleCategory(rawValue: String(o.dropFirst(9))) { push(.category(c)) }
        }
        refreshWidget()
        await updater.checkIfDue(wifiOnly: wifiOnly)
    }

    /// 現在可以讀的語言：內容語言的包還沒裝好就退回中文
    var readableLang: ContentLanguage {
        packs.isInstalled(contentLang) ? contentLang : (packs.isInstalled(.zhTW) ? .zhTW : contentLang)
    }

    func setContentLang(_ lang: ContentLanguage) async {
        contentLang = lang
        _ = await packs.ensure(lang)
        refreshWidget()
    }

    // MARK: 導覽

    func push(_ r: Route) {
        paths[tab, default: []].append(r)
    }

    func open(_ ref: ArticleRef) {
        push(.article(ref))
    }

    /// taiwanmd:// 與 https://taiwan.md/ 兩種深連結
    func handle(url: URL) {
        if url.scheme == "taiwanmd" {
            let parts = url.path.split(separator: "/", maxSplits: 1).map(String.init)
            switch url.host {
            case "article" where parts.count == 2:
                let lang = ContentLanguage(rawValue: parts[0]) ?? readableLang
                let useLang = packs.isInstalled(lang) ? lang : readableLang
                tab = .today
                paths[.today] = [.article(ArticleRef(lang: useLang, key: parts[1]))]
            case "tab":
                if let t = AppTab(rawValue: parts.first ?? "") { tab = t }
            default: break
            }
            return
        }
        if let meta = article(forWebURL: url) {
            tab = .today
            paths[.today] = [.article(meta.ref)]
        } else {
            UIApplication.shared.open(url)
        }
    }

    /// 網站網址 → 已安裝內容包裡的同一篇。網址語言的包沒裝，就用目前語言的同一個 key。
    func article(forWebURL url: URL) -> ArticleMeta? {
        guard let host = url.host, host == "taiwan.md" || host == "www.taiwan.md" else { return nil }
        var path = url.path.removingPercentEncoding ?? url.path
        while path.count > 1 && path.hasSuffix("/") { path.removeLast() }
        let first = path.split(separator: "/").first.map(String.init) ?? ""
        let urlLang = ContentLanguage(rawValue: first) ?? .zhTW
        if packs.isInstalled(urlLang), let m = packs.meta(lang: urlLang, path: path) { return m }
        // 用中文包找到 key，再換成目前語言
        for lang in [urlLang, .zhTW, .en] where packs.isInstalled(lang) {
            if let m = packs.meta(lang: lang, path: path) {
                if let alt = packs.meta(ArticleRef(lang: readableLang, key: m.key)) { return alt }
                return m
            }
        }
        return nil
    }

    // MARK: 今日一篇

    /// 用日期當種子，在精選與長文裡挑一篇；同一天在 App 與 Widget 一致
    func dailyPick(_ date: Date = Date(), lang: ContentLanguage? = nil) -> ArticleMeta? {
        let all = packs.allMeta(lang ?? readableLang).filter { $0.category != .About }
        // 截圖用：-TWPickKey Food/台灣早餐文化 指定今天那一篇
        if let k = UserDefaults.standard.string(forKey: "TWPickKey"), Calendar.current.isDateInToday(date),
           let m = all.first(where: { $0.key == k }) { return m }
        var pool = all.filter { $0.featured && $0.chars > 3000 }
        if pool.count < 30 { pool = all.filter { $0.chars > 4000 } }
        guard !pool.isEmpty else { return all.first }
        pool.sort { $0.key < $1.key }
        let day = WidgetSnapshot.dayString(date)
        var h: UInt64 = 0xcbf29ce484222325
        for b in day.utf8 { h = (h ^ UInt64(b)) &* 0x100000001b3 }
        return pool[Int(h % UInt64(pool.count))]
    }

    func refreshWidget() {
        let lang = readableLang
        var picks: [WidgetSnapshot.Pick] = []
        for i in 0..<14 {
            let d = Calendar.current.date(byAdding: .day, value: i, to: Date()) ?? Date()
            guard let m = dailyPick(d, lang: lang) else { continue }
            picks.append(.init(day: WidgetSnapshot.dayString(d), lang: lang.code, key: m.key,
                               category: m.category.rawValue, categoryName: m.category.name,
                               title: m.title, summary: m.description))
        }
        guard !picks.isEmpty else { return }
        WidgetSnapshot(generatedAt: Date(), picks: picks).save()
        WidgetCenter.shared.reloadAllTimelines()
    }
}
