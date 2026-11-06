import React, { useId } from 'react';

interface InkBloomDividerProps {
  color?: 'ultramarine' | 'viridian' | 'coral' | 'amethyst' | 'ochre' | 'neutral';
  flip?: boolean;
  className?: string;
}

const COLOR_MAP = {
  ultramarine: {
    gradientStart: '#1E3A8A',
    gradientEnd: '#3B82F6',
    softFill: 'rgba(30, 58, 138, 0.06)',
  },
  viridian: {
    gradientStart: '#2D6A4F',
    gradientEnd: '#52B788',
    softFill: 'rgba(45, 106, 79, 0.06)',
  },
  coral: {
    gradientStart: '#D9483B',
    gradientEnd: '#F87171',
    softFill: 'rgba(217, 72, 59, 0.06)',
  },
  amethyst: {
    gradientStart: '#583D72',
    gradientEnd: '#8B5CF6',
    softFill: 'rgba(88, 61, 114, 0.06)',
  },
  ochre: {
    gradientStart: '#D97706',
    gradientEnd: '#FBBF24',
    softFill: 'rgba(217, 119, 6, 0.06)',
  },
  neutral: {
    gradientStart: '#E3DED4',
    gradientEnd: '#FAF7F2',
    softFill: 'rgba(227, 222, 212, 0.35)',
  },
};

export const InkBloomDivider: React.FC<InkBloomDividerProps> = ({
  color = 'neutral',
  flip = false,
  className = '',
}) => {
  const c = COLOR_MAP[color];
  const reactId = useId().replace(/:/g, '');
  const uniqueId = `ink-grad-${color}-${flip ? 'flip' : 'normal'}-${reactId}`;

  return (
    <div
      className={`relative w-full overflow-hidden leading-none pointer-events-none select-none ${className}`}
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 80"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`w-full h-10 sm:h-16 lg:h-20 ${flip ? 'rotate-180' : ''}`}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={uniqueId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={c.gradientStart} stopOpacity="0.14" />
            <stop offset="45%" stopColor={c.gradientEnd} stopOpacity="0.08" />
            <stop offset="100%" stopColor={c.gradientStart} stopOpacity="0.03" />
          </linearGradient>
        </defs>

        {/* Soft atmospheric watercolor wash background */}
        <path
          d="M0,25 C240,65 480,-10 720,35 C960,75 1200,5 1440,30 L1440,80 L0,80 Z"
          fill={c.softFill}
        />

        {/* Organic watercolor bleeding contour */}
        <path
          d="M0,45 C180,75 360,15 540,55 C720,85 900,25 1080,60 C1260,85 1380,35 1440,50 L1440,80 L0,80 Z"
          fill={`url(#${uniqueId})`}
        />

        {/* Subtle watercolor edge line */}
        <path
          d="M0,45 C180,75 360,15 540,55 C720,85 900,25 1080,60 C1260,85 1380,35 1440,50"
          stroke={c.gradientStart}
          strokeWidth="1.2"
          strokeOpacity="0.18"
          strokeDasharray="4 6"
        />
      </svg>
    </div>
  );
};
