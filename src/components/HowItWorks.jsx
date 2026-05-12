import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Rocket } from 'lucide-react';
import { GlowCard } from './ui/spotlight-card';

const steps = [
  {
    title: '01. Integrate Ostera',
    description: 'Into vehicles, trains, or learning devices.',
    icon: Database,
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.12)',
  },
  {
    title: '02. Run On-Device',
    description: 'Using our patented compression & inference engine.',
    icon: Cpu,
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.12)',
  },
  {
    title: '03. Deliver Instant Impact',
    description: 'Fully offline, zero latency, maximum privacy.',
    icon: Rocket,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.12)',
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
          >
            How It Works
          </motion.h2>
          <p className="text-foreground/70 text-lg">
            Three Steps to On-Device AI
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="h-full"
              >
                <GlowCard 
                  className="h-full p-10 flex flex-col items-center text-center group" 
                  glowColor={index === 1 ? 'purple' : 'blue'}
                  customSize
                >
                  <div className="relative z-10">
                    <div className="feature-icon-box mx-auto group-hover:scale-110 transition-transform duration-500">
                      <step.icon size={24} color={step.color} strokeWidth={1.5} />
                      <div
                        className="absolute inset-0 opacity-10"
                        style={{ background: step.color, filter: 'blur(8px)' }}
                      />
                    </div>

                    <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">{step.title}</h3>
                    <p className="text-foreground/70 text-base leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                      {step.description}
                    </p>
                  </div>
                </GlowCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
