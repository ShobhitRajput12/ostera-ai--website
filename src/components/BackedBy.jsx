import React from 'react';
import { motion } from 'framer-motion';
import { GlowCard } from './ui/spotlight-card';

const logos = [
  { name: 'IITM Incubation Cell', src: '/IC Round Logo.png' },
  { name: 'IITM Pravartak', src: '/pravartak-logo.jpeg' },
  { name: 'RTBI', src: '/RTBI transparent logo.png' },
];

export default function BackedBy() {
  const duplicatedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <section className="py-24 relative z-10 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
          >
            Backed By & Incubated At
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

        {/* Infinite Scrolling Marquee Container */}
        <div className="relative flex overflow-hidden group/marquee">
          {/* Gradient Fades for edges */}
          <div className="absolute inset-y-0 left-0 w-24 md:w-48 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 md:w-48 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          <motion.div
            className="flex gap-6 whitespace-nowrap py-10"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex flex-col items-center justify-center min-w-[220px] md:min-w-[280px]"
              >
                <GlowCard
                  className="w-full p-6 flex flex-col items-center justify-center min-h-[180px] relative group overflow-hidden"
                  glowColor={index % 2 === 0 ? 'purple' : 'blue'}
                  customSize
                >
                  {/* Subtle gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  
                  <div className="relative z-10 flex flex-col items-center justify-center w-full h-full">
                    {/* Premium White Badge Container */}
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] flex items-center justify-center p-4 transition-all duration-500 ease-out group-hover:shadow-[0_0_40px_rgba(255,255,255,0.15)] group-hover:-translate-y-1 ring-1 ring-white/10">
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
                    
                    {/* Subtle Label Below */}
                    <div className="mt-4 text-[10px] font-semibold tracking-wider text-foreground/40 uppercase group-hover:text-foreground/80 transition-colors duration-500 whitespace-normal text-center">
                      {logo.name}
                    </div>
                  </div>
                </GlowCard>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
