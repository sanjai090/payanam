import React, { useState } from 'react';
import { X, ShoppingBag, Trash2, CheckCircle2, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function CartModal({ items, onRemoveItem, onClose, onClearCart }) {
  const [checkedOut, setCheckedOut] = useState(false);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [recipientName, setRecipientName] = useState('');

  const subtotal = items.reduce((acc, curr) => acc + curr.price, 0);
  const packaging = items.length > 0 ? 120 : 0;
  const total = subtotal + packaging;

  const handleCheckout = (e) => {
    e.preventDefault();
    setCheckedOut(true);
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.5 }
      });
    } catch (err) {}
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-slate-900 border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-950/80 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-rose-400" />
            <h3 className="text-base font-bold text-white">
              {checkedOut ? 'Order Placed Directly with Artisans!' : `Your Namma Sandhai Hamper (${items.length})`}
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
        {!checkedOut ? (
          <div className="p-6 overflow-y-auto space-y-6 flex-1">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <p className="text-sm text-slate-300 font-medium">Your Travel Hamper is empty.</p>
                <p className="text-xs text-slate-500 mt-1">Explore authentic GI crafts in the Namma Sandhai section.</p>
              </div>
            ) : (
              <>
                {/* List */}
                <div className="space-y-3">
                  {items.map((item, idx) => (
                    <div key={`${item.id}-${idx}`} className="flex items-center gap-3 p-3 rounded-2xl bg-white/5 border border-white/5">
                      <img src={item.image} alt={item.name} className="w-14 h-14 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-white truncate">{item.name}</h4>
                        <p className="text-[11px] text-amber-300">👨‍🎨 {item.artisanName}</p>
                        <p className="text-xs font-extrabold text-white mt-1">₹{item.price.toLocaleString()}</p>
                      </div>
                      <button
                        onClick={() => onRemoveItem(idx)}
                        className="p-2 text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        title="Remove"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Form */}
                <form onSubmit={handleCheckout} className="space-y-3 pt-3 border-t border-white/10">
                  <h4 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                    Direct Artisan Dispatch Details
                  </h4>
                  
                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Ananya Sundar"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-slate-400 mb-1">Delivery / Hotel Address in Tamil Nadu</label>
                    <textarea
                      required
                      rows={2}
                      placeholder="Enter address for direct artisan dispatch or hotel drop"
                      value={deliveryAddress}
                      onChange={(e) => setDeliveryAddress(e.target.value)}
                      className="w-full glass-input text-xs text-white p-2.5 rounded-xl resize-none"
                    />
                  </div>

                  {/* Summary */}
                  <div className="p-3.5 rounded-xl bg-black/40 border border-white/5 space-y-1.5 text-xs">
                    <div className="flex justify-between text-slate-400">
                      <span>Products Subtotal:</span>
                      <span>₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-slate-400">
                      <span>Eco-Friendly Packaging & Artisan Handover:</span>
                      <span>₹{packaging}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold pt-2 border-t border-white/10 text-sm">
                      <span>Total Fair-Trade Amount:</span>
                      <span className="text-rose-400">₹{total.toLocaleString()}</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white font-bold text-xs shadow-lg shadow-rose-500/20 transition-all hover:scale-[1.02] cursor-pointer"
                  >
                    Place Direct Fair-Trade Order
                  </button>
                </form>
              </>
            )}
          </div>
        ) : (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <h4 className="text-lg font-bold text-white">Order Received! Thank You {recipientName}!</h4>
            
            <p className="text-xs text-slate-300 leading-relaxed max-w-sm mx-auto">
              Your direct order has been routed to the respective artisan guilds. 100% of the product cost is deposited into the community bank accounts without intermediaries.
            </p>

            <div className="p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs space-y-1">
              <div className="text-slate-400">Consignment ID: <span className="font-mono text-rose-300 font-bold">#SANDHAI-TN-4419</span></div>
              <div className="text-slate-400">Dispatched From: <span className="text-white font-bold">Local Artisan Self-Help Clusters</span></div>
            </div>

            <button
              onClick={() => {
                onClearCart();
                onClose();
              }}
              className="w-full py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-xs font-bold text-white transition-colors"
            >
              Continue Exploring
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
