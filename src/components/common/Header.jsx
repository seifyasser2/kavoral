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

  // تتبع الـ scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // إغلاق القائمة عند تغيير الصفحة
  useEffect(() => {
    setIsMenuOpen(false);
  }, [state.currentPage]);

  const navigation = [
    { key: 'home', label: 'الرئيسية', icon: Home },
    { key: 'products', label: 'المنتجات', icon: Tag },
    { key: 'offers', label: 'العروض', icon: Gift },
    { key: 'about', label: 'من نحن', icon: User },
    { key: 'contact', label: 'تواصل معنا', icon: Phone }
  ];

  const handleNavigate = (page) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  // حساب إجمالي عناصر السلة
  const cartItemsCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-xl shadow-xl' 
          : 'bg-white shadow-md'
      }`}
      style={{ willChange: 'transform' }}
    >
      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex justify-between items-center py-4">
          {/* Mobile menu button */}
          <button 
            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMenuOpen}
          >
            {isMenuOpen ? (
              <X size={24} className="text-green-600" />
            ) : (
              <Menu size={24} className="text-green-600" />
            )}
          </button>

          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer group" 
            onClick={() => handleNavigate('home')}
          >
            <img 
              src="/logo.png" 
              alt={SITE_CONFIG.name}
              className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-300"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-4xl hidden animate-bounce">🌿</span>
            <div className="hidden md:block">
              <span className="text-2xl font-bold text-green-600 group-hover:text-green-700 transition-colors">
                {SITE_CONFIG.name}
              </span>
              <p className="text-xs text-gray-600 leading-tight">
                {SITE_CONFIG.tagline}
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-2">
            {navigation.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all text-sm font-medium ${
                  state.currentPage === key
                    ? 'bg-gradient-to-r from-green-600 to-green-700 text-white shadow-lg scale-105'
                    : 'text-green-600 hover:bg-green-50 hover:shadow-sm'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Wishlist */}
            <button
              onClick={() => handleNavigate('wishlist')}
              className="relative p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
              aria-label={`المفضلة - ${state.wishlist.length} منتج`}
            >
              <Heart 
                size={20} 
                className="group-hover:scale-110 transition-transform" 
                fill={state.wishlist.length > 0 ? 'currentColor' : 'none'}
              />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-pulse">
                  {state.wishlist.length}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleNavigate('cart')}
              className="relative p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group"
              aria-label={`السلة - ${cartItemsCount} منتج`}
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold animate-bounce">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white animate-slide-down">
            {navigation.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-gray-50 transition-colors rounded-lg mb-1 ${
                  state.currentPage === key ? 'bg-green-50 text-green-600 font-medium' : 'text-gray-700'
                }`}
              >
                <Icon size={18} className="text-green-600" />
                <span>{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Custom animation */}
      <style jsx>{`
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-slide-down {
          animation: slide-down 0.3s ease-out;
        }
      `}</style>
    </header>
  );
};

export default Header;