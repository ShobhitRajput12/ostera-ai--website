import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { cn } from '../../lib/utils';

export default function ThemeToggle({ className }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('theme') || 'dark';
    }
    return 'dark';
  });

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "relative h-10 w-10 flex items-center justify-center rounded-full border border-white/10 bg-white/5 backdrop-blur-md transition-all hover:bg-white/10 hover:border-white/20",
        className
      )}
      aria-label="Toggle theme"
    >
      <AnimatePresence mode="wait" initial={false}>
        {theme === 'dark' ? (
          <motion.div
            key="moon"
            initial={{ y: 10, opacity: 0, rotate: -45 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: 45 }}
            transition={{ duration: 0.2 }}
          >
            <Moon className="h-5 w-5 text-indigo-300" />
          </motion.div>
        ) : (
          <motion.div
            key="sun"
            initial={{ y: 10, opacity: 0, rotate: 90 }}
            animate={{ y: 0, opacity: 1, rotate: 0 }}
            exit={{ y: -10, opacity: 0, rotate: -90 }}
            transition={{ duration: 0.2 }}
          >
            <Sun className="h-5 w-5 text-yellow-400" />
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Subtle Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-full blur-lg opacity-20 transition-opacity",
        theme === 'dark' ? "bg-indigo-500" : "bg-yellow-500"
      )} />
    </button>
  );
}
