import { useState } from 'react'
import { ZoomInScreen } from './components/boot/ZoomInScreen'
import { BootSequence } from './components/boot/BootSequence'
import { Terminal } from './components/terminal/Terminal'

type Phase = 'zoom' | 'boot' | 'terminal'

export default function App() {
  const [phase, setPhase] = useState<Phase>('zoom')

  return (
    <div className="app">
      {phase === 'zoom' && <ZoomInScreen onComplete={() => setPhase('boot')} />}
      {phase === 'boot' && <BootSequence onComplete={() => setPhase('terminal')} />}
      <div
        className="terminal-phase"
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
    </div>
  )
}
