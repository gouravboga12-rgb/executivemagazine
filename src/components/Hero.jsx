import { Link } from 'react-router-dom'
import { ArrowRight, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero({ article }) {
  if (!article) return null

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Banner */}
      <div className="absolute inset-0 z-0">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
          src={article.image} 
          alt={article.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80" />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="space-y-8"
          >
            <div className="flex flex-col items-center space-y-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="flex items-center space-x-4"
              >
                <span className="h-[1px] w-12 bg-accent" />
                <span className="text-accent text-[11px] font-bold uppercase tracking-[0.6em]">The 2026 Executive Mandate</span>
                <span className="h-[1px] w-12 bg-accent" />
              </motion.div>

              <motion.h1 
                variants={{
                  hidden: { opacity: 1 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.08,
                      delayChildren: 0.5,
                    }
                  }
                }}
                initial="hidden"
                animate="visible"
                className="text-5xl md:text-8xl lg:text-[7.5rem] font-serif font-bold text-white leading-[1] tracking-tighter"
              >
                {article.title.split("").map((char, index) => (
                  <motion.span
                    key={index}
                    variants={{
                      hidden: { opacity: 0 },
                      visible: { opacity: 1 }
                    }}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.h1>
            </div>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              className="text-xl md:text-2xl text-white/80 font-light leading-relaxed max-w-3xl mx-auto italic"
            >
              "{article.excerpt}"
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.8 }}
              className="flex flex-wrap items-center justify-center gap-8 pt-8"
            >
              <Link 
                to="/interviews"
                className="group relative inline-flex items-center space-x-6 bg-accent text-white px-12 py-6 text-[11px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-white hover:text-secondary rounded-full shadow-2xl"
              >
                <span className="relative z-10">Explore Interviews</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              <Link 
                to="/digital-magazine"
                className="group relative inline-flex items-center space-x-6 bg-white text-secondary px-12 py-6 text-[11px] font-bold uppercase tracking-[0.4em] transition-all hover:bg-accent hover:text-white rounded-full shadow-2xl"
              >
                <span className="relative z-10">Digital Magazine</span>
                <ArrowRight size={18} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Photographer Credit Overlay */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 right-10 text-right hidden md:block"
      >
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/40 block mb-1">Photographed By</span>
        <span className="text-xs font-serif font-bold text-white/80">Julian Montgomery</span>
      </motion.div>
    </section>
  )
}
