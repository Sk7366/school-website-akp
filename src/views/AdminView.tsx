import React, { useState } from 'react';
import { PageTab, AdmissionLead, TourBooking, FranchiseApplication, Enquiry, Testimonial } from '../types';
import { AKPLogo, LeoTeacher, LeoSuper } from '../components/MascotIcons';
import {
  Users,
  Calendar,
  Building,
  Star,
  DollarSign,
  Download,
  Filter,
  Search,
  CheckCircle,
  Clock,
  Phone,
  Mail,
  Trash2,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Eye,
  X,
  FileSpreadsheet,
} from 'lucide-react';

interface AdminViewProps {
  onNavigate: (tab: PageTab) => void;
  admissionLeads: AdmissionLead[];
  tourBookings: TourBooking[];
  franchiseApplications: FranchiseApplication[];
  generalEnquiries: Enquiry[];
  testimonials: Testimonial[];
  onUpdateLeadStatus: (id: string, status: AdmissionLead['status']) => void;
  onDeleteLead: (id: string) => void;
  onUpdateTourStatus: (id: string, status: TourBooking['status']) => void;
  onDeleteTour: (id: string) => void;
  onUpdateFranchiseStatus: (id: string, status: FranchiseApplication['status']) => void;
  onDeleteFranchise: (id: string) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  onNavigate,
  admissionLeads,
  tourBookings,
  franchiseApplications,
  generalEnquiries,
  testimonials,
  onUpdateLeadStatus,
  onDeleteLead,
  onUpdateTourStatus,
  onDeleteTour,
  onUpdateFranchiseStatus,
  onDeleteFranchise,
}) => {
  const [activeTab, setActiveTab] = useState<'admissions' | 'tours' | 'franchise' | 'enquiries' | 'fees'>('admissions');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedItemDetail, setSelectedItemDetail] = useState<unknown | null>(null);

  // Stats
  const totalLeads = admissionLeads.length;
  const newLeads = admissionLeads.filter((l) => l.status === 'New').length;
  const totalTours = tourBookings.length;
  const totalFranchise = franchiseApplications.length;
  const totalReviews = testimonials.length;

  const exportLeadsToCSV = () => {
    const headers = ['ID,Parent Name,Child Name,Child Age,Program,Phone,Email,Preferred Campus,Status,Created At\n'];
    const rows = admissionLeads.map((l) =>
      `"${l.id}","${l.parentName}","${l.childName}","${l.childAge}","${l.program}","${l.phone}","${l.email}","${l.preferredCampus}","${l.status}","${l.createdAt}"\n`
    );
    const blob = new Blob([...headers, ...rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `AKP_Admissions_Leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="admin-dashboard-container" className="w-full min-h-screen bg-[#F4F7FB]">
      {/* Top Header Navigation */}
      <header className="bg-[#173B5E] text-white py-4 px-4 sm:px-8 border-b-4 border-[#FFD21F] sticky top-0 z-40 shadow-lg">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <AKPLogo size={40} showText={false} />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-black text-lg text-white">AKP ADMISSIONS CRM</span>
                <span className="px-2 py-0.5 rounded-full bg-[#5BC85A] text-white text-[10px] font-extrabold uppercase">
                  Live System
                </span>
              </div>
              <p className="text-[11px] text-white/70">A Kid’s Pre School • Central Management Hub</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={exportLeadsToCSV}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-[#FFD21F] font-heading font-bold text-xs flex items-center gap-1.5 border border-[#FFD21F]/40 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              Export CSV
            </button>
            <button
              onClick={() => onNavigate('home')}
              className="px-4 py-2 rounded-xl bg-[#F4511E] hover:bg-[#E64A19] text-white font-heading font-bold text-xs uppercase tracking-wider cursor-pointer"
            >
              ← Back To Website
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* KPI Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          <div className="bg-white p-5 rounded-3xl border-3 border-[#F4511E] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-gray-500">Admissions Enquiries</div>
              <div className="font-heading font-black text-3xl text-[#173B5E] mt-1">{totalLeads}</div>
              <div className="text-xs font-bold text-[#F4511E] mt-0.5">{newLeads} Pending Action</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFF3E0] text-[#F4511E] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border-3 border-[#29B6F6] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-gray-500">Campus Tour Bookings</div>
              <div className="font-heading font-black text-3xl text-[#173B5E] mt-1">{totalTours}</div>
              <div className="text-xs font-bold text-[#0288D1] mt-0.5">VIP Family Visits</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E1F5FE] text-[#0288D1] flex items-center justify-center">
              <Calendar className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border-3 border-[#FFD21F] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-gray-500">Franchise Leads</div>
              <div className="font-heading font-black text-3xl text-[#173B5E] mt-1">{totalFranchise}</div>
              <div className="text-xs font-bold text-[#F57F17] mt-0.5">Prospective Partners</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#FFFDE7] text-[#F57F17] flex items-center justify-center">
              <Building className="w-6 h-6" />
            </div>
          </div>

          <div className="bg-white p-5 rounded-3xl border-3 border-[#5BC85A] shadow-sm flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase text-gray-500">Parent Community</div>
              <div className="font-heading font-black text-3xl text-[#173B5E] mt-1">{totalReviews}</div>
              <div className="text-xs font-bold text-[#2E7D32] mt-0.5">4.9 Star Rating</div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-6 border-b border-gray-200">
          {[
            { id: 'admissions', label: `Admissions Inquiries (${admissionLeads.length})`, icon: Users },
            { id: 'tours', label: `Campus Tour Bookings (${tourBookings.length})`, icon: Calendar },
            { id: 'franchise', label: `Franchise Applications (${franchiseApplications.length})`, icon: Building },
            { id: 'enquiries', label: `General Queries (${generalEnquiries.length})`, icon: Mail },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'admissions' | 'tours' | 'franchise' | 'enquiries')}
                className={`px-5 py-3 rounded-2xl font-heading font-extrabold text-xs sm:text-sm tracking-wide transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-[#173B5E] text-[#FFD21F] shadow-md scale-102'
                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Tab 1: Admissions Leads Table */}
        {activeTab === 'admissions' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <div className="relative flex-1 min-w-[240px]">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by parent name, child name, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-gray-200 focus:outline-none focus:border-[#F4511E]"
                />
              </div>

              <div className="flex items-center gap-2">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 text-xs font-bold rounded-xl border border-gray-200 focus:outline-none"
                >
                  <option value="all">All Statuses</option>
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Tour Scheduled">Tour Scheduled</option>
                  <option value="Enrolled">Enrolled</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF9EC] text-[#173B5E] font-heading font-extrabold uppercase border-b border-orange-200">
                  <tr>
                    <th className="p-4">Lead Info</th>
                    <th className="p-4">Child & Program</th>
                    <th className="p-4">Contact</th>
                    <th className="p-4">Campus</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {admissionLeads
                    .filter((l) => {
                      const matchSearch =
                        l.parentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.childName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        l.phone.includes(searchTerm);
                      const matchStatus = statusFilter === 'all' || l.status === statusFilter;
                      return matchSearch && matchStatus;
                    })
                    .map((lead) => (
                      <tr key={lead.id} className="hover:bg-orange-50/50 transition-colors">
                        <td className="p-4">
                          <div className="font-bold text-sm text-[#173B5E]">{lead.parentName}</div>
                          <div className="text-[11px] text-gray-400">{lead.createdAt}</div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-gray-900">{lead.childName}</div>
                          <div className="text-gray-500">
                            {lead.childAge} • <span className="text-[#F4511E] font-bold">{lead.program}</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="font-bold text-[#173B5E]">{lead.phone}</div>
                          <div className="text-gray-500">{lead.email || '—'}</div>
                        </td>
                        <td className="p-4">{lead.preferredCampus}</td>
                        <td className="p-4">
                          <select
                            value={lead.status}
                            onChange={(e) =>
                              onUpdateLeadStatus(lead.id, e.target.value as AdmissionLead['status'])
                            }
                            className={`px-2.5 py-1 rounded-full text-[11px] font-extrabold border focus:outline-none ${
                              lead.status === 'New'
                                ? 'bg-red-50 text-red-600 border-red-200'
                                : lead.status === 'Contacted'
                                ? 'bg-yellow-50 text-yellow-700 border-yellow-200'
                                : lead.status === 'Tour Scheduled'
                                ? 'bg-blue-50 text-blue-700 border-blue-200'
                                : lead.status === 'Enrolled'
                                ? 'bg-green-50 text-green-700 border-green-200'
                                : 'bg-gray-100 text-gray-600 border-gray-200'
                            }`}
                          >
                            <option value="New">New</option>
                            <option value="Contacted">Contacted</option>
                            <option value="Tour Scheduled">Tour Scheduled</option>
                            <option value="Enrolled">Enrolled 🎓</option>
                            <option value="Closed">Closed</option>
                          </select>
                        </td>
                        <td className="p-4">
                          <button
                            onClick={() => onDeleteLead(lead.id)}
                            className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>

              {admissionLeads.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No admission inquiries logged yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Tour Bookings */}
        {activeTab === 'tours' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h3 className="font-heading font-extrabold text-base text-[#173B5E]">
                Scheduled Campus Visits & VIP Passes
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF9EC] text-[#173B5E] font-heading font-extrabold uppercase border-b border-orange-200">
                  <tr>
                    <th className="p-4">Visitor Parent</th>
                    <th className="p-4">Child & Age</th>
                    <th className="p-4">Tour Date & Slot</th>
                    <th className="p-4">Program Interest</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {tourBookings.map((tour) => (
                    <tr key={tour.id} className="hover:bg-blue-50/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-sm text-[#173B5E]">{tour.parentName}</div>
                        <div className="text-gray-500">{tour.phone}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold">{tour.childName}</div>
                        <div className="text-gray-500">{tour.childAge}</div>
                      </td>
                      <td className="p-4">
                        <div className="font-bold text-[#0288D1]">{tour.preferredDate}</div>
                        <div className="text-gray-500">{tour.preferredTime}</div>
                      </td>
                      <td className="p-4 font-bold text-[#F4511E]">{tour.program}</td>
                      <td className="p-4">
                        <select
                          value={tour.status}
                          onChange={(e) =>
                            onUpdateTourStatus(tour.id, e.target.value as TourBooking['status'])
                          }
                          className="px-2 py-1 rounded-full text-[11px] font-bold border border-gray-200"
                        >
                          <option value="Confirmed">Confirmed</option>
                          <option value="Completed">Completed</option>
                          <option value="Rescheduled">Rescheduled</option>
                          <option value="Cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => onDeleteTour(tour.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {tourBookings.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No tour bookings scheduled yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Franchise Applications */}
        {activeTab === 'franchise' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-6 border-b border-gray-100">
              <h3 className="font-heading font-extrabold text-base text-[#173B5E]">
                Franchise Partner Inquiries
              </h3>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#FFF9EC] text-[#173B5E] font-heading font-extrabold uppercase border-b border-orange-200">
                  <tr>
                    <th className="p-4">Partner Name</th>
                    <th className="p-4">City / Location</th>
                    <th className="p-4">Budget Range</th>
                    <th className="p-4">Property Setup</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 font-medium text-gray-700">
                  {franchiseApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-yellow-50/40 transition-colors">
                      <td className="p-4">
                        <div className="font-bold text-sm text-[#173B5E]">{app.name}</div>
                        <div className="text-gray-500">{app.phone} • {app.email}</div>
                      </td>
                      <td className="p-4 font-bold">{app.city}</td>
                      <td className="p-4 font-bold text-[#5BC85A]">{app.investmentBudget}</td>
                      <td className="p-4 text-gray-600">{app.propertyAvailable}</td>
                      <td className="p-4">
                        <select
                          value={app.status}
                          onChange={(e) =>
                            onUpdateFranchiseStatus(app.id, e.target.value as FranchiseApplication['status'])
                          }
                          className="px-2 py-1 rounded-full text-[11px] font-bold border border-gray-200"
                        >
                          <option value="New">New</option>
                          <option value="In Discussion">In Discussion</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Agreement Signed">Agreement Signed ✍️</option>
                          <option value="Rejected">Rejected</option>
                        </select>
                      </td>
                      <td className="p-4">
                        <button
                          onClick={() => onDeleteFranchise(app.id)}
                          className="p-1.5 text-gray-400 hover:text-red-600 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {franchiseApplications.length === 0 && (
                <div className="text-center py-12 text-gray-500 text-sm">
                  No franchise applications logged yet.
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: General Queries */}
        {activeTab === 'enquiries' && (
          <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6">
            <h3 className="font-heading font-extrabold text-base text-[#173B5E] mb-4">
              General Parent Contact Inquiries
            </h3>
            <div className="space-y-4">
              {generalEnquiries.map((enq) => (
                <div key={enq.id} className="p-4 rounded-2xl bg-gray-50 border border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-bold text-sm text-[#173B5E]">{enq.parentName}</h4>
                      <p className="text-xs text-gray-500">{enq.phone} • {enq.email}</p>
                    </div>
                    <span className="text-[11px] text-gray-400">{enq.createdAt}</span>
                  </div>
                  <p className="text-xs text-gray-700 font-medium mt-2 bg-white p-3 rounded-xl border border-gray-100">
                    &ldquo;{enq.message}&rdquo;
                  </p>
                </div>
              ))}
              {generalEnquiries.length === 0 && (
                <div className="text-center py-8 text-gray-500 text-xs">
                  No general queries at this time.
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
