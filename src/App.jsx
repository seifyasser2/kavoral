import React, { useState, useEffect, lazy, Suspense } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import BottomNav from "./components/common/BottomNav";
import { Notification, GlobalStyles } from "./components/common";
// import { MessageCircle } from "lucide-react";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Z_INDEX } from "./constants";
import { getWhatsAppLink } from "./data/config";
import PWAInstallPrompt from './components/common/PWAInstallPrompt';

// LAZY LOAD PAGES
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const BundleDetailsPage = lazy(() => import('./pages/BundleDetailsPage'));
const CartPage = lazy(() => import("./pages/CartPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));

// WHATSAPP BUTTON
const WhatsAppButton = () => {
  return (
    <a
      href={getWhatsAppLink("مرحباً، أريد الاستفسار")}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-24 md:bottom-6 right-4 z-40 group transition-all duration-300 active:scale-95"
      aria-label="تواصل عبر واتساب"
      title="تواصل معنا عبر واتساب"
    >
      <div className="relative w-14 h-14 md:w-16 md:h-16">
        <div className="absolute inset-0 bg-green-500 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute inset-2 bg-green-400 rounded-full opacity-20 animate-pulse"></div>

        <div className="relative inset-0 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl hover:shadow-xl transition-all transform hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#25D366' }}>
          <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
      </div>

      <div className="absolute bottom-full right-0 mb-3 bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        تواصل معنا
        <div className="absolute top-full right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </a>
  );
};

// LOADING SCREEN
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-green-50 via-white to-teal-50 flex items-center justify-center">
      <div className="text-center">
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="relative z-10 text-7xl animate-bounce">🌿</div>
        </div>

        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Kavoral
        </h2>
        <p className="text-gray-600 mb-6">جاري التحميل...</p>

        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

// PAGE LOADING FALLBACK
const PageLoadingFallback = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-green-100 rounded-full">
          <div className="w-8 h-8 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
        </div>
        <p className="text-gray-600 font-medium">جاري تحميل الصفحة...</p>
      </div>
    </div>
  );
};

// APP CONTENT COMPONENT
const AppContent = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const currentPage = state.currentPage || 'home';
    window.history.replaceState({ page: currentPage }, '', `#${currentPage}`);

    const handlePopState = (event) => {
      if (event.state && event.state.page) {
        dispatch({ type: 'SET_PAGE', payload: event.state.page });
      } else {
        dispatch({ type: 'SET_PAGE', payload: 'home' });
      }
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [dispatch]);

  useEffect(() => {
    const currentPage = state.currentPage;
    window.history.pushState({ page: currentPage }, '', `#${currentPage}`);
  }, [state.currentPage]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleOnline = () => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: {
          message: "تم استعادة الاتصال بالإنترنت ✅",
          type: "success",
        },
      });
    };

    const handleOffline = () => {
      dispatch({
        type: "ADD_NOTIFICATION",
        payload: { message: "لا توجد اتصال بالإنترنت 🔴", type: "error" },
      });
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, [dispatch]);

  const renderPage = () => {
    switch (state.currentPage) {
      case "home":
        return <HomePage />;
      case "products":
        return <ProductsPage />;
      case "offers":
        return <OffersPage />;
      case "about":
        return <AboutPage />;
      case "contact":
        return <ContactPage />;
      case "cart":
        return <CartPage />;
      case "wishlist":
        return <WishlistPage />;
      case "product-details":
        return <ProductDetailsPage />;
      case "bundle-details":
        return <BundleDetailsPage />;
      case "order-success":
        return <OrderSuccessPage />;
      case "dashboard":
        return <DashboardPage />;
      default:
        return <HomePage />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      id="root"
      className="flex flex-col min-h-screen bg-gradient-to-b from-gray-50 to-white"
      style={{
        direction: "rtl",
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, "Cairo", sans-serif',
      }}
    >
      <Header />

      {/* ✅ CRITICAL: Main with proper scroll setup */}
      <main role="main" className="flex-1 w-full overflow-y-auto overflow-x-hidden" style={{ 
        paddingTop: "80px",
        marginTop: "0",
        height: "auto",
        minHeight: "calc(100vh - 80px)"
      }}>
        <Suspense fallback={<PageLoadingFallback />}>
          <div className="animate-fade-in w-full">{renderPage()}</div>
        </Suspense>
      </main>

      <Footer />

      <BottomNav />

      <WhatsAppButton />

      <div className="fixed top-24 right-4 left-4 md:left-auto md:right-4 z-40 space-y-2 md:max-w-sm pointer-events-none">
        {state.notifications.map((notification) => (
          <div key={notification.id} className="pointer-events-auto">
            <Notification
              notification={notification}
              onClose={(id) =>
                dispatch({ type: "REMOVE_NOTIFICATION", payload: id })
              }
            />
          </div>
        ))}
      </div>

      <GlobalStyles />

      {/* ✅ CRITICAL CSS FIX */}
      <style jsx global>{`
        /* ✅ BASE: السماح بالـ scroll على الـ HTML و Body */
        html {
          height: 100%;
          overflow-y: auto;
          scroll-behavior: smooth;
          -webkit-text-size-adjust: 100%;
          text-size-adjust: 100%;
        }

        body {
          height: 100%;
          overflow: visible;
          overflow-x: hidden;
          position: static;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          overscroll-behavior-y: none;
        }

        * {
          box-sizing: border-box;
        }

        /* ✅ HEADER: ثابت بدون تأثير على الـ scroll */
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          width: 100% !important;
          z-index: 1000 !important;
          transform: translateZ(0);
          backface-visibility: hidden;
          will-change: transform;
        }

        /* ✅ MAIN: السماح بالـ scroll بشكل كامل */
        main {
          overflow-y: auto !important;
          overflow-x: hidden !important;
          -webkit-overflow-scrolling: touch;
          scroll-behavior: smooth;
          width: 100%;
        }

        /* ✅ ROOT: Flex container */
        #root {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* ✅ منع Scroll عند فتح Modal فقط */
        body.modal-open {
          overflow: hidden !important;
          position: fixed;
          width: 100vw;
          height: 100vh;
          touch-action: none;
        }

        body.modal-open main {
          overflow: hidden !important;
        }

        /* ✅ Scrollbar styling */
        ::-webkit-scrollbar {
          width: 8px;
        }

        ::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        ::-webkit-scrollbar-thumb {
          background: #22c55e;
          border-radius: 4px;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: #16a34a;
        }

        /* ✅ Touch optimization */
        @media (max-width: 768px) {
          html {
            overflow-y: auto;
          }

          body {
            overflow: visible;
          }

          main {
            padding-bottom: 84px !important;
          }

          input, textarea, select {
            font-size: 16px !important;
          }
        }

        /* ✅ Animations */
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }

        .animate-shimmer {
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.5), transparent);
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        /* ✅ Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

// MAIN APP COMPONENT
const App = () => {
  return (
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
        <PWAInstallPrompt />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
