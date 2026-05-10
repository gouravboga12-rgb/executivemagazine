import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Globe, ArrowRight, Send, MessageCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
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
        .insert([{
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'Footer Inquiry'
        }])
      
      if (error) throw error

      // 2. Prepare WhatsApp message
      const phoneNumber = "918341528822" 
      const message = `*Footer Inquiry - Executives Magazine*%0A%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Message:* ${formData.message}`
      
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${message}`

      // 3. Open WhatsApp
      window.open(whatsappURL, '_blank')
      
      setStatus('success')
      setFormData({ name: '', email: '', message: '' })
      setTimeout(() => setStatus(null), 5000)
    } catch (error) {
      console.error('Error submitting footer form:', error)
      setStatus('error')
    }
  }

  return (
    <footer className="bg-secondary text-white pt-24 pb-12 overflow-hidden relative">
      {/* Decorative Background Text */}
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-[0.02] transform translate-x-1/4 translate-y-1/4">
         <span className="text-[20rem] font-bold uppercase leading-none">EXECUTIVES</span>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 pb-20 border-b border-white/5">
          
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-10">
            <Link to="/" className="flex flex-col items-center w-fit group transition-transform duration-300 hover:scale-[1.02] origin-left">
              <span className="font-serif text-5xl font-extrabold tracking-tight text-white uppercase">
                Executives
              </span>
              <span className="text-[14px] tracking-[0.8em] uppercase text-accent mt-1 font-bold">
                Magazine
              </span>
            </Link>
            <p className="text-white/50 text-lg font-light leading-relaxed max-w-md italic font-serif">
              "The definitive voice in business leadership and innovation. We deliver the insights that empower the world's most influential decision-makers."
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/40 hover:text-accent transition-colors" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors" aria-label="Twitter">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
              <a href="#" className="text-white/40 hover:text-accent transition-colors" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-12">
            <div>
              <h3 className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Magazine</h3>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                <li><Link to="/interviews" className="hover:text-white transition-colors">Interviews</Link></li>
                <li><Link to="/opinion" className="hover:text-white transition-colors">Opinion</Link></li>
                <li><Link to="/lifestyle" className="hover:text-white transition-colors">Lifestyle</Link></li>
                <li><Link to="/events" className="hover:text-white transition-colors">Events</Link></li>
                <li><Link to="/digital-magazine" className="hover:text-white transition-colors">Current Edition</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-accent text-[10px] font-bold uppercase tracking-[0.3em] mb-8">Company</h3>
              <ul className="space-y-4 text-sm font-medium text-white/60">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact</Link></li>
                <li><Link to="/advertise" className="hover:text-white transition-colors">Advertise</Link></li>
                <li><Link to="/careers" className="hover:text-white transition-colors">Careers</Link></li>
                <li><Link to="/legal" className="hover:text-white transition-colors">Legal</Link></li>
              </ul>
            </div>
          </div>

          {/* Quick Inquiry Form */}
          <div className="lg:col-span-4">
             <div className="bg-white/5 p-8 border border-white/5">
                <h3 className="text-xl font-serif font-bold mb-6 text-white">Direct Inquiry</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                   <input 
                     type="text" 
                     placeholder="Your Name" 
                     required
                     value={formData.name}
                     onChange={(e) => setFormData({...formData, name: e.target.value})}
                     className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                   />
                   <input 
                     type="email" 
                     placeholder="Email Address" 
                     required
                     value={formData.email}
                     onChange={(e) => setFormData({...formData, email: e.target.value})}
                     className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/20"
                   />
                   <textarea 
                     placeholder="How can we help?" 
                     required
                     rows="3"
                     value={formData.message}
                     onChange={(e) => setFormData({...formData, message: e.target.value})}
                     className="w-full bg-transparent border-b border-white/20 py-2 text-sm focus:outline-none focus:border-accent transition-colors placeholder:text-white/20 resize-none"
                   />
                   <button 
                     type="submit"
                     disabled={status === 'sending'}
                     className="w-full mt-4 bg-accent text-white py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-white hover:text-secondary transition-all flex items-center justify-center space-x-2"
                   >
                      {status === 'sending' ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Submit via WhatsApp</span>
                          <MessageCircle size={14} />
                        </>
                      )}
                   </button>
                   {status === 'success' && <p className="text-accent text-[10px] font-bold uppercase mt-2">Message sent!</p>}
                   {status === 'error' && <p className="text-red-500 text-[10px] font-bold uppercase mt-2">Error sending message.</p>}
                </form>
             </div>
          </div>
        </div>

        <div className="pt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-white/30 uppercase tracking-[0.3em] font-bold">
          <div className="flex items-center space-x-12 mb-8 md:mb-0">
             <span>&copy; {currentYear} Executives Media Group</span>
             <span className="hidden md:block">Published in London & New York</span>
          </div>
          <div className="flex space-x-10">
             <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
             <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
             <Link to="/accessibility" className="hover:text-white transition-colors">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
