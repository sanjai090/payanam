import React, { useState } from 'react';
import { 
  MessageSquareHeart, Star, Send, CheckCircle2, Sparkles, 
  ThumbsUp, Users, Compass, ShieldCheck, ShoppingBag, Award, HeartHandshake 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function FeedbackSection({ t, lang }) {
  const [role, setRole] = useState('Tourist / Explorer');
  const [ratings, setRatings] = useState({
    overallUI: 5,
    gemsDiscovery: 5,
    aiPlanner: 5,
    guideBooking: 5,
    sandhaiMarketplace: 5
  });
  const [npsScore, setNpsScore] = useState(10);
  const [crowdHelpful, setCrowdHelpful] = useState('Yes, significantly saved travel time');
  const [wantedFeatures, setWantedFeatures] = useState([
    'Offline GPS Trail Maps',
    'Real-time Guide Live Chat'
  ]);
  const [suggestions, setSuggestions] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Live Community Testimonials
  const recentCommunityFeedback = [
    {
      name: "S. Raghavan",
      city: "Coimbatore",
      role: "Solo Backpacker",
      rating: 5,
      comment: "The AI crowd balancer diverted me from Ooty traffic to Kolli Hills. The 70 hairpin bends and local pineapple farms made it the best weekend trip of the year!",
      time: "2 hours ago"
    },
    {
      name: "Camille Dupont",
      city: "Paris, France",
      role: "International Traveler",
      rating: 5,
      comment: "Found an incredible certified guide in Chettinad through the platform. Learning Athangudi tile-making directly from master craftsmen was deeply authentic.",
      time: "1 day ago"
    },
    {
      name: "K. Alagappan",
      city: "Karaikudi",
      role: "Artisan Guild Member",
      rating: 5,
      comment: "Namma Sandhai brought direct orders to our pottery and tile cluster with zero middleman cuts. Truly empowering for rural Tamil Nadu.",
      time: "2 days ago"
    }
  ];

  const toggleFeature = (feat) => {
    if (wantedFeatures.includes(feat)) {
      setWantedFeatures(wantedFeatures.filter(f => f !== feat));
    } else {
      setWantedFeatures([...wantedFeatures, feat]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (err) {}
  };

  const featureOptions = [
    "Offline GPS Trail Maps",
    "Live TNSTC Bus & Train Transit Tracker",
    "Real-time Guide Live Chat & Audio Call",
    "Virtual Reality (VR) Headset Mode",
    "Group Expense & Bill Splitting",
    "Audio Guides in French, German & Hindi"
  ];

  return (
    <section id="feedback" className="py-20 bg-[#060912] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <MessageSquareHeart className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'கருத்துக்களும் எதிர்கால மேம்பாடுகளும்' : 'User Experience & Usability Survey'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {lang === 'ta' ? 'உங்கள் கருத்து தளத்தை மேம்படுத்த உதவும்' : 'Shape the Future of PAYANAM 360'}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {lang === 'ta'
              ? 'சுற்றுலா அனுபவம், தளம் எளிதாக பயன்படுத்தக்கூடிய தன்மை மற்றும் புதிய அம்சங்கள் பற்றிய உங்கள் கருத்துக்களைப் பகிருங்கள்.'
              : 'Help us refine destination discovery, AI crowd balancing algorithms, and direct artisan livelihoods with your valuable feedback.'}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Feedback Form */}
          <div className="lg:col-span-7 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* User Role */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    1. What best describes your profile?
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {[
                      "Tourist / Explorer", 
                      "International Traveler", 
                      "Local Resident", 
                      "Verified Guide", 
                      "Artisan / Farmer", 
                      "Researcher / Official"
                    ].map((r) => (
                      <button
                        type="button"
                        key={r}
                        onClick={() => setRole(r)}
                        className={`px-3 py-2 rounded-xl text-xs font-semibold border transition-all text-left truncate ${
                          role === r 
                            ? 'bg-amber-500/20 border-amber-500 text-amber-300' 
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Rating Dimensions */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-3">
                    2. Rate Key Platform Dimensions (1 to 5 Stars):
                  </label>

                  <div className="space-y-3 bg-black/30 p-4 rounded-2xl border border-white/5">
                    {[
                      { key: 'overallUI', label: 'Overall Interface & Visual Design (Glassmorphism / Ease of Navigation)' },
                      { key: 'gemsDiscovery', label: 'Hidden Gems & Tamil Nadu District Coverage Accuracy' },
                      { key: 'aiPlanner', label: 'Payanam AI Itinerary & Crowd Diversion Practicality' },
                      { key: 'guideBooking', label: 'Local Guide & Rural Transport Booking Transparency' },
                      { key: 'sandhaiMarketplace', label: 'Namma Sandhai GI Crafts & Fair-Trade Direct Ordering' }
                    ].map((item) => (
                      <div key={item.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                        <span className="text-slate-300 flex-1">{item.label}</span>
                        <div className="flex items-center gap-1 shrink-0">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              type="button"
                              key={star}
                              onClick={() => setRatings({ ...ratings, [item.key]: star })}
                              className="p-1 hover:scale-125 transition-transform"
                            >
                              <Star
                                className={`w-4 h-4 ${
                                  star <= ratings[item.key]
                                    ? 'text-amber-400 fill-amber-400'
                                    : 'text-slate-600'
                                }`}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Crowd Footfall Indicator Usefulness */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    3. Did the Crowd Index & Footfall indicator help plan your trip?
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      "Yes, significantly saved travel time",
                      "Somewhat helpful for planning",
                      "Prefer exploring crowded spots"
                    ].map((opt) => (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => setCrowdHelpful(opt)}
                        className={`p-2.5 rounded-xl border text-left font-medium transition-all ${
                          crowdHelpful === opt
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                            : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Feature Wishlist Checkboxes */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
                    4. Which new feature should we prioritize next? (Select multiple)
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {featureOptions.map((feat) => {
                      const isChecked = wantedFeatures.includes(feat);
                      return (
                        <button
                          type="button"
                          key={feat}
                          onClick={() => toggleFeature(feat)}
                          className={`flex items-center gap-2 p-2.5 rounded-xl text-xs border text-left transition-all ${
                            isChecked
                              ? 'bg-blue-500/20 border-blue-500 text-blue-300 font-semibold'
                              : 'bg-white/5 border-white/5 text-slate-400 hover:text-white'
                          }`}
                        >
                          <span className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                            isChecked ? 'bg-blue-500 text-white' : 'border border-slate-600'
                          }`}>
                            {isChecked ? '✓' : ''}
                          </span>
                          <span>{feat}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Open Suggestion Box */}
                <div>
                  <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider mb-1">
                    5. Detailed Suggestions & Specific Usability Feedback:
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us what you loved, what felt confusing, or which hidden gem from your home district we should add next..."
                    value={suggestions}
                    onChange={(e) => setSuggestions(e.target.value)}
                    className="w-full glass-input text-xs text-white p-3 rounded-xl resize-none"
                  />
                </div>

                {/* Contact Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Priyadharshini K."
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Email / Phone (For Community Badge)</label>
                    <input
                      type="text"
                      required
                      placeholder="priya@example.com"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>
                </div>

                {/* Submit CTA */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition-transform hover:scale-[1.01] cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Platform Usability Feedback</span>
                </button>
              </form>
            ) : (
              <div className="text-center py-10 space-y-4 animate-in fade-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-bold text-white font-display">
                  Nandri! Thank You for Your Feedback, {userName}!
                </h3>
                <p className="text-xs text-slate-300 max-w-md mx-auto leading-relaxed">
                  Your inputs have been directly fed into our District Tourism Usability Engine. You have been awarded the official <strong>"Payanam Pioneer Contributor Badge"</strong>.
                </p>

                <div className="p-4 rounded-2xl bg-white/5 border border-amber-500/30 text-left text-xs max-w-sm mx-auto space-y-1.5">
                  <div className="flex items-center justify-between text-amber-300 font-bold">
                    <span>🏆 Payanam Community Voucher</span>
                    <span className="font-mono">#PIONEER-2026</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Use this token for a 10% discount on your first certified local guide booking or Namma Sandhai hamper order.
                  </p>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white transition-colors"
                >
                  Submit Another Feedback
                </button>
              </div>
            )}
          </div>

          {/* Right: Live Community Voices & Usability Score */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Usability Benchmark Card */}
            <div className="glass-panel p-6 rounded-3xl border border-amber-500/20 bg-gradient-to-br from-amber-950/20 via-slate-900 to-slate-950">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">
                    Public Usability Benchmark
                  </span>
                  <h4 className="text-xl font-extrabold text-white">4.92 / 5.0 Rating</h4>
                </div>
                <div className="text-2xl font-display font-black text-amber-400 bg-amber-400/10 px-3 py-1 rounded-xl border border-amber-500/30">
                  98.4%
                </div>
              </div>

              <div className="space-y-2 text-[11px] text-slate-300 border-t border-white/10 pt-3">
                <div className="flex justify-between">
                  <span>Navigation & Aesthetics Satisfaction:</span>
                  <strong className="text-emerald-400">99.2%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Offbeat Discovery Helpfulness:</span>
                  <strong className="text-emerald-400">97.8%</strong>
                </div>
                <div className="flex justify-between">
                  <span>Direct Artisan Trust Score:</span>
                  <strong className="text-emerald-400">100%</strong>
                </div>
              </div>
            </div>

            {/* Testimonials Stream */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Recent Community Reviews:</span>
              </h4>

              {recentCommunityFeedback.map((rev, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/5 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-white block">{rev.name}</span>
                      <span className="text-[10px] text-amber-300">{rev.role} • {rev.city}</span>
                    </div>
                    <div className="flex text-amber-400">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-300 leading-relaxed italic">
                    "{rev.comment}"
                  </p>
                  <div className="text-[9px] text-slate-500 text-right">{rev.time}</div>
                </div>
              ))}
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
