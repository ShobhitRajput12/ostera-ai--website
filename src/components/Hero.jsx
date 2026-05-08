import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import OsteraLogo from './OsteraLogo';

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center justify-center overflow-x-clip pt-20">

      <div className="container mx-auto px-6 relative z-10 flex w-full items-center -mt-10 lg:-mt-24">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row">
          <div className="w-full lg:w-1/2 text-center lg:text-left relative z-20">
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mt-[18px] inline-flex items-center gap-3.5 px-6 py-3 rounded-full glass-card border-white/10 mb-8 !overflow-visible sm:mt-0"
              >
                <OsteraLogo
                  showText
                  className="gap-2.5 sm:gap-3.5"
                  markClassName="h-7 w-auto max-h-9 object-contain object-left sm:h-9"
                  textClassName="text-base font-semibold uppercase tracking-[0.12em] sm:text-lg text-secondary"
                />
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-5xl md:text-7xl lg:text-8xl font-bold font-heading tracking-tight leading-tight mb-6"
              >
                Build the <span className="text-gradient">Future</span> <br className="hidden md:block" /> with AI
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg md:text-xl text-foreground/70 max-w-2xl mb-10"
              >
                Empower your workflow with intelligent agents, seamless integrations, and real-time insights. The next generation of SaaS is here.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
              >
                <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-foreground text-background font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group">
                  Start Building Free
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="w-full sm:w-auto px-8 py-4 rounded-full glass transition-colors text-foreground font-medium">
                  Book a Demo
                </button>
              </motion.div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 h-[50vh] lg:h-screen relative flex items-center justify-center z-10">
            <div
              className="absolute inset-0 w-[300%] h-full -left-[100%] flex items-center justify-center"
              style={{ WebkitMaskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)', maskImage: 'linear-gradient(to bottom, black 85%, transparent 100%)' }}
            >
              <Spline
                scene="https://prod.spline.design/XLRlxGQoAOtuJEef/scene.splinecode"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
