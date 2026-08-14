import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  LeoArtist,
  LeoReader,
  LeoMusic,
  LeoMeditate,
  StarDeco,
  SunshineDeco,
  RainbowDeco,
} from '../components/MascotIcons';
import { PageTab } from '../types';
import {
  BookOpen,
  Compass,
  Sparkles,
  Heart,
  Award,
  CheckCircle2,
  Calendar,
  Users,
  Shield,
  Layers,
  Smile,
  Brain,
  Lightbulb,
  ArrowRight,
} from 'lucide-react';

interface TeachingViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const TeachingView: React.FC<TeachingViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [activeStation, setActiveStation] = useState<number>(0);

  const learningPillars = [
    {
      title: 'LEARN',
      subtitle: 'Cognitive & Phonics Foundation',
      desc: 'Building early language literacy, phonetic letter blending, numeric sense, and logical categorization through engaging tactile play.',
      color: '#F4511E',
      icon: BookOpen,
      mascot: <LeoReader size={150} animate={true} />,
    },
    {
      title: 'EXPLORE',
      subtitle: 'Scientific Inquiry & Nature',
      desc: 'Awakening curious little minds with physical water dynamics, magnetic discovery tables, seed planting, and sensory sand wonder.',
      color: '#29B6F6',
      icon: Compass,
      mascot: <LeoSuper size={150} animate={true} />,
    },
    {
      title: 'CREATE',
      subtitle: 'Art, Music & Self-Expression',
      desc: 'Encouraging boundless creativity through easel finger painting, clay sculpting, rhythmic percussion drums, and theatrical puppetry.',
      color: '#FF4F6D',
      icon: Sparkles,
      mascot: <LeoArtist size={150} animate={true} />,
    },
    {
      title: 'GROW',
      subtitle: 'Empathy, Resilience & Motor Skills',
      desc: 'Cultivating emotional self-regulation, cooperative teamwork, soft-obstacle agility, and respectful lifelong social values.',
      color: '#5BC85A',
      icon: Heart,
      mascot: <LeoMeditate size={150} animate={true} />,
    },
  ];

  const teachingStations = [
    {
      name: 'Sensory Math & Pattern Hub',
      badge: 'Montessori Inspired',
      badgeColor: '#F4511E',
      image: 'https://images.unsplash.com/photo-1596495578065-6e0763fa1178?auto=format&fit=crop&w=800&q=80',
      objective: 'Connecting concrete physical objects to abstract numerals and geometric logic.',
      activities: [
        'Wooden counting rods and bead stairs for quantity recognition',
        '3D geometric solid sorting and tactile sand tracing',
        'Balance scale weight comparisons using acorns and wooden blocks',
      ],
      teacherPrompt: '“Look at these four blue blocks and three yellow blocks! What happens when we build a bridge together?”',
    },
    {
      name: 'Phonics & Storytelling Theater',
      badge: 'Jolly Phonics & Drama',
      badgeColor: '#29B6F6',
      image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&q=80',
      objective: 'Empowering speech clarity, active vocabulary, phonetic blending, and character empathy.',
      activities: [
        'Multi-sensory sandpaper letter tracing with phonetic sound rhymes',
        'Felt-board fairy tale reenactments with Leo puppet characters',
        'Show-and-tell sharing circles building courageous public speaking',
      ],
      teacherPrompt: '“Can you hear the sizzling /s/ sound like a snake in the grass? Let’s trace it in the air together!”',
    },
    {
      name: 'STEAM Discovery Atelier',
      badge: 'Reggio Emilia Inquiry',
      badgeColor: '#FFD21F',
      image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=800&q=80',
      objective: 'Encouraging hypothesis formulation, cause-and-effect testing, and spatial reasoning.',
      activities: [
        'Water canal flow experiments with miniature water wheels and floating leaves',
        'Magnetic labyrinth puzzles exploring polarity and force',
        'Color prism light tables exploring spectrum refraction and shadows',
      ],
      teacherPrompt: '“What do you predict will happen if we add more water to this funnel? Let’s observe!”',
    },
    {
      name: 'Mindful Breathing & Calm Nook',
      badge: 'Emotional Co-Regulation',
      badgeColor: '#8B5CF6',
      image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      objective: 'Teaching self-calming strategies, emotional recognition, and bodily awareness.',
      activities: [
        '“Breathe with Leo” diaphragmatic breathing with plush belly bears',
        'Emotion feeling cards helping children name their feelings without judgment',
        'Soothing acoustic rainsticks and gentle animal yoga stretching',
      ],
      teacherPrompt: '“When our body feels big energy, we take three gentle lion breaths and find our center.”',
    },
  ];

  return (
    <div id="teaching-page-container" className="w-full bg-[#FFF9EC]">
      {/* Header Banner */}
      <section className="relative bg-[#173B5E] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-6 right-8 opacity-25 animate-float pointer-events-none">
          <StarDeco size={36} color="#FFD21F" />
        </div>
        <div className="absolute bottom-6 left-8 opacity-25 animate-float-reverse pointer-events-none">
          <SunshineDeco size={60} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFD21F]/30 text-[#FFD21F] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
            <span>🦁 Child-Centric Pedagogy</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            OUR TEACHING PHILOSOPHY: <br />
            <span className="text-[#FFD21F]">LEARN • EXPLORE • CREATE • GROW</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            We don’t force children into a single mold. We blend the best of Montessori hands-on materials, Play-Way joyful interaction, and Reggio Emilia inquiry so every child flourishes at their own natural pace.
          </p>
        </div>
      </section>

      {/* 4 Core Pillars Grid */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              The 4 Pillars
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              HOW WE NURTURE THE WHOLE CHILD
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              A balanced harmony of intellectual literacy, scientific wonder, artistic expression, and emotional health.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {learningPillars.map((pillar, pIdx) => {
              const IconComp = pillar.icon;
              return (
                <div
                  key={pIdx}
                  className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-8 border-4 shadow-lg flex flex-col sm:flex-row items-center gap-6 group hover:-translate-y-1.5 transition-all"
                  style={{ borderColor: pillar.color }}
                >
                  <div className="shrink-0 flex flex-col items-center">
                    <div className="transform group-hover:scale-105 transition-transform">
                      {pillar.mascot}
                    </div>
                  </div>

                  <div className="space-y-2 text-center sm:text-left">
                    <div
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-white font-heading font-black text-xs uppercase tracking-wider"
                      style={{ backgroundColor: pillar.color }}
                    >
                      <IconComp className="w-3.5 h-3.5" />
                      <span>{pillar.title}</span>
                    </div>

                    <h3 className="font-heading font-black text-xl sm:text-2xl text-[#173B5E]">
                      {pillar.subtitle}
                    </h3>

                    <p className="text-sm text-gray-700 font-medium leading-relaxed">
                      {pillar.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Interactive "Teaching in Action" Simulation */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/15 text-[#0288D1] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Classroom Experience
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              TEACHING IN ACTION: DISCOVERY STATIONS
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Click through the stations below to see how our certified educators turn everyday moments into profound learning breakthroughs.
            </p>
          </div>

          {/* Station Tabs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
            {teachingStations.map((station, sIdx) => {
              const isSelected = activeStation === sIdx;
              return (
                <button
                  key={sIdx}
                  onClick={() => setActiveStation(sIdx)}
                  className={`p-4 rounded-2xl text-left border-3 transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#173B5E] text-white border-[#FFD21F] shadow-lg scale-102'
                      : 'bg-white text-[#173B5E] border-gray-200 hover:border-[#FFD21F]'
                  }`}
                >
                  <span
                    className="inline-block px-2 py-0.5 rounded text-[10px] font-extrabold uppercase mb-1.5"
                    style={{
                      backgroundColor: isSelected ? '#FFD21F' : station.badgeColor,
                      color: isSelected ? '#173B5E' : '#FFFFFF',
                    }}
                  >
                    {station.badge}
                  </span>
                  <h4 className="font-heading font-bold text-xs sm:text-sm leading-snug line-clamp-2">
                    {station.name}
                  </h4>
                </button>
              );
            })}
          </div>

          {/* Selected Station Deep-Dive */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span
                className="px-3 py-1 rounded-full text-white font-extrabold text-xs uppercase"
                style={{ backgroundColor: teachingStations[activeStation].badgeColor }}
              >
                {teachingStations[activeStation].badge}
              </span>

              <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E]">
                {teachingStations[activeStation].name}
              </h3>

              <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-orange-100">
                <div className="text-xs font-bold text-[#F4511E] uppercase tracking-wider mb-1">
                  🎯 Learning Objective:
                </div>
                <p className="text-xs sm:text-sm text-gray-700 font-medium">
                  {teachingStations[activeStation].objective}
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-[#173B5E] mb-2">
                  Hands-On Materials & Methods:
                </h4>
                <div className="space-y-2">
                  {teachingStations[activeStation].activities.map((act, aIdx) => (
                    <div
                      key={aIdx}
                      className="flex items-start gap-2 text-xs sm:text-sm text-gray-700 font-semibold"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#5BC85A] shrink-0 mt-0.5" />
                      <span>{act}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50/80 border-2 border-blue-200">
                <div className="text-xs font-bold text-[#0288D1] uppercase tracking-wider mb-1">
                  👩‍🏫 Educator’s Gentle Guidance Prompt:
                </div>
                <p className="text-xs sm:text-sm text-[#173B5E] italic font-semibold">
                  {teachingStations[activeStation].teacherPrompt}
                </p>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-lg border-3 border-gray-100 aspect-4/3">
                <img
                  src={teachingStations[activeStation].image}
                  alt={teachingStations[activeStation].name}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Parent-Teacher Partnership Model */}
      <section className="py-16 sm:py-24 bg-white border-t-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-heading font-extrabold text-xs tracking-wider uppercase">
                Collaborative Growth
              </span>

              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#173B5E] tracking-tight">
                THE PARENT-TEACHER PARTNERSHIP: TRANSPARENT & LOVING
              </h2>

              <p className="text-gray-700 text-base leading-relaxed font-medium">
                You are your child’s first and most important teacher. We work in total synchronization with your family to ensure consistency between home and preschool.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#FFD21F] flex items-start gap-3">
                  <Smile className="w-5 h-5 text-[#F4511E] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#173B5E]">
                      Daily Digital Photo Updates & Meal Logs
                    </h4>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      Receive real-time photos, snack intake reports, and nap logs on our secure parent app.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#29B6F6] flex items-start gap-3">
                  <Brain className="w-5 h-5 text-[#0288D1] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#173B5E]">
                      Monthly Developmental Portfolios
                    </h4>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      Personalized milestone trackers measuring phonics recognition, motor dexterity, and social bonding.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#8B5CF6] flex items-start gap-3">
                  <Users className="w-5 h-5 text-[#7C3AED] shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-heading font-bold text-sm text-[#173B5E]">
                      Open Door Policy & Parent Coffee Mornings
                    </h4>
                    <p className="text-xs text-gray-600 font-medium mt-0.5">
                      Regular one-on-one educator chats, child psychologist parenting workshops, and festive family celebration days.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="p-8 rounded-3xl bg-[#FFF9EC] border-4 border-[#FFD21F] shadow-xl text-center max-w-md w-full">
                <div className="mb-4">
                  <LeoTeacher size={190} animate={true} />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#173B5E] mb-2">
                  Come Observe A Live Class 🦁
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mb-6">
                  Sit in on a morning circle time, watch the joyful interactions, and see why children rush into our classrooms with big smiles every morning.
                </p>
                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => onNavigate('book-tour')}
                    className="w-full py-3 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4" />
                    Book Observation Visit
                  </button>
                  <button
                    onClick={onOpenAdmissionModal}
                    className="w-full py-2.5 rounded-xl bg-white hover:bg-orange-50 text-[#173B5E] font-heading font-bold text-xs transition-colors border border-gray-200"
                  >
                    Enquire Admissions 2026–27
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
