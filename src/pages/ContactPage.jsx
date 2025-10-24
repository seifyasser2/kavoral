import React from 'react';
import { 
  Phone, Mail, MessageCircle, Users, Clock, MapPin, Sparkles
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink } from '../data/config';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      value: SITE_CONFIG.contact.phoneDisplay,
      link: `tel:${SITE_CONFIG.contact.phone}`,
      gradient: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      value: 'تواصل فوري',
      link: getWhatsAppLink(),
      gradient: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-100'
    },
    {
      icon: Users,
      title: 'جروب واتساب',
      value: 'انضم الآن',
      link: SITE_CONFIG.contact.whatsappGroup,
      gradient: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
      textColor: 'text-teal-600',
      borderColor: 'border-teal-100'
    },
    {
      icon: Mail,
      title: 'البريد',
      value: SITE_CONFIG.contact.email,
      link: `mailto:${SITE_CONFIG.contact.email}`,
      gradient: 'from-red-500 to-red-600',
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-100'
    }
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      link: SITE_CONFIG.social.facebook,
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Instagram',
      link: SITE_CONFIG.social.instagram,
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'TikTok',
      link: SITE_CONFIG.social.tiktok,
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      gradient: 'from-gray-800 to-black'
    }
  ];

  const detailedInfo = [
    {
      icon: Phone,
      title: 'الهاتف',
      content: SITE_CONFIG.contact.phoneDisplay,
      subtitle: 'متاح للمكالمات',
      link: `tel:${SITE_CONFIG.contact.phone}`,
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-100'
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      content: 'تواصل فوري',
      subtitle: 'رد خلال دقائق',
      link: getWhatsAppLink(),
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-100'
    },
    {
      icon: Mail,
      title: 'البريد',
      content: SITE_CONFIG.contact.email,
      subtitle: 'للاستفسارات الرسمية',
      link: `mailto:${SITE_CONFIG.contact.email}`,
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-100'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      content: SITE_CONFIG.contact.workingHours,
      subtitle: SITE_CONFIG.contact.workingDays,
      bgColor: 'bg-yellow-50',
      textColor: 'text-yellow-600',
      borderColor: 'border-yellow-100'
    },
    {
      icon: MapPin,
      title: 'التوصيل',
      content: SITE_CONFIG.shipping.deliveryAreas,
      subtitle: 'توصيل سريع وآمن',
      bgColor: 'bg-purple-50',
      textColor: 'text-purple-600',
      borderColor: 'border-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - محسّن للموبايل */}
      <section className="bg-gradient-to-br from-green-500 to-green-600 text-white py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-5xl md:text-6xl mb-4">📞</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">تواصل معنا</h1>
            <p className="text-lg md:text-xl opacity-90 mb-4">
              نحن هنا لخدمتك في أي وقت
            </p>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
              <Clock size={18} />
              <span>{SITE_CONFIG.contact.workingHours}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Methods Grid - محسّن */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.link}
                target={method.link.startsWith('http') ? '_blank' : undefined}
                rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                className={`group ${method.bgColor} ${method.borderColor} border-2 rounded-xl p-4 hover:shadow-lg transition-all text-center`}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${method.gradient} rounded-xl flex items-center justify-center mx-auto mb-3 text-white shadow-md group-hover:scale-110 transition-transform`}>
                  <method.icon size={20} className="md:w-6 md:h-6" />
                </div>
                <h3 className={`text-sm md:text-base font-bold ${method.textColor} mb-1`}>
                  {method.title}
                </h3>
                <p className="text-xs text-gray-600 truncate">{method.value}</p>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Social Media Section - محسّن */}
      <section className="py-8 md:py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <div className="flex items-center justify-center gap-2 text-green-600 font-semibold mb-2">
              <Sparkles size={20} />
              <span>تابعنا</span>
            </div>
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-2">
              على السوشيال ميديا
            </h2>
            <p className="text-sm md:text-base text-gray-600">
              اكتشف آخر العروض والمنتجات
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 md:gap-4 max-w-3xl mx-auto">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group bg-gradient-to-br ${social.gradient} text-white p-4 md:p-6 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex flex-col items-center gap-3`}
              >
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                  {social.icon}
                </div>
                <h3 className="text-sm md:text-lg font-bold">{social.name}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Information - محسّن */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-8">
            <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
              معلومات التواصل
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {detailedInfo.map((info, index) => (
              <div 
                key={index} 
                className={`group ${info.bgColor} ${info.borderColor} border-2 p-4 md:p-6 rounded-xl hover:shadow-lg transition-all`}
              >
                {info.link ? (
                  <a href={info.link} target={info.link?.startsWith('http') ? '_blank' : undefined} rel={info.link?.startsWith('http') ? 'noopener noreferrer' : undefined} className="block">
                    <div className={`w-12 h-12 md:w-14 md:h-14 ${info.bgColor} border-2 ${info.borderColor} rounded-xl flex items-center justify-center mx-auto mb-4 ${info.textColor} group-hover:scale-110 transition-transform`}>
                      <info.icon size={24} />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 text-center">{info.title}</h3>
                    <p className={`text-sm md:text-base font-semibold mb-1 text-center ${info.textColor} truncate`}>{info.content}</p>
                    <p className="text-xs text-gray-600 text-center">{info.subtitle}</p>
                  </a>
                ) : (
                  <>
                    <div className={`w-12 h-12 md:w-14 md:h-14 ${info.bgColor} border-2 ${info.borderColor} rounded-xl flex items-center justify-center mx-auto mb-4 ${info.textColor}`}>
                      <info.icon size={24} />
                    </div>
                    <h3 className="text-base md:text-lg font-bold text-gray-800 mb-2 text-center">{info.title}</h3>
                    <p className="text-sm md:text-base text-gray-700 font-semibold mb-1 text-center">{info.content}</p>
                    <p className="text-xs text-gray-600 text-center">{info.subtitle}</p>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action - محسّن */}
      <section className="py-12 md:py-16 bg-green-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-4xl md:text-5xl mb-4">💬</div>
          <h2 className="text-2xl md:text-4xl font-bold mb-4">هل لديك سؤال؟</h2>
          <p className="text-base md:text-lg mb-6 max-w-2xl mx-auto opacity-90">
            فريقنا جاهز لمساعدتك والإجابة على جميع استفساراتك
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center max-w-md mx-auto">
            <a
              href={getWhatsAppLink('مرحباً، لدي استفسار')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-green-600 px-6 py-3 rounded-xl font-bold hover:bg-gray-50 transition-all shadow-lg inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              <span>واتساب</span>
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="bg-white/10 backdrop-blur-sm border-2 border-white text-white px-6 py-3 rounded-xl font-bold hover:bg-white hover:text-green-600 transition-all inline-flex items-center justify-center gap-2"
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

export default ContactPage;