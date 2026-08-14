import React, { useState } from 'react';
import {
  LeoReader,
  LeoTeacher,
  LeoSuper,
  StarDeco,
  SunshineDeco,
  AKPLogo,
} from '../components/MascotIcons';
import { PageTab, BlogPost } from '../types';
import { INITIAL_BLOG_POSTS } from '../data/preschoolData';
import {
  Search,
  BookOpen,
  Calendar,
  Clock,
  User,
  ArrowRight,
  ArrowLeft,
  Share2,
  Heart,
  MessageCircle,
  Sparkles,
  Send,
} from 'lucide-react';

interface BlogViewProps {
  onNavigate: (tab: PageTab) => void;
  onOpenAdmissionModal: () => void;
  selectedBlogId?: string | null;
  onSelectBlogPost?: (id: string | null) => void;
}

export const BlogView: React.FC<BlogViewProps> = ({
  onNavigate,
  onOpenAdmissionModal,
  selectedBlogId,
  onSelectBlogPost,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPostId, setCurrentPostId] = useState<string | null>(selectedBlogId || null);

  // Parent comments mock state
  const [comments, setComments] = useState<{ [postId: string]: { name: string; text: string; date: string }[] }>({
    'post-1': [
      { name: 'Meera Patel', text: 'These 5 tips really helped Aarav with his morning drop-off tears!', date: '2 days ago' },
      { name: 'David Miller', text: 'The goodbye ritual strategy is pure magic. Thank you Leo!', date: '5 days ago' },
    ],
  });
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');

  const categories = [
    'All',
    'Parenting Tips',
    'Child Development',
    'Learning at Home',
    'Activities',
    'School Events',
  ];

  const filteredPosts = INITIAL_BLOG_POSTS.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const activePost = INITIAL_BLOG_POSTS.find((p) => p.id === currentPostId);

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPostId || !commentName || !commentText) return;

    setComments((prev) => ({
      ...prev,
      [currentPostId]: [
        ...(prev[currentPostId] || []),
        { name: commentName, text: commentText, date: 'Just now' },
      ],
    }));

    setCommentName('');
    setCommentText('');
  };

  return (
    <div id="blog-page-container" className="w-full bg-[#FFF9EC]">
      {/* If single article is open */}
      {activePost ? (
        <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <button
            onClick={() => {
              setCurrentPostId(null);
              if (onSelectBlogPost) onSelectBlogPost(null);
            }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-[#173B5E] font-heading font-extrabold text-xs uppercase hover:bg-orange-50 border border-gray-200 transition-colors cursor-pointer shadow-2xs"
          >
            <ArrowLeft className="w-4 h-4 text-[#F4511E]" />
            Back to All Articles
          </button>

          <div className="bg-white rounded-3xl p-6 sm:p-12 border-4 border-[#FFD21F] shadow-2xl space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-bold">
              <span
                className="px-3 py-1 rounded-full text-white uppercase"
                style={{ backgroundColor: activePost.accentColor }}
              >
                {activePost.category}
              </span>
              <div className="flex items-center gap-4 text-gray-500">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {activePost.publishedAt}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {activePost.readTime}
                </span>
              </div>
            </div>

            <h1 className="font-heading font-black text-3xl sm:text-5xl text-[#173B5E] tracking-tight leading-tight">
              {activePost.title}
            </h1>

            <div className="flex items-center gap-3 py-2 border-y border-gray-100">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm"
                style={{ backgroundColor: activePost.accentColor }}
              >
                {activePost.author[0]}
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-[#173B5E]">{activePost.author}</h4>
                <p className="text-xs text-gray-500 font-medium">Early Childhood Specialist & Educator</p>
              </div>
            </div>

            <div className="aspect-16/9 rounded-2xl overflow-hidden shadow-md">
              <img
                src={activePost.coverImage}
                alt={activePost.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Article Content */}
            <div className="prose max-w-none text-gray-800 text-base sm:text-lg leading-relaxed font-medium space-y-4 pt-4">
              <p className="font-semibold text-lg sm:text-xl text-[#173B5E] leading-relaxed">
                {activePost.excerpt}
              </p>
              <div className="whitespace-pre-line text-sm sm:text-base leading-relaxed text-gray-700">
                {activePost.content}
              </div>
            </div>

            {/* In-Article Action CTA */}
            <div className="p-6 rounded-3xl bg-[#FFF9EC] border-2 border-[#FFD21F] flex flex-col sm:flex-row items-center justify-between gap-4 mt-8">
              <div>
                <h4 className="font-heading font-bold text-lg text-[#173B5E]">
                  Looking for personalized child advice?
                </h4>
                <p className="text-xs text-gray-600 font-medium mt-0.5">
                  Connect with our early childhood educators or tour our campus.
                </p>
              </div>
              <button
                onClick={onOpenAdmissionModal}
                className="px-6 py-2.5 rounded-xl bg-[#F4511E] text-white font-heading font-bold text-xs uppercase shadow-md hover:bg-[#E64A19] whitespace-nowrap"
              >
                Enquire With School
              </button>
            </div>

            {/* Comments Section */}
            <div className="pt-8 border-t border-gray-100">
              <h3 className="font-heading font-bold text-xl text-[#173B5E] mb-4 flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-[#F4511E]" />
                Parent Comments & Reflections ({(comments[activePost.id] || []).length})
              </h3>

              <div className="space-y-3 mb-6">
                {(comments[activePost.id] || []).map((c, i) => (
                  <div key={i} className="p-4 rounded-2xl bg-gray-50 border border-gray-100 text-xs">
                    <div className="flex justify-between font-bold text-[#173B5E] mb-1">
                      <span>{c.name}</span>
                      <span className="text-gray-400 font-normal">{c.date}</span>
                    </div>
                    <p className="text-gray-700 font-medium">{c.text}</p>
                  </div>
                ))}
              </div>

              {/* Add Comment Form */}
              <form onSubmit={handleAddComment} className="space-y-3 bg-[#FFF9EC] p-4 rounded-2xl border border-orange-200">
                <h4 className="font-heading font-bold text-xs uppercase text-[#F4511E]">Leave a Parent Comment</h4>
                <input
                  type="text"
                  required
                  placeholder="Your Name (e.g. Rachel Adams)"
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white"
                />
                <textarea
                  rows={3}
                  required
                  placeholder="Write your reflection or question..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-white"
                />
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#173B5E] text-white font-heading font-bold text-xs uppercase flex items-center gap-1.5 hover:bg-[#102A43]"
                >
                  <Send className="w-3.5 h-3.5" />
                  Post Comment
                </button>
              </form>
            </div>
          </div>
        </article>
      ) : (
        /* Blog Index Page */
        <>
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
                <span>📚 Parenting Guides & Insights</span>
              </div>

              <h1 className="font-heading font-black text-4xl sm:text-6xl text-white tracking-tight leading-tight mb-4">
                FROM OUR EDUCATORS’ DESK: <br />
                <span className="text-[#FFD21F]">GUIDES, TIPS & STORIES.</span>
              </h1>

              <p className="text-white/85 text-base sm:text-xl font-medium max-w-3xl mx-auto leading-relaxed">
                Practical, research-grounded advice for modern parents — covering separation ease, phonics milestones, positive discipline, and sensory games.
              </p>

              {/* Search Bar */}
              <div className="mt-8 max-w-xl mx-auto relative">
                <Search className="w-5 h-5 absolute left-4 top-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search parenting articles, phonics, separation anxiety..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white text-[#173B5E] font-medium text-sm focus:outline-none focus:ring-4 focus:ring-[#FFD21F]/50 shadow-lg"
                />
              </div>
            </div>
          </section>

          {/* Category Filter Pills */}
          <section className="py-6 bg-white border-b border-orange-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-heading font-extrabold whitespace-nowrap transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#F4511E] text-white shadow-md'
                        : 'bg-[#FFF9EC] text-[#173B5E] hover:bg-orange-100 border border-orange-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Articles Grid */}
          <section className="py-12 sm:py-20 bg-[#FFF9EC]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => {
                      setCurrentPostId(post.id);
                      if (onSelectBlogPost) onSelectBlogPost(post.id);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="bg-white rounded-3xl overflow-hidden border-3 shadow-md hover:-translate-y-2 transition-all flex flex-col justify-between cursor-pointer group"
                    style={{ borderColor: post.accentColor }}
                  >
                    <div>
                      <div className="aspect-16/9 overflow-hidden">
                        <img
                          src={post.coverImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between text-xs font-bold mb-2">
                          <span
                            className="px-2.5 py-0.5 rounded-md text-white"
                            style={{ backgroundColor: post.accentColor }}
                          >
                            {post.category}
                          </span>
                          <span className="text-gray-400">{post.readTime}</span>
                        </div>

                        <h3 className="font-heading font-black text-xl text-[#173B5E] group-hover:text-[#F4511E] transition-colors leading-snug mb-2">
                          {post.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-gray-600 font-medium line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>

                    <div className="px-6 pb-6 pt-2 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-[#F4511E]">
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};
