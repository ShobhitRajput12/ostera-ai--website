import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const BASE_PARTICLE_COUNT = 3000; // slightly denser for that beautiful tunnel look

function createTunnelParticle(canvas, index, total) {
  const progress = index / total;
  const lane = index % 240;
  const laneRatio = lane / 240;
  const angle = laneRatio * Math.PI * 2;
  const depth = Math.pow(progress, 0.66);
  const innerRadius = Math.min(canvas.width, canvas.height) * 0.055;
  const outerRadius = Math.max(canvas.width, canvas.height) * 0.58;
  const radius = innerRadius + depth * (outerRadius - innerRadius);
  const flowX = canvas.width * (0.3 + depth * 0.72);
  const flowBend = Math.sin(depth * 5.8 + angle * 1.3) * canvas.width * 0.035;
  const neckPull = (1 - depth) * canvas.width * 0.08;
  const swirlOffset = depth * 2.6;
  const tubeTightness = 0.56 + (1 - depth) * 0.34;
  const verticalSquash = 0.82 - depth * 0.08;
  const waveX = Math.sin(angle * 2.4 + depth * 10.5) * (8 + depth * 20);
  const waveY = Math.cos(angle * 1.7 + depth * 8.4) * (10 + depth * 34);
  const brightness = 0.3 + (1 - depth) * 0.7;
  const twinkleSeed = Math.random() * Math.PI * 2;

  return {
    baseX:
      flowX +
      flowBend -
      neckPull +
      Math.cos(angle + swirlOffset) * radius * tubeTightness +
      waveX,
    baseY:
      canvas.height * 0.5 +
      Math.sin(angle + swirlOffset) * radius * verticalSquash +
      waveY,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    radius: 0.45 + brightness * 2.5 + Math.random() * 1.4,
    alpha: 0.14 + brightness * 0.78,
    color:
      Math.random() < 0.1
        ? '255, 255, 255'
        : Math.random() < 0.55
          ? '96, 232, 255'
          : '0, 210, 255',
    twinkleSeed,
    twinkleSpeed: 0.5 + Math.random() * 1.6,
    returnStrength: 0.032 + Math.random() * 0.018,
    repelStrength: 1.4 + (1 - depth) * 4.2,
    depth: 1 - depth,
  };
}

function buildParticles(canvas) {
  const scaleFactor = Math.min(window.innerWidth / 1440, 1);
  const total = Math.max(1800, Math.floor(BASE_PARTICLE_COUNT * scaleFactor));
  const particles = Array.from({ length: total }, (_, index) =>
    createTunnelParticle(canvas, index, total)
  );

  particles.forEach((particle) => {
    particle.x = particle.baseX;
    particle.y = particle.baseY;
  });

  return particles;
}

export default function GParticle() {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const glowX = useSpring(pointerX, { stiffness: 90, damping: 22, mass: 0.5 });
  const glowY = useSpring(pointerY, { stiffness: 90, damping: 22, mass: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
      particlesRef.current = buildParticles({
        width: window.innerWidth,
        height: window.innerHeight,
      });
      pointerX.set(window.innerWidth / 2);
      pointerY.set(window.innerHeight / 2);
    };

    const handlePointerMove = (event) => {
      pointerX.set(event.clientX);
      pointerY.set(event.clientY);
    };

    const drawBackground = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      // Canvas base background is removed to let the original UI's CSS background and Framer Motion mouse glow shine through!

      const vortexGlow = ctx.createRadialGradient(
        width * 0.58,
        height * 0.46,
        0,
        width * 0.58,
        height * 0.46,
        width * 0.42
      );
      vortexGlow.addColorStop(0, 'rgba(0, 238, 255, 0.16)');
      vortexGlow.addColorStop(0.34, 'rgba(0, 140, 255, 0.14)');
      vortexGlow.addColorStop(0.72, 'rgba(104, 36, 126, 0.10)');
      vortexGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = vortexGlow;
      ctx.fillRect(0, 0, width, height);

      const rightGlow = ctx.createRadialGradient(
        width * 0.88,
        height * 0.74,
        0,
        width * 0.88,
        height * 0.74,
        width * 0.18
      );
      rightGlow.addColorStop(0, 'rgba(0, 229, 255, 0.14)');
      rightGlow.addColorStop(0.48, 'rgba(0, 124, 255, 0.09)');
      rightGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = rightGlow;
      ctx.fillRect(0, 0, width, height);
    };

    const drawParticle = (particle, time) => {
      const mouseX = pointerX.get();
      const mouseY = pointerY.get();
      const dx = particle.x - mouseX;
      const dy = particle.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const repelRadius = 110 + particle.depth * 110;

      if (dist < repelRadius) {
        const repelForce = ((repelRadius - dist) / repelRadius) * particle.repelStrength;
        particle.vx += (dx / dist) * repelForce;
        particle.vy += (dy / dist) * repelForce;
      }

      particle.vx += (particle.baseX - particle.x) * particle.returnStrength;
      particle.vy += (particle.baseY - particle.y) * particle.returnStrength;
      particle.vx *= 0.9;
      particle.vy *= 0.9;
      particle.x += particle.vx;
      particle.y += particle.vy;

      const twinkle = 0.76 + Math.sin(time * particle.twinkleSpeed + particle.twinkleSeed) * 0.24;

      ctx.beginPath();
      ctx.fillStyle = `rgba(${particle.color}, ${particle.alpha * twinkle})`;
      ctx.shadowBlur = 8 + particle.radius * 4;
      ctx.shadowColor = `rgba(${particle.color}, 0.7)`;
      ctx.arc(particle.x, particle.y, particle.radius * twinkle, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;
    };

    const draw = (time) => {
      const seconds = time * 0.001;
      if (!lastTime) lastTime = seconds;
      lastTime = seconds;

      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      drawBackground();

      for (const particle of particlesRef.current) {
        drawParticle(particle, seconds);
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    animationFrameId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [pointerX, pointerY]);

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-[#040611] text-white selection:bg-primary/30">
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_20%_25%,rgba(255,255,255,0.08),transparent_18%),radial-gradient(circle_at_78%_68%,rgba(0,238,255,0.08),transparent_12%),radial-gradient(circle_at_70%_38%,rgba(123,92,255,0.12),transparent_20%)]"
        animate={{ opacity: [0.6, 0.9, 0.7] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="pointer-events-none absolute z-0 h-[32rem] w-[32rem] rounded-full bg-[radial-gradient(circle,rgba(0,238,255,0.16)_0%,rgba(0,132,255,0.08)_28%,transparent_68%)] blur-3xl"
        style={{
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
        }}
      />

      <canvas ref={canvasRef} className="absolute inset-0 z-0 h-full w-full pointer-events-none" />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,transparent_32%,rgba(3,6,17,0.25)_60%,rgba(3,6,17,0.84)_100%)]" />

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
            NEW RESEARCH <span className="text-primary">{'->'}</span>
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
              <span>{'->'}</span>
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
          <span className="text-sm text-primary">{'>'}</span>
          <span className="text-sm font-medium">Playground</span>
        </button>
      </motion.div>
    </div>
  );
}
