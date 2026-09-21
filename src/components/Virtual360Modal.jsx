import React, { useState } from 'react';
import { X, Maximize2, Volume2, VolumeX, Eye, Compass, Info, MapPin } from 'lucide-react';

export default function Virtual360Modal({ gem, onClose }) {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [activeHotspot, setActiveHotspot] = useState(null);

  if (!gem) return null;

  const hotspots = [
    {
      id: "h1",
      title: "Scenic Vantage & Gorge",
      description: "Pristine natural formation with panoramic views across the valley.",
      top: "40%",
      left: "30%"
    },
    {
      id: "h2",
      title: "Ancient Architecture / Trail Point",
      description: "Centuries-old stone carving and indigenous herbal pathway.",
      top: "65%",
      left: "60%"
    },
    {
      id: "h3",
      title: "Local Community Cluster",
      description: "Nearby traditional artisans and native guide meetup station.",
      top: "50%",
      left: "80%"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="p-2 rounded-xl bg-blue-500/20 text-blue-400">
              <Eye className="w-5 h-5" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-white">
                  360° Virtual Preview: {gem.name}
                </h3>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-semibold px-2 py-0.5 rounded border border-amber-500/30">
                  Interactive Simulator
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {gem.district} District • {gem.zone}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`p-2 rounded-xl border text-xs font-semibold flex items-center gap-1.5 transition-all ${
                soundEnabled 
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300' 
                  : 'bg-white/5 border-white/10 text-slate-400 hover:text-white'
              }`}
              title="Toggle Ambient Nature Audio"
            >
              {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span className="hidden sm:inline">{soundEnabled ? 'Ambient Sound On' : 'Mute'}</span>
            </button>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* 360° Panoramic Simulation Area */}
        <div className="relative flex-1 min-h-[420px] sm:min-h-[500px] overflow-hidden bg-slate-950 group">
          <img 
            src={gem.panoramicImage || gem.image} 
            alt={gem.name}
            className="w-full h-full object-cover brightness-90 contrast-105 filter scale-105 animate-pulse-slow"
          />

          {/* Panoramic Gradient Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

          {/* Interactive Hotspots */}
          {hotspots.map((h) => (
            <div
              key={h.id}
              style={{ top: h.top, left: h.left }}
              className="absolute -translate-x-1/2 -translate-y-1/2"
            >
              <button
                onClick={() => setActiveHotspot(activeHotspot?.id === h.id ? null : h)}
                className="relative group/btn p-2 rounded-full bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/50 hover:scale-125 transition-transform animate-bounce"
              >
                <Info className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-white animate-ping" />
              </button>

              {activeHotspot?.id === h.id && (
                <div className="absolute left-1/2 -translate-x-1/2 bottom-12 w-64 p-3.5 rounded-2xl bg-slate-900/95 border border-amber-500/40 text-left shadow-2xl backdrop-blur-xl z-20 animate-in fade-in zoom-in-90">
                  <h5 className="text-xs font-bold text-amber-300 mb-1">{h.title}</h5>
                  <p className="text-[11px] text-slate-200 leading-tight">{h.description}</p>
                </div>
              )}
            </div>
          ))}

          {/* Virtual Compass Overlay */}
          <div className="absolute bottom-6 left-6 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300">
            <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '12s' }} />
            <span>N 11°14'54" E 78°20'19" • Panoramic View</span>
          </div>

          <div className="absolute bottom-6 right-6 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-xs text-slate-300 hidden sm:block">
            <span>Drag or click markers to inspect key points of interest</span>
          </div>
        </div>

      </div>
    </div>
  );
}
