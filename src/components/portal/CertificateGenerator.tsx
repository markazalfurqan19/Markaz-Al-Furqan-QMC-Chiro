import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Award, 
  QrCode, 
  CheckCircle2, 
  Share2, 
  Download, 
  Phone, 
  MessageCircle, 
  Send as TelegramIcon,
  Sparkles,
  BookOpen
} from 'lucide-react';
import { Student } from '../../types';
import { OFFICIAL_LOGO_URL } from '../../data/initialData';

interface CertificateGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
}

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  isOpen,
  onClose,
  student
}) => {
  const [certType, setCertType] = useState<'KHATM' | 'MILESTONE'>('KHATM');
  const [customMilestone, setCustomMilestone] = useState<number>(student?.juzLevel || 30);
  const [issueDate] = useState<string>(new Date().toLocaleDateString('en-GB'));
  const [hijriYear] = useState<string>('1448 A.H.');
  const [ethiopianYear] = useState<string>('2018 / 2019 E.C.');

  if (!isOpen || !student) return null;

  const isFullKhatm = certType === 'KHATM' || student.juzLevel === 30;
  const currentJuzCount = isFullKhatm ? 30 : (customMilestone || student.juzLevel);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-4 sm:p-8 shadow-2xl relative max-h-[96vh] overflow-y-auto">
        
        {/* Modal Controls Toolbar - Hidden during printing */}
        <div className="flex flex-wrap justify-between items-center pb-4 mb-6 border-b border-gray-200 no-print gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5132] text-[#D4AF37] flex items-center justify-center shadow-sm">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Hifz Completion Certificate Generator
              </h3>
              <p className="text-[11px] text-gray-500">
                Official authenticated document for {student.name} ({student.code})
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-bold">
              <button
                onClick={() => setCertType('KHATM')}
                className={`px-3 py-1.5 rounded-lg transition ${
                  certType === 'KHATM'
                    ? 'bg-[#0F5132] text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Khatm al-Qur'an (30 Juz)
              </button>
              <button
                onClick={() => {
                  setCertType('MILESTONE');
                  setCustomMilestone(student.juzLevel);
                }}
                className={`px-3 py-1.5 rounded-lg transition ${
                  certType === 'MILESTONE'
                    ? 'bg-[#D4AF37] text-gray-950 font-black shadow-xs'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Juz Milestone ({student.juzLevel} Juz)
              </button>
            </div>

            <button
              onClick={handlePrint}
              className="bg-[#0F5132] hover:bg-[#0A3622] text-white px-5 py-2.5 rounded-xl text-xs font-black transition shadow flex items-center gap-2"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print Certificate</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CERTIFICATE CONTAINER (Styled via HTML/CSS) */}
        <div 
          id="printable-report-area" 
          className="printable-certificate relative bg-amber-50/30 rounded-3xl p-6 sm:p-12 border-8 border-double border-[#D4AF37] shadow-xl overflow-hidden print:border-8 print:p-8"
        >
          {/* Watermark subtle pattern */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#0F5132_2px,transparent_2px)] [background-size:16px_16px]" />

          {/* Corner Calligraphic Ornaments */}
          <div className="absolute top-3 left-4 text-2xl text-[#D4AF37] font-quran select-none">❖</div>
          <div className="absolute top-3 right-4 text-2xl text-[#D4AF37] font-quran select-none">❖</div>
          <div className="absolute bottom-3 left-4 text-2xl text-[#D4AF37] font-quran select-none">❖</div>
          <div className="absolute bottom-3 right-4 text-2xl text-[#D4AF37] font-quran select-none">❖</div>

          {/* Islamic Header with Standard Size Official Logo */}
          <div className="text-center relative z-10 mb-6">
            <div className="flex justify-center mb-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl bg-white p-1 ring-4 ring-amber-100 flex-shrink-0">
                <img 
                  src={OFFICIAL_LOGO_URL} 
                  alt="Official Markazul Furqan Emblem" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <p className="font-quran text-2xl sm:text-3xl font-bold text-[#0F5132] leading-relaxed">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>
            <p className="font-quran text-base sm:text-lg text-[#D4AF37] font-semibold mt-0.5">
              {isFullKhatm 
                ? 'شَهَادَةُ إِتْمَامِ حِفْظِ الْقُرْآنِ الْكَرِيمِ كَامِلاً'
                : `شَهَادَةُ إِجَازَةِ حِفْظِ (${currentJuzCount}) أَجْزَاءٍ مِنَ الْقُرْآنِ`}
            </p>

            <div className="inline-block mt-3 bg-[#0F5132] text-white text-[11px] font-black uppercase tracking-widest px-4 py-1 rounded-full shadow-xs">
              MARKAZUL FURQAN QURAN MEMORIZATION CENTER
            </div>
            <p className="text-xs font-semibold text-gray-700 mt-1">
              Chiro, West Hararghe Zone, Oromia Region, Federal Democratic Republic of Ethiopia
            </p>
          </div>

          {/* Certificate Main Title */}
          <div className="text-center my-6 relative z-10">
            <h2 className="text-2xl sm:text-4xl font-black text-gray-950 tracking-tight uppercase font-serif">
              {isFullKhatm ? 'Certificate of Quran Memorization' : 'Certificate of Quranic Hifz Achievement'}
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2" />
          </div>

          {/* Preamble */}
          <p className="text-xs sm:text-sm text-gray-700 text-center max-w-2xl mx-auto leading-relaxed mb-6 relative z-10">
            By the grace and blessing of Allah the Almighty, and after comprehensive evaluation through the 
            systematic <strong>Sabaq</strong>, <strong>Sabqi</strong>, and <strong>Manzil</strong> pedagogical curriculum, 
            the Academic Directorate of Markazul Furqan hereby certifies that:
          </p>

          {/* Honoree Box */}
          <div className="text-center my-6 relative z-10">
            <div className="inline-block px-8 py-4 bg-white/95 rounded-2xl border-2 border-[#D4AF37] shadow-md min-w-[280px] sm:min-w-[420px]">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                This Certificate is Awarded To:
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0F5132] font-serif tracking-tight">
                {student.name}
              </h3>
              <div className="flex items-center justify-center gap-3 text-xs font-semibold text-gray-600 mt-1">
                <span>Registration Code: <strong className="font-mono text-gray-900">{student.code}</strong></span>
                <span>•</span>
                <span>Guardian: <strong className="text-gray-900">{student.guardianName}</strong></span>
              </div>
            </div>
          </div>

          {/* Citation Body */}
          <p className="text-xs sm:text-sm text-gray-800 text-center max-w-2xl mx-auto leading-relaxed font-medium mb-8 relative z-10">
            Has successfully memorized, recited from memory, and completed the oral examination with precision, 
            correct vocal articulation (Makharij), and rigorous application of the rules of Tajweed according to the canonical narration of{' '}
            <strong className="text-[#0F5132]">Hafs 'an 'Asim via the Shatibiyyah pathway</strong>, covering:
          </p>

          {/* Accomplishment Scope Badge */}
          <div className="text-center my-4 relative z-10">
            <span className="inline-block bg-emerald-50 border-2 border-[#0F5132] text-[#0F5132] px-6 py-2.5 rounded-2xl text-base sm:text-lg font-black shadow-xs">
              {isFullKhatm
                ? '★ Complete Holy Qur\'an — Full 30 Juz\' (Khatm al-Qur\'an) ★'
                : `★ ${currentJuzCount} Complete Juz\' of the Holy Qur\'an ★`}
            </span>
          </div>

          {/* Signatures & Institutional Seal Grid */}
          <div className="grid grid-cols-3 gap-4 pt-10 mt-8 border-t border-amber-300/80 items-end text-center relative z-10">
            
            {/* Left: Supervising Mu'allim */}
            <div>
              <div className="h-12 border-b-2 border-dashed border-gray-400 mb-2 flex items-end justify-center font-quran text-sm text-gray-600">
                توقيع المعلم المشرف
              </div>
              <span className="text-xs font-bold text-gray-900 block">Assigned Halaqah Mu'allim</span>
              <span className="text-[10px] text-gray-500">Board of Quranic Examiners</span>
            </div>

            {/* Center: Official Embossed Seal with Center Logo */}
            <div className="flex flex-col items-center justify-center">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-4 border-[#D4AF37] bg-white flex items-center justify-center p-1 shadow-md overflow-hidden ring-2 ring-amber-200">
                <img 
                  src={OFFICIAL_LOGO_URL} 
                  alt="Registrar Seal" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <span className="text-[9px] text-[#0F5132] font-black uppercase tracking-wider mt-1.5">
                Academic Registrar Seal
              </span>
            </div>

            {/* Right: Ustaz Kadir Hamza Siyum */}
            <div>
              <div className="h-12 border-b-2 border-dashed border-gray-400 mb-2 flex items-end justify-center font-quran font-bold text-base text-[#0F5132]">
                قادر حمزة سيوم
              </div>
              <span className="text-xs font-bold text-gray-900 block">Ustaz Kadir Hamza Siyum</span>
              <span className="text-[10px] text-[#0F5132] font-semibold">Founder & Directorate Chair</span>
            </div>

          </div>

          {/* Official Verification & Contact Footer */}
          <div className="mt-8 pt-4 border-t border-gray-200/90 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-600 gap-3 relative z-10">
            <div className="flex items-center gap-2">
              <QrCode className="w-6 h-6 text-gray-800 shrink-0" />
              <div className="text-left font-mono">
                <span className="font-bold block text-gray-900">CERTIFICATE HASH: MF-ET-{student.code}-{currentJuzCount}J</span>
                <span>Direct Verification: <strong className="text-gray-900">+251935097339</strong></span>
              </div>
            </div>

            <div className="text-center sm:text-right font-medium text-gray-600">
              <div>Session: <strong>{ethiopianYear}</strong> • <strong>{hijriYear}</strong></div>
              <div>Issued in Chiro, West Hararghe, Ethiopia on <strong>{issueDate}</strong></div>
            </div>
          </div>

        </div>

        {/* Quick Contact & Verification Card (Non-print) */}
        <div className="mt-6 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-between gap-4 text-xs no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F5132] text-white flex items-center justify-center shrink-0">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-extrabold text-gray-900 block">
                Official Center Secretariat & Verification Helpline:
              </span>
              <span className="font-mono font-bold text-[#0F5132] text-sm">+251935097339</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/251935097339"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href="https://t.me/+251935097339"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <TelegramIcon className="w-3.5 h-3.5" />
              <span>Telegram Chat</span>
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
