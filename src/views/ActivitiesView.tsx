import React, { useState, useRef, useEffect } from 'react';
import {
  LeoArtist,
  LeoMusic,
  LeoSuper,
  LeoReader,
  LeoTeacher,
  LeoMeditate,
  StarDeco,
  SunshineDeco,
} from '../components/MascotIcons';
import { PageTab } from '../types';
import { ACTIVITIES_DATA } from '../data/preschoolData';
import {
  Palette,
  Music,
  Compass,
  Trees,
  BookOpen,
  Heart,
  Sparkles,
  Play,
  RotateCcw,
  CheckCircle2,
  Calendar,
  Volume2,
  Brush,
  Eraser,
} from 'lucide-react';

interface ActivitiesViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const ActivitiesView: React.FC<ActivitiesViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [activeInteractiveStudio, setActiveInteractiveStudio] = useState<
    'art' | 'music' | 'yoga' | 'nature'
  >('art');

  // Interactive Art Canvas State
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [brushColor, setBrushColor] = useState('#F4511E');
  const [brushSize, setBrushSize] = useState(8);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    draw(e);
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      ctx?.beginPath();
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.strokeStyle = brushColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
  };

  // Interactive Audio Synth for Xylophone / Piano
  const playSoundNote = (freq: number) => {
    try {
      const AudioContextClass =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioContextClass();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.3, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 0.6);
    } catch {
      // Audio context might be restricted before user gesture
    }
  };

  const xylophoneKeys = [
    { label: 'DO (C)', note: 'C4', freq: 261.63, color: '#FF4F6D' },
    { label: 'RE (D)', note: 'D4', freq: 293.66, color: '#F4511E' },
    { label: 'MI (E)', note: 'E4', freq: 329.63, color: '#FFD21F' },
    { label: 'FA (F)', note: 'F4', freq: 349.23, color: '#5BC85A' },
    { label: 'SO (G)', note: 'G4', freq: 392.0, color: '#29B6F6' },
    { label: 'LA (A)', note: 'A4', freq: 440.0, color: '#8B5CF6' },
    { label: 'TI (B)', note: 'B4', freq: 493.88, color: '#EC4899' },
    { label: 'DO (C5)', note: 'C5', freq: 523.25, color: '#FF8A3D' },
  ];

  // Interactive Yoga Breathing Phase
  const [breathingPhase, setBreathingPhase] = useState<'Inhale' | 'Hold' | 'Exhale'>('Inhale');
  const [breathingCount, setBreathingCount] = useState(4);

  useEffect(() => {
    if (activeInteractiveStudio !== 'yoga') return;
    const interval = setInterval(() => {
      setBreathingPhase((prev) => {
        if (prev === 'Inhale') return 'Hold';
        if (prev === 'Hold') return 'Exhale';
        return 'Inhale';
      });
    }, 4000);
    return () => clearInterval(interval);
  }, [activeInteractiveStudio]);

  return (
    <div id="activities-page-container" className="w-full bg-[#FFF9EC]">
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
            <span>🎨 Creative & Sensory Studios</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            WHERE IMAGINATIONS SOAR <br />
            <span className="text-[#FFD21F]">& SENSES COME ALIVE.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Every day is a rich tapestry of tactile art, acoustic rhythm, nature gardening, and mindful movement. Explore our six signature experiential studios below!
          </p>
        </div>
      </section>

      {/* Interactive Studio Play Zone */}
      <section className="py-16 sm:py-24 bg-white border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FF4F6D]/15 text-[#D81B60] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Interactive Kids Playground
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              TRY OUR DIGITAL ACTIVITY STUDIOS!
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Get a playful preview of how our students explore colors, music, and mindfulness!
            </p>
          </div>

          {/* Studio Tab Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {[
              { id: 'art', label: '🎨 Leo’s Finger Paint Pad', color: '#FF4F6D' },
              { id: 'music', label: '🎹 Rainbow Xylophone', color: '#8B5CF6' },
              { id: 'yoga', label: '🦁 Lion Breath Yoga Bubble', color: '#5BC85A' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() =>
                  setActiveInteractiveStudio(tab.id as 'art' | 'music' | 'yoga')
                }
                className={`px-5 py-3 rounded-2xl font-heading font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer border-3 ${
                  activeInteractiveStudio === tab.id
                    ? 'bg-[#173B5E] text-[#FFD21F] border-[#173B5E] shadow-lg scale-105'
                    : 'bg-[#FFF9EC] text-gray-700 border-orange-200 hover:border-[#FFD21F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Studio 1: Art Drawing Pad */}
          {activeInteractiveStudio === 'art' && (
            <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-2xl max-w-4xl mx-auto">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                <div>
                  <h3 className="font-heading font-black text-2xl text-[#173B5E]">
                    Leo’s Finger Painting Studio 🎨
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium">
                    Pick a color and draw on the canvas!
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  {['#F4511E', '#FFD21F', '#29B6F6', '#5BC85A', '#FF4F6D', '#8B5CF6', '#173B5E'].map(
                    (color) => (
                      <button
                        key={color}
                        onClick={() => setBrushColor(color)}
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full transition-transform cursor-pointer border-2 ${
                          brushColor === color ? 'scale-125 border-[#173B5E] shadow-md' : 'border-white'
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    )
                  )}

                  <button
                    onClick={clearCanvas}
                    className="ml-2 px-3 py-1.5 rounded-xl bg-white border border-gray-300 text-xs font-bold text-gray-700 hover:bg-gray-100 flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-[#F4511E]" />
                    Clear
                  </button>
                </div>
              </div>

              <div className="border-3 border-orange-200 rounded-2xl overflow-hidden bg-white shadow-inner">
                <canvas
                  ref={canvasRef}
                  width={750}
                  height={340}
                  onMouseDown={startDrawing}
                  onMouseUp={stopDrawing}
                  onMouseMove={draw}
                  onMouseLeave={stopDrawing}
                  onTouchStart={startDrawing}
                  onTouchEnd={stopDrawing}
                  onTouchMove={draw}
                  className="w-full h-[280px] sm:h-[340px] cursor-crosshair touch-none"
                />
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-gray-600 font-semibold">
                <span>🖌️ Drag your mouse or finger to paint!</span>
                <span className="text-[#F4511E] font-bold">Unlocking visual creativity! 🦁</span>
              </div>
            </div>
          )}

          {/* Studio 2: Interactive Xylophone */}
          {activeInteractiveStudio === 'music' && (
            <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-10 border-4 border-[#8B5CF6] shadow-2xl max-w-4xl mx-auto text-center">
              <div className="mb-6">
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E]">
                  Leo’s Melodic Rainbow Xylophone 🎹
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                  Click or tap the colorful bars to play synthetic musical chime notes!
                </p>
              </div>

              <div className="flex items-end justify-center gap-2 sm:gap-3 py-6 px-4 bg-white rounded-3xl border-3 border-orange-200 shadow-inner overflow-x-auto">
                {xylophoneKeys.map((key, idx) => {
                  const barHeight = 220 - idx * 14;
                  return (
                    <button
                      key={key.note}
                      onClick={() => playSoundNote(key.freq)}
                      className="rounded-2xl text-white font-heading font-extrabold flex flex-col justify-between items-center py-4 px-2.5 sm:px-4 transition-all hover:brightness-110 active:scale-92 cursor-pointer shadow-md"
                      style={{
                        backgroundColor: key.color,
                        height: `${barHeight}px`,
                        minWidth: '52px',
                      }}
                    >
                      <span className="text-xs bg-white/30 rounded-full px-2 py-0.5">{key.note}</span>
                      <span className="text-xs sm:text-sm tracking-wide font-black">{key.label.split(' ')[0]}</span>
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 flex items-center justify-center gap-2 text-xs font-bold text-[#8B5CF6]">
                <Volume2 className="w-4 h-4" />
                <span>Play simple nursery melodies: DO-RE-MI-FA-SO! 🎶</span>
              </div>
            </div>
          )}

          {/* Studio 3: Interactive Lion Breathing Circle */}
          {activeInteractiveStudio === 'yoga' && (
            <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-10 border-4 border-[#5BC85A] shadow-2xl max-w-3xl mx-auto text-center">
              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E] mb-1">
                Breathe With Leo: Lion Mindfulness 🦁
              </h3>
              <p className="text-xs sm:text-sm text-gray-600 font-medium mb-8">
                Watch the glowing bubble expand and contract to calm big emotions.
              </p>

              <div className="relative flex items-center justify-center my-10 min-h-[220px]">
                <div
                  className={`rounded-full flex items-center justify-center transition-all duration-[3800ms] ease-in-out border-4 border-white shadow-2xl ${
                    breathingPhase === 'Inhale'
                      ? 'w-56 h-56 bg-gradient-to-tr from-[#5BC85A] to-[#29B6F6] scale-110'
                      : breathingPhase === 'Hold'
                      ? 'w-56 h-56 bg-gradient-to-tr from-[#FFD21F] to-[#F4511E] scale-110'
                      : 'w-36 h-36 bg-gradient-to-tr from-[#8B5CF6] to-[#FF4F6D] scale-90'
                  }`}
                >
                  <div className="text-white text-center">
                    <span className="font-heading font-black text-2xl uppercase tracking-wider block drop-shadow-md">
                      {breathingPhase}
                    </span>
                    <span className="text-xs font-bold opacity-90">
                      {breathingPhase === 'Inhale' ? 'Breathe In Deep 🌸' : breathingPhase === 'Hold' ? 'Hold Gently ☀️' : 'Slow Lion Exhale 🦁'}
                    </span>
                  </div>
                </div>
              </div>

              <p className="text-xs font-semibold text-gray-600 max-w-md mx-auto leading-relaxed">
                We practice daily lion breathing at 11:45 AM before lunch to help little learners transition smoothly between high-energy outdoor play and calm resting time.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* 6 Signature Studios Grid Showcase */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/15 text-[#0288D1] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Comprehensive Curriculum
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              OUR 6 SIGNATURE ACTIVITY STUDIOS
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Each studio is led by certified specialist instructors using child-safe, non-toxic organic tools.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ACTIVITIES_DATA.map((act) => {
              return (
                <div
                  key={act.id}
                  className="bg-white rounded-3xl p-6 sm:p-7 border-4 shadow-lg hover:-translate-y-2 transition-all flex flex-col justify-between group"
                  style={{ borderColor: act.accentColor }}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span
                        className="px-3 py-1 rounded-full text-white font-extrabold text-[11px] uppercase tracking-wide"
                        style={{ backgroundColor: act.accentColor }}
                      >
                        {act.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-black text-xl text-[#173B5E] mb-2 leading-snug">
                      {act.title}
                    </h3>

                    <p className="text-sm text-gray-600 font-medium leading-relaxed mb-4">
                      {act.description}
                    </p>

                    <div>
                      <h4 className="font-heading font-bold text-xs text-[#173B5E] uppercase tracking-wider mb-2">
                        Skills Developed:
                      </h4>
                      <div className="space-y-1.5">
                        {act.skillsDeveloped.map((skill, sIdx) => (
                          <div
                            key={sIdx}
                            className="flex items-center gap-2 text-xs font-bold text-gray-700"
                          >
                            <CheckCircle2
                              className="w-3.5 h-3.5 shrink-0"
                              style={{ color: act.accentColor }}
                            />
                            <span>{skill}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#173B5E]">
                    <span>Weekly 3x Sessions</span>
                    <span style={{ color: act.accentColor }}>Explore More →</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Parent Take-Home Kit Banner */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#173B5E] to-[#102A43] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            WANT TO SEE OUR LITTLE ARTISTS IN ACTION?
          </h2>
          <p className="text-white/85 text-base sm:text-lg font-medium max-w-2xl mx-auto mb-8">
            Book an in-person campus walkthrough during morning activity hours to witness the joyful wonder firsthand!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('book-tour')}
              className="px-8 py-4 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-base tracking-wide shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-5 h-5" />
              Book Activity Hour Visit
            </button>
            <button
              onClick={onOpenAdmissionModal}
              className="px-8 py-4 rounded-2xl bg-[#FFD21F] hover:bg-[#FFC400] text-[#173B5E] font-heading font-extrabold text-base tracking-wide shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#F4511E]" />
              Enquire Admissions 2026–27
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
