export interface BootMessage {
  text: string
  delay: number
  type?: 'system' | 'ok' | 'info' | 'ascii'
}

export const bootMessages: BootMessage[] = [
  { text: 'BIOS v2.4.1 — Phoenix TechCore ROM', delay: 0, type: 'system' },
  { text: 'CPU: Intel Core i9 @ 5.2GHz ............... OK', delay: 180, type: 'ok' },
  { text: 'RAM: 64GB DDR5-6400 ....................... OK', delay: 320, type: 'ok' },
  { text: 'GPU: NVIDIA RTX 4090 ...................... OK', delay: 460, type: 'ok' },
  { text: '', delay: 560, type: 'system' },
  { text: 'Booting PortfolioOS kernel 6.1.0-LTS...', delay: 680, type: 'info' },
  { text: '[    0.000] Initializing kernel modules...', delay: 820, type: 'system' },
  { text: '[    0.142] Loading filesystem drivers.... OK', delay: 980, type: 'ok' },
  { text: '[    0.287] Mounting /dev/portfolio......... OK', delay: 1120, type: 'ok' },
  { text: '[    0.391] Starting network services...... OK', delay: 1260, type: 'ok' },
  { text: '[    0.512] Loading skill modules............', delay: 1380, type: 'system' },
  { text: '[    0.513]   → java.spring.boot ........... OK', delay: 1480, type: 'ok' },
  { text: '[    0.514]   → react.typescript ........... OK', delay: 1580, type: 'ok' },
  { text: '[    0.515]   → postgresql.redis ........... OK', delay: 1680, type: 'ok' },
  { text: '[    0.516]   → docker.kubernetes ........... OK', delay: 1780, type: 'ok' },
  { text: '[    0.720] Starting portfolio.sh...', delay: 1920, type: 'info' },
  { text: '', delay: 2100, type: 'system' },
  {
    text: '███████╗███████╗██╗     ██╗██████╗ ███████╗',
    delay: 2300,
    type: 'ascii',
  },
  {
    text: '██╔════╝██╔════╝██║     ██║██╔══██╗██╔════╝',
    delay: 2360,
    type: 'ascii',
  },
  {
    text: '█████╗  █████╗  ██║     ██║██████╔╝█████╗  ',
    delay: 2420,
    type: 'ascii',
  },
  {
    text: '██╔══╝  ██╔══╝  ██║     ██║██╔═══╝ ██╔══╝  ',
    delay: 2480,
    type: 'ascii',
  },
  {
    text: '██║     ███████╗███████╗██║██║     ███████╗',
    delay: 2540,
    type: 'ascii',
  },
  {
    text: '╚═╝     ╚══════╝╚══════╝╚═╝╚═╝     ╚══════╝',
    delay: 2600,
    type: 'ascii',
  },
  { text: '', delay: 2700, type: 'system' },
  { text: 'Desenvolvedor Full-Stack · São Paulo, Brasil', delay: 2800, type: 'info' },
  { text: '', delay: 2900, type: 'system' },
  { text: 'Sistema carregado. Bem-vindo ao portfolio.', delay: 3000, type: 'ok' },
  { text: '', delay: 3200, type: 'system' },
]
