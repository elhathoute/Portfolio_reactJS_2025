import React from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';

/**
 * Reusable carousel navigation controls
 * @param {Object} props - Component props
 * @param {Function} props.onPrevious - Previous button handler
 * @param {Function} props.onNext - Next button handler
 * @param {Function} props.onToggleAutoPlay - Auto-play toggle handler
 * @param {boolean} props.isAutoPlaying - Auto-play state
 * @param {number} props.maxIndex - Maximum slide index
 * @param {number} props.currentIndex - Current slide index
 * @param {Array} props.items - Array of items for dots
 * @param {Function} props.onGoToSlide - Go to specific slide handler
 * @param {number} props.itemsPerView - Items per view for dots calculation
 */
const CarouselControls = ({
  onPrevious,
  onNext,
  onToggleAutoPlay,
  isAutoPlaying,
  maxIndex,
  currentIndex,
  items,
  onGoToSlide,
  itemsPerView = 1
}) => {
  const dotsCount = itemsPerView === 1 ? items.length : maxIndex + 1;

  return (
    <>
      {/* Navigation Buttons */}
      <button
        onClick={onPrevious}
        className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 z-10 -ml-6"
        aria-label="Previous item"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={onNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 z-10 -mr-6"
        aria-label="Next item"
      >
        <ChevronRight size={24} />
      </button>

      {/* Dots Indicator */}
      <div className="flex justify-center space-x-2 mt-8">
        {Array.from({ length: dotsCount }).map((_, index) => (
          <button
            key={index}
            onClick={() => onGoToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentIndex
                ? 'bg-primary-600 dark:bg-primary-400'
                : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
            }`}
            aria-label={`Go to item ${index + 1}`}
          />
        ))}
      </div>

      {/* Auto-play Toggle */}
      <div className="flex justify-center mt-4">
        <button
          onClick={onToggleAutoPlay}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 flex items-center space-x-2 ${
            isAutoPlaying
              ? 'bg-primary-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          <span>{isAutoPlaying ? 'Pause' : 'Play'} Auto</span>
        </button>
      </div>
    </>
  );
};

export default CarouselControls;



