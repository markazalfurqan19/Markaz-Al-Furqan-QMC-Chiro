import React from 'react';
import { Award, Users, Target, Layers } from 'lucide-react';

interface StatsBannerProps {
  totalStudents: number;
}

export const StatsBanner: React.FC<StatsBannerProps> = ({ totalStudents }) => {
  return (
    <section className="bg-[#0A3622] border-b border-[#D4AF37]/30 text-white py-8 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <div className="border-r border-emerald-800/60 last:border-none p-2">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-1">
            <Award className="w-5 h-5" />
            <span className="text-3xl sm:text-4xl font-black">38</span>
          </div>
          <div className="text-xs uppercase text-emerald-200 font-bold tracking-wider">
            2018 E.C. Haffaz Graduates
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">
            Full 30-Juz Certification
          </div>
        </div>

        <div className="border-r border-emerald-800/60 last:border-none p-2">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-1">
            <Users className="w-5 h-5" />
            <span className="text-3xl sm:text-4xl font-black">{totalStudents}</span>
          </div>
          <div className="text-xs uppercase text-emerald-200 font-bold tracking-wider">
            Active Aspirants Enrolled
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">
            Across 5 Academic Halaqas
          </div>
        </div>

        <div className="border-r border-emerald-800/60 last:border-none p-2">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-1">
            <Target className="w-5 h-5" />
            <span className="text-2xl sm:text-4xl font-black">ETB 4.5M</span>
          </div>
          <div className="text-xs uppercase text-emerald-200 font-bold tracking-wider">
            Vision 2030 Campus Goal
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">
            42% Funded & Mobilized
          </div>
        </div>

        <div className="p-2">
          <div className="flex items-center justify-center gap-2 text-[#D4AF37] mb-1">
            <Layers className="w-5 h-5" />
            <span className="text-3xl sm:text-4xl font-black">3-Tier</span>
          </div>
          <div className="text-xs uppercase text-emerald-200 font-bold tracking-wider">
            Hifz Retention System
          </div>
          <div className="text-[11px] text-emerald-400/80 mt-0.5">
            Sabaq • Sabqi • Manzil
          </div>
        </div>
      </div>
    </section>
  );
};
