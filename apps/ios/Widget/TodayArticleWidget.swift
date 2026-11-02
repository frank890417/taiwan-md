import WidgetKit
import SwiftUI

/// 「今日一篇」：App 預先算好 14 天份寫進 App Group，Widget 不開資料庫、不連網。
struct TodayEntry: TimelineEntry {
    let date: Date
    let pick: WidgetSnapshot.Pick?
}

struct TodayProvider: TimelineProvider {
    func placeholder(in context: Context) -> TodayEntry {
        TodayEntry(date: Date(), pick: .init(day: "", lang: "zh-TW", key: "History/二二八事件", category: "History",
                                             categoryName: "歷史", title: "二二八事件",
                                             summary: "一個寡婦的私菸攤，如何點燃一座島嶼三十八年的沉默。"))
    }

    func getSnapshot(in context: Context, completion: @escaping (TodayEntry) -> Void) {
        let snap = WidgetSnapshot.load()
        completion(TodayEntry(date: Date(), pick: snap?.pick(for: Date()) ?? placeholder(in: context).pick))
    }

    func getTimeline(in context: Context, completion: @escaping (Timeline<TodayEntry>) -> Void) {
        let snap = WidgetSnapshot.load()
        var cal = Calendar(identifier: .gregorian)
        cal.timeZone = TimeZone(identifier: "Asia/Taipei") ?? .current
        let start = cal.startOfDay(for: Date())
        var entries = [TodayEntry(date: Date(), pick: snap?.pick(for: Date()))]
        for i in 1..<8 {
            guard let d = cal.date(byAdding: .day, value: i, to: start) else { continue }
            entries.append(TodayEntry(date: d, pick: snap?.pick(for: d)))
        }
        completion(Timeline(entries: entries, policy: .atEnd))
    }
}

struct TodayArticleView: View {
    @Environment(\.widgetFamily) private var family
    let entry: TodayEntry

    var body: some View {
        if let p = entry.pick {
            VStack(alignment: .leading, spacing: 6) {
                HStack(spacing: 5) {
                    RoundedRectangle(cornerRadius: 2).fill(Color.accentColor).frame(width: 4, height: 12)
                    Text(label(p)).font(.caption2.weight(.semibold)).foregroundStyle(.secondary).lineLimit(1)
                }
                Text(p.title)
                    .font(family == .systemSmall ? .headline : .title3.weight(.semibold))
                    .lineLimit(family == .systemSmall ? 4 : 2)
                    .minimumScaleFactor(0.8)
                if family != .systemSmall {
                    Text(p.summary).font(.footnote).foregroundStyle(.secondary).lineLimit(3)
                }
                Spacer(minLength: 0)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
            .environment(\.layoutDirection, p.lang == "ar" ? .rightToLeft : .leftToRight)
            .widgetURL(WidgetSnapshot.articleURL(lang: p.lang, key: p.key))
        } else {
            VStack(alignment: .leading, spacing: 6) {
                Text("Taiwan.md").font(.headline)
                Text(Self.openAppHint).font(.footnote).foregroundStyle(.secondary)
            }
            .frame(maxWidth: .infinity, maxHeight: .infinity, alignment: .topLeading)
        }
    }

    private func label(_ p: WidgetSnapshot.Pick) -> String {
        "\(Self.todayLabel) · \(p.categoryName)"
    }

    static var todayLabel: String {
        let l = Bundle.main.preferredLocalizations.first ?? "zh-Hant"
        return l.hasPrefix("ja") ? "今日の一篇" : l.hasPrefix("en") ? "Today's read" : "今日一篇"
    }

    static var openAppHint: String {
        let l = Bundle.main.preferredLocalizations.first ?? "zh-Hant"
        return l.hasPrefix("ja") ? "アプリを一度開いてください" : l.hasPrefix("en") ? "Open the app once to start" : "先打開 App 一次"
    }
}

struct TodayArticleWidget: Widget {
    var body: some WidgetConfiguration {
        StaticConfiguration(kind: "md.taiwan.today", provider: TodayProvider()) { entry in
            TodayArticleView(entry: entry)
                .containerBackground(.fill.tertiary, for: .widget)
        }
        .configurationDisplayName("Taiwan.md")
        .description(TodayArticleView.todayLabel)
        .supportedFamilies([.systemSmall, .systemMedium])
    }
}

@main
struct TaiwanMDWidgetBundle: WidgetBundle {
    var body: some Widget { TodayArticleWidget() }
}
