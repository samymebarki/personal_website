'use client';

import { useEffect, useRef, ReactNode } from 'react';

// Dynamically import GSAP to avoid SSR issues
let gsap: any;
let ScrollTrigger: any;

if (typeof window !== 'undefined') {
  // Only import GSAP on the client side
  gsap = require('gsap');
  ScrollTrigger = require('gsap/ScrollTrigger').ScrollTrigger;
  
  // Register the ScrollTrigger plugin
  gsap.registerPlugin(ScrollTrigger);
}

type FadeInProps = {
  children: ReactNode;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  distance?: number;
  duration?: number;
  triggerPosition?: string; // e.g., "top 80%"
  className?: string;
};

export const FadeIn = ({
  children,
  delay = 0,
  direction = 'up',
  distance = 50,
  duration = 0.8,
  triggerPosition = "top 85%",
  className = "",
}: FadeInProps) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    // Set initial state based on direction
    let initialX = 0;
    let initialY = 0;

    switch (direction) {
      case 'up':
        initialY = distance;
        break;
      case 'down':
        initialY = -distance;
        break;
      case 'left':
        initialX = distance;
        break;
      case 'right':
        initialX = -distance;
        break;
      case 'none':
        initialX = 0;
        initialY = 0;
        break;
    }

    // Create animation timeline
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: triggerPosition,
        toggleActions: "play none none none",
      },
    });

    tl.fromTo(
      element,
      {
        x: initialX,
        y: initialY,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: duration,
        delay: delay,
        ease: "power2.out",
      }
    );

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [delay, direction, distance, duration, triggerPosition]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

type TextRevealProps = {
  children: ReactNode;
  delay?: number;
  staggerDelay?: number;
  triggerPosition?: string;
  className?: string;
};

// Text reveal animation that shows text character by character
export const TextReveal = ({
  children,
  delay = 0,
  staggerDelay = 0.02,
  triggerPosition = "top 85%",
  className = "",
}: TextRevealProps) => {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into individual spans
    let textContent = element.innerHTML;
    element.innerHTML = '';
    const wrapper = document.createElement('div');
    wrapper.innerHTML = textContent;

    // Process text nodes
    const processNode = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || '';
        const fragment = document.createDocumentFragment();
        
        [...text].forEach(char => {
          const span = document.createElement('span');
          span.textContent = char === ' ' ? '\u00A0' : char; // Use non-breaking space for actual spaces
          span.style.display = 'inline-block';
          span.style.opacity = '0';
          span.className = 'reveal-char';
          fragment.appendChild(span);
        });
        
        node.parentNode?.replaceChild(fragment, node);
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        node.childNodes.forEach(processNode);
      }
    };
    
    processNode(wrapper);
    element.appendChild(wrapper);

    // Animate
    const chars = element.querySelectorAll('.reveal-char');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: triggerPosition,
        toggleActions: "play none none none",
      },
    });

    tl.from(chars, {
      opacity: 0,
      y: 10,
      stagger: staggerDelay,
      duration: 0.5,
      delay: delay,
      ease: "power2.out",
    });

    // Cleanup
    return () => {
      if (tl.scrollTrigger) {
        tl.scrollTrigger.kill();
      }
      tl.kill();
    };
  }, [delay, staggerDelay, triggerPosition]);

  return (
    <div ref={textRef} className={className}>
      {children}
    </div>
  );
};

// Parallax effect for background elements
export const Parallax = ({
  children,
  speed = 0.5,
  className = "",
}: {
  children: ReactNode;
  speed?: number;
  className?: string;
}) => {
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    gsap.to(element, {
      y: () => speed * 100,
      ease: "none",
      scrollTrigger: {
        trigger: element,
        start: "top bottom",
        end: "bottom top",
        scrub: true,
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger: any) => trigger.kill());
    };
  }, [speed]);

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
};

// Animated button with hover effects
export const AnimatedButton = ({
  children,
  className = "",
  onClick,
}: {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
}) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Define hover animation
    const enterAnimation = () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const leaveAnimation = () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    // Add event listeners
    button.addEventListener("mouseenter", enterAnimation);
    button.addEventListener("mouseleave", leaveAnimation);

    return () => {
      button.removeEventListener("mouseenter", enterAnimation);
      button.removeEventListener("mouseleave", leaveAnimation);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      className={`transition-all ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
