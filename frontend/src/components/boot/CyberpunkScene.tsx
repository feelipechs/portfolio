import { forwardRef } from 'react';
import { SiReact } from 'react-icons/si';
import { useRadioStore } from '../../store/radioStore';

interface CyberpunkSceneProps {
  poweredOn: boolean;
  monitorRef: React.RefObject<SVGRectElement | null>;
  onAccess: () => void;
}

export const CyberpunkScene = forwardRef<SVGSVGElement, CyberpunkSceneProps>(
  function CyberpunkScene({ poweredOn, monitorRef, onAccess }, svgRef) {
    const radioToggle = useRadioStore((s) => s.toggle);

    return (
      <div className='scene-wrapper'>
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
            x='0' y='0'
            width='1920' height='1080'
            preserveAspectRatio='xMidYMid meet'
          />

          <g id='monitor-group'>
            <rect
              ref={monitorRef}
              x='760' y='445'
              width='397' height='166'
              fill='#04040e' rx='3'
            />
            <foreignObject x='760' y='445' width='397' height='166'>
              <div {...{ xmlns: 'http://www.w3.org/1999/xhtml' }} style={{
                  width: '100%', height: '100%',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: '10px', background: '#04040e',
                }}
              >
                {poweredOn ? (
                  <SiReact size={28} color='#b06ef3' style={{
                      opacity: 0.4, transition: 'opacity 0.5s ease-in',
                    }} />
                ) : (
                  <span
                    onClick={onAccess}
                    style={{
                      fontFamily: "'Share Tech Mono', monospace",
                      fontSize: '20px', color: '#b06ef3',
                      letterSpacing: '6px', textTransform: 'uppercase',
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
              x='760' y='445'
              width='397' height='166'
              fill='none' stroke='#3020a0'
              strokeWidth='1' rx='3' opacity='0.6'
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
      </div>
    );
  }
);
