"use client"

import { useState } from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import TornPaperEdge from "./torn-paper-edge"

export default function NewspaperNavigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    console.log("Toggle menu clicked, current state:", isMenuOpen)
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const menuItems = [
    { href: "#", label: "Home" },
    { href: "#about", label: "About" },
    { href: "#projects", label: "Projects" },
    { href: "#skills", label: "Skills" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <>
      {/* Menu Button */}
      <button
        onClick={toggleMenu}
        className="fixed top-6 right-6 z-[60] p-2 bg-sepia-900 text-sepia-100 shadow-md hover:bg-sepia-800 transition-colors"
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        aria-expanded={isMenuOpen}
      >
        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        <span className="sr-only">{isMenuOpen ? "Close menu" : "Open menu"}</span>
      </button>

      {/* Menu Overlay - using CSS transitions instead of GSAP */}
      <div
        className={`fixed inset-0 bg-sepia-100 text-sepia-900 z-50 transition-transform duration-500 ease-in-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Torn paper edge */}
        <div className="absolute inset-y-0 left-0">
          <TornPaperEdge position="left" className="h-full" />
        </div>

        <div className="relative h-full p-8 pt-20">
          <div className="flex flex-col gap-8 mt-8">
            {menuItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="text-4xl font-bold border-b border-sepia-300 pb-2 hover:pl-4 transition-all duration-300 newspaper-heading"
                onClick={closeMenu}
              >
                {item.label}
              </Link>
            ))}

            {/* Newspaper clipping effect */}
            <div className="mt-8 p-6 bg-sepia-200 rotate-2 shadow-md">
              <div className="text-sm uppercase tracking-wider mb-2 newspaper-date">Latest Update</div>
              <p className="font-medium">Portfolio redesigned with newspaper aesthetic</p>
              <p className="text-sm mt-2 opacity-70">May 2023</p>
            </div>
          </div>

          <div className="absolute bottom-8 left-8">
            <p className="text-sm opacity-70">© 2025 Samy Mebarki. All rights reserved.</p>
          </div>
        </div>
      </div>
    </>
  )
}
