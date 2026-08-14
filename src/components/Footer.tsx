import React from 'react';
import { AKPLogo, LeoReader, StarDeco, SunshineDeco } from './MascotIcons';
import { PageTab } from '../types';
import { Phone, Mail, MapPin, Clock, Heart, MessageCircle, Instagram, Youtube, Facebook } from 'lucide-react';

interface FooterProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenAdmissionModal }) => {
  const handleNav = (tab: PageTab) => {
    onNavigate(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-footer" className="bg-[#173B5E] text-white pt-16 pb-10 relative overflow-hidden">
      {/* Decorative colored top border bar */}
      <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-[#F4511E] via-[#FFD21F] to-[#29B6F6]"></div>

      {/* Background Subtle Stars */}
      <div className="absolute top-10 right-10 opacity-20 pointer-events-none">
        <StarDeco size={40} color="#FFD21F" />
      </div>
      <div className="absolute bottom-10 left-10 opacity-15 pointer-events-none">
        <SunshineDeco size={50} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/15">
          {/* Column 1: School Identity & Leo Waving */}
          <div className="lg:col-span-2 space-y-4">
            <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-xs inline-block border border-white/10">
              <AKPLogo size={56} showText={true} />
            </div>
            <p className="text-white/80 text-sm leading-relaxed max-w-sm">
              A premium, joyful preschool world where children explore, learn, create, and grow — nurtured by certified educators and guided by our friendly mascot Leo.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://wa.me/?text=Hello%20A%20Kid's%20Pre%20School!"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#5BC85A] text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#F4511E] text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#E53935] text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-[#29B6F6] text-white flex items-center justify-center hover:scale-110 transition-transform"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-[#FFD21F] tracking-wide uppercase">
              Quick Links
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#FFD21F] transition-colors"
                >
                  About Our School
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('teaching')}
                  className="hover:text-[#FFD21F] transition-colors"
                >
                  Teaching Methodology
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('activities')}
                  className="hover:text-[#FFD21F] transition-colors"
                >
                  Activities & Exploration
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('gallery')}
                  className="hover:text-[#FFD21F] transition-colors"
                >
                  Life at Preschool Gallery
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('blog')}
                  className="hover:text-[#FFD21F] transition-colors"
                >
                  Parenting Blog & News
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('franchise')}
                  className="hover:text-[#FFD21F] transition-colors"
                >
                  Franchise Opportunities
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Academic Programs */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-[#29B6F6] tracking-wide uppercase">
              Our Programs
            </h4>
            <ul className="space-y-2 text-sm text-white/80">
              <li>
                <button
                  onClick={() => handleNav('programs')}
                  className="hover:text-[#29B6F6] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]" />
                  Playgroup (1.5 – 2.5y)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('programs')}
                  className="hover:text-[#29B6F6] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29B6F6]" />
                  Nursery (2.5 – 3.5y)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('programs')}
                  className="hover:text-[#29B6F6] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
                  Junior KG / LKG (3.5 – 4.5y)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('programs')}
                  className="hover:text-[#29B6F6] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F6D]" />
                  Senior KG / UKG (4.5 – 5.5y)
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('programs')}
                  className="hover:text-[#29B6F6] transition-colors flex items-center gap-1.5"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#8B5CF6]" />
                  Day Care & Extended Care
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Visit & Reach Us */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-base text-[#5BC85A] tracking-wide uppercase">
              Visit Campus
            </h4>
            <div className="space-y-2.5 text-xs text-white/80">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#FFD21F] shrink-0 mt-0.5" />
                <span>124 Sunshine Boulevard, Wonder District [INSERT SCHOOL ADDRESS]</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#5BC85A] shrink-0" />
                <span>+1 (555) 321-KIDS / +1 (555) 789-ROAR</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#29B6F6] shrink-0" />
                <span>admissions@akidspreschool.edu</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#FF8A3D] shrink-0" />
                <span>Mon – Fri: 8:00 AM – 6:30 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                id="footer-book-tour-btn"
                onClick={() => handleNav('book-tour')}
                className="w-full py-2.5 px-4 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-bold text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer text-center"
              >
                Schedule A Campus Visit 🦁
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-white/60 gap-4">
          <p>© 2026 A Kid’s Pre School. All rights reserved. Big Dreams Start Small.</p>
          <div className="flex items-center gap-6">
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => handleNav('contact')}
              className="hover:text-white transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={() => handleNav('admin')}
              className="text-[#FFD21F] hover:underline font-bold"
            >
              Staff Login
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
