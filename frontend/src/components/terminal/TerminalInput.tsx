import {
  useState,
  useRef,
  useEffect,
  type KeyboardEvent,
  type ChangeEvent,
} from 'react';
import { projects } from '../../data/projects';
import { useTerminalStore } from '../../store/terminalStore';

interface TerminalInputProps {
  onSubmit: (cmd: string) => void;
}

const PROMPT = '❯';

export function TerminalInput({ onSubmit }: TerminalInputProps) {
  const [value, setValue] = useState('');
  const [cursorPos, setCursorPos] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const currentDirectory = useTerminalStore((s) => s.currentDirectory);
  const isTyping = useTerminalStore((s) => s.isTyping);

  useEffect(() => {
    if (!isTyping) inputRef.current?.focus();
  }, [isTyping]);

  const syncCursor = () => {
    requestAnimationFrame(() => {
      setCursorPos(inputRef.current?.selectionStart ?? 0);
    });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    setCursorPos(e.target.selectionStart ?? e.target.value.length);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && value.trim()) {
      setHistory((prev) => [value, ...prev]);
      setHistoryIndex(-1);
      onSubmit(value);
      setValue('');
      setCursorPos(0);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      const cmd = history[next] ?? '';
      setValue(cmd);
      setCursorPos(cmd.length);
      syncCursor();
      return;
    }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      const cmd = next === -1 ? '' : (history[next] ?? '');
      setValue(cmd);
      setCursorPos(cmd.length);
      syncCursor();
      return;
    }
    if (e.key === 'Tab') {
      e.preventDefault();
      if (!value.trim()) return;

      const commands = [
        'help',
        'whoami',
        'clear',
        'ls',
        'ls projetos/',
        'cat about.json',
        'cat experience.json',
        'cat skills.json',
        'cat contact.json',
        'cat radio.json',
        'shutdown',
        'exit',
        ...projects.map((p) => `cd projetos/${p.id}`),
      ];

      const matches = commands.filter(
        (cmd) => cmd.startsWith(value) && cmd !== value
      );

      if (matches.length === 0) return;

      if (matches.length === 1) {
        setValue(matches[0]);
        setCursorPos(matches[0].length);
        return;
      }

      let common = matches[0];
      for (const match of matches.slice(1)) {
        let i = 0;
        while (i < common.length && common[i] === match[i]) i++;
        common = common.slice(0, i);
      }

      if (common.length > value.length) {
        setValue(common);
        setCursorPos(common.length);
      }
    }
    syncCursor();
  };

  if (isTyping) return null;

  return (
    <div className='terminal-input-row'>
      <span className='terminal-prompt'>
        <span className='terminal-dir'>{currentDirectory}</span>
        <span className='terminal-prompt-symbol'> {PROMPT} </span>
      </span>
      <div className='terminal-input-wrapper'>
        <span className='terminal-input-measure' aria-hidden>
          {value.slice(0, cursorPos)}
        </span>
        <span
          className={`terminal-cursor ${isFocused ? 'terminal-cursor--active' : ''}`}
          aria-hidden
        />
        <input
          ref={inputRef}
          className='terminal-input'
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onSelect={syncCursor}
          onClick={syncCursor}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          aria-label='comando'
          spellCheck={false}
          autoComplete='off'
          autoCapitalize='off'
        />
      </div>
    </div>
  );
}
