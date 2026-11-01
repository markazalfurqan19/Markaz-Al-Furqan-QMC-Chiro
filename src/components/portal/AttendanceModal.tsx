import React, { useState } from 'react';
import { 
  X, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Calendar, 
  Users, 
  Save, 
  CheckCheck,
  ShieldCheck,
  Percent
} from 'lucide-react';
import { Student } from '../../types';
import { OFFICIAL_LOGO_URL } from '../../data/initialData';

export type AttendanceStatus = 'PRESENT' | 'LATE' | 'EXCUSED' | 'ABSENT';

interface AttendanceModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  onSaveAttendance: (updatedStudents: Student[]) => Promise<void> | void;
}

export const AttendanceModal: React.FC<AttendanceModalProps> = ({
  isOpen,
  onClose,
  students,
  onSaveAttendance
}) => {
  const [selectedDate, setSelectedDate] = useState(() => {
    return new Date().toISOString().slice(0, 10);
  });

  // Track each student's attendance status for today
  const [attendanceMap, setAttendanceMap] = useState<Record<string, AttendanceStatus>>(() => {
    const map: Record<string, AttendanceStatus> = {};
    students.forEach(st => {
      // Default present for quick workflow
      map[st.id] = 'PRESENT';
    });
    return map;
  });

  const [notesMap, setNotesMap] = useState<Record<string, string>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [filterTrack, setFilterTrack] = useState<string>('ALL');

  if (!isOpen) return null;

  const handleStatusChange = (studentId: string, status: AttendanceStatus) => {
    setAttendanceMap(prev => ({
      ...prev,
      [studentId]: status
    }));
  };

  const handleMarkAll = (status: AttendanceStatus) => {
    const updated: Record<string, AttendanceStatus> = {};
    students.forEach(st => {
      updated[st.id] = status;
    });
    setAttendanceMap(updated);
  };

  // Filter students
  const displayedStudents = students.filter(st => {
    if (filterTrack === 'ALL') return true;
    return st.track === filterTrack;
  });

  // Summary counts
  const presentCount = Object.values(attendanceMap).filter(s => s === 'PRESENT').length;
  const lateCount = Object.values(attendanceMap).filter(s => s === 'LATE').length;
  const excusedCount = Object.values(attendanceMap).filter(s => s === 'EXCUSED').length;
  const absentCount = Object.values(attendanceMap).filter(s => s === 'ABSENT').length;

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Recalculate dailyAttendance percentage for each student
      const updatedStudents = students.map(st => {
        const todayStatus = attendanceMap[st.id] || 'PRESENT';
        
        // Weight score for today: Present = 100%, Excused = 95%, Late = 85%, Absent = 0%
        let todayScore = 100;
        if (todayStatus === 'EXCUSED') todayScore = 95;
        else if (todayStatus === 'LATE') todayScore = 85;
        else if (todayStatus === 'ABSENT') todayScore = 0;

        // Weighted moving average: 90% previous cumulative + 10% today's session
        const currentRate = typeof st.dailyAttendance === 'number' ? st.dailyAttendance : 95;
        const newDailyAttendance = Math.min(100, Math.max(0, Math.round((currentRate * 0.9) + (todayScore * 0.1))));

        return {
          ...st,
          dailyAttendance: newDailyAttendance
        };
      });

      await onSaveAttendance(updatedStudents);
      onClose();
    } catch (err) {
      console.error('Error saving attendance:', err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-3 sm:p-5">
      <div className="bg-white rounded-3xl max-w-4xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto border border-gray-100 animate-fadeIn">
        
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow bg-white p-0.5 shrink-0">
              <img 
                src={OFFICIAL_LOGO_URL} 
                alt="Emblem" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0F5132] mb-0.5">
                <ShieldCheck className="w-4 h-4" />
                <span>Markazul Furqan • Daily Halaqah Roll Call</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-gray-900 tracking-tight">
                Record Daily Attendance
              </h2>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Date Selector & Quick Bulk Actions */}
        <div className="my-4 p-4 bg-gray-50 rounded-2xl border border-gray-200 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0F5132]" />
              <span className="text-xs font-bold text-gray-700">Attendance Date:</span>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="text-xs bg-white border border-gray-300 rounded-xl px-3 py-1.5 font-bold focus:outline-none focus:border-[#0F5132]"
              />
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-gray-700">Track:</span>
              <select
                value={filterTrack}
                onChange={(e) => setFilterTrack(e.target.value)}
                className="text-xs bg-white border border-gray-300 rounded-xl px-3 py-1.5 font-bold focus:outline-none"
              >
                <option value="ALL">All Tracks ({students.length})</option>
                <option value="HIFZ">Hifz Full-Time</option>
                <option value="TAJWEED">Tajweed</option>
                <option value="WEEKEND">Weekend</option>
              </select>
            </div>
          </div>

          {/* Quick Mark Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto">
            <button
              type="button"
              onClick={() => handleMarkAll('PRESENT')}
              className="text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-900 px-3 py-1.5 rounded-xl transition flex items-center gap-1"
            >
              <CheckCheck className="w-3.5 h-3.5" />
              <span>Mark All Present</span>
            </button>
            <button
              type="button"
              onClick={() => handleMarkAll('ABSENT')}
              className="text-xs font-bold bg-red-50 hover:bg-red-100 text-red-800 px-3 py-1.5 rounded-xl transition"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5 text-xs">
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-emerald-700 font-bold uppercase block">Present</span>
              <span className="text-xl font-black text-emerald-900">{presentCount}</span>
            </div>
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          </div>

          <div className="p-3 bg-amber-50 border border-amber-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-amber-700 font-bold uppercase block">Late</span>
              <span className="text-xl font-black text-amber-900">{lateCount}</span>
            </div>
            <Clock className="w-5 h-5 text-amber-600" />
          </div>

          <div className="p-3 bg-blue-50 border border-blue-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-blue-700 font-bold uppercase block">Excused</span>
              <span className="text-xl font-black text-blue-900">{excusedCount}</span>
            </div>
            <AlertCircle className="w-5 h-5 text-blue-600" />
          </div>

          <div className="p-3 bg-red-50 border border-red-200 rounded-2xl flex items-center justify-between">
            <div>
              <span className="text-[10px] text-red-700 font-bold uppercase block">Absent</span>
              <span className="text-xl font-black text-red-900">{absentCount}</span>
            </div>
            <X className="w-5 h-5 text-red-600" />
          </div>
        </div>

        {/* Student Roster Table for Attendance */}
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-6">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-700 font-bold uppercase text-[10px] border-b border-gray-200">
              <tr>
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Current Rate</th>
                <th className="py-3 px-4 text-center">Today's Attendance Status</th>
                <th className="py-3 px-4">Mu'allim Note / Excuse</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {displayedStudents.map((st) => {
                const currentStatus = attendanceMap[st.id] || 'PRESENT';
                return (
                  <tr key={st.id} className="hover:bg-gray-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="font-extrabold text-gray-900">{st.name}</div>
                      <div className="text-[10px] font-mono text-gray-500">
                        {st.code} • Juz {st.juzLevel} • {st.track}
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-emerald-800">{st.dailyAttendance}%</span>
                        <div className="w-14 bg-gray-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className="bg-emerald-600 h-1.5 rounded-full" 
                            style={{ width: `${st.dailyAttendance}%` }} 
                          />
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center justify-center gap-1">
                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'PRESENT')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            currentStatus === 'PRESENT'
                              ? 'bg-[#0F5132] text-white shadow-xs font-black'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Present
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'LATE')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            currentStatus === 'LATE'
                              ? 'bg-amber-500 text-white shadow-xs font-black'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Late
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'EXCUSED')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            currentStatus === 'EXCUSED'
                              ? 'bg-blue-600 text-white shadow-xs font-black'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Excused
                        </button>

                        <button
                          type="button"
                          onClick={() => handleStatusChange(st.id, 'ABSENT')}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition ${
                            currentStatus === 'ABSENT'
                              ? 'bg-red-600 text-white shadow-xs font-black'
                              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                          }`}
                        >
                          Absent
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <input
                        type="text"
                        placeholder="e.g. Doctor appointment, fever..."
                        value={notesMap[st.id] || ''}
                        onChange={(e) => setNotesMap({ ...notesMap, [st.id]: e.target.value })}
                        className="w-full text-xs bg-white border border-gray-300 rounded-lg px-2.5 py-1 focus:outline-none focus:border-[#0F5132]"
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Saving will update the <strong>dailyAttendance</strong> percentage for all {students.length} student records in the ledger and database.
          </p>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-xl transition text-xs"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="px-5 py-2.5 bg-[#0F5132] hover:bg-[#0A3622] text-white font-bold rounded-xl transition text-xs flex items-center gap-1.5 shadow-md disabled:opacity-50"
            >
              <Save className="w-4 h-4 text-[#D4AF37]" />
              <span>{isSaving ? 'Updating Attendance...' : 'Save & Update Attendance'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
