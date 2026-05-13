---
name: style-cleanup
description: Limpeza de estilo no portfolio — migrar cores hardcoded para CSS vars, adicionar classes faltantes, remover código morto e corrigir convenções de nomenclatura
compatibility: opencode
---

## O que esta skill cobre

Problemas de estilo, dead code e convenções identificados no relatório. São mudanças de baixo risco e alto impacto visual/manutenibilidade. Podem ser feitas após `architecture-refactor`.

---

## Tasks

### 1. Refatorar `MusicPlayerWindow` para CSS custom properties

**Arquivo**: `src/components/windows/MusicPlayerWindow.tsx` (~150 linhas de inline styles)

**Problema**: O componente usa cores hardcoded diretamente nos estilos:
- `#b06ef3` → deve ser `var(--accent)`
- `#9ca3af` → deve ser `var(--text-muted)` ou equivalente
- `#f3f4f6` → deve ser `var(--text)`
- `#2e303a` → deve ser `var(--bg-secondary)` ou equivalente
- `#888` → deve ser `var(--text-muted)`

Por consequência, o componente ignora o tema ativo — aparece sempre com as cores do tema padrão independente do tema selecionado.

**Solução**:
1. Auditar o `index.css` para identificar quais custom properties existem para cada papel semântico (accent, bg, text, text-muted, border, etc.)
2. Substituir cada cor hardcoded pela custom property correspondente
3. Mover os inline styles para classes CSS no `index.css` (prefixo `.music-player-`)
4. Validar visualmente nos 4 temas: `modern`, `dark`, `retro`, `amber`

---

### 2. Adicionar classes CSS faltantes no `BootSequence`

**Arquivos**: `src/components/boot/BootSequence.tsx` + `src/index.css`

**Problema**: O componente gera classes dinamicamente a partir de `msg.type`:
```tsx
className={`boot-line boot-line--${msg.type}`}
// Gera: boot-line--ok, boot-line--ascii, boot-line--error, etc.
```

As classes `boot-line--ok` e `boot-line--ascii` não existem no CSS — funcionam apenas por herança da classe base `boot-line`, sem estilo próprio.

**Solução**: Adicionar no `index.css` após as definições existentes de `boot-line`:
```css
.boot-line--ok {
  color: var(--accent); /* ou a cor de sucesso do tema */
}

.boot-line--ascii {
  color: var(--text-muted);
  font-size: 0.75rem;
  line-height: 1.2;
}
```

Verificar todos os `msg.type` usados no componente e garantir que todos tenham uma classe correspondente.

---

### 3. Remover código morto

**Arquivos a deletar**:

| Arquivo | Motivo |
|---|---|
| `src/components/terminal/TerminalTypewriter.tsx` | Componente nunca importado em nenhum lugar |
| `src/assets/hero.png` | Asset padrão do template Vite, não referenciado |
| `src/assets/react.svg` | Asset padrão do template Vite, não referenciado |
| `src/assets/vite.svg` | Asset padrão do template Vite, não referenciado |

**Verificar antes de deletar**: Fazer uma busca global por cada nome de arquivo para confirmar que realmente não há imports. Comando sugerido:
```bash
grep -r "TerminalTypewriter\|hero.png\|react.svg\|vite.svg" src/
```

**CSS morto**: Remover a classe `.skill-row` de `src/index.css:1150` (dentro de `@media (max-width: 768px)`). Confirmar antes:
```bash
grep -r "skill-row" src/
```

| `src/hooks/useTypewriter.ts` | Possivelmente morto — usado apenas por `TerminalTypewriter.tsx`, que será deletado |
```bash
grep -r "TerminalTypewriter\|useTypewriter\|hero.png\|react.svg\|vite.svg" src/
```

---

### 4. Corrigir mutação imperativa de estilo em `MusicPlayerWindow`

**Arquivo**: `src/components/windows/MusicPlayerWindow.tsx:139-144`

**Problema**:
```tsx
// ❌ Padrão anti-React — manipulação imperativa do DOM
onMouseEnter={e => e.currentTarget.style.background = '#2e303a'}
onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
```

**Solução**: Usar CSS com `:hover` (preferível) ou estado React:

```css
/* index.css */
.music-player__track-item:hover {
  background: var(--bg-secondary);
}
```

```tsx
/* MusicPlayerWindow.tsx */
<div className="music-player__track-item">...</div>
```

Esta task pode ser feita em conjunto com a task 1 (migração para CSS vars), pois ambas tocam nos mesmos elementos.

---

### 5. Padronizar títulos das janelas na store

**Arquivo**: `src/store/terminalStore.ts`

Dois títulos fogem da convenção `nome.extensão` usada pelas outras janelas:

| Linha | Atual | Correto |
|---|---|---|
| ~60 | `contactjson` (sem ponto) | `contact.json` |
| ~59 | `project` (sem extensão) | `project.json` |

Fazer um find/replace cirúrgico. Verificar se esses títulos aparecem em alguma lógica condicional antes de alterar.

---

## Checklist de validação

- [ ] `tsc --noEmit` sem erros
- [ ] `MusicPlayerWindow` visualmente correto nos 4 temas
- [ ] Sequência de boot com cores aplicadas nas linhas `--ok` e `--ascii`
- [ ] Nenhum arquivo morto restante (confirmar com `grep`)
- [ ] Hover nos itens da playlist funciona sem manipulação direta de `style`
- [ ] Títulos das janelas exibidos corretamente na taskbar/header
