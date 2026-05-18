import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, BookOpen, ExternalLink, Share2, Printer, Maximize2, Globe, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getFullUrl } from '../lib/utils'
import SEO from '../components/SEO'

export default function InterviewViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)
  const [zoom, setZoom] = useState(100)
  const [magazine, setMagazine] = useState(null)
  const [isMobile, setIsMobile] = useState(false)
  const { pdfUrl: statePdf, title: stateTitle, preview: statePreview } = location.state || {}

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchInterview = async () => {
      if (statePdf) {
        setMagazine({ 
          pdf: getFullUrl(statePdf), 
          title: stateTitle,
          preview: statePreview ? getFullUrl(statePreview) : null
        })
        setIsLoading(false)
        return
      }

      try {
        const apiUrl = import.meta.env.VITE_API_URL;
        const response = await fetch(`${apiUrl}?action=get_interview&id=${id}`);
        const data = await response.json();
        
        if (data) {
          setMagazine({
            pdf: getFullUrl(data.pdf_url),
            title: data.company,
            preview: getFullUrl(data.preview_url)
          })
        }
      } catch (err) {
        console.error('Failed to fetch interview:', err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchInterview()
  }, [id, statePdf, stateTitle])

  const pdfUrl = magazine?.pdf
  const title = magazine?.title

  useEffect(() => {
    window.scrollTo(0, 0)
    // Prevent body scroll when reader is active
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [id])

  if (isLoading || !magazine) {
    return (
      <div className="h-screen bg-[#0a0a0a] flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col overflow-hidden selection:bg-accent selection:text-white">
      <SEO 
        title={`${title} Exclusive Profile`} 
        description={`Read the exclusive corporate portfolio and strategic leadership profile of ${title} in the Executives Magazine digital archives.`}
        keywords={`${title} interview, ${title} profile, executive strategy biography, C-suite archive`}
      />
      {/* ── Cinematic Header ── */}
      <nav className="bg-[#111] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('/interviews')}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-accent" />
            <span className="hidden md:inline">Exit Archive</span>
          </button>
          
          <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
          
          <div className="hidden md:flex flex-col">
            <span className="text-[8px] font-bold text-accent uppercase tracking-[0.4em] mb-1">Official Editorial Archive</span>
            <h1 className="text-sm font-serif font-bold text-white tracking-wide truncate max-w-lg">
              {title} <span className="text-[8px] text-white/20 ml-2 font-sans tracking-widest">v1.2</span>
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

          <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <ShieldCheck size={12} className="text-accent" />
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Verified Secured Source</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block" />

            <a
              href={pdfUrl ? `${import.meta.env.VITE_API_URL}?action=download&file=${encodeURIComponent(pdfUrl.split('/').pop())}` : '#'}
              onClick={(e) => !pdfUrl && e.preventDefault()}
              className={`${!pdfUrl ? 'opacity-50 cursor-not-allowed' : ''} bg-accent text-white px-3 md:px-8 py-2 md:py-3 text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-secondary transition-all shadow-2xl shadow-accent/20 flex items-center gap-2`}
            >
              <Download size={14} className="md:hidden" />
              <span className="hidden md:inline">Download PDF</span>
              <span className="md:hidden">PDF</span>
            </a>
          </div>
        </div>
      </nav>

      {/* ── Immersive Reader Area ── */}
      <div className="flex-grow relative flex flex-col items-center justify-start py-0 md:py-12 overflow-y-auto no-scrollbar bg-[#0f0f0f]">
        
        {/* Background Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-bold text-white">ARCHIVE</span>
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
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.8em] mb-4 animate-pulse">Loading Archive</span>
                  <div className="w-64 h-[1px] bg-white/5 relative overflow-hidden">
                    <motion.div 
                      initial={{ x: '-100%' }}
                      animate={{ x: '100%' }}
                      transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                      className="absolute inset-0 bg-accent"
                    />
                  </div>
                </div>
                <h2 className="text-white font-serif italic text-2xl opacity-40">Decrypting Editorial Data...</h2>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The Magazine Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: isLoading ? 0 : 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl mx-auto px-0 md:px-0 z-10"
        >
          {/* Frame Shadow & Border */}
          <div className="relative bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10 overflow-hidden">
            
            {/* Custom Iframe Reader */}
            <div className="relative w-full overflow-auto bg-gray-100 flex justify-center" style={{ height: 'calc(100vh - 100px)' }}>
              {!isMobile ? (
                <div style={{ width: `${zoom}%`, height: '100%', transition: 'width 0.3s ease' }}>
                  <iframe
                    src={`${magazine.pdf}#toolbar=0`}
                    title={title}
                    className="w-full h-full border-none"
                  />
                </div>
              ) : (
                <div className="w-full h-full relative flex flex-col items-center justify-center p-8 bg-[#1a1a1a]">
                   {/* Mobile Cover Display */}
                   <div className="relative w-full max-w-[300px] aspect-[3/4] shadow-2xl overflow-hidden mb-12 group">
                      <img 
                        src={magazine.preview || "https://images.unsplash.com/photo-1586339949916-3e9457bed613?q=80&w=2070&auto=format&fit=crop"} 
                        alt={title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                   </div>
                   
                   <div className="text-center space-y-6">
                      <h2 className="text-white font-serif text-2xl font-bold">{title}</h2>
                      <p className="text-white/40 text-[10px] font-bold uppercase tracking-widest">Digital Edition • Official Feature</p>
                      
                      <div className="pt-8">
                        <a 
                          href={magazine.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-4 bg-accent text-white px-10 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all"
                        >
                          <ExternalLink size={18} />
                          Read Full Interview
                        </a>
                      </div>
                      <p className="text-white/20 text-[8px] font-bold uppercase tracking-[0.3em] pt-4">Opens Directly in Native Viewer</p>
                   </div>
                </div>
              )}
              
              {/* Subtle Inner Glow */}
              <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_100px_rgba(0,0,0,0.05)]" />
            </div>

            {/* Floating Action Badge (Desktop Only) */}
            <div className="absolute top-8 right-8 flex flex-col gap-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <button className="p-3 bg-secondary/80 backdrop-blur-md text-white rounded-full hover:bg-accent transition-all">
                  <Share2 size={18} />
               </button>
               <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-secondary/80 backdrop-blur-md text-white rounded-full hover:bg-accent transition-all"
               >
                  <Maximize2 size={18} />
               </a>
            </div>
          </div>

          {/* Reader Footer Attribution */}
          <div className="mt-12 mb-20 text-center space-y-4">
             <div className="flex items-center justify-center space-x-4 mb-6">
                <div className="h-[1px] w-8 bg-white/10" />
                <Globe size={16} className="text-white/20" />
                <div className="h-[1px] w-8 bg-white/10" />
             </div>
             <p className="text-white/20 text-[9px] font-bold uppercase tracking-[0.6em]">
               Global Digital Distribution • Series 2024-2026
             </p>
          </div>
        </motion.div>
      </div>

    </div>
  )
}
