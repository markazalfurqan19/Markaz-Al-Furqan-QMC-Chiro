import React, { useState } from 'react';
import { X, Lock, LogIn, UserCheck, Shield } from 'lucide-react';
import { UserSession } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (user: UserSession) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    const isDirector = email.toLowerCase().includes('director') || email.toLowerCase().includes('kadir');
    onLogin({
      name: email.split('@')[0],
      email: email,
      role: isDirector ? 'DIRECTOR' : 'MUALLIM'
    });
    onClose();
  };

  const selectQuickRole = (name: string, mail: string, role: 'DIRECTOR' | 'MUALLIM' | 'ADMIN') => {
    onLogin({ name, email: mail, role });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative border border-gray-100">
        
        {/* Header */}
        <div className="flex justify-between items-center pb-4 border-b border-gray-100 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-[#0F5132] flex items-center justify-center">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black text-gray-900 leading-tight">
                Academic Portal Authentication
              </h3>
              <p className="text-[11px] text-gray-500">Sign in for teachers & administration</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Demo Sign In Roles */}
        <div className="mb-5">
          <span className="text-[11px] font-bold text-gray-500 uppercase tracking-wider block mb-2">
            One-Click Quick Login
          </span>
          <div className="space-y-2">
            <button
              onClick={() => selectQuickRole('Ustaz Kadir Hamza', 'director@markazulfurqan.edu.et', 'DIRECTOR')}
              className="w-full text-left p-3 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition flex items-center justify-between"
            >
              <div>
                <span className="font-extrabold text-xs text-gray-900 block">Ustaz Kadir Hamza Siyum</span>
                <span className="text-[10px] text-emerald-800">Founder & Directorate Chair</span>
              </div>
              <span className="text-[10px] bg-[#0F5132] text-white px-2 py-0.5 rounded font-bold">
                Director
              </span>
            </button>

            <button
              onClick={() => selectQuickRole('Mu\'allim Ziyad Abdullahi', 'ziyad@markazulfurqan.edu.et', 'MUALLIM')}
              className="w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition flex items-center justify-between"
            >
              <div>
                <span className="font-extrabold text-xs text-gray-900 block">Mu'allim Ziyad Abdullahi</span>
                <span className="text-[10px] text-gray-500">Senior Halaqah Instructor</span>
              </div>
              <span className="text-[10px] bg-slate-700 text-white px-2 py-0.5 rounded font-bold">
                Mu'allim
              </span>
            </button>

            <button
              onClick={() => selectQuickRole('Secretariat Chiro', 'markazalfurqan19@gmail.com', 'ADMIN')}
              className="w-full text-left p-3 rounded-xl bg-amber-50 hover:bg-amber-100 border border-amber-200 transition flex items-center justify-between"
            >
              <div>
                <span className="font-extrabold text-xs text-gray-900 block">Markazul Furqan Secretariat</span>
                <span className="text-[10px] text-amber-900">markazalfurqan19@gmail.com</span>
              </div>
              <span className="text-[10px] bg-amber-600 text-white px-2 py-0.5 rounded font-bold">
                Admin
              </span>
            </button>
          </div>
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
            or enter account
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-3 text-xs mt-3">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Email or Username</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. director@markazulfurqan.edu.et"
              className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
            />
          </div>

          <div>
            <label className="block font-bold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-300 rounded-xl p-2.5 focus:outline-none focus:border-[#0F5132]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#0F5132] hover:bg-[#0A3622] text-white font-extrabold py-3 rounded-xl transition shadow flex items-center justify-center gap-1.5 mt-2"
          >
            <LogIn className="w-4 h-4 text-[#D4AF37]" />
            <span>Sign In to Portal</span>
          </button>
        </form>
      </div>
    </div>
  );
};
