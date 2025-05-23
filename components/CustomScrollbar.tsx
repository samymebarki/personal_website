"use client"

import React, { useState, useEffect } from 'react'

const CustomScrollbar = () => {
  const [scrollPosition, setScrollPosition] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [documentHeight, setDocumentHeight] = useState(0)
  const [viewportHeight, setViewportHeight] = useState(0)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Calculate document height and viewport height
    const calculateHeights = () => {
      setDocumentHeight(document.documentElement.scrollHeight)
      setViewportHeight(window.innerHeight)
    }

    // Initial calculation
    calculateHeights()

    // Create a reference for the scroll timer
    let scrollTimer: ReturnType<typeof setTimeout> | null = null

    // Handle scroll events
    const handleScroll = () => {
      const currentPosition = window.scrollY
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercentage = (currentPosition / maxScroll) * 100
      
      setScrollPosition(scrollPercentage)
      setIsScrolling(true)
      
      // Reset scrolling state after scroll stops
      if (scrollTimer) clearTimeout(scrollTimer)
      scrollTimer = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    // Handle resize events
    const handleResize = () => {
      calculateHeights()
    }

    // Add event listeners
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', handleResize)

    // Clean up
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleResize)
      if (scrollTimer) clearTimeout(scrollTimer)
    }
  }, [])

  // Calculate scrollbar height based on viewport vs document height
  const scrollbarHeight = Math.max(
    (viewportHeight / documentHeight) * 100,
    10 // Minimum height 10%
  )

  // Calculate scrollbar thumb position
  const scrollbarPosition = (scrollPosition / 100) * (100 - scrollbarHeight)

  // Handle click on scrollbar track
  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const trackRect = e.currentTarget.getBoundingClientRect()
    const clickPosition = (e.clientY - trackRect.top) / trackRect.height
    
    // Calculate new scroll position
    const newScrollY = clickPosition * (document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo({
      top: newScrollY,
      behavior: 'smooth'
    })
  }

  return (
    <div 
      className="fixed right-3 top-0 h-full w-4 z-50 flex items-center justify-center"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Newspaper date indicator - lowered from top */}
      <div className="absolute top-12 right-0 -rotate-90 origin-right text-[10px] text-[#503822] font-serif italic opacity-60">
        EDITION {Math.ceil(scrollPosition)}
      </div>

      {/* Scrollbar track - sleeker design */}
      <div 
        className="w-[2px] h-[60%] bg-[#503822]/10 rounded-full relative cursor-pointer"
        onClick={handleTrackClick}
      >
        {/* Minimal decorations - more sleek */}
        <div className="absolute -left-[1px] top-0 w-1 h-6 bg-gradient-to-b from-[#503822]/20 to-transparent rounded-t-full"></div>
        <div className="absolute -left-[1px] bottom-0 w-1 h-6 bg-gradient-to-t from-[#503822]/20 to-transparent rounded-b-full"></div>
        
        {/* Scrollbar thumb - sleeker design */}
        <div 
          className={`absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-200 ${
            isScrolling ? 'bg-[#8b0000]/90' : 'bg-[#503822]/80'
          }`}
          style={{
            width: isHovering ? '4px' : '3px',
            height: `${scrollbarHeight}%`,
            top: `${scrollbarPosition}%`,
            transition: isScrolling ? 'top 0.1s ease-out, background-color 0.3s ease' : 'all 0.3s ease'
          }}
        >
          {/* Single subtle line in the middle for minimal decoration */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] bg-[#f8e1c2]/70 rounded-full opacity-80"></div>
        </div>
      </div>

      {/* Reading progress - lowered from bottom */}
      <div className="absolute bottom-12 right-0 -rotate-90 origin-right text-[10px] text-[#503822] font-serif opacity-60">
        {scrollPosition < 5 ? 'FRONT PAGE' : 
         scrollPosition < 30 ? 'HEADLINES' : 
         scrollPosition < 60 ? 'MAIN STORY' : 
         scrollPosition < 90 ? 'CONTINUED' : 'BACK PAGE'}
      </div>
    </div>
  )
}

export default CustomScrollbar
