import React, { useState } from 'react';
import { Gift, Filter, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BUNDLE_OFFERS } from '../data/bundles';
import BundleCard from '../components/product/BundleCard';

const OffersPage = () => {
  const { navigateTo } = useAppContext();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'جميع العروض', icon: '🎁' },
    { id: 'hair-care', label: 'العناية بالشعر', icon: '💇‍♀️' },
    { id: 'anti-aging', label: 'مكافحة الشيخوخة', icon: '✨' },
    { id: 'hair-growth', label: 'تحفيز النمو', icon: '🌱' },
  ];

  const filteredBundles = selectedCategory === 'all' 
    ? BUNDLE_OFFERS 
    : BUNDLE_OFFERS.filter(b => b.category === selectedCategory);

  const bestDiscount = Math.max(...BUNDLE_OFFERS.map(b => b.totalDiscountPercentage));

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift size={40} />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            العروض المميزة 🎁
          </h1>
          
          <p className="text-lg opacity-90 max-w-2xl mx-auto mb-6">
            باقات حصرية من أجود الزيوت الطبيعية بأسعار مخفضة
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-3">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              🔥 خصم يصل إلى {bestDiscount}%
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
              ✅ {BUNDLE_OFFERS.length} عرض متاح
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Filter size={20} className="text-gray-600" />
            <h2 className="text-lg font-bold text-gray-800">تصفية حسب الفئة</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-3 rounded-xl transition-all text-center border-2 ${
                  selectedCategory === category.id
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-white text-gray-700 border-gray-200 hover:border-green-500'
                }`}
              >
                <div className="text-2xl mb-1">{category.icon}</div>
                <p className="text-sm font-bold">{category.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Bundles Grid */}
        {filteredBundles.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {filteredBundles.map((bundle, index) => (
              <BundleCard key={bundle.id} bundle={bundle} index={index} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-50 rounded-xl">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold text-gray-600 mb-3">
              لا توجد عروض في هذه الفئة
            </h3>
            <button
              onClick={() => setSelectedCategory('all')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl hover:bg-green-600 transition-all font-bold"
            >
              عرض جميع العروض
            </button>
          </div>
        )}

        {/* CTA */}
        <div className="bg-green-500 text-white p-8 rounded-xl text-center">
          <h2 className="text-3xl font-bold mb-4">
            لا تفوت العروض المحدودة! ⏰
          </h2>
          <p className="text-lg mb-6 opacity-90">
            احصل على أفضل الزيوت الطبيعية بأسعار مخفضة
          </p>
          <button
            onClick={() => navigateTo('products')}
            className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all inline-flex items-center gap-2"
          >
            <ShoppingCart size={20} />
            تصفح جميع المنتجات
          </button>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;