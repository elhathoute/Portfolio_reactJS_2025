import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronDown, Code, Palette, Database, Cloud } from 'lucide-react';
import Button from '../UI/Button';
import { fadeInLeft, fadeInRight, scaleIn, hoverScale } from '../constants/animations';
import { sectionStyles } from '../constants/styles';

const Hero = () => {
  const { t } = useTranslation();

  // Utility functions for smooth scrolling
  const scrollToElement = (selector) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToProjects = () => scrollToElement('#projects');
  const scrollToContact = () => scrollToElement('#contact');

  const techIcons = [
    { icon: Code, color: 'text-blue-500', delay: 0.1 },
    { icon: Palette, color: 'text-purple-500', delay: 0.2 },
    { icon: Database, color: 'text-green-500', delay: 0.3 },
    { icon: Cloud, color: 'text-orange-500', delay: 0.4 },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className={`${sectionStyles.container} py-20 relative z-10`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={fadeInLeft.initial}
            animate={fadeInLeft.animate}
            transition={{ ...fadeInLeft.transition, duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <p className="text-lg text-primary-600 dark:text-primary-400 font-medium">
                {t('hero.greeting')}
              </p>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
                {t('hero.name')}
              </h1>
              <h2 className="text-2xl lg:text-3xl text-primary-600 dark:text-primary-400 font-semibold">
                {t('hero.title')}
              </h2>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-lg"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="w-full sm:w-auto"
              >
                {t('hero.cta.projects')}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={scrollToContact}
                className="w-full sm:w-auto"
              >
                {t('hero.cta.contact')}
              </Button>
            </motion.div>

            {/* Tech Icons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-center space-x-6"
            >
              <span className="text-sm text-gray-500 dark:text-gray-400">Tech Stack:</span>
              {techIcons.map((tech, index) => {
                const Icon = tech.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tech.delay, type: "spring", stiffness: 200 }}
                    whileHover={{ ...hoverScale.whileHover, rotate: 5 }}
                    className={`p-3 rounded-lg bg-white dark:bg-gray-800 shadow-md ${tech.color}`}
                  >
                    <Icon size={24} />
                  </motion.div>
                );
              })}
            </motion.div>
          </motion.div>

          {/* Visual Element */}
          <motion.div
            initial={fadeInRight.initial}
            animate={fadeInRight.animate}
            transition={{ ...fadeInRight.transition, duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative w-full h-96 lg:h-[500px]">
              {/* Main Circle */}
              <motion.div
                initial={scaleIn.initial}
                animate={scaleIn.animate}
                transition={{ ...scaleIn.transition, delay: 0.5, type: "spring", stiffness: 100 }}
                className="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-600 rounded-full opacity-20"
              />
              
              {/* Profile Image */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.7, type: "spring", stiffness: 100 }}
                className="absolute inset-4 bg-white dark:bg-gray-800 rounded-full shadow-2xl flex items-center justify-center overflow-hidden"
              >
                <img 
                  src="/logo.jpeg" 
                  alt="AbdelazizElh Elhathout" 
                  className="w-32 h-32 rounded-full object-cover"
                />
              </motion.div>

              {/* Floating Elements */}
              {[
                { top: '10%', left: '10%', delay: 0.8 },
                { top: '20%', right: '10%', delay: 0.9 },
                { bottom: '20%', left: '5%', delay: 1.0 },
                { bottom: '10%', right: '15%', delay: 1.1 },
              ].map((pos, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: pos.delay, type: "spring", stiffness: 200 }}
                  className={`absolute w-4 h-4 bg-primary-500 rounded-full ${pos.top ? `top-${pos.top}` : ''} ${pos.bottom ? `bottom-${pos.bottom}` : ''} ${pos.left ? `left-${pos.left}` : ''} ${pos.right ? `right-${pos.right}` : ''}`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.button
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          onClick={scrollToProjects}
          className="p-3 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-shadow duration-200"
        >
          <ChevronDown className="text-gray-600 dark:text-gray-300" size={24} />
        </motion.button>
      </motion.div>
    </section>
  );
};

export default Hero;
