import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Cog, Waves, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface SegmentalGearSimulationProps {
  className?: string;
}

export const SegmentalGearSimulation: React.FC<SegmentalGearSimulationProps> = ({ className = '' }) => {
  const [angle, setAngle] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Auto-play loop
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setAngle((prev) => (prev + delta * 2.0) % (Math.PI * 2));
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Segmental gear kinematics:
  // Teeth exist only between angle 0 and PI/2 (one quadrant)
  // While meshed, vertical rack lifts bucket. While disengaged (PI/2 to 2PI), bucket descends under gravity.
  const normAngle = ((angle % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2);
  const isEngaged = normAngle < Math.PI * 0.75;
  const liftProgress = isEngaged 
    ? normAngle / (Math.PI * 0.75) 
    : Math.max(0, 1 - (normAngle - Math.PI * 0.75) / (Math.PI * 0.4));
  const bucketY = 165 - liftProgress * 70;

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="segGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C2" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1B4D49" />
            <stop offset="100%" stopColor="#307A74" />
          </linearGradient>
        </defs>

        {/* Background & River Stream */}
        <rect x="0" y="0" width="360" height="210" fill="#0C1716" rx="6" />
        <rect x="0" y="170" width="360" height="40" fill="url(#riverGrad)" opacity="0.75" />
        
        {/* River current wave ripples */}
        <path d="M 0,185 Q 40,180 80,185 T 160,185 T 240,185 T 320,185 T 360,185" fill="none" stroke="#7FE0DB" strokeWidth="1.2" opacity="0.4" />
        <path d="M 0,195 Q 45,190 90,195 T 180,195 T 270,195 T 360,195" fill="none" stroke="#7FE0DB" strokeWidth="0.8" opacity="0.3" />

        {/* Center Waterwheel & Segmental Gear */}
        <g transform="translate(130, 105)">
          {/* Outer Waterwheel Spokes & Paddles */}
          <g transform={`rotate(${angle * (180 / Math.PI)})`}>
            <circle r="65" fill="none" stroke="#C59333" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
            {Array.from({ length: 8 }).map((_, i) => (
              <g key={i} transform={`rotate(${i * 45})`}>
                <line x1="0" y1="0" x2="0" y2="-65" stroke="#C59333" strokeWidth="1.5" />
                {/* Spoon Paddle */}
                <path d="M -8,-65 Q 0,-76 8,-65 Z" fill="url(#segGold)" stroke="#4A340F" strokeWidth="0.8" />
              </g>
            ))}

            {/* Segmental Gear Teeth (Quadrant only ~90 deg) */}
            <path
              d="M 0,0 L 0,-38 A 38,38 0 0,1 38,0 Z"
              fill="rgba(197, 147, 51, 0.3)"
              stroke="#C59333"
              strokeWidth="1.5"
            />
            {Array.from({ length: 5 }).map((_, i) => (
              <line
                key={`tooth-${i}`}
                x1={38 * Math.cos((i * Math.PI) / 8)}
                y1={-38 * Math.sin((i * Math.PI) / 8)}
                x2={46 * Math.cos((i * Math.PI) / 8)}
                y2={-46 * Math.sin((i * Math.PI) / 8)}
                stroke="#E4B24B"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
            ))}
          </g>

          {/* Central Axle Boss */}
          <circle r="10" fill="url(#segGold)" stroke="#3E2704" strokeWidth="1.2" />
        </g>

        {/* Vertical Lifting Rack & Water Scoop */}
        <g transform="translate(235, 0)">
          {/* Guide Rail */}
          <line x1="0" y1="30" x2="0" y2="185" stroke="#C59333" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          
          {/* Vertical Rack */}
          <line x1="0" y1={bucketY - 20} x2="0" y2={bucketY + 30} stroke="url(#segGold)" strokeWidth="4" />
          
          {/* Rack Teeth */}
          {Array.from({ length: 5 }).map((_, i) => (
            <line
              key={i}
              x1="-8"
              y1={bucketY - 15 + i * 8}
              x2="0"
              y2={bucketY - 15 + i * 8}
              stroke="#E4B24B"
              strokeWidth="2.5"
            />
          ))}

          {/* Water Scoop Bucket */}
          <g transform={`translate(0, ${bucketY})`}>
            <path
              d="M -16,0 Q -18,22 0,22 Q 18,22 16,0 Z"
              fill="url(#segGold)"
              stroke="#4A340F"
              strokeWidth="1.2"
            />
            {/* Water Inside Bucket */}
            {liftProgress > 0.1 && (
              <ellipse cx="0" cy="4" rx="12" ry="4" fill="#5BB8B3" opacity="0.85" />
            )}
          </g>

          {/* Top Discharge Trough */}
          <path d="M 0,85 L 60,95 L 60,105 L 0,95 Z" fill="#204A46" stroke="#C59333" strokeWidth="1" />
          {liftProgress > 0.85 && (
            <path d="M 12,88 Q 30,100 45,115" fill="none" stroke="#7FE0DB" strokeWidth="2.5" className="animate-pulse" />
          )}
        </g>

        {/* Status Callout */}
        <text x="15" y="25" fill="#E4B24B" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="bold">
          Phase: {isEngaged ? 'Gear Meshed (Lifting)' : 'Gravity Reset (Filling)'}
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Intermittent Motion Kinematics
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            Segmental Gear Waterwheel (1206 CE)
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
        Quadrant-toothed gear converts steady river current into intermittent lifting cycles.
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
                  Intermittent Motion • Mechanical Simulation
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Segmental Gear Waterwheel (1206 CE)
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
                    <Cog className="w-3.5 h-3.5 text-[#C59333]" />
                    The Invention of Segmental Gearing
                  </h4>
                  <p className="text-[#3A2C1E]">
                    Al-Jazari pioneered the segmental (quadrant) gear—a gearwheel with teeth over only a portion of its rim. While the teeth are engaged, rotational power drives the vertical rack upward, hoisting water to an elevated discharge channel. Once the smooth section arrives, the rack is automatically released, allowing gravity to return the scoop to the river without requiring any clutches or disengaging levers.
                  </p>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Modern Application: </span>
                  This concept of intermittent motion gearing later formed the foundation of escapements in mechanical clocks, automated textile looms, and industrial indexers.
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
