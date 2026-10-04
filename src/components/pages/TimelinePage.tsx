import React, { useEffect, useState } from 'react';
import { TIMELINE_EVENTS } from '../../data/manuscriptData';
import { Compass, Castle, Crown, Cog, BookOpen, Award, Sparkles, MapPin } from 'lucide-react';

export const TimelinePage: React.FC = () => {
  const [hasSettled, setHasSettled] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSettled(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const getIcon = (name: string) => {
    switch (name) {
      case 'Compass': return <Compass className="w-3 h-3" />;
      case 'Castle': return <Castle className="w-3 h-3" />;
      case 'Crown': return <Crown className="w-3 h-3" />;
      case 'Cog': return <Cog className="w-3 h-3" />;
      case 'BookOpen': return <BookOpen className="w-3 h-3" />;
      case 'Award': return <Award className="w-3 h-3" />;
      default: return <Sparkles className="w-3 h-3" />;
    }
  };

  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-4 sm:p-5 md:p-6 flex flex-col justify-between overflow-y-auto manuscript-scroll spine-shadow-left">
      {/* Header Banner */}
      <div className="border-b-2 border-[#C59333]/40 pb-1.5 mb-2 flex items-center justify-between">
        <div>
          <span className="text-[10px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Chapter II • Taqwīm al-Injāzāt
          </span>
          <h2 className="text-sm sm:text-base md:text-lg font-display font-black text-[#133D3B] leading-tight">
            Chronicle of Milestones (1136–1206)
          </h2>
        </div>
        <div className="text-right shrink-0">
          <span className="font-arabic text-sm sm:text-base text-[#9E2A2B] font-bold">
            مَحَطَّاتُ حَيَاتِهِ
          </span>
          <div className="text-[9px] text-[#5C4A38] font-mono">Folio 2v</div>
        </div>
      </div>

      {/* Main Content: Map Inset + Timeline Stream */}
      <div className="flex flex-col gap-2 my-auto">
        {/* Top Context Banner: Upper Mesopotamia / Artuqid Court */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-2 items-center bg-[#FAF6ED] p-2 rounded-xl border border-[#C59333]/40 shadow-sm">
          {/* Historical Map/Citadel Vector Inset */}
          <div className="sm:col-span-4 flex flex-col items-center bg-[#EAE0CA] p-1.5 rounded-lg border border-[#C59333]/50">
            <svg viewBox="0 0 140 85" className="w-full h-auto max-h-[65px]" xmlns="http://www.w3.org/2000/svg">
              <rect width="140" height="85" fill="#F4EBD9" rx="2" />
              {/* Tigris River winding path */}
              <path d="M 10,20 Q 50,55 90,30 T 135,75" fill="none" stroke="#3B8B85" strokeWidth="3" opacity="0.75" />
              {/* Diyarbakır Amid Fortress City Icon */}
              <rect x="52" y="32" width="36" height="24" fill="#D8A53B" stroke="#6E4A14" strokeWidth="1.2" rx="2" />
              <polygon points="52,32 70,20 88,32" fill="#9E2A2B" stroke="#6E4A14" strokeWidth="1" />
              <circle cx="70" cy="44" r="3" fill="#FFF2BD" />
              <text x="70" y="74" fill="#5C4A38" fontSize="7" fontFamily="'EB Garamond', serif" textAnchor="middle" fontWeight="bold">
                Amid Citadel (Tigris Basin)
              </text>
            </svg>
            <span className="text-[8.5px] text-[#5C4A38] font-serif italic text-center mt-0.5">
              Jazirat ibn Umar & Amid Citadel
            </span>
          </div>

          <div className="sm:col-span-8 flex flex-col gap-1">
            <div className="text-[10px] font-display font-bold text-[#9E2A2B] uppercase flex items-center gap-1">
              <MapPin className="w-3 h-3 text-[#C59333]" />
              25 Years of Imperial Royal Engineering
            </div>
            <p className="text-[10.5px] font-body text-[#3A2C1E] leading-relaxed">
              Serving three successive Artuqid monarchs across a quarter century, al-Jazari directed royal hydraulics, automated court spectacles, and municipal water supply systems in Diyarbakır.
            </p>
          </div>
        </div>

        {/* Vertical Animated Timeline with Staggered Settlement */}
        <div className="relative pl-5 pr-1 py-0.5">
          {/* Continuous Central Golden Timeline Spine */}
          <div className="absolute left-[9px] top-1.5 bottom-1.5 w-0.5 bg-gradient-to-b from-[#C59333] via-[#9E2A2B] to-[#C59333]" />

          <div className="space-y-1.5">
            {TIMELINE_EVENTS.map((item, idx) => (
              <div 
                key={idx} 
                className="relative flex items-start gap-2.5 transition-all duration-700 ease-out"
                style={{
                  opacity: hasSettled ? 1 : 0,
                  transform: hasSettled ? 'translateX(0) translateY(0)' : 'translateX(20px) translateY(8px)',
                  transitionDelay: `${idx * 90}ms`
                }}
              >
                {/* Timeline Node Icon */}
                <div className="relative -ml-[19px] w-5 h-5 rounded-full bg-[#133D3B] border-2 border-[#C59333] text-[#E4B24B] flex items-center justify-center shadow-sm shrink-0">
                  {getIcon(item.iconName)}
                </div>

                {/* Event Card */}
                <div className="flex-1 bg-[#FAF6ED]/95 hover:bg-[#FAF6ED] rounded-lg border border-[#C59333]/30 p-1.5 sm:p-2 shadow-sm transition-all hover:border-[#9E2A2B]">
                  <div className="flex flex-wrap items-baseline justify-between gap-1">
                    <div className="flex items-center gap-1.5">
                      <span className="font-display font-black text-[11px] text-[#9E2A2B]">
                        {item.year}
                      </span>
                      <h3 className="font-display font-bold text-[11px] text-[#133D3B]">
                        {item.title}
                      </h3>
                    </div>
                    {item.arabicSubtitle && (
                      <span className="font-arabic text-[10px] text-[#C59333] font-bold">
                        {item.arabicSubtitle}
                      </span>
                    )}
                  </div>
                  <p className="text-[10px] font-body text-[#423427] leading-relaxed mt-0.5">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer Colophon */}
      <div className="border-t border-[#C59333]/30 pt-1 mt-1.5 flex items-center text-[9.5px] text-[#6B543D]">
        <span>Artuqid Engineering Dynasty (1136–1206 CE)</span>
      </div>
    </div>
  );
};
