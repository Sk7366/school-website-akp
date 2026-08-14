import React, { useState } from 'react';
import {
  PageTab,
  ChildProfile,
  DailyActivityItem,
  MilestoneProgress,
  MilestoneBadge,
  TeacherMessage,
  LiveBusTracking,
} from '../types';
import {
  DEMO_CHILD_PROFILES,
  DEMO_DAILY_ACTIVITIES,
  DEMO_MILESTONES,
  DEMO_BADGES,
  DEMO_MESSAGES,
  DEMO_VAN_TRACKING,
} from '../data/preschoolExtendedData';
import {
  User,
  Heart,
  Clock,
  Utensils,
  Moon,
  Sparkles,
  Calendar,
  ShieldCheck,
  Send,
  Camera,
  MapPin,
  Phone,
  AlertTriangle,
  Award,
  CheckCircle2,
  ChevronRight,
  Download,
  Video,
  FileText,
  Smile,
  Truck,
  MessageSquare,
  Baby,
} from 'lucide-react';
import { LeoTeacher, LeoSuper, LeoMeditate } from '../components/MascotIcons';

interface ParentPortalViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
}

export const ParentPortalView: React.FC<ParentPortalViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
}) => {
  const [selectedChildId, setSelectedChildId] = useState<string>('child-emma');
  const [activeSubTab, setActiveSubTab] = useState<
    'feed' | 'milestones' | 'van' | 'messages' | 'cctv'
  >('feed');

  // Messages state for interactive chat
  const [messages, setMessages] = useState<TeacherMessage[]>(DEMO_MESSAGES);
  const [newMessageText, setNewMessageText] = useState<string>('');

  // Absence modal state
  const [isAbsenceModalOpen, setIsAbsenceModalOpen] = useState<boolean>(false);
  const [absenceReason, setAbsenceReason] = useState<string>('Sick / Mild Fever');
  const [absenceDate, setAbsenceDate] = useState<string>('2026-08-15');
  const [absenceSubmitted, setAbsenceSubmitted] = useState<boolean>(false);

  // Selected child object
  const currentChild =
    DEMO_CHILD_PROFILES.find((c) => c.id === selectedChildId) || DEMO_CHILD_PROFILES[0];
  const dailyActivities = DEMO_DAILY_ACTIVITIES[selectedChildId] || DEMO_DAILY_ACTIVITIES['child-emma'];
  const milestones = DEMO_MILESTONES[selectedChildId] || DEMO_MILESTONES['child-emma'];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessageText.trim()) return;

    const newMsg: TeacherMessage = {
      id: `msg-${Date.now()}`,
      sender: 'parent',
      senderName: currentChild.emergencyContact.split(':')[0] || 'Parent',
      timestamp: 'Just now',
      text: newMessageText,
    };

    setMessages((prev) => [...prev, newMsg]);
    setNewMessageText('');

    // Simulated Teacher Reply
    setTimeout(() => {
      const teacherReply: TeacherMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'teacher',
        senderName: currentChild.teacherName,
        timestamp: 'Just now',
        text: `Thank you for the update! We will take wonderful care of ${currentChild.name.split(' ')[0]} today. 🦁🌟`,
      };
      setMessages((prev) => [...prev, teacherReply]);
    }, 1200);
  };

  const handleDownloadReport = () => {
    const reportContent = `
==============================================
   A KID'S PRE SCHOOL - DAILY DIARY REPORT
==============================================
Child: ${currentChild.name}
Program: ${currentChild.program}
Campus: ${currentChild.campus}
Teacher: ${currentChild.teacherName}
Date: ${new Date().toLocaleDateString()}
----------------------------------------------
DAILY LOG HIGHLIGHTS:
${dailyActivities.map((a) => `[${a.time}] ${a.category}: ${a.title} - ${a.description}`).join('\n')}

Allergies: ${currentChild.allergies?.join(', ') || 'None'}
Status: Verified by Lead Educator
==============================================
`.trim();

    const blob = new Blob([reportContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${currentChild.name.replace(/\s+/g, '_')}_Daily_Report.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full bg-[#FFF9EC] py-8 sm:py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Top Header Banner */}
        <div className="bg-gradient-to-r from-[#173B5E] to-[#1E4D7B] rounded-3xl p-6 sm:p-8 text-white shadow-xl relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="relative z-10 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFD21F] text-[#173B5E] text-xs font-extrabold uppercase tracking-wide mb-3">
              <Sparkles className="w-3.5 h-3.5" /> Enrolled Parent Portal
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Welcome back to <span className="text-[#FFD21F]">Leo’s Family Hub</span>
            </h1>
            <p className="text-sm sm:text-base text-gray-200 mt-2">
              Real-time daily activity feeds, developmental milestone achievements, live GPS van tracking, and direct teacher care communications.
            </p>
          </div>

          {/* Child Switcher Selector */}
          <div className="relative z-10 w-full md:w-auto bg-white/10 backdrop-blur-md p-3.5 rounded-2xl border border-white/20 flex flex-col sm:flex-row items-center gap-3">
            <span className="text-xs font-bold text-[#FFD21F] whitespace-nowrap">
              Switch Enrolled Child:
            </span>
            <div className="flex gap-2">
              {DEMO_CHILD_PROFILES.map((child) => (
                <button
                  key={child.id}
                  onClick={() => setSelectedChildId(child.id)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedChildId === child.id
                      ? 'bg-[#FFD21F] text-[#173B5E] shadow-md scale-105'
                      : 'bg-white/20 text-white hover:bg-white/30'
                  }`}
                >
                  <img
                    src={child.photo}
                    alt={child.name}
                    className="w-5 h-5 rounded-full object-cover border border-white"
                  />
                  <span>{child.name.split(' ')[0]}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Child Profile Overview Card */}
        <div className="bg-white rounded-3xl p-6 shadow-md border-2 border-orange-100 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="relative">
              <img
                src={currentChild.photo}
                alt={currentChild.name}
                className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover border-4 border-[#FFD21F] shadow-md"
              />
              <span className="absolute -bottom-2 -right-2 px-2 py-0.5 rounded-full bg-[#5BC85A] text-white text-[10px] font-extrabold shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse"></span> IN CLASS
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h2 className="font-heading text-2xl font-bold text-[#173B5E]">
                  {currentChild.name}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-[#FFF3E0] text-[#F4511E] text-xs font-extrabold border border-orange-200">
                  {currentChild.program}
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 font-medium">
                📍 {currentChild.campus} • 🏫 {currentChild.section}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-gray-700 font-medium">
                <span className="flex items-center gap-1 bg-gray-100 px-2 py-0.5 rounded-md">
                  <User className="w-3.5 h-3.5 text-[#F4511E]" /> Lead: {currentChild.teacherName}
                </span>
                <span className="flex items-center gap-1 bg-red-50 text-red-700 px-2 py-0.5 rounded-md border border-red-200">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Allergies: {currentChild.allergies?.join(', ') || 'None'}
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 w-full lg:w-auto">
            <button
              onClick={() => setIsAbsenceModalOpen(true)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-orange-50 text-[#F4511E] border border-orange-200 hover:bg-orange-100 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Calendar className="w-4 h-4" /> Report Absence / Leave
            </button>

            <button
              onClick={handleDownloadReport}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl bg-[#173B5E] text-white hover:bg-[#204a74] text-xs font-bold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Download className="w-4 h-4 text-[#FFD21F]" /> Download Daily Slip
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-gray-200">
          {[
            { id: 'feed', label: 'Live Daily Feed', icon: Smile, badge: '6 updates' },
            { id: 'milestones', label: 'Milestones & Badges', icon: Award, badge: '5 Earned' },
            { id: 'van', label: 'Live GPS Van Tracker', icon: Truck, badge: 'In Transit' },
            { id: 'messages', label: 'Teacher Chat & Notes', icon: MessageSquare, badge: 'Active' },
            { id: 'cctv', label: 'Parent CCTV Cam', icon: Video, badge: 'HD Live' },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-4 py-3 rounded-2xl text-xs sm:text-sm font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#F4511E] text-white shadow-md'
                    : 'bg-white text-[#173B5E] hover:bg-orange-50 border border-orange-100'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#F4511E]'}`} />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                      isActive ? 'bg-white text-[#F4511E]' : 'bg-[#FFD21F] text-[#173B5E]'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* TAB 1: LIVE DAILY FEED */}
        {activeSubTab === 'feed' && (
          <div className="space-y-6 animate-fade-in">
            {/* Quick Status Cards Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-orange-100 text-[#F4511E] flex items-center justify-center text-xl">
                  🥣
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase">Meals Consumed</div>
                  <div className="text-base font-extrabold text-[#173B5E]">100% of Lunch</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center text-xl">
                  😴
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase">Nap Duration</div>
                  <div className="text-base font-extrabold text-[#173B5E]">1h 45m (Peaceful)</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-xl">
                  🌟
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase">Mood Indicator</div>
                  <div className="text-base font-extrabold text-[#173B5E]">Joyful & Active</div>
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl border border-orange-100 shadow-sm flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-green-100 text-green-700 flex items-center justify-center text-xl">
                  💧
                </div>
                <div>
                  <div className="text-[11px] font-bold text-gray-500 uppercase">Water Hydration</div>
                  <div className="text-base font-extrabold text-[#173B5E]">4 Glasses Logged</div>
                </div>
              </div>
            </div>

            {/* Timeline Stream */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <h3 className="font-heading text-xl font-extrabold text-[#173B5E] flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#F4511E]" /> Today’s Chronological Activity Log
                </h3>
                <span className="text-xs text-gray-500 font-bold">
                  {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="relative pl-6 space-y-8 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-orange-200">
                {dailyActivities.map((act) => (
                  <div key={act.id} className="relative group">
                    <div className="absolute -left-6 top-1.5 w-6 h-6 rounded-full bg-[#F4511E] text-white flex items-center justify-center text-xs font-bold border-2 border-white shadow-xs">
                      {act.moodEmoji}
                    </div>

                    <div className="bg-[#FFF9EC] p-4 sm:p-5 rounded-2xl border border-orange-100 shadow-xs hover:border-orange-300 transition-all">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-[#F4511E] bg-white px-2.5 py-0.5 rounded-lg border border-orange-200">
                            {act.time}
                          </span>
                          <h4 className="font-heading font-bold text-base text-[#173B5E]">
                            {act.title}
                          </h4>
                        </div>
                        <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-white text-gray-700 border border-gray-200">
                          {act.category}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed mb-3">
                        {act.description}
                      </p>

                      {act.photoUrl && (
                        <div className="relative rounded-xl overflow-hidden border-2 border-white shadow-sm max-w-sm mb-3 group">
                          <img
                            src={act.photoUrl}
                            alt={act.title}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/60 text-white text-[10px] font-bold flex items-center gap-1">
                            <Camera className="w-3 h-3" /> Teacher Photo Upload
                          </div>
                        </div>
                      )}

                      {act.teacherNote && (
                        <div className="bg-white/80 p-2.5 rounded-xl border border-orange-200/60 text-xs text-[#173B5E] flex items-start gap-2">
                          <span className="text-base">👩‍🏫</span>
                          <div>
                            <strong className="text-[#F4511E] font-bold">Teacher Rachel's Note: </strong>
                            <span>{act.teacherNote}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: MILESTONES & DEVELOPMENTAL RADAR */}
        {activeSubTab === 'milestones' && (
          <div className="space-y-8 animate-fade-in">
            {/* Developmental Pillars Progress Bars */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-sm space-y-6">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-[#173B5E] flex items-center gap-2">
                  <Award className="w-5 h-5 text-[#F4511E]" /> Early Childhood Developmental Milestones
                </h3>
                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Assessed weekly by certified Montessori & EYFS educators against standard developmental milestones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {milestones.map((ms, idx) => (
                  <div key={idx} className="bg-[#FFF9EC] p-5 rounded-2xl border border-orange-100 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-heading font-bold text-base text-[#173B5E]">
                        {ms.category}
                      </h4>
                      <span className="px-2.5 py-1 rounded-full bg-[#173B5E] text-[#FFD21F] text-xs font-black">
                        {ms.score}% Mastery
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#FFD21F] to-[#F4511E] rounded-full transition-all duration-1000"
                        style={{ width: `${ms.score}%` }}
                      ></div>
                    </div>

                    <div className="space-y-1.5 text-xs text-gray-700 pt-1">
                      <div>
                        <strong className="text-[#5BC85A] font-bold">✓ Recent Win: </strong>
                        <span>{ms.recentAchievement}</span>
                      </div>
                      <div>
                        <strong className="text-[#F4511E] font-bold">🎯 Next Target: </strong>
                        <span>{ms.nextMilestone}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Earned Badges Showcase */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-sm space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-xl font-extrabold text-[#173B5E] flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#FFD21F]" /> Earned Leo Badges of Honor
                </h3>
                <span className="text-xs text-gray-500 font-bold">
                  {DEMO_BADGES.length} Badges Unlocked
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {DEMO_BADGES.map((badge) => (
                  <div
                    key={badge.id}
                    className="p-4 rounded-2xl border-2 border-orange-100 bg-[#FFF9EC] flex items-start gap-3.5 hover:border-orange-300 transition-all"
                  >
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center text-white text-xl shadow-md shrink-0 font-extrabold"
                      style={{ backgroundColor: badge.color }}
                    >
                      🦁
                    </div>

                    <div className="space-y-1">
                      <h4 className="font-heading font-bold text-sm text-[#173B5E]">
                        {badge.title}
                      </h4>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {badge.description}
                      </p>
                      <div className="text-[10px] text-gray-400 font-bold">
                        Earned: {badge.earnedDate}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: LIVE GPS VAN TRACKER */}
        {activeSubTab === 'van' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-sm space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-[#173B5E] flex items-center gap-2">
                  <Truck className="w-5 h-5 text-[#F4511E]" /> Live GPS School Van Tracking
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Real-time telemetry, driver credentials, and geofence drop-off ETA.
                </p>
              </div>

              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-green-50 text-green-700 border border-green-200 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-ping"></span>
                <span>GPS Live Signal Active</span>
              </div>
            </div>

            {/* Van Status Banner */}
            <div className="bg-gradient-to-r from-[#173B5E] to-[#2563EB] rounded-2xl p-6 text-white grid grid-cols-1 sm:grid-cols-3 gap-6 shadow-md">
              <div className="space-y-1">
                <div className="text-xs text-blue-200 font-bold uppercase">Estimated Arrival</div>
                <div className="text-3xl font-extrabold text-[#FFD21F]">
                  {DEMO_VAN_TRACKING.etaMinutes} Minutes
                </div>
                <div className="text-xs text-gray-200">Current Speed: {DEMO_VAN_TRACKING.speedKmH} km/h</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-blue-200 font-bold uppercase">Next Scheduled Stop</div>
                <div className="text-base font-bold text-white leading-tight">
                  {DEMO_VAN_TRACKING.nextStop}
                </div>
                <div className="text-xs text-blue-100">Vehicle: {DEMO_VAN_TRACKING.vanNumber}</div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-blue-200 font-bold uppercase">Verified Driver</div>
                <div className="text-base font-bold text-white flex items-center gap-2">
                  <span>{DEMO_VAN_TRACKING.driverName}</span>
                </div>
                <a
                  href={`tel:${DEMO_VAN_TRACKING.driverPhone}`}
                  className="inline-flex items-center gap-1 text-xs text-[#FFD21F] font-bold hover:underline"
                >
                  <Phone className="w-3 h-3" /> Call Driver: {DEMO_VAN_TRACKING.driverPhone}
                </a>
              </div>
            </div>

            {/* Interactive Route Checklist */}
            <div className="bg-[#FFF9EC] p-6 rounded-2xl border border-orange-200 space-y-4">
              <h4 className="font-heading font-bold text-base text-[#173B5E]">
                Route Stops & Boarding Status
              </h4>

              <div className="space-y-3">
                {DEMO_VAN_TRACKING.routePoints.map((pt, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-between p-3 rounded-xl border ${
                      pt.completed
                        ? 'bg-green-50/80 border-green-200 text-green-800'
                        : i === 3
                        ? 'bg-orange-100 border-orange-300 text-[#173B5E] ring-2 ring-[#F4511E]'
                        : 'bg-white border-gray-200 text-gray-500'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                          pt.completed
                            ? 'bg-green-600 text-white'
                            : i === 3
                            ? 'bg-[#F4511E] text-white animate-bounce'
                            : 'bg-gray-300 text-white'
                        }`}
                      >
                        {pt.completed ? '✓' : i + 1}
                      </div>
                      <span className="text-xs sm:text-sm font-bold">{pt.name}</span>
                    </div>

                    <span className="text-xs font-semibold">{pt.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: TEACHER CHAT & NOTES */}
        {activeSubTab === 'messages' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-sm space-y-6 animate-fade-in">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div className="flex items-center gap-3">
                <img
                  src={currentChild.teacherAvatar}
                  alt={currentChild.teacherName}
                  className="w-12 h-12 rounded-full object-cover border-2 border-[#F4511E]"
                />
                <div>
                  <h3 className="font-heading font-extrabold text-base text-[#173B5E]">
                    {currentChild.teacherName}
                  </h3>
                  <p className="text-xs text-[#5BC85A] font-bold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-[#5BC85A] animate-pulse"></span> Available for parent care queries
                  </p>
                </div>
              </div>

              <div className="text-xs text-gray-500 font-bold hidden sm:block">
                Preschool Care Channel
              </div>
            </div>

            {/* Chat Thread */}
            <div className="bg-[#FFF9EC] p-4 rounded-2xl border border-orange-100 h-80 overflow-y-auto space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === 'parent' ? 'items-end' : 'items-start'}`}
                >
                  <div className="text-[10px] text-gray-400 font-semibold mb-1 px-1">
                    {msg.senderName} • {msg.timestamp}
                  </div>
                  <div
                    className={`max-w-[85%] p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                      msg.sender === 'parent'
                        ? 'bg-[#F4511E] text-white rounded-tr-none shadow-xs font-medium'
                        : 'bg-white text-[#173B5E] rounded-tl-none border border-orange-100 shadow-xs'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSendMessage} className="flex gap-2">
              <input
                type="text"
                value={newMessageText}
                onChange={(e) => setNewMessageText(e.target.value)}
                placeholder="Send a note to Teacher Rachel (e.g., medicine instructions, pickup notes)..."
                className="flex-1 px-4 py-3 rounded-2xl border border-gray-300 focus:border-[#F4511E] outline-none text-xs sm:text-sm text-[#173B5E]"
              />
              <button
                type="submit"
                className="px-5 py-3 rounded-2xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md cursor-pointer transition-colors"
              >
                <Send className="w-4 h-4" /> Send
              </button>
            </form>
          </div>
        )}

        {/* TAB 5: PARENT LIVE CCTV CAM SIMULATOR */}
        {activeSubTab === 'cctv' && (
          <div className="bg-white rounded-3xl p-6 sm:p-8 border-2 border-orange-100 shadow-sm space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-gray-100 pb-4">
              <div>
                <h3 className="font-heading text-xl font-extrabold text-[#173B5E] flex items-center gap-2">
                  <Video className="w-5 h-5 text-[#F4511E]" /> Secure Parent CCTV Camera Feeds
                </h3>
                <p className="text-xs sm:text-sm text-gray-600">
                  Encrypted 1080p live streams of common preschool activity zones during school hours (8:30 AM – 6:30 PM).
                </p>
              </div>

              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-100 text-red-700 text-xs font-bold">
                <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
                <span>REC LIVE • 1080p HD</span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  camName: 'CAM 01: Sensory Play Lawn & Splash Deck',
                  location: 'Outdoor Green Wing',
                  image: 'https://images.unsplash.com/photo-1596464716127-f2a829822391?auto=format&fit=crop&w=800&q=80',
                  status: 'Active Group Play',
                },
                {
                  camName: 'CAM 02: Montessori Art & Finger Paint Lab',
                  location: 'Main Classroom 102',
                  image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=800&q=80',
                  status: 'Story Circle Time',
                },
                {
                  camName: 'CAM 03: Little Gourmet Organic Dining Hall',
                  location: 'Nutrition Hub',
                  image: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
                  status: 'Hydration & Fruit Break',
                },
              ].map((cam, i) => (
                <div key={i} className="bg-[#FFF9EC] rounded-2xl overflow-hidden border border-orange-200 shadow-sm group">
                  <div className="relative h-48">
                    <img
                      src={cam.image}
                      alt={cam.camName}
                      className="w-full h-full object-cover filter contrast-105"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 text-white text-[10px] font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
                      {cam.camName}
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#173B5E]/90 text-[#FFD21F] text-[10px] font-bold">
                      {cam.status}
                    </div>
                  </div>

                  <div className="p-3.5 flex items-center justify-between text-xs text-[#173B5E] font-bold">
                    <span>{cam.location}</span>
                    <button className="text-[#F4511E] hover:underline font-extrabold cursor-pointer">
                      Fullscreen ↗
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Report Absence Leave Modal */}
      {isAbsenceModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-5 border-4 border-[#FFD21F] shadow-2xl relative animate-fade-in">
            <h3 className="font-heading text-xl font-extrabold text-[#173B5E] flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#F4511E]" /> Report Absence / Leave Notice
            </h3>

            <p className="text-xs text-gray-600">
              Notify Teacher {currentChild.teacherName} and the school front desk for attendance records.
            </p>

            {absenceSubmitted ? (
              <div className="p-4 rounded-2xl bg-green-50 border border-green-200 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-green-600 mx-auto" />
                <div className="text-sm font-bold text-green-800">
                  Absence Notice Logged Successfully!
                </div>
                <p className="text-xs text-green-700">
                  We have informed the lead teacher and paused school van pickup for {absenceDate}.
                </p>
                <button
                  onClick={() => {
                    setIsAbsenceModalOpen(false);
                    setAbsenceSubmitted(false);
                  }}
                  className="mt-2 px-4 py-1.5 rounded-xl bg-green-700 text-white text-xs font-bold"
                >
                  Done
                </button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setAbsenceSubmitted(true);
                }}
                className="space-y-4"
              >
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Child Name
                  </label>
                  <input
                    type="text"
                    disabled
                    value={currentChild.name}
                    className="w-full px-3 py-2 rounded-xl bg-gray-100 border border-gray-200 text-xs font-bold text-gray-700"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Date of Absence
                  </label>
                  <input
                    type="date"
                    required
                    value={absenceDate}
                    onChange={(e) => setAbsenceDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-[#173B5E]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">
                    Reason for Leave
                  </label>
                  <select
                    value={absenceReason}
                    onChange={(e) => setAbsenceReason(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-gray-300 text-xs font-bold text-[#173B5E]"
                  >
                    <option value="Sick / Mild Fever">Sick / Pediatrician Visit</option>
                    <option value="Family Travel">Family Travel / Vacation</option>
                    <option value="Personal Event">Family Celebration / Birthday</option>
                    <option value="Other">Other Reason</option>
                  </select>
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAbsenceModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-bold text-xs shadow-md"
                  >
                    Submit Notice
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
