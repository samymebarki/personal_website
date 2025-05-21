interface RoughPaperOverlayProps {
  className?: string;
}

export default function RoughPaperOverlay({ className = '' }: RoughPaperOverlayProps) {
  return (
    <div
      className={`fixed inset-0 pointer-events-none z-[-1] opacity-30 w-full h-full ${className}`}
      style={{
        backgroundImage: 'url("/images/texture_overlay.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        mixBlendMode: "multiply",
      }}
      aria-hidden="true"
    />
  )
}
