import React from 'react';
import { Shield, Truck, Award, Users } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS_DATA } from '../data/products';
import ProductCard from '../components/product/ProductCard';

const HomePage = () => {
  const { dispatch } = useAppContext();
  const featuredProducts = PRODUCTS_DATA.filter(product => product.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                الطبيعة في خدمة
                <span className="block text-yellow-300">جمالك</span>
              </h1>
              <p className="text-xl mb-8 leading-relaxed opacity-90">
                اكتشفي مجموعتنا المميزة من الزيوت الطبيعية النقية المستخرجة بأحدث التقنيات 
                للعناية بالشعر والبشرة بطريقة طبيعية وآمنة 100%
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
                  className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
                >
                  تصفح المنتجات
                </button>
                <button 
                  onClick={() => dispatch({ type: 'SET_PAGE', payload: 'offers' })}
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors"
                >
                  العروض الخاصة
                </button>
              </div>
              
              {/* Trust indicators */}
              <div className="flex items-center gap-6 mt-8 text-sm opacity-80">
                <div className="flex items-center gap-2">
                  <Shield size={20} />
                  <span>منتجات معتمدة</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={20} />
                  <span>توصيل مجاني</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award size={20} />
                  <span>+5000 عميل راضي</span>
                </div>
              </div>
            </div>
            
            <div className="text-center relative">
              {/* Logo with Animation */}
              <div className="relative w-64 h-64 mx-auto">
                <div className="absolute inset-0 bg-green-500 rounded-full opacity-20 animate-ping"></div>
                <div className="absolute inset-0 bg-white rounded-full opacity-10 animate-pulse"></div>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img 
                    src="/logo.png" 
                    alt="Kavoral Logo"
                    className="w-48 h-48 object-contain animate-bounce-slow"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="hidden w-48 h-48 items-center justify-center text-9xl animate-bounce-slow">
                    🌿
                  </div>
                </div>
              </div>
              <p className="text-lg font-medium mt-4">منتجات طبيعية 100%</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            لماذا تختارين Kavoral؟
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: Shield, title: 'جودة مضمونة', desc: 'منتجات مختبرة ومعتمدة من هيئات دولية' },
              { icon: Truck, title: 'توصيل سريع', desc: 'خلال 24-48 ساعة للقاهرة والجيزة' },
              { icon: Award, title: 'خبرة 5 سنوات', desc: 'في مجال الزيوت الطبيعية والعناية' },
              { icon: Users, title: '+5000 عميل راضي', desc: 'تقييمات إيجابية وثقة عالية' }
            ].map((feature, index) => (
              <div key={index} className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow">
                <feature.icon size={48} className="mx-auto text-green-600 mb-4" />
                <h3 className="text-lg font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              منتجاتنا المميزة
            </h2>
            <p className="text-lg text-gray-600">
              مجموعة مختارة من أفضل الزيوت الطبيعية
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              عرض جميع المنتجات
            </button>
          </div>
        </div>
      </section>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default HomePage;