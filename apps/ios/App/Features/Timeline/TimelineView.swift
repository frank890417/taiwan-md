import SwiftUI

struct TimelineView: View {
    @Environment(AppModel.self) private var model

    var body: some View {
        let lang = model.readableLang
        ScrollView {
            VStack(alignment: .leading, spacing: 0) {
                Text(L.t("以島嶼為主體，看每個時代誰在這裡生活、怎麼互動。",
                         "Taiwan as the subject: who lived here in each era, and how they met.",
                         "島を主体に、各時代にだれがここで暮らし、どう出会ったか。"))
                    .font(.subheadline).foregroundStyle(.secondary)
                    .padding(.horizontal).padding(.bottom, 16)
                ForEach(Array(Era.all.enumerated()), id: \.element.id) { i, era in
                    Button { model.push(.era(era.id)) } label: {
                        HStack(alignment: .top, spacing: 14) {
                            VStack(spacing: 0) {
                                Circle().fill(era.tint).frame(width: 14, height: 14).padding(.top, 4)
                                if i < Era.all.count - 1 {
                                    Rectangle().fill(era.tint.opacity(0.35)).frame(width: 3)
                                }
                            }
                            .frame(width: 14)
                            VStack(alignment: .leading, spacing: 4) {
                                Text(era.yearsLabel.pick(lang)).font(.caption.weight(.semibold)).foregroundStyle(era.tint)
                                Text(era.title.pick(lang)).font(.title3.weight(.bold)).foregroundStyle(.primary)
                                Text(era.subtitle.pick(lang)).font(.subheadline).foregroundStyle(.secondary)
                                Text(L.t("\(era.events.count) 個事件", "\(era.events.count) events", "\(era.events.count) 件の出来事"))
                                    .font(.caption2).foregroundStyle(.tertiary)
                            }
                            .padding(.bottom, 26)
                            Spacer()
                            Image(systemName: "chevron.right").foregroundStyle(.tertiary).padding(.top, 6)
                        }
                        .padding(.horizontal)
                        .contentShape(Rectangle())
                    }
                    .buttonStyle(.plain)
                    .accessibilityElement(children: .combine)
                }
            }
            .padding(.vertical)
        }
        .navigationTitle(L.t("時間軸", "Timeline", "年表"))
    }
}

struct EraView: View {
    @Environment(AppModel.self) private var model
    let eraID: String

    var body: some View {
        let lang = model.readableLang
        if let era = Era.all.first(where: { $0.id == eraID }) {
            List {
                Section {
                    VStack(alignment: .leading, spacing: 8) {
                        Text(era.yearsLabel.pick(lang)).font(.subheadline.weight(.semibold)).foregroundStyle(era.tint)
                        Text(era.subtitle.pick(lang)).font(.headline)
                        Text(era.intro.pick(lang)).font(.body).foregroundStyle(.secondary)
                    }
                    .padding(.vertical, 6)
                }
                Section(L.t("事件", "Events", "出来事")) {
                    ForEach(era.events) { ev in
                        let meta = ev.link.flatMap { model.packs.meta(ArticleRef(lang: lang, key: $0)) }
                        Button {
                            if let meta { model.open(meta.ref) }
                        } label: {
                            HStack(alignment: .top, spacing: 12) {
                                Text(ev.year.pick(lang)).font(.headline.monospacedDigit()).foregroundStyle(era.tint)
                                    .frame(minWidth: 52, alignment: .leading)
                                VStack(alignment: .leading, spacing: 4) {
                                    Text(ev.title.pick(lang)).font(.headline).foregroundStyle(.primary)
                                    if let d = ev.desc?.pick(lang) { Text(d).font(.subheadline).foregroundStyle(.secondary) }
                                    if let meta {
                                        Label(meta.title, systemImage: "doc.text").font(.caption).foregroundStyle(Color.brand).lineLimit(1)
                                    }
                                }
                            }
                            .padding(.vertical, 4)
                        }
                        .buttonStyle(.plain)
                        .disabled(meta == nil)
                    }
                }
                let refs = (era.anchors ?? []) + (era.articles ?? [])
                let metas = refs.compactMap { model.packs.meta(ArticleRef(lang: lang, key: $0)) }
                if !metas.isEmpty {
                    Section(L.t("延伸閱讀", "Read more", "関連記事")) {
                        ForEach(metas) { m in
                            Button { model.open(m.ref) } label: { ArticleRow(meta: m, showCategory: false) }.buttonStyle(.plain)
                        }
                    }
                }
                if let figs = era.figures, !figs.isEmpty {
                    Section(L.t("人物", "People", "人物")) {
                        ForEach(figs) { f in
                            if let m = model.packs.meta(ArticleRef(lang: lang, key: f.ref)) {
                                Button { model.open(m.ref) } label: {
                                    Label(f.name.pick(lang), systemImage: "person.crop.circle")
                                }
                            }
                        }
                    }
                }
            }
            .navigationTitle(era.title.pick(lang))
            .navigationBarTitleDisplayMode(.large)
        }
    }
}
