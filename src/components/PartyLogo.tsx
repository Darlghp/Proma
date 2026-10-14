import React from 'react';

interface PartyLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'emblem-only' | 'horizontal';
  inverted?: boolean;
}

export const PartyLogo: React.FC<PartyLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'full',
  inverted = false,
}) => {
  const textColor = inverted ? 'text-white' : 'text-neutral-900 dark:text-white';
  const subtextColor = inverted ? 'text-neutral-300' : 'text-neutral-700 dark:text-neutral-300';
  const fillPrimary = inverted ? '#ffffff' : 'currentColor';

  const scaleMap = {
    sm: { width: 110, height: 90, emblemSize: 42, textClass: 'text-2xl', subTextClass: 'text-[9px]' },
    md: { width: 170, height: 140, emblemSize: 64, textClass: 'text-4xl', subTextClass: 'text-xs' },
    lg: { width: 230, height: 190, emblemSize: 88, textClass: 'text-5xl', subTextClass: 'text-sm' },
    xl: { width: 310, height: 260, emblemSize: 120, textClass: 'text-7xl', subTextClass: 'text-lg' },
  };

  const currentScale = scaleMap[size];

  // SVG emblem recreation of the eagle + star + ascent bars from the logo
  const Emblem = (
    <svg
      viewBox="0 0 100 90"
      className="overflow-visible"
      style={{ width: currentScale.emblemSize, height: currentScale.emblemSize * 0.9 }}
      aria-label="Emblema do Partido PROMA: Águia e Estrela"
    >
      <g fill={fillPrimary}>
        {/* Background Star facets & growth pillars */}
        <path
          d="M50 8 L54 28 L72 32 L56 42 L62 62 L50 48 L38 62 L44 42 L28 32 L46 28 Z"
          opacity="0.9"
        />
        {/* Vertical growth / architecture bars behind eagle */}
        <rect x="46" y="16" width="3.5" height="24" rx="0.5" />
        <rect x="51.5" y="11" width="3.5" height="29" rx="0.5" />
        <rect x="57" y="18" width="3.5" height="22" rx="0.5" />

        {/* Soaring Eagle with dynamic wing feathers, head and tail */}
        <path
          d="M 52 24 
             C 57 23, 63 26, 65 30 
             C 62 31, 58 31, 56 33 
             C 59 34, 62 35, 60 37 
             C 56 36, 53 37, 51 39 
             C 53 43, 52 50, 48 57 
             C 45 61, 40 64, 38 68 
             C 41 64, 46 60, 48 53 
             C 47 52, 45 54, 42 56 
             C 44 51, 46 47, 44 44 
             C 40 45, 36 49, 33 54 
             C 36 47, 40 43, 38 39 
             C 33 42, 28 47, 24 53 
             C 27 45, 33 39, 31 34 
             C 26 38, 20 44, 15 50 
             C 19 41, 26 34, 25 29 
             C 20 34, 14 41, 9 47 
             C 14 36, 23 27, 24 22 
             C 20 26, 15 31, 10 37 
             C 17 25, 27 17, 33 13 
             C 35 18, 38 23, 44 26 
             C 47 25, 49 23, 52 24 Z"
        />
        {/* Eagle Eye / Beak precision highlight */}
        <path d="M 64 30 L 67 31 L 64 33 Z" fill={fillPrimary} />
      </g>
    </svg>
  );

  if (variant === 'emblem-only') {
    return <div className={`inline-flex items-center justify-center ${className}`}>{Emblem}</div>;
  }

  if (variant === 'horizontal') {
    return (
      <div className={`inline-flex items-center gap-3.5 select-none ${className}`}>
        <div className="shrink-0">{Emblem}</div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1 leading-none">
            <span className={`font-black tracking-tight ${textColor} ${currentScale.textClass}`}>
              PR
            </span>
            {/* The R with the diagonal upward-right arrow cutting through */}
            <span className={`relative font-black tracking-tight ${textColor} ${currentScale.textClass}`}>
              O
            </span>
          </div>
          <span className={`font-bold tracking-[0.25em] uppercase ${subtextColor} ${currentScale.subTextClass} mt-0.5`}>
            PARTIDO PROMA
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      {/* Emblem on top */}
      <div className="mb-2 shrink-0">{Emblem}</div>

      {/* PRO Wordmark with the customized Arrow in the R */}
      <div className="relative flex items-center justify-center leading-none">
        <svg
          viewBox="0 0 240 85"
          className="w-auto h-auto max-w-full"
          style={{ height: size === 'sm' ? 36 : size === 'md' ? 52 : size === 'lg' ? 70 : 96 }}
        >
          {/* Letter P */}
          <path
            d="M 10 10 L 52 10 C 68 10, 78 19, 78 32 C 78 45, 68 54, 52 54 L 32 54 L 32 80 L 10 80 Z M 32 32 L 49 32 C 54 32, 57 29, 57 25 C 57 21, 54 18, 49 18 L 32 18 Z"
            fill={fillPrimary}
          />

          {/* Letter R with upward diagonal arrow cut into the leg */}
          <path
            d="M 88 10 L 132 10 C 148 10, 157 19, 157 32 C 157 41, 152 48, 143 51 L 160 80 L 137 80 L 123 55 L 110 55 L 110 80 L 88 80 Z M 110 32 L 129 32 C 134 32, 137 29, 137 25 C 137 21, 134 18, 129 18 L 110 18 Z"
            fill={fillPrimary}
          />
          {/* Upward Arrow integrated into the R */}
          <polygon
            points="128,52 142,38 134,38 134,30 148,30 148,44 140,44 140,36 128,48"
            fill={inverted ? '#0a0a0a' : '#ffffff'}
          />
          <polygon
            points="126,54 144,36 136,36 136,28 150,28 150,42 142,42 142,34 126,50"
            fill={fillPrimary}
          />

          {/* Letter O */}
          <path
            d="M 205 8 C 228 8, 242 24, 242 45 C 242 66, 228 82, 205 82 C 182 82, 168 66, 168 45 C 168 24, 182 8, 205 8 Z M 205 27 C 196 27, 190 34, 190 45 C 190 56, 196 63, 205 63 C 214 63, 220 56, 220 45 C 220 34, 214 27, 205 27 Z"
            fill={fillPrimary}
          />
        </svg>
      </div>

      {/* Subtitle: PARTIDO PROMA */}
      <div className={`font-extrabold tracking-[0.28em] uppercase ${subtextColor} ${currentScale.subTextClass} mt-2`}>
        PARTIDO PROMA
      </div>
    </div>
  );
};
