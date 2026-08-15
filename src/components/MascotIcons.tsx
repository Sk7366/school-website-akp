import React, { useState } from 'react';

export interface MascotProps {
  className?: string;
  size?: number | string;
  animate?: boolean;
  alt?: string;
}

// =========================================================================
// 1. OFFICIAL AKP SCHOOL LOGO (Referencing /public/akp-logo.jpeg)
// Displays the official school crest with lion badge and crisp text
// =========================================================================
export const AKPLogo: React.FC<{
  className?: string;
  size?: number | string;
  showText?: boolean;
}> = ({ className = '', size = 56, showText = true }) => {
  const [imgFailed, setImgFailed] = useState(false);
  const pixelSize = typeof size === 'number' ? size : parseInt(String(size), 10) || 56;

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <div
        className="relative shrink-0 flex items-center justify-center rounded-2xl overflow-hidden shadow-md bg-white border-2 border-[#FFD21F]/80 p-0.5"
        style={{
          width: `${pixelSize}px`,
          height: `${pixelSize * 1.15}px`,
          minWidth: `${pixelSize}px`,
        }}
      >
        {!imgFailed ? (
          <img
            src="/akp-logo.jpeg"
            alt="A KID's Pre School Official Logo"
            referrerPolicy="no-referrer"
            onError={(e) => {
              const target = e.currentTarget;
              if (target.src.includes('akp-logo.jpeg')) {
                target.src = '/akp%20logo.jpeg';
              } else {
                setImgFailed(true);
              }
            }}
            className="w-full h-full object-contain drop-shadow-xs"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-b from-[#173B5E] to-[#0D243B] flex flex-col items-center justify-center p-1 text-center">
            <span className="text-xl">🦁</span>
            <span className="text-[7px] font-black text-[#FFD21F] tracking-tighter leading-none mt-0.5 uppercase">
              AKP
            </span>
          </div>
        )}
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5 leading-tight">
            <span className="font-heading font-black text-xl sm:text-2xl text-[#F4511E] tracking-tight">
              A KID’S
            </span>
            <span className="font-heading font-extrabold text-xl sm:text-2xl text-[#173B5E]">
              PRE SCHOOL
            </span>
          </div>
          <span className="text-[11px] font-bold text-[#FF8A3D] tracking-wider uppercase flex items-center gap-1">
            <span className="inline-block w-2 h-2 rounded-full bg-[#FFD21F] animate-pulse"></span>
            Where Little Minds Roar &amp; Grow
          </span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 2. TEACHER LEO (Referencing /public/lion-1.jpg)
// Blue glasses, pointer stick & blackboard
// =========================================================================
export const LeoTeacher: React.FC<MascotProps> = ({
  className = '',
  size = 260,
  animate = true,
  alt = 'Leo the Teacher Lion',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center ${
        animate ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {!imgFailed ? (
        <img
          src="/lion-1.jpg"
          alt={alt}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('lion-1.jpg')) {
              target.src = '/lion%201.jpg';
            } else {
              setImgFailed(true);
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="rounded-2xl drop-shadow-xl"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-[#E1F5FE] border-3 border-[#29B6F6] flex flex-col items-center justify-center p-4 text-center">
          <span className="text-6xl">🦁📚</span>
          <span className="font-heading font-black text-sm text-[#173B5E] mt-2">Teacher Leo</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 3. SUPERHERO LEO (Referencing /public/lion-2.jpg)
// Red mask, lightning bolt suit & cape
// =========================================================================
export const LeoSuper: React.FC<MascotProps> = ({
  className = '',
  size = 260,
  animate = true,
  alt = 'Leo the Superhero Lion',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center ${
        animate ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {!imgFailed ? (
        <img
          src="/lion-2.jpg"
          alt={alt}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('lion-2.jpg')) {
              target.src = '/lion%202.jpg';
            } else {
              setImgFailed(true);
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="rounded-2xl drop-shadow-xl"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-[#FFF3E0] border-3 border-[#F4511E] flex flex-col items-center justify-center p-4 text-center">
          <span className="text-6xl">🦁⚡</span>
          <span className="font-heading font-black text-sm text-[#173B5E] mt-2">Superhero Leo</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 4. MUSIC LEO (Referencing /public/lion-3.jpg)
// Golden DJ headphones & musical notes
// =========================================================================
export const LeoMusic: React.FC<MascotProps> = ({
  className = '',
  size = 260,
  animate = true,
  alt = 'Leo Music and Dance Lion',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center ${
        animate ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {!imgFailed ? (
        <img
          src="/lion-3.jpg"
          alt={alt}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('lion-3.jpg')) {
              target.src = '/lion%203.jpg';
            } else {
              setImgFailed(true);
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="rounded-2xl drop-shadow-xl"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-[#F3E8FF] border-3 border-[#8B5CF6] flex flex-col items-center justify-center p-4 text-center">
          <span className="text-6xl">🦁🎵</span>
          <span className="font-heading font-black text-sm text-[#173B5E] mt-2">Music Leo</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 5. READER / STUDENT LEO (Referencing /public/lion-4.jpg)
// Sitting at desk with blue book, waving
// =========================================================================
export const LeoReader: React.FC<MascotProps> = ({
  className = '',
  size = 260,
  animate = true,
  alt = 'Leo Student and Reading Lion',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center ${
        animate ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {!imgFailed ? (
        <img
          src="/lion-4.jpg"
          alt={alt}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('lion-4.jpg')) {
              target.src = '/lion%204.jpg';
            } else {
              setImgFailed(true);
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="rounded-2xl drop-shadow-xl"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-[#FFFDE7] border-3 border-[#FFD21F] flex flex-col items-center justify-center p-4 text-center">
          <span className="text-6xl">🦁📖</span>
          <span className="font-heading font-black text-sm text-[#173B5E] mt-2">Reader Leo</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 6. ARTIST LEO (Referencing /public/lion-5.jpg)
// Painting on easel with color palette
// =========================================================================
export const LeoArtist: React.FC<MascotProps> = ({
  className = '',
  size = 260,
  animate = true,
  alt = 'Leo the Artist Lion',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center ${
        animate ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {!imgFailed ? (
        <img
          src="/lion-5.jpg"
          alt={alt}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('lion-5.jpg')) {
              target.src = '/lion%205.jpg';
            } else {
              setImgFailed(true);
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="rounded-2xl drop-shadow-xl"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-[#FCE4EC] border-3 border-[#FF4F6D] flex flex-col items-center justify-center p-4 text-center">
          <span className="text-6xl">🦁🎨</span>
          <span className="font-heading font-black text-sm text-[#173B5E] mt-2">Artist Leo</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 7. MEDITATE / ZEN LEO (Referencing /public/lion-6.jpg)
// Lotus pose, mudra fingers & heart
// =========================================================================
export const LeoMeditate: React.FC<MascotProps> = ({
  className = '',
  size = 260,
  animate = true,
  alt = 'Leo Mindfulness and Yoga Lion',
}) => {
  const [imgFailed, setImgFailed] = useState(false);
  const pixelSize = typeof size === 'number' ? `${size}px` : size;

  return (
    <div
      className={`inline-flex items-center justify-center ${
        animate ? 'hover:scale-105 transition-transform duration-300' : ''
      } ${className}`}
      style={{ width: pixelSize, height: pixelSize }}
    >
      {!imgFailed ? (
        <img
          src="/lion-6.jpg"
          alt={alt}
          referrerPolicy="no-referrer"
          onError={(e) => {
            const target = e.currentTarget;
            if (target.src.includes('lion-6.jpg')) {
              target.src = '/lion%206.jpg';
            } else {
              setImgFailed(true);
            }
          }}
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          className="rounded-2xl drop-shadow-xl"
          loading="eager"
        />
      ) : (
        <div className="w-full h-full rounded-2xl bg-[#E8F5E9] border-3 border-[#5BC85A] flex flex-col items-center justify-center p-4 text-center">
          <span className="text-6xl">🦁🧘</span>
          <span className="font-heading font-black text-sm text-[#173B5E] mt-2">Zen Leo</span>
        </div>
      )}
    </div>
  );
};

// =========================================================================
// 8. Leo Mini Avatar / Thumbnail (Referencing /public/lion-1.jpg)
// =========================================================================
export const LeoAvatar: React.FC<{
  className?: string;
  size?: number;
  alt?: string;
}> = ({ className = '', size = 36, alt = 'Leo Mascot Avatar' }) => {
  const [imgFailed, setImgFailed] = useState(false);

  return !imgFailed ? (
    <img
      src="/lion-1.jpg"
      alt={alt}
      referrerPolicy="no-referrer"
      onError={(e) => {
        const target = e.currentTarget;
        if (target.src.includes('lion-1.jpg')) {
          target.src = '/lion%201.jpg';
        } else {
          setImgFailed(true);
        }
      }}
      style={{
        width: `${size}px`,
        height: `${size}px`,
        objectFit: 'cover',
      }}
      className={`rounded-full border-2 border-orange-300 shadow-xs bg-white ${className}`}
      loading="eager"
    />
  ) : (
    <div
      style={{ width: `${size}px`, height: `${size}px` }}
      className={`rounded-full bg-[#FFD21F] border-2 border-orange-300 flex items-center justify-center text-sm shadow-xs ${className}`}
    >
      🦁
    </div>
  );
};

// =========================================================================
// Decorative Icons
// =========================================================================
export const SunshineDeco: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 48,
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    fill="none"
    className={className}
  >
    <circle cx="50" cy="50" r="24" fill="#FFD21F" />
    <circle
      cx="50"
      cy="50"
      r="28"
      stroke="#FFA000"
      strokeWidth="3"
      strokeDasharray="6 6"
    />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
      <line
        key={i}
        x1="50"
        y1="12"
        x2="50"
        y2="4"
        stroke="#FFD21F"
        strokeWidth="6"
        strokeLinecap="round"
        transform={`rotate(${angle} 50 50)`}
      />
    ))}
  </svg>
);

export const CloudDeco: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 64, color = '#FFFFFF' }) => (
  <svg
    width={size}
    height={size * 0.6}
    viewBox="0 0 120 70"
    fill="none"
    className={className}
  >
    <path
      d="M25 60 L95 60 C108 60 118 50 118 38 C118 26 108 16 96 16 C94 8 85 2 75 2 C63 2 54 9 50 18 C46 14 40 12 34 12 C20 12 10 22 10 36 C10 40 12 44 14 48 C6 50 2 56 2 60 Z"
      fill={color}
      fillOpacity="0.85"
    />
  </svg>
);

export const StarDeco: React.FC<{
  className?: string;
  size?: number;
  color?: string;
}> = ({ className = '', size = 28, color = '#FFD21F' }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={color}
    className={className}
  >
    <polygon points="12,2 15,9 22,9 17,14 19,21 12,17 5,21 7,14 2,9 9,9" />
  </svg>
);

export const RainbowDeco: React.FC<{ className?: string; size?: number }> = ({
  className = '',
  size = 120,
}) => (
  <svg
    width={size}
    height={size * 0.55}
    viewBox="0 0 120 65"
    fill="none"
    className={className}
  >
    <path
      d="M10 60 A50 50 0 0 1 110 60"
      stroke="#FF4F6D"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M22 60 A38 38 0 0 1 98 60"
      stroke="#FFD21F"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M34 60 A26 26 0 0 1 86 60"
      stroke="#5BC85A"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
    <path
      d="M46 60 A14 14 0 0 1 74 60"
      stroke="#29B6F6"
      strokeWidth="8"
      strokeLinecap="round"
      fill="none"
    />
  </svg>
);
