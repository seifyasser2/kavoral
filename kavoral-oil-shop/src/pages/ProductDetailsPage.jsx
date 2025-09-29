import React from 'react';
import { 
  AlertCircle, Star, Plus, Minus, CheckCircle, BookOpen, 
  Truck, Shield 
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { PRODUCTS_DATA } from '../data/products';
import { SITE_CONFIG } from '../data/config';
import { Badge } from '../components/common';
import ProductCard from '../components/product/ProductCard';

const ProductDetailsPage = () => {
  const { state, dispatch } = useAppContext();
  const product = state.selectedProduct;
  const quantity = state.quantities[product?.id] || 0;

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle size={80} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-4">المنتج غير موجود</h2>
          <button 
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  const updateQuantity = (change) => {
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: quantity + change }
    });
  };

  const addToCart = () => {
    if (quantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return;
    }

    if (!product.inStock) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'هذا المنتج غير متوفر حالياً', type: 'error' }
      });
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `تم إضافة ${product.name} للسلة`, type: 'success' }
    });

    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { id: product.id, quantity: 0 }
    });
  };

  const hasDiscount = product.originalPrice > product.price;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 mb-8 text-sm">
          <button 
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'home' })}
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            الرئيسية
          </button>
          <span className="text-gray-400">/</span>
          <button 
            onClick={() => dispatch({ type: 'SET_PAGE', payload: 'products' })}
            className="text-green-600 hover:text-green-700 transition-colors"
          >
            المنتجات
          </button>
          <span className="text-gray-400">/</span>
          <span className="text-gray-600">{product.name}</span>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Product Image */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="w-full h-80 bg-gradient-to-br from-green-100 to-green-200 rounded-xl flex items-center justify-center text-9xl mb-6 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-green-200 to-transparent opacity-50"></div>
                <span className="relative z-10">{product.image}</span>
              </div>
              
              {/* Product badges */}
              <div className="flex justify-center gap-2">
                {product.featured && <Badge variant="success">منتج مميز</Badge>}
                {hasDiscount && <Badge variant="warning">خصم خاص</Badge>}
                {product.soldCount > 200 && <Badge variant="info">الأكثر مبيعاً</Badge>}
                <Badge variant={product.inStock ? 'success' : 'danger'}>
                  {product.inStock ? 'متوفر' : 'نفذ'}
                </Badge>
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h1 className="text-4xl font-bold text-gray-800 mb-4">{product.name}</h1>
              <p className="text-lg text-gray-600 mb-4">{product.size}</p>
              
              {/* Price */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-4xl font-bold text-green-600">{product.price} جنيه</span>
                {hasDiscount && (
                  <div className="flex flex-col">
                    <span className="text-2xl text-gray-400 line-through">{product.originalPrice} جنيه</span>
                    <span className="text-sm text-red-500 font-bold">
                      وفر {product.originalPrice - product.price} جنيه!
                    </span>
                  </div>
                )}
              </div>

              {/* Rating and reviews */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < Math.floor(product.rating) ? 'text-yellow-500 fill-current' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="text-gray-600">({product.reviews} تقييم)</span>
                </div>
                <span className="text-sm text-gray-500">• تم بيع {product.soldCount} قطعة</span>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 text-lg">{product.description}</p>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="text-lg font-bold text-gray-800 mb-3">خصائص المنتج</h3>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag, index) => (
                    <Badge key={index} variant="info">{tag}</Badge>
                  ))}
                </div>
              </div>

              {/* Benefits */}
              <div className="mb-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">الفوائد الرئيسية</h3>
                <ul className="space-y-3">
                  {product.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle size={20} className="text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* How to use */}
              <div className="bg-green-50 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-bold text-green-800 mb-4 flex items-center gap-2">
                  <BookOpen size={20} />
                  طريقة الاستخدام
                </h3>
                <p className="text-green-700 leading-relaxed">{product.howToUse}</p>
              </div>

              {/* Warnings */}
              {product.warnings && (
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <h4 className="font-bold text-yellow-800 mb-2 flex items-center gap-2">
                    <AlertCircle size={16} />
                    تحذيرات مهمة
                  </h4>
                  <ul className="text-yellow-700 text-sm space-y-1">
                    {product.warnings.map((warning, index) => (
                      <li key={index}>• {warning}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Purchase section */}
              <div className="border-t pt-6">
                <div className="flex items-center gap-6 mb-6">
                  <span className="text-lg font-bold text-gray-800">الكمية:</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => updateQuantity(-1)}
                      disabled={quantity <= 0}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <Minus size={20} className={quantity <= 0 ? 'text-gray-300' : 'text-gray-600'} />
                    </button>
                    
                    <span className="text-2xl font-bold w-16 text-center">{quantity}</span>
                    
                    <button
                      onClick={() => updateQuantity(1)}
                      disabled={!product.inStock}
                      className="w-12 h-12 rounded-full bg-gray-100 hover:bg-gray-200 disabled:bg-gray-50 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                    >
                      <Plus size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>

                {quantity > 0 && (
                  <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <p className="text-2xl font-bold text-green-600 mb-2">
                      المجموع: {quantity * product.price} جنيه
                    </p>
                    {quantity * product.price >= SITE_CONFIG.shipping.freeShippingThreshold && (
                      <p className="text-green-600 text-sm flex items-center gap-2">
                        <Truck size={16} />
                        مبروك! حصلت على شحن مجاني
                      </p>
                    )}
                  </div>
                )}

                <button
                  onClick={addToCart}
                  disabled={quantity <= 0 || !product.inStock}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white py-4 px-6 rounded-lg transition-colors font-bold text-xl mb-4"
                >
                  {!product.inStock ? 'المنتج غير متوفر' : 'إضافة للسلة'}
                </button>

                {/* Additional info */}
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Shield size={16} />
                    <span>منتج معتمد</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck size={16} />
                    <span>توصيل سريع</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div className="mt-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">منتجات مشابهة</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {PRODUCTS_DATA
                .filter(p => p.category === product.category && p.id !== product.id)
                .slice(0, 3)
                .map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;