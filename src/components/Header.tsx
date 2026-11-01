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
  X
} from 'lucide-react';
import { UserSession } from '../types';

interface HeaderProps {
  currentTab: 'home' | 'portal';
  setCurrentTab: (tab: 'home' | 'portal') => void;
  currentUser: UserSession | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenCloudConfig: () => void;
  onOpenAdmission: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenCloudConfig,
  onOpenAdmission
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
            <span className="flex items-center gap-1.5 font-medium">
              <UserCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              Leadership: Ustaz Kadir Hamza Siyum
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenCloudConfig}
              className="hover:text-[#D4AF37] transition-colors flex items-center gap-1.5 text-emerald-200"
              title="Configure Cloud & Google Sheet Webhook Sync"
            >
              <Cloud className="w-3.5 h-3.5" />
              <span>Cloud Sync</span>
            </button>
            <span className="text-[#D4AF37]/50">|</span>
            {currentUser ? (
              <div className="flex items-center gap-2">
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
                <span>Mu'allim / Admin Login</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 2. NAVIGATION HEADER */}
      <header className="bg-white sticky top-0 z-40 shadow-sm border-b border-gray-200/80 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
          {/* Logo & Brand Title */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group"
            onClick={() => setCurrentTab('home')}
          >
            <div className="w-12 h-12 rounded-xl bg-[#0F5132] flex items-center justify-center text-[#D4AF37] shadow-md border border-[#D4AF37]/40 group-hover:scale-105 transition-transform">
              <BookOpen className="w-6 h-6" />
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
              Curriculum & Methodology
            </a>
            <a 
              href="#quran-explorer" 
              onClick={() => setCurrentTab('home')}
              className="text-gray-700 hover:text-[#0F5132] transition-colors"
            >
              Juz & Tajweed Guide
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
              Contact & Location
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
