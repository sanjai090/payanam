import React from 'react';
import { ShieldAlert, PhoneCall, HeartPulse, Compass, AlertTriangle, ShieldCheck, LifeBuoy } from 'lucide-react';

export default function SafetySOS({ t, lang }) {
  const emergencyNumbers = [
    { label: "Tourist Police Assistance", number: "1363", icon: "👮‍♂️", sub: "Toll-Free 24/7" },
    { label: "Emergency Disaster Helpline", number: "1077", icon: "🚨", sub: "District Collectorate" },
    { label: "Medical & Ambulance SOS", number: "108", icon: "🚑", sub: "Tamil Nadu EMS" },
    { label: "Women Tourist Safety", number: "1091", icon: "🛡️", sub: "Immediate Response" },
    { label: "Forest & Wildlife SOS", number: "1926", icon: "🌲", sub: "TN Forest Department" },
    { label: "Ghat Road Breakdown SOS", number: "1033", icon: "🚗", sub: "National & State Highway" }
  ];

  return (
    <section id="safety" className="py-20 bg-[#05080F] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'பாதுகாப்பு & அவசர உதவி மையம்' : 'Tourist Safety & Emergency Response'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {lang === 'ta' ? '24/7 சுற்றுலா அவசர உதவி & பாதுகாப்பு வழிகாட்டி' : 'Safe Travel & Emergency Assistance Hub'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {lang === 'ta'
              ? 'மலைப்பாதை பயணம், வன அனுமதி மற்றும் உடனடி அவசர எண்களுடன் பாதுகாப்பான சுற்றுலா.'
              : 'Direct hotlines to Tourist Police, District Disaster Centers, Forest Rangers, and Ghat Road Breakdown units.'}
          </p>
        </div>

        {/* Emergency Helplines Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {emergencyNumbers.map((item, idx) => (
            <div
              key={idx}
              className="glass-card p-4 rounded-2xl border border-rose-500/20 text-center flex flex-col justify-between hover:border-rose-500/50 transition-all group"
            >
              <div className="text-2xl mb-1">{item.icon}</div>
              <div>
                <div className="text-xs font-bold text-white mb-0.5">{item.label}</div>
                <div className="text-[10px] text-slate-400 mb-2">{item.sub}</div>
              </div>
              <a
                href={`tel:${item.number}`}
                className="py-1.5 px-2 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 font-extrabold text-sm font-mono border border-rose-500/30 flex items-center justify-center gap-1 group-hover:scale-105 transition-transform"
              >
                <PhoneCall className="w-3 h-3" />
                <span>{item.number}</span>
              </a>
            </div>
          ))}
        </div>

        {/* Ghat Roads & Eco Travel Guidelines */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-1">Ghat Road Safe Driving Advisory</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Use lower gears (1st / 2nd) while descending hairpin bends (Kolli Hills 70 bends / Valparai 40 bends). Avoid night driving in heavy mist.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/20 text-emerald-400 shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-1">Zero-Plastic & Biosphere Code</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                All Western Ghats and Coastal Mangrove biospheres are strict zero-plastic zones. Carry refillable copper/steel canisters.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 shrink-0">
              <LifeBuoy className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white mb-1">Forest Entry Permits</h4>
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Manjolai & Kalakkad Tiger Reserve require advance checkpost logging through verified guides before 3:00 PM daily.
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
