import React, { useState } from 'react';
import { Shield, Truck, RefreshCw, Lock, FileText } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState('return');

  const tabs = [
    { id: 'return', label: 'الاسترجاع والاستبدال', icon: RefreshCw },
    { id: 'shipping', label: 'الشحن والتوصيل', icon: Truck },
    { id: 'privacy', label: 'الخصوصية', icon: Lock },
    { id: 'terms', label: 'الشروط والأحكام', icon: FileText }
  ];

  const policies = {
    return: {
      title: 'سياسة الاسترجاع والاستبدال',
      icon: RefreshCw,
      content: [
        {
          subtitle: 'حقك في الاسترجاع',
          points: [
            'يمكنك إرجاع أو استبدال أي منتج خلال 7 أيام من تاريخ الاستلام',
            'يجب أن يكون المنتج في حالته الأصلية، مغلق ولم يستخدم',
            'يجب الاحتفاظ بالعبوة الأصلية والفاتورة',
            'المنتجات المفتوحة أو المستخدمة لا يمكن استرجاعها لأسباب صحية'
          ]
        },
        {
          subtitle: 'حالات الاسترجاع المجاني',
          points: [
            'المنتج وصل تالف أو مكسور',
            'المنتج غير مطابق للمواصفات المذكورة',
            'خطأ في الشحن (وصل منتج مختلف عن طلبك)',
            'في هذه الحالات نتحمل نحن تكلفة الشحن كاملة'
          ]
        },
        {
          subtitle: 'إجراءات الاسترجاع',
          points: [
            `تواصل معنا على واتساب ${SITE_CONFIG.phone} خلال 7 أيام`,
            'أرسل صور للمنتج والعبوة',
            'سنرسل لك رابط التسليم لشركة الشحن',
            'بعد فحص المنتج، سنسترجع المبلغ أو نستبدله خلال 3-5 أيام عمل'
          ]
        },
        {
          subtitle: 'استرداد الأموال',
          points: [
            'يتم الاسترداد بنفس طريقة الدفع',
            'الدفع عند الاستلام: سيتم التحويل عبر فودافون كاش أو إيمان',
            'مدة الاسترداد: 3-7 أيام عمل من تاريخ استلام المنتج المرتجع',
            'تكلفة الشحن غير قابلة للاسترداد في حالة الإرجاع بدون عيب'
          ]
        }
      ]
    },
    shipping: {
      title: 'سياسة الشحن والتوصيل',
      icon: Truck,
      content: [
        {
          subtitle: 'مناطق التوصيل',
          points: [
            'نوصل لجميع محافظات جمهورية مصر العربية',
            'نعمل مع أفضل شركات الشحن الموثوقة',
            'التوصيل حتى باب المنزل أو العنوان المحدد'
          ]
        },
        {
          subtitle: 'تكلفة الشحن',
          points: [
            `تكلفة الشحن: ${SITE_CONFIG.shipping.standardShipping} جنيه لجميع المحافظات`,
            `شحن مجاني للطلبات أكثر من ${SITE_CONFIG.shipping.freeShippingThreshold} جنيه`,
            'يتم احتساب تكلفة الشحن عند إتمام الطلب',
            'في حالة العروض الخاصة، قد نقدم شحن مجاني إضافي'
          ]
        },
        {
          subtitle: 'مدة التوصيل',
          points: [
            'القاهرة والجيزة: 1-2 يوم عمل',
            'الإسكندرية والدلتا: 2-3 أيام عمل',
            'باقي المحافظات: 3-5 أيام عمل',
            'يتم الشحن خلال 24 ساعة من تأكيد الطلب',
            'قد تختلف المدة في المواسم والأعياد'
          ]
        },
        {
          subtitle: 'تتبع الشحنة',
          points: [
            'سنرسل لك رقم الشحنة على واتساب فور الشحن',
            'يمكنك تتبع الشحنة لحظة بلحظة عبر رابط التتبع',
            'سيتصل بك المندوب قبل التوصيل',
            'في حالة عدم الرد، سيحاول مرة أخرى أو حسب الاتفاق'
          ]
        },
        {
          subtitle: 'شروط التسليم',
          points: [
            'يجب فحص المنتج أمام المندوب قبل الدفع',
            'في حالة وجود تلف أو كسر، لا تستلم المنتج واتصل بنا فوراً',
            'المندوب غير مسموح له بفتح المنتجات',
            'الدفع نقداً فقط عند الاستلام (Cash on Delivery)'
          ]
        }
      ]
    },
    privacy: {
      title: 'سياسة الخصوصية وحماية البيانات',
      icon: Lock,
      content: [
        {
          subtitle: 'البيانات التي نجمعها',
          points: [
            'الاسم الكامل لإتمام عملية الشحن',
            'رقم الهاتف للتواصل وتأكيد الطلب',
            'العنوان بالتفصيل لتوصيل المنتجات',
            'لا نجمع بيانات بطاقات ائتمان (نعمل بالدفع عند الاستلام)'
          ]
        },
        {
          subtitle: 'كيف نستخدم بياناتك',
          points: [
            'لإتمام طلبك وتوصيل المنتجات',
            'للتواصل معك بخصوص الطلب',
            'لإرسال عروض خاصة (يمكنك إلغاء الاشتراك في أي وقت)',
            'لتحسين خدماتنا وتجربة التسوق'
          ]
        },
        {
          subtitle: 'حماية بياناتك',
          points: [
            'لا نشارك بياناتك مع أي طرف ثالث إلا شركات الشحن',
            'نحمي بياناتك بأحدث أنظمة الأمان',
            'بياناتك محفوظة بسرية تامة',
            'يمكنك طلب حذف بياناتك في أي وقت'
          ]
        },
        {
          subtitle: 'ملفات الارتباط (Cookies)',
          points: [
            'نستخدم cookies لتحسين تجربة التصفح',
            'لا نستخدمها لجمع معلومات شخصية',
            'يمكنك تعطيلها من إعدادات المتصفح',
            'تساعدنا في تذكر تفضيلاتك وسلة التسوق'
          ]
        },
        {
          subtitle: 'حقوقك',
          points: [
            'يحق لك الوصول لبياناتك في أي وقت',
            'يحق لك تعديل أو حذف بياناتك',
            'يحق لك إلغاء الاشتراك في القوائم البريدية',
            `للاستفسارات: ${SITE_CONFIG.email}`
          ]
        }
      ]
    },
    terms: {
      title: 'الشروط والأحكام',
      icon: FileText,
      content: [
        {
          subtitle: 'القبول بالشروط',
          points: [
            'باستخدامك للموقع، أنت توافق على هذه الشروط',
            'نحتفظ بالحق في تعديل الشروط في أي وقت',
            'استمرارك في استخدام الموقع يعني قبولك للشروط المحدثة',
            'يجب قراءة الشروط بعناية قبل الشراء'
          ]
        },
        {
          subtitle: 'استخدام الموقع',
          points: [
            'يجب أن تكون فوق 18 عاماً للشراء',
            'يجب تقديم معلومات صحيحة ودقيقة',
            'يُمنع استخدام الموقع لأغراض غير قانونية',
            'نحتفظ بحق رفض أي طلب دون إبداء الأسباب'
          ]
        },
        {
          subtitle: 'الأسعار والطلبات',
          points: [
            'جميع الأسعار بالجنيه المصري وتشمل الضرائب',
            'الأسعار قابلة للتغيير دون إشعار مسبق',
            'السعر المعروض وقت الطلب هو السعر المعتمد',
            'نحتفظ بحق إلغاء الطلب في حالة خطأ في السعر'
          ]
        },
        {
          subtitle: 'ضمان الجودة',
          points: [
            'جميع منتجاتنا طبيعية 100% ومعصورة على البارد',
            'نضمن جودة المنتجات وحصولك على منتج أصلي',
            'في حالة وجود مشكلة، يمكن الاسترجاع حسب السياسة',
            'لا نضمن نتائج محددة لأن التأثير يختلف من شخص لآخر'
          ]
        },
        {
          subtitle: 'المسؤولية',
          points: [
            'المنتجات للاستخدام الخارجي فقط (إلا ما ذُكر)',
            'يجب إجراء اختبار حساسية قبل الاستخدام الكامل',
            'استشر طبيبك قبل الاستخدام أثناء الحمل',
            'غير مسؤولين عن سوء الاستخدام أو الحساسية'
          ]
        },
        {
          subtitle: 'حقوق الملكية الفكرية',
          points: [
            'جميع محتويات الموقع محمية بحقوق النشر',
            'الشعار والعلامة التجارية مملوكة لنا',
            'يُمنع استخدام المحتوى دون إذن كتابي',
            'يمكن مشاركة المنتجات على السوشيال ميديا'
          ]
        },
        {
          subtitle: 'القانون الحاكم',
          points: [
            'هذه الشروط تخضع لقوانين جمهورية مصر العربية',
            'أي نزاع يتم حله ودياً أو عبر المحاكم المصرية',
            'يحق لنا اتخاذ الإجراءات القانونية عند الحاجة'
          ]
        }
      ]
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Shield size={60} className="mx-auto text-green-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">السياسات والشروط</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            نلتزم بالشفافية الكاملة معك. اقرأ سياساتنا لمعرفة حقوقك وواجباتك
          </p>
        </div>

        {/* Tabs */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="grid grid-cols-2 md:flex md:flex-wrap gap-2 md:gap-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 px-3 md:px-6 py-3 rounded-lg font-bold transition-all text-sm md:text-base ${
                  activeTab === tab.id
                    ? 'bg-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
              >
                <tab.icon size={18} className="hidden md:block" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-10">
            <div className="flex items-center gap-3 mb-8">
              {React.createElement(policies[activeTab].icon, { size: 40, className: "text-green-600" })}
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
                {policies[activeTab].title}
              </h2>
            </div>

            <div className="space-y-8">
              {policies[activeTab].content.map((section, index) => (
                <div key={index} className="border-r-4 border-green-600 pr-4 md:pr-6">
                  <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-4">
                    {section.subtitle}
                  </h3>
                  <ul className="space-y-3">
                    {section.points.map((point, pIndex) => (
                      <li key={pIndex} className="flex items-start gap-3">
                        <span className="text-green-600 font-bold text-lg mt-1">•</span>
                        <span className="text-gray-700 leading-relaxed text-sm md:text-base">{point}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* Contact Footer */}
            <div className="mt-10 pt-8 border-t-2 border-gray-200">
              <div className="bg-green-50 rounded-lg p-4 md:p-6">
                <p className="text-gray-700 text-center mb-4 text-sm md:text-base">
                  <strong className="text-green-600">لديك استفسار؟</strong> تواصل معنا وسنجيب على جميع أسئلتك
                </p>
                <div className="flex flex-col sm:flex-row gap-3 justify-center text-sm md:text-base">
                  <a
                    href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                    className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors text-center"
                  >
                    واتساب: {SITE_CONFIG.phone}
                  </a>
                  <a
                    href={`mailto:${SITE_CONFIG.email}`}
                    className="bg-white border-2 border-green-600 text-green-600 px-6 py-3 rounded-lg hover:bg-green-50 transition-colors text-center"
                  >
                    {SITE_CONFIG.email}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Last Updated */}
        <p className="text-center text-gray-500 text-sm mt-8">
          آخر تحديث: ديسمبر 2024
        </p>
      </div>
    </div>
  );
};

export default PoliciesPage;