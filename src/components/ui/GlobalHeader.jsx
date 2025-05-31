import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';

const GlobalHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPageTitle = () => {
    switch (location.pathname) {
      case '/home-feed':
        return 'Home';
      case '/user-profile':
        return 'Profile';
      case '/authentication-login-register':
        return 'Welcome';
      default:
        return 'SocialConnect';
    }
  };

  const getContextualActions = () => {
    switch (location.pathname) {
      case '/home-feed':
        return (
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-button hover-lift text-text-secondary hover:text-primary transition-colors"
              onClick={() => console.log('Search clicked')}
              aria-label="Search"
            >
              <Icon name="Search" size={20} />
            </button>
            <button 
              className="p-2 rounded-button hover-lift text-text-secondary hover:text-primary transition-colors"
              onClick={() => console.log('Notifications clicked')}
              aria-label="Notifications"
            >
              <Icon name="Bell" size={20} />
            </button>
          </div>
        );
      case '/user-profile':
        return (
          <div className="flex items-center space-x-2">
            <button 
              className="p-2 rounded-button hover-lift text-text-secondary hover:text-primary transition-colors"
              onClick={() => console.log('Edit profile clicked')}
              aria-label="Edit Profile"
            >
              <Icon name="Edit" size={20} />
            </button>
            <button 
              className="p-2 rounded-button hover-lift text-text-secondary hover:text-primary transition-colors"
              onClick={() => console.log('Settings clicked')}
              aria-label="Settings"
            >
              <Icon name="Settings" size={20} />
            </button>
          </div>
        );
      case '/authentication-login-register':
        return (
          <button 
            className="p-2 rounded-button hover-lift text-text-secondary hover:text-primary transition-colors"
            onClick={() => console.log('Help clicked')}
            aria-label="Help"
          >
            <Icon name="HelpCircle" size={20} />
          </button>
        );
      default:
        return null;
    }
  };

  const Logo = () => (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={() => navigate('/home-feed')}>
      <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-avatar flex items-center justify-center">
        <Icon name="Users" size={18} color="white" />
      </div>
      <span className="font-heading font-heading-medium text-lg text-text-primary hidden sm:block">
        SocialConnect
      </span>
    </div>
  );

  return (
    <header className="sticky top-0 z-navigation bg-surface border-b border-border-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          <Logo />
          
          <div className="hidden md:flex items-center space-x-4">
            <h1 className="font-heading font-heading-medium text-xl text-text-primary">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-2">
            {getContextualActions()}
            
            <button
              className="md:hidden p-2 rounded-button hover-lift text-text-secondary hover:text-primary transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t border-border-light py-4 space-y-2">
            <div className="text-center">
              <h1 className="font-heading font-heading-medium text-lg text-text-primary">
                {getPageTitle()}
              </h1>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default GlobalHeader;