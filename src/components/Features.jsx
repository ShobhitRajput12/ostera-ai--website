import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Globe } from 'lucide-react';
import { GlowCard } from './ui/spotlight-card';

const features = [
  {
    title: '100% Offline',
    description: 'No internet. No cloud. Works in the remotest parts of India.',
    icon: Zap,
    color: '#facc15',
    glow: 'rgba(250, 204, 21, 0.12)',
  },
  {
    title: 'Zero Latency',
    description: 'Sub-100ms responses. Instant intelligence where it matters most.',
    icon: Shield,
    color: '#4ade80',
    glow: 'rgba(74, 222, 128, 0.12)',
  },
  {
    title: 'Privacy First',
    description: 'Your data never leaves the device.',
    icon: BarChart3,
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.12)',
  },
  {
    title: 'Patent-Protected Power',
    description: 'WO2025073424A1 — Cloud-level AI on everyday Indian hardware.',
    icon: Globe,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.12)',
  },
];

export default function Features() {
  return (
    <section id="features" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
          >
            Intelligence That Belongs to the Device
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/70 text-lg"
          >
            Cloud-level AI on everyday Indian hardware. Zero dependencies, maximum privacy.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto lg:px-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="h-full"
            >
              <GlowCard 
                className="h-full p-10 group flex flex-col" 
                glowColor={index % 2 === 0 ? 'purple' : 'blue'}
                customSize
              >
                <div className="relative z-10">
                  <div className="feature-icon-box group-hover:scale-105 transition-transform duration-500">
                    <feature.icon size={26} color={feature.color} strokeWidth={1.5} />
                    <div 
                      className="absolute inset-0 opacity-10"
                      style={{ background: feature.color, filter: 'blur(8px)' }}
                    />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 text-foreground tracking-tight">
                    {feature.title}
                  </h3>
                  
                  <p className="text-foreground/70 leading-relaxed text-base font-normal opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                    {feature.description}
                  </p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

