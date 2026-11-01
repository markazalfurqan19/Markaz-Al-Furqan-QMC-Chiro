import React, { useState, useEffect } from 'react';
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
  BookOpen,
  Calendar,
  UserCheck,
  Palette,
  ChevronDown,
  Search,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { Student } from '../../types';
import { OFFICIAL_LOGO_URL } from '../../data/initialData';

interface CertificateGeneratorProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  students?: Student[];
  onSelectStudent?: (student: Student) => void;
}

export type CertificateTheme = 'EMERALD_GOLD' | 'PARCHMENT_IVORY' | 'MIDNIGHT_AZURE';

export const CertificateGenerator: React.FC<CertificateGeneratorProps> = ({
  isOpen,
  onClose,
  student: initialStudent,
  students = [],
  onSelectStudent
}) => {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(initialStudent);
  const [certType, setCertType] = useState<'KHATM' | 'CURRENT_LEVEL' | 'CUSTOM_MILESTONE'>('CURRENT_LEVEL');
  const [customLevel, setCustomLevel] = useState<number>(initialStudent?.juzLevel || 1);
  const [theme, setTheme] = useState<CertificateTheme>('EMERALD_GOLD');
  const [studentSearch, setStudentSearch] = useState<string>('');
  const [showStudentDropdown, setShowStudentDropdown] = useState<boolean>(false);
  const [issueDate, setIssueDate] = useState<string>(new Date().toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }));
  const [hijriDate, setHijriDate] = useState<string>('Shawwal 1448 A.H.');
  const [ethiopianDate, setEthiopianDate] = useState<string>('Tikimt 2019 E.C.');
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Sync selectedStudent with initialStudent prop if changed
  useEffect(() => {
    if (initialStudent) {
      setSelectedStudent(initialStudent);
      setCustomLevel(initialStudent.juzLevel);
      if (initialStudent.juzLevel === 30) {
        setCertType('KHATM');
      } else {
        setCertType('CURRENT_LEVEL');
      }
    } else if (students.length > 0 && !selectedStudent) {
      setSelectedStudent(students[0]);
      setCustomLevel(students[0].juzLevel);
    }
  }, [initialStudent, students]);

  if (!isOpen) return null;

  const currentStudent = selectedStudent || (students.length > 0 ? students[0] : null);

  if (!currentStudent) {
    return (
      <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl p-6 text-center max-w-sm w-full">
          <p className="text-sm font-bold text-gray-700">No student selected for certificate generation.</p>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-[#0F5132] text-white rounded-xl text-xs font-bold"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const effectiveJuzCount = certType === 'KHATM' 
    ? 30 
    : certType === 'CURRENT_LEVEL' 
    ? currentStudent.juzLevel 
    : customLevel;

  const isFullKhatm = effectiveJuzCount === 30;

  const handlePrint = () => {
    window.print();
  };

  const handleShareOrCopy = () => {
    const certHash = `MF-ET-${currentStudent.code}-J${effectiveJuzCount}-${new Date().getFullYear()}`;
    const textToCopy = `Markazul Furqan Official Certificate\nStudent: ${currentStudent.name} (${currentStudent.code})\nEnrollment Date: ${currentStudent.enrollmentDate}\nAttained Level: Juz ${effectiveJuzCount} of 30\nVerification Hash: ${certHash}\nHelpline: +251935097339`;
    
    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const filteredStudentsList = students.filter(s => 
    s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
    s.code.toLowerCase().includes(studentSearch.toLowerCase())
  );

  // Theme-specific styling definitions
  const themeStyles = {
    EMERALD_GOLD: {
      bg: 'bg-[#FFFDF7]',
      outerBorder: 'border-[#0F5132]',
      innerBorder: 'border-[#D4AF37]',
      primaryText: 'text-[#0F5132]',
      accentText: 'text-[#B8860B]',
      ribbonBg: 'bg-[#0F5132]',
      ribbonText: 'text-[#F5DEB3]',
      badgeBg: 'bg-emerald-50/90 text-[#0F5132] border-[#0F5132]',
      watermarkColor: '#0F5132',
      sealColor: 'border-[#D4AF37] ring-amber-200 text-[#0F5132]'
    },
    PARCHMENT_IVORY: {
      bg: 'bg-[#FAF6EE]',
      outerBorder: 'border-[#B8860B]',
      innerBorder: 'border-[#8B6508]',
      primaryText: 'text-[#3E2723]',
      accentText: 'text-[#8B5A2B]',
      ribbonBg: 'bg-[#5C3A21]',
      ribbonText: 'text-[#FFF8DC]',
      badgeBg: 'bg-amber-100/80 text-[#5C3A21] border-[#B8860B]',
      watermarkColor: '#B8860B',
      sealColor: 'border-[#B8860B] ring-amber-300 text-[#5C3A21]'
    },
    MIDNIGHT_AZURE: {
      bg: 'bg-[#F8FAFC]',
      outerBorder: 'border-[#0F2942]',
      innerBorder: 'border-[#D4AF37]',
      primaryText: 'text-[#0F2942]',
      accentText: 'text-[#0284C7]',
      ribbonBg: 'bg-[#0F2942]',
      ribbonText: 'text-[#E0F2FE]',
      badgeBg: 'bg-sky-50 text-[#0F2942] border-[#0F2942]',
      watermarkColor: '#0F2942',
      sealColor: 'border-[#D4AF37] ring-sky-200 text-[#0F2942]'
    }
  }[theme];

  const verificationHash = `MF-ET-${currentStudent.code}-J${effectiveJuzCount}-${new Date().getFullYear()}`;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/75 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6">
      <div className="bg-white rounded-3xl max-w-5xl w-full p-4 sm:p-7 shadow-2xl relative max-h-[96vh] overflow-y-auto border border-gray-100">
        
        {/* ========================================================= */}
        {/* TOP CONTROLS & SETTINGS TOOLBAR (HIDDEN DURING PRINTING)   */}
        {/* ========================================================= */}
        <div className="border-b border-gray-200 pb-5 mb-6 space-y-4 no-print">
          <div className="flex flex-wrap justify-between items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-[#0F5132] text-[#D4AF37] flex items-center justify-center shadow-md">
                <Award className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg sm:text-xl font-black text-gray-900 tracking-tight">
                    Official Certificate Generation Studio
                  </h3>
                  <span className="bg-amber-100 text-amber-900 text-[10px] font-black uppercase px-2 py-0.5 rounded-full">
                    Printable PDF
                  </span>
                </div>
                <p className="text-xs text-gray-500">
                  Conferring accredited Quranic Sanad & Milestone Credentials for Markazul Furqan students
                </p>
              </div>
            </div>

            {/* Quick Actions (Print, Share, Close) */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrint}
                className="bg-[#0F5132] hover:bg-[#0A3622] text-white px-5 py-2.5 rounded-xl text-xs font-black transition shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                title="Print certificate or save as PDF directly from browser"
              >
                <Printer className="w-4 h-4 text-[#D4AF37]" />
                <span>Print / Save as PDF</span>
              </button>

              <button
                onClick={handleShareOrCopy}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer"
                title="Copy student certificate details"
              >
                {copiedLink ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span className="text-emerald-700">Copied!</span>
                  </>
                ) : (
                  <>
                    <Share2 className="w-4 h-4 text-gray-500" />
                    <span>Share</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="p-2.5 text-gray-400 hover:text-gray-700 rounded-xl hover:bg-gray-100 transition cursor-pointer"
                aria-label="Close generator"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Student Selector, Type Selector & Theme Picker Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 bg-gray-50 p-3 rounded-2xl border border-gray-200">
            {/* 1. Student Selector */}
            <div className="relative">
              <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">
                Selected Student:
              </label>
              {students.length > 0 ? (
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowStudentDropdown(!showStudentDropdown)}
                    className="w-full bg-white border border-gray-300 rounded-xl px-3 py-2 text-xs font-bold text-gray-900 flex items-center justify-between text-left shadow-xs hover:border-[#0F5132] transition"
                  >
                    <div className="truncate">
                      <span className="text-[#0F5132] font-mono mr-1.5">{currentStudent.code}</span>
                      <span>{currentStudent.name}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 shrink-0 ml-1" />
                  </button>

                  {showStudentDropdown && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-30 max-h-56 overflow-y-auto p-1.5">
                      <div className="p-1 mb-1 border-b border-gray-100 flex items-center gap-1.5">
                        <Search className="w-3.5 h-3.5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search student name or code..."
                          value={studentSearch}
                          onChange={(e) => setStudentSearch(e.target.value)}
                          className="w-full text-xs outline-none bg-transparent"
                          autoFocus
                        />
                      </div>
                      {filteredStudentsList.length === 0 ? (
                        <div className="text-[11px] text-gray-400 p-2 text-center">No students found</div>
                      ) : (
                        filteredStudentsList.map((st) => (
                          <button
                            key={st.id}
                            type="button"
                            onClick={() => {
                              setSelectedStudent(st);
                              setCustomLevel(st.juzLevel);
                              if (st.juzLevel === 30) setCertType('KHATM');
                              else setCertType('CURRENT_LEVEL');
                              onSelectStudent?.(st);
                              setShowStudentDropdown(false);
                            }}
                            className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition ${
                              st.id === currentStudent.id
                                ? 'bg-emerald-50 text-[#0F5132] font-black'
                                : 'text-gray-700 hover:bg-gray-100'
                            }`}
                          >
                            <span className="truncate">{st.name}</span>
                            <span className="text-[10px] font-mono text-gray-400 ml-2">Juz {st.juzLevel}</span>
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-xs font-bold text-gray-900 bg-white border border-gray-300 rounded-xl px-3 py-2">
                  {currentStudent.name} ({currentStudent.code})
                </div>
              )}
            </div>

            {/* 2. Certificate Scope / Type */}
            <div>
              <label className="block text-[11px] font-black uppercase text-gray-500 mb-1">
                Certificate Scope:
              </label>
              <div className="flex items-center gap-1 bg-white border border-gray-300 rounded-xl p-1">
                <button
                  type="button"
                  onClick={() => setCertType('CURRENT_LEVEL')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                    certType === 'CURRENT_LEVEL'
                      ? 'bg-[#0F5132] text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Current (Juz {currentStudent.juzLevel})
                </button>
                <button
                  type="button"
                  onClick={() => setCertType('KHATM')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                    certType === 'KHATM'
                      ? 'bg-[#D4AF37] text-gray-950 font-black shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Khatm (30 Juz)
                </button>
                <button
                  type="button"
                  onClick={() => setCertType('CUSTOM_MILESTONE')}
                  className={`flex-1 py-1.5 px-2 rounded-lg text-[11px] font-bold transition text-center ${
                    certType === 'CUSTOM_MILESTONE'
                      ? 'bg-slate-800 text-white shadow-xs'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Custom
                </button>
              </div>

              {certType === 'CUSTOM_MILESTONE' && (
                <div className="mt-1 flex items-center gap-2">
                  <span className="text-[10px] text-gray-500 font-bold">Juz Level:</span>
                  <input
                    type="number"
                    min={1}
                    max={30}
                    value={customLevel}
                    onChange={(e) => setCustomLevel(Math.min(30, Math.max(1, parseInt(e.target.value) || 1)))}
                    className="w-16 px-2 py-0.5 text-xs border border-gray-300 rounded-md font-bold text-center"
                  />
                  <span className="text-[10px] text-gray-400">of 30 Juz</span>
                </div>
              )}
            </div>

            {/* 3. Certificate Visual Theme */}
            <div>
              <label className="block text-[11px] font-black uppercase text-gray-500 mb-1 flex items-center gap-1">
                <Palette className="w-3 h-3 text-[#D4AF37]" />
                <span>Illumination Theme:</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setTheme('EMERALD_GOLD')}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold border transition ${
                    theme === 'EMERALD_GOLD'
                      ? 'border-[#0F5132] bg-emerald-100/60 text-[#0F5132] ring-1 ring-[#0F5132]'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Royal Emerald
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('PARCHMENT_IVORY')}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold border transition ${
                    theme === 'PARCHMENT_IVORY'
                      ? 'border-[#8B6508] bg-amber-100/60 text-[#5C3A21] ring-1 ring-[#8B6508]'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Parchment Gold
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('MIDNIGHT_AZURE')}
                  className={`py-1.5 px-2 rounded-xl text-[10px] font-extrabold border transition ${
                    theme === 'MIDNIGHT_AZURE'
                      ? 'border-[#0F2942] bg-sky-100/60 text-[#0F2942] ring-1 ring-[#0F2942]'
                      : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  Midnight Azure
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* THE PRINTABLE CERTIFICATE TEMPLATE CONTAINER (PRINT TARGET: #printable-certificate-area) */}
        {/* Uses exact CSS print styles and ornate Islamic calligraphy & motifs      */}
        {/* ========================================================================= */}
        <div 
          id="printable-certificate-area" 
          className={`relative ${themeStyles.bg} rounded-3xl p-6 sm:p-10 md:p-12 border-8 border-double ${themeStyles.innerBorder} shadow-2xl overflow-hidden transition-all duration-300`}
          style={{ minHeight: '620px' }}
        >
          {/* Ornate Secondary Inner Frame */}
          <div className="absolute inset-2.5 sm:inset-3.5 border border-dashed border-[#D4AF37]/60 rounded-2xl pointer-events-none" />

          {/* Micro Islamic Geometric Star Pattern Watermark */}
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(${themeStyles.watermarkColor} 2px, transparent 2px)`,
              backgroundSize: '20px 20px'
            }}
          />

          {/* Authentic Corner Rosettes / Arabesque Ornaments */}
          <div className="absolute top-4 left-5 text-2xl text-[#D4AF37] select-none font-serif">❖</div>
          <div className="absolute top-4 right-5 text-2xl text-[#D4AF37] select-none font-serif">❖</div>
          <div className="absolute bottom-4 left-5 text-2xl text-[#D4AF37] select-none font-serif">❖</div>
          <div className="absolute bottom-4 right-5 text-2xl text-[#D4AF37] select-none font-serif">❖</div>

          {/* Decorative Corner Filigree Flourishes */}
          <div className="absolute top-2 left-2 text-[10px] text-[#D4AF37] opacity-60 font-mono">✦ ════ ✦</div>
          <div className="absolute top-2 right-2 text-[10px] text-[#D4AF37] opacity-60 font-mono">✦ ════ ✦</div>
          <div className="absolute bottom-2 left-2 text-[10px] text-[#D4AF37] opacity-60 font-mono">✦ ════ ✦</div>
          <div className="absolute bottom-2 right-2 text-[10px] text-[#D4AF37] opacity-60 font-mono">✦ ════ ✦</div>

          {/* ------------------------------------------------------------- */}
          {/* HEADER: LOGO, ARABIC BISMILLAH, MADRASAH METADATA             */}
          {/* ------------------------------------------------------------- */}
          <div className="text-center relative z-10 mb-4 sm:mb-6">
            
            {/* Official Standard-Sized Logo */}
            <div className="flex justify-center mb-3">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-lg bg-white p-1 ring-4 ring-amber-100 flex-shrink-0">
                <img 
                  src={OFFICIAL_LOGO_URL} 
                  alt="Official Markazul Furqan Emblem" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            {/* Sacred Bismillah Calligraphy */}
            <p className="font-quran text-2xl sm:text-3xl md:text-4xl font-bold text-[#0F5132] leading-tight select-none tracking-wide">
              بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
            </p>

            {/* Quranic Ayah of Preservation and Memorization */}
            <p className="font-quran text-xs sm:text-sm text-gray-600 mt-1 italic select-none">
              ﴿ وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ ﴾
            </p>

            {/* Certificate Header Arabic Type */}
            <h4 className="font-quran text-lg sm:text-2xl font-bold text-[#D4AF37] mt-1.5 select-none drop-shadow-xs">
              {isFullKhatm
                ? 'شَهَادَةُ إِتْمَامِ حِفْظِ الْقُرْآنِ الْكَرِيمِ كَامِلاً'
                : `شَهَادَةُ إِجَازَةِ وَتَفَوُّقٍ فِي حِفْظِ (${effectiveJuzCount}) أَجْزَاءٍ مِنَ التَّنْزِيلِ`}
            </h4>

            {/* Institutional Ribbon */}
            <div className="inline-block mt-2 bg-[#0F5132] text-amber-200 text-[10px] sm:text-xs font-black uppercase tracking-widest px-5 py-1 rounded-full shadow-xs border border-amber-400/40">
              MARKAZUL FURQAN QURAN MEMORIZATION CENTER
            </div>
            <p className="text-[11px] sm:text-xs font-semibold text-gray-700 mt-1">
              Chiro, West Hararghe Zone, Oromia Region, Federal Democratic Republic of Ethiopia
            </p>
          </div>

          {/* Certificate Title Banner */}
          <div className="text-center my-4 relative z-10">
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-gray-950 tracking-tight uppercase font-serif">
              {isFullKhatm ? 'Certificate of Quran Memorization' : 'Certificate of Quranic Hifz Achievement'}
            </h2>
            <div className="w-36 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent mx-auto mt-2 rounded-full" />
          </div>

          {/* Formal Preamble */}
          <p className="text-xs sm:text-sm text-gray-700 text-center max-w-2xl mx-auto leading-relaxed mb-5 relative z-10 font-sans">
            By the grace and blessing of Allah the Almighty, and after rigorous examination through the 
            systematic <strong>Sabaq</strong>, <strong>Sabqi</strong>, and <strong>Manzil</strong> recitation curriculum, 
            the Academic Directorate of Markazul Furqan hereby confers this credential unto:
          </p>

          {/* ------------------------------------------------------------- */}
          {/* STUDENT DATA DISPLAY (NAME, ENROLLMENT DATE, LEVEL)           */}
          {/* ------------------------------------------------------------- */}
          <div className="text-center my-5 relative z-10">
            <div className="inline-block px-6 sm:px-10 py-4 bg-white/95 rounded-2xl border-2 border-[#D4AF37] shadow-md min-w-[300px] sm:min-w-[480px]">
              <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest block mb-1">
                This Official Sanad is Awarded To:
              </span>
              
              {/* Student Name */}
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-[#0F5132] font-serif tracking-tight">
                {currentStudent.name}
              </h3>

              {/* Student Metadata Strip: Code, Guardian, Track */}
              <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-xs font-semibold text-gray-600 mt-2 border-t border-gray-100 pt-2">
                <span>
                  Student Code: <strong className="font-mono text-gray-900">{currentStudent.code}</strong>
                </span>
                <span>•</span>
                <span>
                  Track: <strong className="text-gray-900">{currentStudent.track}</strong>
                </span>
                <span>•</span>
                <span>
                  Guardian: <strong className="text-gray-900">{currentStudent.guardianName}</strong>
                </span>
              </div>

              {/* HIGHLIGHTED STUDENT DATA: ENROLLMENT DATE & CURRENT LEVEL */}
              <div className="mt-3 pt-2.5 border-t border-amber-200/60 grid grid-cols-2 gap-2 text-left bg-amber-50/50 p-2.5 rounded-xl">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#0F5132] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block leading-none">
                      Enrollment Date
                    </span>
                    <span className="text-xs font-extrabold text-[#0F5132]">
                      {currentStudent.enrollmentDate}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#B8860B] shrink-0" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-gray-500 block leading-none">
                      Current Hifz Level
                    </span>
                    <span className="text-xs font-extrabold text-[#B8860B]">
                      Juz {effectiveJuzCount} of 30 ({Math.round((effectiveJuzCount / 30) * 100)}% Complete)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Citation Body Text */}
          <p className="text-xs sm:text-sm text-gray-800 text-center max-w-2xl mx-auto leading-relaxed font-medium mb-6 relative z-10">
            Having continuously attended halaqah sessions, demonstrated exceptional Tajweed articulation (Makharij), 
            and passed the comprehensive oral examinations before the academic jury in accordance with the canonical transmission of{' '}
            <strong className="text-[#0F5132]">Hafs 'an 'Asim via the Shatibiyyah pathway</strong>, covering:
          </p>

          {/* Achievement Scope Badge */}
          <div className="text-center my-4 relative z-10">
            <span className={`inline-block ${themeStyles.badgeBg} border-2 px-6 sm:px-8 py-2.5 rounded-2xl text-sm sm:text-base md:text-lg font-black shadow-xs`}>
              {isFullKhatm
                ? '★ Complete Holy Qur\'an — Full 30 Juz\' (Khatm al-Qur\'an Sanad) ★'
                : `★ Certified Milestone: ${effectiveJuzCount} Complete Juz\' of the Holy Qur\'an ★`}
            </span>
          </div>

          {/* ------------------------------------------------------------- */}
          {/* SIGNATURES, REGISTRAR WAX SEAL & JURY                         */}
          {/* ------------------------------------------------------------- */}
          <div className="grid grid-cols-3 gap-3 sm:gap-6 pt-8 mt-6 border-t border-amber-300/80 items-end text-center relative z-10">
            
            {/* Left: Supervising Halaqah Mu'allim */}
            <div>
              <div className="h-12 border-b-2 border-dashed border-gray-400 mb-2 flex items-end justify-center font-quran text-sm text-gray-700">
                زياد عبد الله (المعلم المشرف)
              </div>
              <span className="text-xs font-bold text-gray-900 block">Ustaz Ziyad Abdullahi</span>
              <span className="text-[10px] text-gray-500">Supervising Halaqah Mu'allim</span>
            </div>

            {/* Center: Official Registrar Embossed Seal */}
            <div className="flex flex-col items-center justify-center">
              <div className="relative">
                <div className={`w-20 h-20 sm:w-24 sm:h-24 rounded-full border-4 ${themeStyles.sealColor} bg-white flex items-center justify-center p-1 shadow-md overflow-hidden ring-4`}>
                  <img 
                    src={OFFICIAL_LOGO_URL} 
                    alt="Registrar Seal" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {/* Decorative Ribbon Tails */}
                <div className="absolute -bottom-2 -left-1 w-4 h-6 bg-[#D4AF37] -rotate-12 rounded-b-xs shadow-xs -z-10" />
                <div className="absolute -bottom-2 -right-1 w-4 h-6 bg-[#0F5132] rotate-12 rounded-b-xs shadow-xs -z-10" />
              </div>
              <span className="text-[9px] text-[#0F5132] font-black uppercase tracking-wider mt-2">
                Official Registrar Seal
              </span>
            </div>

            {/* Right: Founder & Directorate Chair */}
            <div>
              <div className="h-12 border-b-2 border-dashed border-gray-400 mb-2 flex items-end justify-center font-quran font-bold text-base text-[#0F5132]">
                قادر حمزة سيوم
              </div>
              <span className="text-xs font-bold text-gray-900 block">Ustaz Kadir Hamza Siyum</span>
              <span className="text-[10px] text-[#0F5132] font-semibold">Founder & Directorate Chair</span>
            </div>

          </div>

          {/* ------------------------------------------------------------- */}
          {/* VERIFICATION & SECURITY FOOTER                                */}
          {/* ------------------------------------------------------------- */}
          <div className="mt-8 pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-between text-[10px] text-gray-600 gap-3 relative z-10">
            <div className="flex items-center gap-2.5">
              <QrCode className="w-7 h-7 text-gray-800 shrink-0" />
              <div className="text-left font-mono">
                <span className="font-bold block text-gray-900">{verificationHash}</span>
                <span>Verification Helpline: <strong className="text-gray-900">+251935097339</strong></span>
              </div>
            </div>

            <div className="text-center sm:text-right font-medium text-gray-600 leading-tight">
              <div>Academic Session: <strong>{ethiopianDate}</strong> • <strong>{hijriDate}</strong></div>
              <div>Conferred in Chiro, West Hararghe, Ethiopia on <strong>{issueDate}</strong></div>
            </div>
          </div>

        </div>

        {/* ========================================================= */}
        {/* CONTACT & DIRECT VERIFICATION STRIP (NON-PRINT)            */}
        {/* ========================================================= */}
        <div className="mt-6 p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 flex flex-wrap items-center justify-between gap-4 text-xs no-print">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-[#0F5132] text-white flex items-center justify-center shrink-0 shadow-xs">
              <Phone className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div>
              <span className="font-black text-gray-900 block">
                Official Center Secretariat & Certificate Verification Helpline:
              </span>
              <span className="font-mono font-bold text-[#0F5132] text-sm">+251935097339</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href="https://wa.me/251935097339"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
            >
              <MessageCircle className="w-3.5 h-3.5" />
              <span>WhatsApp Chat</span>
            </a>

            <a
              href="https://t.me/+251935097339"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-600 hover:bg-sky-700 text-white px-3.5 py-2 rounded-xl font-bold transition flex items-center gap-1.5 shadow-xs cursor-pointer"
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
