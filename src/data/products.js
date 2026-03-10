import { BOTTLE_SIZES } from './config';

// ============================================
// دالة تنظيف البيانات - حماية من XSS
// ============================================
const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  
  return text
    .replace(/[<>"'`]/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
    .substring(0, 1000);
};

// ============================================
// الخصم العام
// ============================================
export const GLOBAL_DISCOUNT = 40;

// ============================================
// بيانات المنتجات الخام - مع الهيكل الجديد
// ============================================
const productsRawData = [
  {
    id: 1,
    name: 'زيت اللوز الحلو',
    slug: 'sweet-almond-oil',
    originalPrice: 260,
    discountPercentage: 38,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144344_k2rswm.jpg',
    imageAlt: '🌰',
    categories: ['skin', 'hair', 'anti-aging'],
    tags: ['فيتامين E', 'للبشرة الحساسة', 'مرطب عميق', 'متعدد الاستخدام'],
    inStock: true,
    featured: false,
    description: 'زيت اللوز الحلو الطبيعي 100% معصور على البارد',
    benefitsSkin: [
      'ترطيب عميق',
      'تغذية وتجديد',
      'تهدئة الالتهابات',
      'تفتيح وتوحيد اللون',
      'مزيل مكياج'
    ],
    usageSkin: 'كسيروم ليلي (2-3 نقاط بالطبطبة) | كمزيل مكياج (قطنة + حركات دائرية)',
    benefitsHair: [
      'تغذية فروة الرأس',
      'نمو وإطالة (بيوتين)',
      'تحسين الملمس',
      'تقليل القشرة'
    ],
    usageHair: 'حمام زيت (ملعقة، 3-5 دقائق مساج، 2-3 ساعات) | تصفيف يومي (نقطة أو نقطتان)',
    warnings: ['للاستخدام الخارجي فقط', 'يحفظ بعيداً عن الإضاءة'],
    rating: 4.9,
    reviews: 298,
    soldCount: 670
  },

  {
    id: 2,
    name: 'زيت السمسم',
    slug: 'sesame-oil',
    originalPrice: 230,
    discountPercentage: 39,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144458_eqbrgi.jpg',
    imageAlt: '🌾',
    categories: ['skin', 'hair'],
    tags: ['تدليك', 'تغذية عميقة', 'مضاد للأكسدة', 'علاج الجفاف'],
    inStock: true,
    featured: false,
    description: 'زيت السمسم الطبيعي المعصور على البارد',
    benefitsSkin: [
      'واقي طبيعي من الشمس (SPF طبيعي)',
      'مضاد للالتهابات وحب الشباب',
      'مرطب قوي للجفاف الشديد'
    ],
    usageSkin: 'قطرتان قبل النوم، دلك دائري، كواقي شمس قبل الكريم',
    benefitsHair: [
      'تحفيز النمو والإطالة',
      'الوقاية من الشيب المبكر',
      'علاج القشرة'
    ],
    usageHair: 'تدفئة الزيت، توزيع على الفروة، مساج 10 دقائق، فوطة دافئة ساعة، مرتين أسبوعياً',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.6,
    reviews: 203,
    soldCount: 490
  },

  {
    id: 3,
    name: 'زيت شجرة الشاي',
    slug: 'tea-tree-oil',
    originalPrice: 270,
    discountPercentage: 41,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144514_xvbrey.jpg',
    imageAlt: '🌳',
    categories: ['skin', 'hair'],
    tags: ['مضاد للبكتيريا', 'علاج حب الشباب', 'مطهر طبيعي'],
    inStock: true,
    featured: true,
    description: 'زيت شجرة الشاي النقي المعصور على البارد',
    benefitsSkin: [
      'مضاد للبكتيريا وحب الشباب',
      'تنقية المسام وتقليل اللمعان'
    ],
    usageSkin: 'على الوجه كله (15مل جوجوبا + 3-4 قطرات) | موضعي على الحبوب فقط (5مل جوجوبا + 2-3 قطرات)',
    benefitsHair: [
      'مكافحة القشرة والحكة',
      'تنظيف دهون الفروة'
    ],
    usageHair: 'مع الشامبو (3-4 قطرات) | حمام زيت (15مل ناقل + 5-8 قطرات، نص ساعة لساعة، مرتين أسبوعياً)',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه بزيت ناقل'],
    rating: 4.8,
    reviews: 301,
    soldCount: 690
  },

  {
    id: 4,
    name: 'زيت اللافندر',
    slug: 'lavender-oil',
    originalPrice: 220,
    discountPercentage: 41,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144304_jmmbt4.jpg',
    imageAlt: '💜',
    categories: ['relaxation', 'skin', 'hair'],
    tags: ['استرخاء', 'مهدئ', 'علاج الأرق', 'تحسين المزاج'],
    inStock: true,
    featured: false,
    description: 'زيت اللافندر النقي المعصور على البارد',
    benefitsSkin: [
      'تهدئة وتقليل الالتهاب',
      'علاج حب الشباب',
      'ترطيب',
      'تخفيف الندوب'
    ],
    usageSkin: 'سيروم ليلي (15مل بذور العنب + 3 قطرات) | موضعي على الحبوب (قطرة واحدة مباشرة)',
    benefitsHair: [
      'تحفيز النمو',
      'تقليل التساقط',
      'مضاد للبكتيريا والفطريات',
      'ترطيب ولمعان'
    ],
    usageHair: 'مع الشامبو (3-4 قطرات) | حمام زيت (15مل ناقل + 5 قطرات، 10 دقائق، نصف ساعة لساعة) | تعطير (نقطتان على الأطراف)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.8,
    reviews: 278,
    soldCount: 640
  },

  {
    id: 5,
    name: 'زيت بذور اليقطين',
    slug: 'pumpkin-seed-oil',
    originalPrice: 280,
    discountPercentage: 39,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144248_hw9lrv.jpg',
    imageAlt: '🎃',
    categories: ['hair', 'hair-growth'],
    tags: ['منع الصلع', 'تقوية الشعر', 'غني بالزنك'],
    inStock: true,
    featured: true,
    description: 'زيت بذور اليقطين الطبيعي المعصور على البارد',
    benefitsSkin: [
      'ترطيب عميق للبشرة الجافة'
    ],
    usageSkin: 'سيروم ليلي (2-3 نقاط بالطبطبة على الخطوط الرفيعة)',
    benefitsHair: [
      'تقوية البصيلات وتقليل التساقط (مقاومة DHT)',
      'حماية من التلف',
      'تحفيز الدورة الدموية',
      'ترطيب الفروة وتقليل القشرة',
      'دعم الكيراتين (زنك + فيتامين A وE)'
    ],
    usageHair: 'حمام زيت (5-10 دقائق، ساعة لساعتين، مرتين أسبوعياً) | معزز للشامبو | سيروم للأطراف (نقطة واحدة)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.7,
    reviews: 189,
    soldCount: 520
  },

  {
    id: 6,
    name: 'زيت جوز الهند',
    slug: 'coconut-oil',
    originalPrice: 200,
    discountPercentage: 40,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144438_m3rxfc.jpg',
    imageAlt: '🥥',
    categories: ['hair', 'skin'],
    tags: ['ترطيب عميق', 'للشعر', 'للبشرة', 'مضاد للفطريات'],
    inStock: true,
    featured: true,
    description: 'زيت جوز الهند البكر المعصور على البارد',
    benefitsSkin: [
      'محاربة علامات الشيخوخة',
      'علاج تشقق الشفاه',
      'ترطيب فائق للجسم',
      'مزيل طبيعي للمكياج'
    ],
    usageSkin: 'مرطب ليلي (كمية صغيرة جداً على بشرة رطبة) | مزيل مكياج (قطنة + تنظيف مزدوج)',
    benefitsHair: [
      'ترطيب عميق وتقليل فقدان البروتين (الوحيد المثبت علمياً)',
      'مكافحة القشرة',
      'فك التشابك وتقليل الهيشان'
    ],
    usageHair: 'حمام زيت (10 دقائق، ساعتين أو طوال الليل، 2-3 مرات أسبوعياً، 4 أشهر)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.8,
    reviews: 378,
    soldCount: 840
  },

  {
    id: 7,
    name: 'زيت الأرغان',
    slug: 'argan-oil',
    originalPrice: 300,
    discountPercentage: 40,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144630_df3akw.jpg',
    imageAlt: '🫒',
    categories: ['anti-aging', 'hair', 'skin'],
    tags: ['الذهب السائل', 'مكافح للشيخوخة', 'سريع الامتصاص'],
    inStock: true,
    featured: true,
    description: 'زيت الأرغان المغربي الأصلي المعصور على البارد',
    benefitsSkin: [
      'ترطيب عميق',
      'تحفيز الكولاجين وتقليل التجاعيد',
      'تهدئة البشرة الحساسة',
      'آمن تحت العين وللشفايف'
    ],
    usageSkin: '2-3 قطرات، حركات دائرية من تحت لفوق',
    benefitsHair: [
      'تقوية وتقليل التساقط',
      'ترطيب الفروة',
      'زيادة الكثافة',
      'تقليل الهيشان ولمعان',
      'حماية من التقصف'
    ],
    usageHair: 'حمام زيت (15مل، 3-5 دقائق، 2-3 ساعات) | تصفيف يومي (قطرة أو قطرتان)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.9,
    reviews: 389,
    soldCount: 810
  },

  {
    id: 8,
    name: 'زيت الخروع',
    slug: 'castor-oil',
    originalPrice: 220,
    discountPercentage: 41,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828518/IMG_20251030_144420_xzmh5o.jpg',
    imageAlt: '🌱',
    categories: ['hair-growth', 'hair'],
    tags: ['تكثيف الشعر', 'الرموش والحواجب', 'محفز للنمو'],
    inStock: true,
    featured: false,
    description: 'زيت الخروع الطبيعي المعصور على البارد',
    benefitsSkin: [
      'ترطيب عميق للجافة',
      'مكافحة التجاعيد',
      'علاج حب الشباب موضعياً',
      'توحيد اللون',
      'تهدئة حروق الشمس'
    ],
    usageSkin: 'نقطة واحدة بحركات دائرية | موضعي على الحبوب فقط',
    benefitsHair: [
      'تحفيز النمو وإنبات الفراغات',
      'تكثيف وتقوية',
      'مقاومة القشرة',
      'علاج التقصف',
      'تحسين اللمعان'
    ],
    usageHair: 'حمام زيت (يُخفف بزيت ناقل 1:1، 3-5 دقائق، 2-3 ساعات أو طوال الليل) | تصفيف يومي | للحواجب والرموش (فرشاة ماسكرا قبل النوم)',
    warnings: ['للاستخدام الخارجي فقط', 'زيت تقيل - يفضل تخفيفه'],
    rating: 4.7,
    reviews: 345,
    soldCount: 720
  },

  {
    id: 9,
    name: 'زيت الروزماري',
    slug: 'rosemary-oil',
    originalPrice: 280,
    discountPercentage: 39,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144535_dhucwx.jpg',
    imageAlt: '🌿',
    categories: ['hair', 'hair-growth'],
    tags: ['تطويل الشعر', 'منع التساقط', 'تنشيط الدورة الدموية'],
    inStock: true,
    featured: true,
    description: 'زيت الروزماري الطبيعي المعصور على البارد',
    benefitsSkin: [
      'مضاد للأكسدة والالتهابات',
      'علاج حب الشباب',
      'تنظيف المسام وتقليل اللمعان',
      'تقليل الشيخوخة',
      'تحسين السيلوليت'
    ],
    usageSkin: 'لعلاج الحبوب (قطرة + ملعقة جل صبار، موضعي) | لشد البشرة (قطرة في المرطب الليلي)',
    benefitsHair: [
      'تحفيز النمو وتقليل التساقط (تأثير مشابه للمينوكسديل)',
      'تقليل القشرة',
      'تقوية الشعر',
      'تقليل الشيب المبكر'
    ],
    usageHair: 'حمام زيت (5-8 قطرات + 15مل ناقل، 10 دقائق، ساعة لساعتين) | تعزيز الشامبو (2-3 قطرات)',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه بزيت ناقل'],
    rating: 4.9,
    reviews: 412,
    soldCount: 890
  },

  {
    id: 10,
    name: 'زيت الورد',
    slug: 'rose-oil',
    originalPrice: 280,
    discountPercentage: 39,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144322_xyrcka.jpg',
    imageAlt: '🌹',
    categories: ['skin', 'anti-aging'],
    tags: ['مضاد للشيخوخة', 'كولاجين طبيعي', 'موحد لون'],
    inStock: true,
    featured: true,
    description: 'زيت الورد النقي المعصور على البارد',
    benefitsSkin: [
      'تفتيح وتوحيد اللون (فيتامين C + جيرانيول)',
      'تضييق المسام وشد الجلد',
      'ترطيب الحساسة والجافة',
      'محاربة التجاعيد'
    ],
    usageSkin: 'سيروم مسائي (2-3 قطرات على بشرة رطبة) | خلطة تفتيح (زيت ورد + زيت لوز حلو ) | تونر (قطرتان في بخاخ ماء ورد)',
    benefitsHair: [
      'تعطير الشعر',
      'ترطيب الأطراف وتقليل التقصف',
      'تهدئة الحكة والالتهابات'
    ],
    usageHair: 'سيروم (قطرة واحدة فقط على الأطراف بعد التصفيف)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.9,
    reviews: 312,
    soldCount: 850
  },

  {
    id: 11,
    name: 'زيت الجوجوبا',
    slug: 'jojoba-oil',
    originalPrice: 260,
    discountPercentage: 38,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144613_wdw40i.jpg',
    imageAlt: '🌿',
    categories: ['skin', 'hair'],
    tags: ['لا يسد المسام', 'للبشرة الدهنية', 'سريع الامتصاص'],
    inStock: true,
    featured: false,
    description: 'زيت الجوجوبا النقي المعصور على البارد',
    benefitsSkin: [
      'ترطيب وتغذية عميقة بدون انسداد مسام'
    ],
    usageSkin: 'سيروم ليلي (2-3 نقاط بالطبطبة)',
    benefitsHair: [
      'ترطيب وتقليل الهيشان',
      'تنظيم دهون الفروة',
      'تقليل القشرة والحكة',
      'تقوية وتقليل التقصف'
    ],
    usageHair: 'حمام زيت (3-5 دقائق، 2-3 ساعات) | تصفيف يومي (نقطة أو نقطتان)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.7,
    reviews: 234,
    soldCount: 560
  },

  {
    id: 12,
    name: 'زيت السعد',
    slug: 'saad-oil',
    originalPrice: 250,
    discountPercentage: 40,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828518/IMG_20251030_144402_dzagqt.jpg',
    imageAlt: '🌾',
    categories: ['skin'],
    tags: ['إزالة الشعر', 'تأخير النمو', 'طبيعي 100%', 'تفتيح'],
    inStock: true,
    featured: true,
    description: 'زيت السعد الطبيعي المعصور على البارد',
    benefitsSkin: [
      'تقليل نمو الشعر (فلافونويدات تؤثر على هرمون الأندروجين)',
      'مضاد للالتهابات',
      'تفتيح البشرة',
      'مضاد للبكتيريا'
    ],
    usageSkin: '5مل سعد + 30مل لوز حلو أو جوجوبا، مساج 5 دقائق، أول 3 أيام مرتين يومياً ثم مرة قبل النوم، أسبوع بعد كل إزالة شعر، 6 شهور للنتائج',
    benefitsHair: [],
    usageHair: 'لا ينطبق',
    warnings: ['للاستخدام الخارجي فقط', 'منتج متخصص لتقليل نمو الشعر'],
    rating: 4.8,
    reviews: 245,
    soldCount: 680
  },

  {
    id: 13,
    name: 'زيت الجرجير',
    slug: 'watercress-oil',
    originalPrice: 250,
    discountPercentage: 40,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144554_gicdez.jpg',
    imageAlt: '🥬',
    categories: ['hair', 'hair-growth'],
    tags: ['تطويل الشعر', 'منع التساقط', 'تغذية عميقة'],
    inStock: true,
    featured: false,
    description: 'زيت الجرجير الطبيعي المعصور على البارد',
    benefitsSkin: [
      'شد البشرة ومحاربة التجاعيد (فيتامين A كريتينول نباتي)',
      'علاج آثار الحبوب والالتهابات (كبريت عضوي + فيتامين C + فيتامينات B)'
    ],
    usageSkin: 'نقطتان على بشرة نظيفة رطبة قبل النوم، دلك برفق، مرتين إلى ثلاث مرات أسبوعياً، 4 أشهر',
    benefitsHair: [
      'تحفيز نمو الشعر وملء الفراغات (علاج الثعلبة)',
      'تقوية جذور الشعر ومنع التساقط',
      'ترطيب الشعر وتقليل الهيشان'
    ],
    usageHair: '10-15مل على فروة الرأس، تدليك بوضعية الانحناء (Inversion Method) 10 دقائق، 2-3 ساعات، شامبو، مرتين أسبوعياً، 3-6 شهور',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.6,
    reviews: 267,
    soldCount: 580
  }
];

// ============================================
// حساب الأسعار تلقائياً
// ============================================
export const PRODUCTS_DATA = productsRawData
  .map(product => {
    if (!product.id || !product.name || !product.originalPrice) {
      console.error('Invalid product data:', product);
      return null;
    }
    
    const effectiveDiscount = product.discountPercentage > 0
      ? product.discountPercentage
      : (GLOBAL_DISCOUNT || 0);
    
    const totalDiscount = Math.min(Math.max(effectiveDiscount, 0), 100);
    
    const finalPrice = Math.max(
      Math.round(product.originalPrice * (1 - totalDiscount / 100)),
      0
    );
    
    const savings = Math.max(
      Math.round(product.originalPrice * (totalDiscount / 100)),
      0
    );
    
    return {
      ...product,
      name: sanitizeText(product.name),
      description: sanitizeText(product.description || ''),
      price: finalPrice,
      savings: savings,
      totalDiscountPercentage: totalDiscount,
      category: product.categories?.[0] || 'other',
      hasDiscount: totalDiscount > 0,
      image: product.image || '',
      imageAlt: product.imageAlt || '🌿',
      inStock: product.inStock ?? true,
      rating: product.rating || 0,
      reviews: product.reviews || 0
    };
  })
  .filter(Boolean);

// ============================================
// الدوال المساعدة
// ============================================
export const getProductById = (id) => {
  return PRODUCTS_DATA.find(p => p.id === id) || null;
};

export const getProductsByCategory = (categoryId) => {
  if (!categoryId || categoryId === 'all') return PRODUCTS_DATA;
  return PRODUCTS_DATA.filter(p => p.categories.includes(categoryId));
};

export const getFeaturedProducts = () => {
  return PRODUCTS_DATA.filter(p => p.featured);
};

export const searchProducts = (searchTerm) => {
  if (!searchTerm) return PRODUCTS_DATA;
  
  const term = searchTerm.toLowerCase().trim();
  return PRODUCTS_DATA.filter(product => 
    product.name.toLowerCase().includes(term) ||
    product.description.toLowerCase().includes(term) ||
    product.tags.some(tag => tag.toLowerCase().includes(term))
  );
};

export const filterByPriceRange = (products, minPrice, maxPrice) => {
  return products.filter(p => p.price >= minPrice && p.price <= maxPrice);
};

export const validateProduct = (product) => {
  if (!product) return false;
  if (!product.id || !product.name || product.price === undefined) return false;
  if (product.price < 0 || product.originalPrice < 0) return false;
  return true;
};

export default PRODUCTS_DATA;