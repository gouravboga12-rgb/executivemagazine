import { BookOpen, Download, ChevronRight, Star, ArrowRight, Search, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { magazines } from '../lib/magazinesData'

const featured = magazines[0]
const library = magazines.slice(1)

export default function DigitalMagazine() {
  const [searchQuery, setSearchQuery] = useState('')

  const filteredLibrary = library.filter(mag => 
    mag.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mag.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mag.tag.toLowerCase().includes(searchQuery.toLowerCase())
  )
  return (
    <div className="pb-32">
      {/* ── Hero Header ── */}
      <section className="bg-white border-b border-gray-100 text-secondary pt-40 pb-20 lg:py-32 relative overflow-hidden" data-aos="fade-down">
        <div className="absolute top-0 right-0 h-full flex items-center opacity-[0.03] lg:opacity-[0.04] pointer-events-none select-none">
          <span className="text-[12rem] lg:text-[22rem] font-black uppercase leading-none text-secondary">LIBRARY</span>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            <Link
              to="/"
              className="flex items-center gap-2 text-accent text-[10px] font-bold uppercase tracking-[0.4em] hover:text-secondary transition-colors group"
            >
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <div className="h-[1px] w-12 bg-accent/20 hidden md:block" />
            <motion.span
              className="text-[10px] font-bold uppercase tracking-[0.5em] text-accent"
            >
              Digital Archive
            </motion.span>
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-12">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-5xl md:text-8xl lg:text-9xl font-bold uppercase tracking-tighter leading-[0.9] text-secondary"
            >
              Digital <br />
              <span className="text-accent italic font-serif lowercase tracking-normal">Library</span>
            </motion.h1>
            <div className="max-w-md lg:pb-6">
              <p className="text-gray-400 text-lg md:text-xl font-light italic font-serif mb-8 leading-relaxed">
                Browse and read all five editions of Executives Magazine — each issue independently viewable
                right inside your browser or downloadable as a PDF.
              </p>
              <div className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-secondary">
                <Star size={14} className="text-accent" />
                <span>5 Editions · All Free to Read</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Featured Issue ── */}
      <section className="py-28 bg-gray-50 border-b border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Cover */}
            <div className="lg:col-span-4 relative group">
              <div className="hidden lg:block absolute -inset-6 border-2 border-accent/10 group-hover:border-accent transition-colors duration-1000" />
              <div className="absolute top-4 right-4 lg:top-8 lg:right-8 z-10" style={{ background: featured.accent }}>
                <div className="p-3 lg:p-5">
                  <Star size={18} className="text-white fill-white lg:w-[22px] lg:h-[22px]" />
                </div>
              </div>
              <Link 
                to={`/magazine/${featured.id}`}
                className="block relative z-10"
              >
                <img
                  src={featured.image}
                  alt={featured.title}
                  className="w-full shadow-[0_30px_60px_rgba(0,0,0,0.15)] lg:shadow-[0_50px_100px_rgba(0,0,0,0.12)] transition-all duration-1000 group-hover:scale-[1.02]"
                />
              </Link>
            </div>

            {/* Info */}
            <div className="lg:col-span-8 space-y-8">
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-[0.5em] block" style={{ color: featured.accent }}>
                  {featured.tag} · Now Available
                </span>
                <h2 className="text-5xl md:text-7xl font-bold text-secondary tracking-tighter uppercase leading-none">
                  {featured.title}
                </h2>
                <p className="text-2xl font-serif font-bold text-secondary/50 italic">{featured.subtitle}</p>
              </div>

              <p className="text-gray-500 text-lg leading-relaxed max-w-2xl font-light">{featured.description}</p>

              <div className="border-t border-b border-gray-200 py-8">
                <p className="text-sm text-gray-400 font-light leading-relaxed">
                  Open the full interactive reader directly in your browser — no login or subscription required.
                  All editions are independent and fully self-contained.
                </p>
              </div>

              <div className="flex flex-wrap gap-5 pt-2">
                <Link
                  to={`/magazine/${featured.id}`}
                  className="flex items-center gap-3 bg-secondary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-accent transition-all"
                >
                  <BookOpen size={14} />
                  Open Edition
                </Link>
                <a
                  href={featured.pdf}
                  download
                  className="flex items-center gap-3 border border-secondary text-secondary px-10 py-5 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-secondary hover:text-white transition-all"
                >
                  <Download size={14} />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Editions Grid ── */}
      <section className="py-28" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end mb-20 gap-8 text-center md:text-left">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-[0.5em] mb-4 block text-accent">The Collection</span>
              <h2 className="text-4xl md:text-6xl font-bold text-secondary tracking-tighter uppercase">
                All Editions
              </h2>
            </div>
            <div className="flex-1 max-w-lg">
              <div className="bg-white p-1 rounded-full shadow-[0_15px_40px_rgba(0,0,0,0.08)] border border-gray-100 flex items-center group focus-within:ring-4 focus-within:ring-accent/5 transition-all">
                <div className="pl-5 pr-3 text-gray-400 group-focus-within:text-accent transition-colors">
                  <Search size={18} strokeWidth={1.5} />
                </div>
                <input 
                  type="text" 
                  placeholder="Filter by title, year or tag..."
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium placeholder:text-gray-300 py-3"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <div className="bg-gray-50 text-secondary px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-widest mr-1 hidden sm:block">
                  {filteredLibrary.length} Editions
                </div>
              </div>
            </div>
          </div>

          {/* 4-column grid for remaining issues */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredLibrary.map((mag, i) => (
              <motion.div
                key={mag.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group cursor-pointer"
                data-aos="fade-up"
                data-aos-delay={i * 50}
              >
                {/* Cover Art */}
                <Link 
                  to={`/magazine/${mag.id}`}
                  className="relative aspect-[3/4] overflow-hidden shadow-xl mb-6 block cursor-pointer"
                >
                  <img
                    src={mag.image}
                    alt={mag.title}
                    className="w-full h-full object-contain bg-gray-50 transition-all duration-700 group-hover:scale-105"
                  />
                  {/* Overlay (Desktop) */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center p-6 pointer-events-none">
                    <div className="translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 bg-white text-secondary px-8 py-3 text-[10px] font-bold uppercase tracking-widest">
                      Open Edition
                    </div>
                  </div>
                  {/* Tag badge */}
                  <div
                    className="absolute top-4 left-4 px-3 py-1 text-[8px] font-bold uppercase tracking-widest text-white"
                    style={{ background: mag.accent }}
                  >
                    {mag.tag}
                  </div>
                </Link>

                {/* Meta */}
                <div className="space-y-3">
                  <h3
                    className="text-xs font-bold uppercase tracking-[0.2em] transition-colors group-hover:text-accent"
                    style={{ color: '#1a1a2e' }}
                  >
                    {mag.title}
                  </h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest">{mag.subtitle}</p>
                  <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-2">{mag.description}</p>

                  <div className="flex items-center gap-4 pt-2">
                    <Link
                      to={`/magazine/${mag.id}`}
                      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors"
                    >
                      Open Edition <ChevronRight size={10} />
                    </Link>
                    <a
                      href={mag.pdf}
                      download
                      className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors"
                    >
                      <Download size={10} />
                      PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Full List / Quick Access ── */}
      <section className="py-20 bg-gray-50 border-t border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="mb-12">
            <span className="caps-heading mb-4 block">Quick Access</span>
            <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tighter uppercase">
              Jump to an Edition
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200">
            {magazines.map((mag) => (
              <Link
                key={mag.id}
                to={`/magazine/${mag.id}`}
                className="bg-white p-8 group flex items-center gap-6 hover:bg-accent transition-all duration-300"
              >
                <div
                  className="w-12 h-16 flex-shrink-0 overflow-hidden"
                  style={{ background: mag.bg }}
                >
                  <img src={mag.image} alt="" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[9px] font-bold uppercase tracking-[0.4em] mb-1 group-hover:text-white transition-colors" style={{ color: mag.accent }}>
                    {mag.tag}
                  </p>
                  <h4 className="text-sm font-bold text-secondary group-hover:text-white transition-colors uppercase tracking-tight line-clamp-1">
                    {mag.title}
                  </h4>
                  <p className="text-xs text-gray-400 group-hover:text-white/70 transition-colors truncate mt-0.5">
                    {mag.subtitle}
                  </p>
                </div>
                <ArrowRight size={16} className="text-gray-300 group-hover:text-white transition-colors flex-shrink-0 group-hover:translate-x-1 duration-300" />
              </Link>
            ))}
          </div>
        </div>
      </section>
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
