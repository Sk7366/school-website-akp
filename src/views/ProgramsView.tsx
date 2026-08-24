import React, { useState } from 'react';
import {
  LeoSuper,
  LeoMusic,
  LeoArtist,
  LeoTeacher,
  LeoMeditate,
  LeoReader,
  StarDeco,
  SunshineDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { LeoCharacter } from '../components/LeoCharacter';
import { PageTab, ProgramInfo } from '../types';
import { PROGRAMS_DATA } from '../data/preschoolData';
import {
  Clock,
  Users,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
  BookOpen,
  HelpCircle,
  Download,
  ShieldCheck,
  Zap,
  Check,
  ChevronRight,
  Sliders,
} from 'lucide-react';

interface ProgramsViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  onSelectProgram?: (programId: string) => void;
}

export const ProgramsView: React.FC<ProgramsViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [selectedProgramId, setSelectedProgramId] = useState<string>('nursery');
  const [calculatorAgeYears, setCalculatorAgeYears] = useState<number>(3);
  const [calculatorAgeMonths, setCalculatorAgeMonths] = useState<number>(0);
  const [isBrochureModalOpen, setIsBrochureModalOpen] = useState(false);

  const selectedProgram =
    PROGRAMS_DATA.find((p) => p.id === selectedProgramId) || PROGRAMS_DATA[1];

  // Mascot mapping helper
  const renderProgramMascot = (role: string, size = 180) => {
    switch (role) {
      case 'super':
        return <LeoSuper size={size} animate={true} />;
      case 'music':
        return <LeoMusic size={size} animate={true} />;
      case 'artist':
        return <LeoArtist size={size} animate={true} />;
      case 'teacher':
        return <LeoTeacher size={size} animate={true} />;
      case 'meditate':
        return <LeoMeditate size={size} animate={true} />;
      default:
        return <LeoReader size={size} animate={true} />;
    }
  };

  // Eligibility logic
  const totalMonths = calculatorAgeYears * 12 + calculatorAgeMonths;
  let recommendedProgram: ProgramInfo;
  let recommendedReason = '';

  if (totalMonths < 30) {
    recommendedProgram = PROGRAMS_DATA.find((p) => p.id === 'playgroup')!;
    recommendedReason =
      'Perfect age for sensory exploration, gentle separation, and nursery rhymes in a safe, soft-play wonderland!';
  } else if (totalMonths < 42) {
    recommendedProgram = PROGRAMS_DATA.find((p) => p.id === 'nursery')!;
    recommendedReason =
      'Ideal for vocabulary building, phonetic discovery, creative art, and social cooperation with peer friends!';
  } else if (totalMonths < 54) {
    recommendedProgram = PROGRAMS_DATA.find((p) => p.id === 'lkg')!;
    recommendedReason =
      'Great stage for early numeracy, phonics reading, logical puzzles, and introductory Little Explorers STEM!';
  } else if (totalMonths < 66) {
    recommendedProgram = PROGRAMS_DATA.find((p) => p.id === 'ukg')!;
    recommendedReason =
      'Comprehensive preparation for formal grade school with fluent reading, math reasoning, and creative confidence!';
  } else {
    recommendedProgram = PROGRAMS_DATA.find((p) => p.id === 'daycare')!;
    recommendedReason =
      'Explore our full-day daycare and after-school enrichment programs featuring guided homework, hobbies, and nutritious meals!';
  }

  return (
    <div id="programs-page-container" className="w-full bg-[#FFF9EC]">
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
            <span>🎓 Academic Stages & Enrichment</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            TAILORED MILESTONES FOR <br />
            <span className="text-[#FFD21F]">EVERY GROWING AGE.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            From the gentle first steps in Playgroup to confident grade-school readiness in Senior KG — our research-backed curriculum honors every milestone with love, joy, and individual care.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => {
                const calcElem = document.getElementById('program-calculator-section');
                calcElem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-6 py-3 rounded-xl bg-[#FFD21F] text-[#173B5E] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-[#FFC400] transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sliders className="w-4 h-4 text-[#F4511E]" />
              Check Age Eligibility Calculator
            </button>
            <button
              onClick={() => setIsBrochureModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-white/15 text-white hover:bg-white/25 font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider transition-all flex items-center gap-2 cursor-pointer border border-white/30"
            >
              <Download className="w-4 h-4 text-[#FFD21F]" />
              View Curriculum Brochure
            </button>
          </div>
        </div>
      </section>

      {/* Program Tab Switcher & Deep Dive Showcase */}
      <section className="py-16 sm:py-24 bg-white border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Explore Our Stages
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              SELECT A LEARNING STAGE
            </h2>
          </div>

          {/* Program Select Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 mb-12">
            {PROGRAMS_DATA.map((prog) => {
              const isSelected = prog.id === selectedProgramId;
              return (
                <button
                  key={prog.id}
                  onClick={() => setSelectedProgramId(prog.id)}
                  className={`p-4 rounded-3xl text-left border-3 transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'shadow-lg scale-104 -translate-y-1'
                      : 'hover:border-gray-300 opacity-80 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isSelected ? prog.bgColor : '#FFF9EC',
                    borderColor: prog.accentBorder,
                  }}
                >
                  <div>
                    <span
                      className="inline-block px-2.5 py-0.5 rounded-md text-white font-extrabold text-[10px] uppercase mb-2"
                      style={{ backgroundColor: prog.color }}
                    >
                      {prog.ageRange}
                    </span>
                    <h3 className="font-heading font-black text-base sm:text-lg text-[#173B5E] leading-snug">
                      {prog.name}
                    </h3>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-xs font-bold text-[#173B5E]/80">
                    <span>Explore</span>
                    <ChevronRight className="w-4 h-4" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Program Featured Showcase Card */}
          <div
            className="rounded-3xl p-6 sm:p-12 border-4 shadow-2xl relative overflow-hidden"
            style={{
              backgroundColor: selectedProgram.bgColor,
              borderColor: selectedProgram.accentBorder,
            }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
              {/* Left Details */}
              <div className="lg:col-span-7 space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span
                    className="px-4 py-1 rounded-full text-white font-heading font-extrabold text-xs tracking-wider uppercase shadow-xs"
                    style={{ backgroundColor: selectedProgram.color }}
                  >
                    Age: {selectedProgram.ageRange}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-white/80 text-[#173B5E] font-bold text-xs border border-gray-200">
                    ⏱️ {selectedProgram.timing}
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-white/80 text-[#173B5E] font-bold text-xs border border-gray-200">
                    👩‍🏫 {selectedProgram.ratio}
                  </span>
                </div>

                <div>
                  <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight leading-tight">
                    {selectedProgram.name}
                  </h2>
                  <p className="font-heading font-bold text-lg text-gray-700 mt-1">
                    &ldquo;{selectedProgram.tagline}&rdquo;
                  </p>
                </div>

                <p className="text-gray-800 text-base leading-relaxed font-medium">
                  {selectedProgram.overview}
                </p>

                {/* Focus Pillars */}
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#173B5E] mb-3">
                    Key Developmental Milestones:
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {selectedProgram.learningFocus.map((focus, fIdx) => (
                      <div
                        key={fIdx}
                        className="bg-white/90 p-3 rounded-2xl border border-gray-100 flex items-center gap-2.5 text-xs font-bold text-[#173B5E]"
                      >
                        <CheckCircle2
                          className="w-4 h-4 shrink-0"
                          style={{ color: selectedProgram.color }}
                        />
                        <span>{focus}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Activities */}
                <div>
                  <h4 className="font-heading font-bold text-sm uppercase tracking-wider text-[#173B5E] mb-2">
                    Signature Weekly Activities:
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedProgram.keyActivities.map((act, aIdx) => (
                      <span
                        key={aIdx}
                        className="px-3 py-1.5 rounded-xl bg-white text-xs font-extrabold text-[#173B5E] border border-gray-200 shadow-2xs"
                      >
                        🌟 {act}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-4 flex flex-wrap items-center gap-3">
                  <button
                    onClick={onOpenAdmissionModal}
                    className="px-7 py-3.5 rounded-2xl text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                    style={{ backgroundColor: selectedProgram.color }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Enroll In {selectedProgram.name}
                  </button>

                  <button
                    onClick={() => onNavigate('book-tour')}
                    className="px-6 py-3.5 rounded-2xl bg-[#173B5E] text-white hover:bg-[#102A43] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:-translate-y-0.5 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Calendar className="w-4 h-4 text-[#FFD21F]" />
                    Book Campus Tour
                  </button>
                </div>
              </div>

              {/* Right Mascot Visual */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="p-6 sm:p-8 rounded-3xl bg-white/90 backdrop-blur-xs border-3 border-white shadow-xl flex flex-col items-center text-center w-full max-w-sm">
                  <div className="my-1">
                    <LeoCharacter
                      state={
                        selectedProgram.mascotRole === 'super'
                          ? 'excited'
                          : selectedProgram.mascotRole === 'music'
                          ? 'music'
                          : selectedProgram.mascotRole === 'artist'
                          ? 'art'
                          : selectedProgram.mascotRole === 'teacher'
                          ? 'learning'
                          : selectedProgram.mascotRole === 'meditate'
                          ? 'calm'
                          : 'reading'
                      }
                      size={210}
                      message={`Welcome to ${selectedProgram.name}! 🦁`}
                      subMessage={selectedProgram.tagline}
                      showActions={false}
                      interactive={true}
                    />
                  </div>
                  <h4 className="font-heading font-black text-xl text-[#173B5E] mt-2">
                    Guide: Leo the {selectedProgram.mascotRole.toUpperCase()} 🦁
                  </h4>
                  <p className="text-xs text-gray-600 font-medium mt-1 leading-relaxed">
                    Personalized encouragement, gentle guidance, and cheerful rhymes every step of the day.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Program Comparison Matrix */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/15 text-[#0288D1] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              At A Glance
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              PROGRAMS COMPARISON TABLE
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              A comprehensive overview of our stages, student-teacher ratios, and daily schedules.
            </p>
          </div>

          <div className="bg-white rounded-3xl border-4 border-[#FFD21F] shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#173B5E] text-white text-xs sm:text-sm font-heading font-extrabold">
                    <th className="p-4 sm:p-5">Program Stage</th>
                    <th className="p-4 sm:p-5">Age Group</th>
                    <th className="p-4 sm:p-5">Timings</th>
                    <th className="p-4 sm:p-5">Ratio (Staff : Child)</th>
                    <th className="p-4 sm:p-5">Core Focus</th>
                    <th className="p-4 sm:p-5 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-xs sm:text-sm text-[#173B5E] font-medium">
                  {PROGRAMS_DATA.map((prog) => (
                    <tr
                      key={prog.id}
                      className="hover:bg-orange-50/50 transition-colors"
                    >
                      <td className="p-4 sm:p-5 font-heading font-extrabold text-[#173B5E] flex items-center gap-2">
                        <span
                          className="w-3 h-3 rounded-full"
                          style={{ backgroundColor: prog.color }}
                        />
                        {prog.name}
                      </td>
                      <td className="p-4 sm:p-5 font-bold text-gray-600">
                        {prog.ageRange}
                      </td>
                      <td className="p-4 sm:p-5 font-semibold text-gray-700">
                        {prog.timing}
                      </td>
                      <td className="p-4 sm:p-5 font-bold text-[#F4511E]">
                        {prog.ratio}
                      </td>
                      <td className="p-4 sm:p-5 text-gray-600 max-w-xs leading-snug">
                        {prog.learningFocus.slice(0, 2).join(', ')}
                      </td>
                      <td className="p-4 sm:p-5 text-right">
                        <button
                          onClick={() => {
                            setSelectedProgramId(prog.id);
                            window.scrollTo({ top: 400, behavior: 'smooth' });
                          }}
                          className="px-3.5 py-1.5 rounded-xl bg-[#FFF9EC] border-2 border-[#FFD21F] text-[#173B5E] font-extrabold text-xs hover:bg-[#FFD21F] transition-colors"
                        >
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Age Eligibility Interactive Calculator */}
      <section id="program-calculator-section" className="py-16 sm:py-24 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Interactive Tool
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              AGE & PROGRAM CALCULATOR
            </h2>
            <p className="text-base text-gray-700 font-medium mt-1">
              Move the sliders to find the recommended learning stage for your child as of the 2026-27 academic year.
            </p>
          </div>

          <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-xl">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Sliders Input */}
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-heading font-extrabold text-sm text-[#173B5E]">
                      Child’s Age (Years):
                    </label>
                    <span className="font-heading font-black text-xl text-[#F4511E]">
                      {calculatorAgeYears} Years
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={7}
                    step={1}
                    value={calculatorAgeYears}
                    onChange={(e) => setCalculatorAgeYears(Number(e.target.value))}
                    className="w-full accent-[#F4511E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-gray-500 mt-1">
                    <span>1 Year</span>
                    <span>3 Years</span>
                    <span>5 Years</span>
                    <span>7 Years</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-2">
                    <label className="font-heading font-extrabold text-sm text-[#173B5E]">
                      Additional Months:
                    </label>
                    <span className="font-heading font-black text-xl text-[#29B6F6]">
                      {calculatorAgeMonths} Months
                    </span>
                  </div>
                  <input
                    type="range"
                    min={0}
                    max={11}
                    step={1}
                    value={calculatorAgeMonths}
                    onChange={(e) => setCalculatorAgeMonths(Number(e.target.value))}
                    className="w-full accent-[#29B6F6] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-gray-500 mt-1">
                    <span>0 Mo</span>
                    <span>6 Mo</span>
                    <span>11 Mo</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border-2 border-orange-100 flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-[#5BC85A] shrink-0" />
                  <p className="text-xs text-gray-600 font-medium">
                    Calculated for enrollment starting in the <strong>2026–2027 Academic Term</strong>. Mid-term admissions are also welcome!
                  </p>
                </div>
              </div>

              {/* Instant Output Result Card */}
              <div
                className="rounded-3xl p-6 sm:p-8 border-3 shadow-lg flex flex-col justify-between"
                style={{
                  backgroundColor: recommendedProgram.bgColor,
                  borderColor: recommendedProgram.accentBorder,
                }}
              >
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider text-gray-500">
                    Recommended Match
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E] mt-1 mb-2">
                    {recommendedProgram.name} 🦁
                  </h3>
                  <div className="inline-block px-3 py-1 rounded-full text-white text-xs font-extrabold mb-3" style={{ backgroundColor: recommendedProgram.color }}>
                    Target Range: {recommendedProgram.ageRange}
                  </div>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium leading-relaxed mb-4">
                    {recommendedReason}
                  </p>
                </div>

                <div className="pt-4 border-t border-orange-200/60 flex flex-col gap-2">
                  <button
                    onClick={() => {
                      setSelectedProgramId(recommendedProgram.id);
                      onOpenAdmissionModal();
                    }}
                    className="w-full py-3 rounded-xl text-white font-heading font-extrabold text-xs uppercase tracking-wider shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-2 cursor-pointer"
                    style={{ backgroundColor: recommendedProgram.color }}
                  >
                    <Sparkles className="w-4 h-4" />
                    Enquire for {recommendedProgram.name}
                  </button>

                  <button
                    onClick={() => {
                      setSelectedProgramId(recommendedProgram.id);
                      window.scrollTo({ top: 400, behavior: 'smooth' });
                    }}
                    className="w-full py-2.5 rounded-xl bg-white text-[#173B5E] font-heading font-bold text-xs hover:bg-orange-50 transition-colors border border-gray-200 text-center"
                  >
                    Inspect Full Curriculum Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Curriculum Brochure Modal */}
      {isBrochureModalOpen && (
        <div
          id="brochure-download-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173B5E]/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsBrochureModalOpen(false)}
        >
          <div
            className="relative w-full max-w-2xl bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#FFD21F] shadow-2xl max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsBrochureModalOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              ✕
            </button>

            <div className="flex items-center gap-3 mb-4">
              <AKPLogo size={44} showText={false} />
              <div>
                <h3 className="font-heading font-black text-xl text-[#173B5E]">
                  Official Curriculum Prospectus 2026–27
                </h3>
                <p className="text-xs text-gray-500 font-medium">A Kid’s Pre School • Complete Syllabus Overview</p>
              </div>
            </div>

            <div className="space-y-4 text-xs sm:text-sm text-gray-700 font-medium leading-relaxed">
              <div className="p-4 rounded-2xl bg-[#FFF9EC] border-2 border-[#FFD21F]">
                <h4 className="font-heading font-bold text-sm text-[#F4511E] mb-1">
                  🌟 What’s Inside the Prospectus:
                </h4>
                <ul className="list-disc pl-5 space-y-1 text-xs">
                  <li>Detailed monthly themes (Nature, Space, Animals, Community Helpers)</li>
                  <li>Phonics & early literacy scope & sequence (Letters, blends, sight words)</li>
                  <li>Early numeracy & logic progression (Shapes, patterns, quantities)</li>
                  <li>Social-Emotional Learning (SEL) rubrics and mindfulness exercises</li>
                  <li>Chef-curated meal nutritional charts & safety certifications</li>
                </ul>
              </div>

              <p>
                To receive the high-resolution PDF prospectus via WhatsApp or email, please click below to connect with our admissions desk:
              </p>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  setIsBrochureModalOpen(false);
                  onOpenAdmissionModal();
                }}
                className="flex-1 py-3 rounded-xl bg-[#F4511E] text-white font-heading font-bold text-xs uppercase tracking-wider shadow-md hover:bg-[#E64A19] transition-all flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Request PDF on WhatsApp / Email
              </button>

              <button
                onClick={() => setIsBrochureModalOpen(false)}
                className="py-3 px-5 rounded-xl bg-gray-100 text-gray-700 font-heading font-bold text-xs hover:bg-gray-200"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
