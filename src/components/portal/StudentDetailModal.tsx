import React from 'react';
import { 
  X, 
  Printer, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Calendar, 
  Phone, 
  User, 
  CheckCircle2, 
  FileText,
  Clock,
  Sparkles,
  ShieldCheck
} from 'lucide-react';
import { Student, HifzLog } from '../../types';
import { StudentDetailChart } from './StudentDetailChart';
import { AttendanceHeatmap } from './AttendanceHeatmap';
import { OFFICIAL_LOGO_URL } from '../../data/initialData';

interface StudentDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  student: Student | null;
  hifzLogs: HifzLog[];
  onOpenLogModal?: (student: Student) => void;
  onOpenReportModal?: (student: Student) => void;
  onOpenCertModal?: (student: Student) => void;
  onOpenAttendanceModal?: () => void;
}

export const StudentDetailModal: React.FC<StudentDetailModalProps> = ({
  isOpen,
  onClose,
  student,
  hifzLogs,
  onOpenLogModal,
  onOpenReportModal,
  onOpenCertModal,
  onOpenAttendanceModal
}) => {
  if (!isOpen || !student) return null;

  // Filter logs for this student
  const studentLogs = hifzLogs
    .filter(l => l.studentId === student.id || l.studentCode === student.code)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto border border-gray-100 animate-fadeIn">
        
        {/* Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3.5">
            <div className="w-13 h-13 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md bg-white p-0.5 shrink-0">
              <img 
                src={OFFICIAL_LOGO_URL} 
                alt="Emblem" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="font-mono text-xs font-bold text-[#0F5132] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {student.code}
                </span>
                <span className={`px-2 py-0.5 text-[10px] font-black rounded-full ${
                  student.status === 'GRADUATED'
                    ? 'bg-purple-100 text-purple-900'
                    : student.status === 'KHATM_TRACK'
                    ? 'bg-amber-100 text-amber-900'
                    : 'bg-emerald-100 text-[#0F5132]'
                }`}>
                  {student.status}
                </span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                {student.name}
              </h2>
              <p className="text-xs text-gray-500">
                {student.age} Years Old • {student.track} Track • Enrolled {student.enrollmentDate}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onClose();
                onOpenReportModal?.(student);
              }}
              className="bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-bold px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
              title="Open Official Transcript"
            >
              <FileText className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Transcript</span>
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenCertModal?.(student);
              }}
              className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 text-xs font-black px-3 py-2 rounded-xl transition flex items-center gap-1.5 shadow-xs"
              title="Print Certificate"
            >
              <Award className="w-3.5 h-3.5 text-amber-950" />
              <span className="hidden sm:inline">Certificate</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
              aria-label="Close detail view"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Profile Details Quick Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4 bg-gray-50/80 p-3.5 rounded-2xl border border-gray-200 text-xs">
          <div>
            <span className="text-gray-500 text-[10px] uppercase font-bold block">Guardian Name</span>
            <span className="font-bold text-gray-900 mt-0.5 block">{student.guardianName}</span>
          </div>

          <div>
            <span className="text-gray-500 text-[10px] uppercase font-bold block">Guardian Phone</span>
            <span className="font-mono text-gray-800 font-semibold mt-0.5 block">{student.guardianPhone}</span>
          </div>

          <div>
            <span className="text-gray-500 text-[10px] uppercase font-bold block">Daily Attendance</span>
            <div className="flex items-center gap-1.5 mt-0.5">
              <span className="font-extrabold text-emerald-800">{student.dailyAttendance}%</span>
              <div className="w-16 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                <div 
                  className="bg-emerald-600 h-1.5 rounded-full" 
                  style={{ width: `${student.dailyAttendance}%` }} 
                />
              </div>
            </div>
          </div>

          <div>
            <span className="text-gray-500 text-[10px] uppercase font-bold block">Memorization Standing</span>
            <span className="font-black text-[#0F5132] mt-0.5 block">
              Juz {student.juzLevel} of 30 Completed
            </span>
          </div>
        </div>

        {/* MAIN RECHARTS LINE GRAPH SECTION */}
        <div className="my-5">
          <StudentDetailChart
            student={student}
            hifzLogs={hifzLogs}
            height={280}
            showCardWrapper={true}
          />
        </div>

        {/* 30-DAY ATTENDANCE HEATMAP & PATTERN AUDIT */}
        <div className="my-5">
          <AttendanceHeatmap student={student} />
        </div>

        {/* RECENT HIFZ LOGS HISTORY */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="text-sm font-black text-gray-900 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#0F5132]" />
                <span>Audited Recitation & Examination History</span>
              </h4>
              <p className="text-[11px] text-gray-500">
                Detailed record of Sabaq (new), Sabqi (recent revision), and Manzil (cumulative cycle)
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onOpenLogModal?.(student);
              }}
              className="bg-emerald-50 hover:bg-emerald-100 text-[#0F5132] text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-300 transition flex items-center gap-1"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Log New Sabaq</span>
            </button>
          </div>

          {studentLogs.length === 0 ? (
            <div className="p-6 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300 text-xs text-gray-500">
              No daily recitation logs recorded yet for this student. Click "Log New Sabaq" to record an evaluation.
            </div>
          ) : (
            <div className="border border-gray-200 rounded-2xl overflow-hidden">
              <table className="w-full text-left text-xs text-gray-600">
                <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] border-b border-gray-200">
                  <tr>
                    <th className="py-2.5 px-3">Date</th>
                    <th className="py-2.5 px-3">Sabaq (New Lesson)</th>
                    <th className="py-2.5 px-3">Sabqi Juz</th>
                    <th className="py-2.5 px-3">Manzil Juz</th>
                    <th className="py-2.5 px-3">Evaluation</th>
                    <th className="py-2.5 px-3">Mu'allim Comments</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-2.5 px-3 font-mono font-semibold text-gray-800 whitespace-nowrap">
                        {log.date}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-gray-900">
                        {log.sabaqRange}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-emerald-50 text-[#0F5132] px-2 py-0.5 rounded font-bold text-[11px]">
                          Juz {log.sabqiJuz}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-bold text-[11px]">
                          Juz {log.manzilJuz}
                        </span>
                      </td>
                      <td className="py-2.5 px-3">
                        <span className={`inline-block px-2 py-0.5 text-[10px] font-black rounded-md ${
                          log.grade === 'MUMTAZ'
                            ? 'bg-emerald-100 text-emerald-900'
                            : log.grade === 'JAYYID_JIDDAN'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {log.grade}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-gray-500 italic max-w-xs truncate" title={log.notes}>
                        "{log.notes || 'Routine revision successfully cleared.'}"
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-6 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-2">
          <div className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck className="w-4 h-4 text-[#0F5132]" />
            <span>Authenticated student record • Markazul Furqan Chiro, Ethiopia</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition text-xs"
          >
            Close Detail View
          </button>
        </div>

      </div>
    </div>
  );
};
