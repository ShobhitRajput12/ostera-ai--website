import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BentoGrid from '../components/BentoGrid';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import ParticleWaves from '../components/ui/particle-waves';


export default function Home() {
  const mainRef = useRef(null);
  const { scrollYProgress } = useScroll();
  
  // Fade in background effect after the hero section starts (approx first 5% of page)
  const bgOpacity = useTransform(scrollYProgress, [0, 0.05], [0.25, 0.8]);

  return (
    <div className="relative min-h-screen overflow-x-clip font-body text-foreground selection:bg-primary/30 transition-colors duration-300">
      {/* 
        Base Background Layer
      */}
      <div className="fixed inset-0 bg-[#050505] -z-20" />

      {/* 
        Fixed Background Effect Layer
        Fades in after the hero section
      */}
      <motion.div 
        style={{ opacity: bgOpacity }}
        className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.12),transparent_80%)]" />
        <ParticleWaves />
      </motion.div>

      <div className="relative z-10">
        <Navbar />
        <div ref={mainRef} className="relative">
          <main className="relative z-10">
            <Hero />

            <div className="relative">
              <Features />
              <BentoGrid />
              <HowItWorks />
              <Testimonials />
              <Pricing />
              <CTA />
              <Footer />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
