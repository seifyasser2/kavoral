import React, { useState, useEffect, lazy, Suspense } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import BottomNav from "./components/common/BottomNav";
import { Notification, GlobalStyles } from "./components/common";
import { MessageCircle } from "lucide-react";
import ErrorBoundary from "./components/common/ErrorBoundary";
import { Z_INDEX } from "./constants";
import { getWhatsAppLink } from "./data/config";
import PWAInstallPrompt from './components/common/PWAInstallPrompt';
// ❌ احذف هذا السطر:
// import BundleDetailsPage from './pages/BundleDetailsPage';

// ============================================
// LAZY LOAD PAGES - Code Splitting
// ============================================
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const BundleDetailsPage = lazy(() => import('./pages/BundleDetailsPage')); // ✅ احتفظ بهذا فقط
const CartPage = lazy(() => import("./pages/CartPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));
const OrderSuccessPage = lazy(() => import("./pages/OrderSuccessPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
// ============================================
// WHATSAPP BUTTON - Enhanced - ظاهر دائماً
// ============================================
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
      {/* Button with glow effect */}
      <div className="relative w-14 h-14 md:w-16 md:h-16">
        {/* Glow rings */}
        <div className="absolute inset-0 bg-green-500 rounded-full opacity-30 animate-ping"></div>
        <div className="absolute inset-2 bg-green-400 rounded-full opacity-20 animate-pulse"></div>

        {/* Main button - WhatsApp Official Color #25D366 */}
        <div className="relative inset-0 w-14 h-14 md:w-16 md:h-16 rounded-full shadow-2xl hover:shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center overflow-hidden" style={{ backgroundColor: '#25D366' }}>
          {/* WhatsApp Official Icon */}
          <svg viewBox="0 0 24 24" className="w-8 h-8 md:w-9 md:h-9 text-white" fill="currentColor">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>
      </div>

      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-3 bg-gray-900 text-white text-xs font-bold py-2 px-3 rounded-lg shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        تواصل معنا
        <div className="absolute top-full right-3 w-2 h-2 bg-gray-900 transform rotate-45"></div>
      </div>
    </a>
  );
};

// ============================================
// LOADING SCREEN - Enhanced
// ============================================
const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-green-50 via-white to-teal-50 flex items-center justify-center">
      <div className="text-center">
        {/* Animated Logo */}
        <div className="relative w-32 h-32 mx-auto mb-8">
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-20 animate-ping"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-full opacity-30 animate-pulse"></div>
          <div className="relative z-10 text-7xl animate-bounce">🌿</div>
        </div>

        {/* Loading Text */}
        <h2 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent mb-4">
          Kavoral
        </h2>
        <p className="text-gray-600 mb-6">جاري التحميل...</p>

        {/* Loading Bar */}
        <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden mx-auto">
          <div className="h-full bg-gradient-to-r from-green-500 to-teal-500 rounded-full animate-shimmer"></div>
        </div>
      </div>
    </div>
  );
};

// ============================================
// PAGE LOADING FALLBACK
// ============================================
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

// ============================================
// APP CONTENT COMPONENT مع Browser History
// ============================================
const AppContent = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  // ============================================
  // إدارة Browser History للـ Back Button
  // ============================================
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

  // ============================================
  // معالج الأخطاء - التحقق من الاتصال بالإنترنت
  // ============================================
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
      default:
        return <HomePage />;
        case "dashboard":
  return <DashboardPage />;
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col"
      style={{
        direction: "rtl",
        fontFamily:
          'system-ui, -apple-system, "Segoe UI", Roboto, "Cairo", sans-serif',
      }}
    >
      <Header />

      {/* Main content */}
      <main className="flex-1" style={{ paddingTop: "80px" }}>
        <Suspense fallback={<PageLoadingFallback />}>
          <div className="animate-fade-in">{renderPage()}</div>
        </Suspense>
      </main>

      <Footer />

      {/* Bottom Navigation للموبايل */}
      <BottomNav />

      {/* WhatsApp Button - استبدال زر العودة للأعلى */}
      <WhatsAppButton />

      {/* Notifications Container */}
      <div className="fixed top-24 right-4 left-4 md:left-auto md:right-4 z-40 space-y-2 md:max-w-sm">
        {state.notifications.map((notification) => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={(id) =>
              dispatch({ type: "REMOVE_NOTIFICATION", payload: id })
            }
          />
        ))}
      </div>

      {/* Global Styles */}
      <GlobalStyles />

      {/* Enhanced Custom Styles */}
      <style jsx global>{`
        /* Prevent horizontal scroll */
        html,
        body {
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

        /* Enhanced smooth scrolling */
        html {
          scroll-behavior: smooth;
          scroll-padding-top: 80px;
        }

        /* Custom scrollbar - Enhanced */
        ::-webkit-scrollbar {
          width: 12px;
        }

        ::-webkit-scrollbar-track {
          background: linear-gradient(to bottom, #f1f5f9 0%, #e2e8f0 100%);
          border-radius: 10px;
        }

        ::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #22c55e 0%, #14b8a6 100%);
          border-radius: 10px;
          border: 2px solid #f1f5f9;
        }

        ::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #16a34a 0%, #0d9488 100%);
        }

        /* Mobile touch optimization */
        @media (max-width: 768px) {
          button,
          a {
            -webkit-tap-highlight-color: transparent;
          }

          input,
          textarea,
          select {
            font-size: 16px !important;
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

        /* Enhanced shimmer effect */
        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }
          100% {
            background-position: 200% center;
          }
        }

        .animate-shimmer {
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.5),
            transparent
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
        }

        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-3px) scale(1.05); }
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 0.6s ease-in-out infinite;
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
    <ErrorBoundary>
      <AppProvider>
        <AppContent />
      <PWAInstallPrompt />
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;