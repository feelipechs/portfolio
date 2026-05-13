# Relatório de Qualidade do Código — Portfolio Frontend

**Stack**: React 19 + TypeScript 6 + Vite 8 + Zustand 5 + Framer Motion 12

---

## 🟡 Moderados

### 1. MusicPlayerWindow com cores fixas
- **Arquivo**: `src/components/windows/MusicPlayerWindow.tsx` (todo — ~150 linhas de inline styles)
- **Problema**: Usa cores hardcoded (`#b06ef3`, `#9ca3af`, `#f3f4f6`, `#2e303a`, `#888`) em vez de CSS custom properties (`var(--accent)`, `var(--text)`, etc.). Não respeita o tema ativo.
- **Solução**: Refatorar para usar classes CSS com as variáveis do tema.

### 2. Classes CSS faltando (`boot-line--ok`, `boot-line--ascii`)
- **Arquivos**: `BootSequence.tsx` + `index.css`
- **Problema**: O componente gera classes dinamicamente a partir de `msg.type` (ex.: `boot-line--ok`, `boot-line--ascii`), mas essas classes não existem no CSS. Funcionam por herança, sem estilo próprio.
- **Solução**: Adicionar as classes no `index.css` ou mapear para as existentes (`system`, `info`).

### 3. `eslint-disable` no RadioPlayer (stale closure)
- **Arquivo**: `src/components/radio/RadioPlayer.tsx:27`
- **Problema**: `// eslint-disable-next-line react-hooks/exhaustive-deps` esconde dependências ausentes. O efeito usa `tracks` e `next` mas só lista `currentTrack` nas deps.
- **Solução**: Incluir todas as dependências ou usar refs para evitar stale closures.

### 4. ZoomInScreen.tsx > 300 linhas
- **Arquivo**: `src/components/boot/ZoomInScreen.tsx` (305 linhas)
- **Problema**: Mistura múltiplas responsabilidades:
  - Loading overlay ("Carregando sistemas...")
  - SVG scene com ~130 linhas de markup inline
  - Animação de chuva com `requestAnimationFrame` + manipulação DOM imperativa
  - Áudio (chuva + boot)
  - Estado machine (loading, loadingPhase, poweredOn, started)
- **Solução**: Extrair animação da chuva para hook `useRainAnimation`, SVG para componente separado, áudio para hook.

### 5. `useCallback` ineficaz em `useTerminal.ts`
- **Arquivo**: `src/hooks/useTerminal.ts:13`
- **Problema**: `useCallback` depende de `[store]` (objeto zustand inteiro). Como zustand retorna um novo objeto a cada subscribe, a memoização nunca funciona. `submitCommand` é recriado a cada render.
- **Solução**: Depender de funções individuais (`pushLine`, `executeCommand`, `isTyping`) ou usar `useTerminalStore` seletivamente.

---

## 🟢 Leves

### 6. Typo: `contactjson`
- **Arquivo**: `src/store/terminalStore.ts:60`
- **Problema**: O título padrão da janela de contato é `contactjson` (sem ponto). Comparar com `about.json`, `skills.json`, `experience.json`, `radio.json`.
- **Solução**: Alterar para `contact.json`.

### 7. `terminalStore` muito ampla
- **Arquivo**: `src/store/terminalStore.ts` (206 linhas, 18 métodos)
- **Problema**: Gerencia estado do terminal (linhas, digitação, diretório) E estado das janelas (CRUD, z-index, etc.). Responsabilidades misturadas. Ações de janela representam ~⅔ da store.
- **Solução**: Dividir em `terminalStore` + `windowStore`.

### 8. Código morto: TerminalTypewriter.tsx + assets de template
- **Arquivos**: `src/components/terminal/TerminalTypewriter.tsx` (nunca importado), `src/assets/hero.png`, `src/assets/react.svg`, `src/assets/vite.svg`
- **Problema**: Componente e hook não utilizados. Assets padrão do Vite nunca referenciados.
- **Solução**: Remover arquivos mortos.

### 9. CSS morto: `.skill-row`
- **Arquivo**: `src/index.css:1150`
- **Problema**: Classe definida dentro de `@media (max-width: 768px)` mas nunca usada em nenhum JSX.
- **Solução**: Remover.

### 10. Mutação imperativa de estilo no React
- **Arquivo**: `MusicPlayerWindow.tsx:139-144`
- **Problema**: Handlers `onMouseEnter`/`onMouseLeave` fazem `e.currentTarget.style.background = ...` em vez de usar estado ou CSS classes.
- **Solução**: Usar CSS com `:hover` e classes condicionais.

### 11. Prop drilling de `currentDirectory`
- **Arquivo**: `Terminal.tsx` → `TerminalOutput.tsx` + `TerminalInput.tsx`
- **Problema**: `currentDirectory` é lido da store em `Terminal.tsx` e passado como prop. Ambos filhos poderiam ler da store diretamente.
- **Solução**: Consumir store diretamente nos componentes filhos.

### 12. Título `project` inconsistente
- **Arquivo**: `src/store/terminalStore.ts:59`
- **Problema**: `project: { title: 'project', ... }` sem extensão `.json`, diferente dos outros.
- **Solução**: Padronizar para `project.json` (embora atualmente seja sobrescrito por `data.name`).

### 13. Sem Error Boundary
- **Problema**: Nenhum Error Boundary envolve a árvore de componentes. Erros não capturados podem quebrar o app inteiro.
- **Solução**: Adicionar Error Boundary no App.

### 14. Sem `useMemo` em SkillsWindow
- **Arquivo**: `SkillsWindow.tsx:20-43`
- **Problema**: Cálculo de `globalIndex` e criação de arrays de delays recalculados a cada render. Dados são estáticos.
- **Solução**: Envolver em `useMemo`.

### 15. Sem `aria-label` no input do terminal
- **Arquivo**: `TerminalInput.tsx`
- **Problema**: O input field principal não tem `aria-label` para acessibilidade.
- **Solução**: Adicionar `aria-label="comando"`.

### 16. Sem preloading de áudio nas tracks da rádio
- **Arquivo**: `src/components/radio/RadioPlayer.tsx`
- **Problema**: Quando uma track termina (`onEnded` → `next()`), um novo `<audio>` é criado e o download começa na hora. Pode haver um gap audível entre faixas.
- **Solução**: Pré-carregar a próxima faixa com `new Audio()` em background.

### 17. Bundle monolítico sem code splitting
- **Problema**: Build gera um único JS de ~421KB + CSS 22KB. Todo o código vai em um bundle.
- **Solução**: Usar `React.lazy()` + `Suspense` para janelas de conteúdo (ex.: `AboutWindow`, `MusicPlayerWindow`).

### 18. `useTerminal` e store duplicados no `Terminal.tsx`
- **Arquivo**: `src/components/terminal/Terminal.tsx`
- **Problema**: `Terminal.tsx` usa `useTerminal()` (hook) e `useTerminalStore()` (store direta) simultaneamente. Duas fontes de estado para o mesmo dado, podendo ficar inconsistentes.
- **Solução**: Escolher uma fonte única: ou só o hook, ou só a store.

---

## ✅ Pontos fortes

- **Separação dados/UI**: Excelente — todo conteúdo estático em `src/data/`, componentes são puramente apresentacionais.
- **Limpeza de effects**: Todos os `useEffect` têm cleanup function (timeouts, listeners, anim frames, áudio).
- **Consistência de nomenclatura**: PascalCase para componentes, camelCase para hooks/stores/data, kebab-case para CSS.
- **Tematização via CSS custom properties**: 4 temas completos (modern, dark, retro, amber).
- **Comandos do terminal**: Padrão de injeção de dependência limpo no `CommandRegistry`, fácil de estender.
- **Estado gerenciado com Zustand**: Stores focadas (appStore, radioStore) com actions bem definidas.
- **Mobile separado**: `MobileView` é um componente totalmente independente, sem acoplamento com a versão desktop.
