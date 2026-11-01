import React, { useState } from 'react';
import { X, FileSignature, CheckCircle2, AlertCircle } from 'lucide-react';
import { AdmissionApplication, AcademicTrack } from '../types';
import { OFFICIAL_LOGO_URL } from '../data/initialData';

interface AdmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: Omit<AdmissionApplication, 'id' | 'submissionDate' | 'status'>) => Promise<void>;
}

export const AdmissionModal: React.FC<AdmissionModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    guardianName: '',
    track: 'HIFZ' as AcademicTrack,
    priorJuz: 0,
    paymentChannel: 'TELEBIRR' as 'TELEBIRR' | 'CBE' | 'AWASH' | 'CASH',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit(formData);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        onClose();
        setFormData({
          fullName: '',
          phone: '',
          guardianName: '',
          track: 'HIFZ',
          priorJuz: 0,
          paymentChannel: 'TELEBIRR',
          notes: ''
        });
      }, 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100">
        
        {/* Header with Official Logo */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#D4AF37] p-0.5 bg-white shadow-xs shrink-0">
              <img 
                src={OFFICIAL_LOGO_URL} 
                alt="Markazul Furqan Emblem" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Student Admission Enrollment
              </h3>
              <p className="text-[11px] text-gray-500">Academic Year 2018 / 2019 E.C. • Chiro Center</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          <div className="py-8 text-center bg-emerald-50 rounded-2xl border border-emerald-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <h4 className="text-lg font-black text-gray-900">Application Submitted Successfully!</h4>
            <p className="text-xs text-gray-600 mt-2 max-w-sm mx-auto">
              Your application has been registered into the admissions ledger and synced with the administration system.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Full Student Name *</label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                placeholder="e.g. Ibrahim Ahmed Mohammed"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Guardian / Parent Name *</label>
                <input
                  type="text"
                  required
                  value={formData.guardianName}
                  onChange={(e) => setFormData({ ...formData, guardianName: e.target.value })}
                  placeholder="e.g. Ahmed Mohammed"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Guardian Phone *</label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="0911..."
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Academic Track</label>
                <select
                  value={formData.track}
                  onChange={(e) => setFormData({ ...formData, track: e.target.value as AcademicTrack })}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132] font-semibold"
                >
                  <option value="HIFZ">Full-Time Hifz Track</option>
                  <option value="TAJWEED">Tajweed & Tarteel Mastery</option>
                  <option value="ARABIC">Classical Arabic & Morphology</option>
                  <option value="WEEKEND">Weekend & Evening Hifz</option>
                </select>
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Prior Juz Memorized</label>
                <input
                  type="number"
                  min={0}
                  max={30}
                  value={formData.priorJuz}
                  onChange={(e) => setFormData({ ...formData, priorJuz: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Tuition & Fee Payment Preference</label>
              <select
                value={formData.paymentChannel}
                onChange={(e) => setFormData({ ...formData, paymentChannel: e.target.value as any })}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132] font-semibold"
              >
                <option value="TELEBIRR">Telebirr (Merchant 0912 34 56 78)</option>
                <option value="CBE">Commercial Bank of Ethiopia (CBE)</option>
                <option value="AWASH">Awash Bank</option>
                <option value="CASH">In-Person Cash at Chiro Office</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Special Notes / Medical / Prior Madrasa</label>
              <textarea
                rows={2}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                placeholder="Any prior experience or notes for Ustaz Kadir Hamza..."
                className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#0F5132] hover:bg-[#0A3622] text-white font-extrabold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Submitting & Dispatching...' : 'Submit Admission Application'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
