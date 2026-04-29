import React, { useRef } from 'react';
import Navbar from '../components/Navbar';
import BackgroundCanvas from '../components/BackgroundCanvas';
import Hero from '../components/Hero';
import Features from '../components/Features';
import BentoGrid from '../components/BentoGrid';
import HowItWorks from '../components/HowItWorks';
import Testimonials from '../components/Testimonials';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  const mainRef = useRef(null);

  return (
    <div className="relative min-h-screen overflow-x-clip font-body text-white selection:bg-primary/30">
    
    
      <div className="relative z-10">
        <Navbar />
        <div ref={mainRef} className="relative">
          <BackgroundCanvas scrollTargetRef={mainRef} />

          <main className="relative z-10">
            <Hero />
            <Features />
            <BentoGrid />
            <HowItWorks />
            <Testimonials />
            <Pricing />
            <CTA />
            {/* Cinematic spacer to reveal the final robot frame before footer */}
            <div className="h-[90vh] w-full pointer-events-none"></div>
          </main>
        </div>
        <Footer />
      </div>
    </div>
  );
}
