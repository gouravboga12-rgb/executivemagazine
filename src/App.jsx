import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'
import ScrollToTop from './components/ScrollToTop'

// Pages
import Home from './pages/Home'
import ArticleDetail from './pages/ArticleDetail'
import CategoryPage from './pages/CategoryPage'
import Interviews from './pages/Interviews'
import About from './pages/About'
import Contact from './pages/Contact'
import Spotlights from './pages/Spotlights'
import SpotlightDetail from './pages/SpotlightDetail'
import Business from './pages/Business'

import DigitalMagazine from './pages/DigitalMagazine'
import MagazineViewer from './pages/MagazineViewer'
import InterviewViewer from './pages/InterviewViewer'
import AuthorPage from './pages/AuthorPage'
import AIInfo from './pages/AIInfo'
import Events from './pages/Events'
import Opinion from './pages/Opinion'
import Admin from './pages/Admin'




function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <>

      <ScrollToTop />
      <div className="min-h-screen bg-primary flex flex-col">
        {!isAdmin && <Navbar />}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/interviews" element={<Interviews />} />
            <Route path="/business" element={<Business />} />
            <Route path="/opinion" element={<Opinion />} />
            <Route path="/lifestyle" element={<CategoryPage category="Lifestyle" />} />
            <Route path="/events" element={<Events />} />
            <Route path="/spotlights" element={<Spotlights />} />
            <Route path="/spotlights/:id" element={<SpotlightDetail />} />
            <Route path="/ai-info" element={<AIInfo />} />
            <Route path="/digital-magazine" element={<DigitalMagazine />} />
            <Route path="/magazine/:id" element={<MagazineViewer />} />
            <Route path="/interview/:id" element={<InterviewViewer />} />

            <Route path="/author/:id" element={<AuthorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<Admin />} />
          </Routes>
        </main>
        {!isAdmin && <Footer />}
        {!isAdmin && <FloatingWhatsApp />}
      </div>
    </>
  )
}

export default App
