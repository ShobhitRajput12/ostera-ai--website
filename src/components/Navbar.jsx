import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { cn } from '../lib/utils';
import OsteraLogo from './OsteraLogo';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = ['Home', 'Features', 'Pricing', 'About'];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 border-b border-transparent transition-all duration-300',
        scrolled ? 'glass py-3 border-white/10' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto flex items-center justify-between px-6">
        <OsteraLogo
          className="gap-2.5"
          markClassName="h-9 w-9"
          textClassName="text-lg tracking-[0.12em] sm:text-xl"
        />

        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-sm text-gray-300 transition-colors hover:text-white"
            >
              {link}
            </a>
          ))}

          <button className="rounded-full bg-gradient-to-r from-primary to-secondary px-5 py-2 font-medium text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.28)] hover:from-primary/90 hover:to-secondary/90 hover:shadow-[0_0_24px_rgba(59,130,246,0.42)]">
            Get Started
          </button>

          <a
            href="/gparticle"
            className="flex items-center justify-center rounded-full border border-white/12 bg-white/6 px-5 py-2 text-sm font-medium text-gray-200 backdrop-blur-md transition-all duration-300 hover:border-primary/35 hover:bg-white/10 hover:text-white"
          >
            GPARTICLE
          </a>
        </div>

        <button
          className="text-gray-300 md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>
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
            Get Started
          </button>

          <a
            href="/gparticle"
            className="mt-2 rounded-full border border-white/12 bg-white/6 px-5 py-3 text-center font-medium text-gray-200 backdrop-blur-md transition-all hover:border-primary/35 hover:bg-white/10 hover:text-white"
            onClick={() => setMobileMenuOpen(false)}
          >
            GPARTICLE
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
}
