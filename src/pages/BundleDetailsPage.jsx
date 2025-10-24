import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, Check, Plus, Minus, ShoppingCart, Package, Zap, 
  Star, Heart, Sparkles, ChevronDown, Info,Award
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { getProductById } from '../data/products';

const BundleDetailsPage = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const bundle = state.selectedBundle;
  const [localQuantity, setLocalQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') closeModal();
    };

    if (bundle) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
      document.body.classList.add('modal-open');
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
      document.body.classList.remove('modal-open');
    };
  }, [bundle]);

  const closeModal = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_BUNDLE', payload: null });
    navigateTo('offers');
  }, [dispatch, navigateTo]);

  const handleAddToCart = useCallback(() => {
    if (localQuantity <= 0) {
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
      quantity: localQuantity,
      description: bundle.description,
      benefits: bundle.benefits,
      ratings: bundle.ratings,
      reviews: bundle.reviews
    };

    dispatch({
      type: 'ADD_TO_CART',
      payload: bundleItem
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `✅ تم إضافة ${localQuantity} × ${bundle.name} للسلة`, type: 'success' }
    });

    setLocalQuantity(0);
  }, [localQuantity, bundle, dispatch]);

  const handleToggleWishlist = useCallback(() => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: bundle });
  }, [bundle, dispatch]);

  if (!bundle) return null;

  const isInWishlist = state.wishlist.some(item => item.id === bundle.id);
  const bundleProducts = bundle.products.map(id => getProductById(id)).filter(p => p !== null);

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={closeModal}
          className="sticky top-3 left-3 z-50 w-10 h-10 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full shadow-xl flex items-center justify-center transition-all border-2 border-gray-100 active:scale-95"
          aria-label="إغلاق"
          type="button"
        >
          <X size={20} />
        </button>

        <div className="p-4 sm:p-6 space-y-6">
          {/* Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-square flex items-center justify-center p-6 sm:p-8 text-white relative">
                {!imageLoaded && bundle.image && bundle.image.startsWith('http') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {bundle.image && bundle.image.startsWith('http') ? (
                  <img 
                    src={bundle.image} 
                    alt={bundle.name}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                    className={`w-full h-full object-contain transition-transform ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                <div className={`text-7xl ${bundle.image && bundle.image.startsWith('http') && imageLoaded ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                  {bundle.imageAlt || '🎁'}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                  {bundle.name}
                </h1>
                <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                  {bundle.description}
                </p>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-xl border-2 border-yellow-100">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={i < Math.floor(bundle.ratings) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-sm">{bundle.ratings}</p>
                  <p className="text-xs text-gray-600">({bundle.reviews} تقييم)</p>
                </div>
              </div>

              {/* Pricing */}
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-4 rounded-xl shadow-lg text-white">
                <p className="text-sm opacity-90 mb-2">السعر الآن</p>
                <div className="flex items-end gap-2 mb-2">
                  <span className="text-3xl font-bold">{bundle.bundlePrice}</span>
                  <span className="text-sm opacity-75">جنيه</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t border-white/30 text-sm">
                  <span className="line-through opacity-60">{bundle.originalPrice} ج</span>
                  <span className="font-bold">وفّر {bundle.savings} ج</span>
                </div>
              </div>

              {/* Quantity & Actions */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-xl p-4 border-2 border-gray-100">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-bold text-gray-800 text-sm">الكمية:</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                        className="w-8 h-8 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 flex items-center justify-center transition-all"
                        type="button"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="text-2xl font-bold text-green-600 w-8 text-center">
                        {localQuantity}
                      </span>
                      <button
                        onClick={() => setLocalQuantity(localQuantity + 1)}
                        className="w-8 h-8 rounded-lg bg-white border-2 border-gray-200 hover:border-green-500 flex items-center justify-center transition-all"
                        type="button"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  {localQuantity > 0 && (
                    <div className="text-center pt-2 border-t-2 border-gray-200">
                      <p className="font-bold text-green-600 text-sm">
                        المجموع: {localQuantity * bundle.bundlePrice} جنيه
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleToggleWishlist}
                    className={`p-2 rounded-xl border-2 transition-all ${
                      isInWishlist 
                        ? 'border-red-500 bg-red-50 text-red-500' 
                        : 'border-gray-300 bg-white text-gray-600 hover:border-red-500'
                    }`}
                    type="button"
                  >
                    <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={2} />
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={localQuantity <= 0}
                    className={`flex-1 py-2 px-4 rounded-xl transition-all font-bold text-sm flex items-center justify-center gap-2 ${
                      localQuantity <= 0
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500 opacity-60'
                        : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
                    }`}
                    type="button"
                  >
                    <ShoppingCart size={18} />
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t-2 border-gray-200"></div>

          {/* Products in Bundle */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={22} className="text-green-600" />
              المنتجات المتضمنة ({bundleProducts.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bundleProducts.map((product) => {
                const productPrice = Math.round(product.originalPrice * (1 - bundle.totalDiscountPercentage / 100));
                const productSaving = product.originalPrice - productPrice;
                
                return (
                  <div key={product.id} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-xl p-3 border-2 border-green-100 hover:border-green-300 transition-all">
                    <div className="flex items-start gap-2 mb-2">
                      <div className="w-14 h-14 bg-gradient-to-br from-green-100 to-teal-100 rounded-lg flex items-center justify-center flex-shrink-0 shadow-md overflow-hidden text-2xl">
                        {product.imageAlt || '🌿'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm leading-tight truncate">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.size}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={12} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-lg p-2 border border-green-200 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الأصلي:</span>
                        <span className="font-bold">{product.originalPrice} ج</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-gray-100">
                        <span className="text-green-600 font-bold">بالعرض:</span>
                        <span className="font-bold text-green-600">{productPrice} ج</span>
                      </div>
                      <div className="text-right pt-1 border-t border-gray-100">
                        <span className="font-bold text-green-600">توفير: {productSaving} ج</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits */}
          <div className="border-t-2 border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Sparkles size={22} className="text-purple-600" />
              الفوائد الرئيسية
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bundle.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg border-2 border-purple-100">
                  <Check size={18} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-relaxed">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Usage - جديد */}
          {bundle.combinedUsage && (
            <div className="border-t-2 border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Info size={22} className="text-green-600" />
                طريقة الخلط والاستخدام المشترك
              </h2>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 border-2 border-green-100 rounded-xl p-4 prose prose-sm max-w-none">
                <div className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                  {bundle.combinedUsage}
                </div>
              </div>
            </div>
          )}

          {/* Usage Info */}
          <div className="border-t-2 border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Info size={22} className="text-blue-600" />
              ملخص الاستخدام
            </h2>

            <div className="bg-blue-50 border-2 border-blue-100 rounded-xl p-4">
              <p className="text-gray-700 text-sm leading-relaxed">{bundle.usage}</p>
            </div>
          </div>

          {/* Scientific Basis - جديد */}
          {bundle.scientificBasis && (
            <div className="border-t-2 border-gray-200 pt-6">
              <h2 className="text-xl font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Award size={22} className="text-purple-600" />
                أساس علمي
              </h2>
              <div className="bg-purple-50 border-2 border-purple-100 rounded-xl p-4">
                <p className="text-gray-700 text-sm leading-relaxed">
                  {bundle.scientificBasis}
                </p>
              </div>
            </div>
          )}

          {/* Suitable For */}
          <div className="border-t-2 border-gray-200 pt-6">
            <h2 className="text-xl font-bold text-gray-800 mb-3">مناسب لـ:</h2>
            <p className="bg-amber-50 border-2 border-amber-100 rounded-xl p-4 text-gray-700 text-sm">
              {bundle.suitableFor}
            </p>
          </div>

          {/* Expected Results */}
          <div>
            <h2 className="text-xl font-bold text-gray-800 mb-3">النتائج المتوقعة:</h2>
            <p className="bg-gradient-to-r from-green-50 to-teal-50 border-2 border-green-100 rounded-xl p-4 text-gray-700 text-sm">
              {bundle.expectedResults}
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        body.modal-open {
          overflow: hidden !important;
          position: fixed;
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default BundleDetailsPage;