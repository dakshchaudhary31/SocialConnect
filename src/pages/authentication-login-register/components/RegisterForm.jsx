import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const RegisterForm = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Display name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

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

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

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
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: '', color: '' };
    
    let strength = 0;
    if (password.length >= 6) strength++;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;

    const levels = [
      { strength: 0, label: '', color: '' },
      { strength: 1, label: 'Very Weak', color: 'bg-error-500' },
      { strength: 2, label: 'Weak', color: 'bg-warning-500' },
      { strength: 3, label: 'Fair', color: 'bg-warning-500' },
      { strength: 4, label: 'Good', color: 'bg-success-500' },
      { strength: 5, label: 'Strong', color: 'bg-success-500' }
    ];

    return levels[strength];
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Display Name Field */}
      <div className="space-y-1">
        <label htmlFor="name" className="block text-sm font-body-medium text-text-primary">
          Display Name
        </label>
        <div className="relative">
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-button font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent spring-animation ${
              errors.name ? 'border-error-500 bg-error-50' : 'border-border hover:border-primary-300'
            }`}
            placeholder="Enter your display name"
            disabled={loading}
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Icon name="User" size={18} className="text-text-secondary" />
          </div>
        </div>
        {errors.name && (
          <p className="text-sm text-error-500 font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.name}</span>
          </p>
        )}
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
            placeholder="Create a password"
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
        
        {/* Password Strength Indicator */}
        {formData.password && (
          <div className="space-y-1">
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded-full ${
                    level <= passwordStrength.strength ? passwordStrength.color : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            {passwordStrength.label && (
              <p className="text-xs text-text-secondary font-body">
                Password strength: {passwordStrength.label}
              </p>
            )}
          </div>
        )}
        
        {errors.password && (
          <p className="text-sm text-error-500 font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.password}</span>
          </p>
        )}
      </div>

      {/* Confirm Password Field */}
      <div className="space-y-1">
        <label htmlFor="confirmPassword" className="block text-sm font-body-medium text-text-primary">
          Confirm Password
        </label>
        <div className="relative">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className={`w-full px-4 py-3 pr-12 border rounded-button font-body placeholder-text-secondary focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent spring-animation ${
              errors.confirmPassword ? 'border-error-500 bg-error-50' : 'border-border hover:border-primary-300'
            }`}
            placeholder="Confirm your password"
            disabled={loading}
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-text-secondary hover:text-primary spring-animation"
            disabled={loading}
          >
            <Icon name={showConfirmPassword ? 'EyeOff' : 'Eye'} size={18} />
          </button>
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-error-500 font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.confirmPassword}</span>
          </p>
        )}
      </div>

      {/* Terms Acceptance */}
      <div className="space-y-1">
        <label className="flex items-start space-x-2 cursor-pointer">
          <input
            type="checkbox"
            name="acceptTerms"
            checked={formData.acceptTerms}
            onChange={handleChange}
            className={`w-4 h-4 text-primary border-border rounded focus:ring-primary focus:ring-2 mt-0.5 ${
              errors.acceptTerms ? 'border-error-500' : ''
            }`}
            disabled={loading}
          />
          <span className="text-sm text-text-secondary font-body">
            I agree to the{' '}
            <button type="button" className="text-primary hover:text-primary-600 spring-animation">
              Terms of Service
            </button>{' '}
            and{' '}
            <button type="button" className="text-primary hover:text-primary-600 spring-animation">
              Privacy Policy
            </button>
          </span>
        </label>
        {errors.acceptTerms && (
          <p className="text-sm text-error-500 font-body flex items-center space-x-1">
            <Icon name="AlertCircle" size={14} />
            <span>{errors.acceptTerms}</span>
          </p>
        )}
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
            <span>Creating account...</span>
          </div>
        ) : (
          'Create Account'
        )}
      </button>
    </form>
  );
};

export default RegisterForm;