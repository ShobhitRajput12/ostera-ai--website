import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';
import { GlowCard } from './ui/spotlight-card';

const products = [
  {
    name: 'GCar',
    description: 'Intelligent Mobility for Indian Roads',
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    name: 'Rail Buddy',
    description: 'Safety & Efficiency for Indian Railways',
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.15)',
  },
  {
    name: 'BNova AI',
    description: 'Offline Exam Mastery',
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.15)',
  },
  {
    name: 'Ostera Runtime',
    description: 'Lightweight SDK for developers',
    color: '#facc15',
    glow: 'rgba(250, 204, 21, 0.15)',
  },
  {
    name: 'EdgeForge Studio',
    description: 'On-device model optimization platform',
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.15)',
  },
];

export default function Pricing() {
  return (
    <section id="showcase" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
          >
            Product Showcase
          </motion.h2>
          <p className="text-foreground/70 text-lg">
            Engineered for India's Edge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "h-full flex flex-col relative",
                index === 3 || index === 4 ? "lg:col-span-1 lg:max-w-md lg:mx-auto w-full" : ""
              )}
            >
              <GlowCard 
                className="h-full p-10 flex flex-col relative"
                glowColor={index % 2 !== 0 ? 'purple' : 'blue'}
                customSize
              >
                <div className="relative z-10 flex flex-col h-full items-center text-center">
                  <h3 className="text-3xl font-bold mb-4 text-foreground tracking-tight">{product.name}</h3>
                  <p className="text-foreground/70 text-lg mb-8 min-h-[48px] opacity-80">{product.description}</p>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
