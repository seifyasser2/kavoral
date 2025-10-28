import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  limit,
  serverTimestamp,
  doc,
  updateDoc,
  deleteDoc
} from 'firebase/firestore';

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ============================================
// ORDERS FUNCTIONS
// ============================================

/**
 * حفظ طلب جديد في Firebase
 */
export const saveOrderToFirebase = async (orderData) => {
  try {
    console.log('📤 Saving order to Firebase...');
    
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending'
    });

    console.log('✅ Order saved! ID:', docRef.id);
    
    return {
      success: true,
      orderId: docRef.id,
      message: 'تم حفظ الطلب بنجاح'
    };
  } catch (error) {
    console.error('❌ Firebase Error:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * جلب جميع الطلبات
 */
export const getOrdersFromFirebase = async (limitCount = 50) => {
  try {
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(limitCount));
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data()
      });
    });

    return {
      success: true,
      orders: orders
    };
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    return {
      success: false,
      error: error.message,
      orders: []
    };
  }
};

/**
 * تحديث حالة الطلب
 */
export const updateOrderStatus = async (orderId, newStatus) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });

    return {
      success: true,
      message: 'تم تحديث الحالة'
    };
  } catch (error) {
    console.error('❌ Error updating order:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

/**
 * حذف طلب
 */
export const deleteOrderFromFirebase = async (orderId) => {
  try {
    const orderRef = doc(db, 'orders', orderId);
    await deleteDoc(orderRef);

    return {
      success: true,
      message: 'تم حذف الطلب'
    };
  } catch (error) {
    console.error('❌ Error deleting order:', error);
    return {
      success: false,
      error: error.message
    };
  }
};

export default {
  saveOrderToFirebase,
  getOrdersFromFirebase,
  updateOrderStatus,
  deleteOrderFromFirebase
};