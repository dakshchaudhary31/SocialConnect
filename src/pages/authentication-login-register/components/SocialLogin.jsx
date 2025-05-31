import React from 'react';
import Icon from '../../../components/AppIcon';

const SocialLogin = ({ onSocialLogin }) => {
  const socialProviders = [
    {
      name: 'Google',
      icon: 'Chrome',
      color: 'text-red-500',
      bgColor: 'hover:bg-red-50',
      borderColor: 'border-red-200'
    },
    {
      name: 'Facebook',
      icon: 'Facebook',
      color: 'text-blue-600',
      bgColor: 'hover:bg-blue-50',
      borderColor: 'border-blue-200'
    },
    {
      name: 'Apple',
      icon: 'Apple',
      color: 'text-gray-800',
      bgColor: 'hover:bg-gray-50',
      borderColor: 'border-gray-200'
    }
  ];

  return (
    <div className="space-y-3">
      <p className="text-sm text-text-secondary font-body text-center mb-4">
        Continue with your social account
      </p>
      
      <div className="grid grid-cols-1 gap-3">
        {socialProviders.map((provider) => (
          <button
            key={provider.name}
            onClick={() => onSocialLogin(provider.name)}
            className={`
              w-full flex items-center justify-center space-x-3 py-3 px-4 
              border ${provider.borderColor} rounded-button font-body-medium 
              ${provider.bgColor} ${provider.color} spring-animation hover-lift
              focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
            `}
          >
            <Icon name={provider.icon} size={20} />
            <span className="text-text-primary">Continue with {provider.name}</span>
          </button>
        ))}
      </div>

      {/* Alternative: Icon-only layout for desktop */}
      <div className="hidden sm:block">
        <div className="flex justify-center space-x-4 mt-4">
          {socialProviders.map((provider) => (
            <button
              key={`${provider.name}-icon`}
              onClick={() => onSocialLogin(provider.name)}
              className={`
                w-12 h-12 flex items-center justify-center 
                border ${provider.borderColor} rounded-button 
                ${provider.bgColor} ${provider.color} spring-animation hover-lift
                focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
              `}
              title={`Continue with ${provider.name}`}
            >
              <Icon name={provider.icon} size={20} />
            </button>
          ))}
        </div>
        <p className="text-xs text-text-secondary font-body text-center mt-2">
          Quick sign in with social accounts
        </p>
      </div>
    </div>
  );
};

export default SocialLogin;