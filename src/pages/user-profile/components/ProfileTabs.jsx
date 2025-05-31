import React from 'react';
import Icon from '../../../components/AppIcon';

const ProfileTabs = ({ activeTab, onTabChange, postCount }) => {
  const tabs = [
    {
      id: 'posts',
      label: 'Posts',
      icon: 'Grid3X3',
      count: postCount
    },
    {
      id: 'photos',
      label: 'Photos',
      icon: 'Image',
      count: null
    },
    {
      id: 'videos',
      label: 'Videos',
      icon: 'Video',
      count: null
    },
    {
      id: 'about',
      label: 'About',
      icon: 'Info',
      count: null
    }
  ];

  return (
    <div className="border-b border-border">
      <nav className="flex space-x-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              flex items-center space-x-2 px-4 py-3 border-b-2 spring-animation
              ${activeTab === tab.id
                ? 'border-primary text-primary bg-primary-50/50' :'border-transparent text-text-secondary hover:text-primary hover:bg-primary-50/30'
              }
            `}
          >
            <Icon name={tab.icon} size={16} />
            <span className="font-body-medium text-sm">{tab.label}</span>
            {tab.count !== null && (
              <span className={`
                text-xs px-2 py-1 rounded-full
                ${activeTab === tab.id
                  ? 'bg-primary text-white' :'bg-gray-100 text-text-secondary'
                }
              `}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default ProfileTabs;