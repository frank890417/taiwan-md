import SwiftUI
import WebKit

/// 文章本文：WKWebView 顯示本機組好的 HTML。
/// 外觀、字級改變時用 JS 即時套用，不重新載入；捲動進度回報給 Library。
struct ArticleWebView: UIViewRepresentable {
    let html: String
    let docID: String
    let dark: Bool
    let fontScale: Double
    let initialProgress: Double
    @Binding var scrollTarget: String?
    let onProgress: (Double) -> Void
    let onLink: (URL) -> Void

    static let baseURL = URL(string: "https://taiwan.md/")!

    func makeCoordinator() -> Coordinator { Coordinator(self) }

    func makeUIView(context: Context) -> WKWebView {
        let config = WKWebViewConfiguration()
        let ucc = WKUserContentController()
        ucc.add(context.coordinator, name: "tw")
        config.userContentController = ucc
        config.dataDetectorTypes = []
        config.allowsInlineMediaPlayback = false
        let wv = WKWebView(frame: .zero, configuration: config)
        wv.navigationDelegate = context.coordinator
        wv.uiDelegate = context.coordinator
        wv.isOpaque = false
        wv.backgroundColor = .clear
        wv.scrollView.contentInsetAdjustmentBehavior = .automatic
        wv.allowsLinkPreview = false
        #if DEBUG
        if #available(iOS 16.4, *) { wv.isInspectable = true }
        #endif
        load(wv, context.coordinator)
        return wv
    }

    func updateUIView(_ wv: WKWebView, context: Context) {
        let c = context.coordinator
        c.parent = self
        if c.loadedID != docID {
            load(wv, c)
            return
        }
        if c.appliedDark != dark || c.appliedScale != fontScale {
            c.appliedDark = dark
            c.appliedScale = fontScale
            wv.evaluateJavaScript("window.tw && tw.setStyle(\(dark), \(fontScale))")
        }
        if let target = scrollTarget {
            let safe = target.replacingOccurrences(of: "\\", with: "\\\\").replacingOccurrences(of: "'", with: "\\'")
            wv.evaluateJavaScript("window.tw && tw.scrollToId('\(safe)')")
            DispatchQueue.main.async { scrollTarget = nil }
        }
    }

    private func load(_ wv: WKWebView, _ c: Coordinator) {
        c.loadedID = docID
        c.appliedDark = dark
        c.appliedScale = fontScale
        c.pendingRestore = initialProgress
        let doc = html.replacingOccurrences(of: "data-theme=\"light\"", with: "data-theme=\"\(dark ? "dark" : "light")\" style=\"--app-scale:\(fontScale)\"")
        wv.loadHTMLString(doc, baseURL: Self.baseURL)
    }

    final class Coordinator: NSObject, WKNavigationDelegate, WKUIDelegate, WKScriptMessageHandler {
        var parent: ArticleWebView
        var loadedID: String?
        var appliedDark = false
        var appliedScale = 1.0
        var pendingRestore: Double = 0

        init(_ p: ArticleWebView) { parent = p }

        func webView(_ wv: WKWebView, didFinish navigation: WKNavigation!) {
            if pendingRestore > 0.02 {
                wv.evaluateJavaScript("window.tw && tw.restore(\(pendingRestore))")
            }
            pendingRestore = 0
        }

        func webView(_ wv: WKWebView, decidePolicyFor action: WKNavigationAction, decisionHandler: @escaping (WKNavigationActionPolicy) -> Void) {
            guard let url = action.request.url else { return decisionHandler(.cancel) }
            if action.navigationType == .other || url.scheme == "about" {
                return decisionHandler(.allow)  // 初次載入
            }
            // 同一頁的錨點（#fn-1、#標題）
            if url.fragment != nil, url.absoluteString.hasPrefix(ArticleWebView.baseURL.absoluteString + "#") {
                return decisionHandler(.allow)
            }
            decisionHandler(.cancel)
            parent.onLink(url)
        }

        // target=_blank 的連結
        func webView(_ wv: WKWebView, createWebViewWith config: WKWebViewConfiguration, for action: WKNavigationAction, windowFeatures: WKWindowFeatures) -> WKWebView? {
            if let url = action.request.url { parent.onLink(url) }
            return nil
        }

        func userContentController(_ ucc: WKUserContentController, didReceive message: WKScriptMessage) {
            guard let body = message.body as? [String: Any], let type = body["type"] as? String else { return }
            switch type {
            case "progress":
                if let v = body["value"] as? Double { parent.onProgress(v) }
            case "open":
                if let s = body["href"] as? String, let url = URL(string: s, relativeTo: ArticleWebView.baseURL) {
                    UIApplication.shared.open(url.absoluteURL)
                }
            default: break
            }
        }
    }
}
