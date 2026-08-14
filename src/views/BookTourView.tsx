import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  LeoReader,
  StarDeco,
  SunshineDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { LeoCharacter } from '../components/LeoCharacter';
import { PageTab, TourBooking } from '../types';
import {
  Calendar as CalendarIcon,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  QrCode,
  Download,
  Gift,
  ShieldCheck,
  Heart,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface BookTourViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  onSubmitTourBooking: (booking: Omit<TourBooking, 'id' | 'createdAt' | 'status'>) => void;
}

export const BookTourView: React.FC<BookTourViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
  onSubmitTourBooking,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Form State
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 86400000 * 2).toISOString().split('T')[0]
  );
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('10:00 AM – Morning Circle Tour');

  const [parentName, setParentName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [childName, setChildName] = useState('');
  const [childAge, setChildAge] = useState('2.5 Years');
  const [program, setProgram] = useState('Nursery');
  const [message, setMessage] = useState('');

  const [confirmedBookingId, setConfirmedBookingId] = useState('');

  const timeSlots = [
    { time: '10:00 AM – Morning Circle Tour', label: 'Recommended: Watch Live Circle Time & Rhymes' },
    { time: '11:30 AM – Creative Play & Snack Tour', label: 'Watch Art Station & Organic Snack Hour' },
    { time: '3:30 PM – Afternoon Activity Walkthrough', label: 'Explore Little Explorers STEM & Outdoor Turf' },
    { time: '5:00 PM – Evening Parent Discovery Slot', label: 'One-on-One Chat with Director of Education' },
  ];

  const handleNextStep1 = () => {
    if (!selectedDate || !selectedTimeSlot) return;
    setStep(2);
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!parentName || !phone) return;

    const bookingId = `AKP-${Math.floor(100000 + Math.random() * 900000)}`;
    setConfirmedBookingId(bookingId);

    onSubmitTourBooking({
      parentName,
      phone,
      email,
      childName: childName || 'Little Explorer',
      childAge,
      program,
      preferredDate: selectedDate,
      preferredTime: selectedTimeSlot,
      message,
    });

    setStep(3);
    try {
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#F4511E', '#FFD21F', '#29B6F6', '#5BC85A', '#FF4F6D'],
      });
    } catch {
      // safe fallback
    }
  };

  return (
    <div id="book-tour-page-container" className="w-full bg-[#FFF9EC]">
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
            <span>🦁 Personalized In-Person Experience</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            BOOK A LIVE CAMPUS TOUR: <br />
            <span className="text-[#FFD21F]">EXPERIENCE THE MAGIC IN PERSON.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Step inside our sunlit classrooms, observe our joyful Montessori stations, and let your child receive a warm greeting from friendly mascot Leo!
          </p>

          {/* Stepper Progress Bar */}
          <div className="mt-10 max-w-lg mx-auto flex items-center justify-between relative">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/20 -translate-y-1/2 -z-1"></div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm z-10 transition-all ${
                step >= 1 ? 'bg-[#FFD21F] text-[#173B5E] shadow-lg scale-110' : 'bg-white/20 text-white'
              }`}
            >
              1
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm z-10 transition-all ${
                step >= 2 ? 'bg-[#FFD21F] text-[#173B5E] shadow-lg scale-110' : 'bg-white/20 text-white'
              }`}
            >
              2
            </div>
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center font-heading font-black text-sm z-10 transition-all ${
                step >= 3 ? 'bg-[#5BC85A] text-white shadow-lg scale-110' : 'bg-white/20 text-white'
              }`}
            >
              3
            </div>
          </div>
          <div className="max-w-lg mx-auto flex justify-between text-[11px] font-extrabold uppercase tracking-wider text-white/80 mt-2">
            <span>1. Date & Time</span>
            <span>2. Family Details</span>
            <span>3. VIP Tour Pass</span>
          </div>
        </div>
      </section>

      {/* Main Interactive Booking Card */}
      <section className="py-12 sm:py-20 bg-white border-b-2 border-orange-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-[#FFF9EC] rounded-3xl p-6 sm:p-12 border-4 border-[#FFD21F] shadow-2xl">
            {/* STEP 1: Select Date & Time */}
            {step === 1 && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                  <LeoCharacter
                    state="tour"
                    size={140}
                    message="Come see where the adventure begins! 🦁"
                    subMessage="Pick your date & let's walk through our classrooms!"
                    showActions={false}
                    interactive={false}
                  />
                  <div className="text-center sm:text-left">
                    <span className="text-xs font-extrabold uppercase text-[#F4511E] tracking-wider block">
                      Step 1 of 3
                    </span>
                    <h2 className="font-heading font-black text-2xl sm:text-3xl text-[#173B5E]">
                      CHOOSE YOUR TOUR DATE &amp; TIME
                    </h2>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1 max-w-md">
                      Select a morning or afternoon slot when classes are in active joyful session.
                    </p>
                  </div>
                </div>

                {/* Date Picker Input */}
                <div className="bg-white p-6 rounded-2xl border-2 border-orange-200 shadow-xs">
                  <label className="block font-heading font-extrabold text-sm text-[#173B5E] mb-2 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4 text-[#F4511E]" />
                    Select Preferred Visit Date:
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().split('T')[0]}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 font-heading font-extrabold text-base text-[#173B5E] focus:border-[#F4511E] focus:outline-none"
                  />
                  <p className="text-[11px] text-gray-500 font-medium mt-1.5">
                    * Campus tours run Monday through Saturday from 9:30 AM to 5:30 PM.
                  </p>
                </div>

                {/* Time Slots Selector */}
                <div className="space-y-3">
                  <label className="block font-heading font-extrabold text-sm text-[#173B5E] flex items-center gap-2">
                    <Clock className="w-4 h-4 text-[#29B6F6]" />
                    Choose A Guided Experience Slot:
                  </label>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {timeSlots.map((slot, sIdx) => {
                      const isSelected = selectedTimeSlot === slot.time;
                      return (
                        <div
                          key={sIdx}
                          onClick={() => setSelectedTimeSlot(slot.time)}
                          className={`p-4 rounded-2xl border-3 cursor-pointer transition-all ${
                            isSelected
                              ? 'bg-[#173B5E] text-white border-[#FFD21F] shadow-md scale-102'
                              : 'bg-white text-[#173B5E] border-gray-200 hover:border-orange-300'
                          }`}
                        >
                          <div className="font-heading font-black text-sm">{slot.time}</div>
                          <div
                            className={`text-xs mt-1 ${
                              isSelected ? 'text-[#FFD21F]' : 'text-gray-500'
                            }`}
                          >
                            {slot.label}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={handleNextStep1}
                    className="px-8 py-3.5 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <span>Proceed to Family Details</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Fill Family Details */}
            {step === 2 && (
              <form onSubmit={handleFinalSubmit} className="space-y-4">
                <div className="text-center max-w-xl mx-auto mb-6">
                  <span className="text-xs font-extrabold uppercase text-[#F4511E] tracking-wider">
                    Step 2 of 3
                  </span>
                  <h2 className="font-heading font-black text-2xl sm:text-4xl text-[#173B5E]">
                    TELL US ABOUT YOUR FAMILY
                  </h2>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium mt-1">
                    Date: <strong>{selectedDate}</strong> • Slot: <strong>{selectedTimeSlot.split('–')[0]}</strong>
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Parent / Guardian Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jessica Miller"
                      value={parentName}
                      onChange={(e) => setParentName(e.target.value)}
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
                      placeholder="+1 (555) 000-0000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
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
                      placeholder="parent@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Child’s Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Lucas"
                      value={childName}
                      onChange={(e) => setChildName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Child’s Current Age
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. 2 Years 8 Months"
                      value={childAge}
                      onChange={(e) => setChildAge(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Program of Interest
                    </label>
                    <select
                      value={program}
                      onChange={(e) => setProgram(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                    >
                      <option value="Playgroup (1.5 – 2.5y)">Playgroup (1.5 – 2.5y)</option>
                      <option value="Nursery (2.5 – 3.5y)">Nursery (2.5 – 3.5y)</option>
                      <option value="Junior KG (3.5 – 4.5y)">Junior KG (3.5 – 4.5y)</option>
                      <option value="Senior KG (4.5 – 5.5y)">Senior KG (4.5 – 5.5y)</option>
                      <option value="Day Care (1.5 – 8y)">Day Care & Extended (1.5 – 8y)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Special Inquiries / Requests (Optional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Interested in food allergy protocol or bus route options..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-white font-medium"
                  />
                </div>

                <div className="pt-4 flex items-center justify-between">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="px-5 py-2.5 rounded-xl bg-white border border-gray-300 text-[#173B5E] font-heading font-bold text-xs flex items-center gap-1 hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-3.5 h-3.5" />
                    Back
                  </button>

                  <button
                    type="submit"
                    className="px-8 py-3.5 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    Confirm & Generate VIP Pass 🦁
                  </button>
                </div>
              </form>
            )}

            {/* STEP 3: Instant VIP Pass Confirmation Card */}
            {step === 3 && (
              <div className="text-center space-y-6">
                <div className="flex justify-center">
                  <LeoCharacter
                    state="celebrating"
                    celebrating={true}
                    size={180}
                    message="Roar-some! 🎉"
                    subMessage="We'll see you soon! Your VIP pass is ready below."
                    showActions={false}
                    interactive={false}
                  />
                </div>

                <div>
                  <span className="px-3.5 py-1 rounded-full bg-[#5BC85A] text-white text-xs font-black uppercase tracking-wider">
                    Tour Confirmed!
                  </span>
                  <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#173B5E] mt-2">
                    WE CAN&apos;T WAIT TO MEET YOU! 🦁
                  </h2>
                  <p className="text-sm text-gray-700 font-medium mt-1">
                    A confirmation SMS & WhatsApp message has been dispatched to <strong>{phone}</strong>.
                  </p>
                </div>

                {/* VIP Visitor Pass Ticket */}
                <div className="max-w-md mx-auto bg-white rounded-3xl p-6 border-4 border-[#FFD21F] shadow-xl text-left relative overflow-hidden">
                  <div className="flex items-center justify-between border-b border-gray-100 pb-3 mb-3">
                    <div className="flex items-center gap-2">
                      <AKPLogo size={36} showText={false} />
                      <div>
                        <div className="font-heading font-black text-xs text-[#173B5E]">A KID’S PRE SCHOOL</div>
                        <div className="text-[10px] text-gray-500">Official VIP Visitor Pass</div>
                      </div>
                    </div>
                    <span className="font-mono text-xs font-black text-[#F4511E]">{confirmedBookingId}</span>
                  </div>

                  <div className="space-y-2 text-xs text-gray-800 font-medium">
                    <div className="flex justify-between">
                      <span className="text-gray-500">Guest Parent:</span>
                      <strong className="text-[#173B5E]">{parentName}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Little Explorer:</span>
                      <strong className="text-[#F4511E]">{childName || 'Little One'}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Program:</span>
                      <strong className="text-[#173B5E]">{program}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-500">Date & Slot:</span>
                      <strong className="text-[#0288D1]">{selectedDate} @ {selectedTimeSlot.split('–')[0]}</strong>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-dashed border-gray-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Gift className="w-5 h-5 text-[#FFD21F]" />
                      <span className="text-[10px] font-bold text-[#173B5E]">Includes Free Little Explorer Kit!</span>
                    </div>
                    <QrCode className="w-8 h-8 text-[#173B5E]" />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[#173B5E] text-white font-heading font-bold text-xs uppercase flex items-center justify-center gap-2 hover:bg-[#102A43]"
                  >
                    <Download className="w-4 h-4 text-[#FFD21F]" />
                    Print / Save Visitor Pass
                  </button>

                  <button
                    onClick={() => onNavigate('home')}
                    className="w-full sm:w-auto px-6 py-3 rounded-xl bg-white border border-gray-200 text-[#173B5E] font-heading font-bold text-xs hover:bg-orange-50"
                  >
                    Return to Homepage
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* What To Expect On Your Tour */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Campus Hospitality
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              WHAT TO EXPECT ON YOUR VISIT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#F4511E] shadow-md text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F4511E] flex items-center justify-center mx-auto mb-4">
                <Heart className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#173B5E] mb-2">
                1. Warm Welcome from Leo
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Your child receives a high-five from mascot Leo and their very own Little Explorer badge!
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#29B6F6] shadow-md text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#173B5E] mb-2">
                2. Live Activity Observation
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Walk through our art atelier, sensory tables, outdoor playground, and meet our certified educators.
              </p>
            </div>

            <div className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FFD21F] shadow-md text-center">
              <div className="w-12 h-12 rounded-2xl bg-[#FFFDE7] text-[#F57F17] flex items-center justify-center mx-auto mb-4">
                <Gift className="w-6 h-6" />
              </div>
              <h3 className="font-heading font-bold text-lg text-[#173B5E] mb-2">
                3. Director Q&A & Gift Kit
              </h3>
              <p className="text-xs text-gray-600 font-medium leading-relaxed">
                Enjoy a cup of coffee with our Principal, review customized fee schedules, and receive your welcome gift kit!
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
