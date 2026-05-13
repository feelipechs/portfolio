import { useWindowStore } from '../../store/windowStore'
import { useRadioStore } from '../../store/radioStore'

export function Taskbar() {
  const { windows, focusWindow, minimizeWindow } = useWindowStore()
  const openWindow = useWindowStore((s) => s.openWindow)
  const { currentTrack, tracks } = useRadioStore()

  const handleRadioClick = () => {
    const existing = windows.find((w) => w.type === 'radio')
    if (existing) {
      focusWindow(existing.id)
    } else {
      openWindow('radio')
    }
  }

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
      <div style={{ flex: 1 }} />
      <button
        className="taskbar-item"
        onClick={handleRadioClick}
        title={`rádio: ${tracks[currentTrack]?.name ?? '---'}`}
        style={{ flexShrink: 0 }}
      >
        <span className="taskbar-icon">♪</span>
        <span className="taskbar-label">rádio</span>
      </button>
    </div>
  )
}
