import React from 'react';
import { Quote, ExternalLink, RotateCcw, BookOpen, Library, CheckCircle2, Cog, Sparkles } from 'lucide-react';

interface LegacyPageProps {
  onCloseBook: () => void;
}

export const LegacyPage: React.FC<LegacyPageProps> = ({ onCloseBook }) => {
  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-4 sm:p-6 md:p-7 flex flex-col justify-between overflow-y-auto manuscript-scroll">
      {/* Header */}
      <div className="border-b-2 border-[#C59333]/40 pb-2 mb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Epilogue • Al-Khātimah
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-display font-black text-[#133D3B] leading-tight">
            Enduring Global Legacy
          </h2>
        </div>
        <div className="text-right shrink-0">
          <span className="font-arabic text-sm sm:text-base text-[#9E2A2B] font-bold">
            الأَثَرُ الخَالِد
          </span>
          <div className="text-[9px] text-[#5C4A38] font-mono">Folio 7v</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex flex-col gap-2.5 my-auto">
        {/* Top Grid: Historian Quote + Technical Drawing Schematic */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-center">
          {/* Quote Card */}
          <div className="sm:col-span-8 relative p-2.5 sm:p-3 bg-[#FAF6ED] rounded-xl border-2 border-[#C59333]/70 shadow-sm">
            <Quote className="absolute top-2 right-2 w-5 h-5 text-[#C59333]/20 rotate-180 pointer-events-none" />
            <blockquote className="font-body italic text-[11px] sm:text-xs text-[#2E2219] leading-relaxed mb-1">
              "Until modern times there is no other document from any cultural area providing a comparable wealth of instructions for machine design and assembly."
            </blockquote>
            <div className="flex items-center justify-between border-t border-[#C59333]/30 pt-1 text-[10px]">
              <span className="font-display font-bold text-[#9E2A2B]">
                — Dr. Donald R. Hill
              </span>
              <span className="text-[#6B543D] italic text-[9px]">
                Royal Translator (1974)
              </span>
            </div>
          </div>

          {/* Historical Technical Drawing Inset (Crank & Reciprocating Linkage) */}
          <div className="sm:col-span-4 flex flex-col items-center gap-1 bg-[#EAE0CA] p-2 rounded-xl border border-[#C59333]/60 shadow-sm">
            <svg viewBox="0 0 160 110" className="w-full h-auto max-h-[95px]" xmlns="http://www.w3.org/2000/svg">
              <rect width="160" height="110" fill="#F4EBD9" rx="4" />
              {/* Crankshaft & Twin Piston Cylinder Line Art */}
              <circle cx="45" cy="55" r="28" fill="none" stroke="#6E4A14" strokeWidth="1.5" strokeDasharray="3 2" />
              <line x1="45" y1="55" x2="65" y2="35" stroke="#9E2A2B" strokeWidth="2.5" />
              <circle cx="65" cy="35" r="3" fill="#E4B24B" stroke="#6E4A14" />
              <line x1="65" y1="35" x2="115" y2="55" stroke="#133D3B" strokeWidth="2.2" />
              <rect x="110" y="42" width="38" height="26" fill="#D8A53B" stroke="#6E4A14" strokeWidth="1.2" rx="2" />
              <line x1="125" y1="20" x2="125" y2="90" stroke="#6E4A14" strokeWidth="1.2" strokeDasharray="2 2" />
              <text x="80" y="102" fill="#5C4A38" fontSize="7" fontFamily="'EB Garamond', serif" textAnchor="middle" fontStyle="italic">
                Crank-Slider Linkage (1206)
              </text>
            </svg>
            <span className="text-[9px] text-[#5C4A38] font-serif italic text-center leading-tight">
              Reciprocating cylinder conversion mechanism
            </span>
          </div>
        </div>

        {/* 2. Working & Internal Kinematics Explanation Paragraph */}
        <div className="bg-[#FAF6ED] p-2.5 rounded-xl border border-[#C59333]/40 shadow-inner">
          <h4 className="font-display font-bold text-[10px] sm:text-xs uppercase text-[#133D3B] tracking-wider mb-0.5 flex items-center gap-1.5">
            <Cog className="w-3.5 h-3.5 text-[#C59333]" />
            Working & Internal Kinematics
          </h4>
          <p className="text-[#3A2C1E] font-body text-[11px] leading-relaxed">
            Al-Jazari achieved mechanical equilibrium by integrating float-actuated hydrostatic balance, precision conical valves, and cam-driven sequencing into unified closed feedback loops, generating reliable automatic motion centuries before modern pneumatic systems.
          </p>
        </div>

        {/* 3. 4-Item Pioneering Innovations Checklist */}
        <div className="bg-[#FAF6ED] p-2.5 rounded-xl border border-[#C59333]/40">
          <h4 className="font-display font-bold text-[10px] uppercase text-[#9E2A2B] tracking-wider mb-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#C59333]" />
            Pioneering Innovations
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[10px] sm:text-[11px] font-body text-[#3E3022]">
            <div className="flex items-start gap-1 bg-[#EAE0CA]/60 p-1 rounded">
              <CheckCircle2 className="w-3 h-3 text-[#1C5A57] shrink-0 mt-0.5" />
              <span>Closed-loop feedback control predating James Watt by 600 years</span>
            </div>
            <div className="flex items-start gap-1 bg-[#EAE0CA]/60 p-1 rounded">
              <CheckCircle2 className="w-3 h-3 text-[#1C5A57] shrink-0 mt-0.5" />
              <span>Cam-based stored-state execution as an ancestor of punch-cards</span>
            </div>
            <div className="flex items-start gap-1 bg-[#EAE0CA]/60 p-1 rounded">
              <CheckCircle2 className="w-3 h-3 text-[#1C5A57] shrink-0 mt-0.5" />
              <span>Integration of ritual and public spectacle with engineering</span>
            </div>
            <div className="flex items-start gap-1 bg-[#EAE0CA]/60 p-1 rounded">
              <CheckCircle2 className="w-3 h-3 text-[#1C5A57] shrink-0 mt-0.5" />
              <span>Holistic systems design where mechanics serve aesthetic harmony</span>
            </div>
          </div>
        </div>

        {/* 4. Four-Box Summary Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-1 text-center text-xs">
          <div className="p-1.5 bg-[#E9DCBF] rounded-lg border border-[#C59333]/30">
            <div className="font-bold text-[#133D3B] font-display text-[10px]">Crankshaft</div>
            <div className="text-[9px] text-[#5E4734]">Rotary to linear push-pull</div>
          </div>
          <div className="p-1.5 bg-[#E9DCBF] rounded-lg border border-[#C59333]/30">
            <div className="font-bold text-[#133D3B] font-display text-[10px]">Camshaft</div>
            <div className="text-[9px] text-[#5E4734]">Sequential automata timing</div>
          </div>
          <div className="p-1.5 bg-[#E9DCBF] rounded-lg border border-[#C59333]/30">
            <div className="font-bold text-[#133D3B] font-display text-[10px]">Suction Pump</div>
            <div className="text-[9px] text-[#5E4734]">Twin double-acting pistons</div>
          </div>
          <div className="p-1.5 bg-[#E9DCBF] rounded-lg border border-[#C59333]/30">
            <div className="font-bold text-[#133D3B] font-display text-[10px]">Conical Valves</div>
            <div className="text-[9px] text-[#5E4734]">Ground-brass fluid control</div>
          </div>
        </div>

        {/* 5. Read More & Scholarly Manuscript Archives Links Box */}
        <div className="p-2 bg-[#EAE0CA] rounded-xl border border-[#C59333]/40 flex flex-col gap-1">
          <div className="flex items-center gap-1.5 text-[10px] font-display font-bold text-[#133D3B] uppercase tracking-wider">
            <Library className="w-3.5 h-3.5 text-[#9E2A2B]" />
            Read More & Scholarly Manuscript Archives
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-xs">
            <a
              href="https://en.wikipedia.org/wiki/Ismail_al-Jazari"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1 bg-[#FAF6ED] rounded hover:bg-white text-[#133D3B] hover:text-[#9E2A2B] border border-[#C59333]/25 transition-colors font-medium text-[10px]"
            >
              <span>Ismail al-Jazari — Encyclopedia</span>
              <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://en.wikipedia.org/wiki/The_Book_of_Knowledge_of_Ingenious_Mechanical_Devices"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-between p-1 bg-[#FAF6ED] rounded hover:bg-white text-[#133D3B] hover:text-[#9E2A2B] border border-[#C59333]/25 transition-colors font-medium text-[10px]"
            >
              <span>Kitāb al-Ḥiyal (1206) — History</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* 6. Close the Book Button */}
        <div className="flex justify-center pt-0.5">
          <button
            onClick={onCloseBook}
            className="group inline-flex items-center gap-2 px-5 py-2 rounded-xl font-display font-bold text-xs text-[#FAF6ED] bg-gradient-to-r from-[#133D3B] to-[#1E5C57] hover:from-[#1E5C57] hover:to-[#133D3B] border border-[#C59333] shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
            aria-label="Close the Book and riffle back to the cover"
          >
            <RotateCcw className="w-3.5 h-3.5 text-[#E4B24B] transition-transform group-hover:-rotate-90" />
            <span>Close the Book</span>
            <BookOpen className="w-3.5 h-3.5 text-[#E4B24B]" />
          </button>
        </div>
      </div>

      {/* 7. Colophon Line */}
      <div className="border-t border-[#C59333]/30 pt-1 mt-1.5 flex items-center justify-between text-[10px] text-[#6B543D]">
        <span>Completed in Amid · Rajab 602 AH (1206 CE)</span>
        <span className="font-arabic font-bold text-xs text-[#9E2A2B]">تَمَّ بِحَمْدِ الله</span>
      </div>
    </div>
  );
};
