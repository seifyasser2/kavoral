import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, Package, Truck, Phone, MessageCircle, 
  Home, ShoppingBag, Clock, AlertTriangle
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';

const OrderSuccessPage = () => {
  const { navigateTo, state } = useAppContext();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          navigateTo('home');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigateTo]);

  const orderInfo = state.lastOrder || {
    orderNumber: `ORD-${Date.now()}`,
    date: new Date().toLocaleDateString('ar-EG'),
    time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
          {/* Header */}
          <div className="bg-green-500 p-8 text-center text-white">
            <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 animate-scale-in">
              <CheckCircle size={48} className="text-green-500" strokeWidth={3} />
            </div>

            <h1 className="text-4xl font-bold mb-4">
              تم إرسال طلبك بنجاح! 🎉
            </h1>
            <p className="text-xl opacity-90">
              شكراً لثقتك في {SITE_CONFIG.name}
            </p>
          </div>

          {/* Order Details */}
          <div className="p-8 space-y-6">
            {/* Order Info */}
            <div className="bg-green-50 border border-green-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                <Package size={20} className="text-green-600" />
                تفاصيل الطلب
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">رقم الطلب</p>
                  <p className="text-sm font-bold text-green-600 truncate">{orderInfo.orderNumber}</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">التاريخ</p>
                  <p className="text-sm font-bold text-gray-800">{orderInfo.date}</p>
                </div>
                <div className="bg-white rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-600 mb-1">الوقت</p>
                  <p className="text-sm font-bold text-gray-800">{orderInfo.time}</p>
                </div>
              </div>
            </div>

            {/* ⚠️ تحذير مهم للدفع الإلكتروني */}
            {orderInfo.needsPaymentProof && (
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-300 rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <AlertTriangle size={32} className="text-yellow-600 flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-yellow-900 mb-3">
                      ⚠️ خطوة مهمة جداً!
                    </h3>
                    <div className="space-y-2 text-yellow-800">
                      <p className="font-bold text-base">📸 يجب إرسال صورة إيصال الدفع الآن:</p>
                      <ul className="space-y-2 mr-4">
                        <li className="flex items-start gap-2">
                          <span className="font-bold">1️⃣</span>
                          <span>افتح تطبيق {orderInfo.paymentMethod}</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold">2️⃣</span>
                          <span>اعمل سكرينشوت (لقطة شاشة) للإيصال</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="font-bold">3️⃣</span>
                          <span className="font-bold text-red-600">أرسل الصورة على واتساب فوراً</span>
                        </li>
                      </ul>
                      <div className="bg-white rounded-lg p-3 mt-3 border-2 border-yellow-400">
                        <p className="text-sm font-bold text-red-600 text-center">
                          ⏰ الطلب لن يتم تأكيده بدون الإيصال!
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Next Steps */}
            <div className="bg-blue-50 border border-blue-100 rounded-xl p-6">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                الخطوات التالية
              </h2>
              <div className="space-y-3">
                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <MessageCircle size={20} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">1. تأكيد الطلب</h3>
                    <p className="text-sm text-gray-600">
                      {orderInfo.needsPaymentProof 
                        ? '⚠️ أرسل صورة الإيصال على واتساب أولاً' 
                        : 'تم فتح واتساب لتأكيد طلبك'}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone size={20} className="text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">2. التواصل</h3>
                    <p className="text-sm text-gray-600">سنتواصل معك خلال 24 ساعة</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 bg-white rounded-lg p-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Truck size={20} className="text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">3. التوصيل</h3>
                    <p className="text-sm text-gray-600">سيصلك خلال {SITE_CONFIG.shipping.estimatedDelivery}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info (if available) */}
            {orderInfo.customerName && (
              <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
                <h3 className="font-bold text-gray-800 mb-3 text-sm">معلومات العميل:</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-gray-600">الاسم: </span>
                    <span className="font-semibold text-gray-800">{orderInfo.customerName}</span>
                  </div>
                  {orderInfo.customerPhone && (
                    <div>
                      <span className="text-gray-600">الهاتف: </span>
                      <span className="font-semibold text-gray-800 dir-ltr inline-block">{orderInfo.customerPhone}</span>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Contact Buttons */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <a
                href={getWhatsAppLink(
                  orderInfo.needsPaymentProof 
                    ? `صورة إيصال الدفع - طلب رقم: ${orderInfo.orderNumber}` 
                    : `مرحباً، لدي استفسار عن طلبي: ${orderInfo.orderNumber}`
                )}
                target="_blank"
                rel="noopener noreferrer"
                className={`py-4 px-6 rounded-xl transition-all font-bold flex items-center justify-center gap-2 ${
                  orderInfo.needsPaymentProof
                    ? 'bg-yellow-500 text-white hover:bg-yellow-600 animate-pulse'
                    : 'bg-green-500 text-white hover:bg-green-600'
                }`}
              >
                <MessageCircle size={20} />
                {orderInfo.needsPaymentProof ? '📸 أرسل الإيصال الآن' : 'تواصل واتساب'}
              </a>
              <a
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="bg-blue-500 text-white py-4 px-6 rounded-xl hover:bg-blue-600 transition-all font-bold flex items-center justify-center gap-2"
              >
                <Phone size={20} />
                اتصل بنا
              </a>
            </div>

            {/* Navigation Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigateTo('home')}
                className="flex-1 bg-green-500 text-white py-4 px-6 rounded-xl hover:bg-green-600 transition-all font-bold flex items-center justify-center gap-2"
              >
                <Home size={20} />
                الرئيسية
              </button>
              <button
                onClick={() => navigateTo('products')}
                className="flex-1 bg-gray-100 text-gray-700 py-4 px-6 rounded-xl hover:bg-gray-200 transition-all font-bold flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                تسوق المزيد
              </button>
            </div>

            {/* Auto Redirect Countdown */}
            <div className="text-center pt-4 border-t">
              <div className="inline-flex items-center gap-2 bg-gray-50 px-4 py-2 rounded-full text-sm text-gray-600">
                <Clock size={16} />
                <span>سيتم التوجيه للرئيسية خلال <span className="font-bold text-green-600">{countdown}</span> ثانية</span>
              </div>
            </div>
          </div>
        </div>

        {/* Thank You Message */}
        <div className="text-center mt-8">
          <p className="text-2xl text-gray-700 font-semibold mb-2">
            شكراً لاختيارك {SITE_CONFIG.name} 🌿
          </p>
          <p className="text-gray-600">نتطلع لخدمتك دائماً</p>
        </div>
      </div>
    </div>
  );
};

export default OrderSuccessPage;