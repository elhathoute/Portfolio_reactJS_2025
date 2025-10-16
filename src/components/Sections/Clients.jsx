import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ExternalLink, Building2, MapPin, Globe, ChevronLeft, ChevronRight } from 'lucide-react';
import Card from '../UI/Card';

const Clients = () => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  // Récupérer tous les clients depuis les traductions
  const clientsData = t('clients.items', { returnObjects: true });
  const clients = Object.entries(clientsData).map(([key, client]) => ({
    id: key,
    name: client.name,
    description: client.description,
    website: client.website,
    sector: client.sector,
    location: client.location,
    logo: client.logo,
    featured: key === 'mtedd' // MTEDD est le client vedette
  }));

  // Responsive items per view
  const [itemsPerView, setItemsPerView] = useState(3);
  const [maxIndex, setMaxIndex] = useState(0);

  // Update items per view based on screen size
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth < 768) {
        setItemsPerView(1); // Mobile: 1 item
      } else if (window.innerWidth < 1024) {
        setItemsPerView(2); // Tablet: 2 items
      } else {
        setItemsPerView(3); // Desktop: 3 items
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Update maxIndex when itemsPerView changes
  useEffect(() => {
    setMaxIndex(Math.max(0, clients.length - itemsPerView));
  }, [clients.length, itemsPerView]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex >= maxIndex ? 0 : prevIndex + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, maxIndex]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex(currentIndex >= maxIndex ? 0 : currentIndex + 1);
  };

  return (
    <section id="clients" className="py-20 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            {t('clients.title')}
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            {t('clients.subtitle')}
          </p>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t('clients.description')}
          </p>
        </motion.div>

        {/* Clients Carousel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          {/* Carousel Container */}
          <div className="relative overflow-hidden rounded-2xl">
            <div 
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsPerView)}%)` }}
            >
              {clients.map((client, index) => (
                <div key={client.id} className="w-full flex-shrink-0 px-2 md:px-4" style={{ width: `${100 / itemsPerView}%` }}>
                  <Card className="h-full group">
                    <div className="space-y-6">
                      {/* Client Logo/Header */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center border border-gray-200 dark:border-gray-700 overflow-hidden">
                            <img 
                              src={client.logo} 
                              alt={`${client.name} logo`}
                              className="w-full h-full object-contain p-2"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="w-full h-full bg-gradient-to-r from-primary-100 to-primary-200 dark:from-primary-900/20 dark:to-primary-800/20 rounded-lg flex items-center justify-center hidden">
                              <Building2 className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                              {client.name}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              {client.sector}
                            </p>
                          </div>
                        </div>
                        {client.featured && (
                          <span className="px-3 py-1 bg-primary-100 dark:bg-primary-900/20 text-primary-700 dark:text-primary-400 rounded-full text-sm font-medium">
                            Client vedette
                          </span>
                        )}
                      </div>

                      {/* Description */}
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                        {client.description}
                      </p>

                      {/* Location */}
                      <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                        <MapPin size={16} />
                        <span>{client.location}</span>
                      </div>

                      {/* Website Link */}
                      {client.website && client.website !== '#' && (
                        <motion.a
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          href={client.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors duration-200"
                        >
                          <Globe size={16} />
                          <span className="text-sm font-medium">Visiter le site</span>
                          <ExternalLink size={14} />
                        </motion.a>
                      )}
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 z-10"
            aria-label="Previous client"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>

          <button
            onClick={goToNext}
            className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white dark:bg-gray-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 z-10"
            aria-label="Next client"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setIsAutoPlaying(false);
                  setCurrentIndex(index);
                }}
                className={`w-3 h-3 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? 'bg-primary-600 dark:bg-primary-400'
                    : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
                }`}
                aria-label={`Go to client group ${index + 1}`}
              />
            ))}
          </div>

          {/* Auto-play Toggle */}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => setIsAutoPlaying(!isAutoPlaying)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                isAutoPlaying
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
              }`}
            >
              {isAutoPlaying ? 'Pause' : 'Play'} Auto
            </button>
          </div>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                8+
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Clients satisfaits
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                100%
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Taux de satisfaction
              </p>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">
                24h
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                Temps de réponse
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Clients;
