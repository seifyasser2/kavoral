import React, { useState, useCallback, useMemo } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Send, User, 
  Gift, Truck, MessageCircle, Package
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG, calculateShipping, isEligibleForFreeShipping, getRemainingForFreeShipping } from '../data/config';
import { getProductById } from '../data/products';
import { Badge, LoadingSpinner, EmptyState, ConfirmModal } from '../components/common';

// ============================================
// ثوابت التحقق
// ============================================
const MIN_NAME_LENGTH = 3;
const MAX_NAME_LENGTH = 100;
const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRESS_LENGTH = 500;
const SUBMIT_RATE_LIMIT = 5000;
const MAX_QUANTITY_PER_ITEM = 100;
const MIN_QUANTITY = 1;

// ============================================
// دالة تنظيف البيانات - حماية من XSS
// ============================================
const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  
  return text
    .replace(/[<>\"'`]/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
    .substring(0, 1000);
};

// ============================================
// دالة التحقق من الهاتف
// ============================================
const validatePhone = (phone) => {
  const phoneRegex = /^(\+?20|0)?1[0125]\d{8}$/;
  return phoneRegex.test(phone?.trim());
};

// ============================================
// دالة التحقق من الكمية
// ============================================
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

  // حساب الإجمالي باستخدام useMemo
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

  const cancelDelete = useCallback(() => {
    setItemToDelete(null);
  }, []);

  const removeFromCart = useCallback((id, name) => {
    const item = state.cart.find(i => i.id === id);
    setItemToDelete(item);
  }, [state.cart]);

  // ============================================
  // التحقق من النموذج المحسّن
  // ============================================
  const validateForm = useCallback(() => {
    const newErrors = {};

    // التحقق من الاسم
    const name = state.customerInfo.name?.trim();
    if (!name || name.length < MIN_NAME_LENGTH) {
      newErrors.name = `الاسم يجب أن يكون ${MIN_NAME_LENGTH} أحرف على الأقل`;
    }
    if (name && name.length > MAX_NAME_LENGTH) {
      newErrors.name = `الاسم طويل جداً (${MAX_NAME_LENGTH} حروف كحد أقصى)`;
    }

    // التحقق من الهاتف
    const phone = state.customerInfo.phone?.trim();
    if (!phone) {
      newErrors.phone = 'رقم الهاتف مطلوب';
    } else if (!validatePhone(phone)) {
      newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 01012345678)';
    }

    // التحقق من العنوان
    const address = state.customerInfo.address?.trim();
    if (!address || address.length < MIN_ADDRESS_LENGTH) {
      newErrors.address = `العنوان يجب أن يكون ${MIN_ADDRESS_LENGTH} أحرف على الأقل`;
    }
    if (address && address.length > MAX_ADDRESS_LENGTH) {
      newErrors.address = `العنوان طويل جداً (${MAX_ADDRESS_LENGTH} حروف كحد أقصى)`;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [state.customerInfo]);

  // ============================================
  // معالج الـ Checkout المحسّن
  // ============================================
  const handleCheckout = useCallback(async () => {
    // تحقق من Rate Limit
    const now = Date.now();
    if (now - lastSubmit < SUBMIT_RATE_LIMIT) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          message: 'يرجى الانتظار قليلاً قبل إرسال طلب آخر',
          type: 'warning'
        }
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
      // نظّف البيانات قبل الإرسال
      const safeName = sanitizeText(state.customerInfo.name);
      const safePhone = state.customerInfo.phone.trim();
      const safeAddress = sanitizeText(state.customerInfo.address);

      // بناء رسالة الطلب
      let message = `🛒 طلب جديد من ${SITE_CONFIG.name}\n\n`;
      message += `📝 بيانات العميل:\n`;
      message += `الاسم: ${safeName}\n`;
      message += `التليفون: ${safePhone}\n`;
      message += `العنوان: ${safeAddress}\n\n`;
      message += `🛍️ تفاصيل الطلب:\n`;
      
      state.cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        if (item.isBundle) {
          message += `   📦 عرض خاص يحتوي على:\n`;
          item.bundleProducts?.forEach(productId => {
            const product = getProductById(productId);
            if (product) {
              message += `      • ${product.name}\n`;
            }
          });
        } else {
          message += `   الحجم: ${item.size}\n`;
        }
        message += `   الكمية: ${item.quantity}\n`;
        message += `   السعر: ${item.price} جنيه\n`;
        message += `   المجموع: ${item.price * item.quantity} جنيه\n\n`;
      });

      message += `💰 ملخص الطلب:\n`;
      message += `المجموع الفرعي: ${cartTotals.total} جنيه\n`;
      message += `الشحن: ${cartTotals.shipping === 0 ? 'مجاني ✅' : cartTotals.shipping + ' جنيه'}\n`;
      message += `الإجمالي النهائي: ${cartTotals.finalTotal} جنيه\n\n`;
      message += `🌿 شكراً لاختيارك ${SITE_CONFIG.name}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
      
      // محاولة فتح WhatsApp
      const newWindow = window.open(whatsappUrl, '_blank');
      
      if (!newWindow || newWindow.closed || typeof newWindow.closed === 'undefined') {
        // إذا تم حظر الـ popup، انسخ الرابط للحافظة
        try {
          await navigator.clipboard.writeText(whatsappUrl);
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              message: 'تم نسخ رابط الواتساب. الصقه في المتصفح',
              type: 'info'
            }
          });
        } catch (clipboardError) {
          console.error('Clipboard error:', clipboardError);
          dispatch({
            type: 'ADD_NOTIFICATION',
            payload: {
              message: 'يرجى فتح الواتساب يدوياً لإرسال الطلب',
              type: 'warning'
            }
          });
        }
        setIsSubmitting(false);
        return;
      }

      // انتظر قليلاً قبل مسح السلة
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch({ type: 'CLEAR_CART' });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'تم إرسال الطلب بنجاح! سنتواصل معك قريباً', type: 'success' }
      });
      
      setIsCheckout(false);
      setLastSubmit(Date.now());
      
    } catch (error) {
      console.error('Checkout error:', error);
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { 
          message: 'حدث خطأ. تأكد من اتصالك بالإنترنت',
          type: 'error' 
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [state, dispatch, validateForm, lastSubmit, cartTotals]);

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <EmptyState 
            icon={ShoppingCart}
            title="السلة فارغة"
            description="لم تقم بإضافة أي منتجات للسلة بعد. ابدأ التسوق واكتشف مجموعتنا المميزة من الزيوت الطبيعية"
            actionLabel="ابدأ التسوق"
            onAction={() => navigateTo('products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 md:gap-4 mb-6 md:mb-8">
          <ShoppingCart size={32} className="text-green-600" />
          <h1 className="text-2xl md:text-4xl font-bold text-gray-800">سلة التسوق</h1>
          <Badge variant="success">{state.cart.length} منتج</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Progress */}
            {!isEligibleForFreeShipping(cartTotals.total) && (
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white p-4 rounded-xl shadow-lg">
                <div className="flex items-center gap-3 mb-3">
                  <Truck size={24} />
                  <div className="flex-1">
                    <p className="font-bold text-sm md:text-base">
                      أضف {cartTotals.remaining} جنيه للشحن المجاني! 🎉
                    </p>
                    <p className="text-xs opacity-90">
                      وفّر {SITE_CONFIG.shipping.standardShipping} جنيه شحن
                    </p>
                  </div>
                </div>
                <div className="w-full bg-blue-100 rounded-full h-2.5">
                  <div 
                    className="bg-gradient-to-r from-blue-600 to-cyan-600 h-2.5 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((cartTotals.total / SITE_CONFIG.shipping.freeShippingThreshold) * 100, 100)}%` }}
                  ></div>
                </div>
              </div>
            )}

            {isEligibleForFreeShipping(cartTotals.total) && (
              <div className="bg-gradient-to-r from-green-500 to-emerald-500 text-white p-4 rounded-xl shadow-lg flex items-center gap-3">
                <div className="bg-white text-green-500 rounded-full p-2">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="font-bold">شحن مجاني! 🎉</p>
                  <p className="text-sm opacity-90">لقد حصلت على الشحن المجاني</p>
                </div>
              </div>
            )}

            {/* Cart Items */}
            {state.cart.map(item => (
              <div key={item.id} className="bg-white p-4 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center flex-shrink-0 overflow-hidden">
                    {item.image && item.image.startsWith('http') ? (
                      <img 
                        src={item.image} 
                        alt={item.name}
                        className="w-full h-full object-cover"
                        loading="lazy"
                        onError={(e) => {
                          e.target.style.display = 'none';
                          if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                    ) : null}
                    <div 
                      className={`text-3xl ${item.image && item.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
                    >
                      {item.imageAlt || item.image || '🌿'}
                    </div>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-1 truncate">
                      {item.name}
                      {item.isBundle && <Badge variant="warning" className="mr-2 text-xs">📦 عرض</Badge>}
                    </h3>
                    <p className="text-xs md:text-sm text-gray-500 mb-2">{item.size}</p>
                    
                    {item.isBundle && item.bundleProducts && (
                      <div className="mb-2">
                        <p className="text-xs text-gray-600 font-semibold mb-1">يحتوي على:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.bundleProducts.map(productId => {
                            const product = getProductById(productId);
                            return product ? (
                              <span key={productId} className="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded">
                                {product.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between mt-3">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          aria-label="تقليل الكمية"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                          aria-label="زيادة الكمية"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-base md:text-lg font-bold text-gray-800">
                            {item.price * item.quantity} ج
                          </p>
                          <p className="text-xs text-gray-500">
                            {item.quantity} × {item.price}
                          </p>
                        </div>
                        
                        <button
                          onClick={() => removeFromCart(item.id, item.name)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                          aria-label="حذف من السلة"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-4 md:p-6 rounded-xl shadow-lg h-fit lg:sticky lg:top-24">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-4 md:mb-6 flex items-center gap-2">
              <Package size={24} />
              ملخص الطلب
            </h2>
            
            <div className="space-y-3 md:space-y-4 mb-4 md:mb-6">
              <div className="flex justify-between text-base md:text-lg">
                <span>المجموع الفرعي:</span>
                <span className="font-bold">{cartTotals.total} جنيه</span>
              </div>
              
              <div className="flex justify-between text-sm md:text-base">
                <span>الشحن:</span>
                <span className="font-bold">
                  {cartTotals.shipping === 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <Truck size={16} />
                      مجاني
                    </span>
                  ) : (
                    `${cartTotals.shipping} جنيه`
                  )}
                </span>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between text-lg md:text-xl font-bold text-green-600">
                <span>الإجمالي:</span>
                <span>{cartTotals.finalTotal} جنيه</span>
              </div>
            </div>

            {!isCheckout ? (
              <button
                onClick={() => setIsCheckout(true)}
                className="w-full bg-green-600 text-white py-3 md:py-4 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
              >
                <ShoppingCart size={20} />
                إتمام الطلب
              </button>
            ) : (
              <div className="space-y-3 md:space-y-4">
                <h3 className="text-base md:text-lg font-bold text-gray-800 flex items-center gap-2">
                  <User size={20} />
                  بيانات التوصيل
                </h3>
                
                <div>
                  <input
                    type="text"
                    placeholder="الاسم الكامل *"
                    value={state.customerInfo.name}
                    onChange={(e) => {
                      dispatch({ 
                        type: 'UPDATE_CUSTOMER_INFO', 
                        payload: { name: e.target.value } 
                      });
                      if (errors.name) setErrors({...errors, name: ''});
                    }}
                    maxLength={MAX_NAME_LENGTH}
                    className={`w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base ${
                      errors.name ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>
                
                <div>
                  <input
                    type="tel"
                    placeholder="رقم التليفون *"
                    value={state.customerInfo.phone}
                    onChange={(e) => {
                      dispatch({ 
                        type: 'UPDATE_CUSTOMER_INFO', 
                        payload: { phone: e.target.value } 
                      });
                      if (errors.phone) setErrors({...errors, phone: ''});
                    }}
                    className={`w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm md:text-base ${
                      errors.phone ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <textarea
                    placeholder="العنوان بالتفصيل (الشارع، المنطقة، المحافظة) *"
                    value={state.customerInfo.address}
                    onChange={(e) => {
                      dispatch({ 
                        type: 'UPDATE_CUSTOMER_INFO', 
                        payload: { address: e.target.value } 
                      });
                      if (errors.address) setErrors({...errors, address: ''});
                    }}
                    rows="3"
                    maxLength={MAX_ADDRESS_LENGTH}
                    className={`w-full p-2 md:p-3 border rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none text-sm md:text-base ${
                      errors.address ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setIsCheckout(false);
                      setErrors({});
                    }}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-200 text-gray-700 py-2 md:py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50 text-sm md:text-base"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white py-2 md:py-3 rounded-lg hover:bg-green-700 transition-colors font-bold disabled:opacity-50 flex items-center justify-center gap-2 text-sm md:text-base"
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
                
                <div className="bg-blue-50 p-2 md:p-3 rounded-lg">
                  <p className="text-xs text-blue-800 text-center flex items-center justify-center gap-1">
                    <MessageCircle size={14} />
                    سيتم توجيهك لواتساب لإتمام الطلب
                  </p>
                </div>
              </div>
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
              <p className="mb-3 text-gray-700">هل أنت متأكد من حذف هذا المنتج من السلة؟</p>
              <div className="bg-gray-50 p-3 rounded-lg border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center flex-shrink-0">
                    {itemToDelete.image && itemToDelete.image.startsWith('http') ? (
                      <img 
                        src={itemToDelete.image} 
                        alt={itemToDelete.name}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-2xl">{itemToDelete.imageAlt || itemToDelete.image || '🌿'}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-800 truncate">{itemToDelete.name}</p>
                    <p className="text-sm text-gray-600">الكمية: {itemToDelete.quantity}</p>
                    <p className="text-sm text-green-600 font-semibold">
                      {itemToDelete.price * itemToDelete.quantity} جنيه
                    </p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-3">💡 يمكنك إضافته مرة أخرى في أي وقت</p>
            </div>
          }
          confirmLabel="نعم، احذف المنتج"
          cancelLabel="إلغاء"
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
          type="danger"
        />
      )}
    </div>
  );
};

export default CartPage;