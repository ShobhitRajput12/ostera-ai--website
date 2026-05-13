import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from './ui/spotlight-card';

const logos = [
  { name: 'IITM Incubation Cell', src: '/IC Round Logo.png' },
  { name: 'IITM Pravartak', src: '/pravartak-logo.jpeg' },
  { name: 'RTBI', src: '/RTBI transparent logo.png' },
];

export default function BackedBy() {
  return (
    <section id="company" className="relative z-10 overflow-hidden py-24 scroll-mt-24">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
          >
            Backed By
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg"
          >
            Supported by India's premier technological and research institutions.
          </motion.p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {logos.map((logo, index) => (
            <div
              key={logo.name}
              className="mx-auto flex w-full max-w-[320px] flex-col items-center justify-center"
            >
                <GlowCard
                  className="group relative flex min-h-[150px] w-full flex-col items-center justify-center overflow-hidden p-5"
                  glowColor={index % 2 === 0 ? 'purple' : 'blue'}
                  customSize
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10 transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] md:h-20 md:w-20">
                      <img
                        src={logo.src}
                        alt={logo.name}
                        className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'block';
                        }}
                      />
                      <span className="hidden text-[10px] text-center font-bold font-heading tracking-tight text-foreground/80">
                        {logo.name}
                      </span>
                    </div>

                    <div className="mt-3 text-[10px] font-semibold tracking-wider text-center text-foreground/40 uppercase whitespace-normal transition-colors duration-500 group-hover:text-foreground/80">
                      {logo.name}
                    </div>
                  </div>
                </GlowCard>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
