import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Menu, X, Sun, Moon, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  // Initialize with dark mode by default
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return true; // Dark mode by default
  });
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
      setIsDarkMode(false);
      document.documentElement.classList.remove('dark');
    } else {
      // Default to dark mode
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
      if (!savedTheme) {
        localStorage.setItem('theme', 'dark');
      }
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDarkMode;
    setIsDarkMode(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', newTheme);
  };

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { key: 'home', href: '#home' },
    { key: 'about', href: '#about' },
    { key: 'experience', href: '#experience' },
    { key: 'projects', href: '#projects' },
    { key: 'clients', href: '#clients' },
    { key: 'recommendations', href: '#recommendations' },
    { key: 'contact', href: '#contact' },
  ];

  const scrollToSection = (href) => {
    // Close menu first to avoid animation conflicts
    setIsMenuOpen(false);
    
    // Small delay to ensure menu closes before scrolling
    setTimeout(() => {
      const element = document.querySelector(href);
      if (element) {
        // Get header height to offset scroll position
        const headerHeight = 80; // Approximate header height
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-gray-900/90 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto px-3 sm:px-4 py-3 md:py-4 overflow-x-hidden">
        <div className="flex items-center justify-between w-full min-w-0">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="flex items-center space-x-1.5 sm:space-x-2 flex-shrink-0 min-w-0"
          >
            <img 
              src="/assets/img/clients/brain-tech-logo.jpeg" 
              alt="BrainTech" 
              className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 rounded-full object-cover border-2 border-primary-200 dark:border-primary-700 flex-shrink-0"
            />
            <span className="text-base sm:text-lg md:text-xl font-bold text-gray-900 dark:text-white whitespace-nowrap truncate">
              BrainTech
            </span>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 flex-shrink-0">
            {navItems.map((item) => (
              <motion.button
                key={item.key}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => scrollToSection(item.href)}
                className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium whitespace-nowrap"
              >
                {t(`nav.${item.key}`)}
              </motion.button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center space-x-1.5 sm:space-x-2 md:space-x-4 flex-shrink-0 ml-2 mr-[25px]">
            {/* Language Selector */}
            <div className="relative flex-shrink-0">
              <button
                onClick={() => changeLanguage(i18n.language === 'fr' ? 'en' : 'fr')}
                className="flex items-center space-x-0.5 sm:space-x-1 text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 p-1.5 sm:p-2"
              >
                <Globe size={16} className="sm:w-[18px] sm:h-[18px] flex-shrink-0" />
                <span className="text-xs sm:text-sm font-medium hidden sm:inline whitespace-nowrap">
                  {i18n.language === 'fr' ? 'EN' : 'FR'}
                </span>
              </button>
            </div>

            {/* Theme Toggle */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={toggleTheme}
              className="p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
            >
              {isDarkMode ? <Sun size={16} className="sm:w-[18px] sm:h-[18px]" /> : <Moon size={16} className="sm:w-[18px] sm:h-[18px]" />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 flex-shrink-0"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden mt-3 sm:mt-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              <div className="py-2 sm:py-4 space-y-1 sm:space-y-2">
                {navItems.map((item) => (
                  <motion.button
                    key={item.key}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      scrollToSection(item.href);
                    }}
                    className="block w-full text-left px-4 py-2.5 sm:py-3 text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 font-medium cursor-pointer"
                    type="button"
                  >
                    {t(`nav.${item.key}`)}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.header>
  );
};

export default Header;
