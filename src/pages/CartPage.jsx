import React, { useState, useCallback, useMemo } from 'react';
import {
  ShoppingCart, Plus, Minus, Trash2, Send, Truck, Package,
  Clock, ChevronDown, Gift, X, AlertCircle, Copy, Check,
  MessageCircle, Shield, Sparkles, ArrowLeft, ChevronRight,
  User, Phone, MapPin, FileText, Banknote, Wallet, Zap
} from 'lucide-react';

import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG } from '../data/config';
import { Badge, LoadingSpinner, EmptyState, ConfirmModal } from '../components/common';

// ============================================
// CONSTANTS
// ============================================
const MIN_NAME_LENGTH = 5;
const MIN_ADDRESS_LENGTH = 10;
const MAX_ADDRESS_LENGTH = 500;
const SUBMIT_RATE_LIMIT = 5000;
const MAX_QUANTITY_PER_ITEM = 100;
const MIN_QUANTITY = 1;
const MIN_DEPOSIT = 50;

const SHIPPING_PRICES = {
  65: ['cairo', 'giza', 'qalioubia'],
  75: ['sharqia', 'kafr_elsheikh', 'beheira', 'damietta', 'dakahlia', 'gharbia', 'monufia', 'alexandria'],
  85: ['suez', 'port_said', 'ismailia'],
  90: ['assiut', 'minya', 'fayoum', 'beni_suef'],
  115: ['sohag', 'qena', 'luxor', 'aswan'],
  125: ['north_sinai', 'south_sinai', 'matrouh', 'red_sea', 'new_valley']
};

const DISCOUNT_CODES = {
  'SAVE155': 155, 'SAVE150': 150, 'SAVE145': 145, 'SAVE140': 140,
  'WELCOME30': 30, 'SUMMER75': 75, 'FLASH60': 60, 'FLASH50': 50,
  'SPECIAL40': 40, 'GIFT20': 20, 'CODE15': 15,
};

const EGYPTIAN_GOVERNORATES = [
  { id: 'cairo', name: 'القاهرة' }, { id: 'giza', name: 'الجيزة' },
  { id: 'alexandria', name: 'الإسكندرية' }, { id: 'qalioubia', name: 'القليوبية' },
  { id: 'sharqia', name: 'الشرقية' }, { id: 'monufia', name: 'المنوفية' },
  { id: 'dakahlia', name: 'الدقهلية' }, { id: 'damietta', name: 'دمياط' },
  { id: 'beheira', name: 'البحيرة' }, { id: 'kafr_elsheikh', name: 'كفر الشيخ' },
  { id: 'fayoum', name: 'الفيوم' }, { id: 'beni_suef', name: 'بني سويف' },
  { id: 'minya', name: 'المنيا' }, { id: 'assiut', name: 'أسيوط' },
  { id: 'sohag', name: 'سوهاج' }, { id: 'qena', name: 'قنا' },
  { id: 'luxor', name: 'الأقصر' }, { id: 'aswan', name: 'أسوان' },
  { id: 'red_sea', name: 'البحر الأحمر' }, { id: 'new_valley', name: 'الوادي الجديد' },
  { id: 'north_sinai', name: 'شمال سيناء' }, { id: 'south_sinai', name: 'جنوب سيناء' },
  { id: 'port_said', name: 'بورسعيد' }, { id: 'ismailia', name: 'الإسماعيلية' },
  { id: 'suez', name: 'السويس' }, { id: 'matrouh', name: 'مطروح' },
  { id: 'gharbia', name: 'الغربية' }
];

const PAYMENT_METHODS = {
  vodafone: { id: 'vodafone', name: 'فودافون كاش', icon: '📱', number: '01016993805', color: 'red', note: 'حوّل المبلغ كاملاً ثم أرسل الإيصال' },
  instapay: { id: 'instapay', name: 'إنستا باي', icon: '💳', link: 'https://ipn.eg/S/seifbank/instapay/2llVSu', username: 'seifbank', color: 'blue', note: 'حوّل المبلغ كاملاً ثم أرسل الإيصال' },
  cash: { id: 'cash', name: 'الدفع عند الاستلام', icon: '💵', color: 'green', note: 'ادفع ديبوزت مقدم + الباقي عند استلام الطلب' }
};

// ============================================
// HELPER FUNCTIONS
// ============================================
const getShippingPrice = (governorateId) => {
  for (const [price, governorates] of Object.entries(SHIPPING_PRICES)) {
    if (governorates.includes(governorateId)) return parseInt(price);
  }
  return null;
};

const validateDiscountCode = (code) => {
  const upperCode = code.toUpperCase().trim();
  if (DISCOUNT_CODES[upperCode]) {
    return { isValid: true, amount: DISCOUNT_CODES[upperCode], message: `✅ خصم ${DISCOUNT_CODES[upperCode]} جنيه` };
  }
  return { isValid: false, amount: 0, message: '❌ الكود غير صحيح' };
};

const validatePhone = (phone) => /^(\+?20|0)?1[0125]\d{8}$/.test(phone?.trim());
const sanitizeText = (text) => typeof text !== 'string' ? '' : text.replace(/[<>"'`]/g, '').replace(/\n{2,}/g, '\n').trim().substring(0, 1000);
const validateQuantity = (q) => Math.max(MIN_QUANTITY, Math.min(MAX_QUANTITY_PER_ITEM, q));

// ============================================
// CHECKOUT STEPS
// ============================================
const STEPS = [
  { id: 1, label: 'المنتجات', icon: ShoppingCart },
  { id: 2, label: 'بياناتك', icon: User },
  { id: 3, label: 'الدفع', icon: Wallet },
  { id: 4, label: 'التأكيد', icon: Check },
];

// ============================================
// STEP INDICATOR COMPONENT
// ============================================
const StepIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-0 mb-8">
    {STEPS.map((step, idx) => {
      const Icon = step.icon;
      const isActive = currentStep === step.id;
      const isDone = currentStep > step.id;
      return (
        <React.Fragment key={step.id}>
          <div className="flex flex-col items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 border-2 ${
              isDone ? 'bg-green-500 border-green-500 text-white shadow-lg shadow-green-200'
              : isActive ? 'bg-white border-green-500 text-green-600 shadow-lg shadow-green-100'
              : 'bg-gray-100 border-gray-200 text-gray-400'
            }`}>
              {isDone ? <Check size={16} /> : <Icon size={16} />}
            </div>
            <span className={`text-xs mt-1 font-semibold whitespace-nowrap ${
              isActive ? 'text-green-600' : isDone ? 'text-green-500' : 'text-gray-400'
            }`}>{step.label}</span>
          </div>
          {idx < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 sm:w-12 mx-1 mb-4 transition-all duration-500 ${
              currentStep > step.id ? 'bg-green-500' : 'bg-gray-200'
            }`} />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

// ============================================
// CART ITEM COMPONENT
// ============================================
const CartItem = ({ item, onUpdateQuantity, onDelete }) => (
  <div className="group bg-white rounded-2xl border border-gray-100 hover:border-green-200 hover:shadow-md transition-all duration-200 p-4 flex gap-3 items-start">
    <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-gradient-to-br from-green-50 to-teal-50 flex-shrink-0 flex items-center justify-center">
      {item.image && item.image.startsWith('http') ? (
        <img src={item.image} alt={item.name} className="w-full h-full object-cover"
          onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
        />
      ) : null}
      <div className={`text-2xl ${item.image && item.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
        {item.imageAlt || '🌿'}
      </div>
    </div>

    <div className="flex-1 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 text-sm leading-tight line-clamp-2">{item.name}</h3>
          {item.size && <p className="text-xs text-gray-500 mt-0.5">{item.size}</p>}
        </div>
        <button onClick={() => onDelete(item)}
          className="text-gray-300 hover:text-red-500 p-1.5 hover:bg-red-50 rounded-lg transition-all flex-shrink-0">
          <Trash2 size={15} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-2.5 pt-2.5 border-t border-gray-50">
        <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-2 py-1 border border-gray-100">
          <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="w-6 h-6 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:border-green-400 transition-all text-gray-600 hover:text-green-600">
            <Minus size={11} />
          </button>
          <span className="font-black text-green-600 text-sm w-6 text-center">{item.quantity}</span>
          <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="w-6 h-6 rounded-lg bg-white shadow-sm border border-gray-100 flex items-center justify-center hover:border-green-400 transition-all text-gray-600 hover:text-green-600">
            <Plus size={11} />
          </button>
        </div>
        <div className="text-right">
          <p className="font-black text-green-600 text-sm">{item.price * item.quantity} ج</p>
          <p className="text-xs text-gray-400">{item.quantity} × {item.price}</p>
        </div>
      </div>
    </div>
  </div>
);

// ============================================
// WHATSAPP FLOW EXPLANATION BANNER
// ============================================
const WhatsAppFlowBanner = () => (
  <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-2xl p-4 mb-6">
    <div className="flex items-center gap-2 mb-3">
      <div className="w-8 h-8 bg-green-500 rounded-xl flex items-center justify-center">
        <MessageCircle size={16} className="text-white" />
      </div>
      <h3 className="font-black text-green-800 text-sm">كيف تعمل عملية الشراء؟</h3>
    </div>
    <div className="flex items-start gap-0">
      {[
        { num: '1', label: 'تملأ بياناتك', sub: 'الاسم والعنوان' },
        { num: '2', label: 'تختار الدفع', sub: 'أونلاين أو استلام' },
        { num: '3', label: 'ينتقل لواتساب', sub: 'الطلب جاهز تلقائياً' },
        { num: '4', label: 'نؤكد ونشحن', sub: 'خلال 24-48 ساعة' },
      ].map((s, i) => (
        <div key={i} className="flex items-center">
          <div className="flex flex-col items-center text-center min-w-0 px-1">
            <div className="w-7 h-7 bg-green-500 text-white rounded-full flex items-center justify-center font-black text-xs mb-1 flex-shrink-0">{s.num}</div>
            <p className="text-green-800 font-bold text-xs leading-tight">{s.label}</p>
            <p className="text-green-600 text-[10px]">{s.sub}</p>
          </div>
          {i < 3 && <ChevronRight size={12} className="text-green-400 flex-shrink-0 mb-4 mx-0.5" />}
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// ORDER SUMMARY COMPONENT
// ============================================
const OrderSummary = ({ cart, cartTotal, shippingPrice, currentDiscount, deposit, formData }) => {
  const finalTotal = Math.max(cartTotal + (shippingPrice || 0) - currentDiscount - deposit, 0);
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-3">
      <h3 className="font-black text-gray-800 text-sm flex items-center gap-2">
        <Package size={16} className="text-green-600" /> ملخص طلبك
      </h3>
      <div className="space-y-2 max-h-32 overflow-y-auto">
        {cart.map(item => (
          <div key={item.id} className="flex justify-between items-center text-xs">
            <span className="text-gray-600 truncate ml-2">{item.name} ×{item.quantity}</span>
            <span className="font-bold text-gray-800 flex-shrink-0">{item.price * item.quantity} ج</span>
          </div>
        ))}
      </div>
      <div className="border-t border-dashed border-gray-200 pt-3 space-y-1.5">
        <div className="flex justify-between text-xs text-gray-600">
          <span>المنتجات</span><span className="font-bold">{cartTotal} ج</span>
        </div>
        {shippingPrice !== null ? (
          <div className="flex justify-between text-xs text-gray-600">
            <span>الشحن</span><span className="font-bold text-orange-600">{shippingPrice} ج</span>
          </div>
        ) : (
          <div className="flex justify-between text-xs text-yellow-700">
            <span>الشحن</span><span className="font-bold">اختر محافظة</span>
          </div>
        )}
        {currentDiscount > 0 && (
          <div className="flex justify-between text-xs text-green-700">
            <span>خصم ({formData.discountCode})</span><span className="font-bold">-{currentDiscount} ج</span>
          </div>
        )}
        {deposit > 0 && (
          <div className="flex justify-between text-xs text-blue-600">
            <span>ديبوزت مقدم</span><span className="font-bold">-{deposit} ج</span>
          </div>
        )}
      </div>
      <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-3 text-white">
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm">{deposit > 0 ? 'المتبقي عند الاستلام' : 'الإجمالي'}</span>
          <span className="font-black text-xl">{finalTotal} <span className="text-sm font-bold">ج</span></span>
        </div>
        {deposit > 0 && (
          <p className="text-xs text-green-100 mt-1">الديبوزت المدفوع: {deposit} ج</p>
        )}
      </div>
    </div>
  );
};

// ============================================
// STEP 1: CART REVIEW
// ============================================
const CartStep = ({ cart, onUpdateQuantity, onDelete, onNext }) => (
  <div className="space-y-4 animate-fade-in">
    <div className="space-y-3">
      {cart.map(item => (
        <CartItem key={item.id} item={item} onUpdateQuantity={onUpdateQuantity} onDelete={onDelete} />
      ))}
    </div>

    <WhatsAppFlowBanner />

    <button onClick={onNext}
      className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 hover:from-green-600 hover:to-teal-600 transition-all shadow-lg shadow-green-200 active:scale-98">
      <span>متابعة — إدخال بياناتك</span>
      <ArrowLeft size={18} />
    </button>

    <div className="grid grid-cols-3 gap-2">
      {[
        { icon: Shield, label: 'دفع آمن' },
        { icon: Truck, label: 'شحن موثوق' },
        { icon: Clock, label: '24-48 ساعة' },
      ].map((b, i) => (
        <div key={i} className="bg-gray-50 rounded-xl p-2 text-center border border-gray-100">
          <b.icon size={16} className="text-green-600 mx-auto mb-1" />
          <p className="text-xs font-semibold text-gray-600">{b.label}</p>
        </div>
      ))}
    </div>
  </div>
);

// ============================================
// STEP 2: CUSTOMER INFO
// ============================================
const InfoStep = ({ formData, setFormData, errors, onNext, onBack, shippingPrice, setShippingPrice, dispatch }) => {
  const [governorateOpen, setGovernorateOpen] = useState(false);
  const [discountMsg, setDiscountMsg] = useState('');
  const [discountOk, setDiscountOk] = useState(false);

  const handleGovernorateChange = (id) => {
    setFormData({ ...formData, governorate: id });
    setGovernorateOpen(false);
    const price = getShippingPrice(id);
    setShippingPrice(price);
    if (price) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `✅ سعر الشحن: ${price} ج`, type: 'success' } });
    }
  };

  const handleDiscountChange = (code) => {
    const upper = code.toUpperCase();
    setFormData({ ...formData, discountCode: upper });
    if (!upper.trim()) { setDiscountMsg(''); setDiscountOk(false); return; }
    const res = validateDiscountCode(upper);
    setDiscountMsg(res.message);
    setDiscountOk(res.isValid);
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex gap-2 items-start">
        <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-amber-800 font-semibold">بعد تأكيد البيانات سيتم فتح واتساب تلقائياً لإرسال طلبك 🟢</p>
      </div>

      {/* Name */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-black text-gray-700 mb-1.5">
          <User size={13} className="text-green-600" /> الاسم ثلاثي *
        </label>
        <input type="text" placeholder="مثال: أحمد محمد علي"
          value={formData.fullName}
          onChange={e => setFormData({ ...formData, fullName: e.target.value })}
          maxLength={100}
          className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-all outline-none ${errors.fullName ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-green-400 bg-white'}`} />
        {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
      </div>

      {/* Phone */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="flex items-center gap-1.5 text-xs font-black text-gray-700 mb-1.5">
            <Phone size={13} className="text-green-600" /> الهاتف *
          </label>
          <input type="tel" placeholder="01012345678"
            value={formData.phone}
            onChange={e => setFormData({ ...formData, phone: e.target.value })}
            className={`w-full px-3 py-3 rounded-xl border-2 text-sm transition-all outline-none ${errors.phone ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-green-400 bg-white'}`} />
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>
        <div>
          <label className="flex items-center gap-1.5 text-xs font-black text-gray-700 mb-1.5">
            <Phone size={13} className="text-blue-600" /> هاتف آخر
          </label>
          <input type="tel" placeholder="01012345678"
            value={formData.phoneAlt}
            onChange={e => setFormData({ ...formData, phoneAlt: e.target.value })}
            className={`w-full px-3 py-3 rounded-xl border-2 text-sm transition-all outline-none ${errors.phoneAlt ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-blue-400 bg-white'}`} />
          {errors.phoneAlt && <p className="text-red-500 text-xs mt-1">{errors.phoneAlt}</p>}
        </div>
      </div>

      {/* Governorate */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-black text-gray-700 mb-1.5">
          <MapPin size={13} className="text-green-600" /> المحافظة *
        </label>
        <div className="relative">
          <button type="button" onClick={() => setGovernorateOpen(!governorateOpen)}
            className={`w-full px-4 py-3 rounded-xl border-2 text-sm flex items-center justify-between text-right transition-all ${errors.governorate ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-green-400 bg-white hover:border-green-300'}`}>
            <ChevronDown size={16} className={`text-gray-400 transition-transform ${governorateOpen ? 'rotate-180' : ''}`} />
            <span className={formData.governorate ? 'text-gray-800 font-semibold' : 'text-gray-400'}>
              {formData.governorate ? EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.name : 'اختر محافظتك'}
            </span>
          </button>
          {governorateOpen && (
            <div className="absolute top-full right-0 left-0 mt-1 bg-white border-2 border-gray-200 rounded-xl shadow-xl z-50 max-h-48 overflow-y-auto">
              {EGYPTIAN_GOVERNORATES.map(gov => (
                <button key={gov.id} type="button" onClick={() => handleGovernorateChange(gov.id)}
                  className={`w-full px-4 py-2.5 text-right text-sm hover:bg-green-50 hover:text-green-700 transition-all border-b border-gray-50 last:border-0 ${formData.governorate === gov.id ? 'bg-green-100 font-bold text-green-700' : 'text-gray-700'}`}>
                  {gov.name}
                </button>
              ))}
            </div>
          )}
        </div>
        {errors.governorate && <p className="text-red-500 text-xs mt-1">{errors.governorate}</p>}
        {shippingPrice !== null && (
          <p className="text-green-600 text-xs font-bold mt-1 flex items-center gap-1">
            <Truck size={12} /> سعر الشحن: {shippingPrice} ج
          </p>
        )}
      </div>

      {/* Address */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-black text-gray-700 mb-1.5">
          <MapPin size={13} className="text-green-600" /> العنوان التفصيلي *
        </label>
        <textarea placeholder="الشارع، المنطقة، رقم الشقة..." rows="2"
          value={formData.address}
          onChange={e => setFormData({ ...formData, address: e.target.value })}
          maxLength={MAX_ADDRESS_LENGTH}
          className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-all outline-none resize-none ${errors.address ? 'border-red-400 bg-red-50' : 'border-gray-200 focus:border-green-400 bg-white'}`} />
        {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
      </div>

      {/* Notes */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-black text-gray-700 mb-1.5">
          <FileText size={13} className="text-gray-500" /> ملاحظات (اختياري)
        </label>
        <textarea placeholder="أي تعليمات خاصة للتوصيل..." rows="2"
          value={formData.notes}
          onChange={e => setFormData({ ...formData, notes: e.target.value })}
          maxLength={500}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-gray-400 bg-white text-sm transition-all outline-none resize-none" />
      </div>

      {/* Discount Code */}
      <div>
        <label className="flex items-center gap-1.5 text-xs font-black text-gray-700 mb-1.5">
          <Gift size={13} className="text-orange-500" /> كود الخصم (اختياري)
        </label>
        <input type="text" placeholder="أدخل كود الخصم هنا..."
          value={formData.discountCode}
          onChange={e => handleDiscountChange(e.target.value)}
          maxLength={20}
          className={`w-full px-4 py-3 rounded-xl border-2 text-sm transition-all outline-none font-mono tracking-widest ${discountMsg ? (discountOk ? 'border-green-400 bg-green-50' : 'border-red-400 bg-red-50') : 'border-gray-200 focus:border-orange-400 bg-white'}`} />
        {discountMsg && (
          <p className={`text-xs font-bold mt-1 ${discountOk ? 'text-green-600' : 'text-red-500'}`}>{discountMsg}</p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-none px-4 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-1.5">
          <ArrowLeft size={16} className="rotate-180" /> رجوع
        </button>
        <button onClick={onNext}
          className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:from-green-600 hover:to-teal-600 transition-all shadow-lg shadow-green-200 active:scale-98">
          التالي — طريقة الدفع <ArrowLeft size={16} />
        </button>
      </div>
    </div>
  );
};

// ============================================
// STEP 3: PAYMENT
// ============================================
const PaymentStep = ({ formData, setFormData, errors, cartTotal, shippingPrice, currentDiscount, onNext, onBack }) => {
  const [copiedVodafone, setCopiedVodafone] = useState(false);

  const subTotal = cartTotal + (shippingPrice || 0) - currentDiscount;
  const deposit = formData.paymentMethod === 'cash' ? Math.max(parseInt(formData.depositAmount) || 0, 0) : 0;
  const remaining = Math.max(subTotal - deposit, 0);

  const copyVodafone = () => {
    navigator.clipboard.writeText(PAYMENT_METHODS.vodafone.number).then(() => {
      setCopiedVodafone(true);
      setTimeout(() => setCopiedVodafone(false), 2500);
    });
  };

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-200 rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap size={16} className="text-green-600" />
          <h3 className="font-black text-green-800 text-sm">بعد الدفع — سيفتح واتساب تلقائياً</h3>
        </div>
        <p className="text-xs text-green-700">طلبك سيُرسل جاهزاً على واتساب مع كل تفاصيله. فقط أرسله وانتظر التأكيد! 🎉</p>
      </div>

      <label className="block text-xs font-black text-gray-700 mb-2">اختر طريقة الدفع *</label>

      <div className="space-y-3">
        {/* Vodafone Cash */}
        <div onClick={() => setFormData({ ...formData, paymentMethod: 'vodafone' })}
          className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${formData.paymentMethod === 'vodafone' ? 'border-red-400 bg-red-50 shadow-md' : 'border-gray-200 hover:border-red-200 bg-white'}`}>
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${formData.paymentMethod === 'vodafone' ? 'border-red-500' : 'border-gray-300'}`}>
              {formData.paymentMethod === 'vodafone' && <div className="w-2.5 h-2.5 rounded-full bg-red-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">📱</span>
                <span className="font-black text-gray-800 text-sm">فودافون كاش</span>
                <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-bold">مدفوع مسبقاً</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">حوّل المبلغ كاملاً ثم أرسل إيصال التحويل على الواتساب</p>
              <div className="flex items-center justify-between bg-white rounded-xl px-3 py-2 border border-red-100">
                <span className="font-mono font-bold text-gray-800 text-sm tracking-wider">{PAYMENT_METHODS.vodafone.number}</span>
                <button type="button" onClick={e => { e.stopPropagation(); copyVodafone(); }}
                  className="flex items-center gap-1 text-xs font-bold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 px-2 py-1 rounded-lg transition-all">
                  {copiedVodafone ? <><Check size={12} /> تم!</> : <><Copy size={12} /> نسخ</>}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* InstaPay */}
        <div onClick={() => setFormData({ ...formData, paymentMethod: 'instapay' })}
          className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${formData.paymentMethod === 'instapay' ? 'border-blue-400 bg-blue-50 shadow-md' : 'border-gray-200 hover:border-blue-200 bg-white'}`}>
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${formData.paymentMethod === 'instapay' ? 'border-blue-500' : 'border-gray-300'}`}>
              {formData.paymentMethod === 'instapay' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">💳</span>
                <span className="font-black text-gray-800 text-sm">إنستا باي</span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-bold">مدفوع مسبقاً</span>
              </div>
              <p className="text-xs text-gray-600 mb-2">حوّل المبلغ كاملاً ثم أرسل إيصال التحويل على الواتساب</p>
              <a href={PAYMENT_METHODS.instapay.link} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                className="inline-flex items-center gap-1.5 bg-blue-500 text-white text-xs font-bold px-3 py-1.5 rounded-lg hover:bg-blue-600 transition-all">
                <Sparkles size={12} /> اضغط هنا للدفع ← seifbank
              </a>
            </div>
          </div>
        </div>

        {/* Cash on Delivery */}
        <div onClick={() => setFormData({ ...formData, paymentMethod: 'cash' })}
          className={`rounded-2xl border-2 p-4 cursor-pointer transition-all ${formData.paymentMethod === 'cash' ? 'border-green-400 bg-green-50 shadow-md' : 'border-gray-200 hover:border-green-200 bg-white'}`}>
          <div className="flex items-start gap-3">
            <div className={`w-5 h-5 rounded-full border-2 mt-0.5 flex-shrink-0 flex items-center justify-center transition-all ${formData.paymentMethod === 'cash' ? 'border-green-500' : 'border-gray-300'}`}>
              {formData.paymentMethod === 'cash' && <div className="w-2.5 h-2.5 rounded-full bg-green-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-lg">💵</span>
                <span className="font-black text-gray-800 text-sm">الدفع عند الاستلام</span>
                <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">ديبوزت مقدم</span>
              </div>
              <p className="text-xs text-gray-600">ادفع جزءاً مقدماً (ديبوزت) والباقي عند وصول الطلب</p>
            </div>
          </div>

          {formData.paymentMethod === 'cash' && (
            <div className="mt-3 pt-3 border-t border-green-200 space-y-3" onClick={e => e.stopPropagation()}>
              <div>
                <label className="text-xs font-black text-gray-700 mb-1.5 flex items-center gap-1">
                  <Banknote size={13} className="text-green-600" /> مبلغ الديبوزت (الحد الأدنى {MIN_DEPOSIT} ج) *
                </label>
                <input type="number" placeholder={`${MIN_DEPOSIT} ج على الأقل`}
                  value={formData.depositAmount}
                  onChange={e => setFormData({ ...formData, depositAmount: e.target.value })}
                  min={MIN_DEPOSIT}
                  className={`w-full px-4 py-3 rounded-xl border-2 text-sm outline-none transition-all ${errors.depositAmount ? 'border-red-400 bg-red-50' : 'border-green-200 focus:border-green-400 bg-white'}`} />
                {errors.depositAmount && <p className="text-red-500 text-xs mt-1">{errors.depositAmount}</p>}
              </div>
              {formData.depositAmount && parseInt(formData.depositAmount) >= MIN_DEPOSIT && (
                <div className="bg-white rounded-xl border border-green-200 p-3 space-y-1.5">
                  <div className="flex justify-between text-xs text-gray-600">
                    <span>الإجمالي</span><span className="font-bold">{subTotal} ج</span>
                  </div>
                  <div className="flex justify-between text-xs text-orange-600">
                    <span>الديبوزت الآن</span><span className="font-bold">-{deposit} ج</span>
                  </div>
                  <div className="flex justify-between text-sm text-green-700 border-t border-green-100 pt-1.5 font-black">
                    <span>المتبقي عند الاستلام</span><span>{remaining} ج</span>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {errors.paymentMethod && <p className="text-red-500 text-xs font-bold">{errors.paymentMethod}</p>}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} className="flex-none px-4 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-1.5">
          <ArrowLeft size={16} className="rotate-180" /> رجوع
        </button>
        <button onClick={onNext}
          className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-3 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:from-green-600 hover:to-teal-600 transition-all shadow-lg shadow-green-200 active:scale-98">
          مراجعة الطلب <ArrowLeft size={16} />
        </button>
      </div>
    </div>
  );
};

// ============================================
// STEP 4: CONFIRM
// ============================================
const ConfirmStep = ({ formData, cart, cartTotal, shippingPrice, currentDiscount, isSubmitting, onSubmit, onBack }) => {
  const deposit = formData.paymentMethod === 'cash' ? Math.max(parseInt(formData.depositAmount) || 0, 0) : 0;
  const finalTotal = Math.max(cartTotal + (shippingPrice || 0) - currentDiscount - deposit, 0);
  const govName = EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.name || formData.governorate;
  const pm = PAYMENT_METHODS[formData.paymentMethod];

  const rows = [
    { label: 'الاسم', val: formData.fullName },
    { label: 'الهاتف', val: formData.phone },
    { label: 'المحافظة', val: govName },
    { label: 'العنوان', val: formData.address },
    { label: 'الدفع', val: pm?.name },
    ...(formData.discountCode && currentDiscount > 0 ? [{ label: 'كود الخصم', val: `${formData.discountCode} (-${currentDiscount} ج)` }] : []),
  ];

  return (
    <div className="space-y-4 animate-fade-in">
      <div className="bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl p-5 text-white text-center">
        <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center mx-auto mb-3">
          <MessageCircle size={24} className="text-white" />
        </div>
        <h3 className="font-black text-lg mb-1">جاهز للإرسال على واتساب!</h3>
        <p className="text-green-100 text-xs">راجع تفاصيل طلبك ثم اضغط "أرسل الطلب" — سيُفتح واتساب تلقائياً</p>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2.5">
        <h4 className="font-black text-gray-700 text-sm mb-3 flex items-center gap-2">
          <User size={15} className="text-green-600" /> بياناتك
        </h4>
        {rows.map((r, i) => (
          <div key={i} className="flex justify-between items-start gap-2 py-1.5 border-b border-gray-50 last:border-0">
            <span className="text-xs text-gray-500 flex-shrink-0">{r.label}:</span>
            <span className="text-xs font-bold text-gray-800 text-right">{r.val}</span>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 p-4">
        <h4 className="font-black text-gray-700 text-sm mb-3 flex items-center gap-2">
          <ShoppingCart size={15} className="text-green-600" /> المنتجات ({cart.length})
        </h4>
        <div className="space-y-2 max-h-32 overflow-y-auto mb-3">
          {cart.map(item => (
            <div key={item.id} className="flex justify-between text-xs">
              <span className="text-gray-600 truncate ml-2">{item.name} ×{item.quantity}</span>
              <span className="font-bold text-gray-800 flex-shrink-0">{item.price * item.quantity} ج</span>
            </div>
          ))}
        </div>
        <div className="bg-gradient-to-r from-green-500 to-teal-500 rounded-xl p-3 text-white flex justify-between items-center">
          <span className="font-bold text-sm">{deposit > 0 ? 'المتبقي عند الاستلام' : 'الإجمالي الكلي'}</span>
          <span className="font-black text-xl">{finalTotal} ج</span>
        </div>
        {deposit > 0 && (
          <p className="text-xs text-gray-500 text-center mt-1.5">الديبوزت المقدم: {deposit} ج</p>
        )}
      </div>

      {(formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay') && (
        <div className="bg-amber-50 border-2 border-amber-300 rounded-xl p-3 flex gap-2 items-start">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-black text-amber-800">تذكير مهم!</p>
            <p className="text-xs text-amber-700 mt-0.5">بعد التحويل، أرسل صورة الإيصال على واتساب لتأكيد طلبك</p>
          </div>
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button onClick={onBack} disabled={isSubmitting}
          className="flex-none px-4 py-3 rounded-xl bg-gray-100 text-gray-600 font-bold text-sm hover:bg-gray-200 transition-all flex items-center gap-1.5 disabled:opacity-50">
          <ArrowLeft size={16} className="rotate-180" /> رجوع
        </button>
        <button onClick={onSubmit} disabled={isSubmitting}
          className="flex-1 bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-2xl font-black text-base flex items-center justify-center gap-2 hover:from-green-600 hover:to-teal-600 transition-all shadow-xl shadow-green-200 active:scale-98 disabled:opacity-60 disabled:cursor-not-allowed">
          {isSubmitting ? (
            <><LoadingSpinner size={18} /> جاري الإرسال...</>
          ) : (
            <>
              <MessageCircle size={20} /> أرسل الطلب على واتساب 🟢
            </>
          )}
        </button>
      </div>
    </div>
  );
};

// ============================================
// MAIN CART PAGE
// ============================================
const CartPage = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [itemToDelete, setItemToDelete] = useState(null);
  const [lastSubmit, setLastSubmit] = useState(0);
  const [shippingPrice, setShippingPrice] = useState(null);
  const [discountSuccess, setDiscountSuccess] = useState('');

  const [formData, setFormData] = useState({
    fullName: '', phone: '', phoneAlt: '',
    governorate: '', address: '', notes: '',
    discountCode: '', paymentMethod: '', depositAmount: ''
  });

  const cartTotal = useMemo(() =>
    state.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0),
    [state.cart]
  );

  const currentDiscount = useMemo(() => {
    if (!formData.discountCode.trim()) return 0;
    const res = validateDiscountCode(formData.discountCode);
    return res.isValid ? res.amount : 0;
  }, [formData.discountCode]);

  const deposit = formData.paymentMethod === 'cash'
    ? Math.max(parseInt(formData.depositAmount) || 0, 0) : 0;

  const finalTotal = Math.max(cartTotal + (shippingPrice || 0) - currentDiscount - deposit, 0);

  const updateCartQuantity = useCallback((id, quantity) => {
    const validated = validateQuantity(quantity);
    if (validated <= 0) {
      const item = state.cart.find(i => i.id === id);
      setItemToDelete(item);
    } else {
      dispatch({ type: 'UPDATE_CART_QUANTITY', payload: { id, quantity: validated } });
    }
  }, [state.cart, dispatch]);

  const confirmDelete = useCallback(() => {
    if (itemToDelete) {
      dispatch({ type: 'REMOVE_FROM_CART', payload: itemToDelete.id });
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: `تم حذف ${itemToDelete.name}`, type: 'info' } });
      setItemToDelete(null);
    }
  }, [itemToDelete, dispatch]);

  const validateStep2 = useCallback(() => {
    const newErrors = {};
    const fullName = formData.fullName?.trim();
    if (!fullName || fullName.length < MIN_NAME_LENGTH) newErrors.fullName = `الاسم يجب أن يكون ${MIN_NAME_LENGTH} أحرف على الأقل`;
    const phone = formData.phone?.trim();
    if (!phone) newErrors.phone = 'رقم الهاتف مطلوب';
    else if (!validatePhone(phone)) newErrors.phone = 'رقم الهاتف غير صحيح (مثال: 01012345678)';
    if (formData.phoneAlt?.trim() && !validatePhone(formData.phoneAlt)) newErrors.phoneAlt = 'رقم الهاتف الثاني غير صحيح';
    if (!formData.governorate) newErrors.governorate = 'يرجى اختيار محافظة';
    const address = formData.address?.trim();
    if (!address || address.length < MIN_ADDRESS_LENGTH) newErrors.address = `العنوان يجب أن يكون ${MIN_ADDRESS_LENGTH} أحرف على الأقل`;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const validateStep3 = useCallback(() => {
    const newErrors = {};
    if (!formData.paymentMethod) newErrors.paymentMethod = 'يرجى اختيار طريقة الدفع';
    if (formData.paymentMethod === 'cash') {
      const dep = parseInt(formData.depositAmount) || 0;
      if (!formData.depositAmount || dep < MIN_DEPOSIT) newErrors.depositAmount = `الحد الأدنى للديبوزت ${MIN_DEPOSIT} جنيه`;
      const total = cartTotal + (shippingPrice || 0);
      if (dep > total) newErrors.depositAmount = 'الديبوزت لا يمكن أن يزيد عن الإجمالي';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, cartTotal, shippingPrice]);

  const handleStep2Next = () => {
    if (validateStep2()) { setErrors({}); setStep(3); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'يرجى تصحيح الأخطاء', type: 'error' } });
  };

  const handleStep3Next = () => {
    if (validateStep3()) { setErrors({}); setStep(4); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    else dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'يرجى اختيار طريقة الدفع', type: 'error' } });
  };

  const handleCheckout = useCallback(async () => {
    const now = Date.now();
    if (now - lastSubmit < SUBMIT_RATE_LIMIT) {
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'انتظر قليلاً قبل إرسال طلب آخر', type: 'warning' } });
      return;
    }

    setIsSubmitting(true);
    try {
      const fullName = sanitizeText(formData.fullName);
      const phone = formData.phone.trim();
      const phoneAlt = formData.phoneAlt?.trim() || '-';
      const govName = EGYPTIAN_GOVERNORATES.find(g => g.id === formData.governorate)?.name || formData.governorate;
      const address = sanitizeText(formData.address);
      const notes = sanitizeText(formData.notes);
      const pm = PAYMENT_METHODS[formData.paymentMethod];

      let msg = `🌿 *طلب جديد من كافورال*\n`;
      msg += `━━━━━━━━━━━━━━━━━━━━\n\n`;
      msg += `👤 *بيانات العميل*\n`;
      msg += `الاسم: ${fullName}\n`;
      msg += `الهاتف: ${phone}\n`;
      if (phoneAlt !== '-') msg += `هاتف آخر: ${phoneAlt}\n`;
      msg += `المحافظة: ${govName}\n`;
      msg += `العنوان: ${address}\n`;
      if (notes) msg += `ملاحظات: ${notes}\n`;
      msg += `\n🛒 *المنتجات*\n`;
      state.cart.forEach(item => {
        msg += `• ${item.name} × ${item.quantity} = ${item.price * item.quantity} ج\n`;
      });
      msg += `\n💰 *الحساب*\n`;
      msg += `المنتجات: ${cartTotal} ج\n`;
      if (shippingPrice !== null) msg += `الشحن: ${shippingPrice} ج\n`;
      if (currentDiscount > 0) msg += `خصم (${formData.discountCode}): -${currentDiscount} ج\n`;
      if (deposit > 0) msg += `ديبوزت مقدم: -${deposit} ج\n`;
      msg += `*الإجمالي المطلوب: ${finalTotal} ج*\n\n`;

      if (formData.paymentMethod === 'vodafone') {
        msg += `💳 *طريقة الدفع: فودافون كاش*\n`;
        msg += `الرقم: ${PAYMENT_METHODS.vodafone.number}\n`;
        msg += `⚠️ أرسل صورة إيصال التحويل بعد الدفع\n`;
      } else if (formData.paymentMethod === 'instapay') {
        msg += `💳 *طريقة الدفع: إنستا باي*\n`;
        msg += `المعرف: ${PAYMENT_METHODS.instapay.username}\n`;
        msg += `⚠️ أرسل صورة إيصال التحويل بعد الدفع\n`;
      } else if (formData.paymentMethod === 'cash') {
        msg += `💵 *طريقة الدفع: الدفع عند الاستلام*\n`;
        if (deposit > 0) {
          msg += `الديبوزت المقدم: ${deposit} ج\n`;
          msg += `المتبقي عند الاستلام: ${finalTotal} ج\n`;
          msg += `⚠️ أرسل إيصال الديبوزت على الواتساب\n`;
        }
      }
      msg += `\n━━━━━━━━━━━━━━━━━━━━`;

      const waUrl = `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodeURIComponent(msg)}`;

      if (formData.paymentMethod !== 'cash') {
        dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'تذكر: أرسل صورة الإيصال بعد التحويل!', type: 'warning' } });
      }

      const newWin = window.open(waUrl, '_blank');
      if (!newWin || newWin.closed) {
        try { await navigator.clipboard.writeText(waUrl); } catch (e) { console.error(e); }
        setIsSubmitting(false);
        return;
      }

      await new Promise(r => setTimeout(r, 1500));

      dispatch({
        type: 'SET_LAST_ORDER',
        payload: {
          orderNumber: `ORD-${Date.now()}`,
          date: new Date().toLocaleDateString('ar-EG'),
          time: new Date().toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' }),
          items: [...state.cart],
          total: finalTotal,
          cartSubtotal: cartTotal,
          shippingPrice: shippingPrice || 0,
          discountAmount: currentDiscount,
          discountCode: formData.discountCode,
          deposit,
          customerName: fullName,
          customerPhone: phone,
          paymentMethod: pm?.name,
          needsPaymentProof: formData.paymentMethod === 'vodafone' || formData.paymentMethod === 'instapay'
        }
      });

      dispatch({ type: 'CLEAR_CART' });
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: '🎉 تم إرسال الطلب على واتساب!', type: 'success' } });

      setFormData({ fullName: '', phone: '', phoneAlt: '', governorate: '', address: '', notes: '', discountCode: '', paymentMethod: '', depositAmount: '' });
      setLastSubmit(Date.now());
      setShippingPrice(null);
      setStep(1);

      setTimeout(() => navigateTo('order-success'), 500);

    } catch (err) {
      console.error('Checkout error:', err);
      dispatch({ type: 'ADD_NOTIFICATION', payload: { message: 'حدث خطأ، حاول مرة أخرى', type: 'error' } });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, state, dispatch, cartTotal, finalTotal, shippingPrice, deposit, currentDiscount, lastSubmit, navigateTo]);

  // Empty cart
  if (state.cart.length === 0 && step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-12">
        <div className="container mx-auto px-4 max-w-lg">
          <EmptyState
            icon={ShoppingCart}
            title="السلة فارغة"
            description="لم تقم بإضافة أي منتجات بعد. اكتشف مجموعتنا من الزيوت الطبيعية!"
            actionLabel="ابدأ التسوق"
            onAction={() => navigateTo('products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4 py-6 max-w-2xl">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
            <ShoppingCart size={20} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-800">سلة التسوق</h1>
            <p className="text-xs text-gray-500">{state.cart.length} منتج · {cartTotal} ج</p>
          </div>
          <Badge variant="success" className="mr-auto">{state.cart.length} منتج</Badge>
        </div>

        {/* Step Indicator */}
        <StepIndicator currentStep={step} />

        {/* Two-column layout for desktop */}
        <div className={`grid gap-6 ${step >= 2 ? 'lg:grid-cols-5' : 'grid-cols-1'}`}>

          {/* Main Content */}
          <div className={step >= 2 ? 'lg:col-span-3' : 'col-span-1'}>
            {step === 1 && (
              <CartStep
                cart={state.cart}
                onUpdateQuantity={updateCartQuantity}
                onDelete={setItemToDelete}
                onNext={() => { setStep(2); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              />
            )}
            {step === 2 && (
              <InfoStep
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                onNext={handleStep2Next}
                onBack={() => setStep(1)}
                shippingPrice={shippingPrice}
                setShippingPrice={setShippingPrice}
                dispatch={dispatch}
              />
            )}
            {step === 3 && (
              <PaymentStep
                formData={formData}
                setFormData={setFormData}
                errors={errors}
                cartTotal={cartTotal}
                shippingPrice={shippingPrice}
                currentDiscount={currentDiscount}
                onNext={handleStep3Next}
                onBack={() => setStep(2)}
              />
            )}
            {step === 4 && (
              <ConfirmStep
                formData={formData}
                cart={state.cart}
                cartTotal={cartTotal}
                shippingPrice={shippingPrice}
                currentDiscount={currentDiscount}
                isSubmitting={isSubmitting}
                onSubmit={handleCheckout}
                onBack={() => setStep(3)}
              />
            )}
          </div>

          {/* Order Summary Sidebar - shown from step 2 onwards */}
          {step >= 2 && (
            <div className="lg:col-span-2 space-y-4">
              <OrderSummary
                cart={state.cart}
                cartTotal={cartTotal}
                shippingPrice={shippingPrice}
                currentDiscount={currentDiscount}
                deposit={deposit}
                formData={formData}
              />
              <div className="bg-white rounded-2xl border border-gray-100 p-4 space-y-2">
                <div className="flex items-center gap-2 text-green-700">
                  <Shield size={15} className="text-green-500" />
                  <p className="text-xs font-bold">شراء آمن ومضمون 100%</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Truck size={15} className="text-blue-500" />
                  <p className="text-xs">توصيل لجميع محافظات مصر</p>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <MessageCircle size={15} className="text-green-500" />
                  <p className="text-xs">طلبك يُرسل مباشرة على واتساب</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirm Delete Modal */}
      <ConfirmModal
        isOpen={!!itemToDelete}
        title="حذف المنتج"
        message={
          <div>
            <p>هل تريد حذف</p>
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