import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

const FAQPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      category: 'عن المنتجات',
      questions: [
        {
          q: 'هل الزيوت طبيعية 100%؟',
          a: 'نعم، جميع زيوتنا طبيعية 100% ومعصورة على البارد للحفاظ على جميع الفيتامينات والمعادن الطبيعية دون استخدام أي مواد كيميائية أو إضافات.'
        },
        {
          q: 'ما هو الفرق بين الزيت المعصور على البارد والعادي؟',
          a: 'الزيوت المعصورة على البارد يتم استخلاصها بدون حرارة عالية، مما يحافظ على جميع الفوائد والفيتامينات الطبيعية. الزيوت العادية قد تفقد بعض فوائدها بسبب الحرارة المستخدمة في الاستخلاص.'
        },
        {
          q: 'كم مدة صلاحية المنتجات؟',
          a: 'مدة صلاحية زيوتنا تتراوح بين 12-24 شهر حسب نوع الزيت. نوصي بالاحتفاظ بها في مكان بارد ومظلم وإغلاق العبوة جيداً بعد كل استخدام.'
        },
        {
          q: 'هل المنتجات آمنة للأطفال والحوامل؟',
          a: 'معظم زيوتنا آمنة، لكن نوصي دائماً باستشارة الطبيب قبل استخدام أي زيت أثناء الحمل أو للأطفال تحت 3 سنوات. بعض الزيوت العطرية المركزة (مثل اللافندر والروزماري) يجب تجنبها أثناء الحمل.'
        },
        {
          q: 'هل يمكن استخدام الزيوت للطعام؟',
          a: 'زيت الزيتون البكر فقط هو المناسب للطعام. باقي الزيوت مخصصة للاستخدام الخارجي على الشعر والبشرة فقط.'
        }
      ]
    },
    {
      category: 'الاستخدام',
      questions: [
        {
          q: 'كيف أستخدم الزيوت على الشعر؟',
          a: 'ضعي كمية مناسبة من الزيت على راحة يدك، دلكي فروة الرأس بحركات دائرية لطيفة، ثم وزعيه على طول الشعر. اتركيه من 30 دقيقة إلى ليلة كاملة حسب حالة شعرك، ثم اغسليه بالشامبو.'
        },
        {
          q: 'كم مرة أستخدم الزيت في الأسبوع؟',
          a: 'للشعر العادي: 1-2 مرة أسبوعياً. للشعر الجاف جداً: 2-3 مرات. للبشرة: يومياً كمرطب أو حسب الحاجة.'
        },
        {
          q: 'هل يمكن خلط أكثر من زيت معاً؟',
          a: 'نعم بالتأكيد! خلط الزيوت يعطي فوائد مضاعفة. مثلاً: زيت جوز الهند + زيت الخروع = مزيج ممتاز لتحفيز نمو الشعر.'
        },
        {
          q: 'الزيت دهني على شعري، ما الحل؟',
          a: 'استخدمي كمية أقل، أو اغسلي شعرك بالشامبو مرتين. يمكنك أيضاً تخفيف الزيت بإضافة قليل من الماء أو استخدامه على الأطراف فقط بدل الجذور.'
        },
        {
          q: 'هل يمكن استخدام الزيت على البشرة الدهنية؟',
          a: 'نعم! زيت الجوجوبا مثالي للبشرة الدهنية لأنه ينظم إفراز الزيوت ولا يسد المسام. استخدمي كمية قليلة جداً.'
        }
      ]
    },
    {
      category: 'الشحن والتوصيل',
      questions: [
        {
          q: 'كم تكلفة الشحن؟',
          a: `الشحن ${SITE_CONFIG.shipping.standardShipping} جنيه لجميع المحافظات. الشحن مجاني للطلبات أكثر من ${SITE_CONFIG.shipping.freeShippingThreshold} جنيه.`
        },
        {
          q: 'كم مدة التوصيل؟',
          a: 'القاهرة والجيزة: 1-2 يوم عمل. باقي المحافظات: 2-4 أيام عمل. نبعت المنتجات خلال 24 ساعة من تأكيد الطلب.'
        },
        {
          q: 'هل تشحنون لجميع المحافظات؟',
          a: 'نعم، نوصل لجميع محافظات مصر عبر شركات الشحن الموثوقة.'
        },
        {
          q: 'كيف أتابع طلبي؟',
          a: 'بعد شحن الطلب، سنرسل لك رابط التتبع على واتساب لمتابعة الشحنة لحظة بلحظة.'
        },
        {
          q: 'ماذا لو لم أجد أحد عند التوصيل؟',
          a: 'سيحاول المندوب الاتصال بك. إذا لم يرد أحد، سيتم إعادة المحاولة في اليوم التالي أو حسب الاتفاق.'
        }
      ]
    },
    {
      category: 'الدفع والاسترجاع',
      questions: [
        {
          q: 'ما هي طرق الدفع المتاحة؟',
          a: 'نعمل بنظام الدفع عند الاستلام (Cash on Delivery). ادفع فقط عند استلام المنتج وفحصه.'
        },
        {
          q: 'هل يمكن إرجاع أو استبدال المنتج؟',
          a: 'نعم، يمكن الاسترجاع أو الاستبدال خلال 7 أيام من الاستلام إذا كان المنتج مغلق ولم يستخدم. يتحمل العميل تكلفة الشحن في حالة الاسترجاع بدون عيب في المنتج.'
        },
        {
          q: 'ماذا لو وصل المنتج تالف؟',
          a: 'في حالة وصول المنتج تالف أو مكسور، اتصل بنا فوراً على واتساب وسنستبدله مجاناً أو نسترجع المبلغ كاملاً.'
        },
        {
          q: 'هل يمكن إلغاء الطلب؟',
          a: 'نعم، يمكن إلغاء الطلب قبل الشحن بدون أي تكلفة. بعد الشحن، يمكن رفض الاستلام لكن قد تخصم تكلفة الشحن.'
        }
      ]
    },
    {
      category: 'العروض والخصومات',
      questions: [
        {
          q: 'هل لديكم عروض دائمة؟',
          a: 'نعم، نقدم باقات مخفضة (Bundle Offers) بشكل دائم. كما نعلن عن عروض موسمية على صفحاتنا على السوشيال ميديا.'
        },
        {
          q: 'كيف أحصل على كود خصم؟',
          a: 'تابعنا على Facebook وInstagram وTikTok للحصول على أكواد خصم حصرية. كما نرسل عروض خاصة لعملائنا عبر واتساب.'
        },
        {
          q: 'هل يوجد خصم للكميات؟',
          a: 'نعم، عند شراء 3 منتجات أو أكثر تحصل على خصم تلقائي. اختر باقاتنا الجاهزة للحصول على أفضل سعر.'
        }
      ]
    },
    {
      category: 'أسئلة عامة',
      questions: [
        {
          q: 'هل لديكم فروع؟',
          a: 'حالياً نعمل أونلاين فقط، مما يسمح لنا بتقديم أفضل الأسعار من خلال التوفير في تكاليف الفروع.'
        },
        {
          q: 'كيف أتواصل معكم؟',
          a: `يمكنك التواصل معنا عبر:\n- واتساب: ${SITE_CONFIG.phone}\n- الموبايل: ${SITE_CONFIG.phone}\n- البريد الإلكتروني: ${SITE_CONFIG.email}\n- صفحاتنا على السوشيال ميديا`
        },
        {
          q: 'هل المنتجات أصلية ومضمونة؟',
          a: 'نعم، جميع منتجاتنا طبيعية 100% ومن مصادر موثوقة. نضمن جودة كل منتج نبيعه.'
        },
        {
          q: 'ما الفرق بينكم وبين المنافسين؟',
          a: 'نحن نقدم:\n1. زيوت معصورة على البارد (أعلى جودة)\n2. أسعار منافسة بدون وسطاء\n3. شحن سريع وخدمة عملاء ممتازة\n4. ضمان الجودة والاسترجاع'
        }
      ]
    }
  ];

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  let questionCounter = 0;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <HelpCircle size={60} className="mx-auto text-green-600 mb-4" />
          <h1 className="text-4xl md:text-5xl font-bold text-green-600 mb-4">الأسئلة الشائعة</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            إجابات لأكثر الأسئلة شيوعاً عن منتجاتنا وخدماتنا
          </p>
        </div>

        {/* FAQ Sections */}
        <div className="max-w-4xl mx-auto space-y-8">
          {faqs.map((category, catIndex) => (
            <div key={catIndex} className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 border-b-2 border-green-600 pb-3">
                {category.category}
              </h2>
              
              <div className="space-y-3">
                {category.questions.map((faq, qIndex) => {
                  const currentIndex = questionCounter++;
                  const isOpen = openIndex === currentIndex;
                  
                  return (
                    <div 
                      key={qIndex}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:border-green-300 transition-colors"
                    >
                      <button
                        onClick={() => toggleQuestion(currentIndex)}
                        className="w-full flex items-center justify-between p-4 md:p-5 bg-gray-50 hover:bg-gray-100 transition-colors text-right"
                      >
                        <span className="font-bold text-gray-800 text-base md:text-lg flex-1 pl-4">
                          {faq.q}
                        </span>
                        {isOpen ? (
                          <ChevronUp size={24} className="text-green-600 flex-shrink-0" />
                        ) : (
                          <ChevronDown size={24} className="text-gray-400 flex-shrink-0" />
                        )}
                      </button>
                      
                      {isOpen && (
                        <div className="p-4 md:p-5 bg-white border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm md:text-base">
                            {faq.a}
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="max-w-4xl mx-auto mt-12 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl p-6 md:p-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">لم تجد إجابة لسؤالك؟</h3>
          <p className="text-lg md:text-xl mb-6 opacity-90">
            فريقنا جاهز لمساعدتك في أي وقت
          </p>
          <a
            href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=مرحباً، لدي سؤال عن المنتجات`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-white text-green-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors text-sm md:text-base"
          >
            <MessageCircle size={20} />
            تواصل معنا على واتساب
          </a>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;