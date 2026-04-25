import { useState, useEffect } from 'react';

export type Theme = 'modern' | 'dark' | 'retro' | 'amber';

export const THEMES: {
  id: Theme;
  label: string;
  preview: string;
  description: string;
}[] = [
  {
    id: 'modern',
    label: 'modern',
    preview: '#aa3bff',
    description: 'light & clean',
  },
  {
    id: 'dark',
    label: 'dark',
    preview: '#c084fc',
    description: 'dark & minimal',
  },
  {
    id: 'retro',
    label: 'retro',
    preview: '#00ff88',
    description: 'crt phosphor',
  },
  { id: 'amber', label: 'amber', preview: '#ffaa00', description: 'ibm 5151' },
];

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const saved = localStorage.getItem('theme') as Theme;
    // garante que o valor salvo é válido
    return THEMES.some((t) => t.id === saved) ? saved : 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  return { theme, setTheme, themes: THEMES };
}
