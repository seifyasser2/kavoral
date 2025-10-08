// ============================================
// SITE CONFIGURATION - التكوين الشامل للموقع
// ============================================

export const SITE_CONFIG = {
  // معلومات الموقع الأساسية
  name: "Kavoral",
  tagline: "رائدة في مجال الزيوت الطبيعية والعناية بالجمال",
  description: "متجر متخصص في الزيوت الطبيعية المعصورة على البارد بأعلى معايير الجودة",
  
  // بيانات التواصل
  contact: {
    phone: "01016993805",
    phoneDisplay: "01016993805", // للعرض
    email: "kavoral.eg@gmail.com",
    whatsapp: "2001016993805", // بدون + أو 00
    whatsappGroup: "https://chat.whatsapp.com/L6Rf4p2i0rY4V2x7JMwlnQ",
    workingHours: "نعمل يومياً من 9ص إلى 9م",
    workingDays: "السبت - الخميس"
  },
  
  // روابط السوشيال ميديا
  social: {
    facebook: "https://www.facebook.com/Kavoral.eg",
    instagram: "https://www.instagram.com/kavoral.eg/?igsh=NnE1ZWg5Y3B5Nmc5#",
    tiktok: "https://www.tiktok.com/@kavoral.eg?_t=ZS-907B4AEtFtI&_r=1",
  },
  
  // إعدادات الشحن
  shipping: {
    freeShippingThreshold: 500, // الحد الأدنى للشحن المجاني
    standardShipping: 50, // سعر الشحن العادي
    estimatedDelivery: "24-48 ساعة", // مدة التوصيل المتوقعة
    deliveryAreas: "جميع محافظات مصر"
  },
  
  // معلومات الشركة
  company: {
    foundedYear: 2024,
    yearsOfExperience: 1,
    customersCount: 5000,
    productsCount: 15,
    satisfactionRate: 98
  },
  
  // بيانات المطور (منفصلة عن البراند)
  developer: {
    name: "Seif Yasser",
    phone: "01061280704",
    whatsapp: "201061280704", // بدون + أو 00
    email: "seif.dev@example.com" // اختياري
  },
};

// ============================================
// أحجام الزجاجات المتاحة
// ============================================
export const BOTTLE_SIZES = {
  small: "25 مل",
  medium: "50 مل",
  large: "200 مل",
  xlarge: "500 مل"
};

// ============================================
// الفئات المتاحة
// ============================================
export const CATEGORIES = [
  { id: "all", name: "جميع الفئات", icon: "🌿", description: "كل المنتجات" },
  { id: "hair", name: "العناية بالشعر", icon: "💇‍♀️", description: "زيوت لتقوية وتغذية الشعر" },
  { id: "skin", name: "العناية بالبشرة", icon: "✨", description: "زيوت لترطيب وتغذية البشرة" },
  { id: "anti-aging", name: "مكافحة الشيخوخة", icon: "🌸", description: "زيوت لمحاربة علامات التقدم بالعمر" },
  { id: "hair-growth", name: "تحفيز نمو الشعر", icon: "🌱", description: "زيوت لتطويل الشعر ومنع التساقط" },
  { id: "relaxation", name: "الاسترخاء", icon: "🧘‍♀️", description: "زيوت للتدليك والاسترخاء" },
];

// ============================================
// دالة مساعدة للحصول على رابط واتساب
// ============================================
export const getWhatsAppLink = (message = "مرحباً، أريد الاستفسار") => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.contact.whatsapp}?text=${encodedMessage}`;
};

// ============================================
// دالة مساعدة للحصول على رابط واتساب المطور
// ============================================
export const getDeveloperWhatsAppLink = (message = "مرحباً، أريد التواصل مع المطور") => {
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.developer.whatsapp}?text=${encodedMessage}`;
};

// ============================================
// دالة للتحقق من أهلية الشحن المجاني
// ============================================
export const isEligibleForFreeShipping = (total) => {
  return total >= SITE_CONFIG.shipping.freeShippingThreshold;
};

// ============================================
// دالة لحساب تكلفة الشحن
// ============================================
export const calculateShipping = (total) => {
  return isEligibleForFreeShipping(total) ? 0 : SITE_CONFIG.shipping.standardShipping;
};

// ============================================
// دالة لحساب المبلغ المتبقي للشحن المجاني
// ============================================
export const getRemainingForFreeShipping = (total) => {
  if (isEligibleForFreeShipping(total)) return 0;
  return SITE_CONFIG.shipping.freeShippingThreshold - total;
};

export default SITE_CONFIG;