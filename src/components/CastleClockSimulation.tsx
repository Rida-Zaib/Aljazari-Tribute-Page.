import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Clock, Sun, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CastleClockSimulationProps {
  className?: string;
}

export const CastleClockSimulation: React.FC<CastleClockSimulationProps> = ({ className = '' }) => {
  const [hourProgress, setHourProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (t: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (t - lastTimeRef.current) / 1000;
        setHourProgress((prev) => (prev + delta / 10) % 1);
      }
      lastTimeRef.current = t;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const activeDoor = Math.floor(hourProgress * 12);
  const zodiacRotation = hourProgress * 360;

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="castleGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C4" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="skyZodiac" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E3836" />
            <stop offset="100%" stopColor="#0D1D1C" />
          </linearGradient>
        </defs>

        <rect width="360" height="210" fill="#0C1716" rx="6" />

        {/* Castle Facade Structure */}
        <rect x="40" y="30" width="280" height="165" fill="#152B28" stroke="#C59333" strokeWidth="1.5" rx="4" />

        {/* Top Zodiac Sky Disc */}
        <g transform="translate(180, 75)">
          <circle r="36" fill="url(#skyZodiac)" stroke="#C59333" strokeWidth="1" />
          <g transform={`rotate(${zodiacRotation})`}>
            <circle cx="0" cy="-26" r="4.5" fill="#FFF2BD" stroke="#C59333" />
            <line x1="0" y1="0" x2="0" y2="-26" stroke="#E4B24B" strokeWidth="1.2" strokeDasharray="2 2" />
            {Array.from({ length: 12 }).map((_, i) => (
              <circle
                key={i}
                cx={28 * Math.cos((i * Math.PI) / 6)}
                cy={28 * Math.sin((i * Math.PI) / 6)}
                r="1.5"
                fill="#FFF"
                opacity="0.8"
              />
            ))}
          </g>
          <circle r="5" fill="url(#castleGold)" />
        </g>

        {/* 12 Daylight Hour Doors Row */}
        <g transform="translate(60, 120)">
          {Array.from({ length: 12 }).map((_, i) => {
            const isOpen = i <= activeDoor;
            return (
              <g key={i} transform={`translate(${i * 20}, 0)`}>
                <rect
                  x="0"
                  y="0"
                  width="16"
                  height="22"
                  rx="1"
                  fill={isOpen ? '#FFF4C4' : '#0B1817'}
                  stroke="#C59333"
                  strokeWidth="0.8"
                />
                {isOpen ? (
                  <circle cx="8" cy="11" r="3" fill="#9E2A2B" />
                ) : (
                  <line x1="8" y1="3" x2="8" y2="19" stroke="#C59333" strokeWidth="0.5" opacity="0.4" />
                )}
              </g>
            );
          })}
        </g>

        {/* Lower Figurine Stage (Automata Musicians) */}
        <g transform="translate(60, 155)">
          <rect x="0" y="0" width="240" height="28" fill="#0E201E" stroke="#C59333" strokeWidth="1" rx="2" />
          {Array.from({ length: 5 }).map((_, i) => (
            <g key={i} transform={`translate(${20 + i * 48}, 6)`}>
              <circle cx="8" cy="6" r="4" fill="#FFF2BD" />
              <path d="M 4,10 L 12,10 L 10,20 L 6,20 Z" fill={i % 2 === 0 ? '#9E2A2B' : '#1C5A57'} />
            </g>
          ))}
        </g>

        {/* Status Callout */}
        <text x="15" y="22" fill="#E4B24B" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="bold">
          Castle Astronomical Clock • Hour {activeDoor + 1} of 12 (Solar Time)
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Astronomical Horology
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            The Castle Astronomical Clock (1206 CE)
          </h4>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
          className="p-1.5 rounded-lg bg-[#C59333]/20 hover:bg-[#C59333]/35 border border-[#C59333]/40 text-[#E4B24B] transition-colors flex items-center gap-1 text-[10px] font-display font-semibold"
          title="Expand diagram"
          aria-label="Expand diagram"
        >
          <Maximize2 className="w-3 h-3" />
          <span>Expand</span>
        </button>
      </div>

      <div className="bg-[#0A1413] rounded-lg border border-[#C59333]/20 p-1.5 overflow-hidden">
        {renderSvg(false)}
      </div>

      <div className="mt-2 text-[10px] font-body text-[#FAF6ED]/80 leading-snug">
        Monumental 11-foot water clock displaying solar time, rotating zodiac constellations, 12 daylight glass doors, and mechanical musicians.
      </div>

      {/* FULL-VIEW OVERLAY MODAL */}
      {isExpanded && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#F4EBD9] border-2 border-[#C59333] rounded-2xl shadow-2xl overflow-hidden flex flex-col manuscript-scroll text-[#2B2118]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#143E3B] text-[#FAF6ED] border-b-2 border-[#C59333]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E4B24B] font-display font-semibold">
                  Monumental Horology • Solar & Zodiac Tracking
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Castle Astronomical Clock (1206 CE)
                </h3>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="p-1.5 text-[#FAF6ED]/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-5 overflow-y-auto flex flex-col gap-4">
              <div className="bg-[#0A1413] rounded-xl border-2 border-[#C59333]/60 p-3 shadow-inner flex items-center justify-center">
                {renderSvg(true)}
              </div>

              <div className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed font-body">
                <div className="bg-[#FAF6ED] p-3 rounded-xl border border-[#C59333]/30">
                  <h4 className="font-display font-bold text-xs uppercase text-[#9E2A2B] tracking-wider mb-1 flex items-center gap-1.5">
                    <Sun className="w-3.5 h-3.5 text-[#C59333]" />
                    Solar & Unequal Hour Regulation
                  </h4>
                  <p className="text-[#3A2C1E]">
                    Standing 11 feet (3.4 meters) high, this astronomical clock displayed the true solar day divided into twelve seasonal hours that expanded or contracted with summer and winter. A main reservoir drained through a calibrated flow regulator into a float cylinder, whose steady descent turned the zodiac disc and opened 12 upper doors sequentially to reveal the passage of each hour.
                  </p>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Complex Multi-Stage Escapement: </span>
                  At each hour, two bronze falcons dropped balls from their beaks into vases, followed by five automated figurines striking drums, cymbals, and blowing bronze horns.
                </div>
              </div>
            </div>

            <div className="px-5 py-2.5 bg-[#EAE0CA] border-t border-[#C59333]/40 flex justify-end">
              <button
                onClick={() => setIsExpanded(false)}
                className="px-4 py-1.5 bg-[#143E3B] hover:bg-[#1C5A57] text-[#FAF6ED] font-display font-bold text-xs rounded-lg transition-colors"
              >
                Close Diagram View
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
