export const getFullUrl = (url) => {
  if (!url) return '';
  
  let cleanUrl = url;
  
  // If the absolute URL contains our uploads directory, extract the relative path
  const uploadsIdx = url.indexOf('/uploads/');
  if (uploadsIdx !== -1) {
    cleanUrl = url.substring(uploadsIdx); // yields: "/uploads/filename.pdf"
  } else if (url.includes('hostingersite.com') || url.includes('executivesmagazine.com')) {
    // Fallback normalization for other system assets
    try {
      const parsed = new URL(url);
      cleanUrl = parsed.pathname + parsed.search + parsed.hash;
    } catch (e) {
      // ignore parsing failures
    }
  }

  // Get base URL from active environment variable
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const baseUrl = apiUrl.replace('/api.php', '');
  
  // If it's still a completely external absolute URL (e.g. Unsplash), return it as is
  if (cleanUrl.startsWith('http://') || cleanUrl.startsWith('https://')) {
    return cleanUrl.replace(/([^:]\/)\/+/g, "$1");
  }
  
  // Ensure the relative path starts with a slash
  const path = cleanUrl.startsWith('/') ? cleanUrl : `/${cleanUrl}`;
  
  return `${baseUrl}${path}`;
};

