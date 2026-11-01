import React from 'react';
import { 
  BookOpen, 
  MapPin, 
  UserCheck, 
  Cloud, 
  LogIn, 
  LogOut, 
  GraduationCap, 
  Sparkles,
  Menu,
  X,
  Edit3,
  Phone,
  MessageCircle
} from 'lucide-react';
import { UserSession } from '../types';
import { OFFICIAL_LOGO_URL } from '../data/initialData';

interface HeaderProps {
  currentTab: 'home' | 'portal';
  setCurrentTab: (tab: 'home' | 'portal') => void;
  currentUser: UserSession | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCloudConfig: () => void;
  onOpenAdmission: () => void;
  isOwnerMode?: boolean;
  onToggleOwnerMode?: () => void;
  onOpenOwnerEdit?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenCloudConfig,
  onOpenAdmission,
  isOwnerMode,
  onToggleOwnerMode,
  onOpenOwnerEdit
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  return (
    <>
      {/* 1. TOP UTILITY BAR */}
      <div className="bg-[#0A3622] text-white text-xs py-2 px-4 sm:px-8 border-b border-[#0F5132]/60 no-print">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap items-center gap-4 text-emerald-100/90">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#D4AF37]" />
              Chiro, West Hararghe, Oromia, Ethiopia
            </span>
            <span className="hidden sm:inline text-emerald-600">•</span>
            <a 
              href="https://wa.me/251935097339" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center gap-1 text-[#D4AF37] font-bold hover:underline"
              title="Official Phone, WhatsApp & Telegram"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+251935097339</span>
            </a>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Functional Owner Website Edit Toggle */}
            <button
              onClick={onToggleOwnerMode}
              className={`px-3 py-1 rounded-full text-[11px] font-black transition flex items-center gap-1.5 shadow-sm ${
                isOwnerMode 
                  ? 'bg-[#D4AF37] text-gray-950 ring-2 ring-amber-300' 
                  : 'bg-emerald-900/80 hover:bg-emerald-800 text-[#D4AF37] border border-[#D4AF37]/40'
              }`}
              title="Toggle Owner Website Editing Mode"
            >
              <Edit3 className="w-3 h-3" />
              <span>{isOwnerMode ? 'Owner Editing: ON' : 'Owner Edit Mode'}</span>
            </button>

            {isOwnerMode && (
              <button
                onClick={onOpenOwnerEdit}
                className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 px-2.5 py-1 rounded-full text-[11px] font-black transition flex items-center gap-1 shadow-sm"
                title="Open Live Content Editor"
              >
                <span>Edit Site Content</span>
              </button>
            )}

            <button
              onClick={onOpenCloudConfig}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1 text-emerald-200"
              title="Configure Cloud & Google Sheet Webhook Sync"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Cloud Sync</span>
            </button>

            <span className="text-[#D4AF37]/50">|</span>

            {currentUser ? (
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 rounded-full overflow-hidden border border-[#D4AF37] flex-shrink-0 shadow-xs">
                  <img src={OFFICIAL_LOGO_URL} alt="Profile" className="w-full h-full object-cover" />
                </div>
                <span className="text-[#D4AF37] font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                  {currentUser.name} ({currentUser.role})
                </span>
                <button
                  onClick={onLogout}
                  className="text-gray-300 hover:text-red-300 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="hover:text-[#D4AF37] text-white transition-colors font-semibold flex items-center gap-1.5"
              >
                <LogIn className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Director / Mu'allim Sign-In</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Owner Edit Mode Banner Notification */}
      {isOwnerMode && (
        <div className="bg-[#D4AF37] text-gray-950 py-1.5 px-4 text-xs font-bold text-center flex items-center justify-center gap-3 no-print shadow-inner">
          <span className="flex items-center gap-1.5 font-black uppercase tracking-wider">
            <Edit3 className="w-4 h-4" />
            Owner Website Live Editing Active
          </span>
          <span>• Click any "Edit Section" button to modify text, Vision 2030 amounts, or contacts live</span>
          <button
            onClick={onOpenOwnerEdit}
            className="bg-[#0F5132] hover:bg-[#0A3622] text-white px-3 py-0.5 rounded-full text-[11px] font-black"
          >
            Open Editor Modal
          </button>
        </div>
      )}

      {/* 2. NAVIGATION HEADER */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-200/80 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3 flex justify-between items-center">
          {/* Official Logo & Brand Title */}
          <div 
            className="flex items-center gap-3.5 cursor-pointer select-none group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-[#D4AF37] shadow-md group-hover:scale-105 transition-transform bg-white flex-shrink-0 p-0.5">
              <img 
                src={OFFICIAL_LOGO_URL} 
                alt="Markazul Furqan Official Logo - Chiro, Ethiopia" 
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-bold text-[#0F5132] block">
                Chiro • Ethiopia • 2018/2019 E.C.
              </span>
              <h1 className="text-xl sm:text-2xl font-black text-[#0F5132] tracking-tight leading-tight">
                MARKAZUL FURQAN
              </h1>
              <p className="text-[11px] text-gray-500 font-medium">
                Quran Memorization & Arabic Studies Center
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-sm font-semibold">
            <a 
              href="#about" 
              onClick={() => setCurrentTab('home')}
              className="text-gray-700 hover:text-[#0F5132] transition-colors"
            >
              About Center
            </a>
            <a 
              href="#programs" 
              onClick={() => setCurrentTab('home')}
              className="text-gray-700 hover:text-[#0F5132] transition-colors"
            >
              Curriculum
            </a>
            <a 
              href="#quran-explorer" 
              onClick={() => setCurrentTab('home')}
              className="text-gray-700 hover:text-[#0F5132] transition-colors"
            >
              30 Juz Guide
            </a>
            <a 
              href="#campaign" 
              onClick={() => setCurrentTab('home')}
              className="text-gray-700 hover:text-[#0F5132] transition-colors flex items-center gap-1"
            >
              <span>Vision 2030</span>
              <span className="bg-amber-100 text-amber-900 text-[10px] font-bold px-1.5 py-0.5 rounded">
                ETB 4.5M
              </span>
            </a>

            {/* Academic Portal Toggle Button */}
            <button
              onClick={() => setCurrentTab(currentTab === 'portal' ? 'home' : 'portal')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-sm flex items-center gap-2 ${
                currentTab === 'portal'
                  ? 'bg-amber-500 hover:bg-amber-600 text-white'
                  : 'bg-[#0F5132] hover:bg-[#0A3622] text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
              <span>{currentTab === 'portal' ? 'Exit Portal' : 'Academic Portal'}</span>
            </button>

            {/* Enroll Student CTA */}
            <button
              onClick={onOpenAdmission}
              className="bg-[#D4AF37] hover:bg-[#E9C46A] text-[#212529] px-4 py-2 rounded-xl text-xs font-extrabold shadow-sm hover:shadow transition-all flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-800" />
              <span>Enroll Student</span>
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setCurrentTab(currentTab === 'portal' ? 'home' : 'portal')}
              className="bg-[#0F5132] text-white p-2 rounded-lg text-xs"
              title="Toggle Portal"
            >
              <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-gray-700 hover:text-[#0F5132]"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 bg-white px-6 py-4 space-y-3 text-sm font-semibold shadow-xl">
            <div className="p-2 bg-amber-50 rounded-xl border border-amber-200 flex justify-between items-center text-xs">
              <span className="font-bold text-gray-800">Owner Live Editing:</span>
              <button
                onClick={() => {
                  onToggleOwnerMode?.();
                  setMobileMenuOpen(false);
                }}
                className="bg-[#D4AF37] text-gray-950 px-3 py-1 rounded-lg font-black"
              >
                {isOwnerMode ? 'Turn OFF' : 'Turn ON'}
              </button>
            </div>

            <a 
              href="#about" 
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="block text-gray-700 hover:text-[#0F5132]"
            >
              About Center
            </a>
            <a 
              href="#programs" 
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="block text-gray-700 hover:text-[#0F5132]"
            >
              Curriculum & Methodology
            </a>
            <a 
              href="#quran-explorer" 
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="block text-gray-700 hover:text-[#0F5132]"
            >
              Juz & Tajweed Guide
            </a>
            <a 
              href="#campaign" 
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="block text-gray-700 hover:text-[#0F5132]"
            >
              Vision 2030 (ETB 4.5M Campaign)
            </a>
            <a 
              href="#contact" 
              onClick={() => { setCurrentTab('home'); setMobileMenuOpen(false); }}
              className="block text-gray-700 hover:text-[#0F5132]"
            >
              Contact (+251935097339)
            </a>
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { setCurrentTab('portal'); setMobileMenuOpen(false); }}
                className="w-full bg-[#0F5132] text-white py-2.5 rounded-lg text-xs font-bold flex justify-center items-center gap-2"
              >
                <GraduationCap className="w-4 h-4 text-[#D4AF37]" />
                <span>Go to Academic Portal</span>
              </button>
              <button
                onClick={() => { onOpenAdmission(); setMobileMenuOpen(false); }}
                className="w-full bg-[#D4AF37] text-gray-900 py-2.5 rounded-lg text-xs font-bold text-center"
              >
                Enroll Student (2018/2019 E.C.)
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
