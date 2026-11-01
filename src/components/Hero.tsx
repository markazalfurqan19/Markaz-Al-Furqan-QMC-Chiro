import React from 'react';
import { 
  FileSignature, 
  GraduationCap, 
  HeartHandshake, 
  Award, 
  ShieldCheck, 
  Sparkles, 
  BookMarked,
  Edit3
} from 'lucide-react';
import { SiteContentConfig } from '../types';

interface HeroProps {
  onOpenAdmission: () => void;
  onGoToPortal: () => void;
  onGoToCampaign: () => void;
  siteContent?: SiteContentConfig;
  isOwnerMode?: boolean;
  onEditHero?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenAdmission,
  onGoToPortal,
  onGoToCampaign,
  siteContent,
  isOwnerMode,
  onEditHero
}) => {
  const badgeText = siteContent?.heroBadge || 'Vision 2030 Regional Excellence • Chiro, Ethiopia';
  const headline = siteContent?.heroTitle || 'Preserving the Divine Words with Precision & Character';
  const subText = siteContent?.heroSub || 'Markazul Furqan in Chiro provides rigorous Sabaq, Sabqi, and Manzil instruction, authentic Tajweed, and comprehensive Arabic language under the direct leadership of Ustaz Kadir Hamza Siyum.';
  const quranArabic = siteContent?.quranAyahArabic || 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا';
  const quranTrans = siteContent?.quranAyahTranslation || '"And recite the Qur\'an with measured, rhythmic recitation." — Surah Al-Muzzammil (73:4)';

  return (
    <section className="islamic-pattern text-white py-20 px-4 sm:px-8 relative overflow-hidden border-b border-[#D4AF37]/30">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/30 pointer-events-none" />

      {/* Owner Edit Floating Button */}
      {isOwnerMode && (
        <div className="absolute top-4 right-4 z-20">
          <button
            onClick={onEditHero}
            className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 px-3.5 py-1.5 rounded-full text-xs font-black shadow-lg flex items-center gap-1.5 transition transform hover:scale-105"
            title="Edit Hero text and Quranic verse"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Hero Section</span>
          </button>
        </div>
      )}

      <div className="max-w-5xl mx-auto text-center relative z-10">
        {/* Regional Excellence Badge */}
        <div className="inline-flex items-center gap-2 bg-[#D4AF37]/20 border border-[#D4AF37] text-[#D4AF37] text-xs font-bold px-4 py-1.5 rounded-full mb-6 uppercase tracking-wider backdrop-blur-sm shadow-sm">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{badgeText}</span>
        </div>

        {/* Main Title */}
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight mb-4 leading-tight">
          {headline}
        </h2>

        {/* Sacred Arabic Quranic Inscription */}
        <div className="my-6 py-3 px-4 bg-emerald-950/40 rounded-2xl border border-[#D4AF37]/30 inline-block max-w-2xl backdrop-blur-sm">
          <p className="font-quran text-2xl sm:text-3xl md:text-4xl text-[#D4AF37] leading-relaxed select-none">
            {quranArabic}
          </p>
          <p className="text-xs sm:text-sm text-emerald-200 mt-1 italic">
            {quranTrans}
          </p>
        </div>

        {/* Overview Description */}
        <p className="text-sm sm:text-base md:text-lg text-emerald-100/90 max-w-3xl mx-auto mb-8 font-normal leading-relaxed">
          {subText}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          <button
            onClick={onOpenAdmission}
            className="bg-[#D4AF37] hover:bg-[#E9C46A] text-[#212529] text-sm sm:text-base font-extrabold px-7 py-3.5 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
          >
            <FileSignature className="w-5 h-5 text-amber-950" />
            <span>Apply for 2018/2019 E.C.</span>
          </button>

          <button
            onClick={onGoToPortal}
            className="bg-white/10 hover:bg-white/20 text-white border border-white/30 text-sm sm:text-base font-semibold px-7 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center gap-2"
          >
            <GraduationCap className="w-5 h-5 text-[#D4AF37]" />
            <span>Mu'allim & Student Portal</span>
          </button>

          <button
            onClick={onGoToCampaign}
            className="bg-[#0A3622]/90 hover:bg-[#0A3622] text-[#D4AF37] border border-[#D4AF37]/50 text-sm sm:text-base font-semibold px-6 py-3.5 rounded-xl transition-all flex items-center gap-2"
          >
            <HeartHandshake className="w-5 h-5" />
            <span>Vision 2030 Campaign</span>
          </button>
        </div>

        {/* Feature Highlights Pills */}
        <div className="flex flex-wrap justify-center gap-3 pt-4 text-xs text-emerald-200/90">
          <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
            <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
            Full Hifz Sanad Track
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
            <BookMarked className="w-4 h-4 text-[#D4AF37]" />
            3-Tier Memory Retention System
          </span>
          <span className="flex items-center gap-1.5 bg-emerald-900/60 px-3 py-1.5 rounded-lg border border-emerald-700/50">
            <Award className="w-4 h-4 text-[#D4AF37]" />
            Official Certified Haffaz Certificates
          </span>
        </div>
      </div>
    </section>
  );
};
