import React from 'react';
import { 
  Quote, 
  ShieldCheck, 
  Award, 
  BookOpen, 
  CheckCircle, 
  GraduationCap,
  Edit3
} from 'lucide-react';
import { SiteContentConfig } from '../types';
import { OFFICIAL_LOGO_URL } from '../data/initialData';

interface LeadershipProps {
  siteContent?: SiteContentConfig;
  isOwnerMode?: boolean;
  onEditLeadership?: () => void;
}

export const Leadership: React.FC<LeadershipProps> = ({
  siteContent,
  isOwnerMode,
  onEditLeadership
}) => {
  const dirName = siteContent?.directorName || 'Ustaz Kadir Hamza Siyum';
  const dirTitle = siteContent?.directorTitle || 'Founder & Directorate Chair';
  const dirQuote = siteContent?.directorQuote || '"Our mission is to produce individuals who do not merely memorize the letter of the text, but embody the character, ethics, and mercy of the Holy Qur\'an with academic excellence."';

  return (
    <section id="about" className="py-20 px-4 sm:px-8 bg-[#F8F9FA] border-b border-gray-200 relative">
      {/* Owner Edit Floating Button */}
      {isOwnerMode && (
        <div className="max-w-6xl mx-auto flex justify-end mb-4">
          <button
            onClick={onEditLeadership}
            className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 transition transform hover:scale-105"
            title="Edit Leadership title and personal quote"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Leadership & Quote</span>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
          
          {/* Left Column: Ustaz Kadir Hamza Siyum Profile with Official Center Emblem */}
          <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-lg mb-6 mx-auto bg-white p-1 ring-4 ring-emerald-50">
                <img 
                  src={OFFICIAL_LOGO_URL} 
                  alt="Markazul Furqan Official Emblem" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              
              <div className="text-center mb-6">
                <span className="text-[10px] font-black uppercase tracking-widest text-[#0F5132] bg-emerald-100 px-3 py-1 rounded-full">
                  {dirTitle}
                </span>
                <h4 className="text-2xl font-black text-gray-900 mt-2">
                  {dirName}
                </h4>
                <p className="text-xs text-gray-500 font-semibold mt-0.5">
                  Senior Reciter & Director, Markazul Furqan
                </p>
                <div className="text-[11px] text-emerald-800 font-medium mt-1">
                  Chiro, West Hararghe, Ethiopia
                </div>
              </div>

              {/* Quote */}
              <div className="bg-emerald-50/70 border-l-4 border-[#D4AF37] p-4 rounded-r-2xl my-4 relative">
                <Quote className="w-6 h-6 text-[#D4AF37] opacity-60 absolute top-2 right-2" />
                <p className="text-xs italic text-gray-700 leading-relaxed font-medium">
                  {dirQuote}
                </p>
              </div>
            </div>

            <div className="border-t border-gray-100 pt-4 space-y-2 text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Verified Sanad in Hafs 'an 'Asim</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-emerald-600" />
                <span>Over 15 Years of Tahfeez Leadership</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-emerald-600" />
                <span>Personal Oversight of All Khatm Aspirants</span>
              </div>
            </div>
          </div>

          {/* Right 2 Columns: Institutional Vision & Faculty Standards */}
          <div className="lg:col-span-2 space-y-6 flex flex-col justify-between">
            <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
              <span className="text-xs font-bold text-[#0F5132] uppercase tracking-wider">
                Institutional Mandate
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 mt-1 mb-4">
                A Beacon of Classical Quranic Scholarship in Eastern Ethiopia
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-4">
                Founded in Chiro, West Hararghe, <strong>Markazul Furqan</strong> stands at the nexus of classical Islamic heritage and modern academic accountability. We serve hundreds of aspiring huffaz from across Oromia and neighboring regions, instilling both technical mastery and spiritual rectitude.
              </p>
              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
                Every aspirant is paired with a specialized Mu'allim. Progress is systematically logged into our institutional ledger every single morning, guaranteeing that parents and guardians receive transparent, verifiable quarterly transcripts and authenticated graduation certificates.
              </p>
            </div>

            {/* Faculty Guarantees */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-emerald-900 text-white p-5 rounded-2xl border border-emerald-700/60 shadow-sm">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm mb-2">
                  <CheckCircle className="w-4 h-4" />
                  <span>100% Certified Faculty</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Every Mu'allim holds an unbroken oral transmission chain (Sanad) tracing back through recognized scholars of Qira'at.
                </p>
              </div>

              <div className="bg-[#0A3622] text-white p-5 rounded-2xl border border-[#D4AF37]/40 shadow-sm">
                <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm mb-2">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Transparent Accountability</span>
                </div>
                <p className="text-xs text-emerald-100/90 leading-relaxed">
                  Daily Sabaq marks, Sabqi repetitions, and Manzil reviews are recorded in our digital registry with instant parent export.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
