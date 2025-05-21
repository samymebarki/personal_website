import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { gsap } from 'gsap';

const BurgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';
      
      // Animate menu items
      gsap.from('.menu-item', {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: 'power3.out'
      });
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuVariants = {
    closed: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    open: {
      x: '0%',
      transition: {
        type: 'tween',
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const menuItems = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <>
      <button
        className="fixed top-6 right-6 z-50 w-12 h-12 flex flex-col justify-center items-center gap-2 bg-[#503822] rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={`w-6 h-0.5 bg-[#f8e1c2] transition-all duration-300 ${
            isOpen ? 'rotate-45 translate-y-2.5' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-[#f8e1c2] transition-all duration-300 ${
            isOpen ? 'opacity-0' : ''
          }`}
        />
        <span
          className={`w-6 h-0.5 bg-[#f8e1c2] transition-all duration-300 ${
            isOpen ? '-rotate-45 -translate-y-2.5' : ''
          }`}
        />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-[#503822] flex flex-col justify-center items-center"
          >
            <nav className="flex flex-col items-center gap-8">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="menu-item text-[#f8e1c2] text-4xl font-playfair hover:text-white transition-colors duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default BurgerMenu;