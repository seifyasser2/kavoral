// src/context/AppContext.jsx
import React, { createContext, useContext, useReducer, useCallback, useEffect } from 'react';
import { appReducer, initialState } from './AppReducer';

const AppContext = createContext();

// ============================================
// useAppContext Hook - ✅ التصدير الأساسي
// ============================================
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

// ============================================
// Storage Management
// ============================================
const STORAGE_KEYS = {
  CART: 'kavoral_cart',
  WISHLIST: 'kavoral_wishlist',
  CUSTOMER_INFO: 'kavoral_customer_info'
};

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

const saveToStorage = (key, data) => {
  if (!isStorageAvailable()) return;
  
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

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
// AppProvider Component - ✅ التصدير الثاني
// ============================================
export const AppProvider = ({ children }) => {
  const loadState = () => {
    try {
      const savedCart = getFromStorage(STORAGE_KEYS.CART, []);
      const savedWishlist = getFromStorage(STORAGE_KEYS.WISHLIST, []);
      const savedCustomerInfo = getFromStorage(STORAGE_KEYS.CUSTOMER_INFO, initialState.customerInfo);
      
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

  // ✅ History Management
  useEffect(() => {
    const handlePopState = (event) => {
      const page = event.state?.page || 'home';
      dispatch({ type: 'SET_PAGE', payload: page });
    };

    // Set initial state
    if (!window.history.state?.page) {
      window.history.replaceState({ page: state.currentPage }, '', `#${state.currentPage}`);
    }

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
}, [state.currentPage]);

  // Save data to localStorage
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CART, state.cart);
  }, [state.cart]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.WISHLIST, state.wishlist);
  }, [state.wishlist]);

  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CUSTOMER_INFO, state.customerInfo);
  }, [state.customerInfo]);

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

  const navigateTo = useCallback((page) => {
    dispatch({ type: 'SET_PAGE', payload: page });
    window.history.pushState({ page }, '', `#${page}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const setError = useCallback((error) => {
    dispatch({ type: 'SET_ERROR', payload: error });
  }, []);

  const clearError = useCallback(() => {
    dispatch({ type: 'CLEAR_ERROR' });
  }, []);

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

  const value = {
    state,
    dispatch,
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