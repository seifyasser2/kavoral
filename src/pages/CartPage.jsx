import React, { useState } from 'react';
import { 
  ShoppingCart, Plus, Minus, Trash2, Send, User, 
  Gift, Truck, MessageCircle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG } from '../data/config';
import { PRODUCTS_DATA } from '../data/products';
import { Badge, LoadingSpinner } from '../components/common';

const CartPage = () => {
  const { state, dispatch } = useAppContext();
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateCartQuantity = (id, quantity) => {
    if (quantity <= 0) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: id });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'تم حذف المنتج من السلة', type: 'info' }
      });
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity } });
    }
  };

  const removeFromCart = (id, name) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: id });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `تم حذف ${name} من السلة`, type: 'info' }
    });
  };

  const total = state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = total >= SITE_CONFIG.shipping.freeShippingThreshold ? 0 : SITE_CONFIG.shipping.standardShipping;
  const finalTotal = total + shipping;

  const handleCheckout = async () => {
    if (!state.customerInfo.name || !state.customerInfo.phone || !state.customerInfo.address) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى ملء جميع البيانات المطلوبة', type: 'warning' }
      });
      return;
    }

    setIsSubmitting(true);

    try {
      let message = `🛒 طلب جديد من ${SITE_CONFIG.name}\n\n`;
      message += `📝 بيانات العميل:\n`;
      message += `الاسم: ${state.customerInfo.name}\n`;
      message += `التليفون: ${state.customerInfo.phone}\n`;
      message += `العنوان: ${state.customerInfo.address}\n\n`;
      message += `🛍️ تفاصيل الطلب:\n`;
      
      state.cart.forEach((item, index) => {
        message += `${index + 1}. ${item.name}\n`;
        if (item.isBundle) {
          message += `   📦 عرض خاص يحتوي على:\n`;
          item.bundleProducts.forEach(productId => {
            const product = PRODUCTS_DATA.find(p => p.id === productId);
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
      message += `المجموع الفرعي: ${total} جنيه\n`;
      message += `الشحن: ${shipping === 0 ? 'مجاني ✅' : shipping + ' جنيه'}\n`;
      message += `الإجمالي النهائي: ${finalTotal} جنيه\n\n`;
      message += `🌿 شكراً لاختيارك ${SITE_CONFIG.name}`;

      const encodedMessage = encodeURIComponent(message);
      const whatsappUrl = `https://wa.me/${SITE_CONFIG.whatsapp}?text=${encodedMessage}`;
      
      window.open(whatsappUrl, '_blank');
      
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      dispatch({ type: 'CLEAR_CART' });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً', type: 'success' }
      });
      setIsCheckout(false);
    } catch (error) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'حدث خطأ في إرسال الطلب، حاول مرة أخرى', type: 'error' }
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingCart size={60} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold text-gray-600 mb-4">السلة فارغة</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              لم تقم بإضافة أي منتجات للسلة بعد. ابدأ التسوق واكتشف مجموعتنا المميزة من الزيوت الطبيعية
            </p>
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              ابدأ التسوق
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <ShoppingCart size={40} className="text-green-600" />
          <h1 className="text-4xl font-bold text-gray-800">سلة التسوق</h1>
          <Badge variant="success">{state.cart.length} منتج</Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {state.cart.map(item => (
              <div key={item.id} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex gap-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-4xl flex-shrink-0">
                    {item.image}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-800 mb-1">
                      {item.name}
                      {item.isBundle && <Badge variant="warning" className="mr-2">عرض خاص</Badge>}
                    </h3>
                    <p className="text-sm text-gray-500 mb-2">{item.size}</p>
                    
                    {/* ✅ عرض المنتجات في العرض */}
                    {item.isBundle && item.bundleProducts && (
                      <div className="mt-2 mb-2">
                        <p className="text-xs text-gray-600 font-semibold mb-1">يحتوي على:</p>
                        <div className="flex flex-wrap gap-1">
                          {item.bundleProducts.map(productId => {
                            const product = PRODUCTS_DATA.find(p => p.id === productId);
                            return product ? (
                              <span key={productId} className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded">
                                {product.name}
                              </span>
                            ) : null;
                          })}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg font-bold text-green-600">{item.price} جنيه</span>
                      {item.originalPrice > item.price && (
                        <span className="text-sm text-gray-400 line-through">{item.originalPrice} جنيه</span>
                      )}
                      {item.tags && item.tags[0] && (
                        <Badge variant="info">{item.tags[0]}</Badge>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end gap-3">
                    <button
                      onClick={() => removeFromCart(item.id, item.name)}
                      className="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-full transition-colors"
                      aria-label="حذف من السلة"
                    >
                      <Trash2 size={18} />
                    </button>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="w-12 text-center font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-800">
                        {item.price * item.quantity} جنيه
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.quantity} × {item.price}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white p-6 rounded-xl shadow-lg h-fit sticky top-24">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ملخص الطلب</h2>
            
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-lg">
                <span>المجموع الفرعي:</span>
                <span className="font-bold">{total} جنيه</span>
              </div>
              
              <div className="flex justify-between">
                <span>الشحن:</span>
                <span className="font-bold">
                  {shipping === 0 ? (
                    <span className="text-green-600 flex items-center gap-1">
                      <Truck size={16} />
                      مجاني
                    </span>
                  ) : (
                    `${shipping} جنيه`
                  )}
                </span>
              </div>
              
              {total < SITE_CONFIG.shipping.freeShippingThreshold && (
                <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
                  <p className="text-sm text-yellow-800">
                    <Gift className="inline w-4 h-4 mr-1" />
                    أضف {SITE_CONFIG.shipping.freeShippingThreshold - total} جنيه أخرى للحصول على شحن مجاني
                  </p>
                </div>
              )}
              
              <hr className="border-gray-200" />
              
              <div className="flex justify-between text-xl font-bold text-green-600">
                <span>الإجمالي:</span>
                <span>{finalTotal} جنيه</span>
              </div>
            </div>

            {!isCheckout ? (
              <button
                onClick={() => setIsCheckout(true)}
                className="w-full bg-green-600 text-white py-3 rounded-lg font-bold hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
              >
                <ShoppingCart size={20} />
                إتمام الطلب
              </button>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <User size={20} />
                  بيانات التوصيل
                </h3>
                
                <input
                  type="text"
                  placeholder="الاسم الكامل *"
                  value={state.customerInfo.name}
                  onChange={(e) => dispatch({ 
                    type: 'UPDATE_CUSTOMER_INFO', 
                    payload: { name: e.target.value } 
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                
                <input
                  type="tel"
                  placeholder="رقم التليفون *"
                  value={state.customerInfo.phone}
                  onChange={(e) => dispatch({ 
                    type: 'UPDATE_CUSTOMER_INFO', 
                    payload: { phone: e.target.value } 
                  })}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  required
                />
                
                <textarea
                  placeholder="العنوان بالتفصيل (الشارع، المنطقة، المحافظة) *"
                  value={state.customerInfo.address}
                  onChange={(e) => dispatch({ 
                    type: 'UPDATE_CUSTOMER_INFO', 
                    payload: { address: e.target.value } 
                  })}
                  rows="3"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
                  required
                />
                
                <div className="flex gap-2">
                  <button
                    onClick={() => setIsCheckout(false)}
                    disabled={isSubmitting}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
                  >
                    إلغاء
                  </button>
                  <button
                    onClick={handleCheckout}
                    disabled={isSubmitting}
                    className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition-colors font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <LoadingSpinner size={20} />
                        جاري الإرسال...
                      </>
                    ) : (
                      <>
                        <Send size={20} />
                        تأكيد الطلب
                      </>
                    )}
                  </button>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-lg">
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
    </div>
  );
};

export default CartPage;