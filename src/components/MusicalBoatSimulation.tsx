import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Music, Sparkles, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface MusicalBoatSimulationProps {
  className?: string;
}

export const MusicalBoatSimulation: React.FC<MusicalBoatSimulationProps> = ({ className = '' }) => {
  const [time, setTime] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const animate = (t: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (t - lastTimeRef.current) / 1000;
        setTime((prev) => (prev + delta * 2.5) % (Math.PI * 4));
      }
      lastTimeRef.current = t;
      requestRef.current = requestAnimationFrame(animate);
    };
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const drumAngle = Math.sin(time * 3) * 18;
  const cymbalStrike = Math.abs(Math.sin(time * 1.5)) > 0.85;
  const fluteBreathe = Math.sin(time * 2);

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="boatGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C4" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="boatWater" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E5C57" />
            <stop offset="100%" stopColor="#3B8B85" />
          </linearGradient>
        </defs>

        <rect width="360" height="210" fill="#0C1716" rx="6" />

        {/* River Water Surface */}
        <rect x="0" y="160" width="360" height="50" fill="url(#boatWater)" opacity="0.8" />
        <path d="M 0,165 Q 45,160 90,165 T 180,165 T 270,165 T 360,165" fill="none" stroke="#7FE0DB" strokeWidth="1.2" opacity="0.4" />

        {/* Royal Barge Hull */}
        <path
          d="M 35,145 C 50,185 310,185 325,145 C 300,160 60,160 35,145 Z"
          fill="url(#boatGold)"
          stroke="#4A340F"
          strokeWidth="1.5"
        />

        {/* Central Concealed Siphon Waterwheel & Camshaft Tank */}
        <g transform="translate(140, 115)">
          <rect x="0" y="0" width="80" height="40" fill="#132422" stroke="#C59333" strokeWidth="1" rx="2" />
          <text x="8" y="24" fill="#E4B24B" fontSize="8" fontFamily="sans-serif">Cam Drive Siphon</text>
        </g>

        {/* Figurine 1: Robotic Harpist */}
        <g transform="translate(70, 95)">
          <path d="M 15,20 L 25,50 L 5,50 Z" fill="#9E2A2B" />
          <circle cx="15" cy="12" r="6" fill="#FFF2BD" />
          <path d="M 30,10 Q 40,30 30,50" stroke="#E4B24B" strokeWidth="2.5" fill="none" />
          <line x1="15" y1="22" x2={30 + Math.sin(time) * 3} y2={30} stroke="#FFF" strokeWidth="1.5" />
          <text x="2" y="60" fill="#FAF6ED" fontSize="8">Harpist</text>
        </g>

        {/* Figurine 2: Robotic Flutist (Air Compression Siphon) */}
        <g transform="translate(135, 80)">
          <path d="M 15,30 L 25,65 L 5,65 Z" fill="#1C5A57" />
          <circle cx="15" cy="20" r="6" fill="#FFF2BD" />
          <line x1="15" y1="24" x2="35" y2="18" stroke="#E4B24B" strokeWidth="2" />
          {fluteBreathe > 0 && (
            <path d="M 36,17 Q 45,10 50,14" fill="none" stroke="#7FE0DB" strokeWidth="1.5" className="animate-pulse" />
          )}
          <text x="2" y="75" fill="#FAF6ED" fontSize="8">Flutist</text>
        </g>

        {/* Figurine 3: Robotic Drummer with Cam-Tipped Mallets */}
        <g transform="translate(205, 85)">
          <path d="M 15,25 L 25,60 L 5,60 Z" fill="#9E2A2B" />
          <circle cx="15" cy="16" r="6" fill="#FFF2BD" />
          {/* Drum Mallet Arm pivoting */}
          <g transform={`translate(15, 26) rotate(${drumAngle})`}>
            <line x1="0" y1="0" x2="16" y2="8" stroke="#FFF" strokeWidth="1.8" />
            <circle cx="16" cy="8" r="2.5" fill="#C59333" />
          </g>
          {/* Drum */}
          <ellipse cx="32" cy="42" rx="10" ry="5" fill="#E4B24B" stroke="#4A340F" />
          <text x="2" y="70" fill="#FAF6ED" fontSize="8">Drummer</text>
        </g>

        {/* Figurine 4: Robotic Cymbal Player */}
        <g transform="translate(270, 95)">
          <path d="M 15,20 L 25,50 L 5,50 Z" fill="#1C5A57" />
          <circle cx="15" cy="12" r="6" fill="#FFF2BD" />
          <circle cx="28" cy="26" r="5" fill="#E4B24B" stroke="#6E4A14" />
          {cymbalStrike && (
            <circle cx="28" cy="26" r="9" fill="none" stroke="#FFF" strokeWidth="1.2" className="animate-ping" />
          )}
          <text x="2" y="60" fill="#FAF6ED" fontSize="8">Cymbal</text>
        </g>

        {/* Status */}
        <text x="15" y="25" fill="#E4B24B" fontSize="10" fontFamily="'Cinzel', serif" fontWeight="bold">
          Programmable Hydraulic Flotilla (1206 CE)
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Automaton Kinematics
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            Programmable Musical Flotilla (1206 CE)
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
        Internal water siphon rotates a pegged camshaft, actuating articulated musician figurines to perform programmed rhythms.
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
                  Robotic Entertainment • Programmable Automata
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Musical Flotilla (1206 CE)
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
                    <Music className="w-3.5 h-3.5 text-[#C59333]" />
                    Cam-Based Stored Programmable Execution
                  </h4>
                  <p className="text-[#3A2C1E]">
                    A concealed water tank in the boat drains periodically through a tipping siphon onto a scoop wheel. As the axle turns, rotating cam pegs strike articulated levers connected to the arms of four life-sized musician figures. By rearranging the cam pegs on the drum, different musical patterns and rhythm cadences could be programmed.
                  </p>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Robotics Precedent: </span>
                  This is widely cited by robotics historians as the earliest programmable musical automaton and the forerunner of the punched card and music box cylinders.
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
