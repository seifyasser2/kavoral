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
// REDUCER - معالج الحالة
// ============================================
export const appReducer = (state, action) => {
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
        isMobileMenuOpen: false // إغلاق القائمة عند التنقل
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
      const existingItemIndex = state.cart.findIndex(
        item => item.id === action.payload.id
      );
      
      if (existingItemIndex !== -1) {
        // المنتج موجود - تحديث الكمية
        const updatedCart = [...state.cart];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + action.payload.quantity
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
      if (action.payload.quantity <= 0) {
        // إذا الكمية صفر، احذف المنتج
        return {
          ...state,
          cart: state.cart.filter(item => item.id !== action.payload.id)
        };
      }
      
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
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
    
    // ========== Quantity Management (للكاردات) ==========
    case 'UPDATE_QUANTITY': {
      const newQuantity = Math.max(0, action.payload.quantity);
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
        searchTerm: action.payload 
      };
    
    case 'SET_CATEGORY':
      return { 
        ...state, 
        selectedCategory: action.payload 
      };
    
    case 'SET_PRICE_RANGE':
      return { 
        ...state, 
        priceRange: action.payload 
      };
    
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
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [
          ...state.notifications, 
          { 
            ...action.payload, 
            id: Date.now() + Math.random() // ID فريد
          }
        ] 
      };
    
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
};

// ============================================
// HELPER FUNCTIONS - دوال مساعدة
// ============================================

// دالة لحساب إجمالي السلة
export const calculateCartTotal = (cart) => {
  return cart.reduce((total, item) => {
    return total + (item.price * item.quantity);
  }, 0);
};

// دالة لحساب عدد العناصر في السلة
export const getCartItemsCount = (cart) => {
  return cart.reduce((count, item) => count + item.quantity, 0);
};

// دالة للتحقق من وجود منتج في المفضلة
export const isInWishlist = (wishlist, productId) => {
  return wishlist.some(item => item.id === productId);
};

// يبقى كما هو - لا تغيير
export default appReducer;