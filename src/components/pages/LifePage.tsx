import React from 'react';
import { User, ShieldAlert, Sparkles, MapPin, Feather } from 'lucide-react';

export const LifePage: React.FC = () => {
  return (
    <div className="relative w-full h-full parchment-bg text-[#2B2118] p-6 md:p-8 flex flex-col justify-between overflow-y-auto manuscript-scroll spine-shadow-right">
      {/* Illuminated Header */}
      <div className="border-b-2 border-[#C59333]/40 pb-3 mb-4 flex items-center justify-between">
        <div>
          <span className="text-[11px] uppercase tracking-widest font-display font-bold text-[#9E2A2B]">
            Chapter I • Al-Sīrah
          </span>
          <h2 className="text-2xl md:text-3xl font-display font-black text-[#133D3B]">
            His Life & Origins
          </h2>
        </div>
        <div className="text-right">
          <span className="font-arabic text-xl text-[#9E2A2B] font-bold">
            سِيرَةُ ابْنِ الرَّزَّازِ
          </span>
          <div className="text-[10px] text-[#5C4A38] font-mono">Folio 2r</div>
        </div>
      </div>

      {/* Main Content Grid: Portrait & 3 Bio Paragraphs */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start my-auto">
        {/* Modern Painted Portrait Image (5 Cols on desktop) */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="relative p-2 bg-[#E6D9BF] rounded-xl border-2 border-[#C59333] shadow-md w-full max-w-[240px]">
            {/* Illuminated Corner Accents */}
            <div className="absolute top-1 left-1 w-2.5 h-2.5 border-t-2 border-l-2 border-[#9E2A2B]" />
            <div className="absolute top-1 right-1 w-2.5 h-2.5 border-t-2 border-r-2 border-[#9E2A2B]" />
            <div className="absolute bottom-1 left-1 w-2.5 h-2.5 border-b-2 border-l-2 border-[#9E2A2B]" />
            <div className="absolute bottom-1 right-1 w-2.5 h-2.5 border-b-2 border-r-2 border-[#9E2A2B]" />

            <img
              src="/images/portrait.jpg"
              alt="Modern artistic representation of Ismail al-Jazari"
              className="w-full h-auto object-cover rounded-lg border border-[#C59333]/40 shadow-inner"
              onError={(e) => {
                (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/commons/0/0b/Ismail_al_jazari.jpg';
              }}
            />

            {/* MANDATORY CLEAR CAPTION */}
            <div className="mt-2 p-2 bg-[#F3E6CE] rounded border border-[#9E2A2B]/40 text-center">
              <div className="flex items-center justify-center gap-1 text-[10px] font-bold text-[#9E2A2B] uppercase tracking-wider">
                <ShieldAlert className="w-3 h-3 text-[#9E2A2B]" />
                Modern Illustration
              </div>
              <p className="text-[11px] text-[#5A4332] italic font-serif leading-tight mt-0.5">
                "A modern artist’s impression — no portrait from his own lifetime survives."
              </p>
            </div>
          </div>
        </div>

        {/* 3 Short Biography Paragraphs (7 Cols on desktop) */}
        <div className="md:col-span-7 flex flex-col gap-3.5 text-sm md:text-base leading-relaxed text-[#2D2218]">
          {/* Paragraph 1: Origins */}
          <p className="drop-cap font-body">
            Badīʿ al-Zamān Abū al-ʿIzz Ismāʿīl ibn al-Razzāz al-Jazarī was born circa 1136 CE in Upper Mesopotamia, in the region of Jazīrat ibn ʿUmar (modern-day Cizre, southeastern Turkey). The son of an accomplished court craftsman, he was raised in mechanical workshops and immersed from childhood in the artisanal traditions of metallurgy, horology, and carpentry.
          </p>

          {/* Paragraph 2: Chief Court Engineer */}
          <p className="font-body">
            Around 1174 CE, he entered royal service at the citadel of Amid (modern Diyarbakır) under the Artuqid Dynasty. Recognized for his unmatched precision, he was appointed <em>Raʾīs al-Aʿmāl</em> (Chief Engineer) around 1180 CE. For over three decades, he served three successive Artuqid sultans—Nūr al-Dīn Muḥammad, Quṭb al-Dīn Sukmān II, and Nāṣir al-Dīn Maḥmūd—architecting monumental palace waterworks, defensive mechanisms, and ceremonial automata.
          </p>

          {/* Paragraph 3: The Masterpiece Treatise & Death */}
          <p className="font-body">
            In 1206 CE, at the earnest request of Sultan Nāṣir al-Dīn Maḥmūd—who urged that his lifelong mechanical inventions not be lost to time—al-Jazari completed his magnum opus, <em>The Book of Knowledge of Ingenious Mechanical Devices</em>. Filled with fifty meticulously illustrated blueprints, the compendium became the definitive text of medieval automation. Al-Jazari died later that same year, leaving an indelible legacy as the grandfather of modern robotics.
          </p>
        </div>
      </div>

      {/* Chapter Colophon */}
      <div className="border-t border-[#C59333]/30 pt-2 flex items-center justify-between text-[11px] text-[#6B543D]">
        <span className="flex items-center gap-1">
          <MapPin className="w-3 h-3 text-[#9E2A2B]" />
          Diyarbakır Citadel & Upper Mesopotamia
        </span>
        <span className="font-display italic">Kitāb al-Ḥiyal al-Handasiyya (1206)</span>
      </div>
    </div>
  );
};
