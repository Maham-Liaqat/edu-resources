import { React, useEffect } from 'react';

export const Analytics = () => {
  useEffect(() => {
    if (import.meta.env.PROD && import.meta.env.VITE_GA_ID) {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtag/js?id=${import.meta.env.VITE_GA_ID}`;
      document.head.appendChild(script);

      window.dataLayer = window.dataLayer || [];
      function gtag(){ dataLayer.push(arguments); }
      gtag('js', new Date());
      gtag('config', import.meta.env.VITE_GA_ID, {
        page_path: window.location.pathname
      });
    }
  }, []);

  return null;
};