import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, BookOpen, ExternalLink, Share2, Maximize2, Globe, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { magazines } from '../lib/magazinesData'

export default function MagazineViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const magazineIndex = magazines.findIndex((m) => m.id === id)
  const magazine = magazines[magazineIndex]
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(100)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    window.scrollTo(0, 0)
    // Prevent body scroll when reader is active
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [id])

  if (!magazine) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-secondary uppercase tracking-tighter">Edition Not Found</h1>
          <Link to="/digital-magazine" className="text-accent underline font-bold uppercase tracking-widest text-sm">
            ← Back to Magazine Library
          </Link>
        </div>
      </div>
    )
  }

  const prevMag = magazineIndex > 0 ? magazines[magazineIndex - 1] : null
  const nextMag = magazineIndex < magazines.length - 1 ? magazines[magazineIndex + 1] : null

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
            <span>Close Edition</span>
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
          <div className="flex items-center gap-2 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
            <button 
              onClick={() => setZoom(Math.max(50, zoom - 10))}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="Zoom Out"
            >
              -
            </button>
            <span className="text-[10px] font-bold text-white/40 w-12 text-center uppercase tracking-widest">{zoom}%</span>
            <button 
              onClick={() => setZoom(Math.min(200, zoom + 10))}
              className="w-8 h-8 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="Zoom In"
            >
              +
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-8 mr-6">
             {prevMag && (
               <Link to={`/magazine/${prevMag.id}`} className="text-white/30 hover:text-white transition-colors flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                  <ChevronLeft size={14} /> Prev
               </Link>
             )}
             {nextMag && (
               <Link to={`/magazine/${nextMag.id}`} className="text-white/30 hover:text-white transition-colors flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest">
                  Next <ChevronRight size={14} />
               </Link>
             )}
          </div>

          <div className="flex items-center gap-4">
            <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block" />

            <a
              href={magazine.pdf}
              download
              className="bg-accent text-white px-4 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-secondary transition-all shadow-2xl shadow-accent/20"
            >
              Download <span className="hidden md:inline">PDF</span>
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

        {/* Cinematic Loading Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 z-[100] bg-[#0a0a0a] flex flex-col items-center justify-center"
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Immersive Magazine Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl mx-auto px-0 md:px-0 z-10"
        >
          {/* Shadow & Elevation Container */}
          <div className="relative bg-white shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] border border-white/5 overflow-hidden">
            
            {/* Embedded Iframe Reader */}
            <div className="relative w-full overflow-auto bg-gray-50 flex justify-center" style={{ height: 'calc(100vh - 120px)' }}>
              <div style={{ width: `${zoom}%`, height: '100%', transition: 'width 0.3s ease' }}>
                <iframe
                  src={
                    (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
                      ? `https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + magazine.pdf)}&embedded=true&cb=${Date.now()}`
                      : `${window.location.origin}${encodeURI(magazine.pdf)}?v=${Date.now()}#toolbar=0&navpanes=0&scrollbar=1&view=Fit`
                  }
                  title={magazine.title}
                  className="w-full h-full border-none"
                />
              </div>
              
              {/* Overlay shadow for depth */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.03)]" />
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
                  Executives Global Digital Archive • Edition {magazineIndex + 1}
                </span>
                <ShieldCheck size={14} className="text-accent" />
             </div>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
