import { projects } from '../../data/projects'

type StoreSnapshot = {
  pushLine: (line: { type: 'input' | 'output' | 'system' | 'error' | 'blank'; content: string }) => void
  openWindow: (type: 'project' | 'about' | 'skills' | 'contact', data?: unknown) => void
  clearLines: () => void
  currentDirectory: string
}

type CommandHandler = (args: string[], store: StoreSnapshot) => void

const COMMANDS: Record<string, CommandHandler> = {
  help: (_args, { pushLine }) => {
    pushLine({ type: 'blank', content: '' })
    pushLine({ type: 'system', content: '┌─ COMANDOS DISPONÍVEIS ──────────────────────────┐' })
    pushLine({ type: 'output', content: '│  help              mostra esta ajuda             │' })
    pushLine({ type: 'output', content: '│  ls / ls projetos/ lista projetos                 │' })
    pushLine({ type: 'output', content: '│  cat about.txt     sobre mim                      │' })
    pushLine({ type: 'output', content: '│  cat skills.json   minhas habilidades             │' })
    pushLine({ type: 'output', content: '│  cat contact.md    informações de contato         │' })
    pushLine({ type: 'output', content: '│  cd projetos/[id]  abre projeto específico        │' })
    pushLine({ type: 'output', content: '│  whoami            identidade do desenvolvedor    │' })
    pushLine({ type: 'output', content: '│  clear             limpa o terminal               │' })
    pushLine({ type: 'system', content: '└───────────────────────────────────────────────────┘' })
    pushLine({ type: 'blank', content: '' })
  },

  ls: (args, { pushLine }) => {
    pushLine({ type: 'blank', content: '' })
    pushLine({ type: 'system', content: '~/portfolio/projetos/' })
    pushLine({ type: 'blank', content: '' })
    projects.forEach((p, i) => {
      const isLast = i === projects.length - 1
      const prefix = isLast ? '└──' : '├──'
      const status = p.status === 'completed' ? '[✓]' : '[~]'
      pushLine({ type: 'output', content: `${prefix} ${status} ${p.name}/` })
      if (!isLast) {
        pushLine({ type: 'output', content: '│     ' + p.tech.join(' · ') })
      } else {
        pushLine({ type: 'output', content: '      ' + p.tech.join(' · ') })
      }
    })
    pushLine({ type: 'blank', content: '' })
    pushLine({ type: 'system', content: `${projects.length} projetos encontrados` })
    pushLine({ type: 'blank', content: '' })
  },

  cat: (args, { pushLine, openWindow }) => {
    const target = args[0]
    if (!target) {
      pushLine({ type: 'error', content: 'cat: argumento ausente' })
      return
    }
    switch (target) {
      case 'about.txt':
        openWindow('about')
        pushLine({ type: 'system', content: '→ abrindo about.txt...' })
        break
      case 'skills.json':
        openWindow('skills')
        pushLine({ type: 'system', content: '→ abrindo skills.json...' })
        break
      case 'contact.md':
        pushLine({ type: 'blank', content: '' })
        pushLine({ type: 'system', content: '# contato.md' })
        pushLine({ type: 'blank', content: '' })
        pushLine({ type: 'output', content: '📧  felipe@email.com' })
        pushLine({ type: 'output', content: '💼  linkedin.com/in/felipe-dev' })
        pushLine({ type: 'output', content: '🐙  github.com/felipe-dev' })
        pushLine({ type: 'output', content: '🌐  felipedev.com.br' })
        pushLine({ type: 'blank', content: '' })
        pushLine({ type: 'system', content: 'disponível para projetos freelance e oportunidades CLT.' })
        pushLine({ type: 'blank', content: '' })
        break
      default:
        pushLine({ type: 'error', content: `cat: ${target}: arquivo não encontrado` })
    }
  },

  cd: (args, { pushLine, openWindow }) => {
    const path = args[0]
    if (!path) {
      pushLine({ type: 'error', content: 'cd: caminho ausente' })
      return
    }
    const projectId = path.replace('projetos/', '').replace('/', '')
    const project = projects.find((p) => p.id === projectId)
    if (!project) {
      pushLine({ type: 'error', content: `cd: ${path}: diretório não encontrado` })
      pushLine({ type: 'system', content: 'use "ls projetos/" para ver projetos disponíveis' })
      return
    }
    openWindow('project', project)
    pushLine({ type: 'system', content: `→ abrindo ${project.name}...` })
  },

  whoami: (_args, { pushLine }) => {
    pushLine({ type: 'blank', content: '' })
    pushLine({ type: 'output', content: 'Felipe — Desenvolvedor Full-Stack' })
    pushLine({ type: 'output', content: 'Java · Spring Boot · React · TypeScript' })
    pushLine({ type: 'output', content: 'São Paulo, Brasil' })
    pushLine({ type: 'blank', content: '' })
  },

  clear: (_args, { clearLines }) => {
    clearLines()
  },
}

COMMANDS['ls projetos/'] = COMMANDS['ls']

export function getCommandRegistry(store: StoreSnapshot) {
  return (rawInput: string) => {
    const trimmed = rawInput.trim()
    if (!trimmed) return

    const [cmd, ...args] = trimmed.split(' ')
    const fullCmd = trimmed

    const handler = COMMANDS[fullCmd] ?? COMMANDS[cmd]
    if (handler) {
      handler(args, store)
    } else {
      store.pushLine({ type: 'error', content: `comando não encontrado: ${cmd}` })
      store.pushLine({ type: 'system', content: 'digite "help" para ver os comandos disponíveis' })
    }
  }
}
