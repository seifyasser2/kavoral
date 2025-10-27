// ============================================
// GOOGLE SHEETS SERVICE - ENHANCED VERSION
// المسار: src/services/googleSheetsService.js
// ============================================

/**
 * إرسال طلب جديد إلى Google Sheets
 * @param {object} orderData - بيانات الطلب
 * @returns {Promise<object>} - نتيجة العملية
 */
export const sendOrderToGoogleSheets = async (orderData) => {
  // الحصول على رابط الـ Apps Script
  const APPS_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL;

  console.log('🔍 Google Sheets URL:', APPS_SCRIPT_URL ? '✅ Found' : '❌ Not Found');

  // التحقق من وجود الرابط
  if (!APPS_SCRIPT_URL) {
    console.error('❌ REACT_APP_GOOGLE_SHEETS_URL is NOT defined in .env file!');
    console.error('📝 Create .env file in project root with:');
    console.error('   REACT_APP_GOOGLE_SHEETS_URL=https://script.google.com/macros/s/YOUR_ID/exec');
    console.error('⚠️ Then restart: npm start');
    
    return {
      success: false,
      error: 'Google Sheets URL is not configured',
      hint: 'Check .env file'
    };
  }

  // التحقق من صحة البيانات
  if (!orderData || !orderData.customerName || !orderData.phone) {
    console.error('❌ Invalid order data:', orderData);
    return {
      success: false,
      error: 'بيانات الطلب غير مكتملة'
    };
  }

  try {
    console.log('📤 Sending order to Google Sheets...');
    console.log('📊 Order data:', {
      orderNumber: orderData.orderNumber,
      customer: orderData.customerName,
      phone: orderData.phone,
      total: orderData.total,
      itemsCount: orderData.items?.length || 0
    });

    // إرسال البيانات
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 seconds

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    console.log('📡 Response status:', response.status, response.statusText);

    // التحقق من نجاح الطلب
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // قراءة الاستجابة
    const result = await response.json();
    
    console.log('✅ Response from Google Sheets:', result);

    if (result.success) {
      console.log('🎉 Order saved successfully!');
      console.log('📝 Order ID:', result.data?.orderId);
      console.log('📍 Row number:', result.data?.rowNumber);
    } else {
      console.warn('⚠️ Google Sheets returned success=false:', result);
    }

    return {
      success: true,
      data: result,
      message: 'تم حفظ الطلب في قاعدة البيانات بنجاح'
    };

  } catch (error) {
    console.error('❌ Error sending order to Google Sheets:', error);

    // معالجة أنواع الأخطاء المختلفة
    let errorMessage = 'فشل حفظ الطلب في قاعدة البيانات';
    let hint = '';

    if (error.name === 'AbortError') {
      errorMessage = 'انتهت مهلة الاتصال';
      hint = 'Check internet connection or Apps Script response time';
      console.error('⏱️ Timeout: Apps Script took too long to respond');
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = 'خطأ في الاتصال بالإنترنت';
      hint = 'Check network connection or CORS settings';
      console.error('🌐 Network error or CORS issue');
      console.error('💡 Make sure Apps Script is deployed with "Anyone" access');
    } else if (error.message.includes('HTTP Error')) {
      errorMessage = 'خطأ في الخادم';
      hint = 'Apps Script returned an error';
      console.error('🚨 Server error from Google Apps Script');
    }

    console.error('💡 Hint:', hint);

    return {
      success: false,
      error: errorMessage,
      details: error.message,
      hint: hint
    };
  }
};

/**
 * اختبار الاتصال بـ Google Sheets
 * @returns {Promise<boolean>}
 */
export const testGoogleSheetsConnection = async () => {
  const APPS_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL;

  console.log('🧪 Testing Google Sheets connection...');

  if (!APPS_SCRIPT_URL) {
    console.error('❌ Google Sheets URL not configured');
    return false;
  }

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      signal: controller.signal
    });

    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      console.log('✅ Connection test successful:', result);
      return true;
    }

    console.warn('⚠️ Connection test failed:', response.status);
    return false;

  } catch (error) {
    console.error('❌ Connection test failed:', error.message);
    return false;
  }
};

/**
 * Debug helper - طباعة معلومات البيئة
 */
export const debugEnvironment = () => {
  console.log('🔍 Environment Debug Info:');
  console.log('═══════════════════════════════════════');
  console.log('📍 REACT_APP_GOOGLE_SHEETS_URL:', process.env.REACT_APP_GOOGLE_SHEETS_URL ? '✅ Defined' : '❌ NOT Defined');
  if (process.env.REACT_APP_GOOGLE_SHEETS_URL) {
    const url = process.env.REACT_APP_GOOGLE_SHEETS_URL;
    console.log('🔗 URL:', url);
    console.log('✓ Contains "script.google.com":', url.includes('script.google.com'));
    console.log('✓ Contains "/exec":', url.includes('/exec'));
    console.log('✓ Starts with "https://":', url.startsWith('https://'));
  } else {
    console.log('⚠️ Create .env file with:');
    console.log('   REACT_APP_GOOGLE_SHEETS_URL=your_apps_script_url');
  }
  console.log('═══════════════════════════════════════');
};

export default {
  sendOrderToGoogleSheets,
  testGoogleSheetsConnection,
  debugEnvironment
};