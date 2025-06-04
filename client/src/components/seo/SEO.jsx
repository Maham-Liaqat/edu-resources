// src/components/seo/SEO.jsx
import React from 'react';
import { Helmet } from 'react-helmet-async';

export const SEO = ({
  title = 'IlmZone - Free Study Resources',
  description = 'Free textbooks, notes, and past papers for 9th, 10th, FSc Part 1, and FSc Part 2 students',
  keywords = 'ilmzone, free study resources, 9th class notes, 10th class past papers, fsc part 1 textbooks, fsc part 2 notes',
  image = '/og-image.jpg',
  schemaType = 'WebPage'
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': schemaType,
          name: title,
          description: description,
          image: image,
          url: window.location.href
        })}
      </script>
    </Helmet>
  );
};