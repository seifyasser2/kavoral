import React from 'react';
import { Phone, Mail, MessageCircle, Users } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SITE_CONFIG } from '../../data/config';

const Footer = () => {
  const { dispatch } = useAppContext();

  return (
    <footer className="bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-4xl">🌿</span>
              <a 
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-2xl font-bold hover:text-green-400 transition-colors"
              >
                {SITE_CONFIG.name}
              </a>
            </div>
            <p className="text-gray-300 mb-4">
              {SITE_CONFIG.tagline}
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3 mb-4">
              <a 
                href={SITE_CONFIG.social.facebook} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
                aria-label="Facebook"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>

              <a 
                href={SITE_CONFIG.social.instagram} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="Instagram"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <a 
                href={SITE_CONFIG.social.tiktok} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-black hover:bg-gray-900 rounded-full flex items-center justify-center transition-colors"
                aria-label="TikTok"
              >
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>

              <a 
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-10 h-10 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              {['home', 'products', 'offers', 'about', 'contact'].map(page => (
                <li key={page}>
                  <button
                    onClick={() => dispatch({ type: 'SET_PAGE', payload: page })}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    {page === 'home' && 'الرئيسية'}
                    {page === 'products' && 'المنتجات'}
                    {page === 'offers' && 'العروض'}
                    {page === 'about' && 'من نحن'}
                    {page === 'contact' && 'تواصل معنا'}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
            <div className="space-y-3">
              <a 
                href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-3 hover:text-green-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-600 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                  <Phone size={18} />
                </div>
                <span className="text-gray-300">{SITE_CONFIG.phone}</span>
              </a>

              <a 
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-3 hover:text-green-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                  <Mail size={18} />
                </div>
                <span className="text-gray-300">{SITE_CONFIG.email}</span>
              </a>

              <a 
                href={`https://wa.me/${SITE_CONFIG.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-green-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center group-hover:bg-green-400 transition-colors">
                  <MessageCircle size={18} />
                </div>
                <span className="text-gray-300">واتساب مباشر</span>
              </a>

              <a 
                href={SITE_CONFIG.whatsappGroup}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-green-400 transition-colors group"
              >
                <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                  <Users size={18} />
                </div>
                <span className="text-gray-300">جروب واتساب</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="text-center text-gray-400 text-sm">
            <p className="mb-2">
              © 2024 {SITE_CONFIG.name}. جميع الحقوق محفوظة
            </p>
            <p>
              تطوير وتصميم بواسطة{' '}
              <a
                href={`https://wa.me/${SITE_CONFIG.developer.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-400 hover:text-green-300 font-bold transition-colors inline-flex items-center gap-1"
              >
                <MessageCircle size={14} className="inline" />
                {SITE_CONFIG.developer.name}
              </a>
              {' '}- {SITE_CONFIG.developer.phone}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;