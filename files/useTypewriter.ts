import { useState, useEffect } from 'react'

interface UseTypewriterOptions {
  text: string
  speed?: number
  startDelay?: number
  enabled?: boolean
}

interface UseTypewriterResult {
  displayText: string
  isComplete: boolean
}

export function useTypewriter({
  text,
  speed = 30,
  startDelay = 0,
  enabled = true,
}: UseTypewriterOptions): UseTypewriterResult {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!enabled) {
      setDisplayText(text)
      setIsComplete(true)
      return
    }

    setDisplayText('')
    setIsComplete(false)

    let index = 0
    let startTimer: ReturnType<typeof setTimeout>
    let charTimer: ReturnType<typeof setTimeout>

    startTimer = setTimeout(() => {
      const tick = () => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index))
          index++
          charTimer = setTimeout(tick, speed)
        } else {
          setIsComplete(true)
        }
      }
      tick()
    }, startDelay)

    return () => {
      clearTimeout(startTimer)
      clearTimeout(charTimer)
    }
  }, [text, speed, startDelay, enabled])

  return { displayText, isComplete }
}
