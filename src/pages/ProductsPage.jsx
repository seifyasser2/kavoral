import React, { useMemo, useState } from 'react';
import { Package, Leaf, Shield, Truck, TrendingUp, LayoutGrid, Filter } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG } from '../data/config';
import { PRODUCTS_DATA } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { Badge, LoadingSpinner, EmptyState } from '../components/common';

const ProductsPage = () => {
  const { state } = useAppContext();
  
  // حالة الفلتر النشط
  const [activeTab, setActiveTab] = useState('all');

  const features = [
    { icon: Leaf, title: "طبيعي 100%" },
    { icon: Shield, title: "جودة مضمونة" },
    { icon: Truck, title: "توصيل سريع" },
  ];

  const stats = [
    { number: "17+", label: "منتج طبيعي", icon: Package },
    { number: "100%", label: "طبيعي ونقي", icon: Leaf },
    { number: "5000+", label: "عميل راضي", icon: TrendingUp },
  ];

  // منطق الفلترة المطور لضمان عدم حدوث أخطاء
  const filteredProducts = useMemo(() => {
    const searchTerm = state.searchTerm.toLowerCase().trim();
    
    return PRODUCTS_DATA.filter(product => {
      // 1. فلتر البحث (الاسم، الوصف، التاجات)
      const matchesSearch = !searchTerm || 
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)));

      // 2. تصنيف المنتجات برمجياً للفلترة
      // الزيوت: المنتجات التي تحمل فئة oils أو يبدأ اسمها بكلمة زيت
      const isOil = product.categories.includes('oils') || product.name.startsWith('زيت');
      
      // الخلطات: المنتجات التي تحمل فئة blends أو خلطات أو المختوم
      const isBlend = product.categories.includes('blends') || 
                      product.categories.includes('nutrition') || 
                      product.name.includes('خلطة') || 
                      product.name.includes('المختوم');

      let matchesTab = true;
      if (activeTab === 'oils') {
        matchesTab = isOil;
      } else if (activeTab === 'blends') {
        matchesTab = isBlend;
      } else if (activeTab === 'others') {
        matchesTab = !isOil && !isBlend;
      }

      return matchesSearch && matchesTab;
    });
  }, [state.searchTerm, activeTab]);

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
            اكتشف مجموعتنا الكاملة من المنتجات الطبيعية الأصلية المختارة بعناية
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
        
        {/* نظام الفلترة (Tabs) */}
        <div className="flex flex-wrap justify-center gap-2 mb-10 sticky top-20 z-10 bg-white/80 backdrop-blur-md py-4">
          {[
            { id: 'all', label: 'الكل', icon: LayoutGrid },
            { id: 'oils', label: 'زيوت طبيعية', icon: Leaf },
            { id: 'blends', label: 'خلطات طبيعية', icon: TrendingUp },
            { id: 'others', label: 'منتجات أخرى', icon: Filter }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-sm border ${
                activeTab === tab.id 
                ? 'bg-green-600 text-white border-green-600 shadow-green-200 scale-105' 
                : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <tab.icon size={18} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* معلومات البحث */}
        {state.searchTerm && (
          <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl p-4 animate-fade-in">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  نتائج البحث عن: <span className="font-bold text-blue-600">"{state.searchTerm}"</span>
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  تم العثور على {filteredProducts.length} منتج
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

        {/* شبكة المنتجات */}
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
              <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 40}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        ) : (
          <EmptyState 
            icon={Package}
            title="لم نجد ما تبحث عنه"
            description={state.searchTerm ? `لا توجد نتائج لـ "${state.searchTerm}" في هذا القسم` : "هذا القسم فارغ حالياً"}
            actionLabel="عرض جميع المنتجات"
            onAction={() => {
              setActiveTab('all');
            }}
          />
        )}

        {/* مميزات المتجر */}
        <div className="mt-12 mb-8 pt-8 border-t border-gray-100">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gray-50 rounded-2xl p-4 text-center border border-gray-100 transition-all hover:bg-white hover:shadow-md"
              >
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <feature.icon size={20} className="text-green-600" />
                </div>
                <p className="text-sm font-bold text-gray-800">{feature.title}</p>
              </div>
            ))}
          </div>
        </div>

        {/* بانر الثقة */}
        <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center shadow-sm">
          <div className="flex items-center justify-center gap-2 text-green-800 font-bold">
            <Shield size={20} />
            <span>منتجات طبيعية 100% معصورة على البارد - شحن مجاني فوق {SITE_CONFIG.shipping.freeShippingThreshold} ج</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;