import React from 'react';
import { Feather, Bookmark, Sparkles, Compass, ShieldCheck, Scroll, Award, Crown } from 'lucide-react';

interface IntroPageProps {
  onNavigateToSheet: (sheetIndex: number) => void;
}

export const IntroPage: React.FC<IntroPageProps> = ({ onNavigateToSheet }) => {
  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-y-auto manuscript-scroll spine-shadow-left">
      {/* Header */}
      <div className="border-b-2 border-[#C59333]/40 pb-2 mb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Prologue • Al-Muqaddimah
          </span>
          <h2 className="text-base sm:text-lg md:text-xl font-display font-black text-[#133D3B]">
            The Royal Commission & Codex Overview
          </h2>
        </div>
        <div className="text-right shrink-0">
          <span className="font-arabic text-sm sm:text-base text-[#9E2A2B] font-bold">
            مُقَدِّمَةُ الكِتَابْ
          </span>
          <div className="text-[9px] text-[#5C4A38] font-mono">Folio 1v</div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="my-auto flex flex-col gap-2.5 text-xs sm:text-sm leading-relaxed text-[#2D2218]">
        {/* Royal Dedication Transcript with Sultan Seal Inset */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center">
          <div className="sm:col-span-8 p-2.5 bg-[#FAF6ED] rounded-xl border border-[#C59333]/40 shadow-inner">
            <div className="flex items-center gap-1.5 text-[11px] font-display font-bold text-[#9E2A2B] mb-1">
              <Crown className="w-3.5 h-3.5 text-[#C59333]" />
              Sultan Nasir al-Din Mahmud's Decree (1206 CE)
            </div>
            <p className="italic font-body text-[#3A2C1E] text-[11px] leading-relaxed">
              "You have fashioned wondrous devices and brought them to life through your singular craft. Do not allow these subtle secrets to perish. I desire that you compile for me a codex containing all that you have created, with clear drawings and precise dimensions so that posterity may construct them."
            </p>
          </div>

          {/* Miniature Drawing: Court Scribe & Measuring Astrolabe */}
          <div className="sm:col-span-4 bg-[#EAE0CA] p-2 rounded-xl border border-[#C59333]/60 flex flex-col items-center justify-center text-center shadow-sm">
            <svg viewBox="0 0 120 90" className="w-full h-auto max-h-[75px]" xmlns="http://www.w3.org/2000/svg">
              <rect width="120" height="90" fill="#F4EBD9" rx="3" />
              <circle cx="60" cy="40" r="24" fill="none" stroke="#6E4A14" strokeWidth="1.5" />
              <circle cx="60" cy="40" r="20" fill="none" stroke="#C59333" strokeWidth="1" strokeDasharray="3 2" />
              <line x1="60" y1="16" x2="60" y2="64" stroke="#9E2A2B" strokeWidth="1.5" />
              <line x1="36" y1="40" x2="84" y2="40" stroke="#9E2A2B" strokeWidth="1.5" />
              <circle cx="60" cy="40" r="3" fill="#D8A53B" stroke="#6E4A14" />
              <text x="60" y="80" fill="#5C4A38" fontSize="7" fontFamily="'EB Garamond', serif" textAnchor="middle" fontStyle="italic">
                Artuqid Royal Seal & Astrolabe
              </text>
            </svg>
            <span className="text-[9px] text-[#5C4A38] font-serif italic mt-0.5">
              Amid Citadel Workshop, 1206
            </span>
          </div>
        </div>

        {/* The 6 Fundamental Categories of Al-Jazari's Codex */}
        <div className="bg-[#FAF6ED] p-2.5 rounded-xl border border-[#C59333]/40">
          <div className="text-[10px] font-display font-bold uppercase text-[#133D3B] tracking-wider mb-1.5 flex items-center gap-1">
            <Scroll className="w-3.5 h-3.5 text-[#9E2A2B]" />
            The 50 Mechanical Inventions across 6 Categories
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5 text-[10px] font-body text-[#3E3022]">
            <div className="bg-[#EAE0CA]/60 p-1.5 rounded">
              <strong className="text-[#133D3B] block">I. Water Clocks (10)</strong>
              <span>Elephant, Castle, Scribe</span>
            </div>
            <div className="bg-[#EAE0CA]/60 p-1.5 rounded">
              <strong className="text-[#133D3B] block">II. Automata Vessels (10)</strong>
              <span>Peacock basin, Flotilla</span>
            </div>
            <div className="bg-[#EAE0CA]/60 p-1.5 rounded">
              <strong className="text-[#133D3B] block">III. Pitchers & Basins (10)</strong>
              <span>Hydrostatic siphons</span>
            </div>
            <div className="bg-[#EAE0CA]/60 p-1.5 rounded">
              <strong className="text-[#133D3B] block">IV. Perpetual Fountains (10)</strong>
              <span>Alternating float valves</span>
            </div>
            <div className="bg-[#EAE0CA]/60 p-1.5 rounded">
              <strong className="text-[#133D3B] block">V. Water-Raising Engines (5)</strong>
              <span>Crank pump, Segmental gears</span>
            </div>
            <div className="bg-[#EAE0CA]/60 p-1.5 rounded">
              <strong className="text-[#133D3B] block">VI. Miscellaneous Devices (5)</strong>
              <span>Combination lock, protractor</span>
            </div>
          </div>
        </div>

        {/* Quick Navigational Chapter Index */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[10px] font-display">
          <button
            onClick={() => onNavigateToSheet(2)}
            className="flex items-center justify-between p-1.5 rounded-lg bg-[#FAF6ED] hover:bg-[#FFF] border border-[#C59333]/30 text-left transition-colors"
          >
            <span className="font-bold text-[#133D3B]">Timeline & Peacock Automaton</span>
            <span className="text-[#9E2A2B] font-mono">&rarr;</span>
          </button>
          <button
            onClick={() => onNavigateToSheet(6)}
            className="flex items-center justify-between p-1.5 rounded-lg bg-[#FAF6ED] hover:bg-[#FFF] border border-[#C59333]/30 text-left transition-colors"
          >
            <span className="font-bold text-[#133D3B]">Crankshaft & Modern Engines</span>
            <span className="text-[#9E2A2B] font-mono">&rarr;</span>
          </button>
        </div>
      </div>

      {/* Footer Colophon */}
      <div className="border-t border-[#C59333]/30 pt-1 mt-1.5 flex items-center text-[10px] text-[#6B543D]">
        <span>Court of Diyarbakır • Artuqid Sultanate</span>
      </div>
    </div>
  );
};
