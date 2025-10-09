import React from 'react';
import { Package, Sparkles } from 'lucide-react';
import SearchAndFilter from '../components/product/SearchAndFilter';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-teal-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Hero Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-green-500 to-teal-500 p-4 rounded-2xl shadow-xl">
                <Package size={40} className="text-white" />
              </div>
            </div>
            <Sparkles size={32} className="text-yellow-500 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              جميع منتجاتنا
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            اكتشف مجموعتنا الكاملة من الزيوت الطبيعية المعصورة على البارد
            <span className="block text-lg text-green-600 font-semibold mt-2">
              ✨ أعلى جودة • أفضل سعر • شحن مجاني
            </span>
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-6 mt-8">
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-green-100">
              <span className="text-2xl font-bold text-green-600">15+</span>
              <span className="text-gray-600 text-sm mr-2">منتج طبيعي</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-teal-100">
              <span className="text-2xl font-bold text-teal-600">100%</span>
              <span className="text-gray-600 text-sm mr-2">طبيعي ونقي</span>
            </div>
            <div className="bg-white/80 backdrop-blur-sm px-6 py-3 rounded-xl shadow-lg border border-yellow-100">
              <span className="text-2xl font-bold text-yellow-600">5000+</span>
              <span className="text-gray-600 text-sm mr-2">عميل سعيد</span>
            </div>
          </div>
        </div>

        {/* Search and Filter Component */}
        <div className="animate-slide-down">
          <SearchAndFilter />
        </div>

        {/* Trust Banner */}
        <div className="mt-16 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 rounded-2xl p-8 text-white text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px'
            }}></div>
          </div>
          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-3">
              🌿 منتجات طبيعية 100% معصورة على البارد
            </h3>
            <p className="text-lg opacity-90">
              جميع منتجاتنا خالية من المواد الكيميائية والمواد الحافظة
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ProductsPage;