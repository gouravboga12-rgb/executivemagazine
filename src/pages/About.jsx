import { 
  Target, Eye, ShieldCheck, Users, Quote, Globe, 
  MapPin, Award, BookOpen, Fingerprint, Star, ExternalLink,
  ChevronRight, ArrowUpRight, CheckCircle2, History
} from 'lucide-react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'

export default function About() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
  }

  return (
    <div className="pb-32 bg-white selection:bg-accent selection:text-white">
      <SEO 
        title="Our Manifesto & Legacy" 
        description="Learn about the editorial mandate and manifesto of Executives Magazine, architecting the dialogue between today's corporate pioneers and tomorrow's visionaries."
        keywords="about Executives Magazine, C-suite journal, corporate vision, corporate leaders editorial board, global business bureaus, Singapore APAC hub"
      />
      {/* ── Cinematic Hero ── */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-secondary" data-aos="fade-down">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" 
            alt="About Executives" 
            className="w-full h-full object-cover opacity-20 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-secondary/50 via-secondary to-secondary" />
        </div>
        
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-5xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center space-x-4 mb-8"
            >
              <div className="h-[1px] w-12 bg-accent" />
              <span className="text-accent text-[11px] font-bold uppercase tracking-[0.6em]">EST. 2024</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-7xl md:text-9xl lg:text-[11rem] font-bold text-white uppercase tracking-tighter leading-[0.85] mb-12"
            >
              Legacy <br/> <span className="text-accent italic font-serif lowercase tracking-normal">of</span> Vision.
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 1 }}
              className="flex flex-col md:flex-row items-start md:items-center gap-12"
            >
              <p className="text-xl md:text-2xl text-white/50 font-light leading-relaxed max-w-2xl font-serif italic border-l border-white/10 pl-8">
                "Executives Magazine serves as the ultimate journal of record for global leadership, architecting the dialogue between today's innovators and tomorrow's legacy."
              </p>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 text-white/20 animate-bounce">
          <ChevronRight size={32} className="rotate-90" />
        </div>
      </section>

      {/* ── The Manifesto ── */}
      <section className="py-32 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
            <motion.div {...fadeInUp} className="space-y-12">
              <div className="space-y-6">
                <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">The Manifesto</span>
                <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary leading-[1.1]">
                  Defining the <br/> C-Suite Standard.
                </h2>
                <p className="text-xl text-gray-500 leading-relaxed font-light">
                  We believe that leadership is not a title, but a continuous pursuit of excellence. Executives Magazine was founded to bridge the gap between abstract corporate strategy and human-centric leadership.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8">
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-accent"><History size={24} /></div>
                  <h4 className="text-lg font-bold text-secondary uppercase tracking-tight">Decades of Context</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Our archives span the most significant industrial shifts of the 21st century, providing unmatched historical context.</p>
                </div>
                <div className="space-y-4">
                  <div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-accent"><Globe size={24} /></div>
                  <h4 className="text-lg font-bold text-secondary uppercase tracking-tight">Global Sovereignty</h4>
                  <p className="text-xs text-gray-400 leading-relaxed">Independent editorial bureaus in London, Singapore, and Dubai ensure a truly globalized perspective.</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 1.1 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5 }}
              className="relative aspect-[4/5] bg-gray-100 group overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
                alt="Executive Dialogue" 
                className="w-full h-full object-cover transition-all duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-secondary/10" />
              <div className="absolute bottom-0 left-0 right-0 p-12 glass-morphism border-none">
                <Quote size={40} className="text-accent mb-6" />
                <p className="text-lg font-serif italic text-secondary leading-relaxed mb-6">
                  "Authenticity is the soul of leadership. In an era of noise, Executives Magazine provides the signal."
                </p>
                <div className="flex items-center space-x-4">
                   <div className="w-8 h-[1px] bg-secondary/20" />
                   <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">The Editorial Board</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Authority Metrics ── */}
      <section className="py-32 bg-secondary relative overflow-hidden" data-aos="fade-up">
        <div className="absolute inset-0 opacity-[0.03] flex items-center justify-center">
          <span className="text-[30rem] font-bold text-white select-none">IMPACT</span>
        </div>
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-16 lg:gap-24">
            {[
              { val: "250K+", label: "Monthly Digital Readers" },
              { val: "150+", label: "Executive Interviews" },
              { val: "45+", label: "Global Hubs & Bureaus" },
              { val: "2026", label: "Future Intelligence Goal" }
            ].map((stat, i) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="space-y-4 text-center lg:text-left"
              >
                <span className="block text-6xl md:text-7xl font-serif font-bold text-white leading-none">{stat.val}</span>
                <p className="text-accent text-[9px] font-bold uppercase tracking-[0.3em]">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Pillars ── */}
      <section className="py-32 bg-white" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-24 space-y-6">
             <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">The Framework</span>
             <h2 className="text-4xl md:text-6xl font-serif font-bold text-secondary">Our Core Pillars.</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <ShieldCheck size={32} />, 
                title: "Absolute Integrity", 
                desc: "Every interview is verified, double-transcribed, and vetted for strategic accuracy." 
              },
              { 
                icon: <Target size={32} />, 
                title: "Strategic Impact", 
                desc: "We prioritize stories that offer actionable insights for boardrooms and decision-makers." 
              },
              { 
                icon: <Fingerprint size={32} />, 
                title: "Exclusive Access", 
                desc: "securing sit-downs with reclusive leaders who rarely engage with mainstream media." 
              }
            ].map((pillar, i) => (
              <motion.div 
                key={pillar.title}
                {...fadeInUp}
                transition={{ delay: i * 0.1 }}
                className="p-12 bg-gray-50 border border-gray-100 group hover:bg-secondary transition-all duration-700 hover:-translate-y-2"
              >
                <div className="text-accent mb-8 group-hover:text-white transition-colors">{pillar.icon}</div>
                <h4 className="text-2xl font-serif font-bold text-secondary group-hover:text-white mb-4 transition-colors">{pillar.title}</h4>
                <p className="text-sm text-gray-500 group-hover:text-gray-400 leading-relaxed font-light transition-colors">{pillar.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── The Global Network ── */}
      <section className="py-32 border-t border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-24 items-center">
            <div className="lg:w-1/3 space-y-8">
              <span className="text-accent uppercase tracking-[0.4em] text-[10px] font-bold">Global Presence</span>
              <h2 className="text-4xl font-serif font-bold text-secondary leading-tight">Every Major <br/> Economic Hub.</h2>
              <p className="text-gray-500 font-light leading-relaxed">
                From the financial districts of London and New York to the tech corridors of Singapore, our team is embedded in the locations where the world's future is being written.
              </p>
              <div className="space-y-4 pt-4">
                {['London HQ', 'New York Bureau', 'Dubai Regional Office', 'Singapore APAC Hub'].map(hub => (
                  <div key={hub} className="flex items-center space-x-4 group cursor-pointer">
                    <div className="w-2 h-2 rounded-full bg-accent scale-0 group-hover:scale-100 transition-transform" />
                    <span className="text-xs font-bold uppercase tracking-widest text-secondary group-hover:text-accent transition-colors">{hub}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:w-2/3">
               <div className="relative aspect-video rounded-sm overflow-hidden shadow-2xl bg-gray-100">
                  <img 
                    src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?q=80&w=2044&auto=format&fit=crop" 
                    alt="World Hubs" 
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-secondary/40 backdrop-blur-[1px]" />
                  <div className="absolute inset-0 flex items-center justify-center p-6">
                     <div className="bg-white p-12 text-center max-w-sm border border-white/20 shadow-2xl">
                        <Globe size={40} className="text-accent mx-auto mb-6 animate-pulse" />
                        <h4 className="text-xl font-serif font-bold text-secondary mb-2">Network Expansion 2026</h4>
                        <p className="text-[10px] text-gray-500 uppercase tracking-widest leading-relaxed">Scaling our editorial presence to 60+ countries.</p>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Final Call to Action ── */}
      <section className="py-24 bg-secondary" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <motion.div 
            {...fadeInUp}
            className="bg-white p-16 md:p-24 text-center space-y-10 border-b-[10px] border-accent"
          >
            <h2 className="text-5xl md:text-7xl font-serif font-bold text-secondary tracking-tight">Collaborate With Authority.</h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed italic">
              "We invite the world's most innovative executives to join our global network and share their vision."
            </p>
            <div className="flex flex-wrap justify-center gap-8 pt-6">
              <Link to="/contact" className="bg-secondary text-white px-12 py-5 text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-xl">
                Begin Application
              </Link>
              <Link to="/digital-magazine" className="flex items-center space-x-4 text-secondary text-[11px] font-bold uppercase tracking-[0.3em] group">
                <span>View Digital Archive</span>
                <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
