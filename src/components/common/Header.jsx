import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, Home, Tag, User, Heart, Menu, X, Gift, Phone, Search
} from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { SITE_CONFIG } from '../../data/config';

const Header = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [state.currentPage]);

  // إغلاق البحث عند تغيير الصفحة
  useEffect(() => {
    setIsSearchOpen(false);
  }, [state.currentPage]);

  // إغلاق البحث عند الضغط على Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
    };
    
    if (isSearchOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isSearchOpen]);

  const navigation = [git
    { key: 'home', label: 'الرئيسية', icon: Home },
    { key: 'products', label: 'المنتجات', icon: Tag },
    { key: 'offers', label: 'الكورسات', icon: Gift },
    { key: 'about', label: 'من نحن', icon: User },
    { key: 'contact', label: 'تواصل', icon: Phone }
  ];

  const handleNavigate = (page) => {
    navigateTo(page);
    setIsMenuOpen(false);
  };

  const cartCount = state.cart.length;
  const wishlistCount = state.wishlist.length;

  const handleSearchClick = () => {
    setIsSearchOpen(true);
    // الانتقال لصفحة المنتجات إذا لم نكن فيها
    if (state.currentPage !== 'products') {
      navigateTo('products');
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    dispatch({ type: 'SET_SEARCH', payload: value });
  };

  const clearSearch = () => {
    dispatch({ type: 'SET_SEARCH', payload: '' });
    setIsSearchOpen(false);
  };

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white shadow-md py-2' 
            : 'bg-white shadow-sm py-3'
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Logo */}
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => handleNavigate('home')}
          >
            <img 
              src="/logo192.png" 
              alt={SITE_CONFIG.name}
              className="w-12 h-12 object-contain"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <span className="text-4xl hidden">🌿</span>
            
            <div className="hidden sm:block">
              <span className="text-xl font-bold text-green-600">
                {SITE_CONFIG.name}
              </span>
              <p className="text-xs text-gray-600 hidden md:block">
                زيوت طبيعية 100%
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-2">
            {navigation.map(({ key, label, icon: Icon }) => (
              <button
                key={key}
                onClick={() => handleNavigate(key)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all font-semibold text-sm ${
                  state.currentPage === key
                    ? 'bg-green-500 text-white'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon size={18} />
                <span>{label}</span>
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            {/* Search Button */}
            <button
              onClick={handleSearchClick}
              className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
              aria-label="البحث"
            >
              <Search size={22} strokeWidth={2} />
              {state.searchTerm && (
                <span className="absolute -top-1 -right-1 bg-green-500 w-2 h-2 rounded-full"></span>
              )}
            </button>

            {/* Wishlist */}
            <button
              onClick={() => handleNavigate('wishlist')}
              className="relative p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"
              aria-label="المفضلة"
            >
              <Heart size={22} fill={wishlistCount > 0 ? 'currentColor' : 'none'} strokeWidth={2} />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart */}
            <button
              onClick={() => handleNavigate('cart')}
              className="relative p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
              aria-label="السلة"
            >
              <ShoppingCart size={22} strokeWidth={2} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-all"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="القائمة"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-lg">
            <div className="container mx-auto px-4 py-3 space-y-1">
              {navigation.map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => handleNavigate(key)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all font-semibold ${
                    state.currentPage === key 
                      ? 'bg-green-500 text-white' 
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon size={20} />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Search Modal */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl animate-scale-in"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4">
              <div className="flex items-center gap-3 mb-4">
                <Search size={24} className="text-green-600 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="ابحث عن منتج..."
                  value={state.searchTerm}
                  onChange={handleSearchChange}
                  autoFocus
                  className="flex-1 text-lg outline-none"
                  maxLength={100}
                />
                <button
                  onClick={clearSearch}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-all"
                >
                  <X size={20} className="text-gray-400" />
                </button>
              </div>

              {state.searchTerm && (
                <div className="border-t pt-3">
                  <p className="text-sm text-gray-600">
                    البحث عن: <span className="font-bold text-green-600">{state.searchTerm}</span>
                  </p>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <button
                  onClick={() => {
                    navigateTo('products');
                    setIsSearchOpen(false);
                  }}
                  className="flex-1 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all font-bold"
                >
                  عرض النتائج
                </button>
                <button
                  onClick={clearSearch}
                  className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-200 transition-all font-bold"
                >
                  إلغاء
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;