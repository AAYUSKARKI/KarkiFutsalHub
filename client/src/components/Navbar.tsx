import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  Star, 
  Workflow, 
  DollarSign, 
  MessageCircle, 
  Menu, 
  X 
} from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: Home, text: 'Home', href: '#' },
    { icon: Star, text: 'Features', href: '#features' },
    { icon: Workflow, text: 'Get Started', href: '#workflow' },
    { icon: DollarSign, text: 'Pricing', href: '#pricing' },
    { icon: MessageCircle, text: 'Contact', href: '#contact' }
  ];

  const menuVariants = {
    hidden: { 
      opacity: 0, 
      x: '100%' 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        type: 'tween',
        duration: 0.3 
      }
    },
    exit: { 
      opacity: 0, 
      x: '100%',
      transition: { 
        type: 'tween',
        duration: 0.3 
      }
    }
  };

  return (
    <header className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-4 sticky top-0 z-50 shadow-lg">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3"
        >
          <img 
            src="/logo.png" 
            alt="Karki Futsal Hub Logo" 
            className="h-10 rounded-full" 
          />
          <span className="font-bold text-xl tracking-wider">Karki Futsal</span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <motion.ul 
            initial="hidden"
            animate="visible"
            className="flex space-x-6"
          >
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: { 
                      delay: index * 0.1,
                      type: 'spring',
                      stiffness: 300
                    }
                  }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <a 
                  href={item.href} 
                  className="flex items-center space-x-2 hover:text-green-200 transition-colors"
                >
                  <item.icon size={18} />
                  <span>{item.text}</span>
                </a>
              </motion.li>
            ))}
          </motion.ul>
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </motion.button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-0 bg-gradient-to-br from-green-600 to-blue-600 z-50 md:hidden"
            >
              <ul className="flex flex-col items-center justify-center h-full space-y-8">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { 
                        delay: index * 0.1,
                        type: 'spring',
                        stiffness: 300
                      }
                    }}
                  >
                    <a 
                      href={item.href} 
                      onClick={() => setIsMenuOpen(false)}
                      className="flex items-center space-x-3 text-2xl hover:text-green-200 transition-colors"
                    >
                      <item.icon size={24} />
                      <span>{item.text}</span>
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default Navbar;