import React, { useState, useEffect, lazy, Suspense } from "react";
import { AppProvider, useAppContext } from "./context/AppContext";
import Header from "./components/common/Header";
import Footer from "./components/common/Footer";
import { Notification, GlobalStyles } from "./components/common";
import { ArrowUp } from "lucide-react";
import ErrorBoundary from "./components/common/ErrorBoundary";

// ============================================
// LAZY LOAD PAGES - Code Splitting
// ============================================
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductsPage = lazy(() => import("./pages/ProductsPage"));
const ProductDetailsPage = lazy(() => import("./pages/ProductDetailsPage"));
const CartPage = lazy(() => import("./pages/CartPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const WishlistPage = lazy(() => import("./pages/WishlistPage"));

// ============================================
// SCROLL TO TOP BUTTON - Enhanced
// ============================================
const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrolled = window.pageYOffset;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = height > 0 ? (scrolled / height) * 100 : 0;

      setScrollProgress(progress);
      setIsVisible(scrolled > 300);
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 z-50 group"
          aria-label="العودة لأعلى"
        >
          {/* Progress Ring */}
          <svg className="absolute inset-0 w-14 h-14 transform -rotate-90">
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-gray-200"
            />
            <circle
              cx="28"
              cy="28"
              r="24"
              stroke="currentColor"
              strokeWidth="3"
              fill="none"
              className="text-green-500 transition-all duration-300"
              style={{
                strokeDasharray: `${2 * Math.PI * 24}`,
                strokeDashoffset: `${
                  2 * Math.PI * 24 * (1 - scrollProgress / 100)
                }`,
              }}
            />
          </svg>

          {/* Button */}
          <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-full shadow-2xl hover:shadow-glow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 flex items-center justify-center">
            <ArrowUp size={24} className="group-hover:animate-bounce" />
          </div>
        </button>
      )}
    </>
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
// APP CONTENT COMPONENT
// ============================================
const AppContent = () => {
  const { state, dispatch } = useAppContext();
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial loading
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
      default:
        return <HomePage />;
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
      <a href="#main-content" className="skip-to-main">تخطي إلى المحتوى</a>
      <Header />

      {/* Main content */}
      <main id="main-content" className="flex-1" style={{ paddingTop: "80px" }}>
        <Suspense fallback={<PageLoadingFallback />}>
          <div className="animate-fade-in">{renderPage()}</div>
        </Suspense>
      </main>

      <Footer />

      {/* Scroll to Top Button */}
      <ScrollToTopButton />

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
      <style>{`
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

        /* Page transition */
        .page-transition { animation: fadeInUp 0.5s ease-out; }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }

        /* Gradient animations */
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 3s ease infinite;
        }

        /* Glow effect */
        .glow-effect {
          position: relative;
        }

        .glow-effect::before { content: ""; position: absolute; inset: -2px; border-radius: inherit; background: linear-gradient(45deg, #22c55e, #14b8a6, #06b6d4); opacity: 0; filter: blur(10px); transition: opacity 0.3s ease; }

        .glow-effect:hover::before {
          opacity: 0.7;
        }

        /* Card hover effects */
        .card-3d {
          transform-style: preserve-3d;
          transition: transform 0.5s ease;
        }

        .card-3d:hover { transform: perspective(1000px) rotateY(5deg) rotateX(5deg); }

        /* Floating elements */
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }

        .float {
          animation: float 3s ease-in-out infinite;
        }

        /* Pulse animation for badges */
        @keyframes pulse-scale {
          0%,
          100% {
            transform: scale(1);
          }
          50% {
            transform: scale(1.05);
          }
        }

        .pulse-scale {
          animation: pulse-scale 2s ease-in-out infinite;
        }

        /* Text shimmer effect */
        .text-shimmer {
          background: linear-gradient(
            90deg,
            #22c55e 0%,
            #14b8a6 25%,
            #06b6d4 50%,
            #14b8a6 75%,
            #22c55e 100%
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 3s linear infinite;
        }

        /* Loading skeleton */
        .skeleton {
          background: linear-gradient(
            90deg,
            #f0f0f0 25%,
            #e0e0e0 50%,
            #f0f0f0 75%
          );
          background-size: 200% 100%;
          animation: shimmer 2s infinite;
          border-radius: 8px;
        }

        /* Focus visible enhancements */
        *:focus-visible {
          outline: 3px solid #22c55e;
          outline-offset: 2px;
          border-radius: 8px;
        }

        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
            scroll-behavior: auto !important;
          }
        }

        /* Print styles */
        @media print {
          header,
          footer,
          button,
          .no-print {
            display: none !important;
          }

          * {
            background: white !important;
            color: black !important;
          }
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
      </AppProvider>
    </ErrorBoundary>
  );
};

export default App;
