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

// Custom hook for typewriter effect with improved reliability
function useTypewriter(text: string, speed: number = 50) {
  const [displayText, setDisplayText] = useState('');
  const [isTyping, setIsTyping] = useState(true);
  const [startTyping, setStartTyping] = useState(false);
  
  // Initialize typing after component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      setStartTyping(true);
    }, 500); // Slight delay to ensure DOM is ready
    
    return () => clearTimeout(timer);
  }, []);
  
  // Handle the actual typing effect
  useEffect(() => {
    if (!startTyping || !isTyping) return;
    
    let isMounted = true;
    
    const typeNextChar = () => {
      if (displayText.length < text.length) {
        const timer = setTimeout(() => {
          if (isMounted) {
            setDisplayText(text.substring(0, displayText.length + 1));
          }
        }, speed);
        
        return timer;
      } else {
        setIsTyping(false);
        return undefined;
      }
    };
    
    const timerId = typeNextChar();
    
    return () => {
      isMounted = false;
      if (timerId) clearTimeout(timerId);
    };
  }, [displayText, text, speed, isTyping, startTyping]);
  
  return { displayText, isTyping };
}

export default function Home() {
  const [date, setDate] = useState('')
  const [isVisible, setIsVisible] = useState(false)
  // Define a Project type for TypeScript
  type Project = {
    id: number;
    title: string;
    description: string;
    year: string;
    category: string;
    image: string;
    type: string;
    fullDescription: string;
    technologies: string[];
    results: string;
    role: string;
  }

  const [activeTab, setActiveTab] = useState('experience')
  const [activeMainTab, setActiveMainTab] = useState(0) // Track the active main tab
  const [hasScrolled, setHasScrolled] = useState(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [activeProjectFilter, setActiveProjectFilter] = useState('All')
  
  // Typewriter effects for headings with improved reliability
  // Main heading is now static
  
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
      image: "/images/avro-ko.jpg",
      type: "Design",
      fullDescription: "A comprehensive branding and digital presence project for an award-winning interior architecture firm. The project included developing a sophisticated visual language that reflected the firm's attention to detail and craftsmanship, while ensuring the digital platform effectively showcased their diverse portfolio of high-end commercial and residential projects.",
      technologies: ["Adobe Creative Suite", "Figma", "Next.js", "Tailwind CSS"],
      results: "Increased portfolio engagement by 45% and generated 12 new client inquiries within the first month of launch.",
      role: "Lead Designer & Developer"
    },
    {
      id: 2,
      title: "THE ROGER HUB",
      description: "Immersive web experience for tennis-inspired sneakers in collaboration with Roger Federer.",
      year: "2023",
      category: "Web Design",
      image: "/images/roger-hub.jpg",
      type: "Web Development",
      fullDescription: "An immersive digital experience developed for a major sportswear brand's tennis-inspired sneaker collection in collaboration with Roger Federer. The interactive platform seamlessly blends storytelling, product showcase, and e-commerce functionality with tennis-themed interactive elements that highlight the craftsmanship and performance features of the collection.",
      technologies: ["React.js", "Three.js", "GSAP", "Shopify API", "WebGL"],
      results: "The campaign resulted in a 78% sell-through rate in the first week and received an Awwwards Site of the Day nomination.",
      role: "Frontend Developer & 3D Animation Specialist"
    },
    {
      id: 3,
      title: "LUMINA",
      description: "Digital platform reimagining light interaction in architectural spaces with IoT technology.",
      year: "2022",
      category: "Digital Exp",
      image: "/images/lumina.jpg",
      type: "IoT Development",
      fullDescription: "A cutting-edge digital platform that reimagines how light interacts with architectural spaces through IoT technology. This project bridges the gap between digital interfaces and physical environments, allowing users to control and program sophisticated lighting installations through an intuitive interface. The system uses real-time data to adapt lighting conditions based on occupancy, time of day, and user preferences.",
      technologies: ["React Native", "Node.js", "MongoDB", "MQTT", "Raspberry Pi", "Custom PCB Design"],
      results: "Successfully deployed in 5 commercial spaces with a 40% reduction in energy consumption while improving occupant comfort ratings by 35%.",
      role: "Full Stack Developer & IoT Specialist"
    },
    {
      id: 4,
      title: "TERRA FORMA",
      description: "Generative AI art project visualizing environmental data through immersive landscapes.",
      year: "2023",
      category: "AI Art",
      image: "/images/terra-forma.jpg",
      type: "AI Development",
      fullDescription: "An innovative generative AI art project that transforms environmental data into immersive digital landscapes. The system processes climate data, pollution metrics, and biodiversity indicators to create evolving visual narratives that reflect the health and changes in our natural environment. The project bridges art, technology, and environmental awareness to create compelling visual stories.",
      technologies: ["Python", "TensorFlow", "GAN Architecture", "WebGL", "D3.js", "API Integrations"],
      results: "Exhibited at three international digital art festivals and featured in Wired magazine's 'AI Innovations That Matter' issue.",
      role: "AI Developer & Creative Director"
    },
    {
      id: 5,
      title: "PULSE METRICS",
      description: "Healthcare analytics dashboard visualizing patient data for medical professionals.",
      year: "2022",
      category: "Data Viz",
      image: "/images/healthcare-dashboard.jpg",
      type: "Data Visualization",
      fullDescription: "A comprehensive healthcare analytics dashboard designed for medical professionals to visualize and interpret complex patient data. The system processes and displays vital signs, medication schedules, treatment outcomes, and patient history in an intuitive interface that enables quick decision-making and trend identification while maintaining strict HIPAA compliance.",
      technologies: ["Vue.js", "D3.js", "Python", "Django", "PostgreSQL", "Docker"],
      results: "Reduced decision-making time by 32% in pilot hospitals and improved treatment plan adjustments by identifying patterns not previously recognized.",
      role: "Frontend Developer & Data Visualization Specialist"
    },
    {
      id: 6,
      title: "ECHO CHAMBERS",
      description: "Interactive sound installation responding to movement and presence in physical space.",
      year: "2021",
      category: "Installation",
      image: "/images/sound-installation.jpg",
      type: "Interactive Art",
      fullDescription: "An award-winning interactive sound installation that responds to movement and presence in physical space. Using an array of sensors, custom software, and a sophisticated sound design system, the installation creates dynamic audio environments that evolve based on visitor movement, density, and behavior patterns, creating a unique collective sound experience.",
      technologies: ["Max/MSP", "Arduino", "Custom Sensors", "Spatial Audio", "C++"],
      results: "Featured in the Contemporary Art Museum's 'Digital Frontiers' exhibition and received the Interactive Art Innovation Award.",
      role: "Technical Director & Sound Designer"
    }
  ]
  
  // Extract unique project types for filtering
  const projectTypes = ['All', ...new Set(projects.map(project => project.type))]

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
        <header className="text-center border-b-2 border-[#503822] mb-6 sm:mb-8 pb-3 sm:pb-4 newspaper-fold">
          
          <h1 className="text-4xl sm:text-7xl md:text-9xl lg:text-9xl leading-none my-4 sm:my-6 font-['Chomsky'] text-[#503822] hover:scale-105 transition-transform duration-500">
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">S</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">a</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">m</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">y</span>
            <span className="mx-2 sm:mx-4"></span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">M</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">e</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">b</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">a</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">r</span>
            <span className="inline-block transform hover:rotate-2 transition-transform duration-300">k</span>
            <span className="inline-block transform hover:-rotate-2 transition-transform duration-300">i</span>
          </h1>
          <div className="flex justify-between items-center text-[10px] sm:text-xs border-t border-b border-[#503822] py-1 sm:py-2 text-[#503822] px-1 sm:px-0">
            <span className="flex items-center"> May 20, 2025</span>
            <span className="hidden md:inline-block">VOL. 1, NO. 1 •</span>
            <span className="flex items-center"><PenTool className="w-3 h-3 mr-1" /> <span className="tracking-tight sm:tracking-normal">DESIGN • CODE • ART</span></span>
          </div>
        </header>
        
        {/* Tab Navigation - similar to CRIMINAL RECORD section */}
        <div className="border-b border-[#503822] mb-8 flex justify-center items-center">
          <div className="container mx-auto px-4 flex justify-center">
            <div className="flex justify-center w-full max-w-lg">
              {[
                { name: 'HOME', icon: <Newspaper className="w-4 h-4 inline mr-2" /> },
                { name: 'PROJECTS', icon: <Briefcase className="w-4 h-4 inline mr-2" /> },
              ].map((tab, index) => (
                <button 
                  key={tab.name}
                  onClick={() => setActiveMainTab(index)}
                  className={`main-tab py-2 px-6 font-medium text-sm flex-1 ${activeMainTab === index ? 'bg-[#503822] text-[#f8e1c2]' : 'text-[#503822]'}`}
                >
                  {tab.icon}
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>
        
        {/* Tab content containers */}
        <div className={`tab-content ${activeMainTab === 0 ? '' : 'hidden'}`}>
          {/* Home tab content - this is the current page content */}
          
          {/* Main Headline Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 w-full">
          <div className="col-span-1 md:col-span-8 md:border-r md:border-[#503822] md:pr-6 px-2">
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
              `}</style>
              <h2 
                className="text-2xl sm:text-4xl md:text-6xl font-bold leading-tight mb-4 text-[#503822] relative z-10"
              >
                DEVELOPER ARRESTED FOR MASTERING MULTIPLE SKILLS
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
            
            
            
            <div className="flex items-center text-xs sm:text-sm text-[#503822] mb-5 mt-2" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '800ms' }}>
              <User className="h-4 w-4 mr-1" />
              <span className="mr-4">By Samy Mebarki</span>
              <Clock className="h-4 w-4 ml-4 mr-1" />
              <span>5 min read</span>
            </div>
            <PullQuote 
                quote="Design is not just what it looks like and feels like. Design is how it works."
                author="Steve Jobs"
              />
            <div className="text-justify text-xs sm:text-sm md:text-base text-[#503822] leading-relaxed mb-8 space-y-4">
              <div className="mb-6">
                <p className="relative drop-cap leading-relaxed">
                  <span className="float-left text-4xl md:text-6xl font-bold leading-[0.8] mr-2 text-[#503822] -ml-3 relative top-1 h-[1.5em] overflow-hidden">S</span>
                  hocking arrest made yesterday as authorities apprehended Samy Mebarki on multiple counts of possessing exceptional talent across design and development disciplines. Mebarki, operating for over 8 years, has been charged with excessive creativity, unlawful problem-solving abilities, and conspiracy to blend artistry with technical execution. "He's been creating outstanding digital experiences without regard for conventional limitations," stated one investigator. Evidence includes dozens of web applications that show clear signs of both aesthetic mastery and technical proficiency—a dangerous combination that has left clients extremely satisfied.
                </p>
                {/* Statistics Section */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8 mt-10">
              <div className="border border-[#503822] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#503822] mb-3">8+</div>
                <div className="text-xs sm:text-sm text-[#503822] flex items-center justify-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>Years Experience</span>
                </div>
              </div>
              <div className="border border-[#503822] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#503822] mb-3">75+</div>
                <div className="text-xs sm:text-sm text-[#503822] flex items-center justify-center">
                  <Layout className="w-4 h-4 mr-1" />
                  <span>Felonies Completed</span>
                </div>
              </div>
              <div className="border border-[#503822] p-4 text-center shadow-sm">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#503822] mb-3">24+</div>
                <div className="text-xs sm:text-sm text-[#503822] flex items-center justify-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>Happy Victims</span>
                </div>
              </div>
            </div>
                
                <p className="mt-6 leading-relaxed">
                  Mebarki's approach combines technical expertise with creative problem-solving, allowing him to bridge the gap between design and development. His philosophy is that great design goes beyond aesthetics—it's about creating intuitive, engaging experiences that solve real problems. Whether developing a complex web application or designing a brand identity, his focus is always on balancing form and function to deliver solutions that exceed expectations.
                </p>
              </div>
              
              {/* Professional Journey Tabs */}
              <div className="mt-10 mb-10">
                <h3 className="text-lg sm:text-xl font-bold mb-4 text-[#503822] border-b border-[#503822] pb-2">CRIMINAL RECORD & HISTORY</h3>
                
                {/* Tab Navigation */}
                <div className="flex border-b border-[#503822] mb-6">
                  <button 
                    className={`flex-1 py-2 px-1 sm:px-4 font-medium text-[10px] sm:text-xs md:text-sm ${activeTab === 'experience' ? 'bg-[#503822] text-[#f8e1c2]' : 'text-[#503822]'}`}
                    onClick={() => setActiveTab('experience')}
                  >
                    <Briefcase className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    <span className="whitespace-nowrap">Offenses</span>
                  </button>
                  <button 
                    className={`flex-1 py-2 px-1 sm:px-4 font-medium text-[10px] sm:text-xs md:text-sm ${activeTab === 'education' ? 'bg-[#503822] text-[#f8e1c2]' : 'text-[#503822]'}`}
                    onClick={() => setActiveTab('education')}
                  >
                    <GraduationCap className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    <span className="whitespace-nowrap">Training</span>
                  </button>
                  <button 
                    className={`flex-1 py-2 px-1 sm:px-4 font-medium text-[10px] sm:text-xs md:text-sm ${activeTab === 'philosophy' ? 'bg-[#503822] text-[#f8e1c2]' : 'text-[#503822]'}`}
                    onClick={() => setActiveTab('philosophy')}
                  >
                    <Heart className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1 sm:mr-2" />
                    <span className="whitespace-nowrap">Manifesto</span>
                  </button>
                </div>
                
                {/* Tab Content */}
                <div className={activeMainTab === 0 ? 'block' : 'hidden'}>
                  {/* Experience Tab */}
                  <div className={activeTab === 'experience' ? 'block' : 'hidden'}>
                      <div className="mb-6 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">First-Degree Interface Manipulation</h4>
                        <p className="text-xs sm:text-sm text-[#503822]/80">TechVision Solutions • 2020 - Present</p>
                        <ul className="text-xs sm:text-sm mt-3 space-y-2 leading-relaxed">
                          <li>• Conspirator in multiple responsive web applications using React and Next.js</li>
                          <li>• Serial TypeScript implementation resulting in 40% fewer bugs (evidence of premeditation)</li>
                          <li>• Accomplice to design teams in creating dangerously cohesive user experiences</li>
                        </ul>
                      </div>
                      
                      <div className="mb-6 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Aggravated UI/UX Seduction</h4>
                        <p className="text-xs sm:text-sm text-[#503822]/80">Digital Crafters • 2018 - 2020</p>
                        <ul className="text-xs sm:text-sm mt-3 space-y-2 leading-relaxed">
                          <li>• Serial designer of irresistibly intuitive interfaces for web and mobile</li>
                          <li>• Masterminded design systems that illegally improved efficiency by 30%</li>
                          <li>• Conducted covert user testing operations with unauthorized feedback implementation</li>
                        </ul>
                      </div>
                      
                      <div className="mb-6 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Misdemeanor Code Manipulation</h4>
                        <p className="text-xs sm:text-sm text-[#503822]/80">Innovative Media • 2016 - 2018</p>
                        <ul className="text-xs sm:text-sm mt-3 space-y-2 leading-relaxed">
                          <li>• Suspected of developing unauthorized WordPress themes and plugins</li>
                          <li>• First offense: implementing responsive designs without regard for device limitations</li>
                          <li>• Charged with illegal SEO optimization resulting in unfair search ranking advantages</li>
                        </ul>
                      </div>
                    </div>
                  
                  
                  {/* Education Tab */}
                  <div className={activeTab === 'education' ? 'block' : 'hidden'}>
                      <div className="mb-6 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Advanced Training in Digital Manipulation</h4>
                        <p className="text-xs sm:text-sm text-[#503822]/80">University of Technology • 2014 - 2016</p>
                        <p className="text-xs sm:text-sm mt-3 leading-relaxed">Covert operations in Human-Computer Interaction and Advanced Web Technologies. Identified as high-risk graduate with honors (enhanced threat level).</p>
                      </div>
                      
                      <div className="mb-6 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Initial Indoctrination in Code</h4>
                        <p className="text-xs sm:text-sm text-[#503822]/80">State University • 2010 - 2014</p>
                        <p className="text-xs sm:text-sm mt-3 leading-relaxed">Early warning signs included obsessive focus on Software Engineering and Design Principles. Placed on Dean's watchlist for all semesters due to suspicious perfectionism.</p>
                      </div>
                      
                      <div className="mb-6 border-l-2 border-[#503822] pl-4">
                        <h4 className="font-bold">Known Accomplices & Specialized Training</h4>
                        <ul className="text-sm mt-2 space-y-1">
                          <li>• International Communications Conspiracy - 77/100 Infiltration Level (C2 - Highly Dangerous)</li>
                          <li>• IBM Data Science Underground Network - Advanced Member</li>
                          <li>• 365 Data Analysis Syndicate - Serial Pattern Recognition</li>
                          <li>• Cross-border Data Science Operations</li>
                        </ul>
                      </div>
                    </div>
                  
                  {/* Philosophy Tab */}
                  <div className={activeTab === 'philosophy' ? 'block' : 'hidden'}>
                      <p className="text-xs sm:text-sm mb-4">The accused's manifesto reveals a dangerous ideology built on these radical principles:</p>
                       
                      <div className="mb-6">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">1</span>
                          User Manipulation Tactics
                        </h4>
                        <p className="text-xs sm:text-sm mt-3 ml-8 leading-relaxed">Subject admits to "starting with the user and working backward" - a clear psychological manipulation strategy. Every design decision is calculated to influence the end-user, creating interfaces so intuitive and accessible that users become dependent on the experience.</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">2</span>
                          Aesthetic Deception Techniques
                        </h4>
                        <p className="text-xs sm:text-sm mt-3 ml-8 leading-relaxed">Subject employs a dangerous combination of beauty and functionality to lure unsuspecting users. Creates interfaces that are deliberately aesthetically pleasing to distract from their efficiency at capturing user attention and engagement.</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">3</span>
                          Escalating Capabilities
                        </h4>
                        <p className="text-xs sm:text-sm mt-3 ml-8 leading-relaxed">Suspect shows no signs of ceasing operations, admitting to "continuous learning and improvement." Authorities are concerned about his ever-evolving tactics and refusal to limit his technological capabilities, posing an increasing threat to conventional development limitations.</p>
                      </div>
                      
                      <div className="mb-6">
                        <h4 className="font-bold flex items-center">
                          <span className="inline-block w-6 h-6 rounded-full bg-[#503822] text-[#f8e1c2] text-center mr-2">4</span>
                          Obsessive Perfectionism
                        </h4>
                        <p className="text-xs sm:text-sm mt-3 ml-8 leading-relaxed">Evidence shows a disturbing fixation on details. Subject has been observed creating pixel-perfect designs and meticulously organized code in what psychiatrists describe as "pathological perfectionism." This level of attention to detail suggests premeditated intent to craft flawless user experiences.</p>
                      </div>
                    </div>
                </div>
              </div>
            </div>
            

            
            {/* Projects Section */}
            <section className="mb-16 article animate-slideInUp">
              <div className="flex justify-between items-center text-xs text-[#503822] mb-2">
                <div>Vol. XCVII No. 404</div>
                <div className="font-serif italic">"Where Code Meets Crime"</div>
                <div>{format(new Date(), 'MMMM d, yyyy')} - 25¢</div>
              </div>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold mt-6 mb-6 text-[#503822] font-serif tracking-tight leading-none">
                NOTORIOUS CASES
                <div className="border-b-2 border-[#503822] w-full mt-2"></div>
              </h2>
              
              <div className="text-xs text-[#503822] italic mb-3 border-b border-[#503822] pb-1">
                SPECIAL INVESTIGATION: Suspect linked to following high-profile development cases
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 mt-6">
              <div className="col-span-1 md:col-span-2 border-l-4 border-[#503822] pl-4 italic text-[#503822] mb-4 bg-[#efe0b4] bg-opacity-20 p-3 relative" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '400ms' }}>
                  <div className="absolute -top-3 right-4 bg-[#503822] text-[#f8e1c2] text-[10px] px-2 py-1 rotate-6 z-10">FROM OUR SOURCES</div>
                  <div className="text-lg font-serif">"His code doesn't just run, it practically flees the crime scene with extraordinary efficiency."</div>
                  <div className="text-right text-xs mt-2">— Detective R. Gosling, Frontend Investigation Unit</div>
                </div>
                {projects.slice(0, 4).map((project, index) => (
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
                    <div className="relative h-56 sm:h-64 mb-6 overflow-hidden group">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105 w-full h-full"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-500"></div>
                    </div>
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-xl sm:text-2xl font-bold font-['OldNewspaper'] text-[#1a1a1a] hover:text-[#503822] transition-colors">
                        {project.title}
                      </h3>
                      <span className="bg-[#f0e6d2] text-[#503822] text-xs px-2 py-1 font-mono">
                        {project.year}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm md:text-base text-[#333] mb-4 leading-relaxed line-clamp-3">{project.description}</p>
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
          <div className="col-span-1 md:col-span-4 md:pl-6 px-2 relative">
            {/* Signature */}
            
            <div className="border border-[#503822] p-5 mb-6" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1000ms' }}>
              <h3 className="font-bold text-base sm:text-lg border-b border-[#503822] pb-1 mb-3" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1200ms' }}>ABOUT THE DEVELOPER</h3>
              <div className="aspect-square w-full mb-3 overflow-hidden group relative">
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-12 z-10 border-2 border-[#8B0000] opacity-25">
                  <div className="text-[#8B0000] font-bold py-2 px-5 text-6xl tracking-widest">WANTED</div>
                </div>
                <div className="absolute bottom-0 left-0 w-full z-10 bg-[#503822] text-[#f8e1c2] text-xs py-1 flex justify-between px-2">
                  <span>ID: DV-0422</span>
                  <span>APPROACH WITH CAUTION</span>
                </div>
                <img 
                  src="/images/me.png" 
                  alt="Samy Mebarki" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 group-hover:brightness-110 group-hover:shadow-glow animate-fadeIn"
                />
              </div>
              <p className="text-xs sm:text-sm mb-3 text-[#503822] animate-slideInUp">With a background in both design and development, Samy brings a unique perspective to every project. His approach combines technical expertise with creative problem-solving.</p>
              
              <h4 className="font-bold text-sm mb-3 text-[#503822]" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '100ms' }}>TECHNICAL SKILLS</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
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
                <h4 className="font-bold text-sm mb-2 text-[#503822] animate-fade-in delay-600">CONTACT</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3 mb-4 animate-fade-in delay-700">
                  <div className="flex items-center space-x-2 text-[#503822]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                    <span className="text-xs">Constantine, Algeria</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#503822]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                      <line x1="2" y1="9" x2="22" y2="9"></line>
                    </svg>
                    <span className="text-xs">samymebarki.dev</span>
                  </div>
                  <div className="flex items-center space-x-2 text-[#503822]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <a href="mailto:samymebarki8@gmail.com" className="text-xs hover:underline">samymebarki8@gmail.com</a>
                  </div>
                  <div className="flex items-center space-x-2 text-[#503822]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-xs">+1 (234) 567-8900</span>
                  </div>
                </div>
                
                {/* Social Links */}
                <div className="flex space-x-5 mt-4 mb-5 animate-fade-in delay-800">
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
                  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-[#503822] hover:opacity-75 transition-opacity">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                  <a href="https://dribbble.com" target="_blank" rel="noopener noreferrer" className="text-[#503822] hover:opacity-75 transition-opacity">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12 0C5.373 0 0 5.372 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12c0-6.628-5.373-12-12-12zm9.949 11.12c-.2-.637-.516-1.254-.934-1.841-2.2.471-4.6.698-7.105.698-1.608 0-3.213-.128-4.8-.375.003.028.007.055.01.083.171 1.358.471 2.692.89 3.992 2.886-1.242 5.59-2.914 7.939-5.399l.046.029c1.482.973 2.632 2.374 3.313 3.993a11.834 11.834 0 01.641-1.18zm-1.808-3.155c-2.33 2.328-5.029 3.997-7.889 5.184 1.268 2.54 2.146 5.313 2.619 8.2 4.248-1.267 7.406-4.974 7.933-9.469-.824-.958-1.701-1.78-2.663-2.512v-1.403zm-8.141 14.972c-.344.039-.69.063-1.039.063-.413 0-.819-.025-1.22-.074-.305-2.964-1.178-5.819-2.524-8.445-1.192.182-2.377.417-3.539.703a8.69 8.69 0 002.12 4.212 8.65 8.65 0 004.889 2.826c.42.054.847.082 1.274.082.213 0 .423-.011.632-.031-.531-.756-1.022-1.546-1.47-2.362-2.962-1.092-5.798-2.547-8.482-4.327-.18.308-.35.623-.509.946a9.83 9.83 0 00-.876 4.023C2.385 18.34 6.71 22 11.957 22c.915 0 1.818-.132 2.684-.396-1.114-2.161-2.07-4.597-2.641-7.667zm-2.264-9.638c-1.081-2.503-1.833-5.186-2.246-8.035-3.266.934-5.772 3.548-6.514 6.83 1.065-.217 2.143-.389 3.227-.511 1.802-.198 3.604-.267 5.406-.207.041.642.109 1.281.204 1.916a.5.5 0 01-.077.007zm.5-2.679c-1.92.312-3.867.478-5.825.493.707 2.573 1.78 5.042 3.195 7.291 1.734-.369 3.381-.96 4.92-1.766a36.937 36.937 0 01-.962-2.677 35.369 35.369 0 01-1.328-3.341zm2.504 4.971c.319.974.664 1.928 1.034 2.862 1.42-.868 2.757-1.908 3.989-3.112a9.041 9.041 0 00-3.574-3.167c-.459 1.143-.969 2.288-1.449 3.417z" clipRule="evenodd" />
                    </svg>
                  </a>
                </div>
                
                {/* Download Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-fade-in delay-900">
                  <a 
                    href="#" 
                    className="border border-[#503822] hover:bg-[#503822] hover:text-[#f8e1c2] text-[#503822] py-2 px-3 text-center text-xs uppercase tracking-wider font-medium transition-colors duration-300"
                  >
                    Business Card
                  </a>
                  <a 
                    href="#" 
                    className="border border-[#503822] hover:bg-[#503822] hover:text-[#f8e1c2] text-[#503822] py-2 px-3 text-center text-xs uppercase tracking-wider font-medium transition-colors duration-300"
                  >
                    Resume/CV
                  </a>
                </div>
              </div>
            </div>
            
            <div className="border border-[#503822] p-5 mb-8 bg-[#efe0b4] bg-opacity-30" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '400ms' }}>
              <div className="border-b-2 border-[#503822] mb-4 pb-1">
                <h3 className="font-bold text-base sm:text-lg text-[#503822] inline-block">SUSPICIOUS ACTIVITIES & KNOWN HABITS</h3>
                <div className="text-[10px] sm:text-xs italic text-[#503822] mt-1">Subject observed engaging in the following:</div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 mb-8">
                <div className="border border-[#503822] border-dashed p-3">
                  <h4 className="text-xs sm:text-sm font-bold border-b border-[#503822] mb-2 pb-1">DOCUMENTED BEHAVIORS</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] sm:text-xs leading-relaxed">
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Illicit Photography</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Construction Activities</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Information Gathering</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Border Crossing</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Strategic Games</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Pattern Analysis</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Coffee Consumption</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Late-Night Coding</span>
                    </div>
                  </div>
                </div>
                
                <div className="border border-[#503822] border-dashed p-3">
                  <h4 className="text-xs sm:text-sm font-bold border-b border-[#503822] mb-2 pb-1">FUTURE THREATS & PLANS</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[10px] sm:text-xs leading-relaxed">
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>3D Modeling Schemes</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Game Manipulation</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>C++ Infiltration</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>No-Code Exploitation</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Security Breaching</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Chess Grandmastery</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>AI Integration</span>
                    </div>
                    <div className="flex items-center">
                      <span className="inline-block w-3 h-3 bg-[#503822] mr-2"></span>
                      <span>Creative Subversion</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="border border-[#503822] p-3 text-xs italic">
                <p className="font-bold mb-1">OFFICER'S NOTE:</p>
                <p>Subject demonstrates unusual aptitude for acquiring new skills. Surveillance will continue as we monitor for development of additional capabilities. Approach with caution - known to engage subjects with irresistible UX design patterns.</p>
              </div>
            </div>
            
            {/* Most Wanted Skills Section */}
            <div className="border-2 border-[#503822] border-dashed p-5 mb-8 bg-[#efe0b4] bg-opacity-20" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1000ms' }}>
              <div className="text-center mb-4">
                <div className="inline-block px-3 sm:px-4 py-1 bg-[#503822] text-[#f8e1c2] mb-2 transform -rotate-1 text-xs sm:text-sm font-bold">MOST WANTED SKILLS</div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 text-center">
                {[
                  { name: "JavaScript", level: 90 },
                  { name: "React", level: 85 },
                  { name: "UI/UX", level: 80 },
                  { name: "Node.js", level: 75 },
                  { name: "TypeScript", level: 70 },
                  { name: "NextJS", level: 85 },
                  { name: "CSS", level: 90 },
                  { name: "Python", level: 65 }
                ].map((skill, index) => (
                  <div key={skill.name} className="relative p-2" style={{ 
                    transform: 'rotate(0deg)',
                    opacity: 0,
                    animation: 'fadeIn 0.8s ease-out forwards',
                    animationDelay: `${index * 100 + 300}ms`
                  }}>
                    <div className="border border-[#503822] p-3 bg-[#efe0b4] bg-opacity-60">
                      <div className="text-[10px] sm:text-xs font-bold mb-1">{skill.name}</div>
                      <div className="w-full bg-[#f8e1c2] h-1.5 mb-1">
                        <div 
                          className="bg-[#503822] h-1.5" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <div className="text-[8px] sm:text-[10px] italic">Danger Level: {skill.level}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="border border-[#503822] p-5 mb-6 bg-[#efe0b4] bg-opacity-20" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '1000ms' }}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between border-b border-[#503822] pb-1 mb-3">
                <h3 className="font-bold text-base sm:text-lg">ANONYMOUS TIP LINE</h3>
                <div className="text-[10px] sm:text-xs italic">All informants protected by journalist shield laws</div>
              </div>
              <div className="text-xs mb-3 italic">Have information about this suspect? Submit your anonymous tip below. Substantial leads may result in rewards.</div>
                <form className="space-y-4">
                  <style jsx>{`
                    ::placeholder {
                      color: #503822;
                      opacity: 0.6;
                    }
                  `}</style>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-xs font-medium mb-1">Informant Name (optional)</label>
                      <input type="text" id="name" className="w-full p-2 border border-[#503822] text-[#503822] bg-transparent text-sm" placeholder="Anonymous" />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-xs font-medium mb-1">Secure Contact Method</label>
                      <input type="email" id="email" className="w-full p-2 border border-[#503822] text-[#503822] bg-transparent text-sm" placeholder="Email or phone number" />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium mb-1">Intelligence Report</label>
                    <textarea id="message" rows={4} className="w-full p-2 border border-[#503822] text-[#503822] bg-transparent text-sm" placeholder="Provide detailed information about suspect activities..."></textarea>
                  </div>
                  <div className="flex flex-col items-center sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
                    <button type="submit" className="bg-[#503822] border border-[#503822] text-[#f8e1c2] px-3 py-1.5 sm:px-4 sm:py-2 hover:bg-transparent hover:text-[#503822] transition-colors text-xs sm:text-sm self-center sm:self-auto">
                      Submit Confidential Tip
                    </button>
                    <div className="text-[10px] sm:text-xs italic text-[#503822]/80 text-center sm:text-right">Tips verified by our investigative team</div>
                  </div>
                </form>
              </div>
          </div>
          
        </div>
        
        {/* Testimonials Section - Classifieds Style */}
        <section className="mt-12 mb-12 border-t border-[#503822] pt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="border-b border-[#503822] mb-8 pb-1 text-center relative">
              <div className="absolute -top-8 right-4 rotate-6 bg-[#efe0b4] border border-[#503822] p-1 px-2 text-xs text-[#503822] font-bold z-10 shadow-sm" style={{ opacity: 0, animation: 'fadeIn 0.8s ease-out forwards', animationDelay: '800ms' }}>EXCLUSIVE TESTIMONY</div>
              <div className="text-xs inline-block px-3 py-1 bg-[#503822] text-[#f8e1c2] mb-1">BREAKING NEWS</div>
            </div>
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
        
        </div>
        
        {/* Projects Tab Content - Newspaper Edition */}
        <div className={`tab-content ${activeMainTab === 1 ? '' : 'hidden'}`}>
          <div className="mb-8 relative">
            {/* Newspaper header with masthead and edition details */}
            <div className="relative border-b-2 border-[#503822] mb-8 pb-2">
              {/* Top line with volume and date */}
              <div className="flex justify-between text-xs text-[#503822] mb-2 uppercase tracking-wider">
                <div>VOL. XXIII, NO. 428</div>
                <div>EVENING EDITION</div>
              </div>
              
              {/* Main headline */}
              <div className="font-bold text-5xl text-[#503822] text-center mb-3 leading-none tracking-tight">CRIMINAL PORTFOLIO</div>
              
              {/* Subheadline */}
              <div className="flex justify-center mb-4">
                <div className="px-4 py-1 bg-[#503822] text-[#f8e1c2] text-sm font-bold inline-block">MASTERFUL SCHEMES EXPOSED</div>
              </div>
              
              <div className="text-sm text-[#503822] italic text-center mb-2 font-serif">Projects by Samy Mebarki, Notorious Skills Outlaw</div>
              
              {/* Decorative line */}
              <div className="flex items-center justify-center gap-2 mb-3">
                <div className="h-[1px] bg-[#503822] w-16"></div>
                <div className="h-2 w-2 bg-[#503822] rotate-45"></div>
                <div className="h-[1px] bg-[#503822] w-16"></div>
              </div>
              
              {/* Coffee stains for vintage effect */}
              <div className="absolute top-0 right-0 opacity-10 rotate-12">
                <CoffeeStain size="small" />
              </div>
            </div>
            
            {/* Project filters styled as newspaper sections */}
            <div className="mb-8 border-b border-[#503822] pb-3">
              <div className="flex items-center mb-2">
                <div className="h-6 w-6 bg-[#503822] flex items-center justify-center mr-2">
                  <span className="text-[#f8e1c2] font-bold text-xs">§</span>
                </div>
                <div className="text-sm font-bold text-[#503822] uppercase tracking-wide">SECTION INDEX</div>
              </div>
              <div className="flex flex-wrap items-center gap-3 pl-8">
                {projectTypes.map((type) => (
                  <button
                    key={type}
                    onClick={() => setActiveProjectFilter(type)}
                    className={`relative text-xs py-1 px-3 border transition-all duration-200 group ${activeProjectFilter === type ? 'bg-[#503822] text-[#f8e1c2] border-[#503822]' : 'bg-transparent text-[#503822] border-[#503822] hover:bg-[#503822] hover:bg-opacity-10'}`}
                  >
                    {activeProjectFilter === type && (
                      <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center bg-[#f8e1c2] border border-[#503822] rounded-full">
                        <span className="text-[#503822] text-[8px]">✓</span>
                      </span>
                    )}
                    {type}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Newspaper headline before projects */}
            <div className="mb-6 flex items-center">
              <div className="w-10 h-10 bg-[#503822] text-[#f8e1c2] flex items-center justify-center mr-4 rotate-3">
                <Briefcase className="w-5 h-5" />
              </div>
              <div>
                <div className="font-serif font-bold text-xl text-[#503822] uppercase tracking-wide leading-tight">CRIMINAL MASTERPIECES</div>
                <div className="text-xs text-[#503822]">Continued from page A1 — Digital Crime Division</div>
              </div>
            </div>
            
            {/* Projects grid styled as newspaper columns */}
            <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 before:content-[''] before:absolute before:h-full before:w-[1px] before:bg-[#503822] before:left-1/3 before:opacity-30 before:top-0 before:hidden before:lg:block after:content-[''] after:absolute after:h-full after:w-[1px] after:bg-[#503822] after:right-1/3 after:opacity-30 after:top-0 after:hidden after:lg:block">
              {projects
                .filter(project => activeProjectFilter === 'All' || project.type === activeProjectFilter)
                .map((project) => (
                <motion.div 
                  key={project.id} 
                  className="relative group cursor-pointer"
                  whileHover={{ y: -5, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => {
                    setSelectedProject(project);
                    setShowProjectModal(true);
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  
                  {/* Shadows and glow effects */}
                  <div className="absolute -inset-1 bg-[#503822] rounded-sm opacity-0 group-hover:opacity-10 transition duration-300 ease-in-out blur-sm group-hover:blur-md"></div>
                  <div className="absolute inset-0 bg-[#503822] opacity-0 group-hover:opacity-5 transition duration-300"></div>
                  
                  {/* Card body with aged paper texture */}
                  <div className="relative border-2 border-[#503822] bg-[#efe0b4] bg-opacity-0 p-5 h-full flex flex-col overflow-hidden shadow-lg"
                       style={{ 
                         backgroundImage: "url('/images/paper-texture-light.png')",
                         boxShadow: "0 10px 15px -3px rgba(80, 56, 34, 0.2), 0 4px 6px -4px rgba(80, 56, 34, 0.2)"
                       }}
                  >
                    {/* Crime identification stamp */}
                    <div className="absolute top-2 left-2 z-30">
                      <div className="relative w-14 h-14 rotate-12 transition-transform group-hover:rotate-6 duration-300">
                        <div className="absolute inset-0 rounded-full border-2 border-[#503822] flex items-center justify-center bg-[#efe0b4] bg-opacity-90 transform rotate-12 overflow-hidden shadow-sm">
                          <div className="text-center text-[#503822]">
                            <div className="text-[8px] font-bold">CRIMINAL</div>
                            <div className="text-[10px] font-bold">FILE</div>
                            <div className="text-[9px] font-mono">{project.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Project image with enhanced newspaper photo styling */}
                    <div className="relative w-full h-56 mb-5 overflow-hidden transform group-hover:scale-[1.01] transition-all duration-500 border border-[#503822]">
                      {/* Vintage noise overlay */}
                      <div className="absolute inset-0 bg-[url('/images/noise-texture.png')] opacity-0 z-10 mix-blend-multiply"></div>
                      
                      {/* Image */}
                      <div className="absolute inset-0 bg-[#503822] bg-opacity-10 z-5 group-hover:bg-opacity-0 transition-all duration-300"></div>
                      <Image 
                        src={project.image} 
                        alt={project.title}
                        fill
                        style={{ objectFit: 'cover' }}
                        className="filter grayscale group-hover:grayscale-0 transition-all duration-500 transform group-hover:scale-110"
                      />
                      
                      {/* Caption strip */}
                      <div className="absolute bottom-0 left-0 right-0 bg-[#503822] bg-opacity-85 p-1.5 text-[#f8e1c2] text-xs z-20 text-center font-serif italic">
                        Crime committed in {project.year}
                      </div>
                      
                      {/* Type badge with improved design */}
                      <div className="absolute top-3 right-3 bg-[#f8e1c2] text-[#503822] py-1 px-2 text-xs font-bold z-20 rotate-3 border border-[#503822] shadow-md transform group-hover:rotate-0 transition-all duration-300">
                        {project.type}
                      </div>
                    </div>
                    
                    {/* Coffee stain for design effect */}
                    <div className="absolute -top-12 -right-12 opacity-10 rotate-12 z-0">
                      <CoffeeStain size="medium" />
                    </div>
                    
                    {/* Project details with enhanced newspaper article styling */}
                    <div className="relative z-10">
                      {/* Headline with subtle shadow for depth */}
                      <h3 className="font-serif font-bold text-2xl text-[#503822] mb-2 leading-tight tracking-tight group-hover:tracking-normal transition-all duration-300 drop-shadow-sm">
                        {project.title}
                      </h3>
                      
                      {/* Newspaper column divider with enhanced styling */}
                      <div className="w-full h-[3px] mb-4 bg-[#503822] relative overflow-visible">
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#efe0b4] px-3 border border-[#503822] border-opacity-30">
                          <div className="h-2 w-2 bg-[#503822] rotate-45"></div>
                        </div>
                      </div>
                      
                      {/* Article first paragraph with improved drop cap */}
                      <div className="text-sm text-[#503822] mb-5 flex-grow relative z-10 font-serif leading-relaxed">
                        <span className="float-left text-[#503822] text-5xl font-serif font-bold mr-2 mt-1 drop-shadow-sm">{project.description.charAt(0)}</span>
                        <span className="bg-[#503822] bg-opacity-10 py-0.5 px-1">{project.description.substring(1, 20)}</span>
                        {project.description.substring(20)}
                      </div>
                      
                      {/* Article footer with enhanced metadata styling */}
                      <div className="flex justify-between items-center text-xs text-[#503822] pt-3 border-t border-[#503822] border-dotted mt-auto">
                        <div className="flex items-center bg-[#503822] bg-opacity-5 py-1 px-2">
                          <Clock className="w-3 h-3 mr-1" />
                          <span className="font-medium">{project.year}</span>
                        </div>
                        <div className="flex items-center">
                          <span className="italic mr-1">{project.category}</span>
                          <div className="w-3 h-3 bg-[#503822] rounded-full opacity-50"></div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Coffee stain decoration */}
                    <div className="absolute -bottom-10 -right-10 opacity-10 rotate-12 z-0 scale-75 transition-transform group-hover:scale-90 duration-500">
                      <CoffeeStain size="medium" />
                    </div>
                    
                    {/* Improved view details button */}
                    <div className="absolute -bottom-10 right-0 left-0 group-hover:bottom-3 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out z-30 text-center transform-gpu">
                      <div className="inline-block bg-[#503822] text-[#f8e1c2] text-xs py-1.5 px-3 shadow-lg border border-[#503822] border-opacity-20 flex items-center justify-center mx-auto">
                        <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                        </svg>
                        <span className="uppercase tracking-wider font-medium">VIEW FULL REPORT</span>
                      </div>
                    </div>
                    
                    {/* Visual ink stamp effect */}
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-[-20deg] opacity-0 group-hover:opacity-5 transition-opacity duration-300 z-20 pointer-events-none">
                      <div className="font-['Chomsky'] text-[#503822] text-5xl whitespace-nowrap">TOP SECRET</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Newspaper advertisement banner */}
            <div className="my-12 border-y-2 border-[#503822] py-4 px-6 bg-[#efe0b4] bg-transparent text-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-5">
                <div className="absolute top-0 left-0 right-0 bottom-0 bg-repeat" style={{ backgroundImage: "url('/images/noise-pattern.png')" }}></div>
              </div>
              <div className="font-bold text-2xl text-[#503822] mb-1">Seeking Collaborators</div>
              <p className="text-sm text-[#503822] mb-2 max-w-lg mx-auto">For future digital heists. Expertise in React, Next.js, Three.js or WebGL highly valued.</p>
              <div className="text-xs text-[#503822] italic">Contact Samy Mebarki through the anonymous tip line. Discretion assured.</div>
            </div>
            
            {/* Evidence and clues section styled as newspaper feature */}
            <div className="mt-12 border-t-2 border-[#503822] pt-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 bg-[#503822] text-[#f8e1c2] flex items-center justify-center mr-3 transform rotate-3">
                  <PenTool className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-xl text-[#503822] uppercase tracking-wide">TOOLS & TECHNIQUES</h3>
                  <div className="text-xs text-[#503822]">The inside story on how these crimes were committed</div>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div className="border-2 border-[#503822] border-dashed p-5 bg-[#efe0b4] bg-transparent relative overflow-hidden">
                  <div className="absolute -top-10 -left-10 opacity-10 rotate-45 z-0">
                    <CoffeeStain size="medium" />
                  </div>
                  <h4 className="font-bold text-[#503822] mb-3 text-lg relative z-10">TECHNOLOGIES UTILIZED</h4>
                  <ul className="text-sm text-[#503822] space-y-2 relative z-10">
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> React.js & Next.js Framework</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Tailwind CSS & GSAP Animations</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Custom WebGL Shaders</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Headless CMS Integration</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Three.js & WebGL for 3D Visualizations</li>
                  </ul>
                </div>
                <div className="border-2 border-[#503822] border-dashed p-5 bg-[#efe0b4] bg-transparent relative overflow-hidden">
                  <div className="absolute -bottom-10 -right-10 opacity-10 rotate-[-30deg] z-0">
                    <CoffeeStain size="medium" />
                  </div>
                  <h4 className="font-bold text-[#503822] mb-3 text-lg relative z-10">INVESTIGATION APPROACH</h4>
                  <ul className="text-sm text-[#503822] space-y-2 relative z-10">
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> User-Centered Design Research</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Wireframing & Rapid Prototyping</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Performance Optimization</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Cross-Browser Testing</li>
                    <li className="flex items-center"><span className="w-2 h-2 bg-[#503822] mr-2"></span> Accessibility & Progressive Enhancement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* Newspaper footer */}
          <div className="border-t-[3px] border-double border-[#503822] pt-3 mt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-2 text-xs text-[#503822]">
              <div className="flex items-center">
                <div className="w-5 h-5 bg-[#503822] text-[#f8e1c2] flex items-center justify-center mr-2">
                  <span className="font-serif text-xs">M</span>
                </div>
                <span>Skilled Criminal Mastermind • Digital Heist Division</span>
              </div>
              <div className="italic">All criminal schemes revealed for public viewing • {format(new Date(), 'MMMM yyyy')}</div>
              <div className="font-mono">Page B-6</div>
            </div>
          </div>
          
          {/* Project Details Modal */}
          {showProjectModal && selectedProject && (
            <div className="fixed inset-0 bg-black bg-opacity-0 flex items-center justify-center z-50 p-4 overflow-hidden">
              <motion.div 
                className="relative bg-transparent border-2 border-[#503822] max-w-4xl w-full max-h-[80vh] overflow-y-auto custom-scrollbar"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                style={{ 
                  background: `
                    linear-gradient(rgba(255,255,255,0.4), rgba(255,255,255,0.4)), url('/images/texture1.jpg'),
                    linear-gradient(rgba(255,255,255,0.7), rgba(255,255,255,0.7)), url('/images/texture_overlay.jpg')
                  `,
                  backgroundBlendMode: "normal, normal, multiply",
                  backgroundSize: "cover, cover, 200px, 200px",
                  backgroundColor: "#f8e1c2"
                }}
              >
                <button 
                  onClick={() => setShowProjectModal(false)}
                  className="absolute top-4 right-4 bg-[#503822] text-[#f8e1c2] w-8 h-8 flex items-center justify-center z-50"
                >
                  ✕
                </button>
                
                {/* Modal header styled as newspaper front page */}
                <div className="border-b-2 border-[#503822] p-6 relative overflow-hidden">
                  <div className="absolute -top-12 -left-12 opacity-10 rotate-12 z-0">
                    <CoffeeStain size="large" />
                  </div>
                  
                  {/* Newspaper dateline and issue number */}
                  <div className="flex justify-between text-xs text-[#503822] mb-3 uppercase tracking-wider">
                    <div>CRIME REPORT</div>
                    <div>{format(new Date(), 'MMMM d, yyyy')}</div>
                    <div>HEIST NO. {selectedProject.id.toString().padStart(3, '0')}</div>
                  </div>
                  
                  {/* Newspaper masthead */}
                  <div className="font-bold text-4xl text-[#503822] text-center mb-2 relative z-10 leading-none">{selectedProject.title}</div>
                  
                  {/* Newspaper decorative line */}
                  <div className="flex items-center justify-center gap-4 mb-3">
                    <div className="h-[1px] bg-[#503822] flex-grow"></div>
                    <div className="h-3 w-3 bg-[#503822] rotate-45"></div>
                    <div className="h-[1px] bg-[#503822] flex-grow"></div>
                  </div>
                  
                  {/* Case metadata presented as newspaper subheadlines */}
                  <div className="grid grid-cols-3 gap-2 relative z-10 mb-2">
                    <div className="border border-[#503822] py-2 px-3 text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#503822] mb-1">CLASSIFIED</div>
                      <div className="text-xs font-bold text-[#503822]">{selectedProject.year}</div>
                    </div>
                    <div className="border border-[#503822] py-2 px-3 text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#503822] mb-1">DIVISION</div>
                      <div className="text-xs font-bold text-[#503822]">{selectedProject.type}</div>
                    </div>
                    <div className="border border-[#503822] py-2 px-3 text-center">
                      <div className="text-[10px] uppercase tracking-wider text-[#503822] mb-1">CATEGORY</div>
                      <div className="text-xs font-bold text-[#503822]">{selectedProject.category}</div>
                    </div>
                  </div>
                </div>
                
                {/* Modal body with project details */}
                <div className="p-6">
                  <div className="relative w-full h-[300px] mb-6 overflow-hidden">
                    <Image 
                      src={selectedProject.image} 
                      alt={selectedProject.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      className="filter grayscale hover:grayscale-0 transition-all duration-500"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                    <div className="md:col-span-2">
                      <h3 className="font-serif font-bold text-lg text-[#503822] mb-3 border-b border-dashed border-[#503822] pb-2">CASE SUMMARY</h3>
                      <p className="text-sm text-[#503822] mb-4 leading-relaxed">{selectedProject.fullDescription}</p>
                      
                      <h3 className="font-serif font-bold text-lg text-[#503822] mb-3 border-b border-dashed border-[#503822] pb-2 mt-6">RESULTS</h3>
                      <p className="text-sm text-[#503822] mb-4 leading-relaxed">{selectedProject.results}</p>
                    </div>
                    
                    <div>
                      <div className="border-2 border-[#503822] border-dashed p-4  bg-opacity-60 mb-4">
                        <h4 className="font-bold text-[#503822] mb-2 text-sm">ROLE</h4>
                        <p className="text-sm text-[#503822]">{selectedProject.role}</p>
                      </div>
                      
                      <div className="border-2 border-[#503822] border-dashed p-4  bg-opacity-60">
                        <h4 className="font-bold text-[#503822] mb-2 text-sm">TECHNOLOGIES</h4>
                        <ul className="text-xs text-[#503822] space-y-1">
                          {selectedProject.technologies.map((tech, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-[#503822] mr-2 mt-1"></span>
                              {tech}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-[#503822] pt-4 flex justify-between items-center text-xs text-[#503822]">
                    <div>Case File #{selectedProject.id.toString().padStart(3, '0')}</div>
                    <div>© {new Date().getFullYear()} Samy Mebarki</div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <footer className="border-t-2 border-[#503822] mt-8 pt-4 text-center text-xs w-full text-[#503822]">
          <div className="mb-2">© {new Date().getFullYear()} Samy Mebarki • Creative Developer & Designer</div>
        </footer>
      </div>
    </div>
  );
}



