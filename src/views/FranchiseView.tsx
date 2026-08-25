import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  StarDeco,
  SunshineDeco,
  CloudDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { LeoCharacter } from '../components/LeoCharacter';
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
import { WhatsAppConfirmPopup } from '../components/WhatsAppConfirmPopup';

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
  const [showConfirm, setShowConfirm] = useState(false);
  const [isSending, setIsSending] = useState(false);

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

    setShowConfirm(true);
  };

  const sendWhatsAppMessage = async () => {
    const lines = [
      '*New Franchise Enquiry - A Kids Pre School*',
      '',
      `*Name:* ${formData.name}`,
      `*Phone:* ${formData.phone}`,
      `*Email:* ${formData.email || 'N/A'}`,
      `*City:* ${formData.city || 'N/A'}`,
      `*Experience:* ${formData.experience}`,
      formData.message ? `*Message:* ${formData.message}` : '',
    ].filter(Boolean).join('\n');

    try {
      const response = await fetch('/api/send-whatsapp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: lines,
          type: 'franchise',
        }),
      });

      const result = await response.json();

      if (result.success && result.url) {
        window.open(result.url, '_blank');
      }
    } catch (error) {
      console.error('WhatsApp send error:', error);
      const encoded = encodeURIComponent(lines);
      window.open(`https://wa.me/919945531032?text=${encoded}`, '_blank');
    }
  };

  const handleConfirmSend = async () => {
    setIsSending(true);
    await sendWhatsAppMessage();
    setIsSending(false);
    setShowConfirm(false);

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
                    <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
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
          HOW WE HELP YOU SUCCEED - Journey Steps
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#173B5E] text-white overflow-hidden relative">
        {/* Decorative background */}
        <div className="absolute top-10 left-10 opacity-15 pointer-events-none">
          <StarDeco size={60} color="#FFD21F" />
        </div>
        <div className="absolute bottom-10 right-10 opacity-15 pointer-events-none">
          <SunshineDeco size={80} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#FFD21F]/20 text-[#FFD21F] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Your Franchise Journey
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight">
              HOW WE HELP YOU SUCCEED
            </h2>
            <p className="text-base text-white/80 font-medium mt-2">
              A clear, step-by-step path from initial enquiry to a thriving preschool.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {journeySteps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={i}
                  className="group relative bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 hover:bg-white/15 hover:border-[#FFD21F]/40 transition-all duration-300"
                >
                  <div className="absolute -top-3 -left-3 w-10 h-10 rounded-xl bg-[#FFD21F] text-[#173B5E] flex items-center justify-center font-heading font-black text-sm shadow-lg">
                    {step.num}
                  </div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F4511E]/20 text-[#FF8A3D] flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-heading font-extrabold text-lg text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-white/70 font-medium leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          BANGALORE FRANCHISE SECTION
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-white border-y-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/15 text-[#0288D1] font-heading font-extrabold text-xs tracking-wider uppercase mb-4">
                Bengaluru Focus
              </span>
              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#173B5E] tracking-tight mb-6">
                FRANCHISE OPPORTUNITIES <br />
                <span className="text-[#F4511E]">IN BANGALORE</span>
              </h2>
              <p className="text-base text-gray-700 font-medium leading-relaxed mb-6">
                Bangalore has diverse and growing residential communities, working families, and increasing demand for quality early childhood education. We help you find the right location and understand the local community to build a successful preschool.
              </p>

              <div className="space-y-3">
                {bangaloreConsiderations.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#5BC85A] shrink-0 mt-0.5" />
                    <span className="text-sm text-gray-700 font-medium">{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#FFD21F]">
                <p className="text-sm text-[#173B5E] font-medium leading-relaxed">
                  <strong>Our team will guide prospective partners through the planning process and help them understand the relevant requirements for setting up a preschool.</strong>
                </p>
              </div>
            </div>

            <div className="relative">
              <div className="bg-[#173B5E] rounded-3xl p-8 text-white text-center">
                <div className="w-16 h-16 rounded-2xl bg-[#FFD21F]/20 text-[#FFD21F] flex items-center justify-center mx-auto mb-4">
                  <MapPin className="w-8 h-8" />
                </div>
                <h3 className="font-heading font-extrabold text-xl mb-3">
                  Ready to Explore Bangalore?
                </h3>
                <p className="text-sm text-white/80 font-medium mb-6">
                  Let's discuss how you can bring A Kid's Pre School to your neighbourhood.
                </p>
                <button
                  onClick={() => {
                    const elem = document.getElementById('franchise-form-section');
                    elem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-3 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-bold text-sm uppercase transition-all cursor-pointer"
                >
                  Start Your Journey
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          FRANCHISE ENQUIRY FORM
      ═══════════════════════════════════════════════════════ */}
      <section id="franchise-form-section" className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Get In Touch
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              ENQUIRE ABOUT FRANCHISE
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Investment details can be discussed during your franchise consultation.
            </p>
          </div>

          {submitted ? (
            <div className="bg-white rounded-3xl p-8 sm:p-12 border-4 border-[#5BC85A] shadow-xl text-center">
              <div className="flex justify-center mb-6">
                <LeoCharacter
                  state="celebrating"
                  celebrating={true}
                  size={160}
                  message="Roar-some! 🎉"
                  subMessage="Thank you for your interest!"
                  showActions={false}
                  interactive={false}
                />
              </div>
              <h3 className="font-heading font-black text-2xl text-[#173B5E] mb-4">
                Thank You For Your Interest! 🦁
              </h3>
              <p className="text-sm text-gray-700 font-medium max-w-md mx-auto leading-relaxed">
                Thank you for your interest in partnering with <strong>A Kid's Pre School</strong>. Our Head of Franchise Expansion will reach out to you within 24 business hours!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-xl">
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Rajesh Kumar"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
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
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      City / Location
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Bengaluru, Mumbai"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Your Background / Experience
                  </label>
                  <select
                    value={formData.experience}
                    onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                  >
                    <option value="Educator / School Owner">Educator / School Owner</option>
                    <option value="Business Professional">Business Professional</option>
                    <option value="Homemaker / Parent">Homemaker / Parent</option>
                    <option value="First-time Entrepreneur">First-time Entrepreneur</option>
                    <option value="Real Estate / Property Owner">Real Estate / Property Owner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Your Message (Optional)
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Tell us about your vision, preferred location, or any questions..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-lg shadow-[#F4511E]/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <Send className="w-5 h-5" />
                  Submit Franchise Enquiry 🦁
                </button>
              </div>
            </form>
          )}
        </div>
      </section>


      {/* ═══════════════════════════════════════════════════════
          FINAL CTA
      ═══════════════════════════════════════════════════════ */}
      <section className="py-16 sm:py-24 bg-[#173B5E] text-white relative overflow-hidden">
        <div className="absolute top-10 right-10 opacity-15 pointer-events-none">
          <StarDeco size={50} color="#FFD21F" />
        </div>
        <div className="absolute bottom-10 left-10 opacity-15 pointer-events-none">
          <SunshineDeco size={60} />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-heading font-black text-3xl sm:text-5xl text-white tracking-tight mb-6">
            READY TO BUILD SOMETHING <br />
            <span className="text-[#FFD21F]">MEANINGFUL WITH AKP?</span>
          </h2>
          <p className="text-lg text-white/85 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
            Partner with us to create a joyful, engaging learning space for young children in your community.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => {
                const elem = document.getElementById('franchise-form-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-[#F4511E] text-white font-heading font-extrabold text-sm uppercase tracking-wider shadow-xl hover:bg-[#E64A19] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Building className="w-5 h-5" />
              Explore Franchise Opportunities
            </button>
            <button
              onClick={() => {
                const elem = document.getElementById('franchise-form-section');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-heading font-extrabold text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Phone className="w-5 h-5 text-[#FFD21F]" />
              Talk to Our Franchise Team
            </button>
          </div>
        </div>
      </section>

      {/* WhatsApp Confirmation Popup */}
      <WhatsAppConfirmPopup
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={handleConfirmSend}
        formData={formData}
        enquiryType="Franchise Enquiry"
        isSending={isSending}
      />
    </div>
  );
};
