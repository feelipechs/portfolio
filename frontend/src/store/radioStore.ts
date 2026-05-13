import { create } from 'zustand';

export interface Track {
  name: string;
  file: string;
}

export interface RadioStore {
  isPlaying: boolean;
  currentTrack: number;
  volume: number;
  tracks: Track[];
  toggle: () => void;
  play: () => void;
  pause: () => void;
  next: () => void;
  prev: () => void;
  setVolume: (v: number) => void;
  setTrack: (i: number) => void;
}

export const useRadioStore = create<RadioStore>((set) => ({
  isPlaying: false,
  currentTrack: 0,
  volume: 0.25,
  tracks: [
    { name: 'Better Times', file: '/sounds/track1.mp3' },
    { name: 'Sun in Your Eyes', file: '/sounds/track2.mp3' },
    { name: 'Lonerism', file: '/sounds/track3.mp3' },
  ],
  toggle: () => set((s) => ({ isPlaying: !s.isPlaying })),
  play: () => set({ isPlaying: true }),
  pause: () => set({ isPlaying: false }),
  next: () =>
    set((s) => ({
      currentTrack: (s.currentTrack + 1) % s.tracks.length,
      isPlaying: true,
    })),
  prev: () =>
    set((s) => ({
      currentTrack:
        (s.currentTrack - 1 + s.tracks.length) % s.tracks.length,
      isPlaying: true,
    })),
  setVolume: (v) => set({ volume: v }),
  setTrack: (i) => set({ currentTrack: i, isPlaying: true }),
}));
