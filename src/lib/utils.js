export const getFullUrl = (url) => {
  if (!url) return '';
  
  // If it's already an absolute URL (starts with http or https), return it
  if (url.startsWith('http://') || url.startsWith('https://')) {
    // Optional: fix double slashes like https://site.com//uploads
    return url.replace(/([^:]\/)\/+/g, "$1");
  }
  
  // Get base URL from environment variable
  const apiUrl = import.meta.env.VITE_API_URL || '';
  const baseUrl = apiUrl.replace('/api.php', '');
  
  // Ensure the relative path starts with a slash if needed, but not double slash
  const path = url.startsWith('/') ? url : `/${url}`;
  
  return `${baseUrl}${path}`;
};
