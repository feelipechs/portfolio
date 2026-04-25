import { projects } from '../../data/projects';

type StoreSnapshot = {
  pushLine: (line: {
    type: 'input' | 'output' | 'system' | 'error' | 'blank' | 'interactive';
    content: string;
    interactive?: { component: 'project-list' };
  }) => void;
  openWindow: (
    type: 'project' | 'about' | 'experience' | 'skills' | 'contact',
    data?: unknown
  ) => void;
  clearLines: () => void;
  currentDirectory: string;
};

type CommandHandler = (args: string[], store: StoreSnapshot) => void;

const COMMANDS: Record<string, CommandHandler> = {
  help: (_args, { pushLine }) => {
    pushLine({ type: 'blank', content: '' });
    // prettier-ignore
    const lines = [
    '┌─ COMANDOS DISPONÍVEIS ─────────────────────────────┐',
    '│  help                 mostra esta ajuda             │',
    '│  ls / ls projetos/    lista projetos                │',
    '│  cat about.json       sobre mim                     │',
    '│  cat experience.json  minha trajetória              │',
    '│  cat skills.json      minhas habilidades            │',
    '│  cat contact.json     informações de contato        │',
    '│  cd projetos/[id]     abre projeto específico       │',
    '│  whoami               identidade do desenvolvedor   │',
    '│  clear                limpa o terminal              │',
    '└─────────────────────────────────────────────────────┘',
  ]
    lines.forEach((content) =>
      pushLine({ type: content.startsWith('│') ? 'output' : 'system', content })
    );
    pushLine({ type: 'blank', content: '' });
  },

  ls: (_args, { pushLine }) => {
    pushLine({ type: 'blank', content: '' });
    pushLine({ type: 'system', content: '~/portfolio/projetos/' });
    pushLine({ type: 'blank', content: '' });
    pushLine({
      type: 'interactive',
      content: '',
      interactive: { component: 'project-list' },
    });
    pushLine({ type: 'blank', content: '' });
    pushLine({
      type: 'system',
      content: `${projects.length} projetos encontrados`,
    });
    pushLine({ type: 'blank', content: '' });
  },

  cat: (args, { pushLine, openWindow }) => {
    const target = args[0];
    if (!target) {
      pushLine({ type: 'error', content: 'cat: argumento ausente' });
      return;
    }
    switch (target) {
      case 'about.json':
        openWindow('about');
        pushLine({ type: 'system', content: '→ abrindo about.json...' });
        break;
      case 'experience.json':
        openWindow('experience');
        pushLine({ type: 'system', content: '→ abrindo experience.json...' });
        break;
      case 'skills.json':
        openWindow('skills');
        pushLine({ type: 'system', content: '→ abrindo skills.json...' });
        break;
      case 'contact.json':
        openWindow('contact');
        pushLine({ type: 'system', content: '→ abrindo contact.json...' });
        break;
      default:
        pushLine({
          type: 'error',
          content: `cat: ${target}: arquivo não encontrado`,
        });
    }
  },

  cd: (args, { pushLine, openWindow }) => {
    const path = args[0];
    if (!path) {
      pushLine({ type: 'error', content: 'cd: caminho ausente' });
      return;
    }
    const projectId = path.replace('projetos/', '').replace('/', '');
    const project = projects.find((p) => p.id === projectId);
    if (!project) {
      pushLine({
        type: 'error',
        content: `cd: ${path}: diretório não encontrado`,
      });
      pushLine({
        type: 'system',
        content: 'use "ls projetos/" para ver projetos disponíveis',
      });
      return;
    }
    openWindow('project', project);
    pushLine({ type: 'system', content: `→ abrindo ${project.name}...` });
  },

  whoami: (_args, { pushLine }) => {
    pushLine({ type: 'blank', content: '' });
    pushLine({
      type: 'output',
      content: 'Felipe Chagas',
    });
    pushLine({
      type: 'output',
      content: 'Desenvolvedor de Software Full-Stack',
    });
    pushLine({ type: 'output', content: 'Guarujá, São Paulo' });
    pushLine({ type: 'blank', content: '' });
  },

  clear: (_args, { clearLines }) => {
    clearLines();
  },
};

COMMANDS['ls projetos/'] = COMMANDS['ls'];

export function getCommandRegistry(store: StoreSnapshot) {
  return (rawInput: string) => {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    const [cmd, ...args] = trimmed.split(' ');
    const fullCmd = trimmed;

    const handler = COMMANDS[fullCmd] ?? COMMANDS[cmd];
    if (handler) {
      handler(args, store);
    } else {
      store.pushLine({
        type: 'error',
        content: `comando não encontrado: ${cmd}`,
      });
      store.pushLine({
        type: 'system',
        content: 'digite "help" para ver os comandos disponíveis',
      });
    }
  };
}
