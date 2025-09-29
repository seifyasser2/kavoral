import React from 'react';
import { Heart } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { Badge } from '../components/common';
import ProductCard from '../components/product/ProductCard';

const WishlistPage = () => {
  const { state, dispatch } = useAppContext();
  
  if (state.wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-md mx-auto">
            <div className="w-32 h-32 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart size={60} className="text-gray-300" />
            </div>
            <h1 className="text-3xl font-bold text-gray-600 mb-4">قائمة المفضلة فارغة</h1>
            <p className="text-gray-500 mb-8 leading-relaxed">
              ابدأ بإضافة المنتجات التي تحبينها إلى قائمة المفضلة لتسهيل الوصول إليها لاحقاً
            </p>
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
              className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-bold"
            >
              تصفح المنتجات
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <Heart size={40} className="text-red-500" />
          <h1 className="text-4xl font-bold text-gray-800">المفضلة</h1>
          <Badge variant="danger">{state.wishlist.length} منتج</Badge>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {state.wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WishlistPage;