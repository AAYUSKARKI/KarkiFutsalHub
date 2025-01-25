import React from 'react';
import { Check, Clock, Users, Calendar } from 'lucide-react';

const Pricing = () => {
  const plans = [
    {
      name: 'Peak Hours',
      price: 1200,
      time: '4 PM - 10 PM',
      features: [
        'Premium FIFA approved turf',
        'Professional lighting',
        'Clean changing rooms',
        'Drinking water',
        'First aid support',
        'Earn reward credits'
      ]
    },
    {
      name: 'Off-Peak Hours',
      price: 1000,
      time: '6 AM - 4 PM',
      features: [
        'Premium FIFA approved turf',
        'Professional lighting',
        'Clean changing rooms',
        'Drinking water',
        'First aid support',
        'Earn reward credits'
      ],
      popular: true
    },
    {
      name: 'Night Hours',
      price: 1100,
      time: '10 PM - 6 AM',
      features: [
        'Premium FIFA approved turf',
        'Professional lighting',
        'Clean changing rooms',
        'Drinking water',
        'First aid support',
        'Earn reward credits'
      ]
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-white to-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-xl text-gray-600">
            Choose the perfect time slot that suits your schedule
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div 
              key={plan.name}
              className={`relative bg-white rounded-2xl shadow-xl overflow-hidden transition-transform hover:scale-105 ${
                plan.popular ? 'border-2 border-green-500' : ''
              }`}
            >
              {plan.popular && (
                <div className="absolute top-0 right-0 bg-green-500 text-white px-4 py-1 rounded-bl-lg">
                  Most Popular
                </div>
              )}
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{plan.name}</h3>
                <div className="flex items-baseline mb-8">
                  <span className="text-4xl font-bold text-green-600">Rs. {plan.price}</span>
                  <span className="text-gray-500 ml-2">/ hour</span>
                </div>
                <div className="flex items-center gap-2 mb-6 text-gray-600">
                  <Clock size={20} className="text-green-500" />
                  <span>{plan.time}</span>
                </div>
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <Check size={20} className="text-green-500 flex-shrink-0" />
                      <span className="text-gray-600">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg transition duration-300">
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Calendar size={32} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Flexible Booking</h3>
            <p className="text-gray-600">Book up to 30 days in advance</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Users size={32} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">Group Discounts</h3>
            <p className="text-gray-600">Special rates for regular teams</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <Clock size={32} className="mx-auto mb-4 text-green-600" />
            <h3 className="text-xl font-semibold mb-2">24/7 Available</h3>
            <p className="text-gray-600">Play anytime, day or night</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;