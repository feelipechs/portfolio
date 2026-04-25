import { useState, useEffect, useRef } from 'react';

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  startDelay?: number;
  enabled?: boolean;
}

interface UseTypewriterResult {
  displayText: string;
  isComplete: boolean;
}

export function useTypewriter({
  text,
  speed = 30,
  startDelay = 0,
  enabled = true,
}: UseTypewriterOptions): UseTypewriterResult {
  const [displayText, setDisplayText] = useState('');
  const [isComplete, setIsComplete] = useState(false);
  const indexRef = useRef(0);

  useEffect(() => {
    let charTimer: ReturnType<typeof setTimeout>;

    if (!enabled) {
      // setTimeout 0 tira do ciclo síncrono do effect
      const timer = setTimeout(() => {
        setDisplayText(text);
        setIsComplete(true);
      }, 0);
      return () => clearTimeout(timer);
    }

    indexRef.current = 0;

    const tick = () => {
      if (indexRef.current <= text.length) {
        const current = indexRef.current;
        indexRef.current++;
        setDisplayText(text.slice(0, current));
        charTimer = setTimeout(tick, speed);
      } else {
        setIsComplete(true);
      }
    };

    const startTimer = setTimeout(tick, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearTimeout(charTimer);
    };
  }, [text, speed, startDelay, enabled]);

  return { displayText, isComplete };
}
