// ============================================
// CONSTANTS FILE - ملف الثوابت المركزي
// المسار: src/constants/index.js
// الاستخدام: import { CONSTANTS_NAME } from '../constants'
// ============================================

// ============================================
// VALIDATION CONSTANTS
// ============================================
export const VALIDATION = {
  NAME: {
    MIN: 3,
    MAX: 100,
    REGEX: /^[\u0600-\u06FF\s\-]*$/ // أحرف عربية فقط
  },
  
  PHONE: {
    REGEX: /^(\+?20|0)?1[0125]\d{8}$/,
    EXAMPLE: '01012345678'
  },
  
  EMAIL: {
    REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    MAX: 255
  },
  
  ADDRESS: {
    MIN: 10,
    MAX: 500
  },
  
  SEARCH: {
    MAX: 100,
    DEBOUNCE_DELAY: 300
  },
  
  PASSWORD: {
    MIN: 6,
    MAX: 50
  }
};

// ============================================
// QUANTITY & CART CONSTANTS
// ============================================
export const CART = {
  MAX_ITEMS: 1000,
  MAX_QUANTITY_PER_ITEM: 100,
  MIN_QUANTITY: 1,
  SUBMIT_RATE_LIMIT: 5000 // 5 seconds
};

// ============================================
// PRICE CONSTANTS
// ============================================
export const PRICE = {
  MIN: 0,
  MAX: 10000,
  CURRENCY: 'جنيه',
  FREE_SHIPPING_THRESHOLD: 500,
  STANDARD_SHIPPING: 50
};

// ============================================
// DISCOUNT CONSTANTS
// ============================================
export const DISCOUNT = {
  MIN: 0,
  MAX: 100,
  GLOBAL_PRODUCT: 50,
  GLOBAL_BUNDLE: 50
};

// ============================================
// NOTIFICATION CONSTANTS
// ============================================
export const NOTIFICATIONS = {
  MAX_SHOWN: 10,
  DURATION: 4000, // 4 seconds
  TYPES: {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
  }
};

// ============================================
// ANIMATION CONSTANTS
// ============================================
export const ANIMATIONS = {
  DURATION: {
    SHORT: 300,
    NORMAL: 500,
    LONG: 1000,
    EXTRA_LONG: 2000
  },
  DELAY: {
    MICRO: 30,
    SMALL: 100,
    NORMAL: 300,
    LARGE: 500
  }
};

// ============================================
// TIMEOUT CONSTANTS
// ============================================
export const TIMEOUTS = {
  INITIAL_LOAD: 1500,
  API_CALL: 5000,
  DEBOUNCE: 300,
  THROTTLE: 500,
  POPUP_WAIT: 1500
};

// ============================================
// ERROR MESSAGES
// ============================================
export const ERROR_MESSAGES = {
  VALIDATION: {
    NAME_SHORT: 'الاسم يجب أن يكون 3 أحرف على الأقل',
    NAME_LONG: 'الاسم طويل جداً (100 حروف كحد أقصى)',
    NAME_INVALID: 'الاسم يجب أن يحتوي على أحرف عربية فقط',
    
    PHONE_REQUIRED: 'رقم الهاتف مطلوب',
    PHONE_INVALID: 'رقم الهاتف غير صحيح (مثال: 01012345678)',
    
    EMAIL_INVALID: 'البريد الإلكتروني غير صحيح',
    
    ADDRESS_SHORT: 'العنوان يجب أن يكون 10 أحرف على الأقل',
    ADDRESS_LONG: 'العنوان طويل جداً (500 حروف كحد أقصى)',
    
    QUANTITY_INVALID: 'الكمية غير صحيحة',
    QUANTITY_MAX: `الحد الأقصى للكمية هو ${CART.MAX_QUANTITY_PER_ITEM}`
  },
  
  CART: {
    QUANTITY_REQUIRED: 'يرجى تحديد الكمية أولاً',
    PRODUCT_UNAVAILABLE: 'هذا المنتج غير متوفر حالياً',
    CART_FULL: 'السلة امتلأت',
    EMPTY_CART: 'السلة فارغة'
  },
  
  NETWORK: {
    OFFLINE: 'لا توجد اتصال بالإنترنت 🔴',
    TIMEOUT: 'انتهت مهلة الاتصال',
    ERROR: 'حدث خطأ في الاتصال'
  },
  
  CHECKOUT: {
    FORM_INVALID: 'يرجى تصحيح الأخطاء في النموذج',
    SUBMIT_FAILED: 'فشل إرسال الطلب',
    SUBMIT_WAIT: 'يرجى الانتظار قليلاً قبل إرسال طلب آخر'
  }
};

// ============================================
// SUCCESS MESSAGES
// ============================================
export const SUCCESS_MESSAGES = {
  ADDED_TO_CART: 'تم إضافة المنتج للسلة ✅',
  ADDED_TO_WISHLIST: 'تم إضافة المنتج للمفضلة ✅',
  REMOVED_FROM_WISHLIST: 'تم حذف المنتج من المفضلة',
  ORDER_SUBMITTED: 'تم إرسال الطلب بنجاح! سنتواصل معك قريباً',
  ONLINE_RESTORED: 'تم استعادة الاتصال بالإنترنت ✅'
};

// ============================================
// STORAGE KEYS (آمن مع التحقق من التوفر)
// ============================================
export const STORAGE_KEYS = {
  CART: 'kavoral_cart',
  WISHLIST: 'kavoral_wishlist',
  CUSTOMER_INFO: 'kavoral_customer_info',
  PREFERENCES: 'kavoral_preferences'
};

// ============================================
// STORAGE CONFIG
// ============================================
export const STORAGE_CONFIG = {
  // الفترة الزمنية لحفظ البيانات (بالدقائق)
  AUTO_SAVE_INTERVAL: 5,
  // حد أقصى لحجم البيانات المحفوظة (بالـ MB)
  MAX_STORAGE_SIZE: 5,
  // استراتيجية التعامل مع امتلاء التخزين
  STORAGE_FULL_STRATEGY: 'clear_old', // clear_old | warn | disable
  // تفعيل التشفير (للبيانات الحساسة)
  ENCRYPT_SENSITIVE_DATA: false
};

// ============================================
// PAGINATION & LISTS
// ============================================
export const PAGINATION = {
  ITEMS_PER_PAGE: 12,
  MAX_ITEMS_SMALL: 3,
  MAX_ITEMS_MEDIUM: 6,
  MAX_ITEMS_LARGE: 12
};

// ============================================
// IMAGE CONSTANTS
// ============================================
export const IMAGES = {
  FALLBACK_EMOJI: '🌿',
  SIZES: {
    THUMBNAIL: 100,
    SMALL: 200,
    MEDIUM: 400,
    LARGE: 800
  },
  FORMATS: {
    WEBP: 'image/webp',
    JPEG: 'image/jpeg',
    PNG: 'image/png'
  }
};

// ============================================
// ROUTES
// ============================================
export const ROUTES = {
  HOME: 'home',
  PRODUCTS: 'products',
  PRODUCT_DETAILS: 'product-details',
  OFFERS: 'offers',
  CART: 'cart',
  WISHLIST: 'wishlist',
  CONTACT: 'contact',
  ABOUT: 'about'
};

// ============================================
// REGEX PATTERNS
// ============================================
export const REGEX = {
  PHONE: /^(\+?20|0)?1[0125]\d{8}$/,
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  ARABIC_ONLY: /^[\u0600-\u06FF\s\-]*$/,
  NUMBER_ONLY: /^\d+$/,
  SAFE_TEXT: /^[a-zA-Z0-9\u0600-\u06FF\s\-.,!']*$/
};

// ============================================
// COLORS
// ============================================
export const COLORS = {
  PRIMARY: '#22c55e',
  SECONDARY: '#14b8a6',
  SUCCESS: '#22c55e',
  ERROR: '#ef4444',
  WARNING: '#f59e0b',
  INFO: '#3b82f6'
};

// ============================================
// Z-INDEX LEVELS
// ============================================
export const Z_INDEX = {
  BASE: 0,
  DROPDOWN: 10,
  STICKY: 20,
  FIXED: 30,
  MODAL_BACKDROP: 40,
  MODAL: 50,
  POPOVER: 60,
  TOOLTIP: 70,
  NOTIFICATION: 80,
  LOADER: 9999
};

export default {
  VALIDATION,
  CART,
  PRICE,
  DISCOUNT,
  NOTIFICATIONS,
  ANIMATIONS,
  TIMEOUTS,
  ERROR_MESSAGES,
  SUCCESS_MESSAGES,
  STORAGE_KEYS,
  PAGINATION,
  IMAGES,
  ROUTES,
  REGEX,
  COLORS,
  Z_INDEX
};