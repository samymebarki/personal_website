"use client"

import { useEffect, useRef } from "react"
import { cn } from "@/lib/utils"

interface InkAnimationProps {
  text: string
  className?: string
  delay?: number
  duration?: number
}

export default function InkAnimation({ text, className = "", delay = 0, duration = 150 }: InkAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const timer = setTimeout(() => {
      const spans = container.querySelectorAll(".ink-letter")
      spans.forEach((span, index) => {
        setTimeout(() => {
          span.classList.add("animate")
        }, index * duration) // Stagger the animation for each letter
      })
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, duration])

  // Split text into individual spans for letter-by-letter animation
  const letters = text.split("").map((letter, index) => (
    <span key={index} className={cn("ink-letter relative inline-block", letter === " " ? "mx-2" : "")}>
      {/* Outline version of the letter (visible first) */}
      <span className="absolute inset-0 text-transparent outline-text">{letter}</span>

      {/* Filled version of the letter (revealed by animation) */}
      <span className="relative z-10 opacity-0 ink-fill-reveal">{letter}</span>

      {/* Ink drip effect */}
      {letter !== " " && (
        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[2px] h-0 bg-sepia-900 ink-drip"></span>
      )}
    </span>
  ))

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      {letters}
    </div>
  )
}
