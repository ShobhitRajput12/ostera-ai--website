import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '../lib/utils';

const plans = [
  {
    name: 'Starter',
    description: 'For individuals and small teams.',
    priceMonthly: 0,
    priceYearly: 0,
    features: ['10k API requests/mo', 'Basic support', 'Standard models', '1 Team member'],
    popular: false,
    color: '#94a3b8',
    glow: 'rgba(148, 163, 184, 0.1)',
  },
  {
    name: 'Pro',
    description: 'For growing businesses and startups.',
    priceMonthly: 49,
    priceYearly: 39,
    features: ['500k API requests/mo', 'Priority support', 'Advanced models (GPT-4)', 'Unlimited team members', 'Custom domains'],
    popular: true,
    color: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.15)',
  },
  {
    name: 'Enterprise',
    description: 'For large scale deployments.',
    priceMonthly: 299,
    priceYearly: 249,
    features: ['Unlimited API requests', '24/7 Phone support', 'Fine-tuning access', 'Dedicated success manager', 'SOC2 Compliance'],
    popular: false,
    color: '#8b5cf6',
    glow: 'rgba(139, 92, 246, 0.1)',
  },
];

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="py-24 relative z-10">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight"
          >
            Simple, transparent pricing
          </motion.h2>
          
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={cn("text-sm", !isYearly ? "text-white font-medium" : "text-gray-400")}>Monthly</span>
            <button 
              onClick={() => setIsYearly(!isYearly)}
              className="w-14 h-7 rounded-full bg-white/5 p-1 relative transition-colors border border-white/10"
            >
              <motion.div 
                layout
                className="w-5 h-5 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                initial={false}
                animate={{ x: isYearly ? 28 : 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            </button>
            <span className={cn("text-sm", isYearly ? "text-white font-medium" : "text-gray-400")}>
              Yearly <span className="text-primary text-xs ml-1">(Save 20%)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={cn(
                "feature-card p-10 flex flex-col relative",
                plan.popular ? "border-primary/40 shadow-[0_0_40px_rgba(59,130,246,0.15)] scale-105 z-10" : "border-white/5"
              )}
              style={{ '--glow-color': plan.glow }}
            >
              <div className="feature-card-glow" />
              
              <div className="relative z-10 flex flex-col h-full">
                {plan.popular && (
                  <div className="absolute -top-14 left-1/2 -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-white px-4 py-1.5 rounded-full text-xs font-bold tracking-wider uppercase">
                    Most Popular
                  </div>
                )}
                
                <h3 className="text-3xl font-bold mb-2 text-white tracking-tight">{plan.name}</h3>
                <p className="text-gray-400 text-base mb-8 min-h-[48px] opacity-80">{plan.description}</p>
                
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white tracking-tight">
                    ${isYearly ? plan.priceYearly : plan.priceMonthly}
                  </span>
                  <span className="text-gray-400 text-lg ml-1">/mo</span>
                </div>

                <button className={cn(
                  "w-full py-4 rounded-xl font-bold transition-all mb-10 tracking-wide",
                  plan.popular 
                    ? "bg-primary hover:bg-primary/90 text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]" 
                    : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
                )}>
                  Get Started
                </button>

                <div className="flex flex-col gap-4 mt-auto">
                  {plan.features.map(feature => (
                    <div key={feature} className="flex items-center gap-3">
                      <div className="p-0.5 rounded-full bg-primary/20">
                        <Check className="w-4 h-4 text-primary shrink-0" />
                      </div>
                      <span className="text-sm text-gray-300 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
