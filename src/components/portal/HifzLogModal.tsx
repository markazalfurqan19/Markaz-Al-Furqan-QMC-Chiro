import React, { useState } from 'react';
import { X, BookOpen, CheckCircle2 } from 'lucide-react';
import { Student, HifzLog, Grade } from '../../types';

interface HifzLogModalProps {
  isOpen: boolean;
  onClose: () => void;
  students: Student[];
  preselectedStudent?: Student | null;
  onSubmit: (log: Omit<HifzLog, 'id' | 'date'>) => Promise<void>;
  currentMuallimName: string;
}

export const HifzLogModal: React.FC<HifzLogModalProps> = ({
  isOpen,
  onClose,
  students,
  preselectedStudent,
  onSubmit,
  currentMuallimName
}) => {
  const [studentCode, setStudentCode] = useState(
    preselectedStudent ? preselectedStudent.code : (students[0]?.code || '')
  );
  const [sabaqRange, setSabaqRange] = useState('');
  const [sabqiJuz, setSabqiJuz] = useState<number>(1);
  const [manzilJuz, setManzilJuz] = useState<number>(30);
  const [grade, setGrade] = useState<Grade>('MUMTAZ');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync if preselectedStudent changes
  React.useEffect(() => {
    if (preselectedStudent) {
      setStudentCode(preselectedStudent.code);
      setSabqiJuz(Math.max(1, preselectedStudent.juzLevel));
    }
  }, [preselectedStudent]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const matched = students.find(s => s.code === studentCode);
    if (!matched) return;

    setLoading(true);
    try {
      await onSubmit({
        studentId: matched.id,
        studentCode: matched.code,
        studentName: matched.name,
        sabaqRange,
        sabqiJuz: Number(sabqiJuz),
        manzilJuz: Number(manzilJuz),
        grade,
        notes,
        muallimName: currentMuallimName || 'Mu\'allim Ziyad Abdullahi'
      });
      onClose();
      setSabaqRange('');
      setNotes('');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100">
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0F5132] flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Log Daily Sabaq & Hifz Progress
              </h3>
              <p className="text-[11px] text-gray-500">Academic Ledger • Halaqah Audit</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Select Student</label>
            <select
              value={studentCode}
              onChange={(e) => setStudentCode(e.target.value)}
              required
              className="w-full border border-gray-300 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#0F5132]"
            >
              {students.map((s) => (
                <option key={s.code} value={s.code}>
                  {s.name} ({s.code} • Juz {s.juzLevel})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">
              Sabaq (New Lesson): Surah & Ayah Scope *
            </label>
            <input
              type="text"
              required
              value={sabaqRange}
              onChange={(e) => setSabaqRange(e.target.value)}
              placeholder="e.g. Surah An-Nur Ayat 1-20"
              className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Sabqi (Recent Juz) *</label>
              <input
                type="number"
                min={1}
                max={30}
                required
                value={sabqiJuz}
                onChange={(e) => setSabqiJuz(parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Manzil (Cycle Juz) *</label>
              <input
                type="number"
                min={1}
                max={30}
                required
                value={manzilJuz}
                onChange={(e) => setManzilJuz(parseInt(e.target.value) || 1)}
                className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Daily Recitation Grade *</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value as Grade)}
              className="w-full border border-gray-300 rounded-xl p-2.5 font-bold text-gray-900 focus:outline-none focus:border-[#0F5132]"
            >
              <option value="MUMTAZ">Mumtaz ( ممتاز - Excellent / Flawless )</option>
              <option value="JAYYID_JIDDAN">Jayyid Jiddan ( جيد جداً - Very Good )</option>
              <option value="JAYYID">Jayyid ( جيد - Good )</option>
              <option value="MAQBUL">Maqbul ( مقبول - Pass / Needs Polish )</option>
            </select>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Mu'allim Tajweed Comments & Feedback</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. Practiced Qalqalah in Surah An-Nur; clean rhythm."
              className="w-full border border-gray-300 rounded-xl p-2 focus:outline-none focus:border-[#0F5132]"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F5132] hover:bg-[#0A3622] text-white font-extrabold py-3 rounded-xl transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{loading ? 'Recording & Syncing...' : 'Save Entry to Academic Ledger'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
