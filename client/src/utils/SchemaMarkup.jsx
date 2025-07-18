// src/utils/SchemaMarkup.jsx
import React from 'react' // Required for JSX
export const generateSchemaMarkup = ({ 
  type = "WebSite", 
  title, 
  description, 
  url, 
  image 
}) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    "name": title,
    "description": description,
    "url": url,
    "image": image,
    "publisher": {
      "@type": "Organization",
      "name": "IlmZone",
      "logo": {
        "@type": "ImageObject",
        "url": "/assets/images/ilmzone-logo).jpg"
      }
    }
  };

  if (type === "Course") {
    return {
      ...baseSchema,
      "educationalLevel": "Secondary",
      "educationalRegion": "Pakistan",
      "hasCourseInstance": {
        "@type": "CourseInstance",
        "courseMode": "online"
      }
    };
  }

  return baseSchema;
};