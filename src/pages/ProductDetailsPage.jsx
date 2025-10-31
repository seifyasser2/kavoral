import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, Star, Plus, Minus, Heart, ShoppingCart, Package, AlertCircle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProductDetailsPage = () => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  const product = state.selectedProduct;
  const [localQuantity, setLocalQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('benefits');

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (product) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [product]);

  const closeModal = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
    navigateTo('products');
  }, [dispatch, navigateTo]);

  const handleAddToCart = useCallback(() => {
    if (localQuantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity: localQuantity }
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `✅ تم إضافة ${localQuantity} من ${product.name}`, type: 'success' }
    });

    setLocalQuantity(0);
  }, [localQuantity, product, dispatch]);

  if (!product) return null;

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const hasDiscount = product.originalPrice > product.price;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[95vh] overflow-y-auto my-4"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="sticky top-2 left-2 sm:top-4 sm:left-4 z-50 w-8 h-8 sm:w-12 sm:h-12 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full shadow-xl flex items-center justify-center transition-all border-2 border-gray-100 active:scale-95 float-left sm:float-none"
        >
          <X size={16} className="sm:block hidden" />
          <X size={14} className="sm:hidden" />
        </button>

        <div className="p-3 sm:p-6 clear-both space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* Image */}
            <div className="space-y-2 sm:space-y-4">
              <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square">
                {!imageLoaded && product.image && product.image.startsWith('http') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-8 h-8 sm:w-12 sm:h-12 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                  </div>
                )}
                
                {product.image && product.image.startsWith('http') ? (
                  <img 
                    src={product.image} 
                    alt={product.name}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-cover transition-opacity ${
                      imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`text-6xl sm:text-8xl ${product.image && product.image.startsWith('http') && imageLoaded ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                  {product.imageAlt || product.image || '🌿'}
                </div>

                {/* Badges */}
                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between">
                  <div className="flex flex-col gap-1 sm:gap-2">
                    {product.featured && (
                      <span className="bg-yellow-400 text-yellow-900 text-xs sm:text-sm font-bold px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                        ⭐ مميز
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="bg-red-700 text-white text-xs sm:text-sm font-bold px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                        خصم {product.totalDiscountPercentage}%
                      </span>
                    )}
                  </div>
                  <span className={`${product.inStock ? 'bg-green-500' : 'bg-red-500'} text-white text-xs sm:text-sm font-bold px-2 py-[10px] sm:py-1 rounded-full whitespace-nowrap`}>
                    {product.inStock ? '✓ متوفر' : 'نفذ'}
                  </span>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3 sm:space-y-4">
              <div>
                <h2 className="text-xl sm:text-3xl font-bold text-gray-800 mb-1 sm:mb-2">{product.name}</h2>
                <p className="text-gray-600 flex items-center gap-2 text-xs sm:text-base">
                  <Package size={14} className="text-green-600 flex-shrink-0" />
                  {product.size}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 sm:gap-3 bg-yellow-50 border border-yellow-100 rounded-lg p-2 sm:p-3">
                <div className="flex gap-0.5 sm:gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <span className="font-bold text-xs sm:text-base text-gray-800">{product.rating}</span>
                <span className="text-xs text-gray-600">({product.reviews} تقييم)</span>
              </div>

              {/* Price */}
              <div className="bg-green-50 border border-green-100 rounded-xl p-3 sm:p-4">
                <p className="text-xs text-gray-600 mb-1">السعر الآن</p>
                <div className="flex items-end gap-2 sm:gap-3 mb-2">
                  <span className="text-2xl sm:text-4xl font-bold text-green-600">{product.price} ج</span>
                </div>
                {hasDiscount && (
                  <>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm sm:text-xl text-gray-400 line-through">{product.originalPrice} ج</span>
                    </div>
                    <p className="text-xs sm:text-sm text-green-700 font-semibold">
                      وفّر {product.savings} جنيه!
                    </p>
                  </>
                )}
              </div>

              {/* Description */}
              <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 sm:p-4">
                <p className="text-gray-700 leading-relaxed text-xs sm:text-base">{product.description}</p>
              </div>

              {/* Tags */}
              {product.tags && product.tags.length > 0 && (
                <div className="flex flex-wrap gap-1 sm:gap-2">
                  {product.tags.map((tag, index) => (
                    <span key={index} className="bg-green-50 border border-green-100 text-green-700 px-2 sm:px-3 py-0.5 sm:py-1 rounded-lg text-xs sm:text-sm font-semibold">
                      {tag}
                    </span>
                  ))}
                </div>
              )}

              {/* Quantity */}
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-2 sm:p-4">
                <div className="flex items-center justify-between mb-2 sm:mb-3">
                  <span className="font-bold text-gray-700 text-xs sm:text-base">الكمية:</span>
                  <div className="flex items-center gap-1 sm:gap-3">
                    <button
                      onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                      className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 flex items-center justify-center"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="text-lg sm:text-3xl font-bold text-green-600 w-8 sm:w-12 text-center">{localQuantity}</span>
                    <button
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                      className="w-7 h-7 sm:w-10 sm:h-10 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 flex items-center justify-center"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>

                {localQuantity > 0 && (
                  <div className="text-center pt-2 sm:pt-3 border-t-2 border-gray-200">
                    <p className="text-lg sm:text-2xl font-bold text-green-600">
                      المجموع: {localQuantity * product.price} ج
                    </p>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() => toggleWishlist(product)}
                  className={`p-2 sm:p-3 rounded-xl border-2 flex-shrink-0 ${
                    isInWishlist 
                      ? 'border-red-500 bg-red-50 text-red-500' 
                      : 'border-gray-300 bg-white text-gray-600 hover:border-red-500 hover:text-red-500'
                  }`}
                >
                  <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={2} />
                </button>
                
                <button
                  onClick={handleAddToCart}
                  disabled={localQuantity <= 0 || !product.inStock}
                  className={`flex-1 py-2 sm:py-3 px-3 sm:px-4 rounded-xl font-bold text-sm sm:text-lg flex items-center justify-center gap-2 ${
                    localQuantity <= 0 || !product.inStock
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  <ShoppingCart size={16} />
                  {!product.inStock ? 'غير متوفر' : 'أضف للسلة'}
                </button>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-t pt-4 sm:pt-6">
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {[
                { key: 'benefits', label: 'الفوائد' },
                { key: 'usage', label: 'الاستخدام' },
                { key: 'warnings', label: 'تحذيرات' },
              ].map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-semibold whitespace-nowrap text-xs sm:text-base ${
                    activeTab === tab.key
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div>
              {activeTab === 'benefits' && product.benefits && (
                <div className="space-y-2">
                  {product.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 bg-green-50 border border-green-100 rounded-lg p-2 sm:p-3">
                      <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs">✓</span>
                      </div>
                      <span className="text-gray-700 text-xs sm:text-base leading-relaxed">{benefit}</span>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'usage' && product.howToUse && (
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-3 sm:p-4">
                  <p className="text-blue-900 leading-relaxed text-xs sm:text-base">{product.howToUse}</p>
                </div>
              )}

              {activeTab === 'warnings' && product.warnings && (
                <div className="space-y-2">
                  {product.warnings.map((warning, index) => (
                    <div key={index} className="flex items-start gap-2 sm:gap-3 bg-yellow-50 border border-yellow-100 rounded-lg p-2 sm:p-3">
                      <AlertCircle size={16} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <span className="text-yellow-900 text-xs sm:text-base">{warning}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        body.modal-open {
          overflow: hidden !important;
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;