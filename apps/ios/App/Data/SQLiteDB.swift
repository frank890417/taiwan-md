import Foundation
import SQLite3

/// 系統 SQLite3 的薄包裝。內容包是唯讀資料庫，開成 FULLMUTEX，可以跨執行緒共用一條連線。
final class SQLiteDB: @unchecked Sendable {
    enum DBError: Error { case open(String), prepare(String) }

    private var handle: OpaquePointer?
    let url: URL

    init(readOnly url: URL) throws {
        self.url = url
        let flags = SQLITE_OPEN_READONLY | SQLITE_OPEN_FULLMUTEX
        if sqlite3_open_v2(url.path, &handle, flags, nil) != SQLITE_OK {
            let msg = handle.map { String(cString: sqlite3_errmsg($0)) } ?? "open failed"
            sqlite3_close(handle)
            throw DBError.open(msg)
        }
    }

    deinit { sqlite3_close(handle) }

    enum Value {
        case text(String), int(Int), null
    }

    struct Row {
        fileprivate let stmt: OpaquePointer
        func string(_ i: Int32) -> String? {
            guard let c = sqlite3_column_text(stmt, i) else { return nil }
            return String(cString: c)
        }
        func int(_ i: Int32) -> Int { Int(sqlite3_column_int64(stmt, i)) }
    }

    private static let transient = unsafeBitCast(-1, to: sqlite3_destructor_type.self)

    /// 跑一條查詢，每一列呼叫一次 `each`。
    func query(_ sql: String, _ params: [Value] = [], each: (Row) -> Void) throws {
        var stmt: OpaquePointer?
        guard sqlite3_prepare_v2(handle, sql, -1, &stmt, nil) == SQLITE_OK, let stmt else {
            throw DBError.prepare(String(cString: sqlite3_errmsg(handle)))
        }
        defer { sqlite3_finalize(stmt) }
        for (i, p) in params.enumerated() {
            let idx = Int32(i + 1)
            switch p {
            case .text(let s): sqlite3_bind_text(stmt, idx, s, -1, Self.transient)
            case .int(let n): sqlite3_bind_int64(stmt, idx, sqlite3_int64(n))
            case .null: sqlite3_bind_null(stmt, idx)
            }
        }
        while sqlite3_step(stmt) == SQLITE_ROW { each(Row(stmt: stmt)) }
    }

    func scalar(_ sql: String, _ params: [Value] = []) -> String? {
        var out: String?
        try? query(sql, params) { out = $0.string(0) }
        return out
    }
}
