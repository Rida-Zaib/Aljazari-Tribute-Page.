import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Sparkles, Cog } from 'lucide-react';
import { createPortal } from 'react-dom';

interface AnimalPistonSimulationProps {
  className?: string;
}

export const AnimalPistonSimulation: React.FC<AnimalPistonSimulationProps> = ({ className = '' }) => {
  const [angle, setAngle] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (t: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (t - lastTimeRef.current) / 1000;
        setAngle((prev) => (prev + delta * 2) % (Math.PI * 2));
      }
      lastTimeRef.current = t;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const pistonOffset = Math.sin(angle) * 22;

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="pistonGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C4" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="waterFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1C5A57" />
            <stop offset="100%" stopColor="#7FE0DB" />
          </linearGradient>
        </defs>

        <rect width="360" height="210" fill="#0C1716" rx="6" />

        {/* Central Rotating Wheel & Crank Pin */}
        <g transform="translate(180, 105)">
          <circle r="36" fill="#152B28" stroke="#C59333" strokeWidth="2" />
          {/* Rotating Crank Arm */}
          <line
            x1="0"
            y1="0"
            x2={28 * Math.cos(angle)}
            y2={28 * Math.sin(angle)}
            stroke="#E4B24B"
            strokeWidth="3.5"
          />
          <circle cx={28 * Math.cos(angle)} cy={28 * Math.sin(angle)} r="4" fill="#9E2A2B" stroke="#FFF" />
          <circle r="6" fill="url(#pistonGold)" />
        </g>

        {/* Left Cylinder & Piston */}
        <g transform="translate(50, 85)">
          <rect x="0" y="0" width="70" height="40" fill="#0C201E" stroke="#C59333" strokeWidth="1.5" rx="2" />
          <rect x={15 + pistonOffset} y="4" width="16" height="32" fill="#D8A53B" stroke="#4A340F" rx="1" />
          <line x1={31 + pistonOffset} y1="20" x2="130" y2="20" stroke="#FAF6ED" strokeWidth="2.5" />
          <text x="12" y="55" fill="#7FE0DB" fontSize="8">Left Cylinder</text>
        </g>

        {/* Right Cylinder & Piston */}
        <g transform="translate(240, 85)">
          <rect x="0" y="0" width="70" height="40" fill="#0C201E" stroke="#C59333" strokeWidth="1.5" rx="2" />
          <rect x={35 - pistonOffset} y="4" width="16" height="32" fill="#D8A53B" stroke="#4A340F" rx="1" />
          <line x1="-10" y1="20" x2={35 - pistonOffset} y2="20" stroke="#FAF6ED" strokeWidth="2.5" />
          <text x="12" y="55" fill="#7FE0DB" fontSize="8">Right Cylinder</text>
        </g>

        {/* Status Callout */}
        <text x="15" y="24" fill="#E4B24B" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="bold">
          Double-Acting Reciprocating Suction Pump (1206 CE)
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Hydraulic Pumping Kinematics
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            Twin Double-Acting Piston Pump (1206 CE)
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
        Rotary drive wheel drives twin reciprocating pistons in opposed cylinders, pulling water continuously through ground-brass suction check valves.
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
                  Suction Hydraulics • Opposed Piston Engines
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Double-Acting Piston Pump
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
                    <Sparkles className="w-3.5 h-3.5 text-[#C59333]" />
                    First True Double-Acting Suction Pump in History
                  </h4>
                  <p className="text-[#3A2C1E]">
                    Al-Jazari's machine is historically acknowledged as the earliest known reciprocating suction pump. As the central crank turns, one piston pulls a vacuum to draw water through non-return conical valves into its cylinder, while the opposite piston forcefully discharges its water volume upward into the delivery flume.
                  </p>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Engineering Precursor: </span>
                  Direct predecessor to the steam engine piston pumps developed in Europe 500 years later.
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
