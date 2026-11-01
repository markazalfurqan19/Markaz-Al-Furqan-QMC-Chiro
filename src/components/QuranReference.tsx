import React, { useState } from 'react';
import { 
  BookMarked, 
  Search, 
  Sparkles, 
  BookOpen, 
  Play, 
  Pause, 
  Volume2, 
  Info,
  CheckCircle2
} from 'lucide-react';
import { QURAN_JUZ_LIST, TAJWEED_RULES } from '../data/initialData';

export const QuranReference: React.FC = () => {
  const [juzFilter, setJuzFilter] = useState<'ALL' | '1-10' | '11-20' | '21-30'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRule, setSelectedRule] = useState(0);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const filteredJuz = QURAN_JUZ_LIST.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.arabic.includes(searchQuery) ||
                          item.startSurah.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.juz.toString() === searchQuery.trim();
    if (juzFilter === '1-10') return matchesSearch && item.juz <= 10;
    if (juzFilter === '11-20') return matchesSearch && item.juz > 10 && item.juz <= 20;
    if (juzFilter === '21-30') return matchesSearch && item.juz > 20;
    return matchesSearch;
  });

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlayingAudio) {
      audioRef.current.pause();
      setIsPlayingAudio(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlayingAudio(true);
      }).catch(err => {
        console.log('Audio playback notice:', err);
      });
    }
  };

  return (
    <section id="quran-explorer" className="py-20 px-4 sm:px-8 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <span className="text-xs font-black text-[#0F5132] uppercase tracking-wider bg-emerald-100 px-3.5 py-1.5 rounded-full inline-block mb-3">
            Academic Reference & Tajweed Guide
          </span>
          <h3 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight">
            The 30 Juz & Canonical Tajweed Rules
          </h3>
          <p className="text-sm sm:text-base text-gray-600 mt-3 leading-relaxed">
            Essential reference guide for Markazul Furqan students, parents, and huffaz candidates in Chiro.
          </p>
        </div>

        {/* Audio Player Exemplar Banner */}
        <div className="mb-10 bg-gradient-to-r from-[#0F5132] to-[#0A3622] rounded-3xl p-6 text-white shadow-md border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-14 h-14 rounded-2xl bg-[#D4AF37] text-gray-950 flex items-center justify-center shrink-0 shadow-lg">
              <Volume2 className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-[#D4AF37] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
                  Tarteel Audio Exemplar
                </span>
                <span className="text-xs text-emerald-200">Surah Al-Furqan (Ayat 63-77)</span>
              </div>
              <h4 className="text-lg sm:text-xl font-black mt-1">
                Authentic Hafs 'an 'Asim Recitation Standard
              </h4>
              <p className="text-xs text-emerald-100/80">
                Demonstrating measured tempo, Makharij clarity, and proper Madd elongation.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <audio 
              ref={audioRef}
              src="https://cdn.islamic.network/quran/audio/128/ar.alafasy/2918.mp3"
              onEnded={() => setIsPlayingAudio(false)}
            />
            <button
              onClick={toggleAudio}
              className="bg-[#D4AF37] hover:bg-[#E9C46A] text-gray-950 font-bold px-5 py-3 rounded-2xl transition flex items-center gap-2 shadow-lg"
            >
              {isPlayingAudio ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Recitation</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>Listen to Tarteel</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Grid: 30 Juz Reference on Left, Tajweed Rules on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left 2 Cols: 30 Juz Directory */}
          <div className="lg:col-span-2 bg-gray-50 rounded-3xl p-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
              <div>
                <h4 className="text-lg font-black text-gray-900 flex items-center gap-2">
                  <BookMarked className="w-5 h-5 text-[#0F5132]" />
                  <span>The 30 Juz Directory</span>
                </h4>
                <p className="text-xs text-gray-500">Quick scope lookup for Sabaq & Manzil planning</p>
              </div>

              {/* Filter Tabs */}
              <div className="flex flex-wrap items-center gap-1.5 bg-white p-1 rounded-xl border border-gray-200 text-xs font-semibold">
                <button
                  onClick={() => setJuzFilter('ALL')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    juzFilter === 'ALL' ? 'bg-[#0F5132] text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  All (30)
                </button>
                <button
                  onClick={() => setJuzFilter('1-10')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    juzFilter === '1-10' ? 'bg-[#0F5132] text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Juz 1-10
                </button>
                <button
                  onClick={() => setJuzFilter('11-20')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    juzFilter === '11-20' ? 'bg-[#0F5132] text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Juz 11-20
                </button>
                <button
                  onClick={() => setJuzFilter('21-30')}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    juzFilter === '21-30' ? 'bg-[#0F5132] text-white' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Juz 21-30
                </button>
              </div>
            </div>

            {/* Search Input */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search Juz by name, number, or surah (e.g. Al-Baqarah, 30)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white text-xs pl-9 pr-4 py-2.5 rounded-xl border border-gray-300 focus:outline-none focus:border-[#0F5132] shadow-sm"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
            </div>

            {/* Scrollable Juz Cards List */}
            <div className="max-h-[420px] overflow-y-auto space-y-2 pr-1 custom-scrollbar">
              {filteredJuz.map((j) => (
                <div 
                  key={j.juz}
                  className="bg-white p-3.5 rounded-2xl border border-gray-200/80 hover:border-[#D4AF37] transition flex items-center justify-between shadow-xs"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-50 border border-emerald-200 text-[#0F5132] font-black text-xs flex items-center justify-center shrink-0">
                      {j.juz}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-sm text-gray-900">{j.name}</span>
                        <span className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded font-mono">
                          Juz {j.juz}
                        </span>
                      </div>
                      <div className="text-[11px] text-gray-500 mt-0.5">
                        {j.startSurah} ➔ {j.endSurah}
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-quran text-lg font-bold text-[#0F5132]">
                      {j.arabic}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Col: Tajweed Rules Framework */}
          <div className="bg-gray-50 rounded-3xl p-6 border border-gray-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-lg font-black text-gray-900">Tajweed Foundations</h4>
              </div>
              <p className="text-xs text-gray-500 mb-4">
                The 4 structural cornerstones of authentic recitation taught at Markazul Furqan.
              </p>

              {/* Rule selector buttons */}
              <div className="space-y-2 mb-5">
                {TAJWEED_RULES.map((rule, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedRule(idx)}
                    className={`w-full text-left p-3 rounded-2xl transition flex items-center justify-between text-xs font-bold border ${
                      selectedRule === idx
                        ? 'bg-[#0F5132] text-white border-[#0F5132] shadow-sm'
                        : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-100'
                    }`}
                  >
                    <span>{rule.title}</span>
                    <span className="font-quran text-sm opacity-90">{rule.arabic}</span>
                  </button>
                ))}
              </div>

              {/* Active Rule Details Card */}
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm">
                <h5 className="font-extrabold text-gray-900 text-sm mb-1">
                  {TAJWEED_RULES[selectedRule].title}
                </h5>
                <p className="text-xs text-gray-600 mb-3 leading-relaxed">
                  {TAJWEED_RULES[selectedRule].description}
                </p>
                <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                  Primary Categories:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {TAJWEED_RULES[selectedRule].types.map((type, tIdx) => (
                    <span 
                      key={tIdx}
                      className="bg-emerald-50 text-[#0F5132] border border-emerald-200 px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3 h-3 text-[#D4AF37]" />
                      {type}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-2xl text-[11px] text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
              <span>All students undergo oral evaluation with Ustaz Kadir Hamza Siyum prior to Sanad graduation.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
