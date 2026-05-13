import React, { useState, useEffect } from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OsteraLogo from './OsteraLogo';

const COLOR_GRADIENTS = [
  'linear-gradient(135deg, #a78bfa, #818cf8)',
  'linear-gradient(135deg, #f472b6, #fb7185)',
  'linear-gradient(135deg, #34d399, #06b6d4)',
  'linear-gradient(135deg, #fbbf24, #f97316)',
  'linear-gradient(135deg, #60a5fa, #a78bfa)',
  'linear-gradient(135deg, #f9a8d4, #fde68a)',
];

function ColorCyclingText({ children }) {
  const [index, setIndex] = useState(0);
  const [fade, setFade] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);
      setTimeout(() => {
        setIndex(prev => (prev + 1) % COLOR_GRADIENTS.length);
        setFade(true);
      }, 300);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span
      style={{
        backgroundImage: COLOR_GRADIENTS[index],
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        transition: 'opacity 0.3s ease',
        opacity: fade ? 1 : 0,
        display: 'inline-block',
      }}
    >
      {children}
    </span>
  );
}

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-x-clip pt-20">

      <div className="container mx-auto px-6 relative z-10 flex w-full items-center -mt-20 lg:-mt-36">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-20">
            <div>

              <motion.div
                id="hero-logo-badge"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-[18px] inline-flex items-center gap-3.5 px-6 py-3 rounded-full glass-card border-white/10 mb-8 !overflow-visible sm:mt-0"
              >
                <OsteraLogo
                  showText
                  className="gap-3.5 sm:gap-4.5"
                  markClassName="h-9 w-auto max-h-11 object-contain object-left sm:h-11"
                  textClassName="text-xl font-semibold uppercase tracking-[0.12em] sm:text-2xl text-secondary"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl md:text-5xl lg:text-7xl font-bold font-heading tracking-tight leading-tight mb-6"
              >
                On-Device <br />
                <ColorCyclingText>Intelligence</ColorCyclingText> <br />
                That Powers <br />
                Real India.
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6"
              >
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
                  Explore Our Prototypes
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-full glass transition-colors text-foreground font-medium">
                  Watch Demo Reel
                </button>
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative flex items-center justify-center z-10">
            <div
              className="absolute inset-0 w-[300%] h-full -left-[100%] flex items-center justify-center"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
            >
              <Spline
                scene="https://prod.spline.design/XLRlxGQoAOtuJEef/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
