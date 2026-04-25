import { useTerminalStore } from '../../store/terminalStore'

interface MenuItem {
  label: string
  command: string
  icon: string
}

const MENU_ITEMS: MenuItem[] = [
  { label: 'sobre mim', command: 'cat about.txt', icon: '▸' },
  { label: 'projetos', command: 'ls projetos/', icon: '▸' },
  { label: 'skills', command: 'cat skills.json', icon: '▸' },
  { label: 'contato', command: 'cat contact.md', icon: '▸' },
]

export function MenuBar() {
  const { typeCommand, isTyping } = useTerminalStore()

  return (
    <div className="menubar">
      <div className="menubar-brand">
        <span className="menubar-logo">felipe.dev</span>
        <span className="menubar-slash">/</span>
      </div>
      <div className="menubar-actions">
        {MENU_ITEMS.map((item) => (
          <button
            key={item.command}
            className="menubar-btn"
            onClick={() => !isTyping && typeCommand(item.command)}
            disabled={isTyping}
          >
            <span className="menubar-icon">{item.icon}</span>
            <span className="menubar-label">{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}
