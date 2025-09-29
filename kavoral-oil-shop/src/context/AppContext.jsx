import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { appReducer, initialState } from './AppReducer';

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Load state from localStorage
  const loadState = () => {
    try {
      const savedCart = localStorage.getItem('kavoral_cart');
      const savedWishlist = localStorage.getItem('kavoral_wishlist');
      const savedQuantities = localStorage.getItem('kavoral_quantities');
      
      return {
        ...initialState,
        cart: savedCart ? JSON.parse(savedCart) : [],
        wishlist: savedWishlist ? JSON.parse(savedWishlist) : [],
        quantities: savedQuantities ? JSON.parse(savedQuantities) : {}
      };
    } catch (error) {
      console.error('Error loading from localStorage:', error);
      return initialState;
    }
  };

  const [state, dispatch] = useReducer(appReducer, initialState, loadState);
  
  // Save to localStorage whenever cart, wishlist, or quantities change
  useEffect(() => {
    try {
      localStorage.setItem('kavoral_cart', JSON.stringify(state.cart));
      localStorage.setItem('kavoral_wishlist', JSON.stringify(state.wishlist));
      localStorage.setItem('kavoral_quantities', JSON.stringify(state.quantities));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  }, [state.cart, state.wishlist, state.quantities]);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};