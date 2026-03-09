import React, { useState, useCallback, useMemo } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send, Truck, Package, Clock, ChevronDown } from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG } from '../data/config';
import { Badge, LoadingSpinner, EmptyState, ConfirmModal } from '../components/common';

const MIN_NAME_LENGTH = 5;
const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRESS_LENGTH = 500;
const SUBMIT_RATE_LIMIT = 5000;
const MAX_QUANTITY_PER_ITEM = 100;
const MIN_QUANTITY = 1;
const MIN_DEPOSIT = 50;

// جدول أسعار الشحن حسب المحافظة
const SHIPPING_PRICES = {
  // 60 جنيه
  60: ['cairo', 'giza', 'qalioubia'],
  // 65 جنيه
  65: ['sharqia', 'kafr_elsheikh', 'suez', 'port_said', 'beheira', 'damietta', 'dakahlia', 'gharbia', 'monufia', 'alexandria'],
  // 75 جنيه
  75: ['assiut', 'minya', 'fayoum', 'beni_suef', 'ismailia'],
  // 105 جنيه
  105: ['sohag', 'qena', 'luxor', 'aswan', 'new_valley'],
  // 115 جنيه
  115: ['north_sinai', 'south_sinai', 'matrouh', 'red_sea']
};

// دالة للحصول على سعر الشحن حسب المحافظة
const getShippingPrice = (governorateId) => {
  for (const [price, governorates] of Object.entries(SHIPPING_PRICES)) {
    if (governorates.includes(governorateId)) {
      return parseInt(price);
    }
  }
  return 60; // السعر الافتراضي
};

const EGYPTIAN_GOVERNORATES = [
  { id: 'cairo', name: 'القاهرة' },
  { id: 'giza', name: 'الجيزة' },
  { id: 'alexandria', name: 'الإسكندرية' },
  { id: 'qalioubia', name: 'القليوبية' },
  { id: 'sharqia', name: 'الشرقية' },
  { id: 'monufia', name: 'المنوفية' },
  { id: 'dakahlia', name: 'الدقهلية' },
  { id: 'damietta', name: 'دمياط' },
  { id: 'beheira', name: 'البحيرة' },
  { id: 'kafr_elsheikh', name: 'كفر الشيخ' },
  { id: 'fayoum', name: 'الفيوم' },
  { id: 'beni_suef', name: 'بني سويف' },
  { id: 'minya', name: 'المنيا' },
  { id: 'assiut', name: 'أسيوط' },
  { id: 'sohag', name: 'سوهاج' },
  { id: 'qena', name: 'قنا' },
  { id: 'luxor', name: 'الأقصر' },
  { id: 'aswan', name: 'أسوان' },
  { id: 'red_sea', name: 'البحر الأحمر' },
  { id: 'new_valley', name: 'الوادي الجديد' },
  { id: 'north_sinai', name: 'شمال سيناء' },
  { id: 'south_sinai', name: 'جنوب سيناء' },
  { id: 'port_said', name: 'بورسعيد' },
  { id: 'ismailia', name: 'الإسماعيلية' },
  { id: 'suez', name: 'السويس' },
  { id: 'matrouh', name: 'مطروح' },
  { id: 'gharbia', name: 'الغربية' }
];

const PAYMENT_METHODS = {
  vodafone: {
    id: 'vodafone',
    name: 'فودافون كاش',
    icon: '📱',
    number: '01016993805',
    color: 'red'
  },
  instapay: {
    id: 'instapay',
    name: 'إنستا باي',
    icon: '💳',
    link: 'https://ipn.eg/S/seifbank/instapay/2llVSu',
    username: 'seifbank',
    color: 'blue',
    buttonText: 'اضغط لإرسال النقود'
  },
  cash: {
    id: 'cash',
    name: 'الدفع عند الاستلام',
    icon: '💵',
    color: 'green'
  }
};

const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  return text.replace(/[<>"'`]/g, '').replace(/\n{2,}/g, '\n').trim().substring(0, 1000);
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
  const [shippingPrice, setShippingPrice] = useState(60);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    phoneAlt: '',
    governorate: '',
    address: '',
    notes: '',
    paymentMethod: '',
    depositAmount: ''
  });

  const cartTotal = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }, [state.cart]);

  // حساب الديبوزت (فقط للدفع عند الاستلام)
  const deposit = formData.paymentMethod === 'cash' 
    ? Math.max(parseInt(formData.depositAmount) || 0, 0)
    : 0;

  // الإجمالي = المنتجات + الشحن - الديبوزت (الديبوزت يتخصم)
  const finalTotal = Math.max(cartTotal + shippingPrice - deposit, 0);
  const remainingAfterDeposit = Math.max(finalTotal, 0);

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

  const handleGovernorateChange = (governorateId) => {
    setFormData({...formData, governorate: governorateId});
    setGovernorateOpen(false);
    
    // حساب سعر الشحن الجديد
    const newPrice = getShippingPrice(governorateId);
    setShippingPrice(newPrice);
  };

  const validateForm = useCallback(() => {
    const newErrors = {};

    const fullName = formData.fullName?.trim();
    if (!fullName || fullName.length < MIN_NAME_LENGTH) {
      newErrors.fullName = `الاسم يجب أن يكون ${MIN_NAME_LENGTH} أحرف على الأقل`;
    }

    const phone = formData.phone?.trim();
    if (!phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 01012345678)';
    }

    // التحقق من رقم الهاتف الثاني (اختياري لكن يجب أن يكون صحيح إن وجد)
    if (formData.phoneAlt?.trim() && !validatePhone(formData.phoneAlt)) {
      newErrors.phoneAlt = 'رقم الهاتف الثاني غير صحيح';
    }

    if (!formData.governorate) {
      newErrors.governorate = 'يرجى اختيار محافظة';
    }

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'يرجى اختيار طريقة الدفع';
    }

    // التحقق من الديبوزت
    if (formData.paymentMethod === 'cash') {
      const depositAmount = parseInt(formData.depositAmount) || 0;
      if (!formData.depositAmount || depositAmount < MIN_DEPOSIT) {
        newErrors.depositAmount = `الحد الأدنى للديبوزت ${MIN_DEPOSIT} جنيه`;
      }
      if (depositAmount > (cartTotal + shippingPrice)) {
        newErrors.depositAmount = 'الديبوزت لا يمكن أن يزيد عن الإجمالي';
      }
    }

    const address = formData.address?.trim();
    if (!address || address.length < MIN_ADDRESS_LENGTH) {
      newErrors.address = `العنوان يجب أن يكون ${MIN_ADDRESS_LENGTH} أحرف على الأقل`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, cartTotal, shippingPrice]);

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
      const fullName = sanitizeText(formData.fullName);
      const phone = formData.phone.trim();
      const phoneAlt = formData.phoneAlt?.trim() || '-';
      const governorateName = EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.name || formData.governorate;
      const address = sanitizeText(formData.address);
      const notes = sanitizeText(formData.notes);
      
      const paymentMethodData = PAYMENT_METHODS[formData.paymentMethod];

      // رسالة مبسطة ومنظمة
      let message = `📦 *طلب جديد - ${SITE_CONFIG.name}*\n\n`;
      
      message += `👤 *البيانات*\n`;
      message += `الاسم: ${fullName}\n`;
      message += `الهاتف: ${phone}\n`;
      message += `هاتف آخر: ${phoneAlt}\n`;
      message += `المحافظة: ${governorateName}\n`;
      message += `العنوان: ${address}\n\n`;
      
      message += `🛍️ *المنتجات*\n`;
      state.cart.forEach((item) => {
        message += `• ${item.name} - ${item.quantity}x (${item.price * item.quantity} ج)\n`;
      });
      
      message += `\n💰 *الإجمالي*\n`;
      message += `المنتجات: ${cartTotal} ج\n`;
      message += `الشحن: ${shippingPrice} ج\n`;
      if (deposit > 0) {
        message += `الديبوزت: -${deposit} ج\n`;
      }
      message += `*الإجمالي: ${cartTotal + shippingPrice} ج*\n\n`;

      // طريقة الدفع
      if (formData.paymentMethod === 'vodafone') {
        message += `💳 *فودافون كاش*\n`;
        message += `الرقم: ${paymentMethodData.number}\n`;
        message += `⚠️ ارسل صورة الإيصال بعد التحويل\n`;
      } else if (formData.paymentMethod === 'instapay') {
        message += `💳 *إنستا باي*\n`;
        message += `المعرف: ${paymentMethodData.username}\n`;
        message += `⚠️ ارسل صورة الإيصال بعد التحويل\n`;
      } else if (formData.paymentMethod === 'cash') {
        message += `💵 *الدفع عند الاستلام*\n`;
        if (deposit > 0) {
          message += `الديبوزت المدفوع: ${deposit} ج\n`;
          message += `المتبقي عند الاستلام: ${remainingAfterDeposit} ج\n`;
          message += `⚠️ الرجاء إرسال اسكرين شوت تأكيد الديبوزت\n`;
        }
      }

      if (notes) {
        message += `\n📝 ملاحظات: ${notes}\n`;
      }

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
      
      // تحذير للدفع الإلكتروني
      if (formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { 
            message: 'تذكر: أرسل صورة الإيصال على واتساب بعد التحويل!', 
            type: 'warning' 
          }
        });
      }

      // تحذير للديبوزت
      if (formData.paymentMethod === 'cash' && deposit > 0) {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { 
            message: 'لا تنسى إرسال اسكرين شوت الديبوزت!', 
            type: 'warning' 
          }
        });
      }
      
      // فتح واتساب
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
      
      // حفظ بيانات الطلب
      dispatch({
        type: 'SET_LAST_ORDER',
        payload: {
          orderNumber: `ORD-${Date.now()}`,
          date: new Date().toLocaleDateString('ar-EG'),
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          items: [...state.cart],
          total: finalTotal,
          cartSubtotal: cartTotal,
          shippingPrice: shippingPrice,
          deposit: deposit,
          customerName: fullName,
          customerPhone: phone,
          paymentMethod: paymentMethodData.name,
          needsPaymentProof: formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay'
        }
      });
      
      // مسح السلة
      dispatch({ type: 'CLEAR_CART' });
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'تم إرسال الطلب عبر واتساب بنجاح!', type: 'success' }
      });
      
      setIsCheckout(false);
      setFormData({ 
        fullName: '', 
        phone: '', 
        phoneAlt: '',
        governorate: '', 
        address: '', 
        notes: '', 
        paymentMethod: '',
        depositAmount: ''
      });
      setLastSubmit(Date.now());
      
      setTimeout(() => {
        navigateTo('order-success');
      }, 500);
      
    } catch (error) {
      console.error('Checkout error:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'حدث خطأ. يرجى المحاولة مرة أخرى', type: 'error' }
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, state, dispatch, validateForm, lastSubmit, cartTotal, finalTotal, shippingPrice, deposit, remainingAfterDeposit, navigateTo]);

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
        <div className="mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4 mb-4">
            <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-2xl shadow-lg">
              <ShoppingCart className="text-white" size={28} />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-green-600 to-teal-600 bg-clip-text text-transparent">
                سلة التسوق
              </h1>
            </div>
            <Badge variant="success">{state.cart.length} منتج</Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map((item) => (
              <div 
                key={item.id} 
                className="bg-white p-4 md:p-5 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200 group"
              >
                <div className="flex gap-3 md:gap-4">
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
                    <div className={`text-3xl md:text-4xl ${item.image && item.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
                      {item.imageAlt || '🌿'}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm md:text-base font-bold text-gray-800 truncate">
                          {item.name}
                        </h3>
                        <p className="text-xs text-green-600 font-bold">{item.price} ج</p>
                      </div>
                      <button
                        onClick={() => setItemToDelete(item)}
                        className="text-red-500 hover:bg-red-50 p-2 rounded-lg transition-all"
                        aria-label="حذف"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    
                    <div className="flex items-center justify-between mt-3 pt-3 border-t-2 border-gray-100">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="font-bold text-green-600 w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-lg bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-all"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="text-right">
                        <p className="font-bold text-green-600">
                          {item.price * item.quantity} ج
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × {item.price}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 md:p-6 rounded-2xl shadow-xl h-fit lg:sticky lg:top-24 border-2 border-gray-100">
            <h2 className="text-lg md:text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              <Package size={20} className="text-green-600" />
              الملخص
            </h2>
            
            {!isCheckout ? (
              <>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600 text-sm">المنتجات:</span>
                    <span className="font-bold text-lg text-gray-800">{cartTotal} ج</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t">
                    <span className="text-gray-600 text-sm">الشحن:</span>
                    <span className="font-bold text-lg text-orange-600">{shippingPrice} ج</span>
                  </div>
                  <div className="flex justify-between pt-3 border-t-2 border-gray-300">
                    <span className="text-gray-800 font-bold">الإجمالي:</span>
                    <span className="font-bold text-xl text-green-600">{cartTotal + shippingPrice} ج</span>
                  </div>
                </div>

                <button
                  onClick={() => setIsCheckout(true)}
                  className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-3 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg"
                >
                  متابعة الطلب
                </button>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center gap-2 p-2 bg-green-50 rounded-lg text-xs text-green-700">
                    <Truck size={14} />
                    توصيل آمن
                  </div>
                  <div className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg text-xs text-blue-700">
                    <Clock size={14} />
                    24-48 ساعة
                  </div>
                </div>
              </>
            ) : (
              <form onSubmit={(e) => { e.preventDefault(); handleCheckout(); }} className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">الاسم ثلاثي *</label>
                  <input
                    type="text"
                    placeholder="الرجاء ادخال الاسم ثلاثي"
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    maxLength={100}
                    className={`w-full p-2 border-2 rounded-lg text-sm ${errors.fullName ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">الهاتف *</label>
                  <input
                    type="tel"
                    placeholder="01012345678"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className={`w-full p-2 border-2 rounded-lg text-sm ${errors.phone ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">رقم هاتف آخر (مهم) *</label>
                  <input
                    type="tel"
                    placeholder="01012345678"
                    value={formData.phoneAlt}
                    onChange={(e) => setFormData({...formData, phoneAlt: e.target.value})}
                    className={`w-full p-2 border-2 rounded-lg text-sm ${errors.phoneAlt ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.phoneAlt && <p className="text-red-500 text-xs mt-1">{errors.phoneAlt}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">المحافظة *</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setGovernorateOpen(!governorateOpen)}
                      className={`w-full p-2 border-2 rounded-lg text-right text-sm flex items-center justify-between ${errors.governorate ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                    >
                      <ChevronDown size={16} className={`transition-transform ${governorateOpen ? 'rotate-180' : ''}`} />
                      <span>{formData.governorate ? EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.name : 'اختر'}</span>
                    </button>
                    
                    {governorateOpen && (
                      <div className="absolute top-full right-0 left-0 mt-1 bg-white border-2 border-gray-200 rounded-lg shadow-lg z-50 max-h-40 overflow-y-auto">
                        {EGYPTIAN_GOVERNORATES.map((gov) => (
                          <button
                            key={gov.id}
                            type="button"
                            onClick={() => handleGovernorateChange(gov.id)}
                            className={`w-full p-2 text-right text-sm hover:bg-green-50 transition-all border-b last:border-b-0 ${formData.governorate === gov.id ? 'bg-green-100 font-bold' : ''}`}
                          >
                            {gov.name}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">العنوان *</label>
                  <textarea
                    placeholder="الشارع، المنطقة..."
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    rows="2"
                    maxLength={MAX_ADDRESS_LENGTH}
                    className={`w-full p-2 border-2 rounded-lg text-sm ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ملاحظات</label>
                  <textarea
                    placeholder="أي ملاحظات إضافية..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="2"
                    maxLength={500}
                    className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-2">طريقة الدفع *</label>
                  <div className="space-y-2">
                    {/* فودافون كاش */}
                    <div 
                      onClick={() => setFormData({...formData, paymentMethod: 'vodafone'})}
                      className={`p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.paymentMethod === 'vodafone' 
                          ? 'border-red-500 bg-red-50' 
                          : 'border-gray-200 hover:border-red-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === 'vodafone' ? 'border-red-500' : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === 'vodafone' && (
                            <div className="w-2 h-2 rounded-full bg-red-500"></div>
                          )}
                        </div>
                        <span className="font-bold text-sm">{PAYMENT_METHODS.vodafone.icon} {PAYMENT_METHODS.vodafone.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 mr-6">الرقم: {PAYMENT_METHODS.vodafone.number}</p>
                    </div>

                    {/* إنستا باي */}
                    <div 
                      onClick={() => setFormData({...formData, paymentMethod: 'instapay'})}
                      className={`p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.paymentMethod === 'instapay' 
                          ? 'border-blue-500 bg-blue-50' 
                          : 'border-gray-200 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === 'instapay' ? 'border-blue-500' : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === 'instapay' && (
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                          )}
                        </div>
                        <span className="font-bold text-sm">{PAYMENT_METHODS.instapay.icon} {PAYMENT_METHODS.instapay.name}</span>
                      </div>
                      <p className="text-xs text-gray-600 mr-6">المعرف: {PAYMENT_METHODS.instapay.username}</p>
                      <p className="text-xs text-blue-600 font-bold mt-2 mr-6">🔗 {PAYMENT_METHODS.instapay.buttonText}</p>
                      <a
                        href={PAYMENT_METHODS.instapay.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-blue-600 hover:text-blue-800 font-bold mt-1 mr-6 inline-block hover:underline"
                      >
                        اضغط هنا لفتح الرابط →
                      </a>
                    </div>

                    {/* الدفع عند الاستلام */}
                    <div 
                      onClick={() => setFormData({...formData, paymentMethod: 'cash'})}
                      className={`p-3 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.paymentMethod === 'cash' 
                          ? 'border-green-500 bg-green-50' 
                          : 'border-gray-200 hover:border-green-300'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                          formData.paymentMethod === 'cash' ? 'border-green-500' : 'border-gray-300'
                        }`}>
                          {formData.paymentMethod === 'cash' && (
                            <div className="w-2 h-2 rounded-full bg-green-500"></div>
                          )}
                        </div>
                        <span className="font-bold text-sm">{PAYMENT_METHODS.cash.icon} {PAYMENT_METHODS.cash.name}</span>
                      </div>
                    </div>
                  </div>
                  {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod}</p>}
                </div>

                {/* حقل الديبوزت - يظهر فقط عند اختيار الدفع عند الاستلام */}
                {formData.paymentMethod === 'cash' && (
                  <div className="bg-green-50 border-2 border-green-200 rounded-xl p-3 space-y-2">
                    <label className="block text-xs font-bold text-gray-700">
                      💰 قيمة الديبوزت (الحد الأدنى {MIN_DEPOSIT} ج) *
                    </label>
                    <input
                      type="number"
                      placeholder="أدخل المبلغ"
                      value={formData.depositAmount}
                      onChange={(e) => setFormData({...formData, depositAmount: e.target.value})}
                      min={MIN_DEPOSIT}
                      className={`w-full p-2 border-2 rounded-lg text-sm ${
                        formData.depositAmount && parseInt(formData.depositAmount) < MIN_DEPOSIT
                          ? 'border-yellow-400 bg-yellow-50'
                          : 'border-green-300 bg-white'
                      }`}
                    />
                    {formData.depositAmount && parseInt(formData.depositAmount) < MIN_DEPOSIT && (
                      <p className="text-yellow-700 text-xs font-bold">⚠️ الحد الأدنى للديبوزت {MIN_DEPOSIT} جنيه</p>
                    )}
                    {errors.depositAmount && <p className="text-red-500 text-xs">{errors.depositAmount}</p>}
                    
                    {/* ملخص الديبوزت والإجمالي */}
                    {formData.depositAmount && (
                      <div className="bg-white border-2 border-green-300 rounded-lg p-2 space-y-1">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">المنتجات:</span>
                          <span className="font-bold text-gray-800">{cartTotal} ج</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-600">الشحن:</span>
                          <span className="font-bold text-gray-800">{shippingPrice} ج</span>
                        </div>
                        <div className="flex justify-between text-xs border-t pt-1">
                          <span className="text-green-700 font-bold">الإجمالي قبل الديبوزت:</span>
                          <span className="font-bold text-green-700">{cartTotal + shippingPrice} ج</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-orange-700 font-bold">الديبوزت المدفوع:</span>
                          <span className="font-bold text-orange-700">-{deposit} ج</span>
                        </div>
                        <div className="flex justify-between text-sm border-t-2 border-green-400 pt-1">
                          <span className="text-green-800 font-bold">المتبقي عند الاستلام:</span>
                          <span className="font-bold text-green-600">{remainingAfterDeposit} ج</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* ملخص بسيط للطرق الأخرى */}
                {formData.paymentMethod && formData.paymentMethod !== 'cash' && (
                  <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-3 space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">المنتجات:</span>
                      <span className="font-bold text-gray-800">{cartTotal} ج</span>
                    </div>
                    <div className="flex justify-between text-xs">
                      <span className="text-gray-600">الشحن:</span>
                      <span className="font-bold text-gray-800">{shippingPrice} ج</span>
                    </div>
                    <div className="flex justify-between text-sm border-t-2 border-gray-400 pt-1">
                      <span className="text-gray-800 font-bold">الإجمالي:</span>
                      <span className="font-bold text-green-600">{cartTotal + shippingPrice} ج</span>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsCheckout(false);
                      setErrors({});
                    }}
                    className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-xl font-bold hover:bg-gray-200 transition-all text-sm"
                  >
                    رجوع
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-xl font-bold hover:from-green-700 hover:to-teal-700 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size={16} />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={16} />
                        إتمام الطلب
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        title="حذف المنتج"
        message={
          <div>
            <p>هل أنت متأكد من حذف</p>
            <p className="font-bold text-red-600 mt-1">"{itemToDelete?.name}"</p>
            <p>من السلة؟</p>
          </div>
        }
        confirmLabel="حذف"
        cancelLabel="إلغاء"
        onConfirm={confirmDelete}
        onCancel={() => setItemToDelete(null)}
        type="danger"
      />
    </div>
  );
};

export default CartPage;gi