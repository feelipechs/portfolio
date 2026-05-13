# Felipe Chagas — Portfolio

Portfolio pessoal com estética de terminal retrô/CRT, e a tela inicial cyberpunk e pixel art. Construído com React + CSS + TypeScript.

## ✦ Acesse

[feelipechs.dev](https://www.feelipechs.dev)

## ✦ Conceito

Interface inspirada em sistemas operacionais retrô. O site simula um terminal interativo com suporte a comandos reais via teclado e navegação por clique — híbrido entre CLI e GUI.

O fluxo de entrada:
1. Cenário cyberpunk com um monitor com animação de zoom
2. Sequência de boot estilo BIOS/Linux
3. Terminal interativo com janelas draggables

## ✦ Tecnologias

- **React 19** + **TypeScript**
- **CSS** — estilização do terminal e interface
- **Vite** — bundler
- **Zustand** — gerenciamento de estado
- **Framer Motion** — animações e janelas
- **react-rnd** — janelas draggables e redimensionáveis
- **web3forms** — formulário de contato

## ✦ Funcionalidades

- Terminal com histórico de comandos (↑↓) e autocomplete (Tab)
- Hybrid CLI/GUI — botões do menu digitam o comando automaticamente
- Janelas draggables: sobre, skills, projetos, experiência, contato
- 4 temas: `modern`, `dark`, `retro` (CRT verde), `amber` (IBM 5151)
- Versão mobile simplificada para viewports < 768px
- Formulário de contato funcional

## ✦ Comandos disponíveis

| Comando | Ação |
|---|---|
| `help` | lista comandos |
| `whoami` | identidade do dev |
| `ls projetos/` | lista projetos |
| `cd projetos/[id]` | abre projeto |
| `cat about.txt` | sobre mim |
| `cat skills.json` | habilidades |
| `cat experience.txt` | trajetória |
| `cat contact.md` | contato |
| `clear` | limpa o terminal |

## ✦ Estrutura
```
frontend/src/
├── components/
│   ├── boot/          # ZoomInScreen, BootSequence
│   ├── terminal/      # Terminal, Input, Output, CommandRegistry
│   ├── gui/           # MenuBar, Taskbar, Window, WindowManager
│   ├── windows/       # About, Skills, Experience, Project, Contact
│   └── mobile/        # MobileView
├── data/              # projects, skills, about, experience, bootMessages
├── hooks/             # useTerminal, useTypewriter, useTheme
└── store/             # terminalStore (Zustand)
```
