"use client"

import { useEffect, useRef, useState } from "react"

export default function PaperTexture() {
  const [isLoaded, setIsLoaded] = useState(false)
  const textureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (textureRef.current) {
      setIsLoaded(true)
    }
  }, [])

  return (
    <div 
      ref={textureRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0 overflow-hidden"
      style={{
        backgroundImage: 'url("/images/texture1.jpg")',
        backgroundSize: '100% 100%',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat',
        backgroundAttachment: 'fixed',
        opacity: isLoaded ? 0.6 : 0,
        transition: 'opacity 0.5s ease-in-out',
        transform: 'translateZ(0)', // Force hardware acceleration
      }}
      aria-hidden="true"
    />
  )
}
