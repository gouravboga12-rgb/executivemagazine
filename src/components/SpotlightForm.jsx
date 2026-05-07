import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, CheckCircle2, AlertCircle, Building2, User, Mail, Briefcase, MessageSquare, Globe } from 'lucide-react'
import { supabase } from '../lib/supabase'

export default function SpotlightForm({ type = 'application', spotlightTitle, color }) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    title: '',
    email: '',
    industry: '',
    message: '',
    type: type, // 'application' or 'sponsorship'
    spotlight: spotlightTitle
  })
  const [status, setStatus] = useState(null) // 'sending', 'success', 'error'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    try {
      // 1. Save to Supabase (Database)
      // Note: Assuming a 'spotlight_inquiries' table exists or creating one
      const { error } = await supabase
        .from('spotlight_inquiries')
        .insert([formData])

      if (error && error.code !== 'PGRST116') { // Ignore table not found for demo purposes, or handle it
         console.warn('Supabase insertion failed, continuing with WhatsApp:', error)
      }

      // 2. Prepare WhatsApp message for real-time notification
      const phoneNumber = "919000000000" // Admin phone
      const whatsappMsg = `*New ${formData.type === 'application' ? 'Spotlight Application' : 'Sponsorship Inquiry'}*%0A%0A` +
        `*Spotlight:* ${formData.spotlight}%0A` +
        `*Name:* ${formData.name}%0A` +
        `*Company:* ${formData.company}%0A` +
        `*Title:* ${formData.title}%0A` +
        `*Email:* ${formData.email}%0A` +
        `*Industry:* ${formData.industry}%0A` +
        `*Message:* ${formData.message}`
      
      const whatsappURL = `https://wa.me/${phoneNumber}?text=${whatsappMsg}`
      
      // Open WhatsApp in new tab
      window.open(whatsappURL, '_blank')

      setStatus('success')
      setFormData({
        name: '',
        company: '',
        title: '',
        email: '',
        industry: '',
        message: '',
        type: type,
        spotlight: spotlightTitle
      })
    } catch (err) {
      console.error('Submission error:', err)
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white p-12 text-center space-y-6 premium-shadow border border-gray-100"
      >
        <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 size={40} />
        </div>
        <h3 className="text-3xl font-serif text-secondary">Inquiry Received</h3>
        <p className="text-gray-500 max-w-md mx-auto font-light">
          Thank you for your interest in the {spotlightTitle}. Our editorial board has been notified and will review your submission shortly.
        </p>
        <button 
          onClick={() => setStatus(null)}
          className="text-xs font-bold uppercase tracking-widest text-accent hover:underline pt-4"
        >
          Send Another Inquiry
        </button>
      </motion.div>
    )
  }

  return (
    <div className="bg-white p-8 md:p-12 premium-shadow border border-gray-100">
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <User size={12} className="text-accent" /> Full Name
            </label>
            <input 
              required
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-200"
              placeholder="e.g. Julian Vane"
            />
          </div>
          {/* Email */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Mail size={12} className="text-accent" /> Corporate Email
            </label>
            <input 
              required
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-200"
              placeholder="j.vane@enterprise.com"
            />
          </div>
          {/* Company */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Building2 size={12} className="text-accent" /> Company Name
            </label>
            <input 
              required
              type="text"
              value={formData.company}
              onChange={(e) => setFormData({...formData, company: e.target.value})}
              className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-200"
              placeholder="e.g. Global Dynamics"
            />
          </div>
          {/* Title */}
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
              <Briefcase size={12} className="text-accent" /> Job Title
            </label>
            <input 
              required
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent placeholder:text-gray-200"
              placeholder="Chief Executive Officer"
            />
          </div>
        </div>

        {/* Industry */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <Globe size={12} className="text-accent" /> Industry Sector
          </label>
          <select 
            required
            value={formData.industry}
            onChange={(e) => setFormData({...formData, industry: e.target.value})}
            className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent appearance-none cursor-pointer"
          >
            <option value="" disabled>Select Industry</option>
            <option value="Technology">Technology & AI</option>
            <option value="Manufacturing">Manufacturing</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Finance">Finance & Investment</option>
            <option value="Sustainability">Sustainability & Energy</option>
            <option value="Retail">Retail & Luxury</option>
            <option value="Other">Other</option>
          </select>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
            <MessageSquare size={12} className="text-accent" /> Brief Description
          </label>
          <textarea 
            rows="4"
            required
            value={formData.message}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors bg-transparent resize-none placeholder:text-gray-200"
            placeholder={type === 'application' ? "Tell us briefly about your innovative approach..." : "How would you like to partner with this spotlight?"}
          />
        </div>

        {status === 'error' && (
          <div className="flex items-center gap-2 text-red-500 text-xs font-bold bg-red-50 p-4 rounded-sm">
            <AlertCircle size={14} />
            <span>Transmission error. Please try again.</span>
          </div>
        )}

        <button 
          type="submit"
          disabled={status === 'sending'}
          style={{ backgroundColor: color || '#002147' }}
          className={`w-full group relative inline-flex items-center justify-center space-x-6 px-12 py-5 text-white font-bold uppercase tracking-widest transition-all overflow-hidden ${
            status === 'sending' ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-110 shadow-xl'
          }`}
        >
          <span className="relative z-10">{status === 'sending' ? 'Transmitting...' : (type === 'application' ? 'Submit Application' : 'Request Sponsorship')}</span>
          <Send size={18} className={`relative z-10 transition-transform ${status === 'sending' ? '' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
        </button>
      </form>
    </div>
  )
}
