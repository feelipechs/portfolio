import { useEffect, useRef, useState } from 'react';
import { CyberpunkScene } from './CyberpunkScene';
import { useRainAnimation } from '../../hooks/useRainAnimation';
import { useBootAudio } from '../../hooks/useBootAudio';

interface ZoomInScreenProps {
  onComplete: () => void;
  returning?: boolean;
}

export function ZoomInScreen({ onComplete, returning }: ZoomInScreenProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const monitorRef = useRef<SVGRectElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [poweredOn, setPoweredOn] = useState(false);
  const [loading, setLoading] = useState(!returning);
  const [loadingPhase, setLoadingPhase] = useState<'booting' | 'ready'>('booting');
  const { unlockRain, playBoot } = useBootAudio();
  useRainAnimation();

  useEffect(() => {
    const timer = setTimeout(() => setLoadingPhase('ready'), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingDone = () => {
    if (loadingPhase !== 'ready') return;
    unlockRain();
    setLoading(false);
  };

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    setPoweredOn(true);
    playBoot();

    const svg = svgRef.current;
    const monitor = monitorRef.current;
    const overlay = overlayRef.current;
    if (!svg || !monitor || !overlay) return;

    setTimeout(() => {
      const monRect = monitor.getBoundingClientRect();
      const monCx = monRect.left + monRect.width / 2;
      const monCy = monRect.top + monRect.height / 2;
      const vpCx = window.innerWidth / 2;
      const vpCy = window.innerHeight / 2;
      const scaleX = window.innerWidth / monRect.width;
      const scaleY = window.innerHeight / monRect.height;
      const scale = Math.max(scaleX, scaleY) * 1.1;
      const tx = vpCx - monCx;
      const ty = vpCy - monCy;

      svg.style.transition = 'transform 1.8s cubic-bezier(0.4, 0, 0.2, 1)';
      svg.style.transformOrigin = `${monCx}px ${monCy}px`;
      svg.style.transform = `translate(${tx}px, ${ty}px) scale(${scale})`;

      setTimeout(() => {
        overlay.classList.add('fade-in');
      }, 2000);

      setTimeout(() => {
        onComplete();
      }, 2800);
    }, 800);
  };

  return (
    <>
      {loading && (
        <div className='loading-overlay' onClick={handleLoadingDone}>
          <div className='loading-content'>
            {loadingPhase === 'booting' ? (
              <p className='loading-text'>Carregando sistemas<span className='loading-cursor'>_</span></p>
            ) : (
              <button className='loading-btn'>Iniciar</button>
            )}
          </div>
        </div>
      )}
      <div style={{ display: loading ? 'none' : undefined }}>
        <CyberpunkScene
          ref={svgRef}
          poweredOn={poweredOn}
          monitorRef={monitorRef}
          onAccess={handleStart}
        />
        <div ref={overlayRef} className='zoom-overlay' />
      </div>
    </>
  );
}
