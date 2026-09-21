import React from 'react';
import { 
  BarChart3, TrendingUp, Users, ShoppingBag, ShieldCheck, 
  Map, Award, ArrowUpRight, CheckCircle2, Leaf, HeartHandshake 
} from 'lucide-react';

export default function ImpactDashboard({ t, lang }) {
  const impactCards = [
    {
      title: lang === 'ta' ? 'கிராமப்புற வருவாய் அதிகரிப்பு' : 'Direct Rural Economic Inflow',
      value: '₹3.42 Cr',
      change: '+142% Year-on-Year',
      desc: 'Channelled directly to rural guides, homestays, and self-help artisan clusters across 38 districts.',
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: lang === 'ta' ? 'சுற்றுலாப் பகிர்வு குறியீடு' : 'Tourist Footfall Dispersal',
      value: '64.8%',
      change: 'Diverted from Overcrowded Hubs',
      desc: 'Tourists successfully redirected from high-stress nodes (Ooty/Kodaikanal) to high-capacity hidden gems.',
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/20'
    },
    {
      title: lang === 'ta' ? 'ஆதரிக்கப்பட்ட MSME & கைவினைஞர்கள்' : 'Artisans & MSMEs Supported',
      value: '840+',
      change: '16 GI Tag Guilds',
      desc: 'Native craft clusters onboarded with zero intermediate commission through Namma Sandhai.',
      color: 'text-rose-400',
      bg: 'bg-rose-500/10 border-rose-500/20'
    },
    {
      title: lang === 'ta' ? 'அங்கீகரிக்கப்பட்ட உள்ளூர் வழிகாட்டிகள்' : 'Certified Local Guide Livelihoods',
      value: '450+',
      change: '100% KYC Verified',
      desc: 'Full-time employment generation for youth, historians, and tribal community naturalists.',
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    }
  ];

  return (
    <section id="impact" className="py-20 bg-[#080C16] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Tamil Nadu Sustainable Tourism Metrics</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {t.impact.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {t.impact.subtitle}
          </p>
        </div>

        {/* 4 Big Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {impactCards.map((card, idx) => (
            <div 
              key={idx}
              className={`p-6 rounded-3xl border glass-panel flex flex-col justify-between ${card.bg}`}
            >
              <div>
                <span className="text-xs font-semibold text-slate-300 block mb-2">{card.title}</span>
                <div className={`text-3xl sm:text-4xl font-extrabold font-display mb-1 ${card.color}`}>
                  {card.value}
                </div>
                <div className="text-xs font-bold text-slate-200 mb-3 flex items-center gap-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{card.change}</span>
                </div>
              </div>
              <p className="text-[11px] text-slate-400 leading-relaxed border-t border-white/5 pt-3">
                {card.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Sustainable Innovation Pillars */}
        <div className="glass-panel p-8 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-amber-500/20 text-amber-400 shrink-0">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Local Economic Multiplier</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Rather than staying in enclosed luxury chains, tourism expenditures recirculate within district farmers, village transports, and pottery guilds.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Ecological Footprint Mitigation</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Spreading vehicular and foot traffic prevents ecological stress on sensitive Western Ghats biosphere hotspots and reduces waste density.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="p-3 rounded-2xl bg-blue-500/20 text-blue-400 shrink-0">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white mb-1">Preservation of Intangible Heritage</h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                Revitalizes dying crafts like Pattamadai Korai grass weaving and Swamimalai lost-wax metal casting by connecting artisans directly to modern buyers.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
