import React, { useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BackedBy from '../components/BackedBy';
import Features from '../components/Features';
import BentoGrid from '../components/BentoGrid';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';
import ParticleWaves from '../components/ui/particle-waves';
import ContactModal from '../components/ContactModal';

export default function Home() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const mainRef = useRef(null);

  return (
    <div className="relative min-h-screen overflow-x-clip font-body text-foreground selection:bg-primary/30 transition-colors duration-300">
      <div className="fixed inset-0 bg-background -z-20" />

      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_50%,rgba(147,51,234,0.12),transparent_80%)]" />
        <ParticleWaves />
      </div>

      <div className="relative z-10">
        <Navbar onContactClick={() => setIsContactModalOpen(true)} />
        <div ref={mainRef} className="relative">
          <main className="relative z-10">
            <Hero />
            <BackedBy />

            <div className="relative space-y-4 md:space-y-0">
              <Pricing />
              <Footer onContactClick={() => setIsContactModalOpen(true)} />
            </div>
          </main>
        </div>
      </div>

      <ContactModal 
        isOpen={isContactModalOpen} 
        onClose={() => setIsContactModalOpen(false)} 
      />
    </div>
  );
}
