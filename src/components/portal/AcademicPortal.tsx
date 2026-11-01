import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  FileSignature, 
  Heart, 
  Database, 
  Plus, 
  FileSpreadsheet, 
  Printer, 
  Search, 
  Filter, 
  ShieldCheck, 
  Award, 
  ArrowLeft,
  CheckCircle2,
  Trash2,
  Download,
  Upload,
  RefreshCw,
  Phone,
  Calendar,
  Layers,
  ChevronRight,
  ExternalLink
} from 'lucide-react';
import { Student, HifzLog, AdmissionApplication, DonationPledge, CloudConfig, UserSession } from '../../types';
import { StudentReportModal } from './StudentReportModal';
import { HifzLogModal } from './HifzLogModal';
import { AddStudentModal } from './AddStudentModal';
import { CertificateGenerator } from './CertificateGenerator';
import { HifzProgressChart } from './HifzProgressChart';
import { ReceiptModal } from '../ReceiptModal';
import { OFFICIAL_LOGO_URL } from '../../data/initialData';

interface AcademicPortalProps {
  students: Student[];
  onAddStudent: (student: Omit<Student, 'id' | 'dailyAttendance'>) => Promise<void>;
  onDeleteStudent: (id: string) => void;
  hifzLogs: HifzLog[];
  onAddHifzLog: (log: Omit<HifzLog, 'id' | 'date'>) => Promise<void>;
  admissions: AdmissionApplication[];
  onApproveAdmission: (admissionId: string) => void;
  pledges: DonationPledge[];
  cloudConfig: CloudConfig;
  onOpenCloudConfig: () => void;
  onExitPortal: () => void;
  currentUser: UserSession | null;
  onExportCSV: () => void;
  onExportJSON: () => void;
  onImportJSON: (file: File) => void;
  onResetData: () => void;
  onShowToast?: (msg: string) => void;
}

export const AcademicPortal: React.FC<AcademicPortalProps> = ({
  students,
  onAddStudent,
  onDeleteStudent,
  hifzLogs,
  onAddHifzLog,
  admissions,
  onApproveAdmission,
  pledges,
  cloudConfig,
  onOpenCloudConfig,
  onExitPortal,
  currentUser,
  onExportCSV,
  onExportJSON,
  onImportJSON,
  onResetData,
  onShowToast
}) => {
  const [activeTab, setActiveTab] = useState<'ROSTER' | 'LOGS' | 'ADMISSIONS' | 'PLEDGES' | 'BACKUP'>('ROSTER');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterJuz, setFilterJuz] = useState<'ALL' | '1-10' | '11-20' | '21-30'>('ALL');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');

  // Modal states
  const [showAddStudentModal, setShowAddStudentModal] = useState(false);
  const [showHifzLogModal, setShowHifzLogModal] = useState(false);
  const [selectedStudentForLog, setSelectedStudentForLog] = useState<Student | null>(null);
  const [showReportModal, setShowReportModal] = useState(false);
  const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | null>(null);
  const [showCertModal, setShowCertModal] = useState(false);
  const [selectedStudentForCert, setSelectedStudentForCert] = useState<Student | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<Student | null>(null);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);
  const [selectedPledgeForReceipt, setSelectedPledgeForReceipt] = useState<DonationPledge | null>(null);

  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  // Filter students
  const filteredStudents = students.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          s.guardianPhone.includes(searchQuery);
    let matchesJuz = true;
    if (filterJuz === '1-10') matchesJuz = s.juzLevel <= 10;
    else if (filterJuz === '11-20') matchesJuz = s.juzLevel > 10 && s.juzLevel <= 20;
    else if (filterJuz === '21-30') matchesJuz = s.juzLevel > 20;

    let matchesStatus = true;
    if (filterStatus !== 'ALL') matchesStatus = s.status === filterStatus;

    return matchesSearch && matchesJuz && matchesStatus;
  });

  const handleOpenLogModal = (student?: Student) => {
    setSelectedStudentForLog(student || null);
    setShowHifzLogModal(true);
  };

  const handleOpenReportModal = (student: Student) => {
    setSelectedStudentForReport(student);
    setShowReportModal(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 animate-fadeIn">
      
      {/* 1. TOP PORTAL HEADER & NAVIGATION */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-gray-200 no-print">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md bg-white p-0.5 shrink-0">
            <img 
              src={OFFICIAL_LOGO_URL} 
              alt="Markazul Furqan Official Emblem" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center gap-1.5 text-xs font-black text-[#0F5132] bg-emerald-100 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5" />
                Live Institutional Academic Console
              </span>
              {currentUser && (
                <span className="text-xs text-gray-500 font-semibold">
                  • Signed in as {currentUser.name}
                </span>
              )}
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-gray-900 tracking-tight">
              Markazul Furqan Academic Ledger
            </h2>
            <p className="text-xs text-gray-500 mt-0.5">
              Real-time management for Sabaq, Sabqi, and Manzil evaluations, student rosters, admissions, and verified transcripts.
            </p>
          </div>
        </div>

        {/* Global Quick Action Buttons */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => handleOpenLogModal()}
            className="bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4 text-[#D4AF37]" />
            <span>Log Daily Sabaq</span>
          </button>

          <button
            onClick={() => setShowAddStudentModal(true)}
            className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 text-xs font-black px-4 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
          >
            <Users className="w-4 h-4 text-amber-950" />
            <span>Add Student</span>
          </button>

          <button
            onClick={onExportCSV}
            className="bg-slate-700 hover:bg-slate-800 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5"
            title="Download full student ledger in Excel/CSV format"
          >
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={onExitPortal}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 text-xs font-bold px-3.5 py-2.5 rounded-xl transition flex items-center gap-1.5"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Exit Portal</span>
          </button>
        </div>
      </div>

      {/* 2. LIVE METRICS GRID */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 my-6 no-print">
        {/* Total Registered Haffaz */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Total Enrolled Haffaz</span>
            <Users className="w-4 h-4 text-[#0F5132]" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-[#0F5132]">
            {students.length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Across 5 Chiro Halaqat
          </div>
        </div>

        {/* Today's Completed Sabaq Logs */}
        <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Audited Sabaq Entries</span>
            <BookOpen className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-blue-600">
            {hifzLogs.length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Evaluated by Mu'allim faculty
          </div>
        </div>

        {/* Cloud Sync Status */}
        <div 
          onClick={onOpenCloudConfig}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs cursor-pointer hover:border-[#0F5132] transition"
        >
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Cloud & Webhook Status</span>
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
          </div>
          <div className="text-xs font-black text-emerald-700 mt-2 flex items-center gap-1.5">
            <span>{cloudConfig.googleScriptUrl ? 'Google Sheets Active' : 'Local Mode (Cloud Ready)'}</span>
          </div>
          <div className="text-[10px] text-gray-400 mt-1 flex items-center gap-1">
            <span>Click to configure endpoint</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        </div>

        {/* Pending Admissions */}
        <div 
          onClick={() => setActiveTab('ADMISSIONS')}
          className="bg-white p-5 rounded-2xl border border-gray-200 shadow-xs cursor-pointer hover:border-amber-400 transition"
        >
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Admissions Applications</span>
            <FileSignature className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-600">
            {admissions.length}
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            {admissions.filter(a => a.status === 'PENDING').length} pending review
          </div>
        </div>
      </div>

      {/* 3. TAB CONTROLS */}
      <div className="flex items-center gap-2 border-b border-gray-200 mb-6 overflow-x-auto no-print pb-1">
        <button
          onClick={() => setActiveTab('ROSTER')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
            activeTab === 'ROSTER'
              ? 'bg-[#0F5132] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Students Roster ({students.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('LOGS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
            activeTab === 'LOGS'
              ? 'bg-[#0F5132] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Sabaq & Hifz Logs ({hifzLogs.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ADMISSIONS')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
            activeTab === 'ADMISSIONS'
              ? 'bg-[#0F5132] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <FileSignature className="w-4 h-4" />
          <span>Admissions Review ({admissions.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('PLEDGES')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
            activeTab === 'PLEDGES'
              ? 'bg-[#0F5132] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Heart className="w-4 h-4" />
          <span>Vision 2030 Pledges ({pledges.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('BACKUP')}
          className={`px-4 py-2.5 rounded-xl text-xs font-black transition flex items-center gap-2 shrink-0 ${
            activeTab === 'BACKUP'
              ? 'bg-[#0F5132] text-white shadow-sm'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>Data Backup & Sync</span>
        </button>
      </div>

      {/* 4. TAB CONTENTS */}
      {/* ================= TAB 1: STUDENTS ROSTER ================= */}
      {activeTab === 'ROSTER' && (
        <div className="space-y-6">
          {/* Recharts 6-Month Hifz Progress Line Chart */}
          <HifzProgressChart 
            students={students} 
            hifzLogs={hifzLogs} 
          />

          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden no-print">
            {/* Table Filters & Search Bar */}
            <div className="p-4 sm:p-5 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-80">
              <input
                type="text"
                placeholder="Search student name, ID, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0F5132]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>

            <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-gray-500 font-semibold">Juz Level:</span>
                <select
                  value={filterJuz}
                  onChange={(e) => setFilterJuz(e.target.value as any)}
                  className="text-xs border border-gray-300 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                >
                  <option value="ALL">All Levels (0-30)</option>
                  <option value="1-10">Juz 1 - 10 (Foundation)</option>
                  <option value="11-20">Juz 11 - 20 (Intermediate)</option>
                  <option value="21-30">Juz 21 - 30 (Khatm Track)</option>
                </select>
              </div>

              <div className="flex items-center gap-1.5 text-xs">
                <span className="text-gray-500 font-semibold">Status:</span>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="text-xs border border-gray-300 rounded-xl px-2.5 py-2 font-bold focus:outline-none"
                >
                  <option value="ALL">All Statuses</option>
                  <option value="ACTIVE">Active</option>
                  <option value="KHATM_TRACK">Khatm Track</option>
                  <option value="GRADUATED">Graduated</option>
                  <option value="REVISION">Revision</option>
                </select>
              </div>
            </div>
          </div>

          {/* Student Roster Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3.5 px-4">Student ID</th>
                  <th className="py-3.5 px-4">Student Full Name</th>
                  <th className="py-3.5 px-4">Current Progress</th>
                  <th className="py-3.5 px-4">Guardian Contact</th>
                  <th className="py-3.5 px-4">Status</th>
                  <th className="py-3.5 px-4 text-center">Actions & Documentation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">
                      No students found matching current filters.
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((st) => (
                    <tr key={st.id} className="hover:bg-gray-50/80 transition">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#0F5132]">
                        {st.code}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-extrabold text-gray-900 text-sm">{st.name}</div>
                        <div className="text-[11px] text-gray-500">
                          {st.age} yrs • {st.track} • {st.currentSurah}
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <span className="bg-amber-100 text-amber-900 font-extrabold px-2.5 py-0.5 rounded-md text-[11px]">
                            Juz {st.juzLevel} / 30
                          </span>
                        </div>
                        <div className="w-24 bg-gray-200 rounded-full h-1.5 mt-1.5 overflow-hidden">
                          <div 
                            className="bg-[#0F5132] h-1.5 rounded-full" 
                            style={{ width: `${Math.round((st.juzLevel / 30) * 100)}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-gray-800">{st.guardianName}</div>
                        <div className="font-mono text-gray-500 text-[11px]">{st.guardianPhone}</div>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-1 text-[10px] font-black rounded-full ${
                          st.status === 'GRADUATED'
                            ? 'bg-purple-100 text-purple-900'
                            : st.status === 'KHATM_TRACK'
                            ? 'bg-amber-100 text-amber-900'
                            : 'bg-emerald-100 text-[#0F5132]'
                        }`}>
                          {st.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-center">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Log Sabaq */}
                          <button
                            onClick={() => handleOpenLogModal(st)}
                            className="bg-emerald-50 hover:bg-emerald-100 text-[#0F5132] px-2.5 py-1.5 rounded-lg text-[11px] font-bold border border-emerald-200 transition"
                            title="Log today's Sabaq & evaluation"
                          >
                            <BookOpen className="w-3.5 h-3.5 inline mr-1" />
                            Log Sabaq
                          </button>

                          {/* Print Transcript / Report Card */}
                          <button
                            onClick={() => handleOpenReportModal(st)}
                            className="bg-[#0F5132] hover:bg-[#0A3622] text-white px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition flex items-center gap-1 shadow-xs"
                            title="Generate official printable transcript"
                          >
                            <Printer className="w-3.5 h-3.5" />
                            <span>Report Card</span>
                          </button>

                          {/* Print Hifz Completion Certificate */}
                          <button
                            onClick={() => {
                              setSelectedStudentForCert(st);
                              setShowCertModal(true);
                            }}
                            className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 px-2.5 py-1.5 rounded-lg text-[11px] font-black transition flex items-center gap-1 shadow-xs"
                            title="Generate and print official Hifz completion certificate"
                          >
                            <Award className="w-3.5 h-3.5 text-amber-950" />
                            <span>Print Certificate</span>
                          </button>

                          {/* Delete Student */}
                          <button
                            onClick={() => setStudentToDelete(st)}
                            className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg transition"
                            title="Remove student"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
        </div>
      )}

      {/* ================= TAB 2: SABAQ & HIFZ LOGS ================= */}
      {activeTab === 'LOGS' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden no-print">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">
                Daily Recitation & Examination History
              </h3>
              <p className="text-xs text-gray-500">Chronological ledger of Sabaq, Sabqi, and Manzil evaluations</p>
            </div>
            <button
              onClick={() => handleOpenLogModal()}
              className="bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-bold px-4 py-2 rounded-xl transition flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4 text-[#D4AF37]" />
              <span>Record New Sabaq Log</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Sabaq (New Lesson)</th>
                  <th className="py-3 px-4">Sabqi (Recent)</th>
                  <th className="py-3 px-4">Manzil (Cycle)</th>
                  <th className="py-3 px-4">Grade</th>
                  <th className="py-3 px-4">Mu'allim Comments</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {hifzLogs.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-8 text-center text-gray-400">
                      No logs recorded yet. Click "Record New Sabaq Log" to begin.
                    </td>
                  </tr>
                ) : (
                  hifzLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono font-semibold text-gray-800">
                        {log.date}
                      </td>
                      <td className="py-3 px-4">
                        <div className="font-extrabold text-gray-900">{log.studentName}</div>
                        <div className="text-[10px] font-mono text-[#0F5132]">{log.studentCode}</div>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-800">
                        {log.sabaqRange}
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-bold text-[11px]">
                          Juz {log.sabqiJuz}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-gray-100 text-gray-800 px-2 py-0.5 rounded font-bold text-[11px]">
                          Juz {log.manzilJuz}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2.5 py-0.5 text-[10px] font-black rounded-md ${
                          log.grade === 'MUMTAZ'
                            ? 'bg-emerald-100 text-emerald-900'
                            : log.grade === 'JAYYID_JIDDAN'
                            ? 'bg-blue-100 text-blue-900'
                            : 'bg-amber-100 text-amber-900'
                        }`}>
                          {log.grade}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-gray-500 italic max-w-xs truncate">
                        "{log.notes || 'Routine revision successfully cleared.'}"
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 3: ADMISSIONS REVIEW ================= */}
      {activeTab === 'ADMISSIONS' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden no-print">
          <div className="p-5 border-b border-gray-200">
            <h3 className="text-base font-extrabold text-gray-900">
              Student Admission Applications (2018 / 2019 E.C.)
            </h3>
            <p className="text-xs text-gray-500">
              Applications submitted online by parents and candidates in Chiro
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Submission Date</th>
                  <th className="py-3 px-4">Applicant Name</th>
                  <th className="py-3 px-4">Guardian & Phone</th>
                  <th className="py-3 px-4">Track</th>
                  <th className="py-3 px-4">Prior Memorization</th>
                  <th className="py-3 px-4">Fee Channel</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {admissions.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-gray-400">
                      No applications submitted yet.
                    </td>
                  </tr>
                ) : (
                  admissions.map((adm) => (
                    <tr key={adm.id} className="hover:bg-gray-50">
                      <td className="py-3 px-4 font-mono">{adm.submissionDate}</td>
                      <td className="py-3 px-4 font-extrabold text-gray-900">{adm.fullName}</td>
                      <td className="py-3 px-4">
                        <div>{adm.guardianName}</div>
                        <div className="font-mono text-gray-500 text-[11px]">{adm.phone}</div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="font-bold text-[#0F5132]">{adm.track}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className="bg-amber-50 text-amber-800 font-bold px-2 py-0.5 rounded">
                          Juz {adm.priorJuz}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-semibold text-gray-800">{adm.paymentChannel}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-black ${
                          adm.status === 'APPROVED' ? 'bg-emerald-100 text-emerald-900' : 'bg-amber-100 text-amber-900'
                        }`}>
                          {adm.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        {adm.status === 'PENDING' ? (
                          <button
                            onClick={() => onApproveAdmission(adm.id)}
                            className="bg-[#0F5132] hover:bg-[#0A3622] text-white px-3 py-1.5 rounded-lg text-xs font-bold transition flex items-center gap-1 mx-auto"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Approve & Enroll</span>
                          </button>
                        ) : (
                          <span className="text-emerald-700 font-bold text-xs">Enrolled</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 4: VISION 2030 PLEDGES ================= */}
      {activeTab === 'PLEDGES' && (
        <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden no-print">
          <div className="p-5 border-b border-gray-200 flex justify-between items-center">
            <div>
              <h3 className="text-base font-extrabold text-gray-900">
                Vision 2030 Capital Campaign Ledger
              </h3>
              <p className="text-xs text-gray-500">Record of community sponsorships, bank transfers, and Telebirr donations</p>
            </div>
            <div className="text-right">
              <span className="text-[11px] text-gray-500 uppercase font-bold block">Target</span>
              <span className="text-sm font-black text-[#0F5132]">ETB 4,500,000</span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600">
              <thead className="bg-gray-50 text-gray-700 uppercase font-bold border-b border-gray-200">
                <tr>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Donor Name</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Tier</th>
                  <th className="py-3 px-4">Bank / Channel</th>
                  <th className="py-3 px-4">Ref Number</th>
                  <th className="py-3 px-4 text-right">Amount (ETB)</th>
                  <th className="py-3 px-4 text-center">Receipt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {pledges.map((p) => (
                  <tr key={p.id} className="hover:bg-gray-50">
                    <td className="py-3 px-4 font-mono">{p.date}</td>
                    <td className="py-3 px-4 font-extrabold text-gray-900">{p.donorName}</td>
                    <td className="py-3 px-4 text-gray-500">{p.phoneOrEmail}</td>
                    <td className="py-3 px-4 font-semibold text-emerald-800">{p.tier}</td>
                    <td className="py-3 px-4">{p.channel}</td>
                    <td className="py-3 px-4 font-mono text-[11px] text-gray-500">{p.referenceNumber || 'N/A'}</td>
                    <td className="py-3 px-4 text-right font-black text-sm text-[#0F5132]">
                      ETB {p.amountETB.toLocaleString()}
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={() => {
                          setSelectedPledgeForReceipt(p);
                          setShowReceiptModal(true);
                        }}
                        className="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 px-2.5 py-1 rounded-lg font-bold text-[11px] transition flex items-center gap-1 mx-auto cursor-pointer"
                        title="Print Official Donation Receipt"
                      >
                        <Printer className="w-3 h-3 text-[#D4AF37]" />
                        <span>Receipt</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ================= TAB 5: DATA BACKUP & CLOUD SYNC ================= */}
      {activeTab === 'BACKUP' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 no-print">
          {/* Export / Import Card */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4">
            <h4 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
              <Database className="w-5 h-5 text-[#0F5132]" />
              <span>Data Export & Backup</span>
            </h4>
            <p className="text-xs text-gray-600 leading-relaxed">
              Export all student rosters, Hifz recitation logs, admissions, and Vision 2030 donations to local file formats for offline safekeeping.
            </p>

            <div className="space-y-2.5 pt-2">
              <button
                onClick={onExportCSV}
                className="w-full bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-[#D4AF37]" />
                <span>Export Students & Logs to CSV (Excel)</span>
              </button>

              {/* Google Sheets Integration */}
              <button
                onClick={async () => {
                  try {
                    const { exportToGoogleSheets } = await import('../../lib/workspace');
                    const res = await exportToGoogleSheets('Academic Ledger', students, hifzLogs);
                    onShowToast?.(`Google Spreadsheet created! ID: ${res.spreadsheetId.slice(0, 12)}...`);
                  } catch (e: any) {
                    console.error(e);
                    onShowToast?.(e.message || 'Error exporting to Google Sheets');
                  }
                }}
                className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <FileSpreadsheet className="w-4 h-4 text-emerald-200" />
                <span>Sync & Export Directly to Google Sheets</span>
              </button>

              <button
                onClick={onExportJSON}
                className="w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-emerald-400" />
                <span>Export Complete JSON Backup Archive</span>
              </button>

              <div className="pt-2">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept=".json"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      onImportJSON(e.target.files[0]);
                    }
                  }}
                />
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 text-xs font-bold py-3 rounded-xl transition flex items-center justify-center gap-2 border border-gray-300"
                >
                  <Upload className="w-4 h-4 text-gray-600" />
                  <span>Restore from JSON Backup File</span>
                </button>
              </div>
            </div>
          </div>

          {/* Cloud Sync Config & Reset */}
          <div className="bg-white p-6 rounded-3xl border border-gray-200 shadow-sm space-y-4 flex flex-col justify-between">
            <div>
              <h4 className="text-base font-extrabold text-gray-900 flex items-center gap-2">
                <RefreshCw className="w-5 h-5 text-[#0F5132]" />
                <span>Cloud & System Settings</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mt-2">
                Synchronize new applications and daily Sabaq marks automatically with Google Sheets and remote webhooks.
              </p>

              <div className="mt-4 p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-xs">
                <span className="font-bold text-[#0F5132] block">Current Cloud Configuration:</span>
                <span className="font-mono text-[11px] text-gray-700 break-all block mt-1">
                  {cloudConfig.googleScriptUrl || 'No Google Apps Script endpoint configured yet.'}
                </span>
                <button
                  onClick={onOpenCloudConfig}
                  className="mt-3 text-xs font-bold text-[#0F5132] hover:underline flex items-center gap-1"
                >
                  <span>Open Configuration Modal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider block mb-2">
                System Diagnostics
              </span>
              <button
                onClick={() => setShowResetConfirm(true)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold py-2.5 rounded-xl transition border border-red-200 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                <span>Reset Demo Records</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODALS */}
      <HifzLogModal
        isOpen={showHifzLogModal}
        onClose={() => {
          setShowHifzLogModal(false);
          setSelectedStudentForLog(null);
        }}
        students={students}
        preselectedStudent={selectedStudentForLog}
        onSubmit={onAddHifzLog}
        currentMuallimName={currentUser?.name || "Mu'allim Ziyad Abdullahi"}
      />

      <AddStudentModal
        isOpen={showAddStudentModal}
        onClose={() => setShowAddStudentModal(false)}
        onAdd={onAddStudent}
        nextStudentCount={students.length}
      />

      <StudentReportModal
        isOpen={showReportModal}
        onClose={() => {
          setShowReportModal(false);
          setSelectedStudentForReport(null);
        }}
        student={selectedStudentForReport}
        logs={hifzLogs}
      />

      <CertificateGenerator
        isOpen={showCertModal}
        onClose={() => {
          setShowCertModal(false);
          setSelectedStudentForCert(null);
        }}
        student={selectedStudentForCert}
      />

      <ReceiptModal
        isOpen={showReceiptModal}
        onClose={() => {
          setShowReceiptModal(false);
          setSelectedPledgeForReceipt(null);
        }}
        pledge={selectedPledgeForReceipt}
      />

      {/* Custom In-App Delete Student Confirmation Modal */}
      {studentToDelete && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-gray-900 mb-1">Remove Student?</h4>
            <p className="text-xs text-gray-600 mb-5">
              Are you sure you want to remove <strong>{studentToDelete.name}</strong> ({studentToDelete.code}) from the active roster?
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <button
                onClick={() => setStudentToDelete(null)}
                className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onDeleteStudent(studentToDelete.id);
                  setStudentToDelete(null);
                }}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition shadow"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Custom In-App Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-sm w-full p-6 shadow-2xl border border-gray-100 text-center">
            <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <RefreshCw className="w-6 h-6" />
            </div>
            <h4 className="text-base font-black text-gray-900 mb-1">Reset Demo Data?</h4>
            <p className="text-xs text-gray-600 mb-5">
              This will restore all student records, Hifz logs, admissions, and Vision 2030 pledges back to the default demonstration dataset.
            </p>
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetData();
                  setShowResetConfirm(false);
                }}
                className="py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white transition shadow"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
