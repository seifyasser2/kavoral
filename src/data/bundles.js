import { getProductById } from './products';

// ============================================
// دالة لحساب السعر بعد الخصم تلقائياً
// ============================================
const calculateBundlePrice = (originalPrice, discountPercentage) => {
  if (!originalPrice || discountPercentage < 0) return originalPrice;
  
  // تأكد أن الخصم لا يتجاوز 100%
  const effectiveDiscount = Math.min(Math.max(discountPercentage, 0), 100);
  return Math.round(originalPrice * (1 - effectiveDiscount / 100));
};

// ============================================
// دالة لحساب المبلغ الموفر
// ============================================
const calculateSavings = (originalPrice, discountPercentage) => {
  if (!originalPrice || discountPercentage <= 0) return 0;
  
  const effectiveDiscount = Math.min(Math.max(discountPercentage, 0), 100);
  return Math.round(originalPrice * (effectiveDiscount / 100));
};

// ============================================
// الخصم العام للعروض - استخدم أحده فقط
// ============================================
export const GLOBAL_BUNDLE_DISCOUNT = 50;

// ============================================
// بيانات العروض الخام
// ============================================
const bundlesRawData = [
  {
    id: 'hair-care-bundle',
    name: 'باقة العناية بالشعر الكاملة',
    description: 'مجموعة متكاملة من 3 زيوت طبيعية للعناية الشاملة بالشعر',
    image: 'https://images.unsplash.com/photo-1522338242992-e1a54906a8da?w=400&h=400&fit=crop',
    imageAlt: '💇‍♀️',
    products: [1, 5, 6],
    originalPrice: 500,
    discountPercentage: 0,
    category: 'hair-care',
    featured: true,
    benefits: [
      'تقوية وتغذية شاملة للشعر',
      'يوقف التساقط ويحفز النمو',
      'يعطي لمعاناً طبيعياً مميز',
      'وفر المال مع هذه الباقة'
    ]
  },
  {
    id: 'premium-oils-bundle',
    name: 'باقة الزيوت الممتازة',
    description: 'أفضل 3 زيوت طبيعية مميزة للعناية الفاخرة',
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    imageAlt: '✨',
    products: [4, 2, 6],
    originalPrice: 630,
    discountPercentage: 0,
    category: 'premium',
    featured: true,
    benefits: [
      'أجود أنواع الزيوت الطبيعية',
      'عناية فاخرة متكاملة',
      'مكافحة الشيخوخة والترطيب',
      'وفر مع هذه الباقة المميزة'
    ]
  },
  {
    id: 'skin-care-bundle',
    name: 'باقة العناية بالبشرة الطبيعية',
    description: 'ثلاثة زيوت مثالية للعناية اليومية بالبشرة',
    image: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&h=400&fit=crop',
    imageAlt: '🌸',
    products: [2, 3, 6],
    originalPrice: 590,
    discountPercentage: 0,
    category: 'skincare',
    featured: false,
    benefits: [
      'ترطيب وتغذية عميقة للبشرة',
      'مناسب للبشرة الحساسة',
      'يحارب علامات الشيخوخة',
      'وفر مع هذه الباقة'
    ]
  },
  {
    id: 'hair-growth-bundle',
    name: 'باقة تحفيز نمو الشعر',
    description: 'أقوى 3 زيوت لمحاربة تساقط الشعر وتحفيز النمو',
    image: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&h=400&fit=crop',
    imageAlt: '🌱',
    products: [5, 1, 4],
    originalPrice: 550,
    discountPercentage: 0,
    category: 'hair-growth',
    featured: false,
    benefits: [
      'يوقف تساقط الشعر نهائياً',
      'ينشط الدورة الدموية لفروة الرأس',
      'يزيد كثافة ونمو الشعر',
      'وفر مع هذه الباقة القوية'
    ]
  }
];

// ============================================
// حساب الأسعار تلقائياً - بدون جمع الخصومات
// ============================================
export const BUNDLE_OFFERS = bundlesRawData.map(bundle => {
  // ✅ إذا الخصم الخاص = 0، استخدم الخصم العام
  // ✅ إذا الخصم الخاص > 0، استخدم الخصم الخاص فقط (بدون جمع)
  const effectiveDiscount = bundle.discountPercentage > 0
    ? bundle.discountPercentage
    : GLOBAL_BUNDLE_DISCOUNT;
  
  // تأكد أن الخصم لا يتجاوز 100%
  const totalDiscount = Math.min(Math.max(effectiveDiscount, 0), 100);
  
  const finalPrice = calculateBundlePrice(bundle.originalPrice, totalDiscount);
  const savings = calculateSavings(bundle.originalPrice, totalDiscount);
  
  return {
    ...bundle,
    bundlePrice: finalPrice,
    savings: savings,
    totalDiscountPercentage: totalDiscount
  };
});

// ============================================
// دالة للحصول على عرض حسب ID
// ============================================
export const getBundleById = (id) => {
  return BUNDLE_OFFERS.find(b => b.id === id) || null;
};

// ============================================
// دالة للحصول على العروض المميزة
// ============================================
export const getFeaturedBundles = () => {
  return BUNDLE_OFFERS.filter(b => b.featured);
};

// ============================================
// دالة للتحقق من صحة المنتجات في العرض
// ============================================
export const validateBundleProducts = (bundle) => {
  if (!bundle || !bundle.products) return false;
  
  const validProducts = bundle.products
    .map(id => getProductById(id))
    .filter(product => product !== null);
  
  return validProducts.length === bundle.products.length;
};

// ============================================
// دالة لحساب السعر الفعلي للعرض من المنتجات
// ============================================
export const calculateBundleOriginalPrice = (bundle) => {
  if (!bundle || !bundle.products) return 0;
  
  return bundle.products.reduce((total, productId) => {
    const product = getProductById(productId);
    return total + (product ? product.originalPrice : 0);
  }, 0);
};

// ============================================
// دالة للحصول على إجمالي السعر الحالي للعرض
// ============================================
export const calculateBundleCurrentPrice = (bundle) => {
  if (!bundle || !bundle.products) return 0;
  
  return bundle.products.reduce((total, productId) => {
    const product = getProductById(productId);
    return total + (product ? product.price : 0);
  }, 0);
};

// ============================================
// دالة للتحقق من صحة العرض
// ============================================
export const validateBundle = (bundle) => {
  if (!bundle) return false;
  if (!bundle.id || !bundle.name || !bundle.products) return false;
  if (bundle.products.length === 0) return false;
  if (bundle.bundlePrice < 0) return false;
  if (!validateBundleProducts(bundle)) return false;
  
  return true;
};

// ============================================
// دالة للعثور على أفضل عرض (الأكثر توفيراً)
// ============================================
export const getBestBundle = () => {
  return BUNDLE_OFFERS.reduce((best, current) => {
    return current.savings > (best.savings || 0) ? current : best;
  }, BUNDLE_OFFERS[0] || null);
};

export default BUNDLE_OFFERS;