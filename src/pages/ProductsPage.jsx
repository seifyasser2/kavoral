import React from 'react';
import { Package } from 'lucide-react';
import SearchAndFilter from '../components/product/SearchAndFilter';
import { SectionHeader } from '../components/common';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <SectionHeader 
          icon={Package}
          title="جميع منتجاتنا"
          subtitle="اكتشف مجموعتنا الكاملة من الزيوت الطبيعية المعصورة على البارد"
        />
        <SearchAndFilter />
      </div>
    </div>
  );
};

export default ProductsPage;