import React, { useState } from 'react';
import { Search, Sparkles, MapPin, Compass, ArrowRight, ShieldCheck, TrendingDown, Award } from 'lucide-react';

export default function Hero({ t, lang, onSearchSubmit, onQuickFilterSelect }) {
  const [query, setQuery] = useState('');

  const quickPills = [
    { label: "Kolli Hills (70 Bends)", id: "namakkal-kolli-hills", icon: "⛰️" },
    { label: "Athangudi Tile Mansions", id: "sivaganga-chettinad-athangudi", icon: "🏛️" },
    { label: "Pichavaram Mangroves", id: "cuddalore-pichavaram-mangrove", icon: "🛶" },
    { label: "Sittanavasal Cave Murals", id: "pudukkottai-sittanavasal", icon: "🎨" },
    { label: "Manjolai Tea Wilderness", id: "tirunelveli-manimuthar-kalakkad", icon: "🍃" },
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    onSearchSubmit(query);
  };

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-amber-600/15 via-rose-600/10 to-blue-600/15 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none -z-10" />

      {/* Subtle Grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293715_1px,transparent_1px),linear-gradient(to_bottom,#1f293715_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_70%,transparent_100%)] -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Official Ecosystem Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-amber-500/30 backdrop-blur-md mb-6 shadow-inner animate-pulse-slow">
          <Award className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-xs font-semibold tracking-wide text-amber-300">
            {t.hero.badge}
          </span>
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
        </div>

        {/* Hero Main Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white max-w-4xl mx-auto leading-tight sm:leading-tight lg:leading-[1.15] mb-6">
          {t.hero.titleStart}{' '}
          <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-200 bg-clip-text text-transparent underline decoration-amber-500/40 decoration-wavy decoration-2">
            {t.hero.titleHighlight}
          </span>{' '}
          {t.hero.titleEnd}
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto mb-10 font-normal leading-relaxed">
          {t.hero.desc}
        </p>

        {/* Interactive Search Bar */}
        <div className="max-w-3xl mx-auto mb-8">
          <form 
            onSubmit={handleFormSubmit}
            className="relative flex flex-col sm:flex-row items-center p-2 rounded-2xl glass-panel border border-white/15 shadow-2xl shadow-black/60 focus-within:border-amber-500/60 transition-all gap-2"
          >
            <div className="flex items-center flex-1 w-full px-3 py-1.5">
              <Search className="w-5 h-5 text-amber-400 shrink-0 mr-3" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t.hero.searchPlaceholder}
                className="w-full bg-transparent text-sm sm:text-base text-white placeholder-slate-400 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/25 flex items-center justify-center gap-2 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <span>{t.hero.searchBtn}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-14">
          <span className="text-xs text-slate-400 font-medium mr-1 flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-amber-400" />
            {lang === 'ta' ? 'அதிவேக பரிந்துரைகள்:' : 'Offbeat Gems:'}
          </span>
          {quickPills.map((pill) => (
            <button
              key={pill.id}
              onClick={() => onQuickFilterSelect(pill.id)}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-amber-300 hover:border-amber-500/40 transition-all hover:scale-105"
            >
              <span>{pill.icon}</span>
              <span>{pill.label}</span>
            </button>
          ))}
        </div>

        {/* Key Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 max-w-5xl mx-auto">
          
          <div className="glass-card p-4 rounded-xl text-center border border-white/5">
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-display">
              38
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">
              {lang === 'ta' ? 'ஒருங்கிணைந்த மாவட்டங்கள்' : 'Tamil Nadu Districts'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              100% Geographic Coverage
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center border border-white/5">
            <div className="text-2xl sm:text-3xl font-extrabold text-emerald-400 font-display flex items-center justify-center gap-1">
              <span>-64%</span>
              <TrendingDown className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">
              {lang === 'ta' ? 'கூட்ட நெரிசல் குறைப்பு' : 'Overcrowding Reduction'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Targeted Smart Footfall Shift
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center border border-white/5">
            <div className="text-2xl sm:text-3xl font-extrabold text-blue-400 font-display">
              450+
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">
              {lang === 'ta' ? 'சான்றளிக்கப்பட்ட வழிகாட்டிகள்' : 'Verified Local Guides'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Direct Community Employment
            </div>
          </div>

          <div className="glass-card p-4 rounded-xl text-center border border-white/5">
            <div className="text-2xl sm:text-3xl font-extrabold text-rose-400 font-display">
              800+
            </div>
            <div className="text-xs text-slate-300 font-medium mt-1">
              {lang === 'ta' ? 'கைவினைஞர்கள் & விவசாயிகள்' : 'Artisans & MSMEs'}
            </div>
            <div className="text-[10px] text-slate-400 mt-0.5">
              Namma Sandhai Marketplace
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
