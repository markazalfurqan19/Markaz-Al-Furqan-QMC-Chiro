import React, { useState } from 'react';
import { 
  X, 
  Printer, 
  Award, 
  FileText, 
  ShieldCheck, 
  QrCode, 
  Calendar,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { Student, HifzLog } from '../../types';
import { OFFICIAL_LOGO_URL } from '../../data/initialData';

interface StudentReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  logs: HifzLog[];
}

export const StudentReportModal: React.FC<StudentReportModalProps> = ({
  isOpen,
  onClose,
  student,
  logs
}) => {
  const [docType, setDocType] = useState<'TRANSCRIPT' | 'CERTIFICATE'>('TRANSCRIPT');

  if (!isOpen || !student) return null;

  // Filter logs for this specific student
  const studentLogs = logs.filter(l => l.studentCode === student.code || l.studentId === student.id);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[95vh] overflow-y-auto">
        
        {/* Modal Toolbar - Hidden during print */}
        <div className="flex flex-wrap justify-between items-center pb-4 mb-6 border-b border-gray-200 no-print gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setDocType('TRANSCRIPT')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                docType === 'TRANSCRIPT'
                  ? 'bg-[#0F5132] text-white shadow-sm'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Academic Transcript</span>
            </button>

            <button
              onClick={() => setDocType('CERTIFICATE')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                docType === 'CERTIFICATE'
                  ? 'bg-[#D4AF37] text-gray-950 shadow-sm font-black'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Milestone / Khatm Certificate</span>
            </button>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#0F5132] hover:bg-[#0A3622] text-white px-4 py-2 rounded-xl text-xs font-extrabold transition shadow flex items-center gap-1.5"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print Official Document</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE CONTAINER */}
        <div id="printable-report-area" className="bg-white p-4 sm:p-8 rounded-2xl border-2 border-gray-200 shadow-xs print:border-none print:p-0">
          
          {docType === 'TRANSCRIPT' ? (
            /* ================= 1. OFFICIAL ACADEMIC TRANSCRIPT ================= */
            <div>
              {/* Institutional Header with Official Emblem */}
              <div className="text-center border-b-2 border-[#0F5132] pb-5 mb-6 relative">
                <div className="flex justify-center mb-3">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md bg-white p-0.5">
                    <img 
                      src={OFFICIAL_LOGO_URL} 
                      alt="Markazul Furqan Official Logo" 
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                </div>
                <h2 className="text-xl sm:text-2xl font-black text-[#0F5132] tracking-tight uppercase">
                  MARKAZUL FURQAN QURAN MEMORIZATION CENTER
                </h2>
                <p className="text-xs font-semibold text-gray-600 mt-0.5">
                  Chiro, West Hararghe Zone, Oromia Region, Ethiopia
                </p>
                <div className="inline-block mt-2 bg-amber-50 border border-amber-300 text-amber-900 text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                  Official Student Performance Transcript & Verification
                </div>
                <p className="font-quran text-lg text-[#0F5132] mt-2">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ
                </p>
              </div>

              {/* Student Metadata Card */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-6 bg-gray-50 p-4 rounded-2xl border border-gray-200">
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Student Full Name:</span>
                  <span className="font-extrabold text-sm text-gray-900">{student.name}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Registration Code:</span>
                  <span className="font-mono font-bold text-sm text-[#0F5132]">{student.code}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Current Hifz Level:</span>
                  <span className="font-extrabold text-sm text-amber-800">
                    Juz {student.juzLevel} of 30 Completed
                  </span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Academic Session:</span>
                  <span className="font-bold text-gray-900">2018 / 2019 E.C.</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Guardian Name:</span>
                  <span className="font-semibold text-gray-900">{student.guardianName}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Guardian Contact:</span>
                  <span className="font-mono text-gray-900">{student.guardianPhone}</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Enrolled Track:</span>
                  <span className="font-bold text-[#0F5132]">{student.track} Full-Time</span>
                </div>
                <div>
                  <span className="text-gray-500 text-[10px] uppercase font-bold block">Halaqah Attendance:</span>
                  <span className="font-bold text-emerald-700">{student.dailyAttendance}% Excellent</span>
                </div>
              </div>

              {/* Hifz Methodology Audit Table */}
              <h4 className="text-xs font-black uppercase tracking-wider text-[#0F5132] mb-3 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Recent Memorization & Revision Audit History</span>
              </h4>

              <table className="w-full text-xs text-left border border-gray-200 mb-6 rounded-xl overflow-hidden">
                <thead className="bg-[#0F5132] text-white font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5 border-r border-emerald-800">Recitation Pillar</th>
                    <th className="p-2.5 border-r border-emerald-800">Content / Juz Scope</th>
                    <th className="p-2.5 border-r border-emerald-800">Grade & Evaluation</th>
                    <th className="p-2.5">Supervising Instructor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900 bg-gray-50">
                      Sabaq (Daily New Lesson)
                    </td>
                    <td className="p-2.5 font-semibold text-gray-800">
                      {student.currentSurah}
                    </td>
                    <td className="p-2.5">
                      <span className="bg-emerald-100 text-[#0F5132] px-2 py-0.5 rounded font-extrabold">
                        Mumtaz ( ممتاز - Flawless )
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-600">Assigned Halaqah Mu'allim</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900 bg-gray-50">
                      Sabqi (Short-Term Revision)
                    </td>
                    <td className="p-2.5 font-semibold text-gray-800">
                      Juz {Math.max(1, student.juzLevel - 1)} & {student.juzLevel} (Quarter 1-4)
                    </td>
                    <td className="p-2.5">
                      <span className="bg-emerald-100 text-[#0F5132] px-2 py-0.5 rounded font-extrabold">
                        Mumtaz ( ممتاز )
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-600">Assigned Halaqah Mu'allim</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-bold text-gray-900 bg-gray-50">
                      Manzil (Cumulative Cycle)
                    </td>
                    <td className="p-2.5 font-semibold text-gray-800">
                      Juz 1 through Juz {student.juzLevel} Continuous Rotation
                    </td>
                    <td className="p-2.5">
                      <span className="bg-blue-100 text-blue-900 px-2 py-0.5 rounded font-extrabold">
                        Jayyid Jiddan ( جيد جداً )
                      </span>
                    </td>
                    <td className="p-2.5 text-gray-600">Ustaz Kadir Hamza Siyum</td>
                  </tr>
                </tbody>
              </table>

              {/* Recent Daily Logs if available */}
              {studentLogs.length > 0 && (
                <div className="mb-6">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block mb-1">
                    Recorded Daily Logs for this Student ({studentLogs.length}):
                  </span>
                  <div className="space-y-1.5 text-[11px]">
                    {studentLogs.slice(0, 3).map((l, idx) => (
                      <div key={idx} className="p-2 bg-gray-50 rounded-lg border border-gray-200 flex justify-between items-center">
                        <div>
                          <span className="font-semibold text-gray-900">{l.date}</span>: {l.sabaqRange}
                          <span className="text-gray-500 ml-2">(Sabqi: Juz {l.sabqiJuz}, Manzil: Juz {l.manzilJuz})</span>
                        </div>
                        <span className="font-bold text-[#0F5132]">{l.grade}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Institutional Sign-Off Section */}
              <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t-2 border-gray-300 text-center">
                <div>
                  <div className="h-12 border-b-2 border-dashed border-gray-400 mb-2 flex items-end justify-center pb-1">
                    <span className="font-quran text-sm text-gray-600">توقيع المعلم المشرف</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 block">Assigned Mu'allim Signature</span>
                  <span className="text-[10px] text-gray-500">Halaqah Inspection Board</span>
                </div>
                <div>
                  <div className="h-12 border-b-2 border-dashed border-gray-400 mb-2 flex items-end justify-center pb-1">
                    <span className="font-quran text-base font-bold text-[#0F5132]">أستاذ قادر حمزة سيوم</span>
                  </div>
                  <span className="text-xs font-bold text-gray-800 block">Ustaz Kadir Hamza Siyum</span>
                  <span className="text-[10px] text-[#0F5132] font-semibold">Director & Directorate Chair</span>
                </div>
              </div>

              {/* Verification Stamp Footer */}
              <div className="mt-8 pt-4 border-t border-gray-200 flex items-center justify-between text-[10px] text-gray-500">
                <div className="flex items-center gap-2">
                  <QrCode className="w-6 h-6 text-gray-700" />
                  <div>
                    <span className="font-mono font-bold block text-gray-700">VERIFICATION HASH: MF-ET-{student.code}</span>
                    <span>Verify at markazalfurqan19@gmail.com • Chiro Office</span>
                  </div>
                </div>
                <div className="text-right">
                  <span>Issued Date: {new Date().toLocaleDateString('en-GB')} (2018 E.C.)</span>
                </div>
              </div>
            </div>
          ) : (
            /* ================= 2. OFFICIAL KHATM / MILESTONE CERTIFICATE ================= */
            <div className="border-8 border-double border-[#D4AF37] p-8 sm:p-12 rounded-3xl bg-amber-50/20 text-center relative overflow-hidden">
              {/* Corner Ornaments */}
              <div className="absolute top-3 left-3 text-[#D4AF37] text-2xl font-quran select-none">❖</div>
              <div className="absolute top-3 right-3 text-[#D4AF37] text-2xl font-quran select-none">❖</div>
              <div className="absolute bottom-3 left-3 text-[#D4AF37] text-2xl font-quran select-none">❖</div>
              <div className="absolute bottom-3 right-3 text-[#D4AF37] text-2xl font-quran select-none">❖</div>

              {/* Official Center Emblem Header */}
              <div className="flex justify-center mb-3">
                <div className="w-24 h-24 sm:w-26 sm:h-26 rounded-full overflow-hidden border-4 border-[#D4AF37] shadow-xl bg-white p-1 ring-4 ring-amber-100 flex-shrink-0">
                  <img 
                    src={OFFICIAL_LOGO_URL} 
                    alt="Markazul Furqan Official Logo" 
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>

              {/* Calligraphy Header */}
              <div className="mb-6">
                <p className="font-quran text-2xl sm:text-3xl text-[#0F5132] font-bold">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
                <p className="font-quran text-lg text-[#D4AF37] mt-1">
                  شَهَادَةُ حِفْظِ الْقُرْآنِ الْكَرِيمِ وَإِتْقَانِ التِّلَاوَةِ
                </p>
              </div>

              <div className="text-xs uppercase font-extrabold tracking-widest text-[#0F5132] mb-1">
                Markazul Furqan Quran Memorization Center • Chiro, Ethiopia
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight mb-4">
                CERTIFICATE OF QURANIC MEMORIZATION
              </h3>

              <p className="text-xs sm:text-sm text-gray-600 max-w-xl mx-auto leading-relaxed mb-6">
                This certifies that the esteemed student has demonstrated exemplary dedication,
                precise phonetic Tajweed recitation according to the narration of <strong>Hafs 'an 'Asim</strong>,
                and consistent retention through the Sabaq, Sabqi, and Manzil pedagogical framework:
              </p>

              {/* Honored Student Name */}
              <div className="my-6 py-4 px-6 bg-white rounded-2xl border-2 border-[#D4AF37] inline-block shadow-sm">
                <span className="text-[10px] uppercase font-bold text-gray-500 tracking-widest block mb-1">
                  Presented To:
                </span>
                <h4 className="text-xl sm:text-2xl font-black text-[#0F5132]">
                  {student.name}
                </h4>
                <div className="text-xs font-mono font-bold text-gray-600 mt-1">
                  Registration ID: {student.code}
                </div>
              </div>

              <p className="text-sm font-bold text-gray-800 max-w-lg mx-auto mb-8">
                Having successfully committed to heart{' '}
                <span className="text-[#0F5132] underline text-base font-black">
                  {student.juzLevel === 30 ? 'The Entire Holy Qur\'an (30 Full Juz\')' : `${student.juzLevel} Juz' of the Holy Qur'an`}
                </span>{' '}
                with excellent standing under the supervision of the Directorate of Markazul Furqan.
              </p>

              {/* Signatures */}
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-amber-300 max-w-md mx-auto">
                <div className="text-center">
                  <div className="h-10 border-b border-gray-400 mb-1 flex items-end justify-center font-quran text-xs text-gray-600">
                    اللجنة الأكاديمية
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 block">Senior Mu'allim</span>
                  <span className="text-[9px] text-gray-500">Halaqah Examiner</span>
                </div>
                <div className="text-center">
                  <div className="h-10 border-b border-gray-400 mb-1 flex items-end justify-center font-quran font-bold text-sm text-[#0F5132]">
                    قادر حمزة سيوم
                  </div>
                  <span className="text-[11px] font-bold text-gray-800 block">Ustaz Kadir Hamza Siyum</span>
                  <span className="text-[9px] text-[#0F5132] font-semibold">Director & General Supervisor</span>
                </div>
              </div>

              <div className="mt-8 text-[10px] text-gray-500 font-medium">
                Chiro, West Hararghe, Oromia, Ethiopia • Issued in Academic Year 2018/2019 E.C.
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
