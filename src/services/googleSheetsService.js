// ============================================
// GOOGLE SHEETS SERVICE
// المسار: src/services/googleSheetsService.js
// ============================================

/**
 * إرسال طلب جديد إلى Google Sheets
 * @param {object} orderData - بيانات الطلب
 * @returns {Promise<object>} - نتيجة العملية
 */
export const sendOrderToGoogleSheets = async (orderData) => {
  try {
    // الحصول على رابط الـ Apps Script من المتغيرات البيئية
    const APPS_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL;

    // التحقق من وجود الرابط
    if (!APPS_SCRIPT_URL) {
      console.error('❌ REACT_APP_GOOGLE_SHEETS_URL is not defined in .env file');
      return {
        success: false,
        error: 'Google Sheets URL is not configured'
      };
    }

    // التحقق من صحة البيانات
    if (!orderData || !orderData.customerName || !orderData.phone) {
      return {
        success: false,
        error: 'بيانات الطلب غير مكتملة'
      };
    }

    console.log('📤 Sending order to Google Sheets...', {
      orderNumber: orderData.orderNumber,
      customer: orderData.customerName
    });

    // إرسال البيانات إلى Google Sheets
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
      // إضافة timeout
      signal: AbortSignal.timeout(15000) // 15 seconds
    });

    // التحقق من نجاح الطلب
    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status} ${response.statusText}`);
    }

    // قراءة الاستجابة
    const result = await response.json();

    console.log('✅ Order saved to Google Sheets:', result);

    return {
      success: true,
      data: result,
      message: 'تم حفظ الطلب في قاعدة البيانات بنجاح'
    };

  } catch (error) {
    console.error('❌ Error sending order to Google Sheets:', error);

    // معالجة أنواع الأخطاء المختلفة
    let errorMessage = 'فشل حفظ الطلب في قاعدة البيانات';

    if (error.name === 'AbortError') {
      errorMessage = 'انتهت مهلة الاتصال. يرجى المحاولة مرة أخرى';
    } else if (error.message.includes('Failed to fetch')) {
      errorMessage = 'خطأ في الاتصال بالإنترنت';
    } else if (error.message.includes('HTTP Error')) {
      errorMessage = 'خطأ في الخادم. يرجى المحاولة لاحقاً';
    }

    return {
      success: false,
      error: errorMessage,
      details: error.message
    };
  }
};

/**
 * اختبار الاتصال بـ Google Sheets
 * @returns {Promise<boolean>}
 */
export const testGoogleSheetsConnection = async () => {
  try {
    const APPS_SCRIPT_URL = process.env.REACT_APP_GOOGLE_SHEETS_URL;

    if (!APPS_SCRIPT_URL) {
      console.error('❌ Google Sheets URL not configured');
      return false;
    }

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'GET',
      signal: AbortSignal.timeout(10000)
    });

    if (response.ok) {
      console.log('✅ Google Sheets connection: OK');
      return true;
    }

    console.warn('⚠️ Google Sheets connection: Failed');
    return false;

  } catch (error) {
    console.error('❌ Google Sheets connection test failed:', error);
    return false;
  }
};

export default {
  sendOrderToGoogleSheets,
  testGoogleSheetsConnection
};