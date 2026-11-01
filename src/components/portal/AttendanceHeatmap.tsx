import React, { useMemo, useState } from 'react';
import { 
  Calendar, 
  Clock, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  TrendingUp, 
  BarChart3, 
  CalendarDays,
  Info,
  ChevronRight
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip as RechartsTooltip, 
  Legend, 
  CartesianGrid 
} from 'recharts';
import { Student } from '../../types';

export type AttendanceDayStatus = 'PRESENT' | 'LATE' | 'EXCUSED' | 'ABSENT' | 'WEEKEND';

export interface DailyAttendanceRecord {
  date: string;          // YYYY-MM-DD
  dayOfWeek: string;     // Mon, Tue, etc.
  dayNumber: number;     // 1-31
  monthName: string;     // Oct, Nov
  status: AttendanceDayStatus;
  note: string;
  minutesLate?: number;
}

interface AttendanceHeatmapProps {
  student: Student;
  onUpdateDayStatus?: (date: string, newStatus: AttendanceDayStatus) => void;
  compact?: boolean;
}

export const AttendanceHeatmap: React.FC<AttendanceHeatmapProps> = ({
  student,
  compact = false
}) => {
  const [activeTab, setActiveTab] = useState<'HEATMAP' | 'PATTERNS' | 'CHART'>('HEATMAP');
  const [selectedDay, setSelectedDay] = useState<DailyAttendanceRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'MISSING' | 'LATE'>('ALL');

  // Generate 30 distinct daily records leading up to reference date (2026-11-01)
  const past30Days = useMemo<DailyAttendanceRecord[]>(() => {
    const records: DailyAttendanceRecord[] = [];
    const baseDate = new Date('2026-11-01T12:00:00Z');
    
    // Deterministic pseudo-random seed generator from student id
    const seed = student.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) + student.name.length * 7;
    
    // Target absences and lates based on student.dailyAttendance
    // 100% -> 0 abs, 0 late
    // 98%  -> 0 abs, 1 late
    // 95%  -> 1 abs or 1 excused, 1 late
    // 92%  -> 2 abs, 1 late, 1 excused
    // 88%  -> 3 abs, 2 late, 1 excused
    const attendancePct = student.dailyAttendance || 95;
    const targetAbsences = attendancePct >= 99 ? 0 : attendancePct >= 95 ? 1 : attendancePct >= 90 ? 2 : 4;
    const targetLates = attendancePct >= 99 ? 0 : attendancePct >= 94 ? 1 : 2;
    const targetExcused = attendancePct >= 96 ? (seed % 2 === 0 ? 1 : 0) : 1;

    let absCount = 0;
    let lateCount = 0;
    let excCount = 0;

    for (let i = 29; i >= 0; i--) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() - i);

      const dateStr = d.toISOString().slice(0, 10);
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      const dayOfWeek = dayNames[d.getUTCDay()];
      const dayNumber = d.getUTCDate();
      const monthName = monthNames[d.getUTCMonth()];

      // Friday afternoon is reduced/Jummah halaqah in Islamic madrasahs
      const isFriday = dayOfWeek === 'Fri';
      
      let status: AttendanceDayStatus = 'PRESENT';
      let note = 'Present on time. Completed daily Sabaq recitation & revision.';
      let minutesLate: number | undefined = undefined;

      // Deterministically place absences/lates to show realistic patterns
      // Many students have patterns (e.g. Thursday before weekend or Monday morning)
      if (isFriday) {
        // Friday attendance is usually high or designated Jummah
        status = 'PRESENT';
        note = 'Present • Special Friday Surah Al-Kahf & Manzil recitation halaqah.';
      } else {
        // Pattern 1: Thursdays often see travel / family visits in boarding/semi-boarding madrasahs
        if (dayOfWeek === 'Thu' && absCount < targetAbsences && ((seed + i) % 3 === 0)) {
          status = 'ABSENT';
          note = 'Unexcused absence: Pre-weekend missed afternoon revision halaqah.';
          absCount++;
        } 
        // Pattern 2: Monday morning tardiness
        else if (dayOfWeek === 'Mon' && lateCount < targetLates && ((seed + i) % 2 === 0)) {
          status = 'LATE';
          minutesLate = 15 + ((seed * (i + 1)) % 25);
          note = `Tardy: Arrived ${minutesLate} mins late for morning Fajr recitation.`;
          lateCount++;
        }
        // Pattern 3: Medical or excused
        else if (excCount < targetExcused && ((seed + i) % 5 === 0)) {
          status = 'EXCUSED';
          note = 'Excused Leave: Official guardian note submitted for medical clinic visit in Chiro.';
          excCount++;
        }
        // Additional absences if target not met
        else if (absCount < targetAbsences && ((seed + i) % 4 === 1)) {
          status = 'ABSENT';
          note = 'Unexcused absence: Student missed designated halaqah session.';
          absCount++;
        }
        // Additional late if target not met
        else if (lateCount < targetLates && ((seed + i) % 4 === 2)) {
          status = 'LATE';
          minutesLate = 10 + ((seed + i) % 15);
          note = `Late arrival: Delayed by ${minutesLate} minutes due to morning transport.`;
          lateCount++;
        }
      }

      records.push({
        date: dateStr,
        dayOfWeek,
        dayNumber,
        monthName,
        status,
        note,
        minutesLate
      });
    }

    return records;
  }, [student.id, student.name, student.dailyAttendance]);

  // Aggregated metrics over past 30 days
  const metrics = useMemo(() => {
    let present = 0;
    let late = 0;
    let excused = 0;
    let absent = 0;

    const dayOfWeekStats: Record<string, { total: number; present: number; missing: number; late: number }> = {
      'Mon': { total: 0, present: 0, missing: 0, late: 0 },
      'Tue': { total: 0, present: 0, missing: 0, late: 0 },
      'Wed': { total: 0, present: 0, missing: 0, late: 0 },
      'Thu': { total: 0, present: 0, missing: 0, late: 0 },
      'Fri': { total: 0, present: 0, missing: 0, late: 0 },
      'Sat': { total: 0, present: 0, missing: 0, late: 0 },
      'Sun': { total: 0, present: 0, missing: 0, late: 0 },
    };

    past30Days.forEach(r => {
      if (r.status === 'PRESENT') present++;
      else if (r.status === 'LATE') late++;
      else if (r.status === 'EXCUSED') excused++;
      else if (r.status === 'ABSENT') absent++;

      if (dayOfWeekStats[r.dayOfWeek]) {
        dayOfWeekStats[r.dayOfWeek].total++;
        if (r.status === 'PRESENT') {
          dayOfWeekStats[r.dayOfWeek].present++;
        } else if (r.status === 'LATE') {
          dayOfWeekStats[r.dayOfWeek].late++;
        } else {
          dayOfWeekStats[r.dayOfWeek].missing++;
        }
      }
    });

    const totalDays = past30Days.length;
    // Effective attendance rate = (present + late + excused*0.5) / total
    const calculatedRate = Math.round(((present + late * 0.9 + excused * 0.7) / totalDays) * 100);

    // Identify pattern with highest missing or late days
    let worstDay = '';
    let maxIssues = 0;
    Object.entries(dayOfWeekStats).forEach(([day, s]) => {
      const issues = s.missing + s.late;
      if (issues > maxIssues) {
        maxIssues = issues;
        worstDay = day;
      }
    });

    let patternAlert = 'Consistent attendance pattern observed with zero critical irregularities.';
    if (absent >= 2 && worstDay === 'Thu') {
      patternAlert = `Pattern Alert: Recurring pre-weekend absences observed on Thursdays (${dayOfWeekStats['Thu'].missing} missed).`;
    } else if (late >= 2 && worstDay === 'Mon') {
      patternAlert = `Pattern Alert: Tardy arrivals concentrated on Monday mornings after the weekend.`;
    } else if (absent === 0 && late === 0) {
      patternAlert = 'Perfect 100% Attendance Streak: Zero absences or tardies recorded in the past 30 days!';
    } else if (worstDay && maxIssues > 1) {
      patternAlert = `Pattern Insight: Irregularities concentrated on ${worstDay}s (${maxIssues} missed or late sessions).`;
    }

    // Chart dataset for day-of-week breakdown
    const chartData = Object.entries(dayOfWeekStats).map(([day, s]) => ({
      day,
      Present: s.present,
      Late: s.late,
      Absent: s.missing,
      Rate: Math.round((s.present / (s.total || 1)) * 100)
    }));

    return {
      totalDays,
      present,
      late,
      excused,
      absent,
      calculatedRate,
      patternAlert,
      dayOfWeekStats,
      chartData
    };
  }, [past30Days]);

  // Color mapper for status
  const getStatusColor = (status: AttendanceDayStatus) => {
    switch (status) {
      case 'PRESENT':
        return 'bg-emerald-600 hover:bg-emerald-500 text-white border-emerald-700';
      case 'LATE':
        return 'bg-amber-400 hover:bg-amber-300 text-amber-950 border-amber-500 font-bold';
      case 'EXCUSED':
        return 'bg-sky-500 hover:bg-sky-400 text-white border-sky-600';
      case 'ABSENT':
        return 'bg-rose-600 hover:bg-rose-500 text-white border-rose-700 animate-pulse';
      case 'WEEKEND':
        return 'bg-gray-100 text-gray-400 border-gray-200';
      default:
        return 'bg-gray-200 text-gray-700';
    }
  };

  const getStatusBadge = (status: AttendanceDayStatus) => {
    switch (status) {
      case 'PRESENT':
        return <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full">Present</span>;
      case 'LATE':
        return <span className="bg-amber-100 text-amber-900 text-[10px] font-black px-2 py-0.5 rounded-full">Late</span>;
      case 'EXCUSED':
        return <span className="bg-sky-100 text-sky-800 text-[10px] font-black px-2 py-0.5 rounded-full">Excused</span>;
      case 'ABSENT':
        return <span className="bg-rose-100 text-rose-800 text-[10px] font-black px-2 py-0.5 rounded-full">Absent</span>;
      default:
        return null;
    }
  };

  // Filtered days for visual highlighting
  const displayedDays = past30Days.filter(day => {
    if (statusFilter === 'ALL') return true;
    if (statusFilter === 'MISSING') return day.status === 'ABSENT' || day.status === 'EXCUSED';
    if (statusFilter === 'LATE') return day.status === 'LATE';
    return true;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-xs p-4 sm:p-5">
      
      {/* Top Header & Tab Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3.5 border-b border-gray-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 bg-emerald-100 text-[#0F5132] rounded-lg">
              <CalendarDays className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-black text-gray-900 tracking-tight">
              30-Day Attendance Heatmap & Pattern Audit
            </h3>
            <span className="bg-gray-100 text-gray-700 text-[10px] font-extrabold px-2 py-0.5 rounded-full">
              Past 30 Days
            </span>
          </div>
          <p className="text-xs text-gray-500 mt-0.5">
            Daily halaqah presence tracking with automated pattern detection for missed sessions.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl self-start sm:self-auto text-xs font-bold">
          <button
            onClick={() => setActiveTab('HEATMAP')}
            className={`px-3 py-1 rounded-lg transition ${
              activeTab === 'HEATMAP'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Heatmap Grid
          </button>
          <button
            onClick={() => setActiveTab('CHART')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
              activeTab === 'CHART'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Day-of-Week</span>
          </button>
          <button
            onClick={() => setActiveTab('PATTERNS')}
            className={`px-3 py-1 rounded-lg transition flex items-center gap-1 ${
              activeTab === 'PATTERNS'
                ? 'bg-white text-gray-900 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
            <span>Patterns</span>
          </button>
        </div>
      </div>

      {/* KPI Summary Quick Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 my-3.5">
        <div className="bg-emerald-50/80 border border-emerald-200/80 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-emerald-800">
            <span>Present</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
          </div>
          <div className="text-lg font-black text-emerald-950 mt-0.5">
            {metrics.present} <span className="text-[10px] font-medium text-emerald-700">/ 30 Days</span>
          </div>
        </div>

        <div className="bg-amber-50/80 border border-amber-200/80 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
            <span>Late Arrivals</span>
            <Clock className="w-3.5 h-3.5 text-amber-600" />
          </div>
          <div className="text-lg font-black text-amber-950 mt-0.5">
            {metrics.late} <span className="text-[10px] font-medium text-amber-700">Days</span>
          </div>
        </div>

        <div className="bg-rose-50/80 border border-rose-200/80 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-rose-800">
            <span>Unexcused Absences</span>
            <XCircle className="w-3.5 h-3.5 text-rose-600" />
          </div>
          <div className="text-lg font-black text-rose-950 mt-0.5">
            {metrics.absent} <span className="text-[10px] font-medium text-rose-700">Days</span>
          </div>
        </div>

        <div className="bg-sky-50/80 border border-sky-200/80 rounded-xl p-2.5">
          <div className="flex items-center justify-between text-[11px] font-bold text-sky-800">
            <span>Excused Leave</span>
            <HelpCircle className="w-3.5 h-3.5 text-sky-600" />
          </div>
          <div className="text-lg font-black text-sky-950 mt-0.5">
            {metrics.excused} <span className="text-[10px] font-medium text-sky-700">Days</span>
          </div>
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-[11px] font-bold text-gray-700">
            <span>30-Day Index</span>
            <TrendingUp className="w-3.5 h-3.5 text-[#0F5132]" />
          </div>
          <div className="text-lg font-black text-[#0F5132] mt-0.5">
            {student.dailyAttendance}%
          </div>
        </div>
      </div>

      {/* Pattern Detection Alert Banner */}
      <div className={`p-3 rounded-xl mb-4 text-xs flex items-start gap-2.5 border ${
        metrics.absent > 1 
          ? 'bg-rose-50 border-rose-200 text-rose-900' 
          : metrics.late > 1 
          ? 'bg-amber-50 border-amber-200 text-amber-900' 
          : 'bg-emerald-50 border-emerald-200 text-emerald-900'
      }`}>
        {metrics.absent > 1 ? (
          <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
        ) : metrics.late > 1 ? (
          <Clock className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        ) : (
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
        )}
        <div className="flex-1">
          <span className="font-black mr-1.5 uppercase text-[10px] tracking-wide">
            Halaqah Intelligence:
          </span>
          <span className="font-semibold">{metrics.patternAlert}</span>
        </div>
      </div>

      {/* 1. HEATMAP GRID TAB */}
      {activeTab === 'HEATMAP' && (
        <div>
          {/* Quick Filter buttons */}
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="text-xs font-bold text-gray-600">
              Hover over or click any cell to inspect date & supervisor notes:
            </span>

            <div className="flex items-center gap-1.5 text-[11px] font-semibold">
              <span className="text-gray-400">Filter:</span>
              <button
                onClick={() => setStatusFilter('ALL')}
                className={`px-2 py-0.5 rounded-md ${
                  statusFilter === 'ALL'
                    ? 'bg-gray-800 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setStatusFilter('MISSING')}
                className={`px-2 py-0.5 rounded-md ${
                  statusFilter === 'MISSING'
                    ? 'bg-rose-600 text-white'
                    : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                }`}
              >
                Missing Only
              </button>
              <button
                onClick={() => setStatusFilter('LATE')}
                className={`px-2 py-0.5 rounded-md ${
                  statusFilter === 'LATE'
                    ? 'bg-amber-500 text-amber-950 font-bold'
                    : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                Late Only
              </button>
            </div>
          </div>

          {/* 30-Day Heatmap Grid */}
          <div className="bg-gray-50/70 p-3.5 rounded-2xl border border-gray-200">
            <div className="grid grid-cols-6 sm:grid-cols-10 gap-2">
              {past30Days.map((rec) => {
                const isSelected = selectedDay?.date === rec.date;
                const isFilteredOut = 
                  (statusFilter === 'MISSING' && rec.status !== 'ABSENT' && rec.status !== 'EXCUSED') ||
                  (statusFilter === 'LATE' && rec.status !== 'LATE');

                return (
                  <button
                    key={rec.date}
                    onClick={() => setSelectedDay(rec)}
                    className={`relative p-2 rounded-xl text-center border transition cursor-pointer flex flex-col items-center justify-center ${
                      getStatusColor(rec.status)
                    } ${
                      isSelected 
                        ? 'ring-3 ring-gray-900 ring-offset-2 scale-105 z-10 shadow-md' 
                        : ''
                    } ${
                      isFilteredOut ? 'opacity-20' : 'opacity-100'
                    }`}
                    title={`${rec.dayOfWeek}, ${rec.monthName} ${rec.dayNumber} — ${rec.status}: ${rec.note}`}
                  >
                    <span className="text-[9px] uppercase font-bold opacity-80 leading-none">
                      {rec.dayOfWeek}
                    </span>
                    <span className="text-sm font-black my-0.5 leading-none">
                      {rec.dayNumber}
                    </span>
                    <span className="text-[9px] font-semibold opacity-90 leading-none">
                      {rec.monthName}
                    </span>

                    {/* Indicator Dot for Missing or Late */}
                    {rec.status === 'ABSENT' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-600 rounded-full border-2 border-white"></span>
                    )}
                    {rec.status === 'LATE' && (
                      <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-600 rounded-full border-2 border-white"></span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Heatmap Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-gray-200/80 text-[11px] text-gray-600">
              <div className="flex flex-wrap items-center gap-3">
                <span className="font-bold text-gray-700">Legend:</span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-emerald-600 inline-block"></span>
                  <span>Present</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-amber-400 inline-block"></span>
                  <span>Late</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-sky-500 inline-block"></span>
                  <span>Excused</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-md bg-rose-600 inline-block"></span>
                  <span>Absent</span>
                </span>
              </div>
              <span className="text-gray-400 text-[10px]">
                Audited Markazul Furqan Student Attendance Ledger
              </span>
            </div>
          </div>

          {/* Selected Day Detail Popover / Card */}
          {selectedDay && (
            <div className="mt-3.5 p-3.5 bg-white border border-gray-200 rounded-xl shadow-xs animate-fadeIn flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-xl text-center shrink-0 w-12 ${getStatusColor(selectedDay.status)}`}>
                  <div className="text-[10px] font-bold uppercase">{selectedDay.dayOfWeek}</div>
                  <div className="text-base font-black leading-none my-0.5">{selectedDay.dayNumber}</div>
                  <div className="text-[10px] font-semibold">{selectedDay.monthName}</div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-gray-900">{selectedDay.date}</span>
                    {getStatusBadge(selectedDay.status)}
                    {selectedDay.minutesLate && (
                      <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded">
                        +{selectedDay.minutesLate}m tardy
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-700 mt-1 font-medium">
                    {selectedDay.note}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedDay(null)}
                className="text-xs font-bold text-gray-400 hover:text-gray-700 self-end sm:self-auto px-2 py-1 rounded-lg hover:bg-gray-100"
              >
                Dismiss
              </button>
            </div>
          )}
        </div>
      )}

      {/* 2. RECHARTS DAY-OF-WEEK BREAKDOWN CHART TAB */}
      {activeTab === 'CHART' && (
        <div className="bg-gray-50/70 p-4 rounded-2xl border border-gray-200">
          <div className="flex justify-between items-center mb-2">
            <div>
              <h4 className="text-xs font-black text-gray-900">
                Attendance Distribution by Day of Week
              </h4>
              <p className="text-[11px] text-gray-500">
                Visualizes which weekdays accumulate the most absences or tardy entries to spot recurring halaqah patterns.
              </p>
            </div>
            <span className="text-[11px] font-bold text-[#0F5132] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Recharts Analysis
            </span>
          </div>

          <div className="w-full h-56 mt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={metrics.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                <XAxis 
                  dataKey="day" 
                  tick={{ fontSize: 11, fill: '#4b5563', fontWeight: 600 }} 
                  axisLine={{ stroke: '#9ca3af' }}
                />
                <YAxis 
                  allowDecimals={false}
                  tick={{ fontSize: 10, fill: '#6b7280' }} 
                  axisLine={{ stroke: '#9ca3af' }}
                />
                <RechartsTooltip 
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bg-white p-2.5 rounded-xl shadow-lg border border-gray-200 text-xs">
                          <div className="font-black text-gray-900 border-b border-gray-100 pb-1 mb-1.5">
                            {label} Halaqat Breakdown
                          </div>
                          <div className="text-emerald-700 font-bold flex items-center justify-between gap-3">
                            <span>Present Sessions:</span>
                            <span>{payload.find(p => p.dataKey === 'Present')?.value || 0}</span>
                          </div>
                          <div className="text-amber-700 font-bold flex items-center justify-between gap-3">
                            <span>Late Arrivals:</span>
                            <span>{payload.find(p => p.dataKey === 'Late')?.value || 0}</span>
                          </div>
                          <div className="text-rose-700 font-bold flex items-center justify-between gap-3">
                            <span>Absences / Excused:</span>
                            <span>{payload.find(p => p.dataKey === 'Absent')?.value || 0}</span>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend 
                  verticalAlign="top" 
                  height={24} 
                  formatter={(val) => <span className="text-[11px] font-bold text-gray-700">{val}</span>} 
                />
                <Bar dataKey="Present" fill="#059669" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="Late" fill="#f59e0b" radius={[4, 4, 0, 0]} stackId="a" />
                <Bar dataKey="Absent" fill="#e11d48" radius={[4, 4, 0, 0]} stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* 3. PATTERN DETECTION TAB */}
      {activeTab === 'PATTERNS' && (
        <div className="space-y-3">
          <div className="bg-amber-50/60 p-4 rounded-2xl border border-amber-200/80">
            <h4 className="text-xs font-black text-amber-950 flex items-center gap-1.5 mb-1">
              <AlertTriangle className="w-4 h-4 text-amber-600" />
              <span>Pattern Analysis & Mu'allim Action Items</span>
            </h4>
            <p className="text-xs text-amber-900 leading-relaxed mb-3">
              Algorithms detect chronic missing patterns that threaten memorization retention (Itqan). Missed days lead to regression in Sabqi and Manzil cycles.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-xs">
                <span className="text-[10px] font-black uppercase text-gray-500 block">Pre-Weekend Dropoff</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-gray-900">Thursday Attendance</span>
                  <span className="font-black text-amber-800">
                    {metrics.dayOfWeekStats['Thu'].present} / {metrics.dayOfWeekStats['Thu'].total} days
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  {metrics.dayOfWeekStats['Thu'].missing > 0 
                    ? `Warning: Student has ${metrics.dayOfWeekStats['Thu'].missing} missed Thursday sessions.`
                    : 'Optimal consistency observed on pre-weekend sessions.'}
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-amber-100 shadow-xs">
                <span className="text-[10px] font-black uppercase text-gray-500 block">Post-Weekend Resumption</span>
                <div className="flex items-center justify-between mt-1">
                  <span className="font-bold text-gray-900">Monday Punctuality</span>
                  <span className="font-black text-blue-800">
                    {metrics.dayOfWeekStats['Mon'].present} on-time ({metrics.dayOfWeekStats['Mon'].late} late)
                  </span>
                </div>
                <div className="text-[11px] text-gray-500 mt-1">
                  {metrics.dayOfWeekStats['Mon'].late > 0 
                    ? `Action: Advise guardian regarding Monday morning transportation timing.`
                    : 'Prompt arrival confirmed for Monday morning Halaqah.'}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
