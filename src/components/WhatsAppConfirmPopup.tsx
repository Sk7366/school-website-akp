import React from 'react';
import { X, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { LeoCharacter } from './LeoCharacter';

interface WhatsAppConfirmPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  formData: Record<string, string>;
  enquiryType: string;
  isSending?: boolean;
}

export const WhatsAppConfirmPopup: React.FC<WhatsAppConfirmPopupProps> = ({
  isOpen,
  onClose,
  onConfirm,
  formData,
  enquiryType,
  isSending = false,
}) => {
  if (!isOpen) return null;

  const formatLabel = (key: string): string => {
    const labels: Record<string, string> = {
      parentName: 'Parent Name',
      name: 'Your Name',
      phone: 'Phone Number',
      email: 'Email Address',
      childAge: 'Child Age / Program',
      enquiryType: 'Enquiry Type',
      city: 'Locality / Area',
      message: 'Message',
      childName: "Child's Name",
      program: 'Program of Interest',
      preferredDate: 'Preferred Date',
      preferredTime: 'Preferred Time',
      experience: 'Experience',
    };
    return labels[key] || key.replace(/([A-Z])/g, ' $1').trim();
  };

  const filteredData = Object.entries(formData).filter(
    ([key, value]) => value && key !== 'isSending'
  );

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173B5E]/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden border-4 border-[#5BC85A]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-[#5BC85A] to-[#4CAF50] p-6 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
              <MessageCircle className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-xl">
                Confirm Your Details
              </h3>
              <p className="text-white/90 text-sm">
                {enquiryType}
              </p>
            </div>
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Warning Notice */}
          <div className="bg-[#FFF3E0] border-2 border-[#FF9800] rounded-2xl p-4 mb-6 flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#F57C00] shrink-0 mt-0.5" />
            <div className="text-sm">
              <p className="font-bold text-[#E65100] mb-1">
                Please verify your details
              </p>
              <p className="text-[#BF360C]">
                These details will be sent to our management team and they will reach out to you shortly.
              </p>
            </div>
          </div>

          {/* Details List */}
          <div className="space-y-3 mb-6">
            {filteredData.map(([key, value]) => (
              <div key={key} className="flex justify-between items-start py-2 border-b border-gray-100 last:border-0">
                <span className="text-sm text-gray-500 font-medium">
                  {formatLabel(key)}
                </span>
                <span className="text-sm text-[#173B5E] font-bold text-right max-w-[60%]">
                  {value}
                </span>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3 px-4 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#173B5E] font-heading font-bold text-sm transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isSending}
              className="flex-1 py-3 px-4 rounded-xl bg-[#5BC85A] hover:bg-[#4CAF50] text-white font-heading font-bold text-sm shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSending ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  Proceed & Send
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer with Leo */}
        <div className="bg-[#FFF9EC] px-6 py-4 border-t border-[#FFD21F]/30">
          <div className="flex items-center gap-3">
            <LeoCharacter
              state="teacher"
              size={50}
              showActions={false}
              interactive={false}
            />
            <p className="text-xs text-gray-600">
              <strong className="text-[#173B5E]">Leo says:</strong> Our team typically responds within 2-4 business hours! 🦁
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
