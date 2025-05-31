import React from 'react';
import Icon from '../../../components/AppIcon';

const AboutTab = ({ userData }) => {
  const personalInfo = {
    biography: `I'm a passionate Software developer specializing in frontend development. My journey in technology began with a fascination for building things that people interact with daily. This curiosity led me to build beautiful web applications.

What drives me is the intersection of technology and human experience – finding ways to make complex systems feel simple and intuitive for users while maintaining technical excellence behind the scenes.`,
    education: [
      {
        institution: 'Stanford University',degree: 'Master of Science in Computer Science',year: '2018-2020',description: 'Specialized in Human-Computer Interaction and User Experience Design'
      },
      {
        institution: 'UC Berkeley',degree: 'Bachelor of Science in Computer Science',year: '2014-2018',description: 'Graduated Magna Cum Laude with focus on Software Engineering'
      }
    ],
    experience: [
      {
        company: 'TechCorp Inc.',position: 'Senior Frontend Developer',duration: '2020 - Present',description: 'Leading frontend development for enterprise applications serving 100K+ users'
      },
      {
        company: 'StartupXYZ',position: 'Frontend Developer',duration: '2018 - 2020',description: 'Built responsive web applications and improved user engagement by 40%'
      }
    ],
    skills: [
      'React & Next.js','JavaScript','TypeScript','Node.js','Git','Github'
    ],
    interests: [
      'Photography','Hiking','Coffee Culture','Travel','Reading','Yoga','Tech'
    ],
    languages: [
      { name: 'English' },
      { name: 'Hindi' }
    ]
  };

  const contactInfo = [
    {
      icon: 'Mail',
      label: 'Email',
      value: 'dakshchaudhary344@email.com',
      link: 'mailto:Dakshchaudhary344@email.com'
    },
    {
      icon: 'Phone',
      label: 'Phone',
      value: '+91 XXXXXXXXX',
      link: 'tel:+15551234567'
    },
    {
      icon: 'MapPin',
      label: 'Location',
      value: userData.location,
      link: null
    },
    {
      icon: 'Globe',
      label: 'Website',
      value: userData.website,
      link: `https://${userData.website}`
    }
  ];

  return (
    <div className="space-y-8">
      {/* Biography */}
      <div className="bg-surface rounded-card border border-border p-6">
        <h3 className="font-heading font-heading-medium text-xl text-text-primary mb-4">
          About Me
        </h3>
        <div className="prose prose-lg max-w-none text-text-secondary">
          <p className="mb-4">{personalInfo.biography}</p>
        </div>
      </div>

      {/* Contact Information */}
      <div className="bg-surface rounded-card border border-border p-6">
        <h3 className="font-heading font-heading-medium text-xl text-text-primary mb-4">
          Contact Information
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {contactInfo.map((contact, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-50 rounded-full flex items-center justify-center">
                <Icon name={contact.icon} size={16} className="text-primary" />
              </div>
              <div>
                <div className="text-sm text-text-secondary font-body">{contact.label}</div>
                {contact.link ? (
                  <a
                    href={contact.link}
                    target={contact.icon === 'Globe' ? '_blank' : undefined}
                    rel={contact.icon === 'Globe' ? 'noopener noreferrer' : undefined}
                    className="text-primary hover:text-primary-600 font-body-medium spring-animation"
                  >
                    {contact.value}
                  </a>
                ) : (
                  <div className="text-text-primary font-body-medium">{contact.value}</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Skills */}
        <div className="bg-surface rounded-card border border-border p-6">
          <h3 className="font-heading font-heading-medium text-xl text-text-primary mb-4">
            Skills & Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {personalInfo.skills.map((skill, index) => (
              <span
                key={index}
                className="bg-primary-50 text-primary px-3 py-1 rounded-full text-sm font-body-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Interests */}
        <div className="bg-surface rounded-card border border-border p-6">
          <h3 className="font-heading font-heading-medium text-xl text-text-primary mb-4">
            Interests & Hobbies
          </h3>
          <div className="flex flex-wrap gap-2">
            {personalInfo.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-accent-50 text-accent px-3 py-1 rounded-full text-sm font-body-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Languages */}
      <div className="bg-surface rounded-card border border-border p-6">
        <h3 className="font-heading font-heading-medium text-xl text-text-primary mb-4">
          Languages
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {personalInfo.languages.map((language, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-background rounded-lg">
              <span className="font-body-medium text-text-primary">{language.name}</span>
              <span className="text-sm text-text-secondary font-body">{language.level}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutTab;