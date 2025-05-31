import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const NavigationSidebar = () => {
  const navigate = useNavigate();

  const currentUser = {
    name: 'Daksh Chaudhary',
    avatar: './profile.jpeg',
    followers: 1247,
    following: 892,
    posts: 156
  };

  const quickActions = [
    {
      id: 'profile',
      label: 'My Profile',
      icon: 'User',
      path: '/user-profile',
      color: 'text-primary'
    },
    {
      id: 'friends',
      label: 'Friends',
      icon: 'Users',
      count: 234,
      color: 'text-secondary'
    },
    {
      id: 'messages',
      label: 'Messages',
      icon: 'MessageCircle',
      count: 12,
      color: 'text-accent'
    },
    {
      id: 'notifications',
      label: 'Notifications',
      icon: 'Bell',
      count: 5,
      color: 'text-success'
    },
    {
      id: 'bookmarks',
      label: 'Saved Posts',
      icon: 'Bookmark',
      color: 'text-warning'
    },
    {
      id: 'events',
      label: 'Events',
      icon: 'Calendar',
      color: 'text-error'
    }
  ];

  const handleNavigation = (path) => {
    if (path) {
      navigate(path);
    }
  };

  return (
    <div className="space-y-6">
      {/* User Profile Card */}
      <div className="bg-surface rounded-card border border-border p-6">
        <button
          onClick={() => navigate('/user-profile')}
          className="w-full text-left group"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Image
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="flex-1">
              <h3 className="font-heading font-heading-medium text-text-primary group-hover:text-primary spring-animation">
                {currentUser.name}
              </h3>
              <p className="text-sm text-text-secondary font-body">
                View your profile
              </p>
            </div>
            <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary spring-animation" />
          </div>
        </button>
        
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border-light">
          <div className="text-center">
            <p className="font-heading font-heading-medium text-lg text-text-primary">
              {currentUser.posts}
            </p>
            <p className="text-xs text-text-secondary font-body">Posts</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-heading-medium text-lg text-text-primary">
              {currentUser.followers}
            </p>
            <p className="text-xs text-text-secondary font-body">Followers</p>
          </div>
          <div className="text-center">
            <p className="font-heading font-heading-medium text-lg text-text-primary">
              {currentUser.following}
            </p>
            <p className="text-xs text-text-secondary font-body">Following</p>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-surface rounded-card border border-border p-6">
        <h3 className="font-heading font-heading-medium text-lg text-text-primary mb-4">
          Quick Actions
        </h3>
        
        <div className="space-y-2">
          {quickActions.map(action => (
            <button
              key={action.id}
              onClick={() => handleNavigation(action.path)}
              className="w-full flex items-center justify-between p-3 rounded-button hover:bg-primary-50 spring-animation hover-lift group"
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-button ${action.color} bg-opacity-10`}>
                  <Icon name={action.icon} size={18} className={action.color} />
                </div>
                <span className="font-body text-text-primary group-hover:text-primary">
                  {action.label}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                {action.count && (
                  <span className="bg-primary text-white text-xs font-body-medium px-2 py-1 rounded-full">
                    {action.count}
                  </span>
                )}
                <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary" />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Create Content */}
      <div className="bg-gradient-to-br from-primary to-secondary rounded-card p-6 text-white">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
            <Icon name="Plus" size={20} color="white" />
          </div>
          <div>
            <h3 className="font-heading font-heading-medium">Create Content</h3>
            <p className="text-sm opacity-90">Share your thoughts with the world</p>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-3">
          <button className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-button hover:bg-white/20 spring-animation">
            <Icon name="Edit" size={16} color="white" />
            <span className="text-sm font-body-medium">Post</span>
          </button>
          
          <button className="flex items-center justify-center space-x-2 p-3 bg-white/10 rounded-button hover:bg-white/20 spring-animation">
            <Icon name="Camera" size={16} color="white" />
            <span className="text-sm font-body-medium">Story</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-text-secondary font-body space-y-2">
        <div className="flex flex-wrap justify-center gap-2">
          <button className="hover:text-primary spring-animation">Privacy</button>
          <span>•</span>
          <button className="hover:text-primary spring-animation">Terms</button>
          <span>•</span>
          <button className="hover:text-primary spring-animation">Help</button>
        </div>
        <p>© {new Date().getFullYear()} SocialConnect. All rights reserved.</p>
      </div>
    </div>
  );
};

export default NavigationSidebar;