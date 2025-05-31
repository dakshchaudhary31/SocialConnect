import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostCard = ({ post, onAction }) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);

  const formatTimestamp = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  const truncateContent = (content, maxLength = 200) => {
    if (content.length <= maxLength) return content;
    return content.substring(0, maxLength) + '...';
  };

  const handleMediaNavigation = (direction) => {
    if (direction === 'next' && currentMediaIndex < post.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    } else if (direction === 'prev' && currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    }
  };

  return (
    <article className="bg-surface rounded-card border border-border overflow-hidden hover-lift spring-animation">
      {/* Post Header */}
      <div className="p-6 pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src={post.user.avatar}
                alt={post.user.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              {post.user.verified && (
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                  <Icon name="Check" size={10} color="white" strokeWidth={3} />
                </div>
              )}
            </div>
            <div>
              <h3 className="font-heading font-heading-medium text-text-primary">
                {post.user.name}
              </h3>
              <p className="text-sm text-text-secondary font-body">
                {formatTimestamp(post.timestamp)}
              </p>
            </div>
          </div>
          
          <button className="p-2 rounded-button hover:bg-primary-50 spring-animation">
            <Icon name="MoreHorizontal" size={20} className="text-text-secondary" />
          </button>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 pb-4">
        <div className="text-text-primary font-body leading-relaxed">
          {showFullContent ? (
            <p className="whitespace-pre-line">{post.content}</p>
          ) : (
            <p className="whitespace-pre-line">{truncateContent(post.content)}</p>
          )}
          
          {post.content.length > 200 && (
            <button
              onClick={() => setShowFullContent(!showFullContent)}
              className="text-primary font-body-medium text-sm mt-2 hover:text-primary-600 spring-animation"
            >
              {showFullContent ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>

      {/* Post Media */}
      {post.media && post.media.length > 0 && (
        <div className="relative">
          <div className="aspect-w-16 aspect-h-10 bg-gray-100">
            <Image
              src={post.media[currentMediaIndex].url}
              alt="Post media"
              className="w-full h-80 object-cover"
            />
          </div>
          
          {post.media.length > 1 && (
            <>
              {/* Media Navigation */}
              {currentMediaIndex > 0 && (
                <button
                  onClick={() => handleMediaNavigation('prev')}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 spring-animation"
                  aria-label="Previous image"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
              )}
              
              {currentMediaIndex < post.media.length - 1 && (
                <button
                  onClick={() => handleMediaNavigation('next')}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 text-white rounded-full flex items-center justify-center hover:bg-black/70 spring-animation"
                  aria-label="Next image"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              )}
              
              {/* Media Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {post.media.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentMediaIndex(index)}
                    className={`w-2 h-2 rounded-full spring-animation ${
                      index === currentMediaIndex ? 'bg-white' : 'bg-white/50'
                    }`}
                    aria-label={`View image ${index + 1}`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {/* Post Actions */}
      <div className="p-6 pt-4">
        {/* Engagement Stats */}
        <div className="flex items-center justify-between text-sm text-text-secondary font-body mb-4">
          <div className="flex items-center space-x-4">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
            <span>{post.shares} shares</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between border-t border-border-light pt-4">
          <div className="flex items-center space-x-1">
            <button
              onClick={() => onAction(post.id, 'like')}
              className={`flex items-center space-x-2 px-4 py-2 rounded-button spring-animation hover-lift ${
                post.liked 
                  ? 'text-red-500 bg-red-50' :'text-text-secondary hover:text-red-500 hover:bg-red-50'
              }`}
            >
              <Icon 
                name={post.liked ? "Heart" : "Heart"} 
                size={18} 
                fill={post.liked ? "currentColor" : "none"}
              />
              <span className="font-body-medium text-sm">Like</span>
            </button>

            <button className="flex items-center space-x-2 px-4 py-2 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50 spring-animation hover-lift">
              <Icon name="MessageCircle" size={18} />
              <span className="font-body-medium text-sm">Comment</span>
            </button>

            <button
              onClick={() => onAction(post.id, 'share')}
              className="flex items-center space-x-2 px-4 py-2 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50 spring-animation hover-lift"
            >
              <Icon name="Share" size={18} />
              <span className="font-body-medium text-sm">Share</span>
            </button>
          </div>

          <button
            onClick={() => onAction(post.id, 'bookmark')}
            className={`p-2 rounded-button spring-animation hover-lift ${
              post.bookmarked 
                ? 'text-primary bg-primary-50' :'text-text-secondary hover:text-primary hover:bg-primary-50'
            }`}
            aria-label="Bookmark post"
          >
            <Icon 
              name="Bookmark" 
              size={18} 
              fill={post.bookmarked ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;