import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export default function SEO({ title, description, keywords, canonical }) {
  const location = useLocation()
  const [settings, setSettings] = useState({
    gsc_key: '',
    ga4_id: '',
    seo_keywords: '',
    seo_description: ''
  })

  useEffect(() => {
    // Fetch global SEO settings from database
    const fetchSettings = async () => {
      try {
        const apiUrl = import.meta.env.VITE_API_URL
        const res = await fetch(`${apiUrl}?action=get_settings`)
        const data = await res.json()
        if (data && !data.error) {
          setSettings({
            gsc_key: data.gsc_key || '',
            ga4_id: data.ga4_id || '',
            seo_keywords: data.seo_keywords || '',
            seo_description: data.seo_description || ''
          })
        }
      } catch (err) {
        console.error('Failed to load SEO settings:', err)
      }
    }
    fetchSettings()
  }, [])

  // Dynamic GA4 automated tracking
  useEffect(() => {
    if (!settings.ga4_id) return

    // Inject Google Tag script dynamically if not already present
    const scriptId = 'google-analytics-gtag'
    let script = document.getElementById(scriptId)
    
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${settings.ga4_id}`
      document.head.appendChild(script)

      const inlineScript = document.createElement('script')
      inlineScript.id = 'google-analytics-inline'
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${settings.ga4_id}', { page_path: window.location.pathname });
      `
      document.head.appendChild(inlineScript)
    } else {
      // Fire page view on route change if script already injected
      if (window.gtag) {
        window.gtag('config', settings.ga4_id, { page_path: location.pathname })
      }
    }
  }, [settings.ga4_id, location.pathname])

  const defaultTitle = "Executives Magazine | Premium Business & Lifestyle"
  const defaultDescription = settings.seo_description || "Executives Magazine is a premium digital editorial platform for global corporate intelligence, strategic business leadership, and executive lifestyle."
  const defaultKeywords = settings.seo_keywords || "Executives Magazine, business leadership, C-suite, corporate strategy, executive lifestyle, global business leaders, CEO interviews, business analysis"

  const displayTitle = title ? `${title} | Executives Magazine` : defaultTitle
  const displayDescription = description || defaultDescription
  const displayKeywords = keywords || defaultKeywords
  const displayCanonical = canonical || `https://executivesmagazine.com${location.pathname}`

  return (
    <>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={displayKeywords} />
      <link rel="canonical" href={displayCanonical} />
      
      {/* Google Search Console site verification */}
      {settings.gsc_key && (
        <meta name="google-site-verification" content={settings.gsc_key} />
      )}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={displayTitle} />
      <meta property="og:description" content={displayDescription} />
      <meta property="og:url" content={displayCanonical} />
      <meta property="og:site_name" content="Executives Magazine" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={displayTitle} />
      <meta name="twitter:description" content={displayDescription} />
    </>
  )
}
