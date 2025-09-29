// ============================================
// دالة لحساب السعر بعد الخصم تلقائياً
// ============================================
const calculateBundlePrice = (originalPrice, discountPercentage) => {
  return Math.round(originalPrice * (1 - discountPercentage / 100));
};

// ============================================
// دالة لحساب المبلغ الموفر
// ============================================
const calculateSavings = (originalPrice, discountPercentage) => {
  return Math.round(originalPrice * (discountPercentage / 100));
};

// ============================================
// الخصم العام للعروض - غيره هنا يتطبق على كل العروض
// ============================================
export const GLOBAL_BUNDLE_DISCOUNT = 0; // غير الرقم ده للخصم على كل العروض

// ============================================
// بيانات العروض الخام
// ============================================
const bundlesRawData = [
  {
    id: 'hair-care-bundle',
    name: 'باقة العناية بالشعر الكاملة',
    description: 'مجموعة متكاملة من 3 زيوت طبيعية للعناية الشاملة بالشعر',
    image: '💇‍♀️',
    products: [1, 5, 6], // IDs المنتجات الموجودة فعلاً
    originalPrice: 500,
    discountPercentage: 15, // خصم خاص بالعرض
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
    image: '✨',
    products: [4, 2, 6], // IDs الصحيحة
    originalPrice: 630,
    discountPercentage: 12,
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
    image: '🌸',
    products: [2, 3, 6], // IDs الصحيحة
    originalPrice: 590,
    discountPercentage: 10,
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
    image: '🌱',
    products: [5, 1, 4], // IDs الصحيحة
    originalPrice: 550,
    discountPercentage: 8,
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
// حساب الأسعار تلقائياً
// ============================================
export const BUNDLE_OFFERS = bundlesRawData.map(bundle => {
  // الخصم النهائي = الخصم الخاص بالعرض + الخصم العام
  const totalDiscount = bundle.discountPercentage + GLOBAL_BUNDLE_DISCOUNT;
  const finalPrice = calculateBundlePrice(bundle.originalPrice, totalDiscount);
  const savings = calculateSavings(bundle.originalPrice, totalDiscount);
  
  return {
    ...bundle,
    bundlePrice: finalPrice, // ✅ السعر يتحسب تلقائياً
    savings: savings, // ✅ التوفير يتحسب تلقائياً
    totalDiscountPercentage: totalDiscount // ✅ نسبة الخصم الكلية
  };
});