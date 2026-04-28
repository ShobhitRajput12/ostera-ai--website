import React, { useEffect, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const BASE_PARTICLE_COUNT = 3000;

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
          ? '0, 238, 255'
          : '138, 43, 226',
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
    // Inject Inter Font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

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

      const vortexGlow = ctx.createRadialGradient(
        width * 0.58,
        height * 0.46,
        0,
        width * 0.58,
        height * 0.46,
        width * 0.42
      );
      vortexGlow.addColorStop(0, 'rgba(0, 238, 255, 0.12)');
      vortexGlow.addColorStop(0.34, 'rgba(138, 43, 226, 0.08)');
      vortexGlow.addColorStop(0.72, 'rgba(0, 210, 255, 0.05)');
      vortexGlow.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = vortexGlow;
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
      if (document.head.contains(link)) document.head.removeChild(link);
    };
  }, [pointerX, pointerY]);

  return (
    <div 
      className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-[#020617] text-white selection:bg-cyan-500/30"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <canvas ref={canvasRef} className="fixed inset-0 z-0 h-full w-full pointer-events-none" />
      
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,rgba(2,6,23,0.6)_100%)]" />

      {/* Floating Mouse Glow */}
      <motion.div
        className="pointer-events-none fixed z-0 h-[40rem] w-[40rem] rounded-full bg-[radial-gradient(circle,rgba(0,238,255,0.1)_0%,rgba(138,43,226,0.05)_30%,transparent_70%)] blur-3xl mix-blend-screen"
        style={{
          left: glowX,
          top: glowY,
          x: '-50%',
          y: '-50%',
        }}
      />

      {/* HERO SECTION */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: 'easeOut' }}
          className="flex w-full max-w-[900px] flex-col items-center text-center"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="mb-8 flex cursor-pointer items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/5 px-5 py-2 text-sm font-medium text-cyan-200 shadow-[0_0_15px_rgba(0,238,255,0.1)] backdrop-blur-md transition-all hover:border-cyan-400/40 hover:bg-cyan-500/10"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500"></span>
            </span>
            gparticle system online
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8, ease: 'easeOut' }}
            className="mb-6 text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-white via-slate-200 to-slate-500 sm:text-6xl md:text-[80px] md:leading-[1.1]"
          >
            Visualizing Intelligence <br className="hidden md:block" /> Through Particles.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
            className="mb-10 max-w-2xl text-lg leading-relaxed text-slate-300 md:text-xl"
          >
            gparticle transforms complex data into interactive 3D particle systems. Experience real-time neural renderings and volumetric data flow.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="flex flex-col items-center justify-center gap-6 sm:flex-row"
          >
            <button className="group relative flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-[#020617] transition-all hover:scale-105 hover:shadow-[0_0_30px_rgba(0,238,255,0.4)]">
              Explore Visualization
              <motion.span
                className="inline-block"
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
              >
                →
              </motion.span>
            </button>
            <button className="text-sm font-medium text-slate-300 transition-colors duration-200 hover:text-white">
              Learn more
            </button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400"
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="h-10 w-[1px] bg-gradient-to-b from-slate-400 to-transparent" />
        </motion.div>
      </section>

      {/* FEATURES SECTION */}
      <section className="relative z-10 min-h-screen w-full px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-20 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight text-white md:text-5xl">
              Powering the next generation of <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-500">
                spatial computing.
              </span>
            </h2>
            <p className="mx-auto max-w-2xl text-slate-400">
              Our advanced renderer bridges the gap between massive datasets and human comprehension through beautifully optimized volumetric graphics.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                title: 'Real-time rendering',
                desc: '60fps volumetric particle flows optimized for WebGL and Canvas API.',
                icon: '⚡',
                color: 'from-cyan-500/20 to-transparent border-cyan-500/20',
              },
              {
                title: 'AI-driven visualization',
                desc: 'Latent space representations mapped directly to physics-based nodes.',
                icon: '🧠',
                color: 'from-violet-500/20 to-transparent border-violet-500/20',
              },
              {
                title: 'High-performance',
                desc: 'Capable of displaying millions of particles with minimal CPU overhead.',
                icon: '🚀',
                color: 'from-blue-500/20 to-transparent border-blue-500/20',
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 0.6, delay: i * 0.2 }}
                className={`group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-b ${feature.color} bg-[#020617]/50 p-8 backdrop-blur-xl transition-all hover:bg-[#020617]/80 hover:border-white/10`}
              >
                <div className="mb-8 text-4xl">{feature.icon}</div>
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-white">{feature.title}</h3>
                  <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
                </div>
                <div className="absolute inset-0 z-[-1] bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* DEMO / VISUALIZATION SECTION */}
      <section className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-5xl overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-2 backdrop-blur-sm shadow-[0_0_50px_rgba(0,0,0,0.5)]"
        >
          <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-black/40 shadow-inner">
            {/* Faux Interface inside the Demo */}
            <div className="absolute inset-0 z-10 flex flex-col justify-between p-6 pointer-events-none">
              <div className="flex justify-between items-start">
                <div className="flex gap-2">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-green-500/80" />
                </div>
                <div className="flex flex-col items-end text-xs font-mono text-cyan-400/80">
                  <span>FPS: 60.0</span>
                  <span>PTCL: 3,450,211</span>
                  <span>MEM: 24MB</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium text-white/50 uppercase tracking-widest">
                  Neural Manifold Projection
                </div>
                <button className="pointer-events-auto rounded-full border border-white/10 bg-white/10 px-4 py-1 text-xs text-white backdrop-blur-md hover:bg-white/20 transition">
                  Reset View
                </button>
              </div>
            </div>
            
            {/* Transparent background here lets the absolute fixed canvas show through beautifully! */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="relative z-10 w-full border-t border-white/5 bg-transparent px-6 py-12 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-full bg-gradient-to-br from-cyan-400 to-violet-500 shadow-[0_0_10px_rgba(0,238,255,0.5)]" />
            <span className="text-xl font-bold tracking-tight text-white">gparticle</span>
          </div>
          
          <ul className="flex flex-wrap justify-center gap-8 text-sm text-slate-400">
            <li className="cursor-pointer hover:text-cyan-400 transition">Product</li>
            <li className="cursor-pointer hover:text-cyan-400 transition">Research</li>
            <li className="cursor-pointer hover:text-cyan-400 transition">Documentation</li>
            <li className="cursor-pointer hover:text-cyan-400 transition">Company</li>
          </ul>

          <div className="text-sm text-slate-500">
            © 2026 gparticle systems. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Floating Playground Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.6 }}
        className="fixed bottom-8 right-8 z-50"
      >
        <button className="group flex h-14 items-center gap-3 rounded-full border border-white/10 bg-[#020617]/80 px-2 pr-6 text-white shadow-xl backdrop-blur-xl transition-all duration-300 hover:scale-105 hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(0,238,255,0.2)]">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 group-hover:bg-cyan-500/20 transition-colors">
            <span className="text-lg text-cyan-400">✺</span>
          </div>
          <span className="text-sm font-medium">Playground</span>
        </button>
      </motion.div>
    </div>
  );
}
