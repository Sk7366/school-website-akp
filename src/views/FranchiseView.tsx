import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  StarDeco,
  SunshineDeco,
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
  Calculator,
  Phone,
  Mail,
  Send,
  Download,
  DollarSign,
  MapPin,
  Clock,
  ArrowRight,
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
  // Franchise ROI Calculator State
  const [propertySqFt, setPropertySqFt] = useState<number>(2500);
  const [studentCapacity, setStudentCapacity] = useState<number>(75);
  const [monthlyFeePerChild, setMonthlyFeePerChild] = useState<number>(4500);

  // Franchise Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    city: '',
    experience: 'Educator / School Owner',
    investmentBudget: '₹18 Lakhs – ₹25 Lakhs',
    propertyAvailable: 'Commercial Space Available (2,000+ sq ft)',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // ROI Computations
  const annualGrossRevenue = studentCapacity * monthlyFeePerChild * 12;
  const estimatedOperatingExpenses = annualGrossRevenue * 0.45;
  const estimatedAnnualNetProfit = annualGrossRevenue - estimatedOperatingExpenses;
  const estimatedPaybackMonths = Math.max(
    12,
    Math.round((2000000 / (estimatedAnnualNetProfit / 12)) * 10) / 10
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) return;

    onSubmitFranchiseLead({
      name: formData.name,
      phone: formData.phone,
      email: formData.email,
      city: formData.city,
      experience: formData.experience,
      investmentBudget: formData.investmentBudget,
      propertyAvailable: formData.propertyAvailable,
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
        investmentBudget: '₹18 Lakhs – ₹25 Lakhs',
        propertyAvailable: 'Commercial Space Available (2,000+ sq ft)',
        message: '',
      });
    }, 4000);
  };

  return (
    <div id="franchise-page-container" className="w-full bg-[#FFF9EC]">
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
            <span>🦁 Partner With A Proven Educational Brand</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            START YOUR OWN PRESCHOOL: <br />
            <span className="text-[#FFD21F]">HIGH IMPACT & REWARDING ROI.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Join the A Kid’s Pre School family. We provide 360-degree turnkey support from classroom architecture and curriculum kits to teacher training and digital marketing.
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
              Apply For Franchise 2026–27
            </button>
            <button
              onClick={() => {
                const calc = document.getElementById('franchise-calculator-section');
                calc?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Calculator className="w-5 h-5 text-[#FFD21F]" />
              Calculate Estimated ROI
            </button>
          </div>
        </div>
      </section>

      {/* 4 Core Pillars of Franchise Ecosystem */}
      <section className="py-16 sm:py-24 bg-white border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Complete Turnkey Ecosystem
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              WHY PARTNER WITH A KID’S PRE SCHOOL?
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              We eliminate guesswork. You receive our complete operating playbook built over 12+ years of educational excellence.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-7 border-3 border-[#F4511E] shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F4511E] flex items-center justify-center mb-4">
                  <Award className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-[#173B5E] mb-2">
                  Proprietary 4-Stage Curriculum
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  Turnkey lesson planners, student workbooks, phonics flashcards, sensory play materials, and monthly thematic kits delivered straight to your campus.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-orange-200 text-xs font-bold text-[#F4511E]">
                ✨ Fully Standardized
              </div>
            </div>

            <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-7 border-3 border-[#29B6F6] shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mb-4">
                  <Users className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-[#173B5E] mb-2">
                  Educator Training Academy
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  We recruit and certify your teachers in Montessori techniques, positive reinforcement, emergency first aid, and Leo mascot storytelling.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-blue-200 text-xs font-bold text-[#0288D1]">
                🎓 Continuous Upskilling
              </div>
            </div>

            <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-7 border-3 border-[#FFD21F] shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#FFFDE7] text-[#F57F17] flex items-center justify-center mb-4">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-[#173B5E] mb-2">
                  National Lead Generation
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  Full digital marketing engine driving high-intent parent inquiries directly to your admissions desk, complete with brand collateral and billboard templates.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-yellow-200 text-xs font-bold text-[#F57F17]">
                📈 Rapid Student Enrollment
              </div>
            </div>

            <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-7 border-3 border-[#5BC85A] shadow-md flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mb-4">
                  <Building className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-extrabold text-lg text-[#173B5E] mb-2">
                  Architecture & Interior Blueprint
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed">
                  3D architectural layouts, child-proof equipment blueprints, soft-grass outdoor playground sourcing, and biometric security integration.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-green-200 text-xs font-bold text-[#2E7D32]">
                🏫 Turnkey Setup in 60 Days
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Franchise ROI & Investment Calculator */}
      <section id="franchise-calculator-section" className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Financial Estimator
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              INTERACTIVE FRANCHISE ROI CALCULATOR
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Estimate your annual revenue, operating margins, and expected capital payback period based on your campus capacity.
            </p>
          </div>

          <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Sliders Input */}
              <div className="lg:col-span-6 space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-heading font-extrabold text-sm text-[#173B5E]">
                      Estimated Student Capacity:
                    </label>
                    <span className="font-heading font-black text-lg text-[#F4511E]">
                      {studentCapacity} Students
                    </span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={200}
                    step={5}
                    value={studentCapacity}
                    onChange={(e) => setStudentCapacity(Number(e.target.value))}
                    className="w-full accent-[#F4511E] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>30 Kids</span>
                    <span>100 Kids</span>
                    <span>200 Kids</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-heading font-extrabold text-sm text-[#173B5E]">
                      Monthly Tuition Fee Per Child (₹):
                    </label>
                    <span className="font-heading font-black text-lg text-[#29B6F6]">
                      ₹{monthlyFeePerChild.toLocaleString('en-IN')} / Mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min={2000}
                    max={12000}
                    step={500}
                    value={monthlyFeePerChild}
                    onChange={(e) => setMonthlyFeePerChild(Number(e.target.value))}
                    className="w-full accent-[#29B6F6] cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] font-bold text-gray-500">
                    <span>₹2,000</span>
                    <span>₹6,000</span>
                    <span>₹12,000</span>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-heading font-extrabold text-sm text-[#173B5E]">
                      Target Campus Size (Sq Ft):
                    </label>
                    <span className="font-heading font-black text-lg text-[#5BC85A]">
                      {propertySqFt} Sq Ft
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1500}
                    max={6000}
                    step={250}
                    value={propertySqFt}
                    onChange={(e) => setPropertySqFt(Number(e.target.value))}
                    className="w-full accent-[#5BC85A] cursor-pointer"
                  />
                </div>
              </div>

              {/* Financial Outcome Card */}
              <div className="lg:col-span-6 bg-[#173B5E] rounded-3xl p-6 sm:p-8 text-white space-y-4 shadow-xl border-3 border-[#FFD21F]">
                <span className="text-xs font-extrabold uppercase tracking-wider text-[#FFD21F]">
                  Estimated Financial Snapshot
                </span>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                    <div className="text-xs text-white/70">Est. Gross Annual Revenue</div>
                    <div className="font-heading font-black text-xl sm:text-2xl text-[#FFD21F] mt-1">
                      ₹{annualGrossRevenue.toLocaleString('en-IN')}
                    </div>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-white/10 border border-white/10">
                    <div className="text-xs text-white/70">Est. Net Annual Profit</div>
                    <div className="font-heading font-black text-xl sm:text-2xl text-[#5BC85A] mt-1">
                      ₹{estimatedAnnualNetProfit.toLocaleString('en-IN')}
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-gradient-to-r from-[#F4511E] to-[#FF8A3D] text-white">
                  <div className="text-xs uppercase font-extrabold tracking-wider">
                    Expected Capital Payback Period
                  </div>
                  <div className="font-heading font-black text-2xl sm:text-3xl mt-0.5">
                    ~ {estimatedPaybackMonths} Months
                  </div>
                  <p className="text-[11px] text-white/90 mt-1">
                    Based on standard 55% gross operating margins in early education.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Franchise Application Form Section */}
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
                  Thank you for your interest in partnering with <strong>A Kid’s Pre School</strong>. Our Head of Franchise Expansion will reach out to you within 24 business hours with the official prospectus!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="text-xs font-extrabold uppercase text-[#F4511E] tracking-wider">
                    Apply Online
                  </span>
                  <h3 className="font-heading font-black text-2xl sm:text-4xl text-[#173B5E]">
                    PARTNER WITH A KID’S PRE SCHOOL
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Fill out the form below to receive our confidential Franchise Kit and schedule a one-on-one discovery call.
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
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="partner@gmail.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Proposed City / Location *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Bengaluru, Mysuru, Hyderabad"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Investment Budget Capability
                    </label>
                    <select
                      value={formData.investmentBudget}
                      onChange={(e) => setFormData({ ...formData, investmentBudget: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    >
                      <option value="₹12 Lakhs – ₹18 Lakhs">₹12 Lakhs – ₹18 Lakhs</option>
                      <option value="₹18 Lakhs – ₹25 Lakhs">₹18 Lakhs – ₹25 Lakhs</option>
                      <option value="₹25 Lakhs – ₹40 Lakhs">₹25 Lakhs – ₹40 Lakhs</option>
                      <option value="₹40 Lakhs+ (Multi-Unit)">₹40 Lakhs+ (Multi-Unit)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Property Availability
                    </label>
                    <select
                      value={formData.propertyAvailable}
                      onChange={(e) => setFormData({ ...formData, propertyAvailable: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    >
                      <option value="Commercial Space Available (2,000+ sq ft)">Commercial Space Available (2,000+ sq ft)</option>
                      <option value="Rented / Leased Space Identified">Rented / Leased Space Identified</option>
                      <option value="Looking For Space With Guidance">Looking For Space With Guidance</option>
                      <option value="Own Residential / Commercial Plot">Own Residential / Commercial Plot</option>
                    </select>
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
                  Submit Franchise Application 🦁
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
