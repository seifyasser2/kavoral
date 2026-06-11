import { getProductById } from "./products";

// ============================================
// الخصم العام للعروض
// ============================================
export const GLOBAL_BUNDLE_DISCOUNT = 35; 

// ============================================
// بيانات العروض المحسنة مع معلومات طبية موثوقة
// ============================================

const bundlesRawData = [
  // =========================================================================
  // 1. كورس زيادة الوزن من كافورال (Weight Gain Course)
  // =========================================================================
  {
    id: "weight-gain-course-cafural",
    name: "كورس زيادة الوزن (5 قطع شامل الهدايا) 🎁",
    description: "توفير 250 جنيهاً | الكورس المتكامل: المختوم + الخلطة السحرية + (هدية) خلطة التنعيم + (هدية)خلطه السبع زيوت .",
    image: "https://res.cloudinary.com/dl9rygqx6/image/upload/v1777411286/WhatsApp_Image_2026-04-28_at_11.55.09_PM_gpamhj.jpg",
    imageAlt: "🥣",
    products: [101, 102, 103, 104], 
    productNames: [
      "المختوم الفلسطيني الأصلي (نصف كيلو)",
      "الخلطة السحرية للتسمين (800 جرام )",
      "🎁 عبوة خلطة التنعيم (مجاناً)",
      "🎁 عبوة خلطه السبع زيوت (مجاناً)"
    ],
    discountPercentage: 22.7, 
    category: "nutrition",
    featured: true,
    ratings: 4.98,
    reviews: 310,
    soldCount: 950,
    
    ingredients: {
      magicMix: [
        "شوفان", "لبن بودر", "كاكاو", "فول سوداني", "سمسم", "بذور الشيا"
      ],
      makhtoum: [
        "مكسرات فاخرة (لوز، بندق، كاجو، عين جمل، سوداني مقشر)",
        "فواكه مجففة (تين مجفف، تمر رطب سكري، سكري القصيم، تمر الوادي)",
        "زيوت طبيعية (زيت زيتون بكر أصلي حموضة < 1%)",
        "عسل طبيعي (عسل نوارة برسيم، عسل زهور موالح، عسل السدر الجبلي الملكي)",
        "أعشاب وبذور (سمسم، حبة البركة، اشواجندا، بذور جرجير، بذور فجل، زنجبيل، حلبة مغات، قرفة سيجار، خولنجان، بذور يقطين)",
        "منتجات النحل (حبوب لقاح نوارة البرسيم، حبوب لقاح أعشاب صحراوي، طلع النخيل)",
        "إضافات صحية (جوز هند، جنين القمح)"
      ]
    },

    benefits: [
      "زيادة وزن ملحوظة وآمنة تتراوح من 6 إلى 8 كيلو شهرياً (عند الالتزام بالجرعات).",
      "فاتح شهية طبيعي قوي جداً يساعدك على الاستمتاع بوجباتك اليومية.",
      "يعمل على ملء مناطق النحافة في الجسم وتنسيق القوام بشكل طبيعي.",
      "إمداد الجسم بطاقة هائلة بفضل المكسرات الفاخرة والأعشاب الحيوية.",
      "غني بالألياف والمعادن التي تحسن الهضم وتزيد من امتصاص الجسم للغذاء.",
      "آمن تماماً للأطفال والكبار لأنه خالٍ من الكورتيزون والمواد الكيميائية.",
      "يحتوي على السوبر فود (بذور الشيا وحبة البركة) لتقوية المناعة أثناء زيادة الوزن."
    ],

    combinedUsage: `
*طريقة الاستخدام اليومية لضمان زيادة 6-8 كيلو:*

1. **الصبح على الريق:** معلقة كبيرة من المختوم الفلسطيني لفتح الشهية وتنشيط الجسم.

2. **المشروب العملاق (مرة واحدة يوميًا):**
   - 5 معالق كبار من الخلطة السحرية (الشوفان والبروتين الطبيعي).
   - معلقة كبيرة من المختوم.
   - 200 مل لبن كامل الدسم + موزة.
   - عسل للتحلية (حسب الرغبة).

*نصيحة كافورال:* الالتزام اليومي وعدم تفويت المشروب هو السر الحقيقي للوصول للوزن المثالي.
    `,
    usage: "ملعقة مختوم صباحاً + المشروب السحري مرة يومياً. الالتزام سر النتيجة.",
    suitableFor: "النحافة الشديدة، ضعف الشهية، الأطفال من سن 3 سنوات، والرياضيين الراغبين في ضخامة عضلية صحية.",
    season: "مناسب طول السنة",
    expectedResults: "زيادة من 6 إلى 8 كيلو في الشهر الأول، مع تحسن ملحوظ في النشاط البدني والمظهر العام.",
    scientificBasis: "يعتمد الكورس على مبدأ 'الفائض الغذائي' بتوفير سعرات حرارية عالية القيمة من مصادر طبيعية 100% غنية بالبروتينات والدهون الصحية والأعشاب المحفزة للنمو.",
  },

  // =========================================================================
  // 2. كورس النحافة الشديدة من كافورال
  // =========================================================================
  {
    id: "severe-thinness-course-cafural",
    name: "كورس النحافة الشديدة من كافورال 🔥",
    description: "توفير 650 جنيهاً | 4 عبوات خلطة سحرية + 2 عبوة مختوم فلسطيني أصلي للنحافة الشديدة.",
    image: "https://res.cloudinary.com/dl9rygqx6/image/upload/v1781207249/WhatsApp_Image_2026-06-11_at_6.05.17_PM_eidleo.jpg",
    imageAlt: "🔥",
    products: [102, 102, 102, 102, 101, 101],
    productNames: [
      "الخلطة السحرية للتسمين - عبوة 1",
      "الخلطة السحرية للتسمين - عبوة 2",
      "الخلطة السحرية للتسمين - عبوة 3",
      "الخلطة السحرية للتسمين - عبوة 4",
      "المختوم الفلسطيني الأصلي - عبوة 1",
      "المختوم الفلسطيني الأصلي - عبوة 2",
    ],
    discountPercentage: 32.5,
    category: "nutrition",
    featured: true,
    ratings: 4.97,
    reviews: 180,
    soldCount: 420,

    ingredients: {
      magicMix: [
        "شوفان", "لبن بودرة", "كاكاو", "فول سوداني", "سمسم", "بذور الشيا"
      ],
      makhtoum: [
        "لوز", "بندق", "كاجو", "عين جمل", "سوداني مقشر",
        "تمر رطب سكري", "تمر الوادي",
        "سمسم", "عسل موالح", "عسل برسيم", "عسل سدر جبلي",
        "زيت زيتون بكر", "حبوب لقاح بلدي", "حبة البركة",
        "بذور اليقطين"
      ]
    },

    benefits: [
      "يساعد على زيادة الوزن في حالات النحافة الشديدة.",
      "يساهم في فتح الشهية بشكل طبيعي.",
      "إمداد الجسم بطاقة وسعرات عالية القيمة الغذائية.",
      "تحسين الحالة الغذائية العامة.",
      "دعم بناء الكتلة العضلية بشكل صحي.",
      "نتائج تظهر تدريجيًا مع الالتزام.",
    ],

    combinedUsage: `
*طريقة الاستخدام اليومية:*

1. **الصبح على الريق:** ملعقة كبيرة من المختوم الفلسطيني.

2. **المشروب اليومي:**
   - 5 معالق كبار من الخلطة السحرية.
   - ملعقة كبيرة من المختوم.
   - 200 مل لبن كامل الدسم + موزة.
   - عسل للتحلية حسب الرغبة.

*نصيحة كافورال:* الاستخدام المنتظم مع الأكل يساعد على زيادة ملحوظة.
    `,
    usage: "ملعقة مختوم صباحاً + المشروب اليومي مرة واحدة. الالتزام هو السر.",
    suitableFor: "النحافة الشديدة وصعوبة زيادة الوزن.",
    season: "مناسب طول السنة",
    expectedResults: "زيادة تصل إلى حوالي 2 كيلو أسبوعيًا حسب طبيعة الجسم والالتزام.",
    scientificBasis: "يعتمد الكورس على مبدأ الفائض الغذائي بتوفير سعرات حرارية عالية من مصادر طبيعية 100%.",
  },
];

// حساب الأسعار تلقائياً
export const BUNDLE_OFFERS = bundlesRawData.map((bundle) => {
  let originalPrice;
  if (bundle.id === "weight-gain-course-cafural") {
    originalPrice = 1100;
  } else if (bundle.id === "severe-thinness-course-cafural") {
    originalPrice = 2000;
  } else {
    originalPrice = bundle.products.reduce((total, productId) => {
      const product = getProductById(productId);
      return total + (product ? product.originalPrice : 0);
    }, 0);
  }

  const bundleDiscount =
    bundle.discountPercentage > 0
      ? bundle.discountPercentage
      : GLOBAL_BUNDLE_DISCOUNT;

  const totalDiscount = Math.min(Math.max(bundleDiscount, 0), 100);
  let bundlePrice = Math.round(originalPrice * (1 - totalDiscount / 100));
  
  if (bundle.id === "weight-gain-course-cafural") {
    bundlePrice = 850;
  } else if (bundle.id === "severe-thinness-course-cafural") {
    bundlePrice = 1350;
  }

  const savings = Math.round(originalPrice - bundlePrice);
  const pricePerProductInBundle = Math.round(
    bundlePrice / bundle.products.length
  );

  return {
    ...bundle,
    originalPrice,
    bundlePrice,
    savings,
    totalDiscountPercentage: Math.round((savings / originalPrice) * 100),
    pricePerProductInBundle,
  };
});

// دوال مساعدة
export const getBundleById = (id) => {
  return BUNDLE_OFFERS.find((b) => b.id === id) || null;
};

export const getFeaturedBundles = () => {
  return BUNDLE_OFFERS.filter((b) => b.featured);
};

export const getBundlesByCategory = (category) => {
  return BUNDLE_OFFERS.filter((b) => b.category === category);
};

export const validateBundleProducts = (bundle) => {
  if (!bundle || !bundle.products) return false;
  if (bundle.id === "weight-gain-course-cafural") return true;
  if (bundle.id === "severe-thinness-course-cafural") return true;

  const validProducts = bundle.products
    .map((id) => getProductById(id))
    .filter((product) => product !== null);
  return validProducts.length === bundle.products.length;
};

export const validateBundle = (bundle) => {
  if (!bundle) return false;
  if (!bundle.id || !bundle.name || !bundle.products) return false;
  if (bundle.products.length === 0) return false;
  if (bundle.bundlePrice < 0) return false;
  if (!validateBundleProducts(bundle)) return false;
  return true;
};

export const getBestBundle = () => {
  return BUNDLE_OFFERS.reduce((best, current) => {
    return current.savings > (best.savings || 0) ? current : best;
  }, BUNDLE_OFFERS[0] || null);
};

export const getBestSavePercentage = () => {
  return Math.max(...BUNDLE_OFFERS.map((b) => b.totalDiscountPercentage));
};

export default BUNDLE_OFFERS;