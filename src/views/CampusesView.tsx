import React, { useState } from 'react';
import { PageTab, CampusLocation } from '../types';
import { CAMPUSES_DATA } from '../data/preschoolExtendedData';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  Search,
  Building,
  Compass,
} from 'lucide-react';

interface CampusesViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const CampusesView: React.FC<CampusesViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [selectedCampusId, setSelectedCampusId] = useState<string>(CAMPUSES_DATA[0].id);
  const [searchZip, setSearchZip] = useState<string>('');
  const [distanceResult, setDistanceResult] = useState<string | null>(null);

  const currentCampus: CampusLocation =
    CAMPUSES_DATA.find((c) => c.id === selectedCampusId) || CAMPUSES_DATA[0];

  const handleZipCheck = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchZip.trim()) return;
    setDistanceResult(`Estimated distance to ${currentCampus.name}: ~2.4 miles (6 mins via School Van Route).`);
  };

  return (
    <div className="w-full bg-[#FFF9EC] py-8 sm:py-12 text-[#173B5E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-extrabold uppercase tracking-wide shadow-xs">
            <Building className="w-3.5 h-3.5" /> 3 Purpose-Built Preschool Campuses
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#173B5E]">
            Find the Nearest <span className="text-[#F4511E]">Campus to Your Home</span>
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Every branch features state-of-the-art sensory hubs, 100% CCTV surveillance, certified Montessori educators, and door-to-door GPS van routes.
          </p>
        </div>

        {/* Zip Code Distance Check Bar */}
        <div className="max-w-xl mx-auto bg-white p-4 rounded-3xl border-2 border-orange-100 shadow-md">
          <form onSubmit={handleZipCheck} className="flex items-center gap-2">
            <div className="relative flex-1">
              <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Enter your Zipcode or Neighborhood..."
                value={searchZip}
                onChange={(e) => setSearchZip(e.target.value)}
                className="w-full pl-10 pr-3 py-2.5 rounded-2xl bg-[#FFF9EC] border border-gray-200 text-xs sm:text-sm font-semibold text-[#173B5E] focus:outline-none focus:border-[#F4511E]"
              />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-bold text-xs sm:text-sm shadow-md transition-colors cursor-pointer"
            >
              Check Proximity
            </button>
          </form>

          {distanceResult && (
            <div className="mt-3 p-2.5 rounded-xl bg-green-50 text-green-800 text-xs font-bold flex items-center gap-2 border border-green-200 animate-fade-in">
              <CheckCircle2 className="w-4 h-4 text-green-600 shrink-0" />
              <span>{distanceResult}</span>
            </div>
          )}
        </div>

        {/* Campus Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {CAMPUSES_DATA.map((campus) => {
            const isSelected = campus.id === selectedCampusId;
            return (
              <div
                key={campus.id}
                onClick={() => setSelectedCampusId(campus.id)}
                className={`bg-white rounded-3xl overflow-hidden border-4 transition-all duration-300 shadow-lg cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-[#FFD21F] ring-4 ring-orange-200 scale-[1.01]'
                    : 'border-orange-100 hover:border-orange-300'
                }`}
              >
                {/* Image Banner */}
                <div>
                  <div className="relative h-52">
                    <img
                      src={campus.coverImage}
                      alt={campus.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-black shadow-md">
                      {campus.badge || 'Preschool Campus'}
                    </div>

                    <div className="absolute bottom-4 left-4 right-4 text-white">
                      <h2 className="font-heading text-xl font-extrabold text-white">
                        {campus.name}
                      </h2>
                      <p className="text-xs text-gray-200 flex items-center gap-1 mt-0.5">
                        <MapPin className="w-3.5 h-3.5 text-[#FFD21F]" /> {campus.address}
                      </p>
                    </div>
                  </div>

                  {/* Body Details */}
                  <div className="p-6 space-y-4">
                    <div className="bg-[#FFF9EC] p-3 rounded-xl border border-orange-100">
                      <div className="text-[10px] text-gray-400 font-bold uppercase">Campus Director</div>
                      <div className="font-bold text-[#173B5E] text-xs">{campus.principal}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-black text-[#173B5E] uppercase tracking-wider">
                        Campus Special Features:
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {campus.features.slice(0, 4).map((feat, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-full bg-orange-50 text-[#F4511E] text-[11px] font-bold border border-orange-200"
                          >
                            ✓ {feat}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2 border-t border-gray-100 flex flex-col gap-1.5 text-xs text-gray-600">
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[#F4511E]" />
                        <span>{campus.phone}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-[#29B6F6]" />
                        <span>{campus.timings}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="p-6 pt-0 grid grid-cols-2 gap-2.5">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('book-tour');
                    }}
                    className="py-2.5 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#FFD21F]" /> Book Tour
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onNavigate('virtual-tour');
                    }}
                    className="py-2.5 rounded-xl bg-[#173B5E] hover:bg-[#204a74] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-colors cursor-pointer"
                  >
                    <Compass className="w-3.5 h-3.5 text-[#FFD21F]" /> 360° Tour
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Campus Comparison Matrix Table */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-[#FFD21F] shadow-xl space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <div>
              <h3 className="font-heading text-xl sm:text-2xl font-extrabold text-[#173B5E]">
                Comprehensive Branch Feature Comparison
              </h3>
              <p className="text-xs sm:text-sm text-gray-600">
                Compare infrastructure, safety certifications, and specialized labs across all locations.
              </p>
            </div>
            <span className="text-2xl hidden sm:inline">🦁</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="bg-[#FFF9EC] text-[#173B5E] font-heading font-extrabold border-b-2 border-orange-200">
                  <th className="p-3.5">Campus Name</th>
                  <th className="p-3.5">Area & Capacity</th>
                  <th className="p-3.5">Outdoor Play Area</th>
                  <th className="p-3.5">CCTV Live Streaming</th>
                  <th className="p-3.5">GPS Bus Coverage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-gray-700">
                {CAMPUSES_DATA.map((b) => (
                  <tr key={b.id} className="hover:bg-orange-50/40 transition-colors">
                    <td className="p-3.5 font-bold text-[#173B5E] flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#F4511E]"></span>
                      {b.name}
                    </td>
                    <td className="p-3.5">{b.areaSqFt}</td>
                    <td className="p-3.5 font-semibold text-[#5BC85A]">
                      {b.features[0]}
                    </td>
                    <td className="p-3.5 font-bold text-green-700">✓ 1080p HD App Feed</td>
                    <td className="p-3.5 font-bold text-[#173B5E]">✓ Doorstep Van Service</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-center">
            <button
              onClick={onOpenAdmissionModal}
              className="px-8 py-3.5 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-extrabold text-sm shadow-xl transition-all cursor-pointer hover:scale-105 inline-flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#FFD21F]" /> Apply to Any Campus for 2026-27
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
