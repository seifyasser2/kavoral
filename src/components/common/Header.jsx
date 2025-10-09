import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Home, Tag, User, Heart, Menu, X, Gift, Phone
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SITE_CONFIG } from '../../data/config';

const Header = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // تتبع الـ scroll مع تأثير محسّن
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsMenuOpen(false);
  }, [state.currentPage]);

  const navigation = [
    { key: 'home', label: 'الرئيسية', icon: Home, color: 'hover:text-green-600', gradient: 'from-green-500 to-emerald-500' },
    { key: 'products', label: 'المنتجات', icon: Tag, color: 'hover:text-blue-600', gradient: 'from-blue-500 to-cyan-500' },
    { key: 'offers', label: 'العروض 🔥', icon: Gift, color: 'hover:text-orange-600', gradient: 'from-orange-500 to-red-500' },
    { key: 'about', label: 'من نحن', icon: User, color: 'hover:text-purple-600', gradient: 'from-purple-500 to-pink-500' },
    { key: 'contact', label: 'تواصل', icon: Phone, color: 'hover:text-teal-600', gradient: 'from-teal-500 to-cyan-500' }
  ];

  const handleNavigate = (page) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-white/98 backdrop-blur-2xl shadow-2xl py-2' 
          : 'bg-white/95 backdrop-blur-xl shadow-lg py-3'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Mobile Menu Button - Enhanced */}
          <button 
            className={`lg:hidden p-3 rounded-xl transition-all duration-300 ${
              isMenuOpen 
                ? 'bg-gradient-to-br from-green-500 to-green-600 text-white scale-95' 
                : 'bg-gradient-to-br from-gray-50 to-gray-100 text-green-600 hover:scale-105 hover:shadow-lg'
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Logo - Premium Design */}
          <div 
            className="flex items-center gap-3 cursor-pointer group relative" 
            onClick={() => handleNavigate('home')}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-teal-400 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500"></div>
            
            <div className="relative">
              <img 
                src="/logo.png" 
                alt={SITE_CONFIG.name}
                className="w-14 h-14 object-contain group-hover:scale-110 transition-all duration-500 drop-shadow-lg"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-5xl hidden">🌿</span>
            </div>
            
            <div className="hidden md:block">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 via-green-700 to-teal-600 bg-clip-text text-transparent group-hover:from-green-700 group-hover:to-teal-700 transition-all duration-300">
                {SITE_CONFIG.name}
              </span>
              <p className="text-xs text-gray-600 leading-tight mt-0.5 group-hover:text-green-600 transition-colors">
                زيوت طبيعية 100%
              </p>
            </div>
          </div>

          {/* Desktop Navigation - Modern Design */}
          <nav className="hidden lg:flex gap-1">
            {navigation.map(({ key, label, icon: Icon, color, gradient }) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className={`relative flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all duration-300 text-sm font-semibold group overflow-hidden ${
                  state.currentPage === key
                    ? `bg-gradient-to-r ${gradient} text-white shadow-xl scale-105`
                    : `text-gray-700 ${color} hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:shadow-lg`
                }`}
              >
                {state.currentPage !== key && (
                  <span className="absolute inset-0 bg-gradient-to-r from-green-50 to-teal-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                )}
                
                <Icon size={18} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
                <span className="relative z-10">{label}</span>
                
                {state.currentPage === key && (
                  <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-white rounded-full animate-pulse"></span>
                )}
              </button>
            ))}
          </nav>

          {/* Action Buttons - Enhanced */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={() => handleNavigate('wishlist')}
              className="relative p-3 text-red-500 hover:bg-gradient-to-br hover:from-red-50 hover:to-pink-50 rounded-xl transition-all duration-300 group hover:scale-110"
            >
              <Heart 
                size={22} 
                className="group-hover:scale-110 transition-transform duration-300" 
                fill={state.wishlist.length > 0 ? 'currentColor' : 'none'}
                strokeWidth={2.5}
              />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-bounce">
                  {state.wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleNavigate('cart')}
              className="relative p-3 text-green-600 hover:bg-gradient-to-br hover:from-green-50 hover:to-teal-50 rounded-xl transition-all duration-300 group hover:scale-110"
            >
              <ShoppingCart 
                size={22} 
                className="group-hover:scale-110 transition-transform duration-300" 
                strokeWidth={2.5}
              />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-br from-green-500 to-teal-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu - Enhanced */}
        {isMenuOpen && (
          <div className="lg:hidden pt-4 pb-2 animate-slide-down">
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-2 shadow-inner">
              {navigation.map(({ key, label, icon: Icon, gradient }) => (
                <button
                  key={key}
                  onClick={() => handleNavigate(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 text-right transition-all duration-300 rounded-xl mb-1 group ${
                    state.currentPage === key 
                      ? `bg-gradient-to-r ${gradient} text-white shadow-lg scale-[0.98]` 
                      : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-50 hover:shadow-md'
                  }`}
                >
                  <div className={`p-2 rounded-lg transition-all duration-300 ${
                    state.currentPage === key ? 'bg-white/20' : 'bg-gradient-to-br from-green-50 to-teal-50'
                  }`}>
                    <Icon size={20} className={state.currentPage === key ? 'text-white' : 'text-green-600'} />
                  </div>
                  <span className="font-semibold">{label}</span>
                  {state.currentPage === key && (
                    <div className="mr-auto w-2 h-2 bg-white rounded-full"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;