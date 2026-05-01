import React, { useEffect, useState } from "react";
import VolumetricBeamsFullScreen from "./volumetric-beams";

export default function VolumetricBeamsDemo() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });

    observer.observe(document.documentElement, { attributes: true });
    setIsDark(document.documentElement.classList.contains('dark'));

    return () => observer.disconnect();
  }, []);

  return (
    <VolumetricBeamsFullScreen
      className="fixed inset-0 bg-background"
      dpr={[1, 1.5]}

      // Camera/motion
      speed={2.95}
      autoRotateSpeed={0.035}
      mouseInfluence={0.35}
      pointerSmoothing={0.28}
      cameraRadius={4.8}
      fov={1.25}

      // Beam shape
      beamCount={5}
      beamHalfAngle={0.065}
      beamEdgeSoft={0.045}
      beamRotation={0.7}
      twistDepth={0.95}

      // Volume/scatter
      density={isDark ? 0.95 : 0.45}
      falloff={0.15}
      anisotropy={0.86}
      lightIntensity={isDark ? 1.4 : 0.8}
      lightColor={isDark ? [0.54, 0.74, 1.0] : [0.3, 0.5, 0.8]}
      tint={isDark ? [0.55, 0.38, 0.95] : [0.2, 0.3, 0.5]}

      // Ribbing
      stripeFreq={800.0}
      stripeAmp={0.07}
      stripeSharp={0.08}
      stripeSpeed={0.102}
      stripeJitter={0.91}

      // Quality
      volSteps={80}
      stepMin={0.08}
      stepMax={0.15}
      maxDist={3.0}

      // Film/post
      bgColor={isDark ? [0, 0, 0] : [0.95, 0.96, 1.0]}
      exposure={isDark ? 0.5 : 1.2}
      gamma={2.0}
      grainAmount={0.005}
      vignette={isDark ? 0.95 : 0.35}
    />
  )
}
