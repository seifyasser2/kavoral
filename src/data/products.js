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
export const GLOBAL_DISCOUNT = 40;

// ============================================
// بيانات المنتجات الخام
// ============================================
// ============================================
// بيانات المنتجات الخام - UPDATED PRICES
// ============================================
const productsRawData = [
    {
        id: 1,
        name: 'زيت السعد ',
        slug: 'saad-oil',
        originalPrice: 250,
        discountPercentage: 40,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828518/IMG_20251030_144402_dzagqt.jpg',
        imageAlt: '🌾',
        categories: ['skin', 'hair'],
        tags: ['إزالة الشعر', 'تأخير النمو', 'طبيعي 100%', 'تفتيح'],
        inStock: true,
        featured: true,
        description: 'زيت السعد الطبيعي المعصور على البارد، معروف بقدرته الفريدة على إضعاف بصيلات الشعر وتأخير نموه بشكل طبيعي وآمن بعد الإزالة من الجذور.',
        benefits: [
            'يؤخر نمو الشعر الزائد ويقلل كثافته تدريجياً',
            'يعمل على تفتيح المناطق الداكنة مثل الإبط والبيكيني',
            'آمن على البشرة الحساسة بعد إزالة الشعر',
            'يقلل من التهيج والالتهاب بعد عملية إزالة الشعر'
        ],
        ingredients: ['زيت السعد الطبيعي 100% - معصور على البارد'],
        howToUse: 'بعد إزالة الشعر من الجذور ، دلكي المنطقة بزيت السعد لمدة 5 دقائق مرتين يومياً. الاستخدام المنتظم يعطي أفضل النتائج.',
        warnings: ['للاستخدام الخارجي فقط', 'تجنبي ملامسة العينين', 'اختبري على منطقة صغيرة أولاً'],
        rating: 4.8,
        reviews: 245,
        soldCount: 680
    },
    {
        id: 2,
        name: 'زيت الورد ',
        slug: 'rose-oil',
        originalPrice: 280,
        discountPercentage: 39,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144322_xyrcka.jpg',
        imageAlt: '🌹',
        categories: ['skin', 'anti-aging'],
        tags: ['مضاد للشيخوخة', 'كولاجين طبيعي', 'موحد لون', 'للبشرة والشعر'],
        inStock: true,
        featured: true,
        description: 'زيت الورد النقي المعصور على البارد من بتلات الورد الجوري، كنز غني بفيتامينات (E, A, C) والمعادن التي تكافح شيخوخة البشرة.',
        benefits: [
            'يحارب التجاعيد والخطوط الدقيقة ويعزز إنتاج الكولاجين',
            'يزيل بقع حب الشباب والتصبغات ويوحد لون البشرة طبيعياً',
            'يساعد في تفتيح الهالات السوداء حول العينين',
            'يعالج تقصف الشعر ويقلل القشرة والالتهابات في فروة الرأس'
        ],
        ingredients: ['زيت الورد الجوري النقي 100% - معصور على البارد'],
        howToUse: 'للبشرة: ضعي 2-3 قطرات على بشرة نظيفة ودلكي بلطف مساءً. للشعر: يضاف للشامبو أو يستخدم كحمام زيت أسبوعي.',
        warnings: ['للاستخدام الخارجي فقط', 'احفظيه في مكان بارد بعيداً عن الضوء'],
        rating: 4.9,
        reviews: 312,
        soldCount: 850
    },
    {
        id: 3,
        name: 'خلطة التنعيم ',
        slug: 'smoothing-oil',
        originalPrice: 220,
        discountPercentage: 32,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761830251/IMG_20251030_161451_vntsdd.png',
        imageAlt: '✨',
        categories: ['hair'],
        tags: ['تنعيم الشعر', 'فرد طبيعي', 'لمعان', 'ضد التجعد'],
        inStock: true,
        featured: true,
        description: 'مزيج سحري من زيوت الأرغان، جوز الهند، والجوجوبا المعصورة على البارد، مصمم خصيصاً لتنعيم الشعر المجعد والتخلص من الهيشان.',
        benefits: [
            'ينعم الشعر المجعد والجاف بفعالية ويقلل التشابك بفضل تغلغله العميق',
            'يمنح الشعر لمعاناً طبيعياً وصحياً دون ترك ملمس دهني ثقيل',
            'يحمي الشعر من الحرارة والتلف والتقصف',
            'يقوي الشعر المتكسر ويزيد من مرونته'
        ],
        ingredients: ['مزيج من زيوت الأرغان، جوز الهند، والجوجوبا - معصورة على البارد'],
        howToUse: 'على شعر رطب أو جاف، ضعي كمية مناسبة على الشعر من الجذور للأطراف. يمكن استخدامه يومياً كـ Leave-in.',
        warnings: ['للاستخدام الخارجي فقط', 'تجنبي ملامسة العينين'],
        rating: 4.8,
        reviews: 289,
        soldCount: 720
    },
    {
        id: 4,
        name: 'خلطة السبع زيوت ',
        slug: 'seven-oils',
        originalPrice: 230,
        discountPercentage: 30,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828523/IMG_20251030_152134_f3zl98.jpg',
        imageAlt: '🌟',
        categories: ['hair', 'hair-growth'],
        tags: ['مزيج سبع زيوت', 'تقوية', 'تطويل', 'كثافة', 'وقف التساقط'],
        inStock: true,
        featured: true,
        description: 'تركيبة مميزة من سبعة زيوت طبيعية معصورة على البارد، صُممت لتكون علاجاً شاملاً لمشاكل التساقط والضعف وبطء النمو.',
        benefits: [
            'يوقف تساقط الشعر ويقوي البصيلات عبر تنشيط الدورة الدموية في فروة الرأس',
            'يحفز نمو الشعر ويزيد من كثافته وسمكه بفضل تضافر الزيوت المغذية',
            'يغذي فروة الرأس ويعالج القشرة والالتهابات',
            'يرطب الشعر بعمق ويمنع التقصف والتكسر'
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
        originalPrice: 200,
        discountPercentage: 40,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144438_m3rxfc.jpg',
        imageAlt: '🥥',
        categories: ['hair', 'skin'],
        tags: ['ترطيب عميق', 'للشعر', 'للبشرة', 'مضاد للفطريات'],
        inStock: true,
        featured: true,
        description: 'زيت جوز الهند البكر المعصور على البارد. يخترق جذع الشعرة والبشرة ليمنحها الترطيب والقوة من الداخل.',
        benefits: [
            'يقلل فقدان البروتين من الشعر بنسبة كبيرة (السبب الرئيسي للضعف والتقصف)',
            'مرطب عميق للبشرة الجافة، ويعالج الهالات السوداء وعلامات التمدد',
            'مضاد للبكتيريا والفطريات طبيعياً (يعالج قشرة الرأس الفطرية)',
            'يساعد في تفتيح وتوحيد لون البشرة في المناطق الداكنة'
        ],
        ingredients: ['زيت جوز الهند البكر 100% - معصور على البارد'],
        howToUse: 'للشعر: دلكي من الجذور حتى الأطراف واتركيه 30 دقيقة. للبشرة: ضعي كمية صغيرة ودلكي برفق كمرطب يومي.',
        warnings: ['للاستخدام الخارجي فقط', 'تجنبي ملامسة العينين'],
        rating: 4.8,
        reviews: 378,
        soldCount: 840
    },
    {
        id: 6,
        name: 'زيت الجوجوبا ',
        slug: 'jojoba-oil',
        originalPrice: 260,
        discountPercentage: 38,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144613_wdw40i.jpg',
        imageAlt: '🌿',
        categories: ['skin', 'hair'],
        tags: ['لا يسد المسام', 'للبشرة الدهنية', 'سريع الامتصاص', 'منظم إفراز الدهون'],
        inStock: true,
        featured: false,
        description: 'زيت الجوجوبا النقي المعصور على البارد. تركيبته تشبه زيت البشرة الطبيعي (الزهم) مما يجعله مثالياً لتنظيم إفراز الدهون.',
        benefits: [
            'ينظم إنتاج الزيوت في البشرة الدهنية ويمنع ظهور حب الشباب',
            'لا يسد المسام (Non-comedogenic) مما يجعله مثاليًا لجميع أنواع البشرة',
            'سريع الامتصاص وغير دهني، ويحسن من مرونة الجلد',
            'يعالج جفاف فروة الرأس وقشرة الشعر ويحافظ على ترطيبه'
        ],
        ingredients: ['زيت الجوجوبا النقي 100% - معصور على البارد'],
        howToUse: 'للبشرة: استخدمي قطرات قليلة كمرطب يومي. للشعر: ضعي على الأطراف لمنع التقصف أو تدليك الفروة لعلاج الجفاف.',
        warnings: ['للاستخدام الخارجي فقط'],
        rating: 4.7,
        reviews: 234,
        soldCount: 560
    },
 {
        id: 7,
        name: 'زيت اللوز الحلو ',
        slug: 'sweet-almond-oil',
        originalPrice: 260,
        discountPercentage: 38,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144344_k2rswm.jpg',
        imageAlt: '🌰',
        categories: ['skin', 'hair', 'anti-aging'],
        tags: ['فيتامين E', 'للبشرة الحساسة', 'مرطب عميق', 'متعدد الاستخدام', 'للشعر والجسم'],
        inStock: true,
        featured: false,
        description: 'زيت اللوز الحلو الطبيعي 100% مشتق من اللوز المعصور. مثالي لتغذية جميع أنواع البشرة والشعر. يُمتص بسهولة ولا يسد المسام، هذا الزيت الطبيعي المغذي للبشرة مثالي للاستخدام على الشعر والجسم بالكامل.',
        benefits: [
            'يحفز نمو الشعر عند تدليك فروة الرأس به بانتظام',
            'يجدد خلايا الجسم والبشرة ويرطبها بعمق بعد الاستحمام',
            'ينظف البشرة من المكياج والرواسب والشوائب ويرطب الشفاه ويملؤها',
            'يفتح الهالات السوداء حول العينين بشكل ملحوظ',
            'يساعد على نمو الأظافر وتقويتها ولمعانها'
        ],
        ingredients: ['زيت اللوز الحلو الطبيعي 100% - معصور على البارد'],
        howToUse: 'للشعر: سخني الزيت لمدة 10 ثواني حتى يصبح دافئاً، ضعي كمية صغيرة على فروة رأسك مع التدليك لتحفيز نمو الشعر. استخدمي مشط لتوزيع الزيت من الجذور إلى أطراف الشعر. غطي شعرك بغطاء بلاستيكي واتركيه لمدة ساعة على الأقل أو طوال الليل واشطفيه صباحاً (يفضل تكراره مرة كل أسبوع). للجسم: يستعمل بعد الاستحمام لترطيب وتجديد خلايا البشرة. للوجه: لتنظيف البشرة من المكياج والرواسب وترطيب الشفاه وتفتيح الهالات. للأظافر: لنمو الأظافر وتقويتها ولمعانها.',
        warnings: ['للاستخدام الخارجي فقط', 'يحفظ بعيداً عن الإضاءة في مكان جاف وبارد', 'مدة صلاحية المنتج تنتهي بعد ثلاث سنوات من فتح العلبة'],
        rating: 4.9,
        reviews: 298,
        soldCount: 670
    },
    {
        id: 8,
        name: 'زيت الروزماري ',
        slug: 'rosemary-oil',
        originalPrice: 280,
        discountPercentage: 39,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144535_dhucwx.jpg',
        imageAlt: '🌿',
        categories: ['hair', 'hair-growth'],
        tags: ['تطويل الشعر', 'منع التساقط', 'تنشيط الدورة الدموية', 'مضاد للقشرة'],
        inStock: true,
        featured: true,
        description: 'زيت الروزماري (إكليل الجبل) الطبيعي المعصور على البارد، الأقوى علمياً في تحفيز نمو الشعر وإيقاف التساقط.',
        benefits: [
            'يحفز نمو الشعر بفعالية مثبتة (مشابه لفعالية المينوكسيديل) ويملأ الفراغات',
            'ينشط الدورة الدموية في فروة الرأس بشكل كبير لتغذية البصيلات الضعيفة',
            'يقوي بصيلات الشعر ويمنع التساقط (بما في ذلك الثعلبة الذكورية)',
            'يعالج قشرة الرأس الفطرية والتهابات الفروة'
        ],
        ingredients: ['زيت الروزماري الطبيعي 100% - معصور على البارد'],
        howToUse: 'دلكي فروة الرأس بحركات دائرية لمدة 5 دقائق، اتركيه ساعتين أو طوال الليل، ثم اغسليه.',
        warnings: ['للاستخدام الخارجي فقط', 'تجنبي استخدامه أثناء الحمل', 'يجب تخفيفه بزيت ناقل للبشرة'],
        rating: 4.9,
        reviews: 412,
        soldCount: 890
    },
    {
        id: 9,
        name: 'زيت الخروع ',
        slug: 'castor-oil',
        originalPrice: 220,
        discountPercentage: 41,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828518/IMG_20251030_144420_xzmh5o.jpg',
        imageAlt: '🌱',
        categories: ['hair-growth', 'hair'],
        tags: ['تكثيف الشعر', 'الرموش والحواجب', 'محفز للنمو', 'حمض الريسينوليك'],
        inStock: true,
        featured: false,
        description: 'زيت الخروع الطبيعي المعصور على البارد من بذور نبات الخروع، الأكثر شهرة في زيادة كثافة وسمك الشعيرات.',
        benefits: [
            'يحفز نمو الشعر وكثافته بشكل ملحوظ بفضل حمض الريسينوليك',
            'يقوي الرموش والحواجب ويزيد كثافتها ويمنع تكسرها',
            'يغلف جذع الشعرة ويمنحها سمكًا إضافيًا، مما يقلل من التقصف',
            'مضاد طبيعي للفطريات والبكتيريا على فروة الرأس'
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
        originalPrice: 300,
        discountPercentage: 40,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144630_df3akw.jpg',
        imageAlt: '🫒',
        categories: ['anti-aging', 'hair', 'skin'],
        tags: [ 'الذهب السائل', 'مكافح للشيخوخة', 'سريع الامتصاص', 'فيتامين E'],
        inStock: true,
        featured: true,
        description: 'زيت الأرغان المغربي الأصلي (الذهب السائل) المعصور على البارد. يمتص بسرعة فائقة بفضل حجمه الجزيئي الصغير.',
        benefits: [
            'أعلى تركيز لفيتامين E يحارب التجاعيد والخطوط الدقيقة بفعالية',
            'يعزز إنتاج الكولاجين الطبيعي ويحسن مرونة الجلد',
            'يرطب الشعر ويمنحه لمعاناً ويحميه من التلف دون ترك ملمس دهني',
            'يعالج حب الشباب لأنه يرطب البشرة دون أن يسد المسام'
        ],
        ingredients: ['زيت الأرغان المغربي الأصلي 100% - معصور على البارد'],
        howToUse: 'للوجه: ضعي 2-3 قطرات مساءً على بشرة نظيفة. للشعر: استخدمي كـ Leave-in على أطراف الشعر أو كماسك أسبوعي.',
        warnings: ['للاستخدام الخارجي فقط', 'احفظيه في مكان بارد بعيداً عن الضوء'],
        rating: 4.9,
        reviews: 389,
        soldCount: 810
    },
    {
        id: 11,
        name: 'زيت الجرجير ',
        slug: 'watercress-oil',
        originalPrice: 250,
        discountPercentage: 40,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828517/IMG_20251030_144554_gicdez.jpg',
        imageAlt: '🥬',
        categories: ['hair', 'hair-growth'],
        tags: ['تطويل الشعر', 'منع التساقط', 'تغذية عميقة', 'انبات الفراغات'],
        inStock: true,
        featured: false,
        description: 'زيت الجرجير الطبيعي المعصور على البارد، غني بالفيتامينات والمعادن (كالحديد والزنك والكبريت) الضرورية لنمو الشعر.',
        benefits: [
            'يحفز نمو الشعر ويزيد طوله بسرعة ويساهم في إنبات الشعر في الفراغات',
            'يمنع تساقط الشعر ويقوي الجذور بفضل تنشيط الدورة الدموية',
            'يعالج التهابات فروة الرأس والقشرة',
            'يغذي الشعر ويمنحه مظهراً لامعاً وصحياً'
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
        originalPrice: 270,
        discountPercentage: 41,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144514_xvbrey.jpg',
        imageAlt: '🌳',
        categories: ['skin', 'hair'],
        tags: ['مضاد للبكتيريا', 'علاج حب الشباب', 'مطهر طبيعي', 'علاج القشرة الفطرية'],
        inStock: true,
        featured: true,
        description: 'زيت شجرة الشاي النقي المعصور على البارد، يُعرف بـ "صيدلية الطبيعة" لخصائصه المضادة للبكتيريا والفطريات والفيروسات.',
        benefits: [
            'يعالج حب الشباب والبثور بفعالية ويقلل التورم والالتهاب',
            'مطهر قوي ينقي البشرة ويطهرها طبيعياً',
            'يعالج قشرة الرأس الفطرية والتهابات فروة الرأس والحكة',
            'يمكن استخدامه لعلاج العدوى الفطرية في الأظافر والقدمين (Tinea)'
        ],
        ingredients: ['زيت شجرة الشاي النقي 100% - معصور على البارد'],
        howToUse: 'للبشرة: خففي قطرة واحدة بزيت ناقل وضعيها على المنطقة المصابة. للشعر: أضيفي قطرات للشامبو.',
        warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه قبل الاستخدام (قوي جداً)', 'تجنبي البلع', 'قد يسبب حساسية'],
        rating: 4.8,
        reviews: 301,
        soldCount: 690
    },
    {
        id: 13,
        name: 'زيت اللافندر ',
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
        description: 'زيت اللافندر النقي المعصور على البارد، بخصائصه المهدئة المذهلة ورائحته العطرة، مثالي للاسترخاء وتحسين جودة النوم.',
        benefits: [
            'يساعد على الاسترخاء العميق ويقلل التوتر والقلق ويعالج الأرق',
            'مهدئ قوي للأعصاب ومخفف للصداع النصفي (يستخدم في العلاج العطري)',
            'يعالج حروق الشمس والالتهابات الجلدية ولسعات الحشرات',
            'يحفز نمو الشعر ويمنع التساقط عند استخدامه على فروة الرأس'
        ],
        ingredients: ['زيت اللافندر النقي 100% - معصور على البارد'],
        howToUse: 'للاسترخاء: ضعي قطرات على الوسادة أو في موزع الزيوت. للبشرة: خففيه بزيت ناقل. للشعر: أضيفيه للشامبو.',
        warnings: ['للاستخدام الخارجي فقط'],
            warnings: ['للاستخدام الخارجي فقط', 'يجب تخفيفه قبل وضعه على البشرة'],
        rating: 4.8,
        reviews: 278,
        soldCount: 640
    },
    {
        id: 14,
        name: 'زيت بذور اليقطين ',
        slug: 'pumpkin-seed-oil',
        originalPrice: 280,
        discountPercentage: 39,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828520/IMG_20251030_144248_hw9lrv.jpg',
        imageAlt: '🎃',
        categories: ['hair', 'hair-growth'],
        tags: ['منع الصلع', 'تقوية الشعر', 'غني بالزنك', 'تنظيم DHT'],
        inStock: true,
        featured: true,
        description: 'زيت بذور اليقطين الطبيعي المعصور على البارد، معروف بقدرته على محاربة الصلع الوراثي عبر تثبيط هرمون DHT.',
        benefits: [
            'يحارب الصلع الوراثي والترقق بفعالية مثبتة علمياً',
            'ينظم إفراز هرمون DHT المسبب للصلع لدى الذكور والإناث',
            'غني بالزنك والأحماض الدهنية الضرورية لتقوية بصيلات الشعر',
            'يقلل التساقط ويزيد من سمك وكثافة خصلات الشعر'
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
        originalPrice: 230,
        discountPercentage: 39,
        size: BOTTLE_SIZES.medium,
        image: 'https://res.cloudinary.com/dl9rygqx6/image/upload/v1761828519/IMG_20251030_144458_eqbrgi.jpg',
        imageAlt: '🌾',
        categories: ['skin', 'hair'],
        tags: ['تدليك', 'تغذية عميقة', 'مضاد للأكسدة', 'علاج الجفاف'],
        inStock: true,
        featured: false,
        description: 'زيت السمسم الطبيعي المعصور على البارد، غني بالفيتامينات (كفيتامين E) والسيسامول المضاد للأكسدة.',
        benefits: [
            'يعالج الجفاف الشديد في البشرة وممتاز للتدليك والترطيب الشتوي',
            'يحارب علامات شيخوخة البشرة المبكرة مثل التجاعيد والخطوط الدقيقة',
            'يساعد في تفتيح ندبات حب الشباب والبقع الداكنة',
            'يحمي الشعر من أضرار الشمس والعوامل البيئية ويعزز صحة فروة الرأس'
        ],
        ingredients: ['زيت السمسم الطبيعي 100% - معصور على البارد'],
        howToUse: 'للتدليك: دلكي الجسم بحركات دائرية. للشعر: استخدميه كحمام زيت أسبوعي أو لتدليك الفروة.',
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