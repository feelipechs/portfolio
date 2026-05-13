import { create } from 'zustand';
import { nanoid } from 'nanoid';

export interface WindowState {
  id: string;
  type: 'project' | 'about' | 'skills' | 'contact' | 'experience' | 'radio';
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  prevPosition?: { x: number; y: number };
  prevSize?: { width: number; height: number };
  isMinimized: boolean;
  isMaximized: boolean;
  zIndex: number;
  data?: unknown;
}

const WINDOW_DEFAULTS: Record<
  WindowState['type'],
  { title: string; size: { width: number; height: number } }
> = {
  about: { title: 'about.json', size: { width: 560, height: 420 } },
  skills: { title: 'skills.json', size: { width: 580, height: 480 } },
  project: { title: 'project.json', size: { width: 620, height: 500 } },
  contact: { title: 'contact.json', size: { width: 480, height: 360 } },
  experience: { title: 'experience.json', size: { width: 600, height: 520 } },
  radio: { title: 'radio.json', size: { width: 380, height: 360 } },
};

interface WindowStore {
  windows: WindowState[];
  topZIndex: number;
  openWindow: (type: WindowState['type'], data?: unknown) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, pos: { x: number; y: number }) => void;
  updateWindowSize: (id: string, size: { width: number; height: number }) => void;
}

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  topZIndex: 10,

  openWindow: (type, data) => {
    const existing = get().windows.find(
      (w) => w.type === type && type !== 'project'
    );
    if (existing) {
      get().focusWindow(existing.id);
      return;
    }

    const defaults = WINDOW_DEFAULTS[type];
    const topZIndex = get().topZIndex + 1;
    const offset = get().windows.length * 30;

    set((state) => ({
      topZIndex,
      windows: [
        ...state.windows,
        {
          id: nanoid(),
          type,
          title:
            type === 'project' && data
              ? (data as { name: string }).name
              : defaults.title,
          position: { x: 120 + offset, y: 80 + offset },
          size: defaults.size,
          isMinimized: false,
          isMaximized: false,
          zIndex: topZIndex,
          data,
        },
      ],
    }));
  },

  closeWindow: (id) =>
    set((state) => ({
      windows: state.windows.filter((w) => w.id !== id),
    })),

  focusWindow: (id) => {
    const topZIndex = get().topZIndex + 1;
    set((state) => ({
      topZIndex,
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, zIndex: topZIndex, isMinimized: false } : w
      ),
    }));
  },

  minimizeWindow: (id) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, isMinimized: !w.isMinimized } : w
      ),
    })),

  toggleMaximize: (id) => {
    set((state) => ({
      windows: state.windows.map((w) => {
        if (w.id !== id) return w;
        if (w.isMaximized && w.prevPosition && w.prevSize) {
          return {
            ...w,
            isMaximized: false,
            position: w.prevPosition,
            size: w.prevSize,
          };
        }
        return {
          ...w,
          isMaximized: true,
          prevPosition: w.position,
          prevSize: w.size,
          position: { x: 0, y: 0 },
          size: { width: window.innerWidth, height: window.innerHeight - 40 },
        };
      }),
    }));
  },

  updateWindowPosition: (id, pos) =>
    set((state) => ({
      windows: state.windows.map((w) =>
        w.id === id ? { ...w, position: pos } : w
      ),
    })),

  updateWindowSize: (id, size) =>
    set((state) => ({
      windows: state.windows.map((w) => (w.id === id ? { ...w, size } : w)),
    })),
}));
