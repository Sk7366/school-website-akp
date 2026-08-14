import React, { useState } from 'react';
import {
  LeoTeacher,
  LeoSuper,
  LeoArtist,
  LeoReader,
  LeoMusic,
  LeoMeditate,
  StarDeco,
  SunshineDeco,
} from '../components/MascotIcons';
import { PageTab } from '../types';
import { DAILY_TIMELINE } from '../data/preschoolData';
import {
  Clock,
  Sun,
  Utensils,
  Moon,
  ShieldCheck,
  Calendar,
  Sparkles,
  CheckCircle2,
  Apple,
  Coffee,
  Heart,
  Droplets,
  Award,
} from 'lucide-react';

interface DayAtSchoolViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const DayAtSchoolView: React.FC<DayAtSchoolViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [activeDay, setActiveDay] = useState<'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri'>('Mon');
  const [scheduleFilter, setScheduleFilter] = useState<'all' | 'morning' | 'afternoon'>('all');

  const extendedSchedule = [
    {
      time: '8:30 AM – 9:00 AM',
      period: 'morning',
      title: 'Warm Welcome & Cubby Independence',
      desc: 'Cheerful greeting from Leo and teachers, temperature check, shoe cubby independence, and gentle soft play.',
      badgeColor: '#F4511E',
      icon: Sun,
    },
    {
      time: '9:00 AM – 9:45 AM',
      period: 'morning',
      title: 'Morning Circle Time & Phonics Rhymes',
      desc: 'Attendance joy, weather wheel rotation, emotion check-in, dynamic calendar singing, and story kickoff.',
      badgeColor: '#FFD21F',
      icon: Heart,
    },
    {
      time: '9:45 AM – 10:30 AM',
      period: 'morning',
      title: 'Hands-On Discovery & Montessori Math',
      desc: 'Tactile learning stations: sensory counting rods, sandpaper letter tracing, magnetic puzzles, and water tables.',
      badgeColor: '#29B6F6',
      icon: Sparkles,
    },
    {
      time: '10:30 AM – 11:00 AM',
      period: 'morning',
      title: 'Nutritious Organic Snack & Table Manners',
      desc: 'Fresh fruit slices, organic oats/pancake bites, warm milk, and learning to pour water independently.',
      badgeColor: '#5BC85A',
      icon: Utensils,
    },
    {
      time: '11:00 AM – 11:45 AM',
      period: 'morning',
      title: 'Outdoor Soft-Grass Adventure & Motor Circuit',
      desc: 'Tricycle racing track, balance beam stepping, swing joy, sandbox castles, and botanical herb watering.',
      badgeColor: '#FF4F6D',
      icon: Sun,
    },
    {
      time: '11:45 AM – 12:15 PM',
      period: 'morning',
      title: 'Creative Atelier (Art, Music & Puppets)',
      desc: 'Rotating days: finger painting, clay sculpting, xylophone percussion rhythm, and puppet role-play.',
      badgeColor: '#8B5CF6',
      icon: Sparkles,
    },
    {
      time: '12:15 PM – 1:00 PM',
      period: 'afternoon',
      title: 'Chef-Curated Hot Lunch & Gentle Transition',
      desc: 'Warm balanced meals cooked fresh daily on-site. Half-day children prepare for parent dismissal.',
      badgeColor: '#F4511E',
      icon: Utensils,
    },
    {
      time: '1:00 PM – 3:00 PM',
      period: 'afternoon',
      title: 'Peaceful Rest & Fairy Tale Nap Time',
      desc: 'Dim ambient fairy lights, white noise & soft lullabies, personal cozy toddler cots with favorite blankets.',
      badgeColor: '#29B6F6',
      icon: Moon,
    },
    {
      time: '3:00 PM – 4:00 PM',
      period: 'afternoon',
      title: 'Afternoon Wake-Up Snack & Story Den',
      desc: 'Fresh fruit smoothies, whole grain muffins, stretch and yawn yoga, and interactive big picture books.',
      badgeColor: '#FFD21F',
      icon: Apple,
    },
    {
      time: '4:00 PM – 6:00 PM',
      period: 'afternoon',
      title: 'Daycare Hobbies & Evening Play',
      desc: 'Lego building quests, guided homework assistance, board games, dance, and parent evening pickup.',
      badgeColor: '#5BC85A',
      icon: Heart,
    },
  ];

  const filteredSchedule = extendedSchedule.filter((item) => {
    if (scheduleFilter === 'morning') return item.period === 'morning';
    if (scheduleFilter === 'afternoon') return item.period === 'afternoon';
    return true;
  });

  const weeklyMeals = {
    Mon: {
      morningSnack: 'Steamed Sweet Corn & Apple Slices with Organic Almond Milk',
      lunch: 'Vegetable Lentil Khichdi / Whole Grain Pasta with Fresh Tomato-Basil Purée & Steamed Broccoli',
      afternoonSnack: 'Banana Oat Cookies & Chilled Fruit Smoothie',
      allergenAlert: '100% Nut-Free & Dairy Alternative Options Available',
    },
    Tue: {
      morningSnack: 'Whole Wheat Mini Pancakes with Pure Honey Drizzle & Pear Cubes',
      lunch: 'Mild Vegetable Pulao with Creamy Yogurt & Crispy Carrot Cucumber Sticks',
      afternoonSnack: 'Crisp Apple Crisps & Warm Spiced Milk',
      allergenAlert: '100% Nut-Free & Dairy Alternative Options Available',
    },
    Wed: {
      morningSnack: 'Fluffy Steamed Idlis with Mild Coconut Chutney & Papaya Wedges',
      lunch: 'Cheesy Vegetable Baked Macaroni with Pumpkin Soup & Garlic Toast',
      afternoonSnack: 'Whole Grain Berry Muffins & Fresh Orange Wedges',
      allergenAlert: '100% Nut-Free & Dairy Alternative Options Available',
    },
    Thu: {
      morningSnack: 'Organic Oatmeal Porridge with Raisins & Dragonfruit Cubes',
      lunch: 'Soft Whole Wheat Roti with Mild Paneer Tikka / Tofu & Green Peas',
      afternoonSnack: 'Crispy Rice Bites & Strawberry Milkshake',
      allergenAlert: '100% Nut-Free & Dairy Alternative Options Available',
    },
    Fri: {
      morningSnack: 'Mini Cheese Sandwich with Sliced Strawberries & Tender Coconut Water',
      lunch: 'Chef’s Rainbow Fried Rice with Edamame, Sweet Peppers & Veg Dim Sums',
      afternoonSnack: 'Fresh Watermelon Bowls & Healthy Granola Bites',
      allergenAlert: '100% Nut-Free & Dairy Alternative Options Available',
    },
  };

  const currentMeal = weeklyMeals[activeDay];

  return (
    <div id="day-at-school-page-container" className="w-full bg-[#FFF9EC]">
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
            <span>☀️ Routine, Nutrition & Joy</span>
          </div>

          <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
            A DAY IN THE LIFE AT <br />
            <span className="text-[#FFD21F]">“A KID’S PRE SCHOOL”</span>
          </h1>

          <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
            Every hour is carefully choreographed to balance energetic movement with mindful rest, sensory learning, and delicious chef-curated nutrition.
          </p>
        </div>
      </section>

      {/* Hourly Schedule Timeline */}
      <section className="py-16 sm:py-24 bg-white border-b-2 border-orange-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#F4511E]/15 text-[#F4511E] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              Choreographed Rhythm
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              OUR COMPLETE DAILY TIMETABLE
            </h2>
          </div>

          {/* Period Filter Buttons */}
          <div className="flex justify-center gap-2 mb-10">
            {(
              [
                { id: 'all', label: 'Full Day (8:30 AM – 6:00 PM)' },
                { id: 'morning', label: 'Morning Core School' },
                { id: 'afternoon', label: 'Afternoon & Day Care' },
              ] as const
            ).map((filter) => (
              <button
                key={filter.id}
                onClick={() => setScheduleFilter(filter.id)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold transition-all cursor-pointer ${
                  scheduleFilter === filter.id
                    ? 'bg-[#173B5E] text-[#FFD21F] shadow-md'
                    : 'bg-[#FFF9EC] text-gray-700 hover:bg-orange-100 border border-orange-200'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

          {/* Schedule List */}
          <div className="space-y-4">
            {filteredSchedule.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  className="bg-[#FFF9EC] rounded-3xl p-5 sm:p-6 border-3 shadow-md hover:-translate-y-1 transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  style={{ borderColor: item.badgeColor }}
                >
                  <div className="flex items-start sm:items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white shrink-0 shadow-sm"
                      style={{ backgroundColor: item.badgeColor }}
                    >
                      <IconComp className="w-6 h-6" />
                    </div>

                    <div>
                      <span
                        className="inline-block px-2.5 py-0.5 rounded text-[11px] font-extrabold uppercase mb-1"
                        style={{ backgroundColor: `${item.badgeColor}20`, color: item.badgeColor }}
                      >
                        ⏱️ {item.time}
                      </span>
                      <h3 className="font-heading font-black text-lg sm:text-xl text-[#173B5E]">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed mt-0.5 max-w-2xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Weekly Nutrition & Meal Menu Explorer */}
      <section className="py-16 sm:py-24 bg-[#FFF9EC]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <span className="inline-block px-3.5 py-1 rounded-full bg-[#5BC85A]/20 text-[#2E7D32] font-heading font-extrabold text-xs tracking-wider uppercase mb-2">
              100% Fresh & Organic
            </span>
            <h2 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight">
              WEEKLY NUTRITION & MEAL MENU
            </h2>
            <p className="text-base text-gray-700 font-medium mt-2">
              Cooked fresh daily on campus by certified pediatric chefs. No processed sugars, no artificial preservatives, 100% nut-free kitchen.
            </p>
          </div>

          {/* Day of week buttons */}
          <div className="flex justify-center gap-2 sm:gap-3 mb-8">
            {(['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] as const).map((day) => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                className={`px-5 py-3 rounded-2xl font-heading font-extrabold text-xs sm:text-sm tracking-wide transition-all cursor-pointer border-3 ${
                  activeDay === day
                    ? 'bg-[#F4511E] text-white border-[#F4511E] shadow-md scale-105'
                    : 'bg-white text-gray-700 border-gray-200 hover:bg-orange-50'
                }`}
              >
                {day === 'Mon'
                  ? 'Monday'
                  : day === 'Tue'
                  ? 'Tuesday'
                  : day === 'Wed'
                  ? 'Wednesday'
                  : day === 'Thu'
                  ? 'Thursday'
                  : 'Friday'}
              </button>
            ))}
          </div>

          {/* Meal Details Card */}
          <div className="bg-white rounded-3xl p-6 sm:p-10 border-4 border-[#FFD21F] shadow-xl space-y-6">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <span className="text-xs font-bold uppercase text-[#F4511E]">Daily Menu</span>
                <h3 className="font-heading font-black text-2xl text-[#173B5E]">
                  {activeDay === 'Mon'
                    ? 'Monday Delights'
                    : activeDay === 'Tue'
                    ? 'Tuesday Healthy Feast'
                    : activeDay === 'Wed'
                    ? 'Wednesday Wholesome Kitchen'
                    : activeDay === 'Thu'
                    ? 'Thursday Power Bites'
                    : 'Friday Celebration Lunch'}
                </h3>
              </div>
              <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-extrabold rounded-full">
                🌱 100% Organic & Fresh
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Morning Snack */}
              <div className="p-5 rounded-2xl bg-[#FFF3E0] border-2 border-[#F4511E]/40">
                <div className="flex items-center gap-2 text-[#F4511E] font-heading font-bold text-xs uppercase tracking-wider mb-2">
                  <Apple className="w-4 h-4" />
                  <span>10:30 AM Morning Snack</span>
                </div>
                <p className="text-sm text-[#173B5E] font-bold leading-relaxed">
                  {currentMeal.morningSnack}
                </p>
              </div>

              {/* Hot Balanced Lunch */}
              <div className="p-5 rounded-2xl bg-[#E1F5FE] border-2 border-[#0288D1]/40">
                <div className="flex items-center gap-2 text-[#0288D1] font-heading font-bold text-xs uppercase tracking-wider mb-2">
                  <Utensils className="w-4 h-4" />
                  <span>12:15 PM Hot Lunch</span>
                </div>
                <p className="text-sm text-[#173B5E] font-bold leading-relaxed">
                  {currentMeal.lunch}
                </p>
              </div>

              {/* Afternoon Refresh */}
              <div className="p-5 rounded-2xl bg-[#FFFDE7] border-2 border-[#FBC02D]/40">
                <div className="flex items-center gap-2 text-[#F57F17] font-heading font-bold text-xs uppercase tracking-wider mb-2">
                  <Heart className="w-4 h-4" />
                  <span>3:30 PM Daycare Snack</span>
                </div>
                <p className="text-sm text-[#173B5E] font-bold leading-relaxed">
                  {currentMeal.afternoonSnack}
                </p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-gray-50 border border-gray-200 flex items-center gap-3 text-xs font-semibold text-gray-700">
              <ShieldCheck className="w-5 h-5 text-[#5BC85A] shrink-0" />
              <span>{currentMeal.allergenAlert}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Nap & Sleep Hygiene Section */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-6 space-y-6">
              <span className="inline-block px-3.5 py-1 rounded-full bg-[#8B5CF6]/15 text-[#7C3AED] font-heading font-extrabold text-xs tracking-wider uppercase">
                Rest & Recovery
              </span>

              <h2 className="font-heading font-black text-3xl sm:text-4xl text-[#173B5E] tracking-tight">
                PEACEFUL REST & SLEEP HYGIENE RITUALS
              </h2>

              <p className="text-gray-700 text-base leading-relaxed font-medium">
                Growing brains do their most important neural consolidation while sleeping. We ensure nap time is calming, unhurried, and peaceful.
              </p>

              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5BC85A] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-semibold">
                    Individual ergonomic toddler cots with freshly laundered cotton sheets.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5BC85A] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-semibold">
                    Dimmed warm lighting with gentle acoustic white-noise / lullabies.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#5BC85A] shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-700 font-semibold">
                    Gentle back rubs and reassuring teacher presence for peaceful slumber.
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col items-center">
              <div className="p-8 rounded-3xl bg-[#FFF9EC] border-4 border-[#8B5CF6] shadow-xl text-center max-w-md w-full">
                <div className="mb-3">
                  <LeoMeditate size={180} animate={true} />
                </div>
                <h3 className="font-heading font-black text-xl text-[#173B5E] mb-2">
                  Sweet Dreams with Leo 🌙
                </h3>
                <p className="text-xs text-gray-600 font-medium leading-relaxed mb-6">
                  Children who don’t sleep are offered quiet storybook reading or soft puzzles in the adjoining quiet lounge so sleep is never forced.
                </p>
                <button
                  onClick={() => onNavigate('book-tour')}
                  className="w-full py-3 rounded-xl bg-[#173B5E] text-white font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#102A43] transition-colors"
                >
                  Schedule A Campus Walkthrough
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
