import { useEffect, useRef } from 'react';
import { useRadioStore } from '../../store/radioStore';

export function RadioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadRef = useRef<HTMLAudioElement | null>(null);
  const { isPlaying, currentTrack, volume, tracks, next } = useRadioStore();

  useEffect(() => {
    const audio = new Audio(tracks[currentTrack].file);
    audio.volume = volume;
    audio.loop = false;
    audioRef.current = audio;

    if (isPlaying) {
      audio.play().catch(() => {});
    }

    const onEnded = () => next();
    audio.addEventListener('ended', onEnded);

    const nextIndex = (currentTrack + 1) % tracks.length;
    const preload = new Audio(tracks[nextIndex].file);
    preload.preload = 'auto';
    preloadRef.current = preload;

    return () => {
      audio.removeEventListener('ended', onEnded);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
      preloadRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrack, tracks, next]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  return null;
}
