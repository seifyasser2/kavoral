// src/components/product/ProductCard.jsx

import React, { useState, useMemo, useCallback } from 'react';
import { Heart, Star, ShoppingCart, Eye } from 'lucide-react'; // تم إزالة Plus و Minus
import { useAppContext } from '../../context/AppContext';

// تم إزالة MAX_QUANTITY

const ProductCard = ({ product }) => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  // تم إزالة [localQuantity, setLocalQuantity]
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

  // تم إزالة handleUpdateQuantity

  const handleAddToCart = useCallback(async () => {
    // تم إزالة فحص localQuantity > 0

    if (!product.inStock) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'هذا المنتج غير متوفر حالياً', type: 'error' }
      });
      return;
    }

    setIsAdding(true);
    
    const quantityToAdd = 1; // ثابتة الآن = 1

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
        message: `✅ تم إضافة ${product.name} إلى السلة`, // تعديل رسالة الإشعار
        type: 'success' 
      }
    });

    setIsAdding(false);
  }, [product, dispatch]); // تم إزالة localQuantity من الاعتماديات

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
        
        {/* Badges and Wishlist Button */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 gap-1">
          
          {/* Wishlist Button */}
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

          {/* Badges (خصم) */}
          <div className="flex flex-col gap-1">
            {hasDiscount && (
              <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg">
                خصم {product.totalDiscountPercentage}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-2 md:px-3 pb-2 md:pb-3 flex-grow flex flex-col">
        <div 
          className="cursor-pointer mb-3 flex-grow" // تم تعديل margin-bottom ليصبح 3 بعد إزالة الكمية
          onClick={handleViewDetails}
        >
          {/* اسم المنتج - خط عريض وواضح */}
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
          <div className="bg-green-50 border-2 border-green-200 rounded-xl p-2 md:p-2.5"> {/* تم إزالة mb-2/mb-3 */}
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

        {/* تم إزالة قسم Quantity Selector بالكامل من هنا */}

        {/* Action Buttons */}
        <div className="flex gap-1.5 md:gap-2 pt-3 border-t-2 border-gray-100"> {/* إضافة فاصل علوي لتعويض المساحة */}
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 px-2 rounded-xl transition-all font-bold text-xs flex items-center justify-center gap-1 border-2 border-gray-200 hover:border-gray-300 active:scale-95"
            type="button"
            aria-label="عرض التفاصيل"
          >
            <Eye size={14} strokeWidth={2.5} />
            <span className="hidden sm:inline">عرض</span>
          </button>
          
          {/* زر أضف للسلة - يعمل الآن لإضافة 1 فقط */}
          <button
            onClick={handleAddToCart}
            disabled={!product.inStock || isAdding}
            className={`flex-[2] py-2 px-2 rounded-xl transition-all font-black text-xs flex items-center justify-center gap-1 border-2 active:scale-95 ${
              isAdding
                ? 'bg-green-500 text-white border-green-600'
                : !product.inStock
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
                <span>أضف للسلة</span> {/* تعديل النص */}
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;