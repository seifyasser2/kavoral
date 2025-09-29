import React from 'react';
import { Heart, Star, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Badge } from '../common';

const ProductCard = ({ product }) => {
  const { state, dispatch } = useAppContext();
  const quantity = state.quantities[product.id] || 0;

  const updateQuantity = (change) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: quantity + change }
    });
  };

  const addToCart = () => {
    if (quantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return;
    }

    if (!product.inStock) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'هذا المنتج غير متوفر حالياً', type: 'error' }
      });
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `تم إضافة ${product.name} للسلة`, type: 'success' }
    });

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: 0 }
    });
  };

  const viewDetails = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    dispatch({ type: 'SET_PAGE', payload: 'product-details' });
  };

  const toggleWishlist = () => {
    const isInWishlist = state.wishlist.find(item => item.id === product.id);
    
    if (isInWishlist) {
      dispatch({ type: 'REMOVE_FROM_WISHLIST', payload: product.id });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'تم حذف المنتج من المفضلة', type: 'info' }
      });
    } else {
      dispatch({ type: 'ADD_TO_WISHLIST', payload: product });
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'تم إضافة المنتج للمفضلة', type: 'success' }
      });
    }
  };

  const isInWishlist = state.wishlist.find(item => item.id === product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  // استخدم النسبة المباشرة من البيانات
  const discountPercentage = product.discountPercentage || 0;

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <div className="p-6">
        {/* Header with image and wishlist */}
        <div className="flex justify-between items-start mb-4">
          <div className="w-20 h-20 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-4xl group-hover:scale-105 transition-transform">
            {product.image}
          </div>
          
          <div className="flex flex-col gap-2">
            {product.featured && <Badge variant="success">مميز</Badge>}
            {hasDiscount && <Badge variant="warning">{discountPercentage}%</Badge>}
            {!product.inStock && <Badge variant="danger">نفذ</Badge>}
            
            <button
              onClick={toggleWishlist}
              className={`p-2 rounded-full transition-all ${
                isInWishlist 
                  ? 'text-red-500 bg-red-50' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              aria-label={isInWishlist ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            >
              <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Product info */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors">
          {product.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <span className="text-sm text-gray-500">{product.size}</span>
          {product.soldCount > 100 && (
            <Badge variant="info">الأكثر مبيعاً</Badge>
          )}
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-green-600">{product.price} جنيه</span>
          {hasDiscount && (
            <span className="text-lg text-gray-400 line-through">{product.originalPrice} جنيه</span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 2).map((tag, index) => (
            <Badge key={index} variant="default">{tag}</Badge>
          ))}
        </div>

        {/* Quantity selector */}
        <div className="flex items-center justify-center gap-3 mb-4">
          <button
            onClick={() => updateQuantity(-1)}
            disabled={quantity <= 0}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Minus size={16} className={quantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
          </button>
          
          <span className="text-xl font-bold w-12 text-center">{quantity}</span>
          
          <button
            onClick={() => updateQuantity(1)}
            disabled={!product.inStock}
            className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
          >
            <Plus size={16} className="text-gray-600" />
          </button>
        </div>

        {quantity > 0 && (
          <p className="text-center text-green-600 font-bold mb-4">
            المجموع: {quantity * product.price} جنيه
          </p>
        )}

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={viewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors font-medium text-sm"
          >
            تفاصيل
          </button>
          
          <button
            onClick={addToCart}
            disabled={quantity <= 0 || !product.inStock}
            className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-2 px-4 rounded-lg transition-colors font-medium text-sm"
          >
            {product.inStock ? 'أضف للسلة' : 'نفذ'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;