import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 240;

function currentFrame(index) {
  const num = String(index).padStart(3, '0');
  return `/frames/ezgif-frame-${num}.png`;
}

// Component refined to remove storytelling text layers

export default function BrainScroll() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const fallbackImageRef = useRef(null);
  const [images, setImages] = useState([]);
  const [loaded, setLoaded] = useState(0);

  // Preload fallback image
  useEffect(() => {
    const fallback = new Image();
    fallback.src = '/fallback-brain.png';
    fallbackImageRef.current = fallback;
  }, []);

  // Preload all 119 frames
  useEffect(() => {
    const loadedImages = [];

    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        setLoaded(prev => Math.min(prev + 1, FRAME_COUNT));
      };
      // Fallback in case of error so it doesn't hang forever
      img.onerror = () => {
        setLoaded(prev => Math.min(prev + 1, FRAME_COUNT));
      }
      loadedImages.push(img);
    }
    setImages(loadedImages);

    // Safety timeout: bypass loading screen after 2 seconds if missing images block it
    const timeoutId = setTimeout(() => {
      setLoaded(FRAME_COUNT);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, FRAME_COUNT - 1]);
  const indicatorOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      const index = Math.min(Math.max(Math.floor(frameIndex.get()), 0), FRAME_COUNT - 1);
      let img = images.length > 0 ? images[index] : null;

      // Use fallback if frame is missing or invalid
      if (!img || !img.complete || img.naturalWidth === 0) {
        if (fallbackImageRef.current && fallbackImageRef.current.complete && fallbackImageRef.current.naturalWidth > 0) {
          img = fallbackImageRef.current;
        } else {
          img = null;
        }
      }

      if (img) {
        const canvasWidth = canvas.width;
        const canvasHeight = canvas.height;

        // Use high quality smoothing
        context.imageSmoothingEnabled = true;
        context.imageSmoothingQuality = 'high';

        // Draw image with object-fit: contain logic to maintain aspect ratio
        const hRatio = canvasWidth / img.width;
        const vRatio = canvasHeight / img.height;
        const ratio = Math.min(hRatio, vRatio);

        const centerShiftX = (canvasWidth - img.width * ratio) / 2;
        const centerShiftY = (canvasHeight - img.height * ratio) / 2;

        context.clearRect(0, 0, canvasWidth, canvasHeight);
        context.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
        );
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [images, frameIndex]);

  const loadingPercentage = Math.round((loaded / FRAME_COUNT) * 100);

  // Storytelling beats removed as requested

  return (
    <div ref={containerRef} className="relative h-[400vh] bg-[#050505]">
      {loaded < FRAME_COUNT && (
        <div className="fixed inset-0 z-50 bg-[#050505] flex flex-col items-center justify-center text-white font-heading">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center"
          >
            <h2 className="text-2xl tracking-[0.3em] mb-8 text-primary font-bold">INITIALIZING CORE</h2>
            <div className="w-64 h-1 bg-gray-800 rounded-full overflow-hidden relative">
              <div
                className="absolute top-0 left-0 h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-300"
                style={{ width: `${loadingPercentage}%` }}
              />
            </div>
            <p className="mt-4 text-sm text-gray-500 font-mono">{loadingPercentage}% / LOADING NEURAL NET</p>
          </motion.div>
        </div>
      )}

      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#050505]">
        {/* Canvas for image sequence */}
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0" />

        {/* Overlay Dark Gradient for text readability and cinematic feel */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#050505]/80 via-transparent to-[#050505]/80 z-10 pointer-events-none" />

        {/* Storytelling text layers removed */}

        {/* Scroll Down Indicator */}
        <motion.div
          style={{ opacity: indicatorOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 text-white/50 z-20 pointer-events-none"
        >
          <span className="text-xs tracking-[0.2em] uppercase font-mono">Scroll to explore</span>
          <div className="w-px h-24 bg-gray-800 relative overflow-hidden">
            <motion.div
              animate={{ y: [-100, 100] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
