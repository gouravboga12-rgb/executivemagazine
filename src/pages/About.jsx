import { Target, Eye, ShieldCheck, Users, Quote } from 'lucide-react'
import { motion } from 'framer-motion'

export default function About() {
  return (
    <div className="pb-32 bg-white">
      {/* Cinematic Hero */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden bg-secondary">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2069&auto=format&fit=crop" 
            alt="About Executives" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white" />
        </div>
        <div className="container relative z-10 px-4 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="caps-heading mb-6 block text-accent"
          >
            The Masthead
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-6xl md:text-8xl lg:text-[10rem] font-bold text-secondary uppercase tracking-tighter leading-none"
          >
            Defining Power
          </motion.h1>
        </div>
      </section>

      {/* Narrative Section */}
      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
             <div className="lg:col-span-4">
                <h2 className="text-4xl font-serif font-bold text-secondary leading-tight italic">
                  "We don't just report on business; we analyze the architecture of leadership."
                </h2>
             </div>
             <div className="lg:col-span-8 space-y-10">
                <p className="text-2xl text-gray-500 leading-relaxed font-light first-letter:text-7xl first-letter:font-bold first-letter:text-secondary first-letter:mr-3 first-letter:float-left">
                  Executives Magazine was established with a singular focus: to provide the world's most influential decision-makers with the clarity and insight required to navigate the complexities of modern industry. From boardrooms in London to innovation hubs in Silicon Valley, we bridge the gap between corporate strategy and executive lifestyle.
                </p>
                <p className="text-xl text-gray-400 leading-relaxed font-light">
                  Our team of veteran journalists and industry analysts bring a combined 20+ years of experience in global markets, investigative reporting, and leadership psychology. We believe that true power lies in the intersection of data-driven strategy and human-centric empathy.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Visual Identity Section */}
      <section className="py-24 bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="relative group">
                  <div className="absolute -inset-4 border border-accent/20 group-hover:border-accent transition-colors duration-1000" />
                  <img 
                    src="https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=2071&auto=format&fit=crop" 
                    alt="The Visionary"
                    className="w-full hover:scale-105 transition-all duration-1000"
                  />
                  <div className="absolute bottom-10 -right-10 bg-secondary p-12 text-white hidden xl:block shadow-2xl">
                     <Quote size={40} className="text-accent mb-6" />
                     <p className="text-lg font-serif italic mb-4 max-w-xs">Integrity is the only currency that never devalues in global business.</p>
                     <span className="text-xs font-bold uppercase tracking-widest text-accent">— Editorial Board</span>
                  </div>
               </div>
               <div className="space-y-12">
                  <span className="caps-heading">Our Core Pillars</span>
                  <div className="space-y-16">
                     {[
                       { title: "Radical Transparency", desc: "We uphold the highest standards of journalistic ethics, ensuring every perspective is backed by rigorous analysis.", icon: <ShieldCheck className="text-accent" size={32} /> },
                       { title: "Intellectual Rigor", desc: "Our content is curated for those who demand more than just headlines. We dive deep into the 'why' behind the market shifts.", icon: <Target className="text-accent" size={32} /> },
                       { title: "Global Perspective", desc: "In a connected world, leadership has no borders. We provide a truly international lens on innovation and power.", icon: <Users className="text-accent" size={32} /> }
                     ].map((pillar, i) => (
                       <motion.div 
                         key={i}
                         initial={{ opacity: 0, x: 20 }}
                         whileInView={{ opacity: 1, x: 0 }}
                         transition={{ delay: i * 0.2 }}
                         className="flex items-start space-x-8 group"
                       >
                          <div className="mt-1">{pillar.icon}</div>
                          <div className="space-y-2">
                             <h3 className="text-2xl font-serif font-bold text-secondary group-hover:text-accent transition-colors">{pillar.title}</h3>
                             <p className="text-gray-500 leading-relaxed max-w-md">{pillar.desc}</p>
                          </div>
                       </motion.div>
                     ))}
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Global Impact Counter */}
      <section className="py-32">
         <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 text-center">
               {[
                 { label: "Monthly Readers", val: "250K+" },
                 { label: "Global Editions", val: "12" },
                 { label: "Industry Awards", val: "45" },
                 { label: "CEO Interviews", val: "1.2K" }
               ].map((stat, i) => (
                 <div key={i} className="space-y-2">
                    <h4 className="text-5xl md:text-6xl font-bold text-secondary tracking-tighter">{stat.val}</h4>
                    <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">{stat.label}</p>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 bg-secondary text-white">
         <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-10 leading-tight">Join the Inner Circle of Global Leadership.</h2>
            <div className="flex flex-col md:flex-row justify-center gap-6">
               <button className="bg-accent text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-secondary transition-all">Subscribe to Edition</button>
               <button className="border border-white/20 text-white px-12 py-5 text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-white hover:text-secondary transition-all">View Archive</button>
            </div>
         </div>
      </section>
    </div>
  )
}
