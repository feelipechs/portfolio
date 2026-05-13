import { create } from 'zustand';

interface AppStore {
  shutdown: boolean;
  triggerShutdown: () => void;
  reset: () => void;
}

export const useAppStore = create<AppStore>((set) => ({
  shutdown: false,
  triggerShutdown: () => set({ shutdown: true }),
  reset: () => set({ shutdown: false }),
}));
