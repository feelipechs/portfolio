import { useState, useRef, useEffect, type KeyboardEvent } from 'react'

interface TerminalInputProps {
  currentDirectory: string
  isTyping: boolean
  onSubmit: (cmd: string) => void
}

const PROMPT = '❯'

export function TerminalInput({ currentDirectory, isTyping, onSubmit }: TerminalInputProps) {
  const [value, setValue] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!isTyping) {
      inputRef.current?.focus()
    }
  }, [isTyping])

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      setHistory((prev) => [value, ...prev])
      setHistoryIndex(-1)
      onSubmit(value)
      setValue('')
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault()
      const nextIndex = Math.min(historyIndex + 1, history.length - 1)
      setHistoryIndex(nextIndex)
      setValue(history[nextIndex] ?? '')
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      const nextIndex = Math.max(historyIndex - 1, -1)
      setHistoryIndex(nextIndex)
      setValue(nextIndex === -1 ? '' : history[nextIndex] ?? '')
    }
  }

  if (isTyping) return null

  return (
    <div className="terminal-input-row">
      <span className="terminal-prompt">
        <span className="terminal-dir">{currentDirectory}</span>
        <span className="terminal-prompt-symbol"> {PROMPT} </span>
      </span>
      <input
        ref={inputRef}
        className="terminal-input"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        autoComplete="off"
        autoCapitalize="off"
      />
      <span className="terminal-cursor" />
    </div>
  )
}
