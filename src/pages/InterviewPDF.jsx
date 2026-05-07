import { useParams, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Download, Share2, Printer, Maximize2 } from 'lucide-react'

export default function InterviewPDF() {
  const { id } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  
  // We can pass the pdfUrl and title via state or look it up.
  // For simplicity and robustness, we'll try to get it from state first, 
  // or fallback to a lookup if we add a central store later.
  const { pdfUrl, title } = location.state || { 
    pdfUrl: `/interview pages/${id}.pdf`, // Fallback guess
    title: id?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) 
  }

  return (
    <div className="min-h-screen bg-secondary flex flex-col">
      {/* Header / Navigation */}
      <header className="bg-secondary/95 backdrop-blur-md border-b border-white/10 px-6 py-4 sticky top-0 z-50">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <button 
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2 text-white/70 hover:text-accent transition-colors group"
            >
              <div className="p-2 rounded-full bg-white/5 group-hover:bg-accent/10 transition-colors">
                <ArrowLeft size={18} />
              </div>
              <span className="text-xs font-bold uppercase tracking-widest hidden md:block">Back to Gallery</span>
            </button>
            <div className="h-6 w-[1px] bg-white/10" />
            <div>
              <h1 className="text-white font-serif text-lg md:text-xl font-bold truncate max-w-[200px] md:max-w-md">
                {title}
              </h1>
              <p className="text-accent text-[9px] font-bold uppercase tracking-widest">Digital Edition • Official Feature</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <a 
              href={pdfUrl} 
              download 
              className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="Download PDF"
            >
              <Download size={20} />
            </a>
            <button 
              className="p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="Share"
            >
              <Share2 size={20} />
            </button>
            <div className="h-6 w-[1px] bg-white/10 mx-2" />
            <button 
              onClick={() => window.print()}
              className="hidden md:block p-3 text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all"
              title="Print"
            >
              <Printer size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* PDF Viewer Area */}
      <main className="flex-1 relative bg-[#2a2a2a] overflow-hidden">
        <motion.div 
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full h-full p-4 md:p-8"
        >
          <div className="w-full h-full bg-white rounded-sm shadow-2xl overflow-hidden relative group">
            <iframe 
              src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
              title={title}
              className="w-full h-full border-none"
            />
            
            {/* Fullscreen Overlay Prompt */}
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <a 
                href={pdfUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-secondary/90 backdrop-blur-md text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-xl border border-white/10"
              >
                <Maximize2 size={14} />
                <span>Open Fullscreen</span>
              </a>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Mobile Footer Briefing */}
      <footer className="md:hidden bg-secondary border-t border-white/5 p-4 text-center">
         <p className="text-white/40 text-[9px] font-bold uppercase tracking-widest">
            © 2026 Executives Magazine • Editorial Archive
         </p>
      </footer>
    </div>
  )
}
