import React, { useState, useEffect, useCallback } from 'react';
import { 
  X, Star, Plus, Minus, Heart, ShoppingCart, Package, AlertCircle, 
  ClipboardList, CheckCircle2, Info, Leaf 
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

  // تحديث التاب الافتراضي عند فتح منتج جديد
  useEffect(() => {
    if (product) {
      if (product.info) setActiveTab('info');
      else if (product.benefitsSkin?.length > 0) setActiveTab('skin');
      else if (product.benefitsHair?.length > 0) setActiveTab('hair');
      else if (product.ingredients?.length > 0) setActiveTab('ingredients');
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
  
  // نظام التابات الديناميكي المطور
  const availableTabs = [];
  
  // لمنتجات العناية (الزيوت)
  if (product.benefitsSkin?.length > 0) availableTabs.push({ key: 'skin', label: 'العناية بالبشرة' });
  if (product.benefitsHair?.length > 0) availableTabs.push({ key: 'hair', label: 'العناية بالشعر' });
  
  // للمنتجات الغذائية (المختوم)
  if (product.info) availableTabs.push({ key: 'info', label: 'عن المنتج' });
  if (product.ingredients?.length > 0) availableTabs.push({ key: 'ingredients', label: 'المكونات' });
  if (product.benefits?.length > 0) availableTabs.push({ key: 'benefits', label: 'الفوائد الصحية' });
  
  // التحذيرات تظهر للجميع إذا وجدت
  if (product.warnings?.length > 0) availableTabs.push({ key: 'warnings', label: 'تحذيرات' });

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
          <X size={20} />
        </button>

        <div className="p-3 sm:p-6 clear-both space-y-4 sm:space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
            {/* القسم الأيسر: الصورة */}
            <div className="space-y-2 sm:space-y-4">
              <div className="relative bg-gray-50 rounded-xl overflow-hidden aspect-square border border-gray-100">
                {!imageLoaded && product.image && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
                  </div>
                )}
                
                <img 
                  src={product.image} 
                  alt={product.name}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />

                <div className="absolute top-2 sm:top-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-start pointer-events-none">
                  <div className="flex flex-col gap-1 sm:gap-2">
                    {product.featured && (
                      <span className="bg-yellow-400 text-yellow-900 text-[10px] sm:text-xs font-black px-2 py-1 rounded-full shadow-sm">
                        ⭐ مـمـيـز
                      </span>
                    )}
                    {hasDiscount && (
                      <span className="bg-red-600 text-white text-[10px] sm:text-xs font-black px-2 py-1 rounded-full shadow-sm">
                        خصم {product.totalDiscountPercentage}%
                      </span>
                    )}
                  </div>
                  <span className={`${product.inStock ? 'bg-green-500' : 'bg-red-500'} text-white text-[10px] sm:text-xs font-bold px-2 py-1 rounded-full shadow-sm`}>
                    {product.inStock ? '✓ متوفر' : 'نفذت الكمية'}
                  </span>
                </div>
              </div>
            </div>

            {/* القسم الأيمن: المعلومات والأسعار */}
            <div className="space-y-4">
              <div>
                <h2 className="text-2xl sm:text-3xl font-black text-gray-800 mb-1">{product.name}</h2>
                <div className="flex items-center gap-2 text-gray-500">
                  <Package size={16} className="text-green-600" />
                  <span className="text-sm font-medium">{product.size}</span>
                </div>
              </div>

              {/* السعر */}
              <div className="bg-gradient-to-r from-green-50 to-white border border-green-100 rounded-2xl p-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-green-600">{product.price} <small className="text-lg font-bold">ج.م</small></span>
                  {hasDiscount && (
                    <span className="text-lg text-gray-400 line-through font-bold">{product.originalPrice} ج</span>
                  )}
                </div>
                {hasDiscount && (
                  <p className="text-green-700 text-sm font-bold mt-1">🥳 وفرت {product.savings} جنيه اليوم!</p>
                )}
              </div>

              {/* الكمية وأزرار التحكم */}
              <div className="grid grid-cols-1 gap-3">
                <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl border border-gray-200">
                  <span className="font-bold text-gray-700">الكمية المطلوبة:</span>
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                      className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-red-500 active:scale-90 transition-transform"
                    >
                      <Minus size={18} />
                    </button>
                    <span className="text-2xl font-black text-green-600 w-8 text-center">{localQuantity}</span>
                    <button 
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                      className="w-10 h-10 rounded-full bg-white border shadow-sm flex items-center justify-center text-green-600 active:scale-90 transition-transform"
                    >
                      <Plus size={18} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isInWishlist ? 'bg-red-50 border-red-500 text-red-500' : 'bg-white border-gray-200 text-gray-400 hover:border-red-500 hover:text-red-500'
                    }`}
                  >
                    <Heart size={24} fill={isInWishlist ? 'currentColor' : 'none'} />
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={localQuantity <= 0 || !product.inStock}
                    className={`flex-1 flex items-center justify-center gap-3 rounded-xl font-black text-lg shadow-lg shadow-green-200 transition-all active:scale-95 ${
                      localQuantity <= 0 || !product.inStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    <ShoppingCart size={22} />
                    {!product.inStock ? 'غير متوفر حالياً' : 'أضف للسلة الآن'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* نظام التابات الجديد */}
          {availableTabs.length > 0 && (
            <div className="mt-8 border-t border-gray-100 pt-6">
              <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                {availableTabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-6 py-2.5 rounded-full font-bold whitespace-nowrap transition-all ${
                      activeTab === tab.key
                        ? 'bg-green-600 text-white shadow-md'
                        : 'bg-gray-100 text-gray-500 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="min-h-[200px] animate-fadeIn">
                {/* تاب المعلومات العامة (للمختوم) */}
                {activeTab === 'info' && (
                  <div className="bg-blue-50/50 p-5 rounded-2xl border border-blue-100">
                    <div className="flex items-center gap-2 mb-3 text-blue-800">
                      <Info size={20} />
                      <h3 className="font-black">عن المختوم الفلسطيني</h3>
                    </div>
                    <p className="text-gray-700 leading-relaxed font-medium">{product.info}</p>
                    {product.usage && (
                      <div className="mt-4 p-3 bg-white rounded-xl border border-blue-200">
                        <span className="block text-sm font-bold text-blue-900 mb-1">طريقة الاستخدام الصحيحة:</span>
                        <p className="text-blue-800 text-sm">{product.usage}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* تاب المكونات (للمختوم) */}
                {activeTab === 'ingredients' && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {product.ingredients?.map((item, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-50 p-3 rounded-xl border border-gray-100">
                        <Leaf size={16} className="text-green-500" />
                        <span className="font-bold text-gray-700">{item}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* تاب الفوائد (للمختوم) */}
                {activeTab === 'benefits' && (
                  <div className="space-y-3">
                    {product.benefits?.map((benefit, i) => (
                      <div key={i} className="flex items-start gap-3 bg-green-50/50 p-4 rounded-xl border border-green-100">
                        <CheckCircle2 size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                        <p className="text-green-900 font-bold">{benefit}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* تابات الزيوت السابقة (بشرة وشعر) */}
                {activeTab === 'skin' && (
                  <div className="space-y-4">
                    <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100">
                      <h4 className="font-bold text-emerald-900 mb-1 italic">كيف أستخدمه لبشرتي؟</h4>
                      <p className="text-emerald-800">{product.usageSkin}</p>
                    </div>
                    {product.benefitsSkin?.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white border-b border-gray-50">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span className="text-gray-700 font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'hair' && (
                  <div className="space-y-4">
                    <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
                      <h4 className="font-bold text-blue-900 mb-1 italic">كيف أستخدمه لشعري؟</h4>
                      <p className="text-blue-800">{product.usageHair}</p>
                    </div>
                    {product.benefitsHair?.map((b, i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-white border-b border-gray-50">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-gray-700 font-medium">{b}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* تاب التحذيرات */}
                {activeTab === 'warnings' && (
                  <div className="space-y-3">
                    {product.warnings?.map((w, i) => (
                      <div key={i} className="flex items-center gap-3 p-4 bg-red-50 rounded-xl border border-red-100 text-red-800">
                        <AlertCircle size={20} />
                        <span className="font-bold">{w}</span>
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