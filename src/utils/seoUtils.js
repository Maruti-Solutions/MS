/**
 * Utility functions for generating structured data for SEO
 */

/**
 * Creates structured data for a service page
 * @param {string} name - Service name
 * @param {string} description - Service description
 * @param {string} url - Service page URL
 * @param {string} image - Service image URL
 * @returns {Object} Structured data object
 */
export function createServiceStructuredData(name, description, url, image) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": name,
    "description": description,
    "provider": {
      "@type": "Organization",
      "name": "Maruti Solutions",
      "url": "https://marutisolutions.com"
    },
    "url": url,
    "image": image
  };
}

/**
 * Creates structured data for a blog post
 * @param {string} title - Blog post title
 * @param {string} description - Blog post description
 * @param {string} url - Blog post URL
 * @param {string} image - Blog post image URL
 * @param {string} datePublished - Publication date in ISO format
 * @param {string} dateModified - Last modified date in ISO format
 * @param {string} authorName - Author name
 * @returns {Object} Structured data object
 */
export function createBlogPostStructuredData(title, description, url, image, datePublished, dateModified, authorName) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "image": image,
    "datePublished": datePublished,
    "dateModified": dateModified || datePublished,
    "author": {
      "@type": "Person",
      "name": authorName
    },
    "publisher": {
      "@type": "Organization",
      "name": "Maruti Solutions",
      "logo": {
        "@type": "ImageObject",
        "url": "https://marutisolutions.com/assets/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    }
  };
}

/**
 * Creates structured data for FAQ page or section
 * @param {Array} faqs - Array of FAQ objects with question and answer properties
 * @returns {Object} Structured data object
 */
export function createFAQStructuredData(faqs) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

/**
 * Creates breadcrumb structured data
 * @param {Array} items - Array of breadcrumb items with name and url properties
 * @returns {Object} Structured data object
 */
export function createBreadcrumbStructuredData(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };
}

/**
 * Creates organization structured data
 * @returns {Object} Structured data object 
 */
export function createOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Maruti Solutions",
    "url": "https://marutisolutions.com",
    "logo": "https://marutisolutions.com/assets/logo.png",
    "description": "AI solutions, custom software development, and digital transformation services for businesses across India",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "India"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-XXXXXXXXXX",
      "contactType": "customer service"
    },
    "sameAs": [
      "https://www.facebook.com/marutisolutions",
      "https://www.linkedin.com/company/maruti-solutions",
      "https://twitter.com/MarutiSolutions"
    ]
  };
} 