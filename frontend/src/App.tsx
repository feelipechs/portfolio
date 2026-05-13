import { useState, useEffect } from 'react';
import { ZoomInScreen } from './components/boot/ZoomInScreen';
import { BootSequence } from './components/boot/BootSequence';
import { Terminal } from './components/terminal/Terminal';
import { MobileView } from './components/mobile/MobileView';
import { RadioPlayer } from './components/radio/RadioPlayer';
import { ErrorBoundary } from './components/ErrorBoundary';
import { useIsMobile } from './hooks/useIsMobile';
import { useAppStore } from './store/appStore';

type Phase = 'zoom' | 'boot' | 'terminal';

export default function App() {
  const [phase, setPhase] = useState<Phase>('zoom');
  const [returning, setReturning] = useState(false);
  const isMobile = useIsMobile();
  const shutdownCount = useAppStore((s) => s.shutdownCount);

  useEffect(() => {
    if (shutdownCount === 0) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPhase('zoom');
    setReturning(true);
  }, [shutdownCount]);

  if (isMobile) {
    return <MobileView />;
  }

  return (
    <ErrorBoundary>
    <div className='app'>
      {phase === 'zoom' && (
        <ZoomInScreen onComplete={() => setPhase('boot')} returning={returning} />
      )}
      {phase === 'boot' && (
        <BootSequence onComplete={() => setPhase('terminal')} />
      )}
      <div
        className='terminal-phase'
        style={{
          opacity: phase === 'terminal' ? 1 : 0,
          pointerEvents: phase === 'terminal' ? 'all' : 'none',
          transition: 'opacity 0.6s ease',
          position: 'absolute',
          inset: 0,
        }}
      >
        <Terminal />
      </div>
      <RadioPlayer />
    </div>
    </ErrorBoundary>
  );
}
