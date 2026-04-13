import React from 'react';
import { Home, ShoppingBag, Heart, Phone, Gift } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';


const BottomNav = () => {
  const { state, navigateTo } = useAppContext();
  
 
  const wishlistCount = state.wishlist.length;

  const navItems = [
    { key: 'home', icon: Home, label: 'الرئيسية' },
    { key: 'products', icon: ShoppingBag, label: 'المنتجات' },
    { key: 'offers', icon: Gift, label: 'الكورسات' },
    { key: 'wishlist', icon: Heart, label: 'المفضلة', count: wishlistCount },
    { key: 'contact', icon: Phone, label: 'تواصل' }
  ];

  return (
    <>
      <div className="h-20 md:hidden"></div>
      
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 md:hidden safe-area-bottom">
        <div className="grid grid-cols-5 h-20">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = state.currentPage === item.key;
            
            return (
              <button
                key={item.key}
                onClick={() => navigateTo(item.key)}
                className={`relative flex flex-col items-center justify-center gap-1 transition-all duration-200 ${
                  isActive 
                    ? 'text-green-600' 
                    : 'text-gray-500'
                }`}
                aria-label={item.label}
              >
                {isActive && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 to-teal-400 rounded-b-full"></div>
                )}
                
                <div className="relative">
                  <Icon 
                    size={22} 
                    strokeWidth={isActive ? 2.5 : 2}
                    fill={item.key === 'wishlist' && wishlistCount > 0 ? 'currentColor' : 'none'}
                    className={`transition-all duration-200 ${isActive ? 'scale-110' : ''}`}
                  />
                  
                  {item.count > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-bold shadow-lg animate-bounce-gentle">
                      {item.count > 9 ? '9+' : item.count}
                    </span>
                  )}
                </div>
                
                <span className={`text-xs font-semibold transition-all duration-200 ${
                  isActive ? 'text-green-600 scale-105' : 'text-gray-600'
                }`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      <style jsx>{`
        .safe-area-bottom {
          padding-bottom: max(0px, env(safe-area-inset-bottom));
        }
      `}</style>
    </>
  );
};

export default BottomNav;