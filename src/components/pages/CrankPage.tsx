import React from 'react';
import { CrankSimulation } from '../CrankSimulation';
import { Zap, BookOpen } from 'lucide-react';

interface CrankPageProps {
  onInspectManuscript?: () => void;
}

export const CrankPage: React.FC<CrankPageProps> = ({ onInspectManuscript }) => {
  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-5 md:p-7 flex flex-col justify-between overflow-y-auto manuscript-scroll spine-shadow-right">
      {/* Header */}
      <div className="border-b-2 border-[#C59333]/40 pb-2.5 mb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Chapter IV • Al-Mahāwir wa-l-Makābīs
          </span>
          <h2 className="text-xl md:text-2xl font-display font-black text-[#133D3B]">
            The Crank & Modern Engine
          </h2>
        </div>
        <div className="text-right">
          <span className="font-arabic text-lg text-[#9E2A2B] font-bold">
            عَمُودُ الكَرَنْكِ وَالمُحَرِّكُ الحَدِيثْ
          </span>
          <div className="text-[10px] text-[#5C4A38] font-mono">Folio 4r</div>
        </div>
      </div>

      {/* Main Content: Kinematic Model & Historical Folio Breakdown */}
      <div className="flex flex-col gap-4 my-auto">
        <CrankSimulation />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          <div className="md:col-span-4 flex flex-col items-center">
            <div 
              onClick={onInspectManuscript}
              className="group relative p-1.5 bg-[#E6D9BF] rounded-lg border border-[#C59333] shadow cursor-pointer hover:border-[#9E2A2B] transition-all"
            >
              <img
                src="/images/crank_pump.jpg"
                alt="Al-Jazari original manuscript drawing of double-acting suction pump with crank mechanism (1206 CE)"
                className="w-full h-32 md:h-36 object-contain rounded bg-[#F4EBD9]"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-display font-bold text-white bg-[#133D3B] px-2 py-1 rounded shadow">
                  Original 1206 Folio
                </span>
              </div>
            </div>
            <span className="text-[10px] text-[#70563F] italic mt-1 text-center font-serif">
              Original Folio: Double-Acting Reciprocating Suction Pump (1206)
            </span>
          </div>

          <div className="md:col-span-8 flex flex-col gap-2 text-xs md:text-sm text-[#2F231A] leading-relaxed">
            <p className="font-body">
              First described in his 1206 treatise, Al-Jazari's <strong>crank-and-connecting-rod mechanism</strong> converted continuous circular rotation into straight reciprocating push-pull motion. Applied to drive a twin-cylinder double-acting suction pump, this marked the first time in documented human history that rotary force was converted into linear mechanical power with non-intermittent action.
            </p>
            <div className="bg-[#FAF6ED] p-2.5 rounded-lg border border-[#C59333]/30 text-xs">
              <div className="font-bold text-[#133D3B] font-display mb-1 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-[#E4B24B]" />
                Lineage to the Industrial Revolution
              </div>
              <p className="text-[#4A3B2E]">
                This identical kinematic principle later formed the heart of <strong>Thomas Newcomen's and James Watt's steam engines</strong>, the internal combustion engine of the automobile, and modern compressors.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Colophon */}
      <div className="border-t border-[#C59333]/30 pt-2 flex items-center justify-between text-[11px] text-[#6B543D]">
        <span>First Documented Crank-Connecting Rod Kinematics (1206)</span>
        <span className="font-mono text-[10px]">Rotary &harr; Reciprocating</span>
      </div>
    </div>
  );
};
