import React, { useState, useEffect } from 'react';
import { Headphones, Play, Pause, RotateCcw, Volume2, Sparkles, MapPin, Check } from 'lucide-react';
import { audioStoriesData } from '../data/audioStories';

export default function AudioGuidePlayer({ t, lang }) {
  const [activeStory, setActiveStory] = useState(audioStoriesData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speechSynthesisSupported, setSpeechSynthesisSupported] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSynthesisSupported(true);
    }
  }, []);

  const handlePlayPause = () => {
    if (!speechSynthesisSupported) {
      alert("Speech synthesis is simulating audio playback.");
      setIsPlaying(!isPlaying);
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    } else {
      window.speechSynthesis.cancel();
      const textToSpeak = lang === 'ta' ? activeStory.audioTextTa : activeStory.audioTextEn;
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      utterance.rate = 0.95;
      utterance.pitch = 1.0;
      utterance.lang = lang === 'ta' ? 'ta-IN' : 'en-IN';

      utterance.onend = () => {
        setIsPlaying(false);
      };
      utterance.onerror = () => {
        setIsPlaying(false);
      };

      window.speechSynthesis.speak(utterance);
      setIsPlaying(true);
    }
  };

  const handleSelectStory = (story) => {
    if (isPlaying && typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
    setActiveStory(story);
  };

  return (
    <section id="audio-stories" className="py-20 bg-[#080C16] relative border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-xs font-semibold uppercase tracking-wider mb-3">
              <Headphones className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'ஒலி வழிகாட்டி' : 'Audio Storyteller'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {lang === 'ta' ? 'கேட்டு மகிழுங்கள்: தமிழக வரலாற்றுக் கதைகள்' : 'Immersive Audio Guides & Local Legends'}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              {lang === 'ta'
                ? 'உள்ளூர் வழிகாட்டிகளின் குரலில் தமிழிலும் ஆங்கிலத்திலும் அரிய இடங்களின் கதைகளை கேட்டு மகிழுங்கள்.'
                : 'Listen to native legends narrated by certified district historians and forest guides right on your device.'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Player Widget */}
          <div className="lg:col-span-5 glass-panel p-6 sm:p-8 rounded-3xl border border-blue-500/30 shadow-2xl relative overflow-hidden">
            <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
              <img
                src={activeStory.image}
                alt={activeStory.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md text-[11px] font-bold text-white flex items-center gap-1">
                <MapPin className="w-3 h-3 text-blue-400" />
                <span>{activeStory.district} District</span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-white font-display mb-1">
              {lang === 'ta' ? activeStory.titleTamil : activeStory.title}
            </h3>
            <p className="text-xs text-amber-300 mb-4">
              🎙️ Narrated by: {activeStory.narrator}
            </p>

            {/* Audio Transcript / Narration Box */}
            <div className="p-3.5 rounded-2xl bg-black/40 border border-white/5 text-xs text-slate-300 leading-relaxed mb-6 max-h-32 overflow-y-auto">
              "{lang === 'ta' ? activeStory.audioTextTa : activeStory.audioTextEn}"
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-slate-400 font-mono">
                Duration: {activeStory.duration}
              </span>

              <button
                onClick={handlePlayPause}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/25 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause Story</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-white" />
                    <span>Play Audio Guide</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right: Story Playlist */}
          <div className="lg:col-span-7 space-y-3">
            <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider mb-2">
              Select Heritage Audio Track:
            </h4>

            {audioStoriesData.map((story) => {
              const isSelected = activeStory.id === story.id;
              return (
                <button
                  key={story.id}
                  onClick={() => handleSelectStory(story)}
                  className={`w-full text-left p-4 rounded-2xl transition-all border flex items-center justify-between ${
                    isSelected
                      ? 'bg-blue-500/15 border-blue-500/50 shadow-md'
                      : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                  }`}
                >
                  <div className="flex items-center gap-4 min-w-0">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0"
                    />
                    <div className="truncate">
                      <h5 className={`text-sm font-bold truncate ${isSelected ? 'text-blue-300' : 'text-white'}`}>
                        {lang === 'ta' ? story.titleTamil : story.title}
                      </h5>
                      <p className="text-xs text-slate-400 truncate mt-0.5">
                        📍 {story.district} • {story.narrator}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 ml-3">
                    <span className="text-xs font-mono text-slate-400">{story.duration}</span>
                    <span className={`p-2 rounded-xl ${isSelected ? 'bg-blue-500 text-white' : 'bg-white/5 text-slate-400'}`}>
                      <Volume2 className="w-4 h-4" />
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
