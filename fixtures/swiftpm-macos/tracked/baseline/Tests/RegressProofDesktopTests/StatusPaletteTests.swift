import AppKit
import XCTest
@testable import RegressProofDesktop

final class StatusPaletteTests: XCTestCase {
    func testConfirmedAgentFaultUsesSystemRed() {
        XCTAssertTrue(
            StatusPalette.accentColor(for: .confirmedAgentFault).isEqual(NSColor.systemRed)
        )
    }

    func testSuccessfulChangeUsesSystemGreen() {
        XCTAssertTrue(
            StatusPalette.accentColor(for: .successfulChange).isEqual(NSColor.systemGreen)
        )
    }
}
