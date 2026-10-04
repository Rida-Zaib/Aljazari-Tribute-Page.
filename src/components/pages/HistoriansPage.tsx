import React from 'react';
import { Quote, Sparkles, CheckCircle2, Compass, ShieldCheck } from 'lucide-react';

export const HistoriansPage: React.FC = () => {
  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-y-auto manuscript-scroll">
      {/* Header */}
      <div className="border-b-2 border-[#C59333]/40 pb-2 mb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Scholarly Commentary • Ārāʾ al-Mu’arrikhīn
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-display font-black text-[#133D3B] leading-tight">
            What Astonished Historians
          </h2>
        </div>
        <div className="text-right shrink-0">
          <span className="font-arabic text-sm sm:text-base text-[#9E2A2B] font-bold">
            دَهْشَةُ المُؤَرِّخِينْ
          </span>
          <div className="text-[9px] text-[#5C4A38] font-mono">Folio 5r</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-2.5 my-auto text-xs sm:text-sm">
        {/* Top Section: Scholar Quote + Technical Drawing Inset */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
          {/* Historical Technical Drawing Inset (Float Valve & Siphon Sump) */}
          <div className="sm:col-span-4 flex flex-col items-center gap-1 bg-[#EAE0CA] p-2 rounded-xl border border-[#C59333]/60 shadow-sm">
            <svg viewBox="0 0 160 120" className="w-full h-auto max-h-[100px]" xmlns="http://www.w3.org/2000/svg">
              <rect width="160" height="120" fill="#F4EBD9" rx="4" />
              {/* Hydrostatic Siphon & Conical Float Chamber Drawing */}
              <path d="M 30,20 L 130,20 L 120,95 L 40,95 Z" fill="none" stroke="#6E4A14" strokeWidth="1.8" />
              <line x1="80" y1="20" x2="80" y2="70" stroke="#9E2A2B" strokeWidth="2" strokeDasharray="3 2" />
              <ellipse cx="80" cy="70" rx="22" ry="12" fill="#D8A53B" stroke="#6E4A14" strokeWidth="1.5" />
              <path d="M 65,40 Q 80,30 95,40" stroke="#133D3B" strokeWidth="2" fill="none" />
              <path d="M 80,70 L 80,105 L 110,105" stroke="#9E2A2B" strokeWidth="2.5" fill="none" />
              <circle cx="80" cy="20" r="4" fill="#9E2A2B" />
              <text x="80" y="114" fill="#5C4A38" fontSize="7" fontFamily="'EB Garamond', serif" textAnchor="middle" fontStyle="italic">
                Conical Plug & Float Valve (1206)
              </text>
            </svg>
            <span className="text-[9px] text-[#5C4A38] font-serif italic text-center leading-tight">
              Ms. Ahmet III 3472 schematic: closed-loop float equilibrium
            </span>
          </div>

          {/* Quote Column */}
          <div className="sm:col-span-8 flex flex-col gap-2">
            <div className="p-2.5 bg-[#FAF6ED] rounded-xl border border-[#C59333]/40 shadow-sm relative">
              <Quote className="w-4 h-4 text-[#C59333]/30 absolute top-2 right-2 rotate-180 pointer-events-none" />
              <p className="font-body italic text-[#3A2C1E] text-[11px] sm:text-xs leading-relaxed">
                "It is impossible to overemphasize the importance of al-Jazari’s work. Until modern times there is no other document from any cultural area providing a comparable wealth of instructions for the design, manufacture, and assembly of machines."
              </p>
              <div className="mt-1 text-[10px] font-display font-bold text-[#9E2A2B]">
                — Dr. Donald R. Hill <span className="text-[#6B543D] font-normal italic">(Historian of Technology, 1974)</span>
              </div>
            </div>

            <div className="p-2 bg-[#FAF6ED] rounded-lg border border-[#C59333]/30">
              <p className="font-body italic text-[#3A2C1E] text-[10px] sm:text-[11px] leading-relaxed">
                "This treatise may be considered the climax of this line of Muslim technological achievement."
              </p>
              <div className="text-[9px] font-display font-bold text-[#133D3B]">
                — George Sarton <span className="text-[#6B543D] font-normal italic">(Founder of History of Science)</span>
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Core Breakthroughs Scholars Find Most Remarkable */}
        <div className="bg-[#FAF6ED] p-2.5 sm:p-3 rounded-xl border border-[#C59333]/50">
          <h4 className="font-display font-bold text-xs uppercase text-[#133D3B] tracking-wider mb-1.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-[#C59333]" />
            Four Revolutionary Mechanical Milestones
          </h4>

          <div className="space-y-1.5 font-body text-[11px] sm:text-xs text-[#3E3022]">
            <div className="flex items-start gap-2 bg-[#EAE0CA]/60 p-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1C5A57] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#133D3B]">Closed-Loop Feedback Control (600 Years Before Watt):</strong> Float-regulated balance valves maintaining constant fluid pressure.
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#EAE0CA]/60 p-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1C5A57] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#133D3B]">Programmable Cam Automation:</strong> Peg-studded rotating camshafts triggering programmed musical robotic sequences.
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#EAE0CA]/60 p-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1C5A57] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#133D3B]">Crankshaft & Connecting Rod:</strong> Transformation of rotary power into continuous reciprocating linear force.
              </div>
            </div>

            <div className="flex items-start gap-2 bg-[#EAE0CA]/60 p-1.5 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#1C5A57] shrink-0 mt-0.5" />
              <div>
                <strong className="text-[#133D3B]">Complete Empirical Technical Blueprints:</strong> Scaled color drawings allowing successful modern reconstructions.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Colophon */}
      <div className="border-t border-[#C59333]/30 pt-1.5 mt-2 flex items-center justify-between text-[10px] text-[#6B543D]">
        <span>Academic Studies & Technology History</span>
        <span className="font-display font-bold text-[#9E2A2B]">Al-Jazari's Scientific Legacy</span>
      </div>
    </div>
  );
};
