import SwiftUI

struct AboutView: View {
    var body: some View {
        ScrollView {
            VStack(alignment: .leading, spacing: 16) {
                Image("Mark").resizable().scaledToFit().frame(width: 64, height: 64)
                Text("Taiwan.md").font(.largeTitle.weight(.bold))
                Text(L.t(
                    "Taiwan.md 是一個開源的台灣知識庫：一千多篇有出處的策展長文，從歷史、地理、文化到人物，用台灣人自己的話寫，再翻譯成 13 種語言。每篇文章都能在 GitHub 上看到原始檔與修改紀錄，任何人都可以提出勘誤。",
                    "Taiwan.md is an open-source knowledge base about Taiwan: more than a thousand curated, sourced long-form articles on history, geography, culture and people, written in Taiwanese people's own words and translated into 13 languages. Every article's source and edit history is public on GitHub, and anyone can submit a correction.",
                    "Taiwan.md は台湾についてのオープンソースの知識ベースです。歴史、地理、文化、人物などを扱う出典付きの長文記事が千本以上あり、台湾の人びと自身の言葉で書かれ、13 言語に翻訳されています。すべての記事の原文と編集履歴は GitHub で公開され、だれでも訂正を提案できます。"))
                Text(L.t(
                    "這個 App 把全部內容裝進手機：沒有網路也能讀、也能搜。內容每天跟網站同步。",
                    "This app keeps all of it on your phone: readable and searchable without a connection, and synced with the website daily.",
                    "このアプリはすべてのコンテンツを端末に保存します。ネットがなくても読めて検索でき、毎日サイトと同期します。"))
                VStack(alignment: .leading, spacing: 10) {
                    Link(destination: URL(string: "https://taiwan.md/")!) { Label("taiwan.md", systemImage: "globe") }
                    Link(destination: URL(string: "https://github.com/frank890417/taiwan-md")!) { Label("GitHub", systemImage: "chevron.left.forwardslash.chevron.right") }
                    Link(destination: URL(string: "https://taiwan.md/contribute/")!) {
                        Label(L.t("一起寫", "Contribute", "参加する"), systemImage: "pencil.and.outline")
                    }
                }
                .font(.body.weight(.medium))
            }
            .padding()
        }
        .navigationTitle(L.t("關於", "About", "について"))
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct LicensesView: View {
    var body: some View {
        List {
            Section(L.t("內容", "Content", "コンテンツ")) {
                Text(L.t(
                    "除另有標示外，文章內容以創用 CC 姓名標示－相同方式分享 4.0 國際（CC BY-SA 4.0）授權，作者為 Taiwan.md 貢獻者。App 只改變排版，沒有改動內容。每篇文章頁尾附有原文網址。",
                    "Unless otherwise noted, article content is available under the Creative Commons Attribution-ShareAlike 4.0 International license (CC BY-SA 4.0), by Taiwan.md contributors. The app changes only the layout, not the content. Each article links to its original page.",
                    "特記がない限り、記事は Taiwan.md 貢献者によるクリエイティブ・コモンズ 表示-継承 4.0 国際（CC BY-SA 4.0）で提供されています。アプリはレイアウトのみを変更し、内容は変更していません。各記事の末尾に原文の URL があります。"))
                Link("CC BY-SA 4.0", destination: URL(string: "https://creativecommons.org/licenses/by-sa/4.0/")!)
            }
            Section(L.t("圖片", "Images", "画像")) {
                Text(L.t(
                    "文章圖片多數來自 Wikimedia Commons 等來源，授權各異，以各圖說標示為準。",
                    "Most images come from Wikimedia Commons and other sources under their own licenses, as credited in each caption.",
                    "画像の多くは Wikimedia Commons などに由来し、ライセンスは各キャプションの表記に従います。"))
            }
            Section(L.t("程式碼", "Source code", "ソースコード")) {
                Text(L.t("App 與網站的程式碼以 MIT 授權公開。", "The app and website source code is available under the MIT License.", "アプリとサイトのソースコードは MIT ライセンスで公開されています。"))
                Link("github.com/frank890417/taiwan-md", destination: URL(string: "https://github.com/frank890417/taiwan-md")!)
                Text(L.t("本 App 沒有使用第三方套件。", "This app uses no third-party libraries.", "このアプリはサードパーティのライブラリを使用していません。"))
                    .foregroundStyle(.secondary)
            }
        }
        .navigationTitle(L.t("授權與出處", "Licenses & credits", "ライセンス"))
        .navigationBarTitleDisplayMode(.inline)
    }
}

struct PrivacyView: View {
    var body: some View {
        List {
            Section {
                Text(L.t(
                    "這個 App 不收集任何資料：沒有帳號、沒有分析或廣告工具、沒有追蹤。收藏、閱讀進度與設定只存在你的裝置上。",
                    "This app collects no data: no accounts, no analytics or ad SDKs, no tracking. Bookmarks, reading progress and settings stay on your device.",
                    "このアプリはデータを一切収集しません。アカウント、解析・広告ツール、トラッキングはありません。ブックマーク、読書の進み具合、設定は端末内にのみ保存されます。"))
                Text(L.t(
                    "App 只會連到兩個地方：GitHub（下載內容包更新）與 taiwan.md（顯示文章圖片）。這些請求不帶任何識別碼。外部連結一律用 Safari 開啟。",
                    "The app connects to only two places: GitHub (to download content updates) and taiwan.md (to show article images). These requests carry no identifiers. External links open in Safari.",
                    "アプリが接続するのは GitHub（コンテンツ更新のダウンロード）と taiwan.md（記事の画像表示）の 2 か所だけで、識別子は送信しません。外部リンクは Safari で開きます。"))
            }
            Section {
                Link(L.t("完整隱私權政策", "Full privacy policy", "プライバシーポリシー全文"), destination: URL(string: "https://taiwan.md/privacy/")!)
            }
        }
        .navigationTitle(L.t("隱私", "Privacy", "プライバシー"))
        .navigationBarTitleDisplayMode(.inline)
    }
}
