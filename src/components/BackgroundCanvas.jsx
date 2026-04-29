import React, { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring } from 'framer-motion';

const FRAME_COUNT = 195;

function currentFrame(index) {
  const num = String(index + 40).padStart(3, '0');
  return `/frames/ezgif-frame-${num}.jpg`;
}

export default function BackgroundCanvas({ scrollTargetRef }) {
  const canvasRef = useRef(null);
  const fallbackImageRef = useRef(null);
  const [images, setImages] = useState([]);

  // Preload fallback image
  useEffect(() => {
    const fallback = new Image();
    fallback.src = '/frames/ezgif-frame-040.jpg';
    fallbackImageRef.current = fallback;
  }, []);

  // Preload frames silently in background
  useEffect(() => {
    const loadedImages = [];
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Track the scroll of the main container so the animation completes exactly
  // before the footer comes into view.
  const { scrollYProgress } = useScroll({
    target: scrollTargetRef,
    offset: ['start start', 'end end']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(
    smoothProgress,
    [0, 0.92, 1],
    [0, FRAME_COUNT - 1, FRAME_COUNT - 1]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    let animationFrameId;

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
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const hRatio = canvas.width / img.width;
        const vRatio = canvas.height / img.height;
        const ratio = Math.max(hRatio, vRatio);

        const centerShiftX = (canvas.width - img.width * ratio) / 2;
        const centerShiftY = (canvas.height - img.height * ratio) / 2;

        context.clearRect(0, 0, canvas.width, canvas.height);
        context.drawImage(
          img,
          0, 0, img.width, img.height,
          centerShiftX, centerShiftY, img.width * ratio, img.height * ratio
        );
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, [images, frameIndex]);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <div className="sticky top-0 h-screen w-full bg-[#050505]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full opacity-60" />
        {/* Dark gradient overlay to keep foreground content readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#020617]/40 via-[#030712]/10 to-[#030712]/40 mix-blend-multiply" />

        {/* Cinematic shadow gradient on the left side to smoothly hide the sharp cut on the robot's arm */}
        <div className="absolute inset-y-0 left-0 w-[45%] bg-gradient-to-r from-[#050505] via-[#050505]/70 to-transparent" />
        <div className="absolute inset-y-0 right-0 w-[20%] bg-gradient-to-l from-[#050505] to-transparent opacity-80" />
      </div>
    </div>
  );
}
