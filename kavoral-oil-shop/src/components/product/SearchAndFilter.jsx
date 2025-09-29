import React from 'react';
import { Search } from 'lucide-react';
import { useAppContext } from '../../context/AppContext';
import { getProductsByCategory, PRODUCTS_DATA } from '../../data/products';
import { CATEGORIES } from '../../data/config';
import { Badge, LoadingSpinner } from '../common';
import ProductCard from './ProductCard';

const SearchAndFilter = () => {
  const { state, dispatch } = useAppContext();

  // ✅ فلترة محسنة تدعم الفئات المتعددة
  const filteredProducts = getProductsByCategory(state.selectedCategory).filter(product => {
    const matchesSearch = product.name.includes(state.searchTerm) || 
                         product.description.includes(state.searchTerm) ||
                         product.tags.some(tag => tag.includes(state.searchTerm));
    const matchesPrice = product.price >= state.priceRange[0] && 
                        product.price <= state.priceRange[1];
    
    return matchesSearch && matchesPrice;
  });

  const resetFilters = () => {
    dispatch({ type: 'SET_SEARCH', payload: '' });
    dispatch({ type: 'SET_CATEGORY', payload: 'all' });
    dispatch({ type: 'SET_PRICE_RANGE', payload: [0, 300] });
  };

  return (
    <>
      {/* Filter Panel */}
      <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute right-3 top-3 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="ابحث عن منتج..."
              value={state.searchTerm}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className="w-full pr-10 pl-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          {/* Category Filter */}
          <select
            value={state.selectedCategory}
            onChange={(e) => dispatch({ type: 'SET_CATEGORY', payload: e.target.value })}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500"
          >
            {CATEGORIES.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>

          {/* Price Range */}
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="من"
              value={state.priceRange[0]}
              onChange={(e) => dispatch({ 
                type: 'SET_PRICE_RANGE', 
                payload: [parseInt(e.target.value) || 0, state.priceRange[1]] 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
            />
            <span className="text-gray-500">-</span>
            <input
              type="number"
              placeholder="إلى"
              value={state.priceRange[1]}
              onChange={(e) => dispatch({ 
                type: 'SET_PRICE_RANGE', 
                payload: [state.priceRange[0], parseInt(e.target.value) || 300] 
              })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 text-sm"
            />
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-lg transition-colors"
          >
            مسح الفلاتر
          </button>
        </div>

        {/* Results count */}
        <div className="flex justify-between items-center text-sm text-gray-600">
          <span>عرض {filteredProducts.length} من {PRODUCTS_DATA.length} منتج</span>
          <div className="flex gap-2">
            <Badge variant="info">المتاح: {filteredProducts.filter(p => p.inStock).length}</Badge>
            <Badge variant="warning">المميز: {filteredProducts.filter(p => p.featured).length}</Badge>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {state.isLoading ? (
        <div className="flex justify-center items-center py-20">
          <LoadingSpinner size={48} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {filteredProducts.length === 0 && !state.isLoading && (
        <div className="text-center py-16">
          <Search size={80} className="mx-auto text-gray-300 mb-4" />
          <h3 className="text-xl font-bold text-gray-600 mb-2">لا توجد منتجات مطابقة</h3>
          <p className="text-gray-500 mb-4">جرب تغيير معايير البحث</p>
          <button
            onClick={resetFilters}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            عرض جميع المنتجات
          </button>
        </div>
      )}
    </>
  );
};

export default SearchAndFilter;