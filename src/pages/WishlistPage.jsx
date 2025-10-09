import React, { useState } from 'react';
import { Heart, Trash2, ShoppingCart, Sparkles } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Badge, EmptyState, ConfirmModal } from '../components/common';
import ProductCard from '../components/product/ProductCard';

const WishlistPage = () => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const handleClearWishlist = () => {
    dispatch({ type: 'CLEAR_WISHLIST' });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: 'تم مسح قائمة المفضلة', type: 'info' }
    });
    setShowClearConfirm(false);
  };

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-20">
        <div className="container mx-auto px-4">
          <EmptyState 
            icon={Heart}
            title="قائمة المفضلة فارغة"
            description="ابدأ بإضافة المنتجات التي تحبينها إلى قائمة المفضلة لتسهيل الوصول إليها لاحقاً"
            actionLabel="تصفح المنتجات"
            onAction={() => navigateTo('products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-red-100 rounded-full blur-3xl opacity-20 animate-pulse"></div>
      <div className="absolute top-40 right-0 w-80 h-80 bg-pink-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
      <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-rose-100 rounded-full blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-red-400 to-pink-400 rounded-full blur-xl opacity-50"></div>
              <div className="relative bg-gradient-to-br from-red-500 to-pink-500 p-4 rounded-2xl shadow-xl">
                <Heart size={40} className="text-white" fill="currentColor" />
              </div>
            </div>
            <Sparkles size={32} className="text-red-500 animate-pulse" />
          </div>

          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
              قائمة المفضلة
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
            المنتجات التي اخترتها بعناية ♥️
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="danger" className="text-base px-6 py-3 shadow-lg">
              ❤️ {state.wishlist.length} منتج في المفضلة
            </Badge>
            {state.wishlist.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="bg-red-50 text-red-600 hover:bg-red-100 px-6 py-3 rounded-xl transition-all font-semibold flex items-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <Trash2 size={20} />
                مسح القائمة
              </button>
            )}
          </div>
        </div>

        {/* Wishlist Summary */}
        <div className="bg-gradient-to-r from-red-50 via-pink-50 to-rose-50 border-2 border-red-100 rounded-2xl p-6 md:p-8 mb-12 shadow-lg">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-right">
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                لديك {state.wishlist.length} منتج في قائمة المفضلة
              </h3>
              <p className="text-gray-600">
                أضف المنتجات للسلة للحصول عليها الآن!
              </p>
            </div>
            
            <button
              onClick={() => navigateTo('products')}
              className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-4 rounded-xl font-bold hover:from-red-600 hover:to-pink-600 transition-all shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center gap-3"
            >
              <ShoppingCart size={24} />
              <span>اكتشف المزيد</span>
            </button>
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-fade-in">
          {state.wishlist.map((product, index) => (
            <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 50}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 border-2 border-gray-100">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              جاهز للشراء؟
            </h3>
            <p className="text-gray-600">
              أضف المنتجات المفضلة لديك للسلة واستمتع بتجربة تسوق رائعة
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo('cart')}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl font-bold hover:from-green-600 hover:to-teal-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <ShoppingCart size={24} />
              <span>اذهب للسلة</span>
            </button>
            
            <button
              onClick={() => navigateTo('offers')}
              className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-xl font-bold hover:from-orange-600 hover:to-red-600 transition-all shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center justify-center gap-3"
            >
              <Sparkles size={24} />
              <span>تصفح العروض</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Clear Modal */}
      <ConfirmModal 
        isOpen={showClearConfirm}
        title="⚠️ تأكيد المسح"
        message={
          <div className="text-center">
            <p className="mb-4 text-gray-700">هل أنت متأكد من مسح جميع المنتجات من قائمة المفضلة؟</p>
            <p className="text-sm text-gray-500">سيتم حذف {state.wishlist.length} منتج من القائمة</p>
            <p className="text-xs text-gray-400 mt-3">💡 يمكنك إضافتهم مرة أخرى في أي وقت</p>
          </div>
        }
        confirmLabel="نعم، امسح الكل"
        cancelLabel="إلغاء"
        onConfirm={handleClearWishlist}
        onCancel={() => setShowClearConfirm(false)}
        type="danger"
      />
    </div>
  );
};

export default WishlistPage;