"use client"

import { useEffect, useState, useRef } from "react"
import { cn } from "@/lib/utils"
import PaperTexture from "@/components/paper-texture"
import RoughPaperOverlay from "@/components/rough-paper-overlay"
import AboutSection from "@/components/about-section"
import NewspaperHeader from "@/components/newspaper-header"
import NewspaperNavigation from "@/components/newspaper-navigation"
import ProjectsSection from "@/components/projects-section"
import SkillsSection from "@/components/skills-section"
import NewspaperFooter from "@/components/newspaper-footer"
import NewsTicker from "@/components/news-ticker"
import CoffeeStain from "@/components/coffee-stain"
import PaginationControls from "@/components/pagination-controls"
import NewspaperPrintingAnimation from "@/components/newspaper-printing-animation"

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isAnimationComplete, setIsAnimationComplete] = useState(false)
  const loadingRef = useRef<HTMLDivElement>(null)

  // Initialize animations after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const handleAnimationComplete = () => {
    setIsAnimationComplete(true)
  }

  const projects = [
    {
      id: 1,
      title: "AVRO/KO",
      description:
        "AVRO/KO is an award-winning global design firm, established itself as a global leader in interior architecture for hospitality, restaurant and bars. The project involved creating a digital presence that reflected the firm's sophisticated aesthetic while showcasing their portfolio in an immersive way.",
      image: "/placeholder.svg?height=400&width=600",
      isNew: true,
      year: "2023",
      category: "Branding",
    },
    {
      id: 2,
      title: "THE ROGER HUB",
      description:
        "The Roger Hub is an immersive web experience showcasing the tennis-inspired 'On' sneakers, a collaboration born out of a partnership with the legendary Roger Federer. This project required a delicate balance between performance storytelling and product showcase.",
      image: "/placeholder.svg?height=400&width=600",
      isNew: true,
      year: "2023",
      category: "Web Design",
    },
    {
      id: 3,
      title: "LUMINA",
      description:
        "Lumina is a digital platform that reimagines how we interact with light in architectural spaces, creating dynamic environments that respond to human presence. The project explores the intersection of IoT technology and spatial design.",
      image: "/placeholder.svg?height=400&width=600",
      isNew: false,
      year: "2022",
      category: "Digital Experience",
    },
    {
      id: 4,
      title: "TERRA FORMA",
      description:
        "Terra Forma explores the intersection of digital art and environmental awareness, creating immersive landscapes that evolve based on real-world climate data. This project uses generative AI to create unique visualizations.",
      image: "/placeholder.svg?height=400&width=600",
      isNew: true,
      year: "2023",
      category: "Interactive Design",
    },
  ]

  // News ticker items
  const newsItems = [
    "JavaScript tried to outsmart Samy. JavaScript lost.",
    "Scientists stunned: Samy codes and designs? At the same time?!",
    "“24 years of awesome,” says totally unbiased portfolio ticker.",
    "Samy trained an AI model to fetch coffee. It brings art instead.",
    "Portfolio so smooth, even your scroll wheel’s impressed.",
  ]

  return (
    <>
      <PaperTexture />
      <RoughPaperOverlay />

      {/* Loading Animation */}
      <div
        ref={loadingRef}
        className={cn(
          "fixed inset-0 bg-sepia-100 z-50 flex items-center justify-center transition-opacity duration-1000",
          isAnimationComplete ? "opacity-0 pointer-events-none" : "opacity-100",
        )}
      >
        <div className="w-full max-w-4xl mx-auto px-4">
          <NewspaperPrintingAnimation
            name="Samy Mebarki"
            subtitle="Software Engineer & Graphic Designer"
            delay={800}
            onComplete={handleAnimationComplete}
          />
        </div>
      </div>

      <div className="min-h-screen bg-paper relative">
        {/* Coffee stains */}
        <CoffeeStain position="top-right" size="medium" rotation={15} />
        <CoffeeStain position="bottom-left" size="large" opacity={0.1} rotation={-10} />

        <NewspaperNavigation />

        {/* News ticker */}
        <NewsTicker items={newsItems} speed={25} />

        <NewspaperHeader />

        <main>
          {/* Hero Section */}
          <section id="hero" className="py-12 md:py-16 border-b border-sepia-300">
            <div className="container mx-auto px-4">
              <div className="newspaper-grid">
                <div className="newspaper-grid-span-8">
                  <h2 className="newspaper-heading text-5xl md:text-7xl mb-6">
                    Crafting Digital Experiences at the Intersection of Code and Design
                  </h2>
                  <div className="newspaper-column">
                    <p className="newspaper-dropcap mb-4">
                      In the rapidly evolving landscape of digital creation, the boundaries between disciplines continue
                      to blur. As a software engineer with expertise in artificial intelligence and a passion for
                      graphic design, I navigate this intersection to create experiences that are both technically
                      robust and aesthetically compelling.
                    </p>
                    <p>
                      This digital journal serves as a chronicle of my work and thoughts on technology, design, and the
                      creative process. Through case studies, technical insights, and reflections on the industry, I
                      hope to contribute to the ongoing conversation about how we can harness technology to create more
                      meaningful and human-centered digital experiences.
                    </p>
                  </div>
                </div>
                <div className="newspaper-grid-span-4">
                  <div className="border border-sepia-300 p-6 bg-sepia-50">
                    <h3 className="newspaper-subheading text-xl mb-4">Latest Updates</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="newspaper-date mb-1">MAY 15, 2023</div>
                        <p className="font-medium">Launched new portfolio website with newspaper-inspired design</p>
                      </div>
                      <div>
                        <div className="newspaper-date mb-1">APRIL 28, 2023</div>
                        <p className="font-medium">Completed AI-powered image generation project for client</p>
                      </div>
                      <div>
                        <div className="newspaper-date mb-1">MARCH 12, 2023</div>
                        <p className="font-medium">Published research paper on neural network optimization</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div id="about">
            <AboutSection />
          </div>

          <div id="projects">
            <ProjectsSection projects={projects} />
          </div>

          <div id="skills">
            <SkillsSection />
          </div>

          {/* Quote Section */}
          <section className="py-16 md:py-24 border-t border-b border-sepia-300">
            <div className="container mx-auto px-4 text-center">
              <blockquote className="text-3xl md:text-4xl lg:text-5xl max-w-4xl mx-auto newspaper-heading">
                "The best design is invisible. The best code is simple. The best experience is seamless."
              </blockquote>
              <div className="mt-6 text-lg">— Samy Mebarki</div>
            </div>
          </section>

          {/* Pagination controls */}
          <PaginationControls />
        </main>

        <NewspaperFooter />
      </div>
    </>
  )
}
