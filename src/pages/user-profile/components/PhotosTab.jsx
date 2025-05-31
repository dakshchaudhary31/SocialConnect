import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PhotosTab = ({ userId }) => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  // Mock photos data
  const mockPhotos = [
    {
      id: '1',
      url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=200&h=200&fit=crop',
      caption: 'Beautiful sunset from my weekend getaway!',
      likes: 234,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: '2',
      url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&h=200&fit=crop',
      caption: 'Coffee and code - the perfect combination!',
      likes: 156,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
    },
    {
      id: '3',
      url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=200&h=200&fit=crop',
      caption: 'Team lunch after project launch!',
      likes: 312,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000)
    },
    {
      id: '4',
      url: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=200&h=200&fit=crop',
      caption: 'Weekend hiking adventure!',
      likes: 267,
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000)
    },
    {
      id: '5',
      url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=200&h=200&fit=crop',
      caption: 'Working on new designs',
      likes: 189,
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000)
    },
    {
      id: '6',
      url: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=200&h=200&fit=crop',
      caption: 'Team collaboration session',
      likes: 145,
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
    },
    {
      id: '7',
      url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&h=200&fit=crop',
      caption: 'Late night coding session',
      likes: 203,
      timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000)
    },
    {
      id: '8',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
      caption: 'Conference presentation prep',
      likes: 178,
      timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000)
    },
    {
      id: '9',
      url: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=200&h=200&fit=crop',
      caption: 'Creative workspace setup',
      likes: 234,
      timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000)
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPhotos(mockPhotos);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userId]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    
    if (days > 0) return `${days}d ago`;
    return 'Today';
  };

  const openPhotoModal = (photo) => {
    setSelectedPhoto(photo);
  };

  const closePhotoModal = () => {
    setSelectedPhoto(null);
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="aspect-square bg-gray-200 rounded-lg skeleton-pulse"></div>
        ))}
      </div>
    );
  }

  if (photos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="Image" size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
          No photos yet
        </h3>
        <p className="text-text-secondary font-body">
          When photos are shared, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative aspect-square group cursor-pointer overflow-hidden rounded-lg hover-lift spring-animation"
            onClick={() => openPhotoModal(photo)}
          >
            <Image
              src={photo.thumbnail}
              alt={photo.caption}
              className="w-full h-full object-cover"
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 spring-animation flex items-center justify-center">
              <div className="flex items-center space-x-4 text-white">
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={16} />
                  <span className="text-sm font-body">{photo.likes}</span>
                </div>
                <Icon name="Eye" size={16} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 z-modal bg-black/80 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full bg-surface rounded-card overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closePhotoModal}
              className="absolute top-4 right-4 z-10 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 spring-animation"
              aria-label="Close photo"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Photo */}
            <div className="relative">
              <Image
                src={selectedPhoto.url}
                alt={selectedPhoto.caption}
                className="w-full max-h-[70vh] object-contain"
              />
            </div>

            {/* Photo Info */}
            <div className="p-6">
              <p className="text-text-primary font-body mb-2">
                {selectedPhoto.caption}
              </p>
              <div className="flex items-center justify-between text-text-secondary">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Heart" size={16} />
                    <span className="text-sm font-body">{selectedPhoto.likes} likes</span>
                  </div>
                </div>
                <span className="text-sm font-body">
                  {formatTimeAgo(selectedPhoto.timestamp)}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PhotosTab;