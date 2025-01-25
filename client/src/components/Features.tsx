import React from 'react';
import { Shield, Users, Trophy, Zap, Coffee, ShowerHead as Shower } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8 text-green-600" />,
      title: 'Premium Turf',
      description: 'FIFA-approved artificial grass for the best playing experience'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      title: 'Team Facilities',
      description: 'Dedicated changing rooms and team areas'
    },
    {
      icon: <Trophy className="w-8 h-8 text-green-600" />,
      title: 'Tournaments',
      description: 'Regular tournaments and leagues for all skill levels'
    },
    {
      icon: <Zap className="w-8 h-8 text-green-600" />,
      title: 'Floodlights',
      description: 'Professional lighting for night matches'
    },
    {
      icon: <Coffee className="w-8 h-8 text-green-600" />,
      title: 'Café',
      description: 'Refreshments and snacks available'
    },
    {
      icon: <Shower className="w-8 h-8 text-green-600" />,
      title: 'Modern Amenities',
      description: 'Clean shower facilities and lockers'
    }
  ];

  return (
    <div className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            World-Class Facilities
          </h2>
          <p className="text-xl text-gray-600">
            Experience futsal like never before with our premium amenities
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;