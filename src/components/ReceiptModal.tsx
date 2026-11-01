import React from 'react';
import { X, Printer, QrCode, Phone, MessageCircle } from 'lucide-react';
import { DonationPledge } from '../types';
import { OFFICIAL_LOGO_URL } from '../data/initialData';

interface ReceiptModalProps {
  isOpen: boolean;
  onClose: () => void;
  pledge: DonationPledge | null;
}

export const ReceiptModal: React.FC<ReceiptModalProps> = ({
  isOpen,
  onClose,
  pledge
}) => {
  if (!isOpen || !pledge) return null;

  const handlePrint = () => {
    window.print();
  };

  const receiptNumber = `MF-RCP-${pledge.id.toUpperCase()}`;
  const issueDate = pledge.date || new Date().toISOString().split('T')[0];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[96vh] overflow-y-auto">
        
        {/* Controls (Non-print) */}
        <div className="flex justify-between items-center pb-4 mb-6 border-b border-gray-200 no-print">
          <div>
            <h3 className="text-lg font-black text-gray-900 leading-tight">
              Official Donation Receipt
            </h3>
            <p className="text-[11px] text-gray-500">
              Receipt No: {receiptNumber}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="bg-[#0F5132] hover:bg-[#0A3622] text-white px-4 py-2 rounded-xl text-xs font-black transition shadow flex items-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4 text-[#D4AF37]" />
              <span>Print Official Receipt</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 rounded-xl hover:bg-gray-100 transition cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PRINTABLE RECEIPT CONTAINER */}
        <div 
          id="printable-report-area" 
          className="bg-amber-50/20 rounded-2xl p-6 sm:p-8 border-2 border-[#D4AF37] shadow-sm relative overflow-hidden print:border print:m-0 print:p-6"
        >
          {/* Top Logo and Header */}
          <div className="text-center border-b-2 border-[#0F5132] pb-5 mb-5 relative">
            {/* Standard Size Official Center Emblem Header */}
            <div className="flex justify-center mb-2.5">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md bg-white p-0.5">
                <img 
                  src={OFFICIAL_LOGO_URL} 
                  alt="Markazul Furqan Official Logo" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </div>

            <p className="font-quran text-lg sm:text-xl font-bold text-[#0F5132]">
              مركز الفرقان لتحفيظ القرآن الكريم - جرو - إثيوبيا
            </p>
            <h2 className="text-base sm:text-lg font-black text-[#0F5132] tracking-tight uppercase">
              MARKAZUL FURQAN QURAN MEMORIZATION CENTER
            </h2>
            <p className="text-[11px] font-semibold text-gray-600">
              Chiro, West Hararghe, Oromia, Ethiopia • Tel: +251935097339
            </p>

            <div className="inline-block mt-2.5 bg-[#0F5132] text-[#D4AF37] text-xs font-black uppercase px-4 py-1 rounded-full tracking-wider shadow-xs">
              OFFICIAL CONTRIBUTION & DONATION RECEIPT • وصل استلام رسمي
            </div>
          </div>

          {/* Receipt Metadata Bar */}
          <div className="flex justify-between items-center text-xs font-semibold text-gray-700 bg-white p-3 rounded-xl border border-gray-200 mb-5">
            <div>
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Receipt Number:</span>
              <span className="font-mono font-bold text-gray-900">{receiptNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-gray-400 text-[10px] uppercase font-bold block">Transaction Date:</span>
              <span className="font-mono font-bold text-gray-900">{issueDate} (2018 E.C.)</span>
            </div>
          </div>

          {/* Donor & Contribution Details Table */}
          <div className="space-y-3 text-xs bg-white p-4 rounded-xl border border-gray-200 mb-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Received With Gratitude From:</span>
                <span className="text-sm font-black text-gray-950">{pledge.donorName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Contact Phone / Email:</span>
                <span className="font-mono font-bold text-gray-800">{pledge.phoneOrEmail}</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-3 border-b border-gray-100">
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Campaign Tier / Purpose:</span>
                <span className="font-bold text-[#0F5132]">{pledge.tier}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-gray-400 block">Payment Channel & Reference:</span>
                <span className="font-semibold text-gray-800">
                  {pledge.channel} {pledge.referenceNumber ? `(Ref: ${pledge.referenceNumber})` : ''}
                </span>
              </div>
            </div>

            {/* Highlighted Amount */}
            <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 flex justify-between items-center">
              <div>
                <span className="text-[10px] uppercase font-black text-[#0F5132] tracking-wider block">
                  Amount Contributed (ETB)
                </span>
                <span className="text-xs text-gray-600 italic">Sadaqah Jariyah / Vision 2030 Endowment</span>
              </div>
              <div className="text-right">
                <span className="text-2xl font-black text-[#0F5132]">
                  ETB {pledge.amountETB.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Ayah on Charity */}
          <div className="text-center py-2 px-4 bg-amber-50 rounded-xl border border-amber-200 mb-6">
            <p className="font-quran text-xs text-[#0F5132] font-semibold leading-relaxed">
              "مَثَلُ الَّذِينَ يُنْفِقُونَ أَمْوَالَهُمْ فِي سَبِيلِ اللَّهِ كَمَثَلِ حَبَّةٍ أَنْبَتَتْ سَبْعَ سَنَابِلَ"
            </p>
            <p className="text-[10px] text-gray-600 italic mt-0.5">
              "The example of those who spend their wealth in the way of Allah is like a seed of grain which grows seven spikes..." (Surah Al-Baqarah 2:261)
            </p>
          </div>

          {/* Institutional Sign-off & Seal */}
          <div className="grid grid-cols-2 gap-4 items-end pt-4 border-t border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[#D4AF37] p-0.5 bg-white shadow-xs shrink-0">
                <img 
                  src={OFFICIAL_LOGO_URL} 
                  alt="Official Seal" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div>
                <span className="text-[10px] font-black uppercase text-[#0F5132] block">
                  Official Center Seal
                </span>
                <span className="text-[9px] text-gray-500 font-mono">
                  Verified Directorate Seal
                </span>
              </div>
            </div>

            <div className="text-right">
              <div className="h-8 border-b border-dashed border-gray-400 mb-1 flex items-end justify-end font-quran font-bold text-sm text-[#0F5132]">
                قادر حمزة سيوم
              </div>
              <span className="text-xs font-bold text-gray-900 block">Ustaz Kadir Hamza Siyum</span>
              <span className="text-[10px] text-gray-500 block">Director & Directorate Chair</span>
            </div>
          </div>

          {/* Footer Contact & Verification */}
          <div className="mt-5 pt-3 border-t border-gray-200 flex justify-between items-center text-[10px] text-gray-500">
            <div className="flex items-center gap-2">
              <QrCode className="w-4 h-4 text-gray-600" />
              <span>Official Helpline: +251935097339 (WhatsApp / Telegram)</span>
            </div>
            <span>Markazul Furqan • Chiro, Ethiopia</span>
          </div>
        </div>

      </div>
    </div>
  );
};
