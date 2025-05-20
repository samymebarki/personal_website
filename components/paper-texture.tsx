"use client"

import { useEffect, useRef } from "react"

export default function PaperTexture() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const updateCanvasSize = () => {
      // Get window dimensions
      const width = window.innerWidth
      const height = window.innerHeight

      // Set canvas dimensions
      canvas.width = width
      canvas.height = height

      // Only draw if dimensions are valid
      if (width > 0 && height > 0) {
        drawPaperTexture(ctx, width, height)
      }
    }

    // Draw paper texture
    const drawPaperTexture = (context: CanvasRenderingContext2D, width: number, height: number) => {
      // Validate dimensions before proceeding
      if (width <= 0 || height <= 0) return

      // Clear canvas
      context.clearRect(0, 0, width, height)

      // Base color - slightly off-white with a hint of beige
      context.fillStyle = "#d8d0c0"
      context.fillRect(0, 0, width, height)

      // Add base texture - small dots
      for (let i = 0; i < width * height * 0.15; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() * 1.5
        const opacity = Math.random() * 0.12

        context.fillStyle = `rgba(0, 0, 0, ${opacity})`
        context.beginPath()
        context.arc(x, y, size, 0, Math.PI * 2)
        context.fill()
      }

      // Add fiber-like lines
      for (let i = 0; i < 1000; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const length = Math.random() * 15 + 5
        const angle = Math.random() * Math.PI * 2
        const opacity = Math.random() * 0.07

        context.strokeStyle = `rgba(0, 0, 0, ${opacity})`
        context.lineWidth = Math.random() * 0.5 + 0.1
        context.beginPath()
        context.moveTo(x, y)
        context.lineTo(x + Math.cos(angle) * length, y + Math.sin(angle) * length)
        context.stroke()
      }

      // Add some larger imperfections
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const size = Math.random() * 5 + 2
        const opacity = Math.random() * 0.03

        context.fillStyle = `rgba(0, 0, 0, ${opacity})`
        context.beginPath()
        context.arc(x, y, size, 0, Math.PI * 2)
        context.fill()
      }

      // Add subtle color variations for paper fibers
      for (let i = 0; i < 200; i++) {
        const x = Math.random() * width
        const y = Math.random() * height
        const fiberWidth = Math.random() * 30 + 10
        const fiberHeight = Math.random() * 2 + 1
        const angle = Math.random() * Math.PI

        // Randomly choose between slightly darker and slightly lighter fibers
        const colorVariation =
          Math.random() > 0.5
            ? `rgba(160, 150, 130, ${Math.random() * 0.05 + 0.02})`
            : `rgba(230, 225, 215, ${Math.random() * 0.05 + 0.02})`

        context.save()
        context.translate(x, y)
        context.rotate(angle)
        context.fillStyle = colorVariation
        context.fillRect(-fiberWidth / 2, -fiberHeight / 2, fiberWidth, fiberHeight)
        context.restore()
      }

      // Add subtle grain - with safety check for dimensions
      try {
        if (width > 0 && height > 0) {
          const imageData = context.getImageData(0, 0, width, height)
          const data = imageData.data
          for (let i = 0; i < data.length; i += 4) {
            const grainAmount = Math.random() * 12 - 6
            data[i] = Math.min(255, Math.max(0, data[i] + grainAmount))
            data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + grainAmount))
            data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + grainAmount))
          }
          context.putImageData(imageData, 0, 0)
        }
      } catch (err) {
        console.error("Error applying grain effect:", err)
        // Continue without the grain effect if there's an error
      }
    }

    // Initial size update
    updateCanvasSize()

    // Add a small delay to ensure the canvas is properly mounted
    const initialRenderTimer = setTimeout(() => {
      updateCanvasSize()
    }, 100)

    // Add resize listener
    window.addEventListener("resize", updateCanvasSize)

    return () => {
      window.removeEventListener("resize", updateCanvasSize)
      clearTimeout(initialRenderTimer)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-[-1] opacity-60"
      aria-hidden="true"
    />
  )
}
