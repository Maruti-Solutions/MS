import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Loading from './components/shared/Loading';
import ScrollToTop from './components/shared/ScrollToTop';
import Breadcrumb from './components/shared/Breadcrumb';
import SEO from './components/shared/SEO';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Services = lazy(() => import('./pages/Services'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Contact = lazy(() => import('./pages/Contact'));
const Blog = lazy(() => import('./pages/Blog'));
const Team = lazy(() => import('./pages/Team'));
const MissionVision = lazy(() => import('./pages/MissionVision'));
const FutureTech = lazy(() => import('./pages/FutureTech'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const Admin = lazy(() => import('./pages/Admin'));
const TestPage = lazy(() => import('./pages/TestPage'));
const ContactNew = lazy(() => import('./pages/ContactNew'));

// Default critical assets to preload
const criticalFonts = [
  { href: '/assets/fonts/inter-var.woff2', type: 'font/woff2' }
];

const criticalImages = [
  '/assets/og-image.jpg',
  '/assets/logo.png'
];

// Default structured data
const defaultStructuredData = {
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

function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        {/* Add SEO component with default values */}
        <SEO 
          preloadFonts={criticalFonts} 
          preloadImages={criticalImages}
          structuredData={defaultStructuredData}
        />
      <div className="relative min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-grow">
          <Suspense fallback={<Loading />}>
            {/* Breadcrumb navigation removed as requested */}
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/contact" element={<ContactNew />} />
              <Route path="/contact-old" element={<Contact />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/team" element={<Team />} />
              <Route path="/mission-vision" element={<MissionVision />} />
              <Route path="/future-tech" element={<FutureTech />} />
              <Route path="/privacy-policy" element={<PrivacyPolicy />} />
              <Route path="/terms-of-service" element={<TermsOfService />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/test" element={<TestPage />} />
            </Routes>
          </Suspense>
        </div>
        <Footer />
      </div>
      </Router>
    </HelmetProvider>
  );
}

export default App;
