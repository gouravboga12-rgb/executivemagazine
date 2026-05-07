import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BookOpen, Download, ChevronRight, Star, Calendar, Layers, ArrowRight } from 'lucide-react'

const editions = [
  {
    year: 2025,
    issues: [
      {
        month: 'May 2025', issue: '116', title: 'The Power of Reinvention',
        cover: 'The new faces reshaping global enterprise.',
        pages: 172,
        image: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2070&auto=format&fit=crop',
        featured: true,
        tags: ['Leadership', 'Strategy', 'Tech'],
      },
      {
        month: 'April 2025', issue: '115', title: 'Future of Finance',
        cover: 'Redefining capital in the age of AI.',
        pages: 164,
        image: 'https://images.unsplash.com/photo-1557426272-fc759fdf7a8d?q=80&w=2070&auto=format&fit=crop',
        tags: ['Finance', 'Fintech', 'AI'],
      },
      {
        month: 'March 2025', issue: '114', title: 'Green Titans',
        cover: 'Executives leading the sustainability revolution.',
        pages: 158,
        image: 'https://images.unsplash.com/photo-1495020689067-958852a7765e?q=80&w=2069&auto=format&fit=crop',
        tags: ['ESG', 'Climate', 'Impact'],
      },
      {
        month: 'February 2025', issue: '113', title: 'The Founder\'s Mind',
        cover: 'Inside the psychology of serial entrepreneurs.',
        pages: 160,
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2074&auto=format&fit=crop',
        tags: ['Founders', 'Growth', 'Culture'],
      },
    ],
  },
  {
    year: 2024,
    issues: [
      {
        month: 'December 2024', issue: '112', title: 'Year in Review',
        cover: 'The defining moments that shaped business in 2024.',
        pages: 200,
        image: 'https://images.unsplash.com/photo-1530099486328-e021101a494a?q=80&w=2047&auto=format&fit=crop',
        tags: ['Recap', 'Global', 'Leaders'],
      },
      {
        month: 'October 2024', issue: '110', title: 'Asia Rising',
        cover: 'The economic powerhouses shifting the global balance.',
        pages: 154,
        image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?q=80&w=2070&auto=format&fit=crop',
        tags: ['Asia', 'Emerging Markets', 'Trade'],
      },
      {
        month: 'August 2024', issue: '108', title: 'Women in Power',
        cover: 'Trailblazers redefining leadership from the top.',
        pages: 168,
        image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=2070&auto=format&fit=crop',
        tags: ['Diversity', 'Women', 'Leadership'],
      },
      {
        month: 'June 2024', issue: '106', title: 'The AI C-Suite',
        cover: 'How artificial intelligence is reshaping executive decisions.',
        pages: 176,
        image: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?q=80&w=2070&auto=format&fit=crop',
        tags: ['AI', 'Technology', 'Future'],
      },
    ],
  },
]

export default function Edition() {
  const [selectedYear, setSelectedYear] = useState(2025)
  const [hoveredIssue, setHoveredIssue] = useState(null)

  const currentYearData = editions.find(e => e.year === selectedYear)
  const latestEdition = editions[0].issues[0]

  return (
    <div className="pb-32 bg-white text-secondary">

      {/* Hero Header */}
      <header className="relative overflow-hidden bg-white border-b border-gray-100">
        <div className="absolute top-0 right-0 w-1/2 h-full flex items-center justify-end overflow-hidden pointer-events-none select-none">
          <span className="text-[20rem] font-black leading-none text-gray-50 tracking-tighter translate-x-12">
            ED
          </span>
        </div>

        <div className="container mx-auto px-4 lg:px-8 py-32 relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent text-[11px] font-bold uppercase tracking-[0.6em] block mb-6"
          >
            Print &amp; Digital
          </motion.span>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <motion.h1
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl lg:text-[10rem] font-bold uppercase tracking-tighter leading-none text-secondary"
            >
              Our <br />
              <span className="italic font-serif text-accent lowercase tracking-normal">
                Editions
              </span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-md lg:pb-6 space-y-8"
            >
              <p className="text-gray-400 text-lg md:text-xl font-light italic font-serif leading-relaxed">
                Every edition is a curated lens into the world's most consequential business stories, exclusive interviews, and visionary ideas.
              </p>
              <div className="flex items-center space-x-6">
                <button className="bg-secondary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all">
                  Subscribe Now
                </button>
                <a href="#archive" className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors">
                  <span>Browse Archive</span>
                  <ArrowRight size={12} />
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* Latest Edition Feature */}
      <section className="py-32 bg-gray-50 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

            {/* Cover Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 relative group"
            >
              <div className="absolute -inset-6 border-2 border-accent/10 group-hover:border-accent transition-colors duration-1000" />
              <div className="absolute top-10 left-10 bg-accent text-white px-6 py-3 z-10 shadow-xl">
                <span className="text-[9px] font-bold uppercase tracking-[0.3em]">Latest Issue</span>
              </div>
              <img
                src={latestEdition.image}
                alt={latestEdition.month}
                className="w-full shadow-[0_50px_100px_rgba(0,0,0,0.12)] group-hover:shadow-[0_60px_120px_rgba(0,0,0,0.18)] transition-all duration-1000"
              />
              <div className="absolute -bottom-6 -right-6 bg-white border border-gray-100 p-6 shadow-2xl">
                <p className="text-[9px] font-bold uppercase tracking-[0.3em] text-accent mb-1">Issue No.</p>
                <p className="text-3xl font-black text-secondary">#{latestEdition.issue}</p>
              </div>
            </motion.div>

            {/* Info */}
            <div className="lg:col-span-7 space-y-10">
              <div className="space-y-4">
                <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block">
                  Now Available — {latestEdition.month}
                </span>
                <h2 className="text-5xl md:text-7xl font-bold text-secondary tracking-tighter uppercase leading-tight">
                  {latestEdition.title}
                </h2>
                <p className="text-2xl font-serif font-bold text-secondary/50 italic">
                  {latestEdition.cover}
                </p>
              </div>

              <p className="text-gray-500 text-lg leading-relaxed max-w-xl font-light">
                Our flagship monthly issue brings you unparalleled access to the global corridors of power — featuring exclusive interviews, deep-dive analysis, and the stories shaping tomorrow's boardrooms.
              </p>

              <div className="grid grid-cols-3 gap-8 border-y border-gray-200 py-10">
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Issue No.</h4>
                  <p className="text-2xl font-bold text-secondary">#{latestEdition.issue}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Pages</h4>
                  <p className="text-2xl font-bold text-secondary">{latestEdition.pages}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-2">Format</h4>
                  <p className="text-2xl font-bold text-secondary">Print + Digital</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-8">
                {latestEdition.tags.map(tag => (
                  <span key={tag} className="border border-gray-200 text-secondary text-[9px] font-bold uppercase tracking-widest px-4 py-2">
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-6">
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

      {/* Archive */}
      <section id="archive" className="py-32">
        <div className="container mx-auto px-4 lg:px-8">

          {/* Section Header + Year Tabs */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block mb-4">
                <Layers size={12} className="inline mr-2" />
                Complete Archive
              </span>
              <h2 className="text-5xl md:text-7xl font-bold text-secondary tracking-tighter uppercase">
                Past <span className="italic font-serif lowercase tracking-normal text-accent">Editions</span>
              </h2>
            </div>

            <div className="flex space-x-2">
              {editions.map(e => (
                <button
                  key={e.year}
                  onClick={() => setSelectedYear(e.year)}
                  className={`px-8 py-4 text-[10px] font-bold uppercase tracking-widest transition-all ${
                    selectedYear === e.year
                      ? 'bg-secondary text-white'
                      : 'border border-gray-200 text-secondary hover:border-accent hover:text-accent'
                  }`}
                >
                  {e.year}
                </button>
              ))}
            </div>
          </div>

          {/* Issues Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedYear}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12"
            >
              {currentYearData?.issues.map((edition, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                  onMouseEnter={() => setHoveredIssue(i)}
                  onMouseLeave={() => setHoveredIssue(null)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 shadow-xl mb-6">
                    <img
                      src={edition.image}
                      alt={edition.month}
                      className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/10 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex flex-col justify-end p-8 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                      <div className="flex flex-wrap gap-2 mb-4">
                        {edition.tags?.map(tag => (
                          <span key={tag} className="bg-white/20 text-white text-[8px] font-bold uppercase tracking-widest px-3 py-1 backdrop-blur-sm">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <button className="w-full bg-white text-secondary py-3 font-bold text-[9px] uppercase tracking-widest hover:bg-accent hover:text-white transition-all flex items-center justify-center space-x-2">
                        <BookOpen size={12} />
                        <span>View Issue</span>
                      </button>
                    </div>

                    {edition.featured && (
                      <div className="absolute top-4 right-4 bg-accent p-3 shadow-lg">
                        <Star size={14} className="fill-white text-white" />
                      </div>
                    )}

                    <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2">
                      <span className="text-[9px] font-black text-secondary uppercase tracking-widest">#{edition.issue}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 text-accent text-[9px] font-bold uppercase tracking-widest">
                      <Calendar size={10} />
                      <span>{edition.month}</span>
                    </div>
                    <h3 className="text-sm font-bold text-secondary uppercase tracking-[0.1em] group-hover:text-accent transition-colors leading-tight">
                      {edition.title}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-light italic leading-snug">{edition.cover}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Stats Band */}
      <section className="py-16 bg-secondary text-white">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '116+', label: 'Editions Published' },
              { value: '12', label: 'Issues Per Year' },
              { value: '80+', label: 'Countries Reached' },
              { value: '500K+', label: 'Global Readers' },
            ].map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="space-y-2"
              >
                <p className="text-4xl md:text-5xl font-black tracking-tighter text-accent">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscription CTA */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="bg-gray-50 border border-gray-100 p-12 md:p-24 text-secondary text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-accent/10 -translate-x-1/2 -translate-y-1/2 rounded-full" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/5 translate-x-1/3 translate-y-1/3 rounded-full" />
          <div className="relative z-10 space-y-10">
            <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em] block">
              Never Miss an Issue
            </span>
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic text-balance leading-tight">
              The Executive <br /> Access Pass
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
              Gain unlimited access to our entire digital archive, exclusive webinars, and early bird access to every new edition the moment it drops.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-12 pt-6">
              <div className="text-left space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Monthly</p>
                <p className="text-3xl font-bold">$12.99 <span className="text-sm font-normal text-gray-300">/mo</span></p>
              </div>
              <div className="h-12 w-[1px] bg-gray-200 hidden md:block self-center" />
              <div className="text-left space-y-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-accent">Annual <span className="text-white bg-accent px-2 py-0.5 ml-1">Best Value</span></p>
                <p className="text-3xl font-bold">$99.00 <span className="text-sm font-normal text-gray-300">/yr</span></p>
              </div>
            </div>
            <button className="bg-secondary text-white px-12 py-6 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-2xl flex items-center space-x-3 mx-auto">
              <span>Choose Your Plan</span>
              <ChevronRight size={14} />
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
