import React, { useState, useEffect } from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { Notification, GlobalStyles } from './components/common';
import { ArrowUp } from 'lucide-react';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';

// ============================================
// SCROLL TO TOP BUTTON
// ============================================
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 bg-gradient-to-r from-green-600 to-green-700 text-white p-3 md:p-4 rounded-full shadow-2xl hover:shadow-glow-lg transition-all duration-300 transform hover:scale-110 active:scale-95 group"
          aria-label="العودة لأعلى"
        >
          <ArrowUp size={24} className="group-hover:animate-bounce" />
        </button>
      )}
    </>
  );
};

// ============================================
// APP CONTENT COMPONENT
// ============================================
const AppContent = () => {
  const { state, dispatch } = useAppContext();

  const renderPage = () => {
    switch (state.currentPage) {
      case 'home': return <HomePage />;
      case 'products': return <ProductsPage />;
      case 'offers': return <OffersPage />;
      case 'about': return <AboutPage />;
      case 'contact': return <ContactPage />;
      case 'cart': return <CartPage />;
      case 'wishlist': return <WishlistPage />;
      case 'product-details': return <ProductDetailsPage />;
      default: return <HomePage />;
    }
  };

  return (
    <div 
      className="min-h-screen bg-gray-50 flex flex-col" 
      style={{ 
        direction: 'rtl', 
        fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, "Cairo", sans-serif' 
      }}
    >
      <Header />
      
      {/* Main content with padding to avoid header overlap */}
      <main className="flex-1" style={{ paddingTop: '80px' }}>
        {renderPage()}
      </main>
      
      <Footer />
      
      {/* Scroll to Top Button */}
      <ScrollToTopButton />
      
      {/* Notifications Container - Fixed position below header */}
      <div className="fixed top-24 right-4 left-4 md:left-auto md:right-4 z-40 space-y-2 md:max-w-sm">
        {state.notifications.map(notification => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={(id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })}
          />
        ))}
      </div>

      {/* Global Styles */}
      <GlobalStyles />

      {/* Custom Scrollbar & Animations */}
      <style jsx global>{`
        /* Prevent horizontal scroll */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
          position: relative;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Force header to stay fixed */
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          transform: none !important;
          z-index: 1000 !important;
        }
        
        /* Ensure main content doesn't overlap header */
        main {
          padding-top: 80px;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }
        
        /* Custom scrollbar */
        ::-webkit-scrollbar {
          width: 10px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #16a34a 0%, #14b8a6 100%);
          border-radius: 10px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #15803d 0%, #0f766e 100%);
        }
        
        /* Mobile touch optimization */
        @media (max-width: 768px) {
          button, a {
            -webkit-tap-highlight-color: transparent;
          }
          
          input, textarea, select {
            font-size: 16px; /* Prevent zoom on focus */
          }
        }
        
        /* Image loading optimization */
        img {
          image-rendering: -webkit-optimize-contrast;
        }
        
        /* Prevent text selection on buttons */
        button {
          -webkit-user-select: none;
          user-select: none;
        }
        
        /* Line clamp utilities */
        .line-clamp-1 {
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

// ============================================
// MAIN APP COMPONENT
// ============================================
const App = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;