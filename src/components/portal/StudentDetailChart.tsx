import React, { useMemo, useState } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  Area,
  ComposedChart
} from 'recharts';
import { TrendingUp, Award, Calendar, Sparkles, BookOpen, Clock, CheckCircle2 } from 'lucide-react';
import { Student, HifzLog } from '../../types';

interface StudentDetailChartProps {
  student: Student;
  hifzLogs: HifzLog[];
  height?: number;
  showCardWrapper?: boolean;
}

export const StudentDetailChart: React.FC<StudentDetailChartProps> = ({
  student,
  hifzLogs,
  height = 260,
  showCardWrapper = true
}) => {
  const [viewMode, setViewMode] = useState<'ALL' | '6M' | 'LOGS'>('ALL');

  // Filter logs specifically belonging to this student
  const studentLogs = useMemo(() => {
    return hifzLogs
      .filter(l => l.studentId === student.id || l.studentCode === student.code)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [hifzLogs, student.id, student.code]);

  // Construct timeline data points
  const chartData = useMemo(() => {
    // 1. If we have specific logs, build progression from logs
    if (studentLogs.length > 0) {
      // Ensure we have a starting baseline point (e.g. at enrollment or first log)
      const points: Array<{
        date: string;
        displayDate: string;
        juzLevel: number;
        sabaqRange: string;
        grade: string;
        notes: string;
        targetJuz: number;
        isLog: boolean;
      }> = [];

      let runningJuz = Math.max(1, studentLogs[0].sabqiJuz - 1);
      
      // Starting point
      const firstLogDate = new Date(studentLogs[0].date);
      const prevMonth = new Date(firstLogDate);
      prevMonth.setMonth(prevMonth.getMonth() - 1);
      
      points.push({
        date: prevMonth.toISOString().slice(0, 10),
        displayDate: prevMonth.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        juzLevel: runningJuz,
        sabaqRange: 'Baseline Evaluation',
        grade: 'MUMTAZ',
        notes: 'Initial admission entry baseline',
        targetJuz: runningJuz,
        isLog: false
      });

      // Add each log
      studentLogs.forEach((log, idx) => {
        const logJuz = Math.max(runningJuz, log.sabqiJuz || runningJuz);
        runningJuz = Math.min(30, logJuz);
        
        const dateObj = new Date(log.date);
        const displayDate = !isNaN(dateObj.getTime())
          ? dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
          : log.date;

        points.push({
          date: log.date,
          displayDate,
          juzLevel: runningJuz,
          sabaqRange: log.sabaqRange,
          grade: log.grade,
          notes: log.notes || 'Routine revision successfully cleared',
          targetJuz: Math.min(30, runningJuz + 0.5),
          isLog: true
        });
      });

      // If current student.juzLevel is higher than last log, add latest checkpoint
      if (student.juzLevel > runningJuz) {
        points.push({
          date: new Date().toISOString().slice(0, 10),
          displayDate: 'Current',
          juzLevel: student.juzLevel,
          sabaqRange: student.currentSurah,
          grade: 'MUMTAZ',
          notes: 'Current authenticated ledger status',
          targetJuz: 30,
          isLog: false
        });
      }

      if (viewMode === '6M' && points.length > 6) {
        return points.slice(-6);
      }
      return points;
    }

    // 2. Fallback baseline if no explicit logs recorded yet for this student
    const enrollDate = student.enrollmentDate ? new Date(student.enrollmentDate) : new Date('2024-01-15');
    const points = [];
    const totalPoints = 5;
    const initialJuz = Math.max(1, student.juzLevel - 4);

    for (let i = 0; i < totalPoints; i++) {
      const d = new Date(enrollDate);
      d.setMonth(d.getMonth() + (i * 2));
      const stepJuz = Math.min(student.juzLevel, initialJuz + Math.round((i / (totalPoints - 1)) * (student.juzLevel - initialJuz)));
      
      points.push({
        date: d.toISOString().slice(0, 10),
        displayDate: d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        juzLevel: stepJuz,
        sabaqRange: i === totalPoints - 1 ? student.currentSurah : `Juz ${stepJuz} Progression`,
        grade: 'MUMTAZ',
        notes: 'Curricular progression record',
        targetJuz: Math.min(30, stepJuz + 1),
        isLog: false
      });
    }

    return points;
  }, [studentLogs, student.juzLevel, student.currentSurah, student.enrollmentDate, viewMode]);

  // Key metrics
  const startingJuz = chartData[0]?.juzLevel || 1;
  const currentJuz = student.juzLevel;
  const totalGrowth = Math.max(0, currentJuz - startingJuz);
  const remainingJuz = Math.max(0, 30 - currentJuz);
  const logsCount = studentLogs.length;

  const content = (
    <div>
      {/* Top Header / Badges */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase text-[#0F5132] bg-emerald-100 px-2.5 py-0.5 rounded-full">
              <TrendingUp className="w-3 h-3" />
              <span>Hifz Progression Curve</span>
            </span>
            <span className="text-[11px] text-gray-500 font-semibold">
              {logsCount > 0 ? `${logsCount} Audited Recitation Logs` : 'Curricular Estimate'}
            </span>
          </div>
          <h4 className="text-sm sm:text-base font-black text-gray-900 mt-1">
            Juz Level Trajectory: {student.name}
          </h4>
        </div>

        {/* View mode toggle */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl text-[11px] font-bold">
          <button
            type="button"
            onClick={() => setViewMode('ALL')}
            className={`px-2.5 py-1 rounded-lg transition ${
              viewMode === 'ALL'
                ? 'bg-[#0F5132] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            All Logs
          </button>
          <button
            type="button"
            onClick={() => setViewMode('6M')}
            className={`px-2.5 py-1 rounded-lg transition ${
              viewMode === '6M'
                ? 'bg-[#0F5132] text-white shadow-xs'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            Recent 6
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mb-4 text-xs">
        <div className="bg-emerald-50/70 border border-emerald-200/80 p-2.5 rounded-xl">
          <span className="text-[10px] text-emerald-800 font-bold uppercase block">Current Standing</span>
          <div className="text-base font-black text-[#0F5132] mt-0.5">
            Juz {currentJuz} <span className="text-[10px] font-normal text-gray-500">/ 30</span>
          </div>
          <span className="text-[10px] text-emerald-700 truncate block mt-0.5">
            {((currentJuz / 30) * 100).toFixed(0)}% of Holy Qur'an
          </span>
        </div>

        <div className="bg-amber-50/70 border border-amber-200/80 p-2.5 rounded-xl">
          <span className="text-[10px] text-amber-900 font-bold uppercase block">Total Net Gain</span>
          <div className="text-base font-black text-amber-900 mt-0.5 flex items-center gap-1">
            <span>+{totalGrowth} Juz</span>
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
          </div>
          <span className="text-[10px] text-amber-800 truncate block mt-0.5">
            From baseline Juz {startingJuz}
          </span>
        </div>

        <div className="bg-blue-50/70 border border-blue-200/80 p-2.5 rounded-xl">
          <span className="text-[10px] text-blue-900 font-bold uppercase block">Remaining For Khatm</span>
          <div className="text-base font-black text-blue-900 mt-0.5">
            {remainingJuz === 0 ? 'Full Khatm' : `${remainingJuz} Juz`}
          </div>
          <span className="text-[10px] text-blue-700 truncate block mt-0.5">
            {remainingJuz === 0 ? 'Sanad Ready' : `${30 - remainingJuz} Juz sealed`}
          </span>
        </div>

        <div className="bg-gray-50 border border-gray-200 p-2.5 rounded-xl">
          <span className="text-[10px] text-gray-600 font-bold uppercase block">Current Sabaq</span>
          <div className="text-xs font-black text-gray-900 mt-1 truncate" title={student.currentSurah}>
            {student.currentSurah}
          </div>
          <span className="text-[10px] text-emerald-700 font-bold block mt-0.5">
            Daily Attendance: {student.dailyAttendance}%
          </span>
        </div>
      </div>

      {/* RECHARTS LINE GRAPH */}
      <div className="w-full" style={{ height: `${height}px` }}>
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={{ top: 15, right: 20, left: -15, bottom: 5 }}>
            <defs>
              <linearGradient id={`colorJuz-${student.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F5132" stopOpacity={0.25} />
                <stop offset="95%" stopColor="#0F5132" stopOpacity={0.0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis
              dataKey="displayDate"
              stroke="#64748b"
              tick={{ fontSize: 11, fill: '#475569', fontWeight: 600 }}
            />
            <YAxis
              domain={[0, 30]}
              ticks={[0, 5, 10, 15, 20, 25, 30]}
              stroke="#64748b"
              tick={{ fontSize: 11, fill: '#475569' }}
              unit=" J"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-[#0A3622] text-white p-3 rounded-xl border border-[#D4AF37] shadow-xl text-xs max-w-xs">
                      <div className="flex items-center justify-between gap-2 border-b border-emerald-800 pb-1.5 mb-1.5">
                        <span className="font-bold text-[#D4AF37]">{data.displayDate} ({data.date})</span>
                        <span className="text-[10px] bg-emerald-700 text-white px-2 py-0.5 rounded font-black">
                          {data.grade || 'MUMTAZ'}
                        </span>
                      </div>
                      <div className="text-emerald-100 font-medium">
                        Memorized: <strong className="text-white text-sm">Juz {data.juzLevel}</strong> / 30
                      </div>
                      <div className="text-[11px] text-amber-200 mt-1">
                        Sabaq: <span className="text-white">{data.sabaqRange}</span>
                      </div>
                      {data.notes && (
                        <div className="text-[10px] text-gray-300 italic mt-1.5 pt-1 border-t border-emerald-800/60">
                          "{data.notes}"
                        </div>
                      )}
                    </div>
                  );
                }
                return null;
              }}
            />
            
            {/* Khatm full completion 30 Juz reference line */}
            <ReferenceLine
              y={30}
              stroke="#D4AF37"
              strokeDasharray="4 4"
              strokeWidth={1.5}
              label={{
                value: 'Khatm 30 Juz',
                fill: '#b45309',
                fontSize: 10,
                fontWeight: 'bold',
                position: 'top'
              }}
            />

            {/* Shaded Area underneath */}
            <Area
              type="monotone"
              dataKey="juzLevel"
              fill={`url(#colorJuz-${student.id})`}
              stroke="none"
            />

            {/* Main Progression Line */}
            <Line
              type="monotone"
              dataKey="juzLevel"
              name="Juz Level Reached"
              stroke="#0F5132"
              strokeWidth={3}
              dot={{ r: 4.5, fill: '#0F5132', stroke: '#ffffff', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#D4AF37', stroke: '#0F5132', strokeWidth: 2 }}
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 text-right">
        <span className="text-[10px] text-gray-400">
          Supervised by Markazul Furqan Faculty • Chiro Academic Session
        </span>
      </div>
    </div>
  );

  if (!showCardWrapper) {
    return content;
  }

  return (
    <div className="bg-white p-4 sm:p-5 rounded-2xl border border-gray-200 shadow-xs">
      {content}
    </div>
  );
};
