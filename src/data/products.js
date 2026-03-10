import { BOTTLE_SIZES } from './config';

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
    description: 'زيت اللوز الحلو الطبيعي 100% معصور على البارد - غني بفيتامين E وA',
    skin: {
      benefits: ['ترطيب عميق وسريع الامتصاص', 'تغذية فوريّة وتجديد خلوي', 'تهدئة الالتهابات والاحمرار', 'تفتيح وتوحيد لون البشرة', 'إزالة فعالة للمكياج والشوائب', 'تقليل علامات الإرهاق'],
      usage: { instruction: 'كسيروم ليلي - ضع 2-3 نقاط على بشرة رطبة ثم دلك برفق', asMakeupRemover: 'استخدم قطنة مع كمية صغيرة وامسح برفق', frequency: 'مرة يومياً قبل النوم' },
      suitableFor: 'البشرة الجافة، الحساسة، الناضجة',
      expectations: 'نعومة فورية، توهج خلال أسبوع، توحيد لون خلال 3-4 أسابيع'
    },
    hair: {
      benefits: ['تغذية عميقة لفروة الرأس', 'تعزيز النمو والإطالة', 'تحسين الملمس والنعومة', 'تقليل القشرة', 'إصلاح الشعر التالف', 'فك التشابكات'],
      usage: { asHairBath: 'ضع ملعقة على طول الشعر، دلك فروة 3-5 دقائق', asDailyTreatment: 'نقطة أو نقطتين على الأطراف بعد الاستحمام', frequency: '2-3 مرات أسبوعياً' },
      suitableFor: 'جميع أنواع الشعر خاصة الجاف والتالف',
      expectations: 'ملمس أنعم خلال أسبوع، شعر أقوى خلال 3 أسابيع'
    },
    scientificBasis: 'غني بفيتامين E الذي يحفز النمو، وحمض الأوليك الذي يخترق الشعرة',
    warnings: ['للاستخدام الخارجي فقط', 'يُحفظ بعيداً عن الإضاءة المباشرة'],
    storageHint: 'احفظ في مكان بارد وجاف بعيداً عن الحرارة',
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
    tags: ['تدليك', 'تغذية عميقة', 'مضاد للأكسدة', 'علاج جفاف'],
    inStock: true,
    featured: false,
    description: 'زيت السمسم الطبيعي المعصور على البارد - مضاد للأكسدة قوي',
    skin: {
      benefits: ['واقي طبيعي من الشمس', 'مضاد للالتهابات', 'مرطب قوي للجفاف الشديد', 'تحسين مرونة البشرة'],
      usage: { instruction: 'ضع قطرتان مع التدليك الدائري الخفيف', asSunscreen: 'ضع قبل الكريم الواقي من الشمس', frequency: 'مرة أو مرتين يومياً' },
      suitableFor: 'البشرة الجافة جداً، الحساسة للشمس',
      expectations: 'ترطيب فوري، حماية من الشمس'
    },
    hair: {
      benefits: ['تحفيز النمو والإطالة', 'الوقاية من الشيب المبكر', 'علاج فعال للقشرة', 'تقوية الشعر الضعيف'],
      usage: { asHairBath: 'دفّئ الزيت، وزعه على الفروة، دلك 10 دقائق، فوطة دافئة', frequency: 'مرتين أسبوعياً' },
      suitableFor: 'الشعر الخفيف، الضعيف، المعرض للتساقط',
      expectations: 'تقوية خلال 4-6 أسابيع، منع شيب خلال 3 أشهر'
    },
    scientificBasis: 'يحتوي على السيسامول وحمض الليوليك وفيتامين E',
    warnings: ['للاستخدام الخارجي فقط'],
    storageHint: 'احفظ في درجة حرارة الغرفة بعيداً عن الرطوبة',
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
    description: 'زيت شجرة الشاي النقي المعصور على البارد - مطهر وقاتل للبكتيريا',
    skin: {
      benefits: ['مضاد قوي للبكتيريا وحب الشباب', 'تنقية المسام بعمق', 'تقليل اللمعان الزائد', 'قتل الفطريات', 'علاج سريع للبثور'],
      usage: { onFaceAllover: 'امزج 3-4 قطرات في 15مل جوجوبا، طبق على الوجه', onSpots: 'نقطتين في 5مل جوجوبا على الحبوب', frequency: 'مرة يومياً مساءً' },
      suitableFor: 'البشرة الدهنية، حب الشباب',
      expectations: 'تجفيف البثور خلال 24-48 ساعة، تنقية خلال أسبوع'
    },
    hair: {
      benefits: ['مكافحة فعالة للقشرة الفطرية', 'علاج الحكة والالتهابات', 'تنظيف دهون فروة الرأس', 'منع التساقط المرتبط بالفطريات'],
      usage: { withShampoo: 'أضف 3-4 قطرات للشامبو، دلك الفروة', asHairMask: 'امزج 15مل ناقل + 5-8 قطرات، اترك نصف ساعة', frequency: 'مرتين أسبوعياً' },
      suitableFor: 'فروة الرأس الدهنية، القشرة الفطرية',
      expectations: 'تقليل القشرة خلال أسبوعين، حكة أقل خلال 3 أيام'
    },
    scientificBasis: 'يحتوي على تيربينول-4 الذي يقتل البكتيريا والفطريات',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه بزيت ناقل دائماً'],
    storageHint: 'احفظ في زجاجة زجاجية بعيداً عن الضوء',
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
    description: 'زيت اللافندر النقي المعصور على البارد - مهدئ طبيعي',
    skin: {
      benefits: ['تهدئة فورية وتقليل الالتهاب', 'علاج حب الشباب', 'ترطيب عميق', 'تخفيف الندوب', 'تحسين ملمس البشرة'],
      usage: { asSerum: 'امزج 15مل بذور عنب + 3 قطرات لافندر', onSpots: 'نقطة واحدة مباشرة على الحبوب', frequency: 'مرة يومياً' },
      suitableFor: 'البشرة الحساسة، الملتهبة، الناضجة',
      expectations: 'تهدئة فورية، التئام خلال أسبوع'
    },
    hair: {
      benefits: ['تحفيز النمو وتقليل التساقط', 'تقليل الحكة', 'مضاد للبكتيريا والفطريات', 'ترطيب وتحسين اللمعان'],
      usage: { withShampoo: 'أضف 3-4 قطرات للشامبو', asHairMask: 'امزج 15مل ناقل + 5 قطرات', asPerfume: 'نقطتان على الأطراف' },
      suitableFor: 'جميع أنواع الشعر',
      expectations: 'تقوية خلال 4 أسابيع، رائحة طيبة دائمة'
    },
    scientificBasis: 'يحتوي على الليناليول والأسيتات المهدئة',
    warnings: ['للاستخدام الخارجي فقط'],
    storageHint: 'احفظ في زجاجة داكنة بعيداً عن الحرارة',
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
    description: 'زيت بذور اليقطين الطبيعي المعصور على البارد - مثبط DHT',
    skin: {
      benefits: ['ترطيب عميق للبشرة الجافة', 'تحسين الدورة الدموية'],
      usage: { instruction: 'نقطة واحدة بحركات دائرية على الخطوط الرفيعة', frequency: 'مرة يومياً' },
      suitableFor: 'البشرة الجافة، الناضجة',
      expectations: 'ملمس أنعم خلال أسبوعين'
    },
    hair: {
      benefits: ['تقوية البصيلات وتقليل التساقط', 'مثبط DHT الطبيعي', 'حماية من التلف', 'تحفيز الدورة الدموية', 'ترطيب الفروة', 'دعم الكيراتين', 'منع الشيب'],
      usage: { asHairBath: 'ضع 5-10 دقائق تدليك، ساعة لساعتين', asDailyOil: 'نقطة واحدة على الأطراف', asBooster: 'أضف لشامبوك' },
      suitableFor: 'الشعر المتساقط، الصلع الوراثي، الضعيف',
      expectations: 'توقف التساقط خلال 6-8 أسابيع، نمو جديد خلال 3 أشهر'
    },
    scientificBasis: 'يحتوي على Delta-7-Sterol الذي يثبط DHT',
    warnings: ['للاستخدام الخارجي فقط', 'الاستمرارية ضرورية'],
    storageHint: 'احفظ في مكان بارد - قد يتجمد',
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
    description: 'زيت جوز الهند البكر المعصور على البارد - الوحيد المثبت علمياً',
    skin: {
      benefits: ['محاربة علامات الشيخوخة', 'علاج تشقق الشفاه', 'ترطيب فائق للجسم', 'مزيل طبيعي للمكياج'],
      usage: { asMoisturizer: 'كمية صغيرة على بشرة رطبة', asMakeupRemover: 'قطنة + تنظيف مزدوج', frequency: 'مرة يومياً' },
      suitableFor: 'البشرة الجافة جداً، الجسم، الشفاه',
      expectations: 'ترطيب فوري، نعومة خلال أيام'
    },
    hair: {
      benefits: ['ترطيب عميق وتقليل فقدان البروتين (40%)', 'مكافحة القشرة', 'فك التشابك', 'إصلاح التالف من الحرارة', 'لمعان حريري', 'حماية من الشمس'],
      usage: { asHairBath: 'دلك جيداً، اترك 10 دقائق مساج، ساعتين أو طول الليل', asSealant: 'نقطة على الأطراف قبل الحرارة', deepTreatment: '4 أشهر متواصلة' },
      suitableFor: 'جميع أنواع الشعر خاصة الجاف والتالف',
      expectations: 'ملمس أنعم خلال أسبوع، قوة خلال 3-4 أسابيع'
    },
    scientificBasis: 'الوحيد المثبت علمياً يقلل فقدان البروتين',
    warnings: ['للاستخدام الخارجي فقط'],
    storageHint: 'قد يتجمد في البرد - ضعه في ماء دافئ',
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
    tags: ['الذهب السائل', 'مكافح الشيخوخة', 'سريع الامتصاص'],
    inStock: true,
    featured: true,
    description: 'زيت الأرغان المغربي الأصلي المعصور على البارد - الذهب السائل',
    skin: {
      benefits: ['ترطيب عميق', 'تحفيز الكولاجين وتقليل التجاعيش', 'تهدئة البشرة الحساسة', 'آمن تحت العين', 'توهج طبيعي'],
      usage: { instruction: '2-3 قطرات، حركات دائرية من تحت لفوق', underEye: 'آمن تحت العين', frequency: 'مرة يومياً' },
      suitableFor: 'البشرة الناضجة، الجافة، الحساسة',
      expectations: 'توهج خلال أسبوع، تقليل تجاعيش خلال 4 أسابيع'
    },
    hair: {
      benefits: ['تقوية وتقليل التساقط', 'ترطيب الفروة', 'زيادة الكثافة', 'تقليل الهيشان', 'لمعان فاخر', 'حماية من التقصف'],
      usage: { asHairBath: 'ملعقة، 3-5 دقائق مساج، 2-3 ساعات', asDailyTreatment: 'قطرة أو قطرتين على الأطراف', deepCondition: 'طوال الليل للشعر التالف' },
      suitableFor: 'جميع أنواع الشعر خاصة التالف',
      expectations: 'لمعان فوري، قوة خلال 3 أسابيع'
    },
    scientificBasis: 'غني بفيتامين E وحمض اللينوليك',
    warnings: ['للاستخدام الخارجي فقط'],
    storageHint: 'احفظ في زجاجة زجاجية داكنة',
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
    tags: ['تكثيف الشعر', 'الرموش والحواجب', 'محفز النمو'],
    inStock: true,
    featured: false,
    description: 'زيت الخروع الطبيعي المعصور على البارد - محفز النمو القوي',
    skin: {
      benefits: ['ترطيب عميق للجافة', 'مكافحة التجاعيش', 'علاج حب الشباب', 'توحيد اللون', 'تهدئة حروق الشمس'],
      usage: { instruction: 'نقطة واحدة بحركات دائرية', onSpots: 'موضعي على الحبوب فقط', frequency: 'يومياً' },
      suitableFor: 'البشرة الجافة، الناضجة',
      expectations: 'ترطيب سريع، تحسن ملحوظ خلال أسبوع'
    },
    hair: {
      benefits: ['تحفيز النمو وإنبات الفراغات', 'تكثيف وتقوية', 'مقاومة القشرة', 'علاج التقصف', 'لمعان فاخر', 'تطويل الرموش والحواجب'],
      usage: { asHairBath: 'خفف بزيت ناقل 1:1، دلك 3-5 دقائق، 2-3 ساعات', asDailyTreatment: 'نقطة على الأطراف', forLashesBrows: 'فرشاة ماسكرا قبل النوم' },
      suitableFor: 'الشعر الضعيف، الرموش الخفيفة',
      expectations: 'رموش أطول خلال 6-8 أسابيع، شعر أقوى خلال شهر'
    },
    scientificBasis: 'غني بحمض الريسينوليك المحفز للنمو',
    warnings: ['للاستخدام الخارجي فقط', 'زيت تقيل - يفضل تخفيفه'],
    storageHint: 'احفظ في مكان بارد وجاف',
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
    description: 'زيت الروزماري الطبيعي المعصور على البارد - مثل المينوكسيديل',
    skin: {
      benefits: ['مضاد للأكسدة', 'علاج حب الشباب', 'تنظيف المسام', 'تقليل علامات الشيخوخة', 'تحسين السيلوليت'],
      usage: { forAcne: 'قطرة + ملعقة جل صبار موضعي', forTightening: 'قطرة في المرطب الليلي', frequency: 'يومياً' },
      suitableFor: 'البشرة الدهنية، حب الشباب',
      expectations: 'تنقية خلال أسبوع، جلد نظيف خلال 3 أسابيع'
    },
    hair: {
      benefits: ['تحفيز النمو وتقليل التساقط (مثل المينوكسيديل)', 'تقليل القشرة', 'تقوية الشعر', 'تقليل الشيب المبكر', 'تنشيط الدورة الدموية'],
      usage: { asHairBath: 'خمس 5-8 قطرات + 15مل ناقل، دلك 10 دقائق، ساعة لساعتين', withShampoo: 'اضف 2-3 قطرات لشامبوك', frequency: '2-3 مرات أسبوعياً' },
      suitableFor: 'الشعر الضعيف، المتساقط، الرقيق',
      expectations: 'تقوية خلال شهر، توقف تساقط خلال 6-8 أسابيع'
    },
    scientificBasis: 'فعال مثل المينوكسيديل 2% في تحفيز النمو',
    warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه'],
    storageHint: 'احفظ بعيداً عن الضوء والحرارة',
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
    tags: ['مضاد الشيخوخة', 'كولاجين طبيعي', 'موحد لون'],
    inStock: true,
    featured: true,
    description: 'زيت الورد النقي المعصور على البارد - مضاد شيخوخة طبيعي',
    skin: {
      benefits: ['تفتيح وتوحيد اللون', 'تضييق المسام', 'شد الجلد', 'ترطيب الحساسة والجافة', 'محاربة التجاعيش', 'إشراق فوري'],
      usage: { asSerum: 'سيروم مسائي - 2-3 قطرات على بشرة رطبة', asToner: 'قطرتان في بخاخ ماء ورد', frequency: 'مرتين يومياً' },
      suitableFor: 'البشرة الناضجة، الحساسة، الدهنية المختلطة',
      expectations: 'توهج خلال 3 أيام، توحيد لون خلال أسبوعين'
    },
    hair: {
      benefits: ['تعطير الشعر برائحة طيبة', 'ترطيب الأطراف', 'تقليل التقصف', 'تهدئة حكة الفروة'],
      usage: { asSerum: 'قطرة واحدة فقط على الأطراف بعد التصفيف', frequency: 'يومياً' },
      suitableFor: 'جميع أنواع الشعر للتعطير',
      expectations: 'رائحة طيبة فوراً، أطراف أنعم خلال أسبوع'
    },
    scientificBasis: 'غني بفيتامين C وحمض الجالك ومضادات الأكسدة',
    warnings: ['للاستخدام الخارجي فقط'],
    storageHint: 'احفظ في زجاجة زجاجية داكنة',
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
    description: 'زيت الجوجوبا النقي المعصور على البارد - مشابه دهون البشرة الطبيعية',
    skin: {
      benefits: ['ترطيب وتغذية بدون انسداد مسام', 'توازن دهون البشرة الطبيعية', 'آمن للبشرة الدهنية'],
      usage: { asSerum: 'سيروم ليلي - 2-3 نقاط بالطبطبة', frequency: 'مرة يومياً' },
      suitableFor: 'البشرة الدهنية، المختلطة، الحساسة',
      expectations: 'توازن فوري، جلد صحي خلال أسبوع'
    },
    hair: {
      benefits: ['ترطيب وتقليل الهيشان', 'تنظيم دهون الفروة', 'تقليل القشرة والحكة', 'تقوية والتقصف'],
      usage: { asHairBath: 'ثلاث 3-5 دقائق، ساعتين أو ثلاث', asDailyTreatment: 'نقطة أو نقطتين', frequency: '2-3 مرات أسبوعياً' },
      suitableFor: 'جميع أنواع الشعر خاصة الدهني',
      expectations: 'توازن دهون خلال أسبوعين، قوة خلال شهر'
    },
    scientificBasis: 'يشبه دهون الجلد الطبيعية - يمتصه الجلد بسرعة',
    warnings: ['للاستخدام الخارجي فقط'],
    storageHint: 'احفظ في درجة حرارة الغرفة',
    rating: 4.7,
    reviews: 234,
    soldCount: 560
  },

  {
    id: 12,
    name: 'زيت السعد',
    slug: 'cyperus-oil',
    originalPrice: 250,
    discountPercentage: 40,
    size: BOTTLE_SIZES.medium,
    image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828518/IMG_20251030_144402_dzagqt.jpg',
    imageAlt: '🌾',
    categories: ['skin'],
    tags: ['إزالة الشعر', 'تأخير النمو', 'طبيعي 100%', 'تفتيح'],
    inStock: true,
    featured: true,
    description: 'زيت السعد الطبيعي المعصور على البارد - تأخير نمو الشعر',
    skin: {
      benefits: ['تقليل نمو الشعر (40% بفعالية)', 'مضاد للالتهابات', 'تفتيح البشرة', 'مضاد للبكتيريا', 'تهدئة'],
      usage: { preparation: 'امزج 5مل سعد + 30مل لوز حلو أو جوجوبا', application: 'مساج 5 دقائق', frequency: 'أول 3 أيام مرتين يومياً، ثم مرة قبل النوم', duration: 'أسبوع بعد كل إزالة شعر، 6 شهور للنتائج' },
      suitableFor: 'البشرة الدهنية، الحساسة من إزالة الشعر',
      expectations: 'تأخير واضح خلال 3 أسابيع، نتائج كاملة خلال 6 أشهر'
    },
    hair: { benefits: [], usage: {}, suitableFor: 'للاستخدام على البشرة فقط' },
    scientificBasis: 'يحتوي على فلافونويدات تؤثر على هرمون الأندروجين',
    warnings: ['للاستخدام الخارجي فقط', 'متخصص لتقليل نمو الشعر'],
    storageHint: 'احفظ في درجة حرارة الغرفة',
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
    description: 'زيت الجرجير الطبيعي المعصور على البارد - علاج الثعلبة',
    skin: {
      benefits: ['شد البشرة ومحاربة التجاعيش', 'علاج آثار الحبوب', 'تحسين الملمس'],
      usage: { instruction: 'نقطتان على بشرة رطبة قبل النوم، دلك برفق', frequency: '2-3 مرات أسبوعياً', duration: '4 أشهر' },
      suitableFor: 'البشرة الناضجة، الحساسة',
      expectations: 'شد خلال أسابيع، تحسن آثار خلال شهر'
    },
    hair: {
      benefits: ['تحفيز نمو الشعر وملء الفراغات (علاج الثعلبة)', 'تقوية جذور الشعر', 'منع التساقط', 'ترطيب عميق', 'تقليل الهيشان'],
      usage: { application: '10-15مل على الفروة، تدليك بوضعية الانحناء 10 دقائق', duration: '2-3 ساعات أو طول الليل', frequency: 'مرتين أسبوعياً', timeframe: '3-6 شهور' },
      suitableFor: 'الشعر المتساقط، الثعلبة، الفراغات',
      expectations: 'نمو ملحوظ خلال 3 أشهر، ملء فراغات خلال 6 أشهر'
    },
    scientificBasis: 'غني بالكبريت والفيتامينات التي تحفز النمو',
    warnings: ['للاستخدام الخارجي فقط'],
    storageHint: 'احفظ بعيداً عن الضوء والحرارة',
    rating: 4.6,
    reviews: 267,
    soldCount: 580
  }
];

// حساب الأسعار تلقائياً
export const PRODUCTS_DATA = productsRawData
  .map(product => {
    if (!product.id || !product.name || !product.originalPrice) {
      console.error('Invalid product data:', product);
      return null;
    }
    
    const effectiveDiscount = product.discountPercentage > 0
      ? product.discountPercentage
      : 40;
    
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