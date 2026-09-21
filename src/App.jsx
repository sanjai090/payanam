import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import InteractiveMap from './components/InteractiveMap';
import DistrictExplorer from './components/DistrictExplorer';
import FestivalsCalendar from './components/FestivalsCalendar';
import FoodTrail from './components/FoodTrail';
import HomestaysDirectory from './components/HomestaysDirectory';
import AudioGuidePlayer from './components/AudioGuidePlayer';
import AIItinerary from './components/AIItinerary';
import GuidesDirectory from './components/GuidesDirectory';
import NammaSandhai from './components/NammaSandhai';
import OnboardingPortal from './components/OnboardingPortal';
import FeedbackSection from './components/FeedbackSection';
import ImpactDashboard from './components/ImpactDashboard';
import SafetySOS from './components/SafetySOS';
import Footer from './components/Footer';

import Virtual360Modal from './components/Virtual360Modal';
import GemDetailsModal from './components/GemDetailsModal';
import BookingModal from './components/BookingModal';
import CartModal from './components/CartModal';

import { translations } from './data/translations';
import { districtsData } from './data/districts';
import { verifiedGuides } from './data/guides';

export default function App() {
  const [lang, setLang] = useState('en');
  const t = translations[lang] || translations.en;

  // Modals state
  const [active360Gem, setActive360Gem] = useState(null);
  const [selectedGemDetails, setSelectedGemDetails] = useState(null);
  const [selectedGuideForBooking, setSelectedGuideForBooking] = useState(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  // Handle Search from Hero
  const handleHeroSearch = (query) => {
    const explorerEl = document.getElementById('explorer');
    if (explorerEl) {
      explorerEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Quick Gem Click from Hero
  const handleQuickFilter = (gemId) => {
    const targetGem = districtsData.find(d => d.id === gemId);
    if (targetGem) {
      setSelectedGemDetails(targetGem);
    }
  };

  // Handle guide selection from Gem Card
  const handleSelectGemForGuide = (gem) => {
    const matchedGuide = verifiedGuides.find(g => g.id === gem.assignedGuideId) || verifiedGuides[0];
    setSelectedGuideForBooking(matchedGuide);
  };

  // Cart operations
  const handleAddToCart = (product) => {
    setCartItems(prev => [...prev, product]);
  };

  const handleRemoveCartItem = (index) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  return (
    <div className="min-h-screen bg-[#080C16] text-slate-100 font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Navigation Header */}
      <Navbar 
        lang={lang} 
        setLang={setLang} 
        t={t}
        cartCount={cartItems.length}
        openCartModal={() => setCartOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        {/* 1. Hero Section */}
        <Hero 
          t={t} 
          lang={lang}
          onSearchSubmit={handleHeroSearch}
          onQuickFilterSelect={handleQuickFilter}
        />

        {/* 2. Interactive Tamil Nadu Geospatial Map */}
        <InteractiveMap 
          districts={districtsData}
          t={t}
          lang={lang}
          onOpen360={(gem) => setActive360Gem(gem)}
          onOpenGemDetails={(gem) => setSelectedGemDetails(gem)}
          onSelectGemForGuide={handleSelectGemForGuide}
        />

        {/* 3. District-Wise Exploration Grid */}
        <DistrictExplorer 
          districts={districtsData}
          t={t}
          lang={lang}
          onOpen360={(gem) => setActive360Gem(gem)}
          onSelectGemForGuide={handleSelectGemForGuide}
          onOpenGemDetails={(gem) => setSelectedGemDetails(gem)}
        />

        {/* 4. Living Culture & Festivals Calendar */}
        <FestivalsCalendar 
          t={t}
          lang={lang}
        />

        {/* 5. District Food Heritage Trail */}
        <FoodTrail 
          t={t}
          lang={lang}
        />

        {/* 6. Sustainable Eco-Stays & Farm Retreats */}
        <HomestaysDirectory 
          t={t}
          lang={lang}
        />

        {/* 7. Audio Storyteller & Local Legends */}
        <AudioGuidePlayer 
          t={t}
          lang={lang}
        />

        {/* 8. Payanam AI Smart Itinerary Planner */}
        <AIItinerary 
          t={t}
          lang={lang}
          onSelectGuideForItinerary={(guideName) => {
            const matched = verifiedGuides.find(g => g.name.includes(guideName)) || verifiedGuides[0];
            setSelectedGuideForBooking(matched);
          }}
        />

        {/* 9. Verified Local Guides & Rural Transport */}
        <GuidesDirectory 
          t={t}
          lang={lang}
          onOpenBookingModal={(guide) => setSelectedGuideForBooking(guide)}
        />

        {/* 10. Namma Sandhai (GI-Tagged Rural Marketplace) */}
        <NammaSandhai 
          t={t}
          lang={lang}
          onAddToCart={handleAddToCart}
          onOpenProductDetails={(p) => {}}
        />

        {/* 11. Join Ecosystem Digital Onboarding Portal */}
        <OnboardingPortal 
          t={t}
          lang={lang}
        />

        {/* 12. Tourism Sustainability Impact Tracker */}
        <ImpactDashboard 
          t={t}
          lang={lang}
        />

        {/* 13. Platform Usability & Experience Feedback Portal */}
        <FeedbackSection 
          t={t}
          lang={lang}
        />

        {/* 14. Safety, Ghat Road Advisory & 24/7 SOS Hub */}
        <SafetySOS 
          t={t}
          lang={lang}
        />
      </main>

      {/* Footer */}
      <Footer t={t} lang={lang} />

      {/* Modals */}
      {active360Gem && (
        <Virtual360Modal 
          gem={active360Gem} 
          onClose={() => setActive360Gem(null)} 
        />
      )}

      {selectedGemDetails && (
        <GemDetailsModal 
          gem={selectedGemDetails}
          onClose={() => setSelectedGemDetails(null)}
          onOpen360={(gem) => setActive360Gem(gem)}
          onBookGuide={(gem) => handleSelectGemForGuide(gem)}
        />
      )}

      {selectedGuideForBooking && (
        <BookingModal 
          guide={selectedGuideForBooking}
          onClose={() => setSelectedGuideForBooking(null)}
        />
      )}

      {cartOpen && (
        <CartModal 
          items={cartItems}
          onRemoveItem={handleRemoveCartItem}
          onClearCart={handleClearCart}
          onClose={() => setCartOpen(false)}
        />
      )}

    </div>
  );
}
