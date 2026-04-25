export interface BootMessage {
  text: string;
  delay: number;
  type?: 'system' | 'ok' | 'info' | 'ascii';
}

// prettier-ignore
const asciiArt: BootMessage[] = [
  { text: '███████╗███████╗██╗     ██╗██████╗ ███████╗', delay: 2300, type: 'ascii' },
  { text: '██╔════╝██╔════╝██║     ██║██╔══██╗██╔════╝', delay: 2360, type: 'ascii' },
  { text: '█████╗  █████╗  ██║     ██║██████╔╝█████╗  ', delay: 2420, type: 'ascii' },
  { text: '██╔══╝  ██╔══╝  ██║     ██║██╔═══╝ ██╔══╝  ', delay: 2480, type: 'ascii' },
  { text: '██║     ███████╗███████╗██║██║     ███████╗', delay: 2540, type: 'ascii' },
  { text: '╚═╝     ╚══════╝╚══════╝╚═╝╚═╝     ╚══════╝', delay: 2600, type: 'ascii' },
]

export const bootMessages: BootMessage[] = [
  {
    text: 'BIOS v0.0.0.0.0 — Unverified build error!',
    delay: 0,
    type: 'system',
  },
  {
    text: 'CPU: Intel Core i5-8400 @ 4.0GHz ............... OK',
    delay: 180,
    type: 'ok',
  },
  {
    text: 'RAM: 16GB DDR4-3200 ....................... OK',
    delay: 320,
    type: 'ok',
  },
  {
    text: 'GPU: GeForce GTX 1060 (6GB) ...................... OK',
    delay: 460,
    type: 'ok',
  },
  { text: '', delay: 560, type: 'system' },
  {
    text: 'Booting PortfolioOS kernel 6.17.0.20-Generic...',
    delay: 680,
    type: 'info',
  },
  {
    text: '[    0.000] Initializing kernel modules...',
    delay: 820,
    type: 'system',
  },
  {
    text: '[    0.142] Loading filesystem drivers.... OK',
    delay: 980,
    type: 'ok',
  },
  {
    text: '[    0.287] Mounting /dev/portfolio......... OK',
    delay: 1120,
    type: 'ok',
  },
  {
    text: '[    0.391] Starting network services...... OK',
    delay: 1260,
    type: 'ok',
  },
  {
    text: '[    0.512] Loading application stack............',
    delay: 1380,
    type: 'system',
  },
  { text: '[    0.513]   → vite ........... OK', delay: 1480, type: 'ok' },
  {
    text: '[    0.514]   → react.typescript ........... OK',
    delay: 1580,
    type: 'ok',
  },
  { text: '[    0.515]   → images ........... OK', delay: 1680, type: 'ok' },
  {
    text: '[    0.516]   → dependencies ........... OK',
    delay: 1780,
    type: 'ok',
  },
  { text: '[    0.720] Starting portfolio.sh...', delay: 1920, type: 'info' },
  { text: '', delay: 2100, type: 'system' },
  ...asciiArt,
  { text: '', delay: 2700, type: 'system' },
  {
    text: 'Desenvolvedor de Software Full-Stack · Guarujá, São Paulo',
    delay: 2800,
    type: 'info',
  },
  { text: '', delay: 2900, type: 'system' },
  {
    text: 'Sistema carregado. Bem-vindo ao portfolio.',
    delay: 3000,
    type: 'ok',
  },
  { text: '', delay: 3200, type: 'system' },
];
