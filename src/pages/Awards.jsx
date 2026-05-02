import { motion } from 'framer-motion'
import { Award, Trophy, Star, ChevronRight, Play } from 'lucide-react'

export default function Awards() {
  const categories = [
    { title: "Executive of the Year", winner: "Jonathan Thorne", company: "Nexus Dynamics", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=2000&auto=format&fit=crop" },
    { title: "Innovator of the Decade", winner: "Sarah Jenkins", company: "Lumina Tech", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=2000&auto=format&fit=crop" },
    { title: "Global Impact Award", winner: "Marcus Chen", company: "EcoStream", image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=2000&auto=format&fit=crop" },
    { title: "Female Leader of 2024", winner: "Elena Rodriguez", company: "Zenith Group", image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=2000&auto=format&fit=crop" },
    { title: "Sustainability Pioneer", winner: "David Park", company: "GreenGrid", image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=2000&auto=format&fit=crop" },
    { title: "Disruptor Award", winner: "Alex Rivera", company: "Volt Motors", image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=2000&auto=format&fit=crop" }
  ]

  return (
    <div className="pb-32 bg-white text-secondary">
      {/* Cinematic Header - Bright theme */}
      <header className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-gray-50 border-b border-gray-100">
        <div className="absolute inset-0">
           <img 
             src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop" 
             alt="Awards Ceremony" 
             className="w-full h-full object-cover opacity-10"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </div>
        
        <div className="container relative z-10 px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
             <div className="flex justify-center items-center space-x-6">
                <div className="h-[2px] w-20 bg-accent/30" />
                <Trophy size={40} className="text-accent" />
                <div className="h-[2px] w-20 bg-accent/30" />
             </div>
             <span className="text-accent text-[12px] font-bold uppercase tracking-[0.6em] block">The Annual Recognition</span>
             <h1 className="text-6xl md:text-8xl lg:text-[12rem] font-bold uppercase tracking-tighter leading-none italic font-serif text-secondary">
               Excellence <br/> <span className="text-accent not-italic">Awards</span>
             </h1>
             <p className="max-w-2xl mx-auto text-gray-500 text-xl font-light font-serif italic">
                Celebrating the visionaries, disruptors, and titans of global industry who are redefining the future of leadership.
             </p>
             <button className="bg-secondary text-white px-12 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all">Nominate for 2025</button>
          </motion.div>
        </div>
      </header>

      {/* Categories Grid - No Grayscale */}
      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-8">
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {categories.map((cat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="group relative aspect-[3/4] overflow-hidden bg-gray-50 shadow-xl"
                >
                   <img 
                     src={cat.image} 
                     alt={cat.winner} 
                     className="w-full h-full object-cover group-hover:scale-110 transition-all duration-1000"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-secondary via-secondary/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
                   
                   <div className="absolute bottom-0 left-0 p-12 w-full space-y-4">
                      <div className="flex items-center space-x-3 text-accent text-[10px] font-bold uppercase tracking-[0.3em]">
                         <Star size={12} className="fill-accent" />
                         <span>Winner / {cat.title}</span>
                      </div>
                      <h3 className="text-3xl font-serif font-bold text-white leading-tight">{cat.winner}</h3>
                      <p className="text-white/60 text-sm font-bold uppercase tracking-widest">{cat.company}</p>
                      
                      <div className="pt-8 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                         <button className="flex items-center space-x-4 text-accent text-[10px] font-bold uppercase tracking-[0.4em]">
                            <span>Read Citation</span>
                            <ChevronRight size={14} />
                         </button>
                      </div>
                   </div>
                </motion.div>
              ))}
           </div>
        </div>
      </section>

      {/* Hall of Fame Video Section - Brighter */}
      <section className="py-32 relative overflow-hidden bg-gray-50 border-y border-gray-100">
         <div className="container mx-auto px-4 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
               <div className="space-y-10">
                  <span className="text-accent text-[10px] font-bold uppercase tracking-[0.4em]">The Ceremony</span>
                  <h2 className="text-5xl md:text-7xl font-bold uppercase tracking-tighter leading-tight text-secondary">Watch the <br/> Highlights</h2>
                  <p className="text-gray-500 text-lg leading-relaxed font-light italic font-serif">
                     "A night of unprecedented gathering of global power, celebrating the resilience and vision of today's business elite."
                  </p>
                  <div className="space-y-6">
                     {[
                       "Keynote Address by Jonathan Thorne",
                       "The Innovation Panel 2024",
                       "Behind the Scenes: The Judging Process"
                     ].map((vid, i) => (
                       <div key={i} className="flex items-center space-x-6 group cursor-pointer border-b border-gray-200 pb-4">
                          <div className="w-10 h-10 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent transition-all">
                             <Play size={14} className="group-hover:fill-white transition-colors" />
                          </div>
                          <span className="text-sm font-bold uppercase tracking-widest group-hover:text-accent transition-colors text-secondary">{vid}</span>
                       </div>
                     ))}
                  </div>
               </div>
               <div className="relative group">
                  <div className="absolute inset-0 bg-accent/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <img src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=2012&auto=format&fit=crop" alt="Highlight" className="w-full relative z-10 shadow-2xl" />
                  <div className="absolute inset-0 z-20 flex items-center justify-center">
                     <div className="w-24 h-24 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center group-hover:scale-110 transition-transform cursor-pointer border border-white/20">
                        <Play size={40} className="fill-white" />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Become a Partner */}
      <section className="py-24 bg-white text-secondary">
         <div className="container mx-auto px-4 lg:px-8 text-center max-w-4xl">
            <h2 className="text-4xl md:text-6xl font-serif font-bold italic mb-10 leading-tight">Partner with Excellence.</h2>
            <p className="text-gray-400 mb-12 text-lg leading-relaxed">Join the prestigious list of global brands that support the recognition of excellence in business leadership.</p>
            <div className="flex flex-wrap justify-center gap-12 opacity-20 mb-16">
               {/* Mock Partner Logos */}
               <div className="text-4xl font-bold tracking-tighter text-secondary">NEXUS</div>
               <div className="text-4xl font-serif font-bold italic text-secondary">Lumina</div>
               <div className="text-4xl font-bold text-secondary">ZENITH</div>
               <div className="text-4xl font-bold tracking-widest text-secondary">VOLT</div>
            </div>
            <button className="bg-secondary text-white px-12 py-6 text-[10px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl">Become a Sponsor</button>
         </div>
      </section>
    </div>
  )
}

