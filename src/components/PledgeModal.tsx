import React, { useState } from 'react';
import { X, Heart, CheckCircle2, Building2 } from 'lucide-react';
import { DonationPledge } from '../types';
import { OFFICIAL_LOGO_URL } from '../data/initialData';

interface PledgeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (pledge: Omit<DonationPledge, 'id' | 'date' | 'isConfirmed'>) => Promise<void>;
}

export const PledgeModal: React.FC<PledgeModalProps> = ({
  isOpen,
  onClose,
  onSubmit
}) => {
  const [formData, setFormData] = useState({
    donorName: '',
    phoneOrEmail: '',
    amountETB: 12000,
    tier: 'Student Sponsorship (1 Hafiz)',
    channel: 'Telebirr',
    referenceNumber: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleTierChange = (tier: string) => {
    let amount = formData.amountETB;
    if (tier === 'Student Sponsorship (1 Hafiz)') amount = 12000;
    else if (tier === 'Classroom Expansion Block') amount = 150000;
    else if (tier === 'Mus\'haf & Library Endowment') amount = 5000;
    setFormData({ ...formData, tier, amountETB: amount });
  };

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
          donorName: '',
          phoneOrEmail: '',
          amountETB: 12000,
          tier: 'Student Sponsorship (1 Hafiz)',
          channel: 'Telebirr',
          referenceNumber: ''
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
                Record Donation / Pledge
              </h3>
              <p className="text-[11px] text-gray-500">Vision 2030 Campus Expansion • Chiro</p>
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
            <h4 className="text-lg font-black text-gray-900">Jazaakallahu Khayran!</h4>
            <p className="text-xs text-gray-600 mt-2 max-w-sm mx-auto">
              Your contribution record has been saved and factored into the Vision 2030 progress tracker.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-gray-700 mb-1">Donor Name (or Anonymous) *</label>
              <input
                type="text"
                required
                value={formData.donorName}
                onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                placeholder="e.g. Brother Ahmed / Anonymous Supporter"
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Phone or Email *</label>
                <input
                  type="text"
                  required
                  value={formData.phoneOrEmail}
                  onChange={(e) => setFormData({ ...formData, phoneOrEmail: e.target.value })}
                  placeholder="0911... or name@email.com"
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Pledge Tier</label>
                <select
                  value={formData.tier}
                  onChange={(e) => handleTierChange(e.target.value)}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132] font-semibold"
                >
                  <option value="Student Sponsorship (1 Hafiz)">Student Sponsorship (ETB 12,000)</option>
                  <option value="Classroom Expansion Block">Classroom Block (ETB 150,000)</option>
                  <option value="Mus'haf & Library Endowment">Mus'haf & Library (ETB 5,000)</option>
                  <option value="General Sadaqah Jariyah">General Sadaqah Jariyah</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Amount in Ethiopian Birr (ETB) *</label>
                <input
                  type="number"
                  min={100}
                  required
                  value={formData.amountETB}
                  onChange={(e) => setFormData({ ...formData, amountETB: parseInt(e.target.value) || 0 })}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132] font-black text-sm"
                />
              </div>
              <div>
                <label className="block font-bold text-gray-700 mb-1">Bank / Transfer Channel</label>
                <select
                  value={formData.channel}
                  onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132] font-semibold"
                >
                  <option value="Telebirr">Telebirr (0912 34 56 78)</option>
                  <option value="Commercial Bank of Ethiopia (CBE)">CBE (1000123456789)</option>
                  <option value="Awash Bank">Awash Bank (01320495830200)</option>
                  <option value="Direct Cash at Chiro">Direct Cash at Chiro Office</option>
                  <option value="International Remittance">International Diaspora Remittance</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-700 mb-1">Bank Transaction Reference / Receipt #</label>
              <input
                type="text"
                value={formData.referenceNumber}
                onChange={(e) => setFormData({ ...formData, referenceNumber: e.target.value })}
                placeholder="e.g. FT261031920... or Telebirr Trans ID"
                className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 font-black py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {loading ? 'Recording...' : 'Register Contribution & Update Target'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
