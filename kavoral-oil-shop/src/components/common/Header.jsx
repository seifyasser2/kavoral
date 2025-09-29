import React, { useState } from 'react';
import { 
  ShoppingCart, Home, Tag, User, Heart, Menu, X, Gift
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SITE_CONFIG } from '../../data/config';
import { Badge } from './index';

const Header = () => {
  const { state, dispatch } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigation = [
    { key: 'home', label: 'الرئيسية', icon: Home },
    { key: 'products', label: 'المنتجات', icon: Tag },
    { key: 'offers', label: 'العروض', icon: Gift },
    { key: 'about', label: 'من نحن', icon: User },
    { key: 'contact', label: 'تواصل معنا', icon: User }
  ];

  const handleNavigate = (page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-lg border-b-2 border-green-600 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Main header - إزالة الـ Top bar */}
        <div className="flex justify-between items-center py-4">
          <button 
            className="lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} className="text-green-600" /> : <Menu size={24} className="text-green-600" />}
          </button>

          <div className="flex items-center gap-3 cursor-pointer group" 
               onClick={() => handleNavigate('home')}>
            <img 
              src="/logo.png" 
              alt={SITE_CONFIG.name}
              className="w-12 h-12 group-hover:scale-110 transition-transform"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-4xl hidden group-hover:animate-bounce">🌿</span>
            <div>
              <span className="text-2xl font-bold text-green-600">{SITE_CONFIG.name}</span>
              <p className="text-xs text-gray-600 hidden md:block">{SITE_CONFIG.tagline}</p>
            </div>
          </div>

          <nav className="hidden lg:flex gap-2">
            {navigation.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all text-sm font-medium ${
                  state.currentPage === key
                    ? 'bg-green-600 text-white shadow-md'
                    : 'text-green-600 hover:bg-green-50 hover:shadow-sm'
                }`}
              >
                <Icon size={16} />
                {label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleNavigate('wishlist')}
              className="relative p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group"
              aria-label="المفضلة"
            >
              <Heart size={20} className="group-hover:scale-110 transition-transform" />
              {state.wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={() => handleNavigate('cart')}
              className="relative p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors group"
              aria-label="السلة"
            >
              <ShoppingCart size={20} className="group-hover:scale-110 transition-transform" />
              {state.cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {state.cart.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 border-t border-gray-200 bg-white">
            {navigation.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-right hover:bg-gray-50 transition-colors ${
                  state.currentPage === key ? 'bg-green-50 text-green-600' : ''
                }`}
              >
                <Icon size={18} className="text-green-600" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;