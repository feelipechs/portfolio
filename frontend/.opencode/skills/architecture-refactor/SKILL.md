---
name: architecture-refactor
description: Refatorações estruturais do portfolio — divisão de stores, decomposição de componentes grandes, correção de hooks e eliminação de prop drilling
compatibility: opencode
---

## O que esta skill cobre

Problemas de arquitetura identificados no relatório de qualidade. São as refatorações de maior impacto e maior risco — devem ser feitas antes das demais categorias.

---

## Tasks

### 1. Dividir `terminalStore` em duas stores

**Arquivo**: `src/store/terminalStore.ts` (206 linhas, 18 métodos)

**Problema**: Uma única store gerencia dois domínios distintos:
- Estado do terminal: linhas de output, estado de digitação, diretório atual
- Estado das janelas: CRUD de janelas abertas, z-index, foco

As ações de janela representam ~⅔ da store atual.

**Solução**:
1. Criar `src/store/windowStore.ts` com todo estado e ações relacionados a janelas (abrir, fechar, focar, z-index, lista de janelas abertas)
2. Manter `src/store/terminalStore.ts` apenas com estado do terminal (linhas, `isTyping`, `currentDirectory`, histórico de comandos)
3. Atualizar todos os imports nos componentes que consumiam `useTerminalStore` para usar a store correta
4. Garantir que `WindowManager`, `Window`, `Taskbar` e `MenuBar` passem a usar `useWindowStore`

**Atenção — dependência entre stores**: `executeCommand` em `terminalStore.ts` provavelmente chama `openWindow` internamente para abrir janelas via CommandRegistry. Com a divisão, `openWindow` vai existir apenas na `windowStore`. Resolver isso de uma das duas formas:
- Importar `useWindowStore.getState().openWindow` diretamente dentro de `executeCommand` (acesso fora de componente, suportado pelo Zustand)
- Ou passar `openWindow` como parâmetro para o `CommandRegistry` no momento do registro dos comandos

Confirmar qual padrão já é usado no `CommandRegistry` antes de decidir.

---

### 2. Decompor `ZoomInScreen.tsx`

**Arquivo**: `src/components/boot/ZoomInScreen.tsx` (305 linhas)

**Problema**: Mistura cinco responsabilidades em um único componente:
- Loading overlay ("Carregando sistemas...")
- SVG scene com ~130 linhas de markup inline
- Animação de chuva via `requestAnimationFrame` + manipulação DOM imperativa
- Gerenciamento de áudio (chuva + boot)
- State machine (loading, loadingPhase, poweredOn, started)

**Solução**:
1. Extrair hook `src/hooks/useRainAnimation.ts` — encapsula o `requestAnimationFrame`, referência ao canvas/elemento e o cleanup
2. Extrair hook `src/hooks/useBootAudio.ts` — gerencia os objetos `Audio`, play/pause e cleanup no unmount
3. Extrair componente `src/components/boot/CyberpunkScene.tsx` — apenas o SVG estático (~130 linhas)
4. `ZoomInScreen.tsx` fica responsável apenas pela state machine e pela composição dos três anteriores

---

### 3. Corrigir `useCallback` ineficaz em `useTerminal.ts`

**Arquivo**: `src/hooks/useTerminal.ts:13`

**Problema**: `useCallback` tem `[store]` como dependência, onde `store` é o objeto retornado pelo Zustand. Como o Zustand retorna um novo objeto a cada re-render quando qualquer slice muda, a memoização nunca se mantém — `submitCommand` é recriado em todo render.

**Solução**: Usar seletores individuais em vez do objeto inteiro:

```ts
// ❌ Antes
const store = useTerminalStore()
const submit = useCallback(() => { store.pushLine(...) }, [store])

// ✅ Depois
const pushLine = useTerminalStore(s => s.pushLine)
const executeCommand = useTerminalStore(s => s.executeCommand)
const isTyping = useTerminalStore(s => s.isTyping)
const submit = useCallback(() => { pushLine(...) }, [pushLine, executeCommand, isTyping])
```

---

### 4. Unificar fonte de estado em `Terminal.tsx`

**Arquivo**: `src/components/terminal/Terminal.tsx`

**Problema**: O componente usa `useTerminal()` (hook customizado) e `useTerminalStore()` (store direta) simultaneamente para acessar o mesmo estado. Duas fontes podem divergir e geram confusão sobre qual é autoritativa.

**Solução**:
1. Auditar o que `Terminal.tsx` consome via `useTerminalStore()` diretamente — identificar se inclui `pushLine`, `typeCommand` ou outros que o hook `useTerminal` não expõe hoje
2. Estender o hook `useTerminal` para cobrir o que estiver faltando
3. Só então remover o `useTerminalStore()` direto de `Terminal.tsx`

---

### 5. Eliminar prop drilling de `currentDirectory`

**Arquivo**: `src/components/terminal/Terminal.tsx` → `TerminalOutput.tsx` + `TerminalInput.tsx`

**Problema**: `currentDirectory` é lido da store em `Terminal.tsx` e repassado como prop para os dois filhos, sendo que ambos poderiam ler diretamente da store.

**Solução**:
1. Remover a prop `currentDirectory` de `TerminalOutput` e `TerminalInput`
2. Cada componente passa a chamar `useTerminalStore(s => s.currentDirectory)` diretamente
3. Limpar a desestruturação em `Terminal.tsx`

---

## Checklist de validação

Após cada task:
- [ ] Nenhum erro de TypeScript (`tsc --noEmit`)
- [ ] App inicializa sem erro no console
- [ ] Fluxo completo funciona: ZoomIn → Boot → Terminal → abrir janelas
- [ ] Os 4 temas continuam aplicados corretamente
- [ ] Mobile view não foi afetada
