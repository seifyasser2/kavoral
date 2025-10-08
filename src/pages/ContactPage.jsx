import React from 'react';
import { 
  Phone, Mail, MessageCircle, Users, Clock, MapPin, 
  Facebook, Instagram, Send 
} from 'lucide-react';
import { SITE_CONFIG, getWhatsAppLink, getDeveloperWhatsAppLink } from '../data/config';
import { SectionHeader } from '../components/common';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'اتصل بنا مباشرة',
      subtitle: 'تواصل معنا عبر الهاتف',
      value: SITE_CONFIG.contact.phoneDisplay,
      link: `tel:${SITE_CONFIG.contact.phone}`,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700'
    },
    {
      icon: MessageCircle,
      title: 'راسلنا على واتساب',
      subtitle: 'الرد خلال دقائق',
      value: 'أرسل رسالة',
      link: getWhatsAppLink(),
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700'
    },
    {
      icon: Users,
      title: 'انضم لمجتمعنا',
      subtitle: 'جروب الواتساب',
      value: 'انضم الآن',
      link: SITE_CONFIG.contact.whatsappGroup,
      color: 'from-teal-500 to-teal-600',
      hoverColor: 'hover:from-teal-600 hover:to-teal-700'
    },
    {
      icon: Mail,
      title: 'راسلنا عبر الإيميل',
      subtitle: 'للاستفسارات الرسمية',
      value: SITE_CONFIG.contact.email,
      link: `mailto:${SITE_CONFIG.contact.email}`,
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700'
    }
  ];

  const socialMedia = [
    {
      name: 'Facebook',
      link: SITE_CONFIG.social.facebook,
      description: 'تابعنا على فيسبوك',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      link: SITE_CONFIG.social.instagram,
      description: 'تابعنا على انستجرام',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      color: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600'
    },
    {
      name: 'TikTok',
      link: SITE_CONFIG.social.tiktok,
      description: 'تابعنا على تيك توك',
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'bg-black hover:bg-gray-900'
    }
  ];

  const detailedInfo = [
    {
      icon: Phone,
      title: 'رقم الهاتف',
      content: SITE_CONFIG.contact.phoneDisplay,
      subtitle: 'متاح للمكالمات والرسائل',
      link: `tel:${SITE_CONFIG.contact.phone}`,
      color: 'bg-blue-50'
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      content: 'تواصل فوري',
      subtitle: 'الرد خلال دقائق معدودة',
      link: getWhatsAppLink(),
      color: 'bg-green-50'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      content: SITE_CONFIG.contact.email,
      subtitle: 'للاستفسارات والطلبات الرسمية',
      link: `mailto:${SITE_CONFIG.contact.email}`,
      color: 'bg-red-50'
    },
    {
      icon: Clock,
      title: 'ساعات العمل',
      content: SITE_CONFIG.contact.workingHours,
      subtitle: SITE_CONFIG.contact.workingDays,
      color: 'bg-yellow-50'
    },
    {
      icon: MapPin,
      title: 'التوصيل',
      content: SITE_CONFIG.shipping.deliveryAreas,
      subtitle: 'خدمة توصيل سريعة وآمنة',
      color: 'bg-purple-50'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <div className="text-5xl md:text-6xl mb-4">📞</div>
          <h1 className="text-3xl md:text-5xl font-bold text-green-600 mb-4">تواصل معنا</h1>
          <p className="text-lg md:text-xl text-gray-600">نحن هنا لخدمتك في أي وقت</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-600 text-sm md:text-base">
            <Clock size={20} />
            <span>{SITE_CONFIG.contact.workingHours}</span>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group transform hover:scale-105"
            >
              <div className={`bg-gradient-to-r ${method.color} ${method.hoverColor} p-6 text-white transition-all duration-300`}>
                <method.icon size={40} className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-lg md:text-xl font-bold text-center mb-1">{method.title}</h3>
                <p className="text-xs md:text-sm text-center opacity-90">{method.subtitle}</p>
              </div>
              <div className="p-4 md:p-6 bg-white">
                <p className="text-center font-bold text-gray-800 text-sm md:text-base truncate">{method.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl shadow-2xl p-6 md:p-8 mb-12 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}></div>
          </div>

          <div className="relative z-10">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">تابعنا على السوشيال ميديا</h2>
              <p className="text-base md:text-lg text-white/90">اكتشف آخر العروض والمنتجات الجديدة</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 max-w-4xl mx-auto">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${social.color} text-white p-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-2xl flex flex-col items-center gap-4`}
                >
                  <div className="w-16 h-16 flex items-center justify-center">
                    {social.icon}
                  </div>
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-1">{social.name}</h3>
                    <p className="text-sm opacity-90">{social.description}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="space-y-4 md:space-y-6 mb-12">
          {detailedInfo.map((info, index) => (
            <div 
              key={index} 
              className={`${info.color} p-4 md:p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 flex items-start gap-4`}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-full flex items-center justify-center flex-shrink-0 shadow-md">
                <info.icon size={24} className="text-green-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-1">{info.title}</h3>
                {info.link ? (
                  <a 
                    href={info.link}
                    target={info.link.startsWith('http') ? '_blank' : undefined}
                    rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    className="text-base md:text-lg text-green-600 font-semibold hover:text-green-700 transition-colors block truncate"
                  >
                    {info.content}
                  </a>
                ) : (
                  <p className="text-base md:text-lg text-gray-700 font-semibold">{info.content}</p>
                )}
                <p className="text-xs md:text-sm text-gray-600 mt-1">{info.subtitle}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 text-center">
          <div className="text-5xl md:text-6xl mb-4">💬</div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">هل لديك سؤال؟</h2>
          <p className="text-base md:text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
            فريقنا جاهز لمساعدتك في اختيار المنتجات المناسبة والإجابة على جميع استفساراتك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={getWhatsAppLink('مرحباً، لدي استفسار')}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              تواصل عبر واتساب
            </a>
            <a
              href={`tel:${SITE_CONFIG.contact.phone}`}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              <Phone size={20} />
              اتصل الآن
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;