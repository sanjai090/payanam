import React from 'react';
import { Compass, ShieldCheck, Heart, ExternalLink, MapPin, Award } from 'lucide-react';

export default function Footer({ t, lang }) {
  return (
    <footer className="bg-[#05080F] border-t border-white/10 pt-16 pb-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-blue-600 flex items-center justify-center text-xl shadow-lg">
                🌍
              </div>
              <span className="text-xl font-extrabold text-white font-display">
                {t.brandName}
              </span>
            </div>
            <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
              {t.subTagline}
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 text-[11px] text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              <span>Tamil Nadu Integrated District Tourism & Rural Development Platform</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'ta' ? 'வழிசெலுத்தல்' : 'Navigation & Services'}
            </h4>
            <ul className="space-y-2">
              <li><a href="#map-section" className="hover:text-amber-400 transition-colors">Interactive TN Map</a></li>
              <li><a href="#explorer" className="hover:text-amber-400 transition-colors">District Explorer</a></li>
              <li><a href="#festivals" className="hover:text-amber-400 transition-colors">Culture & Festivals</a></li>
              <li><a href="#food-trail" className="hover:text-amber-400 transition-colors">District Food Trails</a></li>
              <li><a href="#homestays" className="hover:text-amber-400 transition-colors">Eco-Stays & Homestays</a></li>
              <li><a href="#audio-stories" className="hover:text-amber-400 transition-colors">Audio Stories</a></li>
              <li><a href="#ai-planner" className="hover:text-amber-400 transition-colors">Payanam AI Itinerary</a></li>
              <li><a href="#guides" className="hover:text-amber-400 transition-colors">Verified Local Guides</a></li>
              <li><a href="#sandhai" className="hover:text-amber-400 transition-colors">Namma Sandhai (GI Crafts)</a></li>
              <li><a href="#onboarding" className="hover:text-amber-400 transition-colors">Join Ecosystem Portal</a></li>
              <li><a href="#feedback" className="hover:text-amber-400 transition-colors">User Experience & Usability Feedback</a></li>
              <li><a href="#safety" className="hover:text-amber-400 transition-colors">Safety & Emergency SOS</a></li>
            </ul>
          </div>

          {/* District Clusters */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider">
              {lang === 'ta' ? 'முக்கிய மண்டலங்கள்' : 'Ecosystem Clusters'}
            </h4>
            <ul className="space-y-2">
              <li><span className="text-slate-300">Kongu Nadu</span> (Namakkal, Coimbatore, Nilgiris, Salem)</li>
              <li><span className="text-slate-300">Cauvery Delta</span> (Thanjavur, Ariyalur, Trichy, Pudukkottai)</li>
              <li><span className="text-slate-300">Pandya Nadu</span> (Sivaganga, Madurai, Tirunelveli, Tenkasi)</li>
              <li><span className="text-slate-300">Cauvery Coastal</span> (Cuddalore, Nagapattinam, Mayiladuthurai)</li>
              <li><span className="text-slate-300">North Western</span> (Dharmapuri, Krishnagiri, Tiruvannamalai)</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © 2026 PAYANAM 360 Ecosystem. All Rights Reserved.
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Powered by Tamil Nadu Tourism & Rural MSME Development Initiatives</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
