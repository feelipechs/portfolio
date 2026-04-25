import { useEffect, useRef } from 'react';
import type { TerminalLine } from '../../store/terminalStore';
import { ProjectList } from './ProjectList';

interface TerminalOutputProps {
  lines: TerminalLine[];
  currentDirectory: string;
}

const PROMPT = '❯';

export function TerminalOutput({
  lines,
  currentDirectory,
}: TerminalOutputProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  return (
    <div className='terminal-output'>
      {lines.map((line) => {
        // case interativo — renderiza componente
        if (
          line.type === 'interactive' &&
          line.interactive?.component === 'project-list'
        ) {
          return (
            <div key={line.id} className='terminal-line'>
              <ProjectList />
            </div>
          );
        }

        // linhas normais — comportamento atual
        return (
          <div
            key={line.id}
            className={`terminal-line terminal-line--${line.type}`}
          >
            {line.type === 'input' && (
              <span className='terminal-prompt'>
                <span className='terminal-dir'>{currentDirectory}</span>
                <span className='terminal-prompt-symbol'> {PROMPT} </span>
              </span>
            )}
            <span className='terminal-text'>{line.content}</span>
          </div>
        );
      })}
      <div ref={bottomRef} />
    </div>
  );
}
