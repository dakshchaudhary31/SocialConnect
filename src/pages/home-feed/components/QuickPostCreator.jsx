import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const QuickPostCreator = ({ onCreatePost }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [content, setContent] = useState('');
  const [selectedMedia, setSelectedMedia] = useState([]);

  const currentUser = {
    name: 'Daksh Chaudhary',
    avatar: './profile.jpeg'
  };

  const handleSubmit = () => {
    if (content.trim()) {
      onCreatePost({
        content: content.trim(),
        media: selectedMedia
      });
      setContent('');
      setSelectedMedia([]);
      setIsExpanded(false);
    }
  };

  const handleMediaSelect = (type) => {
    // Mock media selection
    const mockMedia = {
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
      video: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4'
    };

    if (type === 'image') {
      setSelectedMedia([{ type: 'image', url: mockMedia.image }]);
    }
  };

  const removeMedia = (index) => {
    setSelectedMedia(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="bg-surface rounded-card border border-border p-6">
      <div className="flex items-start space-x-3">
        <Image
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
        />
        
        <div className="flex-1">
          {!isExpanded ? (
            <button
              onClick={() => setIsExpanded(true)}
              className="w-full text-left p-3 rounded-button bg-background border border-border text-text-secondary hover:bg-primary-50 hover:border-primary-100 spring-animation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            >
              What's on your mind, {currentUser.name.split(' ')[0]}?
            </button>
          ) : (
            <div className="space-y-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={`What's on your mind, ${currentUser.name.split(' ')[0]}?`}
                className="w-full p-3 border border-border rounded-button resize-none focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-background text-text-primary placeholder-text-secondary"
                rows={4}
                autoFocus
              />

              {/* Selected Media Preview */}
              {selectedMedia.length > 0 && (
                <div className="space-y-2">
                  {selectedMedia.map((media, index) => (
                    <div key={index} className="relative inline-block">
                      <Image
                        src={media.url}
                        alt="Selected media"
                        className="w-32 h-32 object-cover rounded-card"
                      />
                      <button
                        onClick={() => removeMedia(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 spring-animation"
                      >
                        <Icon name="X" size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* Media Options */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleMediaSelect('image')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50 spring-animation"
                  >
                    <Icon name="Image" size={18} />
                    <span className="font-body text-sm">Photo</span>
                  </button>

                  <button
                    onClick={() => handleMediaSelect('video')}
                    className="flex items-center space-x-2 px-3 py-2 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50 spring-animation"
                  >
                    <Icon name="Video" size={18} />
                    <span className="font-body text-sm">Video</span>
                  </button>

                  <button className="flex items-center space-x-2 px-3 py-2 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50 spring-animation">
                    <Icon name="MapPin" size={18} />
                    <span className="font-body text-sm">Location</span>
                  </button>

                  <button className="flex items-center space-x-2 px-3 py-2 rounded-button text-text-secondary hover:text-primary hover:bg-primary-50 spring-animation">
                    <Icon name="Smile" size={18} />
                    <span className="font-body text-sm">Feeling</span>
                  </button>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      setIsExpanded(false);
                      setContent('');
                      setSelectedMedia([]);
                    }}
                    className="px-4 py-2 rounded-button text-text-secondary hover:text-text-primary hover:bg-gray-100 spring-animation font-body-medium"
                  >
                    Cancel
                  </button>
                  
                  <button
                    onClick={handleSubmit}
                    disabled={!content.trim()}
                    className="px-6 py-2 bg-primary text-white rounded-button font-body-medium hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed spring-animation hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Post
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuickPostCreator;