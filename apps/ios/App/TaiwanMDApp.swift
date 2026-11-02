import SwiftUI

@main
struct TaiwanMDApp: App {
    @State private var model = AppModel()
    @Environment(\.scenePhase) private var phase

    var body: some Scene {
        WindowGroup {
            RootView()
                .environment(model)
                .preferredColorScheme(model.appearance.scheme)
                .task { await model.bootstrap() }
                .onOpenURL { model.handle(url: $0) }
                .onContinueUserActivity(NSUserActivityTypeBrowsingWeb) { act in
                    if let url = act.webpageURL { model.handle(url: url) }
                }
                .onChange(of: phase) { _, p in
                    if p == .active, model.ready {
                        Task { await model.updater.checkIfDue(wifiOnly: model.wifiOnly) }
                    }
                }
        }
    }
}
