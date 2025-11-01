// ============================================
// PWA INSTALL PROMPT COMPONENT
// المسار: src/components/common/PWAInstallPrompt.jsx
// ============================================

import React, { useState, useEffect } from 'react';
import { Download, X } from 'lucide-react';

const PWAInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isInstalling, setIsInstalling] = useState(false);

  useEffect(() => {
    // التحقق من التثبيت
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches;
    if (isInstalled) {
      return;
    }

    // ✅ NEW: التحقق من آخر مرة ظهر فيها البانر
    const lastPromptDate = localStorage.getItem('pwa_prompt_last_shown');
    const DAYS_TO_WAIT = 7; // يظهر كل 7 أيام
    
    if (lastPromptDate) {
      const daysSinceLastPrompt = Math.floor(
        (Date.now() - parseInt(lastPromptDate)) / (1000 * 60 * 60 * 24)
      );
      
      // لو لسه مش عدى الوقت المطلوب، لا تعرض البانر
      if (daysSinceLastPrompt < DAYS_TO_WAIT) {
        console.log(`ℹ️ PWA Prompt: Waiting ${DAYS_TO_WAIT - daysSinceLastPrompt} more days`);
        return;
      }
    }

    // استماع لحدث beforeinstallprompt
    const handleBeforeInstallPrompt = (e) => {
      // منع عرض البانر الافتراضي
      e.preventDefault();
      console.log('✅ PWA Install Prompt detected');
      
      // حفظ الحدث للاستخدام لاحقاً
      setDeferredPrompt(e);
      
      // عرض البانر المخصص بعد 3 ثواني
      setTimeout(() => {
        setShowPrompt(true);
        // ✅ NEW: حفظ تاريخ آخر مرة ظهر فيها البانر
        localStorage.setItem('pwa_prompt_last_shown', Date.now().toString());
      }, 3000);
    };

    // التحقق من تثبيت التطبيق
    const handleAppInstalled = () => {
      console.log('✅ PWA Installed successfully');
      setShowPrompt(false);
      setDeferredPrompt(null);
      localStorage.setItem('pwa_prompt_dismissed', 'true');
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) {
      console.warn('⚠️ Install prompt not available');
      return;
    }

    setIsInstalling(true);

    try {
      // عرض البانر الأصلي
      await deferredPrompt.prompt();
      
      // انتظار اختيار المستخدم
      const { outcome } = await deferredPrompt.userChoice;
      
      console.log(`✅ User response: ${outcome}`);
      
      if (outcome === 'accepted') {
        console.log('🎉 User accepted the install prompt');
      } else {
        console.log('❌ User dismissed the install prompt');
        localStorage.setItem('pwa_prompt_dismissed', 'true');
      }
      
      // إخفاء البانر
      setShowPrompt(false);
      setDeferredPrompt(null);
    } catch (error) {
      console.error('❌ Install error:', error);
    } finally {
      setIsInstalling(false);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    // ✅ UPDATED: لا نحفظ "dismissed" - فقط التاريخ محفوظ
    console.log('ℹ️ User dismissed PWA prompt - will show again in 7 days');
  };

  if (!showPrompt || !deferredPrompt) {
    return null;
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[9998] animate-fade-in"
        onClick={handleDismiss}
      />

      {/* Install Banner */}
      <div className="fixed bottom-20 md:bottom-6 left-4 right-4 z-[9999] animate-slide-in-right safe-area-bottom">
        <div className="max-w-md mx-auto bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl shadow-2xl p-4 border-2 border-white/20">
          <div className="flex items-start gap-3">
            {/* Icon */}
            <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
              <img 
                src="/logo192.png" 
                alt="Kavoral" 
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'block';
                }}
              />
              <span className="text-2xl hidden">🌿</span>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h3 className="text-white font-bold text-base mb-1">
                🚀 نزّل تطبيق Kavoral
              </h3>
              <p className="text-white/90 text-sm leading-snug">
                للحصول على تجربة أسرع وإشعارات العروض الحصرية!
              </p>

              {/* Actions */}
              <div className="flex gap-2 mt-3">
                <button
                  onClick={handleInstall}
                  disabled={isInstalling}
                  className="flex-1 bg-white text-green-600 py-2 px-4 rounded-xl font-bold hover:bg-gray-50 transition-all text-sm flex items-center justify-center gap-2 shadow-lg disabled:opacity-50"
                >
                  {isInstalling ? (
                    <>
                      <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
                      <span>جاري التثبيت...</span>
                    </>
                  ) : (
                    <>
                      <Download size={16} />
                      <span>تثبيت الآن</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDismiss}
                  className="bg-white/10 backdrop-blur-sm text-white p-2 rounded-xl hover:bg-white/20 transition-all"
                  aria-label="إغلاق"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-white/20">
            <div className="text-center">
              <div className="text-white text-xl mb-1">⚡</div>
              <p className="text-white/90 text-xs font-semibold">سرعة فائقة</p>
            </div>
            <div className="text-center">
              <div className="text-white text-xl mb-1">🔔</div>
              <p className="text-white/90 text-xs font-semibold">إشعارات فورية</p>
            </div>
            <div className="text-center">
              <div className="text-white text-xl mb-1">📱</div>
              <p className="text-white/90 text-xs font-semibold">وضع عدم الاتصال</p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .safe-area-bottom {
          padding-bottom: max(0px, env(safe-area-inset-bottom));
        }
      `}</style>
    </>
  );
};

export default PWAInstallPrompt;

