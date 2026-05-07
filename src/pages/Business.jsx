import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  BarChart3, Globe, ArrowRight, X, Clock, User, 
  ChevronRight, TrendingUp, Cpu, Rocket, ShoppingBag, Users, Leaf 
} from 'lucide-react'

const businessInsights = [
  {
    id: 'digital-transformation-2026',
    title: 'Digital Transformation in Businesses – 2026 Update',
    excerpt: 'Businesses across the globe are rapidly shifting towards AI-powered automation, cloud-based operations, and digital customer experiences.',
    content: `
      <p>The landscape of global business in 2026 is defined by <strong>Hyper-Automation</strong>. No longer is digital transformation just about moving to the cloud; it is about the seamless integration of AI into the very DNA of organizational decision-making.</p>
      <p>Companies adopting advanced technologies like <em>Generative AI</em> and <em>Edge Computing</em> are witnessing a 40% improvement in productivity while simultaneously reducing operational costs by nearly a third. The shift has moved from reactive IT support to proactive, AI-driven business intelligence that predicts market shifts before they happen.</p>
      <p>Industries like retail are using AR-enhanced customer journeys, while healthcare is leveraging real-time data-driven diagnostics. Logistics and education are not far behind, with smart applications and data-driven strategies becoming the baseline for survival in a hyper-competitive market. The 2026 update emphasizes that the "Digital Divide" is now a "Data Divide"—those who harness data win, and those who don't are left behind.</p>
    `,
    image: '/article-images/digital-transformation.png',
    category: 'Technology',
    icon: <Cpu className="text-accent" size={24} />,
    author: 'Editorial Team',
    date: 'May 2026'
  },
  {
    id: 'startup-investment-trends',
    title: 'Global Startup & Investment Trends',
    excerpt: 'The startup ecosystem continues to grow with increased investments in fintech, edtech, healthtech, and AI sectors.',
    content: `
      <p>The investment climate of 2026 has shifted from "growth at any cost" to <strong>"Resilient Profitability"</strong>. Venture capitalists are now focusing on scalable and innovative business models that solve real-world problems rather than just chasing user acquisition metrics.</p>
      <p>Fintech remains the heavyweight champion, but we are seeing an explosion in <em>Sovereign AI</em> startups—companies building localized, secure AI infrastructures for national interests. Healthtech is moving into <em>Longevity Science</em>, while Edtech is pivoting towards <em>Continuous Micro-Learning</em> for the modern workforce.</p>
      <p>Entrepreneurs are now prioritizing sustainable growth, customer retention, and digital expansion to compete in international markets. The 2026 trend shows that the most successful founders are those who can balance high-tech innovation with high-touch human empathy.</p>
    `,
    image: '/article-images/startup-trends.png',
    category: 'Investment',
    icon: <Rocket className="text-accent" size={24} />,
    author: 'Market Analysis',
    date: 'May 2026'
  },
  {
    id: 'ecommerce-online-expansion',
    title: 'E-Commerce & Online Market Expansion',
    excerpt: 'E-commerce businesses are witnessing massive growth due to changing customer behavior and mobile-first shopping trends.',
    content: `
      <p>In 2026, e-commerce has evolved into <strong>Contextual Commerce</strong>. Shopping is no longer a destination; it's an integrated part of every digital experience. Fast delivery systems are now expected to be predictive, with AI-driven logistics positioning inventory before a customer even clicks "buy".</p>
      <p>Secure payment gateways have moved beyond encryption to <em>Biometric Auth</em> and <em>Decentralized Finance (DeFi)</em> integrations. Personalized shopping experiences are no longer just product recommendations; they are entire virtual store layouts generated uniquely for every individual user.</p>
      <p>Businesses are also integrating WhatsApp, social media, and AI chat support to improve customer engagement. The integration of <em>Social Commerce</em> has turned influencers into micro-retailers, blurring the lines between content and commerce more than ever before.</p>
    `,
    image: '/article-images/ecommerce-expansion.png',
    category: 'Markets',
    icon: <ShoppingBag className="text-accent" size={24} />,
    author: 'Retail Insight',
    date: 'April 2026'
  },
  {
    id: 'remote-work-management',
    title: 'Remote Work & Smart Workforce Management',
    excerpt: 'Modern businesses are adapting hybrid and remote work models to increase flexibility and employee productivity.',
    content: `
      <p>The "Remote Work" debate of the early 2020s has been settled: the <strong>Digital Headquarters</strong> is the primary place of business in 2026. Companies are investing heavily in <em>Asynchronous Collaboration Tools</em> that allow teams across 24 timezones to work without meeting fatigue.</p>
      <p>Cloud infrastructure and cybersecurity solutions have become the new "office security," with Zero-Trust architectures protecting the edge of the digital workplace. Employee wellness and work-life balance are no longer perks—they are core performance metrics tracked with the same rigor as quarterly revenue.</p>
      <p>Smart workforce management now involves AI-driven skill mapping, identifying gaps in the organization and providing personalized development paths for every employee. Organizations worldwide are finding that flexibility is the #1 talent retention tool available.</p>
    `,
    image: '/article-images/remote-work.png',
    category: 'Workplace',
    icon: <Users className="text-accent" size={24} />,
    author: 'HR Strategy',
    date: 'March 2026'
  },
  {
    id: 'sustainable-business-practices',
    title: 'Sustainable & Eco-Friendly Business Practices',
    excerpt: 'Global companies are increasingly focusing on sustainability and environmentally responsible operations.',
    content: `
      <p>Sustainability in 2026 is not just a CSR initiative; it is a <strong>Major Business Strategy</strong>. Legislative pressure and consumer activism have forced a shift towards <em>Carbon-Negative Portfolios</em> and <em>Circular Economy</em> models.</p>
      <p>Businesses are adopting eco-friendly packaging, renewable energy, and green technologies to reduce carbon footprints. The leading brands are those that can provide total transparency in their supply chain, often leveraging <em>Blockchain</em> to verify the ethical origin of every component.</p>
      <p>Customers today prefer brands that support ethical practices and social responsibility. The "Green Premium" is disappearing as sustainable operations become more efficient than traditional ones, making eco-friendly business the most profitable path forward for the next decade.</p>
    `,
    image: '/article-images/sustainable-business.png',
    category: 'Sustainability',
    icon: <Leaf className="text-accent" size={24} />,
    author: 'Impact Report',
    date: 'April 2026'
  }
]

export default function Business() {
  const [selectedArticle, setSelectedArticle] = useState(null)

  return (
    <div className="bg-white min-h-screen">
      {/* Premium Header */}
      <header className="pt-32 pb-20 bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center space-x-4 text-accent mb-8">
              <BarChart3 size={20} />
              <span className="text-xs font-bold uppercase tracking-[0.5em]">2026 Strategic Intelligence</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-tight tracking-tighter mb-12">
              THE FUTURE OF <br />
              <span className="text-accent italic">GLOBAL BUSINESS</span>
            </h1>
            <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl font-serif italic">
              "Analyzing the five pillars of modern commerce: From digital hyper-growth to the imperative of sustainable resilience."
            </p>
          </div>
        </div>
      </header>

      {/* Content Pillars Grid */}
      <section className="py-32">
        <div className="container mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {businessInsights.map((insight, idx) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`flex flex-col space-y-8 ${idx === 0 ? 'lg:col-span-2' : ''}`}
              >
                <button 
                  className={`relative overflow-hidden premium-shadow group cursor-pointer aspect-square md:aspect-[21/9] w-full text-left ${idx === 0 ? 'lg:col-span-2' : ''}`}
                  onClick={() => setSelectedArticle(insight)}
                >
                  <img 
                    src={insight.image} 
                    alt={insight.title}
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
                    <div className="max-w-2xl space-y-4">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-accent/20 backdrop-blur-md rounded-lg">
                          {insight.icon}
                        </div>
                        <span className="text-accent text-[10px] font-bold uppercase tracking-[0.3em]">{insight.category}</span>
                      </div>
                      <h2 className={`font-serif font-bold text-white group-hover:text-accent transition-colors ${idx === 0 ? 'text-4xl md:text-6xl' : 'text-3xl md:text-4xl'}`}>
                        {insight.title}
                      </h2>
                    </div>
                    <div className="bg-white text-secondary px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent hover:text-white transition-all transform group-hover:-translate-y-2">
                       Read Full Analysis
                    </div>
                  </div>
                </button>
                <div className="space-y-4 max-w-3xl">
                   <p className="text-gray-500 text-lg font-light leading-relaxed">
                      {insight.excerpt}
                   </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Article Preview Modal */}
      <AnimatePresence>
        {selectedArticle && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12"
          >
            <div 
              className="absolute inset-0 bg-secondary/95 backdrop-blur-md"
              onClick={() => setSelectedArticle(null)}
            />
            <motion.div
              initial={{ scale: 0.9, y: 50, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.9, y: 50, opacity: 0 }}
              className="bg-white w-full max-w-6xl max-h-full overflow-hidden relative shadow-2xl flex flex-col md:flex-row"
            >
              <button 
                onClick={() => setSelectedArticle(null)}
                className="absolute top-6 right-6 z-10 bg-secondary text-white p-2 rounded-full hover:bg-accent transition-colors"
              >
                <X size={20} />
              </button>

              <div className="w-full md:w-2/5 relative h-[300px] md:h-auto">
                <img 
                  src={selectedArticle.image} 
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-accent/10" />
              </div>

              <div className="w-full md:w-3/5 p-8 md:p-16 overflow-y-auto bg-white">
                <div className="max-w-2xl mx-auto space-y-10">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 text-accent">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em]">{selectedArticle.category}</span>
                      <div className="w-1 h-1 bg-gray-200 rounded-full" />
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">{selectedArticle.date}</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary leading-tight">
                      {selectedArticle.title}
                    </h2>
                    <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                      <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">
                        <User size={20} />
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">{selectedArticle.author}</p>
                        <p className="text-[9px] text-gray-400">Senior Business Analyst</p>
                      </div>
                    </div>
                  </div>

                  <div 
                    className="prose prose-lg prose-serif max-w-none text-gray-600 space-y-6"
                    dangerouslySetInnerHTML={{ __html: selectedArticle.content }}
                  />

                  <div className="pt-10 border-t border-gray-100 flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div className="flex flex-col">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Share Analysis</span>
                        <div className="flex space-x-4 mt-2">
                           <Globe size={16} className="text-gray-300 hover:text-accent cursor-pointer" />
                           <TrendingUp size={16} className="text-gray-300 hover:text-accent cursor-pointer" />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => setSelectedArticle(null)}
                      className="group flex items-center space-x-3 text-secondary font-bold uppercase tracking-widest text-[10px]"
                    >
                      <span>Close Preview</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer CTA */}
      <section className="py-32 bg-gray-50 border-t border-gray-100">
         <div className="container mx-auto px-4 lg:px-8 text-center">
            <div className="max-w-3xl mx-auto space-y-12">
               <h3 className="text-4xl md:text-5xl font-serif font-bold text-secondary tracking-tight">
                  Stay ahead of the <br /> <span className="text-accent italic">2026 market curve.</span>
               </h3>
               <p className="text-gray-500 font-light leading-relaxed">
                  Join our executive network to receive exclusive quarterly briefings, early access to business summits, and deep-dive strategic reports directly to your inbox.
               </p>
               <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-8">
                  <input 
                    type="email" 
                    placeholder="Enter corporate email..."
                    className="w-full md:w-96 px-8 py-5 bg-white border border-gray-200 text-sm focus:ring-1 focus:ring-accent outline-none shadow-sm"
                  />
                  <button className="w-full md:w-auto px-12 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl">
                    Subscribe Now
                  </button>
               </div>
            </div>
         </div>
      </section>
    </div>
  )
}
