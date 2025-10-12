import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
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
// STORAGE HELPER - دالة آمنة للتعامل مع localStorage
// ============================================
const STORAGE_KEYS = {
  CART: 'kavoral_cart',
  WISHLIST: 'kavoral_wishlist',
  CUSTOMER_INFO: 'kavoral_customer_info'
};

/**
 * التحقق من توفر localStorage بشكل آمن
 */
const isStorageAvailable = () => {
  try {
    const test = '__localStorage_test__';
    if (typeof localStorage === 'undefined') return false;
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch (e) {
    console.warn('localStorage is not available:', e);
    return false;
  }
};

/**
 * حفظ البيانات في localStorage بشكل آمن
 */
const saveToStorage = (key, data) => {
  if (!isStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

/**
 * استرجاع البيانات من localStorage بشكل آمن
 */
const getFromStorage = (key, defaultValue = null) => {
  if (!isStorageAvailable()) return defaultValue;
  
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

// ============================================
// APP PROVIDER - مع localStorage آمن
// ============================================
export const AppProvider = ({ children }) => {
  // دالة لتحميل البيانات من localStorage
  const loadState = () => {
    try {
      const savedCart = getFromStorage(STORAGE_KEYS.CART, []);
      const savedWishlist = getFromStorage(STORAGE_KEYS.WISHLIST, []);
      const savedCustomerInfo = getFromStorage(STORAGE_KEYS.CUSTOMER_INFO, initialState.customerInfo);
      
      // تحقق من صحة البيانات
      return {
        ...initialState,
        cart: Array.isArray(savedCart) ? savedCart : [],
        wishlist: Array.isArray(savedWishlist) ? savedWishlist : [],
        customerInfo: savedCustomerInfo || initialState.customerInfo
      };
    } catch (error) {
      console.error('Error loading state from storage:', error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState, loadState);

  // ============================================
  // حفظ السلة في localStorage
  // ============================================
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, state.cart);
  }, [state.cart]);

  // ============================================
  // حفظ المفضلة في localStorage
  // ============================================
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WISHLIST, state.wishlist);
  }, [state.wishlist]);

  // ============================================
  // حفظ بيانات العميل في localStorage
  // ============================================
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CUSTOMER_INFO, state.customerInfo);
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

  // معالجة الأخطاء
  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

  /**
   * مسح جميع البيانات المحفوظة
   */
  const clearAllStorage = useCallback(() => {
    if (isStorageAvailable()) {
      try {
        localStorage.removeItem(STORAGE_KEYS.CART);
        localStorage.removeItem(STORAGE_KEYS.WISHLIST);
        localStorage.removeItem(STORAGE_KEYS.CUSTOMER_INFO);
        
        dispatch({ type: 'CLEAR_CART' });
        dispatch({ type: 'CLEAR_WISHLIST' });
        dispatch({ type: 'CLEAR_CUSTOMER_INFO' });
        
        dispatch({
          type: 'ADD_NOTIFICATION',
          payload: { message: 'تم مسح جميع البيانات المحفوظة', type: 'info' }
        });
      } catch (error) {
        console.error('Error clearing storage:', error);
      }
    }
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
    navigateTo,
    setError,
    clearError,
    clearAllStorage
  };
  
  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;