import SwiftUI

struct SettingsView: View {
    @Environment(AppModel.self) private var model

    var body: some View {
        @Bindable var model = model
        Form {
            Section {
                Picker(L.t("內容語言", "Content language", "コンテンツの言語"), selection: Binding(
                    get: { model.contentLang },
                    set: { l in Task { await model.setContentLang(l) } })) {
                    ForEach(ContentLanguage.allCases) { l in
                        Text(l.nativeName + (model.packs.isAvailable(l) ? "" : " ↓")).tag(l)
                    }
                }
                NavigationLink {
                    PacksView()
                } label: {
                    LabeledContent(L.t("離線內容包", "Offline packs", "オフラインパック"),
                                   value: "\(ContentLanguage.allCases.filter { model.packs.isInstalled($0) }.count) / 13")
                }
            } footer: {
                Text(L.t("介面語言跟著 iOS 設定；內容語言決定文章用哪一種語言顯示。有 ↓ 的語言要先下載。",
                         "The interface follows your iOS language; content language decides which translation you read. Languages marked ↓ need downloading.",
                         "画面の言語は iOS の設定に従います。コンテンツの言語で記事の言語を選べます。↓ はダウンロードが必要です。"))
            }

            Section(L.t("閱讀", "Reading", "読書")) {
                Picker(L.t("外觀", "Appearance", "外観"), selection: $model.appearance) {
                    ForEach(Appearance.allCases) { Text($0.name).tag($0) }
                }
                VStack(alignment: .leading) {
                    LabeledContent(L.t("文章字級", "Article text size", "記事の文字サイズ"), value: "\(Int(model.fontScale * 100))%")
                    Slider(value: $model.fontScale, in: 0.8...1.6, step: 0.1) {
                        Text(L.t("文章字級", "Article text size", "記事の文字サイズ"))
                    } minimumValueLabel: { Image(systemName: "textformat.size.smaller") }
                      maximumValueLabel: { Image(systemName: "textformat.size.larger") }
                }
            }

            Section(L.t("關於", "About", "情報")) {
                NavigationLink(L.t("關於 Taiwan.md", "About Taiwan.md", "Taiwan.md について")) { AboutView() }
                NavigationLink(L.t("授權與出處", "Licenses & credits", "ライセンス")) { LicensesView() }
                NavigationLink(L.t("隱私", "Privacy", "プライバシー")) { PrivacyView() }
                Link(destination: URL(string: "https://github.com/frank890417/taiwan-md/issues")!) {
                    Label(L.t("回報問題或勘誤", "Report an issue or correction", "問題・誤りを報告"), systemImage: "exclamationmark.bubble")
                }
                Link(destination: URL(string: "mailto:taiwanmd@monoame.com?subject=Taiwan.md%20iOS")!) {
                    Label(L.t("寫信給我們", "Email us", "メールで連絡"), systemImage: "envelope")
                }
            }

            Section {
                LabeledContent(L.t("版本", "Version", "バージョン"), value: Self.version)
            }
        }
        .navigationTitle(L.t("設定", "Settings", "設定"))
    }

    static var version: String {
        let v = Bundle.main.object(forInfoDictionaryKey: "CFBundleShortVersionString") as? String ?? "?"
        let b = Bundle.main.object(forInfoDictionaryKey: "CFBundleVersion") as? String ?? "?"
        return "\(v) (\(b))"
    }
}

struct PacksView: View {
    @Environment(AppModel.self) private var model

    var body: some View {
        @Bindable var model = model
        let updater = model.updater
        List {
            Section {
                Toggle(L.t("只用 Wi-Fi 更新", "Update on Wi-Fi only", "Wi-Fi のときだけ更新"), isOn: $model.wifiOnly)
                Button {
                    Task { await updater.check(); await updater.updateInstalled() }
                } label: {
                    HStack {
                        Text(L.t("檢查更新", "Check for updates", "更新を確認"))
                        Spacer()
                        if updater.checking { ProgressView() }
                        else if let d = updater.lastChecked {
                            Text(d.formatted(.relative(presentation: .named).locale(L.locale))).foregroundStyle(.secondary).font(.footnote)
                        }
                    }
                }
            } footer: {
                Text(L.t("內容每天跟網站同步。每個語言約 9–12 MB，下載後完全離線可用。",
                         "Content syncs with the website daily. Each language is about 9–12 MB and works fully offline once downloaded.",
                         "コンテンツは毎日サイトと同期します。各言語 9〜12 MB ほどで、ダウンロード後は完全にオフラインで使えます。"))
            }
            Section(L.t("語言", "Languages", "言語")) {
                ForEach(ContentLanguage.allCases) { lang in
                    PackRow(lang: lang)
                }
            }
        }
        .navigationTitle(L.t("離線內容包", "Offline packs", "オフラインパック"))
        .task { if updater.remote == nil { await updater.check() } }
    }
}

struct PackRow: View {
    @Environment(AppModel.self) private var model
    let lang: ContentLanguage

    var body: some View {
        let store = model.packs
        let updater = model.updater
        let inst = store.installed[lang.code]
        HStack {
            VStack(alignment: .leading, spacing: 3) {
                Text(lang.nativeName).font(.body)
                Group {
                    if let inst {
                        Text("\(L.articles(inst.articles)) · \(ByteCountFormatter.string(fromByteCount: Int64(store.diskBytes(lang)), countStyle: .file))")
                    } else if lang.isBundled {
                        Text(L.t("App 內建，第一次用到時解開", "Built in — unpacked on first use", "内蔵（初回使用時に展開）"))
                    } else if let size = updater.remoteSize(lang) {
                        Text(ByteCountFormatter.string(fromByteCount: Int64(size), countStyle: .file))
                    } else {
                        Text(L.t("未下載", "Not downloaded", "未ダウンロード"))
                    }
                }
                .font(.caption).foregroundStyle(.secondary)
                if case .failed(let msg) = updater.state(lang) {
                    Text(msg).font(.caption).foregroundStyle(.red)
                }
            }
            Spacer()
            switch updater.state(lang) {
            case .downloading(let p):
                ProgressView(value: p).frame(width: 60)
            case .installing:
                ProgressView()
            default:
                if store.preparing.contains(lang) {
                    ProgressView()
                } else if inst != nil {
                    if updater.hasUpdate(lang) {
                        Button(L.t("更新", "Update", "更新")) { Task { await updater.download(lang) } }.buttonStyle(.bordered)
                    } else if lang == model.contentLang {
                        Image(systemName: "checkmark.circle.fill").foregroundStyle(Color.brand)
                    }
                } else if lang.isBundled {
                    Button(L.t("解開", "Unpack", "展開")) { Task { await store.ensure(lang) } }.buttonStyle(.bordered)
                } else {
                    Button(L.t("下載", "Get", "入手")) { Task { await updater.download(lang) } }.buttonStyle(.bordered)
                }
            }
        }
        .swipeActions {
            if inst != nil && lang != model.readableLang {
                Button(role: .destructive) { store.remove(lang) } label: { Label(L.t("刪除", "Delete", "削除"), systemImage: "trash") }
            }
        }
    }
}
