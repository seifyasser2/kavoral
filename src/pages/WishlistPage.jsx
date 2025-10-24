import React, { useState } from 'react';
import { Heart, Trash2, ShoppingCart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { EmptyState, ConfirmModal } from '../components/common';
import ProductCard from '../components/product/ProductCard';
import BundleCard from '../components/product/BundleCard';

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

  const regularProducts = state.wishlist.filter(item => !item.isBundle);
  const bundleOffers = state.wishlist.filter(item => item.isBundle);

  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-white py-12">
        <div className="container mx-auto px-4">
          <EmptyState 
            icon={Heart}
            title="قائمة المفضلة فارغة"
            description="ابدأ بإضافة المنتجات التي تحبها"
            actionLabel="تصفح المنتجات"
            onAction={() => navigateTo('products')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-red-500 p-3 rounded-xl">
              <Heart className="text-white" size={24} fill="currentColor" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800">قائمة المفضلة</h1>
              <p className="text-sm text-gray-600">{state.wishlist.length} عنصر</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {regularProducts.length > 0 && (
              <div className="bg-green-50 border border-green-100 px-4 py-2 rounded-lg text-sm font-semibold text-green-700">
                🌿 {regularProducts.length} منتج
              </div>
            )}
            {bundleOffers.length > 0 && (
              <div className="bg-orange-50 border border-orange-100 px-4 py-2 rounded-lg text-sm font-semibold text-orange-700">
                🎁 {bundleOffers.length} عرض
              </div>
            )}
            {state.wishlist.length > 0 && (
              <button
                onClick={() => setShowClearConfirm(true)}
                className="bg-red-50 border border-red-100 text-red-600 hover:bg-red-100 px-4 py-2 rounded-lg transition-all font-semibold text-sm flex items-center gap-2"
              >
                <Trash2 size={16} />
                مسح الكل
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="bg-gray-50 border border-gray-100 p-6 rounded-xl mb-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-2">
                لديك {state.wishlist.length} عنصر في المفضلة
              </h3>
              <p className="text-gray-600">
                {regularProducts.length > 0 && `${regularProducts.length} منتج`}
                {regularProducts.length > 0 && bundleOffers.length > 0 && ' و '}
                {bundleOffers.length > 0 && `${bundleOffers.length} عرض`}
              </p>
            </div>
            
            <button
              onClick={() => navigateTo('products')}
              className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>اكتشف المزيد</span>
            </button>
          </div>
        </div>

        {/* Bundle Offers */}
        {bundleOffers.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <span>🎁</span>
              العروض المفضلة
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {bundleOffers.map((bundle) => (
                <BundleCard key={bundle.id} bundle={bundle} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Products */}
        {regularProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
              <Heart size={24} className="text-red-500" fill="currentColor" />
              المنتجات المفضلة
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {regularProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="mt-12 bg-white border border-gray-100 rounded-xl p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            جاهز للشراء؟
          </h3>
          <p className="text-gray-600 mb-6">
            أضف المنتجات المفضلة للسلة واستمتع بتجربة تسوق رائعة
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigateTo('cart')}
              className="bg-green-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-green-600 transition-all flex items-center justify-center gap-2"
            >
              <ShoppingCart size={20} />
              <span>اذهب للسلة</span>
            </button>
            
            <button
              onClick={() => navigateTo('offers')}
              className="bg-orange-500 text-white px-8 py-4 rounded-xl font-bold hover:bg-orange-600 transition-all"
            >
              تصفح العروض
            </button>
          </div>
        </div>
      </div>

      {/* Confirm Clear */}
      <ConfirmModal 
        isOpen={showClearConfirm}
        title="تأكيد المسح"
        message={`هل تريد مسح جميع العناصر (${state.wishlist.length}) من المفضلة؟`}
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