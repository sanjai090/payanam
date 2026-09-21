import React, { useState } from 'react';
import { Calendar, Sparkles, MapPin, Users, Award, Music, Flame, Filter } from 'lucide-react';
import { festivalsData } from '../data/festivals';

export default function FestivalsCalendar({ t, lang }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ["All", "Folk Sport", "Temple & Cultural", "Classical Performing", "Tribal & Nature", "Culinary"];

  const filteredFestivals = festivalsData.filter(f => {
    if (selectedCategory === 'All') return true;
    return f.category.toLowerCase().includes(selectedCategory.toLowerCase());
  });

  return (
    <section id="festivals" className="py-20 bg-[#070B14] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'கலாச்சார திருவிழாக்கள்' : 'Tamil Nadu Cultural Heritage'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {lang === 'ta' ? 'பாரம்பரிய திருவிழாக்கள் & நாட்டுப்புற கலைகள்' : 'District Festivals & Living Traditions'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              {lang === 'ta'
                ? 'ஜல்லிக்கட்டு முதல் நாட்டியாஞ்சலி வரை, தமிழரின் 2000 ஆண்டுகால கலை மற்றும் திருவிழாக்களை அனுபவியுங்கள்.'
                : 'Experience the pulsating soul of Tamil Nadu through living folk sports, classical dance under Chola Vimanas, and harvest rituals.'}
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCategory(c)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedCategory === c
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-white/5 text-slate-300 hover:text-white border border-white/5'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredFestivals.map((fest) => (
            <div
              key={fest.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-amber-500/40 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={fest.image}
                  alt={fest.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-black/40 to-transparent" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{fest.district} District</span>
                </div>

                <div className="absolute top-3 right-3 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{fest.month}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                    {lang === 'ta' ? fest.nameTamil : fest.name}
                  </h3>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                    {fest.description}
                  </p>

                  {/* Art Forms */}
                  <div className="mb-4">
                    <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <Music className="w-3 h-3" />
                      <span>Folk Performances & Rituals:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {fest.artForms.map((af, i) => (
                        <span key={i} className="text-[10px] bg-white/5 border border-white/10 text-slate-200 px-2 py-0.5 rounded-full">
                          {af}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-blue-400" />
                    <span>{fest.attendance}</span>
                  </span>

                  <a
                    href="#guides"
                    className="text-amber-400 hover:text-amber-300 font-bold hover:underline"
                  >
                    Find Cultural Guide →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
