import { create } from 'zustand'
import { nanoid } from 'nanoid'

export interface TerminalLine {
  id: string
  type: 'input' | 'output' | 'system' | 'error' | 'blank'
  content: string
}

export interface WindowState {
  id: string
  type: 'project' | 'about' | 'skills' | 'contact'
  title: string
  position: { x: number; y: number }
  size: { width: number; height: number }
  isMinimized: boolean
  zIndex: number
  data?: unknown
}

interface TerminalStore {
  lines: TerminalLine[]
  isTyping: boolean
  currentDirectory: string
  windows: WindowState[]
  topZIndex: number

  pushLine: (line: Omit<TerminalLine, 'id'>) => void
  updateLastLine: (content: string) => void
  typeCommand: (cmd: string) => Promise<void>
  executeCommand: (cmd: string) => void
  clearLines: () => void
  openWindow: (type: WindowState['type'], data?: unknown) => void
  closeWindow: (id: string) => void
  focusWindow: (id: string) => void
  minimizeWindow: (id: string) => void
  updateWindowPosition: (id: string, pos: { x: number; y: number }) => void
  updateWindowSize: (id: string, size: { width: number; height: number }) => void
}

const WINDOW_DEFAULTS: Record<WindowState['type'], { title: string; size: { width: number; height: number } }> = {
  about: { title: 'about.txt', size: { width: 560, height: 420 } },
  skills: { title: 'skills.json', size: { width: 580, height: 480 } },
  project: { title: 'project', size: { width: 620, height: 500 } },
  contact: { title: 'contact.md', size: { width: 480, height: 360 } },
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  lines: [],
  isTyping: false,
  currentDirectory: '~/portfolio',
  windows: [],
  topZIndex: 10,

  pushLine: (line) =>
    set((state) => ({
      lines: [...state.lines, { ...line, id: nanoid() }],
    })),

  updateLastLine: (content) =>
    set((state) => {
      const lines = [...state.lines]
      if (lines.length === 0) return state
      lines[lines.length - 1] = { ...lines[lines.length - 1], content }
      return { lines }
    }),

  typeCommand: async (cmd) => {
    const { pushLine, updateLastLine, executeCommand } = get()
    set({ isTyping: true })

    pushLine({ type: 'input', content: '' })

    for (let i = 0; i <= cmd.length; i++) {
      await new Promise((r) => setTimeout(r, 40 + Math.random() * 50))
      updateLastLine(cmd.slice(0, i))
    }

    await new Promise((r) => setTimeout(r, 300))
    set({ isTyping: false })
    executeCommand(cmd)
  },

  executeCommand: (cmd) => {
    const { getCommandRegistry } = require('../components/terminal/CommandRegistry')
    getCommandRegistry(get)(cmd.trim())
  },

  clearLines: () => set({ lines: [] }),

  openWindow: (type, data) => {
    const existing = get().windows.find((w) => w.type === type && type !== 'project')
    if (existing) {
      get().focusWindow(existing.id)
      return
    }

    const defaults = WINDOW_DEFAULTS[type]
    const topZIndex = get().topZIndex + 1
    const offset = get().windows.length * 30

    set((state) => ({
      topZIndex,
      windows: [
        ...state.windows,
        {
          id: nanoid(),
          type,
          title: type === 'project' && data ? (data as { name: string }).name : defaults.title,
          position: { x: 120 + offset, y: 80 + offset },
          size: defaults.size,
          isMinimized: false,
          zIndex: topZIndex,
          data,
        },
      ],
    }))
  },

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  focusWindow: (id) => {
    const topZIndex = get().topZIndex + 1
    set((state) => ({
      topZIndex,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: topZIndex, isMinimized: false } : w
      ),
    }))
  },

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    })),

  updateWindowPosition: (id, pos) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, position: pos } : w)),
    })),

  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    })),
}))
