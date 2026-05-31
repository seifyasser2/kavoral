import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import {
  X, Star, Plus, Minus, Heart, ShoppingCart,
  Package, AlertCircle, CheckCircle2, Leaf,
  Sparkles, Beaker, ShieldCheck, ArrowRight,
  Droplets, FlaskConical, Info, ChevronDown
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';

// ─────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────
const TAB_CONFIG = [
  { key: 'skin',        label: 'للبشرة',      icon: Sparkles,      color: 'emerald' },
  { key: 'hair',        label: 'للشعر',       icon: Droplets,      color: 'blue'    },
  { key: 'info',        label: 'عن المنتج',   icon: Info,          color: 'amber'   },
  { key: 'ingredients', label: 'المكونات',    icon: FlaskConical,  color: 'violet'  },
  { key: 'benefits',    label: 'الفوائد',     icon: CheckCircle2,  color: 'teal'    },
  { key: 'warnings',    label: 'تنبيهات',     icon: AlertCircle,   color: 'red'     },
];

const COLOR_MAP = {
  emerald: { bg: 'bg-emerald-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', dot: 'bg-emerald-400' },
  blue:    { bg: 'bg-blue-500',    light: 'bg-blue-50',    text: 'text-blue-700',    border: 'border-blue-200',    dot: 'bg-blue-400'    },
  amber:   { bg: 'bg-amber-500',   light: 'bg-amber-50',   text: 'text-amber-700',   border: 'border-amber-200',   dot: 'bg-amber-400'   },
  violet:  { bg: 'bg-violet-500',  light: 'bg-violet-50',  text: 'text-violet-700',  border: 'border-violet-200',  dot: 'bg-violet-400'  },
  teal:    { bg: 'bg-teal-500',    light: 'bg-teal-50',    text: 'text-teal-700',    border: 'border-teal-200',    dot: 'bg-teal-400'    },
  red:     { bg: 'bg-red-500',     light: 'bg-red-50',     text: 'text-red-700',     border: 'border-red-200',     dot: 'bg-red-400'     },
};

// ─────────────────────────────────────────────────────────────
// STAR RATING
// ─────────────────────────────────────────────────────────────
const StarRating = ({ rating, reviews }) => (
  <div className="flex items-center gap-2">
    <div className="flex gap-0.5">
      {[1,2,3,4,5].map(i => (
        <Star
          key={i}
          size={14}
          className={i <= Math.floor(rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
        />
      ))}
    </div>
    <span className="text-sm font-black text-gray-800">{rating}</span>
    <span className="text-xs text-gray-400">({reviews?.toLocaleString()} تقييم)</span>
  </div>
);

// ─────────────────────────────────────────────────────────────
// IMAGE PANEL
// ─────────────────────────────────────────────────────────────
const ImagePanel = ({ product, isInWishlist, onToggleWishlist }) => {
  const [loaded, setLoaded] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const imgRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  };

  return (
    <div className="relative">
      {/* Main image card */}
      <div
        className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-slate-50 to-stone-100 shadow-2xl group cursor-zoom-in"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => setMousePos({ x: 50, y: 50 })}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
          style={{
            background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(16,185,129,0.12) 0%, transparent 60%)`,
          }}
        />

        {/* Loading shimmer */}
        {!loaded && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 via-gray-200 to-gray-100" />
        )}

        {product.image?.startsWith('http') && (
          <img
            ref={imgRef}
            src={product.image}
            alt={product.name}
            onLoad={() => setLoaded(true)}
            className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 ${loaded ? 'opacity-100' : 'opacity-0'}`}
          />
        )}

        {(!product.image?.startsWith('http') || !loaded) && (
          <div className="absolute inset-0 flex items-center justify-center text-8xl select-none">
            {product.imageAlt || '🌿'}
          </div>
        )}

        {/* Discount badge */}
        {product.originalPrice > product.price && (
          <div className="absolute top-5 right-5 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-2xl shadow-lg rotate-[-2deg]">
            خصم {product.totalDiscountPercentage}%
          </div>
        )}

        {/* Natural badge */}
        <div className="absolute bottom-5 inset-x-5">
          <div className="bg-white/80 backdrop-blur-md border border-white/60 rounded-2xl px-4 py-2.5 flex items-center justify-center gap-2 shadow-lg">
            <ShieldCheck size={16} className="text-emerald-600" />
            <span className="text-sm font-black text-emerald-800">منتج طبيعي 100% معصور على البارد</span>
          </div>
        </div>
      </div>

      {/* Wishlist floating button */}
      <button
        onClick={onToggleWishlist}
        className={`absolute top-5 left-5 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-300 shadow-xl active:scale-90 ${
          isInWishlist
            ? 'bg-red-500 text-white scale-110'
            : 'bg-white/90 backdrop-blur text-gray-400 hover:text-red-400 hover:scale-110'
        }`}
      >
        <Heart size={20} fill={isInWishlist ? 'currentColor' : 'none'} strokeWidth={2.5} />
      </button>

      {/* Side decorative dots */}
      <div className="absolute -left-4 top-1/3 flex flex-col gap-2">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="w-1.5 h-1.5 rounded-full bg-emerald-200" />
        ))}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// QUANTITY SELECTOR
// ─────────────────────────────────────────────────────────────
const QuantitySelector = ({ value, onChange }) => (
  <div className="flex items-center bg-gray-50 border-2 border-gray-100 rounded-2xl overflow-hidden">
    <button
      onClick={() => onChange(Math.max(1, value - 1))}
      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-red-500 hover:bg-red-50 transition-all active:scale-90"
    >
      <Minus size={18} />
    </button>
    <span className="w-14 text-center text-xl font-black text-gray-800">{value}</span>
    <button
      onClick={() => onChange(value + 1)}
      className="w-12 h-12 flex items-center justify-center text-gray-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all active:scale-90"
    >
      <Plus size={18} />
    </button>
  </div>
);

// ─────────────────────────────────────────────────────────────
// PRICE BLOCK
// ─────────────────────────────────────────────────────────────
const PriceBlock = ({ product, quantity }) => {
  const hasDiscount = product.originalPrice > product.price;
  const savingsPerUnit = hasDiscount ? product.originalPrice - product.price : 0;
  const totalSavings = savingsPerUnit * quantity;
  const totalPrice = product.price * quantity;

  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a4a2f] via-[#0d6b42] to-[#1a8f58] p-4 text-white shadow-lg shadow-emerald-100">
      {/* Pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
          backgroundSize: '20px 20px',
        }}
      />
      <div className="relative">
        {/* سعر الوحدة + الأصلي */}
        <div className="flex items-center justify-between mb-1">
          <p className="text-emerald-200 text-[10px] font-bold uppercase tracking-widest">السعر الحالي</p>
          {hasDiscount && (
            <span className="text-white/40 text-xs line-through">{product.originalPrice} ج</span>
          )}
        </div>
        <div className="flex items-baseline gap-2 mb-3">
          <span className="text-3xl font-black leading-none">{product.price}</span>
          <span className="text-sm text-emerald-200">ج.م / قطعة</span>
        </div>

        {/* الإجمالي دايماً ظاهر */}
        <div className="bg-white/10 rounded-xl px-3 py-2.5 flex items-center justify-between">
          <span className="text-emerald-200 text-xs font-semibold">{quantity} قطعة × {product.price} ج</span>
          <span className="text-white font-black text-lg">{totalPrice} ج.م</span>
        </div>

        {hasDiscount && (
          <div className="mt-2.5 inline-flex items-center gap-1.5 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-xl">
            <Sparkles size={13} className="text-amber-300" />
            <span className="text-sm font-black text-amber-200">وفرت {totalSavings} جنيه</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// TAB CONTENT
// ─────────────────────────────────────────────────────────────
const BenefitsList = ({ items, color }) => {
  const c = COLOR_MAP[color];
  return (
    <div className="space-y-3">
      {items.map((item, i) => (
        <div
          key={i}
          className={`flex items-start gap-3 p-4 ${c.light} rounded-2xl border ${c.border} group hover:shadow-sm transition-all`}
        >
          <div className={`w-5 h-5 rounded-full ${c.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
            <CheckCircle2 size={12} className="text-white" />
          </div>
          <p className={`text-sm font-semibold ${c.text} leading-relaxed`}>{item}</p>
        </div>
      ))}
    </div>
  );
};

const UsageBox = ({ text, color }) => {
  const c = COLOR_MAP[color];
  return (
    <div className={`${c.light} border-2 ${c.border} rounded-3xl p-6`}>
      <div className="flex items-center gap-2 mb-3">
        <Beaker size={16} className={c.text} />
        <span className={`text-xs font-black uppercase tracking-widest ${c.text}`}>طريقة الاستخدام</span>
      </div>
      <p className="text-gray-700 text-sm leading-loose font-medium italic">"{text}"</p>
    </div>
  );
};

const TabContent = ({ activeTab, product }) => {
  const content = {
    skin: product.benefitsSkin?.length > 0 && (
      <div className="grid md:grid-cols-2 gap-6">
        <BenefitsList items={product.benefitsSkin} color="emerald" />
        <UsageBox text={product.usageSkin} color="emerald" />
      </div>
    ),
    hair: product.benefitsHair?.length > 0 && (
      <div className="grid md:grid-cols-2 gap-6">
        <BenefitsList items={product.benefitsHair} color="blue" />
        <UsageBox text={product.usageHair} color="blue" />
      </div>
    ),
    info: product.info && (
      <div className="max-w-2xl mx-auto text-center space-y-6">
        <div className="w-16 h-16 bg-amber-50 border-2 border-amber-200 rounded-3xl flex items-center justify-center mx-auto">
          <Info size={28} className="text-amber-600" />
        </div>
        <p className="text-gray-700 text-base leading-loose font-medium">{product.info}</p>
        {product.usage && (
          <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 text-right">
            <p className="text-xs font-black text-amber-700 uppercase tracking-widest mb-2">نصيحة ذهبية</p>
            <p className="text-amber-900 font-bold text-sm leading-relaxed">{product.usage}</p>
          </div>
        )}
      </div>
    ),
    ingredients: product.ingredients?.length > 0 && (
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {product.ingredients.map((item, i) => (
          <div key={i} className="flex items-center gap-3 bg-violet-50 border border-violet-100 rounded-2xl p-3.5 hover:shadow-sm transition-all">
            <div className="w-8 h-8 bg-violet-100 rounded-xl flex items-center justify-center flex-shrink-0">
              <Leaf size={15} className="text-violet-600" />
            </div>
            <span className="text-xs font-bold text-violet-800 leading-snug">{item}</span>
          </div>
        ))}
      </div>
    ),
    benefits: product.benefits?.length > 0 && (
      <div className="grid sm:grid-cols-2 gap-3">
        {product.benefits.map((b, i) => (
          <div key={i} className="flex items-start gap-3 bg-teal-50 border border-teal-100 rounded-2xl p-4">
            <CheckCircle2 size={18} className="text-teal-500 flex-shrink-0 mt-0.5" />
            <p className="text-sm font-semibold text-teal-800 leading-relaxed">{b}</p>
          </div>
        ))}
      </div>
    ),
    warnings: product.warnings?.length > 0 && (
      <div className="max-w-xl mx-auto">
        <div className="bg-red-50 border-2 border-red-100 rounded-3xl p-6">
          <div className="flex items-center gap-2 text-red-700 mb-5 justify-center">
            <AlertCircle size={22} />
            <span className="font-black text-base">تعليمات السلامة</span>
          </div>
          <div className="space-y-3">
            {product.warnings.map((w, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-red-100 rounded-xl p-3.5">
                <div className="w-2 h-2 rounded-full bg-red-400 flex-shrink-0" />
                <span className="text-sm font-bold text-red-800">{w}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    ),
  };

  return (
    <div className="min-h-[200px] animate-fade-in">
      {content[activeTab] || (
        <div className="text-center py-12 text-gray-400">
          <p className="text-sm">لا توجد بيانات متاحة</p>
        </div>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
const ProductDetailsPage = () => {
  const { state, dispatch, toggleWishlist, navigateTo } = useAppContext();
  const product = state.selectedProduct;
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const contentRef = useRef(null);

  const closeModal = useCallback(() => {
    dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null });
    navigateTo('products');
  }, [dispatch, navigateTo]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') closeModal(); };
    if (product) {
      document.addEventListener('keydown', handler);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handler);
      document.body.style.overflow = 'unset';
    };
  }, [product, closeModal]);

  // Auto-select first available tab
  useEffect(() => {
    if (!product) return;
    const checks = [
      ['skin',        product.benefitsSkin?.length > 0],
      ['hair',        product.benefitsHair?.length > 0],
      ['info',        !!product.info],
      ['ingredients', product.ingredients?.length > 0],
      ['benefits',    product.benefits?.length > 0],
      ['warnings',    product.warnings?.length > 0],
    ];
    const first = checks.find(([, ok]) => ok);
    if (first) setActiveTab(first[0]);
  }, [product]);

  const availableTabs = useMemo(() => {
    if (!product) return [];
    return TAB_CONFIG.filter(tab => {
      if (tab.key === 'skin')        return product.benefitsSkin?.length > 0;
      if (tab.key === 'hair')        return product.benefitsHair?.length > 0;
      if (tab.key === 'info')        return !!product.info;
      if (tab.key === 'ingredients') return product.ingredients?.length > 0;
      if (tab.key === 'benefits')    return product.benefits?.length > 0;
      if (tab.key === 'warnings')    return product.warnings?.length > 0;
      return false;
    });
  }, [product]);

  const handleAddToCart = useCallback(async () => {
    if (!product.inStock) return;
    setIsAdding(true);
    await new Promise(r => setTimeout(r, 300));
    dispatch({ type: 'ADD_TO_CART', payload: { ...product, quantity } });
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `✅ تم إضافة ${quantity} × ${product.name}`, type: 'success' },
    });
    setIsAdding(false);
    setQuantity(1);
  }, [product, quantity, dispatch]);

  const isInWishlist = useMemo(
    () => state.wishlist.some(i => i.id === product?.id),
    [state.wishlist, product?.id]
  );

  if (!product) return null;

  const hasDiscount = product.originalPrice > product.price;

  return (
    <div
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/70 backdrop-blur-md overflow-y-auto p-2 sm:p-4"
      onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}
    >
      <div
        className="relative bg-white w-full max-w-5xl rounded-[2.5rem] shadow-2xl overflow-hidden my-auto"
        style={{ maxHeight: '95vh', overflowY: 'auto' }}
        onClick={e => e.stopPropagation()}
      >
        {/* ── Close button ── */}
        <button
          onClick={closeModal}
          className="absolute top-5 left-5 z-50 w-11 h-11 bg-gray-100 hover:bg-red-50 text-gray-500 hover:text-red-500 rounded-2xl flex items-center justify-center transition-all duration-200 hover:rotate-90 active:scale-90"
        >
          <X size={20} />
        </button>

        {/* ── Breadcrumb ── */}
        <div className="absolute top-5 right-5 z-50 flex items-center gap-1.5 text-xs text-gray-400 font-semibold">
          <button onClick={closeModal} className="hover:text-emerald-600 transition-colors">المنتجات</button>
          <ArrowRight size={12} />
          <span className="text-gray-600 max-w-[120px] truncate">{product.name}</span>
        </div>

        {/* ── HERO SECTION ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 p-6 sm:p-10 pt-16">

          {/* Left: Image */}
          <ImagePanel
            product={product}
            isInWishlist={isInWishlist}
            onToggleWishlist={() => toggleWishlist(product)}
          />

          {/* Right: Info */}
          <div className="flex flex-col gap-5">

            {/* Categories */}
            <div className="flex flex-wrap gap-2">
              {product.categories?.map((cat, i) => (
                <span key={i} className="text-[10px] uppercase tracking-[0.15em] font-black text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                  {cat}
                </span>
              ))}
            </div>

            {/* Name */}
            <div>
              <h1 className="text-3xl sm:text-4xl font-black text-gray-900 leading-tight mb-3">
                {product.name}
              </h1>
              <StarRating rating={product.rating || 4.9} reviews={product.reviews || 120} />
            </div>

            {/* Description */}
            {product.description && (
              <p className="text-gray-500 text-sm leading-relaxed border-r-4 border-emerald-200 pr-4">
                {product.description}
              </p>
            )}

            {/* Size chip */}
            <div className="flex items-center gap-2">
              <Package size={15} className="text-gray-400" />
              <span className="text-sm font-bold text-gray-600">{product.size}</span>
              {product.inStock ? (
                <span className="text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2.5 py-0.5 rounded-full">متوفر</span>
              ) : (
                <span className="text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-2.5 py-0.5 rounded-full">غير متوفر</span>
              )}
            </div>

            {/* Price */}
            <PriceBlock product={product} quantity={quantity} />

            {/* Quantity + CTA */}
            <div className="flex items-center gap-3">
              <QuantitySelector value={quantity} onChange={setQuantity} />
              <button
                onClick={handleAddToCart}
                disabled={!product.inStock || isAdding}
                className={`flex-1 flex items-center justify-center gap-2.5 py-3.5 rounded-2xl font-black text-base transition-all duration-300 active:scale-[0.97] shadow-lg ${
                  isAdding
                    ? 'bg-emerald-400 text-white cursor-wait shadow-emerald-200'
                    : !product.inStock
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed shadow-none'
                    : 'bg-gray-900 text-white hover:bg-gray-800 shadow-gray-300 hover:shadow-xl hover:shadow-gray-200'
                }`}
              >
                {isAdding ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الإضافة...
                  </>
                ) : (
                  <>
                    <ShoppingCart size={20} />
                    {product.inStock ? 'أضف للسلة' : 'نفذت الكمية'}
                  </>
                )}
              </button>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-gray-100">
              {[
                { icon: '🌿', text: 'طبيعي 100%' },
                { icon: '🚚', text: 'توصيل سريع' },
                { icon: '🛡️', text: 'جودة مضمونة' },
              ].map(b => (
                <div key={b.text} className="flex flex-col items-center gap-1 text-center">
                  <span className="text-xl">{b.icon}</span>
                  <span className="text-[10px] font-bold text-gray-500">{b.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── TABS SECTION ── */}
        {availableTabs.length > 0 && (
          <div className="border-t border-gray-100 bg-gray-50/50">
            {/* Tab header */}
            <div className="flex overflow-x-auto no-scrollbar px-6 sm:px-10 pt-6 gap-2">
              {availableTabs.map(tab => {
                const c = COLOR_MAP[tab.color];
                const Icon = tab.icon;
                const isActive = activeTab === tab.key;
                return (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                      isActive
                        ? `${c.bg} text-white shadow-md`
                        : `text-gray-500 hover:${c.light} hover:${c.text}`
                    }`}
                  >
                    <Icon size={14} />
                    {tab.label}
                  </button>
                );
              })}
            </div>

            {/* Tab body */}
            <div ref={contentRef} className="px-6 sm:px-10 py-8">
              <TabContent activeTab={activeTab} product={product} />
            </div>
          </div>
        )}
      </div>

      {/* Inline animation styles */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.3s ease-out both; }
      `}</style>
    </div>
  );
};

export default ProductDetailsPage;