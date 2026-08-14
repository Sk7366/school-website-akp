import React from 'react';
import { Instagram, Youtube, Facebook, MessageCircle } from 'lucide-react';

interface FloatingSocialsProps {
  onOpenAdmissionModal?: () => void;
}

export const FloatingSocials: React.FC<FloatingSocialsProps> = () => {
  return (
    <aside
      id="floating-social-bar"
      aria-label="Social media and instant messaging links"
      className="hidden md:flex fixed left-4 top-1/2 -translate-y-1/2 z-40 flex-col gap-2.5 bg-white/95 backdrop-blur-md p-2 rounded-2xl shadow-xl border-2 border-[#FFD21F]/60 animate-fade-in"
    >
      {/* WhatsApp Quick Connect */}
      <a
        href="https://wa.me/?text=Hi%20A%20Kid's%20Pre%20School,%20I%20would%20like%20to%20know%20about%20admissions!"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-[#5BC85A] hover:bg-[#4CAF50] text-white flex items-center justify-center transition-all hover:scale-110 shadow-md group relative"
        aria-label="Chat with school on WhatsApp"
      >
        <MessageCircle className="w-5 h-5" />
        <span className="absolute left-12 px-2.5 py-1 bg-[#173B5E] text-white text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          WhatsApp Us 💬
        </span>
      </a>

      {/* Instagram */}
      <a
        href="https://instagram.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#F4511E] to-[#FF4F6D] text-white flex items-center justify-center transition-all hover:scale-110 shadow-md group relative"
        aria-label="Follow us on Instagram"
      >
        <Instagram className="w-5 h-5" />
        <span className="absolute left-12 px-2.5 py-1 bg-[#173B5E] text-white text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Instagram 📸
        </span>
      </a>

      {/* YouTube */}
      <a
        href="https://youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-[#E53935] hover:bg-[#D32F2F] text-white flex items-center justify-center transition-all hover:scale-110 shadow-md group relative"
        aria-label="Watch school videos on YouTube"
      >
        <Youtube className="w-5 h-5" />
        <span className="absolute left-12 px-2.5 py-1 bg-[#173B5E] text-white text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          YouTube Channel 🎬
        </span>
      </a>

      {/* Facebook */}
      <a
        href="https://facebook.com"
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 rounded-xl bg-[#1E88E5] hover:bg-[#1976D2] text-white flex items-center justify-center transition-all hover:scale-110 shadow-md group relative"
        aria-label="Follow us on Facebook"
      >
        <Facebook className="w-5 h-5" />
        <span className="absolute left-12 px-2.5 py-1 bg-[#173B5E] text-white text-xs font-bold rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          Facebook Page 📘
        </span>
      </a>
    </aside>
  );
};
