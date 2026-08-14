import React, { useState, useMemo } from 'react';
import { PageTab } from '../types';
import {
  Calculator,
  CheckCircle2,
  Sparkles,
  Download,
  Printer,
  ShieldCheck,
  Percent,
  Calendar,
  Truck,
  Utensils,
  Award,
  Users,
  ArrowRight,
  QrCode,
  FileCheck,
} from 'lucide-react';
import { LeoTeacher, LeoSuper, LeoArtist } from '../components/MascotIcons';

interface FeeCalculatorViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

const PROGRAM_BASE_FEES = {
  playgroup: { name: 'Playgroup (1.5 – 2.5 yrs)', monthly: 350, timing: '9:00 AM – 11:30 AM' },
  nursery: { name: 'Nursery (2.5 – 3.5 yrs)', monthly: 390, timing: '8:30 AM – 12:00 PM' },
  lkg: { name: 'Junior KG (3.5 – 4.5 yrs)', monthly: 430, timing: '8:30 AM – 12:30 PM' },
  ukg: { name: 'Senior KG (4.5 – 5.5 yrs)', monthly: 460, timing: '8:30 AM – 1:30 PM' },
  daycare: { name: 'Full-Day Daycare & Preschool (1.5 – 8 yrs)', monthly: 590, timing: '8:00 AM – 6:30 PM' },
};

const TRANSPORT_FEES = {
  none: { name: 'Self Drop-off & Pickup', monthly: 0 },
  zone1: { name: 'Zone 1: 0 – 3 km (GPS Van Pickup)', monthly: 65 },
  zone2: { name: 'Zone 2: 3 – 6 km (GPS Van Pickup)', monthly: 95 },
  zone3: { name: 'Zone 3: 6 – 10 km (GPS Express Van)', monthly: 135 },
};

const MEAL_FEES = {
  none: { name: 'Packed Lunch from Home', monthly: 0 },
  breakfast_lunch: { name: 'Hot Chef Breakfast + Lunch + Morning Fruit', monthly: 95 },
  full_day: { name: 'Full-Day Nutrition (Breakfast + Lunch + Evening Fruit & Milk)', monthly: 145 },
};

const ENRICHMENT_CLUBS = [
  { id: 'robotics', name: 'Little Explorers Robotics & Coding', monthly: 45, icon: '🤖' },
  { id: 'karate', name: 'Toddler Karate & Self-Confidence', monthly: 35, icon: '🥋' },
  { id: 'music', name: 'Little Mozart Percussion & Chimes', monthly: 40, icon: '🎵' },
  { id: 'ballet', name: 'Ballet & Creative Movement', monthly: 35, icon: '🩰' },
  { id: 'art', name: 'Little Picasso Canvas Painting Studio', monthly: 30, icon: '🎨' },
];

export const FeeCalculatorView: React.FC<FeeCalculatorViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [programId, setProgramId] = useState<keyof typeof PROGRAM_BASE_FEES>('nursery');
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'quarterly' | 'annual'>('annual');
  const [transportZone, setTransportZone] = useState<keyof typeof TRANSPORT_FEES>('zone1');
  const [mealPlan, setMealPlan] = useState<keyof typeof MEAL_FEES>('breakfast_lunch');
  const [selectedClubs, setSelectedClubs] = useState<string[]>(['art']);
  const [hasSibling, setHasSibling] = useState<boolean>(false);
  const [parentName, setParentName] = useState<string>('');
  const [childName, setChildName] = useState<string>('');

  const quoteId = useMemo(() => `AKP-QUOTE-${Math.floor(100000 + Math.random() * 900000)}`, []);

  // Calculation logic
  const calculation = useMemo(() => {
    const baseMonthly = PROGRAM_BASE_FEES[programId].monthly;
    const transportMonthly = TRANSPORT_FEES[transportZone].monthly;
    const mealMonthly = MEAL_FEES[mealPlan].monthly;

    const clubsMonthly = selectedClubs.reduce((sum, clubId) => {
      const found = ENRICHMENT_CLUBS.find((c) => c.id === clubId);
      return sum + (found ? found.monthly : 0);
    }, 0);

    const monthlyTotalBeforeDiscount = baseMonthly + transportMonthly + mealMonthly + clubsMonthly;

    let multiplier = 1;
    let planDiscountPercentage = 0;
    let periodLabel = 'Per Month';

    if (paymentPlan === 'quarterly') {
      multiplier = 3;
      planDiscountPercentage = 0.05; // 5% discount
      periodLabel = 'Per Quarter (3 Months)';
    } else if (paymentPlan === 'annual') {
      multiplier = 10; // 10-month academic year
      planDiscountPercentage = 0.10; // 10% discount
      periodLabel = 'Per Academic Year (10 Months)';
    }

    const subtotal = monthlyTotalBeforeDiscount * multiplier;

    // Sibling discount on base tuition
    const siblingDiscount = hasSibling ? baseMonthly * multiplier * 0.15 : 0;
    const planDiscount = subtotal * planDiscountPercentage;
    const totalDiscount = planDiscount + siblingDiscount;

    const oneTimeRegistrationFee = 100;
    const oneTimeActivityMaterialKit = 120;

    const finalPayable = Math.round(subtotal - totalDiscount + oneTimeRegistrationFee + oneTimeActivityMaterialKit);

    return {
      baseMonthly,
      transportMonthly,
      mealMonthly,
      clubsMonthly,
      monthlyTotalBeforeDiscount,
      multiplier,
      subtotal,
      planDiscount,
      siblingDiscount,
      totalDiscount,
      oneTimeRegistrationFee,
      oneTimeActivityMaterialKit,
      finalPayable,
      periodLabel,
      effectiveMonthly: Math.round(finalPayable / multiplier),
    };
  }, [programId, paymentPlan, transportZone, mealPlan, selectedClubs, hasSibling]);

  const handleToggleClub = (clubId: string) => {
    setSelectedClubs((prev) =>
      prev.includes(clubId) ? prev.filter((id) => id !== clubId) : [...prev, clubId]
    );
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="w-full bg-[#FFF9EC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-extrabold uppercase tracking-wide shadow-xs">
            <Calculator className="w-3.5 h-3.5" /> 100% Transparent Fee Calculator
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B5E]">
            Estimate Your Child’s <span className="text-[#F4511E]">Preschool Tuition</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Customize programs, payment plans, organic meal programs, GPS van routes, and weekend enrichment clubs. Generate an itemized official PDF quotation in seconds!
          </p>
        </div>

        {/* 2-Column Interactive Form & Quotation Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Controls */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-md space-y-8">
            {/* 1. Select Program */}
            <div className="space-y-3">
              <label className="font-heading text-base font-extrabold text-[#173B5E] flex items-center justify-between">
                <span>1. Select Learning Program</span>
                <span className="text-xs text-[#F4511E] font-bold">2026–27 Academic Year</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {Object.entries(PROGRAM_BASE_FEES).map(([key, prog]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setProgramId(key as any)}
                    className={`p-3.5 rounded-2xl text-left border-2 transition-all cursor-pointer ${
                      programId === key
                        ? 'border-[#F4511E] bg-[#FFF3E0] ring-2 ring-[#F4511E]/20 shadow-sm'
                        : 'border-gray-200 hover:border-orange-200 bg-white'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-heading text-sm font-bold text-[#173B5E]">{prog.name}</span>
                      <span className="text-xs font-black text-[#F4511E]">${prog.monthly}/mo</span>
                    </div>
                    <p className="text-[11px] text-gray-500 mt-1 font-medium">🕒 {prog.timing}</p>
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Select Payment Plan */}
            <div className="space-y-3">
              <label className="font-heading text-base font-extrabold text-[#173B5E] flex items-center justify-between">
                <span>2. Payment Schedule</span>
                <span className="text-xs text-green-700 font-bold">Save up to 10% on Annual Fees</span>
              </label>

              <div className="grid grid-cols-3 gap-2.5">
                {[
                  { id: 'monthly', name: 'Monthly', badge: 'Standard', discount: '0%' },
                  { id: 'quarterly', name: 'Quarterly', badge: 'Save 5%', discount: '5% OFF' },
                  { id: 'annual', name: 'Annual (10 Mo)', badge: 'Best Value', discount: '10% OFF' },
                ].map((plan) => (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setPaymentPlan(plan.id as any)}
                    className={`p-3 rounded-2xl text-center border-2 transition-all cursor-pointer ${
                      paymentPlan === plan.id
                        ? 'border-[#173B5E] bg-[#173B5E] text-white shadow-sm'
                        : 'border-gray-200 hover:border-gray-300 bg-white text-[#173B5E]'
                    }`}
                  >
                    <div className="font-bold text-xs sm:text-sm">{plan.name}</div>
                    <span
                      className={`inline-block mt-1 px-2 py-0.5 rounded-full text-[10px] font-black ${
                        paymentPlan === plan.id
                          ? 'bg-[#FFD21F] text-[#173B5E]'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {plan.badge}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* 3. Transportation Option */}
            <div className="space-y-3">
              <label className="font-heading text-base font-extrabold text-[#173B5E] flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#F4511E]" />
                <span>3. Air-Conditioned GPS School Van</span>
              </label>

              <div className="space-y-2">
                {Object.entries(TRANSPORT_FEES).map(([key, trans]) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      transportZone === key
                        ? 'border-[#F4511E] bg-[#FFF3E0]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="transport"
                        checked={transportZone === key}
                        onChange={() => setTransportZone(key as any)}
                        className="text-[#F4511E] focus:ring-[#F4511E]"
                      />
                      <span className="text-xs sm:text-sm font-bold text-[#173B5E]">{trans.name}</span>
                    </div>
                    <span className="text-xs font-black text-[#F4511E]">
                      {trans.monthly === 0 ? 'Free' : `+$${trans.monthly}/mo`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 4. Organic Meal Program */}
            <div className="space-y-3">
              <label className="font-heading text-base font-extrabold text-[#173B5E] flex items-center gap-2">
                <Utensils className="w-4 h-4 text-[#F4511E]" />
                <span>4. Chef-Curated Organic Meals</span>
              </label>

              <div className="space-y-2">
                {Object.entries(MEAL_FEES).map(([key, meal]) => (
                  <label
                    key={key}
                    className={`flex items-center justify-between p-3 rounded-xl border-2 transition-all cursor-pointer ${
                      mealPlan === key
                        ? 'border-[#F4511E] bg-[#FFF3E0]'
                        : 'border-gray-200 hover:border-gray-300 bg-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <input
                        type="radio"
                        name="meal"
                        checked={mealPlan === key}
                        onChange={() => setMealPlan(key as any)}
                        className="text-[#F4511E] focus:ring-[#F4511E]"
                      />
                      <span className="text-xs sm:text-sm font-bold text-[#173B5E]">{meal.name}</span>
                    </div>
                    <span className="text-xs font-black text-[#F4511E]">
                      {meal.monthly === 0 ? 'Included' : `+$${meal.monthly}/mo`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* 5. Enrichment Hobby Studios */}
            <div className="space-y-3">
              <label className="font-heading text-base font-extrabold text-[#173B5E] flex items-center justify-between">
                <span>5. Optional Weekend Enrichment Studios</span>
                <span className="text-xs text-gray-500 font-bold">Pick any</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {ENRICHMENT_CLUBS.map((club) => {
                  const isChecked = selectedClubs.includes(club.id);
                  return (
                    <button
                      key={club.id}
                      type="button"
                      onClick={() => handleToggleClub(club.id)}
                      className={`p-3 rounded-xl text-left border-2 flex items-center justify-between transition-all cursor-pointer ${
                        isChecked
                          ? 'border-[#29B6F6] bg-blue-50/60'
                          : 'border-gray-200 hover:border-gray-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{club.icon}</span>
                        <span className="text-xs font-bold text-[#173B5E]">{club.name}</span>
                      </div>
                      <span className="text-xs font-black text-[#29B6F6]">
                        +${club.monthly}/mo
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 6. Sibling Discount Switch */}
            <div className="bg-[#FFF9EC] p-4 rounded-2xl border-2 border-[#FFD21F] flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#FFD21F] text-[#173B5E] flex items-center justify-center text-xl font-bold">
                  👨‍👩‍👧
                </div>
                <div>
                  <div className="font-heading font-bold text-sm text-[#173B5E]">
                    Enrolling a Sibling?
                  </div>
                  <p className="text-xs text-gray-600">
                    Get an extra <strong className="text-[#F4511E]">15% discount</strong> on the second child’s tuition!
                  </p>
                </div>
              </div>

              <input
                type="checkbox"
                checked={hasSibling}
                onChange={(e) => setHasSibling(e.target.checked)}
                className="w-5 h-5 accent-[#F4511E] cursor-pointer"
              />
            </div>
          </div>

          {/* Right Column: Live Official Quotation Card */}
          <div className="lg:col-span-5 sticky top-24 space-y-4">
            <div
              id="printable-quote"
              className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#FFD21F] shadow-xl space-y-6 relative overflow-hidden"
            >
              {/* Official Seal Watermark */}
              <div className="absolute -top-6 -right-6 text-9xl opacity-5 select-none pointer-events-none">
                🦁
              </div>

              {/* Quotation Header */}
              <div className="border-b-2 border-gray-100 pb-4 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">🦁</span>
                    <span className="font-heading font-extrabold text-lg text-[#173B5E]">
                      A KID'S PRE SCHOOL
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 font-semibold">Official Fee Quotation • Academic 2026–27</p>
                </div>

                <div className="text-right">
                  <div className="text-[10px] font-black text-gray-400 uppercase">Quote Ref</div>
                  <div className="text-xs font-mono font-bold text-[#F4511E]">{quoteId}</div>
                </div>
              </div>

              {/* Selected Program Overview */}
              <div className="bg-[#FFF9EC] p-4 rounded-2xl border border-orange-100 space-y-2 text-xs">
                <div className="flex justify-between font-bold text-[#173B5E]">
                  <span>Program:</span>
                  <span>{PROGRAM_BASE_FEES[programId].name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Billing Schedule:</span>
                  <span className="capitalize font-bold text-[#F4511E]">{paymentPlan} Plan</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Transport Route:</span>
                  <span>{TRANSPORT_FEES[transportZone].name}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Organic Meal Plan:</span>
                  <span>{MEAL_FEES[mealPlan].name}</span>
                </div>
                {selectedClubs.length > 0 && (
                  <div className="flex justify-between text-gray-600">
                    <span>Enrichment Clubs:</span>
                    <span>{selectedClubs.length} Clubs Selected</span>
                  </div>
                )}
              </div>

              {/* Itemized Cost Breakdown */}
              <div className="space-y-2 text-xs text-gray-700">
                <div className="flex justify-between py-1 border-b border-gray-100">
                  <span>Base Tuition ({calculation.periodLabel}):</span>
                  <span className="font-bold text-[#173B5E]">
                    ${calculation.baseMonthly * calculation.multiplier}
                  </span>
                </div>

                {calculation.transportMonthly > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>GPS Van Transportation:</span>
                    <span className="font-bold text-[#173B5E]">
                      ${calculation.transportMonthly * calculation.multiplier}
                    </span>
                  </div>
                )}

                {calculation.mealMonthly > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Organic Nutrition Meal Plan:</span>
                    <span className="font-bold text-[#173B5E]">
                      ${calculation.mealMonthly * calculation.multiplier}
                    </span>
                  </div>
                )}

                {calculation.clubsMonthly > 0 && (
                  <div className="flex justify-between py-1 border-b border-gray-100">
                    <span>Enrichment Hobby Studios:</span>
                    <span className="font-bold text-[#173B5E]">
                      ${calculation.clubsMonthly * calculation.multiplier}
                    </span>
                  </div>
                )}

                <div className="flex justify-between py-1 border-b border-gray-100 text-gray-500">
                  <span>One-time Annual Activity Kit & Safety Bag:</span>
                  <span className="font-bold text-[#173B5E]">${calculation.oneTimeActivityMaterialKit}</span>
                </div>

                <div className="flex justify-between py-1 border-b border-gray-100 text-gray-500">
                  <span>One-time Registration & Processing:</span>
                  <span className="font-bold text-[#173B5E]">${calculation.oneTimeRegistrationFee}</span>
                </div>

                {calculation.totalDiscount > 0 && (
                  <div className="flex justify-between py-1 text-green-700 font-extrabold bg-green-50 px-2 rounded-lg">
                    <span>Applied Discounts (Plan + Sibling):</span>
                    <span>-${Math.round(calculation.totalDiscount)}</span>
                  </div>
                )}
              </div>

              {/* Total Payable Block */}
              <div className="bg-gradient-to-tr from-[#173B5E] to-[#204a74] text-white p-5 rounded-2xl space-y-1 shadow-md">
                <div className="text-xs text-blue-200 font-bold uppercase tracking-wider">
                  Total Payable ({calculation.periodLabel})
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#FFD21F]">
                  ${calculation.finalPayable.toLocaleString()}
                </div>
                <div className="text-[11px] text-gray-300">
                  Effective monthly average: ~${calculation.effectiveMonthly}/month
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <button
                  onClick={onOpenAdmissionModal}
                  className="w-full py-3.5 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg transition-all cursor-pointer hover:scale-[1.02]"
                >
                  <Sparkles className="w-4 h-4 text-[#FFD21F]" /> Apply for Admission with this Quote
                </button>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={handlePrint}
                    className="py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-[#173B5E] text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print / PDF Quote
                  </button>

                  <button
                    onClick={() => onNavigate('book-tour')}
                    className="py-2.5 rounded-xl bg-orange-50 hover:bg-orange-100 text-[#F4511E] border border-orange-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Tour First
                  </button>
                </div>
              </div>

              {/* Guaranteed Trust Badges */}
              <div className="pt-2 border-t border-gray-100 flex items-center justify-center gap-4 text-[10px] text-gray-500 font-bold">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-[#5BC85A]" /> No Hidden Fees
                </span>
                <span className="flex items-center gap-1">
                  <FileCheck className="w-3 h-3 text-[#29B6F6]" /> Tax-Deductible Receipts
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
