import React, { useState, useEffect, useCallback } from 'react';
import { X, Check, Plus, Minus, ShoppingCart, Package, Star, Sparkles, Info, Award } from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import { getProductById } from '../data/products';

const BundleDetailsPage = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const bundle = state.selectedBundle;
  const [localQuantity, setLocalQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const closeModal = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_BUNDLE', payload: null });
    navigateTo('offers');
  }, [dispatch, navigateTo]);
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
  }, [bundle, closeModal]);



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


  const bundleProducts = bundle.products.map(id => getProductById(id)).filter(p => p !== null);

  return (
    <div 
      // **[تصغير الهوامش الخارجية]:** p-1 بدلاً من p-3
      className="fixed inset-0 z-[99999] flex items-center justify-center p-1 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
    >
      <div 
        // **[تصغير حجم النافذة]:** max-w-sm و my-0. rounded-xl بدلاً من rounded-2xl
        className="relative bg-white rounded-xl shadow-2xl max-w-sm sm:max-w-2xl md:max-w-3xl w-full max-h-[99vh] overflow-y-auto my-0"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - أصبح أكثر قرباً من الحافة */}
        <button
          onClick={closeModal}
          // تم تقليل الـ top و left ليكون أقرب للحافة
          className="sticky top-2 left-2 z-50 w-8 h-8 bg-white hover:bg-red-50 text-gray-600 hover:text-red-600 rounded-full shadow-lg flex items-center justify-center transition-all border border-gray-100 active:scale-95"
          aria-label="إغلاق"
          type="button"
        >
          <X size={16} />
        </button>

        {/* **[تصغير الـ Padding الداخلي]:** p-3 و space-y-4 */}
        <div className="p-3 sm:p-4 space-y-4">
          {/* Header Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Image */}
            <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-lg shadow-lg overflow-hidden">
              {/* p-0 لضمان ملء الصورة للحاوية على الموبايل */}
              <div className="aspect-square flex items-center justify-center p-0 sm:p-6 text-white relative">
                {!imageLoaded && bundle.image && bundle.image.startsWith('http') && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                
                {bundle.image && bundle.image.startsWith('http') ? (
                  <img 
                    src={bundle.image} 
                    alt={bundle.name}
                    loading="eager"
                    onLoad={() => setImageLoaded(true)}
                    className={`max-w-full max-h-full object-contain transition-transform duration-500 ${
                      imageLoaded ? 'opacity-100 scale-100' : 'opacity-0'
                    }`}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                ) : null}
                {/* تم تصغير حجم الإيموجي الاحتياطي */}
                <div className={`text-6xl ${bundle.image && bundle.image.startsWith('http') && imageLoaded ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                  {bundle.imageAlt || '🎁'}
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="space-y-3">
              <div>
                {/* **[تصغير الخط]:** text-xl على الموبايل */}
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-1">
                  {bundle.name}
                </h1>
                <p className="text-gray-600 leading-snug text-xs sm:text-sm">
                  {bundle.description}
                </p>
              </div>

              {/* Rating - تم تصغير الـ padding */}
              <div className="flex items-center gap-2 p-2 bg-yellow-50 rounded-lg border border-yellow-100">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14} // تصغير حجم النجمة
                      className={i < Math.floor(bundle.ratings) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                    />
                  ))}
                </div>
                <div>
                  <p className="font-bold text-gray-800 text-xs">{bundle.ratings}</p>
                  <p className="text-xs text-gray-600">({bundle.reviews} تقييم)</p>
                </div>
              </div>

              {/* التسعير والخصم المحدث */}
              <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-lg shadow-lg text-white relative">
                {(() => {
                    const savings = bundle.originalPrice - bundle.bundlePrice;
                    const discountPercentage = Math.round((savings / bundle.originalPrice) * 100);
                    return (
                        <>
                            {/* شريحة الخصم الواضحة (تم تصغير الخط) */}
                            <div className="absolute top-0 right-0 bg-red-600 text-white text-xs font-extrabold px-2 py-1 rounded-bl-lg rounded-tr-lg shadow-md z-10">
                                وفر {discountPercentage}%
                            </div>
                            
                            {/* السعر الأصلي (تم تصغير الخط) */}
                            <p className="text-xs opacity-90 mb-1 mt-3">السعر الأصلي</p>
                            <div className="flex items-end gap-1 mb-2">
                                <span className="text-lg line-through opacity-70">{bundle.originalPrice}</span>
                                <span className="text-xs opacity-75 line-through">ج</span>
                            </div>

                            {/* السعر الآن (الجديد) */}
                            <div className="flex items-center justify-between pt-2 border-t border-white/30 text-xs">
                                <span className="opacity-90 text-sm font-semibold">السعر الآن</span>
                                <div className="flex items-end gap-1">
                                    <span className="text-2xl font-bold">{bundle.bundlePrice}</span>
                                    <span className="text-xs opacity-75">ج</span>
                                </div>
                            </div>
                        </>
                    );
                })()}
              </div>
              
              {/* Quantity & Actions - تم تصغير الـ padding والخطوط */}
              <div className="space-y-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-gray-800 text-sm">الكمية:</span>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition-all"
                        type="button"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-xl font-bold text-green-600 w-6 text-center">
                        {localQuantity}
                      </span>
                      <button
                        onClick={() => setLocalQuantity(localQuantity + 1)}
                        className="w-7 h-7 rounded-md bg-white border border-gray-200 hover:border-green-500 flex items-center justify-center transition-all"
                        type="button"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {localQuantity > 0 && (
                    <div className="text-center pt-2 border-t border-gray-200">
                      <p className="font-bold text-green-600 text-sm">
                        المجموع: {localQuantity * bundle.bundlePrice} جنيه
                      </p>
                    </div>
                  )}
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={handleAddToCart}
                    disabled={localQuantity <= 0}
                    className={`flex-1 py-2 px-3 rounded-lg transition-all font-bold text-sm flex items-center justify-center gap-2 ${
                      localQuantity <= 0
                        ? 'bg-gray-300 cursor-not-allowed text-gray-500 opacity-60'
                        : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600'
                    }`}
                    type="button"
                  >
                    <ShoppingCart size={16} />
                    أضف للسلة
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-200 my-4"></div>

          {/* Products in Bundle */}
          <div>
            {/* **[تصغير الخط]:** text-base على الموبايل */}
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Package size={18} className="text-green-600" />
              المنتجات المتضمنة ({bundleProducts.length})
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {bundleProducts.map((product) => {
                const productPrice = Math.round(product.originalPrice * (1 - bundle.totalDiscountPercentage / 100));
              
                
                return (
                  <div key={product.id} className="bg-gradient-to-br from-green-50 to-teal-50 rounded-lg p-3 border border-green-100 hover:border-green-300 transition-all">
                    <div className="flex items-start gap-2 mb-2">
                      {/* تم تصغير حجم أيقونة المنتج */}
                      <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-teal-100 rounded-md flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden text-xl">
                        {product.imageAlt || '🌿'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-gray-800 text-sm leading-tight truncate">{product.name}</p>
                        <p className="text-xs text-gray-600">{product.size}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star size={10} className="text-yellow-500 fill-current" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white rounded-md p-2 border border-green-200 space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-600">الأصلي:</span>
                        <span className="font-bold">{product.originalPrice} ج</span>
                      </div>
                      <div className="flex justify-between pt-1 border-t border-gray-100">
                        <span className="text-green-600 font-bold">بالعرض:</span>
                        <span className="font-bold text-green-600">{productPrice} ج</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Benefits */}
          <div className="border-t border-gray-200 pt-4">
            {/* **[تصغير الخط]:** text-base على الموبايل */}
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-purple-600" />
              الفوائد الرئيسية
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {bundle.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start gap-2 p-3 bg-purple-50 rounded-md border border-purple-100">
                  <Check size={16} className="text-purple-600 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-700 text-sm leading-snug">{benefit}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Combined Usage - جديد */}
          {bundle.combinedUsage && (
            <div className="border-t border-gray-200 pt-4">
              {/* **[تصغير الخط]:** text-base على الموبايل */}
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Info size={18} className="text-green-600" />
                طريقة الخلط والاستخدام المشترك
              </h2>

              <div className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-100 rounded-md p-3">
                <div className="text-gray-700 leading-snug whitespace-pre-line text-sm">
                  {bundle.combinedUsage}
                </div>
              </div>
            </div>
          )}

          {/* Usage Info */}
          <div className="border-t border-gray-200 pt-4">
            {/* **[تصغير الخط]:** text-base على الموبايل */}
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Info size={18} className="text-blue-600" />
              ملخص الاستخدام
            </h2>

            <div className="bg-blue-50 border border-blue-100 rounded-md p-3">
              <p className="text-gray-700 text-sm leading-snug">{bundle.usage}</p>
            </div>
          </div>

          {/* Scientific Basis - جديد */}
          {bundle.scientificBasis && (
            <div className="border-t border-gray-200 pt-4">
              {/* **[تصغير الخط]:** text-base على الموبايل */}
              <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3 flex items-center gap-2">
                <Award size={18} className="text-purple-600" />
                أساس علمي
              </h2>
              <div className="bg-purple-50 border border-purple-100 rounded-md p-3">
                <p className="text-gray-700 text-sm leading-snug">
                  {bundle.scientificBasis}
                </p>
              </div>
            </div>
          )}

          {/* Suitable For */}
          <div className="border-t border-gray-200 pt-4">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">مناسب لـ:</h2>
            <p className="bg-amber-50 border border-amber-100 rounded-md p-3 text-gray-700 text-sm">
              {bundle.suitableFor}
            </p>
          </div>

          {/* Expected Results */}
          <div>
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-3">النتائج المتوقعة:</h2>
            <p className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-md p-3 text-gray-700 text-sm">
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