import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, ChevronRight, Globe } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    
    try {
      // 1. Save to Supabase (Database)
      const { error } = await supabase
        .from('contacts')
        .insert([formData])
      
      if (error) throw error

      // 2. Prepare WhatsApp message
      const phoneNumber = "919000000000" // Replace with your actual WhatsApp number
      const message = `*New Inquiry from Executives Magazine*%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Subject:* ${formData.subject}%0A` +
        `*Message:* ${formData.message}`
      
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`

      // 3. Open WhatsApp
      window.open(whatsappURL, '_blank')
      
      setStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <div className="pb-32 bg-white">
      {/* Immersive Header - Light */}
      <header className="relative h-[50vh] flex items-center bg-gray-50 overflow-hidden border-b border-gray-100">
         <div className="absolute inset-0 opacity-40">
            <img src="https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop" alt="Contact HQ" className="w-full h-full object-cover" />
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
         <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="caps-heading mb-6 block text-accent"
            >
              Collaborate
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-8xl font-bold text-secondary uppercase tracking-tighter leading-none"
            >
              Connect with <br/> the <span className="text-accent italic font-serif lowercase tracking-normal">Board</span>
            </motion.h1>
         </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white premium-shadow border border-gray-100">
          
          {/* Info Sidebar - Light Luxe Style */}
          <div className="lg:col-span-4 bg-gray-50 p-12 md:p-16 text-secondary space-y-16 border-r border-gray-100">
            <div className="space-y-6">
               <h2 className="text-3xl font-serif font-bold italic">Global Bureaus</h2>
               <p className="text-gray-400 text-sm leading-relaxed">
                  Our editorial and commercial teams are located in the world's major financial hubs. Reach out for partnerships, interviews, or advertising inquiries.
               </p>
            </div>
            
            <div className="space-y-12">
               {[
                 { label: "Editorial Inquiry", val: "editorial@executivesmagazine.com", icon: <Mail size={18} /> },
                 { label: "London Headquarters", val: "+44 (0) 20 7123 4567", icon: <Globe size={18} /> },
                 { label: "Press & Media", val: "press@executivesmagazine.com", icon: <Send size={18} /> }
               ].map((item, i) => (
                 <div key={i} className="flex items-start space-x-6 group">
                    <div className="p-3 bg-white text-accent rounded-sm group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                       {item.icon}
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{item.label}</p>
                       <p className="text-sm font-medium hover:text-accent transition-colors cursor-pointer">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="pt-16 border-t border-gray-200">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-8">Direct Executive Line</h3>
               <a 
                 href="https://wa.me/yournumber" 
                 className="flex items-center justify-between group bg-white border border-gray-100 p-6 hover:bg-secondary hover:text-white transition-all shadow-sm"
               >
                 <div className="flex items-center space-x-4">
                    <MessageCircle size={20} className="text-accent" />
                    <span className="text-xs font-bold uppercase tracking-widest">WhatsApp Direct</span>
                 </div>
                 <ChevronRight size={16} className="group-hover:translate-x-2 transition-transform" />
               </a>
            </div>
          </div>

          {/* Contact Form - Refined & Minimal */}
          <div className="lg:col-span-8 p-12 md:p-20">
            <div className="max-w-2xl">
               <h2 className="text-4xl font-bold text-secondary uppercase tracking-tight mb-4">Brief the Team</h2>
               <p className="text-gray-400 mb-16 font-light">Please provide the details of your inquiry and our executive office will respond within 24 hours.</p>
               
               <form onSubmit={handleSubmit} className="space-y-12">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                   <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Your Name</label>
                     <input 
                       type="text" 
                       required
                       value={formData.name}
                       onChange={(e) => setFormData({...formData, name: e.target.value})}
                       className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-200"
                       placeholder="e.g. Alexander Thorne"
                     />
                   </div>
                   <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Corporate Email</label>
                     <input 
                       type="email" 
                       required
                       value={formData.email}
                       onChange={(e) => setFormData({...formData, email: e.target.value})}
                       className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-200"
                       placeholder="a.thorne@nexus.com"
                     />
                   </div>
                 </div>
                 <div className="space-y-4">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Inquiry Subject</label>
                   <input 
                     type="text" 
                     required
                     value={formData.subject}
                     onChange={(e) => setFormData({...formData, subject: e.target.value})}
                     className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-200"
                     placeholder="Exclusive Interview / Strategic Partnership"
                   />
                 </div>
                 <div className="space-y-4">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Context</label>
                   <textarea 
                     rows="5"
                     required
                     value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                     className="w-full border-b border-gray-100 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent resize-none placeholder:text-gray-200"
                     placeholder="Outline the details of your request..."
                   />
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                   <button 
                     type="submit" 
                     disabled={status === 'sending'}
                     className={`group relative inline-flex items-center space-x-6 px-12 py-5 font-bold uppercase tracking-widest transition-all overflow-hidden ${
                       status === 'sending' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-secondary text-white shadow-xl'
                     }`}
                   >
                     <div className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                     <span className="relative z-10">{status === 'sending' ? 'Transmitting...' : 'Submit Brief'}</span>
                     <Send size={18} className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                   </button>
                   
                   {status === 'success' && <p className="text-accent font-bold text-sm italic">Brief submitted successfully.</p>}
                   {status === 'error' && <p className="text-red-600 font-bold text-sm italic">Transmission failed. Retry.</p>}
                 </div>
               </form>
            </div>
          </div>
        </div>
      </div>


      {/* Global Presence Map / Visual */}
      <section className="mt-32 container mx-auto px-4 lg:px-8">
         <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { city: "London", region: "Canary Wharf", contact: "+44 20 7123 4567" },
              { city: "New York", region: "Hudson Yards", contact: "+1 212 987 6543" },
              { city: "Dubai", region: "DIFC", contact: "+971 4 567 8901" }
            ].map((office, i) => (
              <div key={i} className="border-l border-gray-100 pl-10 py-4 hover:border-accent transition-colors">
                 <h4 className="text-2xl font-serif font-bold text-secondary mb-2">{office.city}</h4>
                 <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">{office.region}</p>
                 <p className="text-sm text-gray-400">{office.contact}</p>
              </div>
            ))}
         </div>
      </section>
    </div>
  )
}
