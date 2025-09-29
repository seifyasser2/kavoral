import React from 'react';
import SearchAndFilter from '../components/product/SearchAndFilter';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">جميع منتجاتنا</h1>
          <p className="text-lg text-gray-600">اكتشف مجموعتنا الكاملة من الزيوت الطبيعية</p>
        </div>
        <SearchAndFilter />
      </div>
    </div>
  );
};

export default ProductsPage;