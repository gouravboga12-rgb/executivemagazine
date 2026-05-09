import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { articles } from '../lib/mockData'
import SectionHeading from '../components/SectionHeading'
import ArticleCard from '../components/ArticleCard'
import { motion, AnimatePresence } from 'framer-motion'
import { Filter, SlidersHorizontal, ChevronRight, TrendingUp, BookOpen, Star, ArrowUpRight, Download } from 'lucide-react'

export default function CategoryPage({ category: propCategory }) {
  const { category: urlCategory } = useParams()
  const currentCategory = propCategory || urlCategory
  
  const categoryArticles = articles.filter(a => 
    a.category.toLowerCase().includes(currentCategory.toLowerCase().replace(/-/g, ' '))
  )

  // Get 3-4 featured articles for the "pages of related content" requirement
  const featuredArticles = categoryArticles.slice(0, 4)
  const remainingArticles = categoryArticles.slice(4)
  const trendingInCategory = categoryArticles.slice(0, 3)

  const [featuredIdx, setFeaturedIdx] = useState(0)

  const isOpinion = currentCategory.toLowerCase() === 'opinion'
  const isLifestyle = currentCategory.toLowerCase() === 'lifestyle'

  if (isOpinion) {
    const featuredArticle = featuredArticles[featuredIdx] || featuredArticles[0]
    
    return (
      <div className="pb-32 bg-white">
        {/* CEO Magazine Style Split Hero */}
        <section className="relative min-h-[70vh] flex flex-col lg:flex-row bg-[#1a1a1a] overflow-hidden">
           <AnimatePresence mode="wait">
             <motion.div 
               key={featuredArticle.id}
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               exit={{ opacity: 0 }}
               transition={{ duration: 0.6 }}
               className="lg:w-[40%] p-12 md:p-24 flex flex-col justify-center space-y-8 z-10"
             >
                <span className="text-accent text-[11px] font-bold uppercase tracking-[0.5em]">Opinion</span>
                <h1 className="text-4xl md:text-6xl font-serif font-bold text-white leading-[1.1] tracking-tight">
                  {featuredArticle.title}
                </h1>
                <p className="text-gray-400 text-lg font-light leading-relaxed max-w-md">
                  {featuredArticle.subHeading || featuredArticle.excerpt}
                </p>
                <Link to={`/article/${featuredArticle.id}`} className="inline-flex items-center text-accent text-[10px] font-bold uppercase tracking-[0.3em] group">
                   Read Full Opinion <ArrowUpRight size={16} className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
             </motion.div>
           </AnimatePresence>

           <div className="lg:w-[60%] relative h-[40vh] lg:h-auto overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={featuredArticle.id}
                  initial={{ scale: 1.1, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 1.1, opacity: 0 }}
                  transition={{ duration: 0.8 }}
                  src={featuredArticle.image} 
                  alt={featuredArticle.title}
                  className={`w-full h-full ${featuredArticle.imageFit === 'contain' ? 'object-contain bg-gray-50' : 'object-cover'}`}
                  style={{ objectPosition: featuredArticle.imagePosition || 'center' }}
                />
              </AnimatePresence>
           </div>
        </section>

        {/* Featured Headlines Bar */}
        <div className="bg-white border-b border-gray-100 shadow-sm sticky top-[72px] md:top-[88px] z-40 overflow-x-auto no-scrollbar">
           <div className="container mx-auto px-4 lg:px-8">
              <div className="flex">
                 {featuredArticles.map((art, i) => (
                   <button 
                     key={art.id}
                     onClick={() => setFeaturedIdx(i)}
                     className={`flex-1 min-w-[250px] p-8 text-left border-t-4 transition-all duration-300 ${
                       featuredIdx === i ? 'border-accent bg-white shadow-lg -translate-y-1' : 'border-transparent bg-gray-50/30 hover:bg-white'
                     }`}
                   >
                      <h3 className={`text-[13px] font-bold leading-tight ${featuredIdx === i ? 'text-secondary' : 'text-gray-400'}`}>
                        {art.title}
                      </h3>
                   </button>
                 ))}
              </div>
           </div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 mt-24">
           <SectionHeading title="Latest Opinions" subtitle="Expert perspectives and deep dives" />
           
           {/* 4-Column Article Grid */}
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mt-16">
              {categoryArticles.map((article) => (
                <Link key={article.id} to={`/article/${article.id}`} className="group space-y-6">
                   <div className="aspect-[3/2] overflow-hidden bg-gray-100 relative">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className={`w-full h-full group-hover:scale-105 transition-transform duration-700 ${article.imageFit === 'contain' ? 'object-contain bg-gray-50' : 'object-cover'}`}
                        style={{ objectPosition: article.imagePosition || 'center' }}
                      />
                      <div className="absolute inset-0 bg-secondary/0 group-hover:bg-secondary/10 transition-colors" />
                   </div>
                   <div className="space-y-3">
                      <h4 className="text-xl font-serif font-bold text-secondary group-hover:text-accent transition-colors leading-tight">
                        {article.title}
                      </h4>
                   </div>
                </Link>
              ))}
           </div>

           {/* Load More */}
           <div className="mt-32 text-center">
              <button className="px-16 py-6 border border-gray-200 text-[11px] font-bold uppercase tracking-[0.4em] text-secondary hover:bg-secondary hover:text-white transition-all">
                 More Stories
              </button>
           </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pb-32 bg-white">
      {/* Existing Dynamic Header for other categories */}
      <section className="relative min-h-[60vh] flex items-center bg-white overflow-hidden border-b border-gray-100" data-aos="fade-down">
        <div className="absolute inset-0 opacity-40">
           {featuredArticles[0] && (
             <img 
               src={featuredArticles[0].image} 
               alt={currentCategory} 
               className={`w-full h-full ${featuredArticles[0].imageFit === 'contain' ? 'object-contain bg-gray-50' : 'object-cover'}`}
               style={{ objectPosition: featuredArticles[0].imagePosition || 'center' }}
             />
           )}
           <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="flex items-center space-x-4">
                <div className="h-[2px] w-12 bg-accent" />
                <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">The Editorial Archive</span>
              </div>
              <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-secondary uppercase tracking-tighter leading-none">
                {currentCategory}
              </h1>
              <p className="text-gray-500 text-xl md:text-2xl font-light italic font-serif max-w-2xl leading-relaxed">
                Exploring the frontiers of {currentCategory.toLowerCase()} through the lens of global leadership and innovation.
              </p>
              
              <div className="pt-10 flex flex-wrap gap-6">
                 {featuredArticles.slice(0, 3).map((art, i) => (
                   <div key={i} className="flex items-center space-x-3 text-secondary/40 hover:text-secondary transition-colors cursor-pointer group">
                      <span className="text-accent font-bold">0{i+1}</span>
                      <span className="text-[10px] font-bold uppercase tracking-widest border-b border-transparent group-hover:border-accent pb-1">{art.title.split(' ').slice(0, 3).join(' ')}...</span>
                   </div>
                 ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Navigation & Filters */}
      <div className="sticky top-[72px] md:top-[88px] z-40 bg-white/95 backdrop-blur-md border-b border-gray-100">
         <div className="container mx-auto px-4 lg:px-8 py-5 flex items-center justify-between">
            <div className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400">
               <Link to="/" className="hover:text-secondary transition-colors">Home</Link>
               <ChevronRight size={10} />
               <span className="text-secondary">{currentCategory}</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
               <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-secondary">
                  <TrendingUp size={14} />
                  <span>Trending</span>
               </button>
               <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-secondary">
                  <BookOpen size={14} />
                  <span>Deep Dives</span>
               </button>
            </div>
         </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8">
        <section className="py-24" data-aos="fade-up">
           <SectionHeading title="Featured Analysis" subtitle={`Top stories in ${currentCategory}`} />
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mt-12">
              {featuredArticles.slice(0, 3).map((article, idx) => (
                <div key={article.id} className="space-y-6 group">
                   <Link to={`/article/${article.id}`} className="relative overflow-hidden aspect-[16/10] bg-gray-100 block">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className={`w-full h-full group-hover:scale-105 transition-all duration-700 ${article.imageFit === 'contain' ? 'object-contain bg-gray-50' : 'object-cover'}`} 
                        style={{ objectPosition: article.imagePosition || 'center' }}
                      />
                   </Link>
                   <div className="space-y-3">
                      {!isOpinion && !isLifestyle && (
                        <span className="text-accent text-[10px] font-bold uppercase tracking-widest">{article.author}</span>
                      )}
                      <h3 className="text-2xl font-serif font-bold text-secondary group-hover:text-accent transition-colors leading-tight">
                         {article.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-2">
                         {article.excerpt}
                      </p>
                      <div className="flex items-center space-x-4 pt-2">
                         <Link to={`/article/${article.id}`} className="inline-flex items-center text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors border-b border-secondary/10 hover:border-accent">
                            Read More <ChevronRight size={12} className="ml-1" />
                         </Link>
                         {article.pdfUrl && (
                           <a href={article.pdfUrl} download className="text-accent hover:text-secondary transition-colors" title="Download PDF">
                             <Download size={14} />
                           </a>
                         )}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Section 2: Trending & Experts */}
        <section className="py-24 border-y border-gray-100" data-aos="fade-up">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                 <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-accent mb-10">Latest Intelligence</h3>
                 <div className="space-y-12">
                     {remainingArticles.map((article) => (
                       <div key={article.id} className="flex flex-col md:flex-row gap-12 group border-b border-gray-50 pb-12 last:border-0">
                          <Link to={`/article/${article.id}`} className={`md:w-1/3 overflow-hidden bg-gray-50 shadow-sm block ${article.imageFit === 'contain' ? 'h-fit' : 'aspect-[4/3]'}`}>
                             <img 
                               src={article.image} 
                               alt={article.title} 
                               className={`w-full transition-all duration-700 group-hover:scale-105 ${article.imageFit === 'contain' ? 'h-auto object-contain' : 'h-full object-cover'}`} 
                               style={{ objectPosition: article.imagePosition || 'center' }} 
                             />
                          </Link>
                          <div className="md:w-2/3 space-y-4">
                             <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-accent">
                                <span>{article.date}</span>
                                {article.category !== 'Opinion' && article.category !== 'Lifestyle' && (
                                  <>
                                    <span className="w-1 h-1 bg-gray-200 rounded-full" />
                                    <span>{article.author}</span>
                                  </>
                                )}
                             </div>
                             <h4 className="text-3xl font-serif font-bold text-secondary group-hover:text-accent transition-colors leading-tight">{article.title}</h4>
                             
                             {article.subHeading && (
                               <p className="text-accent text-xs font-bold uppercase tracking-widest italic">{article.subHeading}</p>
                             )}
                             
                             <p className="text-gray-500 text-sm font-light leading-relaxed">
                               {article.description || article.excerpt}
                             </p>

                             {article.points && (
                               <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                                  {article.points.map((point, idx) => (
                                    <li key={idx} className="flex items-start space-x-3">
                                       <div className="mt-1.5 w-1.5 h-1.5 bg-accent flex-shrink-0" />
                                       <span className="text-[11px] text-secondary font-medium leading-tight">{point}</span>
                                    </li>
                                  ))}
                               </ul>
                             )}

                             <div className="pt-4 flex items-center space-x-6">
                                <Link to={`/article/${article.id}`} className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors border-b border-secondary/10 hover:border-accent pb-1">Read Full Analysis</Link>
                                {article.pdfUrl && (
                                  <a href={article.pdfUrl} download className="text-accent hover:text-secondary transition-colors" title="Download PDF">
                                    <Download size={16} />
                                  </a>
                                ) }
                             </div>
                          </div>
                       </div>
                     ))}
                 </div>
              </div>
              <div className="lg:col-span-4">
                 <div className="bg-white border border-gray-100 p-8 md:p-12 sticky top-40">
                    <div className="flex items-center justify-between mb-10 pb-4 border-b border-gray-200">
                       <h3 className="text-lg font-bold text-secondary uppercase tracking-tighter">Most Read</h3>
                       <TrendingUp size={16} className="text-accent" />
                    </div>
                    <div className="space-y-8">
                       {trendingInCategory.map((art, i) => (
                         <div key={i} className="flex gap-4 group cursor-pointer">
                            <span className="text-3xl font-serif font-bold text-gray-100 group-hover:text-accent transition-colors">0{i+1}</span>
                            <h5 className="text-sm font-bold text-secondary leading-tight group-hover:text-accent transition-colors">{art.title}</h5>
                         </div>
                       ))}
                    </div>
                    <div className="mt-12 pt-8 border-t border-gray-200">
                       <div className="bg-gray-50 p-8 space-y-4 border border-gray-100">
                          <Star size={24} className="text-accent fill-accent" />
                          <h4 className="text-xl font-serif font-bold italic text-secondary">The Executive Edge</h4>
                          <p className="text-xs text-gray-400 leading-relaxed">Receive curated {currentCategory.toLowerCase()} insights directly in your inbox every Monday.</p>
                          <button className="w-full py-3 bg-secondary text-white text-[9px] font-bold uppercase tracking-widest hover:bg-accent transition-all">Join The Inner Circle</button>
                       </div>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Section 3: Visual Grid */}
        <section className="py-24" data-aos="fade-up">
           <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
              <div className="max-w-2xl">
                 <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold mb-4 block">Visual Perspective</span>
                 <h2 className="text-4xl md:text-6xl font-bold text-secondary tracking-tighter uppercase">In Focus</h2>
              </div>
              <button className="text-[10px] font-bold uppercase tracking-widest border-b border-secondary pb-2 hover:text-accent hover:border-accent transition-colors">View Gallery Archive</button>
           </div>
           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {categoryArticles.slice(0, 4).map((art, i) => (
                <Link key={i} to={`/article/${art.id}`} className={`relative group overflow-hidden block ${i === 0 ? 'md:col-span-2 md:row-span-2' : ''}`}>
                   <img src={art.image} alt="" className={`w-full h-full aspect-square transition-all duration-1000 group-hover:scale-110 ${art.imageFit === 'contain' ? 'object-contain bg-gray-50' : 'object-cover'}`} style={{ objectPosition: art.imagePosition || 'center' }} />
                   <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-6">
                      <span className="text-secondary bg-white px-2 py-1 text-[10px] font-bold uppercase tracking-widest line-clamp-1 shadow-lg">{art.title}</span>
                   </div>
                </Link>
              ))}
           </div>
        </section>


        {/* Load More */}
        <div className="mt-20 text-center">
           <button className="px-16 py-6 border border-gray-200 text-[11px] font-bold uppercase tracking-[0.4em] text-secondary hover:bg-secondary hover:text-white transition-all">
              Load More Archives
           </button>
        </div>
      </div>
    </div>
  )
}

