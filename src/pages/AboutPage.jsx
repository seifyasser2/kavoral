import React from 'react';
import { 
  Leaf, Shield, Award, Users, Heart, Star, Sparkles, 
  TrendingUp, ThumbsUp, Package, Clock, CheckCircle 
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';

const AboutPage = () => {
  const features = [
    {
      icon: Leaf,
      title: 'زيوت معصورة على البارد',
      description: 'نستخدم تقنية العصر البارد للحفاظ على جميع الفيتامينات والمعادن الطبيعية',
      gradient: 'from-green-500 to-emerald-500',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Award,
      title: 'أعلى جودة في السوق',
      description: 'نختار المواد الخام بعناية فائقة من أفضل المصادر العالمية',
      gradient: 'from-yellow-500 to-orange-500',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600'
    },
    {
      icon: TrendingUp,
      title: 'أفضل سعر',
      description: 'نقدم أسعار تنافسية بدون التضحية بالجودة',
      gradient: 'from-blue-500 to-cyan-500',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: Shield,
      title: 'منتجات آمنة ومعتمدة',
      description: 'جميع منتجاتنا خالية من المواد الكيميائية الضارة',
      gradient: 'from-purple-500 to-pink-500',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'الشغف بالطبيعة',
      description: 'نؤمن بقوة الطبيعة في تقديم أفضل الحلول',
      gradient: 'from-red-500 to-pink-500'
    },
    {
      icon: Users,
      title: 'رضا العملاء أولاً',
      description: 'سعادتك وثقتك هي هدفنا الأول',
      gradient: 'from-blue-500 to-indigo-500'
    },
    {
      icon: Star,
      title: 'الشفافية والمصداقية',
      description: 'نوضح مكونات كل منتج بشفافية تامة',
      gradient: 'from-yellow-500 to-orange-500'
    },
    {
      icon: Sparkles,
      title: 'التطور المستمر',
      description: 'نبحث دائماً عن الأفضل لنقدم لك أعلى الجودة',
      gradient: 'from-purple-500 to-pink-500'
    }
  ];

  const stats = [
    { number: `${SITE_CONFIG.company.yearsOfExperience}+`, label: 'سنوات خبرة', icon: Clock, gradient: 'from-blue-500 to-cyan-500' },
    { number: `${SITE_CONFIG.company.customersCount}+`, label: 'عميل راضي', icon: Users, gradient: 'from-green-500 to-emerald-500' },
    { number: `${SITE_CONFIG.company.productsCount}+`, label: 'منتج طبيعي', icon: Package, gradient: 'from-purple-500 to-pink-500' },
    { number: `${SITE_CONFIG.company.satisfactionRate}%`, label: 'رضا العملاء', icon: ThumbsUp, gradient: 'from-yellow-500 to-orange-500' }
  ];

  const reasons = [
    { title: 'نقاء 100%', description: 'جميع زيوتنا طبيعية نقية بدون أي إضافات', icon: '✨' },
    { title: 'العصر البارد', description: 'نستخدم تقنية العصر البارد للحفاظ على الفوائد', icon: '❄️' },
    { title: 'أسعار عادلة', description: 'نقدم أفضل جودة بأسعار منافسة', icon: '💰' },
    { title: 'خدمة عملاء مميزة', description: 'فريقنا متواجد دائماً لمساعدتك', icon: '🎯' },
    { title: 'توصيل سريع', description: 'نوصل طلبك في أسرع وقت ممكن', icon: '🚀' },
    { title: 'ضمان الجودة', description: 'نضمن لك جودة منتجاتنا', icon: '🛡️' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-teal-700">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '30px 30px',
              animation: 'moveBackground 20s linear infinite'
            }}></div>
          </div>
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-green-500/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-500/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="mb-8 flex justify-center animate-bounce-in">
              <div className="relative">
                <div className="absolute inset-0 bg-white rounded-full blur-2xl opacity-30"></div>
                <img 
                  src="/logo.png" 
                  alt={`${SITE_CONFIG.name} Logo`}
                  className="w-32 h-32 object-contain relative z-10 animate-gentle-float"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'block';
                  }}
                />
                <div className="w-32 h-32 hidden items-center justify-center text-8xl relative z-10">🌿</div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
              {SITE_CONFIG.name}
            </h1>
            <p className="text-2xl md:text-3xl mb-4 opacity-90">
              {SITE_CONFIG.tagline}
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-yellow-400 to-orange-400 mx-auto rounded-full"></div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#f9fafb"></path>
          </svg>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-green-600 font-semibold text-lg">📖 قصتنا</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
                رحلتنا مع الطبيعة
              </h2>
            </div>
            
            <div className="prose prose-lg mx-auto text-gray-700 leading-relaxed space-y-6">
              <div className="bg-gradient-to-r from-green-50 to-teal-50 p-8 rounded-2xl border-2 border-green-100 shadow-lg">
                <p className="text-lg md:text-xl">
                  بدأت رحلتنا من إيمان عميق بأن الطبيعة تحمل أسرار الجمال الحقيقي. في عالم مليء بالمواد الكيميائية، 
                  قررنا أن نعود للأصل ونقدم لك الزيوت الطبيعية النقية بأفضل صورة ممكنة.
                </p>
              </div>
              
              <p className="text-lg md:text-xl text-center">
                نحن في <strong className="text-green-600 text-2xl">{SITE_CONFIG.name}</strong> نفخر بتقديم أجود أنواع الزيوت الطبيعية 
                المعصورة على البارد، مع الحفاظ على جميع فوائدها الطبيعية دون أي إضافات كيميائية.
              </p>
              
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-2xl border-2 border-blue-100 shadow-lg">
                <p className="text-lg md:text-xl">
                  هدفنا ليس فقط بيع منتجات، بل بناء علاقة ثقة معك من خلال تقديم أعلى جودة بأفضل سعر في السوق.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-green-100 rounded-full blur-3xl opacity-30"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-30"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-lg flex items-center justify-center gap-2">
              <Sparkles size={20} />
              ما يميزنا
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              لماذا نحن الخيار الأفضل؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نحن لا نبيع زيوت، نحن نقدم تجربة عناية طبيعية متكاملة
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-transparent transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${feature.gradient} p-8 text-white transition-all duration-500 relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <feature.icon size={32} />
                    </div>
                    <h3 className="text-2xl font-bold mb-3">{feature.title}</h3>
                    <p className="text-white/90 leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">أرقامنا تتحدث</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className={`bg-gradient-to-br ${stat.gradient} w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-2xl group-hover:scale-110 transition-transform duration-500`}>
                  <stat.icon size={40} />
                </div>
                <div className="text-4xl md:text-6xl font-bold mb-2">{stat.number}</div>
                <div className="text-lg md:text-xl opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <span className="text-green-600 font-semibold text-lg flex items-center justify-center gap-2">
              <Heart size={20} fill="currentColor" />
              قيمنا
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              المبادئ التي نعمل بها
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => (
              <div 
                key={index} 
                className="group bg-white border-2 border-gray-100 hover:border-transparent p-8 rounded-2xl hover:shadow-2xl transition-all duration-500 text-center transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${value.gradient} w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                  <value.icon size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <span className="text-green-600 font-semibold text-lg">🎯 اختيارك الذكي</span>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
                لماذا تختارنا؟
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reasons.map((reason, index) => (
                <div key={index} className="flex items-start gap-4 bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-green-200 group">
                  <div className="text-4xl flex-shrink-0 group-hover:scale-125 transition-transform duration-300">
                    {reason.icon}
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
      <section className="py-20 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">ابدأ رحلتك مع الطبيعة اليوم</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            اكتشف مجموعتنا الكاملة من الزيوت الطبيعية واختر ما يناسب احتياجاتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-2xl inline-flex items-center justify-center gap-2 text-lg transform hover:scale-105"
            >
              <span>تواصل معنا الآن</span>
            </a>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all text-lg"
            >
              تصفح المنتجات
            </button>
          </div>
        </div>
      </section>

      <style jsx>{`
        @keyframes moveBackground {
          from { background-position: 0 0; }
          to { background-position: 30px 30px; }
        }
      `}</style>
    </div>
  );
};

export default AboutPage;