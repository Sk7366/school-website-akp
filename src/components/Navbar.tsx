import React, { useState } from 'react';
import { AKPLogo } from './MascotIcons';
import { PageTab } from '../types';
import {
  Menu,
  X,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronDown,
  Compass,
  Calculator,
  Baby,
  Building,
  Gamepad2,
  Users,
  Smile,
} from 'lucide-react';

interface NavbarProps {
  activeTab: PageTab;
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  enquiriesCount?: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onNavigate,
  onOpenAdmissionModal,
  enquiriesCount = 0,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [interactiveDropdownOpen, setInteractiveDropdownOpen] = useState(false);

  const mainNavItems: { label: string; tab: PageTab }[] = [
    { label: 'HOME', tab: 'home' },
    { label: 'ABOUT', tab: 'about' },
    { label: 'PROGRAMS', tab: 'programs' },
    { label: 'TEACHING', tab: 'teaching' },
    { label: 'ACTIVITIES', tab: 'activities' },
    { label: 'GALLERY', tab: 'gallery' },
    { label: 'BLOG', tab: 'blog' },
    { label: 'FRANCHISE', tab: 'franchise' },
    { label: 'CONTACT', tab: 'contact' },
  ];

  const exploreFeatures: { label: string; tab: PageTab; desc: string; icon: any; badge?: string }[] = [
    {
      label: "🦁 Leo's Kids Zone",
      tab: 'kids-zone',
      desc: 'ABC Phonics Safari, Storybook & Games',
      icon: Gamepad2,
      badge: 'Interactive',
    },
    {
      label: '📱 Parent Care Portal',
      tab: 'parent-portal',
      desc: 'Daily timeline feed & Live GPS van tracker',
      icon: Baby,
      badge: 'Live',
    },
    {
      label: '💰 Tuition Fee Estimator',
      tab: 'fee-calculator',
      desc: 'Itemized fee calculator with PDF quote',
      icon: Calculator,
      badge: 'Instant',
    },
    {
      label: '🧭 360° Virtual Walkthrough',
      tab: 'virtual-tour',
      desc: 'Explore classrooms with Leo audio guide',
      icon: Compass,
      badge: '360°',
    },
    {
      label: '📍 Multi-Branch Campuses',
      tab: 'campuses',
      desc: 'Compare branches & check nearest campus',
      icon: Building,
    },
  ];

  const handleNavClick = (tab: PageTab) => {
    onNavigate(tab);
    setMobileMenuOpen(false);
    setInteractiveDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b-2 border-[#FFD21F]/50 shadow-sm transition-all duration-300">
      {/* Top micro-announcement bar with quick admissions notice */}
      <div className="bg-[#173B5E] text-white text-[11px] sm:text-xs py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FFD21F] animate-ping" />
            <span className="text-[#FFD21F] font-bold">Admissions Open 2026–27:</span>
            <span className="hidden sm:inline text-white/90">Playgroup, Nursery, Junior & Senior KG, Day Care</span>
          </div>

          <div className="flex items-center gap-3 sm:gap-4 text-xs">
            {/* Quick Link Pills in top bar */}
            <button
              onClick={() => handleNavClick('kids-zone')}
              className="hidden md:flex items-center gap-1 text-[#FFD21F] hover:underline font-bold"
            >
              <span>🦁 Kids Zone</span>
            </button>
            <button
              onClick={() => handleNavClick('parent-portal')}
              className="hidden md:flex items-center gap-1 text-white/90 hover:text-white font-medium"
            >
              <span>📱 Parent Portal</span>
            </button>
            <button
              onClick={() => handleNavClick('fee-calculator')}
              className="hidden md:flex items-center gap-1 text-white/90 hover:text-white font-medium"
            >
              <span>💰 Fee Calculator</span>
            </button>

            <span className="hidden xl:inline text-white/40">|</span>

            <button
              onClick={() => handleNavClick('admin')}
              className={`flex items-center gap-1 px-2 py-0.5 rounded text-[11px] font-bold transition-all ${
                activeTab === 'admin'
                  ? 'bg-[#F4511E] text-white'
                  : 'bg-white/15 text-[#FFD21F] hover:bg-white/25'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Admin</span>
              {enquiriesCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 rounded-full bg-[#F4511E] text-white text-[9px] font-extrabold">
                  {enquiriesCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Brand Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="cursor-pointer transition-transform hover:scale-102"
          >
            <AKPLogo size={50} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {mainNavItems.slice(0, 5).map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-link-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-extrabold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#F4511E] bg-[#FFF3E0] shadow-xs'
                      : 'text-[#173B5E] hover:text-[#F4511E] hover:bg-orange-50/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}

            {/* Interactive World Dropdown Menu */}
            <div className="relative">
              <button
                onClick={() => setInteractiveDropdownOpen(!interactiveDropdownOpen)}
                className={`px-3 py-2 rounded-xl text-xs xl:text-sm font-extrabold tracking-wide flex items-center gap-1 transition-all cursor-pointer ${
                  ['kids-zone', 'parent-portal', 'fee-calculator', 'virtual-tour', 'campuses'].includes(
                    activeTab
                  )
                    ? 'text-[#F4511E] bg-[#FFF3E0] ring-1 ring-orange-200'
                    : 'text-[#173B5E] hover:text-[#F4511E] hover:bg-orange-50/60'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
                <span>EXPLORE LEO'S WORLD</span>
                <ChevronDown className="w-3.5 h-3.5" />
              </button>

              {interactiveDropdownOpen && (
                <div
                  onMouseLeave={() => setInteractiveDropdownOpen(false)}
                  className="absolute top-full left-0 mt-2 w-80 bg-white rounded-3xl p-3 border-3 border-[#FFD21F] shadow-2xl z-50 animate-fade-in space-y-1"
                >
                  {exploreFeatures.map((feat) => {
                    const Icon = feat.icon;
                    const isFeatActive = activeTab === feat.tab;
                    return (
                      <button
                        key={feat.tab}
                        onClick={() => handleNavClick(feat.tab)}
                        className={`w-full p-2.5 rounded-2xl text-left flex items-start gap-3 transition-all cursor-pointer ${
                          isFeatActive
                            ? 'bg-[#FFF3E0] border border-orange-200'
                            : 'hover:bg-orange-50'
                        }`}
                      >
                        <div className="w-8 h-8 rounded-xl bg-orange-100 text-[#F4511E] flex items-center justify-center shrink-0 mt-0.5">
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span className="font-heading font-extrabold text-xs text-[#173B5E]">
                              {feat.label}
                            </span>
                            {feat.badge && (
                              <span className="px-1.5 py-0.5 rounded-full bg-[#FFD21F] text-[#173B5E] text-[9px] font-black">
                                {feat.badge}
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-gray-500 line-clamp-1">{feat.desc}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            {mainNavItems.slice(5).map((item) => {
              const isActive = activeTab === item.tab;
              return (
                <button
                  key={item.tab}
                  id={`nav-link-${item.tab}`}
                  onClick={() => handleNavClick(item.tab)}
                  className={`px-2.5 xl:px-3 py-2 rounded-xl text-xs xl:text-sm font-extrabold tracking-wide transition-all cursor-pointer ${
                    isActive
                      ? 'text-[#F4511E] bg-[#FFF3E0] shadow-xs'
                      : 'text-[#173B5E] hover:text-[#F4511E] hover:bg-orange-50/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-2.5">
            <button
              id="navbar-enquire-btn"
              onClick={onOpenAdmissionModal}
              className="px-4 py-2.5 rounded-xl bg-[#FFD21F] hover:bg-[#FFC400] text-[#173B5E] font-heading font-extrabold text-xs xl:text-sm tracking-wide shadow-md shadow-yellow-500/20 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-4 h-4 text-[#F4511E]" />
              ENQUIRE NOW
            </button>

            <button
              id="navbar-book-tour-btn"
              onClick={() => handleNavClick('book-tour')}
              className="px-5 py-2.5 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-xs xl:text-sm tracking-wide shadow-lg shadow-[#F4511E]/30 hover:-translate-y-0.5 transition-all flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <Calendar className="w-4 h-4" />
              BOOK A TOUR
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              id="mobile-enquire-btn-top"
              onClick={onOpenAdmissionModal}
              className="px-3 py-1.5 rounded-lg bg-[#FFD21F] text-[#173B5E] font-heading font-extrabold text-xs shadow-xs"
            >
              ENQUIRE
            </button>

            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-[#173B5E] hover:bg-orange-50 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="lg:hidden bg-[#FFF9EC] border-b-4 border-[#FFD21F] px-4 pt-3 pb-6 space-y-4 shadow-2xl animate-fade-in max-h-[85vh] overflow-y-auto"
        >
          {/* Featured Quick Interactive Links */}
          <div className="bg-white p-3 rounded-2xl border-2 border-orange-200 space-y-2">
            <div className="text-[11px] font-extrabold text-[#F4511E] uppercase px-1">
              🌟 Interactive Features:
            </div>
            <div className="grid grid-cols-2 gap-2">
              {exploreFeatures.map((f) => (
                <button
                  key={f.tab}
                  onClick={() => handleNavClick(f.tab)}
                  className={`p-2 rounded-xl text-xs font-bold text-left border ${
                    activeTab === f.tab
                      ? 'bg-[#F4511E] text-white border-[#F4511E]'
                      : 'bg-[#FFF9EC] text-[#173B5E] border-orange-100'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {mainNavItems.map((item) => (
              <button
                key={item.tab}
                onClick={() => handleNavClick(item.tab)}
                className={`w-full py-2 px-3 rounded-xl text-xs font-heading font-extrabold text-left transition-all ${
                  activeTab === item.tab
                    ? 'bg-[#F4511E] text-white shadow-sm'
                    : 'bg-white text-[#173B5E] hover:bg-orange-100/50'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="pt-2 border-t border-orange-200 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('book-tour')}
              className="w-full py-3 rounded-xl bg-[#F4511E] text-white font-heading font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              BOOK A CAMPUS TOUR
            </button>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmissionModal();
              }}
              className="w-full py-3 rounded-xl bg-[#FFD21F] text-[#173B5E] font-heading font-bold text-sm shadow-md flex items-center justify-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#F4511E]" />
              ADMISSION ENQUIRY POPUP
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
