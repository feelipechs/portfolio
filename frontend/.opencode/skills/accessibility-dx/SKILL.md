---
name: accessibility-dx
description: Melhorias de acessibilidade e developer experience no portfolio — Error Boundary, aria-label no terminal e correção de stale closure no RadioPlayer
compatibility: opencode
---

## O que esta skill cobre

Melhorias de acessibilidade e qualidade de código sem impacto em arquitetura. São as mudanças mais simples — boa pedida para fazer por último ou em paralelo com `style-cleanup`.

---

## Tasks

### 1. Adicionar Error Boundary no `App`

**Problema**: Nenhum Error Boundary existe na árvore de componentes. Um erro não capturado em qualquer janela ou componente derruba o app inteiro, exibindo uma tela em branco sem feedback para o usuário.

**Solução**: Criar `src/components/ErrorBoundary.tsx`:

```tsx
import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error('[ErrorBoundary]', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <p>Erro inesperado. Recarregue a página.</p>
          {import.meta.env.DEV && (
            <pre>{this.state.error?.message}</pre>
          )}
        </div>
      )
    }
    return this.props.children
  }
}
```

Adicionar no `App.tsx` envolvendo a árvore principal:

```tsx
<ErrorBoundary>
  <WindowManager />
  {/* restante da UI */}
</ErrorBoundary>
```

Adicionar estilo mínimo no `index.css`:

```css
.error-boundary {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--text);
  background: var(--bg);
  font-family: var(--font-mono);
  gap: 1rem;
}

.error-boundary pre {
  color: var(--accent);
  font-size: 0.75rem;
  max-width: 600px;
  white-space: pre-wrap;
}
```

---

### 2. Adicionar `aria-label` no input do terminal

**Arquivo**: `src/components/terminal/TerminalInput.tsx`

**Problema**: O input principal do terminal não tem `aria-label`, tornando-o opaco para leitores de tela.

**Solução**: Adicionar o atributo diretamente no elemento:

```tsx
// ❌ Antes
<input
  ref={inputRef}
  type="text"
  value={value}
  onChange={...}
  onKeyDown={...}
  // sem aria-label
/>

// ✅ Depois
<input
  ref={inputRef}
  type="text"
  value={value}
  onChange={...}
  onKeyDown={...}
  aria-label="comando"
  autoComplete="off"
  spellCheck={false}
/>
```

Aproveitar para verificar se `autoComplete="off"` e `spellCheck={false}` já estão presentes — são importantes para a experiência de terminal.

---

### 3. Corrigir stale closure no `RadioPlayer`

**Arquivo**: `src/components/radio/RadioPlayer.tsx:27`

**Problema**:
```ts
// ❌ Suprimindo o warning em vez de resolver
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
  // usa `tracks` e `next` dentro do efeito
}, [currentTrack]) // tracks e next faltando nas deps
```

O comentário `eslint-disable` esconde que o efeito captura versões stale de `tracks` e `next`. Se qualquer um desses valores mudar, o efeito não será re-executado e usará dados desatualizados.

**Solução A — adicionar as dependências** (preferível se `tracks` é estático):
```ts
useEffect(() => {
  // lógica do efeito
}, [currentTrack, tracks, next])
```

**Solução B — usar refs para valores estáveis** (se `tracks`/`next` causam re-execuções desnecessárias):
```ts
const nextRef = useRef(next)
const tracksRef = useRef(tracks)

useEffect(() => {
  nextRef.current = next
  tracksRef.current = tracks
})

useEffect(() => {
  // usar nextRef.current e tracksRef.current dentro do efeito
}, [currentTrack])
```

Escolher a solução A se `tracks` é um array estático (vem de `src/data/`). Usar a B apenas se os re-renders causados pela inclusão nas deps gerarem problemas de loop.

Remover o comentário `eslint-disable` após a correção.

---

## Checklist de validação

- [ ] `tsc --noEmit` sem erros
- [ ] Forçar um erro em um componente filho (throw em dev) — Error Boundary captura e exibe mensagem
- [ ] Inspecionar o input do terminal com DevTools de acessibilidade — `aria-label` presente
- [ ] `eslint` roda sem warnings de `react-hooks/exhaustive-deps` em `RadioPlayer`
- [ ] Troca de faixas no radio continua funcionando corretamente após a correção
