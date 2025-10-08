import React, { useState } from 'react';
import { 
  AlertCircle, Star, Plus, Minus, CheckCircle, BookOpen, 
  Truck, Shield, Heart, ShoppingCart, Home, Package, Eye
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
      payload: { message: `تم إضافة ${localQuantity} من ${product.name} للسلة`, type: 'success' }
    });

    setLocalQuantity(0);
  };

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const hasDiscount = product.originalPrice > product.price;
  const relatedProducts = PRODUCTS_DATA
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex flex-wrap items-center gap-2 mb-6 md:mb-8 text-xs md:text-sm">
          <button 
            onClick={() => navigateTo('home')}
            className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
          >
            <Home size={16} />
            الرئيسية
          </button>
          <span className="text-gray-400">/</span>
          <button 
            onClick={() => navigateTo('products')}
            className="text-green-600 hover:text-green-700 transition-colors flex items-center gap-1"
          >
            <Package size={16} />
            المنتجات
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600 truncate max-w-[150px] md:max-w-none">{product.name}</span>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-12 mb-12">
            {/* Product Image */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <div className="w-full aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-green-200 to-transparent opacity-50"></div>
                {product.image && product.image.startsWith('http') ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover relative z-10"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <span className={`text-8xl md:text-9xl relative z-10 ${product.image && product.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                  {product.imageAlt || product.image || '🌿'}
                </span>
              </div>
              
              {/* Product badges */}
              <div className="flex flex-wrap justify-center gap-2">
                {product.featured && <Badge variant="warning">⭐ منتج مميز</Badge>}
                {hasDiscount && <Badge variant="danger">🔥 خصم خاص</Badge>}
                {product.soldCount > 200 && <Badge variant="info">الأكثر مبيعاً</Badge>}
                <Badge variant={product.inStock ? 'success' : 'danger'}>
                  {product.inStock ? '✓ متوفر' : 'نفذ'}
                </Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white p-6 md:p-8 rounded-xl shadow-lg">
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
              <p className="text-base md:text-lg text-gray-600 mb-4">{product.size}</p>
              
              {/* Price */}
              <div className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-200 rounded-xl p-4 md:p-6 mb-6">
                <div className="flex items-center flex-wrap gap-3 md:gap-4">
                  <span className="text-3xl md:text-4xl font-bold text-green-600">{product.price} جنيه</span>
                  {hasDiscount && (
                    <div className="flex flex-col">
                      <span className="text-xl md:text-2xl text-gray-400 line-through">{product.originalPrice} جنيه</span>
                      <Badge variant="danger" className="text-xs">
                        وفر {product.savings} جنيه!
                      </Badge>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} تقييم)
                </span>
                <span className="text-sm text-gray-500">• تم بيع {product.soldCount} قطعة</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 text-sm md:text-base">{product.description}</p>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-base md:text-lg font-bold text-gray-800 mb-3">خصائص المنتج</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="info">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm md:text-base font-bold text-gray-800">الكمية:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                      disabled={localQuantity <= 0}
                      className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                    >
                      <Minus size={16} className={localQuantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    
                    <span className="text-2xl font-bold w-12 text-center">{localQuantity}</span>
                    
                    <button
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                      disabled={!product.inStock}
                      className="w-10 h-10 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
                    >
                      <Plus size={16} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {localQuantity > 0 && (
                  <div className="text-center pt-3 border-t border-gray-200">
                    <p className="text-xl md:text-2xl font-bold text-green-600 mb-1">
                      المجموع: {localQuantity * product.price} جنيه
                    </p>
                    {localQuantity * product.price >= SITE_CONFIG.shipping.freeShippingThreshold && (
                      <p className="text-green-600 text-xs md:text-sm flex items-center justify-center gap-1">
                        <Truck size={16} />
                        مبروك! حصلت على شحن مجاني
                      </p>
                    )}
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 mb-4">
                <button
                  onClick={handleAddToCart}
                  disabled={localQuantity <= 0 || !product.inStock}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 md:py-4 px-4 md:px-6 rounded-lg transition-all font-bold text-sm md:text-base flex items-center justify-center gap-2 shadow-lg"
                >
                  <ShoppingCart size={20} />
                  {!product.inStock ? 'المنتج غير متوفر' : 'إضافة للسلة'}
                </button>
                
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-3 md:p-4 rounded-lg transition-all border-2 ${
                    isInWishlist 
                      ? 'border-red-500 text-red-500 bg-red-50' 
                      : 'border-gray-300 text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                  aria-label={isInWishlist ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
                >
                  <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
                </button>
              </div>

              {/* Additional info */}
              <div className="grid grid-cols-2 gap-4 text-xs md:text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Shield size={18} className="text-green-600" />
                  <span>منتج معتمد</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck size={18} className="text-green-600" />
                  <span>توصيل سريع</span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <CheckCircle size={24} className="text-green-600" />
              الفوائد الرئيسية
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-4 bg-green-50 rounded-lg">
                  <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700 text-sm md:text-base">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* How to use */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <h3 className="text-xl md:text-2xl font-bold text-green-800 mb-4 flex items-center gap-2">
              <BookOpen size={24} />
              طريقة الاستخدام
            </h3>
            <p className="text-green-900 leading-relaxed text-sm md:text-base">{product.howToUse}</p>
          </div>

          {/* Warnings */}
          {product.warnings && product.warnings.length > 0 && (
            <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6 md:p-8 mb-8">
              <h4 className="font-bold text-yellow-800 mb-3 flex items-center gap-2 text-base md:text-lg">
                <AlertCircle size={20} />
                تحذيرات مهمة
              </h4>
              <ul className="text-yellow-800 text-sm md:text-base space-y-2">
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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 text-center">
                منتجات مشابهة
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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