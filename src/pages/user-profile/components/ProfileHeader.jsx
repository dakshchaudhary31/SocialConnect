import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const ProfileHeader = ({ 
  userData, 
  isOwnProfile, 
  isFollowing, 
  onFollow, 
  onMessage, 
  onShare, 
  onEditProfile 
}) => {
  return (
    <div className="relative">
      {/* Cover Photo */}
      <div className="relative h-48 md:h-64 overflow-hidden">
        <Image
          src={userData.coverPhoto}
          alt="Cover photo"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        
        {/* Cover Photo Actions */}
        {isOwnProfile && (
          <button 
            onClick={onEditProfile}
            className="absolute bottom-4 right-4 bg-surface/90 backdrop-blur-sm text-text-primary p-2 rounded-button hover-lift spring-animation"
            aria-label="Edit cover photo"
          >
            <Icon name="Camera" size={16} />
          </button>
        )}
      </div>

      {/* Profile Info */}
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 md:-mt-20">
          <div className="flex flex-col md:flex-row md:items-end md:space-x-6">
            {/* Profile Photo */}
            <div className="relative">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-surface overflow-hidden bg-surface">
                <Image
                  src={"./profile.jpeg"}
                  alt={userData.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Online Status */}
              {userData.isOnline && (
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-success rounded-full border-2 border-surface"></div>
              )}
              
              {/* Edit Profile Photo */}
              {isOwnProfile && (
                <button 
                  onClick={onEditProfile}
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full hover-lift spring-animation"
                  aria-label="Edit profile photo"
                >
                  <Icon name="Camera" size={14} />
                </button>
              )}
            </div>

            {/* User Info */}
            <div className="mt-4 md:mt-0 md:pb-4 flex-1">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <div className="flex items-center space-x-2 mb-1">
                    <h1 className="text-2xl md:text-3xl font-heading font-heading-bold text-text-primary">
                      {userData.name}
                    </h1>
                    {userData.verified && (
                      <Icon name="BadgeCheck" size={20} className="text-primary" />
                    )}
                  </div>
                  <p className="text-text-secondary font-body mb-2">
                    {userData.username}
                  </p>
                  <p className="text-text-primary font-body max-w-md mb-4">
                    {userData.bio}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {isOwnProfile ? (
                    <>
                      <button
                        onClick={onEditProfile}
                        className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-button hover:bg-primary-600 spring-animation hover-lift"
                      >
                        <Icon name="Edit" size={16} />
                        <span className="font-body-medium">Edit Profile</span>
                      </button>
                      <button
                        onClick={onShare}
                        className="p-2 bg-surface border border-border text-text-secondary hover:text-primary hover:bg-primary-50 rounded-button spring-animation hover-lift"
                        aria-label="Share profile"
                      >
                        <Icon name="Share" size={16} />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={onFollow}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-button spring-animation hover-lift ${
                          isFollowing
                            ? 'bg-surface border border-border text-text-primary hover:bg-error-50 hover:text-error hover:border-error' :'bg-primary text-white hover:bg-primary-600'
                        }`}
                      >
                        <Icon name={isFollowing ? "UserMinus" : "UserPlus"} size={16} />
                        <span className="font-body-medium">
                          {isFollowing ? 'Unfollow' : 'Follow'}
                        </span>
                      </button>
                      <button
                        onClick={onMessage}
                        className="flex items-center space-x-2 bg-surface border border-border text-text-primary hover:bg-primary-50 hover:text-primary px-4 py-2 rounded-button spring-animation hover-lift"
                      >
                        <Icon name="MessageCircle" size={16} />
                        <span className="font-body-medium">Message</span>
                      </button>
                      <button
                        onClick={onShare}
                        className="p-2 bg-surface border border-border text-text-secondary hover:text-primary hover:bg-primary-50 rounded-button spring-animation hover-lift"
                        aria-label="Share profile"
                      >
                        <Icon name="Share" size={16} />
                      </button>
                    </>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="flex items-center space-x-6 mt-4">
                <div className="text-center">
                  <div className="text-xl font-heading font-heading-bold text-text-primary">
                    {userData.posts.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary font-body">Posts</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-heading font-heading-bold text-text-primary">
                    {userData.followers.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary font-body">Followers</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-heading font-heading-bold text-text-primary">
                    {userData.following.toLocaleString()}
                  </div>
                  <div className="text-sm text-text-secondary font-body">Following</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;