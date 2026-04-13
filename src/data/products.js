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
export const GLOBAL_DISCOUNT = 0;

// ============================================
// بيانات المنتجات الخام - مع الأسعار والخصومات المحدثة
// ============================================
const productsRawData = [
  {
    id: 1,
    name: 'زيت اللوز الحلو',
    slug: 'sweet-almond-oil',
    originalPrice: 260,
    discountPercentage: 33,
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
    usageSkin: 'كسيروم ليلي (3-4 قطرات بالقطارة) | كمزيل مكياج (قطنة + حركات دائرية)',
    benefitsHair: [
      'تغذية فروة الرأس',
      'نمو وإطالة (بيوتين)',
      'تحسين الملمس',
      'تقليل القشرة'
    ],
    usageHair: 'حمام زيت (5-8 قطرات، 5 دقائق مساج، ساعة لساعتين) | تصفيف يومي (قطرة أو قطرتان)',
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
    discountPercentage: 30,
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
    usageSkin: 'قطرتان قبل النوم، دلك دائري | واقي شمس طبيعي (قطرتان قبل الكريم)',
    benefitsHair: [
      'تحفيز النمو والإطالة',
      'الوقاية من الشيب المبكر',
      'علاج القشرة'
    ],
    usageHair: 'حمام زيت (8-12 قطرة، 10 دقائق مساج، ساعة، مرتين أسبوعياً)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.6,
    reviews: 203,
    soldCount: 490
  },

  {
    id: 3,
    name: 'خلطة التنعيم ',
    slug: 'smoothing-oil',
    originalPrice: 220,
    discountPercentage: 16,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761830251/IMG_20251030_161451_vntsdd.png',
    imageAlt: '✨',
    categories: ['hair'],
    tags: ['تنعيم الشعر', 'فرد طبيعي', 'لمعان', 'ضد التجعد'],
    inStock: true,
    featured: true,
    description: 'مزيج سحري من 5 زيوت طبيعية معصورة على البارد: الروزماري، الجوجوبا، الزيتون، الخروع، والسمسم',
    benefitsSkin: [],
    usageSkin: 'غير مخصص للبشرة',
    benefitsHair: [
      'بتنعّم الشعر وتقلل التشابك والهيشان',
      'بتساعد على تطويل الشعر بشكل ملحوظ',
      'بتغذّي الشعر من الجذور للأطراف',
      'بترطّم بعمق وتقلل التقصف',
      'بتكثّف الشعر وتملأ الفراغات',
      'بتعالج التساقط والضعف'
    ],
    usageHair: 'حمام زيت (10-15 قطرة، 5 دقائق مساج، ساعة لساعتين) | تصفيف يومي (3-4 قطرات على الأطراف)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.9,
    reviews: 350,
    soldCount: 850
  },

  {
    id: 4,
    name: 'خلطة السبع زيوت ',
    slug: 'seven-oils',
    originalPrice: 230,
    discountPercentage: 17,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828523/IMG_20251030_152134_f3zl98.jpg',
    imageAlt: '🌟',
    categories: ['hair', 'hair-growth'],
    tags: ['مزيج سبع زيوت', 'تقوية', 'تطويل', 'كثافة', 'وقف التساقط'],
    inStock: true,
    featured: true,
    description: 'تركيبة مميزة من 7 زيوت طبيعية معصورة على البارد: لوز حلو، سمسم، جوز هند، زيتون، حبة البركة، جرجير، روزماري',
    benefitsSkin: [],
    usageSkin: 'غير مخصص للبشرة',
    benefitsHair: [
      'يوقف تساقط الشعر ويقوي البصيلات عبر تنشيط الدورة الدموية في فروة الرأس',
      'يحفز نمو الشعر ويزيد من كثافته وسمكه بفضل تضافر الزيوت المغذية',
      'يغذي فروة الرأس ويعالج القشرة والالتهابات',
      'يرطب الشعر بعمق ويمنع التقصف والتكسر',
      'يملأ الفراغات ويزيد الطول بشكل ملحوظ'
    ],
    usageHair: 'حمام زيت (15-20 قطرة، 10 دقائق مساج، ساعة لساعتين) ثم اغسليه بشامبو مناسب (2-3 مرات أسبوعياً)',
    warnings: ['للاستخدام الخارجي فقط', 'قد يسبب بقع على الملابس'],
    rating: 4.9,
    reviews: 456,
    soldCount: 920
  },

  {
    id: 5,
    name: 'زيت بذور اليقطين',
    slug: 'pumpkin-seed-oil',
    originalPrice: 280,
    discountPercentage: 34,
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
    usageHair: 'حمام زيت (5-10 دقائق، ساعة لساعتين، مرتين أسبوعياً) | معزز للشامبو | سيروم للأطراف',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.7,
    reviews: 189,
    soldCount: 520
  },

  {
    id: 6,
    name: 'زيت جوز الهند ',
    slug: 'coconut-oil',
    originalPrice: 200,
    discountPercentage: 33,
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
    usageSkin: 'مرطب ليلي (قطرتان على بشرة رطبة) | مزيل مكياج (قطنة + حركات دائرية)',
    benefitsHair: [
      'ترطيب عميق وتقليل فقدان البروتين (الوحيد المثبت علمياً)',
      'مكافحة القشرة',
      'فك التشابك وتقليل الهيشان'
    ],
    usageHair: 'حمام زيت (10-15 قطرة، 5 دقائق مساج، ساعتين أو طوال الليل، 2-3 مرات أسبوعياً)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.8,
    reviews: 378,
    soldCount: 840
  },

  {
    id: 7,
    name: 'زيت الأرغان ',
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
      'تحفيز الكولاجين وتقليل التجاعيش',
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
    usageHair: 'حمام زيت (8-12 قطرة، 3-5 دقائق مساج، ساعتين) | تصفيف يومي (قطرة واحدة)',
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
    discountPercentage: 34,
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
      'مكافحة التجاعيش',
      'علاج حب الشباب موضعياً',
      'توحيد اللون',
      'تهدئة حروق الشمس'
    ],
    usageSkin: 'قطرة واحدة بحركات دائرية | موضعي على الحبوب فقط',
    benefitsHair: [
      'تحفيز النمو وإنبات الفراغات',
      'تكثيف وتقوية',
      'مقاومة القشرة',
      'علاج التقصف',
      'تحسين اللمعان'
    ],
    usageHair: 'حمام زيت (5-8 قطرات، 3-5 دقائق، ساعتين أو طوال الليل) | تصفيف يومي (قطرة) | للحواجب والرموش (فرشاة ماسكرا قبل النوم)',
    warnings: ['للاستخدام الخارجي فقط', 'زيت تقيل - يفضل تخفيفه'],
    rating: 4.7,
    reviews: 345,
    soldCount: 720
  },

  {
    id: 9,
    name: 'زيت الروزماري (إكليل الجبل)',
    slug: 'rosemary-oil',
    originalPrice: 280,
    discountPercentage: 34,
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
    usageHair: 'حمام زيت (5-8 قطرات + قطرة أو قطرتين من الزيت الناقل، 10 دقائق مساج، ساعة لساعتين) | تعزيز الشامبو (2-3 قطرات)',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه بزيت ناقل'],
    rating: 4.9,
    reviews: 412,
    soldCount: 890
  },

  {
    id: 10,
    name: 'زيت الورد ',
    slug: 'rose-oil',
    originalPrice: 280,
    discountPercentage: 32,
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
      'محاربة التجاعيش'
    ],
    usageSkin: 'سيروم مسائي (2-3 قطرات على بشرة رطبة) | خلطة تفتيح (قطرتان ورد + قطرة لوز حلو يومياً) | تونر (قطرة في بخاخ ماء ورد)',
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
    discountPercentage: 33,
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
    usageSkin: 'سيروم ليلي (2-3 قطرات بالقطارة)',
    benefitsHair: [
      'ترطيب وتقليل الهيشان',
      'تنظيم دهون الفروة',
      'تقليل القشرة والحكة',
      'تقوية وتقليل التقصف'
    ],
    usageHair: 'حمام زيت (5-8 قطرات، 3-5 دقائق مساج، 2-3 ساعات) | تصفيف يومي (قطرة واحدة)',
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
    discountPercentage: 32,
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
    usageSkin: '10-15 قطرة سعد + 30 قطرة لوز حلو أو جوجوبا, مساج 5 دقائق، أول 3 أيام مرتين يومياً ثم مرة قبل النوم، أسبوع بعد كل إزالة شعر',
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
    discountPercentage: 34,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144554_gicdez.jpg',
    imageAlt: '🥬',
    categories: ['hair', 'hair-growth'],
    tags: ['تطويل الشعر', 'منع التساقط', 'تغذية عميقة'],
    inStock: true,
    featured: false,
    description: 'زيت الجرجير الطبيعي المعصور على البارد',
    benefitsSkin: [
      'شد البشرة ومحاربة التجاعيد(فيتامين A كريتينول نباتي)',
      'علاج آثار الحبوب والالتهابات (كبريت عضوي + فيتامين C + فيتامينات B)'
    ],
    usageSkin: 'قطرتان على بشرة نظيفة رطبة قبل النوم، دلك برفق، مرتين إلى ثلاث مرات أسبوعياً',
    benefitsHair: [
      'تحفيز نمو الشعر وملء الفراغات (علاج الثعلبة)',
      'تقوية جذور الشعر ومنع التساقط',
      'ترطيب الشعر وتقليل الهيشان'
    ],
    usageHair: 'حمام زيت (10-15 قطرة، تدليك بوضعية الانحناء 10 دقائق، 2-3 ساعات)، مرتين أسبوعياً',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.6,
    reviews: 267,
    soldCount: 580
  },

  {
    id: 14,
    name: 'زيت شجرة الشاي',
    slug: 'tea-tree-oil',
    originalPrice: 280,
    discountPercentage: 37,
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
    usageSkin: 'على الوجه كله (قطرتان مع 1 ملعقة جوجوبا) | موضعي على الحبوب فقط (قطرة واحدة مع 5 قطرات جوجوبا)',
    benefitsHair: [
      'مكافحة القشرة والحكة',
      'تنظيف دهون الفروة'
    ],
    usageHair: 'مع الشامبو (3-4 قطرات) | حمام زيت (3-4 قطرات + قطرة ناقل، نص ساعة لساعة، مرتين أسبوعياً)',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه بزيت ناقل'],
    rating: 4.8,
    reviews: 301,
    soldCount: 690
  },

  {
    id: 15,
    name: 'زيت اللافندر',
    slug: 'lavender-oil',
    originalPrice: 220,
    discountPercentage: 32,
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
    usageSkin: 'سيروم ليلي (قطرتان مع بضع قطرات بذور عنب) | موضعي على الحبوب (قطرة واحدة مباشرة)',
    benefitsHair: [
      'تحفيز النمو',
      'تقليل التساقط',
      'مضاد للبكتيريا والفطريات',
      'ترطيب ولمعان'
    ],
    usageHair: 'مع الشامبو (3-4 قطرات) | حمام زيت (5-8 قطرات مع قطرة ناقل، 10 دقائق، نصف ساعة لساعة) | تعطير (قطرة واحدة على الأطراف)',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.8,
    reviews: 278,
    soldCount: 640
  },

  {
    id: 16,
    name: 'المختوم الفلسطيني الأصلي',
    slug: 'palestinian-makhtoum',
    originalPrice: 450,
    discountPercentage: 15.55, // ليصبح السعر النهائي 380 تقريباً
    size: '500g', 
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1776099847/WhatsApp_Image_2026-04-13_at_6.59.25_PM_nqu9jt.jpg',
    imageAlt: '🍯',
    categories: ['nutrition', 'weight-gain'],
    tags: ['زيادة الوزن', 'فتح الشهية', 'مغذي طبيعي', 'طاقة'],
    inStock: true,
    featured: true,
    description: 'المختوم الفلسطيني الأصلي: الحل الطبيعي والأمثل لزيادة الوزن بطريقة صحية وفتح الشهية.',
    
    // الخانات الجديدة بناءً على طلبك
    ingredients: [
      'لوز', 'بندق', 'كاجو', 'عين جمل', 
      'تين مجفف', 'زيت زيتون', 'بلح', 
      'سمسم', 'حبة البركة'
    ],
    benefits: [
      'زيادة الوزن بشكل ملحوظ وصحي وبناء الكتلة العضلية',
      'فتح الشهية ومعالجة حالات النحافة المستعصية',
      'إمداد الجسم بسعرات حرارية عالية القيمة الغذائية',
      'مصدر ممتاز للطاقة البدنية والذهنية',
      'تقوية المناعة لاحتوائه على حبة البركة والسمسم والمكسرات'
    ],
    info: 'المختوم الفلسطيني هو خلطة طبيعية 100% تجمع بين أجود أنواع المكسرات والثمار المجففة والزيوت الطبيعية، مصمم خصيصاً لمن يبحث عن زيادة الوزن بطريقة آمنة تماماً بعيداً عن الكيماويات.',
    
    // الاستخدام
    usage: 'يؤكل مباشرة: 3 ملاعق كبيرة يومياً موزعة على مدار اليوم (ملعقة بعد كل وجبة أساسية).',
    warnings: ['يحتوي على مكسرات', 'لا ينصح به لمرضى السكري'],
    rating: 4.98,
    reviews: 210,
    soldCount: 580
  }
];

// ============================================
// حساب الأسعار تلقائياً وتجهيز المصفوفة النهائية
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
// الدوال المساعدة للبحث والتصفية
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

export default PRODUCTS_DATA;