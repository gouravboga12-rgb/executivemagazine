import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'


import { 
  Brain, Cpu, Shield, Zap, X, ArrowRight, 
  Globe, MessageSquare, BarChart3, TrendingUp, User, ChevronRight 
} from 'lucide-react'

const aiInsights = [
  {
    id: 'generative-leadership-2026',
    title: 'Generative Leadership: The New Executive Mandate',
    excerpt: 'AI is no longer just a tool; it is becoming a core strategic partner in executive decision-making processes.',
    content: `
      <p>By 2026, the concept of "Cognitive Leadership" has moved from theory to practice. Executives are now using <strong>Generative Strategy Models</strong> to simulate thousands of market scenarios, competitor responses, and regulatory shifts in real-time.</p>
      <p>The role of the CEO is shifting from a <em>creator</em> of strategy to a <em>curator</em> of AI-generated insights. This augmentation allows leaders to focus on the human elements of business—culture, empathy, and vision—while the AI handles the complex computational logistics of modern global commerce.</p>
      <p>Those who master this Human-AI symbiosis are seeing a 40% increase in strategic agility, allowing them to pivot faster than traditional organizations that still rely on manual quarterly planning cycles.</p>
    `,
    image: '/article-images/ai-info/leadership.png',
    category: 'Leadership',
    icon: <Brain className="text-accent" size={24} />,
    author: 'AI Research Desk',
    date: 'May 2026'
  },
  {
    id: 'ai-ethics-governance',
    title: 'Ethical AI: Governance in the Autonomous Age',
    excerpt: 'Establishing trust and safety is now the primary bottleneck for wide-scale AI adoption in the enterprise.',
    content: `
      <p>As autonomous systems take over more sensitive business functions, <strong>AI Governance</strong> has become a core legal and operational requirement. In 2026, corporate boards are establishing "Ethics Committees" to oversee the moral compass of their digital agents.</p>
      <p>Key focus areas include <em>Bias Mitigation</em>, <em>Explainability</em>, and <em>Accountability</em>. Organizations are implementing transparent AI frameworks where every automated decision can be traced and audited, ensuring that technology serves human interests and adheres to global regulatory standards like the AI Act.</p>
      <p>Establishing this trust is not just a moral imperative but a massive competitive advantage. Customers are flocking to brands that can guarantee "Ethically Sourced Intelligence."</p>
    `,
    image: '/article-images/ai-info/ethics.png',
    category: 'Ethics',
    icon: <Shield className="text-accent" size={24} />,
    author: 'Governance Report',
    date: 'April 2026'
  },
  {
    id: 'post-saas-workflow',
    title: 'The Post-SaaS Era: AI-Native Business Workflows',
    excerpt: 'Traditional software is being replaced by fluid, AI-native workflows that adapt to the user in real-time.',
    content: `
      <p>The era of "fixed software" is over. In 2026, we are entering the <strong>Post-SaaS Era</strong>, where applications are no longer sets of static buttons and menus, but dynamic entities that reconfigure themselves based on the task at hand.</p>
      <p>AI-native workflows mean that the software learns from the employee, automating repetitive tasks before they are even assigned. This has led to the rise of <em>Agentic Workforces</em>, where "Digital Employees" handle data processing, scheduling, and first-level analysis, leaving the high-value strategic work to humans.</p>
      <p>The efficiency gains are staggering, with some organizations reporting a 60% reduction in time-to-market for new products and services.</p>
    `,
    image: '/article-images/ai-info/workflow.png',
    category: 'Technology',
    icon: <Zap className="text-accent" size={24} />,
    author: 'Tech Analysis',
    date: 'May 2026'
  },
  {
    id: 'human-ai-orchestration',
    title: 'Human-AI Orchestration: Managing the Hybrid Team',
    excerpt: 'The workforce of 2026 is a blend of carbon and silicon. Orchestrating this hybrid team is the new HR frontier.',
    content: `
      <p>Managing a modern workforce now means managing both humans and their digital counterparts. <strong>Human-AI Orchestration</strong> is the art of assigning tasks to the entity (human or machine) best suited to handle them.</p>
      <p>We are seeing the rise of <em>Co-Pilots</em> in every department, from Marketing to Engineering. The challenge for leaders is ensuring that AI doesn't replace human creativity, but rather provides the "floor" from which humans can reach new heights of innovation.</p>
      <p>Upskilling is no longer about learning a specific software, but about learning "Prompt Engineering" and "Agent Orchestration"—the new fundamental literacies of the 2026 workplace.</p>
    `,
    image: '/article-images/ai-info/human-ai.png',
    category: 'Workforce',
    icon: <MessageSquare className="text-accent" size={24} />,
    author: 'HR Future',
    date: 'March 2026'
  },
  {
    id: 'ai-sovereignty-privacy',
    title: 'AI Sovereignty & The Geopolitics of Data',
    excerpt: 'Protecting corporate data in a global AI landscape has become a national and corporate security priority.',
    content: `
      <p>In 2026, <strong>AI Sovereignty</strong> is a top-tier executive concern. Global corporations are moving away from public, monolithic AI models in favor of private, localized "Micro-Models" that run on secure, sovereign infrastructure.</p>
      <p>Data privacy has evolved from a compliance checkbox to a strategic fortress. Companies are building their own "Data Moats," ensuring that their intellectual property is never used to train competitor models or shared across geopolitical borders without strict controls.</p>
      <p>The future of global business depends on who owns the data—and more importantly, who owns the intelligence derived from it.</p>
    `,
    image: '/article-images/ai-info/sovereignty.png',
    category: 'Security',
    icon: <Globe className="text-accent" size={24} />,
    author: 'Strategic Intelligence',
    date: 'April 2026'
  }
]

export default function AIInfo() {
  const [selectedInsight, setSelectedInsight] = useState(null)
  const [status, setStatus] = useState(null)

  const handleAIRequest = async (type) => {
    setStatus('loading')
    try {
      const { error } = await supabase.from('leads').insert([{
        email: `AI Portal User (${type})`,
        source_page: 'AI Info',
        type: `AI ${type}`,
        description: `User requested ${type === 'Toolkit' ? 'the AI Readiness Toolkit' : 'to speak with a consultant'}.`
      }])
      if (error) throw error
      setStatus('success')
    } catch (err) {
      console.error(err)
      setStatus('error')
    }
  }

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Hero */}
      <section className="bg-secondary py-32 text-white relative overflow-hidden" data-aos="fade-down">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-5" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              <div className="flex items-center space-x-4 text-accent">
                <Brain size={20} />
                <span className="text-xs font-bold uppercase tracking-[0.5em]">2026 Intelligence Archive</span>
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-8xl font-serif font-bold text-white leading-[1.1] md:leading-tight tracking-tight md:tracking-tighter">
                ARTIFICIAL <br /> <span className="text-accent italic">INTELLIGENCE</span>
              </h1>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl font-serif italic">
                "Navigating the intersection of silicon and strategy. A definitive executive guide to the AI revolution."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Insights Grid */}
      <section className="py-32" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {aiInsights.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`group flex flex-col space-y-8 ${idx === 0 ? 'lg:col-span-2' : ''}`}
                data-aos="fade-up"
                data-aos-delay={idx * 50}
              >
                <button 
                  className={`relative overflow-hidden premium-shadow cursor-pointer w-full text-left ${idx === 0 ? 'aspect-[21/9]' : 'aspect-[16/9]'}`}
                  onClick={() => setSelectedInsight(insight)}
                >
                  <img 
                    src={insight.image} 
                    alt={insight.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl space-y-4 text-white">
                      <div className="flex items-center space-x-3">
                         <div className="p-2 bg-accent/20 backdrop-blur-md rounded-lg">
                           {insight.icon}
                         </div>
                         <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em]">{insight.category}</span>
                      </div>
                      <h2 className={`font-serif font-bold group-hover:text-accent transition-colors ${idx === 0 ? 'text-4xl md:text-6xl' : 'text-2xl md:text-4xl'}`}>
                        {insight.title}
                      </h2>
                    </div>
                    <div className="bg-white text-secondary px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform group-hover:-translate-y-2">
                       Explore Intelligence
                    </div>
                  </div>
                </button>
                <p className="text-gray-500 text-lg font-light leading-relaxed max-w-3xl">
                  {insight.excerpt}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insight Modal */}
      <AnimatePresence>
        {selectedInsight && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-secondary/95 backdrop-blur-md"
              onClick={() => setSelectedInsight(null)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="bg-white w-full max-w-6xl max-h-full overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedInsight(null)}
                className="absolute top-6 right-6 z-10 bg-secondary text-white p-2 rounded-full hover:bg-accent transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/5 relative h-[300px] md:h-auto">
                <img 
                  src={selectedInsight.image} 
                  alt={selectedInsight.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-accent/10" />
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-16 overflow-y-auto bg-white">
                <div className="max-w-2xl mx-auto space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-accent">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{selectedInsight.category}</span>
                      <div className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{selectedInsight.date}</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-serif font-bold text-secondary leading-tight">
                      {selectedInsight.title}
                    </h2>
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 bg-gray-50 rounded-full flex items-center justify-center text-gray-400">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">{selectedInsight.author}</p>
                        <p className="text-[9px] text-gray-400">Intelligence Specialist</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="prose prose-lg prose-serif max-w-none text-gray-600 space-y-6"
                    dangerouslySetInnerHTML={{ __html: selectedInsight.content }}
                  />

                  <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-6 text-gray-300">
                       <Globe size={18} className="hover:text-accent cursor-pointer" />
                       <BarChart3 size={18} className="hover:text-accent cursor-pointer" />
                    </div>
                    <button 
                      onClick={() => setSelectedInsight(null)}
                      className="group flex items-center space-x-3 text-secondary font-bold uppercase tracking-widest text-[10px]"
                    >
                      <span>Close Analysis</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Intelligence CTA */}
      <section className="py-32 bg-gray-50 border-t border-gray-100" data-aos="fade-up">
        <div className="container mx-auto px-4 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-12">
            <TrendingUp className="mx-auto text-accent" size={48} />
            <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary">
              Future-Proof Your <span className="text-accent italic">Leadership.</span>
            </h3>
            <p className="text-gray-500 font-light leading-relaxed">
              Unlock our 2026 Executive AI Readiness Toolkit. Gain access to private webinars, strategic frameworks, and peer-to-peer intelligence networks.
            </p>
            <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
              <Link 
                to="/contact"
                className="w-full md:w-auto px-12 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl text-center">
                Request AI Consultation
              </Link>
            </div>
            {status === 'error' && <p className="text-red-500 text-[10px] font-bold uppercase mt-4">Transmission failed.</p>}
          </div>
        </div>
      </section>
    </div>
  )
}
