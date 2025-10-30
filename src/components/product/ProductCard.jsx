// src/components/product/ProductCard.jsx

import React, { useState, useMemo, useCallback } from 'react';
import { Heart, Star, Plus, Minus, ShoppingCart, Eye } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const MAX_QUANTITY = 100;

const ProductCard = ({ product }) => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  const [localQuantity, setLocalQuantity] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInWishlist = useMemo(
    () => state.wishlist.some(item => item.id === product.id),
    [state.wishlist, product.id]
  );

  const hasDiscount = useMemo(
    () => product.originalPrice && product.originalPrice > product.price,
    [product.originalPrice, product.price]
  );

  const handleUpdateQuantity = useCallback((change) => {
    setLocalQuantity(prev => Math.max(0, Math.min(MAX_QUANTITY, prev + change)));
  }, []);

  const handleAddToCart = useCallback(async () => {
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
    
    const quantityToAdd = localQuantity;
    setLocalQuantity(0);

    await new Promise(resolve => setTimeout(resolve, 200));

    dispatch({
      type: 'ADD_TO_CART',
      payload: { 
        ...product, 
        quantity: quantityToAdd
      }
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { 
        message: `✅ تم إضافة ${quantityToAdd} × ${product.name}`, 
        type: 'success' 
      }
    });

    setIsAdding(false);
  }, [localQuantity, product, dispatch]);

  const handleViewDetails = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    navigateTo('product-details');
  }, [product, dispatch, navigateTo]);

  return (
    <article 
      className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden h-full flex flex-col border-2 border-gray-100 hover:border-green-200"
    >
      {/* Image Section */}
      <div className="relative mb-2 md:mb-3">
        <div 
          className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleViewDetails}
        >
          {!imageLoaded && product.image && product.image.startsWith('http') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-green-200 border-t-green-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          {product.image && product.image.startsWith('http') ? (
            <img 
              src={product.image} 
              alt={product.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-opacity duration-200 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => {
                e.target.style.display = 'none';
                if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
              }}
            />
          ) : null}
          
          <div 
            className={`text-4xl ${product.image && product.image.startsWith('http') && imageLoaded ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}
          >
            {product.imageAlt || product.image || '🌿'}
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 gap-1">
          <div className="flex flex-col gap-1">
            {hasDiscount && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                خصم {product.totalDiscountPercentage}%
              </span>
            )}
          </div>
          
          {/* ✅ Wishlist Button - بدون دائرة */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`p-1.5 transition-all transform hover:scale-110 active:scale-95 ${
              isInWishlist 
                ? 'text-red-500' 
                : 'text-gray-400 hover:text-red-500'
            }`}
            title={isInWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}
            aria-label={isInWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          >
            <Heart 
              size={20} 
              fill={isInWishlist ? 'currentColor' : 'none'} 
              strokeWidth={2.5}
              className="drop-shadow-md"
            />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-2 md:px-3 pb-2 md:pb-3 flex-grow flex flex-col">
        <div 
          className="cursor-pointer mb-2 md:mb-3 flex-grow"
          onClick={handleViewDetails}
        >
          {/* ✅ اسم المنتج - خط عريض وواضح */}
          <h3 className="text-sm md:text-base font-black text-gray-900 mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          <p className="text-xs text-gray-600 mb-1 md:mb-2 font-semibold">{product.size}</p>

          {/* Rating */}
          <div className="flex items-center gap-0.5 md:gap-1 mb-1 md:mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={12}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-gray-700 mr-0.5 font-bold">{product.rating}</span>
          </div>

          {/* Price - خط عريض */}
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-2 md:p-2.5 mb-2 md:mb-3">
            <div className="flex items-center justify-between">
              <span className="text-base md:text-lg font-black text-green-700">
                {product.price} ج
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-600 line-through font-bold">
                  {product.originalPrice} ج
                </span>
              )}
            </div>
          </div>
        </div>

        {/* ✅ Quantity Selector - مظبوط للموبايل */}
        <div className="bg-gray-50 border-2 border-gray-200 rounded-xl p-2 mb-2">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-black text-gray-800">الكمية:</span>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => handleUpdateQuantity(-1)}
                disabled={localQuantity <= 0}
                className="w-7 h-7 rounded-lg bg-white border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 touch-action-manipulation"
                type="button"
                aria-label="تقليل الكمية"
              >
                <Minus size={10} strokeWidth={3} className="text-gray-700" />
              </button>
              
              <span className="text-base font-black w-8 text-center text-green-700">
                {localQuantity}
              </span>
              
              <button
                onClick={() => handleUpdateQuantity(1)}
                disabled={!product.inStock}
                className="w-7 h-7 rounded-lg bg-white border-2 border-gray-300 hover:border-green-500 hover:bg-green-50 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-all active:scale-95 touch-action-manipulation"
                type="button"
                aria-label="زيادة الكمية"
              >
                <Plus size={10} strokeWidth={3} className="text-gray-700 rounded" />
              </button>
            </div>
          </div>

          {localQuantity > 0 && (
            <div className="text-center pt-1.5 border-t-2 border-gray-200">
              <span className="text-green-700 font-black text-sm">
                {localQuantity * product.price} ج
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5 md:gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-2 rounded-xl transition-all font-bold text-xs flex items-center justify-center gap-1 border-2 border-gray-200 hover:border-gray-300 active:scale-95"
            type="button"
            aria-label="عرض التفاصيل"
          >
            <Eye size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">عرض</span>
          </button>
          
          <button
            onClick={handleAddToCart}
            disabled={localQuantity <= 0 || !product.inStock || isAdding}
            className={`flex-[2] py-2 px-2 rounded-xl transition-all font-black text-xs flex items-center justify-center gap-1 border-2 active:scale-95 ${
              isAdding
                ? 'bg-green-500 text-white border-green-600'
                : localQuantity <= 0 || !product.inStock
                  ? 'bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300'
                  : 'bg-green-500 text-white hover:bg-green-600 border-green-600 shadow-lg hover:shadow-xl'
            }`}
            type="button"
            aria-label="أضف للسلة"
          >
            {isAdding ? (
              <>
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>...</span>
              </>
            ) : (
              <>
                <ShoppingCart size={14} strokeWidth={2.5} />
                <span>أضف</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;