// muestra de swift para revisar el resaltado de dark dev
import SwiftUI
import Foundation

protocol Ramp { func at(_ index: Int) -> Int? }

enum Mode: String, CaseIterable { case dark, mono }

@available(iOS 15, *)
struct Slot: Identifiable, Equatable {
    let id = UUID()
    var name: String
    private(set) var value: UInt32 = 0xEEEEEE

    /// devuelve el alfa.
    func alpha(_ percent: Double) -> String {
        guard (0...100).contains(percent) else { return "" }
        return String(format: "#%06X%02X", value, Int(percent / 100 * 255))
    }
}

@MainActor
final class Model: ObservableObject {
    @Published var slots: [Slot] = []
    static let shared = Model()

    func load() async throws {
        for slot in slots where !slot.name.isEmpty {
            print("\(slot.name): \(slot.alpha(50))")
        }
        defer { print("done") }
        if let first = slots.first, case .some = Optional(first) { return }
    }
}
extension Slot { var title: String { name.uppercased() } }
