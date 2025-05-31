import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../components/AppIcon';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center space-y-8">
        <div className="space-y-4">
          <div className="w-24 h-24 mx-auto bg-primary-50 rounded-full flex items-center justify-center">
            <Icon name="AlertCircle" size={48} className="text-primary" />
          </div>
          
          <div className="space-y-2">
            <h1 className="text-6xl font-heading font-bold text-text-primary">404</h1>
            <h2 className="text-2xl font-heading font-heading-medium text-text-primary">
              Page Not Found
            </h2>
            <p className="text-text-secondary font-body">
              Sorry, the page you are looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <button
            onClick={() => navigate('/home-feed')}
            className="w-full bg-primary text-white py-3 px-6 rounded-button font-body-medium hover:bg-primary-600 spring-animation hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go to Home
          </button>
          
          <button
            onClick={() => navigate(-1)}
            className="w-full bg-surface border border-border text-text-primary py-3 px-6 rounded-button font-body-medium hover:bg-primary-50 spring-animation hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          >
            Go Back
          </button>
        </div>

        <div className="pt-8 border-t border-border-light">
          <p className="text-sm text-text-secondary font-body">
            Need help? Contact our support team
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;