import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Image from '../../components/AppImage';
import { useNotification } from '../../components/ui/NotificationToast';
import ProfileHeader from './components/ProfileHeader';
import ProfileTabs from './components/ProfileTabs';
import PostsTab from './components/PostsTab';
import PhotosTab from './components/PhotosTab';
import VideosTab from './components/VideosTab';
import AboutTab from './components/AboutTab';

const UserProfile = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [activeTab, setActiveTab] = useState('posts');
  const [isOwnProfile, setIsOwnProfile] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock user data
  const userData = {
    id: '1',
    name: 'Daksh Chaudhary',
    username: '@daksh_chaudhary',
    coverPhoto: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=400&fit=crop',profilePhoto: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',followers: 2847,following: 892,posts: 156,location: 'India',website: 'www.dakshchaudhary344.com',joinDate: 'March 2023',
    verified: true,
    isOnline: true
  };

  const mutualFriends = [
    {
      id: '1',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '3',
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleFollow = () => {
    setIsFollowing(!isFollowing);
    addNotification({
      type: 'success',
      message: isFollowing ? 'Unfollowed successfully' : 'Following successfully',
      duration: 3000
    });
  };

  const handleMessage = () => {
    addNotification({
      type: 'info',
      message: 'Message feature coming soon',
      duration: 3000
    });
  };

  const handleShare = () => {
    addNotification({
      type: 'success',
      message: 'Profile link copied to clipboard',
      duration: 3000
    });
  };

  const handleEditProfile = () => {
    addNotification({
      type: 'info',
      message: 'Edit profile feature coming soon',
      duration: 3000
    });
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'posts':
        return <PostsTab userId={userData.id} />;
      case 'photos':
        return <PhotosTab userId={userData.id} />;
      case 'videos':
        return <VideosTab userId={userData.id} />;
      case 'about':
        return <AboutTab userData={userData} />;
      default:
        return <PostsTab userId={userData.id} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Cover Photo Skeleton */}
          <div className="relative h-48 md:h-64 bg-gray-200 skeleton-pulse"></div>
          
          {/* Profile Header Skeleton */}
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-16 md:-mt-20">
              <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
                <div className="w-32 h-32 md:w-40 md:h-40 bg-gray-200 rounded-full border-4 border-surface skeleton-pulse"></div>
                <div className="mt-4 md:mt-0 md:pb-4 flex-1">
                  <div className="h-8 bg-gray-200 rounded w-48 mb-2 skeleton-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-32 mb-4 skeleton-pulse"></div>
                  <div className="flex space-x-6">
                    <div className="h-4 bg-gray-200 rounded w-20 skeleton-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 skeleton-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-20 skeleton-pulse"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        {/* Profile Header */}
        <ProfileHeader 
          userData={userData}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onFollow={handleFollow}
          onMessage={handleMessage}
          onShare={handleShare}
          onEditProfile={handleEditProfile}
        />

        {/* Main Content */}
        <div className="px-4 sm:px-6 lg:px-8 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-2">
              {/* Profile Tabs */}
              <ProfileTabs 
                activeTab={activeTab}
                onTabChange={setActiveTab}
                postCount={userData.posts}
              />

              {/* Tab Content */}
              <div className="mt-6">
                {renderTabContent()}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Profile Info Card */}
              <div className="bg-surface rounded-card border border-border p-6">
                <h3 className="font-heading font-heading-medium text-lg text-text-primary mb-4">
                  Profile Info
                </h3>
                <div className="space-y-3">
                  {userData.location && (
                    <div className="flex items-center space-x-3">
                      <Icon name="MapPin" size={16} className="text-text-secondary" />
                      <span className="text-sm text-text-secondary font-body">
                        {userData.location}
                      </span>
                    </div>
                  )}
                  {userData.website && (
                    <div className="flex items-center space-x-3">
                      <Icon name="Globe" size={16} className="text-text-secondary" />
                      <a 
                        href={`https://${userData.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-primary hover:text-primary-600 font-body spring-animation"
                      >
                        {userData.website}
                      </a>
                    </div>
                  )}
                  <div className="flex items-center space-x-3">
                    <Icon name="Calendar" size={16} className="text-text-secondary" />
                    <span className="text-sm text-text-secondary font-body">
                      Joined {userData.joinDate}
                    </span>
                  </div>
                </div>
              </div>

              {/* Mutual Friends */}
              {!isOwnProfile && mutualFriends.length > 0 && (
                <div className="bg-surface rounded-card border border-border p-6">
                  <h3 className="font-heading font-heading-medium text-lg text-text-primary mb-4">
                    Mutual Friends
                  </h3>
                  <div className="space-y-3">
                    {mutualFriends.map((friend) => (
                      <div key={friend.id} className="flex items-center space-x-3">
                        <Image
                          src={friend.avatar}
                          alt={friend.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm text-text-primary font-body">
                          {friend.name}
                        </span>
                      </div>
                    ))}
                    <button className="text-sm text-primary hover:text-primary-600 font-body-medium spring-animation">
                      View all mutual friends
                    </button>
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="bg-surface rounded-card border border-border p-6">
                <h3 className="font-heading font-heading-medium text-lg text-text-primary mb-4">
                  Quick Actions
                </h3>
                <div className="space-y-2">
                  <button 
                    onClick={() => navigate('/home-feed')}
                    className="w-full flex items-center space-x-3 p-3 rounded-button hover:bg-primary-50 text-text-secondary hover:text-primary spring-animation"
                  >
                    <Icon name="Home" size={16} />
                    <span className="text-sm font-body">Go to Home Feed</span>
                  </button>
                  <button 
                    onClick={handleShare}
                    className="w-full flex items-center space-x-3 p-3 rounded-button hover:bg-primary-50 text-text-secondary hover:text-primary spring-animation"
                  >
                    <Icon name="Share" size={16} />
                    <span className="text-sm font-body">Share Profile</span>
                  </button>
                  {!isOwnProfile && (
                    <button 
                      onClick={() => addNotification({
                        type: 'info',
                        message: 'Report feature coming soon',
                        duration: 3000
                      })}
                      className="w-full flex items-center space-x-3 p-3 rounded-button hover:bg-error-50 text-text-secondary hover:text-error spring-animation"
                    >
                      <Icon name="Flag" size={16} />
                      <span className="text-sm font-body">Report Profile</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;