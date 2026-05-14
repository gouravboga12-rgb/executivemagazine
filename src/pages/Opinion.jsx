import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

;
import { 
  X, 
  ArrowRight, 
  Calendar, 
  User, 
  Quote, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  ArrowUpRight,
  MessageSquare,
  Bookmark,
  Share2
} from 'lucide-react';
import { opinions } from '../lib/opinionsData.jsx';

const Opinion = () => {
  const [selectedOpinion, setSelectedOpinion] = useState(null);
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);

  const handleListing = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');
    try {
      const { error } = await supabase.from('leads').insert([{
        email,
        source_page: 'Opinion',
        type: 'Inner Circle Listing'
      }]);
      if (error) throw error;
      setStatus('success');
      setEmail('');
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div className="bg-[#FAF9F6] min-h-screen pt-24 pb-20">
      {/* Editorial Header */}
      <header className="container mx-auto px-4 lg:px-8 mb-20 text-center" data-aos="fade-down">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto space-y-6"
        >
          <span className="text-accent text-[11px] font-bold uppercase tracking-[0.5em]">The Perspectives</span>
          <h1 className="text-5xl md:text-7xl font-serif font-bold text-secondary tracking-tight">
            Intelligence <span className="italic font-light">&</span> Opinion
          </h1>
          <div className="h-[1px] w-24 bg-accent mx-auto my-8"></div>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto leading-relaxed italic">
            "Deep dives into the structural shifts of global business, leadership psychology, and the future of industrial governance."
          </p>
        </motion.div>
      </header>

      {/* Opinions Grid */}
      <section className="container mx-auto px-4 lg:px-8" data-aos="fade-up">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {opinions.map((opinion, idx) => (
            <button
              key={opinion.id}
              className="group cursor-pointer text-left w-full"
              onClick={() => setSelectedOpinion(opinion)}
              data-aos="fade-up"
              data-aos-delay={idx * 50}
            >
              <div className="space-y-6">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img 
                    src={opinion.image} 
                    alt={opinion.title}
                    className="w-full h-full object-cover transition-all duration-700 scale-100 group-hover:scale-105"
                  />
                  <div className="absolute top-6 left-6">
                    <div className="p-3 bg-white/90 backdrop-blur-md rounded-full shadow-lg">
                      {opinion.icon}
                    </div>
                  </div>
                  <div className="absolute bottom-6 left-6 right-6 p-6 bg-white/90 backdrop-blur-md translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">View Analysis</span>
                      <ArrowUpRight size={14} className="text-accent" />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 px-2">
                  <div className="flex items-center space-x-3 text-accent text-[10px] font-bold uppercase tracking-widest">
                    <span>{opinion.category}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full" />
                    <span className="text-gray-400">{opinion.date}</span>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-secondary leading-tight group-hover:text-accent transition-colors">
                    {opinion.title}
                  </h3>
                  <p className="text-gray-500 text-sm font-light leading-relaxed line-clamp-3 italic">
                    "{opinion.tagline}"
                  </p>
                  <div className="flex items-center space-x-3 text-[10px] font-bold uppercase tracking-widest text-secondary group-hover:text-accent transition-all pt-2">
                    <span>Read Full Analysis</span>
                    <ArrowUpRight size={14} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </div>
                  <div className="flex items-center space-x-3 pt-4 border-t border-gray-100">
                    <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center text-[10px] font-bold text-white uppercase tracking-tighter">
                      {opinion.author.split(' ').map(n => n[0]).join('')}
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-secondary">{opinion.author}</p>
                      <p className="text-[9px] text-gray-400 uppercase tracking-widest">{opinion.authorRole}</p>
                    </div>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* Modal - Reader Experience */}
      <AnimatePresence>
        {selectedOpinion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] overflow-y-auto bg-secondary/95 backdrop-blur-xl flex justify-center p-0 md:p-8"
          >
            <div className="absolute inset-0 cursor-pointer" onClick={() => setSelectedOpinion(null)} />
            
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="bg-white w-full max-w-7xl relative z-10 shadow-2xl rounded-t-3xl md:rounded-3xl overflow-hidden flex flex-col lg:flex-row"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedOpinion(null)}
                className="absolute top-6 right-6 z-[110] bg-white text-secondary p-3 rounded-full hover:bg-accent hover:text-white transition-all shadow-xl"
              >
                <X size={24} />
              </button>

              {/* Sidebar Info */}
              <div className="w-full lg:w-[450px] bg-[#FAF9F6] p-8 md:p-10 lg:p-12 border-r border-gray-100 overflow-y-auto no-scrollbar">
                <div className="space-y-10">
                  <div className="space-y-4">
                    <span className="text-accent text-[11px] font-bold uppercase tracking-[0.4em]">Editorial Column</span>
                    <h2 className="text-3xl font-serif font-bold text-secondary leading-tight">
                      {selectedOpinion.title}
                    </h2>
                    <div className="flex items-center space-x-3 text-gray-400 text-[10px] font-bold uppercase tracking-widest pb-6 border-b border-gray-200">
                      <Calendar size={14} className="text-accent" />
                      <span>{selectedOpinion.date}</span>
                    </div>
                  </div>

                  {/* Author Bio */}
                  <div className="p-6 bg-white shadow-sm border border-gray-100 rounded-xl space-y-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-secondary rounded-full flex items-center justify-center text-white font-bold shadow-lg">
                        {selectedOpinion.author[0]}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-secondary uppercase tracking-widest">{selectedOpinion.author}</p>
                        <p className="text-[10px] text-gray-400 uppercase tracking-widest leading-tight">{selectedOpinion.authorRole}</p>
                      </div>
                    </div>
                    <p className="text-xs text-gray-500 font-light leading-relaxed italic">
                      "Contributing Editor at The Executives Magazine, specializing in {selectedOpinion.category.toLowerCase()} and strategic forecasting."
                    </p>
                  </div>

                  {/* Strategic Highlights */}
                  <div className="space-y-6">
                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.3em] flex items-center">
                      <TrendingUp size={16} className="mr-3 text-accent" />
                      Strategic Highlights
                    </h4>
                    <div className="space-y-4">
                      {selectedOpinion.highlights.map((item, i) => (
                        <div key={i} className="flex items-start space-x-3 group">
                          <div className="mt-1">
                            <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                          </div>
                          <span className="text-[13px] text-gray-600 font-light leading-snug group-hover:text-secondary transition-colors italic">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Impact Analysis */}
                  <div className="space-y-6 pt-6 border-t border-gray-200">
                    <h4 className="text-[11px] font-bold text-secondary uppercase tracking-[0.3em] flex items-center">
                      <Quote size={16} className="mr-3 text-accent" />
                      The Bottom Line
                    </h4>
                    <div className="grid grid-cols-1 gap-4">
                      <div className="p-4 bg-green-50/50 border border-green-100 rounded-lg">
                        <span className="text-[9px] font-bold text-green-600 uppercase tracking-widest block mb-2">Short-term Impact</span>
                        <p className="text-[12px] text-gray-600 font-light leading-relaxed">{selectedOpinion.impact.shortTerm}</p>
                      </div>
                      <div className="p-4 bg-blue-50/50 border border-blue-100 rounded-lg">
                        <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest block mb-2">Long-term Vision</span>
                        <p className="text-[12px] text-gray-600 font-light leading-relaxed">{selectedOpinion.impact.longTerm}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Main Reading Area */}
              <div className="flex-grow bg-white overflow-y-auto no-scrollbar">
                {/* Hero Image in Content */}
                <div className="w-full aspect-video lg:aspect-[21/9] relative">
                  <img 
                    src={selectedOpinion.image} 
                    alt={selectedOpinion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
                </div>

                <div className="p-8 md:p-16 lg:p-24 max-w-3xl mx-auto -mt-32 relative z-10 bg-white shadow-2xl md:shadow-none text-left">
                  {/* Article Content */}
                  <article className="prose prose-2xl prose-serif max-w-none">
                    <div className="mb-12">
                      <p className="text-2xl md:text-3xl text-secondary font-light italic leading-relaxed border-l-4 border-accent pl-8 py-2">
                        {selectedOpinion.tagline}
                      </p>
                    </div>

                    <div 
                      className="text-gray-600 leading-[2.1] text-xl font-light space-y-12 first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-secondary first-letter:mr-4 first-letter:float-left"
                      dangerouslySetInnerHTML={{ __html: selectedOpinion.fullArticle }}
                    />

                    {/* Pro/Con Section */}
                    <div className="my-20 grid grid-cols-1 md:grid-cols-2 gap-12 pt-12 border-t border-gray-100">
                      <div className="space-y-6">
                        <h5 className="flex items-center text-sm font-bold text-secondary uppercase tracking-widest">
                          <CheckCircle2 size={18} className="mr-3 text-green-500" />
                          Key Advantages
                        </h5>
                        <ul className="space-y-4 list-none p-0">
                          {selectedOpinion.pros.map((pro, i) => (
                            <li key={i} className="text-sm text-gray-500 font-light border-b border-gray-50 pb-2 italic">
                              {pro}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-6">
                        <h5 className="flex items-center text-sm font-bold text-secondary uppercase tracking-widest">
                          <AlertCircle size={18} className="mr-3 text-red-500" />
                          Potential Risks
                        </h5>
                        <ul className="space-y-4 list-none p-0">
                          {selectedOpinion.cons.map((con, i) => (
                            <li key={i} className="text-sm text-gray-500 font-light border-b border-gray-50 pb-2 italic">
                              {con}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Business Angle */}
                    <div className="p-12 bg-[#002147] text-white rounded-3xl relative overflow-hidden group shadow-2xl">
                      <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110">
                        <TrendingUp size={160} />
                      </div>
                      <div className="relative z-10 space-y-6">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-[1px] bg-accent" />
                          <span className="text-accent text-[10px] font-bold uppercase tracking-[0.5em]">Investor Insight</span>
                        </div>
                        <h4 className="text-3xl font-serif font-bold leading-tight">The Strategic Perspective</h4>
                        <p className="text-gray-300 text-xl font-light leading-relaxed italic border-l-2 border-accent/30 pl-8 py-2">
                          "{selectedOpinion.businessAngle}"
                        </p>
                      </div>
                    </div>
                  </article>

                  {/* Modal Footer */}
                  <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center space-x-6">
                      <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors">
                        <Bookmark size={16} />
                        <span>Save For Later</span>
                      </button>
                      <button className="flex items-center space-x-2 text-[10px] font-bold uppercase tracking-widest text-gray-400 hover:text-accent transition-colors">
                        <Share2 size={16} />
                        <span>Share Analysis</span>
                      </button>
                    </div>
                    <button 
                      onClick={() => setSelectedOpinion(null)}
                      className="px-12 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl rounded-full"
                    >
                      Close Reader
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Editorial Footer */}
      <section className="container mx-auto px-4 lg:px-8 mt-32 py-20 border-t border-gray-200" data-aos="fade-up">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="flex justify-center -space-x-4 mb-8">
            {['JW', 'SC', 'DP', 'PB', 'MR'].map((initial, i) => (
              <div key={i} className="w-12 h-12 rounded-full border-4 border-[#FAF9F6] bg-secondary flex items-center justify-center text-[10px] font-bold text-white shadow-xl">
                {initial}
              </div>
            ))}
          </div>
          <h2 className="text-4xl md:text-5xl font-serif font-bold text-secondary">
            Join the <span className="italic text-accent">Inner Circle.</span>
          </h2>
          <p className="text-xl text-gray-500 font-light italic">
            "Receive weekly strategic intelligence, exclusive founder interviews, and deep-dive economic forecasts directly in your executive dashboard."
          </p>
          <div className="pt-12 w-full max-w-xl mx-auto flex justify-center">
            <Link 
              to="/contact"
              className="w-full md:w-auto px-16 py-6 bg-secondary text-white text-[11px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-2xl rounded-full text-center"
            >
              Contact Our Editorial Board
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Opinion;
