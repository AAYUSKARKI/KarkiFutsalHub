import { Mail, Phone, MapPin } from 'lucide-react';
import React from 'react';
import { FaFacebookF , FaTwitter, FaInstagram } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className="bg-green-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center mb-4">
              <img 
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLFAjdtgTjUI0K4WcYKr0ZTW4lbEInVANkOQ&s" 
                alt="Karki Futsal Hub Logo" 
                className="h-10 w-10 rounded-full"
              />
              <span className="ml-2 text-xl font-bold">Karki Futsal Hub</span>
            </div>
            <p className="text-gray-300">
              Your premier destination for futsal in the city. Experience the game like never before.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400">Home</a></li>
              <li><a href="#" className="hover:text-blue-400">About Us</a></li>
              <li><a href="#" className="hover:text-blue-400">Facilities</a></li>
              <li><a href="#" className="hover:text-blue-400">Book Now</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <span>+977 9816362629</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <span>karki.aayush2003@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} />
                <span>Letang, Nepal</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-400">
                <FaFacebookF size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="hover:text-blue-400">
                <FaTwitter size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} Karki Futsal Hub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;