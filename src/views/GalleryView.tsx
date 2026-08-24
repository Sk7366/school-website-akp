import React, { useState, useRef, useEffect, useCallback } from 'react';
import { StarDeco, SunshineDeco } from '../components/MascotIcons';
import { PageTab } from '../types';
import { GALLERY_MEDIA, GalleryMediaItem } from '../data/preschoolData';
import {
  Filter,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Play,
  X,
  Star,
} from 'lucide-react';

/* ── Tiny decorative SVG components ── */
const PencilDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 60 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 20 C 12 4, 28 4, 36 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M36 20 C 44 4, 52 4, 58 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity=".5" />
  </svg>
);

const CloudDoodle: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 80 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="30" cy="26" rx="22" ry="14" fill="currentColor" opacity=".12" />
    <ellipse cx="52" cy="24" rx="18" ry="12" fill="currentColor" opacity=".08" />
    <ellipse cx="20" cy="24" rx="14" ry="10" fill="currentColor" opacity=".06" />
  </svg>
);

const TinyStar: React.FC<{ className?: string; size?: number }> = ({ className = '', size = 16 }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 20 20" fill="currentColor">
    <polygon points="10,0 12.5,7.5 20,7.5 14,12.5 16,20 10,15 4,20 6,12.5 0,7.5 7.5,7.5" />
  </svg>
);

const CrayonShape: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg className={className} viewBox="0 0 30 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="8" width="14" height="40" rx="3" fill="currentColor" opacity=".08" />
    <polygon points="15,0 22,8 8,8" fill="currentColor" opacity=".12" />
  </svg>
);

/* ── Category filter config ── */
const TABS = ['All', 'Celebrations', 'Activities'] as const;
type Tab = (typeof TABS)[number];

interface GalleryViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({ onNavigate, onOpenAdmissionModal }) => {
  const [tab, setTab] = useState<Tab>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  /* ── filtering ── */
  const filtered = GALLERY_MEDIA.filter((item) => {
    if (tab === 'All') return true;
    return item.group === tab;
  });

  /* ── lightbox helpers ── */
  const openLb = (i: number) => setLightboxIdx(i);
  const closeLb = () => setLightboxIdx(null);
  const nextLb = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx + 1) % filtered.length);
  }, [lightboxIdx, filtered.length]);
  const prevLb = useCallback(() => {
    if (lightboxIdx === null) return;
    setLightboxIdx((lightboxIdx - 1 + filtered.length) % filtered.length);
  }, [lightboxIdx, filtered.length]);

  /* ── keyboard nav ── */
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') nextLb();
      if (e.key === 'ArrowLeft') prevLb();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx, nextLb, prevLb]);

  /* ── pause video on close ── */
  useEffect(() => {
    if (lightboxIdx === null && videoRef.current) {
      videoRef.current.pause();
    }
  }, [lightboxIdx]);

  /* ── helper: which items are "large" in the masonry (every ~4th) ── */
  const isLarge = (i: number) => i % 5 === 0 || i % 5 === 3;

  const current = lightboxIdx !== null ? filtered[lightboxIdx] : null;

  return (
    <div className="w-full bg-[#FFF9EC] overflow-hidden">
      {/* ════════════ HEADER ════════════ */}
      <section className="relative bg-[#173B5E] text-white py-16 sm:py-24 overflow-hidden">
        {/* deco */}
        <div className="absolute top-6 left-8 opacity-25 animate-float pointer-events-none">
          <StarDeco size={36} color="#FFD21F" />
        </div>
        <div className="absolute bottom-6 right-8 opacity-25 animate-float-reverse pointer-events-none">
          <SunshineDeco size={60} />
        </div>
        <div className="absolute top-10 right-1/4 text-[#FFD21F]/10 pointer-events-none">
          <CloudDoodle className="w-20 h-10" />
        </div>
        <div className="absolute bottom-10 left-1/4 text-[#FFD21F]/10 pointer-events-none">
          <TinyStar className="w-4 h-4" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFD21F]/30 text-[#FFD21F] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
            <span>📸 Life At Preschool</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            LITTLE MOMENTS.{' '}
            <span className="text-[#FFD21F]">BIG MEMORIES.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            A glimpse into the colourful days of learning, laughter, creativity and celebration at A Kid's Pre School.
          </p>
        </div>
      </section>

      {/* ════════════ TABS ════════════ */}
      <section className="py-6 bg-white border-b border-orange-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-xl text-sm font-heading font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  tab === t
                    ? 'bg-[#F4511E] text-white shadow-md'
                    : 'bg-[#FFF9EC] text-[#173B5E] hover:bg-orange-100 border border-orange-200'
                }`}
              >
                {t}
                <span className="ml-1.5 text-xs opacity-70">
                  ({t === 'All' ? GALLERY_MEDIA.length : GALLERY_MEDIA.filter((i) => i.group === t).length})
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════ GALLERY GRID ════════════ */}
      <section className="py-12 sm:py-20 bg-[#FFF9EC] relative">
        {/* Subtle decorative background elements */}
        <div className="absolute top-8 left-6 text-orange-300/20 pointer-events-none hidden lg:block">
          <PencilDoodle className="w-16 h-8" />
        </div>
        <div className="absolute top-1/3 right-4 text-sky-300/20 pointer-events-none hidden lg:block">
          <CloudDoodle className="w-24 h-12" />
        </div>
        <div className="absolute bottom-16 left-10 text-yellow-400/20 pointer-events-none hidden lg:block">
          <TinyStar className="w-5 h-5" />
        </div>
        <div className="absolute bottom-1/4 right-8 text-orange-300/15 pointer-events-none hidden lg:block">
          <CrayonShape className="w-6 h-12" />
        </div>
        <div className="absolute top-2/3 left-1/3 text-green-300/15 pointer-events-none hidden lg:block">
          <TinyStar className="w-3 h-3" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Masonry-style CSS grid */}
          <div
            className="columns-1 sm:columns-2 lg:columns-3 gap-5 space-y-5"
          >
            {filtered.map((item, idx) => (
              <GalleryCard
                key={item.id}
                item={item}
                large={isLarge(idx)}
                onClick={() => openLb(idx)}
              />
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20 text-gray-400 font-heading font-bold text-lg">
              No media found in this category.
            </div>
          )}
        </div>
      </section>

      {/* ════════════ LIGHTBOX ════════════ */}
      {current && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
          onClick={closeLb}
        >
          {/* Close */}
          <button
            onClick={closeLb}
            className="absolute top-4 right-4 z-20 w-11 h-11 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Prev */}
          <button
            onClick={(e) => { e.stopPropagation(); prevLb(); }}
            className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next */}
          <button
            onClick={(e) => { e.stopPropagation(); nextLb(); }}
            className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/15 backdrop-blur text-white flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Content */}
          <div
            className="relative max-w-5xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFD21F]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              {current.type === 'video' ? (
                <video
                  ref={videoRef}
                  src={current.file}
                  controls
                  autoPlay
                  className="max-h-[70vh] w-auto max-w-full"
                />
              ) : (
                <img
                  src={current.file}
                  alt={current.title}
                  className="max-h-[70vh] w-auto max-w-full object-contain"
                />
              )}
            </div>
            <div className="p-5 sm:p-6 bg-[#FFF9EC]">
              <div className="flex items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-full bg-[#F4511E]/10 text-[#F4511E] text-[10px] font-heading font-extrabold uppercase tracking-wider">
                  {current.group}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-[#173B5E]/10 text-[#173B5E] text-[10px] font-heading font-extrabold uppercase tracking-wider">
                  {current.subcategory}
                </span>
                {current.type === 'video' && (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#8B5CF6]/10 text-[#8B5CF6] text-[10px] font-heading font-extrabold uppercase tracking-wider flex items-center gap-1">
                    <Play className="w-2.5 h-2.5" /> Video
                  </span>
                )}
              </div>
              <h3 className="font-heading font-black text-xl sm:text-2xl text-[#173B5E]">
                {current.title}
              </h3>
              <p className="text-xs text-gray-400 mt-1">
                {lightboxIdx !== null && lightboxIdx + 1} / {filtered.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

/* ════════════════════════════════════════
   GalleryCard – masonry card with hover
   ════════════════════════════════════════ */
const GalleryCard: React.FC<{
  item: GalleryMediaItem;
  large: boolean;
  onClick: () => void;
}> = ({ item, large, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl border-2 border-white hover:border-[#FFD21F] cursor-pointer transition-all duration-300 hover:-translate-y-1 break-inside-avoid ${
        large ? 'row-span-2' : ''
      }`}
    >
      {/* Image / Video thumbnail */}
      <div className={`relative overflow-hidden ${large ? 'aspect-[3/4]' : 'aspect-square'}`}>
        {item.type === 'video' ? (
          <video
            src={item.file}
            preload="metadata"
            muted
            playsInline
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <img
            src={item.file}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Video play button */}
        {item.type === 'video' && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Play className="w-6 h-6 text-[#F4511E] ml-0.5" fill="#F4511E" />
            </div>
          </div>
        )}

        {/* Photo expand icon on hover */}
        {item.type === 'photo' && (
          <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center shadow">
              <Maximize2 className="w-3.5 h-3.5 text-[#F4511E]" />
            </div>
          </div>
        )}

        {/* Title overlay at bottom on hover */}
        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-white font-heading font-bold text-sm drop-shadow-md">
            {item.title}
          </p>
        </div>
      </div>

      {/* Caption bar */}
      <div className="px-3 py-2.5 flex items-center justify-between">
        <div className="min-w-0">
          <h4 className="font-heading font-bold text-xs sm:text-sm text-[#173B5E] truncate group-hover:text-[#F4511E] transition-colors">
            {item.title}
          </h4>
          <p className="text-[10px] text-gray-400 font-medium mt-0.5 truncate">
            {item.subcategory}
          </p>
        </div>
        {item.type === 'video' && (
          <span className="shrink-0 ml-2 w-5 h-5 rounded bg-[#8B5CF6]/10 flex items-center justify-center">
            <Play className="w-2.5 h-2.5 text-[#8B5CF6]" fill="#8B5CF6" />
          </span>
        )}
      </div>
    </div>
  );
};

export default GalleryView;
