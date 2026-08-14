import React, { useEffect, useState } from 'react';
import { AKPLogo, LeoReader, StarDeco } from './MascotIcons';

interface LoadingScreenProps {
  onFinishLoading?: () => void;
  onFinish?: () => void;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  onFinishLoading,
  onFinish,
}) => {
  const [progress, setProgress] = useState(0);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleComplete = () => {
    setIsFadingOut(true);
    setTimeout(() => {
      if (onFinishLoading) {
        onFinishLoading();
      } else if (onFinish) {
        onFinish();
      }
    }, 350);
  };

  useEffect(() => {
    // Increment progress smoothly over ~1.6 - 1.8 seconds (30ms * ~55 steps)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const step = prev < 60 ? 3 : prev < 90 ? 2 : 1;
        const next = prev + step;
        if (next >= 100) {
          clearInterval(interval);
          handleComplete();
          return 100;
        }
        return next;
      });
    }, 30);

    // Absolute safety fallback timer: unconditionally finish after 2.4 seconds
    const safetyTimer = setTimeout(() => {
      clearInterval(interval);
      setProgress(100);
      handleComplete();
    }, 2400);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimer);
    };
  }, []);

  return (
    <div
      id="loading-screen"
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#FFF9EC] text-[#173B5E] transition-all duration-300 select-none px-6 ${
        isFadingOut ? 'opacity-0 scale-98 pointer-events-none' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background Decorative Shapes */}
      <div className="absolute top-12 left-12 opacity-40 animate-float pointer-events-none">
        <StarDeco size={36} color="#FFD21F" />
      </div>
      <div className="absolute bottom-16 right-12 opacity-40 animate-float-reverse pointer-events-none">
        <StarDeco size={44} color="#F4511E" />
      </div>
      <div className="absolute top-24 right-20 w-32 h-32 rounded-full bg-[#29B6F6]/10 blur-2xl pointer-events-none"></div>
      <div className="absolute bottom-20 left-20 w-40 h-40 rounded-full bg-[#FF4F6D]/10 blur-2xl pointer-events-none"></div>

      <div className="flex flex-col items-center text-center max-w-md w-full relative z-10">
        {/* School Logo */}
        <div className="mb-4 transform transition hover:scale-105 duration-300">
          <AKPLogo size={90} showText={false} />
        </div>

        {/* Brand Heading */}
        <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F4511E] tracking-tight mb-1">
          A KID’S PRE SCHOOL
        </h1>
        <p className="font-heading font-semibold text-base sm:text-lg text-[#173B5E] mb-5">
          Where little minds grow, explore & roar!
        </p>

        {/* Leo Mascot Centerpiece */}
        <div className="my-2 relative">
          <LeoReader size={180} animate={true} />
        </div>

        {/* Progress Bar Container */}
        <div className="w-full max-w-xs mt-4">
          <div className="h-3.5 w-full bg-[#FFF1D6] rounded-full overflow-hidden border-2 border-[#FFD21F] p-0.5 shadow-inner">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#F4511E] via-[#FF8A3D] to-[#FFD21F] transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 px-1 text-xs font-bold text-[#173B5E]/70 tracking-wider uppercase">
            <span>Entering Leo&apos;s World...</span>
            <span className="text-[#F4511E] font-extrabold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};
