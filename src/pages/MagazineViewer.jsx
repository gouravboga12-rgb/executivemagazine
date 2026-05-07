import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, BookOpen, ExternalLink, Share2, Maximize2, Globe, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import { magazines } from '../lib/magazinesData'

export default function MagazineViewer() {
  const { id } = useParams()
  const navigate = useNavigate()
  const magazineIndex = magazines.findIndex((m) => m.id === id)
  const magazine = magazines[magazineIndex]

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
            onClick={() => navigate(-1)}
            className="flex items-center gap-3 text-white/40 hover:text-white transition-all text-[10px] font-bold uppercase tracking-[0.3em] group"
          >
            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform text-accent" />
            <span>Close Edition</span>
          </button>
          
          <div className="h-8 w-[1px] bg-white/10 hidden md:block" />
          
          <div className="hidden md:flex flex-col">
            <span className="text-[8px] font-bold text-accent uppercase tracking-[0.4em] mb-1">Premium Digital Edition</span>
            <h1 className="text-sm font-serif font-bold text-white tracking-wide truncate max-w-lg">
              {magazine.title} — {magazine.subtitle}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
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

          <div className="h-6 w-[1px] bg-white/10 mx-2 hidden md:block" />

          <a
            href={magazine.pdf}
            download
            className="bg-accent text-white px-8 py-3 text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-secondary transition-all shadow-2xl shadow-accent/20"
          >
            Download Issue
          </a>
        </div>
      </nav>

      {/* ── Reader Main Container ── */}
      <div className="flex-grow relative flex flex-col items-center justify-start py-8 md:py-12 overflow-y-auto no-scrollbar bg-[#0f0f0f]">
        
        {/* Background Visual Texture */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none select-none overflow-hidden">
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[40rem] font-bold text-white uppercase tracking-tighter">Edition</span>
        </div>

        {/* Immersive Magazine Frame */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-6xl mx-auto px-4 md:px-0 z-10"
        >
          {/* Shadow & Elevation Container */}
          <div className="relative bg-white shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] border border-white/5 overflow-hidden">
            
            {/* Embedded Iframe Reader */}
            <div className="relative w-full overflow-hidden bg-gray-50" style={{ height: 'calc(100vh - 180px)' }}>
              <iframe
                src={`${window.location.origin}${encodeURI(magazine.pdf)}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                title={magazine.title}
                className="w-full h-full border-none"
              />
              
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

      {/* ── Mobile Control Bar ── */}
      <div className="md:hidden fixed bottom-10 left-1/2 -translate-x-1/2 z-[300] flex items-center gap-4 bg-[#111]/90 backdrop-blur-xl px-8 py-4 rounded-full border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
         <button 
           onClick={() => navigate(-1)}
           className="text-white/60 text-[10px] font-bold uppercase tracking-widest px-4 border-r border-white/10"
         >
           Exit
         </button>
         <a 
          href={magazine.pdf} 
          download
          className="text-accent text-[10px] font-bold uppercase tracking-widest px-4"
         >
           Download
         </a>
      </div>
    </div>
  )
}
