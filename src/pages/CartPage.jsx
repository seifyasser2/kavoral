import React, { useState, useCallback, useMemo } from 'react';
import { ShoppingCart, Plus, Minus, Trash2, Send, Truck, Package, Clock, Check, AlertCircle, ChevronDown } from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG } from '../data/config';
import { Badge, LoadingSpinner, EmptyState, ConfirmModal } from '../components/common';

const MIN_NAME_LENGTH = 3;
const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRESS_LENGTH = 500;
const SUBMIT_RATE_LIMIT = 5000;
const MAX_QUANTITY_PER_ITEM = 100;
const MIN_QUANTITY = 1;
const FREE_SHIPPING_THRESHOLD = 1000;

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
  { id: 'matrouh', name: 'مطروح', emoji: '🏜️' },
  { id: 'gharbia', name: 'الغربية', emoji: '🧵' }
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
    link: 'https://ipn.eg/S/seifbank2/instapay/3pDl2F',
    username: 'seifbank2@instapay',
    color: 'blue'
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
    notes: '',
    paymentMethod: ''
  });

  const cartTotal = useMemo(() => {
    return state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
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

    if (!formData.paymentMethod) {
      newErrors.paymentMethod = 'يرجى اختيار طريقة الدفع';
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
      const fullName = `${firstName} ${lastName}`;
      
      const paymentMethodData = PAYMENT_METHODS[formData.paymentMethod];
      const paymentMethodText = `${paymentMethodData.icon} ${paymentMethodData.name}`;

      const orderNumber = `ORD-${Date.now()}`;

      // ✅ رسالة واتساب - التركيز الوحيد
      let message = `🛒 *طلب جديد من ${SITE_CONFIG.name}*\n\n`;
      message += `📝 *بيانات العميل:*\n`;
      message += `الاسم: *${fullName}*\n`;
      message += `التليفون: *${phone}*\n`;
      message += `المحافظة: *${governorateName}*\n`;
      message += `العنوان: *${address}*\n`;
      message += `طريقة الدفع: *${paymentMethodText}*\n`;
      
      if (formData.paymentMethod === 'vodafone') {
        message += `📱 *الرقم للتحويل:* ${PAYMENT_METHODS.vodafone.number}\n`;
      } else if (formData.paymentMethod === 'instapay') {
        message += `💳 *المعرف للتحويل:* ${PAYMENT_METHODS.instapay.username}\n`;
      }
      
      if (notes) {
        message += `📌 الملاحظات: ${notes}\n`;
      }
      
      message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `🛍️ *تفاصيل الطلب:*\n\n`;
      
      state.cart.forEach((item, index) => {
        message += `${index + 1}. *${item.name}*\n`;
        message += `   📏 الحجم: ${item.size}\n`;
        message += `   🔢 الكمية: ${item.quantity}\n`;
        message += `   💵 السعر: ${item.price} جنيه\n`;
        message += `   💰 المجموع: *${item.price * item.quantity} جنيه*\n\n`;
      });

      message += `━━━━━━━━━━━━━━━━━━━━━\n`;
      message += `\n💰 *الإجمالي الكلي: ${cartTotal} جنيه*\n\n`;
      
      // ⚠️ تنبيه مهم للدفع الإلكتروني
      if (formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay') {
        message += `⚠️ *مهم جداً:*\n`;
        message += `📸 يرجى إرسال *صورة إيصال الدفع* بعد هذه الرسالة مباشرة\n`;
        message += `✅ لن يتم تأكيد الطلب إلا بعد استلام الإيصال\n\n`;
      }
      
      message += `📦 *رقم الطلب:* ${orderNumber}\n`;
      message += `📅 التاريخ: ${new Date().toLocaleDateString('ar-EG')}\n`;
      message += `🕐 الوقت: ${new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}\n\n`;
      message += `🌿 شكراً لاختيارك ${SITE_CONFIG.name}\n`;
      message += `📞 سيتم التواصل معك قريباً لتأكيد الطلب`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
      
      // ⚠️ تنبيه قوي للعميل قبل الإرسال
      if (formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay') {
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { 
            message: '⚠️ مهم: بعد الإرسال، يجب إرسال صورة إيصال الدفع على واتساب فوراً!', 
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
      
      // ✅ حفظ بيانات الطلب محلياً فقط (localStorage)
      dispatch({
        type: 'SET_LAST_ORDER',
        payload: {
          orderNumber: orderNumber,
          date: new Date().toLocaleDateString('ar-EG'),
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          items: [...state.cart],
          total: cartTotal,
          customerName: fullName,
          customerPhone: phone,
          paymentMethod: paymentMethodText,
          needsPaymentProof: formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay'
        }
      });
      
      // مسح السلة
      dispatch({ type: 'CLEAR_CART' });
      
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: '✅ تم إرسال الطلب عبر واتساب بنجاح!', type: 'success' }
      });
      
      setIsCheckout(false);
      setFormData({ 
        firstName: '', 
        lastName: '', 
        phone: '', 
        governorate: '', 
        address: '', 
        notes: '', 
        paymentMethod: '' 
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
  }, [formData, state, dispatch, validateForm, lastSubmit, cartTotal, navigateTo]);

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
            {cartTotal < FREE_SHIPPING_THRESHOLD && (
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                <Truck size={20} />
                <div className="flex-1">
                  <p className="font-bold text-sm">أضف {FREE_SHIPPING_THRESHOLD - cartTotal} ج للشحن المجاني!</p>
                </div>
              </div>
            )}

            {cartTotal >= FREE_SHIPPING_THRESHOLD && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                <Check size={20} />
                <p className="font-bold text-sm">🎉 شحن مجاني</p>
              </div>
            )}

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
                        <p className="text-xs text-gray-500">{item.size}</p>
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
                    <span className="text-gray-600 text-sm">الإجمالي:</span>
                    <span className="font-bold text-lg text-gray-800">{cartTotal} ج</span>
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
                  <label className="block text-xs font-bold text-gray-700 mb-1">الاسم الأول *</label>
                  <input
                    type="text"
                    placeholder="أحمد"
                    value={formData.firstName}
                    onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    maxLength={50}
                    className={`w-full p-2 border-2 rounded-lg text-sm ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.firstName && <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">الاسم الأخير *</label>
                  <input
                    type="text"
                    placeholder="محمد"
                    value={formData.lastName}
                    onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    maxLength={50}
                    className={`w-full p-2 border-2 rounded-lg text-sm ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.lastName && <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>}
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
                            onClick={() => {
                              setFormData({...formData, governorate: gov.id});
                              setGovernorateOpen(false);
                            }}
                            className={`w-full p-2 text-right text-sm hover:bg-green-50 transition-all border-b last:border-b-0 ${formData.governorate === gov.id ? 'bg-green-100 font-bold' : ''}`}
                          >
                            {gov.emoji} {gov.name}
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
                      {formData.paymentMethod === 'vodafone' && (
                        <div className="mt-2 mr-6 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                          <p className="text-xs text-yellow-800 font-bold flex items-center gap-1">
                            <AlertCircle size={12} />
                            ⚠️ يجب إرسال صورة الإيصال على واتساب بعد التحويل
                          </p>
                        </div>
                      )}
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
                      <a 
                        href={PAYMENT_METHODS.instapay.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="text-xs text-blue-600 underline mr-6 hover:text-blue-800 inline-block mt-1"
                      >
                        اضغط هنا للدفع
                      </a>
                      {formData.paymentMethod === 'instapay' && (
                        <div className="mt-2 mr-6 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                          <p className="text-xs text-yellow-800 font-bold flex items-center gap-1">
                            <AlertCircle size={12} />
                            ⚠️ يجب إرسال صورة الإيصال على واتساب بعد الدفع
                          </p>
                        </div>
                      )}
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

                {/* ⚠️ تحذير نهائي قبل الإرسال */}
                {(formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay') && (
                  <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-4">
                    <div className="flex items-start gap-3">
                      <AlertCircle size={24} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <h3 className="font-bold text-yellow-900 text-sm mb-2">📸 تنبيه مهم جداً:</h3>
                        <ul className="text-xs text-yellow-800 space-y-1">
                          <li className="flex items-start gap-1">
                            <span className="font-bold">1️⃣</span>
                            <span>بعد الضغط على "إتمام الطلب" سيفتح واتساب</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="font-bold">2️⃣</span>
                            <span>قم بالتحويل للرقم/المعرف المذكور أعلاه</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="font-bold">3️⃣</span>
                            <span className="font-bold text-red-600">أرسل صورة إيصال الدفع فوراً على واتساب</span>
                          </li>
                          <li className="flex items-start gap-1">
                            <span className="font-bold">4️⃣</span>
                            <span>الطلب لن يتم تأكيده إلا بعد استلام الإيصال</span>
                          </li>
                        </ul>
                      </div>
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

export default CartPage;