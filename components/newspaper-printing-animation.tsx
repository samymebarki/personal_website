"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

interface NewspaperPrintingAnimationProps {
  name: string
  subtitle?: string
  delay?: number
  onComplete?: () => void
}

export default function NewspaperPrintingAnimation({
  name,
  subtitle = "Software Engineer & Graphic Designer",
  delay = 500,
  onComplete,
}: NewspaperPrintingAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isTypesetting, setIsTypesetting] = useState(false)
  const [isPrinting, setIsPrinting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      setIsTypesetting(true)
    }, delay)

    const timer2 = setTimeout(() => {
      setIsPrinting(true)
    }, delay + 2000)

    const timer3 = setTimeout(() => {
      setIsComplete(true)
      if (onComplete) onComplete()
    }, delay + 4000)

    return () => {
      clearTimeout(timer1)
      clearTimeout(timer2)
      clearTimeout(timer3)
    }
  }, [delay, onComplete])

  return (
    <div
      ref={containerRef}
      className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto bg-sepia-50 p-8 border border-sepia-300 shadow-lg"
    >
      {/* Printing press overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-sepia-900 transition-transform duration-2000 ease-in-out z-10",
          isPrinting ? "translate-y-full" : "translate-y-0",
        )}
      />

      {/* Printing lines that move across the page */}
      <div
        className={cn(
          "absolute left-0 right-0 h-4 bg-sepia-800 opacity-30 transition-transform duration-2000 ease-in-out z-20",
          isPrinting ? "translate-y-full" : "-translate-y-full",
        )}
      />

      {/* Newspaper masthead */}
      <div className="text-center mb-6 relative">
        <div className="text-xs uppercase tracking-wider text-sepia-700 mb-2">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </div>
        <h1 className="text-4xl md:text-6xl font-playfair font-bold tracking-tight text-sepia-900 mb-2">
          THE DAILY CHRONICLE
        </h1>
        <div className="flex justify-center items-center gap-4 text-sm uppercase tracking-wider text-sepia-600">
          <span>SPECIAL EDITION</span>
          <span className="w-1.5 h-1.5 rounded-full bg-sepia-700"></span>
          <span>PORTFOLIO RELEASE</span>
        </div>
      </div>

      {/* Main headline */}
      <div className="w-full border-t border-b border-sepia-800 py-6 mb-6">
        <h2 className="text-5xl md:text-7xl font-playfair font-black text-center leading-tight">
          {name.split("").map((char, index) => (
            <span
              key={index}
              className={cn(
                "inline-block transition-all duration-300 ease-in-out",
                isTypesetting ? "opacity-100 transform-none" : "opacity-0 -translate-y-4 scale-150 blur-sm",
                char === " " ? "mx-2" : "",
              )}
              style={{ transitionDelay: `${delay + index * 100}ms` }}
            >
              {char}
            </span>
          ))}
        </h2>
      </div>

      {/* Subtitle */}
      <div className="text-xl text-center text-sepia-800 max-w-2xl">
        {subtitle.split(" ").map((word, index) => (
          <span
            key={index}
            className={cn(
              "inline-block transition-all duration-500 ease-in-out mr-2",
              isTypesetting ? "opacity-100 transform-none" : "opacity-0 translate-y-2",
            )}
            style={{ transitionDelay: `${delay + 1000 + index * 150}ms` }}
          >
            {word}
          </span>
        ))}
      </div>

      {/* Printing press noise overlay */}
      <div
        className={cn(
          "absolute inset-0 bg-noise opacity-20 pointer-events-none transition-opacity duration-1000",
          isPrinting ? "opacity-10" : "opacity-0",
        )}
      />

      {/* Ink roller marks */}
      <div className="absolute inset-x-0 top-0 h-1 bg-sepia-900 opacity-10"></div>
      <div className="absolute inset-x-0 bottom-0 h-1 bg-sepia-900 opacity-10"></div>
    </div>
  )
}
