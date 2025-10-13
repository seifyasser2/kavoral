import React from 'react';
import { Shield, Truck, Award, Users, ArrowLeft, Sparkles, Heart, Star, Zap, Gift, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getFeaturedProducts } from '../data/products';
import { SITE_CONFIG } from '../data/config';
import { getFeaturedBundles } from '../data/bundles';
import ProductCard from '../components/product/ProductCard';
import { Badge } from '../components/common';

const HomePage = () => {
  const { navigateTo, dispatch } = useAppContext();
  const featuredProducts = getFeaturedProducts();
  const featuredOffers = getFeaturedBundles();

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

  const OfferCard = ({ offer, index }) => {
    const gradients = [
      { from: 'from-orange-500', to: 'to-red-500' },
      { from: 'from-purple-500', to: 'to-pink-500' },
      { from: 'from-blue-500', to: 'to-cyan-500' },
      { from: 'from-green-500', to: 'to-emerald-500' }
    ];

    const gradient = gradients[index % 4];

    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-transparent transform hover:-translate-y-2 h-full">
        {/* Top Bar */}
        <div className={`h-2 bg-gradient-to-r ${gradient.from} ${gradient.to}`}></div>

        {/* Header */}
        <div className={`bg-gradient-to-br ${gradient.from} ${gradient.to} p-6 text-white relative overflow-hidden`}>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center overflow-hidden">
                {offer.image && offer.image.startsWith('http') ? (
                  <img 
                    src={offer.image} 
                    alt={offer.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`text-4xl ${offer.image && offer.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                  {offer.imageAlt || offer.image || '🎁'}
                </div>
              </div>
              
              <div className="flex flex-col gap-2">
                <Badge variant="danger" className="bg-yellow-400 text-yellow-900 flex items-center gap-1 animate-pulse shadow-lg">
                  <Zap size={14} />
                  {offer.totalDiscountPercentage}%
                </Badge>
                {offer.featured && (
                  <Badge variant="success" className="bg-white text-green-600 flex items-center gap-1 shadow-lg">
                    <TrendingUp size={14} />
                    الأكثر
                  </Badge>
                )}
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-2">{offer.name}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{offer.description}</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Products Count */}
          <div className="mb-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-xs font-semibold text-blue-700">
              📦 {offer.products.length} منتجات في الباقة
            </p>
          </div>

          {/* Benefits */}
          <div className="mb-4">
            <h4 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-1">
              <Sparkles size={16} className="text-green-600" />
              الفوائد:
            </h4>
            <ul className="space-y-1">
              {offer.benefits.slice(0, 2).map((benefit, idx) => (
                <li key={idx} className="text-xs text-gray-600 flex items-start gap-2">
                  <span className="text-green-600 mt-0.5">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-xl p-4 mb-4 text-white">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm line-through opacity-60">{offer.originalPrice} ج</span>
              <Zap size={20} className="animate-pulse" />
            </div>
            <div className="text-2xl font-bold mb-2">{offer.bundlePrice} جنيه</div>
            <div className="text-xs opacity-90">
              وفّر <span className="font-bold">{offer.savings}</span> جنيه!
            </div>
          </div>

          {/* View Button */}
          <button
            onClick={() => navigateTo('offers')}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <Gift size={18} />
            عرض العروض
          </button>
        </div>
      </div>
    );
  };

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
                  <span>شحن مجاني +500ج</span>
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

      {/* Special Offers Section - NEW */}
      {featuredOffers.length > 0 && (
        <section className="py-20 bg-gradient-to-b from-orange-50 via-red-50 to-white relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-orange-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <div className="inline-flex items-center gap-3 mb-4">
                <Zap size={32} className="text-red-600 animate-pulse" />
                <Sparkles size={28} className="text-yellow-500 animate-bounce" />
                <Gift size={32} className="text-orange-600 animate-pulse" />
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold mb-4">
                <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
                  العروض المميزة 🎁
                </span>
              </h2>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                باقات حصرية بأسعار مخفضة تصل حتى {featuredOffers[0]?.totalDiscountPercentage}% خصم!
              </p>
            </div>

            {/* Offers Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {featuredOffers.map((offer, index) => (
                <OfferCard key={offer.id} offer={offer} index={index} />
              ))}
            </div>

            {/* CTA Button */}
            <div className="text-center">
              <button
                onClick={() => navigateTo('offers')}
                className="group bg-gradient-to-r from-orange-600 to-red-600 text-white px-10 py-4 rounded-xl hover:from-orange-700 hover:to-red-700 transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-3"
              >
                <span>عرض جميع العروض</span>
                <ArrowLeft size={22} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </section>
      )}

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