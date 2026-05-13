import { useEffect, useRef, useState } from 'react';
import { SiReact } from 'react-icons/si';

interface ZoomInScreenProps {
  onComplete: () => void;
}

export function ZoomInScreen({ onComplete }: ZoomInScreenProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const monitorRef = useRef<SVGRectElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);
  const [poweredOn, setPoweredOn] = useState(false);
  const [loading, setLoading] = useState(true);
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
      { el: rainLeft, x: 1482, y: 198, w: 119, h: 244 },
      { el: rainRight, x: 1620, y: 198, w: 113, h: 244 },
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
            <rect x='1482' y='198' width='119' height='244' />
          </clipPath>
          <clipPath id='window-right-clip'>
            <rect x='1620' y='198' width='113' height='244' />
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
          <foreignObject x='761' y='446' width='395' height='164'>
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
                <button
                  onClick={handleStart}
                  style={{
                    background: 'transparent',
                    border: '1px solid rgba(176, 110, 243, 0.4)',
                    borderRadius: '4px',
                    padding: '8px 24px',
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '15px',
                    color: '#b06ef3',
                    letterSpacing: '5px',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#b06ef3';
                    e.currentTarget.style.boxShadow = '0 0 16px rgba(176, 110, 243, 0.25)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(176, 110, 243, 0.4)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  ACESSAR
                </button>
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

        <g transform='translate(1580, 860) scale(0.65)'>
          <g
            style={{
              transformOrigin: '60px 108px',
              animation: 'tailWag 1.4s ease-in-out infinite',
            }}
          >
            <path
              d='M 148 108 Q 175 85 185 68'
              fill='none'
              stroke='#ff00cc'
              strokeWidth='5'
              strokeLinecap='round'
            />
            <circle cx='185' cy='66' r='7' fill='#ff00cc' opacity='0.9' />
            <circle
              cx='185'
              cy='66'
              r='10'
              fill='none'
              stroke='#ff00cc'
              strokeWidth='1.5'
              opacity='0.5'
              style={{ animation: 'nosePulse 1s ease-in-out infinite' }}
            />
          </g>

          <g>
            <rect x='55' y='138' width='28' height='20' rx='5' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
            <line x1='55' y1='148' x2='83' y2='148' stroke='rgba(0,200,255,0.45)' strokeWidth='2' />
            <rect x='44' y='154' width='24' height='16' rx='4' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
            <rect x='38' y='168' width='34' height='10' rx='5' fill='#1a0a1a' stroke='#ff00cc' strokeWidth='1.5' />
            <line x1='50' y1='178' x2='50' y2='170' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
            <line x1='60' y1='178' x2='60' y2='170' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
          </g>

          <g>
            <rect x='147' y='138' width='28' height='20' rx='5' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
            <line x1='147' y1='148' x2='175' y2='148' stroke='rgba(0,200,255,0.45)' strokeWidth='2' />
            <rect x='162' y='154' width='24' height='16' rx='4' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
            <rect x='158' y='168' width='34' height='10' rx='5' fill='#1a0a1a' stroke='#ff00cc' strokeWidth='1.5' />
            <line x1='170' y1='178' x2='170' y2='170' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
            <line x1='180' y1='178' x2='180' y2='170' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
          </g>

          <rect x='68' y='105' width='94' height='70' rx='10' fill='#12121e' stroke='#ff00cc' strokeWidth='1.8' />
          <rect x='78' y='115' width='74' height='50' rx='5' fill='none' stroke='rgba(0,200,255,0.18)' strokeWidth='1' />
          <line
            x1='82'
            y1='132'
            x2='148'
            y2='132'
            stroke='#00ccff'
            strokeWidth='2'
            opacity='.4'
            style={{ animation: 'stripePulse 2s ease-in-out infinite' }}
          />

          <circle cx='88' cy='120' r='2.8' fill='#00ccff' style={{ animation: 'dotP 1.5s ease-in-out infinite' }} />
          <circle
            cx='99'
            cy='120'
            r='2.8'
            fill='#ff00cc'
            style={{ animation: 'dotP 1.5s ease-in-out infinite', animationDelay: '0.3s' }}
          />
          <circle
            cx='110'
            cy='120'
            r='2.8'
            fill='#7700ff'
            style={{ animation: 'dotP 1.5s ease-in-out infinite', animationDelay: '0.6s' }}
          />

          <rect x='78' y='170' width='22' height='40' rx='5' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
          <line x1='78' y1='188' x2='100' y2='188' stroke='rgba(0,200,255,0.45)' strokeWidth='2' />
          <rect x='72' y='207' width='32' height='11' rx='5' fill='#1a0a1a' stroke='#ff00cc' strokeWidth='1.5' />
          <line x1='84' y1='218' x2='84' y2='209' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
          <line x1='94' y1='218' x2='94' y2='209' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />

          <rect x='130' y='170' width='22' height='40' rx='5' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
          <line x1='130' y1='188' x2='152' y2='188' stroke='rgba(0,200,255,0.45)' strokeWidth='2' />
          <rect x='126' y='207' width='32' height='11' rx='5' fill='#1a0a1a' stroke='#ff00cc' strokeWidth='1.5' />
          <line x1='138' y1='218' x2='138' y2='209' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
          <line x1='148' y1='218' x2='148' y2='209' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />

          <rect x='100' y='82' width='30' height='26' rx='4' fill='#0e0e1a' stroke='rgba(255,0,200,0.55)' strokeWidth='1.5' />
          <line x1='104' y1='92' x2='126' y2='92' stroke='rgba(0,200,255,0.4)' strokeWidth='1.5' />

          <g style={{ transformOrigin: '115px 105px', animation: 'headNod 4s ease-in-out infinite' }}>
            <g style={{ transformOrigin: '84px 60px', animation: 'earL 4s ease-in-out infinite' }}>
              <polygon points='76,42 96,42 90,18' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
              <line x1='84' y1='40' x2='87' y2='25' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
            </g>
            <g style={{ transformOrigin: '146px 60px', animation: 'earR 4s ease-in-out infinite' }}>
              <polygon points='134,42 154,42 140,18' fill='#12121e' stroke='#ff00cc' strokeWidth='1.5' />
              <line x1='146' y1='40' x2='143' y2='25' stroke='rgba(0,200,255,0.3)' strokeWidth='1' />
            </g>
            <line x1='115' y1='32' x2='115' y2='8' stroke='#00ccff' strokeWidth='2' opacity='.8' />
            <circle cx='115' cy='6' r='5' fill='#00ccff' style={{ animation: 'antPulse 1.2s ease-in-out infinite' }} />
            <g style={{ animation: 'dataStream 4s ease-in-out infinite' }}>
              <text x='108' y='4' fill='#00ccff' fontSize='7' fontFamily='monospace' opacity='.9'>
                01
              </text>
              <text x='108' y='-6' fill='#00ccff' fontSize='7' fontFamily='monospace' opacity='.7'>
                11
              </text>
            </g>
            <rect x='76' y='32' width='78' height='58' rx='8' fill='#12121e' stroke='#ff00cc' strokeWidth='1.8' />
            <rect x='84' y='40' width='62' height='42' rx='4' fill='none' stroke='rgba(0,200,255,0.13)' strokeWidth='1' />
            <rect x='84' y='44' width='62' height='18' rx='3' fill='#000' stroke='#00ccff' strokeWidth='1.2' />
            <rect x='84' y='44' width='62' height='18' rx='3' fill='none' />
            <g style={{ transformOrigin: '97px 58px', animation: 'eyeBlink 4s ease-in-out infinite' }}>
              <rect x='90' y='48' width='14' height='10' rx='2' fill='#00ccff' />
              <rect x='90' y='48' width='14' height='10' rx='2' fill='none' stroke='rgba(255,255,255,0.3)' strokeWidth='0.5' />
            </g>
            <g style={{ transformOrigin: '133px 55px', animation: 'eyeBlink 4s ease-in-out infinite' }}>
              <rect x='126' y='48' width='14' height='10' rx='2' fill='#00ccff' />
              <rect x='126' y='48' width='14' height='10' rx='2' fill='none' stroke='rgba(255,255,255,0.3)' strokeWidth='0.5' />
            </g>
            <rect x='101' y='68' width='28' height='16' rx='5' fill='#0a0a16' stroke='rgba(255,0,200,0.45)' strokeWidth='1.2' />
            <rect x='109' y='71' width='12' height='7' rx='2' fill='#ff00cc' style={{ animation: 'nosePulse 2s ease-in-out infinite' }} />
            <line x1='115' y1='78' x2='109' y2='83' stroke='rgba(255,0,200,0.5)' strokeWidth='1' strokeLinecap='round' />
            <line x1='115' y1='78' x2='121' y2='83' stroke='rgba(255,0,200,0.5)' strokeWidth='1' strokeLinecap='round' />
          </g>
        </g>


      </svg>

      <div ref={overlayRef} className='zoom-overlay' />
    </div>
    </>
  );
}
