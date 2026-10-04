import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Layers, CheckCircle2, Zap } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CamshaftEngineSimulationProps {
  className?: string;
}

export const CamshaftEngineSimulation: React.FC<CamshaftEngineSimulationProps> = ({ className = '' }) => {
  const [camAngle, setCamAngle] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setCamAngle((prev) => (prev + delta * 2.4) % (Math.PI * 2));
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // 4 staggered cams offset by 90 deg (PI/2)
  const cams = [0, 1, 2, 3].map((i) => {
    const offset = i * (Math.PI / 2);
    const ang = camAngle + offset;
    const lift = Math.max(0, Math.sin(ang));
    const bucketY = 145 - lift * 42;
    return { id: i, lift, bucketY, ang };
  });

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="camGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2BF" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="troughGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E4F4B" />
            <stop offset="100%" stopColor="#2E706B" />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="360" height="210" fill="#0C1716" rx="6" />

        {/* Central Rotating Camshaft Line */}
        <line x1="30" y1="55" x2="330" y2="55" stroke="#C59333" strokeWidth="5" strokeLinecap="round" />
        
        {/* Cam lobes and four vertical bucket stations */}
        {cams.map((cam, idx) => {
          const x = 70 + idx * 72;
          const camR = 14;
          const lobeX = x + camR * Math.cos(cam.ang);
          const lobeY = 55 + camR * Math.sin(cam.ang);

          return (
            <g key={cam.id}>
              {/* Vertical Guide Wire */}
              <line x1={x} y1="55" x2={x} y2="185" stroke="#C59333" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.3" />

              {/* Cam Disc & Lobe */}
              <circle cx={x} cy="55" r="9" fill="rgba(197, 147, 51, 0.4)" stroke="#C59333" strokeWidth="1" />
              <line x1={x} y1="55" x2={lobeX} y2={lobeY} stroke="#E4B24B" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx={lobeX} cy={lobeY} r="3.5" fill="#FFF4D0" stroke="#7A5312" strokeWidth="1" />

              {/* Connecting Follower Rod */}
              <line x1={x} y1={lobeY} x2={x} y2={cam.bucketY} stroke="url(#camGold)" strokeWidth="2.5" />

              {/* Suspended Bucket */}
              <g transform={`translate(${x}, ${cam.bucketY})`}>
                <path d="M -12,0 L 12,0 L 9,18 L -9,18 Z" fill="url(#camGold)" stroke="#4A340F" strokeWidth="1" />
                {cam.lift > 0.1 && (
                  <rect x="-8" y="3" width="16" height="12" fill="#5BB8B3" opacity="0.8" rx="1" />
                )}
              </g>

              {/* Top Water Discharge Splash */}
              {cam.lift > 0.85 && (
                <path d={`M ${x},${cam.bucketY} Q ${x + 12},${cam.bucketY - 8} ${x + 20},${cam.bucketY + 5}`} fill="none" stroke="#7FE0DB" strokeWidth="2" className="animate-pulse" />
              )}
            </g>
          );
        })}

        {/* Common Discharge Trough */}
        <rect x="35" y="105" width="290" height="12" fill="url(#troughGrad)" rx="3" stroke="#C59333" strokeWidth="1" />
        <text x="45" y="114" fill="#E4B24B" fontSize="8" fontFamily="sans-serif">Common Continuous Discharge Aqueduct</text>

        {/* Bottom Sump */}
        <rect x="0" y="180" width="360" height="30" fill="#142B28" opacity="0.9" />
        <text x="15" y="25" fill="#E4B24B" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="bold">
          4-Phase Staggered Camshaft Sequence (90° Offsets)
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Multi-Phase Cam Timing
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            Four-Bucket Cam Engine (1206 CE)
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
        Four 90°-staggered cam lobes eliminate mechanical dead-time, providing continuous flow.
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
                  Multi-Phase Timing • Mechanical Simulation
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Four-Bucket Camshaft Engine (1206 CE)
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
                    <Layers className="w-3.5 h-3.5 text-[#C59333]" />
                    Staggered Cam Phasing for Continuous Power
                  </h4>
                  <p className="text-[#3A2C1E]">
                    By mounting four eccentric cam lobes on a single central driveshaft—each rotated exactly 90 degrees out of phase from its neighbor—Al-Jazari ensured that at any given moment during shaft rotation, one bucket is discharging into the elevated aqueduct while another is submerging to refill.
                  </p>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Historical Impact: </span>
                  This is the earliest documented multi-cylinder camshaft architecture, identical in operating principle to the camshaft valve timing in modern automobile engines.
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
