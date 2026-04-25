import { useTerminalStore } from '../../store/terminalStore'

export function Taskbar() {
  const { windows, focusWindow, minimizeWindow } = useTerminalStore()

  if (windows.length === 0) return null

  return (
    <div className="taskbar">
      {windows.map((w) => (
        <button
          key={w.id}
          className={`taskbar-item ${w.isMinimized ? 'taskbar-item--minimized' : ''}`}
          onClick={() => (w.isMinimized ? focusWindow(w.id) : minimizeWindow(w.id))}
        >
          <span className="taskbar-icon">▣</span>
          <span className="taskbar-label">{w.title}</span>
        </button>
      ))}
    </div>
  )
}
