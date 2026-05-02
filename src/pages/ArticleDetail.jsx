import { useParams, Link } from 'react-router-dom'
import { articles } from '../lib/mockData'
import SectionHeading from '../components/SectionHeading'
import ArticleCard from '../components/ArticleCard'
import { Calendar, User, Tag, Share2, Bookmark, MessageSquare, Clock } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = articles.find(a => a.id === id) || articles[0]
  const relatedArticles = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
  
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  })

  return (
    <div className="pb-20 bg-white">
      {/* Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-accent z-[100] origin-left" style={{ scaleX }} />

      {/* Hero Header - Light */}
      <header className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute inset-0">
          <img src={article.image} alt={article.title} className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        </div>
        
        <div className="container relative h-full mx-auto px-4 lg:px-8 flex flex-col justify-end pb-24">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-5xl"
          >
            <span className="inline-block px-4 py-2 bg-accent text-white text-[10px] font-bold uppercase tracking-[0.3em] mb-8 shadow-2xl">
              {article.category}
            </span>
            <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold text-secondary leading-[0.95] tracking-tighter text-balance mb-12">
              {article.title}
            </h1>
            <div className="flex flex-wrap items-center gap-10 text-[10px] text-secondary font-bold uppercase tracking-[0.2em] border-t border-secondary/10 pt-8">
              <Link to={`/author/${article.authorId}`} className="flex items-center hover:text-accent transition-colors">
                <User size={14} className="mr-3 text-accent" />
                BY {article.author}
              </Link>
              <div className="flex items-center">
                <Calendar size={14} className="mr-3 text-accent" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-3 text-accent" />
                8 MIN READ
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Social & Utility Sidebar */}
          <aside className="hidden lg:block lg:col-span-1">
             <div className="sticky top-40 space-y-12 flex flex-col items-center">
                <div className="flex flex-col items-center space-y-6">
                   <span className="text-[9px] font-bold uppercase tracking-widest text-gray-300 transform -rotate-90 mb-6">Share</span>
                   <button className="p-4 bg-gray-50 text-secondary hover:bg-secondary hover:text-white transition-all rounded-full" aria-label="Facebook">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                   </button>
                   <button className="p-4 bg-gray-50 text-secondary hover:bg-secondary hover:text-white transition-all rounded-full" aria-label="Twitter">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                   </button>
                   <button className="p-4 bg-gray-50 text-secondary hover:bg-secondary hover:text-white transition-all rounded-full" aria-label="LinkedIn">
                     <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                   </button>
                </div>
                <div className="h-[1px] w-8 bg-gray-100" />
                <div className="flex flex-col items-center space-y-6">
                   <button className="text-gray-300 hover:text-accent transition-colors"><Bookmark size={24} /></button>
                   <button className="text-gray-300 hover:text-accent transition-colors"><MessageSquare size={24} /></button>
                </div>
             </div>
          </aside>

          {/* Article Body */}
          <main className="lg:col-span-8">
            <div className="prose prose-xl max-w-none prose-headings:font-serif prose-headings:text-secondary prose-p:text-text prose-p:leading-[1.8] prose-p:mb-10 text-xl font-light">
              <p className="drop-cap text-2xl text-secondary font-medium leading-relaxed mb-16 italic">
                {article.excerpt}
              </p>
              
              <p>
                In the rapidly evolving landscape of global enterprise, the concept of leadership is undergoing a profound transformation. As digital disruption becomes the norm rather than the exception, executives are finding themselves at the forefront of a new era—one defined by radical transparency, ethical innovation, and the strategic integration of artificial intelligence.
              </p>

              <div className="my-16 relative py-12 px-10 bg-gray-50 text-secondary overflow-hidden border border-gray-100">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 -translate-y-1/2 translate-x-1/2 rounded-full" />
                 <span className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] mb-6 block">Executive Perspective</span>
                 <h3 className="text-3xl md:text-4xl font-serif font-bold italic leading-tight">
                   "Success in the modern era is not measured by the scale of your operations, but by the speed of your adaptability and the depth of your purpose."
                 </h3>
                 <p className="mt-8 text-sm font-bold uppercase tracking-[0.2em]">— Marcus Thorne, CEO of Nexus Corp</p>
              </div>

              <h2 className="text-4xl font-bold mt-20 mb-10 tracking-tight text-secondary">The Paradigm of Adaptability</h2>
              <p>
                The shift towards more agile organizational structures is no longer a choice but a survival imperative. Traditional hierarchies are giving way to collaborative networks where data-driven decision-making is balanced with human-centric empathy. This intersection of "hard" tech and "soft" skills is where the next generation of industry titans will be forged.
              </p>

              <img 
                src="https://images.unsplash.com/photo-1454165833767-13a6b461126c?q=80&w=2070&auto=format&fit=crop" 
                alt="Strategic Leadership"
                className="w-full h-auto my-16 premium-shadow"
              />

              <p>
                As we look towards the next decade, the role of the CEO will increasingly resemble that of a Chief Vision Officer. Navigating the complexities of geopolitical shifts, climate mandates, and workforce expectations requires a level of multi-dimensional thinking that transcends simple profit-and-loss statements.
              </p>
            </div>

            {/* Tags & Credits */}
            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-8">
               <div className="flex flex-wrap gap-4">
                  {article.tags.map(tag => (
                    <Link key={tag} to={`/tag/${tag}`} className="text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors">#{tag}</Link>
                  ))}
               </div>
               <div className="flex items-center space-x-6">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Share This Story</span>
                  <div className="flex space-x-4">
                     <button className="text-secondary hover:text-accent transition-colors"><Share2 size={18} /></button>
                     <button className="text-secondary hover:text-accent transition-colors"><Bookmark size={18} /></button>
                  </div>
               </div>
            </div>

            {/* Premium Author Card */}
            <div className="mt-24 bg-gray-50 p-12 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden border border-gray-100 shadow-sm">
               <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 -translate-y-1/2 translate-x-1/2 rounded-full" />
               <img src={article.authorImage || "https://i.pravatar.cc/300"} alt={article.author} className="w-32 h-32 rounded-full object-cover relative z-10 border-4 border-white shadow-lg" />
               <div className="space-y-4 relative z-10 text-center md:text-left">
                  <span className="caps-heading mb-2">Written By</span>
                  <h4 className="text-3xl font-serif font-bold text-secondary">{article.author}</h4>
                  <p className="text-gray-500 text-sm leading-relaxed max-w-xl">
                    A multi-award winning journalist specializing in global economics and leadership psychology. With a background in investigative reporting, James provides unparalleled depth to our business coverage.
                  </p>
                  <Link to={`/author/${article.authorId}`} className="inline-block text-xs font-bold uppercase tracking-[0.2em] text-accent hover:text-secondary transition-colors border-b border-accent pb-1">View Full Profile</Link>
               </div>
            </div>
          </main>

          {/* Right Sidebar: Next Stories */}
          <aside className="lg:col-span-3 space-y-20">
             <div>
                <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-secondary mb-10 pb-4 border-b border-gray-100">Most Popular</h3>
                <div className="space-y-10">
                   {articles.slice(0, 4).map((a, i) => (
                     <Link key={a.id} to={`/article/${a.id}`} className="flex flex-col space-y-4 group">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-accent">0{i + 1} / {a.category}</span>
                        <h4 className="text-lg font-bold text-secondary group-hover:text-accent leading-tight transition-colors">{a.title}</h4>
                     </Link>
                   ))}
                </div>
             </div>

             <div className="bg-gray-50 border border-gray-100 p-10 text-secondary text-center">
                <span className="text-accent text-[9px] font-bold uppercase tracking-widest block mb-6">Weekly Briefing</span>
                <h4 className="text-2xl font-serif font-bold mb-6 italic text-balance">The Executive Summary</h4>
                <p className="text-gray-400 text-xs mb-8 leading-relaxed">Join 200,000+ subscribers for a curated look at the world of business.</p>
                <form className="space-y-4">
                   <input type="email" placeholder="Email Address" className="w-full bg-white border border-gray-200 px-4 py-4 text-xs text-secondary focus:outline-none focus:border-accent" />
                   <button className="w-full bg-secondary text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all">Subscribe Now</button>
                </form>
             </div>
          </aside>

        </div>
      </div>


      {/* Footer Related Section */}
      <section className="mt-32 pt-32 border-t border-gray-100 bg-gray-50/50 pb-20">
         <div className="container mx-auto px-4 lg:px-8">
            <SectionHeading title="Further Reading" subtitle="Explore More Insights" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
               {relatedArticles.map(article => (
                 <ArticleCard key={article.id} article={article} />
               ))}
            </div>
         </div>
      </section>
    </div>
  )
}
