import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { articles } from '../lib/mockData'
import SectionHeading from '../components/SectionHeading'
import ArticleCard from '../components/ArticleCard'
import { Calendar, User, Tag, Share2, Bookmark, MessageSquare, Clock, Download } from 'lucide-react'
import { motion, useScroll, useSpring } from 'framer-motion'

export default function ArticleDetail() {
  const { id } = useParams()
  const article = articles.find(a => a.id === id) || articles[0]
  const relatedArticles = articles.filter(a => a.category === article.category && a.id !== article.id).slice(0, 3)
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [id])
  
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
      <header className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden bg-white border-b border-gray-100" data-aos="fade-down">
        <div className="absolute inset-0">
          <img 
            src={article.image} 
            alt={article.title} 
            className={`w-full h-full opacity-30 ${article.imageFit === 'contain' ? 'object-contain bg-gray-50' : 'object-cover'}`}
            style={{ objectPosition: article.imagePosition || 'center' }}
          />
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
              <div className="flex items-center">
                <Calendar size={14} className="mr-3 text-accent" />
                {article.date}
              </div>
              <div className="flex items-center">
                <Clock size={14} className="mr-3 text-accent" />
                8 MIN READ
              </div>
              {article.pdfUrl && (
                <a 
                  href={article.pdfUrl} 
                  download 
                  className="flex items-center text-accent hover:text-secondary transition-colors group"
                >
                  <Download size={14} className="mr-3 group-hover:animate-bounce" />
                  DOWNLOAD PDF
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </header>

      {/* Main Content Area */}
      <div className="container mx-auto px-4 lg:px-8 max-w-7xl mt-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          
          {/* Social & Utility Sidebar */}
          {article.category !== 'Opinion' && (
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
                     {article.pdfUrl && (
                       <a 
                         href={article.pdfUrl} 
                         download 
                         className="text-gray-300 hover:text-accent transition-colors mt-6"
                         title="Download PDF"
                       >
                         <Download size={24} />
                       </a>
                     )}
                  </div>
               </div>
            </aside>
          )}

          {/* Article Body */}
          <main className="lg:col-span-10 lg:col-start-2 max-w-4xl mx-auto">
            {article.category === 'Interviews' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="mb-16 relative group"
              >
                <div className="absolute -inset-4 border border-accent/20 scale-95 group-hover:scale-100 transition-transform duration-700" />
                <img 
                  src={article.image} 
                  alt={article.title} 
                  className="w-full h-auto shadow-2xl relative z-10 object-contain"
                />
                <div className="mt-4 flex items-center justify-between">
                   <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400 italic">Exclusive Interview Portrait</span>
                   <div className="h-[1px] flex-1 mx-8 bg-gray-100" />
                </div>
              </motion.div>
            )}
            <div className={`prose prose-xl max-w-none prose-headings:font-serif prose-headings:text-secondary prose-p:text-text prose-p:leading-[1.9] prose-p:mb-12 text-xl font-light ${article.category === 'Opinion' ? 'prose-opinion' : ''}`}>
              <p className="text-2xl text-secondary font-medium leading-relaxed mb-16 italic">
                {article.subHeading || article.excerpt}
              </p>
              
              <div className="space-y-10">
                {article.description && (
                  <p className="text-xl text-gray-600 leading-relaxed">
                    {article.description}
                  </p>
                )}

                {article.points && (
                  <div className="my-16 bg-secondary text-white p-12 md:p-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 -translate-y-1/2 translate-x-1/2 rounded-full" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.4em] text-accent mb-10">Key Takeaways</h3>
                    <ul className="space-y-8">
                      {article.points?.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-6 group">
                          <span className="text-accent font-serif text-4xl font-bold opacity-40 group-hover:opacity-100 transition-opacity">0{idx + 1}</span>
                          <p className="text-lg md:text-xl font-light leading-relaxed pt-2">
                            {point}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

                <div className="mt-16 space-y-16" data-aos="fade-up">
                  <div 
                    className="article-premium-content prose prose-xl max-w-none text-gray-700 leading-relaxed space-y-8"
                    dangerouslySetInnerHTML={{ __html: article.content || article.fullArticle || article.description }} 
                  />

                  {/* Highlights Section */}
                  {article.highlights && (
                    <div className="space-y-10 pt-20 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Strategic Highlights</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {article.highlights.map((h, i) => (
                          <div key={i} className="p-6 bg-gray-50 border border-gray-100 hover:border-accent transition-all flex items-start gap-4">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2 flex-shrink-0" />
                            <p className="text-sm font-bold text-secondary leading-tight">{h}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Pros & Cons */}
                  {(article.pros || article.cons) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-16 pt-20 border-t border-gray-100">
                      {article.pros && (
                        <div className="space-y-8">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-green-600 flex items-center gap-3">
                            <div className="h-[2px] w-8 bg-green-600" />
                            Key Advantages
                          </h4>
                          <ul className="space-y-4">
                            {article.pros.map((p, i) => (
                              <li key={i} className="flex items-start gap-4 text-sm text-gray-500 font-light">
                                <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-1.5 flex-shrink-0" />
                                {p}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {article.cons && (
                        <div className="space-y-8">
                          <h4 className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-600 flex items-center gap-3">
                            <div className="h-[2px] w-8 bg-red-600" />
                            Challenges
                          </h4>
                          <ul className="space-y-4">
                            {article.cons.map((c, i) => (
                              <li key={i} className="flex items-start gap-4 text-sm text-gray-500 font-light">
                                <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-1.5 flex-shrink-0" />
                                {c}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Impact Analysis */}
                  {article.impact && (
                    <div className="space-y-10 pt-20 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Impact Analysis</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-secondary text-white relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                              <TrendingUp size={80} />
                           </div>
                           <h5 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">Short-term Outlook</h5>
                           <p className="text-base font-light leading-relaxed relative z-10">{article.impact.shortTerm}</p>
                        </div>
                        <div className="p-8 bg-gray-50 border border-gray-100 relative overflow-hidden group">
                           <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                              <TrendingUp size={80} />
                           </div>
                           <h5 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">Long-term Vision</h5>
                           <p className="text-base text-gray-600 font-light leading-relaxed relative z-10">{article.impact.longTerm}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Business Angle */}
                  {article.businessAngle && (
                    <div className="bg-accent/5 p-12 md:p-16 border-l-8 border-accent space-y-6 mt-20">
                      <div className="flex items-center gap-4 text-accent">
                        <ArrowUpRight size={32} />
                        <h4 className="text-xs font-bold uppercase tracking-[0.5em]">The Strategic Perspective</h4>
                      </div>
                      <p className="text-2xl font-serif italic text-secondary leading-relaxed">
                        "{article.businessAngle}"
                      </p>
                    </div>
                  )}
                 
                  {article.tagline && (
                    <div className="space-y-16 border-t border-gray-100 pt-20">
                      <div className="bg-secondary text-white p-16 relative overflow-hidden group">
                         <div className="absolute top-0 right-0 w-96 h-96 bg-accent/10 -translate-y-1/2 translate-x-1/2 rounded-full group-hover:scale-110 transition-transform duration-1000" />
                         <span className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent mb-8 block">Executive Insight</span>
                         <p className="text-3xl font-serif leading-relaxed relative z-10 italic">
                           "{article.tagline}"
                         </p>
                      </div>
                    </div>
                  )}

                  {article.futureOutlook && (
                    <div className="p-12 bg-gray-50 border-y border-gray-100 space-y-4">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">Future Outlook</span>
                      <p className="text-xl font-serif italic text-secondary">{article.futureOutlook}</p>
                    </div>
                  )}
              </div>
            </div>

            {/* Tags & Credits */}
            <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-8">
               <div className="flex flex-wrap gap-4">
                  {article.tags?.map(tag => (
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

          </main>


        </div>
      </div>


      {/* Footer Related Section */}
      <section className="mt-32 pt-32 border-t border-gray-100 bg-gray-50/50 pb-20" data-aos="fade-up">
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
