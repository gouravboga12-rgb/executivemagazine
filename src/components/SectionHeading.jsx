import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'

export default function SectionHeading({ title, subtitle, viewAllPath }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-gray-100 pb-6">
      <div className="space-y-2">
        {subtitle && <span className="text-accent uppercase tracking-[0.2em] text-xs font-bold">{subtitle}</span>}
        <h2 className="text-3xl md:text-4xl font-bold text-secondary uppercase tracking-tight">{title}</h2>
      </div>
      {viewAllPath && (
        <Link 
          to={viewAllPath}
          className="mt-4 md:mt-0 inline-flex items-center space-x-2 text-sm font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors group"
        >
          <span>View All</span>
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </Link>
      )}
    </div>
  )
}
