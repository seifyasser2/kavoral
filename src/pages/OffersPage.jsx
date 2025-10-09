import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle, ShoppingCart, Plus, Minus, Package } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BUNDLE_OFFERS } from '../data/bundles';
import { getProductById } from '../data/products';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';
import { Badge, SectionHeader } from '../components/common';

const OffersPage = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [quantities, setQuantities] = useState({});

  const updateQuantity = (bundleId, change) => {
    setQuantities(prev => ({
      ...prev,
      [bundleId]: Math.max(0, (prev[bundleId] || 0) + change)
    }));
  };

  const addBundleToCart = (bundle) => {
    const quantity = quantities[bundle.id] || 0;

    if (quantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return;
    }

    const bundleItem = {
      id: bundle.id,
      name: bundle.name,
      price: bundle.bundlePrice,
      originalPrice: bundle.originalPrice,
      image: bundle.image,
      imageAlt: bundle.image,
      size: `باقة ${bundle.products.length} منتجات`,
      category: bundle.category,
      tags: ['عرض خاص', 'باقة'],
      inStock: true,
      isBundle: true,
      bundleProducts: bundle.products,
      quantity: quantity,
      description: bundle.description,
      benefits: bundle.benefits
    };

    dispatch({
      type: 'ADD_TO_CART',
      payload: bundleItem
    });
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `تم إضافة ${quantity} من ${bundle.name} للسلة`, type: 'success' }
    });

    setQuantities(prev => ({ ...prev, [bundle.id]: 0 }));
  };

  const BundleCard = ({ bundle, index }) => {
    const bundleProducts = bundle.products
      .map(id => getProductById(id))
      .filter(product => product !== undefined);
    
    if (bundleProducts.length === 0) return null;
    
    const quantity = quantities[bundle.id] || 0;

    const gradients = [
      'from-orange-500 to-red-500',
      'from-purple-500 to-pink-500',
      'from-blue-500 to-cyan-500',
      'from-green-500 to-emerald-500'
    ];

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group">
        <div className={`bg-gradient-to-r ${gradients[index % 4]} p-4 md:p-6 text-white relative overflow-hidden`}>
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-3">
              <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-xl flex items-center justify-center overflow-hidden shadow-lg">
                {bundle.image && bundle.image.startsWith('http') ? (
                  <img 
                    src={bundle.image} 
                    alt={bundle.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`text-5xl md:text-6xl ${bundle.image && bundle.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
                >
                  {bundle.imageAlt || bundle.image || '🎁'}
                </div>
              </div>
              <Badge variant="warning" className="bg-yellow-400 text-yellow-900 flex items-center gap-1 animate-pulse">
                <Sparkles size={14} />
                وفر {bundle.totalDiscountPercentage}%
              </Badge>
            </div>
            <h3 className="text-xl md:text-2xl font-bold mb-2">{bundle.name}</h3>
            <p className="text-sm md:text-base opacity-90">{bundle.description}</p>
          </div>
        </div>

        <div className="p-4 md:p-6">
          {/* Products in bundle */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Package size={18} />
              المنتجات المشمولة ({bundleProducts.length}):
            </h4>
            <div className="space-y-3">
              {bundleProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors shadow-sm">
                  <div className="w-14 h-14 md:w-16 md:h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
                    {product.image && product.image.startsWith('http') ? (
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div className={`text-2xl md:text-3xl ${product.image && product.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                      {product.imageAlt || product.image || '🌿'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm md:text-base font-medium text-gray-800 block truncate">{product.name}</span>
                    <span className="text-xs md:text-sm text-gray-500">{product.size}</span>
                  </div>
                  <span className="text-sm md:text-base font-bold text-green-600 flex-shrink-0">{product.price}ج</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles size={18} />
              مميزات الباقة:
            </h4>
            <ul className="space-y-2">
              {bundle.benefits.map((benefit, idx) => (
                <li key={idx} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 p-4 rounded-lg mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-3 md:gap-4 mb-2 flex-wrap">
                <span className="text-xl md:text-2xl line-through text-gray-400">{bundle.originalPrice} جنيه</span>
                <span className="text-2xl md:text-3xl font-bold text-green-600">{bundle.bundlePrice} جنيه</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-red-600 font-bold">
                <Sparkles size={16} />
                <span className="text-sm md:text-base">وفر {bundle.savings} جنيه!</span>
              </div>
            </div>
          </div>

          {/* Quantity selector */}
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">الكمية:</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => updateQuantity(bundle.id, -1)}
                  disabled={quantity <= 0}
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                >
                  <Minus size={16} className={quantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
                </button>
                
                <span className="text-2xl font-bold w-12 text-center">{quantity}</span>
                
                <button
                  onClick={() => updateQuantity(bundle.id, 1)}
                  className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 flex items-center justify-center transition-all"
                >
                  <Plus size={16} className="text-gray-600" />
                </button>
              </div>
            </div>

            {quantity > 0 && (
              <div className="text-center pt-2 border-t border-gray-200">
                <span className="text-green-600 font-bold">
                  المجموع: {quantity * bundle.bundlePrice} جنيه
                </span>
              </div>
            )}
          </div>

          {/* Add to cart button */}
          <button
            onClick={() => addBundleToCart(bundle)}
            disabled={quantity <= 0}
            className={`w-full py-3 md:py-4 px-6 rounded-lg font-bold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
              quantity <= 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : `bg-gradient-to-r ${gradients[index % 4]} text-white hover:shadow-xl transform hover:scale-105`
            }`}
          >
            <ShoppingCart size={20} />
            {quantity <= 0 ? 'حدد الكمية أولاً' : 'أضف الباقة للسلة'}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            ستحصل على جميع المنتجات في الباقة
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Gift size={48} className="text-green-600" />
            <Sparkles size={32} className="text-yellow-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-green-600 mb-4">العروض المميزة 🎁</h1>
          <p className="text-base md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            باقات حصرية من أجود الزيوت الطبيعية المعصورة على البارد بأسعار مخفضة خاصة
          </p>
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            <Badge variant="success" className="text-sm px-4 py-2">توفير حتى 40 جنيه</Badge>
            <Badge variant="info" className="text-sm px-4 py-2">عروض محدودة المدة</Badge>
          </div>
        </div>

        {/* Offers Grid - Mobile: 1 column, Desktop: 2 columns */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
          {BUNDLE_OFFERS.map((bundle, index) => (
            <BundleCard key={bundle.id} bundle={bundle} index={index} />
          ))}
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-6 md:p-8 rounded-xl text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">لا تفوت العروض المحدودة!</h2>
          <p className="text-base md:text-xl mb-6 opacity-90">
            احصل على أفضل الزيوت الطبيعية المعصورة على البارد بأسعار مخفضة لفترة محدودة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo('products')}
              className="bg-white text-green-600 px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg"
            >
              تصفح جميع المنتجات
            </button>
            <a
              href={getWhatsAppLink('مرحباً، أريد الاستفسار عن العروض المتاحة')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors inline-block"
            >
              تواصل معنا للمزيد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;