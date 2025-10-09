import React from 'react';
import { Shield, Truck, Award, Users, ArrowLeft, Sparkles, Heart, Star } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFeaturedProducts } from '../data/products';
import { SITE_CONFIG } from '../data/config';
import ProductCard from '../components/product/ProductCard';

const HomePage = () => {
  const { navigateTo } = useAppContext();
  const featuredProducts = getFeaturedProducts();

  const features = [
    { 
      icon: Shield, 
      title: 'جودة مضمونة', 
      desc: 'منتجات مختبرة ومعتمدة',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    { 
      icon: Truck, 
      title: 'توصيل سريع', 
      desc: 'خلال 24-48 ساعة',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    { 
      icon: Award, 
      title: 'خبرة 5 سنوات', 
      desc: 'في مجال الزيوت الطبيعية',
      gradient: 'from-yellow-500 to-orange-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    { 
      icon: Users, 
      title: '+5000 عميل', 
      desc: 'تقييمات إيجابية',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section - Enhanced */}
      <section className="relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-teal-700">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              animation: 'moveBackground 20s linear infinite'
            }}></div>
          </div>
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-right text-white space-y-6">
              <div className="inline-block">
                <span className="bg-white/20 backdrop-blur-lg text-white px-6 py-2 rounded-full text-sm font-semibold border border-white/30">
                  ✨ رقم 1 في الزيوت الطبيعية
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                الطبيعة في خدمة
                <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent mt-2">
                  جمالك
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl opacity-90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                اكتشفي مجموعتنا المميزة من الزيوت الطبيعية النقية المستخرجة بأحدث التقنيات 
                للعناية بالشعر والبشرة بطريقة آمنة 100%
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                <button 
                  onClick={() => navigateTo('products')}
                  className="group bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span>تصفح المنتجات</span>
                  <ArrowLeft size={20} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <button 
                  onClick={() => navigateTo('offers')}
                  className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-xl flex items-center justify-center gap-2"
                >
                  <Sparkles size={20} />
                  العروض الخاصة
                </button>
              </div>
              
              {/* Trust Badges */}
              <div className="flex flex-wrap items-center gap-6 justify-center lg:justify-start pt-6 text-sm opacity-90">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Shield size={18} />
                  <span>منتجات معتمدة</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Truck size={18} />
                  <span>شحن مجاني +300ج</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur px-4 py-2 rounded-full">
                  <Star size={18} fill="currentColor" />
                  <span>+5000 عميل راضي</span>
                </div>
              </div>
            </div>
            
            {/* Logo Section - Enhanced */}
            <div className="relative">
              <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
                {/* Animated rings */}
                <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
                <div className="absolute inset-4 bg-white/20 rounded-full animate-pulse"></div>
                <div className="absolute inset-8 bg-gradient-to-br from-white/30 to-transparent rounded-full backdrop-blur-sm"></div>
                
                {/* Logo */}
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Kavoral Logo"
                    className="w-48 h-48 md:w-64 md:h-64 object-contain animate-gentle-float drop-shadow-2xl"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-48 h-48 md:w-64 md:h-64 items-center justify-center text-9xl animate-gentle-float drop-shadow-2xl">
                    🌿
                  </div>
                </div>
              </div>
              
              <div className="text-center mt-6">
                <div className="inline-block bg-white/20 backdrop-blur-lg px-6 py-3 rounded-full">
                  <p className="text-white font-bold text-lg">منتجات طبيعية 100%</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16 md:h-24">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-20 bg-white relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-lg">🌟 لماذا نحن؟</span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              لماذا تختارين Kavoral؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نقدم لك الأفضل دائماً مع ضمان الجودة والأصالة
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group relative bg-white border-2 border-gray-100 p-6 md:p-8 rounded-2xl hover:border-transparent hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`${feature.iconBg} w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <feature.icon size={32} className={feature.iconColor} />
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-2 text-center group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-green-600 group-hover:to-teal-600 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-sm md:text-base text-gray-600 text-center leading-relaxed">
                    {feature.desc}
                  </p>
                </div>

                {/* Decorative corner */}
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-20 rounded-bl-full transition-opacity duration-500`}></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products - Enhanced */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30"></div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-lg flex items-center justify-center gap-2">
              <Heart size={20} fill="currentColor" />
              المنتجات الأكثر مبيعاً
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              منتجاتنا المميزة
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              مجموعة مختارة من أفضل الزيوت الطبيعية بأسعار خاصة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => navigateTo('products')}
              className="group bg-gradient-to-r from-green-600 to-teal-600 text-white px-10 py-4 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-3"
            >
              <span>عرض جميع المنتجات</span>
              <ArrowLeft size={22} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </section>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes moveBackground {
          from {
            background-position: 0 0;
          }
          to {
            background-position: 30px 30px;
          }
        }
        
        @keyframes gentle-float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }
        
        .animate-gentle-float {
          animation: gentle-float 6s ease-in-out infinite;
        }

        .delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </div>
  );
};

export default HomePage;