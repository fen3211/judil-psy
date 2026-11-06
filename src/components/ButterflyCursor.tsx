import React, { useEffect, useRef } from 'react';

type ButterflySpecies = 0 | 1 | 2 | 3;

interface Butterfly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  rotation: number;
  rotationSpeed: number;
  flapPhase: number;
  flapSpeed: number;
  alpha: number;
  life: number;
  maxLife: number;
  species: ButterflySpecies;
  orbitPhase: number;
}

interface SpeciesConfig {
  name: string;
  colorBase: string;
  accentBase: string;
  wingspanRatio: number;
  flapSpeedBase: number;
}

const SPECIES_CONFIG: Record<ButterflySpecies, SpeciesConfig> = {
  0: {
    // Ультрамариновый Махаон (Swallowtail)
    name: 'Ultramarine Swallowtail',
    colorBase: 'rgba(49, 86, 184, ',
    accentBase: 'rgba(30, 58, 138, ',
    wingspanRatio: 1.15,
    flapSpeedBase: 0.16,
  },
  1: {
    // Венецианский Коралловый Монарх (Monarch)
    name: 'Venetian Coral Monarch',
    colorBase: 'rgba(233, 110, 84, ',
    accentBase: 'rgba(217, 72, 59, ',
    wingspanRatio: 1.0,
    flapSpeedBase: 0.20,
  },
  2: {
    // Золотистая Охристая Лимонница (Brimstone)
    name: 'Golden Ochre Brimstone',
    colorBase: 'rgba(232, 182, 75, ',
    accentBase: 'rgba(217, 119, 6, ',
    wingspanRatio: 0.92,
    flapSpeedBase: 0.23,
  },
  3: {
    // Аметистовая Павлиноглазка (Peacock)
    name: 'Amethyst Peacock',
    colorBase: 'rgba(118, 101, 183, ',
    accentBase: 'rgba(88, 61, 114, ',
    wingspanRatio: 1.05,
    flapSpeedBase: 0.18,
  },
};

export const ButterflyCursor: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const handleResize = () => {
      if (!canvas) return;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const butterflies: Butterfly[] = [];
    const MAX_BUTTERFLIES = 14;

    let lastX = 0;
    let lastY = 0;
    let lastTime = 0;
    let isRunning = false;
    let animationId = 0;

    const startLoop = () => {
      if (!isRunning && butterflies.length > 0) {
        isRunning = true;
        animationId = requestAnimationFrame(render);
      }
    };

    const spawnButterfly = (x: number, y: number, isTouch = false) => {
      if (butterflies.length >= MAX_BUTTERFLIES) {
        butterflies.shift();
      }

      // Rotate through the 4 distinct author species
      const species = (Math.floor(Math.random() * 4)) as ButterflySpecies;
      const config = SPECIES_CONFIG[species];
      const size = isTouch ? 18 + Math.random() * 8 : 12 + Math.random() * 7;
      const angle = Math.random() * Math.PI * 2;
      const speed = isTouch ? 1.5 + Math.random() * 1.5 : 0.8 + Math.random() * 1.2;

      butterflies.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (isTouch ? 1.2 : 0.6), // gentle buoyant upward drift
        size,
        rotation: (Math.random() - 0.5) * 0.4,
        rotationSpeed: (Math.random() - 0.5) * 0.05,
        flapPhase: Math.random() * Math.PI,
        flapSpeed: config.flapSpeedBase + Math.random() * 0.06,
        alpha: 0.88,
        life: 0,
        maxLife: isTouch ? 75 : 55,
        species,
        orbitPhase: Math.random() * Math.PI * 2,
      });

      startLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;

      const now = performance.now();
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);

      if (dist > 35 && now - lastTime > 60) {
        spawnButterfly(e.clientX, e.clientY, false);
        lastX = e.clientX;
        lastY = e.clientY;
        lastTime = now;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        spawnButterfly(touch.clientX, touch.clientY, true);
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });

    const onMediaChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        butterflies.length = 0;
        ctx.clearRect(0, 0, width, height);
        cancelAnimationFrame(animationId);
        isRunning = false;
      }
    };
    mediaQuery.addEventListener('change', onMediaChange);

    // Draw individual butterfly with species-specific wing architecture
    const drawButterfly = (b: Butterfly) => {
      const config = SPECIES_CONFIG[b.species];
      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.rotation);

      const flap = Math.abs(Math.sin(b.flapPhase));
      const wingWidth = b.size * (0.35 + 0.65 * flap) * config.wingspanRatio;
      const wingHeight = b.size * 0.95;

      ctx.fillStyle = `${config.colorBase}${b.alpha.toFixed(2)})`;
      ctx.strokeStyle = `${config.accentBase}${(b.alpha * 0.75).toFixed(2)})`;
      ctx.lineWidth = 0.85;

      if (b.species === 0) {
        // --- 0: Ультрамариновый Махаон (Swallowtail tails) ---
        // Left Forewing (pointed apex)
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.bezierCurveTo(-wingWidth * 0.5, -wingHeight * 1.1, -wingWidth * 1.4, -wingHeight * 0.6, -wingWidth, 0);
        ctx.bezierCurveTo(-wingWidth * 0.8, wingHeight * 0.35, -wingWidth * 0.3, wingHeight * 0.2, -1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right Forewing
        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.bezierCurveTo(wingWidth * 0.5, -wingHeight * 1.1, wingWidth * 1.4, -wingHeight * 0.6, wingWidth, 0);
        ctx.bezierCurveTo(wingWidth * 0.8, wingHeight * 0.35, wingWidth * 0.3, wingHeight * 0.2, 1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Hindwings with characteristic swallowtail streamers
        const hindW = wingWidth * 0.65;
        const hindH = wingHeight * 0.75;
        // Left Hindwing
        ctx.beginPath();
        ctx.moveTo(-1, 1);
        ctx.bezierCurveTo(-hindW * 0.9, hindH * 0.5, -hindW * 0.7, hindH * 0.9, -hindW * 0.4, hindH * 1.35); // tail
        ctx.bezierCurveTo(-hindW * 0.2, hindH * 1.1, -0.5, hindH * 0.8, -1, hindH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Right Hindwing
        ctx.beginPath();
        ctx.moveTo(1, 1);
        ctx.bezierCurveTo(hindW * 0.9, hindH * 0.5, hindW * 0.7, hindH * 0.9, hindW * 0.4, hindH * 1.35); // tail
        ctx.bezierCurveTo(hindW * 0.2, hindH * 1.1, 0.5, hindH * 0.8, 1, hindH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

      } else if (b.species === 1) {
        // --- 1: Венецианский Коралловый Монарх (Rounded petal wings) ---
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.bezierCurveTo(-wingWidth * 0.6, -wingHeight * 0.85, -wingWidth * 1.25, -wingHeight * 0.45, -wingWidth, 0);
        ctx.bezierCurveTo(-wingWidth * 0.85, wingHeight * 0.3, -wingWidth * 0.3, wingHeight * 0.2, -1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.bezierCurveTo(wingWidth * 0.6, -wingHeight * 0.85, wingWidth * 1.25, -wingHeight * 0.45, wingWidth, 0);
        ctx.bezierCurveTo(wingWidth * 0.85, wingHeight * 0.3, wingWidth * 0.3, wingHeight * 0.2, 1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Rounded hindwings
        const hindW = wingWidth * 0.7;
        const hindH = wingHeight * 0.6;
        ctx.beginPath();
        ctx.moveTo(-1, 1);
        ctx.bezierCurveTo(-hindW * 0.9, hindH * 0.6, -hindW * 0.6, hindH * 1.1, -1, hindH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 1);
        ctx.bezierCurveTo(hindW * 0.9, hindH * 0.6, hindW * 0.6, hindH * 1.1, 1, hindH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

      } else if (b.species === 2) {
        // --- 2: Золотистая Охристая Лимонница (Pointed leaf tips) ---
        // Pointed leaf-like forewings
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.bezierCurveTo(-wingWidth * 0.7, -wingHeight * 0.7, -wingWidth * 1.3, -wingHeight * 0.3, -wingWidth * 1.1, 0);
        ctx.bezierCurveTo(-wingWidth * 0.9, wingHeight * 0.25, -wingWidth * 0.3, wingHeight * 0.15, -1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.bezierCurveTo(wingWidth * 0.7, -wingHeight * 0.7, wingWidth * 1.3, -wingHeight * 0.3, wingWidth * 1.1, 0);
        ctx.bezierCurveTo(wingWidth * 0.9, wingHeight * 0.25, wingWidth * 0.3, wingHeight * 0.15, 1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Leaf-tip hindwings
        const hindW = wingWidth * 0.6;
        const hindH = wingHeight * 0.55;
        ctx.beginPath();
        ctx.moveTo(-1, 1);
        ctx.lineTo(-hindW * 0.8, hindH * 0.6);
        ctx.lineTo(-hindW * 0.4, hindH * 1.05); // leaf tip
        ctx.lineTo(-1, hindH * 0.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 1);
        ctx.lineTo(hindW * 0.8, hindH * 0.6);
        ctx.lineTo(hindW * 0.4, hindH * 1.05); // leaf tip
        ctx.lineTo(1, hindH * 0.8);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

      } else {
        // --- 3: Аметистовая Павлиноглазка (Broad rounded fan wings) ---
        ctx.beginPath();
        ctx.moveTo(-1, 0);
        ctx.bezierCurveTo(-wingWidth * 0.5, -wingHeight * 0.95, -wingWidth * 1.35, -wingHeight * 0.55, -wingWidth, 0.05);
        ctx.bezierCurveTo(-wingWidth * 0.75, wingHeight * 0.4, -wingWidth * 0.25, wingHeight * 0.25, -1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 0);
        ctx.bezierCurveTo(wingWidth * 0.5, -wingHeight * 0.95, wingWidth * 1.35, -wingHeight * 0.55, wingWidth, 0.05);
        ctx.bezierCurveTo(wingWidth * 0.75, wingHeight * 0.4, wingWidth * 0.25, wingHeight * 0.25, 1, 1);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Broad fan hindwings
        const hindW = wingWidth * 0.75;
        const hindH = wingHeight * 0.65;
        ctx.beginPath();
        ctx.moveTo(-1, 1);
        ctx.bezierCurveTo(-hindW * 0.95, hindH * 0.65, -hindW * 0.6, hindH * 1.15, -1, hindH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(1, 1);
        ctx.bezierCurveTo(hindW * 0.95, hindH * 0.65, hindW * 0.6, hindH * 1.15, 1, hindH);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
      }

      // Slender calligraphic body & antenna line
      ctx.fillStyle = `rgba(37, 36, 43, ${(b.alpha * 0.85).toFixed(2)})`;
      ctx.beginPath();
      ctx.ellipse(0, 1.5, 0.85, wingHeight * 0.35, 0, 0, Math.PI * 2);
      ctx.fill();

      // Fine antenna strokes
      ctx.strokeStyle = `rgba(37, 36, 43, ${(b.alpha * 0.6).toFixed(2)})`;
      ctx.lineWidth = 0.6;
      ctx.beginPath();
      ctx.moveTo(-0.5, -wingHeight * 0.25);
      ctx.quadraticCurveTo(-wingWidth * 0.25, -wingHeight * 0.6, -wingWidth * 0.35, -wingHeight * 0.55);
      ctx.moveTo(0.5, -wingHeight * 0.25);
      ctx.quadraticCurveTo(wingWidth * 0.25, -wingHeight * 0.6, wingWidth * 0.35, -wingHeight * 0.55);
      ctx.stroke();

      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = butterflies.length - 1; i >= 0; i--) {
        const b = butterflies[i];
        b.life += 1;
        b.x += b.vx;
        b.y += b.vy;
        b.rotation += b.rotationSpeed;
        b.flapPhase += b.flapSpeed;

        // Gentle orbit drift when slowing
        b.orbitPhase += 0.04;
        b.vx += Math.sin(b.orbitPhase) * 0.08;
        b.vy += Math.cos(b.orbitPhase) * 0.05;

        // Soft fade out over lifetime
        const progress = b.life / b.maxLife;
        b.alpha = Math.max(0, 0.88 * (1 - Math.pow(progress, 1.4)));

        // Gentle drag
        b.vx *= 0.975;
        b.vy *= 0.975;

        drawButterfly(b);

        if (b.life >= b.maxLife) {
          butterflies.splice(i, 1);
        }
      }

      if (butterflies.length > 0) {
        animationId = requestAnimationFrame(render);
      } else {
        isRunning = false;
        ctx.clearRect(0, 0, width, height);
      }
    };

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('touchstart', handleTouchStart);
      mediaQuery.removeEventListener('change', onMediaChange);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    />
  );
};
