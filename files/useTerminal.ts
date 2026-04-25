import { useCallback } from 'react'
import { useTerminalStore } from '../store/terminalStore'

export function useTerminal() {
  const store = useTerminalStore()

  const submitCommand = useCallback(
    (cmd: string) => {
      if (!cmd.trim() || store.isTyping) return
      store.pushLine({ type: 'input', content: cmd })
      store.executeCommand(cmd)
    },
    [store]
  )

  return {
    lines: store.lines,
    isTyping: store.isTyping,
    currentDirectory: store.currentDirectory,
    submitCommand,
    typeCommand: store.typeCommand,
    clearLines: store.clearLines,
  }
}
