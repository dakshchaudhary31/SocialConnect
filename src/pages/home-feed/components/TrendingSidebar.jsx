import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TrendingSidebar = () => {
  const trendingTopics = [
    {
      id: 1,
      hashtag: '#TechTrends2024',
      posts: '12.5K posts',
      category: 'Technology'
    },
    {
      id: 2,
      hashtag: '#SustainableLiving',
      posts: '8.2K posts',
      category: 'Lifestyle'
    },
    {
      id: 3,
      hashtag: '#DigitalArt',
      posts: '15.7K posts',
      category: 'Art & Design'
    },
    {
      id: 4,
      hashtag: '#RemoteWork',
      posts: '9.1K posts',
      category: 'Business'
    },
    {
      id: 5,
      hashtag: '#HealthyEating',
      posts: '6.8K posts',
      category: 'Health'
    }
  ];

  const suggestedFriends = [
    {
      id: 1,
      name: 'Jessica Martinez',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 12,
      verified: true
    },
    {
      id: 2,
      name: 'David Kim',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 8,
      verified: false
    },
    {
      id: 3,
      name: 'Lisa Thompson',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      mutualFriends: 15,
      verified: true
    }
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: 'Tech Conference 2024',
      date: 'March 15, 2024',
      time: '9:00 AM',
      location: 'San Francisco, CA',
      attendees: 245,
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Photography Workshop',
      date: 'March 20, 2024',
      time: '2:00 PM',
      location: 'New York, NY',
      attendees: 89,
      image: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=400&h=200&fit=crop'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Trending Topics */}
      <div className="bg-surface rounded-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-heading-medium text-lg text-text-primary">
            Trending Topics
          </h3>
          <Icon name="TrendingUp" size={20} className="text-primary" />
        </div>
        
        <div className="space-y-3">
          {trendingTopics.map((topic, index) => (
            <button
              key={topic.id}
              className="w-full text-left p-3 rounded-button hover:bg-primary-50 spring-animation hover-lift group"
            >
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-body text-text-secondary">
                      {index + 1}
                    </span>
                    <span className="font-body-medium text-primary group-hover:text-primary-600">
                      {topic.hashtag}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary font-body mt-1">
                    {topic.posts} • {topic.category}
                  </p>
                </div>
                <Icon name="ChevronRight" size={16} className="text-text-secondary group-hover:text-primary" />
              </div>
            </button>
          ))}
        </div>
        
        <button className="w-full mt-4 text-center text-primary font-body-medium text-sm hover:text-primary-600 spring-animation">
          Show more trends
        </button>
      </div>

      {/* Suggested Friends */}
      <div className="bg-surface rounded-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-heading-medium text-lg text-text-primary">
            People You May Know
          </h3>
          <Icon name="Users" size={20} className="text-primary" />
        </div>
        
        <div className="space-y-4">
          {suggestedFriends.map(friend => (
            <div key={friend.id} className="flex items-center space-x-3">
              <div className="relative">
                <Image
                  src={friend.avatar}
                  alt={friend.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                {friend.verified && (
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-primary rounded-full flex items-center justify-center">
                    <Icon name="Check" size={8} color="white" strokeWidth={3} />
                  </div>
                )}
              </div>
              
              <div className="flex-1 min-w-0">
                <h4 className="font-body-medium text-text-primary truncate">
                  {friend.name}
                </h4>
                <p className="text-xs text-text-secondary font-body">
                  {friend.mutualFriends} mutual friends
                </p>
              </div>
              
              <button className="px-3 py-1.5 bg-primary text-white text-xs font-body-medium rounded-button hover:bg-primary-600 spring-animation hover-lift focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
                Add Friend
              </button>
            </div>
          ))}
        </div>
        
        <button className="w-full mt-4 text-center text-primary font-body-medium text-sm hover:text-primary-600 spring-animation">
          See all suggestions
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="bg-surface rounded-card border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-heading-medium text-lg text-text-primary">
            Upcoming Events
          </h3>
          <Icon name="Calendar" size={20} className="text-primary" />
        </div>
        
        <div className="space-y-4">
          {upcomingEvents.map(event => (
            <button
              key={event.id}
              className="w-full text-left p-3 rounded-button hover:bg-primary-50 spring-animation hover-lift group"
            >
              <div className="flex space-x-3">
                <Image
                  src={event.image}
                  alt={event.title}
                  className="w-16 h-16 rounded-card object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h4 className="font-body-medium text-text-primary truncate group-hover:text-primary">
                    {event.title}
                  </h4>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="Calendar" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary font-body">
                      {event.date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="MapPin" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary font-body truncate">
                      {event.location}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 mt-1">
                    <Icon name="Users" size={12} className="text-text-secondary" />
                    <span className="text-xs text-text-secondary font-body">
                      {event.attendees} attending
                    </span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
        
        <button className="w-full mt-4 text-center text-primary font-body-medium text-sm hover:text-primary-600 spring-animation">
          Discover more events
        </button>
      </div>
    </div>
  );
};

export default TrendingSidebar;