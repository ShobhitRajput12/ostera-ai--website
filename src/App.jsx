import React from 'react';
import Home from './pages/Home';
import GParticle from './pages/GParticle';

function App() {
  const path = window.location.pathname;

  if (path === '/gparticle') {
    return <GParticle />;
  }

  return (
    <Home />
  );
}

export default App;
