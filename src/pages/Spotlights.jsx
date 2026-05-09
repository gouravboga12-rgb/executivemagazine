import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, Globe, Zap, Award } from 'lucide-react'
import { spotlights } from '../lib/spotlightsData'

export default function Spotlights() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-secondary" data-aos="fade-down">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop" 
            alt="Spotlights Hero" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-transparent to-secondary" />
        </div>

        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-accent uppercase tracking-[0.5em] text-sm font-bold mb-4 block"
          >
            Editorial Series
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-serif text-white mb-6 tracking-tighter"
          >
            Spotlights
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-300 max-w-2xl mx-auto font-light leading-relaxed"
          >
            Showcasing the leaders, innovators, and visionaries redefining the global business landscape through dedicated editorial features.
          </motion.p>
        </div>
      </section>

      {/* Spotlights Grid */}
      <section className="py-24 container mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {spotlights.map((spotlight, index) => (
            <Link
              key={spotlight.id}
              to={`/spotlights/${spotlight.id}`}
              className="group relative h-[600px] overflow-hidden rounded-sm premium-shadow block"
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-110">
                <img 
                  src={spotlight.image} 
                  alt={spotlight.title} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                <div 
                  className="absolute inset-0 opacity-60"
                  style={{ background: `linear-gradient(to top, ${spotlight.color}, transparent)` }}
                />
              </div>

              <div className="absolute inset-0 p-12 flex flex-col justify-end text-white">
                <span className="text-[10px] font-bold uppercase tracking-[0.4em] mb-4 opacity-80">Annual Spotlight</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-tight">{spotlight.title}</h2>
                <p className="text-lg text-white/80 mb-8 max-w-md font-light line-clamp-3">
                  {spotlight.about.content}
                </p>
                <Link 
                  to={`/spotlights/${spotlight.id}`}
                  className="inline-flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest bg-white text-secondary px-8 py-4 w-fit hover:bg-accent hover:text-white transition-all duration-300"
                >
                  <span>Explore Spotlight</span>
                  <ArrowRight size={14} />
                </Link>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Participation Stats */}
      <section className="bg-off-white py-24 border-y border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-accent">
                <Globe size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold text-secondary">150+</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Global Countries</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-accent">
                <Zap size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold text-secondary">1.2M</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Monthly Readers</p>
            </div>
            <div className="text-center space-y-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm text-accent">
                <Award size={32} strokeWidth={1.5} />
              </div>
              <h3 className="text-4xl font-bold text-secondary">500+</h3>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-bold">Industry Leaders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 text-center" data-aos="fade-up">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif text-secondary mb-8">Ready to showcase your journey?</h2>
          <p className="text-gray-500 max-w-xl mx-auto mb-12 font-light italic">
            "Every leader has a story that can inspire a generation. Let us help you tell yours to the world's most influential audience."
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            <Link to="/contact" className="bg-secondary text-white px-10 py-4 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-accent transition-all duration-300">
              Inquire for Spotlight
            </Link>
            <Link to="/about" className="border border-secondary text-secondary px-10 py-4 uppercase text-[10px] font-bold tracking-[0.2em] hover:bg-secondary hover:text-white transition-all duration-300">
              Editorial Standards
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
