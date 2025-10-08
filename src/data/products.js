import { BOTTLE_SIZES } from './config';

// ============================================
// دالة لحساب السعر بعد الخصم تلقائياً
// ============================================
const calculateDiscountedPrice = (originalPrice, discountPercentage) => {
  if (!originalPrice || discountPercentage < 0) return originalPrice;
  return Math.round(originalPrice * (1 - discountPercentage / 100));
};

// ============================================
// دالة لحساب المبلغ الموفر
// ============================================
const calculateSavings = (originalPrice, discountPercentage) => {
  if (!originalPrice || discountPercentage <= 0) return 0;
  return Math.round(originalPrice * (discountPercentage / 100));
};

// ============================================
// الخصم العام - غيره هنا يتطبق على كل المنتجات
// ============================================
export const GLOBAL_DISCOUNT = 50; // غير الرقم ده للخصم (مثال: 10 = خصم 10%)

// ============================================
// بيانات المنتجات الخام
// ============================================
const productsRawData = [
  {
    id: 1,
    name: 'زيت جوز الهند الطبيعي',
    slug: 'coconut-oil',
    originalPrice: 150,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=400&h=400&fit=crop',
    imageAlt: '🥥', // Emoji backup
    categories: ['hair', 'skin'],
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
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop',
    imageAlt: '🌰',
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
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&sat=-50',
    imageAlt: '🌿',
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
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&hue=30',
    imageAlt: '🫒',
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
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=400&h=400&fit=crop&hue=80',
    imageAlt: '🌱',
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
    discountPercentage: 0,
    size: '500 مل',
    image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&h=400&fit=crop',
    imageAlt: '🫒',
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
  const totalDiscount = product.discountPercentage + GLOBAL_DISCOUNT;
  const finalPrice = calculateDiscountedPrice(product.originalPrice, totalDiscount);
  const savings = calculateSavings(product.originalPrice, totalDiscount);
  
  return {
    ...product,
    price: finalPrice,
    savings: savings,
    totalDiscountPercentage: totalDiscount,
    category: product.categories[0] // الفئة الرئيسية
  };
});

// ============================================
// دالة للبحث عن منتج حسب ID
// ============================================
export const getProductById = (id) => {
  return PRODUCTS_DATA.find(p => p.id === id) || null;
};

// ============================================
// دالة لفلترة المنتجات حسب الفئة
// ============================================
export const getProductsByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.categories.includes(categoryId));
};

// ============================================
// دالة للحصول على المنتجات المميزة
// ============================================
export const getFeaturedProducts = () => {
  return PRODUCTS_DATA.filter(p => p.featured);
};

// ============================================
// دالة للبحث في المنتجات
// ============================================
export const searchProducts = (searchTerm) => {
  if (!searchTerm) return PRODUCTS_DATA;
  
  const term = searchTerm.toLowerCase().trim();
  return PRODUCTS_DATA.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

// ============================================
// دالة للفلترة حسب السعر
// ============================================
export const filterByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
};

export default PRODUCTS_DATA;