import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Share2 } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Hero({ article }) {
  if (!article) return null

  return (
    <section className="relative min-h-[90vh] flex items-center bg-white overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left Column: Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="order-2 lg:order-1 pt-12 lg:pt-0"
          >
            <div className="space-y-10 max-w-2xl">
              <div className="flex flex-col space-y-6">
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="flex items-center space-x-3"
                >
                  <span className="h-[1px] w-8 bg-accent" />
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">The Cover Story</span>
                </motion.div>

                <h1 className="text-5xl md:text-7xl lg:text-[5.5rem] font-serif font-bold text-secondary leading-[1] tracking-tighter">
                  {article.title}
                </h1>

                <div className="flex items-center space-x-6 text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                  <span className="flex items-center gap-2">
                    <Clock size={12} className="text-accent" />
                    7 Min Read
                  </span>
                  <span className="h-4 w-[1px] bg-gray-200" />
                  <span className="text-secondary">{article.category}</span>
                </div>
              </div>

              <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed border-l-2 border-gray-100 pl-8 italic">
                "{article.excerpt}"
              </p>

              <div className="flex flex-wrap items-center gap-8 pt-4">
                <Link 
                  to={`/article/${article.id}`}
                  className="group relative inline-flex items-center space-x-6 bg-secondary text-white px-10 py-5 text-[10px] font-bold uppercase tracking-[0.3em] overflow-hidden transition-all hover:bg-accent"
                >
                  <span className="relative z-10">Access Editorial</span>
                  <ArrowRight size={16} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Imagery */}
          <motion.div 
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
            className="order-1 lg:order-2 relative aspect-[4/5] lg:aspect-square group"
          >
            <div className="absolute inset-0 border-[20px] border-gray-50 -m-10 hidden lg:block" />
            
            <div className="relative h-full w-full overflow-hidden shadow-2xl">
              <img 
                src={article.image} 
                alt={article.title}
                className={`h-full w-full ${article.imageFit === 'contain' ? 'object-contain bg-gray-50' : 'object-cover'} transition-transform duration-[3s] group-hover:scale-110`}
                style={{ objectPosition: article.imagePosition || 'center' }}
              />
              <div className="absolute inset-0 bg-secondary/10 group-hover:bg-secondary/0 transition-colors duration-1000" />
              
              {/* Badge Overlay */}
              <div className="absolute bottom-10 left-10 right-10 p-8 glass-morphism border-none flex items-center justify-between opacity-0 translate-y-10 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-700">
                <div className="flex flex-col">
                  <span className="text-[8px] font-bold uppercase tracking-widest text-accent mb-1">Photographed By</span>
                  <span className="text-xs font-serif font-bold text-secondary">Editorial Archive</span>
                </div>
                <button className="text-secondary hover:text-accent transition-colors">
                  <Share2 size={18} />
                </button>
              </div>
            </div>

            {/* Geometric accents */}
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-accent/10 -z-10" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-b border-l border-accent/20 -z-10" />
          </motion.div>

        </div>
      </div>

      {/* Background Decorative Text */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 rotate-90 hidden lg:block select-none opacity-[0.03]">
        <span className="text-[15rem] font-bold text-secondary uppercase tracking-[0.2em] whitespace-nowrap">
          The Executive
        </span>
      </div>
    </section>
  )
}

