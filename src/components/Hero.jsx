import { Link } from 'react-router-dom'
import { ArrowRight, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero({ article }) {
  if (!article) return null

  return (
    <section className="relative h-[80vh] md:h-[90vh] w-full overflow-hidden bg-white border-b border-gray-100">
      {/* Background Image */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 10, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src={article.image} 
          alt={article.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-white/80 via-white/20 to-transparent hidden lg:block" />
      </motion.div>

      {/* Content */}
      <div className="container relative h-full mx-auto px-4 lg:px-12 flex items-center">
        <div className="max-w-4xl pt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <div className="flex items-center space-x-4 mb-8">
              <span className="h-[2px] w-12 bg-accent" />
              <span className="text-accent text-xs font-bold uppercase tracking-[0.4em]">Cover Story</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-[7rem] font-bold text-secondary mb-8 leading-[0.9] tracking-tighter text-balance">
              {article.title}
            </h1>
            
            <div className="flex flex-col md:flex-row md:items-center gap-8 md:gap-16">
              <p className="text-lg md:text-xl text-gray-500 max-w-lg font-light leading-relaxed">
                {article.excerpt}
              </p>
              
              <div className="flex items-center space-x-6">
                <Link 
                  to={`/article/${article.id}`}
                  className="group relative inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 rounded-full border border-secondary/20 hover:border-accent transition-all duration-500 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                  <ArrowRight size={32} className="relative text-secondary group-hover:text-white group-hover:rotate-[-45deg] transition-all duration-500" />
                </Link>
                <div className="flex flex-col">
                  <span className="text-secondary font-bold uppercase tracking-widest text-[10px]">Read The Full</span>
                  <span className="text-accent font-serif italic text-2xl">Perspective</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Category Tag */}
      <div className="absolute bottom-12 right-4 lg:right-12 writing-mode-vertical hidden md:block">
        <span className="text-secondary/10 text-7xl font-bold uppercase tracking-[0.2em] transform rotate-90 inline-block origin-right select-none">
          {article.category}
        </span>
      </div>

      {/* Hero Badge */}
      <div className="absolute top-1/2 right-12 -translate-y-1/2 hidden xl:flex flex-col items-center space-y-4">
         <div className="w-[1px] h-32 bg-secondary/10" />
         <div className="relative group cursor-pointer">
            <div className="absolute -inset-4 border border-accent/30 rounded-full group-hover:scale-150 group-hover:opacity-0 transition-all duration-1000" />
            <Play size={24} className="text-accent fill-accent" />
         </div>
         <span className="text-[8px] text-secondary/30 uppercase tracking-[0.5em] writing-mode-vertical">Watch Video</span>
      </div>
    </section>
  )
}

