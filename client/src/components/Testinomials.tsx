import React from 'react';
import { Star, Quote } from 'lucide-react';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Rajesh Kumar',
      role: 'Regular Player',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      content: 'Best futsal court in the city! The artificial turf is top-notch and the facilities are always clean. The reward system is a great bonus!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      role: 'Team Captain',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      content: 'We practice here twice a week. The lighting is perfect for evening games and the staff is very helpful. Highly recommended!',
      rating: 5
    },
    {
      name: 'Amit Patel',
      role: 'Weekend Player',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
      content: 'The online booking system is so convenient. I love how I can check availability and book slots instantly. Great experience every time!',
      rating: 5
    }
  ];

  return (
    <div className="py-20 bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            What Our Players Say
          </h2>
          <p className="text-xl text-gray-600">
            Join our community of satisfied players
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-xl p-8 transition-transform hover:scale-105"
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center gap-4">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <Quote size={24} className="text-green-500" />
              </div>
              
              <p className="text-gray-600 mb-6">"{testimonial.content}"</p>
              
              <div className="flex items-center gap-1">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star 
                    key={i}
                    size={20}
                    className="text-yellow-400 fill-current"
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Experience It Yourself?</h3>
          <p className="text-lg mb-8">Join thousands of satisfied players and book your slot today!</p>
          <button className="bg-white text-green-600 font-bold py-3 px-8 rounded-lg hover:bg-gray-100 transition duration-300">
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;