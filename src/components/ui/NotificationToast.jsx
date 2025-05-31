import React, { createContext, useContext, useState, useEffect } from 'react';
import Icon from '../AppIcon';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = (notification) => {
    const id = Date.now() + Math.random();
    const newNotification = {
      id,
      type: 'info',
      duration: 5000,
      ...notification
    };

    setNotifications(prev => [...prev, newNotification]);

    if (newNotification.duration > 0) {
      setTimeout(() => {
        removeNotification(id);
      }, newNotification.duration);
    }

    return id;
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationToast />
    </NotificationContext.Provider>
  );
};

const NotificationToast = () => {
  const { notifications, removeNotification } = useNotification();

  const getNotificationStyles = (type) => {
    const baseStyles = "border shadow-elevation-2 spring-animation";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-success-50 border-success-100 text-success-500`;
      case 'error':
        return `${baseStyles} bg-error-50 border-error-100 text-error-500`;
      case 'warning':
        return `${baseStyles} bg-warning-50 border-warning-100 text-warning-500`;
      case 'info':
      default:
        return `${baseStyles} bg-primary-50 border-primary-100 text-primary-500`;
    }
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return 'CheckCircle';
      case 'error':
        return 'XCircle';
      case 'warning':
        return 'AlertTriangle';
      case 'info':
      default:
        return 'Info';
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-notification space-y-2 max-w-sm w-full">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`
            ${getNotificationStyles(notification.type)}
            rounded-card p-4 flex items-start space-x-3
            animate-in slide-in-from-right duration-300
          `}
          role="alert"
          aria-live="polite"
        >
          <div className="flex-shrink-0">
            <Icon 
              name={getNotificationIcon(notification.type)} 
              size={20}
              className="mt-0.5"
            />
          </div>
          
          <div className="flex-1 min-w-0">
            {notification.title && (
              <h4 className="font-heading font-heading-medium text-sm text-text-primary mb-1">
                {notification.title}
              </h4>
            )}
            <p className="text-sm text-text-secondary font-body">
              {notification.message}
            </p>
            {notification.action && (
              <button
                onClick={notification.action.onClick}
                className="mt-2 text-sm font-body-medium text-primary hover:text-primary-600 spring-animation"
              >
                {notification.action.label}
              </button>
            )}
          </div>
          
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 p-1 rounded-button hover:bg-black/5 spring-animation"
            aria-label="Dismiss notification"
          >
            <Icon name="X" size={16} className="text-text-secondary" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default NotificationToast;