import { BOTTLE_SIZES } from './config';

// ============================================
// دالة تنظيف البيانات - حماية من XSS
// ============================================
const sanitizeText = (text) => {
  if (typeof text !== 'string') return '';
  
  return text
    .replace(/[<>\"'`]/g, '')
    .replace(/\n{2,}/g, '\n')
    .trim()
    .substring(0, 1000);
};

// ============================================
// الخصم العام - استخدم أحده فقط
// ============================================
export const GLOBAL_DISCOUNT = 45;

// ============================================
// بيانات المنتجات الخام
// ============================================
const productsRawData = [
  {
    id: 1,
    name: 'زيت السعد ',
    slug: 'saad-oil',
    originalPrice: 220,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828518/IMG_20251030_144402_dzagqt.jpg',
    imageAlt: '🌾',
    categories: ['skin', 'hair'],
    tags: ['إزالة الشعر', 'تأخير النمو', 'طبيعي 100%'],
    inStock: true,
    featured: true,
    description: 'زيت السعد الطبيعي المعصور على البارد، معروف بقدرته الفريدة على تأخير نمو الشعر غير المرغوب فيه بشكل طبيعي وآمن.',
    benefits: [
      'يؤخر نمو الشعر الزائد بشكل طبيعي',
      'يقلل كثافة الشعر مع الاستخدام المنتظم',
      'آمن على البشرة الحساسة',
      'يرطب ويغذي البشرة'
    ],
    ingredients: ['زيت السعد الطبيعي 100% - معصور على البارد'],
    howToUse: 'بعد إزالة الشعر، دلكي المنطقة بزيت السعد لمدة 5 دقائق مرتين يومياً. الاستخدام المنتظم يعطي أفضل النتائج.',
    warnings: ['للاستخدام الخارجي فقط', 'تجنبي ملامسة العينين', 'اختبري على منطقة صغيرة أولاً'],
    rating: 4.8,
    reviews: 245,
    soldCount: 680
  },
  {
    id: 2,
    name: 'زيت الورد ',
    slug: 'rose-oil',
    originalPrice: 220,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144322_xyrcka.jpg',
    imageAlt: '🌹',
    categories: ['skin', 'anti-aging'],
    tags: ['مضاد للشيخوخة', 'مرطب', 'عطر طبيعي', 'للبشرة الحساسة'],
    inStock: true,
    featured: true,
    description: 'زيت الورد النقي المعصور على البارد من بتلات الورد الجوري، يتميز برائحته الزكية وفوائده المذهلة للبشرة.',
    benefits: [
      'يحارب التجاعيد وعلامات الشيخوخة المبكرة',
      'يوحد لون البشرة ويفتحها طبيعياً',
      'يرطب البشرة ويمنحها نضارة فورية',
      'مضاد قوي للأكسدة والالتهابات'
    ],
    ingredients: ['زيت الورد الجوري النقي 100% - معصور على البارد'],
    howToUse: 'ضعي 2-3 قطرات على بشرة نظيفة ورطبة ودلكي بلطف. يستخدم صباحاً ومساءً للوجه والرقبة.',
    warnings: ['للاستخدام الخارجي فقط', 'احفظيه في مكان بارد بعيداً عن الضوء'],
    rating: 4.9,
    reviews: 312,
    soldCount: 850
  },
  {
    id: 3,
    name: 'زيت التنعيم ',
    slug: 'smoothing-oil',
    originalPrice: 180,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761830251/IMG_20251030_161451_vntsdd.png',
    imageAlt: '✨',
    categories: ['hair'],
    tags: ['تنعيم الشعر', 'فرد طبيعي', 'لمعان', 'ضد التجعد'],
    inStock: true,
    featured: true,
    description: 'مزيج سحري من الزيوت الطبيعية المعصورة على البارد، مصمم خصيصاً لتنعيم الشعر المجعد وإعطائه لمعاناً طبيعياً.',
    benefits: [
      'ينعم الشعر المجعد والجاف بفعالية عالية',
      'يمنح الشعر لمعاناً طبيعياً وصحياً',
      'يحمي من الحرارة والعوامل الخارجية',
      'يسهل تصفيف الشعر ويقلل التشابك'
    ],
    ingredients: ['مزيج من زيوت الأرغان، جوز الهند، والجوجوبا - معصورة على البارد'],
    howToUse: 'على شعر رطب أو جاف، ضعي كمية مناسبة على الشعر من الجذور للأطراف. يمكن استخدامه يومياً.',
    warnings: ['للاستخدام الخارجي فقط', 'تجنبي ملامسة العينين'],
    rating: 4.8,
    reviews: 289,
    soldCount: 720
  },
  {
    id: 4,
    name: 'خلطة السبع زيوت ',
    slug: 'seven-oils',
    originalPrice: 180,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828523/IMG_20251030_152134_f3zl98.jpg',
    imageAlt: '🌟',
    categories: ['hair', 'hair-growth'],
    tags: ['مزيج سبع زيوت', 'تقوية', 'تطويل', 'كثافة'],
    inStock: true,
    featured: true,
    description: 'تركيبة مميزة من سبعة زيوت طبيعية معصورة على البارد، مصممة لتقوية الشعر وتحفيز نموه وزيادة كثافته.',
    benefits: [
      'يجمع فوائد 7 زيوت طبيعية في زجاجة واحدة',
      'يقوي الشعر من الجذور ويمنع التساقط',
      'يحفز نمو الشعر ويزيد من كثافته',
      'يغذي فروة الرأس ويعالج القشرة'
    ],
    ingredients: ['زيت الخروع، الجرجير، الصبار، اللوز، الزيتون، جوز الهند، والأرغان - معصورة على البارد'],
    howToUse: 'دلكي فروة الرأس والشعر جيداً، اتركيه 2-3 ساعات أو طوال الليل، ثم اغسليه بشامبو مناسب.',
    warnings: ['للاستخدام الخارجي فقط', 'قد يسبب بقع على الملابس'],
    rating: 4.9,
    reviews: 456,
    soldCount: 920
  },
  {
    id: 5,
    name: 'زيت جوز الهند ',
    slug: 'coconut-oil',
    originalPrice: 160,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144438_m3rxfc.jpg',
    imageAlt: '🥥',
    categories: ['hair', 'skin'],
    tags: ['طبيعي', 'للشعر', 'للبشرة', 'مرطب'],
    inStock: true,
    featured: true,
    description: 'زيت جوز الهند البكر المعصور على البارد، غني بالأحماض الدهنية المفيدة للشعر والبشرة.',
    benefits: [
      'يقلل فقدان البروتين من الشعر بنسبة 40%',
      'مضاد للبكتيريا والفطريات طبيعياً',
      'يخترق جذع الشعرة ويغذيها من الداخل',
      'مرطب عميق للبشرة الجافة والمتشققة'
    ],
    ingredients: ['زيت جوز الهند البكر 100% - معصور على البارد'],
    howToUse: 'للشعر: دلكي من الجذور حتى الأطراف واتركيه 30 دقيقة. للبشرة: ضعي كمية صغيرة ودلكي برفق.',
    warnings: ['للاستخدام الخارجي فقط', 'تجنبي ملامسة العينين'],
    rating: 4.8,
    reviews: 378,
    soldCount: 840
  },
  {
    id: 6,
    name: 'زيت الجوجوبا ',
    slug: 'jojoba-oil',
    originalPrice: 200,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144613_wdw40i.jpg',
    imageAlt: '🌿',
    categories: ['skin', 'hair'],
    tags: ['لا يسد المسام', 'للبشرة الدهنية', 'سريع الامتصاص'],
    inStock: true,
    featured: false,
    description: 'زيت الجوجوبا النقي المعصور على البارد. تركيبته شبيهة بالزيوت الطبيعية للبشرة مما يجعله مثالياً لجميع أنواع البشرة.',
    benefits: [
      'الأقرب تركيباً للزيوت الطبيعية للبشرة',
      'ينظم إنتاج الزيوت في البشرة الدهنية',
      'لا يسد المسام ولا يسبب الحبوب',
      'سريع الامتصاص وغير دهني'
    ],
    ingredients: ['زيت الجوجوبا النقي 100% - معصور على البارد'],
    howToUse: 'للبشرة: استخدمي قطرات قليلة كمرطب يومي. للشعر: ضعي على الأطراف لمنع التقصف.',
    warnings: ['للاستخدام الخارجي فقط'],
    rating: 4.7,
    reviews: 234,
    soldCount: 560
  },
  {
    id: 7,
    name: 'زيت اللوز الحلو ',
    slug: 'sweet-almond-oil',
    originalPrice: 200,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144344_k2rswm.jpg',
    imageAlt: '🌰',
    categories: ['skin', 'anti-aging'],
    tags: ['فيتامين E', 'للبشرة الحساسة', 'مضاد للأكسدة'],
    inStock: true,
    featured: false,
    description: 'زيت اللوز الحلو الطبيعي المعصور على البارد، غني بفيتامين E، مثالي للبشرة الحساسة والأطفال.',
    benefits: [
      'غني بفيتامين E المضاد القوي للأكسدة',
      'مناسب للبشرة الحساسة وبشرة الأطفال',
      'يحسن مرونة الجلد ونعومته بشكل ملحوظ',
      'يحارب علامات الشيخوخة والتجاعيد المبكرة'
    ],
    ingredients: ['زيت اللوز الحلو الطبيعي 100% - معصور على البارد'],
    howToUse: 'للوجه: ضعي قطرات قليلة ودلكي بحركات دائرية. للجسم: استخدمي بعد الاستحمام على بشرة رطبة.',
    warnings: ['للاستخدام الخارجي فقط', 'اختبري على منطقة صغيرة أولاً'],
    rating: 4.9,
    reviews: 298,
    soldCount: 670
  },
  {
    id: 8,
    name: 'زيت الروزماري ',
    slug: 'rosemary-oil',
    originalPrice: 220,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144535_dhucwx.jpg',
    imageAlt: '🌿',
    categories: ['hair', 'hair-growth'],
    tags: ['تطويل الشعر', 'منع التساقط', 'تنشيط الدورة الدموية'],
    inStock: true,
    featured: true,
    description: 'زيت الروزماري الطبيعي المعصور على البارد، معروف بقدرته الفائقة على تحفيز نمو الشعر ومنع تساقطه.',
    benefits: [
      'يحفز نمو الشعر بفعالية مثبتة علمياً',
      'ينشط الدورة الدموية في فروة الرأس',
      'يقوي بصيلات الشعر ويمنع التساقط',
      'يعالج قشرة الرأس والتهابات الفروة'
    ],
    ingredients: ['زيت الروزماري الطبيعي 100% - معصور على البارد'],
    howToUse: 'دلكي فروة الرأس بحركات دائرية لمدة 5 دقائق، اتركيه ساعتين أو طوال الليل، ثم اغسليه.',
    warnings: ['للاستخدام الخارجي فقط', 'تجنبي استخدامه أثناء الحمل', 'قد يسبب حساسية لبعض الأشخاص'],
    rating: 4.9,
    reviews: 412,
    soldCount: 890
  },
  {
    id: 9,
    name: 'زيت الخروع ',
    slug: 'castor-oil',
    originalPrice: 180,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828518/IMG_20251030_144420_xzmh5o.jpg',
    imageAlt: '🌱',
    categories: ['hair-growth', 'hair'],
    tags: ['تقوية الشعر', 'الرموش والحواجب', 'محفز للنمو'],
    inStock: true,
    featured: false,
    description: 'زيت الخروع الطبيعي المعصور على البارد من بذور نبات الخروع، مثالي لتقوية الشعر والرموش والحواجب.',
    benefits: [
      'يحفز نمو الشعر وكثافته بشكل ملحوظ',
      'يقوي الرموش والحواجب ويزيد كثافتها',
      'يحسن الدورة الدموية في فروة الرأس',
      'مضاد طبيعي للفطريات والبكتيريا'
    ],
    ingredients: ['زيت الخروع الطبيعي 100% - معصور على البارد'],
    howToUse: 'للشعر: دلكي فروة الرأس ليلاً واغسلي صباحاً. للرموش: استخدمي فرشاة ماسكارا نظيفة قبل النوم.',
    warnings: ['للاستخدام الخارجي فقط', 'تجنبي دخوله للعينين', 'قد يلطخ الملابس'],
    rating: 4.7,
    reviews: 345,
    soldCount: 720
  },
  {
    id: 10,
    name: 'زيت الأرغان ',
    slug: 'argan-oil',
    originalPrice: 200,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144630_df3akw.jpg',
    imageAlt: '🫒',
    categories: ['anti-aging', 'hair', 'skin'],
    tags: [ 'الذهب السائل', 'مكافح للشيخوخة'],
    inStock: true,
    featured: true,
    description: 'زيت الأرغان المغربي الأصلي المعصور على البارد من ثمار شجرة الأرغان النادرة، المعروف بالذهب السائل.',
    benefits: [
      'أعلى تركيز لفيتامين E بين جميع الزيوت الطبيعية',
      'يحارب علامات الشيخوخة والتجاعيد بفعالية',
      'يعزز إنتاج الكولاجين الطبيعي في البشرة',
      'يحمي من الأشعة فوق البنفسجية الضارة'
    ],
    ingredients: ['زيت الأرغان المغربي الأصلي 100% - معصور على البارد'],
    howToUse: 'للوجه: ضعي 2-3 قطرات مساءً على بشرة نظيفة. للشعر: استخدمي كماسك أسبوعي.',
    warnings: ['للاستخدام الخارجي فقط', 'احفظيه في مكان بارد بعيداً عن الضوء'],
    rating: 4.9,
    reviews: 389,
    soldCount: 810
  },
  {
    id: 11,
    name: 'زيت الجرجير ',
    slug: 'watercress-oil',
    originalPrice: 210,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144554_gicdez.jpg',
    imageAlt: '🥬',
    categories: ['hair', 'hair-growth'],
    tags: ['تطويل الشعر', 'منع التساقط', 'تغذية عميقة'],
    inStock: true,
    featured: false,
    description: 'زيت الجرجير الطبيعي المعصور على البارد، غني بالفيتامينات والمعادن الضرورية لصحة الشعر وتحفيز نموه.',
    benefits: [
      'يحفز نمو الشعر ويزيد طوله بسرعة',
      'يمنع تساقط الشعر ويقوي الجذور',
      'غني بالكبريت والحديد والزنك',
      'يعالج التهابات فروة الرأس'
    ],
    ingredients: ['زيت الجرجير الطبيعي 100% - معصور على البارد'],
    howToUse: 'دلكي فروة الرأس والشعر، اتركيه 2-3 ساعات أو طوال الليل، ثم اغسليه بشامبو مناسب.',
    warnings: ['للاستخدام الخارجي فقط', 'رائحته قوية قد لا تناسب البعض'],
    rating: 4.6,
    reviews: 267,
    soldCount: 580
  },
  {
    id: 12,
    name: 'زيت شجرة الشاي  ',
    slug: 'tea-tree-oil',
    originalPrice: 220,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144514_xvbrey.jpg',
    imageAlt: '🌳',
    categories: ['skin', 'hair'],
    tags: ['مضاد للبكتيريا', 'علاج حب الشباب', 'مطهر طبيعي'],
    inStock: true,
    featured: true,
    description: 'زيت شجرة الشاي النقي المعصور على البارد، معروف بخصائصه المضادة للبكتيريا والفطريات، مثالي لعلاج مشاكل البشرة.',
    benefits: [
      'مضاد قوي للبكتيريا والفطريات والفيروسات',
      'يعالج حب الشباب والبثور بفعالية',
      'ينقي البشرة ويطهرها طبيعياً',
      'يعالج قشرة الرأس والتهابات الفروة'
    ],
    ingredients: ['زيت شجرة الشاي النقي 100% - معصور على البارد'],
    howToUse: 'للبشرة: خففي قطرة واحدة بزيت ناقل وضعيها على المنطقة المصابة. للشعر: أضيفي قطرات للشامبو.',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه قبل الاستخدام', 'تجنبي البلع', 'قد يسبب حساسية'],
    rating: 4.8,
    reviews: 301,
    soldCount: 690
  },
  {
    id: 13,
    name: 'زيت اللافندر ',
    slug: 'lavender-oil',
    originalPrice: 180,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144304_jmmbt4.jpg',
    imageAlt: '💜',
    categories: ['relaxation', 'skin', 'hair'],
    tags: ['استرخاء', 'مهدئ', 'رائحة عطرة', 'علاج الأرق'],
    inStock: true,
    featured: false,
    description: 'زيت اللافندر النقي المعصور على البارد، بخصائصه المهدئة المذهلة ورائحته العطرة، مثالي للاسترخاء والعناية بالبشرة والشعر.',
    benefits: [
      'يساعد على الاسترخاء وتحسين جودة النوم',
      'مهدئ قوي للأعصاب ومخفف للتوتر',
      'يعالج حروق الشمس والالتهابات',
      'يحفز نمو الشعر ويمنع التساقط'
    ],
    ingredients: ['زيت اللافندر النقي 100% - معصور على البارد'],
    howToUse: 'للاسترخاء: ضعي قطرات على الوسادة. للبشرة: خففيه بزيت ناقل. للشعر: أضيفيه للشامبو.',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه قبل وضعه على البشرة'],
    rating: 4.8,
    reviews: 278,
    soldCount: 640
  },
  {
    id: 14,
    name: 'زيت بذور اليقطين ',
    slug: 'pumpkin-seed-oil',
    originalPrice: 220,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144248_hw9lrv.jpg',
    imageAlt: '🎃',
    categories: ['hair', 'hair-growth'],
    tags: ['منع الصلع', 'تقوية الشعر', 'غني بالزنك'],
    inStock: true,
    featured: true,
    description: 'زيت بذور اليقطين الطبيعي المعصور على البارد، غني بالزنك والأحماض الدهنية، معروف بقدرته على محاربة الصلع وتحفيز نمو الشعر.',
    benefits: [
      'يحارب الصلع الوراثي بفعالية مثبتة',
      'غني بالزنك الضروري لنمو الشعر',
      'يقوي بصيلات الشعر ويمنع التساقط',
      'ينظم إفراز هرمون DHT المسبب للصلع'
    ],
    ingredients: ['زيت بذور اليقطين الطبيعي 100% - معصور على البارد'],
    howToUse: 'دلكي فروة الرأس بكمية مناسبة، اتركيه 2-3 ساعات أو طوال الليل، ثم اغسليه بشامبو مناسب.',
    warnings: ['للاستخدام الخارجي فقط', 'قد يسبب حساسية لبعض الأشخاص'],
    rating: 4.7,
    reviews: 189,
    soldCount: 520
  },
  {
    id: 15,
    name: 'زيت السمسم ',
    slug: 'sesame-oil',
    originalPrice: 190,
    discountPercentage: 0,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144458_eqbrgi.jpg',
    imageAlt: '🌾',
    categories: ['skin', 'hair'],
    tags: ['تدليك', 'تغذية عميقة', 'مضاد للأكسدة'],
    inStock: true,
    featured: false,
    description: 'زيت السمسم الطبيعي المعصور على البارد، غني بالفيتامينات والمعادن، مثالي للتدليك والعناية بالبشرة والشعر.',
    benefits: [
      'غني بفيتامين E والسيسامول المضاد للأكسدة',
      'ممتاز للتدليك وترطيب البشرة',
      'يحمي الشعر من أضرار الشمس',
      'يعزز صحة فروة الرأس'
    ],
    ingredients: ['زيت السمسم الطبيعي 100% - معصور على البارد'],
    howToUse: 'للتدليك: دلكي الجسم بحركات دائرية. للشعر: استخدميه كحمام زيت أسبوعي.',
    warnings: ['للاستخدام الخارجي فقط', 'تأكدي من عدم وجود حساسية من السمسم'],
    rating: 4.6,
    reviews: 203,
    soldCount: 490
  }
];

// ============================================
// حساب الأسعار تلقائياً
// ============================================
// src/data/products.js - التعديل

export const PRODUCTS_DATA = productsRawData
  .map(product => {
    // ✅ Validate product
    if (!product.id || !product.name || !product.originalPrice) {
      console.error('Invalid product data:', product);
      return null;
    }
    
    // ✅ FIX: لا تطبق global discount إذا discount = 0
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
      hasDiscount: totalDiscount > 0, // ✅ علم واضح
      // ✅ Ensure required fields
      image: product.image || '',
      imageAlt: product.imageAlt || '🌿',
      inStock: product.inStock ?? true,
      rating: product.rating || 0,
      reviews: product.reviews || 0
    };
  })
  .filter(Boolean); // Remove invalid products
// ============================================
// دالة للحصول على منتج حسب ID
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

// ============================================
// دالة التحقق من صحة المنتج
// ============================================
export const validateProduct = (product) => {
  if (!product) return false;
  if (!product.id || !product.name || product.price === undefined) return false;
  if (product.price < 0 || product.originalPrice < 0) return false;
  return true;
};

export default PRODUCTS_DATA;