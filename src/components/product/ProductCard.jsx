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
      className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col border border-gray-100"
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
            {/* {product.featured && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                ⭐
              </span>
            )} */}
            {hasDiscount && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                خصم {product.totalDiscountPercentage}%
              </span>
            )}
          </div>
          
          {/* Wishlist */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product);
            }}
            className={`w-6 h-6 rounded-full transition-all flex-shrink-0 flex items-center justify-center ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white/80 text-gray-600 hover:text-red-500 hover:bg-white'
            }`}
            title={isInWishlist ? "إزالة من المفضلة" : "إضافة للمفضلة"}
          >
            <Heart size={18} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-2 md:px-3 pb-2 md:pb-3 flex-grow flex flex-col">
        <div 
          className="cursor-pointer mb-2 md:mb-3 flex-grow"
          onClick={handleViewDetails}
        >
          <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-0.5 md:mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          <p className="text-xs text-gray-500 mb-1 md:mb-2">{product.size}</p>

          {/* Rating */}
          <div className="flex items-center gap-0.5 md:gap-1 mb-1 md:mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-gray-600 mr-0.5">{product.rating}</span>
          </div>

          {/* Price */}
         <div className="bg-green-50 border border-green-100 rounded-lg p-1.5 md:p-2 mb-2 md:mb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base font-bold text-green-700">
                {product.price} ج
              </span>
              {hasDiscount && (
                <span className="text-xs text-gray-700 line-through font-semibold">
                  {product.originalPrice} ج
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="bg-gray-50 rounded-lg p-1.5 md:p-2 mb-1.5 md:mb-2">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <span className="text-xs font-semibold text-gray-700">الكمية:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleUpdateQuantity(-1)}
                disabled={localQuantity <= 0}
                className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white border border-gray-200 hover:border-green-500 disabled:opacity-50 flex items-center justify-center transition-colors text-gray-600"
                type="button"
              >
                <Minus size={12} />
              </button>
              
              <span className="text-sm md:text-base font-bold w-6 md:w-8 text-center text-green-600">
                {localQuantity}
              </span>
              
              <button
                onClick={() => handleUpdateQuantity(1)}
                disabled={!product.inStock}
                className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white border border-gray-200 hover:border-green-500 disabled:opacity-50 flex items-center justify-center transition-colors text-gray-600"
                type="button"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {localQuantity > 0 && (
            <div className="text-center pt-1 md:pt-2 border-t border-gray-200">
              <span className="text-green-600 font-bold text-xs md:text-sm">
                {localQuantity * product.price} ج
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1 md:gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-1.5 md:py-2 px-1.5 md:px-2 rounded-lg transition-colors font-semibold text-xs flex items-center justify-center gap-0.5"
            type="button"
          >
            <Eye size={12} />
            <span className="hidden sm:inline">عرض</span>
          </button>
          
          <button
            onClick={handleAddToCart}
            disabled={localQuantity <= 0 || !product.inStock || isAdding}
            className={`flex-[2] py-1.5 md:py-2 px-1.5 md:px-2 rounded-lg transition-all font-bold text-xs flex items-center justify-center gap-0.5 ${
              isAdding
                ? 'bg-green-500 text-white'
                : localQuantity <= 0 || !product.inStock
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-green-500 text-white hover:bg-green-600'
            }`}
            type="button"
          >
            {isAdding ? (
              <>
                <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>...</span>
              </>
            ) : (
              <>
                <ShoppingCart size={12} />
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