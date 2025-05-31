import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const StoryCard = ({ story, onView }) => {
  const handleClick = () => {
    onView(story.id);
  };

  if (story.type === 'create') {
    return (
      <button
        onClick={handleClick}
        className="flex-shrink-0 flex flex-col items-center space-y-2 group"
      >
        <div className="relative w-16 h-16 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center spring-animation group-hover:scale-105">
          <Icon name="Plus" size={24} color="white" strokeWidth={2.5} />
        </div>
        <span className="text-xs font-body text-text-secondary text-center max-w-[64px] truncate">
          Your Story
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={handleClick}
      className="flex-shrink-0 flex flex-col items-center space-y-2 group"
    >
      <div className={`relative w-16 h-16 rounded-full p-0.5 spring-animation group-hover:scale-105 ${
        story.viewed 
          ? 'bg-gray-300' :'bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500'
      }`}>
        <div className="w-full h-full rounded-full border-2 border-white overflow-hidden">
          <Image
            src={story.user.avatar}
            alt={story.user.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {!story.viewed && (
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full border-2 border-white flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
        )}
      </div>
      
      <span className="text-xs font-body text-text-secondary text-center max-w-[64px] truncate">
        {story.user.name}
      </span>
    </button>
  );
};

export default StoryCard;