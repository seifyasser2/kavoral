import { BOTTLE_SIZES } from './config';

// ============================================
// دالة لحساب السعر بعد الخصم تلقائياً
// ============================================
const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  return Math.round(originalPrice * (1 - discountPercentage / 100));
};

// ============================================
// دالة لحساب المبلغ الموفر
// ============================================
const calculateSavings = (originalPrice, discountPercentage) => {
  return Math.round(originalPrice * (discountPercentage / 100));
};

// ============================================
// الخصم العام - غيره هنا يتطبق على كل المنتجات
// ============================================
export const GLOBAL_DISCOUNT = 0; // غير الرقم ده للخصم (مثال: 10 = خصم 10%)

// ============================================
// بيانات المنتجات
// ============================================
const productsRawData = [
  {
    id: 1,
    name: 'زيت جوز الهند الطبيعي',
    slug: 'coconut-oil',
    originalPrice: 150,
    discountPercentage: 20, // خصم خاص بالمنتج (أو اتركه 0)
    size: BOTTLE_SIZES.medium,
    image: '🥥',
    categories: ['hair', 'skin'], // ✅ يمكن للمنتج يظهر في فئتين
    tags: ['طبيعي', 'للشعر', 'للبشرة', 'مرطب'],
    inStock: true,
    featured: true,
    description: 'زيت جوز الهند الطبيعي المستخرج بالعصر البارد، غني بالأحماض الدهنية المفيدة للشعر والبشرة.',
    benefits: [
      'يقلل فقدان البروتين من الشعر بنسبة 40%',
      'مضاد للبكتيريا والفطريات',
      'يخترق جذع الشعرة ويغذيها من الداخل',
      'مرطب طبيعي للبشرة الجافة'
    ],
    ingredients: ['زيت جوز الهند الطبيعي 100% - معصور على البارد'],
    howToUse: 'للشعر: دلكي من الجذور حتى الأطراف واتركيه 30 دقيقة قبل الغسل. للبشرة: ضعي كمية صغيرة ودلكي برفق.',
    warnings: ['للاستخدام الخارجي فقط', 'تجنبي ملامسة العينين'],
    rating: 4.8,
    reviews: 156,
    soldCount: 500
  },
  {
    id: 2,
    name: 'زيت اللوز الحلو الطبيعي',
    slug: 'sweet-almond-oil',
    originalPrice: 180,
    discountPercentage: 15,
    size: BOTTLE_SIZES.medium,
    image: '🌰',
    categories: ['skin', 'anti-aging'],
    tags: ['فيتامين E', 'للبشرة الحساسة', 'مضاد للأكسدة'],
    inStock: true,
    featured: true,
    description: 'زيت اللوز الحلو الطبيعي المعصور على البارد، غني بفيتامين E، مثالي للبشرة الحساسة.',
    benefits: [
      'غني بفيتامين E المضاد للأكسدة',
      'مناسب للبشرة الحساسة والأطفال',
      'يحسن مرونة الجلد ونعومته',
      'يحارب علامات الشيخوخة المبكرة'
    ],
    ingredients: ['زيت اللوز الحلو الطبيعي 100% - معصور على البارد'],
    howToUse: 'للوجه: ضعي قطرات قليلة ودلكي بحركات دائرية. للجسم: استخدمي بعد الاستحمام.',
    warnings: ['للاستخدام الخارجي فقط', 'اختبري على منطقة صغيرة أولاً'],
    rating: 4.9,
    reviews: 203,
    soldCount: 350
  },
  {
    id: 3,
    name: 'زيت الجوجوبا النقي',
    slug: 'jojoba-oil',
    originalPrice: 210,
    discountPercentage: 10,
    size: BOTTLE_SIZES.medium,
    image: '🌿',
    categories: ['skin', 'hair'],
    tags: ['لا يسد المسام', 'للبشرة الدهنية', 'سريع الامتصاص'],
    inStock: true,
    featured: false,
    description: 'زيت الجوجوبا النقي المعصور على البارد. تركيبته شبيهة بالزيوت الطبيعية للبشرة.',
    benefits: [
      'الأقرب تركيباً للزيوت الطبيعية للبشرة',
      'ينظم إنتاج الزيوت في البشرة الدهنية',
      'لا يسد المسام ولا يسبب الحبوب',
      'سريع الامتصاص وغير دهني'
    ],
    ingredients: ['زيت الجوجوبا النقي 100% - معصور على البارد'],
    howToUse: 'للبشرة: استخدمي قطرات قليلة كمرطب ليلي. للشعر: ضعي على الأطراف.',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.7,
    reviews: 89,
    soldCount: 200
  },
  {
    id: 4,
    name: 'زيت الأرغان المغربي',
    slug: 'argan-oil',
    originalPrice: 250,
    discountPercentage: 12,
    size: BOTTLE_SIZES.medium,
    image: '🫒',
    categories: ['anti-aging', 'hair', 'skin'],
    tags: ['مغربي أصلي', 'الذهب السائل', 'مكافح للشيخوخة'],
    inStock: true,
    featured: true,
    description: 'زيت الأرغان المغربي المعصور على البارد من ثمار شجرة الأرغان النادرة.',
    benefits: [
      'أعلى تركيز لفيتامين E بين الزيوت الطبيعية',
      'يحارب علامات الشيخوخة والتجاعيد',
      'يعزز إنتاج الكولاجين في البشرة',
      'يحمي من الأشعة فوق البنفسجية'
    ],
    ingredients: ['زيت الأرغان المغربي 100% - معصور على البارد'],
    howToUse: 'للوجه: ضعي 2-3 قطرات مساءً. للشعر: استخدمي كماسك أسبوعي.',
    warnings: ['للاستخدام الخارجي فقط', 'احفظيه في مكان بارد'],
    rating: 4.9,
    reviews: 127,
    soldCount: 450
  },
  {
    id: 5,
    name: 'زيت الخروع الطبيعي',
    slug: 'castor-oil',
    originalPrice: 150,
    discountPercentage: 13,
    size: BOTTLE_SIZES.medium,
    image: '🌱',
    categories: ['hair-growth', 'hair'],
    tags: ['تقوية الشعر', 'الرموش والحواجب', 'محفز للنمو'],
    inStock: true,
    featured: true,
    description: 'زيت الخروع الطبيعي المعصور على البارد من بذور نبات الخروع.',
    benefits: [
      'يحفز نمو الشعر وكثافته',
      'يقوي الرموش والحواجب',
      'يحسن الدورة الدموية في فروة الرأس',
      'مضاد للفطريات والبكتيريا'
    ],
    ingredients: ['زيت الخروع الطبيعي 100% - معصور على البارد'],
    howToUse: 'للشعر: دلكي فروة الرأس ليلاً واغسلي في الصباح. للرموش: استخدمي فرشاة صغيرة.',
    warnings: ['للاستخدام الخارجي فقط', 'تجنبي دخوله للعينين'],
    rating: 4.6,
    reviews: 178,
    soldCount: 320
  },
  {
    id: 6,
    name: 'زيت الزيتون البكر',
    slug: 'olive-oil',
    originalPrice: 200,
    discountPercentage: 15,
    size: '500 مل',
    image: '🫒',
    categories: ['skin', 'hair'],
    tags: ['بكر ممتاز', 'متعدد الاستخدامات', 'مضاد للأكسدة'],
    inStock: true,
    featured: true,
    description: 'زيت الزيتون البكر المعصور على البارد، غني بالفيتامينات ومضادات الأكسدة.',
    benefits: [
      'غني بفيتامين E ومضادات الأكسدة',
      'مرطب طبيعي فائق للبشرة',
      'يقوي الشعر ويمنع تقصفه',
      'طبيعي 100%'
    ],
    ingredients: ['زيت الزيتون البكر 100% - معصور على البارد'],
    howToUse: 'للبشرة: ضعي طبقة رقيقة ودلكي. للشعر: استخدمي كحمام زيت أسبوعي.',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.8,
    reviews: 234,
    soldCount: 520
  }
];

// ============================================
// حساب الأسعار تلقائياً
// ============================================
export const PRODUCTS_DATA = productsRawData.map(product => {
  // الخصم النهائي = الخصم الخاص بالمنتج + الخصم العام
  const totalDiscount = product.discountPercentage + GLOBAL_DISCOUNT;
  const finalPrice = calculateDiscountedPrice(product.originalPrice, totalDiscount);
  const savings = calculateSavings(product.originalPrice, totalDiscount);
  
  return {
    ...product,
    price: finalPrice, // ✅ السعر يتحسب تلقائياً
    savings: savings, // ✅ التوفير يتحسب تلقائياً
    totalDiscountPercentage: totalDiscount, // ✅ نسبة الخصم الكلية
    // الفئة الرئيسية (أول فئة في المصفوفة)
    category: product.categories[0]
  };
});

// ============================================
// دالة للبحث عن منتج حسب ID
// ============================================
export const getProductById = (id) => {
  return PRODUCTS_DATA.find(p => p.id === id);
};

// ============================================
// دالة لفلترة المنتجات حسب الفئة
// ============================================
export const getProductsByCategory = (categoryId) => {
  if (categoryId === 'all') return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.categories.includes(categoryId));
};