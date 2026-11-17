import Foundation
import Observation

/// 已安裝的內容包：Application Support/Packs/pack-{lang}.sqlite，外加 installed.json 記每包的 sha256。
/// 內建的三包（zh-TW／en／ja）在 App 本體裡是 LZMA 壓縮檔，第一次用到時才解壓。
@Observable
final class PackStore {
    struct Installed: Codable {
        var sha256: String
        var articles: Int
        var bytes: Int
        var generatedAt: String
        var installedAt: Date
        var source: String   // bundle / download
    }

    private(set) var installed: [String: Installed] = [:]
    private(set) var preparing: Set<ContentLanguage> = []
    private(set) var lastError: String?

    @ObservationIgnored private var dbs: [ContentLanguage: SQLiteDB] = [:]
    @ObservationIgnored private var metaCache: [ContentLanguage: [ArticleMeta]] = [:]
    @ObservationIgnored private let lock = NSLock()

    static let dir: URL = {
        let base = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        let d = base.appendingPathComponent("Packs", isDirectory: true)
        try? FileManager.default.createDirectory(at: d, withIntermediateDirectories: true)
        var v = d
        var rv = URLResourceValues()
        rv.isExcludedFromBackup = true  // 內容可以重新下載，不佔 iCloud 備份
        try? v.setResourceValues(rv)
        return d
    }()

    private var manifestURL: URL { Self.dir.appendingPathComponent("installed.json") }
    static func dbURL(_ lang: ContentLanguage) -> URL { dir.appendingPathComponent("pack-\(lang.code).sqlite") }

    init() {
        if let data = try? Data(contentsOf: manifestURL),
           let m = try? JSONDecoder.iso.decode([String: Installed].self, from: data) {
            installed = m.filter { FileManager.default.fileExists(atPath: Self.dbURL(ContentLanguage(rawValue: $0.key) ?? .zhTW).path) }
        }
    }

    func isInstalled(_ lang: ContentLanguage) -> Bool { installed[lang.code] != nil }

    /// 內容包是否可用：已安裝，或是 App 內建可以馬上解壓
    func isAvailable(_ lang: ContentLanguage) -> Bool { isInstalled(lang) || lang.isBundled }

    // MARK: 安裝

    /// 確保某語言可讀：已安裝直接回；內建的就地解壓；都不是回 false。
    @discardableResult
    func ensure(_ lang: ContentLanguage) async -> Bool {
        if isInstalled(lang) { return true }
        guard lang.isBundled else { return false }
        return await installFromBundle(lang)
    }

    struct BundledIndex: Decodable {
        struct Pack: Decodable { let file: String; let sha256: String; let articles: Int; let bytes: Int; let generatedAt: String }
        let packs: [String: Pack]
    }

    static var bundledIndex: BundledIndex? {
        guard let url = Bundle.main.url(forResource: "packs-index", withExtension: "json"),
              let data = try? Data(contentsOf: url) else { return nil }
        return try? JSONDecoder().decode(BundledIndex.self, from: data)
    }

    private func installFromBundle(_ lang: ContentLanguage) async -> Bool {
        guard let src = Bundle.main.url(forResource: "pack-\(lang.code).sqlite", withExtension: "lzma") else {
            lastError = "bundle pack missing: \(lang.code)"
            return false
        }
        let info = Self.bundledIndex?.packs[lang.code]
        await MainActor.run { _ = preparing.insert(lang) }
        defer { Task { @MainActor in self.preparing.remove(lang) } }
        do {
            try await Task.detached(priority: .userInitiated) {
                try PackStore.decompress(src, to: PackStore.dbURL(lang))
            }.value
            await MainActor.run {
                self.register(lang, Installed(sha256: info?.sha256 ?? "bundle", articles: info?.articles ?? 0,
                                              bytes: info?.bytes ?? 0, generatedAt: info?.generatedAt ?? "",
                                              installedAt: Date(), source: "bundle"))
            }
            return true
        } catch {
            await MainActor.run { self.lastError = "\(error)" }
            return false
        }
    }

    /// LZMA（xz）壓縮檔解到暫存檔，驗過 SQLite 檔頭再換上去。
    static func decompress(_ src: URL, to dest: URL) throws {
        let data = try Data(contentsOf: src, options: .mappedIfSafe)
        let raw = try (data as NSData).decompressed(using: .lzma) as Data
        guard raw.starts(with: Array("SQLite format 3".utf8)) else {
            throw NSError(domain: "PackStore", code: 1, userInfo: [NSLocalizedDescriptionKey: "not a sqlite file"])
        }
        let tmp = dest.appendingPathExtension("tmp")
        try? FileManager.default.removeItem(at: tmp)
        try raw.write(to: tmp, options: .atomic)
        _ = try FileManager.default.replaceItemAt(dest, withItemAt: tmp)
    }

    /// 下載完成的新包換上（PackUpdater 呼叫，在主執行緒）
    func register(_ lang: ContentLanguage, _ info: Installed) {
        lock.lock()
        dbs[lang] = nil
        metaCache[lang] = nil
        lock.unlock()
        installed[lang.code] = info
        saveManifest()
    }

    func remove(_ lang: ContentLanguage) {
        lock.lock()
        dbs[lang] = nil
        metaCache[lang] = nil
        lock.unlock()
        try? FileManager.default.removeItem(at: Self.dbURL(lang))
        installed[lang.code] = nil
        saveManifest()
    }

    private func saveManifest() {
        if let data = try? JSONEncoder.iso.encode(installed) { try? data.write(to: manifestURL, options: .atomic) }
    }

    func diskBytes(_ lang: ContentLanguage) -> Int {
        (try? FileManager.default.attributesOfItem(atPath: Self.dbURL(lang).path)[.size] as? Int) ?? 0
    }

    // MARK: 查詢

    func db(_ lang: ContentLanguage) -> SQLiteDB? {
        lock.lock(); defer { lock.unlock() }
        if let db = dbs[lang] { return db }
        guard installed[lang.code] != nil, let db = try? SQLiteDB(readOnly: Self.dbURL(lang)) else { return nil }
        dbs[lang] = db
        return db
    }

    static let metaColumns = "key, path, category, subcategory, title, description, tags, date, created, updated, readingTime, featured, image, imageAlt, imageCredit, imageLicense, heroInBody, chars"

    static func meta(_ r: SQLiteDB.Row, lang: ContentLanguage) -> ArticleMeta {
        let tagsJSON = r.string(6) ?? "[]"
        let tags = (try? JSONDecoder().decode([String].self, from: Data(tagsJSON.utf8))) ?? []
        return ArticleMeta(
            lang: lang, key: r.string(0) ?? "", path: r.string(1) ?? "",
            category: ArticleCategory(rawValue: r.string(2) ?? "") ?? .About,
            subcategory: r.string(3), title: r.string(4) ?? "", description: r.string(5) ?? "", tags: tags,
            date: r.string(7), created: r.string(8), updated: r.string(9), readingTime: r.int(10),
            featured: r.int(11) == 1, image: r.string(12), imageAlt: r.string(13), imageCredit: r.string(14),
            imageLicense: r.string(15), heroInBody: r.int(16) == 1, chars: r.int(17))
    }

    /// 某語言全部文章的中繼資料（一千多筆，記在記憶體裡）
    func allMeta(_ lang: ContentLanguage) -> [ArticleMeta] {
        lock.lock()
        if let cached = metaCache[lang] { lock.unlock(); return cached }
        lock.unlock()
        guard let db = db(lang) else { return [] }
        var out: [ArticleMeta] = []
        out.reserveCapacity(1200)
        try? db.query("SELECT \(Self.metaColumns) FROM articles") { out.append(Self.meta($0, lang: lang)) }
        lock.lock(); metaCache[lang] = out; lock.unlock()
        return out
    }

    func meta(_ ref: ArticleRef) -> ArticleMeta? {
        allMeta(ref.lang).first { $0.key == ref.key }
    }

    func meta(lang: ContentLanguage, path: String) -> ArticleMeta? {
        let p = path.precomposedStringWithCanonicalMapping
        return allMeta(lang).first { $0.path == p }
    }

    func html(_ ref: ArticleRef) -> String? {
        db(ref.lang)?.scalar("SELECT html FROM bodies WHERE key = ?", [.text(ref.key)])
    }

    /// 同一篇在其他已安裝語言裡有沒有
    func languages(for key: String) -> [ContentLanguage] {
        ContentLanguage.allCases.filter { isInstalled($0) && allMeta($0).contains { $0.key == key } }
    }
}

extension JSONDecoder {
    static let iso: JSONDecoder = { let d = JSONDecoder(); d.dateDecodingStrategy = .iso8601; return d }()
}

extension JSONEncoder {
    static let iso: JSONEncoder = { let e = JSONEncoder(); e.dateEncodingStrategy = .iso8601; e.outputFormatting = [.sortedKeys]; return e }()
}
