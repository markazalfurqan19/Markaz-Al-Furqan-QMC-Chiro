import React, { useState } from 'react';
import { X, UserPlus, CheckCircle2 } from 'lucide-react';
import { Student, AcademicTrack, StudentStatus } from '../../types';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (student: Omit<Student, 'id' | 'dailyAttendance'>) => Promise<void>;
  nextStudentCount: number;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  nextStudentCount
}) => {
  const generatedCode = `MF-2018-${String(nextStudentCount + 1).padStart(2, '0')}`;

  const [formData, setFormData] = useState({
    code: generatedCode,
    name: '',
    age: 12,
    guardianName: '',
    guardianPhone: '',
    juzLevel: 1,
    currentSurah: 'Surah Al-Baqarah',
    status: 'ACTIVE' as StudentStatus,
    enrollmentDate: new Date().toISOString().slice(0, 10),
    track: 'HIFZ' as AcademicTrack,
    notes: ''
  });
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onAdd(formData);
      onClose();
      setFormData({
        code: `MF-2018-${String(nextStudentCount + 2).padStart(2, '0')}`,
        name: '',
        age: 12,
        guardianName: '',
        guardianPhone: '',
        juzLevel: 1,
        currentSurah: 'Surah Al-Baqarah',
        status: 'ACTIVE',
        enrollmentDate: new Date().toISOString().slice(0, 10),
        track: 'HIFZ',
        notes: ''
      });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0F5132] flex items-center justify-center">
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Register New Student to Roster
              </h3>
              <p className="text-[11px] text-gray-500">Official Institutional Registration • Chiro</p>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Student Code</label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full border border-gray-300 rounded-xl p-2.5 font-mono font-bold text-[#0F5132] bg-gray-50"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Age (Years)</label>
              <input
                type="number"
                min={5}
                max={60}
                required
                value={formData.age}
                onChange={(e) => setFormData({ ...formData, age: parseInt(e.target.value) || 12 })}
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Full Student Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Bilal Hamza Siyum"
              className="w-full border border-gray-300 rounded-xl p-2.5 focus:border-[#0F5132]"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Guardian Name *</label>
              <input
                type="text"
                required
                value={formData.guardianName}
                onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                placeholder="e.g. Hamza Siyum"
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Guardian Phone *</label>
              <input
                type="tel"
                required
                value={formData.guardianPhone}
                onChange={(e) => setFormData({ ...formData, guardianPhone: e.target.value })}
                placeholder="0911..."
                className="w-full border border-gray-300 rounded-xl p-2.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Current Juz (0-30)</label>
              <input
                type="number"
                min={0}
                max={30}
                required
                value={formData.juzLevel}
                onChange={(e) => setFormData({ ...formData, juzLevel: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-300 rounded-xl p-2.5 font-bold"
              />
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Academic Track</label>
              <select
                value={formData.track}
                onChange={(e) => setFormData({ ...formData, track: e.target.value as AcademicTrack })}
                className="w-full border border-gray-300 rounded-xl p-2.5 font-bold"
              >
                <option value="HIFZ">Full Hifz</option>
                <option value="TAJWEED">Tajweed</option>
                <option value="ARABIC">Arabic</option>
                <option value="WEEKEND">Weekend</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-gray-700 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as StudentStatus })}
                className="w-full border border-gray-300 rounded-xl p-2.5 font-bold"
              >
                <option value="ACTIVE">Active</option>
                <option value="REVISION">Revision</option>
                <option value="KHATM_TRACK">Khatm</option>
                <option value="GRADUATED">Graduated</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Current Surah in Focus</label>
            <input
              type="text"
              value={formData.currentSurah}
              onChange={(e) => setFormData({ ...formData, currentSurah: e.target.value })}
              placeholder="e.g. Surah Al-Kahf"
              className="w-full border border-gray-300 rounded-xl p-2.5"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Supervisor Notes</label>
            <textarea
              rows={2}
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              placeholder="Notes on recitation speed, makharij, or attendance..."
              className="w-full border border-gray-300 rounded-xl p-2"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#0F5132] hover:bg-[#0A3622] text-white font-extrabold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" />
              <span>{loading ? 'Adding...' : 'Enroll Student into Roster'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
