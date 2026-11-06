import React, { useEffect, useRef, useState, useId } from 'react';

interface CalligraphicInkLineProps {
  color?: string;
  durationMs?: number;
  className?: string;
}

export const CalligraphicInkLine: React.FC<CalligraphicInkLineProps> = ({
  color = '#25242B',
  durationMs = 1400,
  className = '',
}) => {
  const rawId = useId();
  const uid = rawId.replace(/[^a-zA-Z0-9_-]/g, '_');
  const pathRef = useRef<SVGPathElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [pathLength, setPathLength] = useState<number>(0);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false);

  useEffect(() => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setPrefersReducedMotion(isReduced);

    if (isReduced) {
      setIsVisible(true);
      return;
    }

    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setPathLength(len);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.35, rootMargin: '0px 0px -40px 0px' }
    );

    if (svgRef.current) {
      observer.observe(svgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={svgRef}
      viewBox="0 0 600 54"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-xl mx-auto overflow-visible pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Capillary ink bleeding filter on paper texture */}
        <filter id={`ink-bleed-${uid}`} x="-5%" y="-20%" width="110%" height="140%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.045"
            numOctaves="3"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="1.8"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
        <linearGradient id={`ink-grad-${uid}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor={color} stopOpacity="0.25" />
          <stop offset="25%" stopColor={color} stopOpacity="0.85" />
          <stop offset="80%" stopColor="#8C5A44" stopOpacity="0.9" />
          <stop offset="100%" stopColor={color} stopOpacity="0.15" />
        </linearGradient>
      </defs>

      {/* Primary calligraphic ink stroke with subtle flourished loop */}
      <path
        ref={pathRef}
        d="M 18 32 C 95 14, 175 44, 265 26 C 315 16, 338 8, 322 28 C 308 45, 365 36, 445 22 C 505 12, 548 29, 582 24"
        stroke={`url(#ink-grad-${uid})`}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#ink-bleed-${uid})`}
        style={{
          strokeDasharray: pathLength || 650,
          strokeDashoffset: isVisible ? 0 : (pathLength || 650),
          transition: prefersReducedMotion
            ? 'none'
            : `stroke-dashoffset ${durationMs}ms cubic-bezier(0.22, 1, 0.36, 1)`,
        }}
      />

      {/* Terminal calligraphic pen droplet */}
      <circle
        cx="586"
        cy="23.5"
        r="2.4"
        fill={color}
        style={{
          opacity: isVisible ? 0.75 : 0,
          transform: isVisible ? 'scale(1)' : 'scale(0.2)',
          transformOrigin: '586px 23.5px',
          transition: prefersReducedMotion
            ? 'none'
            : `opacity 450ms ease ${Math.max(100, durationMs - 250)}ms, transform 450ms cubic-bezier(0.34, 1.56, 0.64, 1) ${Math.max(100, durationMs - 250)}ms`,
        }}
      />
    </svg>
  );
};
