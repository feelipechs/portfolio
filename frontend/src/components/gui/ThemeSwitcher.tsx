import { useState, useRef, useEffect } from 'react';
import { useTheme, THEMES } from '../../hooks/useTheme';

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const current = THEMES.find((t) => t.id === theme) ?? THEMES[0];

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  return (
    <div className='theme-switcher' ref={ref}>
      <button
        className='theme-trigger'
        onClick={() => setOpen((o) => !o)}
        title='trocar tema'
      >
        <span className='theme-dot' style={{ background: current.preview }} />
        <span className='theme-trigger-label'>{current.label}</span>
        <span className='theme-trigger-arrow'>{open ? '▴' : '▾'}</span>
      </button>

      {open && (
        <div className='theme-dropdown'>
          {THEMES.map((t) => (
            <button
              key={t.id}
              className={`theme-option ${theme === t.id ? 'theme-option--active' : ''}`}
              onClick={() => {
                setTheme(t.id);
                setOpen(false);
              }}
            >
              <span className='theme-dot' style={{ background: t.preview }} />
              <span className='theme-option-info'>
                <span className='theme-option-label'>{t.label}</span>
                <span className='theme-option-desc'>{t.description}</span>
              </span>
              {theme === t.id && <span className='theme-option-check'>✓</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
