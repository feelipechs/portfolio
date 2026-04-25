import { useEffect, useState } from 'react';

interface ZoomInScreenProps {
  onComplete: () => void;
}

export function ZoomInScreen({ onComplete }: ZoomInScreenProps) {
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(onComplete, 1800);
    return () => clearTimeout(timer);
  }, [started, onComplete]);

  return (
    <div className='zoom-wrapper'>
      <div className={`zoom-monitor ${started ? 'zoom-monitor--started' : ''}`}>
        <div className='zoom-screen-shell'>
          <div className='zoom-screen'>
            <div className='zoom-scanlines' />
          </div>
        </div>
        <div className='zoom-neck' />
        <div className='zoom-base' />
      </div>

      {!started && (
        <button className='zoom-start-btn' onClick={() => setStarted(true)}>
          <span className='zoom-start-icon'>▶</span>
          <span>iniciar</span>
        </button>
      )}
    </div>
  );
}
