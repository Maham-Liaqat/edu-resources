// src/components/seo/Analytics.jsx
import { useEffect } from 'react';

export const Analytics = () => {
  useEffect(() => {
    const gaId = import.meta.env.VITE_GA_ID;
    if (import.meta.env.PROD && gaId) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag('js', new Date());
      gtag('config', gaId, {
        page_path: window.location.pathname,
      });

      // Cleanup script on component unmount
      return () => {
        document.head.removeChild(script);
      };
    }
  }, []);

  return null;
};