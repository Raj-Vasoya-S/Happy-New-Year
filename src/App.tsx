import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import LandingLoader from './components/LandingLoader';
import CardStack from './components/CardStack';
import { MusicProvider, MusicToggleButton } from './components/MusicToggle';

function App() {
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    import('./utils/preloadAssets').then(({ preloadAssets }) => {
      preloadAssets().then(() => {
        // Optional: wait for assets, or just let loader finish naturally
      });
    });
  }, []);

  return (
    <MusicProvider>
      <div className="min-h-screen bg-bg-cream selection:bg-soft-blush selection:text-deep-brown">
        <AnimatePresence>
          {loading ? (
            <LandingLoader key="loader" onComplete={() => setLoading(false)} />
          ) : (
            <div className="min-h-screen">
              <CardStack />
              <MusicToggleButton />
            </div>
          )}
        </AnimatePresence>
      </div>
    </MusicProvider>
  );
}

export default App;
