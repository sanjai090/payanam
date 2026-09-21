import React from 'react';
import { Utensils, MapPin, Sparkles, Coffee, DollarSign, Store, Check } from 'lucide-react';
import { foodTrailData } from '../data/foodTrail';

export default function FoodTrail({ t, lang }) {
  return (
    <section id="food-trail" className="py-20 bg-[#090D18] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Utensils className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'பாரம்பரிய உணவு மரபு' : 'District Culinary Heritage'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {lang === 'ta' ? 'தமிழக மாவட்டங்களின் உணவுச் சுவடுகள்' : 'The Taste of Tamil Nadu: District Food Trails'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {lang === 'ta'
              ? 'செட்டிநாட்டு தலைவாழை விருந்து முதல் திருநெல்வேலி இருட்டுக்கடை அல்வா வரை - உண்மைச் சுவைகளின் பயணம்.'
              : 'From 18-dish Chettinad feasts to slow-brewed Kumbakonam degree coffee and Iruttu Kadai Halwa.'}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {foodTrailData.map((item) => (
            <div
              key={item.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between group hover:border-rose-500/40 transition-all"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 text-[11px] font-bold text-white flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{item.district}</span>
                </div>

                <div className="absolute bottom-3 left-3 right-3">
                  <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                    {lang === 'ta' ? item.nameTamil : item.name}
                  </h3>
                  <span className="text-[10px] text-amber-300 font-semibold">{item.type}</span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                    {item.description}
                  </p>

                  {/* Must Try */}
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5 mb-4">
                    <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">
                      ⭐ Iconic Dish / Must-Try:
                    </span>
                    <p className="text-xs font-semibold text-white">{item.mustTry}</p>
                  </div>

                  {/* Legendary Mess Spots */}
                  <div className="mb-4">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5 flex items-center gap-1">
                      <Store className="w-3 h-3 text-emerald-400" />
                      <span>Authentic Eateries & Heritage Mess:</span>
                    </span>
                    <ul className="space-y-1">
                      {item.topSpots.map((spot, idx) => (
                        <li key={idx} className="text-xs text-slate-300 flex items-center gap-1.5">
                          <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                          <span>{spot}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-slate-400">Avg Cost:</span>
                  <span className="font-bold text-emerald-400">{item.priceRange}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
