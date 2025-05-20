"use client"

import { useEffect, useRef } from "react"

interface InkLetterProps {
  letter: string
  delay: number
  className?: string
}

export default function InkLetter({ letter, delay, className = "" }: InkLetterProps) {
  const letterRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      if (letterRef.current) {
        letterRef.current.classList.add("animate")
      }
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  return (
    <span ref={letterRef} className={`ink-fill ${className}`}>
      {letter}
    </span>
  )
}
