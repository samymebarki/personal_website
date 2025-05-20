"use client"

import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  // Only run on client
  useEffect(() => {
    // Skip on mobile/tablet
    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      return
    }

    // Update cursor position
    const onMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setVisible(true)

      // Check if hovering over interactive element
      const target = e.target as HTMLElement
      setHovered(!!target.closest("a, button, [data-cursor='pointer']"))
    }

    // Handle mouse down/up
    const onMouseDown = () => setClicked(true)
    const onMouseUp = () => setClicked(false)

    // Hide cursor when leaving window
    const onMouseLeave = () => setVisible(false)
    const onMouseEnter = () => setVisible(true)

    // Add event listeners
    document.addEventListener("mousemove", onMouseMove)
    document.addEventListener("mousedown", onMouseDown)
    document.addEventListener("mouseup", onMouseUp)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

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
    }
  }, [])

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
