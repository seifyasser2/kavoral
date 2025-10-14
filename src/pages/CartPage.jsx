import React, { useState, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Send, User, 
  Truck, MessageCircle, Package, Phone,
  MapPin, Clock, Check, AlertCircle, ChevronDown, Sparkles
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG, calculateShipping, isEligibleForFreeShipping, getRemainingForFreeShipping } from '../data/config';
import { Badge, LoadingSpinner, EmptyState, ConfirmModal } from '../components/common';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRESS_LENGTH = 500;
const SUBMIT_RATE_LIMIT = 5000;
const MAX_QUANTITY_PER_ITEM = 100;
const MIN_QUANTITY = 1;

const EGYPTIAN_GOVERNORATES = [
  { id: 'cairo', name: 'القاهرة', emoji: '🏙️' },
  { id: 'giza', name: 'الجيزة', emoji: '🗿' },
  { id: 'alexandria', name: 'الإسكندرية', emoji: '🌊' },
  { id: 'qalioubia', name: 'القليوبية', emoji: '🏡' },
  { id: 'sharqia', name: 'الشرقية', emoji: '🏜️' },
  { id: 'monufia', name: 'المنوفية', emoji: '🌾' },
  { id: 'dakahlia', name: 'الدقهلية', emoji: '🌳' },
  { id: 'damietta', name: 'دمياط', emoji: '🐟' },
  { id: 'beheira', name: 'البحيرة', emoji: '💧' },
  { id: 'kafr_elsheikh', name: 'كفر الشيخ', emoji: '🌾' },
  { id: 'fayoum', name: 'الفيوم', emoji: '💎' },
  { id: 'beni_suef', name: 'بني سويف', emoji: '⛰️' },
  { id: 'minya', name: 'المنيا', emoji: '🏛️' },
  { id: 'assiut', name: 'أسيوط', emoji: '🗻' },
  { id: 'sohag', name: 'سوهاج', emoji: '🏺' },
  { id: 'qena', name: 'قنا', emoji: '⚱️' },
  { id: 'luxor', name: 'الأقصر', emoji: '🏛️' },
  { id: 'aswan', name: 'أسوان', emoji: '☀️' },
  { id: 'red_sea', name: 'البحر الأحمر', emoji: '🏖️' },
  { id: 'new_valley', name: 'الوادي الجديد', emoji: '🏜️' },
  { id: 'north_sinai', name: 'شمال سيناء', emoji: '⛰️' },
  { id: 'south_sinai', name: 'جنوب سيناء', emoji: '🏝️' },
  { id: 'port_said', name: 'بورسعيد', emoji: '⚓' },
  { id: 'ismailia', name: 'الإسماعيلية', emoji: '🌉' },
  { id: 'suez', name: 'السويس', emoji: '🚢' },
  { id: 'matrouh', name: 'مطروح', emoji: '🏜️' }
];

const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/[<>\"'`]/g, '').replace(/\n{2,}/g, '\n').trim().substring(0, 1000);
};

const validatePhone = (phone) => {
  const phoneRegex = /^(\+?20|0)?1[0125]\d{8}$/;
  return phoneRegex.test(phone?.trim());
};

const validateQuantity = (quantity) => {
  return Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY_PER_ITEM, quantity));
};

const CartPage = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [lastSubmit, setLastSubmit] = useState(0);
  const [governorateOpen, setGovernorateOpen] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    governorate: '',
    address: '',
    notes: ''
  });

  const cartTotals = useMemo(() => {
    const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = calculateShipping(total);
    const finalTotal = total + shipping;
    const remaining = getRemainingForFreeShipping(total);
    
    return { total, shipping, finalTotal, remaining };
  }, [state.cart]);

  const updateCartQuantity = useCallback((id, quantity) => {
    const validatedQuantity = validateQuantity(quantity);
    if (validatedQuantity <= 0) {
      const item = state.cart.find(i => i.id === id);
      setItemToDelete(item);
    } else {
      dispatch({ 
        type: 'UPDATE_CART_QUANTITY', 
        payload: { id, quantity: validatedQuantity } 
      });
    }
  }, [state.cart, dispatch]);

  const confirmDelete = useCallback(() => {
    if (itemToDelete) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemToDelete.id });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: `تم حذف ${itemToDelete.name} من السلة`, type: 'info' }
      });
      setItemToDelete(null);
    }
  }, [itemToDelete, dispatch]);

  const validateForm = useCallback(() => {
    const newErrors = {};

    const firstName = formData.firstName?.trim();
    if (!firstName || firstName.length < MIN_NAME_LENGTH) {
      newErrors.firstName = `الاسم الأول يجب أن يكون ${MIN_NAME_LENGTH} أحرف على الأقل`;
    }

    const lastName = formData.lastName?.trim();
    if (!lastName || lastName.length < MIN_NAME_LENGTH) {
      newErrors.lastName = `الاسم الأخير يجب أن يكون ${MIN_NAME_LENGTH} أحرف على الأقل`;
    }

    const phone = formData.phone?.trim();
    if (!phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 01012345678)';
    }

    if (!formData.governorate) {
      newErrors.governorate = 'يرجى اختيار محافظة';
    }

    const address = formData.address?.trim();
    if (!address || address.length < MIN_ADDRESS_LENGTH) {
      newErrors.address = `العنوان يجب أن يكون ${MIN_ADDRESS_LENGTH} أحرف على الأقل`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleCheckout = useCallback(async () => {
    const now = Date.now();
    if (now - lastSubmit < SUBMIT_RATE_LIMIT) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى الانتظار قليلاً قبل إرسال طلب آخر', type: 'warning' }
      });
      return;
    }

    if (!validateForm()) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تصحيح الأخطاء في النموذج', type: 'error' }
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const firstName = sanitizeText(formData.firstName);
      const lastName = sanitizeText(formData.lastName);
      const phone = formData.phone.trim();
      const governorateName = EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.name || formData.governorate;
      const address = sanitizeText(formData.address);
      const notes = sanitizeText(formData.notes);

      let message = `🛒 *طلب جديد من ${SITE_CONFIG.name}*\n\n`;
      message += `📝 *بيانات العميل:*\n`;
      message += `الاسم: *${firstName} ${lastName}*\n`;
      message += `التليفون: *${phone}*\n`;
      message += `المحافظة: *${governorateName}*\n`;
      message += `العنوان: *${address}*\n`;
      if (notes) {
        message += `الملاحظات: ${notes}\n`;
      }
      message += `\n🛍️ *تفاصيل الطلب:*\n`;
      message += `━━━━━━━━━━━━━━━━━━━━━\n`;
      
      state.cart.forEach((item, index) => {
        message += `\n${index + 1}. *${item.name}*\n`;
        message += `   الحجم: ${item.size}\n`;
        message += `   الكمية: ${item.quantity}\n`;
        message += `   السعر: ${item.price} جنيه\n`;
        message += `   المجموع: *${item.price * item.quantity} جنيه*\n`;
      });

      message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `\n💰 *ملخص الطلب:*\n`;
      message += `المجموع الفرعي: ${cartTotals.total} جنيه\n`;
      message += `الشحن: ${cartTotals.shipping === 0 ? '🎉 مجاني' : cartTotals.shipping + ' جنيه'}\n`;
      message += `─────────────────────\n`;
      message += `الإجمالي النهائي: *${cartTotals.finalTotal} جنيه*\n\n`;
      message += `🌿 شكراً لاختيارك ${SITE_CONFIG.name}\n`;
      message += `سيتم التواصل معك قريباً`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
      
      const newWindow = window.open(whatsappUrl, '_blank');
      
      if (!newWindow || newWindow.closed) {
        try {
          await navigator.clipboard.writeText(whatsappUrl);
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: { message: 'تم نسخ رابط الواتساب', type: 'info' }
          });
        } catch (e) {
          console.error('Clipboard error:', e);
        }
        setIsSubmitting(false);
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch({ type: 'CLEAR_CART' });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: '✅ تم إرسال الطلب بنجاح! سنتواصل معك قريباً', type: 'success' }
      });
      
      setIsCheckout(false);
      setFormData({ firstName: '', lastName: '', phone: '', governorate: '', address: '', notes: '' });
      setLastSubmit(Date.now());
      
    } catch (error) {
      console.error('Checkout error:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'حدث خطأ. تأكد من اتصالك بالإنترنت', type: 'error' }
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, state, dispatch, validateForm, lastSubmit, cartTotals]);

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4">
          <EmptyState 
            icon={ShoppingCart}
            title="السلة فارغة"
            description="لم تقم بإضافة أي منتجات للسلة بعد. ابدأ التسوق واكتشف مجموعتنا المميزة"
            actionLabel="ابدأ التسوق"
            onAction={() => navigateTo('products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-6 md:mb-8 animate-fade-in-down">
          <div className="flex items-center gap-3 md:gap-4 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-2xl shadow-lg animate-pulse-scale">
              <ShoppingCart className="text-white" size={28} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                سلة التسوق
              </h1>
              <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                <Sparkles size={14} />
                أكمل طلبك بسهولة وأمان
              </p>
            </div>
            <Badge variant="success" className="text-sm md:text-base px-3 md:px-4 py-1.5 md:py-2">{state.cart.length} منتج</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {!isEligibleForFreeShipping(cartTotals.total) ? (
              <div className="bg-gradient-to-r from-blue-500 via-cyan-500 to-blue-500 text-white p-4 md:p-5 rounded-2xl shadow-xl animate-gradient-x">
                <div className="flex items-center gap-3 mb-3">
                  <Truck size={24} className="flex-shrink-0 animate-bounce-gentle" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm md:text-base">أضف {cartTotals.remaining} ج للشحن المجاني! 🎉</p>
                    <p className="text-xs opacity-90">وفّر {SITE_CONFIG.shipping.standardShipping} جنيه</p>
                  </div>
                </div>
                <div className="relative w-full bg-blue-100/30 rounded-full h-3 overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-r from-white/50 to-transparent animate-shimmer-strong"
                  ></div>
                  <div 
                    className="relative bg-gradient-to-r from-white to-blue-100 h-3 rounded-full transition-all duration-700 shadow-lg"
                    style={{ width: `${Math.min((cartTotals.total / 500) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 md:p-5 rounded-2xl shadow-xl flex items-center gap-3 animate-scale-in">
                <div className="bg-white text-green-500 rounded-full p-3 shadow-lg animate-bounce-gentle">
                  <Check size={24} />
                </div>
                <div>
                  <p className="font-bold text-base md:text-lg">شحن مجاني! 🎉</p>
                  <p className="text-sm opacity-90">لقد حصلت على توصيل مجاني</p>
                </div>
              </div>
            )}

            {/* Cart Items */}
            {state.cart.map((item, index) => (
              <div 
                key={item.id} 
                className="bg-white p-4 md:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200 group animate-fade-in-up"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className="flex gap-3 md:gap-4">
                  {/* Product Image */}
                  <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-green-100 to-teal-100 rounded-2xl flex items-center justify-center flex-shrink-0 overflow-hidden shadow-md group-hover:scale-105 transition-transform duration-300">
                    {item.image && item.image.startsWith('http') ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`text-3xl md:text-4xl ${item.image && item.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
                    >
                      {item.imageAlt || item.image || '🌿'}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base lg:text-lg font-bold text-gray-800 truncate group-hover:text-green-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-xs md:text-sm text-gray-500 bg-gray-100 inline-block px-2 py-0.5 rounded-lg mt-1">
                          {item.size}
                        </p>
                      </div>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-xl transition-all duration-300 flex-shrink-0 active:scale-95"
                        aria-label="حذف من السلة"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-gray-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 hover:from-red-50 hover:to-red-100 hover:text-red-600 flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95"
                          aria-label="تقليل الكمية"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 md:w-12 text-center font-bold text-base md:text-lg text-green-600">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 md:w-9 md:h-9 rounded-xl bg-gradient-to-br from-gray-100 to-gray-50 hover:from-green-50 hover:to-green-100 hover:text-green-600 flex items-center justify-center transition-all shadow-sm hover:shadow-md active:scale-95"
                          aria-label="زيادة الكمية"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-base md:text-lg lg:text-xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                          {item.price * item.quantity} ج
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × {item.price} ج
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl h-fit lg:sticky lg:top-24 border-2 border-gray-100">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-2 rounded-xl">
                <Package size={20} className="text-white" />
              </div>
              ملخص الطلب
            </h2>
            
            {!isCheckout ? (
              <>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">المجموع الفرعي:</span>
                    <span className="font-bold text-gray-800 text-lg">{cartTotals.total} ج</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">الشحن:</span>
                    <span className="font-bold">
                      {cartTotals.shipping === 0 ? (
                        <span className="text-green-600 flex items-center gap-1 text-lg">
                          <Check size={18} />
                          مجاني
                        </span>
                      ) : (
                        <span className="text-gray-800 text-lg">{cartTotals.shipping} ج</span>
                      )}
                    </span>
                  </div>
                  
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                  
                  <div className="flex justify-between items-center bg-gradient-to-r from-green-50 to-teal-50 p-4 rounded-xl border-2 border-green-200">
                    <span className="font-bold text-gray-800 text-lg">الإجمالي:</span>
                    <span className="font-bold text-2xl bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      {cartTotals.finalTotal} ج
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckout(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 mb-4"
                >
                  <ShoppingCart size={20} />
                  إتمام الطلب
                </button>

                {/* Trust Badges */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 bg-green-50 rounded-xl border border-green-100">
                    <Truck size={16} className="text-green-600 flex-shrink-0" />
                    <span className="text-sm text-green-700 font-medium">توصيل سريع وآمن</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <Clock size={16} className="text-blue-600 flex-shrink-0" />
                    <span className="text-sm text-blue-700 font-medium">24-48 ساعة</span>
                  </div>
                  <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-xl border border-purple-100">
                    <MessageCircle size={16} className="text-purple-600 flex-shrink-0" />
                    <span className="text-sm text-purple-700 font-medium">دعم فوري</span>
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }} className="space-y-4">
                {/* Form Fields */}
                {/* First Name */}
                <div className="animate-fade-in-right">
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <User size={14} />
                    الاسم الأول *
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: أحمد"
                    value={formData.firstName}
                    onChange={(e) => {
                      setFormData({...formData, firstName: e.target.value});
                      if (errors.firstName) setErrors({...errors, firstName: ''});
                    }}
                    maxLength={MAX_NAME_LENGTH / 2}
                    className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-shake">
                      <AlertCircle size={12} />
                      {errors.firstName}
                    </p>
                  )}
                </div>

                {/* Last Name */}
                <div className="animate-fade-in-right" style={{animationDelay: '50ms'}}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <User size={14} />
                    الاسم الأخير *
                  </label>
                  <input
                    type="text"
                    placeholder="مثال: محمد"
                    value={formData.lastName}
                    onChange={(e) => {
                      setFormData({...formData, lastName: e.target.value});
                      if (errors.lastName) setErrors({...errors, lastName: ''});
                    }}
                    maxLength={MAX_NAME_LENGTH / 2}
                    className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-shake">
                      <AlertCircle size={12} />
                      {errors.lastName}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div className="animate-fade-in-right" style={{animationDelay: '100ms'}}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <Phone size={14} />
                    رقم الهاتف *
                  </label>
                  <input
                    type="tel"
                    placeholder="01012345678"
                    value={formData.phone}
                    onChange={(e) => {
                      setFormData({...formData, phone: e.target.value});
                      if (errors.phone) setErrors({...errors, phone: ''});
                    }}
                    className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${
                      errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-shake">
                      <AlertCircle size={12} />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Governorate */}
                <div className="animate-fade-in-right" style={{animationDelay: '150ms'}}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    المحافظة *
                  </label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setGovernorateOpen(!governorateOpen)}
                      className={`w-full p-3 border-2 rounded-xl text-right flex items-center justify-between transition-all ${
                        errors.governorate ? 'border-red-500 bg-red-50' : 'border-gray-200 hover:border-green-500'
                      }`}
                    >
                      <ChevronDown size={18} className={`transition-transform duration-300 ${governorateOpen ? 'rotate-180' : ''}`} />
                      <span className={formData.governorate ? 'text-gray-800' : 'text-gray-400'}>
                        {formData.governorate 
                          ? `${EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.emoji} ${EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.name}`
                          : 'اختر محافظة'
                        }
                      </span>
                    </button>
                    
                    {governorateOpen && (
                      <>
                        <div 
                          className="fixed inset-0 z-40"
                          onClick={() => setGovernorateOpen(false)}
                        ></div>
                        <div className="absolute top-full right-0 left-0 mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto animate-fade-in-down">
                          {EGYPTIAN_GOVERNORATES.map((gov, index) => (
                            <button
                              key={gov.id}
                              type="button"
                              onClick={() => {
                                setFormData({...formData, governorate: gov.id});
                                setGovernorateOpen(false);
                                if (errors.governorate) setErrors({...errors, governorate: ''});
                              }}
                              className={`w-full p-3 text-right hover:bg-green-50 transition-all border-b border-gray-100 last:border-b-0 flex items-center justify-between animate-fade-in-right ${
                                formData.governorate === gov.id ? 'bg-green-100 text-green-800 font-bold' : ''
                              }`}
                              style={{animationDelay: `${index * 20}ms`}}
                            >
                              <span className="text-2xl">{gov.emoji}</span>
                              <span className="font-medium">{gov.name}</span>
                            </button>
                          ))}
                        </div>
                      </>
                    )}
                  </div>
                  {errors.governorate && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-shake">
                      <AlertCircle size={12} />
                      {errors.governorate}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="animate-fade-in-right" style={{animationDelay: '200ms'}}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <MapPin size={14} />
                    العنوان بالتفصيل *
                  </label>
                  <textarea
                    placeholder="الشارع، المنطقة، أقرب علامة مميزة..."
                    value={formData.address}
                    onChange={(e) => {
                      setFormData({...formData, address: e.target.value});
                      if (errors.address) setErrors({...errors, address: ''});
                    }}
                    rows="3"
                    maxLength={MAX_ADDRESS_LENGTH}
                    className={`w-full p-3 border-2 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all ${
                      errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200 focus:border-green-500'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-xs mt-1.5 flex items-center gap-1 animate-shake">
                      <AlertCircle size={12} />
                      {errors.address}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{formData.address.length}/{MAX_ADDRESS_LENGTH}</p>
                </div>

                {/* Notes */}
                <div className="animate-fade-in-right" style={{animationDelay: '250ms'}}>
                  <label className="block text-sm font-bold text-gray-700 mb-2 flex items-center gap-1">
                    <MessageCircle size={14} />
                    ملاحظات (اختياري)
                  </label>
                  <textarea
                    placeholder="ملاحظات إضافية، معاد مناسب للاستلام..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="2"
                    maxLength={500}
                    className="w-full p-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-all"
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.notes.length}/500</p>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 animate-fade-in-up" style={{animationDelay: '300ms'}}>
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckout(false);
                      setErrors({});
                    }}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl hover:bg-gray-300 transition-all font-bold active:scale-95"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl hover:from-green-700 hover:to-teal-700 transition-all font-bold disabled:opacity-50 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl active:scale-95"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size={18} />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        تأكيد الطلب
                      </>
                    )}
                  </button>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border-2 border-blue-200 animate-fade-in-up" style={{animationDelay: '350ms'}}>
                  <p className="text-xs text-blue-800 flex items-center gap-2 font-medium">
                    <MessageCircle size={16} className="flex-shrink-0" />
                    سيتم توجيهك لواتساب لإتمام وتأكيد الطلب
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {itemToDelete && (
        <ConfirmModal 
          isOpen={true}
          title="⚠️ تأكيد حذف المنتج"
          message={
            <div className="text-right">
              <p className="mb-4 text-gray-700 text-base">هل أنت متأكد من حذف هذا المنتج من السلة؟</p>
              <div className="bg-gradient-to-br from-gray-50 to-white p-4 rounded-xl border-2 border-gray-200 shadow-inner">
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-teal-100 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                    {itemToDelete.image && itemToDelete.image.startsWith('http') ? (
                      <img 
                        src={itemToDelete.image} 
                        alt={itemToDelete.name}
                        className="w-full h-full object-cover rounded-xl"
                      />
                    ) : (
                      <span className="text-3xl">{itemToDelete.imageAlt || itemToDelete.image || '🌿'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 text-base mb-1 truncate">{itemToDelete.name}</p>
                    <p className="text-sm text-gray-600 mb-1">الكمية: {itemToDelete.quantity}</p>
                    <p className="text-base font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                      {itemToDelete.price * itemToDelete.quantity} جنيه
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-4 flex items-center gap-1 justify-center">
                <Sparkles size={12} />
                يمكنك إضافته مرة أخرى في أي وقت
              </p>
            </div>
          }
          confirmLabel="نعم، احذف المنتج"
          cancelLabel="إلغاء"
          onConfirm={confirmDelete}
          onCancel={() => setItemToDelete(null)}
          type="danger"
        />
      )}
    </div>
  );
};

export default CartPage;