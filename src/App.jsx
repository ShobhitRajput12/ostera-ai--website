import React, { useEffect } from 'react';
import Home from './pages/Home';
import GParticle from './pages/GParticle';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsAndConditions from './pages/TermsAndConditions';
import VolumetricBeamsDemo from './components/ui/volumetric-beams-demo';
import ParticleWavesDemo from './components/ui/demo';

function App() {
  useEffect(() => {
    const root = window.document.documentElement;
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, []);

  const path = window.location.pathname;

  if (path === '/gparticle') {
    return <GParticle />;
  }

  if (path === '/privacy-policy') {
    return <PrivacyPolicy />;
  }

  if (path === '/terms-and-conditions') {
    return <TermsAndConditions />;
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
