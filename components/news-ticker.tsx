"use client"

import { useEffect, useRef } from "react"

interface NewsTickerProps {
  items: string[]
  speed?: number
}

export default function NewsTicker({ items, speed = 30 }: NewsTickerProps) {
  const tickerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!tickerRef.current) return

    const tickerContent = tickerRef.current
    const contentWidth = tickerContent.scrollWidth / 2 // Divide by 2 because we duplicated the items
    const duration = contentWidth / speed

    // Define the animation
    const animateTicker = () => {
      // Check if gsap is available
      const gsap = window.gsap
      if (!gsap) return
      
      // Reset position before animating again
      gsap.set(tickerContent, { x: 0 })
      
      // Create the animation
      gsap.to(tickerContent, {
        x: -contentWidth,
        duration: duration,
        ease: "linear",
        repeat: -1,
        onRepeat: () => {
          // Reset to beginning when halfway through for seamless loop
          if (tickerContent.getBoundingClientRect().x <= -contentWidth) {
            gsap.set(tickerContent, { x: 0 })
          }
        }
      })
    }
    
    // Start the animation
    animateTicker()

    // Add window resize listener to recalculate on window resize
    const handleResize = () => {
      const gsap = window.gsap
      if (!gsap) return
      
      gsap.killTweensOf(tickerContent)
      animateTicker()
    }
    
    window.addEventListener('resize', handleResize)

    return () => {
      const gsap = window.gsap
      if (gsap) gsap.killTweensOf(tickerContent)
      window.removeEventListener('resize', handleResize)
    }
  }, [speed, items])

  return (
    <div className="w-full overflow-hidden bg-[#503822] text-white py-2  ">
      <div className="relative">
        <div className="absolute left-0 top-0 bg-gradient-to-r from-[#503822] to-transparent w-16 h-full z-10"></div>
        <div className="absolute right-0 top-0 bg-gradient-to-l from-[#503822] to-transparent w-16 h-full z-10"></div>
        <div className="flex whitespace-nowrap font-medium" ref={tickerRef}>
          {items.map((item, index) => (
            <div key={index} className="mx-8 text-sm uppercase tracking-wider">
              <span className="mr-2 font-bold">BREAKING:</span>
              {item}
            </div>
          ))}
          {/* Duplicate items for seamless looping */}
          {items.map((item, index) => (
            <div key={`dup-${index}`} className="mx-8 text-sm uppercase tracking-wider">
              <span className="mr-2 font-bold">BREAKING:</span>
              {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
