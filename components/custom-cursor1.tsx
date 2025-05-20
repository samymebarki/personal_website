'use client'
import { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [isDrawing, setIsDrawing] = useState(false)
  const [prevPosition, setPrevPosition] = useState(null)
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  
  const inkColors = ["#000000", "#001f3f", "#0A3161", "#1B1B1B"]
  const activeColor = useRef(inkColors[0])

  // Only run on client
  useEffect(() => {
    // Skip on mobile/tablet
    if (typeof window === "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return
    }

    // Setup canvas
    const canvas = canvasRef.current
    if (canvas) {
      canvas.width = window.innerWidth * 2
      canvas.height = window.innerHeight * 2
      canvas.style.width = `${window.innerWidth}px`
      canvas.style.height = `${window.innerHeight}px`
      
      const context = canvas.getContext('2d')
      context.scale(2, 2)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.globalAlpha = 0.8
      contextRef.current = context
    }

    // Handle window resize
    const handleResize = () => {
      if (canvas) {
        canvas.width = window.innerWidth * 2
        canvas.height = window.innerHeight * 2
        canvas.style.width = `${window.innerWidth}px`
        canvas.style.height = `${window.innerHeight}px`
        
        const context = canvas.getContext('2d')
        context.scale(2, 2)
        context.lineCap = 'round'
        context.lineJoin = 'round'
        context.globalAlpha = 0.8
        contextRef.current = context
      }
    }

    // Update cursor position and draw ink trail
    const onMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setPosition(newPosition)
      setVisible(true)
      
      // Always draw ink line
      if (contextRef.current) {
        // Use a consistent color for smoother lines
        if (Math.random() < 0.05) {
          activeColor.current = inkColors[Math.floor(Math.random() * inkColors.length)]
        }
        
        const lineWidth = clicked ? 3 : 1.5
        
        // Random slight variation in line width for natural ink look
        const variableWidth = lineWidth + (Math.random() * 0.5 - 0.25)
        
        if (prevPosition) {
          contextRef.current.beginPath()
          contextRef.current.moveTo(prevPosition.x, prevPosition.y)
          contextRef.current.lineTo(newPosition.x, newPosition.y)
          contextRef.current.strokeStyle = activeColor.current
          contextRef.current.lineWidth = variableWidth
          contextRef.current.stroke()
        } else {
          // If no previous position, draw a dot
          contextRef.current.beginPath()
          contextRef.current.arc(
            newPosition.x, 
            newPosition.y, 
            variableWidth/2, 
            0, 
            Math.PI * 2
          )
          contextRef.current.fillStyle = activeColor.current
          contextRef.current.fill()
        }
        
        // Occasionally add ink splatter or drip effect
        if (Math.random() < 0.03) {
          const splatterSize = Math.random() * 2 + 0.5
          contextRef.current.beginPath()
          contextRef.current.arc(
            newPosition.x + (Math.random() * 6 - 3), 
            newPosition.y + (Math.random() * 6 - 3), 
            splatterSize, 
            0, 
            Math.PI * 2
          )
          contextRef.current.fillStyle = randomInkColor
          contextRef.current.fill()
        }
      }
      
      setPrevPosition(newPosition)

      // Check if hovering over interactive element
      const target = e.target
      setHovered(!!target.closest("a, button, [data-cursor='pointer']"))
    }

    // Handle mouse down/up
    const onMouseDown = () => {
      setClicked(true)
      setIsDrawing(true)
    }
    
    const onMouseUp = () => {
      setClicked(false)
      setIsDrawing(false)
    }

    // Hide cursor when leaving window
    const onMouseLeave = () => {
      setVisible(false)
      setPrevPosition(null)
    }
    
    const onMouseEnter = () => {
      setVisible(true)
    }

    // Fade effect for ink trails (very slow to mimic real ink)
    const fadeEffect = setInterval(() => {
      if (contextRef.current && canvasRef.current) {
        contextRef.current.fillStyle = 'rgba(255, 255, 255, 0.003)'
        contextRef.current.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      }
    }, 200)

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)
    window.addEventListener("resize", handleResize)

    // Add cursor-none to all interactive elements
    document.querySelectorAll("a, button, [data-cursor='pointer']").forEach((el) => {
      el.classList.add("cursor-none")
    })

    // Add cursor-none to body
    document.body.classList.add("cursor-none")

    // Cleanup
    return () => {
      document.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mousedown", onMouseDown)
      document.removeEventListener("mouseup", onMouseUp)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      window.removeEventListener("resize", handleResize)
      clearInterval(fadeEffect)
    }
  }, [clicked, prevPosition])

  // Don't render on server or mobile
  if (
    typeof window === "undefined" ||
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
  ) {
    return null
  }

  return (
    <>
      <style jsx global>{`
        .cursor-none, .cursor-none * {
          cursor: none !important;
        }
      `}</style>

      {/* Canvas for the ink trail */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      />

      {/* Pen cursor */}
      <div
        className={`fixed pointer-events-none z-[9999] transition-opacity duration-150 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-3px, ${clicked ? -1 : -3}px) rotate(45deg)`,
          transition: "transform 0.1s ease-out"
        }}
      >
        {/* Pen shape */}
        <div className="relative">
          {/* Pen body */}
          <div 
            className="absolute bg-gray-800 rounded-t-sm"
            style={{
              width: "3px",
              height: "20px",
              transformOrigin: "bottom center"
            }}
          />
          {/* Pen tip */}
          <div 
            className="absolute bg-black"
            style={{
              width: "1px",
              height: "3px",
              bottom: "-2px",
              left: "1px",
              backgroundColor: clicked ? "#0046be" : "#000"
            }}
          />
          {/* Pen clip */}
          <div 
            className="absolute bg-gray-400"
            style={{
              width: "1px",
              height: "8px",
              top: "2px",
              left: "4px"
            }}
          />
        </div>
      </div>
    </>
  )
}