import { create } from 'zustand';

interface AppStore {
  shutdownCount: number;
  triggerShutdown: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  shutdownCount: 0,
  triggerShutdown: () => set((s) => ({ shutdownCount: s.shutdownCount + 1 })),
}));
