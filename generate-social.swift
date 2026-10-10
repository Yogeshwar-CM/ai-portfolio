import AppKit
import Foundation

guard CommandLine.arguments.count == 2 else { fatalError("Pass the output PNG path") }
guard let bitmap = NSBitmapImageRep(bitmapDataPlanes: nil, pixelsWide: 1200, pixelsHigh: 630, bitsPerSample: 8, samplesPerPixel: 4, hasAlpha: true, isPlanar: false, colorSpaceName: .deviceRGB, bytesPerRow: 0, bitsPerPixel: 0), let context = NSGraphicsContext(bitmapImageRep: bitmap) else { fatalError("Cannot create image") }
NSGraphicsContext.saveGraphicsState()
NSGraphicsContext.current = context
let base = NSColor(red: 13/255, green: 14/255, blue: 16/255, alpha: 1)
let ink = NSColor(red: 240/255, green: 240/255, blue: 233/255, alpha: 1)
let muted = NSColor(red: 179/255, green: 183/255, blue: 184/255, alpha: 1)
let signal = NSColor(red: 188/255, green: 224/255, blue: 223/255, alpha: 1)
base.setFill()
NSRect(x: 0, y: 0, width: 1200, height: 630).fill()
func text(_ value: String, _ x: CGFloat, _ y: CGFloat, _ size: CGFloat, _ color: NSColor) {
    (value as NSString).draw(at: NSPoint(x: x, y: y), withAttributes: [.font: NSFont.systemFont(ofSize: size, weight: .regular), .foregroundColor: color])
}
text("Personal portfolio", 65, 555, 18, muted)
text("Yogeshwar CM", 60, 422, 96, ink)
text("Internal tools & AI automation", 65, 355, 35, ink)
text("For individuals, founders, and teams.", 65, 305, 23, muted)
let wire = NSBezierPath()
wire.lineWidth = 1.5
wire.move(to: NSPoint(x: 65, y: 215))
wire.line(to: NSPoint(x: 300, y: 215))
wire.curve(to: NSPoint(x: 360, y: 175), controlPoint1: NSPoint(x: 350, y: 215), controlPoint2: NSPoint(x: 310, y: 175))
wire.line(to: NSPoint(x: 1135, y: 175))
signal.setStroke()
wire.stroke()
let card = NSBezierPath(roundedRect: NSRect(x: 395, y: 125, width: 430, height: 100), xRadius: 10, yRadius: 10)
NSColor(red: 35/255, green: 40/255, blue: 44/255, alpha: 1).setFill()
card.fill()
signal.setStroke()
card.lineWidth = 1
card.stroke()
text("Tools that work together", 425, 160, 26, ink)
text("Your everyday work", 65, 150, 19, muted)
text("Useful outcomes", 895, 133, 19, muted)
text("cmyogeshwar@gmail.com", 65, 53, 17, muted)
NSGraphicsContext.restoreGraphicsState()
guard let png = bitmap.representation(using: .png, properties: [:]) else { fatalError("Cannot encode PNG") }
try png.write(to: URL(fileURLWithPath: CommandLine.arguments[1]), options: .atomic)
print("Created 1200 × 630 social preview")
