import React, { useCallback, useState } from 'react';
import { ShoppingCart, Star, Eye } from 'lucide-react'; // Removed Plus, Minus, Package
import { useAppContext } from '../../context/AppContext';
// import { getProductById } from '../../data/products'; // Not needed since product details are removed

const BundleCard = ({ bundle }) => {
  const { dispatch, navigateTo } = useAppContext();
  // Removed localQuantity state and related logic

  // Removed bundleProducts logic as the section is removed
  // const bundleProducts = bundle.products.map(id => getProductById(id)).filter(p => p !== null);

  const [imageLoaded, setImageLoaded] = useState(false);

  const handleAddToCart = useCallback(() => {
    // Simplified logic: always add 1 unit of the bundle

    const quantityToAdd = 1;

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
      payload: bundleItem,
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `✅ تم إضافة ${quantityToAdd} × ${bundle.name}`, type: 'success' },
    });
  }, [bundle, dispatch]); // localQuantity removed from dependencies

  const handleViewDetails = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_BUNDLE', payload: bundle });
    navigateTo('bundle-details');
  }, [bundle, dispatch, navigateTo]);

  return (
    <article className="group bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden h-full flex flex-col border border-gray-100">
      {/* Image Section */}
      <div className="relative mb-2">
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

          <div
            className={`text-4xl ${
              bundle.image && bundle.image.startsWith('http') && imageLoaded ? 'hidden' : 'flex'
            } items-center justify-center w-full h-full`}
          >
            {bundle.imageAlt || '🎁'}
          </div>
        </div>

        {/* Badges */}
        <div className="absolute top-2 left-2 right-2 flex justify-between items-start z-10 gap-1">
          <div className="flex flex-col gap-1">
            <span className="bg-red-600 text-white text-xs font-extrabold px-2 py-0.5 rounded-full whitespace-nowrap shadow-md">
              خصم {bundle.totalDiscountPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="px-3 pb-3 flex-grow flex flex-col">
        <div className="cursor-pointer mb-2 flex-grow" onClick={handleViewDetails}>
          <h3 className="text-base font-extrabold text-gray-900 mb-1 line-clamp-2 leading-snug">
            {bundle.name}
          </h3>

          <p className="text-sm text-gray-500 mb-2 line-clamp-2">{bundle.description}</p>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={14}
                className={
                  i < Math.floor(bundle.ratings) ? 'text-orange-400 fill-current' : 'text-gray-300'
                }
              />
            ))}
            <span className="text-sm font-semibold text-gray-700 mr-1">{bundle.ratings}</span>
            <span className="text-sm text-gray-500">
              ({bundle.products.length} منتجات في الباقة)
            </span>
          </div>

          {/* Price - Emphasized for modern look */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-3">
            <div className="flex items-end justify-between">
              <div className="flex flex-col">
                <span className="text-xs text-gray-600 font-medium">سعر الباقة:</span>
                <span className="text-xl font-black text-orange-700 leading-none">
                 {bundle.bundlePrice} ج
                </span>
              </div>
              <div className="flex flex-col items-end">
                <span className="text-xs text-gray-500">السعر الأصلي:</span>
                <span className="text-base text-gray-600 font-semibold line-through">
                  {bundle.originalPrice} ج
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handleViewDetails}
            className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 rounded-lg transition-colors font-semibold text-sm flex items-center justify-center gap-1"
            type="button"
          >
            <Eye size={16} />
            تفاصيل الباقة
          </button>

          <button
            onClick={handleAddToCart}
            className="flex-1 py-2 rounded-lg transition-all font-bold text-sm flex items-center justify-center gap-1 bg-orange-600 text-white hover:bg-orange-700 shadow-md"
            type="button"
          >
            <ShoppingCart size={16} />
            أضف إلى السلة
          </button>
        </div>
      </div>
    </article>
  );
};

export default BundleCard;