import React, { useState, useMemo } from 'react';
import { 
  Printer, 
  Download, 
  Calendar, 
  BookOpen, 
  Award, 
  TrendingUp, 
  Users, 
  Search, 
  Filter, 
  FileText, 
  CheckCircle2, 
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Eye,
  Layers,
  ArrowUpDown
} from 'lucide-react';
import { Student, HifzLog, Grade } from '../../types';
import { OFFICIAL_LOGO_URL } from '../../data/initialData';

interface MonthlyProgressReportProps {
  students: Student[];
  hifzLogs: HifzLog[];
  onSelectStudent?: (student: Student) => void;
  onOpenReportModal?: (student: Student) => void;
  onOpenCertModal?: (student: Student) => void;
}

interface StudentMonthlySummary {
  student: Student;
  startingJuz: number;
  endingJuz: number;
  netGain: number;
  sessionCount: number;
  sabaqSummaries: string[];
  bestGrade: Grade;
  mumtazCount: number;
  sabqiJuzMax: number;
  manzilJuzMax: number;
  muallimNames: string[];
  latestNote: string;
  evaluatedStatus: 'EXCEEDING' | 'ON_TRACK' | 'REVISION_FOCUS' | 'KHATM_PREP';
}

export const MonthlyProgressReport: React.FC<MonthlyProgressReportProps> = ({
  students,
  hifzLogs,
  onSelectStudent,
  onOpenReportModal,
  onOpenCertModal
}) => {
  // Extract all distinct months available in the logs
  const availableMonths = useMemo(() => {
    const monthSet = new Set<string>();
    hifzLogs.forEach(l => {
      if (l.date && l.date.length >= 7) {
        monthSet.add(l.date.slice(0, 7)); // e.g. "2026-10"
      }
    });

    const sorted = Array.from(monthSet).sort().reverse();
    // If no months found, default to October 2026
    return sorted.length > 0 ? sorted : ['2026-10', '2026-09', '2026-08'];
  }, [hifzLogs]);

  const [selectedMonth, setSelectedMonth] = useState<string>(() => {
    return availableMonths[0] || '2026-10';
  });

  const [searchQuery, setSearchQuery] = useState('');
  const [filterTrack, setFilterTrack] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<'NAME' | 'GAIN' | 'JUZ' | 'ATTENDANCE'>('GAIN');

  // Format month string into human readable title e.g. "2026-10" -> "October 2026"
  const monthTitle = useMemo(() => {
    if (selectedMonth === 'ALL') return 'Comprehensive Cumulative Summary (All Months)';
    const [year, month] = selectedMonth.split('-');
    const dateObj = new Date(parseInt(year, 10), parseInt(month, 10) - 1, 1);
    return dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  }, [selectedMonth]);

  // Aggregate Hifz logs per student for the chosen month
  const monthlyData = useMemo<StudentMonthlySummary[]>(() => {
    return students.map(student => {
      // Find logs for this student in the selected month
      const relevantLogs = hifzLogs.filter(l => {
        const matchesStudent = l.studentId === student.id || l.studentCode === student.code;
        if (!matchesStudent) return false;
        if (selectedMonth === 'ALL') return true;
        return l.date.startsWith(selectedMonth);
      }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

      let startingJuz = student.juzLevel;
      let endingJuz = student.juzLevel;
      let netGain = 0;
      let bestGrade: Grade = 'MUMTAZ';
      let mumtazCount = 0;
      let sabqiJuzMax = 0;
      let manzilJuzMax = 0;
      const sabaqSummaries: string[] = [];
      const muallims = new Set<string>();
      let latestNote = student.notes || 'Consistent daily recitation maintained.';

      if (relevantLogs.length > 0) {
        // Earliest log in the month
        const firstLog = relevantLogs[0];
        const lastLog = relevantLogs[relevantLogs.length - 1];

        // Starting juz was prior to or at earliest log
        startingJuz = Math.max(1, firstLog.sabqiJuz > 1 ? firstLog.sabqiJuz - 1 : firstLog.sabqiJuz);
        endingJuz = lastLog.sabqiJuz || student.juzLevel;
        netGain = Math.max(0, endingJuz - startingJuz);
        if (netGain === 0 && relevantLogs.length >= 2) {
          // If in same juz, partial gain (e.g. 0.5 juz)
          netGain = 0.5;
        }

        relevantLogs.forEach(l => {
          sabaqSummaries.push(l.sabaqRange);
          if (l.grade === 'MUMTAZ') mumtazCount++;
          if (l.sabqiJuz > sabqiJuzMax) sabqiJuzMax = l.sabqiJuz;
          if (l.manzilJuz > manzilJuzMax) manzilJuzMax = l.manzilJuz;
          if (l.muallimName) muallims.add(l.muallimName);
          if (l.notes) latestNote = l.notes;
        });

        bestGrade = relevantLogs.some(l => l.grade === 'MUMTAZ') ? 'MUMTAZ' : 'JAYYID_JIDDAN';
      } else {
        // If no log in this specific month, calculate estimated baseline from student current status
        startingJuz = Math.max(1, student.juzLevel - 1);
        endingJuz = student.juzLevel;
        netGain = student.status === 'GRADUATED' ? 0 : 1;
        sabaqSummaries.push(student.currentSurah);
        sabqiJuzMax = Math.max(1, student.juzLevel - 2);
        manzilJuzMax = Math.max(1, Math.floor(student.juzLevel / 2));
      }

      let evaluatedStatus: 'EXCEEDING' | 'ON_TRACK' | 'REVISION_FOCUS' | 'KHATM_PREP' = 'ON_TRACK';
      if (student.status === 'KHATM_TRACK' || endingJuz >= 28) {
        evaluatedStatus = 'KHATM_PREP';
      } else if (netGain >= 1.5 || student.dailyAttendance >= 98) {
        evaluatedStatus = 'EXCEEDING';
      } else if (student.dailyAttendance < 92) {
        evaluatedStatus = 'REVISION_FOCUS';
      }

      return {
        student,
        startingJuz,
        endingJuz,
        netGain,
        sessionCount: relevantLogs.length,
        sabaqSummaries,
        bestGrade,
        mumtazCount,
        sabqiJuzMax,
        manzilJuzMax,
        muallimNames: Array.from(muallims),
        latestNote,
        evaluatedStatus
      };
    });
  }, [students, hifzLogs, selectedMonth]);

  // Filter & Sort
  const filteredData = useMemo(() => {
    return monthlyData
      .filter(item => {
        const matchesSearch = 
          item.student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.student.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.student.guardianName.toLowerCase().includes(searchQuery.toLowerCase());
        
        const matchesTrack = filterTrack === 'ALL' || item.student.track === filterTrack;

        return matchesSearch && matchesTrack;
      })
      .sort((a, b) => {
        if (sortBy === 'GAIN') return b.netGain - a.netGain;
        if (sortBy === 'JUZ') return b.endingJuz - a.endingJuz;
        if (sortBy === 'ATTENDANCE') return b.student.dailyAttendance - a.student.dailyAttendance;
        return a.student.name.localeCompare(b.student.name);
      });
  }, [monthlyData, searchQuery, filterTrack, sortBy]);

  // Overall Monthly KPI Stats
  const kpis = useMemo(() => {
    const totalAssessed = filteredData.length;
    const totalSessions = filteredData.reduce((acc, curr) => acc + curr.sessionCount, 0);
    const totalJuzGained = filteredData.reduce((acc, curr) => acc + curr.netGain, 0);
    const avgAttendance = totalAssessed > 0 
      ? Math.round(filteredData.reduce((acc, curr) => acc + curr.student.dailyAttendance, 0) / totalAssessed) 
      : 0;
    const mumtazPerformers = filteredData.filter(d => d.bestGrade === 'MUMTAZ').length;
    const mumtazRate = totalAssessed > 0 ? Math.round((mumtazPerformers / totalAssessed) * 100) : 0;

    return {
      totalAssessed,
      totalSessions,
      totalJuzGained: totalJuzGained.toFixed(1),
      avgAttendance,
      mumtazRate
    };
  }, [filteredData]);

  const handlePrint = () => {
    window.print();
  };

  const handleExportCSV = () => {
    const headers = [
      'Registration Code',
      'Student Name',
      'Track',
      'Start Juz',
      'End Juz',
      'Net Juz Gain',
      'Evaluated Sessions',
      'Evaluation Grade',
      'Daily Attendance %',
      'Current Sabaq Range',
      'Muallim Comments'
    ];

    const rows = filteredData.map(d => [
      `"${d.student.code}"`,
      `"${d.student.name}"`,
      `"${d.student.track}"`,
      d.startingJuz,
      d.endingJuz,
      d.netGain,
      d.sessionCount,
      `"${d.bestGrade}"`,
      `${d.student.dailyAttendance}%`,
      `"${d.student.currentSurah}"`,
      `"${d.latestNote.replace(/"/g, '""')}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Markazul_Furqan_Monthly_Hifz_Report_${selectedMonth}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">

      {/* TOP CONTROLS & FILTER TOOLBAR (Hidden during Print) */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 shadow-xs no-print">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-4 border-b border-gray-100">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="p-1.5 bg-emerald-100 text-[#0F5132] rounded-lg">
                <FileText className="w-4 h-4" />
              </span>
              <h3 className="text-base font-black text-gray-900 tracking-tight">
                Monthly Hifz Progress & Evaluation Reporting Engine
              </h3>
              <span className="bg-[#D4AF37]/20 text-[#856404] text-[10px] font-black px-2.5 py-0.5 rounded-full border border-[#D4AF37]/40">
                Official Printable Format
              </span>
            </div>
            <p className="text-xs text-gray-500">
              Aggregates all daily Sabaq, Sabqi, and Manzil evaluations into official monthly academic ledgers for parents, donors, and board inspection.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 self-stretch lg:self-auto justify-end">
            <button
              onClick={handlePrint}
              className="bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-black px-4 py-2.5 rounded-xl transition shadow flex items-center gap-2 cursor-pointer"
              title="Print official monthly report with institutional seal"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print Official Table</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold px-3.5 py-2.5 rounded-xl transition shadow flex items-center gap-1.5 cursor-pointer"
              title="Download CSV spreadsheet of this monthly report"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span className="hidden sm:inline">Export CSV</span>
            </button>
          </div>
        </div>

        {/* Filters and Month Picker Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-4">
          
          {/* Month Selector */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
              Select Academic Month
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#0F5132] focus:bg-white transition"
              >
                {availableMonths.map(m => {
                  const [yr, mo] = m.split('-');
                  const d = new Date(parseInt(yr, 10), parseInt(mo, 10) - 1, 1);
                  const label = d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
                  return (
                    <option key={m} value={m}>
                      {label} ({m})
                    </option>
                  );
                })}
                <option value="ALL">All-Time Cumulative Summary</option>
              </select>
            </div>
          </div>

          {/* Search by Student Name / ID */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
              Search Student
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search name, code, or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-medium text-gray-800 focus:ring-2 focus:ring-[#0F5132] focus:bg-white transition"
              />
            </div>
          </div>

          {/* Track Filter */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
              Filter Track
            </label>
            <select
              value={filterTrack}
              onChange={(e) => setFilterTrack(e.target.value)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#0F5132] focus:bg-white transition"
            >
              <option value="ALL">All Tracks (Hifz, Tajweed, Arabic)</option>
              <option value="HIFZ">Full-Time Hifz Memorization</option>
              <option value="TAJWEED">Tajweed & Recitation Track</option>
              <option value="ARABIC">Arabic Language & Grammar</option>
              <option value="WEEKEND">Weekend Intensive</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="text-[11px] font-bold text-gray-500 uppercase block mb-1">
              Sort Records By
            </label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-xl text-xs font-bold text-gray-800 focus:ring-2 focus:ring-[#0F5132] focus:bg-white transition"
            >
              <option value="GAIN">Highest Net Juz Advancement</option>
              <option value="JUZ">Current Juz Level (Highest First)</option>
              <option value="ATTENDANCE">Daily Attendance %</option>
              <option value="NAME">Student Name (A-Z)</option>
            </select>
          </div>

        </div>
      </div>

      {/* MONTHLY SUMMARY METRIC CARDS (Visible on screen and in print) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 no-print">
        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Students Assessed</span>
            <Users className="w-4 h-4 text-[#0F5132]" />
          </div>
          <div className="text-2xl font-black text-gray-900">
            {kpis.totalAssessed} <span className="text-xs font-medium text-gray-500">Haffaz</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            {monthTitle}
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Net Juz Advancement</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-[#0F5132]">
            +{kpis.totalJuzGained} <span className="text-xs font-medium text-emerald-700">Juz</span>
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Cumulative center gain
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Excellence (Mumtaz) Rate</span>
            <Award className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <div className="text-2xl font-black text-amber-900">
            {kpis.mumtazRate}%
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Highest retention tier
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-xs">
          <div className="flex items-center justify-between text-gray-500 text-xs font-bold mb-1">
            <span>Average Attendance</span>
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-2xl font-black text-blue-900">
            {kpis.avgAttendance}%
          </div>
          <div className="text-[11px] text-gray-400 mt-1">
            Consistent halaqah presence
          </div>
        </div>
      </div>

      {/* PRINTABLE REPORT CONTAINER */}
      {/* Has id="printable-report-area" so it automatically prints in 100% width cleanly */}
      <div id="printable-report-area" className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 sm:p-8">
        
        {/* OFFICIAL INSTITUTIONAL HEADER */}
        <div className="pb-6 mb-6 border-b-2 border-[#D4AF37] flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-[#D4AF37] shadow-md bg-white p-1 shrink-0">
              <img 
                src={OFFICIAL_LOGO_URL} 
                alt="Markazul Furqan Emblem" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0F5132] font-quran tracking-wider">
                بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ • مَرْكَزُ الْفُرْقَانِ لِتَحْفِيظِ الْقُرْآنِ الْكَرِيمِ
              </div>
              <h1 className="text-xl sm:text-2xl font-black text-gray-900 uppercase tracking-tight">
                Markazul Furqan Quran Memorization Center
              </h1>
              <p className="text-xs text-gray-600 font-medium">
                Chiro, West Hararghe Zone, Oromia, Ethiopia • Tel: +251 93 509 7339 • markazalfurqan19@gmail.com
              </p>
              <div className="flex flex-wrap items-center gap-2 mt-1.5 text-[11px]">
                <span className="font-bold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                  Document: Monthly Hifz Advancement Ledger
                </span>
                <span className="font-mono text-gray-600">
                  Ref: MF-REP-{selectedMonth}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right bg-emerald-50/70 p-4 rounded-2xl border border-emerald-200/80 min-w-[200px]">
            <div className="text-[10px] uppercase font-black text-[#0F5132] tracking-wider">
              Reporting Period
            </div>
            <div className="text-base font-black text-gray-950 mt-0.5">
              {monthTitle}
            </div>
            <div className="text-[11px] text-gray-500 font-medium mt-0.5">
              Academic Term: 1447-1448 AH
            </div>
            <div className="text-[10px] text-emerald-800 font-bold mt-1">
              Director: Ustaz Kadir Hamza Siyum
            </div>
          </div>
        </div>

        {/* PRINTABLE STATS STRIP FOR PRINT VIEW */}
        <div className="hidden print:grid grid-cols-4 gap-3 mb-6 p-3 bg-gray-50 border border-gray-300 rounded-xl text-xs">
          <div>
            <span className="font-bold text-gray-500 uppercase text-[9px] block">Students Evaluated</span>
            <span className="text-base font-black text-gray-900">{kpis.totalAssessed} Haffaz</span>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase text-[9px] block">Total Juz Gained</span>
            <span className="text-base font-black text-emerald-800">+{kpis.totalJuzGained} Juz</span>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase text-[9px] block">Average Attendance</span>
            <span className="text-base font-black text-gray-900">{kpis.avgAttendance}%</span>
          </div>
          <div>
            <span className="font-bold text-gray-500 uppercase text-[9px] block">Mumtaz Rate</span>
            <span className="text-base font-black text-amber-800">{kpis.mumtazRate}%</span>
          </div>
        </div>

        {/* AGGREGATED MONTHLY SUMMARY TABLE */}
        <div className="overflow-x-auto rounded-2xl border border-gray-200">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0F5132] text-white uppercase text-[10px] font-black tracking-wider">
              <tr>
                <th className="py-3.5 px-3">Student Info</th>
                <th className="py-3.5 px-2 text-center">Track</th>
                <th className="py-3.5 px-2 text-center">Month Start</th>
                <th className="py-3.5 px-2 text-center">Month End</th>
                <th className="py-3.5 px-2 text-center">Net Gain</th>
                <th className="py-3.5 px-2 text-center">Attendance</th>
                <th className="py-3.5 px-3">Sabaq / Curricular Scope</th>
                <th className="py-3.5 px-2 text-center">Evaluation</th>
                <th className="py-3.5 px-3">Mu'allim Notes</th>
                <th className="py-3.5 px-2 text-right no-print">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-gray-400 font-medium">
                    No student recitation records found matching the current filters for {monthTitle}.
                  </td>
                </tr>
              ) : (
                filteredData.map((d, index) => {
                  return (
                    <tr 
                      key={d.student.id} 
                      className={`hover:bg-emerald-50/40 transition ${
                        index % 2 === 1 ? 'bg-gray-50/60' : 'bg-white'
                      }`}
                    >
                      {/* 1. Student Name & Code */}
                      <td className="py-3 px-3">
                        <div className="font-black text-gray-900 text-xs leading-tight">
                          {d.student.name}
                        </div>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono text-[10px] font-bold text-[#0F5132] bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">
                            {d.student.code}
                          </span>
                          <span className="text-[10px] text-gray-500">
                            Age {d.student.age}
                          </span>
                        </div>
                      </td>

                      {/* 2. Track */}
                      <td className="py-3 px-2 text-center">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-gray-100 text-gray-700">
                          {d.student.track}
                        </span>
                      </td>

                      {/* 3. Starting Juz */}
                      <td className="py-3 px-2 text-center font-bold text-gray-700">
                        Juz {d.startingJuz}
                      </td>

                      {/* 4. Ending Juz */}
                      <td className="py-3 px-2 text-center">
                        <span className="font-black text-[#0F5132] text-xs">
                          Juz {d.endingJuz}
                        </span>
                      </td>

                      {/* 5. Net Gain */}
                      <td className="py-3 px-2 text-center">
                        {d.student.status === 'GRADUATED' ? (
                          <span className="text-[10px] font-extrabold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-full border border-purple-200">
                            Graduated
                          </span>
                        ) : d.netGain > 0 ? (
                          <span className="text-[11px] font-black text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                            +{d.netGain} Juz
                          </span>
                        ) : (
                          <span className="text-[10px] font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                            Consolidating
                          </span>
                        )}
                      </td>

                      {/* 6. Attendance % */}
                      <td className="py-3 px-2 text-center">
                        <div className="inline-flex items-center gap-1 font-bold">
                          <span className={`text-[11px] font-black ${
                            d.student.dailyAttendance >= 95 
                              ? 'text-emerald-700' 
                              : d.student.dailyAttendance >= 90 
                              ? 'text-amber-700' 
                              : 'text-rose-700'
                          }`}>
                            {d.student.dailyAttendance}%
                          </span>
                        </div>
                      </td>

                      {/* 7. Sabaq & Revision Coverage */}
                      <td className="py-3 px-3 max-w-xs">
                        <div className="font-semibold text-gray-800 truncate" title={d.student.currentSurah}>
                          {d.student.currentSurah}
                        </div>
                        <div className="text-[10px] text-gray-500 mt-0.5">
                          Sabqi: Juz {d.sabqiJuzMax} • Manzil: Juz {d.manzilJuzMax}
                        </div>
                      </td>

                      {/* 8. Best Grade */}
                      <td className="py-3 px-2 text-center">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                          d.bestGrade === 'MUMTAZ'
                            ? 'bg-amber-100 text-amber-900 border border-amber-300'
                            : 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                        }`}>
                          {d.bestGrade}
                        </span>
                      </td>

                      {/* 9. Mu'allim Notes */}
                      <td className="py-3 px-3 max-w-xs text-gray-600 text-[11px] leading-relaxed">
                        <p className="line-clamp-2" title={d.latestNote}>
                          {d.latestNote}
                        </p>
                      </td>

                      {/* 10. Actions (Hidden in Print) */}
                      <td className="py-3 px-2 text-right no-print whitespace-nowrap">
                        <button
                          onClick={() => onSelectStudent?.(d.student)}
                          className="bg-emerald-50 hover:bg-emerald-100 text-[#0F5132] p-1.5 rounded-lg border border-emerald-300 transition text-[11px] font-bold mr-1 inline-flex items-center gap-1"
                          title="View Student Detail & 30-Day Heatmap"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span className="hidden xl:inline">Detail</span>
                        </button>

                        <button
                          onClick={() => onOpenReportModal?.(d.student)}
                          className="bg-gray-100 hover:bg-gray-200 text-gray-700 p-1.5 rounded-lg transition text-[11px] font-bold inline-flex items-center gap-1"
                          title="Generate Single Student Transcript"
                        >
                          <FileText className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* OFFICIAL INSTITUTIONAL SIGNATURE BLOCK (Essential for printed audit documents) */}
        <div className="mt-10 pt-8 border-t-2 border-gray-300 grid grid-cols-1 sm:grid-cols-3 gap-8 text-center text-xs">
          
          {/* 1. Lead Mu'allim */}
          <div className="flex flex-col items-center">
            <div className="h-12 flex items-end justify-center pb-1">
              <span className="font-serif italic text-gray-600 font-bold text-sm tracking-wider">
                Ustaz Ziyad Abdullahi
              </span>
            </div>
            <div className="w-48 border-t-2 border-dashed border-gray-400 my-1"></div>
            <span className="font-black text-gray-900 uppercase text-[11px]">
              Lead Mu'allim & Halaqah Supervisor
            </span>
            <span className="text-[10px] text-gray-500">
              Department of Quranic Memorization
            </span>
          </div>

          {/* 2. Academic Dean */}
          <div className="flex flex-col items-center">
            <div className="h-12 flex items-end justify-center pb-1">
              <span className="font-serif italic text-gray-600 font-bold text-sm tracking-wider">
                Ustazah Amina Kemal
              </span>
            </div>
            <div className="w-48 border-t-2 border-dashed border-gray-400 my-1"></div>
            <span className="font-black text-gray-900 uppercase text-[11px]">
              Academic Dean of Examinations
            </span>
            <span className="text-[10px] text-gray-500">
              Curricular Audit & Tajweed Certification
            </span>
          </div>

          {/* 3. Center Director */}
          <div className="flex flex-col items-center">
            <div className="h-12 flex items-end justify-center pb-1">
              <div className="flex items-center gap-2">
                <span className="font-serif italic text-emerald-900 font-bold text-sm tracking-wider">
                  Ustaz Kadir Hamza Siyum
                </span>
                <span className="w-6 h-6 rounded-full border border-[#D4AF37] flex items-center justify-center text-[8px] font-black text-[#D4AF37] bg-emerald-950">
                  SEAL
                </span>
              </div>
            </div>
            <div className="w-48 border-t-2 border-dashed border-gray-400 my-1"></div>
            <span className="font-black text-gray-900 uppercase text-[11px]">
              Ustaz Kadir Hamza Siyum
            </span>
            <span className="text-[10px] text-gray-500">
              General Director & Founder • Markazul Furqan
            </span>
          </div>

        </div>

        {/* Institutional Stamp & Footer Verification Notice */}
        <div className="mt-8 pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between text-[10px] text-gray-500">
          <div>
            Markazul Furqan Official Academic Document • Chiro, West Hararghe, Ethiopia • Verified Record
          </div>
          <div className="font-mono">
            Generated on {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </div>
        </div>

      </div>

    </div>
  );
};
