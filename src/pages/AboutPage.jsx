import React from 'react';
import { 
  Leaf, Shield, Award, Heart, Users, Clock, MessageCircle, Phone
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';

const AboutPage = () => {
  const features = [
    {
      icon: Leaf,
      title: 'طبيعي 100%',
      description: 'زيوت معصورة على البارد بطريقة طبيعية',
    },
    {
      icon: Shield,
      title: 'جودة مضمونة',
      description: 'نختار أفضل المواد الخام من مصادر موثوقة',
    },
    {
      icon: Award,
      title: 'معتمد عالمياً',
      description: 'شهادات جودة من هيئات عالمية',
    },
    {
      icon: Heart,
      title: 'صحة أفضل',
      description: 'منتجات تعزز صحتك ورفاهيتك',
    },
  ];

  const stats = [
    { number: `${SITE_CONFIG.company.yearsOfExperience}+`, label: 'سنوات خبرة', icon: Clock },
    { number: `${SITE_CONFIG.company.customersCount}+`, label: 'عميل راضي', icon: Users },
    { number: `${SITE_CONFIG.company.productsCount}+`, label: 'منتج طبيعي', icon: Leaf },
    { number: `${SITE_CONFIG.company.satisfactionRate}%`, label: 'رضا العملاء', icon: Heart },
  ];

  const values = [
    { icon: Heart, title: 'الشغف بالطبيعة', description: 'نؤمن بقوة الطبيعة' },
    { icon: Users, title: 'رضا العملاء أولاً', description: 'سعادتك هي هدفنا' },
    { icon: Shield, title: 'الشفافية', description: 'نوضح مكونات كل منتج' },
    { icon: Award, title: 'التطور المستمر', description: 'نبحث دائماً عن الأفضل' },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-green-500 to-green-600 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <div className="mb-6">
            <img 
              src="/logo.png192" 
              alt={SITE_CONFIG.name}
              className="w-24 h-24 mx-auto object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <div className="text-6xl hidden">🌿</div>
          </div>
          
          <h1 className="text-5xl font-bold mb-4">
            {SITE_CONFIG.name}
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            {SITE_CONFIG.tagline}
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-green-600 font-semibold text-sm mb-3 block">📖 قصتنا</span>
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              رحلتنا مع الطبيعة
            </h2>
            
            <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
              <p className="bg-green-50 border border-green-100 p-6 rounded-xl">
                بدأت رحلتنا من إيمان عميق بأن الطبيعة تحمل أسرار الجمال الحقيقي. 
                في عالم مليء بالمواد الكيميائية، قررنا أن نعود للأصل ونقدم لك الزيوت 
                الطبيعية النقية بأفضل صورة ممكنة.
              </p>
              
              <p>
                نحن في <strong className="text-green-600">{SITE_CONFIG.name}</strong> نفخر بتقديم 
                أجود أنواع الزيوت الطبيعية المعصورة على البارد، مع الحفاظ على جميع فوائدها 
                الطبيعية دون أي إضافات كيميائية.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">أرقامنا تتحدث</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white/10 backdrop-blur-sm w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={28} />
                </div>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm mb-3 block">✨ ما يميزنا</span>
            <h2 className="text-4xl font-bold text-gray-800">
              لماذا نحن الخيار الأفضل؟
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 p-6 rounded-xl hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <feature.icon size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-center">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm mb-3 block">💚 قيمنا</span>
            <h2 className="text-4xl font-bold text-gray-800">
              المبادئ التي نعمل بها
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-white border border-gray-100 p-6 rounded-xl text-center hover:shadow-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <value.icon size={28} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-green-600 font-semibold text-sm mb-3 block">🎯 اختيارك الذكي</span>
              <h2 className="text-4xl font-bold text-gray-800">لماذا تختارنا؟</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { icon: '✨', title: 'نقاء 100%', description: 'جميع زيوتنا طبيعية نقية بدون إضافات' },
                { icon: '❄️', title: 'العصر البارد', description: 'نستخدم تقنية العصر البارد' },
                { icon: '💰', title: 'أسعار عادلة', description: 'أفضل جودة بأسعار منافسة' },
                { icon: '🎯', title: 'خدمة مميزة', description: 'فريقنا متواجد دائماً لمساعدتك' },
                { icon: '🚀', title: 'توصيل سريع', description: 'نوصل طلبك في أسرع وقت' },
                { icon: '🛡️', title: 'ضمان الجودة', description: 'نضمن لك جودة منتجاتنا' },
              ].map((reason, index) => (
                <div key={index} className="flex items-start gap-3 bg-gray-50 border border-gray-100 p-4 rounded-xl hover:shadow-md transition-shadow">
                  <div className="text-3xl">{reason.icon}</div>
                  <div>
                    <h3 className="font-bold text-gray-800 mb-1">{reason.title}</h3>
                    <p className="text-gray-600 text-sm">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">
            ابدأ رحلتك مع الطبيعة اليوم
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            اكتشف مجموعتنا الكاملة من الزيوت الطبيعية واختر ما يناسبك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <span>تواصل معنا</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              <span>اتصل الآن</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;