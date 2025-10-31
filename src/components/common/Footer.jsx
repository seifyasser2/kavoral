import React, { useState } from 'react';
import { Phone, Mail, MessageCircle, Users, Clock, MapPin, Heart, Sparkles, ChevronDown } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SITE_CONFIG, getWhatsAppLink, getDeveloperWhatsAppLink } from '../../data/config';

const Footer = () => {
  const { navigateTo } = useAppContext();
  const [expandedSection, setExpandedSection] = useState(null);

  const quickLinks = [
    { key: 'home', label: 'الرئيسية' },
    { key: 'products', label: 'المنتجات' },
    { key: 'offers', label: 'العروض' },
    { key: 'about', label: 'من نحن' },
    { key: 'contact', label: 'تواصل معنا' }
  ];

  const socialLinks = [
    {
      name: 'Facebook',
      url: SITE_CONFIG.social.facebook,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      gradient: 'from-blue-600 to-blue-700'
    },
    {
      name: 'Instagram',
      url: SITE_CONFIG.social.instagram,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      ),
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      name: 'TikTok',
      url: SITE_CONFIG.social.tiktok,
      icon: (
        <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
        </svg>
      ),
      gradient: 'from-gray-800 to-black'
    },
    {
      name: 'WhatsApp',
      url: getWhatsAppLink(),
      icon: <MessageCircle size={20} />,
      gradient: 'from-green-500 to-green-600'
    }
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden mt-12 md:mt-16">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '30px 30px'
        }}></div>
      </div>

      {/* Floating shapes */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-green-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-3 sm:px-4 py-12 md:py-16 relative z-10">
        {/* Mobile: Collapsible Sections */}
        <div className="md:hidden space-y-3 mb-8">
          {/* Brand Section - Always Visible on Mobile */}
          <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-teal-500 rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-xl">🌿</span>
              </div>
              <div>
                <h3 className="text-lg font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent">
                  {SITE_CONFIG.name}
                </h3>
                <p className="text-xs text-gray-300">زيوت طبيعية 100%</p>
              </div>
            </div>
            <p className="text-xs text-gray-300 leading-relaxed mb-3">
              {SITE_CONFIG.tagline}
            </p>
            
            {/* Social Links - Mobile */}
            <div className="flex gap-2 flex-wrap">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-10 h-10 bg-gradient-to-br ${social.gradient} rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links - Collapsible */}
          <details className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group">
            <summary className="cursor-pointer p-4 hover:bg-white/10 transition-colors flex items-center justify-between font-bold text-sm">
              <span>روابط سريعة</span>
              <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
              {quickLinks.map(link => (
                <button
                  key={link.key}
                  onClick={() => navigateTo(link.key)}
                  className="w-full text-left px-3 py-2 text-gray-300 hover:text-green-400 hover:bg-white/5 rounded-lg transition-all text-sm"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </details>

          {/* Contact - Collapsible */}
          <details className="bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden group">
            <summary className="cursor-pointer p-4 hover:bg-white/10 transition-colors flex items-center justify-between font-bold text-sm">
              <span>تواصل معنا</span>
              <ChevronDown size={18} className="group-open:rotate-180 transition-transform" />
            </summary>
            <div className="px-4 pb-4 space-y-2 border-t border-white/10 pt-3">
              <a 
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="flex items-center gap-2 p-2 text-gray-300 hover:text-green-400 text-sm"
              >
                <Phone size={16} />
                {SITE_CONFIG.contact.phoneDisplay}
              </a>
              <a 
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="flex items-center gap-2 p-2 text-gray-300 hover:text-green-400 text-sm"
              >
                <Mail size={16} />
                <span className="truncate">{SITE_CONFIG.contact.email}</span>
              </a>
              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 text-gray-300 hover:text-green-400 text-sm"
              >
                <MessageCircle size={16} />
                تواصل فوري
              </a>
            </div>
          </details>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-xl">
                <span className="text-3xl">🌿</span>
              </div>
              <div>
                <a 
                  href={`mailto:${SITE_CONFIG.contact.email}`}
                  className="text-2xl font-bold bg-gradient-to-r from-green-400 to-teal-400 bg-clip-text text-transparent hover:from-green-300 hover:to-teal-300 transition-all"
                >
                  {SITE_CONFIG.name}
                </a>
                <p className="text-sm text-gray-400 mt-1">زيوت طبيعية 100%</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {SITE_CONFIG.tagline}
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 mb-6">
              {socialLinks.map((social, index) => (
                <a 
                  key={index}
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className={`w-12 h-12 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:-translate-y-1 shadow-lg hover:shadow-2xl`}
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Heart size={16} fill="currentColor" className="text-red-500" />
              <span>صُنع بحب في مصر</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Sparkles size={20} className="text-green-400" />
              روابط سريعة
            </h3>
            <ul className="space-y-3">
              {quickLinks.map(link => (
                <li key={link.key}>
                  <button
                    onClick={() => navigateTo(link.key)}
                    className="group flex items-center gap-2 text-gray-300 hover:text-green-400 transition-all"
                  >
                    <span className="w-1.5 h-1.5 bg-green-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                    <span className="group-hover:translate-x-1 transition-transform">{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Phone size={20} className="text-green-400" />
              تواصل معنا
            </h3>
            <div className="space-y-4">
              <a 
                href={`tel:${SITE_CONFIG.contact.phone}`}
                className="group flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">اتصل بنا</p>
                  <p className="text-white font-semibold">{SITE_CONFIG.contact.phoneDisplay}</p>
                </div>
              </a>

              <a 
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <MessageCircle size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">واتساب</p>
                  <p className="text-white font-semibold">تواصل فوري</p>
                </div>
              </a>

              <a 
                href={`mailto:${SITE_CONFIG.contact.email}`}
                className="group flex items-center gap-3 p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
              >
                <div className="w-11 h-11 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">البريد</p>
                  <p className="text-white font-semibold text-sm">{SITE_CONFIG.contact.email}</p>
                </div>
              </a>

              <div className="flex items-center gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-11 h-11 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-sm text-gray-400">ساعات العمل</p>
                  <p className="text-white font-semibold text-sm">{SITE_CONFIG.contact.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-gray-400">
            <p className="text-center md:text-right">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. جميع الحقوق محفوظة
            </p>
            <div className="flex items-center gap-2 flex-wrap justify-center">
              <span>تطوير وتصميم:</span>
              <a
                href={getDeveloperWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 font-bold transition-colors inline-flex items-center gap-1 hover:underline"
              >
                <MessageCircle size={14} />
                {SITE_CONFIG.developer.name}
              </a>
            </div>
            {/* Dashboard Link - مخفي للأدمن فقط */}
{/* <div className="">
  <button
    onClick={() => navigateTo('dashboard')}
    className="text-xs text-gray-400 hover:text-green-500"
  >
    Admin
  </button>
</div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;