import React, { useState } from 'react';
import { X, Calendar, Users, ShieldCheck, CheckCircle2, Phone, Car, Clock, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function BookingModal({ guide, destination, onClose }) {
  const [date, setDate] = useState('2026-09-15');
  const [guests, setGuests] = useState(2);
  const [needTransport, setNeedTransport] = useState(true);
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [booked, setBooked] = useState(false);

  if (!guide && !destination) return null;

  const guideFee = guide ? guide.dailyRate : 1500;
  const transportFee = needTransport ? 800 : 0;
  const total = guideFee + transportFee;

  const handleSubmit = (e) => {
    e.preventDefault();
    setBooked(true);
    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <h3 className="text-base font-bold text-white">
              {booked ? 'Booking Confirmed!' : 'Request Verified Local Guide'}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/15 text-slate-300 hover:text-white"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        {!booked ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Guide Quick Info */}
            {guide && (
              <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-3">
                <img 
                  src={guide.avatar} 
                  alt={guide.name} 
                  className="w-12 h-12 rounded-xl object-cover border border-amber-400/40"
                />
                <div>
                  <h4 className="text-sm font-bold text-white">{guide.name}</h4>
                  <p className="text-xs text-amber-300">📍 {guide.district} • {guide.badge}</p>
                  <p className="text-[11px] text-slate-400">Speaks: {guide.languages.join(', ')}</p>
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Travel Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">No. of Travelers</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full glass-input text-xs text-white p-2.5 rounded-xl bg-slate-900"
                >
                  <option value={1}>1 Solo Explorer</option>
                  <option value={2}>2 Travelers</option>
                  <option value={4}>4 (Family / Group)</option>
                  <option value={6}>6+ Travelers</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name</label>
              <input
                type="text"
                placeholder="e.g. Ramesh Kumar"
                required
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">WhatsApp / Contact Number</label>
              <input
                type="tel"
                placeholder="+91 98765 43210"
                required
                value={userPhone}
                onChange={(e) => setUserPhone(e.target.value)}
                className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
              />
            </div>

            {/* Transport Option Checkbox */}
            <label className="flex items-start gap-2.5 p-3 rounded-xl bg-blue-500/10 border border-blue-500/20 cursor-pointer">
              <input
                type="checkbox"
                checked={needTransport}
                onChange={(e) => setNeedTransport(e.target.checked)}
                className="mt-0.5 rounded text-amber-500 focus:ring-amber-500"
              />
              <div className="text-xs">
                <span className="font-bold text-blue-300 block">Include Last-Mile Rural Transport Assistance (+₹800)</span>
                <span className="text-slate-300 text-[11px]">Local Tuk-Tuk / Hill Jeep driver coordinated directly by the guide.</span>
              </div>
            </label>

            {/* Price breakdown */}
            <div className="p-3 rounded-xl bg-black/40 border border-white/5 space-y-1 text-xs">
              <div className="flex justify-between text-slate-400">
                <span>Guide Daily Honorarium:</span>
                <span>₹{guideFee}</span>
              </div>
              {needTransport && (
                <div className="flex justify-between text-slate-400">
                  <span>Transport Support:</span>
                  <span>₹{transportFee}</span>
                </div>
              )}
              <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm">
                <span>Estimated Total:</span>
                <span className="text-amber-400">₹{total}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-[1.02] cursor-pointer"
            >
              Confirm Guide Reservation
            </button>
          </form>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-lg font-bold text-white">Booking Request Sent to {guide?.name}!</h4>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              A confirmation SMS & WhatsApp itinerary token have been dispatched to <strong>{userPhone}</strong>. Your guide will call you 24 hours prior to synchronize your arrival.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-1">
              <div className="text-slate-400">Booking Token: <span className="font-mono text-amber-300 font-bold">#PAYANAM-2026-8891</span></div>
              <div className="text-slate-400">Status: <span className="text-emerald-400 font-bold">Verified & Dispatched</span></div>
            </div>

            <button
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              Close Window
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
