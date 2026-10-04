import React from 'react';
import { ShieldCheck, Layers, Sparkles, Building2, Cpu, FileText } from 'lucide-react';

export const ModernReproPage: React.FC = () => {
  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-5 md:p-7 flex flex-col justify-between overflow-y-auto manuscript-scroll spine-shadow-left">
      {/* Header */}
      <div className="border-b-2 border-[#C59333]/40 pb-2.5 mb-3 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Chapter V • Al-Dirāsāt al-Muʿāṣirah
          </span>
          <h2 className="text-xl md:text-2xl font-display font-black text-[#133D3B]">
            Modern Reconstructions & Studies
          </h2>
        </div>
        <div className="text-right">
          <span className="font-arabic text-lg text-[#9E2A2B] font-bold">
            الدِّرَاسَاتُ وَالنَّمَاذِجُ المُعَاصِرَة
          </span>
          <div className="text-[10px] text-[#5C4A38] font-mono">Folio 4v</div>
        </div>
      </div>

      {/* Mandatory Notice Banner */}
      <div className="mb-3 p-2 bg-[#E9DCC0] rounded-lg border border-[#9E2A2B]/40 flex items-center gap-2 text-xs text-[#523E2B]">
        <ShieldCheck className="w-4 h-4 text-[#9E2A2B] shrink-0" />
        <span className="font-serif italic text-[11px] leading-snug">
          <strong>Curatorial Note:</strong> The exhibits on this folio are 21st-century modern reconstructions and analytical schematics created to illustrate Al-Jazari's mechanisms in modern engineering frameworks.
        </span>
      </div>

      {/* 3 Modern Cards Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 my-auto">
        {/* Item 1: Full-scale Replica at Ibn Battuta Mall */}
        <div className="bg-[#FAF6ED] rounded-xl border-2 border-[#C59333]/60 p-2.5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="relative h-32 w-full bg-[#E5D7BC] rounded-lg overflow-hidden border border-[#C59333]/40 mb-2 flex items-center justify-center">
              <img
                src="/images/elephant_clock.png"
                alt="Modern commercial full-scale working reconstruction of the Elephant Clock at Ibn Battuta Mall"
                className="h-full w-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/7/76/Al-jazari_elephant_clock.png';
                }}
              />
              <span className="absolute top-1.5 left-1.5 bg-[#9E2A2B] text-white font-display text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow">
                Modern Reconstruction
              </span>
            </div>
            <h3 className="font-display font-bold text-xs text-[#133D3B] leading-snug">
              Full-Scale Working Replica (Elephant Clock)
            </h3>
            <p className="text-[10px] text-[#9E2A2B] font-bold uppercase tracking-wider mt-0.5">
              Ibn Battuta Mall, Dubai
            </p>
            <p className="text-[11px] font-body text-[#473729] leading-tight mt-1.5">
              A 21-foot tall modern operational replica recreating Al-Jazari’s clepsydra timing cycle, rotating scribe, and mechanical dragon ball-drop in real time.
            </p>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#C59333]/20 text-[9px] text-[#70563E] italic">
            Physical Demonstration Model
          </div>
        </div>

        {/* Item 2: 3D Technical Cutaway Diagram */}
        <div className="bg-[#FAF6ED] rounded-xl border-2 border-[#C59333]/60 p-2.5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="relative h-32 w-full bg-[#E5D7BC] rounded-lg overflow-hidden border border-[#C59333]/40 mb-2 flex items-center justify-center">
              <img
                src="/images/candle_clock.jpg"
                alt="3D computer-generated technical cutaway of the Elephant Clock mechanism"
                className="h-full w-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/b/b2/Al-Jazari_-_A_Candle_Clock.jpg';
                }}
              />
              <span className="absolute top-1.5 left-1.5 bg-[#133D3B] text-white font-display text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow">
                Modern 3D Schematic
              </span>
            </div>
            <h3 className="font-display font-bold text-xs text-[#133D3B] leading-snug">
              3D Mechanical Anatomy & Callouts
            </h3>
            <p className="text-[10px] text-[#133D3B] font-bold uppercase tracking-wider mt-0.5">
              Kinematic CAD Breakdown
            </p>
            <p className="text-[11px] font-body text-[#473729] leading-tight mt-1.5">
              Modern engineering rendering mapping the sinking bowl clepsydra, pulley drive, falcon ball dropper, dragon counterpoise, and cymbal trip hammer.
            </p>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#C59333]/20 text-[9px] text-[#70563E] italic">
            Modern Digital Visualization
          </div>
        </div>

        {/* Item 3: Systems & Automata Analytical Study Poster */}
        <div className="bg-[#FAF6ED] rounded-xl border-2 border-[#C59333]/60 p-2.5 shadow-sm flex flex-col justify-between">
          <div>
            <div className="relative h-32 w-full bg-[#E5D7BC] rounded-lg overflow-hidden border border-[#C59333]/40 mb-2 flex items-center justify-center">
              <img
                src="/images/castle_clock.jpg"
                alt="Modern analytical study poster Study No 010 Al-Jazari's Book of Ingenious Devices"
                className="h-full w-full object-contain p-1"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Al-jazari_robots.jpg';
                }}
              />
              <span className="absolute top-1.5 left-1.5 bg-[#B3832D] text-[#12161A] font-display text-[9px] px-2 py-0.5 rounded font-bold uppercase tracking-wider shadow">
                Analytical Study No. 010
              </span>
            </div>
            <h3 className="font-display font-bold text-xs text-[#133D3B] leading-snug">
              Systems Architecture & Automation Study
            </h3>
            <p className="text-[10px] text-[#B3832D] font-bold uppercase tracking-wider mt-0.5">
              Robotics & Cybernetics Theory
            </p>
            <p className="text-[11px] font-body text-[#473729] leading-tight mt-1.5">
              Contemporary analytical breakdown highlighting co-cognition, cam sequencing, and feedback loops as early foundations of cybernetic systems.
            </p>
          </div>
          <div className="mt-2 pt-1.5 border-t border-[#C59333]/20 text-[9px] text-[#70563E] italic">
            Modern Academic Infographic
          </div>
        </div>
      </div>

      {/* Footer Colophon */}
      <div className="border-t border-[#C59333]/30 pt-2 flex items-center justify-between text-[11px] text-[#6B543D]">
        <span>Modern Validation of 12th-Century Precision</span>
        <span className="font-mono text-[10px]">Contemporary Engineering Studies</span>
      </div>
    </div>
  );
};
