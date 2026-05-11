import { useState } from 'react'
import { Mail, Phone, MapPin, Send, MessageCircle, ChevronRight, Globe } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { motion } from 'framer-motion'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    organization: '',
    service: 'Editorial Interview',
    subject: '',
    message: ''
  })
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // 1. Prepare WhatsApp message & Open Immediately (to avoid popup blockers)
    const phoneNumber = "917032531253" 
    const message = `*New Inquiry: ${formData.name}* (${formData.service})%0A%0A${formData.message}%0A%0A_Sent via Executives Magazine_`
    const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`
    window.open(whatsappURL, '_blank')

    setStatus('sending')
    try {
      // 2. Save to Supabase (Database)
      const { error } = await supabase
        .from('contacts')
        .insert([formData])
      
      if (error) throw error
      
      setStatus('success')
      setFormData({ name: '', email: '', phone: '', organization: '', service: 'Editorial Interview', subject: '', message: '' })
      
      // Reset status after 2 seconds
      setTimeout(() => {
        setStatus(null)
      }, 2000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setStatus('error')
    }
  }

  return (
    <div className="pb-32 bg-white">
      {/* Immersive Header - Light */}
      <header className="relative h-[50vh] flex items-center bg-gray-50 overflow-hidden border-b border-gray-100" data-aos="fade-down">
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
              className="text-6xl md:text-8xl font-bold text-secondary uppercase tracking-tighter leading-[0.9]"
            >
              Connect with <br/> the <span className="text-accent italic font-serif lowercase tracking-normal">Board</span>
            </motion.h1>
         </div>
      </header>

      <div className="container mx-auto px-4 lg:px-8 -mt-12 relative z-20" data-aos="fade-up">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-white premium-shadow border border-gray-100">
          
          {/* Info Sidebar - Light Luxe Style */}
          <div className="lg:col-span-4 bg-gray-50 p-12 md:p-16 text-secondary space-y-16 border-r border-gray-100">
            <div className="space-y-6">
               <h2 className="text-3xl font-serif font-bold italic">Global Bureaus</h2>
               <p className="text-gray-600 text-sm leading-relaxed">
                  Our editorial and commercial teams are located in the world's major financial hubs. Reach out for partnerships, interviews, or advertising inquiries.
               </p>
            </div>
                        <div className="space-y-12">
               {[
                 { label: "Official Email", val: "connect@executivesmagazine.com", icon: <Mail size={18} /> },
                 { label: "Executive Line", val: "+91 70325 31253", icon: <Phone size={18} /> },
                 { label: "Corporate HQ", val: "Hyderabad, India", icon: <MapPin size={18} /> }
               ].map((item, i) => (
                 <div key={i} className="flex items-start space-x-6 group">
                    <div className="p-3 bg-white text-accent rounded-sm group-hover:bg-accent group-hover:text-white transition-all shadow-sm">
                       {item.icon}
                    </div>
                    <div className="space-y-1">
                       <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">{item.label}</p>
                       <p className="text-sm font-semibold hover:text-accent transition-colors cursor-pointer break-all text-secondary">{item.val}</p>
                    </div>
                 </div>
               ))}
            </div>

            <div className="pt-16 border-t border-gray-200">
               <h3 className="text-[10px] font-bold uppercase tracking-widest text-accent mb-8">Direct Executive Line</h3>
               <a 
                 href="https://wa.me/917032531253" 
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
               <h2 className="text-4xl font-bold text-secondary uppercase tracking-tight mb-16">Brief the Team</h2>
               
               <form onSubmit={handleSubmit} className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Your Name</label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-400"
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
                        className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-400"
                        placeholder="a.thorne@nexus.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Phone Number</label>
                      <input 
                        type="tel" 
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-400"
                        placeholder="+91 00000 00000"
                      />
                    </div>
                    <div className="space-y-4">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Company / Organization</label>
                      <input 
                        type="text" 
                        required
                        value={formData.organization}
                        onChange={(e) => setFormData({...formData, organization: e.target.value})}
                        className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-400"
                        placeholder="Organization Name"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Required Service</label>
                    <select 
                      required
                      value={formData.service}
                      onChange={(e) => setFormData({...formData, service: e.target.value})}
                      className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent text-sm text-secondary font-medium cursor-pointer"
                    >
                      <option value="Editorial Interview">Editorial Interview</option>
                      <option value="Corporate Listing">Corporate Listing</option>
                      <option value="AI Info / Toolkit">AI Info / Toolkit</option>
                      <option value="Advertisement Inquiry">Advertisement Inquiry</option>
                      <option value="Event Sponsorship">Event Sponsorship</option>
                      <option value="Digital Feature">Digital Feature</option>
                      <option value="Others">Others</option>
                    </select>
                  </div>
                 <div className="space-y-4">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-secondary">Inquiry Subject</label>
                   <input 
                     type="text" 
                     required
                     value={formData.subject}
                     onChange={(e) => setFormData({...formData, subject: e.target.value})}
                     className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-400"
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
                     className="w-full border-b border-gray-200 py-4 focus:outline-none focus:border-accent transition-colors bg-transparent resize-none placeholder:text-gray-400"
                     placeholder="Outline the details of your request..."
                   />
                 </div>
                 
                 <div className="flex flex-col md:flex-row items-center justify-between gap-8 pt-8">
                    <button 
                      type="submit" 
                      disabled={status === 'sending'}
                      className={`group relative inline-flex items-center justify-center space-x-6 px-12 py-5 font-bold uppercase tracking-widest transition-all shadow-xl ${
                        status === 'sending' ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'bg-accent text-white hover:bg-secondary'
                      }`}
                    >
                      <span className="relative z-10">{status === 'sending' ? 'Transmitting...' : 'Submit Brief'}</span>
                      <Send size={18} className="relative z-10 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                    </button>
                   
                   {status === 'success' && <p className="text-accent font-bold text-sm italic">Thank you for submitting and we will get back to you soon.</p>}
                   {status === 'error' && <p className="text-red-600 font-bold text-sm italic">Transmission failed. Retry.</p>}
                 </div>
               </form>
            </div>
          </div>
        </div>
      </div>


       {/* Global Presence Map / Visual */}
       <section className="mt-32 container mx-auto px-4 lg:px-8" data-aos="fade-up">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="border-l border-gray-200 pl-10 py-4 border-accent transition-colors">
               <h4 className="text-2xl font-serif font-bold text-secondary mb-2">Hyderabad Headquarters</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">India Bureau</p>
               <p className="text-sm text-gray-600 max-w-md">NO 201, C8FW+5GX, Nanakramguda Rd, Madhava Reddy Colony, Gachibowli, Nanakramguda, Hyderabad, Telangana 500032</p>
            </div>
            <div className="border-l border-gray-200 pl-10 py-4 border-accent transition-colors">
               <h4 className="text-2xl font-serif font-bold text-secondary mb-2">London Bureau</h4>
               <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-4">United Kingdom</p>
               <p className="text-sm text-gray-600 max-w-md">No 97 High St, South Arrow. HA2 6EH, London. United Kingdom</p>
            </div>
          </div>
       </section>
    </div>
  )
}
