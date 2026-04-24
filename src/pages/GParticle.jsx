import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const BRAND_WORDS = ['ostera ai', 'ostera', 'ai'];

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function createParticle(canvas, config) {
  const colWidth = canvas.width / config.columns;
  const colIndex = Math.floor(Math.random() * config.columns);
  const xOffset = (Math.random() - 0.5) * colWidth * config.spread;

  return {
    layer: config.layer,
    x: colIndex * colWidth + colWidth / 2 + xOffset,
    y: Math.random() * canvas.height,
    vy: config.speed[0] + Math.random() * (config.speed[1] - config.speed[0]),
    text: pickRandom(config.texts),
    fontSize: config.fontSize[0] + Math.random() * (config.fontSize[1] - config.fontSize[0]),
    baseOpacity:
      config.opacity[0] + Math.random() * (config.opacity[1] - config.opacity[0]),
    pulseSpeed: Math.random() * 0.008 + config.pulseMin,
    pulsePhase: Math.random() * Math.PI * 2,
  };
}

function resetParticle(particle, canvas, config) {
  const colWidth = canvas.width / config.columns;
  const colIndex = Math.floor(Math.random() * config.columns);
  const xOffset = (Math.random() - 0.5) * colWidth * config.spread;

  particle.x = colIndex * colWidth + colWidth / 2 + xOffset;
  particle.y = -particle.fontSize - Math.random() * 40;
  particle.vy = config.speed[0] + Math.random() * (config.speed[1] - config.speed[0]);
  particle.text = pickRandom(config.texts);
  particle.fontSize = config.fontSize[0] + Math.random() * (config.fontSize[1] - config.fontSize[0]);
  particle.baseOpacity =
    config.opacity[0] + Math.random() * (config.opacity[1] - config.opacity[0]);
}

export default function GParticle() {
  const canvasRef = useRef(null);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 90, damping: 20, mass: 0.5 });
  const glowY = useSpring(pointerY, { stiffness: 90, damping: 20, mass: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const configs = {
      far: {
        layer: 'far',
        texts: DIGITS,
        columns: 10,
        spread: 0.85,
        speed: [0.03, 0.08],
        fontSize: [10, 14],
        opacity: [0.03, 0.08],
        pulseMin: 0.002,
        color: '148, 163, 184',
        shadow: 'rgba(59, 130, 246, 0.08)',
      },
      medium: {
        layer: 'medium',
        texts: DIGITS,
        columns: 8,
        spread: 0.7,
        speed: [0.08, 0.16],
        fontSize: [12, 18],
        opacity: [0.07, 0.14],
        pulseMin: 0.004,
        color: '125, 211, 252',
        shadow: 'rgba(56, 189, 248, 0.12)',
      },
      brand: {
        layer: 'brand',
        texts: BRAND_WORDS,
        columns: 6,
        spread: 0.45,
        speed: [0.05, 0.1],
        fontSize: [18, 30],
        opacity: [0.16, 0.28],
        pulseMin: 0.003,
        color: '255, 255, 255',
        shadow: 'rgba(59, 130, 246, 0.25)',
      },
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      pointerX.set(window.innerWidth / 2);
      pointerY.set(window.innerHeight / 2);
    };

    window.addEventListener('resize', resize);
    resize();

    const particles = [
      ...Array.from({ length: 70 }, () => createParticle(canvas, configs.far)),
      ...Array.from({ length: 50 }, () => createParticle(canvas, configs.medium)),
      ...Array.from({ length: 12 }, () => createParticle(canvas, configs.brand)),
    ];

    const handlePointerMove = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    window.addEventListener('pointermove', handlePointerMove);

    const drawParticle = (particle) => {
      const config = configs[particle.layer];

      particle.y += particle.vy;

      if (particle.y > canvas.height + particle.fontSize) {
        resetParticle(particle, canvas, config);
      }

      particle.pulsePhase += particle.pulseSpeed;
      const pulse = Math.sin(particle.pulsePhase);
      const currentOpacity = particle.baseOpacity + pulse * particle.baseOpacity * 0.28;

      ctx.font = `${particle.layer === 'brand' ? 600 : 400} ${particle.fontSize}px monospace`;
      ctx.fillStyle = `rgba(${config.color}, ${Math.max(0.02, currentOpacity)})`;
      ctx.shadowBlur = particle.layer === 'brand' ? 18 : particle.layer === 'medium' ? 10 : 0;
      ctx.shadowColor = config.shadow;
      ctx.fillText(particle.text, particle.x, particle.y);
      ctx.shadowBlur = 0;
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(drawParticle);
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pointerX, pointerY]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#030712] text-white selection:bg-primary/30">
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_42%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.14),transparent_34%),linear-gradient(180deg,#030712_0%,#020617_52%,#01030a_100%)]" />

      <motion.div
        className="absolute z-0 h-[28rem] w-[28rem] pointer-events-none rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.16)_0%,rgba(96,165,250,0.08)_26%,transparent_68%)] blur-3xl"
        style={{
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
        }}
      />

      <motion.div
        animate={{ scale: [1, 1.04, 1], opacity: [0.2, 0.28, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute left-1/2 top-1/2 z-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12)_0%,rgba(59,130,246,0.05)_32%,transparent_70%)] blur-3xl"
      />

      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-15"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(148, 163, 184, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(148, 163, 184, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05),transparent_38%)]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_42%,rgba(3,7,18,0.62)_100%)]" />
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-[#030712]/30 via-transparent to-[#030712]/80" />

      <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none opacity-85" />

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="mt-12 flex w-full max-w-[800px] flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5, ease: 'easeOut' }}
            className="mb-8 flex cursor-pointer items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm font-medium text-slate-300 shadow-sm backdrop-blur-md transition-colors hover:border-primary/40"
          >
            NEW RESEARCH <span className="text-primary">→</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7, ease: 'easeOut' }}
            className="mb-8 text-5xl font-medium tracking-tight text-white sm:text-6xl md:text-7xl"
          >
            Making every device <br className="hidden md:block" /> an AI-native device.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: 'easeOut' }}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            We are building the fundamental infrastructure to run complex models and advanced AI
            workloads seamlessly across everyday computing environments.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-primary to-secondary px-8 py-3.5 font-medium text-white shadow-[0_4px_20px_rgba(59,130,246,0.35)] transition-all duration-200 hover:-translate-y-0.5 hover:from-primary/90 hover:to-secondary/90 hover:shadow-[0_8px_30px_rgba(59,130,246,0.25)]">
              Read our research
              <span>→</span>
            </button>
            <button className="font-medium text-slate-300 transition-colors duration-200 hover:text-white">
              About us
            </button>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: 'easeOut' }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button className="flex items-center gap-2.5 rounded-full border border-white/10 bg-white/5 px-5 py-3 text-white shadow-xl backdrop-blur-md transition-all duration-300 hover:scale-105 hover:border-primary/40 hover:shadow-2xl">
          <span className="text-sm text-primary">▶</span>
          <span className="text-sm font-medium">Playground</span>
        </button>
      </motion.div>
    </div>
  );
}
