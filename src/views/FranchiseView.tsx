import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  StarDeco,
  SunshineDeco,
  CloudDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { PageTab, FranchiseApplication } from '../types';
import {
  Award,
  TrendingUp,
  ShieldCheck,
  Building,
  CheckCircle2,
  Users,
  Sparkles,
  Phone,
  Mail,
  Send,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  BookOpen,
  GraduationCap,
  Megaphone,
  Settings,
  Handshake,
  Lightbulb,
  TreePine,
  Monitor,
  Globe,
  Rocket,
  Target,
  Compass,
  HandHelping,
  Briefcase,
  BarChart3,
  Zap,
  Star,
  Play,
  ChevronRight,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface FranchiseViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  onSubmitFranchiseLead: (application: Omit<FranchiseApplication, 'id' | 'createdAt' | 'status'>) => void;
}

export const FranchiseView: React.FC<FranchiseViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
  onSubmitFranchiseLead,
}) => {
  // Franchise Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    experience: 'Educator / School Owner',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    onSubmitFranchiseLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      experience: formData.experience,
      investmentBudget: 'To be discussed',
      propertyAvailable: 'To be discussed',
      message: formData.message,
    });

    setSubmitted(true);
    try {
      confetti({
        particleCount: 70,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        phone: '',
        email: '',
        city: '',
        experience: 'Educator / School Owner',
        message: '',
      });
    }, 4000);
  };

  // ── Data ──────────────────────────────────────────────────

  const partnerBenefits = [
    {
      icon: Rocket,
      title: 'Complete Launch Support',
      desc: 'Guidance from planning and setup to the successful launch of your preschool — every step, handled with care.',
      color: '#F4511E',
      bg: '#FFF3E0',
    },
    {
      icon: BookOpen,
      title: 'Curriculum & Academic Framework',
      desc: 'Access to a structured, engaging, child-focused learning methodology proven over years of joyful education.',
      color: '#0288D1',
      bg: '#E1F5FE',
    },
    {
      icon: GraduationCap,
      title: 'Teacher Training & Development',
      desc: 'Training and continuous support to help educators deliver a high-quality, nurturing learning experience.',
      color: '#7B1FA2',
      bg: '#F3E5F5',
    },
    {
      icon: Megaphone,
      title: 'Marketing & Admissions Support',
      desc: 'Assistance with local marketing, branding, digital campaigns, and admissions strategies to fill your classrooms.',
      color: '#F57F17',
      bg: '#FFFDE7',
    },
    {
      icon: Settings,
      title: 'Operations Guidance',
      desc: 'Support with processes, systems, parent communication, and day-to-day centre management.',
      color: '#2E7D32',
      bg: '#E8F5E9',
    },
    {
      icon: Handshake,
      title: 'Continuous Partnership',
      desc: 'Ongoing support instead of leaving franchise partners alone after launch — we grow together.',
      color: '#C62828',
      bg: '#FFEBEE',
    },
  ];

  const differentiators = [
    {
      icon: Heart,
      title: 'Child-Centred Learning',
      desc: 'Learning should feel like exploration, play, creativity, and discovery — not traditional classroom teaching. Every activity is designed around how young children naturally learn.',
      color: '#F4511E',
    },
    {
      icon: TreePine,
      title: 'Learning Beyond the Classroom',
      desc: 'Hands-on activities, celebrations, movement, creativity, storytelling, games, and real-world experiences that make every day an adventure.',
      color: '#2E7D32',
    },
    {
      icon: Users,
      title: 'Strong Parent Connection',
      desc: 'Transparent communication and making parents active participants in their child\'s learning journey — not passive observers.',
      color: '#0288D1',
    },
    {
      icon: Sparkles,
      title: 'A Recognisable & Memorable Brand',
      desc: 'AKP\'s visual identity, mascot Leo, storytelling, and playful personality create a preschool children remember and parents trust.',
      color: '#F57F17',
    },
    {
      icon: Monitor,
      title: 'Technology + Personalisation',
      desc: 'Modern tools and technology support communication, learning experiences, and centre operations — without making education feel robotic.',
      color: '#7B1FA2',
    },
    {
      icon: Globe,
      title: 'Local Community Connection',
      desc: 'Each preschool feels connected to its local community and families while maintaining AKP\'s brand and educational standards.',
      color: '#00838F',
    },
  ];

  const modelBenefits = [
    {
      icon: Award,
      title: 'Brand Advantage',
      desc: 'Join an established and distinctive preschool identity rather than starting everything from scratch.',
    },
    {
      icon: CheckCircle2,
      title: 'Proven Systems',
      desc: 'Receive guidance, processes, curriculum frameworks, and operational support that work.',
    },
    {
      icon: Zap,
      title: 'Faster Launch Journey',
      desc: 'Reduce the complexity of independently building a preschool by following a structured setup process.',
    },
    {
      icon: Megaphone,
      title: 'Marketing Support',
      desc: 'Get help with brand awareness, digital marketing, local outreach, and admissions.',
    },
    {
      icon: GraduationCap,
      title: 'Training & Expertise',
      desc: 'Access knowledge and support for educators and centre operations from day one.',
    },
    {
      icon: Handshake,
      title: 'Long-Term Partnership',
      desc: 'Continue receiving guidance as the preschool grows — we\'re in this together.',
    },
  ];

  const journeySteps = [
    { num: '01', title: 'Connect With Us', desc: 'Understand your vision, location, and goals.', icon: Phone },
    { num: '02', title: 'Location & Planning', desc: 'Evaluate the space and plan the centre setup.', icon: MapPin },
    { num: '03', title: 'Setup & Branding', desc: 'Prepare the learning environment to AKP standards.', icon: Building },
    { num: '04', title: 'Training & Preparation', desc: 'Train educators and prepare operational systems.', icon: GraduationCap },
    { num: '05', title: 'Marketing & Admissions', desc: 'Build awareness and start connecting with local families.', icon: Megaphone },
    { num: '06', title: 'Launch & Ongoing Support', desc: 'Launch the centre with continued guidance and support.', icon: Rocket },
  ];

  const bangaloreConsiderations = [
    'Choosing a family-friendly residential catchment area',
    'Understanding the local preschool landscape',
    'Ensuring the property is suitable and safe for young children',
    'Following applicable local regulations, permissions, and safety requirements',
    'Creating an accessible and welcoming environment for children and parents',
    'Building relationships within the local community',
  ];

  return (
    <div id="franchise-page-container" className="w-full bg-[#FFF9EC]">

      {/* ═══════════════════════════════════════════════════════
          HERO BANNER
      ═══════════════════════════════════════════════════════ */}
      <section className="relative bg-[#173B5E] text-white py-16 sm:py-24 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-6 left-8 opacity-20 animate-float pointer-events-none">
          <StarDeco size={36} color="#FFD21F" />
        </div>
        <div className="absolute bottom-6 right-8 opacity-20 animate-float-reverse pointer-events-none">
          <SunshineDeco size={60} />
        </div>
        <div className="absolute top-1/2 left-1/4 opacity-10 pointer-events-none">
          <CloudDeco size={80} color="#ffffff" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFD21F]/30 text-[#FFD21F] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-4">
            <span>🦁 Partner With A Proven Educational Brand</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            BUILD SOMETHING <br />
            <span className="text-[#FFD21F]">MEANINGFUL WITH AKP.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            A scalable franchise model designed around your location and centre requirements. We provide complete support — from curriculum and training to marketing and operations.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const elem = document.getElementById('franchise-form-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-[#F4511E] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-[#E64A19] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Building className="w-5 h-5" />
              Enquire About Franchise Opportunities
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('why-partner-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-5 h-5 text-[#FFD21F]" />
              See Why AKP Is Different
            </button>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          WHY PARTNER WITH AKP?
      ═══════════════════════════════════════════════════════ */}
      <section id="why-partner-section" className="py-16 sm:py-24 bg-white border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Complete Partnership Ecosystem
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              WHY PARTNER WITH AKP?
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              We eliminate the guesswork of starting a preschool. You receive our complete operating playbook built over years of educational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partnerBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="group bg-[#FFF9EC] rounded-3xl p-6 sm:p-7 border-2 border-transparent hover:border-orange-200 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col"
                >
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: benefit.bg, color: benefit.color }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#173B5E] mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed flex-1">
                    {benefit.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          WHAT MAKES AKP DIFFERENT?
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD21F]/30 text-[#F57F17] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Our Distinctive Approach
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              WHAT MAKES AKP DIFFERENT?
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              We focus on what truly matters — a distinctive child experience, strong franchise support, memorable branding, and community-based growth.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {differentiators.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white rounded-3xl p-6 sm:p-8 border-2 border-gray-100 hover:border-orange-200 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  {/* Colored accent bar */}
                  <div
                    className="absolute top-0 left-0 w-full h-1 rounded-t-3xl transition-all duration-300 group-hover:h-1.5"
                    style={{ backgroundColor: item.color }}
                  />
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{ backgroundColor: `${item.color}15`, color: item.color }}
                  >
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-[#173B5E] mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          HOW DOES THE AKP FRANCHISE MODEL BENEFIT YOU?
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-y-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Beyond Financial Returns
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight leading-tight">
              HOW DOES THE AKP FRANCHISE <br className="hidden sm:block" /> MODEL BENEFIT YOU?
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Instead of focusing only on numbers, here are the different ways an AKP franchise partner benefits — from brand recognition to long-term growth.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {modelBenefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={i}
                  className="group flex items-start gap-4 bg-[#FFF9EC] rounded-2xl p-5 sm:p-6 border border-orange-100 hover:border-[#F4511E]/30 hover:shadow-md transition-all duration-300"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#F4511E]/10 text-[#F4511E] flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-heading font-extrabold text-base text-[#173B5E] mb-1">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {benefit.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          HOW WE HELP YOU SUCCEED — Step by Step
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/20 text-[#0288D1] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Your Journey With AKP
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              HOW WE HELP YOU SUCCEED
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              A simple, structured path from first conversation to a thriving preschool.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="group relative">
                  {/* Connector line (desktop) */}
                  {i < journeySteps.length - 1 && i % 3 !== 2 && (
                    <div className="hidden lg:block absolute top-10 left-[calc(50%+40px)] w-[calc(100%-40px)] h-0.5 bg-gradient-to-r from-[#F4511E]/30 to-[#FFD21F]/30 z-0" />
                  )}

                  <div className="relative bg-white rounded-3xl p-6 sm:p-7 border-2 border-gray-100 hover:border-[#F4511E]/30 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 text-center">
                    {/* Step number badge */}
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-[#F4511E] text-white font-heading font-black text-xs flex items-center justify-center shadow-md">
                      {step.num}
                    </div>

                    <div className="w-14 h-14 rounded-2xl bg-[#FFF3E0] text-[#F4511E] flex items-center justify-center mx-auto mb-4 mt-2 transition-transform duration-300 group-hover:scale-110">
                      <Icon className="w-7 h-7" />
                    </div>
                    <h3 className="font-heading font-extrabold text-base text-[#173B5E] mb-2">
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-medium leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          FRANCHISE OPPORTUNITIES IN BANGALORE
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-y-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left content */}
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD21F]/30 text-[#F57F17] font-heading font-extrabold text-xs tracking-wider uppercase mb-3">
                📍 Bangalore Focus
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#173B5E] tracking-tight leading-tight mb-4">
                FRANCHISE OPPORTUNITIES <br className="hidden sm:block" /> IN BANGALORE
              </h2>
              <p className="text-base text-gray-700 font-medium leading-relaxed mb-4">
                Bangalore has diverse and growing residential communities, working families, and increasing demand for quality early childhood education. Finding the right location and understanding the local community are key to building a successful preschool.
              </p>
              <p className="text-sm text-gray-600 font-medium leading-relaxed mb-6">
                Our team will guide prospective partners through the planning process and help them understand the relevant requirements for setting up a preschool.
              </p>

              <div className="space-y-3">
                {bangaloreConsiderations.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F4511E]/10 text-[#F4511E] flex items-center justify-center shrink-0 mt-0.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                    <p className="text-sm text-gray-700 font-medium">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right decorative card */}
            <div className="relative">
              <div className="bg-gradient-to-br from-[#173B5E] to-[#1A4269] rounded-3xl p-8 sm:p-10 text-white shadow-2xl">
                <div className="absolute top-4 right-4 opacity-20 pointer-events-none">
                  <StarDeco size={40} color="#FFD21F" />
                </div>
                <div className="absolute bottom-4 left-4 opacity-15 pointer-events-none">
                  <SunshineDeco size={50} />
                </div>

                <MapPin className="w-10 h-10 text-[#FFD21F] mb-4" />
                <h3 className="font-heading font-black text-2xl mb-3">
                  Looking to Open in <span className="text-[#FFD21F]">Bangalore</span>?
                </h3>
                <p className="text-white/80 text-sm font-medium leading-relaxed mb-6">
                  We're actively looking for passionate partners in Bangalore's family-friendly residential communities. Let's discuss the right location and plan for your centre.
                </p>
                <button
                  onClick={() => {
                    const elem = document.getElementById('franchise-form-section');
                    elem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-sm uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Phone className="w-4 h-4" />
                  Talk to Our Franchise Team
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          INVESTMENT DETAILS — Soft Messaging
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-20 bg-[#FFF9EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border-2 border-[#FFD21F]/40 shadow-lg">
            <div className="w-16 h-16 rounded-2xl bg-[#FFFDE7] text-[#F57F17] flex items-center justify-center mx-auto mb-5">
              <Target className="w-8 h-8" />
            </div>
            <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#173B5E] tracking-tight mb-3">
              FLEXIBLE, SCALABLE FRANCHISE MODEL
            </h2>
            <p className="text-base text-gray-700 font-medium max-w-2xl mx-auto leading-relaxed mb-4">
              A scalable franchise model designed around your location and centre requirements. Investment details can be discussed during your franchise consultation.
            </p>
            <p className="text-sm text-gray-500 font-medium max-w-xl mx-auto leading-relaxed mb-8">
              Flexible planning based on location, infrastructure, and centre size. Every partnership is unique — let's talk about what works best for you.
            </p>
            <button
              onClick={() => {
                const elem = document.getElementById('franchise-form-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all flex items-center gap-2 cursor-pointer mx-auto"
            >
              <Phone className="w-5 h-5" />
              Talk to Our Franchise Team
            </button>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          FRANCHISE APPLICATION FORM
      ═══════════════════════════════════════════════════════ */}
      <section id="franchise-form-section" className="py-16 sm:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-12 border-4 border-[#FFD21F] shadow-2xl">
            {submitted ? (
              <div className="text-center py-10">
                <div className="w-16 h-16 rounded-full bg-[#5BC85A]/20 text-[#5BC85A] flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-3xl text-[#173B5E] mb-2">
                  Franchise Application Received! 🦁
                </h3>
                <p className="text-base text-gray-700 max-w-md mx-auto leading-relaxed">
                  Thank you for your interest in partnering with <strong>A Kid's Pre School</strong>. Our Head of Franchise Expansion will reach out to you within 24 business hours!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="text-xs font-extrabold uppercase text-[#F4511E] tracking-wider">
                    Start the Conversation
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#173B5E]">
                    PARTNER WITH A KID'S PRE SCHOOL
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Fill out the form below and our franchise team will be in touch to discuss opportunities in your area.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Applicant Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98452 96096"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="partner@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Proposed City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, Mysuru, Hyderabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Your Background / Message
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your educational or business background, goals, or target launch timeline..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Submit Franchise Enquiry 🦁
                </button>
              </form>
            )}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#173B5E] text-white relative overflow-hidden">
        <div className="absolute top-6 left-8 opacity-15 pointer-events-none">
          <StarDeco size={40} color="#FFD21F" />
        </div>
        <div className="absolute bottom-6 right-8 opacity-15 pointer-events-none">
          <SunshineDeco size={55} />
        </div>
        <div className="absolute top-1/3 right-1/4 opacity-10 pointer-events-none">
          <CloudDeco size={70} color="#ffffff" />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-[#FFD21F]/30 text-[#FFD21F] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider mb-6">
            <span>🦁 Your Preschool Journey Starts Here</span>
          </div>

          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight leading-tight mb-4">
            READY TO BUILD SOMETHING <br />
            <span className="text-[#FFD21F]">MEANINGFUL WITH AKP?</span>
          </h2>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-2xl mx-auto leading-relaxed mb-10">
            Partner with us to create a joyful, engaging learning space for young children in your community.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => {
                const elem = document.getElementById('franchise-form-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-[#F4511E] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-xl hover:bg-[#E64A19] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Building className="w-5 h-5" />
              Explore Franchise Opportunities
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('franchise-form-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-5 h-5 text-[#FFD21F]" />
              Talk to Our Franchise Team
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
