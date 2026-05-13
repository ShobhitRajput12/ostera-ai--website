import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from './ui/spotlight-card';

export default function CTA() {
  return (
    <section id="contact" className="pt-24 pb-12 md:pb-24 relative z-10 overflow-hidden scroll-mt-24">
      <div className="container mx-auto px-6 relative z-10">
        <GlowCard 
          className="max-w-5xl mx-auto rounded-3xl p-12 md:p-20 text-center relative overflow-hidden"
          glowColor="purple"
          backdrop="hsl(0 0% 60% / 0.09)"
          customSize
        >
          <div className="relative z-10">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-bold mb-6 font-heading tracking-tight text-foreground"
            >
              On-Device Intelligence <br /> That Powers Real India.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-xl text-foreground/70 mb-10 max-w-2xl mx-auto"
            >
              100% Offline | Zero Latency | Privacy First | Patent-Protected
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-4"
            >
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold hover:scale-105 transition-transform shadow-[0_0_30px_rgba(59,130,246,0.3)]">
                Request Live Demo
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white font-semibold transition-colors">
                Partner With Us
              </button>
              <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground/5 border border-foreground/10 hover:bg-foreground/10 text-foreground font-medium transition-colors">
                Join Early Access Program
              </button>
            </motion.div>
          </div>
        </GlowCard>
      </div>
    </section>
  );
}
