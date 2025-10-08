import React, { useState } from 'react';
import { Heart, Trash2 } from 'lucide-react';
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
      <div className="min-h-screen bg-gray-50 py-12">
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
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 md:mb-8">
          <div className="flex items-center gap-3 md:gap-4">
            <Heart size={32} className="text-red-500" fill="currentColor" />
            <div>
              <h1 className="text-2xl md:text-4xl font-bold text-gray-800">المفضلة</h1>
              <p className="text-sm text-gray-600 mt-1">المنتجات المحفوظة للرجوع إليها</p>
            </div>
            <Badge variant="danger">{state.wishlist.length} منتج</Badge>
          </div>

          {state.wishlist.length > 0 && (
            <button
              onClick={() => setShowClearConfirm(true)}
              className="bg-red-50 text-red-600 hover:bg-red-100 px-4 py-2.5 rounded-lg transition-colors font-medium flex items-center gap-2 text-sm md:text-base"
            >
              <Trash2 size={18} />
              مسح القائمة
            </button>
          )}
        </div>

        {/* Products Grid - Mobile: 2 columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {state.wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* Confirm Clear Modal */}
        <ConfirmModal 
          isOpen={showClearConfirm}
          title="تأكيد المسح"
          message="هل أنت متأكد من مسح جميع المنتجات من قائمة المفضلة؟ لا يمكن التراجع عن هذا الإجراء."
          confirmLabel="نعم، امسح الكل"
          cancelLabel="إلغاء"
          onConfirm={handleClearWishlist}
          onCancel={() => setShowClearConfirm(false)}
          type="danger"
        />
      </div>
    </div>
  );
};

export default WishlistPage;