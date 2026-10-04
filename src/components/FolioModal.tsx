import React, { useState } from 'react';
import { DetailedFolio } from '../data/manuscriptData';
import { X, ZoomIn, ZoomOut, Maximize2, ShieldCheck, ShieldAlert, Layers, History, Lightbulb, Cog, CheckCircle2 } from 'lucide-react';

interface FolioModalProps {
  folio: DetailedFolio | null;
  onClose: () => void;
}

export const FolioModal: React.FC<FolioModalProps> = ({ folio, onClose }) => {
  const [zoomLevel, setZoomLevel] = useState(1);
  const [activeTab, setActiveTab] = useState<'working' | 'reasoning' | 'history'>('working');

  if (!folio) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div 
        className="relative w-full max-w-4xl max-h-[92vh] bg-[#F4EBD9] border-2 border-[#C59333] rounded-2xl shadow-2xl overflow-hidden flex flex-col manuscript-scroll"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#143E3B] text-[#FAF6ED] border-b-2 border-[#C59333]">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#E4B24B] font-display font-semibold">
              {folio.plateNumber} • {folio.category}
            </span>
            <h3 className="text-xl md:text-2xl font-display font-bold text-[#FFF2BF]">
              {folio.title}
            </h3>
            <p className="text-sm font-arabic text-[#E4B24B] mt-0.5">
              {folio.arabicTitle}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#FAF6ED]/70 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            aria-label="Close folio view"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          {/* Left Column: Image with Zoom */}
          <div className="flex flex-col gap-3">
            <div className="relative rounded-xl border-2 border-[#C59333]/60 bg-[#EAE0CA] p-2 shadow-inner overflow-hidden flex items-center justify-center min-h-[320px]">
              <div 
                className="transition-transform duration-300 ease-out flex items-center justify-center w-full"
                style={{ transform: `scale(${zoomLevel})` }}
              >
                <img
                  src={folio.imageUrl}
                  alt={folio.imageAlt}
                  className="max-h-[360px] w-auto object-contain rounded drop-shadow-md select-none"
                />
              </div>

              {/* Zoom Controls */}
              <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-[#122624]/90 backdrop-blur px-2.5 py-1 rounded-full border border-[#C59333]/40 text-[#FAF6ED] text-xs">
                <button
                  onClick={() => setZoomLevel((z) => Math.max(0.8, z - 0.2))}
                  className="p-1 hover:text-[#E4B24B]"
                  aria-label="Zoom out"
                >
                  <ZoomOut className="w-3.5 h-3.5" />
                </button>
                <span className="font-mono text-[11px]">{Math.round(zoomLevel * 100)}%</span>
                <button
                  onClick={() => setZoomLevel((z) => Math.min(2.2, z + 0.2))}
                  className="p-1 hover:text-[#E4B24B]"
                  aria-label="Zoom in"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => setZoomLevel(1)}
                  className="p-1 hover:text-[#E4B24B] border-l border-white/20 pl-1.5 ml-1"
                  aria-label="Reset zoom"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Historical Caption / Credit Tag */}
            <div className="p-3 bg-[#E9DCBF] rounded-lg border border-[#C59333]/40 text-xs text-[#423223]">
              <div className="font-bold text-[#9E2A2B] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                {folio.isHistorical ? <ShieldCheck className="w-3.5 h-3.5 text-[#1C5A57]" /> : <ShieldAlert className="w-3.5 h-3.5 text-[#9E2A2B]" />}
                {folio.historicalBadge}
              </div>
              <p className="italic text-[#5A4533]">{folio.sourceCredit}</p>
            </div>
          </div>

          {/* Right Column: Mechanical & Historical Breakdown */}
          <div className="flex flex-col gap-4">
            {/* Tabs */}
            <div className="flex border-b border-[#C59333]/40 pb-1 gap-2 text-sm font-display font-bold">
              <button
                onClick={() => setActiveTab('working')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  activeTab === 'working'
                    ? 'border-[#9E2A2B] text-[#9E2A2B]'
                    : 'border-transparent text-[#6B543D] hover:text-[#2B2118]'
                }`}
              >
                Working & Mechanism
              </button>
              <button
                onClick={() => setActiveTab('reasoning')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  activeTab === 'reasoning'
                    ? 'border-[#9E2A2B] text-[#9E2A2B]'
                    : 'border-transparent text-[#6B543D] hover:text-[#2B2118]'
                }`}
              >
                Reasoning & Purpose
              </button>
              <button
                onClick={() => setActiveTab('history')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  activeTab === 'history'
                    ? 'border-[#9E2A2B] text-[#9E2A2B]'
                    : 'border-transparent text-[#6B543D] hover:text-[#2B2118]'
                }`}
              >
                History & Context
              </button>
            </div>

            {/* Tab Contents */}
            {activeTab === 'working' && (
              <div className="flex flex-col gap-3">
                <div className="p-3.5 bg-[#FAF6ED] rounded-xl border border-[#C59333]/30">
                  <h4 className="text-xs uppercase font-display font-bold text-[#143E3B] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Cog className="w-4 h-4 text-[#C59333]" />
                    Step-by-Step Mechanical Operation
                  </h4>
                  <p className="text-sm text-[#3E3022] leading-relaxed font-body">
                    {folio.working}
                  </p>
                </div>
                
                <div className="space-y-1.5">
                  <h5 className="text-[11px] uppercase font-display font-bold text-[#9E2A2B] tracking-wider">
                    Key Technical Innovations:
                  </h5>
                  {folio.keyInnovations.map((inv, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#33281E] bg-[#FAF6ED] p-2 rounded-lg border border-[#C59333]/25">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#1C5A57] shrink-0 mt-0.5" />
                      <span>{inv}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'reasoning' && (
              <div className="flex flex-col gap-3">
                <div className="p-4 bg-[#FAF6ED] rounded-xl border border-[#9E2A2B]/30">
                  <h4 className="text-xs uppercase font-display font-bold text-[#9E2A2B] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <Lightbulb className="w-4 h-4 text-[#9E2A2B]" />
                    The Engineering Challenge & Solution
                  </h4>
                  <p className="text-sm text-[#3E3022] leading-relaxed font-body">
                    {folio.reasoning}
                  </p>
                </div>
                <div className="p-3 bg-[#EAE0CA] rounded-lg border border-[#C59333]/30 text-xs text-[#4A3928]">
                  <strong>Heading Summary: </strong> {folio.heading}
                </div>
              </div>
            )}

            {activeTab === 'history' && (
              <div className="flex flex-col gap-3">
                <div className="p-4 bg-[#FAF6ED] rounded-xl border border-[#143E3B]/30">
                  <h4 className="text-xs uppercase font-display font-bold text-[#143E3B] tracking-wider mb-1.5 flex items-center gap-1.5">
                    <History className="w-4 h-4 text-[#C59333]" />
                    Court Provenance & Manuscript Legacy
                  </h4>
                  <p className="text-sm text-[#3E3022] leading-relaxed font-body">
                    {folio.history}
                  </p>
                </div>
                {folio.dimensionsOrSpecs && (
                  <div className="text-xs text-[#5C4A38] bg-[#EAE0CA] p-3 rounded-lg border border-[#C59333]/30">
                    <span className="font-bold">Historical Dimensions & Notes: </span>
                    {folio.dimensionsOrSpecs}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#EAE0CA] border-t border-[#C59333]/40 flex justify-between items-center text-xs text-[#6B543D]">
          <span>The Book of Knowledge of Ingenious Mechanical Devices (1206 CE)</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-[#143E3B] hover:bg-[#1C5A57] text-[#FAF6ED] font-display font-bold rounded-lg transition-colors"
          >
            Close Plate
          </button>
        </div>
      </div>
    </div>
  );
};
