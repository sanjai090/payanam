import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { 
  MapPin, Eye, Compass, Users, Sparkles, Navigation, 
  CloudSun, Thermometer, Wind, CheckCircle2, ShieldCheck, Layers 
} from 'lucide-react';

// Fix Leaflet's default icon issue in React
delete L.Icon.Default.prototype._getIconUrl;

const createCustomIcon = (crowdIndex) => {
  let color = '#10B981'; // Emerald for hidden gem
  let glow = 'rgba(16, 185, 129, 0.4)';
  if (crowdIndex > 40) {
    color = '#F59E0B'; // Amber
    glow = 'rgba(245, 158, 11, 0.4)';
  }
  if (crowdIndex > 70) {
    color = '#E11D48'; // Crimson
    glow = 'rgba(225, 29, 72, 0.4)';
  }

  return L.divIcon({
    className: 'custom-map-pin',
    html: `
      <div style="
        position: relative;
        width: 32px;
        height: 32px;
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          position: absolute;
          width: 28px;
          height: 28px;
          border-radius: 50%;
          background: ${glow};
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        "></div>
        <div style="
          position: relative;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: ${color};
          border: 2px solid #080C16;
          box-shadow: 0 0 10px ${color};
          display: flex;
          align-items: center;
          justify-content: center;
          color: #000;
          font-weight: bold;
          font-size: 11px;
        ">
          📍
        </div>
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -18]
  });
};

// Map controller to fly to selected location
function MapFlyTo({ selectedLocation }) {
  const map = useMap();
  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 10, {
        duration: 1.5
      });
    }
  }, [selectedLocation, map]);
  return null;
}

export default function InteractiveMap({ 
  districts, 
  t, 
  lang, 
  onOpen360, 
  onOpenGemDetails, 
  onSelectGemForGuide 
}) {
  const [selectedGem, setSelectedGem] = useState(districts[0]);
  const [showLowCrowdOnly, setShowLowCrowdOnly] = useState(false);

  const displayedDistricts = showLowCrowdOnly 
    ? districts.filter(d => d.crowdIndex <= 30) 
    : districts;

  // Mock live weather for destination
  const getWeather = (gem) => {
    if (gem.category === 'nature') {
      return { temp: '22°C', condition: 'Misty & Pleasant Breeze', elevation: '1,320m', aqi: 'Good (24)' };
    } else if (gem.category === 'heritage') {
      return { temp: '28°C', condition: 'Sunny & Clear Skies', elevation: '110m', aqi: 'Moderate (48)' };
    }
    return { temp: '26°C', condition: 'Breezy & Coastal Humid', elevation: '15m', aqi: 'Good (32)' };
  };

  const weather = selectedGem ? getWeather(selectedGem) : null;

  return (
    <section id="map-section" className="py-20 bg-[#060911] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <Navigation className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'தமிழ்நாடு ஊடாடும் வரைபடம்' : 'Geospatial District Explorer'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {lang === 'ta' ? 'தமிழக மாவட்டங்களின் வரைபட ஆய்வு' : 'Explore Tamil Nadu on the Live Map'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              {lang === 'ta' 
                ? '38 மாவட்டங்களில் உள்ள மறைந்திருக்கும் சுற்றுலாப் பொக்கிஷங்களை கண்டறிந்து வழிகாட்டிகளுடன் இணையுங்கள்.' 
                : 'Click any district node on the map to inspect live crowd density, local microclimate, and verified guide connections.'}
            </p>
          </div>

          {/* Toggle Low Crowd Only */}
          <button
            onClick={() => setShowLowCrowdOnly(!showLowCrowdOnly)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all border ${
              showLowCrowdOnly 
                ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-lg shadow-emerald-500/20' 
                : 'bg-slate-900/80 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/10'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{showLowCrowdOnly ? 'Showing Low-Crowd Gems Only (Active)' : 'Filter Low-Crowd Gems (<30%)'}</span>
          </button>
        </div>

        {/* Map Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left / Sidebar: District List Selector */}
          <div className="lg:col-span-4 glass-panel p-4 sm:p-5 rounded-3xl border border-white/10 flex flex-col justify-between max-h-[600px] overflow-hidden">
            <div>
              <div className="flex items-center justify-between mb-3 px-2">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                  Select Destination Node ({displayedDistricts.length})
                </span>
                <span className="text-[10px] text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded font-mono">
                  Live GPS
                </span>
              </div>

              {/* Scrollable list */}
              <div className="space-y-2 overflow-y-auto max-h-[340px] pr-1 scrollbar-thin">
                {displayedDistricts.map((gem) => {
                  const isSelected = selectedGem?.id === gem.id;
                  return (
                    <button
                      key={gem.id}
                      onClick={() => setSelectedGem(gem)}
                      className={`w-full text-left p-3 rounded-2xl transition-all flex items-center justify-between border ${
                        isSelected 
                          ? 'bg-amber-500/15 border-amber-500/50 shadow-md' 
                          : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{
                          backgroundColor: gem.crowdIndex <= 25 ? '#10B981' : gem.crowdIndex <= 45 ? '#F59E0B' : '#E11D48'
                        }} />
                        <div className="truncate">
                          <div className={`text-xs font-bold truncate ${isSelected ? 'text-amber-300' : 'text-white'}`}>
                            {gem.name}
                          </div>
                          <div className="text-[10px] text-slate-400 truncate">
                            📍 {gem.district} • {gem.zone}
                          </div>
                        </div>
                      </div>

                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-black/40 text-slate-300 shrink-0 ml-2">
                        {gem.crowdIndex}% Footfall
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Selected Gem Live Microclimate Widget */}
            {selectedGem && weather && (
              <div className="mt-4 pt-4 border-t border-white/10">
                <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-900/30 via-slate-900 to-slate-950 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-300 flex items-center gap-1.5">
                      <CloudSun className="w-3.5 h-3.5" />
                      <span>{selectedGem.district} Microclimate</span>
                    </span>
                    <span className="text-xs font-extrabold text-white font-mono">
                      {weather.temp}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                    <div className="bg-white/5 p-1.5 rounded-lg">
                      <span className="text-slate-400 block">Condition:</span>
                      <strong className="text-white">{weather.condition}</strong>
                    </div>
                    <div className="bg-white/5 p-1.5 rounded-lg">
                      <span className="text-slate-400 block">Elevation:</span>
                      <strong className="text-white">{weather.elevation}</strong>
                    </div>
                  </div>

                  <div className="mt-3 flex gap-2">
                    <button
                      onClick={() => onOpen360(selectedGem)}
                      className="flex-1 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <Eye className="w-3 h-3" />
                      <span>360° View</span>
                    </button>

                    <button
                      onClick={() => onOpenGemDetails(selectedGem)}
                      className="flex-1 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-bold flex items-center justify-center gap-1 transition-colors"
                    >
                      <span>Full Info</span>
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right: Leaflet Interactive Map Container */}
          <div className="lg:col-span-8 rounded-3xl overflow-hidden border border-white/15 shadow-2xl relative min-h-[480px] sm:min-h-[580px] bg-[#0A0E17]">
            
            <MapContainer
              center={[11.1271, 78.6569]} // Tamil Nadu Center
              zoom={7}
              scrollWheelZoom={false}
              style={{ width: '100%', height: '100%', minHeight: '580px' }}
              className="z-10"
            >
              {/* Dark Carto Tile Layer */}
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
              />

              <MapFlyTo selectedLocation={selectedGem} />

              {/* Markers */}
              {displayedDistricts.map((gem) => (
                <Marker
                  key={gem.id}
                  position={[gem.lat, gem.lng]}
                  icon={createCustomIcon(gem.crowdIndex)}
                  eventHandlers={{
                    click: () => setSelectedGem(gem),
                  }}
                >
                  <Popup className="custom-leaflet-popup">
                    <div className="p-1 max-w-xs text-slate-900 font-sans">
                      <img 
                        src={gem.image} 
                        alt={gem.name} 
                        className="w-full h-24 object-cover rounded-lg mb-2"
                      />
                      <h4 className="text-xs font-bold text-slate-950 mb-0.5">{gem.name}</h4>
                      <p className="text-[10px] text-amber-700 font-semibold mb-1">📍 {gem.district} District</p>
                      <p className="text-[10px] text-slate-600 line-clamp-2 mb-2">{gem.description}</p>
                      
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200">
                        <span className="text-[9px] font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
                          Footfall: {gem.crowdIndex}%
                        </span>
                        <button
                          onClick={() => onOpenGemDetails(gem)}
                          className="text-[10px] font-bold text-blue-700 hover:underline"
                        >
                          Explore Gem →
                        </button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>

            {/* Map Legend Overlay */}
            <div className="absolute bottom-4 left-4 z-20 bg-slate-950/80 backdrop-blur-md p-3 rounded-2xl border border-white/10 text-[11px] text-slate-300 space-y-1.5 shadow-xl">
              <div className="font-bold text-white text-xs mb-1">Crowd Footfall Legend:</div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>Hidden Gem / Eco Sanctuary (&lt;30%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>Moderate Tourist Node (30% - 50%)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>Congested Hotspot (&gt;50%)</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
