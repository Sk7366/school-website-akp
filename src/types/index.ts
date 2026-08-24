export type PageTab =
  | 'home'
  | 'about'
  | 'programs'
  | 'teaching'
  | 'activities'
  | 'day-at-school'
  | 'gallery'
  | 'reviews'
  | 'blog'
  | 'franchise'
  | 'contact'
  | 'book-tour'
  | 'kids-zone'
  | 'campuses';

export type LeadStatus =
  | 'NEW'
  | 'CONTACTED'
  | 'TOUR SCHEDULED'
  | 'CONVERTED'
  | 'ENROLLED'
  | 'CONFIRMED'
  | 'COMPLETED'
  | 'QUALIFIED'
  | 'CLOSED'
  | 'New'
  | 'Contacted'
  | 'Tour Scheduled'
  | 'Enrolled'
  | 'Confirmed'
  | 'Completed'
  | 'Qualified'
  | 'In Discussion'
  | 'Agreement Signed'
  | 'Rejected'
  | 'Rescheduled'
  | 'Cancelled'
  | 'Closed';

export interface AdmissionLead {
  id: string;
  parentName: string;
  phone: string;
  email?: string;
  childName: string;
  childAge: string;
  program: string;
  preferredCampus: string;
  message?: string;
  status: LeadStatus;
  createdAt: string;
}

export interface Enquiry {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childAge: string;
  enquiryType: string;
  city: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface TourBooking {
  id: string;
  parentName: string;
  phone: string;
  email: string;
  childName: string;
  childAge: string;
  program: string;
  preferredDate: string;
  preferredTime: string;
  message?: string;
  status: LeadStatus;
  createdAt: string;
}

export interface FranchiseApplication {
  id: string;
  name: string;
  phone: string;
  email: string;
  city: string;
  experience: string;
  investmentBudget: string;
  propertyAvailable: string;
  message: string;
  status: LeadStatus;
  createdAt: string;
}

export interface Testimonial {
  id: string;
  parentName: string;
  childName?: string;
  program: string;
  review: string;
  rating: number;
  avatarColor: string;
  published: boolean;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: 'Activities' | 'Parenting Tips' | 'Learning at Home' | 'School Events' | 'Child Development';
  excerpt: string;
  content: string;
  coverImage: string;
  accentColor: string;
  author: string;
  readTime: string;
  publishedAt: string;
}

export interface ProgramInfo {
  id: string;
  name: string;
  tagline: string;
  ageRange: string;
  color: string;
  bgColor: string;
  accentBorder: string;
  overview: string;
  learningFocus: string[];
  keyActivities: string[];
  timing: string;
  ratio: string;
  mascotRole: 'teacher' | 'super' | 'music' | 'reader' | 'artist' | 'meditate';
}

export interface ActivityCardData {
  id: string;
  title: string;
  category: string;
  description: string;
  accentColor: string;
  iconName: string;
  mascotRole: 'teacher' | 'super' | 'music' | 'reader' | 'artist' | 'meditate';
  skillsDeveloped: string[];
}

// 1. Parent Portal Types
export interface ChildProfile {
  id: string;
  name: string;
  photo: string;
  age: string;
  program: string;
  campus: string;
  section: string;
  teacherName: string;
  teacherAvatar: string;
  allergies?: string[];
  bloodGroup: string;
  emergencyContact: string;
}

export interface DailyActivityItem {
  id: string;
  time: string;
  title: string;
  category: 'Meal' | 'Play' | 'Nap' | 'Learning' | 'Hygiene' | 'Special';
  description: string;
  photoUrl?: string;
  moodEmoji: string;
  teacherNote?: string;
}

export interface MilestoneProgress {
  category: 'Fine Motor' | 'Gross Motor' | 'Language & Phonics' | 'Social Emotional' | 'Cognitive & Math';
  score: number; // 0 - 100
  recentAchievement: string;
  nextMilestone: string;
}

export interface MilestoneBadge {
  id: string;
  title: string;
  icon: string;
  earnedDate: string;
  category: string;
  description: string;
  color: string;
}

export interface TeacherMessage {
  id: string;
  sender: 'parent' | 'teacher';
  senderName: string;
  timestamp: string;
  text: string;
  attachmentName?: string;
}

export interface LiveBusTracking {
  vanNumber: string;
  driverName: string;
  driverPhone: string;
  currentStop: string;
  nextStop: string;
  etaMinutes: number;
  speedKmH: number;
  status: 'In Transit' | 'Reached School' | 'Boarding at Campus' | 'Completed';
  routePoints: { name: string; time: string; completed: boolean }[];
}

// 2. Fee Calculator Types
export interface FeeParams {
  programId: 'playgroup' | 'nursery' | 'lkg' | 'ukg' | 'daycare';
  paymentPlan: 'monthly' | 'term' | 'annual';
  transportZone: 'none' | 'zone1' | 'zone2' | 'zone3';
  mealPlan: 'none' | 'breakfast_lunch' | 'full_day';
  clubs: string[];
  hasSibling: boolean;
}

export interface FeeItem {
  name: string;
  amount: number;
  description: string;
}

export interface FeeQuote {
  baseTuition: number;
  transportFee: number;
  mealFee: number;
  clubsFee: number;
  admissionFee: number;
  materialsDeposit: number;
  subtotal: number;
  discountPercentage: number;
  discountAmount: number;
  totalPayable: number;
  periodLabel: string;
  items: FeeItem[];
}

// 3. Virtual 360 Tour Types
export interface Hotspot {
  id: string;
  x: number; // % from left
  y: number; // % from top
  title: string;
  description: string;
  leoTip: string;
  icon: string;
}

export interface TourStation {
  id: string;
  title: string;
  areaName: string;
  subtitle: string;
  imageUrl: string;
  description: string;
  highlights: string[];
  hotspots: Hotspot[];
  audioNarrationText: string;
  mascotRole: 'teacher' | 'super' | 'music' | 'reader' | 'artist' | 'meditate';
}

// 4. Kids Zone Types
export interface PhonicsCard {
  letter: string;
  word: string;
  phoneticSound: string;
  emoji: string;
  funFact: string;
  color: string;
  soundEffect: string;
}

export interface StoryPage {
  pageNumber: number;
  title: string;
  illustration: string;
  storyText: string;
  interactiveItem: string;
  interactiveAction: string;
  soundName: string;
}

// 5. Campus Location Types
export interface CampusLocation {
  id: string;
  name: string;
  tagline: string;
  address: string;
  neighborhood: string;
  phone: string;
  email: string;
  principal: string;
  principalPhoto: string;
  coverImage: string;
  galleryImages: string[];
  areaSqFt: string;
  studentCapacity: string;
  features: string[];
  timings: string;
  busRoutes: string[];
  googleMapUrl: string;
  badge?: string;
  accentColor: string;
}

