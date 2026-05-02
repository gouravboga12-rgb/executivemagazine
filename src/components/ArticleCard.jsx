import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

export default function ArticleCard({ article, variant = 'default' }) {
  if (variant === 'compact') {
    return (
      <Link to={`/article/${article.id}`} className="group flex space-x-6 items-center border-b border-gray-100 pb-6 last:border-0 last:pb-0">
        <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden bg-gray-100 rounded-full">
          <img 
            src={article.image} 
            alt={article.title}
            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
          />
        </div>
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-1">
             <span className="text-[9px] font-bold uppercase tracking-widest text-accent">
               {article.category}
             </span>
             <span className="w-1 h-1 bg-gray-200 rounded-full" />
             <span className="text-[9px] text-gray-400 uppercase tracking-widest">{article.date}</span>
          </div>
          <h3 className="text-md font-bold text-secondary group-hover:text-accent transition-colors line-clamp-2 leading-tight font-serif">
            {article.title}
          </h3>
        </div>
      </Link>
    )
  }

  if (variant === 'magazine') {
    return (
      <div className="group border border-gray-100 p-8 hover:bg-gray-50 transition-colors duration-500">
        <Link to={`/article/${article.id}`} className="block space-y-6">
          <div className="flex justify-between items-start">
             <span className="px-3 py-1 bg-secondary text-white text-[9px] font-bold uppercase tracking-widest">
               {article.category}
             </span>
             <ArrowUpRight size={20} className="text-gray-300 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
          </div>
          <h3 className="text-xl md:text-2xl font-serif font-bold text-secondary group-hover:text-accent transition-colors leading-[1.1]">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed border-l-2 border-accent pl-4">
            {article.excerpt}
          </p>
          <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
             <div className="w-8 h-8 rounded-full bg-gray-100 overflow-hidden">
                <img src={`https://i.pravatar.cc/150?u=${article.authorId}`} alt={article.author} className="w-full h-full object-cover" />
             </div>
             <div>
                <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">{article.author}</p>
                <p className="text-[9px] text-gray-400 uppercase tracking-widest">{article.date}</p>
             </div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group"
    >
      <Link to={`/article/${article.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-gray-100 mb-8 premium-shadow">
          <img 
            src={article.image} 
            alt={article.title}
            className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
          />
          <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/10 transition-colors duration-500" />
          <div className="absolute top-6 left-6 overflow-hidden">
            <motion.span 
              initial={{ y: '100%' }}
              whileHover={{ y: 0 }}
              className="inline-block bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-secondary shadow-2xl"
            >
              Read Article
            </motion.span>
          </div>
        </div>
        
        <div className="space-y-4 px-2">
          <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-[0.2em] text-accent">
            <span className="bg-accent/10 px-2 py-1 rounded-sm">{article.category}</span>
            <span className="text-gray-300">/</span>
            <span className="text-gray-400">{article.date}</span>
          </div>
          <h3 className="text-2xl font-bold text-secondary group-hover:text-accent transition-colors leading-[1.1] tracking-tight">
            {article.title}
          </h3>
          <p className="text-gray-500 text-sm leading-relaxed line-clamp-2">
            {article.excerpt}
          </p>
        </div>
      </Link>
    </motion.div>
  )
}
