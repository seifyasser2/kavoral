import React, { useState, useCallback } from 'react';
import { Heart, ShoppingCart, Plus, Minus, Star, Eye, Package } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getProductById } from '../../data/products';

const BundleCard = ({ bundle }) => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [localQuantity, setLocalQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInWishlist = state.wishlist.some(item => item.id === bundle.id);
  const bundleProducts = bundle.products.map(id => getProductById(id)).filter(p => p !== null);

  const handleAddToCart = useCallback(() => {
    if (localQuantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return;
    }

    const quantityToAdd = localQuantity;
    setLocalQuantity(0);

    const bundleItem = {
      id: bundle.id,
      name: bundle.name,
      price: bundle.bundlePrice,
      originalPrice: bundle.originalPrice,
      image: bundle.image,
      imageAlt: bundle.imageAlt,
      size: `باقة ${bundle.products.length} منتجات`,
      category: bundle.category,
      tags: ['عرض خاص', 'باقة'],
      inStock: true,
      isBundle: true,
      bundleProducts: bundle.products,
      quantity: quantityToAdd,
    };

    dispatch({
      type: 'ADD_TO_CART',
      payload: bundleItem
    });
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `✅ تم إضافة ${quantityToAdd} × ${bundle.name}`, type: 'success' }
    });
  }, [localQuantity, bundle, dispatch]);

  const handleToggleWishlist = useCallback(() => {
    dispatch({ type: 'TOGGLE_WISHLIST', payload: bundle });
  }, [bundle, dispatch]);

  const handleViewDetails = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_BUNDLE', payload: bundle });
    navigateTo('bundle-details');
  }, [bundle, dispatch, navigateTo]);

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden h-full flex flex-col border border-gray-100">
      {/* Image Section */}
      <div className="relative mb-2 md:mb-3">
        <div 
          className="relative w-full aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-pointer"
          onClick={handleViewDetails}
        >
          {!imageLoaded && bundle.image && bundle.image.startsWith('http') && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-6 h-6 border-2 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
            </div>
          )}
          
          {bundle.image && bundle.image.startsWith('http') ? (
            <img 
              src={bundle.image} 
              alt={bundle.name}
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
          
          <div className={`text-5xl sm:text-6xl ${bundle.image && bundle.image.startsWith('http') && imageLoaded ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
            {bundle.imageAlt || '🎁'}
          </div>

          {/* Overlay on Hover */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="text-white text-center">
              <Eye size={24} className="mx-auto mb-2 sm:mb-4" />
              <p className="font-bold text-xs sm:text-sm">عرض التفاصيل</p>
            </div>
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 gap-1">
          <div className="flex flex-col gap-1">
            <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
              🔥 -{bundle.totalDiscountPercentage}%
            </span>
            {bundle.featured && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                ⭐
              </span>
            )}
          </div>
          
          {/* Wishlist - ✅ مصغر */}
          <button
            onClick={handleToggleWishlist}
            className={`p-1.5 rounded-full transition-all flex-shrink-0 ${
              isInWishlist 
                ? 'bg-red-500 text-white' 
                : 'bg-white text-gray-400 hover:text-red-500'
            }`}
          >
            <Heart size={14} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={2} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="px-2 md:px-3 pb-2 md:pb-3 flex flex-col flex-1">
        <div className="mb-2 md:mb-3 flex-grow">
          <h3 className="text-xs md:text-base font-bold text-gray-800 mb-1 line-clamp-2 leading-tight">
            {bundle.name}
          </h3>
          
          <p className="text-xs text-gray-600 line-clamp-1 mb-1 md:mb-2">
            {bundle.description}
          </p>

          {/* Rating */}
          <div className="flex items-center gap-1 md:gap-2 mb-2 md:mb-3 bg-yellow-50 border border-yellow-100 rounded-lg p-1.5 md:p-2">
            <div className="flex gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={10}
                  className={i < Math.floor(bundle.ratings) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm font-bold text-gray-800">{bundle.ratings}</span>
            <span className="text-xs text-gray-600">({bundle.reviews})</span>
          </div>

          {/* Products List */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-2 md:p-3 mb-2 md:mb-3">
            <div className="flex items-center gap-1 md:gap-2 mb-1.5 md:mb-2">
              <Package size={12} className="text-green-600 flex-shrink-0" />
              <span className="text-xs font-bold text-gray-700">{bundleProducts.length} منتجات:</span>
            </div>
            <div className="space-y-0.5">
              {bundleProducts.slice(0, 2).map((product, idx) => (
                <p key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span className="line-clamp-1">{product.name}</span>
                </p>
              ))}
              {bundleProducts.length > 2 && (
                <p className="text-xs text-green-600 font-bold">+{bundleProducts.length - 2} منتجات</p>
              )}
            </div>
            
            <button
              onClick={handleViewDetails}
              className="w-full mt-1.5 md:mt-2 py-1.5 md:py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all font-bold text-xs"
            >
              اعرف التفاصيل
            </button>
          </div>

          {/* Price */}
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-2 md:p-3 mb-2 md:mb-3">
            <div className="flex items-center justify-between mb-0.5 md:mb-1">
              <div className="flex items-end gap-1">
                <span className="text-lg md:text-xl font-bold text-orange-600">{bundle.bundlePrice}ج</span>
                <span className="text-xs text-gray-400 line-through">{bundle.originalPrice}ج</span>
              </div>
              <span className="text-xs font-bold bg-orange-500 text-white px-1.5 md:px-2 py-0.5 md:py-1 rounded-full whitespace-nowrap">
                -{bundle.totalDiscountPercentage}%
              </span>
            </div>
            <p className="text-xs text-orange-700 font-semibold">وفّر {bundle.savings} ج</p>
          </div>
        </div>

        {/* Quantity */}
        <div className="bg-gray-50 rounded-lg p-1.5 md:p-2 mb-1.5 md:mb-2">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <span className="text-xs font-bold text-gray-700">الكمية:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white border border-gray-200 hover:border-orange-500 flex items-center justify-center text-gray-600"
              >
                <Minus size={12} />
              </button>
              
              <span className="text-sm md:text-lg font-bold w-6 md:w-8 text-center text-orange-600">
                {localQuantity}
              </span>
              
              <button
                onClick={() => setLocalQuantity(localQuantity + 1)}
                className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white border border-gray-200 hover:border-orange-500 flex items-center justify-center text-gray-600"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {localQuantity > 0 && (
            <div className="text-center pt-1 md:pt-2 border-t border-gray-200">
              <span className="text-xs md:text-sm font-bold text-orange-600">
                {localQuantity * bundle.bundlePrice} ج
              </span>
            </div>
          )}
        </div>

        {/* Add to Cart */}
        <button
          onClick={handleAddToCart}
          disabled={localQuantity <= 0}
          className={`w-full py-1.5 md:py-2 rounded-lg transition-all font-bold text-xs md:text-sm flex items-center justify-center gap-1 md:gap-2 ${
            localQuantity <= 0
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 text-white hover:bg-orange-600'
          }`}
        >
          <ShoppingCart size={14} />
          <span>أضف للسلة</span>
        </button>
      </div>
    </article>
  );
};

export default BundleCard;