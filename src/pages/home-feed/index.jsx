import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';

import { useNotification } from '../../components/ui/NotificationToast';
import PostCard from './components/PostCard';
import StoryCard from './components/StoryCard';
import QuickPostCreator from './components/QuickPostCreator';
import TrendingSidebar from './components/TrendingSidebar';
import NavigationSidebar from './components/NavigationSidebar';

const HomeFeed = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const [posts, setPosts] = useState([]);
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Mock data for stories
  const mockStories = [
    {
      id: 'my-story',
      type: 'create',
      user: {
        id: 'current-user',
        name: 'Your Story',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
      }
    },
    {
      id: 1,
      user: {
        id: 'user-1',
        name: 'Daksh Chaudhary',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
      },
      media: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop',
      timestamp: new Date(Date.now() - 1800000),
      viewed: false
    },
    {
      id: 2,
      user: {
        id: 'user-2',
        name: 'Daksh chaudhary',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
      },
      media: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=600&fit=crop',
      timestamp: new Date(Date.now() - 3600000),
      viewed: true
    },
    {
      id: 3,
      user: {
        id: 'user-3',
        name: 'Whatsapp',
        avatar: './whatsapp.png'
      },
      media: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=400&h=600&fit=crop',
      timestamp: new Date(Date.now() - 7200000),
      viewed: false
    }
  ];

  // Mock data for posts
  const mockPosts = [
    {
      id: 1,
      user: {
        id: 'user-1',
        name: 'Daksh Chaudhary',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        verified: true
      },
      content: `Just finished an amazing hiking trip in the mountains! The view from the summit was absolutely breathtaking. There's something magical about being surrounded by nature and disconnecting from the digital world for a while.

Nature has this incredible way of putting everything into perspective and reminding us what truly matters in life.`,
      media: [
        {
          type: 'image',url: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop'
        }
      ],
      timestamp: new Date(Date.now() - 1800000),
      likes: 124,
      comments: 18,
      shares: 7,
      liked: false,
      bookmarked: false
    },
    {
      id: 2,
      user: {
        id: 'user-2',name: 'Daksh Chaudhary',avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        verified: false
      },
      content: `Excited to share that I just launched my new photography portfolio! It's been months of hard work curating my best shots and building the perfect showcase.

Check it out and let me know what you think! Your feedback means the world to me.`,
      media: [
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop'
        },
        {
          type: 'image',
          url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&h=600&fit=crop'
        }
      ],
      timestamp: new Date(Date.now() - 3600000),
      likes: 89,
      comments: 12,
      shares: 4,
      liked: true,
      bookmarked: true
    },
    {
      id: 3,
      user: {
        id: 'user-3',
        name: 'Whatsapp',
        avatar: './whatsapp.png',
        verified: true
      },
      content: `Coffee shop vibes on this rainy Sunday morning ☕️ Sometimes the best ideas come when you least expect them. Working on something exciting that I can't wait to share with you all!`,
      media: [],
      timestamp: new Date(Date.now() - 7200000),
      likes: 67,
      comments: 8,
      shares: 2,
      liked: false,
      bookmarked: false
    },
    {
      id: 4,
      user: {
        id: 'user-4',name: 'Daksh Chaudhary',avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false
      },
      content: `Team building day was absolutely incredible! Nothing beats good food, great company, and some friendly competition. Grateful to work with such an amazing group of people.`,
      media: [
        {
          type: 'image',url: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop'
        }
      ],
      timestamp: new Date(Date.now() - 10800000),
      likes: 156,
      comments: 23,
      shares: 11,
      liked: true,
      bookmarked: false
    }
  ];

  useEffect(() => {
    // Simulate loading posts and stories
    const loadInitialContent = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setStories(mockStories);
      setPosts(mockPosts);
      setLoading(false);
    };

    loadInitialContent();
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simulate new content
    addNotification({
      type: 'success',
      message: 'Feed updated with latest content'
    });
    
    setRefreshing(false);
  };

  const handlePostAction = (postId, action, value) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          switch (action) {
            case 'like':
              return {
                ...post,
                liked: !post.liked,
                likes: post.liked ? post.likes - 1 : post.likes + 1
              };
            case 'bookmark':
              return {
                ...post,
                bookmarked: !post.bookmarked
              };
            case 'share':
              addNotification({
                type: 'success',
                message: 'Post shared successfully'
              });
              return {
                ...post,
                shares: post.shares + 1
              };
            default:
              return post;
          }
        }
        return post;
      })
    );
  };

  const handleStoryView = (storyId) => {
    if (storyId === 'my-story') {
      addNotification({
        type: 'info',
        message: 'Story creation feature coming soon!'
      });
      return;
    }

    setStories(prevStories =>
      prevStories.map(story =>
        story.id === storyId ? { ...story, viewed: true } : story
      )
    );
  };

  const handleCreatePost = (postData) => {
    const newPost = {
      id: Date.now(),
      user: {
        id: 'current-user',
        name: 'Daksh Chaudhary',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        verified: false
      },
      content: postData.content,
      media: postData.media || [],
      timestamp: new Date(),
      likes: 0,
      comments: 0,
      shares: 0,
      liked: false,
      bookmarked: false
    };

    setPosts(prevPosts => [newPost, ...prevPosts]);
    addNotification({
      type: 'success',
      message: 'Post created successfully!'
    });
  };

  const LoadingSkeleton = () => (
    <div className="space-y-6">
      {[1, 2, 3].map(i => (
        <div key={i} className="bg-surface rounded-card p-6 border border-border animate-pulse">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded w-32"></div>
              <div className="h-3 bg-gray-200 rounded w-20"></div>
            </div>
          </div>
          <div className="space-y-2 mb-4">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          </div>
          <div className="h-48 bg-gray-200 rounded-card mb-4"></div>
          <div className="flex items-center justify-between">
            <div className="flex space-x-4">
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
              <div className="h-8 bg-gray-200 rounded w-16"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex gap-8">
          {/* Left Sidebar - Desktop Only */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <NavigationSidebar />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-2xl mx-auto lg:mx-0">
            <div className="py-6 space-y-6">
              {/* Stories Section */}
              <div className="bg-surface rounded-card border border-border p-4">
                <h2 className="font-heading font-heading-medium text-lg text-text-primary mb-4">
                  Stories
                </h2>
                <div className="flex space-x-4 overflow-x-auto pb-2 scrollbar-hide">
                  {stories.map(story => (
                    <StoryCard
                      key={story.id}
                      story={story}
                      onView={handleStoryView}
                    />
                  ))}
                </div>
              </div>

              {/* Quick Post Creator */}
              <QuickPostCreator onCreatePost={handleCreatePost} />

              {/* Pull to Refresh Indicator */}
              {refreshing && (
                <div className="flex items-center justify-center py-4">
                  <div className="flex items-center space-x-2 text-primary">
                    <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-body text-sm">Refreshing feed...</span>
                  </div>
                </div>
              )}

              {/* Posts Feed */}
              <div className="space-y-6">
                {loading ? (
                  <LoadingSkeleton />
                ) : (
                  posts.map(post => (
                    <PostCard
                      key={post.id}
                      post={post}
                      onAction={handlePostAction}
                    />
                  ))
                )}
              </div>

              {/* Load More */}
              {!loading && hasMore && (
                <div className="flex justify-center py-8">
                  <button
                    onClick={() => {
                      addNotification({
                        type: 'info',
                        message: 'Loading more posts...'
                      });
                    }}
                    className="bg-primary text-white px-6 py-3 rounded-button font-body-medium hover:bg-primary-600 spring-animation hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                  >
                    Load More Posts
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Desktop Only */}
          <div className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <TrendingSidebar />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Pull to Refresh */}
      <div className="lg:hidden fixed top-20 left-1/2 transform -translate-x-1/2 z-10">
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="bg-surface border border-border rounded-full p-3 shadow-elevation-2 hover-lift spring-animation focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
          aria-label="Refresh feed"
        >
          <Icon 
            name="RefreshCw" 
            size={20} 
            className={`text-primary ${refreshing ? 'animate-spin' : ''}`} 
          />
        </button>
      </div>
    </div>
  );
};

export default HomeFeed;