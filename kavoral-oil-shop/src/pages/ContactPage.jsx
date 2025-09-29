import React from 'react';
import { Phone, Mail, MessageCircle, Users, Clock } from 'lucide-react';
import { SITE_CONFIG } from '../data/config';

const ContactPage = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: 'اتصل بنا',
      value: SITE_CONFIG.phone,
      link: `tel:${SITE_CONFIG.phone}`,
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'اتصال هاتفي مباشر'
    },
    {
      icon: MessageCircle,
      title: 'واتساب',
      value: 'تواصل فوري',
      link: `https://wa.me/${SITE_CONFIG.whatsapp}`,
      color: 'bg-green-500 hover:bg-green-600',
      description: 'الرد خلال دقائق'
    },
    {
      icon: Users,
      title: 'جروب واتساب',
      value: 'انضم للمجموعة',
      link: SITE_CONFIG.whatsappGroup,
      color: 'bg-teal-500 hover:bg-teal-600',
      description: 'عروض حصرية للأعضاء'
    },
    {
      icon: Mail,
      title: 'البريد الإلكتروني',
      value: SITE_CONFIG.email,
      link: `mailto:${SITE_CONFIG.email}`,
      color: 'bg-red-500 hover:bg-red-600',
      description: 'للاستفسارات التفصيلية'
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
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      link: SITE_CONFIG.social.instagram,
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
      icon: (
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      color: 'bg-black hover:bg-gray-900'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="text-6xl mb-4">📞</div>
          <h1 className="text-5xl font-bold text-green-600 mb-4">تواصل معنا</h1>
          <p className="text-xl text-gray-600">نحن هنا لخدمتك في أي وقت</p>
          <div className="flex items-center justify-center gap-2 mt-4 text-gray-600">
            <Clock size={20} />
            <span>{SITE_CONFIG.workingHours}</span>
          </div>
        </div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <a
              key={index}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group"
            >
              <div className={`${method.color} p-6 text-white transition-all duration-300`}>
                <method.icon size={48} className="mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-bold text-center">{method.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-center font-bold text-gray-800 mb-2">{method.value}</p>
                <p className="text-center text-sm text-gray-600">{method.description}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Social Media Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">تابعنا على مواقع التواصل</h2>
          <div className="flex justify-center gap-4">
            {socialMedia.map((social, index) => (
              <a
                key={index}
                href={social.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`${social.color} w-16 h-16 rounded-full flex items-center justify-center text-white transition-all duration-300 transform hover:scale-110 shadow-lg`}
                aria-label={social.name}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Contact Info Card */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-6">بيانات الاتصال الكاملة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Phone className="mx-auto mb-2" size={32} />
              <p className="font-bold mb-1">الهاتف</p>
              <a href={`tel:${SITE_CONFIG.phone}`} className="hover:text-yellow-300">
                {SITE_CONFIG.phone}
              </a>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Mail className="mx-auto mb-2" size={32} />
              <p className="font-bold mb-1">البريد الإلكتروني</p>
              <a href={`mailto:${SITE_CONFIG.email}`} className="hover:text-yellow-300 text-sm">
                {SITE_CONFIG.email}
              </a>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <MessageCircle className="mx-auto mb-2" size={32} />
              <p className="font-bold mb-1">واتساب مباشر</p>
              <a 
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                تواصل الآن
              </a>
            </div>
            
            <div className="bg-white bg-opacity-10 rounded-lg p-4">
              <Users className="mx-auto mb-2" size={32} />
              <p className="font-bold mb-1">جروب واتساب</p>
              <a 
                href={SITE_CONFIG.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-300"
              >
                انضم للمجموعة
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;