import SwiftUI

struct RootView: View {
    @Environment(AppModel.self) private var model

    var body: some View {
        @Bindable var model = model
        Group {
            if model.ready {
                TabView(selection: $model.tab) {
                    Tab(L.t("今日", "Today", "今日"), systemImage: "sun.max", value: AppTab.today) {
                        stack(.today) { TodayView() }
                    }
                    Tab(L.t("探索", "Explore", "探索"), systemImage: "square.grid.2x2", value: AppTab.explore) {
                        stack(.explore) { ExploreView() }
                    }
                    Tab(L.t("收藏", "Library", "ライブラリ"), systemImage: "bookmark", value: AppTab.library) {
                        stack(.library) { LibraryView() }
                    }
                    Tab(L.t("設定", "Settings", "設定"), systemImage: "gearshape", value: AppTab.settings) {
                        stack(.settings) { SettingsView() }
                    }
                    Tab(value: AppTab.search, role: .search) {
                        stack(.search) { SearchView() }
                    }
                }
                .tint(.brand)
            } else {
                PreparingView()
            }
        }
    }

    private func stack<Content: View>(_ tab: AppTab, @ViewBuilder _ content: () -> Content) -> some View {
        NavigationStack(path: Binding(get: { model.paths[tab] ?? [] }, set: { model.paths[tab] = $0 })) {
            content()
                .navigationDestination(for: Route.self) { route in
                    switch route {
                    case .article(let ref): ReaderView(ref: ref)
                    case .category(let c): CategoryView(category: c)
                    case .timeline: TimelineView()
                    case .era(let id): EraView(eraID: id)
                    }
                }
        }
    }
}

/// 首次啟動解壓內容包時的畫面
struct PreparingView: View {
    var body: some View {
        VStack(spacing: 18) {
            Image("Mark")
                .resizable().scaledToFit().frame(width: 72, height: 72)
            ProgressView()
            Text(L.t("正在準備離線內容⋯", "Preparing offline content…", "オフラインコンテンツを準備中…"))
                .font(.subheadline).foregroundStyle(.secondary)
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color("LaunchBackground"))
    }
}
