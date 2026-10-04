import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Cog, Zap, CheckCircle2 } from 'lucide-react';
import { createPortal } from 'react-dom';

interface CrankSimulationProps {
  className?: string;
}

export const CrankSimulation: React.FC<CrankSimulationProps> = ({ className = '' }) => {
  const [angle, setAngle] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Exact Slider-Crank Kinematic Parameters:
  // r = crank radius, l = connecting rod length
  const crankCenterX = 100;
  const crankCenterY = 110;
  const crankRadius = 38; // r
  const rodLength = 105; // l
  const cylinderY = 110;
  const cylinderLeft = 215;
  const cylinderWidth = 110;
  const cylinderHeight = 44;
  const pistonWidth = 26;
  const pistonHeight = 32;

  // Exact math:
  const crankPinX = crankCenterX + crankRadius * Math.cos(angle);
  const crankPinY = crankCenterY + crankRadius * Math.sin(angle);
  const dy = cylinderY - crankPinY;
  const dx = Math.sqrt(Math.max(0, rodLength * rodLength - dy * dy));
  const pistonPinX = crankPinX + dx;
  const pistonLeft = pistonPinX - 6;
  const isSuction = Math.sin(angle) < 0;

  // Continuous autonomous 60fps animation loop (NO pause or speed controls)
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setAngle((prev) => (prev + delta * 2.2) % (Math.PI * 2));
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 360 210"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[260px]' : 'max-h-[170px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="crankBrass" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF2BF" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#7A5312" />
          </linearGradient>

          <linearGradient id="crankCylinder" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#2A423F" />
            <stop offset="50%" stopColor="#182D2B" />
            <stop offset="100%" stopColor="#0E1E1C" />
          </linearGradient>

          <linearGradient id="crankWater" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5BB8B3" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#1E6560" stopOpacity="0.9" />
          </linearGradient>
        </defs>

        {/* Blueprint background & axis lines */}
        <rect x="0" y="0" width="360" height="210" fill="#0C1716" rx="6" />
        <line x1="10" y1="110" x2="350" y2="110" stroke="#C59333" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.25" />
        <line x1="100" y1="10" x2="100" y2="200" stroke="#C59333" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.2" />

        {/* Intake & Delivery Conduits */}
        <path d="M 300,110 L 300,190" fill="none" stroke="#254B47" strokeWidth="14" strokeLinecap="round" />
        <path d="M 300,110 L 300,30" fill="none" stroke="#254B47" strokeWidth="14" strokeLinecap="round" />

        {/* Flow indicator */}
        {isSuction ? (
          <g>
            <path d="M 300,180 L 300,145" stroke="#7FE0DB" strokeWidth="2" />
            <text x="312" y="170" fill="#7FE0DB" fontSize="8" fontFamily="sans-serif">Suction IN</text>
          </g>
        ) : (
          <g>
            <path d="M 300,80 L 300,45" stroke="#E4B24B" strokeWidth="2" />
            <text x="312" y="65" fill="#E4B24B" fontSize="8" fontFamily="sans-serif">Discharge OUT</text>
          </g>
        )}

        {/* Cylinder Housing */}
        <rect
          x={cylinderLeft}
          y={cylinderY - cylinderHeight / 2}
          width={cylinderWidth}
          height={cylinderHeight}
          rx="3"
          fill="url(#crankCylinder)"
          stroke="#C59333"
          strokeWidth="1.2"
        />

        {/* Liquid displacement chamber */}
        <rect
          x={pistonLeft + pistonWidth}
          y={cylinderY - cylinderHeight / 2 + 3}
          width={Math.max(0, (cylinderLeft + cylinderWidth - 5) - (pistonLeft + pistonWidth))}
          height={cylinderHeight - 6}
          fill="url(#crankWater)"
        />

        {/* Clack Non-Return Valves */}
        <circle cx="300" cy="130" r="5" fill="#142624" stroke="#C59333" strokeWidth="0.8" />
        <line x1="300" y1="130" x2={isSuction ? 295 : 300} y2={isSuction ? 124 : 130} stroke="#E4B24B" strokeWidth="2" />

        <circle cx="300" cy="90" r="5" fill="#142624" stroke="#C59333" strokeWidth="0.8" />
        <line x1="300" y1="90" x2={!isSuction ? 295 : 300} y2={!isSuction ? 84 : 90} stroke="#E4B24B" strokeWidth="2" />

        {/* Sliding Piston */}
        <rect
          x={pistonLeft}
          y={cylinderY - pistonHeight / 2}
          width={pistonWidth}
          height={pistonHeight}
          rx="2"
          fill="url(#crankBrass)"
          stroke="#664614"
          strokeWidth="1.2"
        />
        <line x1={pistonLeft + 8} y1={cylinderY - pistonHeight / 2} x2={pistonLeft + 8} y2={cylinderY + pistonHeight / 2} stroke="#3D2908" strokeWidth="1" />
        <line x1={pistonLeft + 18} y1={cylinderY - pistonHeight / 2} x2={pistonLeft + 18} y2={cylinderY + pistonHeight / 2} stroke="#3D2908" strokeWidth="1" />
        <circle cx={pistonPinX} cy={cylinderY} r="3.5" fill="#FFFFFF" stroke="#8C621C" strokeWidth="1" />

        {/* Articulated Connecting Rod */}
        <line
          x1={crankPinX}
          y1={crankPinY}
          x2={pistonPinX}
          y2={cylinderY}
          stroke="url(#crankBrass)"
          strokeWidth="6"
          strokeLinecap="round"
        />
        <line
          x1={crankPinX}
          y1={crankPinY}
          x2={pistonPinX}
          y2={cylinderY}
          stroke="#4D350E"
          strokeWidth="1.2"
        />

        {/* Rotating Crank Wheel */}
        <circle cx={crankCenterX} cy={crankCenterY} r={crankRadius} fill="none" stroke="#C59333" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.4" />
        <circle cx={crankCenterX} cy={crankCenterY} r={crankRadius + 6} fill="rgba(21, 46, 43, 0.7)" stroke="#C59333" strokeWidth="1.2" />

        {/* Crank Spokes */}
        {Array.from({ length: 6 }).map((_, i) => {
          const spAngle = (i * Math.PI) / 3 + angle;
          return (
            <line
              key={i}
              x1={crankCenterX}
              y1={crankCenterY}
              x2={crankCenterX + (crankRadius + 4) * Math.cos(spAngle)}
              y2={crankCenterY + (crankRadius + 4) * Math.sin(spAngle)}
              stroke="#C59333"
              strokeWidth="0.8"
              opacity="0.6"
            />
          );
        })}

        {/* Center Axle & Eccentric Pin */}
        <circle cx={crankCenterX} cy={crankCenterY} r="7" fill="url(#crankBrass)" stroke="#3E2A08" strokeWidth="1" />
        <circle cx={crankPinX} cy={crankPinY} r="5" fill="#FFF2BD" stroke="#7A5618" strokeWidth="1.5" />
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      {/* Title & Expand Button */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Kinematic Slider-Crank Model
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            Rotary-to-Reciprocating Conversion (1206 CE)
          </h4>
        </div>

        <button
          onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
          className="p-1.5 rounded-lg bg-[#C59333]/20 hover:bg-[#C59333]/35 border border-[#C59333]/40 text-[#E4B24B] transition-colors flex items-center gap-1 text-[10px] font-display font-semibold"
          title="Expand animated diagram and full explanation"
          aria-label="Expand diagram"
        >
          <Maximize2 className="w-3 h-3" />
          <span>Expand</span>
        </button>
      </div>

      {/* Embedded Auto-Looping Animation Canvas */}
      <div className="bg-[#0A1413] rounded-lg border border-[#C59333]/20 p-1.5 overflow-hidden">
        {renderSvg(false)}
      </div>

      <div className="mt-2 text-[10px] font-body text-[#FAF6ED]/80 leading-snug">
        Continuous conversion of rotary torque into straight-line suction/discharge strokes.
      </div>

      {/* FULL-VIEW OVERLAY MODAL */}
      {isExpanded && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-2xl max-h-[90vh] bg-[#F4EBD9] border-2 border-[#C59333] rounded-2xl shadow-2xl overflow-hidden flex flex-col manuscript-scroll text-[#2B2118]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-[#143E3B] text-[#FAF6ED] border-b-2 border-[#C59333]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E4B24B] font-display font-semibold">
                  Detailed Kinematic Model • Mathematical Simulation
                </span>
                <h3 className="text-base sm:text-lg font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Crank & Connecting Rod (1206 CE)
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

            {/* Modal Body: Enlarged Animation + Full Explanation Below */}
            <div className="p-5 overflow-y-auto flex flex-col gap-4">
              <div className="bg-[#0A1413] rounded-xl border-2 border-[#C59333]/60 p-3 shadow-inner flex items-center justify-center">
                {renderSvg(true)}
              </div>

              {/* Explanatory Narrative */}
              <div className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed font-body">
                <div className="bg-[#FAF6ED] p-3 rounded-xl border border-[#C59333]/30">
                  <h4 className="font-display font-bold text-xs uppercase text-[#9E2A2B] tracking-wider mb-1 flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-[#E4B24B]" />
                    Exact Kinematic Operation & Math
                  </h4>
                  <p className="text-[#3A2C1E]">
                    The position of the piston wrist pin follows the exact geometric equation: <code className="font-mono text-xs bg-[#EAE0CA] px-1 py-0.5 rounded">x = r cos(θ) + √(l² - r² sin²(θ))</code>. As the waterwheel or animal drive turns the crank circle through 360 degrees, the rigid connecting rod transforms angular thrust into pure horizontal reciprocating stroke displacement.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div className="bg-[#FAF6ED] p-2.5 rounded-lg border border-[#C59333]/30">
                    <div className="font-display font-bold text-[11px] uppercase text-[#143E3B] mb-1">
                      Suction Stroke (Phase 180°–360°)
                    </div>
                    <p className="text-[11px] text-[#4A3B2E]">
                      The piston retreats, generating negative atmospheric pressure (vacuum). The suction flap valve opens to lift water from the sump.
                    </p>
                  </div>
                  <div className="bg-[#FAF6ED] p-2.5 rounded-lg border border-[#C59333]/30">
                    <div className="font-display font-bold text-[11px] uppercase text-[#143E3B] mb-1">
                      Discharge Stroke (Phase 0°–180°)
                    </div>
                    <p className="text-[11px] text-[#4A3B2E]">
                      The piston advances, pressurizing the chamber. The intake valve seals shut under backpressure while the delivery valve opens into the pipe.
                    </p>
                  </div>
                </div>

                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <span className="font-bold text-[#143E3B]">Historical Significance: </span>
                  This direct mechanical linkage is the ancestor of Thomas Newcomen’s and James Watt’s steam engines, Nikolaus Otto’s internal combustion engine, and automotive drivetrains.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
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
