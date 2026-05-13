import { create } from 'zustand';
import { nanoid } from 'nanoid';
import { getCommandRegistry } from '../components/terminal/CommandRegistry';
import { useAppStore } from './appStore';
import { useWindowStore } from './windowStore';

export interface TerminalLine {
  id: string;
  type: 'input' | 'output' | 'system' | 'error' | 'blank' | 'interactive';
  content: string;
  interactive?: {
    component: 'project-list';
  };
}

interface TerminalStore {
  lines: TerminalLine[];
  isTyping: boolean;
  currentDirectory: string;

  pushLine: (line: Omit<TerminalLine, 'id'>) => void;
  updateLastLine: (content: string) => void;
  typeCommand: (cmd: string) => Promise<void>;
  executeCommand: (cmd: string) => void;
  clearLines: () => void;
}

export const useTerminalStore = create<TerminalStore>((set, get) => ({
  lines: [],
  isTyping: false,
  currentDirectory: '~/portfolio',

  pushLine: (line) =>
    set((state) => ({
      lines: [...state.lines, { ...line, id: nanoid() }],
    })),

  updateLastLine: (content) =>
    set((state) => {
      const lines = [...state.lines];
      if (lines.length === 0) return state;
      lines[lines.length - 1] = { ...lines[lines.length - 1], content };
      return { lines };
    }),

  typeCommand: async (cmd) => {
    const { pushLine, updateLastLine, executeCommand } = get();
    set({ isTyping: true });

    pushLine({ type: 'input', content: '' });

    for (let i = 0; i <= cmd.length; i++) {
      await new Promise((r) => setTimeout(r, 40 + Math.random() * 50));
      updateLastLine(cmd.slice(0, i));
    }

    await new Promise((r) => setTimeout(r, 300));
    set({ isTyping: false });
    executeCommand(cmd);
  },

  executeCommand: (cmd) => {
    const store = get();
    getCommandRegistry({
      pushLine: store.pushLine,
      openWindow: (type, data) => useWindowStore.getState().openWindow(type, data),
      clearLines: store.clearLines,
      currentDirectory: store.currentDirectory,
      triggerShutdown: () => useAppStore.getState().triggerShutdown(),
    })(cmd.trim());
  },

  clearLines: () => set({ lines: [] }),
}));
