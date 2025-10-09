import React, { useState } from 'react';
import { Gift, Sparkles, CheckCircle, ShoppingCart, Plus, Minus, Package, Zap, TrendingUp } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BUNDLE_OFFERS } from '../data/bundles';
import { getProductById } from '../data/products';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';
import { Badge } from '../components/common';

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
      imageAlt: bundle.imageAlt,
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
      payload: { message: `✅ تم إضافة ${quantity} من ${bundle.name} للسلة`, type: 'success' }
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
      { from: 'from-orange-500', to: 'to-red-500', glow: 'shadow-orange-500/30' },
      { from: 'from-purple-500', to: 'to-pink-500', glow: 'shadow-purple-500/30' },
      { from: 'from-blue-500', to: 'to-cyan-500', glow: 'shadow-blue-500/30' },
      { from: 'from-green-500', to: 'to-emerald-500', glow: 'shadow-green-500/30' }
    ];

    const gradient = gradients[index % 4];

    return (
      <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-transparent transform hover:-translate-y-2">
        {/* Top Gradient Bar */}
        <div className={`h-2 bg-gradient-to-r ${gradient.from} ${gradient.to} animate-pulse`}></div>

        {/* Header Section */}
        <div className={`bg-gradient-to-br ${gradient.from} ${gradient.to} p-6 text-white relative overflow-hidden`}>
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              {/* Bundle Image */}
              <div className="w-32 h-32 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center overflow-hidden shadow-xl border-2 border-white/30">
                {bundle.image && bundle.image.startsWith('http') ? (
                  <img 
                    src={bundle.image} 
                    alt={bundle.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div 
                  className={`text-6xl ${bundle.image && bundle.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
                >
                  {bundle.imageAlt || bundle.image || '🎁'}
                </div>
              </div>
              
              {/* Discount Badge */}
              <div className="flex flex-col gap-2">
                <Badge variant="warning" className="bg-yellow-400 text-yellow-900 flex items-center gap-1 animate-bounce shadow-lg">
                  <Sparkles size={14} />
                  خصم {bundle.totalDiscountPercentage}%
                </Badge>
                {bundle.featured && (
                  <Badge variant="success" className="bg-white text-green-600 flex items-center gap-1 shadow-lg">
                    <TrendingUp size={14} />
                    الأكثر طلباً
                  </Badge>
                )}
              </div>
            </div>
            
            <h3 className="text-2xl font-bold mb-2">{bundle.name}</h3>
            <p className="text-sm opacity-90 leading-relaxed">{bundle.description}</p>
          </div>
        </div>

        <div className="p-6">
          {/* Products List */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={20} className="text-green-600" />
              المنتجات المشمولة ({bundleProducts.length} منتجات):
            </h4>
            <div className="space-y-3">
              {bundleProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-gray-50 to-white rounded-xl hover:from-green-50 hover:to-teal-50 transition-all duration-300 shadow-sm hover:shadow-md border border-gray-100">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md">
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
                    <div className={`text-3xl ${product.image && product.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                      {product.imageAlt || product.image || '🌿'}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <span className="text-sm font-bold text-gray-800 block truncate">{product.name}</span>
                    <span className="text-xs text-gray-500">{product.size}</span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-green-600">{product.price}ج</span>
                    {product.originalPrice > product.price && (
                      <span className="text-xs text-gray-400 line-through">{product.originalPrice}ج</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6 bg-gradient-to-r from-green-50 to-teal-50 rounded-xl p-4 border border-green-100">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-green-600" />
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
          <div className="relative bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-5 mb-6 overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
            <div className="relative z-10 text-center text-white">
              <div className="flex items-center justify-center gap-4 mb-3">
                <span className="text-2xl line-through opacity-60">{bundle.originalPrice} جنيه</span>
                <Zap size={24} className="animate-pulse" />
                <span className="text-4xl font-bold">{bundle.bundlePrice} جنيه</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <Sparkles size={16} />
                <span className="font-bold">وفر {bundle.savings} جنيه!</span>
              </div>
            </div>
          </div>

          {/* Quantity Selector */}
          <div className="bg-gray-50 rounded-xl p-4 mb-4 border-2 border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-bold text-gray-700">الكمية:</span>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => updateQuantity(bundle.id, -1)}
                  disabled={quantity <= 0}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                >
                  <Minus size={18} className={quantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
                </button>
                
                <span className="text-3xl font-bold w-16 text-center text-green-600">{quantity}</span>
                
                <button
                  onClick={() => updateQuantity(bundle.id, 1)}
                  className="w-10 h-10 rounded-xl bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 flex items-center justify-center transition-all shadow-sm hover:shadow-md"
                >
                  <Plus size={18} className="text-gray-600" />
                </button>
              </div>
            </div>

            {quantity > 0 && (
              <div className="text-center pt-3 border-t-2 border-gray-200">
                <p className="text-sm text-gray-600 mb-1">إجمالي الطلب:</p>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                  {quantity * bundle.bundlePrice} جنيه
                </span>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addBundleToCart(bundle)}
            disabled={quantity <= 0}
            className={`w-full py-4 px-6 rounded-xl transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-lg ${
              quantity <= 0
                ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                : `bg-gradient-to-r ${gradient.from} ${gradient.to} text-white hover:shadow-2xl ${gradient.glow} transform hover:scale-105`
            }`}
          >
            <ShoppingCart size={22} />
            {quantity <= 0 ? 'حدد الكمية أولاً' : 'أضف الباقة للسلة'}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-3">
            ✨ ستحصل على جميع المنتجات في الباقة
          </p>
        </div>

        {/* Bottom Gradient */}
        <div className={`h-2 bg-gradient-to-r ${gradient.from} ${gradient.to} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-orange-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-10 w-96 h-96 bg-purple-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/2 w-96 h-96 bg-pink-200 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Gift size={56} className="text-orange-600 animate-bounce" />
            <Sparkles size={40} className="text-yellow-500 animate-pulse" />
            <Zap size={48} className="text-red-600 animate-bounce" style={{ animationDelay: '0.2s' }} />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-orange-600 via-red-600 to-pink-600 bg-clip-text text-transparent">
              العروض المميزة 🎁
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-6">
            باقات حصرية من أجود الزيوت الطبيعية المعصورة على البارد بأسعار مخفضة خاصة
          </p>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <Badge variant="danger" className="text-base px-6 py-3 shadow-lg">
              🔥 وفر حتى 50 جنيه
            </Badge>
            <Badge variant="warning" className="text-base px-6 py-3 shadow-lg">
              ⚡ عروض محدودة
            </Badge>
            <Badge variant="success" className="text-base px-6 py-3 shadow-lg">
              ✅ شحن مجاني
            </Badge>
          </div>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {BUNDLE_OFFERS.map((bundle, index) => (
            <BundleCard key={bundle.id} bundle={bundle} index={index} />
          ))}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white p-10 rounded-3xl text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
              backgroundSize: '40px 40px'
            }}></div>
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              لا تفوت العروض المحدودة! ⏰
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              احصل على أفضل الزيوت الطبيعية المعصورة على البارد بأسعار مخفضة لفترة محدودة
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigateTo('products')}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-xl text-lg transform hover:scale-105"
              >
                تصفح جميع المنتجات
              </button>
              <a
                href={getWhatsAppLink('مرحباً، أريد الاستفسار عن العروض المتاحة')}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all text-lg inline-flex items-center justify-center gap-2"
              >
                <span>تواصل معنا للمزيد</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;