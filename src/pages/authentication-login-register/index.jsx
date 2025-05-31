import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../components/ui/AuthenticationGuard';
import { useNotification } from '../../components/ui/NotificationToast';
import Icon from '../../components/AppIcon';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import SocialLogin from './components/SocialLogin';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const AuthenticationLoginRegister = () => {
  const [activeTab, setActiveTab] = useState('login');
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const navigate = useNavigate();
  const location = useLocation();
  const { login, register } = useAuth();
  const { addNotification } = useNotification();

  const handleLogin = async (credentials) => {
    setLoading(true);
    try {
      const result = await login(credentials);
      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Welcome back!',
          message: 'You have been successfully logged in.'
        });
        const from = location.state?.from || '/home-feed';
        navigate(from, { replace: true });
      } else {
        addNotification({
          type: 'error',
          title: 'Login Failed',
          message: 'Invalid credentials. Please try again.'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Login Error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (userData) => {
    setLoading(true);
    try {
      const result = await register(userData);
      if (result.success) {
        addNotification({
          type: 'success',
          title: 'Account Created!',
          message: 'Welcome to SocialConnect! Your account has been created successfully.'
        });
        navigate('/home-feed', { replace: true });
      } else {
        addNotification({
          type: 'error',
          title: 'Registration Failed',
          message: 'Unable to create account. Please try again.'
        });
      }
    } catch (error) {
      addNotification({
        type: 'error',
        title: 'Registration Error',
        message: 'An unexpected error occurred. Please try again.'
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    addNotification({
      type: 'info',
      title: 'Social Login',
      message: `${provider} login will be available soon!`
    });
  };

  const handleForgotPassword = (email) => {
    addNotification({
      type: 'success',
      title: 'Password Reset',
      message: 'Password reset instructions have been sent to your email.'
    });
    setShowForgotPassword(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-background to-secondary-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 mx-auto bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mb-4">
            <Icon name="Users" size={32} color="white" />
          </div>
          <h1 className="text-3xl font-heading font-bold text-text-primary mb-2">
            SocialConnect
          </h1>
          <p className="text-text-secondary font-body">
            Connect, share, and discover with friends
          </p>
        </div>

        {/* Authentication Card */}
        <div className="bg-surface rounded-card shadow-elevation-2 border border-border-light overflow-hidden">
          {/* Tab Navigation */}
          <div className="flex border-b border-border-light">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 py-4 px-6 font-body-medium text-sm spring-animation ${
                activeTab === 'login' ?'text-primary border-b-2 border-primary bg-primary-50/30' :'text-text-secondary hover:text-primary hover:bg-primary-50/20'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 py-4 px-6 font-body-medium text-sm spring-animation ${
                activeTab === 'register' ?'text-primary border-b-2 border-primary bg-primary-50/30' :'text-text-secondary hover:text-primary hover:bg-primary-50/20'
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Content */}
          <div className="p-6">
            {activeTab === 'login' ? (
              <LoginForm 
                onSubmit={handleLogin}
                loading={loading}
                onForgotPassword={() => setShowForgotPassword(true)}
              />
            ) : (
              <RegisterForm 
                onSubmit={handleRegister}
                loading={loading}
              />
            )}

            {/* Divider */}
            <div className="flex items-center my-6">
              <div className="flex-1 border-t border-border-light"></div>
              <span className="px-4 text-sm text-text-secondary font-body">or</span>
              <div className="flex-1 border-t border-border-light"></div>
            </div>

            {/* Social Login */}
            <SocialLogin onSocialLogin={handleSocialLogin} />
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-text-secondary font-body">
            By continuing, you agree to our{' '}
            <button className="text-primary hover:text-primary-600 spring-animation">
              Terms of Service
            </button>{' '}
            and{' '}
            <button className="text-primary hover:text-primary-600 spring-animation">
              Privacy Policy
            </button>
          </p>
        </div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotPassword && (
        <ForgotPasswordModal
          onClose={() => setShowForgotPassword(false)}
          onSubmit={handleForgotPassword}
        />
      )}

      {/* Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 bg-black/20 flex items-center justify-center z-modal">
          <div className="bg-surface rounded-card p-6 shadow-elevation-3">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
              <span className="font-body text-text-primary">
                {activeTab === 'login' ? 'Signing in...' : 'Creating account...'}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthenticationLoginRegister;