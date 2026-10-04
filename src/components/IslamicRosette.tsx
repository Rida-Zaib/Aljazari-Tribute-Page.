import React from 'react';

interface RosetteProps {
  className?: string;
  size?: number;
}

export const IslamicRosette: React.FC<RosetteProps> = ({ 
  className = '', 
  size = 320 
}) => {
  return (
    <div className={`relative flex items-center justify-center ${className}`} style={{ width: size, height: size }}>
      <svg
        viewBox="-160 -160 320 320"
        width={size}
        height={size}
        className="w-full h-full drop-shadow-[0_4px_20px_rgba(0,0,0,0.45)] transition-all"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="goldMedallion" cx="0%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#FFF4C4" />
            <stop offset="35%" stopColor="#E4B24B" />
            <stop offset="75%" stopColor="#96691A" />
            <stop offset="100%" stopColor="#4A3105" />
          </radialGradient>

          <radialGradient id="lapisCore" cx="0%" cy="0%" r="100%">
            <stop offset="0%" stopColor="#255C58" />
            <stop offset="60%" stopColor="#123B38" />
            <stop offset="100%" stopColor="#081E1C" />
          </radialGradient>

          <linearGradient id="rubyShine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C43B3B" />
            <stop offset="100%" stopColor="#751A1B" />
          </linearGradient>
        </defs>

        {/* Outer illuminated halo ring with breathing glow */}
        <circle r="148" fill="none" stroke="url(#goldMedallion)" strokeWidth="1.5" strokeDasharray="3 4" opacity="0.65" />
        <circle r="142" fill="none" stroke="#C59333" strokeWidth="2.5" />
        <circle r="136" fill="none" stroke="#C43B3B" strokeWidth="1.2" strokeDasharray="6 3" />
        <circle r="128" fill="url(#lapisCore)" stroke="url(#goldMedallion)" strokeWidth="2" opacity="0.9" />

        {/* 16-pointed Outer Petal Layer */}
        {Array.from({ length: 16 }).map((_, i) => {
          const angle = (i * 360) / 16;
          return (
            <g key={`petal-${i}`} transform={`rotate(${angle})`}>
              <path
                d="M 0,-128 Q 18,-110 12,-90 Q 0,-80 -12,-90 Q -18,-110 0,-128 Z"
                fill="url(#goldMedallion)"
                stroke="#5E3F0A"
                strokeWidth="0.8"
                opacity="0.95"
              />
              <circle cx="0" cy="-120" r="2.2" fill="#C43B3B" />
              <circle cx="0" cy="-100" r="1.5" fill="#FFF4D0" />
            </g>
          );
        })}

        {/* 12-pointed Interlacing Geometric Star (Girih polygon) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 360) / 12;
          return (
            <g key={`star12-${i}`} transform={`rotate(${angle})`}>
              <polygon
                points="0,-88 18,-52 0,-36 -18,-52"
                fill="rgba(19, 61, 59, 0.92)"
                stroke="url(#goldMedallion)"
                strokeWidth="1.2"
              />
              <path
                d="M 0,-88 L 0,-36"
                stroke="rgba(244, 212, 126, 0.45)"
                strokeWidth="0.75"
              />
            </g>
          );
        })}

        {/* Secondary 8-pointed star interlace */}
        {Array.from({ length: 8 }).map((_, i) => {
          const angle = (i * 360) / 8 + 22.5;
          return (
            <g key={`star8-${i}`} transform={`rotate(${angle})`}>
              <polygon
                points="0,-60 14,-34 0,-20 -14,-34"
                fill="url(#rubyShine)"
                stroke="url(#goldMedallion)"
                strokeWidth="1"
                opacity="0.9"
              />
            </g>
          );
        })}

        {/* Center Medallion Boss */}
        <circle r="26" fill="url(#goldMedallion)" stroke="#3E2704" strokeWidth="1.5" />
        <circle r="20" fill="url(#lapisCore)" stroke="url(#goldMedallion)" strokeWidth="1" />
        
        {/* Central 8-ray golden floral core */}
        {Array.from({ length: 8 }).map((_, i) => (
          <path
            key={`core-${i}`}
            d="M 0,-18 Q 4,-9 0,0 Q -4,-9 0,-18 Z"
            fill="url(#goldMedallion)"
            transform={`rotate(${(i * 360) / 8})`}
          />
        ))}

        <circle r="4.5" fill="#FFF4D0" stroke="#7A5612" strokeWidth="1" />
      </svg>
    </div>
  );
};
