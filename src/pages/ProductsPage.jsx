import React, { useMemo } from 'react';
import { Package, Leaf, Shield, Truck, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG } from '../data/config';
import { PRODUCTS_DATA } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { Badge, LoadingSpinner, EmptyState } from '../components/common';

const ProductsPage = () => {
  const { state } = useAppContext();

  const features = [
    { icon: Leaf, title: "طبيعي 100%" },
    { icon: Shield, title: "جودة مضمونة" },
    { icon: Truck, title: "توصيل سريع" },
  ];

  const stats = [
    { number: "15+", label: "منتج طبيعي", icon: Package },
    { number: "100%", label: "طبيعي ونقي", icon: Leaf },
    { number: "5000+", label: "عميل راضي", icon: TrendingUp },
  ];

  // Filter products based on search
  const filteredProducts = useMemo(() => {
    const searchTerm = state.searchTerm.toLowerCase().trim();
    
    if (!searchTerm) {
      return PRODUCTS_DATA;
    }

    return PRODUCTS_DATA.filter(product => 
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.tags.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }, [state.searchTerm]);

  const statsData = useMemo(() => ({
    available: filteredProducts.filter(p => p.inStock).length,
    featured: filteredProducts.filter(p => p.featured).length,
    discounted: filteredProducts.filter(p => p.originalPrice > p.price).length
  }), [filteredProducts]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Header */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-xl">
              <Package size={32} className="text-white" />
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            جميع منتجاتنا
          </h1>
          
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            اكتشف مجموعتنا الكاملة من الزيوت الطبيعية المعصورة على البارد
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-xl p-3"
              >
                <stat.icon size={24} className="mx-auto mb-2" />
                <div className="text-xl font-bold">{stat.number}</div>
                <div className="text-sm opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Search Results Info */}
        {state.searchTerm && (
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">
                  نتائج البحث عن: <span className="font-bold text-blue-600">{state.searchTerm}</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {filteredProducts.length} منتج متاح
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="success">✓ متوفر: {statsData.available}</Badge>
                <Badge variant="warning">⭐ مميز: {statsData.featured}</Badge>
                <Badge variant="danger">🔥 خصم: {statsData.discounted}</Badge>
              </div>
            </div>
          </div>
        )}

        {/* Products Grid */}
        {state.isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-center">
              <LoadingSpinner size={48} />
              <p className="text-gray-600 mt-4 font-semibold">جاري تحميل المنتجات...</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-12">
            {filteredProducts.map((product, index) => (
              <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 30}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Package}
            title="لا توجد منتجات مطابقة"
            description={state.searchTerm ? `لم نجد نتائج لـ "${state.searchTerm}"` : "جرب البحث عن منتج آخر"}
            actionLabel="مسح البحث"
            onAction={() => {
              /* سيتم مسح البحث من الهيدر */
            }}
          />
        )}

        {/* Features */}
        <div className="mt-12 mb-8">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <feature.icon size={20} className="text-green-600" />
                </div>
                <p className="text-sm font-semibold text-gray-800">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Banner */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 text-center">
          <p className="text-green-800 font-semibold">
            🌿 منتجات طبيعية 100% معصورة على البارد - شحن مجاني فوق {SITE_CONFIG.shipping.freeShippingThreshold} ج
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;