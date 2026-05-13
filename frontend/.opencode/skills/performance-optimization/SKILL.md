---
name: performance-optimization
description: Otimizações de performance do portfolio — memoização, code splitting com lazy loading e preloading de áudio no RadioPlayer
compatibility: opencode
---

## O que esta skill cobre

Três melhorias de performance identificadas no relatório. Podem ser feitas de forma independente entre si, após a skill `architecture-refactor`.

---

## Tasks

### 1. `useMemo` em `SkillsWindow`

**Arquivo**: `src/components/windows/SkillsWindow.tsx:20-43`

**Problema**: O cálculo de `globalIndex` e a criação dos arrays de delays de animação são refeitos a cada render. Como os dados de skills são completamente estáticos (vêm de `src/data/`), esse recálculo nunca produz um resultado diferente.

**Solução**:

```tsx
// ❌ Antes — recalculado a cada render
const processedSkills = skills.map((category, catIdx) => ({
  ...category,
  items: category.items.map((item, itemIdx) => ({
    ...item,
    globalIndex: /* cálculo do índice global */,
    delay: /* cálculo de delay */,
  }))
}))

// ✅ Depois — calculado uma única vez
const processedSkills = useMemo(() => skills.map((category, catIdx) => ({
  ...category,
  items: category.items.map((item, itemIdx) => ({
    ...item,
    globalIndex: /* cálculo do índice global */,
    delay: /* cálculo de delay */,
  }))
})), []) // array vazio — dados são estáticos
```

---

### 2. Code splitting com `React.lazy()` + `Suspense`

**Problema**: O build gera um bundle único de ~421 KB de JS. Todo o código das janelas (About, Skills, Experience, Project, Contact, MusicPlayer) é carregado mesmo antes do usuário interagir com qualquer uma delas.

**Solução**: Converter as janelas de conteúdo para lazy imports.

Em `WindowManager.tsx` (ou onde as janelas são instanciadas):

```tsx
// ❌ Antes
import AboutWindow from '../windows/AboutWindow'
import SkillsWindow from '../windows/SkillsWindow'
import MusicPlayerWindow from '../windows/MusicPlayerWindow'
// ...

// ✅ Depois
const AboutWindow = lazy(() => import('../windows/AboutWindow'))
const SkillsWindow = lazy(() => import('../windows/SkillsWindow'))
const MusicPlayerWindow = lazy(() => import('../windows/MusicPlayerWindow'))
const ExperienceWindow = lazy(() => import('../windows/ExperienceWindow'))
const ContactWindow = lazy(() => import('../windows/ContactWindow'))
const ProjectWindow = lazy(() => import('../windows/ProjectWindow'))
```

Envolver a renderização das janelas em `Suspense`:

```tsx
<Suspense fallback={<WindowLoadingPlaceholder />}>
  {/* renderização das janelas */}
</Suspense>
```

O `WindowLoadingPlaceholder` pode ser um `div` simples com o estilo de janela vazia — não precisa ser elaborado.

**Meta**: Reduzir o bundle inicial para ~150-200 KB, carregando o restante sob demanda.

---

### 3. Pré-carregar próxima faixa no `RadioPlayer`

**Arquivo**: `src/components/radio/RadioPlayer.tsx`

**Problema**: Quando uma faixa termina (`onEnded` → `next()`), um novo elemento `<audio>` é criado e o download da próxima faixa começa naquele momento. Dependendo da conexão, isso cria um gap audível perceptível entre faixas.

**Solução**: Manter uma referência para a próxima faixa pré-carregada em background:

```ts
const nextAudioRef = useRef<HTMLAudioElement | null>(null)

// Sempre que a faixa atual muda, começar a pré-carregar a próxima
useEffect(() => {
  const nextIndex = (currentTrack + 1) % tracks.length
  const preload = new Audio(tracks[nextIndex].src)
  preload.preload = 'auto'
  nextAudioRef.current = preload

  return () => {
    // Liberar o objeto se a faixa mudar antes de ser usada
    nextAudioRef.current = null
  }
}, [currentTrack, tracks])
```

Quando `next()` for chamado, usar `nextAudioRef.current` se disponível em vez de criar um novo `Audio`.

---

## Checklist de validação

- [ ] `tsc --noEmit` sem erros
- [ ] `vite build` completa sem warnings de chunk size acima de 500 KB
- [ ] Janelas abrem normalmente após lazy loading
- [ ] Transição entre faixas no RadioPlayer sem gap perceptível
- [ ] SkillsWindow renderiza corretamente com animações de delay
