import { useEffect } from 'react'
import Hero from '../components/Hero'
import SectionHeading from '../components/SectionHeading'
import ArticleCard from '../components/ArticleCard'
import { articles } from '../lib/mockData'
import { Calendar, Award, Lightbulb, TrendingUp, Star } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Home() {
  const featuredArticle = articles.find(a => a.featured)
  const trendingArticles = articles.filter(a => a.trending)
  
  return (
    <div className="pb-20">
      {/* Hero Section */}
      <Hero article={featuredArticle} />

      {/* Breaking News Ticker (Premium touch) - Bright */}
      <div className="bg-white overflow-hidden py-4 border-y border-gray-100 shadow-sm">
        <div className="flex animate-marquee whitespace-nowrap">
           {[...Array(10)].map((_, i) => (
             <span key={i} className="text-secondary/60 text-[10px] font-bold uppercase tracking-[0.3em] mx-12 flex items-center">
               <Star size={10} className="mr-4 text-accent fill-accent" />
               Global Leadership Summit 2024: Tickets now available
             </span>
           ))}
        </div>
      </div>

      {/* Editor's Featured Selection */}
      <section className="py-24">
        <div className="container mx-auto px-4 lg:px-8">
           <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              <div className="lg:col-span-8">
                 <SectionHeading title="Editor's Choice" subtitle="Featured Analysis" />
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    {articles.slice(1, 3).map((article, idx) => (
                      <ArticleCard key={article.id} article={article} />
                    ))}
                 </div>
              </div>
              <div className="lg:col-span-4">
                 <div className="bg-gray-50 p-10 border border-gray-100">
                    <h3 className="flex items-center text-xl font-serif font-bold text-secondary mb-10 pb-4 border-b border-gray-200">
                       <TrendingUp className="mr-4 text-accent" size={24} /> Trending Stories
                    </h3>
                    <div className="space-y-10">
                       {trendingArticles.slice(0, 4).map((article, idx) => (
                         <div key={article.id} className="flex gap-6 group">
                            <span className="text-4xl font-serif font-bold text-gray-200 group-hover:text-accent transition-colors duration-500">0{idx + 1}</span>
                            <div className="space-y-2">
                               <span className="text-[9px] font-bold uppercase tracking-widest text-accent">{article.category}</span>
                               <h4 className="text-md font-bold text-secondary leading-tight group-hover:text-accent cursor-pointer transition-colors">{article.title}</h4>
                            </div>
                         </div>
                       ))}
                    </div>
                    <button className="w-full mt-12 py-4 border border-secondary text-secondary text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all">
                       See All Trending
                    </button>
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Large Immersive Section: The Interview Series */}
      <section className="py-32 bg-gray-50 text-secondary relative overflow-hidden border-y border-gray-100">
         <div className="absolute top-0 right-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop')] bg-fixed bg-cover opacity-5" />
         <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="text-center max-w-4xl mx-auto mb-20">
               <span className="text-accent uppercase tracking-[0.4em] text-xs font-bold mb-6 block">Exclusive Content</span>
               <h2 className="text-4xl md:text-6xl font-serif font-bold tracking-tight mb-8">The Interview Series</h2>
               <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed">
                  Go behind the scenes with the world's most influential executives, founders, and thought leaders.
               </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {articles.filter(a => a.category === "Interviews").slice(0, 3).map((article, idx) => (
                 <ArticleCard key={article.id} article={article} variant="magazine" />
               ))}
            </div>
         </div>
      </section>

      {/* Spotlight Section - Luxury Layout */}
      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-8">
           <div className="flex flex-col lg:flex-row items-center gap-20 mb-24">
              <div className="lg:w-1/2 relative" data-aos="fade-right">
                 <div className="absolute -top-10 -left-10 w-40 h-40 bg-accent/10 -z-10" />
                 <img 
                   src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop" 
                   alt="Spotlight"
                   className="w-full premium-shadow"
                 />
                 <div className="absolute bottom-10 right-10 bg-white p-10 shadow-2xl max-w-xs">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-widest block mb-4">Special Report</span>
                    <h3 className="text-2xl font-serif font-bold text-secondary mb-4">Architecture of Power</h3>
                    <p className="text-xs text-gray-500 leading-relaxed">An exploration of how modern corporate HQs are redefining productivity and brand identity.</p>
                 </div>
              </div>
              <div className="lg:w-1/2 space-y-10" data-aos="fade-left">
                 <span className="text-accent uppercase tracking-[0.3em] text-xs font-bold">Innovation Focus</span>
                 <h2 className="text-3xl md:text-5xl font-bold text-secondary leading-tight uppercase tracking-tighter">Spotlight on Future Cities</h2>
                 <p className="text-lg text-gray-500 leading-relaxed font-light">
                    As urbanization accelerates, we look at the leaders shaping the sustainable, tech-integrated metropolises of tomorrow.
                 </p>
                 <div className="grid grid-cols-2 gap-10">
                    <div className="space-y-4">
                       <h4 className="text-3xl font-serif font-bold text-secondary">40%</h4>
                       <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Increase in Smart Infrastructure</p>
                    </div>
                    <div className="space-y-4">
                       <h4 className="text-3xl font-serif font-bold text-secondary">2030</h4>
                       <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Global Target for Sustainability</p>
                    </div>
                 </div>
                 <button className="group flex items-center space-x-4 text-secondary font-bold uppercase tracking-widest text-xs border-b border-secondary pb-2 hover:text-accent hover:border-accent transition-all">
                    <span>Explore The Full Series</span>
                    <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                 </button>
              </div>
           </div>
        </div>
      </section>

      {/* Monthly Edition Promo */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-4xl mx-auto space-y-12">
               <h2 className="text-3xl md:text-4xl font-serif font-bold text-secondary leading-tight italic">
                  "The premier destination for business leadership, innovation, and executive lifestyle."
               </h2>
               <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                  <div className="flex -space-x-4">
                     {[1, 2, 3, 4].map(i => (
                       <div key={i} className="w-12 h-12 rounded-full border-2 border-white bg-gray-200 overflow-hidden">
                          <img src={`https://i.pravatar.cc/100?u=${i}`} alt="Executive" />
                       </div>
                     ))}
                     <div className="w-12 h-12 rounded-full border-2 border-white bg-secondary flex items-center justify-center text-white text-[10px] font-bold">+50k</div>
                  </div>
                  <p className="text-sm text-gray-500 font-bold uppercase tracking-widest">Join 50,000+ Global Executives</p>
                  <button className="bg-white border border-gray-200 text-secondary px-10 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all">Get Digital Access</button>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}

function ArrowRight({ size, className }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size} 
      height={size} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round"
      className={className}
    >
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </svg>
  )
}
