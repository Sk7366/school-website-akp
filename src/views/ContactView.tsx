import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  StarDeco,
  SunshineDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { LeoCharacter } from '../components/LeoCharacter';
import { PageTab, Enquiry } from '../types';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  MessageCircle,
  Sparkles,
  Send,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Bus,
  Shield,
  HelpCircle,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ContactViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  onSubmitGeneralEnquiry: (enquiry: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const ContactView: React.FC<ContactViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
  onSubmitGeneralEnquiry,
}) => {
  const [formData, setFormData] = useState({
    parentName: '',
    phone: '',
    email: '',
    childAge: 'Nursery (2.5 – 3.5 Years)',
    enquiryType: 'General Question',
    city: 'Main Campus',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the minimum age for admission at A Kid’s Pre School?',
      a: 'Children can join our Playgroup starting at 1.5 years (18 months). Our Nursery program welcomes children from 2.5 years, Junior KG from 3.5 years, and Senior KG from 4.5 years. Full-day daycare is open for ages 1.5 to 8 years.',
    },
    {
      q: 'Does my child need to be completely potty-trained before joining?',
      a: 'No! For Playgroup and early Nursery, our warm care educators assist with gentle, shame-free toilet training routines and diaper transitions. We partner closely with parents during this milestone.',
    },
    {
      q: 'What is the student-to-teacher ratio in classrooms?',
      a: 'We strictly maintain low ratios: 1:6 for Playgroup, 1:8 for Nursery, 1:10 for Junior KG, and 1:12 for Senior KG. Every classroom also has a dedicated support nanny on-site.',
    },
    {
      q: 'How do you ensure campus safety and background verification?',
      a: 'Child safety is our highest pledge. Our campus features 100% CCTV coverage, biometric guardian check-in/out, child-safe door finger guards, rounded-edge furniture, fire-safety compliance, and mandatory police background verification for all staff.',
    },
    {
      q: 'Do you provide school bus transport with GPS tracking?',
      a: 'Yes! We operate air-conditioned, speed-governed school vans equipped with female attendants, child seatbelts, first-aid kits, and live GPS tracking accessible on the parent mobile app.',
    },
    {
      q: 'Can we visit the campus before taking admission?',
      a: 'Absolutely! We encourage all parents to book a personalized campus walkthrough where you and your child can explore our activity studios, meet Leo, and observe live morning circle times.',
    },
    {
      q: 'How do parents receive updates on daily meals and milestones?',
      a: 'Through our dedicated AKP Parent Mobile App, you receive real-time photos, snack/meal intake logs, nap duration, and monthly developmental milestone portfolios.',
    },
    {
      q: 'What happens if my child has food allergies or dietary restrictions?',
      a: 'Our on-site kitchen is 100% nut-free. During admission, we log all dietary restrictions, gluten intolerances, or vegetarian/vegan preferences to customize meal preparations safely.',
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;

    onSubmitGeneralEnquiry({
      parentName: formData.parentName,
      phone: formData.phone,
      email: formData.email,
      childAge: formData.childAge,
      enquiryType: formData.enquiryType,
      city: formData.city,
      message: formData.message,
    });

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        parentName: '',
        phone: '',
        email: '',
        childAge: 'Nursery (2.5 – 3.5 Years)',
        enquiryType: 'General Question',
        city: 'Main Campus',
        message: '',
      });
    }, 3500);
  };

  return (
    <div id="contact-page-container" className="w-full bg-[#FFF9EC]">
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
            <span>📞 Reach Our Admissions Desk</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            LET’S START A CONVERSATION <br />
            <span className="text-[#FFD21F]">FOR YOUR LITTLE ONE.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Have questions about our curriculum, admissions, fees, or bus routes? Our friendly front desk and admissions directors are here to help!
          </p>
        </div>
      </section>

      {/* Contact Cards & Form Section */}
      <section className="py-16 sm:py-24 bg-white border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Contact Info Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase text-[#F4511E] tracking-wider">
                  Direct Channels
                </span>
                <h2 className="font-heading font-black text-3xl text-[#173B5E] mt-1">
                  GET IN TOUCH
                </h2>
              </div>

              {/* Phone Card */}
              <div className="p-5 rounded-3xl bg-[#FFF9EC] border-3 border-[#F4511E] flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F4511E] flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#173B5E]">Admissions Hotline</h4>
                  <p className="text-sm font-extrabold text-[#F4511E] mt-0.5">
                    +91 9845296096 / +91 9945531032
                  </p>
                  <p className="text-xs text-gray-500 font-medium mt-1">Mon – Sat: 8:30 AM – 6:30 PM</p>
                </div>
              </div>

              {/* WhatsApp Card */}
              <div className="p-5 rounded-3xl bg-[#FFF9EC] border-3 border-[#5BC85A] flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#173B5E]">WhatsApp Instant Chat</h4>
                  <a
                    href="https://wa.me/919845296096?text=Hello%20A%20Kid's%20Pre%20School!"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-extrabold text-[#2E7D32] hover:underline block mt-0.5"
                  >
                    +91 9845296096 💬
                  </a>
                  <p className="text-xs text-gray-500 font-medium mt-1">Instant query resolution & brochure</p>
                </div>
              </div>

              {/* Email Card */}
              <div className="p-5 rounded-3xl bg-[#FFF9EC] border-3 border-[#29B6F6] flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#173B5E]">Official Email</h4>
                  <a
                    href="mailto:akidspreschool@gmail.com"
                    className="text-sm font-extrabold text-[#0288D1] hover:underline mt-0.5 block"
                  >
                    akidspreschool@gmail.com
                  </a>
                  <p className="text-xs text-gray-500 font-medium mt-1">For admissions, prospectus & queries</p>
                </div>
              </div>

              {/* Campus Address Card */}
              <div className="p-5 rounded-3xl bg-[#FFF9EC] border-3 border-[#FFD21F] flex items-start gap-4 shadow-sm">
                <div className="w-12 h-12 rounded-2xl bg-[#FFFDE7] text-[#F57F17] flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-heading font-bold text-base text-[#173B5E]">Bengaluru Campus Location</h4>
                  <p className="text-xs sm:text-sm text-gray-700 font-medium mt-0.5 leading-relaxed">
                    156, Doctor layout, 1st main road, Hosa Rd, Naganathapura, Bengaluru, Karnataka 560100, India
                  </p>
                  <div className="mt-2.5 flex items-center gap-3">
                    <button
                      onClick={() => onNavigate('campuses')}
                      className="text-xs font-bold text-[#F4511E] hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>View Interactive Map</span>
                      <span>→</span>
                    </button>
                    <a
                      href="https://www.google.com/maps/dir//A+Kids+Pre+School,+156,Doctor+layout,+1st+main+road,+Hosa+Rd,+Naganathapura,+Bengaluru,+Karnataka+560100,+India/@12.8155648,80.0423936,14z/data=!4m8!4m7!1m0!1m5!1m1!1s0x3bae6da6cc090bdb:0xa2513b6747b8f30c!2m2!1d77.6668455!2d12.8692084?entry=ttu&g_ep=EgoyMDI2MDgxMi4wIKXMDSoASAFQAw%3D%3D"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-bold text-[#0288D1] hover:underline flex items-center gap-1"
                    >
                      <span>Google Maps Directions</span>
                      <span>↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Message Form */}
            <div className="lg:col-span-7 bg-[#FFF9EC] rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-xl">
              {submitted ? (
                <div className="text-center py-8 flex flex-col items-center">
                  <LeoCharacter
                    state="celebrating"
                    celebrating={true}
                    size={160}
                    message="Roar-some! 🎉"
                    subMessage="Message received! Our front desk team will get back to you shortly."
                    showActions={false}
                    interactive={false}
                  />
                  <h3 className="font-heading font-black text-2xl text-[#173B5E] mt-4 mb-2">
                    Message Sent Successfully! 🦁
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 max-w-sm mx-auto leading-relaxed font-medium">
                    Thank you! Our front desk officer has received your message and will call or email you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <span className="text-xs font-extrabold uppercase text-[#F4511E] tracking-wider">
                      Online Inquiry
                    </span>
                    <h3 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E]">
                      Send Us A Message
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-[#173B5E] mb-1">
                        Parent / Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Priya Sharma"
                        value={formData.parentName}
                        onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
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
                        placeholder="parent@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#173B5E] mb-1">
                        Child Age / Program Interest
                      </label>
                      <select
                        value={formData.childAge}
                        onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                      >
                        <option value="Playgroup (1.5 – 2.5 Years)">Playgroup (1.5 – 2.5 Years)</option>
                        <option value="Nursery (2.5 – 3.5 Years)">Nursery (2.5 – 3.5 Years)</option>
                        <option value="Junior KG (3.5 – 4.5 Years)">Junior KG (3.5 – 4.5 Years)</option>
                        <option value="Senior KG (4.5 – 5.5 Years)">Senior KG (4.5 – 5.5 Years)</option>
                        <option value="Day Care & Extended (1.5 – 8 Years)">Day Care & Extended (1.5 – 8 Years)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Your Message or Questions
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Ask about admissions, fee schedules, transportation, or tour availability..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Send Inquiry Now 🦁
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions Accordion */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#29B6F6]/15 text-[#0288D1] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Parent FAQ
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              FREQUENTLY ASKED QUESTIONS
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Everything you need to know about enrollment, safety, meals, and daily routines.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border-2 border-orange-200 overflow-hidden shadow-xs transition-all"
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-[#173B5E] hover:text-[#F4511E] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center shrink-0 text-[#F4511E]">
                      {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-sm text-gray-700 font-medium leading-relaxed border-t border-gray-100 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
