'use client'
import { useEffect, useState, useRef } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)
  const [trail, setTrail] = useState([])
  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  
  // Colors for the watercolor effect
  const colors = ["#e6b422", "#8b4513", "#d2691e", "#a0522d", "#cd853f"]

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
      context.globalAlpha = 0.2  
      context.globalCompositeOperation = 'source-over'
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
        context.globalAlpha = 0.2
        context.globalCompositeOperation = 'source-over'
        contextRef.current = context
      }
    }

    // Update cursor position and draw watercolor trail
    const onMouseMove = (e) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setPosition(newPosition)
      setVisible(true)

      // Add to trail with slight randomness
      setTrail(prevTrail => {
        // Only add point if there's enough distance (to avoid too many points)
        const lastPoint = prevTrail[prevTrail.length - 1]
        if (!lastPoint || Math.hypot(newPosition.x - lastPoint.x, newPosition.y - lastPoint.y) > 5) {
          // Add slight randomness to size and color
          const randomSize = Math.random() * 5 + (clicked ? 15 : 8)
          const randomColor = colors[Math.floor(Math.random() * colors.length)]
          
          // Draw watercolor splat
          if (contextRef.current) {
            contextRef.current.beginPath()
            contextRef.current.arc(
              newPosition.x, 
              newPosition.y, 
              randomSize, 
              0, 
              Math.PI * 2
            )
            contextRef.current.fillStyle = randomColor
            contextRef.current.fill()
            
            // Add some random splatters around the main drop
            for (let i = 0; i < 3; i++) {
              const splatterSize = randomSize * 0.4
              const distance = randomSize * 1.5
              const angle = Math.random() * Math.PI * 2
              const splatterX = newPosition.x + Math.cos(angle) * distance
              const splatterY = newPosition.y + Math.sin(angle) * distance
              
              contextRef.current.beginPath()
              contextRef.current.arc(splatterX, splatterY, splatterSize, 0, Math.PI * 2)
              contextRef.current.fillStyle = randomColor
              contextRef.current.fill()
            }
          }
          
          // Keep trail to reasonable size
          const newTrail = [...prevTrail, {...newPosition, size: randomSize, color: randomColor, opacity: 1}]
          if (newTrail.length > 100) newTrail.shift()
          return newTrail
        }
        return prevTrail
      })

      // Check if hovering over interactive element
      const target = e.target
      setHovered(!!target.closest("a, button, [data-cursor='pointer']"))
    }

    // Handle mouse down/up
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    // Hide cursor when leaving window
    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    // Proper fade effect for watercolor stains - fade to transparent not white
    const fadeEffect = setInterval(() => {
      if (contextRef.current && canvasRef.current) {
        // Instead of filling with white, redraw everything with decreased opacity
        const canvas = canvasRef.current
        const context = contextRef.current
        
        // Create a temporary canvas to work with
        const tempCanvas = document.createElement('canvas')
        tempCanvas.width = canvas.width
        tempCanvas.height = canvas.height
        const tempContext = tempCanvas.getContext('2d')
        
        // Copy existing canvas to temp canvas
        tempContext.drawImage(canvas, 0, 0)
        
        // Clear the main canvas
        context.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw temp canvas back with lower opacity
        context.globalAlpha = 0.97  // This controls the fade speed (0.97 = slow fade)
        context.drawImage(tempCanvas, 0, 0)
        context.globalAlpha = 0.2  // Reset to normal drawing opacity
      }
    }, 100)

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
  }, [clicked])

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

      {/* Canvas for the watercolor trail */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
      />

      {/* Cursor dot */}
      <div
        className={`fixed pointer-events-none z-[9999] mix-blend-difference transition-opacity duration-150 ${
          visible ? "opacity-100" : "opacity-0"
        }`}
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
        }}
      >
        <div
          className={`absolute bg-white rounded-full transition-transform duration-150 ${
            clicked ? "scale-75" : "scale-100"
          } ${hovered ? "scale-[2.5]" : "scale-100"}`}
          style={{
            width: "12px",
            height: "12px",
            transform: "translate(-50%, -50%)",
          }}
        ></div>
      </div>
    </>
  )
}