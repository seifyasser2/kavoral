import React from 'react';
import { 
  Phone, Mail, MessageCircle, Users, Clock, MapPin, 
  Sparkles
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'اتصل بنا مباشرة',
      subtitle: 'تواصل معنا عبر الهاتف',
      value: SITE_CONFIG.contact.phoneDisplay,
      link: `tel:${SITE_CONFIG.contact.phone}`,
      gradient: 'from-blue-500 to-blue-600',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'راسلنا على واتساب',
      subtitle: 'الرد خلال دقائق',
      value: 'أرسل رسالة',
      link: getWhatsAppLink(),
      gradient: 'from-green-500 to-green-600',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600'
    },
    {
      icon: Users,
      title: 'انضم لمجتمعنا',
      subtitle: 'جروب الواتساب',
      value: 'انضم الآن',
      link: SITE_CONFIG.contact.whatsappGroup,
      gradient: 'from-teal-500 to-teal-600',
      iconBg: 'bg-teal-100',
      iconColor: 'text-teal-600'
    },
    {
      icon: Mail,
      title: 'راسلنا عبر الإيميل',
      subtitle: 'للاستفسارات الرسمية',
      value: SITE_CONFIG.contact.email,
      link: `mailto:${SITE_CONFIG.contact.email}`,
      gradient: 'from-red-500 to-red-600',
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600'
    }
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      link: SITE_CONFIG.social.facebook,
      description: 'تابعنا على فيسبوك',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Instagram',
      link: SITE_CONFIG.social.instagram,
      description: 'تابعنا على انستجرام',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'TikTok',
      link: SITE_CONFIG.social.tiktok,
      description: 'تابعنا على تيك توك',
      icon: (
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      gradient: 'from-gray-800 to-black'
    }
  ];

  const detailedInfo = [
    {
      icon: Phone,
      title: 'رقم الهاتف',
      content: SITE_CONFIG.contact.phoneDisplay,
      subtitle: 'متاح للمكالمات والرسائل',
      link: `tel:${SITE_CONFIG.contact.phone}`,
      gradient: 'from-blue-500 to-blue-600',
      iconColor: 'text-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      content: 'تواصل فوري',
      subtitle: 'الرد خلال دقائق معدودة',
      link: getWhatsAppLink(),
      gradient: 'from-green-500 to-green-600',
      iconColor: 'text-green-600'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      content: SITE_CONFIG.contact.email,
      subtitle: 'للاستفسارات الرسمية',
      link: `mailto:${SITE_CONFIG.contact.email}`,
      gradient: 'from-red-500 to-red-600',
      iconColor: 'text-red-600'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      content: SITE_CONFIG.contact.workingHours,
      subtitle: SITE_CONFIG.contact.workingDays,
      gradient: 'from-yellow-500 to-orange-500',
      iconColor: 'text-yellow-600'
    },
    {
      icon: MapPin,
      title: 'التوصيل',
      content: SITE_CONFIG.shipping.deliveryAreas,
      subtitle: 'خدمة توصيل سريعة وآمنة',
      gradient: 'from-purple-500 to-pink-500',
      iconColor: 'text-purple-600'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-green-600 via-teal-600 to-cyan-600 text-white py-20">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-7xl mb-6 animate-bounce">📞</div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">تواصل معنا</h1>
            <p className="text-xl md:text-2xl opacity-90 mb-6">
              نحن هنا لخدمتك في أي وقت
            </p>
            <div className="flex items-center justify-center gap-3 text-lg">
              <Clock size={24} />
              <span>{SITE_CONFIG.contact.workingHours}</span>
            </div>
          </div>
        </div>

        {/* Wave Divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-20">
            <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="white"></path>
          </svg>
        </div>
      </section>

      {/* Contact Methods Grid */}
      <section className="py-16 -mt-10 relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="group bg-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border-2 border-gray-100 hover:border-transparent transform hover:-translate-y-2"
              >
                <div className={`bg-gradient-to-br ${method.gradient} p-8 text-white relative overflow-hidden`}>
                  <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                      backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
                      backgroundSize: '20px 20px'
                    }}></div>
                  </div>
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500">
                      <method.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold mb-2">{method.title}</h3>
                    <p className="text-sm opacity-90">{method.subtitle}</p>
                  </div>
                </div>
                <div className="p-6 bg-white">
                  <p className="text-center font-bold text-gray-800 truncate">{method.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <span className="text-green-600 font-semibold text-lg flex items-center justify-center gap-2">
              <Sparkles size={20} />
              تابعنا
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-3 mb-4">
              تابعنا على السوشيال ميديا
            </h2>
            <p className="text-xl text-gray-600">
              اكتشف آخر العروض والمنتجات الجديدة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gradient-to-br ${social.gradient} text-white p-8 rounded-2xl transition-all duration-500 transform hover:scale-105 shadow-xl hover:shadow-2xl flex flex-col items-center gap-6`}
              >
                <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                  {social.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{social.name}</h3>
                  <p className="text-sm opacity-90">{social.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              معلومات التواصل التفصيلية
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {detailedInfo.map((info, index) => (
              <div 
                key={index} 
                className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent transform hover:-translate-y-2"
              >
                {info.link ? (
                  <a href={info.link} target={info.link.startsWith('http') ? '_blank' : undefined} rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">
                    <div className={`bg-gradient-to-br ${info.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <info.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{info.title}</h3>
                    <p className={`text-lg font-semibold mb-2 text-center ${info.iconColor}`}>{info.content}</p>
                    <p className="text-sm text-gray-600 text-center">{info.subtitle}</p>
                  </a>
                ) : (
                  <>
                    <div className={`bg-gradient-to-br ${info.gradient} w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl group-hover:scale-110 transition-transform duration-500`}>
                      <info.icon size={32} />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">{info.title}</h3>
                    <p className="text-lg text-gray-700 font-semibold mb-2 text-center">{info.content}</p>
                    <p className="text-sm text-gray-600 text-center">{info.subtitle}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: 'radial-gradient(circle, white 2px, transparent 2px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="text-6xl mb-6">💬</div>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">هل لديك سؤال؟</h2>
          <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto opacity-90">
            فريقنا جاهز لمساعدتك في اختيار المنتجات المناسبة والإجابة على جميع استفساراتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppLink('مرحباً، لدي استفسار')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-10 py-4 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-2xl inline-flex items-center justify-center gap-3 text-lg transform hover:scale-105"
            >
              <MessageCircle size={24} />
              <span>تواصل عبر واتساب</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="bg-transparent border-2 border-white text-white px-10 py-4 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all inline-flex items-center justify-center gap-3 text-lg"
            >
              <Phone size={24} />
              <span>اتصل الآن</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;