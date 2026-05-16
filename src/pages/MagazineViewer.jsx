import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, BookOpen, ExternalLink, Share2, Maximize2, Globe, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getFullUrl } from '../lib/utils'



export default function MagazineViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [magazine, setMagazine] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [error, setError] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchMagazine = async () => {
      setIsLoading(true)
      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}?action=get_magazine&id=${id}`);
        const data = await response.json();
        
        if (data.error || !data) {
          setError(true)
        } else {
          setMagazine({
            id: data.id,
            title: data.title,
            subtitle: data.edition,
            pdf: getFullUrl(data.pdf_url),
            image: getFullUrl(data.image_url)
          })
          setError(false)
        }
      } catch (err) {
        console.error('Failed to fetch magazine:', err)
        setError(true)
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchMagazine()
    }
  }, [id])

  useEffect(() => {
    window.scrollTo(0, 0)
    // Prevent body scroll when reader is active
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [id])

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-8">
        <div className="text-center space-y-8 max-w-md">
          <div className="w-20 h-20 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto">
             <ShieldCheck size={40} />
          </div>
          <h1 className="text-4xl font-bold text-secondary uppercase tracking-tighter leading-none">Edition <br />Not Found</h1>
          <p className="text-gray-400 text-sm leading-relaxed">This magazine edition might have been moved or updated. Please check our latest library for the current version.</p>
          <div className="pt-4">
            <Link to="/digital-magazine" className="bg-secondary text-white px-10 py-4 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-2xl inline-block">
              Return to Library
            </Link>
          </div>
        </div>
      </div>
    )
  }

  if (isLoading || !magazine) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
         <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center space-y-8"
          >
            <div className="flex flex-col items-center">
              <span className="text-accent text-[10px] font-bold uppercase tracking-[0.8em] mb-4 animate-pulse">Retrieving Edition</span>
              <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
                <motion.div
                  initial={{ x: '-100%' }}
                  animate={{ x: '100%' }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-0 bg-accent"
                />
              </div>
            </div>
            <h2 className="text-white font-serif italic text-2xl opacity-40">Compiling Premium Content...</h2>
          </motion.div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col overflow-hidden selection:bg-accent selection:text-white">
      {/* ── Immersive Reader Header ── */}
      <nav className="bg-[#111] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('/digital-magazine')}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-accent" />
            <span className="hidden md:inline">Close Edition</span>
          </button>

          <div className="h-8 w-[1px] bg-white/10 hidden md:block" />

          <div className="hidden md:flex flex-col">
            <span className="text-[8px] font-bold text-accent uppercase tracking-[0.4em] mb-1">Premium Digital Edition</span>
            <h1 className="text-sm font-serif font-bold text-white tracking-wide truncate max-w-lg">
              {magazine.title} — {magazine.subtitle} <span className="text-[8px] text-white/20 ml-2 font-sans tracking-widest">v1.2</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-1 md:gap-2 bg-white/5 rounded-full px-2 md:px-3 py-1 md:py-1.5 border border-white/10">
            <button
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all text-xs"
              title="Zoom Out"
            >
              -
            </button>
            <span className="text-[8px] md:text-[10px] font-bold text-white/40 w-8 md:w-12 text-center uppercase tracking-widest">{zoom}%</span>
            <button
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="w-6 h-6 md:w-8 md:h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all text-xs"
              title="Zoom In"
            >
              +
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block" />


            <a
              href={magazine?.pdf ? `${import.meta.env.VITE_API_URL}?action=download&file=${encodeURIComponent(magazine.pdf.split('/').pop())}` : '#'}
              onClick={(e) => !magazine?.pdf && e.preventDefault()}
              className={`${!magazine?.pdf ? 'opacity-50 cursor-not-allowed' : ''} bg-accent text-white px-3 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-secondary transition-all shadow-2xl shadow-accent/20 flex items-center gap-2`}
            >
              <Download size={14} className="md:hidden" />
              <span className="hidden md:inline">Download PDF</span>
              <span className="md:hidden">PDF</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Reader Main Container ── */}
      <div className="flex-grow relative flex flex-col items-center justify-start py-0 md:py-12 overflow-y-auto no-scrollbar bg-[#0f0f0f]">

        {/* Background Visual Texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-bold text-white uppercase tracking-tighter">Edition</span>
        </div>

        {/* Immersive Magazine Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl mx-auto px-0 md:px-0 z-10"
        >
          {/* Shadow & Elevation Container */}
          <div className="relative bg-white shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] border border-white/5 overflow-hidden">

            {/* Embedded Iframe Reader */}
            <div className="relative w-full overflow-auto bg-gray-50 flex justify-center" style={{ height: 'calc(100vh - 120px)' }}>
              {!isMobile ? (
                <div style={{ width: `${zoom}%`, height: '100%', transition: 'width 0.3s ease' }}>
                  <iframe
                    src={`${magazine.pdf}#toolbar=0`}
                    title={magazine.title}
                    className="w-full h-full border-none"
                  />
                </div>
              ) : (
                <div className="w-full h-full relative flex flex-col items-center justify-center p-8 bg-[#1a1a1a]">
                   {/* Mobile Cover Display */}
                   <div className="relative w-full max-w-[300px] aspect-[3/4] shadow-2xl overflow-hidden mb-12">
                      <img 
                        src={magazine.image} 
                        alt={magazine.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   </div>
                   
                   <div className="text-center space-y-6">
                      <h2 className="text-white font-serif text-2xl font-bold">{magazine.title}</h2>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">{magazine.subtitle} • Digital Edition</p>
                      
                      <div className="pt-8">
                        <a 
                          href={magazine.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-4 bg-accent text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
                        >
                          <ExternalLink size={18} />
                          Read Full Edition
                        </a>
                      </div>
                      <p className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em] pt-4">Opens Directly in Native Viewer</p>
                   </div>
                </div>
              )}
            </div>

            {/* In-Reader Context Actions */}
            <div className="absolute top-8 right-8 flex flex-col gap-4">
              <a
                href={magazine.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-secondary/80 backdrop-blur-md text-white rounded-full hover:bg-accent transition-all shadow-xl"
              >
                <Maximize2 size={18} />
              </a>
            </div>
          </div>

          {/* Reader Footer Branding */}
          <div className="mt-16 mb-32 text-center">
            <div className="inline-flex items-center space-x-6 px-10 py-4 bg-[#111] border border-white/5 rounded-full">
              <Globe size={14} className="text-accent" />
              <span className="text-white/30 text-[9px] font-bold uppercase tracking-[0.4em]">
                Executives Global Digital Archive • Edition Live
              </span>
              <ShieldCheck size={14} className="text-accent" />
            </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
