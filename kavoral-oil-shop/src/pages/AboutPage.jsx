import React from 'react';
import { 
  Leaf, Shield, Award, Users, Heart, Star, Sparkles, 
  TrendingUp, ThumbsUp, Package, Clock, CheckCircle 
} from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

const AboutPage = () => {
  const features = [
    {
      icon: Leaf,
      title: 'زيوت معصورة على البارد',
      description: 'نستخدم تقنية العصر البارد للحفاظ على جميع الفيتامينات والمعادن الطبيعية دون تعريضها للحرارة',
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      icon: Award,
      title: 'أعلى جودة في السوق',
      description: 'نختار المواد الخام بعناية فائقة من أفضل المصادر العالمية لضمان النقاء والفعالية',
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50'
    },
    {
      icon: TrendingUp,
      title: 'أفضل سعر',
      description: 'نقدم أسعار تنافسية بدون التضحية بالجودة، لأننا نؤمن أن الجودة حق للجميع',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      icon: Shield,
      title: 'منتجات آمنة ومعتمدة',
      description: 'جميع منتجاتنا خالية من المواد الكيميائية الضارة ومعتمدة من جهات دولية متخصصة',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'الشغف بالطبيعة',
      description: 'نؤمن بقوة الطبيعة في تقديم أفضل الحلول للعناية بالجمال'
    },
    {
      icon: Users,
      title: 'رضا العملاء أولاً',
      description: 'سعادتك وثقتك هي هدفنا الأول في كل منتج نقدمه'
    },
    {
      icon: Star,
      title: 'الشفافية والمصداقية',
      description: 'نوضح مكونات كل منتج بشفافية تامة دون إخفاء أي معلومة'
    },
    {
      icon: Sparkles,
      title: 'التطور المستمر',
      description: 'نبحث دائماً عن الأفضل لنقدم لك منتجات بأعلى معايير الجودة'
    }
  ];

  const stats = [
    { number: '5+', label: 'سنوات خبرة', icon: Clock },
    { number: '5000+', label: 'عميل راضي', icon: Users },
    { number: '15+', label: 'منتج طبيعي', icon: Package },
    { number: '98%', label: 'رضا العملاء', icon: ThumbsUp }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6 flex justify-center">
              <img 
                src="/logo.png" 
                alt="Kavoral Logo"
                className="w-32 h-32 object-contain animate-pulse"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <div className="w-32 h-32 hidden items-center justify-center text-8xl">🌿</div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-2xl mb-4 opacity-90">
              {SITE_CONFIG.tagline}
            </p>
            <div className="w-24 h-1 bg-yellow-400 mx-auto rounded-full"></div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">قصتنا</h2>
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed text-center">
              <p className="text-xl mb-6">
                بدأت رحلتنا من إيمان عميق بأن الطبيعة تحمل أسرار الجمال الحقيقي. في عالم مليء بالمواد الكيميائية، 
                قررنا أن نعود للأصل ونقدم لك الزيوت الطبيعية النقية بأفضل صورة ممكنة.
              </p>
              <p className="text-xl mb-6">
                نحن في <strong className="text-green-600">{SITE_CONFIG.name}</strong> نفخر بتقديم أجود أنواع الزيوت الطبيعية 
                المعصورة على البارد، مع الحفاظ على جميع فوائدها الطبيعية دون أي إضافات كيميائية.
              </p>
              <p className="text-xl">
                هدفنا ليس فقط بيع منتجات، بل بناء علاقة ثقة معك من خلال تقديم أعلى جودة بأفضل سعر في السوق.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">ما يميزنا</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">نحن لا نبيع زيوت، نحن نقدم تجربة عناية طبيعية متكاملة</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
              >
                <div className={`${feature.bgColor} p-6 group-hover:scale-105 transition-transform`}>
                  <feature.icon size={56} className={`${feature.color} mb-4`} />
                  <h3 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">أرقامنا تتحدث</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="bg-white bg-opacity-20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon size={40} />
                </div>
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">قيمنا ومبادئنا</h2>
          <p className="text-center text-gray-600 mb-12 text-lg">المبادئ التي نعمل بها كل يوم</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 text-center"
              >
                <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon size={32} className="text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">لماذا تختارنا؟</h2>
            
            <div className="space-y-6">
              {[
                {
                  title: 'نقاء 100%',
                  description: 'جميع زيوتنا طبيعية نقية بدون أي إضافات أو مواد كيميائية'
                },
                {
                  title: 'العصر البارد',
                  description: 'نستخدم تقنية العصر البارد للحفاظ على جميع الفوائد الطبيعية'
                },
                {
                  title: 'أسعار عادلة',
                  description: 'نقدم أفضل جودة بأسعار منافسة لأننا نؤمن أن الجودة حق للجميع'
                },
                {
                  title: 'خدمة عملاء مميزة',
                  description: 'فريقنا متواجد دائماً لمساعدتك واختيار المنتج المناسب لاحتياجاتك'
                },
                {
                  title: 'توصيل سريع',
                  description: 'نوصل طلبك في أسرع وقت ممكن مع الحفاظ على جودة المنتج'
                },
                {
                  title: 'ضمان الجودة',
                  description: 'نضمن لك جودة منتجاتنا ونستقبل ملاحظاتك بكل شفافية'
                }
              ].map((reason, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
                  <div className="bg-green-100 rounded-full p-3 flex-shrink-0">
                    <CheckCircle size={24} className="text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">{reason.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{reason.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">ابدأ رحلتك مع الطبيعة اليوم</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            اكتشف مجموعتنا الكاملة من الزيوت الطبيعية واختر ما يناسب احتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-8 py-4 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg inline-block"
            >
              تواصل معنا الآن
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors"
            >
              تصفح المنتجات
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;