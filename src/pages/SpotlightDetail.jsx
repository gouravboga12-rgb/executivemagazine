import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ArrowRight, Calendar, CheckCircle2, Globe, FileText, 
  Users, Award, Cpu, Share2, Info, ChevronRight, Star 
} from 'lucide-react'
import { spotlights } from '../lib/spotlightsData'
import SpotlightForm from '../components/SpotlightForm'

const iconMap = {
  Globe, FileText, Users, Award, Cpu, Share2
}

export default function SpotlightDetail() {
  const { id } = useParams()
  const spotlight = spotlights.find(s => s.id === id)
  const [activeSection, setActiveSection] = useState('about')
  const [isNavSticky, setIsNavSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY
      setIsNavSticky(offset > 500)

      // Update active section based on scroll position
      const sections = ['about', 'dates', 'why', 'who', 'apply', 'sponsor']
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          if (rect.top >= 0 && rect.top <= 200) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  if (!spotlight) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-serif mb-4">Spotlight Not Found</h1>
          <Link to="/spotlights" className="text-accent underline">Back to Spotlights</Link>
        </div>
      </div>
    )
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      const navHeight = 150
      const top = element.getBoundingClientRect().top + window.pageYOffset - navHeight
      window.scrollTo({ top, behavior: 'smooth' })
      setActiveSection(id)
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={spotlight.image} 
            alt={spotlight.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
          <div 
            className="absolute inset-0 opacity-40"
            style={{ background: `linear-gradient(to right, ${spotlight.color}, transparent)` }}
          />
        </div>

        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div 
                className="h-px w-12"
                style={{ backgroundColor: spotlight.color }}
              />
              <span className="text-white uppercase tracking-[0.5em] text-xs font-bold">Editorial Feature</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-8xl font-serif text-white mb-8 leading-[1.1] tracking-tighter"
            >
              {spotlight.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/80 mb-12 font-light leading-relaxed max-w-2xl"
            >
              {spotlight.subtitle}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap gap-6"
            >
              <button 
                onClick={() => scrollToSection('apply')}
                className="px-10 py-5 bg-white text-secondary font-bold uppercase text-xs tracking-widest hover:bg-accent hover:text-white transition-all shadow-xl"
              >
                Apply Now
              </button>
              <button 
                onClick={() => scrollToSection('sponsor')}
                className="px-10 py-5 border border-white text-white font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-secondary transition-all"
              >
                Become a Sponsor
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sticky Sub-Nav */}
      <div className={`sticky top-[80px] z-40 w-full transition-all duration-300 border-b border-gray-100 ${
        isNavSticky ? 'bg-white shadow-md py-4' : 'bg-white py-6'
      }`}>
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar">
            <div className="flex items-center space-x-8">
              {[
                { id: 'about', label: 'About' },
                { id: 'dates', label: 'Key Dates' },
                { id: 'why', label: 'Why Apply' },
                { id: 'who', label: 'Who Should Apply' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`text-[10px] uppercase tracking-widest font-bold whitespace-nowrap transition-colors relative pb-1 ${
                    activeSection === item.id ? 'text-secondary' : 'text-gray-400 hover:text-secondary'
                  }`}
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 w-full h-[2px]"
                      style={{ backgroundColor: spotlight.color }}
                    />
                  )}
                </button>
              ))}
            </div>
            <div className="hidden md:flex items-center space-x-4">
              <button 
                onClick={() => scrollToSection('apply')}
                style={{ backgroundColor: spotlight.color }}
                className="px-6 py-2.5 text-white text-[10px] font-bold uppercase tracking-widest shadow-lg hover:brightness-110 transition-all"
              >
                Apply
              </button>
              <button 
                onClick={() => scrollToSection('sponsor')}
                className="px-6 py-2.5 border border-gray-200 text-secondary text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all"
              >
                Sponsor
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section: About */}
      <section id="about" className="py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-3 text-accent">
                <Info size={18} />
                <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Introduction</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-secondary leading-tight">
                {spotlight.about.title}
              </h2>
              <p className="text-lg text-gray-500 font-light leading-relaxed text-justify-custom">
                {spotlight.about.content}
              </p>
              <div className="pt-4">
                <button 
                  onClick={() => scrollToSection('dates')}
                  className="group flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-secondary hover:text-accent transition-colors"
                >
                  <span>See Important Dates</span>
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="aspect-[4/5] rounded-sm overflow-hidden premium-shadow">
                <img 
                  src={spotlight.about.image} 
                  alt="About" 
                  className="w-full h-full object-cover transition-all duration-1000"
                />
              </div>
              <div 
                className="absolute -bottom-8 -left-8 w-48 h-48 -z-10 opacity-20"
                style={{ backgroundColor: spotlight.color }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Key Dates */}
      <section id="dates" className="py-24 bg-off-white border-y border-gray-100">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="space-y-4">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Timeline</span>
              <h2 className="text-4xl font-serif text-secondary">Key Dates</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {spotlight.keyDates.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="bg-white p-8 premium-shadow relative overflow-hidden group"
                >
                  <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Calendar size={60} strokeWidth={1} />
                  </div>
                  <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-4">{item.event}</h4>
                  <p className="text-2xl font-serif text-secondary">{item.date}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section: Why Apply */}
      <section id="why" className="py-24 md:py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-20 space-y-4">
            <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Recognition</span>
            <h2 className="text-4xl md:text-5xl font-serif text-secondary">Why Apply?</h2>
            <p className="text-gray-500 font-light italic">
              "Join the ranks of the world's most influential leaders and showcase your commitment to excellence."
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {spotlight.whyApply.map((item, idx) => {
              const Icon = iconMap[item.icon]
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="space-y-6"
                >
                  <div 
                    className="w-16 h-16 flex items-center justify-center text-white rounded-sm shadow-lg"
                    style={{ backgroundColor: spotlight.color }}
                  >
                    <Icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-secondary tracking-tight">{item.title}</h3>
                  <p className="text-gray-500 font-light leading-relaxed">{item.description}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Section: Who Should Apply */}
      <section id="who" className="py-24 bg-secondary text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=1974&auto=format&fit=crop" 
            alt="Pattern" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Eligibility</span>
              <h2 className="text-4xl md:text-6xl font-serif leading-tight">{spotlight.whoShouldApply.title}</h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed">
                {spotlight.whoShouldApply.content}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
                {spotlight.whoShouldApply.criteria.map((item, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <CheckCircle2 className="text-accent mt-1 flex-shrink-0" size={20} />
                    <span className="text-lg text-gray-100 font-light">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section: Apply Now */}
      <section id="apply" className="py-24 md:py-32 border-b border-gray-100">
        <div className="container mx-auto px-4 lg:px-8">
          <div 
            className="rounded-sm p-12 md:p-20 text-center space-y-10 relative overflow-hidden"
            style={{ backgroundColor: spotlight.colorSecondary }}
          >
            <div className="absolute top-10 left-10 opacity-10">
              <Star size={100} style={{ color: spotlight.color }} />
            </div>
            
            <div className="max-w-2xl mx-auto space-y-6 relative z-10">
              <h2 className="text-4xl md:text-5xl font-serif text-secondary">Ready to apply?</h2>
              <p className="text-lg text-gray-600 font-light mb-12">
                Submit your details via our secure application portal. Our editorial team reviews every submission for potential inclusion in the spotlight.
              </p>
              
              <div className="text-left">
                <SpotlightForm 
                  type="application" 
                  spotlightTitle={spotlight.title} 
                  color={spotlight.color} 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Sponsor Now */}
      <section id="sponsor" className="py-24 md:py-40">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <div className="lg:col-span-7 space-y-8">
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold text-accent">Partnership</span>
              <h2 className="text-4xl md:text-6xl font-serif text-secondary leading-tight">Sponsor the Spotlight</h2>
              <p className="text-xl text-gray-500 font-light leading-relaxed">
                {spotlight.sponsorNow.content}
              </p>
              <div className="flex items-center space-x-12 py-4">
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-secondary">10M+</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">Impressions</p>
                </div>
                <div className="h-10 w-px bg-gray-200" />
                <div className="space-y-1">
                  <p className="text-3xl font-bold text-secondary">45%</p>
                  <p className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">C-Suite Audience</p>
                </div>
              </div>
              <div className="pt-6">
                <SpotlightForm 
                  type="sponsorship" 
                  spotlightTitle={spotlight.title} 
                  color={spotlight.color} 
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="relative group">
                <div className="aspect-square rounded-full overflow-hidden premium-shadow">
                  <img 
                    src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                    alt="Sponsorship" 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                  />
                </div>
                <div 
                  className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-20 -z-10"
                  style={{ backgroundColor: spotlight.color }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Navigation */}
      <section className="bg-secondary py-12">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-8 text-white/50 text-[10px] font-bold uppercase tracking-widest">
          <Link to="/spotlights" className="hover:text-white transition-colors flex items-center space-x-2">
            <ArrowRight size={12} className="rotate-180" />
            <span>Back to Spotlights</span>
          </Link>
          <span>&copy; 2024 Executives Magazine Spotlight Series</span>
          <div className="flex items-center space-x-6">
            <Link to="/contact" className="hover:text-white transition-colors">Inquire</Link>
            <Link to="/about" className="hover:text-white transition-colors">Editorial</Link>
          </div>
        </div>
      </section>
    </div>
  )
}
