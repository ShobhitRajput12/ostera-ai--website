import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import OsteraLogo from './OsteraLogo';
import ThemeToggle from './ui/ThemeToggle';
import ContactModal from './ContactModal';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20);

      const nav = navRef.current;
      const heroLogo = document.getElementById('hero-logo-badge');

      if (!nav || !heroLogo) {
        setShowNavLogo(false);
        return;
      }

      const navRect = nav.getBoundingClientRect();
      const heroLogoRect = heroLogo.getBoundingClientRect();

      // Reveal the navbar logo only once the hero logo has moved fully behind it.
      setShowNavLogo(heroLogoRect.bottom <= navRect.bottom);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);

    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const navLinks = ['Partners', 'Products'];

  return (
    <motion.nav
      ref={navRef}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled ? 'glass py-2' : 'bg-transparent py-3.5 border-transparent'
      )}
    >
      <div
        className={cn(
          'container mx-auto flex items-center gap-4 px-6',
          showNavLogo ? 'justify-between' : 'justify-end'
        )}
      >
        <AnimatePresence mode="wait">
          {showNavLogo && (
            <motion.div
              key="nav-logo"
              initial={{ opacity: 0, x: -28, filter: 'blur(6px)' }}
              animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, x: -20, filter: 'blur(4px)' }}
              transition={{
                duration: 0.45,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-1 flex shrink-0 items-center sm:mt-0"
            >
              <a
                href="#home"
                className="rounded-md outline-none ring-offset-2 ring-offset-[#0f0a19] focus-visible:ring-2 focus-visible:ring-primary/60"
                aria-label="Ostera AI Home"
              >
                <OsteraLogo showText markClassName="h-11 w-auto sm:h-12" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}


          <button 
            onClick={() => setIsContactModalOpen(true)}
            className="rounded-full glass px-6 py-2.5 font-medium text-foreground transition-all bg-white/40 dark:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/60 dark:hover:bg-white/20"
          >
            Contact Us
          </button>
          
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-4 md:hidden">
          <ThemeToggle />
          <button
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass mt-20 flex flex-col gap-4 border-t border-white/10 px-6 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase().replace(/\s+/g, '-')}`}
              className="py-2 text-gray-300 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}

          <button 
            onClick={() => {
              setIsContactModalOpen(true);
              setMobileMenuOpen(false);
            }}
            className="mt-2 text-center rounded-full glass px-5 py-3 font-medium text-foreground transition-all bg-white/40 dark:bg-white/10 shadow-[0_0_15px_rgba(255,255,255,0.3)] dark:shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:bg-white/60 dark:hover:bg-white/20"
          >
            Contact Us
          </button>
        </motion.div>
      )}

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </motion.nav>
  );
}
