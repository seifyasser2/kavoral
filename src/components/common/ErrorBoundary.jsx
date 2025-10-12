// ============================================
// ERROR BOUNDARY COMPONENT
// المسار: src/components/common/ErrorBoundary.jsx
// الاستخدام:
// <ErrorBoundary>
//   <YourComponent />
// </ErrorBoundary>
// ============================================

import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // تسجيل الخطأ
    console.error('Error caught by boundary:', error, errorInfo);

    // تحديث الحالة
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));

    // إرسال الخطأ للـ analytics (اختياري)
    this.reportError(error, errorInfo);
  }

  /**
   * تقرير الخطأ
   */
  reportError = (error, errorInfo) => {
    const errorData = {
      message: error?.toString(),
      stack: errorInfo?.componentStack,
      timestamp: new Date().toISOString(),
      url: window.location.href
    };

    console.error('Error Report:', errorData);
  };

  /**
   * إعادة تعيين الخطأ
   */
  resetError = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    });
  };

  /**
   * الذهاب للرئيسية
   */
  goHome = () => {
    this.resetError();
    window.location.href = '/';
  };

  /**
   * إعادة تحميل الصفحة
   */
  reloadPage = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 via-orange-50 to-red-50 flex items-center justify-center p-4">
          <div className="max-w-md w-full">
            {/* Error Card */}
            <div className="bg-white rounded-2xl shadow-2xl p-8 border-2 border-red-200">
              {/* Error Icon */}
              <div className="flex justify-center mb-6">
                <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center animate-bounce">
                  <AlertCircle size={48} className="text-red-600" />
                </div>
              </div>

              {/* Error Title */}
              <h1 className="text-3xl font-bold text-red-600 text-center mb-4">
                حدث خطأ ما! 😕
              </h1>

              {/* Error Message */}
              <p className="text-gray-600 text-center mb-6 leading-relaxed">
                عذراً، حدثت مشكلة غير متوقعة. يرجى محاولة تحديث الصفحة أو العودة للرئيسية.
              </p>

              {/* Error Details (في الـ development فقط) */}
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <div className="bg-gray-100 rounded-lg p-4 mb-6 border-l-4 border-red-500 max-h-48 overflow-y-auto">
                  <p className="text-xs text-gray-700 font-mono mb-2 font-bold">
                    Error Details:
                  </p>
                  <p className="text-xs text-red-700 font-mono break-words">
                    {this.state.error?.toString()}
                  </p>
                  {this.state.errorInfo && (
                    <details className="mt-3 text-xs">
                      <summary className="cursor-pointer font-bold text-gray-700 mb-2">
                        Component Stack
                      </summary>
                      <pre className="bg-gray-800 text-gray-200 p-2 rounded text-xs overflow-x-auto">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </details>
                  )}
                </div>
              )}

              {/* Error Count */}
              <p className="text-xs text-gray-500 text-center mb-4">
                رقم الخطأ: {this.state.errorCount}
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <button
                  onClick={this.reloadPage}
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 px-6 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <RefreshCw size={20} />
                  تحديث الصفحة
                </button>

                <button
                  onClick={this.goHome}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white py-3 px-6 rounded-xl hover:from-green-600 hover:to-green-700 transition-all font-bold flex items-center justify-center gap-2 shadow-lg"
                >
                  <Home size={20} />
                  العودة للرئيسية
                </button>

                {process.env.NODE_ENV === 'development' && (
                  <button
                    onClick={this.resetError}
                    className="w-full bg-gray-300 text-gray-700 py-3 px-6 rounded-xl hover:bg-gray-400 transition-all font-bold"
                  >
                    محاولة مرة أخرى
                  </button>
                )}
              </div>

              {/* Additional Info */}
              <p className="text-xs text-gray-500 text-center mt-6">
                إذا استمرت المشكلة، يرجى التواصل معنا
              </p>
            </div>

            {/* Background decoration */}
            <div className="fixed inset-0 pointer-events-none opacity-10">
              <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-400 rounded-full blur-3xl"></div>
              <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-orange-400 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;