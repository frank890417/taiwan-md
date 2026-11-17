import SwiftUI
import UIKit

struct ReaderView: View {
    @Environment(AppModel.self) private var model
    @Environment(\.colorScheme) private var scheme
    let ref: ArticleRef

    @State private var toc: [(id: String, title: String)] = []
    @State private var scrollTarget: String?
    @State private var showStyle = false
    @State private var copied = false

    var body: some View {
        if let meta = model.packs.meta(ref), let body = model.packs.html(ref) {
            let doc = ReaderDocument.build(meta: meta, body: body)
            ArticleWebView(
                html: doc,
                docID: meta.id,
                dark: (model.appearance.scheme ?? scheme) == .dark,
                fontScale: model.fontScale,
                initialProgress: model.library.progress(meta.ref),
                scrollTarget: $scrollTarget,
                onProgress: { model.library.setProgress(meta.ref, $0) },
                onLink: { handleLink($0) }
            )
            .ignoresSafeArea(edges: .bottom)
            .toolbar(.hidden, for: .tabBar)
            .navigationTitle(meta.title)
            .navigationBarTitleDisplayMode(.inline)
            .toolbar { toolbar(meta) }
            .onAppear {
                model.library.recordVisit(meta)
                toc = ReaderDocument.headings(body)
            }
            .sheet(isPresented: $showStyle) { ReaderStyleSheet().presentationDetents([.height(260)]) }
            .overlay(alignment: .bottom) {
                if copied {
                    Text(L.t("已複製引用", "Citation copied", "引用をコピーしました"))
                        .font(.footnote.weight(.semibold))
                        .padding(.horizontal, 14).padding(.vertical, 8)
                        .background(.thinMaterial, in: Capsule())
                        .padding(.bottom, 30)
                        .transition(.move(edge: .bottom).combined(with: .opacity))
                }
            }
        } else if !model.packs.isInstalled(ref.lang) {
            MissingPackView(lang: ref.lang)
        } else {
            ContentUnavailableView(L.t("找不到這篇", "Article not found", "記事が見つかりません"), systemImage: "doc.questionmark")
        }
    }

    @ToolbarContentBuilder
    private func toolbar(_ meta: ArticleMeta) -> some ToolbarContent {
        ToolbarItemGroup(placement: .topBarTrailing) {
            Button {
                model.library.toggleBookmark(meta)
            } label: {
                Image(systemName: model.library.isBookmarked(meta.key) ? "bookmark.fill" : "bookmark")
            }
            .accessibilityLabel(model.library.isBookmarked(meta.key) ? L.t("取消收藏", "Remove bookmark", "保存を解除") : L.t("收藏", "Bookmark", "保存"))

            Menu {
                if !toc.isEmpty {
                    Menu {
                        ForEach(toc, id: \.id) { h in
                            Button(h.title) { scrollTarget = h.id }
                        }
                    } label: { Label(L.t("目錄", "Contents", "目次"), systemImage: "list.bullet") }
                }
                languageMenu(meta)
                Button { showStyle = true } label: { Label(L.t("字級與外觀", "Text & appearance", "文字と外観"), systemImage: "textformat.size") }
                Divider()
                ShareLink(item: meta.webURL, subject: Text(meta.title), message: Text(meta.description)) {
                    Label(L.t("分享", "Share", "共有"), systemImage: "square.and.arrow.up")
                }
                Button { copyCitation(meta) } label: { Label(L.t("複製引用", "Copy citation", "引用をコピー"), systemImage: "quote.opening") }
                Button { UIApplication.shared.open(meta.webURL) } label: { Label(L.t("在網站開啟", "Open on website", "サイトで開く"), systemImage: "safari") }
                Button { UIApplication.shared.open(meta.sourceURL) } label: { Label(L.t("在 GitHub 看原始檔", "View source on GitHub", "GitHub で原文を見る"), systemImage: "chevron.left.forwardslash.chevron.right") }
            } label: {
                Image(systemName: "ellipsis.circle")
            }
        }
    }

    @ViewBuilder
    private func languageMenu(_ meta: ArticleMeta) -> some View {
        let langs = model.packs.languages(for: meta.key)
        if langs.count > 1 {
            Menu {
                ForEach(langs) { l in
                    Button {
                        replaceCurrent(with: ArticleRef(lang: l, key: meta.key))
                    } label: {
                        if l == meta.lang { Label(l.nativeName, systemImage: "checkmark") } else { Text(l.nativeName) }
                    }
                }
            } label: { Label(L.t("其他語言", "Other languages", "ほかの言語"), systemImage: "globe") }
        }
    }

    /// 切語言：換掉導覽堆疊最上面這一頁，不多疊一層
    private func replaceCurrent(with newRef: ArticleRef) {
        let tab = model.tab
        var path = model.paths[tab] ?? []
        if let last = path.indices.last, case .article(let r) = path[last], r == ref {
            path[last] = .article(newRef)
        } else {
            path.append(.article(newRef))
        }
        model.paths[tab] = path
    }

    private func copyCitation(_ m: ArticleMeta) {
        let day = Date().formatted(.iso8601.year().month().day())
        UIPasteboard.general.string = "〈\(m.title)〉，Taiwan.md 貢獻者，\(m.webURL.absoluteString)，CC BY-SA 4.0，取用於 \(day)。"
        withAnimation { copied = true }
        DispatchQueue.main.asyncAfter(deadline: .now() + 1.6) { withAnimation { copied = false } }
    }

    /// 文章裡的連結：站內文章原生開、其他交給 Safari
    private func handleLink(_ url: URL) {
        if let m = model.article(forWebURL: url) {
            model.open(m.ref)
        } else if url.scheme == "http" || url.scheme == "https" || url.scheme == "mailto" {
            UIApplication.shared.open(url)
        }
    }
}

struct ReaderStyleSheet: View {
    @Environment(AppModel.self) private var model
    var body: some View {
        @Bindable var model = model
        VStack(alignment: .leading, spacing: 18) {
            Text(L.t("字級與外觀", "Text & appearance", "文字と外観")).font(.headline)
            HStack {
                Image(systemName: "textformat.size.smaller")
                Slider(value: $model.fontScale, in: 0.8...1.6, step: 0.1)
                Image(systemName: "textformat.size.larger")
            }
            Picker(L.t("外觀", "Appearance", "外観"), selection: $model.appearance) {
                ForEach(Appearance.allCases) { Text($0.name).tag($0) }
            }
            .pickerStyle(.segmented)
        }
        .padding(24)
    }
}
