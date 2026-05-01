import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

type SceneRef = THREE.Scene | null;
type RendererRef = THREE.WebGLRenderer | null;
type CameraRef = THREE.PerspectiveCamera | null;
type SpriteRef = THREE.Sprite<THREE.SpriteMaterial>;

const ParticleWavesDemo = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<SceneRef>(null);
  const rendererRef = useRef<RendererRef>(null);
  const cameraRef = useRef<CameraRef>(null);
  const particlesRef = useRef<SpriteRef[]>([]);
  const materialRef = useRef<THREE.SpriteMaterial | null>(null);
  const animationRef = useRef<number | null>(null);

  const [density, setDensity] = useState(50);
  const [speed, setSpeed] = useState(0.1);
  const [amplitude, setAmplitude] = useState(50);
  const [separation, setSeparation] = useState(100);
  const [particleColor, setParticleColor] = useState("#ffffff");
  const [bgColor, setBgColor] = useState("#000000");

  const countRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const windowHalfRef = useRef({
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  });

  const createParticleMaterial = (color: string) => {
    const canvas = document.createElement("canvas");
    canvas.width = 32;
    canvas.height = 32;
    const context = canvas.getContext("2d");
    if (!context) return null;

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

    particlesRef.current.forEach((particle) => sceneRef.current?.remove(particle));
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

  const handleResize = () => {
    if (!cameraRef.current || !rendererRef.current) return;

    windowHalfRef.current.x = window.innerWidth / 2;
    windowHalfRef.current.y = window.innerHeight / 2;
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
  };

  const animate = () => {
    if (!cameraRef.current || !rendererRef.current || !sceneRef.current) return;

    animationRef.current = requestAnimationFrame(animate);

    cameraRef.current.position.x +=
      (mouseRef.current.x - cameraRef.current.position.x) * 0.05;
    cameraRef.current.position.y +=
      (-mouseRef.current.y - cameraRef.current.position.y) * 0.05;
    cameraRef.current.lookAt(sceneRef.current.position);

    let i = 0;
    for (let ix = 0; ix < density; ix++) {
      for (let iy = 0; iy < density; iy++) {
        if (i < particlesRef.current.length) {
          const particle = particlesRef.current[i++];
          particle.position.y =
            -400 +
            Math.sin((ix + countRef.current) * 0.3) * amplitude +
            Math.sin((iy + countRef.current) * 0.5) * amplitude;

          const scale =
            (Math.sin((ix + countRef.current) * 0.3) + 1) * 2 +
            (Math.sin((iy + countRef.current) * 0.5) + 1) * 2;
          particle.scale.setScalar(scale * 2);
        }
      }
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);
    countRef.current += speed;
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
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(new THREE.Color(bgColor), 1);
    rendererRef.current = renderer;

    containerRef.current.appendChild(renderer.domElement);

    materialRef.current = createParticleMaterial(particleColor);
    recreateParticles();

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("resize", handleResize);

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (rendererRef.current) {
      rendererRef.current.setClearColor(new THREE.Color(bgColor), 1);
    }
  }, [bgColor]);

  useEffect(() => {
    const nextMaterial = createParticleMaterial(particleColor);
    if (!nextMaterial) return;
    materialRef.current = nextMaterial;
    particlesRef.current.forEach((particle) => {
      particle.material = nextMaterial;
    });
  }, [particleColor]);

  useEffect(() => {
    recreateParticles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [density, separation]);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-black">
      <div ref={containerRef} className="h-full w-full" />

      <div className="absolute left-2 top-2 z-10 text-xs text-white">
        Move mouse to control camera
      </div>

      <div className="absolute right-2 top-2 z-10 w-52 rounded-lg border border-gray-600 bg-black/80 p-4 text-xs text-white">
        <div className="mb-3">
          <label className="mb-1 block font-bold">Density</label>
          <input
            type="range"
            min="10"
            max="80"
            value={density}
            onChange={(e) => setDensity(parseInt(e.target.value, 10))}
            className="mb-1 w-full"
          />
          <div className="text-xs text-gray-400">
            {density}x{density}
          </div>
        </div>

        <div className="mb-3">
          <label className="mb-1 block font-bold">Wave Speed</label>
          <input
            type="range"
            min="0.01"
            max="0.3"
            step="0.01"
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
            min="10"
            max="150"
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
            min="50"
            max="200"
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
                onClick={() => applyPreset("#ffffff", "#000000")}
                className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                style={{
                  background: "linear-gradient(90deg, #ffffff 50%, #000000 50%)",
                }}
              />
              <button
                onClick={() => applyPreset("#ff6b6b", "#0a0a0a")}
                className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                style={{
                  background: "linear-gradient(90deg, #ff6b6b 50%, #0a0a0a 50%)",
                }}
              />
              <button
                onClick={() => applyPreset("#4ecdc4", "#1a1a2e")}
                className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                style={{
                  background: "linear-gradient(90deg, #4ecdc4 50%, #1a1a2e 50%)",
                }}
              />
              <button
                onClick={() => applyPreset("#ffd93d", "#16213e")}
                className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                style={{
                  background: "linear-gradient(90deg, #ffd93d 50%, #16213e 50%)",
                }}
              />
              <button
                onClick={() => applyPreset("#a8e6cf", "#2c3e50")}
                className="h-6 w-full rounded border border-gray-600 transition-all hover:scale-105 hover:border-white"
                style={{
                  background: "linear-gradient(90deg, #a8e6cf 50%, #2c3e50 50%)",
                }}
              />
            </div>
          </div>
        </div>

        <button
          onClick={() => window.open("https://rollout.dev", "_blank")}
          className="mt-2 w-full rounded border border-white/20 bg-white/10 px-2 py-1 text-xs text-gray-400 transition-all hover:bg-white/15 hover:text-white"
        >
          Built with Rollout
        </button>
      </div>
    </div>
  );
};

export default ParticleWavesDemo;
