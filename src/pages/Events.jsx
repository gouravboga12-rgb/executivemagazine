import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, MapPin, ChevronRight, X, Info, 
  TrendingUp, Zap, Target, Globe, Shield, 
  Cpu, Rocket, Landmark, Building2, Trophy, ArrowUpRight, Plus, Minus
} from 'lucide-react'
import { events } from '../lib/eventsData'

const categoryIcons = {
  "Economy & Policy": <Landmark size={18} />,
  "Technology": <Cpu size={18} />,
  "Startups": <Rocket size={18} />,
  "Fintech": <Zap size={18} />,
  "Global Affairs": <Globe size={18} />,
  "Infrastructure": <Building2 size={18} />,
  "Workforce": <Target size={18} />,
  "Defence": <Shield size={18} />,
  "Strategic": <Shield size={18} />,
  "Sports Business": <Trophy size={18} />
}

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [filter, setFilter] = useState('All')

  const categories = ['All', ...new Set(events.map(e => e.category))]
  const filteredEvents = filter === 'All' ? events : events.filter(e => e.category === filter)
  
  const featuredEvent = filteredEvents[0]
  const otherEvents = filteredEvents.slice(1)

  useEffect(() => {
    if (selectedEvent) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [selectedEvent])

  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Premium Editorial Header */}
      <section className="bg-white pt-24 pb-16 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block">Archive & Insights</span>
            <h1 className="text-5xl md:text-7xl font-bold text-secondary tracking-tighter uppercase mb-6 leading-tight">
              Executive <span className="italic font-serif normal-case text-accent">Events</span> & Summits
            </h1>
            <p className="text-gray-500 text-lg md:text-xl font-light leading-relaxed max-w-2xl font-serif">
              Deep-dive analysis of the pivotal milestones, global summits, and strategic shifts defining the economic landscape of 2026.
            </p>
          </div>
        </div>
      </section>

      {/* Filter Navigation */}
      <div className="sticky top-[80px] z-30 bg-white border-b border-gray-50 shadow-sm">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`whitespace-nowrap text-[9px] font-bold uppercase tracking-widest transition-all px-2 py-2 border-b-2 ${
                  filter === cat ? 'border-accent text-secondary' : 'border-transparent text-gray-300 hover:text-secondary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 mt-16">
        {/* Featured Event Section */}
        {featuredEvent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-24 group cursor-pointer"
            onClick={() => setSelectedEvent(featuredEvent)}
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-8 overflow-hidden bg-gray-50 aspect-[16/9] lg:aspect-auto lg:h-[500px] shadow-2xl relative">
                <img 
                  src={featuredEvent.image} 
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-105"
                />
                <div className="absolute top-6 left-6 bg-white px-4 py-2 text-secondary shadow-lg flex items-center gap-3">
                  {categoryIcons[featuredEvent.category]}
                  <span className="text-[10px] font-bold uppercase tracking-widest">{featuredEvent.category}</span>
                </div>
              </div>
              <div className="lg:col-span-4 space-y-8">
                <div className="flex items-center gap-4 text-[10px] font-bold text-accent uppercase tracking-[0.3em]">
                  <Calendar size={14} />
                  <span>{featuredEvent.date}</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-bold text-secondary leading-none uppercase tracking-tighter">
                  {featuredEvent.title}
                </h2>
                <p className="text-gray-500 text-lg leading-relaxed font-serif italic border-l-2 border-accent pl-6">
                  {featuredEvent.tagline}
                </p>
                <button className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors">
                  Read Full Analysis <ChevronRight size={14} />
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Other Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-20">
          {otherEvents.map((event, idx) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              onClick={() => setSelectedEvent(event)}
              className="group cursor-pointer flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden mb-8 shadow-sm group-hover:shadow-xl transition-all duration-500">
                <img 
                  src={event.image} 
                  alt={event.title}
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 text-secondary text-[9px] font-bold uppercase tracking-widest flex items-center gap-2">
                  {categoryIcons[event.category]}
                  {event.category}
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[9px] font-bold text-accent uppercase tracking-widest">
                  <span>{event.date}</span>
                  <span className="text-gray-200">|</span>
                  <span>{event.location}</span>
                </div>
                <h3 className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors leading-tight uppercase tracking-tight">
                  {event.title}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed line-clamp-2">
                  {event.tagline}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Detail Overlay */}
      <AnimatePresence>
        {selectedEvent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <div className="absolute inset-0 bg-secondary/95 backdrop-blur-xl" onClick={() => setSelectedEvent(null)} />
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              className="bg-white w-full max-w-6xl h-full max-h-[90vh] overflow-y-auto relative z-10 shadow-2xl no-scrollbar"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedEvent(null)}
                className="absolute top-6 right-6 p-3 bg-gray-50 hover:bg-accent hover:text-white text-secondary transition-all z-20 rounded-full"
              >
                <X size={24} />
              </button>

              <div className="grid grid-cols-1 lg:grid-cols-12 h-full">
                {/* Left: Poster/Info */}
                <div className="lg:col-span-5 bg-secondary text-white p-12 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute inset-0 opacity-20 pointer-events-none">
                    <img src={selectedEvent.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 bg-accent text-white px-4 py-2 w-fit mb-8 text-[10px] font-bold uppercase tracking-[0.3em]">
                      {categoryIcons[selectedEvent.category]}
                      {selectedEvent.category}
                    </div>
                    <h2 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 leading-none uppercase">
                      {selectedEvent.title}
                    </h2>
                    <p className="text-accent text-lg font-serif italic mb-12">
                      {selectedEvent.tagline}
                    </p>
                    <div className="space-y-6">
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <Calendar size={18} className="text-accent" />
                        <span>Date: {selectedEvent.date}</span>
                      </div>
                      <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-gray-400">
                        <MapPin size={18} className="text-accent" />
                        <span>Location: {selectedEvent.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 pt-20 border-t border-white/10">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/40 mb-4 block">Strategic Forecast</span>
                    <p className="text-xl font-light italic text-white/80 leading-relaxed">
                      "{selectedEvent.futureOutlook}"
                    </p>
                  </div>
                </div>

                {/* Right: Detailed Structured Info */}
                <div className="lg:col-span-7 p-8 md:p-20 overflow-y-auto bg-white no-scrollbar">
                  <div className="max-w-3xl mx-auto space-y-12">
                    {/* 1. Full Analysis */}
                    <div className="space-y-6">
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Full Analysis</span>
                      </div>
                      <div 
                        className="prose prose-lg prose-serif max-w-none text-gray-600 space-y-6"
                        dangerouslySetInnerHTML={{ __html: selectedEvent.fullArticle || selectedEvent.description }}
                      />
                    </div>

                    {/* 2. Key Highlights */}
                    <div className="space-y-8 pt-12 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-secondary" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-secondary">Key Strategic Highlights</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {selectedEvent.highlights.map((h, i) => (
                          <div key={i} className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-100">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full mt-1.5 flex-shrink-0" />
                            <p className="text-xs font-bold text-secondary leading-tight">{h}</p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* 3. Pros & Cons */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                      <div className="space-y-8">
                        <div className="flex items-center gap-3">
                          <div className="h-[2px] w-12 bg-green-500" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-green-500 uppercase">Advantages</span>
                        </div>
                        <ul className="space-y-4">
                          {selectedEvent.pros.map((p, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                              <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                              {p}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-8">
                        <div className="flex items-center gap-3">
                          <div className="h-[2px] w-12 bg-red-500" />
                          <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-red-500 uppercase">Challenges</span>
                        </div>
                        <ul className="space-y-4">
                          {selectedEvent.cons.map((c, i) => (
                            <li key={i} className="flex items-center gap-3 text-sm text-gray-500">
                              <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* 4. Impact Analysis */}
                    <div className="space-y-8 pt-12 border-t border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-accent" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-accent">Impact Analysis</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="p-8 bg-secondary text-white relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-10">
                              <TrendingUp size={64} />
                           </div>
                           <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">Short Term</h4>
                           <p className="text-sm font-light leading-relaxed">{selectedEvent.impact.shortTerm}</p>
                        </div>
                        <div className="p-8 bg-gray-50 border border-gray-100 relative overflow-hidden">
                           <div className="absolute top-0 right-0 p-4 opacity-5">
                              <TrendingUp size={64} />
                           </div>
                           <h4 className="text-[10px] font-bold uppercase tracking-widest text-secondary mb-4">Long Term</h4>
                           <p className="text-sm text-gray-600 font-light leading-relaxed">{selectedEvent.impact.longTerm}</p>
                        </div>
                      </div>
                    </div>

                    {/* 5. Business Angle */}
                    <div className="bg-accent/5 p-12 border-l-4 border-accent space-y-6">
                      <div className="flex items-center gap-3 text-accent">
                        <ArrowUpRight size={24} />
                        <h4 className="text-xs font-bold uppercase tracking-[0.4em]">Business Angle</h4>
                      </div>
                      <p className="text-xl font-serif italic text-secondary leading-relaxed">
                        {selectedEvent.businessAngle}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <div className="container mx-auto px-4 lg:px-8 mt-32 text-center">
        <div className="max-w-2xl mx-auto space-y-8 p-16 bg-gray-50 border border-gray-100">
          <Info size={40} className="text-accent mx-auto" />
          <h4 className="text-3xl font-bold text-secondary uppercase tracking-tighter">Event Submissions</h4>
          <p className="text-gray-400 text-sm font-light leading-relaxed">
            Are you organizing a high-impact business summit or a specialized tech event? Submit your event for editorial review and placement in our strategic outlook calendar.
          </p>
          <button className="px-12 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all">
            Contact Editorial Team
          </button>
        </div>
      </div>
    </div>
  )
}
