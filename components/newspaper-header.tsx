import TornPaperEdge from "./torn-paper-edge"

export default function NewspaperHeader() {
  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <header className="border-b border-[#1b1b19]/30 pb-4 relative bg-[#c4bdb3]">
      <TornPaperEdge position="bottom" />

      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-4">
          <div className="text-xs uppercase tracking-wider text-[#1b1b19]/80">Constantine, Algeria</div>
          <div className="text-xs uppercase tracking-wider text-[#1b1b19]/80">Vol. 1, No. 1</div>
          <div className="text-xs uppercase tracking-wider text-[#1b1b19]/80">{currentDate}</div>
        </div>

        <h1 className="newspaper-title text-4xl md:text-6xl lg:text-7xl mb-4 pb-2 text-center text-[#1b1b19]">
          The Mebarki Journal
        </h1>

        <div className="flex justify-center items-center gap-4 text-sm uppercase tracking-wider text-[#1b1b19]/80">
          <span>Software Engineering</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b1b19]"></span>
          <span>Artificial Intelligence</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#1b1b19]"></span>
          <span>Graphic Design</span>
        </div>
      </div>
    </header>
  )
}
