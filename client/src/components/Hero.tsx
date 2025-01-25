import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Phone } from 'lucide-react';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1, 
      transition: { 
        delayChildren: 0.3, 
        staggerChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 100 
      }
    }
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <motion.div
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5 }}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('/image.png')`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-green-900/70"></div>
      </motion.div>
      
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative h-full flex items-center justify-center text-white"
      >
        <div className="max-w-4xl mx-auto text-center px-4">
        <motion.h1 
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold mb-6 font-['Montserrat']"
          >
            Welcome to Karki Futsal Hub
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl mb-8 font-['Open_Sans']"
          >
            Experience premium futsal facilities with state-of-the-art amenities
          </motion.p>
          
          <motion.div 
            variants={itemVariants}
            className="flex flex-col md:flex-row justify-center gap-8 mb-12"
          >
            {[
              { icon: Clock, text: "24/7 Access", color: "text-blue-300" },
              { icon: Calendar, text: "Instant Booking", color: "text-green-300" },
              { icon: Phone, text: "Pro Support", color: "text-purple-300" }
            ].map((item, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center justify-center gap-3 hover:bg-white/10 p-3 rounded-lg transition-all"
              >
                <item.icon className={`${item.color} w-6 h-6`} />
                <span className="text-lg font-medium">{item.text}</span>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-10 rounded-xl text-lg 
            transition duration-300 shadow-lg shadow-green-600/50 uppercase tracking-wider"
          >
            Book Your Court
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;