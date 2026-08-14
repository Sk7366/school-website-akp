import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, Compass, Calendar, BookOpen, MessageSquare, X, Heart, Star } from 'lucide-react';
import { PageTab } from '../types';

export type LeoPose = 'teacher' | 'super' | 'music' | 'reader' | 'artist' | 'meditate';

export interface InteractiveLeoProps {
  pose?: LeoPose;
  size?: number;
  className?: string;
  greeting?: string;
  subGreeting?: string;
  showMenu?: boolean;
  bubblePlacement?: 'top' | 'right' | 'left' | 'bottom' | 'auto';
  interactive?: boolean;
  celebration?: boolean;
  celebrationMessage?: string;
  onNavigate?: (tab: PageTab) => void;
  onOpenAdmission?: () => void;
  onAskLeo?: () => void;
  altText?: string;
}

const POSE_IMAGES: Record<LeoPose, { src: string; alt: string; title: string }> = {
  teacher: {
    src: '/lion-1.jpg',
    alt: 'Leo the Teacher Lion with blue glasses and chalkboard',
    title: 'Teacher Leo (Learning & Discovery)',
  },
  super: {
    src: '/lion-2.jpg',
    alt: 'Leo the Superhero Lion with red mask and lightning bolt',
    title: 'Superhero Leo (STEM & Confidence)',
  },
  music: {
    src: '/lion-3.jpg',
    alt: 'Leo Music Lion with golden DJ headphones',
    title: 'Music Leo (Rhythm & Dance)',
  },
  reader: {
    src: '/lion-4.jpg',
    alt: 'Leo Reader Lion at desk with book waving hello',
    title: 'Reader Leo (Literacy & Storytelling)',
  },
  artist: {
    src: '/lion-5.jpg',
    alt: 'Leo Artist Lion painting on an easel with palette',
    title: 'Artist Leo (Visual Arts & Creativity)',
  },
  meditate: {
    src: '/lion-6.jpg',
    alt: 'Leo Yoga Lion in lotus pose with heart',
    title: 'Zen Leo (Mindfulness & Emotional Calm)',
  },
};

export const InteractiveLeo: React.FC<InteractiveLeoProps> = ({
  pose = 'teacher',
  size = 280,
  className = '',
  greeting,
  subGreeting,
  showMenu = true,
  bubblePlacement = 'auto',
  interactive = true,
  celebration = false,
  celebrationMessage,
  onNavigate,
  onOpenAdmission,
  onAskLeo,
  altText,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isBubbleOpen, setIsBubbleOpen] = useState(celebration);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentPoseData = POSE_IMAGES[pose] || POSE_IMAGES.teacher;

  // Auto-sync celebration open state
  useEffect(() => {
    if (celebration) {
      setIsBubbleOpen(true);
    }
  }, [celebration]);

  // Click outside to close speech bubble (unless in celebration mode)
  useEffect(() => {
    if (!isBubbleOpen || celebration) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsBubbleOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isBubbleOpen, celebration]);

  const handleLeoClick = () => {
    if (!interactive) return;
    setIsBubbleOpen((prev) => !prev);
  };

  const handleActionClick = (action: () => void) => {
    action();
    setIsBubbleOpen(false);
  };

  const triggerAskLeo = () => {
    if (onAskLeo) {
      onAskLeo();
    } else {
      window.dispatchEvent(new CustomEvent('open-ask-leo'));
    }
  };

  const handleScrollTo = (id: string, tabFallback: PageTab) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(tabFallback);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`relative inline-block select-none ${className}`}
    >
      {/* Interactive Speech Bubble */}
      {isBubbleOpen && (
        <div
          className={`absolute z-30 animate-leo-bubble w-[290px] sm:w-[320px] bg-[#FFF8EE] border-3 border-[#F4511E] rounded-2xl p-4 shadow-xl text-left ${
            bubblePlacement === 'left'
              ? 'right-full mr-4 top-4'
              : bubblePlacement === 'right'
              ? 'left-full ml-4 top-4'
              : bubblePlacement === 'bottom'
              ? 'top-full mt-4 left-1/2 -translate-x-1/2'
              : 'bottom-[96%] left-1/2 -translate-x-1/2 sm:left-auto sm:right-0 mb-3'
          }`}
          role="dialog"
          aria-label="Leo Mascot Interactive Bubble"
        >
          {/* Bubble Pointer / Tail */}
          <div
            className={`absolute w-4 h-4 bg-[#FFF8EE] border-[#F4511E] transform rotate-45 ${
              bubblePlacement === 'left'
                ? '-right-2.5 top-8 border-t-3 border-r-3'
                : bubblePlacement === 'right'
                ? '-left-2.5 top-8 border-b-3 border-l-3'
                : bubblePlacement === 'bottom'
                ? '-top-2.5 left-1/2 -translate-x-1/2 border-t-3 border-l-3'
                : '-bottom-2.5 left-1/2 sm:left-auto sm:right-16 -translate-x-1/2 border-b-3 border-r-3'
            }`}
          />

          {/* Header Row */}
          <div className="flex items-center justify-between border-b border-orange-200/80 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F4511E] animate-ping" />
              <span className="font-heading font-extrabold text-xs tracking-wider uppercase text-[#F4511E] flex items-center gap-1">
                LEO SAYS:
              </span>
            </div>
            {!celebration && (
              <button
                onClick={() => setIsBubbleOpen(false)}
                className="p-1 text-gray-400 hover:text-[#183B56] hover:bg-orange-100/50 rounded-full transition-colors"
                aria-label="Close Leo Message"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {/* Message Body */}
          <div className="text-xs sm:text-[13px] font-semibold text-[#183B56] leading-relaxed mb-3">
            {celebration ? (
              <div className="space-y-1">
                <p className="font-heading font-bold text-sm text-[#F4511E]">
                  Roar-some! 🎉
                </p>
                <p>{celebrationMessage || "We'll be in touch soon! Our admissions team can't wait to meet you."}</p>
              </div>
            ) : (
              <div>
                <p className="font-bold text-[#F4511E] mb-1">
                  {greeting || "Hi! I'm Leo! 🦁"}
                </p>
                <p>
                  {subGreeting || 'Ready to learn, explore and roar with me? What would you like to explore?'}
                </p>
              </div>
            )}
          </div>

          {/* Interactive Navigation Options */}
          {showMenu && !celebration && (
            <div className="space-y-1.5 pt-1 border-t border-orange-100">
              <button
                onClick={() =>
                  handleActionClick(() => {
                    handleScrollTo('programs-section', 'programs');
                  })
                }
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-100 hover:border-orange-300 font-bold text-xs text-[#183B56] flex items-center justify-between group transition-all duration-200 shadow-2xs hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">🎒</span>
                  <span>Explore Programs</span>
                </span>
                <span className="text-[10px] text-orange-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  View →
                </span>
              </button>

              <button
                onClick={() =>
                  handleActionClick(() => {
                    if (onOpenAdmission) {
                      onOpenAdmission();
                    } else {
                      handleScrollTo('tour-section', 'book-tour');
                    }
                  })
                }
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-100 hover:border-orange-300 font-bold text-xs text-[#183B56] flex items-center justify-between group transition-all duration-200 shadow-2xs hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">🏫</span>
                  <span>Book a School Tour</span>
                </span>
                <span className="text-[10px] text-orange-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Book →
                </span>
              </button>

              <button
                onClick={() =>
                  handleActionClick(() => {
                    handleScrollTo('meet-leo-section', 'home');
                  })
                }
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-100 hover:border-orange-300 font-bold text-xs text-[#183B56] flex items-center justify-between group transition-all duration-200 shadow-2xs hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">🌟</span>
                  <span>Meet Leo</span>
                </span>
                <span className="text-[10px] text-orange-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Discover →
                </span>
              </button>

              <button
                onClick={() =>
                  handleActionClick(() => {
                    triggerAskLeo();
                  })
                }
                className="w-full text-left px-3 py-2 rounded-xl bg-gradient-to-r from-[#FFF0D4] to-[#FFE2B3] hover:from-[#FFE6BF] hover:to-[#FFD899] border border-[#FFC928] font-extrabold text-xs text-[#F4511E] flex items-center justify-between group transition-all duration-200 shadow-2xs hover:scale-[1.02]"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">💬</span>
                  <span>Ask Leo AI</span>
                </span>
                <span className="text-[10px] bg-[#F4511E] text-white px-1.5 py-0.5 rounded-full font-bold uppercase text-[9px]">
                  Chat
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Hover Peek Tooltip (when bubble is closed) */}
      {!isBubbleOpen && isHovered && interactive && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-[#183B56] text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg border border-[#FFC928] flex items-center gap-1.5 animate-leo-bubble">
          <span>🦁</span>
          <span>Click me to explore with Leo!</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#183B56] border-b border-r border-[#FFC928] transform rotate-45" />
        </div>
      )}

      {/* Leo Mascot Image Container with Idle Animation & Micro-Interactions */}
      <div
        onClick={handleLeoClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`animate-leo-idle relative transition-all duration-300 transform-gpu cursor-pointer ${
          isHovered ? 'scale-105 -translate-y-1 drop-shadow-2xl' : 'drop-shadow-lg'
        }`}
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
        }}
        title={interactive ? 'Click Leo to explore programs, book tours, or ask questions!' : currentPoseData.title}
        role={interactive ? 'button' : 'img'}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleLeoClick();
          }
        }}
      >
        {/* Soft Ambient Radial Backdrop for character warmth */}
        <div
          className="absolute inset-2 -z-10 rounded-full blur-xl opacity-40 transition-opacity duration-300"
          style={{
            backgroundColor: isHovered ? '#FFC928' : '#FFA000',
          }}
        />

        {/* Source of truth: Original Uploaded Leo Image */}
        <img
          src={currentPoseData.src}
          alt={altText || currentPoseData.alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
          }}
          className="rounded-3xl pointer-events-none transition-transform duration-300"
          loading="eager"
        />

        {/* Click Me Cue Pill badge on hover */}
        {interactive && !isBubbleOpen && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#F4511E] text-white text-[10px] sm:text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F] animate-ping" />
            <span>Click Leo!</span>
          </div>
        )}
      </div>
    </div>
  );
};
