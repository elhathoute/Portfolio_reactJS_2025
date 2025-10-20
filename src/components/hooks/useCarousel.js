import { useState, useEffect } from 'react';

/**
 * Custom hook for carousel functionality
 * @param {Array} items - Array of items to display
 * @param {number} itemsPerView - Number of items to show at once
 * @param {number} autoPlayInterval - Auto-play interval in milliseconds
 * @returns {Object} Carousel state and controls
 */
export const useCarousel = (items = [], itemsPerView = 1, autoPlayInterval = 6000) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const maxIndex = Math.max(0, items.length - itemsPerView);

  useEffect(() => {
    if (!isAutoPlaying || items.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex, autoPlayInterval, items.length]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  const goToSlide = (index) => {
    setIsAutoPlaying(false);
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  return {
    currentIndex,
    isAutoPlaying,
    maxIndex,
    goToPrevious,
    goToNext,
    goToSlide,
    toggleAutoPlay
  };
};



