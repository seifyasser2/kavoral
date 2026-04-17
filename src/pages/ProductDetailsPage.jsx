import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  X, Star, Plus, Minus, Heart, ShoppingCart, Package, AlertCircle, 
  CheckCircle2, Info, Leaf, Sparkles, Beaker, ShieldCheck
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

const ProductDetailsPage = () => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  const product = state.selectedProduct;
  const [localQuantity, setLocalQuantity] = useState(1);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [activeTab, setActiveTab] = useState('');

  // إغلاق الصفحة
  const closeModal = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
    navigateTo('products');
  }, [dispatch, navigateTo]);
  
  // التحكم في لوحة المفاتيح والتمرير
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

  // تحديد التاب الافتراضي بناءً على البيانات المتوفرة
  useEffect(() => {
    if (product) {
      if (product.benefitsSkin?.length > 0) setActiveTab('skin');
      else if (product.benefitsHair?.length > 0) setActiveTab('hair');
      else if (product.info) setActiveTab('info');
      else if (product.ingredients?.length > 0) setActiveTab('ingredients');
      else if (product.benefits?.length > 0) setActiveTab('benefits');
    }
  }, [product]);

  // إضافة للسلة
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
    setLocalQuantity(1);
  }, [localQuantity, product, dispatch]);

  // حساب التابات المتاحة ديناميكياً
  const availableTabs = useMemo(() => {
    if (!product) return [];
    const tabs = [];
    if (product.benefitsSkin?.length > 0) tabs.push({ key: 'skin', label: 'للبشرة', icon: <Sparkles size={16} /> });
    if (product.benefitsHair?.length > 0) tabs.push({ key: 'hair', label: 'للشعر', icon: <Leaf size={16} /> });
    if (product.info) tabs.push({ key: 'info', label: 'عن المنتج', icon: <Info size={16} /> });
    if (product.ingredients?.length > 0) tabs.push({ key: 'ingredients', label: 'المكونات', icon: <Beaker size={16} /> });
    if (product.benefits?.length > 0) tabs.push({ key: 'benefits', label: 'الفوائد', icon: <CheckCircle2 size={16} /> });
    if (product.warnings?.length > 0) tabs.push({ key: 'warnings', label: 'تنبيهات', icon: <AlertCircle size={16} /> });
    return tabs;
  }, [product]);

  if (!product) return null;

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const hasDiscount = product.originalPrice > product.price;

  return (
    <div 
      className="fixed inset-0 z-[99999] flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div 
        className="relative bg-white rounded-[2.5rem] shadow-2xl max-w-5xl w-full max-h-[95vh] overflow-y-auto my-auto scrollbar-thin"
        onClick={(e) => e.stopPropagation()}
      >
        {/* زر الإغلاق العائم */}
        <button
          onClick={closeModal}
          className="absolute top-6 left-6 z-50 w-12 h-12 bg-white/90 backdrop-blur shadow-xl border border-gray-100 rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 hover:rotate-90 transition-all duration-300 active:scale-90"
        >
          <X size={24} />
        </button>

        <div className="p-5 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            
            {/* القسم الأيسر: الصورة */}
            <div className="relative group">
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden bg-gray-50 border border-gray-100 shadow-2xl">
                {!imageLoaded && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-green-100 border-t-green-600 rounded-full animate-spin"></div>
                  </div>
                )}
                <img 
                  src={product.image} 
                  alt={product.name}
                  onLoad={() => setImageLoaded(true)}
                  className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
                />
                
                {hasDiscount && (
                  <div className="absolute top-6 right-6">
                    <span className="bg-red-500 text-white text-xs font-black px-4 py-2 rounded-2xl shadow-lg animate-pulse">
                      وفر {product.discountPercentage}%
                    </span>
                  </div>
                )}

                <div className="absolute bottom-6 inset-x-6 flex justify-center">
                  <div className="bg-white/80 backdrop-blur-md px-6 py-2 rounded-2xl border border-white/50 shadow-lg">
                    <div className="flex items-center gap-2 text-green-700">
                      <ShieldCheck size={18} />
                      <span className="text-sm font-bold">منتج طبيعي 100%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* القسم الأيمن: التفاصيل الأساسية */}
            <div className="flex flex-col justify-start space-y-8 pt-4">
              <div>
                <div className="flex items-center gap-2 mb-3">
                  {product.categories?.map((cat, i) => (
                    <span key={i} className="text-[10px] uppercase tracking-widest font-black text-green-600 bg-green-50 px-3 py-1 rounded-md">
                      {cat}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-4">{product.name}</h1>
                <div className="flex items-center gap-4">
                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-xl">
                    <Package size={18} />
                    <span className="text-sm font-bold">{product.size}</span>
                  </div>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Star size={18} fill="currentColor" />
                    <span className="font-bold text-gray-800">{product.rating || '4.9'}</span>
                    <span className="text-gray-400 text-sm">({product.reviews || '120'} تقييم)</span>
                  </div>
                </div>
              </div>

              <div className="p-6 bg-gradient-to-br from-green-600 to-green-700 rounded-[2rem] text-white shadow-xl shadow-green-100 relative overflow-hidden group">
                <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000"></div>
                <div className="relative z-10">
                  <p className="text-green-100 text-sm font-bold mb-1">السعر الحالي</p>
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-black">{product.price} <small className="text-xl">ج.م</small></span>
                    {hasDiscount && (
                      <span className="text-xl text-green-200/60 line-through font-bold">{product.originalPrice} ج</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-[1.5rem] border border-gray-100">
                  <span className="font-bold text-gray-700 ml-4">حدد الكمية:</span>
                  <div className="flex items-center gap-6 bg-white px-4 py-2 rounded-2xl shadow-sm border border-gray-100">
                    <button 
                      onClick={() => setLocalQuantity(Math.max(1, localQuantity - 1))}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Minus size={20} />
                    </button>
                    <span className="text-2xl font-black text-gray-800 min-w-[20px] text-center">{localQuantity}</span>
                    <button 
                      onClick={() => setLocalQuantity(localQuantity + 1)}
                      className="text-gray-400 hover:text-green-600 transition-colors"
                    >
                      <Plus size={20} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => toggleWishlist(product)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 ${
                      isInWishlist 
                        ? 'bg-red-50 border-red-500 text-red-500 shadow-inner' 
                        : 'bg-white border-gray-100 text-gray-300 hover:border-red-200 hover:text-red-300'
                    }`}
                  >
                    <Heart size={28} fill={isInWishlist ? 'currentColor' : 'none'} />
                  </button>
                  
                  <button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    className={`flex-1 flex items-center justify-center gap-3 rounded-2xl font-black text-xl transition-all duration-300 active:scale-95 shadow-lg ${
                      !product.inStock
                        ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                        : 'bg-gray-900 text-white hover:bg-black shadow-gray-200'
                    }`}
                  >
                    <ShoppingCart size={24} />
                    {!product.inStock ? 'نفذت الكمية' : 'أضف للسلة الآن'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* نظام التبويبات المطور */}
          {availableTabs.length > 0 && (
            <div className="mt-16 border-t border-gray-100 pt-10">
              {/* قائمة التبويبات */}
              <div className="flex items-center gap-2 overflow-x-auto pb-4 no-scrollbar -mx-5 px-5 sm:mx-0 sm:px-0 justify-start sm:justify-center">
                {availableTabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-sm whitespace-nowrap transition-all duration-300 ${
                      activeTab === tab.key
                        ? 'bg-green-600 text-white shadow-xl shadow-green-100 translate-y-[-2px]'
                        : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* محتوى التبويبات */}
              <div className="mt-8 min-h-[300px]">
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  
                  {/* تاب البشرة */}
                  {activeTab === 'skin' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-gray-800 flex items-center gap-2 mb-4">
                          <Sparkles className="text-emerald-500" /> فوائد للبشرة
                        </h3>
                        {product.benefitsSkin?.map((b, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100/50">
                            <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 size={14} className="text-white" />
                            </div>
                            <span className="text-gray-700 font-bold leading-relaxed">{b}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-gray-50 rounded-[2rem] p-8 border border-gray-100">
                        <h4 className="font-black text-gray-900 mb-4 flex items-center gap-2">
                          <Beaker className="text-blue-500" /> طريقة الاستخدام للبشرة
                        </h4>
                        <p className="text-gray-600 leading-loose font-medium italic">
                          "{product.usageSkin}"
                        </p>
                      </div>
                    </div>
                  )}

                  {/* تاب الشعر */}
                  {activeTab === 'hair' && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h3 className="text-xl font-black text-gray-800 flex items-center gap-2 mb-4">
                          <Leaf className="text-blue-500" /> العناية بالشعر
                        </h3>
                        {product.benefitsHair?.map((b, i) => (
                          <div key={i} className="flex items-start gap-4 p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50">
                            <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <CheckCircle2 size={14} className="text-white" />
                            </div>
                            <span className="text-gray-700 font-bold leading-relaxed">{b}</span>
                          </div>
                        ))}
                      </div>
                      <div className="bg-blue-900 rounded-[2rem] p-8 text-white shadow-xl">
                        <h4 className="font-black mb-4 flex items-center gap-2 text-blue-200">
                          <Star size={18} /> سر الكثافة والقوة
                        </h4>
                        <p className="text-blue-50 leading-loose font-medium">
                          {product.usageHair}
                        </p>
                      </div>
                    </div>
                  )}

                  {/* تاب المكونات */}
                  {activeTab === 'ingredients' && (
                    <div className="bg-gray-50 rounded-[2.5rem] p-8 sm:p-12">
                      <h3 className="text-2xl font-black text-gray-800 text-center mb-10">المكونات الطبيعية</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {product.ingredients?.map((item, i) => (
                          <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-[1.5rem] border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center text-green-600 flex-shrink-0">
                              <Leaf size={24} />
                            </div>
                            <span className="font-black text-gray-700">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* تاب عن المنتج */}
                  {activeTab === 'info' && (
                    <div className="max-w-3xl mx-auto text-center space-y-6">
                      <div className="inline-flex p-4 bg-blue-50 rounded-full text-blue-600 mb-4">
                        <Info size={32} />
                      </div>
                      <h3 className="text-2xl font-black text-gray-800">تفاصيل إضافية</h3>
                      <p className="text-gray-600 text-lg leading-relaxed font-medium">
                        {product.info}
                      </p>
                      {product.usage && (
                        <div className="mt-8 p-6 bg-yellow-50 rounded-2xl border border-yellow-100 text-yellow-900 inline-block text-right">
                          <span className="font-black block mb-2 underline">نصيحة ذهبية:</span>
                          <p className="font-bold">{product.usage}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* تاب الفوائد العامة */}
                  {activeTab === 'benefits' && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {product.benefits?.map((benefit, i) => (
                        <div key={i} className="flex items-center gap-4 bg-green-50/50 p-6 rounded-2xl border border-green-100/50">
                          <CheckCircle2 size={24} className="text-green-600 flex-shrink-0" />
                          <p className="text-green-900 font-bold">{benefit}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* تاب التحذيرات */}
                  {activeTab === 'warnings' && (
                    <div className="max-w-2xl mx-auto">
                      <div className="bg-red-50 rounded-[2rem] p-8 border border-red-100">
                        <div className="flex items-center gap-3 text-red-600 mb-6 justify-center">
                          <AlertCircle size={32} />
                          <h3 className="text-xl font-black">تعليمات السلامة</h3>
                        </div>
                        <div className="space-y-4">
                          {product.warnings?.map((w, i) => (
                            <div key={i} className="flex items-center gap-3 text-red-800 bg-white/50 p-4 rounded-xl">
                              <div className="w-2 h-2 rounded-full bg-red-400"></div>
                              <span className="font-bold">{w}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;