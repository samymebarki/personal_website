import { cn } from "@/lib/utils"

interface CoffeeStainProps {
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right" | "center"
  size?: "small" | "medium" | "large"
  opacity?: number
  rotation?: number
}

export default function CoffeeStain({
  position = "top-right",
  size = "medium",
  opacity = 0.15,
  rotation = 0,
}: CoffeeStainProps) {
  // Determine position classes
  const positionClasses = {
    "top-left": "top-0 left-0",
    "top-right": "top-0 right-0",
    "bottom-left": "bottom-0 left-0",
    "bottom-right": "bottom-0 right-0",
    center: "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  }

  // Determine size classes
  const sizeClasses = {
    small: "w-32 h-32",
    medium: "w-48 h-48",
    large: "w-64 h-64",
  }

  return (
    <div
      className={cn("absolute pointer-events-none z-10", positionClasses[position], sizeClasses[size])}
      style={{
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
    >
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M50 0C22.4 0 0 22.4 0 50s22.4 50 50 50 50-22.4 50-50S77.6 0 50 0zm0 90c-22.1 0-40-17.9-40-40s17.9-40 40-40 40 17.9 40 40-17.9 40-40 40z"
          fill="rgba(101, 67, 33, 0.5)"
        />
        <circle cx="50" cy="50" r="35" fill="rgba(101, 67, 33, 0.3)" />
        <circle cx="50" cy="50" r="25" fill="rgba(101, 67, 33, 0.2)" />
        <circle cx="50" cy="50" r="15" fill="rgba(101, 67, 33, 0.1)" />
      </svg>
    </div>
  )
}
