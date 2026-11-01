import React, { useState } from 'react';
import { 
  X, 
  Edit3, 
  CheckCircle2, 
  RefreshCw, 
  Sparkles, 
  Building2, 
  User, 
  PhoneCall, 
  Layers,
  Save
} from 'lucide-react';
import { SiteContentConfig } from '../types';

interface OwnerEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  siteContent: SiteContentConfig;
  onSave: (content: SiteContentConfig) => Promise<void>;
  onReset: () => void;
  initialTab?: 'HERO' | 'CAMPAIGN' | 'DIRECTOR' | 'CONTACT';
}

export const OwnerEditModal: React.FC<OwnerEditModalProps> = ({
  isOpen,
  onClose,
  siteContent,
  onSave,
  onReset,
  initialTab = 'HERO'
}) => {
  const [activeTab, setActiveTab] = useState<'HERO' | 'CAMPAIGN' | 'DIRECTOR' | 'CONTACT'>(initialTab);
  const [formData, setFormData] = useState<SiteContentConfig>({ ...siteContent });
  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Sync when siteContent or initialTab changes
  React.useEffect(() => {
    setFormData({ ...siteContent });
    if (initialTab) setActiveTab(initialTab);
  }, [siteContent, initialTab, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await onSave(formData);
      setSavedSuccess(true);
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative border-2 border-[#D4AF37] max-h-[92vh] overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 mb-5 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#0F5132] text-[#D4AF37] flex items-center justify-center shadow-sm">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#0F5132] bg-emerald-100 px-2 py-0.5 rounded-full">
                  Owner Live Controls
                </span>
                <span className="text-xs font-bold text-gray-500">• Directorate Portal</span>
              </div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Live Website Content Editor
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Section Tabs */}
        <div className="flex items-center gap-1.5 border-b border-gray-200 mb-6 overflow-x-auto pb-1 text-xs font-bold">
          <button
            type="button"
            onClick={() => setActiveTab('HERO')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'HERO' ? 'bg-[#0F5132] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Hero & Ayah</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CAMPAIGN')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'CAMPAIGN' ? 'bg-[#0F5132] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Building2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Vision 2030 & Banks</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('DIRECTOR')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'DIRECTOR' ? 'bg-[#0F5132] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <User className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Director & Quote</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('CONTACT')}
            className={`px-3 py-2 rounded-xl transition flex items-center gap-1.5 shrink-0 ${
              activeTab === 'CONTACT' ? 'bg-[#0F5132] text-white shadow-xs' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <PhoneCall className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Contact & Socials</span>
          </button>
        </div>

        {savedSuccess ? (
          <div className="py-12 text-center bg-emerald-50 rounded-2xl border border-emerald-300">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3 animate-bounce" />
            <h4 className="text-lg font-black text-gray-900">Website Content Updated Successfully!</h4>
            <p className="text-xs text-gray-600 mt-1">Changes are now live across all sections and saved to Firestore.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            
            {/* 1. HERO SECTION EDIT */}
            {activeTab === 'HERO' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Top Announcement Badge</label>
                  <input
                    type="text"
                    value={formData.heroBadge}
                    onChange={(e) => setFormData({ ...formData, heroBadge: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Main Hero Headline</label>
                  <input
                    type="text"
                    value={formData.heroTitle}
                    onChange={(e) => setFormData({ ...formData, heroTitle: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 font-bold focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quranic Arabic Ayah</label>
                  <input
                    type="text"
                    dir="rtl"
                    value={formData.quranAyahArabic}
                    onChange={(e) => setFormData({ ...formData, quranAyahArabic: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 font-quran text-lg focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Quranic Ayah Translation / Citation</label>
                  <input
                    type="text"
                    value={formData.quranAyahTranslation}
                    onChange={(e) => setFormData({ ...formData, quranAyahTranslation: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 italic focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Hero Mission & Overview Text</label>
                  <textarea
                    rows={3}
                    value={formData.heroSub}
                    onChange={(e) => setFormData({ ...formData, heroSub: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>
              </div>
            )}

            {/* 2. CAMPAIGN & BANKING EDIT */}
            {activeTab === 'CAMPAIGN' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Target Amount (ETB)</label>
                    <input
                      type="number"
                      value={formData.targetAmountETB}
                      onChange={(e) => setFormData({ ...formData, targetAmountETB: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-xl p-2.5 font-black text-[#0F5132]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Base Collected (ETB)</label>
                    <input
                      type="number"
                      value={formData.baseCollectedETB}
                      onChange={(e) => setFormData({ ...formData, baseCollectedETB: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-xl p-2.5 font-bold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Student Sponsorship (ETB/Yr)</label>
                    <input
                      type="number"
                      value={formData.studentSponsorshipETB}
                      onChange={(e) => setFormData({ ...formData, studentSponsorshipETB: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-xl p-2.5"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Classroom Endowment (ETB)</label>
                    <input
                      type="number"
                      value={formData.classroomEndowmentETB}
                      onChange={(e) => setFormData({ ...formData, classroomEndowmentETB: parseInt(e.target.value) || 0 })}
                      className="w-full border border-gray-300 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200 space-y-3">
                  <span className="font-extrabold text-amber-900 block text-[11px] uppercase tracking-wider">
                    Ethiopian Banking & Payment Channels
                  </span>
                  
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Telebirr Merchant / Phone</label>
                    <input
                      type="text"
                      value={formData.telebirrNumber}
                      onChange={(e) => setFormData({ ...formData, telebirrNumber: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-2 font-mono font-bold"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">CBE Account Number</label>
                      <input
                        type="text"
                        value={formData.cbeAccount}
                        onChange={(e) => setFormData({ ...formData, cbeAccount: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl p-2 font-mono"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-gray-700 mb-1">Awash Bank Account</label>
                      <input
                        type="text"
                        value={formData.awashAccount}
                        onChange={(e) => setFormData({ ...formData, awashAccount: e.target.value })}
                        className="w-full border border-gray-300 rounded-xl p-2 font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 3. DIRECTORATE EDIT */}
            {activeTab === 'DIRECTOR' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Director Full Name</label>
                    <input
                      type="text"
                      value={formData.directorName}
                      onChange={(e) => setFormData({ ...formData, directorName: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-2.5 font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Director Official Title</label>
                    <input
                      type="text"
                      value={formData.directorTitle}
                      onChange={(e) => setFormData({ ...formData, directorTitle: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Featured Leadership Quote</label>
                  <textarea
                    rows={4}
                    value={formData.directorQuote}
                    onChange={(e) => setFormData({ ...formData, directorQuote: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5 italic"
                  />
                </div>
              </div>
            )}

            {/* 4. CONTACT & LOCATION EDIT */}
            {activeTab === 'CONTACT' && (
              <div className="space-y-3.5 animate-fadeIn">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Official Phone Number</label>
                    <input
                      type="text"
                      value={formData.contactPhone}
                      onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-2.5 font-bold font-mono text-[#0F5132]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Official Email Address</label>
                    <input
                      type="email"
                      value={formData.contactEmail}
                      onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-2.5 font-bold"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Chiro Campus Physical Address</label>
                  <input
                    type="text"
                    value={formData.campusLocation}
                    onChange={(e) => setFormData({ ...formData, campusLocation: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Visiting & Secretariat Hours</label>
                  <input
                    type="text"
                    value={formData.visitingHours}
                    onChange={(e) => setFormData({ ...formData, visitingHours: e.target.value })}
                    className="w-full border border-gray-300 rounded-xl p-2.5"
                  />
                </div>
              </div>
            )}

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-gray-200 flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={onReset}
                className="text-xs text-gray-500 hover:text-red-700 font-semibold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset to Default Content</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-[#0F5132] hover:bg-[#0A3622] text-white font-black transition shadow flex items-center gap-2 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 text-[#D4AF37]" />
                  <span>{saving ? 'Publishing Changes...' : 'Save & Publish Live'}</span>
                </button>
              </div>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};
