import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  LeoMusic,
  LeoReader,
  LeoArtist,
  LeoMeditate,
  StarDeco,
  SunshineDeco,
  CloudDeco,
  RainbowDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { LeoCharacter, LeoCharacterState } from '../components/LeoCharacter';
import {
  PROGRAMS_DATA,
  ACTIVITIES_DATA,
  DAILY_TIMELINE,
  INITIAL_TESTIMONIALS,
  INITIAL_BLOG_POSTS,
  GALLERY_ITEMS,
} from '../data/preschoolData';
import { PageTab } from '../types';
import {
  Calendar,
  Sparkles,
  ArrowRight,
  Play,
  CheckCircle2,
  Shield,
  Heart,
  Users,
  Award,
  BookOpen,
  Compass,
  Palette,
  Music,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote,
  Clock,
  Eye,
} from 'lucide-react';

interface HomeViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  onSelectBlogPost?: (postId: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
  onSelectBlogPost,
}) => {
  // Meet Leo Active Persona State
  const [activeLeoPersona, setActiveLeoPersona] = useState<
    'teacher' | 'super' | 'artist' | 'reader' | 'music' | 'meditate'
  >('teacher');

  // Testimonials carousel state
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);

  // Lightbox modal for gallery
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<null | (typeof GALLERY_ITEMS)[0]>(null);

  const leoPersonas = [
    {
      id: 'teacher',
      title: 'Learn with Leo',
      role: 'Teacher Lion',
      color: '#29B6F6',
      bgLight: '#E1F5FE',
      tagline: 'Foundations & Phonics',
      desc: 'Guided by curiosity, we discover letters, numbers, and early science through interactive play and joyful blackboard quests!',
      component: LeoTeacher,
      badge: 'Academics & Curiosity',
      imgSrc: '/lion-1.jpg',
    },
    {
      id: 'super',
      title: 'Explore with Leo',
      role: 'Explorer & Super Lion',
      color: '#F4511E',
      bgLight: '#FFF3E0',
      tagline: 'STEM & Brave Discovery',
      desc: 'Don your superhero cape! We explore science experiments, sensory tables, nature mysteries, and solve puzzles together.',
      component: LeoSuper,
      badge: 'STEM & Adventure',
      imgSrc: '/lion-2.jpg',
    },
    {
      id: 'artist',
      title: 'Create with Leo',
      role: 'Artist Lion',
      color: '#FF4F6D',
      bgLight: '#FCE4EC',
      tagline: 'Canvas, Colors & Clay',
      desc: 'Dip your brushes in colors! From finger paintings to paper crafts and clay sculptures, every imagination becomes a masterpiece.',
      component: LeoArtist,
      badge: 'Visual Arts & Craft',
      imgSrc: '/lion-5.jpg',
    },
    {
      id: 'reader',
      title: 'Play & Read with Leo',
      role: 'Storybook Lion',
      color: '#FFD21F',
      bgLight: '#FFFDE7',
      tagline: 'Cozy Library & Puppetry',
      desc: 'Welcome to our reading den! Interactive picture books, fairy tale puppets, and bedtime fables that expand your vocabulary.',
      component: LeoReader,
      badge: 'Literacy & Storytelling',
      imgSrc: '/lion-4.jpg',
    },
    {
      id: 'music',
      title: 'Sing & Dance with Leo',
      role: 'Music Lion',
      color: '#8B5CF6',
      bgLight: '#F3E8FF',
      tagline: 'Acoustic Beats & Movement',
      desc: 'Put on golden headphones and feel the beat! Rhyme circles, xylophones, rhythm sticks, and happy dancing all day.',
      component: LeoMusic,
      badge: 'Music & Movement',
      imgSrc: '/lion-3.jpg',
    },
    {
      id: 'meditate',
      title: 'Grow & Calm with Leo',
      role: 'Wellbeing Lion',
      color: '#5BC85A',
      bgLight: '#E8F5E9',
      tagline: 'Mindfulness & Kids Yoga',
      desc: 'Take a deep gentle breath with Leo. We practice animal yoga stretches, share loving feelings, and nurture calm, confident hearts.',
      component: LeoMeditate,
      badge: 'Social-Emotional Wellbeing',
      imgSrc: '/lion-6.jpg',
    },
  ];

  const currentPersona = leoPersonas.find((p) => p.id === activeLeoPersona) || leoPersonas[0];
  const PersonaComponent = currentPersona.component;

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prev) => (prev + 1) % INITIAL_TESTIMONIALS.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex(
      (prev) => (prev - 1 + INITIAL_TESTIMONIALS.length) % INITIAL_TESTIMONIALS.length
    );
  };

  return (
    <div id="homepage-container" className="w-full">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: Bold Deep Navy anchor, Lion Orange CTAs, Sunshine Accents */}
      {/* ========================================================================= */}
      <section
        id="hero-section"
        className="relative bg-gradient-to-b from-[#173B5E] via-[#1A4269] to-[#173B5E] text-white pt-10 sm:pt-16 pb-20 sm:pb-28 overflow-hidden"
      >
        {/* Floating Background Accents */}
        <div className="absolute top-10 left-6 sm:left-16 opacity-30 animate-float pointer-events-none">
          <StarDeco size={40} color="#FFD21F" />
        </div>
        <div className="absolute top-28 right-10 sm:right-24 opacity-30 animate-float-reverse pointer-events-none">
          <SunshineDeco size={72} />
        </div>
        <div className="absolute bottom-12 left-1/4 opacity-20 animate-float pointer-events-none">
          <CloudDeco size={90} color="#5ED7E8" />
        </div>
        <div className="absolute -top-10 right-1/3 w-72 h-72 rounded-full bg-[#F4511E]/15 blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 right-10 w-96 h-96 rounded-full bg-[#FFD21F]/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Content Column (7 cols) */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              {/* Admissions Open Capsule */}
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border-2 border-[#FFD21F]/40 shadow-sm">
                <span className="w-2.5 h-2.5 rounded-full bg-[#5BC85A] animate-ping" />
                <span className="font-heading font-extrabold text-xs sm:text-sm text-[#FFD21F] uppercase tracking-wider">
                  🦁 Admissions Open for 2026–27 Academic Year
                </span>
              </div>

              {/* Striking Headline */}
              <h1 className="font-heading font-black text-4xl sm:text-6xl xl:text-7xl text-white tracking-tight leading-[1.08]">
                BIG DREAMS <br />
                <span className="text-[#FFD21F] drop-shadow-md">START SMALL.</span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-white/90 text-lg sm:text-xl font-medium max-w-2xl leading-relaxed mx-auto lg:mx-0">
                A joyful digital and physical world where little learners <strong className="text-[#5ED7E8]">explore</strong>, <strong className="text-[#FFD21F]">create</strong>, <strong className="text-[#FF4F6D]">discover</strong> and <strong className="text-[#5BC85A]">grow</strong> — guided by our friendly lion mascot Leo.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Primary CTA: BOOK A TOUR */}
                <button
                  id="hero-book-tour-btn"
                  onClick={() => onNavigate('book-tour')}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-black text-base sm:text-lg tracking-wide shadow-xl shadow-[#F4511E]/40 hover:-translate-y-1 transition-all flex items-center justify-center gap-2.5 cursor-pointer active:scale-95 border-2 border-[#FF8A3D]"
                >
                  <Calendar className="w-5 h-5" />
                  BOOK A CAMPUS TOUR
                </button>

                {/* Secondary CTA: EXPLORE PROGRAMS */}
                <button
                  id="hero-explore-programs-btn"
                  onClick={() => onNavigate('programs')}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#FFD21F] hover:bg-[#FFC400] text-[#173B5E] font-heading font-black text-base sm:text-lg tracking-wide shadow-lg shadow-yellow-500/20 hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-5 h-5 text-[#F4511E]" />
                  EXPLORE PROGRAMS
                </button>
              </div>

              {/* Key Trust Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/15">
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center sm:text-left">
                  <div className="font-heading font-extrabold text-lg text-[#FFD21F]">1:8 Ratio</div>
                  <div className="text-[11px] text-white/80 font-medium">Individual Attention</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center sm:text-left">
                  <div className="font-heading font-extrabold text-lg text-[#5ED7E8]">100% Safe</div>
                  <div className="text-[11px] text-white/80 font-medium">CCTV & Verified Care</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center sm:text-left">
                  <div className="font-heading font-extrabold text-lg text-[#FF4F6D]">STEM & Art</div>
                  <div className="text-[11px] text-white/80 font-medium">Play-Based Curriculum</div>
                </div>
                <div className="bg-white/10 backdrop-blur-xs p-3 rounded-xl border border-white/10 text-center sm:text-left">
                  <div className="font-heading font-extrabold text-lg text-[#5BC85A]">Ages 1.5–6</div>
                  <div className="text-[11px] text-white/80 font-medium">Playgroup to Senior KG</div>
                </div>
              </div>
            </div>

            {/* Right Mascot Hero Integration (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center justify-center relative pt-6 lg:pt-0">
              {/* Natural environment grounding & Leo character */}
              <div className="relative flex flex-col items-center">
                {/* Subtle soft ambient light glow behind Leo */}
                <div className="absolute w-72 h-72 sm:w-80 sm:h-80 bg-gradient-to-tr from-[#FFD21F]/20 to-[#F4511E]/20 rounded-full blur-2xl pointer-events-none -z-10" />

                {/* Leo Character in Welcome State with Intro Speech */}
                <LeoCharacter
                  state="welcome"
                  size={310}
                  autoDismissIntro={true}
                  introDurationMs={6500}
                  bubblePlacement="auto"
                  showActions={true}
                  interactive={true}
                  onNavigate={onNavigate}
                  onOpenAdmission={onOpenAdmissionModal}
                />

                {/* Floating Trust Badge standing beside Leo */}
                <div className="mt-2 bg-[#FFD21F] text-[#173B5E] px-4 py-2 rounded-2xl shadow-xl border-2 border-white font-heading font-black text-xs sm:text-sm flex items-center gap-2 animate-float-reverse z-10">
                  <Award className="w-4 h-4 text-[#F4511E]" />
                  <span>Ranked #1 Joyful Play Learning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Curving Wave Divider at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-10">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block w-full h-8 sm:h-12 fill-[#FFF9EC]">
            <path d="M0,0 C150,90 350,-40 500,60 C650,160 900,10 1200,40 L1200,120 L0,120 Z"></path>
          </svg>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. EARLY CHILDHOOD EDUCATION SECTION: "THE FIRST YEARS MATTER." */}
      {/* ========================================================================= */}
      <section id="early-education-section" className="py-16 sm:py-24 bg-[#FFF9EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/15 text-[#0288D1] font-extrabold text-xs tracking-wider uppercase mb-3">
              Early Brain Development & Foundation
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-4">
              THE FIRST YEARS MATTER.
            </h2>
            <p className="text-base sm:text-lg text-gray-700 font-medium leading-relaxed">
              Between ages 1 and 6, a child&apos;s brain creates over 1 million new neural connections every single second. Our research-backed environment transforms natural curiosity into lifelong confidence.
            </p>
          </div>

          {/* 4 Visual Pillars Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* 01 — CURIOSITY */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#29B6F6] shadow-lg shadow-blue-500/10 hover:-translate-y-2 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#29B6F6]">01</span>
                <div className="w-12 h-12 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Compass className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                CURIOSITY
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Encouraging young minds to wonder, touch, question, and discover cause and effect through hands-on STEM and sensory materials.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-[#0288D1]">
                <span>Inquiry & Experimentation</span>
              </div>
            </div>

            {/* 02 — CONFIDENCE */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FFD21F] shadow-lg shadow-yellow-500/10 hover:-translate-y-2 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#F57F17]">02</span>
                <div className="w-12 h-12 rounded-2xl bg-[#FFFDE7] text-[#F57F17] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Award className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                CONFIDENCE
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Celebrating small milestones, encouraging self-help routines, and empowering children to express thoughts with courage and joy.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-[#F57F17]">
                <span>Independence & Resilience</span>
              </div>
            </div>

            {/* 03 — CREATIVITY */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FF4F6D] shadow-lg shadow-pink-500/10 hover:-translate-y-2 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#FF4F6D]">03</span>
                <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] text-[#D81B60] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Palette className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                CREATIVITY
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Turning boundless imagination into painting, clay sculpture, acoustic music rhythm, dramatic role play, and storytelling.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-[#FF4F6D]">
                <span>Art, Music & Expression</span>
              </div>
            </div>

            {/* 04 — CONNECTION */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#5BC85A] shadow-lg shadow-green-500/10 hover:-translate-y-2 transition-all group">
              <div className="flex items-center justify-between mb-4">
                <span className="font-heading font-black text-2xl sm:text-3xl text-[#2E7D32]">04</span>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-6 h-6" />
                </div>
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                CONNECTION
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed font-medium">
                Nurturing empathy, collaborative peer play, loving teacher attachments, sharing routines, and environmental kindness.
              </p>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-1 text-xs font-bold text-[#2E7D32]">
                <span>Empathy & Social Bonds</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. "MEET LEO 🦁" SIGNATURE INTERACTIVE WORLD (Major Branded Experience) */}
      {/* ========================================================================= */}
      <section id="meet-leo-section" className="py-16 sm:py-24 bg-white relative overflow-hidden border-y-2 border-orange-100">
        {/* Soft Background Accents */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#FFD21F]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#29B6F6]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F4511E]/10 text-[#F4511E] font-heading font-black text-sm uppercase tracking-wider mb-2">
              <span>🦁 Meet Your School Guide</span>
            </div>
            <h2 className="font-heading font-black text-4xl sm:text-5xl text-[#173B5E] tracking-tight">
              MEET LEO 🦁
            </h2>
            <p className="font-heading font-bold text-xl text-[#F4511E] mt-1">
              &ldquo;Hi! I&apos;m Leo. I&apos;ll show you around!&rdquo;
            </p>
            <p className="text-gray-600 text-sm sm:text-base font-medium mt-2 max-w-xl mx-auto">
              Leo is our warm, curious school mascot who learns, creates, sings, and explores alongside every child. Click any card below to see Leo in action!
            </p>
          </div>

          {/* Interactive World Grid: 6 Switcher Cards (Left) & Active Mascot Showcase (Right) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#FFF9EC] p-6 sm:p-10 rounded-3xl border-4 border-[#FFD21F] shadow-xl overflow-visible">
            {/* 6 Interactive Selector Cards (7 cols) */}
            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {leoPersonas.map((persona) => {
                const isSelected = activeLeoPersona === persona.id;
                return (
                  <button
                    key={persona.id}
                    id={`meet-leo-tab-${persona.id}`}
                    onClick={() => setActiveLeoPersona(persona.id as any)}
                    className={`p-4 rounded-2xl text-left transition-all duration-300 border-3 cursor-pointer flex items-start gap-3 relative ${
                      isSelected
                        ? 'bg-white shadow-lg scale-[1.02]'
                        : 'bg-white/70 hover:bg-white hover:shadow-md'
                    }`}
                    style={{
                      borderColor: isSelected ? persona.color : '#E5E7EB',
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl overflow-hidden shrink-0 border-2 bg-white flex items-center justify-center shadow-xs"
                      style={{ borderColor: persona.color }}
                    >
                      <img
                        src={persona.imgSrc}
                        alt={persona.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <span
                        className="text-[10px] font-extrabold uppercase tracking-wider block"
                        style={{ color: persona.color }}
                      >
                        {persona.badge}
                      </span>
                      <h4 className="font-heading font-extrabold text-base text-[#173B5E] leading-tight">
                        {persona.title}
                      </h4>
                      <p className="text-xs text-gray-500 font-medium line-clamp-1 mt-0.5">
                        {persona.tagline}
                      </p>
                    </div>

                    {isSelected && (
                      <span className="absolute top-2 right-2 w-3 h-3 rounded-full bg-[#5BC85A] border border-white" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Active Persona Showcase (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center text-center p-6 sm:p-8 bg-white rounded-3xl border-3 shadow-md relative overflow-visible z-20"
              style={{ borderColor: currentPersona.color }}
            >
              {/* Tag Pill */}
              <div
                className="px-3.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider mb-2 text-white shadow-xs"
                style={{ backgroundColor: currentPersona.color }}
              >
                {currentPersona.role}
              </div>

              {/* Dynamic Interactive Mascot Showcase with matching Original Leo Image */}
              <div className="my-2">
                <LeoCharacter
                  state={
                    activeLeoPersona === 'teacher'
                      ? 'learning'
                      : activeLeoPersona === 'super'
                      ? 'excited'
                      : activeLeoPersona === 'artist'
                      ? 'art'
                      : activeLeoPersona === 'reader'
                      ? 'reading'
                      : activeLeoPersona === 'music'
                      ? 'music'
                      : 'calm'
                  }
                  size={240}
                  message={`Hi! I'm ${currentPersona.role}! 🦁`}
                  subMessage={currentPersona.desc}
                  showActions={true}
                  onNavigate={onNavigate}
                  onOpenAdmission={onOpenAdmissionModal}
                />
              </div>

              <h4 className="font-heading font-black text-2xl text-[#173B5E] mb-2">
                {currentPersona.title}
              </h4>
              <p className="text-sm text-gray-600 font-medium leading-relaxed max-w-sm mb-4">
                {currentPersona.desc}
              </p>

              <button
                onClick={() => onNavigate('activities')}
                className="px-5 py-2 rounded-xl text-white font-heading font-bold text-xs tracking-wider uppercase shadow-md hover:scale-105 active:scale-95 transition-all cursor-pointer"
                style={{ backgroundColor: currentPersona.color }}
              >
                Explore {currentPersona.badge} →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. LEARNING PHILOSOPHY: LEARN → EXPLORE → CREATE → GROW */}
      {/* ========================================================================= */}
      <section id="philosophy-section" className="py-16 sm:py-24 bg-[#FFF9EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-extrabold text-xs tracking-wider uppercase mb-3">
              Our 4-Stage Learning Journey
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-4">
              LEARN → EXPLORE → CREATE → GROW
            </h2>
            <p className="text-base text-gray-700 font-medium leading-relaxed">
              Every child follows an organic, joyful pathway from foundational curiosity to confident independence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stage 1: LEARN */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#29B6F6] shadow-md relative group hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#29B6F6] text-white flex items-center justify-center font-heading font-black text-lg mb-4 shadow-md">
                1
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#173B5E] mb-2">
                LEARN
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Building foundational knowledge through age-appropriate literacy, phonics, number sense, and active listening in a warm circle.
              </p>
            </div>

            {/* Stage 2: EXPLORE */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FFD21F] shadow-md relative group hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFD21F] text-[#173B5E] flex items-center justify-center font-heading font-black text-lg mb-4 shadow-md">
                2
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#173B5E] mb-2">
                EXPLORE
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Encouraging children to ask questions, explore nature, conduct water/sand experiments, and investigate their environment.
              </p>
            </div>

            {/* Stage 3: CREATE */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FF4F6D] shadow-md relative group hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FF4F6D] text-white flex items-center justify-center font-heading font-black text-lg mb-4 shadow-md">
                3
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#173B5E] mb-2">
                CREATE
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Turning imagination into art, music, dramatic puppet stories, wooden block architecture, and original ideas.
              </p>
            </div>

            {/* Stage 4: GROW */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#5BC85A] shadow-md relative group hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#5BC85A] text-white flex items-center justify-center font-heading font-black text-lg mb-4 shadow-md">
                4
              </div>
              <h3 className="font-heading font-extrabold text-2xl text-[#173B5E] mb-2">
                GROW
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Building confidence, emotional self-regulation, empathy for friends, independence, and readiness for primary school.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. PROGRAMS SECTION: Playgroup, Nursery, LKG, UKG, Daycare */}
      {/* ========================================================================= */}
      <section id="programs-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD21F]/20 text-[#173B5E] font-extrabold text-xs tracking-wider uppercase mb-2">
                Academic Programs & Stages
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
                OUR PROGRAMS
              </h2>
              <p className="text-gray-600 text-base font-medium mt-1">
                Age-specific curriculums crafted to spark joy and developmental milestones.
              </p>
            </div>

            <button
              onClick={() => onNavigate('programs')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-heading font-bold text-[#F4511E] hover:text-[#E64A19] transition-colors"
            >
              <span>View Full Curriculum & Schedules</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROGRAMS_DATA.map((prog) => (
              <div
                key={prog.id}
                id={`program-card-${prog.id}`}
                className="bg-white rounded-3xl p-6 sm:p-7 border-3 shadow-lg flex flex-col justify-between hover:-translate-y-2 transition-all"
                style={{ borderColor: prog.color }}
              >
                <div>
                  {/* Top Bar with Age Range Pill */}
                  <div className="flex items-center justify-between mb-3">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide text-white"
                      style={{ backgroundColor: prog.color }}
                    >
                      {prog.ageRange}
                    </span>
                    <span className="text-xs font-bold text-gray-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {prog.timing}
                    </span>
                  </div>

                  <h3 className="font-heading font-black text-2xl text-[#173B5E] mb-1">
                    {prog.name}
                  </h3>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">
                    {prog.tagline}
                  </p>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                    {prog.overview}
                  </p>

                  {/* Key Highlights Bullet points */}
                  <div className="space-y-1.5 mb-6">
                    {prog.learningFocus.slice(0, 3).map((focus, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-gray-700">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" style={{ color: prog.color }} />
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-500">
                    Ratio: <strong className="text-[#173B5E]">{prog.ratio}</strong>
                  </span>
                  <button
                    onClick={() => onNavigate('programs')}
                    className="px-4 py-2 rounded-xl text-xs font-heading font-extrabold tracking-wide uppercase text-white shadow-md hover:scale-105 transition-all cursor-pointer"
                    style={{ backgroundColor: prog.color }}
                  >
                    EXPLORE PROGRAM
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5B. INTERACTIVE LEARNING & SCHOOL FEATURES */}
      {/* ========================================================================= */}
      <section id="interactive-tools-section" className="py-16 sm:py-20 bg-gradient-to-b from-white to-[#FFF9EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-extrabold uppercase tracking-wide shadow-xs">
              <Sparkles className="w-3.5 h-3.5" /> Interactive Learning & Campuses
            </div>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              Explore <span className="text-[#F4511E]">A Kid’s Pre School</span>
            </h2>
            <p className="text-base text-gray-700 font-medium">
              Interactive games for curious little learners, holistic developmental programs, and welcoming multi-branch campuses.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {/* Tool 1: Kids Zone */}
            <div
              onClick={() => onNavigate('kids-zone')}
              className="bg-white rounded-3xl p-6 border-3 border-[#FFD21F] shadow-lg hover:-translate-y-2 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-yellow-100 border border-yellow-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src="/lion-2.jpg"
                    alt="Leo's Kids Zone"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/lion%202.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#173B5E]">
                  Leo’s Kids Zone
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  ABC Phonics Safari (26 letters with cheerful audio), Leo’s Read-Along Storybook, and interactive shape puzzles.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#F4511E]">
                <span>Play & Learn Now</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 2: Multi-Branch Campuses */}
            <div
              onClick={() => onNavigate('campuses')}
              className="bg-white rounded-3xl p-6 border-3 border-[#29B6F6] shadow-lg hover:-translate-y-2 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-blue-100 border border-blue-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src="/lion-1.jpg"
                    alt="Campuses"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/lion%201.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#173B5E]">
                  Our Campuses
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Explore our verified branch locations, state-of-the-art facilities, safe indoor activity zones, and nearest branch directions.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#0288D1]">
                <span>Locate Campus</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Tool 3: Programs & Curriculum */}
            <div
              onClick={() => onNavigate('programs')}
              className="bg-white rounded-3xl p-6 border-3 border-[#5BC85A] shadow-lg hover:-translate-y-2 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl overflow-hidden bg-green-100 border border-green-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <img
                    src="/lion-4.jpg"
                    alt="Programs"
                    referrerPolicy="no-referrer"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/lion%204.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-heading font-extrabold text-xl text-[#173B5E]">
                  Academic Programs
                </h3>
                <p className="text-xs text-gray-600 leading-relaxed font-medium">
                  Age-tailored curriculums from Playgroup (1.5y) to Senior KG (5.5y) blending sensory discovery, STEAM, and phonics mastery.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#2E7D32]">
                <span>View All Programs</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. A DAY AT OUR PRESCHOOL: Interactive Timeline */}
      {/* ========================================================================= */}
      <section id="daily-timeline-section" className="py-16 sm:py-24 bg-[#FFF9EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-extrabold text-xs tracking-wider uppercase mb-3">
              Daily Schedule & Routine
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-3">
              A DAY IN OUR LITTLE WORLD
            </h2>
            <p className="text-base text-gray-700 font-medium">
              A balanced daily rhythm of circle songs, creative exploration, outdoor adventure, nutritious dining, and storytime.
            </p>
            <p className="text-xs text-gray-400 italic mt-1">
              *Sample schedule — official timings tailored per program tier.
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative max-w-4xl mx-auto">
            {/* Center Line for desktop */}
            <div className="hidden md:block absolute top-6 bottom-6 left-1/2 -translate-x-1/2 w-1.5 bg-gradient-to-b from-[#F4511E] via-[#FFD21F] to-[#5BC85A] rounded-full"></div>

            <div className="space-y-8">
              {DAILY_TIMELINE.map((item, index) => {
                const isEven = index % 2 === 0;
                return (
                  <div
                    key={index}
                    className={`flex flex-col md:flex-row items-center gap-6 ${
                      isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Content Card */}
                    <div className="w-full md:w-1/2">
                      <div
                        className="bg-white p-5 sm:p-6 rounded-3xl border-3 shadow-md hover:-translate-y-1 transition-transform"
                        style={{ borderColor: item.badgeColor }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wider text-white"
                            style={{ backgroundColor: item.badgeColor }}
                          >
                            {item.time}
                          </span>
                        </div>
                        <h4 className="font-heading font-extrabold text-xl text-[#173B5E] mb-1">
                          {item.title}
                        </h4>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>

                    {/* Timeline Center Node */}
                    <div className="relative z-10 w-12 h-12 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold shrink-0"
                      style={{ backgroundColor: item.badgeColor }}
                    >
                      <span className="text-lg">🦁</span>
                    </div>

                    {/* Placeholder space for symmetry on desktop */}
                    <div className="hidden md:block w-1/2" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ACTIVITIES: "LITTLE MOMENTS. BIG MEMORIES." */}
      {/* ========================================================================= */}
      <section id="activities-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF4F6D]/15 text-[#FF4F6D] font-extrabold text-xs tracking-wider uppercase mb-3">
              Holistic Experiential Learning
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-3">
              LITTLE MOMENTS. BIG MEMORIES.
            </h2>
            <p className="text-base text-gray-700 font-medium">
              Every activity area is crafted to spark tactile delight, acoustic discovery, sensory balance, and team camaraderie.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES_DATA.map((act) => (
              <div
                key={act.id}
                className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-7 border-3 shadow-md hover:-translate-y-2 transition-all flex flex-col justify-between"
                style={{ borderColor: act.accentColor }}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide text-white"
                      style={{ backgroundColor: act.accentColor }}
                    >
                      {act.category}
                    </span>
                    <div
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-white"
                      style={{ backgroundColor: act.accentColor }}
                    >
                      🦁
                    </div>
                  </div>

                  <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                    {act.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                    {act.description}
                  </p>

                  <div className="space-y-1.5 mb-4">
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                      Skills Nurtured:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {act.skillsDeveloped.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2 py-0.5 rounded-lg bg-white text-[#173B5E] text-xs font-bold border border-gray-200"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => onNavigate('activities')}
                  className="w-full py-2.5 rounded-xl font-heading font-bold text-xs tracking-wider uppercase text-white shadow-md hover:opacity-90 transition-opacity mt-2"
                  style={{ backgroundColor: act.accentColor }}
                >
                  Explore Activity Studio →
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 9. WHY PARENTS CHOOSE US: 6 Feature Cards */}
      {/* ========================================================================= */}
      <section id="why-choose-us-section" className="py-16 sm:py-24 bg-[#FFF9EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-extrabold text-xs tracking-wider uppercase mb-3">
              Trust, Safety & Excellence
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-3">
              WHY PARENTS CHOOSE “A KID’S PRE SCHOOL”
            </h2>
            <p className="text-base text-gray-700 font-medium">
              We provide parents absolute peace of mind through certified care, transparent updates, and genuine love for every child.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Card 1: Safe & Secure */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#F4511E] shadow-md hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F4511E] flex items-center justify-center mb-4">
                <Shield className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                Safe & Secure
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                24/7 CCTV monitored campus, child-proof fixtures, soft-cornered furniture, verified educators, and daily sanitization protocols.
              </p>
            </div>

            {/* Card 2: Experienced Educators */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#29B6F6] shadow-md hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                Experienced Educators
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Early childhood certified teachers trained in positive reinforcement, Montessori methods, and empathetic emotional guidance.
              </p>
            </div>

            {/* Card 3: Child-Centred Learning */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FFD21F] shadow-md hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFDE7] text-[#F57F17] flex items-center justify-center mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                Child-Centred Learning
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                We honor every child&apos;s unique pace of learning, providing customized stimulation for visual, auditory, and kinesthetic learners.
              </p>
            </div>

            {/* Card 4: Creative Learning Environment */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FF4F6D] shadow-md hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#FCE4EC] text-[#D81B60] flex items-center justify-center mb-4">
                <Palette className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                Creative Learning Environment
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Dedicated art ateliers, sensory water-and-sand zones, musical instrument nooks, and nature garden patches for hands-on wonder.
              </p>
            </div>

            {/* Card 5: Holistic Development */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#8B5CF6] shadow-md hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#F3E8FF] text-[#7C3AED] flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                Holistic Development
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Harmonious growth of cognitive literacy, gross & fine motor skills, emotional resilience, social teamwork, and creative flair.
              </p>
            </div>

            {/* Card 6: Caring Community */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#5BC85A] shadow-md hover:-translate-y-1.5 transition-all">
              <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                Caring Community
              </h3>
              <p className="text-sm text-gray-600 font-medium leading-relaxed">
                Close parent-teacher partnership with daily photo updates, transparent communication, and welcoming family celebration events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 10. TESTIMONIALS: "WHAT PARENTS SAY" */}
      {/* ========================================================================= */}
      <section id="testimonials-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF4F6D]/15 text-[#FF4F6D] font-extrabold text-xs tracking-wider uppercase mb-2">
              Heartfelt Parent Reviews
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              WHAT PARENTS SAY
            </h2>
          </div>

          {/* Testimonial Card Carousel */}
          <div className="relative bg-[#FFF9EC] rounded-3xl p-8 sm:p-12 border-4 border-[#FFD21F] shadow-xl">
            <Quote className="w-12 h-12 text-[#FFD21F] opacity-70 mb-4" />

            <div className="min-h-[140px]">
              <p className="text-base sm:text-lg text-[#173B5E] font-medium leading-relaxed italic mb-6">
                &ldquo;{INITIAL_TESTIMONIALS[currentTestimonialIndex].review}&rdquo;
              </p>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-orange-200">
              <div className="flex items-center gap-3">
                <div
                  className="w-12 h-12 rounded-2xl flex items-center justify-center font-heading font-extrabold text-white text-lg shadow-md"
                  style={{ backgroundColor: INITIAL_TESTIMONIALS[currentTestimonialIndex].avatarColor }}
                >
                  {INITIAL_TESTIMONIALS[currentTestimonialIndex].parentName[0]}
                </div>
                <div>
                  <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#173B5E]">
                    {INITIAL_TESTIMONIALS[currentTestimonialIndex].parentName}
                  </h4>
                  <p className="text-xs font-bold text-[#F4511E]">
                    Parents of {INITIAL_TESTIMONIALS[currentTestimonialIndex].childName}
                  </p>
                </div>
              </div>

              {/* Star Rating & Controls */}
              <div className="flex items-center justify-between sm:justify-end gap-6">
                <div className="flex items-center gap-1">
                  {[...Array(INITIAL_TESTIMONIALS[currentTestimonialIndex].rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-[#FFD21F] text-[#FFD21F]" />
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    id="prev-testimonial-btn"
                    onClick={prevTestimonial}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-300 text-[#173B5E] hover:bg-[#F4511E] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                    aria-label="Previous Review"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    id="next-testimonial-btn"
                    onClick={nextTestimonial}
                    className="w-10 h-10 rounded-xl bg-white border border-gray-300 text-[#173B5E] hover:bg-[#F4511E] hover:text-white transition-colors flex items-center justify-center cursor-pointer shadow-xs"
                    aria-label="Next Review"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 11. GALLERY PREVIEW: LIFE AT PRESCHOOL */}
      {/* ========================================================================= */}
      <section id="gallery-preview-section" className="py-16 sm:py-24 bg-[#FFF9EC] relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/15 text-[#0288D1] font-extrabold text-xs tracking-wider uppercase mb-2">
                Photo Moments
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
                LIFE AT “A KID’S PRE SCHOOL”
              </h2>
              <p className="text-gray-600 text-base font-medium mt-1">
                A visual peek into daily laughter, sensory discoveries, and colorful memories.
              </p>
            </div>

            <button
              onClick={() => onNavigate('gallery')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-heading font-bold text-[#F4511E] hover:text-[#E64A19] transition-colors"
            >
              <span>Explore Full Photo Gallery</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {GALLERY_ITEMS.slice(0, 6).map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedGalleryImage(item)}
                className="group relative rounded-3xl overflow-hidden shadow-md cursor-pointer border-3 border-white hover:border-[#FFD21F] transition-all duration-300 aspect-4/3"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#173B5E]/90 via-[#173B5E]/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                  <span className="text-[11px] font-extrabold uppercase text-[#FFD21F]">
                    {item.category}
                  </span>
                  <h4 className="font-heading font-bold text-lg leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-xs text-white/80 line-clamp-1 mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 12. BLOG HIGHLIGHTS */}
      {/* ========================================================================= */}
      <section id="blog-preview-section" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#8B5CF6]/15 text-[#8B5CF6] font-extrabold text-xs tracking-wider uppercase mb-2">
                Parenting Tips & Insights
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
                FROM OUR EDUCATORS’ DESK
              </h2>
              <p className="text-gray-600 text-base font-medium mt-1">
                Practical tips on child development, emotional resilience, and early learning at home.
              </p>
            </div>

            <button
              onClick={() => onNavigate('blog')}
              className="mt-4 md:mt-0 inline-flex items-center gap-1.5 font-heading font-bold text-[#F4511E] hover:text-[#E64A19] transition-colors"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {INITIAL_BLOG_POSTS.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  if (onSelectBlogPost) onSelectBlogPost(post.id);
                  onNavigate('blog');
                }}
                className="bg-[#FFF9EC] rounded-3xl overflow-hidden border-3 shadow-md hover:-translate-y-2 transition-all flex flex-col justify-between cursor-pointer group"
                style={{ borderColor: post.accentColor }}
              >
                <div>
                  <div className="aspect-16/9 overflow-hidden">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  <div className="p-6">
                    <div className="flex items-center justify-between text-xs font-bold mb-2">
                      <span
                        className="px-2.5 py-0.5 rounded-md text-white"
                        style={{ backgroundColor: post.accentColor }}
                      >
                        {post.category}
                      </span>
                      <span className="text-gray-400">{post.readTime}</span>
                    </div>

                    <h3 className="font-heading font-extrabold text-lg text-[#173B5E] group-hover:text-[#F4511E] transition-colors leading-snug mb-2">
                      {post.title}
                    </h3>
                    <p className="text-xs text-gray-600 font-medium line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-6 pt-2 text-xs font-bold text-[#F4511E] flex items-center gap-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 13. FINAL HOMEPAGE CTA: "READY TO BEGIN YOUR LITTLE ONE'S ADVENTURE?" */}
      {/* ========================================================================= */}
      <section id="final-cta-section" className="py-20 sm:py-28 bg-gradient-to-br from-[#F4511E] via-[#FF8A3D] to-[#FFD21F] text-white relative overflow-hidden">
        {/* Playful Floating Accents */}
        <div className="absolute top-8 left-10 opacity-30 animate-float pointer-events-none">
          <StarDeco size={44} color="#FFFFFF" />
        </div>
        <div className="absolute bottom-10 right-14 opacity-30 animate-float-reverse pointer-events-none">
          <SunshineDeco size={80} />
        </div>
        <div className="absolute top-1/2 left-1/3 w-80 h-80 rounded-full bg-white/10 blur-3xl pointer-events-none"></div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          {/* Waving Leo Mascot Centered */}
          <div className="mb-4 inline-block">
            <LeoCharacter
              state="tour"
              size={230}
              message="Come see where the adventure begins! 🦁"
              subMessage="Book a campus walkthrough or ask our friendly admissions team any questions!"
              showActions={true}
              onNavigate={onNavigate}
              onOpenAdmission={onOpenAdmissionModal}
            />
          </div>

          <h2 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4 drop-shadow-md">
            READY TO BEGIN YOUR LITTLE ONE’S ADVENTURE?
          </h2>

          <p className="text-white/95 text-lg sm:text-xl font-semibold max-w-2xl mx-auto mb-8 leading-relaxed drop-shadow-xs">
            Come discover a place where little minds learn, explore, create and grow. Schedule a tour or connect with our admissions team today!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              id="final-cta-book-tour-btn"
              onClick={() => onNavigate('book-tour')}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#173B5E] hover:bg-[#102A43] text-white font-heading font-extrabold text-base sm:text-lg tracking-wide shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
            >
              <Calendar className="w-5 h-5 text-[#FFD21F]" />
              BOOK A TOUR 🦁
            </button>

            <button
              id="final-cta-enquire-btn"
              onClick={onOpenAdmissionModal}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-[#FFF9EC] text-[#173B5E] font-heading font-extrabold text-base sm:text-lg tracking-wide shadow-2xl hover:-translate-y-1 transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 border-2 border-white/50"
            >
              <Sparkles className="w-5 h-5 text-[#F4511E]" />
              ENQUIRE NOW
            </button>
          </div>
        </div>
      </section>



      {/* Lightbox for Gallery */}
      {selectedGalleryImage && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm animate-fade-in"
          onClick={() => setSelectedGalleryImage(null)}
        >
          <div
            className="relative max-w-3xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl border-4 border-[#FFD21F]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedGalleryImage(null)}
              className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-[#173B5E] text-white flex items-center justify-center font-bold"
            >
              ✕
            </button>
            <img
              src={selectedGalleryImage.image}
              alt={selectedGalleryImage.title}
              className="w-full max-h-[70vh] object-cover"
            />
            <div className="p-6 bg-[#FFF9EC]">
              <span className="text-xs font-extrabold uppercase text-[#F4511E]">
                {selectedGalleryImage.category}
              </span>
              <h3 className="font-heading font-black text-2xl text-[#173B5E] mt-0.5">
                {selectedGalleryImage.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1 font-medium">
                {selectedGalleryImage.desc}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
