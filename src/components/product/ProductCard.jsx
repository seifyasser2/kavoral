import React, { useState, useMemo, useCallback } from 'react';
import { Heart, Star, ShoppingCart, Eye, Plus, Minus, Check } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';

const ProductCard = ({ product }) => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const isInWishlist = useMemo(
    () => state.wishlist.some(item => item.id === product.id),
    [state.wishlist, product.id]
  );

  const hasDiscount = useMemo(
    () => product.originalPrice && product.originalPrice > product.price,
    [product.originalPrice, product.price]
  );

  const handleDecrease = useCallback(() => {
    setQuantity(q => Math.max(1, q - 1));
  }, []);

  const handleIncrease = useCallback(() => {
    setQuantity(q => Math.min(99, q + 1));
  }, []);

  const handleAddToCart = useCallback(async () => {
    if (!product.inStock || isAdding) return;

    setIsAdding(true);

    await new Promise(resolve => setTimeout(resolve, 250));

    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: `✅ تم إضافة ${quantity > 1 ? quantity + ' × ' : ''}${product.name}`,
        type: 'success'
      }
    });

    setIsAdding(false);
    setJustAdded(true);
    setQuantity(1);
    setTimeout(() => setJustAdded(false), 1800);
  }, [product, quantity, dispatch, isAdding]);

  const handleViewDetails = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product });
    navigateTo('product-details');
  }, [product, dispatch, navigateTo]);

  return (
    <article className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col border border-gray-100 hover:border-emerald-200">

      {/* ── Image ── */}
      <div className="relative">
        <div
          className="relative w-full aspect-square bg-gray-50 overflow-hidden cursor-pointer"
          onClick={handleViewDetails}
        >
          {/* Shimmer */}
          {!imageLoaded && product.image?.startsWith('http') && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
          )}

          {product.image?.startsWith('http') ? (
            <img
              src={product.image}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling?.style && (e.target.nextSibling.style.display = 'flex');
              }}
            />
          ) : null}

          <div
            className={`text-4xl ${
              product.image?.startsWith('http') && imageLoaded ? 'hidden' : 'flex'
            } items-center justify-center w-full h-full`}
          >
            {product.imageAlt || '🌿'}
          </div>

          {/* View overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
            <div className="bg-white text-gray-700 text-xs font-bold px-3 py-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5 shadow-lg">
              <Eye size={12} /> عرض التفاصيل
            </div>
          </div>
        </div>

        {/* Badges row */}
        <div className="absolute top-2 inset-x-2 flex justify-between items-start">
          {/* Wishlist */}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist(product); }}
            className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-200 shadow-sm active:scale-90 ${
              isInWishlist
                ? 'bg-red-500 text-white'
                : 'bg-white/90 backdrop-blur text-gray-400 hover:text-red-400'
            }`}
          >
            <Heart size={15} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={2.5} />
          </button>

          {/* Discount */}
          {hasDiscount && (
            <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full shadow-sm">
              {product.totalDiscountPercentage}%
            </span>
          )}
        </div>
      </div>

      {/* ── Info ── */}
      <div className="px-3 pt-2.5 pb-3 flex flex-col flex-1 gap-2">

        {/* Name + size */}
        <div className="cursor-pointer" onClick={handleViewDetails}>
          <h3 className="text-sm font-black text-gray-900 leading-snug line-clamp-2 mb-0.5">
            {product.name}
          </h3>
          <p className="text-[11px] text-gray-400 font-semibold">{product.size}</p>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={11}
              className={i < Math.floor(product.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
            />
          ))}
          <span className="text-[11px] font-bold text-gray-600 mr-0.5">{product.rating}</span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-1.5">
            <span className="text-lg font-black text-emerald-700">{product.price}</span>
            <span className="text-xs text-gray-400 font-semibold">ج.م</span>
          </div>
          {hasDiscount && (
            <span className="text-xs text-gray-400 line-through font-semibold">
              {product.originalPrice} ج
            </span>
          )}
        </div>

        {/* ── Quantity Counter ── */}
        {product.inStock && (
          <div className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-xl px-1 py-1">
            <button
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
            >
              <Minus size={13} strokeWidth={2.5} />
            </button>

            <div className="flex flex-col items-center min-w-[2rem]">
              <span className="text-base font-black text-gray-800 leading-none">{quantity}</span>
              {quantity > 1 && (
                <span className="text-[9px] text-emerald-600 font-bold leading-none mt-0.5">
                  {quantity * product.price} ج
                </span>
              )}
            </div>

            <button
              onClick={handleIncrease}
              disabled={quantity >= 99}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all disabled:opacity-30 disabled:cursor-not-allowed active:scale-90"
            >
              <Plus size={13} strokeWidth={2.5} />
            </button>
          </div>
        )}

        {/* ── Add to cart button ── */}
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || isAdding}
          className={`w-full py-2.5 rounded-xl font-black text-xs flex items-center justify-center gap-1.5 transition-all duration-300 active:scale-[0.97] ${
            justAdded
              ? 'bg-emerald-500 text-white'
              : isAdding
              ? 'bg-emerald-400 text-white cursor-wait'
              : !product.inStock
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
              : 'bg-gray-900 text-white hover:bg-gray-800 shadow-md hover:shadow-lg'
          }`}
        >
          {justAdded ? (
            <>
              <Check size={14} strokeWidth={3} />
              تمت الإضافة!
            </>
          ) : isAdding ? (
            <>
              <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
              جاري...
            </>
          ) : !product.inStock ? (
            'غير متوفر'
          ) : (
            <>
              <ShoppingCart size={14} strokeWidth={2.5} />
              {quantity > 1 ? `أضف ${quantity} للسلة` : 'أضف للسلة'}
            </>
          )}
        </button>
      </div>
    </article>
  );
};

export default ProductCard;