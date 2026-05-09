import { useParams, Link } from 'react-router-dom'
import { authors, articles } from '../lib/mockData'
import ArticleCard from '../components/ArticleCard'
import SectionHeading from '../components/SectionHeading'
import { motion } from 'framer-motion'
import { Globe, Mail, Quote } from 'lucide-react'

export default function AuthorPage() {
  const { id } = useParams()
  const author = authors.find(a => a.id === id) || authors[0]
  const authorArticles = articles.filter(a => a.authorId === author.id)

  return (
    <div className="pb-32 bg-white">
      {/* Author Header - Luxury Columnist Style - Bright */}
      <header className="relative py-32 bg-white border-b border-gray-100 text-secondary overflow-hidden" data-aos="fade-down">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
           <span className="text-[25rem] font-bold leading-none select-none -translate-x-1/4 text-secondary/10">CONTRIBUTOR</span>
        </div>
        
        <div className="container relative z-10 px-4 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
             <div className="relative">
                <div className="absolute -inset-4 border border-accent/30 rounded-full" />
                <motion.img 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  src={author.image} 
                  alt={author.name}
                  className="w-64 h-64 md:w-80 md:h-80 rounded-full object-cover shadow-2xl"
                />
                <div className="absolute -bottom-4 right-8 bg-accent p-4 shadow-2xl">
                   <Quote size={24} className="fill-white text-white" />
                </div>
             </div>
             
             <div className="flex-grow space-y-8 text-center lg:text-left">
                <div className="space-y-4">
                   <motion.span 
                     initial={{ opacity: 0, y: 10 }}
                     animate={{ opacity: 1, y: 0 }}
                     className="caps-heading mb-2 block text-accent"
                   >
                     Author Profile
                   </motion.span>
                   <motion.h1 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.1 }}
                     className="text-6xl md:text-8xl font-bold uppercase tracking-tighter leading-none text-secondary"
                   >
                     {author.name}
                   </motion.h1>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-xl md:text-2xl text-gray-400 leading-relaxed italic font-serif max-w-2xl"
                >
                  "{author.bio}"
                </motion.p>
                
                <div className="flex justify-center lg:justify-start items-center space-x-10 pt-4">
                   <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-accent transition-colors" aria-label="Twitter">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block">Twitter</span>
                   </a>
                   <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-accent transition-colors" aria-label="LinkedIn">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                      <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block">LinkedIn</span>
                   </a>
                   <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-accent transition-colors" aria-label="Website">
                      <Globe size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block">Website</span>
                   </a>
                   <a href="#" className="flex items-center space-x-3 text-gray-300 hover:text-accent transition-colors" aria-label="Contact">
                      <Mail size={18} />
                      <span className="text-[10px] font-bold uppercase tracking-widest hidden md:inline-block">Contact</span>
                   </a>
                </div>
             </div>
          </div>
        </div>
      </header>

      {/* Author Stats & More */}
      <div className="container mx-auto px-4 lg:px-8 -mt-10 relative z-20" data-aos="fade-up">
         <div className="bg-white premium-shadow p-10 flex flex-wrap justify-center gap-16 border border-gray-50">
            <div className="text-center">
               <p className="text-[9px] font-bold uppercase tracking-widest text-accent mb-2">Articles Published</p>
               <p className="text-3xl font-bold text-secondary">{authorArticles.length + 12}</p>
            </div>
            <div className="h-12 w-[1px] bg-gray-100 hidden md:block" />
            <div className="text-center">
               <p className="text-[9px] font-bold uppercase tracking-widest text-accent mb-2">Total Reads</p>
               <p className="text-3xl font-bold text-secondary">240K</p>
            </div>
            <div className="h-12 w-[1px] bg-gray-100 hidden md:block" />
            <div className="text-center">
               <p className="text-[9px] font-bold uppercase tracking-widest text-accent mb-2">Followers</p>
               <p className="text-3xl font-bold text-secondary">15.4K</p>
            </div>
         </div>
      </div>

      {/* Article Contributions */}
      <section className="py-32" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionHeading title="Latest Contributions" subtitle={`Explore insights from ${author.name}`} />
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-12">
            {authorArticles.map((article, idx) => (
              <ArticleCard key={article.id} article={article} />
            ))}
            {/* Fallback to show a full grid */}
            {authorArticles.length < 3 && articles.slice(0, 3).map((article, idx) => (
              <ArticleCard key={`more-${idx}`} article={article} />
            ))}
          </div>

          <div className="mt-32 border-t border-gray-100 pt-16 text-center">
             <button className="text-secondary font-bold uppercase tracking-[0.4em] text-[11px] hover:text-accent transition-colors flex items-center mx-auto space-x-4">
                <span>View Full Archive</span>
                <div className="w-12 h-[1px] bg-accent" />
             </button>
          </div>
        </div>
      </section>

      {/* Subscribe to Author Newsletter */}
      <section className="py-24 bg-gray-50" data-aos="fade-up">
         <div className="container mx-auto px-4 lg:px-8 max-w-4xl text-center">
            <span className="caps-heading mb-6 block">Stay Informed</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold italic text-secondary mb-12">Get {author.name.split(' ')[0]}'s weekly briefing directly in your inbox.</h2>
            <form className="flex flex-col md:flex-row gap-4">
               <input 
                 type="email" 
                 placeholder="Corporate Email Address" 
                 className="flex-grow bg-white border border-gray-200 px-8 py-5 text-sm focus:outline-none focus:border-accent transition-colors shadow-sm"
               />
               <button className="bg-secondary text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all whitespace-nowrap shadow-xl">Subscribe Now</button>
            </form>
         </div>
      </section>
    </div>
  )
}
