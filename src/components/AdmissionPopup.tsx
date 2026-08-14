import React, { useState } from 'react';
import { X, Sparkles, CheckCircle2, Phone, Mail, User, MapPin, Send } from 'lucide-react';
import { AKPLogo } from './MascotIcons';
import { LeoCharacter } from './LeoCharacter';
import confetti from 'canvas-confetti';
import { Enquiry } from '../types';

interface AdmissionPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitLead: (lead: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => void;
}

export const AdmissionPopup: React.FC<AdmissionPopupProps> = ({ isOpen, onClose, onSubmitLead }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    email: '',
    phone: '',
    childAge: '2.5 Years (Nursery)',
    enquiryType: 'Admissions 2026-27',
    city: 'Main Campus',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.parentName || !formData.phone) return;

    onSubmitLead({
      parentName: formData.parentName,
      email: formData.email,
      phone: formData.phone,
      childAge: formData.childAge,
      enquiryType: formData.enquiryType,
      city: formData.city,
      message: formData.message,
    });

    setSubmitted(true);
    try {
      confetti({
        particleCount: 60,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#F4511E', '#FFD21F', '#29B6F6', '#FF4F6D'],
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2800);
  };

  return (
    <div
      id="admission-popup-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173B5E]/70 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl bg-[#FFF9EC] rounded-3xl shadow-2xl overflow-hidden border-4 border-[#FFD21F] max-h-[92vh] flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          id="close-admission-popup-btn"
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-10 h-10 rounded-full bg-[#173B5E] text-white flex items-center justify-center hover:bg-[#F4511E] transition-colors shadow-md"
          aria-label="Close popup"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Side: Branded Visual Card */}
        <div className="md:w-5/12 bg-gradient-to-br from-[#F4511E] via-[#FF8A3D] to-[#FFD21F] p-6 text-white flex flex-col justify-between relative overflow-hidden">
          {/* Decorative Circles */}
          <div className="absolute -top-12 -left-12 w-40 h-40 rounded-full bg-white/15 blur-xl"></div>
          <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-white/20 blur-xl"></div>

          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-extrabold uppercase tracking-wider mb-4 border border-white/30">
              <Sparkles className="w-3.5 h-3.5 text-[#FFD21F]" />
              Admissions Open 2026–27
            </div>
            <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white leading-tight mb-2">
              READY TO BEGIN YOUR LITTLE ONE’S ADVENTURE?
            </h3>
            <p className="text-white/90 text-sm font-medium leading-relaxed">
              Join a world of joy, curiosity, and boundless imagination with Leo the Lion!
            </p>
          </div>

          <div className="relative z-10 flex flex-col items-center my-3">
            <LeoCharacter
              state="excited"
              size={160}
              message="Ready for an adventure?"
              subMessage="Join us at A Kid's Pre School!"
              showActions={false}
              interactive={false}
            />
          </div>

          <div className="relative z-10 pt-2 border-t border-white/20 text-xs text-white/90 flex items-center justify-between">
            <span className="font-bold">✨ Safe &amp; Loving Campus</span>
            <span className="font-bold">🦁 100% Certified Care</span>
          </div>
        </div>

        {/* Right Side: High-Conversion Form */}
        <div className="md:w-7/12 p-6 sm:p-8 bg-white flex flex-col justify-center overflow-y-auto">
          {submitted ? (
            <div className="text-center py-6 flex flex-col items-center">
              <LeoCharacter
                state="celebrating"
                celebrating={true}
                size={140}
                message="Roar-some! 🎉"
                subMessage="We'll be in touch soon! Our admissions team can't wait to meet you."
                showActions={false}
                interactive={false}
              />
              <p className="text-xs text-gray-600 max-w-xs leading-relaxed mt-3 font-medium">
                Thank you for choosing <strong className="text-[#F4511E]">A Kid&apos;s Pre School</strong>. Our admissions team will connect with you within 2 business hours!
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-[#F4511E]">
                  Quick Admission Enquiry
                </span>
                <h4 className="font-heading font-bold text-xl text-[#173B5E]">
                  Let&apos;s Connect With Your Family
                </h4>
              </div>

              {/* Parent Name */}
              <div>
                <label className="block text-xs font-bold text-[#173B5E] mb-1">
                  Parent / Guardian Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    id="popup-parent-name"
                    type="text"
                    required
                    placeholder="e.g. Sarah Jenkins"
                    value={formData.parentName}
                    onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                  />
                </div>
              </div>

              {/* Phone and Email Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      id="popup-phone"
                      type="tel"
                      required
                      placeholder="+1 (555) 000-0000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      id="popup-email"
                      type="email"
                      placeholder="parent@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                    />
                  </div>
                </div>
              </div>

              {/* Program / Child Age Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Child Age / Program
                  </label>
                  <select
                    id="popup-child-age"
                    value={formData.childAge}
                    onChange={(e) => setFormData({ ...formData, childAge: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                  >
                    <option value="1.5–2.5 Years (Playgroup)">1.5–2.5 Years (Playgroup)</option>
                    <option value="2.5–3.5 Years (Nursery)">2.5–3.5 Years (Nursery)</option>
                    <option value="3.5–4.5 Years (Junior KG)">3.5–4.5 Years (Junior KG)</option>
                    <option value="4.5–5.5 Years (Senior KG)">4.5–5.5 Years (Senior KG)</option>
                    <option value="Day Care & Extended Hours">Day Care & Extended Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Enquiry Type
                  </label>
                  <select
                    id="popup-enquiry-type"
                    value={formData.enquiryType}
                    onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })}
                    className="w-full px-3 py-2 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                  >
                    <option value="Admissions 2026-27">Admissions 2026-27</option>
                    <option value="Book a Campus Tour">Book a Campus Tour</option>
                    <option value="Fee Structure Inquiry">Fee Structure Inquiry</option>
                    <option value="Franchise Opportunity">Franchise Opportunity</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </div>
              </div>

              {/* City / Location */}
              <div>
                <label className="block text-xs font-bold text-[#173B5E] mb-1">
                  Preferred Campus / City
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                  <input
                    id="popup-city"
                    type="text"
                    placeholder="e.g. Downtown Central Campus"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none bg-[#FFF9EC]/40 text-[#173B5E] font-medium"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                id="submit-admission-popup-btn"
                type="submit"
                className="w-full py-3 px-6 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-bold text-base shadow-lg shadow-[#F4511E]/30 flex items-center justify-center gap-2 transform active:scale-95 transition-all mt-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                SEND ENQUIRY
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
