import React, { useState } from 'react';
import {
  LeoSuper,
  LeoReader,
  StarDeco,
  SunshineDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { PageTab, Testimonial } from '../types';
import { INITIAL_TESTIMONIALS } from '../data/preschoolData';
import {
  Star,
  Quote,
  CheckCircle2,
  Sparkles,
  PlusCircle,
  X,
  MessageSquare,
  ShieldCheck,
  User,
  Heart,
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface ReviewsViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  testimonials: Testimonial[];
  onAddTestimonial: (review: Omit<Testimonial, 'id' | 'date' | 'published'>) => void;
}

export const ReviewsView: React.FC<ReviewsViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
  testimonials,
  onAddTestimonial,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [isWriteReviewOpen, setIsWriteReviewOpen] = useState(false);

  // Form State
  const [formName, setFormName] = useState('');
  const [formChild, setFormChild] = useState('');
  const [formProgram, setFormProgram] = useState('Nursery');
  const [formRating, setFormRating] = useState(5);
  const [formReview, setFormReview] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const filterOptions = ['All', 'Playgroup', 'Nursery', 'Junior KG', 'Senior KG', 'Day Care'];

  const filteredList = testimonials.filter((item) => {
    if (selectedFilter === 'All') return true;
    return item.program.toLowerCase().includes(selectedFilter.toLowerCase());
  });

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formReview) return;

    const colors = ['#F4511E', '#29B6F6', '#FFD21F', '#5BC85A', '#FF4F6D', '#8B5CF6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    onAddTestimonial({
      parentName: formName,
      childName: formChild || 'Little Learner',
      program: formProgram,
      rating: formRating,
      review: formReview,
      avatarColor: randomColor,
    });

    setSubmitted(true);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.6 },
      });
    } catch {
      // safe fallback
    }

    setTimeout(() => {
      setSubmitted(false);
      setIsWriteReviewOpen(false);
      setFormName('');
      setFormChild('');
      setFormReview('');
    }, 2000);
  };

  return (
    <div id="reviews-page-container" className="w-full bg-[#FFF9EC]">
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
            <span>⭐ Parent Experiences</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            HEARTFELT STORIES FROM <br />
            <span className="text-[#FFD21F]">OUR HAPPY FAMILIES.</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Read how A Kid’s Pre School has helped thousands of little learners discover confidence, vocabulary, lifelong friendships, and joyful independence.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => setIsWriteReviewOpen(true)}
              className="px-6 py-3.5 rounded-2xl bg-[#FFD21F] text-[#173B5E] font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-lg hover:bg-[#FFC400] transition-all flex items-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 text-[#F4511E]" />
              Write A Parent Review
            </button>
            <button
              onClick={onOpenAdmissionModal}
              className="px-6 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider border border-white/30 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-[#FFD21F]" />
              Join Our Happy Community
            </button>
          </div>
        </div>
      </section>

      {/* Trust Rating Summary Metrics Bar */}
      <section className="py-8 bg-white border-b-2 border-orange-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="flex items-center justify-center gap-1 text-[#FFD21F] mb-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#FFD21F]" />
                ))}
              </div>
              <div className="font-heading font-black text-2xl text-[#173B5E]">4.9 / 5.0</div>
              <div className="text-xs font-bold text-gray-500">Average Parent Rating</div>
            </div>

            <div>
              <div className="font-heading font-black text-2xl text-[#F4511E] mb-1">99.4%</div>
              <div className="text-xs font-bold text-gray-500">Parent Recommendation Rate</div>
            </div>

            <div>
              <div className="font-heading font-black text-2xl text-[#29B6F6] mb-1">4,800+</div>
              <div className="text-xs font-bold text-gray-500">Little Graduates Since 2014</div>
            </div>

            <div>
              <div className="font-heading font-black text-2xl text-[#5BC85A] mb-1">100%</div>
              <div className="text-xs font-bold text-gray-500">Verified Parent Feedback</div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Filter & Cards Grid */}
      <section className="py-12 sm:py-20 bg-[#FFF9EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Program Category Filters */}
          <div className="flex items-center justify-center gap-2 overflow-x-auto pb-6 mb-8">
            {filterOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => setSelectedFilter(opt)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold transition-all cursor-pointer ${
                  selectedFilter === opt
                    ? 'bg-[#173B5E] text-[#FFD21F] shadow-md'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredList.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-3xl p-6 sm:p-7 border-3 border-[#FFD21F] shadow-md hover:-translate-y-1.5 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-1">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-[#FFD21F] text-[#FFD21F]" />
                      ))}
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full bg-orange-100 text-[#F4511E] text-[10px] font-extrabold uppercase">
                      {review.program}
                    </span>
                  </div>

                  <Quote className="w-8 h-8 text-[#FFD21F] opacity-50 mb-2" />

                  <p className="text-sm text-[#173B5E] font-medium leading-relaxed italic mb-6">
                    &ldquo;{review.review}&rdquo;
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                  <div
                    className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-heading font-extrabold text-sm shadow-xs"
                    style={{ backgroundColor: review.avatarColor }}
                  >
                    {review.parentName[0]}
                  </div>

                  <div>
                    <h4 className="font-heading font-extrabold text-sm text-[#173B5E]">
                      {review.parentName}
                    </h4>
                    <p className="text-xs text-gray-500 font-semibold">
                      Parent of {review.childName || 'Student'} • {review.date}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Write a Review Modal */}
      {isWriteReviewOpen && (
        <div
          id="write-review-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#173B5E]/80 backdrop-blur-sm animate-fade-in"
          onClick={() => setIsWriteReviewOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#FFD21F] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsWriteReviewOpen(false)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center justify-center font-bold"
            >
              <X className="w-5 h-5" />
            </button>

            {submitted ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto mb-3 animate-bounce">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="font-heading font-black text-2xl text-[#173B5E] mb-1">
                  Thank You So Much! 🦁
                </h3>
                <p className="text-sm text-gray-600">
                  Your heartfelt review has been added to our community wall!
                </p>
              </div>
            ) : (
              <form onSubmit={handleReviewSubmit} className="space-y-4">
                <div>
                  <span className="text-xs font-extrabold uppercase text-[#F4511E]">
                    Community Voice
                  </span>
                  <h3 className="font-heading font-black text-2xl text-[#173B5E]">
                    Share Your Experience
                  </h3>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Priya Sharma"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Child’s Name
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Aarav"
                      value={formChild}
                      onChange={(e) => setFormChild(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#173B5E] mb-1">
                      Program Enrolled
                    </label>
                    <select
                      value={formProgram}
                      onChange={(e) => setFormProgram(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none"
                    >
                      <option value="Playgroup">Playgroup</option>
                      <option value="Nursery">Nursery</option>
                      <option value="Junior KG">Junior KG</option>
                      <option value="Senior KG">Senior KG</option>
                      <option value="Day Care">Day Care</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Star Rating (1–5 Stars)
                  </label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setFormRating(star)}
                        className="p-1 cursor-pointer transition-transform hover:scale-120"
                      >
                        <Star
                          className={`w-7 h-7 ${
                            star <= formRating
                              ? 'fill-[#FFD21F] text-[#FFD21F]'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className="text-xs font-bold text-gray-600 ml-2">
                      {formRating} out of 5
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#173B5E] mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell other parents about teacher warmth, child progress, safety, or memorable milestones..."
                    value={formReview}
                    onChange={(e) => setFormReview(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-sm rounded-xl border-2 border-gray-200 focus:border-[#F4511E] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#F4511E] text-white font-heading font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-md hover:bg-[#E64A19] transition-all cursor-pointer"
                >
                  Submit Review 🦁
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
