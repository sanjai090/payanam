import React, { useState } from 'react';
import { 
  MapPin, Compass, Eye, Users, Calendar, Sparkles, Filter, Navigation, 
  ExternalLink, ArrowUpRight, CheckCircle2, AlertCircle, Award, Landmark, Trees, Wheat 
} from 'lucide-react';
import { zones, categoriesList } from '../data/districts';

export default function DistrictExplorer({ 
  districts, 
  t, 
  lang, 
  onOpen360, 
  onSelectGemForGuide, 
  onOpenGemDetails 
}) {
  const [selectedZone, setSelectedZone] = useState('All Tamil Nadu Zones');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  const filteredDistricts = districts.filter(item => {
    const matchesZone = selectedZone === 'All Tamil Nadu Zones' || item.zone === selectedZone;
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchFilter === '' || 
      item.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.district.toLowerCase().includes(searchFilter.toLowerCase()) ||
      item.highlights.some(h => h.toLowerCase().includes(searchFilter.toLowerCase()));
    return matchesZone && matchesCategory && matchesSearch;
  });

  const getCrowdBadge = (crowdIndex) => {
    if (crowdIndex <= 25) {
      return {
        text: lang === 'ta' ? 'அரிய அமைதியான இடம் (குறைந்த கூட்டம்)' : 'Hidden Gem (Low Footfall)',
        bg: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
        dot: 'bg-emerald-400'
      };
    } else if (crowdIndex <= 45) {
      return {
        text: lang === 'ta' ? 'நடுத்தர கூட்டம்' : 'Moderate Crowd',
        bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
        dot: 'bg-amber-400'
      };
    } else {
      return {
        text: lang === 'ta' ? 'அதிக கூட்டம்' : 'Popular Hotspot',
        bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
        dot: 'bg-rose-400'
      };
    }
  };

  return (
    <section id="explorer" className="py-20 bg-[#080C16] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Compass className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'தமிழ்நாடு சுற்றுலா வரைபடம்' : 'District Discovery Engine'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {t.explorer.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              {t.explorer.subtitle}
            </p>
          </div>

          {/* Quick Zone Filter Dropdown */}
          <div className="flex items-center gap-3">
            <Filter className="w-4 h-4 text-amber-400 shrink-0" />
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="glass-input text-xs sm:text-sm text-slate-200 py-2.5 px-4 rounded-xl cursor-pointer focus:ring-1 focus:ring-amber-500"
            >
              {zones.map((zone) => (
                <option key={zone} value={zone} className="bg-slate-900 text-slate-200">
                  {zone}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categoriesList.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected 
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 scale-105' 
                    : 'bg-slate-900/80 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
                }`}
              >
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Districts Grid */}
        {filteredDistricts.length === 0 ? (
          <div className="glass-card p-12 text-center rounded-2xl border border-white/5">
            <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-white mb-1">No destinations match this filter</h3>
            <p className="text-sm text-slate-400">Try changing the zone or category filter to explore other gems.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredDistricts.map((item) => {
              const crowdBadge = getCrowdBadge(item.crowdIndex);
              return (
                <div 
                  key={item.id}
                  className="glass-card rounded-2xl overflow-hidden group flex flex-col justify-between border border-white/10 hover:border-amber-500/40"
                >
                  {/* Image Container with Badges */}
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 brightness-95 group-hover:brightness-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-black/40" />

                    {/* District & Zone Tag */}
                    <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-rose-400" />
                        {item.district}
                      </span>
                    </div>

                    {/* 360° Panorama Button */}
                    <button
                      onClick={() => onOpen360(item)}
                      className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-blue-600/80 hover:bg-blue-500 backdrop-blur-md text-[11px] font-bold text-white border border-white/20 flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105"
                      title="Launch 360° Virtual Preview"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>360° Preview</span>
                    </button>

                    {/* Crowd Index Badge */}
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1.5 backdrop-blur-md ${crowdBadge.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${crowdBadge.dot} animate-pulse`} />
                        {crowdBadge.text}
                      </span>
                      <span className="text-[11px] font-semibold text-slate-300 bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm">
                        Footfall: {item.crowdIndex}%
                      </span>
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors font-display mb-1.5">
                        {item.name}
                      </h3>
                      
                      <p className="text-xs text-amber-300 font-medium mb-3 line-clamp-1 italic">
                        "{item.tagline}"
                      </p>

                      <p className="text-xs text-slate-300 line-clamp-3 mb-4 leading-relaxed">
                        {item.description}
                      </p>

                      {/* Highlights */}
                      <div className="space-y-1.5 mb-4">
                        <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                          Key Experiences:
                        </div>
                        {item.highlights.slice(0, 3).map((hl, idx) => (
                          <div key={idx} className="flex items-start gap-1.5 text-xs text-slate-300">
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                            <span className="line-clamp-1">{hl}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Footer Info & Actions */}
                    <div className="pt-4 border-t border-white/10 mt-auto">
                      <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3 text-amber-400" />
                          {item.bestSeason}
                        </span>
                        <span className="text-slate-300 font-medium bg-white/5 px-2 py-0.5 rounded">
                          {item.idealStay}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <button
                          onClick={() => onOpenGemDetails(item)}
                          className="px-3 py-2 rounded-xl bg-white/5 hover:bg-white/15 border border-white/10 text-xs font-semibold text-slate-200 hover:text-white flex items-center justify-center gap-1 transition-all"
                        >
                          <span>Full Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
                        </button>

                        <button
                          onClick={() => onSelectGemForGuide(item)}
                          className="px-3 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center justify-center gap-1 shadow-md shadow-amber-500/20 transition-all hover:scale-[1.02]"
                        >
                          <Users className="w-3.5 h-3.5" />
                          <span>Book Guide</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
