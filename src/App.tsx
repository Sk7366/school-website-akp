/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { PageTab, AdmissionLead, TourBooking, FranchiseApplication, Enquiry, Testimonial } from './types';
import { INITIAL_TESTIMONIALS } from './data/preschoolData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AdmissionPopup } from './components/AdmissionPopup';
import { AskLeoChatbot } from './components/AskLeoChatbot';
import { FloatingSocials } from './components/FloatingSocials';
import { LoadingScreen } from './components/LoadingScreen';

// Core Page Views
import { HomeView } from './views/HomeView';
import { AboutView } from './views/AboutView';
import { ProgramsView } from './views/ProgramsView';
import { TeachingView } from './views/TeachingView';
import { ActivitiesView } from './views/ActivitiesView';
import { DayAtSchoolView } from './views/DayAtSchoolView';
import { GalleryView } from './views/GalleryView';
import { ReviewsView } from './views/ReviewsView';
import { BlogView } from './views/BlogView';
import { FranchiseView } from './views/FranchiseView';
import { ContactView } from './views/ContactView';
import { BookTourView } from './views/BookTourView';
import { AdminView } from './views/AdminView';

// Interactive Extended Views
import { KidsZoneView } from './views/KidsZoneView';
import { ParentPortalView } from './views/ParentPortalView';
import { FeeCalculatorView } from './views/FeeCalculatorView';
import { VirtualTourView } from './views/VirtualTourView';
import { CampusesView } from './views/CampusesView';

export default function App() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<PageTab>('home');
  const [isAdmissionModalOpen, setIsAdmissionModalOpen] = useState<boolean>(false);
  const [selectedProgramId, setSelectedProgramId] = useState<string | null>(null);
  const [selectedBlogId, setSelectedBlogId] = useState<string | null>(null);

  // Persistent CRM State
  const [admissionLeads, setAdmissionLeads] = useState<AdmissionLead[]>(() => {
    const saved = localStorage.getItem('akp_admission_leads');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'LEAD-101',
        parentName: 'Sarah Jenkins',
        phone: '+1 (555) 234-5678',
        email: 'sarah.j@example.com',
        childName: 'Emma Jenkins',
        childAge: '2.5 Years',
        program: 'Nursery',
        preferredCampus: 'Sunshine Flagship Campus',
        message: 'Looking for a warm half-day program with arts and sensory play.',
        createdAt: '2026-03-01 10:15 AM',
        status: 'New',
      },
      {
        id: 'LEAD-102',
        parentName: 'Amit & Neha Verma',
        phone: '+1 (555) 876-5432',
        email: 'neha.verma@example.com',
        childName: 'Reyansh Verma',
        childAge: '3.8 Years',
        program: 'Junior KG',
        preferredCampus: 'Green Valley Nature Campus',
        message: 'Interested in phonics curriculum and evening daycare transport.',
        createdAt: '2026-03-02 02:40 PM',
        status: 'Tour Scheduled',
      },
    ];
  });

  const [tourBookings, setTourBookings] = useState<TourBooking[]>(() => {
    const saved = localStorage.getItem('akp_tour_bookings');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'AKP-774921',
        parentName: 'Marcus Chen',
        phone: '+1 (555) 345-9876',
        email: 'marcus.chen@example.com',
        childName: 'Liam Chen',
        childAge: '2.2 Years',
        program: 'Playgroup',
        preferredDate: '2026-03-16',
        preferredTime: '10:00 AM – Morning Circle Tour',
        createdAt: '2026-03-02 11:20 AM',
        status: 'Confirmed',
      },
    ];
  });

  const [franchiseApplications, setFranchiseApplications] = useState<FranchiseApplication[]>(() => {
    const saved = localStorage.getItem('akp_franchise_apps');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'FRAN-501',
        name: 'Elena Rostova',
        phone: '+1 (555) 432-8765',
        email: 'elena.partner@example.com',
        city: 'Denver, Colorado',
        experience: 'Educator / School Owner',
        investmentBudget: '$75,000 – $150,000',
        propertyAvailable: 'Commercial Space Available (2,000+ sq ft)',
        message: 'Interested in opening a flagship 4,000 sq ft branch with outdoor organic garden.',
        createdAt: '2026-03-01 04:12 PM',
        status: 'Qualified',
      },
    ];
  });

  const [generalEnquiries, setGeneralEnquiries] = useState<Enquiry[]>(() => {
    const saved = localStorage.getItem('akp_general_enquiries');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return [
      {
        id: 'ENQ-201',
        parentName: 'Daniel Brooks',
        phone: '+1 (555) 901-2345',
        email: 'daniel.b@example.com',
        childAge: 'Nursery (2.5 – 3.5 Years)',
        enquiryType: 'Transportation Routes',
        city: 'Sunshine Flagship Campus',
        message: 'Do you have bus pickup for the Northridge area?',
        createdAt: '2026-03-02 09:00 AM',
        status: 'New',
      },
    ];
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    const saved = localStorage.getItem('akp_testimonials');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_TESTIMONIALS;
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('akp_admission_leads', JSON.stringify(admissionLeads));
  }, [admissionLeads]);

  useEffect(() => {
    localStorage.setItem('akp_tour_bookings', JSON.stringify(tourBookings));
  }, [tourBookings]);

  useEffect(() => {
    localStorage.setItem('akp_franchise_apps', JSON.stringify(franchiseApplications));
  }, [franchiseApplications]);

  useEffect(() => {
    localStorage.setItem('akp_general_enquiries', JSON.stringify(generalEnquiries));
  }, [generalEnquiries]);

  useEffect(() => {
    localStorage.setItem('akp_testimonials', JSON.stringify(testimonials));
  }, [testimonials]);

  const handleNavigate = (tab: PageTab) => {
    setActiveTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectProgram = (programId: string) => {
    setSelectedProgramId(programId);
    setActiveTab('programs');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBlogPost = (blogId: string | null) => {
    setSelectedBlogId(blogId);
    setActiveTab('blog');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add Handlers
  const handleAddAdmissionLead = (leadData: Omit<AdmissionLead, 'id' | 'createdAt' | 'status'>) => {
    const newLead: AdmissionLead = {
      ...leadData,
      id: `LEAD-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toLocaleString(),
      status: 'New',
    };
    setAdmissionLeads((prev) => [newLead, ...prev]);
  };

  const handleAddTourBooking = (tourData: Omit<TourBooking, 'id' | 'createdAt' | 'status'>) => {
    const newTour: TourBooking = {
      ...tourData,
      id: `AKP-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toLocaleString(),
      status: 'Confirmed',
    };
    setTourBookings((prev) => [newTour, ...prev]);
  };

  const handleAddFranchiseLead = (franchiseData: Omit<FranchiseApplication, 'id' | 'createdAt' | 'status'>) => {
    const newFranchise: FranchiseApplication = {
      ...franchiseData,
      id: `FRAN-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toLocaleString(),
      status: 'New',
    };
    setFranchiseApplications((prev) => [newFranchise, ...prev]);
  };

  const handleAddGeneralEnquiry = (enqData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>) => {
    const newEnquiry: Enquiry = {
      ...enqData,
      id: `ENQ-${Math.floor(100 + Math.random() * 900)}`,
      createdAt: new Date().toLocaleString(),
      status: 'New',
    };
    setGeneralEnquiries((prev) => [newEnquiry, ...prev]);
  };

  const handleAddTestimonial = (revData: Omit<Testimonial, 'id' | 'date' | 'published'>) => {
    const newTestimonial: Testimonial = {
      ...revData,
      id: `rev-${Date.now()}`,
      date: 'Just now',
      published: true,
    };
    setTestimonials((prev) => [newTestimonial, ...prev]);
  };

  // Status Handlers for Admin
  const handleUpdateLeadStatus = (id: string, status: AdmissionLead['status']) => {
    setAdmissionLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status } : l)));
  };

  const handleDeleteLead = (id: string) => {
    setAdmissionLeads((prev) => prev.filter((l) => l.id !== id));
  };

  const handleUpdateTourStatus = (id: string, status: TourBooking['status']) => {
    setTourBookings((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
  };

  const handleDeleteTour = (id: string) => {
    setTourBookings((prev) => prev.filter((t) => t.id !== id));
  };

  const handleUpdateFranchiseStatus = (id: string, status: FranchiseApplication['status']) => {
    setFranchiseApplications((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
  };

  const handleDeleteFranchise = (id: string) => {
    setFranchiseApplications((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9EC] text-[#173B5E] antialiased selection:bg-[#FFD21F] selection:text-[#173B5E]">
      {/* Interactive Mascot Initial Loading Screen */}
      {isLoading && <LoadingScreen onFinishLoading={() => setIsLoading(false)} />}

      {/* Top Admissions Announcement Ribbon */}
      {activeTab !== 'admin' && (
        <div className="bg-[#173B5E] text-white py-2 px-4 text-center text-xs font-bold border-b border-[#FFD21F]/30 flex items-center justify-center gap-2">
          <span className="animate-pulse">🦁</span>
          <span>
            <strong>Admissions Open for Academic Year 2026–27!</strong> Limited seats across Playgroup, Nursery, & KG batches.
          </span>
          <button
            onClick={() => setIsAdmissionModalOpen(true)}
            className="underline text-[#FFD21F] hover:text-[#FF8A3D] font-extrabold ml-1 cursor-pointer"
          >
            Apply Now →
          </button>
        </div>
      )}

      {/* Main Navbar */}
      {activeTab !== 'admin' && (
        <Navbar
          activeTab={activeTab}
          onNavigate={handleNavigate}
          onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          enquiriesCount={admissionLeads.filter((l) => l.status === 'New').length}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {activeTab === 'home' && (
          <HomeView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            onSelectProgram={handleSelectProgram}
            onSelectBlogPost={handleSelectBlogPost}
          />
        )}

        {activeTab === 'about' && (
          <AboutView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'programs' && (
          <ProgramsView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            selectedProgramId={selectedProgramId}
            onSelectProgram={handleSelectProgram}
          />
        )}

        {activeTab === 'teaching' && (
          <TeachingView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'activities' && (
          <ActivitiesView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'day-at-school' && (
          <DayAtSchoolView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'gallery' && (
          <GalleryView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'reviews' && (
          <ReviewsView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            testimonials={testimonials}
            onAddTestimonial={handleAddTestimonial}
          />
        )}

        {activeTab === 'blog' && (
          <BlogView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            selectedBlogId={selectedBlogId}
            onSelectBlogPost={handleSelectBlogPost}
          />
        )}

        {activeTab === 'franchise' && (
          <FranchiseView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            onSubmitFranchiseLead={handleAddFranchiseLead}
          />
        )}

        {activeTab === 'contact' && (
          <ContactView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            onSubmitGeneralEnquiry={handleAddGeneralEnquiry}
          />
        )}

        {activeTab === 'book-tour' && (
          <BookTourView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
            onSubmitTourBooking={handleAddTourBooking}
          />
        )}

        {/* Interactive Features */}
        {activeTab === 'kids-zone' && (
          <KidsZoneView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'parent-portal' && (
          <ParentPortalView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'fee-calculator' && (
          <FeeCalculatorView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'virtual-tour' && (
          <VirtualTourView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {activeTab === 'campuses' && (
          <CampusesView
            onNavigate={handleNavigate}
            onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
          />
        )}

        {/* Staff / Director CRM Portal */}
        {activeTab === 'admin' && (
          <AdminView
            onNavigate={handleNavigate}
            admissionLeads={admissionLeads}
            tourBookings={tourBookings}
            franchiseApplications={franchiseApplications}
            generalEnquiries={generalEnquiries}
            testimonials={testimonials}
            onUpdateLeadStatus={handleUpdateLeadStatus}
            onDeleteLead={handleDeleteLead}
            onUpdateTourStatus={handleUpdateTourStatus}
            onDeleteTour={handleDeleteTour}
            onUpdateFranchiseStatus={handleUpdateFranchiseStatus}
            onDeleteFranchise={handleDeleteFranchise}
          />
        )}
      </main>

      {/* Global Footer */}
      {activeTab !== 'admin' && (
        <Footer
          onNavigate={handleNavigate}
          onOpenAdmissionModal={() => setIsAdmissionModalOpen(true)}
        />
      )}

      {/* Global Admission & Prospectus Modal */}
      <AdmissionPopup
        isOpen={isAdmissionModalOpen}
        onClose={() => setIsAdmissionModalOpen(false)}
        onSubmitLead={handleAddAdmissionLead}
      />

      {/* Floating Action Buttons: WhatsApp / Call & Quick Actions */}
      {activeTab !== 'admin' && (
        <FloatingSocials
          onOpenAdmission={() => setIsAdmissionModalOpen(true)}
          onBookTour={() => handleNavigate('book-tour')}
        />
      )}

      {/* AI Lion Mascot "Ask Leo" Interactive Chatbot */}
      {activeTab !== 'admin' && (
        <AskLeoChatbot
          onOpenAdmission={() => setIsAdmissionModalOpen(true)}
          onNavigate={handleNavigate}
        />
      )}
    </div>
  );
}
