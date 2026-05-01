import React from 'react';
import { motion } from 'framer-motion';
import { Image as ImageIcon, MessageSquare, Code, Mic } from 'lucide-react';

const bentoItems = [
  {
    title: 'AI Image Generation',
    description: 'Create stunning, high-resolution images from text prompts in seconds. Perfect for mockups and assets.',
    icon: ImageIcon,
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.15)',
    className: 'md:col-span-2',
    isLarge: true,
  },
  {
    title: 'Conversational AI',
    description: 'Deploy intelligent chatbots that understand context and nuance.',
    icon: MessageSquare,
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.15)',
    className: 'md:col-span-1',
  },
  {
    title: 'Code Generation',
    description: 'Accelerate development with AI-pair programming and auto-completion.',
    icon: Code,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.15)',
    className: 'md:col-span-1',
  },
  {
    title: 'Voice Synthesis',
    description: 'Generate ultra-realistic voiceovers in 50+ languages with emotional range.',
    icon: Mic,
    color: '#ec4899',
    glow: 'rgba(236, 72, 153, 0.15)',
    className: 'md:col-span-2',
    isLarge: true,
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
            className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
          >
            The ultimate AI toolkit
          </motion.h2>
          <p className="text-gray-400 text-lg">
            Everything you need to build next-generation applications in one unified platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
          {bentoItems.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`feature-card p-10 group relative flex flex-col ${item.className}`}
              style={{ '--glow-color': item.glow }}
            >
              <div className="feature-card-glow" />
              
              <div className="relative z-10 h-full flex flex-col">
                <div className="feature-icon-box mb-6 group-hover:scale-105 transition-transform duration-500">
                  <item.icon size={24} color={item.color} strokeWidth={1.5} />
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{ background: item.color, filter: 'blur(8px)' }}
                  />
                </div>
                
                <h3 className={`font-bold mb-3 text-white tracking-tight ${item.isLarge ? 'text-2xl' : 'text-xl'}`}>
                  {item.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-sm font-normal opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {item.description}
                </p>

                {item.title === 'AI Image Generation' && (
                  <div className="mt-auto w-full h-24 bg-white/5 rounded-2xl overflow-hidden border border-white/5 relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-transparent blur-xl animate-pulse" />
                    <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 h-8 bg-white/5 rounded-lg border border-white/10 flex items-center px-4">
                       <div className="w-1/2 h-2 bg-white/10 rounded-full" />
                    </div>
                  </div>
                )}

                {item.title === 'Voice Synthesis' && (
                  <div className="mt-auto flex items-end gap-1.5 h-16">
                    {[...Array(30)].map((_, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ height: 10 }}
                        animate={{ height: [10, Math.random() * 40 + 10, 10] }}
                        transition={{ 
                          repeat: Infinity, 
                          duration: 1.5, 
                          delay: i * 0.05,
                          ease: "easeInOut"
                        }}
                        className="w-1.5 rounded-full"
                        style={{ backgroundColor: item.color, opacity: 0.4 }}
                      />
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
