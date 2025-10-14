// ============================================
// HELPERS FILE - ملف الدوال المساعدة
// المسار: src/utils/helpers.js
// الاستخدام: import { functionName } from '../utils/helpers'
// ============================================

import { VALIDATION, REGEX } from '../constants';

// ============================================
// SANITIZATION & VALIDATION FUNCTIONS
// ============================================

/**
 * تنظيف النصوص من الأحرف الخطرة - حماية من XSS
 * @param {string} text - النص المراد تنظيفه
 * @param {number} maxLength - الحد الأقصى للطول
 * @returns {string} - النص المنظف
 */
export const sanitizeText = (text, maxLength = 1000) => {
  if (typeof text !== 'string') return '';
  
  return text
    .replace(/[<>"'`]/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
    .substring(0, maxLength);
};

/**
 * التحقق من صيغة رقم الهاتف
 * @param {string} phone - رقم الهاتف
 * @returns {boolean} - هل الرقم صحيح
 */
export const validatePhone = (phone) => {
  return REGEX.PHONE.test(phone?.trim());
};

/**
 * التحقق من صيغة البريد الإلكتروني
 * @param {string} email - البريد الإلكتروني
 * @returns {boolean} - هل البريد صحيح
 */
export const validateEmail = (email) => {
  return REGEX.EMAIL.test(email?.trim());
};

/**
 * التحقق من صحة الاسم
 * @param {string} name - الاسم
 * @returns {object} - { isValid: boolean, error?: string }
 */
export const validateName = (name) => {
  const trimmed = name?.trim();
  
  if (!trimmed || trimmed.length < VALIDATION.NAME.MIN) {
    return { isValid: false, error: 'الاسم قصير جداً' };
  }
  
  if (trimmed.length > VALIDATION.NAME.MAX) {
    return { isValid: false, error: 'الاسم طويل جداً' };
  }
  
  return { isValid: true };
};

/**
 * التحقق من صحة الكمية
 * @param {number} quantity - الكمية
 * @param {number} max - الحد الأقصى
 * @param {number} min - الحد الأدنى
 * @returns {number} - الكمية الصحيحة
 */
export const validateQuantity = (quantity, max = 100, min = 1) => {
  const num = parseInt(quantity) || 0;
  return Math.max(min, Math.min(num, max));
};

/**
 * التحقق من صحة السعر
 * @param {number} price - السعر
 * @returns {number} - السعر الصحيح
 */
export const validatePrice = (price) => {
  const num = parseFloat(price) || 0;
  return Math.max(num, 0);
};

/**
 * التحقق من صحة المنتج
 * @param {object} product - المنتج
 * @returns {boolean} - هل المنتج صحيح
 */
export const validateProduct = (product) => {
  if (!product) return false;
  if (!product.id || !product.name || product.price === undefined) return false;
  if (product.price < 0 || product.originalPrice < 0) return false;
  return true;
};

// ============================================
// FORMATTING FUNCTIONS
// ============================================

/**
 * تنسيق السعر
 * @param {number} price - السعر
 * @param {string} currency - العملة
 * @returns {string} - السعر المنسق
 */
export const formatPrice = (price, currency = 'جنيه') => {
  if (!price || isNaN(price)) return `0 ${currency}`;
  return `${Math.round(price)} ${currency}`;
};

/**
 * تنسيق الرقم بفواصل
 * @param {number} num - الرقم
 * @returns {string} - الرقم المنسق
 */
export const formatNumber = (num) => {
  if (!num || isNaN(num)) return '0';
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

/**
 * تنسيق التاريخ
 * @param {Date|string} date - التاريخ
 * @returns {string} - التاريخ المنسق
 */
export const formatDate = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const day = d.getDate().toString().padStart(2, '0');
  const month = (d.getMonth() + 1).toString().padStart(2, '0');
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

/**
 * تنسيق الوقت
 * @param {Date|string} date - التاريخ
 * @returns {string} - الوقت المنسق
 */
export const formatTime = (date) => {
  if (!date) return '';
  const d = new Date(date);
  const hours = d.getHours().toString().padStart(2, '0');
  const minutes = d.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
};

/**
 * اختصار النص
 * @param {string} text - النص
 * @param {number} length - الطول
 * @returns {string} - النص المختصر
 */
export const truncateText = (text, length = 50) => {
  if (!text) return '';
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

// ============================================
// CALCULATION FUNCTIONS
// ============================================

/**
 * حساب الخصم
 * @param {number} originalPrice - السعر الأصلي
 * @param {number} discountPercentage - نسبة الخصم
 * @returns {number} - السعر بعد الخصم
 */
export const calculateDiscount = (originalPrice, discountPercentage) => {
  if (!originalPrice || discountPercentage < 0) return originalPrice;
  
  const effectiveDiscount = Math.min(Math.max(discountPercentage, 0), 100);
  return Math.round(originalPrice * (1 - effectiveDiscount / 100));
};

/**
 * حساب المبلغ الموفر
 * @param {number} originalPrice - السعر الأصلي
 * @param {number} discountPercentage - نسبة الخصم
 * @returns {number} - المبلغ الموفر
 */
export const calculateSavings = (originalPrice, discountPercentage) => {
  if (!originalPrice || discountPercentage <= 0) return 0;
  
  const effectiveDiscount = Math.min(Math.max(discountPercentage, 0), 100);
  return Math.round(originalPrice * (effectiveDiscount / 100));
};

/**
 * حساب النسبة المئوية
 * @param {number} value - القيمة
 * @param {number} total - الإجمالي
 * @returns {number} - النسبة المئوية
 */
export const calculatePercentage = (value, total) => {
  if (!total || total === 0) return 0;
  return Math.round((value / total) * 100);
};

/**
 * حساب الإجمالي
 * @param {array} items - المنتجات
 * @param {string} priceKey - مفتاح السعر
 * @param {string} quantityKey - مفتاح الكمية
 * @returns {number} - الإجمالي
 */
export const calculateTotal = (items, priceKey = 'price', quantityKey = 'quantity') => {
  if (!Array.isArray(items)) return 0;
  
  return items.reduce((total, item) => {
    const price = item?.[priceKey] || 0;
    const quantity = item?.[quantityKey] || 0;
    return total + (price * quantity);
  }, 0);
};

// ============================================
// DEBOUNCE & THROTTLE FUNCTIONS
// ============================================

/**
 * دالة Debounce
 * @param {function} func - الدالة المراد تأخيرها
 * @param {number} delay - التأخير بالميلي ثانية
 * @returns {function} - الدالة المُحسّنة
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

/**
 * دالة Throttle
 * @param {function} func - الدالة المراد تحديدها
 * @param {number} limit - الفترة الزمنية بالميلي ثانية
 * @returns {function} - الدالة المُحسّنة
 */
export const throttle = (func, limit = 300) => {
  let inThrottle;
  
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
};

// ============================================
// ARRAY FUNCTIONS
// ============================================

/**
 * البحث في المصفوفة
 * @param {array} items - المصفوفة
 * @param {string} searchTerm - البحث
 * @param {array} searchKeys - المفاتيح المراد البحث فيها
 * @returns {array} - النتائج
 */
export const searchInArray = (items, searchTerm, searchKeys = []) => {
  if (!Array.isArray(items) || !searchTerm) return items;
  
  const term = searchTerm.toLowerCase();
  return items.filter(item => {
    return searchKeys.some(key => {
      const value = item?.[key];
      return value && String(value).toLowerCase().includes(term);
    });
  });
};

/**
 * تجميع المصفوفة
 * @param {array} items - المصفوفة
 * @param {string} key - مفتاح التجميع
 * @returns {object} - المجموعات
 */
export const groupBy = (items, key) => {
  if (!Array.isArray(items)) return {};
  
  return items.reduce((groups, item) => {
    const groupKey = item?.[key];
    if (!groups[groupKey]) {
      groups[groupKey] = [];
    }
    groups[groupKey].push(item);
    return groups;
  }, {});
};

/**
 * فرز المصفوفة
 * @param {array} items - المصفوفة
 * @param {string} key - مفتاح الفرز
 * @param {string} order - ترتيب الفرز (asc/desc)
 * @returns {array} - المصفوفة المرتبة
 */
export const sortArray = (items, key, order = 'asc') => {
  if (!Array.isArray(items)) return [];
  
  return [...items].sort((a, b) => {
    const valueA = a?.[key];
    const valueB = b?.[key];
    
    if (order === 'asc') {
      return valueA > valueB ? 1 : -1;
    } else {
      return valueA < valueB ? 1 : -1;
    }
  });
};

// ============================================
// OBJECT FUNCTIONS
// ============================================

/**
 * دمج الكائنات
 * @param {object} target - الهدف
 * @param {object} source - المصدر
 * @returns {object} - الكائن المدمج
 */
export const mergeObjects = (target, source) => {
  return {
    ...target,
    ...source
  };
};

/**
 * حذف المفاتيح من الكائن
 * @param {object} obj - الكائن
 * @param {array} keysToRemove - المفاتيح المراد حذفها
 * @returns {object} - الكائن الجديد
 */
export const removeKeys = (obj, keysToRemove = []) => {
  const result = { ...obj };
  keysToRemove.forEach(key => {
    delete result[key];
  });
  return result;
};

// ============================================
// UNIQUE ID GENERATOR
// ============================================

/**
 * توليد معرف فريد
 * @returns {number} - معرف فريد
 */
export const generateUniqueId = () => {
  return Date.now() + Math.random();
};

/**
 * توليد معرف عشوائي
 * @param {number} length - الطول
 * @returns {string} - معرف عشوائي
 */
export const generateRandomId = (length = 8) => {
  return Math.random().toString(36).substring(2, 2 + length);
};

// ============================================
// LOGGER FUNCTION
// ============================================

/**
 * تسجيل الأخطاء
 * @param {string} context - السياق
 * @param {error} error - الخطأ
 * @param {object} data - بيانات إضافية
 */
export const logError = (context, error, data = {}) => {
  console.error(`[${context}]`, {
    message: error?.message,
    stack: error?.stack,
    ...data
  });
};

/**
 * تسجيل المعلومات
 * @param {string} context - السياق
 * @param {string} message - الرسالة
 * @param {object} data - بيانات إضافية
 */
export const logInfo = (context, message, data = {}) => {
  console.log(`[${context}] ${message}`, data);
};

export default {
  sanitizeText,
  validatePhone,
  validateEmail,
  validateName,
  validateQuantity,
  validatePrice,
  validateProduct,
  formatPrice,
  formatNumber,
  formatDate,
  formatTime,
  truncateText,
  calculateDiscount,
  calculateSavings,
  calculatePercentage,
  calculateTotal,
  debounce,
  throttle,
  searchInArray,
  groupBy,
  sortArray,
  mergeObjects,
  removeKeys,
  generateUniqueId,
  generateRandomId,
  logError,
  logInfo
};