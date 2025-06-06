import type React from "react"
import type { Metadata } from "next"
import { EB_Garamond, Playfair_Display, Allura, Silkscreen, Space_Mono } from "next/font/google"
import "./globals.css"
import "./animations.css"
import "./theme.css"
import "./futuristic-bg.css"
import "./futuristic-headers.css"
import "./futuristic-forms.css"
import "./agrozza-font.css"
import "./chomsky-font.css"
import "./enhanced-theme.css"
import "./new-futuristic.css"
import "./futuristic-profile.css"
import CustomCursor from "@/components/AnimatedCursor"
import HamburgerMenu from "@/components/HamburgerMenu"
import ThemedFavicon from "@/components/ThemedFavicon"
import ThemedImage from "@/components/ThemedImage"
import { MenuProvider } from '@/context/MenuContext'
import { ThemeProvider } from '@/context/ThemeContext'
import ThemeToggle from '@/components/ThemeToggle'
import AnimationManagerWrapper from '@/components/AnimationManagerWrapper'
import LoadingAnimationWrapper from '@/components/LoadingAnimationWrapper'
import CustomScrollbar from '@/components/CustomScrollbar'
import NewFuturisticEffects from '@/components/NewFuturisticEffects'

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

const allura = Allura({
  weight: '400',
  subsets: ["latin"],
  variable: "--font-allura",
  display: "swap",
})

const silkscreen = Silkscreen({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-silkscreen",
  display: "swap",
})

const spaceMono = Space_Mono({
  weight: ['400', '700'],
  subsets: ["latin"],
  variable: "--font-space-mono",
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
        {/* Favicon */}
        <link rel="icon" href="/images/logo.png" type="image/png" sizes="any" />
        <link rel="apple-touch-icon" href="/images/logo.png" />
        
        {/* Include the GSAP scripts with async attribute */}
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js" async></script>
        <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/ScrollTrigger.min.js" async></script>
      </head>
      <body
        className={`${ebGaramond.variable} ${playfair.variable} ${allura.variable} ${silkscreen.variable} ${spaceMono.variable} bg-custom-background paper-fold paper-fold-left`}
      >
        <ThemeProvider>
          <MenuProvider>
            <LoadingAnimationWrapper />
            <CustomCursor />
            <CustomScrollbar />
            <NewFuturisticEffects />
            <ThemedFavicon />
            
            {/* Unified header elements container that fades on scroll */}
            <div className="header-elements fade-on-scroll">
              {/* Logo in top left */}
              <div className="sm:hidden fixed top-[70px] left-8 z-50">
                <ThemedImage
                defaultSrc="/images/logo.png"
                futuristicSrc="/images/logo-futuristic.png"
                alt="Logo"
                width={40}
                height={40}
                className="no-futuristic-border"
                />
              </div>
              
              {/* Menu button in top right */}
              <div className="hidden md:block fixed top-10 right-8 z-50">
                <HamburgerMenu />
              </div>
              
              {/* Theme toggle - positioned below news ticker and centered on mobile, top right on desktop */}
              <div className="fixed sm:hidden top-12 left-1/2 -translate-x-1/2 z-50">
                <ThemeToggle />
              </div>
              
              {/* Theme toggle - desktop position */}
              <div className="hidden sm:block fixed top-[70px] right-8 z-50">
                <ThemeToggle />
              </div>
            </div>
            {children}
            <AnimationManagerWrapper />
          </MenuProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
