import React, { useEffect, useRef, useState } from 'react';
import { Sparkles } from 'lucide-react';

interface PigmentDrop {
  origX: number;
  origY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;
  seed: number;
}

const PIGMENTS = [
  'rgba(49, 86, 184, 0.16)',   // Ultramarine
  'rgba(233, 110, 84, 0.16)',  // Venetian Coral
  'rgba(232, 182, 75, 0.18)',  // Warm Ochre
  'rgba(118, 101, 183, 0.15)', // Amethyst
  'rgba(121, 159, 135, 0.16)', // Sage
  'rgba(199, 122, 174, 0.14)', // Raspberry
];

interface LivingInkCanvasProps {
  className?: string;
  interactiveHint?: boolean;
}

export const LivingInkCanvas: React.FC<LivingInkCanvasProps> = ({
  className = '',
  interactiveHint = true,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = container.clientWidth;
    let height = container.clientHeight;

    const resize = () => {
      if (!container || !canvas) return;
      width = container.clientWidth;
      height = container.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    window.addEventListener('resize', resize);

    // Seed organic pigment drops distributed across the canvas
    const drops: PigmentDrop[] = [];
    const dropCount = Math.max(6, Math.min(10, Math.floor((width * height) / 45000)));

    for (let i = 0; i < dropCount; i++) {
      const origX = (0.15 + (0.7 * (i + 0.5)) / dropCount + (Math.random() - 0.5) * 0.1) * width;
      const origY = (0.2 + 0.6 * Math.random()) * height;
      drops.push({
        origX,
        origY,
        x: origX,
        y: origY,
        vx: 0,
        vy: 0,
        radius: Math.min(width, height) * (0.16 + Math.random() * 0.12),
        color: PIGMENTS[i % PIGMENTS.length],
        seed: Math.random() * Math.PI * 2,
      });
    }

    let isRunning = false;
    let animationId = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let lastMouseMove = performance.now();

    const startAnimation = () => {
      if (!isRunning) {
        isRunning = true;
        animationId = requestAnimationFrame(tick);
      }
    };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      lastMouseMove = performance.now();
      setHasInteracted(true);
      startAnimation();
    };

    const handlePointerLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    container.addEventListener('mousemove', handlePointerMove, { passive: true });
    container.addEventListener('mouseleave', handlePointerLeave, { passive: true });

    // Touch support for mobile devices
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.touches[0].clientX - rect.left;
        mouseY = e.touches[0].clientY - rect.top;
        lastMouseMove = performance.now();
        setHasInteracted(true);
        startAnimation();
      }
    };
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('touchend', handlePointerLeave, { passive: true });

    // Simulation loop: spring tension returning to anchor, fluid disturbance from cursor
    const tick = () => {
      let maxVelocity = 0;
      const spring = 0.025;
      const friction = 0.92;
      const disturbanceRadius = 160;

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];

        // Interaction disturbance: cursor acts like brush stirring water
        const dx = d.x - mouseX;
        const dy = d.y - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < disturbanceRadius && dist > 1) {
          const force = (1 - dist / disturbanceRadius) * 4.5;
          // Radial push + subtle tangential swirl
          d.vx += (dx / dist) * force - (dy / dist) * (force * 0.6);
          d.vy += (dy / dist) * force + (dx / dist) * (force * 0.6);
        }

        // Hooke's law spring toward original anchor point
        const ax = (d.origX - d.x) * spring;
        const ay = (d.origY - d.y) * spring;

        d.vx = (d.vx + ax) * friction;
        d.vy = (d.vy + ay) * friction;

        d.x += d.vx;
        d.y += d.vy;

        const currentV = Math.hypot(d.vx, d.vy);
        if (currentV > maxVelocity) {
          maxVelocity = currentV;
        }
      }

      // Render watercolor pigments on paper
      ctx.clearRect(0, 0, width, height);

      // Multiply blend for authentic watercolor layer wash
      ctx.globalCompositeOperation = 'multiply';

      for (let i = 0; i < drops.length; i++) {
        const d = drops[i];
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.radius);
        grad.addColorStop(0, d.color);
        grad.addColorStop(0.65, d.color.replace(/0\.\d+\)/, '0.08)'));
        grad.addColorStop(1, 'rgba(250, 247, 242, 0)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.globalCompositeOperation = 'source-over';

      // Keep running if particles are moving or mouse was recently active
      const now = performance.now();
      if (maxVelocity > 0.04 || now - lastMouseMove < 2000) {
        animationId = requestAnimationFrame(tick);
      } else {
        isRunning = false;
      }
    };

    // Initial render
    tick();

    return () => {
      window.removeEventListener('resize', resize);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mouseleave', handlePointerLeave);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handlePointerLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden cursor-crosshair select-none ${className}`}
      aria-label="Живой холст: перемещайте курсор для взаимодействия с цветными пигментами"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
        aria-hidden="true"
      />

      {interactiveHint && !hasInteracted && (
        <div className="absolute bottom-4 right-4 z-10 pointer-events-none flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-mist text-[11px] font-mono tracking-wider uppercase text-ash shadow-subtle animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-[#3156B8]" />
          <span>Проведите курсором, чтобы потревожить пигменты</span>
        </div>
      )}
    </div>
  );
};
