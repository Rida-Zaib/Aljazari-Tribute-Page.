import React from 'react';
import { IslamicRosette } from '../IslamicRosette';
import { RotateCcw, Sparkles } from 'lucide-react';

interface BackCoverProps {
  onReturnToCover: () => void;
}

export const BackCoverPage: React.FC<BackCoverProps> = ({ onReturnToCover }) => {
  return (
    <div className="relative w-full h-full parchment-cover text-[#FAF6ED] p-6 sm:p-8 md:p-10 flex flex-col justify-between items-center text-center overflow-hidden border-[8px] md:border-[10px] border-[#10302E] shadow-2xl">
      {/* Corner Filigree */}
      <div className="absolute top-3 left-3 w-14 h-14 border-t-2 border-l-2 border-[#C59333] pointer-events-none" />
      <div className="absolute top-3 right-3 w-14 h-14 border-t-2 border-r-2 border-[#C59333] pointer-events-none" />
      <div className="absolute bottom-3 left-3 w-14 h-14 border-b-2 border-l-2 border-[#C59333] pointer-events-none" />
      <div className="absolute bottom-3 right-3 w-14 h-14 border-b-2 border-r-2 border-[#C59333] pointer-events-none" />

      {/* Decorative frame */}
      <div className="absolute inset-4 sm:inset-5 border border-[#C59333]/35 pointer-events-none" />

      <div className="relative z-10 pt-3">
        <div className="flex items-center justify-center gap-2 text-[11px] font-display uppercase tracking-[0.25em] text-[#E4B24B]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Epilogue • Al-Khātimah</span>
          <Sparkles className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Center Medallion Seal */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-sm w-full">
        <IslamicRosette size={220} />

        <div className="font-arabic text-xl sm:text-2xl text-[#E4B24B] font-bold mt-4 mb-1">
          وَاللهُ أَعْلَمُ بِالصَّوَابْ
        </div>
        <p className="font-display text-xs sm:text-sm text-[#D8A53B] uppercase tracking-wider font-semibold">
          "And Allah knows best the truth"
        </p>
        <p className="font-body text-[11px] text-[#FAF6ED]/75 italic mt-1.5">
          The traditional colophon closing medieval scientific manuscripts.
        </p>

        <button
          onClick={onReturnToCover}
          className="mt-5 inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-display font-bold text-xs sm:text-sm text-[#112423] bg-gradient-to-r from-[#E4B24B] via-[#F4CF74] to-[#C59333] hover:scale-105 active:scale-95 transition-all shadow-lg"
          aria-label="Return to front cover"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Return to Front Cover</span>
        </button>
      </div>

      <div className="relative z-10 text-[10px] text-[#FAF6ED]/50 font-mono">
        Al-Jazari Engineering Foundation • 1206–Present
      </div>
    </div>
  );
};
