import React from 'react';
import { DetailedFolio } from '../../data/manuscriptData';
import { CrankSimulation } from '../CrankSimulation';
import { SegmentalGearSimulation } from '../SegmentalGearSimulation';
import { CamshaftEngineSimulation } from '../CamshaftEngineSimulation';
import { ElephantClockSimulation } from '../ElephantClockSimulation';
import { MusicalBoatSimulation } from '../MusicalBoatSimulation';
import { PeacockBasinSimulation } from '../PeacockBasinSimulation';
import { CastleClockSimulation } from '../CastleClockSimulation';
import { WaterBalanceSimulation } from '../WaterBalanceSimulation';
import { AnimalPistonSimulation } from '../AnimalPistonSimulation';
import { 
  Eye, 
  ShieldCheck, 
  ShieldAlert, 
  Lightbulb, 
  History, 
  Cog, 
  CheckCircle2 
} from 'lucide-react';

interface PlatePageProps {
  plate: DetailedFolio;
  onInspect?: (plate: DetailedFolio) => void;
}

export const PlatePage: React.FC<PlatePageProps> = ({ 
  plate, 
  onInspect 
}) => {
  const isCrankPlate = plate.id === 'crank-engine';
  const isSegmentalPlate = plate.id === 'segmental-gear';
  const isCamPlate = plate.id === 'four-bucket';
  const isElephantPlate = plate.id === 'elephant-3d';
  const isBoatPlate = plate.id === 'musical-boat';
  const isPeacockPlate = plate.id === 'peacock-basin';
  const isCastlePlate = plate.id === 'castle-clock';
  const isBalancePlate = plate.id === 'scale-device';
  const isPistonPlate = plate.id === 'animal-piston';

  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-y-auto manuscript-scroll">
      {/* Header Banner */}
      <div className="border-b-2 border-[#C59333]/40 pb-1.5 mb-2 flex flex-col gap-0.5">
        <div className="flex items-center justify-between">
          <div className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B] leading-normal">
            {plate.plateNumber} • {plate.category}
          </div>
          <span className="font-arabic text-sm sm:text-base text-[#9E2A2B] font-bold">
            {plate.arabicTitle}
          </span>
        </div>

        <h2 className="text-sm sm:text-base md:text-lg font-display font-black text-[#133D3B] leading-snug mt-0.5">
          {plate.title}
        </h2>
      </div>

      {/* Main Content Layout */}
      <div className="flex flex-col gap-2.5 my-auto">
        {/* Top Grid: Image + Reasoning/History Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2.5 items-start">
          {/* Image Column */}
          <div className="sm:col-span-5 flex flex-col items-center gap-1">
            <div 
              onClick={(e) => {
                e.stopPropagation();
                if (onInspect) onInspect(plate);
              }}
              className="group relative w-full bg-[#EAE0CA] rounded-xl border-2 border-[#C59333] p-1.5 shadow-md cursor-pointer hover:border-[#9E2A2B] transition-all overflow-hidden flex items-center justify-center min-h-[125px] max-h-[160px]"
            >
              <img
                src={plate.imageUrl}
                alt={plate.imageAlt}
                className="max-h-[145px] w-auto object-contain rounded drop-shadow group-hover:scale-105 transition-transform duration-300"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-[#133D3B]/0 group-hover:bg-[#133D3B]/30 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-display font-bold text-white bg-[#133D3B]/90 px-2.5 py-1 rounded-full shadow flex items-center gap-1">
                  <Eye className="w-3 h-3" /> Inspect Folio
                </span>
              </div>
            </div>

            {/* Clear Historical / Modern Badge */}
            <div className="w-full p-1 bg-[#FAF6ED] rounded-lg border border-[#C59333]/30 text-center">
              <div className="flex items-center justify-center gap-1 text-[9px] font-bold uppercase tracking-wider text-[#9E2A2B]">
                {plate.isHistorical ? (
                  <ShieldCheck className="w-3 h-3 text-[#1C5A57]" />
                ) : (
                  <ShieldAlert className="w-3 h-3 text-[#9E2A2B]" />
                )}
                <span>{plate.historicalBadge}</span>
              </div>
              <p className="text-[8.5px] text-[#5C4A38] italic font-serif leading-tight mt-0.5 truncate">
                {plate.sourceCredit}
              </p>
            </div>
          </div>

          {/* Reasoning & History Column */}
          <div className="sm:col-span-7 flex flex-col gap-1.5">
            {/* 1. HEADING */}
            <div className="font-display font-bold text-xs text-[#133D3B] leading-snug border-l-2 border-[#9E2A2B] pl-2">
              {plate.heading}
            </div>

            {/* 2. REASONING */}
            <div className="bg-[#FAF6ED] p-2 rounded-lg border border-[#C59333]/30">
              <div className="font-display font-bold text-[9px] uppercase text-[#9E2A2B] tracking-wider mb-0.5 flex items-center gap-1">
                <Lightbulb className="w-3 h-3 text-[#C59333]" />
                Reasoning & Purpose
              </div>
              <p className="text-[#3A2C1E] font-body text-[10.5px] leading-relaxed">
                {plate.reasoning}
              </p>
            </div>

            {/* 3. HISTORY */}
            <div className="bg-[#FAF6ED] p-2 rounded-lg border border-[#C59333]/30">
              <div className="font-display font-bold text-[9px] uppercase text-[#133D3B] tracking-wider mb-0.5 flex items-center gap-1">
                <History className="w-3 h-3 text-[#9E2A2B]" />
                History & Court Context
              </div>
              <p className="text-[#3A2C1E] font-body text-[10.5px] leading-relaxed">
                {plate.history}
              </p>
            </div>
          </div>
        </div>

        {/* 4. WORKING & MECHANISM SECTION */}
        <div className="bg-[#FAF6ED] p-2.5 rounded-xl border border-[#C59333]/40 shadow-inner">
          <div className="font-display font-bold text-[10px] uppercase text-[#133D3B] tracking-wider mb-1 flex items-center gap-1.5">
            <Cog className="w-3.5 h-3.5 text-[#C59333]" />
            Working & Internal Kinematics
          </div>
          <p className="text-[#332519] font-body text-[10.5px] sm:text-[11px] leading-relaxed">
            {plate.working}
          </p>

          {/* Key Innovations */}
          <div className="mt-1.5 pt-1.5 border-t border-[#C59333]/25">
            <div className="text-[9px] font-display font-bold uppercase text-[#9E2A2B] tracking-wider mb-1">
              Pioneering Innovations:
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[9.5px]">
              {plate.keyInnovations.map((inv, idx) => (
                <div key={idx} className="flex items-start gap-1 text-[#3E3022] bg-[#EAE0CA]/60 p-1 rounded">
                  <CheckCircle2 className="w-3 h-3 text-[#1C5A57] shrink-0 mt-0.5" />
                  <span className="leading-tight">{inv}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Distinct Animated Historical Diagrams Embedded */}
        {isCrankPlate && <CrankSimulation />}
        {isSegmentalPlate && <SegmentalGearSimulation />}
        {isCamPlate && <CamshaftEngineSimulation />}
        {isElephantPlate && <ElephantClockSimulation />}
        {isBoatPlate && <MusicalBoatSimulation />}
        {isPeacockPlate && <PeacockBasinSimulation />}
        {isCastlePlate && <CastleClockSimulation />}
        {isBalancePlate && <WaterBalanceSimulation />}
        {isPistonPlate && <AnimalPistonSimulation />}
      </div>

      {/* Footer Colophon */}
      <div className="border-t border-[#C59333]/30 pt-1 mt-1.5 flex items-center justify-between text-[9.5px] text-[#6B543D]">
        <span>Kitāb fī ma'rifat al-ḥiyal al-handasiyya (1206 CE)</span>
        <button 
          onClick={(e) => {
            e.stopPropagation();
            if (onInspect) onInspect(plate);
          }}
          className="text-[#9E2A2B] font-display font-bold hover:underline flex items-center gap-1"
        >
          <Eye className="w-3 h-3" /> Full Plate View
        </button>
      </div>
    </div>
  );
};
