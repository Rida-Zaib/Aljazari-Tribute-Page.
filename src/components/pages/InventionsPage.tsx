import React from 'react';
import { DETAILED_PLATES, DetailedFolio } from '../../data/manuscriptData';
import { Eye, Sparkles } from 'lucide-react';

interface InventionsPageProps {
  onSelectFolio: (folio: DetailedFolio) => void;
  pagePart?: 'part1' | 'part2';
}

export const InventionsPage: React.FC<InventionsPageProps> = ({ 
  onSelectFolio, 
  pagePart = 'part1' 
}) => {
  const foliosToDisplay = pagePart === 'part1' 
    ? DETAILED_PLATES.slice(1, 5) 
    : DETAILED_PLATES.slice(5, 9);

  return (
    <div className={`relative w-full h-full parchment-bg text-[#2B2118] p-5 md:p-7 flex flex-col justify-between overflow-y-auto manuscript-scroll ${
      pagePart === 'part1' ? 'spine-shadow-right' : 'spine-shadow-left'
    }`}>
      {/* Header */}
      <div className="border-b-2 border-[#C59333]/40 pb-2.5 mb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Chapter III • Maʿāriḍ al-Ḥiyal ({pagePart === 'part1' ? 'Plates I–IV' : 'Plates V–VIII'})
          </span>
          <h2 className="text-xl md:text-2xl font-display font-black text-[#133D3B]">
            Authentic Manuscript Folios
          </h2>
        </div>
        <div className="text-right">
          <span className="font-arabic text-lg text-[#9E2A2B] font-bold">
            مَخْطُوطَاتُ الحِيَلِ
          </span>
          <div className="text-[10px] text-[#5C4A38] font-mono">
            {pagePart === 'part1' ? 'Folio 3r' : 'Folio 3v'}
          </div>
        </div>
      </div>

      {/* Grid of 4 Folio Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 my-auto">
        {foliosToDisplay.map((folio) => (
          <div
            key={folio.id}
            onClick={() => onSelectFolio(folio)}
            className="group relative bg-[#FAF6ED] rounded-xl border border-[#C59333]/50 p-2.5 shadow-sm hover:shadow-md hover:border-[#9E2A2B] transition-all duration-200 cursor-pointer flex flex-col justify-between"
          >
            <div className="relative h-28 sm:h-32 w-full bg-[#E8DCBF] rounded-lg overflow-hidden border border-[#C59333]/30 flex items-center justify-center">
              <img
                src={folio.imageUrl}
                alt={folio.imageAlt}
                className="h-full w-full object-contain p-1 group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-[#133D3B]/0 group-hover:bg-[#133D3B]/20 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <span className="px-2.5 py-1 bg-[#133D3B]/90 text-[#FAF6ED] rounded-full text-[10px] font-display font-bold flex items-center gap-1 shadow">
                  <Eye className="w-3 h-3" /> Inspect Folio
                </span>
              </div>
            </div>

            <div className="mt-2">
              <div className="text-[10px] text-[#9E2A2B] font-display font-semibold uppercase tracking-wider">
                {folio.category}
              </div>
              <h3 className="font-display font-bold text-xs text-[#133D3B] line-clamp-1 group-hover:text-[#9E2A2B] transition-colors">
                {folio.title}
              </h3>
              <div className="text-[10px] font-arabic text-[#C59333] font-bold">
                {folio.arabicTitle}
              </div>
              <p className="text-[11px] font-body text-[#4C3B2C] leading-snug line-clamp-2 mt-1">
                {folio.reasoning}
              </p>
            </div>

            <div className="mt-2 pt-1.5 border-t border-[#C59333]/20 flex items-center justify-between text-[9px] text-[#7A634E] italic">
              <span>1206 CE Original</span>
              <span className="font-sans text-[#9E2A2B] font-bold not-italic">View Details &rarr;</span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Colophon */}
      <div className="border-t border-[#C59333]/30 pt-2 mt-2 flex items-center justify-between text-[11px] text-[#6B543D]">
        <span>Topkapi & Süleymaniye Library Archives</span>
        <span className="font-display text-[10px] font-semibold">Fifty Master Automata</span>
      </div>
    </div>
  );
};
