import React from 'react';
import { Shield, Truck, Award, Users, ArrowLeft } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFeaturedProducts } from '../data/products';
import { SITE_CONFIG } from '../data/config';
import ProductCard from '../components/product/ProductCard';
import { SectionHeader } from '../components/common';

const HomePage = () => {
  const { navigateTo } = useAppContext();
  const featuredProducts = getFeaturedProducts();

  const features = [
    { 
      icon: Shield, 
      title: 'جودة مضمونة', 
      desc: 'منتجات مختبرة ومعتمدة من هيئات دولية',
      color: 'bg-green-50'
    },
    { 
      icon: Truck, 
      title: 'توصيل سريع', 
      desc: 'خلال 24-48 ساعة للقاهرة والجيزة',
      color: 'bg-blue-50'
    },
    { 
      icon: Award, 
      title: 'خبرة 5 سنوات', 
      desc: 'في مجال الزيوت الطبيعية والعناية',
      color: 'bg-yellow-50'
    },
    { 
      icon: Users, 
      title: '+5000 عميل راضي', 
      desc: 'تقييمات إيجابية وثقة عالية',
      color: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-16 md:py-20 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-right">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 lg:mb-6 leading-tight">
                الطبيعة في خدمة
                <span className="block text-yellow-300">جمالك</span>
              </h1>
              <p className="text-lg md:text-xl mb-6 lg:mb-8 leading-relaxed opacity-90">
                اكتشفي مجموعتنا المميزة من الزيوت الطبيعية النقية المستخرجة بأحدث التقنيات 
                للعناية بالشعر والبشرة بطريقة طبيعية وآمنة 100%
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button 
                  onClick={() => navigateTo('products')}
                  className="bg-white text-green-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  تصفح المنتجات
                  <ArrowLeft size={20} />
                </button>
                <button 
                  onClick={() => navigateTo('offers')}
                  className="border-2 border-white text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-all"
                >
                  العروض الخاصة 🎁
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex flex-wrap items-center gap-4 md:gap-6 mt-6 lg:mt-8 text-xs md:text-sm opacity-80 justify-center lg:justify-start">
                <div className="flex items-center gap-2">
                  <Shield size={18} />
                  <span>منتجات معتمدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={18} />
                  <span>توصيل مجاني +300ج</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={18} />
                  <span>+5000 عميل راضي</span>
                </div>
              </div>
            </div>
            
            {/* Logo Section */}
            <div className="text-center relative">
              <div className="relative w-48 h-48 md:w-64 md:h-64 mx-auto">
                {/* Background circles - responsive */}
                <div className="hidden md:block absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                <div className="hidden md:block absolute inset-0 bg-white rounded-full opacity-10 animate-pulse"></div>
                
                {/* Logo */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Kavoral Logo"
                    className="w-32 h-32 md:w-48 md:h-48 object-contain animate-gentle-float"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div 
                    className="hidden w-32 h-32 md:w-48 md:h-48 items-center justify-center text-7xl md:text-9xl animate-gentle-float"
                  >
                    🌿
                  </div>
                </div>
              </div>
              <p className="text-base md:text-lg font-medium mt-4">منتجات طبيعية 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="لماذا تختارين Kavoral؟"
            subtitle="نقدم لك الأفضل دائماً"
          />
          
          {/* Mobile: 2 columns, Desktop: 4 columns */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`${feature.color} text-center p-4 md:p-6 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
              >
                <div className="bg-white w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-md">
                  <feature.icon size={24} className="text-green-600" />
                </div>
                <h3 className="text-sm md:text-lg font-bold text-gray-800 mb-1 md:mb-2">
                  {feature.title}
                </h3>
                <p className="text-xs md:text-sm text-gray-600 leading-relaxed">
                  {feature.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <SectionHeader 
            title="منتجاتنا المميزة"
            subtitle="مجموعة مختارة من أفضل الزيوت الطبيعية"
          />
          
          {/* ✅ Mobile: 2 columns, Tablet: 3, Desktop: 4 */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => navigateTo('products')}
              className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-lg hover:bg-green-700 transition-all font-bold shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center gap-2"
            >
              عرض جميع المنتجات
              <ArrowLeft size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        .animate-gentle-float {
          animation: gentle-float 4s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;