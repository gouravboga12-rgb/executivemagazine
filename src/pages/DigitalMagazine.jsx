import { motion } from 'framer-motion'
import { BookOpen, Download, ChevronRight, Star } from 'lucide-react'

export default function DigitalMagazine() {
  const editions = [
    { month: 'May 2024', issue: '104', title: 'The AI Revolution', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2074&auto=format&fit=crop' },
    { month: 'April 2024', issue: '103', title: 'Sustainable Power', image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop' },
    { month: 'March 2024', issue: '102', title: 'The Next Billion', image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop' },
    { month: 'February 2024', issue: '101', title: 'Global Shifts', image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop' },
  ]

  return (
    <div className="pb-32">
      {/* Cinematic Header - Bright */}
      <section className="bg-white border-b border-gray-100 text-secondary py-32 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full opacity-5 pointer-events-none">
           <span className="text-[30rem] font-bold leading-none select-none text-secondary/10">EDITIONS</span>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="caps-heading mb-6 block text-accent"
          >
            Digital Archive
          </motion.span>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
             <motion.h1 
               initial={{ opacity: 0, x: -20 }}
               animate={{ opacity: 1, x: 0 }}
               className="text-6xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-none text-secondary"
             >
               Digital <br/> <span className="text-accent italic font-serif lowercase tracking-normal">Library</span>
             </motion.h1>
             <div className="max-w-md lg:pb-6">
                <p className="text-gray-400 text-lg md:text-xl font-light italic font-serif mb-8 leading-relaxed">
                   Experience our monthly publications in a pixel-perfect digital format, optimized for every device.
                </p>
                <button className="bg-secondary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all">Full Access Pass</button>
             </div>
          </div>
        </div>
      </section>

      {/* Featured Current Edition */}
      <section className="py-32 bg-gray-50 border-b border-gray-100">
         <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
               <div className="lg:col-span-5 relative group">
                  <div className="absolute -inset-6 border-2 border-accent/10 group-hover:border-accent transition-colors duration-1000" />
                  <img src={editions[0].image} alt="Current Issue" className="w-full shadow-[0_50px_100px_rgba(0,0,0,0.1)] transition-all duration-1000" />
                  <div className="absolute top-10 right-10 bg-accent text-white p-6 shadow-2xl">
                     <Star size={24} className="fill-white" />
                  </div>
               </div>
               <div className="lg:col-span-7 space-y-10">
                  <div className="space-y-4">
                     <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block">Now Available</span>
                     <h2 className="text-5xl md:text-7xl font-bold text-secondary tracking-tighter uppercase">{editions[0].month} Edition</h2>
                     <p className="text-2xl font-serif font-bold text-secondary/60 italic">{editions[0].title}</p>
                  </div>
                  <p className="text-gray-500 text-lg leading-relaxed max-w-xl font-light">
                     Our latest issue explores the deep integration of generative AI within the corporate landscape, featuring exclusive interviews with Fortune 500 CEOs and leading tech innovators.
                  </p>
                  <div className="grid grid-cols-2 gap-12 border-y border-gray-200 py-10">
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Issue No.</h4>
                        <p className="text-2xl font-bold text-secondary">#{editions[0].issue}</p>
                     </div>
                     <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Pages</h4>
                        <p className="text-2xl font-bold text-secondary">168</p>
                     </div>
                  </div>
                  <div className="flex flex-wrap gap-6 pt-4">
                     <button className="flex items-center space-x-4 bg-secondary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all">
                        <BookOpen size={16} />
                        <span>Read Edition</span>
                     </button>
                     <button className="flex items-center space-x-4 border border-secondary text-secondary px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all">
                        <Download size={16} />
                        <span>Download PDF</span>
                     </button>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Grid of Past Editions */}
      <section className="py-32">
         <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
               <div>
                  <span className="caps-heading mb-4 block">Archive</span>
                  <h2 className="text-4xl md:text-6xl font-bold text-secondary tracking-tighter uppercase">Past Editions</h2>
               </div>
               <div className="flex space-x-4">
                  <select className="bg-transparent border-b-2 border-secondary py-2 text-xs font-bold uppercase tracking-widest focus:outline-none">
                     <option>2024</option>
                     <option>2023</option>
                     <option>2022</option>
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                {editions.slice(1).map((edition, i) => (
                  <motion.div 
                    key={i}
                    whileHover={{ y: -10 }}
                    className="group cursor-pointer"
                  >
                     <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl mb-8">
                        <img src={edition.image} alt={edition.month} className="w-full h-full object-cover transition-all duration-1000" />
                        <div className="absolute inset-0 bg-white/10 group-hover:bg-white/0 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                           <button className="bg-white text-secondary px-8 py-4 font-bold text-[10px] uppercase tracking-widest shadow-2xl hover:bg-accent hover:text-white transition-all">View Issue</button>
                        </div>
                     </div>
                     <div className="space-y-2 text-center">
                        <h3 className="text-xs font-bold text-secondary uppercase tracking-[0.2em] group-hover:text-accent transition-colors">{edition.month} Edition</h3>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest">Issue #{edition.issue}</p>
                     </div>
                  </motion.div>
                ))}
               {/* Just to fill space */}
               {[...Array(5)].map((_, i) => (
                 <motion.div key={`extra-${i}`} className="group opacity-40 hover:opacity-100 transition-opacity">
                    <div className="relative aspect-[3/4] bg-gray-50 border-2 border-dashed border-gray-200 flex items-center justify-center">
                       <span className="text-[10px] font-bold uppercase tracking-widest text-gray-300">Edition Coming Soon</span>
                    </div>
                 </motion.div>
               ))}
            </div>
         </div>
      </section>

       {/* Subscription CTA - Lightened */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
         <div className="bg-gray-50 border border-gray-100 p-12 md:p-24 text-secondary text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 -translate-x-1/2 -translate-y-1/2 rounded-full" />
            <div className="relative z-10 space-y-10">
               <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-balance">The Executive Access Pass</h2>
               <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
                  Gain unlimited access to our entire digital archive, exclusive webinars, and early bird access to our global events.
               </p>
               <div className="flex flex-col md:flex-row justify-center gap-8 pt-6">
                  <div className="text-left space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Monthly</p>
                     <p className="text-3xl font-bold">$12.99 <span className="text-sm font-normal text-gray-300">/mo</span></p>
                  </div>
                  <div className="h-12 w-[1px] bg-gray-200 hidden md:block" />
                  <div className="text-left space-y-2">
                     <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Annual (Best Value)</p>
                     <p className="text-3xl font-bold">$99.00 <span className="text-sm font-normal text-gray-300">/yr</span></p>
                  </div>
               </div>
               <button className="bg-secondary text-white px-12 py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all">Choose Plan</button>
            </div>
         </div>
      </section>
    </div>
  )
}
