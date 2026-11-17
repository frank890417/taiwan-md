import Foundation
import Network
import Observation
import CryptoKit

/// 內容包更新：抓 Release 上的 index.json，sha256 跟已安裝的不同就下載、驗證、解壓、換上。
/// 任何一步失敗都保留舊包。請求不帶任何識別碼。
@Observable
final class PackUpdater {
    struct RemoteIndex: Decodable {
        struct Pack: Decodable { let file: String; let bytes: Int; let rawBytes: Int; let sha256: String; let articles: Int; let generatedAt: String }
        let schema: Int
        let minAppSchema: Int
        let generatedAt: String
        let packs: [String: Pack]
    }

    enum State: Equatable { case idle, downloading(Double), installing, failed(String) }

    static let supportedSchema = 1
    static let releaseBase = URL(string: "https://github.com/frank890417/taiwan-md/releases/download/app-packs/")!

    private(set) var remote: RemoteIndex?
    private(set) var lastChecked: Date?
    private(set) var checking = false
    private(set) var states: [String: State] = [:]
    private(set) var isExpensiveNetwork = false

    @ObservationIgnored private let store: PackStore
    @ObservationIgnored private let monitor = NWPathMonitor()
    @ObservationIgnored private let session: URLSession = {
        let c = URLSessionConfiguration.default
        c.requestCachePolicy = .reloadIgnoringLocalCacheData
        c.httpAdditionalHeaders = ["User-Agent": "TaiwanMD-iOS"]
        c.waitsForConnectivity = false
        return URLSession(configuration: c)
    }()

    init(store: PackStore) {
        self.store = store
        monitor.pathUpdateHandler = { [weak self] path in
            let expensive = path.isExpensive || path.isConstrained
            Task { @MainActor in self?.isExpensiveNetwork = expensive }
        }
        monitor.start(queue: DispatchQueue(label: "md.taiwan.netmon"))
        lastChecked = UserDefaults.standard.object(forKey: "packs.lastChecked") as? Date
    }

    func state(_ lang: ContentLanguage) -> State { states[lang.code] ?? .idle }

    /// 遠端比本機新的包
    func hasUpdate(_ lang: ContentLanguage) -> Bool {
        guard let r = remote?.packs[lang.code], let local = store.installed[lang.code] else { return false }
        return r.sha256 != local.sha256
    }

    func remoteSize(_ lang: ContentLanguage) -> Int? { remote?.packs[lang.code]?.bytes }

    @MainActor
    func checkIfDue(wifiOnly: Bool) async {
        if let last = lastChecked, Date().timeIntervalSince(last) < 6 * 3600 { return }
        await check()
        if !(wifiOnly && isExpensiveNetwork) { await updateInstalled() }
    }

    @MainActor
    func check() async {
        guard !checking else { return }
        checking = true
        defer { checking = false }
        do {
            let (data, resp) = try await session.data(from: Self.releaseBase.appendingPathComponent("index.json"))
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { return }
            let idx = try JSONDecoder().decode(RemoteIndex.self, from: data)
            guard idx.minAppSchema <= Self.supportedSchema else { return }
            remote = idx
            lastChecked = Date()
            UserDefaults.standard.set(lastChecked, forKey: "packs.lastChecked")
        } catch {
            // 沒網路就算了，下次啟動再試
        }
    }

    @MainActor
    func updateInstalled() async {
        for lang in ContentLanguage.allCases where store.isInstalled(lang) && hasUpdate(lang) {
            await download(lang)
        }
    }

    @MainActor
    func download(_ lang: ContentLanguage) async {
        if remote == nil { await check() }
        guard let pack = remote?.packs[lang.code] else {
            states[lang.code] = .failed(L.t("目前連不上更新伺服器", "Can't reach the update server", "更新サーバーに接続できません"))
            return
        }
        // 解壓後大約是壓縮檔的 8 倍，多留一倍餘裕
        if let free = Self.freeBytes(), free < Int64(pack.rawBytes) * 2 {
            states[lang.code] = .failed(L.t("裝置空間不足", "Not enough storage", "ストレージが不足しています"))
            return
        }
        states[lang.code] = .downloading(0)
        do {
            let url = Self.releaseBase.appendingPathComponent(pack.file)
            let (tmp, resp) = try await session.download(from: url, delegate: ProgressDelegate { [weak self] p in
                Task { @MainActor in self?.states[lang.code] = .downloading(p) }
            })
            guard (resp as? HTTPURLResponse)?.statusCode == 200 else { throw URLError(.badServerResponse) }
            states[lang.code] = .installing
            let expected = pack.sha256
            try await Task.detached(priority: .utility) {
                let data = try Data(contentsOf: tmp, options: .mappedIfSafe)
                let digest = SHA256.hash(data: data).map { String(format: "%02x", $0) }.joined()
                guard digest == expected else { throw URLError(.cannotDecodeContentData) }
                try PackStore.decompress(tmp, to: PackStore.dbURL(lang))
                try? FileManager.default.removeItem(at: tmp)
            }.value
            store.register(lang, .init(sha256: pack.sha256, articles: pack.articles, bytes: pack.bytes,
                                       generatedAt: pack.generatedAt, installedAt: Date(), source: "download"))
            states[lang.code] = .idle
        } catch {
            states[lang.code] = .failed(L.t("下載失敗，稍後再試", "Download failed — try again later", "ダウンロードに失敗しました"))
        }
    }

    static func freeBytes() -> Int64? {
        let url = FileManager.default.urls(for: .applicationSupportDirectory, in: .userDomainMask)[0]
        return (try? url.resourceValues(forKeys: [.volumeAvailableCapacityForImportantUsageKey]))?.volumeAvailableCapacityForImportantUsage
    }
}

private final class ProgressDelegate: NSObject, URLSessionTaskDelegate {
    let onProgress: (Double) -> Void
    private var observation: NSKeyValueObservation?
    init(_ onProgress: @escaping (Double) -> Void) { self.onProgress = onProgress }
    func urlSession(_ session: URLSession, didCreateTask task: URLSessionTask) {
        observation = task.progress.observe(\.fractionCompleted) { [onProgress] p, _ in onProgress(p.fractionCompleted) }
    }
}
