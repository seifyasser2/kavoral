import React, { useMemo, useState, useRef, useEffect } from 'react';
import {
  Package, Leaf, Shield, Truck, TrendingUp,
  Search, X, SlidersHorizontal, Sparkles, Star,
  ChevronDown, Grid3X3, LayoutList, Filter, Flame, Tag
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { SITE_CONFIG } from '../data/config';
import { PRODUCTS_DATA } from '../data/products';
import ProductCard from '../components/product/ProductCard';
import { LoadingSpinner, EmptyState } from '../components/common';

// ─────────────────────────────────────────────────────────────
// TABS CONFIG
// ─────────────────────────────────────────────────────────────
const TABS = [
  { id: 'all',    label: 'الكل',             icon: Grid3X3,       emoji: '🌿' },
  { id: 'oils',   label: 'زيوت طبيعية',      icon: Leaf,          emoji: '💧' },
  { id: 'blends', label: 'خلطات وتغذية',     icon: Sparkles,      emoji: '✨' },
  { id: 'offers', label: 'عروض وخصومات',     icon: Flame,         emoji: '🔥' },
];

const SORT_OPTIONS = [
  { id: 'default',  label: 'الافتراضي' },
  { id: 'price_asc',  label: 'السعر: الأقل أولاً' },
  { id: 'price_desc', label: 'السعر: الأعلى أولاً' },
  { id: 'rating',     label: 'الأعلى تقييماً' },
  { id: 'discount',   label: 'أعلى خصم' },
];

// ─────────────────────────────────────────────────────────────
// ANIMATED COUNTER
// ─────────────────────────────────────────────────────────────
const AnimatedCounter = ({ target, suffix = '' }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        let start = 0;
        const duration = 1200;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          start += step;
          if (start >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(start));
        }, 16);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
};

// ─────────────────────────────────────────────────────────────
// HERO SECTION
// ─────────────────────────────────────────────────────────────
const HeroSection = () => (
  <div className="relative overflow-hidden bg-gradient-to-br from-[#0a4a2f] via-[#0d6b42] to-[#1a8f58]">
    {/* Decorative blobs */}
    <div className="absolute -top-32 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
    <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-emerald-300/10 rounded-full blur-3xl" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/[0.02] rounded-full" />

    {/* Grid pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.04]"
      style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }}
    />

    <div className="relative container mx-auto px-4 py-16 md:py-20">
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 text-emerald-200 text-xs font-bold px-4 py-2 rounded-full tracking-widest uppercase">
          <Sparkles size={12} />
          منتجات طبيعية معصورة على البارد
        </span>
      </div>

      {/* Title */}
      <h1 className="text-center text-white mb-4">
        <span className="block text-4xl md:text-6xl font-black leading-tight tracking-tight">
          مجموعتنا الكاملة
        </span>
        <span className="block text-lg md:text-2xl text-emerald-300 font-medium mt-2">
          من أجود الزيوت والخلطات الطبيعية
        </span>
      </h1>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-10">
        {[
          { label: 'منتج طبيعي', value: 17, suffix: '+', icon: '🌿' },
          { label: 'عميل سعيد',  value: 5000, suffix: '+', icon: '❤️' },
          { label: 'تقييم',       value: 4.9, suffix: '★', icon: '⭐' },
        ].map((s) => (
          <div
            key={s.label}
            className="text-center bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-4 hover:bg-white/15 transition-all duration-300"
          >
            <div className="text-2xl mb-1">{s.icon}</div>
            <div className="text-2xl md:text-3xl font-black text-white">
              <AnimatedCounter target={s.value} suffix={s.suffix} />
            </div>
            <div className="text-xs text-emerald-200 font-medium mt-0.5">{s.label}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Bottom wave */}
    <div className="absolute bottom-0 left-0 right-0">
      <svg viewBox="0 0 1440 40" preserveAspectRatio="none" className="w-full h-10 fill-white">
        <path d="M0,40 C360,0 1080,0 1440,40 L1440,40 L0,40 Z" />
      </svg>
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// FILTER BAR
// ─────────────────────────────────────────────────────────────
const FilterBar = ({ activeTab, setActiveTab, searchTerm, setSearchTerm, sortBy, setSortBy, totalCount, filteredCount, dispatch }) => {
  const [sortOpen, setSortOpen] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const sortRef = useRef(null);

  useEffect(() => {
    const handler = (e) => { if (sortRef.current && !sortRef.current.contains(e.target)) setSortOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const currentSort = SORT_OPTIONS.find(o => o.id === sortBy) || SORT_OPTIONS[0];

  return (
    <div className="sticky top-[72px] z-20 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
      <div className="container mx-auto px-4">

        {/* Main tabs row */}
        <div className="flex items-center gap-1 overflow-x-auto py-3 no-scrollbar">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl font-bold text-sm whitespace-nowrap transition-all duration-200 flex-shrink-0 ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-200'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <span>{tab.emoji}</span>
              {tab.label}
              {activeTab === tab.id && filteredCount > 0 && (
                <span className="bg-white/25 text-white text-xs font-black px-1.5 py-0.5 rounded-full ml-0.5">
                  {filteredCount}
                </span>
              )}
            </button>
          ))}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Filter toggle (mobile) */}
          <button
            onClick={() => setFiltersVisible(v => !v)}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl font-bold text-sm border transition-all flex-shrink-0 ${
              filtersVisible ? 'border-emerald-500 text-emerald-600 bg-emerald-50' : 'border-gray-200 text-gray-600 hover:border-gray-300'
            }`}
          >
            <SlidersHorizontal size={15} />
            فلترة
          </button>
        </div>

        {/* Expanded filter area */}
        {filtersVisible && (
          <div className="pb-3 pt-1 border-t border-gray-100 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center animate-fade-in">
            {/* Search */}
            <div className="relative flex-1">
              <Search size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="ابحث في المنتجات..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  if (dispatch) dispatch({ type: 'SET_SEARCH', payload: e.target.value });
                }}
                className="w-full pr-9 pl-10 py-2.5 border-2 border-gray-200 rounded-xl text-sm focus:border-emerald-400 focus:outline-none transition-colors bg-gray-50 focus:bg-white"
              />
              {searchTerm && (
                <button
                  onClick={() => {
                    setSearchTerm('');
                    if (dispatch) dispatch({ type: 'SET_SEARCH', payload: '' });
                  }}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-red-500"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Sort dropdown */}
            <div className="relative flex-shrink-0" ref={sortRef}>
              <button
                onClick={() => setSortOpen(v => !v)}
                className="flex items-center gap-2 px-4 py-2.5 border-2 border-gray-200 rounded-xl text-sm font-semibold text-gray-700 hover:border-emerald-400 transition-colors bg-gray-50 min-w-[160px] justify-between"
              >
                <span className="flex items-center gap-1.5"><Filter size={14} /> {currentSort.label}</span>
                <ChevronDown size={14} className={`transition-transform ${sortOpen ? 'rotate-180' : ''}`} />
              </button>
              {sortOpen && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl z-50 overflow-hidden w-48">
                  {SORT_OPTIONS.map(opt => (
                    <button
                      key={opt.id}
                      onClick={() => { setSortBy(opt.id); setSortOpen(false); }}
                      className={`w-full text-right px-4 py-2.5 text-sm font-semibold hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${
                        sortBy === opt.id ? 'bg-emerald-50 text-emerald-700' : 'text-gray-700'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// RESULTS BAR
// ─────────────────────────────────────────────────────────────
const ResultsBar = ({ count, searchTerm, activeTab, onClear }) => {
  if (!searchTerm && activeTab === 'all') return null;
  return (
    <div className="flex items-center justify-between mb-6 bg-emerald-50 border border-emerald-100 rounded-xl px-4 py-3 animate-fade-in">
      <div className="flex items-center gap-2 text-sm text-emerald-800 font-semibold">
        <Tag size={15} />
        {searchTerm ? (
          <span>نتائج "<span className="font-black">{searchTerm}</span>": {count} منتج</span>
        ) : (
          <span>{count} منتج</span>
        )}
      </div>
      {(searchTerm || activeTab !== 'all') && (
        <button onClick={onClear} className="text-xs text-emerald-600 hover:text-emerald-800 font-bold flex items-center gap-1 border border-emerald-200 px-2.5 py-1 rounded-lg hover:bg-emerald-100 transition-colors">
          <X size={11} /> مسح
        </button>
      )}
    </div>
  );
};

// ─────────────────────────────────────────────────────────────
// TRUST STRIP
// ─────────────────────────────────────────────────────────────
const TrustStrip = () => (
  <div className="border-t border-gray-100 mt-16 pt-10">
    <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto text-center">
      {[
        { icon: '🌿', title: 'طبيعي 100%', desc: 'معصور على البارد' },
        { icon: '🛡️', title: 'جودة مضمونة', desc: 'مصادر موثوقة' },
        { icon: '🚚', title: 'توصيل سريع', desc: '24-48 ساعة' },
      ].map((item) => (
        <div
          key={item.title}
          className="group bg-gradient-to-b from-gray-50 to-white border border-gray-100 rounded-2xl p-5 hover:border-emerald-200 hover:shadow-md transition-all duration-300"
        >
          <div className="text-3xl mb-2">{item.icon}</div>
          <p className="font-black text-gray-800 text-sm">{item.title}</p>
          <p className="text-xs text-gray-500 mt-0.5">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

// ─────────────────────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────────────────────
const ProductsPage = () => {
  const { state, dispatch } = useAppContext();
  const [activeTab, setActiveTab] = useState('all');
  const [localSearch, setLocalSearch] = useState(state.searchTerm || '');
  const [sortBy, setSortBy] = useState('default');

  // Sync external search term
  useEffect(() => {
    setLocalSearch(state.searchTerm || '');
  }, [state.searchTerm]);

  const filteredProducts = useMemo(() => {
    const searchTerm = localSearch.toLowerCase().trim();

    let list = PRODUCTS_DATA.filter((product) => {
      // Search filter
      const matchesSearch = !searchTerm ||
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm)) ||
        (product.tags && product.tags.some(tag => tag.toLowerCase().includes(searchTerm)));

      // Tab filter
      const isOil   = product.name.startsWith('زيت') || product.categories.includes('oils');
      const isBlend = product.categories.includes('blends') ||
                      product.categories.includes('nutrition') ||
                      product.name.includes('خلطة') ||
                      product.name.includes('المختوم');
      const hasOffer = product.originalPrice > product.price;

      let matchesTab = true;
      if (activeTab === 'oils')   matchesTab = isOil;
      if (activeTab === 'blends') matchesTab = isBlend;
      if (activeTab === 'offers') matchesTab = hasOffer;

      return matchesSearch && matchesTab;
    });

    // Sort
    if (sortBy === 'price_asc')  list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === 'price_desc') list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === 'rating')     list = [...list].sort((a, b) => (b.rating || 0) - (a.rating || 0));
    if (sortBy === 'discount')   list = [...list].sort((a, b) => (b.totalDiscountPercentage || 0) - (a.totalDiscountPercentage || 0));

    return list;
  }, [localSearch, activeTab, sortBy]);

  const handleClear = () => {
    setLocalSearch('');
    setActiveTab('all');
    if (dispatch) dispatch({ type: 'SET_SEARCH', payload: '' });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <HeroSection />

      {/* Filter bar */}
      <FilterBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={localSearch}
        setSearchTerm={setLocalSearch}
        sortBy={sortBy}
        setSortBy={setSortBy}
        totalCount={PRODUCTS_DATA.length}
        filteredCount={filteredProducts.length}
        dispatch={dispatch}
      />

      {/* Content */}
      <div className="container mx-auto px-4 py-8">

        {/* Results bar */}
        <ResultsBar
          count={filteredProducts.length}
          searchTerm={localSearch}
          activeTab={activeTab}
          onClear={handleClear}
        />

        {/* Featured callout for offers tab */}
        {activeTab === 'offers' && filteredProducts.length > 0 && (
          <div className="mb-8 bg-gradient-to-r from-red-500 to-orange-500 rounded-2xl p-5 text-white flex items-center gap-4">
            <div className="text-4xl">🔥</div>
            <div>
              <p className="font-black text-lg">عروض وخصومات حصرية</p>
              <p className="text-sm text-white/80">
                {filteredProducts.length} منتج بخصم يصل إلى{' '}
                {Math.max(...filteredProducts.map(p => p.totalDiscountPercentage || 0))}%
              </p>
            </div>
          </div>
        )}

        {/* Products grid */}
        {state.isLoading ? (
          <div className="flex justify-center items-center py-24">
            <div className="text-center">
              <LoadingSpinner size={48} />
              <p className="text-gray-500 mt-4 font-semibold">جاري تحميل المنتجات...</p>
            </div>
          </div>
        ) : filteredProducts.length > 0 ? (
          <>
            {/* Count label */}
            <p className="text-xs text-gray-400 font-semibold mb-5">
              عرض {filteredProducts.length} من {PRODUCTS_DATA.length} منتج
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5 mb-12">
              {filteredProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="animate-scale-in"
                  style={{ animationDelay: `${Math.min(index * 40, 400)}ms` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="py-20 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-2xl font-black text-gray-700 mb-2">لم نجد ما تبحث عنه</h3>
            <p className="text-gray-400 mb-6 text-sm">
              {localSearch ? `لا توجد نتائج لـ "${localSearch}"` : 'هذا القسم فارغ حالياً'}
            </p>
            <button
              onClick={handleClear}
              className="bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-100"
            >
              عرض جميع المنتجات
            </button>
          </div>
        )}

        {/* Trust strip */}
        <TrustStrip />

      
      </div>
    </div>
  );
};

export default ProductsPage;