import { useState, useEffect, useRef } from 'react'
import { 
  LayoutDashboard, FileText, BookOpen, MessageSquare, 
  Plus, Upload, Trash2, Eye, Download, 
  ChevronRight, Search, CheckCircle2, AlertCircle, X, Menu,
  ArrowUpRight, Clock, User, Globe, LogOut, Lock, TrendingUp, Edit2,
  Mail, Phone, Quote
} from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
// import { supabase } from '../lib/supabase' // Removed Supabase


export default function Admin() {
  const [session, setSession] = useState(null)
  const [activeTab, setActiveTab] = useState('overview')
  const [loading, setLoading] = useState(true)
  const [authLoading, setAuthLoading] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authError, setAuthError] = useState(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const [stats, setStats] = useState({
    inquiries: 0,
    interviews: 0,
    magazines: 0
  })

  // Data states
  const [inquiries, setInquiries] = useState([])
  const [interviews, setInterviews] = useState([])
  const [magazines, setMagazines] = useState([])

  const [leads, setLeads] = useState([])
  const coverInputRef = useRef(null)
  const pdfInputRef = useRef(null)

  const displayInterviews = interviews
  const displayMagazines = magazines

  // Modal/Form states
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState(null) // 'interview' or 'magazine'
  const [formLoading, setFormLoading] = useState(false)
  const [formError, setFormError] = useState(null)
  const [formSuccess, setFormSuccess] = useState(null)
  const [coverPreview, setCoverPreview] = useState(null)
  const [pdfName, setPdfName] = useState(null)

  // Form Field States
  const [formFields, setFormFields] = useState({
    company: '',
    industry: '',
    title: '',
    edition: '',
    tag: '',
    description: '',
    featured: false,
    customData: ''
  })
  const [loadingStep, setLoadingStep] = useState('')
  const [pastedImage, setPastedImage] = useState(null) // State for pasted file object

  useEffect(() => {
    // Check for session in localStorage
    const savedSession = localStorage.getItem('admin_session')
    if (savedSession) {
      setSession(JSON.parse(savedSession))
      fetchData()
    }
    setAuthLoading(false)
  }, [])


  const handleLogin = async (e) => {
    e.preventDefault()
    setAuthLoading(true)
    setAuthError(null)
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}?action=login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await response.json();
      
      if (data.error) throw new Error(data.error)
      
      if (data.success) {
        const sessionData = { user: data.user, token: data.token };
        localStorage.setItem('admin_session', JSON.stringify(sessionData));
        setSession(sessionData);
        fetchData();
      }
    } catch (error) {
      setAuthError(error.message)
    } finally {
      setAuthLoading(false)
    }
  }


  useEffect(() => {
    setMobileMenuOpen(false)
  }, [activeTab])

  const handleLogout = async () => {
    localStorage.removeItem('admin_session')
    setSession(null)
  }


  const handleDelete = async (table, id) => {
    if (!window.confirm('Are you sure you want to delete this record?')) return
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const res = await fetch(`${apiUrl}?action=delete&table=${table}&id=${id}`, {
        method: 'DELETE'
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error);
      fetchData() // Refresh
    } catch (err) {
      alert('Delete failed: ' + err.message)
    }
  }

  const [editingItem, setEditingItem] = useState(null)
  const [editFormData, setEditFormData] = useState({})

  const handleEdit = (type, item) => {
    setModalType(type)
    setEditingItem({ ...item, type })
    
    // Parse custom fields if they exist in description or industry
    const rawText = type === 'interview' ? item.industry : item.description
    let mainText = rawText || ''
    let customPart = ''
    
    if (mainText.includes('[Custom Fields]')) {
      const parts = mainText.split('[Custom Fields]')
      mainText = parts[0].trim()
      customPart = parts[1].trim()
    }

    setFormFields({
      company: item.company || '',
      industry: type === 'interview' ? mainText : (item.industry || ''),
      title: item.title || '',
      edition: item.edition || '',
      tag: item.tag || '',
      description: type === 'magazine' ? mainText : (item.description || ''),
      featured: item.featured || false,
      customData: customPart
    })
    setIsModalOpen(true)
  }

  const handleUpdate = async (e) => {
    e.preventDefault()
    setFormLoading(true)
    setLoadingStep('Initializing...')
    setFormError(null)
    setFormSuccess(null)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    
    // Use pasted image if available and no new file was selected manually
    const coverFile = (data.coverFile && data.coverFile.size > 0) ? data.coverFile : pastedImage;
    
    try {
      const table = editingItem.type === 'interview' ? 'interviews' : 'magazines'
      let updateData = editingItem.type === 'interview' ? {
        company: formFields.company,
        industry: formFields.customData ? `${formFields.industry}\n\n[Custom Fields]\n${formFields.customData}` : formFields.industry
      } : {
        title: formFields.title,
        edition: formFields.edition,
        tag: formFields.tag,
        description: formFields.customData ? `${formFields.description}\n\n[Custom Fields]\n${formFields.customData}` : formFields.description,
        featured: formFields.featured
      }

      // Check for new cover file (manual upload or paste)
      if (coverFile) {
        setLoadingStep('Uploading new cover...')
        const coverUrl = await uploadToHostinger(coverFile)
        if (editingItem.type === 'interview') {
          updateData.preview_url = coverUrl
        } else {
          updateData.image_url = coverUrl
        }
      }

      // Check for new PDF file
      if (data.pdfFile && data.pdfFile.size > 0) {
        const pdfUrl = await uploadToHostinger(data.pdfFile)
        updateData.pdf_url = pdfUrl
      }

      setLoadingStep('Updating database...')

      const apiUrl = import.meta.env.VITE_API_URL;
      const action = editingItem.type === 'interview' ? 'update_interview' : 'update_magazine'
      
      const payload = { 
        id: editingItem.id,
        ...updateData,
        // Ensure all required fields are present even if they didn't change
        pdf_url: updateData.pdf_url || editingItem.pdf_url || editingItem.pdf,
        [editingItem.type === 'interview' ? 'preview_url' : 'image_url']: 
            (editingItem.type === 'interview' ? updateData.preview_url : updateData.image_url) || 
            (editingItem.type === 'interview' ? editingItem.preview_url : editingItem.image_url) || 
            editingItem.image || editingItem.preview
      }

      const response = await fetch(`${apiUrl}?action=${action}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const resData = await response.json();
      
      if (resData.error) throw new Error(resData.error)
      
      setLoadingStep('Finalizing...')
      setFormSuccess('Updated successfully!')
      fetchData()
      setTimeout(() => {
        setIsModalOpen(false)
        setEditingItem(null)
        setFormSuccess(null)
        setCoverPreview(null)
        setPdfName(null)
      }, 1500)
    } catch (err) {
      setFormError('Update failed: ' + err.message)
    } finally {
      setFormLoading(false)
      setLoadingStep('')
    }
  }

  const handleLeadStatusUpdate = async (id, newStatus) => {
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      const response = await fetch(`${apiUrl}?action=update_lead_status`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: newStatus })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error)
      
      setLeads(prev => Array.isArray(prev) ? prev.map(l => l.id === id ? { ...l, status: newStatus } : l) : [])
    } catch (err) {
      console.error('Failed to update status:', err)
      alert('Failed to update status: ' + err.message)
    }
  }

  const fetchData = async () => {
    setLoading(true)
    try {
      const apiUrl = import.meta.env.VITE_API_URL;
      
      const [magRes, intRes, leadRes, contactRes] = await Promise.all([
        fetch(`${apiUrl}?action=get_magazines`),
        fetch(`${apiUrl}?action=get_interviews`),
        fetch(`${apiUrl}?action=get_leads`),
        fetch(`${apiUrl}?action=get_contacts`)
      ]);

      const magData = await magRes.json();
      const intData = await intRes.json();
      const leadData = await leadRes.json();
      const contactData = await contactRes.json();

      const magArray = Array.isArray(magData) ? magData : []
      const intArray = Array.isArray(intData) ? intData : []
      const leadArray = Array.isArray(leadData) ? leadData : []
      const contactArray = Array.isArray(contactData) ? contactData : []

      setStats({
        inquiries: contactArray.length,
        interviews: intArray.length,
        magazines: magArray.length
      })

      setMagazines(magArray)
      setInterviews(intArray)
      setInquiries(contactArray)
      setLeads(leadArray)
    } catch (error) {
      console.error('Error fetching admin data:', error)
    } finally {
      setLoading(false)
    }
  }

  const uploadToHostinger = async (file) => {
    const apiUrl = import.meta.env.VITE_API_URL;
    const formData = new FormData()
    formData.append('file', file)

    const response = await fetch(`${apiUrl}?action=upload`, {
      method: 'POST',
      body: formData,
    })

    if (!response.ok) throw new Error('Hostinger upload failed')
    const data = await response.json()
    if (data.error) throw new Error(data.error)
    return data.url
  }

  const handlePaste = (e) => {
    const items = e.clipboardData?.items;
    if (!items) return;

    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf("image") !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          const file = new File([blob], "pasted-image.png", { type: blob.type });
          setPastedImage(file);
          setCoverPreview(URL.createObjectURL(file));
          break;
        }
      }
    }
  }

  const handleUpload = async (e, type) => {
    e.preventDefault()
    setFormLoading(true)
    setLoadingStep('Initializing...')
    setFormError(null)
    setFormSuccess(null)

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData.entries())
    const coverFile = (data.coverFile && data.coverFile.size > 0) ? data.coverFile : pastedImage;

    try {
      let coverUrl = ''
      let pdfUrl = ''

      // 1. Upload Cover
      if (coverFile) {
        setLoadingStep('Uploading cover image...')
        coverUrl = await uploadToHostinger(coverFile)
      }

      // 2. Upload PDF
      if (data.pdfFile && data.pdfFile.size > 0) {
        setLoadingStep('Uploading PDF document...')
        pdfUrl = await uploadToHostinger(data.pdfFile)
      }

      setLoadingStep('Registering with database...')
      const apiUrl = import.meta.env.VITE_API_URL;

      // 3. Save to Database via Hostinger API
      if (type === 'interview') {
        const response = await fetch(`${apiUrl}?action=add_interview`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            company: formFields.company,
            preview_url: coverUrl,
            pdf_url: pdfUrl,
            industry: formFields.customData ? `${formFields.industry}\n\n[Custom Fields]\n${formFields.customData}` : formFields.industry
          })
        });
        const resData = await response.json();
        if (resData.error) throw new Error(resData.error);
      } else {
        const response = await fetch(`${apiUrl}?action=add_magazine`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            title: formFields.title,
            edition: formFields.edition,
            image_url: coverUrl,
            pdf_url: pdfUrl,
            tag: formFields.tag,
            description: formFields.customData ? `${formFields.description}\n\n[Custom Fields]\n${formFields.customData}` : formFields.description,
            featured: formFields.featured
          })
        });
        const resData = await response.json();
        if (resData.error) throw new Error(resData.error);
      }

      setLoadingStep('Refresh...')
      setFormSuccess('Uploaded successfully!')
      fetchData()
      setTimeout(() => {
        setIsModalOpen(false)
        setFormSuccess(null)
        setCoverPreview(null)
        setPdfName(null)
      }, 2000)
    } catch (error) {
      console.error('Upload error:', error)
      setFormError(error.message)
    } finally {
      setFormLoading(false)
      setLoadingStep('')
    }
  }


  if (authLoading) {
    return (
      <div className="h-screen bg-secondary flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  if (!session) {
    return (
      <div className="h-screen bg-secondary flex items-center justify-center p-4 relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-accent/20 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 blur-[120px] rounded-full" />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md bg-white rounded-[40px] p-12 shadow-2xl relative z-10"
        >
          <div className="flex flex-col items-center text-center mb-12">
            <div className="w-20 h-20 bg-secondary rounded-3xl flex items-center justify-center mb-8 shadow-xl">
              <Lock size={32} className="text-accent" />
            </div>
            <h1 className="text-4xl font-black text-secondary tracking-tighter uppercase leading-none mb-3">
              SECURE <span className="text-accent italic font-sans lowercase tracking-normal">Access</span>
            </h1>
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em]">Executives Magazine Management</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-8">
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Owner Email</label>
              <input 
                required 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors" 
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Security Password</label>
              <input 
                required 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent transition-colors" 
              />
            </div>

            {authError && (
              <div className="p-4 bg-red-50 text-red-500 rounded-2xl flex items-center gap-3 border border-red-100">
                <AlertCircle size={16} />
                <span className="text-[10px] font-bold uppercase tracking-widest">{authError}</span>
              </div>
            )}

            <button 
              disabled={authLoading}
              type="submit"
              className="w-full py-6 bg-secondary text-white text-[11px] font-bold uppercase tracking-[0.4em] hover:bg-accent transition-all shadow-2xl rounded-full"
            >
              Authorize Session
            </button>
          </form>

          <div className="mt-12 text-center">
            <Link to="/" className="text-[10px] font-bold uppercase tracking-widest text-gray-300 hover:text-accent transition-colors">
              Return to Website
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-[#F9FAFB] overflow-hidden relative">
      {/* Mobile Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-secondary/60 backdrop-blur-sm z-[40] lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 w-72 bg-secondary text-white flex flex-col h-full shadow-2xl z-[50] 
        transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-8 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <LayoutDashboard size={18} className="text-white" />
             </div>
             <span className="text-[11px] font-bold uppercase tracking-[0.3em]">Admin Panel</span>
          </div>
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-white/50 hover:text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-3 mt-4">
          {[
            { id: 'overview', label: 'Overview', icon: <LayoutDashboard size={20} /> },
            { id: 'interviews', label: 'Interviews', icon: <FileText size={20} /> },
            { id: 'magazines', label: 'Editions', icon: <BookOpen size={20} /> },
            { id: 'leads', label: 'Growth Leads', icon: <TrendingUp size={20} /> },
            { id: 'inquiries', label: 'Inquiries', icon: <MessageSquare size={20} /> }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center justify-between px-6 py-4 rounded-2xl text-[10px] font-bold uppercase tracking-[0.2em] transition-all group ${
                activeTab === tab.id 
                ? 'bg-white text-secondary shadow-[0_20px_50px_rgba(0,0,0,0.2)] scale-[1.02]' 
                : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              <div className="flex items-center gap-4">
                <span className={`${activeTab === tab.id ? 'text-accent' : 'text-inherit opacity-50 group-hover:opacity-100'}`}>
                  {tab.icon}
                </span>
                {tab.label}
              </div>
              {activeTab === tab.id && <ChevronRight size={14} className="text-accent" />}
            </button>
          ))}
        </nav>

        <div className="p-8 border-t border-white/5 space-y-4">
          <Link to="/" className="flex items-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-accent transition-all group">
            <Globe size={18} className="group-hover:rotate-12 transition-transform" />
            Live Portal
          </Link>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-4 px-6 py-4 text-[10px] font-bold uppercase tracking-widest text-red-400/60 hover:text-red-400 transition-all group"
          >
            <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
            Secure Logout
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* Top Header Bar */}
        <header className="bg-white h-20 border-b border-gray-100 flex items-center justify-between px-6 lg:px-12 shrink-0">
          <div className="flex items-center gap-4">
             <button 
               onClick={() => setMobileMenuOpen(true)}
               className="lg:hidden p-2 -ml-2 text-secondary hover:text-accent transition-colors"
             >
               <Menu size={24} />
             </button>
             <h2 className="text-[11px] font-bold uppercase tracking-[0.5em] text-gray-400">
               {activeTab === 'overview' ? 'Management Dashboard' : `${activeTab} Management`}
             </h2>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
             <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-gray-50 rounded-full border border-gray-100">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-bold uppercase tracking-widest text-gray-400">System Live</span>
             </div>
             <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold shadow-lg">AD</div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-6 lg:p-12 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-12">
            {/* Header with Actions */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
              <div>
                <h1 className="text-4xl lg:text-6xl font-black text-secondary tracking-tighter uppercase leading-none mb-4 font-sans">
                  {activeTab === 'overview' ? 'DASHBOARD' : activeTab.toUpperCase()}
                </h1>
                <p className="text-gray-400 text-sm uppercase tracking-widest font-medium">Welcome back to Executives Management</p>
              </div>
              <div className="flex flex-wrap gap-4 w-full md:w-auto">
                  {(activeTab === 'overview' || activeTab === 'interviews') && (
                    <button 
                     onClick={() => { 
                       setModalType('interview'); 
                       setEditingItem(null); 
                       setFormFields({ company: '', industry: '', title: '', edition: '', tag: '', description: '', featured: false });
                       setIsModalOpen(true); 
                     }}
                     className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-secondary text-white px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-all shadow-xl"
                    >
                      <Plus size={14} />
                      Add Interview
                    </button>
                  )}
                  {(activeTab === 'overview' || activeTab === 'magazines') && (
                    <button 
                     onClick={() => { 
                       setModalType('magazine'); 
                       setEditingItem(null);
                       setFormFields({ company: '', industry: '', title: '', edition: '', tag: '', description: '', featured: false });
                       setIsModalOpen(true); 
                     }}
                     className="flex-1 md:flex-none flex items-center justify-center gap-3 border border-secondary text-secondary px-8 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-secondary hover:text-white transition-all"
                    >
                     <Plus size={14} />
                     Add Magazine
                   </button>
                 )}
              </div>
            </div>
          {loading ? (
            <div className="h-96 flex items-center justify-center">
              <div className="w-12 h-12 border-4 border-accent border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* Overview */}
              {activeTab === 'overview' && (
                <div className="space-y-12">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {[
                      { label: 'Corporate Inquiries', val: stats.inquiries, icon: <MessageSquare size={24} />, color: 'bg-blue-500' },
                      { label: 'Strategic Leads', val: leads.length, icon: <TrendingUp size={24} />, color: 'bg-orange-500' },
                      { label: 'Archive Interviews', val: stats.interviews, icon: <FileText size={24} />, color: 'bg-accent' },
                      { label: 'Digital Editions', val: stats.magazines, icon: <BookOpen size={24} />, color: 'bg-green-500' }
                    ].map((item, i) => (
                      <motion.div 
                        key={i} 
                        whileHover={{ y: -5 }}
                        className="p-10 rounded-[32px] bg-white border border-gray-100 shadow-sm hover:shadow-2xl transition-all space-y-6 relative overflow-hidden group"
                      >
                        <div className={`absolute top-0 right-0 w-32 h-32 ${item.color} opacity-[0.03] rounded-full -mr-16 -mt-16 transition-all group-hover:scale-150`} />
                        <div className={`w-16 h-16 ${item.color} text-white rounded-[20px] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform`}>
                          {item.icon}
                        </div>
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-400 mb-2">{item.label}</p>
                          <p className="text-5xl font-black text-secondary tracking-tighter font-sans">
                            {item.label === 'Archive Interviews' ? displayInterviews.length : 
                             item.label === 'Digital Editions' ? displayMagazines.length : 
                             item.val}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Recent Inquiries */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-secondary uppercase tracking-tight font-sans">Recent Inquiries</h3>
                        <button onClick={() => setActiveTab('inquiries')} className="text-[10px] font-bold uppercase text-accent hover:underline">View All</button>
                      </div>
                      <div className="space-y-4">
                        {inquiries.slice(0, 5).map((inq) => (
                          <div key={inq.id} className="p-6 border border-gray-50 rounded-2xl hover:bg-gray-50 transition-colors flex items-center justify-between group">
                            <div className="flex items-center gap-4">
                              <div className="w-10 h-10 bg-secondary rounded-full flex items-center justify-center text-white text-xs font-bold uppercase">
                                {inq.name[0]}
                              </div>
                              <div>
                                <h4 className="text-sm font-bold text-secondary line-clamp-1">{inq.name}</h4>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest">{new Date(inq.created_at).toLocaleDateString()}</p>
                              </div>
                            </div>
                            <ChevronRight size={16} className="text-gray-300 group-hover:text-accent group-hover:translate-x-1 transition-all" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recent Content */}
                    <div className="space-y-6">
                      <div className="flex items-center justify-between">
                        <h3 className="text-xl font-bold text-secondary uppercase tracking-tight font-sans">Latest Uploads</h3>
                        <div className="flex gap-4">
                          <button onClick={() => setActiveTab('interviews')} className="text-[10px] font-bold uppercase text-accent hover:underline">Interviews</button>
                          <button onClick={() => setActiveTab('magazines')} className="text-[10px] font-bold uppercase text-accent hover:underline">Magazines</button>
                        </div>
                      </div>
                      <div className="space-y-4">
                        {[...displayInterviews.slice(0, 2), ...displayMagazines.slice(0, 2)].map((item, i) => (
                          <div key={i} className="p-6 border border-gray-50 rounded-2xl flex items-center gap-4">
                             <div className="w-12 h-16 bg-gray-100 flex-shrink-0 overflow-hidden rounded-md">
                               <img src={item.preview_url || item.image_url} alt="" className="w-full h-full object-cover" />
                             </div>
                             <div className="flex-1">
                               <h4 className="text-sm font-bold text-secondary line-clamp-1">{item.company || item.title}</h4>
                               <p className="text-[10px] text-gray-400 uppercase tracking-widest">
                                 {item.industry ? 'Interview' : 'Magazine'} · {item.isHardcoded ? 'System File' : new Date(item.created_at).toLocaleDateString()}
                               </p>
                             </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Interviews List */}
              {activeTab === 'interviews' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-secondary uppercase tracking-tight font-sans">Archive Interviews</h2>
                    <div className="flex items-center bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
                      <Search size={16} className="text-gray-400 mr-2" />
                      <input type="text" placeholder="Filter company..." className="bg-transparent border-none focus:ring-0 text-xs" />
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Preview</th>
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Company</th>
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Industry</th>
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400">Date Added</th>
                          <th className="pb-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 text-right w-32">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-50">
                        {displayInterviews.map((int) => (
                          <tr key={int.id} className="group hover:bg-gray-50/50 transition-colors">
                            <td className="py-6">
                              <div className="w-12 h-16 bg-gray-100 rounded overflow-hidden shadow-sm">
                                <img src={int.preview_url} alt="" className="w-full h-full object-cover" />
                              </div>
                            </td>
                            <td className="py-6 font-bold text-secondary">{int.company}</td>
                            <td className="py-6 text-xs text-gray-500 uppercase tracking-widest">{int.industry}</td>
                             <td className="py-6 text-xs text-gray-400">{new Date(int.created_at).toLocaleDateString()}</td>
                             <td className="py-6 text-right">
                                <div className="flex justify-end items-center gap-1 h-full">
                                  <a href={int.pdf_url} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-accent transition-colors flex items-center"><Eye size={16} /></a>
                                  <button onClick={() => handleEdit('interview', int)} className="p-2 text-gray-400 hover:text-blue-500 transition-colors flex items-center"><Edit2 size={16} /></button>
                                  <button onClick={() => handleDelete('interviews', int.id)} className="p-2 text-gray-400 hover:text-red-500 transition-colors flex items-center"><Trash2 size={16} /></button>
                                </div>
                             </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Magazines List */}
              {activeTab === 'magazines' && (
                <div className="space-y-8">
                  <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold text-secondary uppercase tracking-tight font-sans">Magazine Archive</h2>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                    {displayMagazines.map((mag) => (
                      <div key={mag.id} className="group bg-gray-50/50 rounded-3xl border border-gray-100 overflow-hidden hover:shadow-xl transition-all">
                        <div className="aspect-[4/5] relative">
                           <img src={mag.image_url} alt={mag.title} className="w-full h-full object-cover" />
                           <div className="absolute inset-0 bg-secondary/60 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                              <a href={mag.pdf_url} target="_blank" rel="noreferrer" className="bg-white text-secondary px-8 py-3 text-[10px] font-bold uppercase tracking-widest shadow-xl">Preview PDF</a>
                           </div>
                           <div className="absolute top-4 right-4 flex gap-2 z-50">
                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleEdit('magazine', mag); }} className="p-2 bg-white text-blue-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer relative z-50"><Edit2 size={16} /></button>
                                <button onClick={(e) => { e.preventDefault(); e.stopPropagation(); handleDelete('magazines', mag.id); }} className="p-2 bg-white text-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer relative z-50"><Trash2 size={16} /></button>
                           </div>
                        </div>
                        <div className="p-8 space-y-4">
                           <div className="flex justify-between items-start">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{mag.tag}</span>
                              {mag.featured && <CheckCircle2 size={14} className="text-green-500" />}
                           </div>
                           <h3 className="text-lg font-bold text-secondary leading-tight line-clamp-1">{mag.title}</h3>
                           <p className="text-xs text-gray-400 uppercase tracking-widest">{mag.edition}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inquiries List */}
              {activeTab === 'inquiries' && (
                <div className="space-y-12">
                   <div className="flex justify-between items-end">
                     <div>
                       <h2 className="text-4xl font-black text-secondary uppercase tracking-tighter font-sans">Corporate Inquiries</h2>
                       <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Managing direct incoming communications</p>
                     </div>
                     <div className="px-4 py-2 bg-accent/10 rounded-full border border-accent/20">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">{inquiries.length} Messages Total</span>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 gap-8">
                      {inquiries.map((inq, idx) => (
                        <motion.div 
                          key={inq.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.05 }}
                          className="bg-white border border-gray-100 rounded-[32px] overflow-hidden hover:shadow-2xl transition-all group relative"
                        >
                           {/* Accent Line */}
                           <div className="absolute top-0 left-0 w-1.5 h-full bg-accent opacity-20 group-hover:opacity-100 transition-opacity" />
                           
                           <div className="p-10 space-y-8">
                              <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                 <div className="flex items-center gap-8">
                                    <div className="w-20 h-20 bg-secondary text-white rounded-full flex items-center justify-center text-2xl font-bold shadow-xl border-4 border-white">
                                       {inq.name[0]}
                                    </div>
                                    <div className="space-y-2">
                                       <div className="flex items-center gap-4">
                                          <h3 className="text-2xl font-bold text-secondary tracking-tight font-sans">{inq.name}</h3>
                                          <span className="bg-secondary/5 text-secondary text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-full border border-secondary/10">
                                            {inq.service || 'Standard'}
                                          </span>
                                       </div>
                                       <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[11px] text-gray-400 font-medium">
                                          <span className="flex items-center gap-2 hover:text-accent transition-colors"><Mail size={14} className="text-accent/50" /> {inq.email}</span>
                                          <span className="flex items-center gap-2"><Phone size={14} className="text-accent/50" /> {inq.phone || 'No phone'}</span>
                                          <span className="flex items-center gap-2"><Globe size={14} className="text-accent/50" /> {inq.organization || 'Independent'}</span>
                                          <span className="flex items-center gap-2"><Clock size={14} className="text-accent/50" /> {new Date(inq.created_at).toLocaleDateString()}</span>
                                       </div>
                                    </div>
                                 </div>

                                 <div className="flex flex-col items-end gap-4">
                                    <div className="px-6 py-2 bg-accent/5 text-accent text-[10px] font-bold uppercase tracking-[0.2em] rounded-full border border-accent/10 whitespace-nowrap">
                                       {inq.subject}
                                    </div>
                                    <button 
                                      onClick={() => handleDelete('contacts', inq.id)}
                                      className="p-3 text-gray-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all opacity-0 group-hover:opacity-100"
                                    >
                                      <Trash2 size={20} />
                                    </button>
                                 </div>
                              </div>

                              <div className="relative">
                                 <div className="absolute -top-4 -left-4 text-accent/10 pointer-events-none">
                                    <Quote size={80} />
                                 </div>
                                 <div className="bg-gray-50/50 p-10 rounded-[24px] border-l-4 border-accent relative z-10">
                                    <p className="text-lg text-secondary font-light italic leading-relaxed break-words">
                                       "{inq.message}"
                                    </p>
                                 </div>
                              </div>
                           </div>
                        </motion.div>
                      ))}
                   </div>

                   {inquiries.length === 0 && (
                     <div className="py-32 text-center bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                        <MessageSquare size={48} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest font-sans">No inquiries at the moment</h3>
                     </div>
                   )}
                </div>
              )}



              {/* Leads List */}
              {activeTab === 'leads' && (
                <div className="space-y-8">
                    <div className="flex justify-between items-end">
                      <div>
                        <h2 className="text-4xl font-black text-secondary uppercase tracking-tighter font-sans">Strategic Leads</h2>
                        <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.3em] mt-2">Conversion funnel monitoring</p>
                      </div>
                      <div className="px-4 py-2 bg-secondary/5 rounded-full border border-secondary/10">
                         <span className="text-[10px] font-bold uppercase tracking-widest text-secondary">{leads.length} Total Prospects</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 gap-6">
                      {leads.map((lead, idx) => (
                        <motion.div 
                          key={lead.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: idx * 0.03 }}
                          className="bg-white p-8 border border-gray-100 rounded-[32px] hover:shadow-2xl transition-all group flex flex-col md:flex-row md:items-center justify-between gap-8"
                        >
                           <div className="flex items-center gap-8">
                              <div className="w-14 h-14 bg-gray-50 text-secondary rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-accent group-hover:text-white transition-all">
                                 <User size={24} />
                              </div>
                              <div className="space-y-1">
                                 <h3 className="text-lg font-bold text-secondary font-sans tracking-tight">{lead.email}</h3>
                                 <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest text-gray-400 font-sans">
                                    <span className="text-accent">{lead.source_page}</span>
                                    <span>•</span>
                                    <span>{lead.type}</span>
                                    <span>•</span>
                                    <span className="text-gray-300 italic">{new Date(lead.created_at).toLocaleDateString()}</span>
                                 </div>
                              </div>
                           </div>

                           <div className="flex flex-wrap items-center gap-6">
                              <div className="bg-gray-50/80 px-6 py-3 rounded-2xl border border-gray-100 max-w-xs">
                                 <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-300 mb-1 font-sans">Affiliation</p>
                                 <p className="text-xs text-secondary font-bold truncate font-sans">{lead.name || lead.organization || 'Not Specified'}</p>
                              </div>

                              <div className="flex items-center gap-4">
                                 <select 
                                   value={lead.status || '1. Inquiry'}
                                   onChange={(e) => handleLeadStatusUpdate(lead.id, e.target.value)}
                                   className={`text-[9px] font-black uppercase tracking-[0.2em] px-6 py-3 rounded-full border-2 transition-all cursor-pointer font-sans ${
                                     lead.status === '4. Published' ? 'bg-green-50 border-green-200 text-green-700' :
                                     lead.status === '3. Interview' ? 'bg-blue-50 border-blue-200 text-blue-700' :
                                     lead.status === '2. Meeting' ? 'bg-amber-50 border-amber-200 text-amber-700' :
                                     'bg-gray-50 border-gray-200 text-gray-600'
                                   }`}
                                 >
                                   <option value="1. Inquiry">1. Phase: Inquiry</option>
                                   <option value="2. Meeting">2. Phase: Meeting</option>
                                   <option value="3. Interview">3. Phase: Interview</option>
                                   <option value="4. Published">4. Phase: Published</option>
                                  </select>

                                 <button 
                                   onClick={() => handleDelete('leads', lead.id)}
                                   className="p-4 text-gray-200 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all"
                                 >
                                   <Trash2 size={20} />
                                 </button>
                              </div>
                           </div>
                        </motion.div>
                      ))}
                    </div>

                    {leads.length === 0 && (
                      <div className="text-center py-32 bg-gray-50 rounded-[40px] border-2 border-dashed border-gray-100">
                        <TrendingUp size={48} className="mx-auto text-gray-200 mb-6" />
                        <h3 className="text-xl font-bold text-gray-400 uppercase tracking-widest font-sans">Growth pipeline empty</h3>
                      </div>
                    )}
                </div>
              )}
            </>
          )}
          </div>
        </main>
      </div>

      {/* Upload Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-secondary/95 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              className="bg-white w-full max-w-2xl rounded-3xl max-h-[90vh] overflow-y-auto shadow-2xl p-10 relative custom-scrollbar"
            >
              <button onClick={() => { setIsModalOpen(false); setFormError(null); setFormSuccess(null); setCoverPreview(null); setPdfName(null); setPastedImage(null); }} className="absolute top-6 right-6 text-gray-400 hover:text-secondary"><X /></button>
              
              <h2 className="text-3xl font-bold text-secondary uppercase tracking-tighter mb-8 font-sans">
                {editingItem ? 'Edit' : 'New'} <span className="text-accent italic font-sans lowercase tracking-normal">{modalType}</span>
              </h2>

              <form onSubmit={editingItem ? handleUpdate : (e) => handleUpload(e, modalType)} className="space-y-8">
                {modalType === 'interview' ? (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Company Name</label>
                        <input 
                          name="company" 
                          type="text" 
                          value={formFields.company}
                          onChange={(e) => setFormFields({...formFields, company: e.target.value})}
                          className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Industry</label>
                        <input 
                          name="industry" 
                          type="text" 
                          value={formFields.industry}
                          onChange={(e) => setFormFields({...formFields, industry: e.target.value})}
                          className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent" 
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Magazine Title</label>
                        <input 
                          name="title" 
                          type="text" 
                          value={formFields.title}
                          onChange={(e) => setFormFields({...formFields, title: e.target.value})}
                          className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent" 
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Edition Subtitle</label>
                        <input 
                          name="edition" 
                          type="text" 
                          value={formFields.edition}
                          onChange={(e) => setFormFields({...formFields, edition: e.target.value})}
                          placeholder="e.g. Annual Collector's Edition" 
                          className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent" 
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Badge Text (Blue Box)</label>
                        <input 
                          name="tag" 
                          type="text" 
                          value={formFields.tag}
                          onChange={(e) => setFormFields({...formFields, tag: e.target.value})}
                          placeholder="e.g. Annual Edition" 
                          className="w-full border-b border-gray-100 py-3 focus:outline-none focus:border-accent" 
                        />
                      </div>
                      <div className="space-y-2 flex items-end pb-3">
                         <label className="flex items-center gap-3 cursor-pointer">
                            <input 
                              name="featured" 
                              type="checkbox" 
                              checked={formFields.featured}
                              onChange={(e) => setFormFields({...formFields, featured: e.target.checked})}
                              className="w-5 h-5 rounded border-gray-300 text-accent focus:ring-accent" 
                            />
                            <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Featured Edition</span>
                         </label>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Description</label>
                      <textarea 
                        name="description" 
                        rows="3" 
                        value={formFields.description}
                        onChange={(e) => setFormFields({...formFields, description: e.target.value})}
                        className="w-full border border-gray-100 p-4 focus:outline-none focus:border-accent rounded-xl resize-none" 
                      />
                    </div>
                    {/* Custom Field Option */}
                    <div className="space-y-2 pt-4 border-t border-gray-50">
                      <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 flex items-center gap-2">
                         Custom Fields <span className="text-[8px] opacity-50">(Optional additional data)</span>
                      </label>
                      <textarea 
                        placeholder="Key: Value (one per line)" 
                        rows="2" 
                        value={formFields.customData}
                        onChange={(e) => setFormFields({...formFields, customData: e.target.value})}
                        className="w-full border border-gray-100 p-4 focus:outline-none focus:border-accent rounded-xl resize-none text-[12px] font-mono" 
                      />
                    </div>
                  </>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                      {editingItem ? 'Replace Cover Image (Optional)' : 'Cover Image'}
                    </label>
                    <label className="relative group block cursor-pointer">
                       <input 
                         ref={coverInputRef}
                         name="coverFile" 
                         type="file" 
                         accept="image/*" 
                         className="hidden" 
                         onChange={(e) => {
                           const file = e.target.files[0]
                           if (file) setCoverPreview(URL.createObjectURL(file))
                         }}
                       />
                       <div 
                         onPaste={handlePaste}
                         className="border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center group-hover:border-accent transition-all group-hover:bg-accent/5 overflow-hidden relative min-h-[120px] flex flex-col items-center justify-center outline-none focus:border-accent"
                         tabIndex="0"
                       >
                          {(coverPreview || editingItem?.image_url || editingItem?.preview_url) ? (
                            <img src={coverPreview || editingItem?.image_url || editingItem?.preview_url} alt="Preview" className="absolute inset-0 w-full h-full object-cover opacity-20" />
                          ) : null}
                          <div className="relative z-10 pointer-events-none">
                            <Upload className="mx-auto mb-2 text-gray-300 group-hover:text-accent" />
                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                              {coverPreview || editingItem ? 'Change Image' : 'Click or Paste Image'}
                            </p>
                          </div>
                          {coverPreview && (
                            <button 
                              type="button"
                              onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation(); 
                                setCoverPreview(null);
                                setPastedImage(null);
                                if (coverInputRef.current) coverInputRef.current.value = '';
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-lg z-20 pointer-events-auto"
                            >
                              <X size={12} />
                            </button>
                          )}
                       </div>
                    </label>
                  </div>
                  <div className="space-y-4">
                    <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 block">
                      {editingItem ? 'Replace PDF File (Optional)' : 'Full PDF File'}
                    </label>
                    <label className="relative group block cursor-pointer">
                       <input 
                         ref={pdfInputRef}
                         name="pdfFile" 
                         type="file" 
                         accept="application/pdf" 
                         className="hidden" 
                         onChange={(e) => {
                           const file = e.target.files[0]
                           if (file) setPdfName(file.name)
                         }}
                       />
                       <div className="border-2 border-dashed border-gray-100 rounded-2xl p-8 text-center group-hover:border-accent transition-all group-hover:bg-accent/5 relative min-h-[120px] flex flex-col items-center justify-center">
                          <div className="relative z-10 pointer-events-none">
                            <Download className="mx-auto mb-2 text-gray-300 group-hover:text-accent" />
                            <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                              {pdfName ? (
                                <span className="text-green-600 font-bold">{pdfName}</span>
                              ) : 'Click to upload PDF'}
                            </p>
                          </div>
                          {pdfName && (
                            <button 
                              type="button"
                              onClick={(e) => { 
                                e.preventDefault();
                                e.stopPropagation(); 
                                setPdfName(null);
                                if (pdfInputRef.current) pdfInputRef.current.value = '';
                              }}
                              className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 shadow-lg z-20 pointer-events-auto"
                            >
                              <X size={12} />
                            </button>
                          )}
                       </div>
                    </label>
                  </div>
                </div>

                {formError && <p className="text-red-500 text-xs font-bold uppercase text-center">{formError}</p>}
                {formSuccess && <p className="text-green-500 text-xs font-bold uppercase text-center">{formSuccess}</p>}

                <button 
                  disabled={formLoading}
                  type="submit"
                  className={`w-full py-6 text-[11px] font-bold uppercase tracking-[0.3em] transition-all flex items-center justify-center gap-4 ${
                    formLoading ? 'bg-gray-100 text-gray-400' : 'bg-secondary text-white hover:bg-accent shadow-2xl'
                  }`}
                >
                  {formLoading ? (
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>{loadingStep || 'Processing...'}</span>
                    </div>
                  ) : (
                    <>{editingItem ? 'Save Changes' : `Deploy ${modalType}`}</>
                  )}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
