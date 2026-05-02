import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'

// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import FloatingWhatsApp from './components/FloatingWhatsApp'

// Pages
import Home from './pages/Home'
import ArticleDetail from './pages/ArticleDetail'
import CategoryPage from './pages/CategoryPage'
import About from './pages/About'
import Contact from './pages/Contact'
import Awards from './pages/Awards'
import DigitalMagazine from './pages/DigitalMagazine'
import AuthorPage from './pages/AuthorPage'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      easing: 'ease-in-out',
    })
  }, [])

  return (
    <Router>
      <div className="min-h-screen bg-primary flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/article/:id" element={<ArticleDetail />} />
            <Route path="/category/:category" element={<CategoryPage />} />
            <Route path="/interviews" element={<CategoryPage category="Interviews" />} />
            <Route path="/business" element={<CategoryPage category="Business" />} />
            <Route path="/opinion" element={<CategoryPage category="Opinion" />} />
            <Route path="/lifestyle" element={<CategoryPage category="Lifestyle" />} />
            <Route path="/events" element={<CategoryPage category="Events" />} />
            <Route path="/spotlights" element={<CategoryPage category="Spotlights" />} />
            <Route path="/awards" element={<Awards />} />
            <Route path="/digital-magazine" element={<DigitalMagazine />} />
            <Route path="/author/:id" element={<AuthorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </Router>
  )
}

export default App
