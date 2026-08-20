import React, { useState } from 'react';
import { PageTab } from '../types';
import { CAMPUSES_DATA } from '../data/preschoolExtendedData';
import { MapPin, Phone, Mail, Clock, CircleCheck as CheckCircle2, Calendar, Sparkles, Navigation, Copy, Check, Building, Bus, ShieldCheck, Compass, ArrowRight, ExternalLink, MessageCircle, Car, Heart, Baby } from 'lucide-react';

interface CampusesViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const CampusesView: React.FC<CampusesViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const campus = CAMPUSES_DATA[0];
  const [copied, setCopied] = useState(false);
  const [searchArea, setSearchArea] = useState('');
  const [transitEstimate, setTransitEstimate] = useState<string | null>(null);

  const googleMapsDirectionsUrl = campus.googleMapUrl;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(campus.address);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleProximityCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchArea.trim()) return;

    const area = searchArea.toLowerCase();
    if (area.includes('naganathapura') || area.includes('doctor layout') || area.includes('hosa')) {
      setTransitEstimate('📍 Extremely Close! ~2 to 4 mins via Hosa Main Road. School van doorstep pickup available.');
    } else if (area.includes('electronic city') || area.includes('ecity') || area.includes('phase')) {
      setTransitEstimate('📍 ~7 to 10 mins from Electronic City (Phase 1 & 2). Dedicated daily school van route available.');
    } else if (area.includes('singasandra') || area.includes('kudlu') || area.includes('hosur')) {
      setTransitEstimate('📍 ~6 to 9 mins via Hosur Main Road corridor. School van route actively covers this area.');
    } else if (area.includes('kasavanahalli') || area.includes('haralur') || area.includes('jail')) {
      setTransitEstimate('📍 ~8 to 12 mins via Central Jail Road / Kasavanahalli. School bus service operational.');
    } else {
      setTransitEstimate(`📍 We provide school van pickup and drop services across a 6 km radius including ${searchArea}. Contact our transport desk for exact pickup timings!`);
    }
  };

  const nearbyLandmarks = [
    { name: 'Hosa Road Main Junction', time: '2 mins', dist: '0.6 km' },
    { name: 'Electronic City Flyover', time: '8 mins', dist: '2.8 km' },
    { name: 'Central Jail Road / Kasavanahalli', time: '5 mins', dist: '1.9 km' },
    { name: 'Singasandra / Kudlu Gate', time: '7 mins', dist: '2.5 km' },
    { name: 'Amrita Vishwa Vidyapeetham', time: '4 mins', dist: '1.4 km' },
  ];

  return (
    <div id="find-campus-page-container" className="w-full bg-[#FFF9EC] py-8 sm:py-14 text-[#173B5E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-extrabold uppercase tracking-wide shadow-xs">
            <Building className="w-3.5 h-3.5" /> Our Bengaluru Campus Location
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-black text-[#173B5E] tracking-tight">
            Visit <span className="text-[#F4511E]">A Kid’s Pre School</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-700 font-medium leading-relaxed">
            Conveniently situated in Doctor Layout on Hosa Road, Naganathapura, Bengaluru. Built with child safety, cheerful natural lighting, and play-based exploratory environments.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MAIN INTERACTIVE MAP & CAMPUS CARD DUAL-COLUMN */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Map & Route Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-5">
            <div className="bg-white rounded-3xl p-4 sm:p-6 border-4 border-[#FFD21F] shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl bg-orange-100 text-[#F4511E] flex items-center justify-center font-black">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h2 className="font-heading font-extrabold text-base sm:text-lg text-[#173B5E]">
                      Live Interactive Campus Map
                    </h2>
                    <p className="text-xs text-gray-500 font-medium">
                      Zoom, pan, and explore our neighborhood location
                    </p>
                  </div>
                </div>

                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-bold text-xs shadow-sm transition-all"
                >
                  <Navigation className="w-3.5 h-3.5 text-[#FFD21F]" />
                  <span>Open in Google Maps</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              </div>

              {/* Embedded Google Map iframe */}
              <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden border-2 border-orange-100 bg-gray-100 shadow-inner">
                <iframe
                  title="A Kids Pre School Bengaluru Location Map"
                  src="https://maps.google.com/maps?q=12.8692084,77.6668455&hl=en&z=16&output=embed"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />

                {/* Floating Quick Pill over Map */}
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs px-3.5 py-1.5 rounded-full border border-orange-200 shadow-md flex items-center gap-2 pointer-events-none text-xs font-bold text-[#173B5E]">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5BC85A]"></span>
                  <span>A Kid's Pre School • Bengaluru</span>
                </div>
              </div>

              {/* Quick Map Action Buttons Bar */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <a
                  href={googleMapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#173B5E] hover:bg-[#204a74] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <Car className="w-4 h-4 text-[#FFD21F]" /> Get Driving Route
                </a>

                <button
                  type="button"
                  onClick={handleCopyAddress}
                  className="py-2.5 px-3 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F4511E] border border-orange-200 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-green-700">Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" />
                      <span>Copy Exact Address</span>
                    </>
                  )}
                </button>

                <a
                  href="https://wa.me/?text=Hello!%20I%20would%20like%20directions%20to%20A%20Kid's%20Pre%20School%20campus%20on%20Hosa%20Road."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-2.5 px-3 rounded-xl bg-[#5BC85A] hover:bg-[#48b047] text-white font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> Ask on WhatsApp
                </a>
              </div>
            </div>

            {/* Neighborhood Transit & Van Route Checker */}
            <div className="bg-white rounded-3xl p-6 border-3 border-orange-100 shadow-md space-y-4">
              <div className="flex items-center gap-2.5">
                <Bus className="w-5 h-5 text-[#29B6F6]" />
                <h3 className="font-heading font-extrabold text-base text-[#173B5E]">
                  Check Van Pickup & Proximity to Your Home
                </h3>
              </div>

              <form onSubmit={handleProximityCheck} className="flex flex-col sm:flex-row items-center gap-2">
                <div className="relative flex-1 w-full">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Enter locality (e.g. Hosa Road, Electronic City, Singasandra...)"
                    value={searchArea}
                    onChange={(e) => setSearchArea(e.target.value)}
                    className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFF9EC] border border-gray-200 text-xs sm:text-sm font-semibold text-[#173B5E] focus:outline-none focus:border-[#F4511E]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer shrink-0"
                >
                  Check Route
                </button>
              </form>

              {transitEstimate && (
                <div className="p-3 rounded-xl bg-green-50 text-green-900 text-xs font-bold flex items-start gap-2 border border-green-200 animate-fade-in leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                  <span>{transitEstimate}</span>
                </div>
              )}

              {/* Verified Van Route Tags */}
              <div className="space-y-1.5 pt-2 border-t border-gray-100">
                <div className="text-[11px] font-extrabold text-gray-500 uppercase tracking-wider">
                  Active Door-to-Door Van Coverage Areas:
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {campus.busRoutes.map((route, rIdx) => (
                    <span
                      key={rIdx}
                      className="px-2.5 py-1 rounded-full bg-[#E1F5FE] text-[#0288D1] text-xs font-bold border border-blue-200 flex items-center gap-1"
                    >
                      🚌 {route}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Campus Details, Timings & Quick Booking (5 cols) */}
          <div className="lg:col-span-5 space-y-5">
            {/* Main Campus Card */}
            <div className="bg-white rounded-3xl overflow-hidden border-4 border-[#FFD21F] shadow-xl">
              <div className="relative h-48 sm:h-56 bg-orange-100 overflow-hidden">
                <img
                  src={campus.coverImage}
                  alt={campus.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-black shadow-md flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5" /> Flagship Preschool
                </div>

                <div className="absolute bottom-3.5 left-4 right-4 text-white">
                  <h3 className="font-heading text-xl font-extrabold text-white">
                    {campus.name}
                  </h3>
                  <p className="text-xs text-orange-200 font-medium mt-0.5">
                    {campus.tagline}
                  </p>
                </div>
              </div>

              <div className="p-6 space-y-4">
                {/* Official Address Box */}
                <div className="bg-[#FFF9EC] p-3.5 rounded-2xl border border-orange-200 space-y-1">
                  <div className="text-[10px] text-[#F4511E] font-black uppercase tracking-wider flex items-center gap-1">
                    <MapPin className="w-3 h-3" /> Official Campus Address
                  </div>
                  <p className="text-xs font-bold text-[#173B5E] leading-relaxed">
                    156, Doctor layout, 1st main road, Hosa Rd, Naganathapura, Bengaluru, Karnataka 560100, India
                  </p>
                  <p className="text-[11px] text-gray-500 font-medium">
                    (Landmark: Doctor Layout 1st Main, accessible via Hosa Road / Central Jail Road corridor)
                  </p>
                </div>

                {/* Key Timings & Contacts */}
                <div className="space-y-2.5 text-xs text-gray-700 font-medium">
                  <div className="flex items-start gap-2.5">
                    <Clock className="w-4 h-4 text-[#29B6F6] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173B5E]">Visiting & Office Hours:</span>
                      <p className="text-gray-600">{campus.timings}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Phone className="w-4 h-4 text-[#F4511E] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173B5E]">Admissions Contact:</span>
                      <p className="text-gray-600">{campus.phone}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2.5">
                    <Mail className="w-4 h-4 text-[#5BC85A] shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold text-[#173B5E]">Email Desk:</span>
                      <p className="text-gray-600">{campus.email}</p>
                    </div>
                  </div>
                </div>

                {/* Campus Infrastructure Badges */}
                <div className="space-y-2 pt-2 border-t border-gray-100">
                  <div className="text-xs font-black text-[#173B5E] uppercase tracking-wider">
                    Infrastructure & Safety Highlights:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                    {campus.features.map((feat, fIdx) => (
                      <div
                        key={fIdx}
                        className="px-2.5 py-1.5 rounded-xl bg-orange-50/80 text-[#173B5E] text-[11px] font-bold border border-orange-100 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#5BC85A] shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Primary CTA Buttons */}
                <div className="pt-3 space-y-2">
                  <button
                    onClick={() => onNavigate('book-tour')}
                    className="w-full py-3 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 hover:scale-[1.02]"
                  >
                    <Calendar className="w-4 h-4 text-[#FFD21F]" /> Schedule Campus Tour 🦁
                  </button>

                  <button
                    onClick={onOpenAdmissionModal}
                    className="w-full py-2.5 rounded-2xl bg-[#173B5E] hover:bg-[#204a74] text-white font-bold text-xs transition-colors cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" /> Apply for 2026–27 Admission
                  </button>
                </div>
              </div>
            </div>

            {/* Nearby Distances Table */}
            <div className="bg-white rounded-3xl p-5 border-2 border-orange-100 shadow-md space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#173B5E] flex items-center gap-1.5">
                  <Compass className="w-3.5 h-3.5 text-[#F4511E]" /> Nearby Major Landmarks
                </h4>
                <span className="text-[10px] text-gray-400 font-bold">Estimated Commute</span>
              </div>

              <div className="divide-y divide-gray-100 text-xs font-medium">
                {nearbyLandmarks.map((lm, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <span className="text-gray-700">{lm.name}</span>
                    <div className="text-right">
                      <span className="font-bold text-[#F4511E]">{lm.time}</span>
                      <span className="text-[10px] text-gray-400 block">{lm.dist}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CAMPUS FACILITIES & PHOTO SHOWCASE */}
        {/* ========================================================================= */}
        <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-xl space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="px-3.5 py-1 rounded-full bg-orange-100 text-[#F4511E] text-xs font-extrabold uppercase tracking-wider">
              A Glimpse Inside
            </span>
            <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E]">
              Explore Our Purpose-Built Learning Spaces
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 font-medium">
              Every corner of our Bengaluru campus is thoughtfully sanitized, brightly lit, and structured to spark natural curiosity.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="rounded-2xl overflow-hidden border-2 border-orange-100 group">
              <div className="h-44 overflow-hidden bg-yellow-50">
                <img
                  src="/lion-1.jpg"
                  alt="Sunny Montessori Classrooms"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/lion%201.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-[#FFF9EC]">
                <h4 className="font-heading font-bold text-sm text-[#173B5E]">Sensory Montessori Lab</h4>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  Child-height open wooden shelves with self-correcting sensorial apparatus and phonics cards.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-orange-100 group">
              <div className="h-44 overflow-hidden bg-orange-50">
                <img
                  src="/lion-2.jpg"
                  alt="Leo Play & Activity Zone"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/lion%202.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-[#FFF9EC]">
                <h4 className="font-heading font-bold text-sm text-[#173B5E]">Indoor Soft Play Zone</h4>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  EPDM cushioned rubber turf, obstacle balance logs, mini ball pits, and active motor circuits.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-orange-100 group">
              <div className="h-44 overflow-hidden bg-blue-50">
                <img
                  src="/lion-3.jpg"
                  alt="Creative Arts & Story Den"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/lion%203.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-[#FFF9EC]">
                <h4 className="font-heading font-bold text-sm text-[#173B5E]">Story Castle & Puppetry</h4>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  Cozy amphitheater with hand puppets, illustrated picture storybooks, and roleplay trunks.
                </p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden border-2 border-orange-100 group">
              <div className="h-44 overflow-hidden bg-green-50">
                <img
                  src="/lion-4.jpg"
                  alt="Hygienic Dining & Rest Haven"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/lion%204.jpg';
                  }}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4 bg-[#FFF9EC]">
                <h4 className="font-heading font-bold text-sm text-[#173B5E]">Clean Dining & Rest Suite</h4>
                <p className="text-xs text-gray-600 mt-1 font-medium">
                  Nut-free hygienic snack kitchen and temperature-controlled peaceful nap cots.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom Banner inside Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-[#173B5E] to-[#204a74] text-white flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#FFD21F]">
                Planning a Visit to Our Campus?
              </h4>
              <p className="text-xs text-white/80 font-medium">
                Walkthroughs are held Monday through Saturday with guided teacher observation sessions.
              </p>
            </div>

            <div className="flex items-center gap-2.5 shrink-0">
              <button
                onClick={() => onNavigate('book-tour')}
                className="px-6 py-2.5 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-all cursor-pointer flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FFD21F]" /> Book Tour Now
              </button>

              <a
                href={googleMapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs border border-white/20 transition-all flex items-center gap-1"
              >
                <Navigation className="w-3.5 h-3.5 text-[#FFD21F]" /> Driving Map
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
