// Register GSAP plugins
let gsap: any
let ScrollTrigger: any

if (typeof window !== "undefined") {
  // Check if gsap is available
  if (window.gsap) {
    gsap = window.gsap
    ScrollTrigger = window.ScrollTrigger
    gsap.registerPlugin(ScrollTrigger)
  }
}

export { gsap, ScrollTrigger }
