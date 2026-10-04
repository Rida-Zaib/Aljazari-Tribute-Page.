import React, { useState, useEffect, useRef } from 'react';
import { Maximize2, X, Clock, Waves, CheckCircle2, ShieldCheck } from 'lucide-react';
import { createPortal } from 'react-dom';

interface ElephantClockSimulationProps {
  className?: string;
}

export const ElephantClockSimulation: React.FC<ElephantClockSimulationProps> = ({ className = '' }) => {
  const [phase, setPhase] = useState(0); // 0 to 1 cycle progress
  const [isExpanded, setIsExpanded] = useState(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);

  // Auto-play continuous loop (Cycle duration ~12 seconds)
  useEffect(() => {
    const cycleDuration = 12; // 12 seconds per simulated 30-min cycle
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setPhase((prev) => (prev + delta / cycleDuration) % 1);
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Kinematic states based on phase (0 to 1):
  // 0.0 - 0.75: Bowl slowly sinks into water, scribe rotates slowly (0 to 180 deg)
  // 0.75 - 0.85: Bowl fully submerged, triggers ball release from falcon into dragon
  // 0.85 - 0.95: Dragon tilts down under weight of ball, drops ball into vase, strikes cymbal, resets bowl
  // 0.95 - 1.0: Dragon returns upright, bowl resets to top of reservoir
  const isSinking = phase < 0.75;
  const isBallDrop = phase >= 0.75 && phase < 0.85;
  const isDragonTilt = phase >= 0.85 && phase < 0.95;

  const sinkDepth = isSinking ? (phase / 0.75) * 38 : (isDragonTilt ? 38 - ((phase - 0.85) / 0.1) * 38 : 0);
  const scribeAngle = isSinking ? (phase / 0.75) * 180 : (isDragonTilt ? 180 - ((phase - 0.85) / 0.1) * 180 : 0);
  const dragonAngle = isDragonTilt ? Math.sin(((phase - 0.85) / 0.1) * Math.PI) * 42 : 0;
  const ballY = isBallDrop 
    ? 50 + ((phase - 0.75) / 0.1) * 45 
    : (isDragonTilt ? 95 + ((phase - 0.85) / 0.1) * 60 : 50);

  const renderSvg = (isLarge = false) => {
    return (
      <svg
        viewBox="0 0 380 230"
        className={`w-full h-auto select-none ${isLarge ? 'max-h-[280px]' : 'max-h-[175px]'}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="eleGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF4C4" />
            <stop offset="50%" stopColor="#C59333" />
            <stop offset="100%" stopColor="#784E0F" />
          </linearGradient>

          <linearGradient id="eleWater" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#5BB8B3" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1B5551" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="dragonBronze" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E4B24B" />
            <stop offset="60%" stopColor="#962A2A" />
            <stop offset="100%" stopColor="#4A1010" />
          </linearGradient>
        </defs>

        {/* Blueprint background */}
        <rect x="0" y="0" width="380" height="230" fill="#0C1716" rx="6" />

        {/* LEFT SECTION: Concealed Elephant Belly Water Clepsydra */}
        <g transform="translate(25, 30)">
          <rect x="0" y="30" width="130" height="150" rx="6" fill="#142624" stroke="#C59333" strokeWidth="1.2" />
          <text x="12" y="22" fill="#E4B24B" fontSize="9" fontFamily="'Cinzel', serif" fontWeight="bold">
            Clepsydra Reservoir
          </text>

          {/* Water Fill in Reservoir */}
          <rect x="4" y="60" width="122" height="116" fill="url(#eleWater)" rx="3" />
          <line x1="4" y1="60" x2="126" y2="60" stroke="#7FE0DB" strokeWidth="1.5" opacity="0.6" strokeDasharray="4 2" />

          {/* Sinking Perforated Floating Bowl */}
          <g transform={`translate(25, ${65 + sinkDepth})`}>
            {/* Bowl Body */}
            <path
              d="M 0,0 Q 40,-8 80,0 Q 75,32 40,32 Q 5,32 0,0 Z"
              fill="url(#eleGold)"
              stroke="#4A340F"
              strokeWidth="1.2"
            />
            {/* Precision Orifice at Base */}
            <circle cx="40" cy="30" r="2" fill="#7FE0DB" />
            {/* Tiny Inflow Bubbles */}
            {isSinking && (
              <g className="animate-pulse">
                <circle cx="40" cy="22" r="1.5" fill="#FFF" opacity="0.8" />
                <circle cx="38" cy="14" r="1.2" fill="#FFF" opacity="0.6" />
              </g>
            )}
            <text x="15" y="16" fill="#2B2118" fontSize="8" fontFamily="sans-serif" fontWeight="bold">
              Float Bowl
            </text>
          </g>

          {/* Retrieval Pulley Cord */}
          <line x1="65" y1="20" x2="65" y2={65 + sinkDepth} stroke="#E4B24B" strokeWidth="1.5" strokeDasharray="2 2" />
          <circle cx="65" cy="20" r="5" fill="url(#eleGold)" stroke="#3E2704" strokeWidth="1" />
        </g>

        {/* MIDDLE SECTION: Tower Mechanism, Scribe & Falcon */}
        <g transform="translate(180, 20)">
          {/* Tower Framework */}
          <rect x="0" y="20" width="85" height="170" fill="#132422" stroke="#C59333" strokeWidth="1" rx="4" />
          <text x="12" y="14" fill="#E4B24B" fontSize="9" fontFamily="'Cinzel', serif" fontWeight="bold">
            Castle Tower
          </text>

          {/* Rotating Scribe Dial at Top of Tower */}
          <g transform="translate(42, 42)">
            <circle r="18" fill="rgba(197, 147, 51, 0.25)" stroke="#C59333" strokeWidth="1" />
            {/* Hour graduations */}
            {Array.from({ length: 6 }).map((_, i) => (
              <line
                key={i}
                x1={15 * Math.cos((i * Math.PI) / 3)}
                y1={15 * Math.sin((i * Math.PI) / 3)}
                x2={18 * Math.cos((i * Math.PI) / 3)}
                y2={18 * Math.sin((i * Math.PI) / 3)}
                stroke="#E4B24B"
                strokeWidth="1"
              />
            ))}
            {/* Rotating Scribe Pointer Hand */}
            <g transform={`rotate(${scribeAngle})`}>
              <line x1="0" y1="0" x2="0" y2="-15" stroke="#E4B24B" strokeWidth="2.5" strokeLinecap="round" />
              <polygon points="0,-18 -3,-13 3,-13" fill="#FFF2BF" />
            </g>
            <circle r="3" fill="#FFF4D0" />
          </g>
          <text x="14" y="68" fill="#FAF6ED" fontSize="8" fontFamily="sans-serif">Scribe Dial</text>

          {/* Falcon Head (Ball Dropper) */}
          <path d="M 55,80 Q 75,75 80,90 Q 70,95 55,90 Z" fill="url(#eleGold)" stroke="#3E2704" strokeWidth="1" />
          
          {/* Bronze Ball Dropping */}
          {(isBallDrop || isDragonTilt) && (
            <circle cx="78" cy={ballY} r="4.5" fill="#FFF2BD" stroke="#7A5618" strokeWidth="1.5" />
          )}

          {/* Internal Trip Lever */}
          <line x1="15" y1="120" x2="70" y2="120" stroke="#C59333" strokeWidth="2" />
          <circle cx="42" cy="120" r="3" fill="#FFF" />
        </g>

        {/* RIGHT SECTION: Pivoting Dragon & Cymbal Strike */}
        <g transform="translate(285, 45)">
          <text x="5" y="-10" fill="#E4B24B" fontSize="9" fontFamily="'Cinzel', serif" fontWeight="bold">
            Dragon Automaton
          </text>

          {/* Pivoting Chinese Dragon Arm */}
          <g transform={`translate(25, 60) rotate(${dragonAngle})`}>
            {/* Dragon Head & Sinuous Body */}
            <path
              d="M -15,0 C -5,-25 35,-20 45,0 C 35,15 15,10 -15,0 Z"
              fill="url(#dragonBronze)"
              stroke="#C59333"
              strokeWidth="1.2"
            />
            {/* Dragon Mouth Open */}
            <path d="M 40,-5 L 52,0 L 40,5 Z" fill="#E4B24B" />
            {/* Central Pivot Fulcrum */}
            <circle cx="15" cy="0" r="4.5" fill="url(#eleGold)" stroke="#111" strokeWidth="1" />
          </g>

          {/* Bottom Bronze Vase & Cymbal Hammer */}
          <path d="M 45,140 L 75,140 L 68,165 L 52,165 Z" fill="url(#eleGold)" stroke="#3E2704" strokeWidth="1" />
          <text x="40" y="178" fill="#FAF6ED" fontSize="8" fontFamily="sans-serif">Vase / Cymbal</text>

          {/* Acoustic strike burst indicator */}
          {isDragonTilt && (
            <g className="animate-pulse">
              <circle cx="60" cy="140" r="14" fill="none" stroke="#E4B24B" strokeWidth="1.5" strokeDasharray="3 2" />
              <text x="32" y="132" fill="#E4B24B" fontSize="9" fontWeight="bold">CLANG!</text>
            </g>
          )}
        </g>

        {/* Live Cycle Timeline Bar at Bottom */}
        <rect x="25" y="210" width="330" height="6" fill="#142624" rx="3" stroke="#C59333" strokeWidth="0.5" />
        <rect x="25" y="210" width={330 * phase} height="6" fill="#E4B24B" rx="3" />
        <text x="25" y="204" fill="#FAF6ED" fontSize="9" fontFamily="sans-serif" opacity="0.8">
          30-Minute Cycle: {isSinking ? 'Float Descending (Timekeeping)' : (isBallDrop ? 'Ball Release' : 'Dragon Strike & Reset')}
        </text>
      </svg>
    );
  };

  return (
    <div className={`p-3.5 rounded-xl border border-[#C59333]/40 bg-[#12201E]/95 text-[#FAF6ED] shadow-md ${className}`}>
      {/* Title Header with Expand Button */}
      <div className="flex items-center justify-between gap-2 pb-2 mb-2 border-b border-[#C59333]/25">
        <div>
          <span className="text-[10px] uppercase font-display tracking-widest text-[#E4B24B] font-bold">
            Interactive Kinematic Model
          </span>
          <h4 className="text-xs font-display font-bold text-[#FAF6ED]">
            The Elephant Clock Clepsydra & Automata Cascade (1206 CE)
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

      {/* Auto-looping SVG Canvas */}
      <div className="bg-[#0A1413] rounded-lg border border-[#C59333]/20 p-1.5 overflow-hidden">
        {renderSvg(false)}
      </div>

      <div className="mt-2 text-[10px] font-body text-[#FAF6ED]/80 leading-snug">
        Submerged perforated clepsydra bowl sinks over 30 minutes, rotating the scribe pointer and triggering the falcon ball-drop & dragon counterpoise.
      </div>

      {/* FULL-SCREEN OVERLAY MODAL */}
      {isExpanded && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div 
            className="relative w-full max-w-3xl max-h-[92vh] bg-[#F4EBD9] border-2 border-[#C59333] rounded-2xl shadow-2xl overflow-hidden flex flex-col manuscript-scroll text-[#2B2118]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 bg-[#143E3B] text-[#FAF6ED] border-b-2 border-[#C59333]">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#E4B24B] font-display font-semibold">
                  Horological Masterpiece • Complete Sub-System Anatomy
                </span>
                <h3 className="text-base sm:text-xl font-display font-bold text-[#FFF2BF]">
                  Al-Jazari's Elephant Clock Timing & Fluid-Level Control
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

            {/* Modal Body: Enlarged Animation at Top, Complete Breakdown Below */}
            <div className="p-6 overflow-y-auto flex flex-col gap-4">
              <div className="bg-[#0A1413] rounded-xl border-2 border-[#C59333]/60 p-3.5 shadow-inner flex items-center justify-center">
                {renderSvg(true)}
              </div>

              {/* Explanatory Narrative & Step-by-Step Mechanics */}
              <div className="flex flex-col gap-3 text-xs sm:text-sm leading-relaxed font-body">
                {/* 1. Fluidic Regulation */}
                <div className="bg-[#FAF6ED] p-3.5 rounded-xl border border-[#C59333]/40 shadow-sm">
                  <h4 className="font-display font-bold text-xs uppercase text-[#9E2A2B] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Waves className="w-4 h-4 text-[#1C5A57]" />
                    1. The Closed-Loop Perforated Sinking Bowl (Clepsydra)
                  </h4>
                  <p className="text-[#3A2C1E]">
                    Inside the hollow belly of the sculpted Indian elephant sits a closed water tank. A brass bowl with a precision calibrated hole drilled into its bottom floats on the surface. As water seeps slowly and steadily into the bowl over exactly thirty minutes, the bowl’s buoyancy decreases until it sinks to the bottom.
                  </p>
                </div>

                {/* 2. Pulley Line & Scribe Dial */}
                <div className="bg-[#FAF6ED] p-3.5 rounded-xl border border-[#C59333]/40 shadow-sm">
                  <h4 className="font-display font-bold text-xs uppercase text-[#143E3B] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-[#C59333]" />
                    2. Rotary Pointer Transmission (The Turbaned Scribe)
                  </h4>
                  <p className="text-[#3A2C1E]">
                    A fine cord tied to the floating bowl passes up into the castle tower around a grooved axle. As the bowl sinks, the cord unwinds, turning the figure of a turbaned Arabic scribe whose pen slowly rotates across a 30-minute graduated dial to display continuous elapsed time.
                  </p>
                </div>

                {/* 3. The Multi-Stage Automata Cascade */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-[#FAF6ED] p-3 rounded-lg border border-[#C59333]/30">
                    <div className="font-display font-bold text-xs text-[#9E2A2B] uppercase mb-1">
                      3. Falcon Ball-Release Escapement
                    </div>
                    <p className="text-xs text-[#4A3B2E]">
                      When the bowl sinks completely, it trips an internal release catch at the top of the tower. A bronze ball rolls out of the upper magazine through the beak of a carved falcon.
                    </p>
                  </div>
                  <div className="bg-[#FAF6ED] p-3 rounded-lg border border-[#C59333]/30">
                    <div className="font-display font-bold text-xs text-[#9E2A2B] uppercase mb-1">
                      4. Chinese Dragon Counterpoise & Reset
                    </div>
                    <p className="text-xs text-[#4A3B2E]">
                      The bronze ball drops into the open mouth of a Chinese dragon mounted on a central fulcrum. The weight forces the dragon to pivot downwards, depositing the ball into a vase where it triggers an elephant driver figurine to strike a bronze cymbal.
                    </p>
                  </div>
                </div>

                {/* 4. Automated Cycle Reset */}
                <div className="p-3 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 text-xs">
                  <strong className="text-[#143E3B]">Self-Resetting Feedback Loop: </strong>
                  As the dragon pivots downward, an attached retrieval line pulls the submerged water bowl out of the water, dumping its collected liquid back into the main tank. Counterweights return the dragon upright, and the bowl begins floating on the surface again for the next 30-minute cycle.
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3 bg-[#EAE0CA] border-t border-[#C59333]/40 flex justify-between items-center text-xs">
              <span className="text-[#5C4A38] font-serif italic">Kitāb fī ma'rifat al-ḥiyal al-handasiyya (1206 CE)</span>
              <button
                onClick={() => setIsExpanded(false)}
                className="px-4 py-1.5 bg-[#143E3B] hover:bg-[#1C5A57] text-[#FAF6ED] font-display font-bold rounded-lg transition-colors"
              >
                Close Full View
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  );
};
