import { useEffect, useRef, useState } from 'react';
import { SiReact } from 'react-icons/si';
import { useRadioStore } from '../../store/radioStore';

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
  const radioToggle = useRadioStore((s) => s.toggle);
  const [loadingPhase, setLoadingPhase] = useState<'booting' | 'ready'>('booting');
  const rainAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sounds/rain.mp3');
    audio.loop = true;
    audio.volume = 0.12;
    rainAudioRef.current = audio;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.src = '';
      rainAudioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingPhase('ready'), 2200);
    return () => clearTimeout(timer);
  }, []);

  const handleLoadingDone = () => {
    if (loadingPhase !== 'ready') return;
    rainAudioRef.current?.play().catch(() => {});
    setLoading(false);
  };

  useEffect(() => {
    const rainLeft = document.getElementById('rain-left') as SVGGElement | null;
    const rainRight = document.getElementById('rain-right') as SVGGElement | null;
    if (!rainLeft || !rainRight) return;

    const wins = [
      { el: rainLeft, x: 1486, y: 201, w: 117, h: 239 },
      { el: rainRight, x: 1625, y: 201, w: 111, h: 239 },
    ];

    const COUNT = 35;
    const drops: SVGLineElement[] = [];
    const NS = 'http://www.w3.org/2000/svg';

    wins.forEach((win) => {
      for (let i = 0; i < COUNT; i++) {
        const line = document.createElementNS(NS, 'line');
        const x = win.x + Math.random() * win.w;
        const y = win.y + Math.random() * win.h;
        const len = 6 + Math.random() * 12;
        line.setAttribute('x1', String(x));
        line.setAttribute('y1', String(y));
        line.setAttribute('x2', String(x));
        line.setAttribute('y2', String(y + len));
        line.setAttribute('class', 'raindrop');
        line.dataset.len = String(len);
        line.dataset.speed = String(0.8 + Math.random() * 1.5);
        line.dataset.wind = String(-0.15 - Math.random() * 0.25);
        line.dataset.winX = String(win.x);
        line.dataset.winY = String(win.y);
        line.dataset.winW = String(win.w);
        line.dataset.winH = String(win.h);
        win.el.appendChild(line);
        drops.push(line);
      }
    });

    let animId: number;
    function animate() {
      drops.forEach((d) => {
        let x = parseFloat(d.getAttribute('x1')!);
        let y = parseFloat(d.getAttribute('y1')!);
        const len = parseFloat(d.dataset.len!);
        const speed = parseFloat(d.dataset.speed!);
        const wind = parseFloat(d.dataset.wind!);
        const wx = parseFloat(d.dataset.winX!);
        const wy = parseFloat(d.dataset.winY!);
        const ww = parseFloat(d.dataset.winW!);
        const wh = parseFloat(d.dataset.winH!);

        y += speed;
        x += wind;

        if (y > wy + wh + 10 || x < wx - 10 || x > wx + ww + 10) {
          x = wx + Math.random() * ww;
          y = wy - Math.random() * 30;
        }

        d.setAttribute('x1', String(x));
        d.setAttribute('y1', String(y));
        d.setAttribute('x2', String(x));
        d.setAttribute('y2', String(y + len));
      });
      animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      wins.forEach((win) => {
        while (win.el.firstChild) {
          win.el.removeChild(win.el.firstChild);
        }
      });
    };
  }, []);

  const handleStart = () => {
    if (started) return;
    setStarted(true);
    setPoweredOn(true);

    const boot = new Audio('/sounds/boot.mp3');
    boot.volume = 0.3;
    boot.play().catch(() => {});

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
      <div className='scene-wrapper' style={{ display: loading ? 'none' : undefined }}>
      <svg
        ref={svgRef}
        viewBox='0 0 1920 1080'
        preserveAspectRatio='xMidYMid meet'
        className='scene-svg'
      >
        <defs>
          <clipPath id='window-left-clip'>
            <rect x='1486' y='201' width='117' height='239' />
          </clipPath>
          <clipPath id='window-right-clip'>
            <rect x='1625' y='201' width='111' height='239' />
          </clipPath>
        </defs>

        <image
          href='/background.webp'
          x='0'
          y='0'
          width='1920'
          height='1080'
          preserveAspectRatio='xMidYMid meet'
        />

        <g id='monitor-group'>
          <rect
            ref={monitorRef}
            x='761'
            y='446'
            width='395'
            height='164'
            fill='#04040e'
            rx='3'
          />
          <foreignObject x='760' y='445' width='397' height='166'>
            <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }} style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '10px',
                background: '#04040e',
              }}
            >
              {poweredOn ? (
                <SiReact size={28} color='#b06ef3' style={{
                    opacity: 0.4,
                    transition: 'opacity 0.5s ease-in',
                  }} />
              ) : (
                <span
                  onClick={handleStart}
                  style={{
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '20px',
                    color: '#b06ef3',
                    letterSpacing: '6px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    animation: 'neonPulse 2s ease-in-out infinite',
                    textShadow: '0 0 7px #b06ef3, 0 0 10px #b06ef3, 0 0 21px #b06ef3',
                  }}
                >
                  ACESSAR
                </span>
              )}
            </div>
          </foreignObject>
          <rect
            x='761'
            y='446'
            width='395'
            height='164'
            fill='none'
            stroke='#3020a0'
            strokeWidth='1'
            rx='3'
            opacity='0.6'
          />
        </g>

        <g clipPath='url(#window-left-clip)' id='rain-left' />
        <g clipPath='url(#window-right-clip)' id='rain-right' />

        <g id='smoke-group'>
          <circle cx='1200' cy='615' r='7' fill='#ccc' className='smoke' style={{ animationDelay: '0s' }} />
          <circle cx='1210' cy='618' r='5' fill='#ccc' className='smoke' style={{ animationDelay: '0.8s' }} />
          <circle cx='1195' cy='610' r='4' fill='#ccc' className='smoke' style={{ animationDelay: '1.6s' }} />
          <circle cx='1205' cy='605' r='3' fill='#ccc' className='smoke' style={{ animationDelay: '2.4s' }} />
        </g>

        <foreignObject x='636' y='624' width='36' height='26'>
          <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }} className='speaker-box' onClick={radioToggle} />
        </foreignObject>

        <g id='zzz-group'>
          <g>
            <text x='1400' y='810' fill='#006ac9' fontSize='14' fontFamily='monospace'>
              Z
              <animate attributeName='opacity' values='0;1;1;0' keyTimes='0;0.1;0.7;1' dur='3.5s' repeatCount='indefinite' />
            </text>
            <animateTransform attributeName='transform' type='translate' values='0,0;0,-40' dur='3.5s' repeatCount='indefinite' />
          </g>
          <g>
            <text x='1420' y='790' fill='#006ac9' fontSize='18' fontFamily='monospace'>
              Z
              <animate attributeName='opacity' values='0;1;1;0' keyTimes='0;0.1;0.7;1' dur='3.5s' begin='1.2s' repeatCount='indefinite' />
            </text>
            <animateTransform attributeName='transform' type='translate' values='0,0;0,-40' dur='3.5s' begin='1.2s' repeatCount='indefinite' />
          </g>
          <g>
            <text x='1445' y='765' fill='#006ac9' fontSize='22' fontFamily='monospace'>
              Z
              <animate attributeName='opacity' values='0;1;1;0' keyTimes='0;0.1;0.7;1' dur='3.5s' begin='2.4s' repeatCount='indefinite' />
            </text>
            <animateTransform attributeName='transform' type='translate' values='0,0;0,-40' dur='3.5s' begin='2.4s' repeatCount='indefinite' />
          </g>
        </g>


      </svg>

      <div ref={overlayRef} className='zoom-overlay' />
    </div>
    </>
  );
}
