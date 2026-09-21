import React, { useState } from 'react';
import { UserCheck, ShieldCheck, ShoppingBag, Home, CheckCircle2, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function OnboardingPortal({ t, lang }) {
  const [activeTab, setActiveTab] = useState('guide'); // 'guide', 'artisan', 'host'
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState('');
  const [district, setDistrict] = useState('Namakkal');
  const [contact, setContact] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const resetForm = () => {
    setSubmitted(false);
    setName('');
    setContact('');
    setDetails('');
  };

  return (
    <section id="onboarding" className="py-20 bg-[#070B14] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'சுற்றுலா சூழலமைப்பில் இணையுங்கள்' : 'Ecosystem Onboarding Portal'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {lang === 'ta' ? 'உள்ளூர் வழிகாட்டி / கைவினைஞராக இணையுங்கள்' : 'Empower Your Community: Join PAYANAM 360'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {lang === 'ta'
              ? 'சுற்றுலா வழிகாட்டிகள், கைவினை கலைஞர்கள் மற்றும் கிராமிய பண்ணை இல்ல உரிமையாளர்கள் இலவசமாக இணையலாம்.'
              : 'Direct digital enrollment for local guides, rural artisans, GI-craft guilds, and village homestay hosts.'}
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center mb-10">
          <div className="bg-slate-900 p-1.5 rounded-2xl border border-white/10 flex gap-1 sm:gap-2">
            <button
              onClick={() => { setActiveTab('guide'); resetForm(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'guide' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>{lang === 'ta' ? 'உள்ளூர் வழிகாட்டி' : 'Local Guide Registration'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('artisan'); resetForm(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'artisan' ? 'bg-rose-500 text-white shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{lang === 'ta' ? 'கைவினைஞர் / விவசாயி' : 'Artisan / MSME Seller'}</span>
            </button>

            <button
              onClick={() => { setActiveTab('host'); resetForm(); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'host' ? 'bg-emerald-500 text-slate-950 shadow-md' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>{lang === 'ta' ? 'பண்ணை இல்லம்' : 'Homestay Host'}</span>
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-2xl mx-auto glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {activeTab === 'guide' ? 'Guide Full Name' : activeTab === 'artisan' ? 'Artisan / Guild Name' : 'Host / Property Name'}
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. K. Arulmozhi"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full glass-input text-xs text-white p-3 rounded-xl"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Primary District</label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full glass-input text-xs text-white p-3 rounded-xl bg-slate-900"
                  >
                    <option>Namakkal</option>
                    <option>Sivaganga (Chettinad)</option>
                    <option>Coimbatore</option>
                    <option>Tirunelveli</option>
                    <option>Pudukkottai</option>
                    <option>Cuddalore</option>
                    <option>Thanjavur</option>
                    <option>Madurai</option>
                    <option>Nilgiris</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98400 12345"
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="w-full glass-input text-xs text-white p-3 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {activeTab === 'guide' ? 'Languages Spoken & Tourism Experience' : activeTab === 'artisan' ? 'Craft Specialization & GI Details' : 'Homestay Amenities & Capacity'}
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="Provide a brief description of your expertise or village specialty..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full glass-input text-xs text-white p-3 rounded-xl resize-none"
                />
              </div>

              <div className="p-3.5 rounded-xl bg-white/5 border border-white/5 text-[11px] text-slate-300 space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Zero Registration Fee • Direct Tourism Department Verification</span>
                </div>
                <p className="text-slate-400">Your profile will be verified by district tourism nodal officers within 48 hours.</p>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.01] cursor-pointer"
              >
                Submit Digital Verification Request
              </button>
            </form>
          ) : (
            <div className="text-center py-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h4 className="text-lg font-bold text-white">Enrollment Request Received, {name}!</h4>
              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto">
                Your application for <strong>{district} District</strong> has been registered under Application Token <span className="font-mono text-emerald-400 font-bold">#TN-ECO-2026-9921</span>. Our district coordinator will reach out to <strong>{contact}</strong>.
              </p>
              <button
                onClick={resetForm}
                className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
              >
                Submit Another Application
              </button>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
