import React, { useState, useEffect, useRef } from 'react';
import { PageTab } from '../types';

export type LeoCharacterState =
  | 'welcome'
  | 'idle'
  | 'learning'
  | 'excited'
  | 'music'
  | 'art'
  | 'reading'
  | 'tour'
  | 'thinking'
  | 'talking'
  | 'celebrating'
  | 'calm';

export interface LeoCharacterProps {
  state?: LeoCharacterState;
  message?: string;
  subMessage?: string;
  interactive?: boolean;
  size?: number;
  className?: string;
  showActions?: boolean;
  bubblePlacement?: 'top' | 'right' | 'left' | 'bottom' | 'auto';
  autoDismissIntro?: boolean;
  introDurationMs?: number;
  celebrating?: boolean;
  celebrationMessage?: string;
  onNavigate?: (tab: PageTab) => void;
  onOpenAdmission?: () => void;
  onAskLeo?: () => void;
  altText?: string;
}

// ---------------------------------------------------------------------------
// CHARACTER ASSET CONFIGURATION & STATE MAPPING
// Directly referencing public folder mascot files
// ---------------------------------------------------------------------------
export const LEO_ASSETS = [
  { id: 'lion-1', src: '/lion-1.jpg', role: 'Teacher & Guide', desc: 'Learning, curiosity & academics' },
  { id: 'lion-2', src: '/lion-2.jpg', role: 'Superhero Leo', desc: 'Confidence, STEM & celebration' },
  { id: 'lion-3', src: '/lion-3.jpg', role: 'Music Leo', desc: 'Singing, dance & movement' },
  { id: 'lion-4', src: '/lion-4.jpg', role: 'Reader Leo', desc: 'Storytelling & reading desk' },
  { id: 'lion-5', src: '/lion-5.jpg', role: 'Artist Leo', desc: 'Visual arts, easel & painting' },
  { id: 'lion-6', src: '/lion-6.jpg', role: 'Zen Leo', desc: 'Mindfulness, calm & yoga' },
] as const;

// Preload helper to ensure seamless image state swapping without network delays
let imagesPreloaded = false;
export const preloadLeoImages = () => {
  if (imagesPreloaded || typeof window === 'undefined') return;
  imagesPreloaded = true;
  LEO_ASSETS.forEach((asset) => {
    const img = new Image();
    img.src = asset.src;
  });
};

interface StateConfig {
  imageSrc: string;
  fallbackIcon: string;
  alt: string;
  defaultMessage: string;
  defaultSubMessage: string;
  motionClass: string;
  bubbleClass?: string;
}

const STATE_MAP: Record<LeoCharacterState, StateConfig> = {
  welcome: {
    imageSrc: '/lion-1.jpg',
    fallbackIcon: '🦁🎒',
    alt: "Leo the Lion welcoming visitors to A Kid's Pre School",
    defaultMessage: "Hi! I'm Leo! 🦁",
    defaultSubMessage: "I'll show you around our joyful preschool!",
    motionClass: 'animate-leo-welcome',
  },
  idle: {
    imageSrc: '/lion-1.jpg',
    fallbackIcon: '🦁✨',
    alt: 'Leo the Lion standing friendly and curious',
    defaultMessage: "Hi! I'm Leo. Ready to explore?",
    defaultSubMessage: "Come on, let's see what we learn today!",
    motionClass: 'animate-leo-breathe',
  },
  learning: {
    imageSrc: '/lion-1.jpg',
    fallbackIcon: '🦁📚',
    alt: 'Teacher Leo with blue glasses pointing to the chalkboard',
    defaultMessage: "Come on, let's see what we learn today! 📚",
    defaultSubMessage: 'Play-based learning opens up magical worlds.',
    motionClass: 'animate-leo-breathe',
  },
  thinking: {
    imageSrc: '/lion-1.jpg',
    fallbackIcon: '🦁💡',
    alt: 'Leo thinking with his glasses and chalkboard',
    defaultMessage: 'Hmm, let Leo check that for you...',
    defaultSubMessage: 'Searching our preschool memory bank!',
    motionClass: 'animate-leo-think',
  },
  talking: {
    imageSrc: '/lion-1.jpg',
    fallbackIcon: '🦁💬',
    alt: 'Leo explaining and speaking warmly',
    defaultMessage: 'Here is what I found for you! 🦁',
    defaultSubMessage: 'Ask me anything about our campus or admissions.',
    motionClass: 'animate-leo-talk',
  },
  excited: {
    imageSrc: '/lion-2.jpg',
    fallbackIcon: '🦁⚡',
    alt: 'Superhero Leo with red mask and lightning bolt cape',
    defaultMessage: 'That sounds roarsome! 🦁',
    defaultSubMessage: 'Every child is a superhero with boundless curiosity.',
    motionClass: 'animate-leo-cheer',
  },
  celebrating: {
    imageSrc: '/lion-2.jpg',
    fallbackIcon: '🦁🎉',
    alt: 'Superhero Leo celebrating a successful enquiry',
    defaultMessage: 'Roar-some! 🎉',
    defaultSubMessage: "We'll see you soon at campus!",
    motionClass: 'animate-leo-celebrate',
  },
  music: {
    imageSrc: '/lion-3.jpg',
    fallbackIcon: '🦁🎵',
    alt: 'Music Leo with golden DJ headphones surrounded by musical notes',
    defaultMessage: 'Sing, dance, and feel the beat! 🎵',
    defaultSubMessage: 'Rhythm circles, joyful instruments, and singing all day.',
    motionClass: 'animate-leo-sway',
  },
  reading: {
    imageSrc: '/lion-4.jpg',
    fallbackIcon: '🦁📖',
    alt: 'Reader Leo at his school desk with a book, waving hello',
    defaultMessage: 'Welcome to our story den! 📖',
    defaultSubMessage: 'Picture books, fairy tales, and phonics safaris.',
    motionClass: 'animate-leo-wave',
  },
  art: {
    imageSrc: '/lion-5.jpg',
    fallbackIcon: '🦁🎨',
    alt: 'Artist Leo painting on an easel with his color palette',
    defaultMessage: "Let's paint a masterpiece! 🎨",
    defaultSubMessage: 'From finger paintings to clay crafts and imagination.',
    motionClass: 'animate-leo-breathe',
  },
  calm: {
    imageSrc: '/lion-6.jpg',
    fallbackIcon: '🦁🧘',
    alt: 'Zen Leo in lotus yoga pose with glowing heart',
    defaultMessage: 'Take a deep breath and smile! 🧘',
    defaultSubMessage: 'Animal yoga, mindfulness, and calm confident hearts.',
    motionClass: 'animate-leo-calm',
  },
  tour: {
    imageSrc: '/lion-1.jpg',
    fallbackIcon: '🦁🏫',
    alt: 'Leo inviting parents to a campus walkthrough',
    defaultMessage: 'Come see where the adventure begins! 🦁',
    defaultSubMessage: 'Shall we book a school tour?',
    motionClass: 'animate-leo-welcome',
  },
};

export const LeoCharacter: React.FC<LeoCharacterProps> = ({
  state = 'idle',
  message,
  subMessage,
  interactive = true,
  size = 280,
  className = '',
  showActions = true,
  bubblePlacement = 'auto',
  autoDismissIntro = false,
  introDurationMs = 6000,
  celebrating = false,
  celebrationMessage,
  onNavigate,
  onOpenAdmission,
  onAskLeo,
  altText,
}) => {
  // Preload character artwork
  useEffect(() => {
    preloadLeoImages();
  }, []);

  const activeStateKey = (celebrating ? 'celebrating' : (state || 'idle')) as LeoCharacterState;
  const config = STATE_MAP[activeStateKey] || STATE_MAP.idle;

  // Track image crossfade when state changes
  const [displayedSrc, setDisplayedSrc] = useState(config.imageSrc);
  const [isFading, setIsFading] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (config.imageSrc !== displayedSrc) {
      setIsFading(true);
      const timer = setTimeout(() => {
        setDisplayedSrc(config.imageSrc);
        setImageError(false);
        setIsFading(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [config.imageSrc, displayedSrc]);

  // Speech bubble visibility management — hidden by default, show on hover
  const [isBubbleVisible, setIsBubbleVisible] = useState(celebrating);
  const [isHovered, setIsHovered] = useState(false);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show celebration bubble when celebrating prop is true
  useEffect(() => {
    if (celebrating) {
      setIsBubbleVisible(true);
    }
  }, [celebrating]);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const handleMouseEnter = () => {
    if (!interactive || celebrating) return;
    clearHideTimer();
    setIsHovered(true);
    setIsBubbleVisible(true);
  };

  const handleMouseLeave = () => {
    if (!interactive || celebrating) return;
    setIsHovered(false);
    clearHideTimer();
    hideTimerRef.current = setTimeout(() => {
      setIsBubbleVisible(false);
    }, 200);
  };

  // For mobile: tap to toggle
  const handleCharacterClick = () => {
    if (!interactive || celebrating) return;
    clearHideTimer();
    setIsBubbleVisible((prev) => !prev);
  };

  const handleAction = (actionFn: () => void) => {
    actionFn();
    setIsBubbleVisible(false);
    setIsUserInteracting(false);
  };

  const handleOpenAskLeo = () => {
    if (onAskLeo) {
      onAskLeo();
    } else {
      window.dispatchEvent(new CustomEvent('open-ask-leo'));
    }
  };

  const handleScrollTo = (sectionId: string, fallbackTab: PageTab) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    } else if (onNavigate) {
      onNavigate(fallbackTab);
    }
  };

  const activeMessage = celebrationMessage || message || config.defaultMessage;
  const activeSubMessage = subMessage || config.defaultSubMessage;

  return (
    <div
      ref={containerRef}
      className={`relative inline-flex items-end justify-center select-none ${className}`}
    >
      {/* ----------------------------------------------------------------- */}
      {/* LEO SPEECH BUBBLE */}
      {/* ----------------------------------------------------------------- */}
      {isBubbleVisible && (
        <div
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className={`absolute z-50 animate-leo-bubble w-[290px] sm:w-[320px] max-w-[calc(100vw-32px)] bg-[#FFF8EE] border-3 border-[#F4511E] rounded-2xl p-4 shadow-2xl text-left pointer-events-auto ${
            bubblePlacement === 'left'
              ? 'right-full mr-4 bottom-8'
              : bubblePlacement === 'right'
              ? 'left-full ml-4 bottom-8'
              : bubblePlacement === 'bottom'
              ? 'top-full mt-4 left-1/2 -translate-x-1/2'
              : 'bottom-[96%] left-1/2 -translate-x-1/2 mb-3'
          }`}
          role="dialog"
          aria-label="Leo Mascot Speech Bubble"
        >
          {/* Speech Bubble Tail */}
          <div
            className={`absolute w-4 h-4 bg-[#FFF8EE] border-[#F4511E] transform rotate-45 ${
              bubblePlacement === 'left'
                ? '-right-2.5 bottom-10 border-t-3 border-r-3'
                : bubblePlacement === 'right'
                ? '-left-2.5 bottom-10 border-b-3 border-l-3'
                : bubblePlacement === 'bottom'
                ? '-top-2.5 left-1/2 -translate-x-1/2 border-t-3 border-l-3'
                : '-bottom-2.5 left-1/2 -translate-x-1/2 border-b-3 border-r-3'
            }`}
          />

          {/* Bubble Header */}
          <div className="flex items-center justify-between border-b border-orange-200/90 pb-2 mb-2.5">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#F4511E]" />
              <span className="font-heading font-black text-xs tracking-wider uppercase text-[#F4511E]">
                LEO SAYS:
              </span>
            </div>
            {!celebrating && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsBubbleVisible(false);
                }}
                className="text-gray-400 hover:text-[#183B56] hover:bg-orange-100/50 p-1 rounded-full transition-colors cursor-pointer"
                aria-label="Close Leo speech bubble"
              >
                ✕
              </button>
            )}
          </div>

          {/* Bubble Message Body */}
          <div className="text-xs sm:text-[13px] font-semibold text-[#183B56] leading-relaxed mb-3">
            <p className="font-bold text-[#F4511E] text-sm mb-1">{activeMessage}</p>
            <p className="text-gray-700">{activeSubMessage}</p>
          </div>

          {/* Interactive Navigation Actions */}
          {showActions && !celebrating && interactive && (
            <div className="space-y-1.5 pt-2 border-t border-orange-200/60">
              <button
                onClick={() =>
                  handleAction(() => handleScrollTo('programs-section', 'programs'))
                }
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-100 hover:border-orange-300 font-bold text-xs text-[#183B56] flex items-center justify-between group transition-all duration-200 shadow-2xs hover:scale-[1.015] cursor-pointer"
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
                  handleAction(() => {
                    if (onOpenAdmission) {
                      onOpenAdmission();
                    } else {
                      handleScrollTo('tour-section', 'book-tour');
                    }
                  })
                }
                className="w-full text-left px-3 py-2 rounded-xl bg-white hover:bg-orange-50 border border-orange-100 hover:border-orange-300 font-bold text-xs text-[#183B56] flex items-center justify-between group transition-all duration-200 shadow-2xs hover:scale-[1.015] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">🏫</span>
                  <span>Book Campus Tour</span>
                </span>
                <span className="text-[10px] text-orange-500 font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                  Book →
                </span>
              </button>

              <button
                onClick={() => handleAction(handleOpenAskLeo)}
                className="w-full text-left px-3 py-2 rounded-xl bg-gradient-to-r from-[#FFF0D4] to-[#FFE2B3] hover:from-[#FFE6BF] hover:to-[#FFD899] border border-[#FFC928] font-extrabold text-xs text-[#F4511E] flex items-center justify-between group transition-all duration-200 shadow-2xs hover:scale-[1.015] cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <span className="text-sm">💬</span>
                  <span>Ask Leo (AI Chat)</span>
                </span>
                <span className="text-[10px] bg-[#F4511E] text-white px-2 py-0.5 rounded-full font-bold uppercase text-[9px] tracking-wide">
                  Instant
                </span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* HOVER TOOLTIP */}
      {/* ----------------------------------------------------------------- */}
      {!isBubbleVisible && isHovered && interactive && (
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-[#183B56] text-white px-3.5 py-1.5 rounded-full text-xs font-bold shadow-lg border border-[#FFC928] flex items-center gap-1.5 animate-leo-bubble">
          <span>🦁</span>
          <span>Hover or tap to explore!</span>
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-[#183B56] border-b border-r border-[#FFC928] transform rotate-45" />
        </div>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* LEO CHARACTER IMAGE CONTAINER */}
      {/* ----------------------------------------------------------------- */}
      <div
        onClick={handleCharacterClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`${config.motionClass} relative transition-all duration-300 transform-gpu cursor-pointer group flex items-center justify-center ${
          isHovered ? 'scale-105 -translate-y-1 drop-shadow-2xl' : 'drop-shadow-lg'
        }`}
        style={{
          width: typeof size === 'number' ? `${size}px` : size,
          height: typeof size === 'number' ? `${size}px` : size,
          minWidth: typeof size === 'number' ? `${size}px` : size,
          minHeight: typeof size === 'number' ? `${size}px` : size,
        }}
        title={interactive ? 'Click Leo to explore with your preschool guide!' : config.alt}
        role={interactive ? 'button' : 'img'}
        tabIndex={interactive ? 0 : undefined}
        onKeyDown={(e) => {
          if (interactive && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            handleCharacterClick();
          }
        }}
      >
        {/* Soft Organic Shadow under Leo's feet */}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3/4 h-4 bg-black/15 rounded-full blur-md -z-10" />

        {!imageError ? (
          <img
            src={displayedSrc}
            alt={altText || config.alt}
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('lion-')) {
                const match = target.src.match(/lion-(\d)\.jpg/);
                if (match) {
                  target.src = `/lion%20${match[1]}.jpg`;
                  return;
                }
              }
              setImageError(true);
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'contain',
            }}
            className={`rounded-3xl pointer-events-none transition-all duration-300 drop-shadow-md ${
              isFading ? 'opacity-40 scale-95' : 'opacity-100 scale-100'
            }`}
            loading="eager"
          />
        ) : (
          <div className="w-full h-full rounded-3xl bg-white/90 border-4 border-[#FFD21F] shadow-xl flex flex-col items-center justify-center p-4 text-center">
            <span className="text-7xl">{config.fallbackIcon}</span>
            <span className="font-heading font-black text-sm text-[#173B5E] mt-2">
              Meet Leo The Lion
            </span>
          </div>
        )}

        {/* Interactive Cue Badge on hover */}
        {interactive && !isBubbleVisible && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-[#F4511E] text-white text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-md border-2 border-white flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]" />
            <span>Chat with Leo</span>
          </div>
        )}
      </div>
    </div>
  );
};
