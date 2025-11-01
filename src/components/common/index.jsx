import React, { useEffect } from 'react';
import { Loader2, AlertCircle, X } from 'lucide-react';

// ============================================
// LOADING SPINNER COMPONENT - Enhanced
// ============================================
export const LoadingSpinner = ({ size = 24, className = '' }) => (
  <div className="inline-flex items-center justify-center">
    <Loader2 
      size={size} 
      className={`animate-spin text-green-600 ${className}`} 
      aria-label="Loading"
    />
  </div>
);

// ============================================
// FULL PAGE LOADER
// ============================================
export const FullPageLoader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
    <div className="text-center">
      <LoadingSpinner size={48} />
      <p className="mt-4 text-gray-600 font-medium">جاري التحميل...</p>
    </div>
  </div>
);

// ============================================
// ERROR MESSAGE COMPONENT
// ============================================
export const ErrorMessage = ({ message, onRetry, className = '' }) => (
  <div className={`bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3 ${className}`}>
    <AlertCircle className="text-red-500 flex-shrink-0 mt-0.5" size={20} />
    <div className="flex-1">
      <p className="text-red-800 mb-2">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-red-600 hover:text-red-800 text-sm font-medium underline hover:no-underline transition-colors"
        >
          حاول مرة أخرى
        </button>
      )}
    </div>
  </div>
);

// ============================================
// BADGE COMPONENT
// ============================================
export const Badge = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800 border-gray-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    danger: 'bg-red-100 text-red-800 border-red-200',
    info: 'bg-blue-100 text-blue-800 border-blue-200'
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};

// ============================================
// NOTIFICATION COMPONENT
// ============================================
export const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onClose && notification.id) {
        onClose(notification.id);
      }
    }, 4000);
    
    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const variants = {
    success: {
      bg: 'bg-green-500',
      icon: '✓'
    },
    error: {
      bg: 'bg-red-500',
      icon: '✕'
    },
    warning: {
      bg: 'bg-yellow-500',
      icon: '⚠'
    },
    info: {
      bg: 'bg-blue-500',
      icon: 'ℹ'
    }
  };

  const variant = variants[notification.type] || variants.info;

  return (
    <div 
      className={`${variant.bg} text-white p-4 rounded-lg shadow-lg flex items-center justify-between gap-3 animate-slide-in min-w-[280px] max-w-md`}
      role="alert"
    >
      <div className="flex items-center gap-3">
        <span className="text-lg font-bold">{variant.icon}</span>
        <span className="text-sm font-medium">{notification.message}</span>
      </div>
      <button 
        onClick={() => onClose && onClose(notification.id)} 
        className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors flex-shrink-0"
        aria-label="Close notification"
      >
        <X size={18} />
      </button>
    </div>
  );
};

// ============================================
// EMPTY STATE COMPONENT
// ============================================
export const EmptyState = ({ 
  icon: Icon, 
  title, 
  description, 
  actionLabel, 
  onAction,
  className = ''
}) => (
  <div className={`text-center py-12 ${className}`}>
    <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
      {Icon && <Icon size={48} className="text-gray-300" />}
    </div>
    <h3 className="text-2xl font-bold text-gray-600 mb-3">{title}</h3>
    {description && (
      <p className="text-gray-500 mb-6 max-w-md mx-auto leading-relaxed">
        {description}
      </p>
    )}
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors font-medium"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

// ============================================
// CONFIRMATION MODAL COMPONENT
// ============================================
export const ConfirmModal = ({ 
  isOpen, 
  title, 
  message, 
  confirmLabel = 'تأكيد', 
  cancelLabel = 'إلغاء',
  onConfirm, 
  onCancel,
  type = 'danger' // 'danger' | 'warning' | 'info'
}) => {
  if (!isOpen) return null;

  const typeStyles = {
    danger: 'bg-red-600 hover:bg-red-700',
    warning: 'bg-yellow-600 hover:bg-yellow-700',
    info: 'bg-blue-600 hover:bg-blue-700'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 animate-scale-in">
        <h3 className="text-xl font-bold text-gray-800 mb-3">{title}</h3>
        <div className="text-gray-600 mb-6 leading-relaxed">
          {typeof message === 'string' ? <p>{message}</p> : message}
        </div>
        
        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 bg-gray-200 text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            {cancelLabel}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 text-white px-4 py-2.5 rounded-lg transition-colors font-medium ${typeStyles[type]}`}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

// ============================================
// SECTION HEADER COMPONENT
// ============================================
export const SectionHeader = ({ title, subtitle, icon: Icon, className = '' }) => (
  <div className={`text-center mb-8 ${className}`}>
    {Icon && (
      <div className="flex justify-center mb-4">
        <Icon size={48} className="text-green-600" />
      </div>
    )}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">{title}</h2>
    {subtitle && (
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>
    )}
  </div>
);



 export { default as PWAInstallPrompt } from './PWAInstallPrompt';

// ============================================
// CUSTOM CSS ANIMATIONS
// ============================================
export const GlobalStyles = () => (
  <style jsx global>{`
    @keyframes slide-in {
      from {
        transform: translateX(100%);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }
    
    @keyframes fade-in {
      from {
        opacity: 0;
      }
      to {
        opacity: 1;
      }
    }
    
    @keyframes scale-in {
      from {
        transform: scale(0.9);
        opacity: 0;
      }
      to {
        transform: scale(1);
        opacity: 1;
      }
    }
    
    .animate-slide-in {
      animation: slide-in 0.3s ease-out;
    }
    
    .animate-fade-in {
      animation: fade-in 0.2s ease-out;
    }
    
    .animate-scale-in {
      animation: scale-in 0.3s ease-out;
    }
  `}</style>
);