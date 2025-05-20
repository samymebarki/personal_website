import { Github, Linkedin, Mail } from "lucide-react"
import TornPaperEdge from "./torn-paper-edge"

export default function NewspaperFooter() {
  const currentYear = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-[#1b1b19] text-white py-12 relative">
      <TornPaperEdge position="top" />

      <div className="container mx-auto px-4">
        <div className="newspaper-grid">
          <div className="newspaper-grid-span-4">
            <h3 className="newspaper-heading text-2xl mb-4 text-white">Contact the Editor</h3>
            <p className="mb-4">For inquiries, collaborations, or just to say hello:</p>
            <p className="mb-2">hello@samymebarki.com</p>
            <p className="mb-6">Constantine, Algeria</p>

            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:bg-white hover:text-[#1b1b19] transition-colors"
                data-cursor="pointer"
              >
                <Github size={20} />
                <span className="sr-only">GitHub</span>
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 border border-white/20 hover:bg-white hover:text-[#1b1b19] transition-colors"
                data-cursor="pointer"
              >
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="mailto:hello@samymebarki.com"
                className="p-2 border border-white/20 hover:bg-white hover:text-[#1b1b19] transition-colors"
                data-cursor="pointer"
              >
                <Mail size={20} />
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          <div className="newspaper-grid-span-4">
            <h3 className="newspaper-heading text-2xl mb-4 text-white">Subscribe</h3>
            <p className="mb-4">Stay updated with the latest projects and insights:</p>
            <div className="flex border-b border-white/30 pb-2 mb-6">
              <input
                type="email"
                placeholder="Your email"
                className="bg-transparent py-2 px-0 text-sm focus:outline-none flex-grow"
              />
              <button
                className="ml-2 px-4 py-2 bg-white text-[#1b1b19] text-sm uppercase tracking-wider"
                data-cursor="pointer"
              >
                Subscribe
              </button>
            </div>
            <p className="text-sm opacity-70">
              By subscribing, you agree to receive occasional updates about new projects and articles.
            </p>
          </div>

          <div className="newspaper-grid-span-4">
            <h3 className="newspaper-heading text-2xl mb-4 text-white">Colophon</h3>
            <p className="mb-2">This digital journal is set in Playfair Display and EB Garamond.</p>
            <p className="mb-4">Built with Next.js, Tailwind CSS, and a passion for typography and design.</p>
            <p className="text-sm opacity-70">© {currentYear} Samy Mebarki. All rights reserved.</p>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/20 text-center">
          <p className="text-sm opacity-70">
            "The intersection of technology and creativity is where innovation thrives."
          </p>
        </div>
      </div>
    </footer>
  )
}
