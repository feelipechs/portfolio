import { useEffect, useRef } from 'react';
import { MenuBar } from '../gui/MenuBar';
import { Taskbar } from '../gui/Taskbar';
import { TerminalOutput } from './TerminalOutput';
import { TerminalInput } from './TerminalInput';
import { WindowManager } from '../gui/WindowManager';
import { useTerminal } from '../../hooks/useTerminal';
import { useTerminalStore } from '../../store/terminalStore';

export function Terminal() {
  const { lines, isTyping, currentDirectory, submitCommand } = useTerminal();
  const { pushLine, typeCommand } = useTerminalStore();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    pushLine({
      type: 'system',
      content: 'PortfolioOS v1.0.1 — digite "help" para começar, ou use o menu acima',
    });
    pushLine({ type: 'blank', content: '' });

    const timer = setTimeout(() => {
      typeCommand('help');
    }, 600);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='terminal-wrapper'>
      <div className='crt-scanlines' />
      <div className='crt-vignette' />

      <div className='terminal-container'>
        <MenuBar />
        <div className='terminal-body'>
          <TerminalOutput lines={lines} currentDirectory={currentDirectory} />
          <TerminalInput currentDirectory={currentDirectory} isTyping={isTyping} onSubmit={submitCommand} />
        </div>
      </div>

      <WindowManager />
      <Taskbar />
    </div>
  );
}
