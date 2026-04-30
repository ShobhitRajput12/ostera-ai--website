import React from 'react';
import { motion } from 'framer-motion';
import { Database, Cpu, Rocket } from 'lucide-react';

const steps = [
  {
    title: '1. Input Data',
    description: 'Connect your existing data sources or upload files securely.',
    icon: Database,
  },
  {
    title: '2. Process with AI',
    description: 'Our proprietary models analyze and extract valuable insights.',
    icon: Cpu,
  },
  {
    title: '3. Output & Action',
    description: 'Get actionable results integrated directly into your workflow.',
    icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="py-24 relative z-10 bg-gray-900/20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            How it works
          </motion.h2>
          <p className="text-gray-400 text-lg">
            A seamless integration from data to deployed models.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Connecting Line (Desktop) */}

          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="glass-card p-8 flex flex-col items-center text-center group hover:border-primary/50 transition-all hover:translate-y-[-5px]"
              >
                <div className="w-16 h-16 rounded-xl bg-white/5 flex items-center justify-center mb-6 relative z-10 group-hover:scale-110 transition-transform">
                  <step.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
