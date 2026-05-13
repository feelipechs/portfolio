import { useRef, useEffect } from 'react';

export function useBootAudio() {
  const rainRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio('/sounds/rain.mp3');
    audio.loop = true;
    audio.volume = 0.12;
    rainRef.current = audio;
    audio.play().catch(() => {});

    return () => {
      audio.pause();
      audio.src = '';
      rainRef.current = null;
    };
  }, []);

  const playBoot = () => {
    const boot = new Audio('/sounds/boot.mp3');
    boot.volume = 0.3;
    boot.play().catch(() => {});
  };

  const unlockRain = () => {
    rainRef.current?.play().catch(() => {});
  };

  return { unlockRain, playBoot };
}
