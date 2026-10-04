import React from 'react';
import { IslamicRosette } from '../IslamicRosette';
import { Sparkles, ArrowRight } from 'lucide-react';

interface CoverPageProps {
  onOpenBook: () => void;
}

export const CoverPage: React.FC<CoverPageProps> = ({ onOpenBook }) => {
  return (
    <div 
      onClick={onOpenBook}
      className="group relative w-full h-full parchment-cover text-[#FAF6ED] p-4 sm:p-6 md:p-7 flex flex-col justify-between items-center text-center overflow-hidden border-[6px] md:border-[8px] border-[#10302E] shadow-2xl cursor-pointer select-none transition-transform duration-300 hover:scale-[1.006]"
      title="Click anywhere to open the codex"
    >
      {/* Intricate Gold Filigree Corner Accents */}
      <div className="absolute top-2.5 left-2.5 w-10 h-10 border-t-2 border-l-2 border-[#C59333] pointer-events-none">
        <div className="absolute top-0.5 left-0.5 w-1.5 h-1.5 bg-[#C59333]/80 rotate-45" />
      </div>
      <div className="absolute top-2.5 right-2.5 w-10 h-10 border-t-2 border-r-2 border-[#C59333] pointer-events-none">
        <div className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-[#C59333]/80 rotate-45" />
      </div>
      <div className="absolute bottom-2.5 left-2.5 w-10 h-10 border-b-2 border-l-2 border-[#C59333] pointer-events-none">
        <div className="absolute bottom-0.5 left-0.5 w-1.5 h-1.5 bg-[#C59333]/80 rotate-45" />
      </div>
      <div className="absolute bottom-2.5 right-2.5 w-10 h-10 border-b-2 border-r-2 border-[#C59333] pointer-events-none">
        <div className="absolute bottom-0.5 right-0.5 w-1.5 h-1.5 bg-[#C59333]/80 rotate-45" />
      </div>

      {/* Decorative inner frame */}
      <div className="absolute inset-3 border border-[#C59333]/35 pointer-events-none" />
      <div className="absolute inset-4.5 border border-[#C59333]/20 border-dashed pointer-events-none" />

      {/* Top Banner */}
      <div className="relative z-10 pt-1 flex flex-col items-center">
        <div className="flex items-center gap-1.5 text-[10px] sm:text-xs font-display uppercase tracking-[0.2em] text-[#E4B24B] mb-0.5">
          <Sparkles className="w-3 h-3 text-[#E4B24B]" />
          <span>Illuminated Manuscript Codex</span>
          <Sparkles className="w-3 h-3 text-[#E4B24B]" />
        </div>
        <div className="h-px w-24 bg-gradient-to-r from-transparent via-[#C59333] to-transparent" />
      </div>

      {/* Central Rosette with Smooth Spinning Animation + Breathing Glow */}
      <div className="relative z-10 my-auto flex flex-col items-center max-w-sm w-full py-1">
        {/* Animated Spinning Rosette Flower Medallion */}
        <div className="relative mb-2 flex items-center justify-center">
          <div className="absolute -inset-4 bg-[#C59333]/25 rounded-full blur-xl animate-pulse" />
          <div className="animate-rosette-spin">
            <IslamicRosette size={165} className="relative z-10" />
          </div>
        </div>

        {/* Arabic Script Calligraphy */}
        <div className="font-arabic text-lg sm:text-xl md:text-2xl text-[#E4B24B] font-bold tracking-wide mb-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          بَدِيعُ الزَّمَانْ أَبُو اَلْعِزِّ إِسْمَاعِيلْ بْنِ الرَّزَّازْ الجَزَرِي
        </div>

        {/* English Name in Large Display Type */}
        <h1 className="font-display font-black text-lg sm:text-xl md:text-2xl text-[#FFF2BF] tracking-wider uppercase leading-tight drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] mb-0.5">
          Ismail al-Jazari
        </h1>

        {/* Historical Title */}
        <p className="font-display text-[11px] sm:text-xs font-semibold text-[#D8A53B] tracking-widest uppercase mb-1.5">
          Chief Engineer of the Artuqid Court, 1136–1206
        </p>

        {/* Treatise Subtitle Box */}
        <div className="bg-[#0A2120]/85 backdrop-blur-sm border border-[#C59333]/50 px-3 py-1 rounded-lg text-[11px] text-[#FAF6ED]/90 max-w-xs font-body italic mb-2.5">
          "The Book of Knowledge of Ingenious Mechanical Devices"
          <div className="text-[9px] text-[#E4B24B] not-italic font-arabic mt-0.5">
            كِتَابُ فِي مَعْرِفَةِ الحِيَلِ الهَنْدَسِيَّة (١٢٠٦ م)
          </div>
        </div>

        {/* Subtle Interactive Click/Arrow Indicator to Open the Book */}
        <div className="flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#C59333]/25 border border-[#C59333]/60 text-[#E4B24B] text-[11px] font-display font-bold tracking-wider uppercase transition-all duration-300 group-hover:bg-[#C59333]/45 group-hover:scale-105">
          <span>Click to Open Codex</span>
          <ArrowRight className="w-3.5 h-3.5 text-[#FFF2BF] transition-transform duration-300 group-hover:translate-x-1" />
        </div>
      </div>

      {/* Bottom Colophon */}
      <div className="relative z-10 text-[9px] sm:text-[10px] text-[#FAF6ED]/60 font-body">
        Compiled at Amid (Diyarbakır) • Anno Hegirae 602 (1206 CE)
      </div>
    </div>
  );
};
