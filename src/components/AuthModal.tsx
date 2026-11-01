import React, { useState } from 'react';
import { X, Lock, LogIn, UserCheck, Shield, Sparkles } from 'lucide-react';
import { UserSession } from '../types';
import { signInWithGoogle } from '../lib/firebase';

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
  const [googleLoading, setGoogleLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    setErrorMsg(null);
    try {
      const fbUser = await signInWithGoogle();
      const isDirector = fbUser.email?.toLowerCase().includes('director') || 
                         fbUser.email?.toLowerCase().includes('kadir') ||
                         fbUser.email === 'markazalfurqan19@gmail.com';
      onLogin({
        name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Authenticated User',
        email: fbUser.email || 'user@markazulfurqan.edu.et',
        role: isDirector ? 'DIRECTOR' : 'MUALLIM',
        isGoogleAuth: true
      });
      onClose();
    } catch (err: any) {
      console.warn('Google sign-in attempt notice:', err);
      setErrorMsg('Google Sign-In canceled or popup closed.');
    } finally {
      setGoogleLoading(false);
    }
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

        {/* 1. Google Sign-In with Firebase Auth */}
        <div className="mb-5">
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={googleLoading}
            className="w-full bg-white hover:bg-gray-50 text-gray-800 font-bold py-3 px-4 rounded-2xl border-2 border-gray-200 shadow-sm transition flex items-center justify-center gap-3 text-xs disabled:opacity-50"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>{googleLoading ? 'Signing in with Google...' : 'Sign in with Google (Firebase Auth)'}</span>
          </button>
          {errorMsg && <p className="text-[11px] text-red-600 mt-1.5 text-center">{errorMsg}</p>}
        </div>

        <div className="relative flex py-2 items-center">
          <div className="flex-grow border-t border-gray-200"></div>
          <span className="flex-shrink mx-3 text-gray-400 text-[10px] uppercase font-bold tracking-wider">
            or choose quick role
          </span>
          <div className="flex-grow border-t border-gray-200"></div>
        </div>

        {/* Quick Demo Sign In Roles */}
        <div className="my-3 space-y-2">
          <button
            onClick={() => selectQuickRole('Ustaz Kadir Hamza', 'director@markazulfurqan.edu.et', 'DIRECTOR')}
            className="w-full text-left p-2.5 rounded-xl bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 transition flex items-center justify-between"
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
            className="w-full text-left p-2.5 rounded-xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition flex items-center justify-between"
          >
            <div>
              <span className="font-extrabold text-xs text-gray-900 block">Mu'allim Ziyad Abdullahi</span>
              <span className="text-[10px] text-gray-500">Senior Halaqah Instructor</span>
            </div>
            <span className="text-[10px] bg-slate-700 text-white px-2 py-0.5 rounded font-bold">
              Mu'allim
            </span>
          </button>
        </div>

        {/* Custom Input Form */}
        <form onSubmit={handleCustomSubmit} className="space-y-3 text-xs mt-3">
          <div>
            <label className="block font-bold text-gray-700 mb-1">Email / Username</label>
            <input
              type="text"
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
