import React, { useState } from 'react';
import {
  LeoArtist,
  LeoSuper,
  LeoReader,
  LeoMusic,
  StarDeco,
  SunshineDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { PageTab } from '../types';
import { GALLERY_ITEMS } from '../data/preschoolData';
import {
  Image as ImageIcon,
  Film,
  Download,
  Filter,
  Maximize2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Calendar,
} from 'lucide-react';

interface GalleryViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const GalleryView: React.FC<GalleryViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = [
    'All',
    'Classrooms & Learning',
    'Outdoor Play & Sports',
    'Creative Arts & Studios',
    'Celebrations & Annual Day',
    'Sensory & Science',
  ];

  const filteredPhotos = GALLERY_ITEMS.filter((item) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Classrooms & Learning') return item.category.includes('Class') || item.category.includes('Montessori');
    if (selectedCategory === 'Outdoor Play & Sports') return item.category.includes('Outdoor') || item.category.includes('Play');
    if (selectedCategory === 'Creative Arts & Studios') return item.category.includes('Art') || item.category.includes('Music');
    if (selectedCategory === 'Celebrations & Annual Day') return item.category.includes('Celebration') || item.category.includes('Annual');
    if (selectedCategory === 'Sensory & Science') return item.category.includes('Sensory') || item.category.includes('STEM');
    return true;
  });

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextLightboxPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredPhotos.length);
  };

  const prevLightboxPhoto = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  return (
    <div id="gallery-page-container" className="w-full bg-[#FFF9EC]">
      {/* Header Banner */}
      <section className="relative bg-[#173B5E] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-6 left-8 opacity-25 animate-float pointer-events-none">
          <StarDeco size={36} color="#FFD21F" />
        </div>
        <div className="absolute bottom-6 right-8 opacity-25 animate-float-reverse pointer-events-none">
          <SunshineDeco size={60} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFD21F]/30 text-[#FFD21F] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
            <span>📸 Life At Preschool</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            A VISUAL JOURNEY OF <br />
            <span className="text-[#FFD21F]">SMILES, DISCOVERY & PLAY.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Take a candid look at the daily laughter, sensory discoveries, creative messiness, and magical celebrations at A Kid’s Pre School.
          </p>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <section className="py-8 bg-white border-b border-orange-200 sticky top-20 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Filter className="w-4 h-4 text-gray-400 shrink-0 mr-1" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#F4511E] text-white shadow-md'
                    : 'bg-[#FFF9EC] text-[#173B5E] hover:bg-orange-100 border border-orange-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Photo Gallery Masonry Grid */}
      <section className="py-12 sm:py-20 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((item, idx) => (
              <div
                key={item.id}
                onClick={() => openLightbox(idx)}
                className="group relative bg-white rounded-3xl overflow-hidden shadow-md border-3 border-white hover:border-[#FFD21F] cursor-pointer transition-all duration-300 hover:-translate-y-1.5"
              >
                <div className="aspect-4/3 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                </div>

                <div className="p-5">
                  <div className="flex items-center justify-between text-xs font-bold text-[#F4511E] mb-1">
                    <span className="uppercase tracking-wider">{item.category}</span>
                    <Maximize2 className="w-4 h-4 text-gray-400 group-hover:text-[#F4511E] transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#173B5E] group-hover:text-[#F4511E] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-600 font-medium mt-1 line-clamp-2">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <div
          id="gallery-fullscreen-lightbox"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fade-in"
          onClick={closeLightbox}
        >
          <div
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFD21F]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#173B5E] text-white flex items-center justify-center font-bold hover:bg-[#F4511E] transition-colors"
            >
              ✕
            </button>

            {/* Navigation buttons */}
            <button
              onClick={prevLightboxPhoto}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#173B5E]/80 text-white flex items-center justify-center hover:bg-[#F4511E] transition-colors"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <button
              onClick={nextLightboxPhoto}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-[#173B5E]/80 text-white flex items-center justify-center hover:bg-[#F4511E] transition-colors"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="max-h-[70vh] bg-black flex items-center justify-center">
              <img
                src={filteredPhotos[lightboxIndex].image}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[70vh] w-auto max-w-full object-contain"
              />
            </div>

            <div className="p-6 bg-[#FFF9EC]">
              <span className="text-xs font-extrabold uppercase text-[#F4511E]">
                {filteredPhotos[lightboxIndex].category}
              </span>
              <h3 className="font-heading font-black text-2xl text-[#173B5E] mt-0.5">
                {filteredPhotos[lightboxIndex].title}
              </h3>
              <p className="text-sm text-gray-700 font-medium mt-1">
                {filteredPhotos[lightboxIndex].desc}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Mascot Coloring Sheets Section */}
      <section className="py-16 sm:py-20 bg-white border-t-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD21F]/20 text-[#173B5E] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Free Download For Kids
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#173B5E] tracking-tight">
              LEO’S PRINTABLE COLORING SHEETS 🎨
            </h2>
            <p className="text-sm text-gray-600 font-medium mt-1">
              Download and print fun activity pages of Leo the Lion for your little artist at home!
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-[#FFF9EC] rounded-3xl p-6 border-3 border-[#F4511E] text-center flex flex-col items-center justify-between">
              <LeoSuper size={140} />
              <h4 className="font-heading font-bold text-base text-[#173B5E] mt-2">Leo the Superhero</h4>
              <button
                onClick={() => window.print()}
                className="mt-4 px-4 py-2 rounded-xl bg-[#F4511E] text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#E64A19]"
              >
                <Download className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>

            <div className="bg-[#FFF9EC] rounded-3xl p-6 border-3 border-[#29B6F6] text-center flex flex-col items-center justify-between">
              <LeoArtist size={140} />
              <h4 className="font-heading font-bold text-base text-[#173B5E] mt-2">Leo the Little Artist</h4>
              <button
                onClick={() => window.print()}
                className="mt-4 px-4 py-2 rounded-xl bg-[#29B6F6] text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#0288D1]"
              >
                <Download className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>

            <div className="bg-[#FFF9EC] rounded-3xl p-6 border-3 border-[#8B5CF6] text-center flex flex-col items-center justify-between">
              <LeoMusic size={140} />
              <h4 className="font-heading font-bold text-base text-[#173B5E] mt-2">Leo’s Musical Joy</h4>
              <button
                onClick={() => window.print()}
                className="mt-4 px-4 py-2 rounded-xl bg-[#8B5CF6] text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#7C3AED]"
              >
                <Download className="w-4 h-4" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
