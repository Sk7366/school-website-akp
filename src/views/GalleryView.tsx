import React, { useState, useEffect, useCallback } from 'react';
import { StarDeco, SunshineDeco } from '../components/MascotIcons';
import { PageTab } from '../types';
import { GALLERY_ITEMS, GalleryItem } from '../data/galleryData';
import {
  Filter,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  X,
  Play,
  Camera,
  Film,
  Sparkles,
  Calendar,
} from 'lucide-react';

interface GalleryViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

type FilterTab = 'All' | 'Celebrations' | 'Activities';

const SIZE_CLASSES: Record<GalleryItem['size'], string> = {
  small: 'sm:col-span-1 sm:row-span-1',
  medium: 'sm:col-span-1 sm:row-span-1 lg:col-span-1 lg:row-span-1',
  wide: 'sm:col-span-2 sm:row-span-1',
  tall: 'sm:col-span-1 sm:row-span-2',
  large: 'sm:col-span-2 sm:row-span-2',
};

const ASPECT_CLASSES: Record<GalleryItem['size'], string> = {
  small: 'aspect-square',
  medium: 'aspect-4/3',
  wide: 'aspect-16/9',
  tall: 'aspect-3/4',
  large: 'aspect-square',
};

export const GalleryView: React.FC<GalleryViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [activeTab, setActiveTab] = useState<FilterTab>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems = GALLERY_ITEMS.filter((item) => {
    if (activeTab === 'All') return true;
    return item.category === activeTab;
  });

  const openLightbox = (index: number) => setLightboxIndex(index);
  const closeLightbox = () => setLightboxIndex(null);

  const nextItem = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev + 1) % filteredItems.length,
    );
  }, [filteredItems.length]);

  const prevItem = useCallback(() => {
    setLightboxIndex((prev) =>
      prev === null ? prev : (prev - 1 + filteredItems.length) % filteredItems.length,
    );
  }, [filteredItems.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextItem();
      if (e.key === 'ArrowLeft') prevItem();
    };
    window.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [lightboxIndex, nextItem, prevItem]);

  const tabs: { label: FilterTab; icon: React.ReactNode }[] = [
    { label: 'All', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { label: 'Celebrations', icon: <Calendar className="w-3.5 h-3.5" /> },
    { label: 'Activities', icon: <Camera className="w-3.5 h-3.5" /> },
  ];

  const photoCount = GALLERY_ITEMS.filter((i) => i.type === 'photo').length;
  const videoCount = GALLERY_ITEMS.filter((i) => i.type === 'video').length;

  return (
    <div id="gallery-page-container" className="w-full bg-[#FFF9EC]">
      {/* ── Header Banner ─────────────────────────────────────── */}
      <section className="relative bg-gradient-to-br from-[#173B5E] via-[#1d4a7a] to-[#173B5E] text-white py-16 sm:py-24 overflow-hidden">
        {/* Decorative floating elements */}
        <div className="absolute top-6 left-6 opacity-20 animate-float pointer-events-none">
          <StarDeco size={36} color="#FFD21F" />
        </div>
        <div className="absolute bottom-8 right-10 opacity-20 animate-float-reverse pointer-events-none">
          <SunshineDeco size={60} />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-10 animate-float pointer-events-none">
          <StarDeco size={24} color="#5ED7E8" />
        </div>
        <div className="absolute bottom-1/4 left-1/3 opacity-10 animate-float-reverse pointer-events-none">
          <StarDeco size={20} color="#FF4F6D" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFD21F]/30 text-[#FFD21F] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
            <span>📸 Life At Preschool</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1] mb-3">
            Little Moments, <span className="text-[#FFD21F]">Big Memories</span>
          </h1>

          <p className="text-white/85 text-base sm:text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            A glimpse into the colourful days of learning, laughter, creativity
            and celebration at A Kid's Pre School.
          </p>

          {/* Quick stats */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#FFD21F]">
              <Camera className="w-4 h-4" />
              <span>{photoCount} Photos</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-white/30" />
            <div className="flex items-center gap-1.5 text-sm font-bold text-[#5ED7E8]">
              <Film className="w-4 h-4" />
              <span>{videoCount} Videos</span>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-8 sm:h-12 fill-[#FFF9EC]"
          >
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z" />
          </svg>
        </div>
      </section>

      {/* ── Filter Tabs ────────────────────────────────────────── */}
      <section className="py-6 bg-white border-b border-orange-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.label
                    ? 'bg-[#F4511E] text-white shadow-md shadow-[#F4511E]/30'
                    : 'bg-[#FFF9EC] text-[#173B5E] hover:bg-orange-100 border border-orange-200'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Gallery Masonry Grid ───────────────────────────────── */}
      <section className="py-12 sm:py-16 bg-[#FFF9EC] relative overflow-hidden">
        {/* Subtle background decorations */}
        <div className="absolute top-10 left-4 opacity-[0.04] pointer-events-none">
          <StarDeco size={80} color="#F4511E" />
        </div>
        <div className="absolute bottom-20 right-4 opacity-[0.04] pointer-events-none">
          <SunshineDeco size={100} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 auto-rows-[minmax(160px,auto)]">
            {filteredItems.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className={`group relative rounded-2xl overflow-hidden shadow-md border-2 border-white hover:border-[#FFD21F] cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl ${SIZE_CLASSES[item.size]} ${ASPECT_CLASSES[item.size]}`}
              >
                {item.type === 'photo' ? (
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                ) : (
                  <div className="relative w-full h-full bg-[#173B5E]">
                    <video
                      src={item.src}
                      preload="metadata"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    {/* Play button overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#F4511E] flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 sm:w-6 sm:h-6 text-white ml-0.5" fill="white" />
                      </div>
                    </div>
                    {/* Video badge */}
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-[#173B5E]/80 text-white text-[10px] font-bold flex items-center gap-1">
                      <Film className="w-2.5 h-2.5" />
                      <span>VIDEO</span>
                    </div>
                  </div>
                )}

                {/* Caption overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-3 sm:p-4">
                  <div className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-[#FFD21F] mb-0.5">
                    {item.type === 'video' ? (
                      <Film className="w-3 h-3" />
                    ) : (
                      <Camera className="w-3 h-3" />
                    )}
                    <span>{item.category}</span>
                  </div>
                  <h3 className="font-heading font-bold text-sm sm:text-base text-white leading-tight">
                    {item.title}
                  </h3>
                </div>

                {/* Always-visible small label (non-hover) */}
                <div className="absolute bottom-0 left-0 right-0 p-2.5 bg-gradient-to-t from-black/50 to-transparent group-hover:opacity-0 transition-opacity duration-200">
                  <p className="text-[11px] font-bold text-white/90 truncate">
                    {item.title}
                  </p>
                </div>

                {/* Expand icon on hover */}
                <div className="absolute top-2 left-2 w-7 h-7 rounded-full bg-white/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-sm">
                  <Maximize2 className="w-3.5 h-3.5 text-[#F4511E]" />
                </div>
              </div>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-medium">
              No items in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* ── Lightbox / Modal ──────────────────────────────────── */}
      {lightboxIndex !== null && filteredItems[lightboxIndex] && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          {/* Close button */}
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F4511E] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevItem();
            }}
            className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F4511E] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextItem();
            }}
            className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-[#F4511E] text-white flex items-center justify-center transition-colors cursor-pointer border border-white/20"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div
            className="relative max-w-5xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            {filteredItems[lightboxIndex].type === 'photo' ? (
              <img
                src={filteredItems[lightboxIndex].src}
                alt={filteredItems[lightboxIndex].title}
                className="max-h-[75vh] w-auto max-w-full object-contain rounded-2xl shadow-2xl border-2 border-[#FFD21F]/30"
              />
            ) : (
              <div className="w-full max-w-4xl bg-black rounded-2xl overflow-hidden shadow-2xl border-2 border-[#FFD21F]/30">
                <video
                  src={filteredItems[lightboxIndex].src}
                  controls
                  autoPlay
                  className="w-full max-h-[75vh] object-contain"
                />
              </div>
            )}

            {/* Caption bar */}
            <div className="mt-4 text-center px-6 py-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10 max-w-lg">
              <div className="flex items-center justify-center gap-1.5 text-[11px] font-extrabold uppercase tracking-wider text-[#FFD21F] mb-1">
                {filteredItems[lightboxIndex].type === 'video' ? (
                  <Film className="w-3.5 h-3.5" />
                ) : (
                  <Camera className="w-3.5 h-3.5" />
                )}
                <span>{filteredItems[lightboxIndex].category}</span>
              </div>
              <h3 className="font-heading font-black text-lg sm:text-xl text-white">
                {filteredItems[lightboxIndex].title}
              </h3>
              <p className="text-sm text-white/70 font-medium mt-1">
                {filteredItems[lightboxIndex].desc}
              </p>
              <p className="text-[11px] text-white/40 font-medium mt-2">
                {lightboxIndex + 1} of {filteredItems.length}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* ── CTA Section ───────────────────────────────────────── */}
      <section className="py-14 sm:py-20 bg-white border-t-2 border-orange-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21F]/15 text-[#173B5E] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
            <span>🦁 Come See It In Person</span>
          </div>
          <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#173B5E] tracking-tight mb-3">
            Want to visit our campus?
          </h2>
          <p className="text-sm sm:text-base text-gray-600 font-medium mb-6 max-w-xl mx-auto">
            Book a campus tour and experience the joy, colour, and care of A
            Kid's Pre School firsthand.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('book-tour')}
              className="px-7 py-3.5 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-black text-sm shadow-lg shadow-[#F4511E]/30 hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
            >
              📅 Book a Campus Tour
            </button>
            <button
              onClick={onOpenAdmissionModal}
              className="px-7 py-3.5 rounded-2xl bg-[#FFD21F] hover:bg-[#FFC400] text-[#173B5E] font-heading font-black text-sm shadow-md hover:-translate-y-0.5 transition-all cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 inline mr-1.5 text-[#F4511E]" />
              Enquire Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
