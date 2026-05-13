import { useRef, useEffect } from 'react';

interface WinRect {
  el: SVGGElement;
  x: number;
  y: number;
  w: number;
  h: number;
}

const WINS: WinRect[] = [
  { el: null as unknown as SVGGElement, x: 1486, y: 201, w: 117, h: 239 },
  { el: null as unknown as SVGGElement, x: 1625, y: 201, w: 111, h: 239 },
];

export function useRainAnimation() {
  const animRef = useRef(0);

  useEffect(() => {
    const rainLeft = document.getElementById('rain-left') as SVGGElement | null;
    const rainRight = document.getElementById('rain-right') as SVGGElement | null;
    if (!rainLeft || !rainRight) return;

    WINS[0].el = rainLeft;
    WINS[1].el = rainRight;

    const COUNT = 35;
    const drops: SVGLineElement[] = [];
    const NS = 'http://www.w3.org/2000/svg';

    WINS.forEach((win) => {
      for (let i = 0; i < COUNT; i++) {
        const line = document.createElementNS(NS, 'line');
        const x = win.x + Math.random() * win.w;
        const y = win.y + Math.random() * win.h;
        const len = 6 + Math.random() * 12;
        line.setAttribute('x1', String(x));
        line.setAttribute('y1', String(y));
        line.setAttribute('x2', String(x));
        line.setAttribute('y2', String(y + len));
        line.setAttribute('class', 'raindrop');
        line.dataset.len = String(len);
        line.dataset.speed = String(0.8 + Math.random() * 1.5);
        line.dataset.wind = String(-0.15 - Math.random() * 0.25);
        line.dataset.winX = String(win.x);
        line.dataset.winY = String(win.y);
        line.dataset.winW = String(win.w);
        line.dataset.winH = String(win.h);
        win.el.appendChild(line);
        drops.push(line);
      }
    });

    function animate() {
      drops.forEach((d) => {
        let x = parseFloat(d.getAttribute('x1')!);
        let y = parseFloat(d.getAttribute('y1')!);
        const len = parseFloat(d.dataset.len!);
        const speed = parseFloat(d.dataset.speed!);
        const wind = parseFloat(d.dataset.wind!);
        const wx = parseFloat(d.dataset.winX!);
        const wy = parseFloat(d.dataset.winY!);
        const ww = parseFloat(d.dataset.winW!);
        const wh = parseFloat(d.dataset.winH!);

        y += speed;
        x += wind;

        if (y > wy + wh + 10 || x < wx - 10 || x > wx + ww + 10) {
          x = wx + Math.random() * ww;
          y = wy - Math.random() * 30;
        }

        d.setAttribute('x1', String(x));
        d.setAttribute('y1', String(y));
        d.setAttribute('x2', String(x));
        d.setAttribute('y2', String(y + len));
      });
      animRef.current = requestAnimationFrame(animate);
    }
    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      WINS.forEach((win) => {
        while (win.el.firstChild) {
          win.el.removeChild(win.el.firstChild);
        }
      });
    };
  }, []);
}
