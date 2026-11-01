import React from 'react';
import { BookOpen, MapPin, Mail, Phone, Heart } from 'lucide-react';

interface FooterProps {
  onGoToPortal: () => void;
  onOpenAdmission: () => void;
  onOpenCloudConfig: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onGoToPortal,
  onOpenAdmission,
  onOpenCloudConfig
}) => {
  return (
    <footer className="bg-[#0A3622] text-white border-t-2 border-[#D4AF37]/50 pt-16 pb-12 px-4 sm:px-8 no-print">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Identity */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#0F5132] flex items-center justify-center text-[#D4AF37] border border-[#D4AF37]/40 shadow">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] tracking-widest uppercase font-bold text-[#D4AF37] block">
                  Chiro • Oromia • Ethiopia
                </span>
                <h4 className="text-xl font-black text-white tracking-tight">
                  MARKAZUL FURQAN
                </h4>
                <p className="text-xs text-emerald-200/80">Quran Memorization & Arabic Studies Center</p>
              </div>
            </div>

            <p className="text-xs text-emerald-100/80 max-w-md leading-relaxed">
              Dedicated to upholding authentic Quranic recitation, unbroken Sanad lineage, and exemplary Islamic character under the guidance of Ustaz Kadir Hamza Siyum.
            </p>

            <div className="py-2 px-3 bg-emerald-950/60 rounded-xl border border-emerald-800/80 inline-block">
              <p className="font-quran text-base text-[#D4AF37] text-center">
                اللَّهُمَّ اجْعَلْنَا مِنْ أَهْلِ الْقُرْآنِ الَّذِينَ هُمْ أَهْلُكَ وَخَاصَّتُكَ
              </p>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Institutional Links
            </h5>
            <ul className="space-y-2 text-xs text-emerald-100/90 font-medium">
              <li>
                <a href="#about" className="hover:text-[#D4AF37] transition">About Center & Leadership</a>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#D4AF37] transition">Curriculum & 3-Tier Hifz</a>
              </li>
              <li>
                <a href="#quran-explorer" className="hover:text-[#D4AF37] transition">30 Juz & Tajweed Guide</a>
              </li>
              <li>
                <a href="#campaign" className="hover:text-[#D4AF37] transition">Vision 2030 (ETB 4.5M Target)</a>
              </li>
              <li>
                <button onClick={onOpenAdmission} className="hover:text-[#D4AF37] text-left transition font-semibold text-[#D4AF37]">
                  Enroll Student (2018/2019 E.C.)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Portal & Support */}
          <div>
            <h5 className="text-xs font-bold uppercase tracking-widest text-[#D4AF37] mb-4">
              Academic & Cloud
            </h5>
            <ul className="space-y-2 text-xs text-emerald-100/90 font-medium">
              <li>
                <button onClick={onGoToPortal} className="hover:text-[#D4AF37] transition font-bold text-white flex items-center gap-1.5">
                  <span>Student & Mu'allim Portal</span>
                  <span className="bg-emerald-700 text-[10px] px-1.5 py-0.2 rounded">Live</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenCloudConfig} className="hover:text-[#D4AF37] transition">
                  Cloud Sync & Webhook Setup
                </button>
              </li>
              <li>
                <span className="text-emerald-400/80 block mt-3 text-[11px]">Direct Secretariat:</span>
                <a href="mailto:markazalfurqan19@gmail.com" className="text-white hover:text-[#D4AF37] transition font-bold block">
                  markazalfurqan19@gmail.com
                </a>
              </li>
              <li className="text-[11px] text-emerald-200">
                Chiro, West Hararghe, Oromia, Ethiopia
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-emerald-900/80 flex flex-col sm:flex-row justify-between items-center text-xs text-emerald-300/70 gap-3">
          <div>
            © {new Date().getFullYear()} Markazul Furqan Quran Memorization Center. All rights reserved.
          </div>
          <div className="flex items-center gap-1 text-[11px]">
            <span>Empowering generations through Quranic Excellence in Chiro, Ethiopia</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
