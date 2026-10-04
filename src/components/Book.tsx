import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { CoverPage } from './pages/CoverPage';
import { IntroPage } from './pages/IntroPage';
import { TimelinePage } from './pages/TimelinePage';
import { PlatePage } from './pages/PlatePage';
import { HistoriansPage } from './pages/HistoriansPage';
import { LegacyPage } from './pages/LegacyPage';
import { BackCoverPage } from './pages/BackCoverPage';
import { FolioModal } from './FolioModal';
import { DetailedFolio, DETAILED_PLATES } from '../data/manuscriptData';
import { playPageTurnSound } from '../utils/audio';
import { 
  ChevronLeft, 
  ChevronRight, 
  Volume2, 
  VolumeX, 
  Bookmark, 
  RotateCcw
} from 'lucide-react';

interface SpreadConfig {
  id: number;
  title: string;
  tag: string;
  renderLeft: (props: { onInspect: (p: DetailedFolio) => void; goToSpread: (s: number) => void; handleRiffleClose: () => void }) => React.ReactNode;
  renderRight: (props: { onInspect: (p: DetailedFolio) => void; goToSpread: (s: number) => void; handleRiffleClose: () => void }) => React.ReactNode;
}

export const Book: React.FC = () => {
  // Current spread/turned index (0 = Closed Front Cover, 1..9 = Open 2-Page Spreads, 10 = Closed Back Cover)
  const [currentSpread, setCurrentSpread] = useState<number>(0);
  
  // Actively turning sheet index (maintains class 'is-active-turn' with z-index: 100 until transitionend)
  const [turningSheetIndex, setTurningSheetIndex] = useState<number | null>(null);
  const [flipDirection, setFlipDirection] = useState<'forward' | 'backward'>('forward');
  const [isRiffling, setIsRiffling] = useState<boolean>(false);
  
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [selectedFolio, setSelectedFolio] = useState<DetailedFolio | null>(null);
  const [showToc, setShowToc] = useState<boolean>(false);

  const totalSpreads = 10;
  const flipDurationMs = 800;
  const fallbackTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const touchStartXRef = useRef<number | null>(null);

  // Helper to find plate by ID
  const getPlate = useCallback((id: string): DetailedFolio => {
    return DETAILED_PLATES.find(p => p.id === id) || DETAILED_PLATES[0];
  }, []);

  // 'transitionend' event listener on page-sheet elements managing z-index settings
  const handleSheetTransitionEnd = (e: React.TransitionEvent<HTMLDivElement>, sheetIdx: number) => {
    if (e.propertyName === 'transform' && e.target === e.currentTarget) {
      if (turningSheetIndex === sheetIdx) {
        // Drop high z-index (100) to resting value (10) once turn transition completes fully
        setTurningSheetIndex(null);
      }
    }
  };

  // Turn forward (next spread)
  const turnForward = useCallback(() => {
    if (currentSpread >= totalSpreads || turningSheetIndex !== null || isRiffling) return;

    const sheetToTurn = currentSpread;
    setTurningSheetIndex(sheetToTurn);
    setFlipDirection('forward');
    playPageTurnSound(isMuted, 'forward');

    setCurrentSpread((prev) => prev + 1);

    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    fallbackTimeoutRef.current = setTimeout(() => {
      setTurningSheetIndex(null);
    }, flipDurationMs + 50);
  }, [currentSpread, totalSpreads, turningSheetIndex, isRiffling, isMuted]);

  // Turn backward (previous spread)
  const turnBackward = useCallback(() => {
    if (currentSpread <= 0 || turningSheetIndex !== null || isRiffling) return;

    const sheetToTurn = currentSpread - 1;
    setTurningSheetIndex(sheetToTurn);
    setFlipDirection('backward');
    playPageTurnSound(isMuted, 'backward');

    setCurrentSpread((prev) => prev - 1);

    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    fallbackTimeoutRef.current = setTimeout(() => {
      setTurningSheetIndex(null);
    }, flipDurationMs + 50);
  }, [currentSpread, turningSheetIndex, isRiffling, isMuted]);

  // "Close the Book": Sequential riffling backward cascade through every open page
  const handleRiffleClose = useCallback(() => {
    if (currentSpread === 0 || isRiffling) return;

    setIsRiffling(true);
    let cur = currentSpread;

    const riffleStep = () => {
      if (cur <= 0) {
        setIsRiffling(false);
        setTurningSheetIndex(null);
        return;
      }

      cur -= 1;
      setTurningSheetIndex(cur);
      setFlipDirection('backward');
      setCurrentSpread(cur);
      playPageTurnSound(isMuted, 'riffle');

      setTimeout(riffleStep, 120);
    };

    riffleStep();
  }, [currentSpread, isRiffling, isMuted]);

  // Direct Jump
  const goToSpread = useCallback((target: number) => {
    if (target === currentSpread || turningSheetIndex !== null || isRiffling) return;
    const bounded = Math.max(0, Math.min(totalSpreads, target));
    const dir = bounded > currentSpread ? 'forward' : 'backward';
    const activeSheet = dir === 'forward' ? currentSpread : bounded;
    
    setFlipDirection(dir);
    setTurningSheetIndex(activeSheet);
    playPageTurnSound(isMuted, dir);
    setCurrentSpread(bounded);
    setShowToc(false);

    if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    fallbackTimeoutRef.current = setTimeout(() => {
      setTurningSheetIndex(null);
    }, flipDurationMs + 50);
  }, [currentSpread, totalSpreads, turningSheetIndex, isRiffling, isMuted]);

  // 10 Full Spreads (20 Content Pages + Covers)
  const spreadsRegistry: SpreadConfig[] = useMemo(() => [
    {
      id: 1,
      title: 'Prologue & Life of the Master',
      tag: 'Folio 1v–1r',
      renderLeft: ({ goToSpread }) => <IntroPage onNavigateToSheet={goToSpread} />,
      renderRight: ({ onInspect }) => <PlatePage plate={getPlate('portrait-bio')} onInspect={onInspect} />
    },
    {
      id: 2,
      title: 'Milestone Timeline & Peacock Automaton',
      tag: 'Folio 2v–Plate I',
      renderLeft: () => <TimelinePage />,
      renderRight: ({ onInspect }) => <PlatePage plate={getPlate('peacock-basin')} onInspect={onInspect} />
    },
    {
      id: 3,
      title: 'Robotic Flotilla & Castle Astronomical Clock',
      tag: 'Plates II–III',
      renderLeft: ({ onInspect }) => <PlatePage plate={getPlate('musical-boat')} onInspect={onInspect} />,
      renderRight: ({ onInspect }) => <PlatePage plate={getPlate('castle-clock')} onInspect={onInspect} />
    },
    {
      id: 4,
      title: 'Precision Water Balance & Saqiya Pump',
      tag: 'Plates IV–V',
      renderLeft: ({ onInspect }) => <PlatePage plate={getPlate('scale-device')} onInspect={onInspect} />,
      renderRight: ({ onInspect }) => <PlatePage plate={getPlate('saqiya-pump')} onInspect={onInspect} />
    },
    {
      id: 5,
      title: 'Four-Bucket Cam Engine & Segmental Gears',
      tag: 'Plates VI–VII',
      renderLeft: ({ onInspect }) => <PlatePage plate={getPlate('four-bucket')} onInspect={onInspect} />,
      renderRight: ({ onInspect }) => <PlatePage plate={getPlate('segmental-gear')} onInspect={onInspect} />
    },
    {
      id: 6,
      title: 'Animal Piston Pump & Crank Mechanism',
      tag: 'Plates VIII–IX',
      renderLeft: ({ onInspect }) => <PlatePage plate={getPlate('animal-piston')} onInspect={onInspect} />,
      renderRight: ({ onInspect }) => <PlatePage plate={getPlate('crank-engine')} onInspect={onInspect} />
    },
    {
      id: 7,
      title: 'Elephant Clock Replica & 3D Hydraulic Clepsydra',
      tag: 'Plates X–XI',
      renderLeft: ({ onInspect }) => <PlatePage plate={getPlate('elephant-replica')} onInspect={onInspect} />,
      renderRight: ({ onInspect }) => <PlatePage plate={getPlate('elephant-3d')} onInspect={onInspect} />
    },
    {
      id: 8,
      title: 'Cybernetic Systems Study & Scholarly Commentary',
      tag: 'Plates XII–Folio 8v',
      renderLeft: ({ onInspect }) => <PlatePage plate={getPlate('study-infographic')} onInspect={onInspect} />,
      renderRight: () => <HistoriansPage />
    },
    {
      id: 9,
      title: 'Scholarly Commentary & Enduring Global Legacy',
      tag: 'Folio 8v–Epilogue',
      renderLeft: () => <HistoriansPage />,
      renderRight: ({ handleRiffleClose }) => <LegacyPage onCloseBook={handleRiffleClose} />
    }
  ], [getPlate]);

  // Clean up timers
  useEffect(() => {
    return () => {
      if (fallbackTimeoutRef.current) clearTimeout(fallbackTimeoutRef.current);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedFolio) {
        if (e.key === 'Escape') setSelectedFolio(null);
        return;
      }
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        turnForward();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        turnBackward();
      } else if (e.key === 'Home') {
        e.preventDefault();
        handleRiffleClose();
      } else if (e.key === 'End') {
        e.preventDefault();
        goToSpread(totalSpreads);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [turnForward, turnBackward, handleRiffleClose, goToSpread, selectedFolio, totalSpreads]);

  // Touch swipe support
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null) return;
    const deltaX = touchStartXRef.current - e.changedTouches[0].clientX;
    if (deltaX > 45) {
      turnForward();
    } else if (deltaX < -45) {
      turnBackward();
    }
    touchStartXRef.current = null;
  };

  // Table of contents entries
  const tocEntries = [
    { title: 'Front Cover & Title Rosette', spread: 0, tag: 'Cover' },
    ...spreadsRegistry.map(s => ({ title: s.title, spread: s.id, tag: s.tag })),
    { title: 'Back Cover Codex', spread: 10, tag: 'Back Cover' },
  ];

  // Active spread item
  const activeSpreadConfig = spreadsRegistry.find(s => s.id === currentSpread);

  return (
    <div 
      className="relative min-h-screen w-full flex flex-col items-center justify-between p-2 sm:p-4 md:p-6 bg-[#0B1012] text-[#FAF6ED] select-none overflow-x-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Header & Folio Quick Jump */}
      <header className="w-full max-w-5xl flex items-center justify-between px-3 md:px-5 py-2.5 bg-[#121A1D]/90 backdrop-blur-md border border-[#C59333]/30 rounded-xl shadow-lg z-30 mb-2">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowToc(!showToc)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#C59333]/15 hover:bg-[#C59333]/30 border border-[#C59333]/40 text-[#E4B24B] text-xs font-display font-semibold transition-colors"
            aria-label="Toggle Table of Contents"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Folio Directory</span>
          </button>

          <div className="flex flex-col">
            <h1 className="text-xs md:text-sm font-display font-bold text-[#FFF2BF] tracking-wide flex items-center gap-1.5">
              <span>Ismail al-Jazari (1136–1206)</span>
              <span className="text-[#C59333] hidden md:inline">• The Book of Knowledge</span>
            </h1>
            <span className="text-[10px] text-[#FAF6ED]/70 font-serif italic">
              {currentSpread === 0 
                ? 'Closed Cover (Single Codex View)' 
                : currentSpread === totalSpreads 
                  ? 'Closed Back Cover (Epilogue)' 
                  : `Spread ${currentSpread} of ${totalSpreads - 1} • Facing Folios (Verso & Recto)`}
            </span>
          </div>
        </div>

        {/* Audio Mute & Nav controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`p-2 rounded-lg border transition-all ${
              isMuted 
                ? 'bg-red-900/30 border-red-500/40 text-red-300' 
                : 'bg-[#C59333]/20 border-[#C59333]/50 text-[#E4B24B] hover:bg-[#C59333]/35'
            }`}
            title={isMuted ? 'Unmute paper sounds' : 'Mute page turning audio'}
            aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>

          <button
            onClick={handleRiffleClose}
            className="p-2 rounded-lg bg-black/40 hover:bg-black/60 border border-white/15 text-[#FAF6ED]/80 hover:text-white transition-colors"
            title="Close Book (Riffle to Cover)"
            aria-label="Close book"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Table of Contents Drawer */}
      {showToc && (
        <div className="absolute top-16 left-4 z-40 w-80 max-h-[80vh] overflow-y-auto bg-[#152023] border-2 border-[#C59333] rounded-xl shadow-2xl p-3.5 text-xs animate-fadeIn manuscript-scroll">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#C59333]/30">
            <span className="font-display font-bold text-[#E4B24B] uppercase tracking-wider">
              Manuscript Folio Index
            </span>
            <button
              onClick={() => setShowToc(false)}
              className="text-white/60 hover:text-white text-xs px-2 py-0.5 rounded"
            >
              ✕
            </button>
          </div>
          <div className="space-y-1 font-body">
            {tocEntries.map((item, idx) => (
              <button
                key={idx}
                onClick={() => goToSpread(item.spread)}
                className={`w-full text-left p-2 rounded flex items-center justify-between transition-colors ${
                  currentSpread === item.spread
                    ? 'bg-[#C59333]/30 text-[#FFF2BF] font-bold border border-[#C59333]/50'
                    : 'text-[#FAF6ED]/85 hover:bg-[#C59333]/15 hover:text-[#FFF2BF]'
                }`}
              >
                <div className="flex flex-col">
                  <span className="leading-tight">{item.title}</span>
                  <span className="text-[9px] text-[#C59333] font-mono">{item.tag}</span>
                </div>
                <span className="text-[10px] text-[#E4B24B] font-mono ml-2">Turn &rarr;</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* MAIN BOOK STAGE */}
      <main className="book-stage relative flex-1 w-full max-w-5xl flex items-center justify-center my-auto min-h-[560px] md:min-h-[640px]">
        {/* SPREAD 0: CLOSED FRONT COVER — SINGLE FULL PAGE */}
        {currentSpread === 0 && (
          <div className="book-container is-closed-cover w-full max-w-md md:max-w-lg h-[540px] md:h-[610px] rounded-2xl shadow-[0_25px_65px_rgba(0,0,0,0.9)] animate-fadeIn">
            <CoverPage onOpenBook={() => goToSpread(1)} />
          </div>
        )}

        {/* SPREAD 10: CLOSED BACK COVER — SINGLE FULL PAGE */}
        {currentSpread === 10 && (
          <div className="book-container is-closed-back w-full max-w-md md:max-w-lg h-[540px] md:h-[610px] rounded-2xl shadow-[0_25px_65px_rgba(0,0,0,0.9)] animate-fadeIn">
            <BackCoverPage onReturnToCover={() => goToSpread(0)} />
          </div>
        )}

        {/* SPREADS 1 to 9: DYNAMIC SPREAD ENGINE WITH POPULATED LEFT & RIGHT SIDES */}
        {currentSpread >= 1 && currentSpread <= 9 && activeSpreadConfig && (
          <div 
            className="book-container is-open-spread relative w-full max-w-5xl h-[560px] md:h-[630px] rounded-2xl shadow-[0_25px_70px_rgba(0,0,0,0.85)] flex flex-row overflow-hidden border-2 border-[#C59333]/50 bg-[#F3EBD9]"
          >
            {/* LEFT PAGE (Verso) - Populated in the left half */}
            <div 
              className={`book-page-left relative w-1/2 h-full overflow-hidden shadow-inner spine-shadow-left cursor-pointer transition-all duration-300 ${
                turningSheetIndex !== null && flipDirection === 'backward' ? 'is-active-turn' : ''
              }`}
              style={{
                zIndex: turningSheetIndex !== null && flipDirection === 'backward' ? 100 : 10
              }}
              onClick={turnBackward}
              onTransitionEnd={(e) => handleSheetTransitionEnd(e, currentSpread - 1)}
              title="Click left page to turn backward"
            >
              {activeSpreadConfig.renderLeft({
                onInspect: setSelectedFolio,
                goToSpread,
                handleRiffleClose
              })}
            </div>

            {/* Central Book Spine Fold Seam (Real Physical Codex Binding) */}
            <div className="absolute top-0 bottom-0 left-1/2 w-[3px] -ml-[1.5px] bg-gradient-to-b from-[#C59333]/70 via-[#3B2507]/90 to-[#C59333]/70 z-30 pointer-events-none shadow-[0_0_12px_rgba(0,0,0,0.8)]" />

            {/* RIGHT PAGE (Recto) - Populated in the right half */}
            <div 
              className={`book-page-right relative w-1/2 h-full overflow-hidden shadow-inner spine-shadow-right cursor-pointer transition-all duration-300 ${
                turningSheetIndex !== null && flipDirection === 'forward' ? 'is-active-turn' : ''
              }`}
              style={{
                zIndex: turningSheetIndex !== null && flipDirection === 'forward' ? 100 : 10
              }}
              onClick={turnForward}
              onTransitionEnd={(e) => handleSheetTransitionEnd(e, currentSpread)}
              title="Click right page to turn forward"
            >
              {activeSpreadConfig.renderRight({
                onInspect: setSelectedFolio,
                goToSpread,
                handleRiffleClose
              })}
            </div>
          </div>
        )}
      </main>

      {/* Bottom Navigation Ribbon */}
      <footer className="w-full max-w-5xl flex items-center justify-between px-3 md:px-5 py-2.5 bg-[#121A1D]/90 backdrop-blur-md border border-[#C59333]/30 rounded-xl shadow-lg z-30 mt-2">
        {/* Previous Button */}
        <button
          onClick={turnBackward}
          disabled={currentSpread <= 0 || isRiffling}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-display font-bold text-xs md:text-sm border transition-all ${
            currentSpread <= 0 || isRiffling
              ? 'opacity-35 border-white/10 text-white/40 cursor-not-allowed bg-transparent'
              : 'bg-[#C59333]/20 hover:bg-[#C59333]/35 border-[#C59333]/60 text-[#E4B24B] shadow hover:scale-105 active:scale-95'
          }`}
          aria-label="Previous Page"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous</span>
        </button>

        {/* Spread Navigation Dots */}
        <div className="flex items-center gap-1.5 md:gap-2">
          {Array.from({ length: totalSpreads + 1 }).map((_, i) => (
            <button
              key={i}
              onClick={() => goToSpread(i)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                currentSpread === i
                  ? 'w-7 bg-[#E4B24B] shadow-[0_0_8px_rgba(228,178,75,0.7)]'
                  : 'w-2 bg-white/20 hover:bg-white/40'
              }`}
              title={`Jump to spread ${i}`}
              aria-label={`Jump to spread ${i}`}
            />
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={turnForward}
          disabled={currentSpread >= totalSpreads || isRiffling}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl font-display font-bold text-xs md:text-sm border transition-all ${
            currentSpread >= totalSpreads || isRiffling
              ? 'opacity-35 border-white/10 text-white/40 cursor-not-allowed bg-transparent'
              : 'bg-[#E4B24B] hover:bg-[#F4CF74] text-[#12161A] border-[#FFF0B0] shadow-[0_2px_12px_rgba(228,178,75,0.4)] hover:scale-105 active:scale-95'
          }`}
          aria-label="Next Page"
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </footer>

      {/* Folio Modal Inspector */}
      {selectedFolio && (
        <FolioModal
          folio={selectedFolio}
          onClose={() => setSelectedFolio(null)}
        />
      )}
    </div>
  );
};
