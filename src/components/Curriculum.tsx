import React from 'react';
import { 
  BookOpenCheck, 
  RefreshCw, 
  Layers, 
  CheckCircle2, 
  Clock, 
  GraduationCap, 
  Languages, 
  Sparkles 
} from 'lucide-react';

interface CurriculumProps {
  onOpenAdmission: () => void;
}

export const Curriculum: React.FC<CurriculumProps> = ({ onOpenAdmission }) => {
  return (
    <section id="programs" className="py-20 px-4 sm:px-8 bg-[#F8F9FA] border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black text-[#0F5132] uppercase tracking-wider bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Pedagogical Excellence & Authenticity
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Our Core Curricular Methodology
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Preservation of the Qur'an requires more than initial memorization; it demands a structured,
            mathematical cycle of revision that prevents forgetfulness and fosters crystalline fluency.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {/* 1. Sabaq */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-[#0F5132] text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
              <BookOpenCheck className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xl font-black text-gray-900">Sabaq</h4>
              <span className="font-quran text-2xl text-[#0F5132] font-bold">السبق</span>
            </div>
            <div className="text-xs font-bold text-[#D4AF37] uppercase tracking-wider mb-3">
              Daily New Lesson
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Daily new memorization of 1 to 2 pages. Each Ayah is scrutinized for precise phonetic articulation (Makharij), nasalization (Ghunnah), and correct vowel lengthening before passing.
            </p>
            <ul className="text-xs text-gray-700 space-y-2 border-t border-gray-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Strict 1-on-1 testing with assigned Mu'allim</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Recorded daily in student digital ledger</span>
              </li>
            </ul>
          </div>

          {/* 2. Sabqi */}
          <div className="bg-white p-7 rounded-3xl border-2 border-[#D4AF37]/50 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-800 text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xl font-black text-gray-900">Sabqi</h4>
              <span className="font-quran text-2xl text-[#D4AF37] font-bold">السبقي</span>
            </div>
            <div className="text-xs font-bold text-amber-800 uppercase tracking-wider mb-3">
              Short-Term Consolidation
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Recitation of the last 5 to 10 pages memorized. This vital bridge shifts freshly committed verses from fragile short-term working memory into deep, subconscious neurological pathways.
            </p>
            <ul className="text-xs text-gray-700 space-y-2 border-t border-gray-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Zero tolerance for hesitation or stumbles</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Prerequisite before offering today's Sabaq</span>
              </li>
            </ul>
          </div>

          {/* 3. Manzil */}
          <div className="bg-white p-7 rounded-3xl border border-gray-200 shadow-sm hover:shadow-md transition-all relative overflow-hidden group">
            <div className="w-12 h-12 bg-emerald-100 rounded-2xl flex items-center justify-center text-[#0F5132] text-xl font-bold mb-4 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <div className="flex items-center justify-between mb-1">
              <h4 className="text-xl font-black text-gray-900">Manzil / Dhor</h4>
              <span className="font-quran text-2xl text-[#0F5132] font-bold">المنزل</span>
            </div>
            <div className="text-xs font-bold text-[#0F5132] uppercase tracking-wider mb-3">
              Lifelong Cumulative Cycle
            </div>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
              Continuous rotation of previously completed Juz'. Advanced students recite between 1 to 3 completed Juz' every single day, completing the entire Holy Qur'an every 10 to 30 days.
            </p>
            <ul className="text-xs text-gray-700 space-y-2 border-t border-gray-100 pt-4">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Guarantees permanent, effortless recall</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Mandatory for graduation certification</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Academic Program Tracks */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
            <div>
              <span className="text-xs font-bold text-[#0F5132] uppercase tracking-wider">
                Enrollment Opportunities
              </span>
              <h4 className="text-2xl font-black text-gray-900 mt-1">
                Academic Programs & Halaqas
              </h4>
            </div>
            <button
              onClick={onOpenAdmission}
              className="bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-bold px-5 py-2.5 rounded-xl transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span>Submit Admission Application</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <GraduationCap className="w-6 h-6 text-[#0F5132] mb-3" />
              <h5 className="font-extrabold text-gray-900 text-sm mb-1">Full-Time Tahfeez</h5>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Intensive 2 to 3-year track for full 30 Juz memorization with daily lodging and full supervision.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 6:00 AM – 8:30 PM
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <BookOpenCheck className="w-6 h-6 text-[#0F5132] mb-3" />
              <h5 className="font-extrabold text-gray-900 text-sm mb-1">Tajweed & Tarteel</h5>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Rigorous study of Al-Jazariyyah, Tuhfat al-Atfal, and practical application with Sanad authorization.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 4:00 PM – 6:30 PM
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <Languages className="w-6 h-6 text-[#0F5132] mb-3" />
              <h5 className="font-extrabold text-gray-900 text-sm mb-1">Classical Arabic</h5>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Grammar (Nahw), Morphology (Sarf), and Quranic vocabulary comprehension to understand what is recited.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> 8:30 AM – 11:30 AM
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
              <RefreshCw className="w-6 h-6 text-[#0F5132] mb-3" />
              <h5 className="font-extrabold text-gray-900 text-sm mb-1">Weekend & Evening</h5>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                Flexible weekend curriculum designed for school students and working professionals in Chiro.
              </p>
              <div className="text-[11px] font-semibold text-emerald-800 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> Sat & Sun Full Day
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
