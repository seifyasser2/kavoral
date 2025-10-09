import React, { useState } from 'react';
import { 
  AlertCircle, Star, Plus, Minus, CheckCircle, BookOpen, 
  Truck, Shield, Heart, ShoppingCart, Home, Package, 
  Sparkles, Award, TrendingUp
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS_DATA } from '../data/products';
import { SITE_CONFIG } from '../data/config';
import { Badge, EmptyState } from '../components/common';
import ProductCard from '../components/product/ProductCard';

const ProductDetailsPage = () => {
  const { state, dispatch, navigateTo, toggleWishlist } = useAppContext();
  const product = state.selectedProduct;
  const [localQuantity, setLocalQuantity] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <EmptyState 
            icon={AlertCircle}
            title="المنتج غير موجود"
            description="عذراً، لم نتمكن من العثور على المنتج المطلوب"
            actionLabel="العودة للرئيسية"
            onAction={() => navigateTo('home')}
          />
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (localQuantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return;
    }

    if (!product.inStock) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'هذا المنتج غير متوفر حالياً', type: 'error' }
      });
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: localQuantity }
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `✅ تم إضافة ${localQuantity} من ${product.name} للسلة`, type: 'success' }
    });

    setLocalQuantity(0);
  };

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const hasDiscount = product.originalPrice > product.price;
  const relatedProducts = PRODUCTS_DATA
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 mb-8 text-sm bg-white p-4 rounded-xl shadow-md">
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            <Home size={16} />
            الرئيسية
          </button>
          <span className="text-gray-400">/</span>
          <button 
            onClick={() => navigateTo('products')}
            className="flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            <Package size={16} />
            المنتجات
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 truncate max-w-[200px] md:max-w-none font-semibold">{product.name}</span>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
            {/* Product Image */}
            <div className="space-y-4">
              <div className="relative bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 rounded-3xl shadow-2xl overflow-hidden border-4 border-white group">
                <div className="aspect-square flex items-center justify-center p-8 relative">
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, currentColor 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>

                  {product.image && product.image.startsWith('http') ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="relative z-10 w-full h-full object-contain group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className={`text-9xl relative z-10 ${product.image && product.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full group-hover:scale-125 group-hover:rotate-12 transition-all duration-700`}>
                    {product.imageAlt || product.image || '🌿'}
                  </span>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 right-6 flex justify-between items-start z-20">
                    <div className="flex flex-col gap-2">
                      {product.featured && (
                        <Badge variant="warning" className="shadow-xl backdrop-blur-sm bg-yellow-400/90 animate-pulse">
                          ⭐ مميز
                        </Badge>
                      )}
                      {hasDiscount && (
                        <Badge variant="danger" className="shadow-xl backdrop-blur-sm bg-red-500/90">
                          خصم {product.totalDiscountPercentage}%
                        </Badge>
                      )}
                    </div>
                    <Badge variant={product.inStock ? 'success' : 'danger'} className="shadow-xl backdrop-blur-sm">
                      {product.inStock ? '✓ متوفر' : 'نفذ'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-4">
                <div className="bg-white p-4 rounded-xl shadow-md text-center border-2 border-green-100">
                  <Shield className="mx-auto mb-2 text-green-600" size={24} />
                  <p className="text-xs font-semibold text-gray-700">منتج معتمد</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center border-2 border-blue-100">
                  <Truck className="mx-auto mb-2 text-blue-600" size={24} />
                  <p className="text-xs font-semibold text-gray-700">توصيل سريع</p>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-md text-center border-2 border-purple-100">
                  <Award className="mx-auto mb-2 text-purple-600" size={24} />
                  <p className="text-xs font-semibold text-gray-700">جودة عالية</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3 leading-tight">{product.name}</h1>
                <p className="text-xl text-gray-600 flex items-center gap-2">
                  <Package size={20} className="text-green-600" />
                  {product.size}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl border-2 border-yellow-100">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className={i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-lg">{product.rating}</p>
                  <p className="text-sm text-gray-600">({product.reviews} تقييم)</p>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-8 rounded-2xl shadow-2xl text-white relative overflow-hidden">
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
                    backgroundSize: '30px 30px'
                  }}></div>
                </div>

                <div className="relative z-10">
                  <p className="text-sm opacity-90 mb-2">السعر الآن</p>
                  <div className="flex items-end gap-4 mb-3">
                    <span className="text-5xl font-bold">{product.price} جنيه</span>
                    {hasDiscount && (
                      <span className="text-2xl line-through opacity-60 mb-2">{product.originalPrice} جنيه</span>
                    )}
                  </div>
                  {hasDiscount && (
                    <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Sparkles size={18} />
                      <span className="font-bold">وفر {product.savings} جنيه!</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Description */}
              <div className="bg-white p-6 rounded-2xl shadow-md border-2 border-gray-100">
                <p className="text-gray-700 leading-relaxed text-lg">{product.description}</p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                  <Sparkles size={20} className="text-green-600" />
                  خصائص المنتج
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-100 text-green-700 px-4 py-2 rounded-xl font-semibold text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="bg-gray-50 rounded-2xl p-6 border-2 border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-lg font-bold text-gray-800">الكمية:</span>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                      disabled={localQuantity <= 0}
                      className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md"
                    >
                      <Minus size={20} className={localQuantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    
                    <span className="text-4xl font-bold w-16 text-center text-green-600">{localQuantity}</span>
                    
                    <button
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                      disabled={!product.inStock}
                      className="w-12 h-12 rounded-xl bg-white border-2 border-gray-200 hover:border-green-500 hover:bg-green-50 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-md"
                    >
                      <Plus size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {localQuantity > 0 && (
                  <div className="text-center pt-4 border-t-2 border-gray-200">
                    <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      المجموع: {localQuantity * product.price} جنيه
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={localQuantity <= 0 || !product.inStock}
                  className={`flex-1 py-4 px-6 rounded-xl transition-all font-bold text-lg flex items-center justify-center gap-3 shadow-xl ${
                    localQuantity <= 0 || !product.inStock
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 hover:shadow-2xl transform hover:scale-105'
                  }`}
                >
                  <ShoppingCart size={24} />
                  {!product.inStock ? 'غير متوفر' : 'إضافة للسلة'}
                </button>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-4 rounded-xl transition-all border-2 shadow-xl transform hover:scale-110 ${
                    isInWishlist 
                      ? 'border-red-500 bg-red-50 text-red-500' 
                      : 'border-gray-300 bg-white text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={28} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-3xl shadow-xl p-8 mb-12 border-2 border-green-100">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 flex items-center gap-3">
              <CheckCircle size={32} className="text-green-600" />
              الفوائد الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-md">
                  <CheckCircle size={24} className="text-green-600 flex-shrink-0 mt-1" />
                  <span className="text-gray-700 text-lg">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-white rounded-3xl shadow-xl p-8 mb-12 border-2 border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <BookOpen size={32} className="text-blue-600" />
              طريقة الاستخدام
            </h3>
            <p className="text-gray-700 leading-relaxed text-lg">{product.howToUse}</p>
          </div>

          {/* Warnings */}
          {product.warnings && product.warnings.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-3xl p-8 mb-12">
              <h4 className="font-bold text-yellow-800 mb-4 flex items-center gap-3 text-2xl">
                <AlertCircle size={28} />
                تحذيرات مهمة
              </h4>
              <ul className="text-yellow-800 text-lg space-y-2">
                {product.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <span className="mt-1">•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
                منتجات مشابهة
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;