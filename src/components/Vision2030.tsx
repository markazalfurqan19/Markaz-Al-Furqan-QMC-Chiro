import React, { useState } from 'react';
import { 
  Building2, 
  Check, 
  Copy, 
  CreditCard, 
  Heart, 
  PhoneCall, 
  Sparkles,
  ArrowRight,
  Edit3
} from 'lucide-react';
import { DonationPledge, SiteContentConfig } from '../types';

interface Vision2030Props {
  onOpenPledgeModal: () => void;
  pledges: DonationPledge[];
  siteContent?: SiteContentConfig;
  isOwnerMode?: boolean;
  onEditCampaign?: () => void;
}

export const Vision2030: React.FC<Vision2030Props> = ({ 
  onOpenPledgeModal,
  pledges,
  siteContent,
  isOwnerMode,
  onEditCampaign
}) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const targetAmount = siteContent?.targetAmountETB || 4500000;
  const baseCollected = siteContent?.baseCollectedETB || 1890000;
  const studentSponsorshipPrice = siteContent?.studentSponsorshipETB || 12000;
  const classroomPrice = siteContent?.classroomEndowmentETB || 150000;
  const telebirrNum = siteContent?.telebirrNumber || '+251935097339';
  const cbeAcc = siteContent?.cbeAccount || '1000123456789';
  const awashAcc = siteContent?.awashAccount || '01320495830200';

  // Calculate dynamic total including initial base plus any confirmed pledges in session
  const additionalPledges = pledges.reduce((acc, p) => acc + (p.isConfirmed ? p.amountETB : 0), 0);
  const totalCollected = baseCollected + additionalPledges;
  const progressPercent = Math.min(100, Math.round((totalCollected / targetAmount) * 100));
  const remainingAmount = Math.max(0, targetAmount - totalCollected);

  return (
    <section id="campaign" className="py-20 px-4 sm:px-8 bg-white border-b border-gray-200 relative">
      {/* Owner Edit Floating Button */}
      {isOwnerMode && (
        <div className="max-w-6xl mx-auto flex justify-end mb-4">
          <button
            onClick={onEditCampaign}
            className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 transition transform hover:scale-105"
            title="Edit Campaign target amounts and banking details"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Campaign & Banking Details</span>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-[#0F5132] text-xs font-extrabold px-3.5 py-1.5 rounded-full mb-3 uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5" />
            Official Capital Expansion Project
          </div>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Vision 2030: Chiro Facility Infrastructure
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Constructing a dedicated regional center in Chiro, West Hararghe with state-of-the-art classrooms,
            huffaz dormitory quarters, audio recording lab for Tajweed analysis, and a classical Islamic library.
          </p>
        </div>

        {/* Highlight Campaign Card */}
        <div className="bg-gradient-to-br from-emerald-50 via-amber-50/40 to-emerald-100/30 border-2 border-[#D4AF37]/40 rounded-3xl p-6 sm:p-10 shadow-lg relative overflow-hidden">
          {/* Header Info */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <span className="text-xs font-bold text-[#0F5132] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-[#D4AF37]" />
                Building Fund Target
              </span>
              <h4 className="text-2xl sm:text-3xl font-black text-gray-900 mt-0.5">
                Chiro Academic Campus & Dormitory
              </h4>
            </div>
            <div className="text-left md:text-right bg-white/90 border border-emerald-200 px-5 py-3 rounded-2xl shadow-sm">
              <span className="text-[11px] text-gray-500 font-semibold uppercase tracking-wider block">
                Total Phase 1 Target
              </span>
              <div className="text-2xl sm:text-3xl font-black text-[#0F5132]">
                ETB {targetAmount.toLocaleString()}
              </div>
            </div>
          </div>

          {/* Progress Bar Container */}
          <div className="w-full bg-gray-200/90 rounded-full h-5 mb-3 overflow-hidden p-0.5 shadow-inner">
            <div 
              className="bg-gradient-to-r from-[#0F5132] via-emerald-600 to-[#D4AF37] h-4 rounded-full transition-all duration-1000 shadow"
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex flex-wrap justify-between items-center text-xs sm:text-sm font-bold text-gray-700 mb-8 gap-2">
            <span className="text-[#0F5132] flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
              Collected: ETB {totalCollected.toLocaleString()} ({progressPercent}%)
            </span>
            <span className="text-amber-800">
              Remaining Target: ETB {remainingAmount.toLocaleString()}
            </span>
          </div>

          {/* Sponsorship Tiers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-6 border-t border-gray-200/80">
            {/* Student Sponsorship */}
            <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                    Sponsor Aspirant
                  </span>
                  <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
                </div>
                <h5 className="font-extrabold text-gray-900 text-base">Hafiz Sponsorship</h5>
                <div className="text-xl font-black text-[#0F5132] my-2">
                  ETB {studentSponsorshipPrice.toLocaleString()} <span className="text-xs font-medium text-gray-500">/ Year</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Covers complete annual tuition, authentic Mus'haf copies, boarding, and daily teacher supervision for 1 student.
                </p>
              </div>
              <button
                onClick={onOpenPledgeModal}
                className="mt-4 w-full bg-[#0F5132] hover:bg-[#0A3622] text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Sponsor a Student</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Classroom Expansion */}
            <div className="p-5 bg-white rounded-2xl border-2 border-[#D4AF37]/60 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between relative">
              <div className="absolute -top-3 right-4 bg-[#D4AF37] text-gray-900 text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full shadow">
                Sadaqah Jariyah
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider bg-amber-50 px-2 py-0.5 rounded">
                    Naming Rights
                  </span>
                  <Building2 className="w-4 h-4 text-amber-600" />
                </div>
                <h5 className="font-extrabold text-gray-900 text-base">Classroom Endowment</h5>
                <div className="text-xl font-black text-amber-900 my-2">
                  ETB {classroomPrice.toLocaleString()} <span className="text-xs font-medium text-gray-500">/ Unit</span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Furnish an entire Halaqah room with acoustic wall panels, ergonomic Quran rehal stands, and lighting.
                </p>
              </div>
              <button
                onClick={onOpenPledgeModal}
                className="mt-4 w-full bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 text-xs font-black py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Endow a Classroom</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Direct Ethiopian Bank Transfer Accounts */}
            <div className="p-5 bg-white rounded-2xl border border-gray-200 shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-bold text-blue-800 uppercase tracking-wider bg-blue-50 px-2 py-0.5 rounded">
                    Official Channels
                  </span>
                  <CreditCard className="w-4 h-4 text-blue-600" />
                </div>
                <h5 className="font-extrabold text-gray-900 text-base">Direct Ethiopian Banking</h5>
                <p className="text-[11px] text-gray-500 mb-3">Branch: Chiro, West Hararghe</p>

                {/* Account Rows */}
                <div className="space-y-2 text-xs">
                  {/* CBE */}
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <div>
                      <span className="font-bold text-gray-800 block">CBE Account:</span>
                      <span className="font-mono text-gray-900 font-semibold">{cbeAcc}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(cbeAcc, 'cbe')}
                      className="p-1.5 text-gray-500 hover:text-[#0F5132] transition"
                      title="Copy CBE Account"
                    >
                      {copiedKey === 'cbe' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Telebirr */}
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <div>
                      <span className="font-bold text-gray-800 block">Telebirr / Phone:</span>
                      <span className="font-mono text-gray-900 font-semibold">{telebirrNum}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(telebirrNum, 'telebirr')}
                      className="p-1.5 text-gray-500 hover:text-[#0F5132] transition"
                      title="Copy Telebirr Number"
                    >
                      {copiedKey === 'telebirr' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  {/* Awash */}
                  <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg border border-gray-200">
                    <div>
                      <span className="font-bold text-gray-800 block">Awash Bank:</span>
                      <span className="font-mono text-gray-900 font-semibold">{awashAcc}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(awashAcc, 'awash')}
                      className="p-1.5 text-gray-500 hover:text-[#0F5132] transition"
                      title="Copy Awash Bank Account"
                    >
                      {copiedKey === 'awash' ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <button
                onClick={onOpenPledgeModal}
                className="mt-4 w-full bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-1.5"
              >
                <span>Record Transfer / Pledge</span>
                <PhoneCall className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
