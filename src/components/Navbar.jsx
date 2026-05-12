import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import OsteraLogo from './OsteraLogo';
import ThemeToggle from './ui/ThemeToggle';

/** Scroll past ~72% of viewport ≈ leaving hero (min-h-screen) */
function isPastHero() {
  if (typeof window === 'undefined') return false;
  return window.scrollY > window.innerHeight * 0.72;
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [showNavLogo, setShowNavLogo] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const update = () => {
      setScrolled(window.scrollY > 20);
      setShowNavLogo(isPastHero());
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  const navLinks = ['Capabilities', 'Impact', 'Products', 'Contact'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b',
        scrolled
          ? 'glass py-2'
          : 'bg-transparent py-3.5 border-transparent'
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
                aria-label="Ostera AI — Home"
              >
                <OsteraLogo showText themeAware markClassName="h-11 w-auto sm:h-12" />
              </a>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-foreground/70 transition-colors hover:text-foreground"
            >
              {link}
            </a>
          ))}

          <button className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 font-medium text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.28)] hover:from-primary/90 hover:to-secondary/90 hover:shadow-[0_0_24px_rgba(59,130,246,0.42)]">
            Request Demo
          </button>

          <a
            href="/gparticle"
            className="flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-2 text-sm font-medium text-gray-200 backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:bg-white/10 hover:text-white"
          >
            GParticle
          </a>
          
          <ThemeToggle />
        </div>

        <div className="relative md:hidden flex flex-col items-end">
          <button
            className="text-foreground"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
          <div className="absolute top-full mt-3 -right-2">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="glass mt-3 flex flex-col gap-4 border-t border-white/10 px-6 py-4 md:hidden"
        >
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="py-2 text-gray-300 transition-colors hover:text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link}
            </a>
          ))}

          <button className="mt-2 rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-3 font-medium text-white">
            Request Demo
          </button>

          <a
            href="/gparticle"
            className="mt-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center font-medium text-gray-200 backdrop-blur-md transition-all hover:border-primary/35 hover:bg-white/10 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            GParticle
          </a>


        </motion.div>
      )}
    </motion.nav>
  );
}
