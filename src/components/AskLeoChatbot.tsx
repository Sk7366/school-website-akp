import React, { useState, useRef, useEffect } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Sparkles,
  Volume2,
  VolumeX,
  Bot,
  Calendar,
  Phone,
  Calculator,
  Compass,
  Baby,
  RefreshCw,
} from 'lucide-react';
import { PageTab } from '../types';

interface AskLeoChatbotProps {
  onOpenAdmission?: () => void;
  onNavigate?: (tab: PageTab) => void;
  onBookTourQuick?: (booking: any) => void;
  onEnquiryQuick?: (enquiry: any) => void;
}

interface ChatMessage {
  id: string;
  sender: 'leo' | 'user';
  text: string;
  options?: { label: string; action?: () => void; textPrompt?: string }[];
  isAiGenerated?: boolean;
}

export const AskLeoChatbot: React.FC<AskLeoChatbotProps> = ({
  onOpenAdmission,
  onNavigate,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [hasOpenedOnce, setHasOpenedOnce] = useState<boolean>(false);
  const [inputVal, setInputVal] = useState<string>('');
  const [isTyping, setIsTyping] = useState<boolean>(false);
  const [childAge, setChildAge] = useState<string>('2.5–3.5 yrs (Nursery)');
  const [voiceEnabled, setVoiceEnabled] = useState<boolean>(false);

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm-1',
      sender: 'leo',
      text: "🦁 Hi! I'm Leo, your preschool guide at A Kid's Pre School! Ask me anything about our classes, admissions, school timings, or book a campus visit with me!",
      options: [
        { label: '🎒 What programs do you offer?', textPrompt: 'What programs do you offer at A Kids Pre School?' },
        { label: '🏫 Can I book a tour?', textPrompt: 'Can I book a school tour?' },
        { label: '⏰ What are the school timings?', textPrompt: 'What are the school timings for each program?' },
        { label: '📝 What is the admission process?', textPrompt: 'What is the admission process for the 2026-27 batch?' },
        { label: '✨ Tell me about the school', textPrompt: 'Tell me about the school philosophy, campus and safety.' },
      ],
    },
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOpenLeo = () => {
      setIsOpen(true);
      setHasOpenedOnce(true);
    };
    window.addEventListener('open-ask-leo', handleOpenLeo);
    return () => window.removeEventListener('open-ask-leo', handleOpenLeo);
  }, []);

  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen, isTyping]);

  // Voice narration helper
  const speakText = (text: string) => {
    if (!voiceEnabled || !('speechSynthesis' in window)) return;
    try {
      window.speechSynthesis.cancel();
      // Clean markdown tags for natural speech
      const cleaned = text.replace(/[*#_~`🦁🌟🎨🌈🍎📚]/g, '');
      const utterance = new SpeechSynthesisUtterance(cleaned);
      utterance.rate = 1.0;
      utterance.pitch = 1.1; // cheerful, friendly pitch
      window.speechSynthesis.speak(utterance);
    } catch {
      // ignore
    }
  };

  const handleSendQuery = async (queryText: string) => {
    if (!queryText.trim()) return;

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      text: queryText,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputVal('');
    setIsTyping(true);

    try {
      // Build brief chat history
      const history = messages.slice(-4).map((m) => ({
        sender: m.sender,
        text: m.text,
      }));

      const res = await fetch('/api/ask-leo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: queryText,
          childAge,
          program: childAge.includes('Nursery')
            ? 'Nursery'
            : childAge.includes('Playgroup')
            ? 'Playgroup'
            : childAge.includes('KG')
            ? 'Kindergarten'
            : 'Early Childhood',
          history,
        }),
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      const leoReply =
        data.reply ||
        "🦁 *Roar!* I am so excited to welcome your child! Our teachers and I are ready to give you a guided walkthrough. Let's schedule a tour or calculate your fee estimate!";

      const leoMsg: ChatMessage = {
        id: `leo-${Date.now()}`,
        sender: 'leo',
        text: leoReply,
        isAiGenerated: true,
        options: [
          { label: '📅 Book In-Person Tour', textPrompt: 'Book a campus tour' },
          { label: '📍 Find Our Campus', textPrompt: 'Where is your campus located?' },
          { label: '💬 Ask Another Question', textPrompt: 'Tell me about the daily routine' },
        ],
      };

      setMessages((prev) => [...prev, leoMsg]);
      speakText(leoReply);
    } catch (err) {
      console.warn('Fallback chatbot execution:', err);
      // Gentle offline fallback
      let fallback =
        "🦁 *Roar!* Thank you for asking! At A Kid's Pre School, our child-first Montessori + Play-Way curriculum ensures every toddler feels confident, loved, and curious. Admissions for 2026–27 are now open with limited batch sizes!";
      
      const q = queryText.toLowerCase();
      if (q.includes('fee') || q.includes('cost') || q.includes('tuition')) {
        fallback =
          "🦁 *Tuition & Fees*: Our all-inclusive tuition covers classroom learning kits, daily nutritious snacks, and creative arts studios! Please book a campus visit or contact our admissions team for the complete prospectus!";
      } else if (q.includes('tour') || q.includes('visit')) {
        fallback =
          "🦁 *Campus Tours*: We host morning walkthroughs Monday through Saturday at 10 AM and 3 PM! You'll get to meet our certified teachers and see our joyful classrooms.";
      } else if (q.includes('potty') || q.includes('toilet')) {
        fallback =
          "🦁 *Potty Training*: No stress at all! For Playgroup and early Nursery, our warm caregivers gently assist with scheduled potty breaks and positive reinforcement. We meet every child where they are!";
      }

      const fallbackMsg: ChatMessage = {
        id: `leo-${Date.now()}`,
        sender: 'leo',
        text: fallback,
        options: [
          { label: '📅 Book a Campus Tour', textPrompt: 'Book a tour' },
          { label: '🎒 Explore Programs', textPrompt: 'What programs do you offer?' },
        ],
      };
      setMessages((prev) => [...prev, fallbackMsg]);
      speakText(fallback);
    } finally {
      setIsTyping(false);
    }
  };

  const handleOptionClick = (opt: { label: string; textPrompt?: string }) => {
    if (opt.label.includes('Book In-Person Tour') || opt.label.includes('Book a Campus Tour') || opt.label.includes('Book a Tour')) {
      if (onNavigate) onNavigate('book-tour');
      setIsOpen(false);
      return;
    }
    if (opt.label.includes('Explore Programs') || opt.label.includes('View Programs')) {
      if (onNavigate) onNavigate('programs');
      setIsOpen(false);
      return;
    }
    if (opt.label.includes('Admissions')) {
      if (onOpenAdmission) onOpenAdmission();
      setIsOpen(false);
      return;
    }

    if (opt.textPrompt) {
      handleSendQuery(opt.textPrompt);
    }
  };

  return (
    <>
      {/* Floating Trigger Button in Lion Orange */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
        {!isOpen && !hasOpenedOnce && (
          <div
            onClick={() => {
              setIsOpen(true);
              setHasOpenedOnce(true);
            }}
            className="hidden sm:flex items-center gap-2 px-3.5 py-2 rounded-2xl bg-white text-[#173B5E] shadow-2xl border-2 border-[#FFD21F] text-xs font-bold cursor-pointer hover:scale-105 transition-transform"
          >
            <span className="text-base animate-bounce">🦁</span>
            <span>
              <strong>Ask Leo AI:</strong> Admissions & Tips!
            </span>
          </div>
        )}

        <button
          id="ask-leo-floating-btn"
          onClick={() => {
            setIsOpen(!isOpen);
            setHasOpenedOnce(true);
          }}
          className="relative w-16 h-16 rounded-full bg-gradient-to-tr from-[#F4511E] to-[#FF8A3D] text-white flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300 border-4 border-[#FFD21F] cursor-pointer group"
          aria-label="Ask Leo AI Mascot Chatbot"
        >
          {isOpen ? (
            <X className="w-7 h-7 text-white" />
          ) : (
            <div className="relative flex items-center justify-center w-full h-full p-1">
              <img
                src="/lion-1.jpg"
                alt="Ask Leo AI"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/lion%201.jpg';
                }}
                className="w-12 h-12 rounded-full object-cover shadow-sm"
              />
              <span className="absolute top-0 right-0 w-4 h-4 rounded-full bg-[#5BC85A] border-2 border-white"></span>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          id="ask-leo-chatbox"
          className="fixed bottom-24 right-4 sm:right-6 z-[60] w-[94vw] sm:w-[410px] h-[580px] max-h-[85vh] bg-[#FFF9EC] rounded-3xl shadow-2xl border-4 border-[#FFD21F] flex flex-col overflow-hidden animate-fade-in"
        >
          {/* Deep Navy Header with AI Mascot badge & Voice toggle */}
          <div className="bg-[#173B5E] px-4 py-3 text-white flex items-center justify-between shadow-md relative z-10">
            <div className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 rounded-full bg-white border-2 border-[#FFD21F] flex items-center justify-center overflow-hidden shadow-inner shrink-0">
                <img
                  src="/lion-1.jpg"
                  alt="Leo Mascot"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/lion%201.jpg';
                  }}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h4 className="font-heading font-extrabold text-base text-white">ASK LEO</h4>
                  <span className="px-2 py-0.5 text-[9px] font-black rounded-full bg-[#FFD21F] text-[#173B5E] flex items-center gap-0.5">
                    <Sparkles className="w-2.5 h-2.5" /> LEO AI
                  </span>
                </div>
                <p className="text-[11px] text-[#FFD21F] font-semibold">Your Friendly Preschool Guide &amp; Mascot</p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {/* Voice toggle */}
              <button
                onClick={() => {
                  setVoiceEnabled(!voiceEnabled);
                  if (voiceEnabled) window.speechSynthesis?.cancel();
                }}
                className={`p-2 rounded-xl text-xs transition-colors ${
                  voiceEnabled ? 'bg-[#5BC85A] text-white' : 'bg-white/10 text-white/70 hover:bg-white/20'
                }`}
                title={voiceEnabled ? 'Mute Leo Voice' : 'Enable Leo Voice Read-Aloud'}
              >
                {voiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              </button>

              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Child Age Context Selector Bar */}
          <div className="bg-[#FFD21F]/20 px-3 py-1.5 border-b border-[#FFD21F]/40 flex items-center justify-between text-[11px] text-[#173B5E]">
            <div className="flex items-center gap-1 font-bold">
              <Baby className="w-3.5 h-3.5 text-[#F4511E]" />
              <span>Child Age:</span>
            </div>
            <select
              value={childAge}
              onChange={(e) => setChildAge(e.target.value)}
              className="bg-white text-xs font-semibold px-2 py-0.5 rounded-lg border border-orange-200 outline-none text-[#173B5E]"
            >
              <option value="1.5–2.5 yrs (Playgroup)">1.5 – 2.5 yrs (Playgroup)</option>
              <option value="2.5–3.5 yrs (Nursery)">2.5 – 3.5 yrs (Nursery)</option>
              <option value="3.5–4.5 yrs (Junior KG)">3.5 – 4.5 yrs (Junior KG)</option>
              <option value="4.5–5.5 yrs (Senior KG)">4.5 – 5.5 yrs (Senior KG)</option>
              <option value="Daycare (1.5–8 yrs)">Full-Day Daycare</option>
            </select>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FFF9EC]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}
              >
                {msg.sender === 'leo' ? (
                  <div className="flex items-start gap-2 max-w-[92%]">
                    <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center shrink-0 border-2 border-[#F4511E] overflow-hidden mt-0.5 shadow-xs">
                      <img
                        src="/lion-1.jpg"
                        alt="Leo"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/lion%201.jpg';
                        }}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3.5 rounded-2xl rounded-tl-none bg-white text-[#173B5E] text-xs sm:text-[13px] font-medium shadow-sm border border-orange-100 whitespace-pre-line leading-relaxed">
                      {msg.text}
                      {msg.isAiGenerated && (
                        <div className="mt-1.5 flex items-center gap-1 text-[10px] text-gray-400 font-semibold">
                          <Sparkles className="w-3 h-3 text-[#FFD21F]" /> Leo AI response
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className="max-w-[85%] p-3 rounded-2xl rounded-tr-none bg-[#F4511E] text-white text-xs sm:text-sm font-semibold shadow-sm">
                    {msg.text}
                  </div>
                )}

                {/* Quick Action Pills */}
                {msg.options && msg.options.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mt-2 ml-9">
                    {msg.options.map((opt, i) => (
                      <button
                        key={i}
                        onClick={() => handleOptionClick(opt)}
                        className="px-2.5 py-1 text-[11px] font-bold rounded-full bg-white text-[#173B5E] border-2 border-[#29B6F6] hover:bg-[#29B6F6] hover:text-white transition-all shadow-xs active:scale-95 cursor-pointer"
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 ml-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center overflow-hidden border border-orange-200 shrink-0">
                  <img
                    src="/lion-1.jpg"
                    alt="Leo"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = '/lion%201.jpg';
                    }}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="px-3.5 py-2 rounded-2xl bg-white text-xs font-semibold text-[#173B5E] border border-orange-100 flex items-center gap-1.5 shadow-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#F4511E]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FFD21F]"></span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#29B6F6]"></span>
                  <span className="text-[11px] text-gray-500 ml-1">Leo is thinking...</span>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Text Input Footer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery(inputVal);
            }}
            className="p-2.5 bg-white border-t border-gray-200 flex items-center gap-2"
          >
            <input
              id="ask-leo-input"
              type="text"
              placeholder="Ask Leo about curriculum, fees, potty training..."
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              disabled={isTyping}
              className="flex-1 text-xs sm:text-sm px-3.5 py-2.5 rounded-xl bg-[#FFF9EC] border border-gray-200 focus:border-[#F4511E] focus:outline-none text-[#173B5E] disabled:opacity-50"
            />
            <button
              id="ask-leo-send-btn"
              type="submit"
              disabled={isTyping || !inputVal.trim()}
              className="w-10 h-10 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] disabled:opacity-40 text-white flex items-center justify-center shrink-0 transition-colors shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
};
