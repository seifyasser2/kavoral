import React, { useState, useCallback } from 'react';
import { ShoppingCart, Plus, Minus, Star, Eye, Package } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getProductById } from '../../data/products';

const BundleCard = ({ bundle }) => {
  const { state, dispatch, navigateTo } = useAppContext();
  const [localQuantity, setLocalQuantity] = useState(0);
  const [imageLoaded, setImageLoaded] = useState(false);

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

  const handleViewDetails = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_BUNDLE', payload: bundle });
    navigateTo('bundle-details');
  }, [bundle, dispatch, navigateTo]);

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col border border-gray-100">
      {/* Image Section */}
      <div className="relative mb-1.5 md:mb-2">
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
          
          <div className={`text-4xl ${bundle.image && bundle.image.startsWith('http') && imageLoaded ? 'hidden' : 'flex'} items-center justify-center w-full h-full`}>
            {bundle.imageAlt || '🎁'}
          </div>
        </div>
        
        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 gap-1">
          <div className="flex flex-col gap-1">
            {/* {bundle.featured && (
              <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
                ⭐
              </span>
            )} */}
            <span className="bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap">
              خصم {bundle.totalDiscountPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-1.5 md:px-2 pb-1.5 md:pb-2 flex-grow flex flex-col">
        <div 
          className="cursor-pointer mb-1.5 md:mb-2 flex-grow"
          onClick={handleViewDetails}
        >
          <h3 className="text-xs md:text-sm font-bold text-gray-800 mb-0.5 line-clamp-2 leading-tight">
            {bundle.name}
          </h3>
          
          <p className="text-xs text-gray-500 mb-0.5 md:mb-1">{bundle.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-0.5 md:gap-1 mb-0.5 md:mb-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={10}
                className={i < Math.floor(bundle.ratings) ? 'text-yellow-400 fill-current' : 'text-gray-300'}
              />
            ))}
            <span className="text-xs text-gray-600 mr-0.5">{bundle.ratings}</span>
          </div>

          {/* Products List */}
          <div className="bg-gray-50 border border-gray-100 rounded-lg p-1.5 md:p-2 mb-2 md:mb-3">
            <div className="flex items-center gap-1 md:gap-2 mb-1">
              <Package size={12} className="text-orange-600 flex-shrink-0" />
              <span className="text-xs font-bold text-gray-700">{bundleProducts.length} منتجات</span>
            </div>
            <div className="space-y-0.5">
              {bundleProducts.slice(0, 2).map((product, idx) => (
                <p key={idx} className="text-xs text-gray-700 flex items-start gap-1">
                  <span className="text-gray-400 flex-shrink-0">•</span>
                  <span className="line-clamp-1">{product.name}</span>
                </p>
              ))}
              {bundleProducts.length > 2 && (
                <p className="text-xs text-orange-600 font-bold">+{bundleProducts.length - 2} منتجات أخرى</p>
              )}
            </div>
          </div>

          {/* Price */}
          <div className="bg-orange-50 border border-orange-100 rounded-lg p-1.5 md:p-2 mb-2 md:mb-3">
            <div className="flex items-center justify-between">
              <span className="text-sm md:text-base font-bold text-orange-700">
                {bundle.bundlePrice} ج
              </span>
              <span className="text-gray-700 line-through font-semibold">
                {bundle.originalPrice} ج
              </span>
            </div>
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="bg-gray-50 rounded-lg p-1.5 md:p-2 mb-1.5 md:mb-2">
          <div className="flex items-center justify-between mb-1.5 md:mb-2">
            <span className="text-xs font-semibold text-gray-700">الكمية:</span>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setLocalQuantity(Math.max(0, localQuantity - 1))}
                disabled={localQuantity <= 0}
                className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white border border-gray-200 hover:border-orange-500 disabled:opacity-50 flex items-center justify-center transition-colors text-gray-600"
                type="button"
              >
                <Minus size={12} />
              </button>
              
              <span className="text-sm md:text-base font-bold w-6 md:w-8 text-center text-orange-600">
                {localQuantity}
              </span>
              
              <button
                onClick={() => setLocalQuantity(localQuantity + 1)}
                className="w-6 h-6 md:w-7 md:h-7 rounded-lg bg-white border border-gray-200 hover:border-orange-500 flex items-center justify-center transition-colors text-gray-600"
                type="button"
              >
                <Plus size={12} />
              </button>
            </div>
          </div>

          {localQuantity > 0 && (
            <div className="text-center pt-1 md:pt-2 border-t border-gray-200">
              <span className="text-orange-600 font-bold text-xs md:text-sm">
                {localQuantity * bundle.bundlePrice} ج
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
            disabled={localQuantity <= 0}
            className={`flex-[2] py-1.5 md:py-2 px-1.5 md:px-2 rounded-lg transition-all font-bold text-xs flex items-center justify-center gap-0.5 ${
              localQuantity <= 0
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-orange-500 text-white hover:bg-orange-600'
            }`}
            type="button"
          >
            <ShoppingCart size={12} />
            <span>أضف</span>
          </button>
        </div>
      </div>
    </article>
  );
};

export default BundleCard;