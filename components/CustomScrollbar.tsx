"use client"

import React, { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const CustomScrollbar = () => {
  const { theme } = useTheme()
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
      className="fixed right-3 top-0 h-full w-6 z-50 flex items-center justify-center"
      style={{
        opacity: '1',
        visibility: 'visible',
        pointerEvents: 'auto'
      }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Newspaper date indicator - lowered from top */}
      <div className="absolute top-12 right-0 -rotate-90 origin-right text-[10px] font-serif italic"
           style={{
             color: theme === 'futuristic' ? '#00f7ff' : '#503822',
             textShadow: theme === 'futuristic' ? '0 0 5px #00f7ff' : 'none',
             opacity: theme === 'futuristic' ? '0.9' : '0.6'
           }}>
        EDITION {Math.ceil(scrollPosition)}
      </div>

      {/* Scrollbar track - sleeker design */}
      <div 
        className="w-[2px] h-[60%] rounded-full relative cursor-pointer"
        style={{
          backgroundColor: theme === 'futuristic' ? 'rgba(0, 255, 255, 0.1)' : 'rgba(80, 56, 34, 0.1)'
        }}
        onClick={handleTrackClick}
      >
        {/* Minimal decorations - more sleek */}
        <div className="absolute -left-[1px] top-0 w-1 h-6 bg-gradient-to-b to-transparent rounded-t-full"
             style={{
               background: theme === 'futuristic' 
                ? 'linear-gradient(to bottom, rgba(0, 247, 255, 0.5), transparent)' 
                : 'linear-gradient(to bottom, rgba(80, 56, 34, 0.2), transparent)',
               boxShadow: theme === 'futuristic' ? '0 0 8px rgba(0, 247, 255, 0.4)' : 'none'
             }}></div>
        <div className="absolute -left-[1px] bottom-0 w-1 h-6 bg-gradient-to-t to-transparent rounded-b-full"
             style={{
               background: theme === 'futuristic' 
                ? 'linear-gradient(to top, rgba(0, 247, 255, 0.5), transparent)' 
                : 'linear-gradient(to top, rgba(80, 56, 34, 0.2), transparent)',
               boxShadow: theme === 'futuristic' ? '0 0 8px rgba(0, 247, 255, 0.4)' : 'none'
             }}></div>
        
        {/* Scrollbar thumb - sleeker design */}
        <div 
          className="absolute left-1/2 -translate-x-1/2 rounded-full transition-all duration-200"
          style={{
            backgroundColor: theme === 'futuristic'
              ? (isScrolling ? '#00ffdd' : '#00f7ff')
              : (isScrolling ? 'rgba(139, 0, 0, 0.9)' : 'rgba(80, 56, 34, 0.8)'),
            width: theme === 'futuristic' ? (isHovering ? '6px' : '4px') : (isHovering ? '4px' : '3px'),
            height: `${scrollbarHeight}%`,
            top: `${scrollbarPosition}%`,
            transition: isScrolling ? 'top 0.1s ease-out, background-color 0.3s ease' : 'all 0.3s ease',
            boxShadow: theme === 'futuristic' ? '0 0 10px #00f7ff, 0 0 4px #00f7ff' : 'none',
            border: theme === 'futuristic' ? '1px solid rgba(0, 247, 255, 0.4)' : 'none'
          }}
        >
          {/* Single subtle line in the middle for minimal decoration */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-80"
               style={{
                 backgroundColor: theme === 'futuristic' ? '#00ffdd' : 'rgba(248, 225, 194, 0.7)',
                 width: theme === 'futuristic' ? '4px' : '3px',
                 height: theme === 'futuristic' ? '4px' : '3px',
                 boxShadow: theme === 'futuristic' ? '0 0 6px #00f7ff' : 'none'
               }}></div>
        </div>
      </div>

      {/* Reading progress - lowered from bottom */}
      <div className="absolute bottom-12 right-0 -rotate-90 origin-right text-[10px] font-serif"
           style={{
             color: theme === 'futuristic' ? '#00f7ff' : '#503822',
             textShadow: theme === 'futuristic' ? '0 0 5px #00f7ff' : 'none',
             opacity: theme === 'futuristic' ? '0.9' : '0.6'
           }}>
        {scrollPosition < 5 ? 'FRONT PAGE' : 
         scrollPosition < 30 ? 'HEADLINES' : 
         scrollPosition < 60 ? 'CRIMINAL RECORD' : 
         scrollPosition < 90 ? 'NOTORIOUS CASES' : 'TESTIMONIALS'}
      </div>
    </div>
  )
}

export default CustomScrollbar
