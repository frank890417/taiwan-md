import Foundation

/// 搜尋用正規化。規則必須跟 scripts/app/pack.py 的 normalize() 逐字一致：
/// NFKC → 小寫 → 去阿拉伯文母音符號與延長符 → 空白壓成一個。
/// 兩邊共用 Tests/normalize-cases.json 當對照樣本。
enum TextNormalizer {
    static func normalize(_ s: String) -> String {
        let nfkc = s.precomposedStringWithCompatibilityMapping.lowercased()
        var out = String.UnicodeScalarView()
        var lastWasSpace = true  // 去掉開頭空白
        for u in nfkc.unicodeScalars {
            let v = u.value
            if (0x064B...0x065F).contains(v) || v == 0x0670 || v == 0x0640 { continue }
            if u.properties.isWhitespace {
                if !lastWasSpace { out.append(" ") }
                lastWasSpace = true
                continue
            }
            out.append(u)
            lastWasSpace = false
        }
        var result = String(out)
        if result.hasSuffix(" ") { result.removeLast() }
        return result
    }
}
