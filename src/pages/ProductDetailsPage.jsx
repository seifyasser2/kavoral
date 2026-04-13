import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, Star, Plus, Minus, Heart, ShoppingCart, Package, AlertCircle, 
  CheckCircle2, Info, Leaf 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProductDetailsPage = () => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  const product = state.selectedProduct;
  const [localQuantity, setLocalQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  const closeModal = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
    navigateTo('products');
  }, [dispatch, navigateTo]);
  
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
  }, [product, closeModal]);

  useEffect(() => {
    if (product) {
      if (product.info) setActiveTab('info');
      else if (product.benefitsSkin?.length > 0) setActiveTab('skin');
      else if (product.benefitsHair?.length > 0) setActiveTab('hair');
      else if (product.ingredients?.length > 0) setActiveTab('ingredients');
      else if (product.benefits?.length > 0) setActiveTab('benefits');
    }
  }, [product]);

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
  
  const availableTabs = [];
  if (product.benefitsSkin?.length > 0) availableTabs.push({ key: 'skin', label: 'العناية بالبشرة' });
  if (product.benefitsHair?.length > 0) availableTabs.push({ key: 'hair', label: 'العناية بالشعر' });
  if (product.info) availableTabs.push({ key: 'info', label: 'عن المنتج' });
  if (product.ingredients?.length > 0) availableTabs.push({ key: 'ingredients', label: 'المكونات' });
  if (product.benefits?.length > 0) availableTabs.push({ key: 'benefits', label: 'الفوائد الصحية' });
  if (product.warnings?.length > 0) availableTabs.push({ key: 'warnings', label: 'تحذيرات' });

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/70 backdrop-blur-sm overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div 
        className="relative bg-white rounded-2xl shadow-2xl max-w-4xl w-full max-h-[92vh] overflow-y-auto my-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق المحسن للموبايل */}
        <button
          onClick={closeModal}
          className="sticky top-2 left-2 z-50 w-10 h-10 bg-white/90 backdrop-blur shadow-lg border border-gray-100 rounded-full flex items-center justify-center text-gray-500 hover:text-red-600 transition-colors active:scale-90 mb-[-40px]"
        >
          <X size={24} />
        </button>

        <div className="p-4 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
            {/* قسم الصورة */}
            <div className="relative group">
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-50 border border-gray-100 shadow-inner">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center bg-gray-50">
                    <div className="w-8 h-8 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  {hasDiscount && (
                    <span className="bg-red-600 text-white text-[10px] sm:text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                      خصم {product.totalDiscountPercentage}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* قسم السعر والشراء */}
            <div className="flex flex-col justify-center space-y-5">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-800 leading-tight mb-2">{product.name}</h2>
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-50 text-green-700 rounded-lg border border-green-100">
                  <Package size={16} />
                  <span className="text-sm font-bold">{product.size}</span>
                </div>
              </div>

              <div className="p-5 bg-gradient-to-br from-green-50 to-white rounded-2xl border border-green-100 relative overflow-hidden">
                <div className="relative z-10">
                  <div className="flex items-baseline gap-3">
                    <span className="text-4xl font-black text-green-600">{product.price} <small className="text-lg">ج.م</small></span>
                    {hasDiscount && (
                      <span className="text-lg text-gray-400 line-through font-bold">{product.originalPrice} ج</span>
                    )}
                  </div>
                  {hasDiscount && (
                    <p className="text-green-700 text-sm font-bold mt-2 flex items-center gap-1">
                      <span>🥳</span> وفرت {product.savings} جنيه اليوم!
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-700">الكمية:</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                      className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-red-500 hover:bg-red-50 active:scale-90 transition-all"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-2xl font-black text-gray-800 w-6 text-center">{localQuantity}</span>
                    <button 
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                      className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-green-600 hover:bg-green-50 active:scale-90 transition-all"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-4 rounded-xl border-2 transition-all active:scale-95 ${
                      isInWishlist ? 'bg-red-50 border-red-500 text-red-500 shadow-sm' : 'bg-white border-gray-200 text-gray-400'
                    }`}
                  >
                    <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={localQuantity <= 0 || !product.inStock}
                    className={`flex-1 flex items-center justify-center gap-3 rounded-xl font-black text-lg transition-all active:scale-[0.98] ${
                      localQuantity <= 0 || !product.inStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600 shadow-lg shadow-green-100'
                    }`}
                  >
                    <ShoppingCart size={22} />
                    {!product.inStock ? 'نفذت الكمية' : 'أضف للسلة'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* نظام التابات المطور - حل مشكلة الموبايل */}
          {availableTabs.length > 0 && (
            <div className="mt-8">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4">
                {availableTabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all flex-shrink-0 ${
                      activeTab === tab.key
                        ? 'bg-green-600 text-white shadow-md scale-105'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="mt-4 min-h-[200px] animate-fadeIn">
                {activeTab === 'info' && (
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3 text-blue-800">
                      <Info size={20} />
                      <h3 className="font-black text-base">حول المنتج</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed text-sm sm:text-base break-words font-medium">{product.info}</p>
                    {product.usage && (
                      <div className="mt-4 p-4 bg-white/80 rounded-xl border border-blue-100 shadow-sm">
                        <span className="block text-xs font-black text-blue-900 mb-2 uppercase tracking-wider">طريقة الاستخدام المثالية:</span>
                        <p className="text-blue-800 text-sm leading-relaxed">{product.usage}</p>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'ingredients' && (
                  <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.ingredients?.map((item, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-gray-100 shadow-sm">
                        <div className="w-8 h-8 rounded-full bg-green-50 flex items-center justify-center flex-shrink-0">
                           <Leaf size={16} className="text-green-500" />
                        </div>
                        <span className="font-bold text-gray-700 text-xs sm:text-sm break-words">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'benefits' && (
                  <div className="grid grid-cols-1 gap-3">
                    {product.benefits?.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 bg-green-50/40 p-4 rounded-xl border border-green-100/50">
                        <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-green-900 font-bold text-sm leading-relaxed break-words">{benefit}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* تابات الزيوت */}
                {activeTab === 'skin' && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 shadow-sm">
                      <h4 className="font-black text-emerald-900 mb-2 text-sm italic flex items-center gap-2">
                        <Star size={16} /> سر الجمال للبشرة:
                      </h4>
                      <p className="text-emerald-800 text-sm leading-relaxed">{product.usageSkin}</p>
                    </div>
                    <div className="space-y-2">
                      {product.benefitsSkin?.map((b, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white border-b border-gray-50 last:border-0">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 flex-shrink-0" />
                          <span className="text-gray-700 font-bold text-sm">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'hair' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100 shadow-sm">
                      <h4 className="font-black text-blue-900 mb-2 text-sm italic flex items-center gap-2">
                        <Star size={16} /> سر القوة للشعر:
                      </h4>
                      <p className="text-blue-800 text-sm leading-relaxed">{product.usageHair}</p>
                    </div>
                    <div className="space-y-2">
                      {product.benefitsHair?.map((b, i) => (
                        <div key={i} className="flex items-center gap-3 p-3 bg-white border-b border-gray-50 last:border-0">
                          <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
                          <span className="text-gray-700 font-bold text-sm">{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'warnings' && (
                  <div className="space-y-3">
                    {product.warnings?.map((w, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100 text-red-800">
                        <AlertCircle size={22} className="flex-shrink-0" />
                        <span className="font-black text-sm break-words">{w}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;