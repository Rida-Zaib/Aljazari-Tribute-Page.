import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Sparkles, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface WaterBalanceSimulationProps {
  className?: string;
}

export const WaterBalanceSimulation: React.FC<WaterBalanceSimulationProps> = ({ className = '' }) => {
  const [phase, setPhase] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (t: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (t - lastTimeRef.current) / 1000;
        setPhase((prev) => (prev + delta / 5) % 1);
      }
      lastTimeRef.current = t;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const waterHeight = 20 + Math.sin(phase * Math.PI * 2) * 15;
  const siphonActive = Math.sin(phase * Math.PI * 2) > 0.4;
  const pointerAngle = Math.sin(phase * Math.PI * 2) * 35;

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="balanceGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C4" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="balanceWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#7FE0DB" />
            <stop offset="100%" stopColor="#1C5A57" />
          </linearGradient>
        </defs>

        <rect width="360" height="210" fill="#0C1716" rx="6" />

        {/* Main Reservoir Vessel */}
        <path d="M 100,50 L 260,50 L 240,175 L 120,175 Z" fill="#152B28" stroke="#C59333" strokeWidth="1.5" />

        {/* Dynamic Water Level */}
        <path
          d={`M ${100 + (35 - waterHeight) * 0.15},${160 - waterHeight} L ${260 - (35 - waterHeight) * 0.15},${160 - waterHeight} L 240,175 L 120,175 Z`}
          fill="url(#balanceWater)"
          opacity="0.85"
        />

        {/* Submerged Float with Balance Cord */}
        <g transform={`translate(180, ${150 - waterHeight})`}>
          <ellipse cx="0" cy="0" rx="28" ry="10" fill="url(#balanceGold)" stroke="#4A340F" strokeWidth="1" />
          <line x1="0" y1="0" x2="0" y2="-60" stroke="#FFF" strokeWidth="1.2" strokeDasharray="3 2" />
        </g>

        {/* Inverted U-Tube Siphon Tube */}
        <path
          d="M 140,165 L 140,80 Q 140,65 155,65 L 165,65 Q 180,65 180,80 L 180,185 L 195,185"
          fill="none"
          stroke="#C59333"
          strokeWidth="3.5"
        />
        {siphonActive && (
          <path
            d="M 140,165 L 140,80 Q 140,65 155,65 L 165,65 Q 180,65 180,185 L 195,185"
            fill="none"
            stroke="#7FE0DB"
            strokeWidth="1.8"
            className="animate-pulse"
          />
        )}

        {/* Graduated Scribe Balance Dial */}
        <g transform="translate(180, 42)">
          <circle r="22" fill="#0C1716" stroke="#C59333" strokeWidth="1" />
          <g transform={`rotate(${pointerAngle})`}>
            <line x1="0" y1="0" x2="0" y2="-18" stroke="#9E2A2B" strokeWidth="2" />
            <circle cx="0" cy="-18" r="2" fill="#E4B24B" />
          </g>
          <circle r="3" fill="#C59333" />
        </g>

        {/* Outflow Sump */}
        <rect x="185" y="180" width="55" height="15" fill="#1E5C57" stroke="#C59333" strokeWidth="1" rx="2" />
        {siphonActive && (
          <text x="250" y="192" fill="#7FE0DB" fontSize="8" className="animate-pulse">Discharging</text>
        )}

        {/* Status Callout */}
        <text x="15" y="24" fill="#E4B24B" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="bold">
          Precision Siphon Balance • {siphonActive ? 'Hydrostatic Discharge Phase' : 'Equilibrium Filling Phase'}
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Hydrostatic Measurement
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            Precision Water Balance & Siphon (1206 CE)
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
        Submerged bronze float operates a calibrated dial, triggering a periodic self-priming siphon to discharge precise units of fluid.
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
                  Precision Hydrodynamics • Self-Priming Siphons
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Water Balance & Discharge Siphon
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
                    Closed-Loop Fluid Equilibrium & Metering
                  </h4>
                  <p className="text-[#3A2C1E]">
                    This ingenious apparatus uses an inverted U-tube siphon connected to a submerged balance float. As inflow fills the chamber to the exact crest of the bend, atmospheric pressure and hydrostatic head prime the siphon, emptying the chamber into the measuring bucket in one rapid pulse. The float descends simultaneously, turning a pointer along an ivory scale to record cumulative volume.
                  </p>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Historical Significance: </span>
                  Al-Jazari established the foundational principles of continuous fluid metering and automatic batch dispensing.
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
