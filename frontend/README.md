# Felipe Chagas — Portfolio

Portfolio pessoal com estética de terminal retrô/CRT, e a tela inicial cyberpunk e pixel art. Inspirado nos jogos Katana Zero e Replaced. Construído com React + TypeScript.

## ✦ Acesse

[feelipechs.dev](https://www.feelipechs.dev)

## ✦ Conceito

Interface inspirada em sistemas operacionais retrô. O site simula um terminal interativo com suporte a comandos reais via teclado e navegação por clique — híbrido entre CLI e GUI.

O fluxo de entrada:
1. Tela de carregamento → cenário cyberpunk com monitor e animações
2. Botão "ACESSAR" dentro do monitor → zoom + power-on
3. Sequência de boot estilo BIOS/Linux
4. Terminal interativo com janelas draggables + rádio synthwave

## ✦ Tecnologias

- **React 19** + **TypeScript 6**
- **CSS** — estilização com 4 temas via custom properties
- **Vite 8** — bundler
- **Zustand 5** — gerenciamento de estado global
- **Framer Motion 12** — animações de janelas
- **react-rnd** — janelas draggables e redimensionáveis
- **web3forms** — formulário de contato
- **react-icons** — ícones (FiMail, FaGithub, SiReact, etc.)

## ✦ Funcionalidades

- Terminal com histórico de comandos (↑↓) e autocomplete (Tab)
- Híbrido CLI/GUI — botões do menu digitam o comando automaticamente
- Janelas draggables: sobre, skills, projetos, experiência, contato, rádio
- 4 temas: `modern`, `dark`, `retro` (CRT verde), `amber` (IBM 5151)
- Versão mobile simplificada para viewports < 768px
- Formulário de contato funcional
- Rádio synthwave com 3 faixas (play/pause, next/prev, volume)
- Efeitos sonoros: chuva ambiente + som de boot do computador
- Animações na tela inicial: fumaça, Z's do cachorro, chuva nas janelas
- Comando `shutdown` / `exit` para voltar à tela inicial

## ✦ Comandos disponíveis

| Comando | Ação |
|---------|------|
| `help` | lista comandos |
| `whoami` | identidade do dev |
| `ls projetos/` | lista projetos |
| `cd projetos/[id]` | abre projeto específico |
| `cat about.json` | sobre mim |
| `cat skills.json` | habilidades |
| `cat experience.json` | trajetória |
| `cat contact.json` | contato |
| `cat radio.json` | web radio player |
| `clear` | limpa o terminal |
| `shutdown` / `exit` | desligar o sistema |

## ✦ Temas

| Tema | Preview | Descrição |
|------|---------|-----------|
| `modern` | `#aa3bff` | light & clean |
| `dark` | `#c084fc` | dark & minimal (padrão) |
| `retro` | `#00ff88` | crt phosphor |
| `amber` | `#ffaa00` | ibm 5151 |

Alterar no seletor de tema no canto superior direito do terminal, ou via `localStorage.setItem('theme', 'retro')`.

## ✦ Estrutura

```
src/
├── components/
│   ├── boot/           # ZoomInScreen, CyberpunkScene, BootSequence
│   ├── terminal/       # Terminal, Input, Output, CommandRegistry
│   ├── gui/            # MenuBar, Taskbar, Window, WindowManager
│   ├── windows/        # About, Skills, Experience, Project, Contact, MusicPlayer
│   ├── radio/          # RadioPlayer
│   └── mobile/         # MobileView
├── data/               # projects, skills, about, experience, bootMessages
├── hooks/              # useTerminal, useRainAnimation, useBootAudio, useDraggable, useTheme
└── store/              # terminalStore, windowStore, radioStore, appStore
```

## ✦ Scripts

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia servidor de desenvolvimento |
| `npm run build` | Build de produção (TypeScript + Vite) |
| `npm run lint` | Verifica código com ESLint |
| `npm run preview` | Preview do build de produção |
