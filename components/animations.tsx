"use client"

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function useFadeIn(ref: React.RefObject<HTMLElement>, delay = 0) {
  useEffect(() => {
    if (!ref.current) return;
    
    gsap.from(ref.current, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      delay,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
  }, [ref, delay]);
}

export function useStaggeredFadeIn(selector: string, stagger = 0.1) {
  useEffect(() => {
    const elements = document.querySelectorAll(selector);
    if (!elements.length) return;

    gsap.from(elements, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      stagger: stagger,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: elements[0].parentElement,
        start: 'top 85%',
        toggleActions: 'play none none none'
      }
    });
  }, [selector, stagger]);
}

export function useParallax(ref: React.RefObject<HTMLElement>, speed = 0.3) {
  useEffect(() => {
    if (!ref.current) return;

    const y = window.innerHeight * speed;
    gsap.to(ref.current, {
      y: y,
      scrollTrigger: {
        trigger: ref.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true
      }
    });
  }, [ref, speed]);
}

export function useHoverScale(ref: React.RefObject<HTMLElement>, scale = 1.05) {
  useEffect(() => {
    if (!ref.current) return;

    const element = ref.current;
    
    const onHover = () => {
      gsap.to(element, {
        scale: scale,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    const onHoverOut = () => {
      gsap.to(element, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out'
      });
    };

    element.addEventListener('mouseenter', onHover);
    element.addEventListener('mouseleave', onHoverOut);

    return () => {
      element.removeEventListener('mouseenter', onHover);
      element.removeEventListener('mouseleave', onHoverOut);
    };
  }, [ref, scale]);
}

export function useTextReveal(ref: React.RefObject<HTMLElement>) {
  useEffect(() => {
    if (!ref.current) return;
    
    const text = ref.current.textContent || '';
    ref.current.textContent = '';
    
    const chars = text.split('');
    chars.forEach((char, i) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.display = 'inline-block';
      span.style.opacity = '0';
      span.style.transform = 'translateY(20px)';
      
      ref.current?.appendChild(span);
      
      gsap.to(span, {
        opacity: 1,
        y: 0,
        duration: 0.5,
        delay: i * 0.03,
        ease: 'power2.out'
      });
    });
  }, [ref]);
}
