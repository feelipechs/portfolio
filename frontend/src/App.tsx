import { useState, useEffect } from 'react';
import { ZoomInScreen } from './components/boot/ZoomInScreen';
import { BootSequence } from './components/boot/BootSequence';
import { Terminal } from './components/terminal/Terminal';
import { MobileView } from './components/mobile/MobileView';
import { RadioPlayer } from './components/radio/RadioPlayer';
import { useIsMobile } from './hooks/useIsMobile';
import { useAppStore } from './store/appStore';

type Phase = 'zoom' | 'boot' | 'terminal';

export default function App() {
  const [phase, setPhase] = useState<Phase>('zoom');
  const [returning, setReturning] = useState(false);
  const isMobile = useIsMobile();
  const shutdown = useAppStore((s) => s.shutdown);
  const reset = useAppStore((s) => s.reset);

  useEffect(() => {
    if (shutdown) {
      setPhase('zoom');
      setReturning(true);
      reset();
    }
  }, [shutdown, reset]);

  if (isMobile) {
    return <MobileView />;
  }

  return (
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
  );
}
