import React, { useState } from 'react';
import { Heart, Star, Plus, Minus, ShoppingCart, Eye } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Badge } from '../common';

const ProductCard = ({ product }) => {
  const { state, dispatch, addToCart, toggleWishlist, navigateTo } = useAppContext();
  const [localQuantity, setLocalQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;
  const discountPercentage = product.discountPercentage || 0;

  const handleUpdateQuantity = (change) => {
    setLocalQuantity(prev => Math.max(0, prev + change));
  };

  const handleAddToCart = async () => {
    if (localQuantity <= 0) {
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

    setIsAdding(true);

    // إضافة تأخير بسيط لتجربة مستخدم أفضل
    setTimeout(() => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...product, quantity: localQuantity }
      });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { 
          message: `تم إضافة ${localQuantity} من ${product.name} للسلة`, 
          type: 'success' 
        }
      });

      setLocalQuantity(0);
      setIsAdding(false);
    }, 300);
  };

  const handleViewDetails = () => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    navigateTo('product-details');
  };

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Top bar with discount */}
      {hasDiscount && (
        <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500"></div>
      )}

      <div className="p-6">
        {/* Header with image and wishlist */}
        <div className="flex justify-between items-start mb-4">
          <div 
            className="w-28 h-28 md:w-32 md:h-32 bg-gradient-to-br from-green-50 to-teal-50 rounded-xl flex items-center justify-center overflow-hidden cursor-pointer group-hover:scale-110 transition-transform duration-300 relative shadow-md"
            onClick={handleViewDetails}
          >
            {product.image && product.image.startsWith('http') ? (
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`text-5xl md:text-6xl ${product.image && product.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
            >
              {product.imageAlt || product.image || '🌿'}
            </div>
          </div>
          
          <div className="flex flex-col gap-2">
            {/* Badges */}
            {product.featured && (
              <Badge variant="warning" className="animate-pulse">
                ⭐ مميز
              </Badge>
            )}
            {hasDiscount && (
              <Badge variant="danger" className="flex items-center gap-1">
                ⚡ {discountPercentage}%
              </Badge>
            )}
            {!product.inStock && (
              <Badge variant="danger">نفذ</Badge>
            )}
            
            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`p-2 rounded-full transition-all ${
                isInWishlist 
                  ? 'text-red-500 bg-red-50 scale-110' 
                  : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
              }`}
              aria-label={isInWishlist ? 'إزالة من المفضلة' : 'إضافة للمفضلة'}
            >
              <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} />
            </button>
          </div>
        </div>

        {/* Product info */}
        <div 
          className="cursor-pointer" 
          onClick={handleViewDetails}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-500">{product.size}</span>
            {product.soldCount > 100 && (
              <Badge variant="info" className="text-xs">🔥 الأكثر مبيعاً</Badge>
            )}
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-green-50 to-teal-50 border border-green-100 rounded-lg p-3 mb-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-2xl font-bold text-green-600">
                  {product.price} جنيه
                </span>
                {hasDiscount && (
                  <span className="text-sm text-gray-400 line-through">
                    {product.originalPrice} جنيه
                  </span>
                )}
              </div>
              {hasDiscount && (
                <Badge variant="danger" className="text-xs">
                  وفّر {product.savings} ج
                </Badge>
              )}
            </div>
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
            <span className="text-sm text-gray-600">
              {product.rating} ({product.reviews})
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag, index) => (
            <Badge key={index} variant="default" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        {/* Quantity selector */}
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">الكمية:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpdateQuantity(-1)}
                disabled={localQuantity <= 0}
                className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
              >
                <Minus size={14} className={localQuantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              
              <span className="text-xl font-bold w-8 text-center">{localQuantity}</span>
              
              <button
                onClick={() => handleUpdateQuantity(1)}
                disabled={!product.inStock}
                className="w-8 h-8 rounded-full bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all"
              >
                <Plus size={14} className="text-gray-600" />
              </button>
            </div>
          </div>

          {localQuantity > 0 && (
            <div className="text-center">
              <span className="text-green-600 font-bold">
                المجموع: {localQuantity * product.price} جنيه
              </span>
            </div>
          )}
        </div>

        {/* Action buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2.5 px-4 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2"
          >
            <Eye size={16} />
            تفاصيل
          </button>
          
          <button
            onClick={handleAddToCart}
            disabled={localQuantity <= 0 || !product.inStock || isAdding}
            className={`flex-1 py-2.5 px-4 rounded-lg transition-all font-medium text-sm flex items-center justify-center gap-2 ${
              isAdding
                ? 'bg-green-500 text-white scale-95'
                : 'bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white'
            }`}
          >
            {isAdding ? (
              <>
                <span className="animate-spin">⏳</span>
                جاري الإضافة...
              </>
            ) : (
              <>
                <ShoppingCart size={16} />
                {product.inStock ? 'أضف للسلة' : 'نفذ'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom gradient bar */}
      {hasDiscount && (
        <div className="h-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      )}
    </div>
  );
};

export default ProductCard;