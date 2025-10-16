import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import Card from '../UI/Card';

const Recommendations = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const recommendations = Object.values(t('recommendations.items', { returnObjects: true }));

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === recommendations.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, recommendations.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? recommendations.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === recommendations.length - 1 ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  return (
    <section id="recommendations" className="py-12 lg:py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-3">
            {t('recommendations.title')}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            {t('recommendations.subtitle')}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-3xl mx-auto"
        >
          {/* Main Carousel */}
          <div className="relative overflow-hidden rounded-xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {recommendations.map((recommendation, index) => (
                <div key={index} className="w-full flex-shrink-0 px-3">
                  <Card className="h-full">
                    <div className="text-center space-y-4 p-6">
                      {/* Quote Icon */}
                      <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/20 rounded-full flex items-center justify-center mx-auto">
                        <Quote className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                      </div>

                      {/* Recommendation Text */}
                      <blockquote className="text-base lg:text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                        "{recommendation.text}"
                      </blockquote>

                      {/* Author Info */}
                      <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                        <h4 className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                          {recommendation.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {recommendation.position}
                        </p>
                      </div>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 z-10"
            aria-label="Previous recommendation"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 z-10"
            aria-label="Next recommendation"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6">
            {recommendations.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-600 dark:bg-primary-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to recommendation ${index + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Compact Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex justify-center space-x-8 text-center"
        >
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              {recommendations.length}+
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Recommandations
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              100%
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Satisfaction
            </p>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-primary-600 dark:text-primary-400">
              5★
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Note moyenne
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Recommendations;
