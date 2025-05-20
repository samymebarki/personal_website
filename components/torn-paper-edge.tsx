interface TornPaperEdgeProps {
  position?: "top" | "bottom" | "left" | "right"
  className?: string
}

export default function TornPaperEdge({ position = "bottom", className = "" }: TornPaperEdgeProps) {
  // Generate random torn paper path
  const generateTornPath = () => {
    const segments = 20
    const amplitude = 15
    const width = 100

    let path = `M0,0 `

    // Generate random points for the torn edge
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * width
      const yVariation = Math.random() * amplitude
      path += `L${x},${yVariation} `
    }

    // Close the path
    path += `L100,0 L100,100 L0,100 Z`

    return path
  }

  const tornPath = generateTornPath()

  const getTransform = () => {
    switch (position) {
      case "top":
        return "rotate(180deg)"
      case "left":
        return "rotate(90deg)"
      case "right":
        return "rotate(-90deg)"
      default:
        return "rotate(0deg)"
    }
  }

  return (
    <div
      className={`absolute w-full h-8 overflow-hidden pointer-events-none ${className}`}
      style={{
        [position]: "-1rem",
        transform: getTransform(),
        zIndex: 10,
      }}
    >
      <svg
        width="100%"
        height="100%"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        className="fill-current text-sepia-100 drop-shadow-md"
      >
        <path d={tornPath} />
      </svg>
    </div>
  )
}
