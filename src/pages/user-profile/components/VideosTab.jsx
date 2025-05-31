import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const VideosTab = ({ userId }) => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock videos data
  const mockVideos = [
    {
      id: '1',
      title: 'Design Process Walkthrough',
      thumbnail: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?w=400&h=300&fit=crop',
      duration: '5:42',
      views: 1234,
      likes: 89,
      timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      description: 'A detailed walkthrough of my design process for creating user-friendly interfaces.'
    },
    {
      id: '2',
      title: 'Conference Talk: Inclusive Design',
      thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      duration: '18:30',
      views: 2567,
      likes: 156,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      description: 'My presentation on building inclusive design systems at Design Conference 2024.'
    },
    {
      id: '3',
      title: 'Behind the Scenes: Team Project',
      thumbnail: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&h=300&fit=crop',
      duration: '3:15',
      views: 892,
      likes: 67,
      timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
      description: 'A glimpse into our team collaboration process during our latest project.'
    },
    {
      id: '4',
      title: 'Quick Tips: Figma Shortcuts',
      thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop',
      duration: '2:28',
      views: 1567,
      likes: 123,
      timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      description: 'Essential Figma shortcuts that will speed up your design workflow.'
    },
    {
      id: '5',
      title: 'Weekend Hiking Adventure',
      thumbnail: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=300&fit=crop',
      duration: '4:12',
      views: 743,
      likes: 98,
      timestamp: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000),
      description: 'Exploring beautiful mountain trails and disconnecting from the digital world.'
    },
    {
      id: '6',
      title: 'Coffee Shop Coding Session',
      thumbnail: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      duration: '1:45',
      views: 456,
      likes: 34,
      timestamp: new Date(Date.now() - 25 * 24 * 60 * 60 * 1000),
      description: 'Finding inspiration in a cozy coffee shop while working on personal projects.'
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setVideos(mockVideos);
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

  const formatViews = (views) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views.toString();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-surface rounded-card border border-border overflow-hidden">
            <div className="aspect-video bg-gray-200 skeleton-pulse"></div>
            <div className="p-4">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 skeleton-pulse"></div>
              <div className="h-3 bg-gray-200 rounded w-1/2 skeleton-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="Video" size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
          No videos yet
        </h3>
        <p className="text-text-secondary font-body">
          When videos are shared, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {videos.map((video) => (
        <div
          key={video.id}
          className="bg-surface rounded-card border border-border overflow-hidden hover-lift spring-animation cursor-pointer group"
        >
          {/* Video Thumbnail */}
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={video.thumbnail}
              alt={video.title}
              className="w-full h-full object-cover group-hover:scale-105 spring-animation"
            />
            
            {/* Play Button Overlay */}
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 spring-animation">
              <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                <Icon name="Play" size={20} className="text-text-primary ml-1" />
              </div>
            </div>

            {/* Duration Badge */}
            <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-body">
              {video.duration}
            </div>
          </div>

          {/* Video Info */}
          <div className="p-4">
            <h3 className="font-heading font-heading-medium text-text-primary mb-2 line-clamp-2">
              {video.title}
            </h3>
            
            <p className="text-sm text-text-secondary font-body mb-3 line-clamp-2">
              {video.description}
            </p>

            <div className="flex items-center justify-between text-xs text-text-secondary">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  <Icon name="Eye" size={12} />
                  <span>{formatViews(video.views)} views</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon name="Heart" size={12} />
                  <span>{video.likes}</span>
                </div>
              </div>
              <span>{formatTimeAgo(video.timestamp)}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default VideosTab;