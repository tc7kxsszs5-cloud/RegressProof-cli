// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "RegressProofDesktop",
    platforms: [
        .macOS(.v13),
    ],
    products: [
        .library(
            name: "RegressProofDesktop",
            targets: ["RegressProofDesktop"]
        ),
    ],
    targets: [
        .target(
            name: "RegressProofDesktop"
        ),
        .testTarget(
            name: "RegressProofDesktopTests",
            dependencies: ["RegressProofDesktop"]
        ),
    ]
)
