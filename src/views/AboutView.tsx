import React, { useState } from 'react';
import { LeoCharacter } from '../components/LeoCharacter';
import {
  StarDeco,
  SunshineDeco,
  RainbowDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { PageTab } from '../types';
import {
  Shield,
  Heart,
  Award,
  Compass,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  ArrowRight,
  Eye,
  Target,
  Smile,
  BookOpen,
  MapPin,
  Clock,
  Camera,
  Activity,
  Zap,
} from 'lucide-react';

interface AboutViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigate, onOpenAdmissionModal }) => {
  const [activeCampusTab, setActiveCampusTab] = useState<'classrooms' | 'outdoors' | 'sensory' | 'safety'>('classrooms');

  const campusFeatures = {
    classrooms: {
      title: 'Sunlit, Child-Centric Classrooms',
      desc: 'Our expansive, open-concept rooms are bathed in natural daylight, furnished with rounded-edge ergonomic wooden furniture, low reach-in bookshelves, and specialized Montessori activity stations.',
      image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Non-toxic organic materials and soft carpeting',
        'Air-purified environments with HEPA filtration',
        'Individual child cubbies and self-help stations',
        'Interactive phonics and storytelling corners',
      ],
    },
    outdoors: {
      title: 'Safe Soft-Grass Outdoor Play Oasis',
      desc: 'Fresh air and physical gross motor development are vital. Our enclosed outdoor park features impact-absorbing rubberized grass, age-appropriate obstacle courses, and a tricycle track.',
      image: 'https://images.unsplash.com/photo-1576267423445-b2e0074d68a4?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Shock-absorbing turf for tumble-safe play',
        'Sensory sandbox with kinetic clean sand',
        'Little botanical herb garden and butterfly patch',
        'Balance beams, swings, and climbing tunnels',
      ],
    },
    sensory: {
      title: 'Creative Atelier & Discovery Lab',
      desc: 'A dedicated tactile exploration sanctuary where children interact with water flow dynamics, color pigments, clay textures, musical instruments, and early STEM curiosity kits.',
      image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        'Water displacement and magnetic wonder tables',
        'Washable easel painting and pottery clay station',
        'Acoustic percussion, xylophones, and rhythm den',
        'Micro-gardening and seed germination kits',
      ],
    },
    safety: {
      title: 'Hospital-Grade Safety & Hygiene Infrastructure',
      desc: 'Parents entrust us with their greatest treasure. We honor that sacred trust with round-the-clock CCTV surveillance, finger-safe door guards, verified educators, and trained first responders.',
      image: 'https://images.unsplash.com/photo-1588072432836-e10032774350?auto=format&fit=crop&w=1000&q=80',
      bullets: [
        '24/7 CCTV surveillance across all rooms & corridors',
        'Biometric check-in and strictly verified guardian pickup',
        'Daily UV and hospital-grade non-toxic sanitization',
        'Certified on-site pediatric first-aid educator',
      ],
    },
  };

  const currentFeature = campusFeatures[activeCampusTab];

  const coreValues = [
    {
      title: 'Safety First',
      desc: 'Uncompromising physical security, emotional safety, and sanitization protocols that give parents true peace of mind.',
      color: '#F4511E',
      icon: Shield,
    },
    {
      title: 'Wonder & Curiosity',
      desc: 'Every question a child asks is celebrated. We ignite the natural spark of inquiry that fuels lifelong learning.',
      color: '#29B6F6',
      icon: Compass,
    },
    {
      title: 'Loving Empathy',
      desc: 'Kindness, active listening, and social bonding form the emotional bedrock of all classroom interactions.',
      color: '#FF4F6D',
      icon: Heart,
    },
    {
      title: 'Creative Freedom',
      desc: 'No cookie-cutter templates. We honor individual self-expression through colors, rhythm, dramatic play, and dance.',
      color: '#FFD21F',
      icon: Sparkles,
    },
    {
      title: 'Joyful Independence',
      desc: 'Fostering self-help routines, courageous confidence, problem-solving habits, and primary school readiness.',
      color: '#5BC85A',
      icon: Smile,
    },
    {
      title: 'Strong Community',
      desc: 'A vibrant partnership between parents, passionate educators, and children in a warm, welcoming family environment.',
      color: '#8B5CF6',
      icon: Users,
    },
  ];

  const leadershipTeam = [
    {
      name: 'Dr. Eleanor Vance, Ph.D.',
      role: 'Director of Early Childhood Education',
      experience: '22+ Years Experience',
      bio: 'Former Harvard Early Child Development researcher and author of "Playful Minds". Dr. Eleanor designed our signature 4-stage curriculum.',
      avatarColor: '#F4511E',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Prof. Marcus Thorne',
      role: 'Head of STEAM & Experiential Learning',
      experience: '16+ Years Experience',
      bio: 'Specialist in kinesthetic cognitive development and sensory-driven early science inquiries for toddlers and kindergarteners.',
      avatarColor: '#29B6F6',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Ananya Sharma, M.Ed.',
      role: 'Head of Social-Emotional Wellbeing',
      experience: '14+ Years Experience',
      bio: 'Certified Montessori trainer and child psychologist dedicated to positive reinforcement, gentle separation, and kids yoga mindfulness.',
      avatarColor: '#5BC85A',
      image: 'https://images.unsplash.com/photo-1580894732454-def9d023f03b?auto=format&fit=crop&w=500&q=80',
    },
    {
      name: 'Chef Maria Rossi',
      role: 'Director of Pediatric Nutrition & Wellness',
      experience: '12+ Years Experience',
      bio: 'Certified pediatric dietitian crafting 100% wholesome, balanced, allergy-aware snacks and hot lunches for young growing bodies.',
      avatarColor: '#FFD21F',
      image: 'https://images.unsplash.com/photo-1595273670150-bd0c3c392e46?auto=format&fit=crop&w=500&q=80',
    },
  ];

  return (
    <div id="about-page-container" className="w-full bg-[#FFF9EC]">
      {/* Header Banner */}
      <section className="relative bg-[#173B5E] text-white py-16 sm:py-24 overflow-hidden">
        <div className="absolute top-6 left-10 opacity-30 animate-float pointer-events-none">
          <StarDeco size={36} color="#FFD21F" />
        </div>
        <div className="absolute bottom-6 right-10 opacity-30 animate-float-reverse pointer-events-none">
          <SunshineDeco size={64} />
        </div>
        <div className="absolute -top-10 right-1/4 w-72 h-72 rounded-full bg-[#F4511E]/15 blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFD21F]/30 text-[#FFD21F] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
            <span>🦁 Welcome to Our Story</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            WHERE EVERY CHILD’S JOURNEY <br />
            <span className="text-[#FFD21F]">BEGINS WITH WONDER.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Founded with a singular mission: to create a joyful, secure preschool sanctuary where children fall in love with learning through play, creativity, and the friendly guidance of Leo the Lion.
          </p>
        </div>
      </section>

      {/* Origin Story Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Story Content */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-heading font-extrabold text-xs tracking-wider uppercase">
                Our Genesis & Philosophy
              </span>

              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#173B5E] tracking-tight">
                A Preschool Born from Love, Science, and Big Imaginations
              </h2>

              <p className="text-gray-700 text-base leading-relaxed font-medium">
                At <strong>A Kid’s Pre School</strong>, we believe that early childhood is not a race to formal academics, but a precious window where curiosity, emotional resilience, and kindness take root.
              </p>

              <p className="text-gray-700 text-base leading-relaxed font-medium">
                We observed that many early education centers were either overly rigid with rote drills or lacked structured developmental milestones. We set out to engineer the perfect synthesis: a research-backed environment integrating Montessori sensorial materials, Reggio Emilia expressive arts, and joyful Play-Way discovery.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
                <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#FFD21F] text-center">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#F4511E]">2014</div>
                  <div className="text-xs font-bold text-gray-600 mt-1">Founded with Love</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#29B6F6] text-center">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#0288D1]">4,800+</div>
                  <div className="text-xs font-bold text-gray-600 mt-1">Happy Little Graduates</div>
                </div>
                <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#5BC85A] text-center">
                  <div className="font-heading font-black text-2xl sm:text-3xl text-[#2E7D32]">1:8 Max</div>
                  <div className="text-xs font-bold text-gray-600 mt-1">Educator-to-Child Ratio</div>
                </div>
              </div>
            </div>

            {/* Right Mascot & Heritage Badge */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="relative p-8 rounded-3xl bg-[#FFF9EC] border-4 border-[#FFD21F] shadow-xl flex flex-col items-center text-center">
                <div className="absolute -top-6 bg-[#F4511E] text-white px-5 py-1.5 rounded-full font-heading font-extrabold text-xs uppercase tracking-wider shadow-md">
                  🦁 Meet Our Mascot
                </div>

                <div className="my-4">
                  <LeoCharacter
                    state="excited"
                    size={200}
                    interactive={true}
                    message="That sounds roarsome! 🦁"
                    subMessage="I help every child feel brave, curious, and loved!"
                    showActions={true}
                    onNavigate={onNavigate}
                    onOpenAdmission={onOpenAdmissionModal}
                  />
                </div>

                <h3 className="font-heading font-extrabold text-2xl text-[#173B5E] mb-2">
                  The Story of Leo 🦁
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed font-medium">
                  Leo represents courage, gentle warmth, and boundless curiosity. He reminds every child that being brave doesn’t mean being loud — it means trying something new, helping a friend up, and roaring with joy when you learn a new song!
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Cards */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-4 border-[#29B6F6] shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#29B6F6]/10 rounded-bl-full pointer-events-none"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mb-6 shadow-xs">
                  <Eye className="w-7 h-7" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#0288D1]">
                  Our North Star
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E] mt-1 mb-4">
                  OUR VISION
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-medium">
                  To be the gold standard in early childhood learning — creating nurturing environments where every young child develops unshakable self-confidence, empathetic social awareness, and an enduring passion for discovery that propels them through primary school and life.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#0288D1]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Nurturing Lifelong Joy & Curiosity</span>
              </div>
            </div>

            {/* Mission */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border-4 border-[#F4511E] shadow-xl relative overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#F4511E]/10 rounded-bl-full pointer-events-none"></div>
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FFF3E0] text-[#F4511E] flex items-center justify-center mb-6 shadow-xs">
                  <Target className="w-7 h-7" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#F4511E]">
                  Our Daily Commitment
                </span>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E] mt-1 mb-4">
                  OUR MISSION
                </h3>
                <p className="text-base text-gray-700 leading-relaxed font-medium">
                  To deliver world-class early education through joyful experiential play, certified educator mentorship, hospital-grade safety standards, and robust parent partnerships. We empower every child at their own natural rhythm without stress or comparison.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-gray-100 flex items-center gap-2 text-xs font-bold text-[#F4511E]">
                <CheckCircle2 className="w-4 h-4" />
                <span>Safe, Loving, Stimulating Atmosphere</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values 6-Pillars Grid */}
      <section className="py-16 sm:py-24 bg-white border-y-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD21F]/20 text-[#173B5E] font-heading font-extrabold text-xs tracking-wider uppercase mb-3">
              Guiding Principles
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-4">
              THE VALUES THAT SHAPE OUR WORLD
            </h2>
            <p className="text-base text-gray-700 font-medium">
              Every song we sing, every game we play, and every lesson we craft is anchored in six foundational core values.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {coreValues.map((val, idx) => {
              const IconComp = val.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-8 border-3 shadow-md hover:-translate-y-2 transition-all group"
                  style={{ borderColor: val.color }}
                >
                  <div
                    className="w-12 h-12 rounded-2xl flex items-center justify-center text-white mb-5 shadow-md group-hover:scale-110 transition-transform"
                    style={{ backgroundColor: val.color }}
                  >
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-xl text-[#173B5E] mb-2">
                    {val.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {val.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Campus Infrastructure Explorer */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-heading font-extrabold text-xs tracking-wider uppercase mb-3">
              Designed for Wonder & Safety
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-4">
              OUR CAMPUS & FACILITIES
            </h2>
            <p className="text-base text-gray-700 font-medium">
              Explore purpose-built spaces crafted specifically for early childhood safety, active movement, sensory delight, and calm focus.
            </p>
          </div>

          {/* Tab Selector Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
            {(
              [
                { id: 'classrooms', label: '🏫 Sunlit Classrooms' },
                { id: 'outdoors', label: '🌿 Soft-Grass Playground' },
                { id: 'sensory', label: '🎨 Atelier & STEM Lab' },
                { id: 'safety', label: '🛡️ Safety & Hygiene' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCampusTab(tab.id)}
                className={`px-5 py-3 rounded-2xl font-heading font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer border-2 ${
                  activeCampusTab === tab.id
                    ? 'bg-[#173B5E] text-[#FFD21F] border-[#173B5E] shadow-md scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300 hover:bg-orange-50/50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active Facility Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-extrabold uppercase tracking-wider text-[#F4511E]">
                Featured Facility
              </span>
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#173B5E]">
                {currentFeature.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base leading-relaxed font-medium">
                {currentFeature.desc}
              </p>

              <div className="space-y-2.5 pt-2">
                {currentFeature.bullets.map((b, bIdx) => (
                  <div key={bIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-semibold text-[#173B5E]">
                    <CheckCircle2 className="w-4 h-4 text-[#5BC85A] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onNavigate('book-tour')}
                  className="px-6 py-3 rounded-xl bg-[#F4511E] text-white font-heading font-bold text-xs tracking-wider uppercase shadow-md hover:bg-[#E64A19] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Calendar className="w-4 h-4" />
                  Schedule A Campus Tour
                </button>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-3xl overflow-hidden shadow-lg border-3 border-gray-100 aspect-4/3">
                <img
                  src={currentFeature.image}
                  alt={currentFeature.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership & Advisory Team */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#8B5CF6]/15 text-[#7C3AED] font-heading font-extrabold text-xs tracking-wider uppercase mb-3">
              Passionate Educators
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight mb-4">
              MEET OUR LEADERSHIP & MENTORS
            </h2>
            <p className="text-base text-gray-700 font-medium">
              Guided by experienced early childhood specialists, pediatric psychologists, and certified Montessori educators.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {leadershipTeam.map((leader, lIdx) => (
              <div
                key={lIdx}
                className="bg-[#FFF9EC] rounded-3xl overflow-hidden border-3 shadow-md hover:-translate-y-2 transition-all flex flex-col justify-between group"
                style={{ borderColor: leader.avatarColor }}
              >
                <div>
                  <div className="aspect-square overflow-hidden bg-gray-100">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <span
                      className="text-[11px] font-extrabold uppercase tracking-wider block mb-1"
                      style={{ color: leader.avatarColor }}
                    >
                      {leader.experience}
                    </span>
                    <h3 className="font-heading font-extrabold text-lg text-[#173B5E] leading-snug mb-1">
                      {leader.name}
                    </h3>
                    <p className="text-xs font-bold text-gray-500 mb-3">
                      {leader.role}
                    </p>
                    <p className="text-xs text-gray-600 font-medium leading-relaxed">
                      {leader.bio}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-2 border-t border-orange-100 flex items-center justify-between text-xs font-bold text-[#173B5E]">
                  <span>✨ 100% Verified Care</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Safety Certifications Bar */}
      <section className="py-12 bg-[#173B5E] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="p-4 border-r border-white/10 last:border-0">
              <Shield className="w-8 h-8 text-[#FFD21F] mx-auto mb-2" />
              <div className="font-heading font-extrabold text-base sm:text-lg text-white">ISO 9001:2015</div>
              <div className="text-xs text-white/70">Educational Quality Certified</div>
            </div>
            <div className="p-4 border-r border-white/10 last:border-0">
              <Award className="w-8 h-8 text-[#5ED7E8] mx-auto mb-2" />
              <div className="font-heading font-extrabold text-base sm:text-lg text-white">Montessori Verified</div>
              <div className="text-xs text-white/70">Authentic Sensorial Materials</div>
            </div>
            <div className="p-4 border-r border-white/10 last:border-0">
              <Zap className="w-8 h-8 text-[#FF4F6D] mx-auto mb-2" />
              <div className="font-heading font-extrabold text-base sm:text-lg text-white">First-Aid Ready</div>
              <div className="text-xs text-white/70">100% Certified Responders</div>
            </div>
            <div className="p-4">
              <CheckCircle2 className="w-8 h-8 text-[#5BC85A] mx-auto mb-2" />
              <div className="font-heading font-extrabold text-base sm:text-lg text-white">Green School</div>
              <div className="text-xs text-white/70">Eco-Friendly & Non-Toxic</div>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 sm:py-20 bg-gradient-to-r from-[#F4511E] to-[#FF8A3D] text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-4">
            EXPERIENCE THE DIFFERENCE IN PERSON.
          </h2>
          <p className="text-white/90 text-base sm:text-lg font-medium mb-8 max-w-xl mx-auto">
            We welcome you and your child to visit our campus, observe our rhyme circles, and meet friendly mascot Leo!
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('book-tour')}
              className="px-8 py-4 rounded-2xl bg-[#173B5E] hover:bg-[#102A43] text-white font-heading font-extrabold text-base tracking-wide shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calendar className="w-5 h-5 text-[#FFD21F]" />
              Schedule In-Person Tour
            </button>
            <button
              onClick={onOpenAdmissionModal}
              className="px-8 py-4 rounded-2xl bg-white hover:bg-[#FFF9EC] text-[#173B5E] font-heading font-extrabold text-base tracking-wide shadow-xl hover:-translate-y-1 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#F4511E]" />
              Enquire Admissions
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
