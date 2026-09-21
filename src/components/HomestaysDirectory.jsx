import React, { useState } from 'react';
import { Home, Star, MapPin, CheckCircle2, Phone, Calendar, Heart, ShieldCheck } from 'lucide-react';
import { homestaysData } from '../data/homestays';

export default function HomestaysDirectory({ t, lang }) {
  const [inquiredId, setInquiredId] = useState(null);

  const handleInquire = (id) => {
    setInquiredId(id);
    setTimeout(() => setInquiredId(null), 3000);
  };

  return (
    <section id="homestays" className="py-20 bg-[#060911] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Home className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'கிராமிய பண்ணை இல்லங்கள்' : 'Sustainable Rural Hospitality'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {lang === 'ta' ? 'பாரம்பரிய இல்லங்கள் & இயற்கை பண்ணை விடுதிகள்' : 'Eco-Resorts & Heritage Village Homestays'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              {lang === 'ta'
                ? 'நேரடியாக கிராமத்து குடும்பங்கள் மற்றும் இயற்கை விவசாயிகளுடன் தங்கி உண்மையான விருந்தோம்பலை உணருங்கள்.'
                : 'Stay with native host families, organic coffee planters, and Chettinad culinary historians with zero corporate commission.'}
            </p>
          </div>

          <div className="text-xs text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-2 rounded-xl">
            🌿 100% Eco-Certified & Village Community Run
          </div>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {homestaysData.map((stay) => (
            <div
              key={stay.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-emerald-500/40 transition-all"
            >
              <div className="relative h-44 overflow-hidden">
                <img
                  src={stay.image}
                  alt={stay.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{stay.district}</span>
                </div>

                <div className="absolute top-3 right-3 px-2 py-0.5 rounded-md bg-amber-500/20 backdrop-blur-md border border-amber-500/30 text-amber-300 text-[10px] font-extrabold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <span>{stay.rating}</span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors mb-0.5">
                    {stay.name}
                  </h3>
                  <p className="text-[11px] text-amber-300 mb-2 font-medium">
                    Host: {stay.host}
                  </p>
                  <p className="text-[10px] text-slate-400 mb-3">{stay.type}</p>

                  <div className="space-y-1 mb-4">
                    {stay.features.map((f, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-300">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[9px] text-slate-400 block">Per Night</span>
                    <span className="text-sm font-bold text-white">₹{stay.pricePerNight.toLocaleString()}</span>
                  </div>

                  <button
                    onClick={() => handleInquire(stay.id)}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold transition-all shadow-md"
                  >
                    {inquiredId === stay.id ? 'Request Sent!' : 'Check Dates'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
