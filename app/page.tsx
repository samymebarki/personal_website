'use client';

import { format } from 'date-fns'
import dynamic from 'next/dynamic'
import { useState, useEffect, useRef } from 'react';
import { Clock, Newspaper, PenTool, User, Award, Book, Heart, Calendar, Users, Layout, Briefcase, GraduationCap, MessageCircle } from 'lucide-react'
import Image from "next/image"
import { motion } from 'framer-motion';
import PaperTexture from "@/components/paper-texture"
import NewsTicker from "@/components/news-ticker"
import RoughPaperOverlay from "@/components/rough-paper-overlay"
import AnimatedCursor from "@/components/AnimatedCursor"
import CoffeeStain from "@/components/coffee-stain";
import PullQuote from "@/components/PullQuote";

// Custom hook for typewriter effect
function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  
  useEffect(() => {
    if (!isTyping) return;
    
    if (displayText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(text.substring(0, displayText.length + 1));
      }, speed);
      
      return () => clearTimeout(timeout);
    } else {
      setIsTyping(false);
    }
  }, [displayText, text, speed, isTyping]);
  
  return { displayText, isTyping };
}

export default function Home() {
  const [date, setDate] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('experience')
  const [hasScrolled, setHasScrolled] = useState(false)
  
  // Typewriter effects for headings
  const mainHeading = useTypewriter("DEVELOPER ARRESTED FOR MASTERING MULTIPLE SKILLS", 70)
  
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
    "Samy doesn't debug. The code apologizes and fixes itself.",
    "Fun fact: Samy's CSS never breaks. It just takes strategic naps.",
    "Samy doesn't write documentation. His code explains itself in prose.",
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

  const [showHeaderElements, setShowHeaderElements] = useState(true);
  
  // Handle scroll behavior for header elements
  useEffect(() => {
    const handleScroll = () => {
      setShowHeaderElements(window.scrollY < 100);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
            <div className="relative group headline-container">
              <style jsx>{`
                .circling-path {
                  opacity: 0;
                  stroke-dasharray: 1500;
                  stroke-dashoffset: 1500;
                  transition: opacity 0.3s ease;
                }
                
                .headline-container:hover .circling-path {
                  opacity: 1;
                  animation: drawCircle 1.5s ease-in-out forwards;
                }
                
                .second-circle {
                  animation-delay: 0.3s;
                }
                
                .typewriter-cursor {
                  display: inline-block;
                  width: 2px;
                  height: 1em;
                  background-color: #503822;
                  margin-left: 2px;
                  animation: blink 1s step-end infinite;
                }
                
                @keyframes blink {
                  from, to { opacity: 1; }
                  50% { opacity: 0; }
                }
              `}</style>
              <h2 
                className="text-6xl font-bold leading-tight mb-3 text-[#503822] relative z-10"
              >
                {mainHeading.displayText}
                {mainHeading.isTyping && <span className="typewriter-cursor"></span>}
              </h2>
              <div className="absolute -inset-8 pointer-events-none z-0">
                <svg className="w-full h-full" viewBox="0 0 800 150" preserveAspectRatio="none">
                  <path 
                    className="circling-path" 
                    d="M10,75 C10,20 790,20 790,75 C790,130 10,130 10,75 Z" 
                    fill="none" 
                    stroke="#503822" 
                    strokeWidth="1.5" 
                    strokeOpacity="0.7"
                    strokeLinecap="round"
                  />
                  <path 
                    className="circling-path second-circle" 
                    d="M5,85 C5,15 795,15 795,85 C795,145 5,145 5,85 Z" 
                    fill="none" 
                    stroke="#503822" 
                    strokeWidth="1" 
                    strokeOpacity="0.5"
                    strokeDasharray="6,6" 
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
            
            
            
            <div className="flex items-center text-sm text-[#503822] mb-4" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '800ms' }}>
              <User className="h-4 w-4 mr-1" />
              <span className="mr-4">By Samy Mebarki</span>
              <Clock className="h-4 w-4 ml-4 mr-1" />
              <span>5 min read</span>
            </div>
            <PullQuote 
                quote="Design is not just what it looks like and feels like. Design is how it works."
                author="Steve Jobs"
              />
            <div className="text-justify text-[#503822] leading-relaxed mb-8">
              <div className="mb-6">
                <p className="relative drop-cap">
                  <span className="float-left text-6xl font-bold leading-[0.8] mr-2 text-[#503822] -ml-3 relative top-1 h-[1.5em] overflow-hidden">S</span>
                  hocking arrest made yesterday as authorities apprehended Samy Mebarki on multiple counts of possessing exceptional talent across design and development disciplines. Mebarki, operating for over 8 years, has been charged with excessive creativity, unlawful problem-solving abilities, and conspiracy to blend artistry with technical execution. "He's been creating outstanding digital experiences without regard for conventional limitations," stated one investigator. Evidence includes dozens of web applications that show clear signs of both aesthetic mastery and technical proficiency—a dangerous combination that has left clients extremely satisfied.
                </p>
                {/* Statistics Section */}
            <div className="grid grid-cols-3 gap-4 mb-6 mt-8">
              <div className="border border-[#503822] p-4 text-center">
                <div className="text-4xl font-bold text-[#503822] mb-2">8+</div>
                <div className="text-sm text-[#503822] flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Years Experience</span>
                </div>
              </div>
              <div className="border border-[#503822] p-4 text-center">
                <div className="text-4xl font-bold text-[#503822] mb-2">75+</div>
                <div className="text-sm text-[#503822] flex items-center justify-center">
                  <Layout className="w-4 h-4 mr-1" />
                  <span>Projects Completed</span>
                </div>
              </div>
              <div className="border border-[#503822] p-4 text-center">
                <div className="text-4xl font-bold text-[#503822] mb-2">24+</div>
                <div className="text-sm text-[#503822] flex items-center justify-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Happy Clients</span>
                </div>
              </div>
            </div>
                
                <p className="mt-4">
                  Mebarki's approach combines technical expertise with creative problem-solving, allowing him to bridge the gap between design and development. His philosophy is that great design goes beyond aesthetics—it's about creating intuitive, engaging experiences that solve real problems. Whether developing a complex web application or designing a brand identity, his focus is always on balancing form and function to deliver solutions that exceed expectations.
                </p>
              </div>
              
              {/* Professional Journey Tabs */}
              <div className="mt-8 mb-8">
                <h3 className="text-xl font-bold mb-4 text-[#503822] border-b border-[#503822] pb-2">CRIMINAL RECORD & HISTORY</h3>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-[#503822] mb-4">
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'experience' ? 'bg-[#503822] text-[#f8e1c2]' : 'text-[#503822]'}`}
                    onClick={() => setActiveTab('experience')}
                  >
                    <Briefcase className="w-4 h-4 inline mr-2" />
                    Offenses
                  </button>
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'education' ? 'bg-[#503822] text-[#f8e1c2]' : 'text-[#503822]'}`}
                    onClick={() => setActiveTab('education')}
                  >
                    <GraduationCap className="w-4 h-4 inline mr-2" />
                    Training Grounds
                  </button>
                  <button 
                    className={`py-2 px-4 font-medium text-sm ${activeTab === 'philosophy' ? 'bg-[#503822] text-[#f8e1c2]' : 'text-[#503822]'}`}
                    onClick={() => setActiveTab('philosophy')}
                  >
                    <Heart className="w-4 h-4 inline mr-2" />
                    Manifesto
                  </button>
                </div>
                
                {/* Tab Content */}
                <div className="tab-content">
                  {/* Experience Tab */}
                  {activeTab === 'experience' && (
                    <div>
                      <div className="mb-4 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">First-Degree Interface Manipulation</h4>
                        <p className="text-sm text-[#503822]/80">TechVision Solutions • 2020 - Present</p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Conspirator in multiple responsive web applications using React and Next.js</li>
                          <li>• Serial TypeScript implementation resulting in 40% fewer bugs (evidence of premeditation)</li>
                          <li>• Accomplice to design teams in creating dangerously cohesive user experiences</li>
                        </ul>
                      </div>
                      
                      <div className="mb-4 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Aggravated UI/UX Seduction</h4>
                        <p className="text-sm text-[#503822]/80">Digital Crafters • 2018 - 2020</p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Serial designer of irresistibly intuitive interfaces for web and mobile</li>
                          <li>• Masterminded design systems that illegally improved efficiency by 30%</li>
                          <li>• Conducted covert user testing operations with unauthorized feedback implementation</li>
                        </ul>
                      </div>
                      
                      <div className="mb-4 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Misdemeanor Code Manipulation</h4>
                        <p className="text-sm text-[#503822]/80">Innovative Media • 2016 - 2018</p>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• Suspected of developing unauthorized WordPress themes and plugins</li>
                          <li>• First offense: implementing responsive designs without regard for device limitations</li>
                          <li>• Charged with illegal SEO optimization resulting in unfair search ranking advantages</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Education Tab */}
                  {activeTab === 'education' && (
                    <div>
                      <div className="mb-4 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Advanced Training in Digital Manipulation</h4>
                        <p className="text-sm text-[#503822]/80">University of Technology • 2014 - 2016</p>
                        <p className="text-sm mt-2">Covert operations in Human-Computer Interaction and Advanced Web Technologies. Identified as high-risk graduate with honors (enhanced threat level).</p>
                      </div>
                      
                      <div className="mb-4 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Initial Indoctrination in Code</h4>
                        <p className="text-sm text-[#503822]/80">State University • 2010 - 2014</p>
                        <p className="text-sm mt-2">Early warning signs included obsessive focus on Software Engineering and Design Principles. Placed on Dean's watchlist for all semesters due to suspicious perfectionism.</p>
                      </div>
                      
                      <div className="mb-4 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Known Accomplices & Specialized Training</h4>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• International Communications Conspiracy - 77/100 Infiltration Level (C2 - Highly Dangerous)</li>
                          <li>• IBM Data Science Underground Network - Advanced Member</li>
                          <li>• 365 Data Analysis Syndicate - Serial Pattern Recognition</li>
                          <li>• Cross-border Data Science Operations</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  {/* Philosophy Tab */}
                  {activeTab === 'philosophy' && (
                    <div>
                      <p className="mb-4">The accused's manifesto reveals a dangerous ideology built on these radical principles:</p>
                       
                      <div className="mb-4">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">1</span>
                          User Manipulation Tactics
                        </h4>
                        <p className="text-sm mt-1 ml-8">Subject admits to "starting with the user and working backward" - a clear psychological manipulation strategy. Every design decision is calculated to influence the end-user, creating interfaces so intuitive and accessible that users become dependent on the experience.</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">2</span>
                          Aesthetic Deception Techniques
                        </h4>
                        <p className="text-sm mt-1 ml-8">Subject employs a dangerous combination of beauty and functionality to lure unsuspecting users. Creates interfaces that are deliberately aesthetically pleasing to distract from their efficiency at capturing user attention and engagement.</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">3</span>
                          Escalating Capabilities
                        </h4>
                        <p className="text-sm mt-1 ml-8">Suspect shows no signs of ceasing operations, admitting to "continuous learning and improvement." Authorities are concerned about his ever-evolving tactics and refusal to limit his technological capabilities, posing an increasing threat to conventional development limitations.</p>
                      </div>
                      
                      <div className="mb-4">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">4</span>
                          Obsessive Perfectionism
                        </h4>
                        <p className="text-sm mt-1 ml-8">Evidence shows a disturbing fixation on details. Subject has been observed creating pixel-perfect designs and meticulously organized code in what psychiatrists describe as "pathological perfectionism." This level of attention to detail suggests premeditated intent to craft flawless user experiences.</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            

            
            {/* Projects Section */}
            <section className="mb-16 article animate-slideInUp">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#503822] font-serif tracking-tight leading-none">
                NOTORIOUS CASES
                <div className="border-b-2 border-[#503822] w-full mt-2"></div>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
                {projects.map((project, index) => (
                  <article 
                    key={project.id} 
                    className={`relative p-6 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-1 article ink-drop`}
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
                        className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full"
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
            <div className="border border-[#503822] p-4 mb-4" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1000ms' }}>
              <h3 className="font-bold text-lg border-b border-[#503822] pb-1 mb-3" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1200ms' }}>ABOUT THE DEVELOPER</h3>
              <div className="aspect-square w-full mb-3 overflow-hidden group">
                <img 
                  src="/images/me.png"
                  alt="Samy Mebarki"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-glow animate-fadeIn"
                />
              </div>
              <p className="text-sm mb-3 text-[#503822] animate-slideInUp">With a background in both design and development, Samy brings a unique perspective to every project. His approach combines technical expertise with creative problem-solving.</p>
              
              <h4 className="font-bold text-sm mb-3 text-[#503822]" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '100ms' }}>TECHNICAL SKILLS</h4>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <ul className="text-xs space-y-1 text-[#503822]" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '200ms' }}>
                  <li className="transition-transform hover:translate-x-1 duration-300">• React & Next.js / Vue.js</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• TypeScript & JavaScript</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• UI/UX Design</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Responsive Web Development</li>
                </ul>
                <ul className="text-xs space-y-1 text-[#503822]" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '300ms' }}>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Django / NodeJS Backend</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Python / SQL</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• MySQL / PostgreSQL</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Supabase / Convex / Clerk</li>
                </ul>
                <ul className="text-xs space-y-1 text-[#503822]" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '400ms' }}>
                  <li className="transition-transform hover:translate-x-1 duration-300">• AI Development</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• ML / Deep Learning</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Data Science / Analysis</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Pandas / Numpy / Matplotlib</li>
                </ul>
                <ul className="text-xs space-y-1 text-[#503822]" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '500ms' }}>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Adobe Illustrator</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Photoshop / Figma</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Graphic Design</li>
                  <li className="transition-transform hover:translate-x-1 duration-300">• Branding Materials</li>
                </ul>
              </div>
              
              <div className="border-t border-[#503822] pt-3">
                <h4 className="font-bold text-sm mb-2 text-[#503822]" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '600ms' }}>CONTACT</h4>
                <p className="text-xs text-[#503822] mb-2" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '700ms' }}>Location : Constantine, Algeria</p>
                <p className="text-xs text-[#503822] mb-2" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '800ms' }}>Website : samymebarki.dev</p>
                <div className="flex space-x-4 mt-3" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '900ms' }}>
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
            
            <div className="border border-[#503822] p-4 bg-[#503822] text-[#f8e1c2] mb-4" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1000ms' }}>
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
              <h3 className="font-bold text-lg border-b border-[#f8e1c2] pb-1 mb-3">LEARNING GOALS</h3>
              <div className="grid grid-cols-2 gap-2 text-sm mb-3">
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>3D Modeling</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Game Development</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>C++</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>No-Code Platforms</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Web Security</span>
                </div>
                <div className="flex items-center">
                  <span className="mr-2">•</span>
                  <span>Advanced Chess</span>
                </div>
              </div>
              <h3 className="font-bold text-lg border-b border-[#f8e1c2] pb-1 mb-3 ">ACHIEVEMENTS</h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>EF SET English Certificate - C2 Proficient (77/100)</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>IBM Applied Data Science Specialization</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>365 Data Science - Data Analyst</span>
                </div>
                <div className="flex items-start">
                  <span className="mr-2 mt-1">•</span>
                  <span>IBM Data Science Professional</span>
                </div>
              </div>
            </div>
            <div className="border border-[#503822] p-4 mb-4">
              <h3 className="font-bold text-lg border-b border-[#503822] pb-1 mb-3">GET IN TOUCH</h3>
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
        
        {/* Testimonials Section - Classifieds Style */}
        <section className="mt-12 mb-12 border-t border-[#503822] pt-8">
          <div className="max-w-6xl mx-auto">
            <motion.div 
              className="flex justify-center mb-6"
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
            >
              <h2 className="text-xl font-bold font-serif text-[#503822] border-b-2 border-[#503822] pb-1 px-4 inline-block">TESTIMONIALS</h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-t border-l border-r border-[#503822]">
              {/* Testimonial 1 */}
              <motion.div 
                className="p-3 border-r border-b border-[#503822] relative bg-[#efe0b4] bg-opacity-30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-1">
                  <div className="text-xs font-serif italic">
                    "Working with Samy was a pleasure. His technical skills are matched by his creativity and problem-solving abilities."
                  </div>
                </div>
                <div className="text-right text-[11px]">
                  <span className="font-bold">— David Chen,</span> CTO at InnovateTech
                </div>
              </motion.div>
              
              {/* Testimonial 2 */}
              <motion.div 
                className="p-3 border-r border-b border-[#503822] relative bg-[#efe0b4] bg-opacity-30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.1 }}
              >
                <div className="mb-1">
                  <div className="text-xs font-serif italic">
                    "Samy's attention to detail transformed our website. Our vague ideas became a beautiful, functional site."
                  </div>
                </div>
                <div className="text-right text-[11px]">
                  <span className="font-bold">— Sarah Johnson,</span> Marketing Director
                </div>
              </motion.div>
              
              {/* Testimonial 3 */}
              <motion.div 
                className="p-3 border-r border-b border-[#503822] relative bg-[#efe0b4] bg-opacity-30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.2 }}
              >
                <div className="mb-1">
                  <div className="text-xs font-serif italic">
                    "As a startup, we needed someone who could understand our vision. Samy delivered exceptional results."
                  </div>
                </div>
                <div className="text-right text-[11px]">
                  <span className="font-bold">— Emma Rodriguez,</span> Product Manager
                </div>
              </motion.div>
              
              {/* Testimonial 4 */}
              <motion.div 
                className="p-3 border-b border-[#503822] relative bg-[#efe0b4] bg-opacity-30"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 }}
              >
                <div className="mb-1">
                  <div className="text-xs font-serif italic">
                    "The redesign of our platform exceeded expectations. Users have commented on the improved interface."
                  </div>
                </div>
                <div className="text-right text-[11px]">
                  <span className="font-bold">— Michael Torres,</span> CEO at DataViz
                </div>
              </motion.div>
            </div>
          </div>
        </section>
        
        {/* Footer */}
        <footer className="border-t-2 border-[#503822] mt-8 pt-4 text-center text-xs w-full text-[#503822]">
          <div className="flex justify-center space-x-6 mb-4">
            <motion.a 
              href="#" 
              className="hover:underline relative group"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.preventDefault()}
            >
              Projects
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#503822] group-hover:w-full transition-all duration-300"
                layoutId="underline"
              />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:underline relative group"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.preventDefault()}
            >
              Blog
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#503822] group-hover:w-full transition-all duration-300"
                layoutId="underline"
              />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:underline relative group"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.preventDefault()}
            >
              Resume
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#503822] group-hover:w-full transition-all duration-300"
                layoutId="underline"
              />
            </motion.a>
            <motion.a 
              href="#" 
              className="hover:underline relative group"
              whileHover={{ scale: 1.1 }}
              onClick={(e) => e.preventDefault()}
            >
              Contact
              <motion.span 
                className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#503822] group-hover:w-full transition-all duration-300"
                layoutId="underline"
              />
            </motion.a>
          </div>
          <div className="mb-2">© {new Date().getFullYear()} Samy Mebarki • Creative Developer & Designer</div>
        </footer>
      </div>
    </div>
  );
}



