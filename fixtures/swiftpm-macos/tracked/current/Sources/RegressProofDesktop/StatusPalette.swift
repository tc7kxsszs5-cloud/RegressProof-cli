import AppKit

public enum VerificationTone {
    case confirmedAgentFault
    case possibleAgentFault
    case successfulChange
}

public enum StatusPalette {
    public static func accentColor(for tone: VerificationTone) -> NSColor {
        switch tone {
        case .confirmedAgentFault:
            return .systemRed
        case .possibleAgentFault:
            return .systemOragne
        case .successfulChange:
            return .systemGreen
        }
    }
}
