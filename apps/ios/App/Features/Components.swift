import SwiftUI

/// 列表裡的一篇：分類色點、標題、描述兩行、閱讀時間
struct ArticleRow: View {
    let meta: ArticleMeta
    var snippet: String? = nil
    var showCategory = true

    var body: some View {
        VStack(alignment: .leading, spacing: 5) {
            if showCategory {
                HStack(spacing: 6) {
                    Circle().fill(meta.category.tint).frame(width: 7, height: 7)
                    Text(meta.subcategory.map { "\(meta.category.name) · \($0)" } ?? meta.category.name)
                        .font(.caption).foregroundStyle(.secondary).lineLimit(1)
                }
            }
            Text(meta.title)
                .font(.headline)
                .foregroundStyle(.primary)
                .lineLimit(3)
            if let snippet {
                Text(snippet).font(.subheadline).foregroundStyle(.secondary).lineLimit(3)
            } else if !meta.description.isEmpty {
                Text(meta.description).font(.subheadline).foregroundStyle(.secondary).lineLimit(2)
            }
            Text(L.minutes(meta.readingTime))
                .font(.caption2).foregroundStyle(.tertiary)
        }
        .padding(.vertical, 4)
        .environment(\.layoutDirection, meta.lang.isRTL ? .rightToLeft : .leftToRight)
        .accessibilityElement(children: .combine)
    }
}

/// 有圖的大卡（今日一篇、精選）
struct ArticleCard: View {
    let meta: ArticleMeta
    var eyebrow: String? = nil
    var height: CGFloat = 220

    var body: some View {
        ZStack(alignment: .bottomLeading) {
            CoverImage(meta: meta)
                .frame(height: height)
                .clipped()
            LinearGradient(colors: [.clear, .black.opacity(0.72)], startPoint: .center, endPoint: .bottom)
            VStack(alignment: .leading, spacing: 6) {
                Text(eyebrow ?? meta.category.name)
                    .font(.caption.weight(.semibold))
                    .padding(.horizontal, 8).padding(.vertical, 3)
                    .background(meta.category.tint, in: Capsule())
                    .foregroundStyle(.white)
                Text(meta.title)
                    .font(.title3.weight(.bold))
                    .foregroundStyle(.white)
                    .lineLimit(3)
                if !meta.description.isEmpty {
                    Text(meta.description)
                        .font(.footnote)
                        .foregroundStyle(.white.opacity(0.88))
                        .lineLimit(2)
                }
            }
            .padding(16)
        }
        .frame(height: height)
        .clipShape(RoundedRectangle(cornerRadius: 18, style: .continuous))
        .environment(\.layoutDirection, meta.lang.isRTL ? .rightToLeft : .leftToRight)
        .accessibilityElement(children: .combine)
    }
}

/// 文章首圖；沒有圖或離線時用分類色＋圖示墊底
struct CoverImage: View {
    let meta: ArticleMeta

    var body: some View {
        ZStack {
            LinearGradient(colors: [meta.category.tint, meta.category.tint.opacity(0.65)],
                           startPoint: .topLeading, endPoint: .bottomTrailing)
            Image(systemName: meta.category.symbol)
                .font(.system(size: 64, weight: .light))
                .foregroundStyle(.white.opacity(0.25))
            if let url = meta.imageURL {
                AsyncImage(url: url, transaction: Transaction(animation: .easeOut(duration: 0.25))) { phase in
                    if case .success(let img) = phase {
                        img.resizable().scaledToFill()
                    }
                }
            }
        }
    }
}

struct SectionHeader: View {
    let title: String
    var trailing: String? = nil
    var body: some View {
        HStack(alignment: .firstTextBaseline) {
            Text(title).font(.title3.weight(.bold))
            Spacer()
            if let trailing { Text(trailing).font(.footnote).foregroundStyle(.secondary) }
        }
        .padding(.horizontal)
        .padding(.top, 8)
    }
}

/// 內容語言的包還沒下載時的提示
struct MissingPackView: View {
    @Environment(AppModel.self) private var model
    let lang: ContentLanguage

    var body: some View {
        ContentUnavailableView {
            Label(lang.nativeName, systemImage: "arrow.down.circle")
        } description: {
            Text(L.t("這個語言的內容包還沒下載。", "This language pack isn't downloaded yet.", "この言語のコンテンツはまだダウンロードされていません。"))
        } actions: {
            Button(L.t("下載", "Download", "ダウンロード")) {
                Task { await model.updater.download(lang) }
            }
            .buttonStyle(.borderedProminent)
        }
    }
}
