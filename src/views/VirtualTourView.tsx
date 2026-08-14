import React, { useState } from 'react';
import { PageTab, TourStation, Hotspot } from '../types';
import { VIRTUAL_TOUR_STATIONS } from '../data/preschoolExtendedData';
import {
  Compass,
  Volume2,
  VolumeX,
  Sparkles,
  Eye,
  CheckCircle2,
  Calendar,
  Layers,
  Info,
  Maximize2,
  MapPin,
  ChevronRight,
  ShieldCheck,
  Footprints,
  Sun,
  BookOpen,
  Utensils,
  Moon,
  Smile,
} from 'lucide-react';
import { LeoTeacher, LeoSuper, LeoReader, LeoArtist, LeoMeditate } from '../components/MascotIcons';

interface VirtualTourViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const VirtualTourView: React.FC<VirtualTourViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [selectedStationId, setSelectedStationId] = useState<string>('montessori-room');
  const [activeHotspot, setActiveHotspot] = useState<Hotspot | null>(null);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);

  const currentStation =
    VIRTUAL_TOUR_STATIONS.find((s) => s.id === selectedStationId) || VIRTUAL_TOUR_STATIONS[0];

  // Speech narration helper
  const handleToggleAudioGuide = () => {
    if (!('speechSynthesis' in window)) return;

    if (isPlayingAudio) {
      window.speechSynthesis.cancel();
      setIsPlayingAudio(false);
    } else {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(currentStation.audioNarrationText);
      utterance.rate = 1.0;
      utterance.pitch = 1.1;
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
      setIsPlayingAudio(true);
    }
  };

  const renderMascot = (role: string) => {
    switch (role) {
      case 'teacher':
        return <LeoTeacher className="w-12 h-12" />;
      case 'super':
        return <LeoSuper className="w-12 h-12" />;
      case 'reader':
        return <LeoReader className="w-12 h-12" />;
      case 'artist':
        return <LeoArtist className="w-12 h-12" />;
      case 'meditate':
        return <LeoMeditate className="w-12 h-12" />;
      default:
        return <LeoTeacher className="w-12 h-12" />;
    }
  };

  return (
    <div className="w-full bg-[#FFF9EC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-extrabold uppercase tracking-wide shadow-xs">
            <Compass className="w-3.5 h-3.5" /> 360° Interactive Campus Walkthrough
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B5E]">
            Explore <span className="text-[#F4511E]">Leo’s Cheerful Classrooms</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Click pulsing interactive hotspots to discover child-safe features, sensorial equipment, and listen to Leo the Mascot’s audio guide!
          </p>
        </div>

        {/* Station Navigation Carousel Pills */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-2 justify-start sm:justify-center">
          {VIRTUAL_TOUR_STATIONS.map((station) => {
            const isSelected = station.id === selectedStationId;
            return (
              <button
                key={station.id}
                onClick={() => {
                  setSelectedStationId(station.id);
                  setActiveHotspot(null);
                  if (isPlayingAudio) {
                    window.speechSynthesis?.cancel();
                    setIsPlayingAudio(false);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#173B5E] text-[#FFD21F] shadow-lg scale-105 border-2 border-[#FFD21F]'
                    : 'bg-white text-[#173B5E] hover:bg-orange-50 border border-orange-200'
                }`}
              >
                <span>{station.title.split('&')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Main 360 Interactive Stage Card */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#FFD21F] shadow-2xl space-y-6">
          {/* Station Title & Audio Guide Bar */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-gray-100 pb-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-[#F4511E] uppercase tracking-wider">
                <MapPin className="w-3.5 h-3.5" /> {currentStation.areaName}
              </div>
              <h2 className="font-heading text-2xl sm:text-3xl font-extrabold text-[#173B5E] mt-0.5">
                {currentStation.title}
              </h2>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                {currentStation.subtitle}
              </p>
            </div>

            {/* Audio Guide Narration Button */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleToggleAudioGuide}
                className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold flex items-center gap-2 shadow-md transition-all cursor-pointer ${
                  isPlayingAudio
                    ? 'bg-[#5BC85A] text-white animate-pulse'
                    : 'bg-[#F4511E] hover:bg-[#E64A19] text-white'
                }`}
              >
                {isPlayingAudio ? (
                  <>
                    <VolumeX className="w-4 h-4" /> Pause Leo Audio
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#FFD21F]" /> Listen to Leo's Voice Guide 🦁
                  </>
                )}
              </button>

              <button
                onClick={() => onNavigate('book-tour')}
                className="px-4 py-2.5 rounded-2xl bg-[#173B5E] hover:bg-[#204a74] text-white text-xs font-extrabold shadow-md transition-all cursor-pointer hidden sm:flex items-center gap-1.5"
              >
                <Calendar className="w-3.5 h-3.5 text-[#FFD21F]" /> Book In-Person Visit
              </button>
            </div>
          </div>

          {/* Interactive Image Canvas with Pulsing Hotspots */}
          <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[540px] rounded-3xl overflow-hidden shadow-inner group select-none">
            <img
              src={currentStation.imageUrl}
              alt={currentStation.title}
              className="w-full h-full object-cover filter contrast-105 brightness-95 transition-transform duration-700 group-hover:scale-102"
            />

            {/* Ambient vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

            {/* Pulsing Hotspots */}
            {currentStation.hotspots.map((hs) => {
              const isHotspotActive = activeHotspot?.id === hs.id;
              return (
                <div
                  key={hs.id}
                  style={{ left: `${hs.x}%`, top: `${hs.y}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    onClick={() => setActiveHotspot(isHotspotActive ? null : hs)}
                    className={`relative w-10 h-10 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 cursor-pointer ${
                      isHotspotActive
                        ? 'bg-[#FFD21F] text-[#173B5E] scale-125 ring-4 ring-[#F4511E]'
                        : 'bg-[#F4511E] text-white hover:scale-110 ring-4 ring-white/80'
                    }`}
                    aria-label={hs.title}
                  >
                    <Sparkles className="w-5 h-5 animate-spin [animation-duration:4s]" />
                    <span className="absolute -inset-1 rounded-full bg-[#F4511E]/40 animate-ping pointer-events-none"></span>
                  </button>

                  {/* Hotspot Floating Title Tag on Hover */}
                  {!isHotspotActive && (
                    <div className="absolute top-12 left-1/2 -translate-x-1/2 whitespace-nowrap bg-[#173B5E]/90 text-white text-[10px] font-bold px-2.5 py-1 rounded-md shadow-md pointer-events-none">
                      {hs.title.split('&')[0]}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Active Hotspot Modal Card Overlay */}
            {activeHotspot && (
              <div className="absolute bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 bg-white/95 backdrop-blur-md rounded-2xl p-5 border-3 border-[#FFD21F] shadow-2xl z-30 animate-fade-in space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">✨</span>
                    <h4 className="font-heading font-extrabold text-base text-[#173B5E] leading-tight">
                      {activeHotspot.title}
                    </h4>
                  </div>
                  <button
                    onClick={() => setActiveHotspot(null)}
                    className="text-gray-400 hover:text-gray-700 font-black text-sm px-1"
                  >
                    ✕
                  </button>
                </div>

                <p className="text-xs text-gray-700 leading-relaxed font-medium">
                  {activeHotspot.description}
                </p>

                {/* Leo Mascot Voice Note */}
                <div className="bg-[#FFF9EC] p-3 rounded-xl border border-orange-200 flex items-start gap-2.5">
                  <span className="text-2xl shrink-0">🦁</span>
                  <div className="text-[11px] text-[#173B5E]">
                    <strong className="text-[#F4511E] font-bold">Leo's Learning Tip: </strong>
                    <span>{activeHotspot.leoTip}</span>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('book-tour')}
                  className="w-full py-2 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                >
                  <Calendar className="w-3.5 h-3.5" /> Book Tour to See This in Person
                </button>
              </div>
            )}

            {/* Bottom Status bar inside image */}
            <div className="absolute bottom-4 left-4 z-10 bg-black/60 backdrop-blur-xs px-3.5 py-1.5 rounded-full text-white text-xs font-bold flex items-center gap-2">
              <Eye className="w-4 h-4 text-[#FFD21F]" />
              <span>Tap glowing orange pins to inspect equipment</span>
            </div>
          </div>

          {/* Station Details & Highlights Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-2">
            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-heading text-lg font-extrabold text-[#173B5E]">
                About This Learning Environment
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                {currentStation.description}
              </p>

              {/* Leo Narration Text Bubble */}
              <div className="bg-[#FFF9EC] p-4 rounded-2xl border-2 border-orange-200 flex items-start gap-3.5">
                <div className="shrink-0">{renderMascot(currentStation.mascotRole)}</div>
                <div className="space-y-1">
                  <div className="text-xs font-black text-[#F4511E] uppercase">
                    Leo's Guided Walkthrough
                  </div>
                  <p className="text-xs sm:text-[13px] text-[#173B5E] italic leading-relaxed">
                    "{currentStation.audioNarrationText}"
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-[#FFF9EC] p-5 rounded-2xl border border-orange-200 space-y-3">
              <h4 className="font-heading font-extrabold text-sm text-[#173B5E] flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#5BC85A]" /> Key Facility Features
              </h4>
              <ul className="space-y-2 text-xs text-gray-700">
                {currentStation.highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-[#F4511E] font-bold">★</span>
                    <span className="font-medium">{h}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <button
                  onClick={onOpenAdmissionModal}
                  className="w-full py-2.5 rounded-xl bg-[#173B5E] hover:bg-[#204a74] text-white text-xs font-bold transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" /> Apply for 2026-27 Admissions
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
