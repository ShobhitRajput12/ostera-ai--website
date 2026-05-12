import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, MessageSquare, Code, Cpu, Layers } from 'lucide-react';
import { GlowCard } from './ui/spotlight-card';

const bentoItems = [
  {
    title: 'GCar Intelligence Suite',
    description: 'Makes every car intelligent with on-device vision, safety & predictive maintenance.',
    icon: ImageIcon,
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.15)',
    className: 'md:col-span-2',
    isLarge: true,
  },
  {
    title: 'Rail Buddy',
    description: 'Mission-critical AI assistant for Southern Railways — real-time alerts and loco pilot support.',
    icon: MessageSquare,
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.15)',
    className: 'md:col-span-1',
  },
  {
    title: 'BNova AI',
    description: 'Adaptive offline learning companion for JEE, NEET, UPSC & competitive exams.',
    icon: Code,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.15)',
    className: 'md:col-span-1',
  },
  {
    title: 'Ostera Core Engine',
    description: 'Powered by our patent-pending on-device architecture.',
    icon: Cpu,
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.15)',
    className: 'md:col-span-1',
  },
  {
    title: 'EdgeForge Toolkit',
    description: 'Build once, deploy everywhere — Android, iOS & embedded systems.',
    icon: Layers,
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.15)',
    className: 'md:col-span-1',
  },
];

export default function BentoGrid() {
  return (
    <section className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-foreground tracking-tight"
          >
            Real Products. Real Impact.
          </motion.h2>
          <p className="text-foreground/70 text-lg">
            Engineered for India's Edge. Proven in the field.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px] max-w-6xl mx-auto lg:px-8">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${item.className} h-full`}
            >
              <GlowCard
                className="h-full p-10 group relative flex flex-col"
                glowColor={index % 2 === 0 ? 'purple' : 'blue'}
                customSize
              >
                <div className="relative z-10 h-full flex flex-col">
                  <div className="feature-icon-box mb-6 group-hover:scale-105 transition-transform duration-500">
                    <item.icon size={24} color={item.color} strokeWidth={1.5} />
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{ background: item.color, filter: 'blur(8px)' }}
                    />
                  </div>

                  <h3 className={`font-bold mb-3 text-foreground tracking-tight ${item.isLarge ? 'text-2xl' : 'text-xl'}`}>
                    {item.title}
                  </h3>

                  <p className="text-base font-normal leading-relaxed text-foreground/70 opacity-90 transition-opacity duration-300 group-hover:opacity-100">
                    {item.description}
                  </p>

                  {item.title === 'GCar Intelligence Suite' && (
                    <div className="mt-auto w-full h-24 bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-xl animate-pulse" />
                      <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-8 bg-white/5 rounded-lg border border-white/10 flex items-center px-4">
                        <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                      </div>
                    </div>
                  )}


                </div>
              </GlowCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
