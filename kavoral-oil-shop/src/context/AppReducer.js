export const initialState = {
  currentPage: 'home',
  cart: [],
  quantities: {},
  wishlist: [],
  customerInfo: { name: '', address: '', phone: '' },
  searchTerm: '',
  selectedCategory: 'all',
  priceRange: [0, 300],
  notifications: [],
  selectedProduct: null,
  isLoading: false,
  error: null
};

export const appReducer = (state, action) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    
    case 'SET_PAGE':
      return { ...state, currentPage: action.payload };
    
    case 'SET_SELECTED_PRODUCT':
      return { ...state, selectedProduct: action.payload };
    
    case 'ADD_TO_CART':
      const existingItem = state.cart.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      }
      return { ...state, cart: [...state.cart, action.payload] };
    
    case 'REMOVE_FROM_CART':
      return { ...state, cart: state.cart.filter(item => item.id !== action.payload) };
    
    case 'UPDATE_CART_QUANTITY':
      return {
        ...state,
        cart: state.cart.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };
    
    case 'UPDATE_QUANTITY':
      return {
        ...state,
        quantities: {
          ...state.quantities,
          [action.payload.id]: Math.max(0, action.payload.quantity)
        }
      };
    
    case 'ADD_TO_WISHLIST':
      if (state.wishlist.find(item => item.id === action.payload.id)) return state;
      return { ...state, wishlist: [...state.wishlist, action.payload] };
    
    case 'REMOVE_FROM_WISHLIST':
      return { ...state, wishlist: state.wishlist.filter(item => item.id !== action.payload) };
    
    case 'SET_SEARCH':
      return { ...state, searchTerm: action.payload };
    
    case 'SET_CATEGORY':
      return { ...state, selectedCategory: action.payload };
    
    case 'SET_PRICE_RANGE':
      return { ...state, priceRange: action.payload };
    
    case 'UPDATE_CUSTOMER_INFO':
      return { ...state, customerInfo: { ...state.customerInfo, ...action.payload } };
    
    case 'CLEAR_CART':
      return { ...state, cart: [], quantities: {}, customerInfo: { name: '', address: '', phone: '' } };
    
    case 'ADD_NOTIFICATION':
      return { 
        ...state, 
        notifications: [...state.notifications, { ...action.payload, id: Date.now() }] 
      };
    
    case 'REMOVE_NOTIFICATION':
      return { 
        ...state, 
        notifications: state.notifications.filter(n => n.id !== action.payload) 
      };
    
    default:
      return state;
  }
};