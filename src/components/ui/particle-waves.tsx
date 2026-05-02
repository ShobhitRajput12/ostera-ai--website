import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import * as THREE from 'three';

const ParticleWaves = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const particlesRef = useRef<THREE.Sprite[]>([]);
  const materialRef = useRef<THREE.SpriteMaterial | null>(null);
  const animationRef = useRef<number>(0);

  const [density, setDensity] = useState(50);
  const [speed, setSpeed] = useState(0.1);
  const [amplitude, setAmplitude] = useState(50);
  const [separation, setSeparation] = useState(100);
  const [particleColor, setParticleColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('#000000');
  const [controlsOpen, setControlsOpen] = useState(false);

  const countRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const windowHalfRef = useRef({
    x: typeof window !== 'undefined' ? window.innerWidth / 2 : 0,
    y: typeof window !== 'undefined' ? window.innerHeight / 2 : 0,
  });

  const densityRef = useRef(density);
  const amplitudeRef = useRef(amplitude);
  const speedRef = useRef(speed);
  densityRef.current = density;
  amplitudeRef.current = amplitude;
  speedRef.current = speed;

  const createParticleMaterial = (color: string) => {
    const canvas = document.createElement('canvas');
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext('2d');
    if (!context) throw new Error('2d context unavailable');

    context.clearRect(0, 0, 32, 32);
    context.fillStyle = color;
    context.beginPath();
    context.arc(16, 16, 12, 0, Math.PI * 2, true);
    context.fill();

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    return new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
    });
  };

  const recreateParticles = () => {
    if (!sceneRef.current || !materialRef.current) return;

    particlesRef.current.forEach((particle) => sceneRef.current!.remove(particle));
    particlesRef.current = [];

    for (let ix = 0; ix < density; ix++) {
      for (let iy = 0; iy < density; iy++) {
        const particle = new THREE.Sprite(materialRef.current);
        particle.position.x = ix * separation - (density * separation) / 2;
        particle.position.z = iy * separation - (density * separation) / 2;
        particle.position.y = -400;
        particle.scale.setScalar(10);

        particlesRef.current.push(particle);
        sceneRef.current.add(particle);
      }
    }
  };

  const handleMouseMove = (event: MouseEvent) => {
    mouseRef.current.x = event.clientX - windowHalfRef.current.x;
    mouseRef.current.y = event.clientY - windowHalfRef.current.y;
  };

  const handleTouchMove = (event: TouchEvent) => {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouseRef.current.x = event.touches[0].pageX - windowHalfRef.current.x;
      mouseRef.current.y = event.touches[0].pageY - windowHalfRef.current.y;
    }
  };

  const syncRendererSize = () => {
    const el = containerRef.current;
    const camera = cameraRef.current;
    const renderer = rendererRef.current;
    if (!el || !camera || !renderer) return;

    const w = Math.max(1, Math.floor(el.clientWidth || window.innerWidth));
    const h = Math.max(1, Math.floor(el.clientHeight || window.innerHeight));

    windowHalfRef.current.x = w / 2;
    windowHalfRef.current.y = h / 2;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(w, h);

    renderer.domElement.style.display = 'block';
    renderer.domElement.style.position = 'absolute';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.width = `${w}px`;
    renderer.domElement.style.height = `${h}px`;
  };

  const handleResize = () => {
    syncRendererSize();
  };

  const animate = () => {
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

    animationRef.current = requestAnimationFrame(animate);

    cameraRef.current.position.x +=
      (mouseRef.current.x - cameraRef.current.position.x) * 0.05;
    cameraRef.current.position.y +=
      (-mouseRef.current.y - cameraRef.current.position.y) * 0.05;
    cameraRef.current.lookAt(sceneRef.current.position);

    const d = densityRef.current;
    const amp = amplitudeRef.current;
    const spd = speedRef.current;

    let i = 0;
    for (let ix = 0; ix < d; ix++) {
      for (let iy = 0; iy < d; iy++) {
        if (i < particlesRef.current.length) {
          const particle = particlesRef.current[i++];

          particle.position.y =
            -400 +
            Math.sin((ix + countRef.current) * 0.3) * amp +
            Math.sin((iy + countRef.current) * 0.5) * amp;

          const scale =
            (Math.sin((ix + countRef.current) * 0.3) + 1) * 2 +
            (Math.sin((iy + countRef.current) * 0.5) + 1) * 2;
          particle.scale.setScalar(scale * 2);
        }
      }
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    countRef.current += spd;
  };

  const applyPreset = (pColor: string, bColor: string) => {
    setParticleColor(pColor);
    setBgColor(bColor);
  };

  useEffect(() => {
    if (!containerRef.current) return;

    const camera = new THREE.PerspectiveCamera(
      50,
      window.innerWidth / window.innerHeight,
      1,
      10000,
    );
    camera.position.z = 1000;
    camera.position.y = 800;
    cameraRef.current = camera;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    syncRendererSize();

    renderer.setClearColor(new THREE.Color(bgColor), 1);

    materialRef.current = createParticleMaterial(particleColor);
    recreateParticles();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('resize', handleResize);

    const resizeObserver =
      typeof ResizeObserver !== 'undefined'
        ? new ResizeObserver(() => {
            syncRendererSize();
          })
        : null;
    resizeObserver?.observe(containerRef.current);

    requestAnimationFrame(() => {
      syncRendererSize();
    });

    animate();

    return () => {
      resizeObserver?.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      if (containerRef.current && renderer.domElement.parentNode === containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(bgColor), 1);
    }
  }, [bgColor]);

  useEffect(() => {
    materialRef.current = createParticleMaterial(particleColor);
    particlesRef.current.forEach((particle) => {
      particle.material = materialRef.current!;
    });
  }, [particleColor]);

  useEffect(() => {
    recreateParticles();
  }, [density, separation]);

  /*
   * Fill the Home `fixed inset-0` slot with `absolute inset-0` — flow + `h-full` alone can yield 0 height.
   * ResizeObserver + syncRendererSize keep WebGL drawable size aligned to the DOM host.
   */
  return (
    <div className="pointer-events-none absolute inset-0 z-[1] min-h-[100dvh] w-full overflow-hidden bg-black">
      <div ref={containerRef} className="absolute inset-0" />

      {createPortal(
        <div className="pointer-events-auto fixed bottom-6 right-6 z-40 flex max-h-[calc(100vh-1.5rem)] flex-col items-end gap-2">
          {controlsOpen && (
            <div className="max-h-[min(32rem,calc(100vh-8rem))] w-52 overflow-y-auto rounded-lg border border-gray-600 bg-black/90 p-4 text-xs text-white shadow-xl backdrop-blur-md">
              <div className="-mt-1 mb-2 flex items-center justify-end">
                <button
                  type="button"
                  onClick={() => setControlsOpen(false)}
                  className="rounded p-1 text-gray-400 transition-colors hover:bg-white/10 hover:text-white"
                  aria-label="Close background controls"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="mb-3">
                <label className="mb-1 block font-bold">Density</label>
                <input
                  type="range"
                  min={10}
                  max={80}
                  value={density}
                  onChange={(e) => setDensity(parseInt(e.target.value, 10))}
                  className="mb-1 w-full"
                />
                <div className="text-xs text-gray-400">{density}x{density}</div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-bold">Wave Speed</label>
                <input
                  type="range"
                  min={0.01}
                  max={0.3}
                  step={0.01}
                  value={speed}
                  onChange={(e) => setSpeed(parseFloat(e.target.value))}
                  className="mb-1 w-full"
                />
                <div className="text-xs text-gray-400">{speed.toFixed(2)}</div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-bold">Wave Height</label>
                <input
                  type="range"
                  min={10}
                  max={150}
                  value={amplitude}
                  onChange={(e) => setAmplitude(parseInt(e.target.value, 10))}
                  className="mb-1 w-full"
                />
                <div className="text-xs text-gray-400">{amplitude}</div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-bold">Spacing</label>
                <input
                  type="range"
                  min={50}
                  max={200}
                  value={separation}
                  onChange={(e) => setSeparation(parseInt(e.target.value, 10))}
                  className="mb-1 w-full"
                />
                <div className="text-xs text-gray-400">{separation}</div>
              </div>

              <div className="mb-3">
                <label className="mb-1 block font-bold">Colors</label>
                <div className="flex gap-2">
                  <div className="flex-1">
                    <label className="mb-1 block text-xs">Particles</label>
                    <input
                      type="color"
                      value={particleColor}
                      onChange={(e) => setParticleColor(e.target.value)}
                      className="h-6 w-10 cursor-pointer rounded border-none"
                    />
                  </div>
                  <div className="flex-1">
                    <label className="mb-1 block text-xs">Background</label>
                    <input
                      type="color"
                      value={bgColor}
                      onChange={(e) => setBgColor(e.target.value)}
                      className="h-6 w-10 cursor-pointer rounded border-none"
                    />
                  </div>
                </div>

                <div className="mt-2">
                  <div className="mb-1 text-xs">Presets:</div>
                  <div className="grid grid-cols-5 gap-1">
                    <button
                      type="button"
                      onClick={() => applyPreset('#ffffff', '#000000')}
                      className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                      style={{ background: 'linear-gradient(90deg, #ffffff 50%, #000000 50%)' }}
                    />
                    <button
                      type="button"
                      onClick={() => applyPreset('#ff6b6b', '#0a0a0a')}
                      className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                      style={{ background: 'linear-gradient(90deg, #ff6b6b 50%, #0a0a0a 50%)' }}
                    />
                    <button
                      type="button"
                      onClick={() => applyPreset('#4ecdc4', '#1a1a2e')}
                      className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                      style={{ background: 'linear-gradient(90deg, #4ecdc4 50%, #1a1a2e 50%)' }}
                    />
                    <button
                      type="button"
                      onClick={() => applyPreset('#ffd93d', '#16213e')}
                      className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                      style={{ background: 'linear-gradient(90deg, #ffd93d 50%, #16213e 50%)' }}
                    />
                    <button
                      type="button"
                      onClick={() => applyPreset('#a8e6cf', '#2c3e50')}
                      className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                      style={{ background: 'linear-gradient(90deg, #a8e6cf 50%, #2c3e50 50%)' }}
                    />
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={() => window.open('https://rollout.dev', '_blank')}
                className="mt-2 w-full rounded border border-white/20 bg-white/10 px-2 py-1 text-xs text-gray-400 transition-all hover:bg-white/15 hover:text-white"
              >
                Built with Rollout
              </button>
            </div>
          )}

          <button
            type="button"
            onClick={() => setControlsOpen((open) => !open)}
            className="shrink-0 rounded-full border border-white/15 bg-black/70 px-6 py-3.5 text-sm font-medium text-white shadow-lg backdrop-blur-md transition-colors hover:border-white/25 hover:bg-black/85"
          >
            {controlsOpen ? 'Close' : 'Play background'}
          </button>
        </div>,
        document.body
      )}
    </div>
  );
};

export default ParticleWaves;
