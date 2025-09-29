import React, { useEffect } from 'react';
import { 
  ShoppingCart, Home, Tag, User, MessageCircle, Search, 
  Heart, Star, ChevronDown, Menu, X, Phone, Mail,
  MapPin, Clock, Award, Truck, Shield, Users,
  ArrowRight, Plus, Minus, Trash2, Eye, CheckCircle,
  Facebook, Instagram, Send, Gift, Sparkles, Leaf,
  HelpCircle, FileText, BookOpen, Quote, Globe,
  Loader2, AlertCircle
} from 'lucide-react';

// LoadingSpinner Component
export const LoadingSpinner = ({ size = 24 }) => (
  <Loader2 size={size} className="animate-spin text-green-600" />
);

// ErrorMessage Component
export const ErrorMessage = ({ message, onRetry }) => (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
    <AlertCircle className="text-red-500" size={20} />
    <div className="flex-1">
      <p className="text-red-800">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="text-red-600 hover:text-red-800 text-sm underline"
        >
          حاول مرة أخرى
        </button>
      )}
    </div>
  </div>
);

// Badge Component
export const Badge = ({ children, variant = 'default' }) => {
  const variants = {
    default: 'bg-gray-100 text-gray-800',
    success: 'bg-green-100 text-green-800',
    warning: 'bg-yellow-100 text-yellow-800',
    danger: 'bg-red-100 text-red-800',
    info: 'bg-blue-100 text-blue-800'
  };
  
  return (
    <span className={`px-2 py-1 rounded-full text-xs font-medium ${variants[variant]}`}>
      {children}
    </span>
  );
};

// Notification Component
export const Notification = ({ notification, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => onClose(notification.id), 4000);
    return () => clearTimeout(timer);
  }, [notification.id, onClose]);

  const variants = {
    success: 'bg-green-500',
    error: 'bg-red-500',
    warning: 'bg-yellow-500',
    info: 'bg-blue-500'
  };

  return (
    <div className={`${variants[notification.type]} text-white p-4 rounded-lg shadow-lg mb-2 flex items-center justify-between animate-slide-in`}>
      <span>{notification.message}</span>
      <button 
        onClick={() => onClose(notification.id)} 
        className="hover:bg-white hover:bg-opacity-20 p-1 rounded transition-colors"
      >
        <X size={18} />
      </button>
    </div>
  );
};