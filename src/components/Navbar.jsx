import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, User, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { articles } from '../lib/mockData'
import { events } from '../lib/eventsData'
import { spotlights } from '../lib/spotlightsData'
import { opinions } from '../lib/opinionsData.jsx'

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Interviews', path: '/interviews' },
  { name: 'Business', path: '/business' },
  { name: 'Opinion', path: '/opinion' },
  { name: 'Lifestyle', path: '/lifestyle' },
  { name: 'Events', path: '/events' },
  { name: 'Spotlights', path: '/spotlights' },
  { name: 'AI Info', path: '/ai-info' },
  { name: 'Magazine', path: '/digital-magazine' },
  { name: 'About', path: '/about' },
  { name: 'Contact', path: '/contact' },
]

const priorityInterviews = [
  {
    id: 'himedia-laboratories',
    company: 'HiMedia Laboratories',
    preview: '/interview-covers/himedia-cover.png',
    pdf: '/interview pages/HiMedia-Laboratories_3.pdf'
  },
  {
    id: 'agreeya',
    company: 'Agreeya',
    preview: '/interview-images/agreeya/page_1.png',
    pdf: '/interview pages/Agreeya.pdf'
  },
  {
    id: 'aig-hospitals',
    company: 'AIG Hospitals',
    preview: '/interview-images/aig-hospitals/page_1.png',
    pdf: '/interview pages/AIG Hospitals.pdf'
  },
  {
    id: 'alfa-laval',
    company: 'Alfa Laval India Limited',
    preview: '/interview-covers/alfalaval-cover.png',
    pdf: '/interview pages/Alfa Laval India Limited-story.pdf'
  }
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [hoveredLink, setHoveredLink] = useState(null)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setIsOpen(false)
    setHoveredLink(null)
  }, [location])

  const getRelatedArticles = (category) => {
    return articles.filter(a => a.category.toLowerCase().includes(category.toLowerCase())).slice(0, 4)
  }

  return (
    <>
      {/* Main Navbar */}
      <nav 
        onMouseLeave={() => setHoveredLink(null)}
        className={`sticky top-0 z-50 w-full transition-all duration-500 bg-white ${
        isScrolled ? 'shadow-xl py-3' : 'py-6 md:py-8'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Mobile Menu */}
            <div className="flex lg:hidden">
              <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-secondary">
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>

            {/* Left: Desktop Socials/Utilities */}
            <div className="hidden lg:flex items-center space-x-5">
              <Link to="/login" className="hover:text-accent transition-colors">
                <User size={20} />
              </Link>
            </div>

            {/* Center: Logo */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center">
              <span className={`font-serif font-bold text-secondary uppercase tracking-tighter transition-all duration-700 ${
                isScrolled ? 'text-xl md:text-2xl' : 'text-3xl md:text-4xl lg:text-5xl'
              }`}>
                Executives
              </span>
              {!isScrolled && (
                <span className="text-[8px] md:text-[10px] tracking-[0.6em] uppercase text-accent font-bold -mt-1 md:-mt-2">
                  Magazine
                </span>
              )}
            </Link>

            {/* Right: CTA */}
            <div className="flex items-center space-x-4">
              {/* Add any other right-side utilities here if needed */}
            </div>
          </div>

          {/* Desktop Category Nav */}
          <div className={`hidden lg:flex justify-center items-center space-x-5 transition-all duration-500 ${
            isScrolled ? 'mt-4 pb-2' : 'mt-8'
          }`}>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path || 
                              (link.path !== '/' && location.pathname.startsWith(link.path)) ||
                              (link.path.startsWith('/category/') && location.pathname === link.path);

              return (
                <div 
                  key={link.name}
                  onMouseEnter={() => setHoveredLink(link.name)}
                  className="relative group py-2"
                >
                  <Link
                    to={link.path}
                    className={`font-bold uppercase tracking-[0.2em] flex items-center transition-all whitespace-nowrap ${
                      isScrolled ? 'text-[9px]' : 'text-[11px]'
                    } ${isActive ? 'text-accent' : 'text-secondary hover:text-accent'}`}
                  >
                    {link.name}
                    {getRelatedArticles(link.name).length > 0 && (
                      <ChevronDown size={10} className="ml-1 opacity-20 group-hover:opacity-100 transition-opacity" />
                    )}
                  </Link>
                  <span className={`absolute bottom-0 left-0 h-[2px] bg-accent transition-all duration-300 ${
                    isActive ? 'w-full' : 'w-0 group-hover:w-full'
                  }`} />
                </div>
              );
            })}
          </div>
        </div>

        {/* Mega Menu Overlay */}
        <AnimatePresence>
          {hoveredLink && getRelatedArticles(hoveredLink).length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute left-0 w-full bg-white border-t border-gray-100 shadow-2xl z-40 overflow-hidden"
            >
              <div className="container mx-auto px-4 lg:px-8 py-12">
                <div className="grid grid-cols-12 gap-12">
                  <div className="col-span-3">
                    <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em] mb-4 block">Section</span>
                    <h3 className="text-4xl font-bold text-secondary tracking-tighter uppercase mb-6">{hoveredLink}</h3>
                    <p className="text-sm text-gray-400 font-light leading-relaxed mb-8">
                      {hoveredLink === 'Interviews' 
                        ? 'Access our exclusive collection of deep-dive conversations with industry titans in their original archival format.'
                        : `Exploring the latest insights and featured stories within our ${hoveredLink.toLowerCase()} editorial archive.`}
                    </p>
                    <Link to={hoveredLink === 'Interviews' || hoveredLink === 'Events' ? hoveredLink.toLowerCase() : `/category/${hoveredLink.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors flex items-center">
                      Explore All <ChevronDown size={12} className="-rotate-90 ml-1" />
                    </Link>
                  </div>
                  <div className="col-span-9">
                    <div className="grid grid-cols-4 gap-8">
                      {hoveredLink === 'Interviews' ? (
                        priorityInterviews.map((item) => (
                          <a 
                            key={item.id} 
                            href={item.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group/item space-y-4"
                          >
                            <div className="aspect-[3/4] overflow-hidden bg-gray-50 border border-gray-100 relative shadow-sm group-hover/item:shadow-md transition-all">
                              <img src={item.preview} alt={item.company} className="w-full h-full object-contain p-2 transition-all duration-700 group-hover/item:scale-105" />
                              <div className="absolute inset-0 bg-secondary/5 group-hover/item:bg-secondary/0 transition-colors" />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-accent">PDF Archive</span>
                              <h4 className="text-xs font-bold text-secondary leading-tight group-hover/item:text-accent transition-colors line-clamp-2">{item.company}</h4>
                            </div>
                          </a>
                        ))
                      ) : hoveredLink === 'Events' ? (
                        events.slice(0, 4).map((event) => (
                          <Link 
                            key={event.id} 
                            to="/events"
                            className="group/item space-y-4"
                          >
                            <div className="aspect-[16/10] overflow-hidden bg-gray-100 relative shadow-sm">
                              <img src={event.image} alt={event.title} className="w-full h-full object-cover transition-all duration-700 group-hover/item:scale-105" />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-accent">{event.category}</span>
                              <h4 className="text-xs font-bold text-secondary leading-tight group-hover/item:text-accent transition-colors line-clamp-2">{event.title}</h4>
                            </div>
                          </Link>
                        ))
                      ) : hoveredLink === 'Spotlights' ? (
                        spotlights.map((spotlight) => (
                          <Link 
                            key={spotlight.id} 
                            to={`/spotlights/${spotlight.id}`}
                            className="group/item space-y-4"
                          >
                            <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative shadow-sm">
                              <img src={spotlight.image} alt={spotlight.title} className="w-full h-full object-cover transition-all duration-700 group-hover/item:scale-105" />
                              <div 
                                className="absolute inset-0 opacity-20"
                                style={{ backgroundColor: spotlight.color }}
                              />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-accent">Spotlight Series</span>
                              <h4 className="text-xs font-bold text-secondary leading-tight group-hover/item:text-accent transition-colors line-clamp-2">{spotlight.title}</h4>
                            </div>
                          </Link>
                        ))
                      ) : hoveredLink === 'Opinion' ? (
                        opinions.slice(0, 4).map((opi) => (
                          <Link 
                            key={opi.id} 
                            to="/opinion"
                            className="group/item space-y-4"
                          >
                            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                              <img src={opi.image} alt={opi.title} className="w-full h-full object-cover transition-all duration-700 group-hover/item:scale-105" />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-accent">{opi.author}</span>
                              <h4 className="text-xs font-bold text-secondary leading-tight group-hover/item:text-accent transition-colors line-clamp-2">{opi.title}</h4>
                            </div>
                          </Link>
                        ))
                      ) : (
                        getRelatedArticles(hoveredLink).map((article) => (
                          <Link 
                            key={article.id} 
                            to={`/article/${article.id}`}
                            className="group/item space-y-4"
                          >
                            <div className="aspect-[4/3] overflow-hidden bg-gray-100">
                              <img src={article.image} alt={article.title} className="w-full h-full object-cover transition-all duration-700 group-hover/item:scale-105" />
                            </div>
                            <div className="space-y-2">
                              <span className="text-[8px] font-bold uppercase tracking-widest text-accent">{article.author}</span>
                              <h4 className="text-xs font-bold text-secondary leading-tight group-hover/item:text-accent transition-colors line-clamp-2">{article.title}</h4>
                            </div>
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 py-3 text-center">
                 <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-gray-300">Premium Editorial Content &copy; 2024 Executives Media</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>



      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 left-0 z-[60] w-full md:w-[400px] bg-white shadow-2xl p-8 flex flex-col"
          >
            <div className="flex justify-between items-center mb-16">
              <Link to="/" className="flex flex-col">
                <span className="font-serif font-bold text-2xl text-secondary uppercase tracking-tighter">Executives</span>
                <span className="text-[8px] tracking-[0.4em] uppercase text-accent font-bold -mt-1">Magazine</span>
              </Link>
              <button onClick={() => setIsOpen(false)} className="p-2 text-secondary"><X size={24} /></button>
            </div>
            
            <div className="flex-grow overflow-y-auto space-y-8 pr-4">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    to={link.path}
                    className="text-4xl font-serif font-bold text-secondary hover:text-accent transition-colors block"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </div>

            <div className="pt-12 border-t border-gray-100 mt-auto">
              <p className="text-[10px] text-gray-400 uppercase tracking-widest">&copy; 2024 Executives Media Group</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

