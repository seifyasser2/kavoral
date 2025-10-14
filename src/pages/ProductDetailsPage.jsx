import React, { useState } from 'react';
import { 
  AlertCircle, Star, Plus, Minus, CheckCircle, BookOpen, 
  Truck, Shield, Heart, ShoppingCart, Home, Package, 
  Sparkles, Award
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS_DATA } from '../data/products';
// SITE_CONFIG not used here
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
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 mb-6 text-xs md:text-sm bg-white p-3 rounded-lg shadow-sm">
          <button 
            onClick={() => navigateTo('home')}
            className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            <Home size={14} />
            الرئيسية
          </button>
          <span className="text-gray-400">/</span>
          <button 
            onClick={() => navigateTo('products')}
            className="flex items-center gap-1 text-green-600 hover:text-green-700 transition-colors font-semibold"
          >
            <Package size={14} />
            المنتجات
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 truncate max-w-[150px] md:max-w-none font-semibold">{product.name}</span>
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-12">
            {/* Product Image - محسّن للموبايل */}
            <div className="space-y-4">
              <div className="relative bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-lg overflow-hidden">
                {/* الصورة */}
                <div className="aspect-square flex items-center justify-center p-6 md:p-8 relative">
                  {product.image && product.image.startsWith('http') ? (
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                  ) : null}
                  <span className={`text-8xl ${product.image && product.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                    {product.imageAlt || product.image || '🌿'}
                  </span>
                </div>

                {/* Badges - محسّنة للموبايل */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-start z-10">
                  <div className="flex flex-col gap-2">
                    {product.featured && (
                      <Badge variant="warning" className="text-xs shadow-lg backdrop-blur-sm bg-yellow-400/95">
                        ⭐ مميز
                      </Badge>
                    )}
                    {hasDiscount && (
                      <Badge variant="danger" className="text-xs shadow-lg backdrop-blur-sm bg-red-500/95">
                        خصم {product.totalDiscountPercentage}%
                      </Badge>
                    )}
                  </div>
                  <Badge variant={product.inStock ? 'success' : 'danger'} className="text-xs shadow-lg backdrop-blur-sm">
                    {product.inStock ? '✓ متوفر' : 'نفذ'}
                  </Badge>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <Shield className="mx-auto mb-1 text-green-600" size={20} />
                  <p className="text-xs font-semibold text-gray-700">منتج معتمد</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <Truck className="mx-auto mb-1 text-blue-600" size={20} />
                  <p className="text-xs font-semibold text-gray-700">توصيل سريع</p>
                </div>
                <div className="bg-white p-3 rounded-lg shadow-sm text-center">
                  <Award className="mx-auto mb-1 text-purple-600" size={20} />
                  <p className="text-xs font-semibold text-gray-700">جودة عالية</p>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2 leading-tight">{product.name}</h1>
                <p className="text-lg text-gray-600 flex items-center gap-2">
                  <Package size={18} className="text-green-600" />
                  {product.size}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-800">{product.rating}</p>
                  <p className="text-xs text-gray-600">({product.reviews} تقييم)</p>
                </div>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-green-500 to-teal-500 p-6 rounded-xl shadow-lg text-white">
                <p className="text-sm opacity-90 mb-1">السعر الآن</p>
                <div className="flex items-end gap-3 mb-2">
                  <span className="text-4xl font-bold">{product.price} ج</span>
                  {hasDiscount && (
                    <span className="text-xl line-through opacity-60 mb-1">{product.originalPrice} ج</span>
                  )}
                </div>
                {hasDiscount && (
                  <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                    <Sparkles size={16} />
                    <span className="font-bold">وفر {product.savings} جنيه!</span>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <p className="text-gray-700 leading-relaxed">{product.description}</p>
              </div>

              {/* Tags */}
              <div>
                <h3 className="text-sm font-bold text-gray-800 mb-2 flex items-center gap-2">
                  <Sparkles size={16} className="text-green-600" />
                  خصائص المنتج
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-green-50 border border-green-100 text-green-700 px-3 py-1 rounded-lg font-semibold text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-bold text-gray-800">الكمية:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                      disabled={localQuantity <= 0}
                      className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                    >
                      <Minus size={18} className={localQuantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    
                    <span className="text-3xl font-bold w-12 text-center text-green-600">{localQuantity}</span>
                    
                    <button
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                      disabled={!product.inStock}
                      className="w-10 h-10 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                    >
                      <Plus size={18} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {localQuantity > 0 && (
                  <div className="text-center pt-3 border-t-2 border-gray-200">
                    <p className="text-2xl font-bold text-green-600">
                      المجموع: {localQuantity * product.price} ج
                    </p>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3">
                <button
                  onClick={handleAddToCart}
                  disabled={localQuantity <= 0 || !product.inStock}
                  className={`flex-1 py-3 px-4 rounded-xl transition-all font-bold flex items-center justify-center gap-2 shadow-lg ${
                    localQuantity <= 0 || !product.inStock
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
                  }`}
                >
                  <ShoppingCart size={20} />
                  {!product.inStock ? 'غير متوفر' : 'إضافة للسلة'}
                </button>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 rounded-xl transition-all border-2 shadow-lg ${
                    isInWishlist 
                      ? 'border-red-500 bg-red-50 text-red-500' 
                      : 'border-gray-300 bg-white text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle size={24} className="text-green-600" />
              الفوائد الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle size={20} className="text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to Use */}
          <div className="bg-blue-50 rounded-2xl shadow-lg p-6 mb-8">
            <h3 className="text-2xl font-bold text-blue-900 mb-4 flex items-center gap-2">
              <BookOpen size={24} />
              طريقة الاستخدام
            </h3>
            <p className="text-blue-800 leading-relaxed">{product.howToUse}</p>
          </div>

          {/* Warnings */}
          {product.warnings && product.warnings.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-2xl p-6 mb-8">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2">
                <AlertCircle size={20} />
                تحذيرات مهمة
              </h4>
              <ul className="text-yellow-800 space-y-2">
                {product.warnings.map((warning, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <span>•</span>
                    <span>{warning}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Related Products */}
          {relatedProducts.length > 0 && (
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 text-center">
                منتجات مشابهة
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
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