import Foundation

/// 離線搜尋：查詢字串照 TextNormalizer 正規化，以空白切詞，每個詞都要命中（AND），
/// 在內容包的 search 表（已正規化的標題、描述＋標籤、全文）上用 instr 比對。
/// 為什麼不用 FTS5：見 reports/ios-app-implementation-plan-2026-11-02.md §五.4。
struct SearchEngine {
    struct Hit: Identifiable, Hashable {
        let meta: ArticleMeta
        let score: Int
        let snippet: String?
        var id: String { meta.id }
    }

    enum Scope { case titles, fullText }

    let store: PackStore

    static func terms(_ query: String) -> [String] {
        TextNormalizer.normalize(query).split(separator: " ").map(String.init).filter { !$0.isEmpty }.prefix(6).map { $0 }
    }

    func search(_ query: String, lang: ContentLanguage, scope: Scope, limit: Int = 120) -> [Hit] {
        let terms = Self.terms(query)
        guard !terms.isEmpty, let db = store.db(lang) else { return [] }

        // 每個詞：標題 100、描述與標籤 30、全文 10；全文另加出現次數（上限 20 次）
        var scoreParts: [String] = []
        var conds: [String] = []
        var params: [SQLiteDB.Value] = []
        for (i, _) in terms.enumerated() {
            let p = "?\(i + 1)"
            let body = scope == .fullText
            scoreParts.append("(instr(title, \(p)) > 0) * 100 + (instr(meta, \(p)) > 0) * 30"
                + (body ? " + (instr(body, \(p)) > 0) * 10 + min(20, (length(body) - length(replace(body, \(p), ''))) / length(\(p)))" : ""))
            conds.append(body ? "(instr(title, \(p)) > 0 OR instr(meta, \(p)) > 0 OR instr(body, \(p)) > 0)"
                              : "(instr(title, \(p)) > 0 OR instr(meta, \(p)) > 0)")
        }
        params = terms.map { .text($0) }
        let titleBonus = terms.count == 1 ? " + (title = ?1) * 200 + (substr(title, 1, length(?1)) = ?1) * 50" : ""
        let sql = """
            SELECT key, (\(scoreParts.joined(separator: " + ")))\(titleBonus) AS score
            FROM search WHERE \(conds.joined(separator: " AND "))
            ORDER BY score DESC LIMIT \(limit)
            """
        var ranked: [(String, Int)] = []
        try? db.query(sql, params) { ranked.append(($0.string(0) ?? "", $0.int(1))) }

        let byKey = Dictionary(store.allMeta(lang).map { ($0.key, $0) }, uniquingKeysWith: { a, _ in a })
        return ranked.compactMap { key, score in
            guard let m = byKey[key] else { return nil }
            let snippet = scope == .fullText ? Self.snippet(db: db, key: key, terms: terms) : nil
            return Hit(meta: m, score: score, snippet: snippet)
        }
    }

    /// 從正文純文字裡找第一個命中的詞，取前後各 40 字
    static func snippet(db: SQLiteDB, key: String, terms: [String]) -> String? {
        guard let body = db.scalar("SELECT body FROM search WHERE key = ?", [.text(key)]) else { return nil }
        for t in terms {
            guard let r = body.range(of: t) else { continue }
            let start = body.index(r.lowerBound, offsetBy: -40, limitedBy: body.startIndex) ?? body.startIndex
            let end = body.index(r.upperBound, offsetBy: 60, limitedBy: body.endIndex) ?? body.endIndex
            var s = String(body[start..<end]).replacingOccurrences(of: "\n", with: " ")
            if start > body.startIndex { s = "…" + s }
            if end < body.endIndex { s += "…" }
            return s
        }
        return nil
    }
}
