import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import ArticleCard from '../components/ArticleCard'
import { articles } from '../lib/mockData'
import { opinions } from '../lib/opinionsData.jsx'
import { events } from '../lib/eventsData'
import { spotlights } from '../lib/spotlightsData'
import { magazines } from '../lib/magazinesData'
import { 
  Calendar, Award, Lightbulb, TrendingUp, Star, ArrowRight, 
  UserCheck, MessageSquare, FileText, CheckCircle2, Globe, Cpu, 
  BookOpen, X, ArrowUpRight, Quote, AlertCircle, Bookmark, Share2, History
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Home() {
  const [selectedOpinion, setSelectedOpinion] = useState(null)
  const featuredArticle = articles.find(a => a.featured)
  
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <Hero article={featuredArticle} />

      {/* Breaking News Ticker (Premium touch) */}
      <div className="bg-secondary text-white overflow-hidden py-5 border-y border-white/5 relative z-20">
        <div className="container mx-auto px-4 lg:px-8 flex items-center relative">
          <div className="bg-accent px-4 py-1 mr-8 hidden md:block shrink-0 relative z-10">
             <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Latest</span>
          </div>
          <div className="overflow-hidden flex-1">
            <div className="flex animate-marquee whitespace-nowrap">
                {[...Array(10)].map((_, i) => (
                  <span key={i} className="text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mx-12 flex items-center">
                    <Star size={10} className="mr-4 text-accent fill-accent" />
                    Breaking: Global Leadership Summit 2026 registration open — Strategic shifts in Asia-Pacific markets reported — New editorial archive coming June 2026
                  </span>
                ))}
            </div>
          </div>
        </div>
      </div>

      {/* 1. The Editorial Library / Executive Archives */}
      <section className="py-32 bg-white relative overflow-hidden" data-aos="fade-up">
        {/* Decorative background element */}
        <div className="absolute top-0 left-0 w-full h-full opacity-[0.02] pointer-events-none">
          <span className="absolute top-20 left-10 text-[20rem] font-black uppercase rotate-90">ARCHIVE</span>
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-20" data-aos="fade-right">
            <span className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold mb-6 block">In-Depth Corporate Intel</span>
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary tracking-tighter uppercase leading-tight transform-gpu">
              THE CORPORATE <br />
              <span className="text-accent">Portfolios</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12">
            {[
              { id: 'himedia-laboratories', company: 'HiMedia Laboratories', img: '/interview-covers/himedia-cover.png', pdf: '/single pdfs/HiMedia-Laboratories_3_SinglePages.pdf', tag: 'Biotechnology' },
              { id: 'alfa-laval', company: 'Alfa Laval India Limited', img: '/interview-covers/alfa-laval-cover.png', pdf: '/single pdfs/Alfa Laval India Limited-story (2)_SinglePages.pdf', tag: 'Manufacturing' },
              { id: 'vitabiotics', company: 'Vitabiotics', img: '/interview-covers/vitabiotics-cover.png', pdf: '/interview pages/Vitabiotics-.pdf', tag: 'Healthcare' },
              { id: 'national-engineering', company: 'National Engineering Industries', img: '/interview-covers/national-engineering-cover.png', pdf: '/single pdfs/National Engineering Industries Ltd-story - Copy (1)_SinglePages.pdf', tag: 'Engineering' },
              { id: 'irm-energy', company: 'IRM Energy', img: '/interview-covers/irm-energy-cover.png', pdf: '/single pdfs/IRM Energy Private Limited (1)_SinglePages.pdf', tag: 'Energy' },
              { id: 'aig-hospitals', company: 'AIG Hospitals', img: '/interview-images/aig-hospitals/page_1.png', pdf: '/interview pages/AIG Hospitals.pdf', tag: 'Medical' },
              { id: 'kitex-garments', company: 'Kitex Garments', img: '/interview-images/kitex-garments---vision-&-culture_pdf/page_1.png', pdf: '/interview pages/Kitex Garments - Vision & Culture_pdf.pdf', tag: 'Textiles' },
              { id: 'itd-cementation', company: 'ITD Cementation', img: '/interview-images/itd-cementation/page_1.png', pdf: '/interview pages/ITD Cementation.pdf', tag: 'Construction' }
            ].map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="group relative"
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                <Link 
                  to={`/interview/${item.id}`}
                  state={{ pdfUrl: item.pdf, title: item.company }}
                  className="block space-y-6"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50 shadow-xl transition-all duration-700 group-hover:-translate-y-2 group-hover:shadow-2xl">
                    <img 
                      src={item.img} 
                      alt={item.company} 
                      className="w-full h-full object-contain bg-white transition-all duration-1000 group-hover:scale-105"
                      onError={(e) => {
                        e.target.src = "https://images.unsplash.com/photo-1586339949916-3e9457bed613?q=80&w=2070&auto=format&fit=crop"
                      }}
                    />
                    <div className="absolute inset-0 border-[15px] border-white/0 group-hover:border-white/40 transition-all duration-500" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <span className="text-accent text-[9px] font-bold uppercase tracking-[0.3em]">{item.tag}</span>
                      <h4 className="text-lg font-bold text-secondary uppercase tracking-tight group-hover:text-accent transition-colors line-clamp-1">
                        {item.company}
                      </h4>
                    </div>
                    <div className="flex items-center space-x-3 text-secondary group-hover:text-accent transition-all">
                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] border-b border-secondary/10 group-hover:border-accent/30 pb-1">View Full Profile</span>
                      <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="mt-24 text-center">
             <Link to="/interviews" className="inline-flex items-center gap-6 bg-secondary text-white px-12 py-6 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-2xl group rounded-full">
                <span>View Complete Library</span>
                <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* 2. Print Tradition / Digital Magazine Archive */}
      <section className="py-24 bg-secondary text-white" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">The Print Tradition</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Digital Magazine Archive</h2>
            <p className="text-gray-400 font-light italic">"Access the complete library of Executives Magazine in high-fidelity digital format."</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {magazines.map((mag, index) => (
              <Link 
                key={mag.id} 
                to={`/magazine/${mag.id}`}
                className={`group relative aspect-[3/4] overflow-hidden border border-white/10 shadow-2xl block cursor-pointer ${index >= 4 ? 'hidden md:block' : ''}`}
              >
                <img src={mag.image} alt={mag.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                {/* Overlay (Desktop) */}
                <div className="absolute inset-0 bg-secondary/80 opacity-0 group-hover:opacity-100 transition-all flex flex-col items-center justify-center p-6 text-center space-y-4 pointer-events-none">
                  <span className="text-accent text-[8px] font-bold uppercase tracking-widest">{mag.edition}</span>
                  <h4 className="text-sm font-bold text-white leading-tight">{mag.title}</h4>
                  <div className="bg-white text-secondary px-6 py-3 text-[9px] font-bold uppercase tracking-widest transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">Open Edition</div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
             <Link to="/digital-magazine" className="inline-flex items-center space-x-6 text-accent font-bold uppercase tracking-[0.3em] text-[11px] group border-b border-accent/20 pb-2 hover:text-white hover:border-white transition-all">
                <span>View All Magazines</span>
                <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
        </div>
      </section>

      {/* 3. Get Listed in Executives */}
      <section className="py-32 bg-white overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-6">
            <span className="text-accent uppercase tracking-[0.5em] text-[10px] font-bold">Featured Opportunities</span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary tracking-tight">Get Listed in Executives</h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Showcase your leadership journey to our global audience of decision-makers. Follow our streamlined section
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            {/* Connecting Line (Desktop) */}
            <div className="hidden lg:block absolute top-1/2 left-0 w-full h-[1px] bg-gray-100 -z-10" />
            
            {[
              { step: "01", title: "Fill the Form", desc: "Submit your profile and company details for initial review.", icon: <FileText className="text-accent" /> },
              { step: "02", title: "Schedule Meeting", desc: "Our board connects with you for a strategic briefing.", icon: <UserCheck className="text-accent" /> },
              { step: "03", title: "Complete Interview", desc: "Engage in an in-depth editorial interview with our experts.", icon: <MessageSquare className="text-accent" /> },
              { step: "04", title: "Publish & Share", desc: "Your feature goes live across our global executive network.", icon: <CheckCircle2 className="text-accent" /> }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white p-8 border border-gray-50 premium-shadow text-center space-y-6 relative group hover:border-accent transition-all"
              >
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-white w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold group-hover:bg-accent transition-colors">
                  {item.step}
                </div>
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto group-hover:bg-accent/10 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-lg font-bold text-secondary">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 text-center">
            <Link 
              to="/contact" 
              className="inline-flex items-center space-x-6 bg-secondary text-white px-12 py-5 font-bold uppercase tracking-widest text-[11px] hover:bg-accent transition-all shadow-xl"
            >
              <span>Begin Your Application</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* Rest of the sections */}
      


      {/* Legacy & Authority - About Teaser */}
      <section className="py-32 bg-white relative overflow-hidden" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-10">
              <div className="flex items-center space-x-4">
                <div className="h-[1px] w-12 bg-accent" />
                <span className="text-accent text-[11px] font-bold uppercase tracking-[0.5em]">The Legacy of Vision</span>
              </div>
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary leading-[1.1] tracking-tighter">
                Defining the <br/> <span className="text-accent italic font-normal tracking-normal lowercase">C-Suite</span> Standard.
              </h2>
              <p className="text-xl text-gray-500 font-light leading-relaxed max-w-xl">
                Executives Magazine serves as the global journal of record for leadership, bridging the gap between abstract corporate strategy and human-centric excellence.
              </p>
              <div className="flex items-center space-x-12 pt-4">
                <div className="space-y-2">
                  <span className="block text-4xl font-serif font-bold text-secondary">250K+</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Global Readers</p>
                </div>
                <div className="space-y-2">
                  <span className="block text-4xl font-serif font-bold text-secondary">40+</span>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Regional Bureaus</p>
                </div>
              </div>
              <div className="pt-8">
                <Link to="/about" className="group flex items-center space-x-6 text-secondary font-bold uppercase tracking-[0.3em] text-[11px] border-b border-secondary/10 pb-3 hover:text-accent hover:border-accent transition-all">
                  <span>Discover Our Editorial Mandate</span>
                  <History size={16} className="group-hover:rotate-12 transition-transform" />
                </Link>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
               <div className="aspect-[4/5] overflow-hidden shadow-2xl relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1497366811353-6870744d04b2?q=80&w=2069&auto=format&fit=crop" 
                    alt="Executives Office" 
                    className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-secondary/20 group-hover:bg-transparent transition-all duration-1000" />
               </div>
               {/* Floating Badge */}
               <div className="absolute -bottom-10 -left-10 bg-secondary p-12 text-white shadow-2xl hidden md:block">
                  <Star size={40} className="text-accent fill-accent mb-6" />
                  <p className="text-lg font-serif italic mb-2">"Journal of Record"</p>
                  <span className="text-[9px] font-bold uppercase tracking-widest text-white/50">For the Global C-Suite</span>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Business Preview */}
      <section className="py-24 bg-gray-50 border-y border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Business & Leadership" subtitle="Corporate Intelligence" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.filter(a => a.category === 'Business').slice(0, 3).map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/business" className="inline-flex items-center space-x-4 text-secondary font-bold uppercase tracking-[0.3em] text-[10px] group border-b border-secondary/20 pb-2 hover:text-accent hover:border-accent transition-all">
              <span>View All Business Analysis</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Opinion Preview */}
      <section className="py-24" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Executive Opinions" subtitle="The Strategic Perspective" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {opinions.slice(0, 3).map((opi) => (
              <button 
                key={opi.id} 
                className="group cursor-pointer space-y-6 text-left w-full"
                onClick={() => setSelectedOpinion(opi)}
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img src={opi.image} alt={opi.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                </div>
                  <div className="space-y-3">
                    <span className="text-accent text-[9px] font-bold uppercase tracking-widest">{opi.author}</span>
                    <h3 className="text-xl font-serif font-bold text-secondary group-hover:text-accent transition-colors">{opi.title}</h3>
                    <p className="text-xs text-gray-500 font-light italic">"{opi.tagline}"</p>
                    <div className="pt-4 flex items-center space-x-3 text-[9px] font-bold uppercase tracking-widest text-secondary group-hover:text-accent transition-all">
                       <span>Read Full Analysis</span>
                       <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
              </button>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/opinion" className="inline-flex items-center space-x-4 text-secondary font-bold uppercase tracking-[0.3em] text-[10px] group border-b border-secondary/20 pb-2 hover:text-accent hover:border-accent transition-all">
              <span>Explore All Opinions</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 6. Lifestyle Preview */}
      <section className="py-24 bg-secondary text-white relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-10">
          <img src="https://images.unsplash.com/photo-1511144080777-5e74473bba7a?q=80&w=2070&auto=format&fit=crop" alt="Lifestyle bg" className="w-full h-full object-cover" />
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="space-y-4">
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">The Luxury Archive</span>
              <h2 className="text-4xl md:text-5xl font-serif font-bold">Executive Lifestyle</h2>
            </div>
            <Link to="/lifestyle" className="text-[10px] font-bold uppercase tracking-widest border-b border-white/20 pb-2 hover:text-accent hover:border-accent transition-all">View Full Archive</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {articles.filter(a => a.category === 'Lifestyle').slice(0, 3).map((article) => (
              <Link key={article.id} to={`/article/${article.id}`} className="group space-y-6 block">
                <div className="relative aspect-video overflow-hidden">
                  <img src={article.image} alt={article.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                  <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-secondary px-6 py-2 text-[10px] font-bold uppercase tracking-widest">Read Article</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold group-hover:text-accent transition-colors">{article.title}</h3>
                  <p className="text-xs text-gray-400 font-light line-clamp-2">{article.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Events Preview */}
      <section className="py-24 border-b border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Upcoming Events" subtitle="Global Business Summits" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {events.slice(0, 3).map((event) => (
              <Link key={event.id} to="/events" className="group relative overflow-hidden bg-white border border-gray-100 hover:border-accent transition-all block">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="p-8 space-y-4">
                  <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-widest text-accent">
                    <span>{event.date}</span>
                    <span>{event.location}</span>
                  </div>
                  <h3 className="text-xl font-bold text-secondary group-hover:text-accent transition-colors">{event.title}</h3>
                  <span className="inline-block text-[10px] font-bold uppercase tracking-widest border-b border-secondary/10 pb-1 group-hover:text-accent group-hover:border-accent transition-all">Learn More</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Spotlights Preview */}
      <section className="py-24 bg-gray-50" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Corporate Spotlights" subtitle="Strategic Brand Features" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {spotlights.map((spot) => (
              <Link key={spot.id} to={`/spotlights/${spot.id}`} className="group relative aspect-[3/4] overflow-hidden">
                <img src={spot.image} alt={spot.title} className="w-full h-full object-cover transition-all duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary to-transparent opacity-60" />
                <div className="absolute bottom-0 left-0 p-8 space-y-2">
                  <span className="text-accent text-[8px] font-bold uppercase tracking-widest">Industry Leader</span>
                  <h3 className="text-lg font-bold text-white leading-tight uppercase tracking-tight">{spot.title}</h3>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-16 text-center">
            <Link to="/spotlights" className="inline-flex items-center space-x-4 text-secondary font-bold uppercase tracking-[0.3em] text-[10px] group border-b border-secondary/20 pb-2 hover:text-accent hover:border-accent transition-all">
              <span>View All Spotlights</span>
              <ArrowRight size={14} className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. AI Info Preview */}
      <section className="py-24" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2 space-y-8">
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">The AI Report 2026</span>
              <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary leading-tight tracking-tighter">The Intelligence Era.</h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed italic">"In 2026, AI is no longer a tool—it is the structural foundation of the modern enterprise. From autonomous governance to predictive operability, explore how we are architecting the future of business."</p>
              <div className="grid grid-cols-2 gap-8">
                <div className="p-6 bg-gray-50 border-l-2 border-accent">
                   <h4 className="font-bold text-secondary text-sm mb-2">Governance</h4>
                   <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest">AI Ethics & Policy</p>
                </div>
                <div className="p-6 bg-gray-50 border-l-2 border-accent">
                   <h4 className="font-bold text-secondary text-sm mb-2">Transformation</h4>
                   <p className="text-[10px] text-gray-400 leading-relaxed uppercase tracking-widest">Digital-First Strategy</p>
                </div>
              </div>
              <Link to="/ai-info" className="inline-flex items-center space-x-4 bg-secondary text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all">
                <span>Enter The AI Portal</span>
                <Cpu size={16} />
              </Link>
            </div>
            <Link to="/ai-info" className="lg:w-1/2 relative group block">
               <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=2070&auto=format&fit=crop" alt="AI Header" className="w-full shadow-2xl transition-all duration-1000 group-hover:scale-105" />
               <div className="absolute -bottom-10 -left-10 bg-white p-10 shadow-xl max-w-xs border border-gray-100">
                  <BookOpen className="text-accent mb-4" size={32} />
                  <h4 className="font-bold text-secondary mb-2">White Paper: 2026</h4>
                  <p className="text-[10px] text-gray-400 leading-relaxed">The structural shifts in global compute sovereignty.</p>
               </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal - Reader Experience */}
      <AnimatePresence>
        {selectedOpinion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-secondary/95 backdrop-blur-xl flex justify-center p-0 md:p-8"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedOpinion(null)} />
            
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white w-full max-w-7xl relative z-10 shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col lg:flex-row text-secondary"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedOpinion(null)}
                className="absolute top-6 right-6 z-[110] bg-white text-secondary p-3 rounded-full hover:bg-accent hover:text-white transition-all shadow-xl"
              >
                <X size={24} />
              </button>

              {/* Sidebar Info */}
              <div className="w-full lg:w-[450px] bg-[#FAF9F6] p-8 md:p-10 lg:p-12 border-r border-gray-100 overflow-y-auto no-scrollbar">
                <div className="space-y-10 text-left">
                  <div className="space-y-4">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.4em]">Editorial Column</span>
                    <h2 className="text-3xl font-serif font-bold text-secondary leading-tight">
                      {selectedOpinion.title}
                    </h2>
                    <div className="flex items-center space-x-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest pb-6 border-b border-gray-200">
                      <Calendar size={14} className="text-accent" />
                      <span>{selectedOpinion.date}</span>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {selectedOpinion.author[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-secondary uppercase tracking-widest">{selectedOpinion.author}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-tight">{selectedOpinion.authorRole}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed italic">
                      "Contributing Editor at The Executives Magazine, specializing in {selectedOpinion.category.toLowerCase()} and strategic forecasting."
                    </p>
                  </div>

                  {/* Strategic Highlights */}
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.3em] flex items-center">
                      <TrendingUp size={16} className="mr-3 text-accent" />
                      Strategic Highlights
                    </h4>
                    <div className="space-y-4">
                      {selectedOpinion.highlights.map((item, i) => (
                        <div key={i} className="flex items-start space-x-3 group">
                          <div className="mt-1">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          </div>
                          <span className="text-[13px] text-gray-600 font-light leading-snug group-hover:text-secondary transition-colors italic">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Analysis */}
                  <div className="space-y-6 pt-6 border-t border-gray-200">
                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.3em] flex items-center">
                      <Quote size={16} className="mr-3 text-accent" />
                      The Bottom Line
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-green-50/50 border border-green-100 rounded-lg">
                        <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest block mb-2">Short-term Impact</span>
                        <p className="text-[12px] text-gray-600 font-light leading-relaxed">{selectedOpinion.impact.shortTerm}</p>
                      </div>
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-2">Long-term Vision</span>
                        <p className="text-[12px] text-gray-600 font-light leading-relaxed">{selectedOpinion.impact.longTerm}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Reading Area */}
              <div className="flex-grow bg-white overflow-y-auto no-scrollbar">
                {/* Hero Image in Content */}
                <div className="w-full aspect-video lg:aspect-[21/9] relative">
                  <img 
                    src={selectedOpinion.image} 
                    alt={selectedOpinion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>

                <div className="p-8 md:p-16 lg:p-24 max-w-3xl mx-auto -mt-32 relative z-10 bg-white shadow-2xl md:shadow-none text-left">
                  {/* Article Content */}
                  <article className="prose prose-2xl prose-serif max-w-none">
                    <div className="mb-12">
                      <p className="text-2xl md:text-3xl text-secondary font-light italic leading-relaxed border-l-4 border-accent pl-8 py-2">
                        {selectedOpinion.tagline}
                      </p>
                    </div>

                    <div 
                      className="text-gray-600 leading-[2.1] text-xl font-light space-y-12 first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-secondary first-letter:mr-4 first-letter:float-left"
                      dangerouslySetInnerHTML={{ __html: selectedOpinion.fullArticle }}
                    />

                    {/* Pro/Con Section */}
                    <div className="my-20 grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                      <div className="space-y-6">
                        <h5 className="flex items-center text-sm font-bold text-secondary uppercase tracking-widest">
                          <CheckCircle2 size={18} className="mr-3 text-green-500" />
                          Key Advantages
                        </h5>
                        <ul className="space-y-4 list-none p-0">
                          {selectedOpinion.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-gray-500 font-light border-b border-gray-50 pb-2 italic">
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h5 className="flex items-center text-sm font-bold text-secondary uppercase tracking-widest">
                          <AlertCircle size={18} className="mr-3 text-red-500" />
                          Potential Risks
                        </h5>
                        <ul className="space-y-4 list-none p-0">
                          {selectedOpinion.cons.map((con, i) => (
                            <li key={i} className="text-sm text-gray-500 font-light border-b border-gray-50 pb-2 italic">
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Business Angle */}
                    <div className="p-12 bg-[#002147] text-white rounded-3xl relative overflow-hidden group shadow-2xl">
                      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
                        <TrendingUp size={160} />
                      </div>
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-[1px] bg-accent" />
                          <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">Investor Insight</span>
                        </div>
                        <h4 className="text-3xl font-serif font-bold leading-tight">The Strategic Perspective</h4>
                        <p className="text-gray-300 text-xl font-light leading-relaxed italic border-l-2 border-accent/30 pl-8 py-2">
                          "{selectedOpinion.businessAngle}"
                        </p>
                      </div>
                    </div>
                  </article>

                  {/* Modal Footer */}
                  <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors">
                        <Bookmark size={16} />
                        <span>Save For Later</span>
                      </button>
                      <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors">
                        <Share2 size={16} />
                        <span>Share Analysis</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => setSelectedOpinion(null)}
                      className="px-12 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl rounded-full"
                    >
                      Close Reader
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Back to Top */}
      <motion.button
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-28 right-8 z-[100] bg-secondary text-white p-4 rounded-full shadow-2xl hover:bg-accent transition-all group"
      >
        <ArrowUpRight size={24} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
      </motion.button>
    </div>
  )
}
