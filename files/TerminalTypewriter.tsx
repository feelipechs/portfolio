import { useTypewriter } from '../../hooks/useTypewriter'

interface TerminalTypewriterProps {
  text: string
  speed?: number
  onComplete?: () => void
}

export function TerminalTypewriter({ text, speed = 25, onComplete }: TerminalTypewriterProps) {
  const { displayText, isComplete } = useTypewriter({ text, speed })

  if (isComplete && onComplete) {
    onComplete()
  }

  return <span>{displayText}</span>
}
