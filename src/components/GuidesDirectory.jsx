import React, { useState } from 'react';
import { 
  Users, ShieldCheck, Star, Award, Phone, Car, CheckCircle, 
  Search, Filter, Calendar, MessageSquare, ArrowRight, Shield 
} from 'lucide-react';
import { verifiedGuides } from '../data/guides';

export default function GuidesDirectory({ t, lang, onOpenBookingModal }) {
  const [selectedLanguage, setSelectedLanguage] = useState('All');
  const [guideSearch, setGuideSearch] = useState('');

  const languagesList = ["All", "Tamil", "English", "Kannada", "Hindi", "French", "German"];

  const filteredGuides = verifiedGuides.filter(g => {
    const matchesLang = selectedLanguage === 'All' || g.languages.includes(selectedLanguage);
    const matchesSearch = guideSearch === '' || 
      g.name.toLowerCase().includes(guideSearch.toLowerCase()) ||
      g.district.toLowerCase().includes(guideSearch.toLowerCase()) ||
      g.specialization.toLowerCase().includes(guideSearch.toLowerCase());
    return matchesLang && matchesSearch;
  });

  return (
    <section id="guides" className="py-20 bg-[#080C16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட உள்ளூர் வழிகாட்டிகள்' : 'Verified Local Community Network'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {t.guides.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              {t.guides.subtitle}
            </p>
          </div>

          {/* Search & Filter */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={guideSearch}
                onChange={(e) => setGuideSearch(e.target.value)}
                placeholder="Search guide by district..."
                className="glass-input pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm text-slate-200 focus:outline-none focus:border-amber-500"
              />
            </div>

            <select
              value={selectedLanguage}
              onChange={(e) => setSelectedLanguage(e.target.value)}
              className="glass-input px-3 py-2 rounded-xl text-xs sm:text-sm text-slate-200 cursor-pointer"
            >
              {languagesList.map(l => (
                <option key={l} value={l} className="bg-slate-900">{l === 'All' ? 'All Languages' : l}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Verification Guarantee Banner */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-900/30 via-emerald-900/20 to-slate-900/40 border border-blue-500/20 mb-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center shrink-0">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white">100% KYC & Tourism Department Verified</h4>
              <p className="text-xs text-slate-300">All guides undergo background checks, history validations, and emergency medical response training.</p>
            </div>
          </div>
          <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 whitespace-nowrap">
            Zero Middlemen • 100% Direct Payout
          </div>
        </div>

        {/* Guides Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredGuides.map((guide) => (
            <div 
              key={guide.id}
              className="glass-card p-6 rounded-2xl border border-white/10 flex flex-col justify-between hover:border-amber-500/40 group"
            >
              <div>
                {/* Avatar & Badges */}
                <div className="flex items-start gap-4 mb-4">
                  <div className="relative shrink-0">
                    <img 
                      src={guide.avatar} 
                      alt={guide.name}
                      className="w-16 h-16 rounded-2xl object-cover border-2 border-amber-400/50 shadow-md group-hover:scale-105 transition-transform"
                    />
                    <span className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 border-2 border-slate-900 flex items-center justify-center" title="Verified">
                      <CheckCircle className="w-3 h-3 text-white" />
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-white group-hover:text-amber-400 transition-colors truncate">
                        {guide.name}
                      </h3>
                      <div className="flex items-center gap-1 text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{guide.rating}</span>
                      </div>
                    </div>

                    <p className="text-xs font-semibold text-amber-300 truncate mt-0.5">
                      📍 {guide.district}
                    </p>

                    <span className="inline-block text-[10px] text-slate-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 mt-1 font-mono">
                      {guide.badge}
                    </span>
                  </div>
                </div>

                {/* Specialization */}
                <div className="mb-4">
                  <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                    Specialization:
                  </div>
                  <p className="text-xs text-slate-200 line-clamp-2 leading-relaxed">
                    {guide.specialization}
                  </p>
                </div>

                {/* Spoken Languages */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {guide.languages.map((l) => (
                    <span key={l} className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-white/5">
                      {l}
                    </span>
                  ))}
                </div>

                {/* Transport Vehicle Included */}
                {guide.transportIncluded && (
                  <div className="p-2.5 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs flex items-center gap-2 mb-4">
                    <Car className="w-4 h-4 shrink-0 text-blue-400" />
                    <span className="text-[11px] truncate">
                      {guide.transportVehicle}
                    </span>
                  </div>
                )}
              </div>

              {/* Fee & Action Button */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block">{t.guides.fee}</span>
                  <span className="text-base font-extrabold text-white">
                    ₹{guide.dailyRate.toLocaleString()}
                  </span>
                </div>

                <button
                  onClick={() => onOpenBookingModal(guide)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>{t.guides.bookBtn}</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
