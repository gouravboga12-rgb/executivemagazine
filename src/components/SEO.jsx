import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// Hardcoded verified configuration
const GSC_KEY = 'tXx5gG6MnlCGhmWuaPrJL9MewpqMaJLQ8TuJ95RsloE'
const GA4_ID = '' // Left empty as requested to skip tracking scripts cleanly

const DEFAULT_KEYWORDS = 'Executives Magazine, C-suite insights, corporate leaders, business strategy, global investment summits, founder interviews, tech startup profiles, executive lifestyles'
const DEFAULT_DESCRIPTION = 'Executives Magazine is a premium C-suite corporate publication and strategic business intelligence portal. Read exclusive interviews with global industrial leaders, founder spotlights, and forward-looking economic analyses.'

export default function SEO({ title, description, keywords, canonical }) {
  const location = useLocation()

  // Optional: GA4 tracking activation in case you add a Measurement ID in the future
  useEffect(() => {
    if (!GA4_ID) return

    const scriptId = 'google-analytics-gtag'
    let script = document.getElementById(scriptId)
    
    if (!script) {
      script = document.createElement('script')
      script.id = scriptId
      script.async = true
      script.src = `https://www.googletagmanager.com/gtag/js?id=${GA4_ID}`
      document.head.appendChild(script)

      const inlineScript = document.createElement('script')
      inlineScript.id = 'google-analytics-inline'
      inlineScript.innerHTML = `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${GA4_ID}', { page_path: window.location.pathname });
      `
      document.head.appendChild(inlineScript)
    } else {
      if (window.gtag) {
        window.gtag('config', GA4_ID, { page_path: location.pathname })
      }
    }
  }, [location.pathname])

  const defaultTitle = "Executives Magazine | Premium Business & Lifestyle"
  
  const displayTitle = title ? `${title} | Executives Magazine` : defaultTitle
  const displayDescription = description || DEFAULT_DESCRIPTION
  const displayKeywords = keywords || DEFAULT_KEYWORDS
  const displayCanonical = canonical || `https://executivesmagazine.com${location.pathname}`

  return (
    <>
      <title>{displayTitle}</title>
      <meta name="description" content={displayDescription} />
      <meta name="keywords" content={displayKeywords} />
      <link rel="canonical" href={displayCanonical} />
      
      {/* Google Search Console site verification */}
      {GSC_KEY && (
        <meta name="google-site-verification" content={GSC_KEY} />
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
