import React from 'react';
import Home from './pages/Home';
import GParticle from './pages/GParticle';
import VolumetricBeamsDemo from './components/ui/volumetric-beams-demo';
import ParticleWavesDemo from './components/ui/demo';

function App() {
  const path = window.location.pathname;

  if (path === '/gparticle') {
    return <GParticle />;
  }

  if (path === '/volumetric') {
    return <VolumetricBeamsDemo />;
  }

  if (path === '/threejs-particles-waves') {
    return <ParticleWavesDemo />;
  }

  return (
    <Home />
  );
}

export default App;
