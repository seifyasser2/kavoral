import { CART } from '../constants';
// ============================================
// INITIAL STATE - الحالة الابتدائية
// ============================================

export const initialState = {
  // Navigation
  currentPage: 'home',
  selectedProduct: null,
  
  // Cart & Shopping
  cart: [],
  quantities: {},
  
  // Wishlist
  wishlist: [],
  
  // Customer Info
  customerInfo: { 
    name: '', 
    address: '', 
    phone: '' 
  },
  
  // Filters & Search
  searchTerm: '',
  selectedCategory: 'all',
  priceRange: [0, 300],
  
  // UI State
  notifications: [],
  isLoading: false,
  error: null,
  
  // Mobile menu
  isMobileMenuOpen: false
};

// ============================================
// CONSTANTS - الثوابت
// ============================================
const MAX_CART_ITEMS = CART.MAX_ITEMS;
const MAX_QUANTITY_PER_ITEM = CART.MAX_QUANTITY_PER_ITEM;
const MAX_NOTIFICATIONS = 10;
// ============================================
// REDUCER - معالج الحالة
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
      
      case 'TOGGLE_MOBILE_MENU':
        return {
          ...state,
          isMobileMenuOpen: !state.isMobileMenuOpen
        };
      
      // ========== Cart Management ==========
      case 'ADD_TO_CART': {
        // تحقق من الحد الأقصى للسلة
        if (state.cart.length >= MAX_CART_ITEMS) {
          console.warn('Cart is full');
          return state;
        }

        const existingItemIndex = state.cart.findIndex(
          item => item.id === action.payload.id
        );
        
        if (existingItemIndex !== -1) {
          // المنتج موجود - تحديث الكمية
          const updatedCart = [...state.cart];
          const newQuantity = Math.min(
            updatedCart[existingItemIndex].quantity + action.payload.quantity,
            MAX_QUANTITY_PER_ITEM
          );
          updatedCart[existingItemIndex] = {
            ...updatedCart[existingItemIndex],
            quantity: newQuantity
          };
          return { ...state, cart: updatedCart };
        }
        
        // منتج جديد - إضافة للسلة
        return { 
          ...state, 
          cart: [...state.cart, action.payload] 
        };
      }
      
      case 'REMOVE_FROM_CART':
        return { 
          ...state, 
          cart: state.cart.filter(item => item.id !== action.payload) 
        };
      
      case 'UPDATE_CART_QUANTITY': {
        const { id, quantity } = action.payload;
        
        if (quantity <= 0) {
          // إذا الكمية صفر أو أقل، احذف المنتج
          return {
            ...state,
            cart: state.cart.filter(item => item.id !== id)
          };
        }

        // تأكد من الحد الأقصى للكمية
        const validQuantity = Math.min(quantity, MAX_QUANTITY_PER_ITEM);
        
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
      
      // ========== Quantity Management ==========
      case 'UPDATE_QUANTITY': {
        const newQuantity = Math.max(0, Math.min(action.payload.quantity, MAX_QUANTITY_PER_ITEM));
        return {
          ...state,
          quantities: {
            ...state.quantities,
            [action.payload.id]: newQuantity
          }
        };
      }
      
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
        // التحقق من عدم التكرار
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
      
      // ========== Search & Filters ==========
      case 'SET_SEARCH':
        return { 
          ...state, 
          searchTerm: String(action.payload).substring(0, 100) 
        };
      
      case 'SET_CATEGORY':
        return { 
          ...state, 
          selectedCategory: action.payload 
        };
      
      case 'SET_PRICE_RANGE': {
        const [min, max] = action.payload;
        return { 
          ...state, 
          priceRange: [Math.max(min, 0), Math.min(max, 300)] 
        };
      }
      
      case 'RESET_FILTERS':
        return {
          ...state,
          searchTerm: '',
          selectedCategory: 'all',
          priceRange: [0, 300]
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
      
      // ========== Notifications ==========
      case 'ADD_NOTIFICATION': {
        // حد أقصى للإشعارات المعروضة
        const notifications = [
          ...state.notifications, 
          { 
            ...action.payload, 
            id: Date.now() + Math.random()
          }
        ];

        // احفظ فقط آخر MAX_NOTIFICATIONS إشعار
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
// HELPER FUNCTIONS - دوال مساعدة
// ============================================

/**
 * دالة لحساب إجمالي السلة
 * @param {Array} cart - السلة
 * @returns {number} - الإجمالي
 */
export const calculateCartTotal = (cart) => {
  if (!Array.isArray(cart)) return 0;
  
  return cart.reduce((total, item) => {
    const price = item?.price || 0;
    const quantity = item?.quantity || 0;
    const itemTotal = price * quantity;
    
    // تحقق من أن الرقم صحيح
    if (!isNaN(itemTotal) && isFinite(itemTotal)) {
      return total + itemTotal;
    }
    return total;
  }, 0);
};

/**
 * دالة لحساب عدد العناصر في السلة
 * @param {Array} cart - السلة
 * @returns {number} - عدد العناصر
 */
export const getCartItemsCount = (cart) => {
  if (!Array.isArray(cart)) return 0;
  
  return cart.reduce((count, item) => {
    const quantity = item?.quantity || 0;
    return count + (quantity > 0 ? quantity : 0);
  }, 0);
};

/**
 * دالة للتحقق من وجود منتج في المفضلة
 * @param {Array} wishlist - قائمة المفضلة
 * @param {number} productId - معرف المنتج
 * @returns {boolean} - هل المنتج موجود
 */
export const isInWishlist = (wishlist, productId) => {
  if (!Array.isArray(wishlist)) return false;
  return wishlist.some(item => item?.id === productId);
};

/**
 * دالة للتحقق من صحة السلة
 * @param {Array} cart - السلة
 * @returns {boolean} - هل السلة صحيحة
 */
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

/**
 * دالة لحساب متوسط سعر المنتجات في السلة
 * @param {Array} cart - السلة
 * @returns {number} - متوسط السعر
 */
export const calculateAveragePrice = (cart) => {
  if (!Array.isArray(cart) || cart.length === 0) return 0;
  
  const total = calculateCartTotal(cart);
  const itemsCount = getCartItemsCount(cart);
  
  return itemsCount > 0 ? Math.round(total / itemsCount) : 0;
};

export default appReducer;