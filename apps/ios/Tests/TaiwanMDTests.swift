import Testing
import Foundation
@testable import TaiwanMD

/// 正規化規則要跟 scripts/app/pack.py 逐字一致：兩邊都跑 normalize-cases.json。
struct TextNormalizerTests {
    struct Case: Decodable { let `in`: String; let out: String }

    @Test func matchesPythonCases() throws {
        let url = try #require(Bundle(for: Marker.self).url(forResource: "normalize-cases", withExtension: "json"))
        let cases = try JSONDecoder().decode([Case].self, from: Data(contentsOf: url))
        #expect(cases.count >= 16)
        for c in cases {
            #expect(TextNormalizer.normalize(c.in) == c.out, "\(c.in)")
        }
    }
}

final class Marker {}

struct TimelineDataTests {
    /// 2026-11-02 第一版把 year／yearsLabel 當純字串，遇到多語字典整份解不開、時間軸空白
    @Test func erasDecode() {
        #expect(Era.all.count == 8)
        #expect(Era.all.allSatisfy { !$0.events.isEmpty })
        #expect(Era.all.first?.title.pick(.zhTW).isEmpty == false)
    }
}

/// 搜尋測試集：用 App 內建的內容包，查詢與期望的第一名寫死在這裡。
@Suite(.serialized)
struct SearchEngineTests {
    static let store = PackStore()

    func hits(_ q: String, _ lang: ContentLanguage, _ scope: SearchEngine.Scope = .fullText) async -> [SearchEngine.Hit] {
        _ = await Self.store.ensure(lang)
        return SearchEngine(store: Self.store).search(q, lang: lang, scope: scope)
    }

    @Test(arguments: [
        ("二二八事件", "History/二二八事件"),
        ("珍珠奶茶", "Food/珍珠奶茶"),
        ("台灣茶文化", "Food/茶文化"),
    ])
    func zhTitleRanksFirst(q: String, key: String) async {
        let r = await hits(q, .zhTW)
        #expect(r.first?.meta.key == key, "\(q) → \(r.prefix(3).map(\.meta.key))")
    }

    @Test(arguments: ["茶", "廟", "林江邁", "台積電", "二二八 李登輝", "ＴＳＭＣ"])
    func zhQueriesFindSomething(q: String) async {
        let r = await hits(q, .zhTW)
        #expect(!r.isEmpty, "\(q)")
    }

    @Test func singleCharacterSearchWorks() async {
        let r = await hits("茶", .zhTW)
        #expect(r.count > 20)
        #expect(r.first?.snippet != nil)
    }

    @Test func titleScopeIsFastSubset() async {
        let t = await hits("台灣", .zhTW, .titles)
        let f = await hits("台灣", .zhTW, .fullText)
        #expect(!t.isEmpty && f.count >= t.count)
    }

    @Test(arguments: ["二二八", "台湾", "タピオカ", "夜市"])
    func jaQueries(q: String) async {
        let r = await hits(q, .ja)
        #expect(!r.isEmpty, "\(q)")
    }

    @Test(arguments: ["february 28", "night market", "TAIPEI", "bubble tea"])
    func enQueries(q: String) async {
        let r = await hits(q, .en)
        #expect(!r.isEmpty, "\(q)")
    }

    @Test func noResultsForNonsense() async {
        let r = await hits("zzqqxxw不存在的詞", .zhTW)
        #expect(r.isEmpty)
    }

    @Test func crossLanguageKeysLineUp() async {
        _ = await Self.store.ensure(.zhTW)
        _ = await Self.store.ensure(.en)
        let zh = Self.store.meta(ArticleRef(lang: .zhTW, key: "History/二二八事件"))
        let en = Self.store.meta(ArticleRef(lang: .en, key: "History/二二八事件"))
        #expect(zh?.path == "/history/二二八事件")
        #expect(en?.path == "/en/history/228-incident")
    }
}
