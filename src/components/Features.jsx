import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, BarChart3, Globe, Cpu, Layers } from 'lucide-react';

const features = [
  {
    title: 'Lightning Fast AI',
    description: 'Process millions of data points in milliseconds with our optimized infrastructure.',
    icon: Zap,
    color: '#facc15',
    glow: 'rgba(250, 204, 21, 0.12)',
  },
  {
    title: 'Enterprise Security',
    description: 'Bank-grade encryption and SOC2 compliance to keep your data safe.',
    icon: Shield,
    color: '#4ade80',
    glow: 'rgba(74, 222, 128, 0.12)',
  },
  {
    title: 'Advanced Analytics',
    description: 'Deep insights and predictive modeling to drive your business forward.',
    icon: BarChart3,
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.12)',
  },
  {
    title: 'Global Edge Network',
    description: 'Deploy your AI agents to the edge for zero-latency responses worldwide.',
    icon: Globe,
    color: '#06b6d4',
    glow: 'rgba(6, 182, 212, 0.12)',
  },
  {
    title: 'Custom Models',
    description: 'Train and deploy fine-tuned models specific to your industry needs.',
    icon: Cpu,
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.12)',
  },
  {
    title: 'Seamless Integration',
    description: 'Connect with your existing tools through our extensive API ecosystem.',
    icon: Layers,
    color: '#f472b6',
    glow: 'rgba(244, 114, 182, 0.12)',
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
            className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
          >
            Supercharge your workflow
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-gray-400 text-lg"
          >
            Everything you need to build, deploy, and scale AI applications without the headache.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
              className="feature-card p-10 group flex flex-col"
              style={{ '--glow-color': feature.glow }}
            >
              <div className="feature-card-glow" />
              
              <div className="relative z-10">
                <div className="feature-icon-box group-hover:scale-105 transition-transform duration-500">
                  <feature.icon size={26} color={feature.color} strokeWidth={1.5} />
                  <div 
                    className="absolute inset-0 opacity-10"
                    style={{ background: feature.color, filter: 'blur(8px)' }}
                  />
                </div>
                
                <h3 className="text-2xl font-bold mb-4 text-white tracking-tight">
                  {feature.title}
                </h3>
                
                <p className="text-gray-400 leading-relaxed text-base font-normal opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
