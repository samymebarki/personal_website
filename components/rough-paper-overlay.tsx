export default function RoughPaperOverlay() {
  return (
    <div
      className="fixed inset-0 pointer-events-none z-[-1] opacity-20"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='a'%3E%3CfeTurbulence baseFrequency='.05' numOctaves='3' seed='50'/%3E%3CfeDisplacementMap in='SourceGraphic' scale='5'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23a)'/%3E%3C/svg%3E")`,
        mixBlendMode: "multiply",
      }}
      aria-hidden="true"
    />
  )
}
