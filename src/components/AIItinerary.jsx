import React, { useState } from 'react';
import { 
  Sparkles, Bot, Calendar, Compass, MapPin, DollarSign, Clock, 
  ShieldAlert, CheckCircle, ArrowRight, Share2, Download, RefreshCw, Users, Utensils, Award
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function AIItinerary({ t, lang, onSelectGuideForItinerary }) {
  const [startCity, setStartCity] = useState('Chennai');
  const [days, setDays] = useState(3);
  const [budgetTier, setBudgetTier] = useState('Moderate (₹3,000/day)');
  const [interest, setInterest] = useState('Offbeat Nature & Eco-Trails');
  const [vibe, setVibe] = useState('Offbeat Explorer & Cultural Immersion');
  const [loading, setLoading] = useState(false);
  const [generatedItinerary, setGeneratedItinerary] = useState(null);

  const majorCities = [
    "Chennai", "Coimbatore", "Madurai", "Tiruchirappalli (Trichy)", 
    "Salem", "Tirunelveli", "Bengaluru (Transit)", "Kochi (Transit)"
  ];

  const interestsList = [
    "Offbeat Nature & Eco-Trails",
    "Chettinad & Chola Heritage Architecture",
    "Agri-Tourism & Rural Village Life",
    "Sacred Caves & Ancient Temples",
    "GI-Tag Crafts & Handloom Clusters"
  ];

  const handleGenerate = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate AI synthesis
    setTimeout(() => {
      let planTitle = "";
      let diversionNote = "";
      let primaryDistrict = "";
      let daysPlan = [];

      if (interest.includes("Nature")) {
        planTitle = "Emerald Ridge: Kolli Hills & Valparai Rainforest Circuit";
        primaryDistrict = "Namakkal & Coimbatore";
        diversionNote = "Crowd Diversion Active: Shifted travel from congested Ooty/Kodaikanal (Footfall: 95%) to serene Kolli Hills (Footfall: 22%). Estimated time saved: 4.5 hrs.";
        daysPlan = [
          {
            day: 1,
            title: "Ascent through 70 Hairpin Bends to Kolli Cloud Forest",
            morning: "Depart from " + startCity + " to Namakkal. Drive up the legendary 70 hairpin Ghat road.",
            afternoon: "Trek the 1,196 stone steps to Agaya Gangai Waterfalls gorge. Refresh in medicinal waters.",
            evening: "Visit Arapaleeswarar Temple and sample organic Kolli pineapple with black pepper at Solakkadu bazaar.",
            stay: "Kolli Eco Farmstay (Powered by Solar)",
            guide: "K. Senthamizhan (Medicinal Flora Specialist)"
          },
          {
            day: 2,
            title: "Herbal Sanctuaries & Spice Plantation Trails",
            morning: "Guided forest walk through Siddha Herbal Research Center and organic pepper orchards.",
            afternoon: "Travel toward Valparai via scenic Anamalai foothills.",
            evening: "Sunset viewpoint over Aliyar reservoir. Check in at sustainable tea estate bungalow.",
            stay: "Valparai Rainforest Bungalow",
            guide: "K. Senthamizhan (Wildlife Spotter)"
          },
          {
            day: 3,
            title: "Hornbill Corridors & Sholayar Deep Reservoir",
            morning: "Early morning canopy bird-watching (Spot Great Indian Hornbills and Lion-Tailed Macaques).",
            afternoon: "Coracle and boat cruise along Sholayar backwaters. High-altitude tea tasting masterclass.",
            evening: "Purchase freshly harvested GI cardamom and return journey to " + startCity + ".",
            stay: "Departure",
            guide: "Local Anamalai Eco-Guide"
          }
        ];
      } else if (interest.includes("Heritage")) {
        planTitle = "Grandeur of Merchant Dynasties & Chola Monoliths";
        primaryDistrict = "Sivaganga & Thanjavur";
        diversionNote = "Crowd Diversion Active: Shifted from Madurai Meenakshi peak hours to UNESCO Gangaikonda Cholapuram & Athangudi Palaces. Saved 3 hrs queue time.";
        daysPlan = [
          {
            day: 1,
            title: "The 1000-Window Mansions of Kanadukathan",
            morning: "Arrival in Karaikudi / Kanadukathan from " + startCity + ". Check-in to restored heritage mansion.",
            afternoon: "Explore Chettinad Palace, antique markets, and authentic Kandangi cotton weaving loom.",
            evening: "Traditional 18-dish Chettinad feast served on freshly cut banana leaves.",
            stay: "Visalam Heritage Palace Stay",
            guide: "Meenakshi Sundaram (Heritage Specialist)"
          },
          {
            day: 2,
            title: "Athangudi Glazed Tile Workshop & Sivaganga Rural Crafts",
            morning: "Hands-on tile making masterclass with Master Craftsman at Athangudi village.",
            afternoon: "Drive to Sittanavasal rock caves to witness 2nd-century BC Jain mineral frescoes.",
            evening: "Acoustic whispering gallery experiment inside Kudumiyanmalai rock inscription shrine.",
            stay: "Pudukkottai Heritage Farm",
            guide: "Dr. Revathi Ramanathan (Archaeologist)"
          },
          {
            day: 3,
            title: "UNESCO Great Chola Living Temple & Swamimalai Bronze",
            morning: "Visit Gangaikonda Cholapuram temple and study royal hydraulic water tanks.",
            afternoon: "Live demonstration of 1,000-year-old Cire Perdue lost-wax bronze casting at Swamimalai.",
            evening: "Kumbakonam degree filter coffee tasting and departure to " + startCity + ".",
            stay: "Departure",
            guide: "Meenakshi Sundaram"
          }
        ];
      } else {
        planTitle = "Pristine Mangroves & Agasthyamalai Sacred Waterways";
        primaryDistrict = "Cuddalore & Tirunelveli";
        diversionNote = "Crowd Diversion Active: Bypassed crowded city beaches to explore Pichavaram mangrove waterways and Pattamadai weaving clusters.",
        daysPlan = [
          {
            day: 1,
            title: "Navigating 4,400 Mangrove Waterway Channels",
            morning: "Departure from " + startCity + " to Pichavaram. Board eco-friendly wooden rowboats.",
            afternoon: "Glide under dense green canopies and observe migratory pelicans and sea eagles.",
            evening: "Coastal village seafood dinner with local fisherman community.",
            stay: "Estuarine Eco-Resort",
            guide: "R. Arumugam (Ecology Guide)"
          },
          {
            day: 2,
            title: "Thamirabarani Riverbed & Pattamadai Silk Mat Craft",
            morning: "Scenic travel to Tirunelveli district alongside Thamirabarani perennial river.",
            afternoon: "Visit Pattamadai village to witness ultra-fine Korai grass weaving by women's collectives.",
            evening: "Taste authentic hot Tirunelveli Halwa prepared with river water.",
            stay: "Manimuthar Riverside Homestay",
            guide: "Muthuvel Pandian (Wilderness Guide)"
          },
          {
            day: 3,
            title: "Manjolai Misty Heights & Kalakkad Tiger Reserve",
            morning: "Ascend to Manjolai organic tea plateaus and view Manimuthar waterfalls.",
            afternoon: "Forest walk along Kuthiravetti viewpoint with native forest rangers.",
            evening: "Procure organic hill honey and return to " + startCity + ".",
            stay: "Departure",
            guide: "Muthuvel Pandian"
          }
        ];
      }

      setGeneratedItinerary({
        title: planTitle,
        daysCount: days,
        budget: budgetTier,
        primaryDistrict,
        diversionNote,
        daysPlan: daysPlan.slice(0, days),
        carbonSaved: "18.4 kg CO2e",
        localEconomyContribution: "82% stays in village ecosystem"
      });

      setLoading(false);
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (err) {}
    }, 1200);
  };

  return (
    <section id="ai-planner" className="py-20 bg-[#0A0F1D] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === 'ta' ? 'செயற்கை நுண்ணறிவு பயணத் திட்டமிடுபவர்' : 'AI-Powered Smart Travel Advisor'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
            {t.aiPlanner.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {t.aiPlanner.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Form: Parameter Controls */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
              <Bot className="w-5 h-5 text-amber-400" />
              <span>{lang === 'ta' ? 'பயண விருப்பங்கள்' : 'Configure Travel Parameters'}</span>
            </h3>

            <form onSubmit={handleGenerate} className="space-y-4">
              
              {/* Start City */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{t.aiPlanner.from}</span>
                </label>
                <select
                  value={startCity}
                  onChange={(e) => setStartCity(e.target.value)}
                  className="w-full glass-input text-sm text-white px-3.5 py-2.5 rounded-xl"
                >
                  {majorCities.map(c => <option key={c} value={c} className="bg-slate-900">{c}</option>)}
                </select>
              </div>

              {/* Duration Slider / Select */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-blue-400" />
                    <span>{t.aiPlanner.duration}</span>
                  </label>
                  <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    {days} {lang === 'ta' ? 'நாட்கள்' : 'Days'}
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
                />
                <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                  <span>1 Day (Quick Gem)</span>
                  <span>2 Days (Weekend)</span>
                  <span>3 Days (Full Trail)</span>
                </div>
              </div>

              {/* Budget Tier */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{t.aiPlanner.budget}</span>
                </label>
                <select
                  value={budgetTier}
                  onChange={(e) => setBudgetTier(e.target.value)}
                  className="w-full glass-input text-sm text-white px-3.5 py-2.5 rounded-xl"
                >
                  <option className="bg-slate-900">Budget Friendly (₹1,500/day)</option>
                  <option className="bg-slate-900">Moderate (₹3,000/day)</option>
                  <option className="bg-slate-900">Luxury Heritage (₹6,500/day)</option>
                </select>
              </div>

              {/* Interests */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-rose-400" />
                  <span>{t.aiPlanner.interests}</span>
                </label>
                <select
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  className="w-full glass-input text-sm text-white px-3.5 py-2.5 rounded-xl"
                >
                  {interestsList.map(i => <option key={i} value={i} className="bg-slate-900">{i}</option>)}
                </select>
              </div>

              {/* Generate Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-6 py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-rose-500 to-blue-600 hover:from-amber-400 hover:to-blue-500 text-white font-bold text-sm shadow-xl shadow-amber-500/20 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] disabled:opacity-50 cursor-pointer"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{t.aiPlanner.generating}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>{t.aiPlanner.generateBtn}</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Display: Generated AI Itinerary */}
          <div className="lg:col-span-7">
            {!generatedItinerary && !loading && (
              <div className="glass-panel p-10 rounded-3xl border border-white/10 text-center flex flex-col items-center justify-center min-h-[420px]">
                <div className="w-16 h-16 rounded-2xl bg-amber-500/10 flex items-center justify-center text-3xl mb-4 border border-amber-500/20">
                  🗺️
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Ready to plan your offbeat voyage?</h4>
                <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed">
                  Select your departure hub and interests on the left. The Payanam 360 AI will construct a crowd-balanced, high-impact travel itinerary connecting you to verified guides and artisan clusters.
                </p>
              </div>
            )}

            {loading && (
              <div className="glass-panel p-8 rounded-3xl border border-white/10 min-h-[420px] flex flex-col justify-center space-y-4">
                <div className="h-6 w-3/4 rounded-lg shimmer-loading" />
                <div className="h-20 rounded-xl shimmer-loading" />
                <div className="h-32 rounded-xl shimmer-loading" />
                <div className="h-32 rounded-xl shimmer-loading" />
              </div>
            )}

            {generatedItinerary && !loading && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-amber-500/30 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-300">
                
                {/* Itinerary Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-white/10 gap-3">
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                      AI Crowd Balanced Trail
                    </span>
                    <h3 className="text-xl sm:text-2xl font-extrabold text-white font-display mt-1">
                      {generatedItinerary.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Districts: <span className="text-amber-400 font-semibold">{generatedItinerary.primaryDistrict}</span> • Duration: {generatedItinerary.daysCount} Days
                    </p>
                  </div>

                  {/* Impact pill */}
                  <div className="bg-white/5 border border-white/10 p-2.5 rounded-xl text-right sm:text-center">
                    <div className="text-[10px] text-slate-400">Local Economy Share</div>
                    <div className="text-xs font-bold text-emerald-400">{generatedItinerary.localEconomyContribution}</div>
                  </div>
                </div>

                {/* AI Diversion Alert Callout */}
                <div className="p-3.5 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-start gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <span className="font-bold text-amber-300 block mb-0.5">
                      {t.aiPlanner.crowdDiversionTip}:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {generatedItinerary.diversionNote}
                    </p>
                  </div>
                </div>

                {/* Day-by-Day Timeline */}
                <div className="space-y-4">
                  {generatedItinerary.daysPlan.map((d) => (
                    <div key={d.day} className="p-4 rounded-2xl bg-white/5 border border-white/5 hover:border-white/10 transition-colors">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold text-xs flex items-center justify-center">
                          {d.day}
                        </span>
                        <h4 className="text-sm font-bold text-white">
                          Day {d.day}: {d.title}
                        </h4>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs text-slate-300 pl-8">
                        <div>
                          <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block mb-1">🌅 Morning</span>
                          <p>{d.morning}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-blue-400 uppercase tracking-wider block mb-1">☀️ Afternoon</span>
                          <p>{d.afternoon}</p>
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block mb-1">🌙 Evening</span>
                          <p>{d.evening}</p>
                        </div>
                      </div>

                      <div className="mt-3 pt-3 border-t border-white/5 pl-8 flex flex-wrap items-center justify-between text-[11px] gap-2">
                        <div className="text-slate-400">
                          🏡 <span className="text-slate-300">{d.stay}</span>
                        </div>
                        <div className="text-slate-400">
                          🛡️ Guide: <span className="text-amber-400 font-semibold">{d.guide}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer CTAs */}
                <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
                  <div className="text-xs text-slate-400 flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-emerald-400" />
                    <span>Estimated Carbon Footprint Reduced: <strong>{generatedItinerary.carbonSaved}</strong></span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => alert("Itinerary saved to your Payanam Travel Pass!")}
                      className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-semibold text-white flex items-center gap-1.5 transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Save Itinerary</span>
                    </button>

                    <a 
                      href="#guides"
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-500/20 transition-all hover:scale-105"
                    >
                      <Users className="w-3.5 h-3.5" />
                      <span>Book Recommended Guide</span>
                    </a>
                  </div>
                </div>

              </div>
            )}
          </div>

        </div>

      </div>
    </section>
  );
}
