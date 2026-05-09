import { useParams, Link, useNavigate, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Download, BookOpen, ExternalLink, Share2, Printer, Maximize2, Globe, ShieldCheck } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function InterviewViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 2000)
    return () => clearTimeout(timer)
  }, [])
  const { pdfUrl, title } = location.state || { 
    pdfUrl: `/interview pages/${id}.pdf`,
    title: id?.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
  }

  useEffect(() => {
    window.scrollTo(0, 0)
    // Prevent body scroll when reader is active
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [id])

  return (
    <div className="fixed inset-0 z-[200] bg-[#0a0a0a] flex flex-col overflow-hidden selection:bg-accent selection:text-white">
      {/* ── Cinematic Header ── */}
      <nav className="bg-[#111] border-b border-white/5 py-4 px-6 md:px-12 flex items-center justify-between relative z-50">
        <div className="flex items-center gap-8">
          <button
            onClick={() => navigate('/interviews')}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-accent" />
            <span>Exit Archive</span>
          </button>
          
          <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
          
          <div className="hidden md:flex flex-col">
            <span className="text-[8px] font-bold text-accent uppercase tracking-[0.4em] mb-1">Official Editorial Archive</span>
            <h1 className="text-sm font-serif font-bold text-white tracking-wide truncate max-w-lg">
              {title}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden lg:flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <ShieldCheck size={12} className="text-accent" />
            <span className="text-[9px] font-bold text-white/50 uppercase tracking-widest">Verified Secured Source</span>
          </div>

          <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block" />

          <a
            href={pdfUrl}
            download
            className="bg-accent text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-secondary transition-all shadow-2xl shadow-accent/20"
          >
            Download PDF
          </a>
        </div>
      </nav>

      {/* ── Immersive Reader Area ── */}
      <div className="flex-grow relative flex flex-col items-center justify-start py-8 md:py-12 overflow-y-auto no-scrollbar bg-[#0f0f0f]">
        
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
          className="relative w-full max-w-6xl mx-auto px-4 md:px-0 z-10"
        >
          {/* Frame Shadow & Border */}
          <div className="relative bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] border border-white/10 overflow-hidden">
            
            {/* Custom Iframe Reader */}
            <div className="relative w-full overflow-hidden bg-gray-100" style={{ height: '88vh' }}>
              <iframe
                src={
                  ('ontouchstart' in window || navigator.maxTouchPoints > 0)
                    ? `https://docs.google.com/gview?url=${encodeURIComponent(window.location.origin + pdfUrl + '?v=' + Date.now())}&embedded=true`
                    : `${window.location.origin}${encodeURI(pdfUrl)}?v=${Date.now()}#page=1&toolbar=0&navpanes=0&scrollbar=1&view=Fit`
                }
                title={title}
                className="w-full h-full border-none"
              />
              
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

      {/* ── Mobile Context Menu ── */}
      <div className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-4 bg-[#111]/80 backdrop-blur-lg px-8 py-4 rounded-full border border-white/10 shadow-2xl">
         <button 
           onClick={() => navigate('/interviews')}
           className="text-white/60 text-[10px] font-bold uppercase tracking-widest px-4 border-r border-white/10"
         >
           Close
         </button>
         <a 
          href={pdfUrl} 
          download
          className="text-accent text-[10px] font-bold uppercase tracking-widest px-4"
         >
           Download
         </a>
      </div>
    </div>
  )
}
