import { CART } from '../constants';

// ============================================
// INITIAL STATE
// ============================================
export const initialState = {
  currentPage: 'home',
  selectedProduct: null,
  selectedBundle: null,
  
  cart: [],
  quantities: {},
  
  wishlist: [],
  
  customerInfo: { 
    name: '', 
    address: '', 
    phone: '' 
  },
  
  lastOrder: null,
  
  searchTerm: '', // نحتفظ بالبحث فقط
  
  notifications: [],
  isLoading: false,
  error: null,
  
  isMobileMenuOpen: false
};

// ============================================
// CONSTANTS
// ============================================
const MAX_CART_ITEMS = CART.MAX_ITEMS;
const MAX_QUANTITY_PER_ITEM = CART.MAX_QUANTITY_PER_ITEM;
const MAX_NOTIFICATIONS = 10;

// ============================================
// REDUCER
// ============================================
export const appReducer = (state, action) => {
  try {
    switch (action.type) {
      // ========== Loading & Error ==========
      case 'SET_LOADING':
        return { 
          ...state, 
          isLoading: action.payload 
        };
      
      case 'SET_ERROR':
        return { 
          ...state, 
          error: action.payload, 
          isLoading: false 
        };
      
      case 'CLEAR_ERROR':
        return { 
          ...state, 
          error: null 
        };
      
      // ========== Navigation ==========
      case 'SET_PAGE':
        return { 
          ...state, 
          currentPage: action.payload,
          isMobileMenuOpen: false
        };
      
      case 'SET_SELECTED_PRODUCT':
        return { 
          ...state, 
          selectedProduct: action.payload 
        };

      case 'SET_SELECTED_BUNDLE':
        return { 
          ...state, 
          selectedBundle: action.payload 
        };
      
      case 'TOGGLE_MOBILE_MENU':
        return {
          ...state,
          isMobileMenuOpen: !state.isMobileMenuOpen
        };
      
      // ========== Cart Management ==========
      case 'ADD_TO_CART': {
        if (!action.payload) {
          console.warn('No payload provided');
          return state;
        }

        const newItem = action.payload;
        
        if (!newItem.id || newItem.price === undefined || !newItem.quantity) {
          console.warn('Invalid item - missing required fields', newItem);
          return state;
        }

        const existingItemIndex = state.cart.findIndex(
          item => item.id === newItem.id
        );
        
        if (existingItemIndex !== -1) {
          console.log(`Product exists, merging quantities:`, {
            existing: state.cart[existingItemIndex].quantity,
            new: newItem.quantity
          });
          
          const updatedCart = [...state.cart];
          const currentQuantity = updatedCart[existingItemIndex].quantity || 0;
          const addedQuantity = newItem.quantity || 0;
          const newQuantity = Math.min(
            currentQuantity + addedQuantity,
            MAX_QUANTITY_PER_ITEM
          );
          
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: newQuantity
          };
          
          console.log(`Merged quantity: ${newQuantity}`);
          return { ...state, cart: updatedCart };
        }
        
        if (state.cart.length >= MAX_CART_ITEMS) {
          console.warn('Cart is full');
          return state;
        }
        
        console.log(`Adding new item:`, newItem.name, `quantity:`, newItem.quantity);
        
        return { 
          ...state, 
          cart: [
            ...state.cart,
            {
              ...newItem,
              quantity: Math.min(newItem.quantity || 1, MAX_QUANTITY_PER_ITEM)
            }
          ]
        };
      }

      case 'REMOVE_FROM_CART':
        return { 
          ...state, 
          cart: state.cart.filter(item => item.id !== action.payload) 
        };
      
      case 'UPDATE_CART_QUANTITY': {
        const { id, quantity } = action.payload;
        
        if (quantity === undefined || quantity === null) {
          console.warn('Invalid quantity provided');
          return state;
        }
        
        if (quantity <= 0) {
          return {
            ...state,
            cart: state.cart.filter(item => item.id !== id)
          };
        }

        const validQuantity = Math.min(Math.max(1, quantity), MAX_QUANTITY_PER_ITEM);
        
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === id
              ? { ...item, quantity: validQuantity }
              : item
          )
        };
      }
      
      case 'CLEAR_CART':
        return { 
          ...state, 
          cart: [], 
          quantities: {}, 
          customerInfo: { name: '', address: '', phone: '' } 
        };
      
      case 'RESET_QUANTITY':
        return {
          ...state,
          quantities: {
            ...state.quantities,
            [action.payload]: 0
          }
        };
      
      // ========== Wishlist Management ==========
      case 'ADD_TO_WISHLIST': {
        if (state.wishlist.find(item => item.id === action.payload.id)) {
          return state;
        }
        return { 
          ...state, 
          wishlist: [...state.wishlist, action.payload] 
        };
      }
      
      case 'REMOVE_FROM_WISHLIST':
        return { 
          ...state, 
          wishlist: state.wishlist.filter(item => item.id !== action.payload) 
        };
      
      case 'CLEAR_WISHLIST':
        return {
          ...state,
          wishlist: []
        };
      
      case 'TOGGLE_WISHLIST': {
        const isInWishlist = state.wishlist.find(item => item.id === action.payload.id);
        
        if (isInWishlist) {
          return {
            ...state,
            wishlist: state.wishlist.filter(item => item.id !== action.payload.id)
          };
        } else {
          return {
            ...state,
            wishlist: [...state.wishlist, action.payload]
          };
        }
      }
      
      // ========== Search - فقط البحث بدون فلترة ==========
      case 'SET_SEARCH':
        return { 
          ...state, 
          searchTerm: String(action.payload).substring(0, 100) 
        };
      
      // ========== Customer Info ==========
      case 'UPDATE_CUSTOMER_INFO':
        return { 
          ...state, 
          customerInfo: { 
            ...state.customerInfo, 
            ...action.payload 
          } 
        };
      
      case 'CLEAR_CUSTOMER_INFO':
        return {
          ...state,
          customerInfo: { name: '', address: '', phone: '' }
        };
      
      // ========== Last Order ==========
      case 'SET_LAST_ORDER':
        return {
          ...state,
          lastOrder: action.payload
        };
      
      // ========== Notifications ==========
      case 'ADD_NOTIFICATION': {
        const notifications = [
          ...state.notifications, 
          { 
            ...action.payload, 
            id: Date.now() + Math.random()
          }
        ];

        if (notifications.length > MAX_NOTIFICATIONS) {
          notifications.shift();
        }

        return { 
          ...state, 
          notifications 
        };
      }
      
      case 'REMOVE_NOTIFICATION':
        return { 
          ...state, 
          notifications: state.notifications.filter(n => n.id !== action.payload) 
        };
      
      case 'CLEAR_NOTIFICATIONS':
        return {
          ...state,
          notifications: []
        };
      
      // ========== Default ==========
      default:
        console.warn(`Unhandled action type: ${action.type}`);
        return state;
    }
  } catch (error) {
    console.error('Reducer error:', error, action);
    return state;
  }
};

// ============================================
// HELPER FUNCTIONS
// ============================================

export const calculateCartTotal = (cart) => {
  if (!Array.isArray(cart)) return 0;
  
  return cart.reduce((total, item) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    const itemTotal = price * quantity;
    
    if (!isNaN(itemTotal) && isFinite(itemTotal)) {
      return total + itemTotal;
    }
    return total;
  }, 0);
};

export const getCartItemsCount = (cart) => {
  if (!Array.isArray(cart)) return 0;
  return cart.length;
};

export const getCartUniquItems = (cart) => {
  if (!Array.isArray(cart)) return 0;
  return cart.length;
};

export const isInWishlist = (wishlist, productId) => {
  if (!Array.isArray(wishlist)) return false;
  return wishlist.some(item => item?.id === productId);
};

export const validateCart = (cart) => {
  if (!Array.isArray(cart)) return false;
  
  return cart.every(item => 
    item &&
    typeof item.id !== 'undefined' &&
    item.price >= 0 &&
    item.quantity > 0 &&
    item.quantity <= MAX_QUANTITY_PER_ITEM
  );
};

export const calculateAveragePrice = (cart) => {
  if (!Array.isArray(cart) || cart.length === 0) return 0;
  
  const total = calculateCartTotal(cart);
  const itemsCount = getCartItemsCount(cart);
  
  return itemsCount > 0 ? Math.round(total / itemsCount) : 0;
};

export default appReducer;