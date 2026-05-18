import { BookOpen, Download, ChevronRight, Star, ArrowRight, Search, ArrowLeft, ArrowUpRight } from 'lucide-react'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
// import { supabase } from '../lib/supabase'


export default function DigitalMagazine() {
  const [searchQuery, setSearchQuery] = useState('')
  const [dynamicMagazines, setDynamicMagazines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}?action=get_magazines`)
        const data = await response.json()
        
        if (data.error) {
          setError(data.error)
          return
        }

        if (Array.isArray(data)) {
          setDynamicMagazines(data.map(item => ({
            id: item.id,
            title: item.title,
            subtitle: item.edition,
            edition: item.edition,
            image: item.image_url,
            pdf: item.pdf_url,
            tag: item.tag || 'Editorial',
            description: item.description,
            featured: item.featured
          })))
        }
      } catch (err) {
        console.error('Failed to fetch magazines:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchMagazines()
  }, [])

  const featured = dynamicMagazines.find(m => m.featured) || dynamicMagazines[0] || {}
  const library = dynamicMagazines.filter(m => m.id !== featured.id)

  const filteredLibrary = library.filter(mag => 
    mag.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    mag.edition.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="bg-white">
      <SEO 
        title="Digital Editions Archive" 
        description="Browse the complete digital library of Executives Magazine print publications. Read and download collector issues detailing high-end global leadership."
        keywords="Executives Magazine issues, print editions digital archive, C-suite collector books, leadership publications, PDF magazine issues"
      />
      {/* ── Hero Section ── */}
      <section className="pt-40 pb-20 lg:pt-48 lg:pb-32 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Cover Column */}
            <div className="lg:col-span-5 flex justify-center lg:justify-end">
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                className="relative w-full max-w-[400px] aspect-[3/4] shadow-[0_50px_100px_rgba(0,0,0,0.15)] group"
              >
                <img 
                  src={featured.image} 
                  alt={featured.title} 
                  className="w-full h-full object-cover rounded-sm"
                />
                <div className="absolute top-10 -right-6 bg-accent text-white p-6 shadow-2xl">
                   <Star size={24} className="fill-white" />
                </div>
              </motion.div>
            </div>

            {/* Info Column */}
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <span className="text-accent text-[11px] font-bold uppercase tracking-[0.6em] block">
                   {featured.tag} · Now Available
                </span>
                <h1 className="text-6xl md:text-8xl lg:text-[7rem] font-bold text-secondary uppercase tracking-tighter leading-[0.85]">
                  {featured.title}
                </h1>
                <p className="text-2xl md:text-3xl font-serif italic text-gray-400 font-light">
                  {featured.edition}
                </p>
              </div>

              <p className="text-gray-400 text-lg md:text-xl font-light max-w-xl leading-relaxed">
                {featured.description}
              </p>

              <div className="pt-4 flex flex-wrap gap-6">
                <Link 
                  to={`/magazine/${featured.id}`}
                  className="bg-secondary text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all flex items-center gap-3"
                >
                  <BookOpen size={16} />
                  Open Edition
                </Link>
                <a 
                  href={featured.pdf} 
                  download
                  className="border border-secondary text-secondary px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-secondary hover:text-white transition-all flex items-center gap-3"
                >
                  <Download size={16} />
                  Download PDF
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── All Editions ── */}
      <section className="py-24 bg-gray-50/50">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
            <div>
              <h2 className="text-5xl md:text-7xl font-bold text-secondary uppercase tracking-tighter">
                All <span className="text-accent italic font-serif lowercase tracking-normal">Editions</span>
              </h2>
            </div>
            <div className="w-full md:w-96 relative">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-300" size={18} />
              <input 
                type="text" 
                placeholder="Filter by title, year or tag..."
                className="w-full pl-16 pr-8 py-5 bg-white border border-gray-100 rounded-full text-sm font-medium focus:outline-none focus:ring-4 focus:ring-accent/5 transition-all shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-12 gap-y-20">
            {filteredLibrary.map((mag, i) => (
              <motion.div 
                key={mag.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group"
              >
                <Link 
                  to={`/magazine/${mag.id}`} 
                  className="block relative aspect-[3/4] bg-white shadow-lg overflow-hidden mb-8"
                >
                  <img 
                    src={mag.image} 
                    alt={mag.title} 
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4 bg-accent text-white text-[9px] font-bold uppercase tracking-widest px-3 py-1">
                    {mag.tag}
                  </div>
                  <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center p-8">
                     <span className="bg-white text-secondary px-8 py-3 text-[10px] font-bold uppercase tracking-widest translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        Open Edition
                     </span>
                  </div>
                </Link>
                <div className="space-y-3">
                  <h3 className="text-sm font-black text-secondary uppercase tracking-widest group-hover:text-accent transition-colors">
                    {mag.title}
                  </h3>
                  <p className="text-[11px] text-gray-400 font-bold uppercase tracking-widest">
                    {mag.edition}
                  </p>
                  <p className="text-[12px] text-gray-400 font-light leading-relaxed line-clamp-2 italic">
                    {mag.description}
                  </p>
                  <div className="flex items-center gap-6 pt-2">
                    <Link 
                      to={`/magazine/${mag.id}`} 
                      className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors flex items-center gap-2"
                    >
                      Open Edition <ChevronRight size={12} />
                    </Link>
                    <a href={mag.pdf} download className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-accent transition-colors flex items-center gap-2">
                      <Download size={12} /> PDF
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Grid Jump Link ── */}
      <section className="py-24 border-t border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 text-center mb-16">
           <h2 className="text-4xl md:text-6xl font-bold text-secondary uppercase tracking-tighter">
              Jump to an <span className="text-accent italic font-serif lowercase tracking-normal">Edition</span>
           </h2>
        </div>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
            {dynamicMagazines.map((mag) => (
              <Link 
                key={mag.id}
                to={`/magazine/${mag.id}`}
                className="bg-gray-50/50 p-10 flex items-center gap-8 group hover:bg-accent transition-all duration-500"
              >
                <div className="w-16 h-20 bg-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform">
                  <img src={mag.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="text-left flex-1">
                  <p className="text-accent text-[9px] font-bold uppercase tracking-[0.4em] mb-1 group-hover:text-white/80 transition-colors">
                    {mag.tag}
                  </p>
                  <h4 className="text-lg font-bold text-secondary uppercase tracking-tight group-hover:text-white transition-colors">
                    {mag.title}
                  </h4>
                  <p className="text-xs text-gray-400 group-hover:text-white/60 transition-colors">
                    {mag.edition}
                  </p>
                </div>
                <ArrowRight className="text-gray-200 group-hover:text-white group-hover:translate-x-2 transition-all" size={20} />
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
