import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const PrimaryNavigation = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    {
      label: 'Home',
      path: '/home-feed',
      icon: 'Home',
      badge: null
    },
    {
      label: 'Profile',
      path: '/user-profile',
      icon: 'User',
      badge: null
    },
    {
      label: 'Login',
      path: '/authentication-login-register',
      icon: 'LogIn',
      badge: null
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isActive = (path) => location.pathname === path;

  const NavItem = ({ item, isMobile = false }) => {
    const active = isActive(item.path);
    
    return (
      <button
        onClick={() => handleNavigation(item.path)}
        className={`
          relative flex items-center justify-center space-x-2 p-3 rounded-button spring-animation
          ${isMobile ? 'flex-col space-x-0 space-y-1 min-h-[48px]' : 'w-full justify-start px-4'}
          ${active 
            ? 'bg-primary-50 text-primary border border-primary-100' :'text-text-secondary hover:text-primary hover:bg-primary-50/50'
          }
          hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
        `}
        aria-label={item.label}
        aria-current={active ? 'page' : undefined}
      >
        <div className="relative">
          <Icon 
            name={item.icon} 
            size={isMobile ? 20 : 18} 
            strokeWidth={active ? 2.5 : 2}
          />
          {item.badge && (
            <span className="absolute -top-1 -right-1 bg-accent text-white text-xs rounded-full w-4 h-4 flex items-center justify-center font-data">
              {item.badge}
            </span>
          )}
        </div>
        <span className={`
          font-body ${active ? 'font-body-medium' : 'font-body-normal'}
          ${isMobile ? 'text-xs' : 'text-sm'}
        `}>
          {item.label}
        </span>
      </button>
    );
  };

  return (
    <>
      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-navigation bg-surface border-t border-border shadow-elevation-2">
        <div className="flex items-center justify-around px-4 py-2">
          {navigationItems.map((item) => (
            <NavItem key={item.path} item={item} isMobile={true} />
          ))}
        </div>
      </nav>

      {/* Desktop Sidebar Navigation */}
      <nav className="hidden md:block fixed left-0 top-16 lg:top-18 bottom-0 w-64 z-navigation bg-surface border-r border-border overflow-y-auto">
        <div className="p-6 space-y-2">
          <div className="mb-6">
            <h2 className="font-heading font-heading-medium text-sm text-text-secondary uppercase tracking-wide mb-4">
              Navigation
            </h2>
          </div>
          
          {navigationItems.map((item) => (
            <NavItem key={item.path} item={item} isMobile={false} />
          ))}
          
          <div className="pt-6 mt-6 border-t border-border-light">
            <div className="space-y-2">
              <button
                onClick={() => console.log('Settings clicked')}
                className="flex items-center space-x-2 w-full p-3 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50/50 spring-animation hover-lift"
              >
                <Icon name="Settings" size={18} />
                <span className="font-body font-body-normal text-sm">Settings</span>
              </button>
              
              <button
                onClick={() => console.log('Help clicked')}
                className="flex items-center space-x-2 w-full p-3 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50/50 spring-animation hover-lift"
              >
                <Icon name="HelpCircle" size={18} />
                <span className="font-body font-body-normal text-sm">Help & Support</span>
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default PrimaryNavigation;