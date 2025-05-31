import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading, onForgotPassword }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const mockCredentials = {
    email: 'dakshchaudhary@example.com',
    password: 'password123'
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    // Check mock credentials
    if (formData.email !== mockCredentials.email || formData.password !== mockCredentials.password) {
      setErrors({
        general: `Invalid credentials. Use email: ${mockCredentials.email} and password: ${mockCredentials.password}`
      });
      return;
    }

    onSubmit(formData);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear errors when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
    if (errors.general) {
      setErrors(prev => ({ ...prev, general: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* General Error */}
      {errors.general && (
        <div className="bg-error-50 border border-error-100 rounded-button p-3 flex items-start space-x-2">
          <Icon name="AlertCircle" size={16} className="text-error-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-error-500 font-body">{errors.general}</p>
        </div>
      )}

      {/* Mock Credentials Info */}
      <div className="bg-primary-50 border border-primary-100 rounded-button p-3">
        <div className="flex items-start space-x-2">
          <Icon name="Info" size={16} className="text-primary mt-0.5 flex-shrink-0" />
          <div className="text-sm text-primary font-body">
            <p className="font-body-medium mb-1">Demo Credentials:</p>
            <p>Email: {mockCredentials.email}</p>
            <p>Password: {mockCredentials.password}</p>
          </div>
        </div>
      </div>

      {/* Email Field */}
      <div className="space-y-1">
        <label htmlFor="email" className="block text-sm font-body-medium text-text-primary">
          Email Address
        </label>
        <div className="relative">
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-button font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent spring-animation ${
              errors.email ? 'border-error-500 bg-error-50' : 'border-border hover:border-primary-300'
            }`}
            placeholder="Enter your email"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Icon name="Mail" size={18} className="text-text-secondary" />
          </div>
        </div>
        {errors.email && (
          <p className="text-sm text-error-500 font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.email}</span>
          </p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label htmlFor="password" className="block text-sm font-body-medium text-text-primary">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? 'text' : 'password'}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 pr-12 border rounded-button font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent spring-animation ${
              errors.password ? 'border-error-500 bg-error-50' : 'border-border hover:border-primary-300'
            }`}
            placeholder="Enter your password"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary spring-animation"
            disabled={loading}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.password && (
          <p className="text-sm text-error-500 font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between">
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="rememberMe"
            checked={formData.rememberMe}
            onChange={handleChange}
            className="w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2"
            disabled={loading}
          />
          <span className="text-sm text-text-secondary font-body">Remember me</span>
        </label>
        
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm text-primary hover:text-primary-600 font-body spring-animation"
          disabled={loading}
        >
          Forgot password?
        </button>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-white py-3 px-4 rounded-button font-body-medium hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 spring-animation hover-lift disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {loading ? (
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Signing in...</span>
          </div>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
};

export default LoginForm;