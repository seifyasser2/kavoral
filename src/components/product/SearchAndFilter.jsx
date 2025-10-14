import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Search, Filter, X, TrendingUp, DollarSign } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getProductsByCategory, PRODUCTS_DATA } from '../../data/products';
import { CATEGORIES } from '../../data/config';
import { Badge, LoadingSpinner } from '../common';
import ProductCard from './ProductCard';
import { VALIDATION } from '../../constants';
// ============================================
// دالة Debounce لتحسين الأداء
// ============================================
const useDebounce = (value, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(handler);
  }, [value, delay]);

  return debouncedValue;
};

const SearchAndFilter = () => {
  const { state, dispatch } = useAppContext();
  
  // Debounce البحث لتحسين الأداء
  const debouncedSearchTerm = useDebounce(state.searchTerm, 300);

  // استخدم useMemo لحساب المنتجات المفلترة
  const filteredProducts = useMemo(() => {
    return getProductsByCategory(state.selectedCategory).filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) || 
                           product.description.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
                           product.tags.some(tag => tag.toLowerCase().includes(debouncedSearchTerm.toLowerCase()));
      
      const matchesPrice = product.price >= state.priceRange[0] && 
                          product.price <= state.priceRange[1];
      
      return matchesSearch && matchesPrice;
    });
  }, [debouncedSearchTerm, state.selectedCategory, state.priceRange]);

  // استخدم useCallback لتحسين الأداء
  const resetFilters = useCallback(() => {
    dispatch({ type: 'SET_SEARCH', payload: '' });
    dispatch({ type: 'SET_CATEGORY', payload: 'all' });
    dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 300] });
  }, [dispatch]);

 const handleSearchChange = useCallback((e) => {
  const value = e.target.value;
  if (value.length <= VALIDATION.SEARCH.MAX) {
    dispatch({ type: 'SET_SEARCH', payload: value });
  }
}, [dispatch]);

  const handleCategoryChange = useCallback((e) => {
    dispatch({ type: 'SET_CATEGORY', payload: e.target.value });
  }, [dispatch]);

  const handlePriceMinChange = useCallback((e) => {
    const value = parseInt(e.target.value) || 0;
    dispatch({ 
      type: 'SET_PRICE_RANGE', 
      payload: [Math.min(value, state.priceRange[1]), state.priceRange[1]] 
    });
  }, [state.priceRange, dispatch]);

  const handlePriceMaxChange = useCallback((e) => {
    const value = parseInt(e.target.value) || 300;
    dispatch({ 
      type: 'SET_PRICE_RANGE', 
      payload: [state.priceRange[0], Math.max(value, state.priceRange[0])] 
    });
  }, [state.priceRange, dispatch]);

  const hasActiveFilters = state.searchTerm || state.selectedCategory !== 'all' || state.priceRange[0] !== 0 || state.priceRange[1] !== 300;

  // إحصائيات المنتجات المفلترة
  const stats = useMemo(() => ({
    available: filteredProducts.filter(p => p.inStock).length,
    featured: filteredProducts.filter(p => p.featured).length,
    discounted: filteredProducts.filter(p => p.originalPrice > p.price).length
  }), [filteredProducts]);

  return (
    <>
      {/* Filter Panel */}
      <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-gradient-to-br from-green-500 to-teal-500 p-3 rounded-xl">
            <Filter className="text-white" size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-gray-800">فلاتر البحث</h3>
            <p className="text-sm text-gray-600">ابحث عن المنتج المثالي</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative group">
            <Search className="absolute right-3 top-3.5 text-gray-400 group-focus-within:text-green-600 transition-colors" size={20} />
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={state.searchTerm}
              onChange={handleSearchChange}
              maxLength={100}
              className="w-full pr-10 pl-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
              aria-label="البحث عن منتج"
            />
            {state.searchTerm && (
              <button
                onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })}
                className="absolute left-3 top-3.5 text-gray-400 hover:text-red-500 transition-colors"
                aria-label="مسح البحث"
              >
                <X size={20} />
              </button>
            )}
          </div>

          {/* Category Filter */}
          <div className="relative">
            <select
              value={state.selectedCategory}
              onChange={handleCategoryChange}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 appearance-none bg-white cursor-pointer transition-all"
              aria-label="اختر فئة"
            >
              {CATEGORIES.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
            <div className="absolute left-3 top-4 pointer-events-none">
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <DollarSign className="absolute right-3 top-3.5 text-gray-400" size={16} />
              <input
                type="number"
                placeholder="من"
                value={state.priceRange[0]}
                onChange={handlePriceMinChange}
                min="0"
                max="300"
                className="w-full pr-8 pl-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                aria-label="السعر الأدنى"
              />
            </div>
            <span className="text-gray-500 font-bold">-</span>
            <div className="relative flex-1">
              <DollarSign className="absolute right-3 top-3.5 text-gray-400" size={16} />
              <input
                type="number"
                placeholder="إلى"
                value={state.priceRange[1]}
                onChange={handlePriceMaxChange}
                min="0"
                max="300"
                className="w-full pr-8 pl-3 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                aria-label="السعر الأقصى"
              />
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            disabled={!hasActiveFilters}
            className={`flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
              hasActiveFilters
                ? 'bg-gradient-to-r from-red-500 to-pink-500 text-white hover:from-red-600 hover:to-pink-600 shadow-lg hover:shadow-xl transform hover:scale-105'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            aria-label="مسح جميع الفلاتر"
          >
            <X size={20} />
            مسح الفلاتر
          </button>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex flex-wrap gap-2 pt-4 border-t-2 border-gray-100">
            <span className="text-sm text-gray-600 font-semibold">الفلاتر النشطة:</span>
            {state.searchTerm && (
              <Badge variant="info" className="flex items-center gap-1">
                <Search size={12} />
                البحث: {state.searchTerm}
                <button 
                  onClick={() => dispatch({ type: 'SET_SEARCH', payload: '' })} 
                  className="hover:text-red-500"
                  aria-label="إزالة فلتر البحث"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            {state.selectedCategory !== 'all' && (
              <Badge variant="success" className="flex items-center gap-1">
                الفئة: {CATEGORIES.find(c => c.id === state.selectedCategory)?.name}
                <button 
                  onClick={() => dispatch({ type: 'SET_CATEGORY', payload: 'all' })} 
                  className="hover:text-red-500"
                  aria-label="إزالة فلتر الفئة"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
            {(state.priceRange[0] !== 0 || state.priceRange[1] !== 300) && (
              <Badge variant="warning" className="flex items-center gap-1">
                السعر: {state.priceRange[0]} - {state.priceRange[1]} ج
                <button 
                  onClick={() => dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 300] })} 
                  className="hover:text-red-500"
                  aria-label="إزالة فلتر السعر"
                >
                  <X size={12} />
                </button>
              </Badge>
            )}
          </div>
        )}

        {/* Results Summary */}
        <div className="flex flex-wrap justify-between items-center gap-4 mt-4 pt-4 border-t-2 border-gray-100">
          <div className="flex items-center gap-2 text-gray-700">
            <TrendingUp size={20} className="text-green-600" />
            <span className="font-semibold">
              عرض {filteredProducts.length} من {PRODUCTS_DATA.length} منتج
            </span>
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="success" className="flex items-center gap-1">
              ✓ متوفر: {stats.available}
            </Badge>
            <Badge variant="warning" className="flex items-center gap-1">
              ⭐ مميز: {stats.featured}
            </Badge>
            <Badge variant="danger" className="flex items-center gap-1">
              🔥 خصم: {stats.discounted}
            </Badge>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {state.isLoading ? (
        <div className="flex justify-center items-center py-20">
          <div className="text-center">
            <LoadingSpinner size={48} />
            <p className="text-gray-600 mt-4 font-semibold">جاري تحميل المنتجات...</p>
          </div>
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product, index) => (
            <div key={product.id} className="animate-scale-in" style={{ animationDelay: `${index * 30}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-2xl shadow-lg border-2 border-gray-100">
          <div className="text-8xl mb-6 animate-bounce">🔍</div>
          <h3 className="text-3xl font-bold text-gray-600 mb-3">لا توجد منتجات مطابقة</h3>
          <p className="text-gray-500 mb-6 text-lg">جرب تغيير معايير البحث أو الفلاتر</p>
          
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="bg-gradient-to-r from-green-500 to-teal-500 text-white px-8 py-4 rounded-xl hover:from-green-600 hover:to-teal-600 transition-all font-bold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 inline-flex items-center gap-3"
              aria-label="مسح جميع الفلاتر"
            >
              <X size={24} />
              مسح جميع الفلاتر
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default SearchAndFilter;