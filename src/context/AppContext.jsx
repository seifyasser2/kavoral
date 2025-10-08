import React, { createContext, useContext, useReducer, useEffect, useCallback } from 'react';
import { appReducer, initialState } from './AppReducer';

// ============================================
// CREATE CONTEXT
// ============================================
const AppContext = createContext();

// ============================================
// CUSTOM HOOK - للوصول للـ Context
// ============================================
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// ============================================
// LOCAL STORAGE KEYS
// ============================================
const STORAGE_KEYS = {
  CART: 'kavoral_cart',
  WISHLIST: 'kavoral_wishlist',
  QUANTITIES: 'kavoral_quantities',
  CUSTOMER_INFO: 'kavoral_customer_info'
};

// ============================================
// APP PROVIDER
// ============================================
export const AppProvider = ({ children }) => {
  // دالة لتحميل البيانات من localStorage
  const loadState = () => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEYS.CART);
      const savedWishlist = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      const savedQuantities = localStorage.getItem(STORAGE_KEYS.QUANTITIES);
      const savedCustomerInfo = localStorage.getItem(STORAGE_KEYS.CUSTOMER_INFO);
      
      return {
        ...initialState,
        cart: savedCart ? JSON.parse(savedCart) : [],
        wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
        quantities: savedQuantities ? JSON.parse(savedQuantities) : {},
        customerInfo: savedCustomerInfo ? JSON.parse(savedCustomerInfo) : initialState.customerInfo
      };
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState, loadState);
  
  // ============================================
  // SAVE TO LOCAL STORAGE
  // ============================================
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(state.cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [state.cart]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(state.wishlist));
    } catch (error) {
      console.error('Error saving wishlist to localStorage:', error);
    }
  }, [state.wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.QUANTITIES, JSON.stringify(state.quantities));
    } catch (error) {
      console.error('Error saving quantities to localStorage:', error);
    }
  }, [state.quantities]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CUSTOMER_INFO, JSON.stringify(state.customerInfo));
    } catch (error) {
      console.error('Error saving customer info to localStorage:', error);
    }
  }, [state.customerInfo]);

  // ============================================
  // HELPER ACTIONS - أفعال مساعدة
  // ============================================
  
  // إضافة للسلة مع التحقق
  const addToCart = useCallback((product, quantity) => {
    if (!product || quantity <= 0) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'يرجى تحديد الكمية أولاً', type: 'warning' }
      });
      return false;
    }

    if (!product.inStock) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: { message: 'هذا المنتج غير متوفر حالياً', type: 'error' }
      });
      return false;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: { ...product, quantity }
    });

    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: { message: `تم إضافة ${product.name} للسلة`, type: 'success' }
    });

    return true;
  }, []);

  // Toggle المفضلة
  const toggleWishlist = useCallback((product) => {
    const isInWishlist = state.wishlist.find(item => item.id === product.id);
    
    dispatch({ type: 'TOGGLE_WISHLIST', payload: product });
    
    dispatch({
      type: 'ADD_NOTIFICATION',
      payload: {
        message: isInWishlist ? 'تم حذف المنتج من المفضلة' : 'تم إضافة المنتج للمفضلة',
        type: isInWishlist ? 'info' : 'success'
      }
    });
  }, [state.wishlist]);

  // التنقل بين الصفحات
  const navigateTo = useCallback((page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // ============================================
  // CONTEXT VALUE
  // ============================================
  const value = {
    state,
    dispatch,
    // Helper functions
    addToCart,
    toggleWishlist,
    navigateTo
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;