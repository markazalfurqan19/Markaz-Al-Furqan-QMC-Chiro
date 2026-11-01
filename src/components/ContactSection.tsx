import React, { useState } from 'react';
import { 
  Mail, 
  MapPin, 
  Phone, 
  Clock, 
  Send, 
  CheckCircle2, 
  HelpCircle,
  MessageSquare,
  Edit3
} from 'lucide-react';
import { SiteContentConfig } from '../types';

interface ContactSectionProps {
  siteContent?: SiteContentConfig;
  isOwnerMode?: boolean;
  onEditContact?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  siteContent,
  isOwnerMode,
  onEditContact
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const phoneNum = siteContent?.contactPhone || '+251935097339';
  const emailAddr = siteContent?.contactEmail || 'markazalfurqan19@gmail.com';
  const campusAddr = siteContent?.campusLocation || 'Adjacent to Grand Jame\'a Mosque, Central Chiro, West Hararghe, Oromia Region, Ethiopia';
  const hours = siteContent?.visitingHours || 'Saturday – Thursday: 8:00 AM – 6:00 PM (Friday: After Jum\'ah)';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        subject: 'General Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-8 bg-white border-b border-gray-200 relative">
      {/* Owner Edit Floating Button */}
      {isOwnerMode && (
        <div className="max-w-6xl mx-auto flex justify-end mb-4">
          <button
            onClick={onEditContact}
            className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 px-3.5 py-1.5 rounded-full text-xs font-black shadow-md flex items-center gap-1.5 transition transform hover:scale-105"
            title="Edit Contact details, phone, and hours"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Contact & Location</span>
          </button>
        </div>
      )}

      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black text-[#0F5132] uppercase tracking-wider bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Inquiries & Admissions
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            Connect with Markazul Furqan
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Have questions about admission enrollment, student sponsorship, or visiting our Chiro campus? Reach out directly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left 2 Cols: Contact Cards & Campus Details */}
          <div className="lg:col-span-2 space-y-4">
            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-200">
              <h4 className="text-base font-extrabold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-[#0F5132]" />
                <span>Chiro Campus Address</span>
              </h4>
              <p className="text-xs text-gray-600 leading-relaxed mb-3">
                {campusAddr}
              </p>
              <div className="text-[11px] text-emerald-800 font-semibold bg-emerald-50 p-2.5 rounded-xl border border-emerald-200">
                Adjacent to Grand Jame'a Mosque, Central Chiro
              </div>
            </div>

            <div className="p-6 bg-gray-50 rounded-3xl border border-gray-200 space-y-3">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-gray-500 block font-medium">Official Email:</span>
                  <a 
                    href={`mailto:${emailAddr}`}
                    className="text-xs font-bold text-gray-900 hover:text-[#0F5132] transition"
                  >
                    {emailAddr}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-gray-500 block font-medium">Direct Phone & Helpline:</span>
                  <a href={`tel:${phoneNum}`} className="text-xs font-black text-gray-900 hover:text-[#0F5132] transition font-mono">
                    {phoneNum}
                  </a>
                </div>
              </div>

              {/* Direct WhatsApp and Telegram Integration */}
              <div className="pt-2 pb-1 border-t border-gray-200">
                <span className="text-[10px] font-bold uppercase text-gray-500 block mb-2">
                  Instant Messaging Support ({phoneNum}):
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <a
                    href="https://wa.me/251935097339"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-700 text-white p-2 rounded-xl text-center text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>WhatsApp</span>
                  </a>
                  <a
                    href="https://t.me/+251935097339"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-sky-600 hover:bg-sky-700 text-white p-2 rounded-xl text-center text-xs font-bold transition flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <span>Telegram</span>
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#0F5132] shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs text-gray-500 block font-medium">Office & Visiting Hours:</span>
                  <span className="text-xs font-semibold text-gray-700">{hours}</span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-emerald-950 text-white rounded-3xl border border-[#D4AF37]/40 shadow-sm">
              <h5 className="font-extrabold text-[#D4AF37] text-sm mb-1">
                Diaspora & International Inquiries
              </h5>
              <p className="text-xs text-emerald-100/90 leading-relaxed">
                Direct wire donations and sponsorship certificates can be facilitated via our dedicated email team at{' '}
                <a href={`mailto:${emailAddr}`} className="text-[#D4AF37] underline font-bold">
                  {emailAddr}
                </a>{' '}
                or WhatsApp at <strong>+251935097339</strong>.
              </p>
            </div>
          </div>

          {/* Right 3 Cols: Direct Message Form */}
          <div className="lg:col-span-3 bg-white p-8 rounded-3xl border border-gray-200 shadow-sm">
            <h4 className="text-xl font-extrabold text-gray-900 mb-1 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-[#0F5132]" />
              <span>Send an Official Direct Inquiry</span>
            </h4>
            <p className="text-xs text-gray-500 mb-6">
              Our secretariat in Chiro responds to all queries within 24 hours.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-emerald-50 rounded-2xl border border-emerald-300">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto mb-3" />
                <h5 className="text-lg font-black text-gray-900">Message Received, Jazaakallahu Khayran!</h5>
                <p className="text-xs text-gray-600 mt-2 max-w-md mx-auto">
                  Your inquiry has been logged. Our office in Chiro will reach out via phone ({phoneNum}) or email ({formData.email || 'provided contact'}).
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Mohammed Ahmed"
                      className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Phone Number (Ethiopia / Int'l) *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="0911... or +251..."
                      className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@gmail.com"
                      className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-gray-700 mb-1">Subject / Department</label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132] font-medium"
                    >
                      <option value="General Inquiry">General Center Inquiry</option>
                      <option value="Admission Question">Student Admission 2018/2019 E.C.</option>
                      <option value="Vision 2030 Sponsorship">Vision 2030 Campus Sponsorship</option>
                      <option value="Certificate Verification">Certificate & Transcript Verification</option>
                      <option value="Ustaz Kadir hamza">Message for Ustaz Kadir Hamza Siyum</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-gray-700 mb-1">Message Details *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your inquiry or question here..."
                    className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:border-[#0F5132]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#0F5132] hover:bg-[#0A3622] text-white font-extrabold py-3.5 rounded-xl transition shadow flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-[#D4AF37]" />
                  <span>Send Message to Markazul Furqan Office</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
