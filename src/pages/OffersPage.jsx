import React from 'react';
import { Gift, Sparkles, CheckCircle, ShoppingCart, Plus, Minus } from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { BUNDLE_OFFERS } from '../data/bundles';
import { getProductById } from '../data/products';
import { SITE_CONFIG } from '../data/config';
import { Badge } from '../components/common';

const OffersPage = () => {
  const { dispatch, state } = useAppContext();
  
  const addBundleToCart = (bundle, quantity) => {
    if (quantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return;
    }

    // ✅ إضافة العرض كوحدة واحدة بدل تقسيمه
    const bundleItem = {
      id: bundle.id, // ID العرض نفسه
      name: bundle.name,
      price: bundle.bundlePrice,
      originalPrice: bundle.originalPrice,
      image: bundle.image,
      size: `باقة ${bundle.products.length} منتجات`,
      category: bundle.category,
      tags: ['عرض خاص', 'باقة'],
      inStock: true,
      isBundle: true, // ✅ علامة إن ده عرض
      bundleProducts: bundle.products, // IDs المنتجات في العرض
      quantity: quantity,
      description: bundle.description,
      benefits: bundle.benefits
    };

    dispatch({
      type: 'ADD_TO_CART',
      payload: bundleItem
    });
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `تم إضافة ${quantity} من ${bundle.name} للسلة`, type: 'success' }
    });

    // إعادة تعيين الكمية
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: bundle.id, quantity: 0 }
    });
  };

  const BundleCard = ({ bundle }) => {
    // التأكد من أن كل المنتجات موجودة
    const bundleProducts = bundle.products
      .map(id => getProductById(id))
      .filter(product => product !== undefined);
    
    if (bundleProducts.length === 0) {
      return null;
    }
    
    const savingsPercentage = bundle.totalDiscountPercentage;
    const quantity = state.quantities[bundle.id] || 0;

    const updateQuantity = (change) => {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { id: bundle.id, quantity: quantity + change }
      });
    };

    return (
      <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group">
        <div className="bg-gradient-to-r from-green-600 to-green-700 p-4 text-white relative">
          <div className="flex items-center justify-between mb-2">
            <div className="text-4xl">{bundle.image}</div>
            <Badge variant="warning" className="bg-yellow-400 text-yellow-900">
              وفر {savingsPercentage}%
            </Badge>
          </div>
          <h3 className="text-xl font-bold mb-1">{bundle.name}</h3>
          <p className="text-green-100 text-sm">{bundle.description}</p>
        </div>

        <div className="p-6">
          {/* Products in bundle */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Gift size={16} />
              المنتجات المشمولة:
            </h4>
            <div className="space-y-2">
              {bundleProducts.map(product => (
                <div key={product.id} className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center text-lg">
                    {product.image}
                  </div>
                  <div className="flex-1">
                    <span className="text-sm font-medium text-gray-800">{product.name}</span>
                    <span className="text-xs text-gray-500 block">{product.size}</span>
                  </div>
                  <span className="text-sm font-bold text-green-600">{product.price}ج</span>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6">
            <h4 className="font-bold text-gray-800 mb-3">مميزات الباقة:</h4>
            <ul className="space-y-2">
              {bundle.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2 text-sm">
                  <CheckCircle size={16} className="text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing */}
          <div className="bg-green-50 p-4 rounded-lg mb-6">
            <div className="text-center">
              <div className="flex items-center justify-center gap-4 mb-2">
                <span className="text-2xl line-through text-gray-400">{bundle.originalPrice} جنيه</span>
                <span className="text-3xl font-bold text-green-600">{bundle.bundlePrice} جنيه</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-red-600 font-bold">
                <Sparkles size={16} />
                <span>وفر {bundle.savings} جنيه!</span>
              </div>
            </div>
          </div>

          {/* ✅ Quantity selector */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <button
              onClick={() => updateQuantity(-1)}
              disabled={quantity <= 0}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
            >
              <Minus size={16} className={quantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
            </button>
            
            <span className="text-xl font-bold w-12 text-center">{quantity}</span>
            
            <button
              onClick={() => updateQuantity(1)}
              className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
            >
              <Plus size={16} className="text-gray-600" />
            </button>
          </div>

          {quantity > 0 && (
            <p className="text-center text-green-600 font-bold mb-4">
              المجموع: {quantity * bundle.bundlePrice} جنيه
            </p>
          )}

          {/* ✅ Add to cart button */}
          <button
            onClick={() => addBundleToCart(bundle, quantity)}
            disabled={quantity <= 0}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-3 px-6 rounded-lg font-bold transition-colors flex items-center justify-center gap-2 group-hover:shadow-lg"
          >
            <ShoppingCart size={20} />
            {quantity <= 0 ? 'حدد الكمية أولاً' : 'أضف الباقة للسلة'}
          </button>
          
          <p className="text-xs text-gray-500 text-center mt-2">
            ستحصل على {quantity} من كل منتج في الباقة
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Gift size={60} className="text-green-600" />
            <Sparkles size={40} className="text-yellow-500" />
          </div>
          <h1 className="text-5xl font-bold text-green-600 mb-4">العروض المميزة</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            باقات حصرية من أجود الزيوت الطبيعية المعصورة على البارد بأسعار مخفضة خاصة
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <Badge variant="success" className="text-sm px-4 py-2">توفير حتى 40 جنيه</Badge>
            <Badge variant="info" className="text-sm px-4 py-2">عروض محدودة المدة</Badge>
          </div>
        </div>

        {/* All Offers */}
        <div>
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">جميع العروض</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {BUNDLE_OFFERS.map(bundle => (
              <BundleCard key={bundle.id} bundle={bundle} />
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="bg-gradient-to-r from-green-600 to-green-700 text-white p-8 rounded-xl mt-16 text-center">
          <h2 className="text-3xl font-bold mb-4">لا تفوت العروض المحدودة!</h2>
          <p className="text-xl mb-6 opacity-90">
            احصل على أفضل الزيوت الطبيعية المعصورة على البارد بأسعار مخفضة لفترة محدودة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors"
            >
              تصفح جميع المنتجات
            </button>
            <a
              href={`https://wa.me/${SITE_CONFIG.whatsapp}?text=مرحباً، أريد الاستفسار عن العروض المتاحة`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-lg font-bold hover:bg-white hover:text-green-600 transition-colors"
            >
              تواصل معنا للمزيد
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OffersPage;