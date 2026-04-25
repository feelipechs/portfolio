import { useState, useEffect } from 'react'
import { bootMessages } from '../../data/bootMessages'

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState<number[]>([])

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = []

    bootMessages.forEach((msg, i) => {
      const t = setTimeout(() => {
        setVisibleLines((prev) => [...prev, i])
      }, msg.delay)
      timers.push(t)
    })

    const lastDelay = bootMessages[bootMessages.length - 1].delay
    const completeTimer = setTimeout(onComplete, lastDelay + 800)
    timers.push(completeTimer)

    return () => timers.forEach(clearTimeout)
  }, [onComplete])

  return (
    <div className="boot-screen">
      <div className="boot-scanlines" />
      <div className="boot-vignette" />
      <div className="boot-content">
        {bootMessages.map((msg, i) => (
          <div
            key={i}
            className={`boot-line boot-line--${msg.type ?? 'system'} ${
              visibleLines.includes(i) ? 'boot-line--visible' : ''
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  )
}
