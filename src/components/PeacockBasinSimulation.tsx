import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface PeacockBasinSimulationProps {
  className?: string;
}

export const PeacockBasinSimulation: React.FC<PeacockBasinSimulationProps> = ({ className = '' }) => {
  const [phase, setPhase] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (t: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (t - lastTimeRef.current) / 1000;
        setPhase((prev) => (prev + delta / 8) % 1);
      }
      lastTimeRef.current = t;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const isPouring = phase < 0.45;
  const isServantAdvance = phase >= 0.45 && phase < 0.8;
  const peacockBeakAngle = isPouring ? Math.sin(phase * Math.PI * 4) * 8 : 0;
  const servantX = isServantAdvance ? ((phase - 0.45) / 0.35) * 35 : 0;

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="peacockGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C4" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="peacockFeather" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1E6560" />
            <stop offset="100%" stopColor="#0B302D" />
          </linearGradient>
        </defs>

        <rect width="360" height="210" fill="#0C1716" rx="6" />

        {/* Lower Collection Basin & Concealed Float Chamber */}
        <path d="M 60,165 L 300,165 L 270,195 L 90,195 Z" fill="#152826" stroke="#C59333" strokeWidth="1.2" />
        <text x="130" y="185" fill="#E4B24B" fontSize="8">Internal Siphon Chamber</text>

        {/* Peacock Automaton on Column */}
        <g transform="translate(110, 40)">
          {/* Column Stand */}
          <rect x="25" y="65" width="20" height="60" fill="url(#peacockGold)" stroke="#4A340F" />
          
          {/* Peacock Fan Tail */}
          <path d="M -10,40 Q 35,-20 80,40 Z" fill="url(#peacockFeather)" stroke="#C59333" strokeWidth="1" opacity="0.85" />
          
          {/* Peacock Body */}
          <ellipse cx="35" cy="50" rx="18" ry="24" fill="url(#peacockGold)" stroke="#4A340F" />
          
          {/* Articulated Neck & Beak (Discharges Water) */}
          <g transform={`translate(30, 30) rotate(${peacockBeakAngle})`}>
            <path d="M 0,0 Q 15,-15 25,-5 Q 15,5 0,0 Z" fill="url(#peacockGold)" />
            {isPouring && (
              <line x1="25" y1="-2" x2="35" y2="45" stroke="#7FE0DB" strokeWidth="2" strokeDasharray="3 2" className="animate-pulse" />
            )}
          </g>
        </g>

        {/* Automated Servant Figurine Offering Soap & Towel */}
        <g transform={`translate(${230 - servantX}, 80)`}>
          {/* Robe */}
          <path d="M 15,30 L 28,80 L 2,80 Z" fill="#9E2A2B" stroke="#4A1010" />
          {/* Head & Turban */}
          <circle cx="15" cy="18" r="8" fill="#FFF2BD" />
          <ellipse cx="15" cy="12" rx="9" ry="5" fill="#FAF6ED" />
          {/* Outstretched Arms holding Towel / Soap */}
          <line x1="12" y1="35" x2="-8" y2="42" stroke="#FFF" strokeWidth="2.5" />
          <rect x="-18" y="38" width="12" height="10" fill="#FAF6ED" stroke="#C59333" rx="1" />
          <text x="-25" y="60" fill="#FAF6ED" fontSize="7">Soap / Towel</text>
        </g>

        {/* Status Callout */}
        <text x="15" y="25" fill="#E4B24B" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="bold">
          Phased Washing Cycle: {isPouring ? '1. Water Pouring from Beak' : '2. Servant Advances with Soap'}
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Hydrostatic Washing Automaton
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            The Peacock Hand-Washing Basin (1206 CE)
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
        Internal float reservoir releases washing water through the peacock's beak, then triggers the servant figurine to roll forward with soap and towel.
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
                  Ablution Automata • Hydraulic Balance
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Peacock Washing Basin (1206 CE)
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
                    Staged Sequence Ablution Mechanics
                  </h4>
                  <p className="text-[#3A2C1E]">
                    When the guest pulls a bronze plug from the peacock's tail, water flows steadily out of its beak into the basin. As waste water accumulates in the lower basin sump, its weight causes an internal counterbalanced float to sink. The descending float pulls a concealed cord that opens a side doorway and propels an automated servant figurine forward to offer a bar of soap, followed by a second figurine presenting a clean drying towel.
                  </p>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Court Ritual Innovation: </span>
                  Al-Jazari integrated formal Islamic royal hospitality customs directly into hydraulic mechanical automation.
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
