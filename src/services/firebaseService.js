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

// ============================================
// FIREBASE CONFIGURATION CHECK
// ============================================
const requiredEnvVars = [
  'REACT_APP_FIREBASE_API_KEY',
  'REACT_APP_FIREBASE_AUTH_DOMAIN',
  'REACT_APP_FIREBASE_PROJECT_ID',
  'REACT_APP_FIREBASE_STORAGE_BUCKET',
  'REACT_APP_FIREBASE_MESSAGING_SENDER_ID',
  'REACT_APP_FIREBASE_APP_ID'
];

const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('❌ Missing Firebase environment variables:');
  missingVars.forEach(varName => {
    console.error(`   - ${varName}`);
  });
  console.error('\n📝 Create .env file in project root with:');
  requiredEnvVars.forEach(varName => {
    console.error(`   ${varName}=your_value_here`);
  });
  console.error('\n⚠️ Then restart: npm start\n');
}

// Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID
};

// ============================================
// INITIALIZE FIREBASE
// ============================================
let app;
let db;
let isFirebaseInitialized = false;

try {
  if (missingVars.length === 0) {
    app = initializeApp(firebaseConfig);
    db = getFirestore(app);
    isFirebaseInitialized = true;
    console.log('✅ Firebase initialized successfully');
  } else {
    console.warn('⚠️ Firebase NOT initialized - missing configuration');
  }
} catch (error) {
  console.error('❌ Firebase initialization failed:', error);
  isFirebaseInitialized = false;
}

// ============================================
// HELPER: Check Firebase Status
// ============================================
const checkFirebaseStatus = () => {
  if (!isFirebaseInitialized) {
    console.error('❌ Firebase is not initialized. Check your .env file.');
    return false;
  }
  return true;
};

// ============================================
// SAVE ORDER TO FIREBASE
// ============================================
export const saveOrderToFirebase = async (orderData) => {
  if (!checkFirebaseStatus()) {
    return {
      success: false,
      error: 'Firebase is not configured. Check .env file.',
      hint: 'Add Firebase credentials to .env file'
    };
  }

  try {
    console.log('📤 Saving order to Firebase...');
    console.log('📊 Order data:', {
      orderNumber: orderData.orderNumber,
      customer: orderData.customerName,
      total: orderData.total
    });
    
    const ordersRef = collection(db, 'orders');
    const docRef = await addDoc(ordersRef, {
      ...orderData,
      createdAt: serverTimestamp(),
      status: 'pending',
      updatedAt: serverTimestamp()
    });

    console.log('✅ Order saved successfully!');
    console.log('🔥 Firebase Document ID:', docRef.id);
    
    return {
      success: true,
      orderId: docRef.id,
      message: 'تم حفظ الطلب بنجاح'
    };
  } catch (error) {
    console.error('❌ Firebase Error:', error);
    console.error('Error code:', error.code);
    console.error('Error message:', error.message);
    
    let userMessage = 'فشل حفظ الطلب في Firebase';
    let hint = '';

    // Handle specific Firebase errors
    if (error.code === 'permission-denied') {
      userMessage = 'خطأ في الأذونات';
      hint = 'Check Firestore Security Rules';
      console.error('💡 Hint: Update Firestore rules to allow writes');
    } else if (error.code === 'unavailable') {
      userMessage = 'Firebase غير متاح حالياً';
      hint = 'Network issue or Firebase is down';
    } else if (error.code === 'not-found') {
      userMessage = 'قاعدة البيانات غير موجودة';
      hint = 'Create Firestore database in Firebase Console';
    }

    return {
      success: false,
      error: userMessage,
      details: error.message,
      code: error.code,
      hint: hint
    };
  }
};

// ============================================
// GET ORDERS FROM FIREBASE
// ============================================
export const getOrdersFromFirebase = async (limitCount = 50) => {
  if (!checkFirebaseStatus()) {
    return {
      success: false,
      error: 'Firebase is not configured',
      orders: []
    };
  }

  try {
    console.log('📥 Fetching orders from Firebase...');
    
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, orderBy('createdAt', 'desc'), limit(limitCount));
    
    const querySnapshot = await getDocs(q);
    const orders = [];
    
    querySnapshot.forEach((doc) => {
      orders.push({
        id: doc.id,
        ...doc.data(),
        // Convert Firestore Timestamp to readable format
        createdAt: doc.data().createdAt?.toDate?.()?.toISOString() || null,
        updatedAt: doc.data().updatedAt?.toDate?.()?.toISOString() || null
      });
    });

    console.log(`✅ Fetched ${orders.length} orders`);

    return {
      success: true,
      orders: orders,
      count: orders.length
    };
  } catch (error) {
    console.error('❌ Error fetching orders:', error);
    return {
      success: false,
      error: error.message,
      code: error.code,
      orders: []
    };
  }
};

// ============================================
// UPDATE ORDER STATUS
// ============================================
export const updateOrderStatus = async (orderId, newStatus) => {
  if (!checkFirebaseStatus()) {
    return {
      success: false,
      error: 'Firebase is not configured'
    };
  }

  try {
    console.log(`📝 Updating order ${orderId} to status: ${newStatus}`);
    
    const orderRef = doc(db, 'orders', orderId);
    await updateDoc(orderRef, {
      status: newStatus,
      updatedAt: serverTimestamp()
    });

    console.log('✅ Order status updated successfully');

    return {
      success: true,
      message: 'تم تحديث حالة الطلب'
    };
  } catch (error) {
    console.error('❌ Error updating order:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// ============================================
// DELETE ORDER
// ============================================
export const deleteOrderFromFirebase = async (orderId) => {
  if (!checkFirebaseStatus()) {
    return {
      success: false,
      error: 'Firebase is not configured'
    };
  }

  try {
    console.log(`🗑️ Deleting order ${orderId}`);
    
    const orderRef = doc(db, 'orders', orderId);
    await deleteDoc(orderRef);

    console.log('✅ Order deleted successfully');

    return {
      success: true,
      message: 'تم حذف الطلب'
    };
  } catch (error) {
    console.error('❌ Error deleting order:', error);
    return {
      success: false,
      error: error.message,
      code: error.code
    };
  }
};

// ============================================
// TEST FIREBASE CONNECTION
// ============================================
export const testFirebaseConnection = async () => {
  if (!checkFirebaseStatus()) {
    console.error('❌ Firebase connection test failed: Not initialized');
    return false;
  }

  try {
    console.log('🧪 Testing Firebase connection...');
    
    const ordersRef = collection(db, 'orders');
    const q = query(ordersRef, limit(1));
    await getDocs(q);
    
    console.log('✅ Firebase connection test successful');
    return true;
  } catch (error) {
    console.error('❌ Firebase connection test failed:', error);
    console.error('Error code:', error.code);
    return false;
  }
};

// ============================================
// DEBUG: Print Firebase Status
// ============================================
export const debugFirebaseStatus = () => {
  console.log('🔍 Firebase Configuration Status:');
  console.log('═════════════════════════════════════════════');
  console.log('✓ Initialized:', isFirebaseInitialized);
  console.log('✓ Project ID:', firebaseConfig.projectId || '❌ NOT SET');
  console.log('✓ Auth Domain:', firebaseConfig.authDomain || '❌ NOT SET');
  console.log('✓ API Key:', firebaseConfig.apiKey ? '✅ SET' : '❌ NOT SET');
  console.log('═════════════════════════════════════════════');
  
  if (missingVars.length > 0) {
    console.error('⚠️ Missing environment variables:', missingVars);
  }
};

export default {
  saveOrderToFirebase,
  getOrdersFromFirebase,
  updateOrderStatus,
  deleteOrderFromFirebase,
  testFirebaseConnection,
  debugFirebaseStatus,
  isFirebaseInitialized
};