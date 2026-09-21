import React, { useState, useEffect } from 'react';
import { 
  Compass, Globe, Sparkles, MapPin, Users, ShoppingBag, BarChart3, 
  Menu, X, ShieldCheck, Utensils, Calendar, Headphones, Home, ShieldAlert, Building2, MessageSquareHeart 
} from 'lucide-react';

export default function Navbar({ lang, setLang, t, onSearch, activeSection, cartCount, openCartModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: "#map-section", label: lang === 'ta' ? 'வரைபடம்' : 'TN Map', icon: MapPin },
    { href: "#explorer", label: t.nav.explore, icon: Compass },
    { href: "#festivals", label: t.nav.festivals, icon: Calendar },
    { href: "#food-trail", label: t.nav.foodTrail, icon: Utensils },
    { href: "#homestays", label: t.nav.homestays, icon: Home },
    { href: "#audio-stories", label: t.nav.audioStories, icon: Headphones },
    { href: "#ai-planner", label: t.nav.aiPlanner, icon: Sparkles, badge: "AI" },
    { href: "#guides", label: t.nav.guides, icon: Users },
    { href: "#sandhai", label: t.nav.sandhai, icon: ShoppingBag },
    { href: "#onboarding", label: t.nav.onboarding, icon: Building2 },
    { href: "#feedback", label: t.nav.feedback, icon: MessageSquareHeart },
    { href: "#safety", label: t.nav.safety, icon: ShieldAlert },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#080C16]/95 backdrop-blur-xl border-b border-white/10 shadow-2xl py-2.5' 
        : 'bg-gradient-to-b from-[#080C16]/90 to-transparent py-3.5'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Brand Logo */}
          <a href="#" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 via-rose-500 to-blue-600 flex items-center justify-center shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <span className="text-xl">🌍</span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-amber-400 via-rose-300 to-blue-400 bg-clip-text text-transparent font-display">
                  {t.brandName}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  OFFICIAL
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block truncate max-w-xs">
                {lang === 'ta' ? 'தமிழ்நாடு மாவட்ட ஒருங்கிணைந்த சுற்றுலா தளம்' : 'Integrated District Tourism Ecosystem'}
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-0.5 bg-slate-900/60 p-1 rounded-full border border-white/10 backdrop-blur-md">
            {navLinks.slice(0, 8).map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-all group whitespace-nowrap"
                >
                  <Icon className="w-3.5 h-3.5 text-amber-400 group-hover:scale-110 transition-transform" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-[8px] font-bold px-1.5 py-0.2 rounded-full animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Lang Switcher, Cart, Guide CTA */}
          <div className="flex items-center gap-2.5">
            
            {/* Language Switcher */}
            <button
              onClick={() => setLang(lang === 'en' ? 'ta' : 'en')}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-amber-300 transition-all hover:border-amber-500/40"
              title="Toggle English / தமிழ்"
            >
              <Globe className="w-3.5 h-3.5 text-amber-400" />
              <span>{lang === 'en' ? 'தமிழ்' : 'English'}</span>
            </button>

            {/* Cart / Inquiry Drawer Button */}
            <button
              onClick={openCartModal}
              className="relative p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all"
              title="Cart & Inquiries"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center animate-bounce">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Join Portal CTA */}
            <a
              href="#onboarding"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20 hover:scale-[1.02] transition-all"
            >
              <Building2 className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'இணையுங்கள்' : 'Join Network'}</span>
            </a>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-lg bg-white/5 text-slate-300 hover:text-white border border-white/10"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#0F172A]/95 border-b border-white/10 px-4 py-4 backdrop-blur-2xl animate-in slide-in-from-top duration-200 max-h-[80vh] overflow-y-auto">
          <div className="flex flex-col gap-1.5">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between px-3.5 py-2 rounded-lg text-xs text-slate-200 hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <Icon className="w-4 h-4 text-amber-400" />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="bg-blue-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}
