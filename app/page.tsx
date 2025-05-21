"use client"

import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { useEffect, useState } from 'react'
import { Clock, Newspaper, PenTool, User } from 'lucide-react'
import Image from "next/image"
import PaperTexture from "@/components/paper-texture"
import NewsTicker from "@/components/news-ticker"
import RoughPaperOverlay from "@/components/rough-paper-overlay"
import AnimatedCursor from "@/components/AnimatedCursor"

export default function Home() {
  const [date, setDate] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    // Set current date in newspaper format
    const options = { year: 'numeric', month: 'long', day: 'numeric' } as const;
    setDate(new Date().toLocaleDateString('en-US', options));
    
    // Trigger fade-in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);
  const projects = [
    {
      id: 1,
      title: "AVRO/KO",
      description: "Award-winning design firm's digital presence showcasing interior architecture projects.",
      year: "2023",
      category: "Branding",
      image: "/images/avro-ko.jpg"
    },
    {
      id: 2,
      title: "THE ROGER HUB",
      description: "Immersive web experience for tennis-inspired sneakers in collaboration with Roger Federer.",
      year: "2023",
      category: "Web Design",
      image: "/images/roger-hub.jpg"
    },
    {
      id: 3,
      title: "LUMINA",
      description: "Digital platform reimagining light interaction in architectural spaces with IoT technology.",
      year: "2022",
      category: "Digital Exp",
      image: "/images/lumina.jpg"
    },
    {
      id: 4,
      title: "TERRA FORMA",
      description: "Generative AI art project visualizing environmental data through immersive landscapes.",
      year: "2023",
      category: "AI Art",
      image: "/images/terra-forma.jpg"
    },
    {
      id: 5,
      title: "NEURO HARMONY",
      description: "Brain-computer interface for music creation using neural signals.",
      year: "2023",
      category: "AI/ML",
      image: "/images/neuro-harmony.jpg"
    },
    {
      id: 6,
      title: "CHRONO VORTEX",
      description: "Interactive timeline visualization tool for exploring historical events.",
      year: "2022",
      category: "Web App",
      image: "/images/chrono-vortex.jpg"
    }
  ]

  const newsItems = [
    "JavaScript tried to outsmart Samy. JavaScript lost.",
    "Scientists stunned: Samy codes and designs? At the same time?!",
    "24 years of awesome, says totally unbiased portfolio ticker.",
    "Samy trained an AI model to fetch coffee. It brings art instead.",
    "Portfolio so smooth, even your scroll wheel's impressed.",
    "Samy once refactored spaghetti code. It came out as lasagna.",
    "Samy doesn’t debug. The code apologizes and fixes itself.",
    "Fun fact: Samy’s CSS never breaks. It just takes strategic naps.",
    "Samy doesn’t write documentation. His code explains itself in prose.",
    "Samy whispered to an API once. It gave 200 OK forever after.",
    "His components are so reusable, IKEA took notes."

  ]

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('fade-in');
        }
      });
    }, {
      threshold: 0.1
    });

    document.querySelectorAll('.article, .headline, .byline, .newspaper-column p').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-[#f8e1c2] relative font-serif text-[#503822] overflow-x-hidden cursor-none">
      <AnimatedCursor />
      {/* News Ticker - At the very top */}
      <div className="relative z-30 w-full bg-[#503822] text-[#f8e1c2] py-1 overflow-hidden">
        <NewsTicker items={newsItems} speed={70} />
      </div>
      
      {/* Paper Texture Overlay */}
      <div className="fixed inset-0 bg-[#f8e1c2] pointer-events-none">
        <PaperTexture />
      </div>
      
      <div className={`relative z-10 w-[95%]  mx-auto px-4 py-8 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <RoughPaperOverlay />
        
        {/* Newspaper Header */}
        <header className="text-center border-b-2 border-[#503822] mb-8 pb-4 newspaper-fold">
          {/*<div className="text-xs uppercase tracking-widest mb-1 text-[#1a1a1a] font-bold ">The Daily Portfolio</div>*/}
          <h1 className="text-9xl md:text-9xl lg:text-9xl leading-none my-6 font-['Chomsky'] text-[#503822] hover:scale-105 transition-transform duration-500">
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">S</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">a</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">m</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">y</span>
            <span className="mx-4"></span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">M</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">e</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">b</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">a</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">r</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">k</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">i</span>
          </h1>
          <div className="flex justify-between items-center text-xs border-t border-b border-[#503822] py-2 text-[#503822] ">
            <span className="flex items-center"> May 20, 2025</span>
            <span className="hidden md:inline-block">VOL. 1, NO. 1 •</span>
            <span className="flex items-center"><PenTool className="w-3 h-3 mr-1" /> DESIGN • CODE • ART</span>
          </div>
        </header>
        
        {/* Main Headline Section */}
        <div className="grid grid-cols-12 gap-4 mb-6 w-full">
          <div className="col-span-8 border-r border-[#503822] pr-4">
            <h2 className="text-6xl font-bold leading-tight mb-3 text-[#503822]">CREATIVE DEVELOPER UNVEILS STUNNING PORTFOLIO</h2>
            <div className="flex items-center text-sm text-[#503822] mb-4">
              <User className="h-4 w-4 mr-1" />
              <span className="mr-4">By Samy Mebarki</span>
              <Clock className="h-4 w-4 ml-4 mr-1" />
              <span>5 min read</span>
            </div>
            <div className="grid grid-cols-2 gap-8 text-justify text-[#503822] leading-relaxed mb-8">
              <div className="space-y-4">
                <p className="relative">
                  <span className="float-left text-6xl font-bold leading-[0.8] mr-2 text-[#503822] -ml-3 relative top-1 h-[1.5em] overflow-hidden">I</span>
                  n an era where digital presence defines professional identity, one developer's portfolio stands out from the crowd. Samy Mebarki, a creative technologist with a passion for design and code, has launched a portfolio that blurs the line between digital art and professional showcase. The interactive experience guides visitors through a carefully curated selection of projects, each telling its own story of technical challenge and creative solution.
                </p>
                <p>
                  The interactive experience guides visitors through a carefully curated selection of projects, each telling its own story of technical challenge and creative solution. From responsive web applications to immersive digital experiences, the portfolio demonstrates a keen eye for detail and a commitment to excellence.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  The design language speaks of both innovation and tradition, creating a unique space where technology meets aesthetics in perfect harmony. Visitors to the portfolio are greeted with an interface that feels both familiar and groundbreaking.
                </p>
                <p>
                  The navigation is intuitive yet sophisticated, allowing for a seamless journey through Mebarki's professional evolution and creative process. Each section reveals new layers of technical expertise and creative vision, inviting deeper exploration.
                </p>
              </div>
            </div>
            
            {/* Projects Section */}
            <section className="mb-16 article">
              <h2 className="text-9xl font-bold mb-1 border-b-2 border-[#503822] pb-2 w-full headline">
                <span className="bg-[#503822] text-[#efe0b4] px-4 py-1 block w-fit">LAST PROJECTS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {projects.map((project, index) => (
                  <article 
                    key={project.id} 
                    className={`relative  p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 article ink-drop`}
                    style={{
                      '--animation-delay': `${index * 100}ms`,
                      opacity: 0,
                      animation: 'fadeIn 0.8s ease-out forwards',
                      animationDelay: `${index * 100}ms`
                    } as React.CSSProperties}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#503822] to-[#503822]"></div>
                    <div className="relative h-64 mb-6 overflow-hidden group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                    </div>
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-2xl font-bold font-['OldNewspaper'] text-[#1a1a1a] hover:text-[#503822] transition-colors">
                        {project.title}
                      </h3>
                      <span className="bg-[#f0e6d2] text-[#503822] text-xs px-2 py-1 font-mono">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-[#333] mb-4 leading-relaxed">{project.description}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="inline-block bg-[#f0e6d2] text-[#503822] px-3 py-1 rounded-full font-medium">
                        {project.category}
                      </span>
                      <button 
                        className="flex items-center text-[#503822] hover:text-[#1a1a1a] transition-colors"
                        aria-label={`View ${project.title} project`}
                      >
                        <span className="mr-1">Read more</span>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                      </button>
                    </div>
                    <div className="absolute bottom-2 right-2 text-[#8b0000] text-6xl font-['OldNewspaper'] opacity-5 pointer-events-none">
                      {String(project.id).padStart(2, '0')}
                    </div>
                  </article>
                ))}
              </div>
            </section>
          </div>
          <div className="col-span-4 pl-4 relative">
            {/* Signature */}
            <div className="absolute bottom-4 right-4 text-3xl text-[#503822] opacity-90" style={{ fontFamily: 'var(--font-allura)' }}>
              Samy Mebarki
            </div>
            <div className="border border-[#503822] p-4 mb-4">
              <h3 className="font-bold text-lg border-b border-[#503822] pb-1 mb-3">ABOUT THE DEVELOPER</h3>
              <div className="aspect-square w-full mb-3 overflow-hidden">
                <img 
                  src="/images/me.png"
                  alt="Samy Mebarki"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-sm mb-3 text-[#503822]">With a background in both design and development, Samy brings a unique perspective to every project. His approach combines technical expertise with creative problem-solving.</p>
              
              <h4 className="font-bold text-sm mb-3 text-[#503822]">TECHNICAL SKILLS</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <ul className="text-xs space-y-1 text-[#503822]">
                  <li>• React & Next.js / Vue.js</li>
                  <li>• TypeScript & JavaScript</li>
                  <li>• UI/UX Design</li>
                  <li>• Responsive Web Development</li>
                </ul>
                <ul className="text-xs space-y-1 text-[#503822]">
                  <li>• Django / NodeJS Backend</li>
                  <li>• Python / SQL</li>
                  <li>• MySQL / PostgreSQL</li>
                  <li>• Supabase / Convex / Clerk</li>
                </ul>
                <ul className="text-xs space-y-1 text-[#503822]">
                  <li>• AI Development</li>
                  <li>• ML / Deep Learning</li>
                  <li>• Data Science / Analysis</li>
                  <li>• Pandas / Numpy / Matplotlib</li>
                </ul>
                <ul className="text-xs space-y-1 text-[#503822]">
                  <li>• Adobe Illustrator</li>
                  <li>• Photoshop / Figma</li>
                  <li>• Graphic Design</li>
                  <li>• Branding Materials</li>
                </ul>
              </div>
              
              <div className="border-t border-[#503822] pt-3">
                <h4 className="font-bold text-sm mb-2 text-[#503822]">CONTACT</h4>
                <p className="text-xs text-[#503822] mb-2">Location : Constantine, Algeria</p>
                <p className="text-xs text-[#503822] mb-2">Website : samymebarki.dev</p>
                <div className="flex space-x-4 mt-3">
                  <a href="https://github.com/samymebarki" target="_blank" rel="noopener noreferrer" className="text-[#503822] hover:opacity-75 transition-opacity">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.699 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                    </svg>
                  </a>
                  <a href="https://www.linkedin.com/in/samymebarki/" target="_blank" rel="noopener noreferrer" className="text-[#503822] hover:opacity-75 transition-opacity">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.139.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a href="mailto:samymebarki8@gmail.com" className="text-[#503822] hover:opacity-75 transition-opacity">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 010 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border border-[#503822] p-4 bg-[#503822] text-[#f8e1c2] mb-4">
              <h3 className="font-bold text-lg border-b border-[#f8e1c2] pb-1 mb-3">HOBBIES & INTERESTS</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Photography</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Building Things</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Reading</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Traveling</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Chess</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Puzzles</span>
                </div>
              </div>
              <h3 className="font-bold text-lg border-b border-[#f8e1c2] pb-1 mb-3">FUTURE SKILLS TO LEARN/MASTER</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>3D Modeling</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Game Developement</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>C++</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Website No Code Builders</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Web Security</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>More Chess</span>
                </div>
              </div>
              <h3 className="font-bold text-lg border-b border-[#f8e1c2] pb-1 mb-3 ">PROFESSIONAL CERTIFICATES</h3>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  
                  <span>EF SET English Certificate - 77/100 Score (C2 - Proficient)</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>IBM Applied Data Science Specialization</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>365 Data Sience - Data Analyst</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>IBM Data Science</span>
                </div>
              </div>
            </div>
            <div className="border border-[#503822] p-4 mb-4">
              <h3 className="font-bold text-lg border-b border-[#503822] pb-1 mb-3">CONTACT ME</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="contact-name" className="block text-sm mb-1 text-[#503822]">Name</label>
                    <input
                      type="text"
                      id="contact-name"
                      className="w-full px-3 py-2 bg-transparent border-b border-[#503822] text-[#503822] focus:outline-none focus:border-[#503822] placeholder-[#503822]/70"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-email" className="block text-sm mb-1 text-[#503822]">Email</label>
                    <input
                      type="email"
                      id="contact-email"
                      className="w-full px-3 py-2 bg-transparent border-b border-[#503822] text-[#503822] focus:outline-none focus:border-[#503822] placeholder-[#503822]/70"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="block text-sm mb-1 text-[#503822]">Message</label>
                    <textarea
                      id="contact-message"
                      rows={3}
                      className="w-full px-3 py-2 bg-transparent border-b border-[#503822] text-[#503822] focus:outline-none focus:border-[#503822] placeholder-[#503822]/70"
                      placeholder="Your message..."
                      required
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2 border border-[#503822] bg-[#503822] text-[#f8e1c2] font-medium hover:bg-transparent hover:text-[#503822] hover:border-[#503822] transition-colors duration-200"
                  >
                    Send Message
                  </button>
                </form>
              </div>
          </div>
        </div>
        {/* Footer */}
        <footer className="border-t-2 border-[#503822] mt-8 pt-4 text-center text-xs w-full text-[#503822]">
          <div className="mb-2">Samy Mebarki </div>
          <div className="mt-2"> May 20, 2025</div>
        </footer>
      </div>
    </div>
  );
}
