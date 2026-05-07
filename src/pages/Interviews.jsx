import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Eye, FileText, ArrowRight } from 'lucide-react'

const interviews = [
  {
    id: 'alfa-laval',
    company: 'Alfa Laval India Limited',
    preview: '/interview-covers/alfa-laval-cover.png',
    pdf: '/interview pages/Alfa Laval India Limited-story.pdf'
  },
  {
    id: 'himedia-laboratories',
    company: 'HiMedia Laboratories',
    preview: '/interview-covers/himedia-cover.png',
    pdf: '/interview pages/HiMedia-Laboratories_3.pdf'
  },
  {
    id: 'kitex-garments',
    company: 'Kitex Garments',
    preview: '/interview-images/kitex-garments---vision-&-culture_pdf/page_1.png',
    pdf: '/interview pages/Kitex Garments - Vision & Culture_pdf.pdf'
  },
  {
    id: 'nagarjuna-construction',
    company: 'Nagarjuna Construction',
    preview: '/interview-images/nagarjuna-construction-company-ltd/page_1.png',
    pdf: '/interview pages/Nagarjuna-Construction-Company-Ltd.pdf'
  },
  {
    id: 'national-engineering',
    company: 'National Engineering Industries',
    preview: '/interview-covers/national-engineering-cover.png',
    pdf: '/interview pages/National Engineering Industries Ltd-story - Copy.pdf'
  },
  {
    id: 'sandur-manganese',
    company: 'Sandur Manganese',
    preview: '/interview-images/sandur-manganese/page_1.png',
    pdf: '/interview pages/Sandur Manganese.pdf'
  },
  {
    id: 'vitabiotics',
    company: 'Vitabiotics',
    preview: '/interview-covers/vitabiotics-cover.png',
    pdf: '/interview pages/Vitabiotics-.pdf'
  },
  {
    id: 'irm-energy',
    company: 'IRM Energy Private Limited',
    preview: '/interview-covers/irm-energy-cover.png',
    pdf: '/interview pages/IRM Energy Private Limited.pdf'
  },
  {
    id: 'itd-cementation',
    company: 'ITD Cementation',
    preview: '/interview-images/itd-cementation/page_1.png',
    pdf: '/interview pages/ITD Cementation.pdf'
  },
  {
    id: 'johnson-controls',
    company: 'Johnson Controls',
    preview: '/interview-images/johnson-controls/page_1.png',
    pdf: '/interview pages/Johnson controls.pdf'
  },
  {
    id: 'jos-alukkas',
    company: 'Jos Alukkas',
    preview: '/interview-images/jos-alukkas-story/page_1.png',
    pdf: '/interview pages/Jos Alukkas Story.pdf'
  },
  {
    id: 'kims-hospitals',
    company: 'KIMS Hospitals',
    preview: '/interview-images/kims-hospitals-/page_1.png',
    pdf: '/interview pages/KIMS-Hospitals-.pdf'
  }
]

export default function Interviews() {
  return (
    <div className="pb-32 bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-secondary py-32 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-accent/5 -skew-x-12 translate-x-1/4" />
        <div className="container mx-auto px-4 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <span className="text-accent text-xs font-bold uppercase tracking-[0.5em] mb-6 block">Editorial Library</span>
            <h1 className="text-6xl md:text-8xl font-bold tracking-tighter mb-8 uppercase">
              THE <br /> <span className="text-accent">INTERVIEWS</span>
            </h1>
            <p className="text-gray-400 text-xl font-light leading-relaxed font-serif italic">
              Access our complete digital archive of exclusive sit-down interviews with the architects of modern industry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Grid */}
      <div className="container mx-auto px-4 lg:px-8 -mt-20 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {interviews.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.05 }}
              className="group bg-white border border-gray-100 shadow-2xl hover:shadow-accent/10 transition-all duration-500 overflow-hidden flex flex-col"
            >
              <Link 
                to={`/interview/${item.id}`}
                state={{ pdfUrl: item.pdf, title: item.company }}
                className="relative aspect-[3/4] overflow-hidden bg-gray-50 border-b border-gray-100 block cursor-pointer"
              >
                <img 
                  src={item.preview} 
                  alt={item.company}
                  className="w-full h-full object-contain bg-white group-hover:scale-105 transition-transform duration-1000"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1586339949916-3e9457bed613?q=80&w=2070&auto=format&fit=crop"
                  }}
                />
                {/* Overlay on hover (Desktop) */}
                <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center pointer-events-none">
                  <div className="flex items-center space-x-3 bg-white text-secondary px-8 py-3 text-[10px] font-bold uppercase tracking-widest transition-all transform translate-y-4 group-hover:translate-y-0 duration-500">
                    <Eye size={14} />
                    <span>Open Reader</span>
                  </div>
                </div>
              </Link>
              
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="text-accent text-[8px] font-bold uppercase tracking-widest mb-1 block">Full Feature</span>
                    <h3 className="text-lg font-bold text-secondary leading-tight group-hover:text-accent transition-colors">
                      {item.company}
                    </h3>
                  </div>
                  <div className="bg-gray-50 p-2 text-gray-300 group-hover:text-accent transition-colors">
                    <FileText size={18} />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Footer Info */}
      <div className="container mx-auto px-4 lg:px-8 mt-32">
        <div className="bg-gray-50 p-12 md:p-20 border border-gray-100 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="max-w-2xl space-y-6 text-center lg:text-left">
            <h2 className="text-3xl font-serif font-bold text-secondary">Looking for a specific feature?</h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Our full editorial archive contains over 200+ exclusive interviews from the last decade. Contact our research team for specific industry reports.
            </p>
          </div>
          <button className="whitespace-nowrap px-12 py-5 bg-secondary text-white text-[10px] font-bold uppercase tracking-[0.3em] hover:bg-accent transition-all shadow-xl">
            Inquire for Archive
          </button>
        </div>
      </div>
    </div>
  )
}
