import React, { useState } from 'react';
import { 
  ShoppingBag, Award, MapPin, Heart, Sparkles, Check, 
  ExternalLink, ArrowRight, ShieldCheck, Truck, Plus 
} from 'lucide-react';
import { sandhaiProducts } from '../data/products';

export default function NammaSandhai({ t, lang, onAddToCart, onOpenProductDetails }) {
  const [selectedCat, setSelectedCat] = useState('All');
  const [addedId, setAddedId] = useState(null);

  const categories = ["All", "Handicrafts & Decor", "Handloom & Textiles", "Heritage & Idols", "Agri & Farm Produce"];

  const filteredProducts = sandhaiProducts.filter(p => {
    return selectedCat === 'All' || p.category === selectedCat;
  });

  const handleAddWithFeedback = (product) => {
    onAddToCart(product);
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <section id="sandhai" className="py-20 bg-[#0A0F1D] relative border-t border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-3">
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>{lang === 'ta' ? 'கிராமிய கைவினை & புவிசார் சந்தை' : 'Rural MSME & GI-Tag Marketplace'}</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white font-display">
              {t.sandhai.title}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 mt-2 max-w-2xl">
              {t.sandhai.subtitle}
            </p>
          </div>

          {/* Impact Banner Tag */}
          <div className="bg-white/5 border border-white/10 p-3 rounded-2xl flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-sm">
              ₹
            </div>
            <div className="text-xs">
              <span className="font-bold text-white block">100% Fair-Trade Direct Payout</span>
              <span className="text-slate-400">Zero commission taken from rural self-help groups</span>
            </div>
          </div>
        </div>

        {/* Category Selector */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCat === cat 
                  ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/25 scale-105' 
                  : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800 border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredProducts.map((product) => (
            <div 
              key={product.id}
              className="glass-card rounded-2xl overflow-hidden border border-white/10 flex flex-col justify-between hover:border-rose-500/40 group transition-all"
            >
              {/* Product Image & Badges */}
              <div className="relative h-52 overflow-hidden bg-slate-900">
                <img 
                  src={product.image} 
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />

                {/* GI Tag Badge */}
                {product.giTagCertified ? (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[10px] font-extrabold flex items-center gap-1 shadow-lg">
                    <Award className="w-3 h-3" />
                    <span>{product.giNumber}</span>
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-emerald-500/80 backdrop-blur-md text-white text-[10px] font-bold">
                    Organic / Craftmark
                  </div>
                )}

                {/* District Origin */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1 text-[11px] font-semibold text-slate-300 bg-black/60 px-2.5 py-1 rounded-lg backdrop-blur-sm">
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{product.district}</span>
                </div>
              </div>

              {/* Product Details */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-rose-400 transition-colors mb-1">
                    {product.name}
                  </h3>

                  <p className="text-xs text-amber-300 font-medium mb-2">
                    👨‍🎨 {product.artisanName}
                  </p>

                  <p className="text-xs text-slate-300 line-clamp-2 mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 mb-4 bg-white/5 p-2 rounded-lg">
                    <span>Village: <strong>{product.villageName}</strong></span>
                    <span>Time: <strong>{product.craftDuration}</strong></span>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Direct Price</span>
                    <span className="text-lg font-extrabold text-white">
                      ₹{product.price.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleAddWithFeedback(product)}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-md ${
                        addedId === product.id 
                          ? 'bg-emerald-500 text-white' 
                          : 'bg-gradient-to-r from-rose-500 to-rose-600 hover:from-rose-400 hover:to-rose-500 text-white shadow-rose-500/20 hover:scale-105'
                      }`}
                    >
                      {addedId === product.id ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>Added!</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Hamper</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
