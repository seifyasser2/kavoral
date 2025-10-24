import React, { useState, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Send, User, 
  Gift, Truck, MessageCircle, Package, Mail, Phone,
  MapPin, Clock, Check, AlertCircle, X, ChevronDown, Sparkles
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';
import { Badge, LoadingSpinner, EmptyState, ConfirmModal } from '../components/common';
import { sendOrderToGoogleSheets } from '../services/googleSheetsService';

const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
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

    // إنشاء رقم الطلب
    const orderNumber = `ORD-${Date.now()}`;

    // ============================================
    // 1️⃣ حفظ الطلب في Google Sheets أولاً
    // ============================================
    const orderData = {
      orderNumber: orderNumber,
      customerName: fullName,
      phone: phone,
      governorate: governorateName,
      address: address,
      notes: notes,
      items: state.cart.map(item => ({
        name: item.name,
        size: item.size,
        quantity: item.quantity,
        price: item.price
      })),
      total: cartTotal
    };

    console.log('📊 Saving order to Google Sheets...', orderData);

    const sheetsResult = await sendOrderToGoogleSheets(orderData);

    if (!sheetsResult.success) {
      console.warn('⚠️ Failed to save to Google Sheets:', sheetsResult.error);
      // نكمل العملية حتى لو فشل حفظ الشيت (اختياري)
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { 
          message: 'تنبيه: لم يتم حفظ الطلب في قاعدة البيانات', 
          type: 'warning' 
        }
      });
    } else {
      console.log('✅ Order saved to Google Sheets successfully!');
    }

    // ============================================
    // 2️⃣ إنشاء رسالة الواتساب
    // ============================================
    let message = `🛒 *طلب جديد من ${SITE_CONFIG.name}*\n\n`;
    message += `📝 *بيانات العميل:*\n`;
    message += `الاسم: *${fullName}*\n`;
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
    message += `\n💰 *الإجمالي:*\n`;
    message += `*${cartTotal} جنيه*\n\n`;
    
    // إضافة معلومات حفظ الشيت
    if (sheetsResult.success && sheetsResult.data?.data?.orderId) {
      message += `\n📊 *Order ID:* ${sheetsResult.data.data.orderId}\n`;
    }
    
    message += `🌿 شكراً لاختيارك ${SITE_CONFIG.name}\n`;
    message += `سيتم التواصل معك قريباً بخصوص الشحن`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
    
    // ============================================
    // 3️⃣ فتح واتساب
    // ============================================
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
    
    // ============================================
    // 4️⃣ حفظ بيانات الطلب محلياً
    // ============================================
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
        // إضافة معلومات Google Sheets
        googleSheetsId: sheetsResult.success ? sheetsResult.data?.data?.orderId : null,
        savedToSheets: sheetsResult.success
      }
    });
    
    dispatch({ type: 'CLEAR_CART' });
    
    // رسالة النجاح مع معلومات الحفظ
    const successMessage = sheetsResult.success 
      ? '✅ تم إرسال الطلب وحفظه في قاعدة البيانات بنجاح!'
      : '✅ تم إرسال الطلب بنجاح!';
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: successMessage, type: 'success' }
    });
    
    setIsCheckout(false);
    setFormData({ firstName: '', lastName: '', phone: '', governorate: '', address: '', notes: '' });
    setLastSubmit(Date.now());
    
    setTimeout(() => {
      navigateTo('order-success');
    }, 500);
    
  } catch (error) {
    console.error('Checkout error:', error);
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: 'حدث خطأ. تأكد من اتصالك بالإنترنت', type: 'error' }
    });
  } finally {
    setIsSubmitting(false);
  }
}, [formData, state, dispatch, validateForm, lastSubmit, cartTotal]);
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
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Info */}
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

            {/* Cart Items */}
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

          {/* Order Summary */}
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
                    className={`w-full p-2 border-2 rounded-lg text-sm resize-none ${errors.address ? 'border-red-500 bg-red-50' : 'border-gray-200'}`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">ملاحظات</label>
                  <textarea
                    placeholder="ملاحظات إضافية..."
                    value={formData.notes}
                    onChange={(e) => setFormData({...formData, notes: e.target.value})}
                    rows="1"
                    maxLength={500}
                    className="w-full p-2 border-2 border-gray-200 rounded-lg text-sm resize-none"
                  />
                </div>

                <div className="flex gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsCheckout(false)}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-all font-bold text-sm"
                  >
                    إلغاء
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-[2] bg-gradient-to-r from-green-600 to-teal-600 text-white py-2 rounded-lg hover:from-green-700 hover:to-teal-700 transition-all font-bold text-sm disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? <LoadingSpinner size={16} /> : <Send size={16} />}
                    تأكيد
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Delete Confirmation */}
      {itemToDelete && (
        <ConfirmModal 
          isOpen={true}
          title="حذف المنتج"
          message={`هل تريد حذف ${itemToDelete.name}؟`}
          confirmLabel="نعم"
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