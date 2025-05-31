import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const PostsTab = ({ userId }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock posts data
  const mockPosts = [
    {
      id: '1',
      type: 'image',
      content: 'Beautiful sunset from my weekend getaway! Nature never fails to amaze me. 🌅',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop',
      likes: 234,
      comments: 18,
      shares: 5,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      isLiked: true
    },
    {
      id: '2',
      type: 'text',
      content: `Just finished reading "The Design of Everyday Things" by Don Norman. Such an insightful book about how design affects our daily interactions with objects. Highly recommend it to anyone interested in UX/UI design! 📚

What's the last book that changed your perspective on your work?`,
      likes: 89,
      comments: 12,
      shares: 3,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      isLiked: false
    },
    {
      id: '3',type: 'image',content: 'Coffee and code - the perfect combination for a productive morning! ☕️💻',image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=400&fit=crop',
      likes: 156,
      comments: 24,
      shares: 8,
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      isLiked: true
    },
    {
      id: '4',type: 'image',content: 'Team lunch after successfully launching our new project! Grateful for such an amazing team. 🎉',image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=400&h=400&fit=crop',
      likes: 312,
      comments: 45,
      shares: 12,
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      isLiked: false
    },
    {
      id: '5',type: 'text',content: `Excited to announce that I'll be speaking at the upcoming Design Conference 2024! 🎤 I'll be sharing insights about "Building Inclusive Design Systems" - a topic I'm passionate about. Looking forward to connecting with fellow designers and learning from the community.

See you there! #DesignConference2024 #InclusiveDesign`,
      likes: 198,
      comments: 32,
      shares: 15,
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      isLiked: true
    },
    {
      id: '6',
      type: 'image',
      content: 'Weekend hiking adventure! Sometimes you need to disconnect to reconnect. 🥾⛰️',
      image: 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=400&h=400&fit=crop',
      likes: 267,
      comments: 28,
      shares: 9,
      timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      isLiked: false
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setPosts(mockPosts);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [userId]);

  const formatTimeAgo = (timestamp) => {
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days > 0) return `${days}d ago`;
    if (hours > 0) return `${hours}h ago`;
    if (minutes > 0) return `${minutes}m ago`;
    return 'Just now';
  };

  const handleLike = (postId) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { 
            ...post, 
            isLiked: !post.isLiked,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1
          }
        : post
    ));
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-surface rounded-card border border-border p-6">
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-4 skeleton-pulse"></div>
            <div className="h-48 bg-gray-200 rounded mb-4 skeleton-pulse"></div>
            <div className="flex items-center justify-between">
              <div className="flex space-x-4">
                <div className="h-4 bg-gray-200 rounded w-12 skeleton-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-12 skeleton-pulse"></div>
                <div className="h-4 bg-gray-200 rounded w-12 skeleton-pulse"></div>
              </div>
              <div className="h-4 bg-gray-200 rounded w-16 skeleton-pulse"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <Icon name="Grid3X3" size={24} className="text-gray-400" />
        </div>
        <h3 className="text-lg font-heading font-heading-medium text-text-primary mb-2">
          No posts yet
        </h3>
        <p className="text-text-secondary font-body">
          When posts are shared, they'll appear here.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <div key={post.id} className="bg-surface rounded-card border border-border overflow-hidden hover-lift spring-animation">
          <div className="p-6">
            {/* Post Content */}
            <div className="mb-4">
              <p className="text-text-primary font-body whitespace-pre-line">
                {post.content}
              </p>
            </div>

            {/* Post Image */}
            {post.type === 'image' && post.image && (
              <div className="mb-4 rounded-lg overflow-hidden">
                <Image
                  src={post.image}
                  alt="Post image"
                  className="w-full h-64 object-cover"
                />
              </div>
            )}

            {/* Post Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-border-light">
              <div className="flex items-center space-x-6">
                <button
                  onClick={() => handleLike(post.id)}
                  className={`flex items-center space-x-2 spring-animation ${
                    post.isLiked ? 'text-error' : 'text-text-secondary hover:text-error'
                  }`}
                >
                  <Icon name={post.isLiked ? "Heart" : "Heart"} size={18} fill={post.isLiked ? "currentColor" : "none"} />
                  <span className="text-sm font-body">{post.likes}</span>
                </button>

                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary spring-animation">
                  <Icon name="MessageCircle" size={18} />
                  <span className="text-sm font-body">{post.comments}</span>
                </button>

                <button className="flex items-center space-x-2 text-text-secondary hover:text-primary spring-animation">
                  <Icon name="Share" size={18} />
                  <span className="text-sm font-body">{post.shares}</span>
                </button>
              </div>

              <span className="text-sm text-text-secondary font-body">
                {formatTimeAgo(post.timestamp)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PostsTab;