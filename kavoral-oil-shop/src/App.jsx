import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import { Notification, ErrorMessage } from './components/common';
import FAQPage from './pages/FAQPage';
import PoliciesPage from './pages/PoliciesPage';
import WhatsAppWidget from './components/common/WhatsAppWidget';

// Pages
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';
import OffersPage from './pages/OffersPage';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import WishlistPage from './pages/WishlistPage';

// Simplified pages
// const WishlistPage = () => {
//   const { state, dispatch } = useAppContext();
  
//   if (state.wishlist.length === 0) {
//     return (
//       <div className="min-h-screen bg-gray-50 py-12">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-md mx-auto">
//             <h1 className="text-3xl font-bold text-gray-600 mb-4">قائمة المفضلة فارغة</h1>
//             <p className="text-gray-500 mb-8">ابدأ بإضافة المنتجات التي تحبينها</p>
//             <button
//               onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
//               className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors"
//             >
//               تصفح المنتجات
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 py-12">
//       <div className="container mx-auto px-4">
//         <h1 className="text-4xl font-bold text-gray-800 mb-8">المفضلة</h1>
//         <p>صفحة المفضلة - يمكن إكمال التفاصيل لاحقاً</p>
//       </div>
//     </div>
//   );
// };

// const AboutPage = () => (
//   <div className="min-h-screen bg-gray-50 py-12">
//     <div className="container mx-auto px-4">
//       <div className="text-center mb-16">
//         <h1 className="text-5xl font-bold text-green-600 mb-6">من نحن</h1>
//         <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
//           Kavoral هي علامة تجارية رائدة في مجال الزيوت الطبيعية والعناية بالجمال
//         </p>
//       </div>
      
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">جودة مضمونة</h3>
//           <p className="text-gray-600 leading-relaxed">
//             جميع منتجاتنا مختبرة ومعتمدة من هيئات دولية متخصصة
//           </p>
//         </div>
        
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">توصيل سريع</h3>
//           <p className="text-gray-600 leading-relaxed">
//             نصل إليك في أقل من 48 ساعة داخل القاهرة والجيزة
//           </p>
//         </div>
        
//         <div className="text-center p-8 bg-white rounded-xl shadow-lg">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">خدمة عملاء متميزة</h3>
//           <p className="text-gray-600 leading-relaxed">
//             فريق دعم متخصص لمساعدتك في اختيار المنتج المناسب
//           </p>
//         </div>
//       </div>
//     </div>
//   </div>
// );



// Main App Content Component
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
    case 'faq': return <FAQPage />;           // ✅ جديد
    case 'policies': return <PoliciesPage />; // ✅ جديد
    default: return <HomePage />;
  }
};

  return (
    <div className="min-h-screen bg-gray-50" 
         style={{ 
           direction: 'rtl', 
           fontFamily: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif' 
         }}>
      <Header />
      
      {state.error && (
        <div className="container mx-auto px-4 py-4">
          <ErrorMessage 
            message={state.error} 
            onRetry={() => dispatch({ type: 'CLEAR_ERROR' })} 
          />
        </div>
      )}
      
      <main>
        {renderPage()}
      </main>
      
      <Footer />
      
      {/* Notifications */}
      <div className="fixed bottom-4 right-4 z-50 space-y-2">
        {state.notifications.map(notification => (
          <Notification
            key={notification.id}
            notification={notification}
            onClose={(id) => dispatch({ type: 'REMOVE_NOTIFICATION', payload: id })}
          />
        ))}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
      `}</style>

      {/* Custom Styles - Mobile Optimized */}
      <style jsx global>{`
        /* Prevent horizontal scroll on mobile */
        html, body {
          overflow-x: hidden;
          max-width: 100vw;
        }
        
        * {
          box-sizing: border-box;
        }
        
        /* Smooth animations */
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
        
        /* Smooth scrolling */
        html {
          scroll-behavior: smooth;
        }
        
        /* Custom scrollbar for webkit browsers */
        ::-webkit-scrollbar {
          width: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #f1f1f1;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #16a34a;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #15803d;
        }
        
        /* Mobile touch optimization */
        @media (max-width: 768px) {
          button, a {
            -webkit-tap-highlight-color: transparent;
          }
          
          input, textarea {
            font-size: 16px; /* Prevent zoom on focus */
          }
        }
      `}</style>
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    
    <AppProvider>
      <AppContent />
    </AppProvider>
    
  );
};

export default App;