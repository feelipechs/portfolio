# AGENTS.md — Portfolio Frontend

Guia de contexto para agentes de IA trabalhando neste repositório.

---

## Visão Geral

Portfolio pessoal com estética de terminal retrô/CRT e tela inicial cyberpunk + pixel art.

**Stack**: React 19 · TypeScript · Vite · Zustand 5 · Framer Motion 12 · react-rnd · web3forms

**Fluxo de entrada do usuário**:
1. Cenário cyberpunk com animação de zoom (`ZoomInScreen`)
2. Sequência de boot estilo BIOS/Linux (`BootSequence`)
3. Terminal interativo com janelas draggables

**Estrutura relevante**:
```
frontend/src/
├── components/
│   ├── boot/          # ZoomInScreen, BootSequence
│   ├── terminal/      # Terminal, Input, Output, CommandRegistry
│   ├── gui/           # MenuBar, Taskbar, Window, WindowManager
│   ├── windows/       # About, Skills, Experience, Project, Contact, MusicPlayer
│   ├── radio/         # RadioPlayer
│   └── mobile/        # MobileView (componente independente, sem acoplamento desktop)
├── data/              # Conteúdo estático: projects, skills, about, experience, bootMessages
├── hooks/             # useTerminal, useTypewriter, useTheme
└── store/             # terminalStore (Zustand) — precisa ser dividida (ver prioridades)
```

---

## Convenções do Projeto

### Nomenclatura
- **Componentes**: PascalCase (`MusicPlayerWindow.tsx`)
- **Hooks e stores**: camelCase (`useTerminal.ts`, `terminalStore.ts`)
- **CSS**: kebab-case (`.boot-line--ok`, `.skill-row`)
- **Dados estáticos**: ficam em `src/data/`, componentes são puramente apresentacionais

### Estilização
- **Sempre** usar CSS custom properties para cores: `var(--accent)`, `var(--text)`, `var(--bg)`, etc.
- **Nunca** usar cores hardcoded (`#b06ef3`, `#9ca3af`, etc.) em componentes
- **Nunca** manipular `element.style` diretamente em handlers React — usar classes CSS com `:hover` ou estado
- O projeto tem 4 temas completos via CSS custom properties: `modern`, `dark`, `retro`, `amber`. Todo componente deve respeitá-los

### React
- Efeitos (`useEffect`) **sempre** com cleanup function (timeouts, listeners, animation frames, áudio)
- `useCallback` e `useMemo` devem depender de valores primitivos ou funções individuais — nunca do objeto inteiro do Zustand store
- Preferir ler estado do Zustand diretamente nos componentes filhos a receber por prop drilling
- Não usar `eslint-disable` para suprimir warnings de dependências em hooks — corrigir a causa raiz

### Arquivos
- Remover código morto sem hesitar: componentes não importados, assets não referenciados, classes CSS não usadas
- Componentes acima de ~200 linhas provavelmente têm mais de uma responsabilidade — extrair

---

## Ordem de Prioridade das Refatorações

As tasks estão divididas em skills por categoria. Execute na ordem abaixo.

### 1. Arquitetura (maior impacto, mais risco)
Consultar skill `architecture-refactor`.

- Dividir `terminalStore` em `terminalStore` + `windowStore`
- Decompor `ZoomInScreen.tsx` (305 linhas, múltiplas responsabilidades)
- Corrigir `useCallback` ineficaz no `useTerminal.ts`
- Unificar fonte de estado em `Terminal.tsx` (hook vs store duplicados)
- Eliminar prop drilling de `currentDirectory`

### 2. Performance
Consultar skill `performance-optimization`.

- Adicionar `useMemo` em `SkillsWindow`
- Implementar code splitting com `React.lazy()` + `Suspense`
- Pré-carregar próxima faixa no `RadioPlayer`

### 3. Estilo e Dead Code
Consultar skill `style-cleanup`.

- Refatorar `MusicPlayerWindow` para usar CSS custom properties
- Adicionar classes CSS faltantes (`boot-line--ok`, `boot-line--ascii`) no `index.css`
- Remover código morto: `TerminalTypewriter.tsx`, assets padrão do Vite, classe `.skill-row`
- Corrigir mutação imperativa de estilo (`e.currentTarget.style.background`)
- Padronizar títulos: `contactjson` → `contact.json`, `project` → `project.json`

### 4. Acessibilidade e DX
Consultar skill `accessibility-dx`.

- Adicionar Error Boundary no `App`
- Adicionar `aria-label="comando"` no input do terminal
- Corrigir `eslint-disable` no `RadioPlayer` (stale closure)

---

## O que NÃO Mudar

- A lógica de `MobileView` — é completamente independente e não deve ser acoplada ao desktop
- O padrão de `CommandRegistry` — injeção de dependência limpa, fácil de estender
- A separação `src/data/` vs componentes — é um ponto forte da arquitetura atual
- Os cleanups de `useEffect` — estão todos corretos
