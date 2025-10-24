import React, { useEffect } from 'react';
import { 
  Leaf, Shield, Award, Heart, Truck, Star, 
  ArrowLeft, CheckCircle 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';

const HomePage = () => {
  const { navigateTo } = useAppContext();

  // ✅ SEO: Update page title & meta dynamically
  useEffect(() => {
    document.title = 'كافورال - أفضل متجر زيوت طبيعية في مصر | Kavoral Natural Oils';
    
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'كافورال متجر متخصص في الزيوت الطبيعية المعصورة على البارد 100%. زيوت للشعر، البشرة، مكافحة الشيخوخة. توصيل سريع لجميع أنحاء مصر. اطلب الآن!');
    }

    // ✅ Add JSON-LD structured data for breadcrumbs
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [{
        "@type": "ListItem",
        "position": 1,
        "name": "الرئيسية",
        "item": "https://kavoral-oil-shop.vercel.app/"
      }]
    });
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const features = [
    {
      icon: Leaf,
      title: 'طبيعي 100%',
      description: 'معصورة على البارد بطريقة طبيعية تحافظ على جميع الفوائد',
    },
    {
      icon: Award,
      title: 'جودة مضمونة',
      description: 'نختار أفضل المواد الخام من مصادر موثوقة',
    },
    {
      icon: Truck,
      title: 'توصيل سريع',
      description: 'شحن آمن وسريع إلى جميع أنحاء مصر خلال 24-48 ساعة',
    }
  ];

  const stats = [
    { icon: Leaf, number: "15+", label: "منتج طبيعي" },
    { icon: Heart, number: "5000+", label: "عميل سعيد" },
    { icon: Star, number: "4.9", label: "تقييم العملاء" },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* ✅ SEO: Add semantic HTML5 tags */}
      
      {/* Hero Section */}
      <section className="relative min-h-[85vh] flex items-center justify-center bg-gradient-to-br from-green-500 to-green-600 text-white overflow-hidden" aria-label="Hero Banner">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
            backgroundSize: '30px 30px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 py-12">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold mb-6">
              <Leaf size={16} aria-hidden="true" />
              <span>طبيعي 100% معصور على البارد</span>
            </div>

            {/* ✅ SEO: Main Heading with keywords */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
              الطبيعة في خدمة
              <span className="block mt-2">جمالك وصحتك</span>
            </h1>

            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto leading-relaxed">
              اكتشف مجموعة كافورال المميزة من الزيوت الطبيعية النقية
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={() => navigateTo('products')}
                className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
                aria-label="تصفح منتجات كافورال"
              >
                <span>تصفح المنتجات</span>
                <ArrowLeft size={20} aria-hidden="true" />
              </button>
              <button 
                onClick={() => navigateTo('offers')}
                className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all"
                aria-label="عروض كافورال الحصرية"
              >
                العروض الحصرية
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap gap-3 justify-center mt-8">
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <CheckCircle size={16} aria-hidden="true" />
                <span>5000+ عميل</span>
              </div>
              <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                <Truck size={16} aria-hidden="true" />
                <span>توصيل سريع</span>
              </div>
            </div>
          </div>
        </div>

        {/* Wave Bottom */}
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-16">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white" aria-label="إحصائيات كافورال">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((stat, idx) => (
              <div key={idx} className="text-center">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <stat.icon size={24} className="text-green-600" aria-hidden="true" />
                </div>
                <div className="text-2xl font-bold text-gray-800">{stat.number}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50" aria-labelledby="features-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm mb-3 block">✨ لماذا كافورال؟</span>
            <h2 id="features-heading" className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              ثلاث أسباب تختارنا
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {features.map((feature, idx) => (
              <article 
                key={idx}
                className="bg-white rounded-xl p-6 border border-gray-100 hover:border-green-200 hover:shadow-md transition-all"
              >
                <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon size={28} className="text-green-600" aria-hidden="true" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white" aria-label="شارات الثقة">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
            {[
              { icon: Shield, label: 'معتمد' },
              { icon: Heart, label: 'آمن' },
              { icon: Star, label: '5000+ عميل' },
            ].map((badge, idx) => (
              <div key={idx} className="bg-gray-50 rounded-xl p-4 text-center border border-gray-100">
                <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center mx-auto mb-2">
                  <badge.icon size={20} className="text-green-600" aria-hidden="true" />
                </div>
                <p className="text-sm font-semibold text-gray-800">{badge.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50" aria-labelledby="testimonials-heading">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-sm mb-3 block">💬 آراء عملائنا</span>
            <h2 id="testimonials-heading" className="text-3xl md:text-4xl font-bold text-gray-900">ماذا يقول عملاؤنا؟</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { name: 'فاطمة أحمد', text: 'منتجات رائعة وجودة عالية جداً، وصل الطلب بسرعة', rating: 5 },
              { name: 'سارة محمد', text: 'أول مرة استخدم زيوت طبيعية كده، النتائج مذهلة', rating: 5 },
              { name: 'ليلى علي', text: 'خدمة العملاء ممتازة والمنتجات أصلية 100%', rating: 5 }
            ].map((testimonial, idx) => (
              <article key={idx} className="bg-white rounded-xl p-6 border border-gray-100">
                <div className="flex gap-1 mb-4" role="img" aria-label={`تقييم ${testimonial.rating} من 5 نجوم`}>
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-yellow-400 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <p className="text-gray-700 mb-4">"{testimonial.text}"</p>
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-green-500 text-white" aria-labelledby="cta-heading">
        <div className="container mx-auto px-4 text-center">
          <h2 id="cta-heading" className="text-3xl md:text-4xl font-bold mb-4">
            ابدأ رحلة الجمال الطبيعي اليوم 🌿
          </h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            انضم إلى آلاف العملاء الراضين واختبر الفرق الحقيقي
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo('products')}
              className="bg-white text-green-600 px-8 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all"
              aria-label="اكتشف منتجات كافورال"
            >
              اكتشف المنتجات
            </button>
            <a
              href={getWhatsAppLink('مرحباً، أريد الاستفسار')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all inline-block"
              aria-label="تواصل مع كافورال عبر واتساب"
            >
              تواصل معنا
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;