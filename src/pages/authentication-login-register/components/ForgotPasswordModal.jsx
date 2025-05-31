import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ForgotPasswordModal = ({ onClose, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setLoading(true);
    setError('');
    
    // Simulate API call
    setTimeout(() => {
      onSubmit(email);
      setLoading(false);
    }, 1000);
  };

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-modal p-4">
      <div className="bg-surface rounded-card shadow-elevation-3 w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border-light">
          <h2 className="text-xl font-heading font-heading-medium text-text-primary">
            Reset Password
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-button hover:bg-gray-100 spring-animation"
            disabled={loading}
          >
            <Icon name="X" size={20} className="text-text-secondary" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-text-secondary font-body mb-6">
            Enter your email address and we'll send you instructions to reset your password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label htmlFor="reset-email" className="block text-sm font-body-medium text-text-primary">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  id="reset-email"
                  value={email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-button font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent spring-animation ${
                    error ? 'border-error-500 bg-error-50' : 'border-border hover:border-primary-300'
                  }`}
                  placeholder="Enter your email"
                  disabled={loading}
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                  <Icon name="Mail" size={18} className="text-text-secondary" />
                </div>
              </div>
              {error && (
                <p className="text-sm text-error-500 font-body flex items-center space-x-1">
                  <Icon name="AlertCircle" size={14} />
                  <span>{error}</span>
                </p>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                disabled={loading}
                className="flex-1 bg-surface border border-border text-text-primary py-3 px-4 rounded-button font-body-medium hover:bg-primary-50 spring-animation hover-lift disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !email}
                className="flex-1 bg-primary text-white py-3 px-4 rounded-button font-body-medium hover:bg-primary-600 spring-animation hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Send Reset Link'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;