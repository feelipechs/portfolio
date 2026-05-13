import { useCallback } from 'react'
import { useTerminalStore } from '../store/terminalStore'

export function useTerminal() {
  const lines = useTerminalStore((s) => s.lines)
  const isTyping = useTerminalStore((s) => s.isTyping)
  const currentDirectory = useTerminalStore((s) => s.currentDirectory)
  const pushLine = useTerminalStore((s) => s.pushLine)
  const typeCommand = useTerminalStore((s) => s.typeCommand)
  const executeCommand = useTerminalStore((s) => s.executeCommand)
  const clearLines = useTerminalStore((s) => s.clearLines)

  const submitCommand = useCallback(
    (cmd: string) => {
      if (!cmd.trim() || isTyping) return
      pushLine({ type: 'input', content: cmd })
      executeCommand(cmd)
    },
    [isTyping, pushLine, executeCommand]
  )

  return {
    lines,
    isTyping,
    currentDirectory,
    pushLine,
    typeCommand,
    submitCommand,
    clearLines,
  }
}
