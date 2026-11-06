import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Sparkles, RefreshCw } from 'lucide-react';

interface InteractivePaintingProps {
  imageSrc: string;
  imageAlt: string;
  captionTitle: string;
  captionSubtitle: string;
  className?: string;
}

export const InteractivePainting: React.FC<InteractivePaintingProps> = ({
  imageSrc,
  imageAlt,
  captionTitle,
  captionSubtitle,
  className = '',
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [clearedPercent, setClearedPercent] = useState(0);

  const initPaint = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Use logical container dimensions to calculate layout since ctx.scale(dpr, dpr) is applied
    const w = container.clientWidth;
    const h = container.clientHeight;

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    ctx.scale(dpr, dpr);

    ctx.globalCompositeOperation = 'source-over';

    // Warm paper base wash
    ctx.fillStyle = '#F5EFEB';
    ctx.fillRect(0, 0, w, h);

    // Painterly watercolor wash gradients
    const grad1 = ctx.createRadialGradient(w * 0.3, h * 0.35, 10, w * 0.3, h * 0.35, w * 0.65);
    grad1.addColorStop(0, 'rgba(49, 86, 184, 0.45)');  // Ultramarine
    grad1.addColorStop(0.5, 'rgba(118, 101, 183, 0.35)'); // Violet
    grad1.addColorStop(1, 'rgba(245, 239, 235, 0)');
    ctx.fillStyle = grad1;
    ctx.fillRect(0, 0, w, h);

    const grad2 = ctx.createRadialGradient(w * 0.7, h * 0.65, 10, w * 0.7, h * 0.65, w * 0.6);
    grad2.addColorStop(0, 'rgba(232, 182, 75, 0.5)');   // Warm Ochre
    grad2.addColorStop(0.6, 'rgba(233, 110, 84, 0.35)'); // Coral
    grad2.addColorStop(1, 'rgba(245, 239, 235, 0)');
    ctx.fillStyle = grad2;
    ctx.fillRect(0, 0, w, h);

    // Organic watercolor splatters & brush texture
    ctx.fillStyle = 'rgba(49, 86, 184, 0.15)';
    for (let i = 0; i < 35; i++) {
      const rx = (0.1 + 0.8 * Math.random()) * w;
      const ry = (0.1 + 0.8 * Math.random()) * h;
      const r = 4 + Math.random() * 16;
      ctx.beginPath();
      ctx.arc(rx, ry, r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.restore();

    setClearedPercent(0);
    setIsRevealed(false);
  }, []);

  useEffect(() => {
    // If reduced motion is requested, reveal completely without interactive wash
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsRevealed(true);
      setClearedPercent(100);
      return;
    }

    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = container.clientWidth * dpr;
    canvas.height = container.clientHeight * dpr;

    initPaint();

    const handleResize = () => {
      if (!canvas || !container) return;
      canvas.width = container.clientWidth * dpr;
      canvas.height = container.clientHeight * dpr;
      initPaint();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initPaint]);

  // Rub / Wash away the paint layer on cursor movement or touch
  const eraseAt = (clientX: number, clientY: number) => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const radius = 42;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Use destination-out to carve soft translucent holes into the paint wash
    ctx.save();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalCompositeOperation = 'destination-out';

    const brushGrad = ctx.createRadialGradient(x, y, 0, x, y, radius);
    brushGrad.addColorStop(0, 'rgba(0, 0, 0, 0.88)');
    brushGrad.addColorStop(0.65, 'rgba(0, 0, 0, 0.45)');
    brushGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');

    ctx.fillStyle = brushGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    setIsRevealed(true);
    setClearedPercent((prev) => (prev >= 100 ? 100 : Math.min(100, prev + 2.5)));
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    eraseAt(e.clientX, e.clientY);
  };

  // Keyboard accessibility: space or enter reveals the painting fully
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
      setIsRevealed(true);
      setClearedPercent(100);
    }
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      className={`relative overflow-hidden border border-mist bg-[#F3EFE6] cursor-pointer group shadow-card select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3156B8] ${className}`}
      aria-label="Интерактивная картина: проведите курсором или нажмите Enter, чтобы смыть краску и увидеть подлинную фотографию"
    >
      {/* Underlying Authentic Telegram Photograph */}
      <img
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />

      {/* Painterly Watercolor Glaze Canvas Overlay */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none transition-opacity duration-500"
        aria-hidden="true"
      />

      {/* Subtle paper vignette contour */}
      <div className="absolute inset-0 border border-black/5 pointer-events-none" />

      {/* Interactive Floating Status Pill */}
      <div className="absolute top-3 left-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-mist text-[10px] font-mono tracking-wider uppercase text-ink shadow-subtle">
        <Sparkles className="w-3.5 h-3.5 text-[#E8B64B]" />
        <span>
          {clearedPercent > 60
            ? 'Картина раскрыта'
            : isRevealed
            ? `Смыто ${Math.round(clearedPercent)}% краски`
            : 'Проведите курсором, чтобы смыть краску'}
        </span>
      </div>

      {clearedPercent > 20 && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            initPaint();
          }}
          className="absolute top-3 right-3 z-20 p-2 rounded-full bg-white/90 hover:bg-white backdrop-blur-md border border-mist text-ash hover:text-ink transition-all shadow-subtle focus-visible:ring-2 focus-visible:ring-[#3156B8]"
          aria-label="Восстановить акварельный слой"
          title="Восстановить слой краски"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      )}

      {/* Editorial Colophon Caption Card */}
      <div className="absolute bottom-3 left-3 right-3 z-20 bg-white/95 backdrop-blur-md border border-mist p-3.5 text-left">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="font-serif italic text-base sm:text-lg font-medium text-ink leading-tight">
              {captionTitle}
            </p>
            <p className="text-[10px] font-mono text-ash tracking-wide uppercase mt-0.5">
              {captionSubtitle}
            </p>
          </div>
          <span className="w-2.5 h-2.5 rounded-full bg-[#E96E54] shrink-0" />
        </div>
      </div>
    </div>
  );
};
