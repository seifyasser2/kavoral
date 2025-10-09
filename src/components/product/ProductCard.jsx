import React, { useState } from 'react';
import { Heart, Star, Plus, Minus, ShoppingCart, Eye, Zap, TrendingUp } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { Badge } from '../common';

const ProductCard = ({ product }) => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  const [localQuantity, setLocalQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isInWishlist = state.wishlist.some(item => item.id === product.id);
  const hasDiscount = product.originalPrice && product.originalPrice > product.price;

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

    setTimeout(() => {
      dispatch({
        type: 'ADD_TO_CART',
        payload: { ...product, quantity: localQuantity }
      });

      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { 
          message: `✅ تم إضافة ${localQuantity} من ${product.name} للسلة`, 
          type: 'success' 
        }
      });

      setLocalQuantity(0);
      setIsAdding(false);
    }, 400);
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
    <div 
      className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden h-full flex flex-col border border-gray-100 hover:border-green-200 transform hover:-translate-y-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Discount banner */}
      {hasDiscount && (
        <div className="h-1 bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 animate-pulse"></div>
      )}

      <div className="p-5 flex flex-col flex-1">
        {/* Header: Image + Wishlist */}
        <div className="relative mb-4">
          {/* Image Container */}
          <div 
            className="relative w-full aspect-square bg-gradient-to-br from-green-50 via-teal-50 to-cyan-50 rounded-2xl flex items-center justify-center overflow-hidden cursor-pointer shadow-inner group-hover:shadow-xl transition-all duration-500"
            onClick={handleViewDetails}
          >
            {/* Animated background */}
            <div className={`absolute inset-0 bg-gradient-to-br from-green-100/50 to-teal-100/50 transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}></div>
            
            {product.image && product.image.startsWith('http') ? (
              <img 
                src={product.image} 
                alt={product.name}
                className={`relative z-10 w-full h-full object-cover transition-transform duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
            ) : null}
            <div 
              className={`text-6xl ${product.image && product.image.startsWith('http') ? 'hidden' : 'flex'} items-center justify-center w-full h-full relative z-10 transition-transform duration-500 ${isHovered ? 'scale-125 rotate-12' : 'scale-100'}`}
            >
              {product.imageAlt || product.image || '🌿'}
            </div>

            {/* Quick view overlay */}
            <div className={`absolute inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
              <div className="text-white text-center">
                <Eye size={32} className="mx-auto mb-2" />
                <p className="font-semibold text-sm">عرض التفاصيل</p>
              </div>
            </div>
          </div>
          
          {/* Badges & Wishlist */}
          <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
            <div className="flex flex-col gap-2">
              {product.featured && (
                <Badge variant="warning" className="animate-pulse shadow-lg">
                  ⭐ مميز
                </Badge>
              )}
              {hasDiscount && (
                <Badge variant="danger" className="flex items-center gap-1 shadow-lg">
                  <Zap size={14} />
                  {product.totalDiscountPercentage}%
                </Badge>
              )}
              {product.soldCount > 100 && (
                <Badge variant="info" className="flex items-center gap-1 shadow-lg">
                  <TrendingUp size={14} />
                  الأكثر مبيعاً
                </Badge>
              )}
              {!product.inStock && (
                <Badge variant="danger" className="shadow-lg">نفذ</Badge>
              )}
            </div>
            
            {/* Wishlist Button */}
            <button
              onClick={handleToggleWishlist}
              className={`p-2.5 rounded-xl backdrop-blur-md transition-all duration-300 shadow-lg ${
                isInWishlist 
                  ? 'bg-red-500 text-white scale-110' 
                  : 'bg-white/90 text-gray-400 hover:text-red-500 hover:bg-white hover:scale-110'
              }`}
            >
              <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div 
          className="cursor-pointer mb-4" 
          onClick={handleViewDetails}
        >
          <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-green-600 transition-colors line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          <div className="flex items-center gap-2 mb-3">
            <span className="text-sm text-gray-500 font-medium">{product.size}</span>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  className={i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {product.rating} ({product.reviews})
            </span>
          </div>

          {/* Price */}
          <div className="bg-gradient-to-r from-green-50 via-teal-50 to-cyan-50 border-2 border-green-100 rounded-xl p-3 mb-3">
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
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-4">
          {product.tags.slice(0, 3).map((tag, index) => (
            <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg">
              {tag}
            </span>
          ))}
        </div>

        {/* Quantity Selector */}
        <div className="bg-gray-50 rounded-xl p-3 mb-4 border border-gray-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-700">الكمية:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleUpdateQuantity(-1)}
                disabled={localQuantity <= 0}
                className="w-9 h-9 rounded-xl bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              >
                <Minus size={16} className={localQuantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
              </button>
              
              <span className="text-xl font-bold w-10 text-center">{localQuantity}</span>
              
              <button
                onClick={() => handleUpdateQuantity(1)}
                disabled={!product.inStock}
                className="w-9 h-9 rounded-xl bg-white border-2 border-gray-200 hover:border-green-500 disabled:border-gray-100 disabled:cursor-not-allowed flex items-center justify-center transition-all shadow-sm hover:shadow-md"
              >
                <Plus size={16} className="text-gray-600" />
              </button>
            </div>
          </div>

          {localQuantity > 0 && (
            <div className="text-center pt-2 border-t border-gray-200">
              <span className="text-green-600 font-bold text-lg">
                المجموع: {localQuantity * product.price} جنيه
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl transition-all font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:shadow-md"
          >
            <Eye size={18} />
            تفاصيل
          </button>
          
          <button
            onClick={handleAddToCart}
            disabled={localQuantity <= 0 || !product.inStock || isAdding}
            className={`flex-[2] py-3 px-4 rounded-xl transition-all duration-300 font-bold text-sm flex items-center justify-center gap-2 shadow-lg ${
              isAdding
                ? 'bg-green-500 text-white scale-95'
                : localQuantity <= 0 || !product.inStock
                  ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                  : 'bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 hover:shadow-xl transform hover:scale-105'
            }`}
          >
            {isAdding ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري الإضافة...
              </>
            ) : (
              <>
                <ShoppingCart size={18} />
                {product.inStock ? 'أضف للسلة' : 'نفذ'}
              </>
            )}
          </button>
        </div>
      </div>

      {/* Bottom Gradient */}
      {hasDiscount && (
        <div className="h-1 bg-gradient-to-r from-green-500 via-teal-500 to-cyan-500 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      )}
    </div>
  );
};

export default ProductCard;