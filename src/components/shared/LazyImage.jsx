import { useState, useEffect, useRef } from 'react';

/**
 * LazyImage component for optimized image loading
 * Implements lazy loading with a placeholder and handles loading states
 * 
 * @param {Object} props - Component props
 * @param {string} props.src - Image source URL
 * @param {string} props.alt - Alt text for accessibility
 * @param {string} props.className - Optional CSS classes
 * @param {string} props.placeholderSrc - Optional placeholder image URL
 * @param {function} props.onLoad - Optional callback when image loads
 * @param {Object} props.imgProps - Additional image attributes
 * @returns {JSX.Element} - The LazyImage component
 */
const LazyImage = ({ 
  src, 
  alt, 
  className = '', 
  placeholderSrc = '/assets/placeholder.jpg', 
  onLoad,
  ...imgProps 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState(placeholderSrc);
  const imgRef = useRef(null);
  
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Load image when it enters the viewport
        if (entry.isIntersecting) {
          // Create new image to preload
          const img = new Image();
          img.src = src;
          img.onload = () => {
            // Once loaded, update the src and state
            if (imgRef.current) {
              setImageSrc(src);
              setIsLoaded(true);
              if (onLoad) onLoad();
            }
          };
          // Disconnect after loading
          observer.disconnect();
        }
      });
    }, {
      rootMargin: '100px 0px', // Start loading 100px before it enters viewport
      threshold: 0.01
    });
    
    // Start observing the image element
    if (imgRef.current) {
      observer.observe(imgRef.current);
    }
    
    return () => {
      if (observer) {
        observer.disconnect();
      }
    };
  }, [src, onLoad]);

  return (
    <img
      ref={imgRef}
      src={imageSrc}
      alt={alt || "Image"} 
      className={`${className} ${isLoaded ? 'loaded' : 'loading'}`}
      loading="lazy"
      {...imgProps}
    />
  );
};

export default LazyImage; 