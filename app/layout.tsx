import type React from "react"
import type { Metadata } from "next"
import { EB_Garamond, Playfair_Display } from "next/font/google"
import "./globals.css"
import CustomCursor from "@/components/custom-cursor"

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-eb-garamond",
  display: "swap",
})

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Samy Mebarki | Digital Journal",
  description: "Software Engineer & Graphic Designer",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Include the GSAP scripts with async attribute */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" async></script>
      </head>
      <body
        className={`${ebGaramond.className} ${playfair.variable} ${ebGaramond.variable} bg-custom-background paper-fold paper-fold-left`}
      >
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
