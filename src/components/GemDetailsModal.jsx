import React from 'react';
import { 
  X, MapPin, Eye, Calendar, Clock, Navigation, 
  Utensils, Users, CheckCircle2, ShieldCheck, ArrowRight, Share2, Compass 
} from 'lucide-react';

export default function GemDetailsModal({ gem, onClose, onOpen360, onBookGuide }) {
  if (!gem) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Hero Image */}
        <div className="relative h-64 sm:h-80 shrink-0">
          <img src={gem.image} alt={gem.name} className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-black/40 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* 360 Action */}
          <button
            onClick={() => {
              onClose();
              onOpen360(gem);
            }}
            className="absolute top-4 left-4 px-3.5 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-lg backdrop-blur-md transition-transform hover:scale-105"
          >
            <Eye className="w-4 h-4" />
            <span>Launch 360° Virtual Preview</span>
          </button>

          {/* Headline on Image */}
          <div className="absolute bottom-4 left-6 right-6">
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold">
                {gem.district} District
              </span>
              <span className="text-xs text-slate-300 font-semibold bg-black/60 px-2 py-0.5 rounded">
                Footfall Index: {gem.crowdIndex}%
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
              {gem.name}
            </h2>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-300 text-xs sm:text-sm leading-relaxed">
          
          <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-300 font-medium italic">
            "{gem.tagline}"
          </div>

          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Overview & Heritage</h3>
            <p className="text-slate-300 leading-relaxed">
              {gem.description}
            </p>
          </div>

          {/* Highlights */}
          <div>
            <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-2">Must-Do Experiences</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {gem.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span className="text-slate-200 text-xs">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Travel Logistics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[11px] text-amber-400 font-bold uppercase mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>Best Season</span>
              </div>
              <p className="text-xs text-white font-medium">{gem.bestSeason}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[11px] text-blue-400 font-bold uppercase mb-1 flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5" />
                <span>Transit Hub</span>
              </div>
              <p className="text-xs text-white font-medium">{gem.connectivity}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/5">
              <div className="text-[11px] text-rose-400 font-bold uppercase mb-1 flex items-center gap-1">
                <Utensils className="w-3.5 h-3.5" />
                <span>Local Culinary Pride</span>
              </div>
              <p className="text-xs text-white font-medium">{gem.foodSpecialty}</p>
            </div>
          </div>

        </div>

        {/* Footer CTAs */}
        <div className="p-4 bg-slate-950/80 border-t border-white/10 flex items-center justify-between gap-3">
          <button
            onClick={() => {
              onClose();
              onOpen360(gem);
            }}
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-colors"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            <span>Virtual 360°</span>
          </button>

          <button
            onClick={() => {
              onClose();
              onBookGuide(gem);
            }}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center gap-1.5 transition-transform hover:scale-105"
          >
            <Users className="w-4 h-4" />
            <span>Connect with Local Guide</span>
          </button>
        </div>

      </div>
    </div>
  );
}
