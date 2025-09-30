import React from 'react';
import { MessageCircle } from 'lucide-react';
import { SITE_CONFIG } from '../../data/config';

const WhatsAppWidget = () => {
  return (
    <a
      href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=مرحباً، أريد الاستفسار عن المنتجات`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 left-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
      aria-label="تواصل معنا على واتساب"
    >
      <MessageCircle size={28} className="animate-pulse group-hover:animate-none" />
      
      {/* Tooltip */}
      <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        تواصل معنا
      </span>
      
      {/* Ping animation */}
      <span className="absolute inset-0 rounded-full bg-green-500 animate-ping opacity-75"></span>
    </a>
  );
};

export default WhatsAppWidget;